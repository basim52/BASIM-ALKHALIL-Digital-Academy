import React, { useState, useEffect } from 'react';
import { 
  Volume2, Sparkles, RefreshCw, ClipboardList, Target, Play 
} from 'lucide-react';
import { GoldCard, PrimaryButton, GhostButton, AnswerOption, ProgressPill } from './ui/academy';

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
  const t = (ar: string, en: string) => (isRtl ? ar : en);

  return (
    <div className="space-y-6">
      {/* Subject Header */}
      <GoldCard className="p-5 sm:p-6 text-right">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <ProgressPill>
              <ClipboardList size={11} />
              <span>{t('قاموس المفردات الحية ومجمع الفلاش كاردز المعتمد', 'Multilingual Vocab Labs')}</span>
            </ProgressPill>
            <h3 className="text-lg sm:text-xl font-black text-[#002147] tracking-tight leading-snug">
              {t('مستكشف الكلمات الاحترافي ومولد الفلاش كاردز 📖', 'Active Vocab Builder & Flipping Flashcards 📖')}
            </h3>
            <p className="text-xs sm:text-sm text-[#002147]/75 leading-relaxed font-semibold max-w-xl">
              {t(
                'طور مرونتك اللغوية بالتفاعل مع الفلاش كاردز الاحترافية بالذكاء الاصطناعي. أنشئ مجموعات مفردات فريدة لأي موضوع مخصص يخطر ببالك لتوسيع معجمك في فوانيس العلوم.',
                'Frictionless mental recall engine. Generate custom contextual vocab decks on demand, toggle phonetic audio streams, and complete tile matching assessments.'
              )}
            </p>
          </div>

          <div className="w-full md:w-auto bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40 min-w-[220px]">
            <span className="text-[10px] text-[#002147] block font-black uppercase tracking-wider mb-2">
              {t('✨ أنشئ قائمة مفردات مخصصة بالذكاء الاصطناعي:', '✨ AI Custom Deck Builder:')}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={t('مثال: مصطلحات طبية، الطيران...', 'e.g. Astro Physics, Dining...')}
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="flex-1 bg-white text-[#002147] rounded-xl px-3 py-2 text-xs font-bold border border-[#C49E3A]/40 focus:outline-none focus:ring-2 focus:ring-[#C49E3A] placeholder-[#002147]/40 text-right"
              />
              <PrimaryButton
                disabled={isGeneratingDeck}
                onClick={handleGenerateCustomDeck}
                className="!px-3 !py-2 !min-h-[36px]"
              >
                {isGeneratingDeck ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Sparkles size={13} />
                )}
              </PrimaryButton>
            </div>
            {deckErrorMessage && (
              <p className="text-[10px] font-bold text-[#002147]/75 mt-1.5">{deckErrorMessage}</p>
            )}
          </div>
        </div>
      </GoldCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Flashcards Engine (cols 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2 px-1">
            <div className="flex gap-1.5">
              {(['A1', 'B2'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleLevelChange(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] ${
                    selectedLevel === lvl
                      ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
                      : 'bg-white text-[#002147] border-[#C49E3A] hover:bg-[#fdfaf3] cursor-pointer'
                  }`}
                >
                  {lvl} {t('مستوى', 'Level')}
                </button>
              ))}
            </div>
            <h4 className="text-xs font-black text-[#002147] tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-[#002147] rounded"></span>
              {t('بطاقات الذاكرة التفاعلية (انقر للقلب):', 'Interactive Recall Cards (Flip on tap):')}
            </h4>
          </div>

          {activeCard ? (
            <div className="space-y-4">
              {/* Word Card in white GoldCard */}
              <div
                onClick={handleCardClick}
                className="cursor-pointer transition-transform active:scale-95"
              >
                {!isFlipped ? (
                  <GoldCard className="min-h-[260px] p-6 flex flex-col justify-between text-right">
                    <div className="flex items-center justify-between border-b border-[#C49E3A]/20 pb-3">
                      <ProgressPill>{activeCard.partOfSpeech}</ProgressPill>
                      <GhostButton
                        onClick={(e) => { e.stopPropagation(); speakText(activeCard.word, targetLang); }}
                        title="Vocalize word"
                        className="!px-2.5 !py-1.5 !min-h-[34px]"
                      >
                        <Volume2 size={14} />
                      </GhostButton>
                    </div>

                    <div className="text-center py-6 space-y-2">
                      <h1 className="text-3xl lg:text-4xl font-black text-[#002147] font-sans tracking-tight leading-none">
                        {activeCard.word}
                      </h1>
                      <p className="text-xs text-[#002147]/65 font-bold font-mono">
                        {activeCard.pronunciation}
                      </p>
                      <p className="text-lg font-black text-[#C49E3A] pt-1">
                        {activeCard.meaningAr}
                      </p>
                    </div>

                    <div className="text-center text-[11px] text-[#002147] font-black bg-[#fdfaf3] py-2 px-3 rounded-xl border border-[#C49E3A]/40">
                      {t('👇 انقر فوق البطاقة لإظهار المعنى والتصريف العربي المانع', '👇 Click/tap tile to reveal semantic translation')}
                    </div>
                  </GoldCard>
                ) : (
                  <GoldCard className="min-h-[260px] p-6 flex flex-col justify-between text-right">
                    <div className="flex items-center justify-between border-b border-[#C49E3A]/20 pb-3">
                      <ProgressPill>
                        {t('المعنى المعتمد', 'Literal meaning')}
                      </ProgressPill>
                      <GhostButton
                        onClick={(e) => { e.stopPropagation(); speakText(activeCard.example, targetLang); }}
                        title="Vocalize example"
                        className="!px-2.5 !py-1.5 !min-h-[34px]"
                      >
                        <Volume2 size={14} />
                      </GhostButton>
                    </div>

                    <div className="space-y-3 py-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xl font-black text-[#002147] font-sans">
                          {activeCard.word}
                        </span>
                        <h2 className="text-2xl font-black text-[#C49E3A]">
                          {activeCard.meaningAr}
                        </h2>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-[#002147]/70 font-bold block">{t('مثال حي وعملي:', 'Real-world usage context:')}</span>
                        <p className="text-xs text-[#002147] font-sans font-bold leading-relaxed" dir="ltr">
                          "{activeCard.example}"
                        </p>
                        <p className="text-xs text-[#C49E3A] font-black">
                          ({activeCard.exampleAr})
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3 rounded-xl space-y-0.5 text-right">
                      <span className="text-[10px] text-[#C49E3A] font-black block">💡 {t('سياق القواعد والاستخدام:', 'Mentor tip:')}</span>
                      <p className="text-xs text-[#002147] leading-normal font-bold">
                        {activeCard.conceptGrammar}
                      </p>
                    </div>
                  </GoldCard>
                )}
              </div>

              {/* Slider steps indicators */}
              <div className="flex items-center justify-between gap-2 px-1">
                <GhostButton
                  disabled={activeIndex === 0}
                  onClick={() => { setActiveIndex(prev => prev - 1); setIsFlipped(false); onPlayChime('message'); }}
                >
                  {t('← السابق', '← Previous')}
                </GhostButton>
                <ProgressPill>
                  {activeIndex + 1} / {cards.length}
                </ProgressPill>
                <GhostButton
                  disabled={activeIndex === cards.length - 1}
                  onClick={() => { setActiveIndex(prev => prev + 1); setIsFlipped(false); onPlayChime('message'); }}
                >
                  {t('التالي →', 'Next →')}
                </GhostButton>
              </div>
            </div>
          ) : (
            <GoldCard className="py-12 text-center text-[#002147]/70 text-xs font-black">
              {t('لا توجد بطاقات كلمات نشطة.', 'No cards available.')}
            </GoldCard>
          )}
        </div>

        {/* Right Column: Timed Vocabulary Memory Matching Game (cols 5) */}
        <div className="lg:col-span-5 space-y-4">
          <GoldCard className="p-5 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-[#C49E3A]/20 pb-3">
              <ProgressPill>
                <Target size={11} />
                <span>Score: {gameScore} pts</span>
              </ProgressPill>
              <h5 className="text-xs font-black text-[#002147] flex items-center gap-1">
                <span>🎮 {t('لعبة مقارنة واختبار الذاكرة السريعة', 'Linguistic Word Matching Matrix')}</span>
              </h5>
            </div>

            {gameWords.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs text-[#002147]/75 font-bold leading-normal">
                  {t(
                    'طابق المصطلح الأجنبي الصحيح ببطاقة ترجمته العربية. انقر على الكلمة ثم الترجمة الصحيحة لكسب النقاط!',
                    'Tap a foreign word tile, then select its precise matching Arabic translation to sweep the matrix.'
                  )}
                </p>

                <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                  {gameWords.map((tile) => {
                    const isWordSelected = selectedWord === tile.id;
                    const isArabSelected = selectedArabic === tile.id;
                    const isSelected = isWordSelected || isArabSelected;

                    return (
                      <AnswerOption
                        key={tile.id}
                        label={tile.text}
                        state={tile.matched ? 'correct' : 'normal'}
                        selected={isSelected}
                        disabled={tile.matched}
                        onClick={() => handleTileClick(tile.id, tile.type, tile.originalId)}
                        className="!px-3 !py-2.5 !text-xs"
                      />
                    );
                  })}
                </div>

                {gameWords.every(w => w.matched) ? (
                  <div className="bg-[#fdfaf3] text-[#002147] rounded-2xl p-4 text-center space-y-2 border border-[#C49E3A]">
                    <span className="text-2xl block">🏆</span>
                    <h5 className="text-sm font-black text-[#002147]">{t('مبروك! اجتزت التحدي بنجاح فائق!', 'Linguistic Matrix Cleared!')}</h5>
                    <p className="text-xs text-[#002147]/80 font-bold">
                      {t(`حصلت على ${gameScore} درجة. استمر في توليد مجموعات كلمات جديدة بالذكاء الاصطناعي!`, `You accumulated ${gameScore} valuable points!`)}
                    </p>
                    <PrimaryButton
                      onClick={startMatchGame}
                      className="mx-auto"
                    >
                      {t('إعادة اللعب 🔁', 'Play Again 🔁')}
                    </PrimaryButton>
                  </div>
                ) : (
                  <div className="flex justify-between items-center pt-2">
                    <GhostButton
                      onClick={() => { setGameScore(0); startMatchGame(); }}
                      className="!px-3 !py-1.5 !min-h-[34px] !text-xs"
                    >
                      {t('إعادة خلط وترتيب الكلمات', 'Reshuffle Board')}
                    </GhostButton>
                    <ProgressPill>
                      {gameWords.filter(e => !e.matched).length / 2} {t('مستحقات معلقة', 'pairs left')}
                    </ProgressPill>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <p className="text-xs text-[#002147]/75 max-w-xs mx-auto leading-relaxed font-medium">
                  {t(
                    'اختبر مدى سرعة استيعابك للمفردات الحالية عبر لعبة الخلط والربط الثنائي لتنشيط الذاكرة قصيرة المدى.',
                    'Match vocabulary items dynamically and race against structural targets.'
                  )}
                </p>
                <PrimaryButton
                  onClick={startMatchGame}
                  className="mx-auto"
                >
                  <Play size={13} className="fill-current" />
                  <span>{t('ابدأ لعبة المطابقة الفورية', 'Start Matrix Challenge')}</span>
                </PrimaryButton>
              </div>
            )}
          </GoldCard>
        </div>
      </div>
    </div>
  );
}

