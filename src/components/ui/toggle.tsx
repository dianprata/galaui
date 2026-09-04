import * as React from "react";
import { Toggle as BaseToggle } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-150 hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-pressed:bg-primary data-pressed:text-primary-foreground data-pressed:shadow-xs select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline: "border border-border bg-transparent hover:bg-muted text-foreground data-pressed:border-primary data-pressed:bg-primary data-pressed:text-primary-foreground",
      },
      size: {
        default: "h-8 px-3 gap-1.5",
        sm: "h-7 px-2.5 text-xs gap-1",
        lg: "h-9 px-3.5 text-sm gap-2",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof BaseToggle>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <BaseToggle
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
