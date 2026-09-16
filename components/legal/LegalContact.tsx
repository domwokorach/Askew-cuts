import { MapPin, Phone } from "lucide-react";

export default function LegalContact() {
  return (
    <div className="mt-4 space-y-2 text-base">
      <p className="font-heading font-semibold uppercase tracking-tight">Askew Cuts</p>
      <p className="flex items-start gap-2">
        <MapPin size={16} className="mt-1 shrink-0 text-grey-dark" aria-hidden="true" />
        256 Goldhawk Rd, London W12 9PE
      </p>
      <a href="tel:07588646638" className="flex items-center gap-2 hover:text-grey-dark w-fit">
        <Phone size={16} className="shrink-0 text-grey-dark" aria-hidden="true" />
        07588 646638
      </a>
    </div>
  );
}
