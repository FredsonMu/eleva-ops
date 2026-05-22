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
    <section ref={containerRef} className="py-24 md:py-48 bg-[#fbfbfb] relative overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-24 md:mb-40">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 block mb-6">{t('origin.label')}</span>
          <h2 className="font-sans text-[clamp(2.5rem,7vw,7rem)] font-medium tracking-tight leading-[0.9] text-[#111111] text-balance">
            {t('origin.title1')} <br className="hidden md:block" />
            <span className="text-black/30">{t('origin.title2')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-40 flex flex-col gap-10">
            <p className="text-lg md:text-xl text-[#666666] leading-relaxed font-light">
              {t('origin.p1')}
            </p>

            <div className="mt-4 relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-black/5">
              <motion.div style={{ y: imgY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
                <Image src="/imagem manifesto.jpeg" fill className="object-cover opacity-[0.85] transition-transform duration-1000 saturate-50 hover:saturate-100" alt="Manifesto" />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_2px_40px_rgba(0,0,0,0.02)] border border-black/[0.02]"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-6 block">{t('origin.o1.label')}</h4>
              <p className="text-xl md:text-3xl font-medium text-[#111111] mb-6 leading-tight">
                {t('origin.o1.title')}
              </p>
              <p className="text-base md:text-xl text-[#666666] leading-relaxed font-light">
                {t('origin.o1.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_2px_40px_rgba(0,0,0,0.02)] border border-black/[0.02]"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-6 block">{t('origin.o2.label')}</h4>
              <p className="text-xl md:text-3xl font-medium text-[#111111] mb-6 leading-tight">
                {t('origin.o2.title')}
              </p>
              <p className="text-base md:text-xl text-[#666666] leading-relaxed font-light">
                {t('origin.o2.desc')}
              </p>
            </motion.div>

          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full mt-12 md:mt-24 bg-[#111111] text-white p-10 md:p-16 lg:p-20 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 relative overflow-hidden group border border-white/5"
        >
          {/* Decorative Background */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full max-w-[600px] h-full bg-gradient-to-l from-[#007AFF]/20 to-transparent blur-[100px] rounded-full pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-1000"></div>

          <div className="lg:w-5/12 relative z-10 flex flex-col justify-center">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-8 block">{t('origin.o3.label')}</h4>
            <p className="text-2xl md:text-4xl lg:text-[2.5rem] leading-[1.2] font-medium text-white tracking-tight text-balance">
              {t('origin.o3.title')}
            </p>
          </div>

          <div className="hidden lg:block w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 relative z-10"></div>

          <div className="lg:w-6/12 relative z-10 flex flex-col justify-center border-t border-white/10 lg:border-none pt-10 lg:pt-0">
            <p className="text-3xl md:text-5xl font-sans font-medium text-white leading-tight tracking-tight mb-8">
              {t('origin.o3.b1')}<span className="text-white/40">{t('origin.o3.b2')}</span><br />
              {t('origin.o3.b1')}<span className="text-white/40">{t('origin.o3.b3')}</span><br />
              {t('origin.o3.b1')}<span className="text-[#007AFF]">{t('origin.o3.b4')}</span>
            </p>
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light mt-auto">
              {t('origin.o3.desc')}
            </p>
          </div>
        </motion.div>

        {/* Footer Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 md:mt-48 flex flex-col items-center text-center"
        >
          <div className="w-px h-20 md:h-32 bg-gradient-to-b from-transparent to-black/20 mb-12"></div>
          <h2 className="text-3xl md:text-[clamp(3.5rem,6vw,6rem)] font-sans font-medium tracking-tight leading-[0.9] text-[#111111] text-balance mb-10 max-w-4xl">
            {t('origin.footer.t1')}<br className="hidden md:block" />
            <span className="text-black/30">{t('origin.footer.t2')}</span>
          </h2>
          <p className="text-[10px] md:text-xs text-[#007AFF] uppercase tracking-[0.4em] font-bold text-balance bg-[#007AFF]/[0.05] border border-[#007AFF]/10 px-6 py-3 rounded-full">
            {t('origin.footer.pill')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
