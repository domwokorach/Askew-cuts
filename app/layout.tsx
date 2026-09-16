import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/cookies/CookieConsentBanner";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Askew Cuts — Afro, European & American Barbering",
  description:
    "Professional cuts, precision fades and grooming for Afro, European and American hair. Book your appointment at Askew Cuts, 256 Goldhawk Rd, London.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
