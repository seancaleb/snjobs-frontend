import { axios } from "@/lib/axios";
import { employerKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletedJobPostResponse } from "../schema/jobs.schema";
import { disableInteractions } from "@/utils/disable-interactions";

type MutationFnParams = {
  jobId: string;
};

const deleteJobPost = async (
  jobId: string
): Promise<DeletedJobPostResponse> => {
  return await axios.delete(`/employers/jobs/${jobId}`);
};

export const useDeleteJobPost = () => {
  const auth = useAppStore.use.auth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId }: MutationFnParams) => deleteJobPost(jobId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: employerKeys.jobPostings(auth.userId!),
      });

      disableInteractions(false);
    },
  });
};
