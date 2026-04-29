/**
 * Starts Expo with REACT_NATIVE_PACKAGER_HOSTNAME set so Expo Go can reach the dev server
 * across networks when you use Tailscale or connect your PC to the phone's mobile hotspot.
 *
 * Usage (from mobile/):
 *   node scripts/with-packager-host.js 100.64.0.1
 *   npm run start:host -- 100.64.0.1
 */
const { spawn } = require("child_process");
const path = require("path");

const host = process.argv[2]?.trim();
if (!host) {
  console.error(`
Missing hostname. Examples:
  npm run start:host -- 100.x.x.x     (PC Tailscale IP — install Tailscale on PC + phone)
  npm run start:host -- 172.20.10.2   (often your PC on iPhone Personal Hotspot — check ipconfig)

Easiest same-network option: turn on phone hotspot, connect this PC to it, then run:
  npm start
  and use the LAN URL / QR from the terminal.
`);
  process.exit(1);
}

process.env.REACT_NATIVE_PACKAGER_HOSTNAME = host;

const child = spawn("npx", ["expo", "start", "--dev-client"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: true,
  env: { ...process.env },
});

child.on("exit", (code) => process.exit(code ?? 0));
