import { z } from "zod";

export const DEFAULT_CITIES = [
  "Manila",
  "Makati City",
  "Taguig City",
  "Pasig City",
  "Quezon City",
] as const;

export const jobPostSchema = z.object({
  employerId: z.string(),
  employerName: z.string(),
  title: z.string(),
  description: z.string(),
  requirements: z.string().array(),
  location: z.enum(DEFAULT_CITIES),
  applications: z.string().array(),
  jobId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const jobsSchema = z.object({
  total: z.number(),
  jobs: jobPostSchema.array(),
  limit: z.number(),
  pageNumber: z.number(),
  totalPages: z.number(),
});

export type JobPost = z.infer<typeof jobPostSchema>;
export type Jobs = z.infer<typeof jobsSchema>;
