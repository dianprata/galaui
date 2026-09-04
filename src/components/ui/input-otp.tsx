import * as React from "react";
import { OTPField as BaseOTPField } from "@base-ui/react";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof BaseOTPField.Root>,
  React.ComponentPropsWithoutRef<typeof BaseOTPField.Root>
>(({ className, ...props }, ref) => (
  <BaseOTPField.Root
    ref={ref}
    className={cn("flex items-center gap-2 select-none", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<typeof BaseOTPField.Input>,
  React.ComponentPropsWithoutRef<typeof BaseOTPField.Input>
>(({ className, ...props }, ref) => (
  <BaseOTPField.Input
    ref={ref}
    className={cn(
      "relative flex h-10 w-9 items-center justify-center rounded-lg border border-border bg-background text-center text-sm font-semibold text-foreground shadow-2xs transition-all duration-150 focus:z-10 focus:border-ring focus:ring-2 focus:ring-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-focused:ring-2 data-focused:ring-ring data-focused:border-ring",
      className
    )}
    {...props}
  />
));
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("text-muted-foreground flex items-center justify-center", className)}
    {...props}
  >
    <Minus className="h-4 w-4" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPSlot, InputOTPSeparator };
