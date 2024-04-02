import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkJobPostResponse } from "../schema";
import { userKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import { getBookmarkedJobs } from "./use-get-bookmarked-jobs";

type MutationFnParams = {
  jobId: string;
};

const bookmarkJob = async (jobId: string): Promise<BookmarkJobPostResponse> => {
  return await axios.post(`/users/jobs/${jobId}/bookmark`);
};

export const useBookmarkJob = () => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: ({ jobId }: MutationFnParams) => bookmarkJob(jobId),
    onMutate: () => {},
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: userKeys.profile(auth.userId!),
        }),
        queryClient.prefetchQuery({
          queryKey: userKeys.bookmarks(auth.userId!),
          queryFn: getBookmarkedJobs,
        }),
      ]);
    },
  });
};
