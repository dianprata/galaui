import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

// Auto-discovery helper: extract { [value]: label } from React children
function extractSelectItems(children: React.ReactNode): Record<string, React.ReactNode> {
  const items: Record<string, React.ReactNode> = {};
  function traverse(node: React.ReactNode) {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(traverse);
      return;
    }
    if (React.isValidElement(node)) {
      const props = node.props as { value?: any; children?: React.ReactNode };
      if (props && props.value !== undefined && props.children !== undefined) {
        items[String(props.value)] = props.children;
      }
      if (props && props.children) {
        traverse(props.children);
      }
    }
  }
  traverse(children);
  return items;
}

export interface SelectProps<Value = any, Multiple extends boolean | undefined = false>
  extends BaseSelect.Root.Props<Value, Multiple> {}

function Select<Value = any, Multiple extends boolean | undefined = false>({
  items: itemsProp,
  children,
  ...props
}: SelectProps<Value, Multiple>) {
  const discoveredItems = React.useMemo(() => {
    if (itemsProp) return itemsProp;
    return extractSelectItems(children);
  }, [itemsProp, children]);

  return (
    <BaseSelect.Root items={discoveredItems} {...props}>
      {children}
    </BaseSelect.Root>
  );
}

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-lg border border-border bg-background text-foreground ring-offset-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 cursor-pointer select-none text-left font-normal",
  {
    variants: {
      size: {
        default: "h-8 px-3 text-xs gap-2 rounded-lg",
        xs: "h-6 px-2 text-xs gap-1.5 rounded-md",
        sm: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
        md: "h-8 px-3 text-xs gap-2 rounded-lg",
        lg: "h-9 px-3.5 text-sm gap-2.5 rounded-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Trigger>,
  SelectTriggerProps
>(({ className, size = "default", children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ size }), className)}
    {...props}
  >
    {children}
    <BaseSelect.Icon className="shrink-0 text-muted-foreground transition-transform duration-200 data-[popup-open]:rotate-180">
      <ChevronDown className={cn(size === "xs" ? "h-3 w-3" : size === "sm" ? "h-3.5 w-3.5" : "h-3.5 w-3.5", "opacity-70")} />
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Value>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Value>
>(({ className, ...props }, ref) => (
  <BaseSelect.Value
    ref={ref}
    className={cn(
      "block truncate text-foreground data-[placeholder]:text-muted-foreground",
      className
    )}
    {...props}
  />
));
SelectValue.displayName = "SelectValue";

export interface SelectPopupProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> {
  sideOffset?: number;
  alignItemWithTrigger?: boolean;
  positionerClassName?: string;
}

const SelectPopup = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Popup>,
  SelectPopupProps
>(
  (
    {
      className,
      positionerClassName,
      sideOffset = 4,
      alignItemWithTrigger = false,
      children,
      ...props
    },
    ref
  ) => (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className={cn("z-50 outline-none select-none", positionerClassName)}
      >
        <BaseSelect.Popup
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none transition-[opacity,transform] duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
            className
          )}
          {...props}
        >
          <BaseSelect.List className="outline-none p-1 overflow-y-auto max-h-[var(--available-height)]">
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
);
SelectPopup.displayName = "SelectPopup";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Item>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs outline-none transition-colors data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[selected]:font-semibold data-[selected]:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">
      <BaseSelect.ItemIndicator>
        <Check className="h-3.5 w-3.5" />
      </BaseSelect.ItemIndicator>
    </span>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
));
SelectItem.displayName = "SelectItem";

const SelectGroup = BaseSelect.Group;
const SelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof BaseSelect.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>
>(({ className, ...props }, ref) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cn("px-2 py-1 text-[11px] font-semibold text-muted-foreground", className)}
    {...props}
  />
));
SelectGroupLabel.displayName = "SelectGroupLabel";

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>
>(({ className, ...props }, ref) => (
  <BaseSelect.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

const SelectPortal = BaseSelect.Portal;
const SelectPositioner = BaseSelect.Positioner;
const SelectList = BaseSelect.List;
const SelectIcon = BaseSelect.Icon;
const SelectScrollUpArrow = BaseSelect.ScrollUpArrow;
const SelectScrollDownArrow = BaseSelect.ScrollDownArrow;

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
  SelectPortal,
  SelectPositioner,
  SelectList,
  SelectIcon,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  selectTriggerVariants,
};
