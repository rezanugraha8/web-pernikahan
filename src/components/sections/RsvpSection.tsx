import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { ATTENDANCE_OPTIONS } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useRsvpSubmit } from '@/hooks/useRsvpSubmit';
import { cn } from '@/lib/cn';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  guest_count: z.coerce.number().min(1, 'Minimal 1 tamu').max(20),
  attendance: z.enum(['hadir', 'tidak_hadir', 'ragu']),
  note: z.string().max(500).optional(),
});

type RsvpFormData = z.infer<typeof rsvpSchema>;

export function RsvpSection() {
  const { submit, submitting, success, error } = useRsvpSubmit();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: '',
      guest_count: 1,
      attendance: 'hadir',
      note: '',
    },
  });

  const attendance = watch('attendance');

  const onSubmit = async (data: RsvpFormData) => {
    try {
      await submit(data);
      reset();
    } catch {
      /* error handled in hook */
    }
  };

  return (
    <section id="rsvp" className="section-padding" aria-label="RSVP">
      <SectionHeader
        label="RSVP"
        title="Konfirmasi Kehadiran"
        description="Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan acara dengan baik."
        light
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <GlassCard className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="rsvp-name" className="form-label">
                Nama Lengkap
              </label>
              <input
                id="rsvp-name"
                {...register('name')}
                className="form-input"
                placeholder="Nama Anda"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="form-error" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="rsvp-count" className="form-label">
                Jumlah Tamu
              </label>
              <input
                id="rsvp-count"
                type="number"
                min={1}
                max={20}
                {...register('guest_count')}
                className="form-input"
                aria-invalid={!!errors.guest_count}
              />
              {errors.guest_count && (
                <p className="form-error" role="alert">{errors.guest_count.message}</p>
              )}
            </div>

            <fieldset>
              <legend className="form-label">Konfirmasi Kehadiran</legend>
              <div className="grid grid-cols-3 gap-2">
                {ATTENDANCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue('attendance', opt.value)}
                    className={cn(
                      'py-2.5 text-[10px] uppercase tracking-wider rounded-xl border transition-all cursor-pointer',
                      attendance === opt.value
                        ? 'bg-gold-400 border-gold-400 text-charcoal font-bold'
                        : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="rsvp-note" className="form-label">
                Catatan (Opsional)
              </label>
              <textarea
                id="rsvp-note"
                rows={3}
                {...register('note')}
                className="form-input resize-none"
                placeholder="Alergi makanan, permintaan khusus, dll."
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center" role="alert">{error}</p>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <span className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Kirim Konfirmasi
                </>
              )}
            </Button>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-xs text-emerald-400"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Konfirmasi berhasil terkirim!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </GlassCard>
      </motion.div>
    </section>
  );
}
