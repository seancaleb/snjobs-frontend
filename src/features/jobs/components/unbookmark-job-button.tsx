import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useUnbookmarkJob } from "../hooks/use-unbookmark-job";

type UnbookmarkJobButtonProps = {
  jobId: string;
};

export const UnbookmarkJobButton = ({ jobId }: UnbookmarkJobButtonProps) => {
  const unbookmarkJobMutation = useUnbookmarkJob(jobId);

  const handleClickUnbookmarkJob = () => {
    unbookmarkJobMutation.mutate();

    toast.success("Job Unbookmarked", {
      description: "The job post has been removed from your bookmarks.",
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleClickUnbookmarkJob}
      className="flex items-center gap-2"
    >
      <Bookmark className="h-4 w-4 fill-indigo-600 text-indigo-600" />
      Saved
    </Button>
  );
};
