import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Users, CheckCircle2, Heart, Send } from "lucide-react";
import { Wish } from "../types";

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState<Wish["relation"]>("Sahabat");
  const [rsvp, setRsvp] = useState<Wish["rsvp"]>("hadir");
  const [wishText, setWishText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Starter examples so the wall isn't empty before real guests reply
  const seedWishes: Wish[] = [
    {
      id: "seed-1",
      name: "Rian & Amanda Savitri",
      relation: "Sahabat",
      wish: "Selamat ya Reza dan Shafia! Sungguh terharu melihat perjalanan cinta kalian dari pertemuan di acara pertunangan sahabat sampai akhirnya mengikat janji suci hari ini. Semoga pernikahan kalian selalu diliputi kedamaian, rasa asih, sukses bersama, dan cepat diberikan momongan lucu. Can’t wait to celebrate with you guys on August 9th! ❤️",
      rsvp: "hadir",
      timestamp: "2026-06-21T18:24:00Z",
    },
    {
      id: "seed-2",
      name: "Ibu Neni Herlina",
      relation: "Keluarga",
      wish: "Selamat menempuh hidup baru untuk anakku tersayang, Reza, dan menantuku Shafia. Semoga Allah SWT memberkahi pernikahan kalian, menyatukan dalam kebaikan, serta melimpahkan ketenteraman sakinah mawaddah warahmah selamanya. Aamiin yaa mujibassailiin.",
      rsvp: "hadir",
      timestamp: "2026-06-22T09:12:00Z",
    },
    {
      id: "seed-3",
      name: "Budi Santoso (Rekan Kerja)",
      relation: "Rekan Kerja",
      wish: "Happy wedding Reza & Shafia! Wishing you a magnificent life journey ahead filled with brilliant ideas, infinite laughter, and everlasting collaboration. Sorry I couldn’t stay long, but very excited to attend the sunset dinner reception!",
      rsvp: "hadir",
      timestamp: "2026-06-22T14:40:00Z",
    },
    {
      id: "seed-4",
      name: "Pratama Yusuf",
      relation: "Teman Sma/Kuliah",
      wish: "Wah gila mantap banget Reza akhirnya nyusul juga! Ikut mendoakan kelancaran acara nanti. Semoga bahagia terus sampai maut memisahkan kalian berdua, langgeng sampai kakek nenek!",
      rsvp: "hadir",
      timestamp: "2026-06-23T04:15:00Z",
    },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("wedding_wishes");
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch (err) {
        setWishes(seedWishes);
      }
    } else {
      setWishes(seedWishes);
      localStorage.setItem("wedding_wishes", JSON.stringify(seedWishes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wishText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newWish: Wish = {
        id: `wish-${Date.now()}`,
        name: name.trim(),
        relation,
        wish: wishText.trim(),
        rsvp,
        timestamp: new Date().toISOString(),
      };

      const updated = [newWish, ...wishes];
      setWishes(updated);
      localStorage.setItem("wedding_wishes", JSON.stringify(updated));

      // Clear Form state
      setName("");
      setWishText("");
      setSuccess(true);
      setIsSubmitting(false);

      // Reset success toast
      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
  };

  // Stats calculation
  const totalReplied = wishes.length;
  const totalHadir = wishes.filter((w) => w.rsvp === "hadir").length;
  const totalTidakHadir = wishes.filter((w) => w.rsvp === "tidak_hadir").length;
  const totalRagu = wishes.filter((w) => w.rsvp === "ragu").length;

  return (
    <section
      id="rsvp-section"
      className="relative py-24 px-6 md:px-12 bg-brand-maroon-pale overflow-hidden flex flex-col items-center"
    >
      {/* Decorative center division thread line */}
      <div className="absolute top-0 bottom-[85%] w-[1px] bg-gradient-to-b from-brand-gold/30 to-transparent pointer-events-none" />

      {/* Title */}
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
          kami. Mohon luangkan waktu untuk mengonfirmasi kehadiran Anda.
        </p>
      </div>

      {/* General Attendance Status Board (Compact, Startup Style) */}
      <div className="w-full max-w-5xl z-10 mb-12 grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-3xl bg-brand-cream border border-brand-gold/15">
        {/* Total stats */}
        <div className="py-4 px-6 flex items-center justify-between sm:justify-start gap-4 sm:border-r border-dashed border-brand-gold/15 last:border-0">
          <div className="p-3 rounded-2xl bg-brand-charcoal text-white">
            <Users className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-luxury">
              {totalReplied}
            </div>
            <div className="text-xs text-brand-charcoal/40 tracking-wider font-light">
              Tamu Menjawab
            </div>
          </div>
        </div>

        {/* Hadir Stats */}
        <div className="py-4 px-6 flex items-center justify-between sm:justify-start gap-4 sm:border-r border-dashed border-brand-gold/15 last:border-0">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-luxury text-emerald-600">
              {totalHadir}
            </div>
            <div className="text-xs text-brand-charcoal/40 tracking-wider font-light">
              Konfirmasi Hadir
            </div>
          </div>
        </div>

        {/* Ragu Stats */}
        <div className="py-4 px-6 flex items-center justify-between sm:justify-start gap-4 sm:border-r border-dashed border-brand-gold/15 last:border-0">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-luxury text-amber-600">
              {totalRagu}
            </div>
            <div className="text-xs text-brand-charcoal/40 tracking-wider font-light">
              Masih Ragu
            </div>
          </div>
        </div>

        {/* Tidak Hadir Stats */}
        <div className="py-4 px-6 flex items-center justify-between sm:justify-start gap-4 last:border-0">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-serif-luxury text-red-600">
              {totalTidakHadir}
            </div>
            <div className="text-xs text-brand-charcoal/40 tracking-wider font-light">
              Berhalangan
            </div>
          </div>
        </div>
      </div>

      {/* Main Form and Wish Stream Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl w-full z-10 items-start">
        {/* Left Side: Elegant RSVP Input Form (Glassmorphism design) */}
        <div className="lg:col-span-5 w-full">
          <h3 className="font-serif-luxury text-2xl font-light text-brand-maroon mb-6 relative">
            Formulir RSVP
            <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-brand-gold" />
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-brand-cream border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-md"
          >
            {/* Input Name */}
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
                className="w-full px-4 py-3 text-sm bg-white border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 rounded-xl outline-none placeholder-zinc-300 transition-all duration-300 shadow-inner"
              />
            </div>

            {/* Selector: Relation */}
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
                onChange={(e) =>
                  setRelation(e.target.value as Wish["relation"])
                }
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

            {/* Attendance Switcher */}
            <div>
              <span className="block text-[11px] font-semibold text-brand-charcoal/60 uppercase tracking-widest mb-3">
                Konfirmasi Kehadiran
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "hadir", label: "Hadir" },
                  { value: "ragu", label: "Ragu" },
                  { value: "tidak_hadir", label: "Tidak Hadir" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRsvp(item.value as Wish["rsvp"])}
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

            {/* Input Wish/Prayer text */}
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
                className="w-full px-4 py-3 text-sm bg-white border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 rounded-xl outline-none placeholder-zinc-300 resize-none transition-all duration-300 shadow-inner"
              />
            </div>

            {/* Submission Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                isSubmitting
                  ? "bg-zinc-300 text-zinc-500 border-zinc-300 shadow-none"
                  : "bg-brand-maroon text-white hover:bg-brand-maroon/95 border border-brand-maroon shadow-brand-maroon/10"
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-600 rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                  Kirim Undangan
                </>
              )}
            </motion.button>

            {/* Success Micro Toast Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 text-xs text-center border bg-emerald-50 text-emerald-700 border-emerald-100 rounded-xl animate-fade-in-up font-semibold flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Konfirmasi RSVP Anda berhasil terkirim! Terima kasih.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right Side: Wishes Wall Live Stream (Interactive scrolling display) */}
        <div id="wishes-wall" className="lg:col-span-7 w-full">
          <h3 className="font-serif-luxury text-2xl font-light text-brand-maroon mb-6 relative">
            Wishes Wall (Doa Restu)
            <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-brand-gold" />
          </h3>

          <div className="space-y-4 max-h-[570px] overflow-y-auto pr-3 scroll-smooth scrollbar-thin select-none relative pb-6 border-b border-brand-gold/10">
            <AnimatePresence initial={false}>
              {wishes.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-5 rounded-2xl bg-brand-cream border border-brand-gold/10 hover:border-brand-gold/20 transition-all duration-300 relative flex flex-col justify-between"
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

                    {/* RSVP state tag */}
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
                    “{item.wish}”
                  </p>

                  <div className="flex items-center gap-1.5 mt-4 text-[10px] text-zinc-400 justify-end border-t border-dashed border-zinc-100 pt-2.5">
                    <span>
                      {new Date(item.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
