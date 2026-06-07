import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, 
  Lock, 
  Unlock, 
  MapPin, 
  ChevronRight, 
  RefreshCw, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Volume2,
  LockKeyhole,
  LockKeyholeOpen
} from 'lucide-react';
import { UserProfile } from '../types';

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

export const EscapeRoomGrammar: React.FC<EscapeRoomGrammarProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';
  
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
      explanationAr: "نשתخدم الفعل المساعد 'are' لأن الفاعل (أعضاء طاقم السفينة) جمع.",
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
      window.speechSynthesis.speak(utterance);
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
      // add points
      if (onXPAdded && !xpAwarded) {
        onXPAdded(30);
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
    <div className="min-h-screen bg-[#1E112A] text-stone-100 pb-24 relative overflow-hidden">
      
      {/* Mystical purple glow in background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-6 relative z-10">

        {/* Header bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-purple-900/30 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-600/20 shrink-0">
              <LockKeyhole size={24} className={isUnlocked ? 'hidden' : 'animate-pulse'} />
              <LockKeyholeOpen size={24} className={isUnlocked ? 'block text-amber-400' : 'hidden'} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-amber-450 tracking-tight">
                {isRtl ? 'غرفة الهروب النحوية في لندن 🏛️' : 'Grammar Escape Room: London Clues 🏛️'}
              </h1>
              <p className="text-xs text-purple-300 font-bold tracking-widest mt-0.5">
                {isRtl ? 'لغز الزمن المضارع البسيط - استخدم عبقريتك لتفك الشفرات وتتحرر!' : 'Solve Present Simple logic riddles to open the heavy ancient doors!'}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 bg-purple-950 border border-purple-800 hover:bg-purple-900 text-stone-250 rounded-xl font-black text-xs transition-all cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{isRtl ? 'العودة للمنصة ↩️' : 'Back to Academy ↩️'}</span>
          </button>
        </div>

        {/* Steps display */}
        {!gameFinished && (
          <div className="flex items-center justify-center gap-8 mb-8 font-mono text-xs">
            {levels.map((lvl, index) => {
              const active = index === currentLevelIdx;
              const completed = index < currentLevelIdx;

              return (
                <div key={lvl.id} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold ${
                    active 
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md ring-4 ring-purple-500/20' 
                      : completed 
                        ? 'bg-emerald-800 text-emerald-150 border-emerald-600' 
                        : 'bg-purple-950 text-purple-400 border-purple-900'
                  }`}>
                    {lvl.id}
                  </div>
                  <span className={`hidden md:inline font-bold ${active ? 'text-amber-400' : 'text-slate-400'}`}>
                    {isRtl ? lvl.stageNameAr.split(' ')[0] : lvl.stageName.split(' ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Room Main Card */}
        <AnimatePresence mode="wait">
          {!gameFinished ? (
            <motion.div
              key={currentLevelIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-purple-950/60 border border-purple-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col min-h-[430px]"
            >
              
              {/* Card top banner with stage description */}
              <div className="bg-gradient-to-r from-purple-900/60 to-indigo-950/40 p-6 border-b border-purple-900 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl bg-purple-900/40 p-2.5 rounded-xl border border-purple-800">{currentLevel.lockIcon}</span>
                  <div>
                    <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block">
                      {isRtl ? 'المستوى الحالي' : 'CURRENT TOWER CHAMBER'}
                    </span>
                    <h3 className="text-lg font-black text-stone-150">
                      {isRtl ? currentLevel.stageNameAr : currentLevel.stageName}
                    </h3>
                  </div>
                </div>

                <div className="text-right text-xs font-mono font-bold text-purple-300">
                  <span>{isRtl ? `المحاولات الخاطئة: ${attempts}` : `Wrong Attempts: ${attempts}`}</span>
                </div>
              </div>

              {/* Card clue storyline */}
              <div className="p-6 md:p-8 space-y-6 flex-1">
                
                {/* Story bubble */}
                <div className="bg-purple-900/30 border border-purple-800 p-4 rounded-2xl flex items-start gap-3">
                  <span className="text-xl shrink-0">🕵️‍♂️</span>
                  <div>
                    <span className="text-[9px] text-purple-400 font-black block uppercase tracking-wider">{isRtl ? 'المحقق كود' : 'DETECTIVE INSTRUCTIONS'}</span>
                    <p className="text-xs text-stone-300 font-bold leading-relaxed mt-1">
                      {isRtl ? currentLevel.clueAr : currentLevel.clue}
                    </p>
                  </div>
                </div>

                {/* Grammatical Locked Equation */}
                <div className="bg-[#12091A] border-2 border-purple-900/80 p-6 rounded-2xl text-center space-y-3 relative overflow-hidden">
                  
                  {/* Glowing padlock representation */}
                  <div className="absolute right-4 top-4">
                    {isUnlocked ? (
                      <Unlock size={22} className="text-emerald-400 drop-shadow-md" />
                    ) : (
                      <Lock size={22} className="text-rose-500 drop-shadow-md" />
                    )}
                  </div>

                  <span className="text-[9px] tracking-wider font-sans font-extrabold text-amber-500 bg-purple-950/80 px-2.5 py-1 rounded-md uppercase">
                    {isRtl ? 'اللغز اللغوي رقم:' : 'GRAMMAR CIPHER LEVEL:'} 0{currentLevel.id}
                  </span>

                  <div className="pt-3 flex flex-col items-center gap-1">
                    <p className="font-sans font-black text-white text-lg md:text-xl tracking-tight italic">
                      &rdquo; {currentLevel.question} &ldquo;
                    </p>
                    
                    <button
                      onClick={() => speakText(currentLevel.question.replace("______", currentLevel.correctAnswer))}
                      className="p-1 px-2.5 bg-purple-900/40 text-purple-300 hover:bg-purple-900 rounded-md text-[10px] mt-2 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 size={11} />
                      <span>{isRtl ? 'اسمع الجملة الكاملة 🔊' : 'Listen Full Sentence 🔊'}</span>
                    </button>
                  </div>
                </div>

                {/* Multiple choices options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentLevel.options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentLevel.correctAnswer;

                    let btnStyle = "bg-purple-900/30 border-purple-800 text-purple-200 hover:bg-purple-900/50 hover:border-purple-700";
                    if (isUnlocked) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-900/40 border-emerald-500 text-emerald-300 pointer-events-none";
                      } else {
                        btnStyle = "bg-purple-950 border-purple-950 text-purple-600 opacity-40 pointer-events-none";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-purple-600 border-purple-400 text-white font-extrabold shadow-lg";
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isUnlocked}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 rounded-xl border-2 text-center text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none ${btnStyle}`}
                      >
                        <span className="font-mono">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Danger or Success alert */}
                {showErrorAlert && (
                  <div className="bg-rose-950/40 border border-rose-900 p-3.5 rounded-xl text-center text-xs text-rose-300 font-bold">
                    ⚠️ {isRtl ? 'رمز التشفير خاطئ! أعد المحاولة، فالحارس يقترب...' : 'Cipher matching code failed! Try another configuration.'}
                  </div>
                )}

                {isUnlocked && (
                  <div className="bg-emerald-950/50 border border-emerald-900 p-4 rounded-xl space-y-2">
                    <p className="text-xs text-emerald-300 font-black">
                      🔓 {isRtl ? 'تم حل الشفرة بشكل مذهل! انفتح القفل السري:' : 'Padlock opened successfully! Mystery decoded:'}
                    </p>
                    <p className="text-xs text-stone-300 leading-normal font-bold">
                      {isRtl ? currentLevel.explanationAr : currentLevel.explanation}
                    </p>
                  </div>
                )}

              </div>

              {/* Bottom footer button for check or progress */}
              <div className="bg-purple-950 border-t border-purple-900 p-4 flex justify-end gap-3">
                {!isUnlocked ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleDecoderCheck}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/30 disabled:text-purple-600 disabled:border-purple-900/40 border border-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-purple-900/20"
                  >
                    <span>{isRtl ? 'فحص الرمز المفتاح 🗝️' : 'CHECK COMBINATION 🗝️'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextStage}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#002147] font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <span>
                      {currentLevelIdx < levels.length - 1 
                        ? (isRtl ? 'الباب التالي ➡️' : 'Decode Next Door ➡️') 
                        : (isRtl ? 'الهروب العظيم وحصد الثمار 🏆' : 'Complete Escape & Claim 🏆')}
                    </span>
                  </button>
                )}
              </div>

            </motion.div>
          ) : (
            /* Game finished successfully */
            <div className="bg-purple-950/60 border border-purple-900 shadow-2xl rounded-3xl p-8 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
              
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 border border-amber-500/30 animate-bounce">
                <ShieldCheck size={48} strokeWidth={2.5} />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-amber-500 font-extrabold tracking-widest block uppercase">
                  {isRtl ? 'لقب الشرف الفخري' : 'HONORARY DETECTIVE DECREE'}
                </span>
                <h2 className="text-3xl font-black text-white">
                  {isRtl ? 'لقد حررت قفل ساعة بيغ بن! 🕰️🎉' : 'You Cleared London Tower! 🕰️🎉'}
                </h2>
                <p className="text-purple-300 font-bold text-sm max-w-sm mx-auto">
                  {isRtl
                    ? 'بفضل ذكائك وإتقانك لزمن المضارع البسيط، أعدت عقارب الساعة للعمل وهربت بسلام من برج لندن القديم!'
                    : 'You proved subject-verb coordination mastery! All locks opened and the ancient tower stands proud.'}
                </p>
              </div>

              {/* Gained scores */}
              <div className="bg-[#12091A] border border-purple-900 p-4 rounded-xl flex items-center justify-around max-w-xs w-full">
                <div>
                  <span className="text-[9px] text-purple-400 font-bold block">{isRtl ? 'المستوى' : 'LEVELS'}</span>
                  <strong className="text-xl font-black text-amber-400">3 / 3</strong>
                </div>
                <div className="border-r h-8 border-purple-900" />
                <div>
                  <span className="text-[9px] text-purple-400 font-bold block">{isRtl ? 'جائزة الهروب' : 'ESCAPE REWARD'}</span>
                  <strong className="text-xl font-black text-emerald-400">+30 XP</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full max-w-xs">
                <button
                  onClick={handleResetGame}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  {isRtl ? 'إعادة اللعب 🔄' : 'Replay Clockwork 🔄'}
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  {isRtl ? 'العودة للمنصة' : 'Exit Tower'}
                </button>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
