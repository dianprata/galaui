import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Collapsible = BaseCollapsible.Root;

const CollapsibleTrigger = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger>
>(({ render, children, className, ...props }, ref) => {
  if (render) {
    return <BaseCollapsible.Trigger ref={ref} render={render} className={className} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BaseCollapsible.Trigger ref={ref} render={children} className={className} {...props} />;
  }
  return (
    <BaseCollapsible.Trigger
      ref={ref}
      className={cn(
        "group flex w-full items-center justify-between font-medium transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </BaseCollapsible.Trigger>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsiblePanel = React.forwardRef<
  React.ElementRef<typeof BaseCollapsible.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>
>(({ className, ...props }, ref) => (
  <BaseCollapsible.Panel
    ref={ref}
    className={cn(
      "h-[var(--collapsible-panel-height)] overflow-hidden text-xs transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0 [&[hidden]:not([hidden='until-found'])]:hidden",
      className
    )}
    {...props}
  />
));
CollapsiblePanel.displayName = "CollapsiblePanel";

export { Collapsible, CollapsibleTrigger, CollapsiblePanel };
