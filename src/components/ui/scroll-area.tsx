import * as React from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Root>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaViewport>{children}</ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </BaseScrollArea.Root>
));
ScrollArea.displayName = "ScrollArea";

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Viewport
    ref={ref}
    className={cn("h-full w-full rounded-[inherit] outline-none", className)}
    {...props}
  />
));
ScrollAreaViewport.displayName = "ScrollAreaViewport";

const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <BaseScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors p-0.5",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
      className
    )}
    {...props}
  />
));
ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar";

const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof BaseScrollArea.Thumb>,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Thumb
    ref={ref}
    className={cn("relative flex-1 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors", className)}
    {...props}
  />
));
ScrollAreaThumb.displayName = "ScrollAreaThumb";

const ScrollAreaCorner = BaseScrollArea.Corner;

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
};
