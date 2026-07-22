import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { ATTENDANCE_OPTIONS } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useWishes } from '@/hooks/useWishes';
import { formatDateId, getAttendanceLabel } from '@/utils/format';
import { cn } from '@/lib/cn';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useState } from 'react';

const wishSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  message: z.string().min(3, 'Ucapan minimal 3 karakter').max(1000),
  attendance: z.enum(['hadir', 'tidak_hadir', 'ragu']),
});

type WishFormData = z.infer<typeof wishSchema>;

export function WishesSection() {
  const { wishes, loading, submitWish } = useWishes();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WishFormData>({
    resolver: zodResolver(wishSchema),
    defaultValues: { name: '', message: '', attendance: 'hadir' },
  });

  const attendance = watch('attendance');

  const onSubmit = async (data: WishFormData) => {
    if (!isSupabaseConfigured) {
      setFormError('Supabase belum dikonfigurasi. Hubungi penyelenggara.');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      await submitWish(data);
      reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Gagal mengirim ucapan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="section-padding" aria-label="Ucapan dan doa">
      <SectionHeader
        label="Wishes"
        title="Doa & Ucapan"
        description="Kirimkan doa restu Anda. Ucapan akan muncul secara realtime."
        light
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <GlassCard className="p-8">
          <h3 className="font-serif text-xl text-white mb-6">Kirim Ucapan</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="wish-name" className="form-label">Nama</label>
              <input id="wish-name" {...register('name')} className="form-input" placeholder="Nama Anda" />
              {errors.name && <p className="form-error" role="alert">{errors.name.message}</p>}
            </div>

            <fieldset>
              <legend className="form-label">Kehadiran</legend>
              <div className="grid grid-cols-3 gap-2">
                {ATTENDANCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setValue('attendance', opt.value)}
                    className={cn(
                      'py-2 text-[10px] uppercase tracking-wider rounded-xl border transition-all cursor-pointer',
                      attendance === opt.value
                        ? 'bg-gold-400 border-gold-400 text-charcoal font-bold'
                        : 'bg-white/5 border-white/15 text-white/50',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="wish-message" className="form-label">Ucapan</label>
              <textarea
                id="wish-message"
                rows={4}
                {...register('message')}
                className="form-input resize-none"
                placeholder="Tuliskan doa dan harapan Anda..."
              />
              {errors.message && <p className="form-error" role="alert">{errors.message.message}</p>}
            </div>

            {formError && <p className="text-xs text-red-400" role="alert">{formError}</p>}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <span className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Kirim Ucapan
                </>
              )}
            </Button>

            <AnimatePresence>
              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-emerald-400 justify-center"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4" /> Ucapan terkirim!
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </GlassCard>

        <div>
          <h3 className="font-serif text-xl text-white mb-6">Wishes Wall</h3>
          <div
            className="space-y-4 max-h-[520px] overflow-y-auto pr-2 scroll-smooth"
            aria-live="polite"
            aria-label="Daftar ucapan"
          >
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-card rounded-2xl h-24 animate-pulse" />
                ))}
              </div>
            ) : wishes.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-xs">Belum ada ucapan. Jadilah yang pertama!</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {wishes.map((wish, i) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: -12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: i < 3 ? i * 0.05 : 0 }}
                    layout
                  >
                    <GlassCard className="p-5">
                      <div className="flex items-start gap-3">
                        <Avatar name={wish.name} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-serif text-white text-sm">{wish.name}</span>
                            <span
                              className={cn(
                                'text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0',
                                wish.attendance === 'hadir' && 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
                                wish.attendance === 'ragu' && 'text-amber-400 border-amber-400/30 bg-amber-400/10',
                                wish.attendance === 'tidak_hadir' && 'text-red-400 border-red-400/30 bg-red-400/10',
                              )}
                            >
                              {getAttendanceLabel(wish.attendance)}
                            </span>
                          </div>
                          <p className="text-sm text-white/70 font-light italic leading-relaxed">
                            &ldquo;{wish.message}&rdquo;
                          </p>
                          <time className="text-[10px] text-white/30 mt-2 block">
                            {formatDateId(wish.created_at)}
                          </time>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
