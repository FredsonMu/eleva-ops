import { Fragment, type ReactNode } from 'react';

// The brand name must never be machine-translated: "Eleva" is also a Portuguese verb, so
// browser translators (Google Translate, Safari, Edge) turn it into words like "Elevador".
// `translate="no"` + `notranslate` are honoured by all of them.

export function Brand({ children }: { children: ReactNode }) {
  return (
    <span translate="no" className="notranslate">
      {children}
    </span>
  );
}

const BRAND_RE = /(Eleva ?Ops|ELEVA ?OPS|ELEVA Ops|elevaops(?:\.core)?)/g;

// Renders a sentence, protecting every mention of the brand inside it.
export function BrandText({ text }: { text: string }) {
  const parts = text.split(BRAND_RE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <Brand key={i}>{part}</Brand> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
