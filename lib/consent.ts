// Cookie consent for marketing (Meta Pixel). Nothing that sets cookies loads until the visitor
// says yes; the choice is kept on the device and can be changed from the footer link.

export type Consent = 'granted' | 'denied';

const KEY = 'eleva-consent';
export const CONSENT_EVENT = 'eleva:consent';
export const OPEN_CONSENT_EVENT = 'eleva:open-consent';

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try { localStorage.setItem(KEY, value); } catch { /* storage blocked: asks again next visit */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
