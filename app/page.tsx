import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import OpeningHours from "@/components/OpeningHours";
import MapSection from "@/components/MapSection";
import { LinkButton } from "@/components/Button";
import { SERVICES } from "@/lib/services";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="services" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Services"
            title="Precision, every time"
            subtitle="Three core services, priced clearly, booked in minutes."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-ink">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <OpeningHours />
            <div className="bg-cream p-8 md:p-10 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.2em] text-grey-dark mb-3">
                Find Us
              </p>
              <h3 className="font-heading text-[24px] md:text-[28px] font-semibold uppercase tracking-tight">
                256 Goldhawk Rd
                <br />
                London, W12 9PE
              </h3>
              <p className="mt-4 text-grey-dark leading-relaxed max-w-sm">
                Walk in or book ahead — appointments guarantee your slot with
                your barber of choice.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <LinkButton href="/book" variant="primary" icon={<ArrowRight size={16} aria-hidden="true" />}>
                  Book Appointment
                </LinkButton>
                <LinkButton href="/contact" variant="secondary">
                  Get Directions
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Location" title="Come find us" align="center" />
          <div className="mt-12">
            <MapSection className="max-w-4xl mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
}
