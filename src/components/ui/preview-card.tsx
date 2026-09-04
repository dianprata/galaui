import * as React from "react";
import { PreviewCard as BasePreview } from "@base-ui/react";
import { cn } from "@/lib/utils";

const PreviewCard = BasePreview.Root;
const PreviewCardTrigger = BasePreview.Trigger;
const PreviewCardPortal = BasePreview.Portal;

const PreviewCardPositioner = React.forwardRef<
  React.ElementRef<typeof BasePreview.Positioner>,
  React.ComponentPropsWithoutRef<typeof BasePreview.Positioner>
>(({ className, ...props }, ref) => (
  <BasePreview.Positioner
    ref={ref}
    sideOffset={8}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
));
PreviewCardPositioner.displayName = "PreviewCardPositioner";

const PreviewCardPopup = React.forwardRef<
  React.ElementRef<typeof BasePreview.Popup>,
  React.ComponentPropsWithoutRef<typeof BasePreview.Popup> & {
    sideOffset?: number;
    align?: "start" | "center" | "end";
  }
>(({ className, sideOffset = 8, align = "center", children, ...props }, ref) => (
  <BasePreview.Portal>
    <BasePreview.Positioner sideOffset={sideOffset} align={align} className="z-50 outline-none">
      <BasePreview.Popup
        ref={ref}
        className={cn(
          "z-50 w-72 rounded-2xl border border-border bg-card p-4 text-foreground shadow-xl transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </BasePreview.Popup>
    </BasePreview.Positioner>
  </BasePreview.Portal>
));
PreviewCardPopup.displayName = "PreviewCardPopup";

const PreviewCardArrow = BasePreview.Arrow;

export {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
};
