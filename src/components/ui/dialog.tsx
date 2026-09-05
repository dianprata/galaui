import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = BaseDialog.Root;
const DialogPortal = BaseDialog.Portal;

const DialogTrigger = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BaseDialog.Trigger ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BaseDialog.Trigger ref={ref} render={children} {...props} />;
  }
  return <BaseDialog.Trigger ref={ref} {...props}>{children}</BaseDialog.Trigger>;
});
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Close>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BaseDialog.Close ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BaseDialog.Close ref={ref} render={children} {...props} />;
  }
  return <BaseDialog.Close ref={ref} {...props}>{children}</BaseDialog.Close>;
});
DialogClose.displayName = "DialogClose";

const DialogBackdrop = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0",
      className
    )}
    {...props}
  />
));
DialogBackdrop.displayName = "DialogBackdrop";

export interface DialogPopupProps
  extends React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
  showCloseButton?: boolean;
}

const DialogPopup = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Popup>,
  DialogPopupProps
>(({ className, children, showCloseButton = true, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <BaseDialog.Popup
          ref={ref}
          className={cn(
            "relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all duration-200 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-starting-style:translate-y-2 data-ending-style:opacity-0 data-ending-style:scale-95 data-ending-style:translate-y-2",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <BaseDialog.Close className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground opacity-70 hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150 active:scale-90 cursor-pointer">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
      </div>
    </DialogPortal>
  );
});
DialogPopup.displayName = "DialogPopup";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Title>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof BaseDialog.Description>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1.5", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogBackdrop,
  DialogTrigger,
  DialogClose,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
