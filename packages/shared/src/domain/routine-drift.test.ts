import { describe, expect, it } from "@jest/globals";
import { detectRoutineListDrift } from "./routine-drift.js";

describe("detectRoutineListDrift", () => {
  it("returns changed=false for identical order", () => {
    const r = detectRoutineListDrift({
      baselineOrderedIds: ["a", "b"],
      sessionOrderedIds: ["a", "b"],
    });
    expect(r.changed).toBe(false);
  });

  it("detects length mismatch", () => {
    expect(
      detectRoutineListDrift({
        baselineOrderedIds: ["a"],
        sessionOrderedIds: ["a", "b"],
      }).changed
    ).toBe(true);
  });

  it("detects reorder", () => {
    expect(
      detectRoutineListDrift({
        baselineOrderedIds: ["a", "b"],
        sessionOrderedIds: ["b", "a"],
      }).changed
    ).toBe(true);
  });
});
