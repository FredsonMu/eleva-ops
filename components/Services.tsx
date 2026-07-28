'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/lib/i18n';

export function Services() {
  const { t } = useLanguage();

  const specialties = [
    {
      id: "01",
      title: t('serv.1.title'),
      desc: t('serv.1.desc'),
      image: "/platforms-websites.svg",
      bg: "bg-[#E0F7FA]",
      textColor: "text-[#006064]",
      rotation: -2
    },
    {
      id: "02",
      title: t('serv.2.title'),
      desc: t('serv.2.desc'),
      image: "/business-presentation.svg",
      bg: "bg-[#F3E5F5]",
      textColor: "text-[#4A148C]",
      rotation: 1
    },
    {
      id: "03",
      title: t('serv.3.title'),
      desc: t('serv.3.desc'),
      image: "/wireframe.svg",
      bg: "bg-[#FFF9C4]",
      textColor: "text-[#F57F17]",
      rotation: -1
    },
    {
      id: "04",
      title: t('serv.4.title'),
      desc: t('serv.4.desc'),
      image: "/business-deal.svg",
      bg: "bg-[#FBE9E7]",
      textColor: "text-[#BF360C]",
      rotation: 2
    }
  ];

  const targetRef = useRef<HTMLDivElement | null>(null);
  
  // Track scroll progress for the 400vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Move the entire track left based on scroll.
  // Using -75% ensures we scroll past all items.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="servicos" className="relative h-[400vh] bg-[#FAFAFA] z-10">
      
      {/* Sticky Container - Pins to screen for horizontal scroll */}
      <div className="sticky top-0 flex items-center h-screen overflow-hidden">
        
        {/* Playful background pattern (dots) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

        {/* The Moving Horizontal Track */}
        <motion.div style={{ x }} className="flex items-center gap-12 md:gap-24 px-6 md:px-24 w-max relative z-10 h-full py-20">
          
          {/* Slide 1: The Intro Text */}
          <div className="flex flex-col justify-center w-[85vw] md:w-[600px] flex-shrink-0 pl-4 md:pl-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="font-handwritten text-2xl md:text-3xl text-[#007AFF] font-bold inline-block px-6 py-2 border-2 border-[#007AFF] rounded-[2rem] bg-[#007AFF]/5 transform -rotate-2">
                {t('serv.label')}
              </span>
            </motion.div>
            
            <h2 className="font-sans text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight font-black text-[#111111] text-balance">
              {t('serv.title1')} <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10">{t('serv.title2')}</span>
                {/* Massive playful underline */}
                <svg className="absolute -bottom-3 left-0 w-full h-6 text-[#FFD500] -z-10" viewBox="0 0 200 30" preserveAspectRatio="none">
                  <path d="M0,15 Q100,30 200,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            
            <p className="mt-8 text-xl text-[#555] font-medium max-w-md">
              Keep scrolling down to explore our approach.
            </p>
          </div>

          {/* Slides 2-5: The Cards */}
          {specialties.map((item, i) => (
            <div 
              key={item.id}
              className={`group relative rounded-[2.5rem] border-[8px] border-white ${item.bg} p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between w-[85vw] md:w-[500px] flex-shrink-0 h-[60vh] min-h-[320px] max-h-[600px]`}
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              
              <div className="flex justify-between items-start z-10 relative">
                <span className={`font-mono text-4xl font-black ${item.textColor} bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white/50 transform -rotate-3`}>
                  {item.id}
                </span>
              </div>
              
              {/* Card Content (Bottom) */}
              <div className="relative z-10 mt-auto bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-[#111111] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#555555] font-medium leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </div>

              {/* Overflowing SVG Image */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
                <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] group-hover:scale-105 group-hover:rotate-2 transition-transform duration-700 ease-out opacity-90">
                  <Image src={item.image} alt={item.title} fill className="object-cover md:object-contain drop-shadow-xl" />
                </div>
              </div>
              
            </div>
          ))}
          
          {/* Final padding slide to ensure the last card is fully visible before un-sticking */}
          <div className="w-[40vw] md:w-[15vw] flex-shrink-0"></div>

        </motion.div>

        {/* Global Progress Bar for the Section */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-black/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#111111]"
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

      </div>
    </section>
  );
}
