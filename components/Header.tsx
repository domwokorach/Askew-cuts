"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur border-b transition-shadow duration-200 ${
        scrolled ? "border-grey-light shadow-[0_1px_12px_rgba(17,17,17,0.06)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = link.href.includes("#")
                ? false
                : link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-sm uppercase tracking-[0.12em] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                    active ? "text-ink" : "text-grey-dark hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="active-nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <LinkButton href="/book" variant="primary">
              Book Now
            </LinkButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  );
}

export { NAV_LINKS };
