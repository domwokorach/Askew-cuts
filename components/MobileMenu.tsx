"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "./Header";

export default function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-ink text-cream lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-cream/15">
              <span className="font-heading uppercase tracking-[0.1em] text-sm text-grey-light">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="h-11 w-11 inline-flex items-center justify-center -mr-2 active:scale-90 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                aria-label="Close menu"
              >
                <X size={26} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col px-5 py-6 gap-1" aria-label="Mobile primary">
              {NAV_LINKS.map((link, i) => {
                const active = !link.href.includes("#") && pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-2xl font-heading uppercase tracking-tight border-b border-cream/10 min-h-[44px] transition-colors active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                        active ? "text-cream" : "text-grey-light hover:text-cream"
                      }`}
                    >
                      {link.label}
                      <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV_LINKS.length * 0.05, duration: 0.25 }}
                className="mt-6"
              >
                <Link
                  href="/book"
                  onClick={onClose}
                  className="flex items-center justify-center min-h-[44px] w-full bg-cream text-ink px-6 py-4 text-sm uppercase tracking-[0.12em] font-medium transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Book Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
