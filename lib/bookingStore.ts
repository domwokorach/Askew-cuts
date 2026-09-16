import type { Booking, CustomerDetails, ServiceSlug } from "./types";
import { getService } from "./services";

const STORAGE_KEY = "askew-cuts:bookings";

function readAll(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

function writeAll(bookings: Booking[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getBookings(): Booking[] {
  return readAll();
}

export function isSlotTaken(barberId: string, date: string, time: string): boolean {
  return readAll().some(
    (b) =>
      b.barberId === barberId &&
      b.date === date &&
      b.time === time &&
      b.status === "confirmed"
  );
}

/** Times already booked for one barber on one date. */
export function getBookedTimesForBarberOnDate(barberId: string, date: string): Set<string> {
  return new Set(
    readAll()
      .filter((b) => b.barberId === barberId && b.date === date && b.status === "confirmed")
      .map((b) => b.time)
  );
}

/** Ids of every barber already booked at an exact date + time. */
export function getBookedBarberIdsAtSlot(date: string, time: string): Set<string> {
  return new Set(
    readAll()
      .filter((b) => b.date === date && b.time === time && b.status === "confirmed")
      .map((b) => b.barberId)
  );
}

function generateBookingId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AC-${stamp}-${rand}`;
}

export class SlotUnavailableError extends Error {
  constructor() {
    super("That time slot has just been booked. Please choose another.");
    this.name = "SlotUnavailableError";
  }
}

export function createBooking(params: {
  service: ServiceSlug;
  barberId: string;
  date: string;
  time: string;
  customer: CustomerDetails;
  agreedToTerms: boolean;
}): Booking {
  const service = getService(params.service);
  if (!service) throw new Error("Unknown service");
  if (!params.agreedToTerms) {
    throw new Error("You must agree to the Terms & Conditions to book an appointment.");
  }

  const bookings = readAll();
  const clash = bookings.some(
    (b) =>
      b.barberId === params.barberId &&
      b.date === params.date &&
      b.time === params.time &&
      b.status === "confirmed"
  );
  if (clash) throw new SlotUnavailableError();

  const booking: Booking = {
    bookingId: generateBookingId(),
    service: service.slug,
    price: service.price,
    barberId: params.barberId,
    date: params.date,
    time: params.time,
    firstName: params.customer.firstName,
    lastName: params.customer.lastName,
    mobile: params.customer.mobile,
    email: params.customer.email,
    dateOfBirth: params.customer.dateOfBirth,
    createdAt: new Date().toISOString(),
    status: "confirmed",
    agreedToTerms: params.agreedToTerms,
  };

  bookings.push(booking);
  writeAll(bookings);
  return booking;
}
