import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { cn } from '@/lib/cn';

interface MusicPlayerProps {
  playRequested: boolean;
}

export const MusicPlayer = memo(function MusicPlayer({
  playRequested,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    const audio = new Audio(WEDDING_CONFIG.media.music);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!playRequested || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [playRequested]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => undefined);
    }
  }, [isPlaying]);

  if (!playRequested) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="glass-card hidden md:flex items-center gap-2 px-3 py-2 rounded-full"
          >
            <VolumeX className="w-3 h-3 text-white/50" aria-hidden="true" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume musik"
              className="w-20 accent-gold-400"
            />
            <Volume2 className="w-3 h-3 text-gold-400" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-colors cursor-pointer',
          isPlaying
            ? 'bg-gold-400 text-charcoal border-gold-400'
            : 'bg-charcoal/80 text-gold-400 border-white/20 backdrop-blur-md',
        )}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
});
