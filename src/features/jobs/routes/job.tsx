import { ContentLayout } from "@/components/layout";
import { JobPostDetails } from "../components/job-post-details";
import { useGetJobById } from "..";
import { Outlet, useParams } from "react-router-dom";
import { DataLoader } from "@/components/elements";
import { User, useGetProfile } from "@/features/account";

type RouteParams = {
  jobId: string;
};

export const Job = () => {
  const { jobId } = useParams<RouteParams>();
  const job = useGetJobById({ jobId });
  const profile = useGetProfile();

  if (job.isError || profile.isError) {
    if (job.isError) {
      throw new Error(job.error.message);
    }
    if (profile.isError) {
      throw new Error(profile.error.message);
    }
  }

  if (job.isPending || profile.isPending) {
    return <DataLoader data="job post" />;
  }

  return (
    <ContentLayout className="relative max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <Outlet />
        <JobPostDetails
          job={job.data}
          applications={(profile.data as User).applications}
          bookmark={(profile.data as User).bookmark}
          className="overflow-y-auto"
        />
      </div>
    </ContentLayout>
  );
};
