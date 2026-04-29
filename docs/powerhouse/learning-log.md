# Learning log (Reformer Pilates Tracker)

## Firebase vs Supabase

- **What:** This app uses **Firebase Auth** (anonymous sign-in for MVP) and **Cloud Firestore** for workout sessions, with security rules under [`firebase/firestore.rules`](../../firebase/firestore.rules) at the repo root.
- **Why here:** The product goal was Firebase-first mobile sync with minimal backend code; Powerhouse’s default stack still lists Supabase for other projects—this repo is an intentional exception.
- **Link:** [Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started)

## Development client: one APK, instant updates from the PC

- **What:** [`expo-dev-client`](https://docs.expo.dev/develop/development-builds/introduction/) is a **custom build of your app** (install once as an APK). Day to day you run **`npm run start:dev`** in [`mobile/`](../../mobile/) so Metro on the PC serves JavaScript; the open dev client **reloads in seconds** (Fast Refresh). You only run a **new EAS build** when you change **native** code, plugins, or SDK versions—not for normal UI/TS edits.
- **One-time setup:** Install [EAS CLI](https://docs.expo.dev/build/setup/), `eas login`, `cd mobile`, `eas build:configure` (creates/ links the Expo project), then `eas build --profile development --platform android`, download the **APK**, enable “Install unknown apps” on the phone, install.
- **Daily loop (reliable networking):** Prefer **phone hotspot** (PC joins the phone’s Wi‑Fi) or **Tailscale** on PC + phone, then `npm run start:dev` or `npm run start:host -- <PC-IP>` — same as [Expo Go across networks](#expo-go-across-networks-tunnel-vs-hostname) but use the **dev client** app icon instead of Expo Go.
- **Profiles:** [`mobile/eas.json`](../../mobile/eas.json) — `development` = dev client + APK; `preview` = internal APK without dev menu; `production` = Play-style bundle.

## Expo Go across networks (tunnel vs hostname)

- **What:** `npx expo start --tunnel` relies on Expo’s **ngrok** integration; it can fail with timeouts or `remote gone away` (firewall, ISP, or ngrok load). This repo **patches `@expo/cli`** to extend the ngrok wait to **120s** ([`patches/@expo+cli+54.0.23.patch`](../../patches/@expo+cli+54.0.23.patch)) and installs **`patch-package`** on `npm install` at the repo root.
- **Reliable options:** (1) **Phone mobile hotspot** — connect the PC to it, then `npm start` in `mobile/` and use the **LAN** QR/URL. (2) **Tailscale** on PC + phone, then `npm run start:host -- <PC-Tailscale-IP>` in `mobile/` (see [`mobile/scripts/with-packager-host.js`](../../mobile/scripts/with-packager-host.js)).
- **Link:** [Expo tunneling / networking](https://docs.expo.dev/more/expo-cli/#tunneling)

## Monorepo + shared session model

- **What:** [`packages/shared`](../../packages/shared) holds Zod schemas and `workoutSessionFromSummary` so Firestore payloads stay consistent. The root `package.json` workspaces are **`mobile` and `packages/shared`** only. The legacy Next.js `web/` app was removed; the duplicate-React hoisting issue no longer applies.
- **Why:** Session shape is a common source of bugs; one mapper + tests beats duplicating field names in the app and the rules.
