import type { ServiceSlug, StaffMember } from "./types";
import { getStaffForService } from "./staff";
import { formatTimeLabel, getDaySlots, toDateKey } from "./hours";
import { getBookedBarberIdsAtSlot, getBookedTimesForBarberOnDate } from "./bookingStore";

export function isWorkingDay(staff: StaffMember, date: Date): boolean {
  return staff.workingDays.includes(date.getDay() as StaffMember["workingDays"][number]);
}

/** Free slots for one staff member on one date (empty if they don't work that day). */
export function getAvailableSlotsForStaffOnDate(staff: StaffMember, date: Date): string[] {
  if (!isWorkingDay(staff, date)) return [];
  const booked = getBookedTimesForBarberOnDate(staff.id, toDateKey(date));
  return getDaySlots().filter((t) => !booked.has(t));
}

export interface NextAvailability {
  date: Date;
  time: string;
}

/** Scans forward from today to find the soonest free slot for a staff member. */
export function findNextAvailability(
  staff: StaffMember,
  fromDate: Date = new Date(),
  horizonDays = 30
): NextAvailability | null {
  for (let i = 0; i < horizonDays; i++) {
    const date = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + i);
    const slots = getAvailableSlotsForStaffOnDate(staff, date);
    if (slots.length > 0) {
      return { date, time: slots[0] };
    }
  }
  return null;
}

const WEEKDAY_FORMAT = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });

export function formatNextAvailability(na: NextAvailability): string {
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const key = toDateKey(na.date);
  if (key === toDateKey(today)) return `Today, ${formatTimeLabel(na.time)}`;
  if (key === toDateKey(tomorrow)) return `Tomorrow, ${formatTimeLabel(na.time)}`;
  return `${WEEKDAY_FORMAT.format(na.date)}, ${formatTimeLabel(na.time)}`;
}

export function getQualifyingStaffForService(service: ServiceSlug): StaffMember[] {
  return getStaffForService(service);
}

/** Staff who offer the service, work on the given date, and have at least one free slot. */
export function getAvailableStaffForDate(
  qualifyingStaff: StaffMember[],
  date: Date
): StaffMember[] {
  return qualifyingStaff.filter((s) => getAvailableSlotsForStaffOnDate(s, date).length > 0);
}

/** Staff who offer the service, work the date, and are free at the exact time. */
export function getAvailableStaffForSlot(
  qualifyingStaff: StaffMember[],
  date: Date,
  time: string
): StaffMember[] {
  const dateKey = toDateKey(date);
  const bookedIds = getBookedBarberIdsAtSlot(dateKey, time);
  return qualifyingStaff.filter((s) => isWorkingDay(s, date) && !bookedIds.has(s.id));
}

/** Picks a specific barber for a "No Preference" booking. Returns null if none are free. */
export function resolveAnyAvailableStaff(
  qualifyingStaff: StaffMember[],
  date: Date,
  time: string
): StaffMember | null {
  const available = getAvailableStaffForSlot(qualifyingStaff, date, time);
  return available[0] ?? null;
}
