import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ContentLayout } from "@/components/layout";
import { Link } from "react-router-dom";
import { useGetJobPostings } from "../api/use-get-job-postings";
import { DataLoader } from "@/components/elements";
import { JobPostingsTable, columns } from "@/features/jobs";
import { useDocumentTitle } from "@mantine/hooks";

export const JobPostings = () => {
  const { data, isPending, error, isError } = useGetJobPostings();

  const title = "Job postings";
  const subtitle = "Manage all the jobs you created.";
  const createJobEl = (
    <Button asChild>
      <Link to="create">
        <Plus className="icon-start-btn" />
        Create new job
      </Link>
    </Button>
  );

  useDocumentTitle("Job Postings - SNJOBS");

  if (isError) {
    throw new Error(error.message);
  }

  if (isPending) {
    return <DataLoader data="job postings" />;
  }

  return (
    <ContentLayout
      variant="card"
      title={title}
      subtitle={subtitle}
      element={createJobEl}
    >
      <JobPostingsTable data={data.jobs} columns={columns} />
    </ContentLayout>
  );
};
