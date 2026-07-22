import { memo } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { LazyImage } from '@/components/ui/LazyImage';

const PersonCard = memo(function PersonCard({
  label,
  name,
  nickname,
  parents,
  bio,
  instagram,
  photo,
  delay,
}: {
  label: string;
  name: string;
  nickname: string;
  parents: string;
  bio: string;
  instagram: string;
  photo: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay }}
    >
      <GlassCard className="p-8 text-center h-full" hover>
        <LazyImage
          src={photo}
          alt={`Foto ${name}`}
          wrapperClassName="w-48 h-60 mx-auto rounded-2xl mb-6"
          className="w-full h-full object-cover rounded-2xl"
        />
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 mb-2 block">
          {label}
        </span>
        <h3 className="font-serif text-2xl text-white font-light mb-1">{name}</h3>
        <p className="text-xs text-gold-300/70 mb-3">({nickname})</p>
        <p className="text-xs text-white/50 mb-2 leading-relaxed">{parents}</p>
        <p className="text-xs text-white/40 mb-6 leading-relaxed">{bio}</p>
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${name}`}
          className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 border border-gold-400/30 px-4 py-2 rounded-full transition-colors"
        >
          <Instagram className="w-3.5 h-3.5" />@{instagram}
        </a>
      </GlassCard>
    </motion.div>
  );
});

export function CoupleSection() {
  const { groom, bride, couple } = WEDDING_CONFIG;

  return (
    <section id="couple" className="section-padding" aria-label="Profil mempelai">
      <SectionHeader
        label="The Couple"
        title="Mempelai"
        description="Dua hati yang dipersatukan dalam cinta dan kehendak-Nya."
        light
      />

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center mb-16 px-4"
      >
        <p className="font-serif italic text-white/80 text-lg leading-relaxed mb-3">
          &ldquo;{couple.quote.verse}&rdquo;
        </p>
        <cite className="text-xs tracking-[0.2em] uppercase text-gold-400 not-italic">
          {couple.quote.source}
        </cite>
      </motion.blockquote>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PersonCard
          label="The Groom"
          name={groom.fullName}
          nickname={groom.nickname}
          parents={groom.parents}
          bio={groom.bio}
          instagram={groom.instagram}
          photo={groom.photo}
          delay={0}
        />
        <PersonCard
          label="The Bride"
          name={bride.fullName}
          nickname={bride.nickname}
          parents={bride.parents}
          bio={bride.bio}
          instagram={bride.instagram}
          photo={bride.photo}
          delay={0.15}
        />
      </div>
    </section>
  );
}
