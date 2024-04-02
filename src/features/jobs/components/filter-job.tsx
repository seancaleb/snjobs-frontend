import { useSearchParams } from "react-router-dom";
import { FilterJobForm } from "./form/filter-job-form";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";

type FilterJobProps = {
  total?: number;
};

export const FilterJob = ({ total }: FilterJobProps) => {
  const [searchParams] = useSearchParams();

  const keywordParams = searchParams.get("keyword");
  const locationParams = searchParams.get("location");

  const hasSearchResults = !!keywordParams || !!locationParams;

  if (!hasSearchResults) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="grid">
        <span className="text-indigo-500 w-24">
          {total !== undefined ? (
            `${total} job${total || 0 > 1 ? "s" : ""}`
          ) : (
            <Skeleton />
          )}
        </span>
        <span className="muted break-words">
          {`${
            keywordParams
              ? `'${keywordParams.substring(0, 32)}${
                  keywordParams.length > 32 ? "..." : ""
                }'`
              : ""
          }`}{" "}
          jobs {`${locationParams ? `in ${_.startCase(locationParams)}` : ""}`}
        </span>
      </div>
      <FilterJobForm total={total} />
    </div>
  );
};
