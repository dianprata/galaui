import * as React from "react";
import { Progress as BaseProgress } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Root>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Root>
>(({ className, children, ...props }, ref) => (
  <BaseProgress.Root
    ref={ref}
    className={cn("flex w-full flex-col gap-1.5", className)}
    {...props}
  >
    {children || (
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    )}
  </BaseProgress.Root>
));
Progress.displayName = "Progress";

const ProgressTrack = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Track>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Track>
>(({ className, ...props }, ref) => (
  <BaseProgress.Track
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted/80",
      className
    )}
    {...props}
  />
));
ProgressTrack.displayName = "ProgressTrack";

const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Indicator>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator>
>(({ className, ...props }, ref) => (
  <BaseProgress.Indicator
    ref={ref}
    className={cn(
      "h-full w-full flex-1 bg-primary transition-all duration-300 ease-out data-indeterminate:animate-pulse",
      className
    )}
    {...props}
  />
));
ProgressIndicator.displayName = "ProgressIndicator";

const ProgressLabel = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Label>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Label>
>(({ className, ...props }, ref) => (
  <BaseProgress.Label
    ref={ref}
    className={cn("text-xs font-medium text-foreground", className)}
    {...props}
  />
));
ProgressLabel.displayName = "ProgressLabel";

const ProgressValue = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Value>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Value>
>(({ className, ...props }, ref) => (
  <BaseProgress.Value
    ref={ref}
    className={cn("text-xs text-muted-foreground font-mono", className)}
    {...props}
  />
));
ProgressValue.displayName = "ProgressValue";

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
