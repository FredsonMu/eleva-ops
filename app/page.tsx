import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';

const About = dynamic(() => import('@/components/About').then(mod => mod.About));
const Services = dynamic(() => import('@/components/Services').then(mod => mod.Services));
const Projects = dynamic(() => import('@/components/Projects').then(mod => mod.Projects));
const Methodology = dynamic(() => import('@/components/Methodology').then(mod => mod.Methodology));
const Team = dynamic(() => import('@/components/Team').then(mod => mod.Team));
const Origin = dynamic(() => import('@/components/Origin').then(mod => mod.Origin));
const FAQ = dynamic(() => import('@/components/FAQ').then(mod => mod.FAQ));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

export default function Home() {
  return (
    <div className="bg-[#fdfdfd] text-[#1d1d1f] selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-hidden">
      
      {/* Global AI Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Primary Blue Aurora */}
         <div className="absolute top-[-10%] left-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] bg-[#007AFF]/[0.15] rounded-full blur-[100px] md:blur-[150px]"></div>
         {/* Secondary Cyan Aurora */}
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-[#00c6ff]/[0.12] rounded-full blur-[100px] md:blur-[140px]"></div>
         {/* Center Accent */}
         <div className="absolute top-[40%] left-[20%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-purple-500/[0.08] rounded-full blur-[100px] md:blur-[120px]"></div>
         {/* Subtle Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Methodology />
        <Team />
        <Origin />
        <FAQ />
      </main>
      <Footer />
      </div>
    </div>
  );
}
