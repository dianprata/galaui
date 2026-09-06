import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ComboboxPortal = BaseCombobox.Portal;
const ComboboxPositioner = BaseCombobox.Positioner;
const ComboboxList = BaseCombobox.List;
const ComboboxGroup = BaseCombobox.Group;
const ComboboxCollection = BaseCombobox.Collection;
const ComboboxRow = BaseCombobox.Row;
const ComboboxValue = BaseCombobox.Value;
const useComboboxFilter = BaseCombobox.useFilter;

export interface ComboboxProps<Value, Multiple extends boolean | undefined = false>
  extends BaseCombobox.Root.Props<Value, Multiple> {}

function defaultItemToStringLabel(itemValue: any, items?: readonly any[]): string {
  if (itemValue == null) return "";
  if (typeof itemValue === "object" && itemValue !== null && "label" in itemValue) {
    return String(itemValue.label);
  }
  if (Array.isArray(items)) {
    const match = items.find((item) => {
      if (typeof item === "object" && item !== null) {
        return item.value === itemValue || item.id === itemValue || item.key === itemValue;
      }
      return item === itemValue;
    });
    if (match && typeof match === "object" && match !== null && "label" in match) {
      return String(match.label);
    }
  }
  return String(itemValue);
}

function Combobox<Value, Multiple extends boolean | undefined = false>({
  items,
  itemToStringLabel,
  autoHighlight = true,
  ...props
}: ComboboxProps<Value, Multiple>) {
  const resolvedItemToStringLabel = React.useCallback(
    (val: any) => {
      if (itemToStringLabel) return itemToStringLabel(val);
      return defaultItemToStringLabel(val, items);
    },
    [itemToStringLabel, items]
  );

  return (
    <BaseCombobox.Root
      items={items}
      itemToStringLabel={resolvedItemToStringLabel}
      autoHighlight={autoHighlight}
      {...(props as any)}
    />
  );
}

const ComboboxInputGroup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.InputGroup>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.InputGroup>
>(({ className, ...props }, ref) => (
  <BaseCombobox.InputGroup
    ref={ref}
    data-slot="combobox-input-group"
    className={cn(
      "relative flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground transition-all duration-150 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ComboboxInputGroup.displayName = "ComboboxInputGroup";

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Input>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Input>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Input
    ref={ref}
    data-slot="combobox-input"
    className={cn(
      "min-w-28 flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none border-none p-0 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
));
ComboboxInput.displayName = "ComboboxInput";

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseCombobox.Trigger
    ref={ref}
    data-slot="combobox-trigger"
    className={cn(
      "inline-flex shrink-0 items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer select-none transition-colors ml-auto self-center",
      className
    )}
    {...props}
  >
    {children || <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
  </BaseCombobox.Trigger>
));
ComboboxTrigger.displayName = "ComboboxTrigger";

const ComboboxClear = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Clear>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Clear>
>(({ className, children, ...props }, ref) => (
  <BaseCombobox.Clear
    ref={ref}
    data-slot="combobox-clear"
    className={cn(
      "inline-flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer select-none transition-colors p-0.5 rounded-xs",
      className
    )}
    {...props}
  >
    {children || <X className="h-3 w-3 opacity-60 hover:opacity-100" />}
  </BaseCombobox.Clear>
));
ComboboxClear.displayName = "ComboboxClear";

export interface ComboboxPopupProps
  extends React.ComponentPropsWithoutRef<typeof BaseCombobox.Popup>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {
  positionerClassName?: string;
}

const ComboboxPopup = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Popup>,
  ComboboxPopupProps
>(
  (
    {
      className,
      positionerClassName,
      side = "bottom",
      sideOffset = 4,
      align = "start",
      alignOffset = 0,
      children,
      ...props
    },
    ref
  ) => (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn("isolate z-50 outline-none select-none", positionerClassName)}
      >
        <BaseCombobox.Popup
          ref={ref}
          data-slot="combobox-popup"
          className={cn(
            "relative isolate z-50 max-h-[var(--available-height,320px)] w-[var(--anchor-width)] min-w-44 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none duration-100 p-1 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
);
ComboboxPopup.displayName = "ComboboxPopup";

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Item>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Item
    ref={ref}
    data-slot="combobox-item"
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-1.5 px-2.5 text-xs text-foreground outline-none transition-colors duration-100 data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[selected]:font-medium data-[selected]:text-primary data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ComboboxItem.displayName = "ComboboxItem";

const ComboboxItemIndicator = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.ItemIndicator>
>(({ className, children, ...props }, ref) => (
  <BaseCombobox.ItemIndicator
    ref={ref}
    data-slot="combobox-item-indicator"
    className={cn("inline-flex items-center justify-center shrink-0 ml-2 text-primary", className)}
    {...props}
  >
    {children || <Check className="h-3.5 w-3.5" />}
  </BaseCombobox.ItemIndicator>
));
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Empty>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Empty>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Empty
    ref={ref}
    data-slot="combobox-empty"
    className={cn("empty:hidden py-4 text-center text-xs text-muted-foreground", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "ComboboxEmpty";

const ComboboxGroupLabel = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>
>(({ className, ...props }, ref) => (
  <BaseCombobox.GroupLabel
    ref={ref}
    data-slot="combobox-group-label"
    className={cn("px-2.5 py-1 text-[11px] font-semibold text-muted-foreground", className)}
    {...props}
  />
));
ComboboxGroupLabel.displayName = "ComboboxGroupLabel";

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Separator>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Separator>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Separator
    ref={ref}
    data-slot="combobox-separator"
    className={cn("-mx-1 my-1 h-px bg-border pointer-events-none", className)}
    {...props}
  />
));
ComboboxSeparator.displayName = "ComboboxSeparator";

const ComboboxChips = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Chips>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Chips>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Chips
    ref={ref}
    data-slot="combobox-chips"
    className={cn("contents", className)}
    {...props}
  />
));
ComboboxChips.displayName = "ComboboxChips";

const ComboboxChip = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.Chip>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.Chip>
>(({ className, ...props }, ref) => (
  <BaseCombobox.Chip
    ref={ref}
    data-slot="combobox-chip"
    className={cn(
      "inline-flex items-center gap-1 rounded-md bg-secondary px-1 py-0.5 text-[11px] font-medium text-secondary-foreground border border-border/50 select-none shrink-0",
      className
    )}
    {...props}
  />
));
ComboboxChip.displayName = "ComboboxChip";

const ComboboxChipRemove = React.forwardRef<
  React.ElementRef<typeof BaseCombobox.ChipRemove>,
  React.ComponentPropsWithoutRef<typeof BaseCombobox.ChipRemove>
>(({ className, children, ...props }, ref) => (
  <BaseCombobox.ChipRemove
    ref={ref}
    data-slot="combobox-chip-remove"
    className={cn(
      "rounded-sm hover:bg-muted-foreground/20 p-0.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors",
      className
    )}
    {...props}
  >
    {children || <X className="h-3 w-3" />}
  </BaseCombobox.ChipRemove>
));
ComboboxChipRemove.displayName = "ComboboxChipRemove";

export {
  Combobox,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxRow,
  ComboboxValue,
  ComboboxCollection,
  useComboboxFilter,
};
