import { useRef, useEffect } from "react";

interface Props {
  active: boolean;
  coverImage: string;
  videoSrc: string;
}

export function BackgroundVideo({ active, coverImage, videoSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      const playOnInteraction = () => {
        video.play();
        document.removeEventListener("click", playOnInteraction);
      };
      document.addEventListener("click", playOnInteraction, { once: true });
    });
  }, [active]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* --- MODE 1: Sebelum undangan dibuka (foto + charcoal overlay) --- */}
      {!active && (
        <>
          <img
            src={coverImage}
            alt="Wedding Cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay charcoal (hampir hitam kemerahan) sesuai brand */}
          <div className="absolute inset-0 bg-[#1f0206]/90 backdrop-blur-[3px]" />
        </>
      )}

      {/* --- MODE 2: Setelah undangan dibuka (video jernih + blur tipis) --- */}
      {active && (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover animate-cinematic-zoom"
            poster={coverImage}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Hanya blur sangat tipis, tanpa warna tambahan */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/5" />
        </>
      )}
    </div>
  );
}
