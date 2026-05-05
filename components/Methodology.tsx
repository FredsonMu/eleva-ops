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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = containerRef.current?.querySelectorAll('.meth-grid-card');
    cards?.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section id="metodo" ref={containerRef} className="bg-[#111111] relative text-white py-24 md:py-48 z-10 selection:bg-white/30 selection:text-white overflow-hidden">
      
      <div className="meth-header max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center mb-16 md:mb-24">
         <span className="meth-header-elem text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40 block mb-6">{t('meth.label')}</span>
         <div className="overflow-hidden pb-4">
            <h2 className="meth-header-elem font-sans text-4xl md:text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-tight text-white mb-6">
              {t('meth.title1')}
            </h2>
         </div>
         <p className="meth-header-elem text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed text-balance">
           {t('meth.subtitle')}
         </p>
      </div>

      <div 
        className="meth-grid max-w-[1200px] mx-auto px-6 md:px-12 relative z-10"
        onMouseMove={handleMouseMove}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {steps.map((step, i) => {
            const isSmall = i === 0 || i === 3;
            const colClass = isSmall ? "md:col-span-5" : "md:col-span-7";
            return (
              <div 
                key={i} 
                className={`${colClass} meth-grid-card bg-[#161616] border border-white/[0.04] rounded-[2rem] p-8 md:p-12 min-h-[350px] md:min-h-[450px] shadow-2xl relative overflow-hidden group flex flex-col justify-between transform-gpu`}
              >
                {/* Spotlight Gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mix-blend-screen"
                  style={{
                    background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)'
                  }}
                />
                
                {/* Big Number floating at top right */}
                <span className="text-[140px] md:text-[220px] leading-[0.7] font-medium tracking-tighter text-white/[0.02] select-none absolute -top-4 -right-8 font-sans pointer-events-none group-hover:scale-[1.05] group-hover:text-white/[0.04] transition-all duration-700 ease-out origin-top-right">
                  {step.id}
                </span>

                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 text-white font-semibold flex items-center justify-center shrink-0 border border-white/10 text-lg shadow-inner group-hover:bg-white/20 transition-all duration-500 group-hover:scale-110 relative z-10">
                  {step.id}
                </div>
                
                <div className="flex flex-col gap-4 relative z-10 mt-12 md:mt-0">
                  <h3 className="text-2xl md:text-4xl font-sans font-medium text-white tracking-tight group-hover:text-white/90 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/50 leading-relaxed font-light mt-2 group-hover:text-white/70 transition-colors max-w-sm md:max-w-md">
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
