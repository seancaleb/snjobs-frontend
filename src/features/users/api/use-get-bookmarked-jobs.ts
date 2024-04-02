import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, userKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import { BookmarkedJobs, bookmarkedJobsSchema } from "..";

export const getBookmarkedJobs = async (): Promise<BookmarkedJobs> => {
  const data = await axios.get("/users/bookmarked-jobs");

  return bookmarkedJobsSchema.parse(data);
};

type QueryFnType = typeof getBookmarkedJobs;

type UseGetBookmarkedJobsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetBookmarkedJobs = ({
  config,
}: UseGetBookmarkedJobsOptions = {}) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: userKeys.bookmarks(auth.userId!),
    queryFn: getBookmarkedJobs,
  });
};
