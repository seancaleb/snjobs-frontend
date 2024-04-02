import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, employerKeys } from "@/lib/react-query";
import {
  JobApplications,
  jobApplicationsSchema,
} from "../schema/applications.schema";
import { useAppStore } from "@/stores";

export const getJobApplications = async (
  jobId: string
): Promise<JobApplications> => {
  const data = await axios.get(`employers/jobs/${jobId}/applications`);

  return jobApplicationsSchema.parse(data);
};

type QueryFnType = typeof getJobApplications;

type UseGetJobApplicationsOptions = {
  jobId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useGetJobApplications = ({
  jobId,
  config,
}: UseGetJobApplicationsOptions) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: employerKeys.jobPostApplications(auth.userId!, jobId!),
    enabled: !!jobId,
    queryFn: () => getJobApplications(jobId!),
  });
};
