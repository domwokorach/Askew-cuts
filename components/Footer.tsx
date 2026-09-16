import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { LinkButton } from "./Button";
import { OPENING_HOURS } from "@/lib/hours";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <span className="font-heading text-2xl font-semibold uppercase tracking-[0.08em]">
              Askew Cuts
            </span>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-grey-light">
              Afro · European · American
            </p>
            <p className="mt-6 text-sm text-grey-light max-w-xs leading-relaxed">
              Professional cuts, precision fades and grooming, in the heart of London.
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.15em] text-grey-mid mb-4">
              Navigate
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-grey-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-grey-light">
                  Book
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-grey-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.15em] text-grey-mid mb-4">
              Visit
            </h3>
            <address className="not-italic text-sm space-y-3">
              <a
                href="https://maps.google.com/?q=256+Goldhawk+Rd,+London+W12+9PE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-grey-light"
              >
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>256 Goldhawk Rd, London W12 9PE</span>
              </a>
              <a
                href="tel:07588646638"
                className="flex items-center gap-2 hover:text-grey-light"
              >
                <Phone size={16} className="shrink-0" aria-hidden="true" />
                <span>07588 646638</span>
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/15 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-sm text-grey-light">
            <p className="font-medium text-cream">{OPENING_HOURS[0].day}–{OPENING_HOURS[6].day}</p>
            <p>{OPENING_HOURS[0].hours}</p>
          </div>
          <LinkButton href="/book" variant="inverse">
            Book Appointment
          </LinkButton>
        </div>

        <p className="mt-10 text-xs text-grey-mid">
          © {new Date().getFullYear()} Askew Cuts. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
