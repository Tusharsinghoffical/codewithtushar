import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

const DB_DIR = path.resolve(process.cwd(), '.security');
const DB_PATH = path.join(DB_DIR, 'security_events.db');
const ALERTS_LOG_PATH = path.join(DB_DIR, 'alerts.log');
const LOG_RETENTION_DAYS = 90;

let dbInstance = null;
let SQL = null;
let saveTimer = null;
let isSaving = false;

// Ensure .security directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

/**
 * Initialize SQLite Database using sql.js
 */
async function initDatabase() {
  if (dbInstance) return dbInstance;
  try {
    SQL = await initSqlJs();
    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      dbInstance = new SQL.Database(fileBuffer);
    } else {
      dbInstance = new SQL.Database();
    }

    // Initialize Tables
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS security_events (
        id TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        event_type TEXT NOT NULL,
        severity TEXT NOT NULL,
        rule_id TEXT NOT NULL,
        source_ip TEXT NOT NULL,
        user_agent TEXT,
        route TEXT NOT NULL,
        method TEXT NOT NULL,
        request_id TEXT,
        user_id TEXT,
        redacted_payload TEXT,
        action_taken TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS blocked_ips (
        ip TEXT PRIMARY KEY,
        reason TEXT NOT NULL,
        blocked_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      );
    `);

    // Run Retention Purge on startup
    purgeOldEvents();
    persistDatabaseSync();
    return dbInstance;
  } catch (err) {
    console.error('[SecurityMonitor] Fail-safe DB init error:', err.message);
    return null;
  }
}

/**
 * Save SQLite DB to file asynchronously
 */
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    persistDatabaseSync();
  }, 250);
}

function persistDatabaseSync() {
  if (!dbInstance || isSaving) return;
  try {
    isSaving = true;
    const data = dbInstance.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  } catch (err) {
    console.error('[SecurityMonitor] DB persist error:', err.message);
  } finally {
    isSaving = false;
  }
}

/**
 * Retention Cleanup: deletes records older than LOG_RETENTION_DAYS
 */
export function purgeOldEvents(retentionDays = LOG_RETENTION_DAYS) {
  if (!dbInstance) return;
  try {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
    dbInstance.run('DELETE FROM security_events WHERE timestamp < ?', [cutoffDate]);
    dbInstance.run('DELETE FROM blocked_ips WHERE expires_at < ?', [new Date().toISOString()]);
    scheduleSave();
  } catch (err) {
    console.error('[SecurityMonitor] Retention purge error:', err.message);
  }
}

// In-Memory Rate Limiting & Tracking
const rateLimitStore = new Map(); // ip -> { count, resetAt }
const lastAlertTime = new Map();  // rule_id -> timestamp

/**
 * Redact and truncate payload for GDPR / PII compliance
 */
function sanitizePayload(rawStr) {
  if (!rawStr || typeof rawStr !== 'string') return '';
  let str = rawStr.slice(0, 256); // Cap length
  // Mask JSON key-values
  str = str.replace(/"(password|token|secret|apiKey|authorization|cookie)"\s*:\s*"[^"]+"/gi, '"$1":"[REDACTED]"');
  // Mask URL / form params key-values (e.g. password=Secret123)
  str = str.replace(/([?&]|\b)(password|token|secret|apiKey|authorization|cookie)=([^&\s]+)/gi, '$1$2=[REDACTED]');
  // Mask Bearer tokens
  str = str.replace(/(bearer\s+)[a-zA-Z0-9_\-\.]+/gi, '$1[REDACTED]');
  // Mask credit card numbers
  str = str.replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, '****-****-****-****');
  // Prevent log injection (carriage return / newlines)
  return str.replace(/[\r\n]+/g, ' ');
}

/**
 * Alert Dispatcher (Console + File + Webhook placeholder)
 */
function sendAlert(event) {
  try {
    const now = Date.now();
    const last = lastAlertTime.get(event.rule_id) || 0;
    if (now - last < 10000) return; // Rate-limit alerts: max 1 per 10s per rule
    lastAlertTime.set(event.rule_id, now);

    const alertLine = `[${new Date().toISOString()}] [SECURITY ALERT] [${event.severity}] [${event.rule_id}] IP: ${event.source_ip} Route: ${event.route} Action: ${event.action_taken}\n`;
    console.warn(`\x1b[31m${alertLine.trim()}\x1b[0m`);
    fs.appendFileSync(ALERTS_LOG_PATH, alertLine, 'utf8');

    // Webhook notification hook (if configured in env)
    const webhookUrl = process.env.SECURITY_WEBHOOK_URL;
    if (webhookUrl && typeof fetch === 'function') {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(() => {});
    }
  } catch (_) {}
}

/**
 * Log Security Event to SQLite
 */
export async function logSecurityEvent(eventData) {
  try {
    const db = await initDatabase();
    if (!db) return;

    const id = 'evt_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    const timestamp = new Date().toISOString();
    const redacted = sanitizePayload(eventData.payload || '');

    db.run(
      `INSERT INTO security_events (
        id, timestamp, event_type, severity, rule_id, source_ip,
        user_agent, route, method, request_id, user_id, redacted_payload, action_taken
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        timestamp,
        eventData.event_type || 'ANOMALY',
        eventData.severity || 'LOW',
        eventData.rule_id || 'UNKNOWN',
        eventData.source_ip || '127.0.0.1',
        eventData.user_agent ? eventData.user_agent.slice(0, 200) : 'unknown',
        eventData.route || '/',
        eventData.method || 'GET',
        eventData.request_id || 'req_' + Date.now(),
        eventData.user_id || null,
        redacted,
        eventData.action_taken || 'LOG'
      ]
    );

    scheduleSave();

    if (['HIGH', 'CRITICAL'].includes(eventData.severity)) {
      sendAlert({ ...eventData, id, timestamp });
    }
  } catch (err) {
    console.error('[SecurityMonitor] Event log error:', err.message);
  }
}

/**
 * Temporarily Block an IP address with expiry
 */
export async function blockIp(ip, reason, durationSeconds = 900) {
  try {
    const db = await initDatabase();
    if (!db) return;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationSeconds * 1000).toISOString();
    db.run(
      `INSERT OR REPLACE INTO blocked_ips (ip, reason, blocked_at, expires_at) VALUES (?, ?, ?, ?)`,
      [ip, reason, now.toISOString(), expiresAt]
    );
    scheduleSave();
  } catch (err) {
    console.error('[SecurityMonitor] Block IP error:', err.message);
  }
}

