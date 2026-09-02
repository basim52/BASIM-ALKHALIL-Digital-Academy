import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  GitBranch, 
  Award, 
  Flame, 
  Play, 
  Pause,
  ChevronRight,
  Languages,
  Footprints
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface VocabItem {
  word: string;
  ipa: string;
  meaningAr: string;
  partOfSpeech: string;
}

interface StoryChoice {
  id: string;
  textEn: string;
  textAr: string;
  consequenceHint?: string;
}

interface ComprehensionCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

interface StoryNode {
  chapterTitle: string;
  sceneTextEn: string;
  sceneTextAr: string;
  audioNarrationText: string;
  targetedVocab: VocabItem[];
  choices: StoryChoice[];
  comprehensionCheck?: ComprehensionCheck;
  progressPercentage: number;
  isEnding?: boolean;
}

interface BranchingStoryEngineProps {
  lang: 'ar' | 'en';
  userName?: string;
  userLevel?: string;
  onBack: () => void;
  onAwardXp?: (amount: number) => void;
}

const STORY_THEMES = [
  {
    id: 'Noor in London',
    titleAr: 'مغامرات نور في لندن 🇬🇧',
    titleEn: 'Noor\'s Adventures in London',
    descAr: 'رافق نور من مطار هيثرو إلى قطار الأنفاق ومتاحف وجامعات بريطانيا',
    descEn: 'Navigate London Heathrow, Tube, royal museums & historical Oxford',
    icon: '🇬🇧',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Galaxy Explorer',
    titleAr: 'مستكشف الفضاء والمحطة النجمية 🚀',
    titleEn: 'Galaxy Space Explorer',
    descAr: 'انطلق في مهمة استكشاف علمية مع طاقم دولي وتواصل بلغة العلوم',
    descEn: 'Embark on an interstellar scientific mission with an international crew',
    icon: '🚀',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Oxford Detective',
    titleAr: 'لغز قلعة أكسفورد التاريخية 🕵️',
    titleEn: 'The Mystery of Oxford Castle',
    descAr: 'فك شفرات المخطوطات القديمة وابحث عن الأدلة اللغوية المخفية',
    descEn: 'Decipher ancient manuscripts and solve linguistic clues in ancient libraries',
    icon: '🕵️',
    coverImage: 'https://images.unsplash.com/photo-1548625361-155deee223d5?auto=format&fit=crop&w=800&q=80'
  }
];

