import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number; // milidetik, default 5000
  overlayOpacity?: number; // 0 - 1, default 0.5
  blurAmount?: string; // misal 'sm', 'md', 'lg', default 'sm'
}

export default function BackgroundSlideshow({
  images,
  interval = 5000,
  overlayOpacity = 0.5,
  blurAmount = "sm",
}: BackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload semua gambar agar transisi lebih halus
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Ganti gambar setiap interval
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay gelap agar konten tetap terbaca */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
