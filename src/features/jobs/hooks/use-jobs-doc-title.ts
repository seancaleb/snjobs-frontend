import { useDocumentTitle } from "@mantine/hooks";
import { format } from "date-fns";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";

export const useJobsDocTitle = () => {
  const [searchParams] = useSearchParams();

  const title = () => {
    const keyword = searchParams.get("keyword");
    const location = searchParams.get("location");
    const today = Date.now();
    const formattedDate = format(today, "d MMMM, yyyy");

    if (keyword && location) {
      return `${_.startCase(keyword)} Work, Jobs in ${_.startCase(
        location
      )} - ${formattedDate} - SNJOBS`;
    } else if (keyword) {
      return `${_.startCase(keyword)} Work, Jobs - ${formattedDate} - SNJOBS`;
    } else if (location) {
      return `Work, Jobs in ${_.startCase(
        location
      )} - ${formattedDate} - SNJOBS`;
    } else {
      return `Job Search - SNJOBS`;
    }
  };

  useDocumentTitle(title());
};
