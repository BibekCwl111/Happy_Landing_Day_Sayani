import React, { useState, useEffect } from 'react';
import { X, Sparkles, Flame, RotateCcw, ArrowLeft } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { lofiAudio } from '../utils/audio';

interface BirthdayCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  birthdayGirlName?: string;
}

export const BirthdayCakeModal: React.FC<BirthdayCakeModalProps> = ({
  isOpen,
  onClose,
  birthdayGirlName = 'Sayani',
}) => {
  const totalCandles = 20;
  const [blownCandles, setBlownCandles] = useState<boolean[]>(
    new Array(totalCandles).fill(false)
  );
  const [wishRevealed, setWishRevealed] = useState(false);

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

  const handleBlowSingle = (index: number) => {
    if (blownCandles[index]) return;
    const next = [...blownCandles];
    next[index] = true;
    setBlownCandles(next);

    if (next.every(Boolean)) {
      triggerBlownCelebration();
    }
  };

  const handleBlowAll = () => {
    setBlownCandles(new Array(totalCandles).fill(true));
    triggerBlownCelebration();
  };

  const triggerBlownCelebration = () => {
    triggerBirthdayConfetti();
    lofiAudio.playCelebrationChime();
    setTimeout(() => {
      setWishRevealed(true);
    }, 500);
  };

  const handleRelight = () => {
    setBlownCandles(new Array(totalCandles).fill(false));
    setWishRevealed(false);
  };

  const activeCandlesCount = blownCandles.filter((b) => !b).length;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-gradient-to-b from-amber-50/95 via-rose-50/90 to-pink-50/95 rounded-3xl border border-rose-200/90 shadow-2xl p-5 sm:p-8 text-center my-8 cursor-default max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header Row with Clear Back & Close Buttons */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200/80">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            20th Birthday Ritual
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

        {/* Title */}
        <div className="mb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Make A Wish, {birthdayGirlName} 🎂
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1 max-w-md mx-auto">
            Close your eyes, think of something your heart truly desires for your 20s, and blow out the 20 glowing candles!
          </p>
        </div>

        {/* Interactive Cake Illustration */}
        <div className="relative mx-auto my-5 w-full max-w-sm flex flex-col items-center select-none">
          {/* Candles Row on Top Tier */}
          <div className="w-64 flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-1 z-10">
            {blownCandles.map((isBlown, idx) => (
              <div
                key={idx}
                onClick={() => handleBlowSingle(idx)}
                className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-125"
                title={isBlown ? 'Candle blown out' : `Tap to blow candle #${idx + 1}`}
              >
                {!isBlown ? (
                  <div className="relative w-3.5 h-6 flex items-center justify-center">
                    <span className="absolute w-2 h-4 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 animate-pulse blur-[1px] shadow-lg shadow-amber-400/50" />
                    <span className="w-1.5 h-3 rounded-full bg-yellow-100 animate-ping opacity-60" />
                  </div>
                ) : (
                  <div className="w-3.5 h-6 flex flex-col items-center justify-end">
                    <span className="w-0.5 h-3.5 bg-stone-300 rounded-full animate-bounce opacity-70" />
                  </div>
                )}
                <div
                  className={`w-1.5 h-7 rounded-sm shadow-sm transition-colors ${
                    idx % 3 === 0
                      ? 'bg-gradient-to-b from-rose-200 to-rose-400'
                      : idx % 3 === 1
                      ? 'bg-gradient-to-b from-amber-200 to-amber-400'
                      : 'bg-gradient-to-b from-pink-200 to-purple-300'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Birthday Cake Tiers */}
          <div className="w-full flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-52 h-14 bg-gradient-to-b from-rose-100 to-pink-200 rounded-t-2xl border-2 border-rose-300 relative shadow-inner flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 bg-white/90 rounded-full -mt-1 shadow-sm"
                  />
                ))}
              </div>
              <span className="font-serif text-xs font-bold text-rose-800 tracking-wider z-10 uppercase mt-2">
                🍓 Sweet 20 🍓
              </span>
            </div>

            {/* Bottom Tier */}
            <div className="w-68 h-20 bg-gradient-to-b from-amber-100 via-rose-100 to-pink-200 rounded-b-3xl border-2 border-rose-300 relative shadow-lg flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-3 bg-white/90 rounded-b-lg flex justify-around">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 bg-white rounded-full -mt-0.5 shadow-sm"
                  />
                ))}
              </div>
              <div className="text-center z-10 mt-1">
                <span className="font-serif text-sm sm:text-base font-extrabold text-stone-800 tracking-wide block">
                  Happy 20th Birthday
                </span>
                <span className="font-script text-lg sm:text-xl text-rose-700 font-semibold block -mt-1">
                  {birthdayGirlName}
                </span>
              </div>
            </div>

            {/* Cake Pedestal Stand */}
            <div className="w-72 h-4 bg-gradient-to-r from-stone-200 via-white to-stone-200 rounded-full shadow-md border border-stone-300 mt-1" />
            <div className="w-24 h-4 bg-gradient-to-b from-stone-300 to-stone-400 rounded-b-lg shadow-sm" />
          </div>
        </div>

        {/* Status & Action Buttons */}
        <div className="space-y-3">
          <p className="text-xs text-stone-500 font-mono">
            {activeCandlesCount > 0 ? (
              <span>
                🔥 <strong className="text-rose-600">{activeCandlesCount}</strong> of 20 candles still glowing.
              </span>
            ) : (
              <span className="text-emerald-700 font-bold">
                ✨ All 20 candles are blown! Your wish is on its way to the stars!
              </span>
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {activeCandlesCount > 0 ? (
              <button
                onClick={handleBlowAll}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>Blow Out All 20 Candles 💨</span>
              </button>
            ) : (
              <button
                onClick={handleRelight}
                className="px-5 py-2 rounded-2xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-medium shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Light Candles Again</span>
              </button>
            )}
          </div>
        </div>

        {/* Revealed Secret Birthday Wish Scroll */}
        {wishRevealed && (
          <div className="mt-5 p-5 sm:p-6 bg-gradient-to-br from-amber-50 via-white to-rose-50 border-2 border-amber-300/80 rounded-2xl shadow-xl animate-fadeIn relative text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-900 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
              ✨ Wish Granted ✨
            </div>
            <p className="font-serif text-stone-800 text-base sm:text-lg leading-relaxed pt-1">
              &ldquo;May your twentieth year be the beginning of your sweetest chapters.
              May you be blessed with quiet peace in busy days, courage in uncertainty,
              unshakable happiness, and a heart that always knows how extraordinary you are.&rdquo;
            </p>
            <span className="block mt-2 text-xs font-mono text-amber-800 uppercase tracking-widest">
              — Sent with pure warmth & admiration 🌸
            </span>
          </div>
        )}

        {/* Bottom Exit Button */}
        <div className="mt-6 pt-4 border-t border-rose-200/80 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Birthday Scrapbook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
