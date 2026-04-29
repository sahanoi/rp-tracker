import { getExerciseCopy } from "../exerciseCopy";

describe("getExerciseCopy", () => {
  it("returns Leg Circles for known id", () => {
    expect(getExerciseCopy("leg-circles").title).toBe("Leg Circles");
  });

  it("falls back to default for unknown id", () => {
    expect(getExerciseCopy("unknown-id").title).toBe("Movement");
  });
});
