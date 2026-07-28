'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';
import { Asterisk, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useGSAP(() => {
    // 1. Kinetic Typography Timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Animate the availability pill
    tl.fromTo(".hero-pill", 
      { opacity: 0, y: -20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.1 }
    );

    // Animate the huge header line by line
    tl.fromTo(".title-line", 
      { y: "100%", rotateZ: 2, opacity: 0 },
      { y: "0%", rotateZ: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
      "-=0.6"
    );

    // Animate the description and bottom elements
    tl.fromTo(".desc-elem",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      "-=0.8"
    );

    // Animate subtle handwritten elements
    tl.fromTo(".hw-line", 
      { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.6, duration: 1.5, ease: "power2.inOut" },
      "-=0.5"
    );
    tl.fromTo(".hw-text",
      { opacity: 0, scale: 0.8, rotate: -5 },
      { opacity: 0.8, scale: 1, rotate: -12, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.3"
    );



    // 3. Continuous Decorative Animation
    gsap.to(".hero-asterisk", {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] md:min-h-[100vh] flex flex-col px-6 md:px-12 pt-32 pb-6 md:pb-12 bg-[#FAFAFA] overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-br from-[#007AFF]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col h-full flex-grow mt-0 md:-mt-4">
        
        {/* Center: Creative Typography Layout */}
        <div className="relative w-full flex flex-col items-start md:items-center">
          
          <h1 className="font-sans font-black text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-[#111111] relative z-10">
            {/* Line 1 */}
            <div className="overflow-hidden pb-2 md:pb-4 relative">
              <div className="title-line flex items-baseline justify-start md:justify-center gap-2 md:gap-4 relative">
                <span className="relative z-10">Eleva</span>
                
                {/* Handwritten Underline */}
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-[80%] md:w-[60%] h-[12px] md:h-[18px] z-0 overflow-visible pointer-events-none" viewBox="0 0 200 30" preserveAspectRatio="none">
                  <path className="hw-line" d="M0,20 Q100,5 200,25" fill="none" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" />
                </svg>

                <Asterisk className="hero-asterisk w-[clamp(2rem,4vw,3.5rem)] h-[clamp(2rem,4vw,3.5rem)] text-[#007AFF] opacity-80" strokeWidth={2.5} />
              </div>
            </div>

            {/* Line 2 with TypeAnimation */}
            <div className="overflow-hidden pb-4 md:pb-6 relative">
              <div className="title-line text-black/30 flex items-center gap-4">
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

          {/* Handwritten "by your side" element - Responsive Positioning */}
          <div className="absolute top-0 right-4 md:-right-10 lg:right-0 transform z-20 pointer-events-none hidden sm:block">
            <span className="hw-text font-handwritten text-xl md:text-3xl text-[#007AFF] bg-white/80 px-2 rounded-lg backdrop-blur-sm shadow-sm whitespace-nowrap block border border-[#007AFF]/10 transform rotate-3">
              {t('hero.byYourSide')}
            </span>
          </div>

          {/* Yellow Creative Sticker */}
          <div className="desc-elem absolute -bottom-6 right-10 md:-bottom-8 md:right-[20%] z-20 hidden md:block">
            <span className="inline-block bg-[#FFD500] text-[#111111] font-sans text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-2 shadow-lg transform -rotate-3 border-2 border-white">
              {t('hero.sticker')}
            </span>
          </div>
        </div>

        {/* Dense Image Collage - Inserted into normal document flow */}
        <div className="relative w-full h-[40vh] md:h-[55vh] mt-4 md:mt-8 pointer-events-none z-0 overflow-visible flex items-center justify-center">
          
          {/* Left Image */}
          <div className="hero-collage-img absolute left-[-5%] md:left-[5%] bottom-[5%] w-[55vw] md:w-[40vw] h-[30vh] md:h-[45vh] rounded-[2rem] overflow-hidden transform rotate-[4deg] z-10 border border-black/5 shadow-md">
            <Image src="/hero imagem3.png" alt="Hero 3" fill className="object-cover" />
          </div>
          
          {/* Center Image */}
          <div className="hero-collage-img absolute left-[15%] md:left-[30%] bottom-[-5%] w-[70vw] md:w-[45vw] h-[35vh] md:h-[50vh] rounded-[2rem] overflow-hidden transform -rotate-[3deg] z-30 border border-black/5 shadow-lg">
            <Image src="/hero imagem1.jpg" alt="Hero 1" fill className="object-cover" />
          </div>

          {/* Right Image (Talking) */}
          <div className="hero-collage-img absolute right-[-5%] md:right-[5%] bottom-[10%] w-[60vw] md:w-[42vw] h-[30vh] md:h-[45vh] rounded-[2rem] overflow-hidden transform rotate-[2deg] z-20 border border-black/5 shadow-md">
            <Image src="/hero imagem 2.png" alt="Hero 2" fill className="object-cover" />
          </div>
          
        </div>

        {/* Description Row - Creative Highlight Effect Pushed Below Collage */}
        <div className="mt-8 md:mt-16 flex w-full z-20 pb-4">
          
          <div className="flex flex-col items-start gap-4 text-left max-w-2xl relative">
            <span className="desc-elem inline-block font-handwritten text-2xl md:text-3xl text-white bg-[#111111] px-4 py-1 font-bold transform -rotate-2 w-fit shadow-md border border-white/10">
              {t('hero.subtitle')}
            </span>
            <div className="desc-elem font-sans text-base md:text-xl font-medium text-left leading-[2.2] md:leading-[2.2]">
              <span className="bg-[#111111] text-white px-3 py-2 box-decoration-clone shadow-md border border-white/10 inline">
                {t('hero.desc')}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
