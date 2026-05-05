import Constants from "expo-constants";

/**
 * Build-time defaults live in `app.json` → `expo.extra.featureFlags`.
 * Runtime overrides may later come from Firebase Remote Config
 * (`@reformer/shared` → ROLLOUT.remoteConfigNamespace).
 */
export type FeatureFlags = {
  /** Fetch and cache remote catalog overlay when online (hybrid delivery). */
  enableRemoteCatalogOverlay: boolean;
  /** Coach–client linking, assignments, consent-gated visibility. */
  enableCoachClientV1: boolean;
  /** Surface sync conflict resolution UI when heuristic cannot auto-pick. */
  enableSessionMergePrompts: boolean;
};

const FALLBACK_FLAGS: FeatureFlags = {
  enableRemoteCatalogOverlay: true,
  enableCoachClientV1: true,
  enableSessionMergePrompts: true,
};

function readExtra(): Record<string, unknown> | undefined {
  return Constants.expoConfig?.extra as Record<string, unknown> | undefined;
}

export function getFeatureFlags(): FeatureFlags {
  const extra = readExtra();
  const raw = extra?.featureFlags as Partial<FeatureFlags> | undefined;
  return { ...FALLBACK_FLAGS, ...raw };
}
