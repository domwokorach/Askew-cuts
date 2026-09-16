import type { CustomerDetails } from "./types";

const UK_MOBILE_RE = /^(?:\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCustomer(
  values: CustomerDetails
): Partial<Record<keyof CustomerDetails, string>> {
  const errors: Partial<Record<keyof CustomerDetails, string>> = {};

  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";

  const mobile = values.mobile.trim();
  if (!mobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!UK_MOBILE_RE.test(mobile)) {
    errors.mobile = "Enter a valid UK mobile number, e.g. 07588 646638.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const dob = new Date(values.dateOfBirth);
    const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 13) errors.dateOfBirth = "You must be at least 13 years old.";
    if (dob > new Date()) errors.dateOfBirth = "Date of birth cannot be in the future.";
  }

  return errors;
}
