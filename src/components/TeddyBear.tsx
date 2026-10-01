import React, { useState, useEffect } from 'react';
import { TeddyEmotion } from '../types';

interface TeddyBearProps {
  emotion?: TeddyEmotion;
  speechText?: string;
  isRunawayActive?: boolean;
  mousePos?: { x: number; y: number };
  buttonPos?: { x: number; y: number } | null;
  onTeddyClick?: () => void;
  className?: string;
}

export const TeddyBear: React.FC<TeddyBearProps> = ({
  emotion = 'idle',
  speechText,
  isRunawayActive = false,
  mousePos,
  onTeddyClick,
  className = '',
}) => {
  const [internalSpeech, setInternalSpeech] = useState<string>(
    speechText || "Hi Sayani! 💖 Teddy brought you a secret birthday surprise!"
  );
  const [bounce, setBounce] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  // Update speech text when prop changes
  useEffect(() => {
    if (speechText) {
      setInternalSpeech(speechText);
    }
  }, [speechText]);

  // Eye tracking offset calculation based on mouse
  const eyeOffset = React.useMemo(() => {
    if (!mousePos) return { x: 0, y: 0 };
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = Math.max(-4, Math.min(4, (mousePos.x - cx) / 80));
    const dy = Math.max(-3, Math.min(3, (mousePos.y - cy) / 80));
    return { x: dx, y: dy };
  }, [mousePos]);

  const handleBearTap = () => {
    setBounce(true);
    const newHeart = { id: Date.now(), x: Math.random() * 40 - 20 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    const phrases = [
      "Happy Birthday, Sayani! 🧸🌸",
      "Teddy knows who built this website for you! 🤐✨",
      "Look for the 4 secret clues in your gift, Sayani! 🕵️‍♀️",
      "He has been quietly admiring your radiant smile! 💖",
      "You deserve the biggest smiles today, Sayani! ✨",
      "Teddy promised not to spoil his secret identity! 🤫🧸",
      "Wishing you the most magical birthday! 🎉"
    ];
    setInternalSpeech(phrases[Math.floor(Math.random() * phrases.length)]);
    setTimeout(() => setBounce(false), 600);
    onTeddyClick?.();
  };

  // Determine state-based expressions
  const isGuarding = emotion === 'guarding' || isRunawayActive;
  const isSurprised = emotion === 'surprised' || isRunawayActive;
  const isGiggling = emotion === 'giggling';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      <div className="relative mb-3 transition-all duration-300 transform scale-100 max-w-[280px]">
        <div className="bg-white/95 backdrop-blur-sm border-2 border-rose-200/80 rounded-2xl px-4 py-2.5 shadow-md shadow-rose-100/50 text-stone-800 text-sm font-medium text-center relative">
          <p className="leading-snug transition-all duration-200">
            {internalSpeech}
          </p>
          {/* Speech bubble beak */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-rose-200 rotate-45" />
        </div>
      </div>

      {/* Floating hearts emitted on tap */}
      <div className="absolute top-12 pointer-events-none">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-xl animate-float transition-all duration-1000 opacity-90"
            style={{
              transform: `translate(${heart.x}px, -40px) scale(1.3)`,
              animation: 'floatGentle 1.2s ease-out forwards',
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* Interactive SVG Teddy Bear */}
      <div
        onClick={handleBearTap}
        className={`cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
          bounce ? 'animate-bounce' : ''
        }`}
        title="Tap Teddy for a warm hug!"
      >
        <svg
          width="170"
          height="160"
          viewBox="0 0 200 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md"
        >
          {/* Left Ear */}
          <circle cx="55" cy="50" r="28" fill="#B27A4B" />
          <circle cx="55" cy="50" r="17" fill="#FBCFE8" />

          {/* Right Ear */}
          <circle cx="145" cy="50" r="28" fill="#B27A4B" />
          <circle cx="145" cy="50" r="17" fill="#FBCFE8" />

          {/* Party Hat (Cute whimsical detail) */}
          <g transform="translate(100, 18)">
            <polygon points="-16,22 16,22 0,-24" fill="#F43F5E" />
            <polygon points="-8,22 8,22 0,-24" fill="#FDA4AF" />
            <circle cx="0" cy="-25" r="6" fill="#FDE047" />
            {/* Stars on hat */}
            <circle cx="-3" cy="8" r="2" fill="#FEF08A" />
            <circle cx="4" cy="0" r="2.2" fill="#FEF08A" />
          </g>

          {/* Body */}
          <ellipse cx="100" cy="135" rx="55" ry="46" fill="#B27A4B" />
          {/* Tummy patch */}
          <ellipse cx="100" cy="138" rx="36" ry="30" fill="#FDF2E9" />
          {/* Tummy heart badge */}
          <path
            d="M100 134 C97 127 88 127 88 135 C88 143 100 149 100 149 C100 149 112 143 112 135 C112 127 103 127 100 134 Z"
            fill="#FB7185"
            opacity="0.85"
          />

          {/* Head */}
          <circle cx="100" cy="90" r="54" fill="#C58A55" />

          {/* Cheeks - Blushing */}
          <ellipse
            cx="66"
            cy="104"
            rx="11"
            ry="7"
            fill="#FB7185"
            opacity={isGuarding || isSurprised ? '0.9' : '0.55'}
          />
          <ellipse
            cx="134"
            cy="104"
            rx="11"
            ry="7"
            fill="#FB7185"
            opacity={isGuarding || isSurprised ? '0.9' : '0.55'}
          />

          {/* Snout */}
          <ellipse cx="100" cy="103" rx="22" ry="17" fill="#FDF2E9" />
          {/* Cute Nose */}
          <path
            d="M93 96 Q100 93 107 96 Q103 104 100 105 Q97 104 93 96 Z"
            fill="#4A2E18"
          />
          {/* Cute Smile / Giggling mouth */}
          {isGiggling ? (
            <path
              d="M94 107 Q100 115 106 107"
              stroke="#4A2E18"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="#F43F5E"
            />
          ) : isSurprised ? (
            <ellipse cx="100" cy="109" rx="4.5" ry="6" fill="#4A2E18" />
          ) : (
            <path
              d="M94 107 Q100 114 106 107"
              stroke="#4A2E18"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Eyes */}
          {isGiggling ? (
            // Happy crescent eyes
            <>
              <path
                d="M75 84 Q81 77 87 84"
                stroke="#3E2716"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M113 84 Q119 77 125 84"
                stroke="#3E2716"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            // Big sparkling round eyes with cursor tracking
            <>
              {/* Left Eye */}
              <circle cx="79" cy="83" r={isSurprised ? '8.5' : '7.5'} fill="#2C1A0C" />
              <circle
                cx={79 + eyeOffset.x + 1.5}
                cy={83 + eyeOffset.y - 1.5}
                r="3"
                fill="#FFFFFF"
              />
              <circle
                cx={79 + eyeOffset.x - 1.5}
                cy={83 + eyeOffset.y + 1.5}
                r="1.3"
                fill="#FFFFFF"
              />

              {/* Right Eye */}
              <circle cx="121" cy="83" r={isSurprised ? '8.5' : '7.5'} fill="#2C1A0C" />
              <circle
                cx={121 + eyeOffset.x + 1.5}
                cy={83 + eyeOffset.y - 1.5}
                r="3"
                fill="#FFFFFF"
              />
              <circle
                cx={121 + eyeOffset.x - 1.5}
                cy={83 + eyeOffset.y + 1.5}
                r="1.3"
                fill="#FFFFFF"
              />
            </>
          )}

          {/* Eyebrows (expressive!) */}
          {isSurprised ? (
            <>
              <path
                d="M73 71 Q79 66 85 71"
                stroke="#5C3B1E"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M115 71 Q121 66 127 71"
                stroke="#5C3B1E"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              <path
                d="M74 74 Q80 72 85 75"
                stroke="#5C3B1E"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M115 75 Q120 72 126 74"
                stroke="#5C3B1E"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {/* Paws */}
          {isGuarding ? (
            // Guarding: Raised paws waving / blocking
            <>
              <ellipse
                cx="60"
                cy="105"
                rx="16"
                ry="14"
                fill="#B27A4B"
                transform="rotate(-20 60 105)"
              />
              <circle cx="60" cy="105" r="7" fill="#FBCFE8" />

              <ellipse
                cx="140"
                cy="105"
                rx="16"
                ry="14"
                fill="#B27A4B"
                transform="rotate(20 140 105)"
              />
              <circle cx="140" cy="105" r="7" fill="#FBCFE8" />
            </>
          ) : (
            // Cozy relaxed paws hugging knees
            <>
              <ellipse
                cx="52"
                cy="138"
                rx="15"
                ry="13"
                fill="#B27A4B"
              />
              <circle cx="52" cy="138" r="6" fill="#FBCFE8" />

              <ellipse
                cx="148"
                cy="138"
                rx="15"
                ry="13"
                fill="#B27A4B"
              />
              <circle cx="148" cy="138" r="6" fill="#FBCFE8" />
            </>
          )}

          {/* Feet */}
          <ellipse cx="68" cy="172" rx="18" ry="12" fill="#9B663B" />
          <ellipse cx="68" cy="172" rx="10" ry="6.5" fill="#FDE2E4" />

          <ellipse cx="132" cy="172" rx="18" ry="12" fill="#9B663B" />
          <ellipse cx="132" cy="172" rx="10" ry="6.5" fill="#FDE2E4" />
        </svg>
      </div>
    </div>
  );
};
