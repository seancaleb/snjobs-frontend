/* eslint-disable @typescript-eslint/no-explicit-any */
import { disableInteractions } from "@/utils/disable-interactions";
import {
  QueryClient,
  DefaultOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    onMutate: () => {
      disableInteractions(true);
    },
    onSettled: () => {
      disableInteractions(false);
    },
  },
};

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

/**
 * Note: Application Query Keys
 * * Used for query keys in call for query functions
 */
export const employerKeys = {
  all: ["employer"] as const,
  profile: (userId: string) => [...employerKeys.all, userId] as const,
  jobPostings: (userId: string) =>
    [...employerKeys.profile(userId), "job-postings"] as const,
  jobPostApplications: (userId: string, jobId: string) =>
    [
      ...employerKeys.profile(userId),
      ...jobKeys.detail(jobId),
      "applications",
    ] as const,
  jobPostApplication: (userId: string, jobId: string, applicationId: string) =>
    [
      ...employerKeys.profile(userId),
      ...jobKeys.detail(jobId),
      "applications",
      applicationId,
    ] as const,
  applications: (userId: string) =>
    [...employerKeys.profile(userId), "applications"] as const,
  applicationsOverview: (userId: string) =>
    [...employerKeys.profile(userId), "applications", "overview"] as const,
};

export const jobKeys = {
  all: ["jobs"] as const,
  detail: (jobId: string) => [...jobKeys.all, jobId] as const,
  filters: (filters: Record<string, string>) =>
    [...jobKeys.all, filters] as const,
};

export const userKeys = {
  all: ["user"] as const,
  profile: (userId: string) => [...userKeys.all, userId] as const,
  profileDetails: (userId: string) =>
    [...userKeys.profile(userId), "details"] as const,
  bookmarks: (userId: string) =>
    [...userKeys.profile(userId), "bookmarks"] as const,
  applications: (userId: string) =>
    [...userKeys.profile(userId), "applications"] as const,
};
