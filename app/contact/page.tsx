import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactDetails from "@/components/ContactDetails";
import MapSection from "@/components/MapSection";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact — Askew Cuts",
  description:
    "Call, visit, or get directions to Askew Cuts at 256 Goldhawk Rd, London W12 9PE.",
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Contact" title="Get in touch" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <ContactDetails />
            <div className="mt-10">
              <LinkButton href="/book" variant="primary" size="lg" icon={<ArrowRight size={18} aria-hidden="true" />}>
                Book Appointment
              </LinkButton>
            </div>
          </div>

          <MapSection className="h-[360px] md:h-[480px] lg:h-[560px]" />
        </div>
      </div>
    </section>
  );
}
