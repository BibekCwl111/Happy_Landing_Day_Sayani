/**
 * Audio Engine for Sayani's Birthday Surprise
 * Plays "Dear Comrade - BGM for storytelling" on seamless loop
 * with interactive UI sound effects (confetti chimes, candle puff, runaway whoosh).
 */

export interface TrackInfo {
  title: string;
  artist: string;
  src: string;
}

export const CURRENT_TRACK: TrackInfo = {
  title: 'Dear Comrade BGM 🌸',
  artist: 'Emotional Acoustic Theme',
  src: '/music/dear_comrade.mp3',
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.75;
  private audioElement: HTMLAudioElement | null = null;
  private masterGain: GainNode | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audioElement) return;
    try {
      this.audioElement = new Audio(CURRENT_TRACK.src);
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('ended', () => {
        this.audioElement?.play().catch(() => {});
      });
    } catch {
      // Safe ignore in headless or SSR
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public getTrackInfo(): TrackInfo {
    return CURRENT_TRACK;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public getVolume() {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public restartFromBeginning() {
    this.initAudioElement();
    this.initContext();
    if (this.audioElement) {
      try {
        this.audioElement.currentTime = 0;
      } catch {
        // safe ignore
      }
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.play().catch(() => {});
    }
    this.isPlaying = true;
    this.notify();
  }

  public play() {
    this.initAudioElement();
    this.initContext();
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.play().catch(() => {
        // Handled on user gesture
      });
    }
    this.isPlaying = true;
    this.notify();
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Sound effect: playful whoosh when runaway button escapes
  public playWhoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.18);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Safe ignore
    }
  }

  // Sound effect: celebratory chimes for confetti burst
  public playCelebrationChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      const now = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + i * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.12, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.85);
      });
    } catch {
      // Safe ignore
    }
  }

  // Sound effect: candle blown out
  public playCandleBlow() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.value = 1.8;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.5);
    } catch {
      // Safe ignore
    }
  }
}

export const lofiAudio = new AudioEngine();
