import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  playRequested: boolean;
}

export default function AudioPlayer({ playRequested }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio player
    audioRef.current = new Audio('/lagu.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (playRequested && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
        });
    }
  }, [playRequested]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
        });
    }
  };

  return (
    <div id="audio-widget" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Animated Wave Indicator (Shows if playing) */}
      {isPlaying && (
        <div className="glass-morphism rounded-full px-3 py-1.5 flex items-end gap-1 border border-brand-gold/10 hidden md:flex h-9 shadow-lg">
          <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }} className="w-0.5 bg-brand-gold rounded-full" />
          <motion.div animate={{ height: [8, 22, 8] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.2, ease: 'easeInOut' }} className="w-0.5 bg-brand-gold rounded-full" />
          <motion.div animate={{ height: [6, 18, 6] }} transition={{ repeat: Infinity, duration: 1.3, delay: 0.1, ease: 'easeInOut' }} className="w-0.5 bg-brand-gold rounded-full" />
          <motion.div animate={{ height: [10, 24, 10] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3, ease: 'easeInOut' }} className="w-0.5 bg-brand-gold rounded-full" />
          <motion.div animate={{ height: [4, 14, 4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: 'easeInOut' }} className="w-0.5 bg-brand-gold rounded-full" />
        </div>
      )}

      {/* Main Play/Pause Button */}
      <motion.button
        id="btn-music-toggle"
        onClick={togglePlay}
        whileHover={{ scale: 1.1, rotate: isPlaying ? 10 : -10 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center shadow-xl border transition-all duration-300 ${
          isPlaying
            ? 'bg-brand-gold text-brand-charcoal border-brand-gold shadow-brand-gold/20'
            : 'bg-brand-charcoal/80 text-brand-gold border-brand-gold/20'
        }`}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        <AnimateRotation isPlaying={isPlaying}>
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5 text-brand-gold/60" />
          )}
        </AnimateRotation>
      </motion.button>
    </div>
  );
}

// Subordinate rotation component
function AnimateRotation({ isPlaying, children }: { isPlaying: boolean; children: React.ReactNode }) {
  if (isPlaying) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    );
  }
  return <div className="flex items-center justify-center">{children}</div>;
}
