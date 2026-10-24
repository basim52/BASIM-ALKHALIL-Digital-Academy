import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Volume2,
  LockKeyhole,
  LockKeyholeOpen,
} from 'lucide-react';
import { UserProfile } from '../types';
import { useT } from '../lib/explainLang';
import { managedSpeak } from '../lib/audio';
import {
  GoldCard,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
} from './ui/academy';

interface EscapeRoomGrammarProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

interface Level {
  id: number;
  stageName: string;
  stageNameAr: string;
  clue: string;
  clueAr: string;
  question: string;
  questionAr: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationAr: string;
  lockIcon: string;
}

const ESCAPE_XP_REWARD = 30;

export const EscapeRoomGrammar: React.FC<EscapeRoomGrammarProps> = ({
  lang,
  onBack,
  onXPAdded,
}) => {
  const tHook = useT();
  const isEnMode = lang === 'en' || tHook('ar', 'en') === 'en';
  const isRtl = !isEnMode;
  const t = (ar: string, en: string) => (isEnMode ? en : ar);

  // Game states
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const levels: Level[] = [
    {
      id: 1,
      stageName: "London Bridge Jail Cells",
      stageNameAr: "زنازين جسر لندن القديم 🌉",
      clue: "To open the heavy iron gate, find the correct subject-verb agreement for singular guards:",
      clueAr: "لفتح البوابة الحديدية الثقيلة، ابحث عن نطق الفعل المناسب للحارس المفرد (المضارع البسيط):",
      question: "The royal guard ______ the old tower every single night.",
      questionAr: "The royal guard ______ the old tower every single night.",
      options: ["watch", "watches", "watching"],
      correctAnswer: "watches",
      explanation: "We add '-es' to 'watch' (watches) because the subject 'the royal guard' is third-person singular (He).",
      explanationAr: "نضيف '-es' للفعل لأن الفاعل مفرد غائب (هو الحارس).",
      lockIcon: "🌉"
    },
    {
      id: 2,
      stageName: "The Secret Royal Library",
      stageNameAr: "المكتبة الملكية السرية 📚",
      clue: "A hidden staircase appeared! To move the heavy bookshelf, select the correct plural negative form:",
      clueAr: "ظهر درج سري دافئ! لتحريك خزانة الكتب الضخمة، اختر صيغة النفي الصحيحة للجمع (المضارع البسيط):",
      question: "My travel friends ______ like cold rainy days in London.",
      questionAr: "My travel friends ______ like cold rainy days in London.",
      options: ["doesn't", "don't", "aren't"],
      correctAnswer: "don't",
      explanation: "We use 'don't' for plural subjects ('friends' / they) in negative Present Simple sentences.",
      explanationAr: "نستخدم 'don't' لنفي الجمع (هم أصدقائي).",
      lockIcon: "📚"
    },
    {
      id: 3,
      stageName: "The Big Ben Clockwork Room",
      stageNameAr: "حجرة تروس ساعة بيغ بن الضخمة ⏰",
      clue: "The final gears are spinning! To fix the broken clock and escape, form a proper question:",
      clueAr: "التروس النهائية تدور بسرعة! لإصلاح الساعة والهروب العظيم، صغ السؤال بالشكل المضارع البسيط السليم:",
      question: "______ you speak English with tourists in London?",
      questionAr: "______ you speak English with tourists in London?",
      options: ["Do", "Does", "Are"],
      correctAnswer: "Do",
      explanation: "We start the question with 'Do' because the subject is 'you'.",
      explanationAr: "نبسط السؤال باستخدام 'Do' لأن الفاعل هو (أنت) وليس مفرداً غائباً.",
      lockIcon: "⚙️"
    },
    {
      id: 4,
      stageName: "Westminster Abbey Vaults",
      stageNameAr: "أقبية دير وستمنستر الأثري 🏛️",
      clue: "To unlock the dusty iron gate of the crypt, discover the correct negative helper for third-person singular 'have':",
      clueAr: "لفتح بوابة السرداب الأثرية المليئة بالغبار، اكتشف صيغة النفي الصحيحة للفعل 'يملك/لديه' للمفرد الغائب:",
      question: "She ______ have the golden key with her today.",
      questionAr: "She ______ have the golden key with her today.",
      options: ["doesn't", "don't", "hasn't"],
      correctAnswer: "doesn't",
      explanation: "We use 'doesn't' + base verb ('have') for singular negative sentences in Present Simple.",
      explanationAr: "نستخدم 'doesn't' متبوعاً بمصدر الفعل ('have') لنفي الملكية للمفرد الغائب.",
      lockIcon: "🏛️"
    },
    {
      id: 5,
      stageName: "Thames Secret Submarine",
      stageNameAr: "الغواصة السرية بنهر التيمز 🚢",
      clue: "To operate the generator's safety valve, select the correct form of the verb 'be' for a plural subject:",
      clueAr: "لتشغيل صمام الأمان للمولد والهروب للسطح، اختر الصيغة السليمة لفعل الكينونة (be) للمبتدأ الجمع:",
      question: "Why ______ the ship crew members so worried about the fog?",
      questionAr: "Why ______ the ship crew members so worried about the fog?",
      options: ["are", "is", "am"],
      correctAnswer: "are",
      explanation: "We use 'are' because 'crew members' is plural.",
      explanationAr: "نستخدم الفعل المساعد 'are' لأن الفاعل (أعضاء طاقم السفينة) جمع.",
      lockIcon: "🚢"
    },
    {
      id: 6,
      stageName: "Greenwich Observatory Dome",
      stageNameAr: "قبة مرصد غرينتش الملكي 🔭",
      clue: "To align the heavy brass telescope and receive the final coordinates, choose the correct question generator:",
      clueAr: "لتوجيه التلسكوب النحاسي العملاق واكتشاف الإحداثيات النهائية، اختر صيغة الاستفهام السليمة للمفرد غائب:",
      question: "______ she study the constellations here every Saturday?",
      questionAr: "______ she study the constellations here every Saturday?",
      options: ["Does", "Do", "Is"],
      correctAnswer: "Does",
      explanation: "We start Present Simple questions with 'Does' for singular subjects (she/he/it).",
      explanationAr: "نبدأ السؤال بـ 'Does' في المضارع البسيط لأن الفاعل مفرد غائب (هي).",
      lockIcon: "🔭"
    }
  ];

  const currentLevel = levels[currentLevelIdx];

  const handleSelectOption = (opt: string) => {
    if (isUnlocked) return;
    setSelectedOption(opt);
    setShowErrorAlert(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      managedSpeak(utterance);
    }
  };

  const handleDecoderCheck = () => {
    if (!selectedOption) return;

    if (selectedOption === currentLevel.correctAnswer) {
      setIsUnlocked(true);
      speakText(`Correct answer! The key code matches!`);
    } else {
      setAttempts(prev => prev + 1);
      setShowErrorAlert(true);
      speakText(`That is incorrect. Try another combination!`);
    }
  };

  const handleNextStage = () => {
    if (currentLevelIdx < levels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsUnlocked(false);
      setAttempts(0);
      setShowErrorAlert(false);
    } else {
      setGameFinished(true);
      if (onXPAdded && !xpAwarded) {
        onXPAdded(ESCAPE_XP_REWARD);
        setXpAwarded(true);
      }
    }
  };

  const handleResetGame = () => {
    setCurrentLevelIdx(0);
    setSelectedOption(null);
    setIsUnlocked(false);
    setAttempts(0);
    setGameFinished(false);
    setXpAwarded(false);
    setShowErrorAlert(false);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      data-testid="escape-room-grammar"
      className="min-h-screen bg-[#001a38] text-white px-3 py-4 sm:px-6 sm:py-6 pb-24 font-sans"
    >
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C49E3A]/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 bg-[#002147] border-2 border-[#C49E3A] rounded-2xl flex items-center justify-center text-[#C49E3A] shrink-0">
              {isUnlocked ? (
                <LockKeyholeOpen size={22} className="text-[#E6C36A] animate-[pulse_0.6s_ease-out_1]" />
              ) : (
                <LockKeyhole size={22} className="text-[#C49E3A]" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-black text-[#C49E3A] tracking-tight truncate">
                {t('غرفة الهروب النحوية في لندن 🏛️', 'Grammar Escape Room: London Clues 🏛️')}
              </h1>
              <p className="text-xs text-white/75 font-bold mt-0.5">
                {t(
                  'لغز الزمن المضارع البسيط - استخدم عبقريتك لتفك الشفرات وتتحرر!',
                  'Solve Present Simple logic riddles to open the heavy ancient doors!'
                )}
              </p>
            </div>
          </div>

          <GhostButton
            onClick={onBack}
            className="!bg-[#002147] !text-[#E6C36A] !border-[#C49E3A]/60 hover:!border-[#C49E3A] shrink-0"
          >
            {t('العودة للمنصة ↩️', 'Back to Academy ↩️')}
          </GhostButton>
        </div>

        {/* Rooms Grid: GoldCard style on navy (white/5 fill, gold/40 border), lock icon in gold, locked rooms dimmed */}
        {!gameFinished && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {levels.map((lvl, index) => {
              const active = index === currentLevelIdx;
              const completed = index < currentLevelIdx || (active && isUnlocked);
              const locked = index > currentLevelIdx;

              return (
                <GoldCard
                  key={lvl.id}
                  className={`!p-3 !bg-white/5 !border-[#C49E3A]/40 !text-white flex items-center justify-between gap-2 transition-opacity ${
                    active ? 'ring-2 ring-[#C49E3A] !border-[#C49E3A]' : ''
                  } ${locked ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#002147] border border-[#C49E3A] text-[#E6C36A] text-[11px] font-black flex items-center justify-center shrink-0">
                      {lvl.id}
                    </span>
                    <span className="text-xs font-black text-white truncate">
                      {t(lvl.stageNameAr, `${lvl.lockIcon} ${lvl.stageName}`)}
                    </span>
                  </div>
                  {completed ? (
                    <Unlock
                      size={15}
                      className={`text-[#E6C36A] shrink-0 ${active && isUnlocked ? 'animate-[pulse_0.6s_ease-out_1]' : ''}`}
                    />
                  ) : (
                    <Lock size={15} className="text-[#C49E3A] shrink-0" />
                  )}
                </GoldCard>
              );
            })}
          </div>
        )}

        {/* Active Room or Win Screen */}
        <motion.div
          key={gameFinished ? 'finished' : currentLevelIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
        >
          {!gameFinished ? (
            <GoldCard className="!bg-white/5 !border-[#C49E3A]/40 !text-white !p-0 overflow-hidden">
              {/* Top Stage Banner */}
              <div className="bg-[#002147] p-4 sm:p-5 border-b border-[#C49E3A]/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl bg-[#001a38] p-2 rounded-xl border border-[#C49E3A]/50 shrink-0">
                    {currentLevel.lockIcon}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#C49E3A] font-black uppercase tracking-widest block">
                      {t('المستوى الحالي', 'CURRENT TOWER CHAMBER')}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white truncate">
                      {t(currentLevel.stageNameAr, currentLevel.stageName)}
                    </h3>
                  </div>
                </div>

                <ProgressPill className="!bg-[#001a38] !text-[#E6C36A] !border-[#C49E3A]/60">
                  {t(`المحاولات الخاطئة: ${attempts}`, `Wrong Attempts: ${attempts}`)}
                </ProgressPill>
              </div>

              {/* Room Body */}
              <div className="p-4 sm:p-6 space-y-5">
                {/* Clue Box */}
                <div className="bg-[#002147] border border-[#C49E3A]/40 p-4 rounded-2xl flex items-start gap-3">
                  <span className="text-xl shrink-0">🕵️‍♂️</span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#C49E3A] font-black block uppercase tracking-wider">
                      {t('المحقق كود', 'DETECTIVE INSTRUCTIONS')}
                    </span>
                    <p className="text-xs text-white/90 font-bold leading-relaxed mt-1">
                      {t(currentLevel.clueAr, currentLevel.clue)}
                    </p>
                  </div>
                </div>

                {/* Grammatical Locked Cipher */}
                <div className="bg-[#002147] border-2 border-[#C49E3A] p-5 rounded-2xl text-center space-y-3 relative">
                  <div className="absolute right-4 top-4">
                    {isUnlocked ? (
                      <Unlock size={20} className="text-[#E6C36A] animate-[pulse_0.6s_ease-out_1]" />
                    ) : (
                      <Lock size={20} className="text-[#C49E3A]" />
                    )}
                  </div>

                  <span className="inline-block text-[10px] tracking-wider font-black text-[#E6C36A] bg-[#001a38] border border-[#C49E3A]/50 px-2.5 py-1 rounded-full uppercase">
                    {t('اللغز اللغوي رقم:', 'GRAMMAR CIPHER LEVEL:')} 0{currentLevel.id}
                  </span>

                  <div className="pt-2 flex flex-col items-center gap-2">
                    <p className="font-black text-white text-base sm:text-xl tracking-tight" dir="ltr">
                      &ldquo;{currentLevel.question}&rdquo;
                    </p>

                    <GhostButton
                      onClick={() => speakText(currentLevel.question.replace('______', currentLevel.correctAnswer))}
                      className="!bg-[#001a38] !text-[#E6C36A] !border-[#C49E3A]/60 hover:!border-[#C49E3A]"
                    >
                      <Volume2 size={13} />
                      <span>{t('اسمع الجملة الكاملة 🔊', 'Listen Full Sentence 🔊')}</span>
                    </GhostButton>
                  </div>
                </div>

                {/* Answer Choices using AnswerOption */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" dir="ltr">
                  {currentLevel.options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentLevel.correctAnswer;
                    const state = isUnlocked
                      ? isCorrect
                        ? 'correct'
                        : 'normal'
                      : showErrorAlert && isSelected
                      ? 'wrong'
                      : 'normal';

                    return (
                      <AnswerOption
                        key={opt}
                        label={opt}
                        dir="ltr"
                        selected={isSelected && !isUnlocked && !showErrorAlert}
                        state={state}
                        disabled={isUnlocked}
                        onClick={() => handleSelectOption(opt)}
                      />
                    );
                  })}
                </div>

                {/* Feedback Alerts */}
                {showErrorAlert && (
                  <div className="bg-red-950/70 border border-red-500/60 p-3.5 rounded-2xl text-center text-xs text-red-100 font-black">
                    ⚠️ {t('رمز التشفير خاطئ! أعد المحاولة، فالحارس يقترب...', 'Cipher matching code failed! Try another configuration.')}
                  </div>
                )}

                {isUnlocked && (
                  <div className="bg-[#002147] border-2 border-[#C49E3A] p-4 rounded-2xl space-y-1.5 animate-[pulse_0.6s_ease-out_1]">
                    <p className="text-xs text-[#E6C36A] font-black">
                      🔓 {t('تم حل الشفرة بشكل مذهل! انفتح القفل السري:', 'Padlock opened successfully! Mystery decoded:')}
                    </p>
                    <p className="text-xs text-white/90 leading-relaxed font-bold">
                      {t(currentLevel.explanationAr, currentLevel.explanation)}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Action Row */}
              <div className="bg-[#002147] border-t border-[#C49E3A]/40 p-4 flex justify-end">
                {!isUnlocked ? (
                  <PrimaryButton
                    disabled={!selectedOption}
                    onClick={handleDecoderCheck}
                  >
                    {t('فحص الرمز المفتاح 🗝️', 'CHECK COMBINATION 🗝️')}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={handleNextStage}>
                    {currentLevelIdx < levels.length - 1
                      ? t('الباب التالي ➡️', 'Decode Next Door ➡️')
                      : t('الهروب العظيم وحصد الثمار 🏆', 'Complete Escape & Claim 🏆')}
                  </PrimaryButton>
                )}
              </div>
            </GoldCard>
          ) : (
            /* Win Screen -> Navy Card with Gold Badge showing the real XP earned */
            <div className="bg-[#002147] border-2 border-[#C49E3A] rounded-2xl p-6 sm:p-8 text-center space-y-5 flex flex-col items-center justify-center shadow-sm">
              <div className="w-16 h-16 bg-[#001a38] rounded-full flex items-center justify-center text-[#E6C36A] border-2 border-[#C49E3A]">
                <ShieldCheck size={36} strokeWidth={2.5} />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] text-[#C49E3A] font-black tracking-widest block uppercase">
                  {t('لقب الشرف الفخري', 'HONORARY DETECTIVE DECREE')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#E6C36A]">
                  {t('لقد حررت قفل ساعة بيغ بن! 🕰️🎉', 'You Cleared London Tower! 🕰️🎉')}
                </h2>
                <p className="text-white/85 font-bold text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {t(
                    'بفضل ذكائك وإتقانك لزمن المضارع البسيط، أعدت عقارب الساعة للعمل وهربت بسلام من برج لندن القديم!',
                    'You proved subject-verb coordination mastery! All locks opened and the ancient tower stands proud.'
                  )}
                </p>
              </div>

              {/* Gold badge showing real rooms solved and real XP earned */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <ProgressPill className="!bg-[#001a38] !text-[#E6C36A] !border-[#C49E3A] !px-4 !py-1.5 !text-sm">
                  🔓 {t('المستوى', 'LEVELS')}: {levels.length} / {levels.length}
                </ProgressPill>
                <ProgressPill className="!bg-[#001a38] !text-[#E6C36A] !border-[#C49E3A] !px-4 !py-1.5 !text-sm">
                  🏆 {t('جائزة الهروب', 'ESCAPE REWARD')}: +{ESCAPE_XP_REWARD} XP
                </ProgressPill>
              </div>

              <div className="flex items-center justify-center gap-3 w-full max-w-xs pt-2">
                <PrimaryButton onClick={handleResetGame} className="flex-1">
                  {t('إعادة اللعب 🔄', 'Replay Clockwork 🔄')}
                </PrimaryButton>
                <GhostButton
                  onClick={onBack}
                  className="flex-1 !bg-[#001a38] !text-[#E6C36A] !border-[#C49E3A]/60 hover:!border-[#C49E3A]"
                >
                  {t('العودة للمنصة', 'Exit Tower')}
                </GhostButton>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
