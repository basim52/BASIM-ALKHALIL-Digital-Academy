import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  PartyPopper,
  BookOpen,
  Cat,
  Dog,
  Fish,
  Bird,
  Rabbit,
  Moon,
  Sun,
  Umbrella,
  Smartphone,
  Music,
  Camera,
  Heart,
  Star as StarIcon,
  Cloud,
  Zap,
  Leaf,
  Ghost,
  Flower,
  Car,
  Plane,
  Ship,
  Wind,
  Gamepad2,
  Trophy,
  Star
} from 'lucide-react';


interface LetterOption {
  letter: string;
  word: string;
  wordAr: string;
  nickname: string;
  nicknameAr: string;
  keywords: string[];
  keywordsAr: string[];
  icon?: any;
  emoji?: string;
  color: string;
  shadowColor: string;
  storyWords?: string[];
}

const LETTER_GROUPS = [
  {
    id: 1,
    title: 'Foundation 1: Aa Bb Cc',
    titleAr: 'الوحدة الأولى: أ ب ج',
    story: {
      title: 'The Hungry Friends',
      panels: [
        { text: 'An alligator!', emoji: '🐊🍎' },
        { text: 'A bear!', emoji: '🐻🐊' },
        { text: 'A banana!', emoji: '🍌🐻' },
        { text: 'It is a cat!', emoji: '🐱🎩' }
      ]
    },
    letters: [
      { 
        letter: 'A', word: 'Apple', wordAr: 'تفاحة', 
        nickname: 'Angry Apple', nicknameAr: 'التفاحة الغاضبة',
        keywords: ['Apple', 'Ax', 'Ant', 'Alligator'], 
        keywordsAr: ['تفاحة', 'فأس', 'نملة', 'تمساح'],
        emoji: '🍎', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' 
      },
      { 
        letter: 'B', word: 'Bear', wordAr: 'دب', 
        nickname: 'Big Bear', nicknameAr: 'الدب الكبير',
        keywords: ['Bear', 'Bird', 'Bed', 'Banana'], 
        keywordsAr: ['دب', 'عصفور', 'سرير', 'موزة'],
        emoji: '🐻', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' 
      },
      { 
        letter: 'C', word: 'Cat', wordAr: 'قطة', 
        nickname: 'Cool Cat', nicknameAr: 'القط الذكي',
        keywords: ['Cat', 'Cup', 'Car', 'Computer'], 
        keywordsAr: ['قطة', 'كوب', 'سيارة', 'حاسوب'],
        icon: Cat, color: '#f59e0b', shadowColor: 'rgba(245, 158, 11, 0.4)' 
      },
    ]
  },
  {
    id: 2,
    title: 'Foundation 2: Dd Ee Ff',
    titleAr: 'الوحدة الثانية: د هـ ف',
    story: {
      title: 'In the Garden',
      panels: [
        { text: 'I see an egg.', emoji: '🥚🌱' },
        { text: 'I have a fan.', emoji: '🪭💨' },
        { text: 'It is a desk.', emoji: ' desks' },
        { text: 'It is an elephant!', emoji: '🐘✨' }
      ]
    },
    letters: [
      { 
        letter: 'D', word: 'Dog', wordAr: 'كلب', 
        nickname: 'Dizzy Dog', nicknameAr: 'الكلب الدوار',
        keywords: ['Dog', 'Desk', 'Doll', 'Duck'], 
        keywordsAr: ['كلب', 'مكتب', 'دمية', 'بطة'],
        icon: Dog, color: '#92400e', shadowColor: 'rgba(146, 64, 14, 0.4)' 
      },
      { 
        letter: 'E', word: 'Egg', wordAr: 'بيضة', 
        nickname: 'Energetic Egg', nicknameAr: 'البيضة النشيطة',
        keywords: ['Egg', 'Elbow', 'Envelope', 'Elephant'], 
        keywordsAr: ['بيضة', 'كوع', 'ظرف', 'فيل'],
        emoji: '🥚', color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' 
      },
      { 
        letter: 'F', word: 'Fish', wordAr: 'سمكة', 
        nickname: 'Funny Fish', nicknameAr: 'السمكة المضحكة',
        keywords: ['Fish', 'Fan', 'Farm', 'Fork'], 
        keywordsAr: ['سمكة', 'مروحة', 'مزرعة', 'شوكة'],
        icon: Fish, color: '#06b6d4', shadowColor: 'rgba(6, 182, 212, 0.4)' 
      },
    ]
  },
  {
    id: 3,
    title: 'Foundation 3: Gg Hh Ii',
    titleAr: 'الوحدة الثالثة: ج هـ ي',
    story: {
      title: 'Interesting Sights',
      panels: [
        { text: 'I see an insect!', emoji: '🐜🌿' },
        { text: 'This is a horse.', emoji: '🐎🏠' },
        { text: 'I want a hot dog.', emoji: '🌭😋' },
        { text: 'I want my bear!', emoji: '🧸😭' }
      ]
    },
    letters: [
      { 
        letter: 'G', word: 'Gorilla', wordAr: 'الغوريلا', 
        nickname: 'Good Gorilla', nicknameAr: 'الغوريلا الطيبة',
        keywords: ['Gorilla', 'Goat', 'Gift', 'Girl'], 
        keywordsAr: ['غوريلا', 'ماعز', 'هدية', 'بنت'],
        emoji: '🦍', color: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.4)' 
      },
      { 
        letter: 'H', word: 'Horse', wordAr: 'حصان', 
        nickname: 'Happy Horse', nicknameAr: 'الحصان السعيد',
        keywords: ['Horse', 'Hat', 'House', 'Hot dog'], 
        keywordsAr: ['حصان', 'قبعة', 'بيت', 'نقانق'],
        emoji: '🐎', color: '#f59e0b', shadowColor: 'rgba(245, 158, 11, 0.4)' 
      },
      { 
        letter: 'I', word: 'Insect', wordAr: 'حشرة', 
        nickname: 'Interesting Insect', nicknameAr: 'الحشرة المدهشة',
        keywords: ['Insect', 'Ink', 'Igloo', 'Iguana'], 
        keywordsAr: ['حشرة', 'حبر', 'كوخ جليدي', 'إغوانا'],
        emoji: '🐜', color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' 
      },
    ]
  },
  {
    id: 4,
    title: 'Foundation 4: Jj Kk Ll',
    titleAr: 'الوحدة الرابعة: ج ك ل',
    story: {
      title: 'The Sky Full of Fun',
      panels: [
        { text: 'That is a kite.', emoji: '🪁☁️' },
        { text: 'That is a jet.', emoji: '✈️🚀' },
        { text: 'I like the lemon.', emoji: '🍋😋' },
        { text: 'I like the lion!', emoji: '🦁✨' }
      ]
    },
    letters: [
      { 
        letter: 'J', word: 'Jet', wordAr: 'طائرة نفاثة', 
        nickname: 'Jumbo Jet', nicknameAr: 'الطائرة العملاقة',
        keywords: ['Jet', 'Jam', 'Juice', 'Jacket'], 
        keywordsAr: ['طائرة', 'مربى', 'عصير', 'سترة'],
        emoji: '✈️', color: '#0ea5e9', shadowColor: 'rgba(14, 165, 233, 0.4)' 
      },
      { 
        letter: 'K', word: 'Kangaroo', wordAr: 'كنغر', 
        nickname: 'Kicking Kangaroo', nicknameAr: 'الكنغر القفاز',
        keywords: ['Kangaroo', 'Key', 'King', 'Kite'], 
        keywordsAr: ['كنغر', 'مفتاح', 'ملك', 'طائرة ورقية'],
        emoji: '🦘', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' 
      },
      { 
        letter: 'L', word: 'Lion', wordAr: 'أسد', 
        nickname: 'Lazy Lion', nicknameAr: 'الأسد الكسول',
        keywords: ['Lion', 'Lamp', 'Leaf', 'Lemon'], 
        keywordsAr: ['أسد', 'مصباح', 'ورقة شجر', 'ليمون'],
        emoji: '🦁', color: '#ea580c', shadowColor: 'rgba(234, 88, 12, 0.4)' 
      },
    ]
  },
  {
    id: 5,
    title: 'Foundation 5: Mm Nn Oo',
    titleAr: 'الوحدة الخامسة: م ن و',
    story: {
      title: 'The Hungry Friends',
      panels: [
        { text: 'I like the money.', emoji: '💰🐒' },
        { text: 'I like the nut.', emoji: '🌰🐒' },
        { text: 'No, it is my nut!', emoji: '🐿️🙅' },
        { text: 'I see the ostrich.', emoji: '🪶🐦' }
      ]
    },
    letters: [
      { 
        letter: 'M', word: 'Monkey', wordAr: 'قرد', 
        nickname: 'Merry Monkey', nicknameAr: 'القرد المرح',
        keywords: ['Monkey', 'Milk', 'Money', 'Mouse'], 
        keywordsAr: ['قرد', 'حليب', 'مال', 'فأر'],
        emoji: '🐒', color: '#7c2d12', shadowColor: 'rgba(124, 45, 18, 0.4)' 
      },
      { 
        letter: 'N', word: 'Nut', wordAr: 'بندقية', 
        nickname: 'Noisy Nut', nicknameAr: 'البندقة المزعجة',
        keywords: ['Nut', 'Net', 'Nest', 'Nose'], 
        keywordsAr: ['بندقة', 'شبكة', 'عش', 'أنف'],
        emoji: '🌰', color: '#16a34a', shadowColor: 'rgba(22, 163, 74, 0.4)' 
      },
      { 
        letter: 'O', word: 'Octopus', wordAr: 'أخطبوط', 
        nickname: 'Orange Octopus', nicknameAr: 'الأخطبوط البرتقالي',
        keywords: ['Octopus', 'Ox', 'Olive', 'Ostrich'], 
        keywordsAr: ['أخطبوط', 'ثور', 'زيتون', 'نعامة'],
        emoji: '🐙', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' 
      },
    ]
  },
  {
    id: 6,
    title: 'Foundation 6: Pp Qq Rr',
    titleAr: 'الوحدة السادسة: ب ك ر',
    story: {
      title: 'In the Castle',
      panels: [
        { text: 'I am the queen.', emoji: '👸🏰' },
        { text: 'I want a rose.', emoji: '🌹👸' },
        { text: 'That is a big robot.', emoji: '🤖✨' },
        { text: 'I like my panda!', emoji: '🐼❤️' }
      ]
    },
    letters: [
      { 
        letter: 'P', word: 'Peach', wordAr: 'خوخ', 
        nickname: 'Pink Peach', nicknameAr: 'الخوخة الوردية',
        keywords: ['Peach', 'Pen', 'Panda', 'Pineapple'], 
        keywordsAr: ['خوخة', 'قلم', 'باندا', 'أناناس'],
        emoji: '🍑', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' 
      },
      { 
        letter: 'Q', word: 'Queen', wordAr: 'ملكة', 
        nickname: 'Quiet Queen', nicknameAr: 'الملكة الهادئة',
        keywords: ['Queen', 'Quiz', 'Quilt', 'Question'], 
        keywordsAr: ['ملكة', 'اختبار', 'لحاف', 'سؤال'],
        emoji: '👸', color: '#9333ea', shadowColor: 'rgba(147, 51, 234, 0.4)' 
      },
      { 
        letter: 'R', word: 'Rabbit', wordAr: 'أرنب', 
        nickname: 'Racing Rabbit', nicknameAr: 'الأرنب المتسابق',
        keywords: ['Rabbit', 'Rose', 'Rice', 'Robot'], 
        keywordsAr: ['أرنب', 'وردة', 'أرز', 'روبوت'],
        emoji: '🐰', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' 
      },
    ]
  },
  {
    id: 7,
    title: 'Foundation 7: Ss Tt Uu Vv',
    titleAr: 'الوحدة السابعة: س ت أ ف',
    story: {
      title: 'Park Fun',
      panels: [
        { text: 'The sun is up!', emoji: '☀️☁️' },
        { text: 'Hi! This is my teacher.', emoji: '👨‍🏫👋' },
        { text: 'Do you have a cat?', emoji: '🐱❓' },
        { text: 'It is a small tiger!', emoji: '🐯✨' }
      ]
    },
    letters: [
      { 
        letter: 'S', word: 'Seal', wordAr: 'فقمة', 
        nickname: 'Super Seal', nicknameAr: 'الفقمة الخارقة',
        keywords: ['Seal', 'Sun', 'Soap', 'Socks'], 
        keywordsAr: ['فقمة', 'شمس', 'صابون', 'جوارب'],
        emoji: '🦭', color: '#0ea5e9', shadowColor: 'rgba(14, 165, 233, 0.4)' 
      },
      { 
        letter: 'T', word: 'Turtle', wordAr: 'سلحفاة', 
        nickname: 'Tall Turtle', nicknameAr: 'السلحفاة الطويلة',
        keywords: ['Turtle', 'Tent', 'Tiger', 'Teacher'], 
        keywordsAr: ['سلحفاة', 'خيمة', 'نمر', 'معلم'],
        emoji: '🐢', color: '#16a34a', shadowColor: 'rgba(22, 163, 74, 0.4)' 
      },
      { 
        letter: 'U', word: 'Umbrella', wordAr: 'مظلة', 
        nickname: 'Unhappy Umbrella', nicknameAr: 'المظلة الحزينة',
        keywords: ['Umbrella', 'Up', 'Uncle', 'Umpire'], 
        keywordsAr: ['مظلة', 'أعلى', 'خال', 'حكم'],
        emoji: '☂️', color: '#8b5cf6', shadowColor: 'rgba(139, 92, 246, 0.4)' 
      },
      { 
        letter: 'V', word: 'Van', wordAr: 'شاحنة', 
        nickname: 'Violet Van', nicknameAr: 'الشاحنة البنفسجية',
        keywords: ['Van', 'Vet', 'Vest', 'Violin'], 
        keywordsAr: ['شاحنة', 'طبيب بيطري', 'سترة', 'كمان'],
        emoji: '🚐', color: '#6366f1', shadowColor: 'rgba(99, 102, 241, 0.4)' 
      },
    ]
  },
  {
    id: 8,
    title: 'Foundation 8: Ww Xx Yy Zz',
    titleAr: 'الوحدة الثامنة: و ك ي ز',
    story: {
      title: 'Our World',
      panels: [
        { text: 'That fox has a box.', emoji: '🦊📦' },
        { text: 'That wolf has a watch.', emoji: '🐺⌚' },
        { text: 'What do you have?', emoji: '❓🤨' },
        { text: 'I have an umbrella!', emoji: '☂️🌈' }
      ]
    },
    letters: [
      { 
        letter: 'W', word: 'Wolf', wordAr: 'ذئب', 
        nickname: 'Wise Wolf', nicknameAr: 'الذئب الحكيم',
        keywords: ['Wolf', 'Web', 'Water', 'Watch'], 
        keywordsAr: ['ذئب', 'شبكة', 'ماء', 'ساعة'],
        emoji: '🐺', color: '#4b5563', shadowColor: 'rgba(75, 85, 99, 0.4)' 
      },
      { 
        letter: 'X', word: 'Fox', wordAr: 'ثعلب', 
        nickname: 'Fox in a box', nicknameAr: 'ثعلب في صندوق',
        keywords: ['Fox', 'Box', 'Six', 'Wax'], 
        keywordsAr: ['ثعلب', 'صندوق', 'ستة', 'شمع'],
        emoji: '🦊', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' 
      },
      { 
        letter: 'Y', word: 'Yo-yo', wordAr: 'يويو', 
        nickname: 'Yellow Yo-yo', nicknameAr: 'اليويو الأصفر',
        keywords: ['Yo-yo', 'Yak', 'Yogurt', 'Yacht'], 
        keywordsAr: ['يويو', 'ياك', 'زبادي', 'يخت'],
        emoji: '🪀', color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' 
      },
      { 
        letter: 'Z', word: 'Zebra', wordAr: 'حمار وحشي', 
        nickname: 'Zigzag Zipper', nicknameAr: 'سحاب متعرج',
        keywords: ['Zebra', 'Zero', 'Zoo', 'Zipper'], 
        keywordsAr: ['حمار وحشي', 'صفر', 'حديقة حيوان', 'سحاب'],
        emoji: '🦓', color: '#111827', shadowColor: 'rgba(17, 24, 39, 0.4)' 
      },
    ]
  }
];

