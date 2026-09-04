import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-zinc-200 dark:data-unchecked:bg-zinc-800",
  {
    variants: {
      size: {
        xs: "h-4 w-7",
        sm: "h-5 w-9",
        default: "h-6 w-11",
        md: "h-6 w-11",
        lg: "h-7 w-[52px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-all duration-200 ease-out data-unchecked:translate-x-0",
  {
    variants: {
      size: {
        xs: "h-3 w-3 data-checked:translate-x-3",
        sm: "h-4 w-4 data-checked:translate-x-4",
        default: "h-5 w-5 data-checked:translate-x-5",
        md: "h-5 w-5 data-checked:translate-x-5",
        lg: "h-6 w-6 data-checked:translate-x-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
    VariantProps<typeof switchVariants> {
  thumbClassName?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof BaseSwitch.Root>,
  SwitchProps
>(({ className, thumbClassName, size = "default", ...props }, ref) => (
  <BaseSwitch.Root
    className={cn(switchVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <BaseSwitch.Thumb
      className={cn(switchThumbVariants({ size }), thumbClassName)}
    />
  </BaseSwitch.Root>
));
Switch.displayName = "Switch";

const SwitchRoot = BaseSwitch.Root;
const SwitchThumb = BaseSwitch.Thumb;

export {
  Switch,
  SwitchRoot,
  SwitchThumb,
  switchVariants,
  switchThumbVariants,
};
