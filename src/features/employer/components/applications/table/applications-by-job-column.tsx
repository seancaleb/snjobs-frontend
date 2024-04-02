import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ColumnDropdownActions } from "./column-dropdown-actions";
import { formatJobPostTime } from "@/utils/format-job-post-time";
import { Application } from "@/types";
import { generateBadgeVariant } from "@/utils/generate-badge-variant";

export const columnsByJob: ColumnDef<Omit<Application, "jobId">>[] = [
  {
    accessorKey: "applicationId",
    header: "Application ID",
    cell: ({ row }) => {
      const applicationId = row.getValue<string>("applicationId");
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = formatJobPostTime(parseISO(createdAt));

      return (
        <div className="w-48 break-words">
          {modifiedDate === "just now" ? (
            <span className="text-green-600 dark:text-green-500 text-xs font-medium">
              New
            </span>
          ) : null}
          <div>{applicationId}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "jobId",
    header: "Job ID",
    cell: ({ row }) => {
      const jobId = row.getValue<string>("jobId");

      return <div>{jobId}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Application date
            <ArrowUpDown className="icon-end icon-btn" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = format(parseISO(createdAt), "LL/dd/yyyy");

      return <div className="text-right">{modifiedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last modified
            <ArrowUpDown className="icon-end icon-btn" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue<string>("updatedAt");
      const modifiedDate = formatJobPostTime(parseISO(updatedAt));
      const capitalizedDate =
        modifiedDate[0].toUpperCase() + modifiedDate.slice(1);

      return <div className="text-right">{capitalizedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      return (
        <div className="text-right">
          <Badge variant={generateBadgeVariant(status)}>{status}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value: []) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const applicationId = row.getValue<string>("applicationId");
      const jobId = row.getValue<string>("jobId");

      const columnActionProps = {
        applicationId,
        jobId,
      };

      return <ColumnDropdownActions {...columnActionProps} />;
    },
  },
];
