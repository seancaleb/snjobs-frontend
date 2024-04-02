import { Separator } from "@/components/ui/separator";
import { formatJobPostTime } from "@/utils/format-job-post-time";
import { ContentLayout } from "@/components/layout";
import { generateKey } from "@/utils/generate-key";
import { JobPost } from "../schema";
import { ApplicantsBadge } from "./applicants-badge";

type JobDetailsProps = {
  job: JobPost;
};

export const JobDetails = ({ job }: JobDetailsProps) => {
  const formattedJobDate = formatJobPostTime(new Date(job.createdAt));

  return (
    <ContentLayout
      variant="card"
      className="space-y-6 break-words p-0 md:p-6 md:px-0"
    >
      <div className="flex justify-between gap-6">
        <div className="space-y-1.5 w-full">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
            <h3>{job.title}</h3>
            <ApplicantsBadge totalApplications={job.applications.length} />
          </div>
          <div className="space-y-0 flex gap-2 text-sm items-center">
            <div>{job.employerName}</div>
            <Separator className="h-4" orientation="vertical" />
            <div> {job.location}</div>
          </div>
          <p className="muted">Posted {formattedJobDate}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-sm">Description</div>
        <p className="whitespace-pre-wrap muted">{job.description}</p>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-sm">Requirements</div>
        <RequirementsList requirements={job.requirements} />
      </div>
    </ContentLayout>
  );
};

type RequirementsListProps = {
  requirements: string[];
};

const RequirementsList = ({ requirements }: RequirementsListProps) => {
  return (
    <ul className="muted my-6 ml-6 list-disc [&>li]:mt-2">
      {requirements.map((requirement, idx) => (
        <li key={`${generateKey(requirement)}-${idx}`}>{requirement}</li>
      ))}
    </ul>
  );
};
