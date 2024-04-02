import { Separator } from "@/components/ui/separator";
import { JobPost } from "@/features/jobs";
import { formatJobPostTime } from "@/utils/format-job-post-time";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

type JobCardProps = {
  job: JobPost;
  children?: ReactNode;
};

export const JobCard = ({ job, children }: JobCardProps) => {
  const formattedJobDate = formatJobPostTime(new Date(job.createdAt));

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col lg:flex-row items-start gap-6 justify-between">
        <div className="grid gap-1.5 w-full whitespace-nowrap">
          <CardTitle className="text-lg tracking-[-.015em]">
            <Link to={`/jobs/${job.jobId}`} className="hover:underline">
              {job.title}
            </Link>
          </CardTitle>
          <div className="space-y-0 flex gap-2 text-sm items-center">
            <div>{job.employerName}</div>
            <Separator className="h-4" orientation="vertical" />
            <div> {job.location}</div>
          </div>

          <div className="text-xs">Posted {formattedJobDate}</div>
        </div>
        {children}
      </CardHeader>
    </Card>
  );
};

export const JobCardSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start gap-6 justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-lg w-52 sm:w-64">
            <Skeleton />
          </CardTitle>
          <div className="space-y-0 flex gap-2 text-sm items-center">
            <div className="w-24">
              <Skeleton />
            </div>
            <Separator className="h-4" orientation="vertical" />
            <div className="w-24">
              <Skeleton />
            </div>
          </div>
          <CardDescription className="w-36">
            <Skeleton />
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};
