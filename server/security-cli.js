import { getEvents, getBlockedIps, unblockIp, purgeOldEvents } from './security-monitor.js';

const args = process.argv.slice(2);
const command = args[0] || 'list';

async function main() {
  console.log('\x1b[36m🛡️ ShieldCore Security Event Console (SQLite)\x1b[0m');
  console.log('──────────────────────────────────────────────────────────');

  if (command === 'list') {
    const limit = parseInt(args[1], 10) || 25;
    const filter = args[2] || null;
    const events = await getEvents(limit, filter);

    if (events.length === 0) {
      console.log('No security events recorded yet in SQLite database.');
      return;
    }

    console.log(`Found ${events.length} security event(s):\n`);
    events.forEach((evt, idx) => {
      const sevColor = evt.severity === 'CRITICAL' ? '\x1b[31m' : evt.severity === 'HIGH' ? '\x1b[33m' : '\x1b[32m';
      console.log(
        `${idx + 1}. [${evt.timestamp}] ${sevColor}[${evt.severity}]\x1b[0m ${evt.event_type} (${evt.rule_id})\n` +
        `   IP: ${evt.source_ip} | Route: ${evt.method} ${evt.route} | Action: ${evt.action_taken}\n` +
        `   Payload: ${evt.redacted_payload || 'none'}`
      );
    });
  } else if (command === 'blocked') {
    const blocked = await getBlockedIps();
    if (blocked.length === 0) {
      console.log('No IP addresses are currently blocked.');
      return;
    }
    console.log(`Currently Blocked IPs (${blocked.length}):\n`);
    blocked.forEach((b, idx) => {
      console.log(`${idx + 1}. IP: ${b.ip} | Reason: ${b.reason} | Expires: ${b.expires_at}`);
    });
  } else if (command === 'unblock') {
    const ip = args[1];
    if (!ip) {
      console.error('Usage: npm run security:events unblock <ip-address>');
      process.exit(1);
    }
    const success = await unblockIp(ip);
    if (success) {
      console.log(`\x1b[32mSuccessfully unblocked IP: ${ip}\x1b[0m`);
    } else {
      console.log(`Failed to unblock IP: ${ip}`);
    }
  } else if (command === 'purge') {
    const days = parseInt(args[1], 10) || 90;
    purgeOldEvents(days);
    console.log(`\x1b[32mPurged security events older than ${days} days.\x1b[0m`);
  } else if (command === 'export') {
    const events = await getEvents(1000);
    console.log(JSON.stringify(events, null, 2));
  } else {
    console.log('Available commands:');
    console.log('  list [limit] [eventType]  - List recent security events (default: 25)');
    console.log('  blocked                   - List currently banned/blocked IPs');
    console.log('  unblock <ip>              - Remove an IP from the blocklist');
    console.log('  purge [days]              - Purge events older than N days (default: 90)');
    console.log('  export                    - Output recent events as JSON');
  }
}

main().catch(err => {
  console.error('[SecurityCLI] Error:', err.message);
  process.exit(1);
});
