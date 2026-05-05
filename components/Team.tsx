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
    <section id="equipa" className="py-24 md:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="mb-32 md:mb-48 bg-[#fbfbfb] p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-black/5 text-center flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-8">{t('team.label')}</span>
          <p className="font-sans text-xl md:text-3xl text-[#111111] font-medium leading-snug text-balance max-w-4xl italic mb-10">
            {t('team.quote')}
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-black text-lg">Tiago Almeida</span>
            <span className="text-sm font-medium text-[#666666]">CEO, Consulting Group Portugal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mb-20 md:mb-24">
          <div className="lg:col-span-6">
            <h2 className="font-sans text-4xl md:text-6xl font-medium tracking-tight text-[#111111] mb-6">
              {t('team.who')} <span className="text-black/30">{t('team.are')}</span>
            </h2>
            <p className="text-lg md:text-xl text-[#666666] leading-relaxed max-w-lg">
              {t('team.desc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mb-8 bg-[#fbfbfb] shadow-sm">
                <Image
                  src={m.img}
                  fill
                  className={`object-cover group-hover:scale-105 transition-all duration-700 ${m.name === 'Miguel' ? 'object-top' : 'object-center'}`}
                  alt={m.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-sans font-medium text-black">{m.name}</h3>
                <span className="font-sans text-sm font-medium tracking-wide text-[#666666] block">{m.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
