import React, { useState } from 'react';
import { Eye, Heart, Lock, Key } from 'lucide-react';
import { lofiAudio } from '../utils/audio';

interface MysteryCluesSectionProps {
  birthdayGirlName?: string;
  onClueRevealed?: () => void;
}

interface Clue {
  id: number;
  title: string;
  hint: string;
  revealed: boolean;
  icon: string;
}

export const MysteryCluesSection: React.FC<MysteryCluesSectionProps> = ({
  birthdayGirlName = "Sayani",
}) => {
  const [clues, setClues] = useState<Clue[]>([
    {
      id: 1,
      title: "Clue #1: The First Letter",
      hint: "My name starts with the letter 'B'...",
      revealed: false,
      icon: "🔤",
    },
    {
      id: 2,
      title: "Clue #2: Where You Might Know Me",
      hint: "We have crossed paths more than once. Whenever you walk by, you bring this quiet, effortless grace with you.",
      revealed: false,
      icon: "🚶‍♂️",
    },
    {
      id: 3,
      title: "Clue #3: A Little Observation",
      hint: "You have that sweet, radiant smile that lights up the whole room, especially when you think no one is watching.",
      revealed: false,
      icon: "✨",
    },
    {
      id: 4,
      title: "Clue #4: The Real Reason",
      hint: "I was honestly too shy to walk up and say all this to your face, so I spent hours handcrafting this website just to make you smile on your special day.",
      revealed: false,
      icon: "💌",
    },
  ]);

  const [curiosityLevel, setCuriosityLevel] = useState<number>(3); // 1 to 3

  const toggleClue = (id: number) => {
    setClues((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.revealed;
          if (nextState) {
            lofiAudio.playCelebrationChime();
          }
          return { ...c, revealed: nextState };
        }
        return c;
      })
    );
  };

  const revealedCount = clues.filter((c) => c.revealed).length;

  return (
    <section className="w-full max-w-4xl mx-auto my-12 px-4 select-none">
      <div className="bg-gradient-to-br from-amber-50/90 via-rose-50/80 to-purple-50/90 rounded-3xl p-6 md:p-10 border-2 border-rose-200/90 shadow-xl shadow-rose-900/5 relative overflow-hidden">
        {/* Top Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs bg-rose-100 text-rose-800 font-semibold px-3 py-1 rounded-full border border-rose-200 shadow-sm flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-rose-500" />
            <span>Mystery Admirer</span>
          </span>
          <span className="text-xs text-stone-500 font-mono">
            {revealedCount} / 4 Clues Unlocked
          </span>
        </div>

        {/* The Emotional Message Card */}
        <div className="mb-8 p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-rose-200 shadow-md relative overflow-hidden">
          <div className="washi-tape -top-2 left-8 w-28 bg-rose-200 rotate-[-2deg]" />
          
          <div className="flex items-center gap-2 text-rose-600 mb-3">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="font-semibold text-xs tracking-wider uppercase">
              A Quiet Truth From My Heart
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-3 leading-snug">
            "Honestly... I thought you might just ignore my message."
          </h3>

          <div className="space-y-3 font-handwriting text-2xl text-stone-800 leading-relaxed">
            <p>
              When I sent you this link on Instagram, my heart was beating so fast.
              I thought, <em>"You probably get so many messages... why would you open something from someone you barely know? You'll probably just leave it on seen, or ignore it completely."</em>
            </p>
            <p>
              But you didn't ignore it. You actually opened this link, and you are here right now, reading these words.
              You have no idea how much that simple kindness means to me.
            </p>
            <p>
              I didn't make this expecting anything from you. I just wanted someone as radiant, gentle, and lovely as you to know that on your birthday, you are seen, appreciated, and celebrated.
              If this little page brought even a quiet smile to your lips today, every single minute I spent building this was worth it.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-rose-100 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-stone-500 font-serif italic">
              Thank you for taking the time to see this, Sayani. 🌸
            </span>
            <span className="font-handwriting text-xl text-rose-600">
              — From a quiet admirer ✨
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-3 py-1 rounded-full mb-2">
            <Key className="w-3.5 h-3.5" />
            <span>Solve The Mystery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Curious Who Created This For You? 🕵️‍♀️
          </h2>
          <p className="text-stone-600 text-sm mt-2 font-light leading-relaxed">
            I didn't sign my full name because I didn't want to make things awkward.
            But if you're curious... tap the cards below to reveal 4 subtle clues!
          </p>
        </div>

        {/* 4 Interactive Clue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {clues.map((c) => (
            <div
              key={c.id}
              onClick={() => toggleClue(c.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                c.revealed
                  ? 'bg-white border-rose-300 shadow-md ring-2 ring-rose-200/50'
                  : 'bg-white/60 hover:bg-white/90 border-stone-200 hover:border-rose-300 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="font-serif font-bold text-stone-900 text-sm">
                    {c.title}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                    c.revealed
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-stone-100 text-stone-500 group-hover:bg-rose-50 group-hover:text-rose-600'
                  }`}
                >
                  {c.revealed ? 'Unlocked 🔓' : 'Tap to Reveal 🔒'}
                </span>
              </div>

              {c.revealed ? (
                <p className="font-handwriting text-xl text-rose-800 leading-snug animate-in fade-in zoom-in-95 duration-200 pt-1">
                  "{c.hint}"
                </p>
              ) : (
                <div className="py-3 flex items-center justify-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                  <span className="text-xs text-stone-400 font-medium flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to scratch and uncover clue</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress tracker */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-rose-200 px-4 py-1.5 rounded-full text-xs font-semibold text-stone-700 shadow-sm">
            <span>Clues Unlocked: {revealedCount} / 4</span>
            <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300"
                style={{ width: `${(revealedCount / 4) * 100}%` }}
              />
            </div>
            {revealedCount === 4 && <span className="text-rose-600 font-bold">🎉 All unlocked!</span>}
          </div>
        </div>

        {/* Curiosity Level Selector */}
        <div className="bg-white/80 rounded-2xl p-5 border border-rose-100 shadow-sm max-w-lg mx-auto text-center">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            How curious are you right now, {birthdayGirlName}?
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => {
                setCuriosityLevel(1);
                lofiAudio.playWhoosh();
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                curiosityLevel === 1
                  ? 'bg-rose-500 text-white font-semibold shadow border-rose-500'
                  : 'bg-white hover:bg-rose-50 text-stone-700 border-stone-200'
              }`}
            >
              <span>A little bit 👀</span>
            </button>
            <button
              onClick={() => {
                setCuriosityLevel(2);
                lofiAudio.playCelebrationChime();
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                curiosityLevel === 2
                  ? 'bg-rose-500 text-white font-semibold shadow border-rose-500'
                  : 'bg-white hover:bg-rose-50 text-stone-700 border-stone-200'
              }`}
            >
              <span>Very curious! 🤔</span>
            </button>
            <button
              onClick={() => {
                setCuriosityLevel(3);
                lofiAudio.playCelebrationChime();
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                curiosityLevel === 3
                  ? 'bg-rose-500 text-white font-semibold shadow border-rose-500 scale-105 ring-2 ring-rose-200'
                  : 'bg-white hover:bg-rose-50 text-stone-700 border-stone-200'
              }`}
            >
              <span>DYING TO KNOW! 🙈🔥</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-rose-700 font-medium">
            {curiosityLevel === 1 && "Hehe, take your time! The clues are waiting for you. 😊"}
            {curiosityLevel === 2 && "Getting warmer! Do the clues remind you of anyone? 🕵️‍♂️"}
            {curiosityLevel === 3 && "Teddy says: 'The clues are all yours! Maybe you can guess who I am... 😉🌸'"}
          </p>
        </div>

        {/* Subtle Sign-off */}
        <div className="text-center mt-6">
          <p className="text-xs text-stone-500 font-serif italic">
            "Some feelings are meant to be whispered quietly... Happy Birthday, Sayani." 🌸✨
          </p>
        </div>
      </div>
    </section>
  );
};
