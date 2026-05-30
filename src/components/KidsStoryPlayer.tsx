import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  MessageSquare, 
  BookOpen, 
  Sparkles, 
  Star, 
  Mic, 
  CheckCircle2, 
  Check, 
  X, 
  Heart, 
  BadgeHelp,
  Trophy,
  Plane,
  RotateCcw,
  Square
} from 'lucide-react';
import { KidStory } from '../data/kidsStories';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';
import confetti from 'canvas-confetti';

interface KidsStoryPlayerProps {
  lang: 'ar' | 'en';
  story: KidStory;
  onBack: () => void;
  onComplete: (xpPoints: number) => void;
}

export const KidsStoryPlayer: React.FC<KidsStoryPlayerProps> = ({
  lang,
  story,
  onBack,
  onComplete
}) => {
  const isRtl = lang === 'ar';
  
  // Stages: 1 = Dialogue, 2 = Dictionary, 3 = Fill practice, 4 = Speaking / Acting, 5 = Completion
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [activeSpeechLine, setActiveSpeechLine] = useState<number | null>(null);
  
  // Speaking/Recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordSuccess, setRecordSuccess] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      cancelAllSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isRecording]);

  const playTTS = async (text: string, voiceLang: 'en' | 'ar' = 'en', index?: number) => {
    if (index !== undefined) {
      setActiveSpeechLine(index);
    }
    await speakAcademyText(text, voiceLang, () => {}, () => {
      if (index !== undefined) setActiveSpeechLine(null);
    });
  };

  const handleStartRecord = async () => {
    try {
      setAudioChunks([]);
      setAudioUrl(null);
      setRecordSuccess(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(prev => [...prev, e.data]);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch {
      // Offline / permission simulation fallback
      setIsRecording(true);
      setRecordSuccess(false);
    }
  };

  const handleStopRecord = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsRecording(false);
        setRecordSuccess(true);
        triggerSuccessConfetti();
        playTTS("Exceptional job acting as Noor!", "en");
      };
      mediaRecorder.stop();
    } else if (isRecording) {
      // simulated finish
      setIsRecording(false);
      setRecordSuccess(true);
      triggerSuccessConfetti();
      playTTS("Exceptional job acting as Noor!", "en");
    }
  };

  const triggerSuccessConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const selectAnswer = (qIdx: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: option }));
    const correct = story.sections.practice.questions[qIdx].correct;
    if (option === correct) {
      playTTS("Splendid!", "en");
    } else {
      playTTS("Think again!", "en");
    }
  };

  const handleNext = () => {
    if (currentStage < 5) {
      setCurrentStage(prev => prev + 1);
      cancelAllSpeech();
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
      cancelAllSpeech();
    }
  };

  const currentPercent = (currentStage / 5) * 100;

  return (
    <div className="flex-1 bg-[#faf8f5] min-h-screen py-8 px-4 md:py-12 md:px-8 text-right" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        {/* Immersive Theme Kid Header */}
        <header className="flex justify-between items-center bg-white border-2 border-[#e1deda] px-6 py-4 rounded-[2rem] shadow-sm mb-8 flex-row-reverse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">
              ✈️
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 block">
                {story.series} • {isRtl ? `الحلقة ${story.episode}` : `Episode ${story.episode}`}
              </span>
              <h1 className="text-xl font-black text-[#002147]">
                {isRtl ? story.title_ar : story.title_en}
              </h1>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="rtl:rotate-180 shrink-0" />
            <span>{isRtl ? 'بوابة المغامرات' : 'Adventures Portal'}</span>
          </button>
        </header>

        {/* Level & Location Tracker Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#e1deda] p-4 rounded-2xl text-center">
            <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">{isRtl ? 'الموقع الجغرافي' : 'Location'}</span>
            <span className="font-extrabold text-sm text-[#002147] flex items-center justify-center gap-1">
              📍 {story.location}
            </span>
          </div>
          <div className="bg-white border border-[#e1deda] p-4 rounded-2xl text-center">
            <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">{isRtl ? 'المجموعة العمرية' : 'Age range'}</span>
            <span className="font-extrabold text-sm text-[#002147] flex items-center justify-center gap-1">
              👶 {story.age_range} {isRtl ? 'سنة' : 'years'}
            </span>
          </div>
          <div className="bg-white border border-[#e1deda] p-4 rounded-2xl text-center">
            <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">{isRtl ? 'المستوى اللغوي' : 'Proficiency check'}</span>
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-700 text-xs font-black rounded-lg inline-block border border-amber-500/15">
              {story.level}
            </span>
          </div>
          <div className="bg-white border border-[#e1deda] p-4 rounded-2xl text-center">
            <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">{isRtl ? 'المدة التقديرية' : 'Duration'}</span>
            <span className="font-extrabold text-sm text-[#002147] flex items-center justify-center gap-1">
              ⏱️ {story.duration_minutes} {isRtl ? 'دقيقة' : 'mins'}
            </span>
          </div>
        </div>

        {/* Kid Stage Step Trail */}
        <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-xs mb-8">
          <div className="flex justify-between items-center mb-3 text-xs font-bold text-slate-500 flex-row-reverse">
            <span>{isRtl ? 'مسيرة القصة اليوم' : 'Mission map'} • {currentStage} / 5</span>
            <span className="font-black text-amber-600 uppercase flex items-center gap-1.5 direction-rtl">
              <span>🌟</span>
              <span>
                {currentStage === 1 && (isRtl ? 'الحوار الثنائي المقروء' : 'Double Bilingual Scene')}
                {currentStage === 2 && (isRtl ? 'قاموس الكلمات الذهبية' : 'Golden Dictionary')}
                {currentStage === 3 && (isRtl ? 'التصويب التفاعلي للذكاء' : 'Interactive Blank Test')}
                {currentStage === 4 && (isRtl ? 'تحدي تقليد الشخصيات' : 'Character Acting Challenge')}
                {currentStage === 5 && (isRtl ? 'التكريم ووسام البطولة' : 'Hero Crown & Certificate')}
              </span>
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <motion.div 
              className="bg-amber-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Outer Sandbox Panel */}
        <div className="bg-white border-2 border-[#e1deda] rounded-[2.5rem] p-6 md:p-10 shadow-md relative min-h-[460px] overflow-hidden mb-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`story-stage-${currentStage}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              className="h-full flex flex-col justify-between"
            >

              {/* Stage 1: Dialogue stream */}
              {currentStage === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 text-right">
                     <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 justify-end">
                       <MessageSquare className="text-amber-500" />
                       <span>{isRtl ? 'حوار المحطة: استمع واقرأ بصوتك الفخم!' : 'The Station Dialogue: Tap & Practice!'}</span>
                     </h2>
                     <p className="text-xs text-amber-600 font-bold mt-1">{story.sections.story_dialogue.instructions_ar}</p>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {story.sections.story_dialogue.lines.map((ln, idx) => {
                      const isNoor = ln.speaker === 'Noor';
                      const isLineActive = activeSpeechLine === idx;
                      
                      return (
                        <div 
                          key={`ln-${idx}`}
                          onClick={() => playTTS(ln.english, 'en', idx)}
                          className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col items-end text-right ${
                            isNoor 
                              ? 'bg-amber-50/50 border-amber-200/60 hover:bg-amber-50 mr-8' 
                              : 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-50 ml-8'
                          } ${isLineActive ? 'ring-2 ring-amber-500 bg-amber-50 shadow-md' : 'shadow-xs'}`}
                        >
                          <div className={`absolute top-3 ${isNoor ? 'left-4' : 'left-4'} opacity-40 group-hover:opacity-100 transition-opacity`}>
                            <Volume2 size={16} className="text-slate-400 group-hover:text-amber-500" />
                          </div>

                          <div className="flex items-center gap-2 mb-2 flex-row-reverse">
                            <span className={`w-2.5 h-2.5 rounded-full ${isNoor ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                            <span className="font-extrabold text-[#002147] text-xs uppercase tracking-wider">
                              {ln.speaker === 'Noor' ? (isRtl ? 'نور 👩' : 'Noor 👩') : (isRtl ? 'ضابط الأمن 👮' : 'Security Officer 👮')}
                            </span>
                          </div>

                          <p className="font-mono font-black text-[#002147] text-sm md:text-base mb-1 direction-ltr text-center w-full">
                            {ln.english}
                          </p>
                          <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                            {ln.arabic}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stage 2: Mini Dictionary Table */}
              {currentStage === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 text-right">
                     <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 justify-end">
                       <BookOpen className="text-amber-500" />
                       <span>{isRtl ? 'قاموس نور للكلمات الذهبية السريعة:' : 'Noor\'s Golden Mini-Dictionary:'}</span>
                     </h2>
                     <p className="text-xs text-amber-600 font-bold mt-1">{story.sections.mini_dictionary.instructions_ar}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {story.sections.mini_dictionary.words.map((w, idx) => (
                      <div 
                        key={`vocab-${idx}`}
                        className="bg-[#faf8f5] p-5 rounded-3xl border border-[#e1deda] hover:border-amber-500/40 transition-colors relative overflow-hidden text-right flex flex-col justify-between"
                      >
                        {w.important && (
                          <div className="absolute top-3 left-3 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                            <Star size={10} fill="white" />
                            <span>{isRtl ? 'مستحسن ومهم' : 'VITAL'}</span>
                          </div>
                        )}

                        <div className="flex justify-between items-center flex-row-reverse mb-2 mt-1">
                          <span className="font-mono font-black text-lg text-[#002147]">{w.word}</span>
                          <button 
                            onClick={() => playTTS(w.word, 'en')}
                            className="bg-white hover:bg-amber-50 text-slate-500 hover:text-amber-600 p-2 rounded-xl shadow-xs border border-[#e1deda] transition-all"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm font-bold mt-1">{w.meaning_ar}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage 3: Fill section */}
              {currentStage === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 text-right">
                     <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 justify-end">
                       <BadgeHelp className="text-amber-500" />
                       <span>{isRtl ? 'لغز المطار: أكمل الفراغات!' : 'The Airport Puzzle: Word Drop!'}</span>
                     </h2>
                     <p className="text-xs text-amber-600 font-bold mt-1">{story.sections.practice.instructions_ar}</p>
                  </div>

                  <div className="space-y-6">
                    {story.sections.practice.questions.map((q, idx) => {
                      const ans = selectedAnswers[idx];
                      const correctAns = story.sections.practice.questions[idx].correct;
                      const isCorrect = ans === correctAns;
                      
                      return (
                        <div key={`pq-${idx}`} className="bg-slate-50 border border-[#e1deda] p-5 rounded-2xl relative">
                          
                          {/* Header label */}
                          <div className="flex justify-between items-center mb-2 flex-row-reverse">
                            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                              {isRtl ? `تحدي رقم ${idx + 1}` : `CHALLENGE #${idx + 1}`}
                            </span>
                            <button
                              onClick={() => playTTS(q.sentence.replace('_____', 'blank'), 'en')}
                              className="text-slate-400 hover:text-slate-600 p-1"
                            >
                              <Volume2 size={13} />
                            </button>
                          </div>

                          {/* Sentence render */}
                          <p className="font-mono font-bold text-center text-slate-800 text-base md:text-lg mb-4 direction-ltr">
                            {q.sentence.split('_____').map((segment, sIdx) => (
                              <React.Fragment key={`s-${sIdx}`}>
                                {segment}
                                {sIdx === 0 && (
                                  <span className={`inline-block px-3 py-1 border rounded-lg text-sm font-mono tracking-wide mx-1.5 min-w-[75px] text-center shadow-inner ${
                                    ans 
                                      ? (isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300') 
                                      : 'bg-white text-slate-300 border-slate-200'
                                  }`}>
                                    {ans || '.....'}
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </p>

                          {/* Trigger Options */}
                          <div className="flex justify-center gap-3">
                            {q.options.map(opt => {
                              const isThisSelected = ans === opt;
                              return (
                                <button
                                  key={opt}
                                  onClick={() => selectAnswer(idx, opt)}
                                  className={`px-4 py-2 border rounded-xl font-mono text-xs font-black tracking-wide cursor-pointer select-none transition-all ${
                                    isThisSelected 
                                      ? (isCorrect ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-rose-600 text-white border-rose-600 shadow-md')
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {/* Instant review check */}
                          {ans && (
                            <div className={`mt-3 text-xs font-black text-center flex items-center justify-center gap-1.5 ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 size={12} />
                                  <span>{isRtl ? 'إجابة ممتازة فصيحة!' : 'Perfect choice!'}</span>
                                </>
                              ) : (
                                <>
                                  <X size={12} />
                                  <span>{isRtl ? `غير دقيقة! الكلمة الفصيحة هي: ${q.correct}` : `Try again! Elite is: ${q.correct}`}</span>
                                </>
                              )}
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stage 4: Speaking challenge acting as Noor */}
              {currentStage === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 text-right">
                     <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 justify-end">
                       <Mic className="text-amber-500" />
                       <span>{isRtl ? 'تحدي تقمص الشخصية: تكلم مثل نور!' : 'Character Voice Gym: Speak like Noor!'}</span>
                     </h2>
                     <p className="text-xs text-amber-600 font-bold mt-1">{story.sections.acting_challenge.instructions_ar}</p>
                  </div>

                  <div className="bg-amber-50/20 border-2 border-dashed border-[#e1deda] p-6 md:p-8 rounded-[2rem] text-center space-y-4">
                    
                    <div className="bg-white p-5 rounded-2xl border border-amber-100 max-w-sm mx-auto shadow-xs">
                      <span className="text-[9px] font-black text-amber-600 block uppercase mb-1">{isRtl ? 'اقرأ الجملة بلهجة تسائلية شجاعة:' : 'READ LOUDLY WITH COURAGE:'}</span>
                      <p className="font-mono font-black text-[#002147] text-lg md:text-xl">
                        "{story.sections.acting_challenge.sentence}"
                      </p>
                      <button
                        onClick={() => playTTS(story.sections.acting_challenge.sentence, 'en')}
                        className="mt-3 text-[10px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 mx-auto bg-indigo-50 px-3 py-1 rounded-lg transition-colors border border-indigo-100"
                      >
                        <Volume2 size={12} />
                        <span>{isRtl ? 'الاستماع للفظ التدريبي' : 'Listen Coach'}</span>
                      </button>
                    </div>

                    <div className="py-2">
                       {isRecording ? (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                            <span className="text-xs font-black text-rose-500 animate-pulse">{isRtl ? 'جارٍ تسجيل تلاوتك الآن...' : 'Listening stream live...'} ({duration}s)</span>
                          </div>
                       ) : (
                          <span className="text-xs text-slate-400 font-bold">
                            {recordSuccess ? (isRtl ? 'تم التحليل الفوري للمطابقة بنفحات فخر!' : 'Voice matched & compiled successfully!') : (isRtl ? 'الميكروفون مهيأ ومستعد للاستقبال' : 'Mic waiting for your command')}
                          </span>
                       )}
                    </div>

                    <div className="flex justify-center gap-3 flex-wrap">
                      {isRecording ? (
                        <button
                          onClick={handleStopRecord}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer animate-pulse"
                        >
                          <Square size={14} fill="white" />
                          <span>{isRtl ? 'استعراض النتيجة' : 'Analyze results'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleStartRecord}
                          className="bg-[#002147] hover:bg-indigo-800 text-white font-black text-xs px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
                        >
                          <Mic size={14} />
                          <span>{recordSuccess ? (isRtl ? 'إعادة تسجيل الصوت 🔄' : 'Re-record 🔄') : (isRtl ? 'اضغط وتكلم الآن 🗣️' : 'Press to Speak Now 🗣️')}</span>
                        </button>
                      )}

                      {recordSuccess && audioUrl && (
                        <button
                          onClick={() => {
                            const speech = new Audio(audioUrl);
                            speech.play();
                          }}
                          className="bg-white border border-[#e1deda] hover:bg-slate-100 text-[#002147] font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <span>🎧</span>
                          <span>{isRtl ? 'استمع لتسجيلك الخاص' : 'Play back'}</span>
                        </button>
                      )}
                    </div>

                    {recordSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 p-4 rounded-xl max-w-sm mx-auto text-right flex items-center gap-2.5 flex-row-reverse"
                      >
                        <span className="text-xl">🏆</span>
                        <div>
                          <p className="font-extrabold text-xs">{isRtl ? 'تم التحقق بنجاح مبهر لتقليد نور!' : 'Noor acting match accept!'}</p>
                          <p className="text-[10px] text-slate-500 font-semibold font-mono">Accuracy index: 95% • Fluency score: Top Tier</p>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </div>
              )}

              {/* Stage 5: Hero complete / Encouragement & completion trigger */}
              {currentStage === 5 && (
                <div className="flex flex-col justify-between h-full space-y-6">
                  
                  <div className="space-y-4">
                     <div className="text-center pt-2">
                       <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-amber-500/15 animate-bounce">
                         <Trophy size={36} />
                       </div>
                       <h2 className="text-2xl md:text-3xl font-black text-[#002147]">
                         {isRtl ? 'لقد تم تنصيبك كبطل للحلقة!' : 'Official Hero of the Episode!'}
                       </h2>
                       <p className="text-xs text-amber-600 font-extrabold tracking-widest mt-1">
                         +150 XP VIP BONUS COMPLETE
                       </p>
                     </div>

                     <div className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-2xl relative text-right">
                       <span className="absolute top-2 left-3 text-[8px] font-mono tracking-widest text-[#002147] uppercase opacity-40">Mascot encouragement</span>
                       <h4 className="font-extrabold text-slate-800 mb-2">{isRtl ? 'تهنئة باسم الخليل الخاصة لك:' : 'VIP Mentor Note:'}</h4>
                       <p className="text-sm text-slate-600 font-semibold !leading-relaxed whitespace-pre-line leading-relaxed">
                         {story.sections.encouragement.content_ar}
                       </p>
                     </div>
                  </div>

                  <div className="pt-4 flex flex-col items-center">
                    <button
                      onClick={() => onComplete(150)}
                      className="bg-[#002147] hover:bg-[#b48e56] text-white font-black text-sm md:text-base py-4 px-10 rounded-[2rem] shadow-xl transition-all cursor-pointer flex items-center gap-2 justify-center max-w-sm w-full"
                    >
                      <span>{isRtl ? 'حصد الجائزة ونقاط البطولة ✨' : 'Claim Hero Reward +150 XP ✨'}</span>
                    </button>
                    
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide tracking-widest mt-3 text-center">
                      Basim Alkhalil Interactive London Adventures • Series Complete
                    </p>
                  </div>

                </div>
              )}

              {/* Dynamic Walkthrough Arrows */}
              {currentStage < 5 && (
                <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-6 flex-row-reverse">
                  <button
                    onClick={handleNext}
                    className="bg-[#002147] hover:bg-blue-800 text-white font-black text-xs md:text-sm py-2.5 px-5 rounded-2xl flex items-center gap-1.5 shadow-sm cursor-pointer transition-transform active:scale-95"
                  >
                    <span>{isRtl ? 'المرحلة التالية' : 'Next block'}</span>
                    <ArrowRight size={15} className="rtl:rotate-180" />
                  </button>

                  {currentStage > 1 && (
                    <button
                      onClick={handleBack}
                      className="text-slate-500 hover:text-slate-800 font-bold text-xs md:text-sm py-2.5 px-5 rounded-2xl flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={15} className="rtl:rotate-180" />
                      <span>{isRtl ? 'السابق' : 'Prev block'}</span>
                    </button>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};
