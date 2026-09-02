import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Volume2, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Trophy, 
  RefreshCw, 
  Flame, 
  Clock, 
  Search, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  HelpCircle,
  Eye,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../lib/translations';

interface ReadingLabProps {
  lang: Language;
  onBack?: () => void;
  userLevel?: string;
  onXPAdded?: (xp: number, details?: { lessonId: string; title: string; score: number; total: number; level: string }) => void;
}

interface ReadingPassage {
  id: string;
  titleEn: string;
  titleAr: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;
  emoji: string;
  bgGradient: string;
  estimatedMinutes: number;
  paragraphs: {
    en: string;
    ar: string;
  }[];
  keywords: {
    word: string;
    meaningAr: string;
    ipa: string;
    context: string;
  }[];
  comprehensionQuiz: {
    question: string;
    questionAr: string;
    options: string[];
    correctIndex: number;
    explanationAr: string;
  }[];
}

const PRESET_PASSAGES: ReadingPassage[] = [
  {
    id: 'ai-future-learning',
    titleEn: 'The Future of AI in Modern Education',
    titleAr: 'مستقبل الذكاء الاصطناعي في التعليم الحديث',
    level: 'B1',
    category: 'Technology & AI',
    emoji: '🤖',
    bgGradient: 'from-blue-600 to-indigo-700',
    estimatedMinutes: 3,
    paragraphs: [
      {
        en: 'Artificial intelligence is revolutionizing the way students acquire new languages across the globe. Rather than relying solely on traditional textbooks, learners can now practice active conversations with personalized virtual tutors at any hour of the day.',
        ar: 'يُحدث الذكاء الاصطناعي ثورة في طريقة اكتساب الطلاب للغات جديدة حول العالم. بدلاً من الاعتماد فقط على الكتب المدرسية التقليدية، يمكن للمتعلمين الآن ممارسة محادثات نشطة مع معلمين افتراضيين مخصصين في أي ساعة من اليوم.'
      },
      {
        en: 'These smart systems analyze pronunciation nuances in real time, identify specific grammar gaps, and adjust lesson difficulty dynamically to ensure maximum retention and continuous progress.',
        ar: 'تقوم هذه الأنظمة الذكية بتحليل تفاصيل النطق في الوقت الفعلي، وتحديد الثغرات النحوية الدقيقة، وتعديل صعوبة الدروس ديناميكياً لضمان أقصى قدر من الاستيعاب والتقدم المستمر.'
      },
      {
        en: 'As technology evolves, the integration of interactive voice platforms creates an immersive classroom experience that empowers students to speak with unshakeable confidence.',
        ar: 'ومع تطور التكنولوجيا، يخلق دمج المنصات الصوتية التفاعلية تجربة تعليمية غامرة تمكّن الطلاب من التحدث بثقة لا تتزعزع.'
      }
    ],
    keywords: [
      { word: 'Revolutionizing', meaningAr: 'يحدث ثورة وتغييراً جذرياً', ipa: '/ˌrev.əˈluː.ʃən.aɪ.zɪŋ/', context: 'revolutionizing the way students acquire...' },
      { word: 'Nuances', meaningAr: 'فروق دقيقة وتفاصيل خفية', ipa: '/ˈnjuː.ɑːnsɪz/', context: 'analyze pronunciation nuances...' },
      { word: 'Retention', meaningAr: 'تثبيت وحفظ المعلومات في الذاكرة', ipa: '/rɪˈten.ʃən/', context: 'ensure maximum retention...' },
      { word: 'Immersive', meaningAr: 'غامرة وتفاعلية وشاملة', ipa: '/ɪˈmɜː.sɪv/', context: 'creates an immersive classroom experience...' }
    ],
    comprehensionQuiz: [
      {
        question: 'According to the passage, how does AI benefit language students compared to traditional textbooks?',
        questionAr: 'وفقاً للنص، كيف يفيد الذكاء الاصطناعي طلاب اللغة مقارنة بالكتب التقليدية؟',
        options: [
          'It allows 24/7 personalized conversation practice',
          'It completely eliminates the need for any practice',
          'It only translates written documents',
          'It replaces the need to speak English altogether'
        ],
        correctIndex: 0,
        explanationAr: 'أوضح النص أن الطلاب يستطيعون الآن التحدث والتفاعل مع معلمين افتراضيين مخصصين في أي وقت على مدار الساعة.'
      },
      {
        question: 'What do smart systems analyze in real time?',
        questionAr: 'ما الذي تحلله الأنظمة الذكية في الوقت الفعلي؟',
        options: [
          'Only test scores at the end of the year',
          'Pronunciation nuances and grammar gaps',
          'The speed of student typing only',
          'The student\'s internet connection speed'
        ],
        correctIndex: 1,
        explanationAr: 'ذكر النص في الفقرة الثانية صراحة أنها تحلل تفاصيل النطق وتحدد الثغرات النحوية بدقة.'
      }
    ]
  },
  {
    id: 'saudi-green-vision',
    titleEn: 'Green Horizons: Transforming the Desert',
    titleAr: 'آفاق خضراء: تحويل الصحراء إلى واحات مستدامة',
    level: 'B2',
    category: 'Environment & Saudi Arabia',
    emoji: '🌿',
    bgGradient: 'from-emerald-600 to-teal-700',
    estimatedMinutes: 4,
    paragraphs: [
      {
        en: 'The Saudi Green Initiative represents one of the world’s most ambitious ecological transformations. By planting billions of trees and restoring degraded lands, the initiative seeks to counteract climate change while preserving the Arabian Peninsula’s unique biodiversity.',
        ar: 'تمثل مبادرة السعودية الخضراء واحدة من أكثر التحولات البيئية طموحاً في العالم. من خلال زراعة مليارات الأشجار واستعادة الأراضي المتدهورة، تسعى المبادرة إلى مواجهة تغير المناخ مع الحفاظ على التنوع البيولوجي الفريد لشبه الجزيرة العربية.'
      },
      {
        en: 'Innovative cloud seeding techniques and state-of-the-art desalination powered by renewable solar energy are turning arid landscapes into flourishing green hubs.',
        ar: 'تعمل تقنيات الاستمطار الصناعي المبتكرة وتحلية المياه المتطورة التي تعمل بالطاقة الشمسية المتجددة على تحويل المناظر الطبيعية القاحلة إلى واحات خضراء مزدهرة.'
      },
      {
        en: 'This monumental endeavor not only enriches the local climate but also inspires future generations to embrace sustainability as a core national duty.',
        ar: 'هذا المسعى العظيم لا يُثري المناخ المحلي فحسب، بل يلهم أيضاً أجيال المستقبل لتبني الاستدامة كواجب وطني أساسي.'
      }
    ],
    keywords: [
      { word: 'Ambitious', meaningAr: 'طموح وعالي الهمة', ipa: '/æmˈbɪʃ.əs/', context: 'most ambitious ecological transformations...' },
      { word: 'Biodiversity', meaningAr: 'التنوع البيولوجي والأحيائي', ipa: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', context: 'preserving unique biodiversity...' },
      { word: 'Arid', meaningAr: 'قاحل وشديد الجفاف', ipa: '/ˈær.ɪd/', context: 'turning arid landscapes into flourishing hubs...' },
      { word: 'Endeavor', meaningAr: 'مسعى وجهد عظيم', ipa: '/ɪnˈdev.ər/', context: 'this monumental endeavor...' }
    ],
    comprehensionQuiz: [
      {
        question: 'What is the primary goal of the Saudi Green Initiative described in the passage?',
        questionAr: 'ما هو الهدف الأساسي لمبادرة السعودية الخضراء المذكور في النص؟',
        options: [
          'Restoring degraded lands and fighting climate change',
          'Building the tallest skyscrapers in the desert',
          'Decreasing international air travel',
          'Selling solar panels exclusively overseas'
        ],
        correctIndex: 0,
        explanationAr: 'تستهدف المبادرة استعادة الأراضي المتدهورة ومكافحة التغير المناخي عبر زراعة الأشجار والحفاظ على البيئة.'
      }
    ]
  },
  {
    id: 'space-exploration-mars',
    titleEn: 'Journey to the Red Planet: The Next Horizon',
    titleAr: 'رحلة إلى الكوكب الأحمر: الأفق القادم للبشرية',
    level: 'A2',
    category: 'Space & Exploration',
    emoji: '🚀',
    bgGradient: 'from-amber-600 to-rose-700',
    estimatedMinutes: 2,
    paragraphs: [
      {
        en: 'Mars has always captured the human imagination. Scientists believe that robotic rovers on Mars are gathering crucial clues about the history of water in our solar system.',
        ar: 'لطالما أسر كوكب المريخ خيال البشر. يعتقد العلماء أن مركبات الاستكشاف الآلية تجمع أدلة حاسمة حول تاريخ المياه في نظامنا الشمسي.'
      },
      {
        en: 'Astronauts are currently training in specialized facilities to prepare for long journeys in deep space, learning how to grow fresh food and recycle air efficiently.',
        ar: 'يتدرب رواد الفضاء حالياً في منشآت متخصصة للاستعداد للرحلات الطويلة في الفضاء السحيق، ويتعلمون كيفية زراعة طعام طازج وإعادة تدوير الهواء بكفاءة.'
      }
    ],
    keywords: [
      { word: 'Imagination', meaningAr: 'الخيال والإبداع', ipa: '/ɪˌmædʒ.ɪˈneɪ.ʃən/', context: 'captured the human imagination...' },
      { word: 'Crucial', meaningAr: 'حاسم وضروري للغاية', ipa: '/ˈkruː.ʃəl/', context: 'gathering crucial clues...' },
      { word: 'Efficiently', meaningAr: 'بكفاءة وفاعلية عالية', ipa: '/ɪˈfɪʃ.ənt.li/', context: 'recycle air efficiently...' }
    ],
    comprehensionQuiz: [
      {
        question: 'What are astronauts learning in specialized facilities?',
        questionAr: 'ما الذي يتعلمه رواد الفضاء في المنشآت المتخصصة؟',
        options: [
          'How to grow fresh food and recycle air',
          'How to build cars on Earth',
          'How to write long novels',
          'How to dive in deep oceans only'
        ],
        correctIndex: 0,
        explanationAr: 'ذكر النص في الفقرة الثانية أنهم يتعلمون زراعة الطعام الطازج وإعادة تدوير الهواء لرحلات الفضاء الطويلة.'
      }
    ]
  }
];

export const ReadingLab: React.FC<ReadingLabProps> = ({ lang, onBack, userLevel, onXPAdded }) => {
  const isRtl = lang === 'ar';
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage>(PRESET_PASSAGES[0]);
  const [activeTab, setActiveTab] = useState<'read' | 'vocab' | 'quiz' | 'generator'>('read');
  const [showArabicTranslation, setShowArabicTranslation] = useState(true);
  
  // Audio Playback states
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Comprehension Quiz states
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Custom AI Reading Generator
  const [customTopic, setCustomTopic] = useState('');
  const [customLevel, setCustomLevel] = useState('B1');
  const [isGenerating, setIsGenerating] = useState(false);

  // Text to speech helpers
  const playParagraph = (text: string, pIdx: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = audioSpeed;
      
      utterance.onstart = () => {
        setIsPlayingAudio(true);
        setCurrentParagraphIndex(pIdx);
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setCurrentParagraphIndex(null);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setCurrentParagraphIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setCurrentParagraphIndex(null);
    }
  };

  const playFullStory = () => {
    const fullText = selectedPassage.paragraphs.map(p => p.en).join(' ');
    playParagraph(fullText, 0);
  };

  const handleSelectPassage = (passage: ReadingPassage) => {
    stopAudio();
    setSelectedPassage(passage);
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
    setActiveTab('read');
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    selectedPassage.comprehensionQuiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setIsQuizSubmitted(true);
    if (onXPAdded) {
      const calculatedXP = score * 30 + 20;
      onXPAdded(calculatedXP, {
        lessonId: selectedPassage.id,
        title: isRtl ? selectedPassage.titleAr : selectedPassage.titleEn,
        score,
        total: selectedPassage.comprehensionQuiz.length,
        level: selectedPassage.level
      });
    }
  };

  const handleGenerateCustomStory = async () => {
    if (!customTopic.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/academy/reading-passage-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: customTopic.trim(),
          level: customLevel
        })
      });
      const data = await res.json();
      
      if (data && data.paragraphs) {
        const newPassage: ReadingPassage = {
          id: `custom-${Date.now()}`,
          titleEn: data.title || customTopic,
          titleAr: data.titleAr || customTopic,
          level: data.level || 'B1',
          category: data.category || 'Custom Story',
          emoji: '✨',
          bgGradient: 'from-purple-600 to-indigo-700',
          estimatedMinutes: data.estimatedMinutes || 3,
          paragraphs: data.paragraphs.map((p: any) => ({
            en: p.text || p.en || '',
            ar: p.textAr || p.ar || ''
          })),
          keywords: data.keywords || [],
          comprehensionQuiz: data.comprehensionQuiz || []
        };
        setSelectedPassage(newPassage);
        setCustomTopic('');
        setActiveTab('read');
      }
    } catch (err) {
      console.error("Custom generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 p-3 sm:p-6 lg:p-8 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
              >
                {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
            )}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <BookOpen size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isRtl ? 'مختبر القراءة الفصيحة والفهم الاستيعابي' : 'Active Reading & Comprehension Lab'}
                </h1>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {isRtl ? 'قراءة ناطقة متزامنة 🎧' : 'Synchronized Audio 🎧'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {isRtl
                  ? 'قصص ومقالات متدرجة المستويات مع نطق صوتي متزامن، بنك مفردات تفاعلي، واختبارات قياس الفهم المقروء'
                  : 'Level-graded stories with synchronized audio, clickable vocabulary notes, and interactive comprehension quizzes.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Trophy size={16} />
              {isRtl ? 'نقاط القراءة:' : 'Reading XP:'} 920
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Passage Library */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {isRtl ? 'مكتبة النصوص والمقالات' : 'Reading Passages'}
              </h3>
              <button
                onClick={() => setActiveTab('generator')}
                className="text-[11px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles size={12} />
                {isRtl ? 'توليد نص مخصص' : 'AI Custom Passage'}
              </button>
            </div>

            <div className="space-y-2.5">
              {PRESET_PASSAGES.map((passage) => {
                const isSelected = selectedPassage.id === passage.id;
                return (
                  <button
                    key={passage.id}
                    onClick={() => handleSelectPassage(passage)}
                    className={`w-full text-start p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-400 shadow-xs ring-2 ring-emerald-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-150 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-1.5 bg-white rounded-xl shadow-xs border border-slate-100">
                      {passage.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                          {isRtl ? passage.titleAr : passage.titleEn}
                        </h4>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                          {passage.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                        <span>{passage.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Clock size={12} />
                          {passage.estimatedMinutes} {isRtl ? 'دقائق' : 'mins'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Reading Studio & Player */}
        <div className="lg:col-span-8 space-y-4">
          {/* Navigation Sub-Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
            {[
              { id: 'read', labelAr: '📖 القراءة والاستماع', labelEn: '📖 Read & Listen' },
              { id: 'vocab', labelAr: '📚 بنك المفردات والسياق', labelEn: '📚 Vocabulary Bank' },
              { id: 'quiz', labelAr: '⚡ اختبار الفهم والاستيعاب', labelEn: '⚡ Comprehension Quiz' },
              { id: 'generator', labelAr: '✨ صانع المقالات الذكي', labelEn: '✨ AI Generator' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {isRtl ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* TAB 1: READ & LISTEN */}
          {activeTab === 'read' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              {/* Story Banner */}
              <div className={`p-6 rounded-3xl bg-gradient-to-r ${selectedPassage.bgGradient} text-white space-y-3 shadow-md`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                    {selectedPassage.category} • CEFR {selectedPassage.level}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Audio Speed Selector */}
                    <div className="flex items-center bg-black/20 rounded-xl p-1 text-[11px] font-bold">
                      {[0.8, 1.0, 1.2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setAudioSpeed(speed)}
                          className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                            audioSpeed === speed ? 'bg-white text-slate-900 font-black' : 'text-white/80 hover:text-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowArabicTranslation(!showArabicTranslation)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        showArabicTranslation
                          ? 'bg-white text-slate-900 border-white'
                          : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                      }`}
                    >
                      {showArabicTranslation ? (isRtl ? 'إخفاء الترجمة' : 'Hide Arabic') : (isRtl ? 'إظهار الترجمة' : 'Show Arabic')}
                    </button>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  {selectedPassage.titleEn}
                </h2>
                <div className="text-emerald-100 font-medium text-sm">
                  {selectedPassage.titleAr}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {!isPlayingAudio ? (
                    <button
                      onClick={playFullStory}
                      className="px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 rounded-xl font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Play size={16} fill="currentColor" />
                      {isRtl ? 'تشغيل القراءة الصوتية الكاملة' : 'Play Full Audio'}
                    </button>
                  ) : (
                    <button
                      onClick={stopAudio}
                      className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Pause size={16} fill="currentColor" />
                      {isRtl ? 'إيقاف مؤقت للصوت' : 'Pause Audio'}
                    </button>
                  )}
                </div>
              </div>

              {/* Paragraphs with Synchronized Reading Focus */}
              <div className="space-y-4">
                {selectedPassage.paragraphs.map((p, pIdx) => {
                  const isCurrent = currentParagraphIndex === pIdx;
                  return (
                    <div
                      key={pIdx}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isCurrent
                          ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-2 ring-emerald-500/20'
                          : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-base sm:text-lg font-serif text-slate-900 leading-relaxed font-normal" dir="ltr">
                          {p.en}
                        </p>
                        <button
                          onClick={() => playParagraph(p.en, pIdx)}
                          className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      {showArabicTranslation && (
                        <p className="text-xs sm:text-sm text-slate-600 font-medium pt-2 border-t border-slate-200/60 leading-relaxed">
                          {p.ar}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: VOCABULARY BANK */}
          {activeTab === 'vocab' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4"
            >
              <h3 className="text-base font-black text-slate-900">
                {isRtl ? 'بنك المفردات المستهدفة وسياقها في النص' : 'Target Vocabulary & Contextual Usages'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPassage.keywords.map((kw, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-emerald-800 group-hover:text-emerald-600 transition-colors">
                        {kw.word}
                      </h4>
                      <button
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const u = new SpeechSynthesisUtterance(kw.word);
                            u.lang = 'en-US';
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      {kw.ipa}
                    </div>

                    <div className="text-sm font-bold text-slate-800">
                      {kw.meaningAr}
                    </div>

                    <div className="text-[11px] text-slate-500 bg-white p-2 rounded-xl border border-slate-100 font-medium">
                      "{kw.context}"
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: COMPREHENSION QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {isRtl ? 'اختبار الفهم والاستيعاب القرائي' : 'Reading Comprehension Check'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isRtl ? 'أجب عن الأسئلة بناءً على فهمك للنص السابق' : 'Answer the questions based on the text above.'}
                  </p>
                </div>
                {isQuizSubmitted && (
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    {isRtl ? `الدرجة: ${quizScore} من ${selectedPassage.comprehensionQuiz.length}` : `Score: ${quizScore}/${selectedPassage.comprehensionQuiz.length}`}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {selectedPassage.comprehensionQuiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-sm sm:text-base font-black text-slate-900" dir="ltr">
                      {qIdx + 1}. {q.question}
                    </div>
                    {isRtl && (
                      <div className="text-xs text-slate-600 font-medium">
                        {q.questionAr}
                      </div>
                    )}

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === q.correctIndex;
                        
                        let optStyle = "bg-white border-slate-200 text-slate-700 hover:border-emerald-300";
                        if (isSelected && !isQuizSubmitted) {
                          optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20";
                        } else if (isQuizSubmitted) {
                          if (isCorrect) {
                            optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isSelected && !isCorrect) {
                            optStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isQuizSubmitted}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            className={`w-full p-3 rounded-xl border text-start text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {isQuizSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-600" />}
                            {isQuizSubmitted && isSelected && !isCorrect && <XCircle size={16} className="text-rose-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-slate-200 font-medium">
                        <strong className="text-emerald-700 block mb-0.5">{isRtl ? 'التوضيح:' : 'Explanation:'}</strong>
                        {q.explanationAr}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                {!isQuizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {isRtl ? 'تسليم الإجابات والحصول على النقاط 🏆' : 'Submit Answers & Earn XP 🏆'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setIsQuizSubmitted(false);
                      setQuizScore(0);
                    }}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    {isRtl ? 'إعادة الاختبار 🔄' : 'Retake Quiz 🔄'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI CUSTOM PASSAGE GENERATOR */}
          {activeTab === 'generator' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isRtl ? 'صانع المقالات والقصص الذكي بالذكاء الاصطناعي' : 'AI Dynamic Passage Creator'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isRtl
                    ? 'اكتب أي موضوع ترغب في القراءة عنه (مثلاً: ريادة الأعمال، تاريخ الطيران، الذكاء الاصطناعي في الطب) وسيقوم النظام بتوليد نص متدرج مع بنك مفردات واختبار فهم استيعابي.'
                    : 'Generate custom reading passages tailored to your personal interests and proficiency level instantly.'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRtl ? 'الموضوع المطلوب:' : 'Desired Topic:'}
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder={isRtl ? 'مثال: The History of Deep Sea Diving' : 'e.g. The Future of Electric Aviation'}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRtl ? 'المستوى المستهدف (CEFR):' : 'Target CEFR Level:'}
                  </label>
                  <div className="flex gap-2">
                    {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setCustomLevel(lvl)}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          customLevel === lvl
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    disabled={!customTopic.trim() || isGenerating}
                    onClick={handleGenerateCustomStory}
                    className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      customTopic.trim() && !isGenerating
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        {isRtl ? 'جاري تأليف النص التفاعلي...' : 'Generating...'}
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        {isRtl ? 'توليد النص والقراءة الصوتية 🚀' : 'Generate Passage & Audio 🚀'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
