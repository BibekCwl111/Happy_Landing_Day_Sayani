import React, { useState, useEffect, useRef, useCallback } from 'react';
import { lofiAudio } from '../utils/audio';

interface RunawayButtonProps {
  label?: string;
  onDodge?: (count: number) => void;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({
  label = "No, thanks 🙈",
  onDodge,
  className = "",
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [dodgeCount, setDodgeCount] = useState(0);
  const dodgeCountRef = useRef(0);
  const [isDodging, setIsDodging] = useState(false);
  const lastDodgeTime = useRef<number>(0);

  // Jump to a new clever position inside viewport
  const moveAway = useCallback((cursorX?: number, cursorY?: number) => {
    const now = Date.now();
    if (now - lastDodgeTime.current < 100) return; // Debounce rapid triggers
    lastDodgeTime.current = now;

    const btn = buttonRef.current;
    const btnWidth = btn ? btn.offsetWidth : 140;
    const btnHeight = btn ? btn.offsetHeight : 48;

    const padding = 30;
    const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);

    let nextX = Math.floor(Math.random() * (maxX - padding)) + padding;
    let nextY = Math.floor(Math.random() * (maxY - padding)) + padding;

    // If we have cursor coords, make sure the new spot is at least 180px away from the cursor
    if (cursorX !== undefined && cursorY !== undefined) {
      for (let attempts = 0; attempts < 6; attempts++) {
        const dist = Math.hypot(nextX - cursorX, nextY - cursorY);
        if (dist > 180) break;
        nextX = Math.floor(Math.random() * (maxX - padding)) + padding;
        nextY = Math.floor(Math.random() * (maxY - padding)) + padding;
      }
    }

    setIsDodging(true);
    setPosition({ x: nextX, y: nextY });
    
    dodgeCountRef.current += 1;
    const nextCount = dodgeCountRef.current;
    setDodgeCount(nextCount);
    onDodge?.(nextCount);

    lofiAudio.playWhoosh();

    setTimeout(() => {
      setIsDodging(false);
    }, 250);
  }, [onDodge]);

  // Proximity detection listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      // Threshold: if cursor enters 85px radius of button center, escape!
      if (dist < 90) {
        moveAway(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [moveAway]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    moveAway(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveAway(touch.clientX, touch.clientY);
  };

  const isPositioned = position !== null;

  return (
    <div className="inline-block relative">
      <button
        ref={buttonRef}
        type="button"
        onPointerEnter={handlePointerEnter}
        onTouchStart={handleTouchStart}
        onClick={(e) => {
          e.preventDefault();
          moveAway();
        }}
        style={
          isPositioned
            ? {
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 999,
                transition: 'left 0.22s cubic-bezier(0.16, 1, 0.3, 1), top 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s ease',
              }
            : undefined
        }
        className={`px-5 py-2.5 rounded-full font-medium text-stone-500 bg-white/80 border border-stone-200/90 shadow-sm hover:shadow hover:text-stone-700 active:scale-95 cursor-pointer select-none transition-all duration-200 whitespace-nowrap group ${
          isDodging ? 'scale-90 opacity-90' : 'scale-100'
        } ${className}`}
        aria-label="No, thanks (playfully runs away)"
      >
        <span className="flex items-center gap-1.5 pointer-events-none">
          <span>{label}</span>
          {dodgeCount > 0 && (
            <span className="text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-mono">
              x{dodgeCount}
            </span>
          )}
        </span>
      </button>
    </div>
  );
};
