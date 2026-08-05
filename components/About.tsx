'use client';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import { X, Check, TrendingUp } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 relative z-10 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span 
            className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-4"
          >
            {t('about.manifesto')}
          </span>
          <h2 
            className="font-sans font-semibold text-[clamp(2rem,3vw,3rem)] tracking-tight leading-tight text-[#1d1d1f] dark:text-white max-w-2xl text-balance"
          >
            {t('about.title1')} <span className="text-black/40 dark:text-white/40">{t('about.title2')}</span>
          </h2>
        </div>

        {/* Editorial Problem Statement (No Card) */}
        <div className="w-full max-w-6xl mx-auto mb-16 md:mb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h3 className="font-sans text-[clamp(1.35rem,5.5vw,1.75rem)] md:text-[clamp(1.75rem,3vw,3rem)] font-bold text-[#1d1d1f] dark:text-white leading-[1.25] md:leading-[1.1] tracking-tight md:tracking-tight mb-8 md:mb-10 text-justify md:text-left text-pretty md:text-balance hyphens-auto md:hyphens-none" lang="en">
              {t('about.hero.1')} <br className="hidden lg:block"/>
              <span className="text-black/30 dark:text-white/30">{t('about.hero.2')}</span>
            </h3>
            
            <div className="pl-5 md:pl-6 border-l-[3px] border-[#007AFF] py-2 mb-8 w-full">
              <p className="font-sans text-[1.05rem] md:text-2xl text-[#1d1d1f] dark:text-white font-semibold tracking-tight text-justify md:text-left text-pretty hyphens-auto md:hyphens-none" lang="en">
                {t('about.hero.3')}
              </p>
            </div>
            
            <p className="font-sans text-[0.95rem] md:text-lg text-black/50 dark:text-white/50 leading-relaxed font-medium text-justify md:text-left text-pretty hyphens-auto md:hyphens-none" lang="en">
              {t('about.p2')}
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-end items-center mt-10 lg:mt-0 h-[400px] md:h-[500px]">
            
            {/* Dashboard Mockup — Liquid Glass & Bleeding Edge */}
            <div className="relative w-[110%] md:w-[130%] lg:w-[150%] max-w-[800px] lg:absolute lg:left-0 group z-10">
              {/* Glow */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#007AFF]/15 via-transparent to-[#007AFF]/5 rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Dashboard Window Wrapper for Animated Border */}
              <div className="relative p-[1.5px] rounded-[20px] md:rounded-[28px] overflow-hidden transition-transform duration-700 group-hover:-translate-x-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
                
                {/* Spinning Gradient Border */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_12s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_180deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_12s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Actual Dashboard Window - Liquid Glass */}
                <div className="relative w-full h-full bg-white/70 dark:bg-[#0a0a0f]/80 backdrop-blur-3xl rounded-[19px] md:rounded-[27px] overflow-hidden flex flex-col">
                  
                  {/* Window Top Bar */}
                  <div className="flex items-center gap-2 px-4 md:px-5 py-3 md:py-3.5 border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-black/10 dark:border-transparent"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-black/10 dark:border-transparent"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-black/10 dark:border-transparent"></div>
                    </div>
                    <div className="flex-1 flex justify-center items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse"></div>
                      <span className="text-[10px] text-black/50 dark:text-white/40 font-mono tracking-wider font-semibold">elevaops.core // live_environment</span>
                    </div>
                  </div>

                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="hidden md:flex flex-col w-[160px] border-r border-black/5 dark:border-white/10 bg-white/30 dark:bg-black/20 p-3 gap-1">
                      <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.08] border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#007AFF]"></div>
                        <div className="w-4 h-4 rounded bg-[#007AFF] flex items-center justify-center shadow-sm"><TrendingUp size={10} className="text-white" /></div>
                        <span className="text-[10px] text-[#007AFF] dark:text-white font-bold tracking-tight">Overview</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                        <div className="w-4 h-4 rounded border border-black/10 dark:border-white/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="text-[10px] text-black/60 dark:text-white/50 font-semibold">Integrations</span>
                        <span className="ml-auto text-[8px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-bold">14</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                        <div className="w-4 h-4 rounded border border-black/10 dark:border-white/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        </div>
                        <span className="text-[10px] text-black/60 dark:text-white/50 font-semibold">Workflows</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors mt-auto">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 border border-white/20 flex items-center justify-center overflow-hidden">
                           <div className="w-full h-full bg-[url('https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=transparent')] bg-cover bg-center"></div>
                        </div>
                        <span className="text-[10px] text-black/60 dark:text-white/50 font-semibold">Admin</span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 md:p-5 flex flex-col gap-3 relative z-10">
                      
                      {/* Floating Decorative Orbs */}
                      <div className="absolute top-10 right-10 w-24 h-24 bg-[#007AFF]/10 rounded-full blur-2xl pointer-events-none"></div>
                      <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                      {/* Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 md:gap-4 relative z-10">
                        <div className="bg-white/50 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-xl p-3 md:p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md hover:border-[#007AFF]/30 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] text-black/50 dark:text-white/40 uppercase tracking-widest font-bold">Tools Synced</span>
                            <div className="w-4 h-4 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"></div>
                            </div>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl md:text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">14</span>
                            <span className="text-xs text-black/40 dark:text-white/40 font-medium">/14</span>
                          </div>
                          <div className="w-full h-1 bg-black/5 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div className="w-full h-full bg-[#007AFF] rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="bg-white/50 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-xl p-3 md:p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md hover:border-emerald-500/30 transition-colors relative overflow-hidden">
                          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"></div>
                          <span className="text-[9px] text-black/50 dark:text-white/40 uppercase tracking-widest font-bold block mb-2 relative z-10">Time Saved</span>
                          <span className="text-xl md:text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight block relative z-10">84<span className="text-sm text-black/40 dark:text-white/40 font-medium">h</span></span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1 mt-1 bg-emerald-500/10 px-1.5 py-0.5 rounded relative z-10">↑ This Week</span>
                        </div>
                        
                        <div className="bg-white/50 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-xl p-3 md:p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md flex flex-col justify-between">
                          <span className="text-[9px] text-black/50 dark:text-white/40 uppercase tracking-widest font-bold block">Health</span>
                          <div className="flex items-center justify-between">
                            <span className="text-lg md:text-2xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">Clear</span>
                            {/* SVG Circle Progress */}
                            <div className="relative w-8 h-8">
                              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(150,150,150,0.2)" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#007AFF" strokeWidth="3" strokeDasharray="100, 100" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check size={10} className="text-[#007AFF]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chart Area */}
                      <div className="bg-white/50 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-xl p-3 md:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-black/70 dark:text-white/70 font-bold uppercase tracking-widest">Manual Tasks</span>
                            <span className="text-[8px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded font-bold border border-red-500/20">Declining</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="text-[9px] text-black/40 dark:text-white/30 px-2 py-0.5 rounded font-bold hover:bg-black/5 dark:hover:bg-white/[0.04] cursor-pointer transition-colors">7D</span>
                            <span className="text-[9px] text-[#007AFF] bg-[#007AFF]/10 border border-[#007AFF]/20 px-2 py-0.5 rounded font-bold shadow-sm">30D</span>
                          </div>
                        </div>
                        <svg viewBox="0 0 300 70" className="w-full h-auto" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#007AFF" stopOpacity="0.3"/>
                              <stop offset="100%" stopColor="#007AFF" stopOpacity="0"/>
                            </linearGradient>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#ff5f57" />
                              <stop offset="50%" stopColor="#febc2e" />
                              <stop offset="100%" stopColor="#007AFF" />
                            </linearGradient>
                          </defs>
                          <path d="M0 60 Q40 58 80 45 T160 30 T240 15 T300 8" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round">
                            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0 60 Q40 58 80 45 T160 30 T240 15 T300 8;M0 55 Q40 50 80 40 T160 35 T240 20 T300 5;M0 60 Q40 58 80 45 T160 30 T240 15 T300 8" />
                          </path>
                          <path d="M0 60 Q40 58 80 45 T160 30 T240 15 T300 8 L300 70 L0 70 Z" fill="url(#chartGrad2)">
                            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0 60 Q40 58 80 45 T160 30 T240 15 T300 8 L300 70 L0 70 Z;M0 55 Q40 50 80 40 T160 35 T240 20 T300 5 L300 70 L0 70 Z;M0 60 Q40 58 80 45 T160 30 T240 15 T300 8 L300 70 L0 70 Z" />
                          </path>
                          {/* Data Points */}
                          <circle cx="80" cy="45" r="3" fill="white" stroke="#febc2e" strokeWidth="1.5">
                            <animate attributeName="cy" values="45;40;45" dur="6s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="240" cy="15" r="3" fill="white" stroke="#007AFF" strokeWidth="1.5">
                            <animate attributeName="cy" values="15;20;15" dur="6s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="298" cy="8" r="4.5" fill="white" stroke="#007AFF" strokeWidth="2">
                            <animate attributeName="r" values="4.5;6;4.5" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="cy" values="8;5;8" dur="6s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                      </div>

                      {/* Task List */}
                      <div className="bg-white/50 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 rounded-xl p-3 md:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md relative z-10">
                        <span className="text-[10px] text-black/60 dark:text-white/50 font-bold uppercase tracking-widest block mb-4 flex items-center justify-between">
                          Architecture Sync
                          <span className="text-[8px] bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/10">3 active</span>
                        </span>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors -mx-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-sm relative">
                               <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-50"></div>
                               <Check size={10} className="text-emerald-600 dark:text-emerald-400 font-bold" />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <span className="text-xs text-black/80 dark:text-white/80 font-semibold">WhatsApp ⇄ CRM</span>
                              <span className="text-[9px] text-black/40 dark:text-white/40 font-medium">Synced 2m ago</span>
                            </div>
                            <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shadow-sm">Online</span>
                          </div>
                          
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 -mx-2">
                            <div className="w-5 h-5 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 flex items-center justify-center shadow-sm relative">
                              <div className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                              <span className="text-xs text-black/80 dark:text-white/80 font-semibold">Cross-Platform Data Flow</span>
                              <span className="text-[9px] text-black/40 dark:text-white/40 font-medium">Processing 1.2k records...</span>
                            </div>
                            <span className="text-[9px] text-[#007AFF] font-bold bg-[#007AFF]/10 border border-[#007AFF]/20 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-spin"></div>
                              Running
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Cardless Typographical Presentation */}
        <div className="w-full max-w-5xl mx-auto border-t border-black/10 dark:border-white/20 pt-16 md:pt-24">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-8">
            
            {/* Chaos (Faded, Old Way) */}
            <div 
              className="flex-[0.8] flex flex-col items-center lg:items-start text-center lg:text-left relative"
            >
               {/* Decorative Element */}
               <div className="absolute top-0 right-10 w-12 h-12 rounded-full border border-black border-dashed opacity-[0.05] animate-[spin_12s_linear_infinite] pointer-events-none hidden lg:block"></div>
               <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 border border-black/10 dark:border-white/20">
                 <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
               </div>

               <span className="text-[10px] uppercase tracking-widest font-bold text-black/30 dark:text-white/30 mb-4">{t('about.oldWay')}</span>
               <h3 className="text-4xl md:text-5xl font-sans font-bold text-black/20 dark:text-white/20 tracking-tight line-through decoration-2 mb-4">{t('about.vision')}</h3>
               <p className="text-black/40 dark:text-white/40 font-medium text-base md:text-lg text-balance">{t('about.chaos.desc')}</p>
            </div>

            {/* Elegant Divider */}
            <div className="hidden lg:block w-[1px] bg-gradient-to-b from-black/5 via-black/10 to-transparent"></div>
            <div className="block lg:hidden h-[1px] w-full max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>

            {/* Order (The New Standard) */}
            <div 
              className="flex-[0.8] flex flex-col items-center lg:items-start text-center lg:text-left relative lg:px-4"
            >
               {/* Decorative Element */}
               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#007AFF]/5 rounded-full blur-2xl pointer-events-none"></div>
               <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,122,255,0.2)] border border-[#007AFF]/20">
                 <div className="w-2 h-2 rounded-full bg-[#007AFF]"></div>
               </div>

               <span className="text-[10px] uppercase tracking-widest font-bold text-[#007AFF] mb-4 relative z-10">{t('about.newStandard')}</span>
               <h3 className="text-4xl md:text-5xl font-sans font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-4 relative z-10">{t('about.scale')}</h3>
               <p className="text-black/60 dark:text-white/60 font-medium text-base md:text-lg text-balance relative z-10">{t('about.order.desc')}</p>
            </div>

            {/* Outcome (Restored Card) */}
            <div 
              className="flex-[1.4] w-full bg-white dark:bg-white/5 border-[0.5px] border-black/10 dark:border-white/20 rounded-[24px] md:rounded-[40px] p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)]"
            >
              {/* Background minimal chart graphic */}
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 100 L50 60 L100 80 L180 20" stroke="#007AFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M150 20 L180 20 L180 50" stroke="#007AFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-3 md:mb-4 z-10">
                {t('about.axis')}
              </span>
              <h3 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#1d1d1f] dark:text-white z-10 leading-[1.1] text-balance">
                {t('about.conversion')} <br className="hidden md:block" /> {t('about.conversion2')}
              </h3>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
