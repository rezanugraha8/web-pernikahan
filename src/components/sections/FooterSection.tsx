import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="section-padding text-center"
      aria-label="Penutup"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-xl mx-auto"
      >
        <div className="w-16 h-16 mx-auto rounded-full border border-gold-400/20 flex items-center justify-center mb-8">
          <span className="font-serif text-xl text-gold-400 tracking-widest">
            {WEDDING_CONFIG.couple.monogram}
          </span>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-400/80 mb-4">
          Ungkapan Terima Kasih
        </p>

        <p className="font-serif italic text-white/70 text-base md:text-lg leading-relaxed mb-8">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>

        <div className="w-12 h-px bg-gold-400/30 mx-auto mb-6" />

        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
          Kami yang Berbahagia,
        </p>
        <h4 className="font-serif text-3xl text-gold-400 font-light tracking-widest mb-2">
          {WEDDING_CONFIG.couple.displayName}
        </h4>
        <p className="text-[9px] tracking-[0.15em] uppercase text-white/30">
          &amp; Keluarga Besar Tarmubi &amp; Supardi
        </p>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-[10px] tracking-wider text-white/30">
            © 2026 {WEDDING_CONFIG.couple.displayName} — Created By Reza Nugraha
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
