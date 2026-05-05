import AsyncStorage from "@react-native-async-storage/async-storage";

/** v2: IDs match `reformerExerciseCatalog` slug format (replaced legacy test slugs). */
const STORAGE_KEY = "reformer_routine_templates_v2";

export type RoutineTemplate = {
  id: string;
  name: string;
  exerciseIds: string[];
  updatedAtMs: number;
};

function seedRoutines(): RoutineTemplate[] {
  const now = Date.now();
  return [
    {
      id: "routine-sample-reformer-warmup-1",
      name: "Örnek reformer giriş",
      exerciseIds: [
        "breathing__breathing",
        "breathing__lateral-breathing",
        "reformer-core__footwork-toes",
        "reformer-core__footwork-arches",
        "reformer-core__hundred",
      ],
      updatedAtMs: now,
    },
    {
      id: "routine-sample-mat-1",
      name: "Örnek mat temel",
      exerciseIds: [
        "mat__the-hundred",
        "mat__roll-up",
        "mat__single-leg-circle",
        "mat__rolling-like-a-ball",
      ],
      updatedAtMs: now,
    },
  ];
}

export async function loadRoutineTemplates(): Promise<RoutineTemplate[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedRoutines();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as RoutineTemplate[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = seedRoutines();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return parsed;
  } catch {
    return seedRoutines();
  }
}

export async function saveRoutineTemplates(
  routines: RoutineTemplate[]
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
}

export async function updateRoutineExerciseIds(
  routineId: string,
  exerciseIds: string[]
): Promise<void> {
  const list = await loadRoutineTemplates();
  const next = list.map((r) =>
    r.id === routineId
      ? { ...r, exerciseIds: [...exerciseIds], updatedAtMs: Date.now() }
      : r
  );
  await saveRoutineTemplates(next);
}
