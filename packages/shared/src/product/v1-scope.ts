/**
 * v1 product scope decisions aligned with the Design Concept.
 * Social / community features are **out of v1** unless promoted here later.
 */
export const V1_SCOPE = {
  socialFeed: false,
  socialFollowing: false,
  copyRoutineFromCommunity: false,
  workoutFeedSharing: false,
} as const;

export type V1Scope = typeof V1_SCOPE;

export function isSocialEnabledInV1(): boolean {
  return (
    V1_SCOPE.socialFeed ||
    V1_SCOPE.socialFollowing ||
    V1_SCOPE.copyRoutineFromCommunity ||
    V1_SCOPE.workoutFeedSharing
  );
}
