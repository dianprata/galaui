import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export type CalendarMode = "single" | "range" | "multiple";

export type DateDisabledMatcher =
  | ((date: Date) => boolean)
  | Date[]
  | { before?: Date; after?: Date };

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  mode?: "single" | "range" | "multiple";
  selected?: Date | DateRange | Date[];
  onSelect?: (value: any) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  numberOfMonths?: number;
  minDate?: Date;
  maxDate?: Date;
  disabled?: DateDisabledMatcher;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday
  locale?: string;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
}

/* Internal helper functions */
function isSameDay(d1?: Date, d2?: Date): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isBeforeDay(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 < t2;
}

function isAfterDay(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 > t2;
}

function isDayBetween(d: Date, start: Date, end: Date): boolean {
  return isAfterDay(d, start) && isBeforeDay(d, end);
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function addMonths(date: Date, count: number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + count);
  return d;
}

function isDateDisabled(
  date: Date,
  disabled?: DateDisabledMatcher,
  minDate?: Date,
  maxDate?: Date
): boolean {
  if (minDate && isBeforeDay(date, minDate)) return true;
  if (maxDate && isAfterDay(date, maxDate)) return true;
  if (!disabled) return false;

  if (typeof disabled === "function") {
    return disabled(date);
  }
  if (Array.isArray(disabled)) {
    return disabled.some((d) => isSameDay(d, date));
  }
  if (typeof disabled === "object") {
    if (disabled.before && isBeforeDay(date, disabled.before)) return true;
    if (disabled.after && isAfterDay(date, disabled.after)) return true;
  }
  return false;
}

