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

export function isSlotTaken(date: string, time: string): boolean {
  return readAll().some(
    (b) => b.date === date && b.time === time && b.status === "confirmed"
  );
}

export function getBookedTimesForDate(date: string): Set<string> {
  return new Set(
    readAll()
      .filter((b) => b.date === date && b.status === "confirmed")
      .map((b) => b.time)
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
  date: string;
  time: string;
  customer: CustomerDetails;
}): Booking {
  const service = getService(params.service);
  if (!service) throw new Error("Unknown service");

  const bookings = readAll();
  const clash = bookings.some(
    (b) =>
      b.date === params.date &&
      b.time === params.time &&
      b.status === "confirmed"
  );
  if (clash) throw new SlotUnavailableError();

  const booking: Booking = {
    bookingId: generateBookingId(),
    service: service.slug,
    price: service.price,
    date: params.date,
    time: params.time,
    firstName: params.customer.firstName,
    lastName: params.customer.lastName,
    mobile: params.customer.mobile,
    email: params.customer.email,
    dateOfBirth: params.customer.dateOfBirth,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };

  bookings.push(booking);
  writeAll(bookings);
  return booking;
}
