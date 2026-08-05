'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const specialties = [
    {
      id: "01",
      title: t('serv.1.title'),
      desc: t('serv.1.desc'),
      image: "/platforms-websites.svg",
    },
    {
      id: "02",
      title: t('serv.2.title'),
      desc: t('serv.2.desc'),
      image: "/business-presentation.svg",
    },
    {
      id: "03",
      title: t('serv.3.title'),
      desc: t('serv.3.desc'),
      image: "/wireframe.svg",
    },
    {
      id: "04",
      title: t('serv.4.title'),
      desc: t('serv.4.desc'),
      image: "/business-deal.svg",
    }
  ];

  useGSAP(() => {
    const rows = gsap.utils.toArray('.zig-zag-row');
    
    rows.forEach((row: any, i: number) => {
      const textCol = row.querySelector('.text-col');
      const imgCol = row.querySelector('.img-col');
      
      const isEven = i % 2 === 0;
      
      // Text slides in from the side it belongs to
      gsap.from(textCol, {
        x: isEven ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Image slides in from the opposite side
      gsap.from(imgCol, {
        x: isEven ? 100 : -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="servicos" className="relative bg-transparent pt-32 pb-40 overflow-hidden">
      
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-24 md:mb-40 flex flex-col items-center text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-4 block">
          {t('serv.label')}
        </span>
        <h2 className="font-sans text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight font-semibold text-[#1d1d1f] max-w-4xl text-balance">
          {t('serv.title1')} <span className="text-black/30">{t('serv.title2')}</span>
        </h2>
      </div>

      {/* Cardless Zig-Zag Flow */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-col gap-32 md:gap-48">
        {specialties.map((item, i) => {
          const isEven = i % 2 === 0;
          
          return (
            <div 
              key={item.id}
              className={`zig-zag-row flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
            >
              
              {/* Text Column */}
              <div className="text-col w-full md:w-1/2 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-sans text-xl font-bold text-black/20 tracking-widest uppercase">
                    Nº {item.id}
                  </span>
                </div>
                
                <h3 className="font-sans font-semibold tracking-tight text-[#1d1d1f] mb-6 leading-[1.05] text-4xl md:text-5xl lg:text-[4rem] whitespace-pre-line text-balance">
                  {item.title}
                </h3>
                
                <p className="text-black/50 font-medium leading-relaxed text-lg md:text-xl max-w-lg">
                  {item.desc}
                </p>
              </div>
              
              {/* SVG Graphic Column */}
              <div className="img-col w-full md:w-1/2 relative h-[350px] md:h-[500px] flex items-center justify-center rounded-[40px] group">
                 {/* Subtle ambient glow behind the floating SVG */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 to-transparent rounded-[40px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                 
                 <div className="relative w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out">
                   <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-2xl" />
                 </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </section>
  );
}
