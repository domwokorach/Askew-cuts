"use client";

import { motion } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getService } from "@/lib/services";
import type { StaffMember } from "@/lib/types";

export default function TeamCard({
  staff,
  index = 0,
}: {
  staff: StaffMember;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="flex flex-col border border-grey-light hover:border-ink transition-colors duration-200 p-8"
    >
      <span className="h-16 w-16 rounded-full bg-ink text-cream flex items-center justify-center font-heading text-2xl font-semibold">
        {staff.initials}
      </span>

      <h3 className="mt-6 font-heading text-[24px] font-semibold uppercase tracking-tight">
        {staff.firstName}
      </h3>
      <p className="text-sm text-grey-dark">{staff.role}</p>

      <p className="mt-4 flex items-start gap-1.5 text-sm text-grey-dark leading-relaxed">
        <Scissors size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
        {staff.services.map((s) => getService(s)?.name).join(", ")}
      </p>

      <Link
        href="/book"
        className="mt-6 inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.1em] font-medium border-b border-ink pb-0.5 self-start hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        Book Now
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
