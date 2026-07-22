import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Copy, Check, ExternalLink, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/utils/helpers';
import { getGoogleCalendarUrl } from '@/utils/format';

export function EventSection() {
  const { event } = WEDDING_CONFIG;
  const [copied, setCopied] = useState(false);

  const calendarUrl = getGoogleCalendarUrl(
    `Pernikahan ${WEDDING_CONFIG.couple.displayName}`,
    '20260809T000000Z',
    '20260809T070000Z',
    'Undangan Pernikahan Reza & Shafia',
    event.address,
  );

  const handleCopy = async () => {
    const ok = await copyToClipboard(event.address);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="event" className="section-padding" aria-label="Detail acara">
      <SectionHeader
        label="The Celebration"
        title="Wedding Event"
        description="Waktu dan lokasi acara pernikahan kami."
        light
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        {[event.akad, event.reception].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
          >
            <GlassCard className="p-8 h-full" hover>
              <div className="flex items-center gap-3 mb-5">
                <span className="p-2.5 rounded-full bg-gold-400/15">
                  {i === 0 ? (
                    <Clock className="w-5 h-5 text-gold-400" />
                  ) : (
                    <Calendar className="w-5 h-5 text-gold-400" />
                  )}
                </span>
                <h3 className="font-serif text-xl text-white font-light">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-gold-300 mb-4 font-medium">{item.time}</p>
              <p className="text-xs text-white/50 leading-relaxed mb-6 italic">
                {item.description}
              </p>
              <div className="flex items-start gap-2 text-xs text-white/60">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{event.venue}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="p-8 max-w-4xl mx-auto" hover>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-serif text-lg text-white mb-2">Lokasi Venue</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              {event.address}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Salin Alamat
                  </>
                )}
              </Button>
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-wider uppercase rounded-full border border-gold-400/40 text-gold-400 hover:bg-gold-400/10 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Google Maps
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              Simpan tanggal pernikahan ke kalender digital Anda.
            </p>
            <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                <Calendar className="w-4 h-4" />
                Tambah ke Google Calendar
              </Button>
            </a>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
