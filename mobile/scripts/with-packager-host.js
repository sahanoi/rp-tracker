/**
 * Starts Expo with REACT_NATIVE_PACKAGER_HOSTNAME set so Expo Go can reach the dev server
 * across networks when you use Tailscale or connect your PC to the phone's mobile hotspot.
 *
 * Usage (from mobile/):
 *   node scripts/with-packager-host.js 100.64.0.1
 *   npm run start:host -- 100.64.0.1
 *   npm run start:host -- 100.64.0.1 8082   (if 8081 is already in use)
 *
 * Port: optional 3rd arg or EXPO_METRO_PORT (default 8081). A fixed --port avoids Expo
 * prompting when the default port is taken (non-interactive shells would skip the server).
 */
const { spawn } = require("child_process");
const path = require("path");

const host = process.argv[2]?.trim();
const port =
  process.argv[3]?.trim() || process.env.EXPO_METRO_PORT?.trim() || "8081";
if (!host) {
  console.error(`
Missing hostname. Examples:
  npm run start:host -- 100.x.x.x     (PC Tailscale IP — install Tailscale on PC + phone)
  npm run start:host -- 172.20.10.2   (often your PC on iPhone Personal Hotspot — check ipconfig)
  npm run start:host -- 100.x.x.x 8082   (Metro port if 8081 is busy)

Easiest same-network option: turn on phone hotspot, connect this PC to it, then run:
  npm start
  and use the LAN URL / QR from the terminal.
`);
  process.exit(1);
}

process.env.REACT_NATIVE_PACKAGER_HOSTNAME = host;

const child = spawn("npx", ["expo", "start", "--dev-client", "--port", port], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: true,
  env: { ...process.env },
});

child.on("exit", (code) => process.exit(code ?? 0));
