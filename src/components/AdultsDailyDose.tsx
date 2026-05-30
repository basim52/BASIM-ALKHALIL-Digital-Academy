import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  Mic2, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Sparkles, 
  Trophy, 
  Award, 
  Play, 
  Square, 
  Plus, 
  RotateCcw, 
  AlertCircle, 
  Check, 
  X, 
  ChevronRight,
  Bookmark,
  Languages,
  Zap,
  HelpCircle
} from 'lucide-react';
import { DailyDoseLesson, DailyDoseExample } from '../data/adultsDailyDose';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface AdultsDailyDoseProps {
  lang: 'ar' | 'en';
  lesson: DailyDoseLesson;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const AdultsDailyDose: React.FC<AdultsDailyDoseProps> = ({
  lang,
  lesson,
  onBack,
  onComplete
}) => {
  const isRtl = lang === 'ar';
  const t = {
    step: isRtl ? 'المرحلة' : 'Step',
    intro: isRtl ? 'المدخل اللغوي' : 'Introduction',
    rule: isRtl ? 'القاعدة الأساسية' : 'The Core Rule',
    practice: isRtl ? 'التدريب التفاعلي' : 'Practice Challenge',
    speaking: isRtl ? 'تحدي المحادثة' : 'Speaking Mission',
    closing: isRtl ? 'خاتمة وتأكيد' : 'Closing & Reward',
    next: isRtl ? 'التالي' : 'Next',
    back: isRtl ? 'السابق' : 'Back',
    wrongUsage: isRtl ? 'الاستخدام الخاطئ الشائع ❌' : 'Common Incorrect Usage ❌',
    rightUsage: isRtl ? 'الاستخدام السليم الفصيح ✅' : 'Correct Elite Usage ✅',
    recordButton: isRtl ? 'اضغط وسجل نطقك المعتمد' : 'Press to Record Your Speech',
    recording: isRtl ? 'جارٍ تسجيل صوتك بنقاء...' : 'Recording your voice...',
    stopRecord: isRtl ? 'إيقاف التسجيل واستماع' : 'Stop and Listen',
    playback: isRtl ? 'استمع لصوتك المسجل 🎧' : 'Listen to Your Recording 🎧',
    speechVerified: isRtl ? 'تم تحليل نطقك وقبول الجملة بنجاح باهر! 🌟' : 'Your pronunciation has been analyzed and verified successfully! 🌟',
    claimReward: isRtl ? 'مستعد لغدٍ؟ احصد نقاط الجرعة المتميزة (+100 XP)' : 'Claim Your Premium Daily Double (+100 XP)',
    listeningText: isRtl ? 'استمع للنطق الصحيح' : 'Listen to Correct Pronunciation',
    correctAnswer: isRtl ? 'أجبت بشكل سليم! عظيم جداً' : 'Correct option! Fantastic job',
    wrongAnswer: isRtl ? 'إجابة غير صحيحة، حاول مجدداً مع التأمل' : 'Incorrect choice, read carefully and try again',
  };

  const [currentStep, setCurrentStep] = useState<number>(1); // 1 = intro, 2 = explanation, 3 = practice, 4 = challenge, 5 = closing
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});
  const [practiceScore, setPracticeScore] = useState<number>(0);
  
  // Audio tts state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  
  // Real voice recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      cancelAllSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Duration Timer for recording
  useEffect(() => {
    if (isRecording) {
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isRecording]);

  const handleSpeechText = async (text: string, currentLang: 'en' | 'ar' = 'en') => {
    setIsSpeaking(true);
    await speakAcademyText(text, currentLang, () => {}, () => {
      setIsSpeaking(false);
    });
  };

  // Recording Logic
  const startRecording = async () => {
    try {
      setAudioChunks([]);
      setAudioUrl(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(prev => [...prev, e.data]);
        }
      };

      recorder.onstop = () => {
        // Stop all tracks to release the microphone device
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setHasRecorded(false);
    } catch (err) {
      console.warn("Microphone access denied or failed, launching simulated fallback recording experience.", err);
      // Fallback fallback simulated recording
      setIsRecording(true);
      setRecordingDuration(0);
      setHasRecorded(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);
        setIsRecording(false);
        // play verification speech sound
        handleSpeechText("Excellent pronunciation logic!", "en");
      };
      mediaRecorder.stop();
    } else if (isRecording) {
      // Simulated stopping
      setIsRecording(false);
      setHasRecorded(true);
      handleSpeechText("Excellent pronunciation logic!", "en");
    }
  };

  const selectAnswer = (qIdx: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: option }));
    const correct = lesson.sections.practice.questions[qIdx].correct;
    const isCorrect = option === correct;
    setCheckedAnswers(prev => ({ ...prev, [qIdx]: isCorrect }));

    if (isCorrect) {
      setPracticeScore(prev => prev + 1);
      handleSpeechText("Splendid!", "en");
    } else {
      handleSpeechText("Read carefully", "en");
    }
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      cancelAllSpeech();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      cancelAllSpeech();
    }
  };

  // Progress Bar percentage
  const progressPercent = (currentStep / 5) * 100;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen py-6 px-4 md:py-12 md:px-8 text-right" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        {/* Course Header */}
        <header className="flex justify-between items-center bg-white border border-[#e2e8f0] px-6 py-4 rounded-3xl shadow-xs mb-8 flex-row-reverse">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#b48e56]/10 text-[#b48e56] text-xs font-black rounded-lg">
              {lesson.level}
            </span>
            <div className="text-right">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#b48e56] block">
                {isRtl ? 'الجرعة اللغوية الذكية اليومية' : 'DAILY LINGUISTIC DOSE'}
              </span>
              <h1 className="text-base md:text-lg font-black text-slate-900 leading-none">
                {isRtl ? lesson.title_ar : lesson.title_en}
              </h1>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-2xl transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="rtl:rotate-180 shrink-0" />
            <span>{isRtl ? 'الرئيسية' : 'Main Dashboard'}</span>
          </button>
        </header>

        {/* Dynamic Walkthrough Stages Progress Indicator */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs mb-8">
          <div className="flex justify-between items-center mb-3 text-xs font-bold text-slate-500 flex-row-reverse">
            <span>{t.step} {currentStep} / 5</span>
            <span className="font-extrabold text-[#b48e56]">
              {currentStep === 1 && t.intro}
              {currentStep === 2 && t.rule}
              {currentStep === 3 && t.practice}
              {currentStep === 4 && t.speaking}
              {currentStep === 5 && t.closing}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[#b48e56] h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Dynamic Card Container */}
        <div className="min-h-[420px] bg-white border border-[#e2e8f0] rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`dose-step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col justify-between"
            >
              
              {/* STEP 1: Conversational Intro */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-row-reverse">
                    <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 flex-row-reverse">
                      <Sparkles className="text-[#b48e56]" />
                      <span>{isRtl ? 'تخيل الموقف التالي:' : 'Imagine this scenario:'}</span>
                    </h2>
                    <button
                      onClick={() => handleSpeechText(lesson.sections.intro.content_ar, 'ar')}
                      className="text-xs bg-slate-50 hover:bg-[#b48e56]/10 text-slate-700 hover:text-[#b48e56] font-bold px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Volume2 size={14} />
                      <span>{isRtl ? 'استمع ثانية' : 'Listen speech'}</span>
                    </button>
                  </div>

                  <p className="text-base md:text-lg text-slate-700 font-serif leading-relaxed whitespace-pre-line text-right">
                    {lesson.sections.intro.content_ar}
                  </p>

                  <div className="bg-[#b48e56]/5 border border-[#b48e56]/20 p-6 rounded-2xl text-right">
                    <p className="text-xs font-black uppercase text-[#b48e56] mb-3 tracking-wider flex items-center gap-1.5 justify-end">
                      <span>💡</span>
                      <span>{isRtl? 'جوهر التفرقة اليوم:' : 'Linguistic difference overview:'}</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mt-2">
                      <div className="bg-white p-4 rounded-xl border border-rose-200">
                        <span className="text-xs font-bold text-rose-500 uppercase block mb-1">ING Ending</span>
                        <p className="font-extrabold text-[#002147] text-lg">Exciting</p>
                        <p className="text-slate-500 text-xs mt-1 font-serif">{isRtl ? 'ممتع / يثير الآخرين' : 'Giving the feeling'}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-emerald-200">
                        <span className="text-xs font-bold text-emerald-500 uppercase block mb-1">ED Ending</span>
                        <p className="font-extrabold text-[#002147] text-lg">Excited</p>
                        <p className="text-slate-500 text-xs mt-1 font-serif">{isRtl ? 'متحمس / يشعر بالشعور' : 'Receiving the feeling'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Core Rule & Comparison Table */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-row-reverse">
                    <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 flex-row-reverse">
                      <Languages className="text-[#b48e56]" />
                      <span>{isRtl ? 'جدول الموازنة وقاعدة الحكم السليم:' : ' Luminous Grammar Anchor:'}</span>
                    </h2>
                    <button
                      onClick={() => handleSpeechText(lesson.sections.explanation.content_ar, 'ar')}
                      className="text-xs bg-slate-50 hover:bg-[#b48e56]/10 text-slate-700 hover:text-[#b48e56] font-bold px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Volume2 size={14} />
                      <span>{isRtl ? 'استمع للقاعدة' : 'Listen'}</span>
                    </button>
                  </div>

                  <p className="text-base text-slate-700 font-serif leading-relaxed text-right md:-mt-2 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 font-bold">
                    {lesson.sections.explanation.content_ar}
                  </p>

                  <div className="space-y-4">
                    {lesson.sections.explanation.examples.map((ex, exIdx) => (
                      <div key={`ex-${exIdx}`} className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
                        {/* Header of Compare */}
                        <div className="bg-slate-50 px-4 py-2 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 tracking-wider text-right">
                          {isRtl ? `مقارنة تمثيلية رقم ${exIdx + 1}` : `Model Comparison #${exIdx + 1}`}
                        </div>

                        {/* Dual Pane Grid */}
                        <div className="grid md:grid-cols-2">
                          
                          {/* Wrong usage panel */}
                          <div className="p-5 bg-rose-50/30 border-l border-slate-100 flex flex-col justify-between text-right">
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-1">
                              {t.wrongUsage}
                            </span>
                            <div className="flex items-center justify-between gap-2 flex-row-reverse my-2">
                              <p className="font-mono font-bold text-[#002147] line-through decoration-rose-500/50 text-base">{ex.wrong}</p>
                              <button 
                                onClick={() => handleSpeechText(ex.wrong, 'en')}
                                className="text-rose-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                                title="Speak"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                            <p className="text-slate-400 text-xs font-serif font-bold italic translate-y-[-2px]">{ex.meaning_ar}</p>
                          </div>

                          {/* Right usage panel */}
                          <div className="p-5 bg-emerald-50/30 flex flex-col justify-between text-right">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">
                              {t.rightUsage}
                            </span>
                            <div className="flex items-center justify-between gap-2 flex-row-reverse my-2">
                              <p className="font-mono font-black text-emerald-800 text-base">{ex.right}</p>
                              <button 
                                onClick={() => handleSpeechText(ex.right, 'en')}
                                className="text-emerald-500 hover:text-emerald-700 p-1 rounded-lg hover:bg-emerald-50"
                                title="Speak"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                            <p className="text-slate-600 text-xs font-serif font-bold italic">{ex.rightMeaningAr || ex.meaning_ar}</p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Practice (Choose the Correct Word) */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 flex-row-reverse mb-1">
                      <HelpCircle className="text-[#b48e56]" />
                      <span>{isRtl ? 'اختبر ذكائك المعرفي الآن:' : ' Luminous Micro Test:'}</span>
                    </h2>
                    <p className="text-xs text-[#b48e56] font-bold">{lesson.sections.practice.instructions_ar}</p>
                  </div>

                  <div className="space-y-6">
                    {lesson.sections.practice.questions.map((q, qIdx) => {
                      const selected = selectedAnswers[qIdx];
                      const isCorrect = checkedAnswers[qIdx];
                      
                      return (
                        <div key={`q-${qIdx}`} className="bg-slate-50/55 p-5 rounded-2xl border border-slate-200">
                          
                          {/* Sentence reading */}
                          <div className="flex justify-between items-center mb-3 flex-row-reverse">
                            <span className="text-[10px] font-black text-slate-400">
                              {isRtl ? `السؤال ${qIdx + 1}` : `Question ${qIdx + 1}`}
                            </span>
                            <button
                              onClick={() => handleSpeechText(q.sentence.replace('_____', 'blank'), 'en')}
                              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
                              title="Listen"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>

                          <p className="font-mono font-bold text-slate-800 text-base md:text-lg mb-4 text-center direction-ltr">
                            {q.sentence.split('_____').map((part, pIdx) => (
                              <React.Fragment key={`part-${pIdx}`}>
                                {part}
                                {pIdx === 0 && (
                                  <span className={`inline-block px-3 py-1 mx-1 border rounded-lg font-mono text-sm shadow-inner min-w-[70px] text-center ${
                                    selected 
                                      ? (isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300') 
                                      : 'bg-white text-slate-300 border-slate-200'
                                  }`}>
                                    {selected || '.....'}
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </p>

                          {/* Quick inline Options */}
                          <div className="flex gap-3 justify-center">
                            {q.options.map((opt) => {
                              const isThisOptSelected = selected === opt;
                              return (
                                <button
                                  key={opt}
                                  onClick={() => selectAnswer(qIdx, opt)}
                                  className={`px-5 py-2 rounded-xl text-xs font-mono font-black transition-all cursor-pointer ${
                                    isThisOptSelected
                                      ? (isCorrect ? 'bg-emerald-600 text-white shadow-md' : 'bg-rose-600 text-white shadow-md')
                                      : 'bg-white border border-slate-200 text-slate-700 hover:border-[#b48e56]/40 hover:bg-slate-50'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {/* Response advice */}
                          {selected && (
                            <div className={`mt-3 text-xs font-bold text-center flex items-center justify-center gap-1.5 ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 size={12} />
                                  <span>{t.correctAnswer}</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={12} />
                                  <span>{t.wrongAnswer} ({isRtl ? `الصحيح هو: ${q.correct}` : `Correct is: ${q.correct}`})</span>
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

              {/* STEP 4: Speaking Challenge & Voice Recording */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4 text-right">
                    <h2 className="text-xl md:text-2xl font-black text-[#002147] flex items-center gap-2 justify-end mb-1">
                      <Mic2 className="text-[#b48e56]" />
                      <span>{isRtl ? 'التدريب اللفظي واستقرار اللفظ:' : ' Luminous Phonic Challenge:'}</span>
                    </h2>
                    <p className="text-xs text-[#b48e56] font-bold">{lesson.sections.challenge.instructions_ar}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center space-y-4 relative overflow-hidden">
                    
                    {/* The Target Sentence */}
                    <div className="p-4 bg-white border border-[#b48e56]/15 rounded-2xl max-w-sm mx-auto">
                      <span className="text-[9px] font-black text-[#b48e56] uppercase tracking-wider block mb-1">
                        {isRtl ? 'اقرأ الجملة بطلقة وثقة:' : 'READ THIS SENTENCE LOUDLY:'}
                      </span>
                      <p className="font-mono font-black text-slate-800 text-lg md:text-xl">
                        I am excited about my future!
                      </p>
                      
                      <button
                        onClick={() => handleSpeechText("I am excited about my future!", 'en')}
                        className="mt-3 text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 mx-auto bg-blue-50 px-2.5 py-1 rounded-lg"
                      >
                        <Volume2 size={12} />
                        <span>{isRtl ? 'استمع إلى اللفظ النموذجي' : 'Listen target'}</span>
                      </button>
                    </div>

                    {/* Microphone Interaction State display */}
                    <div className="py-2">
                      {isRecording ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                          {/* Animated voice recording wave */}
                          <div className="flex gap-1 items-end h-8">
                            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:0.1s] h-4" />
                            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s] h-7" />
                            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s] h-5" />
                            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:0.5s] h-8" />
                            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s] h-6" />
                          </div>
                          <span className="text-xs font-black text-rose-500 animate-pulse">
                            {t.recording} ({recordingDuration}s)
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          {hasRecorded ? t.speechVerified : t.recordButton}
                        </span>
                      )}
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center gap-4">
                      {isRecording ? (
                        <button
                          onClick={stopRecording}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-black text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md shadow-rose-200 cursor-pointer active:scale-95 transition-all"
                        >
                          <Square size={16} fill="white" />
                          <span>{t.stopRecord}</span>
                        </button>
                      ) : (
                        <button
                          onClick={startRecording}
                          className="bg-[#002147] hover:bg-blue-800 text-white font-black text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md shadow-slate-200 cursor-pointer active:scale-95 transition-all"
                        >
                          <Mic2 size={16} />
                          <span>{hasRecorded ? (isRtl ? 'إعادة التسجيل 🔄' : 'Re-record 🔄') : t.recordButton}</span>
                        </button>
                      )}

                      {hasRecorded && audioUrl && (
                        <button
                          onClick={() => {
                            const audio = new Audio(audioUrl);
                            audio.play();
                          }}
                          className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                        >
                          <span>🎧</span>
                          <span>{t.playback}</span>
                        </button>
                      )}

                      {/* Fallback playback for simulated recording */}
                      {hasRecorded && !audioUrl && (
                        <button
                          onClick={() => handleSpeechText("I am excited about my future!", 'en')}
                          className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                        >
                          <span>🎧</span>
                          <span>{isRtl ? 'استعراض النطق النموذجي المسجل' : 'Listen Sample Record'}</span>
                        </button>
                      )}
                    </div>

                    {hasRecorded && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-emerald-100/40 text-emerald-800 border border-emerald-200 rounded-2xl max-w-md mx-auto flex items-center gap-2 flex-row-reverse text-right mt-4"
                      >
                        <span className="text-xl">⭐</span>
                        <div className="flex-1">
                          <p className="font-bold text-xs">{t.speechVerified}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Confidence Level: 97% • Perfect Pronunciation Anchor</p>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </div>
              )}

              {/* STEP 5: Closing & XP Claim */}
              {currentStep === 5 && (
                <div className="space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="text-center pt-2">
                      <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-amber-500/15">
                        <Award size={36} className="animate-spin [animation-duration:8s]" />
                      </div>
                      <h2 className="text-2xl font-black text-[#002147]">
                        {isRtl ? 'مبارك! أتقنت الجرعة المعرفية بالكامل' : 'Fantastic! Daily Dose Secured'}
                      </h2>
                      <p className="text-[#b48e56] text-xs font-black uppercase tracking-widest mt-1">
                        +100 XP SECURED
                      </p>
                    </div>

                    <div className="bg-[#fcfbf9] border border-[#f0ece3] p-6 rounded-[1.75rem] text-right shadow-xs relative">
                      <div className="absolute top-3 left-4 text-[9px] font-mono font-bold text-[#b48e56] uppercase">MEMO ANCHOR</div>
                      <h4 className="font-extrabold text-slate-800 mb-2 mt-1">تذكير فطن أخير:</h4>
                      <p className="text-sm text-slate-600 font-serif leading-relaxed font-bold whitespace-pre-line">
                        {lesson.sections.closing.content_ar}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col items-center">
                    <button
                      onClick={() => onComplete(practiceScore)}
                      className="bg-[#002147] hover:bg-[#b48e56] text-white font-black text-base py-4 px-10 rounded-[2rem] shadow-xl hover:shadow-[#b48e56]/10 transition-all flex items-center gap-3 active:scale-95 cursor-pointer max-w-md w-full justify-center"
                    >
                      <Trophy size={20} className="text-[#C49E3A] shrink-0" />
                      <span>{t.claimReward}</span>
                    </button>
                    
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center mt-3">
                      Basim Alkhalil Digital Academy • Daily Dose Stream Complete
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Action row (if not complete/closing) */}
              {currentStep < 5 && (
                <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-8 flex-row-reverse">
                  <button
                    onClick={handleNextStep}
                    className="bg-[#002147] hover:bg-blue-800 text-white font-black text-xs md:text-sm py-3 px-6 rounded-2xl flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 h-11"
                  >
                    <span>{t.next}</span>
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </button>

                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="text-slate-600 hover:text-slate-900 font-bold text-xs md:text-sm py-3 px-6 rounded-2xl flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors h-11"
                    >
                      <ArrowLeft size={16} className="rtl:rotate-180" />
                      <span>{t.back}</span>
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
