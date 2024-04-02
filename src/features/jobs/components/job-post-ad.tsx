import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { useGetJobById } from "..";
import Skeleton from "react-loading-skeleton";
import { JobPostDetails } from "./job-post-details";
import { User, useGetProfile } from "@/features/account";
import Balancer from "react-wrap-balancer";
import { JobAd } from "@/components/svg";
import { Transition } from "@/components/animations";
import { springTransition } from "@/lib/framer";

export const JobPostAd = () => {
  const [searchParams] = useSearchParams();
  const job = useGetJobById({ jobId: searchParams.get("jobId") as string });
  const profile = useGetProfile();

  if (!searchParams.get("jobId")) {
    return <JobPostAdPlaceholder />;
  }

  if (job.isError || profile.isError) {
    if (job.isError) {
      throw new Error(job.error.message);
    }
    if (profile.isError) {
      throw new Error(profile.error.message);
    }
  }

  if (job.isPending || profile.isPending) {
    return <JobPostAdSkeleton />;
  }

  return (
    <Transition
      className="top-0 relative w-full"
      MotionProps={{
        initial: {
          opacity: 0,
          x: -6,
        },
        animate: {
          opacity: 1,
          x: 0,
        },
        transition: { ...springTransition },
      }}
    >
      <JobPostDetails
        job={job.data}
        applications={(profile.data as User).applications}
        bookmark={(profile.data as User).bookmark}
        className="overflow-y-auto max-h-[calc(100vh-4.125rem-2rem)]"
        isJobPostAd
      />
    </Transition>
  );
};

const JobPostAdSkeleton = () => {
  return (
    <Card className="relative break-words p-0 overflow-y-auto lg:max-h-[calc(100vh-4.125rem-2rem)]">
      <CardHeader className="grid gap-4 sticky top-0 bg-background lg:z-40">
        <div className="space-y-1.5">
          <div className="flex justify-between gap-6">
            <CardTitle className="w-52 sm:w-64">
              <Skeleton />
            </CardTitle>
          </div>
          <div className="space-y-0 flex gap-2 text-sm items-center">
            <div className="w-24">
              <Skeleton />
            </div>
            <Separator className="h-4" orientation="vertical" />
            <div className="w-24">
              <Skeleton />
            </div>
          </div>
          <div className="w-36">
            <Skeleton />
          </div>
        </div>

        <Separator />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div>
            <Skeleton count={2} />
          </div>
          <div className="w-2/3">
            <Skeleton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const JobPostAdPlaceholder = () => {
  return (
    <div className="text-center lg:p-6 py-12 lg:h-96 grid place-items-center w-full">
      <div className="space-y-6">
        <div className="w-full flex justify-center">
          <div className="h-48">
            <JobAd />
          </div>
        </div>
        <Balancer>
          <div className="space-y-1.5">
            <div className="font-semibold text-xl">
              You haven't selected a job ad
            </div>
            <p className="muted">
              Select an ad on the left to see the details here.
            </p>
          </div>
        </Balancer>
      </div>
    </div>
  );
};