/**
 * Check if IP is currently blocked
 */
export async function isIpBlocked(ip) {
  try {
    const db = await initDatabase();
    if (!db) return false;
    const now = new Date().toISOString();
    const res = db.exec('SELECT ip FROM blocked_ips WHERE ip = ? AND expires_at > ? LIMIT 1', [ip, now]);
    return res.length > 0 && res[0].values.length > 0;
  } catch (err) {
    return false;
  }
}

/**
 * Unblock an IP address
 */
export async function unblockIp(ip) {
  try {
    const db = await initDatabase();
    if (!db) return false;
    db.run('DELETE FROM blocked_ips WHERE ip = ?', [ip]);
    persistDatabaseSync();
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Query recent security events
 */
export async function getEvents(limit = 50, filterType = null) {
  try {
    const db = await initDatabase();
    if (!db) return [];
    let query = 'SELECT * FROM security_events ORDER BY timestamp DESC LIMIT ?';
    let params = [limit];
    if (filterType) {
      query = 'SELECT * FROM security_events WHERE event_type = ? ORDER BY timestamp DESC LIMIT ?';
      params = [filterType, limit];
    }
    const res = db.exec(query, params);
    if (!res.length) return [];
    const columns = res[0].columns;
    return res[0].values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => { obj[col] = row[idx]; });
      return obj;
    });
  } catch (err) {
    console.error('[SecurityMonitor] Query error:', err.message);
    return [];
  }
}

/**
 * Query currently blocked IPs
 */
export async function getBlockedIps() {
  try {
    const db = await initDatabase();
    if (!db) return [];
    const now = new Date().toISOString();
    const res = db.exec('SELECT * FROM blocked_ips WHERE expires_at > ? ORDER BY blocked_at DESC', [now]);
    if (!res.length) return [];
    const columns = res[0].columns;
    return res[0].values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => { obj[col] = row[idx]; });
      return obj;
    });
  } catch (err) {
    return [];
  }
}

// Attack Signature Rules
const HONEYPOT_PATHS = [
  /^\/wp-admin(\/.*)?$/i,
  /^\/wp-login(\.php)?$/i,
  /^\/xmlrpc\.php$/i,
  /^\/\.env(\..*)?$/i,
  /^\/\.git(\/.*)?$/i,
  /^\/phpmyadmin(\/.*)?$/i,
  /^\/admin(\.php|\/login)?$/i,
  /^\/\.aws(\/.*)?$/i,
  /^\/\.ssh(\/.*)?$/i,
  /^\/package\.json$/i,
  /^\/\.htaccess$/i,
  /^\/render\.yaml$/i
];

const SCANNER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /acunetix/i,
  /masscan/i,
  /nmap/i,
  /zgrab/i,
  /gobuster/i,
  /dirbuster/i,
  /wpscan/i
];

