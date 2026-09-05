import * as React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const AlertDialog = BaseAlertDialog.Root;
const AlertDialogPortal = BaseAlertDialog.Portal;

const AlertDialogTrigger = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Trigger>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BaseAlertDialog.Trigger ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BaseAlertDialog.Trigger ref={ref} render={children} {...props} />;
  }
  return <BaseAlertDialog.Trigger ref={ref} {...props}>{children}</BaseAlertDialog.Trigger>;
});
AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogClose = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>
>(({ render, children, ...props }, ref) => {
  if (render) {
    return <BaseAlertDialog.Close ref={ref} render={render} {...props} />;
  }
  if (React.isValidElement(children)) {
    return <BaseAlertDialog.Close ref={ref} render={children} {...props} />;
  }
  return <BaseAlertDialog.Close ref={ref} {...props}>{children}</BaseAlertDialog.Close>;
});
AlertDialogClose.displayName = "AlertDialogClose";

const AlertDialogBackdrop = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-200 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0",
      className
    )}
    {...props}
  />
));
AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

const AlertDialogPopup = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <BaseAlertDialog.Popup
        ref={ref}
        className={cn(
          "relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all duration-200 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </div>
  </AlertDialogPortal>
));
AlertDialogPopup.displayName = "AlertDialogPopup";

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-left mb-4", className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-4", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Title
    ref={ref}
    className={cn("text-base font-semibold tracking-tight text-foreground", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Description>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Description
    ref={ref}
    className={cn("text-xs text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Close>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Close
    ref={ref}
    className={cn(buttonVariants({ variant: "destructive", size: "sm" }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof BaseAlertDialog.Close>,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Close
    ref={ref}
    className={cn(buttonVariants({ variant: "outline", size: "sm" }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogAction,
  AlertDialogCancel,
};
