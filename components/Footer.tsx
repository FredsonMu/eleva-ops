'use client';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="pt-32 md:pt-48 pb-16 bg-white px-6 md:px-12 selection:bg-black selection:text-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col mb-40 md:mb-60">
           <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 block mb-12">{t('footer.label')}</span>
           <a 
             href="mailto:elevaopsinfo@gmail.com" 
             className="group inline-block"
           >
             <h2 className="font-sans text-[clamp(2.5rem,8vw,8rem)] font-medium leading-[0.9] tracking-tight text-[#111111] transition-all duration-700">
               {t('footer.title1')} <br className="md:hidden" />
               <span className="text-black/30 group-hover:text-black transition-colors duration-1000">{t('footer.title2')}</span>
             </h2>
           </a>
           <div className="mt-12 flex flex-col sm:flex-row gap-6">
             <a href="mailto:elevaopsinfo@gmail.com" className="flex justify-center items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors w-fit">
               {t('footer.contact')} <ArrowUpRight size={14} />
             </a>
             <div className="flex flex-col justify-center">
               <span className="text-sm font-semibold text-black">elevaopsinfo@gmail.com</span>
               <span className="text-xs text-[#666666]">{t('footer.avail')}</span>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-t border-black/10 items-end">
          <div className="flex flex-col gap-6">
            <span className="font-bold text-2xl tracking-tighter">ELEVA OPS.</span>
            <p className="text-xs text-[#666666] max-w-xs">
              {t('footer.desc')}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666] mt-4">
              {t('footer.rights')}
            </span>
          </div>

          <div className="flex flex-col md:items-end gap-8">
          </div>
        </div>
      </div>
    </footer>
  );
}
