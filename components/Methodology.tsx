'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
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
    <section id="metodo" ref={containerRef} className="bg-[#1d1d1f] relative pt-16 pb-24 md:pt-24 md:pb-32 z-10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
         <div className="w-[100vw] h-[60vw] bg-gradient-to-r from-[#007AFF]/20 via-purple-500/10 to-[#00c6ff]/15 rounded-full blur-[140px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center md:items-start md:text-left mb-16 md:mb-20 gap-6">
         <div className="max-w-3xl">
           <div className="mb-4">
             <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-[#007AFF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
               {t('meth.label')}
             </span>
           </div>
           
           <h2 className="font-sans text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-white text-balance">
             {t('meth.title1')}
           </h2>
         </div>
         
         <div className="max-w-xl">
           <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
             {t('meth.subtitle')}
           </p>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {steps.map((step, i) => {
            const isSmall = i === 0 || i === 3;
            const colClass = isSmall ? "lg:col-span-5" : "lg:col-span-7";
            return (
              <div 
                key={i} 
                className={`${colClass} relative group rounded-[32px] md:rounded-[40px] p-[1px] overflow-hidden min-h-[320px] md:min-h-[400px]`}
              >
                {/* Animated Gradient Border Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-white/40 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Liquid Glass Inner Card */}
                <div 
                  className="relative h-full w-full bg-[#2d2d2f]/40 backdrop-blur-3xl rounded-[31px] md:rounded-[39px] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:bg-[#2d2d2f]/60"
                  style={{ WebkitBackdropFilter: "blur(64px)" }}
                >
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-xl"></div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl"></div>
                  
                  {/* Internal Glow on Hover */}
                  <div className="absolute -inset-[100%] bg-gradient-to-br from-[#007AFF]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none transform translate-y-1/4 translate-x-1/4"></div>

                  <span className="text-[140px] md:text-[200px] leading-[0.7] font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none absolute -top-4 -right-4 font-sans pointer-events-none group-hover:scale-105 group-hover:from-white/20 transition-all duration-700 ease-out origin-top-right">
                    {step.id}
                  </span>
                  
                  <div className="flex flex-col gap-5 relative z-10 mt-16 md:mt-auto">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#007AFF] to-transparent rounded-full opacity-50"></div>
                    <h3 className="text-2xl md:text-3xl font-sans font-semibold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-white/50 leading-relaxed font-medium max-w-sm">
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
