'use client';
import React, { useRef } from 'react';
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
          <h2 className="font-sans text-[clamp(2.5rem,6vw,7rem)] font-semibold tracking-tighter leading-[1] text-[#1d1d1f] dark:text-white text-balance max-w-5xl">
            {t('origin.title1')} <br className="hidden lg:block" />
            <span className="text-black/30 dark:text-white/30 mt-2 block">{t('origin.title2')}</span>
          </h2>
        </div>

        {/* Split Layout: Image on Left, Quote on Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 mb-24 md:mb-40 max-w-7xl mx-auto origin-quote-container">
          
          {/* Left: The "Jewel" Image Container */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] md:max-w-[480px] group perspective-1000">
               {/* Ethereal Glow */}
               <div className="absolute -inset-8 bg-gradient-to-tr from-[#007AFF]/20 via-[#007AFF]/5 to-transparent rounded-[50px] blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"></div>
               
               {/* 3D Floating Glass Card */}
               <div className="relative p-2 md:p-3 bg-white/60 dark:bg-white/5 backdrop-blur-3xl rounded-[32px] md:rounded-[48px] border-[0.5px] border-black/10 dark:border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] transition-all duration-700 ease-out group-hover:-translate-y-4 md:group-hover:rotate-2 group-hover:border-[#007AFF]/20">
                 
                 <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden bg-black/5 dark:bg-black/40 aspect-[4/3]">
                   <Image 
                     src="/trabalho.png" 
                     fill
                     className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-1000 ease-out group-hover:scale-110" 
                     alt="Trabalho" 
                     priority
                   />
                   
                   {/* Inner Shadow Overlay */}
                   <div className="absolute inset-0 shadow-inner rounded-[24px] md:rounded-[40px] pointer-events-none border border-black/5 dark:border-white/10"></div>
                 </div>
                 
                 {/* Elegant Floating Badge */}
                 <div className="absolute -bottom-4 -right-4 md:-bottom-5 md:-right-8 bg-white dark:bg-[#040914] border border-black/10 dark:border-white/10 px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10">
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#007AFF]">
                     The Process
                   </span>
                 </div>

               </div>
            </div>
          </div>

          {/* Right: Editorial Text (origin.p1) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            <h3 className="font-sans text-[clamp(1.35rem,5.5vw,1.75rem)] md:text-[clamp(1.75rem,3vw,3.5rem)] font-semibold text-[#1d1d1f] dark:text-white leading-[1.2] md:leading-[1.15] text-justify md:text-left md:text-balance tracking-tight md:tracking-tighter block" lang="en">
              {words.map((word, i) => (
                <React.Fragment key={i}>
                  <span className="inline-flex overflow-hidden pb-1 -mb-1 align-bottom">
                    <span className="origin-word inline-block transform translate-y-full opacity-0">
                      {word}
                    </span>
                  </span>
                  {i < words.length - 1 && ' '}
                </React.Fragment>
              ))}
            </h3>
            
            {/* Subtle aesthetic line below the text */}
            <div className="w-16 h-1 bg-gradient-to-r from-[#007AFF] to-transparent rounded-full mt-10 opacity-60"></div>
          </div>
          
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="origin-grid-container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-40 max-w-7xl mx-auto">
          
          {/* Column 1 */}
          <div className="origin-card opacity-0 translate-y-[60px] scale-95 group relative flex flex-col bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.02)] overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/20">
             {/* Content */}
             <div className="relative z-10 w-full flex-grow flex flex-col items-start p-8 md:p-10">
               <h4 className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-4 md:mb-6">{t('origin.o1.label')}</h4>
               <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] dark:text-white mb-4 md:mb-6 leading-[1.2] tracking-tight text-balance">
                 {t('origin.o1.title')}
               </p>
               <p className="text-base md:text-lg text-black/60 dark:text-white/60 font-medium leading-relaxed">
                 {t('origin.o1.desc')}
               </p>
             </div>
          </div>

          {/* Column 2 */}
          <div className="origin-card opacity-0 translate-y-[60px] scale-95 group relative flex flex-col bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.02)] overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/20">
             {/* Content */}
             <div className="relative z-10 w-full flex-grow flex flex-col items-start p-8 md:p-10">
               <h4 className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-4 md:mb-6">{t('origin.o2.label')}</h4>
               <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] dark:text-white mb-4 md:mb-6 leading-[1.2] tracking-tight text-balance">
                 {t('origin.o2.title')}
               </p>
               <p className="text-base md:text-lg text-black/60 dark:text-white/60 font-medium leading-relaxed">
                 {t('origin.o2.desc')}
               </p>
             </div>
          </div>

          {/* Column 3 */}
          <div className="origin-card opacity-0 translate-y-[60px] scale-95 group relative flex flex-col bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[32px] shadow-[0_4px_24px_-10px_rgba(0,0,0,0.02)] overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,122,255,0.15)] hover:border-[#007AFF]/20">
             {/* Content */}
             <div className="relative z-10 w-full flex-grow flex flex-col items-start p-8 md:p-10">
               <h4 className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-4 md:mb-6">{t('origin.o3.label')}</h4>
               <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] dark:text-white mb-4 md:mb-6 leading-[1.2] tracking-tight text-balance">
                 {t('origin.o3.title')}
               </p>
               <p className="text-base md:text-lg text-black/60 dark:text-white/60 font-medium leading-relaxed mb-6">
                 {t('origin.o3.desc')}
               </p>
               
               {/* Tags for Column 3 moved here gracefully */}
               <div className="flex flex-wrap gap-2 mt-auto w-full pt-4">
                   <span className="px-4 py-2 rounded-lg border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-bold tracking-tight shadow-sm backdrop-blur-md">
                     <span className="text-black/40 dark:text-white/40">{t('origin.o3.b1')}</span> <span className="text-[#1d1d1f] dark:text-white">{t('origin.o3.b2')}</span>
                   </span>
                   <span className="px-4 py-2 rounded-lg border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-bold tracking-tight shadow-sm backdrop-blur-md">
                     <span className="text-black/40 dark:text-white/40">{t('origin.o3.b1')}</span> <span className="text-[#1d1d1f] dark:text-white">{t('origin.o3.b3')}</span>
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
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-semibold text-[#1d1d1f] dark:text-white leading-[1.1] tracking-tight text-balance mb-8 md:mb-12 max-w-4xl mx-auto">
            {t('origin.footer.t1')} <br className="hidden md:block" />
            <span className="text-black/30 dark:text-white/30 mt-2 block">{t('origin.footer.t2')}</span>
          </h2>
          <div className="relative inline-flex p-[1.5px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,122,255,0.1)] group hover:scale-[1.02] transition-transform duration-300">
            {/* Spinning Gradient Border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_6s_linear_infinite] opacity-100 md:opacity-30 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] aspect-square bg-[conic-gradient(from_180deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_6s_linear_infinite] opacity-100 md:opacity-30 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative bg-[#fbfbfd] dark:bg-[#040914] px-6 py-3 rounded-full flex items-center justify-center w-full h-full z-10 border border-black/5 dark:border-white/5">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#007AFF]">
                {t('origin.footer.pill')}
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
