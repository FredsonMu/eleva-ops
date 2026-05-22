'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group cursor-pointer ${i === 0 ? 'md:col-span-2 lg:w-[calc((100%_-_8rem)/2)] lg:mx-auto' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-black/5 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-700 aspect-video"
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
          className="w-full h-full object-cover"
        />
            
        {/* Play Button for Videos (Only shows when paused) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 bg-black/20"
            >
              <motion.button 
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-2xl flex items-center justify-center shadow-2xl transition-all duration-300"
              >
                <Play size={36} fill="black" className="text-black ml-2" />
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
              className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 z-10 ${isPlaying ? 'bg-black/30 backdrop-blur-md text-white hover:bg-white hover:text-black' : 'bg-white/90 text-black hover:bg-black hover:text-white'}`}
              title="Reiniciar Vídeo"
            >
              <RotateCcw size={16} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="pt-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <motion.h3 
            className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-black mb-3"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {p.title}
          </motion.h3>
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-black/20" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#888888]">
              {p.id} — {p.category}
            </span>
          </div>
        </div>
        {p.tag && (
          <span className="px-5 py-2 rounded-full border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/40">
            {p.tag}
          </span>
        )}
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
    <section id="trabalho" className="py-32 md:py-52 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <header className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-40 gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-black/30 mb-8 block"
            >
              {t('proj.label')}
            </motion.span>
            <h2 className="font-sans text-5xl md:text-8xl font-medium tracking-tight text-[#111111] leading-[0.9] mb-10">
              {t('proj.title1')} <br />
              <span className="text-black/20 pr-4">{t('proj.title2')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#666666] leading-relaxed max-w-xl font-light">
              {t('proj.subtitle')}
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="hidden md:flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center animate-bounce">
              <div className="w-[1px] h-8 bg-black/20" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/20 vertical-text">Scroll</span>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
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
      
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}
