import type { Metadata } from "next";
import Link from "next/link";
import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import LegalContact from "@/components/legal/LegalContact";
import EditableNote from "@/components/legal/EditableNote";

export const metadata: Metadata = {
  title: "Privacy Policy — Askew Cuts",
  description: "How Askew Cuts collects, uses and protects the information you share when booking an appointment.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <LegalHero
          eyebrow="Legal"
          title="Privacy Policy"
          intro="This Privacy Policy explains how Askew Cuts collects, uses and protects the personal information you share with us when you book an appointment or use this website."
        />

        <div className="mt-12 max-w-3xl">
          <LegalSection id="information-we-collect" title="Information We Collect">
            <p>When you book an appointment through this website, we ask you to provide:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>First name</li>
              <li>Last name</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>Date of birth</li>
              <li>Your chosen appointment and service details (service, barber, date and time)</li>
            </ul>
            <p>
              We also keep a record of your booking history with Askew Cuts, and may collect general
              website usage information (such as pages visited) where analytics cookies are enabled —
              see our{" "}
              <Link href="/cookies" className="underline hover:text-grey-dark">
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
          </LegalSection>

          <LegalSection id="how-we-use-your-information" title="How We Use Your Information">
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Create and manage your appointment booking</li>
              <li>Confirm, remind you of, or contact you about your appointment</li>
              <li>Prevent double-booking and manage barber availability</li>
              <li>Maintain accurate business and appointment records</li>
              <li>Respond to enquiries you send us</li>
            </ul>
          </LegalSection>

          <LegalSection id="booking-information" title="Booking Information">
            <p>
              Each booking record includes the service selected, the barber assigned, the date and
              time of your appointment, the price, your contact details, and the date you made the
              booking. This information is used solely to deliver and manage your appointment with
              Askew Cuts.
            </p>
          </LegalSection>

          <LegalSection id="how-information-is-stored" title="How Information Is Stored">
            <p>
              We take reasonable steps to keep your information secure and to only make it accessible
              to those who need it to manage your appointment.
            </p>
            <EditableNote>
              The specific systems used to store booking data (e.g. booking software, hosting
              provider) should be confirmed here once finalised by Askew Cuts.
            </EditableNote>
          </LegalSection>

          <LegalSection id="sharing-of-information" title="Sharing of Information">
            <p>
              We do not sell your personal information. We do not share your information with third
              parties except where necessary to operate the booking system itself, or where we are
              required to do so by law.
            </p>
            <EditableNote>
              If Askew Cuts starts using a third-party booking, payment or communications provider,
              those providers should be listed here.
            </EditableNote>
          </LegalSection>

          <LegalSection id="data-retention" title="Data Retention">
            <p>
              We retain your booking information for as long as needed to manage your appointments and
              maintain our business records, and to meet any legal or accounting obligations.
            </p>
            <EditableNote>
              A specific retention period (e.g. how many years booking records are kept) should be
              confirmed here by Askew Cuts.
            </EditableNote>
          </LegalSection>

          <LegalSection id="customer-privacy-rights" title="Customer Privacy Rights">
            <p>Under UK data protection law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access the personal information we hold about you</li>
              <li>Ask us to correct inaccurate information</li>
              <li>Ask us to delete your information, where applicable</li>
              <li>Object to or restrict how we use your information</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details below. You also
              have the right to lodge a complaint with the Information Commissioner&apos;s Office
              (ICO).
            </p>
          </LegalSection>

          <LegalSection id="contact-us" title="Contact Us">
            <p>
              If you have any questions about this Privacy Policy or how your information is handled,
              please contact us:
            </p>
            <LegalContact />
          </LegalSection>
        </div>
      </div>
    </section>
  );
}
