import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatedJobPostResponse, JobPostParams } from "../schema/jobs.schema";
import { useAppStore } from "@/stores";
import { employerKeys } from "@/lib/react-query";
import { getJobPostings } from "./use-get-job-postings";
import { disableInteractions } from "@/utils/disable-interactions";

type MutationFnParams = {
  newJobPost: JobPostParams;
};

const createJobPost = async (
  newJobPost: JobPostParams
): Promise<CreatedJobPostResponse> => {
  return await axios.post("/employers/jobs", newJobPost);
};

export const useCreateJobPost = () => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: ({ newJobPost }: MutationFnParams) => createJobPost(newJobPost),
    onSettled: async () => {
      await queryClient.prefetchQuery({
        queryKey: employerKeys.jobPostings(auth.userId!),
        queryFn: getJobPostings,
      });
      disableInteractions(false);
    },
  });
};
