import { DataLoader } from "@/components/elements";
import { ContentLayout } from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { useGetJobById } from "@/features/jobs";
import { useDocumentTitle } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { EditJobForm } from "../components/jobs/form/edit-job-form";

type RouteParams = {
  jobId: string;
};

export const EditJob = () => {
  const { jobId } = useParams<RouteParams>();
  const { data: job, isPending, isError, error } = useGetJobById({ jobId });

  const title = "Edit job";
  const subtitle = "Perform changes on this job post.";

  useDocumentTitle(`Edit Job - SNJOBS`);

  if (isError) {
    throw new Error(error.message);
  }

  if (isPending) {
    return <DataLoader data="job" />;
  }

  return (
    <ContentLayout className="relative max-w-4xl mx-auto" title={title} subtitle={subtitle}>
      <Separator />
      <EditJobForm job={job} />
    </ContentLayout>
  );
};
