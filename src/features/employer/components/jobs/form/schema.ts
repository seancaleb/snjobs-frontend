import { z } from "zod";
import { DEFAULT_CITIES } from "@/features/jobs/schema";

export const jobFormSchema = z.object({
  title: z
    .string()
    .min(1, "Please fill in job title.")
    .min(6, "Job title should be at least 6 characters long.")
    .max(128, "Job title cannot exceed 128 characters.")
    .transform((str) => str.trim()),
  description: z
    .string()
    .min(1, "Please fill in job description.")
    .min(6, "Job description should be at least 6 characters long.")
    .transform((str) => str.trim()),
  requirements: z
    .array(
      z.object({
        requirement: z
          .string()
          .min(1, "Please fill in job requirement.")
          .min(6, "Job requirement should be at least 6 characters long.")
          .max(256, "Job requirement cannot exceed 256 characters."),
      })
    )
    .nonempty("Should contain at least one requirement"),
  location: z.enum(DEFAULT_CITIES, {
    errorMap: () => ({ message: "Please fill in job location." }),
  }),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
