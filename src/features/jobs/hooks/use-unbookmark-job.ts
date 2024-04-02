import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkedJobs } from "../../users";
import { axios } from "@/lib/axios";
import { useAppStore } from "@/stores";
import { userKeys } from "@/lib/react-query";
import { getBookmarkedJobs } from "@/features/users/api/use-get-bookmarked-jobs";

export const useUnbookmarkJob = (jobId: string) => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: async () => {
      return await axios.post(`/users/jobs/${jobId}/bookmark`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: userKeys.bookmarks(auth.userId!),
      });

      const previousBookmarkedJobs = queryClient.getQueryData<BookmarkedJobs>(
        userKeys.bookmarks(auth.userId!)
      );

      queryClient.setQueryData<BookmarkedJobs>(
        userKeys.bookmarks(auth.userId!),
        (old) =>
          old
            ? {
                total: old.total - 1,
                jobs: old.jobs.filter((job) => job.jobId !== jobId),
              }
            : {
                total: 0,
                jobs: [],
              }
      );

      return { previousBookmarkedJobs };
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData<BookmarkedJobs>(
        userKeys.bookmarks(auth.userId!),
        ctx?.previousBookmarkedJobs
      );
    },
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
