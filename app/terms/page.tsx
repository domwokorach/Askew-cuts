import type { Metadata } from "next";
import Link from "next/link";
import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import LegalContact from "@/components/legal/LegalContact";
import EditableNote from "@/components/legal/EditableNote";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Terms & Conditions — Askew Cuts",
  description: "The terms and conditions for using this website and booking an appointment with Askew Cuts.",
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <LegalHero
          eyebrow="Legal"
          title="Terms & Conditions"
          intro="These terms and conditions govern your use of this website and your booking of appointments with Askew Cuts. By booking an appointment, you agree to these terms."
        />

        <div className="mt-12 max-w-3xl">
          <LegalSection id="appointments" title="Appointments">
            <p>
              Appointments can be booked through this website by selecting a service, barber, date and
              time. Please provide accurate contact details so we can reach you about your booking if
              needed.
            </p>
          </LegalSection>

          <LegalSection id="booking-confirmation" title="Booking Confirmation">
            <p>
              Once you complete the booking steps and confirm your appointment, you will receive an
              on-screen booking confirmation with a reference number. This confirms your appointment
              slot has been reserved with the selected barber.
            </p>
          </LegalSection>

          <LegalSection id="service-prices" title="Service Prices">
            <p>Current prices for services offered at Askew Cuts are:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  {service.name} — £{service.price}
                </li>
              ))}
            </ul>
            <p>Prices are shown at the time of booking and may be updated by Askew Cuts from time to time.</p>
          </LegalSection>

          <LegalSection id="arrival-lateness" title="Arrival & Lateness">
            <p>
              Please aim to arrive a few minutes before your appointment time. If you arrive late, we
              will do our best to accommodate you, but your appointment time may be shortened or it may
              not be possible to guarantee your full service.
            </p>
            <EditableNote>
              A specific lateness policy (e.g. a grace period after which a booking may be treated as a
              no-show) should be confirmed here by Askew Cuts.
            </EditableNote>
          </LegalSection>

          <LegalSection id="cancellations" title="Cancellations">
            <EditableNote>
              Askew Cuts has not yet defined a cancellation policy (e.g. notice period required, or any
              cancellation fee). This section should be completed by the business before launch.
            </EditableNote>
          </LegalSection>

          <LegalSection id="rescheduling" title="Rescheduling">
            <EditableNote>
              Askew Cuts has not yet defined a rescheduling policy (e.g. how much notice is needed to
              move an appointment). This section should be completed by the business before launch.
            </EditableNote>
          </LegalSection>

          <LegalSection id="no-shows" title="No-Shows">
            <EditableNote>
              Askew Cuts has not yet defined a no-show policy. This section should be completed by the
              business before launch.
            </EditableNote>
          </LegalSection>

          <LegalSection id="payments" title="Payments">
            <EditableNote>
              Accepted payment methods, and whether payment is taken at time of booking or in person at
              the salon, have not yet been defined. This section should be completed by the business
              before launch.
            </EditableNote>
          </LegalSection>

          <LegalSection id="service-availability" title="Service Availability">
            <p>
              Appointments are subject to barber availability as shown at the time of booking. Askew
              Cuts reserves the right to amend, reschedule or cancel an appointment where a barber
              becomes unavailable, and will make reasonable efforts to notify you in advance using the
              contact details you provided.
            </p>
          </LegalSection>

          <LegalSection id="customer-responsibilities" title="Customer Responsibilities">
            <p>When booking and attending an appointment, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide accurate and up-to-date contact details</li>
              <li>Arrive in good time for your appointment</li>
              <li>Let us know of any allergies or sensitivities relevant to your service</li>
              <li>Treat our staff and premises with respect</li>
            </ul>
          </LegalSection>

          <LegalSection id="website-use" title="Website Use">
            <p>
              This website is provided for the purpose of browsing services and booking appointments
              with Askew Cuts. You agree not to misuse the website, attempt to disrupt the booking
              system, or use the site for any unlawful purpose. All content on this website is the
              property of Askew Cuts unless otherwise stated.
            </p>
          </LegalSection>

          <LegalSection id="changes-to-these-terms" title="Changes to These Terms">
            <p>
              We may update these terms and conditions from time to time. Any changes will be posted on
              this page. We recommend checking back periodically. Continued use of this website and our
              booking service after changes are posted constitutes acceptance of the updated terms.
            </p>
          </LegalSection>

          <LegalSection id="contact-information" title="Contact Information">
            <p>
              If you have any questions about these Terms & Conditions, please contact us. See also our{" "}
              <Link href="/privacy" className="underline hover:text-grey-dark">
                Privacy Policy
              </Link>
              .
            </p>
            <LegalContact />
          </LegalSection>
        </div>
      </div>
    </section>
  );
}
