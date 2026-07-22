import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';

export function LoveStorySection() {
  return (
    <section id="story" className="section-padding" aria-label="Kisah cinta">
      <SectionHeader
        label="Our Journey"
        title="Love Story"
        description="Perjalanan dari pertemuan tak terduga hingga hari yang dinanti."
        light
      />

      <div className="max-w-3xl mx-auto relative">
        <div
          className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/20 via-gold-400/50 to-transparent"
          aria-hidden="true"
        />

        {WEDDING_CONFIG.loveStory.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative flex mb-12 last:mb-0 pl-16 md:pl-0 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } md:items-center`}
            >
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center z-10">
                <Heart className="w-4 h-4 text-gold-400" />
              </div>

              <div className={`md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                <GlassCard className="p-6 md:p-8" hover>
                  <span className="font-serif text-lg text-gold-400 mb-1 block">
                    {event.year}
                  </span>
                  <h3 className="font-serif text-xl text-white font-light mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {event.description}
                  </p>
                </GlassCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
