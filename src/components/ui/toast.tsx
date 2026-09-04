import * as React from "react";
import { Toast as BaseToast } from "@base-ui/react";
import { X, CheckCircle, Warning, XCircle, Info } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const defaultToastManager = BaseToast.createToastManager();

const ToastProvider = ({
  toastManager = defaultToastManager,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseToast.Provider>) => (
  <BaseToast.Provider toastManager={toastManager} {...props} />
);

const ToastPortal = BaseToast.Portal;
const useToastManager = BaseToast.useToastManager;
const createToastManager = BaseToast.createToastManager;

const Toast = React.forwardRef<
  React.ElementRef<typeof BaseToast.Root>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Root> & {
    toast?: any;
    variant?: "default" | "success" | "destructive" | "warning" | "info";
    stacked?: boolean;
  }
>(({ className, variant = "default", stacked = true, children, toast, ...props }, ref) => {
  const safeToast = toast || { id: "preview", positionerProps: {} };
  const stackedClasses =
    "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.08)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-ending-style:opacity-0 data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-limited:opacity-0 data-starting-style:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)] data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] h-[var(--height)] data-expanded:h-[var(--toast-height)] [transition:transform_0.4s_cubic-bezier(0.22,1,0.36,1),opacity_0.4s,height_0.15s]";

  const nonStackedClasses =
    "relative flex w-full transition-all duration-200 ease-out data-starting-style:opacity-0 data-starting-style:translate-y-3 data-ending-style:opacity-0 data-ending-style:translate-y-2";

  return (
    <BaseToast.Root
      ref={ref}
      toast={safeToast}
      className={cn(
        "pointer-events-auto overflow-hidden rounded-xl border shadow-2xl select-none transition-colors duration-150",
        stacked ? stackedClasses : nonStackedClasses,
        variant === "default" && "border-border bg-card text-card-foreground dark:bg-zinc-900",
        variant === "destructive" && "border-destructive-500/30 bg-red-50 text-destructive-700 dark:border-destructive-500/40 dark:bg-red-950 dark:text-red-200",
        variant === "success" && "border-success-500/30 bg-emerald-50 text-emerald-950 dark:border-success-500/40 dark:bg-emerald-950 dark:text-emerald-200",
        variant === "warning" && "border-warning-500/30 bg-amber-50 text-amber-950 dark:border-warning-500/40 dark:bg-amber-950 dark:text-amber-200",
        variant === "info" && "border-info-500/30 bg-sky-50 text-sky-950 dark:border-info-500/40 dark:bg-sky-950 dark:text-sky-200",
        className
      )}
      {...props}
    >
      <BaseToast.Content className="flex items-start justify-between gap-3 p-4 w-full overflow-hidden transition-opacity duration-200 data-behind:opacity-40 data-expanded:opacity-100">
        <div className="flex-1 space-y-1">{children}</div>
        <BaseToast.Close className="rounded-lg p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer shrink-0">
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Close</span>
        </BaseToast.Close>
      </BaseToast.Content>
    </BaseToast.Root>
  );
});
Toast.displayName = "Toast";

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof BaseToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Viewport> & {
    stacked?: boolean;
  }
>(({ className, children, stacked = true, ...props }, ref) => {
  let toasts: any[] = [];
  try {
    const toastManager = useToastManager();
    toasts = toastManager?.toasts || [];
  } catch {
    toasts = [];
  }

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        ref={ref}
        className={cn(
          stacked
            ? "fixed right-4 bottom-4 z-50 mx-auto w-[calc(100vw-2rem)] sm:right-6 sm:bottom-6 sm:w-96 pointer-events-none"
            : "fixed right-4 bottom-4 z-50 flex max-h-screen w-full max-w-sm flex-col-reverse gap-2 p-2 pointer-events-none sm:right-6 sm:bottom-6",
          className
        )}
        {...props}
      >
        {children}
        {toasts.map((t) => {
          const v = (t.type || (t as any).data?.variant || "default") as
            | "default"
            | "success"
            | "destructive"
            | "warning"
            | "info";

          return (
            <Toast key={t.id} toast={t} variant={v} stacked={stacked}>
              <div className="flex items-start gap-2.5 w-full">
                {v === "success" && (
                  <CheckCircle
                    weight="bold"
                    className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                  />
                )}
                {v === "warning" && (
                  <Warning
                    weight="bold"
                    className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                  />
                )}
                {v === "destructive" && (
                  <XCircle
                    weight="bold"
                    className="w-4 h-4 text-destructive-500 shrink-0 mt-0.5"
                  />
                )}
                {v === "info" && (
                  <Info
                    weight="bold"
                    className="w-4 h-4 text-sky-500 shrink-0 mt-0.5"
                  />
                )}
                <div className="flex-1 space-y-1">
                  {t.title && <ToastTitle>{t.title}</ToastTitle>}
                  {t.description && (
                    <ToastDescription>{t.description}</ToastDescription>
                  )}
                </div>
              </div>
            </Toast>
          );
        })}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
});
ToastViewport.displayName = "ToastViewport";

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
const ToastPositioner = BaseToast.Positioner;
const ToastContent = BaseToast.Content;
const ToastArrow = BaseToast.Arrow;

export const toast = {
  add: (options: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    type?: "default" | "success" | "destructive" | "warning" | "info";
    timeout?: number;
  }) => defaultToastManager.add(options),
  show: (title: string, description?: string) =>
    defaultToastManager.add({ title, description }),
  success: (title: string, description?: string) =>
    defaultToastManager.add({ title, description, type: "success" }),
  error: (title: string, description?: string) =>
    defaultToastManager.add({ title, description, type: "destructive" }),
  warning: (title: string, description?: string) =>
    defaultToastManager.add({ title, description, type: "warning" }),
  info: (title: string, description?: string) =>
    defaultToastManager.add({ title, description, type: "info" }),
  close: (id?: string) => defaultToastManager.close(id),
};

export {
  ToastProvider,
  ToastViewport,
  ToastPortal,
  ToastPositioner,
  ToastContent,
  ToastArrow,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  useToastManager,
  createToastManager,
  defaultToastManager,
};
