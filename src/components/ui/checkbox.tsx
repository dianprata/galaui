import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof BaseCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>
>(({ className, ...props }, ref) => (
  <BaseCheckbox.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-md border border-zinc-300 dark:border-zinc-700 bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground flex items-center justify-center cursor-pointer transition-all duration-150 ease-out active:scale-90",
      className
    )}
    {...props}
  >
    <BaseCheckbox.Indicator className="flex items-center justify-center text-current transition-all duration-150 ease-out data-unchecked:scale-0 data-unchecked:opacity-0 data-checked:scale-100 data-checked:opacity-100">
      <Check weight="bold" className="h-3 w-3" />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
