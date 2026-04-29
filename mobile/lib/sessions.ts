import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  type QuerySnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import {
  workoutSessionFromSummary,
  type SummaryFormState,
  type WorkoutSession,
} from "@reformer/shared";

import { getDb } from "@/lib/firebase";

export type SessionDoc = WorkoutSession & { id: string };

function sessionsFromSnapshot(snap: QuerySnapshot): SessionDoc[] {
  const list: SessionDoc[] = snap.docs.map((d) => {
    const data = d.data() as Omit<WorkoutSession, "id">;
    return { id: d.id, ...data };
  });
  list.sort((a, b) => (b.endedAt ?? 0) - (a.endedAt ?? 0));
  return list.slice(0, 50);
}

export async function saveWorkoutSession(
  uid: string,
  summary: SummaryFormState
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured");
  const payload = workoutSessionFromSummary(uid, summary);
  await addDoc(collection(db, "sessions"), payload);
}

export function subscribeUserSessions(
  uid: string,
  onNext: (sessions: SessionDoc[]) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const db = getDb();
  if (!db) {
    onNext([]);
    return () => {};
  }
  // Equality-only query (no orderBy): avoids composite index requirement and flaky watch state on web
  // when userId + orderBy(endedAt) index is missing. Newest-first order is applied client-side.
  const q = query(collection(db, "sessions"), where("userId", "==", uid));
  return onSnapshot(
    q,
    (snap) => {
      onNext(sessionsFromSnapshot(snap));
    },
    (err) => onError?.(err as Error)
  );
}
