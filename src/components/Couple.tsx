import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Instagram } from "lucide-react";
import { useRef } from "react";

export default function Couple() {
  const coupleQuote = {
    verse:
      "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”",
    source: "QS. Ar-Rum: 21",
  };

  const groom = {
    name: "Reza Nugraha",
    nickname: "Eca",
    sonOf: "Putra ke-2 dari Bapak Tarmubi (Almarhum)",
    instagram: "_rezanugrahaa",
    bio: "Seorang Frontend Web Developer yang teliti, menyukai teknologi, dan berdedikasi menciptakan pengalaman digital yang indah. Lahir 8 Oktober 1999.",
    image: "public/foto/pengantin pria.jpeg",
  };

  const bride = {
    name: "Shafia",
    daughterOf: "Putri ke-2 dari Bapak Supardi",
    instagram: "shafiasalsaa",
    bio: "Seorang Nail Enterpreneur (Nail Artist) yang kreatif, penuh semangat, dan mencintai seni merawat kuku serta kecantikan. Lahir 4 Juni 2002.",
    image: "public/foto/pengantin wanita.jpeg",
  };

  return (
    <section
      id="couple-section"
      className="relative py-24 px-6 md:px-12 bg-brand-maroon-pale overflow-hidden flex flex-col items-center perspective-1000"
    >
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-brand-champagne/40 to-transparent pointer-events-none" />

      {/* Floating luxury elements dengan animasi naik-turun */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-brand-gold/10 pointer-events-none"
      />
      <motion.div
        initial={{ scale: 1, opacity: 0.3 }}
        animate={{ scale: 1.2, opacity: 0.5 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-1/4 -right-12 w-64 h-64 rounded-full bg-brand-gold/10 pointer-events-none"
      />

      {/* Quote Block – now repeat on every scroll in */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl text-center mb-24 px-4 relative z-10"
      >
        <div className="text-brand-gold text-4xl font-serif-luxury font-light mb-6 select-none opacity-80">
          “
        </div>
        <p className="font-serif-luxury italic text-brand-maroon-dark/95 text-lg md:text-xl leading-relaxed mb-4">
          {coupleQuote.verse}
        </p>
        <span className="text-xs tracking-[0.2em] font-medium text-brand-gold uppercase">
          {coupleQuote.source}
        </span>
        <div className="w-12 h-[1px] bg-brand-gold/30 mt-8 mx-auto" />
      </motion.div>

      {/* Grid kartu dengan tilt 3D */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl w-full relative z-10">
        <TiltCard data={groom} label="The Groom" delay={0} isGroom={true} />
        {/* Ampersand dekoratif */}
        <div className="hidden md:flex absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 font-serif-luxury text-7xl font-extralight text-brand-maroon/10 pointer-events-none select-none z-0">
          &
        </div>
        <TiltCard data={bride} label="The Bride" delay={0.2} isGroom={false} />
      </div>
    </section>
  );
}

// ─── Komponen Kartu dengan efek Tilt 3D ───
function TiltCard({ data, label, delay, isGroom }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const offsetX = (e.clientX - rect.left) / width - 0.5;
    const offsetY = (e.clientY - rect.top) / height - 0.5;
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
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="flex flex-col items-center text-center relative"
    >
      <div
        className="relative group mb-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bayangan dengan efek parallax */}
        <motion.div
          className={`absolute inset-0 bg-brand-gold/10 rounded-[2rem] translate-x-2 translate-y-3 ${
            isGroom ? "-rotate-2" : "rotate-2"
          } group-hover:rotate-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500 ease-out z-0`}
          style={{
            transform: useTransform(rotateX, (v) => `translateZ(-20px)`),
            transformStyle: "preserve-3d",
          }}
        />
        <div
          className="relative w-56 h-72 md:w-64 md:h-80 rounded-[2rem] overflow-hidden border border-brand-gold/25 z-10 shadow-xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      <span className="font-serif-luxury text-sm tracking-[0.2em] text-brand-gold font-light uppercase mb-2">
        {label}
      </span>
      <h3 className="font-serif-luxury text-3xl font-light text-brand-maroon tracking-wide mb-1">
        {data.name}
      </h3>
      {data.nickname && (
        <span className="text-xs text-brand-gold/70 mb-3">
          (panggilan {data.nickname})
        </span>
      )}
      <p className="text-xs text-brand-charcoal/60 tracking-wider mb-4 max-w-xs leading-relaxed font-serif-luxury">
        {data.sonOf || data.daughterOf}
      </p>
      <p className="text-xs text-brand-charcoal/70 max-w-xs mb-6 px-4 leading-relaxed font-light">
        {data.bio}
      </p>

      <motion.a
        href={`https://instagram.com/${data.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 text-xs text-brand-gold hover:text-brand-charcoal hover:bg-brand-gold/15 border border-brand-gold/30 hover:border-brand-gold px-4 py-2 rounded-full transition-all duration-300 font-medium tracking-widest uppercase cursor-pointer"
      >
        <Instagram className="w-3.5 h-3.5" />@{data.instagram}
      </motion.a>
    </motion.div>
  );
}
