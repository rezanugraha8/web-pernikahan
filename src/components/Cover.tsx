import { motion } from "motion/react";
import { Mail, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [isVip, setIsVip] = useState(false);
  const [recipientRank, setRecipientRank] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    const p = params.get("p");
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
    if (p) {
      if (p.toUpperCase() === "VIP") {
        setIsVip(true);
      } else {
        setRecipientRank(decodeURIComponent(p));
      }
    }
  }, []);

  return (
    <div
      id="welcome-cover"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center bg-brand-charcoal text-white py-12 px-6"
    >
      {/* Background Dimmed romantic overlays */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/foto/prewed%20pantai3.jpeg')`,
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/70 to-brand-charcoal/90" />

      {/* Floating Sparkles inside cover */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Top Section: Monogram */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center select-none"
      >
        <span className="font-serif-luxury text-sm tracking-[0.3em] text-brand-gold font-light uppercase">
          The Wedding Invitation of
        </span>
        <div className="w-[1px] h-8 bg-brand-gold/30 my-4" />
      </motion.div>

      {/* Center Section: Initials and Names */}
      <div className="z-10 text-center flex flex-col items-center">
        {/* Monogram frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-28 h-28 flex items-center justify-center border border-brand-gold/20 rounded-full mb-8 bg-black/10"
        >
          <div className="absolute inset-2 border border-dashed border-brand-gold/10 rounded-full" />
          <span className="font-serif-luxury text-4xl font-light text-brand-gold tracking-widest pl-1 mt-1">
            R & S
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-champagne tracking-[0.25em] mb-3 uppercase"
        >
          Reza & Shafia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="font-serif-luxury italic text-brand-gold text-lg md:text-xl font-light tracking-[0.1em] mb-12"
        >
          09 • 08 • 2026
        </motion.p>
      </div>

      {/* Bottom Section: Guest Recipient Wrapper & Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        className="z-10 w-full max-w-sm flex flex-col items-center justify-end px-4"
      >
        <div className="glass-morphism-dark w-full py-6 px-5 rounded-2xl mb-8 text-center border border-brand-gold/10 flex flex-col items-center shadow-2xl relative overflow-hidden">
          {/* Subtle glow border */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

          <span className="text-xs tracking-[0.2em] uppercase text-white/50 mb-3 font-medium">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-white tracking-wide mb-2 line-clamp-2">
            {guestName}
          </h2>

          {isVip && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-[10px] text-brand-gold tracking-widest uppercase font-semibold mt-1 animate-pulse">
              <ShieldCheck className="w-3.5 h-3.5" />
              VIP Guest Pass
            </div>
          )}

          {recipientRank && !isVip && (
            <span className="text-[10px] tracking-widest uppercase text-brand-gold/60 mt-1 font-semibold border-t border-brand-gold/10 pt-1 w-1/2">
              {recipientRank}
            </span>
          )}
        </div>

        <motion.button
          id="btn-open-invitation"
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-brand-gold to-brand-gold/80 px-8 py-3.5 shadow-xl transition-all duration-300 hover:shadow-brand-gold/20 hover:shadow-2xl"
        >
          {/* Glowing button background effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          <div className="relative flex items-center justify-center gap-2 text-brand-charcoal font-bold text-sm tracking-[0.15em] uppercase">
            <Mail className="w-4 h-4 transition-transform group-hover:rotate-12 duration-350" />
            Buka Undangan
          </div>
        </motion.button>

        <span className="text-[10px] tracking-widest text-white/30 uppercase mt-6 select-none font-medium text-center">
          *Ketuk untuk membuka undangan
        </span>
      </motion.div>
    </div>
  );
}
