import type { ServiceSlug, StaffMember } from "./types";

export const STAFF: StaffMember[] = [
  {
    id: "marcus",
    firstName: "Marcus",
    role: "Master Barber",
    initials: "M",
    services: ["haircut", "skin-fade", "beard-trim"],
    workingDays: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "leon",
    firstName: "Leon",
    role: "Fade Specialist",
    initials: "L",
    services: ["haircut", "skin-fade"],
    workingDays: [2, 3, 4, 5, 6],
  },
  {
    id: "andre",
    firstName: "Andre",
    role: "Barber",
    initials: "A",
    services: ["haircut", "beard-trim"],
    workingDays: [1, 2, 3, 4, 5],
  },
  {
    id: "chidi",
    firstName: "Chidi",
    role: "Barber",
    initials: "C",
    services: ["skin-fade", "beard-trim"],
    workingDays: [3, 4, 5, 6, 0],
  },
];

export function getStaffMember(id: string | undefined): StaffMember | undefined {
  return STAFF.find((s) => s.id === id);
}

export function getStaffForService(service: ServiceSlug): StaffMember[] {
  return STAFF.filter((s) => s.services.includes(service));
}
