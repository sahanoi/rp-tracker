import { describe, expect, it } from "@jest/globals";
import { mergeManifestEntries } from "./delivery.js";

describe("catalog delivery", () => {
  it("mergeManifestEntries keeps highest schemaVersion per exerciseId", () => {
    const merged = mergeManifestEntries(
      [
        { exerciseId: "a", schemaVersion: 1 },
        { exerciseId: "b", schemaVersion: 2 },
      ],
      [
        { exerciseId: "a", schemaVersion: 3 },
        { exerciseId: "c", schemaVersion: 1 },
      ]
    );
    expect(merged).toEqual(
      expect.arrayContaining([
        { exerciseId: "a", schemaVersion: 3 },
        { exerciseId: "b", schemaVersion: 2 },
        { exerciseId: "c", schemaVersion: 1 },
      ])
    );
    expect(merged).toHaveLength(3);
  });
});
