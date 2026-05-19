import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  Palette, 
  Hash, 
  Dog, 
  Shapes, 
  Type,
  Lock,
  ChevronRight,
  TrendingUp,
  User,
  Clock,
  Sparkles,
  Mic,
  BookOpen,
  Layout,
  Trophy,
  Star,
  BrainCircuit,
  ArrowLeft,
  X,
  CheckCircle
} from 'lucide-react';
import { Mascot } from './Mascot';
import { ColorsLesson } from './ColorsLesson';
import { NumbersLesson } from './NumbersLesson';
import { AnimalsLesson } from './AnimalsLesson';
import { ShapesLesson } from './ShapesLesson';
import { LettersLesson } from '../LettersLesson';
import { FirstWordsLesson } from './FirstWordsLesson';
import { PronunciationLesson } from './PronunciationLesson';
import { MagicStoryMode } from './MagicStoryMode';
import { StickerBook } from './StickerBook';
import { InteractionTimer } from './InteractionTimer';
import { ChildProgressRadar } from './ChildProgressRadar';
import { DrawingLab } from './DrawingLab';
import { PhonicsReview } from './PhonicsReview';
import { ParentAIInsights } from '../ParentAIInsights';

import { StudentProfile, CHILDHOOD_PACKAGES } from '../../types';
import { db, resetDailyMinutes, updateRemainingMinutes } from '../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';

const KID_COURSES = [
  { id: 'first-words', nameKey: 'firstWords', icon: Sparkles, color: 'bg-yellow-400', shadow: 'shadow-yellow-900/20', unlocked: true },
  { id: 'creative-lab', nameKey: 'creativeLab', icon: Palette, color: 'bg-pink-500', shadow: 'shadow-pink-900/20', unlocked: true },
  { id: 'pronunciation', nameKey: 'pronunciation', icon: Mic, color: 'bg-indigo-500', shadow: 'shadow-indigo-900/20', unlocked: true },
  { id: 'colors', nameKey: 'colors', icon: Palette, color: 'bg-rose-500', shadow: 'shadow-rose-900/20', unlocked: true },
  { id: 'numbers', nameKey: 'numbers', icon: Hash, color: 'bg-blue-500', shadow: 'shadow-blue-900/20', unlocked: true },
  { id: 'animals', nameKey: 'animals', icon: Dog, color: 'bg-emerald-500', shadow: 'shadow-emerald-900/20', unlocked: true },
  { id: 'shapes', nameKey: 'shapes', icon: Shapes, color: 'bg-orange-500', shadow: 'shadow-orange-900/20', unlocked: true },
  { id: 'letters', nameKey: 'letters', icon: Type, color: 'bg-purple-500', shadow: 'shadow-purple-900/20', unlocked: true },
  { id: 'phonics-review', nameKey: 'review', icon: Trophy, color: 'bg-yellow-400', shadow: 'shadow-yellow-900/20', unlocked: true },
];

