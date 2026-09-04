import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-3 text-xs leading-relaxed transition-all duration-150 flex items-start gap-3 select-none",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground shadow-xs",
        info: "border-info-500/20 bg-info-500/10 text-info-600 dark:text-info-400 [&>svg]:text-info-600 dark:[&>svg]:text-info-400",
        success: "border-success-500/20 bg-success-500/10 text-success-600 dark:text-success-400 [&>svg]:text-success-600 dark:[&>svg]:text-success-400",
        warning: "border-warning-500/20 bg-warning-500/10 text-warning-600 dark:text-warning-400 [&>svg]:text-warning-600 dark:[&>svg]:text-warning-400",
        destructive: "border-destructive-500/25 bg-destructive-500/10 text-destructive-600 dark:text-destructive-400 [&>svg]:text-destructive-600 dark:[&>svg]:text-destructive-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-medium tracking-tight text-foreground", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs opacity-90 text-muted-foreground", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
