import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";
import { getService } from "@/lib/services";
import type { ServiceSlug } from "@/lib/types";

export const metadata: Metadata = {
  title: "Book — Askew Cuts",
  description: "Book your Askew Cuts appointment in a few quick steps.",
};

export default async function BookPage(props: PageProps<"/book">) {
  const searchParams = await props.searchParams;
  const requested = typeof searchParams.service === "string" ? searchParams.service : undefined;
  const initialService = getService(requested)?.slug as ServiceSlug | undefined;

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-grey-dark mb-3">Booking</p>
        <h1 className="font-heading text-[32px] md:text-[40px] font-semibold uppercase tracking-tight mb-10 md:mb-14">
          Reserve your appointment
        </h1>
        <BookingFlow initialService={initialService} />
      </div>
    </section>
  );
}
