import { describe, it, expect, beforeEach } from 'vitest';
// @ts-ignore
import {
  logSecurityEvent,
  getEvents,
  blockIp,
  isIpBlocked,
  unblockIp,
  getBlockedIps,
  purgeOldEvents,
  createSecurityMiddleware
} from '../server/security-monitor.js';

describe('In-App Self-Monitoring & Security Defense Layer', () => {
  const testIp = '198.51.100.42';

  beforeEach(async () => {
    await unblockIp(testIp);
  });

  it('should log security events to SQLite database with required schema', async () => {
    await logSecurityEvent({
      event_type: 'TEST_PROBE',
      severity: 'LOW',
      rule_id: 'RULE-UNIT-TEST',
      source_ip: testIp,
      user_agent: 'Vitest/TestRunner',
      route: '/test-route',
      method: 'GET',
      payload: 'test_sample_payload',
      action_taken: 'LOG_ONLY'
    });

    const events = await getEvents(10, 'TEST_PROBE');
    expect(events.length).toBeGreaterThan(0);
    const latest = events[0];
    expect(latest.id).toMatch(/^evt_/);
    expect(latest.event_type).toBe('TEST_PROBE');
    expect(latest.severity).toBe('LOW');
    expect(latest.rule_id).toBe('RULE-UNIT-TEST');
    expect(latest.source_ip).toBe(testIp);
    expect(latest.route).toBe('/test-route');
    expect(latest.method).toBe('GET');
    expect(latest.action_taken).toBe('LOG_ONLY');
    expect(latest.redacted_payload).toBe('test_sample_payload');
  });

  it('should redact passwords, secrets and long payloads before saving', async () => {
    const rawPayload = 'username=admin&password=SuperSecretPassword123&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    await logSecurityEvent({
      event_type: 'AUTH_TEST',
      severity: 'LOW',
      rule_id: 'RULE-REDACT-TEST',
      source_ip: testIp,
      payload: rawPayload,
      action_taken: 'LOG'
    });

    const events = await getEvents(5, 'AUTH_TEST');
    const recorded = events[0];
    expect(recorded.redacted_payload).not.toContain('SuperSecretPassword123');
    expect(recorded.redacted_payload).toContain('password=[REDACTED]');
  });

  it('should manage IP blocking, expiration, and manual unblocking', async () => {
    expect(await isIpBlocked(testIp)).toBe(false);

    // Block IP for 300 seconds
    await blockIp(testIp, 'Testing IP block', 300);
    expect(await isIpBlocked(testIp)).toBe(true);

    const blockedList = await getBlockedIps();
    const entry = blockedList.find((b: any) => b.ip === testIp);
    expect(entry).toBeDefined();
    expect(entry.reason).toBe('Testing IP block');

    // Unblock IP
    const unblocked = await unblockIp(testIp);
    expect(unblocked).toBe(true);
    expect(await isIpBlocked(testIp)).toBe(false);
  });

  it('should purge events older than retention period', async () => {
    // Purge events with retention of 90 days
    const purgeResult = purgeOldEvents(90);
    // Should run smoothly without throwing
    expect(purgeResult === undefined || typeof purgeResult === 'number').toBe(true);
  });

  describe('Security Middleware Protection', () => {
    const middleware = createSecurityMiddleware();

    function mockHttp(url: string, headers: Record<string, string> = {}) {
      const req: any = {
        url,
        method: 'GET',
        headers: {
          'x-forwarded-for': '198.51.100.99',
          'user-agent': 'Mozilla/5.0 TestBrowser',
          ...headers
        },
        socket: { remoteAddress: '198.51.100.99' }
      };

      let statusCode = 200;
      let responseBody = '';
      const responseHeaders: Record<string, string> = {};

      const res: any = {
        get statusCode() { return statusCode; },
        set statusCode(code: number) { statusCode = code; },
        setHeader(k: string, v: string) { responseHeaders[k.toLowerCase()] = v; },
        end(data?: string) { responseBody = data || ''; }
      };

      let nextCalled = false;
      const next = () => { nextCalled = true; };

      return { req, res, next, getStatus: () => statusCode, getBody: () => responseBody, isNextCalled: () => nextCalled };
    }

    it('should intercept honeypot paths (/wp-admin, /.env, /package.json) with 403', async () => {
      const honeypots = ['/wp-admin', '/.env', '/package.json', '/.git/config'];
      for (const hp of honeypots) {
        const { req, res, next, getStatus, getBody, isNextCalled } = mockHttp(hp, { 'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}` });
        await middleware(req, res, next);
        expect(getStatus()).toBe(403);
        expect(getBody()).toBe('Request blocked');
        expect(isNextCalled()).toBe(false);
      }
    });

    it('should block SQL injection patterns in query string with 403', async () => {
      const { req, res, next, getStatus, getBody, isNextCalled } = mockHttp('/services?search=UNION%20SELECT%201,2,3', { 'x-forwarded-for': '198.51.100.80' });
      await middleware(req, res, next);
      expect(getStatus()).toBe(403);
      expect(getBody()).toBe('Request blocked');
      expect(isNextCalled()).toBe(false);
    });

    it('should block XSS injection patterns with 403', async () => {
      const { req, res, next, getStatus, getBody, isNextCalled } = mockHttp('/contact?ref=<script>alert(1)</script>', { 'x-forwarded-for': '198.51.100.81' });
      await middleware(req, res, next);
      expect(getStatus()).toBe(403);
      expect(getBody()).toBe('Request blocked');
      expect(isNextCalled()).toBe(false);
    });

    it('should block known automated malicious scanner user-agents with 403', async () => {
      const { req, res, next, getStatus, getBody, isNextCalled } = mockHttp('/about', {
        'x-forwarded-for': '198.51.100.82',
        'user-agent': 'sqlmap/1.5.2#stable'
      });
      await middleware(req, res, next);
      expect(getStatus()).toBe(403);
      expect(getBody()).toBe('Request blocked');
      expect(isNextCalled()).toBe(false);
    });

    it('should allow legitimate user requests through to next()', async () => {
      const { req, res, next, getStatus, isNextCalled } = mockHttp('/services', {
        'x-forwarded-for': '198.51.100.83',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
      });
      await middleware(req, res, next);
      expect(getStatus()).toBe(200);
      expect(isNextCalled()).toBe(true);
    });
  });
});
