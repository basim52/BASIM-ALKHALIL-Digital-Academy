import React, { useState } from 'react';
import { 
  Users, 
  ChefHat, 
  Check, 
  Volume2, 
  Award, 
  Shuffle, 
  Printer, 
  CheckCircle2, 
  ArrowLeft
} from 'lucide-react';
import { UserProfile } from '../types';
import { managedSpeak } from '../lib/audio';
import {
  SectionShell,
  GoldCard,
  PrimaryButton,
  GhostButton,
  ProgressPill,
  TutorFace
} from './ui/academy';

interface FamilyActivitiesProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

export const FamilyActivities: React.FC<FamilyActivitiesProps> = ({
  lang,
  userProfile: _userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'bingo' | 'cooking'>('bingo');
  
  // Bingo states
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [calledWord, setCalledWord] = useState<string | null>(null);
  const [calledHistory, setCalledHistory] = useState<string[]>([]);
  const [gridMarked, setGridMarked] = useState<Record<string, boolean>>({});
  
  // Cooking states
  const [cookingStepsChecked, setCookingStepsChecked] = useState<Record<number, boolean>>({});
  const [cookingXPClaimed, setCookingXPClaimed] = useState(false);

  // Vocabulary list from Noor stories
  const vocabWords = [
    { word: "Apple", meaning: "تفاحة 🍎" },
    { word: "Airport", meaning: "مطار ✈️" },
    { word: "Bus", meaning: "حافلة 🚌" },
    { word: "Train", meaning: "قطار 🚄" },
    { word: "Tower", meaning: "برج 🗼" },
    { word: "Clock", meaning: "ساعة ⏰" },
    { word: "Cat", meaning: "قطة 🐱" },
    { word: "Milk", meaning: "حليب 🥛" },
    { word: "Book", meaning: "كتاب 📖" }
  ];

  // 4 distinct Bingo grid layouts (9 pocket each)
  const bingoCards = [
    {
      id: 1,
      title: "Card A - Noor's Favorites",
      words: ["Airport", "Apple", "Bus", "Milk", "Tower", "Book", "Train", "Cat", "Clock"]
    },
    {
      id: 2,
      title: "Card B - London Journey",
      words: ["Bus", "Clock", "Airport", "Train", "Book", "Apple", "Cat", "Milk", "Tower"]
    },
    {
      id: 3,
      title: "Card C - Breakfast & Animals",
      words: ["Apple", "Cat", "Milk", "Clock", "Bus", "Book", "Train", "Tower", "Airport"]
    },
    {
      id: 4,
      title: "Card D - Explorer Deck",
      words: ["Book", "Tower", "Train", "Milk", "Airport", "Cat", "Clock", "Bus", "Apple"]
    }
  ];

  // Pizza Steps
  const pizzaSteps = [
    {
      id: 1,
      en: "Put the tomato sauce on the bread.",
      ar: "ضع صلصة الطماطم اللذيذة على قطعة الخبز."
    },
    {
      id: 2,
      en: "Sprinkle the white cheese on top.",
      ar: "رش الجبن الأبيض المبشور في الأعلى بالتساوي."
    },
    {
      id: 3,
      en: "Make happy eyes with sliced black olives!",
      ar: "اصنع عينين سعيدتين تبتسمان باستخدام شرائح الزيتون الأسود المقطعة!"
    },
    {
      id: 4,
      en: "Use a yellow or red pepper slice to draw a big smile.",
      ar: "استخدم شريحة فلفل أحمر أو أصفر حلو لرسم ابتسامة عريضة ومبتهجة."
    },
    {
      id: 5,
      en: "Bake in the high oven for five minutes!",
      ar: "اخبزها في الفرن الساخن بحذر لمدة خمس دقائق حتى يذوب الجبن!"
    }
  ];

  // TTS Reader
  const speakEnglishText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      managedSpeak(utterance);
    }
  };

  // Bingo Random Word caller
  const handleCallNextWord = () => {
    const uncalled = vocabWords.filter(vw => !calledHistory.includes(vw.word));
    if (uncalled.length === 0) {
      speakEnglishText("All words have been called! Restart the Bingo ball.");
      alert(isRtl ? "تم الاتصال بجميع الكلمات! أعد تصفير اللعبة للبدء مجدداً." : "All words called! Reset to start again.");
      return;
    }

    const randomWord = uncalled[Math.floor(Math.random() * uncalled.length)];
    setCalledWord(randomWord.word);
    setCalledHistory(prev => [...prev, randomWord.word]);
    speakEnglishText(randomWord.word);
  };

  const resetBingoGame = () => {
    setCalledWord(null);
    setCalledHistory([]);
    setGridMarked({});
  };

  const handleMarkCell = (word: string) => {
    setGridMarked(prev => ({
      ...prev,
      [word]: !prev[word]
    }));
  };

  const handleToggleStep = (stepId: number) => {
    setCookingStepsChecked(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const claimCookingXP = () => {
    if (cookingXPClaimed) return;
    setCookingXPClaimed(true);
    if (onXPAdded) onXPAdded(20);
  };

  const allCookingFinished = pizzaSteps.every(step => cookingStepsChecked[step.id]);

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-24 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#C49E3A]/25">
        <div className="flex items-center gap-3">
          <TutorFace tutor="sara" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'بوابة الأنشطة العائلية 👨‍👩‍👧‍👦' : 'Family Activities & Game Hub 👨‍👩‍👧‍👦'}
              </h1>
              <ProgressPill>
                {activeTab === 'bingo' ? (isRtl ? 'بينغو' : 'Bingo') : (isRtl ? 'طبخ' : 'Cooking')}
              </ProgressPill>
            </div>
            <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
              {isRtl 
                ? 'شارك إخوتك وأولياء أمورك المتعة بألعاب تفاعلية، طبخ عائلي، وحصد نقاط تفوق' 
                : 'Bring the whole family together with interactive board games and child cooking menus'}
            </p>
          </div>
        </div>

        <GhostButton onClick={onBack}>
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة للمنصة' : 'Back to Academy'}</span>
        </GhostButton>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
        <GhostButton
          active={activeTab === 'bingo'}
          onClick={() => setActiveTab('bingo')}
          className="flex-1 py-2.5 text-xs sm:text-sm"
        >
          <span>🎲</span>
          <span>{isRtl ? 'ليلة ألعاب: بينغو الكلمات' : 'Bingo Game Night'}</span>
        </GhostButton>

        <GhostButton
          active={activeTab === 'cooking'}
          onClick={() => setActiveTab('cooking')}
          className="flex-1 py-2.5 text-xs sm:text-sm"
        >
          <span>🍕</span>
          <span>{isRtl ? 'تحدي الطبخ: بيتزا سعيد' : 'Happy Pizza Recipe'}</span>
        </GhostButton>
      </div>

      {/* Content displays */}
      {activeTab === 'bingo' ? (
        /* TAB 1: BINGO GAME */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left panel: Card display and marks (8 cols) */}
          <GoldCard className="lg:col-span-8 p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#C49E3A]/25 pb-4">
              <div>
                <span className="text-[10px] text-[#C49E3A] font-black uppercase tracking-widest block">
                  {isRtl ? 'ألعاب تعاونية للطباعة واللعب' : 'CLASSIC WORD BINGO CARD'}
                </span>
                <h3 className="text-base font-black text-[#002147]">
                  {bingoCards[currentCardIndex].title}
                </h3>
              </div>

              {/* Card switcher */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-xs font-bold text-[#002147]/70 me-1">
                  {isRtl ? 'البطاقة:' : 'Card:'}
                </span>
                {bingoCards.map((bc, i) => (
                  <button
                    key={bc.id}
                    type="button"
                    onClick={() => {
                      setCurrentCardIndex(i);
                      setGridMarked({});
                    }}
                    className={`w-8 h-8 rounded-xl text-xs font-black border transition-transform active:scale-95 cursor-pointer ${
                      currentCardIndex === i
                        ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                        : 'bg-white text-[#002147] hover:bg-[#fdfaf3] border-[#C49E3A]/40'
                    }`}
                  >
                    {bc.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Bingo Card Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-sm sm:max-w-md mx-auto aspect-square">
              {bingoCards[currentCardIndex].words.map((word) => {
                const isMarked = !!gridMarked[word];
                const wasCalledLast = calledWord === word;
                const isCalledEver = calledHistory.includes(word);

                return (
                  <button
                    key={word}
                    type="button"
                    onClick={() => handleMarkCell(word)}
                    className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2.5 transition-transform active:scale-95 cursor-pointer select-none ${
                      isMarked 
                        ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A] shadow-sm'
                        : wasCalledLast 
                          ? 'bg-[#E6C36A]/25 border-[#C49E3A] text-[#002147] ring-2 ring-[#C49E3A]/50'
                          : isCalledEver
                            ? 'bg-[#fdfaf3] border-[#C49E3A]/60 text-[#002147]'
                            : 'bg-white border-[#C49E3A]/30 text-[#002147] hover:border-[#C49E3A] hover:bg-[#fdfaf3]'
                    }`}
                  >
                    <span className="text-2xl mb-1 shrink-0">
                      {vocabWords.find(vw => vw.word === word)?.meaning.split(' ')[1]}
                    </span>
                    <strong className="text-xs sm:text-sm font-sans font-black tracking-tight capitalize block">
                      {word}
                    </strong>
                    <span className={`text-[10px] font-bold block ${isMarked ? 'text-white/80' : 'text-[#002147]/65'}`}>
                      {vocabWords.find(vw => vw.word === word)?.meaning.split(' ')[0]}
                    </span>

                    {/* Checkmark overlay */}
                    {isMarked && (
                      <span className="absolute top-2 right-2 bg-[#C49E3A] text-[#002147] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="bg-[#fdfaf3] border border-[#C49E3A]/35 p-4 rounded-2xl space-y-1.5 text-xs text-[#002147]/80 leading-relaxed font-bold">
              <p className="flex items-center gap-1.5 text-[#002147] font-black">
                <Printer size={14} className="text-[#C49E3A] shrink-0" />
                <span>{isRtl ? 'كيفية اللعب أوفلاين مع العائلة:' : 'How to Play Offline:'}</span>
              </p>
              <p>
                {isRtl
                  ? '١) افتح بطاقات البينغو الفردية للأبناء. ٢) يقدم الأب/الأم دور منادي الكلمات بالضغط على "توليد الكلمة" بالجهة المقابلة. ٣) أول من يجمع ٣ كلمات متجاورة بخط عمودي أو أفقي أو مائل يصرخ "BINGO!" ويفوز بالتحدي!'
                  : '1. Give siblings separate bingo decks. 2. Tap the Word Caller wheel to pull automatic words. 3. Sibling completing 3 in a line shouts BINGO to win!'}
              </p>
            </div>
          </GoldCard>

          {/* Right panel: Ball caller wheel controls (4 cols) */}
          <GoldCard className="lg:col-span-4 p-5 sm:p-6 text-center space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C49E3A]">
                {isRtl ? 'استدعاء الكلمات' : 'WORD GENERATOR'}
              </span>
              <ProgressPill>
                {isRtl ? `${calledHistory.length} / 9` : `${calledHistory.length} / 9`}
              </ProgressPill>
            </div>

            {/* Called screen */}
            <div className="bg-[#fdfaf3] border-2 border-[#C49E3A]/50 rounded-2xl p-5 min-h-[110px] flex items-center justify-center relative">
              {calledWord ? (
                <div className="space-y-1.5">
                  <h4 className="text-2xl font-sans font-black text-[#002147] tracking-tight capitalize">
                    {calledWord}
                  </h4>
                  <p className="text-xs text-[#002147]/70 font-bold">
                    {vocabWords.find(vw => vw.word === calledWord)?.meaning}
                  </p>
                  <button
                    type="button"
                    onClick={() => speakEnglishText(calledWord)}
                    className="mx-auto w-8 h-8 bg-white border border-[#C49E3A]/40 hover:bg-[#fdfaf3] rounded-full flex items-center justify-center text-[#002147] transition-all cursor-pointer"
                    title="Pronounce"
                  >
                    <Volume2 size={14} className="text-[#C49E3A]" />
                  </button>
                </div>
              ) : (
                <p className="text-xs font-bold text-[#002147]/60 leading-normal">
                  {isRtl ? 'اضغط الزر أدناه لبدء السحب!' : 'Tap the button below to generate the first word!'}
                </p>
              )}
            </div>

            {/* Trigger buttons */}
            <div className="space-y-2">
              <PrimaryButton
                onClick={handleCallNextWord}
                className="w-full py-3"
              >
                <Shuffle size={14} />
                <span>{isRtl ? 'توليد الكلمة العشوائية 🎲' : 'CALL NEXT BALL 🎲'}</span>
              </PrimaryButton>

              <GhostButton
                onClick={resetBingoGame}
                className="w-full py-2"
              >
                {isRtl ? 'تصفير اللعبة بالكامل' : 'Reset History'}
              </GhostButton>
            </div>

            {/* Call History */}
            <div className="space-y-2 pt-3 border-t border-[#C49E3A]/25">
              <span className="text-[10px] uppercase tracking-wider font-black text-[#002147]/70 block">
                {isRtl ? `الكلمات المسحوبة (${calledHistory.length})` : `Drawn Words (${calledHistory.length})`}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {calledHistory.map((word, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#fdfaf3] border border-[#C49E3A]/40 px-2 py-0.5 rounded-lg font-sans font-black text-[#002147]"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </GoldCard>

        </div>
      ) : (
        /* TAB 2: HAPPY FACE PIZZA COOKING CHALLENGE */
        <GoldCard className="p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#C49E3A]/25 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#002147] text-[#E6C36A] flex items-center justify-center shrink-0">
                <ChefHat size={24} />
              </div>
              <div>
                <span className="text-[10px] text-[#C49E3A] font-black uppercase tracking-widest block">
                  {isRtl ? 'وصفة بسيطة إنجليزية وعربية' : 'FAMILY EVENING COOKING CHALLENGE'}
                </span>
                <h3 className="text-lg font-black text-[#002147]">
                  {isRtl ? 'وصفة "بيتزا الوجه السعيد" ترفيهية للأطفال' : '“Happy Face Pizza” Kid-Friendly Recipe'}
                </h3>
              </div>
            </div>

            <ProgressPill>
              <Award size={13} className="text-[#C49E3A]" />
              <span>{pizzaSteps.filter(s => cookingStepsChecked[s.id]).length} / 5 {isRtl ? 'خطوات' : 'Steps'}</span>
            </ProgressPill>
          </div>

          {/* Steps interactive list */}
          <div className="space-y-3">
            {pizzaSteps.map((step) => {
              const isChecked = !!cookingStepsChecked[step.id];

              return (
                <div
                  key={step.id}
                  onClick={() => handleToggleStep(step.id)}
                  className={`p-4 rounded-2xl border transition-transform active:scale-[0.99] cursor-pointer flex items-start gap-4 select-none ${
                    isChecked
                      ? 'bg-[#fdfaf3] border-[#C49E3A] ring-1 ring-[#C49E3A]/30 text-[#002147]'
                      : 'bg-white border-[#C49E3A]/30 hover:border-[#C49E3A] hover:bg-[#fdfaf3]'
                  }`}
                >
                  {/* Checkbox circle */}
                  <span
                    className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                      isChecked 
                        ? 'bg-[#002147] border-[#002147] text-[#E6C36A]' 
                        : 'bg-white border-[#C49E3A]/60'
                    }`}
                  >
                    {isChecked && <Check size={14} className="stroke-[3px]" />}
                  </span>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-sans font-black text-sm sm:text-base text-[#002147] leading-tight">
                        Step {step.id}. {step.en}
                      </h4>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglishText(step.en);
                        }}
                        className="p-1.5 bg-white border border-[#C49E3A]/40 rounded-xl text-[#002147] hover:bg-[#fdfaf3] shrink-0 cursor-pointer"
                        title="Pronounce"
                      >
                        <Volume2 size={14} className="text-[#C49E3A]" />
                      </button>
                    </div>

                    <p className="text-xs text-[#002147]/75 font-bold block pt-1 border-t border-dashed border-[#C49E3A]/25">
                      {step.ar}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions for claiming Cooking XP */}
          {allCookingFinished ? (
            <div className="bg-[#fdfaf3] border-2 border-[#C49E3A] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-start">
                <span className="text-2xl block mb-1">👑</span>
                <h4 className="font-black text-[#002147] text-sm">
                  {isRtl ? 'طبختم معاً بسعادة يا لها من ليلة رائعة!' : 'Happy Chef Team Completed!'}
                </h4>
                <p className="text-xs text-[#002147]/75 font-bold">
                  {isRtl ? 'اضغط لحصد عوائد وبونص الطبيخ العجيب!' : 'Smashed all checkable cooking steps.'}
                </p>
              </div>

              {!cookingXPClaimed ? (
                <PrimaryButton
                  onClick={claimCookingXP}
                  className="px-6 py-2.5 shrink-0"
                >
                  <span>{isRtl ? 'حصد +20 نقطة طاهي 🏆' : 'Claim +20 Chef XP 🏆'}</span>
                </PrimaryButton>
              ) : (
                <ProgressPill className="px-4 py-2">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>{isRtl ? 'تم إضافة النقاط (+20 XP)' : 'XP Gained Successfully (+20 XP)'}</span>
                </ProgressPill>
              )}
            </div>
          ) : (
            <div className="bg-[#fdfaf3] p-4 border border-dashed border-[#C49E3A]/40 rounded-2xl text-center text-xs text-[#002147]/65 font-bold">
              {isRtl 
                ? `أكمل جميع الخطوات الـ 5 مع أهلك لتنال جائزة البيتزا الممتعة (${pizzaSteps.filter(s => cookingStepsChecked[s.id]).length}/5)` 
                : `Please check all 5 cooking tasks with parents/siblings (${pizzaSteps.filter(s => cookingStepsChecked[s.id]).length}/5)`}
            </div>
          )}
        </GoldCard>
      )}
    </SectionShell>
  );
};
