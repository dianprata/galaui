import * as React from "react";
import { NavigationMenu as BaseNav } from "@base-ui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof BaseNav.Root>,
  React.ComponentPropsWithoutRef<typeof BaseNav.Root>
>(({ className, ...props }, ref) => (
  <BaseNav.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  />
));
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof BaseNav.List>,
  React.ComponentPropsWithoutRef<typeof BaseNav.List>
>(({ className, ...props }, ref) => (
  <BaseNav.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = BaseNav.Item;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof BaseNav.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseNav.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseNav.Trigger
    ref={ref}
    className={cn(
      "group inline-flex h-8 w-max items-center justify-center rounded-lg bg-background px-3 py-1 text-xs font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted cursor-pointer select-none",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-popup-open:rotate-180"
      aria-hidden="true"
    />
  </BaseNav.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuPositioner = React.forwardRef<
  React.ElementRef<typeof BaseNav.Positioner>,
  React.ComponentPropsWithoutRef<typeof BaseNav.Positioner>
>(
  (
    {
      className,
      sideOffset = 10,
      side = "bottom",
      align = "center",
      collisionPadding = { top: 8, bottom: 8, left: 16, right: 16 },
      collisionAvoidance = { side: "none" },
      ...props
    },
    ref
  ) => {
    return (
      <BaseNav.Positioner
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        collisionAvoidance={collisionAvoidance}
        className={cn("z-50 outline-none", className)}
        {...props}
      />
    );
  }
);
NavigationMenuPositioner.displayName = "NavigationMenuPositioner";

const NavigationMenuPopup = React.forwardRef<
  React.ElementRef<typeof BaseNav.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseNav.Popup>
>(({ className, ...props }, ref) => (
  <BaseNav.Popup
    ref={ref}
    className={cn(
      "rounded-2xl border border-border bg-card p-4 text-foreground shadow-2xl transition-all duration-200 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 origin-[var(--transform-origin)] data-[side=top]:origin-bottom data-[side=bottom]:origin-top",
      className
    )}
    {...props}
  />
));
NavigationMenuPopup.displayName = "NavigationMenuPopup";

const NavigationMenuLink = BaseNav.Link;
const NavigationMenuPortal = BaseNav.Portal;
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof BaseNav.Content>,
  React.ComponentPropsWithoutRef<typeof BaseNav.Content>
>(({ className, ...props }, ref) => (
  <BaseNav.Content
    ref={ref}
    className={cn("w-full md:w-auto p-4", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

export interface NavigationMenuViewportProps
  extends React.ComponentPropsWithoutRef<typeof BaseNav.Viewport> {
  sideOffset?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  collisionBoundary?: any;
  collisionPadding?: number | { top?: number; bottom?: number; left?: number; right?: number };
  collisionAvoidance?: any;
}

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof BaseNav.Viewport>,
  NavigationMenuViewportProps
>(
  (
    {
      className,
      sideOffset = 10,
      align = "center",
      side = "bottom",
      collisionPadding = { top: 8, bottom: 8, left: 16, right: 16 },
      collisionAvoidance = { side: "none" },
      ...props
    },
    ref
  ) => {
    return (
      <BaseNav.Portal>
        <BaseNav.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          collisionPadding={collisionPadding}
          collisionAvoidance={collisionAvoidance}
          className="z-50 outline-none"
        >
          <BaseNav.Popup className="rounded-2xl border border-border bg-card p-4 text-foreground shadow-2xl transition-all duration-200 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 origin-[var(--transform-origin)] data-[side=top]:origin-bottom data-[side=bottom]:origin-top">
            <BaseNav.Viewport ref={ref} className={cn("relative w-full overflow-hidden", className)} {...props} />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    );
  }
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuViewport,
  NavigationMenuContent,
};
