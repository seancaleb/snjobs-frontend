import { disableInteractions } from "@/utils/disable-interactions";
import { useEffect } from "react";

export const useIsFetchingJobs = (isFetching: boolean) => {
  useEffect(() => {
    if (isFetching) {
      disableInteractions(true);
    } else {
      disableInteractions(false);
    }
  }, [isFetching]);
};
