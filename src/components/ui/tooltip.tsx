import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const Tooltip = BaseTooltip.Root;
const TooltipPortal = BaseTooltip.Portal;

const TooltipPositioner = React.forwardRef<
  React.ElementRef<typeof BaseTooltip.Positioner>,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>
>(({ className, ...props }, ref) => (
  <BaseTooltip.Positioner
    ref={ref}
    className={cn("z-[70] outline-none", className)}
    {...props}
  />
));
TooltipPositioner.displayName = "TooltipPositioner";

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof BaseTooltip.Arrow>,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Arrow>
>(({ className, ...props }, ref) => (
  <BaseTooltip.Arrow
    ref={ref}
    className={cn(
      "data-[side=bottom]:top-[-8px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-8px] data-[side=left]:right-[-8px]",
      className
    )}
    {...props}
  />
));
TooltipArrow.displayName = "TooltipArrow";

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
    <BaseTooltip.Positioner sideOffset={sideOffset} className="z-[70] outline-none">
      <BaseTooltip.Popup
        ref={ref}
        className={cn(
          "z-[70] origin-[var(--transform-origin)] overflow-hidden rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-zinc-50 shadow-md transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 dark:bg-zinc-100 dark:text-zinc-900",
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

export { Tooltip, TooltipTrigger, TooltipPopup, TooltipProvider, TooltipPortal, TooltipPositioner, TooltipArrow };
