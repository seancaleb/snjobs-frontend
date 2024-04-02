import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAppliedJobs } from "../api/use-get-applied-jobs";
import { AppliedJobList } from "../components/applied-job-list";
import { JobListSkeleton } from "../components/job-list-skeleton";
import { useDocumentTitle } from "@mantine/hooks";

export const AppliedJobs = () => {
  const appliedJobs = useGetAppliedJobs();
  const title = "Applied jobs";
  const subtitle = "Manage all your applied jobs here.";

  useDocumentTitle("Applied Jobs - SNJOBS");

  if (appliedJobs.isError) {
    throw new Error(appliedJobs.error.message);
  }

  return (
    <Card className="w-full border-0 lg:border">
      <CardHeader className="p-0 pb-6 lg:p-6">
        <div className="space-y-1.5">
          <CardTitle className="text-base tracking-normal">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 lg:p-6">
        {appliedJobs.isPending ? (
          <JobListSkeleton />
        ) : (
          <AppliedJobList jobs={appliedJobs.data} />
        )}
      </CardContent>
    </Card>
  );
};
