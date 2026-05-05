import type { WorkoutExerciseId } from "@/lib/workoutExercises";

/** Which inputs appear on the live exercise card (Faz 1). */
export type LogFieldKey =
  | "reps"
  | "rpe"
  | "durationSec"
  | "weight";

export type ExerciseLogDefinition = {
  id: WorkoutExerciseId;
  fields: LogFieldKey[];
  showSpringTension: boolean;
  /** UI etiketi (ör. RPE yerine "Form (1–10)"). */
  fieldLabels?: Partial<Record<LogFieldKey, string>>;
};

const DEFAULT_DEF: Omit<ExerciseLogDefinition, "id"> = {
  fields: ["reps", "rpe"],
  showSpringTension: false,
};

export function getExerciseLogDefinition(
  id: WorkoutExerciseId | string
): ExerciseLogDefinition {
  return { id: id as WorkoutExerciseId, ...DEFAULT_DEF };
}

export type LogFieldValues = {
  reps: string;
  rpe: string;
  durationSec: string;
  weight: string;
};

export function emptyLogRow(): LogFieldValues {
  return { reps: "", rpe: "", durationSec: "", weight: "" };
}

/** Taslak/setRows taşmasından sonra tüm alan anahtarlarını doldurur. */
export function normalizeLogRows(rows: LogFieldValues[]): LogFieldValues[] {
  if (rows.length === 0) return [emptyLogRow()];
  return rows.map((r) => ({ ...emptyLogRow(), ...r }));
}

export function rowHasLogContent(
  def: ExerciseLogDefinition,
  v: LogFieldValues
): boolean {
  for (const k of def.fields) {
    const val = v[k];
    if (typeof val === "string" && val.trim().length > 0) return true;
  }
  return false;
}

export function buildSetsSummary(
  def: ExerciseLogDefinition,
  v: LogFieldValues
): string {
  const parts: string[] = [];

  if (def.fields.includes("weight") && v.weight.trim()) {
    parts.push(`${v.weight.trim()} kg`);
  }
  if (def.fields.includes("reps") && v.reps.trim()) {
    parts.push(`${v.reps.trim()} tekrar`);
  }
  if (def.fields.includes("durationSec") && v.durationSec.trim()) {
    parts.push(`${v.durationSec.trim()} sn`);
  }

  if (def.fields.includes("rpe") && v.rpe.trim()) {
    const tag = def.fieldLabels?.rpe ? "Form" : "RPE";
    parts.push(`${tag} ${v.rpe.trim()}`);
  }

  return parts.length > 0 ? parts.join(" · ") : "—";
}

/** Firestore / taslak `sets` alanı: her set satırı numaralı tek metin. */
export function buildPersistedSetsFromRows(
  def: ExerciseLogDefinition,
  rows: LogFieldValues[]
): string {
  const kept = rows.filter((r) => rowHasLogContent(def, r));
  if (kept.length === 0) return "—";
  return kept
    .map((r, i) => `${i + 1} · ${buildSetsSummary(def, r)}`)
    .join("\n");
}
