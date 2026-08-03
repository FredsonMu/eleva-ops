'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/lib/i18n';
import { Layers, Presentation, Compass, Briefcase } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();
  const springConfig = { type: "spring", stiffness: 100, damping: 20 };

  const icons = [Layers, Presentation, Compass, Briefcase];

  const specialties = [
    {
      id: "01",
      title: t('serv.1.title'),
      desc: t('serv.1.desc'),
      image: "/platforms-websites.svg"
    },
    {
      id: "02",
      title: t('serv.2.title'),
      desc: t('serv.2.desc'),
      image: "/business-presentation.svg"
    },
    {
      id: "03",
      title: t('serv.3.title'),
      desc: t('serv.3.desc'),
      image: "/wireframe.svg"
    },
    {
      id: "04",
      title: t('serv.4.title'),
      desc: t('serv.4.desc'),
      image: "/business-deal.svg"
    }
  ];

  const targetRef = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="servicos" className="relative h-[400vh] z-10 bg-[#fbfbfd]">
      
      {/* Sticky Container */}
      <div className="sticky top-0 flex items-center h-screen overflow-hidden">
        
        {/* Subtle mesh background */}
        <div className="absolute inset-0">
           <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#007AFF]/3 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        </div>

        {/* The Moving Horizontal Track */}
        <motion.div style={{ x }} className="flex items-center gap-8 md:gap-16 px-6 md:px-24 w-max relative z-10 h-full py-20">
          
          {/* Slide 1: The Intro Text */}
          <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left w-[85vw] md:w-[500px] flex-shrink-0 md:pl-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springConfig}
              className="mb-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF]">
                {t('serv.label')}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="font-sans text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-tight font-semibold text-[#1d1d1f] text-balance"
            >
              {t('serv.title1')} <br className="hidden md:block" />
              <span className="text-black/30 mt-2 block">
                {t('serv.title2')}
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="mt-6 text-lg text-black/50 font-medium max-w-md leading-relaxed"
            >
              Scroll to explore our core solutions designed for scale.
            </motion.p>
          </div>

          {/* Slides 2-5: The Cards */}
          {specialties.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springConfig, delay: i * 0.1 }}
                className="group relative rounded-[40px] ios-card p-1 flex flex-col justify-between w-[85vw] md:w-[480px] flex-shrink-0 h-[65vh] min-h-[400px] max-h-[600px] transition-transform duration-700 hover:-translate-y-4"
              >
                <div className="w-full h-full bg-[#fbfbfd] rounded-[36px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start z-10 relative">
                    <span className="font-sans text-lg font-bold text-black/20">
                      {item.id}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#007AFF] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Central abstract graphic */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-70 transition-opacity duration-700">
                    <div className="w-[120%] h-[120%] relative group-hover:scale-105 transition-transform duration-1000 ease-out">
                       <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-xl" />
                    </div>
                  </div>

                  {/* Card Content (Bottom) */}
                  <div className="relative z-10 mt-auto bg-white p-6 rounded-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] text-center md:text-left flex flex-col items-center md:items-start border border-black/5">
                    <h3 className="text-2xl font-sans font-semibold tracking-tight text-[#1d1d1f] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-black/50 font-medium leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
          
          <div className="w-[40vw] md:w-[15vw] flex-shrink-0"></div>

        </motion.div>

        {/* Global Progress Bar */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-black/5 rounded-full overflow-hidden border-none shadow-none">
          <motion.div 
            className="h-full bg-black/40 rounded-full"
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

      </div>
    </section>
  );
}
