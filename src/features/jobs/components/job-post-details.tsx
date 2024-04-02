import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { JobPost } from "..";
import { formatJobPostTime } from "@/utils/format-job-post-time";
import { ApplicantsBadge } from "./applicants-badge";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ApplyJobButton } from "./apply-job-button";
import { BookmarkJobButton } from "./bookmark-job-button";
import { generateKey } from "@/utils/generate-key";

type JobPostDetails = {
  job: JobPost;
  applications: string[];
  bookmark: string[];
  className?: ComponentProps<typeof Card>["className"];
  isJobPostAd?: boolean;
};

export const JobPostDetails = ({
  job,
  applications,
  bookmark,
  className,
  isJobPostAd = false,
}: JobPostDetails) => {
  const formattedJobDate = formatJobPostTime(new Date(job.createdAt));

  const titleHeader = isJobPostAd ? (
    <CardTitle className="tracking-[-.015em] text-2xl">
      <Link to={`/jobs/${job.jobId}`} className="hover:underline">
        {job.title}
        <ExternalLink className="ml-2 inline w-[var(--text-2xl)] h-[var(--text-2xl)]" />
      </Link>
    </CardTitle>
  ) : (
    <CardTitle className="tracking-[-.015em] text-2xl">{job.title}</CardTitle>
  );

  return (
    <Card
      className={cn("w-full relative break-words overflow-clip", className)}
    >
      <CardHeader className="grid gap-4 sticky top-0 bg-background lg:z-20">
        <div className="space-y-1.5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
            {titleHeader}
            <ApplicantsBadge totalApplications={job.applications.length} />
          </div>
          <div className="flex gap-2 text-sm items-center">
            <div>{job.employerName}</div>
            <Separator className="h-4" orientation="vertical" />
            <div> {job.location}</div>
          </div>
          <span className="text-muted-foreground text-xs">
            Posted {formattedJobDate}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <ApplyJobButton jobId={job.jobId} applications={applications} />
          <BookmarkJobButton jobId={job.jobId} bookmark={bookmark} />
        </div>

        <Separator />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="font-medium text-sm">Description</div>
          <p className="whitespace-pre-wrap muted">{job.description}</p>
        </div>

        <div className="space-y-2">
          <div className="font-medium text-sm">Requirements</div>
          <RequirementsList requirements={job.requirements} />
        </div>
      </CardContent>
    </Card>
  );
};

type RequirementsListProps = {
  requirements: string[];
};

const RequirementsList = ({ requirements }: RequirementsListProps) => {
  return (
    <ul className="muted my-6 ml-6 list-disc [&>li]:mt-2">
      {requirements.map((requirement, index) => (
        <li key={`${generateKey(requirement)}-${index}`}>{requirement}</li>
      ))}
    </ul>
  );
};
