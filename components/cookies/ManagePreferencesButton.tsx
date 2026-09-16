"use client";

import { SlidersHorizontal } from "lucide-react";
import Button from "../Button";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function ManagePreferencesButton() {
  return (
    <Button
      variant="secondary"
      icon={<SlidersHorizontal size={16} aria-hidden="true" />}
      iconPosition="left"
      onClick={() => openCookiePreferences()}
    >
      Manage Cookie Preferences
    </Button>
  );
}
