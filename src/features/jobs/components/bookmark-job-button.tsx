import { Button } from "@/components/ui/button";
import { useBookmarkJob } from "@/features/users/api/use-bookmark-job";
import { Bookmark } from "lucide-react";
import debounce from "lodash/debounce";
import { toastMessageFormatter } from "@/utils/toast-message-formatter";
import { toast } from "sonner";

type BookmarkJobButtonProps = {
  jobId: string;
  bookmark: string[];
};

export const BookmarkJobButton = ({
  jobId,
  bookmark,
}: BookmarkJobButtonProps) => {
  const bookmarkJobMutation = useBookmarkJob();
  const isBookmarked = bookmark.indexOf(jobId);

  const handleClickBookmarkJob = debounce(() => {
    bookmarkJobMutation.mutate(
      { jobId },
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
      }
    );
  }, 300);

  const bookmarkJobButtonEl =
    isBookmarked !== -1 ? (
      <Button
        variant="outline"
        onClick={handleClickBookmarkJob}
        className="flex items-center gap-2"
      >
        <Bookmark className="icon fill-indigo-600 text-indigo-600" />
        Saved
      </Button>
    ) : (
      <Button variant="outline" size="icon" onClick={handleClickBookmarkJob}>
        <Bookmark className="icon" />
      </Button>
    );

  return bookmarkJobButtonEl;
};
