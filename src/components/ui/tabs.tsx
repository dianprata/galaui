import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const Tabs = BaseTabs.Root;

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        default: "h-8 p-1 text-xs",
        xs: "h-6 p-0.5 text-xs rounded-md",
        sm: "h-7 p-0.5 text-xs rounded-md",
        md: "h-8 p-1 text-xs",
        lg: "h-9 p-1 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabs.List>,
  TabsListProps
>(({ className, size = "default", children, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn("relative isolate", tabsListVariants({ size }), className)}
    {...props}
  >
    <TabsIndicator />
    {children}
  </BaseTabs.List>
));
TabsList.displayName = "TabsList";

const TabsTab = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-colors duration-200 ease-out hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground data-active:text-foreground cursor-pointer select-none",
      className
    )}
    {...props}
  />
));
TabsTab.displayName = "TabsTab";

const TabsPanel = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsPanel.displayName = "TabsPanel";

const TabsIndicator = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Indicator>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator>
>(({ className, style, ...props }, ref) => (
  <BaseTabs.Indicator
    ref={ref}
    className={cn(
      "absolute left-0 top-0 -z-10 rounded-md bg-background shadow-xs transition-[translate,width,height] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
      className
    )}
    style={{
      translate: "var(--active-tab-left) var(--active-tab-top)",
      width: "var(--active-tab-width)",
      height: "var(--active-tab-height)",
      ...style,
    }}
    {...props}
  />
));
TabsIndicator.displayName = "TabsIndicator";

export { Tabs, TabsList, TabsTab, TabsPanel, TabsIndicator };
export { tabsListVariants };
