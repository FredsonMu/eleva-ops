'use client';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="pt-32 md:pt-48 pb-16 bg-[#fbfbfb] px-6 md:px-12 selection:bg-[#007AFF] selection:text-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col mb-32 md:mb-48">
           <span className="inline-block font-handwritten text-2xl md:text-3xl font-bold text-[#007AFF] transform -rotate-2 mb-8">{t('footer.label')}</span>
           <a 
             href="mailto:contact@elevaops.com" 
             className="group inline-block w-fit"
           >
             <h2 className="font-sans text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-[#111111] transition-all duration-700">
               {t('footer.title1')} <br className="md:hidden" />
               <span className="text-black/30 group-hover:text-black transition-colors duration-500 relative inline-block">
                 {t('footer.title2')}
                 <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 text-[#FFD500] -z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-500" viewBox="0 0 200 30" preserveAspectRatio="none">
                   <path d="M0,15 C50,30 150,10 200,20" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                 </svg>
               </span>
             </h2>
           </a>
           <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
             <a href="mailto:contact@elevaops.com" className="flex justify-center items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#007AFF] transition-colors duration-300 w-full sm:w-fit">
               {t('footer.contact')} <ArrowUpRight size={18} className="ml-1" />
             </a>
             <div className="flex flex-col justify-center">
               <span className="text-sm font-bold text-[#111111]">contact@elevaops.com</span>
               <span className="text-xs font-bold uppercase tracking-widest text-[#555555] mt-1">{t('footer.avail')}</span>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10 border-t border-black/10 items-end">
          <div className="flex flex-col gap-6">
            <span className="font-sans font-black text-3xl tracking-tighter text-[#111111]">ELEVA OPS<span className="text-[#007AFF]">.</span></span>
            <p className="text-sm text-[#555555] font-medium leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#555555] mt-4">
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
