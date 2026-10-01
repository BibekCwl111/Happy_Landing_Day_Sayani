import React, { useState } from 'react';
import { MemoryItem } from '../types';
import { Sparkles, Heart, Plus, BookOpen, LayoutGrid, Calendar, MapPin, X, Music, Smile, HelpCircle, RotateCw, Flame, Mail, Hourglass } from 'lucide-react';
import { lofiAudio } from '../utils/audio';
import { MysteryCluesSection } from './MysteryCluesSection';
import { BirthdayCakeModal } from './BirthdayCakeModal';
import { OpenWhenModal } from './OpenWhenModal';
import { FlowerAffirmationsModal } from './FlowerAffirmationsModal';
import { TimeCapsuleModal } from './TimeCapsuleModal';

// Initial pre-curated heartfelt memories for Sayani from a quiet admirer
const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: '1',
    title: 'Leaving 19 Behind... Welcome to 20! 🎂👑',
    date: 'Your 20th Birthday Milestone',
    location: 'Surrounded by Sweet Celebrations',
    caption: 'That gorgeous red dress and birthday cake at 19... now stepping into a fabulous 20!',
    longStory:
      'Seeing this picture from your 19th birthday always brings a smile. That stunning red dress, the candles, and that quiet, charming expression. Now, as you step into your twenties, I hope this milestone brings you endless laughter, peace, big dreams, and all the love you deserve. Happy 20th Birthday, Sayani!',
    image: '/photos/sayani_6.jpg',
    accentColor: '#FDA4AF',
    tapeColor: 'rgba(251, 113, 133, 0.45)',
    rotation: -2,
    sticker: '👑',
    favorite: true,
  },
  {
    id: '2',
    title: 'Grace Draped in Lavender 💜',
    date: 'Traditional & Timeless',
    location: 'Golden Heart Backdrop',
    caption: 'Some moments simply take your breath away... looking like royalty in that saree.',
    longStory:
      'You looked so breathtaking in this lavender saree. The delicate embroidery, the gold necklace and bangles, and the subtle bindi. You carry traditional attire with such effortless elegance and poise that it is impossible not to admire.',
    image: '/photos/sayani_4.jpg',
    accentColor: '#C4B5FD',
    tapeColor: 'rgba(196, 181, 253, 0.45)',
    rotation: 2.5,
    sticker: '✨',
    favorite: true,
  },
  {
    id: '3',
    title: 'Serenity Among the Trees 🌿',
    date: 'Quiet Nature & Timeless Charm',
    location: 'Green Forest Sanctuary',
    caption: 'Tucking hair behind the ear, peaceful nature, and that soft gentle aura.',
    longStory:
      'There is something so peaceful about this picture. The white and red saree against the tall, slender trees, your golden bangles, and the delicate way you adjust your hair. You look like a poem written in nature.',
    image: '/photos/sayani_3.jpg',
    accentColor: '#86EFAC',
    tapeColor: 'rgba(134, 239, 172, 0.45)',
    rotation: -1.5,
    sticker: '🍃',
    favorite: true,
  },
  {
    id: '4',
    title: 'Wind in Your Curls & Silver Jhumkas 🌸',
    date: 'A Picture-Perfect Candid',
    location: 'In the Gentle Breeze',
    caption: 'That sweet sideways glance, silver jhumkas, and the prettiest dimple.',
    longStory:
      'Those silver jhumkas, the embroidered jacket, and your curly hair dancing in the breeze. That little dimple and soft side-glance capture your charm in the purest way possible. It is the kind of picture that makes anyone pause and smile.',
    image: '/photos/sayani_2.jpg',
    accentColor: '#FDE047',
    tapeColor: 'rgba(253, 224, 71, 0.45)',
    rotation: 1.8,
    sticker: '💫',
    favorite: true,
  },
  {
    id: '5',
    title: 'Sunlight, Curls & A Flower in Your Hair ☀️',
    date: 'Sunny Wanderlust Day',
    location: 'Bright & Cheerful Walk',
    caption: 'Shading your eyes from the sun with a white blossom tucked in your hair.',
    longStory:
      'That bright sunny day with a plumeria flower tucked into your short curls, shielding your eyes from the sunshine. You have this vibrant, playful energy that makes every regular day feel like a cheerful adventure.',
    image: '/photos/sayani_1.jpg',
    accentColor: '#FBBF24',
    tapeColor: 'rgba(251, 191, 36, 0.45)',
    rotation: -3,
    sticker: '🌼',
    favorite: true,
  },
  {
    id: '6',
    title: 'The Warmest, Sweetest Smile 💖',
    date: 'Golden Hour Glow',
    location: 'Always Cherished in Mind',
    caption: 'A red flower in your hair, golden light, and that heartwarming gentle smile.',
    longStory:
      'This picture has such a warm, comfortable feeling to it. That soft rose in your hair, the warm golden light, and that calm, genuine smile that could melt away anyone\'s bad day. You are truly special, Sayani.',
    image: '/photos/sayani_5.jpg',
    accentColor: '#F9A8D4',
    tapeColor: 'rgba(249, 168, 212, 0.45)',
    rotation: 2,
    sticker: '🧸',
    favorite: true,
  },
];

