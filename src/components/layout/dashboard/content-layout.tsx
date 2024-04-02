import React, { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ContentLayoutProps = ComponentProps<"div"> & {
  title?: string;
  subtitle?: string;
  element?: React.ReactNode;
  variant?: "card" | "default";
};

type ContentLayoutRef = HTMLDivElement;

export const ContentLayout = forwardRef<ContentLayoutRef, ContentLayoutProps>(
  ({ title, subtitle, element, children, className, ...props }, ref) => {
    const hasHeader = title || subtitle;
    const headerEl = hasHeader ? (
      <div className="flex flex-col sm:flex-row gap-6 justify-between">
        <div className="space-y-1">
          <h3>{title}</h3>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
        {element}
      </div>
    ) : null;

    return (
      <div
        ref={ref}
        className={cn("space-y-6 w-full p-6 break-words", className)}
        {...props}
      >
        {headerEl}
        {children}
      </div>
    );
  }
);
