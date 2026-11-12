import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuroraBackground } from './AuroraBackground';

// Common frame for every page: background, navbar, content and footer.
// `footerCta={false}` drops the closing "free diagnosis" panel, for pages with one goal of their own.
export function PageShell({ children, after, footerCta = true }: { children: ReactNode; after?: ReactNode; footerCta?: boolean }) {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      <AuroraBackground />
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <main>{children}</main>
        <Footer cta={footerCta} />
        {after}
      </div>
    </div>
  );
}
