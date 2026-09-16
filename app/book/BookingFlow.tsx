"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingProgress from "@/components/booking/BookingProgress";
import ServiceSelector from "@/components/booking/ServiceSelector";
import Calendar from "@/components/booking/Calendar";
import TimeSlotGrid from "@/components/booking/TimeSlotGrid";
import BookingForm from "@/components/booking/BookingForm";
import BookingSummary from "@/components/booking/BookingSummary";
import ConfirmationCard from "@/components/booking/ConfirmationCard";
import Button from "@/components/Button";
import { toDateKey, formatTimeLabel } from "@/lib/hours";
import { createBooking, SlotUnavailableError } from "@/lib/bookingStore";
import { validateCustomer } from "@/lib/validation";
import { getService } from "@/lib/services";
import type { Booking, CustomerDetails, ServiceSlug } from "@/lib/types";

const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dateOfBirth: "",
};

export default function BookingFlow({
  initialService,
}: {
  initialService?: ServiceSlug;
}) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceSlug | null>(
    initialService && getService(initialService) ? initialService : null
  );
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const dateKey = useMemo(() => (date ? toDateKey(date) : ""), [date]);
  const customerErrors = validateCustomer(customer);
  const customerValid = Object.keys(customerErrors).length === 0;

  function goNext() {
    setStep((s) => Math.min(5, s + 1));
  }
  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleConfirm() {
    if (!service || !date || !time) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = createBooking({
        service,
        date: dateKey,
        time,
        customer,
      });
      setConfirmed(booking);
    } catch (err) {
      if (err instanceof SlotUnavailableError) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return <ConfirmationCard booking={confirmed} />;
  }

  const canContinue =
    (step === 1 && !!service) ||
    (step === 2 && !!date) ||
    (step === 3 && !!time) ||
    (step === 4 && customerValid);

  return (
    <div>
      <BookingProgress current={step} />

      <div className="mt-10 md:mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {step === 1 && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Choose your service
                </h2>
                <ServiceSelector selected={service} onSelect={(s) => setService(s)} />
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Choose a date
                </h2>
                <div className="max-w-md">
                  <Calendar selected={date} onSelect={(d) => setDate(d)} />
                </div>
              </div>
            )}

            {step === 3 && date && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-2">
                  Choose a time
                </h2>
                <p className="text-sm text-grey-dark mb-6">
                  Available slots for{" "}
                  {date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <TimeSlotGrid dateKey={dateKey} selected={time} onSelect={(t) => setTime(t)} />
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Your details
                </h2>
                <BookingForm values={customer} onChange={setCustomer} />
              </div>
            )}

            {step === 5 && service && date && time && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Review &amp; confirm
                </h2>
                <BookingSummary
                  service={service}
                  date={date}
                  time={time}
                  customer={customer}
                  onConfirm={handleConfirm}
                  onEdit={() => setStep(1)}
                  submitting={submitting}
                  error={submitError}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 5 && (
        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={step === 1}
            icon={<ChevronLeft size={16} aria-hidden="true" />}
            iconPosition="left"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={goNext}
            disabled={!canContinue}
            icon={<ChevronRight size={16} aria-hidden="true" />}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 5 && (
        <p className="mt-4 text-xs text-grey-dark sr-only" aria-live="polite">
          Selected {getService(service ?? undefined)?.name} at {time ? formatTimeLabel(time) : ""}
        </p>
      )}
    </div>
  );
}
