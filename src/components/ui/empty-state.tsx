import * as React from "react";
import { cn } from "@/lib/utils";

const EmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-[16rem] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center animate-in fade-in-50",
      className
    )}
    {...props}
  />
));
EmptyState.displayName = "EmptyState";

const EmptyStateIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3 [&>svg]:h-6 [&>svg]:w-6",
      className
    )}
    {...props}
  />
);
EmptyStateIcon.displayName = "EmptyStateIcon";

const EmptyStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-sm font-semibold tracking-tight text-foreground mb-1", className)}
    {...props}
  />
));
EmptyStateTitle.displayName = "EmptyStateTitle";

const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground max-w-sm mb-4 leading-relaxed", className)}
    {...props}
  />
));
EmptyStateDescription.displayName = "EmptyStateDescription";

const EmptyStateActions = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2", className)} {...props} />
);
EmptyStateActions.displayName = "EmptyStateActions";

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
};
