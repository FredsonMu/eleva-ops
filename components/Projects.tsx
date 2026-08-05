'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useRef, useState, useEffect, useCallback } from 'react';

const springConfig = { type: "spring" as const, stiffness: 100, damping: 20 };

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
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={springConfig}
      className={`sticky w-full max-w-[1200px] mx-auto z-[${10 + i}] group`}
      style={{ top: `calc(15vh + ${i * 40}px)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-white/5 border-[0.5px] border-black/10 dark:border-white/20 rounded-[24px] md:rounded-[48px] p-2 flex flex-col lg:flex-row gap-0 transition-transform duration-700 hover:-translate-y-2 origin-top relative overflow-hidden shadow-[0_4px_24px_-10px_rgba(0,0,0,0.05)]">
        <div className="w-full h-full bg-white dark:bg-white/5 rounded-[20px] md:rounded-[40px] flex flex-col lg:flex-row p-4 md:p-6 lg:p-8 gap-6 md:gap-10">
          
          {/* Left Side: Video Container */}
          <div 
            className="relative w-full aspect-video rounded-[16px] md:rounded-[32px] overflow-hidden cursor-pointer group/video shadow-inner bg-black/5 dark:bg-white/5"
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
              className="w-full h-full object-cover transition-transform duration-1000 group-hover/video:scale-105"
            />
                
            {/* Play Button */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500 bg-black/5 dark:bg-white/5"
                >
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/video:bg-white dark:bg-white/5"
                  >
                    <Play size={28} fill="#1d1d1f" className="text-[#1d1d1f] dark:text-white ml-1.5 md:ml-2 w-6 h-6 md:w-8 md:h-8" />
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
                  className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 bg-white/90 backdrop-blur-md hover:bg-white dark:bg-white/5 text-black`}
                  title="Restart"
                >
                  <RotateCcw size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          {/* Right Side: Content */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center items-center text-center lg:items-start lg:text-left py-4 md:py-8 lg:pr-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 md:mb-8">
              <span className="font-sans text-lg md:text-2xl font-bold text-black/30 dark:text-white/30">
                {p.id}
              </span>
              <span className="w-6 md:w-8 h-[2px] bg-black/10 dark:bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#007AFF]">
                {p.category}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#1d1d1f] dark:text-white leading-[1.1] mb-6 text-balance">
              {p.title}
            </h3>

            {p.tag && (
              <div className="mb-4 md:mb-8">
                <span className="bg-[#007AFF] text-white shadow-[0_4px_20px_rgba(0,122,255,0.4)] border border-white/20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-widest">
                  <span className="text-white/80 text-[10px]">★</span> {p.tag}
                </span>
              </div>
            )}
            
          </div>
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
    <section id="trabalho" className="py-20 md:py-40 relative z-10 overflow-visible bg-transparent">
      
      <div className="w-full px-4 md:px-6 relative z-10">
        <header className="max-w-4xl mx-auto mb-16 md:mb-32 text-center flex flex-col items-center">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#007AFF]">
              {t('proj.label')}
            </span>
          </div>
          <h2 className="font-sans text-[clamp(2.5rem,5vw,5.5rem)] font-semibold tracking-tighter text-[#1d1d1f] dark:text-white leading-[1.05] mb-6 text-balance">
            {t('proj.title1')} <br className="hidden md:block" />
            <span className="text-black/30 dark:text-white/30 mt-2 block">{t('proj.title2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-black/60 dark:text-white/60 leading-relaxed max-w-2xl font-medium mt-4 md:mt-6">
            {t('proj.subtitle')}
          </p>
        </header>

        {/* Sticky Stacking Cards Container */}
        <div className="flex flex-col gap-8 md:gap-16 pb-20 md:pb-32">
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
