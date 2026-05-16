import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { OxfordUnitLesson } from './OxfordUnitLesson';
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  Volume2, 
  Search,
  ChevronRight,
  Sparkles,
  Layers,
  BookOpen,
  PlayCircle,
  Mic,
  RotateCcw,
  Check,
  X
} from 'lucide-react';

interface OxfordDiscoverCompanionProps {
  lang: Language;
  onBack: () => void;
}

const PronunciationTrainer = ({ word, onResult }: { word: string, onResult: (success: boolean) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<'idle' | 'recording' | 'success' | 'fail'>('idle');

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Your browser does not support Speech Recognition.');
        return;
    }

    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
        setIsRecording(true);
        setStatus('recording');
    };

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes(word.toLowerCase())) {
            setStatus('success');
            setTimeout(() => onResult(true), 1500);
        } else {
            const nextAttempts = attempts + 1;
            setAttempts(nextAttempts);
            if (nextAttempts >= 2) {
                setStatus('fail');
                setTimeout(() => onResult(false), 1500);
            } else {
                setStatus('idle');
            }
        }
    };

    recognition.onerror = () => {
        setIsRecording(false);
        setStatus('idle');
    };

    recognition.onend = () => {
        setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8 px-12 bg-white rounded-3xl shadow-2xl border border-slate-100">
      <div className="text-center mb-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Practice Word</span>
        <h3 className="text-4xl font-black text-[#002147] tracking-tight uppercase">{word}</h3>
      </div>

      <div className="relative">
         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            disabled={status === 'success' || status === 'fail' || isRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              status === 'recording' ? 'bg-red-500 text-white animate-pulse' :
              status === 'success' ? 'bg-emerald-500 text-white' :
              status === 'fail' ? 'bg-rose-500 text-white' :
              'bg-[#002147] text-white hover:bg-blue-600'
            }`}
         >
           {status === 'recording' ? <Mic size={32} /> : 
            status === 'success' ? <Check size={32} /> :
            status === 'fail' ? <X size={32} /> :
            <Mic size={32} />}
         </motion.button>
         
         {isRecording && (
           <motion.div 
             initial={{ scale: 1 }}
             animate={{ scale: [1, 1.5, 1] }}
             transition={{ repeat: Infinity, duration: 1.5 }}
             className="absolute inset-0 rounded-full bg-red-500/20 -z-10"
           />
         )}
      </div>

      <div className="mt-4 text-center">
         <p className="text-sm font-bold text-slate-500">
           {status === 'recording' ? 'Listening...' : 
            status === 'success' ? 'Perfect Pronunciation!' :
            status === 'fail' ? 'Moving to next word...' :
            `You have ${2 - attempts} attempts left`}
         </p>
         {attempts > 0 && status === 'idle' && (
           <p className="text-xs text-rose-500 font-black mt-2 uppercase tracking-tighter">Try Again!</p>
         )}
      </div>
    </div>
  );
};

const UNITS = [
  {
    id: 1,
    titleEn: 'Unit 1: The World Around Us',
    titleAr: 'الوحدة الأولى: العالم من حولنا',
    descriptionEn: 'Explore nature, weather, and basic elements.',
    descriptionAr: 'استكشف الطبيعة والطقس والعناصر الأساسية.',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    cards: [
      { id: 'u1-1', en: 'Mountain', ar: 'جبل', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { id: 'u1-2', en: 'River', ar: 'نهر', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80' },
      { id: 'u1-3', en: 'Forest', ar: 'غابة', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
      { id: 'u1-4', en: 'Cloud', ar: 'سحابة', img: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 2,
    titleEn: 'Unit 2: Family and Friends',
    titleAr: 'الوحدة الثانية: العائلة والأصدقاء',
    descriptionEn: 'Common interactions and family members.',
    descriptionAr: 'التفاعلات الشائعة وأفراد العائلة.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    cards: [
      { id: 'u2-1', en: 'Grandmother', ar: 'جدة', img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80' },
      { id: 'u2-2', en: 'Baby', ar: 'طفل رضيع', img: 'https://images.unsplash.com/photo-1519689689253-ab9750242f77?auto=format&fit=crop&w=400&q=80' },
      { id: 'u2-3', en: 'Neighbors', ar: 'جيران', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=400&q=80' },
      { id: 'u2-4', en: 'Friends', ar: 'أصدقاء', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 3,
    titleEn: 'Unit 3: Market Day',
    titleAr: 'الوحدة الثالثة: يوم في السوق',
    descriptionEn: 'Buying and selling items at the local market.',
    descriptionAr: 'بيع شراء الأشياء في السوق المحلي.',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    cards: [
      { id: 'u3-1', en: 'Market', ar: 'سوق', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400&q=80' },
      { id: 'u3-2', en: 'Apples', ar: 'تفاح', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80' },
      { id: 'u3-3', en: 'Vendor', ar: 'بائع', img: 'https://images.unsplash.com/photo-1543083477-4f7f44aad226?auto=format&fit=crop&w=400&q=80' },
      { id: 'u3-4', en: 'Coins', ar: 'عملات', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 4,
    titleEn: 'Unit 4: Ancient History',
    titleAr: 'الوحدة الرابعة: التاريخ القديم',
    descriptionEn: 'Discovering temples and historical sites.',
    descriptionAr: 'اكتشاف المعابد والمواقع التاريخية.',
    color: 'bg-stone-500',
    lightColor: 'bg-stone-50',
    cards: [
      { id: 'u4-1', en: 'Temple', ar: 'معبد', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
      { id: 'u4-2', en: 'Pyramid', ar: 'هرم', img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80' },
      { id: 'u4-3', en: 'Statue', ar: 'تمثال', img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80' },
      { id: 'u4-4', en: 'Ancient Ruins', ar: 'أطلال قديمة', img: 'https://images.unsplash.com/photo-1508919892451-4b8495bc441d?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 5,
    titleEn: 'Unit 5: Animal Homes',
    titleAr: 'الوحدة الخامسة: بيوت الحيوانات',
    descriptionEn: 'Where do animals live?',
    descriptionAr: 'أين تعيش الحيوانات؟',
    color: 'bg-green-600',
    lightColor: 'bg-green-50',
    cards: [
      { id: 'u5-1', en: 'Nest', ar: 'عش', img: 'https://images.unsplash.com/photo-1549491763-715783339031?auto=format&fit=crop&w=400&q=80' },
      { id: 'u5-2', en: 'Cave', ar: 'كهف', img: 'https://images.unsplash.com/photo-1578891086254-20510103738e?auto=format&fit=crop&w=400&q=80' },
      { id: 'u5-3', en: 'Burrow', ar: 'جحر', img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=400&q=80' },
      { id: 'u5-4', en: 'Hive', ar: 'خلية', img: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 6,
    titleEn: 'Unit 6: Protecting Our Earth',
    titleAr: 'الوحدة السادسة: حماية كوكبنا',
    descriptionEn: 'How can we help the environment?',
    descriptionAr: 'كيف يمكننا مساعدة البيئة؟',
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    cards: [
      { id: 'u6-1', en: 'Recycle', ar: 'إعادة تدوير', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80' },
      { id: 'u6-2', en: 'Plant', ar: 'نبتة', img: 'https://images.unsplash.com/photo-1416870230247-d0613a53047a?auto=format&fit=crop&w=400&q=80' },
      { id: 'u6-3', en: 'Solar Power', ar: 'طاقة شمسية', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' },
      { id: 'u6-4', en: 'Ocean', ar: 'محيط', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 7,
    titleEn: 'Unit 7: Real Life Heroes',
    titleAr: 'الوحدة السابعة: أبطال من الواقع',
    descriptionEn: 'People who make a difference.',
    descriptionAr: 'أشخاص يحدثون فرقاً.',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    cards: [
      { id: 'u7-1', en: 'Firefighter', ar: 'رجل إطفاء', img: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&w=400&q=80' },
      { id: 'u7-2', en: 'Doctor', ar: 'طبيب', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80' },
      { id: 'u7-3', en: 'Scientist', ar: 'عالم', img: 'https://images.unsplash.com/photo-1532187875605-1ef6c237f1f1?auto=format&fit=crop&w=400&q=80' },
      { id: 'u7-4', en: 'Volunteer', ar: 'متطوع', img: 'https://images.unsplash.com/photo-1559027615-cd99c59630d6?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 8,
    titleEn: 'Unit 8: Delicious Food',
    titleAr: 'الوحدة الثامنة: طعام لذيذ',
    descriptionEn: 'Learning about different cuisines.',
    descriptionAr: 'التعرف على المطابخ المختلفة.',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    cards: [
      { id: 'u8-1', en: 'Ingredients', ar: 'مكونات', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { id: 'u8-2', en: 'Recipe', ar: 'وصفة', img: 'https://images.unsplash.com/photo-1466632346940-bf69ff716dba?auto=format&fit=crop&w=400&q=80' },
      { id: 'u8-3', en: 'Healthy', ar: 'صحي', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80' },
      { id: 'u8-4', en: 'Spices', ar: 'توابل', img: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 9,
    titleEn: 'Unit 9: Fast Transportation',
    titleAr: 'الوحدة التاسعة: وسائل النقل السريعة',
    descriptionEn: 'How we move from place to place.',
    descriptionAr: 'كيف ننتقل من مكان لآخر.',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    cards: [
      { id: 'u9-1', en: 'Airplane', ar: 'طائرة', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80' },
      { id: 'u9-2', en: 'Train', ar: 'قطار', img: 'https://images.unsplash.com/photo-1474487548417-781f2f4817bd?auto=format&fit=crop&w=400&q=80' },
      { id: 'u9-3', en: 'Ship', ar: 'سفينة', img: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=400&q=80' },
      { id: 'u9-4', en: 'Bicycle', ar: 'دراجة هوائية', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 10,
    titleEn: 'Unit 10: Outer Space',
    titleAr: 'الوحدة العاشرة: الفضاء الخارجي',
    descriptionEn: 'Planets, stars, and galaxies.',
    descriptionAr: 'الكواكب والنجوم والمجرات.',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50',
    cards: [
      { id: 'u10-1', en: 'Planet', ar: 'كوكب', img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=400&q=80' },
      { id: 'u10-2', en: 'Astronaut', ar: 'رائد فضاء', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80' },
      { id: 'u10-3', en: 'Rocket', ar: 'صاروخ', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=400&q=80' },
      { id: 'u10-4', en: 'Stars', ar: 'نجوم', img: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 11,
    titleEn: 'Unit 11: Modern Technology',
    titleAr: 'الوحدة الحادية عشرة: التكنولوجيا الحديثة',
    descriptionEn: 'Inventions that changed the world.',
    descriptionAr: 'اختراعات غيرت العالم.',
    color: 'bg-slate-700',
    lightColor: 'bg-slate-50',
    cards: [
      { id: 'u11-1', en: 'Computer', ar: 'حاسوب', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80' },
      { id: 'u11-2', en: 'Robot', ar: 'روبوت', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80' },
      { id: 'u11-3', en: 'Smartphone', ar: 'هاتف ذكي', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
      { id: 'u11-4', en: 'Internet', ar: 'إنترنت', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 12,
    titleEn: 'Unit 12: The World of Art',
    titleAr: 'الوحدة الثانية عشرة: عالم الفن',
    descriptionEn: 'Expressing feelings through art.',
    descriptionAr: 'التعبير عن المشاعر من خلال الفن.',
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    cards: [
      { id: 'u12-1', en: 'Painting', ar: 'لوحة فنية', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
      { id: 'u12-2', en: 'Sculpture', ar: 'منحوتة', img: 'https://images.unsplash.com/photo-1554181067-56006e3bb42d?auto=format&fit=crop&w=400&q=80' },
      { id: 'u12-3', en: 'Colors', ar: 'ألوان', img: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=400&q=80' },
      { id: 'u12-4', en: 'Museum', ar: 'متحف', img: 'https://images.unsplash.com/photo-1518998053502-53ec8a29b7ee?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 13,
    titleEn: 'Unit 13: Under the Sea',
    titleAr: 'الوحدة الثالثة عشرة: تحت البحر',
    descriptionEn: 'Discovering marine life.',
    descriptionAr: 'اكتشاف الحياة البحرية.',
    color: 'bg-cyan-600',
    lightColor: 'bg-cyan-50',
    cards: [
      { id: 'u13-1', en: 'Dolphin', ar: 'دولفين', img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=400&q=80' },
      { id: 'u13-2', en: 'Coral Reef', ar: 'شعاب مرجانية', img: 'https://images.unsplash.com/photo-1546026423-9d2116091386?auto=format&fit=crop&w=400&q=80' },
      { id: 'u13-3', en: 'Whale', ar: 'حوت', img: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=400&q=80' },
      { id: 'u13-4', en: 'Shark', ar: 'قرش', img: 'https://images.unsplash.com/photo-1560273552-32957b46c33b?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 14,
    titleEn: 'Unit 14: Stay Healthy',
    titleAr: 'الوحدة الرابعة عشرة: ابقَ بصحة جيدة',
    descriptionEn: 'Exercise and nutrition for a better life.',
    descriptionAr: 'التمارين والتغذية لحياة أفضل.',
    color: 'bg-lime-500',
    lightColor: 'bg-lime-50',
    cards: [
      { id: 'u14-1', en: 'Exercise', ar: 'تمارين', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80' },
      { id: 'u14-2', en: 'Vegetables', ar: 'خضروات', img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80' },
      { id: 'u14-3', en: 'Water', ar: 'ماء', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80' },
      { id: 'u14-4', en: 'Sleep', ar: 'نوم', img: 'https://images.unsplash.com/photo-1520206159889-623126a3375a?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 15,
    titleEn: 'Unit 1: Harbin Ice and Snow Festival',
    titleAr: 'الوحدة الأولى: مهرجان هاربين للجليد والثلج',
    descriptionEn: 'Reading comprehension about the famous winter festival in China.',
    descriptionAr: 'قراءة وفهم حول مهرجان الشتاء الشهير في الصين.',
    color: 'bg-sky-500',
    lightColor: 'bg-sky-50',
    cards: [
      { id: 'u15-1', en: 'Ice Sculpture', ar: 'منحوتة جليدية', img: 'https://images.unsplash.com/photo-1516901869830-360ec31c9641?auto=format&fit=crop&w=400&q=80' },
      { id: 'u15-2', en: 'Ice Lantern', ar: 'فانوس جليدي', img: 'https://images.unsplash.com/photo-1547481846-95f74577264a?auto=format&fit=crop&w=400&q=80' },
      { id: 'u15-3', en: 'Ice Hockey', ar: 'هوكي الجليد', img: 'https://images.unsplash.com/photo-1551323315-08e8b611867c?auto=format&fit=crop&w=400&q=80' },
      { id: 'u15-4', en: 'Athletes', ar: 'رياضيون', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' },
    ]
  }
];

export const OxfordDiscoverCompanion = ({ lang, onBack }: OxfordDiscoverCompanionProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'bank' | 'lessons'>('bank');
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingIndex, setTrainingIndex] = useState(0);

  const selectedUnit = UNITS.find(u => u.id === selectedUnitId);

  const handleTrainingResult = (success: boolean) => {
    if (selectedUnit && trainingIndex < selectedUnit.cards.length - 1) {
       setTrainingIndex(prev => prev + 1);
    } else {
       setIsTraining(false);
       setTrainingIndex(0);
       setSelectedUnitId(null);
    }
  };

  if (activeLessonId) {
    return <OxfordUnitLesson lang={lang} unitId={activeLessonId} onBack={() => setActiveLessonId(null)} />;
  }

  const speak = (text: string, voiceLang: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    window.speechSynthesis.speak(utterance);
  };

  const filteredUnits = UNITS.filter(unit => 
    unit.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
    unit.titleAr.includes(searchQuery)
  );

  return (
    <div className={`flex-1 p-6 md:p-12 overflow-y-auto ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold">
          <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}
        </button>

        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#002147] p-3 rounded-2xl text-white shadow-lg">
                  <Layers size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight">{t.oxfordCompanion}</h1>
              </div>
              <p className="text-slate-400 font-medium text-lg max-w-2xl">
                {isRtl 
                  ? 'بنك الصور التعليمي والدروس المصاحبة لمنهج Oxford Discover 3، يساعدك على التعلم بطريقة تفاعلية.' 
                  : 'The visual companion and interactive lessons for the Oxford Discover 3 curriculum.'}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button 
                  onClick={() => setViewMode('bank')}
                  className={`flex-1 md:px-6 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'bank' ? 'bg-white text-[#002147] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <ImageIcon size={18} />
                  {isRtl ? 'بنك الصور' : 'Visual Bank'}
                </button>
                <button 
                  onClick={() => setViewMode('lessons')}
                  className={`flex-1 md:px-6 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${viewMode === 'lessons' ? 'bg-white text-[#002147] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <BookOpen size={18} />
                  {isRtl ? 'الدروس التفاعلية' : 'Lessons'}
                </button>
              </div>

              <div className="relative w-full md:w-80">
                <input 
                  type="text"
                  placeholder={isRtl ? 'بحث في الوحدات...' : 'Search units...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pl-12 text-sm focus:outline-none focus:border-[#002147] transition-all shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!selectedUnitId ? (
            <motion.div 
              key={`${viewMode}-list`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {filteredUnits.length > 0 ? filteredUnits.map((unit) => (
                <motion.button
                  key={unit.id}
                  whileHover={{ y: -5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (viewMode === 'lessons') {
                      setActiveLessonId(unit.id);
                    } else {
                      setSelectedUnitId(unit.id);
                    }
                  }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-between group transition-all text-left rtl:text-right"
                >
                  <div className="flex items-center gap-8">
                    <div className={`w-20 h-20 ${unit.color} text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {viewMode === 'lessons' ? <PlayCircle size={36} /> : <BookOpen size={36} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#002147] mb-2">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                      <p className="text-slate-400 text-sm font-medium">{isRtl ? unit.descriptionAr : unit.descriptionEn}</p>
                      <div className="mt-4 flex items-center gap-2">
                        {viewMode === 'bank' ? (
                          <>
                            <div className="flex -space-x-2 rtl:space-x-reverse">
                              {unit.cards.slice(0, 3).map((card, idx) => (
                                <img key={card.id} src={card.img} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border-2 border-white object-cover bg-slate-100" />
                              ))}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+{unit.cards.length} Images</span>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                            <Sparkles size={12} className="text-blue-500" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{isRtl ? 'درس تفاعلي متوفر' : 'Interactive Lesson Available'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-all shadow-inner">
                    <ChevronRight size={24} className={isRtl ? 'rotate-180' : ''} />
                  </div>
                </motion.button>
              )) : (
                <div className="col-span-full py-20 text-center opacity-40">
                  <ImageIcon size={64} className="mx-auto mb-6" />
                  <p className="text-xl font-bold">{isRtl ? 'لا توجد وحدات مطابقة للبحث' : 'No units match your search'}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="unit-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedUnitId(null)}
                    className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#002147] hover:border-[#002147] transition-all"
                  >
                    <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter ${selectedUnit?.color}`}>{isRtl ? 'الوحدة المختارة' : 'SELECTED UNIT'}</span>
                    <h2 className="text-2xl font-black text-[#002147]">{isRtl ? selectedUnit?.titleAr : selectedUnit?.titleEn}</h2>
                  </div>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
                   <Sparkles className="text-[#C49E3A]" size={18} />
                   <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest">{isRtl ? 'تفاعل وتعلم' : 'INTERACTIVE LEARNING'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="wait">
                  {isTraining ? (
                    <motion.div 
                      key="training-mode"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="col-span-full flex flex-col items-center py-20"
                    >
                       <div className="w-full max-w-lg mb-12 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 flex items-center justify-center text-slate-300">
                         <ImageIcon size={64} className="absolute opacity-20" />
                         <img 
                           src={selectedUnit?.cards[trainingIndex].img} 
                           alt="" 
                           referrerPolicy="no-referrer"
                           className="w-full h-80 object-cover relative z-10"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.style.display = 'none';
                           }}
                         />
                       </div>
                       <PronunciationTrainer 
                         word={selectedUnit?.cards[trainingIndex].en || ''} 
                         onResult={handleTrainingResult} 
                       />
                       <button 
                         onClick={() => { setIsTraining(false); setTrainingIndex(0); }}
                         className="mt-8 text-slate-400 font-black hover:text-[#002147] uppercase tracking-widest text-xs flex items-center gap-2"
                       >
                         <RotateCcw size={14} />
                         Cancel Training
                       </button>
                    </motion.div>
                  ) : (
                    selectedUnit?.cards.map((card) => (
                      <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.05 }}
                        className="group"
                      >
                        <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:border-[#002147] transition-all">
                          <div className="aspect-square relative overflow-hidden bg-slate-100 flex items-center justify-center text-slate-300">
                             <ImageIcon size={48} className="absolute opacity-20" />
                             <img 
                               src={card.img} 
                               alt={card.en} 
                               referrerPolicy="no-referrer"
                               loading="lazy"
                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                               onError={(e) => {
                                 (e.target as HTMLImageElement).style.opacity = '0';
                               }}
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-30">
                               <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const idx = selectedUnit.cards.findIndex(c => c.id === card.id);
                                  setTrainingIndex(idx);
                                  setIsTraining(true);
                                }}
                                className="w-10 h-10 bg-[#002147] text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                                title="Practice Pronunciation"
                               >
                                  <Mic size={18} />
                               </button>
                            </div>
                          </div>
                          <div className="p-6 text-center">
                            <h4 className="text-lg font-black text-[#002147] mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{card.en}</h4>
                            <p className="text-sm font-bold text-slate-400 mb-4">{card.ar}</p>
                            <div className="flex gap-2">
                               <button 
                                onClick={() => speak(card.en, 'en-US')}
                                className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                               >
                                 <Volume2 size={16} />
                                 <span className="text-[10px] font-black tracking-widest uppercase">EN</span>
                               </button>
                               <button 
                                onClick={() => speak(card.ar, 'ar-SA')}
                                className="flex-1 bg-amber-50 text-amber-600 py-3 rounded-xl hover:bg-amber-600 hover:text-white transition-all flex items-center justify-center gap-2"
                               >
                                 <Volume2 size={16} />
                                 <span className="text-[10px] font-black tracking-widest uppercase">AR</span>
                               </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-16 p-8 bg-[#002147] rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 bg-[#C49E3A] rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    💡
                  </div>
                  <div className="flex-1 text-center md:text-left rtl:md:text-right">
                    <h4 className="text-xl font-black mb-2">{isRtl ? 'نصيحة تعليمية' : 'Learning Tip'}</h4>
                    <p className="text-blue-100 font-medium leading-relaxed">
                      {isRtl 
                        ? 'حاول ربط الكلمات بالصور في مخيلتك، واضغط على زر الصوت لتكرار النطق الصحيح عدة مرات.' 
                        : 'Try to visualize the words with the images in your mind, and click the audio buttons to repeat correct pronunciation multiple times.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
