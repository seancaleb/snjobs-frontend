import { z } from "zod";

export const APPLICATION_STATUS = [
  "Applied",
  "Application viewed",
  "Not selected by employer",
] as const;

export const APPLICATION_STATUS_DISTRIBUTION = [
  "Applied",
  "Viewed",
  "Rejected",
] as const;

export const jobApplicationSchema = z.object({
  jobId: z.string(),
  applicantId: z.string(),
  resume: z.string(),
  coverLetter: z.string(),
  status: z.enum(APPLICATION_STATUS),
  applicationId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    userId: z.string(),
    avatar: z.string().nullable(),
  }),
});

export const jobApplicationsSchema = z.object({
  total: z.number(),
  applications: jobApplicationSchema.array(),
});

export const jobApplicationsOverviewSchema = z.object({
  totalJobs: z.number(),
  totalApplications: z.number(),
  applications: jobApplicationSchema.array(),
  applicationStatusDistribution: z
    .object({
      name: z.enum(APPLICATION_STATUS_DISTRIBUTION),
      count: z.number(),
    })
    .array(),
  applicationTrends: z
    .object({
      date: z.string(),
      applications: z.number(),
    })
    .array(),
  applicationTrendsGraphActive: z.boolean(),
});

export type JobApplication = z.infer<typeof jobApplicationSchema>;
export type JobApplications = z.infer<typeof jobApplicationsSchema>;
export type JobApplicationsOverview = z.infer<
  typeof jobApplicationsOverviewSchema
>;
