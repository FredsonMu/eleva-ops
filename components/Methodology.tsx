'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  
  const steps = [
    { id: "01", title: t('meth.s1.t'), desc: t('meth.s1.d') },
    { id: "02", title: t('meth.s2.t'), desc: t('meth.s2.d') },
    { id: "03", title: t('meth.s3.t'), desc: t('meth.s3.d') },
    { id: "04", title: t('meth.s4.t'), desc: t('meth.s4.d') }
  ];

  useGSAP(() => {
    // Header animation
    gsap.fromTo(".meth-header-elem", 
      { opacity: 0, y: 30 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: { trigger: ".meth-header", start: "top 80%" }
      }
    );

    // Grid Cards Animation
    gsap.fromTo(".meth-grid-card",
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".meth-grid",
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="metodo" ref={containerRef} className="bg-[#111111] relative py-32 md:py-52 z-10 overflow-hidden">
      
      {/* Playful background pattern (dots) - adjusted for dark mode */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="meth-header max-w-[1300px] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
         
         <div className="flex-1 max-w-4xl">
           <div className="meth-header-elem mb-8">
             <span className="font-handwritten text-2xl md:text-3xl text-[#007AFF] font-bold inline-block px-6 py-2 border-2 border-[#007AFF] rounded-[2rem] bg-[#007AFF]/10 transform -rotate-2">
               {t('meth.label')}
             </span>
           </div>
           
           <div className="overflow-hidden pb-4 relative">
              <h2 className="meth-header-elem font-sans text-5xl md:text-[clamp(4rem,6vw,6rem)] leading-[0.95] font-black tracking-tight text-white text-balance relative z-10">
                {t('meth.title1')}
                {/* Hand-drawn scribble behind/under text */}
                <svg className="absolute -bottom-2 left-0 w-[90%] h-8 text-[#FFD500] -z-10" viewBox="0 0 200 30" preserveAspectRatio="none">
                  <path d="M0,15 C50,25 150,5 200,20" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </h2>
           </div>
         </div>
         
         <div className="lg:w-1/3 lg:pb-6">
           <p className="meth-header-elem text-xl md:text-2xl text-white/70 font-medium leading-relaxed">
             {t('meth.subtitle')}
           </p>
         </div>
      </div>

      <div className="meth-grid max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {steps.map((step, i) => {
            const isSmall = i === 0 || i === 3;
            const colClass = isSmall ? "md:col-span-5" : "md:col-span-7";
            return (
              <div 
                key={i} 
                className={`${colClass} meth-grid-card bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 min-h-[350px] md:min-h-[450px] shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group flex flex-col justify-between transform-gpu transition-all duration-500 hover:-translate-y-2`}
              >
                
                {/* Big Number floating at top right */}
                <span className="text-[140px] md:text-[220px] leading-[0.7] font-black tracking-tighter text-white/[0.03] select-none absolute -top-4 -right-8 font-sans pointer-events-none group-hover:scale-[1.05] group-hover:text-white/[0.05] transition-all duration-700 ease-out origin-top-right">
                  {step.id}
                </span>

                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#007AFF]/20 text-[#007AFF] font-mono font-black flex items-center justify-center shrink-0 border-2 border-[#007AFF]/30 text-xl shadow-sm group-hover:bg-[#007AFF] transition-all duration-500 group-hover:scale-110 relative z-10 group-hover:text-white transform -rotate-3 group-hover:rotate-0">
                  {step.id}
                </div>
                
                <div className="flex flex-col gap-4 relative z-10 mt-16 md:mt-0">
                  <h3 className="text-3xl md:text-4xl font-sans font-black text-white tracking-tight group-hover:text-[#007AFF] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed font-medium mt-2 max-w-sm md:max-w-md">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
