import { useSearchParams } from "react-router-dom";
import { Jobs } from "..";
import { JobPostCard } from "./job-post-card";
import _ from "lodash";
import Balancer from "react-wrap-balancer";

type JobPostListProps = {
  jobs: Jobs;
};

export const JobPostList = ({ jobs }: JobPostListProps) => {
  const jobListEl =
    jobs.total !== 0 ? (
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {jobs.jobs.map((job) => (
          <li key={job.jobId}>
            <JobPostCard job={job} />
          </li>
        ))}
      </ul>
    ) : null;

  return jobListEl;
};

type EmptyJobPostListProps = {
  total: number;
};

export const EmptyJobPostList = ({ total }: EmptyJobPostListProps) => {
  const [searchParams] = useSearchParams();

  const keywordParams = searchParams.get("keyword");
  const locationParams = searchParams.get("location");
  const fromAgeParams = searchParams.get("fromAge");
  const sortByParams = searchParams.get("sortBy");

  const hasSearchResults = !!keywordParams || !!locationParams;
  const hasFilters = !!fromAgeParams || !!sortByParams;

  const searchMessage = `${keywordParams ? `"${keywordParams}"` : ""} ${
    locationParams ? `in ${_.startCase(locationParams)}` : ""
  }`;

  const emptySearchResultsEl = (hasSearchResults || hasFilters) && (
    <>
      <div className="text-xl font-semibold">
        The search{" "}
        <span className="font-semibold text-indigo-600 break-words">
          {searchMessage}
        </span>{" "}
        did not match any jobs.
      </div>
      <p className="text-sm muted">
        Please try adjusting the filters or reviewing for any spelling errors as
        we couldn't find a match for your search.
      </p>
    </>
  );

  const emptyJobAdsResultsEl = !hasSearchResults && total === 0 && (
    <>
      <div className="text-xl font-semibold">No job ads at the moment.</div>
      <p className="text-sm muted">Keep track of the latest job posts here.</p>
    </>
  );

  return (
    <div className="text-center grid place-items-center gap-4 py-12 sm:px-6 lg:h-96">
      <Balancer>
        <div className="space-y-2 max-w-lg w-full">
          {emptySearchResultsEl}
          {emptyJobAdsResultsEl}
        </div>
      </Balancer>
    </div>
  );
};
