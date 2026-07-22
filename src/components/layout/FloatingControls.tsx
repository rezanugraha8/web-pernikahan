import { motion } from 'framer-motion';
import { ArrowUp, Moon, Sun } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScroll';
import { cn } from '@/lib/cn';
import type { ThemeMode } from '@/types';

interface FloatingControlsProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  visible: boolean;
}

export function FloatingControls({
  theme,
  onToggleTheme,
  visible,
}: FloatingControlsProps) {
  const { visible: showScrollTop, scrollToTop } = useScrollToTop();

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onToggleTheme}
        aria-label={theme === 'light' ? 'Aktifkan dark mode' : 'Aktifkan light mode'}
        className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </motion.button>

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className={cn(
          'w-11 h-11 rounded-full glass-card flex items-center justify-center text-gold-400 hover:text-gold-300 transition-colors cursor-pointer',
          !showScrollTop && 'pointer-events-none',
        )}
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
