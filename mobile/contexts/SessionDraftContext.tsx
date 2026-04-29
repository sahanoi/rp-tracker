import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SessionExerciseLine = { name: string; sets?: string };

export type SessionDraft = {
  name: string;
  startedAtMs: number;
  exercises: SessionExerciseLine[];
};

type SessionDraftContextValue = {
  draft: SessionDraft | null;
  beginSession: (name: string) => boolean;
  pushExercise: (line: SessionExerciseLine) => void;
  clearDraft: () => void;
};

const SessionDraftContext = createContext<SessionDraftContextValue | undefined>(
  undefined
);

export function SessionDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<SessionDraft | null>(null);

  const beginSession = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    setDraft({
      name: trimmed,
      startedAtMs: Date.now(),
      exercises: [],
    });
    return true;
  }, []);

  const pushExercise = useCallback((line: SessionExerciseLine) => {
    setDraft((d) => {
      if (!d) return d;
      return { ...d, exercises: [...d.exercises, line] };
    });
  }, []);

  const clearDraft = useCallback(() => setDraft(null), []);

  const value = useMemo(
    () => ({ draft, beginSession, pushExercise, clearDraft }),
    [draft, beginSession, pushExercise, clearDraft]
  );

  return (
    <SessionDraftContext.Provider value={value}>
      {children}
    </SessionDraftContext.Provider>
  );
}

export function useSessionDraft() {
  const ctx = useContext(SessionDraftContext);
  if (!ctx) {
    throw new Error("useSessionDraft must be used within SessionDraftProvider");
  }
  return ctx;
}
