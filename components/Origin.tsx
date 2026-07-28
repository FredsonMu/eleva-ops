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
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const { t } = useLanguage();

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Thesis Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
           <div className="mb-10">
             <span className="font-handwritten text-xl md:text-2xl text-[#007AFF] font-bold transform -rotate-2 inline-block px-6 py-2 border-2 border-[#007AFF] rounded-[2rem] bg-[#007AFF]/5 shadow-sm">
               {t('origin.label')}
             </span>
           </div>
          <h2 className="font-sans text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tight leading-[1.05] text-[#111111] text-balance">
            {t('origin.title1')} <br className="hidden lg:block" />
            <span className="relative inline-block mt-2 lg:mt-4">
              <span className="relative z-10 text-[#111111]">{t('origin.title2')}</span>
              {/* Hand-drawn yellow underline */}
              <svg className="absolute -bottom-1 md:-bottom-3 left-0 w-full h-4 md:h-6 text-[#FFD500] -z-10" viewBox="0 0 200 30" preserveAspectRatio="none">
                <path d="M0,15 C50,30 150,10 200,20" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Manifesto Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start relative pb-20 lg:pb-0">
          
          {/* Typographic Collage (Fills the bottom-left empty space) */}
          <div className="hidden lg:block absolute bottom-0 left-0 w-[45%] h-[400px] xl:h-[500px] pointer-events-none z-10">
             <div className="relative w-full h-full flex flex-col items-center justify-center">
                
                {/* FEWER TOOLS */}
                <motion.div 
                  initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
                  whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="absolute top-[10%] left-[2%] xl:left-[10%] bg-[#FF453A] px-4 py-1 xl:px-6 xl:py-2 shadow-xl"
                >
                  <span className="font-sans text-4xl xl:text-5xl font-black text-white uppercase tracking-tighter">{t('origin.fewer')}</span>
                </motion.div>
                
                {/* MORE STRATEGY */}
                <motion.div 
                  initial={{ opacity: 0, rotate: 15, scale: 0.5 }}
                  whileInView={{ opacity: 1, rotate: 8, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
                  className="absolute top-[28%] right-[2%] xl:right-[5%] bg-[#007AFF] px-4 py-1 xl:px-6 xl:py-2 shadow-xl"
                >
                  <span className="font-sans text-4xl xl:text-5xl font-black text-white uppercase tracking-tighter">{t('origin.more')}</span>
                </motion.div>

                {/* TOTAL INTEGRATION PERIOD. */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute top-[70%] left-[15%] xl:left-[20%] flex flex-col items-start gap-1"
                >
                  <span className="inline-block bg-[#FFD500] text-[#111111] font-sans text-sm xl:text-base font-black uppercase tracking-widest px-3 py-1 shadow-md transform -rotate-3 mb-1 border-2 border-white">{t('origin.total')}</span>
                  <span className="relative font-sans text-4xl xl:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-none my-1">
                    {t('origin.integration')}
                    {/* Yellow zig-zag/underline decoration */}
                    <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#FFD500] -z-10" viewBox="0 0 200 30" preserveAspectRatio="none">
                      <path d="M0,15 L20,5 L40,25 L60,5 L80,25 L100,5 L120,25 L140,5 L160,25 L180,5 L200,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <span className="font-sans text-2xl xl:text-3xl font-black text-[#111111] uppercase tracking-tighter">
                    {t('origin.period')}<span className="text-[#007AFF]">.</span>
                  </span>
                </motion.div>
             </div>
          </div>
          
          <div className="lg:col-span-5 lg:sticky lg:top-40 flex flex-col gap-8 md:gap-10">
            <h3 className="font-sans text-4xl md:text-5xl font-black text-[#111111] tracking-tight">Manifesto.</h3>
            <p className="text-xl md:text-2xl text-[#555555] font-medium leading-relaxed text-balance">
              {t('origin.p1')}
            </p>
            
            {/* Organic image polaroid */}
            <div className="mt-4 md:mt-8 relative w-full aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white border-[8px] md:border-[16px] border-white shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <motion.div style={{ y: imgY }} className="absolute inset-[-15%] w-[130%] h-[130%] bg-gray-200">
                <Image src="/imagem manifesto.jpeg" fill className="object-cover transition-transform duration-1000" alt="Manifesto" />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24 lg:pt-16">
             
             {/* Point 1 */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="relative group"
             >
                <span className="absolute -top-12 -left-6 md:-top-16 md:-left-10 text-[120px] md:text-[200px] font-black text-[#007AFF]/5 z-0 select-none pointer-events-none transition-colors duration-500 group-hover:text-[#007AFF]/10 leading-none">01</span>
                <div className="relative z-10 pt-10 md:pt-16 pl-4 md:pl-10">
                   <h4 className="font-handwritten text-3xl md:text-4xl text-[#007AFF] font-bold mb-4 md:mb-6">{t('origin.o1.label')}</h4>
                   <p className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111111] mb-6 md:mb-8 leading-[1.1] tracking-tight text-balance">
                     {t('origin.o1.title')}
                   </p>
                   <p className="text-xl md:text-2xl text-[#555555] font-medium leading-relaxed max-w-2xl">
                     {t('origin.o1.desc')}
                   </p>
                </div>
             </motion.div>

             {/* Point 2 */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="relative group"
             >
                <span className="absolute -top-12 -left-6 md:-top-16 md:-left-10 text-[120px] md:text-[200px] font-black text-[#007AFF]/5 z-0 select-none pointer-events-none transition-colors duration-500 group-hover:text-[#007AFF]/10 leading-none">02</span>
                <div className="relative z-10 pt-10 md:pt-16 pl-4 md:pl-10">
                   <h4 className="font-handwritten text-3xl md:text-4xl text-[#007AFF] font-bold mb-4 md:mb-6">{t('origin.o2.label')}</h4>
                   <p className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111111] mb-6 md:mb-8 leading-[1.1] tracking-tight text-balance">
                     {t('origin.o2.title')}
                   </p>
                   <p className="text-xl md:text-2xl text-[#555555] font-medium leading-relaxed max-w-2xl">
                     {t('origin.o2.desc')}
                   </p>
                </div>
             </motion.div>
             
          </div>
        </div>

        {/* Point 3 - Full Width Layout (Consistent Typography) */}
        <div className="mt-20 md:mt-32 max-w-[1300px] mx-auto pb-10">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="relative flex flex-col items-center text-center w-full"
           >
              {/* Subtle background number to match 01 and 02 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[350px] font-black text-[#007AFF]/5 select-none pointer-events-none leading-none z-0">
                03
              </div>
              
              <div className="relative z-10 w-full px-4 md:px-0">
                 <h4 className="font-handwritten text-3xl md:text-4xl text-[#007AFF] font-bold mb-6 transform -rotate-2 inline-block">
                   {t('origin.o3.label')}
                 </h4>
                 
                 <p className="text-4xl md:text-5xl font-black text-[#111111] leading-[1.1] tracking-tight text-balance mb-12 max-w-4xl mx-auto">
                   {t('origin.o3.title')}
                 </p>
                 
                 {/* The three rules styled consistently */}
                 <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mb-12">
                    <div className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
                      <span className="text-[#111111]">{t('origin.o3.b1')}</span> <span className="text-black/30">{t('origin.o3.b2')}</span>
                    </div>
                    <div className="hidden md:block w-2 h-2 rounded-full bg-[#007AFF]/30"></div>
                    <div className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
                      <span className="text-[#111111]">{t('origin.o3.b1')}</span> <span className="text-black/30">{t('origin.o3.b3')}</span>
                    </div>
                    <div className="hidden md:block w-2 h-2 rounded-full bg-[#007AFF]/30"></div>
                    <div className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
                      <span className="text-[#007AFF]">{t('origin.o3.b1')}</span> <span className="text-[#007AFF]">{t('origin.o3.b4')}</span>
                    </div>
                 </div>
                 
                 <p className="text-xl md:text-2xl text-[#555555] font-medium leading-relaxed max-w-3xl mx-auto text-balance">
                   {t('origin.o3.desc')}
                 </p>
              </div>
           </motion.div>
        </div>

        {/* Footer Conclusion */}
        <div className="mt-24 md:mt-40 flex flex-col items-center text-center pb-20">
          <h2 className="text-4xl md:text-5xl font-black text-[#111111] leading-[1.1] tracking-tight text-balance mb-10 max-w-4xl mx-auto">
            {t('origin.footer.t1')} <br className="hidden md:block" />
            <span className="text-black/30">{t('origin.footer.t2')}</span>
          </h2>
          <span className="font-handwritten text-2xl md:text-3xl text-[#007AFF] font-bold transform -rotate-2 inline-block">
            {t('origin.footer.pill')}
          </span>
        </div>
        
      </div>
    </section>
  );
}
