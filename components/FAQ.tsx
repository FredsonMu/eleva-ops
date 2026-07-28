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
        <h3 className="font-sans text-xl md:text-2xl font-black tracking-tight pr-8 text-[#111111] group-hover:text-[#007AFF] transition-colors duration-300">{question}</h3>
        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:border-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-colors duration-300 text-[#111111]">
          {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
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
            <p className="font-sans pb-10 pt-2 text-lg md:text-xl text-[#555555] font-medium leading-relaxed max-w-4xl">
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
    <section id="faq" className="py-24 md:py-40 bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 items-start">
          
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <span className="inline-block font-handwritten text-2xl md:text-3xl font-bold text-[#007AFF] transform -rotate-2 mb-6">{t('faq.transparency')}</span>
              
              <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-[#111111] text-balance mb-8">
                {t('faq.title1')} <br />
                <span className="relative inline-block mt-1 md:mt-2">
                  <span className="relative z-10 text-[#111111]">{t('faq.title2')}</span>
                  {/* Subtle yellow underline */}
                  <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 text-[#FFD500] -z-10 opacity-70" viewBox="0 0 200 30" preserveAspectRatio="none">
                    <path d="M0,15 C50,30 150,10 200,20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-[#555555] font-medium leading-relaxed mb-12 max-w-sm">
                {t('faq.desc')}
              </p>
              
              <div className="flex flex-col gap-5">
                <span className="text-sm font-bold uppercase tracking-widest text-[#111111]">{t('faq.notFound')}</span>
                <a href="mailto:contact@elevaops.com" className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#007AFF] transition-colors duration-300 w-fit">
                  {t('faq.contact')}
                </a>
              </div>
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
