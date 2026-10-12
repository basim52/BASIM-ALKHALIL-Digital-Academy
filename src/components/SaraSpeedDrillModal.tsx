import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Zap,
  Timer,
  Trophy,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Play,
  Award,
  Flame,
  ArrowRight,
  ShieldCheck,
  Bug,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSnapshotShutterSound } from '../lib/audio';

interface SaraSpeedDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl: boolean;
  studentLevel: string;
  onSuccessXP?: (xp: number) => void;
  onRecordDrillResult?: (summary: string) => void;
}

type DrillMode = 'sentence_builder' | 'bug_hunter' | 'vocab_rush';

interface SentenceBuilderQuestion {
  id: string;
  targetSentence: string;
  words: string[];
  translationAr: string;
}

interface BugHunterQuestion {
  id: string;
  sentenceWithBug: string;
  bugWord: string;
  correctWord: string;
  options: string[];
  explanationAr: string;
}

interface VocabRushQuestion {
  id: string;
  promptWord: string;
  correctAnswer: string;
  options: string[];
  type: 'meaning' | 'opposite';
}

const SENTENCE_BUILDER_QUESTIONS: SentenceBuilderQuestion[] = [
  {
    id: 'sb_1',
    targetSentence: "She plays football every Friday afternoon",
    words: ["football", "She", "plays", "Friday", "every", "afternoon"],
    translationAr: "هي تلعب كرة القدم كل عصر جمعة"
  },
  {
    id: 'sb_2',
    targetSentence: "They have visited five different countries",
    words: ["countries", "have", "visited", "They", "five", "different"],
    translationAr: "لقد زاروا خمس دول مختلفة"
  },
  {
    id: 'sb_3',
    targetSentence: "I didn't see him yesterday at school",
    words: ["yesterday", "him", "see", "didn't", "at", "I", "school"],
    translationAr: "لم أره البارحة في المدرسة"
  },
  {
    id: 'sb_4',
    targetSentence: "Are you ready to practice English today",
    words: ["ready", "English", "Are", "practice", "to", "today", "you"],
    translationAr: "هل أنت جاهز للتدرب على الإنجليزية اليوم"
  }
];

const BUG_HUNTER_QUESTIONS: BugHunterQuestion[] = [
  {
    id: 'bh_1',
    sentenceWithBug: "She don't like drinking hot tea in the morning.",
    bugWord: "don't",
    correctWord: "doesn't",
    options: ["doesn't", "isn't", "didn't", "aren't"],
    explanationAr: "مع الضمائر المفردة الغائبة (She) نستخدم doesn't في زمن المضارع البسيط."
  },
  {
    id: 'bh_2',
    sentenceWithBug: "Yesterday I go to the digital academy with my friend.",
    bugWord: "go",
    correctWord: "went",
    options: ["went", "gone", "goes", "going"],
    explanationAr: "كلمة Yesterday تدل على الماضي البسيط، والتصريف الثاني لـ go هو went."
  },
  {
    id: 'bh_3',
    sentenceWithBug: "The people is waiting outside the library.",
    bugWord: "is",
    correctWord: "are",
    options: ["are", "were", "am", "being"],
    explanationAr: "كلمة People اسم جمع دائماً وتأخذ الفعل are."
  },
  {
    id: 'bh_4',
    sentenceWithBug: "I am agree with your wonderful idea.",
    bugWord: "am agree",
    correctWord: "agree",
    options: ["agree", "agreed", "agrees", "agreeing"],
    explanationAr: "كلمة agree فعل وليست صفة، فلا نضع قبلها am في الإثبات."
  }
];

const VOCAB_RUSH_QUESTIONS: VocabRushQuestion[] = [
  {
    id: 'vr_1',
    promptWord: "Diligent",
    correctAnswer: "مجتهد ومثابر",
    options: ["مجتهد ومثابر", "كسول", "غاضب", "خائف"],
    type: 'meaning'
  },
  {
    id: 'vr_2',
    promptWord: "Huge (Opposite)",
    correctAnswer: "Tiny (صغير جداً)",
    options: ["Tiny (صغير جداً)", "Gigantic", "Heavy", "Wide"],
    type: 'opposite'
  },
  {
    id: 'vr_3',
    promptWord: "Curious",
    correctAnswer: "شغوف ومحب للاستكشاف",
    options: ["شغوف ومحب للاستكشاف", "حزين", "متردد", "هادئ"],
    type: 'meaning'
  },
  {
    id: 'vr_4',
    promptWord: "Ancient (Opposite)",
    correctAnswer: "Modern (حديث وعصري)",
    options: ["Modern (حديث وعصري)", "Old", "Historic", "Antique"],
    type: 'opposite'
  }
];

