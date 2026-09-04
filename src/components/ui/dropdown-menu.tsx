import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = BaseMenu.Root;
const DropdownMenuGroup = BaseMenu.Group;
const DropdownMenuPortal = BaseMenu.Portal;
const DropdownMenuTrigger = BaseMenu.Trigger;

const DropdownMenuPopup = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup> & {
    sideOffset?: number;
    align?: "start" | "center" | "end";
  }
>(({ className, sideOffset = 4, align = "start", ...props }, ref) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner sideOffset={sideOffset} align={align}>
      <BaseMenu.Popup
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] origin-[var(--transform-origin)] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
          className
        )}
        {...props}
      />
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
DropdownMenuPopup.displayName = "DropdownMenuPopup";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Item>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none transition-all duration-100 ease-out focus:bg-muted focus:text-foreground active:scale-[0.98] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>
>(({ className, ...props }, ref) => (
  <BaseMenu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPopup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
};
