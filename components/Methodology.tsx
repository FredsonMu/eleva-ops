'use client';
import { useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const steps = [
    { id: "01", title: t('meth.s1.t'), desc: t('meth.s1.d') },
    { id: "02", title: t('meth.s2.t'), desc: t('meth.s2.d') },
    { id: "03", title: t('meth.s3.t'), desc: t('meth.s3.d') },
    { id: "04", title: t('meth.s4.t'), desc: t('meth.s4.d') }
  ];

  return (
    <section id="metodo" ref={containerRef} className="bg-transparent relative pt-8 pb-20 md:pt-8 md:pb-32 z-10 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center text-center lg:items-end lg:justify-between lg:text-left mb-16 md:mb-20 gap-8 lg:gap-16">
         <div className="max-w-3xl lg:max-w-2xl">
           <div className="mb-4 flex justify-center lg:justify-start">
             <span className="inline-block px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-[#007AFF]">
               {t('meth.label')}
             </span>
           </div>
           
           <h2 className="font-sans text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-[#1d1d1f] dark:text-white text-balance">
             {t('meth.title1')}
           </h2>
         </div>
         
         <div className="max-w-xl lg:max-w-[450px] shrink-0 lg:pb-3">
           <p className="text-lg md:text-xl text-black/60 dark:text-white/60 font-medium leading-relaxed">
             {t('meth.subtitle')}
           </p>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {steps.map((step, i) => {
            const isSmall = i === 0 || i === 3;
            const colClass = isSmall ? "lg:col-span-5" : "lg:col-span-7";
            return (
              <div 
                key={i} 
                className={`${colClass} relative group rounded-[24px] md:rounded-[40px] p-[1px] overflow-hidden min-h-[300px] md:min-h-[400px]`}
              >
                {/* Border Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/0 to-black/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Clean Notion-style Inner Card */}
                <div 
                  className="relative h-full w-full bg-white/60 dark:bg-white/5 backdrop-blur-3xl rounded-[23px] md:rounded-[39px] p-6 md:p-10 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out group-hover:bg-white/90 dark:group-hover:bg-white/10 border-[1.5px] border-black/10 dark:border-white/10 group-hover:border-[#007AFF]/20 dark:group-hover:border-[#007AFF]/30"
                >
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-black/5 dark:border-white/10 rounded-tl-xl hidden md:block"></div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-black/5 dark:border-white/10 rounded-br-xl hidden md:block"></div>
                  
                  {/* Internal Glow on Hover */}
                  <div className="absolute -inset-[100%] bg-gradient-to-br from-[#007AFF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none transform translate-y-1/4 translate-x-1/4"></div>

                  <span className="text-[140px] md:text-[200px] leading-[0.7] font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent select-none absolute -top-4 -right-4 font-sans pointer-events-none group-hover:scale-105 group-hover:from-black/10 dark:group-hover:from-white/10 transition-all duration-700 ease-out origin-top-right">
                    {step.id}
                  </span>
                  
                  <div className="flex flex-col gap-3 md:gap-5 relative z-10 mt-16 md:mt-auto">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#007AFF] to-transparent rounded-full opacity-40"></div>
                    <h3 className="text-xl md:text-3xl font-sans font-bold text-[#1d1d1f] dark:text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-lg text-black/60 dark:text-white/60 leading-relaxed font-medium max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
