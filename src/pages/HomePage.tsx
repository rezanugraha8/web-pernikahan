import { Suspense, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundVideo } from "@/components/layout/BackgroundVideo";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { FloatingControls } from "@/components/layout/FloatingControls";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingFlowers } from "@/components/layout/FloatingFlowers";
import { Particles } from "@/components/layout/Particles";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { CoverSection } from "@/components/sections/CoverSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { LoveStorySection } from "@/components/sections/LoveStorySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { EventSection } from "@/components/sections/EventSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { GiftSection } from "@/components/sections/GiftSection";
import { WishesSection } from "@/components/sections/WishesSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { useGuestName } from "@/hooks/useGuestName";
import { useTheme } from "@/hooks/useTheme";
import { useScrollProgress } from "@/hooks/useScroll";
import { WEDDING_CONFIG } from "@/config/wedding";

// Konfigurasi asset background
const BACKGROUND_IMAGE = "/foto/prewed%20pantai3.jpeg";
const BACKGROUND_VIDEO = "/background1.mp4";

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20" aria-label="Memuat">
      <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
    </div>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { guestName, isVip, rank } = useGuestName();
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress(isOpen);

  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  const handleOpen = useCallback(() => {
    // fireConfetti(); // dihapus - tidak ada efek confetti
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Background: foto statis sebelum open, video setelah open */}
          <BackgroundVideo
            active={isOpen}
            coverImage={BACKGROUND_IMAGE}
            videoSrc={BACKGROUND_VIDEO}
          />

          {isOpen && <FloatingFlowers />}
          {isOpen && <Particles />}
          {isOpen && <CursorGlow />}

          <MusicPlayer playRequested={isOpen} />
          <FloatingControls
            theme={theme}
            onToggleTheme={toggleTheme}
            visible={isOpen}
          />
          {isOpen && <ScrollProgress progress={scrollProgress} />}

          {isOpen && (
            <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass-card px-5 py-2.5 rounded-full flex items-center gap-3">
              <span className="font-serif text-sm tracking-[0.2em] text-white font-light">
                {WEDDING_CONFIG.couple.monogram}
              </span>
              <div className="w-px h-3 bg-white/20" />
              <span className="text-[10px] tracking-widest text-gold-400 uppercase">
                The Wedding
              </span>
            </header>
          )}

          <main className="relative z-10">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="cover"
                  exit={{ opacity: 0, scale: 1.05, y: -40 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CoverSection
                    guestName={guestName}
                    isVip={isVip}
                    rank={rank}
                    onOpen={handleOpen}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <Suspense fallback={<SectionLoader />}>
                    <HeroSection guestName={guestName} />
                    <CoupleSection />
                    <LoveStorySection />
                    <GallerySection />
                    <EventSection />
                    <CountdownSection />
                    <GiftSection />
                    <WishesSection />
                    <FooterSection />
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}
    </>
  );
}
