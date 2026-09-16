"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingProgress from "@/components/booking/BookingProgress";
import ServiceSelector from "@/components/booking/ServiceSelector";
import StaffSelector from "@/components/booking/StaffSelector";
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
import { getStaffMember } from "@/lib/staff";
import {
  getAvailableStaffForDate,
  getQualifyingStaffForService,
  resolveAnyAvailableStaff,
} from "@/lib/staffAvailability";
import { ANY_BARBER, type BarberChoice, type Booking, type CustomerDetails, type ServiceSlug } from "@/lib/types";

const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dateOfBirth: "",
};

const TOTAL_STEPS = 6;

export default function BookingFlow({
  initialService,
}: {
  initialService?: ServiceSlug;
}) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceSlug | null>(
    initialService && getService(initialService) ? initialService : null
  );
  const [barberChoice, setBarberChoice] = useState<BarberChoice | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const dateKey = useMemo(() => (date ? toDateKey(date) : ""), [date]);
  const customerErrors = validateCustomer(customer);
  const customerValid = Object.keys(customerErrors).length === 0;

  const qualifyingStaff = useMemo(
    () => (service ? getQualifyingStaffForService(service) : []),
    [service]
  );
  const staffForTimeGrid = useMemo(
    () =>
      barberChoice && barberChoice !== ANY_BARBER
        ? qualifyingStaff.filter((s) => s.id === barberChoice)
        : qualifyingStaff,
    [qualifyingStaff, barberChoice]
  );

  function handleSelectService(next: ServiceSlug) {
    setService(next);
    setBarberChoice(null);
    setDate(null);
    setTime(null);
  }

  function handleSelectBarber(next: BarberChoice) {
    setBarberChoice(next);
    setDate(null);
    setTime(null);
  }

  function goNext() {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }
  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleConfirm() {
    if (!service || !barberChoice || !date || !time || !agreedToTerms) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      let barberId: string;
      if (barberChoice === ANY_BARBER) {
        const resolved = resolveAnyAvailableStaff(qualifyingStaff, date, time);
        if (!resolved) {
          setSubmitError("No barbers are available for this slot. Please choose another time.");
          setSubmitting(false);
          return;
        }
        barberId = resolved.id;
      } else {
        barberId = barberChoice;
      }

      const booking = createBooking({
        service,
        barberId,
        date: dateKey,
        time,
        customer,
        agreedToTerms,
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
    (step === 2 && !!barberChoice) ||
    (step === 3 && !!date) ||
    (step === 4 && !!time) ||
    (step === 5 && customerValid);

  const resolvedBarberForSummary =
    barberChoice === ANY_BARBER
      ? date && time
        ? resolveAnyAvailableStaff(qualifyingStaff, date, time)
        : null
      : getStaffMember(barberChoice ?? undefined);
  const barberSummaryName = resolvedBarberForSummary
    ? `${resolvedBarberForSummary.firstName} — ${resolvedBarberForSummary.role}`
    : "Askew Cuts Team";

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
                <ServiceSelector selected={service} onSelect={handleSelectService} />
              </div>
            )}

            {step === 2 && service && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-2">
                  Choose Your Barber
                </h2>
                <p className="text-sm text-grey-dark mb-6">
                  Select an available member of the Askew Cuts team for your appointment.
                </p>
                <StaffSelector service={service} selected={barberChoice} onSelect={handleSelectBarber} />
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Choose a date
                </h2>
                <div className="max-w-md">
                  <Calendar
                    selected={date}
                    onSelect={(d) => setDate(d)}
                    isDateUnavailable={(d) => getAvailableStaffForDate(staffForTimeGrid, d).length === 0}
                  />
                </div>
              </div>
            )}

            {step === 4 && date && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-2">
                  Choose a time
                </h2>
                <p className="text-sm text-grey-dark mb-6">
                  Available slots for{" "}
                  {date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <TimeSlotGrid
                  date={date}
                  qualifyingStaff={staffForTimeGrid}
                  selected={time}
                  onSelect={(t) => setTime(t)}
                />
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Your details
                </h2>
                <BookingForm values={customer} onChange={setCustomer} />
              </div>
            )}

            {step === 6 && service && date && time && (
              <div>
                <h2 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight mb-6">
                  Review &amp; confirm
                </h2>
                <BookingSummary
                  service={service}
                  barberName={barberSummaryName}
                  date={date}
                  time={time}
                  customer={customer}
                  agreedToTerms={agreedToTerms}
                  onAgreedToTermsChange={setAgreedToTerms}
                  onConfirm={handleConfirm}
                  onEdit={goBack}
                  submitting={submitting}
                  error={submitError}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < TOTAL_STEPS && (
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

      {step === TOTAL_STEPS && (
        <p className="mt-4 text-xs text-grey-dark sr-only" aria-live="polite">
          Selected {getService(service ?? undefined)?.name} at {time ? formatTimeLabel(time) : ""}
        </p>
      )}
    </div>
  );
}
