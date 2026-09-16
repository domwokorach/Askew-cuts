import type { Metadata } from "next";
import Link from "next/link";
import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import LegalContact from "@/components/legal/LegalContact";
import ManagePreferencesButton from "@/components/cookies/ManagePreferencesButton";
import ManagePreferencesLink from "@/components/cookies/ManagePreferencesLink";

export const metadata: Metadata = {
  title: "Cookie Policy — Askew Cuts",
  description: "How this website uses cookies and how to manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <LegalHero
          eyebrow="Legal"
          title="Cookie Policy"
          intro="This Cookie Policy explains how this website uses cookies and similar technologies, and how you can manage your preferences."
        />

        <div className="mt-8 max-w-3xl">
          <ManagePreferencesButton />
        </div>

        <div className="mt-4 max-w-3xl">
          <LegalSection id="what-cookies-are" title="What Cookies Are">
            <p>
              Cookies are small text files placed on your device when you visit a website. They help
              the website function correctly and can be used to remember your preferences between
              visits.
            </p>
          </LegalSection>

          <LegalSection id="why-we-use-cookies" title="Why We Use Cookies">
            <p>
              We use cookies to keep our booking system working correctly — for example, to remember
              your progress while booking an appointment and to prevent double-booking. With your
              permission, we may also use optional cookies to improve your experience of the website.
            </p>
          </LegalSection>

          <LegalSection id="types-of-cookies-used" title="Types of Cookies Used">
            <div className="space-y-5">
              <div>
                <p className="font-medium">Essential Cookies</p>
                <p>
                  Required for core website and booking functionality, such as remembering your
                  progress through the booking steps. These cannot be switched off, as the website
                  cannot function correctly without them.
                </p>
              </div>
              <div>
                <p className="font-medium">Analytics Cookies</p>
                <p>
                  Used only if analytics services are installed on this website. At present, Askew Cuts
                  does not use any analytics cookies. If this changes, this policy will be updated and
                  your consent will be requested before any analytics cookies are set.
                </p>
              </div>
              <div>
                <p className="font-medium">Preference Cookies</p>
                <p>
                  Used to remember choices you make on the website, where applicable, so you don&apos;t
                  need to set them again on your next visit.
                </p>
              </div>
              <div>
                <p className="font-medium">Marketing Cookies</p>
                <p>
                  Askew Cuts does not currently use any marketing or advertising tracking technologies
                  on this website. This section will be updated if that changes.
                </p>
              </div>
            </div>
          </LegalSection>

          <LegalSection id="third-party-services" title="Third-Party Services">
            <p>
              This website does not currently integrate any third-party analytics, advertising or
              tracking services. If any third-party service is added in future, it will be listed here
              along with its purpose.
            </p>
          </LegalSection>

          <LegalSection id="how-to-manage-cookies" title="How to Manage Cookies">
            <p>
              You can manage your cookie preferences for this website at any time using the{" "}
              <ManagePreferencesLink /> button above. You can also control or delete cookies through
              your browser settings — most browsers let you refuse or remove cookies, though this may
              affect the booking system&apos;s functionality.
            </p>
          </LegalSection>

          <LegalSection id="changes-to-the-cookie-policy" title="Changes to the Cookie Policy">
            <p>
              We may update this Cookie Policy from time to time, for example if we introduce new
              functionality that uses cookies. Any changes will be posted on this page.
            </p>
          </LegalSection>

          <LegalSection id="contact-us" title="Contact Us">
            <p>
              If you have any questions about this Cookie Policy, please contact us. See also our{" "}
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
