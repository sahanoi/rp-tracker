const fs = require("fs");
const path = require("path");

/**
 * Ensures EXPO_PUBLIC_* from mobile/.env apply even when Expo is started from the
 * repo root (npm workspaces); default dotenv discovery can miss mobile/.env.
 */
function loadEnvNextToThisFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!key.startsWith("EXPO_PUBLIC_")) continue;
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvNextToThisFile();

module.exports = ({ config }) => ({
  ...config,
  name: "Reformer Pilates",
  slug: "reformer-pilates-tracker",
  scheme: "reformer-pilates",
  ios: {
    ...config.ios,
    bundleIdentifier: "com.reformer.pilates.dev",
  },
  android: {
    ...config.android,
    package: "com.reformer.pilates.dev",
    adaptiveIcon: {
      ...config.android?.adaptiveIcon,
      backgroundColor: "#000000",
    },
  },
  splash: {
    ...config.splash,
    backgroundColor: "#000000",
  },
  userInterfaceStyle: "dark",
  extra: {
    ...config.extra,
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? "",
    firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    firebaseMessagingSenderId:
      process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? "",
  },
});
