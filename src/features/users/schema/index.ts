import { jobApplicationSchema } from "@/features/employer";
import { jobPostSchema } from "@/features/jobs";
import { z } from "zod";

export const applyJobPostParamsSchema = jobApplicationSchema.pick({
  resume: true,
  coverLetter: true,
});

export const appliedJobsSchema = z.object({
  total: z.number(),
  applications: z
    .object({
      ...jobApplicationSchema.omit({ user: true }).shape,
      job: jobPostSchema,
    })
    .array(),
});

export const bookmarkedJobsSchema = z.object({
  total: z.number(),
  jobs: jobPostSchema.array(),
});

export const bookmarkJobPostSchema = z.object({
  message: z.string(),
});

export const appliedJobPostSchema = z.object({
  message: z.string(),
});

export type ApplyJobPostParams = z.infer<typeof applyJobPostParamsSchema>;
export type AppliedJobs = z.infer<typeof appliedJobsSchema>;
export type BookmarkedJobs = z.infer<typeof bookmarkedJobsSchema>;
export type BookmarkJobPostResponse = z.infer<typeof bookmarkJobPostSchema>;
export type AppliedJobPostResponse = z.infer<typeof appliedJobPostSchema>;
