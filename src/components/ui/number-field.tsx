import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NumberField = BaseNumberField.Root;
const NumberFieldScrubArea = BaseNumberField.ScrubArea;
const NumberFieldScrubAreaCursor = BaseNumberField.ScrubAreaCursor;

const NumberFieldGroup = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Group>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>
>(({ className, ...props }, ref) => (
  <BaseNumberField.Group
    ref={ref}
    className={cn(
      "relative flex h-8 w-full items-center rounded-lg border border-border bg-background shadow-2xs transition-all duration-150 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      className
    )}
    {...props}
  />
));
NumberFieldGroup.displayName = "NumberFieldGroup";

const NumberFieldInput = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Input>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>
>(({ className, ...props }, ref) => (
  <BaseNumberField.Input
    ref={ref}
    className={cn(
      "w-full bg-transparent px-3 py-1 text-xs text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
NumberFieldInput.displayName = "NumberFieldInput";

const NumberFieldStepper = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col border-l border-border divide-y divide-border h-full", className)}
    {...props}
  >
    {children}
  </div>
);
NumberFieldStepper.displayName = "NumberFieldStepper";

const NumberFieldIncrement = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Increment>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>
>(({ className, ...props }, ref) => (
  <BaseNumberField.Increment
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-center px-1.5 text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer select-none",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-2.5 w-2.5" />
  </BaseNumberField.Increment>
));
NumberFieldIncrement.displayName = "NumberFieldIncrement";

const NumberFieldDecrement = React.forwardRef<
  React.ElementRef<typeof BaseNumberField.Decrement>,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>
>(({ className, ...props }, ref) => (
  <BaseNumberField.Decrement
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-center px-1.5 text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer select-none",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-2.5 w-2.5" />
  </BaseNumberField.Decrement>
));
NumberFieldDecrement.displayName = "NumberFieldDecrement";

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldStepper,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};
