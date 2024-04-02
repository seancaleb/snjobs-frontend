import { ApplicationDetails } from "../components/applications/application-details";
import { Separator } from "@/components/ui/separator";
import { ContentLayout } from "@/components/layout";
import { useGetJobApplication } from "../api/use-get-job-application";
import { useParams } from "react-router-dom";
import { DataLoader } from "@/components/elements";
import { useDocumentTitle } from "@mantine/hooks";

type RouteParams = {
  jobId: string;
  applicationId: string;
};

export const Application = () => {
  const { jobId, applicationId } = useParams<RouteParams>();
  const {
    data: jobApplication,
    isPending,
    isError,
    error,
  } = useGetJobApplication({
    jobId,
    applicationId,
  });
  const title = "Manage application";
  const subtitle = "Check and update user application.";

  useDocumentTitle(`Manage User Application - SNJOBS`);

  if (isError) {
    throw new Error(error.message);
  }

  if (isPending) {
    return <DataLoader data="job application" />;
  }

  return (
    <ContentLayout
      className="relative max-w-4xl mx-auto"
      title={title}
      subtitle={subtitle}
    >
      <Separator />
      <ApplicationDetails jobApplication={jobApplication} />
    </ContentLayout>
  );
};
