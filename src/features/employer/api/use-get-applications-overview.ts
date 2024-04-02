import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, employerKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import {
  JobApplicationsOverview,
  jobApplicationsOverviewSchema,
} from "../schema/applications.schema";

export const getApplicationsOverview =
  async (): Promise<JobApplicationsOverview> => {
    const data = await axios.get("employers/jobs/applications/overview", {});

    return jobApplicationsOverviewSchema.parse(data);
  };

type QueryFnType = typeof getApplicationsOverview;

type UseGetApplicationsOverviewOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetApplicationsOverview = ({
  config,
}: UseGetApplicationsOverviewOptions = {}) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: employerKeys.applicationsOverview(auth.userId!),
    queryFn: getApplicationsOverview,
  });
};
