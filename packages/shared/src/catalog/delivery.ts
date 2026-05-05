/**
 * Exercise catalog delivery — **hybrid** (bundled baseline + remote overlay).
 *
 * Rationale (offline-first + multi-device):
 * - Cold start / no network must still list exercises and render correct field schemas.
 * - Remote updates ship manifest deltas without waiting for a store review for copy/schema tweaks.
 * - Last fetched remote overlay is cached locally (SQLite or AsyncStorage — consumer’s choice).
 */
export const CATALOG_DELIVERY_MODE = "hybrid" as const;
export type CatalogDeliveryMode = typeof CATALOG_DELIVERY_MODE;

export interface ExerciseCatalogManifestEntry {
  exerciseId: string;
  /** Version of field schema / copy for this exercise; higher wins on merge. */
  schemaVersion: number;
  /** Optional content hash for delta fetches. */
  contentRevision?: string;
}

export interface ExerciseCatalogManifest {
  manifestVersion: number;
  publishedAtMs: number;
  /** If set, app must refuse remote manifest until app semver ≥ minAppVersion. */
  minAppVersion?: string;
  exercises: ExerciseCatalogManifestEntry[];
}

export const HYBRID_CATALOG_RULES = {
  /** Full catalog JSON (or native module) ships in the app bundle. */
  bundleRequiredBaseline: true,
  /** When online, fetch remote manifest + changed exercise definitions. */
  applyRemoteWhenOnline: true,
  /** Persist last successful remote overlay for offline use after first fetch. */
  persistRemoteOverlay: true,
  /** Merge rule: per exerciseId take max(schemaVersion) between bundle and overlay. */
  mergePerExerciseSchemaVersion: "max",
} as const;

export function mergeManifestEntries(
  bundled: ExerciseCatalogManifestEntry[],
  remote: ExerciseCatalogManifestEntry[]
): ExerciseCatalogManifestEntry[] {
  const map = new Map<string, ExerciseCatalogManifestEntry>();
  for (const e of bundled) {
    map.set(e.exerciseId, e);
  }
  for (const e of remote) {
    const cur = map.get(e.exerciseId);
    if (!cur || e.schemaVersion > cur.schemaVersion) {
      map.set(e.exerciseId, e);
    }
  }
  return [...map.values()].sort((a, b) => a.exerciseId.localeCompare(b.exerciseId));
}
