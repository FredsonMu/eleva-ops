'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArrowUpRight } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const specialties = [
    { id: "01", title: t('serv.1.title'), desc: t('serv.1.desc') },
    { id: "02", title: t('serv.2.title'), desc: t('serv.2.desc') },
    { id: "03", title: t('serv.3.title'), desc: t('serv.3.desc') },
    { id: "04", title: t('serv.4.title'), desc: t('serv.4.desc') }
  ];

  return (
    <section id="servicos" className="relative bg-transparent pt-24 md:pt-32 pb-32 md:pb-40 overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-5 md:px-6 mb-12 md:mb-24 flex flex-col items-center text-center"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-4 block border border-black/5 dark:border-white/10 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 shadow-sm">
          {t('serv.label')}
        </span>
        <h2 className="font-sans text-[clamp(2rem,6vw,5rem)] leading-[1.05] tracking-tight font-semibold text-[#1d1d1f] dark:text-white max-w-4xl text-balance">
          {t('serv.title1')} <br className="hidden md:block" />
          <span className="text-black/30 dark:text-white/30">{t('serv.title2')}</span>
        </h2>
      </motion.div>

      {/* Accordion List */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="border-t border-black/10 dark:border-white/10">
          {specialties.map((item, i) => {
            const isActive = hoveredIndex === i;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isActive ? null : i)} // Toggle on mobile tap
                className="group border-b border-black/10 dark:border-white/10 py-6 md:py-10 lg:py-12 cursor-pointer transition-colors duration-500 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              >
                <div className="flex flex-row items-center justify-between gap-4 md:gap-8 px-1 md:px-4">
                  
                  {/* Left: Number and Title */}
                  <div className="flex flex-row items-center gap-4 md:gap-12 w-full md:w-auto">
                    <span className="font-mono text-xs md:text-lg font-bold text-black/30 dark:text-white/30 shrink-0">
                      /{item.id}
                    </span>
                    <h3 className={`font-sans text-2xl md:text-5xl lg:text-[4rem] font-semibold tracking-tighter transition-colors duration-300 ${isActive ? 'text-[#007AFF]' : 'text-[#1d1d1f] dark:text-white'}`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Right: Icon */}
                  <div className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border transition-all duration-300 shrink-0 ${isActive ? 'bg-[#007AFF] border-[#007AFF] rotate-45 scale-110' : 'border-black/10 dark:border-white/10'}`}>
                    <ArrowUpRight className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black/40 dark:text-white/40'}`} />
                  </div>
                </div>

                {/* Expanding Description */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out px-1 md:px-4 ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4 md:mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-12 pl-[42px] md:pl-[76px]">
                      <p className="text-black/60 dark:text-white/60 text-base md:text-xl max-w-2xl leading-relaxed font-medium pb-2 md:pb-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
