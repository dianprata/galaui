import * as React from "react";
import { RadioGroup as BaseRadioGroup, Radio as BaseRadio } from "@base-ui/react";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof BaseRadioGroup>,
  React.ComponentPropsWithoutRef<typeof BaseRadioGroup>
>(({ className, ...props }, ref) => {
  return (
    <BaseRadioGroup
      className={cn("grid gap-2.5", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof BaseRadio.Root>,
  React.ComponentPropsWithoutRef<typeof BaseRadio.Root>
>(({ className, ...props }, ref) => {
  return (
    <BaseRadio.Root
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-background text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary flex items-center justify-center cursor-pointer transition-all duration-150 ease-out active:scale-90",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator className="flex items-center justify-center transition-all duration-150 ease-out data-unchecked:scale-0 data-unchecked:opacity-0 data-checked:scale-100 data-checked:opacity-100">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
