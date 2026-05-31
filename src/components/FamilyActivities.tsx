import React, { useState } from 'react';
import { 
  Users, 
  ChefHat, 
  Check, 
  Volume2, 
  Award, 
  HelpCircle, 
  Shuffle, 
  Layers, 
  Printer, 
  CheckCircle2, 
  UtensilsCrossed, 
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';

interface FamilyActivitiesProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

export const FamilyActivities: React.FC<FamilyActivitiesProps> = ({
  lang,
  userProfile,
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
      window.speechSynthesis.speak(utterance);
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
    <div className="min-h-screen bg-[#FCFAF2] pb-24 text-slate-800">
      
      {/* Decorative top wave banner */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#FFF3E0] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-6 relative z-10">

        {/* Header toolbar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-orange-100 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/10 shrink-0">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'بوابة الأنشطة العائلية 👨‍👩‍👧‍👦' : 'Family Activities & Game Hub 👨‍👩‍👧‍👦'}
              </h1>
              <p className="text-xs text-orange-850 font-bold tracking-widest mt-0.5">
                {isRtl ? 'شارك إخوتك وأولياء أمورك المتعة بألعاب تفاعلية، طبخ عائلي، وحصد نقاط تفوق' : 'Bring the whole family together with interactive board games and child cooking menus'}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-black text-xs transition-all cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{isRtl ? 'العودة للمنصة ↩️' : 'Back to Academy ↩️'}</span>
          </button>
        </div>

        {/* Mini Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-6 bg-white p-2 rounded-2xl border border-orange-100">
          <button
            onClick={() => setActiveTab('bingo')}
            className={`flex-1 max-w-xs py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'bingo'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/15'
                : 'text-slate-650 hover:bg-slate-50'
            }`}
          >
            <span>🎲</span>
            <span>{isRtl ? 'ليلة ألعاب: بينغو الكلمات 🎮' : 'Bingo Game Night 🎮'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cooking')}
            className={`flex-1 max-w-xs py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'cooking'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/15'
                : 'text-slate-650 hover:bg-slate-50'
            }`}
          >
            <span>🍕</span>
            <span>{isRtl ? 'تحدي الطبخ: بيتزا سعيد 👨‍🍳' : 'Happy Pizza Recipe 👨‍🍳'}</span>
          </button>
        </div>

        {/* Content displays */}
        {activeTab === 'bingo' ? (
          /* =======================================
             TAB 1: FAMILY GAME NIGHT BINGO GAME
             ======================================= */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left panel: Card display and marks (8 cols) */}
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
                <div>
                  <span className="text-[10px] text-orange-600 font-extrabold uppercase tracking-widest block">
                    {isRtl ? 'ألعاب تعاونية للطباعة واللعب' : 'CLASSIC WORD BINGO CARD'}
                  </span>
                  <h3 className="text-base font-black text-[#002147]">
                    {bingoCards[currentCardIndex].title}
                  </h3>
                </div>

                {/* Card switcher */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {bingoCards.map((bc, i) => (
                    <button
                      key={bc.id}
                      onClick={() => {
                        setCurrentCardIndex(i);
                        setGridMarked({});
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                        currentCardIndex === i
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border-slate-200'
                      }`}
                    >
                      {bc.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bingo Card Grid */}
              <div className="grid grid-cols-3 gap-3.5 max-w-md mx-auto aspect-square">
                {bingoCards[currentCardIndex].words.map((word) => {
                  const isMarked = !!gridMarked[word];
                  const wasCalledLast = calledWord === word;
                  const isCalledEver = calledHistory.includes(word);

                  return (
                    <button
                      key={word}
                      onClick={() => handleMarkCell(word)}
                      className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-3 transition-all cursor-pointer select-none ${
                        isMarked 
                          ? 'bg-orange-50 border-orange-500 text-orange-900 shadow-inner'
                          : wasCalledLast 
                            ? 'bg-rose-50 border-rose-500 text-rose-800 animate-pulse'
                            : isCalledEver
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-[#FCFAF0] border-slate-150 hover:bg-amber-50/20 hover:border-amber-300'
                      }`}
                    >
                      <span className="text-2xl mb-1 shrink-0">
                        {vocabWords.find(vw => vw.word === word)?.meaning.split(' ')[1]}
                      </span>
                      <strong className="text-xs font-sans font-black tracking-tight capitalize block">
                        {word}
                      </strong>
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {vocabWords.find(vw => vw.word === word)?.meaning.split(' ')[0]}
                      </span>

                      {/* Tick checkmark overlay */}
                      {isMarked && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instructions and Printable indicator */}
              <div className="bg-slate-50/80 border border-slate-150 p-4 rounded-2xl space-y-2 text-xs text-slate-500 leading-relaxed font-bold">
                <p className="flex items-center gap-1 text-slate-700">
                  <Printer size={13} className="text-orange-500 shrink-0" />
                  <span>{isRtl ? 'كيفية اللعب أوفلاين مع العائلة:' : 'How to Play Offline:'}</span>
                </p>
                <p className="pl-4">
                  {isRtl
                    ? '1. افتح بطاقات البينغو الفردية للأبناء. 2. يقدم الأب/الأم دور منادي الكلمات بالضغط على "توليد الكلمة" بالجهة المقابلة. 3. الولد الذي يجمع 3 كلمات متجاورة بخط عمودي أو أفقي أو مائل يصرخ "BINGO!" ويفوز بالتحدي!'
                    : '1. Give siblings separate bingo decks. 2. Tap the Word Caller wheel to pull automatic words. 3. Sibling completing 3 in a line shouts BINGO to win!'}
                </p>
              </div>

            </div>

            {/* Right panel: Ball caller wheel controls (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              
              {/* Voice caller wheel card */}
              <div className="bg-[#FFF8E1] border border-amber-200 rounded-3xl p-5 text-center space-y-5">
                <span className="text-4xl block animate-spin" style={{ animationDuration: '10s' }}>🔮</span>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-amber-800 tracking-wider block uppercase">
                    {isRtl ? 'آلة استدعاء ونطق الكلمات' : 'WORD GENERATOR BALL'}
                  </span>
                  <h3 className="text-xs text-slate-400 font-bold">
                    {isRtl ? 'المنادي التلقائي بصوت الذكاء الاصطناعي:' : 'Draw random ball automatically'}
                  </h3>
                </div>

                {/* Called screen */}
                <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 min-h-[90px] flex items-center justify-center relative overflow-hidden">
                  {calledWord ? (
                    <div className="space-y-1.5">
                      <h4 className="text-2xl font-sans font-black text-rose-600 tracking-tight capitalize">
                        {calledWord}
                      </h4>
                      <p className="text-xs text-slate-400 font-bold">
                        {vocabWords.find(vw => vw.word === calledWord)?.meaning}
                      </p>
                      <button
                        onClick={() => speakEnglishText(calledWord)}
                        className="mx-auto w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-all cursor-pointer"
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-slate-400 leading-normal">
                      {isRtl ? 'اضغط على الدوبار أدناه لبدء السحب!' : 'Tap the ball below to generate the first word!'}
                    </p>
                  )}
                </div>

                {/* Trigger button */}
                <div className="space-y-2">
                  <button
                    onClick={handleCallNextWord}
                    className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Shuffle size={13} />
                    <span>{isRtl ? 'توليد الكلمة العشوائية 🎲' : 'CALL NEXT BALL 🎲'}</span>
                  </button>

                  <button
                    onClick={resetBingoGame}
                    className="w-full py-2 bg-white text-stone-600 text-[10px] border font-black rounded-lg hover:bg-stone-50 cursor-pointer"
                  >
                    {isRtl ? 'تصفير اللعبة بالكامل' : 'Reset History'}
                  </button>
                </div>

                {/* Call History */}
                <div className="space-y-1.5 pt-2 border-t border-amber-100 text-left">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-800 block text-center">
                    {isRtl ? `الكلمات التي سحبت (${calledHistory.length})` : `Drawn Words (${calledHistory.length})`}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-1 pr-1.5">
                    {calledHistory.map((word, i) => (
                      <span key={i} className="text-[10px] bg-white border border-amber-250 px-2 py-0.5 rounded-md font-sans font-extrabold text-slate-700 block">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* =======================================
             TAB 2: HAPPY FACE PIZZA COOKING CHALLENGE
             ======================================= */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            
            <div className="flex items-center gap-3 border-b pb-4">
              <span className="text-3xl bg-orange-50 p-2 rounded-xl">🍕👨‍🍳</span>
              <div>
                <span className="text-[10px] text-orange-600 font-extrabold uppercase tracking-widest block">
                  {isRtl ? 'وصفة بسيطة إنجليزية وعربية' : 'FAMILY EVENING COOKING CHALLENGE'}
                </span>
                <h3 className="text-lg font-black text-[#002147]">
                  {isRtl ? 'وصفة "بيتزا الوجه السعيد" ترفيهية للأطفال' : '“Happy Face Pizza” Kid-Friendly Recipe'}
                </h3>
              </div>
            </div>

            {/* Steps interactive list */}
            <div className="space-y-4">
              {pizzaSteps.map((step) => {
                const isChecked = !!cookingStepsChecked[step.id];

                return (
                  <div
                    key={step.id}
                    onClick={() => handleToggleStep(step.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300 text-slate-800'
                        : 'bg-[#FCFAF0] border-slate-100 hover:bg-amber-50/20'
                    }`}
                  >
                    {/* Checkbox circle indicator */}
                    <button
                      className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {isChecked && <Check size={14} className="stroke-[3px]" />}
                    </button>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-sans font-black text-sm md:text-base text-slate-800 leading-tight">
                          Step {step.id}. {step.en}
                        </h4>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Avoid triggering check
                            speakEnglishText(step.en);
                          }}
                          className={`p-1 bg-white border rounded-lg text-slate-500 hover:bg-slate-50 shrink-0 cursor-pointer`}
                        >
                          <Volume2 size={12} />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 font-bold block pt-1 border-t border-dashed border-stone-200">
                        {step.ar}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions for claiming Cooking XP */}
            {allCookingFinished ? (
              <div className="bg-emerald-50 border border-emerald-150 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xl block mb-1">👑</span>
                  <h4 className="font-black text-[#002147] text-sm">{isRtl ? 'طبختم معاً بسعادة يا لها من ليلة رائعة!' : 'Happy Chef Team Completed!'}</h4>
                  <p className="text-xs text-emerald-700 font-bold">
                    {isRtl ? 'اضغط لحصد عوائد وبونص الطبيخ العجيب!' : 'Smashed all checkable cooking steps.'}
                  </p>
                </div>

                {!cookingXPClaimed ? (
                  <button
                    onClick={claimCookingXP}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer shrink-0"
                  >
                    {isRtl ? 'حصد +20 نقطة طاهي 🏆' : 'Claim +20 Chef XP 🏆'}
                  </button>
                ) : (
                  <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 font-black text-xs rounded-xl flex items-center gap-1 border border-emerald-250">
                    <CheckCircle2 size={14} />
                    <span>{isRtl ? 'تم إضافة النقاط!' : 'XP Gained Successfully'}</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 p-4 border border-dashed rounded-xl text-center text-xs text-slate-400 font-bold">
                {isRtl 
                  ? `أكمل جميع الخطوات الـ 5 مع أهلك لتنال جائزة البيتزا الممتعة (${pizzaSteps.filter(s=>cookingStepsChecked[s.id]).length}/5)` 
                  : `Please check all 5 cooking tasks with parents/siblings (${pizzaSteps.filter(s=>cookingStepsChecked[s.id]).length}/5)`}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
