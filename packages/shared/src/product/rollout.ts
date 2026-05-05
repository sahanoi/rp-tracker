/**
 * Rollout: tie EAS profiles to release intent. JSON configs cannot carry comments;
 * keep human notes next to the code that reads them.
 *
 * - `development` — dev client, internal distribution (see mobile/eas.json).
 * - `preview` — internal APK/IPA for testers before store submission.
 * - `production` — store builds.
 *
 * Feature flags default in app config (`extra.featureFlags`) and may be overridden
 * at runtime via Firebase Remote Config once wired.
 */
export type EasBuildProfileName = "development" | "preview" | "production";

export const ROLLOUT = {
  defaultInternalBetaProfile: "preview" satisfies EasBuildProfileName,
  storeProfile: "production" satisfies EasBuildProfileName,
  remoteConfigNamespace: "reformer_feature_flags",
} as const;
