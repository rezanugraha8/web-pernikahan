import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variant === 'primary' &&
            'bg-gradient-to-r from-gold-400 to-gold-500 text-charcoal shadow-lg hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]',
          variant === 'ghost' &&
            'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md',
          variant === 'outline' &&
            'border border-gold-400/40 text-gold-500 hover:bg-gold-400/10',
          size === 'sm' && 'px-4 py-2 text-[10px]',
          size === 'md' && 'px-6 py-3 text-xs',
          size === 'lg' && 'px-8 py-4 text-sm',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
