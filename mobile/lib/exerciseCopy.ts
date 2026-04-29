export type ExerciseCopy = {
  title: string;
  focus: string;
  steps: string[];
  last: { stress: string; reps: string };
};

export const exerciseCopy: Record<string, ExerciseCopy> = {
  "leg-circles": {
    title: "Leg Circles",
    focus:
      "Stabilize the pelvis and mobilize the hip with controlled, circular paths — priority on lumbar quiet as the legs move.",
    steps: [
      "Set straps long; one foot in each. Lie supine, pelvis and ribs heavy.",
      "Inhale: circle legs away and down with width you can control without rocking.",
      "Exhale: close the circle and return through center. Reverse direction after the set.",
    ],
    last: { stress: "1", reps: "12" },
  },
  default: {
    title: "Movement",
    focus:
      "Build precision through range you own — not range you borrow.",
    steps: [
      "Set equipment per plan.",
      "Move with breath, pause where control matters.",
      "Log sets to track how load and tempo evolve.",
    ],
    last: { stress: "—", reps: "—" },
  },
};

export function getExerciseCopy(id: string): ExerciseCopy {
  return exerciseCopy[id] ?? exerciseCopy.default;
}
