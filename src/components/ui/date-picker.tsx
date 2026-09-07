import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverPopup } from "@/components/ui/popover";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Calendar,
  type CalendarProps,
  type DateRange,
  formatDate,
  formatDateRange,
} from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  format?: (date: Date) => string;
  clearable?: boolean;
  disabled?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
  buttonSize?: ButtonProps["size"];
  calendarProps?: Partial<CalendarProps>;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  popoverClassName?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Pick a date",
      format,
      clearable = false,
      disabled = false,
      closeOnSelect = true,
      className,
      buttonVariant = "outline",
      buttonSize = "default",
      calendarProps,
      align = "start",
      sideOffset = 4,
      popoverClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(
      defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const date = isControlled ? controlledValue : uncontrolledValue;

    const handleSelect = (selectedDate: Date | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(selectedDate);
      }
      onChange?.(selectedDate);
      if (closeOnSelect) {
        setOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isControlled) {
        setUncontrolledValue(undefined);
      }
      onChange?.(undefined);
    };

    const displayLabel = React.useMemo(() => {
      if (!date) return placeholder;
      if (format) return format(date);
      return formatDate(date);
    }, [date, format, placeholder]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            ref={ref}
            type="button"
            variant={buttonVariant}
            size={buttonSize}
            disabled={disabled}
            className={cn(
              "w-[220px] justify-start text-left font-normal text-xs h-8 group relative",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 opacity-60 mr-2" />
            <span className="truncate flex-1">{displayLabel}</span>
            {clearable && date && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear date"
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClear(e as any);
                  }
                }}
                className="ml-1 -mr-1.5 h-5 w-5 rounded hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="h-3 w-3" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverPopup
          align={align}
          sideOffset={sideOffset}
          className={cn("w-auto p-0 border-0 shadow-lg bg-transparent", popoverClassName)}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={date}
            {...calendarProps}
          />
        </PopoverPopup>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

export interface DateRangePreset {
  label: string;
  range: DateRange | (() => DateRange);
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  format?: (range: DateRange) => string;
  clearable?: boolean;
  disabled?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
  buttonSize?: ButtonProps["size"];
  calendarProps?: Partial<CalendarProps>;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  popoverClassName?: string;
  numberOfMonths?: number;
  presets?: DateRangePreset[];
}

const defaultPresets: DateRangePreset[] = [
  {
    label: "Today",
    range: () => {
      const today = new Date();
      return { from: today, to: today };
    },
  },
  {
    label: "Yesterday",
    range: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return { from: yesterday, to: yesterday };
    },
  },
  {
    label: "Last 7 days",
    range: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 6);
      return { from, to };
    },
  },
  {
    label: "Last 30 days",
    range: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 29);
      return { from, to };
    },
  },
  {
    label: "This month",
    range: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from, to };
    },
  },
];

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Pick a date range",
      format,
      clearable = false,
      disabled = false,
      closeOnSelect = false,
      className,
      buttonVariant = "outline",
      buttonSize = "default",
      calendarProps,
      align = "start",
      sideOffset = 4,
      popoverClassName,
      numberOfMonths = 2,
      presets,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<DateRange | undefined>(
      defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const range = isControlled ? controlledValue : uncontrolledValue;

    const handleSelect = (selectedRange: DateRange | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(selectedRange);
      }
      onChange?.(selectedRange);
      if (closeOnSelect && selectedRange?.from && selectedRange?.to) {
        setOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isControlled) {
        setUncontrolledValue(undefined);
      }
      onChange?.(undefined);
    };

    const handlePresetClick = (presetRange: DateRange | (() => DateRange)) => {
      const resolved = typeof presetRange === "function" ? presetRange() : presetRange;
      if (!isControlled) {
        setUncontrolledValue(resolved);
      }
      onChange?.(resolved);
      if (closeOnSelect) {
        setOpen(false);
      }
    };

    const displayLabel = React.useMemo(() => {
      if (!range?.from) return placeholder;
      if (format) return format(range);
      return formatDateRange(range);
    }, [range, format, placeholder]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            ref={ref}
            type="button"
            variant={buttonVariant}
            size={buttonSize}
            disabled={disabled}
            className={cn(
              "w-[260px] justify-start text-left font-normal text-xs h-8 group relative",
              !range?.from && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 opacity-60 mr-2" />
            <span className="truncate flex-1">{displayLabel}</span>
            {clearable && range?.from && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear date range"
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClear(e as any);
                  }
                }}
                className="ml-1 -mr-1.5 h-5 w-5 rounded hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="h-3 w-3" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverPopup
          align={align}
          sideOffset={sideOffset}
          className={cn("w-auto p-0 border-0 shadow-lg bg-transparent", popoverClassName)}
        >
          <div className="flex flex-col sm:flex-row bg-background rounded-xl border border-border shadow-sm overflow-hidden">
            {presets && presets.length > 0 && (
              <div className="flex sm:flex-col gap-1 p-3 border-b sm:border-b-0 sm:border-r border-border bg-muted/30 shrink-0 w-full sm:w-36 overflow-x-auto sm:overflow-x-visible">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1 select-none hidden sm:block">
                  Presets
                </span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetClick(p.range)}
                    className="text-xs text-left px-2 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer select-none whitespace-nowrap"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            <div className="p-0">
              <Calendar
                mode="range"
                selected={range}
                onSelect={handleSelect}
                numberOfMonths={numberOfMonths}
                defaultMonth={range?.from}
                className="border-0 shadow-none"
                {...calendarProps}
              />
            </div>
          </div>
        </PopoverPopup>
      </Popover>
    );
  }
);
DateRangePicker.displayName = "DateRangePicker";

export { DatePicker, DateRangePicker, defaultPresets };
