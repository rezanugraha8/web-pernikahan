import { motion } from "motion/react";
import { Heart, Search, Compass, Sparkles } from "lucide-react";

export default function AestheticTimeline() {
  const storyEvents = [
    {
      year: "2020",
      title: "Awal Pertemuan (The Spark)",
      description:
        "Dipertemukan Tuhan di acara pertunangan sahabat semasa kecilnya. Pertemuan yang tak terduga ini menjadi titik awal dari perjalanan cinta kami.",
      icon: <Compass className="w-5 h-5 text-brand-gold" />,
    },
    {
      year: "2020 - 2026",
      title: "Perjalanan Berdua (The Bonding)",
      description:
        "Berhubungan mulai 28 Desember 2020. Diisi dengan petualangan, diskusi mendalam, serta saling mendukung karir masing-masing, perlahan mematangkan komitmen kami.",
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
    },
    {
      year: "2026",
      title: "Lamaran & Pernikahan (The Proposal)",
      description:
        "Bertunangan pada 29 Maret 2026 dan akan melangkah ke jenjang pernikahan pada 9 Agustus 2026. Sebuah babak baru yang Reza dan Shafia nantikan bersama.",
      icon: <Heart className="w-5 h-5 text-brand-gold" />,
    },
  ];

  return (
    <section
      id="story-section"
      className="relative py-24 px-6 md:px-12 bg-brand-cream overflow-hidden flex flex-col items-center"
    >
      {/* Decorative floral watermark styled background elements */}
      <div className="absolute top-[40%] -left-32 w-80 h-80 rounded-full bg-brand-gold/5 pointer-events-none" />
      <div className="absolute top-[10%] right-0 w-44 h-44 rounded-full bg-zinc-200/50 pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-20 max-w-xl z-10 flex flex-col items-center">
        <span className="font-serif-luxury text-sm tracking-[0.25em] text-brand-gold uppercase mb-2">
          Our Journey
        </span>
        <h2 className="font-serif-luxury text-4xl md:text-5xl font-light text-brand-maroon tracking-wide mb-4">
          Kisah Cinta Kami
        </h2>
        <div className="w-16 h-[1px] bg-brand-gold/30 my-2" />
        <p className="text-xs text-brand-charcoal/50 leading-relaxed font-light mt-2 max-w-sm">
          Perjalanan dari dua garis takdir yang saling bersilangan hingga
          melebur menjadi satu tujuan suci.
        </p>
      </div>

      {/* Timeline Line & Cards */}
      <div className="relative max-w-3xl w-full z-10 flex flex-col">
        {/* Infinite connecting central line */}
        <div className="absolute left-[29px] md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-brand-gold/20 via-brand-gold/50 to-brand-gold/10" />

        {storyEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 w-full pl-12 md:pl-0 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline marker with custom symbol */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-white border border-brand-gold/30 shadow-md flex items-center justify-center z-20 hover:border-brand-gold hover:shadow-brand-gold/20 hover:scale-105 transition-all duration-300"
              >
                {event.icon}
              </motion.div>

              {/* Side Content Panel */}
              <div className="w-full md:w-[44%] flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="glass-morphism rounded-2xl p-6 md:p-8 border border-brand-gold/15 hover:border-brand-gold/25 transition-all duration-300 shadow-sm w-full relative"
                >
                  {/* Miniature decorative backdrop year */}
                  <span className="font-serif-luxury text-6xl md:text-7xl font-extralight text-brand-gold/10 absolute top-2 right-4 select-none pointer-events-none">
                    {event.year}
                  </span>

                  <span className="font-serif-luxury text-xl font-light text-brand-gold tracking-wide block mb-1">
                    {event.year}
                  </span>

                  <h3 className="font-serif-luxury text-xl font-light text-brand-maroon-light tracking-wide mb-3">
                    {event.title}
                  </h3>

                  <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">
                    {event.description}
                  </p>
                </motion.div>
              </div>

              {/* Spacer on the opposite side */}
              <div className="hidden md:block w-[44%]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
