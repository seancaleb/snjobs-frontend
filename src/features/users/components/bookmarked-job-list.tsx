import { BookmarkedJobs } from "..";
import { JobCard } from "./job-card";
import { EmptyJobList } from "./empty-job-list";
import { ApplyJobButton } from "@/features/jobs/components/apply-job-button";
import { UnbookmarkJobButton } from "../../jobs/components/unbookmark-job-button";

type BookmarkedJobListProps = {
  jobs: BookmarkedJobs;
  applications: string[];
};

export const BookmarkedJobList = ({
  jobs,
  applications,
}: BookmarkedJobListProps) => {
  const title = "No bookmarks yet";
  const description = "Keep track of bookmarked jobs here.";

  const bookmarkedJobListEl =
    jobs.total !== 0 ? (
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {jobs.jobs.map((job) => (
          <li key={job.jobId}>
            <JobCard job={job}>
              <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
                <ApplyJobButton jobId={job.jobId} applications={applications} />
                <UnbookmarkJobButton jobId={job.jobId} />
              </div>
            </JobCard>
          </li>
        ))}
      </ul>
    ) : (
      <EmptyJobList title={title} description={description} />
    );

  return bookmarkedJobListEl;
};