const DAILY_QUESTS = [
  { id: 'words', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  { id: 'colors', icon: Palette, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
  { id: 'stories', icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
];

const CURRICULUM_LEVELS = [
  {
    id: 'level1',
    name: 'المستوى الأول: أصوات البداية (A-F)',
    nameEn: 'Level 1: First Sounds (A-F)',
    description: 'الوحدات 1 و 2: الحروف الأولى وأصدقاء الصوتيات',
    descriptionEn: 'Units 1 & 2: First Letters & Phonics Friends',
    courseIds: ['letters', 'pronunciation']
  },
  {
    id: 'level2',
    name: 'المستوى الثاني: توسيع المفردات (G-L)',
    nameEn: 'Level 2: Expanding Words (G-L)',
    description: 'الوحدات 3 و 4: اكتشاف العالم والحيوانات',
    descriptionEn: 'Units 3 & 4: World Discovery & Animals',
    courseIds: ['first-words', 'animals']
  },
  {
    id: 'level3',
    name: 'المستوى الثالث: الصوتيات المتقدمة (M-R)',
    nameEn: 'Level 3: Advanced Phonics (M-R)',
    description: 'الوحدات 5 و 6: الروبوتات والملكات والأصدقاء المرحون',
    descriptionEn: 'Units 5 & 6: Robots, Queens & Fun Friends',
    courseIds: ['creative-lab']
  },
  {
    id: 'level4',
    name: 'المستوى الرابع: إتقان الأبجدية (S-Z)',
    nameEn: 'Level 4: Alphabet Mastery (S-Z)',
    description: 'الوحدات 7 و 8: إكمال رحلة الصوتيات بنجاح',
    descriptionEn: 'Units 7 & 8: Completing the Phonics Journey',
    courseIds: ['pronunciation']
  },
  {
    id: 'foundation',
    name: 'أساسيات الحياة والرياضيات',
    nameEn: 'Life Skills & Math',
    description: 'الألوان والأرقام والأشكال الأساسية',
    descriptionEn: 'Basic Colors, Numbers & Shapes',
    courseIds: ['colors', 'numbers', 'shapes']
  },
  {
    id: 'review',
    name: 'اختبار بطل الصوتيات',
    nameEn: 'Phonics Champ Review',
    description: 'اختبر مهاراتك في تمييز الكلمات',
    descriptionEn: 'Test your word recognition skills',
    courseIds: ['phonics-review']
  }
];

export const EarlyChildhoodHome = ({ lang, profile, onBack }: { lang: Language, profile?: StudentProfile | null, onBack: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showStickerBook, setShowStickerBook] = useState(false);
  const [showParentCorner, setShowParentCorner] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [recentLearnings, setRecentLearnings] = useState<string[]>([]);
  const [mood, setMood] = useState<string | null>(null);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'thinking' | 'celebrating' | 'idle'>('happy');
  const [mascotMessage, setMascotMessage] = useState<string | undefined>(undefined);
  const [isMascotFetching, setIsMascotFetching] = useState(false);
  const [currentCostume, setCurrentCostume] = useState<string | undefined>(undefined);
  const [unlockedCostumes, setUnlockedCostumes] = useState<string[]>([]);

  useEffect(() => {
    if (profile?.uid) {
      const fetchMascotData = async () => {
        try {
          const mascotRef = doc(db, 'users', profile.uid, 'earlyChildhood', 'mascot');
          const snap = await getDoc(mascotRef);
          if (snap.exists()) {
            setCurrentCostume(snap.data().currentCostume);
            setUnlockedCostumes(snap.data().unlockedCostumes || []);
          }
        } catch (err) {
          console.error("Mascot data fetch failed", err);
        }
      };
      fetchMascotData();
    }
  }, [profile?.uid]);

  const SHOP_ITEMS = [
    { id: 'hero_cape', name: 'Hero Cape', nameAr: 'عباءة البطل', price: 1000, icon: '🦸' },
    { id: 'smart_glasses', name: 'Smart Glasses', nameAr: 'نظارات ذكية', price: 500, icon: '👓' },
    { id: 'party_hat', name: 'Party Hat', nameAr: 'قبعة احتفال', price: 200, icon: '🥳' },
    { id: 'crown', name: 'King Crown', nameAr: 'تاج ملكي', price: 2000, icon: '👑' },
    { id: 'artist_beret', name: 'Artist Beret', nameAr: 'قبعة فنان', price: 300, icon: '👨‍🎨' },
    { id: 'explorer_hat', name: 'Explorer Hat', nameAr: 'قبعة مستكشف', price: 400, icon: '🤠' },
  ];

  const handleBuyCostume = async (costumeId: string, price: number) => {
    if (!profile?.uid || (profile.points || 0) < price) return;

    try {
      const mascotRef = doc(db, 'users', profile.uid, 'earlyChildhood', 'mascot');
      const newUnlocked = [...new Set([...unlockedCostumes, costumeId])];
      
      await setDoc(mascotRef, {
        currentCostume: costumeId,
        unlockedCostumes: newUnlocked
      }, { merge: true });

      const studentRef = doc(db, 'users', profile.uid);
      await updateDoc(studentRef, {
        points: increment(-price)
      });

      setCurrentCostume(costumeId);
      setUnlockedCostumes(newUnlocked);
      setMascotMood('celebrating');
      setMascotMessage(isRtl ? 'يا للروعة! شكراً لك على هذا المظهر الجديد!' : 'Wow! Thank you for this new look!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectCostume = async (costumeId: string) => {
     if (!profile?.uid) return;
     const mascotRef = doc(db, 'users', profile.uid, 'earlyChildhood', 'mascot');
     await updateDoc(mascotRef, { currentCostume: costumeId });
     setCurrentCostume(costumeId);
  };

  const handleMascotGreet = async () => {
    if (isMascotFetching) return;
    setIsMascotFetching(true);
    setMascotMood('thinking');
    
    try {
      const resp = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: isRtl ? 'اعطني رسالة تشجيعية قصيرة جداً لطفل عمره 5 سنوات في أكاديمية تعلم (جملة واحدة)' : 'Give a very short encouraging message for a 5-year-old child in a learning academy (one sentence)',
          context: `Parent Profile: ${profile?.displayName}, Words Learned: ${stats.wordsLearned}, Level: ${stats.levelsCompleted}`
        })
      });
      const data = await resp.json();
      setMascotMessage(data.text);
      setMascotMood('happy');
    } catch (err) {
      setMascotMessage(isRtl ? 'أنت بطل!' : 'You are a hero!');
      setMascotMood('happy');
    } finally {
      setIsMascotFetching(false);
      // Clear message after 8 seconds
      setTimeout(() => setMascotMessage(undefined), 8000);
    }
  };

  useEffect(() => {
    // Initial welcome message
    const timer = setTimeout(() => {
      setMascotMessage(isRtl ? 'مرحباً بك يا بطل! أنا الأسد باسل، هل أنت مستعد للتعلم؟' : 'Welcome Champ! I am Basil the Lion, ready to learn?');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const quests = [
    { title: isRtl ? 'تعلم 3 كلمات' : 'Learn 3 Words', progress: 2, total: 3, id: 'words' },
    { title: isRtl ? 'اكتشف لوناً جديداً' : 'Discover a Color', progress: 1, total: 1, id: 'colors' },
    { title: isRtl ? 'استمع لقصة' : 'Listen to a Story', progress: 0, total: 1, id: 'stories' },
  ];

  const moods = [
    { id: 'happy', emoji: '😊', label: isRtl ? 'سعيد' : 'Happy', color: 'bg-yellow-400' },
    { id: 'curious', emoji: '🧐', label: isRtl ? 'فضولي' : 'Curious', color: 'bg-blue-400' },
    { id: 'sleepy', emoji: '😴', label: isRtl ? 'نعسان' : 'Sleepy', color: 'bg-purple-400' },
    { id: 'energetic', emoji: '🚀', label: isRtl ? 'نشيط' : 'Energetic', color: 'bg-orange-500' },
  ];

  // Stats derived from profile
  const stats = {
    wordsLearned: 42, // Would fetch count from progress docs in real app
    pronunciationScore: profile?.points || 0,
    levelsCompleted: profile?.points ? Math.floor(profile.points / 100) : 0,
    dailyStreak: 5
  };

  const [newSticker, setNewSticker] = useState<any>(null);

  const mockProgressData = {
    vocabulary: 85,
    logic: 60,
    creativity: profile?.points ? (profile.points % 100) : 92,
    phonics: 75,
    consistency: 95
  };

  const saveProgress = async (lessonId: string, score: number, total: number) => {
    if (!profile?.uid) return;
    
    // Track what names or concepts they learned
    const lessonTitle = KID_COURSES.find(c => c.id === lessonId)?.nameKey || lessonId;
    setRecentLearnings(prev => [...new Set([...prev, lessonTitle])].slice(-5));

    try {
      const progressRef = doc(db, 'user_progress', `${profile.uid}_early_${lessonId}`);
      await setDoc(progressRef, {
        userId: profile.uid,
        lessonId: `early_${lessonId}`,
        score,
        total,
        completed: true,
        updatedAt: new Date()
      }, { merge: true });

      // Logic to unlock a random sticker if score is high
      if (score / total >= 0.8) {
        setMascotMood('celebrating');
        setMascotMessage(isRtl ? 'يا لك من مذهل! لقد حصلت على ملصق جديد!' : 'You are amazing! You earned a new sticker!');
        
        const stickersRef = doc(db, 'users', profile.uid, 'earlyChildhood', 'stickers');
        try {
          const snap = await getDoc(stickersRef);
          let unlockedIds = snap.exists() ? snap.data().unlockedIds || [] : [];
          
          const lessonStickers: Record<string, any> = {
            'animals': { id: 'lion', emoji: '🦁' },
            'colors': { id: 'rainbow', emoji: '🌈' },
            'numbers': { id: 'star_gold', emoji: '⭐' },
            'first-words': { id: 'apple', emoji: '🍎' },
            'letters': { id: 'robot', emoji: '🤖' },
            'shapes': { id: 'crown', emoji: '👑' }
          };

          const stickerData = lessonStickers[lessonId];
          if (stickerData && !unlockedIds.includes(stickerData.id)) {
            unlockedIds.push(stickerData.id);
            await setDoc(stickersRef, { unlockedIds }, { merge: true });
            
            // Trigger UI celebrate
            setNewSticker(stickerData);
            setTimeout(() => setNewSticker(null), 5000);
          }
        } catch (error) {
          console.error("Error saving stickers:", error);
        }
      }

      // Also update student profile points
      const studentRef = doc(db, 'users', profile.uid);
      await updateDoc(studentRef, {
        points: increment(score * 10)
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Daily Minutes Logic
  useEffect(() => {
    if (profile?.uid && profile.dailyMinutesLimit) {
      const today = new Date().toISOString().split('T')[0];
      if (profile.lastMinutesResetDate !== today) {
        resetDailyMinutes(profile.uid, profile.dailyMinutesLimit);
      }
    }
  }, [profile]);

  const remainingMinutes = profile?.remainingMinutesToday ?? 0;
  const hasLimit = !!profile?.dailyMinutesLimit;

  const handleLessonEnd = () => {
    setActiveLesson(null);
  };

  const onTick = (remainingSeconds: number) => {
    if (profile?.uid && Math.floor(remainingSeconds % 10) === 0) {
      updateRemainingMinutes(profile.uid, remainingSeconds / 60);
    }
  };

  const onTimeUp = () => {
    setTimeIsUp(true);
    setActiveLesson(null);
  };

  if (timeIsUp || (hasLimit && remainingMinutes <= 0 && !activeLesson)) {
    return (
      <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-6 text-center text-white">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-[120px] mb-8">😴</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {isRtl ? 'انتهى وقتك اليوم يا بطل!' : 'Time\'s up for today, Champ!'}
          </h1>
          <p className="text-indigo-200 text-xl mb-10 max-w-md mx-auto">
            {isRtl ? 'لقد أبليت حسناً! نراك غداً لمزيد من المغامرات الممتعة.' : 'You did amazing! See you tomorrow for more fun adventures.'}
          </p>
          <button 
            onClick={onBack}
            className="bg-white text-indigo-900 px-10 py-4 rounded-3xl font-black text-xl shadow-2xl hover:bg-yellow-400 transition-colors"
          >
            {isRtl ? 'الرجوع للقائمة' : 'Back to Menu'}
          </button>
        </motion.div>
      </div>
    );
  }

  // Wrapper for lessons to include timer
  const renderActiveLesson = () => {
    const timer = hasLimit && (
      <InteractionTimer 
        remainingMinutes={remainingMinutes} 
        onTimeUp={onTimeUp} 
        onTick={onTick} 
      />
    );

    let content = null;
    if (activeLesson === 'first-words') {
      content = <FirstWordsLesson t={t} isRtl={isRtl} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('first-words', s, t)} />;
    } else if (activeLesson === 'pronunciation') {
      content = <PronunciationLesson lang={lang} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('pronunciation', s, t)} />;
    } else if (activeLesson === 'colors') {
      content = <ColorsLesson lang={lang} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('colors', s, t)} />;
    } else if (activeLesson === 'numbers') {
      content = <NumbersLesson lang={lang} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('numbers', s, t)} />;
    } else if (activeLesson === 'animals') {
      content = <AnimalsLesson lang={lang} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('animals', s, t)} />;
    } else if (activeLesson === 'shapes') {
      content = <ShapesLesson lang={lang} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('shapes', s, t)} />;
    } else if (activeLesson === 'letters') {
      content = <LettersLesson lang={lang} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('letters', s, t)} />;
    } else if (activeLesson === 'creative-lab') {
      content = <DrawingLab isRtl={isRtl} onBack={handleLessonEnd} onComplete={(s, t) => saveProgress('creative-lab', s, t)} />;
    } else if (activeLesson === 'magic-story') {
      content = <MagicStoryMode lang={lang} onBack={handleLessonEnd} context={recentLearnings.join(', ')} />;
    } else if (activeLesson === 'phonics-review') {
      content = <PhonicsReview lang={lang} onBack={handleLessonEnd} />;
    }

    return (
      <div className="relative">
        {timer}
        {content}
      </div>
    );
  };

  if (activeLesson) return renderActiveLesson();

  return (
    <div className={`min-h-screen bg-[#f8fafc] p-4 md:p-10 ${isRtl ? 'font-arabic' : 'font-sans'} relative overflow-x-hidden`} dir={isRtl ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {showShop && (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
           >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden"
              >
                  <header className="p-8 bg-[#002147] text-white flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                           <Layout size={28} />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black">{isRtl ? 'خزانة ملابس باسل' : "Basil's Wardrobe"}</h2>
                           <p className="text-blue-200 font-bold uppercase tracking-widest text-[10px]">{isRtl ? 'استخدم نقاطك للأناقة' : 'STYLE UP WITH YOUR POINTS'}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="bg-white/10 px-6 py-2 rounded-full border border-white/20 flex items-center gap-2">
                           <Star className="text-yellow-400" />
                           <span className="font-black text-xl">{profile?.points || 0}</span>
                        </div>
                        <button onClick={() => setShowShop(false)} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                           <X />
                        </button>
                     </div>
                  </header>

                  <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                     {SHOP_ITEMS.map((item) => {
                       const isUnlocked = unlockedCostumes.includes(item.id);
                       const isCurrent = currentCostume === item.id;
                       const canAfford = (profile?.points || 0) >= item.price;

                       return (
                         <div key={item.id} className={`p-6 rounded-[2.5rem] border-4 flex flex-col items-center gap-4 transition-all ${isCurrent ? 'border-amber-400 bg-amber-50' : 'border-slate-50 bg-slate-50'}`}>
                            <div className="text-6xl mb-2">{item.icon}</div>
                            <h4 className="font-black text-[#002147]">{isRtl ? item.nameAr : item.name}</h4>
                            
                            {isUnlocked ? (
                              <button 
                                onClick={() => handleSelectCostume(item.id)}
                                className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isCurrent ? 'bg-amber-400 text-white' : 'bg-[#002147] text-white hover:scale-105'}`}
                              >
                                {isCurrent ? (isRtl ? 'مرتدي' : 'WEARING') : (isRtl ? 'ارتداء' : 'WEAR')}
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleBuyCostume(item.id, item.price)}
                                disabled={!canAfford}
                                className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${canAfford ? 'bg-emerald-500 text-white hover:scale-105' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                              >
                                <Star size={14} />
                                {item.price}
                              </button>
                            )}
                         </div>
                       );
                     })}
                  </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
      {/* Daily Quests Sidebar (Phase 1) */}
      <div className="fixed top-32 right-8 hidden lg:block w-72 space-y-4 z-40">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white shadow-xl">
           <h3 className="text-lg font-black text-[#002147] mb-4 flex items-center gap-2">
             <Trophy className="text-yellow-500" size={20} />
             {isRtl ? 'مهمات اليوم' : 'Daily Quests'}
           </h3>
           <div className="space-y-4">
             {quests.map((q, qIdx) => {
               const questInfo = DAILY_QUESTS.find(dq => dq.id === q.id);
               const isDone = q.progress >= q.total;
               return (
                 <div key={`d-quest-${q.id}-${qIdx}`} className={`p-4 rounded-3xl border transition-all ${isDone ? 'bg-emerald-50 border-emerald-100 opacity-60' : `${questInfo?.bg} ${questInfo?.border}`}`}>
                   <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                         {questInfo && <questInfo.icon size={14} className={isDone ? 'text-emerald-500' : questInfo.color} />}
                         <span className="text-[10px] font-black uppercase tracking-wider text-[#002147]">{q.title}</span>
                      </div>
                      {isDone && <CheckCircle size={14} className="text-emerald-500" />}
                   </div>
                   <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(q.progress / q.total) * 100}%` }}
                        className={`h-full ${isDone ? 'bg-emerald-500' : (questInfo?.color.replace('text-', 'bg-') || 'bg-blue-500')}`}
                      />
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Mascot Mini-Preview in Sidebar */}
        <div className="bg-[#002147] p-6 rounded-[2.5rem] text-white overflow-hidden relative group">
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 mb-2">{isRtl ? 'نصيحة الأسد باسل' : "BASIL'S TIP"}</p>
              <p className="text-xs font-bold leading-relaxed">
                {isRtl ? 'هل تعلم أن اللون الأحمر هو لون القوة والنشاط؟ جرب مغامرة الألوان!' : 'Did you know red is the color of energy? Try the Colors adventure!'}
              </p>
           </div>
           <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform text-6xl">🦁</div>
        </div>
      </div>

      <AnimatePresence>
        {newSticker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-emerald-500/20 backdrop-blur-md"
          >
            <div className="bg-white p-12 rounded-[5rem] text-center shadow-2xl relative overflow-hidden">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-emerald-400/10"
               />
               <div className="text-9xl mb-8 relative z-10">🎊 {newSticker.emoji} 🎊</div>
               <h3 className="text-4xl font-black text-[#002147] mb-2 relative z-10">
                 {isRtl ? 'ملصق جديد!' : 'New Sticker!'}
               </h3>
               <p className="text-emerald-500 font-bold uppercase tracking-widest relative z-10">
                 {isRtl ? 'لقد فتحت جائزة مذهلة' : 'You unlocked an amazing reward'}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-start">
          <button 
            onClick={onBack}
            className="md:hidden self-start flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-all group mb-2"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 md:w-24 h-16 md:h-24 bg-[#002147] text-white rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-xl relative overflow-hidden"
          >
            <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">{t.earlyChildhood}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-xs">{isRtl ? 'رحلة تعلم ذكية وممتعة' : 'Smart & Fun Learning Journey'}</span>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {isRtl ? 'تعلم نشط' : 'Active Learning'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button 
            onClick={onBack}
            className="hidden md:flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-slate-100 text-[#002147] hover:border-[#002147]/20 transition-all shadow-sm mr-2"
          >
            <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
            <span className="font-black text-sm uppercase tracking-widest">{isRtl ? 'رجوع' : 'Back'}</span>
          </button>

          <button 
            onClick={() => setShowStickerBook(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-50 text-amber-600 border-2 border-amber-100 hover:bg-amber-100 transition-all shadow-sm"
          >
            <Layout size={18} />
            <span className="font-black text-[10px] md:text-sm uppercase tracking-widest">{isRtl ? 'ملصقاتي' : 'Stickers'}</span>
          </button>
          <button 
            onClick={() => setShowProgress(!showProgress)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all shadow-sm ${
              showProgress ? 'bg-[#002147] text-white border-[#002147]' : 'bg-white text-[#002147] border-slate-100 hover:border-[#002147]/20 shadow-sm'
            }`}
          >
            <Trophy size={18} />
            <span className="font-black text-[10px] md:text-sm uppercase tracking-widest">{isRtl ? 'إنجازاتي' : 'My Trophies'}</span>
          </button>

          <button 
            onClick={() => setShowParentCorner(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#002147] text-white border-2 border-[#002147] hover:bg-[#002147]/90 transition-all shadow-lg"
          >
            <TrendingUp size={18} />
            <span className="font-black text-[10px] md:text-sm uppercase tracking-widest">{isRtl ? 'ركن الوالدين' : 'Parent'}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showStickerBook && (
          <StickerBook isRtl={isRtl} onClose={() => setShowStickerBook(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showParentCorner && (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
           >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-slate-50 w-full max-w-6xl h-[90vh] rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden"
              >
                 <header className="p-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                          <TrendingUp size={28} />
                       </div>
                       <div>
                          <h2 className="text-2xl font-black text-[#002147]">{isRtl ? 'ركن الوالدين' : 'Parent Corner'}</h2>
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{isRtl ? 'تحليل الأداء والمتابعة الذكية' : 'PERFORMANCE ANALYSIS & SMART MONITORING'}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowParentCorner(false)}
                      className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X size={24} />
                    </button>
                 </header>

                 <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 no-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                       <div className="lg:col-span-6">
                          <ChildProgressRadar data={mockProgressData} isRtl={isRtl} />
                       </div>
                       <div className="lg:col-span-6 space-y-8">
                          <ParentAIInsights lang={lang} studentName={profile?.displayName || 'Child'} studentLevel="Early Foundation" />
                          <div className="bg-white p-8 rounded-[3rem] border-4 border-slate-50 shadow-xl">
                             <h4 className="text-xl font-black text-[#002147] mb-4 flex items-center gap-2">
                                <Star className="text-yellow-500" size={20} />
                                {isRtl ? 'أبرز الإنجازات' : 'Top Achievements'}
                             </h4>
                             <div className="space-y-4">
                                {recentLearnings.length > 0 ? recentLearnings.map((l, i) => (
                                  <div key={`recent-${l}-${i}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                     <span className="font-bold text-[#002147]">{l}</span>
                                     <div className="text-emerald-500 flex items-center gap-1">
                                        <CheckCircle size={14} />
                                        <span className="text-[10px] font-black uppercase">{isRtl ? 'مكتمل' : 'MASTERED'}</span>
                                     </div>
                                  </div>
                                )) : (
                                  <p className="text-slate-400 text-sm italic">{isRtl ? 'لم يبدأ التعلم بعد' : 'Learning adventure just started'}</p>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProgress && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002147]/40 backdrop-blur-sm"
          >
            <motion.div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl max-w-4xl w-full relative">
              <button 
                onClick={() => setShowProgress(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-[#002147] mb-2">{isRtl ? 'بطل الأكاديمية الصغير' : 'Academy Hero Progress'}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{isRtl ? 'استمر في التعلم لتفتح المزيد من الجوائز!' : 'Keep learning to unlock more rewards!'}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="flex flex-col items-center text-center p-6 bg-yellow-50 rounded-[2rem] border-2 border-yellow-100/50 shadow-sm">
                  <div className="w-16 h-16 bg-yellow-400 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-yellow-200">
                    <Star className="w-8 h-8" fill="currentColor" />
                  </div>
                  <span className="text-3xl font-black text-[#002147]">{stats.wordsLearned}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isRtl ? 'كلمة تعلمت' : 'Words Learned'}</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100/50 shadow-sm">
                  <div className="w-16 h-16 bg-indigo-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                    <Mic className="w-8 h-8" />
                  </div>
                  <span className="text-3xl font-black text-[#002147]">{stats.pronunciationScore}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isRtl ? 'نقاط النطق' : 'Speech Score'}</span>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-emerald-50 rounded-[2rem] border-2 border-emerald-100/50 shadow-sm">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <span className="text-3xl font-black text-[#002147]">{stats.levelsCompleted}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isRtl ? 'مستوى منجز' : 'Levels Done'}</span>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-rose-50 rounded-[2rem] border-2 border-rose-100/50 shadow-sm">
                  <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-rose-200">
                    <Clock className="w-8 h-8" />
                  </div>
                  <span className="text-3xl font-black text-[#002147]">{stats.dailyStreak}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isRtl ? 'أيام متتالية' : 'Day Streak'}</span>
                </div>
              </div>

              <div className="mt-10 p-6 bg-[#002147] text-white rounded-[2rem] flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl mb-1">{isRtl ? 'طاقة التعلم' : 'Learning Energy'}</h3>
                  <div className="w-48 h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-yellow-400" 
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black">75%</span>
                  <Sparkles className="text-yellow-400" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magical AI Story Banner */}
      <div className="max-w-6xl mx-auto mb-10">
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveLesson('magic-story')}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-start relative overflow-hidden group shadow-2xl"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-[1.25rem]">
                <BrainCircuit className="w-6 h-6 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] md:text-sm font-black uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10">AI Story Adventure</span>
            </div>
            
            <h2 className="text-3xl md:text-7xl font-black mb-3 tracking-tighter leading-none">{isRtl ? 'اصنع قصتك السحرية' : 'Create Your Magic Story'}</h2>
            
            <p className="text-blue-100 font-bold max-w-lg text-sm md:text-xl mb-8 leading-relaxed opacity-90">
              {isRtl ? 'سأقوم بتأليف قصة مذهلة باستخدام الكلمات التي تعلمتها اليوم! هيا بنا نبدأ المغامرة.' : 'I\'ll write an amazing story using the words you learned today! Let\'s start the adventure.'}
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
               <div className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm md:text-lg uppercase tracking-widest shadow-xl group-hover:bg-yellow-400 group-hover:text-yellow-900 transition-all flex items-center gap-2">
                 {isRtl ? 'ابدأ الآن' : 'Start My Story'}
                 <ChevronRight size={20} strokeWidth={3} className={isRtl ? 'rotate-180' : ''} />
               </div>
               
               <div className="flex -space-x-4 items-center">
                 {['🐶', '🍎', '🌈', '🚀', '🐙'].map((e, i) => (
                   <motion.div 
                    key={`hero-emoji-${e}-${i}`} 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl md:text-2xl border-4 border-white/10 shadow-lg"
                   >
                    {e}
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -right-40 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none"
          />
          <div className="absolute -bottom-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
             <BookOpen size={240} strokeWidth={1} />
          </div>
        </motion.button>
      </div>

      {/* Mood Selector - Very Early Childhood Distinguishing Feature */}
      {!mood && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-10 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center"
        >
          <h2 className="text-xl md:text-2xl font-black text-[#002147] mb-6 text-center">
            {isRtl ? 'كيف تشعر اليوم يا بطل؟' : 'How are you feeling today, Champ?'}
          </h2>
          <div className="flex gap-4 md:gap-8">
            {moods.map((m) => (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMood(m.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${m.color} rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-black/5`}>
                  {m.emoji}
                </div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-[#002147] transition-colors">{m.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto flex flex-col gap-16 pb-32">
        {CURRICULUM_LEVELS.map((level, lvlIdx) => (
          <div key={level.id} className="space-y-8">
            <div className={`flex flex-col ${isRtl ? 'items-end text-right' : 'items-start text-left'} px-6 md:px-0`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-[#002147] text-white rounded-lg flex items-center justify-center font-black text-sm">
                  {lvlIdx + 1}
                </span>
                <h2 className="text-xl md:text-3xl font-black text-[#002147] uppercase tracking-tight">
                  {isRtl ? level.name : level.nameEn}
                </h2>
              </div>
              <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest pl-11">
                {isRtl ? level.description : level.descriptionEn}
              </p>
            </div>

            <div className="space-y-12">
              {level.courseIds.map((courseId, courseIdx) => {
                const course = KID_COURSES.find(c => c.id === courseId);
                if (!course) return null;
                const totalIndex = lvlIdx * 10 + courseIdx;
                const isEven = totalIndex % 2 === 0;

                return (
                  <motion.div
                    key={`roadmap-course-${course.id}-${lvlIdx}-${courseIdx}`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex w-full ${isEven ? 'justify-start' : 'justify-end'} relative`}
                  >
                    {/* Path Connector Visual */}
                    {courseIdx < level.courseIds.length - 1 && (
                      <div className={`absolute top-full h-12 w-1 border-dashed border-2 border-slate-200 left-1/2 -translate-x-1/2 -z-10`} />
                    )}

                    <motion.button
                      whileHover={course.unlocked ? { y: -8, scale: 1.05, rotate: isEven ? -2 : 2 } : {}}
                      whileTap={course.unlocked ? { scale: 0.95 } : {}}
                      onClick={() => course.unlocked && setActiveLesson(course.id)}
                      className={`relative bg-white rounded-3xl md:rounded-[4rem] p-8 md:p-12 text-center border-2 transition-all flex flex-col md:flex-row items-center gap-8 group overflow-hidden max-w-2xl w-full shadow-lg ${
                        course.unlocked 
                        ? `border-slate-50 hover:border-[#002147]/10 ${course.shadow}` 
                        : 'border-slate-100 opacity-60 grayscale'
                      }`}
                    >
                      {!course.unlocked && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#002147] text-white rounded-2xl flex items-center justify-center shadow-xl">
                            <Lock size={24} />
                          </div>
                        </div>
                      )}

                      <div className={`w-24 md:w-40 h-24 md:h-40 ${course.color} text-white rounded-[2rem] md:rounded-[3rem] flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-12 group-hover:scale-110 shrink-0`}>
                        <course.icon className="w-12 h-12 md:w-20 md:h-20" strokeWidth={2.5} />
                      </div>

                      <div className="text-start flex-1">
                         <h3 className="text-2xl md:text-5xl font-black text-[#002147] leading-tight mb-2">{(t as any)[course.nameKey]}</h3>
                         <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                           <div className={`w-2 h-2 rounded-full ${course.unlocked ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                           <span>{course.unlocked ? (isRtl ? 'جاهز للمغامرة' : 'Adventure Ready') : (isRtl ? 'محتوى مغلق' : 'Locked Content')}</span>
                         </div>
                         
                         <div className="mt-6 flex items-center gap-4">
                            <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                               {isRtl ? '5 دقائق' : '5 MINS'}
                            </div>
                            <div className="text-[#002147] font-black text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                               {isRtl ? 'ابدأ الاستكشاف' : 'Start Explore'}
                               <ChevronRight size={16} strokeWidth={3} className={isRtl ? 'rotate-180' : ''} />
                            </div>
                         </div>
                      </div>

                      <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${course.color} opacity-5 rounded-full`} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Mascot (Phase 1 & 2) */}
      <Mascot 
        mood={mascotMood} 
        isRtl={isRtl} 
        message={mascotMessage} 
        accessory={currentCostume}
        onClick={() => {
          if (!mascotMessage) setShowShop(true);
          else handleMascotGreet();
        }} 
      />

      {/* Decorative background mascot */}
      <div className="fixed bottom-0 right-[-5%] w-64 md:w-[400px] pointer-events-none opacity-[0.03] -z-10 select-none grayscale">
         <div className="text-[200px] md:text-[400px]">🦄</div>
      </div>
    </div>
  );
};
