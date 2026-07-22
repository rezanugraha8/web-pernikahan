import { motion } from 'framer-motion';

interface CountdownDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver?: boolean;
  light?: boolean;
  size?: 'sm' | 'lg';
}

export function CountdownDisplay({
  days,
  hours,
  minutes,
  seconds,
  isOver = false,
  light = false,
  size = 'lg',
}: CountdownDisplayProps) {
  const items = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-3 md:gap-5 max-w-xl w-full mx-auto"
      role="timer"
      aria-live="polite"
      aria-label={isOver ? 'Acara telah dimulai' : 'Countdown menuju hari pernikahan'}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="glass-card rounded-2xl py-4 md:py-6 flex flex-col items-center border border-white/15"
        >
          <span
            className={`font-serif tabular-nums ${
              size === 'lg' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'
            } font-light ${light ? 'text-gold-300' : 'text-gold-500'}`}
          >
            {isOver ? '00' : item.value.toString().padStart(2, '0')}
          </span>
          <span
            className={`text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1 ${
              light ? 'text-white/50' : 'text-charcoal/50'
            }`}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
