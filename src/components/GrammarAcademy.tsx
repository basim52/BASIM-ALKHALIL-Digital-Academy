import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Brain, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Trophy, 
  HelpCircle, 
  Play, 
  Award,
  Clock,
  Compass,
  Zap,
  Lightbulb,
  Search,
  BookCheck,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../lib/translations';

interface GrammarAcademyProps {
  lang: Language;
  onBack?: () => void;
  userLevel?: string;
  onXPAdded?: (xp: number, details?: { lessonId: string; title: string; score: number; total: number; level: string }) => void;
}

interface GrammarTopic {
  id: string;
  category: 'tenses' | 'syntax' | 'modals' | 'connectors';
  titleAr: string;
  titleEn: string;
  level: string;
  icon: string;
  ruleAr: string;
  formula: string;
  formulaParts: { label: string; color: string; example: string }[];
  timeline?: string;
  examples: { en: string; ar: string; note?: string }[];
  commonMistakes: { wrong: string; correct: string; reasonAr: string }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationAr: string;
  }[];
}

const PRESET_TOPICS: GrammarTopic[] = [
  {
    id: 'present-perfect',
    category: 'tenses',
    titleAr: 'المضارع التام (Present Perfect Tense)',
    titleEn: 'Present Perfect Tense',
    level: 'B1',
    icon: '⏳',
    ruleAr: 'يُستخدم للحديث عن تجارب ماضية لها أثر أو صلة مباشرة بالحاضر، أو أحداث حدثت في وقت غير محدد بالماضي، أو أفعال بدأت في الماضي وما زالت مستمرة حتى الآن مع (Since / For).',
    formula: 'Subject + have / has + Past Participle (V3)',
    formulaParts: [
      { label: 'Subject (الفاعل)', color: 'bg-blue-100 text-blue-800 border-blue-200', example: 'I / They / She' },
      { label: 'Auxiliary (الفعل المساعد)', color: 'bg-amber-100 text-amber-800 border-amber-200', example: 'have / has' },
      { label: 'Verb 3 (التصريف الثالث)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', example: 'visited / lived' },
      { label: 'Complement (التكملة)', color: 'bg-purple-100 text-purple-800 border-purple-200', example: 'London for 3 years.' }
    ],
    timeline: 'حدث في الماضي ────────────────> مستمر أو له أثر حاضر الآن 🌟',
    examples: [
      { en: 'She has lived in Riyadh since 2018.', ar: 'هي تعيش في الرياض منذ عام 2018 (وما زالت هناك).', note: 'استمرار الفعل حتى الحاضر' },
      { en: 'I have lost my passport!', ar: 'لقد فقدت جواز سفري! (والأثر: لا أستطيع السفر الآن).', note: 'أثر حاضر مباشر' },
      { en: 'Have you ever tried traditional Saudi coffee?', ar: 'هل سبق لك أن جربت القهوة السعودية التقليدية؟', note: 'سؤال عن تجارب الحياة' }
    ],
    commonMistakes: [
      { wrong: 'I have seen him yesterday.', correct: 'I saw him yesterday.', reasonAr: 'وجود كلمة زمنية محددة مثل (yesterday) يفرض استخدام الماضي البسيط وليس المضارع التام.' },
      { wrong: 'She has lived here since 5 years.', correct: 'She has lived here for 5 years.', reasonAr: 'نستخدم (For) مع المدد الإجمالية، بينما نستخدم (Since) مع نقطة بداية الزمن المحددة.' }
    ],
    quiz: [
      {
        question: 'Sarah ________ (study) medicine for four years and she loves it.',
        options: ['has studied', 'studied', 'studies', 'is study'],
        correctIndex: 0,
        explanationAr: 'نستخدم المضارع التام (has studied) لأن الدراسة بدأت بالماضي وما زالت مستمرة بدلالة (for four years).'
      },
      {
        question: 'We ________ to Japan last year.',
        options: ['have travelled', 'travelled', 'travel', 'are travelling'],
        correctIndex: 1,
        explanationAr: 'لوجود (last year) وهو زمن ماضٍ منتهٍ ومحدد، نستخدم الماضي البسيط (travelled).'
      },
      {
        question: 'Have you ________ the new museum yet?',
        options: ['visit', 'visited', 'visiting', 'visits'],
        correctIndex: 1,
        explanationAr: 'بعد Have/Has في صيغة السؤال التام يجب دائماً استخدام التصريف الثالث للفعل (Visited).'
      }
    ]
  },
  {
    id: 'first-conditional',
    category: 'syntax',
    titleAr: 'الجمل الشرطية المحتملة (First Conditional)',
    titleEn: 'First Conditional (Real Possibilities)',
    level: 'A2-B1',
    icon: '🔮',
    ruleAr: 'تُستخدم للتعبير عن نتائج حقيقية أو متوقعة الحدوث في المستقبل في حال تحقق شرط معين في الحاضر.',
    formula: 'If + Present Simple , ... will + Verb (Infinitive)',
    formulaParts: [
      { label: 'If Clause (جملة الشرط)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', example: 'If you study hard,' },
      { label: 'Comma (فاصلة)', color: 'bg-slate-100 text-slate-800 border-slate-200', example: ',' },
      { label: 'Main Clause (جواب الشرط)', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', example: 'you will pass the exam.' }
    ],
    timeline: 'الشرط في الحاضر [مضارع بسيط] ──────> النتيجة في المستقبل [will + مصدر]',
    examples: [
      { en: 'If it rains tomorrow, we will stay at home.', ar: 'إذا أمطرت غداً، سنبقى في المنزل.', note: 'موقف محتمل الوقوع' },
      { en: 'You will achieve fluency if you practice speaking every day.', ar: 'ستحقق الطلاقة إذا مارست التحدث يومياً.', note: 'تقديم جواب الشرط على جملة if' }
    ],
    commonMistakes: [
      { wrong: 'If it will rain, I will stay home.', correct: 'If it rains, I will stay home.', reasonAr: 'لا نضع will في جملة if إطلاقاً، بل نستخدم المضارع البسيط في شق الشرط.' }
    ],
    quiz: [
      {
        question: 'If you ________ early, you will catch the morning train.',
        options: ['wake up', 'will wake up', 'woke up', 'waking up'],
        correctIndex: 0,
        explanationAr: 'في الشق الشرطي الأول مع (If) نستخدم المضارع البسيط (wake up).'
      },
      {
        question: 'He ________ to the party if he finishes his work on time.',
        options: ['comes', 'will come', 'came', 'coming'],
        correctIndex: 1,
        explanationAr: 'جواب الشرط يعبر عن المستقبل باستخدام (will + infinitive).'
      }
    ]
  },
  {
    id: 'passive-voice',
    category: 'syntax',
    titleAr: 'المبني للمجهول (Passive Voice)',
    titleEn: 'Passive Voice Mastery',
    level: 'B2',
    icon: '🔄',
    ruleAr: 'يُستخدم عندما يكون التركيز على الحدث نفسه أو المفعول به أكثر من الفاعل، أو عندما يكون الفاعل مجهولاً أو غير مهم أو بديهياً.',
    formula: 'Object + Verb to Be (المناسب للزمن) + Past Participle (V3)',
    formulaParts: [
      { label: 'Object (نائب الفاعل)', color: 'bg-purple-100 text-purple-800 border-purple-200', example: 'The report / The houses' },
      { label: 'Verb to Be', color: 'bg-amber-100 text-amber-800 border-amber-200', example: 'is / was / have been' },
      { label: 'Main Verb (V3)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', example: 'written / built' },
      { label: 'Agent (اختياري)', color: 'bg-slate-100 text-slate-800 border-slate-200', example: 'by the engineer.' }
    ],
    examples: [
      { en: 'English is spoken all over the world.', ar: 'يتم التحدث باللغة الإنجليزية في جميع أنحاء العالم.', note: 'مبني للمجهول في المضارع البسيط' },
      { en: 'The smart academy was founded in 2024.', ar: 'تأسست الأكاديمية الذكية في عام 2024.', note: 'مبني للمجهول في الماضي البسيط' }
    ],
    commonMistakes: [
      { wrong: 'The car was repaired yesterday by he.', correct: 'The car was repaired yesterday by him.', reasonAr: 'بعد حرف الجر (by) نستخدم ضمير المفعول به (him) وليس ضمير الفاعل.' }
    ],
    quiz: [
      {
        question: 'Millions of emails ________ (send) worldwide every single day.',
        options: ['are sent', 'is send', 'were sent', 'sending'],
        correctIndex: 0,
        explanationAr: 'المفعول به جمع (Emails) والزمن حقيقة يومية عامة، لذا نستخدم (are + V3 = are sent).'
      }
    ]
  },
  {
    id: 'modals-deduction',
    category: 'modals',
    titleAr: 'أفعال الاستنتاج والاحتمالية (Modals of Deduction)',
    titleEn: 'Modals of Deduction & Probability',
    level: 'B1-B2',
    icon: '🔍',
    ruleAr: 'نستخدم (Must be) للتأكد بنسبة 100%، و(Can\'t be) للاستحالة المؤكدة، و(Might / May / Could) للاحتمالية والشك.',
    formula: 'Subject + Modal (Must / Might / Can\'t) + Verb 1',
    formulaParts: [
      { label: 'Must be (مؤكد 100%)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', example: 'He must be at work.' },
      { label: 'Might/May (محتمل 50%)', color: 'bg-amber-100 text-amber-800 border-amber-200', example: 'She might join us.' },
      { label: 'Can\'t be (مستحيل 0%)', color: 'bg-rose-100 text-rose-800 border-rose-200', example: 'It can\'t be true!' }
    ],
    examples: [
      { en: 'The lights are off; they must be sleeping.', ar: 'الأنوار مطفأة؛ لا بد أنهم نائمون (استنتاج مؤكد).', note: 'تأكد بالدليل' },
      { en: 'That can\'t be John; he is in Paris right now!', ar: 'من المستحيل أن يكون ذلك جون؛ فهو في باريس الآن!', note: 'استحالة مؤكدة' }
    ],
    commonMistakes: [
      { wrong: 'It mustn\'t be true because he never lies.', correct: 'It can\'t be true because he never lies.', reasonAr: 'للتعبير عن استحالة الاستنتاج نستخدم (can\'t be) حصراً، ولا نستخدم (mustn\'t) التي تعني النهي والمنع.' }
    ],
    quiz: [
      {
        question: 'Look at the snow falling! It ________ freezing outside.',
        options: ['must be', 'can\'t be', 'wouldn\'t be', 'shouldn\'t'],
        correctIndex: 0,
        explanationAr: 'رؤية الثلوج دليل قاطع على أن الجو متجمد، لذا نستخدم (must be).'
      }
    ]
  },
  {
    id: 'complex-connectors',
    category: 'connectors',
    titleAr: 'روابط التباين والسبب والنتيجة (Complex Connectors)',
    titleEn: 'Contrast & Cohesion Connectors',
    level: 'B2-C1',
    icon: '🔗',
    ruleAr: 'تُستخدم للربط المنطقي بين الأفكار في الكتابة الأكاديمية والتعبير الفصيح: (Although / Despite / However / Therefore / Furthermore).',
    formula: 'Although + Clause [S+V] vs Despite + Noun/Gerund [-ing]',
    formulaParts: [
      { label: 'Although + جملة كاملة', color: 'bg-blue-100 text-blue-800 border-blue-200', example: 'Although it was raining,' },
      { label: 'Despite + اسم أو فعل -ing', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', example: 'Despite the heavy rain,' },
      { label: 'However / Therefore', color: 'bg-amber-100 text-amber-800 border-amber-200', example: '; however, we won.' }
    ],
    examples: [
      { en: 'Although he worked hard, he did not finish in time.', ar: 'على الرغم من أنه عمل بجد، إلا أنه لم ينتهِ في الوقت المحدد.', note: 'جملة تباين' },
      { en: 'Despite his busy schedule, he reads 20 pages daily.', ar: 'على الرغم من جدوله المزدحم، إلا أنه يقرأ 20 صفحة يومياً.', note: 'اسم بعد Despite' }
    ],
    commonMistakes: [
      { wrong: 'Despite he was tired, he kept walking.', correct: 'Although he was tired, he kept walking.', reasonAr: 'بعد Despite لا نضع فاعلاً وفعلاً (he was)، بل نستخدم Although أو نقول Despite being tired.' }
    ],
    quiz: [
      {
        question: '________ the high price, millions of users purchased the device.',
        options: ['Despite', 'Although', 'Even though', 'Whereas'],
        correctIndex: 0,
        explanationAr: 'بعد الفراغ جاء اسم صريح (the high price) بدون فعل، لذا نستخدم (Despite).'
      }
    ]
  }
];

export const GrammarAcademy: React.FC<GrammarAcademyProps> = ({ lang, onBack, userLevel, onXPAdded }) => {
  const isRtl = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<'all' | 'tenses' | 'syntax' | 'modals' | 'connectors'>('all');
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(PRESET_TOPICS[0]);
  const [activeTab, setActiveTab] = useState<'learn' | 'visual' | 'quiz' | 'analyzer'>('learn');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sentence Analyzer State
  const [sentenceInput, setSentenceInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Text-to-speech helper
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectTopic = (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
    setActiveTab('learn');
  };

  const handleAnswerClick = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === selectedTopic.quiz[currentQuizIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex + 1 < selectedTopic.quiz.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      if (onXPAdded) {
        const calculatedXP = (quizScore + (selectedAnswer === selectedTopic.quiz[currentQuizIndex]?.correctIndex && !isAnswerSubmitted ? 1 : 0)) * 25 + 25;
        onXPAdded(calculatedXP, {
          lessonId: selectedTopic.id,
          title: isRtl ? selectedTopic.titleAr : selectedTopic.titleEn,
          score: quizScore,
          total: selectedTopic.quiz.length,
          level: selectedTopic.level
        });
      }
    }
  };

  const handleAnalyzeSentence = async () => {
    if (!sentenceInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/academy/grammar-explain-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic.titleEn,
          level: selectedTopic.level,
          customSentence: sentenceInput.trim()
        })
      });
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredTopics = activeCategory === 'all' 
    ? PRESET_TOPICS 
    : PRESET_TOPICS.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 p-3 sm:p-6 lg:p-8 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
              >
                {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
            )}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Brain size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isRtl ? 'أكاديمية القواعد والتراكيب الصحيحة' : 'Grammar & Syntax Academy'}
                </h1>
                <span className="bg-blue-50 text-blue-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-blue-200">
                  {isRtl ? 'علمي وتفاعلي 📐' : 'Scientific & Interactive 📐'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {isRtl 
                  ? 'تعليم القواعد الصحيحة بالمعادلات البصرية، تحليل الجمل التفاعلي، واختبارات قياس الفهم الفورية'
                  : 'Master correct English syntax with visual formulas, live sentence analyzer, and smart diagnostic quizzes.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              <Trophy size={16} />
              {isRtl ? 'نقاط القواعد:' : 'Grammar XP:'} 850
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Topics Navigation */}
        <div className="lg:col-span-4 space-y-4">
          {/* Category Filter Chips */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', labelAr: 'الكل', labelEn: 'All' },
              { id: 'tenses', labelAr: 'الأزمنة', labelEn: 'Tenses' },
              { id: 'syntax', labelAr: 'التراكيب', labelEn: 'Syntax' },
              { id: 'modals', labelAr: 'الأفعال المساعدة', labelEn: 'Modals' },
              { id: 'connectors', labelAr: 'الروابط', labelEn: 'Connectors' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {isRtl ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Topics List */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2.5 max-h-[70vh] overflow-y-auto">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              {isRtl ? 'الوحدات النحوية التفاعلية' : 'Grammar Modules'}
            </h3>

            {filteredTopics.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`w-full text-start p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-xs ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-150 text-slate-700'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1.5 bg-white rounded-xl shadow-xs border border-slate-100">
                    {topic.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-black text-xs sm:text-sm text-slate-900 truncate">
                        {isRtl ? topic.titleAr : topic.titleEn}
                      </h4>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-100/80 text-blue-800 shrink-0">
                        {topic.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {topic.formula}
                    </p>
                  </div>
                  <ChevronRight size={16} className={`shrink-0 text-slate-400 mt-2 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area: Main Interactive Workspace */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Action Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
            {[
              { id: 'learn', labelAr: '📖 الشرح والمعادلة', labelEn: '📖 Formula & Rule', icon: BookOpen },
              { id: 'visual', labelAr: '🎨 الخريطة البصرية والأخطاء', labelEn: '🎨 Visual & Mistakes', icon: Layers },
              { id: 'quiz', labelAr: '⚡ الاختبار التفاعلي', labelEn: '⚡ Smart Quiz', icon: Zap },
              { id: 'analyzer', labelAr: '🔬 محلل الجمل الذكي', labelEn: '🔬 Live Sentence Doctor', icon: Brain },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {isRtl ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* TAB 1: FORMULA & RULE EXPLANATION */}
          {activeTab === 'learn' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              {/* Header & CEFR Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {selectedTopic.category.toUpperCase()} • LEVEL {selectedTopic.level}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {isRtl ? selectedTopic.titleAr : selectedTopic.titleEn}
                  </h2>
                </div>
                <button
                  onClick={() => playAudio(selectedTopic.titleEn)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-black transition-all cursor-pointer border border-blue-200"
                >
                  <Volume2 size={16} />
                  {isRtl ? 'استمع للموضوع' : 'Listen'}
                </button>
              </div>

              {/* Conceptual Rule */}
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-800 text-sm leading-relaxed">
                <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-black text-xs">
                  <Lightbulb size={16} className="text-amber-500" />
                  {isRtl ? 'القاعدة الذهبية والمفهوم اللغوي:' : 'Pedagogical Concept:'}
                </div>
                {selectedTopic.ruleAr}
              </div>

              {/* Visual Formula Engine */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  {isRtl ? 'المعادلة التركيبية التفاعلية (Syntactic Formula)' : 'Syntactic Formula'}
                </h3>
                <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl shadow-inner space-y-3">
                  <div className="text-center font-mono text-sm sm:text-base text-amber-300 font-bold border-b border-slate-800 pb-2">
                    {selectedTopic.formula}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                    {selectedTopic.formulaParts.map((part, pIdx) => (
                      <div key={pIdx} className="bg-slate-800/90 border border-slate-700 p-2.5 rounded-xl text-center">
                        <div className="text-[10px] text-slate-400 font-bold mb-1">{part.label}</div>
                        <div className="text-xs font-black text-emerald-400 font-mono">{part.example}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practical Examples with Audio */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  {isRtl ? 'أمثلة تطبيقية ونطق صوتي مباشر' : 'Real Life Examples with Audio'}
                </h3>
                <div className="space-y-2.5">
                  {selectedTopic.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                          "{ex.en}"
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          {ex.ar}
                        </div>
                        {ex.note && (
                          <span className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-150">
                            💡 {ex.note}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => playAudio(ex.en)}
                        className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VISUAL TIMELINE & COMMON MISTAKES */}
          {activeTab === 'visual' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              {/* Timeline Diagram */}
              {selectedTopic.timeline && (
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    {isRtl ? 'الرسم البياني الزمني للعلاقة' : 'Timeline Representation'}
                  </h3>
                  <div className="p-4 bg-indigo-950 text-indigo-200 rounded-2xl font-mono text-xs sm:text-sm text-center border border-indigo-800 shadow-inner">
                    {selectedTopic.timeline}
                  </div>
                </div>
              )}

              {/* Common Pitfalls / Mistakes Analysis */}
              <div>
                <h3 className="text-xs font-black text-rose-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <XCircle size={16} />
                  {isRtl ? 'أبرز الأخطاء الشائعة وتحليلها العلمي' : 'Common Grammatical Mistakes to Avoid'}
                </h3>
                <div className="space-y-3">
                  {selectedTopic.commonMistakes.map((mistake, mIdx) => (
                    <div key={mIdx} className="p-4 rounded-2xl border border-rose-100 bg-rose-50/40 space-y-2">
                      <div className="flex items-center gap-2 text-rose-700 font-black text-xs sm:text-sm">
                        <XCircle size={16} className="shrink-0 text-rose-500" />
                        <span className="line-through">{mistake.wrong}</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-800 font-black text-xs sm:text-sm">
                        <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                        <span>{mistake.correct}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl text-xs text-slate-700 border border-slate-100 leading-relaxed font-medium">
                        <strong className="text-blue-700">{isRtl ? 'السبب العلمي: ' : 'Why: '}</strong>
                        {mistake.reasonAr}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: INTERACTIVE QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              {!quizCompleted ? (
                <div>
                  {/* Quiz Header & Progress */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
                    <span className="text-xs font-black text-slate-500">
                      {isRtl ? `السؤال ${currentQuizIndex + 1} من ${selectedTopic.quiz.length}` : `Question ${currentQuizIndex + 1} of ${selectedTopic.quiz.length}`}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {isRtl ? `الدرجة الحالية: ${quizScore}` : `Score: ${quizScore}`}
                      </span>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-900 font-bold text-base sm:text-lg mb-6 leading-relaxed">
                    {selectedTopic.quiz[currentQuizIndex].question}
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {selectedTopic.quiz[currentQuizIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswer === optIdx;
                      const isCorrect = optIdx === selectedTopic.quiz[currentQuizIndex].correctIndex;
                      
                      let btnStyle = "bg-white border-slate-200 hover:border-blue-300 text-slate-700";
                      if (isSelected && !isAnswerSubmitted) {
                        btnStyle = "bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20";
                      } else if (isAnswerSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-black";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-black";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleAnswerClick(optIdx)}
                          className={`w-full p-4 rounded-2xl border text-start text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswerSubmitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                          {isAnswerSubmitted && isSelected && !isCorrect && <XCircle size={18} className="text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswerSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1 mb-6"
                    >
                      <strong className="text-blue-700 block text-sm mb-1">
                        {isRtl ? '💡 التحليل والتوضيح النحوي:' : '💡 Explanation:'}
                      </strong>
                      <p>{selectedTopic.quiz[currentQuizIndex].explanationAr}</p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    {!isAnswerSubmitted ? (
                      <button
                        disabled={selectedAnswer === null}
                        onClick={handleSubmitAnswer}
                        className={`px-6 py-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
                          selectedAnswer !== null
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isRtl ? 'تأكيد الإجابة ✓' : 'Submit Answer ✓'}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        {currentQuizIndex + 1 < selectedTopic.quiz.length
                          ? (isRtl ? 'السؤال التالي ➔' : 'Next Question ➔')
                          : (isRtl ? 'عرض النتيجة النهائية 🏆' : 'View Results 🏆')}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Results Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <Trophy size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {isRtl ? 'أحسنت يا بطل!' : 'Outstanding Effort!'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {isRtl
                      ? `حققت ${quizScore} من ${selectedTopic.quiz.length} إجابات صحيحة!`
                      : `You scored ${quizScore} out of ${selectedTopic.quiz.length} correct answers!`}
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentQuizIndex(0);
                        setSelectedAnswer(null);
                        setIsAnswerSubmitted(false);
                        setQuizScore(0);
                        setQuizCompleted(false);
                      }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all cursor-pointer"
                    >
                      {isRtl ? 'إعادة الاختبار 🔄' : 'Retake Quiz 🔄'}
                    </button>
                    <button
                      onClick={() => setActiveTab('learn')}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      {isRtl ? 'مراجعة الدرس 📖' : 'Review Lesson 📖'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: LIVE SENTENCE DOCTOR & ANALYZER */}
          {activeTab === 'analyzer' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6"
            >
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isRtl ? 'محلل الجمل والتشخيص النحوي المباشر' : 'Live Sentence Doctor & Syntactic Analyzer'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isRtl
                    ? 'اكتب أي جملة باللغة الإنجليزية ليقوم المحلل بتفكيك أجزائها، وتحديد تركيبها بدقة، وتصحيح أي خطأ نحوي فوراً.'
                    : 'Type any English sentence to break down its syntactic components and verify its grammatical correctness in real time.'}
                </p>
              </div>

              <div className="space-y-3">
                <textarea
                  value={sentenceInput}
                  onChange={(e) => setSentenceInput(e.target.value)}
                  placeholder={isRtl ? 'اكتب جملتك هنا... (مثال: She have visited Riyadh last week)' : 'Type your sentence here... (e.g. She have visited Riyadh last week)'}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none resize-none h-24"
                  dir="ltr"
                />
                <div className="flex justify-end">
                  <button
                    disabled={!sentenceInput.trim() || isAnalyzing}
                    onClick={handleAnalyzeSentence}
                    className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      sentenceInput.trim() && !isAnalyzing
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        {isRtl ? 'جاري التحليل العلمي...' : 'Analyzing...'}
                      </>
                    ) : (
                      <>
                        <Brain size={16} />
                        {isRtl ? 'فحص وتحليل الجملة 🔬' : 'Analyze Sentence 🔬'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Analysis Result */}
              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-black text-blue-700 uppercase">
                      {isRtl ? 'تقرير الفحص النحوي المعتمد' : 'Syntactic Analysis Report'}
                    </span>
                    <button
                      onClick={() => playAudio(sentenceInput)}
                      className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 size={14} />
                      {isRtl ? 'استماع' : 'Listen'}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {analysisResult.ruleSummaryAr}
                  </div>

                  {analysisResult.formula && (
                    <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl text-center">
                      {analysisResult.formula}
                    </div>
                  )}

                  {analysisResult.commonMistakes && analysisResult.commonMistakes.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-black text-rose-600">
                        {isRtl ? 'التصحيح المقترح والسبب:' : 'Correction & Reason:'}
                      </div>
                      {analysisResult.commonMistakes.map((cm: any, idx: number) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="text-emerald-700 font-bold">✓ {cm.correct}</div>
                          <div className="text-slate-600">{cm.reason}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
