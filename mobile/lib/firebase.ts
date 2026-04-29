import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  type Auth,
  type Persistence,
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  type Firestore,
} from "firebase/firestore";
import { Platform } from "react-native";

export type FirebaseExtra = {
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
};

/** RN `firebase/auth` resolves to a build that includes this at runtime; web typings omit it. */
function getRnPersistence(storage: typeof AsyncStorage): Persistence {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getReactNativePersistence } = require("firebase/auth") as {
    getReactNativePersistence: (s: typeof AsyncStorage) => Persistence;
  };
  return getReactNativePersistence(storage);
}

function mergedExtra(): Record<string, unknown> {
  const legacy = (
    Constants as unknown as { manifest?: { extra?: Record<string, unknown> } }
  ).manifest?.extra;
  const fromConfig = Constants.expoConfig?.extra as Record<string, unknown> | undefined;
  return { ...legacy, ...fromConfig };
}

/** Metro inlines EXPO_PUBLIC_* only when accessed as literal property names (not dynamic keys). */
function readExtra(): FirebaseExtra {
  const e = mergedExtra();
  return {
    firebaseApiKey: String(
      e.firebaseApiKey ?? process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? ""
    ),
    firebaseAuthDomain: String(
      e.firebaseAuthDomain ?? process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? ""
    ),
    firebaseProjectId: String(
      e.firebaseProjectId ?? process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? ""
    ),
    firebaseStorageBucket: String(
      e.firebaseStorageBucket ?? process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? ""
    ),
    firebaseMessagingSenderId: String(
      e.firebaseMessagingSenderId ?? process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? ""
    ),
    firebaseAppId: String(e.firebaseAppId ?? process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? ""),
  };
}

export function isFirebaseConfigured(): boolean {
  const x = readExtra();
  return Boolean(
    x.firebaseApiKey &&
      x.firebaseAuthDomain &&
      x.firebaseProjectId &&
      x.firebaseAppId
  );
}

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

export function getFirebaseApp(): FirebaseApp | undefined {
  if (!isFirebaseConfigured()) return undefined;
  if (app) return app;
  const x = readExtra();
  app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: x.firebaseApiKey,
        authDomain: x.firebaseAuthDomain,
        projectId: x.firebaseProjectId,
        storageBucket: x.firebaseStorageBucket,
        messagingSenderId: x.firebaseMessagingSenderId,
        appId: x.firebaseAppId,
      });
  return app;
}

export function getFirebaseAuth(): Auth | undefined {
  const a = getFirebaseApp();
  if (!a) return undefined;
  if (auth) return auth;
  if (Platform.OS === "web") {
    auth = getAuth(a);
    return auth;
  }
  try {
    auth = initializeAuth(a, {
      persistence: getRnPersistence(AsyncStorage),
    });
  } catch {
    auth = getAuth(a);
  }
  return auth;
}

export function getDb(): Firestore | undefined {
  const a = getFirebaseApp();
  if (!a) return undefined;
  if (!db) {
    if (Platform.OS === "web") {
      try {
        // Avoid IndexedDB persistence watch bugs on web/expo-web dev (Firestore INTERNAL ASSERTION errors).
        // Long polling improves flaky multiplex/WebChannel setups behind localhost reverse proxies.
        db = initializeFirestore(a, {
          localCache: memoryLocalCache(),
          experimentalForceLongPolling: true,
        });
      } catch {
        db = getFirestore(a);
      }
    } else {
      db = getFirestore(a);
    }
  }
  return db;
}
