"use client";

import { motion } from "framer-motion";
import { Scissors, Waves, UserRound, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/lib/types";

const ICONS: Record<Service["slug"], typeof Scissors> = {
  haircut: Scissors,
  "skin-fade": Waves,
  "beard-trim": UserRound,
};

export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const Icon = ICONS[service.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group flex flex-col justify-between bg-cream border border-grey-light hover:border-ink transition-colors duration-200 p-8 min-h-[320px]"
    >
      <div>
        <Icon size={28} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
        <h3 className="mt-6 font-heading text-[24px] md:text-[26px] font-semibold uppercase tracking-tight">
          {service.name}
        </h3>
        <p className="mt-3 text-sm text-grey-dark leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="font-heading text-2xl font-semibold">£{service.price}</span>
        <Link
          href={`/book?service=${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.1em] font-medium border-b border-ink pb-0.5 group-hover:gap-2.5 transition-all"
        >
          Book {service.name}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
