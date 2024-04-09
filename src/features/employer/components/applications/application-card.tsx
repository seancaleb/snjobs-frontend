import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ApplicationList } from "./application-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobApplications } from "../../schema/applications.schema";

type ApplicationsCardProps = {
  applications: JobApplications;
  jobId?: string;
  description?: string;
};

export const ApplicationCard = ({
  applications,
  jobId,
  description = "Latest applications for this job post.",
}: ApplicationsCardProps) => {
  const location = useLocation();

  const path = location.pathname.includes("dashboard")
    ? "/employer/applications"
    : `/employer/job-postings/${jobId}/applications`;

  return (
    <Card className="w-full 2xl:min-w-[28rem] 2xl:max-w-[28rem] break-words ">
      <CardHeader className="flex-row justify-between gap-6 items-start">
        <div className="space-y-1.5 w-full">
          <div className="flex items-center justify-between gap-6">
            <CardTitle className="text-base tracking-[-.015em]">
              Recent applications
            </CardTitle>
            <Link className="link" to={path}>
              View all
              <ChevronRight className="icon-end" />
            </Link>
          </div>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 relative overflow-x-auto">
        <ApplicationList jobApplications={applications} />
      </CardContent>
    </Card>
  );
};
