/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (maxPages: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() =>
    searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1
  );

  const handleUpdatePage = useCallback(
    (updatedPage: number) => {
      setSearchParams((params) => {
        params.set("page", updatedPage.toString());

        if (params.get("jobId")) {
          params.delete("jobId");
        }

        return params;
      });
    },
    [setSearchParams]
  );

  const handleClickNextPage = useCallback(() => {
    setPage((prev) => (prev === maxPages ? prev : prev + 1));
  }, [maxPages]);

  const handleClickPrevPage = useCallback(() => {
    setPage((prev) => (prev === 1 ? prev : prev - 1));
  }, []);

  const handleClickPage = useCallback((targetPage: number) => {
    setPage(targetPage);
  }, []);

  useEffect(() => {
    handleUpdatePage(page);
  }, [page]);

  return { page, handleClickNextPage, handleClickPrevPage, handleClickPage };
};