const ATTACK_SIGNATURES = [
  { id: 'SIG-SQLI-01', name: 'SQL Injection Union/Select', regex: /(union\s+all\s+select|union\s+select|\'\s+or\s+1\s*=\s*1|waitfor\s+delay|information_schema)/i },
  { id: 'SIG-PATH-01', name: 'Path Traversal Directory Escape', regex: /(\.\.[\/\\]|\%2e\%2e[\/\\]|\/etc\/passwd|c:\\windows)/i },
  { id: 'SIG-XSS-01',  name: 'XSS Script Payload', regex: /(<script[\s>寿]|javascript:\s*[a-z0-9]|onerror\s*=|onload\s*=|alert\(|<svg\/onload)/i },
  { id: 'SIG-SSRF-01', name: 'SSRF Cloud Metadata Probe', regex: /(169\.254\.169\.254|metadata\.google\.internal)/i }
];

/**
 * Master Security Detection Middleware (Fail-Safe)
 */
export function createSecurityMiddleware() {
  return async function securityMiddleware(req, res, next) {
    try {
      const url = req.url || '/';
      const parsedPath = url.split('?')[0];
      const query = url.split('?')[1] || '';
      const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || '';

      // 1. IP Blocklist Enforcement
      if (await isIpBlocked(ip)) {
        await logSecurityEvent({
          event_type: 'BLOCKED_IP_ACCESS',
          severity: 'HIGH',
          rule_id: 'RULE-IP-BLOCK',
          source_ip: ip,
          user_agent: userAgent,
          route: parsedPath,
          method: req.method,
          payload: query,
          action_taken: 'BLOCK_403'
        });
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Request blocked');
        return;
      }

      // 2. Scanner User-Agent Detection
      if (SCANNER_AGENTS.some(regex => regex.test(userAgent))) {
        await blockIp(ip, 'Automated security scanner detected', 1800);
        await logSecurityEvent({
          event_type: 'SCANNER_AGENT',
          severity: 'CRITICAL',
          rule_id: 'RULE-SCANNER-UA',
          source_ip: ip,
          user_agent: userAgent,
          route: parsedPath,
          method: req.method,
          payload: userAgent,
          action_taken: 'BLOCK_AND_BAN'
        });
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Request blocked');
        return;
      }

      // 3. Honeypot Route Trapping
      if (HONEYPOT_PATHS.some(regex => regex.test(parsedPath))) {
        await blockIp(ip, `Honeypot route probe: ${parsedPath}`, 1800);
        await logSecurityEvent({
          event_type: 'HONEYPOT_HIT',
          severity: 'CRITICAL',
          rule_id: 'RULE-HONEYPOT',
          source_ip: ip,
          user_agent: userAgent,
          route: parsedPath,
          method: req.method,
          payload: url,
          action_taken: 'BLOCK_AND_BAN'
        });
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Request blocked');
        return;
      }

      // 4. Attack Signature Inspection (URL, Query, Headers)
      const inspectString = decodeURIComponent(url) + ' ' + (req.headers['x-forwarded-for'] || '');
      for (const sig of ATTACK_SIGNATURES) {
        if (sig.regex.test(inspectString)) {
          await blockIp(ip, `Attack signature detected: ${sig.name}`, 900);
          await logSecurityEvent({
            event_type: 'INJECTION_ATTEMPT',
            severity: 'CRITICAL',
            rule_id: sig.id,
            source_ip: ip,
            user_agent: userAgent,
            route: parsedPath,
            method: req.method,
            payload: inspectString,
            action_taken: 'BLOCK_AND_BAN'
          });
          res.statusCode = 403;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Request blocked');
          return;
        }
      }

      // 5. Sliding-Window Rate Limiting (120 req / minute per IP)
      const now = Date.now();
      let rateData = rateLimitStore.get(ip);
      if (!rateData || now > rateData.resetAt) {
        rateData = { count: 1, resetAt: now + 60000 };
        rateLimitStore.set(ip, rateData);
      } else {
        rateData.count++;
      }

      if (rateData.count > 120) {
        await logSecurityEvent({
          event_type: 'RATE_LIMIT_EXCEEDED',
          severity: 'MEDIUM',
          rule_id: 'RULE-RATE-LIMIT',
          source_ip: ip,
          user_agent: userAgent,
          route: parsedPath,
          method: req.method,
          payload: `Volume count: ${rateData.count}`,
          action_taken: 'THROTTLE_429'
        });
        res.statusCode = 429;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Retry-After', '60');
        res.end('Request blocked');
        return;
      }

      // Safe: Proceed to application handler
      next();
    } catch (middlewareErr) {
      // Fail-Safe: Monitor failure must NEVER crash or block the application
      console.error('[SecurityMonitor] Fail-safe fallback:', middlewareErr);
      next();
    }
  };
}
