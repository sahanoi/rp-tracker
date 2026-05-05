import { describe, expect, it } from "@jest/globals";
import {
  listTopLevelSessionConflictKeys,
  recommendWorkoutSessionMerge,
} from "./merge-policy.js";
import type { WorkoutSession } from "../schemas/session.js";

const baseSession = (): WorkoutSession => ({
  userId: "u1",
  title: "Leg day",
  startedAt: 1,
  endedAt: 2,
  exercises: [{ name: "Squat", sets: "3", reps: 5 }],
});

describe("merge-policy", () => {
  it("flags identical sessions as prefer_local", () => {
    const s = baseSession();
    const rec = recommendWorkoutSessionMerge({
      local: { session: s, clientUpdatedAtMs: 10, sourceDeviceId: "a" },
      remote: { session: s, clientUpdatedAtMs: 20, sourceDeviceId: "b" },
    });
    expect(rec.kind).toBe("prefer_local");
  });

  it("requires user choice when exercises diverge even if timestamps differ", () => {
    const localS = baseSession();
    const remoteS: WorkoutSession = {
      ...baseSession(),
      exercises: [{ name: "Squat", sets: "4", reps: 5 }],
    };
    const rec = recommendWorkoutSessionMerge({
      local: { session: localS, clientUpdatedAtMs: 100, sourceDeviceId: "a" },
      remote: { session: remoteS, clientUpdatedAtMs: 50, sourceDeviceId: "b" },
    });
    expect(rec.kind).toBe("requires_user_choice");
    if (rec.kind === "requires_user_choice") {
      expect(rec.conflictKeys).toContain("exercises");
    }
  });

  it("prefers newer scalar edits when exercises match", () => {
    const localS: WorkoutSession = { ...baseSession(), title: "A" };
    const remoteS: WorkoutSession = { ...baseSession(), title: "B" };
    expect(listTopLevelSessionConflictKeys(localS, remoteS)).toContain("title");
    const rec = recommendWorkoutSessionMerge({
      local: { session: localS, clientUpdatedAtMs: 200, sourceDeviceId: "a" },
      remote: { session: remoteS, clientUpdatedAtMs: 100, sourceDeviceId: "b" },
    });
    expect(rec.kind).toBe("prefer_local");
  });

  it("forces user choice when timestamps tie but payloads differ", () => {
    const localS: WorkoutSession = { ...baseSession(), mood: "good" };
    const remoteS: WorkoutSession = { ...baseSession(), mood: "ok" };
    const rec = recommendWorkoutSessionMerge({
      local: { session: localS, clientUpdatedAtMs: 50, sourceDeviceId: "a" },
      remote: { session: remoteS, clientUpdatedAtMs: 50, sourceDeviceId: "b" },
    });
    expect(rec.kind).toBe("requires_user_choice");
  });
});
