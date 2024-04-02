import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ColumnDropdownActions } from "./column-dropdown-actions";
import { formatJobPostTime } from "@/utils/format-job-post-time";
import { EmployerJob } from "@/types";

export const columns: ColumnDef<EmployerJob>[] = [
  {
    accessorKey: "title",
    header: "Job title",
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      const createdAt = row.getValue<string>("createdAt");
      const modifiedDate = formatJobPostTime(parseISO(createdAt));

      return (
        <div className="w-56 break-words">
          {modifiedDate === "just now" ? (
            <span className="text-green-600 dark:text-green-500 text-xs font-medium">
              New
            </span>
          ) : null}
          <div className="font-medium">{title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="w-24">Location</div>,
    filterFn: (row, id, value: []) => {
      return value.includes(row.getValue(id));
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
            Date published
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
    accessorKey: "applications",
    header: () => <div className="text-right">Applications</div>,
    cell: ({ row }) => {
      const jobApplications = row.getValue<string[]>("applications");

      return (
        <div className="text-right">
          <Badge variant="accent">
            {jobApplications.length > 0
              ? `${jobApplications.length} application${
                  jobApplications.length > 1 ? "s" : ""
                }`
              : "No applications yet"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobPost = row.original;

      return <ColumnDropdownActions jobPost={jobPost} />;
    },
  },
];
