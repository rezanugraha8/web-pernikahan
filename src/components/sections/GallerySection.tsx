import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Modal } from '@/components/ui/Modal';
import { LazyImage } from '@/components/ui/LazyImage';
import type { GalleryItem } from '@/types';

const GalleryItemCard = memo(function GalleryItemCard({
  item,
  index,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onClick={() => onSelect(index)}
      aria-label={`Lihat ${item.caption}`}
      className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border border-white/10 focus-visible:ring-2 focus-visible:ring-gold-400"
    >
      {item.type === 'image' ? (
        <LazyImage
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          wrapperClassName="w-full h-full"
        />
      ) : (
        <>
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <span className="text-xs text-white/90 font-serif">{item.caption}</span>
      </div>
    </motion.button>
  );
});

export function GallerySection() {
  const items = WEDDING_CONFIG.gallery as GalleryItem[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = activeIndex !== null ? items[activeIndex] : null;

  const goNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % items.length,
    );
  }, [items.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev - 1 + items.length) % items.length,
    );
  }, [items.length]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80 || info.velocity.x > 500) goPrev();
    else if (info.offset.x < -80 || info.velocity.x < -500) goNext();
  };

  return (
    <section id="gallery" className="section-padding" aria-label="Galeri">
      <SectionHeader
        label="Moments"
        title="Gallery"
        description="Kenangan indah perjalanan cinta kami."
        light
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <GalleryItemCard
            key={`${item.src}-${index}`}
            item={item}
            index={index}
            onSelect={setActiveIndex}
          />
        ))}
      </div>

      <Modal
        open={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
        ariaLabel="Galeri fullscreen"
      >
        {active && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="relative"
          >
            {active.type === 'image' ? (
              <img
                src={active.src}
                alt={active.alt}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            ) : (
              <video
                src={active.src}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[80vh] rounded-xl"
              />
            )}
            <p className="text-center text-white/80 font-serif mt-4">
              {active.caption}
            </p>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Selanjutnya"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </Modal>
    </section>
  );
}
