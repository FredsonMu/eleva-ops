'use client';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="pt-24 md:pt-40 pb-16 bg-transparent px-4 md:px-6 selection:bg-[#007AFF] selection:text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-32 md:mb-40 w-full">
           
           <div className="flex flex-col w-full md:w-3/5 z-10 relative">
             <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-8 block">
               {t('footer.label')}
             </span>
             <a 
               href="mailto:contact@elevaops.com" 
               className="group inline-block w-fit"
             >
               <h2 className="font-sans text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[1.05] tracking-tighter text-[#1d1d1f] dark:text-white transition-all duration-700">
                 {t('footer.title1')} <br className="md:hidden" />
                 <span className="text-black/30 dark:text-white/30 group-hover:text-black transition-colors duration-500 block mt-2">
                   {t('footer.title2')}
                 </span>
               </h2>
             </a>
             <div className="mt-16 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
               <a href="mailto:contact@elevaops.com" className="flex justify-center items-center gap-2 bg-[#1d1d1f] dark:bg-white dark:bg-white/5 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#007AFF] transition-colors duration-300 w-full sm:w-fit shadow-lg shadow-black/5">
                 {t('footer.contact')} <ArrowUpRight size={16} className="ml-1" />
               </a>
               <div className="flex flex-col justify-center">
                 <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">contact@elevaops.com</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mt-1">{t('footer.avail')}</span>
               </div>
             </div>
           </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10 border-t border-black/10 dark:border-white/20 items-end">
          <div className="flex flex-col gap-6">
            <span className="font-sans font-bold text-2xl tracking-tighter text-[#1d1d1f] dark:text-white">ELEVA OPS<span className="text-[#007AFF]">.</span></span>
            <p className="text-sm text-black/50 dark:text-white/50 font-medium leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
                {t('footer.rights')}
              </span>
              <a href="/privacy-policy" className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] hover:text-[#005bb5] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-end gap-8 h-full pb-4">
            <a 
              href="https://www.instagram.com/elevaops/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black/50 dark:text-white/50 hover:text-[#007AFF] transition-colors duration-300"
            >
              <Instagram size={20} strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
