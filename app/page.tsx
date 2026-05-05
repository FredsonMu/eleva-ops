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
    <div className="bg-white text-black selection:bg-black selection:text-white min-h-screen relative">
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
  );
}