export const SaraSpeedDrillModal: React.FC<SaraSpeedDrillModalProps> = ({
  isOpen,
  onClose,
  isRtl,
  studentLevel,
  onSuccessXP,
  onRecordDrillResult
}) => {
  const [activeMode, setActiveMode] = useState<DrillMode>('sentence_builder');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streakCombo, setStreakCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [feedbackState, setFeedbackState] = useState<'correct' | 'wrong' | null>(null);

  const timerRef = useRef<any>(null);

  // Initialize question based on mode
  useEffect(() => {
    if (!isOpen) return;
    initQuestion(currentIdx, activeMode);
  }, [isOpen, activeMode, currentIdx]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isGameOver) return;
    clearInterval(timerRef.current);
    setTimeLeft(25);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isOpen, activeMode, currentIdx, isGameOver]);

  if (!isOpen) return null;

  const initQuestion = (idx: number, mode: DrillMode) => {
    setFeedbackState(null);
    if (mode === 'sentence_builder') {
      const q = SENTENCE_BUILDER_QUESTIONS[idx % SENTENCE_BUILDER_QUESTIONS.length];
      const shuffled = [...q.words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
    }
  };

  const handleTimeExpired = () => {
    setFeedbackState('wrong');
    setStreakCombo(0);
    setTimeout(() => {
      advanceNext();
    }, 1200);
  };

  const advanceNext = () => {
    setFeedbackState(null);
    if (currentIdx >= 3) {
      // Completed drill round
      setIsGameOver(true);
      const earnedXP = score * 10 + 20;
      if (onSuccessXP) onSuccessXP(earnedXP);
      if (onRecordDrillResult) {
        onRecordDrillResult(`أكمل تحدي السرعة اللغوي (${activeMode}) بنتيجة ${score}/4`);
      }
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  // Sentence Builder Handlers
  const handlePickWord = (word: string, index: number) => {
    if (feedbackState) return;
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (feedbackState) return;
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const handleVerifySentence = () => {
    const q = SENTENCE_BUILDER_QUESTIONS[currentIdx % SENTENCE_BUILDER_QUESTIONS.length];
    const formed = selectedWords.join(' ').trim().toLowerCase();
    const target = q.targetSentence.trim().toLowerCase();

    if (formed === target) {
      setFeedbackState('correct');
      setScore(prev => prev + 1);
      setStreakCombo(prev => prev + 1);
      setTimeout(() => advanceNext(), 1000);
    } else {
      setFeedbackState('wrong');
      setStreakCombo(0);
      setTimeout(() => advanceNext(), 1200);
    }
  };

  // Bug Hunter Handlers
  const handleSelectBugCorrection = (option: string) => {
    if (feedbackState) return;
    const q = BUG_HUNTER_QUESTIONS[currentIdx % BUG_HUNTER_QUESTIONS.length];
    if (option === q.correctWord) {
      setFeedbackState('correct');
      setScore(prev => prev + 1);
      setStreakCombo(prev => prev + 1);
    } else {
      setFeedbackState('wrong');
      setStreakCombo(0);
    }
    setTimeout(() => advanceNext(), 1200);
  };

  // Vocab Rush Handlers
  const handleSelectVocab = (option: string) => {
    if (feedbackState) return;
    const q = VOCAB_RUSH_QUESTIONS[currentIdx % VOCAB_RUSH_QUESTIONS.length];
    if (option === q.correctAnswer) {
      setFeedbackState('correct');
      setScore(prev => prev + 1);
      setStreakCombo(prev => prev + 1);
    } else {
      setFeedbackState('wrong');
      setStreakCombo(0);
    }
    setTimeout(() => advanceNext(), 1200);
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setCurrentIdx(0);
    setStreakCombo(0);
    initQuestion(0, activeMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#1E1500] via-[#332200] to-[#1E1500] px-5 py-4 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg border border-amber-300">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-amber-200">
                  {isRtl ? 'تحديات سارة السريعة ضد الوقت ⚡' : "Sara's Speed Drills & Flash Duels ⚡"}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black border border-amber-400/30">
                  {studentLevel}
                </span>
              </div>
              <p className="text-xs text-amber-200/70">
                {isRtl
                  ? 'تمارين مصغرة • سباق مع العداد • تثبيت القواعد والمفردات'
                  : 'Micro-Drills • Timer Race • Rapid Syntax & Vocab Reinforcement'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        {!isGameOver && (
          <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950/70 border-b border-white/10 shrink-0 text-xs">
            <button
              onClick={() => { setActiveMode('sentence_builder'); setCurrentIdx(0); setScore(0); }}
              className={`py-2 px-2 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                activeMode === 'sentence_builder'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
              }`}
            >
              <span>🧱</span>
              <span className="truncate">{isRtl ? 'تركيب الجمل' : 'Sentence Builder'}</span>
            </button>

            <button
              onClick={() => { setActiveMode('bug_hunter'); setCurrentIdx(0); setScore(0); }}
              className={`py-2 px-2 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                activeMode === 'bug_hunter'
                  ? 'bg-rose-500 text-white border-rose-300 shadow-md scale-102'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
              }`}
            >
              <Bug size={14} />
              <span className="truncate">{isRtl ? 'صياد الأخطاء' : 'Bug Hunter'}</span>
            </button>

            <button
              onClick={() => { setActiveMode('vocab_rush'); setCurrentIdx(0); setScore(0); }}
              className={`py-2 px-2 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                activeMode === 'vocab_rush'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md scale-102'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
              }`}
            >
              <Zap size={14} />
              <span className="truncate">{isRtl ? 'سباق المفردات' : 'Vocab Rush'}</span>
            </button>
          </div>
        )}

        {/* Live HUD Bar */}
        {!isGameOver && (
          <div className="px-5 py-2.5 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs font-black">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Timer size={14} className={timeLeft <= 5 ? 'animate-bounce text-rose-400' : ''} />
                <span className={timeLeft <= 5 ? 'text-rose-400 text-sm' : ''}>{timeLeft}s</span>
              </span>

              {streakCombo > 1 && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30 text-[10px]">
                  <Flame size={12} className="animate-pulse" />
                  <span>x{streakCombo} Combo!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                {isRtl ? `السؤال ${currentIdx + 1} من 4` : `Question ${currentIdx + 1} of 4`}
              </span>
              <span className="text-emerald-400">
                {isRtl ? `النقاط: ${score}` : `Score: ${score}`}
              </span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* GAME OVER RESULT VIEW */}
          {isGameOver ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
                🏆
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-200">
                  {isRtl ? 'أحسنت يا بطل! أتممت التحدي السريع بنجاح 🌟' : 'Awesome Effort! Speed Drill Completed 🌟'}
                </h3>
                <p className="text-xs text-slate-300">
                  {isRtl
                    ? `حققت ${score} من 4 أسئلة صحيحة في وقت قياسي!`
                    : `You got ${score} of 4 questions correct in record time!`}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-black">
                <Award size={18} />
                <span>+{score * 10 + 20} XP نقاط خبرة مكتسبة</span>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw size={14} />
                  <span>{isRtl ? 'إعادة التحدي ↺' : 'Play Again ↺'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  {isRtl ? 'إنهاء والعودة لسارة ↵' : 'Done & Return ↵'}
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* MODE 1: SENTENCE BUILDER */}
              {activeMode === 'sentence_builder' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-amber-400/20 text-xs text-center space-y-1">
                    <span className="text-[10px] text-amber-300 uppercase tracking-wider font-black block">
                      {isRtl ? 'المعنى المطلوب تركيبه:' : 'Target Meaning:'}
                    </span>
                    <p className="text-sm font-black text-white">
                      "{SENTENCE_BUILDER_QUESTIONS[currentIdx % SENTENCE_BUILDER_QUESTIONS.length].translationAr}"
                    </p>
                  </div>

                  {/* Built sentence slot */}
                  <div className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-amber-400/40 min-h-[70px] flex items-center justify-center flex-wrap gap-2">
                    {selectedWords.length === 0 ? (
                      <span className="text-xs text-slate-500">
                        {isRtl ? 'اضغط على الكلمات بالترتيب الصحيح لتكوين الجملة' : 'Tap words below in order to build sentence'}
                      </span>
                    ) : (
                      selectedWords.map((word, wIdx) => (
                        <button
                          key={wIdx}
                          type="button"
                          onClick={() => handleRemoveWord(word, wIdx)}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer hover:bg-rose-400 hover:text-white"
                          title={isRtl ? 'اضغط للإزالة' : 'Tap to remove'}
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available scrambled words */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold block">
                      {isRtl ? 'بنك الكلمات المتاح:' : 'Available Words:'}
                    </span>
                    <div className="flex items-center justify-center flex-wrap gap-2">
                      {availableWords.map((word, aIdx) => (
                        <button
                          key={aIdx}
                          type="button"
                          onClick={() => handlePickWord(word, aIdx)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 shadow-sm active:scale-95 transition-all cursor-pointer"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verify button */}
                  {selectedWords.length > 0 && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleVerifySentence}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-105 text-white font-black text-xs shadow-md cursor-pointer transition-all"
                      >
                        {isRtl ? 'تحقق من صحة الجملة ↵' : 'Check Sentence ↵'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: BUG HUNTER */}
              {activeMode === 'bug_hunter' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-400/40 space-y-2 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase tracking-wider">
                      {isRtl ? 'ابحث عن الخطأ وصححه قبل انتهاء الوقت 🐛' : 'Spot the Bug & Pick the Fix 🐛'}
                    </span>
                    <p className="text-base sm:text-lg font-black text-white">
                      "{BUG_HUNTER_QUESTIONS[currentIdx % BUG_HUNTER_QUESTIONS.length].sentenceWithBug}"
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-black text-slate-300 block text-center">
                      {isRtl ? 'ما هو التصحيح السليم للكلمة الخاطئة؟' : 'What is the correct replacement?'}
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {BUG_HUNTER_QUESTIONS[currentIdx % BUG_HUNTER_QUESTIONS.length].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectBugCorrection(opt)}
                          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/10 text-center transition-all cursor-pointer hover:border-amber-400"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 3: VOCAB RUSH */}
              {activeMode === 'vocab_rush' && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-400/40 space-y-1">
                    <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-black block">
                      {VOCAB_RUSH_QUESTIONS[currentIdx % VOCAB_RUSH_QUESTIONS.length].type === 'meaning'
                        ? (isRtl ? 'ما معنى الكلمة التالية؟' : 'What does this word mean?')
                        : (isRtl ? 'ما مضاد / عكس الكلمة التالية؟' : 'What is the opposite?')}
                    </span>
                    <p className="text-2xl font-black text-white tracking-wide">
                      {VOCAB_RUSH_QUESTIONS[currentIdx % VOCAB_RUSH_QUESTIONS.length].promptWord}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {VOCAB_RUSH_QUESTIONS[currentIdx % VOCAB_RUSH_QUESTIONS.length].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectVocab(opt)}
                        className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/10 text-center transition-all cursor-pointer hover:border-emerald-400"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Animation Indicator */}
              <AnimatePresence>
                {feedbackState && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-3 rounded-2xl text-center text-xs font-black flex items-center justify-center gap-2 ${
                      feedbackState === 'correct'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                    }`}
                  >
                    {feedbackState === 'correct' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{feedbackState === 'correct' ? (isRtl ? 'إجابة عبقرية وصحيحة! 🌟' : 'Brilliant & Correct! 🌟') : (isRtl ? 'أوشكت عليها، استمر! 💪' : 'Close, keep going! 💪')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles size={13} />
            <span>{isRtl ? 'تحديات ذكية مرتبطة بذاكرة سارة' : 'Sara Speed Intelligence Active'}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
          >
            {isRtl ? 'إغلاق ✕' : 'Close ✕'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
