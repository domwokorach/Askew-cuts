"use client";

import { motion } from "framer-motion";
import { CircleCheck, CalendarPlus } from "lucide-react";
import Button, { LinkButton } from "../Button";
import { formatTimeLabel } from "@/lib/hours";
import { getService } from "@/lib/services";
import { downloadBookingIcs } from "@/lib/calendarExport";
import type { Booking } from "@/lib/types";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ConfirmationCard({ booking }: { booking: Booking }) {
  const service = getService(booking.service);
  const date = new Date(`${booking.date}T00:00:00`);

  return (
    <div className="max-w-xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mx-auto h-16 w-16 rounded-full bg-ink text-cream flex items-center justify-center"
      >
        <CircleCheck size={32} aria-hidden="true" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-6 font-heading text-[32px] md:text-[40px] font-semibold uppercase tracking-tight"
      >
        Booking Confirmed
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.4 }}
        className="mt-3 text-grey-dark"
      >
        Your appointment with Askew Cuts has been successfully reserved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-8 border border-grey-light bg-cream text-left"
      >
        <dl className="divide-y divide-grey-light">
          <div className="flex items-center justify-between px-6 py-4">
            <dt className="text-sm uppercase tracking-[0.08em] text-grey-dark">Service</dt>
            <dd className="font-medium">{service?.name}</dd>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <dt className="text-sm uppercase tracking-[0.08em] text-grey-dark">Price</dt>
            <dd className="font-medium">£{booking.price}</dd>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <dt className="text-sm uppercase tracking-[0.08em] text-grey-dark">Date</dt>
            <dd className="font-medium">{DATE_FORMAT.format(date)}</dd>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <dt className="text-sm uppercase tracking-[0.08em] text-grey-dark">Time</dt>
            <dd className="font-medium">{formatTimeLabel(booking.time)}</dd>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <dt className="text-sm uppercase tracking-[0.08em] text-grey-dark">Reference</dt>
            <dd className="font-medium">{booking.bookingId}</dd>
          </div>
        </dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
      >
        <Button
          variant="secondary"
          size="lg"
          icon={<CalendarPlus size={18} aria-hidden="true" />}
          iconPosition="left"
          onClick={() => downloadBookingIcs(booking)}
        >
          Add to Calendar
        </Button>
        <LinkButton href="/" variant="primary" size="lg">
          Back to Home
        </LinkButton>
      </motion.div>
    </div>
  );
}
