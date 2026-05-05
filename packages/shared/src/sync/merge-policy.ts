import type { WorkoutSession } from "../schemas/session.js";

export type MergeRecommendation =
  | { kind: "prefer_local"; reason: string }
  | { kind: "prefer_remote"; reason: string }
  | { kind: "requires_user_choice"; reason: string; conflictKeys: string[] };

export interface TimedSessionPayload {
  session: WorkoutSession;
  clientUpdatedAtMs: number;
  sourceDeviceId: string;
}

export function listTopLevelSessionConflictKeys(
  local: WorkoutSession,
  remote: WorkoutSession
): string[] {
  const keys: (keyof WorkoutSession)[] = [
    "userId",
    "startedAt",
    "endedAt",
    "title",
    "exercises",
    "notes",
    "mood",
    "metrics",
    "tags",
  ];
  const conflicts: string[] = [];
  for (const k of keys) {
    const a = local[k];
    const b = remote[k];
    if (JSON.stringify(a) !== JSON.stringify(b)) {
      conflicts.push(k);
    }
  }
  return conflicts;
}

/**
 * Heuristic pre-merge suggestion. **Always** allow the user to override (Design Concept: prompt merge).
 * - If payloads are identical, either side is fine.
 * - If only one device moved `clientUpdatedAtMs` forward, prefer that payload for scalar conflicts.
 * - If both diverged on structured fields (e.g.exercises), force user merge.
 */
export function recommendWorkoutSessionMerge(args: {
  local: TimedSessionPayload;
  remote: TimedSessionPayload;
}): MergeRecommendation {
  const { local, remote } = args;
  const conflicts = listTopLevelSessionConflictKeys(local.session, remote.session);

  if (conflicts.length === 0) {
    return {
      kind: "prefer_local",
      reason: "Identical_session_payloads",
    };
  }

  if (conflicts.includes("exercises")) {
    return {
      kind: "requires_user_choice",
      reason: "Exercise_logs_diverged",
      conflictKeys: conflicts,
    };
  }

  if (local.clientUpdatedAtMs > remote.clientUpdatedAtMs) {
    return {
      kind: "prefer_local",
      reason: "Local_newer_clientUpdatedAtMs",
    };
  }
  if (remote.clientUpdatedAtMs > local.clientUpdatedAtMs) {
    return {
      kind: "prefer_remote",
      reason: "Remote_newer_clientUpdatedAtMs",
    };
  }

  return {
    kind: "requires_user_choice",
    reason: "Same_timestamp_divergent_payload",
    conflictKeys: conflicts,
  };
}

/**
 * Field-level merge hints for UI: scalar conflicts can show side-by-side pickers.
 */
export function summarizeScalarConflicts(
  local: WorkoutSession,
  remote: WorkoutSession
): { key: string; local: unknown; remote: unknown }[] {
  const keys = listTopLevelSessionConflictKeys(local, remote).filter(
    (k) => k !== "exercises"
  );
  return keys.map((key) => ({
    key,
    local: local[key as keyof WorkoutSession],
    remote: remote[key as keyof WorkoutSession],
  }));
}
