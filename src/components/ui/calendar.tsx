import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type DateRange,
  type CalendarMode,
  type DateDisabledMatcher,
  useCalendar,
  isSameDay,
  isBeforeDay,
  isAfterDay,
  isDayBetween,
  addMonths,
  isDateDisabled,
  getMonthGridDays,
  formatDate,
  formatDateRange,
} from "@/lib/date";
import { cn } from "@/lib/utils";

export type { DateRange, CalendarMode, DateDisabledMatcher };
export { formatDate, formatDateRange };

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  mode?: CalendarMode;
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

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      mode = "single",
      selected,
      onSelect,
      month,
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
    const {
      today,
      activeMonth,
      handleMonthChange,
      hoveredDate,
      setHoveredDate,
      weekdayNames,
      canGoPrev,
      canGoNext,
      handleDayClick,
    } = useCalendar({
      mode,
      selected,
      onSelect,
      month,
      defaultMonth,
      onMonthChange,
      numberOfMonths,
      minDate,
      maxDate,
      disabled,
      weekStartsOn,
      locale,
    });

    const range = mode === "range" ? (selected as DateRange) : undefined;

    const renderMonthGrid = (monthOffset: number) => {
      const targetMonth = addMonths(activeMonth, monthOffset);
      const days = getMonthGridDays(targetMonth, { weekStartsOn, fixedWeeks });
      const monthTitle = new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(targetMonth);

      return (
        <div key={monthOffset} className="space-y-3">
          {/* Month navigation header */}
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

            <div className="text-sm font-semibold text-foreground tracking-tight select-none">
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

          {/* Month Calendar Table Grid */}
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
                            "w-8 h-8 p-0 relative flex items-center justify-center text-center text-sm focus-within:z-20",
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
