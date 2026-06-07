import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { AILessonCompanion } from './AILessonCompanion';

import { 
  Volume2, 
  Languages, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  BrainCircuit,
  MessageSquare,
  Play,
  Pause,
  ArrowLeft,
  Sparkles,
  Square
} from 'lucide-react';

interface AudioSync {
  word: string;
  start: number;
  end: number;
}

interface OxfordLessonProps {
  lang: Language;
  onComplete: () => void;
  onBack: () => void;
}

const LESSON_DATA = {
  id: 'oxford-1',
  level: 'A1',
  titleEn: 'Meeting People',
  titleAr: 'مقابلة الأشخاص',
  tabs: ['prep', 'expl', 'exercise', 'quiz'],
  intro: {
    en: "Welcome to your first Oxford Reading Lesson. Today we learn how to greet people politely.",
    ar: "أهلاً بك في درس أوكسفورد الأول للقراءة. اليوم سنتعلم كيفية تحية الناس بلباقة."
  },
  content: [
    {
      id: 'p1',
      en: "Hello, my name is Alex. What is your name?",
      ar: "مرحباً، اسمي أليكس. ما هو اسمك؟",
      audioEn: "alex_intro_en",
      audioAr: "alex_intro_ar",
      sync: [
        { word: "Hello,", start: 0, end: 1 },
        { word: "my", start: 1, end: 1.5 },
        { word: "name", start: 1.5, end: 2 },
        { word: "is", start: 2, end: 2.5 },
        { word: "Alex.", start: 2.5, end: 3.5 }
      ]
    },
    {
      id: 'p2',
      en: "Nice to meet you, Alex. I am Sara.",
      ar: "تشرفت بمقابلتك يا أليكس. أنا سارة.",
      audioEn: "sara_intro_en",
      audioAr: "sara_intro_ar"
    }
  ],
  explanation: {
    titleEn: "Using 'My name is'",
    titleAr: "استخدام 'My name is'",
    contentEn: "We use 'My name is' to introduce ourselves in both formal and informal situations.",
    contentAr: "نستخدم 'My name is' للتعريف عن أنفسنا في المواقف الرسمية وغير الرسمية."
  },
  quiz: [
    {
      question: "Choose the correct greeting:",
      options: ["Good bye", "Hello", "Thank you"],
      correct: 1
    }
  ]
};

export const OxfordLesson = ({ lang, onComplete, onBack }: OxfordLessonProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState('prep');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);

  const speak = (text: string, voiceLang: string, id: string) => {
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    if (playingId === id) {
      setPlayingId(null);
      return;
    }

    setPlayingId(id);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang; // 'en-US' or 'ar-SA'
    
    // Simple mock sync for demo
    let timer: any;
    if (voiceLang === 'en-US' && activeTab === 'expl') {
      let startTime = Date.now();
      timer = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setCurrentTime(elapsed);
        if (elapsed > 4) { // Mock end
          clearInterval(timer);
          setPlayingId(null);
          setCurrentTime(0);
        }
      }, 100);
    }

    utterance.onend = () => {
      setPlayingId(null);
      setCurrentTime(0);
      if (timer) clearInterval(timer);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`p-4 md:p-8 max-w-5xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold">
        <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
        {isRtl ? 'العودة للمنهج' : 'Back to Curriculum'}
      </button>

      <header className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
             <BookOpen size={32} />
          </div>
          <div>
            <span className="bg-[#C49E3A] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-1 inline-block">{LESSON_DATA.level}</span>
            <h2 className="text-2xl font-black text-[#002147]">{isRtl ? LESSON_DATA.titleAr : LESSON_DATA.titleEn}</h2>
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
           <Sparkles className="text-[#C49E3A]" size={18} />
           <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest">{t.oxfordMethod}</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white p-2 rounded-[2rem] border border-slate-200 mb-8 shadow-sm">
        {LESSON_DATA.tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            {(t[`${tab}Tab` as keyof typeof t] as string) || tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'prep' && (
          <motion.div 
            key="prep"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-sm text-center"
          >
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Sparkles size={48} />
            </div>
            <h3 className="text-3xl font-black text-[#002147] font-serif mb-6">{LESSON_DATA.intro.en}</h3>
            <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-2xl mx-auto">{LESSON_DATA.intro.ar}</p>
            <button 
              onClick={() => setActiveTab('expl')}
              className="mt-12 bg-[#002147] text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-[#C49E3A] transition-all shadow-xl shadow-blue-100 inline-flex items-center gap-4"
            >
              Ready to Start
              <ChevronRight size={18} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </motion.div>
        )}

        {activeTab === 'expl' && (
          <motion.div 
             key="expl"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="space-y-8"
          >
            {LESSON_DATA.content.map((item, idx) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center group hover:border-[#C49E3A] transition-colors">
                <div className="md:col-span-8">
                  <div className="flex flex-wrap gap-2 text-2xl md:text-3xl font-serif text-[#002147] leading-relaxed mb-4">
                    {item.en.split(' ').map((word, wIdx) => {
                       const isHighlighted = playingId === item.en && idx === 0 && (currentTime > wIdx * 0.5 && currentTime < (wIdx + 1) * 0.5);
                       return (
                        <span key={wIdx} className={`px-1 rounded-lg transition-colors ${isHighlighted ? 'bg-amber-100 text-[#C49E3A]' : ''}`}>
                          {word}
                        </span>
                       );
                    })}
                  </div>
                  <p className="text-lg text-slate-400 font-bold">{item.ar}</p>
                </div>
                <div className="md:col-span-4 flex justify-end gap-3">
                   <button 
                     onClick={() => speak(item.en, 'en-US', `${item.id}-en`)}
                     className={`flex-1 md:flex-none aspect-square w-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-sm ${playingId === `${item.id}-en` ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                   >
                     {playingId === `${item.id}-en` ? <Square size={24} fill="currentColor" /> : <Volume2 size={24} />}
                     <span className="text-[8px] font-black">{t.listenEN}</span>
                   </button>
                   <button 
                     onClick={() => speak(item.ar, 'ar-SA', `${item.id}-ar`)}
                     className={`flex-1 md:flex-none aspect-square w-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-sm ${playingId === `${item.id}-ar` ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-[#C49E3A] hover:bg-[#C49E3A] hover:text-white'}`}
                   >
                     {playingId === `${item.id}-ar` ? <Square size={24} fill="currentColor" /> : <Languages size={24} />}
                     <span className="text-[8px] font-black">{t.listenAR}</span>
                   </button>
                </div>
              </div>
            ))}

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 bg-[#C49E3A] rounded-xl flex items-center justify-center">💡</div>
                 <h4 className="text-xl font-black">{isRtl ? LESSON_DATA.explanation.titleAr : LESSON_DATA.explanation.titleEn}</h4>
              </div>
              <p className="text-blue-100 font-medium leading-relaxed">{isRtl ? LESSON_DATA.explanation.contentAr : LESSON_DATA.explanation.contentEn}</p>
            </div>
          </motion.div>
        )}

        {/* Exercises & Quiz omitted for brevity in first draft, can be added later */}
      </AnimatePresence>

      <AILessonCompanion lesson={LESSON_DATA} isRtl={isRtl} />
    </div>
  );
};
