/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        warning:
          "border-transparent bg-orange-200/70 text-primary dark:bg-orange-500/5 dark:text-orange-500",
        success:
          "border-transparent bg-green-200/70 text-primary dark:bg-green-500/5 dark:text-green-500",
        info: "border-transparent bg-blue-200/70 text-primary dark:bg-blue-500/5 dark:text-blue-500",
        error:
          "border-transparent bg-red-200/70 text-primary dark:bg-red-500/5 dark:text-red-500",
        accent:
          "border-transparent bg-indigo-200/70 text-primary dark:bg-indigo-500/5 dark:text-indigo-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), "whitespace-nowrap", className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
