import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Popover = BasePopover.Root;
const PopoverPortal = BasePopover.Portal;
const PopoverTitle = BasePopover.Title;
const PopoverDescription = BasePopover.Description;

const PopoverTrigger = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BasePopover.Trigger ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BasePopover.Trigger ref={ref} render={children} {...props} />;
  }
  return <BasePopover.Trigger ref={ref} {...props}>{children}</BasePopover.Trigger>;
});
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverClose = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BasePopover.Close>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BasePopover.Close ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BasePopover.Close ref={ref} render={children} {...props} />;
  }
  return <BasePopover.Close ref={ref} {...props}>{children}</BasePopover.Close>;
});
PopoverClose.displayName = "PopoverClose";

const PopoverPositioner = React.forwardRef<
  React.ElementRef<typeof BasePopover.Positioner>,
  React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>
>(({ className, ...props }, ref) => (
  <BasePopover.Positioner
    ref={ref}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
));
PopoverPositioner.displayName = "PopoverPositioner";

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

export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
};
