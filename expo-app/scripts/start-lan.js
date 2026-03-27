/**
 * LAN Metro + Vite preview URL derived from this machine's IPv4 (same as Expo Go needs).
 * Usage: node scripts/start-lan.js [-- extra expo args]
 */
const { spawn } = require('child_process');
const { resolveLanIp } = require('./resolve-lan-ip');
const { applyPackagerHost } = require('./apply-packager-host');

const ip = resolveLanIp();
applyPackagerHost(ip);

process.env.EXPO_PUBLIC_PREVIEW_URL = `http://${ip}:3000/`;

const extra = process.argv.slice(2);
const args = ['expo', 'start', '--lan', '--port', '8081', ...extra];

console.log(`[expo] Packager host: ${ip}`);
console.log(`[expo] EXPO_PUBLIC_PREVIEW_URL=${process.env.EXPO_PUBLIC_PREVIEW_URL}`);
console.log(`[expo] npx ${args.join(' ')}`);
console.log(
  '[expo] Phone must be on the same Wi‑Fi. If Expo Go still fails: macOS System Settings → Network → Firewall → allow incoming for Node.',
);

const child = spawn('npx', args, {
  stdio: 'inherit',
  env: process.env,
  shell: false,
});

child.on('exit', (code) => process.exit(code ?? 0));
