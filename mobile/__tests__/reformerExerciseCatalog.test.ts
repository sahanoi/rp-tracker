import {
  groupedSectionsForPicker,
  listFlatReformerExercises,
  REFORMER_CATALOG_EXERCISE_COUNT_EXPECTED,
  REFORMER_CATEGORY_SOURCE,
} from "../lib/reformerExerciseCatalog";

describe("reformerExerciseCatalog", () => {
  it("keeps exercise total in sync with REFORMER_CATEGORY_SOURCE and expected constant", () => {
    const fromSource = REFORMER_CATEGORY_SOURCE.reduce(
      (n, c) => n + c.exercises.length,
      0
    );
    expect(fromSource).toBe(REFORMER_CATALOG_EXERCISE_COUNT_EXPECTED);
    expect(listFlatReformerExercises().length).toBe(
      REFORMER_CATALOG_EXERCISE_COUNT_EXPECTED
    );
  });

  it("produces unique stable ids", () => {
    const ids = listFlatReformerExercises().map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ungrouped picker with all filter shows every exercise", () => {
    const sections = groupedSectionsForPicker("", "all");
    const n = sections.reduce((s, sec) => s + sec.exercises.length, 0);
    expect(n).toBe(REFORMER_CATALOG_EXERCISE_COUNT_EXPECTED);
  });
});
