'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-black/10">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <h3 className="font-sans text-lg md:text-xl font-medium tracking-tight pr-8">{question}</h3>
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black group-hover:text-black transition-colors">
          {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans pb-8 pt-2 text-base md:text-lg text-[#666666] leading-relaxed max-w-4xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section id="faq" className="py-24 md:py-40 bg-[#fbfbfb]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 block mb-6">{t('faq.transparency')}</span>
              <h2 className="font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[0.9] text-[#111111] text-balance mb-8">
                {t('faq.title1')} <br />
                <span className="text-black/30">{t('faq.title2')}</span>
              </h2>
              <p className="text-[#666666] leading-relaxed mb-10 max-w-sm">
                {t('faq.desc')}
              </p>
              
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold">{t('faq.notFound')}</span>
                <a href="mailto:elevaopsinfo@gmail.com" className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors w-fit">
                  {t('faq.contact')}
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col">
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
