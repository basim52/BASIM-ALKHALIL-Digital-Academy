import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, BookOpen, Volume2, Wand2, Loader2, Star, PartyPopper } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../../lib/translations';

interface MagicStoryModeProps {
  lang: Language;
  onBack: () => void;
  context?: string;
}

const THEMES = [
  { id: 'space', icon: '🚀', name: 'Space', nameAr: 'الفضاء', color: 'bg-indigo-600' },
  { id: 'jungle', icon: '🌴', name: 'Jungle', nameAr: 'الغابة', color: 'bg-emerald-600' },
  { id: 'ocean', icon: '🌊', name: 'Ocean', nameAr: 'المحيط', color: 'bg-blue-600' },
  { id: 'magic', icon: '✨', name: 'Magic', nameAr: 'السحر', color: 'bg-purple-600' },
];

export const MagicStoryMode: React.FC<MagicStoryModeProps> = ({ lang, onBack, context }) => {
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<{ title: string; paragraphs: string[]; emojis: string[] } | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const generateStory = async (themeId: string) => {
    setLoading(true);
    setStory(null);
    setCurrentStep(0);
    const theme = THEMES.find(t => t.id === themeId);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const prompt = `You are a professional children's storyteller.
      Write a very short (max 100 words), fun, and educational story for a 3-5 year old child. 
      THEME: ${theme?.name}.
      ADDITIONAL CONTEXT (Words learned today): ${context || 'None'}.
      
      Requirements:
      1. Use 3 simple paragraphs.
      2. Incorporate the words from Additional Context naturally.
      3. For each paragraph, provide one matching EMOJI that represents the scene.
      
      Output format: 
      Title: [Fun Title]
      Story: [Paragraph 1] | [Paragraph 2] | [Paragraph 3]
      Emojis: [Emoji 1], [Emoji 2], [Emoji 3]
      Language: ${lang === 'ar' ? 'Arabic' : 'English'}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            systemInstruction: "You are a friendly storyteller assistant for a kids learning app. Always respond in the requested language.",
            temperature: 0.9
        }
      });

      const text = response.text || "";
      const lines = text.split('\n').filter(l => l.trim() !== "");
      
      let title = isRtl ? "قصة سحرية" : "Magic Story";
      let storyText = "";
      let emojis: string[] = ['✨', '✨', '✨'];

      lines.forEach(line => {
        if (line.toLowerCase().startsWith('title:')) title = line.replace(/title:/i, '').trim();
        else if (line.toLowerCase().startsWith('story:')) storyText = line.replace(/story:/i, '').trim();
        else if (line.toLowerCase().startsWith('emojis:')) {
          const emojiStr = line.replace(/emojis:/i, '').trim();
          emojis = emojiStr.split(',').map(e => e.trim());
        }
      });

      const paragraphs = storyText.split('|').map(p => p.trim());

      setStory({ 
        title, 
        paragraphs: paragraphs.slice(0, 3),
        emojis: emojis.slice(0, 3)
      });
    } catch (error) {
      console.error("Story generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, [lang]);

  useEffect(() => {
    if (story && story.paragraphs[currentStep]) {
        speak(story.paragraphs[currentStep]);
    }
  }, [story, currentStep, speak]);

  return (
    <div className={`min-h-screen bg-[#F0F4FF] p-4 md:p-10 flex flex-col items-center relative overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="w-full max-w-4xl flex items-center justify-between mb-8 md:mb-12 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="text-yellow-500 w-5 h-5" />
                <h1 className="text-xl md:text-3xl font-black text-[#002147] tracking-tight">
                    {isRtl ? 'المغامرة السحرية' : 'Magic Adventure'}
                </h1>
            </div>
            <p className="text-[10px] md:text-sm font-bold text-indigo-400 uppercase tracking-widest">
                {isRtl ? 'قصص من وحي الخيال' : 'AI Powered Stories'}
            </p>
        </div>

        <div className="w-12 h-12 md:w-16 md:h-16 opacity-0" />
      </header>

      <main className="w-full max-w-3xl flex flex-col items-center justify-center flex-1 z-10">
        <AnimatePresence mode="wait">
          {!story && !loading && (
            <motion.div 
              key="start"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="text-center w-full"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mb-8 mx-auto relative group">
                <Wand2 size={40} className="text-indigo-600 transition-transform group-hover:rotate-12 group-hover:scale-110" strokeWidth={2.5} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl -z-10"
                />
              </div>

              <h2 className={`text-2xl md:text-3xl font-black text-[#002147] mb-8 ${isRtl ? 'font-tajawal' : ''}`}>
                {isRtl ? 'اختر موضوع قصتك اليوم' : 'Choose your story theme today'}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full">
                {THEMES.map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => generateStory(theme.id)}
                    className={`${theme.color} p-6 rounded-[2.5rem] text-white shadow-lg flex flex-col items-center group relative overflow-hidden`}
                  >
                    <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">{theme.icon}</span>
                    <span className={`font-black text-xs uppercase tracking-widest ${isRtl ? 'font-tajawal' : ''}`}>
                      {isRtl ? theme.nameAr : theme.name}
                    </span>
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20">
                      <Sparkles size={40} />
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
                {isRtl ? 'باسم الأكاديمية سيصنع لك قصة فريدة!' : 'Basim Academy will make a unique story for you!'}
              </p>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <Loader2 size={64} className="text-indigo-600 animate-spin" />
                <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-xl md:text-2xl font-black text-[#002147] animate-pulse">
                {isRtl ? 'جاري تحضير القصة...' : 'Magically writing your story...'}
              </p>
            </motion.div>
          )}

          {story && !loading && (
            <motion.div 
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-slate-100"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] md:text-sm font-black text-indigo-400 uppercase tracking-widest">
                    {isRtl ? 'فصل جديد' : 'Live Adventure'}
                  </span>
                  <div className="text-4xl">
                    {story.emojis[currentStep]}
                  </div>
                </div>

                <h2 className="text-2xl md:text-4xl font-black text-[#002147] mb-8 leading-tight">
                  {story.title}
                </h2>
                
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-12 h-[150px] md:h-[200px] flex items-center"
                >
                  <p className="text-xl md:text-3xl font-bold text-slate-700 leading-relaxed md:leading-snug">
                    {story.paragraphs[currentStep]}
                  </p>
                </motion.div>

                <div className="flex items-center justify-between">
                   <div className="flex gap-2">
                     {story.paragraphs.map((_, i) => (
                       <div 
                        key={i} 
                        className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-10 bg-indigo-600' : 'w-2 bg-slate-100'}`} 
                       />
                     ))}
                   </div>
                   
                   <div className="flex gap-2">
                     <button 
                        onClick={() => speak(story.paragraphs[currentStep])}
                        className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors shadow-inner"
                     >
                       <Volume2 size={24} />
                     </button>
                     
                     {currentStep < story.paragraphs.length - 1 ? (
                       <button 
                         onClick={() => setCurrentStep(prev => prev + 1)}
                         className="bg-[#002147] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                       >
                         {isRtl ? 'المتابعة' : 'Continue'}
                       </button>
                     ) : (
                       <button 
                         onClick={() => setStory(null)}
                         className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                       >
                         <PartyPopper size={18} />
                         {isRtl ? 'رائع' : 'Amazing'}
                       </button>
                     )}
                   </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-4 left-6 opacity-10">
                <Sparkles size={120} strokeWidth={1} className="text-amber-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-purple-400/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
