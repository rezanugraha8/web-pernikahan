import { motion } from 'framer-motion';
import { Mail, ShieldCheck } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { Button } from '@/components/ui/Button';

interface CoverSectionProps {
  guestName: string;
  isVip: boolean;
  rank: string;
  onOpen: () => void;
}

export function CoverSection({
  guestName,
  isVip,
  rank,
  onOpen,
}: CoverSectionProps) {
  return (
    <section
      id="cover"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
      aria-label="Sampul undangan"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        <span className="font-serif text-xs tracking-[0.4em] uppercase text-gold-300/80 mb-6 block">
          The Wedding Invitation
        </span>

        <div className="w-28 h-28 mx-auto rounded-full border border-gold-400/30 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-2 rounded-full border border-dashed border-gold-400/15" />
          <span className="font-serif text-3xl text-gold-400 tracking-widest">
            {WEDDING_CONFIG.couple.monogram}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-light text-white tracking-wide mb-3">
          {WEDDING_CONFIG.couple.displayName}
        </h1>

        <p className="font-serif italic text-gold-300/90 text-lg mb-2">
          {WEDDING_CONFIG.event.displayDate}
        </p>
        <p className="text-sm text-white/50 tracking-widest uppercase mb-12">
          {WEDDING_CONFIG.event.location}
        </p>

        <div className="glass-card rounded-2xl p-6 mb-10 text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-2 block">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </span>
          <h2 className="font-serif text-2xl text-white font-light mb-2">
            {guestName}
          </h2>
          {isVip && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-[10px] text-gold-300 tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              VIP Guest
            </div>
          )}
          {rank && !isVip && (
            <span className="text-[10px] tracking-widest uppercase text-gold-400/60 mt-1 block">
              {rank}
            </span>
          )}
        </div>

        <Button
          size="lg"
          onClick={onOpen}
          aria-label="Buka undangan pernikahan"
          className="mx-auto"
        >
          <Mail className="w-4 h-4" />
          Buka Undangan
        </Button>
      </motion.div>
    </section>
  );
}
