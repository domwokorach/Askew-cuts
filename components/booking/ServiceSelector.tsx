"use client";

import { motion } from "framer-motion";
import { Scissors, Waves, UserRound, Check } from "lucide-react";
import { SERVICES } from "@/lib/services";
import type { ServiceSlug } from "@/lib/types";

const ICONS: Record<ServiceSlug, typeof Scissors> = {
  haircut: Scissors,
  "skin-fade": Waves,
  "beard-trim": UserRound,
};

export default function ServiceSelector({
  selected,
  onSelect,
}: {
  selected: ServiceSlug | null;
  onSelect: (slug: ServiceSlug) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Choose a service" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SERVICES.map((service) => {
        const Icon = ICONS[service.slug];
        const active = selected === service.slug;
        return (
          <motion.button
            key={service.slug}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(service.slug)}
            whileTap={{ scale: 0.98 }}
            className={`relative text-left p-6 border transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
              active
                ? "border-ink bg-ink text-cream"
                : "border-grey-light hover:border-grey-dark bg-cream text-ink"
            }`}
          >
            {active && (
              <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-cream text-ink flex items-center justify-center">
                <Check size={14} aria-hidden="true" />
              </span>
            )}
            <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-4 font-heading text-lg font-semibold uppercase tracking-tight">
              {service.name}
            </p>
            <p className={`mt-1 text-sm ${active ? "text-grey-light" : "text-grey-dark"}`}>
              {service.durationMinutes} mins
            </p>
            <p className="mt-4 font-heading text-2xl font-semibold">£{service.price}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
