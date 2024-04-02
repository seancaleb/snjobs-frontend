/* eslint-disable react-hooks/exhaustive-deps */
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

type PaginationProps = {
  isPlaceholderData: boolean;
  pages: number;
};

export const Pagination = ({ isPlaceholderData, pages }: PaginationProps) => {
  const { page, handleClickNextPage, handleClickPage, handleClickPrevPage } =
    usePagination(pages);

  const buttonRange = 5;
  let start = Math.max(1, page - Math.floor(buttonRange / 2));
  let end = Math.min(pages, start + buttonRange - 1);

  if (pages <= buttonRange) {
    start = 1;
    end = pages;
  } else if (end === pages) {
    start = Math.max(1, end - buttonRange + 1);
  }

  const buttons = [];
  for (let i = start; i <= end; i++) {
    buttons.push(
      <PaginationItem key={`pagination-item-${i}`}>
        <PaginationLink
          className={`${
            isPlaceholderData ? "pointer-events-none" : null
          } cursor-pointer`}
          isActive={i === page}
          onClick={() => handleClickPage(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <PaginationUI className="justify-start">
      <PaginationContent>
        {page !== 1 ? (
          <PaginationItem>
            <PaginationPrevious
              onClick={handleClickPrevPage}
              className={`${
                isPlaceholderData ? "pointer-events-none" : null
              } cursor-pointer`}
            />
          </PaginationItem>
        ) : null}

        {buttons}

        {page !== pages ? (
          <PaginationItem>
            <PaginationNext
              onClick={handleClickNextPage}
              className={`${
                isPlaceholderData ? "pointer-events-none" : null
              } cursor-pointer`}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </PaginationUI>
  );
};
