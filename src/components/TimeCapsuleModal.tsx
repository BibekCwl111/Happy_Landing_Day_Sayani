import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Hourglass, ArrowLeft } from 'lucide-react';
import { lofiAudio } from '../utils/audio';

interface TimeCapsuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  birthdayGirlName?: string;
}

export const TimeCapsuleModal: React.FC<TimeCapsuleModalProps> = ({
  isOpen,
  onClose,
  birthdayGirlName = 'Sayani',
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

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

  const handleUnlock = () => {
    setIsUnlocked(true);
    lofiAudio.playCelebrationChime();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-gradient-to-br from-[#faf6ed] via-[#f7f0e1] to-[#eedfc6] rounded-3xl border-2 border-amber-300 shadow-2xl p-5 sm:p-8 my-8 text-stone-900 cursor-default max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header Row with Clear Exit Button */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-300/60">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-900 font-bold flex items-center gap-1.5">
            <Hourglass className="w-3.5 h-3.5 text-amber-700" />
            <span>Milestone Capsule • 2026 ➔ 2031</span>
          </span>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-stone-700 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            aria-label="Close"
          >
            <span>Back to Scrapbook</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header Ribbon */}
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            A Letter to 25-Year-Old {birthdayGirlName} ⏳
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            Written on your 20th milestone birthday, sealed with warm hope for who you will become five years from now.
          </p>
        </div>

        {!isUnlocked ? (
          /* Sealed Capsule Teaser */
          <div className="p-8 sm:p-10 rounded-2xl bg-amber-50/70 border border-amber-200/90 shadow-inner text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-800 shadow-sm mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Sealed with Gold & Memory
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mt-2 leading-relaxed">
              This capsule holds a visionary letter addressing the woman you will be at 25—your career, your peace, your gentle heart, and the laughter you’ll still carry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={handleUnlock}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Break Seal & Read Capsule 📜</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Keep Sealed For Later
              </button>
            </div>
          </div>
        ) : (
          /* Unsealed Emotional Letter */
          <div className="animate-fadeIn">
            <div className="p-6 sm:p-8 bg-amber-50/80 rounded-2xl border border-amber-300 shadow-inner relative">
              {/* Wax Seal Stamp Graphic */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-700/90 text-amber-100 flex items-center justify-center text-xs font-serif font-bold shadow-md border-2 border-amber-200">
                20 ➔ 25
              </div>

              <div className="mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-800">
                  October 2026 • Kolkata
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  Dearest 25-Year-Old Sayani,
                </h3>
              </div>

              <div className="space-y-4 font-handwriting text-xl sm:text-2xl text-stone-800 leading-relaxed">
                <p>
                  Right now, as these words are etched, you are turning twenty.
                  You are at the doorstep of your adult life—wondering what the next few years hold,
                  perhaps feeling a mix of excitement, nervousness, and wonder.
                </p>
                <p>
                  I hope that wherever you are reading this at 25, you are deeply proud of yourself.
                  I hope you haven’t let the noise of the world rush your pace or dim the gentle light that makes you so uniquely Sayani.
                </p>
                <p>
                  I hope your coffee still tastes sweet in the mornings, that you have visited places that took your breath away,
                  that your dreams are blooming into reality, and that you still smile with your whole face whenever something genuinely delights you.
                </p>
                <p>
                  Remember: The 20-year-old girl who celebrated today was full of promise, bravery, and heart.
                  Treat her memories kindly. You’re doing wonderfully.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-2">
                <span className="font-mono">
                  🔒 Milestone Capsule • Kept forever in your digital vault
                </span>
                <span className="font-script text-xl text-amber-900 font-bold">
                  With timeless admiration 🌸
                </span>
              </div>
            </div>

            {/* Bottom Return Button */}
            <div className="mt-5 text-center pt-3 border-t border-amber-300/60">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Birthday Scrapbook</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
