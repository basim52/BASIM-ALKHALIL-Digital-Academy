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
  X
} from 'lucide-react';
import { ColorsLesson } from './ColorsLesson';
import { NumbersLesson } from './NumbersLesson';
import { AnimalsLesson } from './AnimalsLesson';
import { ShapesLesson } from './ShapesLesson';
import { LettersLesson } from './LettersLesson';
import { FirstWordsLesson } from './FirstWordsLesson';
import { PronunciationLesson } from './PronunciationLesson';
import { MagicStoryMode } from './MagicStoryMode';
import { StickerBook } from './StickerBook';
import { InteractionTimer } from './InteractionTimer';

import { StudentProfile, CHILDHOOD_PACKAGES } from '../../types';
import { db, resetDailyMinutes, updateRemainingMinutes } from '../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';

const KID_COURSES = [
  { id: 'first-words', nameKey: 'firstWords', icon: Sparkles, color: 'bg-yellow-400', shadow: 'shadow-yellow-900/20', unlocked: true },
  { id: 'pronunciation', nameKey: 'pronunciation', icon: Mic, color: 'bg-indigo-500', shadow: 'shadow-indigo-900/20', unlocked: true },
  { id: 'colors', nameKey: 'colors', icon: Palette, color: 'bg-rose-500', shadow: 'shadow-rose-900/20', unlocked: true },
  { id: 'numbers', nameKey: 'numbers', icon: Hash, color: 'bg-blue-500', shadow: 'shadow-blue-900/20', unlocked: true },
  { id: 'animals', nameKey: 'animals', icon: Dog, color: 'bg-emerald-500', shadow: 'shadow-emerald-900/20', unlocked: true },
  { id: 'shapes', nameKey: 'shapes', icon: Shapes, color: 'bg-orange-500', shadow: 'shadow-orange-900/20', unlocked: true },
  { id: 'letters', nameKey: 'letters', icon: Type, color: 'bg-purple-500', shadow: 'shadow-purple-900/20', unlocked: true },
];

export const EarlyChildhoodHome = ({ lang, profile, onBack }: { lang: Language, profile?: StudentProfile | null, onBack: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showStickerBook, setShowStickerBook] = useState(false);
  const [recentLearnings, setRecentLearnings] = useState<string[]>([]);
  const [mood, setMood] = useState<string | null>(null);
  const [timeIsUp, setTimeIsUp] = useState(false);

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
        const stickersRef = doc(db, 'users', profile.uid, 'earlyChildhood', 'stickers');
        try {
          const snap = await getDoc(stickersRef);
          let unlockedIds = snap.exists() ? snap.data().unlockedIds || [] : [];
          
          const lessonStickers: Record<string, string> = {
            'animals': 'lion',
            'colors': 'rainbow',
            'numbers': 'star_gold',
            'first-words': 'apple',
            'letters': 'robot',
            'shapes': 'crown'
          };

          const targetSticker = lessonStickers[lessonId];
          if (targetSticker && !unlockedIds.includes(targetSticker)) {
            unlockedIds.push(targetSticker);
            await setDoc(stickersRef, { unlockedIds }, { merge: true });
          }
        } catch (error) {
          console.error("Error saving stickers:", error);
        }
      }

      // Also update student profile points
      const studentRef = doc(db, 'student_profiles', profile.uid);
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
    } else if (activeLesson === 'magic-story') {
      content = <MagicStoryMode lang={lang} onBack={handleLessonEnd} context={recentLearnings.join(', ')} />;
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
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-start">
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

        <div className="flex gap-2">
          <button 
            onClick={() => {
              const assistantBtn = document.getElementById('live-assistant-toggle');
              if (assistantBtn) assistantBtn.click();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-100 transition-all shadow-sm"
          >
            <Mic size={18} />
            <span className="font-black text-[10px] md:text-sm uppercase tracking-widest">{isRtl ? 'المساعد المباشر' : 'Live Assistant'}</span>
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
        </div>
      </header>

      <AnimatePresence>
        {showStickerBook && (
          <StickerBook isRtl={isRtl} onClose={() => setShowStickerBook(false)} />
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
                    key={i} 
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

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pb-20">
        {KID_COURSES.map((course) => (
          <motion.button
            key={course.id}
            whileHover={course.unlocked ? { y: -8, scale: 1.02 } : {}}
            whileTap={course.unlocked ? { scale: 0.95 } : {}}
            onClick={() => course.unlocked && setActiveLesson(course.id)}
            className={`relative bg-white rounded-2xl md:rounded-[3rem] p-4 md:p-10 text-center border-2 transition-all flex flex-col items-center group overflow-hidden ${
              course.unlocked 
              ? `border-slate-50 hover:border-[#002147]/10 ${course.shadow} shadow-sm` 
              : 'border-slate-100 opacity-60 grayscale'
            }`}
          >
            {!course.unlocked && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#002147] text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl">
                  <Lock size={18} className="md:w-7 md:h-7" />
                </div>
              </div>
            )}

            <div className={`w-16 md:w-32 h-16 md:h-32 ${course.color} text-white rounded-2xl md:rounded-[2.5rem] flex items-center justify-center mb-4 md:mb-8 shadow-xl transition-transform group-hover:rotate-12 group-hover:scale-110`}>
              <course.icon className="w-8 h-8 md:w-14 md:h-14" strokeWidth={2.5} />
            </div>

            <h3 className="text-base md:text-3xl font-black text-[#002147] leading-tight mb-1 md:mb-2 line-clamp-1">{(t as any)[course.nameKey]}</h3>
            
            <div className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-xs mt-1">
              <span>{course.unlocked ? (isRtl ? 'ابدأ اللعب' : 'Start Playing') : (isRtl ? 'فتح بـ 10' : 'Unlock for 10')}</span>
              <ChevronRight size={10} className={`md:w-4 md:h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </div>

            <div className={`absolute -bottom-8 -right-8 w-16 h-16 md:w-32 md:h-32 ${course.color} opacity-5 rounded-full`} />
          </motion.button>
        ))}
      </div>

      {/* Decorative background mascot */}
      <div className="fixed bottom-0 right-[-5%] w-64 md:w-[400px] pointer-events-none opacity-[0.03] -z-10 select-none grayscale">
         <div className="text-[200px] md:text-[400px]">🦄</div>
      </div>
    </div>
  );
};
