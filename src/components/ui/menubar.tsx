import * as React from "react";
import { Menubar as BaseMenubar, Menu as BaseMenu } from "@base-ui/react";
import { cn } from "@/lib/utils";

const Menubar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenubar>
>(({ className, ...props }, ref) => (
  <BaseMenubar
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-xl border border-border bg-card p-1 shadow-2xs",
      className
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

const MenubarMenu = BaseMenu.Root;
const MenubarGroup = BaseMenu.Group;
const MenubarPortal = BaseMenu.Portal;
const MenubarSubmenu = BaseMenu.SubmenuRoot;
const MenubarRadioGroup = BaseMenu.RadioGroup;

const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>
>(({ className, ...props }, ref) => (
  <BaseMenu.Trigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1 text-xs font-medium text-foreground outline-none hover:bg-muted focus:bg-muted data-pressed:bg-muted",
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarPositioner = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Positioner>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>
>(({ className, ...props }, ref) => (
  <BaseMenu.Positioner
    ref={ref}
    sideOffset={4}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
));
MenubarPositioner.displayName = "MenubarPositioner";

const MenubarPopup = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup> & {
    sideOffset?: number;
    align?: "start" | "center" | "end";
  }
>(({ className, sideOffset = 4, align = "start", children, ...props }, ref) => (
  <BaseMenu.Portal>
    <BaseMenu.Positioner sideOffset={sideOffset} align={align} className="z-50 outline-none">
      <BaseMenu.Popup
        ref={ref}
        className={cn(
          "z-50 min-w-[9rem] overflow-hidden rounded-xl border border-border bg-card p-1 text-foreground shadow-xl transition-all duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
          className
        )}
        {...props}
      >
        {children}
      </BaseMenu.Popup>
    </BaseMenu.Positioner>
  </BaseMenu.Portal>
));
MenubarPopup.displayName = "MenubarPopup";

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Item>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors hover:bg-muted focus:bg-muted data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = "MenubarItem";

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof BaseMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>
>(({ className, ...props }, ref) => (
  <BaseMenu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarPortal,
  MenubarPositioner,
  MenubarPopup,
  MenubarItem,
  MenubarSeparator,
  MenubarGroup,
  MenubarSubmenu,
  MenubarRadioGroup,
};
