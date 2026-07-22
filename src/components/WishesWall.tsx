import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Users,
  CheckCircle2,
  Heart,
  Send,
  RefreshCw,
} from "lucide-react";
import { getSupabaseSafe } from "@/lib/supabase";

// Interface untuk data Wish
interface Wish {
  id: string;
  name: string;
  relation: string;
  wish: string;
  rsvp: "hadir" | "ragu" | "tidak_hadir";
  created_at: string;
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Sahabat");
  const [rsvp, setRsvp] = useState<Wish["rsvp"]>("hadir");
  const [wishText, setWishText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getSupabaseSafe();

  // ─── Ambil data dari Supabase ───
  const fetchWishes = useCallback(async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Gagal mengambil wishes:", err.message);
      } else {
        console.error("Gagal mengambil wishes:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // ─── Load data & subscribe realtime ───
  useEffect(() => {
    fetchWishes();

    if (!supabase) return;

    // Subscribe ke perubahan realtime
    const channel = supabase
      .channel("wishes-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "wishes",
        },
        // ✅ PERBAIKAN ADA DI SINI (Menambahkan tipe payload)
        (payload: { new: Wish }) => {
          setWishes((prev) => [payload.new as Wish, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWishes, supabase]);

  // ─── Submit data ke Supabase ───
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !wishText.trim()) {
      setError("Nama dan ucapan wajib diisi.");
      return;
    }

    if (!supabase) {
      setError("Server tidak tersedia. Coba lagi nanti.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase.from("wishes").insert([
        {
          name: name.trim(),
          relation,
          wish: wishText.trim(),
          rsvp,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      // Reset form
      setName("");
      setWishText("");
      setSuccess(true);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Gagal menyimpan:", err.message);
      } else {
        console.error("Gagal menyimpan:", err);
      }
      setError("Gagal mengirim ucapan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Statistik ───
  const totalReplied = wishes.length;
  const totalHadir = wishes.filter((w) => w.rsvp === "hadir").length;
  const totalTidakHadir = wishes.filter((w) => w.rsvp === "tidak_hadir").length;
  const totalRagu = wishes.filter((w) => w.rsvp === "ragu").length;

  return (
    <section
      id="wishes-section"
      className="relative py-24 px-6 md:px-12 bg-brand-maroon-pale overflow-hidden flex flex-col items-center"
    >
      <div className="absolute top-0 bottom-[85%] w-[1px] bg-gradient-to-b from-brand-gold/30 to-transparent pointer-events-none" />

      <div className="text-center mb-16 max-w-xl z-10 flex flex-col items-center">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-brand-gold uppercase mb-2">
          RSVP & Wishes
        </span>
        <h2 className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-maroon tracking-wide mb-4">
          Konfirmasi Kehadiran
        </h2>
        <div className="w-16 h-[1px] bg-brand-gold/30 my-2" />
        <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light mt-2 max-w-sm">
          Kehadiran dan doa restu Anda adalah kado terindah bagi hari bahagia
          kami.
        </p>
      </div>

      {/* Statistik */}
      <div className="w-full max-w-5xl z-10 mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-3xl bg-brand-cream border border-brand-gold/15">
        <div className="py-4 px-4 sm:px-6 flex items-center justify-center sm:justify-start gap-3 sm:border-r border-dashed border-brand-gold/15">
          <div className="p-2.5 rounded-2xl bg-brand-charcoal text-white">
            <Users className="w-4 h-4 text-brand-gold" />
          </div>
          <div>
            <div className="text-lg font-bold font-serif-luxury">
              {totalReplied}
            </div>
            <div className="text-[10px] text-brand-charcoal/40 tracking-wider font-light">
              Tamu
            </div>
          </div>
        </div>
        <div className="py-4 px-4 sm:px-6 flex items-center justify-center sm:justify-start gap-3 sm:border-r border-dashed border-brand-gold/15">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-bold font-serif-luxury text-emerald-600">
              {totalHadir}
            </div>
            <div className="text-[10px] text-brand-charcoal/40 tracking-wider font-light">
              Hadir
            </div>
          </div>
        </div>
        <div className="py-4 px-4 sm:px-6 flex items-center justify-center sm:justify-start gap-3 sm:border-r border-dashed border-brand-gold/15">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-bold font-serif-luxury text-amber-600">
              {totalRagu}
            </div>
            <div className="text-[10px] text-brand-charcoal/40 tracking-wider font-light">
              Ragu
            </div>
          </div>
        </div>
        <div className="py-4 px-4 sm:px-6 flex items-center justify-center sm:justify-start gap-3">
          <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-600">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-bold font-serif-luxury text-red-600">
              {totalTidakHadir}
            </div>
            <div className="text-[10px] text-brand-charcoal/40 tracking-wider font-light">
              Berhalangan
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl w-full z-10 items-start">
        {/* Form */}
        <div className="lg:col-span-5 w-full">
          <h3 className="font-serif-luxury text-2xl font-light text-brand-maroon mb-6 relative">
            Formulir RSVP
            <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-brand-gold" />
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-brand-cream border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-md"
          >
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-widest mb-2"
              >
                Nama Lengkap Anda
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth: Bapak Budi Santoso"
                className="w-full px-4 py-3 text-sm bg-white border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 rounded-xl outline-none placeholder-zinc-300 transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-relation"
                className="block text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-widest mb-2"
              >
                Hubungan Kerabat
              </label>
              <select
                id="rsvp-relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 rounded-xl outline-none cursor-pointer text-zinc-700 transition-all duration-300"
              >
                <option value="Sahabat">Sahabat Karib</option>
                <option value="Keluarga">Keluarga Besar</option>
                <option value="Rekan Kerja">Rekan Kerja</option>
                <option value="Teman Sma/Kuliah">Teman SMA / Kuliah</option>
                <option value="Tetangga">Tetangga Rumah</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-widest mb-3">
                Konfirmasi Kehadiran
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "hadir" as Wish["rsvp"], label: "Hadir" },
                  { value: "ragu" as Wish["rsvp"], label: "Ragu" },
                  {
                    value: "tidak_hadir" as Wish["rsvp"],
                    label: "Tidak Hadir",
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRsvp(item.value)}
                    className={`px-3 py-2.5 text-xs font-semibold cursor-pointer rounded-xl border text-center uppercase tracking-wider transition-all duration-300 ${
                      rsvp === item.value
                        ? "bg-brand-gold border-brand-gold text-brand-charcoal font-bold shadow-md"
                        : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-650"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="rsvp-wish"
                className="block text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-widest mb-2"
              >
                Ucapan Doa & Harapan
              </label>
              <textarea
                id="rsvp-wish"
                required
                rows={4}
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Tuliskan ucapan selamat dan doa tulus Anda di sini..."
                className="w-full px-4 py-3 text-sm bg-white border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 rounded-xl outline-none placeholder-zinc-300 resize-none transition-all duration-300"
              />
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 text-xs text-center border bg-red-50 text-red-700 border-red-100 rounded-xl font-semibold"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                isSubmitting
                  ? "bg-zinc-300 text-zinc-500 border-zinc-300 shadow-none cursor-not-allowed"
                  : "bg-brand-maroon text-white hover:bg-brand-maroon/95 border border-brand-maroon shadow-brand-maroon/10"
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-600 rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-brand-gold" />
                  Kirim Ucapan
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 text-xs text-center border bg-emerald-50 text-emerald-700 border-emerald-100 rounded-xl font-semibold flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Ucapan berhasil terkirim! Terima kasih.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Wishes Wall */}
        <div className="lg:col-span-7 w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif-luxury text-2xl font-light text-brand-maroon relative">
              Wishes Wall
              <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-brand-gold" />
            </h3>
            <button
              onClick={fetchWishes}
              className="p-2 rounded-full hover:bg-brand-gold/10 text-brand-charcoal/50 hover:text-brand-gold transition-all"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4 max-h-[570px] overflow-y-auto pr-3 scroll-smooth pb-6">
              {wishes.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 text-zinc-300" />
                  <p className="text-xs tracking-wider font-light">
                    Belum ada ucapan. Jadilah yang pertama!
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {wishes.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-5 rounded-2xl bg-brand-cream border border-brand-gold/10 hover:border-brand-gold/20 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <div>
                          <span className="font-serif-luxury text-lg font-light text-brand-maroon-dark tracking-wide block">
                            {item.name}
                          </span>
                          <span className="text-[10px] tracking-widest text-brand-gold font-bold uppercase mt-0.5 inline-block">
                            {item.relation}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                            item.rsvp === "hadir"
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                              : item.rsvp === "ragu"
                                ? "bg-amber-50 border-amber-100 text-amber-600"
                                : "bg-red-50 border-red-100 text-red-600"
                          }`}
                        >
                          {item.rsvp === "hadir"
                            ? "Hadir"
                            : item.rsvp === "ragu"
                              ? "Ragu"
                              : "Tidak Hadir"}
                        </span>
                      </div>

                      <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light font-serif-luxury italic">
                        "{item.wish}"
                      </p>

                      <div className="flex items-center gap-1.5 mt-4 text-[10px] text-zinc-400 justify-end border-t border-dashed border-zinc-100 pt-2.5">
                        <span>
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
