import { z } from "zod";

export const sessionExerciseSchema = z.object({
  name: z.string().min(1),
  sets: z.string().optional(),
  reps: z.number().int().nonnegative().optional(),
  rpe: z.number().int().min(1).max(10).optional(),
  notes: z.string().optional(),
});

export const sessionMetricsSchema = z.object({
  durationMinutes: z.number().nonnegative().optional(),
  flowTensionLabel: z.string().optional(),
  sequenceCount: z.number().int().nonnegative().optional(),
});

export const workoutSessionSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1),
  title: z.string().min(1),
  startedAt: z.number().int(),
  endedAt: z.number().int(),
  exercises: z.array(sessionExerciseSchema).default([]),
  notes: z.string().optional(),
  mood: z.string().optional(),
  metrics: sessionMetricsSchema.optional(),
  tags: z.array(z.string()).optional(),
});

export type SessionExercise = z.infer<typeof sessionExerciseSchema>;
export type SessionMetrics = z.infer<typeof sessionMetricsSchema>;
export type WorkoutSession = z.infer<typeof workoutSessionSchema>;

export function parseWorkoutSession(data: unknown): WorkoutSession {
  return workoutSessionSchema.parse(data);
}
