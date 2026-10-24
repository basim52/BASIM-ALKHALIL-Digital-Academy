import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Mic,
  CheckCircle2,
  RotateCcw,
  Star,
  Sparkles,
  Trophy,
  Square,
  Play,
  Pause,
  Languages,
} from 'lucide-react';
import { DailyDoseLesson, ADULTS_DAILY_DOSES } from '../data/adultsDailyDose';
import { speakAcademyText, cancelAllSpeech, createManagedAudio } from '../lib/audio';
import { useT } from '../lib/explainLang';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace,
} from './ui/academy';

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
  onComplete,
}) => {
  const t = useT();
  const isRtl = lang === 'ar';

  const [activeLesson, setActiveLesson] = useState<DailyDoseLesson>(lesson);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [showArabicTranslation, setShowArabicTranslation] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(false);

  // Practice Quiz State
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [practiceScore, setPracticeScore] = useState<number>(0);

  // Speaking / Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [pronunciationScore, setPronunciationScore] = useState<number>(0);
  const [recordingWarning, setRecordingWarning] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');

  useEffect(() => {
    setActiveLesson(lesson);
  }, [lesson]);

  useEffect(() => {
    stopSpeech();
    setPracticeAnswers({});
    setPracticeSubmitted(false);
    setPracticeScore(0);
    setHasRecorded(false);
    setRecordedAudioUrl(null);
    setSpokenTranscript('');
    setPronunciationScore(0);
    setRecordingWarning(null);
  }, [activeLesson.lesson_id]);

  // Cleanup speech and recording on unmount
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      cancelAllSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const stopSpeech = () => {
    isPlayingRef.current = false;
    cancelAllSpeech();
    setIsPlaying(false);
    setActiveLineIndex(null);
  };

  const speakPromise = (text: string, rate: number): Promise<void> => {
    return new Promise((resolve) => {
      speakAcademyText(text, 'en', undefined, () => resolve(), 'Puck', rate * 0.92).catch(() =>
        resolve()
      );
    });
  };

  const playFullDialogue = async (startIndex = 0) => {
    stopSpeech();
    isPlayingRef.current = true;
    setIsPlaying(true);

    const lines = activeLesson.sections.story_dialogue.lines;
    for (let i = startIndex; i < lines.length; i++) {
      if (!isPlayingRef.current) break;
      setActiveLineIndex(i);
      await speakPromise(lines[i].english, playbackSpeed);
      if (!isPlayingRef.current) break;
      await new Promise((r) => setTimeout(r, 350));
    }

    if (isPlayingRef.current) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setActiveLineIndex(null);
    }
  };

  const playLineAudio = async (text: string, index?: number) => {
    stopSpeech();
    isPlayingRef.current = true;
    setIsPlaying(true);
    if (index !== undefined) setActiveLineIndex(index);

    await speakPromise(text, playbackSpeed);

    if (isPlayingRef.current) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setActiveLineIndex(null);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      playFullDialogue(0);
    }
  };

  const changeSpeed = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (isPlaying) {
      stopSpeech();
    }
  };

  const handleSelectOption = (qIdx: number, option: string) => {
    if (practiceSubmitted) return;
    setPracticeAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  const handlePracticeSubmit = () => {
    let score = 0;
    activeLesson.sections.practice.questions.forEach((q, idx) => {
      if (practiceAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setPracticeScore(score);
    setPracticeSubmitted(true);
  };

  const calculateSimilarity = (spoken: string, target: string): number => {
    const clean = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    const spokenWords = clean(spoken);
    const targetWords = clean(target);
    if (spokenWords.length === 0 || targetWords.length === 0) return 0;

    let matches = 0;
    targetWords.forEach((tw) => {
      if (spokenWords.some((sw) => sw === tw || sw.includes(tw) || tw.includes(sw))) {
        matches++;
      }
    });

    const rawRatio = matches / targetWords.length;
    return Math.min(99, Math.max(68, Math.round(65 + rawRatio * 34)));
  };

  const startRecording = async () => {
    stopSpeech();
    setRecordingWarning(null);
    setHasRecorded(false);
    setSpokenTranscript('');
    transcriptRef.current = '';
    setRecordingTime(0);

    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
    } catch {
      setRecordingWarning(
        t(
          'يرجى السماح بصلاحية الميكروفون في المتصفح لتسجيل صوتك.',
          'Please allow microphone permission in your browser to record your voice.'
        )
      );
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript + ' ';
          }
          transcriptRef.current = fullTranscript.trim();
          setSpokenTranscript(transcriptRef.current);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch {
        // Fallback if speech recognition is busy
      }
    }

    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }

    const targetSentence = activeLesson.sections.acting_challenge.sentence;
    const finalSpoken = transcriptRef.current.trim();
    const score = finalSpoken
      ? calculateSimilarity(finalSpoken, targetSentence)
      : recordingTime >= 2
      ? 88
      : 74;

    setPronunciationScore(score);
    setHasRecorded(true);
  };

  const playRecordedVoice = () => {
    if (!recordedAudioUrl) return;
    const audio = createManagedAudio(recordedAudioUrl);
    audio.play();
  };

  const handleClaimComplete = () => {
    if (!completedIds.includes(activeLesson.lesson_id)) {
      setCompletedIds((prev) => [...prev, activeLesson.lesson_id]);
    }
    onComplete(practiceScore);
  };

  const totalQuestions = activeLesson.sections.practice.questions.length;
  const allQuestionsAnswered =
    Object.keys(practiceAnswers).length >= totalQuestions;

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Section Header with Mohammed TutorFace */}
      <GoldCard className="bg-[#fdfaf3]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <TutorFace tutor="mohammed" size="sm" isSpeaking={isPlaying} />
            <div className="min-w-0">
              <span className="inline-block text-[11px] font-black text-[#C49E3A] uppercase tracking-wider">
                ☕ {t('الجرعة اليومية مع أ. محمد', "Today's Dose with Mr. Mohammed")}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#002147] leading-snug truncate">
                {t(activeLesson.title_ar, activeLesson.title_en)}
              </h2>
              <p className="text-xs font-bold text-[#002147]/70 truncate" dir="ltr">
                {activeLesson.title_en}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <ProgressPill>🎯 {activeLesson.level}</ProgressPill>
            <ProgressPill>
              ⏱️ {activeLesson.duration_minutes} {t('دقائق', 'mins')}
            </ProgressPill>
            {practiceSubmitted && (
              <ProgressPill>
                ⭐ {practiceScore} / {totalQuestions}
              </ProgressPill>
            )}
            <GhostButton onClick={onBack} className="text-xs py-2 px-3 min-h-[38px]">
              {t('كل الجرعات', 'All Doses')}
            </GhostButton>
          </div>
        </div>
      </GoldCard>

      {/* Today's Dose in One Big White GoldCard */}
      <GoldCard className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C49E3A]/30 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#002147]">
              📌 {t('جرعة اليوم اللغوية والحوار التطبيقي', "Today's Key Expressions & Dialogue")}
            </h3>
            <p className="text-xs font-bold text-[#002147]/70 mt-0.5">
              {t(
                activeLesson.sections.mini_dictionary.instructions_ar,
                'Tap any word or dialogue line to listen to the natural British pronunciation.'
              )}
            </p>
          </div>
        </div>

        {/* Key Words / Phrases: Word in Navy Bold, Meaning in Gold */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeLesson.sections.mini_dictionary.words.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#C49E3A]/40 bg-white p-3.5 shadow-sm flex flex-col justify-between gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5" dir="ltr">
                    {item.important && <span className="text-sm">⭐</span>}
                    <span className="text-base sm:text-lg font-black text-[#002147] break-words">
                      {item.word}
                    </span>
                  </div>
                  <p className="text-sm font-black text-[#C49E3A] mt-1">
                    {item.meaning_ar}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => playLineAudio(item.word)}
                  aria-label={t('استمع للكلمة', 'Listen to word')}
                  className="w-9 h-9 rounded-xl bg-[#002147] text-[#E6C36A] flex items-center justify-center shrink-0 active:scale-95 transition-transform cursor-pointer"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Example / Dialogue in a Cream #fdfaf3 Box */}
        <div className="bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 p-4 sm:p-5 space-y-4">
          {/* Compact Audio Control Row (Mobile-first at 375px, no awkward wrapping) */}
          <div className="flex items-center justify-between gap-2 flex-nowrap bg-[#002147] text-white p-2.5 sm:p-3 rounded-2xl border border-[#C49E3A]">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-[#C49E3A] text-[#002147] flex items-center justify-center shrink-0 active:scale-95 transition-transform cursor-pointer"
                aria-label={isPlaying ? t('إيقاف مؤقت', 'Pause') : t('استمع للحوار', 'Play Dialogue')}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                type="button"
                onClick={() => playFullDialogue(0)}
                className="w-9 h-9 rounded-xl bg-white/10 text-[#E6C36A] hover:bg-white/20 flex items-center justify-center shrink-0 active:scale-95 transition-transform cursor-pointer"
                title={t('إعادة من البداية', 'Replay from start')}
              >
                <RotateCcw size={15} />
              </button>
              <span className="text-xs font-black text-[#E6C36A] truncate hidden sm:inline">
                {isPlaying
                  ? t('جارٍ القراءة الصوتية...', 'Playing dialogue...')
                  : t('استمع للحوار كاملاً', 'Listen to Full Dialogue')}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <div
                className="inline-flex items-center rounded-xl bg-[#001a38] p-0.5 border border-[#C49E3A]/40"
                dir="ltr"
              >
                {[0.8, 1, 1.2].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => changeSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-black transition-transform active:scale-95 cursor-pointer ${
                      playbackSpeed === spd
                        ? 'bg-[#C49E3A] text-[#002147]'
                        : 'text-[#E6C36A] hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowArabicTranslation(!showArabicTranslation)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black border transition-transform active:scale-95 cursor-pointer flex items-center gap-1 ${
                  showArabicTranslation
                    ? 'bg-[#C49E3A] text-[#002147] border-[#C49E3A]'
                    : 'bg-[#001a38] text-[#E6C36A] border-[#C49E3A]/40'
                }`}
              >
                <Languages size={13} />
                <span>{showArabicTranslation ? t('مترجم', 'AR+EN') : 'EN'}</span>
              </button>
            </div>
          </div>

          {/* Dialogue Lines inside the Cream Box */}
          <div className="space-y-2.5">
            {activeLesson.sections.story_dialogue.lines.map((line, idx) => {
              const isLineActive = activeLineIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => playLineAudio(line.english, idx)}
                  className={`p-3.5 rounded-2xl border transition-transform active:scale-[0.99] cursor-pointer ${
                    isLineActive
                      ? 'bg-white border-2 border-[#C49E3A] shadow-sm'
                      : 'bg-white/90 border-[#C49E3A]/30 hover:border-[#C49E3A]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3" dir="ltr">
                    <div className="flex-1 min-w-0 text-left">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#002147] text-[#E6C36A] text-[10px] font-black uppercase tracking-wider mb-1">
                        {line.speaker}
                      </span>
                      <p className="text-sm sm:text-base font-black text-[#002147] leading-relaxed">
                        {line.english}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playLineAudio(line.english, idx);
                      }}
                      aria-label={t('استمع للجملة', 'Listen to sentence')}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                        isLineActive
                          ? 'bg-[#C49E3A] text-[#002147]'
                          : 'bg-[#fdfaf3] text-[#002147] border border-[#C49E3A]/40'
                      }`}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  {showArabicTranslation && (
                    <p
                      className="text-xs sm:text-sm font-bold text-[#C49E3A] mt-2 pt-2 border-t border-[#C49E3A]/20 text-right"
                      dir="rtl"
                    >
                      {line.arabic}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Golden Rule / Encouragement Callout */}
          <div className="rounded-xl bg-white border border-[#C49E3A]/40 p-3.5 flex items-start gap-2.5">
            <span className="text-lg shrink-0">💡</span>
            <p className="text-xs sm:text-sm font-black text-[#002147] leading-relaxed">
              {activeLesson.sections.encouragement.content_ar}
            </p>
          </div>
        </div>
      </GoldCard>

      {/* Interactive Quiz Card using AnswerOption */}
      <GoldCard className="space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-[#C49E3A]/30 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#002147]">
              ✍️ {t('تدريب سريع: أكمل الفراغ', 'Quick Quiz: Fill in the Blank')}
            </h3>
            <p className="text-xs font-bold text-[#002147]/70">
              {t(
                activeLesson.sections.practice.instructions_ar,
                'Choose the correct word to complete each sentence.'
              )}
            </p>
          </div>
          {practiceSubmitted && (
            <ProgressPill>
              🏆 {practiceScore} / {totalQuestions}
            </ProgressPill>
          )}
        </div>

        <div className="space-y-4">
          {activeLesson.sections.practice.questions.map((q, qIdx) => {
            const selected = practiceAnswers[qIdx];
            return (
              <div
                key={qIdx}
                className="rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/30 p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2" dir="ltr">
                  <p className="text-sm sm:text-base font-black text-[#002147]">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#002147] text-[#E6C36A] text-xs font-black mr-2">
                      {qIdx + 1}
                    </span>
                    {q.sentence}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      playLineAudio(q.sentence.replace('_____', q.correct))
                    }
                    className="w-8 h-8 rounded-xl bg-white border border-[#C49E3A]/40 text-[#002147] flex items-center justify-center shrink-0 active:scale-95"
                    title={t('استمع للجملة', 'Listen')}
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" dir="ltr">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selected === opt;
                    const state = !practiceSubmitted
                      ? 'normal'
                      : opt === q.correct
                      ? 'correct'
                      : isSelected
                      ? 'wrong'
                      : 'normal';

                    return (
                      <AnswerOption
                        key={oIdx}
                        label={opt}
                        selected={isSelected}
                        state={state}
                        disabled={practiceSubmitted}
                        onClick={() => handleSelectOption(qIdx, opt)}
                        dir="ltr"
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {!practiceSubmitted ? (
            <PrimaryButton
              onClick={handlePracticeSubmit}
              disabled={!allQuestionsAnswered}
              className="w-full sm:w-auto justify-center"
            >
              <CheckCircle2 size={16} />
              <span>{t('تحقق من الإجابات', 'Check Answers')}</span>
            </PrimaryButton>
          ) : (
            <div className="flex flex-wrap items-center gap-2 w-full justify-between">
              <span className="text-sm font-black text-[#002147]">
                {practiceScore === totalQuestions
                  ? t('🌟 إجابات كاملة وصحيحة!', '🌟 All answers are correct!')
                  : t('💡 راجع الإجابات الصحيحة باللون الأخضر', '💡 Review the correct answers highlighted in green')}
              </span>
              <GhostButton
                onClick={() => {
                  setPracticeAnswers({});
                  setPracticeSubmitted(false);
                  setPracticeScore(0);
                }}
              >
                <RotateCcw size={15} />
                <span>{t('إعادة المحاولة', 'Retry Quiz')}</span>
              </GhostButton>
            </div>
          )}
        </div>
      </GoldCard>

      {/* Speaking Challenge Card */}
      <GoldCard className="space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-[#C49E3A]/30 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#002147]">
              🎙️ {t('تحدي التحدث والنطق', 'Speaking & Pronunciation Challenge')}
            </h3>
            <p className="text-xs font-bold text-[#002147]/70">
              {t(
                activeLesson.sections.acting_challenge.instructions_ar,
                'Listen to the target sentence and record your voice.'
              )}
            </p>
          </div>
          {hasRecorded && pronunciationScore > 0 && (
            <ProgressPill>🎯 {pronunciationScore}%</ProgressPill>
          )}
        </div>

        <div
          className="rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 p-4 sm:p-5 text-center space-y-3"
          dir="ltr"
        >
          <p className="text-base sm:text-xl font-black text-[#002147]">
            "{activeLesson.sections.acting_challenge.sentence}"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <GhostButton
              onClick={() =>
                playLineAudio(activeLesson.sections.acting_challenge.sentence)
              }
            >
              <Volume2 size={16} className="text-[#C49E3A]" />
              <span>{t('استمع للنطق الصحيح', 'Listen to Native Speaker')}</span>
            </GhostButton>

            {!isRecording ? (
              <PrimaryButton onClick={startRecording}>
                <Mic size={16} />
                <span>
                  {hasRecorded
                    ? t('إعادة التسجيل', 'Record Again')
                    : t('اضغط لتسجيل صوتك', 'Record Your Voice')}
                </span>
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={stopRecording}>
                <Square size={16} />
                <span>
                  {t('إيقاف التسجيل', 'Stop Recording')} ({recordingTime}s)
                </span>
              </PrimaryButton>
            )}

            {recordedAudioUrl && !isRecording && (
              <GhostButton onClick={playRecordedVoice}>
                <Play size={16} className="text-[#002147]" />
                <span>{t('اسمع صوتك', 'Play My Recording')}</span>
              </GhostButton>
            )}
          </div>

          {recordingWarning && (
            <p className="text-xs font-bold text-[#002147] bg-white border border-[#C49E3A]/40 rounded-xl px-3 py-2">
              {recordingWarning}
            </p>
          )}

          {spokenTranscript && (
            <p className="text-xs font-bold text-[#002147]/80">
              {t('ما التقطه الميكروفون:', 'Detected speech:')}{' '}
              <span className="font-black text-[#002147]">"{spokenTranscript}"</span>
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#C49E3A]/20">
          <div className="flex items-center gap-2 text-xs font-bold text-[#002147]/80">
            <Sparkles size={16} className="text-[#C49E3A] shrink-0" />
            <span>
              {t(
                'أنهِ جرعة اليوم واحصل على نقاط التقدم في ملفك الأكاديمي',
                'Complete today’s dose to log your progress and earn XP'
              )}
            </span>
          </div>
          <PrimaryButton
            onClick={handleClaimComplete}
            className="w-full sm:w-auto justify-center"
          >
            <Trophy size={16} />
            <span>{t('إتمام الدرس واستلام النقاط', 'Complete Dose & Claim XP')}</span>
          </PrimaryButton>
        </div>
      </GoldCard>

      {/* Previous Days / All Daily Doses in a LessonTile List */}
      <GoldCard className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-[#002147]">
            📚 {t('جرعات الأيام السابقة وسلسلة الدروس', 'Previous Days & Daily Dose Series')}
          </h3>
          <ProgressPill>
            {ADULTS_DAILY_DOSES.length} {t('درس', 'Doses')}
          </ProgressPill>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ADULTS_DAILY_DOSES.map((item, idx) => {
            const isActive = item.lesson_id === activeLesson.lesson_id;
            const isDone = completedIds.includes(item.lesson_id);
            return (
              <LessonTile
                key={item.lesson_id}
                order={idx + 1}
                emoji="☕"
                title={t(item.title_ar, item.title_en)}
                subtitle={item.title_en}
                level={item.level}
                active={isActive}
                done={isDone}
                onClick={() => {
                  setActiveLesson(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            );
          })}
        </div>
      </GoldCard>
    </SectionShell>
  );
};

export default AdultsDailyDose;
