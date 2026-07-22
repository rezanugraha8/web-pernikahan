import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const FLOWER_COUNT = 8;

export const FloatingFlowers = memo(function FloatingFlowers() {
  const flowers = useMemo(
    () =>
      Array.from({ length: FLOWER_COUNT }, (_, i) => ({
        id: i,
        left: `${10 + (i * 11) % 80}%`,
        delay: i * 1.2,
        duration: 12 + (i % 4) * 2,
        size: 12 + (i % 3) * 4,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          initial={{ y: '110vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.6, 0.6, 0],
            rotate: 360,
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: 'linear',
          }}
          style={{ left: f.left, width: f.size, height: f.size }}
          className="absolute rounded-full bg-gradient-to-br from-rose-gold/30 to-gold-400/20 blur-[1px]"
        />
      ))}
    </div>
  );
});
