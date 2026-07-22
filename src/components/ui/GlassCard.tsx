import { cn } from '@/lib/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-3xl border border-white/20 backdrop-blur-xl',
        hover && 'transition-all duration-500 hover:border-gold-400/40 hover:shadow-gold',
        className,
      )}
    >
      {children}
    </div>
  );
}
