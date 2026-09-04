import * as React from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ContextMenu = BaseContextMenu.Root;
const ContextMenuTrigger = BaseContextMenu.Trigger;
const ContextMenuPortal = BaseContextMenu.Portal;
const ContextMenuGroup = BaseContextMenu.Group;
const ContextMenuSubmenu = BaseContextMenu.SubmenuRoot;

const ContextMenuPositioner = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.Positioner>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Positioner>
>(({ className, ...props }, ref) => (
  <BaseContextMenu.Positioner
    ref={ref}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
));
ContextMenuPositioner.displayName = "ContextMenuPositioner";

const ContextMenuPopup = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>
>(({ className, ...props }, ref) => (
  <BaseContextMenu.Popup
    ref={ref}
    className={cn(
      "z-50 min-w-[11rem] origin-[var(--transform-origin)] overflow-hidden rounded-xl border border-border bg-card p-1 text-foreground shadow-2xl transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
      className
    )}
    {...props}
  />
));
ContextMenuPopup.displayName = "ContextMenuPopup";

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.Item>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <BaseContextMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors hover:bg-muted focus:bg-muted data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <BaseContextMenu.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-muted focus:bg-muted data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
      <BaseContextMenu.CheckboxItemIndicator>
        <Check className="h-3 w-3" />
      </BaseContextMenu.CheckboxItemIndicator>
    </span>
    {children}
  </BaseContextMenu.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

const ContextMenuRadioGroup = BaseContextMenu.RadioGroup;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.RadioItem>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem>
>(({ className, children, ...props }, ref) => (
  <BaseContextMenu.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors hover:bg-muted focus:bg-muted data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
      <BaseContextMenu.RadioItemIndicator>
        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
      </BaseContextMenu.RadioItemIndicator>
    </span>
    {children}
  </BaseContextMenu.RadioItem>
));
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean;
  }
 >(({ className, inset, children, ...props }, ref) => (
  <div
    ref={ref}
    role="presentation"
    className={cn(
      "px-2.5 py-1 text-[11px] font-semibold text-muted-foreground select-none",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ContextMenuGroupLabel.displayName = "ContextMenuGroupLabel";

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>
>(({ className, ...props }, ref) => (
  <BaseContextMenu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

const ContextMenuSubmenuTrigger = React.forwardRef<
  React.ElementRef<typeof BaseContextMenu.SubmenuTrigger>,
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <BaseContextMenu.SubmenuTrigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors hover:bg-muted focus:bg-muted data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-3.5 w-3.5" />
  </BaseContextMenu.SubmenuTrigger>
));
ContextMenuSubmenuTrigger.displayName = "ContextMenuSubmenuTrigger";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
};
