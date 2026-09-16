"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Scissors, Users } from "lucide-react";
import { getStaffForService } from "@/lib/staff";
import { findNextAvailability, formatNextAvailability } from "@/lib/staffAvailability";
import { getService } from "@/lib/services";
import { ANY_BARBER, type BarberChoice, type ServiceSlug } from "@/lib/types";

const SERVICE_LABELS: Record<ServiceSlug, string> = {
  haircut: "Haircut",
  "skin-fade": "Skin Fade",
  "beard-trim": "Beard Trim",
};

export default function StaffSelector({
  service,
  selected,
  onSelect,
}: {
  service: ServiceSlug;
  selected: BarberChoice | null;
  onSelect: (choice: BarberChoice) => void;
}) {
  const serviceName = getService(service)?.name ?? "this service";

  const staffWithAvailability = useMemo(() => {
    return getStaffForService(service)
      .map((staff) => ({ staff, next: findNextAvailability(staff) }))
      .filter((entry): entry is { staff: typeof entry.staff; next: NonNullable<typeof entry.next> } =>
        entry.next !== null
      );
  }, [service]);

  return (
    <div role="radiogroup" aria-label="Choose a barber" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <motion.button
        type="button"
        role="radio"
        aria-checked={selected === ANY_BARBER}
        onClick={() => onSelect(ANY_BARBER)}
        whileTap={{ scale: 0.98 }}
        className={`relative text-left p-6 border transition-colors min-h-[44px] flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
          selected === ANY_BARBER
            ? "border-ink bg-ink text-cream"
            : "border-dashed border-grey-mid hover:border-ink bg-cream text-ink"
        }`}
      >
        {selected === ANY_BARBER && (
          <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-cream text-ink flex items-center justify-center">
            <Check size={14} aria-hidden="true" />
          </span>
        )}
        <span
          className={`h-12 w-12 rounded-full flex items-center justify-center border ${
            selected === ANY_BARBER ? "border-cream/40" : "border-grey-light"
          }`}
        >
          <Users size={20} aria-hidden="true" />
        </span>
        <p className="mt-4 font-heading text-lg font-semibold uppercase tracking-tight">
          No Preference
        </p>
        <p className={`mt-1 text-sm ${selected === ANY_BARBER ? "text-grey-light" : "text-grey-dark"}`}>
          Any Available Barber
        </p>
        <p className={`mt-3 text-sm leading-relaxed ${selected === ANY_BARBER ? "text-grey-light" : "text-grey-dark"}`}>
          Book the earliest available barber for {serviceName.toLowerCase()}.
        </p>
      </motion.button>

      {staffWithAvailability.map(({ staff, next }) => {
        const active = selected === staff.id;
        return (
          <motion.button
            key={staff.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(staff.id)}
            whileTap={{ scale: 0.98 }}
            className={`relative text-left p-6 border transition-colors min-h-[44px] flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
              active ? "border-ink bg-ink text-cream" : "border-grey-light hover:border-grey-dark bg-cream text-ink"
            }`}
          >
            {active && (
              <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-cream text-ink flex items-center justify-center">
                <Check size={14} aria-hidden="true" />
              </span>
            )}

            <span
              className={`h-12 w-12 rounded-full flex items-center justify-center font-heading text-lg font-semibold ${
                active ? "bg-cream text-ink" : "bg-ink text-cream"
              }`}
              aria-hidden="true"
            >
              {staff.initials}
            </span>

            <p className="mt-4 font-heading text-lg font-semibold uppercase tracking-tight">
              {staff.firstName}
            </p>
            <p className={`text-sm ${active ? "text-grey-light" : "text-grey-dark"}`}>{staff.role}</p>

            <p className={`mt-3 flex items-start gap-1.5 text-sm ${active ? "text-grey-light" : "text-grey-dark"}`}>
              <Scissors size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              {staff.services.map((s) => SERVICE_LABELS[s]).join(", ")}
            </p>

            <p className={`mt-2 flex items-center gap-1.5 text-sm font-medium ${active ? "text-cream" : "text-ink"}`}>
              <Clock size={14} className="shrink-0" aria-hidden="true" />
              Next: {formatNextAvailability(next)}
            </p>

            <span
              className={`mt-5 inline-flex items-center justify-center min-h-[44px] px-4 text-sm uppercase tracking-[0.1em] font-medium border ${
                active ? "border-cream text-cream" : "border-ink text-ink"
              }`}
            >
              Select Barber
            </span>
          </motion.button>
        );
      })}

      {staffWithAvailability.length === 0 && (
        <p className="col-span-full text-sm text-grey-dark">
          No barbers currently have availability for {serviceName.toLowerCase()}. Please check back soon.
        </p>
      )}
    </div>
  );
}
