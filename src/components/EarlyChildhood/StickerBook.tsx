import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Star, 
  Sparkles, 
  X,
  BookOpen,
  Layout,
  Heart
} from 'lucide-react';
import { db, auth } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface Sticker {
  id: string;
  emoji: string;
  name: string;
  nameAr: string;
  rarity: 'common' | 'rare' | 'epic';
  unlocked: boolean;
}

const INITIAL_STICKERS: Sticker[] = [
  { id: 'lion', emoji: '🦁', name: 'Lion', nameAr: 'أسد', rarity: 'common', unlocked: false },
  { id: 'rocket', emoji: '🚀', name: 'Rocket', nameAr: 'صاروخ', rarity: 'rare', unlocked: false },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow', nameAr: 'قوس قزح', rarity: 'common', unlocked: false },
  { id: 'star_gold', emoji: '⭐', name: 'Super Star', nameAr: 'نجم خارق', rarity: 'epic', unlocked: false },
  { id: 'apple', emoji: '🍎', name: 'Apple', nameAr: 'تفاحة', rarity: 'common', unlocked: false },
  { id: 'dino', emoji: '🦖', name: 'Dino', nameAr: 'ديناصور', rarity: 'rare', unlocked: false },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn', nameAr: 'وحيد القرن', rarity: 'epic', unlocked: false },
  { id: 'fire', emoji: '🔥', name: 'Flame', nameAr: 'لهب', rarity: 'rare', unlocked: false },
  { id: 'pizza', emoji: '🍕', name: 'Pizza', nameAr: 'بيتزا', rarity: 'common', unlocked: false },
  { id: 'plane', emoji: '✈️', name: 'Plane', nameAr: 'طائرة', rarity: 'common', unlocked: false },
  { id: 'crown', emoji: '👑', name: 'Crown', nameAr: 'تاج', rarity: 'epic', unlocked: false },
  { id: 'robot', emoji: '🤖', name: 'Robot', nameAr: 'روبوت', rarity: 'rare', unlocked: false },
];

export const StickerBook: React.FC<{ isRtl: boolean; onClose: () => void }> = ({ isRtl, onClose }) => {
  const [stickers, setStickers] = useState<Sticker[]>(INITIAL_STICKERS);
  const [loading, setLoading] = useState(true);
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  useEffect(() => {
    loadStickers();
  }, []);

  const loadStickers = async () => {
    if (!auth.currentUser) return;
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid, 'earlyChildhood', 'stickers');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const unlockedIds = docSnap.data().unlockedIds || [];
        setStickers(prev => prev.map(s => ({
          ...s,
          unlocked: unlockedIds.includes(s.id)
        })));
      }
    } catch (err) {
      console.error("Error loading stickers:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-amber-400 to-orange-500';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[85vh]"
      >
        {/* Abstract Deco */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-400 rounded-full blur-3xl" />
        </div>

        {/* Sidebar - Stats */}
        <div className="w-full md:w-80 bg-slate-50 p-8 border-r border-slate-100 flex flex-col relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-oxford-navy rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Layout size={24} />
            </div>
            <div>
              <h2 className={`font-black text-xl text-oxford-navy ${isRtl ? 'font-tajawal' : ''}`}>
                {isRtl ? 'كتاب الملصقات' : 'My Stickers'}
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Digital Collection</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Progress</span>
               <div className="flex items-end justify-between mb-2">
                 <span className="text-3xl font-black text-oxford-navy">{stickers.filter(s => s.unlocked).length}</span>
                 <span className="text-slate-300 font-bold mb-1">/ {stickers.length}</span>
               </div>
               <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(stickers.filter(s => s.unlocked).length / stickers.length) * 100}%` }}
                   className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                 />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               {[
                 { label: isRtl ? 'نادر' : 'Rare', count: stickers.filter(s => s.unlocked && s.rarity === 'rare').length, color: 'bg-blue-100 text-blue-600' },
                 { label: isRtl ? 'ملحمي' : 'Epic', count: stickers.filter(s => s.unlocked && s.rarity === 'epic').length, color: 'bg-purple-100 text-purple-600' }
               ].map((stat, i) => (
                 <div key={i} className={`${stat.color} p-4 rounded-2xl`}>
                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-70 mb-1">{stat.label}</p>
                    <p className="text-xl font-black">{stat.count}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="mt-auto pt-8">
            <p className={`text-slate-400 text-sm italic ${isRtl ? 'font-tajawal' : ''}`}>
              {isRtl ? 'أنهِ الدروس لتحصل على ملصقات جديدة!' : 'Complete lessons to earn new awesome stickers!'}
            </p>
          </div>
        </div>

        {/* Main Content - Sticker Grid */}
        <div className="flex-1 p-8 overflow-y-auto bg-white relative z-10 no-scrollbar">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-oxford-navy hover:text-white transition-all z-20"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
            {stickers.map((sticker, idx) => (
              <motion.div
                key={sticker.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={sticker.unlocked ? { scale: 1.05, y: -5 } : {}}
                onClick={() => sticker.unlocked && setSelectedSticker(sticker)}
                className={`relative aspect-square rounded-[2rem] flex items-center justify-center transition-all ${
                  sticker.unlocked 
                    ? 'cursor-pointer hover:shadow-xl' 
                    : 'bg-slate-50 opacity-40 grayscale pointer-events-none'
                }`}
              >
                {sticker.unlocked && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(sticker.rarity)} opacity-[0.08] rounded-[2rem]`} />
                )}
                
                <span className="text-5xl sm:text-6xl drop-shadow-md select-none">
                  {sticker.unlocked ? sticker.emoji : '❓'}
                </span>

                {sticker.unlocked && sticker.rarity !== 'common' && (
                  <div className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider text-white shadow-sm bg-gradient-to-r ${getRarityColor(sticker.rarity)}`}>
                    {sticker.rarity}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Popover Detail */}
      <AnimatePresence>
        {selectedSticker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setSelectedSticker(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          >
            <motion.div 
              className="bg-white p-12 rounded-[4rem] text-center max-w-sm shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(selectedSticker.rarity)} opacity-5`} />
              
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-8 relative z-10"
              >
                {selectedSticker.emoji}
              </motion.div>
              
              <h3 className={`text-3xl font-black text-oxford-navy mb-2 relative z-10 ${isRtl ? 'font-tajawal' : ''}`}>
                {isRtl ? selectedSticker.nameAr : selectedSticker.name}
              </h3>
              <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs relative z-10 mb-8">
                {selectedSticker.rarity} Secret
              </p>

              <button 
                onClick={() => setSelectedSticker(null)}
                className="w-full py-4 bg-oxford-navy text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-accent transition-all relative z-10 shadow-lg"
              >
                Awesome!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
