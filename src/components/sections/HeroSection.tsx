import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { useCountdown } from '@/hooks/useCountdown';
import { CountdownDisplay } from '@/components/ui/CountdownDisplay';

interface HeroSectionProps {
  guestName: string;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  const countdown = useCountdown(WEDDING_CONFIG.event.date);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
      aria-label="Hero undangan"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/80">
            Yth, {guestName}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-5xl md:text-7xl font-light text-white tracking-wide mb-4"
        >
          {WEDDING_CONFIG.couple.displayName}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-sm tracking-[0.2em] uppercase text-white/60 mb-16"
        >
          {WEDDING_CONFIG.event.displayDate} • {WEDDING_CONFIG.event.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {countdown.isOver ? (
            <p className="font-serif text-2xl text-gold-300 mb-4">
              Hari Bahagia Telah Tiba ✨
            </p>
          ) : (
            <CountdownDisplay {...countdown} light />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
