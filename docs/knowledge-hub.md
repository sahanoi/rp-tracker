# Knowledge hub (kritik notlar)

Kısa referans; detay için kod ve `firebase/` dosyalarına bak.

## Çalıştırma

- Kök: `npm run web` (tarayıcı, port `mobile/package.json` içinde, örn. 19006), `npm run dev` (dev client + Metro).
- `packages/shared` değiştiyse: kökten `npm run build:shared`.

## Ortam ve config

- Gizli/istemci anahtarlar: **`mobile/.env`** — `EXPO_PUBLIC_*` prefix; dosya **git’e gitmez** (`.gitignore`).
- Monorepo kökünden `npm run web` çalışırken **`.env` her zaman `mobile/.env`’den** yüklensin diye `mobile/app.config.js` başında `loadEnvNextToThisFile()` var — bunu silme.
- `process.env.EXPO_PUBLIC_*` uygulama kodunda **sadece sabit property adlarıyla** (`process.env.EXPO_PUBLIC_FIREBASE_API_KEY`) kullan; **dinamik `process.env[key]`** Metro’da gömülmez.

## Firebase

- **Auth:** Anonymous + **Firestore** (`sessions`). Kurallar: **`firebase/firestore.rules`** — konsola yapıştırılmış olmalı.
- **Activity** gerçek veri: `hasFirebase && sessions.length`; aksi halde mock satırlar. Liste için **composite index** gerekebilir (konsol/link veya Firestore → Indexes).
- Ağda `accounts:*` = Auth; `channel?...database=projects/...` = Firestore dinleyici; normal.

## Web / UX

- `react-native-web` içinde **`Alert.alert` çalışmaz** — uygulama için **`mobile/lib/alertCompat.ts`** kullan.

## Sorun giderme

- Env/config değişince: Metro’yu **durdur**, gerekirse `--clear`, tarayıcıda **hard refresh** (Ctrl+Shift+R).
- Port meşgul: başka port veya eski Expo sürecini kapat.
