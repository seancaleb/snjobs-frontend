import { AppliedJobs } from "..";
import { JobCard } from "./job-card";
import { Badge } from "@/components/ui/badge";
import { generateBadgeVariant } from "@/utils/generate-badge-variant";
import { EmptyJobList } from "./empty-job-list";

type AppliedJobListProps = {
  jobs: AppliedJobs;
};

export const AppliedJobList = ({ jobs }: AppliedJobListProps) => {
  const title = "No applied jobs yet";
  const description = "Keep track of applied jobs here.";

  const appliedJobListEl =
    jobs.total !== 0 ? (
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {jobs.applications.map((job) => (
          <li key={job.jobId}>
            <JobCard job={job.job}>
              <Badge variant={generateBadgeVariant(job.status)}>
                {job.status}
              </Badge>
            </JobCard>
          </li>
        ))}
      </ul>
    ) : (
      <EmptyJobList title={title} description={description} />
    );

  return appliedJobListEl;
};
