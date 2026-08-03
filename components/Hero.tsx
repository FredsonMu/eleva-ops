'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Hero() {
  const { t, language } = useLanguage();

  const springConfig = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-24 overflow-hidden items-center justify-center bg-[#fcfcfd]">
      
      {/* 10/10 Premium Ambient Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#007AFF]/5 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-[#00c6ff]/5 rounded-full blur-[80px] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Digital Studio Badge (10/10 design matching screenshot) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springConfig}
          className="mb-12 relative group cursor-default"
        >
          {/* Subtle glow behind the badge */}
          <div className="absolute inset-0 bg-[#007AFF]/10 rounded-full blur-xl group-hover:bg-[#007AFF]/20 transition-colors duration-500"></div>
          
          <div className="relative bg-white/90 backdrop-blur-xl border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 py-2.5 rounded-full flex items-center gap-3 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#007AFF] opacity-30"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#007AFF] shadow-[0_0_8px_rgba(0,122,255,0.6)]"></span>
            </span>
            <span className="text-[11px] font-extrabold text-[#333333] tracking-[0.2em] uppercase mt-[1px]">
              Digital Studio
            </span>
          </div>
        </motion.div>

        {/* Center: Sleek Typography Layout */}
        <div className="relative w-full flex flex-col items-center text-center">
          
          <h1 className="font-sans font-semibold text-[clamp(4rem,12vw,9.5rem)] leading-[0.9] tracking-tighter text-[#1d1d1f] flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="flex items-center justify-center gap-2 md:gap-4"
            >
              Eleva<span className="text-[#007AFF]">.</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="text-black/20 mt-2 h-[1em]"
            >
              <TypeAnimation
                key={language}
                sequence={[
                  t('hero.typing1'), 3000,
                  t('hero.typing2'), 3000,
                  t('hero.typing3'), 3000,
                  t('hero.typing4'), 3000,
                  t('hero.typing5'), 3000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="inline-block"
              />
            </motion.div>
          </h1>
        </div>

        {/* Premium Typographical Description (Cardless) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.3 }}
          className="mt-12 md:mt-16 z-20 w-full max-w-3xl flex flex-col items-center text-center"
        >
          {/* Subtle separator */}
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent mb-8"></div>
          
          <p className="text-[#1d1d1f]/70 font-medium leading-[1.6] md:leading-[1.7] max-w-2xl text-lg md:text-[1.35rem] tracking-tight text-balance">
            {t('hero.desc1')}
            <span className="text-[#007AFF] font-semibold">{t('hero.desc2')}</span>
          </p>

          {/* Premium Floating Button */}
          <a href="mailto:contact@elevaops.com" className="mt-10 group relative inline-flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[#007AFF]/20 rounded-full blur-md group-hover:bg-[#007AFF]/40 group-hover:scale-110 transition-all duration-500"></div>
            
            {/* Button Surface */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgb(0,122,255,0.15)] px-8 py-3.5 rounded-full flex items-center gap-3 transition-all duration-300">
               
               <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#1d1d1f] group-hover:text-[#007AFF] transition-colors">
                 Start a project
               </span>
               
               {/* Arrow Circle */}
               <div className="w-6 h-6 rounded-full bg-black/5 group-hover:bg-[#007AFF]/10 flex items-center justify-center transition-colors">
                 <ArrowRight className="w-3.5 h-3.5 text-[#1d1d1f] group-hover:text-[#007AFF] group-hover:translate-x-0.5 transition-all" />
               </div>
            </div>
          </a>
        </motion.div>

        {/* Clean Static Single Image */}
        <div className="w-full mt-20 md:mt-24 max-w-5xl mx-auto flex justify-center">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] md:rounded-[40px] overflow-hidden ios-card border-none shadow-2xl">
            <Image 
              src="/hero imagem1.jpg" 
              alt="Workspace with computers" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
