import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { OxfordUnitLesson } from './OxfordUnitLesson';
import { OXFORD_LESSONS } from '../data/oxfordLessonsData';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
  X,
  Square,
  CheckCircle2,
  Trophy,
  GraduationCap,
  MessageSquare
} from 'lucide-react';

interface OxfordDiscoverCompanionProps {
  lang: Language;
  onBack: () => void;
  initialUnitId?: string | number | null;
  userProfile?: any;
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
    <div className="flex flex-col items-center gap-4 py-8 px-12 bg-white rounded-3xl shadow-2xl border border-slate-100 animate-fade-in">
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

export const OXFORD_UNITS = OXFORD_LESSONS.map(lesson => ({
  id: lesson.id,
  titleEn: lesson.titleEn,
  titleAr: lesson.titleAr,
  descriptionEn: lesson.descriptionEn,
  descriptionAr: lesson.descriptionAr,
  color: lesson.color,
  lightColor: lesson.lightColor,
  cards: lesson.vocab.map(v => ({
    id: `v-${v.id}`,
    en: v.word,
    ar: v.ar,
    img: v.img
  }))
}));

export const OxfordDiscoverCompanion = ({ lang, onBack, initialUnitId, userProfile }: OxfordDiscoverCompanionProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [userResults, setUserResults] = useState<any[]>([]);

  useEffect(() => {
    if (initialUnitId) {
      setSelectedUnitId(String(initialUnitId));
    }
  }, [initialUnitId]);

  useEffect(() => {
    if (userProfile?.uid) {
      const fetchResults = async () => {
        try {
          const q = query(
            collection(db, 'lessonResults'),
            where('userId', '==', userProfile.uid)
          );
          const snap = await getDocs(q);
          const results: any[] = [];
          snap.forEach(doc => {
            results.push(doc.data());
          });
          setUserResults(results);
        } catch (e) {
          console.error("Error fetching lesson results in Oxford companion:", e);
        }
      };
      fetchResults();
    }
  }, [userProfile, selectedUnitId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<
    | 'phonics_heroes' 
    | 'oxford_reading_adventures' 
    | 'clil_discover' 
    | 'values_stories' 
    | 'project_time' 
    | 'grammar_friends' 
    | 'everyday_english'
  >('phonics_heroes');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const selectedUnit = OXFORD_UNITS.find(u => u.id === selectedUnitId);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

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
    return (
      <OxfordUnitLesson 
        lang={lang} 
        unitId={activeLessonId} 
        onBack={() => {
          setActiveLessonId(null);
          if (userProfile?.uid) {
            const fetchResults = async () => {
              try {
                const q = query(
                  collection(db, 'lessonResults'),
                  where('userId', '==', userProfile.uid)
                );
                const snap = await getDocs(q);
                const results: any[] = [];
                snap.forEach(doc => {
                  results.push(doc.data());
                });
                setUserResults(results);
              } catch (e) {
                console.error(e);
              }
            };
            fetchResults();
          }
        }} 
        userProfile={userProfile} 
      />
    );
  }

  const speak = (text: string, voiceLang: string, id: string) => {
    window.speechSynthesis.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }

    setSpeakingId(id);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
  };

  const filteredUnits = OXFORD_UNITS.filter(unit => {
    const matchesSearch = unit.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          unit.titleAr.includes(searchQuery);
    
    const lessonData = OXFORD_LESSONS.find(l => l.id === unit.id);
    if (!lessonData) return false;
    
    return matchesSearch && lessonData.category === viewMode;
  });

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
                  ? 'برنامج التعلّم الشامل من أكسفورد: تدريبات تفاعلية وقراءات متدرجة وصوتيات متميزة لبناء لغوي متين.' 
                  : 'A comprehensive educational experience designed from the esteemed Oxford Curriculum.'}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto gap-1 scrollbar-none w-full max-w-full">
                {[
                  { id: 'phonics_heroes', labelEn: 'Phonics Heroes', labelAr: 'أبطال الصوتيات', icon: Volume2 },
                  { id: 'oxford_reading_adventures', labelEn: 'Reading Adventures', labelAr: 'مغامرات القراءة', icon: Sparkles },
                  { id: 'clil_discover', labelEn: 'CLIL Discover', labelAr: 'اكتشف CLIL', icon: BookOpen },
                  { id: 'values_stories', labelEn: 'Values Stories', labelAr: 'قصص القيم', icon: Layers },
                  { id: 'project_time', labelEn: 'Project Time', labelAr: 'ساعة المشروع', icon: Trophy },
                  { id: 'grammar_friends', labelEn: 'Grammar Friends', labelAr: 'أصدقاء القواعد', icon: GraduationCap },
                  { id: 'everyday_english', labelEn: 'Everyday English', labelAr: 'الإنجليزية اليومية', icon: MessageSquare }
                ].map((sec) => {
                  const Icon = sec.icon;
                  const isActive = viewMode === sec.id;
                  return (
                    <button 
                      key={sec.id}
                      onClick={() => {
                        setViewMode(sec.id as any);
                        setSelectedUnitId(null);
                      }}
                      className={`px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 whitespace-nowrap ${isActive ? 'bg-[#002147] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                    >
                      <Icon size={14} />
                      {isRtl ? sec.labelAr : sec.labelEn}
                    </button>
                  );
                })}
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
                    setActiveLessonId(unit.id);
                  }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-between group transition-all text-left rtl:text-right"
                >
                  <div className="flex items-center gap-8">
                    <div className={`w-20 h-20 ${unit.color} text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <PlayCircle size={36} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#002147] mb-2">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                      <p className="text-slate-400 text-sm font-medium">{isRtl ? unit.descriptionAr : unit.descriptionEn}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                          <Sparkles size={12} className="text-blue-500" />
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{isRtl ? 'درس تفاعلي متوفر' : 'Interactive Lesson Available'}</span>
                        </div>
                        {(() => {
                          const res = userResults.find(r => r.lessonId === String(unit.id));
                          if (res) {
                            return (
                              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full shadow-sm text-[10px] font-bold">
                                <CheckCircle2 size={12} />
                                <span>{isRtl ? `تم (${res.score}/${res.total})` : `Completed (${res.score}/${res.total})`}</span>
                              </div>
                            );
                          }
                          return null;
                        })()}
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
                                onClick={() => speak(card.en, 'en-US', `${card.id}-en`)}
                                className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${speakingId === `${card.id}-en` ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                               >
                                 {speakingId === `${card.id}-en` ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
                                 <span className="text-[10px] font-black tracking-widest uppercase">EN</span>
                               </button>
                               <button 
                                onClick={() => speak(card.ar, 'ar-SA', `${card.id}-ar`)}
                                className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${speakingId === `${card.id}-ar` ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white'}`}
                               >
                                 {speakingId === `${card.id}-ar` ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
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
