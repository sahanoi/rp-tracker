import { z } from "zod";

export const userProfileSchema = z.object({
  displayName: z.string().min(1),
  memberLabel: z.string().optional(),
  streakDays: z.number().int().nonnegative().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
