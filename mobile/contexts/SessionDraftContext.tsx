import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { LogFieldValues } from "@/lib/exerciseDefinitions";

export type SessionExerciseLine = {
  name: string;
  /** Flattened persisted summary (Firestore / özet ekranı). */
  sets?: string;
  exerciseId?: string;
  /** Kayıtlı set satırları (çoklu set tek blokta). */
  setRows?: LogFieldValues[];
  note?: string;
};

export type SessionDraft = {
  name: string;
  startedAtMs: number;
  exercises: SessionExerciseLine[];
  routineTemplateId: string | null;
  /** Display label for the selected routine template (if any). */
  routineTemplateName: string | null;
  baselineRoutineExerciseIds: string[] | null;
};

export type BeginSessionOptions = {
  routineTemplateId?: string | null;
  routineTemplateName?: string | null;
  baselineExerciseIds?: string[] | null;
};

type SessionDraftContextValue = {
  draft: SessionDraft | null;
  beginSession: (name: string, opts?: BeginSessionOptions) => boolean;
  pushExercise: (line: SessionExerciseLine) => void;
  replaceExerciseAt: (index: number, line: SessionExerciseLine) => void;
  clearDraft: () => void;
};

const SessionDraftContext = createContext<SessionDraftContextValue | undefined>(
  undefined
);

export function SessionDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<SessionDraft | null>(null);

  const beginSession = useCallback(
    (name: string, opts?: BeginSessionOptions) => {
      const trimmed = name.trim();
      if (!trimmed) return false;
      const rid = opts?.routineTemplateId ?? null;
      const rname = opts?.routineTemplateName ?? null;
      const baseline = opts?.baselineExerciseIds
        ? [...opts.baselineExerciseIds]
        : null;
      setDraft({
        name: trimmed,
        startedAtMs: Date.now(),
        exercises: [],
        routineTemplateId: rid,
        routineTemplateName: rname,
        baselineRoutineExerciseIds: baseline,
      });
      return true;
    },
    []
  );

  const pushExercise = useCallback((line: SessionExerciseLine) => {
    setDraft((d) => {
      if (!d) return d;
      return { ...d, exercises: [...d.exercises, line] };
    });
  }, []);

  const replaceExerciseAt = useCallback(
    (index: number, line: SessionExerciseLine) => {
      setDraft((d) => {
        if (!d) return d;
        if (index < 0 || index >= d.exercises.length) return d;
        const next = [...d.exercises];
        next[index] = line;
        return { ...d, exercises: next };
      });
    },
    []
  );

  const clearDraft = useCallback(() => setDraft(null), []);

  const value = useMemo(
    () => ({
      draft,
      beginSession,
      pushExercise,
      replaceExerciseAt,
      clearDraft,
    }),
    [draft, beginSession, pushExercise, replaceExerciseAt, clearDraft]
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
