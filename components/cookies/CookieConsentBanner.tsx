"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Button from "../Button";
import Toggle from "./Toggle";
import {
  ALL_ACCEPTED,
  ALL_REJECTED,
  DEFAULT_PREFERENCES,
  OPEN_COOKIE_PREFERENCES_EVENT,
  readConsent,
  writeConsent,
  type CookiePreferences,
} from "@/lib/cookieConsent";

type Status = "hidden" | "banner" | "preferences";

export default function CookieConsentBanner() {
  const [status, setStatus] = useState<Status>("hidden");
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    function checkExistingConsent() {
      const existing = readConsent();
      if (existing) {
        setPrefs(existing.preferences);
      } else {
        setStatus("banner");
      }
    }
    checkExistingConsent();

    function handleOpenPreferences() {
      const current = readConsent();
      setPrefs(current?.preferences ?? DEFAULT_PREFERENCES);
      setStatus("preferences");
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  function decide(preferences: CookiePreferences) {
    writeConsent(preferences);
    setPrefs(preferences);
    setStatus("hidden");
  }

  return (
    <AnimatePresence>
      {status !== "hidden" && (
        <>
          {status === "preferences" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-ink/40"
              onClick={() => setStatus("banner")}
              aria-hidden="true"
            />
          )}

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={status === "preferences" ? "Cookie preferences" : "Cookie consent"}
            className="fixed inset-x-0 bottom-0 z-[60] bg-cream border-t border-grey-light shadow-[0_-4px_24px_rgba(17,17,17,0.12)] rounded-t-2xl sm:rounded-none"
          >
            <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-6 sm:py-5 lg:px-10">
              {status === "banner" && (
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3 sm:max-w-xl">
                    <Cookie size={22} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-heading text-base font-semibold uppercase tracking-tight">
                        Your Privacy
                      </p>
                      <p className="mt-1 text-sm text-grey-dark leading-relaxed">
                        We use essential cookies to keep the website working. With your permission, we
                        may also use optional cookies to improve the website experience. Read our{" "}
                        <Link href="/cookies" className="underline hover:text-ink">
                          Cookie Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full sm:w-auto order-3 sm:order-1"
                      onClick={() => setStatus("preferences")}
                    >
                      Manage Preferences
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto order-2"
                      onClick={() => decide(ALL_REJECTED)}
                    >
                      Reject Optional
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto order-1 sm:order-3"
                      onClick={() => decide(ALL_ACCEPTED)}
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              )}

              {status === "preferences" && (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-lg font-semibold uppercase tracking-tight">
                        Manage Cookie Preferences
                      </p>
                      <p className="mt-1 text-sm text-grey-dark max-w-xl">
                        Choose which optional cookies Askew Cuts can use. You can change this at any
                        time from the{" "}
                        <Link href="/cookies" className="underline hover:text-ink">
                          Cookie Policy
                        </Link>{" "}
                        page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus("banner")}
                      aria-label="Close preferences"
                      className="h-11 w-11 -mr-2 -mt-1 inline-flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                    >
                      <X size={22} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-6 divide-y divide-grey-light border-y border-grey-light">
                    <div className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium">Essential</p>
                        <p className="text-sm text-grey-dark">
                          Required for core website and booking functionality.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs uppercase tracking-[0.1em] text-grey-dark">
                          Always Active
                        </span>
                        <Toggle checked disabled label="Essential cookies (always active)" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium">Analytics</p>
                        <p className="text-sm text-grey-dark">
                          Used only if analytics services are installed.
                        </p>
                      </div>
                      <Toggle
                        checked={prefs.analytics}
                        onChange={(next) => setPrefs((p) => ({ ...p, analytics: next }))}
                        label="Analytics cookies"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium">Preferences</p>
                        <p className="text-sm text-grey-dark">
                          Used to remember your choices where applicable.
                        </p>
                      </div>
                      <Toggle
                        checked={prefs.preferences}
                        onChange={(next) => setPrefs((p) => ({ ...p, preferences: next }))}
                        label="Preference cookies"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => decide(prefs)}>
                      Save Preferences
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                      onClick={() => decide(ALL_ACCEPTED)}
                    >
                      Accept All
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                      onClick={() => decide(ALL_REJECTED)}
                    >
                      Reject Optional
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
