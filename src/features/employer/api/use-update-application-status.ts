import { APPLICATION_STATUS } from "./../schema/applications.schema";
import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/stores";
import { employerKeys } from "@/lib/react-query";
import { UpdatedJobApplicationStatusResponse } from "../schema/jobs.schema";
import { disableInteractions } from "@/utils/disable-interactions";
import { getAllJobApplications } from "./use-get-all-job-applications";
import { getJobApplications } from "./use-get-job-applications";

type MutationFnParams = {
  status: (typeof APPLICATION_STATUS)[number];
  jobId: string;
  applicationId: string;
};

const updateApplicationStatus = async (
  status: (typeof APPLICATION_STATUS)[number],
  jobId: string,
  applicationId: string
): Promise<UpdatedJobApplicationStatusResponse> => {
  return await axios.patch(
    `/employers/jobs/${jobId}/applications/${applicationId}/review`,
    { status }
  );
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  const auth = useAppStore.use.auth();

  return useMutation({
    mutationFn: ({ status, jobId, applicationId }: MutationFnParams) =>
      updateApplicationStatus(status, jobId, applicationId),
    onSettled: async (_, __, { jobId, applicationId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: employerKeys.jobPostApplication(
            auth.userId!,
            jobId,
            applicationId
          ),
        }),
        queryClient.prefetchQuery({
          queryKey: employerKeys.applications(auth.userId!),
          queryFn: getAllJobApplications,
        }),
        queryClient.prefetchQuery({
          queryKey: employerKeys.jobPostApplications(auth.userId!, jobId),
          queryFn: () => getJobApplications(jobId),
        }),
      ]);
      disableInteractions(false);
    },
  });
};
