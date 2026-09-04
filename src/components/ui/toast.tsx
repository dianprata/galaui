import * as React from "react";
import { Toast as BaseToast } from "@base-ui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = BaseToast.Provider;
const ToastPortal = BaseToast.Portal;
const useToastManager = BaseToast.useToastManager;
const createToastManager = BaseToast.createToastManager;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof BaseToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>
>(({ className, ...props }, ref) => (
  <BaseToast.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col-reverse gap-2 p-2 pointer-events-none sm:bottom-6 sm:right-6",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef<
  React.ElementRef<typeof BaseToast.Root>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Root>
>(({ className, children, ...props }, ref) => (
  <BaseToast.Root
    ref={ref}
    className={cn(
      "pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-xl transition-all duration-200 ease-out data-starting-style:opacity-0 data-starting-style:translate-y-3 data-ending-style:opacity-0 data-ending-style:translate-y-2",
      className
    )}
    {...props}
  >
    <div className="flex-1 space-y-1">{children}</div>
    <BaseToast.Close className="rounded-lg p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer">
      <X className="h-3.5 w-3.5" />
      <span className="sr-only">Close</span>
    </BaseToast.Close>
  </BaseToast.Root>
));
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof BaseToast.Title>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Title>
>(({ className, ...props }, ref) => (
  <BaseToast.Title
    ref={ref}
    className={cn("text-xs font-semibold text-foreground tracking-tight", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof BaseToast.Description>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Description>
>(({ className, ...props }, ref) => (
  <BaseToast.Description
    ref={ref}
    className={cn("text-xs text-muted-foreground leading-normal", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

const ToastAction = React.forwardRef<
  React.ElementRef<typeof BaseToast.Action>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Action>
>(({ className, ...props }, ref) => (
  <BaseToast.Action
    ref={ref}
    className={cn(
      "inline-flex h-7 items-center justify-center rounded-md border border-border bg-transparent px-2.5 text-xs font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer select-none",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

const ToastClose = BaseToast.Close;

export {
  ToastProvider,
  ToastViewport,
  ToastPortal,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  useToastManager,
  createToastManager,
};
