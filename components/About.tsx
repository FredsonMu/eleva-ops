'use client';
import { motion } from 'motion/react';
import { useLanguage } from '@/lib/i18n';
import { X, Check, TrendingUp } from 'lucide-react';

export function About() {
  const { t } = useLanguage();
  const springConfig = { type: "spring" as const, stiffness: 100, damping: 20 };

  return (
    <section id="about" className="py-24 md:py-32 relative z-10 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springConfig}
            className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-4"
          >
            {t('about.manifesto')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springConfig, delay: 0.1 }}
            className="font-sans font-semibold text-[clamp(2rem,3vw,3rem)] tracking-tight leading-tight text-[#1d1d1f] max-w-2xl text-balance"
          >
            {t('about.title1')} <span className="text-black/40">{t('about.title2')}</span>
          </motion.h2>
        </div>

        {/* Editorial Problem Statement (No Card) */}
        <div className="w-full max-w-6xl mx-auto mb-16 md:mb-32 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h3 className="font-sans text-[clamp(2rem,3vw,3rem)] font-bold text-[#1d1d1f] leading-[1.1] tracking-tight mb-10 text-balance">
              Too many tools that don't talk to each other. <br className="hidden lg:block"/>
              <span className="text-black/30">Information lost in endless WhatsApp threads. Manual tasks draining your best team's energy.</span>
            </h3>
            
            <div className="pl-6 border-l-[3px] border-[#007AFF] py-2 mb-8">
              <p className="font-sans text-xl md:text-2xl text-[#1d1d1f] font-semibold tracking-tight">
                Your business is being choked by its own operation.
              </p>
            </div>
            
            <p className="font-sans text-lg text-black/50 leading-relaxed max-w-lg font-medium">
              Eleva Ops exists to cut the noise. We design the invisible architecture that allows your company to scale. We replace chaos with systems focused on organization, clarity, and conversion.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[400px] md:min-h-[500px]">
            
            {/* Organic Fluid Blob Shape (No Borders) */}
            <div 
              className="relative w-[90%] max-w-[480px] aspect-square overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] bg-gray-100 transition-all duration-700 ease-out hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] hover:scale-[1.02]"
              style={{
                borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%"
              }}
            >
              <img
                src="/usar.png"
                className="object-cover object-center w-full h-full scale-[1.05]"
                alt="Software Interface"
              />
            </div>

          </div>

        </div>

        {/* Cardless Typographical Presentation */}
        <div className="w-full max-w-5xl mx-auto border-t border-black/10 pt-16 md:pt-24">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-8">
            
            {/* Chaos (Faded, Old Way) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="flex-[0.8] flex flex-col items-center lg:items-start text-center lg:text-left relative"
            >
               {/* Decorative Element */}
               <div className="absolute top-0 right-10 w-12 h-12 rounded-full border border-black border-dashed opacity-[0.05] animate-[spin_12s_linear_infinite] pointer-events-none hidden lg:block"></div>
               <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center mb-6 border border-black/10">
                 <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
               </div>

               <span className="text-[10px] uppercase tracking-widest font-bold text-black/30 mb-4">The Old Way</span>
               <h3 className="text-4xl md:text-5xl font-sans font-bold text-black/20 tracking-tight line-through decoration-2 mb-4">Chaos</h3>
               <p className="text-black/40 font-medium text-base md:text-lg text-balance">Manual processes and endless bottlenecks draining your team's energy.</p>
            </motion.div>

            {/* Elegant Divider */}
            <div className="hidden lg:block w-[1px] bg-gradient-to-b from-black/5 via-black/10 to-transparent"></div>
            <div className="block lg:hidden h-[1px] w-full max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>

            {/* Order (The New Standard) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="flex-[0.8] flex flex-col items-center lg:items-start text-center lg:text-left relative lg:px-4"
            >
               {/* Decorative Element */}
               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#007AFF]/5 rounded-full blur-2xl pointer-events-none"></div>
               <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,122,255,0.2)] border border-[#007AFF]/20">
                 <div className="w-2 h-2 rounded-full bg-[#007AFF]"></div>
               </div>

               <span className="text-[10px] uppercase tracking-widest font-bold text-[#007AFF] mb-4 relative z-10">The New Standard</span>
               <h3 className="text-4xl md:text-5xl font-sans font-bold text-[#1d1d1f] tracking-tight mb-4 relative z-10">Order</h3>
               <p className="text-black/60 font-medium text-base md:text-lg text-balance relative z-10">Integrated systems and automated workflows that scale gracefully without you.</p>
            </motion.div>

            {/* Outcome (Restored Card) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.3 }}
              className="flex-[1.4] w-full bg-[#f8f8fa] border border-black/5 rounded-[24px] md:rounded-[40px] p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm"
            >
              {/* Background minimal chart graphic */}
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 100 L50 60 L100 80 L180 20" stroke="#007AFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M150 20 L180 20 L180 50" stroke="#007AFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-3 md:mb-4 z-10">
                Outcome
              </span>
              <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#1d1d1f] z-10 leading-[1.1] text-balance">
                Free Time & <br className="hidden md:block" /> Profit
              </h3>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
