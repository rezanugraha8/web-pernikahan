import { motion } from 'framer-motion';

interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-50"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-gold-400 via-rose-gold to-gold-400"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
