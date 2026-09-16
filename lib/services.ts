import type { Service, ServiceSlug } from "./types";

export const SERVICES: Service[] = [
  {
    slug: "haircut",
    name: "Haircut",
    price: 20,
    durationMinutes: 30,
    description: "A sharp, tailored cut finished with precision detailing.",
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    price: 35,
    durationMinutes: 45,
    description: "Seamless blend from skin to top, cut clean and sharp.",
  },
  {
    slug: "beard-trim",
    name: "Beard Trim",
    price: 15,
    durationMinutes: 20,
    description: "Shape and line-up for a crisp, well-groomed finish.",
  },
];

export function getService(slug: ServiceSlug | string | undefined): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
