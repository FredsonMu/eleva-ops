'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';
import { Asterisk } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useGSAP(() => {
    // 1. Kinetic Typography Timeline (Apple/Linear style)
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" } // expo.out is very snappy initially and smooth at the end
    });

    // Animate the availability pill
    tl.fromTo(".hero-pill", 
      { opacity: 0, y: -20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.2 }
    );

    // Animate the huge header line by line with a masking effect
    tl.fromTo(".title-line", 
      { y: "120%", rotateZ: 3, opacity: 0 },
      { y: "0%", rotateZ: 0, opacity: 1, duration: 1.6, stagger: 0.15 },
      "-=1.0"
    );

    // Animate the description and bottom elements
    tl.fromTo(".desc-elem",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.4, stagger: 0.1 },
      "-=1.2"
    );

    // 2. Scroll Parallax for the decorative SVG
    gsap.to(".hero-svg", {
      y: 150,
      rotation: 15,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 3. Continuous Decorative Animation
    gsap.to(".hero-asterisk", {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "linear"
    });

    // Cleanup scroll triggers automatically via useGSAP
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90dvh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 bg-white overflow-hidden">
      
      {/* Decorative floating elements */}
      <div 
        className="hero-svg absolute right-[-10%] sm:right-[10%] top-[40%] sm:top-[20%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-[0.04] pointer-events-none z-0 mix-blend-multiply"
      >
        <Image src="/Designing A Website 2.svg" alt="Decoration" fill priority className="object-contain" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end relative z-10">
        
        <div className="lg:col-span-9">
          <div>
            <div className="flex items-center gap-3 mb-10 md:mb-16">
              <span className="hero-pill flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/60 bg-white/50 backdrop-blur-md relative overflow-hidden">
                <span className="absolute inset-0 bg-black/[0.02]"></span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse relative z-10"></span>
                <span className="relative z-10">{t('hero.pill')}</span>
              </span>
            </div>
            
            <h1 className="font-sans font-medium text-[clamp(2.5rem,10.5vw,12rem)] leading-[0.88] tracking-[-0.05em] text-[#111111] text-balance relative">
              <div className="overflow-hidden pb-4 md:pb-6 relative -mb-4 md:-mb-6">
                <div className="title-line origin-bottom-left flex items-center gap-2">
                  <span>Eleva</span>
                  <Asterisk className="hero-asterisk w-[clamp(2rem,6vw,6rem)] h-[clamp(2rem,6vw,6rem)] text-black/10 origin-center relative top-[-0.05em]" strokeWidth={1.5} />
                </div>
              </div>
              <div className="overflow-hidden pb-4 md:pb-6 relative -mb-4 md:-mb-6">
                <div className="title-line origin-bottom-left text-black/30">
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
              </div>
            </h1>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-col gap-10 md:gap-16">
            <div className="flex flex-col gap-4">
              <span className="desc-elem text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">{t('hero.subtitle')}</span>
              <p className="desc-elem font-sans text-base md:text-lg text-black/60 leading-relaxed font-normal text-balance">
                {t('hero.desc')}
              </p>
            </div>
            
            <div className="desc-elem grid grid-cols-2 gap-4 pt-6 border-t border-black/10">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">{t('hero.spec')}</span>
                <span className="text-xs font-semibold text-black">{t('hero.brand_web')}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">{t('hero.location')}</span>
                <span className="text-xs font-semibold text-black">{t('hero.global')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
