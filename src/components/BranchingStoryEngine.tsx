import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  GitBranch, 
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';
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
    icon: '🇬🇧'
  },
  {
    id: 'Galaxy Explorer',
    titleAr: 'مستكشف الفضاء والمحطة النجمية 🚀',
    titleEn: 'Galaxy Space Explorer',
    descAr: 'انطلق في مهمة استكشاف علمية مع طاقم دولي وتواصل بلغة العلوم',
    descEn: 'Embark on an interstellar scientific mission with an international crew',
    icon: '🚀'
  },
  {
    id: 'Oxford Detective',
    titleAr: 'لغز قلعة أكسفورد التاريخية 🕵️',
    titleEn: 'The Mystery of Oxford Castle',
    descAr: 'فك شفرات المخطوطات القديمة وابحث عن الأدلة اللغوية المخفية',
    descEn: 'Decipher ancient manuscripts and solve linguistic clues in ancient libraries',
    icon: '🕵️'
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

  // Fetch Story Chapter / Branch from Gemini
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
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : 'font-sans'}>
      {/* HEADER BAR */}
      <GoldCard className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
        <GhostButton onClick={isStarted ? handleReset : onBack}>
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isStarted ? (isRtl ? 'اختيار قصة أخرى' : 'Change Adventure') : (isRtl ? 'العودة' : 'Back')}</span>
        </GhostButton>

        <div className="flex items-center gap-2">
          <ProgressPill>
            <GitBranch size={13} className="text-[#C49E3A]" />
            <span>Gemini 3.8 Branching Stories</span>
          </ProgressPill>
          <TutorFace tutor="sara" size="sm" />
        </div>
      </GoldCard>

      {/* SETUP SCREEN */}
      {!isStarted ? (
        <GoldCard className="p-5 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <TutorFace tutor="sara" size="md" className="mx-auto" />
            <h1 className="text-xl sm:text-2xl font-black text-[#002147]">
              {isRtl ? 'عالم القصص التفاعلية متعددة النهايات 🌟' : 'Branching Interactive Story Engine 🌟'}
            </h1>
            <p className="text-xs sm:text-sm text-[#002147]/70 font-semibold leading-relaxed">
              {isRtl 
                ? 'أنت البطل الذي يقرر مسار القصة! كل اختيار تتخذه بالإنجليزية يُصيغ أحداثاً جديدة مدعومة بالذكاء الاصطناعي.'
                : 'You are the protagonist! Every decision in English steers the plot into fresh AI-generated chapters.'}
            </p>
          </div>

          {/* THEME SELECTION */}
          <div>
            <label className="block text-xs font-black text-[#002147]/70 uppercase mb-2.5">
              {isRtl ? '1. اختر عالم المغامرة:' : '1. Select Adventure Realm:'}
            </label>
            <div className="space-y-2">
              {STORY_THEMES.map((th, idx) => {
                const isSelected = selectedTheme.id === th.id;
                return (
                  <LessonTile
                    key={th.id}
                    order={idx + 1}
                    title={isRtl ? th.titleAr : th.titleEn}
                    subtitle={isRtl ? th.descAr : th.descEn}
                    emoji={th.icon}
                    active={isSelected}
                    onClick={() => setSelectedTheme(th)}
                  />
                );
              })}
            </div>
          </div>

          {/* CEFR LEVEL SELECTION */}
          <div>
            <label className="block text-xs font-black text-[#002147]/70 uppercase mb-2.5">
              {isRtl ? '2. المستوى اللغوي المستهدف (CEFR):' : '2. Target CEFR Level:'}
            </label>
            <div className="grid grid-cols-6 gap-2">
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                <GhostButton
                  key={lvl}
                  active={selectedLevel === lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className="!py-2 !px-1 text-xs sm:text-sm font-black justify-center"
                >
                  {lvl}
                </GhostButton>
              ))}
            </div>
          </div>

          {/* START BUTTON */}
          <div className="pt-2 text-center">
            <PrimaryButton
              onClick={handleStartAdventure}
              className="w-full sm:w-auto px-8 py-3 text-sm sm:text-base mx-auto"
            >
              <Compass size={18} />
              <span>{isRtl ? 'ابدأ مغامرتك الشيقة الآن 🚀' : 'Begin Your Adventure Now 🚀'}</span>
            </PrimaryButton>
          </div>
        </GoldCard>
      ) : (
        /* ACTIVE STORY INTERFACE */
        <div className="space-y-4">
          {/* PROGRESS BAR */}
          {currentNode && (
            <GoldCard className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <TutorFace tutor="sara" size="sm" />
                <span className="text-xs sm:text-sm font-black text-[#002147] flex items-center gap-1.5">
                  <Compass size={15} className="text-[#C49E3A]" />
                  <span>{currentNode.chapterTitle}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex-1 sm:w-48 bg-[#fdfaf3] border border-[#C49E3A]/30 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#C49E3A] h-full transition-all duration-500" 
                    style={{ width: `${currentNode.progressPercentage}%` }}
                  />
                </div>
                <ProgressPill>{currentNode.progressPercentage}%</ProgressPill>
              </div>
            </GoldCard>
          )}

          {/* MAIN STORY SCENE CARD */}
          {loading ? (
            <GoldCard className="p-10 text-center space-y-4">
              <div className="w-10 h-10 border-4 border-[#002147]/20 border-t-[#002147] rounded-full animate-spin mx-auto" />
              <h3 className="text-sm sm:text-base font-black text-[#002147]">
                {isRtl ? 'يقوم Gemini بصياغة المشهد التالي بناءً على اختيارك...' : 'Gemini is weaving the next scene based on your decision...'}
              </h3>
              <p className="text-xs text-[#002147]/60 font-semibold">
                {isRtl ? 'تحليل القواعد والمفردات المستهدفة...' : 'Analyzing targeted grammar & linguistic nuances...'}
              </p>
            </GoldCard>
          ) : currentNode ? (
            <GoldCard className="p-5 sm:p-7 space-y-5">
              {/* TOOLBAR: AUDIO & ARABIC TRANSLATION */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C49E3A]/20 pb-3">
                <GhostButton
                  onClick={handleToggleAudio}
                  active={isPlayingAudio}
                >
                  {isPlayingAudio ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span>{isPlayingAudio ? (isRtl ? 'إيقاف الصوت' : 'Stop Audio') : (isRtl ? 'استمع للمشهد بصوت ناطق أصلي' : 'Listen with Native Voice')}</span>
                </GhostButton>

                <GhostButton
                  onClick={() => setShowArabicTranslation(!showArabicTranslation)}
                  active={showArabicTranslation}
                >
                  <Languages size={15} />
                  <span>{showArabicTranslation ? (isRtl ? 'إخفاء الترجمة' : 'Hide Arabic') : (isRtl ? 'ترجمة سياقية 🌐' : 'Show Arabic 🌐')}</span>
                </GhostButton>
              </div>

              {/* SCENE TEXT (ENGLISH) */}
              <div className="bg-[#fdfaf3] p-5 sm:p-6 rounded-2xl border border-[#C49E3A]/40">
                <p className="text-base sm:text-lg leading-relaxed text-[#002147] font-medium" dir="ltr">
                  {currentNode.sceneTextEn}
                </p>
              </div>

              {/* ARABIC TRANSLATION DRAWER */}
              {showArabicTranslation && (
                <div className="bg-[#fdfaf3] border border-[#C49E3A]/60 p-4 rounded-2xl text-xs sm:text-sm text-[#002147] leading-relaxed font-semibold">
                  💡 <strong>{isRtl ? 'الترجمة السياقية للأحداث:' : 'Contextual Arabic Summary:'}</strong> {currentNode.sceneTextAr}
                </div>
              )}

              {/* TARGET VOCABULARY */}
              {currentNode.targetedVocab && currentNode.targetedVocab.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-black text-[#002147]/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#C49E3A]" />
                    <span>{isRtl ? 'المفردات المستهدفة في هذا المشهد:' : 'Target Vocabulary in Scene:'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentNode.targetedVocab.map((v) => (
                      <div 
                        key={v.word}
                        className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-xs text-[#002147]">{v.word}</span>
                            <span className="text-[10px] text-[#002147]/60 font-mono">{v.ipa}</span>
                          </div>
                          <div className="text-[11px] font-bold text-[#C49E3A]">{v.meaningAr}</div>
                        </div>
                        <GhostButton
                          onClick={() => handlePlayVocab(v.word)}
                          className="!p-1.5"
                          title={isRtl ? 'نطق الكلمة' : 'Pronounce'}
                        >
                          <Volume2 size={13} />
                        </GhostButton>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COMPREHENSION CHECK CHECKPOINT */}
              {currentNode.comprehensionCheck && (
                <div className="bg-[#fdfaf3] border border-[#C49E3A]/50 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle size={16} className="text-[#C49E3A]" />
                    <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                      {isRtl ? 'فحص الاستيعاب السريع لفتح الخيارات التالية:' : 'Comprehension Checkpoint:'}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-[#002147] mb-3">
                    {currentNode.comprehensionCheck.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentNode.comprehensionCheck.options.map((opt, idx) => {
                      const isSelected = selectedCheckOption === idx;
                      const isCorrectOpt = idx === currentNode.comprehensionCheck?.correctIndex;
                      const optState = isCheckAnswered ? (isCorrectOpt ? 'correct' : isSelected ? 'wrong' : 'normal') : 'normal';

                      return (
                        <AnswerOption
                          key={opt}
                          disabled={isCheckAnswered}
                          selected={isSelected}
                          state={optState}
                          label={opt}
                          onClick={() => handleCheckAnswer(idx)}
                        />
                      );
                    })}
                  </div>

                  {isCheckAnswered && (
                    <div className="mt-3 text-xs font-bold text-[#002147]">
                      {isCheckCorrect ? (
                        <span className="text-green-700 flex items-center gap-1 font-black">
                          <CheckCircle2 size={14} /> {isRtl ? 'أحسنت! إجابة صحيحة. تم فتح خيارات المسار.' : 'Well done! Choices unlocked.'}
                        </span>
                      ) : (
                        <span className="text-red-700 font-black">
                          {isRtl ? 'فهم تقريبي جيد! يمكنك الآن اختيار الخطوة التالية.' : 'Good attempt! You may now pick your next choice.'}
                        </span>
                      )}
                      <p className="text-[11px] text-[#002147]/70 font-semibold mt-1">
                        💡 {currentNode.comprehensionCheck.explanationAr}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* BRANCHING DECISION CHOICES */}
              {currentNode.isEnding ? (
                /* Adventure Ending Celebration */
                <div className="bg-[#002147] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#C49E3A] text-center space-y-4">
                  <div className="text-4xl">🏆✨</div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#E6C36A]">
                    {isRtl ? 'نهاية أسطورية للمغامرة!' : 'Epic Adventure Completed!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 max-w-md mx-auto leading-relaxed">
                    {isRtl 
                      ? 'أظهرت طلاقة لغوية مذهلة وقدرة رائعة على اتخاذ القرارات باللغة الإنجليزية في مواقف واقعية.'
                      : 'You navigated authentic English decisions with stunning fluency and poise.'}
                  </p>
                  <PrimaryButton onClick={handleReset} className="mx-auto">
                    <RotateCcw size={14} />
                    <span>{isRtl ? 'خوض مغامرة تفاعلية جديدة 🔄' : 'Start a New Story Branch 🔄'}</span>
                  </PrimaryButton>
                </div>
              ) : (
                <div>
                  <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GitBranch size={16} className="text-[#C49E3A]" />
                    <span>{isRtl ? 'ماذا يجب أن يفعل البطل الآن؟ (اختر مسارك):' : 'What should the protagonist do next? (Choose your path):'}</span>
                  </h4>

                  <div className="space-y-2.5">
                    {currentNode.choices.map((choice, cIdx) => (
                      <AnswerOption
                        key={choice.id || cIdx}
                        onClick={() => fetchNextChapter(choice.textEn)}
                        label={
                          <div className="py-0.5 text-start w-full">
                            <div className="flex items-center gap-2 mb-0.5" dir="ltr">
                              <span className="w-5 h-5 rounded-full bg-[#002147] text-[#E6C36A] flex items-center justify-center font-black text-xs shrink-0">
                                {cIdx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-black text-[#002147]">
                                {choice.textEn}
                              </span>
                            </div>
                            <p className="text-xs text-[#002147]/70 font-bold ml-7" dir="rtl">
                              {choice.textAr}
                            </p>
                          </div>
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </GoldCard>
          ) : null}
        </div>
      )}
    </SectionShell>
  );
};
