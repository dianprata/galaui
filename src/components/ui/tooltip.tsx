import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const Tooltip = BaseTooltip.Root;
const TooltipPortal = BaseTooltip.Portal;

const TooltipTrigger = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BaseTooltip.Trigger ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BaseTooltip.Trigger ref={ref} render={children} {...props} />;
  }
  return <BaseTooltip.Trigger ref={ref} {...props}>{children}</BaseTooltip.Trigger>;
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipPopup = React.forwardRef<
  React.ElementRef<typeof BaseTooltip.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & {
    sideOffset?: number;
  }
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <BaseTooltip.Portal>
    <BaseTooltip.Positioner sideOffset={sideOffset}>
      <BaseTooltip.Popup
        ref={ref}
        className={cn(
          "z-50 origin-[var(--transform-origin)] overflow-hidden rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-zinc-50 shadow-md transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 dark:bg-zinc-100 dark:text-zinc-900",
          className
        )}
        {...props}
      >
        {children}
      </BaseTooltip.Popup>
    </BaseTooltip.Positioner>
  </BaseTooltip.Portal>
));
TooltipPopup.displayName = "TooltipPopup";

export { Tooltip, TooltipTrigger, TooltipPopup, TooltipProvider, TooltipPortal };
