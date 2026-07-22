import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, X } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';
import { copyToClipboard } from '@/utils/helpers';

export function GiftSection() {
  const { gifts } = WEDDING_CONFIG;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrisOpen, setQrisOpen] = useState(false);

  const handleCopy = async (number: string, id: string) => {
    const ok = await copyToClipboard(number);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="gift" className="section-padding" aria-label="Amplop digital">
      <SectionHeader
        label="Love Registry"
        title="Digital Gift"
        description="Kirim tanda kasih melalui transfer bank atau QRIS."
        light
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        {gifts.accounts.map((account, i) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
          >
            <GlassCard className="p-8 h-full bg-charcoal/60" hover>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1 block">
                Transfer Bank
              </span>
              <h3 className="font-serif text-lg text-gold-400 mb-6">{account.bank}</h3>
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">
                Nomor Rekening
              </p>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xl text-white tracking-wider">
                  {account.number}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(account.number, account.id)}
                  aria-label={`Salin rekening ${account.bank}`}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {copiedId === account.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gold-400" />
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">
                Atas Nama
              </p>
              <p className="font-serif text-sm text-white/80">{account.holder}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <GlassCard className="p-8 text-center" hover>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gold-400/15 flex items-center justify-center mb-4">
            <Gift className="w-7 h-7 text-gold-400" />
          </div>
          <h4 className="font-serif text-lg text-white mb-2">Kirim via QRIS</h4>
          <p className="text-xs text-white/50 mb-6 leading-relaxed">
            Scan kode QRIS menggunakan e-wallet atau mobile banking favorit Anda.
          </p>
          <button
            type="button"
            onClick={() => setQrisOpen(true)}
            aria-label="Perbesar QRIS"
            className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-gold-400/30 p-2 bg-white cursor-pointer"
          >
            <img src={gifts.qris} alt="QRIS Reza & Shafia" className="w-full h-full object-contain" />
          </button>
        </GlassCard>
      </motion.div>

      <Modal open={qrisOpen} onClose={() => setQrisOpen(false)} ariaLabel="QRIS diperbesar">
        <div className="bg-white rounded-2xl p-4">
          <img src={gifts.qris} alt="QRIS" className="w-full max-h-[70vh] object-contain" />
        </div>
      </Modal>
    </section>
  );
}
