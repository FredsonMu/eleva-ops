'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight, Check } from 'lucide-react';
import { revealStyle, useInView } from './Reveal';

export function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [sectionRef, inView] = useInView<HTMLElement>('0px 0px -25% 0px');
  // Staggered reveal: each item waits 0.1s longer than the previous one.
  const reveal = (i: number) => revealStyle({ y: 60, duration: 1.2, delay: i * 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    setFormState('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState('success');
      form.reset(); // Clear the form
      
      // Reset button state after 4 seconds
      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error(error);
      setFormState('idle'); // Should probably add an error state later, but idle is fine for now
      alert(t('contact.error'));
    }
  };

  return (
    <section ref={sectionRef} id="contact" className={`py-24 md:py-40 relative z-10 overflow-hidden bg-transparent ${inView ? 'in-view' : ''}`}>
      
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,122,255,0.05),rgba(0,122,255,0.03)_45%,transparent)] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Massive Editorial Typography */}
          <div className="w-full lg:w-5/12 flex flex-col justify-start pt-4 items-center text-center lg:items-start lg:text-left">
            <div style={reveal(0)} className="reveal mb-6 md:mb-8">
               <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand">
                 {t('contact.label')}
               </span>
            </div>
            
            <h2 style={reveal(1)} className="reveal font-sans font-semibold text-[clamp(3rem,6vw,6rem)] tracking-tighter leading-[0.95] text-[#1d1d1f] dark:text-white text-balance mb-8">
              {t('contact.title1')} <br />
              <span className="text-brand">
                {t('contact.title2')}
              </span>
            </h2>
            
            <p style={reveal(2)} className="reveal text-black/60 dark:text-white/60 font-medium text-lg md:text-xl max-w-md leading-relaxed text-balance">
              {t('contact.desc')}
            </p>
          </div>

          {/* Right Column: Awwwards-style Minimalist Form */}
          <div className="w-full lg:w-7/12 mt-8 lg:mt-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-16 w-full max-w-2xl lg:ml-auto">
              
              {/* Name Input */}
              <div style={reveal(3)} className="reveal relative group">
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-black/10 dark:border-white/20 py-4 md:py-6 text-2xl md:text-4xl text-[#1d1d1f] dark:text-white font-medium outline-none transition-colors focus:border-[#007AFF] text-center md:text-left"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1/2 -translate-y-1/2 text-2xl md:text-4xl text-black/45 dark:text-white/55 font-medium pointer-events-none transition-[transform,opacity,box-shadow] duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-brand peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest peer-valid:text-black/55 dark:peer-valid:text-white/55 peer-valid:font-bold whitespace-nowrap"
                >
                  {t('contact.name')}
                </label>
              </div>
              
              {/* Email Input */}
              <div style={reveal(4)} className="reveal relative group">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-black/10 dark:border-white/20 py-4 md:py-6 text-2xl md:text-4xl text-[#1d1d1f] dark:text-white font-medium outline-none transition-colors focus:border-[#007AFF] text-center md:text-left"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-1/2 -translate-y-1/2 text-2xl md:text-4xl text-black/45 dark:text-white/55 font-medium pointer-events-none transition-[transform,opacity,box-shadow] duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-brand peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest peer-valid:text-black/55 dark:peer-valid:text-white/55 peer-valid:font-bold whitespace-nowrap"
                >
                  {t('contact.email')}
                </label>
              </div>

              {/* Message Input */}
              <div style={reveal(5)} className="reveal relative group mt-4">
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={1}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-black/10 dark:border-white/20 py-4 md:py-6 text-2xl md:text-3xl text-[#1d1d1f] dark:text-white font-medium outline-none transition-colors focus:border-[#007AFF] resize-none overflow-hidden min-h-[80px] text-center md:text-left"
                  onInput={(e) => {
                    // Auto-resize textarea
                    const target = e.target as HTMLTextAreaElement;
                    requestAnimationFrame(() => {
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    });
                  }}
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-6 -translate-y-1/2 text-2xl md:text-3xl text-black/45 dark:text-white/55 font-medium pointer-events-none transition-[transform,opacity,box-shadow] duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-brand peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest peer-valid:text-black/55 dark:peer-valid:text-white/55 peer-valid:font-bold whitespace-nowrap"
                >
                  {t('contact.message')}
                </label>
              </div>

              {/* Submit Button */}
              <div style={reveal(6)} className="reveal pt-8 md:pt-12 flex justify-center md:justify-start">
                <button 
                  type="submit"
                  disabled={formState !== 'idle'}
                  className="group relative inline-flex items-center gap-6 overflow-hidden rounded-full bg-[#1d1d1f] dark:bg-white/10 px-10 py-6 font-semibold text-white transition-[transform,opacity,box-shadow] duration-300 hover:bg-black hover:shadow-[0_10px_40px_rgba(0,122,255,0.2)] disabled:opacity-70"
                >
                  <span className="text-lg md:text-xl tracking-tight relative z-10">
                    {formState === 'idle' && t('contact.submit')}
                    {formState === 'loading' && t('contact.loading')}
                    {formState === 'success' && t('contact.success')}
                  </span>
                  
                  {formState === 'idle' && (
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110">
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}

                  {formState === 'loading' && (
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}

                  {formState === 'success' && (
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  
                  {/* Hover Sweep Effect */}
                  <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-[#007AFF] transition-transform duration-500 group-hover:translate-x-0"></div>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
