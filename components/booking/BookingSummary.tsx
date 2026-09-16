"use client";

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
  date,
  time,
  customer,
  onConfirm,
  onEdit,
  submitting,
  error,
}: {
  service: ServiceSlug;
  date: Date;
  time: string;
  customer: CustomerDetails;
  onConfirm: () => void;
  onEdit: () => void;
  submitting: boolean;
  error?: string | null;
}) {
  const svc = getService(service);
  if (!svc) return null;

  const rows: { label: string; value: string }[] = [
    { label: "Service", value: svc.name },
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
        {error && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={onConfirm} disabled={submitting}>
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
