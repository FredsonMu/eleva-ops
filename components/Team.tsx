'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export function Team() {
  const { t } = useLanguage();

  const members = [
    {
      name: "Eduardo",
      role: t('team.m1.role'),
      img: "/edu.jpeg"
    },
    {
      name: "Fredson",
      role: t('team.m2.role'),
      img: "/fredson.png"
    },
    {
      name: "Miguel",
      role: t('team.m3.role'),
      img: "/miguel.png"
    }
  ];

  return (
    <section id="equipa" className="pt-12 pb-24 md:pt-20 md:pb-40 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="mb-32 md:mb-52 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center">
            
            <div className="mb-8 md:mb-10">
              <span className="font-handwritten text-xl md:text-2xl text-[#007AFF] font-bold transform -rotate-2 inline-block">
                {t('team.label')}
              </span>
            </div>
            
            <h3 className="font-sans text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[1.05] text-[#111111] tracking-tighter text-balance mb-16 mx-auto">
              {t('team.quote')}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
              {/* Minimal Avatars */}
              <div className="flex -space-x-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white bg-gray-100 relative z-10">
                  <Image src="/Property 1=68.png" alt="Avatar 1" width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white bg-gray-200 relative z-20">
                  <Image src="/Property 1=11.png" alt="Avatar 2" width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white bg-gray-300 relative z-30">
                  <Image src="/Property 1=06.png" alt="Avatar 3" width={64} height={64} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="hidden sm:block w-[1px] h-12 bg-black/10"></div>
              
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-sans font-bold text-[#111111] text-lg md:text-xl tracking-tight">Sarah Jenkins & Team</span>
                <span className="text-xs md:text-sm font-semibold tracking-widest text-black/40 uppercase mt-1">VP of Operations, TechFlow</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Mission & Team Scattered Cards */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mt-32 md:mt-48 pb-20">
          
          {/* Left: Mission Text */}
          <div className="w-full lg:w-5/12 text-left z-10">
            <div className="mb-8">
              <span className="font-handwritten text-2xl md:text-3xl text-[#007AFF] font-bold inline-block px-6 py-2 border-2 border-[#007AFF] rounded-[2rem] bg-[#007AFF]/5 transform rotate-2">
                Our Mission.
              </span>
            </div>
            
            <h2 className="font-sans text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-[#111111] leading-[1.1] mb-8 text-balance">
              We saw brilliant leaders working like robots to keep their companies afloat.
            </h2>
            <p className="text-xl md:text-2xl text-[#555555] font-medium leading-relaxed text-balance">
              We decided to build the systems and the robots, so those leaders could go back to leading. That is the essence of our team.
            </p>
          </div>

          {/* Right: Overlapping Polaroids */}
          <div className="w-full lg:w-7/12 relative h-[550px] md:h-[700px] flex items-center justify-center mt-8 lg:mt-0">
            
            {/* Background Blob/Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#007AFF]/5 rounded-full blur-3xl -z-10" />
            
            {members.map((m, i) => {
              // Pre-calculate rotations and positions for 3 cards
              const rotations = ['-rotate-12', 'rotate-6', 'rotate-[16deg]'];
              const translates = ['-translate-x-16 md:-translate-x-32 -translate-y-12', 'translate-x-0 z-10', 'translate-x-16 md:translate-x-36 translate-y-20 z-20'];
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.15, zIndex: 50, rotate: 0, transition: { duration: 0.3 } }}
                  className={`absolute w-[220px] md:w-[320px] bg-white p-4 md:p-5 pb-6 md:pb-8 rounded-xl md:rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-black/5 cursor-pointer origin-bottom ${rotations[i]} ${translates[i]} group transition-all duration-300`}
                >
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-6 bg-gray-100 shadow-inner">
                    <Image
                      src={m.img}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-110 ${m.name === 'Miguel' ? 'object-top' : 'object-center'}`}
                      alt={m.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-2 flex flex-col items-center text-center">
                    <h3 className="font-sans font-black text-2xl md:text-3xl text-[#111111] leading-none mb-2">{m.name}</h3>
                    <span className="font-handwritten text-xl text-[#007AFF] font-bold">{m.role}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
