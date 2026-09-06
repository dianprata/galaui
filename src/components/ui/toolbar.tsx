import * as React from "react";
import { Toolbar as BaseToolbar } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toolbarButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
        outline: "border border-border bg-transparent hover:bg-muted text-foreground",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        ghost: "hover:bg-muted text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "h-8 px-2.5 text-xs rounded-lg gap-1.5",
        sm: "h-7 px-2 text-xs rounded-md gap-1",
        icon: "h-8 w-8 p-0 rounded-lg",
        "icon-sm": "h-7 w-7 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toolbar = React.forwardRef<
  React.ElementRef<typeof BaseToolbar.Root>,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <BaseToolbar.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      "inline-flex items-center gap-1 rounded-xl border border-border bg-background p-1 text-foreground shadow-xs",
      orientation === "vertical" && "flex-col items-stretch",
      className
    )}
    {...props}
  />
));
Toolbar.displayName = "Toolbar";

const ToolbarGroup = React.forwardRef<
  React.ElementRef<typeof BaseToolbar.Group>,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>
>(({ className, ...props }, ref) => (
  <BaseToolbar.Group
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
ToolbarGroup.displayName = "ToolbarGroup";

export interface ToolbarButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseToolbar.Button>,
    VariantProps<typeof toolbarButtonVariants> {}

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof BaseToolbar.Button>,
  ToolbarButtonProps
>(({ className, variant, size, ...props }, ref) => (
  <BaseToolbar.Button
    ref={ref}
    className={cn(toolbarButtonVariants({ variant, size }), className)}
    {...props}
  />
));
ToolbarButton.displayName = "ToolbarButton";

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof BaseToolbar.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>
>(({ className, ...props }, ref) => (
  <BaseToolbar.Separator
    ref={ref}
    className={cn(
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px my-auto mx-1",
      className
    )}
    {...props}
  />
));
ToolbarSeparator.displayName = "ToolbarSeparator";

const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof BaseToolbar.Link>,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Link>
>(({ className, ...props }, ref) => (
  <BaseToolbar.Link
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center text-xs font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline px-2 py-1 transition-colors",
      className
    )}
    {...props}
  />
));
ToolbarLink.displayName = "ToolbarLink";

const ToolbarInput = React.forwardRef<
  React.ElementRef<typeof BaseToolbar.Input>,
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Input>
>(({ className, ...props }, ref) => (
  <BaseToolbar.Input
    ref={ref}
    className={cn(
      "flex h-7 w-36 rounded-md border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ToolbarInput.displayName = "ToolbarInput";

export {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarInput,
  toolbarButtonVariants,
};
