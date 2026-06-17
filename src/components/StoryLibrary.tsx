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
  Pause,
  Square,
  Heart,
  AlertCircle,
  ImageIcon,
  Mic,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  RotateCcw
} from 'lucide-react';
import { UserProfile, MASTER_ADMINS } from '../types';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Story {
  id: string;
  titleEn: string;
  titleAr: string;
  level: string;
  image: string;
  content: string;
  isKidsStory?: boolean;
}

export const STORIES: Story[] = [
  {
    id: 'kids_story_001',
    titleEn: 'Noor Arrives in London',
    titleAr: 'نور تصل إلى لندن',
    level: 'A1',
    image: 'https://images.unsplash.com/photo-1548625361-155deee223d5?auto=format&fit=crop&w=800&q=80',
    content: 'Follow Noor as she lands at Heathrow Airport in London, meets a security officer, buys a ticket, and sets off on her very first interactive adventure!',
    isKidsStory: true
  },
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
  },
  {
    id: '4',
    titleEn: 'The Brave Firefighter',
    titleAr: 'الإطفائي الشجاع',
    level: 'A1',
    image: 'https://images.unsplash.com/photo-1582213726894-85816995642d?auto=format&fit=crop&w=800&q=80',
    content: 'Jack is a firefighter. He is very brave. Every day, he wears a red uniform and a big helmet. When the bell rings, Jack jumps into the red fire truck. He drives quickly to help people. Jack loves his job because he helps save lives.'
  },
  {
    id: '5',
    titleEn: 'A Journey to the Moon',
    titleAr: 'رحلة إلى القمر',
    level: 'A2',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    content: 'Astronauts travel into space using large rockets. In 1969, humans landed on the moon for the first time. They wore special space suits to breathe. The moon has no air and no water. Looking at the Earth from the moon is a beautiful sight that few people have seen.'
  },
  {
    id: '6',
    titleEn: 'The Secret Garden',
    titleAr: 'الحديقة السرية',
    level: 'B1',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80',
    content: 'Mary found an old key buried in the soil. It belonged to a hidden garden that had been locked for ten years. As she opened the door, she saw beautiful roses and tall trees. She decided to take care of the garden. Working in the garden made her feel happy and healthy.'
  },
  {
    id: '7',
    titleEn: 'The Mystery of the Old Clock',
    titleAr: 'لغز الساعة القديمة',
    level: 'B1',
    image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80',
    content: 'In the dusty attic, there stood an ancient wooden clock that never ticked. One evening, thin smoke started coming out of it. Detective Leo was called to investigate the strange event. He found a hidden compartment inside the clock containing a map to a hidden treasure under the stairs.'
  },
  {
    id: '8',
    titleEn: 'Exploring the Amazon',
    titleAr: 'استكشاف الأمازون',
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a5c25?auto=format&fit=crop&w=800&q=80',
    content: 'The Amazon rainforest is the largest tropical forest in the world. It is home to millions of species of plants and animals. Scientists explore this jungle to discover new medicines. However, deforestation is a serious threat to this diverse ecosystem. We must protect it to maintain the balance of our planet.'
  },
  {
    id: '9',
    titleEn: 'The History of Olympics',
    titleAr: 'تاريخ الألعاب الأولمبية',
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    content: 'The Olympic Games originated in ancient Greece as a religious festival. Today, the modern Olympics are a major international sporting event featuring thousands of athletes. They compete in various sports to represent their nations. The spirit of the games is about friendship, solidarity, and fair play among different cultures.'
  },
  {
    id: '10',
    titleEn: 'The Impact of Climate Change',
    titleAr: 'تأثير تغير المناخ',
    level: 'C1',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    content: 'Climate change is primarily driven by anthropogenic greenhouse gas emissions, leading to unprecedented global warming. The melting of polar ice caps and rising sea levels pose significant risks to coastal communities worldwide. Mitigation strategies require international cooperation and a transition toward renewable energy sources. Failure to act swiftly could result in irreversible damage to the biosphere.'
  },
  {
    id: '11',
    titleEn: 'AI in Modern Medicine',
    titleAr: 'الذكاء الاصطناعي في الطب الحديث',
    level: 'C1',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    content: 'The implementation of machine learning algorithms in healthcare has revolutionized diagnostic accuracy and personalized treatment plans. AI-driven systems can analyze vast datasets of medical imaging to detect abnormalities at early stages. Furthermore, predictive analytics assist clinicians in anticipating patient outcomes. Despite these advancements, the human element in medicine remains irreplaceable for ethical judgment.'
  },
  {
    id: '12',
    titleEn: 'The Philosophy of Happiness',
    titleAr: 'فلسفة السعادة',
    level: 'C2',
    image: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&w=800&q=80',
    content: 'Philosophical inquiries into the nature of happiness have shifted from purely hedonistic interpretations to eudaimonic perspectives. Eudaimonia emphasizes long-term fulfillment through the realization of one\'s potential and virtuous living. Modern psychology aligns with these ancient concepts, suggesting that purpose and social connection are fundamental pillars of well-being. Ultimately, happiness is a subjective construct influenced by internal and external variables.'
  },
  {
    id: '13',
    titleEn: 'Global Economic Trends',
    titleAr: 'الاتجاهات الاقتصادية العالمية',
    level: 'C2',
    image: 'https://images.unsplash.com/photo-1611974717482-48216694665a?auto=format&fit=crop&w=800&q=80',
    content: 'The contemporary global economic landscape is characterized by increasing volatility and the rise of decentralized financial systems. Traditional monetary policies are being challenged by the emergence of digital currencies and cross-border trade complexities. Structural shifts in labor markets, driven by automation, necessitate comprehensive policy reforms. Sustaining equitable growth requires a balanced approach between innovation and social safety nets.'
  },
  {
    id: '14',
    titleEn: 'The Golden Treasure',
    titleAr: 'الكنز الذهبي',
    level: 'A1',
    image: 'https://images.unsplash.com/photo-1594462364741-94993cb3310f?auto=format&fit=crop&w=400&q=80',
    content: 'Deep in the heart of the forest, a group of friends found an old wooden box. Inside the box, there were gold coins and beautiful jewelry. They decided to give the treasure to the village museum. Everyone celebrated the discovery of the golden treasure.'
  },
  {
    id: '15',
    titleEn: 'The Magic of Space',
    titleAr: 'سحر الفضاء',
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
    content: 'The universe is vast and full of mysteries. Black holes can swallow entire stars, while nebulas create new ones in a dance of light and dust. Exploring the galaxy helps scientists understand how the Earth was formed millions of years ago. It is a journey that requires courage and curiosity.'
  }
];

