import React, { useState, useEffect } from 'react';
import { X, Sparkles, RotateCcw, ArrowLeft } from 'lucide-react';
import { lofiAudio } from '../utils/audio';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface FlowerAffirmationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  birthdayGirlName?: string;
}

interface Petal {
  id: number;
  label: string;
  compliment: string;
  color: string;
  rotation: number;
}

const PETALS: Petal[] = [
  {
    id: 1,
    label: 'Her Gentle Grace',
    compliment: 'You carry an effortless, serene elegance in the quietest moments that makes everyone feel at ease.',
    color: 'bg-rose-200 hover:bg-rose-300 text-rose-900 border-rose-300',
    rotation: 0,
  },
  {
    id: 2,
    label: 'Her Infectious Smile',
    compliment: 'Your genuine smile has an undeniable warmth; it can effortlessly melt away anyone’s gloomiest day.',
    color: 'bg-pink-200 hover:bg-pink-300 text-pink-900 border-pink-300',
    rotation: 45,
  },
  {
    id: 3,
    label: 'Her Radiant Eyes',
    compliment: 'The sparkle of curiosity and kindness in your eyes reveals a sincere, thoughtful soul within.',
    color: 'bg-amber-200 hover:bg-amber-300 text-amber-900 border-amber-300',
    rotation: 90,
  },
  {
    id: 4,
    label: 'Her Inner Resilience',
    compliment: 'You handle life’s challenges with a quiet strength that commands respect and quiet admiration.',
    color: 'bg-teal-200 hover:bg-teal-300 text-teal-900 border-teal-300',
    rotation: 135,
  },
  {
    id: 5,
    label: 'Her Playful Spark',
    compliment: 'Underneath your calm composure lies a charming, sweet spark that is an absolute joy to witness.',
    color: 'bg-purple-200 hover:bg-purple-300 text-purple-900 border-purple-300',
    rotation: 180,
  },
  {
    id: 6,
    label: 'Her Pure Kindness',
    compliment: 'You treat people with an innate tenderness that is increasingly rare and infinitely precious in this world.',
    color: 'bg-emerald-200 hover:bg-emerald-300 text-emerald-900 border-emerald-300',
    rotation: 225,
  },
  {
    id: 7,
    label: 'Her Creative Soul',
    compliment: 'Your aesthetic taste, imagination, and perspective bring color and artistry to ordinary moments.',
    color: 'bg-orange-200 hover:bg-orange-300 text-orange-900 border-orange-300',
    rotation: 270,
  },
  {
    id: 8,
    label: 'Her Boundless Future',
    compliment: 'At 20, you are standing before a world brimming with open doors, and you will thrive in all of them.',
    color: 'bg-sky-200 hover:bg-sky-300 text-sky-900 border-sky-300',
    rotation: 315,
  },
];

export const FlowerAffirmationsModal: React.FC<FlowerAffirmationsModalProps> = ({
  isOpen,
  onClose,
  birthdayGirlName = 'Sayani',
}) => {
  const [pluckedIds, setPluckedIds] = useState<number[]>([]);
  const [activePetal, setActivePetal] = useState<Petal | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePluckPetal = (petal: Petal) => {
    if (!pluckedIds.includes(petal.id)) {
      setPluckedIds([...pluckedIds, petal.id]);
    }
    setActivePetal(petal);
    lofiAudio.playCelebrationChime();

    if (pluckedIds.length + 1 === PETALS.length) {
      triggerBirthdayConfetti();
    }
  };

  const handleResetFlower = () => {
    setPluckedIds([]);
    setActivePetal(null);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gradient-to-b from-rose-50/95 via-amber-50/90 to-pink-50/95 rounded-3xl border border-rose-200 shadow-2xl p-5 sm:p-8 text-center my-8 cursor-default max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header Row with Clear Back & Close Buttons */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200/80">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Bloom of Affirmation
          </span>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            aria-label="Close"
          >
            <span>Back to Scrapbook</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Pluck a Petal for {birthdayGirlName} 🌸
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1 max-w-md mx-auto">
            Each petal holds a genuine compliment and reminder of who you are. Tap any petal to bloom a thought!
          </p>
        </div>

        {/* Circular Flower Arrangement */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-5 flex items-center justify-center select-none">
          {/* Flower Center Disc */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-amber-500/80 shadow-lg z-20 flex flex-col items-center justify-center text-center p-1">
            <span className="text-xl">🌼</span>
            <span className="text-[10px] font-bold text-amber-950 uppercase tracking-tighter">
              {pluckedIds.length}/{PETALS.length} Plucked
            </span>
          </div>

          {/* Petals Radiating Out */}
          {PETALS.map((petal) => {
            const isPlucked = pluckedIds.includes(petal.id);
            const isSelected = activePetal?.id === petal.id;
            return (
              <button
                key={petal.id}
                onClick={() => handlePluckPetal(petal)}
                style={{
                  transform: `rotate(${petal.rotation}deg) translateY(-85px)`,
                }}
                className={`absolute w-14 h-22 sm:w-16 sm:h-24 rounded-full border shadow-sm transition-all duration-300 cursor-pointer ${
                  petal.color
                } ${
                  isPlucked
                    ? 'opacity-40 scale-90 blur-[0.5px]'
                    : 'hover:scale-110 active:scale-95'
                } ${isSelected ? 'ring-4 ring-rose-400 scale-110' : ''}`}
                title={`Pluck "${petal.label}"`}
              >
                <span
                  style={{ transform: `rotate(-${petal.rotation}deg)` }}
                  className="block text-[10px] sm:text-xs font-bold font-serif pt-3 px-1 text-center"
                >
                  {isPlucked ? '✨' : '🌸'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Revealed Affirmation Card */}
        {activePetal ? (
          <div className="p-4 sm:p-5 bg-white/90 rounded-2xl border border-rose-200/90 shadow-md animate-fadeIn text-left relative">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">🌸</span>
              <span className="font-serif font-bold text-rose-900 text-sm sm:text-base">
                {activePetal.label}
              </span>
            </div>
            <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed">
              &ldquo;{activePetal.compliment}&rdquo;
            </p>
          </div>
        ) : (
          <div className="p-3 bg-white/60 rounded-2xl border border-stone-200/60 text-xs text-stone-500 font-mono">
            👆 Tap any of the colorful petals above to unseal its blessing!
          </div>
        )}

        {/* Actions Row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {pluckedIds.length > 0 && (
            <button
              onClick={handleResetFlower}
              className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bloom Flower Again</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Birthday Scrapbook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
