import { MapPin, ExternalLink } from "lucide-react";

const DIRECTIONS_URL =
  "https://maps.google.com/?q=256+Goldhawk+Rd,+London+W12+9PE";

export default function MapSection({ className = "" }: { className?: string }) {
  return (
    <div className={`relative bg-grey-light/40 border border-grey-light aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] overflow-hidden ${className}`}>
      <iframe
        title="Askew Cuts location map"
        className="absolute inset-0 h-full w-full grayscale contrast-125"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=256%20Goldhawk%20Rd%2C%20London%20W12%209PE&t=&z=15&ie=UTF8&iwloc=&output=embed"
      />
      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-cream text-ink px-4 py-3 text-sm uppercase tracking-[0.1em] font-medium border border-ink hover:bg-ink hover:text-cream transition-colors min-h-[44px]"
      >
        <MapPin size={16} aria-hidden="true" />
        Get Directions
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  );
}
