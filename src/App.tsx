import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Cover from "./components/Cover";
import AudioPlayer from "./components/AudioPlayer";
import Couple from "./components/Couple";
import AestheticTimeline from "./components/AestheticTimeline";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import VirtualGift from "./components/VirtualGift";
import WishesWall from "./components/WishesWall";
import Footer from "./components/Footer";
import BackgroundSlideshow from "./components/BackgroundSlideshow";
import { Heart, Sparkles, Navigation } from "lucide-react";

// Daftar foto background – path benar tanpa "public/"
const backgroundPhotos = [
  "/foto/utama.jpeg",
  "/foto/prewed%20pantai5.jpeg",
  "/foto/prewed%20jawa3.jpeg",
  "/foto/prewed%20pantai1.jpeg",
  "/foto/prewed%20pantai2.jpeg",
  "/foto/prewed%20pantai4.jpeg",
  "/foto/prewed%20jawa4.jpeg",
  "/foto/prewed%20jawa6.jpeg",
  "/foto/prewed%20jawa5.jpeg",
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) return;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="relative w-full min-h-screen selection:bg-brand-gold/30 select-none">
      {/* Cover */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="invitation-gate"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              y: -50,
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <Cover onOpen={handleOpenInvitation} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Slideshow – overlay tipis (0.2) dan tanpa blur */}
      {isOpen && (
        <BackgroundSlideshow
          images={backgroundPhotos}
          interval={5000}
          overlayOpacity={0.2} // hanya 20% gelap agar foto tetap jelas
          blurAmount="none" // tidak ada blur
        />
      )}

      {/* Audio Player */}
      <AudioPlayer playRequested={isOpen} />

      {/* Konten Utama */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="relative w-full pt-16 z-10"
        >
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-200/50 z-50">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-gold via-yellow-500 to-brand-gold"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Floating Header */}
          <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-white/60 glass-morphism px-5 py-2.5 rounded-full border border-brand-gold/15 flex items-center gap-3.5 shadow-md">
            <span className="font-serif-luxury text-sm tracking-[0.2em] text-brand-charcoal font-semibold select-none">
              R & S
            </span>
            <div className="w-[1px] h-3.5 bg-brand-gold/30" />
            <span className="text-[10px] tracking-widest text-[#dfc29f] font-bold uppercase select-none flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#B76E79] animate-pulse fill-[#B76E79]" />
              The Wedding
            </span>
          </header>

          {/* ─── SEMUA SECTION DIBUNGKUS DENGAN LATAR TRANSPARAN ─── */}
          <div className="w-full bg-transparent">
            <main className="w-full">
              {/* Hero Section – dengan overlay gradasi gelap agar teks terbaca */}
              <section className="relative h-[90vh] md:h-screen w-full flex flex-col justify-end items-center text-center p-8 text-white">
                {/* Overlay gradasi tipis untuk keterbacaan teks */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                {/* Sparkles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="sparkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 6 + 4}px`,
                        height: `${Math.random() * 6 + 4}px`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${Math.random() * 8 + 6}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="z-10 max-w-xl pb-16 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span className="text-[10px] tracking-[0.25em] text-brand-champagne uppercase font-medium">
                      Welcome Guest
                    </span>
                  </motion.div>

                  <h2 className="font-serif-luxury text-xl md:text-2xl font-light text-brand-champagne tracking-[0.2em] uppercase mb-4">
                    Undangan Pernikahan
                  </h2>

                  <h1 className="font-serif-luxury text-5xl md:text-6xl font-light text-brand-gold tracking-[0.1em] mb-4 uppercase">
                    Reza & Shafia
                  </h1>

                  <div className="w-12 h-[1.5px] bg-[#dfc29f] my-3" />

                  <p className="text-xs tracking-[0.15em] text-zinc-300 font-light max-w-sm mt-3 uppercase leading-relaxed font-serif-luxury">
                    Minggu, 9 Agustus 2026 • Cimahi, Jawa Barat
                    
                  </p>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50">
                  <span className="text-[9px] tracking-widest uppercase font-medium">
                    Gulir ke bawah
                  </span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="text-brand-gold"
                  >
                    <Navigation className="w-4 h-4 rotate-180" />
                  </motion.div>
                </div>
              </section>

              {/* ─── SEMUA SECTION DENGAN LATAR TRANSPARAN ─── */}
              {/* Setiap komponen tetap memiliki background transparan (dipaksa dengan !bg-transparent) */}
              <div className="w-full !bg-transparent">
                <Couple />
              </div>
              <div className="w-full !bg-transparent">
                <AestheticTimeline />
              </div>
              <div className="w-full !bg-transparent">
                <EventDetails />
              </div>
              <div className="w-full !bg-transparent">
                <Gallery />
              </div>
              <div className="w-full !bg-transparent">
                <VirtualGift />
              </div>
              <div className="w-full !bg-transparent">
                <WishesWall />
              </div>
              <div className="w-full !bg-transparent">
                <Footer />
              </div>
            </main>
          </div>
        </motion.div>
      )}
    </div>
  );
}
