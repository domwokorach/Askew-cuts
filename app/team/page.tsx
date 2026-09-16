import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import { LinkButton } from "@/components/Button";
import { STAFF } from "@/lib/staff";

export const metadata: Metadata = {
  title: "Team — Askew Cuts",
  description: "Meet the Askew Cuts team of barbers specialising in Afro, European and American cuts.",
};

export default function TeamPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Team"
          title="Meet the barbers"
          subtitle="Every barber at Askew Cuts brings their own specialism. Choose a service and pick the barber who's right for you at checkout."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAFF.map((staff, i) => (
            <TeamCard key={staff.id} staff={staff} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <LinkButton href="/book" variant="primary" size="lg" icon={<ArrowRight size={18} aria-hidden="true" />}>
            Book Appointment
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
