import React, { useState, useEffect } from 'react';
import { X, Heart, Sparkles, ChevronLeft, ArrowLeft } from 'lucide-react';
import { lofiAudio } from '../utils/audio';

interface OpenWhenModalProps {
  isOpen: boolean;
  onClose: () => void;
  birthdayGirlName?: string;
}

interface EnvelopeData {
  id: string;
  title: string;
  sub: string;
  themeColor: string;
  sealColor: string;
  icon: string;
  letterTitle: string;
  paragraphs: string[];
  signOff: string;
}

const ENVELOPES: EnvelopeData[] = [
  {
    id: 'sad',
    title: 'Open when you feel down or tired',
    sub: 'For quiet days when the world feels too heavy',
    themeColor: 'from-rose-100 to-pink-100 border-rose-300',
    sealColor: 'bg-rose-500',
    icon: '🌸',
    letterTitle: 'Dear Sayani, breathe gently...',
    paragraphs: [
      'If today was difficult, I want you to remember that it is completely okay to feel exhausted. You don’t always have to be strong or keep going at full speed.',
      'Some days are just meant for soft tea, wrapping yourself in a warm blanket, and letting your mind rest without guilt.',
      'You have gotten through every single hard day before this, and you will navigate this one too. Sleep well tonight knowing that you are deeply appreciated and never alone.',
    ],
    signOff: 'Take all the time you need. Tomorrow is a gentle new beginning.',
  },
  {
    id: 'doubt',
    title: 'Open when you doubt yourself',
    sub: 'A reminder of the strength and talent inside you',
    themeColor: 'from-amber-100 to-yellow-100 border-amber-300',
    sealColor: 'bg-amber-600',
    icon: '✨',
    letterTitle: 'To the girl with boundless potential,',
    paragraphs: [
      'Whenever self-doubt whispers in your ear, remember how much grace, intellect, and quiet courage you hold. The world can be noisy, but your worth is never defined by a momentary setback.',
      'You have an innate ability to make situations brighter simply by being yourself. The dreams you carry aren’t accidental; they were given to someone capable of reaching them.',
      'Trust your instincts. Stand tall in your twenties. You are far more remarkable than you ever give yourself credit for.',
    ],
    signOff: 'Believe in yourself the way others effortlessly believe in you.',
  },
  {
    id: 'smile',
    title: 'Open when you need a genuine smile',
    sub: 'A little pocket of sunshine just for you',
    themeColor: 'from-emerald-100 to-teal-100 border-emerald-300',
    sealColor: 'bg-emerald-600',
    icon: '😊',
    letterTitle: 'Hey Sayani, smile a little!',
    paragraphs: [
      'Do you know that your genuine smile is one of the warmest things in the world? It has that rare kind of radiance that lights up the whole room effortlessly.',
      'Life doesn’t always take itself too seriously, and neither should you today! Go eat your favorite snack, listen to that song you love on repeat, and do one silly thing that makes you chuckle.',
      'Sending you a giant warm hug across the screen. You deserve nothing less than genuine joy.',
    ],
    signOff: 'Keep smiling, because that smile looks stunning on you.',
  },
  {
    id: 'birthday_night',
    title: 'Open on your birthday night',
    sub: 'Under the starlight, marking your milestone',
    themeColor: 'from-indigo-100 via-purple-100 to-pink-100 border-purple-300',
    sealColor: 'bg-indigo-600',
    icon: '🌙',
    letterTitle: 'As the stars shine on your 20th birthday...',
    paragraphs: [
      'As this milestone day comes to a quiet close, look up at the night sky. Twenty years ago, the world received someone truly special—someone who brings warmth, kindness, and light to everyone around her.',
      'Entering your twenties is a magical threshold. May this upcoming year unfold with unforgettable adventures, sincere friendships, laughter that makes your stomach hurt, and quiet peace in your heart.',
      'May the universe conspire to give you everything you have ever silently wished for.',
    ],
    signOff: 'Happy 20th Birthday, Sayani. Here’s to your beautiful journey ahead.',
  },
];

export const OpenWhenModal: React.FC<OpenWhenModalProps> = ({
  isOpen,
  onClose,
  birthdayGirlName = 'Sayani',
}) => {
  const [selectedEnvelope, setSelectedEnvelope] = useState<EnvelopeData | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleFullClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFullClose = () => {
    setSelectedEnvelope(null);
    onClose();
  };

  const handleOpenEnvelope = (env: EnvelopeData) => {
    lofiAudio.playCelebrationChime();
    setSelectedEnvelope(env);
  };

  return (
    <div
      onClick={handleFullClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-fadeIn overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-3xl border border-stone-300 shadow-2xl p-5 sm:p-8 my-8 cursor-default max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header Row with Clear Back & Close Buttons */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/80">
          {selectedEnvelope ? (
            <button
              onClick={() => setSelectedEnvelope(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-stone-600" />
              <span>← Back to all envelopes</span>
            </button>
          ) : (
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
              💌 4 Keepsake Envelopes
            </span>
          )}

          {/* Close Modal Button */}
          <button
            onClick={handleFullClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-rose-100 hover:text-rose-700 text-stone-600 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            aria-label="Close"
          >
            <span>Back to Scrapbook</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {!selectedEnvelope ? (
          /* Envelopes Grid View */
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Letters for Every Season
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
                &ldquo;Open When...&rdquo; Envelopes 💌
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                Four dedicated letters crafted for {birthdayGirlName}. Choose whichever envelope fits your moment right now.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ENVELOPES.map((env) => (
                <div
                  key={env.id}
                  onClick={() => handleOpenEnvelope(env)}
                  className={`group relative p-5 rounded-2xl bg-gradient-to-br ${env.themeColor} border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{env.icon}</span>
                      <div
                        className={`w-7 h-7 rounded-full ${env.sealColor} text-white flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-110 transition-transform`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-rose-900 transition-colors">
                      {env.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {env.sub}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-300/40 flex items-center justify-between text-xs font-medium text-stone-700">
                    <span className="font-semibold text-rose-700">Click to unseal & read 📜</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Clear Exit Button */}
            <div className="mt-6 text-center pt-4 border-t border-stone-200">
              <button
                onClick={handleFullClose}
                className="px-6 py-2 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-800 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Birthday Scrapbook</span>
              </button>
            </div>
          </div>
        ) : (
          /* Opened Letter View */
          <div className="animate-fadeIn">
            <div className="p-5 sm:p-7 bg-amber-50/70 rounded-2xl border border-amber-200/90 shadow-inner relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{selectedEnvelope.icon}</span>
                <span className="text-xs uppercase font-mono tracking-widest text-amber-900 font-bold">
                  {selectedEnvelope.title}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-4">
                {selectedEnvelope.letterTitle}
              </h3>

              <div className="space-y-3.5 font-handwriting text-xl sm:text-2xl text-stone-800 leading-relaxed">
                {selectedEnvelope.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60 text-right">
                <p className="font-script text-2xl text-rose-800 font-semibold">
                  {selectedEnvelope.signOff}
                </p>
                <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest mt-1 block">
                  Always wishing the best for you ✨
                </span>
              </div>
            </div>

            {/* Dual Exit/Back Actions at bottom of opened letter */}
            <div className="mt-5 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedEnvelope(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← Read Another Envelope</span>
              </button>

              <button
                onClick={handleFullClose}
                className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Done & Return to Scrapbook</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
