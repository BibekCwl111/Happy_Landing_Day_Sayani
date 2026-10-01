import confetti from 'canvas-confetti';

/**
 * Triggers a full-screen celebratory confetti explosion with multiple bursts,
 * heart shapes, and pastel tones.
 */
export const triggerBirthdayConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#F43F5E', '#FB7185', '#F472B6', '#FBBF24', '#A78BFA', '#60A5FA', '#34D399'],
  };

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };

  // Burst 1: Core quick pop
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  // Burst 2: Wide dispersion
  fire(0.2, {
    spread: 60,
  });

  // Burst 3: High floaters
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  // Burst 4: Sparkle shower
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  // Burst 5: Trailing fireworks from edges
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#FDA4AF', '#F43F5E', '#FDE047'],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#FDA4AF', '#F43F5E', '#FDE047'],
    });
  }, 350);

  // Burst 6: Second wave wave of stars & hearts
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      shapes: ['star', 'circle'],
      colors: ['#F43F5E', '#FB7185', '#FDE047', '#C084FC'],
    });
  }, 750);
};
