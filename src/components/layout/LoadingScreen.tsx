import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WEDDING_CONFIG } from '@/config/wedding';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);
      if (next < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream-50"
      role="status"
      aria-label="Memuat undangan"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full border border-gold-400/30 flex items-center justify-center mb-8 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-dashed border-gold-400/20"
          />
          <span className="font-serif text-2xl text-gold-500 tracking-widest">
            {WEDDING_CONFIG.couple.monogram}
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-sm tracking-[0.4em] uppercase text-charcoal/60 mb-2"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-wide mb-10"
        >
          {WEDDING_CONFIG.couple.displayName}
        </motion.h1>

        <div className="w-48 h-px bg-charcoal/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-400 to-rose-gold rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="sr-only">{Math.round(progress)}% loaded</span>
      </motion.div>
    </motion.div>
  );
}
