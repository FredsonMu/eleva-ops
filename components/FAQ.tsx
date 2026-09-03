'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-black/10 dark:border-white/20">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight pr-8 text-[#1d1d1f] dark:text-white group-hover:text-[#007AFF] transition-colors duration-300">{question}</h3>
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm flex items-center justify-center group-hover:border-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-colors duration-300 text-black/50 dark:text-white/50">
          {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
        </div>
      </button>
      {isOpen && (
        <div className="overflow-hidden">
          <p className="font-sans pb-10 pt-2 text-base md:text-lg text-black/60 dark:text-white/60 font-medium leading-relaxed max-w-4xl">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    { question: t('faq.1.q'), answer: t('faq.1.a') },
    { question: t('faq.2.q'), answer: t('faq.2.a') },
    { question: t('faq.3.q'), answer: t('faq.3.a') },
    { question: t('faq.4.q'), answer: t('faq.4.a') },
    { question: t('faq.5.q'), answer: t('faq.5.a') },
    { question: t('faq.6.q'), answer: t('faq.6.a') }
  ];

  return (
    <section id="faq" className="py-20 md:py-40 bg-transparent relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
          
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF]">
                  {t('faq.transparency')}
                </span>
              </div>
              
              <h2 className="font-sans text-[clamp(2.5rem,4vw,4rem)] font-semibold tracking-tighter leading-[1.05] text-[#1d1d1f] dark:text-white text-balance mb-6 md:mb-8">
                {t('faq.title1')} <br className="hidden md:block" />
                <span className="text-black/30 dark:text-white/30 mt-2 block">
                  {t('faq.title2')}
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-black/60 dark:text-white/60 font-medium leading-relaxed mb-10 md:mb-12 max-w-sm text-balance">
                {t('faq.desc')}
              </p>
              
              <div className="flex flex-col items-center lg:items-start gap-4 md:gap-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">{t('faq.notFound')}</span>
                <a href="mailto:contact@elevaops.com" className="inline-flex items-center justify-center bg-[#1d1d1f] dark:bg-white dark:bg-white/5 text-white px-8 py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#007AFF] transition-colors duration-300 w-fit shadow-[0_4px_14px_-4px_rgba(0,0,0,0.3)]">
                  {t('faq.contact')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col border-t border-black/10 dark:border-white/20 mt-10 lg:mt-0">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
