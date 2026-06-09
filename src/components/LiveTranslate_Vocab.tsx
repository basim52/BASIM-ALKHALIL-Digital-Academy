import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, BookOpen, Sparkles, RefreshCw, Check, ArrowRight, ClipboardList, HelpCircle, Flame, Target, Play 
} from 'lucide-react';

interface LiveTranslateVocabProps {
  isRtl: boolean;
  targetLang: string;
  onPlayChime: (type: 'open' | 'message' | 'close' | 'think' | 'success') => void;
  speakText: (text: string, langCode: string) => void;
}

export interface VocabCard {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  meaningAr: string;
  example: string;
  exampleAr: string;
  conceptGrammar: string;
}

const LEVEL_PRESETS: Record<string, Record<string, VocabCard[]>> = {
  en: {
    A1: [
      { word: "Acknowledge", pronunciation: "/əkˈnɒl.ɪdʒ/", partOfSpeech: "Verb", meaningAr: "يعترف بـ / يقر بالاستلام", example: "Please acknowledge receipt of this curriculum syllabus.", exampleAr: "يرجى تأكيد استلام خطة هذا المنهج التعليمي.", conceptGrammar: "يستخدم بكثرة في المراسلات الأكاديمية والمهنية الرسمية." },
      { word: "Boundary", pronunciation: "/ˈbaʊn.dər.i/", partOfSpeech: "Noun", meaningAr: "حدود فاصلة", example: "Healthy professional boundaries build stable partnerships.", exampleAr: "الحدود المهنية الصحية تبني شراكات مستقرة.", conceptGrammar: "اسم يعبر عن الحدود الجغرافية أو النفسية والاجتماعية." },
      { word: "Pristine", pronunciation: "/ˈprɪs.tiːn/", partOfSpeech: "Adjective", meaningAr: "نقي / بكر / في حالته الأصلية", example: "The island boasts pristine sandy beaches and crystal waters.", exampleAr: "تفتخر الجزيرة بشواطئ رملية نقية بكر ومياه بلورية.", conceptGrammar: "صفة مديح بليغة تعوض كلمة 'very clean' الشائعة." }
    ],
    B2: [
      { word: "Ambiguity", pronunciation: "/ˌæm.bɪˈɡjuː.ə.ti/", partOfSpeech: "Noun", meaningAr: "غموض / التباس", example: "We must avoid ambiguity in public legal records.", exampleAr: "يجب علينا تجنب الغموض في السجلات القانونية العامة.", conceptGrammar: "مصطلح مشتق من اللاتينية يعبر عن ازدواجية المعنى المحتمل للإبهام." },
      { word: "Resilience", pronunciation: "/rɪˈzɪl.jəns/", partOfSpeech: "Noun", meaningAr: "المرونة النفسية والقدرة على التكيف", example: "Learning global languages builds immense cognitive resilience.", exampleAr: "تعلم اللغات العالمية يبني مرونة معرفية هائلة.", conceptGrammar: "كلمة عميقة تعكس المقاومة العالية وتجاوز العقبات النفسية بنجاج." }
    ]
  },
  es: {
    A1: [
      { word: "Bienvenida", pronunciation: "/bjen.βeˈni.ða/", partOfSpeech: "Noun", meaningAr: "ترحيب / أهلاً بك", example: "Le damos una cálida bienvenida a la academia de Basim.", exampleAr: "نرحب بك ترحيباً حاراً في أكاديمية باسم.", conceptGrammar: "تطابق جمعها وتأنيثها مع الفاعل الذي توجه إليه التحية." },
      { word: "Esfuerzo", pronunciation: "/esˈfweɾ.θo/", partOfSpeech: "Noun", meaningAr: "جهد / سعي مثابر", example: "Todo gran esfuerzo rinde frutos valiosos.", exampleAr: "كل سعي مثابر يؤتي ثماراً قيمة.", conceptGrammar: "شعار تعليمي ممتاز لتأكيد الكفاح المستمر في تحصيل العلوم." }
    ]
  }
};

