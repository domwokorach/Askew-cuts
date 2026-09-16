"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { formatTimeLabel, getDaySlots } from "@/lib/hours";
import { getBookedTimesForDate } from "@/lib/bookingStore";

export default function TimeSlotGrid({
  dateKey,
  selected,
  onSelect,
}: {
  dateKey: string;
  selected: string | null;
  onSelect: (time: string) => void;
}) {
  const booked = useMemo(() => getBookedTimesForDate(dateKey), [dateKey]);
  const slots = getDaySlots();

  return (
    <div>
      <ul className="flex items-center gap-4 text-xs text-grey-dark mb-4" aria-hidden="true">
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 border border-grey-light" /> Available
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 bg-ink" /> Selected
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-3 bg-grey-light" /> Unavailable
        </li>
      </ul>

      <div
        role="radiogroup"
        aria-label="Choose an appointment time"
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3"
      >
        {slots.map((time) => {
          const isBooked = booked.has(time);
          const isSelected = selected === time;
          return (
            <motion.button
              key={time}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isBooked}
              onClick={() => onSelect(time)}
              whileTap={isBooked ? undefined : { scale: 0.95 }}
              aria-label={`${formatTimeLabel(time)}${isBooked ? ", unavailable" : ""}`}
              className={`min-h-[44px] px-2 py-2.5 text-sm border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                isBooked
                  ? "border-grey-light bg-grey-light/40 text-grey-mid line-through cursor-not-allowed"
                  : isSelected
                    ? "bg-ink border-ink text-cream font-medium"
                    : "border-grey-light text-ink hover:border-ink"
              }`}
            >
              {formatTimeLabel(time)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
