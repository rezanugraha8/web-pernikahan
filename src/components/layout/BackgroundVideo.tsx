import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_CONFIG } from '@/config/wedding';

export const BackgroundVideo = memo(function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = WEDDING_CONFIG.media.backgroundVideos;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => undefined);
    };

    play();
    video.addEventListener('canplay', play);
    return () => video.removeEventListener('canplay', play);
  }, [videoIndex]);

  const handleEnded = () => {
    if (videos.length > 1) {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          key={videos[videoIndex]}
          src={videos[videoIndex]}
          autoPlay
          muted
          loop={videos.length === 1}
          playsInline
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
});