export const LettersLesson = ({ lang, onBack, onComplete }: { lang: Language, onBack: () => void, onComplete?: (score: number, total: number) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeLevel, setActiveLevel] = useState(1);
  const [activeLetter, setActiveLetter] = useState<LetterOption | null>(null);
  const [viewingStory, setViewingStory] = useState(false);
  const [showExcellent, setShowExcellent] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [targetLetter, setTargetLetter] = useState<LetterOption | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [itemAttempts, setItemAttempts] = useState(0);
  const MAX_TOTAL_ATTEMPTS = 12;

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  const finishGame = useCallback((finalScore: number) => {
    speak(isRtl 
      ? `انتهى اللعب! نتيجتك هي ${finalScore} من ${MAX_TOTAL_ATTEMPTS}. عمل رائع!` 
      : `Game over! Your score is ${finalScore} out of ${MAX_TOTAL_ATTEMPTS}. Great job!`);
    setShowExcellent(true);
    if (onComplete) onComplete(finalScore, MAX_TOTAL_ATTEMPTS);
    setTimeout(() => {
      setShowExcellent(false);
      setGameMode(false);
      setScore(0);
      setTotalAttempts(0);
      setItemAttempts(0);
      setTargetLetter(null);
    }, 4000);
  }, [isRtl, speak, totalAttempts]);

  const startNewLevel = useCallback(() => {
    const currentGroup = LETTER_GROUPS.find(g => g.id === activeLevel) || LETTER_GROUPS[0];
    const randomIndex = Math.floor(Math.random() * currentGroup.letters.length);
    const newTarget = currentGroup.letters[randomIndex];
    setTargetLetter(newTarget);
    setItemAttempts(0);
    
    setTimeout(() => {
      speak(`Find the letter ${newTarget.letter}`);
    }, 500);
  }, [activeLevel, speak]);

  const toggleGameMode = () => {
    const nextMode = !gameMode;
    setGameMode(nextMode);
    if (nextMode) {
      setScore(0);
      setTotalAttempts(0);
      setItemAttempts(0);
      startNewLevel();
    } else {
      setTargetLetter(null);
    }
  };

  const handleLetterClick = (item: LetterOption) => {
    if (gameMode && targetLetter) {
        const currentTotal = totalAttempts + 1;
        setTotalAttempts(currentTotal);

        if (item.letter === targetLetter.letter) {
            const nextScore = score + 1;
            setScore(nextScore);
            
            if (currentTotal >= MAX_TOTAL_ATTEMPTS) {
              finishGame(nextScore);
              return;
            }

            speak(isRtl ? `ممتاز! هذا هو حرف ${item.letter}` : `Excellent! This is the letter ${item.letter}`);
            setShowExcellent(true);
            setTimeout(() => {
                setShowExcellent(false);
                startNewLevel();
            }, 1500);
        } else {
            const nextItemAttempts = itemAttempts + 1;
            if (nextItemAttempts >= 2) {
              speak(isRtl ? `لا بأس، لنجرب حرفاً آخر. هذا كان حرف ${targetLetter.letter}.` : `It's okay, let's try another letter. That was the letter ${targetLetter.letter}.`);
              
              if (currentTotal >= MAX_TOTAL_ATTEMPTS) {
                setTimeout(() => finishGame(score), 2000);
              } else {
                setTimeout(startNewLevel, 2000);
              }
            } else {
              setItemAttempts(nextItemAttempts);
              speak(isRtl ? `لا، هذا هو حرف ${item.letter}. حاول مرة أخرى!` : `No, that is the letter ${item.letter}. Try again!`);
            }
        }
    } else {
        setActiveLetter(item);
        speak(`${item.letter}. ${item.word}`);
        setShowExcellent(true);
        setTimeout(() => setShowExcellent(false), 2000);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
  };

  const currentGroup = LETTER_GROUPS.find(g => g.id === activeLevel) || LETTER_GROUPS[0];

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-x-hidden"
      style={{ backgroundColor: activeLetter ? `${activeLetter.color}15` : '#f8fafc' }}
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 md:mb-8 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center px-1">
          {gameMode ? (
            <div className="animate-bounce">
              <h1 className="text-2xl md:text-5xl font-black text-[#002147] mb-1 md:mb-2 tracking-tight">
                {isRtl ? `أين الحرف ${targetLetter?.letter}؟` : `Find the Letter ${targetLetter?.letter}!`}
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-[#002147] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" />
                  <span>{score}</span>
                </div>
                <div className="bg-white/80 text-[#002147] px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 border border-[#002147]/10">
                  <Star size={16} className="text-indigo-500" />
                  <span>{totalAttempts} / {MAX_TOTAL_ATTEMPTS}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">
                {t.letters}
              </h1>
              <div className="flex items-center justify-center gap-1.5 text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/80 shadow-sm">
                <Volume2 size={16} />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">{t.pressToHear}</span>
              </div>
            </>
          )}
        </div>

        <button 
          onClick={toggleGameMode}
          className={`w-12 h-12 md:w-16 md:h-16 shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center transition-all outline-none border ${
            gameMode 
            ? 'bg-[#002147] text-white border-white/20' 
            : 'bg-white text-[#C49E3A] border-slate-50 hover:bg-slate-50'
          }`}
        >
          <Gamepad2 size={24} />
        </button>
      </div>

      {!gameMode && (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 z-10">
           {LETTER_GROUPS.map((group) => (
             <button
               key={group.id}
               onClick={() => {
                 setActiveLevel(group.id);
                 setActiveLetter(null);
                 setViewingStory(false);
                 speak(group.title);
               }}
               className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all ${
                 activeLevel === group.id 
                 ? 'bg-[#002147] text-white shadow-xl scale-105' 
                 : 'bg-white text-[#002147] hover:bg-slate-50 border border-slate-100'
               }`}
             >
               {isRtl ? group.titleAr : group.title}
             </button>
           ))}
           {currentGroup.story && (
             <button
               onClick={() => {
                 setViewingStory(true);
                 setActiveLetter(null);
                 speak(isRtl ? 'لنقرأ قصة معاً!' : "Let's read a story together!");
               }}
               className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all ${
                 viewingStory 
                 ? 'bg-amber-400 text-[#002147] shadow-xl scale-105' 
                 : 'bg-white text-amber-500 hover:bg-amber-50 border border-amber-100'
               }`}
             >
               <div className="flex items-center gap-2">
                 <BookOpen size={16} />
                 {isRtl ? 'القصة' : 'STORY'}
               </div>
             </button>
           )}
        </div>
      )}

      {viewingStory && currentGroup.story && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10 px-4"
        >
           {currentGroup.story.panels.map((panel, pIdx) => (
             <motion.button
               key={pIdx}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: pIdx * 0.1 }}
               onClick={() => speak(panel.text)}
               className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-slate-50 flex flex-col items-center gap-6 hover:scale-105 transition-all text-center group"
             >
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">
                  {pIdx + 1}
                </div>
                <div className="text-8xl md:text-9xl group-hover:animate-bounce">
                  {panel.emoji}
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl w-full">
                  <p className="text-xl md:text-3xl font-black text-[#002147] tracking-tight">{panel.text}</p>
                </div>
             </motion.button>
           ))}
           <div className="md:col-span-2 flex justify-center mt-8">
              <button
                onClick={() => {
                  setViewingStory(false);
                  setActiveLetter(null);
                }}
                className="px-12 py-4 bg-slate-200 text-[#002147] rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest"
              >
                {isRtl ? 'العودة للحروف' : 'BACK TO LETTERS'}
              </button>
           </div>
        </motion.div>
      )}

      {!viewingStory && (
        <motion.div 
          key={activeLevel}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-6 w-full max-w-6xl z-10 px-2 ${gameMode ? 'mt-8' : ''}`}
        >
          {currentGroup.letters.map((item) => (
            <motion.button
              key={item.letter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleLetterClick(item)}
              className={`aspect-square bg-white rounded-[1.75rem] md:rounded-[2.5rem] shadow-md flex flex-col items-center justify-center gap-1 md:gap-2 relative group overflow-hidden border-4 transition-all ${
                activeLetter?.letter === item.letter ? 'border-slate-200' : 'border-slate-50'
              }`}
            >
              <span 
                className="text-4xl md:text-6xl font-black transition-transform group-activeList:scale-110"
                style={{ color: item.color }}
              >
                {item.letter}
              </span>
              <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100 shadow-inner">
                 {item.icon ? (
                   <item.icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: item.color }} />
                 ) : (
                   <span className="text-xl md:text-2xl">{item.emoji}</span>
                 )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {activeLetter && !gameMode && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="mt-6 mb-20 text-center z-10 max-w-4xl w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
             <div className="flex flex-col items-center">
                <div 
                  className="w-32 h-32 md:w-56 md:h-56 rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center text-white shadow-2xl border-4 md:border-8 border-white relative"
                  style={{ backgroundColor: activeLetter.color }}
                >
                    <span className="text-7xl md:text-[14rem] font-black">{activeLetter.letter}</span>
                </div>
                <div className="mt-6 md:mt-8 bg-white/90 backdrop-blur-md p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-white/50 w-full overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                       <span className="text-9xl font-black">{activeLetter.letter}</span>
                    </div>

                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isRtl ? 'صديق الصوتيات' : 'PHONICS FRIEND'}</p>
                    <h2 className="text-xl md:text-4xl font-black text-[#002147] mb-2 leading-tight">
                      {isRtl ? activeLetter.nicknameAr : activeLetter.nickname}
                    </h2>

                    <div className="flex items-center justify-center gap-3 bg-slate-50 py-3 rounded-2xl mb-4">
                      <span className="text-2xl md:text-3xl">{activeLetter.emoji}</span>
                      <p className="text-lg md:text-2xl font-black text-[#002147]">{activeLetter.letter} for {activeLetter.word}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <p className="text-base md:text-xl font-bold text-slate-400">{isRtl ? activeLetter.wordAr : ''}</p>
                    </div>
                </div>
             </div>

             <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[3rem] border-2 border-white/50 shadow-2xl">
                <h3 className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest mb-6">{isRtl ? 'كلمات الصوتيات' : 'PHONICS KEYWORDS'}</h3>
                <div className="grid grid-cols-2 gap-4">
                   {activeLetter.keywords.map((kw, idx) => (
                     <motion.button
                       key={kw}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={() => speak(kw)}
                       className="bg-white p-4 rounded-2xl md:rounded-3xl border-2 border-slate-50 shadow-sm flex flex-col items-center gap-2 group hover:border-[#002147]/10 transition-all"
                     >
                        <div className="text-2xl md:text-4xl group-hover:scale-125 transition-transform">
                          {idx === 0 ? activeLetter.emoji : '✨'}
                        </div>
                        <span className="font-black text-[#002147] text-sm md:text-lg">{kw}</span>
                        <span className="text-[10px] md:text-xs font-bold text-slate-400">{isRtl ? activeLetter.keywordsAr[idx] : ''}</span>
                     </motion.button>
                   ))}
                </div>

                <button
                  onClick={() => speak(`This is the sound of ${activeLetter.letter}. ${activeLetter.letter}... ${activeLetter.letter}... ${activeLetter.word}!`)}
                  className="w-full mt-6 py-4 bg-[#002147] text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Volume2 size={20} />
                  {isRtl ? 'استمع للنطق' : 'LISTEN TO SOUND'}
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExcellent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border-4 border-emerald-400 text-center">
              <PartyPopper size={64} className="mx-auto mb-4 text-emerald-500" />
              <h2 className="text-4xl font-black text-[#002147]">{t.excellent}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"
        />
      </div>

    </div>
  );
};
