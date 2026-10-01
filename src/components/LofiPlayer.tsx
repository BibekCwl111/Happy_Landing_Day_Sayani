import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3 } from 'lucide-react';
import { lofiAudio, CURRENT_TRACK } from '../utils/audio';

export const LofiPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);

  useEffect(() => {
    const syncState = () => {
      setIsPlaying(lofiAudio.getIsPlaying());
      setIsMuted(lofiAudio.getIsMuted());
      setVolume(lofiAudio.getVolume());
    };

    syncState();
    const unsub = lofiAudio.subscribe(syncState);
    return () => unsub();
  }, []);

  const handlePlayToggle = () => {
    lofiAudio.togglePlay();
  };

  const handleMuteToggle = () => {
    lofiAudio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    lofiAudio.setVolume(val);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none pointer-events-auto">
      {/* Clean floating music pill without any popups */}
      <div className="bg-white/95 backdrop-blur-md border border-rose-200/90 rounded-2xl shadow-xl shadow-rose-950/10 p-2 sm:p-2.5 flex items-center gap-3 transition-all duration-300 hover:border-rose-300 hover:shadow-rose-900/15">
        {/* Animated Vinyl Disc Icon */}
        <button
          onClick={handlePlayToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-md relative overflow-hidden flex-shrink-0 cursor-pointer ${
            isPlaying ? 'rotate-180 animate-spin' : 'hover:scale-105'
          }`}
          style={{ animationDuration: '3.5s' }}
          title={isPlaying ? 'Pause music' : 'Play music'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {/* Inner disc ring grooves */}
          <div className="absolute inset-1.5 rounded-full border border-white/30 pointer-events-none" />
          <div className="absolute inset-3 rounded-full border border-white/20 pointer-events-none" />
          <Disc3 className="w-5 h-5 text-white drop-shadow-sm" />
        </button>

        {/* Track Info & Visualizer */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-900 tracking-tight truncate">
              {CURRENT_TRACK.title}
            </span>

            {/* Pulsing Visualizer wave bars */}
            <div className="flex items-end gap-0.5 h-3 flex-shrink-0 ml-0.5">
              <span
                className={`w-0.5 bg-rose-400 rounded-full transition-all duration-200 ${
                  isPlaying ? 'h-3 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-rose-500 rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-2 animate-bounce' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-rose-400 rounded-full transition-all duration-150 ${
                  isPlaying ? 'h-3.5 animate-pulse' : 'h-1'
                }`}
              />
            </div>
          </div>

          <span className="text-[11px] text-stone-500 truncate">
            {CURRENT_TRACK.artist}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayToggle}
          className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-transform active:scale-90 flex-shrink-0 cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-white" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          )}
        </button>

        {/* Volume controls */}
        <div className="hidden sm:flex items-center gap-1.5 pl-1.5 border-l border-rose-100 flex-shrink-0">
          <button
            onClick={handleMuteToggle}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-14 h-1.5 accent-rose-500 bg-stone-200 rounded-lg cursor-pointer"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
};
