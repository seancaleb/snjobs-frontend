import { z } from "zod";
import { DEFAULT_CITIES, jobPostSchema } from "@/features/jobs/schema";
import {
  APPLICATION_STATUS,
  jobApplicationSchema,
} from "./applications.schema";

export const jobPostingsSchema = z.object({
  total: z.number(),
  jobs: jobPostSchema.array(),
  limit: z.number(),
  pageNumber: z.number(),
  totalPages: z.number(),
});

export const jobPostParamsSchema = z.object({
  title: z.string(),
  description: z.string(),
  requirements: z.string().array(),
  location: z.enum(DEFAULT_CITIES),
});

export const jobApplicationStatusParamsSchema = z.object({
  status: z.enum(APPLICATION_STATUS),
});

export const updatedJobPostSchema = z.object({
  message: z.string(),
  job: jobPostSchema,
});

export const deletedJobPostSchema = z.object({
  message: z.string(),
  deletedJobApplicatons: z.number(),
});

export const createdJobPostSchema = z.object({
  message: z.string(),
});

export const updatedJobApplicationStatusSchema = z.object({
  message: z.string(),
  application: jobApplicationSchema.omit({ user: true }),
});

export type JobPostings = z.infer<typeof jobPostingsSchema>;
export type JobPostParams = z.infer<typeof jobPostParamsSchema>;
export type JobApplicationStatusParams = z.infer<
  typeof jobApplicationStatusParamsSchema
>;
export type UpdatedJobPostResponse = z.infer<typeof updatedJobPostSchema>;
export type DeletedJobPostResponse = z.infer<typeof deletedJobPostSchema>;
export type CreatedJobPostResponse = z.infer<typeof createdJobPostSchema>;
export type UpdatedJobApplicationStatusResponse = z.infer<
  typeof updatedJobApplicationStatusSchema
>;
