import confetti from 'canvas-confetti';

export function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#d4af37', '#e8b4b8', '#ffffff', '#f5e6d3'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#d4af37', '#e8b4b8', '#ffffff', '#f5e6d3'],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };

  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#d4af37', '#e8b4b8', '#ffffff'],
  });

  frame();
}
