"use client";

import { Check } from "lucide-react";

const STEPS = [
  { n: 1, label: "Service" },
  { n: 2, label: "Barber" },
  { n: 3, label: "Date" },
  { n: 4, label: "Time" },
  { n: 5, label: "Details" },
  { n: 6, label: "Confirm" },
];

export default function BookingProgress({ current }: { current: number }) {
  return (
    <div>
      {/* Desktop / tablet */}
      <ol className="hidden sm:flex items-center w-full" aria-label="Booking progress">
        {STEPS.map((step, i) => {
          const done = step.n < current;
          const active = step.n === current;
          return (
            <li key={step.n} className="flex-1 flex items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  aria-current={active ? "step" : undefined}
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium border transition-colors ${
                    done
                      ? "bg-ink border-ink text-cream"
                      : active
                        ? "border-ink text-ink"
                        : "border-grey-light text-grey-mid"
                  }`}
                >
                  {done ? <Check size={16} aria-hidden="true" /> : String(step.n).padStart(2, "0")}
                </span>
                <span
                  className={`text-xs uppercase tracking-[0.1em] ${
                    active || done ? "text-ink font-medium" : "text-grey-mid"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={`flex-1 h-px mx-3 mt-[-18px] ${
                    done ? "bg-ink" : "bg-grey-light"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile compact indicator */}
      <div className="sm:hidden flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.1em] text-grey-dark">
          Step {current} of {STEPS.length}
        </span>
        <span className="text-sm font-medium uppercase tracking-[0.08em]">
          {STEPS[current - 1].label}
        </span>
      </div>
      <div className="sm:hidden mt-3 h-1 w-full bg-grey-light" aria-hidden="true">
        <div
          className="h-1 bg-ink transition-all duration-300"
          style={{ width: `${(current / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
