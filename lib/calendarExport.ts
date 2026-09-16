import type { Booking } from "./types";
import { getService } from "./services";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIcsDate(date: Date): string {
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    "00Z"
  );
}

export function downloadBookingIcs(booking: Booking) {
  const service = getService(booking.service);
  const [h, m] = booking.time.split(":").map(Number);
  const [y, mo, d] = booking.date.split("-").map(Number);
  const start = new Date(y, mo - 1, d, h, m);
  const end = new Date(start.getTime() + (service?.durationMinutes ?? 30) * 60000);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Askew Cuts//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.bookingId}@askewcuts.co.uk`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:Askew Cuts — ${service?.name ?? "Appointment"}`,
    "LOCATION:256 Goldhawk Rd\\, London\\, W12 9PE",
    `DESCRIPTION:Booking reference ${booking.bookingId}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `askew-cuts-${booking.bookingId}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
