import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Volume2,
  RotateCcw,
  Award,
  Heart,
  Lightbulb,
  Info,
  Star,
  X,
} from 'lucide-react';
import { VISUAL_DICTIONARY, DictionaryItem } from '../data/visualDictionary';
import { UserProfile } from '../types';
import { managedSpeak } from '../lib/audio';
import { useT } from '../lib/explainLang';
import {
  SectionShell,
  GoldCard,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
} from './ui/academy';

interface VisualDictionaryProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

export const VisualDictionary: React.FC<VisualDictionaryProps> = ({
  lang,
  userProfile: _userProfile,
  onBack: _onBack,
  onXPAdded,
}) => {
  const t = useT();
  const isRtl = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('house');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<DictionaryItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  // Custom user created dictionary items
  const [customDictionaryItems, setCustomDictionaryItems] = useState<DictionaryItem[]>(() => {
    try {
      const saved = localStorage.getItem('custom_dictionary_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorite/challenging words to review (Review list)
  const [favoriteWords, setFavoriteWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorite_dictionary_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic state for adding custom word
  const [newWord, setNewWord] = useState('');
  const [newMeaningAr, setNewMeaningAr] = useState('');
  const [newEmoji, setNewEmoji] = useState('🍎');
  const [newSentence, setNewSentence] = useState('');
  const [newSentenceAr, setNewSentenceAr] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [dictionaryTab, setDictionaryTab] = useState<'review' | 'add'>('review');
  const [addMsg, setAddMsg] = useState('');

  // Game state
  const [interactionMode, setInteractionMode] = useState<'browse' | 'quiz'>('browse');
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{
      correctAnswer: DictionaryItem;
      allOptions: string[];
      userAnswer: string | null;
      isCorrect: boolean | null;
    }>
  >([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filter dictionary items by category & search
  const categoryData =
    VISUAL_DICTIONARY.find((cat) => cat.id === activeCategory) || VISUAL_DICTIONARY[0];
  const activeCustoms = customDictionaryItems.filter(
    (item: any) => item.category === activeCategory
  );
  const combinedItems = [...categoryData.items, ...activeCustoms];

  const pageItems = combinedItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    return item.word.toLowerCase().includes(q) || item.meaning_ar.includes(q);
  });

  // Browser Sound Speech Synthesizer
  const speakWordOrSentence = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.82; // Kid-friendly pace

      const voices = window.speechSynthesis.getVoices();
      const EnglishVoice = voices.find((v) => v.lang.startsWith('en'));
      if (EnglishVoice) utterance.voice = EnglishVoice;

      utterance.onstart = () => setIsSpeaking(id);
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);

      managedSpeak(utterance);
    }
  };

  // Setup / Reset the Vocabulary Quiz
  const startCategoryQuiz = () => {
    const currentItems = [...combinedItems];
    if (currentItems.length < 3) {
      setAddMsg(
        t(
          'الرجاء إدخال المزيد من الكلمات في هذا القسم لبدء الاختبار التفاعلي!',
          'Please add more words to this section to start the interactive test!'
        )
      );
      return;
    }

    // Create 5 random questions
    const selectedQuestions = [];
    const shuffled = [...currentItems].sort(() => 0.5 - Math.random());
    const limit = Math.min(5, shuffled.length);

    for (let i = 0; i < limit; i++) {
      const correct = shuffled[i];
      const wrongPool = [
        ...VISUAL_DICTIONARY.flatMap((c) => c.items),
        ...customDictionaryItems,
      ].filter((item) => item.word !== correct.word);
      const shuffledWrong = wrongPool.sort(() => 0.5 - Math.random()).slice(0, 2);

      const options = [correct.meaning_ar, ...shuffledWrong.map((w) => w.meaning_ar)].sort(
        () => 0.5 - Math.random()
      );

      selectedQuestions.push({
        correctAnswer: correct,
        allOptions: options,
        userAnswer: null,
        isCorrect: null,
      });
    }

    setQuizQuestions(selectedQuestions);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setInteractionMode('quiz');
  };

  const handleSelectQuizAnswer = (opt: string) => {
    if (quizQuestions[quizIndex].userAnswer !== null) return;

    const updated = [...quizQuestions];
    const curQ = updated[quizIndex];
    curQ.userAnswer = opt;
    curQ.isCorrect = opt === curQ.correctAnswer.meaning_ar;

    if (curQ.isCorrect) {
      setQuizScore((prev) => prev + 1);
    }

    setQuizQuestions(updated);
    speakWordOrSentence(curQ.correctAnswer.word, `quiz_${quizIndex}`);
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      const wonXP = quizScore * 10;
      if (wonXP > 0 && onXPAdded) {
        onXPAdded(wonXP);
      }
    }
  };

  // Pre-select first item on category change
  useEffect(() => {
    const customs = customDictionaryItems.filter(
      (item: any) => item.category === activeCategory
    );
    const combined = [...categoryData.items, ...customs];
    if (combined.length > 0) {
      setSelectedItem(combined[0]);
    } else {
      setSelectedItem(null);
    }
  }, [activeCategory, customDictionaryItems.length]);

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-5">
        {/* Top Bar: Categories (gold-border pills, navy when active) + Mode switch */}
        <GoldCard className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {VISUAL_DICTIONARY.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setInteractionMode('browse');
                    }}
                    className={`px-3.5 py-2 rounded-full border font-black text-xs shrink-0 transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] ${
                      isActive
                        ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A] shadow-sm'
                        : 'bg-white text-[#002147] border-[#C49E3A]/40 hover:bg-[#fdfaf3]'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{isRtl ? cat.name_ar : cat.name_en}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
              <ProgressPill>
                📖 {pageItems.length} {t('مفردة', 'words')}
              </ProgressPill>
              {interactionMode === 'browse' ? (
                <PrimaryButton
                  onClick={startCategoryQuiz}
                  className="!px-3.5 !py-2 !text-xs shrink-0"
                >
                  <Lightbulb size={14} />
                  <span>{t('ابدأ غاز الكلمات 🎯', 'Spelling Game 🎯')}</span>
                </PrimaryButton>
              ) : (
                <GhostButton
                  onClick={() => setInteractionMode('browse')}
                  className="!px-3.5 !py-2 !text-xs shrink-0"
                >
                  <span>{t('تصفح الكلمات 📖', 'Browse Words 📖')}</span>
                </GhostButton>
              )}
            </div>
          </div>
        </GoldCard>

        {interactionMode === 'browse' ? (
          <div className="space-y-6">
            {/* Search input: white with gold border */}
            <div className="relative">
              <Search
                size={16}
                className={`absolute ${
                  isRtl ? 'right-4' : 'left-4'
                } top-1/2 -translate-y-1/2 text-[#C49E3A]`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'ابحث عن كلمة بالإنجليزية أو العربية...',
                  'Search animal or room items...'
                )}
                className={`w-full bg-white rounded-2xl py-3 ${
                  isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'
                } text-xs sm:text-sm font-black text-[#002147] border border-[#C49E3A]/40 focus:border-[#C49E3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] shadow-sm`}
              />
            </div>

            {/* Word Cards Grid: white GoldCards with image on top, English word navy bold, Arabic meaning gold below, small gold speaker button */}
            {pageItems.length === 0 ? (
              <GoldCard className="p-8 text-center">
                <p className="text-sm font-black text-[#002147]/70">
                  {t('لا توجد كلمات مطابقة لبحثك', 'No vocabulary matching search')}
                </p>
              </GoldCard>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {pageItems.map((item) => {
                  const isSelected = selectedItem?.word === item.word;
                  const isItemSpeaking = isSpeaking === item.word;
                  return (
                    <GoldCard
                      key={item.word}
                      onClick={() => setSelectedItem(item)}
                      className={`p-3.5 flex flex-col justify-between gap-2.5 transition-transform active:scale-95 ${
                        isSelected ? 'ring-2 ring-[#C49E3A] bg-[#fdfaf3]' : ''
                      }`}
                    >
                      {/* Image / Emoji on top */}
                      <div className="w-full h-24 rounded-xl bg-[#fdfaf3] border border-[#C49E3A]/30 flex items-center justify-center text-5xl select-none">
                        {item.emoji}
                      </div>

                      {/* Word & Meaning + Small Gold Speaker Button */}
                      <div className="flex items-end justify-between gap-2 pt-1">
                        <div className="min-w-0 flex-1">
                          <h4
                            dir="ltr"
                            className="font-black text-sm sm:text-base text-[#002147] capitalize truncate text-start"
                          >
                            {item.word}
                          </h4>
                          <p className="text-xs font-black text-[#C49E3A] truncate mt-0.5">
                            {item.meaning_ar}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakWordOrSentence(item.word, item.word);
                          }}
                          aria-label={t('استمع للكلمة', 'Listen Pronunciation')}
                          className={`w-8 h-8 rounded-xl bg-[#002147] text-[#E6C36A] border border-[#C49E3A] flex items-center justify-center shrink-0 cursor-pointer transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] ${
                            isItemSpeaking ? 'ring-2 ring-[#E6C36A]' : ''
                          }`}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </GoldCard>
                  );
                })}
              </div>
            )}

            {/* Selected Word Detail Card */}
            {selectedItem && (
              <GoldCard className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Cartoon visual preview */}
                  <div className="md:col-span-5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 p-5 flex flex-col items-center justify-between text-center gap-4">
                    <span className="text-[10px] font-black tracking-widest text-[#E6C36A] uppercase bg-[#002147] px-3 py-1 rounded-full">
                      {t('المظهر التوضيحي 🎨', 'CARTOON DECOR')}
                    </span>

                    <div className="w-32 h-32 rounded-full border-2 border-[#C49E3A] bg-white flex items-center justify-center text-7xl shadow-sm">
                      {selectedItem.emoji}
                    </div>

                    <div className="w-full">
                      <span className="text-[10px] font-black text-[#002147]/70 block">
                        {t(
                          'أبعاد الصورة المقترحة للذكاء الاصطناعي:',
                          'AI Generation Prompt:'
                        )}
                      </span>
                      <p
                        dir="ltr"
                        className="text-[10px] text-[#002147]/65 italic mt-1 bg-white border border-[#C49E3A]/25 p-2 rounded-xl font-mono line-clamp-2"
                      >
                        {selectedItem.image_prompt}
                      </p>
                    </div>

                    <PrimaryButton
                      onClick={() => speakWordOrSentence(selectedItem.word, selectedItem.word)}
                      className="w-full !py-2.5 !text-xs"
                    >
                      <Volume2 size={14} />
                      <span>{t('استمع للكلمة 🔊', 'Listen Pronunciation 🔊')}</span>
                    </PrimaryButton>
                  </div>

                  {/* Right: Verbal details & example sentence */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#002147]/60 tracking-wider block">
                          {t('الكلمة باللغة الإنجليزية', 'English Spelling')}
                        </span>
                        <h2
                          dir="ltr"
                          className="text-2xl sm:text-3xl font-black text-[#002147] capitalize tracking-tight mt-0.5"
                        >
                          {selectedItem.word}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const isFav = favoriteWords.includes(selectedItem.word);
                          const nextFavs = isFav
                            ? favoriteWords.filter((w) => w !== selectedItem.word)
                            : [...favoriteWords, selectedItem.word];
                          setFavoriteWords(nextFavs);
                          localStorage.setItem(
                            'favorite_dictionary_words',
                            JSON.stringify(nextFavs)
                          );
                        }}
                        className={`p-2 rounded-xl border transition-transform active:scale-95 cursor-pointer ${
                          favoriteWords.includes(selectedItem.word)
                            ? 'bg-[#002147] border-[#C49E3A] text-[#E6C36A]'
                            : 'bg-[#fdfaf3] border-[#C49E3A]/40 text-[#002147]/60 hover:text-[#002147]'
                        }`}
                        title={t(
                          'إضافة إلى قائمة المراجعة والمفضلة',
                          'Add to review/favorites'
                        )}
                      >
                        <Heart
                          size={16}
                          fill={
                            favoriteWords.includes(selectedItem.word)
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      </button>
                    </div>

                    <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40">
                      <span className="text-[10px] font-black uppercase text-[#002147]/60 tracking-wider block">
                        {t('المعنى بالعربية', 'Arabic Translation')}
                      </span>
                      <p className="text-xl sm:text-2xl font-black text-[#C49E3A] mt-0.5">
                        {selectedItem.meaning_ar}
                      </p>
                    </div>

                    <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-4 rounded-2xl space-y-2">
                      <span className="text-[10px] font-black uppercase text-[#002147]/60 tracking-wider block">
                        {t('مثال معبر في جملة', 'Example Sentence context')}
                      </span>
                      <div className="flex items-start justify-between gap-2">
                        <p
                          dir="ltr"
                          className="font-black text-[#002147] text-sm sm:text-base italic leading-relaxed"
                        >
                          &ldquo;{selectedItem.sentence}&rdquo;
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            speakWordOrSentence(
                              selectedItem.sentence,
                              `sentence_${selectedItem.word}`
                            )
                          }
                          className="w-8 h-8 bg-[#002147] border border-[#C49E3A] rounded-xl text-[#E6C36A] flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                      {selectedItem.sentence_ar && (
                        <p className="text-xs text-[#002147]/70 font-bold pt-2 border-t border-[#C49E3A]/25">
                          {selectedItem.sentence_ar}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-start gap-2 text-xs text-[#002147]/70 font-bold">
                      <Info size={14} className="text-[#C49E3A] shrink-0 mt-0.5" />
                      <p>
                        {t(
                          'تدرّب على قراءة الجملة والكلمة بصوتك مستعيناً بنطق اللفظ الإنجليزي لتثبيت المعلومة وحصد نطق مميز.',
                          'Try reading the sentence out loud to understand context. Click the voice button to listen again.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </GoldCard>
            )}

            {/* Review & Custom Words Creator Hub */}
            <GoldCard className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-5 border-b border-[#C49E3A]/30 gap-3">
                <div>
                  <h3 className="text-base font-black text-[#002147] flex items-center gap-2">
                    <Star className="text-[#C49E3A]" size={18} fill="currentColor" />
                    <span>
                      {t(
                        '🎨 لوحة الإضافة والمراجعة للقاموس المصور',
                        '🎨 Kids Board: Add & Review Dict Cards'
                      )}
                    </span>
                  </h3>
                  <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
                    {t(
                      'أضف كلمات كرتونية مخصصة لقاموسك، وراجع مفرداتك الصعبة والمفضلة للمذاكرة!',
                      'Design custom visual words, choose funny symbols, and review saved dictionary items!'
                    )}
                  </p>
                </div>

                <div className="flex gap-1.5 bg-[#fdfaf3] p-1 rounded-2xl border border-[#C49E3A]/40">
                  {[
                    {
                      id: 'review',
                      label: t('❤️ الكلمات المفضلة', '❤️ My Favorites'),
                    },
                    {
                      id: 'add',
                      label: t('➕ إضافة كلمة مصورة', '➕ Design New Card'),
                    },
                  ].map((tabItem) => (
                    <button
                      key={tabItem.id}
                      type="button"
                      onClick={() => setDictionaryTab(tabItem.id as 'review' | 'add')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-transform active:scale-95 ${
                        dictionaryTab === tabItem.id
                          ? 'bg-[#002147] text-[#E6C36A] shadow-sm'
                          : 'text-[#002147]/70 hover:text-[#002147]'
                      }`}
                    >
                      {tabItem.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {dictionaryTab === 'review' && (
                  <motion.div
                    key="review_sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-xs font-black text-[#002147]">
                      {isRtl
                        ? `📋 قائمة المراجعة المفضلة الحالية (${
                            combinedItems.filter((item) =>
                              favoriteWords.includes(item.word)
                            ).length
                          } كلمات):`
                        : `📋 Current word bookmarks to study (${
                            combinedItems.filter((item) =>
                              favoriteWords.includes(item.word)
                            ).length
                          } cards):`}
                    </h4>

                    {combinedItems.filter((item) => favoriteWords.includes(item.word))
                      .length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {combinedItems
                          .filter((item) => favoriteWords.includes(item.word))
                          .map((item) => (
                            <div
                              key={item.word}
                              className="p-3 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl flex justify-between items-center gap-2"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-2xl bg-white p-1.5 rounded-xl border border-[#C49E3A]/30 shrink-0">
                                  {item.emoji}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-xs font-black text-[#002147] capitalize truncate">
                                    {item.word}
                                  </p>
                                  <p className="text-[11px] text-[#C49E3A] font-black truncate">
                                    {item.meaning_ar}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    speakWordOrSentence(item.word, `fav_${item.word}`)
                                  }
                                  className="w-7 h-7 bg-[#002147] text-[#E6C36A] border border-[#C49E3A] rounded-lg flex items-center justify-center cursor-pointer active:scale-95"
                                >
                                  <Volume2 size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextFavs = favoriteWords.filter(
                                      (w) => w !== item.word
                                    );
                                    setFavoriteWords(nextFavs);
                                    localStorage.setItem(
                                      'favorite_dictionary_words',
                                      JSON.stringify(nextFavs)
                                    );
                                  }}
                                  className="w-7 h-7 bg-white border border-[#C49E3A]/40 text-[#002147] rounded-lg flex items-center justify-center cursor-pointer active:scale-95"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-[#fdfaf3] border border-[#C49E3A]/30 p-4 rounded-2xl">
                        <Heart className="text-[#C49E3A] mx-auto mb-2 opacity-60" size={24} />
                        <p className="text-xs text-[#002147] font-black">
                          {t(
                            'لا توجد كلمات في قائمة مراجعة القاموس حالياً.',
                            'Your favorite dictionary bookmark stack is empty.'
                          )}
                        </p>
                        <p className="text-[11px] text-[#002147]/70 font-bold mt-1">
                          {t(
                            'انقر على أيقونة القلب ❤️ المتواجدة أعلى بطاقات التعريف التفصيلية لإرفاق أي كلمة هنا.',
                            'Click the Heart bookmark icon next to any word details to review it here easily.'
                          )}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {dictionaryTab === 'add' && (
                  <motion.div
                    key="add_sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newWord || !newMeaningAr || !newSentence) return;

                        const customObj: DictionaryItem = {
                          word: newWord.toLowerCase().trim(),
                          meaning_ar: newMeaningAr.trim(),
                          image_prompt:
                            newPrompt.trim() ||
                            `Cute nursery graphic details of ${newWord
                              .toLowerCase()
                              .trim()}, isolated vector white BG`,
                          sentence: newSentence.trim(),
                          sentence_ar: newSentenceAr.trim() || 'مثال تطبيقي للكلمة.',
                          emoji: newEmoji,
                          category: activeCategory as any,
                        };

                        const updatedList = [...customDictionaryItems, customObj];
                        setCustomDictionaryItems(updatedList);
                        localStorage.setItem(
                          'custom_dictionary_items',
                          JSON.stringify(updatedList)
                        );

                        setNewWord('');
                        setNewMeaningAr('');
                        setNewSentence('');
                        setNewSentenceAr('');
                        setNewPrompt('');

                        setAddMsg(
                          t(
                            '✨ رائع! تم حفظ الكلمة المصورة الجديدة بنجاح بالقاموس.',
                            '✨ Card created & compiled successfully!'
                          )
                        );
                        setTimeout(() => setAddMsg(''), 4000);

                        if (onXPAdded) onXPAdded(10);
                      }}
                      className="space-y-4"
                    >
                      {addMsg && (
                        <div className="bg-[#fdfaf3] border border-[#C49E3A] text-[#002147] text-xs font-black p-3 rounded-xl text-center">
                          {addMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-[#002147] block">
                            {t(
                              '🔑 الكلمة الإنجليزية (English Word) *:',
                              '🔑 English Word *:'
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={newWord}
                            onChange={(e) => setNewWord(e.target.value)}
                            placeholder="e.g., Apple"
                            className="w-full text-xs font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-black text-[#002147] block">
                            {t('🎨 المعنى بالعربية *:', '🎨 Arabic Translation *:')}
                          </label>
                          <input
                            type="text"
                            required
                            value={newMeaningAr}
                            onChange={(e) => setNewMeaningAr(e.target.value)}
                            placeholder="مثال: تفاحه"
                            className="w-full text-xs font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A] text-right"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-black text-[#002147] block">
                            {t('🧸 رمز تعبيري دلالي (Emoji) *:', '🧸 Emoji Symbol *:')}
                          </label>
                          <select
                            value={newEmoji}
                            onChange={(e) => setNewEmoji(e.target.value)}
                            className="w-full text-xs bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A]"
                          >
                            {[
                              '🍎',
                              '🧸',
                              '🚗',
                              '🛹',
                              '🛸',
                              '🎮',
                              '💡',
                              '🐶',
                              '🍕',
                              '🥛',
                              '🚲',
                              '🍰',
                              '🌸',
                              '🏠',
                              '🪑',
                              '🛏️',
                              '🚪',
                              '📕',
                            ].map((em) => (
                              <option key={em} value={em}>
                                {em}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-black text-[#002147] block">
                            {t(
                              '📝 الجملة التطبيقية بالإنجليزية *:',
                              '📝 English Sentence *:'
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={newSentence}
                            onChange={(e) => setNewSentence(e.target.value)}
                            placeholder="e.g., I love eating a red apple."
                            className="w-full text-xs font-bold bg-white border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-black text-[#002147]/70 block">
                            {t('🎯 ترجمة الجملة للعربية:', '🎯 Arabic Translation:')}
                          </label>
                          <input
                            type="text"
                            value={newSentenceAr}
                            onChange={(e) => setNewSentenceAr(e.target.value)}
                            placeholder="مثال: أنا أحب أكل التفاح الأحمر اللذيذ."
                            className="w-full text-xs font-bold bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl p-3 text-[#002147] focus:outline-none focus:border-[#C49E3A] text-right"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <PrimaryButton type="submit" className="!text-xs">
                          <span>
                            {t(
                              'حفظ الكارت التوضيحي بالقاموس (+10 XP) 💾',
                              'Save To My Dictionary (+10 XP) 💾'
                            )}
                          </span>
                        </PrimaryButton>
                      </div>
                    </form>

                    {activeCustoms.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#C49E3A]/30">
                        <h5 className="text-[11px] font-black text-[#002147]/70 tracking-wider mb-2 uppercase">
                          {t(
                            '⚙️ الكروت التعليمية المضافة من قبلك في هذا القسم:',
                            '⚙️ Custom cards created in this category:'
                          )}
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {activeCustoms.map((cust) => (
                            <div
                              key={cust.word}
                              className="p-2.5 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl flex items-center justify-between text-xs"
                            >
                              <span className="font-black text-[#002147] truncate gap-1.5 flex items-center">
                                <span>{cust.emoji}</span>
                                <span className="capitalize">{cust.word}</span>
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  const updated = customDictionaryItems.filter(
                                    (c) => c.word !== cust.word
                                  );
                                  setCustomDictionaryItems(updated);
                                  localStorage.setItem(
                                    'custom_dictionary_items',
                                    JSON.stringify(updated)
                                  );
                                  if (favoriteWords.includes(cust.word)) {
                                    setFavoriteWords((prev) =>
                                      prev.filter((w) => w !== cust.word)
                                    );
                                  }
                                }}
                                className="p-1 text-[#002147]/70 hover:text-[#002147] rounded-lg cursor-pointer"
                                title={t('حذف', 'Delete')}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </GoldCard>
          </div>
        ) : (
          /* QUIZ MODE */
          <GoldCard className="p-5 sm:p-8">
            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#C49E3A]/30 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#C49E3A] block">
                      {t('لعبة تخمين المفردات', 'WORD TRIVIA CHALLENGE')}
                    </span>
                    <h3 className="text-sm font-black text-[#002147]">
                      {t('السؤال', 'Question')}{' '}
                      <strong>
                        {quizIndex + 1} / {quizQuestions.length}
                      </strong>
                    </h3>
                  </div>

                  <ProgressPill>
                    ⭐ {quizScore} {t('صحيحة', 'correct')}
                  </ProgressPill>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 py-2">
                  <div className="w-24 h-24 rounded-full bg-[#fdfaf3] border-2 border-[#C49E3A] flex items-center justify-center text-5xl shadow-sm">
                    {quizQuestions[quizIndex]?.correctAnswer.emoji}
                  </div>

                  <div>
                    <h2
                      dir="ltr"
                      className="text-2xl sm:text-3xl font-black text-[#002147] capitalize"
                    >
                      {quizQuestions[quizIndex]?.correctAnswer.word}
                    </h2>
                    <span
                      dir="ltr"
                      className="text-xs text-[#002147]/70 font-bold block mt-1"
                    >
                      &ldquo;{quizQuestions[quizIndex]?.correctAnswer.sentence}&rdquo;
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto w-full">
                  {quizQuestions[quizIndex]?.allOptions.map((opt) => {
                    const curQ = quizQuestions[quizIndex];
                    const isSelected = curQ.userAnswer === opt;
                    const isCorrectAnswer = opt === curQ.correctAnswer.meaning_ar;
                    const hasAnswered = curQ.userAnswer !== null;

                    let state: 'normal' | 'correct' | 'wrong' = 'normal';
                    if (hasAnswered) {
                      if (isCorrectAnswer) state = 'correct';
                      else if (isSelected) state = 'wrong';
                    }

                    return (
                      <AnswerOption
                        key={opt}
                        label={opt}
                        state={state}
                        disabled={hasAnswered}
                        onClick={() => handleSelectQuizAnswer(opt)}
                      />
                    );
                  })}
                </div>

                {quizQuestions[quizIndex]?.userAnswer !== null && (
                  <div className="space-y-4 pt-2">
                    <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#C49E3A]/40 text-center text-xs font-black text-[#002147] max-w-md mx-auto">
                      {quizQuestions[quizIndex].isCorrect
                        ? t(
                            'إجابة عبقرية تماماً! أحسنت وبوركت 🥳',
                            'Awesome job! Smashed it completely 🥳'
                          )
                        : isRtl
                        ? `خطأ بسيط! الخيار الصحيح هو: "${quizQuestions[quizIndex].correctAnswer.meaning_ar}"`
                        : `Not quite! The correct meaning is: "${quizQuestions[quizIndex].correctAnswer.meaning_ar}"`}
                    </div>

                    <div className="flex justify-end">
                      <PrimaryButton onClick={nextQuizQuestion}>
                        <span>
                          {quizIndex < quizQuestions.length - 1
                            ? t('السؤال التالي ➡️', 'Next Question ➡️')
                            : t('إنهاء التحدي وحصد الجوائز 🏆', 'Finish Trivia & Save 🏆')}
                        </span>
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center space-y-6 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-[#fdfaf3] border-2 border-[#C49E3A] rounded-full flex items-center justify-center text-[#C49E3A]">
                  <Award size={44} strokeWidth={2.5} />
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147]">
                    {t('اكتملت اللعبة بنجاح! 🎉', 'Trivia Smashed! 🎉')}
                  </h2>
                  <p className="text-sm text-[#002147]/75 font-bold">
                    {isRtl
                      ? `تمكنت من الإجابة على ${quizScore} من 5 أسئلة للمفردات بالشكل الصحيح.`
                      : `You answered ${quizScore} out of 5 questions correctly.`}
                  </p>
                </div>

                <div className="bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 p-4 max-w-xs w-full flex items-center justify-around">
                  <div>
                    <span className="text-[10px] font-black text-[#002147]/60 block">
                      {t('الدرجة', 'SCORE')}
                    </span>
                    <strong className="text-2xl font-black text-[#002147]">
                      {quizScore * 20}%
                    </strong>
                  </div>
                  <div className="border-r h-8 border-[#C49E3A]/30" />
                  <div>
                    <span className="text-[10px] font-black text-[#002147]/60 block">
                      {t('نقاط فوز', 'REWARD')}
                    </span>
                    <strong className="text-2xl font-black text-[#C49E3A]">
                      +{quizScore * 10} XP
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 w-full max-w-sm">
                  <PrimaryButton onClick={startCategoryQuiz} className="flex-1">
                    <RotateCcw size={14} />
                    <span>{t('إعادة اللعب 🔄', 'Try Again 🔄')}</span>
                  </PrimaryButton>
                  <GhostButton
                    onClick={() => setInteractionMode('browse')}
                    className="flex-1"
                  >
                    <span>{t('العودة للتصفح', 'Go to Cards')}</span>
                  </GhostButton>
                </div>
              </div>
            )}
          </GoldCard>
        )}
      </div>
    </SectionShell>
  );
};
