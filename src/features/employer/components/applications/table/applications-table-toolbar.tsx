import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { statuses } from "./data";
import { DataTableFacetedFilter } from "@/components/table";

interface DataTableToolbarProps<TData> {
  dataLength: number;
  table: Table<TData>;
}

export const ApplicationsTableToolbar = <TData,>({
  table,
  dataLength,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            isDisabled={dataLength === 0}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="icon-end icon-btn" />
          </Button>
        )}
      </div>
    </div>
  );
};
