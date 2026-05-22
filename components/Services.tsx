'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const specialties = [
    {
      id: "01",
      title: t('serv.1.title'),
      desc: t('serv.1.desc'),
      bg: "bg-[#111111]",
      text: "text-white",
      descText: "text-white/60",
      border: "border-white/10",
      gradient: "from-white/10 to-transparent",
      image: "/platforms-websites.svg",
      imageClass: "p-0 md:p-0 opacity-95 group-hover:opacity-100",
      glow: false
    },
    {
      id: "02",
      title: t('serv.2.title'),
      desc: t('serv.2.desc'),
      bg: "bg-white",
      text: "text-[#111111]",
      descText: "text-[#666666]",
      border: "border-black/5",
      gradient: "from-[#007AFF]/5 to-transparent",
      image: "/business-presentation.svg",
      imageClass: "p-4 md:p-8 brightness-150 contrast-125 opacity-80 group-hover:opacity-100",
      glow: true
    },
    {
      id: "03",
      title: t('serv.3.title'),
      desc: t('serv.3.desc'),
      bg: "bg-[#f5f5f7]",
      text: "text-[#111111]",
      descText: "text-[#666666]",
      border: "border-black/5",
      gradient: "from-[#FF2D55]/5 to-transparent",
      image: "/wireframe.svg",
      imageClass: "p-4 md:p-8 brightness-150 contrast-125 opacity-80 group-hover:opacity-100",
      glow: true
    },
    {
      id: "04",
      title: t('serv.4.title'),
      desc: t('serv.4.desc'),
      bg: "bg-[#007AFF]",
      text: "text-white",
      descText: "text-white/80",
      border: "border-white/10",
      gradient: "from-black/10 to-transparent",
      image: "/business-deal.svg",
      imageClass: "p-4 md:p-8 brightness-150 contrast-125 opacity-80 group-hover:opacity-100",
      glow: true
    }
  ];

  useGSAP(() => {
    // 1. Header Entrance
    gsap.fromTo(".serv-header-elem", 
      { opacity: 0, y: 30 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".serv-header",
          start: "top 85%",
        }
      }
    );

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 2. Horizontal Scroll Magic for Desktop
      const scrollSection = containerRef.current?.querySelector('.serv-horiz-section');
      const scrollContent = containerRef.current?.querySelector('.serv-horiz-content');

      if (scrollSection && scrollContent) {
        gsap.to(scrollContent, {
          x: () => -(scrollContent.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: scrollSection,
            start: "top top", 
            end: () => `+=${scrollContent.scrollWidth}`, 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }
    });

    mm.add("(max-width: 767px)", () => {
      // 2. Normal fade up for Mobile (no sticky overlapping)
      const cards = gsap.utils.toArray('.serv-horiz-card') as HTMLElement[];
      cards.forEach(card => {
        gsap.fromTo(card, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: { 
              trigger: card, 
              start: "top 85%" 
            } 
          }
        );
      });
    });

    // 3. Subtle pulse for the icons
    gsap.to(".service-icon-pulse", {
      scale: 1.06,
      rotate: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <section id="servicos" ref={containerRef} className="bg-[#fbfbfb] relative z-10 py-24 md:py-32 selection:bg-black/10 selection:text-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      <div className="serv-header pt-10 pb-10 max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start md:items-center md:text-center">
         <span className="serv-header-elem text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40 block mb-6">{t('serv.label')}</span>
         <div className="overflow-hidden pb-4">
            <h2 className="serv-header-elem font-sans text-4xl md:text-[clamp(3.5rem,6vw,6rem)] leading-[0.9] font-medium tracking-tight text-[#111111] max-w-4xl">
               {t('serv.title1')} <br className="hidden md:block"/>
               <span className="text-black/30">{t('serv.title2')}</span>
            </h2>
         </div>
      </div>

      <div className="serv-horiz-section md:h-screen w-full flex items-center relative z-10 mt-10 md:mt-20">
        <div className="serv-horiz-content flex flex-col md:flex-row gap-12 md:gap-16 px-6 md:px-[10vw] md:w-max items-center md:h-[80vh]">
          {specialties.map((item, i) => (
            <div 
              key={i} 
              className={`serv-horiz-card relative w-full md:w-[65vw] max-w-[1000px] h-auto md:h-full shrink-0 rounded-[2.5rem] md:rounded-[4rem] px-8 py-12 md:px-16 md:py-20 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] border ${item.border} ${item.bg} flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`}></div>

              {/* Content Side */}
              <div className="flex flex-col justify-center gap-8 md:gap-16 relative z-10 w-full md:w-[45%] h-full">
                <div className="flex flex-col gap-6">
                  <span className={`font-mono text-sm md:text-lg font-semibold tracking-widest ${item.descText}`}>{"//"} {item.id}</span>
                  <h3 className={`text-4xl md:text-[clamp(3rem,4vw,4.5rem)] font-sans font-medium tracking-tight leading-[0.9] whitespace-pre-line ${item.text}`}>
                    {item.title}
                  </h3>
                </div>

                <p className={`text-lg md:text-[clamp(1.1rem,1.5vw,1.4rem)] leading-relaxed font-light text-balance ${item.descText}`}>
                  {item.desc}
                </p>
              </div>

              {/* Visual / SVG Side */}
              <div className="relative z-10 w-full md:w-[50%] h-[300px] md:h-full flex items-center justify-center">
                <div className="relative w-full h-full rounded-[2rem] flex items-center justify-center pointer-events-none">
                    {item.glow && (
                      <div className="absolute inset-10 bg-white/10 rounded-[2rem] blur-2xl group-hover:bg-white/20 transition-colors duration-1000"></div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src={item.image} 
                        alt={item.title.replace('\n', ' ')} 
                        fill 
                        className={`service-icon-pulse object-contain drop-shadow-2xl transition-opacity duration-700 ${item.imageClass}`}
                      />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
