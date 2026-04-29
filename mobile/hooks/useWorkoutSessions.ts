import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { type SessionDoc, subscribeUserSessions } from "@/lib/sessions";

export function useWorkoutSessions() {
  const { user, ready, firebaseEnabled } = useAuth();
  const [sessions, setSessions] = useState<SessionDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!firebaseEnabled || !user) {
      setSessions([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    const unsub = subscribeUserSessions(
      user.uid,
      (list) => {
        setSessions(list);
        setLoading(false);
        setError(null);
      },
      (e) => {
        setError(e.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [user, ready, firebaseEnabled]);

  return { sessions, loading, error, hasFirebase: firebaseEnabled && !!user };
}
