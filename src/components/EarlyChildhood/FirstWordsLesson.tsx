import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  Star, 
  PartyPopper,
  Zap,
  Smile,
  Heart
} from 'lucide-react';

interface WordOption {
  id: string;
  word: string;
  wordAr: string;
  image?: string;
  color: string;
  shadowColor: string;
  emoji: string;
}

interface WordLevel {
  id: number;
  title: string;
  titleAr: string;
  emoji: string;
  words: WordOption[];
}

interface FirstWordsLessonProps {
  onBack: () => void;
  isRtl: boolean;
  t: any;
}

const WORD_LEVELS: WordLevel[] = [
  {
    id: 1,
    title: 'Greetings',
    titleAr: 'التحيات',
    emoji: '👋',
    words: [
      { id: 'hello', word: 'Hello', wordAr: 'مرحباً', emoji: '👋', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'bye', word: 'Goodbye', wordAr: 'مع السلامة', emoji: '👋', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'morning', word: 'Good Morning', wordAr: 'صباح الخير', emoji: '☀️', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'night', word: 'Good Night', wordAr: 'تصبح على خير', emoji: '🌙', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'welcome', word: 'Welcome', wordAr: 'أهلاً بك', emoji: '🤝', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'yes', word: 'Yes', wordAr: 'نعم', emoji: '✅', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'no', word: 'No', wordAr: 'لا', emoji: '❌', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'ok', word: 'Okay', wordAr: 'حسناً', emoji: '👌', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'friend', word: 'Friend', wordAr: 'صديق', emoji: '👦', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'love', word: 'I Love You', wordAr: 'أنا أحبك', emoji: '❤️', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
    ]
  },
  {
    id: 2,
    title: 'Manners',
    titleAr: 'الأدب والذوق',
    emoji: '💖',
    words: [
      { id: 'please', word: 'Please', wordAr: 'من فضلك', emoji: '🙏', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'thanks', word: 'Thank you', wordAr: 'شكراً لك', emoji: '💖', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'sorry', word: 'Sorry', wordAr: 'أنا آسف', emoji: '🥺', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'help', word: 'Help me', wordAr: 'ساعدني', emoji: '🙋', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'share', word: 'Share', wordAr: 'شارك', emoji: '🎁', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'wait', word: 'Wait', wordAr: 'انتظر', emoji: '⏳', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'nice', word: 'Kind', wordAr: 'لطيف', emoji: '🌈', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'listen', word: 'Listen', wordAr: 'اسمع', emoji: '👂', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'look', word: 'Look', wordAr: 'انظر', emoji: '👀', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'quiet', word: 'Quiet', wordAr: 'هادئ', emoji: '🤫', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
    ]
  },
  {
    id: 3,
    title: 'About Me',
    titleAr: 'عني أنا',
    emoji: '🧒',
    words: [
      { id: 'me', word: 'Me', wordAr: 'أنا', emoji: '🧒', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'name', word: 'My Name', wordAr: 'اسمي', emoji: '🏷️', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'boy', word: 'Boy', wordAr: 'ولد', emoji: '👦', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'girl', word: 'Girl', wordAr: 'بنت', emoji: '👧', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'age', word: 'Age', wordAr: 'عمري', emoji: '🎂', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'head', word: 'Head', wordAr: 'رأس', emoji: '💆', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'eye', word: 'Eye', wordAr: 'عين', emoji: '👁️', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'nose', word: 'Nose', wordAr: 'أنف', emoji: '👃', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'hand', word: 'Hand', wordAr: 'يد', emoji: '✋', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'feet', word: 'Foot', wordAr: 'قدم', emoji: '🦶', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
    ]
  },
  {
    id: 4,
    title: 'Actions',
    titleAr: 'أفعال',
    emoji: '🏃',
    words: [
      { id: 'run', word: 'Run', wordAr: 'يجري', emoji: '🏃', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'jump', word: 'Jump', wordAr: 'يقفز', emoji: '🦘', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'eat', word: 'Eat', wordAr: 'يأكل', emoji: '🍎', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'drink', word: 'Drink', wordAr: 'يشرب', emoji: '🥤', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'sleep', word: 'Sleep', wordAr: 'نام', emoji: '😴', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'play', word: 'Play', wordAr: 'لعب', emoji: '🎾', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'laugh', word: 'Laugh', wordAr: 'ضحك', emoji: '😆', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'cry', word: 'Cry', wordAr: 'بكى', emoji: '😢', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'walk', word: 'Walk', wordAr: 'مشى', emoji: '🚶', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'sing', word: 'Sing', wordAr: 'غنى', emoji: '🎤', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
    ]
  },
  {
    id: 5,
    title: 'Feelings',
    titleAr: 'المشاعر',
    emoji: '😊',
    words: [
      { id: 'happy', word: 'Happy', wordAr: 'سعيد', emoji: '😊', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'sad', word: 'Sad', wordAr: 'حزين', emoji: '😢', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'angry', word: 'Angry', wordAr: 'غاضب', emoji: '😠', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { id: 'scared', word: 'Scared', wordAr: 'خائف', emoji: '😨', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'excited', word: 'Excited', wordAr: 'متحمس', emoji: '🤩', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'tired', word: 'Tired', wordAr: 'تعبان', emoji: '😴', color: '#94a3b8', shadowColor: 'rgba(148, 163, 184, 0.4)' },
      { id: 'hungry', word: 'Hungry', wordAr: 'جائع', emoji: '😋', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'thirsty', word: 'Thirsty', wordAr: 'عطشان', emoji: '💧', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { id: 'brave', word: 'Brave', wordAr: 'شجاع', emoji: '🦁', color: '#ea580c', shadowColor: 'rgba(234, 88, 12, 0.4)' },
      { id: 'funny', word: 'Funny', wordAr: 'مضحك', emoji: '🤡', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
    ]
  },
  {
    id: 6,
    title: 'Daily Routine',
    titleAr: 'الروتين اليومي',
    emoji: '🌅',
    words: [
      { id: 'wake', word: 'Wake up', wordAr: 'استيقظ', emoji: '🌅', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'brush', word: 'Brush teeth', wordAr: 'فرش أسنانك', emoji: '🪥', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'wash', word: 'Wash', wordAr: 'غسل', emoji: '🧼', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'dress', word: 'Dress up', wordAr: 'لبس', emoji: '👕', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'eat-b', word: 'Breakfast', wordAr: 'فطور', emoji: '🥣', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'school', word: 'School', wordAr: 'مدرسة', emoji: '🏫', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'study', word: 'Study', wordAr: 'دراسة', emoji: '📚', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'read-b', word: 'Read Book', wordAr: 'قرأ كتاب', emoji: '📖', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'play-g', word: 'Play Games', wordAr: 'لعب ألعاب', emoji: '🎮', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'go-sleep', word: 'Go Sleep', wordAr: 'اذهب للنوم', emoji: '🛌', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
    ]
  },
  {
    id: 7,
    title: 'Food & Drink',
    titleAr: 'طعام وشراب',
    emoji: '🍎',
    words: [
      { id: 'milk', word: 'Milk', wordAr: 'حليب', emoji: '🥛', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'water', word: 'Water', wordAr: 'ماء', emoji: '💧', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { id: 'bread', word: 'Bread', wordAr: 'خبز', emoji: '🍞', color: '#92400e', shadowColor: 'rgba(146, 64, 14, 0.4)' },
      { id: 'apple-f', word: 'Apple', wordAr: 'تفاحة', emoji: '🍎', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { id: 'banana', word: 'Banana', wordAr: 'موز', emoji: '🍌', color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' },
      { id: 'egg', word: 'Egg', wordAr: 'بيضة', emoji: '🥚', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'honey', word: 'Honey', wordAr: 'عسل', emoji: '🍯', color: '#fbbf24', shadowColor: 'rgba(251, 191, 36, 0.4)' },
      { id: 'juice', word: 'Juice', wordAr: 'عصير', emoji: '🧃', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' },
      { id: 'cake', word: 'Cake', wordAr: 'كيك', emoji: '🍰', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'rice', word: 'Rice', wordAr: 'أرز', emoji: '🍚', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
    ]
  },
  {
    id: 8,
    title: 'Around Us',
    titleAr: 'ما حولنا',
    emoji: '🌳',
    words: [
      { id: 'car-t', word: 'Car', wordAr: 'سيارة', emoji: '🚗', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'tree', word: 'Tree', wordAr: 'شجرة', emoji: '🌳', color: '#22c55e', shadowColor: 'rgba(34, 197, 94, 0.4)' },
      { id: 'flower', word: 'Flower', wordAr: 'وردة', emoji: '🌸', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
      { id: 'sun', word: 'Sun', wordAr: 'شمس', emoji: '☀️', color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' },
      { id: 'cloud', word: 'Cloud', wordAr: 'غيمة', emoji: '☁️', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'rain', word: 'Rain', wordAr: 'مطر', emoji: '🌧️', color: '#6366f1', shadowColor: 'rgba(99, 102, 241, 0.4)' },
      { id: 'house', word: 'House', wordAr: 'بيت', emoji: '🏠', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'toy', word: 'Toy', wordAr: 'لعبة', emoji: '🧸', color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
      { id: 'ball', word: 'Ball', wordAr: 'كرة', emoji: '⚽', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { id: 'bike', word: 'Bike', wordAr: 'دراجة', emoji: '🚲', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
    ]
  },
  {
    id: 9,
    title: 'Colors Review',
    titleAr: 'مراجعة الألوان',
    emoji: '🎨',
    words: [
      { id: 'red', word: 'Red', wordAr: 'أحمر', emoji: '🔴', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { id: 'blue', word: 'Blue', wordAr: 'أزرق', emoji: '🔵', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { id: 'green', word: 'Green', wordAr: 'أخضر', emoji: '🟢', color: '#22c55e', shadowColor: 'rgba(34, 197, 94, 0.4)' },
      { id: 'yellow', word: 'Yellow', wordAr: 'أصفر', emoji: '🟡', color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' },
      { id: 'orange', word: 'Orange', wordAr: 'برتقالي', emoji: '🟠', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' },
      { id: 'purple', word: 'Purple', wordAr: 'بنفسجي', emoji: '🟣', color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
      { id: 'pink', word: 'Pink', wordAr: 'وردي', emoji: '💗', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
      { id: 'brown', word: 'Brown', wordAr: 'بني', emoji: '🟤', color: '#92400e', shadowColor: 'rgba(146, 64, 14, 0.4)' },
      { id: 'black', word: 'Black', wordAr: 'أسود', emoji: '⚫', color: '#111827', shadowColor: 'rgba(17, 24, 39, 0.4)' },
      { id: 'white', word: 'White', wordAr: 'أبيض', emoji: '⚪', color: '#f8fafc', shadowColor: 'rgba(248, 250, 252, 0.4)' },
    ]
  },
  {
    id: 10,
    title: 'Number Review',
    titleAr: 'مراجعة الأرقام',
    emoji: '🔢',
    words: [
      { id: 'one', word: 'One', wordAr: 'واحد', emoji: '1️⃣', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'two', word: 'Two', wordAr: 'اثنان', emoji: '2️⃣', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'three', word: 'Three', wordAr: 'ثلاثة', emoji: '3️⃣', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'four', word: 'Four', wordAr: 'أربعة', emoji: '4️⃣', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'five', word: 'Five', wordAr: 'خمسة', emoji: '5️⃣', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'six', word: 'Six', wordAr: 'ستة', emoji: '6️⃣', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'seven', word: 'Seven', wordAr: 'سبعة', emoji: '7️⃣', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'eight', word: 'Eight', wordAr: 'ثمانية', emoji: '8️⃣', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'nine', word: 'Nine', wordAr: 'تسعة', emoji: '9️⃣', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'ten', word: 'Ten', wordAr: 'عشرة', emoji: '🔟', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
    ]
  },
];

export const FirstWordsLesson: React.FC<FirstWordsLessonProps> = ({ onBack, isRtl, t }) => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
  const [showExcellent, setShowExcellent] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const currentLevel = WORD_LEVELS.find(l => l.id === activeLevel) || WORD_LEVELS[0];

  const speak = (text: string, lang: string = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleWordClick = (word: WordOption) => {
    setActiveId(word.id);
    speak(word.word);
    
    setLearnedWords(prev => {
      const next = new Set(prev);
      next.add(word.id);
      return next;
    });

    setTimeout(() => setActiveId(null), 1000);
  };

  useEffect(() => {
    const currentWordsLearned = Array.from(learnedWords).filter(id => 
      currentLevel.words.some(w => w.id === id)
    );
    if (currentWordsLearned.length === currentLevel.words.length && !showExcellent) {
      setShowExcellent(true);
      setTimeout(() => setShowExcellent(false), 3000);
    }
  }, [learnedWords.size, activeLevel]);

  const progressCount = Array.from(learnedWords).filter(id => 
    currentLevel.words.some(w => w.id === id)
  ).length;

  return (
    <div className="min-h-screen bg-[#FDFCF0] relative overflow-x-hidden font-sans pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#FDFCF0]/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 mb-4 md:mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white shadow-md flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-transform border border-slate-50"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          
          <div className="text-center px-2">
            <h1 className="text-base md:text-2xl font-black text-[#002147] leading-tight line-clamp-1">
              {isRtl ? currentLevel.titleAr : currentLevel.title}
            </h1>
            <p className="text-[10px] md:text-sm text-slate-500 font-bold opacity-70">
              {t.hearAndLearn}
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#002147] text-white px-3 py-1.5 rounded-xl shadow-lg">
             <span className="text-sm md:text-lg font-black">{progressCount}/10</span>
             <Star className={`w-4 h-4 md:w-5 md:h-5 ${progressCount === 10 ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} />
          </div>
        </div>
      </div>

      {/* Level Selector - Improved for touch and content-aware */}
      <div className="px-4 mb-6">
        <div className="max-w-6xl mx-auto flex overflow-x-auto gap-2 pb-4 no-scrollbar snap-x scroll-smooth -mx-4 px-4">
           {WORD_LEVELS.map((level) => (
             <button
               key={level.id}
               onClick={() => {
                 setActiveLevel(level.id);
                 speak(isRtl ? level.titleAr : level.title);
               }}
               className={`flex-shrink-0 snap-start px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                 activeLevel === level.id 
                 ? 'bg-[#002147] text-white shadow-xl -translate-y-0.5' 
                 : 'bg-white text-[#002147] border border-slate-200 hover:border-[#002147]/20'
               }`}
             >
               <span className="text-base md:text-xl">
                 {level.emoji}
               </span>
               <span className="truncate max-w-[100px] md:max-w-none">
                 {isRtl ? level.titleAr : level.title}
               </span>
             </button>
           ))}
        </div>
      </div>

      {/* Main Content - Grid optimized for responsiveness */}
      <motion.div 
        key={activeLevel}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 px-4 pb-12"
      >
        {currentLevel.words.map((word) => (
          <motion.button
            key={word.id}
            onClick={() => handleWordClick(word)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            animate={activeId === word.id ? { 
              rotate: [0, -5, 5, -5, 5, 0],
              scale: [1, 1.05, 1],
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
            } : {}}
            className="relative group p-0 outline-none"
          >
            <div 
              className={`aspect-square rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-6 flex flex-col items-center justify-center transition-all duration-300 shadow-md md:shadow-lg border-b-4 ${
                learnedWords.has(word.id) 
                ? 'ring-4 ring-emerald-400/30' 
                : 'hover:shadow-xl'
              }`}
              style={{ 
                backgroundColor: word.color,
                borderColor: word.shadowColor,
              }}
            >
              <div className="flex-1 flex items-center justify-center">
                <span className="text-4xl md:text-7xl drop-shadow-md group-activeList:scale-110 transition-transform">
                  {word.emoji}
                </span>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/40 text-center w-full mt-2">
                <p className="text-[10px] md:text-base lg:text-lg font-black text-[#002147] truncate leading-none mb-0.5">
                  {word.word}
                </p>
                {isRtl && (
                  <p className="text-[8px] md:text-xs font-bold text-[#002147]/70 truncate leading-none">
                    {word.wordAr}
                  </p>
                )}
              </div>

              {/* Status Icons */}
              {learnedWords.has(word.id) && (
                <div className="absolute top-2 left-2 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center text-white shadow-sm">
                  <Star size={12} fill="white" />
                </div>
              )}
              
              <div className="absolute top-2 right-2 p-1.5 bg-white/20 rounded-full text-[#002147]/50 group-active:text-[#002147]">
                <Volume2 size={12} />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Mascot Assistant - Compact for Mobile */}
      <div className="max-w-4xl mx-auto mt-12 mb-8 flex items-center gap-4 px-4">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-14 h-14 md:w-20 md:h-20 bg-emerald-400 rounded-2xl flex items-center justify-center text-2xl shadow-xl border-4 border-white flex-shrink-0"
        >
          🐙
        </motion.div>
        <div className="flex-1 bg-white p-3 md:p-5 rounded-2xl rounded-bl-none shadow-md border border-slate-100 relative">
          <p className="text-xs md:text-base font-bold text-[#002147] leading-relaxed">
            {progressCount === 0 
              ? (isRtl ? `أهلاً بك! تعلم كلمات جديدة في المستوى ${activeLevel}` : `Hi! Let's learn new words in Level ${activeLevel}!`)
              : progressCount < 10
                ? (isRtl ? `أحسنت! ${progressCount} كلمات. استمر!` : `Well done! ${progressCount} words. Keep it up!`)
                : (isRtl ? 'يا لك من ذكي! لقد أنهيت المستوى!' : 'Amazing! You finished the level!')
            }
          </p>
        </div>
      </div>

      {/* Success Celebration Overlay */}
      <AnimatePresence>
        {showExcellent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border-4 border-emerald-400 text-center max-w-sm w-full">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                <PartyPopper size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#002147] mb-1">{t.excellent}</h2>
              <p className="text-lg font-bold text-slate-500">{isRtl ? 'لقد أكملت المستوى بنجاح!' : 'Level Completed Successfully!'}</p>
              
              <div className="flex justify-center gap-2 mt-4 text-yellow-400">
                {[1, 2, 3].map(i => <Star key={i} className="w-8 h-8 fill-yellow-400" />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none -z-10 bg-[#FDFCF0]">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 15, repeat: Infinity }} className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
