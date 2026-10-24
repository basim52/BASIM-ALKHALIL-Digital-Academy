import React, { useState } from 'react';
import {
  Volume2,
  Play,
  Pause,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../lib/translations';
import { useT } from '../lib/explainLang';
import { toEnglish } from '../lib/domTranslate';
import { managedSpeak } from '../lib/audio';
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
    bgGradient: '',
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
    bgGradient: '',
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
    bgGradient: '',
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

const READING_EN_MAP: Record<string, string> = {
  'يحدث ثورة وتغييراً جذرياً': 'Brings about a radical transformation',
  'فروق دقيقة وتفاصيل خفية': 'Subtle differences and fine details',
  'تثبيت وحفظ المعلومات في الذاكرة': 'Keeping and retaining information in memory',
  'غامرة وتفاعلية وشاملة': 'Engaging, interactive, and all-encompassing',
  'طموح وعالي الهمة': 'Having a strong desire and determination to succeed',
  'التنوع البيولوجي والأحيائي': 'The variety of plant and animal life in an environment',
  'قاحل وشديد الجفاف': 'Extremely dry, with little or no rain',
  'مسعى وجهد عظيم': 'A purposeful or industrious undertaking',
  'الخيال والإبداع': 'The ability of the mind to be creative and resourceful',
  'حاسم وضروري للغاية': 'Of great importance; decisive or critical',
  'بكفاءة وفاعلية عالية': 'In a well-organized and productive way',
  'أوضح النص أن الطلاب يستطيعون الآن التحدث والتفاعل مع معلمين افتراضيين مخصصين في أي وقت على مدار الساعة.':
    'The passage states that learners can practice active conversations with personalized virtual tutors at any hour of the day.',
  'ذكر النص في الفقرة الثانية صراحة أنها تحلل تفاصيل النطق وتحدد الثغرات النحوية بدقة.':
    'Paragraph 2 explicitly notes that smart systems analyze pronunciation nuances and identify specific grammar gaps in real time.',
  'تستهدف المبادرة استعادة الأراضي المتدهورة ومكافحة التغير المناخي عبر زراعة الأشجار والحفاظ على البيئة.':
    'The initiative seeks to restore degraded lands and counteract climate change by planting billions of trees.',
  'ذكر النص في الفقرة الثانية أنهم يتعلمون زراعة الطعام الطازج وإعادة تدوير الهواء لرحلات الفضاء الطويلة.':
    'Paragraph 2 mentions that astronauts learn how to grow fresh food and recycle air efficiently for deep-space journeys.',
};

export const ReadingLab: React.FC<ReadingLabProps> = ({ lang, onXPAdded }) => {
  const tHook = useT();
  const isEnMode = lang === 'en' || tHook('ar', 'en') === 'en';
  const isRtl = !isEnMode;
  const t = (ar: string, en: string) => (isEnMode ? en : ar);
  const tr = (ar: string) => t(ar, READING_EN_MAP[ar] || toEnglish(ar));

  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage>(PRESET_PASSAGES[0]);
  const [activeTab, setActiveTab] = useState<'read' | 'vocab' | 'quiz' | 'generator'>('read');
  const [showArabicTranslation, setShowArabicTranslation] = useState(true);
  const [completedPassages, setCompletedPassages] = useState<string[]>([]);

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

      managedSpeak(utterance);
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
    setCompletedPassages(prev => (prev.includes(selectedPassage.id) ? prev : [...prev, selectedPassage.id]));
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
          bgGradient: '',
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
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} data-testid="reading-lab">
      {/* Top Progress Pill Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ProgressPill>
            📖 {selectedPassage.category} • CEFR {selectedPassage.level}
          </ProgressPill>
        </div>
        <GhostButton onClick={() => setActiveTab('generator')}>
          <Sparkles size={14} />
          {t('توليد نص مخصص', 'AI Custom Passage')}
        </GhostButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Passage Library with LessonTile */}
        <div className="lg:col-span-4">
          <GoldCard className="space-y-2.5">
            <h3 className="text-xs font-black text-[#002147]/70 uppercase tracking-wider">
              {t('مكتبة النصوص والمقالات', 'Reading Passages')}
            </h3>
            <div className="space-y-2">
              {PRESET_PASSAGES.map((passage, idx) => (
                <LessonTile
                  key={passage.id}
                  order={idx + 1}
                  emoji={passage.emoji}
                  title={t(passage.titleAr, passage.titleEn)}
                  subtitle={`${passage.category} • ${passage.estimatedMinutes} ${t('دقائق', 'mins')}`}
                  level={passage.level}
                  active={selectedPassage.id === passage.id}
                  done={completedPassages.includes(passage.id)}
                  onClick={() => handleSelectPassage(passage)}
                />
              ))}
            </div>
          </GoldCard>
        </div>

        {/* Right Column: Reading Studio & Player */}
        <div className="lg:col-span-8 space-y-3">
          {/* Navigation Sub-Tabs as Sara Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {[
              { id: 'read', labelAr: '📖 القراءة والاستماع', labelEn: '📖 Read & Listen' },
              { id: 'vocab', labelAr: '📚 بنك المفردات والسياق', labelEn: '📚 Vocabulary Bank' },
              { id: 'quiz', labelAr: '⚡ اختبار الفهم والاستيعاب', labelEn: '⚡ Comprehension Quiz' },
              { id: 'generator', labelAr: '✨ صانع المقالات الذكي', labelEn: '✨ AI Generator' },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-3.5 rounded-full text-xs font-black whitespace-nowrap active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer ${
                    active
                      ? 'bg-[#002147] text-[#E6C36A] border border-[#C49E3A] shadow-sm'
                      : 'bg-white text-[#002147] border border-[#C49E3A]/40 hover:border-[#C49E3A]'
                  }`}
                >
                  {t(tab.labelAr, tab.labelEn)}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
          >
            {/* TAB 1: READ & LISTEN */}
            {activeTab === 'read' && (
              <div className="space-y-3">
                {/* Passage Header -> Navy Card with Gold Title */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#002147] border-2 border-[#C49E3A] text-white space-y-2 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-black bg-[#001a38] text-[#E6C36A] border border-[#C49E3A]/60 px-3 py-0.5 rounded-full">
                      {selectedPassage.category} • CEFR {selectedPassage.level}
                    </span>
                    <span className="text-[11px] font-black text-[#E6C36A]">
                      ⏱ {selectedPassage.estimatedMinutes} {t('دقائق', 'mins')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-1">
                      <h2 className="text-lg sm:text-xl font-black text-[#E6C36A]" dir="ltr">
                        {selectedPassage.titleEn}
                      </h2>
                      {isRtl && (
                        <div className="text-white/85 font-bold text-xs sm:text-sm">
                          {selectedPassage.titleAr}
                        </div>
                      )}
                    </div>
                    {/* Small Sara TutorFace while the passage is being read aloud */}
                    {isPlayingAudio && (
                      <div className="flex items-center gap-2 shrink-0">
                        <TutorFace tutor="sara" size="sm" isSpeaking={isPlayingAudio} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Compact single-row Toolbar: Play button + Navy/Gold segmented speed control + Translate */}
                <GoldCard className="!p-2 flex items-center justify-between gap-1.5 flex-nowrap overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                    {!isPlayingAudio ? (
                      <GhostButton
                        onClick={playFullStory}
                        className="!px-2.5 !py-1.5 whitespace-nowrap shrink-0"
                      >
                        <Play size={13} fill="currentColor" />
                        <span>{t('تشغيل الصوت', 'Play Audio')}</span>
                      </GhostButton>
                    ) : (
                      <GhostButton
                        active
                        onClick={stopAudio}
                        className="!px-2.5 !py-1.5 whitespace-nowrap shrink-0"
                      >
                        <Pause size={13} fill="currentColor" />
                        <span>{t('إيقاف مؤقت', 'Pause')}</span>
                      </GhostButton>
                    )}

                    <div
                      dir="ltr"
                      className="inline-flex items-center flex-nowrap rounded-xl border border-[#C49E3A] bg-[#fdfaf3] p-0.5 shrink-0"
                    >
                      {[0.8, 1.0, 1.2].map((speed) => {
                        const active = audioSpeed === speed;
                        return (
                          <button
                            key={speed}
                            type="button"
                            onClick={() => setAudioSpeed(speed)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-black transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer ${
                              active
                                ? 'bg-[#002147] text-[#E6C36A]'
                                : 'text-[#002147] hover:bg-[#E6C36A]/20'
                            }`}
                          >
                            {speed}x
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isRtl && (
                    <GhostButton
                      active={showArabicTranslation}
                      onClick={() => setShowArabicTranslation(!showArabicTranslation)}
                      className="!px-2.5 !py-1.5 whitespace-nowrap shrink-0"
                    >
                      {showArabicTranslation
                        ? t('إخفاء الترجمة', 'Hide Arabic')
                        : t('إظهار الترجمة', 'Show Arabic')}
                    </GhostButton>
                  )}
                </GoldCard>

                {/* Passage Text on a White GoldCard, 17px; active paragraph gets light gold highlight */}
                <GoldCard className="space-y-3">
                  {selectedPassage.paragraphs.map((p, pIdx) => {
                    const isCurrent = currentParagraphIndex === pIdx;
                    return (
                      <div
                        key={pIdx}
                        className={`p-4 rounded-2xl border transition-colors space-y-2.5 ${
                          isCurrent
                            ? 'bg-[#E6C36A]/25 border-[#C49E3A] ring-2 ring-[#C49E3A]/40'
                            : 'bg-[#fdfaf3]/60 border-[#C49E3A]/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p
                            className="text-[17px] font-bold text-[#002147] leading-relaxed"
                            dir="ltr"
                          >
                            {p.en}
                          </p>
                          <GhostButton
                            active={isCurrent && isPlayingAudio}
                            onClick={() => playParagraph(p.en, pIdx)}
                            aria-label={t('استماع', 'Listen')}
                          >
                            <Volume2 size={15} />
                          </GhostButton>
                        </div>

                        {isRtl && showArabicTranslation && (
                          <p className="text-xs sm:text-sm text-[#002147]/80 font-bold pt-2 border-t border-[#C49E3A]/25 leading-relaxed">
                            {p.ar}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </GoldCard>
              </div>
            )}

            {/* TAB 2: VOCABULARY BANK */}
            {activeTab === 'vocab' && (
              <GoldCard className="space-y-4">
                <h3 className="text-base font-black text-[#002147]">
                  {t('بنك المفردات المستهدفة وسياقها في النص', 'Target Vocabulary & Contextual Usages')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPassage.keywords.map((kw, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-black text-[#002147]" dir="ltr">
                          {kw.word}
                        </h4>
                        <GhostButton
                          onClick={() => {
                            if ('speechSynthesis' in window) {
                              const u = new SpeechSynthesisUtterance(kw.word);
                              u.lang = 'en-US';
                              managedSpeak(u);
                            }
                          }}
                          aria-label={t('استماع', 'Listen')}
                        >
                          <Volume2 size={14} />
                        </GhostButton>
                      </div>

                      <div className="text-xs text-[#C49E3A] font-mono font-bold" dir="ltr">
                        {kw.ipa}
                      </div>

                      <div className="text-sm font-black text-[#002147]">
                        {tr(kw.meaningAr)}
                      </div>

                      <div className="text-[11px] text-[#002147]/75 bg-white p-2 rounded-xl border border-[#C49E3A]/30 font-bold" dir="ltr">
                        "{kw.context}"
                      </div>
                    </div>
                  ))}
                </div>
              </GoldCard>
            )}

            {/* TAB 3: COMPREHENSION QUIZ */}
            {activeTab === 'quiz' && (
              <GoldCard className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#C49E3A]/25">
                  <div>
                    <h3 className="text-base font-black text-[#002147]">
                      {t('اختبار الفهم والاستيعاب القرائي', 'Reading Comprehension Check')}
                    </h3>
                    <p className="text-xs font-bold text-[#002147]/70">
                      {t('أجب عن الأسئلة بناءً على فهمك للنص السابق', 'Answer the questions based on the text above.')}
                    </p>
                  </div>
                  {isQuizSubmitted && (
                    <ProgressPill>
                      {t(
                        `الدرجة: ${quizScore} من ${selectedPassage.comprehensionQuiz.length}`,
                        `Score: ${quizScore}/${selectedPassage.comprehensionQuiz.length}`
                      )}
                    </ProgressPill>
                  )}
                </div>

                <div className="space-y-5">
                  {selectedPassage.comprehensionQuiz.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 space-y-3"
                    >
                      <div className="text-sm sm:text-base font-black text-[#002147]" dir="ltr">
                        {qIdx + 1}. {q.question}
                      </div>
                      {isRtl && (
                        <div className="text-xs text-[#002147]/75 font-bold">
                          {q.questionAr}
                        </div>
                      )}

                      <div className="space-y-2 pt-1" dir="ltr">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          const isCorrect = optIdx === q.correctIndex;
                          const state = !isQuizSubmitted
                            ? 'normal'
                            : isCorrect
                            ? 'correct'
                            : isSelected
                            ? 'wrong'
                            : 'normal';

                          return (
                            <AnswerOption
                              key={optIdx}
                              label={opt}
                              dir="ltr"
                              selected={isSelected && !isQuizSubmitted}
                              state={state}
                              disabled={isQuizSubmitted}
                              onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            />
                          );
                        })}
                      </div>

                      {isQuizSubmitted && (
                        <div className="p-3 bg-white rounded-xl text-xs text-[#002147] border border-[#C49E3A]/30 font-bold">
                          <strong className="text-[#002147] block mb-0.5">
                            {t('التوضيح:', 'Explanation:')}
                          </strong>
                          {tr(q.explanationAr)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-1">
                  {!isQuizSubmitted ? (
                    <PrimaryButton onClick={handleSubmitQuiz}>
                      {t('تسليم الإجابات والحصول على النقاط 🏆', 'Submit Answers & Earn XP 🏆')}
                    </PrimaryButton>
                  ) : (
                    <GhostButton
                      onClick={() => {
                        setQuizAnswers({});
                        setIsQuizSubmitted(false);
                        setQuizScore(0);
                      }}
                    >
                      {t('إعادة الاختبار 🔄', 'Retake Quiz 🔄')}
                    </GhostButton>
                  )}
                </div>
              </GoldCard>
            )}

            {/* TAB 4: AI CUSTOM PASSAGE GENERATOR */}
            {activeTab === 'generator' && (
              <GoldCard className="space-y-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147]">
                    {t('صانع المقالات والقصص الذكي بالذكاء الاصطناعي', 'AI Dynamic Passage Creator')}
                  </h3>
                  <p className="text-xs font-bold text-[#002147]/70 mt-1">
                    {t(
                      'اكتب أي موضوع ترغب في القراءة عنه (مثلاً: ريادة الأعمال، تاريخ الطيران، الذكاء الاصطناعي في الطب) وسيقوم النظام بتوليد نص متدرج مع بنك مفردات واختبار فهم استيعابي.',
                      'Generate custom reading passages tailored to your personal interests and proficiency level instantly.'
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-[#002147] mb-1.5">
                      {t('الموضوع المطلوب:', 'Desired Topic:')}
                    </label>
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder={t(
                        'مثال: The History of Deep Sea Diving',
                        'e.g. The Future of Electric Aviation'
                      )}
                      className="w-full p-3.5 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-sm font-bold text-[#002147] focus:border-[#C49E3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#002147] mb-1.5">
                      {t('المستوى المستهدف (CEFR):', 'Target CEFR Level:')}
                    </label>
                    <div className="flex gap-2">
                      {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => {
                        const active = customLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setCustomLevel(lvl)}
                            className={`flex-1 py-2 rounded-full text-xs font-black active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer ${
                              active
                                ? 'bg-[#002147] text-[#E6C36A] border border-[#C49E3A]'
                                : 'bg-white text-[#002147] border border-[#C49E3A]/40 hover:border-[#C49E3A]'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <PrimaryButton
                      disabled={!customTopic.trim() || isGenerating}
                      onClick={handleGenerateCustomStory}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          {t('جاري تأليف النص التفاعلي...', 'Generating...')}
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} />
                          {t('توليد النص والقراءة الصوتية 🚀', 'Generate Passage & Audio 🚀')}
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </div>
              </GoldCard>
            )}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
};
