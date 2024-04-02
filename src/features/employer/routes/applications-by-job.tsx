import { ContentLayout } from "@/components/layout";
import { columnsByJob } from "../components/applications/table/applications-by-job-column";
import { ApplicationsTable } from "../components/applications/table/applications-table";
import { useGetJobApplications } from "../api/use-get-job-applications";
import { DataLoader } from "@/components/elements";
import { useParams } from "react-router";
import { useGetJobById } from "@/features/jobs";
import { useDocumentTitle } from "@mantine/hooks";

type RouteParams = {
  jobId: string;
};

export const ApplicationsByJob = () => {
  const { jobId } = useParams<RouteParams>();
  const { data, isPending, isError, error } = useGetJobApplications({ jobId });
  const {
    data: job,
    isPending: jobIsPending,
    isError: jobIsError,
    error: jobError,
  } = useGetJobById({ jobId });

  useDocumentTitle(`Manage User Applications by Job- SNJOBS`);

  if (isError || jobIsError) {
    if (isError) {
      throw new Error(error.message);
    }
    if (jobIsError) {
      throw new Error(jobError.message);
    }
  }

  if (isPending || jobIsPending) {
    return <DataLoader data="applications" />;
  }

  const title = `Applications (${job.title})`;
  const subtitle = "Review and manage job applications.";

  return (
    <ContentLayout variant="card" title={title} subtitle={subtitle}>
      <ApplicationsTable data={data.applications} columns={columnsByJob} />
    </ContentLayout>
  );
};
