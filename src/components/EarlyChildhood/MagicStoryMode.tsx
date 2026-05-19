import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Wand2, Loader2, PartyPopper, Volume2, ChevronRight, MessageSquare, BookOpen } from 'lucide-react';
import { Language } from '../../lib/translations';
import confetti from 'canvas-confetti';

interface MagicStoryModeProps {
  lang: Language;
  onBack: () => void;
  context?: string;
}

const THEMES = [
  { id: 'space', icon: '🚀', name: 'Space', nameAr: 'الفضاء', color: 'bg-indigo-600' },
  { id: 'jungle', icon: '🌴', name: 'Jungle', nameAr: 'الغابة', color: 'bg-emerald-600' },
  { id: 'ocean', icon: '🌊', name: 'Ocean', nameAr: 'المحيط', color: 'bg-blue-600' },
  { id: 'sharks', icon: '🦈', name: 'Sharks', nameAr: 'القروش', color: 'bg-sky-700' },
];

export const MagicStoryMode: React.FC<MagicStoryModeProps> = ({ lang, onBack, context }) => {
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [emojis, setEmojis] = useState<string[]>(['✨']);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const parseAIResponse = (text: string) => {
    const lines = text.split('\n');
    let title = '';
    let storyContent = '';
    let emojiList: string[] = [];
    let choiceList: string[] = [];

    lines.forEach(line => {
      const l = line.trim();
      if (l.toLowerCase().startsWith('title:')) title = l.replace(/title:/i, '').trim();
      else if (l.toLowerCase().startsWith('story:')) storyContent = l.replace(/story:/i, '').trim();
      else if (l.toLowerCase().startsWith('emojis:')) emojiList = l.replace(/emojis:/i, '').split(',').map(e => e.trim());
      else if (l.toLowerCase().startsWith('choices:')) choiceList = l.replace(/choices:/i, '').split(',').map(c => c.trim());
    });

    return { title, storyContent, emojiList, choiceList };
  };

  const handleAction = async (choice?: string) => {
    setLoading(true);
    try {
      const resp = await fetch('/api/generate/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: selectedTheme,
          context,
          history,
          choice,
          lang: isRtl ? 'ar' : 'en'
        })
      });

      if (!resp.ok) throw new Error("API Failed");
      
      const data = await resp.json();
      const parsed = parseAIResponse(data.text);

      if (parsed.title) setStoryTitle(parsed.title);
      setCurrentParagraph(parsed.storyContent);
      setEmojis(parsed.emojiList);
      
      // Check if finished
      const containsEnd = parsed.choiceList.some(c => c.toLowerCase().includes('the end') || c.includes('النهاية'));
      if (containsEnd || parsed.choiceList.length === 0) {
        setIsFinished(true);
        setChoices([]);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b']
        });
      } else {
        setChoices(parsed.choiceList);
      }

      setHistory(prev => [...prev, parsed.storyContent]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startStory = (themeId: string) => {
    setSelectedTheme(themeId);
    setHistory([]);
    setIsFinished(false);
    handleAction(); // Trigger first turn without choice
  };

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }, [lang]);

  useEffect(() => {
    if (currentParagraph) {
      speak(currentParagraph);
    }
  }, [currentParagraph, speak]);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-10 flex flex-col items-center relative overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="w-full max-w-4xl flex items-center justify-between mb-8 md:mb-12 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-xl rounded-[1.5rem] flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all border-4 border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="text-amber-500 w-6 h-6 animate-pulse" />
                <h1 className="text-2xl md:text-4xl font-black text-[#002147] tracking-tight">
                    {isRtl ? 'المغامرة التفاعلية' : 'Magic Adventure'}
                </h1>
            </div>
            <p className="text-[10px] md:text-sm font-black text-indigo-400 uppercase tracking-[0.3em]">
                {isRtl ? 'أنت بطل القصة اليوم' : 'YOU ARE THE HERO TODAY'}
            </p>
        </div>

        <div className="w-12 h-12 md:w-16 md:h-16 opacity-0" />
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center justify-center flex-1 z-10">
        <AnimatePresence mode="wait">
          {!selectedTheme && !loading && (
            <motion.div 
              key="theme-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center w-full"
            >
              <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-4 border-indigo-50/50 mb-12">
                <Wand2 size={48} className="text-indigo-600 mx-auto mb-6 animate-bounce" />
                <h2 className="text-3xl md:text-5xl font-black text-[#002147] mb-4">
                    {isRtl ? 'أهلاً بك يا بطل!' : 'Welcome, Hero!'}
                </h2>
                <p className="text-slate-500 font-bold mb-12 text-lg">
                    {isRtl ? 'اختر عالماً لتبدأ مغامرتك السحرية' : 'Choose a world to start your magic adventure'}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {THEMES.map((theme) => (
                    <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.05, y: -8, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startStory(theme.id)}
                        className={`${theme.color} p-8 rounded-[3rem] text-white shadow-2xl flex flex-col items-center group relative overflow-hidden h-full min-h-[180px] justify-center transition-all`}
                    >
                        <span className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">{theme.icon}</span>
                        <span className="font-black text-xs uppercase tracking-widest leading-none">
                        {isRtl ? theme.nameAr : theme.name}
                        </span>
                        <div className="absolute -top-4 -right-4 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles size={60} />
                        </div>
                    </motion.button>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full"
                  />
                  <Wand2 size={40} className="text-indigo-600" />
              </div>
              <p className="text-2xl md:text-4xl font-black text-[#002147] animate-pulse">
                {isRtl ? 'جاري رسم أحداث المغامرة...' : 'Magically creating your story...'}
              </p>
            </motion.div>
          )}

          {currentParagraph && !loading && (
            <motion.div 
              key="story-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Story Sidebar (Emojis/Progress) */}
              <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4">
                 <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-t-8 border-amber-400 flex flex-col items-center shrink-0 w-44 lg:w-full">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{isRtl ? 'مشهد اليوم' : 'SCENE EMOJIS'}</p>
                    <div className="text-5xl flex gap-1 items-center justify-center animate-bounce">
                        {emojis.map((e, i) => <span key={`story-emoji-${e}-${i}`}>{e}</span>)}
                    </div>
                 </div>
                 
                 <div className="bg-[#002147] p-6 rounded-[2.5rem] shadow-xl text-white flex flex-col items-center shrink-0 w-44 lg:w-full">
                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-2">{isRtl ? 'المستوى' : 'LEVEL'}</p>
                    <div className="text-2xl font-black">{history.length} / 5</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(history.length / 5) * 100}%` }}
                            className="h-full bg-blue-400"
                        />
                    </div>
                 </div>
              </div>

              {/* Main Story Card */}
              <div className="lg:col-span-9 space-y-8">
                <div className="bg-white rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border-4 border-slate-50">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                <BookOpen className="text-indigo-600" size={24} />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-[#002147]">
                                {storyTitle || (isRtl ? 'قصة باسم السحرية' : 'Basim\'s Magic Story')}
                            </h2>
                        </div>
                        
                        <motion.div 
                            key={history.length}
                            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12"
                        >
                            <p className="text-2xl md:text-5xl font-bold text-slate-700 leading-tight md:leading-tight">
                                {currentParagraph}
                            </p>
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => speak(currentParagraph)}
                                className="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                <Volume2 size={32} />
                            </button>
                            <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div 
                                    animate={{ width: ['0%', '100%'] }}
                                    transition={{ duration: (currentParagraph.length * 0.08) }}
                                    className="h-full bg-indigo-500"
                                 />
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                </div>

                {/* Interaction Choices */}
                {!isFinished ? (
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                   >
                     {choices.map((choice, idx) => (
                       <button
                        key={idx}
                        onClick={() => handleAction(choice)}
                        className={`group p-6 md:p-8 rounded-[2.5rem] border-4 border-white shadow-xl transition-all hover:scale-[1.03] active:scale-95 text-start relative overflow-hidden flex items-center gap-6 ${idx === 0 ? 'bg-amber-400 text-[#002147]' : 'bg-indigo-600 text-white'}`}
                       >
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${idx === 0 ? 'bg-white/40' : 'bg-white/20'}`}>
                            <MessageSquare size={28} />
                         </div>
                         <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                                {isRtl ? `الخيار ${idx + 1}` : `OPTION ${idx + 1}`}
                            </p>
                            <span className="text-xl md:text-2xl font-black leading-tight block">
                                {choice}
                            </span>
                         </div>
                         <ChevronRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${isRtl ? 'rotate-180' : ''}`} size={32} strokeWidth={3} />
                       </button>
                     ))}
                   </motion.div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-500 text-white p-12 rounded-[3rem] shadow-2xl flex flex-col items-center text-center border-8 border-emerald-400"
                  >
                     <PartyPopper size={64} className="mb-6 animate-bounce" />
                     <h3 className="text-3xl md:text-5xl font-black mb-4">{isRtl ? 'تمت المغامرة بنجاح!' : 'Adventure Complete!'}</h3>
                     <p className="text-emerald-100 font-bold mb-8 text-lg">{isRtl ? 'يا لك من بطل رائع، لقد أنهيت القصة بذكائك!' : 'What an amazing hero, you finished the story with your wit!'}</p>
                     <button 
                        onClick={() => {
                            setSelectedTheme(null);
                            setCurrentParagraph('');
                            setChoices([]);
                        }}
                        className="bg-white text-emerald-600 px-12 py-5 rounded-3xl font-black text-xl uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
                     >
                        {isRtl ? 'مغامرة جديدة' : 'New Adventure'}
                     </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative background mascot */}
      <div className="fixed bottom-0 right-[-10%] w-[500px] pointer-events-none opacity-[0.03] -z-10 select-none grayscale">
         <div className="text-[400px]">🦁</div>
      </div>
    </div>
  );
};
