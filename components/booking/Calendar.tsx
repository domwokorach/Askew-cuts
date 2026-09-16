"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isPastDate, toDateKey } from "@/lib/hours";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_LABEL = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });

const MAX_MONTHS_AHEAD = 3;

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function Calendar({
  selected,
  onSelect,
  isDateUnavailable,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
  /** Extra predicate (beyond past dates) for days with no qualifying barber availability. */
  isDateUnavailable?: (date: Date) => boolean;
}) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + MAX_MONTHS_AHEAD, 1);

  const canGoPrev = cursor > minMonth;
  const canGoNext = cursor < maxMonth;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => canGoPrev && setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="h-11 w-11 inline-flex items-center justify-center border border-grey-light disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink transition-colors"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <p className="font-heading uppercase tracking-tight text-lg font-semibold">
          {MONTH_LABEL.format(cursor)}
        </p>
        <button
          type="button"
          onClick={() => canGoNext && setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          disabled={!canGoNext}
          aria-label="Next month"
          className="h-11 w-11 inline-flex items-center justify-center border border-grey-light disabled:opacity-30 disabled:cursor-not-allowed hover:border-ink transition-colors"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-xs uppercase tracking-[0.08em] text-grey-mid py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const disabled = isPastDate(date, today) || (isDateUnavailable?.(date) ?? false);
          const isSelected = selected && toDateKey(selected) === toDateKey(date);
          const isToday = toDateKey(date) === toDateKey(today);

          return (
            <button
              key={toDateKey(date)}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              aria-current={isToday ? "date" : undefined}
              aria-pressed={!!isSelected}
              aria-label={date.toDateString() + (disabled ? ", unavailable" : "")}
              className={`aspect-square min-h-[40px] sm:min-h-[44px] flex items-center justify-center text-sm border transition-colors ${
                isSelected
                  ? "bg-ink border-ink text-cream font-medium"
                  : disabled
                    ? "border-transparent text-grey-light cursor-not-allowed line-through"
                    : "border-transparent text-ink hover:border-ink"
              } ${isToday && !isSelected ? "border-grey-dark" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
