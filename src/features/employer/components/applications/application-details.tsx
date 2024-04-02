import { ContentLayout } from "@/components/layout";
import { Link } from "react-router-dom";
import { UpdateApplicationStatus } from "./form/update-application-status";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { generateBadgeVariant } from "@/utils/generate-badge-variant";
import { JobApplication } from "../../schema/applications.schema";
import { useMediaQuery } from "@mantine/hooks";
import { DataLoader } from "@/components/elements";

type ApplicationDetailsProps = {
  jobApplication: JobApplication;
};

export const ApplicationDetails = ({
  jobApplication,
}: ApplicationDetailsProps) => {
  const { user, status, applicationId, resume, coverLetter, jobId } =
    jobApplication;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClickEdit = () => setIsEditMode(true);
  const handleSetEditModeFalse = () => setIsEditMode(false);

  const matches = useMediaQuery("(min-width: 48em)");

  if (matches === undefined) {
    return <DataLoader />;
  }

  const updateApplicationEl = (
    <div className="flex flex-col md:flex-row gap-2 md:absolute top-6 right-6 mt-6 md:mt-0">
      <Button type="button" onClick={handleClickEdit}>
        <Edit className="icon-start-btn" />
        Update application
      </Button>
    </div>
  );

  const updateApplicationStatusEl = isEditMode ? (
    <UpdateApplicationStatus
      handleSetEditModeFalse={handleSetEditModeFalse}
      applicationId={applicationId}
      applicationStatus={
        status as "Applied" | "Application viewed" | "Not selected by employer"
      }
      jobId={jobId}
    />
  ) : (
    <>
      <Badge variant={generateBadgeVariant(status)}>{status}</Badge>
      {updateApplicationEl}
    </>
  );

  return (
    <ContentLayout variant="card" className="break-words p-0 md:p-6 md:px-0">
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <h4>
            <Link
              to={`/users/info/${user.userId}`}
              target="_blank"
              className="hover:underline"
            >
              {user.firstName} {user.lastName}
              <ExternalLink className="ml-2 inline w-[var(--text-xl)] h-[var(--text-xl)]" />
            </Link>
          </h4>

          <div className="muted">#{applicationId}</div>
        </div>

        {matches ? (
          <div className="flex-shrink-0">{updateApplicationStatusEl}</div>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="font-medium text-sm">Resume</div>
        <p className="whitespace-pre-wrap transition duration-150 text-indigo-500 hover:text-indigo-600 text-sm">
          <Link to={resume} target="_blank">
            {resume}
          </Link>
        </p>
      </div>
      <div className="space-y-2">
        <div className="font-medium text-sm">Cover letter</div>
        <p className="whitespace-pre-wrap muted">{coverLetter}</p>
      </div>

      {!matches ? (
        <div className="flex-shrink-0">{updateApplicationStatusEl}</div>
      ) : null}
    </ContentLayout>
  );
};
