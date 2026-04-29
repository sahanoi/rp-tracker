import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

type AuthState = {
  user: User | null;
  ready: boolean;
  firebaseEnabled: boolean;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const firebaseEnabled = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseEnabled) {
      setReady(true);
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      setReady(true);
      return;
    }
    const unsub = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setReady(true);
      if (!next) {
        signInAnonymously(auth).catch(() => {
          setUser(null);
        });
      }
    });
    return () => unsub();
  }, [firebaseEnabled]);

  const value = useMemo(
    () => ({ user, ready, firebaseEnabled }),
    [user, ready, firebaseEnabled]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
