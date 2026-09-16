const STORAGE_KEY = "askew-cuts:cookie-consent";
const CONSENT_VERSION = 1;

/** Custom event name used to re-open the preferences panel from any page (e.g. the Cookie Policy page). */
export const OPEN_COOKIE_PREFERENCES_EVENT = "askew-cuts:open-cookie-preferences";

export interface CookiePreferences {
  analytics: boolean;
  preferences: boolean;
}

interface StoredConsent {
  version: number;
  decidedAt: string;
  preferences: CookiePreferences;
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  analytics: false,
  preferences: false,
};

export const ALL_ACCEPTED: CookiePreferences = {
  analytics: true,
  preferences: true,
};

export const ALL_REJECTED: CookiePreferences = {
  analytics: false,
  preferences: false,
};

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    preferences,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT));
}
