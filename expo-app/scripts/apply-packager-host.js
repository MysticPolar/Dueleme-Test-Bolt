/**
 * Forces Metro / Expo to advertise the same IPv4 the phone must use (avoids VPN/virtual NIC IPs).
 */
function applyPackagerHost(ip) {
  process.env.REACT_NATIVE_PACKAGER_HOSTNAME = ip;
  process.env.EXPO_PACKAGER_HOSTNAME = ip;
  process.env.RCT_METRO_HOST = ip;
  process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS = '0.0.0.0';
}

module.exports = { applyPackagerHost };
