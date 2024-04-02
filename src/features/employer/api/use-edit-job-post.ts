import { axios } from "@/lib/axios";
import { JobPostParams, UpdatedJobPostResponse } from "../schema/jobs.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/stores";
import { getJobPostings } from "./use-get-job-postings";
import { employerKeys, jobKeys } from "@/lib/react-query";
import { disableInteractions } from "@/utils/disable-interactions";
import { getJobById } from "@/features/jobs/api/use-get-job";

type MutationFnParams = {
  updatedJobPost: JobPostParams;
  jobId: string;
};

const updateJobPost = async (
  updatedJobPost: JobPostParams,
  jobId: string
): Promise<UpdatedJobPostResponse> => {
  return await axios.patch(`/employers/jobs/${jobId}`, updatedJobPost);
};

export const useEditJobPost = () => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: ({ updatedJobPost, jobId }: MutationFnParams) =>
      updateJobPost(updatedJobPost, jobId),
    onSettled: async (_, __, { jobId }) => {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: employerKeys.jobPostings(auth.userId!),
          queryFn: getJobPostings,
        }),
        queryClient.prefetchQuery({
          queryKey: jobKeys.detail(jobId),
          queryFn: () => getJobById(jobId),
        }),
      ]);
      disableInteractions(false);
    },
  });
};
