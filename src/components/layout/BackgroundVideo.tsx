import { useRef, useEffect } from "react";

interface Props {
  active: boolean;
  coverImage: string;
  videoSrc: string;
}

export function BackgroundVideo({ active, coverImage, videoSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => {
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction, { once: true });
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={coverImage}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {!active && (
        <div className="absolute inset-0 bg-[#1f0206]/90 backdrop-blur-[3px]" />
      )}

      {active && (
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/5" />
      )}
    </div>
  );
}
