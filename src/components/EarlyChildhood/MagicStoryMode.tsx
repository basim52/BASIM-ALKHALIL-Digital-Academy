import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, BookOpen, Volume2, Wand2, Loader2, Star, PartyPopper } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../../lib/translations';

interface MagicStoryModeProps {
  lang: Language;
  onBack: () => void;
}

export const MagicStoryMode: React.FC<MagicStoryModeProps> = ({ lang, onBack }) => {
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<{ title: string; paragraphs: string[] } | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const generateStory = async () => {
    setLoading(true);
    setStory(null);
    setCurrentStep(0);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a professional children's storyteller.
      Write a very short (max 100 words), fun, and educational story for a 3-5 year old child. 
      The theme should be about discovery and kindness. 
      Use simple words.
      Output format: 
      Title: [Fun Title]
      Story: [3 simple paragraphs]
      Language: ${lang === 'ar' ? 'Arabic' : 'English'}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            systemInstruction: "You are a friendly storyteller assistant for a kids learning app.",
            temperature: 0.8
        }
      });

      const text = response.text || "";
      const lines = text.split('\n').filter(l => l.trim() !== "");
      
      let title = isRtl ? "قصة سحرية" : "Magic Story";
      let storyText = "";

      lines.forEach(line => {
        if (line.toLowerCase().startsWith('title:')) title = line.replace(/title:/i, '').trim();
        else if (line.toLowerCase().startsWith('story:')) storyText += line.replace(/story:/i, '').trim() + " ";
        else storyText += line.trim() + " ";
      });

      const paragraphs = storyText.split(/[.!?]+/).filter(p => p.trim().length > 5).map(p => p.trim() + ".");

      setStory({ 
        title, 
        paragraphs: paragraphs.slice(0, 3) // Ensure we have 3 parts max
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
              className="text-center"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl flex items-center justify-center mb-8 mx-auto relative group">
                <Wand2 size={48} className="text-indigo-600 transition-transform group-hover:rotate-12 group-hover:scale-110" strokeWidth={2.5} />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl -z-10"
                />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#002147] mb-4">
                {isRtl ? 'هل أنت مستعد لمغامرة جديدة؟' : 'Ready for a new adventure?'}
              </h2>
              <button 
                onClick={generateStory}
                className="bg-[#002147] text-white px-10 py-5 rounded-3xl font-black text-lg md:text-xl uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                <Sparkles size={24} className="text-yellow-400" />
                {isRtl ? 'اصنع السحر' : 'Create Magic'}
              </button>
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
              className="w-full bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-[10px] md:text-sm font-black text-indigo-400 uppercase tracking-widest mb-2 block">
                  {isRtl ? 'فصل جديد' : 'Chapter 1: The Discovery'}
                </span>
                <h2 className="text-2xl md:text-5xl font-black text-[#002147] mb-8 leading-tight">
                  {story.title}
                </h2>
                
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-12"
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
                        className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                     >
                       <Volume2 size={24} />
                     </button>
                     
                     {currentStep < story.paragraphs.length - 1 ? (
                       <button 
                         onClick={() => setCurrentStep(prev => prev + 1)}
                         className="bg-[#002147] text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                       >
                         {isRtl ? 'التالي' : 'Next'}
                       </button>
                     ) : (
                       <button 
                         onClick={generateStory}
                         className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                       >
                         <PartyPopper size={18} />
                         {isRtl ? 'قصة أخرى' : 'Another Story'}
                       </button>
                     )}
                   </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-4 left-6 opacity-5">
                <BookOpen size={180} strokeWidth={1} />
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
