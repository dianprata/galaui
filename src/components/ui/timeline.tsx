import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  orientation?: "vertical" | "horizontal";
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ orientation = "vertical", className, children, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        role="list"
        aria-label="Timeline"
        data-orientation={orientation}
        className={cn(
          "relative flex",
          orientation === "vertical"
            ? "flex-col space-y-6 pl-2"
            : "flex-row space-x-6 items-start overflow-x-auto pb-4",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    );
  }
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        role="listitem"
        data-slot="timeline-item"
        className={cn("group relative flex items-start gap-3.5", className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

const timelineDotVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground shadow-2xs",
        outline: "border-primary bg-background text-primary shadow-2xs",
        secondary: "border-border bg-muted text-muted-foreground",
        success: "border-success-500 bg-success-500 text-white shadow-2xs",
        warning: "border-warning-500 bg-warning-500 text-white shadow-2xs",
        destructive: "border-destructive-500 bg-destructive-500 text-white shadow-2xs",
      },
      size: {
        sm: "h-5 w-5 text-[10px]",
        default: "h-7 w-7 text-xs",
        lg: "h-9 w-9 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  icon?: React.ReactNode;
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ variant, size, icon, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-dot"
        className={cn(timelineDotVariants({ variant, size }), className)}
        {...props}
      >
        {icon !== undefined ? icon : children}
      </div>
    );
  }
);
TimelineDot.displayName = "TimelineDot";

export interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-hidden="true"
        data-slot="timeline-connector"
        className={cn(
          "absolute left-[13px] top-7 -bottom-6 w-0.5 bg-border group-last:hidden",
          className
        )}
        {...props}
      />
    );
  }
);
TimelineConnector.displayName = "TimelineConnector";

export interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="timeline-content"
        className={cn("flex flex-1 flex-col pt-0.5", className)}
        {...props}
      />
    );
  }
);
TimelineContent.displayName = "TimelineContent";

export interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        data-slot="timeline-title"
        className={cn("text-xs font-semibold tracking-tight text-foreground", className)}
        {...props}
      />
    );
  }
);
TimelineTitle.displayName = "TimelineTitle";

export interface TimelineDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  TimelineDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="timeline-description"
      className={cn("text-xs text-muted-foreground mt-1 leading-relaxed", className)}
      {...props}
    />
  );
});
TimelineDescription.displayName = "TimelineDescription";

export interface TimelineTimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {}

const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
  ({ className, ...props }, ref) => {
    return (
      <time
        ref={ref}
        data-slot="timeline-time"
        className={cn("text-[11px] font-mono text-muted-foreground/80 mt-0.5", className)}
        {...props}
      />
    );
  }
);
TimelineTime.displayName = "TimelineTime";

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineDotVariants,
};

