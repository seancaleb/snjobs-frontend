import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { QueryConfig, userKeys } from "@/lib/react-query";
import { useAppStore } from "@/stores";
import { AppliedJobs, appliedJobsSchema } from "..";

export const getAppliedJobs = async (): Promise<AppliedJobs> => {
  const data = await axios.get("/users/applications");

  return appliedJobsSchema.parse(data);
};

type QueryFnType = typeof getAppliedJobs;

type UseGetAppliedJobsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAppliedJobs = ({
  config,
}: UseGetAppliedJobsOptions = {}) => {
  const auth = useAppStore.use.auth();

  return useQuery({
    ...config,
    queryKey: userKeys.applications(auth.userId!),
    queryFn: getAppliedJobs,
  });
};