export function formatDate(
  date?: Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
  locale = "en-US"
): string {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDateRange(
  range?: DateRange,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
  locale = "en-US"
): string {
  if (!range?.from) return "";
  if (!range.to) return formatDate(range.from, options, locale);
  return `${formatDate(range.from, options, locale)} – ${formatDate(range.to, options, locale)}`;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      mode = "single",
      selected,
      onSelect,
      month: controlledMonth,
      defaultMonth,
      onMonthChange,
      numberOfMonths = 1,
      minDate,
      maxDate,
      disabled,
      weekStartsOn = 0,
      locale = "en-US",
      showOutsideDays = true,
      fixedWeeks = true,
      ...props
    },
    ref
  ) => {
    const today = React.useMemo(() => new Date(), []);

    const initialMonth = React.useMemo(() => {
      if (controlledMonth) return controlledMonth;
      if (defaultMonth) return defaultMonth;
      if (selected) {
        if (selected instanceof Date) return selected;
        if (Array.isArray(selected) && selected[0] instanceof Date) return selected[0];
        if ("from" in selected && selected.from instanceof Date) return selected.from;
      }
      return today;
    }, [controlledMonth, defaultMonth, selected, today]);

    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
    );

    const activeMonth = controlledMonth || currentMonth;

    const handleMonthChange = React.useCallback(
      (nextMonth: Date) => {
        if (!controlledMonth) {
          setCurrentMonth(nextMonth);
        }
        onMonthChange?.(nextMonth);
      },
      [controlledMonth, onMonthChange]
    );

    const [hoveredDate, setHoveredDate] = React.useState<Date | undefined>(undefined);

    const weekdayNames = React.useMemo(() => {
      const names: string[] = [];
      for (let i = 0; i < 7; i++) {
        const dayIndex = (i + weekStartsOn) % 7;
        const date = new Date(2023, 0, 1 + dayIndex);
        names.push(
          new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(date)
        );
      }
      return names;
    }, [locale, weekStartsOn]);

    const canGoPrev = React.useMemo(() => {
      if (!minDate) return true;
      const prevMonthEnd = new Date(activeMonth.getFullYear(), activeMonth.getMonth(), 0);
      return !isBeforeDay(prevMonthEnd, minDate);
    }, [activeMonth, minDate]);

    const canGoNext = React.useMemo(() => {
      if (!maxDate) return true;
      const nextMonthStart = new Date(
        activeMonth.getFullYear(),
        activeMonth.getMonth() + numberOfMonths,
        1
      );
      return !isAfterDay(nextMonthStart, maxDate);
    }, [activeMonth, maxDate, numberOfMonths]);

    const handleDayClick = (date: Date) => {
      if (isDateDisabled(date, disabled, minDate, maxDate)) return;

      if (mode === "single") {
        const isCurrent = selected instanceof Date && isSameDay(selected, date);
        onSelect?.(isCurrent ? undefined : date);
      } else if (mode === "range") {
        const currentRange = (selected as DateRange) || {};
        if (!currentRange.from || (currentRange.from && currentRange.to)) {
          onSelect?.({ from: date, to: undefined });
        } else if (currentRange.from && !currentRange.to) {
          if (isBeforeDay(date, currentRange.from)) {
            onSelect?.({ from: date, to: currentRange.from });
          } else {
            onSelect?.({ from: currentRange.from, to: date });
          }
        }
      } else if (mode === "multiple") {
        const currentDates = Array.isArray(selected) ? [...selected] : [];
        const existingIndex = currentDates.findIndex((d) => isSameDay(d, date));
        if (existingIndex > -1) {
          currentDates.splice(existingIndex, 1);
        } else {
          currentDates.push(date);
        }
        onSelect?.(currentDates);
      }
    };

    const renderMonthGrid = (monthOffset: number) => {
      const targetMonth = addMonths(activeMonth, monthOffset);
      const year = targetMonth.getFullYear();
      const month = targetMonth.getMonth();
      const totalDays = getDaysInMonth(year, month);
      const firstDay = new Date(year, month, 1);

      let startDayOfWeek = firstDay.getDay() - weekStartsOn;
      if (startDayOfWeek < 0) startDayOfWeek += 7;

      const days: { date: Date; isOutside: boolean }[] = [];

      const prevDaysTotal = getDaysInMonth(year, month - 1);
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, prevDaysTotal - i),
          isOutside: true,
        });
      }

      for (let i = 1; i <= totalDays; i++) {
        days.push({
          date: new Date(year, month, i),
          isOutside: false,
        });
      }

      const totalSlots = fixedWeeks ? 42 : Math.ceil(days.length / 7) * 7;
      let nextCounter = 1;
      while (days.length < totalSlots) {
        days.push({
          date: new Date(year, month + 1, nextCounter++),
          isOutside: true,
        });
      }

      const monthTitle = new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(targetMonth);

      const range = mode === "range" ? (selected as DateRange) : undefined;

      return (
        <div key={monthOffset} className="space-y-3">
          <div className="flex items-center justify-between px-1 h-7">
            {monthOffset === 0 ? (
              <button
                type="button"
                aria-label="Previous month"
                disabled={!canGoPrev}
                onClick={() => handleMonthChange(addMonths(activeMonth, -1))}
                className="h-7 w-7 rounded-md border border-border bg-background p-0 hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center cursor-pointer transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            ) : (
              <div className="w-7" />
            )}

            <div className="text-xs font-semibold text-foreground tracking-tight select-none">
              {monthTitle}
            </div>

            {monthOffset === numberOfMonths - 1 ? (
              <button
                type="button"
                aria-label="Next month"
                disabled={!canGoNext}
                onClick={() => handleMonthChange(addMonths(activeMonth, 1))}
                className="h-7 w-7 rounded-md border border-border bg-background p-0 hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center justify-center cursor-pointer transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="w-7" />
            )}
          </div>

          <table className="w-full border-collapse" role="grid">
            <thead>
              <tr className="flex">
                {weekdayNames.map((name, i) => (
                  <th
                    key={i}
                    scope="col"
                    aria-label={name}
                    className="w-8 h-6 text-[0.75rem] font-medium text-muted-foreground text-center select-none flex items-center justify-center"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="flex flex-col gap-1 mt-1">
              {Array.from({ length: days.length / 7 }).map((_, rowIndex) => {
                const rowDays = days.slice(rowIndex * 7, rowIndex * 7 + 7);
                return (
                  <tr key={rowIndex} className="flex w-full">
                    {rowDays.map(({ date, isOutside }, colIndex) => {
                      if (isOutside && !showOutsideDays) {
                        return <td key={colIndex} className="w-8 h-8 p-0" />;
                      }

                      const isDisabled = isDateDisabled(
                        date,
                        disabled,
                        minDate,
                        maxDate
                      );
                      const isCurrentDay = isSameDay(date, today);

                      let isSelected = false;
                      let isRangeStart = false;
                      let isRangeEnd = false;
                      let isRangeMiddle = false;

                      if (mode === "single" && selected instanceof Date) {
                        isSelected = isSameDay(date, selected);
                      } else if (mode === "multiple" && Array.isArray(selected)) {
                        isSelected = selected.some((d) => isSameDay(d, date));
                      } else if (mode === "range" && range) {
                        const { from, to } = range;

                        isRangeStart = Boolean(from && isSameDay(date, from));
                        isRangeEnd = Boolean(to && isSameDay(date, to));
                        isSelected = isRangeStart || isRangeEnd;

                        if (from && to) {
                          isRangeMiddle = isDayBetween(date, from, to);
                        } else if (from && !to && hoveredDate) {
                          if (isAfterDay(hoveredDate, from)) {
                            isRangeMiddle = isDayBetween(date, from, hoveredDate);
                            if (isSameDay(date, hoveredDate)) isRangeEnd = true;
                          } else if (isBeforeDay(hoveredDate, from)) {
                            isRangeMiddle = isDayBetween(date, hoveredDate, from);
                            if (isSameDay(date, hoveredDate)) isRangeStart = true;
                          }
                        }
                      }

                      return (
                        <td
                          key={colIndex}
                          className={cn(
                            "w-8 h-8 p-0 relative flex items-center justify-center text-center text-xs focus-within:z-20",
                            isRangeMiddle && "bg-primary/10",
                            isRangeStart && range?.to && "rounded-l-lg bg-primary/10",
                            isRangeEnd && range?.from && "rounded-r-lg bg-primary/10"
                          )}
                        >
                          <button
                            type="button"
                            disabled={isDisabled}
                            onClick={() => handleDayClick(date)}
                            onMouseEnter={() => mode === "range" && setHoveredDate(date)}
                            onMouseLeave={() => mode === "range" && setHoveredDate(undefined)}
                            aria-selected={isSelected || isRangeMiddle}
                            aria-disabled={isDisabled}
                            aria-current={isCurrentDay ? "date" : undefined}
                            className={cn(
                              "h-8 w-8 rounded-lg p-0 font-normal transition-all duration-100 ease-out flex items-center justify-center cursor-pointer outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                              isOutside &&
                                "text-muted-foreground/35 hover:text-muted-foreground",
                              !isOutside && "text-foreground hover:bg-muted",
                              isCurrentDay &&
                                !isSelected &&
                                "font-semibold text-primary underline underline-offset-4 decoration-primary/40",
                              isRangeMiddle &&
                                "rounded-none bg-transparent text-primary font-medium hover:bg-primary/20",
                              (isRangeStart || isRangeEnd) &&
                                "bg-primary text-primary-foreground font-medium shadow-xs hover:bg-primary/90 hover:text-primary-foreground",
                              isSelected &&
                                mode !== "range" &&
                                "bg-primary text-primary-foreground font-medium shadow-xs hover:bg-primary/90 hover:text-primary-foreground",
                              isDisabled &&
                                "text-muted-foreground/30 opacity-40 cursor-not-allowed hover:bg-transparent pointer-events-none"
                            )}
                          >
                            {date.getDate()}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-3.5 bg-background text-foreground rounded-xl border border-border inline-block select-none shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {Array.from({ length: numberOfMonths }).map((_, i) => renderMonthGrid(i))}
        </div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };

