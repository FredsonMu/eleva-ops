'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Origin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.to('.origin-word', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.015,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".origin-quote-container",
        start: "top 85%",
      }
    });

    gsap.to('.origin-card', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".origin-grid-container",
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  const p1Text = t('origin.p1');
  const words = p1Text.split(" ");

  return (
    <section ref={containerRef} className="py-20 md:py-40 relative overflow-hidden bg-transparent">
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Thesis Header (Massive Cover) */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
           <div className="mb-6 md:mb-8">
             <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#007AFF]">
               {t('origin.label')}
             </span>
           </div>
          <h2 className="font-sans text-[clamp(2.5rem,6vw,7rem)] font-semibold tracking-tighter leading-[1] text-[#1d1d1f] text-balance max-w-5xl">
            {t('origin.title1')} <br className="hidden lg:block" />
            <span className="text-black/30 mt-2 block">{t('origin.title2')}</span>
          </h2>
        </div>

        {/* Natural Uncropped Image (Reduced Size for Better Quality) */}
        <div className="max-w-5xl mx-auto w-full relative shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] mb-20 md:mb-32 bg-transparent flex justify-center rounded-[24px] md:rounded-[40px] overflow-hidden border-[0.5px] border-black/10">
          <Image 
            src="/trabalho.png" 
            width={1200}
            height={800}
            className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-1000 ease-out hover:scale-105" 
            alt="Trabalho" 
            priority
          />
        </div>

        {/* Editorial Text (origin.p1) centered & huge (Awwwards Quote Style) */}
        <div className="max-w-5xl mx-auto text-center mb-24 md:mb-40 origin-quote-container">
          <h3 className="font-sans text-[clamp(2rem,3.5vw,4rem)] font-semibold text-[#1d1d1f] leading-[1.1] text-balance tracking-tighter flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 -mb-1">
                <span className="origin-word inline-block transform translate-y-full opacity-0">
                  {word}
                </span>
              </span>
            ))}
          </h3>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="origin-grid-container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-40 max-w-7xl mx-auto">
          
          {/* Column 1 */}
          <div className="origin-card opacity-0 translate-y-[60px] scale-95 group relative flex flex-col bg-white border border-black/5 rounded-[32px] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.02)] overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/20">
             {/* Content */}
             <div className="relative z-10 w-full flex-grow flex flex-col items-start p-8 md:p-10">
               <h4 className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-4 md:mb-6">{t('origin.o1.label')}</h4>
               <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] mb-4 md:mb-6 leading-[1.2] tracking-tight text-balance">
                 {t('origin.o1.title')}
               </p>
               <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed">
                 {t('origin.o1.desc')}
               </p>
             </div>
          </div>

          {/* Column 2 */}
          <div className="origin-card opacity-0 translate-y-[60px] scale-95 group relative flex flex-col bg-white border border-black/5 rounded-[32px] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.02)] overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/20">
             {/* Content */}
             <div className="relative z-10 w-full flex-grow flex flex-col items-start p-8 md:p-10">
               <h4 className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-4 md:mb-6">{t('origin.o2.label')}</h4>
               <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] mb-4 md:mb-6 leading-[1.2] tracking-tight text-balance">
                 {t('origin.o2.title')}
               </p>
               <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed">
                 {t('origin.o2.desc')}
               </p>
             </div>
          </div>

          {/* Column 3 */}
          <div className="origin-card opacity-0 translate-y-[60px] scale-95 group relative flex flex-col bg-white border border-black/5 rounded-[32px] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.02)] overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/20">
             {/* Content */}
             <div className="relative z-10 w-full flex-grow flex flex-col items-start p-8 md:p-10">
               <h4 className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-4 md:mb-6">{t('origin.o3.label')}</h4>
               <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] mb-4 md:mb-6 leading-[1.2] tracking-tight text-balance">
                 {t('origin.o3.title')}
               </p>
               <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed mb-6">
                 {t('origin.o3.desc')}
               </p>
               
               {/* Tags for Column 3 moved here gracefully */}
               <div className="flex flex-wrap gap-2 mt-auto w-full pt-4">
                   <span className="px-4 py-2 rounded-lg border border-black/5 bg-black/[0.02] text-xs font-bold tracking-tight shadow-sm backdrop-blur-md">
                     <span className="text-black/40">{t('origin.o3.b1')}</span> <span className="text-[#1d1d1f]">{t('origin.o3.b2')}</span>
                   </span>
                   <span className="px-4 py-2 rounded-lg border border-black/5 bg-black/[0.02] text-xs font-bold tracking-tight shadow-sm backdrop-blur-md">
                     <span className="text-black/40">{t('origin.o3.b1')}</span> <span className="text-[#1d1d1f]">{t('origin.o3.b3')}</span>
                   </span>
                   <span className="px-4 py-2 rounded-lg border border-[#007AFF]/20 bg-[#007AFF]/5 text-[#007AFF] text-xs font-bold tracking-tight shadow-sm backdrop-blur-md">
                     {t('origin.o3.b1')} {t('origin.o3.b4')}
                   </span>
               </div>
             </div>
          </div>

        </div>

        {/* Footer Conclusion */}
        <div className="flex flex-col items-center text-center pb-10">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight text-balance mb-8 md:mb-12 max-w-4xl mx-auto">
            {t('origin.footer.t1')} <br className="hidden md:block" />
            <span className="text-black/30 mt-2 block">{t('origin.footer.t2')}</span>
          </h2>
          <span className="bg-[#fbfbfd] border border-black/5 px-6 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#007AFF] shadow-sm">
            {t('origin.footer.pill')}
          </span>
        </div>
        
      </div>
    </section>
  );
}
