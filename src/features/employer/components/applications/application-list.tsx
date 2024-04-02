import { Badge } from "@/components/ui/badge";
import { generateBadgeVariant } from "@/utils/generate-badge-variant";
import {
  JobApplication,
  JobApplications,
} from "../../schema/applications.schema";
import { ProfileAvatar } from "@/features/account/components/profile/profile-avatar";
import _ from "lodash";

type ApplicationsListProps = {
  jobApplications: JobApplications;
};

export const ApplicationList = ({ jobApplications }: ApplicationsListProps) => {
  const { total, applications } = jobApplications;

  const jobApplicationsListEl =
    total !== 0 ? (
      <ul className="grid gap-4">
        {applications.slice(0, 5).map((application) => (
          <li key={application.applicationId}>
            <ApplicationItem application={application} />
          </li>
        ))}
      </ul>
    ) : null;

  const emptyApplicationsEl = total === 0 ? <EmptyApplicationList /> : null;

  return (
    <div className="space-y-6 muted">
      {jobApplicationsListEl}
      {emptyApplicationsEl}
    </div>
  );
};

type ApplicationItemProps = {
  application: JobApplication;
};

const ApplicationItem = ({ application }: ApplicationItemProps) => {
  const { status, user } = application;

  const firstName = _.truncate(user.firstName, {
    length: 12,
    separator: " ",
    omission: "",
  });
  const name = `${firstName} ${user.lastName[0]}.`;

  return (
    <div className="flex justify-between items-start gap-6">
      <div className="flex space-x-4 items-center">
        <ProfileAvatar user={user} />
        <div className="w-32">
          <div className="text-primary font-medium">{name}</div>
        </div>
      </div>
      <Badge variant={generateBadgeVariant(status)}>{status}</Badge>
    </div>
  );
};

const EmptyApplicationList = () => {
  return (
    <div className="text-center text-sm h-24 grid place-items-center">
      No applications yet.
    </div>
  );
};
