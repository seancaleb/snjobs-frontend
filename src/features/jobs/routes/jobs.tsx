import { ContentLayout } from "@/components/layout";
import { useGetJobs } from "../api/use-get-jobs";
import { EmptyJobPostList, JobPostList } from "../components/job-post-list";
import { DataLoader, Pagination } from "@/components/elements";
import { JobPostAd } from "../components/job-post-ad";
import { SearchJob } from "../components/search-job";
import { FilterJob } from "../components/filter-job";
import { useIsFetchingJobs } from "../hooks/use-is-fetching-jobs";
import { useJobsDocTitle } from "../hooks/use-jobs-doc-title";

export const Jobs = () => {
  const jobs = useGetJobs();
  useIsFetchingJobs(jobs.isFetching);
  useJobsDocTitle();

  if (jobs.isError) {
    throw new Error(jobs.error.message);
  }

  return (
    <ContentLayout className="relative max-w-6xl mx-auto">
      <SearchJob />
      <FilterJob total={jobs.data?.total} />

      {jobs.isPending || jobs.isFetching ? (
        <div className="h-96 relative w-full">
          <DataLoader data="job ads" />
        </div>
      ) : (
        <>
          {jobs.data.total !== 0 ? (
            <div className="flex flex-col lg:flex-row items-start gap-4">
              <div className="grid gap-6 order-2 w-full lg:w-auto lg:order-1 lg:basis-[448px] shrink-0">
                <JobPostList jobs={jobs.data} />
                {jobs.data.totalPages > 1 ? (
                  <Pagination
                    isPlaceholderData={jobs.isPlaceholderData}
                    pages={jobs.data.totalPages}
                  />
                ) : null}
              </div>
              <div className="hidden lg:block lg:sticky lg:top-[1rem] w-full order-1 lg:order-2">
                <JobPostAd />
              </div>
            </div>
          ) : (
            <EmptyJobPostList total={jobs.data.total} />
          )}
        </>
      )}
    </ContentLayout>
  );
};