interface ScrapbookPageProps {
  birthdayGirlName?: string;
  onBackToGreeting: () => void;
}

export const ScrapbookPage: React.FC<ScrapbookPageProps> = ({
  birthdayGirlName = 'Sayani',
  onBackToGreeting,
}) => {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'book'>('grid');
  const [bookPageIndex, setBookPageIndex] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Milestone Feature Modals
  const [isCakeOpen, setIsCakeOpen] = useState(false);
  const [isOpenWhenOpen, setIsOpenWhenOpen] = useState(false);
  const [isAffirmationsOpen, setIsAffirmationsOpen] = useState(false);
  const [isTimeCapsuleOpen, setIsTimeCapsuleOpen] = useState(false);
  const [flippedCardIds, setFlippedCardIds] = useState<Record<string, boolean>>({});

  // Close modals on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMemory(null);
        setLetterOpen(false);
        setShowAddModal(false);
        setIsCakeOpen(false);
        setIsOpenWhenOpen(false);
        setIsAffirmationsOpen(false);
        setIsTimeCapsuleOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCardFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    lofiAudio.playCelebrationChime();
  };

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newSticker, setNewSticker] = useState('💖');
  const [newImage, setNewImage] = useState('');

  const handleOpenMemory = (mem: MemoryItem) => {
    setSelectedMemory(mem);
    lofiAudio.playCelebrationChime();
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    const newItem: MemoryItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      date: newDate.trim() || 'Special Memory',
      caption: newCaption.trim(),
      longStory: newStory.trim() || newCaption.trim(),
      image: newImage,
      accentColor: '#F472B6',
      tapeColor: 'rgba(244, 114, 182, 0.45)',
      rotation: (Math.random() - 0.5) * 6,
      sticker: newSticker,
      favorite: true,
    };

    setMemories([newItem, ...memories]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewCaption('');
    setNewStory('');
    setNewImage('');
    lofiAudio.playCelebrationChime();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-scrapbook-paper py-10 pb-36 px-4 md:px-8 relative selection:bg-rose-200">
      {/* Decorative Washi Tapes at top */}
      <div className="washi-tape top-2 left-6 w-32 rotate-[-3deg] opacity-75" />
      <div className="washi-tape top-2 right-12 w-28 rotate-[2deg] opacity-75" />

      {/* Scrapbook Header */}
      <header className="max-w-5xl mx-auto text-center mb-8 relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-2">
          Little Things That Make You Radiant
        </h1>
        <p className="font-handwriting text-2xl text-stone-600 max-w-xl mx-auto leading-relaxed">
          "A quiet collection of moments, grace, and heartfelt wishes, gathered with care by someone who admires you."
        </p>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {/* View Toggle */}
          <div className="flex items-center bg-white/80 backdrop-blur rounded-xl p-1 border border-stone-200 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Collage Pinboard</span>
            </button>
            <button
              onClick={() => setViewMode('book')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'book'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Album Flipbook</span>
            </button>
          </div>

          {/* Blow 20 Candles Button */}
          <button
            onClick={() => {
              setIsCakeOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>🎂</span>
            <span>Blow Candles</span>
          </button>

          {/* Open When Letters Button */}
          <button
            onClick={() => {
              setIsOpenWhenOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>💌</span>
            <span>&ldquo;Open When...&rdquo;</span>
          </button>

          {/* Pluck a Petal Button */}
          <button
            onClick={() => {
              setIsAffirmationsOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>🌸</span>
            <span>Affirmation Petals</span>
          </button>

          {/* Time Capsule Button */}
          <button
            onClick={() => {
              setIsTimeCapsuleOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>⏳</span>
            <span>To Sayani at 25</span>
          </button>

          {/* Open Love Letter Button */}
          <button
            onClick={() => {
              setLetterOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="px-4 py-1.5 rounded-xl text-xs font-medium bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>✉️</span>
            <span>A Letter For You</span>
          </button>

          {/* Mystery Clues Jump Button */}
          <button
            onClick={() => {
              const el = document.getElementById('mystery-clues-section');
              el?.scrollIntoView({ behavior: 'smooth' });
              lofiAudio.playCelebrationChime();
            }}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 hover:from-purple-200 hover:to-rose-200 border border-purple-200 text-purple-900 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🕵️‍♀️</span>
            <span>Who Am I? (Clues)</span>
          </button>

          {/* Add New Memory Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-1.5 rounded-xl text-xs font-medium bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Memory Photo</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto">
        {/* Sayani's 20th Milestone Special Keepsake Activities Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          {/* 1. Cake & Blow Candles */}
          <button
            onClick={() => {
              setIsCakeOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="group p-4 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100/90 border border-rose-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">🎂</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                Interactive
              </span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-rose-900">
                Blow 20 Candles
              </h4>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                Make a birthday wish & blow the flames!
              </p>
            </div>
          </button>

          {/* 2. Open When... Envelopes */}
          <button
            onClick={() => {
              setIsOpenWhenOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="group p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100/90 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">💌</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                4 Letters
              </span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-purple-900">
                &ldquo;Open When...&rdquo;
              </h4>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                Special envelopes for every mood
              </p>
            </div>
          </button>

          {/* 3. Flower Petal Affirmations */}
          <button
            onClick={() => {
              setIsAffirmationsOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="group p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100/90 border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">🌸</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                Compliments
              </span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-amber-900">
                Pluck a Petal
              </h4>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                Sweet reminders of your inner grace
              </p>
            </div>
          </button>

          {/* 4. Time Capsule (To 25-year-old Sayani) */}
          <button
            onClick={() => {
              setIsTimeCapsuleOpen(true);
              lofiAudio.playCelebrationChime();
            }}
            className="group p-4 rounded-2xl bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100/90 border border-teal-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">⏳</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-800 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                Time Capsule
              </span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-teal-900">
                To Sayani at 25
              </h4>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                A golden letter sealed until 2031
              </p>
            </div>
          </button>
        </div>

        {viewMode === 'grid' ? (
          /* Collage Pinboard View with 3D Flippable Polaroids */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
            {memories.map((mem) => {
              const isFlipped = !!flippedCardIds[mem.id];
              return (
                <div
                  key={mem.id}
                  style={{
                    transform: `rotate(${mem.rotation}deg)`,
                  }}
                  className="group relative transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0 [perspective:1000px]"
                >
                  {/* Washi Tape Accent */}
                  <div
                    className="washi-tape -top-3 left-1/2 -translate-x-1/2 w-24 z-30 pointer-events-none"
                    style={{ backgroundColor: mem.tapeColor }}
                  />

                  {/* 3D Flipping Card Container */}
                  <div
                    className={`relative w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* FRONT SIDE (Polaroid Photo Frame) */}
                    <div
                      onClick={() => handleOpenMemory(mem)}
                      className="bg-white p-3.5 pb-4 rounded-2xl shadow-md hover:shadow-xl border border-stone-200/90 [backface-visibility:hidden] cursor-pointer"
                    >
                      {/* Polaroid Photo Box - 4:5 vertical ratio with object-top to keep face fully visible */}
                      <div className="aspect-[4/5] w-full rounded-xl overflow-hidden relative bg-stone-50 border border-stone-100 flex items-center justify-center">
                        {mem.image ? (
                          <img
                            src={mem.image}
                            alt={mem.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          /* Styled Artistic Fallback Illustration */
                          <div className="w-full h-full relative p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-rose-100/60 via-amber-50/50 to-pink-100/70">
                            <div className="absolute inset-0 bg-dot-grid opacity-30" />
                            <div className="z-10 flex items-center justify-between text-xs text-stone-500">
                              <span className="font-mono text-[11px] bg-white/70 px-2 py-0.5 rounded-full">
                                {mem.date}
                              </span>
                              <span className="text-xl filter drop-shadow-sm">{mem.sticker}</span>
                            </div>
                            <div className="z-10 text-center my-auto">
                              <div className="w-12 h-12 mx-auto rounded-full bg-white/90 border border-rose-200 flex items-center justify-center text-rose-500 shadow-sm mb-1 group-hover:scale-110 transition-transform">
                                <Heart className="w-6 h-6 fill-rose-400 text-rose-500" />
                              </div>
                              <span className="font-serif font-bold text-sm text-stone-800 line-clamp-1 px-2">
                                {mem.title}
                              </span>
                            </div>
                            <div className="z-10 text-center">
                              <span className="text-[11px] text-rose-600/80 font-medium">
                                Click to read memory ✨
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Sticker badge */}
                        {mem.sticker && mem.image && (
                          <span className="absolute top-2 right-2 text-2xl filter drop-shadow">
                            {mem.sticker}
                          </span>
                        )}
                      </div>

                      {/* Handwritten Polaroid Caption */}
                      <div className="mt-3.5 text-center px-1">
                        <h3 className="font-serif font-semibold text-stone-900 text-base leading-snug">
                          {mem.title}
                        </h3>
                        <p className="font-handwriting text-xl text-stone-600 mt-1 leading-snug line-clamp-2">
                          "{mem.caption}"
                        </p>
                      </div>

                      {/* Bottom Quick Flip Button */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between px-1">
                        <span className="text-[11px] font-mono text-stone-400 truncate max-w-[120px]">
                          {mem.date}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleCardFlip(mem.id, e)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-medium transition-colors cursor-pointer"
                          title="Flip to read secret handwritten note"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Flip Note</span>
                        </button>
                      </div>
                    </div>

                    {/* BACK SIDE (Handwritten Nostalgic Postcard) */}
                    <div
                      onClick={(e) => toggleCardFlip(mem.id, e)}
                      className="absolute inset-0 bg-[#fdfaf3] p-5 rounded-2xl shadow-xl border-2 border-dashed border-amber-300 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between overflow-hidden cursor-pointer"
                      title="Click anywhere to flip back to photo"
                    >
                      <div>
                        {/* Postcard Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-amber-200/80">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">💌</span>
                            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-amber-900">
                              Sayani • 20th Keepsake
                            </span>
                          </div>
                          {/* Vintage Postmark Stamp */}
                          <div className="w-9 h-9 border-2 border-amber-600 border-dashed rounded-lg flex flex-col items-center justify-center text-[8px] font-mono text-amber-800 bg-amber-100/50">
                            <span>OCT</span>
                            <span className="font-bold">2026</span>
                          </div>
                        </div>

                        {/* Memory Title & Location */}
                        <div className="mt-2.5">
                          <h4 className="font-serif font-bold text-stone-900 text-sm">
                            {mem.title}
                          </h4>
                          <span className="text-[10px] text-amber-800 font-mono block mt-0.5">
                            📍 {mem.location}
                          </span>
                        </div>

                        {/* Handwritten Story snippet */}
                        <p className="font-handwriting text-xl text-stone-800 leading-relaxed mt-2 line-clamp-5">
                          {mem.longStory}
                        </p>
                      </div>

                      {/* Backside Controls */}
                      <div className="pt-2.5 border-t border-amber-200/80 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMemory(mem);
                          }}
                          className="text-[11px] font-medium text-stone-700 hover:text-stone-900 underline cursor-pointer"
                        >
                          Full Photo View 🔍
                        </button>
                        <button
                          type="button"
                          onClick={(e) => toggleCardFlip(mem.id, e)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold shadow-xs transition-transform active:scale-95 cursor-pointer z-10"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Flip Back to Photo ↺</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Authentic Scrapbook Book Flip View */
          <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-xl border-4 border-amber-100 p-6 md:p-10 relative overflow-hidden">
              {/* Spiral binding rings in center */}
              <div className="hidden md:flex flex-col justify-around absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 z-20 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-3 rounded-full bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 shadow-inner -translate-x-0.5"
                  />
                ))}
              </div>

              {/* Two-page Spread */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Left Page */}
                <div className="border-b md:border-b-0 md:border-r border-stone-200 md:pr-6 pb-6 md:pb-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                      <span>PAGE {bookPageIndex * 2 + 1}</span>
                      <span>MEMORY LOG</span>
                    </div>

                    {memories[bookPageIndex * 2] && (
                      <div className="space-y-4">
                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 shadow-inner">
                          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-rose-50 flex items-center justify-center">
                            {memories[bookPageIndex * 2].image ? (
                              <img
                                src={memories[bookPageIndex * 2].image}
                                alt={memories[bookPageIndex * 2].title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <span className="text-4xl block mb-2">
                                  {memories[bookPageIndex * 2].sticker}
                                </span>
                                <span className="font-serif font-bold text-stone-800">
                                  {memories[bookPageIndex * 2].title}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs text-rose-700 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{memories[bookPageIndex * 2].date}</span>
                            {memories[bookPageIndex * 2].location && (
                              <>
                                <span>·</span>
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{memories[bookPageIndex * 2].location}</span>
                              </>
                            )}
                          </div>
                          <h4 className="font-serif text-xl font-bold text-stone-900 mt-1">
                            {memories[bookPageIndex * 2].title}
                          </h4>
                          <p className="font-handwriting text-2xl text-stone-700 leading-snug mt-2">
                            "{memories[bookPageIndex * 2].caption}"
                          </p>
                          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                            {memories[bookPageIndex * 2].longStory}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Page */}
                <div className="md:pl-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                      <span>PAGE {bookPageIndex * 2 + 2}</span>
                      <span>SPECIAL MOMENTS</span>
                    </div>

                    {memories[bookPageIndex * 2 + 1] ? (
                      <div className="space-y-4">
                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 shadow-inner">
                          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-amber-50 flex items-center justify-center">
                            {memories[bookPageIndex * 2 + 1].image ? (
                              <img
                                src={memories[bookPageIndex * 2 + 1].image}
                                alt={memories[bookPageIndex * 2 + 1].title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <span className="text-4xl block mb-2">
                                  {memories[bookPageIndex * 2 + 1].sticker}
                                </span>
                                <span className="font-serif font-bold text-stone-800">
                                  {memories[bookPageIndex * 2 + 1].title}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs text-rose-700 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{memories[bookPageIndex * 2 + 1].date}</span>
                            {memories[bookPageIndex * 2 + 1].location && (
                              <>
                                <span>·</span>
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{memories[bookPageIndex * 2 + 1].location}</span>
                              </>
                            )}
                          </div>
                          <h4 className="font-serif text-xl font-bold text-stone-900 mt-1">
                            {memories[bookPageIndex * 2 + 1].title}
                          </h4>
                          <p className="font-handwriting text-2xl text-stone-700 leading-snug mt-2">
                            "{memories[bookPageIndex * 2 + 1].caption}"
                          </p>
                          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                            {memories[bookPageIndex * 2 + 1].longStory}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-rose-200 rounded-2xl">
                        <span className="text-4xl mb-2">🌸</span>
                        <h4 className="font-serif font-bold text-stone-800">More Memories Await</h4>
                        <p className="font-handwriting text-xl text-stone-600 mt-1">
                          "The best chapters are the ones we haven't written yet."
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Flip Page Navigation */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  disabled={bookPageIndex === 0}
                  onClick={() => setBookPageIndex((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:pointer-events-none text-stone-800 font-medium transition-colors"
                >
                  ← Previous Pages
                </button>
                <span className="text-stone-500 font-mono">
                  {bookPageIndex + 1} of {Math.ceil(memories.length / 2)}
                </span>
                <button
                  disabled={(bookPageIndex + 1) * 2 >= memories.length}
                  onClick={() => setBookPageIndex((p) => p + 1)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:pointer-events-none text-stone-800 font-medium transition-colors"
                >
                  Next Pages →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Mystery Clues & Contact Section */}
      <div id="mystery-clues-section">
        <MysteryCluesSection birthdayGirlName={birthdayGirlName} />
      </div>

      {/* Expanded Memory Modal */}
      {selectedMemory && (
        <div
          onClick={() => setSelectedMemory(null)}
          className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border-2 border-rose-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Polaroid Detail */}
            <div className="text-center mb-4">
              <span className="text-3xl block mb-1">{selectedMemory.sticker || '💖'}</span>
              <div className="flex items-center justify-center gap-2 text-xs text-rose-600 font-medium mb-1">
                <span>{selectedMemory.date}</span>
                {selectedMemory.location && (
                  <>
                    <span>·</span>
                    <span>{selectedMemory.location}</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {selectedMemory.title}
              </h3>
            </div>

            {/* Photo Box - uncropped original display */}
            <div className="w-full max-h-[60vh] rounded-2xl overflow-hidden bg-stone-100/90 border border-stone-200 shadow-inner mb-4 flex items-center justify-center p-2">
              {selectedMemory.image ? (
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[52vh] w-auto max-w-full rounded-xl object-contain shadow-sm"
                />
              ) : (
                <div className="p-6 text-center bg-gradient-to-br from-rose-100 to-amber-100 w-full h-full flex flex-col items-center justify-center">
                  <Heart className="w-12 h-12 text-rose-400 fill-rose-300 mb-2 animate-bounce" />
                  <p className="font-handwriting text-2xl text-stone-700">
                    "{selectedMemory.caption}"
                  </p>
                </div>
              )}
            </div>

            {/* Story Text */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                The Story Behind The Moment
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {selectedMemory.longStory}
              </p>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setSelectedMemory(null)}
                className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-medium text-xs shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Return to Birthday Scrapbook</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wax Sealed Letter Modal */}
      {letterOpen && (
        <div
          onClick={() => setLetterOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fef9ee] rounded-3xl max-w-xl w-full p-8 md:p-10 shadow-2xl relative border border-amber-200 animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto cursor-default"
          >
            {/* Washi Tape */}
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 w-36 bg-rose-200" />

            <button
              onClick={() => setLetterOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Wax Seal icon */}
            <div className="text-center mb-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-800 text-white flex items-center justify-center shadow-lg border-2 border-rose-900 text-xl font-serif font-bold">
                💌
              </div>
              <h3 className="font-serif text-3xl font-bold text-stone-900 mt-2">
                A Letter For You
              </h3>
            </div>

            <div className="space-y-4 font-handwriting text-2xl text-stone-800 leading-relaxed pt-2">
              <p>Happy Birthday, Sayani!</p>
              <p>
                You probably don't know me well, or maybe our paths have only ever crossed in passing.
                But on your birthday, I wanted to take a quiet moment to remind you how genuinely special and radiant you are.
              </p>
              <p>
                I have admired your grace, your polite warmth, and your bright smile from afar. Creating this little website was simply my way of sending you genuine warmth on your special day—with no pressure and no expectations, just a sincere wish for your happiness.
              </p>
              <p>
                I hope this year brings you everything your gentle heart longs for: peaceful mornings, laughter that reaches your eyes, wild dreams coming true, and people who remind you how deeply you are appreciated.
              </p>
              <p>
                Keep shining, Sayani. The world is a whole lot brighter with you in it!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200 text-right">
              <span className="font-handwriting text-2xl text-rose-700 block">
                From someone who quietly admires you ✨
              </span>
            </div>

            {/* Bottom Return Button */}
            <div className="mt-6 pt-3 text-center border-t border-amber-200/60">
              <button
                onClick={() => setLetterOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Return to Birthday Scrapbook</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              Add a New Scrapbook Memory
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Add a real photo or memory note to celebrate her birthday!
            </p>

            <form onSubmit={handleAddMemorySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Picnic at the Park"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Date or Time</label>
                <input
                  type="text"
                  placeholder="e.g. Summer 2025 or A Tuesday Afternoon"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Polaroid Caption (Handwritten)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. You couldn't stop giggling!"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Full Story (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Write the sweet details of this moment..."
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Upload Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Choose a Sticker</label>
                <div className="flex gap-2 text-xl">
                  {['💖', '🧸', '🌸', '🍰', '☕', '🌅', '✨', '🎈'].map((stk) => (
                    <button
                      key={stk}
                      type="button"
                      onClick={() => setNewSticker(stk)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        newSticker === stk ? 'border-rose-500 bg-rose-50 scale-110' : 'border-stone-200'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium shadow"
                >
                  Pin into Scrapbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. Birthday Cake & 20 Candles Modal */}
      <BirthdayCakeModal
        isOpen={isCakeOpen}
        onClose={() => setIsCakeOpen(false)}
        birthdayGirlName={birthdayGirlName}
      />

      {/* 2. Open When... 4 Envelopes Modal */}
      <OpenWhenModal
        isOpen={isOpenWhenOpen}
        onClose={() => setIsOpenWhenOpen(false)}
        birthdayGirlName={birthdayGirlName}
      />

      {/* 3. Flower Petals Affirmations Modal */}
      <FlowerAffirmationsModal
        isOpen={isAffirmationsOpen}
        onClose={() => setIsAffirmationsOpen(false)}
        birthdayGirlName={birthdayGirlName}
      />

      {/* 4. Time Capsule (To 25-Year-Old Sayani) Modal */}
      <TimeCapsuleModal
        isOpen={isTimeCapsuleOpen}
        onClose={() => setIsTimeCapsuleOpen(false)}
        birthdayGirlName={birthdayGirlName}
      />

      {/* Footer Back navigation */}
      <footer className="mt-16 text-center">
        <button
          onClick={onBackToGreeting}
          className="text-xs text-stone-500 hover:text-rose-600 underline font-medium transition-colors"
        >
          ← Replay Birthday Wish Experience
        </button>
      </footer>
    </div>
  );
};
