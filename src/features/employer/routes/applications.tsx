import { ContentLayout } from "@/components/layout";
import { ApplicationsTable } from "../components/applications/table/applications-table";
import { columns } from "../components/applications/table/applications-column";
import { useGetAllJobApplications } from "../api/use-get-all-job-applications";
import { DataLoader } from "@/components/elements";
import { useDocumentTitle } from "@mantine/hooks";

export const Applications = () => {
  const { data, isPending, isError, error } = useGetAllJobApplications();
  const title = "Applications";
  const subtitle = "Review and manage job applications.";

  useDocumentTitle(`Manage All User Applications - SNJOBS`);

  if (isError) {
    throw new Error(error.message);
  }

  if (isPending) {
    return <DataLoader data="job applications" />;
  }

  return (
    <ContentLayout variant="card" title={title} subtitle={subtitle}>
      <ApplicationsTable data={data.applications} columns={columns} />
    </ContentLayout>
  );
};
