import { Separator } from "@/components/ui/separator";
import { JobPost as JobPostType } from "..";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatJobPostTime } from "@/utils/format-job-post-time";
import { parseISO } from "date-fns";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { generateKey } from "@/utils/generate-key";
import { useMediaQuery } from "@mantine/hooks";

type JobPostProps = {
  job: JobPostType;
};

export const JobPostCard = ({ job }: JobPostProps) => {
  const formattedJobDate = formatJobPostTime(new Date(job.createdAt));
  const modifiedDate = formatJobPostTime(parseISO(job.createdAt));
  const [, setSearchParams] = useSearchParams();
  const matches = useMediaQuery("(min-width: 64em)");
  const navigate = useNavigate();

  const location = useLocation();
  const isActive = location.search.includes(`jobId=${job.jobId}`);

  const handleClickJobPost = () => {
    if (!matches) {
      navigate(`/jobs/${job.jobId}`);
    }

    setSearchParams((params) => {
      params.set("jobId", job.jobId);
      return params;
    });
  };

  const newJobNoticeEl =
    modifiedDate === "just now" ? (
      <span className="text-green-600 dark:text-green-500 text-xs font-medium">
        New
      </span>
    ) : null;

  const requirementListEl = (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {job.requirements.slice(0, 2).map((requirement, index) => (
        <li
          key={`${generateKey(requirement)}-${index}`}
          className="text-sm muted"
        >
          {requirement}
        </li>
      ))}
    </ul>
  );

  return (
    <Card
      className={cn(
        "w-full h-full flex flex-col justify-between",
        isActive && "border-indigo-600"
      )}
      onClick={handleClickJobPost}
    >
      <CardHeader className="grid gap-2">
        <div className="space-y-1.5">
          <div className="space-y-0">
            {newJobNoticeEl}
            <CardTitle className="text-lg tracking-[-.015em]">
              {job.title}
            </CardTitle>
          </div>
          <div className="space-y-0 flex gap-2 text-sm items-center">
            <div>{job.employerName}</div>
            <Separator className="h-4" orientation="vertical" />
            <div> {job.location}</div>
          </div>
        </div>
        {requirementListEl}
      </CardHeader>
      <CardFooter>
        <span className="text-muted-foreground text-xs">
          Posted {formattedJobDate}
        </span>
      </CardFooter>
    </Card>
  );
};
