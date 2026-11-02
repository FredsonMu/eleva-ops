'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_EVENT, getConsent } from '@/lib/consent';
import { LEAD_EVENT } from './guide/GuideLeadForm';
import { CONTACT_EVENT } from '@/lib/contact';

// Meta Pixel, loaded only after the visitor accepts marketing cookies (GDPR / Law 41/2004).
// Sends PageView on every page, Lead only when a guide lead was actually stored (using the
// lead id as eventID so it can be deduplicated with a future Conversions API), and Contact
// when the contact form was sent successfully.

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '3261345990742691';

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

function loadPixel() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  fbq('init', PIXEL_ID);
}

export function MetaPixel() {
  const pathname = usePathname();
  const active = useRef(false);

  // start once consent is (or becomes) granted
  useEffect(() => {
    const start = () => {
      if (active.current || getConsent() !== 'granted') return;
      active.current = true;
      loadPixel();
      window.fbq?.('track', 'PageView');
    };
    start();
    const onConsent = () => start();
    const onLead = (e: Event) => {
      const detail = (e as CustomEvent<{ leadId?: string; guide?: string }>).detail;
      const leadId = detail?.leadId;
      if (active.current) window.fbq?.('track', 'Lead', { content_name: detail?.guide ?? '7 AI Agents' }, leadId ? { eventID: leadId } : undefined);
    };
    const onContact = () => {
      if (active.current) window.fbq?.('track', 'Contact');
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(LEAD_EVENT, onLead);
    window.addEventListener(CONTACT_EVENT, onContact);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(LEAD_EVENT, onLead);
      window.removeEventListener(CONTACT_EVENT, onContact);
    };
  }, []);

  // PageView on client-side navigation (the first one is sent above)
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (active.current) window.fbq?.('track', 'PageView');
  }, [pathname]);

  return null;
}
