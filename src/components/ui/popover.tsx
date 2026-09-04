import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Popover = BasePopover.Root;
const PopoverPortal = BasePopover.Portal;
const PopoverTrigger = BasePopover.Trigger;
const PopoverClose = BasePopover.Close;

const PopoverPopup = React.forwardRef<
  React.ElementRef<typeof BasePopover.Popup>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & {
    sideOffset?: number;
    align?: "start" | "center" | "end";
  }
>(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => (
  <BasePopover.Portal>
    <BasePopover.Positioner sideOffset={sideOffset} align={align}>
      <BasePopover.Popup
        ref={ref}
        className={cn(
          "z-50 w-72 origin-[var(--transform-origin)] rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </BasePopover.Popup>
    </BasePopover.Positioner>
  </BasePopover.Portal>
));
PopoverPopup.displayName = "PopoverPopup";

export { Popover, PopoverTrigger, PopoverPortal, PopoverPopup, PopoverClose };
