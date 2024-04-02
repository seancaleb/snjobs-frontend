/* eslint-disable react-refresh/only-export-components */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplyJobForm } from "../components/form/apply-job-form";
import { ActionFunctionArgs, redirect, useParams } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/stores";
import { userKeys } from "@/lib/react-query";
import { getAppliedJobs } from "@/features/users/api/use-get-applied-jobs";
import _ from "lodash";

type RouteParams = {
  jobId: string;
};

const auth = useAppStore.getState().auth;

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    const applications = await queryClient.ensureQueryData({
      queryKey: userKeys.applications(auth.userId!),
      queryFn: getAppliedJobs,
    });

    const isApplied = _.findIndex(applications.applications, {
      jobId: params.jobId,
    });

    if (isApplied !== -1) {
      return redirect(`/jobs/${params.jobId}`);
    }

    return null;
  };

export const ApplyJob = () => {
  const { jobId } = useParams<RouteParams>();
  const title = "Add your credentials";
  const subtitle = "Highlight your experiences to stand out to employers.";

  return (
    <Card className="w-full lg:w-auto lg:basis-[448px] shrink-0">
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle className="text-base tracking-[-.015em]">
            {title}
          </CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="w-auto">
        <ApplyJobForm jobId={jobId as string} />
      </CardContent>
    </Card>
  );
};
