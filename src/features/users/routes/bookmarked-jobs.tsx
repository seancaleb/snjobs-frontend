import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobListSkeleton } from "../components/job-list-skeleton";
import { useGetBookmarkedJobs } from "../api/use-get-bookmarked-jobs";
import { BookmarkedJobList } from "../components/bookmarked-job-list";
import { User, useGetProfile } from "@/features/account";
import { useDocumentTitle } from "@mantine/hooks";

export const BookmarkedJobs = () => {
  const title = "Bookmarked jobs";
  const subtitle = "Manage all your bookmarked jobs here.";
  const bookmarkedJobs = useGetBookmarkedJobs();
  const profile = useGetProfile();

  useDocumentTitle("Bookmarked Jobs - SNJOBS");

  if (bookmarkedJobs.isError || profile.isError) {
    if (bookmarkedJobs.isError) {
      throw new Error(bookmarkedJobs.error.message);
    }
    if (profile.isError) {
      throw new Error(profile.error.message);
    }
  }

  return (
    <Card className="w-full border-0 lg:border">
      <CardHeader className="p-0 pb-6 lg:p-6">
        <div className="space-y-1.5">
          <CardTitle className="text-base tracking-normal">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 lg:p-6">
        {bookmarkedJobs.isPending || profile.isPending ? (
          <JobListSkeleton />
        ) : (
          <BookmarkedJobList
            jobs={bookmarkedJobs.data}
            applications={(profile.data as User).applications}
          />
        )}
      </CardContent>
    </Card>
  );
};
