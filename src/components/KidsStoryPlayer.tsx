import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  MessageSquare, 
  BookOpen, 
  Star, 
  Mic, 
  CheckCircle2, 
  X, 
  Trophy, 
  Square, 
  Play, 
  Pause,
  BadgeHelp,
  Headphones
} from 'lucide-react';
import { KidStory } from '../data/kidsStories';
import { speakAcademyText, cancelAllSpeech, createManagedAudio } from '../lib/audio';
import confetti from 'canvas-confetti';
import {
  SectionShell,
  GoldCard,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace,
} from './ui/academy';

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
  const [isPlayingFullDialogue, setIsPlayingFullDialogue] = useState<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);
  
  // Speaking/Recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [recordSuccess, setRecordSuccess] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic translated speakers mapping with custom emojis
  const getSpeakerLabel = (speaker: string, isRtl: boolean) => {
    if (speaker === 'Noor') return isRtl ? 'نور 👩' : 'Noor 👩';
    
    const translations: Record<string, { ar: string, en: string }> = {
      'Officer': { ar: 'الضابط 👮', en: 'Officer 👮' },
      'Security Officer': { ar: 'ضابط الأمن 👮', en: 'Security Officer 👮' },
      'Driver': { ar: 'السائق 🚌', en: 'Driver 🚌' },
      'Bus Driver': { ar: 'سائق الحافلة 🚌', en: 'Bus Driver 🚌' },
      'Machine': { ar: 'الآلة 🤖', en: 'Machine 🤖' },
      'Ticket Machine': { ar: 'آلة التذاكر 🤖', en: 'Ticket Machine 🤖' },
      'Ticket Machine (voice)': { ar: 'آلة التذاكر 🤖', en: 'Ticket Machine 🤖' },
      'Ticket Machine Voice': { ar: 'آلة التذاكر 🤖', en: 'Ticket Machine 🤖' },
      'Guard': { ar: 'الحارس 👮', en: 'Guard 👮' },
      'Museum Guard': { ar: 'حارس المتحف 👮', en: 'Museum Guard 👮' },
      'Shopkeeper': { ar: 'البائع 👨‍💼', en: 'Shopkeeper 👨‍💼' },
      'Assistant': { ar: 'المساعد 💁‍♂️', en: 'Assistant 💁‍♂️' },
      'Shop Assistant': { ar: 'مساعد المتجر 💁‍♂️', en: 'Shop Assistant 💁‍♂️' },
      'Guide': { ar: 'المرشد 🗺️', en: 'Guide 🗺️' },
      'Tour Guide': { ar: 'المرشد السياحي 🗺️', en: 'Tour Guide 🗺️' },
      'Pharmacist': { ar: 'الصيدلاني 👨‍⚕️', en: 'Pharmacist 👨‍⚕️' },
      'Clerk': { ar: 'الموظف 👨‍💼', en: 'Clerk 👨‍💼' },
      'Post Office Clerk': { ar: 'موظف البريد 👨‍💼', en: 'Post Office Clerk 👨‍💼' },
      'Emma': { ar: 'إيما 👧', en: 'Emma 👧' },
      'Owner': { ar: 'صاحب المحل 👨‍💼', en: 'Owner 👨‍💼' },
      'Pet Shop Owner': { ar: 'صاحب محل الأليفة 👨‍💼', en: 'Pet Shop Owner 👨‍💼' },
      'Mrs. Smith': { ar: 'السيدة سميث 👵', en: 'Mrs. Smith 👵' },
      'Host Mum (Mrs. Smith)': { ar: 'المضيفة السيدة سميث 👵', en: 'Mrs. Smith 👵' },
      'Firefighter': { ar: 'الإطفائي 👨‍🚒', en: 'Firefighter 👨‍🚒' },
      'Agent': { ar: 'الموظف 👨‍💼', en: 'Agent 👨‍💼' },
      'Check-in Agent': { ar: 'موظف المطار 👨‍💼', en: 'Check-in Agent 👨‍💼' },
      'Mother': { ar: 'الأم 👩', en: 'Mother 👩' },
      'Noor\'s Mother': { ar: 'أُم نور 👩', en: 'Mother 👩' }
    };

    const key = speaker.trim();
    if (translations[key]) {
      return isRtl ? translations[key].ar : translations[key].en;
    }
    return speaker;
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      cancelAllSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    // Stop autoplay when stage changes
    isPlayingRef.current = false;
    setIsPlayingFullDialogue(false);
    setActiveSpeechLine(null);
    cancelAllSpeech();
  }, [currentStage]);

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

  const startFullDialogueReading = async () => {
    if (isPlayingFullDialogue) {
      isPlayingRef.current = false;
      setIsPlayingFullDialogue(false);
      setActiveSpeechLine(null);
      cancelAllSpeech();
      return;
    }

    cancelAllSpeech();
    isPlayingRef.current = true;
    setIsPlayingFullDialogue(true);

    const dialogueLines = story.sections.story_dialogue.lines;
    for (let i = 0; i < dialogueLines.length; i++) {
      if (!isPlayingRef.current) break;

      setActiveSpeechLine(i);
      
      await new Promise<void>((resolve) => {
        speakAcademyText(dialogueLines[i].english, 'en', () => {}, () => {
          resolve();
        });
      });
      
      if (isPlayingRef.current) {
        await new Promise<void>((resolve) => setTimeout(resolve, 800));
      }
    }

    setIsPlayingFullDialogue(false);
    setActiveSpeechLine(null);
  };

  const playTTS = async (text: string, voiceLang: 'en' | 'ar' = 'en', index?: number) => {
    if (isPlayingFullDialogue) {
      isPlayingRef.current = false;
      setIsPlayingFullDialogue(false);
    }
    if (index !== undefined) {
      setActiveSpeechLine(index);
    }
    await speakAcademyText(text, voiceLang, () => {}, () => {
      if (index !== undefined) setActiveSpeechLine(null);
    });
  };

  const handleStartRecord = async () => {
    try {
      audioChunksRef.current = [];
      setAudioUrl(null);
      setRecordSuccess(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        
        let mimeType = 'audio/webm';
        if (typeof MediaRecorder !== 'undefined' && !MediaRecorder.isTypeSupported('audio/webm')) {
          if (MediaRecorder.isTypeSupported('audio/mp4')) {
            mimeType = 'audio/mp4';
          } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
            mimeType = 'audio/ogg';
          } else if (MediaRecorder.isTypeSupported('audio/wav')) {
            mimeType = 'audio/wav';
          }
        }
        
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setIsRecording(false);
        setRecordSuccess(true);
        triggerSuccessConfetti();
        playTTS("Exceptional job acting as Noor!", "en");
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch {
      setIsRecording(true);
      setRecordSuccess(false);
    }
  };

  const handleStopRecord = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    } else if (isRecording) {
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
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : 'font-sans'}>
      {/* Top Header Card */}
      <GoldCard className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <TutorFace tutor="sara" size="md" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ProgressPill>
                {story.series} • {isRtl ? `الحلقة ${story.episode}` : `Episode ${story.episode}`}
              </ProgressPill>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-[#002147]">
              {isRtl ? story.title_ar : story.title_en}
            </h1>
          </div>
        </div>
        <GhostButton onClick={onBack}>
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'بوابة المغامرات' : 'Adventures Portal'}</span>
        </GhostButton>
      </GoldCard>

      {/* Story Metadata & Trackers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <GoldCard className="p-3 text-center">
          <span className="text-[10px] font-bold text-[#002147]/60 block uppercase mb-1">
            {isRtl ? 'الموقع الجغرافي' : 'Location'}
          </span>
          <span className="font-black text-xs sm:text-sm text-[#002147] flex items-center justify-center gap-1">
            📍 {story.location}
          </span>
        </GoldCard>
        <GoldCard className="p-3 text-center">
          <span className="text-[10px] font-bold text-[#002147]/60 block uppercase mb-1">
            {isRtl ? 'المجموعة العمرية' : 'Age range'}
          </span>
          <span className="font-black text-xs sm:text-sm text-[#002147] flex items-center justify-center gap-1">
            👶 {story.age_range} {isRtl ? 'سنة' : 'years'}
          </span>
        </GoldCard>
        <GoldCard className="p-3 text-center">
          <span className="text-[10px] font-bold text-[#002147]/60 block uppercase mb-1">
            {isRtl ? 'المستوى اللغوي' : 'Proficiency check'}
          </span>
          <span className="px-2.5 py-0.5 bg-[#002147] text-[#E6C36A] text-xs font-black rounded-full inline-block">
            {story.level}
          </span>
        </GoldCard>
        <GoldCard className="p-3 text-center">
          <span className="text-[10px] font-bold text-[#002147]/60 block uppercase mb-1">
            {isRtl ? 'المدة التقديرية' : 'Duration'}
          </span>
          <span className="font-black text-xs sm:text-sm text-[#002147] flex items-center justify-center gap-1">
            ⏱️ {story.duration_minutes} {isRtl ? 'دقيقة' : 'mins'}
          </span>
        </GoldCard>
      </div>

      {/* Stage Step Trail */}
      <GoldCard className="p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-bold text-[#002147]">
          <div className="flex items-center gap-2">
            <ProgressPill>{currentStage} / 5</ProgressPill>
            <span className="font-black text-[#002147]">
              {currentStage === 1 && (isRtl ? 'الحوار الثنائي المقروء' : 'Double Bilingual Scene')}
              {currentStage === 2 && (isRtl ? 'قاموس الكلمات الذهبية' : 'Golden Dictionary')}
              {currentStage === 3 && (isRtl ? 'التصويب التفاعلي للذكاء' : 'Interactive Blank Test')}
              {currentStage === 4 && (isRtl ? 'تحدي تقليد الشخصيات' : 'Character Acting Challenge')}
              {currentStage === 5 && (isRtl ? 'التكريم ووسام البطولة' : 'Hero Crown & Certificate')}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#002147]/65">
            {isRtl ? 'مسيرة القصة اليوم' : 'Mission Map'}
          </span>
        </div>
        <div className="w-full bg-[#fdfaf3] border border-[#C49E3A]/30 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#C49E3A] h-full transition-all duration-300"
            style={{ width: `${currentPercent}%` }}
          />
        </div>
      </GoldCard>

      {/* Main Interactive Stage Sandbox */}
      <GoldCard className="p-5 sm:p-7 relative min-h-[460px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`story-stage-${currentStage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col justify-between"
          >
            {/* Stage 1: Dialogue stream */}
            {currentStage === 1 && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-[#C49E3A]/20 pb-4">
                  <TutorFace tutor="sara" size="sm" />
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-black text-[#002147] flex items-center gap-2">
                      <MessageSquare className="text-[#C49E3A]" size={20} />
                      <span>{isRtl ? 'حوار المحطة: استمع واقرأ بصوتك الفخم!' : 'The Station Dialogue: Tap & Practice!'}</span>
                    </h2>
                    <p className="text-xs text-[#002147]/70 font-bold mt-0.5">{story.sections.story_dialogue.instructions_ar}</p>
                  </div>
                </div>

                {/* Autoplay sequential reader row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#fdfaf3] p-3 rounded-2xl border border-[#C49E3A]/40">
                  <PrimaryButton onClick={startFullDialogueReading} className="text-xs">
                    {isPlayingFullDialogue ? (
                      <>
                        <Pause size={13} />
                        <span>{isRtl ? 'إيقاف الاستماع التلقائي' : 'Stop Autoplay Reader'}</span>
                      </>
                    ) : (
                      <>
                        <Play size={13} fill="currentColor" />
                        <span>{isRtl ? 'استمع إلى الحوار كاملاً بالإنجليزية' : 'Read Full Dialogue in English'}</span>
                      </>
                    )}
                  </PrimaryButton>
                  <p className="text-xs text-[#002147]/70 font-bold flex-1">
                    {isRtl ? 'يمكنك الاستماع إلى الحوار بالكامل أو الضغط على كل بطاقة لسماعها مفرداً.' : 'Listen to the entire conversation sequentially or tap individual cards!'}
                  </p>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {story.sections.story_dialogue.lines.map((ln, idx) => {
                    const isNoor = ln.speaker === 'Noor';
                    const isLineActive = activeSpeechLine === idx;
                    
                    return (
                      <div 
                        key={`ln-${idx}`}
                        onClick={() => playTTS(ln.english, 'en', idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          isNoor 
                            ? 'bg-[#fdfaf3] border-[#C49E3A]/50' 
                            : 'bg-white border-[#002147]/20 hover:border-[#C49E3A]/60'
                        } ${isLineActive ? 'ring-2 ring-[#C49E3A] border-[#C49E3A]' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#C49E3A]" />
                            <span className="font-black text-[#002147] text-xs uppercase tracking-wider">
                              {getSpeakerLabel(ln.speaker, isRtl)}
                            </span>
                          </div>
                          <GhostButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              playTTS(ln.english, 'en', idx);
                            }}
                            className="!py-1 !px-2.5 text-[11px]"
                          >
                            <Volume2 size={13} className={isLineActive ? 'text-[#C49E3A]' : ''} />
                            <span>{isRtl ? 'استمع' : 'Listen'}</span>
                          </GhostButton>
                        </div>

                        <p className="font-mono font-black text-[#002147] text-sm sm:text-base mb-1" dir="ltr">
                          {ln.english}
                        </p>
                        <p className="text-[#002147]/70 text-xs font-semibold leading-relaxed pt-1 border-t border-[#C49E3A]/20">
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
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-[#C49E3A]/20 pb-4">
                  <TutorFace tutor="sara" size="sm" />
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-black text-[#002147] flex items-center gap-2">
                      <BookOpen className="text-[#C49E3A]" size={20} />
                      <span>{isRtl ? 'قاموس نور للكلمات الذهبية السريعة:' : 'Noor\'s Golden Mini-Dictionary:'}</span>
                    </h2>
                    <p className="text-xs text-[#002147]/70 font-bold mt-0.5">{story.sections.mini_dictionary.instructions_ar}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {story.sections.mini_dictionary.words.map((w, idx) => (
                    <div 
                      key={`vocab-${idx}`}
                      className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-black text-base sm:text-lg text-[#002147]">{w.word}</span>
                        <div className="flex items-center gap-2">
                          {w.important && (
                            <span className="bg-[#002147] text-[#E6C36A] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star size={10} fill="currentColor" />
                              <span>{isRtl ? 'مهم' : 'Vital'}</span>
                            </span>
                          )}
                          <GhostButton 
                            onClick={() => playTTS(w.word, 'en')}
                            className="!p-1.5"
                          >
                            <Volume2 size={14} />
                          </GhostButton>
                        </div>
                      </div>
                      <p className="text-[#002147]/80 text-xs sm:text-sm font-bold">{w.meaning_ar}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 3: Fill practice */}
            {currentStage === 3 && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-[#C49E3A]/20 pb-4">
                  <TutorFace tutor="sara" size="sm" />
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-black text-[#002147] flex items-center gap-2">
                      <BadgeHelp className="text-[#C49E3A]" size={20} />
                      <span>{isRtl ? 'لغز المطار: أكمل الفراغات!' : 'The Airport Puzzle: Word Drop!'}</span>
                    </h2>
                    <p className="text-xs text-[#002147]/70 font-bold mt-0.5">{story.sections.practice.instructions_ar}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {story.sections.practice.questions.map((q, idx) => {
                    const ans = selectedAnswers[idx];
                    const correctAns = story.sections.practice.questions[idx].correct;
                    const isCorrect = ans === correctAns;
                    
                    return (
                      <div key={`pq-${idx}`} className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-4 sm:p-5 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <ProgressPill className="text-[10px]">
                            {isRtl ? `تحدي رقم ${idx + 1}` : `Challenge #${idx + 1}`}
                          </ProgressPill>
                          <GhostButton
                            onClick={() => playTTS(q.sentence.replace('_____', 'blank'), 'en')}
                            className="!p-1.5"
                          >
                            <Volume2 size={13} />
                          </GhostButton>
                        </div>

                        {/* Sentence */}
                        <p className="font-mono font-bold text-center text-[#002147] text-sm sm:text-base mb-4" dir="ltr">
                          {q.sentence.split('_____').map((segment, sIdx) => (
                            <React.Fragment key={`s-${sIdx}`}>
                              {segment}
                              {sIdx === 0 && (
                                <span className={`inline-block px-3 py-1 border rounded-lg text-xs sm:text-sm font-mono mx-1 min-w-[70px] text-center ${
                                  ans 
                                    ? (isCorrect ? 'bg-green-100 text-green-900 border-green-500 font-black' : 'bg-red-100 text-red-900 border-red-500 font-black') 
                                    : 'bg-white text-[#002147]/40 border-[#C49E3A]/40'
                                }`}>
                                  {ans || '.....'}
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </p>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {q.options.map(opt => {
                            const isThisSelected = ans === opt;
                            const optState = ans ? (isThisSelected ? (isCorrect ? 'correct' : 'wrong') : 'normal') : 'normal';
                            return (
                              <AnswerOption
                                key={opt}
                                label={<span className="font-mono text-center block w-full">{opt}</span>}
                                selected={isThisSelected}
                                state={optState}
                                onClick={() => selectAnswer(idx, opt)}
                              />
                            );
                          })}
                        </div>

                        {/* Feedback message */}
                        {ans && (
                          <div className={`mt-3 text-xs font-black text-center flex items-center justify-center gap-1.5 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? (
                              <>
                                <CheckCircle2 size={14} />
                                <span>{isRtl ? 'إجابة ممتازة فصيحة!' : 'Perfect choice!'}</span>
                              </>
                            ) : (
                              <>
                                <X size={14} />
                                <span>{isRtl ? `غير دقيقة! الكلمة الفصيحة هي: ${q.correct}` : `Try again! The correct word is: ${q.correct}`}</span>
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
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-[#C49E3A]/20 pb-4">
                  <TutorFace tutor="sara" size="sm" />
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-black text-[#002147] flex items-center gap-2">
                      <Mic className="text-[#C49E3A]" size={20} />
                      <span>{isRtl ? 'تحدي تقمص الشخصية: تكلم مثل نور!' : 'Character Voice Gym: Speak like Noor!'}</span>
                    </h2>
                    <p className="text-xs text-[#002147]/70 font-bold mt-0.5">{story.sections.acting_challenge.instructions_ar}</p>
                  </div>
                </div>

                <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-5 sm:p-7 rounded-2xl text-center space-y-4">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#C49E3A]/40 max-w-md mx-auto shadow-sm">
                    <span className="text-[10px] font-black text-[#C49E3A] block uppercase mb-1">
                      {isRtl ? 'اقرأ الجملة بلهجة تسائلية شجاعة:' : 'Read loudly with courage:'}
                    </span>
                    <p className="font-mono font-black text-[#002147] text-base sm:text-lg" dir="ltr">
                      "{story.sections.acting_challenge.sentence}"
                    </p>
                    <GhostButton
                      onClick={() => playTTS(story.sections.acting_challenge.sentence, 'en')}
                      className="mt-3 mx-auto"
                    >
                      <Volume2 size={13} />
                      <span>{isRtl ? 'الاستماع للفظ التدريبي' : 'Listen Coach'}</span>
                    </GhostButton>
                  </div>

                  <div className="py-2">
                    {isRecording ? (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block" />
                        <span className="text-xs font-black text-red-600">
                          {isRtl ? 'جارٍ تسجيل صوتك الآن...' : 'Recording in progress...'} ({duration}s)
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#002147]/65 font-bold">
                        {recordSuccess 
                          ? (isRtl ? 'تم التحليل الفوري للمطابقة بنجاح!' : 'Voice matched successfully!') 
                          : (isRtl ? 'الميكروفون مهيأ ومستعد للاستقبال' : 'Mic waiting for your command')}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-center gap-3 flex-wrap">
                    {isRecording ? (
                      <PrimaryButton onClick={handleStopRecord} className="!bg-red-700 !border-red-800 text-white">
                        <Square size={14} fill="currentColor" />
                        <span>{isRtl ? 'استعراض النتيجة' : 'Analyze results'}</span>
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton onClick={handleStartRecord}>
                        <Mic size={14} />
                        <span>{recordSuccess ? (isRtl ? 'إعادة تسجيل الصوت 🔄' : 'Re-record 🔄') : (isRtl ? 'اضغط وتكلم الآن 🗣️' : 'Press to Speak Now 🗣️')}</span>
                      </PrimaryButton>
                    )}

                    {recordSuccess && audioUrl && (
                      <GhostButton
                        onClick={() => {
                          const speech = createManagedAudio(audioUrl);
                          speech.play();
                        }}
                      >
                        <Headphones size={14} />
                        <span>{isRtl ? 'استمع لتسجيلك الخاص' : 'Play back'}</span>
                      </GhostButton>
                    )}
                  </div>

                  {recordSuccess && (
                    <div className="bg-green-50 border border-green-600/30 text-green-900 p-3.5 rounded-xl max-w-sm mx-auto text-center flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      <div>
                        <p className="font-extrabold text-xs">{isRtl ? 'تم التحقق بنجاح مبهر لتقليد نور!' : 'Noor acting match accepted!'}</p>
                        <p className="text-[10px] text-green-800/80 font-mono font-bold">Accuracy index: 95% • Fluency score: Top Tier</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stage 5: Hero complete */}
            {currentStage === 5 && (
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Trophy size={32} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#002147]">
                    {isRtl ? 'لقد تم تنصيبك كبطل للحلقة!' : 'Official Hero of the Episode!'}
                  </h2>
                  <div className="flex justify-center">
                    <ProgressPill className="text-xs">
                      +150 XP VIP BONUS COMPLETE
                    </ProgressPill>
                  </div>

                  <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-5 rounded-2xl max-w-lg mx-auto text-start">
                    <div className="flex items-center gap-2.5 mb-2">
                      <TutorFace tutor="sara" size="sm" />
                      <h4 className="font-black text-[#002147] text-sm">{isRtl ? 'تهنئة باسم الخليل الخاصة لك:' : 'VIP Mentor Note:'}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#002147]/85 font-semibold leading-relaxed whitespace-pre-line">
                      {story.sections.encouragement.content_ar}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col items-center">
                  <PrimaryButton
                    onClick={() => onComplete(150)}
                    className="py-3 px-8 text-sm sm:text-base w-full max-w-sm"
                  >
                    <span>{isRtl ? 'حصد الجائزة ونقاط البطولة ✨' : 'Claim Hero Reward +150 XP ✨'}</span>
                  </PrimaryButton>
                  
                  <p className="text-[10px] text-[#002147]/60 font-bold uppercase tracking-wider mt-3 text-center">
                    {isRtl ? 'أكاديمية باسم الخليل • مغامرات لندن التفاعلية • اكتملت السلسلة بنجاح 🌟' : 'Basim Alkhalil Interactive London Adventures • Series Complete 🌟'}
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Walkthrough Arrows */}
            {currentStage < 5 && (
              <div className="flex justify-between items-center border-t border-[#C49E3A]/20 pt-4 mt-6">
                {currentStage > 1 ? (
                  <GhostButton onClick={handleBack}>
                    <ArrowLeft size={15} className={isRtl ? 'rotate-180' : ''} />
                    <span>{isRtl ? 'السابق' : 'Prev block'}</span>
                  </GhostButton>
                ) : <div />}

                <PrimaryButton onClick={handleNext}>
                  <span>{isRtl ? 'المرحلة التالية' : 'Next block'}</span>
                  <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
                </PrimaryButton>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </GoldCard>
    </SectionShell>
  );
};
