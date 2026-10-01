import React, { useEffect, useRef, useState } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swingAngle: number;
  swingSpeed: number;
  opacity: number;
  color: string;
  petalType: number; // 0: sakura petal, 1: curved rose petal
}

interface PetalsCanvasProps {
  density?: number; // number of petals (default 45)
  interactive?: boolean;
  className?: string;
}

export const PetalsCanvas: React.FC<PetalsCanvasProps> = ({
  density = 40,
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const mousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isEnabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const petalColors = [
      'rgba(251, 207, 232, 0.75)', // pink-200
      'rgba(244, 114, 182, 0.65)', // pink-400
      'rgba(253, 164, 175, 0.7)',  // rose-300
      'rgba(254, 205, 211, 0.8)',  // rose-200
      'rgba(255, 228, 230, 0.85)', // rose-100
    ];

    const createPetal = (startY?: number): Petal => ({
      x: Math.random() * width,
      y: startY !== undefined ? startY : Math.random() * height,
      size: Math.random() * 9 + 8, // 8px to 17px
      speedY: Math.random() * 1.4 + 0.9,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      swingAngle: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.4 + 0.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      petalType: Math.random() > 0.5 ? 1 : 0,
    });

    const petals: Petal[] = Array.from({ length: density }, () => createPetal());

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.swingAngle), 1); // 3D-like flip fluttering effect
      ctx.fillStyle = p.color;
      ctx.beginPath();

      if (p.petalType === 0) {
        // Delicate Sakura Petal with notched tip
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
      } else {
        // Soft rounded rose petal
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.ellipse(0, p.size * 0.3, p.size * 0.5, p.size * 0.7, 0, 0, Math.PI * 2);
      }

      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.swingAngle += p.swingSpeed;
        p.x += Math.sin(p.swingAngle) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Subtle breeze push if mouse gets near
        if (mousePos.current) {
          const dx = p.x - mousePos.current.x;
          const dy = p.y - mousePos.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) {
            const push = (100 - dist) * 0.04;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
        }

        // Loop back to top if fallen past screen bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [density, interactive, isEnabled]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-20 overflow-hidden ${className}`}>
      {isEnabled && <canvas ref={canvasRef} className="block w-full h-full" />}
      {/* Quiet toggle in corner if user prefers reduced animation */}
      <div className="pointer-events-auto absolute bottom-4 right-4 z-30 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className="text-xs bg-white/80 backdrop-blur border border-rose-200 text-stone-600 px-2.5 py-1 rounded-full shadow-sm hover:bg-white flex items-center gap-1.5 transition-colors"
          title="Toggle falling flower petals"
          aria-label="Toggle falling flower petals"
        >
          <span>🌸</span>
          <span className="hidden sm:inline">{isEnabled ? 'Petals: On' : 'Petals: Off'}</span>
        </button>
      </div>
    </div>
  );
};