export const StoryLibrary = ({ lang, profile, onUpdateProfile, onNavigate, onBack, initialStoryId }: { lang: Language, profile: UserProfile, onUpdateProfile: (p: UserProfile) => void, onNavigate: (v: any) => void, onBack: () => void, initialStoryId?: string | null }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const [selectedStory, setSelectedStory] = useState<Story | null>(() => {
    if (initialStoryId) {
      return STORIES.find(s => s.id === initialStoryId) || null;
    }
    return null;
  });

  React.useEffect(() => {
    if (initialStoryId) {
      const found = STORIES.find(s => s.id === initialStoryId);
      if (found) {
        setSelectedStory(found);
      }
    }
  }, [initialStoryId]);
  const [wordData, setWordData] = useState<{ word: string; translation: string; pronunciation: string } | null>(null);
  const [loadingWord, setLoadingWord] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  
  // Reading Test State
  const [isTestMode, setIsTestMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [testResult, setTestResult] = useState<{ score: number; mistakes: string[] } | null>(null);
  const [recordingPaused, setRecordingPaused] = useState(false);

  React.useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setRecordedText(prev => prev + ' ' + finalTranscript);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        if (isRecording && !recordingPaused) {
          try {
            rec.start();
          } catch (e) {}
        }
      };

      setRecognition(rec);
    }

    return () => {
      window.speechSynthesis.cancel();
      if (recognition) recognition.stop();
    };
  }, []);

  const handleStartTest = () => {
    setIsTestMode(true);
    setRecordedText("");
    setTestResult(null);
    stopSpeak();
  };

  const toggleRecording = () => {
    if (!recognition) {
       alert(isRtl ? 'عذراً، متصفحك لا يدعم التعرف على الكلام.' : 'Sorry, your browser does not support speech recognition.');
       return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      setRecordingPaused(false);
      calculateScore();
    } else {
      setRecordedText("");
      recognition.start();
      setIsRecording(true);
      setRecordingPaused(false);
    }
  };

  const pauseRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setRecordingPaused(true);
      setIsRecording(false);
    }
  };

  const resumeRecording = () => {
    if (recognition && recordingPaused) {
      recognition.start();
      setRecordingPaused(false);
      setIsRecording(true);
    }
  };

  const calculateScore = () => {
    if (!selectedStory) return;
    
    // Simple comparison logic
    const originalWords = selectedStory.content.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    const spokenWords = recordedText.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    
    let correctCount = 0;
    const mistakes: string[] = [];
    
    const spokenSet = new Set(spokenWords);
    
    originalWords.forEach(word => {
      if (spokenSet.has(word)) {
        correctCount++;
      } else {
        mistakes.push(word);
      }
    });

    const score = Math.round((correctCount / originalWords.length) * 100);
    setTestResult({ score, mistakes });

    // Save test result to Firestore for reports & analysis
    if (profile && profile.uid) {
      addDoc(collection(db, 'lessonResults'), {
        userId: profile.uid,
        parentIds: (profile as any).linkedParentIds || [],
        lessonId: selectedStory.id,
        courseId: 'story-library',
        level: selectedStory.level,
        lessonTitle: selectedStory.titleEn,
        score: score,
        total: 100,
        timestamp: serverTimestamp()
      }).catch(err => {
        console.error("Error saving story reading test to Firestore:", err);
      });
    }
  };

  const handleSelectStory = async (story: Story) => {
    if (story.isKidsStory) {
      onNavigate('kids-story-player');
      return;
    }
    if (selectedStory?.id === story.id) return;
    setSelectedStory(story);
  };

  const handleWordClick = async (word: string) => {
    const cleanWord = (word || '').replace(/[.,!?;:]/g, '');
    setLoadingWord(true);
    setWordData({ word: cleanWord, translation: '', pronunciation: '' });

    try {
      const resp = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { word: cleanWord },
          prompt: `Translate the English word "${cleanWord}" to Arabic and provide a phonetic pronunciation guide. Return JSON: { "translation": "...", "pronunciation": "..." }`
        })
      });

      if (!resp.ok) {
        throw new Error(`Server responded with ${resp.status}`);
      }

      const rawData = await resp.json();
      const text = rawData.text || "";
      const jsonStr = (text || '').replace(/```json|```/g, '').trim();
      const data = JSON.parse(jsonStr);

      setWordData({ word: cleanWord, ...data });
      
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Error translating word:", err);
    } finally {
      setLoadingWord(false);
    }
  };

  const toggleSpeak = (text: string) => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      
      utterance.onboundary = (event: any) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const textAhead = text.substring(0, charIndex);
          const wordsCount = textAhead.trim() === "" ? 0 : textAhead.split(/\s+/).filter(Boolean).length;
          setActiveWordIndex(wordsCount);
        }
      };

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveWordIndex(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveWordIndex(null);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeak = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveWordIndex(null);
  };

  if (selectedStory) {
    return (
      <div className={`p-8 max-w-4xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <button 
          onClick={() => {
            stopSpeak();
            setSelectedStory(null);
            setIsTestMode(false);
            setTestResult(null);
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold"
        >
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للمكتبة' : 'Back to Library'}
        </button>

        {isTestMode ? (
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0" />
             
             <header className="mb-12 text-center relative z-10">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                   <Mic size={40} className={isRecording ? 'animate-pulse' : ''} />
                </div>
                <h2 className="text-3xl font-black text-[#002147] mb-2">{isRtl ? 'اختبار مهارة القراءة' : 'Reading Fluency Test'}</h2>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{isRtl ? 'قم بقراءة النص بوضوح للميكروفون' : 'Read the text clearly into your microphone'}</p>
             </header>

             <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100 relative z-10">
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-700 italic">
                   {selectedStory.content.split(' ').map((word, idx) => {
                     const clean = word.toLowerCase().replace(/[.,!?;:]/g, '');
                     const isWrong = testResult?.mistakes.includes(clean);
                     const isCorrect = testResult && !isWrong;
                     
                     return (
                       <span 
                         key={idx} 
                         className={`mx-1 ${isWrong ? 'text-red-500 line-through' : isCorrect ? 'text-emerald-600 font-bold' : ''}`}
                       >
                         {word}{' '}
                       </span>
                     );
                   })}
                </p>
             </div>

             {testResult ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#002147] text-white p-8 rounded-[2rem] text-center mb-8 relative z-10 shadow-2xl"
                >
                   <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="w-24 h-24 rounded-full border-4 border-blue-400 flex flex-col items-center justify-center bg-white/5">
                         <span className="text-3xl font-black">{testResult.score}%</span>
                         <span className="text-[10px] font-black uppercase">{isRtl ? 'النتيجة' : 'SCORE'}</span>
                      </div>
                      <div className="text-left">
                         <p className="text-xl font-black mb-1">{testResult.score > 80 ? (isRtl ? 'أداء ممتاز!' : 'Excellent Performance!') : (isRtl ? 'أداء جيد، حاول مجدداً' : 'Good job, keep practicing!')}</p>
                         <p className="text-blue-200 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <RefreshCcw size={14} /> 
                            {isRtl ? `لديك ${testResult.mistakes.length} أخطاء نطق` : `You had ${testResult.mistakes.length} pronunciation mistakes`}
                         </p>
                      </div>
                   </div>
                   <button 
                     onClick={() => {
                       setTestResult(null);
                       setRecordedText("");
                     }}
                     className="bg-[#C49E3A] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                   >
                     {isRtl ? 'إعادة الاختبار' : 'Retake Test'}
                   </button>
                </motion.div>
             ) : (
                <div className="flex flex-col items-center gap-6 relative z-10">
                   <div className="flex items-center gap-4">
                      {isRecording ? (
                         <>
                           <button 
                             onClick={pauseRecording}
                             className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors shadow-sm"
                             title={isRtl ? 'توقف مؤقت' : 'Pause'}
                           >
                             <Pause size={24} />
                           </button>
                           <button 
                             onClick={toggleRecording}
                             className="w-24 h-24 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-200 hover:scale-110 transition-transform pulse-animation"
                           >
                             <Square size={32} fill="currentColor" />
                           </button>
                         </>
                      ) : recordingPaused ? (
                        <>
                           <button 
                             onClick={resumeRecording}
                             className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-200 hover:scale-110 transition-transform"
                           >
                             <Play size={32} fill="currentColor" />
                           </button>
                           <button 
                             onClick={() => {
                               setRecordedText("");
                               setRecordingPaused(false);
                               calculateScore();
                             }}
                             className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors shadow-sm"
                           >
                             <CheckCircle2 size={24} />
                           </button>
                        </>
                      ) : (
                        <button 
                          onClick={toggleRecording}
                          className="px-12 py-6 rounded-[2rem] bg-blue-600 text-white font-black text-lg uppercase tracking-widest flex items-center gap-4 shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all group"
                        >
                          <Mic size={32} />
                          {isRtl ? 'ابدأ القراءة الآن' : 'Start Reading Now'}
                        </button>
                      )}
                   </div>
                   
                   {isRecording && (
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: [0.5, 1, 0.5] }}
                       transition={{ repeat: Infinity, duration: 1.5 }}
                       className="text-red-500 font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2"
                     >
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        {isRtl ? 'جاري الاستماع...' : 'Listening...'}
                     </motion.div>
                   )}
                </div>
             )}

             <button 
               onClick={() => {
                 setIsTestMode(false);
                 setRecordedText("");
                 setTestResult(null);
               }}
               className="mt-12 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest block mx-auto py-4 underline underline-offset-4"
             >
                {isRtl ? 'الخروج من وضع الاختبار' : 'Exit Test Mode'}
             </button>
          </div>
        ) : (
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
                {selectedStory.content.split(' ').map((word, idx) => {
                  const isActive = activeWordIndex === idx;
                  return (
                    <span 
                      key={idx}
                      onClick={() => handleWordClick(word)}
                      className={`px-1.5 py-0.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all border border-transparent inline-block ${
                        isActive ? 'bg-amber-100 text-[#002147] font-extrabold border-amber-300 scale-105 shadow-xs' : 'hover:border-blue-100'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <button 
                onClick={() => toggleSpeak(selectedStory.content)}
                className={`bg-[#002147] text-white px-8 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-[#C49E3A] transition-all shadow-xl shadow-blue-100 ${isPaused || !isSpeaking ? 'bg-[#002147]' : 'bg-emerald-600'}`}
              >
                {isSpeaking && !isPaused ? <Pause size={24} /> : <Play size={24} />}
                {isSpeaking && !isPaused 
                  ? (isRtl ? 'إيقاف مؤقت' : 'Pause Audio') 
                  : (isPaused ? (isRtl ? 'استكمال' : 'Resume Story') : (isRtl ? 'استمع للقصة' : 'Listen to Story'))}
              </button>

              <button 
                onClick={handleStartTest}
                className="bg-[#C49E3A] text-white px-8 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-[#002147] transition-all shadow-xl shadow-amber-100"
              >
                <Mic size={24} />
                {isRtl ? 'اختبار القراءة' : 'Reading Test'}
              </button>

              {isSpeaking && (
                <button 
                  onClick={stopSpeak}
                  className="w-16 h-16 rounded-[2rem] bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Square size={24} fill="currentColor" />
                </button>
              )}
            </div>
          </div>
        )}

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
                      <button onClick={() => {
                        window.speechSynthesis.cancel();
                        const utt = new SpeechSynthesisUtterance(wordData.word);
                        utt.lang = 'en-US';
                        window.speechSynthesis.speak(utt);
                      }} className="text-blue-400 hover:text-white transition-colors">
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
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-4 font-bold"
        >
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}
        </button>
        <h2 className="text-3xl font-black text-[#002147]">{t.storyLibrary}</h2>
        <p className="text-slate-400 mt-1 font-medium">{isRtl ? 'طور مهارات القراءة والاستماع عبر مكتبة من القصص العالمية' : 'Develop reading and listening skills through a library of global stories'}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.map((story, sIdx) => (
          <motion.div 
            key={`story-card-${story.id || sIdx}`}
            whileHover={{ y: -10 }}
            onClick={() => handleSelectStory(story)}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group cursor-pointer relative"
          >
            <div className="h-48 relative overflow-hidden bg-slate-100 flex items-center justify-center text-slate-300">
               <ImageIcon size={48} className="absolute opacity-20" />
               <img 
                 src={story.image} 
                 alt="" 
                 referrerPolicy="no-referrer"
                 loading="lazy"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10" 
                 onError={(e) => {
                   (e.target as HTMLImageElement).style.opacity = '0';
                 }}
               />
               <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#C49E3A] text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">{story.level}</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 z-20">
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
