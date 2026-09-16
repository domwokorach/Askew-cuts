"use client";

import { openCookiePreferences } from "@/lib/cookieConsent";

export default function ManagePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className="underline hover:text-grey-dark"
    >
      Manage Cookie Preferences
    </button>
  );
}
