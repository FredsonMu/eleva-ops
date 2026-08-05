'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useTransform } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-transparent min-h-[90vh] flex items-center">
      
      {/* Main Content Container (Notion Style Mobile-First padding) */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        
        {/* Center: Sleek Typography Layout */}
        <div className="relative w-full flex flex-col items-center text-center">
          
          <h1 className="font-sans font-semibold text-[clamp(3.5rem,12vw,9.5rem)] leading-[0.9] tracking-tighter text-[#1d1d1f] flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              Eleva<span className="text-[#007AFF]">.</span>
            </div>

            <div className="text-black/20 mt-2 h-[1.2em]">
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
            </div>
          </h1>
        </div>

        {/* Premium Typographical Description (Cardless) */}
        <div className="mt-8 md:mt-16 z-20 w-full max-w-3xl flex flex-col items-center text-center px-2">
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
                 {t('hero.startProject')}
               </span>
               
               {/* Arrow Circle */}
               <div className="w-6 h-6 rounded-full bg-black/5 group-hover:bg-[#007AFF]/10 flex items-center justify-center transition-colors">
                 <ArrowRight className="w-3.5 h-3.5 text-[#1d1d1f] group-hover:text-[#007AFF] group-hover:translate-x-0.5 transition-all" />
               </div>
            </div>
          </a>
        </div>

        {/* Clean Static Single Image */}
        <div className="w-full mt-16 md:mt-24 max-w-5xl mx-auto flex justify-center">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[24px] md:rounded-[40px] overflow-hidden ios-card border-none shadow-2xl">
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
