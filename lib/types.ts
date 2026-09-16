export type ServiceSlug = "haircut" | "skin-fade" | "beard-trim";

export interface Service {
  slug: ServiceSlug;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export type BookingStatus = "confirmed" | "cancelled" | "completed";

/** 0 = Sunday ... 6 = Saturday, matching Date.getDay(). */
export type WorkingDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface StaffMember {
  id: string;
  firstName: string;
  role: string;
  initials: string;
  services: ServiceSlug[];
  workingDays: WorkingDay[];
}

/** Sentinel used while the customer has not committed to a specific barber. */
export const ANY_BARBER = "any" as const;
export type BarberChoice = string | typeof ANY_BARBER;

export interface Booking {
  bookingId: string;
  service: ServiceSlug;
  price: number;
  barberId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD
  createdAt: string; // ISO
  status: BookingStatus;
  agreedToTerms: boolean;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
}
