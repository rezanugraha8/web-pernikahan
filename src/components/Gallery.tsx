import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  PanInfo,
} from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Placeholder jika gambar gagal dimuat
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e8d5c4'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%23806040' text-anchor='middle' dy='.3em'%3EGallery%3C/text%3E%3C/svg%3E";

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const galleryImages = [
    {
      src: "public/foto/prewed jawa1.jpeg",
      alt: "Reza & Shafia - Prewedding dengan busana adat Jawa",
      caption: "Harmoni dalam Tradisi",
    },
    {
      src: "public/foto/prewed jawa2.jpeg",
      alt: "Reza & Shafia - Momen mesra dalam balutan Jawa",
      caption: "Kasih yang Luhur",
    },
    {
      src: "public/foto/prewed jawa3.jpeg",
      alt: "Potret elegan Reza & Shafia",
      caption: "Janji Abadi",
    },
    {
      src: "public/foto/prewed pantai1.jpeg",
      alt: "Reza & Shafia berjalan di tepi pantai",
      caption: "Langkah Bersama",
    },
    {
      src: "public/foto/prewed pantai2.jpeg",
      alt: "Momen romantis saat matahari terbenam di pantai",
      caption: "Senja di Pelukanmu",
    },
    {
      src: "public/foto/prewed pantai4.jpeg",
      alt: "Keceriaan Reza & Shafia di pantai",
      caption: "Debur Ombak Cinta",
    },
  ];

  // Duplicate images for seamless infinite scroll
  const marqueeImages = [...galleryImages, ...galleryImages, ...galleryImages];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + 1) % galleryImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto(
      (activePhoto - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  // ✅ PERBAIKAN ADA DI SINI (Menambahkan underscore _e)
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    if (activePhoto === null) return;
    const swipeThreshold = 50;
    if (offset.x > swipeThreshold || velocity.x > 500) {
      handlePrev();
    } else if (offset.x < -swipeThreshold || velocity.x < -500) {
      handleNext();
    }
  };

  return (
    <section
      id="gallery-section"
      className="relative py-24 px-6 md:px-12 bg-brand-maroon-pale overflow-hidden flex flex-col items-center"
    >
      {/* Background glow beranimasi */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] -right-24 w-80 h-80 rounded-full bg-brand-gold/5 pointer-events-none"
      />

      {/* Judul dengan animasi */}
      <div className="text-center mb-16 max-w-xl z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="font-serif-luxury text-sm tracking-[0.25em] text-brand-gold uppercase mb-2"
        >
          Moments in Time
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-maroon tracking-wide mb-4"
        >
          Galeri Pra-Wedding
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="h-[1px] bg-brand-gold/30 my-2"
        />
        <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light mt-2 max-w-xs">
          Kumpulan rangkuman gambar perjalanan kebahagiaan kami yang diabadikan
          dalam bingkai penuh kasih.
        </p>
      </div>

      {/* Grid Galeri dengan efek tilt 3D */}
      <div className="max-w-5xl w-full z-10">
        {/* Mobile: Seamless infinite marquee carousel */}
        <div
          className={`md:hidden flex gap-4 pb-4 overflow-hidden ${isPaused ? "animation-play-state-paused" : ""}`}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-4 animate-marquee">
            {marqueeImages.map((img, index) => (
              <div
                key={`${index}-marquee`}
                className="flex-shrink-0 w-72"
                onClick={() => setActivePhoto(index % galleryImages.length)}
              >
                <GalleryCard
                  img={img}
                  index={index % galleryImages.length}
                  onClick={() => setActivePhoto(index % galleryImages.length)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <GalleryCard
              key={index}
              img={img}
              index={index}
              onClick={() => setActivePhoto(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal dengan animasi 3D */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/90"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-champagne/80 hover:text-white border border-white/10 transition-all duration-300 z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-champagne/80 hover:text-white border border-white/10 transition-all duration-300 z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.8, rotateY: -45, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotateY: 45, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center relative select-none cursor-grab active:cursor-grabbing"
              style={{ perspective: "800px" }}
            >
              <img
                src={galleryImages[activePhoto].src}
                alt={galleryImages[activePhoto].alt}
                className="max-w-full max-h-[70vh] rounded-2xl object-contain border border-brand-gold/15 shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
              <div className="text-center mt-6 text-white max-w-sm">
                <span className="text-[10px] tracking-widest uppercase text-brand-gold font-bold">
                  {activePhoto + 1} / {galleryImages.length}
                </span>
                <h4 className="font-serif-luxury text-xl font-light tracking-wide text-brand-champagne mt-1.5">
                  {galleryImages[activePhoto].caption}
                </h4>
              </div>
            </motion.div>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-champagne/80 hover:text-white border border-white/10 transition-all duration-300 z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Komponen Kartu Galeri dengan Tilt 3D ───
interface GalleryCardProps {
  img: { src: string; alt: string; caption: string };
  index: number;
  onClick: () => void;
}

function GalleryCard({ img, index, onClick }: GalleryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-brand-gold/10 shadow-md aspect-3/4 max-h-[380px] group"
    >
      <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-15 group-hover:grayscale-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
        }}
      />
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center text-white">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-brand-gold font-bold block mb-1">
            Pre-Wedding
          </span>
          <span className="font-serif-luxury text-lg font-light tracking-wide">
            {img.caption}
          </span>
        </div>
        <span className="p-2 rounded-full border border-white/20 bg-white/10">
          <Maximize2 className="w-4 h-4 text-brand-champagne" />
        </span>
      </div>
    </motion.div>
  );
}
