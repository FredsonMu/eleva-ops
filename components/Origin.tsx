'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export function Origin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const { t } = useLanguage();

  const springConfig = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <section ref={containerRef} className="py-24 md:py-40 relative overflow-hidden bg-white">
      
      <div className="absolute inset-0">
         <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#007AFF]/3 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Thesis Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={springConfig}
             className="mb-6"
           >
             <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF]">
               {t('origin.label')}
             </span>
           </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springConfig, delay: 0.1 }}
            className="font-sans text-[clamp(2.5rem,5vw,5.5rem)] font-semibold tracking-tighter leading-[1.05] text-[#1d1d1f] text-balance max-w-4xl"
          >
            {t('origin.title1')} <br className="hidden lg:block" />
            <span className="text-black/30 mt-2 block">{t('origin.title2')}</span>
          </motion.h2>
        </div>

        {/* Manifesto Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start relative pb-20 lg:pb-0 text-center lg:text-left">
          
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-center lg:items-start gap-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springConfig}
              className="font-sans text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight"
            >
              Manifesto.
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="text-lg md:text-xl text-black/60 font-medium leading-relaxed text-balance"
            >
              {t('origin.p1')}
            </motion.p>
            
            <div className="mt-8 relative w-full aspect-[4/5] rounded-[40px] overflow-hidden ios-card p-2">
              <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                <motion.div style={{ y: imgY }} className="absolute inset-[-10%] w-[120%] h-[120%] bg-gray-100">
                  <Image src="/imagem manifesto.jpeg" fill className="object-cover" alt="Manifesto" />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-16 md:gap-24 lg:pt-10">
             
             {/* Core principles in clean tags */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={springConfig}
               className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
             >
               <span className="bg-[#fbfbfd] border border-black/5 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest text-[#1d1d1f] uppercase shadow-sm">{t('origin.fewer')}</span>
               <span className="bg-[#fbfbfd] border border-black/5 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest text-[#1d1d1f] uppercase shadow-sm">{t('origin.more')}</span>
               <span className="bg-[#007AFF] shadow-lg shadow-[#007AFF]/20 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest text-white uppercase">{t('origin.total')} {t('origin.integration')}</span>
             </motion.div>

             {/* Point 1 */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={springConfig}
               className="relative lg:pl-10 lg:border-l lg:border-black/10 flex flex-col items-center lg:items-start"
             >
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#007AFF] mb-4">{t('origin.o1.label')}</h4>
                <p className="text-2xl md:text-4xl font-semibold text-[#1d1d1f] mb-6 leading-[1.2] tracking-tight text-balance">
                  {t('origin.o1.title')}
                </p>
                <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed max-w-2xl">
                  {t('origin.o1.desc')}
                </p>
             </motion.div>

             {/* Point 2 */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ ...springConfig, delay: 0.1 }}
               className="relative lg:pl-10 lg:border-l lg:border-black/10 flex flex-col items-center lg:items-start"
             >
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#007AFF] mb-4">{t('origin.o2.label')}</h4>
                <p className="text-2xl md:text-4xl font-semibold text-[#1d1d1f] mb-6 leading-[1.2] tracking-tight text-balance">
                  {t('origin.o2.title')}
                </p>
                <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed max-w-2xl">
                  {t('origin.o2.desc')}
                </p>
             </motion.div>
             
          </div>
        </div>

        {/* Point 3 - Full Width Layout */}
        <div className="mt-24 md:mt-40 max-w-5xl mx-auto pb-10">
           <motion.div 
             initial={{ opacity: 0, y: 50, scale: 0.95 }}
             whileInView={{ opacity: 1, y: 0, scale: 1 }}
             viewport={{ once: true }}
             transition={springConfig}
             className="relative flex flex-col items-center text-center w-full ios-card p-12 md:p-24 rounded-[48px]"
           >
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#007AFF] mb-8">
                {t('origin.o3.label')}
              </h4>
              
              <p className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight text-balance mb-12 max-w-3xl mx-auto">
                {t('origin.o3.title')}
              </p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-12">
                 <div className="text-xl md:text-2xl font-bold tracking-tight">
                   <span className="text-black/40">{t('origin.o3.b1')}</span> <span className="text-[#1d1d1f]">{t('origin.o3.b2')}</span>
                 </div>
                 <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-black/10"></div>
                 <div className="text-xl md:text-2xl font-bold tracking-tight">
                   <span className="text-black/40">{t('origin.o3.b1')}</span> <span className="text-[#1d1d1f]">{t('origin.o3.b3')}</span>
                 </div>
                 <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-black/10"></div>
                 <div className="text-xl md:text-2xl font-bold tracking-tight text-[#007AFF]">
                   {t('origin.o3.b1')} {t('origin.o3.b4')}
                 </div>
              </div>
              
              <p className="text-lg md:text-xl text-black/60 font-medium leading-relaxed max-w-2xl mx-auto text-balance">
                {t('origin.o3.desc')}
              </p>
           </motion.div>
        </div>

        {/* Footer Conclusion */}
        <div className="mt-24 md:mt-32 flex flex-col items-center text-center pb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springConfig}
            className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] leading-[1.1] tracking-tight text-balance mb-10 max-w-4xl mx-auto"
          >
            {t('origin.footer.t1')} <br className="hidden md:block" />
            <span className="text-black/30 mt-2 block">{t('origin.footer.t2')}</span>
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...springConfig, delay: 0.1 }}
            className="bg-[#fbfbfd] border border-black/5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#007AFF] shadow-sm"
          >
            {t('origin.footer.pill')}
          </motion.span>
        </div>
        
      </div>
    </section>
  );
}
