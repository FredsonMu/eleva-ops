'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useRef, useState, useEffect, useCallback } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  tag?: string;
  video: string;
}

function ProjectCard({ 
  p, 
  i, 
  isHovered, 
  setIsHovered,
  isActiveVideo,
  onVideoPlay,
  onVideoStop 
}: { 
  p: Project; 
  i: number; 
  isHovered: boolean;
  setIsHovered: (h: boolean) => void;
  isActiveVideo: boolean;
  onVideoPlay: (id: string) => void;
  onVideoStop: (id: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Pause this video when another video becomes active
  useEffect(() => {
    if (!isActiveVideo && isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActiveVideo, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onVideoStop(p.id);
      } else {
        setHasPlayed(true);
        onVideoPlay(p.id);
        videoRef.current.play().catch(err => console.log("Video play interrupted", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      onVideoPlay(p.id);
      videoRef.current.play().catch(err => console.log(err));
      setIsPlaying(true);
      setHasPlayed(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky w-full max-w-[1300px] mx-auto z-[${10 + i}] group`}
      style={{ top: `calc(15vh + ${i * 40}px)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-black/5 shadow-2xl p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 md:gap-10 transition-transform duration-500 hover:-translate-y-2 origin-top">
        
        {/* Left Side: Video Container */}
        <div 
          className="relative w-full lg:w-2/3 aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer group/video bg-[#FAFAFA]"
          onClick={togglePlay}
        >
          <video 
            ref={videoRef}
            src={`${p.video}#t=0.001`}
            loop
            muted
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
          />
              
          {/* Play Button */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center transition-all duration-500 bg-black/10"
              >
                <motion.button 
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-2xl flex items-center justify-center shadow-2xl transition-all duration-300"
                >
                  <Play size={36} fill="#007AFF" className="text-[#007AFF] ml-2" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Minimal Restart Button */}
          <AnimatePresence>
            {hasPlayed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                onClick={restartVideo}
                className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 z-10 border-2 border-white/50 ${isPlaying ? 'bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-[#007AFF]' : 'bg-white/90 text-[#007AFF] hover:bg-[#007AFF] hover:text-white'}`}
                title="Reiniciar Vídeo"
              >
                <RotateCcw size={20} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        {/* Right Side: Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center py-4 md:py-8 pr-4">
          <div className="flex items-center gap-3 mb-6 md:mb-10">
            <span className="font-mono text-2xl md:text-3xl font-black text-[#007AFF] bg-[#007AFF]/10 px-4 py-2 rounded-xl">
              {p.id}
            </span>
            <span className="w-12 h-[2px] bg-black/10" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#888888]">
              {p.category}
            </span>
          </div>
          
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-[#111111] leading-[1.1] mb-6">
            {p.title}
          </h3>

          {p.tag && (
            <div className="mb-8">
              <span className="inline-block px-5 py-2 rounded-full border-2 border-[#007AFF]/20 bg-[#007AFF]/5 text-[11px] font-black uppercase tracking-widest text-[#007AFF]">
                {p.tag}
              </span>
            </div>
          )}
          
        </div>
        
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleVideoPlay = useCallback((id: string) => {
    setActiveVideoId(id);
  }, []);

  const handleVideoStop = useCallback((id: string) => {
    setActiveVideoId(prev => prev === id ? null : prev);
  }, []);

  const projects: Project[] = [
    { 
      id: "01", 
      title: t('proj.1.title'), 
      category: t('proj.1.cat'), 
      tag: t('proj.1.tag'),
      video: "/video/botanica.mp4",
    },
    { 
      id: "02", 
      title: t('proj.2.title'), 
      category: t('proj.2.cat'), 
      video: "/video/ec_group.mp4",
    },
    { 
      id: "03", 
      title: t('proj.3.title'), 
      category: t('proj.3.cat'), 
      video: "/video/casa_norte.mp4",
    },
  ];

  return (
    <section id="trabalho" className="py-32 md:py-52 bg-[#FAFAFA] overflow-visible relative z-10">
      
      {/* Playful background pattern (dots) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="w-full px-4 md:px-8 relative z-10">
        
        <header className="max-w-[1300px] mx-auto mb-24 md:mb-40 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="font-handwritten text-2xl md:text-3xl text-[#007AFF] font-bold inline-block px-6 py-2 border-2 border-[#007AFF] rounded-[2rem] bg-[#007AFF]/5 transform rotate-2">
              {t('proj.label')}
            </span>
          </motion.div>
          
          <h2 className="font-sans text-[clamp(3rem,6vw,6rem)] font-black tracking-tight text-[#111111] leading-[0.95] mb-8 text-balance max-w-5xl">
            {t('proj.title1')} <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10">{t('proj.title2')}</span>
              {/* Hand-drawn underline */}
              <svg className="absolute -bottom-4 left-0 w-full h-8 text-[#FFD500] -z-10" viewBox="0 0 200 30" preserveAspectRatio="none">
                <path d="M0,15 C50,30 150,10 200,20" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-[#555555] leading-relaxed max-w-2xl font-medium mt-8">
            {t('proj.subtitle')}
          </p>
        </header>

        {/* Sticky Stacking Cards Container */}
        <div className="flex flex-col gap-12 md:gap-24 pb-32">
          {projects.map((p, i) => (
            <ProjectCard 
              key={p.id} 
              p={p} 
              i={i} 
              isHovered={hoveredIndex === i}
              setIsHovered={(h) => setHoveredIndex(h ? i : null)}
              isActiveVideo={activeVideoId === p.id}
              onVideoPlay={handleVideoPlay}
              onVideoStop={handleVideoStop}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
