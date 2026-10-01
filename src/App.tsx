/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TeddyBear } from './components/TeddyBear';
import { RunawayButton } from './components/RunawayButton';
import { PetalsCanvas } from './components/PetalsCanvas';
import { HeartfeltVideoModal } from './components/HeartfeltVideoModal';
import { ScrapbookPage } from './components/ScrapbookPage';
import { LofiPlayer } from './components/LofiPlayer';
import { triggerBirthdayConfetti } from './utils/confetti';
import { lofiAudio } from './utils/audio';
import { TeddyEmotion, ActiveStep } from './types';
import { Sparkles, Heart, Gift, Cake } from 'lucide-react';

export default function App() {
  const [activeStep, setActiveStep] = useState<ActiveStep>('greeting');
  const [birthdayGirlName] = useState('Sayani');

  // Mouse tracking for Teddy & animations
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [teddyEmotion, setTeddyEmotion] = useState<TeddyEmotion>('idle');
  const [teddySpeech, setTeddySpeech] = useState<string>(
    "Hi Sayani! 💖 Welcome to your 20th birthday secret surprise!"
  );
  const [isDodgeActive, setIsDodgeActive] = useState(false);
  const [noAttemptsCount, setNoAttemptsCount] = useState(0);

  const videoSectionRef = useRef<HTMLDivElement | null>(null);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // When "No, thanks" button dodges
  const handleNoThanksDodge = (count: number) => {
    setNoAttemptsCount(count);
    setIsDodgeActive(true);
    setTeddyEmotion('guarding');

    const playfulLines = [
      "Wait Sayani! Don't click that! 😱🧸",
      "Phew! Dodged it! Teddy won't let you say no! 💨",
      "Someone out here prepared something special for you! 🌸",
      "Teddy says: Sayani has to see the surprise! ✨",
      "Click the sparkly pink one instead! 👉🎂",
      "Hehe, you can't catch it! 🏃‍♀️💨",
      "No saying no on your birthday, Sayani! 🥰",
      "Teddy is guarding your birthday happiness! 🛡️✨",
      "Nice try! But you deserve all the celebration today! 🎉",
    ];

    const chosen = playfulLines[Math.floor(Math.random() * playfulLines.length)];
    setTeddySpeech(chosen);

    setTimeout(() => {
      setIsDodgeActive(false);
      setTeddyEmotion('idle');
    }, 1800);
  };

  // When birthday girl clicks "Thank you 💖"
  const handleThankYouClick = () => {
    // 1. Full screen confetti explosion
    triggerBirthdayConfetti();

    // 2. Play celebratory fanfare
    lofiAudio.playCelebrationChime();

    // 3. Start Dear Comrade BGM right from the start
    lofiAudio.restartFromBeginning();

    // 4. Teddy celebrates
    setTeddyEmotion('celebrating');
    setTeddySpeech("Yaaay! Happy Birthday Sayani! 🎉 A special message is waiting below! 🎬🌸");

    // 5. Reveal heartfelt video message
    setActiveStep('video_reveal');

    // Smooth scroll to video section
    setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // When "Claim your gift 🎁" is clicked
  const handleClaimGift = () => {
    triggerBirthdayConfetti();
    lofiAudio.playCelebrationChime();
    setActiveStep('scrapbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-body text-stone-800 overflow-x-hidden selection:bg-rose-200">
      {/* Falling Flower Petals Animation - active throughout scrapbook & whole site */}
      <PetalsCanvas density={activeStep === 'scrapbook' ? 45 : 30} />

      {/* Floating Lo-Fi Audio Player */}
      <LofiPlayer />

      {/* Main Switcher */}
      {activeStep === 'scrapbook' ? (
        <ScrapbookPage
          birthdayGirlName={birthdayGirlName}
          onBackToGreeting={() => {
            setActiveStep('greeting');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-rose-100/50 py-8 px-4">

          {/* Section 1: Initial Birthday Greeting */}
          <main className="w-full max-w-3xl mx-auto my-auto flex flex-col items-center text-center py-10 z-10">
            {/* Whimsical Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm animate-float">
              <Cake className="w-3.5 h-3.5 text-rose-500" />
              <span>Happy 20th Birthday, {birthdayGirlName}!</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Main Greeting Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] mb-4">
              To Sayani, Celebrating
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600">
                Your 20th Birthday 🌸
              </span>
            </h1>

            {/* Heartfelt subtext */}
            <p className="text-base sm:text-lg text-stone-600 max-w-lg mb-8 leading-relaxed font-light">
              Stepping into your 20s! You might not know me well, but your kindness, grace, and radiant smile never go unnoticed.
              Someone created this little corner of the internet just to celebrate your milestone year!
            </p>

            {/* Reactive Animated Teddy Bear */}
            <div className="mb-6 relative">
              <TeddyBear
                emotion={teddyEmotion}
                speechText={teddySpeech}
                isRunawayActive={isDodgeActive}
                mousePos={mousePos}
              />
            </div>

            {/* Escape Counter Indicator if user tried clicking "No, thanks" */}
            {noAttemptsCount > 0 && (
              <div className="mb-4 text-xs font-mono text-rose-600 bg-rose-100/80 px-3 py-1 rounded-full animate-bounce">
                💨 "No" clicked: {noAttemptsCount} times — Teddy won't let you escape!
              </div>
            )}

            {/* Two Action Buttons: Thank You and Runaway "No, thanks" */}
            <div className="flex flex-wrap items-center justify-center gap-4 relative min-h-[64px] w-full max-w-md mt-2">
              {/* Primary Thank You Button */}
              <button
                onClick={handleThankYouClick}
                className="px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 group animate-glow"
              >
                <span>Thank you! 💖</span>
                <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              </button>

              {/* Runaway No Thanks Button */}
              <RunawayButton
                label="No, thanks 🙈"
                onDodge={handleNoThanksDodge}
              />
            </div>

            <p className="text-xs text-stone-400 mt-4">
              Tip: Try catching the "No, thanks" button if you dare! 😉
            </p>
          </main>

          {/* Section 2: Revealed Video Message after "Thank you" */}
          {activeStep === 'video_reveal' && (
            <div ref={videoSectionRef} className="w-full pt-12 pb-16 z-10 border-t border-rose-200/60 mt-12">
              <HeartfeltVideoModal
                birthdayGirlName={birthdayGirlName}
                onClaimGift={handleClaimGift}
                onNoThanksDodge={handleNoThanksDodge}
              />
            </div>
          )}

          {/* Gentle Whimsical Footer */}
          <footer className="w-full text-center text-xs text-stone-400 py-4 z-10">
            <span>Made with endless love & warm birthday wishes · {birthdayGirlName}</span>
          </footer>
        </div>
      )}
    </div>
  );
}
