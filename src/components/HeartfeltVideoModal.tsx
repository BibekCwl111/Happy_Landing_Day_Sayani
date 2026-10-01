import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Heart, Film, Edit3, Check } from 'lucide-react';
import { lofiAudio } from '../utils/audio';
import { RunawayButton } from './RunawayButton';

interface HeartfeltVideoModalProps {
  birthdayGirlName?: string;
  onClaimGift: () => void;
  onNoThanksDodge?: (count: number) => void;
}

export const HeartfeltVideoModal: React.FC<HeartfeltVideoModalProps> = ({
  birthdayGirlName = "Sayani",
  onClaimGift,
  onNoThanksDodge,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [candleLit, setCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [videoMode, setVideoMode] = useState<'animated' | 'custom'>('animated');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [isEditingVideo, setIsEditingVideo] = useState(false);

  const duration = 28; // 28 seconds storyline
  const timerRef = useRef<number | null>(null);

  // Video storyline scenes tailored for Sayani with sincere admiration
  const scenes = [
    {
      time: 0,
      title: `Happy 20th Birthday, ${birthdayGirlName} 🌸`,
      subtitle: "Stepping into your twenties! A gentle wish from afar for someone who makes the world brighter just by being in it.",
      mood: "🌟",
    },
    {
      time: 5,
      title: "Your Grace & Radiant Smile ✨",
      subtitle: "You might not know me, but your genuine laughter and kind energy are impossible not to admire.",
      mood: "💖",
    },
    {
      time: 12,
      title: "Make A 20th Birthday Wish! 🎂",
      subtitle: "Click the glowing candle below — may every dream you hold in your heart come true.",
      mood: "🕯️",
    },
    {
      time: 19,
      title: "Welcome to Chapter 20 🌸",
      subtitle: "May your twenties be full of blooming success, gentle mornings, pure peace, and wonderful surprises.",
      mood: "💐",
    },
    {
      time: 24,
      title: "Quietly Rooting For You 🥂",
      subtitle: "Always wishing you the greatest success and joy. Now, tap below to open your gift...",
      mood: "🎁",
    },
  ];

  const currentScene = scenes.reduce((prev, curr) => {
    return currentTime >= curr.time ? curr : prev;
  }, scenes[0]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleCandleClick = () => {
    if (candleLit) {
      setCandleLit(false);
      setWishMade(true);
      lofiAudio.playCandleBlow();
      lofiAudio.playCelebrationChime();
    }
  };

  const handleReplay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setCandleLit(true);
    setWishMade(false);
  };

  const saveCustomVideo = () => {
    let url = customInput.trim();
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('watch?v=')[1]?.split('&')[0];
      url = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    } else if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      url = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
    }
    setCustomVideoUrl(url);
    setIsEditingVideo(false);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Header Banner */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight">
          A Message Created Just For You
        </h2>
        <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
          Turn your volume up, relax, and let the warmth wash over you.
        </p>
      </div>

      {/* Cinema Video Container */}
      <div className="w-full bg-stone-950 rounded-3xl p-3 md:p-5 shadow-2xl border-4 border-rose-200/60 relative overflow-hidden">
        {/* Cinema Film Aspect Ratio Box */}
        <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900 via-rose-950/40 to-stone-950 flex flex-col items-center justify-center p-6 text-white text-center select-none shadow-inner">
          {videoMode === 'custom' && customVideoUrl ? (
            <iframe
              src={customVideoUrl}
              className="w-full h-full rounded-xl border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Custom Birthday Video"
            />
          ) : (
            <>
              {/* Starry Night particles background */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent" />

              {/* Animated Floating Bokeh circles */}
              <div className="absolute top-10 left-12 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-8 right-12 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl animate-pulse" />

              {/* Dynamic Video Scene Content */}
              <div className="z-10 flex flex-col items-center max-w-lg transition-all duration-700">
                {/* Scene Emoji or Icon */}
                <div className="text-5xl md:text-6xl mb-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  {currentScene.mood}
                </div>

                {/* Animated Birthday Cake with Interactive Candle */}
                {currentTime >= 10 && currentTime <= 18 && (
                  <div className="mb-4 flex flex-col items-center">
                    <div
                      onClick={handleCandleClick}
                      className="cursor-pointer group relative flex flex-col items-center p-2 rounded-xl hover:bg-white/5 transition-colors"
                      title="Click to blow out the candle and make a wish!"
                    >
                      {/* Candle Flame */}
                      {candleLit ? (
                        <div className="relative mb-1">
                          <div className="w-3.5 h-6 bg-amber-300 rounded-full blur-[1px] animate-pulse shadow-[0_0_15px_#f59e0b]" />
                          <div className="absolute inset-0 w-2 h-4 m-auto bg-amber-100 rounded-full" />
                        </div>
                      ) : (
                        <div className="text-xs text-amber-200/80 mb-1 flex items-center gap-1">
                          <span>💨 Wish granted! ✨</span>
                        </div>
                      )}

                      {/* Candle Stick */}
                      <div className="w-2.5 h-7 bg-rose-300 rounded-t-sm border border-rose-400/60" />

                      {/* Cake base */}
                      <div className="w-24 h-10 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 rounded-md shadow-md border-t-2 border-white/50 flex items-center justify-center">
                        <span className="text-xs text-rose-800 font-bold">🍓 CAKE 🎂</span>
                      </div>
                    </div>

                    <p className="text-xs text-amber-200/90 font-medium">
                      {candleLit ? "👉 Click the candle to blow it out!" : "Your wish is floating to the stars! ⭐"}
                    </p>
                  </div>
                )}

                {/* Headline */}
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-100 mb-2 leading-tight">
                  {currentScene.title}
                </h3>

                {/* Subtitle Message */}
                <p className="text-sm md:text-base text-rose-200/90 font-light leading-relaxed max-w-md">
                  {currentScene.subtitle}
                </p>

                {wishMade && (
                  <div className="mt-3 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-300/40 text-xs text-rose-200 flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Birthday wish locked into the universe!</span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Film Grain & Letterbox timestamps */}
          <div className="absolute top-3 left-4 text-[11px] font-mono text-stone-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>REC 4K</span>
            <span className="opacity-50">·</span>
            <span>
              {String(Math.floor(currentTime / 60)).padStart(2, '0')}:
              {String(currentTime % 60).padStart(2, '0')} / 00:28
            </span>
          </div>

          <div className="absolute top-3 right-4 text-[11px] font-mono text-stone-400">
            <span>MEMORIES VOL. 1</span>
          </div>
        </div>

        {/* Video Control Bar */}
        <div className="mt-3 pt-2 px-2 flex items-center justify-between text-stone-300 text-xs border-t border-stone-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={handleReplay}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white transition-colors"
              title="Replay video from start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Timeline Progress Bar */}
            <div className="w-36 md:w-64 h-1.5 bg-stone-800 rounded-full overflow-hidden ml-2">
              <div
                className="h-full bg-rose-500 transition-all duration-300 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Custom Video Option */}
          <div className="flex items-center gap-2">
            {videoMode === 'animated' ? (
              <button
                onClick={() => setIsEditingVideo(true)}
                className="text-[11px] text-stone-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                title="Want to link a real MP4 or YouTube video instead?"
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Use Custom Video</span>
              </button>
            ) : (
              <button
                onClick={() => setVideoMode('animated')}
                className="text-[11px] text-rose-300 hover:underline"
              >
                Switch to Story Animation
              </button>
            )}
          </div>
        </div>

        {/* Custom Video URL input popover */}
        {isEditingVideo && (
          <div className="mt-3 p-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs flex flex-col sm:flex-row gap-2 items-center">
            <span className="shrink-0 text-stone-400">YouTube or Video URL:</span>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 w-full bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1 text-stone-100 outline-none focus:border-rose-400"
            />
            <button
              onClick={() => {
                saveCustomVideo();
                setVideoMode('custom');
              }}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg flex items-center gap-1 shrink-0 font-medium"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply</span>
            </button>
            <button
              onClick={() => setIsEditingVideo(false)}
              className="px-2 py-1 text-stone-400 hover:text-stone-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Heartfelt Note Card */}
      <div className="w-full max-w-2xl mt-6 bg-white/95 rounded-2xl p-6 shadow-md border border-rose-100 relative">
        <div className="washi-tape top-[-10px] left-10 w-28 -rotate-1" />
        <div className="flex items-center gap-2 mb-2 text-rose-700">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span className="font-semibold text-xs tracking-wider uppercase">A Quiet Birthday Note</span>
        </div>
        <p className="font-handwriting text-2xl text-stone-800 leading-relaxed">
          "Dearest {birthdayGirlName}, you might not know me well, or maybe our paths only cross in passing. But watching your kindness, your quiet grace, and your radiant smile inspired me to create this birthday wish for you. You deserve all the peace, happiness, and wonders this world has to offer today and always!"
        </p>
        <div className="mt-3 text-right">
          <span className="font-handwriting text-xl text-stone-600">From someone who quietly admires you ✨</span>
        </div>
      </div>

      {/* The Next Section with "Claim your gift" and runaway "No, thanks" */}
      <div className="mt-10 text-center flex flex-col items-center">
        <div className="inline-block mb-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-600 bg-rose-100/60 px-3 py-1 rounded-full border border-rose-200/80">
            Step 2: The Main Surprise
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-2">
          Ready to open your gift?
        </h3>
        <p className="text-stone-600 text-sm mb-6 max-w-sm">
          A special digital treasure has been handmade just for you.
        </p>

        {/* 2 Buttons Row */}
        <div className="flex items-center justify-center gap-4 flex-wrap relative min-h-[64px] w-full max-w-md">
          {/* Claim your gift button */}
          <button
            onClick={onClaimGift}
            className="px-7 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 animate-glow"
          >
            <span>Claim your gift</span>
            <span className="text-xl">🎁✨</span>
          </button>

          {/* Runaway No Thanks Button */}
          <RunawayButton
            label="No, thanks 😜"
            onDodge={onNoThanksDodge}
          />
        </div>

        {/* Mystery Teaser */}
        <div className="mt-4">
          <p className="text-xs text-purple-700/90 font-medium bg-purple-50/80 border border-purple-200/80 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span>🕵️‍♀️</span>
            <span>P.S. There are 4 secret clues waiting inside your gift about who I am...</span>
          </p>
        </div>
      </div>
    </section>
  );
};
