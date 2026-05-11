import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  Volume2, 
  Search, 
  Languages, 
  BookOpen, 
  ArrowLeft,
  X,
  Play,
  Heart,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { UserProfile, CreditCost } from '../types';
import { deductCredits } from '../lib/firebase';

interface Story {
  id: string;
  titleEn: string;
  titleAr: string;
  content: string;
  level: string;
  image: string;
}

const STORIES: Story[] = [
  {
    id: '1',
    titleEn: 'The Little Hero',
    titleAr: 'البطل الصغير',
    level: 'A1',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    content: 'Once upon a time, there was a small boy named Sam. Sam loved to help everyone in his village. One day, he found a lost puppy near the river. He carried the puppy home and gave it some milk. The village was proud of the little hero.'
  },
  {
    id: '2',
    titleEn: 'A Weekend in London',
    titleAr: 'عطلة نهاية الأسبوع في لندن',
    level: 'A2',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
    content: 'London is a magnificent city with a rich history. Sarah visited the Big Ben and walked across the Tower Bridge. She stayed in a cozy hotel near the park. The British weather was rainy, but the atmosphere was magical. She bought several souvenirs for her family back home.'
  },
  {
    id: '3',
    titleEn: 'The Future of AI',
    titleAr: 'مستقبل الذكاء الاصطناعي',
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80',
    content: 'Artificial intelligence is rapidly transforming our global society. From healthcare diagnostics to autonomous vehicles, the integration of smart algorithms is enhancing efficiency. While ethical concerns remain a subject of debate, the potential for human augmentation through technology is undeniable. Modern education systems must adapt to this technological shift.'
  }
];

