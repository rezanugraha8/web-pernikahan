import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Copy, Check, Info } from "lucide-react";

export default function VirtualGift() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

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

  // Ganti alamat fisik sesuai data Anda
  const giftAddress = {
    title: "Alamat Pengiriman Kado Fisik",
    recipient: "Reza & Shafia (Kediaman Reza & Shafia)",
    address: "Gg.Sukarame No.171 Rt.03 Rw.12 Cibabat, Cimahi Utara, Jawa Barat, Indonesia. (40513)",
    memo: "(Mohon konfirmasi kontak pengirim via Whatsapp sebelum mengirim)",
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2000);
  };

  return (
    <section
      id="gift-section"
      className="relative py-24 px-6 md:px-12 bg-brand-cream overflow-hidden flex flex-col items-center"
    >
      {/* Absolute background elegant circular glow overlays */}
      <div className="absolute top-[20%] -left-32 w-80 h-80 rounded-full bg-brand-gold/5 pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-44 h-44 rounded-full bg-zinc-200/50 pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16 max-w-xl z-10 flex flex-col items-center">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-brand-gold uppercase mb-2">
          Love Registry
        </span>
        <h2 className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-maroon tracking-wide mb-4">
          Kirim Hadiah (Digital Gift)
        </h2>
        <div className="w-16 h-[1px] bg-brand-gold/30 my-2" />
        <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light mt-2 max-w-md">
          Bagi bapak/ibu yang ingin mengirimkan tanda kasih dan kado pernikahan,
          kami menyediakan fasilitas amplop digital & pengiriman kado fisik
          berikut ini.
        </p>
      </div>

      {/* Main bank accounts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10 mb-14">
        {bankAccounts.map((account) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl p-6 relative overflow-hidden bg-brand-charcoal text-white shadow-2xl flex flex-col justify-between border border-brand-gold/15 min-h-[220px]"
          >
            {/* Soft decorative visual structures */}
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

                <button
                  onClick={() =>
                    copyToClipboard(account.accountNumber, account.id)
                  }
                  className="p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 text-brand-champagne/80 hover:text-white border border-white/10 active:scale-90 transition-all duration-300"
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

      {/* Physical Gift Mailing Address Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-4xl glass-morphism rounded-3xl p-6 md:p-8 border border-brand-gold/15 shadow-lg z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 rounded-2xl bg-brand-gold/10 text-brand-gold mt-1">
            <Gift className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-lg font-light text-brand-charcoal tracking-wide mb-1.5 uppercase">
              {giftAddress.title}
            </h4>
            <div className="text-xs text-brand-charcoal/70 mb-2 font-medium">
              Penerima: {giftAddress.recipient}
            </div>
            <p className="text-xs text-brand-charcoal/60 leading-relaxed font-light">
              {giftAddress.address}
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-[10px] text-brand-gold tracking-wide font-semibold uppercase">
              <Info className="w-3.5 h-3.5" />
              {giftAddress.memo}
            </div>
          </div>
        </div>

        <button
          onClick={() => copyToClipboard(giftAddress.address, "address")}
          className="w-full md:w-auto shrink-0 flex items-center justify-center gap-1.5 cursor-pointer px-5 py-2.5 rounded-full bg-brand-maroon hover:bg-brand-maroon/95 active:scale-95 border border-brand-maroon text-xs tracking-wider text-white transition-all duration-300 font-medium uppercase shadow-lg shadow-brand-maroon/10"
        >
          {copiedAccount === "address" ? (
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Alamat Tersalin
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Copy className="w-3.5 h-3.5 text-brand-gold" />
              Salin Alamat Kirim
            </span>
          )}
        </button>
      </motion.div>
    </section>
  );
}
