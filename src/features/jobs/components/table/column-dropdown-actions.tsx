/* eslint-disable no-constant-condition */
import { useState } from "react";
import { AlertDialog, Spinner } from "@/components/elements";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { JobDetails } from "@/types";
import { useDeleteJobPost } from "@/features/employer/api/use-delete-job-post";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { toast } from "sonner";

type ColumnDropdownActions = {
  jobPost: JobDetails;
};

export const ColumnDropdownActions = ({ jobPost }: ColumnDropdownActions) => {
  const deleteJobMutation = useDeleteJobPost();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleSetIsOpen = () => setIsOpen(true);
  const handleIsOpenAlert = (value: boolean) => setIsOpenAlert(value);
  const handleCancelAlert = () => setIsOpenAlert(false);

  const handleCloseAlert = () => {
    deleteJobMutation.mutate(
      { jobId: jobPost.jobId },
      {
        onSuccess: ({ message }) => {
          const { title, description } = toastMessageFormatter(message);
          toast.success(title, { description });
        },
        onError: ({ message }) => {
          const { title, description } = toastMessageFormatter(message);
          toast.error(title, {
            description,
          });
        },
        onSettled: () => {
          setIsOpenAlert(false);
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={handleSetIsOpen}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to={`/employer/job-postings/${jobPost.jobId}`}>
              <Eye className="icon-start icon-btn" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenAlert(true)}>
            <Trash2 className="icon-start icon-btn" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        isOpen={isOpenAlert || deleteJobMutation.isPending}
        setIsOpen={handleIsOpenAlert}
        title="Delete job post?"
        message={
          <>
            Are you sure you want to delete this job post? This action cannot be
            undone.
          </>
        }
        actionButtons={[
          <Button
            variant="ghost"
            onClick={handleCancelAlert}
            disabled={deleteJobMutation.isPending}
          >
            Cancel
          </Button>,
          <Button
            type="submit"
            onClick={handleCloseAlert}
            disabled={deleteJobMutation.isPending}
          >
            {deleteJobMutation.isPending ? <Spinner /> : null}
            Confirm deletion
          </Button>,
        ]}
      />
    </>
  );
};
