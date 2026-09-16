import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const DIRECTIONS_URL =
  "https://maps.google.com/?q=256+Goldhawk+Rd,+London+W12+9PE";

export default function ContactDetails() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <Phone size={22} className="text-ink shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h3 className="font-heading text-[20px] uppercase tracking-tight font-semibold">
            Phone
          </h3>
          <p className="mt-1 text-lg">07588 646638</p>
          <a
            href="tel:07588646638"
            className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] font-medium border-b border-ink pb-0.5"
          >
            Call Now
          </a>
        </div>
      </div>

      <div className="flex gap-4">
        <MapPin size={22} className="text-ink shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h3 className="font-heading text-[20px] uppercase tracking-tight font-semibold">
            Address
          </h3>
          <p className="mt-1 text-lg leading-relaxed">
            256 Goldhawk Rd
            <br />
            London
            <br />
            W12 9PE
          </p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] font-medium border-b border-ink pb-0.5"
          >
            Get Directions
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="flex gap-4">
        <Clock size={22} className="text-ink shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h3 className="font-heading text-[20px] uppercase tracking-tight font-semibold">
            Opening Hours
          </h3>
          <p className="mt-1 text-lg">
            Monday–Sunday
            <br />
            9:00 AM–8:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
