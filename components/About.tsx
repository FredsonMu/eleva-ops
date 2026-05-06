'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Eye, Boxes, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <span className="font-sans text-xs md:text-sm font-semibold tracking-wide text-[#007AFF] mb-4">
            {t('about.manifesto')}
          </span>
          <h2 className="font-sans font-semibold text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.05] text-[#111111] max-w-4xl text-balance">
            {t('about.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-8 md:gap-12">
            <p className="font-sans text-lg md:text-2xl text-[#111111] leading-relaxed font-medium">
              {t('about.p1')}
            </p>
            <p className="font-sans text-base md:text-lg text-[#666666] leading-relaxed">
              {t('about.p2')}
            </p>

            <div className="grid grid-cols-2 gap-y-8 gap-x-4 pt-8 border-t border-black/5 mt-4">
              {[
                { n: t('about.vision'), t: t('about.editorial'), icon: <Eye className="w-5 h-5 text-[#007AFF] mb-2" strokeWidth={1.5} /> },
                { n: t('about.scale'), t: t('about.robust'), icon: <Boxes className="w-5 h-5 text-[#007AFF] mb-2" strokeWidth={1.5} /> },
                { n: t('about.focus'), t: t('about.fluid'), icon: <Target className="w-5 h-5 text-[#007AFF] mb-2" strokeWidth={1.5} /> },
                { n: t('about.axis'), t: t('about.conversion'), icon: <TrendingUp className="w-5 h-5 text-[#007AFF] mb-2" strokeWidth={1.5} /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-2xl bg-black/[0.02] border border-black/5 hover:bg-black/[0.04] transition-colors">
                  {item.icon}
                  <span className="font-sans font-medium text-black">{item.n}</span>
                  <span className="font-sans text-sm text-[#888888]">{item.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl bg-[#f5f5f7] shadow-2xl shadow-black/5"
            >
              <Image
                src="/seccao imagem.jpeg"
                fill
                className="object-cover opacity-90"
                alt="Minimalist Architecture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
