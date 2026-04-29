import type { SessionExercise, WorkoutSession } from "./schemas/session.js";

export type SummaryFormState = {
  title: string;
  mood: string | null;
  sequences: { name: string; sets: string }[];
  durationMinutes: number;
  flowTensionLabel: string;
  sequenceCount: number;
  /** When set, persisted as `startedAt` on the workout session (epoch ms). */
  startedAtMs?: number;
  /** When set, persisted as `endedAt`; defaults to mapper `nowMs`. */
  endedAtMs?: number;
};

/**
 * Maps the session summary screen state into a Firestore-ready workout session document.
 */
export function workoutSessionFromSummary(
  userId: string,
  state: SummaryFormState,
  nowMs: number = Date.now()
): Omit<WorkoutSession, "id"> {
  const endedAt = state.endedAtMs ?? nowMs;
  const startedAt =
    state.startedAtMs != null
      ? state.startedAtMs
      : endedAt - state.durationMinutes * 60_000;

  const durationMinutes =
    state.startedAtMs != null
      ? Math.max(1, Math.round((endedAt - startedAt) / 60_000))
      : state.durationMinutes;

  const exercises: SessionExercise[] = state.sequences.map((s) => ({
    name: s.name,
    sets: s.sets,
  }));

  return {
    userId,
    title: state.title,
    startedAt,
    endedAt,
    exercises,
    mood: state.mood ?? undefined,
    metrics: {
      durationMinutes,
      flowTensionLabel: state.flowTensionLabel,
      sequenceCount: state.sequenceCount,
    },
  };
}
