/**
 * Writes expo-go-qr.png + expo-preview-link.txt from the running Metro server.
 * After `npm run start` (tunnel) or `npm run start:lan`, run: npm run qr
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const METRO = process.env.EXPO_METRO_URL || 'http://127.0.0.1:8081';
const outDir = path.join(__dirname, '..');
const outPng = path.join(outDir, 'expo-go-qr.png');
const outTxt = path.join(outDir, 'expo-preview-link.txt');

const url = `${METRO}/_expo/link?choice=expo-go&platform=ios`;

http
  .get(url, (res) => {
    const loc = res.headers.location;
    if (res.statusCode >= 300 && res.statusCode < 400 && loc) {
      const stamp = new Date().toISOString();
      const txt = `Expo Go URL (encoded in expo-go-qr.png)\n${loc}\n\ngenerated: ${stamp}\n`;
      fs.writeFileSync(outTxt, txt, 'utf8');

      QRCode.toFile(outPng, loc, { width: 512, margin: 2 }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log('Wrote', outPng);
        console.log('Wrote', outTxt);
        console.log('Encodes:', loc);
      });
      return;
    }
    console.error('Expected 3xx with Location from Metro. Got', res.statusCode, loc);
    process.exit(1);
  })
  .on('error', (e) => {
    console.error('Start Metro first (npm run start in expo-app).', e.message);
    process.exit(1);
  });
