export type ServiceSlug = "haircut" | "skin-fade" | "beard-trim";

export interface Service {
  slug: ServiceSlug;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface Booking {
  bookingId: string;
  service: ServiceSlug;
  price: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD
  createdAt: string; // ISO
  status: BookingStatus;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
}
