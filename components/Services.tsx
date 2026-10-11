'use client';
import { Reveal } from './Reveal';
import { useLanguage } from '@/lib/i18n';
import { Target, Zap, LineChart, MessageSquare, Database, Globe, Link, Shield, Activity, Bot, ArrowRight, Layers, CheckCircle2, Sparkles, User } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="relative bg-transparent pt-24 md:pt-32 pb-32 md:pb-40 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-6">
        
        {/* Header */}
        <Reveal y={40} duration={0.7} rootMargin="0px 0px -100px 0px" className="mb-12 md:mb-20 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF] mb-4 inline-block border border-black/5 dark:border-white/10 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 shadow-sm">
            {t('serv.label')}
          </span>
          <h2 className="font-sans text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight font-semibold text-[#1d1d1f] dark:text-white max-w-4xl text-balance">
            {t('serv.title1')} <br className="hidden md:block" />
            <span className="text-black/30 dark:text-white/30">{t('serv.title2')}</span>
          </h2>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* 1. Presence & Conversion (Wide Card) */}
          <Reveal duration={0.6} rootMargin="0px 0px -50px 0px" className="lg:col-span-2">
            <div className="relative group p-[1px] md:p-[1.5px] rounded-[25px] md:rounded-[33px] overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-[transform,opacity,box-shadow] duration-500 h-[340px] md:h-[380px]">
            {/* Spinning Gradient Border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_180deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative w-full h-full bg-white dark:bg-[#0a0a0f] border border-black/5 dark:border-white/10 rounded-[24px] md:rounded-[31.5px] overflow-hidden transition-colors duration-500">
              {/* Visual - Vercel Level Precision */}
              <div className="absolute inset-0 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-end">
                
                {/* SVG Dot Grid Background */}
                <svg className="absolute inset-0 w-full h-full text-black dark:text-white opacity-[0.03] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dot-grid)"/>
                </svg>

                {/* Fade masks for the grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-[#0a0a0f] dark:via-transparent dark:to-[#0a0a0f]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-[#0a0a0f]"></div>

                {/* Minimalist Chart */}
                <div className="relative w-[120%] md:w-full h-[180%] right-[-15%] md:right-[-5%] bottom-[-20%] transition-transform duration-1000 ease-out -translate-y-4 md:translate-y-0 md:group-hover:-translate-y-4">
                  <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-visible">
                    <defs>
                      <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#007AFF" stopOpacity="0.15"/>
                        <stop offset="100%" stopColor="#007AFF" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#007AFF" stopOpacity="0"/>
                        <stop offset="40%" stopColor="#007AFF" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#409cff" stopOpacity="1"/>
                      </linearGradient>
                    </defs>
                    
                    {/* The Chart Fill */}
                    <path 
                      d="M0,350 Q200,330 400,250 T700,160 T900,80 L900,400 L0,400 Z" 
                      fill="url(#chart-glow)"
                    />
                    
                    {/* The Chart Line */}
                    <path 
                      d="M0,350 Q200,330 400,250 T700,160 T900,80" 
                      fill="none" 
                      stroke="url(#line-gradient)" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_4px_12px_rgba(0,122,255,0.4)]"
                    />
                    
                    {/* Data Point */}
                    <g transform="translate(900, 80)">
                      <circle cx="0" cy="0" r="24" fill="#007AFF" opacity="0.1" className="md:animate-ping" />
                      <circle cx="0" cy="0" r="4.5" fill="white" stroke="#007AFF" strokeWidth="2.5" className="dark:fill-black" />
                    </g>
                  </svg>
                  
                  {/* Tooltip & Crosshair */}
                  <div className="absolute right-[10%] md:right-[15%] top-[30%] flex flex-col items-center">
                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 mb-2 -translate-y-2 md:translate-y-0 md:group-hover:-translate-y-2 transition-transform duration-700 ease-out">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse"></div>
                      <span className="text-[10px] font-medium text-[#1d1d1f] dark:text-white/80">{t('serv.v1.conversion')}</span>
                      <span className="text-[10px] font-mono text-emerald-500 font-bold ml-1">+24.2%</span>
                    </div>
                    {/* Vertical line connecting tooltip to graph dot */}
                    <div className="w-px h-[80px] md:h-[60px] md:group-hover:h-[80px] bg-gradient-to-b from-black/20 dark:from-white/20 to-transparent transition-[transform,opacity,box-shadow] duration-700 ease-out"></div>
                  </div>

                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-2/3 pointer-events-none">
                <span className="font-mono text-xs font-bold text-[#007AFF] mb-2 block">/01</span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-[#1d1d1f] dark:text-white mb-2 md:mb-3 tracking-tight">
                  {t('serv.1.title')}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-xs md:text-sm leading-relaxed max-w-sm">
                  {t('serv.1.desc')}
                </p>
              </div>
            </div>
          </div>
          </Reveal>

          {/* 2. Smart Automation (Narrow Card) */}
          <Reveal duration={0.6} delay={0.1} rootMargin="0px 0px -50px 0px" className="lg:col-span-1">
            <div className="relative group p-[1px] md:p-[1.5px] rounded-[25px] md:rounded-[33px] overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-[transform,opacity,box-shadow] duration-500 h-[340px] md:h-[380px]">
            {/* Spinning Gradient Border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_280deg,#10b981_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_180deg,transparent_0_280deg,#10b981_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative w-full h-full bg-white dark:bg-[#0a0a0f] border border-black/5 dark:border-white/10 rounded-[24px] md:rounded-[31.5px] overflow-hidden transition-colors duration-500">
              {/* Visual - Vercel Level Precision */}
              <div className="absolute inset-0 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-start justify-center pt-8">
                
                {/* SVG Dot Grid Background */}
                <svg className="absolute inset-0 w-full h-full text-black dark:text-white opacity-[0.03] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dot-grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dot-grid-2)"/>
                </svg>

                {/* Fade masks for the grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-[#0a0a0f] dark:via-transparent dark:to-[#0a0a0f]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0a0a0f] dark:via-[#0a0a0f]/80"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0a0a0f] dark:via-[#0a0a0f]/80"></div>

                {/* Node Graph Composition */}
                <div className="relative w-full h-[180px] mt-6 flex items-center justify-center transition-transform duration-1000 ease-out scale-105 md:scale-100 md:group-hover:scale-105">
                  
                  {/* Glow Behind Center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-emerald-500/10 blur-md md:blur-3xl rounded-full"></div>

                  {/* SVG Connecting Lines */}
                  <svg className="hidden md:block absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                     <defs>
                        <linearGradient id="line-glow-emerald" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0"/>
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"/>
                        </linearGradient>
                     </defs>
                     
                     {/* Paths - Base Lines */}
                     <path d="M 100 100 C 150 100, 150 100, 200 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/10 dark:text-white/10" />
                     <path d="M 200 100 C 250 100, 250 60, 300 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/10 dark:text-white/10" />
                     <path d="M 200 100 C 250 100, 250 140, 300 140" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/10 dark:text-white/10" />

                     {/* Paths - Animated Data Flow */}
                     <path d="M 100 100 C 150 100, 150 100, 200 100" fill="none" stroke="url(#line-glow-emerald)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 12" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                        <animate attributeName="stroke-dashoffset" values="36;0" dur="1.5s" repeatCount="indefinite" />
                     </path>
                     
                     <path d="M 200 100 C 250 100, 250 60, 300 60" fill="none" stroke="url(#line-glow-emerald)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 12" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                        <animate attributeName="stroke-dashoffset" values="36;0" dur="1.5s" repeatCount="indefinite" />
                     </path>

                     <path d="M 200 100 C 250 100, 250 140, 300 140" fill="none" stroke="url(#line-glow-emerald)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 12" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                        <animate attributeName="stroke-dashoffset" values="36;0" dur="1.5s" repeatCount="indefinite" />
                     </path>
                  </svg>

                  {/* Node 1: Left (Trigger) */}
                  <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-2 rounded-md shadow-sm -translate-x-2 md:translate-x-0 md:group-hover:-translate-x-2 transition-transform duration-700 ease-out z-10 flex items-center justify-center">
                     <Database size={12} className="text-[#1d1d1f] dark:text-white/70" />
                     <div className="absolute -top-6 text-[8px] font-mono text-black/40 dark:text-white/40">Webhook</div>
                  </div>

                  {/* Central Node (Processor) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111] border border-emerald-500/30 dark:border-emerald-500/30 p-2.5 rounded-lg shadow-[0_0_25px_rgba(16,185,129,0.25)] md:shadow-[0_0_15px_rgba(16,185,129,0.15)] md:group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-[transform,opacity,box-shadow] duration-700 ease-out z-20">
                     <Layers size={14} className="text-emerald-500" />
                     {/* Pulse effect */}
                     <div className="absolute inset-0 rounded-lg border border-emerald-500/50 md:animate-ping opacity-20 md:opacity-0 md:group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>

                  {/* Node 2: Right Top (Action 1) */}
                  <div className="absolute left-[75%] top-[30%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-2 rounded-md shadow-sm translate-x-2 -translate-y-1 md:translate-x-0 md:translate-y-0 md:group-hover:translate-x-2 md:group-hover:-translate-y-1 transition-transform duration-700 ease-out z-10 flex items-center justify-center">
                     <MessageSquare size={12} className="text-[#1d1d1f] dark:text-white/70" />
                     <div className="absolute left-8 text-[8px] font-mono text-black/40 dark:text-white/40 whitespace-nowrap">Notify Slack</div>
                  </div>

                  {/* Node 3: Right Bottom (Action 2) */}
                  <div className="absolute left-[75%] top-[70%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-2 rounded-md shadow-sm translate-x-2 translate-y-1 md:translate-x-0 md:translate-y-0 md:group-hover:translate-x-2 md:group-hover:translate-y-1 transition-transform duration-700 ease-out z-10 flex items-center justify-center">
                     <Globe size={12} className="text-[#1d1d1f] dark:text-white/70" />
                     <div className="absolute left-8 text-[8px] font-mono text-black/40 dark:text-white/40 whitespace-nowrap">Update CRM</div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[75%] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[8px] font-mono px-2 py-0.5 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                    Synced
                  </div>
                </div>

              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full pointer-events-none">
                <span className="font-mono text-xs font-bold text-[#007AFF] mb-2 block">/02</span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-[#1d1d1f] dark:text-white mb-2 tracking-tight">
                  {t('serv.2.title')}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-xs md:text-sm leading-relaxed">
                  {t('serv.2.desc')}
                </p>
              </div>
            </div>
          </div>
          </Reveal>

          {/* 3. Internal Platforms (Narrow Card) */}
          <Reveal duration={0.6} delay={0.2} rootMargin="0px 0px -50px 0px" className="lg:col-span-1">
            <div className="relative group p-[1px] md:p-[1.5px] rounded-[25px] md:rounded-[33px] overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-[transform,opacity,box-shadow] duration-500 h-[340px] md:h-[380px]">
            {/* Spinning Gradient Border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_280deg,#a855f7_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_180deg,transparent_0_280deg,#a855f7_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative w-full h-full bg-white dark:bg-[#0a0a0f] border border-black/5 dark:border-white/10 rounded-[24px] md:rounded-[31.5px] overflow-hidden transition-colors duration-500">
              {/* Visual - Vercel Level Precision */}
              <div className="absolute inset-0 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-start justify-center pt-8">
                
                {/* SVG Dot Grid Background */}
                <svg className="absolute inset-0 w-full h-full text-black dark:text-white opacity-[0.03] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dot-grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dot-grid-3)"/>
                </svg>

                {/* Fade masks for the grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-[#0a0a0f] dark:via-transparent dark:to-[#0a0a0f]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0a0a0f] dark:via-[#0a0a0f]/80"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0a0a0f] dark:via-[#0a0a0f]/80"></div>

                {/* UI Composition */}
                <div className="relative w-[220px] md:w-[240px] mt-2 transition-transform duration-1000 ease-out scale-[1.03] -translate-y-2 md:scale-100 md:translate-y-0 md:group-hover:scale-[1.03] md:group-hover:-translate-y-2">
                  
                  {/* Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-purple-500/10 blur-md md:blur-3xl rounded-full"></div>

                  {/* Vercel Style Table Component */}
                  <div className="relative bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                      <Shield size={12} className="text-purple-500" />
                      <span className="text-[9px] font-mono font-semibold tracking-wider text-[#1d1d1f] dark:text-white/80 uppercase">{t('serv.v3.matrix')}</span>
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300 bg-purple-500/5 md:bg-purple-500/0 md:group-hover:bg-purple-500/5">
                        <div className="flex items-center gap-2 relative z-10">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                          <span className="text-[10px] text-[#1d1d1f] dark:text-white/70 font-medium">{t('serv.v3.admin')}</span>
                        </div>
                        <div className="flex gap-1 relative z-10">
                          <span className="text-[8px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">{t('serv.v3.all')}</span>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300 bg-black/5 dark:bg-white/5 md:bg-black/0 md:dark:bg-white/0 md:group-hover:bg-black/5 md:dark:group-hover:bg-white/5 delay-75">
                        <div className="flex items-center gap-2 relative z-10">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"></div>
                          <span className="text-[10px] text-[#1d1d1f] dark:text-white/70">{t('serv.v3.staff')}</span>
                        </div>
                        <div className="flex gap-1 relative z-10">
                          <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{t('serv.v3.read')}</span>
                          <span className="text-[8px] font-mono text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded border border-black/10 dark:border-white/10">{t('serv.v3.write')}</span>
                        </div>
                      </div>

                      {/* Row 3 - Skeleton row to look like a full system */}
                      <div className="flex items-center justify-between px-3 py-2 relative">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10"></div>
                          <div className="w-12 h-2 rounded bg-black/5 dark:bg-white/5"></div>
                        </div>
                        <div className="w-8 h-3 rounded bg-black/5 dark:bg-white/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Action Pill */}
                  <div className="absolute -right-4 -bottom-3 bg-white dark:bg-[#1a1a24] border border-black/10 dark:border-white/10 px-2.5 py-1.5 rounded-md shadow-lg flex items-center gap-1.5 opacity-100 translate-x-2 md:opacity-0 md:translate-x-0 md:group-hover:opacity-100 md:group-hover:translate-x-2 transition-[transform,opacity,box-shadow] duration-500 delay-100 z-20">
                    <CheckCircle2 size={10} className="text-purple-500" />
                    <span className="text-[8px] font-mono text-[#1d1d1f] dark:text-white/70">{t('serv.v3.access')}</span>
                  </div>

                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full pointer-events-none z-10">
                <span className="font-mono text-xs font-bold text-[#007AFF] mb-2 block">/03</span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-[#1d1d1f] dark:text-white mb-2 tracking-tight">
                  {t('serv.3.title')}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-xs md:text-sm leading-relaxed">
                  {t('serv.3.desc')}
                </p>
              </div>
            </div>
          </div>
          </Reveal>

          {/* 4. AI Agents (Wide Card) */}
          <Reveal duration={0.6} delay={0.3} rootMargin="0px 0px -50px 0px" className="lg:col-span-2">
            <div className="relative group p-[1px] md:p-[1.5px] rounded-[25px] md:rounded-[33px] overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-[transform,opacity,box-shadow] duration-500 h-[340px] md:h-[380px]">
            {/* Spinning Gradient Border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(from_180deg,transparent_0_280deg,#007AFF_360deg)] animate-[spin_12s_linear_infinite] hidden md:block opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative w-full h-full bg-white dark:bg-[#0a0a0f] border border-black/5 dark:border-white/10 rounded-[24px] md:rounded-[31.5px] overflow-hidden transition-colors duration-500">
              {/* Visual - Vercel Level Precision */}
              <div className="absolute inset-0 opacity-100 md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-start pt-6 md:pt-0 md:items-center justify-end pr-4 md:pr-12">
                
                {/* SVG Dot Grid Background */}
                <svg className="absolute inset-0 w-full h-full text-black dark:text-white opacity-[0.03] dark:opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dot-grid-4" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dot-grid-4)"/>
                </svg>

                {/* Fade masks for the grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-[#0a0a0f] dark:via-transparent dark:to-[#0a0a0f]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-white dark:from-transparent dark:via-[#0a0a0f]/80 dark:to-[#0a0a0f]"></div>

                {/* AI Console UI Composition */}
                <div className="relative w-[280px] md:w-[320px] transition-transform duration-1000 ease-out -translate-x-4 md:translate-x-0 md:group-hover:-translate-x-4 scale-90 md:scale-100 origin-top-right md:origin-center">
                  
                  {/* Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#007AFF]/10 blur-md md:blur-3xl rounded-full"></div>

                  {/* Sleek AI Window */}
                  <div className="relative bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden">
                    
                    {/* Console Header */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                      <div className="flex gap-1.5">
                         <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10"></div>
                         <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10"></div>
                      </div>
                      <span className="text-[9px] font-mono font-semibold tracking-wider text-[#1d1d1f] dark:text-white/80 uppercase ml-2 flex items-center gap-1.5">
                        <Sparkles size={10} className="text-[#007AFF]" />
                        {t('serv.v4.agent')}
                      </span>
                    </div>

                    {/* Chat Area */}
                    <div className="p-4 space-y-4">
                      
                      {/* AI Message */}
                      <div className="flex gap-3">
                         <div className="w-5 h-5 rounded flex items-center justify-center bg-black/5 dark:bg-white/5 shrink-0 mt-0.5 border border-black/5 dark:border-white/5">
                           <Bot size={12} className="text-[#1d1d1f] dark:text-white/70" />
                         </div>
                         <div className="space-y-1">
                           <div className="flex items-center gap-2">
                             <span className="text-[9px] font-medium text-[#1d1d1f] dark:text-white">ElevaOps AI</span>
                             <span className="text-[8px] font-mono text-black/40 dark:text-white/40">10:42 AM</span>
                           </div>
                           <p className="text-[10px] text-black/70 dark:text-white/70 leading-relaxed font-mono">
                             {t('serv.v4.msg1')}
                           </p>
                         </div>
                      </div>

                      {/* User Message */}
                      <div className="flex gap-3 pt-3 border-t border-black/5 dark:border-white/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150">
                         <div className="w-5 h-5 rounded flex items-center justify-center bg-[#007AFF]/10 shrink-0 mt-0.5 border border-[#007AFF]/20">
                           <User size={12} className="text-[#007AFF]" />
                         </div>
                         <div className="space-y-1">
                           <div className="flex items-center gap-2">
                             <span className="text-[9px] font-medium text-[#1d1d1f] dark:text-white">You</span>
                           </div>
                           <p className="text-[10px] text-black/70 dark:text-white/70 leading-relaxed font-mono">
                             {t('serv.v4.msg2')}
                           </p>
                         </div>
                      </div>

                      {/* AI Generating Indicator */}
                      <div className="flex gap-3 pt-3 border-t border-black/5 dark:border-white/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-700">
                         <div className="w-5 h-5 rounded flex items-center justify-center bg-black/5 dark:bg-white/5 shrink-0 border border-black/5 dark:border-white/5">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse"></div>
                         </div>
                         <div className="flex items-center">
                           <div className="h-3 w-2 bg-[#007AFF]/60 animate-pulse"></div>
                         </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-1/2 pointer-events-none bg-gradient-to-t from-white via-white/80 dark:from-[#0a0a0f] dark:via-[#0a0a0f]/80 to-transparent">
                <span className="font-mono text-xs font-bold text-[#007AFF] mb-2 block">/04</span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-[#1d1d1f] dark:text-white mb-2 md:mb-3 tracking-tight">
                  {t('serv.4.title')}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-xs md:text-sm leading-relaxed max-w-sm">
                  {t('serv.4.desc')}
                </p>
              </div>
            </div>
          </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
