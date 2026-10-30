import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuroraBackground } from './AuroraBackground';

// Common frame for every page: background, navbar, content and footer.
export function PageShell({ children, after }: { children: ReactNode; after?: ReactNode }) {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      <AuroraBackground />
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <main>{children}</main>
        <Footer />
        {after}
      </div>
    </div>
  );
}
