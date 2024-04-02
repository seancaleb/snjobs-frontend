import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, employerKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import {
  JobApplication,
  jobApplicationSchema,
} from "../schema/applications.schema";

export const getJobApplication = async (
  jobId: string,
  applicationId: string
): Promise<JobApplication> => {
  const data = await axios.get(
    `employers/jobs/${jobId}/applications/${applicationId}`
  );

  return jobApplicationSchema.parse(data);
};

type QueryFnType = typeof getJobApplication;

type UseGetJobApplicationOptions = {
  jobId?: string;
  applicationId?: string;
  config?: QueryConfig<QueryFnType>;
};

export const useGetJobApplication = ({
  jobId,
  applicationId,
  config,
}: UseGetJobApplicationOptions) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: employerKeys.jobPostApplication(
      auth.userId!,
      jobId!,
      applicationId!
    ),
    enabled: !!jobId && !!applicationId,
    queryFn: () => getJobApplication(jobId!, applicationId!),
  });
};
