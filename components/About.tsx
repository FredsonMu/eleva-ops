'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 md:py-40 bg-[#FAFAFA] overflow-hidden relative z-10">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-gradient-to-bl from-[#007AFF]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Floating decorative crosses */}
      <div className="absolute top-40 left-10 text-[#007AFF] opacity-30 animate-pulse">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
      </div>
      <div className="absolute bottom-60 right-20 text-[#111111] opacity-10">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
      </div>
      <div className="absolute top-1/2 left-4 text-[#007AFF] opacity-20 transform -translate-y-1/2 rotate-45">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 5v14M5 12h14"/></svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 relative"
          >
            {/* Hand-drawn circle around the manifesto text */}
            <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] text-[#007AFF] opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M50,5 C80,10 95,40 85,80 C75,110 20,95 10,60 C0,20 30,0 50,5 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <span className="font-handwritten text-3xl md:text-4xl text-[#007AFF] font-bold inline-block relative z-10">
              {t('about.manifesto')}
            </span>
          </motion.div>
          
          <h2 className="font-sans font-black text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-[1.05] text-[#111111] max-w-4xl text-balance mb-12 relative z-10">
            {t('about.title1')} <br className="hidden md:block"/>
            <span className="text-[#007AFF] relative whitespace-nowrap inline-block mt-2">
              {t('about.title2')}
              {/* Decorative scribble underline */}
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-[#007AFF] overflow-visible" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,2 T150,8 T200,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 relative">
          
          {/* Left Side: Text */}
          <div className="lg:col-span-6 flex flex-col gap-8 relative z-10">
            <p className="font-sans text-2xl md:text-3xl text-[#111111] leading-relaxed font-black tracking-tight relative">
              <span className="absolute -left-8 -top-8 text-[6rem] text-[#007AFF] opacity-10 font-serif leading-none">"</span>
              Too many tools that don't talk to each other. Information lost in endless WhatsApp threads. Manual tasks draining your best team's energy. 
            </p>
            <div className="relative pl-6 border-l-4 border-[#007AFF]">
              <p className="font-sans text-xl text-[#111111] font-bold">
                Your business is being choked by its own operation.
              </p>
            </div>
            <p className="font-sans text-lg text-[#555555] leading-relaxed font-medium mt-4">
              Eleva Ops exists to cut the noise. We don't just sell "websites" or "software". We design the invisible architecture that allows your company to scale. We replace chaos with systems focused on organization, clarity, and conversion.
            </p>
          </div>

          {/* Right Side: Polaroid Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[550px] aspect-[4/3] rounded-[2rem] overflow-hidden bg-white border-[12px] md:border-[16px] border-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700"
            >
              <div className="absolute inset-0 bg-gray-100">
                <Image
                  src="/usar.png"
                  fill
                  className="object-cover"
                  alt="Software Interface"
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Organic Chaos vs Order Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-16 mt-20 relative max-w-5xl mx-auto">
            
            {/* Chaos Text */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4 w-full md:w-1/3 relative">
              <span className="font-handwritten text-5xl md:text-6xl text-[#111111] relative inline-block">
                {t('about.vision')}
                {/* Decorative strike-through */}
                <svg className="absolute top-1/2 left-0 w-full h-2 text-[#007AFF] transform -translate-y-1/2 -rotate-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <ul className="flex flex-col gap-2 mt-4 text-[#555555] font-bold text-xl md:text-2xl tracking-tight">
                <li>{t('about.editorial')}</li>
                <li>{t('about.focus')}</li>
              </ul>
            </div>

            {/* Hand-drawn Blue Arrow */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
              className="w-32 md:w-48 text-[#007AFF] flex-shrink-0 relative"
            >
              <svg viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="w-full drop-shadow-[2px_2px_0_rgba(0,122,255,0.2)]">
                 <path d="M10,60 Q100,10 180,60" />
                 <path d="M140,30 L180,60 L130,80" />
              </svg>
            </motion.div>

            {/* Order Text */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-1/3 relative">
              <span className="font-handwritten text-5xl md:text-6xl text-[#111111] relative inline-block">
                {t('about.scale')}
              </span>
              <ul className="flex flex-col gap-2 mt-4 text-[#111111] font-bold text-xl md:text-2xl tracking-tight">
                <li>{t('about.robust')}</li>
                <li>{t('about.fluid')}</li>
              </ul>
            </div>
            
        </div>

        {/* Organic Outcome */}
        <div className="mt-24 text-center flex flex-col items-center justify-center relative">
          {/* Large decorative background text */}
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] font-black text-[#007AFF] opacity-5 pointer-events-none select-none z-0">
            WIN
          </span>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-handwritten text-2xl text-[#007AFF] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#007AFF]"></span>
              {t('about.axis')}
              <span className="w-8 h-[1px] bg-[#007AFF]"></span>
            </span>
            <h3 className="font-handwritten text-6xl md:text-[7rem] leading-none text-[#111111] tracking-tight flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {t('about.conversion')}
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
