import { z } from "zod";

export const planSummarySchema = z.object({
  title: z.string().min(1),
  durationMinutes: z.number().nonnegative(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
});

export type PlanSummary = z.infer<typeof planSummarySchema>;
