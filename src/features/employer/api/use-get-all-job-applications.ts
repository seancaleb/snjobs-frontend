import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, employerKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import {
  JobApplications,
  jobApplicationsSchema,
} from "../schema/applications.schema";

export const getAllJobApplications = async (): Promise<JobApplications> => {
  const data = await axios.get("employers/jobs/applications");

  return jobApplicationsSchema.parse(data);
};

type QueryFnType = typeof getAllJobApplications;

type UseGetAllJobApplicationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllJobApplications = ({
  config,
}: UseGetAllJobApplicationsOptions = {}) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: employerKeys.applications(auth.userId!),
    queryFn: getAllJobApplications,
  });
};