export const StoryLibrary = ({ lang, profile, onUpdateProfile, onNavigate }: { lang: Language, profile: UserProfile, onUpdateProfile: (p: UserProfile) => void, onNavigate: (v: any) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [wordData, setWordData] = useState<{ word: string; translation: string; pronunciation: string } | null>(null);
  const [loadingWord, setLoadingWord] = useState(false);
  const [deducting, setDeducting] = useState(false);

  const handleSelectStory = async (story: Story) => {
    if (selectedStory?.id === story.id) return;
    
    const credits = profile.credits || 0;
    if (credits < CreditCost.AUDIO_STORY) {
      alert(t.insufficientCredits);
      onNavigate('credits');
      return;
    }

    setDeducting(true);
    try {
      await deductCredits(profile.uid, CreditCost.AUDIO_STORY, `Audio Story: ${story.titleEn}`);
      onUpdateProfile({ ...profile, credits: credits - CreditCost.AUDIO_STORY });
      setSelectedStory(story);
    } catch (err) {
      console.error("Story deduction error:", err);
    } finally {
      setDeducting(false);
    }
  };

  const handleWordClick = async (word: string) => {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    setLoadingWord(true);
    setWordData({ word: cleanWord, translation: '', pronunciation: '' });

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const prompt = `Translate the English word "${cleanWord}" to Arabic and provide a phonetic pronunciation guide. Return JSON: { "translation": "...", "pronunciation": "..." }`;
      
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const text = result.text.replace(/```json|```/g, '').trim();
      const data = JSON.parse(text);
      setWordData({ word: cleanWord, ...data });
      
      // Speak the word
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Error translating word:", err);
    } finally {
      setLoadingWord(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (selectedStory) {
    return (
      <div className={`p-8 max-w-4xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <button 
          onClick={() => setSelectedStory(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold"
        >
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للمكتبة' : 'Back to Library'}
        </button>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0" />
          
          <header className="mb-12 text-center relative z-10">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">{selectedStory.level}</span>
            <h2 className="text-4xl font-black text-[#002147] mb-4">{isRtl ? selectedStory.titleAr : selectedStory.titleEn}</h2>
            <div className="flex items-center justify-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
               <span className="flex items-center gap-2"><BookOpen size={14} /> {selectedStory.content.split(' ').length} words</span>
               <span className="w-1 h-1 bg-slate-200 rounded-full" />
               <span className="text-blue-500">{t.clickWordHint}</span>
            </div>
          </header>

          <div className="relative z-10">
            <div className={`text-xl md:text-2xl font-serif leading-[2.5] text-slate-700 select-text ${isRtl ? 'text-right' : 'text-left'}`}>
              {selectedStory.content.split(' ').map((word, idx) => (
                <span 
                  key={idx}
                  onClick={() => handleWordClick(word)}
                  className="px-1.5 py-0.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors border border-transparent hover:border-blue-100 inline-block"
                >
                  {word}{' '}
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={() => speak(selectedStory.content)}
            className="mt-12 bg-[#002147] text-white px-8 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-[#C49E3A] transition-all shadow-xl shadow-blue-100 mx-auto"
          >
            <Volume2 size={24} />
            {isRtl ? 'استمع للقصة كاملة' : 'Listen to Full Story'}
          </button>
        </div>

        {/* Word Detail Popup */}
        <AnimatePresence>
          {wordData && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-12 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-50"
            >
              <div className="bg-[#002147] text-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-white flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1">
                    <h4 className="text-3xl font-black text-white">{wordData.word}</h4>
                    {loadingWord ? (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <button onClick={() => speak(wordData.word)} className="text-blue-400 hover:text-white transition-colors">
                        <Volume2 size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-4 italic">/ {wordData.pronunciation || '...'} /</p>
                  <div className="bg-white/10 px-4 py-2 rounded-xl inline-block">
                    <p className="text-xl font-black text-[#C49E3A]">{wordData.translation || '...'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWordData(null)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-12">
        <h2 className="text-3xl font-black text-[#002147]">{t.storyLibrary}</h2>
        <p className="text-slate-400 mt-1 font-medium">{isRtl ? 'طور مهارات القراءة والاستماع عبر مكتبة من القصص العالمية' : 'Develop reading and listening skills through a library of global stories'}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.map(story => (
          <motion.div 
            key={story.id}
            whileHover={{ y: -10 }}
            onClick={() => handleSelectStory(story)}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group cursor-pointer relative"
          >
            {deducting && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#002147] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <div className="h-48 relative overflow-hidden">
               <img src={story.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute top-4 left-4">
                  <span className="bg-[#C49E3A] text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">{story.level}</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-black text-xl mb-1">{isRtl ? story.titleAr : story.titleEn}</h3>
                    <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">{story.content.split(' ').length} {isRtl ? 'كلمة' : 'words'}</p>
                  </div>
               </div>
            </div>
            <div className="p-6">
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed italic">"{story.content}"</p>
              <div className="flex items-center justify-between">
                <button className="bg-slate-50 text-[#002147] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 group-hover:border-blue-600 group-hover:text-blue-600 transition-all flex items-center gap-2">
                  <Play size={12} fill="currentColor" />
                  {t.readNow}
                </button>
                <button className="text-slate-300 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mb-20" />
            <Languages size={40} className="mb-6 text-blue-200 opacity-50" />
            <h4 className="text-2xl font-black mb-4">{isRtl ? 'مساعد الترجمة الفوري' : 'Instant Translation Assistant'}</h4>
            <p className="text-blue-100 text-sm leading-relaxed mb-8 flex-1">
              {isRtl 
                ? 'لا تتوقف عند الكلمات الصعبة. اضغط على أي كلمة للحصول على ترجمة فورية ونطق صوتي دقيق مدعوم بالذكاء الاصطناعي.' 
                : "Don't stop at hard words. Click any word for instant translation and accurate AI-powered audio pronunciation."}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">1</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">2</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">3</div>
            </div>
         </div>

         <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-[2rem] flex items-center justify-center mb-6">
               <Search size={32} />
            </div>
            <h4 className="text-xl font-black text-[#002147] mb-2">{isRtl ? 'ابحث عن قصتك المفضلة' : 'Search Your Favorite Story'}</h4>
            <p className="text-slate-400 text-sm mb-8">{isRtl ? 'نظام البحث الذكي سيساعدك في إيجاد المحتوى المناسب لمستواك.' : 'Smart search will help you find content matching your level.'}</p>
            <div className="w-full max-w-md relative">
              <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-4 px-12 focus:outline-none focus:border-blue-600 transition-all font-medium text-sm" placeholder={isRtl ? 'ابحث هنا...' : 'Search here...'} />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
         </div>
      </div>
    </div>
  );
};