export function LiveTranslate_Vocab({ isRtl, targetLang, onPlayChime, speakText }: LiveTranslateVocabProps) {
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'B2'>('A1');
  const [cards, setCards] = useState<VocabCard[]>(LEVEL_PRESETS[targetLang]?.[selectedLevel] || LEVEL_PRESETS['en']['A1']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Custom AI Deck request states
  const [customTopic, setCustomTopic] = useState('');
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);
  const [deckErrorMessage, setDeckErrorMessage] = useState<string | null>(null);

  // Match game states
  const [gameScore, setGameScore] = useState(0);
  const [gameWords, setGameWords] = useState<Array<{ id: number; text: string; matched: boolean; type: 'foreign' | 'arabic'; originalId: number }>>([]);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedArabic, setSelectedArabic] = useState<number | null>(null);

  // Load level presets
  const handleLevelChange = (lvl: 'A1' | 'B2') => {
    setSelectedLevel(lvl);
    setActiveIndex(0);
    setIsFlipped(false);
    const presets = LEVEL_PRESETS[targetLang]?.[lvl] || LEVEL_PRESETS['en'][lvl];
    setCards(presets);
    onPlayChime('open');
  };

  // Flip card
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onPlayChime('message');
  };

  // Generate Custom Deck via backend API
  const handleGenerateCustomDeck = async () => {
    if (!customTopic.trim()) return;
    setIsGeneratingDeck(true);
    setDeckErrorMessage(null);
    onPlayChime('think');

    try {
      const response = await fetch('/api/live-translate/vocab/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: customTopic,
          targetLang
        })
      });

      if (!response.ok) {
        throw new Error('Vocab generation timed out or failed');
      }

      const data = await response.json();
      if (data.words && data.words.length > 0) {
        setCards(data.words);
        setActiveIndex(0);
        setIsFlipped(false);
        onPlayChime('success');
      } else {
        throw new Error('Empty words deck');
      }
    } catch (err) {
      setDeckErrorMessage(isRtl ? 'فشل اتصال الذكاء الاصطناعي بتوليد الكلمات. تم استخدام الحزمة الاحتياطية بنجاح.' : 'Could not generate custom vocab deck.');
      onPlayChime('close');
    } finally {
      setIsGeneratingDeck(false);
    }
  };

  // Initialize Match game using current cards
  const startMatchGame = () => {
    onPlayChime('open');
    if (!cards || cards.length === 0) return;

    const foreignList = cards.map((c, i) => ({
      id: i * 2,
      text: c.word,
      matched: false,
      type: 'foreign' as const,
      originalId: i
    }));

    const arabicList = cards.map((c, i) => ({
      id: i * 2 + 1,
      text: c.meaningAr,
      matched: false,
      type: 'arabic' as const,
      originalId: i
    }));

    // Shuffle lists
    const shuffled = [...foreignList, ...arabicList].sort(() => Math.random() - 0.5);
    setGameWords(shuffled);
    setSelectedWord(null);
    setSelectedArabic(null);
  };

  const handleTileClick = (tileId: number, type: 'foreign' | 'arabic', originalId: number) => {
    if (type === 'foreign') {
      if (selectedWord === tileId) {
        setSelectedWord(null);
      } else {
        setSelectedWord(tileId);
        // Instant play audio for foreign word
        const clickedWord = gameWords.find(w => w.id === tileId)?.text;
        if (clickedWord) speakText(clickedWord, targetLang);
      }
    } else {
      if (selectedArabic === tileId) {
        setSelectedArabic(null);
      } else {
        setSelectedArabic(tileId);
      }
    }
  };

  // Check matching on hook
  useEffect(() => {
    if (selectedWord !== null && selectedArabic !== null) {
      const wTile = gameWords.find(w => w.id === selectedWord);
      const aTile = gameWords.find(w => w.id === selectedArabic);

      if (wTile && aTile && wTile.originalId === aTile.originalId) {
        // MATCH SUCCESS
        setGameWords(prev => prev.map(tile => {
          if (tile.id === selectedWord || tile.id === selectedArabic) {
            return { ...tile, matched: true };
          }
          return tile;
        }));
        setGameScore(prev => prev + 20);
        onPlayChime('success');
      } else {
        // MATCH FAILED
        onPlayChime('close');
      }

      // Reset selection
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedArabic(null);
      }, 500);
    }
  }, [selectedWord, selectedArabic]);

  const activeCard = cards[activeIndex] || cards[0];

  return (
    <div className="space-y-8">
      {/* Subject Header */}
      <div className="bg-gradient-to-tr from-rose-950/90 via-[#002147] to-[#002147] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-white/10 text-right">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#C49E3A] opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black text-amber-300">
              <ClipboardList size={11} />
              <span>{isRtl ? 'قاموس المفردات الحية ومجمع الفلاش كاردز المعتمد' : 'Multilingual Vocab Labs'}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              {isRtl ? 'مستكشف الكلمات الاحترافي ومولد الفلاش كاردز 📖' : 'Active Vocab Builder & Flipping Flashcards 📖'}
            </h3>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-semibold max-w-xl">
              {isRtl 
                ? 'طور مرونتك اللغوية بالتفاعل مع الفلاش كاردز الاحترافية بالذكاء الاصطناعي. أنشئ مجموعات مفردات فريدة لأي موضوع مخصص يخطر ببالك لتوسيع معجمك في فوانيس العلوم.' 
                : 'Frictionless mental recall engine. Generate custom contextual vocab decks on demand, toggle phonetic audio streams, and complete tile matching assessments.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[200px]">
            <span className="text-[10px] text-amber-300 block font-black uppercase tracking-wider mb-2">
              {isRtl ? '✨ أنشئ قائمة مفردات مخصصة بالذكاء الاصطناعي:' : '✨ AI Custom Deck Builder:'}
            </span>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={isRtl ? 'مثال: مصطلحات طبية، الطيران...' : 'e.g. Astro Physics, Dining...'}
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full bg-black/20 text-white rounded-xl px-3 py-2 text-xs font-bold border border-white/10 focus:outline-none focus:border-amber-400 placeholder-white/30 text-right"
              />
              <button
                type="button"
                disabled={isGeneratingDeck}
                onClick={handleGenerateCustomDeck}
                className="absolute left-1 p-1.5 bg-amber-400 text-[#002147] rounded-lg hover:bg-amber-500 transition cursor-pointer disabled:opacity-50"
              >
                {isGeneratingDeck ? (
                  <RefreshCw size={11} className="animate-spin" />
                ) : (
                  <Sparkles size={11} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Flashcards Engine (cols 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex gap-1.5">
              {(['A1', 'B2'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleLevelChange(lvl)}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition ${
                    selectedLevel === lvl 
                      ? 'bg-[#002147] text-white border-[#002147]' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  {lvl} {isRtl ? 'مستوى' : 'Level'}
                </button>
              ))}
            </div>
            <h4 className="text-xs font-black text-[#002147] tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-[#002147] rounded"></span>
              {isRtl ? 'بطاقات الذاكرة التفاعلية (انقر للقلب):' : 'Interactive Recall Cards (Flip on tap):'}
            </h4>
          </div>

          {activeCard ? (
            <div className="space-y-6">
              {/* Premium 3D Flip Card Sandbox */}
              <div 
                onClick={handleCardClick}
                className="w-full h-[280px] perspective-1000 cursor-pointer group"
              >
                <div className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}>
                  {/* FRONT SIDE (Foreign word) */}
                  <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 shadow-lg rounded-3xl p-6 flex flex-col justify-between text-right">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-[9px] font-black uppercase font-mono tracking-wider">
                        {activeCard.partOfSpeech}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); speakText(activeCard.word, targetLang); }}
                        className="p-1.5 bg-slate-100 hover:bg-[#002147]/10 rounded-xl text-[#002147] transition cursor-pointer"
                        title="Vocalize word"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>

                    <div className="text-center py-6 space-y-2">
                      <h1 className="text-3xl lg:text-4xl font-extrabold text-[#002147] font-sans tracking-tight leading-none">
                        {activeCard.word}
                      </h1>
                      <p className="text-xs text-slate-400 font-bold font-mono">
                        {activeCard.pronunciation}
                      </p>
                    </div>

                    <div className="text-center text-[10px] text-slate-400 font-extrabold bg-slate-50 py-2 rounded-2xl border border-slate-150 group-hover:bg-slate-100/70 transition-all">
                      {isRtl ? '👇 انقر فوق البطاقة لإظهار المعنى والتصريف العربي المانع' : '👇 Click/tap tile to reveal semantic translation'}
                    </div>
                  </div>

                  {/* BACK SIDE (Arabic Meaning & Tips) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#002147] text-white shadow-lg rounded-3xl p-6 flex flex-col justify-between text-right">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded-full text-[9px] font-black uppercase tracking-wider">
                        {isRtl ? 'المعنى المعتمد' : 'Literal meaning'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); speakText(activeCard.example, targetLang); }}
                        className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition cursor-pointer"
                        title="Vocalize example"
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>

                    <div className="space-y-3 py-2">
                      <h2 className="text-2xl font-black text-amber-300">
                        {activeCard.meaningAr}
                      </h2>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-300 font-bold block">{isRtl ? 'مثال حي وعملي:' : 'Real-world usage context:'}</span>
                        <p className="text-xs text-slate-100 font-sans font-semibold leading-relaxed">
                          "{activeCard.example}"
                        </p>
                        <p className="text-[11px] text-amber-300 font-bold">
                          ({activeCard.exampleAr})
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/10 border border-white/5 p-3 rounded-2xl space-y-0.5 text-right">
                      <span className="text-[9px] text-amber-300 font-black block">💡 {isRtl ? 'سياق القواعد والاستخدام:' : 'Mentor tip:'}</span>
                      <p className="text-[10.5px] text-slate-200 leading-normal font-bold">
                        {activeCard.conceptGrammar}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider steps indicators */}
              <div className="flex items-center justify-between px-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => { setActiveIndex(prev => prev - 1); setIsFlipped(false); onPlayChime('message'); }}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-black border border-slate-200/80 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
                >
                  {isRtl ? '← السابق' : '← Previous'}
                </button>
                <span className="text-xs text-slate-500 font-black">
                  {activeIndex + 1} / {cards.length}
                </span>
                <button
                  type="button"
                  disabled={activeIndex === cards.length - 1}
                  onClick={() => { setActiveIndex(prev => prev + 1); setIsFlipped(false); onPlayChime('message'); }}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-black border border-slate-200/80 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
                >
                  {isRtl ? 'التالي →' : 'Next →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-xs font-bold border border-dashed border-slate-200 rounded-3xl">
              {isRtl ? 'لا توجد بطاقات كلمات نشطة.' : 'No cards available.'}
            </div>
          )}
        </div>

        {/* Right Column: Timed Vocabulary Memory Matching Game (cols 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100 rounded-full font-black">
                <Target size={11} />
                <span>Score: {gameScore} pts</span>
              </span>
              <h5 className="text-xs font-black text-[#002147] flex items-center gap-1">
                <span>🎮 {isRtl ? 'لعبة مقارنة واختبار الذاكرة السريعة' : 'Linguistic Word Matching Matrix'}</span>
              </h5>
            </div>

            {gameWords.length > 0 ? (
              <div className="space-y-4">
                <p className="text-[10px] text-slate-400 font-bold leading-normal">
                  {isRtl 
                    ? 'طابق المصطلح الأجنبي الصحيح ببطاقة ترجمته العربية. انقر على الكلمة ثم الترجمة الصحيحة لكسب النقاط!' 
                    : 'Tap a foreign word tile, then select its precise matching Arabic translation to sweep the matrix.'}
                </p>

                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {gameWords.map((tile) => {
                    if (tile.matched) {
                      return (
                        <div 
                          key={tile.id} 
                          className="py-2.5 px-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 rounded-xl text-center text-xs font-bold line-through flex items-center justify-center gap-1"
                        >
                          <Check size={11} className="text-emerald-600 font-black" />
                          <span className="truncate max-w-[100px]">{tile.text}</span>
                        </div>
                      );
                    }

                    const isWordSelected = selectedWord === tile.id;
                    const isArabSelected = selectedArabic === tile.id;
                    const isSelected = isWordSelected || isArabSelected;

                    const tileStyle = isSelected
                      ? 'bg-amber-accent/20 border-[#C49E3A] text-slate-950 font-black ring-1 ring-[#C49E3A]/40'
                      : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-[#002147] font-semibold';

                    return (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => handleTileClick(tile.id, tile.type, tile.originalId)}
                        className={`py-2 px-1.5 rounded-xl border text-center text-[11px] transition-all duration-200 cursor-pointer ${tileStyle}`}
                      >
                        {tile.text}
                      </button>
                    );
                  })}
                </div>

                {gameWords.every(w => w.matched) ? (
                  <div className="bg-emerald-50 text-emerald-800 rounded-2xl p-4 text-center space-y-2 border border-emerald-100 animate-pulse">
                    <span className="text-2xl">🏆</span>
                    <h5 className="text-[14px] font-black">{isRtl ? 'مبروك! اجتزت التحدي بنجاح فائق!' : 'Linguistic Matrix Cleared!'}</h5>
                    <p className="text-[10px] text-emerald-600 font-bold">
                      {isRtl ? `حصلت على ${gameScore} درجة. استمر في توليد مجموعات كلمات جديدة بالذكاء الاصطناعي!` : `You accumulated ${gameScore} valuable points!`}
                    </p>
                    <button
                      type="button"
                      onClick={startMatchGame}
                      className="px-4 py-1.5 bg-[#002147] hover:bg-[#0d3463] text-white text-[10px] font-black rounded-lg transition"
                    >
                      {isRtl ? 'إعادة اللعب 🔁' : 'Play Again 🔁'}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => { setGameScore(0); startMatchGame(); }}
                      className="text-[10px] text-slate-500 hover:text-[#002147] font-bold underline"
                    >
                      {isRtl ? 'إعادة خلط وترتيب الكلمات' : 'Reshuffle Board'}
                    </button>
                    <span className="text-[9.5px] font-mono text-slate-400">
                      {gameWords.filter(e => !e.matched).length / 2} {isRtl ? 'مستحقات معلقة' : 'pairs left'}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                  {isRtl 
                    ? 'اختبر مدى سرعة استيعابك للمفردات الحالية عبر لعبة الخلط والربط الثنائي لتنشيط الذاكرة قصيرة المدى.' 
                    : 'Match vocabulary items dynamically and race against structural targets.'}
                </p>
                <button
                  type="button"
                  onClick={startMatchGame}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black rounded-xl text-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 mx-auto shadow-md shadow-emerald-700/10"
                >
                  <Play size={12} className="fill-white" />
                  <span>{isRtl ? 'ابدأ لعبة المطابقة الفورية' : 'Start Matrix Challenge'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
