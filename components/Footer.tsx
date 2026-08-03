'use client';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="pt-24 md:pt-40 pb-16 bg-[#fbfbfd] px-6 md:px-12 selection:bg-[#007AFF] selection:text-white border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mb-32 md:mb-40">
           <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-8 block">
             {t('footer.label')}
           </span>
           <a 
             href="mailto:contact@elevaops.com" 
             className="group inline-block w-fit"
           >
             <h2 className="font-sans text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[1.05] tracking-tighter text-[#1d1d1f] transition-all duration-700">
               {t('footer.title1')} <br className="md:hidden" />
               <span className="text-black/30 group-hover:text-black transition-colors duration-500 block mt-2">
                 {t('footer.title2')}
               </span>
             </h2>
           </a>
           <div className="mt-16 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
             <a href="mailto:contact@elevaops.com" className="flex justify-center items-center gap-2 bg-[#1d1d1f] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#007AFF] transition-colors duration-300 w-full sm:w-fit shadow-lg shadow-black/5">
               {t('footer.contact')} <ArrowUpRight size={16} className="ml-1" />
             </a>
             <div className="flex flex-col justify-center">
               <span className="text-sm font-semibold text-[#1d1d1f]">contact@elevaops.com</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-1">{t('footer.avail')}</span>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10 border-t border-black/10 items-end">
          <div className="flex flex-col gap-6">
            <span className="font-sans font-bold text-2xl tracking-tighter text-[#1d1d1f]">ELEVA OPS<span className="text-[#007AFF]">.</span></span>
            <p className="text-sm text-black/50 font-medium leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-4">
              {t('footer.rights')}
            </span>
          </div>

          <div className="flex flex-col md:items-end justify-end gap-8 h-full pb-4">
            <a 
              href="https://www.instagram.com/elevaops/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black/50 hover:text-[#007AFF] transition-colors duration-300"
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
