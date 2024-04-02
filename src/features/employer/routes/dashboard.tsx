/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ApplicationCard } from "../components/applications/application-card";
import { ContentLayout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobPostingsTable, columns } from "@/features/jobs";
import { useGetJobPostings } from "../api/use-get-job-postings";
import { useGetAllJobApplications } from "../api/use-get-all-job-applications";
import { DataLoader } from "@/components/elements";
import { JobApplicationsOverview, JobPostings } from "..";
import { useGetApplicationsOverview } from "../api/use-get-applications-overview";
import { useMemo } from "react";
import { ApplicationTrends } from "../components/applications/chart/application-trends";
import { useDocumentTitle } from "@mantine/hooks";

export const Dashboard = () => {
  const jobs = useGetJobPostings();
  const applications = useGetAllJobApplications();
  const applicationsOverview = useGetApplicationsOverview();
  const pendingApplications =
    applicationsOverview.data?.applicationStatusDistribution.find(
      (status) => status.name === "Applied"
    )?.count;

  const applicationTrends = useMemo(
    () => applicationsOverview.data?.applicationTrends,
    [applicationsOverview.isSuccess]
  );

  useDocumentTitle(`Dashboard - SNJOBS`);

  if (jobs.isError) {
    throw new Error(jobs.error.message);
  }

  if (applications.isError) {
    throw new Error(applications.error.message);
  }

  if (applicationsOverview.isError) {
    throw new Error(applicationsOverview.error.message);
  }

  if (
    jobs.isPending ||
    applications.isPending ||
    applicationsOverview.isPending
  ) {
    return <DataLoader data="dashboard" />;
  }

  return (
    <ContentLayout
      title="Dashboard"
      subtitle="Visualize all the latest updates from your dashboard."
      className="space-y-4 2xl:space-y-6"
    >
      <div className="flex flex-col 2xl:flex-row gap-4 items-start overflow-hidden">
        <div className="grid gap-4 w-full">
          <OverviewDataList
            totalJobs={applicationsOverview.data.totalJobs}
            totalApplications={applicationsOverview.data.totalApplications}
            pendingApplications={pendingApplications as number}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-base tracking-[-.015em]">
                Application trends
              </CardTitle>
              <CardDescription>
                Graph trend in the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 min-h-[12rem] sm:min-h-[20rem]">
              <ApplicationTrends
                applicationTrends={
                  applicationTrends as JobApplicationsOverview["applicationTrends"]
                }
                applicationTrendsGraphActive={
                  applicationsOverview.data.applicationTrendsGraphActive
                }
              />
            </CardContent>
          </Card>
        </div>

        <ApplicationCard applications={applications.data} />
      </div>

      <JobPostingsCard jobs={jobs.data} />
    </ContentLayout>
  );
};

type OverviewDataListProps = {
  totalJobs: number;
  totalApplications: number;
  pendingApplications: number;
};

const OverviewDataList = ({
  totalJobs,
  totalApplications,
  pendingApplications,
}: OverviewDataListProps) => {
  const overviewData = [
    { label: "Total jobs", value: totalJobs, color: "indigo" },
    { label: "Total applications", value: totalApplications, color: "green" },
    {
      label: "Pending applications",
      value: pendingApplications,
      color: "orange",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full muted">
      {overviewData.map(({ label, value }, idx) => (
        <Card key={`${label.toLowerCase()}-${idx}`} className="w-full">
          <CardHeader className="pb-1.5">
            <CardTitle className="text-sm font-normal tracking-normal">
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <h3 className="font-bold">{value}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

type JobPostingsCardProps = {
  jobs: JobPostings;
};

const JobPostingsCard = ({ jobs }: JobPostingsCardProps) => {
  const viewAllJobsEl = (
    <Link className="link" to="/employer/job-postings">
      View all
      <ChevronRight className="icon-end" />
    </Link>
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row justify-between gap-6 items-start">
        <div className="space-y-1.5 w-full">
          <div className="flex items-center justify-between gap-6">
            <CardTitle className="text-base tracking-[-.015em]">
              Latest job posts
            </CardTitle>
            {viewAllJobsEl}
          </div>
          <CardDescription>Your latest published job posts.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <JobPostingsTable
          data={jobs.jobs}
          columns={columns}
          withActions={false}
        />
      </CardContent>
    </Card>
  );
};
