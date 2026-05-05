import { z } from "zod";

/** Coach–client pairing lifecycle. */
export const coachClientLinkStatusSchema = z.enum([
  "pending_client",
  "active",
  "revoked",
]);

/** Coarse visibility; granular dimensions refine what “full” means. */
export const coachVisibilityLevelSchema = z.enum([
  "none",
  "assigned_routines_only",
  "session_summaries",
  "full_session_logs",
]);

/**
 * Granular sharing dimensions (client-controlled).
 * - `visibilityLevel` is the primary UX selector.
 * - Allowlist / time window narrow *which* history rows a coach may read.
 * - `includeSensitiveFields` gates notes/RPE-like columns for assigned programs.
 */
export const granularShareDimensionsSchema = z.object({
  visibilityLevel: coachVisibilityLevelSchema,
  /** If set, coach only sees log rows referencing these exercise definition ids. */
  exerciseIdAllowlist: z.array(z.string().min(1)).optional(),
  /** Inclusive: include sessions with startedAt >= this (epoch ms). */
  shareSessionsFromMs: z.number().int().optional(),
  /** Exclusive: include sessions with startedAt < this (epoch ms). */
  shareSessionsUntilMs: z.number().int().optional(),
  /** When false, strip notes/RPE-like keys server-side even if logs are otherwise visible. */
  includeSensitiveFields: z.boolean().optional(),
});

export const clientConsentProfileSchema = z.object({
  clientUserId: z.string().min(1),
  coachUserId: z.string().min(1),
  linkStatus: coachClientLinkStatusSchema,
  share: granularShareDimensionsSchema,
  updatedAtMs: z.number().int(),
});

export type CoachClientLinkStatus = z.infer<typeof coachClientLinkStatusSchema>;
export type CoachVisibilityLevel = z.infer<typeof coachVisibilityLevelSchema>;
export type GranularShareDimensions = z.infer<typeof granularShareDimensionsSchema>;
export type ClientConsentProfile = z.infer<typeof clientConsentProfileSchema>;

export function parseClientConsentProfile(data: unknown): ClientConsentProfile {
  return clientConsentProfileSchema.parse(data);
}

/**
 * UX steps for consent (Turkish copy lives in the app; these are stable keys).
 */
export const CONSENT_WIZARD_STEP_KEYS = [
  "pending_invite",
  "choose_visibility",
  "optional_allowlist",
  "optional_date_range",
  "sensitive_fields",
  "review",
] as const;

export type ConsentWizardStepKey = (typeof CONSENT_WIZARD_STEP_KEYS)[number];
