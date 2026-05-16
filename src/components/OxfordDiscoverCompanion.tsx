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
  PlayCircle
} from 'lucide-react';

interface OxfordDiscoverCompanionProps {
  lang: Language;
  onBack: () => void;
}

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
      { id: 'u2-1', en: 'Brother', ar: 'أخ', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { id: 'u2-2', en: 'Sister', ar: 'أخت', img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80' },
      { id: 'u2-3', en: 'Grandmother', ar: 'جدة', img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=400&q=80' },
      { id: 'u2-4', en: 'Friends', ar: 'أصدقاء', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
    ]
  },
  {
    id: 3,
    titleEn: 'Unit 3: Market Day',
    titleAr: 'الوحدة الثالثة: يوم في السوق',
    descriptionEn: 'Buying and selling items at the local market.',
    descriptionAr: 'بيع وشراء الأشياء في السوق المحلي.',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    cards: [
      { id: 'u3-1', en: 'Market', ar: 'سوق', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400&q=80' },
      { id: 'u3-2', en: 'Apples', ar: 'تفاح', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80' },
      { id: 'u3-3', en: 'Bread', ar: 'خبز', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
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
      { id: 'u4-2', en: 'History', ar: 'تاريخ', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' },
      { id: 'u4-3', en: 'Column', ar: 'عمود', img: 'https://images.unsplash.com/photo-1568249826372-c515a4521873?auto=format&fit=crop&w=400&q=80' },
      { id: 'u4-4', en: 'Statue', ar: 'تمثال', img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80' },
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

  const selectedUnit = UNITS.find(u => u.id === selectedUnitId);

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
                                <img key={card.id} src={card.img} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
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
                {selectedUnit?.cards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:border-[#002147] transition-all">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={card.img} 
                          alt={card.en} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                ))}
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
