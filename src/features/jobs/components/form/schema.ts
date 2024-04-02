import { z } from "zod";

const DEFAULT_CITIES = [
  "manila",
  "makati city",
  "taguig city",
  "pasig city",
  "quezon city",
] as const;

const AGE_OPTIONS = ["1", "3", "7", "14"] as const;

const SORT_OPTIONS = ["createdAt", "updatedAt"] as const;

export const searchJobFormSchema = z.object({
  keyword: z.string().max(50, "Keyword cannot exceed 50 characters.").trim(),
  location: z.union([z.enum(DEFAULT_CITIES), z.literal("")]),
});

export const filterJobFormSchema = z.object({
  fromAge: z.union([z.enum(AGE_OPTIONS), z.literal("")]),
  sortBy: z.union([z.enum(SORT_OPTIONS), z.literal("")]),
});

export const applyJobSchema = z.object({
  resume: z
    .string()
    .min(1, "Please fill in your resume.")
    .url("Resume should be a valid link."),
  coverLetter: z.string().min(1, "Please fill in your cover letter."),
});

export type SearchJobFormValues = z.infer<typeof searchJobFormSchema>;
export type FilterJobFormValues = z.infer<typeof filterJobFormSchema>;
export type ApplyJobFormValues = z.infer<typeof applyJobSchema>;