export const BranchingStoryEngine: React.FC<BranchingStoryEngineProps> = ({
  lang,
  userName = 'Nour',
  userLevel = 'A2',
  onBack,
  onAwardXp
}) => {
  const isRtl = lang === 'ar';

  // Story Setup State
  const [selectedTheme, setSelectedTheme] = useState(STORY_THEMES[0]);
  const [selectedLevel, setSelectedLevel] = useState(userLevel || 'A2');
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Active Story Node State
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<string[]>([]);
  const [showArabicTranslation, setShowArabicTranslation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Comprehension Check State
  const [selectedCheckOption, setSelectedCheckOption] = useState<number | null>(null);
  const [isCheckAnswered, setIsCheckAnswered] = useState(false);
  const [isCheckCorrect, setIsCheckCorrect] = useState(false);

  // Fetch Story Chapter / Branch from Gemini 3.8
  const fetchNextChapter = async (choiceText: string | null = null) => {
    setLoading(true);
    cancelAllSpeech();
    setIsPlayingAudio(false);
    setSelectedCheckOption(null);
    setIsCheckAnswered(false);

    try {
      const res = await fetch('/api/ai/branching-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyTheme: selectedTheme.id,
          studentLevel: selectedLevel,
          decisionHistory: choiceText ? [...decisionHistory, choiceText] : decisionHistory,
          currentChoice: choiceText,
          studentName: userName
        })
      });

      if (!res.ok) throw new Error('Branching fetch failed');
      const data: StoryNode = await res.json();
      setCurrentNode(data);

      if (choiceText) {
        setDecisionHistory(prev => [...prev, choiceText]);
      }

      if (data.isEnding) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        if (onAwardXp) onAwardXp(150);
      }
    } catch (err) {
      console.error('Error in branching story:', err);
    } finally {
      setLoading(false);
    }
  };

  // Start Adventure
  const handleStartAdventure = () => {
    setIsStarted(true);
    setDecisionHistory([]);
    fetchNextChapter(null);
  };

  // Play Scene Audio
  const handleToggleAudio = () => {
    if (!currentNode) return;

    if (isPlayingAudio) {
      cancelAllSpeech();
      setIsPlayingAudio(false);
    } else {
      const textToSpeak = currentNode.audioNarrationText || currentNode.sceneTextEn;
      speakAcademyText(
        textToSpeak, 
        'en', 
        () => setIsPlayingAudio(true), 
        () => setIsPlayingAudio(false)
      );
    }
  };

  // Play Single Vocab Pronunciation
  const handlePlayVocab = (word: string) => {
    speakAcademyText(word, 'en');
  };

  // Handle Comprehension Quiz Check
  const handleCheckAnswer = (index: number) => {
    if (!currentNode?.comprehensionCheck || isCheckAnswered) return;
    setSelectedCheckOption(index);
    setIsCheckAnswered(true);

    const isCorrect = index === currentNode.comprehensionCheck.correctIndex;
    setIsCheckCorrect(isCorrect);

    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
      if (onAwardXp) onAwardXp(30);
    }
  };

  // Reset Adventure
  const handleReset = () => {
    cancelAllSpeech();
    setIsPlayingAudio(false);
    setIsStarted(false);
    setCurrentNode(null);
    setDecisionHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-3 sm:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HEADER BAR */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={isStarted ? handleReset : onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          <span>{isStarted ? (isRtl ? 'اختيار قصة أخرى' : 'Change Adventure') : (isRtl ? 'العودة' : 'Back')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-full shadow-sm">
            <GitBranch size={14} className="animate-pulse" />
            Gemini 3.8 Branching Stories
          </span>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline-block">
            {isRtl ? 'القصص التفاعلية متعددة النهايات' : 'Branching Interactive Stories'}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* SETUP SCREEN */}
        {!isStarted ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center font-black mb-4 shadow-inner">
                <Compass size={32} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {isRtl ? 'عالم القصص التفاعلية متعددة النهايات 🌟' : 'Branching Interactive Story Engine 🌟'}
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {isRtl 
                  ? 'أنت البطل الذي يقرر مسار القصة! كل اختيار تتخذه بالإنجليزية يُصيغ أحداثاً جديدة مدعومة بالذكاء الاصطناعي Gemini 3.8'
                  : 'You are the protagonist! Every decision in English steers the plot into fresh AI-generated chapters.'}
              </p>
            </div>

            {/* THEME SELECTION */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-3">
                {isRtl ? '1. اختر عالم المغامرة:' : '1. Select Adventure Realm:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STORY_THEMES.map((th) => {
                  const isSelected = selectedTheme.id === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setSelectedTheme(th)}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-md scale-[1.02]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="h-28 -mx-4 -mt-4 mb-3 overflow-hidden">
                        <img 
                          src={th.coverImage} 
                          alt={th.titleEn} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-lg">{th.icon}</span>
                          <h3 className="font-black text-sm text-slate-900 leading-tight">
                            {isRtl ? th.titleAr : th.titleEn}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {isRtl ? th.descAr : th.descEn}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CEFR LEVEL SELECTION */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2">
                {isRtl ? '2. المستوى اللغوي المستهدف (CEFR):' : '2. Target CEFR Level:'}
              </label>
              <div className="grid grid-cols-6 gap-2">
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`py-2.5 rounded-xl border text-xs font-black transition-all ${
                      selectedLevel === lvl
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* START BUTTON */}
            <div className="pt-4 text-center">
              <button
                onClick={handleStartAdventure}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-95 text-white rounded-2xl font-black text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
              >
                <Footprints size={20} />
                <span>{isRtl ? 'ابدأ مغامرتك الشيقة الآن 🚀' : 'Begin Your Adventure Now 🚀'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE STORY INTERFACE */
          <div className="space-y-6">
            {/* PROGRESS BAR */}
            {currentNode && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-xs font-black text-slate-700 shrink-0 flex items-center gap-1.5">
                  <Compass size={16} className="text-emerald-600" />
                  <span>{currentNode.chapterTitle}</span>
                </div>
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${currentNode.progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-black text-slate-500">
                  {currentNode.progressPercentage}%
                </span>
              </div>
            )}

            {/* MAIN STORY SCENE CARD */}
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin mx-auto" />
                <h3 className="text-base font-black text-slate-900">
                  {isRtl ? 'يقوم Gemini 3.8 Flash بصياغة المشهد التالي بناءً على اختيارك...' : 'Gemini 3.8 is weaving the next scene based on your decision...'}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {isRtl ? 'تحليل القواعد والمفردات المستهدفة...' : 'Analyzing targeted grammar & linguistic nuances...'}
                </p>
              </div>
            ) : currentNode ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                {/* TOOLBAR: AUDIO & ARABIC TRANSLATION */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <button
                    onClick={handleToggleAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span>{isPlayingAudio ? (isRtl ? 'إيقاف الصوت' : 'Stop Audio') : (isRtl ? 'استمع للمشهد بصوت ناطق أصلي' : 'Listen with Native Voice')}</span>
                  </button>

                  <button
                    onClick={() => setShowArabicTranslation(!showArabicTranslation)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Languages size={15} />
                    <span>{showArabicTranslation ? (isRtl ? 'إخفاء الترجمة' : 'Hide Arabic') : (isRtl ? 'ترجمة سياقية 🌐' : 'Show Arabic 🌐')}</span>
                  </button>
                </div>

                {/* SCENE TEXT (ENGLISH) */}
                <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
                  <p className="text-base sm:text-lg font-serif leading-relaxed text-slate-800">
                    {currentNode.sceneTextEn}
                  </p>
                </div>

                {/* ARABIC TRANSLATION DRAWER */}
                {showArabicTranslation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium"
                  >
                    💡 <strong>{isRtl ? 'الترجمة السياقية للأحداث:' : 'Contextual Arabic Summary:'}</strong> {currentNode.sceneTextAr}
                  </motion.div>
                )}

                {/* TARGET VOCABULARY PILLS */}
                {currentNode.targetedVocab && currentNode.targetedVocab.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-amber-500" />
                      {isRtl ? 'المفردات المستهدفة في هذا المشهد:' : 'Target Vocabulary in Scene:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentNode.targetedVocab.map((v) => (
                        <div 
                          key={v.word}
                          className="bg-white border border-slate-200 hover:border-emerald-300 p-3 rounded-xl flex items-center justify-between shadow-xs transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-xs text-slate-900">{v.word}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{v.ipa}</span>
                            </div>
                            <div className="text-[11px] font-bold text-emerald-700">{v.meaningAr}</div>
                          </div>
                          <button
                            onClick={() => handlePlayVocab(v.word)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title={isRtl ? 'نطق الكلمة' : 'Pronounce'}
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* COMPREHENSION CHECK CHECKPOINT */}
                {currentNode.comprehensionCheck && (
                  <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle size={16} className="text-amber-600" />
                      <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                        {isRtl ? 'فحص الاستيعاب السريع لفتح الخيارات التالية:' : 'Comprehension Checkpoint:'}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm font-black text-slate-800 mb-3">
                      {currentNode.comprehensionCheck.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentNode.comprehensionCheck.options.map((opt, idx) => {
                        const isSelected = selectedCheckOption === idx;
                        const isCorrectOpt = idx === currentNode.comprehensionCheck?.correctIndex;

                        return (
                          <button
                            key={opt}
                            disabled={isCheckAnswered}
                            onClick={() => handleCheckAnswer(idx)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                              isCheckAnswered
                                ? isCorrectOpt
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : isSelected
                                  ? 'bg-rose-600 border-rose-600 text-white'
                                  : 'bg-white border-slate-200 text-slate-400'
                                : 'bg-white border-amber-200/80 text-slate-800 hover:bg-amber-100/50'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isCheckAnswered && (
                      <div className="mt-3 text-xs font-bold text-slate-700">
                        {isCheckCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 size={14} /> {isRtl ? 'أحسنت! إجابة صحيحة. تم فتح خيارات المسار.' : 'Well done! Choices unlocked.'}
                          </span>
                        ) : (
                          <span className="text-rose-700">
                            {isRtl ? 'فهم تقريبي جيد! يمكنك الآن اختيار الخطوة التالية.' : 'Good attempt! You may now pick your next choice.'}
                          </span>
                        )}
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          💡 {currentNode.comprehensionCheck.explanationAr}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* BRANCHING DECISION CHOICES */}
                {currentNode.isEnding ? (
                  /* Adventure Ending Celebration */
                  <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-8 rounded-3xl text-white text-center space-y-4 shadow-lg">
                    <div className="text-4xl">🏆✨</div>
                    <h3 className="text-2xl font-black">
                      {isRtl ? 'نهاية أسطورية للمغامرة!' : 'Epic Adventure Completed!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
                      {isRtl 
                        ? 'أظهرت طلاقة لغوية مذهلة وقدرة رائعة على اتخاذ القرارات باللغة الإنجليزية في مواقف واقعية.'
                        : 'You navigated authentic English decisions with stunning fluency and poise.'}
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-black text-xs shadow-md transition-all cursor-pointer"
                    >
                      {isRtl ? 'خوض مغامرة تفاعلية جديدة 🔄' : 'Start a New Story Branch 🔄'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <GitBranch size={16} className="text-emerald-600" />
                      <span>{isRtl ? 'ماذا يجب أن يفعل البطل الآن؟ (اختر مسارك):' : 'What should the protagonist do next? (Choose your path):'}</span>
                    </h4>

                    <div className="space-y-3">
                      {currentNode.choices.map((choice, cIdx) => (
                        <button
                          key={choice.id || cIdx}
                          onClick={() => fetchNextChapter(choice.textEn)}
                          className="w-full text-left p-4 sm:p-5 bg-white hover:bg-emerald-50/50 border-2 border-slate-200 hover:border-emerald-500 rounded-2xl transition-all group flex items-center justify-between gap-4 cursor-pointer shadow-xs hover:shadow-sm"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-6 h-6 rounded-full bg-slate-900 group-hover:bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 transition-colors">
                                {cIdx + 1}
                              </span>
                              <span className="text-sm font-black text-slate-900 group-hover:text-emerald-950 transition-colors">
                                {choice.textEn}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 group-hover:text-slate-700 ml-8">
                              {choice.textAr}
                            </p>
                          </div>
                          <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-600 shrink-0 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
