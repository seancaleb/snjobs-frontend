import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobDetails } from "../../jobs/components/job-details";
import { ApplicationCard } from "../components/applications/application-card";
import { Link, useParams } from "react-router-dom";
import { ContentLayout } from "@/components/layout";
import { useGetJobById } from "@/features/jobs";
import { DataLoader } from "@/components/elements";
import { useGetJobApplications } from "../api/use-get-job-applications";
import { useDocumentTitle } from "@mantine/hooks";

type RouteParams = {
  jobId: string;
};

export const JobPost = () => {
  const { jobId } = useParams<RouteParams>();
  const job = useGetJobById({ jobId });
  const applications = useGetJobApplications({ jobId });

  useDocumentTitle(`${job.data?.title ?? "Job Post"} - SNJOBS`);

  const editJobEl = (
    <Button asChild>
      <Link to={`/employer/job-postings/${jobId}/edit`}>
        <Edit className="icon-start-btn" />
        Edit job post
      </Link>
    </Button>
  );

  if (job.isError) {
    throw new Error(job.error.message);
  }

  if (applications.isError) {
    throw new Error(applications.error.message);
  }

  if (job.isPending || applications.isPending) {
    return <DataLoader data="job" />;
  }

  return (
    <ContentLayout className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div className="hidden sm:block" />
        {editJobEl}
      </div>
      <div className="flex flex-col 2xl:flex-row gap-6 items-start">
        <JobDetails job={job.data} />
        <ApplicationCard jobId={jobId} applications={applications.data} />
      </div>
    </ContentLayout>
  );
};
