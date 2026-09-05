import * as React from "react";
import { Drawer as BaseDrawer } from "@base-ui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Drawer = BaseDrawer.Root;
const DrawerTrigger = BaseDrawer.Trigger;
const DrawerPortal = BaseDrawer.Portal;
const DrawerClose = BaseDrawer.Close;
const DrawerHandle = BaseDrawer.Handle;

const DrawerBackdrop = React.forwardRef<
  React.ElementRef<typeof BaseDrawer.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDrawer.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0",
      className
    )}
    {...props}
  />
));
DrawerBackdrop.displayName = "DrawerBackdrop";

export interface DrawerPopupProps
  extends React.ComponentPropsWithoutRef<typeof BaseDrawer.Popup> {
  side?: "bottom" | "right" | "left" | "top";
  showCloseButton?: boolean;
}

const DrawerPopup = React.forwardRef<
  React.ElementRef<typeof BaseDrawer.Popup>,
  DrawerPopupProps
>(({ className, children, side = "bottom", showCloseButton = true, ...props }, ref) => {
  const sideStyles = {
    bottom:
      "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:translate-y-full data-ending-style:translate-y-full",
    right:
      "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col rounded-l-2xl border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:translate-x-full data-ending-style:translate-x-full",
    left:
      "fixed inset-y-0 left-0 z-50 flex h-full w-full max-w-sm flex-col rounded-r-2xl border-r border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
    top:
      "fixed inset-x-0 top-0 z-50 flex max-h-[85vh] flex-col rounded-b-2xl border-b border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
  };

  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <BaseDrawer.Popup
        ref={ref}
        className={cn(sideStyles[side], className)}
        {...props}
      >
        {side === "bottom" && (
          <div className="mx-auto -mt-2 mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" />
        )}
        {children}
        {showCloseButton && (
          <BaseDrawer.Close className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground opacity-70 hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150 cursor-pointer">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </BaseDrawer.Close>
        )}
      </BaseDrawer.Popup>
    </DrawerPortal>
  );
});
DrawerPopup.displayName = "DrawerPopup";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1 text-left mb-4", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof BaseDrawer.Title>,
  React.ComponentPropsWithoutRef<typeof BaseDrawer.Title>
>(({ className, ...props }, ref) => (
  <BaseDrawer.Title
    ref={ref}
    className={cn("text-base font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof BaseDrawer.Description>,
  React.ComponentPropsWithoutRef<typeof BaseDrawer.Description>
>(({ className, ...props }, ref) => (
  <BaseDrawer.Description
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerHandle,
  DrawerBackdrop,
  DrawerPopup,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
