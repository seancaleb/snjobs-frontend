import { JobCardSkeleton } from "./job-card";

const tempArr = new Array(3).fill("");

export const JobListSkeleton = () => {
  const skeletonAppliedJobListEl = (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      {tempArr.map((_, index) => (
        <li key={`job-card-skeleton-${index}`}>
          <JobCardSkeleton />
        </li>
      ))}
    </ul>
  );

  return skeletonAppliedJobListEl;
};
