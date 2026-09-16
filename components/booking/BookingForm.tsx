"use client";

import { useState } from "react";
import type { CustomerDetails } from "@/lib/types";
import { validateCustomer } from "@/lib/validation";

const FIELDS: {
  key: keyof CustomerDetails;
  label: string;
  type: string;
  autoComplete: string;
  placeholder?: string;
}[] = [
  { key: "firstName", label: "First Name", type: "text", autoComplete: "given-name" },
  { key: "lastName", label: "Last Name", type: "text", autoComplete: "family-name" },
  {
    key: "mobile",
    label: "Mobile Number",
    type: "tel",
    autoComplete: "tel",
    placeholder: "07588 646638",
  },
  { key: "email", label: "Email Address", type: "email", autoComplete: "email" },
  { key: "dateOfBirth", label: "Date of Birth", type: "date", autoComplete: "bday" },
];

export default function BookingForm({
  values,
  onChange,
}: {
  values: CustomerDetails;
  onChange: (values: CustomerDetails) => void;
}) {
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerDetails, boolean>>>({});
  const errors = validateCustomer(values);

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
      {FIELDS.map((field) => {
        const showError = touched[field.key] && errors[field.key];
        return (
          <div
            key={field.key}
            className={field.key === "mobile" || field.key === "email" ? "sm:col-span-2" : ""}
          >
            <label htmlFor={field.key} className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            <input
              id={field.key}
              name={field.key}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={values[field.key]}
              max={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
              onChange={(e) => onChange({ ...values, [field.key]: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, [field.key]: true }))}
              aria-invalid={!!showError}
              aria-describedby={showError ? `${field.key}-error` : undefined}
              className={`w-full min-h-[44px] px-4 py-3 bg-cream border text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                showError ? "border-red-600" : "border-grey-light focus:border-ink"
              }`}
            />
            {showError && (
              <p id={`${field.key}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
                {errors[field.key]}
              </p>
            )}
          </div>
        );
      })}
    </form>
  );
}
