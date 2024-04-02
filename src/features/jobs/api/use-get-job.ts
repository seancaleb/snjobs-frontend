import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, jobKeys } from "@/lib/react-query";
import { JobPost, jobPostSchema } from "../schema";

export const getJobById = async (jobId: string): Promise<JobPost> => {
  const data = await axios.get(`/jobs/${jobId}`);

  return jobPostSchema.parse(data);
};

type QueryFnType = typeof getJobById;

type UseGetJobByIdOptions = {
  jobId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useGetJobById = ({ config, jobId }: UseGetJobByIdOptions) => {
  return useQuery({
    ...config,
    queryKey: jobKeys.detail(jobId!),
    queryFn: () => getJobById(jobId!),
    enabled: !!jobId,
  });
};
