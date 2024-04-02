import { Separator } from "@/components/ui/separator";
import { CreateJobForm } from "../components/jobs/form/create-job-form";
import { ContentLayout } from "@/components/layout";
import { useDocumentTitle } from "@mantine/hooks";

export const CreateJob = () => {
  const title = "Create new job";
  const subtitle = "Create a new job opportunity for potential candidates.";

  useDocumentTitle(`Create Job - SNJOBS`);

  return (
    <ContentLayout
      className="relative max-w-4xl mx-auto"
      title={title}
      subtitle={subtitle}
    >
      <Separator />
      <CreateJobForm />
    </ContentLayout>
  );
};
