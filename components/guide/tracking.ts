'use client';
import { TRACKING_PARAMS, type Tracking } from '@/lib/guide';

// Campaign parameters (UTM / fbclid) are kept in memory only — not in cookies or browser
// storage — so no consent is needed under the ePrivacy rules. Client-side navigation keeps
// this module alive, so they survive moving around the site before submitting the form;
// a full page reload on another page starts fresh.
let captured: Tracking = {};

function fromUrl(): Tracking {
  const params = new URLSearchParams(window.location.search);
  const found: Tracking = {};
  for (const key of TRACKING_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

// Call on page load: when the URL carries campaign parameters (latest ad click) they
// replace the ones captured earlier in this visit.
export function captureTracking() {
  const current = fromUrl();
  if (Object.keys(current).length) captured = current;
}

// Parameters to send with the lead: the URL's, else the ones captured earlier in this visit.
export function getTracking(): Tracking {
  const current = fromUrl();
  return Object.keys(current).length ? current : captured;
}
