import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Send } from "lucide-react";

type ApplyJobButtonProps = {
  jobId: string;
  applications: string[];
};

export const ApplyJobButton = ({
  jobId,
  applications,
}: ApplyJobButtonProps) => {
  const isAppliedJob = applications.indexOf(jobId);
  const location = useLocation();

  if (location.pathname.includes("apply")) {
    return null;
  }

  const applyJobButtonEl =
    isAppliedJob === -1 ? (
      <Button asChild>
        <Link to={`/jobs/${jobId}/apply`}>
          <Briefcase className="icon-start-btn" />
          Apply now
        </Link>
      </Button>
    ) : (
      <Button disabled>
        <Send className="icon-start-btn" />
        Application submitted
      </Button>
    );

  return applyJobButtonEl;
};
