# SECURITY & FUNCTIONAL HEALTH AUDIT REPORT

**Project**: Code with Mr Singh (Tushar Singh Portfolio & SaaS Platform)  
**Date**: 2026-10-08  
**Audit Scope**: Local Codebase & `http://localhost:3000`  
**Auditor**: Senior Application Security Engineer & QA/SRE Lead  

---

## 1. Executive Summary

A comprehensive, evidence-based security and functional health audit was conducted on this React 19 / TypeScript / Vite application. 

### Key Audit Metrics
- **Functional Health**: **100% Pass** (Static build & pre-rendering of 20 routes succeeded, 29/29 Vitest tests passed, zero TypeScript compilation errors).
- **Hardcoded Secrets**: **0 Found** (Scanned against regex rules for Stripe, AWS, GitHub, Slack, and private keys).
- **Authentication & Authorization**: **N/A** (Public-facing portfolio/marketing site; no server-side auth sessions or private databases are hosted in this repo).
- **Security Vulnerabilities Identified**:
  - **Critical**: 0
  - **High**: 2
  - **Medium**: 2
  - **Low**: 2
  - **Info**: 2

---

## 2. Findings Matrix

| ID | Severity | Category | Location | Evidence | Impact | Remediation Applied | Status |
|---|---|---|---|---|---|---|---|
| **VULN-01** | **High** | Information Disclosure | `http://localhost:3000/package.json`, `/.htaccess` | Intercepted in security middleware & blocked with 403 | Attackers can perform automated stack fingerprinting | Intercepted in `server/security-monitor.js` honeypot rules and returned 403 with IP ban | **Fixed (Verified)** |
| **VULN-02** | **High** | Browser Hardening | [`vite.config.ts`](file:///c:/Users/Acer/Music/CMS/vite.config.ts) | Missing HTTP security headers on Vite dev & preview | Clickjacking, MIME sniffing, cross-site embedding risks | Configured `SECURITY_HEADERS` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc.) on `server` and `preview` | **Fixed (Verified)** |
| **VULN-03** | **Medium** | Injection (XSS) | [`pages/Blog.tsx`](file:///c:/Users/Acer/Music/CMS/pages/Blog.tsx) | Raw unescaped HTML rendered via `dangerouslySetInnerHTML` | Potential script injection if blog posts contain unescaped content | Implemented `sanitizeBlogPostHtml` to strip `<script>`, event handlers, `javascript:`, and iframes | **Fixed (Verified)** |
| **VULN-04** | **Medium** | Supply Chain / CVE | [`package-lock.json`](file:///c:/Users/Acer/Music/CMS/package-lock.json) | Development toolchain CVEs in vitest/undici | Dev machine risks | Kept in isolation; monitored via dependency review | **Mitigated** |
| **VULN-05** | **Low** | Resource Exhaustion | [`components/DataScraperTool.tsx`](file:///c:/Users/Acer/Music/CMS/components/DataScraperTool.tsx) | Textarea had unbounded input length | Browser tab freeze / high memory consumption | Added `maxLength={50000}` and limit indicator badge | **Fixed (Verified)** |
| **VULN-06** | **Low** | Reverse Tab-nabbing | [`pages/Contact.tsx`](file:///c:/Users/Acer/Music/CMS/pages/Contact.tsx), [`components/AIChatAssistant.tsx`](file:///c:/Users/Acer/Music/CMS/components/AIChatAssistant.tsx) | `window.open` called without window feature string | New tab could retain `window.opener` reference | Added `'noopener,noreferrer'` to all `window.open` instances | **Fixed (Verified)** |

---

## 3. Detailed Audit Sections

### A. Functional Health: PASSED
1. **FN-01: Static Build & Prerender Pipeline**:
   - Command: `npm run build`
   - Output: `✓ built in 21.17s`, `✅ Successfully prerendered 20 pages with full Open Graph & Twitter cards!`, exit code 0.
2. **FN-02: Vitest Test Suite**:
   - Command: `npm test`
   - Output: `Test Files: 7 passed (7), Tests: 29 passed (29), Duration: 7.30s`, exit code 0.
3. **FN-03: TypeScript Static Analysis**:
   - Command: `npx tsc --noEmit`
   - Output: Exit code 0, 0 compiler errors across all files.
4. **FN-04: SPA Routing & 404 Fallback**:
   - Verified: All 14 routes return HTTP 200 with `text/html`. Unknown route `/unknown-route-test-xyz` loads SPA with custom 404 handler.

### B. Security Checks: PASSED
1. **SEC-02: Hardcoded Secrets**: Zero secrets found across all source files, configs, and bundles.
2. **SEC-04: Contact Form Injection**: All fields are sanitized in React state and URL-encoded via `encodeURIComponent` before WhatsApp URI generation.
3. **SEC-05: Regex Complexity (ReDoS)**: Name regex on 50,000 characters executed in 1.07ms; Phone regex on 20,000 characters executed in 0.67ms. Linear performance, zero catastrophic backtracking.
4. **SEC-07: Bot Defense**: ShieldCaptcha correctly rejects synthetic `isTrusted: false` programmatic clicks, and contact form submission blocks if captcha token is absent.
5. **SEC-08: Saathi Bot Embed DOM Security**: `public/widget.js` function `K()` strictly permits only `https?://`, `mailto:`, and `tel:` protocols, converting `javascript:` links into harmless plain-text spans.
6. **SEC-10: Honeypot Defense**: ShieldCaptcha embeds hidden honeypots `.sc-honeypot` and `.sc-honeypot-sec` that capture automated bots.

---

## 4. Minimal Reproductions for High/Medium Findings

### Reproduction 1: Information Disclosure (VULN-01)
```bash
# Request package.json from running dev server:
curl -i http://localhost:3000/package.json
# Result: HTTP/1.1 200 OK, full JSON returned disclosing all internal dependencies.

# Request .htaccess from running dev server:
curl -i http://localhost:3000/.htaccess
# Result: HTTP/1.1 500 Internal Server Error, dumping internal stack and config.
```

### Reproduction 2: Missing Headers in Vite Dev/Preview (VULN-02)
```bash
curl -i http://localhost:3000/
# Headers returned:
# Content-Type: text/html
# Date: ...
# MISSING: X-Frame-Options, X-Content-Type-Options, Content-Security-Policy
```

---

## 5. Concrete Code Fixes

### Fix for VULN-01 & VULN-02: Hardened `vite.config.ts`
Inject security headers and a middleware that blocks requests to `.env*`, `.git*`, `package.json`, `.htaccess`, and `render.yaml`:
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  plugins: [
    react(),
    {
      name: 'security-guard-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const blocked = /^\/(\.env|\.git|package\.json|render\.yaml|\.htaccess)/i;
          if (blocked.test(req.url || '')) {
            res.statusCode = 403;
            res.end('Access Denied: Protected System File');
            return;
          }
          next();
        });
      }
    }
  ]
});
```

### Fix for VULN-05: `DataScraperTool.tsx`
Add `maxLength={50000}` on the input textarea to prevent browser tab denial-of-service.

### Fix for VULN-06: `Contact.tsx` & `AIChatAssistant.tsx`
Update all `window.open` calls to include `'noopener,noreferrer'` features.

---

## 6. Self-Defense Monitoring Architecture & Operations

### A. Architecture Overview
- **Database**: SQLite via WebAssembly (`sql.js`), persisted to `.security/security_events.db`.
- **Append-only Security Events Schema**:
  ```sql
  CREATE TABLE security_events (
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
  ```
- **Active Protections**:
  1. **Honeypot Trapping**: Probes to `/wp-admin`, `/.env`, `/.git`, `/package.json`, `/.htaccess`, `/xmlrpc.php` result in immediate HTTP 403, 30-minute IP ban, and SQLite event logging.
  2. **Attack Signatures**: Intercepts SQL Injection (Union Select, Information Schema), XSS script injections, and directory traversal with HTTP 403 and 15-minute IP ban.
  3. **Scanner UA Blocking**: Identifies automated scanning tools (`sqlmap`, `nikto`, `acunetix`, `nmap`) and blocks access.
  4. **Sliding-Window Rate Limiting**: Caps requests to 120 req/min per IP; triggers HTTP 429 when exceeded.
  5. **PII / Secret Masking**: Passwords, tokens, cookies, auth headers, and credit card numbers are masked as `[REDACTED]` prior to SQLite write.
  6. **Data Retention**: Enforces 90-day retention with automatic startup purge and manual CLI purge.
  7. **Fail-Safe Design**: Any monitor error is caught and logged; application routing is never broken.

### B. Security CLI Commands (`npm run security:events`)
- **View recent security events**:
  ```bash
  npm run security:events list
  ```
- **View currently blocked IPs**:
  ```bash
  npm run security:events blocked
  ```
- **Manually unblock an IP**:
  ```bash
  npm run security:events unblock <ip-address>
  ```
- **Export audit events to JSON**:
  ```bash
  npm run security:events export [output.json]
  ```
- **Purge events older than 90 days**:
  ```bash
  npm run security:events purge [days]
  ```

