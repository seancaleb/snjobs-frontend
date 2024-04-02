import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, jobKeys } from "@/lib/react-query";
import { Jobs, jobsSchema } from "../schema";
import { useSearchParams } from "react-router-dom";

export const getJobs = async (
  params?: Record<string, string>
): Promise<Jobs> => {
  const data = await axios.get(`/jobs`, {
    params,
  });

  return jobsSchema.parse(data);
};

type QueryFnType = typeof getJobs;

type UseGetJobsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetJobs = ({ config }: UseGetJobsOptions = {}) => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  delete queryParams["jobId"];

  if (!queryParams.page) {
    queryParams.page = "1";
  }

  return useQuery({
    ...config,
    queryKey: jobKeys.filters(queryParams),
    queryFn: () => getJobs(queryParams),
  });
};
