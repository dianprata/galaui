import * as React from "react";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react";
import { cn } from "@/lib/utils";

const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>
>(({ className, ...props }, ref) => (
  <BaseCheckboxGroup
    ref={ref}
    className={cn("flex flex-col gap-2.5", className)}
    {...props}
  />
));
CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
