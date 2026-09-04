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
>(({ className, size = "default", ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(tabsListVariants({ size }), className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTab = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-background data-active:text-foreground data-active:shadow-xs cursor-pointer select-none",
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

export { Tabs, TabsList, TabsTab, TabsPanel };
export { tabsListVariants };
