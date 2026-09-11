import * as React from "react";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export type CalendarMode = "single" | "range" | "multiple";

export type DateDisabledMatcher =
  | ((date: Date) => boolean)
  | Date[]
  | { before?: Date; after?: Date };

export interface CalendarDay {
  date: Date;
  isOutside: boolean;
}

/**
 * Check if two dates represent the exact same calendar day (ignoring time).
 */
export function isSameDay(d1?: Date, d2?: Date): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Check if d1 is strictly before d2 by day.
 */
export function isBeforeDay(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 < t2;
}

/**
 * Check if d1 is strictly after d2 by day.
 */
export function isAfterDay(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 > t2;
}

/**
 * Check if date d falls strictly between start and end.
 */
export function isDayBetween(d: Date, start: Date, end: Date): boolean {
  return isAfterDay(d, start) && isBeforeDay(d, end);
}

/**
 * Get total days in a given year and month (0-indexed month).
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Add or subtract months from a given date.
 */
export function addMonths(date: Date, count: number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + count);
  return d;
}

/**
 * Determine if a date is disabled based on minDate, maxDate, and disabled matcher.
 */
export function isDateDisabled(
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

/**
 * Format a date into a localized string using native Intl.DateTimeFormat.
 */
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

/**
 * Format a DateRange into a readable localized range string.
 */
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

/**
 * Generate localized narrow weekday labels (e.g. S, M, T, W, T, F, S)
 * based on weekStartsOn (0 = Sunday, 1 = Monday).
 */
export function getWeekdayLabels(locale = "en-US", weekStartsOn = 0): string[] {
  const names: string[] = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (i + weekStartsOn) % 7;
    const date = new Date(2023, 0, 1 + dayIndex); // Jan 1, 2023 was Sunday
    names.push(new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(date));
  }
  return names;
}

/**
 * Build the complete day grid matrix for a given target month,
 * including preceding and trailing days for outside month filling.
 */
export function getMonthGridDays(
  targetMonth: Date,
  options: { weekStartsOn?: number; fixedWeeks?: boolean } = {}
): CalendarDay[] {
  const { weekStartsOn = 0, fixedWeeks = true } = options;
  const year = targetMonth.getFullYear();
  const month = targetMonth.getMonth();
  const totalDays = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1);

  let startDayOfWeek = firstDay.getDay() - weekStartsOn;
  if (startDayOfWeek < 0) startDayOfWeek += 7;

  const days: CalendarDay[] = [];

  // Trailing days from previous month
  const prevDaysTotal = getDaysInMonth(year, month - 1);
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevDaysTotal - i),
      isOutside: true,
    });
  }

  // Days of the active month
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      date: new Date(year, month, i),
      isOutside: false,
    });
  }

  // Leading days of next month to complete rows / fixed 6-week slots
  const totalSlots = fixedWeeks ? 42 : Math.ceil(days.length / 7) * 7;
  let nextCounter = 1;
  while (days.length < totalSlots) {
    days.push({
      date: new Date(year, month + 1, nextCounter++),
      isOutside: true,
    });
  }

  return days;
}

export interface UseCalendarOptions {
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
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: string;
}

/**
 * Custom hook encapsulating state, boundary checks, and selection logic for Calendar.
 */
export function useCalendar({
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
}: UseCalendarOptions) {
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

  const weekdayNames = React.useMemo(
    () => getWeekdayLabels(locale, weekStartsOn),
    [locale, weekStartsOn]
  );

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

    if (
      date.getMonth() !== activeMonth.getMonth() ||
      date.getFullYear() !== activeMonth.getFullYear()
    ) {
      handleMonthChange(new Date(date.getFullYear(), date.getMonth(), 1));
    }

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

  return {
    today,
    activeMonth,
    handleMonthChange,
    hoveredDate,
    setHoveredDate,
    weekdayNames,
    canGoPrev,
    canGoNext,
    handleDayClick,
  };
}
