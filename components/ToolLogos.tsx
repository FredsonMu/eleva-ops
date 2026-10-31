import {
  siAnthropic, siGmail, siGooglecalendar, siGoogledrive, siGooglesheets, siHubspot, siN8n,
  siNotion, siOpenai, siShopify, siSlack, siStripe, siWhatsapp, siWordpress, type SimpleIcon,
} from 'simple-icons';

// Real logos of tools we connect to (paths from Simple Icons, CC0; the marks belong to their
// owners). Grey by default so the row stays quiet, brand colour on hover.

const TOOLS: SimpleIcon[] = [
  siWhatsapp, siGmail, siGooglesheets, siGooglecalendar, siGoogledrive, siSlack, siNotion,
  siHubspot, siStripe, siShopify, siWordpress, siN8n, siOpenai, siAnthropic,
];

export function ToolLogos({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-center text-[13px] font-medium text-black/45 dark:text-white/45">{label}</p>
      <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-7 gap-y-5 md:gap-x-9">
        {TOOLS.map(icon => (
          <li key={icon.slug} title={icon.title} className="group">
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={icon.title}
              className="h-6 w-6 fill-black/35 dark:fill-white/40 transition-[fill] duration-300"
              style={{ ['--brand' as string]: `#${icon.hex}` }}
            >
              <path d={icon.path} className="group-hover:fill-[var(--brand)]" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
