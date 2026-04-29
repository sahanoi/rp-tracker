import { workoutSessionFromSummary } from "./session-mapper.js";
import { workoutSessionSchema } from "./schemas/session.js";

describe("workoutSessionFromSummary", () => {
  it("builds a valid WorkoutSession for Firestore", () => {
    const state = {
      title: "Reformer — precision block",
      mood: "Focused",
      sequences: [
        { name: "Reformer footwork series", sets: "4 × 12" },
        { name: "The elephant sequence", sets: "3 × 8" },
      ],
      durationMinutes: 42,
      flowTensionLabel: "2,840 lbs total",
      sequenceCount: 12,
    };
    const doc = workoutSessionFromSummary("user-1", state, 1_700_000_000_000);
    const parsed = workoutSessionSchema.omit({ id: true }).parse(doc);
    expect(parsed.userId).toBe("user-1");
    expect(parsed.title).toBe(state.title);
    expect(parsed.endedAt - parsed.startedAt).toBe(42 * 60_000);
    expect(parsed.exercises).toHaveLength(2);
    expect(parsed.exercises[0]?.name).toBe("Reformer footwork series");
    expect(parsed.metrics?.durationMinutes).toBe(42);
  });

  it("uses explicit startedAtMs and endedAtMs when provided", () => {
    const state = {
      title: "Sabah mat",
      mood: null,
      sequences: [{ name: "Mekik", sets: "10 tekrar" }],
      durationMinutes: 999,
      flowTensionLabel: "—",
      sequenceCount: 1,
      startedAtMs: 1_700_000_000_000,
      endedAtMs: 1_700_000_000_000 + 30 * 60_000,
    };
    const doc = workoutSessionFromSummary("user-1", state);
    expect(doc.startedAt).toBe(state.startedAtMs);
    expect(doc.endedAt).toBe(state.endedAtMs);
    expect(doc.metrics?.durationMinutes).toBe(30);
  });
});
