import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types";

type ColumnDropdownActions = Pick<Application, "jobId" | "applicationId">;

export const ColumnDropdownActions = ({
  jobId,
  applicationId,
}: ColumnDropdownActions) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isJobPostingsRoute = location.pathname.includes("job-postings");

  const browseJobPostItemEl = !isJobPostingsRoute ? (
    <DropdownMenuItem asChild>
      <Link to={`/employer/job-postings/${jobId}`}>
        <Eye className="icon-start icon-btn" />
        Browse job post
      </Link>
    </DropdownMenuItem>
  ) : null;

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              to={`/employer/job-postings/${jobId}/applications/${applicationId}`}
            >
              <Eye className="icon-start icon-btn" />
              View
            </Link>
          </DropdownMenuItem>
          {browseJobPostItemEl}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
