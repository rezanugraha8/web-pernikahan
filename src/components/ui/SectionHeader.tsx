import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('text-center mb-16 max-w-2xl mx-auto', className)}
    >
      <span
        className={cn(
          'font-serif text-xs tracking-[0.35em] uppercase mb-3 block',
          light ? 'text-gold-300' : 'text-gold-500',
        )}
      >
        {label}
      </span>
      <h2
        className={cn(
          'font-serif text-4xl md:text-5xl font-light tracking-wide mb-4',
          light ? 'text-white' : 'text-charcoal',
        )}
      >
        {title}
      </h2>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
      {description && (
        <p
          className={cn(
            'text-sm leading-relaxed font-light max-w-md mx-auto',
            light ? 'text-white/70' : 'text-charcoal/60',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
