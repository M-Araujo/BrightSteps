// src/schemas/goalSchema.ts
import { z } from "zod";

export const goalSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be under 100 characters"),
  description: z
    .string()
    .max(200, "Title must be under 200 characters")
    .optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type GoalFormData = z.infer<typeof goalSchema>;
