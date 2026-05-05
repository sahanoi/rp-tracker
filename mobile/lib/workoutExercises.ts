/** Baseline catalog ships in the bundle; remote overlays follow hybrid rules in `@reformer/shared`. */
import {
  categoryPrefersSpringTension,
  listFlatReformerExercises,
  type DifficultyLevel,
  type FlatReformerExercise,
} from "@/lib/reformerExerciseCatalog";
import { EXERCISE_MEDIA_MAP } from "@/lib/exerciseMediaMap";

export type WorkoutExerciseId = string;

/** Compatible with expo-image `source` (remote PNG/JPEG/GIF, or `require()` asset). */
export type WorkoutExerciseMediaSource = string | { uri: string } | number;

export type WorkoutExercise = {
  id: WorkoutExerciseId;
  /** Primary headline (Turkish). */
  title: string;
  /** English name (secondary line on pick cards). */
  subtitle?: string;
  categoryId: string;
  categoryTitle: string;
  categoryColor: string;
  difficulties: readonly DifficultyLevel[];
  requiresSpringTension: boolean;
  media?: WorkoutExerciseMediaSource;
};

function toWorkoutExercise(f: FlatReformerExercise): WorkoutExercise {
  return {
    id: f.id,
    title: f.titleTr,
    subtitle: f.titleEn,
    categoryId: f.categoryId,
    categoryTitle: f.categoryTitle,
    categoryColor: f.categoryColor,
    difficulties: [...f.difficulties],
    requiresSpringTension: categoryPrefersSpringTension(f.categoryId),
    media: EXERCISE_MEDIA_MAP[f.id],
  };
}

function buildCatalog(): WorkoutExercise[] {
  return listFlatReformerExercises().map(toWorkoutExercise);
}

const catalog: WorkoutExercise[] = buildCatalog();

const byId = new Map<string, WorkoutExercise>(
  catalog.map((e) => [e.id, e])
);

export function listWorkoutExercises(): WorkoutExercise[] {
  return catalog;
}

export function getWorkoutExercise(id: string | undefined): WorkoutExercise | null {
  if (!id) return null;
  return byId.get(id) ?? null;
}
