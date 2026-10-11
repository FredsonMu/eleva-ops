import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Methodology } from '@/components/Methodology';
import { Team } from '@/components/Team';
import { Origin } from '@/components/Origin';
import { Contact } from '@/components/Contact';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { AuroraBackground } from '@/components/AuroraBackground';

// Plain imports on purpose: every section is server-rendered and needed on first load,
// so `next/dynamic` only added Suspense boundaries that streamed the page in late
// (spinners first, content swapped in ~300ms later with a full relayout).

export default function Home() {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      
      {/* Global AI Aurora Background */}
      <AuroraBackground />

      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <main>
        <Hero />
        <About />
        <Services />

        <Methodology />
        <Team />
        <Origin />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      </div>
    </div>
  );
}
