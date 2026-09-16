import { Clock } from "lucide-react";
import { OPENING_HOURS } from "@/lib/hours";

export default function OpeningHours() {
  return (
    <div className="bg-ink text-cream p-8 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <Clock size={22} aria-hidden="true" />
        <h3 className="font-heading text-[24px] uppercase tracking-tight font-semibold">
          Opening Hours
        </h3>
      </div>
      <dl className="divide-y divide-cream/12">
        {OPENING_HOURS.map((row) => (
          <div key={row.day} className="flex items-center justify-between py-3 text-sm md:text-base">
            <dt className="text-grey-light">{row.day}</dt>
            <dd className="font-medium">{row.hours}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
