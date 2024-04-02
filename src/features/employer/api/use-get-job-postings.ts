import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, employerKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import { JobPostings, jobPostingsSchema } from "../schema/jobs.schema";

export const getJobPostings = async (): Promise<JobPostings> => {
  const data = await axios.get("/employers/jobs");

  return jobPostingsSchema.parse(data);
};

type QueryFnType = typeof getJobPostings;

type UseGetJobPostingsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetJobPostings = ({
  config,
}: UseGetJobPostingsOptions = {}) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: employerKeys.jobPostings(auth.userId!),
    queryFn: getJobPostings,
  });
};
