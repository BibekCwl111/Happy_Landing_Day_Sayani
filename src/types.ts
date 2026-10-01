export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  caption: string;
  longStory: string;
  image: string; // URL or data URL
  accentColor: string;
  tapeColor: string;
  rotation: number;
  sticker?: string;
  favorite?: boolean;
}

export type TeddyEmotion =
  | 'idle'
  | 'happy'
  | 'surprised'
  | 'guarding'
  | 'giggling'
  | 'blushing'
  | 'celebrating';

export type ActiveStep = 'greeting' | 'video_reveal' | 'scrapbook';
