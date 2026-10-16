'use client';
import { useState, memo, useId } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

const FAQItem = memo(function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  const answerId = useId();
  return (
    <div className={`rounded-2xl transition-colors duration-300 ${isOpen ? 'bg-black/[0.04] dark:bg-white/[0.06]' : 'bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'}`}>
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 md:px-6 text-left"
      >
        <h3 className="font-sans text-base md:text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{question}</h3>
        <Plus className={`h-5 w-5 shrink-0 text-black/50 dark:text-white/55 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} strokeWidth={2} aria-hidden="true" />
      </button>
      <div id={answerId} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-6 md:px-6 text-[15px] md:text-base leading-relaxed text-black/60 dark:text-white/60">{answer}</p>
        </div>
      </div>
    </div>
  );
});

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = ([1, 2, 3, 4, 5, 6] as const).map(n => ({ question: t(`faq.${n}.q` as const), answer: t(`faq.${n}.a` as const) }));

  return (
    <section id="faq" className="py-16 md:py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal y={30} duration={0.7} className="mb-10 md:mb-14 text-center">
          <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('faq.transparency')}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
            {t('faq.title1')}{t('faq.title2')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty">{t('faq.desc')}</p>
        </Reveal>

        <Reveal y={30} duration={0.8} className="mx-auto flex max-w-3xl flex-col gap-2.5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(current => (current === index ? null : index))}
            />
          ))}
        </Reveal>

        <Reveal y={20} className="mt-10 md:mt-14 flex flex-col items-center gap-4 text-center">
          <span className="text-[15px] text-black/55 dark:text-white/55">{t('faq.notFound')}</span>
          <a
            href="mailto:contact@elevaops.com"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[14px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
          >
            {t('faq.contact')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
