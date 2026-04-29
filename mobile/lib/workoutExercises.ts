export const WORKOUT_EXERCISE_IDS = [
  "mekik",
  "toe-tap-parmak",
  "arka-kol",
  "side-kick",
  "pilates-topunu-yakala",
  "kol-egzersizi",
  "arka-bacak",
  "cember-egzersizi",
  "pilates-topu-kopru",
  "yan-govde",
  "cadillac-thigh-stretch-roll-back",
  "cadillac-rolling-in-out-roll-back",
] as const;

export type WorkoutExerciseId = (typeof WORKOUT_EXERCISE_IDS)[number];

/** Compatible with expo-image `source` (remote PNG/JPEG/GIF, or `require()` asset). */
export type WorkoutExerciseMediaSource = string | { uri: string } | number;

export type WorkoutExercise = {
  id: WorkoutExerciseId;
  title: string;
  /** Short line under title on pick cards (Turkish equipment/context). */
  subtitle?: string;
  requiresSpringTension: boolean;
  media?: WorkoutExerciseMediaSource;
};

const catalog: WorkoutExercise[] = [
  {
    id: "mekik",
    title: "Mekik",
    subtitle: "Mat",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/01-mekik.jpg"),
  },
  {
    id: "toe-tap-parmak",
    title: "Toe Tap – Parmak Uçlarını Değdirme",
    subtitle: "Mat",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/02-toe-tap.jpg"),
  },
  {
    id: "arka-kol",
    title: "Arka Kol Egzersizi",
    subtitle: "Direnç lastiği",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/03-arka-kol-egzersizi.jpg"),
  },
  {
    id: "side-kick",
    title: "Side Kick",
    subtitle: "Mat",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/04-side-kick.jpg"),
  },
  {
    id: "pilates-topunu-yakala",
    title: "Pilates Topunu Yakalama",
    subtitle: "Pilates topu",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/05-pilates-topunu-yakalama.jpg"),
  },
  {
    id: "kol-egzersizi",
    title: "Kol Egzersizi",
    subtitle: "Direnç lastiği",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/06-kol-egzersizi.jpg"),
  },
  {
    id: "arka-bacak",
    title: "Arka Bacak Egzersizi",
    subtitle: "Mat",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/07-arka-bacak-egzersizi.jpg"),
  },
  {
    id: "cember-egzersizi",
    title: "Çember Egzersizi",
    subtitle: "Pilates çemberi",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/08-cember-egzersizi.jpg"),
  },
  {
    id: "pilates-topu-kopru",
    title: "Pilates Topu ile Köprü",
    subtitle: "Pilates topu · mat",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/09-pilates-topu-kopru.jpg"),
  },
  {
    id: "yan-govde",
    title: "Yan Gövde Egzersizi",
    subtitle: "Pilates çemberi · mat",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/10-yan-govde.jpg"),
  },
  {
    id: "cadillac-thigh-stretch-roll-back",
    title: "Thigh Stretch with Roll Back Bar on the Cadillac",
    subtitle: "Cadillac · roll back bar",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/11-thigh-stretch-cadillac.webp"),
  },
  {
    id: "cadillac-rolling-in-out-roll-back",
    title: "Rolling In and Out with Roll Back Bar on the Cadillac",
    subtitle: "Cadillac · roll back bar",
    requiresSpringTension: false,
    media: require("../assets/workout-src-by-user/12-rolling-in-out-cadillac.webp"),
  },
];

export function listWorkoutExercises(): WorkoutExercise[] {
  return catalog;
}

export function getWorkoutExercise(
  id: string | undefined
): WorkoutExercise | null {
  if (!id) return null;
  const found = catalog.find((e) => e.id === id);
  return found ?? null;
}
