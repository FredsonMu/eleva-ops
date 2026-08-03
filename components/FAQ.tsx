'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const springConfig = { type: "spring", stiffness: 100, damping: 20 };

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-black/10">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
      >
        <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight pr-8 text-[#1d1d1f] group-hover:text-[#007AFF] transition-colors duration-300">{question}</h3>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center group-hover:border-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-colors duration-300 text-black/50">
          {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
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
            <p className="font-sans pb-10 pt-2 text-lg md:text-xl text-black/60 font-medium leading-relaxed max-w-4xl">
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
    <section id="faq" className="py-24 md:py-40 bg-[#fbfbfd]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40 flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={springConfig}
                className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-6 block"
              >
                {t('faq.transparency')}
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springConfig, delay: 0.1 }}
                className="font-sans text-[clamp(2.5rem,4vw,4rem)] font-semibold tracking-tighter leading-[1.05] text-[#1d1d1f] text-balance mb-8"
              >
                {t('faq.title1')} <br className="hidden md:block" />
                <span className="text-black/30 mt-2 block">
                  {t('faq.title2')}
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springConfig, delay: 0.2 }}
                className="text-lg md:text-xl text-black/60 font-medium leading-relaxed mb-12 max-w-sm text-balance"
              >
                {t('faq.desc')}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springConfig, delay: 0.3 }}
                className="flex flex-col items-center lg:items-start gap-5"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{t('faq.notFound')}</span>
                <a href="mailto:contact@elevaops.com" className="inline-flex items-center justify-center bg-[#1d1d1f] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#007AFF] transition-colors duration-300 w-fit shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]">
                  {t('faq.contact')}
                </a>
              </motion.div>
            </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col border-t border-black/10">
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
