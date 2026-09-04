import * as React from "react";
import { Meter as BaseMeter } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Meter = React.forwardRef<
  React.ElementRef<typeof BaseMeter.Root>,
  React.ComponentPropsWithoutRef<typeof BaseMeter.Root>
>(({ className, children, ...props }, ref) => (
  <BaseMeter.Root
    ref={ref}
    className={cn("flex w-full flex-col gap-1.5", className)}
    {...props}
  >
    {children || (
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    )}
  </BaseMeter.Root>
));
Meter.displayName = "Meter";

const MeterTrack = React.forwardRef<
  React.ElementRef<typeof BaseMeter.Track>,
  React.ComponentPropsWithoutRef<typeof BaseMeter.Track>
>(({ className, ...props }, ref) => (
  <BaseMeter.Track
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted/80",
      className
    )}
    {...props}
  />
));
MeterTrack.displayName = "MeterTrack";

const MeterIndicator = React.forwardRef<
  React.ElementRef<typeof BaseMeter.Indicator>,
  React.ComponentPropsWithoutRef<typeof BaseMeter.Indicator>
>(({ className, ...props }, ref) => (
  <BaseMeter.Indicator
    ref={ref}
    className={cn(
      "h-full bg-primary transition-all duration-300 ease-out",
      className
    )}
    {...props}
  />
));
MeterIndicator.displayName = "MeterIndicator";

const MeterLabel = React.forwardRef<
  React.ElementRef<typeof BaseMeter.Label>,
  React.ComponentPropsWithoutRef<typeof BaseMeter.Label>
>(({ className, ...props }, ref) => (
  <BaseMeter.Label
    ref={ref}
    className={cn("text-xs font-medium text-foreground", className)}
    {...props}
  />
));
MeterLabel.displayName = "MeterLabel";

const MeterValue = React.forwardRef<
  React.ElementRef<typeof BaseMeter.Value>,
  React.ComponentPropsWithoutRef<typeof BaseMeter.Value>
>(({ className, ...props }, ref) => (
  <BaseMeter.Value
    ref={ref}
    className={cn("text-xs text-muted-foreground font-mono", className)}
    {...props}
  />
));
MeterValue.displayName = "MeterValue";

export { Meter, MeterTrack, MeterIndicator, MeterLabel, MeterValue };
