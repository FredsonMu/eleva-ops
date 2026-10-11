import Image from 'next/image';

// The Eleva Ops symbol (E + rising arrow). Dark version on light theme, white version on
// dark theme; the hidden one is lazy and never downloaded.
export function LogoMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center" aria-hidden="true">
      <Image src="/logo-mark.png" alt="" width={265} height={210} sizes="48px" className={`${className} dark:hidden`} />
      <Image src="/logo-mark-white.png" alt="" width={265} height={210} sizes="48px" className={`${className} hidden dark:block`} />
    </span>
  );
}
