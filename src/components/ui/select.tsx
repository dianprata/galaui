import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
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
  "flex w-full items-center justify-between rounded-lg border border-border bg-background text-foreground ring-offset-background transition-all duration-150 ease-out active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 cursor-pointer select-none text-left font-normal",
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
    data-slot="select-trigger"
    className={cn(selectTriggerVariants({ size }), className)}
    {...props}
  >
    {children}
    <BaseSelect.Icon
      className="shrink-0 text-muted-foreground transition-transform duration-200 data-[popup-open]:rotate-180 pointer-events-none"
      render={
        <ChevronDown className={cn(size === "xs" ? "h-3 w-3" : size === "sm" ? "h-3.5 w-3.5" : "h-3.5 w-3.5", "opacity-70 pointer-events-none")} />
      }
    />
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
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>,
      "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    > {
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
      side = "bottom",
      sideOffset = 4,
      align = "center",
      alignOffset = 0,
      alignItemWithTrigger = true,
      children,
      ...props
    },
    ref
  ) => (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className={cn("isolate z-50 outline-none select-none", positionerClassName)}
      >
        <BaseSelect.Popup
          ref={ref}
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-[var(--available-height)] w-[calc(var(--anchor-width)+2px)] min-w-36 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none duration-100 data-[align-trigger=true]:animate-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <BaseSelect.List className="outline-none p-1">
            {children}
          </BaseSelect.List>
          <SelectScrollDownButton />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
);
SelectPopup.displayName = "SelectPopup";
const SelectContent = SelectPopup;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Item>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-default select-none items-center gap-2 rounded-lg py-1.5 pr-8 pl-2.5 text-xs outline-none transition-colors duration-100 focus:bg-muted focus:text-foreground data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[selected]:font-semibold data-[selected]:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <BaseSelect.ItemText className="flex flex-1 gap-2 shrink-0 truncate whitespace-nowrap">
      {children}
    </BaseSelect.ItemText>
    <BaseSelect.ItemIndicator
      render={
        <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center text-primary">
          <Check className="h-3.5 w-3.5 pointer-events-none" />
        </span>
      }
    />
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
    data-slot="select-label"
    className={cn("px-2.5 py-1 text-[11px] font-semibold text-muted-foreground", className)}
    {...props}
  />
));
SelectGroupLabel.displayName = "SelectGroupLabel";
const SelectLabel = SelectGroupLabel;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof BaseSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>
>(({ className, ...props }, ref) => (
  <BaseSelect.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("-mx-1 my-1 h-px bg-border pointer-events-none", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof BaseSelect.ScrollUpArrow>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollUpArrow
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 text-muted-foreground top-0 w-full", className)}
    {...props}
  >
    <ChevronUp className="h-3.5 w-3.5" />
  </BaseSelect.ScrollUpArrow>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof BaseSelect.ScrollDownArrow>,
  React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>
>(({ className, ...props }, ref) => (
  <BaseSelect.ScrollDownArrow
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 text-muted-foreground bottom-0 w-full", className)}
    {...props}
  >
    <ChevronDown className="h-3.5 w-3.5" />
  </BaseSelect.ScrollDownArrow>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

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
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectPortal,
  SelectPositioner,
  SelectList,
  SelectIcon,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  selectTriggerVariants,
};
