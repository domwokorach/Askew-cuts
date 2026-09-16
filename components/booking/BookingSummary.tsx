"use client";

import Link from "next/link";
import Button from "../Button";
import { formatTimeLabel } from "@/lib/hours";
import type { CustomerDetails, ServiceSlug } from "@/lib/types";
import { getService } from "@/lib/services";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BookingSummary({
  service,
  barberName,
  date,
  time,
  customer,
  agreedToTerms,
  onAgreedToTermsChange,
  onConfirm,
  onEdit,
  submitting,
  error,
}: {
  service: ServiceSlug;
  barberName: string;
  date: Date;
  time: string;
  customer: CustomerDetails;
  agreedToTerms: boolean;
  onAgreedToTermsChange: (next: boolean) => void;
  onConfirm: () => void;
  onEdit: () => void;
  submitting: boolean;
  error?: string | null;
}) {
  const svc = getService(service);
  if (!svc) return null;

  const rows: { label: string; value: string }[] = [
    { label: "Service", value: svc.name },
    { label: "Barber", value: barberName },
    { label: "Price", value: `£${svc.price}` },
    { label: "Date", value: DATE_FORMAT.format(date) },
    { label: "Time", value: formatTimeLabel(time) },
    { label: "Customer", value: `${customer.firstName} ${customer.lastName}` },
    { label: "Mobile", value: customer.mobile },
    { label: "Email", value: customer.email },
  ];

  return (
    <div className="border border-grey-light bg-cream">
      <dl className="divide-y divide-grey-light">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-4">
            <dt className="text-sm uppercase tracking-[0.08em] text-grey-dark">{row.label}</dt>
            <dd className="text-right font-medium break-words">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="p-6 border-t border-grey-light">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => onAgreedToTermsChange(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          />
          <span className="text-sm leading-relaxed">
            I agree to the{" "}
            <Link
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-grey-dark"
            >
              Terms &amp; Conditions
            </Link>{" "}
            and acknowledge the{" "}
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-grey-dark"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-5 flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onConfirm}
            disabled={submitting || !agreedToTerms}
          >
            {submitting ? "Confirming…" : "Confirm Booking"}
          </Button>
          <Button variant="ghost" size="lg" className="w-full sm:w-auto" onClick={onEdit} disabled={submitting}>
            Edit Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
