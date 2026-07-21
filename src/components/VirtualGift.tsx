import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Copy, Check, X } from "lucide-react";

export default function VirtualGift() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [isQrisModalOpen, setIsQrisModalOpen] = useState(false);

  const bankAccounts = [
    {
      id: "bca-reza",
      bankName: "Bank BCA",
      accountNumber: "1392319292",
      holderName: "Mohamad Reza Nugraha",
      logoText: "BCA",
    },
    {
      id: "bca-shafia",
      bankName: "Bank BCA",
      accountNumber: "2810576378",
      holderName: "Shafia Salsa Halwa",
      logoText: "BCA",
    },
  ];

  const qrisImage = "/foto/QRIS.jpeg";

  const qrisData = {
    title: "Kirim Hadiah via QRIS",
    recipient: "Reza & Shafia",
    instruction:
      "Scan kode QRIS di bawah menggunakan aplikasi e-wallet atau mobile banking favorit Anda.",
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  return (
    <>
      <section
        id="gift-section"
        className="relative py-24 px-6 md:px-12 bg-brand-cream overflow-hidden flex flex-col items-center"
      >
        {/* Background decorative glows */}
        <div className="absolute top-[20%] -left-32 w-80 h-80 rounded-full bg-brand-gold/5 pointer-events-none" />
        <div className="absolute bottom-[20%] right-0 w-44 h-44 rounded-full bg-zinc-200/50 pointer-events-none" />

        {/* Title dengan animasi scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-xl z-10 flex flex-col items-center"
        >
          <span className="font-serif-luxury text-sm tracking-[0.25em] text-brand-gold uppercase mb-2">
            Love Registry
          </span>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-maroon tracking-wide mb-4">
            Kirim Hadiah (Digital Gift)
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold/30 my-2" />
          <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light mt-2 max-w-md">
            Bagi bapak/ibu yang ingin mengirimkan tanda kasih dan kado
            pernikahan, kami menyediakan fasilitas amplop digital melalui
            transfer bank maupun scan QRIS berikut ini.
          </p>
        </motion.div>

        {/* Bank accounts grid dengan animasi scroll reveal yang diperhalus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10 mb-14">
          {bankAccounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl p-6 relative overflow-hidden bg-brand-charcoal text-white shadow-2xl flex flex-col justify-between border border-brand-gold/15 min-h-[220px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#c5a880_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-brand-gold/3 pointer-events-none" />

              <div className="flex justify-between items-center z-10 mb-8 border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] tracking-[0.15em] text-zinc-400 font-bold uppercase mb-0.5 block">
                    Transfer Bank
                  </span>
                  <h3 className="font-serif-luxury text-lg font-light text-brand-gold">
                    {account.bankName}
                  </h3>
                </div>
                <span className="font-serif-luxury text-lg italic tracking-widest text-[#dfc29f]/30 font-bold uppercase">
                  {account.logoText}
                </span>
              </div>

              <div className="z-10">
                <span className="text-[#c5a880] text-xs font-serif-luxury tracking-widest block mb-1 uppercase">
                  Nomor Rekening
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-mono tracking-wider font-medium text-white select-all">
                    {account.accountNumber}
                  </span>

                  {/* Tombol salin dengan efek sentuhan aktif */}
                  <button
                    onClick={() =>
                      copyToClipboard(account.accountNumber, account.id)
                    }
                    className="p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 text-brand-champagne/80 hover:text-white border border-white/10 active:scale-90 transition-all duration-200 touch-manipulation"
                    title="Salin Rekening"
                  >
                    <AnimatePresence mode="wait">
                      {copiedAccount === account.id ? (
                        <motion.div
                          key="copied"
                          initial={{ scale: 0.7 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.7 }}
                        >
                          <Check className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.7 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.7 }}
                        >
                          <Copy className="w-4 h-4 text-brand-gold/80" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="z-10 border-t border-white/5 pt-4 mt-6">
                <span className="text-zinc-500 text-[10px] tracking-wider uppercase block mb-0.5">
                  Atas Nama Penerima
                </span>
                <span className="font-serif-luxury text-sm text-brand-champagne/90 tracking-wide font-light uppercase">
                  {account.holderName}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* QRIS Card dengan sentuhan interaktif dan efek visual memikat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          whileTap={{ scale: 0.97 }} // Efek sentuhan mobile, mengecil saat ditekan
          className="w-full max-w-2xl glass-morphism rounded-3xl p-8 md:p-10 border border-brand-gold/15 shadow-xl z-10 flex flex-col items-center text-center cursor-pointer select-none"
        >
          {/* Ikon hadiah dengan animasi denyut halus */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-2xl bg-brand-gold/10 text-brand-gold mb-5"
          >
            <Gift className="w-7 h-7" />
          </motion.div>

          <h4 className="font-serif-luxury text-xl font-light text-brand-charcoal tracking-wide mb-1 uppercase">
            {qrisData.title}
          </h4>
          <p className="text-xs text-brand-charcoal/70 mb-6 font-medium">
            Penerima: {qrisData.recipient}
          </p>
          <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light mb-6 max-w-md">
            {qrisData.instruction}
          </p>

          {/* Gambar QRIS dengan bingkai berkilau animasi glow */}
          <motion.div
            onClick={() => setIsQrisModalOpen(true)}
            whileTap={{ scale: 0.95 }} // Efek sentuhan khusus pada gambar
            animate={{
              borderColor: [
                "rgba(197,168,128,0.2)",
                "rgba(197,168,128,0.5)",
                "rgba(197,168,128,0.2)",
              ],
              boxShadow: [
                "0 0 10px rgba(197,168,128,0.1)",
                "0 0 20px rgba(197,168,128,0.25)",
                "0 0 10px rgba(197,168,128,0.1)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-56 h-56 mx-auto rounded-2xl overflow-hidden border-2 border-brand-gold/20 p-2 bg-white shadow-md cursor-pointer"
          >
            <img
              src={qrisImage}
              alt="QRIS Reza & Shafia"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <p className="text-[10px] text-brand-charcoal/40 mt-3 tracking-wide">
            Klik gambar untuk memperbesar
          </p>
        </motion.div>
      </section>

      {/* Modal Zoom QRIS yang dioptimalkan untuk mobile */}
      <AnimatePresence>
        {isQrisModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsQrisModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl p-3 shadow-2xl w-full max-w-[90vw] sm:max-w-md"
            >
              {/* Tombol close dengan efek sentuhan */}
              <button
                onClick={() => setIsQrisModalOpen(false)}
                className="absolute -top-3 -right-3 bg-brand-maroon text-white p-2 rounded-full shadow-lg hover:bg-brand-maroon/90 active:scale-90 transition-all duration-200 touch-manipulation z-10"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              <img
                src={qrisImage}
                alt="QRIS Diperbesar"
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />

              <p className="text-center text-xs text-brand-charcoal/50 mt-3 font-serif-luxury tracking-wide">
                Scan kode QRIS untuk mengirim hadiah
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
