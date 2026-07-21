import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer
      id="footer-section"
      className="relative py-24 px-6 md:px-12 bg-brand-charcoal text-white overflow-hidden flex flex-col items-center"
    >
      {/* Absolute decorative starry particles or floating shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#c5a880_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top golden glowing border line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />

      {/* Main Closing message section */}
      <div className="max-w-xl text-center flex flex-col items-center z-10">
        {/* Monogram or Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-16 h-16 flex items-center justify-center border border-brand-gold/15 rounded-full mb-8"
        >
          <span className="font-serif-luxury text-xl font-light text-brand-gold tracking-widest pl-0.5">
            R & S
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-xs tracking-[0.2em] font-medium text-brand-gold uppercase mb-6"
        >
          Ungkapan Terima Kasih
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-luxury italic text-zinc-300 text-base md:text-lg leading-relaxed mb-10 text-center"
        >
          “Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu demi
          mengawali lembaran pernikahan suci putra-putri kami.”
        </motion.p>

        <div className="w-12 h-[1px] bg-brand-gold/30 my-4" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[10px] tracking-widest text-[#dfc29f] font-semibold uppercase mt-6"
        >
          Kami yang Berbahagia,
        </motion.p>

        {/* Elegant typography pairing signatures */}
        <motion.h4
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-serif-luxury text-3xl md:text-4xl text-brand-gold font-light tracking-widest uppercase mt-4 mb-1"
        >
          Reza & Shafia
        </motion.h4>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 mt-2 font-medium"
        >
          Serta Seluruh Keluarga Besar Tarmubi & Supardi
        </motion.p>
      </div>

      {/* --- Tambahan Copyright --- */}
      <div className="mt-20 w-full max-w-2xl border-t border-brand-gold/20 pt-8 text-center z-10">
        <p className="font-serif-luxury text-xs tracking-[0.15em] text-zinc-500/80">
          © 2026 Reza & Shafia | Designed & Developed by Reza Nugraha
        </p>
      </div>
    </footer>
  );
}
