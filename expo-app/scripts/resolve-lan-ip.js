/**
 * Picks the IPv4 phone + Metro should use. Prefer real Wi‑Fi/Ethernet (en0…)
 * over VPN / virtual interfaces (utun, bridge, Tailscale, etc.).
 */
const { execSync } = require('child_process');
const os = require('os');

function tryIpconfig(iface) {
  try {
    const out = execSync(`ipconfig getifaddr ${iface}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(out) && out !== '127.0.0.1') {
      return out;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function scoreCandidate(addr, iface) {
  let s = 0;
  if (/^en\d+$/i.test(iface)) s += 20;
  if (iface.startsWith('bridge')) s -= 50;
  if (/^utun|^awdl|^llw|^gif|^stf|^vbox|^vmnet|^docker|^veth|^bridge/i.test(iface)) {
    s -= 100;
  }
  if (addr.startsWith('192.168.')) s += 10;
  if (addr.startsWith('10.')) s += 5;
  if (addr.startsWith('172.')) s += 3;
  if (addr.startsWith('169.254.')) s -= 20;
  return s;
}

function resolveLanIp() {
  for (const iface of ['en0', 'en1', 'en2', 'en3']) {
    const ip = tryIpconfig(iface);
    if (ip) return ip;
  }

  const nets = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      const v4 = net.family === 'IPv4' || net.family === 4;
      if (!v4 || net.internal) continue;
      const addr = net.address;
      if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(addr)) continue;
      candidates.push({ addr, iface: name, score: scoreCandidate(addr, name) });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.addr || '127.0.0.1';
}

module.exports = { resolveLanIp };
