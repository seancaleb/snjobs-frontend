import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disableInteractions } from "@/utils/disable-interactions";
import { ApplyJobPostParams, AppliedJobPostResponse } from "../schema";
import { jobKeys, userKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import { getAppliedJobs } from "./use-get-applied-jobs";

type MutationFnParams = {
  jobId: string;
  credentials: ApplyJobPostParams;
};

const applyJobPost = async (
  jobId: string,
  credentials: ApplyJobPostParams
): Promise<AppliedJobPostResponse> => {
  return await axios.post(`/users/jobs/${jobId}/apply`, credentials);
};

export const useApplyJob = () => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: ({ jobId, credentials }: MutationFnParams) =>
      applyJobPost(jobId, credentials),
    onSettled: async (_, __, { jobId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: jobKeys.detail(jobId),
        }),
        queryClient.invalidateQueries({
          queryKey: userKeys.profile(auth.userId!),
        }),
        queryClient.prefetchQuery({
          queryKey: userKeys.applications(auth.userId!),
          queryFn: getAppliedJobs,
        }),
      ]);
      disableInteractions(false);
    },
  });
};
