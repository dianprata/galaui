import * as React from "react";
import { Field as BaseField, Fieldset as BaseFieldset } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Field = BaseField.Root;

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof BaseField.Label>,
  React.ComponentPropsWithoutRef<typeof BaseField.Label>
>(({ className, ...props }, ref) => (
  <BaseField.Label
    ref={ref}
    className={cn(
      "text-xs font-medium leading-none text-foreground select-none cursor-pointer data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";

const FieldControl = React.forwardRef<
  React.ElementRef<typeof BaseField.Control>,
  React.ComponentPropsWithoutRef<typeof BaseField.Control>
>(({ className, ...props }, ref) => (
  <BaseField.Control
    ref={ref}
    className={cn(
      "flex h-8 w-full rounded-lg border border-border bg-background px-3 py-1 text-xs text-foreground placeholder:text-muted-foreground transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-destructive",
      className
    )}
    {...props}
  />
));
FieldControl.displayName = "FieldControl";

const FieldDescription = React.forwardRef<
  React.ElementRef<typeof BaseField.Description>,
  React.ComponentPropsWithoutRef<typeof BaseField.Description>
>(({ className, ...props }, ref) => (
  <BaseField.Description
    ref={ref}
    className={cn("text-[11px] text-muted-foreground", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<
  React.ElementRef<typeof BaseField.Error>,
  React.ComponentPropsWithoutRef<typeof BaseField.Error>
>(({ className, ...props }, ref) => (
  <BaseField.Error
    ref={ref}
    className={cn("text-[11px] font-medium text-destructive", className)}
    {...props}
  />
));
FieldError.displayName = "FieldError";

const FieldValidity = BaseField.Validity;
const Fieldset = BaseFieldset.Root;

const FieldsetLegend = React.forwardRef<
  React.ElementRef<typeof BaseFieldset.Legend>,
  React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>
>(({ className, ...props }, ref) => (
  <BaseFieldset.Legend
    ref={ref}
    className={cn(
      "text-sm font-semibold tracking-tight text-foreground border-b border-border pb-1.5 mb-3 w-full",
      className
    )}
    {...props}
  />
));
FieldsetLegend.displayName = "FieldsetLegend";

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldValidity,
  Fieldset,
  FieldsetLegend,
};
