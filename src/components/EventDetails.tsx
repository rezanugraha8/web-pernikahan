import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Clock,
  Copy,
  Check,
} from "lucide-react";

export default function EventDetails() {
  const weddingDate = new Date("2026-08-09T07:00:00+07:00"); // WIB
  const [copied, setCopied] = useState(false);

  // Countdown states
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft((prev) => ({ ...prev, isOver: true }));
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Google Calendar addition link (updated date)
  const getGoogleCalendarUrl = () => {
    const start = "20260809T000000Z"; // 07:00 WIB
    const end = "20260809T070000Z"; // 14:00 WIB
    const title = "Pernikahan Reza & Shafia";
    const details = "Undangan Pernikahan Premium Reza & Shafia.";
    const location =
      "Jl. Jend. H. Amir Machmud No.331, Cibabat, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40523";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "Jl. Jend. H. Amir Machmud No.331, Cibabat, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40523",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="event-section"
      className="relative py-24 px-6 md:px-12 bg-brand-maroon-dark flex flex-col items-center text-white"
    >
      {/* Decorative vertical golden thread line */}
      <div className="absolute top-0 bottom-[80%] w-[1px] bg-gradient-to-b from-brand-gold/30 to-transparent pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16 max-w-xl z-10 flex flex-col items-center">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-brand-gold uppercase mb-2">
          The Celebration
        </span>
        <h2 className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-champagne tracking-wide mb-4">
          Waktu & Lokasi Acara
        </h2>
        <div className="w-16 h-[1px] bg-brand-gold/30 my-2" />
        <p className="text-xs text-brand-champagne/80 uppercase tracking-[0.1em] mt-2">
          Minggu, 9 Agustus 2026
        </p>
      </div>

      {/* Countdown Grid (Glassmorphism look) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg w-full mb-20 z-10"
      >
        {[
          { label: "Hari", val: timeLeft.days },
          { label: "Jam", val: timeLeft.hours },
          { label: "Menit", val: timeLeft.minutes },
          { label: "Detik", val: timeLeft.seconds },
        ].map((item, i) => (
          <div
            key={i}
            className="glass-morphism-dark rounded-2xl py-4 md:py-6 flex flex-col items-center border border-brand-gold/15 shadow-sm transition-all duration-300 hover:border-brand-gold/30"
          >
            <span className="font-serif-luxury text-3xl md:text-5xl font-extralight text-brand-gold">
              {item.val.toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.15em] text-brand-champagne/60 uppercase mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Schedule Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full z-10 mb-16">
        {/* Card 1: Akad Nikah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-morphism-dark rounded-3xl p-8 border border-brand-gold/15 hover:border-brand-gold/30 hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between"
        >
          {/* Accent golden strip on left */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-brand-gold" />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2.5 rounded-full bg-brand-gold/10 text-brand-gold">
                <Clock className="w-5 h-5" />
              </span>
              <h3 className="font-serif-luxury text-2xl font-light text-brand-champagne tracking-wide">
                Akad Nikah
              </h3>
            </div>

            <p className="text-sm font-medium tracking-wide text-brand-champagne/95 mb-6 font-serif-luxury">
              Waktu: 07.00 - 10.30 WIB
            </p>

            <p className="text-xs text-brand-champagne/70 leading-relaxed font-light mb-8 italic">
              Akad nikah intim bagi keluarga besar dan kerabat terdekat.
              Dilanjutkan dengan ritual adat tradisi perpaduan luhur.
            </p>
          </div>

          <div className="flex gap-2 items-center text-xs tracking-wider text-brand-gold/80 font-medium">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>
              Gedung Aula Layanan Sosial Dinas Sosial Provinsi Jawa Barat
            </span>
          </div>
        </motion.div>

        {/* Card 2: Resepsi Pernikahan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-morphism-dark rounded-3xl p-8 border border-brand-gold/15 hover:border-brand-gold/30 hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between"
        >
          {/* Accent golden strip on left */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-brand-gold" />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2.5 rounded-full bg-brand-gold/10 text-brand-gold">
                <Calendar className="w-5 h-5" />
              </span>
              <h3 className="font-serif-luxury text-2xl font-light text-brand-champagne tracking-wide">
                Resepsi Pernikahan
              </h3>
            </div>

            <p className="text-sm font-medium tracking-wide text-brand-champagne/95 mb-6 font-serif-luxury">
              Waktu: 11.00 - 14.00 WIB
            </p>

            <p className="text-xs text-brand-champagne/70 leading-relaxed font-light mb-8 italic">
              Merayakan hari bahagia kedua mempelai melalui acara ramah tamah
              dan santap siang bersama.
            </p>
          </div>

          <div className="flex gap-2 items-center text-xs tracking-wider text-brand-gold/80 font-medium">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>
              Gedung Aula Layanan Sosial Dinas Sosial Provinsi Jawa Barat
            </span>
          </div>
        </motion.div>
      </div>

      {/* Map Embed and Action panel (Premium Glass Design) */}
      <div className="w-full max-w-4xl z-10 flex flex-col md:flex-row gap-6 items-stretch">
        {/* Left Side: Modern Simulated Map Interface (Stylized and minimal dark/gold concept) */}
        <div className="flex-1 relative rounded-2xl overflow-hidden min-h-[220px] bg-neutral-950 border border-brand-gold/20 p-6 flex flex-col justify-between text-white shadow-2xl">
          {/* Decorative network grid look */}
          <div className="absolute inset-0 bg-[radial-gradient(#c5a880_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-brand-gold/10 pointer-events-none" />

          <div className="z-10">
            <span className="text-[10px] tracking-[0.2em] text-brand-gold font-bold uppercase">
              The Venue location
            </span>
            <h4 className="font-serif-luxury text-xl font-light tracking-wide mt-1.5 text-brand-champagne">
              Jl. Jend. H. Amir Machmud No.331
            </h4>
            <p className="text-xs text-zinc-400 mt-2 line-clamp-2 max-w-sm leading-relaxed font-light">
              Cibabat, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40523
            </p>
          </div>

          <div className="z-10 flex flex-wrap gap-2 pt-4">
            <button
              onClick={copyAddress}
              className="flex items-center cursor-pointer gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs tracking-wider transition-all duration-300 font-medium text-brand-champagne uppercase"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.7 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Tersalin
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.7 }}
                    className="flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5 text-brand-gold" />
                    Salin Alamat
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="https://maps.app.goo.gl/CG5TSMURbCxfBjDdA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold/15 hover:bg-brand-gold/25 active:scale-95 border border-brand-gold/30 text-xs tracking-wider text-brand-gold transition-all duration-300 font-medium uppercase"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Petunjuk Jalan
            </a>
          </div>
        </div>

        {/* Right Side: Quick Action options */}
        <div className="flex-1 glass-morphism-dark rounded-2xl border border-brand-gold/15 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="font-serif-luxury text-lg font-light text-brand-champagne tracking-wide mb-3">
              Tambahkan ke Kalender Anda
            </h4>
            <p className="text-xs text-brand-champagne/70 leading-relaxed font-light mb-6">
              Jangan lewatkan momen sakral ini. Simpan tanggal pernikahan Reza &
              Shafia ke dalam kalender digital Anda agar mendapat pengingat
              otomatis.
            </p>
          </div>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-brand-gold hover:bg-brand-gold/90 active:scale-[0.99] text-brand-charcoal text-xs tracking-[0.15em] font-semibold transition-all duration-350 shadow-xl uppercase cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-brand-gold" />
            Ingatkan Saya (Google Calendar)
          </a>
        </div>
      </div>
    </section>
  );
}
