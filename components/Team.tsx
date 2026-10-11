'use client';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export function Team() {
  const { t } = useLanguage();

  const members = [
    {
      name: "Eduardo",
      role: t('team.m1.role'),
      img: "/Edu.png"
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
    <section className="pt-20 pb-24 md:pt-40 md:pb-48 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <div className="mb-32 md:mb-52 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                {t('team.label')}
              </span>
            </div>
            
            <h3 className="font-sans text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold leading-[1.05] text-[#1d1d1f] dark:text-white tracking-tighter text-balance mb-12 md:mb-16 mx-auto max-w-4xl">
              {t('team.quote')}
            </h3>
            
            {/* Commitments taken from the FAQ answers — no invented testimonials or figures. */}
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-black/10 dark:divide-white/15">
              {(['team.c1', 'team.c2', 'team.c3'] as const).map(key => (
                <li key={key} className="flex items-center gap-2.5 sm:px-6 text-sm md:text-base font-semibold text-[#1d1d1f] dark:text-white">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#007AFF]" aria-hidden="true"></span>
                  {t(key)}
                </li>
              ))}
            </ul>
            
          </div>
        </div>

        {/* Completely New Immersive Team Layout */}
        <div id="equipa" className="flex flex-col items-center mt-24 md:mt-48 pb-10 md:pb-20">
          
          <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-6xl mx-auto mb-16 md:mb-24 gap-8 lg:gap-24">
            
            {/* Left Side: Title */}
            <div className="flex flex-col lg:w-1/2">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  {t('team.who')}{t('team.are')}
                </span>
              </div>
              <h2 className="font-sans text-[clamp(1.85rem,7vw,2.5rem)] md:text-[clamp(2.5rem,4vw,4.5rem)] font-semibold tracking-tight md:tracking-tighter text-[#1d1d1f] dark:text-white leading-[1.1] md:leading-[1.05] text-justify md:text-left text-pretty md:text-balance hyphens-auto md:hyphens-none" lang="en">
                {t('team.title')}
              </h2>
            </div>
            
            {/* Right Side: Text */}
            <div className="flex flex-col lg:w-1/2 lg:pt-14">
              <p className="text-[1.1rem] md:text-2xl text-black/60 dark:text-white/60 font-medium leading-relaxed text-justify md:text-left text-pretty md:text-balance hyphens-auto md:hyphens-none" lang="en">
                {t('team.desc')}
              </p>
            </div>

          </div>

          {/* Symmetrical Immersive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mx-auto">
            {members.map((member, i) => (
              <div 
                key={i} 
                className="relative group rounded-[24px] md:rounded-[48px] overflow-hidden bg-gray-100 dark:bg-white/5 aspect-[3/4] lg:aspect-[2/3] shadow-lg hover:shadow-2xl transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-2 border border-black/5 dark:border-white/10"
              >
                {/* Image */}
                <Image
                  src={member.img}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  alt={member.name}
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Info Container (Floats at bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="w-full flex justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="w-8 h-1 bg-[#007AFF] rounded-full"></span>
                  </div>
                  <h3 className="font-sans font-semibold text-3xl md:text-4xl text-white leading-none mb-3 tracking-tight">
                    {member.name}
                  </h3>
                  <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
