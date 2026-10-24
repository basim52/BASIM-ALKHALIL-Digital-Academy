import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Volume2,
  Brain,
  Layers,
  RefreshCw,
  Trophy,
  Zap,
  Lightbulb,
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
      { label: 'Subject (الفاعل)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'I / They / She' },
      { label: 'Auxiliary (الفعل المساعد)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'have / has' },
      { label: 'Verb 3 (التصريف الثالث)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'visited / lived' },
      { label: 'Complement (التكملة)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'London for 3 years.' }
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
      { label: 'If Clause (جملة الشرط)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'If you study hard,' },
      { label: 'Comma (فاصلة)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: ',' },
      { label: 'Main Clause (جواب الشرط)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'you will pass the exam.' }
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
      { label: 'Object (نائب الفاعل)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'The report / The houses' },
      { label: 'Verb to Be', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'is / was / have been' },
      { label: 'Main Verb (V3)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'written / built' },
      { label: 'Agent (اختياري)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'by the engineer.' }
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
      { label: 'Must be (مؤكد 100%)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'He must be at work.' },
      { label: 'Might/May (محتمل 50%)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'She might join us.' },
      { label: 'Can\'t be (مستحيل 0%)', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'It can\'t be true!' }
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
      { label: 'Although + جملة كاملة', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'Although it was raining,' },
      { label: 'Despite + اسم أو فعل -ing', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: 'Despite the heavy rain,' },
      { label: 'However / Therefore', color: 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40', example: '; however, we won.' }
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

const TOPIC_EN_MAP: Record<string, string> = {
  'يُستخدم للحديث عن تجارب ماضية لها أثر أو صلة مباشرة بالحاضر، أو أحداث حدثت في وقت غير محدد بالماضي، أو أفعال بدأت في الماضي وما زالت مستمرة حتى الآن مع (Since / For).':
    'Used for past experiences connected to the present, actions at an unspecified past time, or actions that started in the past and continue now with Since / For.',
  'تُستخدم للتعبير عن نتائج حقيقية أو متوقعة الحدوث في المستقبل في حال تحقق شرط معين في الحاضر.':
    'Used to express real or likely future results when a present condition is met.',
  'يُستخدم عندما يكون التركيز على الحدث نفسه أو المفعول به أكثر من الفاعل، أو عندما يكون الفاعل مجهولاً أو غير مهم أو بديهياً.':
    'Used when the focus is on the action or object rather than the doer, or when the doer is unknown or obvious.',
  'نستخدم (Must be) للتأكد بنسبة 100%، و(Can\'t be) للاستحالة المؤكدة، و(Might / May / Could) للاحتمالية والشك.':
    'Use "must be" for 100% certainty, "can\'t be" for impossibility, and "might / may / could" for possibility.',
  'تُستخدم للربط المنطقي بين الأفكار في الكتابة الأكاديمية والتعبير الفصيح: (Although / Despite / However / Therefore / Furthermore).':
    'Used to connect ideas logically in academic writing and fluent speech: Although, Despite, However, Therefore, Furthermore.',
  'Object + Verb to Be (المناسب للزمن) + Past Participle (V3)':
    'Object + Verb to Be (matching tense) + Past Participle (V3)',
  'حدث في الماضي ────────────────> مستمر أو له أثر حاضر الآن 🌟':
    'Past action ────────────────> Continues or affects the present now 🌟',
  'الشرط في الحاضر [مضارع بسيط] ──────> النتيجة في المستقبل [will + مصدر]':
    'Present condition [Present Simple] ──────> Future result [will + base verb]',
  'Subject (الفاعل)': 'Subject',
  'Auxiliary (الفعل المساعد)': 'Auxiliary Verb',
  'Verb 3 (التصريف الثالث)': 'Past Participle (V3)',
  'Complement (التكملة)': 'Complement',
  'If Clause (جملة الشرط)': 'If Clause (Condition)',
  'Comma (فاصلة)': 'Comma',
  'Main Clause (جواب الشرط)': 'Main Clause (Result)',
  'Object (نائب الفاعل)': 'Object (Passive Subject)',
  'Agent (اختياري)': 'Agent (Optional)',
  'Must be (مؤكد 100%)': 'Must be (100% certain)',
  'Might/May (محتمل 50%)': 'Might / May (50% possible)',
  'Can\'t be (مستحيل 0%)': 'Can\'t be (0% impossible)',
  'Although + جملة كاملة': 'Although + Full Clause',
  'Despite + اسم أو فعل -ing': 'Despite + Noun / -ing',
  'استمرار الفعل حتى الحاضر': 'Action continuing up to the present',
  'أثر حاضر مباشر': 'Direct present result',
  'سؤال عن تجارب الحياة': 'Life experience question',
  'موقف محتمل الوقوع': 'Likely future situation',
  'تقديم جواب الشرط على جملة if': 'Main clause placed before the if-clause',
  'مبني للمجهول في المضارع البسيط': 'Present Simple passive',
  'مبني للمجهول في الماضي البسيط': 'Past Simple passive',
  'تأكد بالدليل': 'Certainty based on evidence',
  'استحالة مؤكدة': 'Certain impossibility',
  'جملة تباين': 'Contrast clause',
  'اسم بعد Despite': 'Noun phrase after Despite',
  'وجود كلمة زمنية محددة مثل (yesterday) يفرض استخدام الماضي البسيط وليس المضارع التام.':
    'A finished past time word like "yesterday" requires the Past Simple, not the Present Perfect.',
  'نستخدم (For) مع المدد الإجمالية، بينما نستخدم (Since) مع نقطة بداية الزمن المحددة.':
    'Use "for" with a duration of time, and "since" with a specific starting point.',
  'لا نضع will في جملة if إطلاقاً، بل نستخدم المضارع البسيط في شق الشرط.':
    'Never use "will" inside the if-clause; use the Present Simple for the condition.',
  'بعد حرف الجر (by) نستخدم ضمير المفعول به (him) وليس ضمير الفاعل.':
    'After the preposition "by", use an object pronoun (him), not a subject pronoun.',
  'للتعبير عن استحالة الاستنتاج نستخدم (can\'t be) حصراً، ولا نستخدم (mustn\'t) التي تعني النهي والمنع.':
    'To express logical impossibility, use "can\'t be", not "mustn\'t" (which means prohibition).',
  'بعد Despite لا نضع فاعلاً وفعلاً (he was)، بل نستخدم Although أو نقول Despite being tired.':
    'Do not put a subject + verb after "Despite"; use "Although" or "Despite being tired".',
  'نستخدم المضارع التام (has studied) لأن الدراسة بدأت بالماضي وما زالت مستمرة بدلالة (for four years).':
    'Use the Present Perfect (has studied) because the action started in the past and continues now (for four years).',
  'لوجود (last year) وهو زمن ماضٍ منتهٍ ومحدد، نستخدم الماضي البسيط (travelled).':
    'Because "last year" is a finished past time, use the Past Simple (travelled).',
  'بعد Have/Has في صيغة السؤال التام يجب دائماً استخدام التصريف الثالث للفعل (Visited).':
    'After Have/Has in Present Perfect questions, always use the past participle (visited).',
  'في الشق الشرطي الأول مع (If) نستخدم المضارع البسيط (wake up).':
    'In the First Conditional if-clause, use the Present Simple (wake up).',
  'جواب الشرط يعبر عن المستقبل باستخدام (will + infinitive).':
    'The main clause expresses the future result using will + base verb.',
  'المفعول به جمع (Emails) والزمن حقيقة يومية عامة، لذا نستخدم (are + V3 = are sent).':
    'The subject "Emails" is plural and the sentence states a daily fact, so use are + V3 (are sent).',
  'رؤية الثلوج دليل قاطع على أن الجو متجمد، لذا نستخدم (must be).':
    'Seeing snow falling is strong evidence that it is freezing, so use "must be".',
  'بعد الفراغ جاء اسم صريح (the high price) بدون فعل، لذا نستخدم (Despite).':
    'A noun phrase (the high price) follows the blank without a verb, so use "Despite".',
};

const CATEGORIES = [
  { id: 'all', labelAr: 'الكل', labelEn: 'All' },
  { id: 'tenses', labelAr: 'الأزمنة', labelEn: 'Tenses' },
  { id: 'syntax', labelAr: 'التراكيب', labelEn: 'Syntax' },
  { id: 'modals', labelAr: 'الأفعال المساعدة', labelEn: 'Modals' },
  { id: 'connectors', labelAr: 'الروابط', labelEn: 'Connectors' },
] as const;

export const GrammarAcademy: React.FC<GrammarAcademyProps> = ({ lang, onXPAdded }) => {
  const tHook = useT();
  const isEnMode = lang === 'en' || tHook('ar', 'en') === 'en';
  const isRtl = !isEnMode;
  const t = (ar: string, en: string) => (isEnMode ? en : ar);
  const tr = (ar: string) => t(ar, TOPIC_EN_MAP[ar] || toEnglish(ar));

  const [activeCategory, setActiveCategory] = useState<'all' | 'tenses' | 'syntax' | 'modals' | 'connectors'>('all');
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(PRESET_TOPICS[0]);
  const [activeTab, setActiveTab] = useState<'learn' | 'visual' | 'quiz' | 'analyzer'>('learn');
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

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
      managedSpeak(utterance);
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
      setCompletedTopics(prev => (prev.includes(selectedTopic.id) ? prev : [...prev, selectedTopic.id]));
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
    : PRESET_TOPICS.filter(topic => topic.category === activeCategory);

  const currentCatObj = CATEGORIES.find(c => c.id === selectedTopic.category) || CATEGORIES[0];

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} data-testid="grammar-academy">
      {/* Category Gold Badge Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ProgressPill>
            📐 {t(currentCatObj.labelAr, currentCatObj.labelEn)} • {selectedTopic.level}
          </ProgressPill>
          <ProgressPill>
            🏆 {t('نقاط القواعد:', 'Grammar XP:')} 850
          </ProgressPill>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer ${
                  active
                    ? 'bg-[#002147] text-[#E6C36A] border border-[#C49E3A]'
                    : 'bg-white text-[#002147] border border-[#C49E3A]/40 hover:border-[#C49E3A]'
                }`}
              >
                {t(cat.labelAr, cat.labelEn)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar: Topics List with LessonTile */}
        <div className="lg:col-span-4">
          <GoldCard className="space-y-2.5">
            <h3 className="text-xs font-black text-[#002147]/70 uppercase tracking-wider mb-1">
              {t('الوحدات النحوية التفاعلية', 'Grammar Modules')}
            </h3>
            <div className="space-y-2 max-h-[65vh] overflow-y-auto">
              {filteredTopics.map((topic, idx) => (
                <LessonTile
                  key={topic.id}
                  order={idx + 1}
                  emoji={topic.icon}
                  title={t(topic.titleAr, topic.titleEn)}
                  subtitle={tr(topic.formula)}
                  level={topic.level}
                  active={selectedTopic.id === topic.id}
                  done={completedTopics.includes(topic.id)}
                  onClick={() => handleSelectTopic(topic)}
                />
              ))}
            </div>
          </GoldCard>
        </div>

        {/* Right Content Area: Main Interactive Workspace */}
        <div className="lg:col-span-8 space-y-3">
          {/* Pill Tabs (navy when active, white with gold border otherwise) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {[
              { id: 'learn', labelAr: '📖 الشرح والمعادلة', labelEn: '📖 Formula & Rule', icon: BookOpen },
              { id: 'visual', labelAr: '🎨 الخريطة البصرية والأخطاء', labelEn: '🎨 Visual & Mistakes', icon: Layers },
              { id: 'quiz', labelAr: '⚡ الاختبار التفاعلي', labelEn: '⚡ Smart Quiz', icon: Zap },
              { id: 'analyzer', labelAr: '🔬 محلل الجمل الذكي', labelEn: '🔬 Live Sentence Doctor', icon: Brain },
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

          {/* Single fade transition between tabs */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
          >
            {/* TAB 1: FORMULA & RULE EXPLANATION */}
            {activeTab === 'learn' && (
              <GoldCard className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#C49E3A]/25">
                  <div>
                    <ProgressPill>
                      {t(currentCatObj.labelAr, currentCatObj.labelEn)} • {selectedTopic.level}
                    </ProgressPill>
                    <h2 className="text-lg sm:text-xl font-black text-[#002147] mt-2">
                      {t(selectedTopic.titleAr, selectedTopic.titleEn)}
                    </h2>
                  </div>
                  <GhostButton onClick={() => playAudio(selectedTopic.titleEn)}>
                    <Volume2 size={15} />
                    {t('استمع للموضوع', 'Listen')}
                  </GhostButton>
                </div>

                {/* Conceptual Rule with small Noura TutorFace */}
                <div className="p-3.5 sm:p-4 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 flex items-start gap-3">
                  <TutorFace tutor="noura" size="sm" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 text-[#002147] font-black text-xs">
                      <Lightbulb size={15} className="text-[#C49E3A]" />
                      <span>{t('نورة • القاعدة الذهبية والمفهوم اللغوي:', 'Noura • Pedagogical Concept:')}</span>
                    </div>
                    <p className="text-[#002147] text-xs sm:text-sm font-bold leading-relaxed">
                      {tr(selectedTopic.ruleAr)}
                    </p>
                  </div>
                </div>

                {/* Visual Formula Engine */}
                <div>
                  <h3 className="text-xs font-black text-[#002147]/70 uppercase tracking-wider mb-2.5">
                    {t('المعادلة التركيبية التفاعلية (Syntactic Formula)', 'Syntactic Formula')}
                  </h3>
                  <div className="p-4 sm:p-5 bg-[#001a38] text-white rounded-2xl border-2 border-[#C49E3A] space-y-3">
                    <div className="text-center font-mono text-sm sm:text-base text-[#E6C36A] font-black border-b border-[#C49E3A]/30 pb-2" dir="ltr">
                      {tr(selectedTopic.formula)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                      {selectedTopic.formulaParts.map((part, pIdx) => (
                        <div key={pIdx} className="bg-[#002147] border border-[#C49E3A]/40 p-2.5 rounded-xl text-center">
                          <div className="text-[11px] text-white/80 font-bold mb-1">{tr(part.label)}</div>
                          <div className="text-xs font-black text-[#E6C36A] font-mono" dir="ltr">{part.example}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Practical Examples with Audio */}
                <div>
                  <h3 className="text-xs font-black text-[#002147]/70 uppercase tracking-wider mb-2.5">
                    {t('أمثلة تطبيقية ونطق صوتي مباشر', 'Real Life Examples with Audio')}
                  </h3>
                  <div className="space-y-2.5">
                    {selectedTopic.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3.5 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="text-sm font-black text-[#002147]" dir="ltr">
                            "{ex.en}"
                          </div>
                          {isRtl && (
                            <div className="text-xs text-[#002147]/75 font-bold">
                              {ex.ar}
                            </div>
                          )}
                          {ex.note && (
                            <span className="inline-block text-[11px] font-black text-[#002147] bg-[#E6C36A]/30 px-2.5 py-0.5 rounded-full border border-[#C49E3A]/50">
                              💡 {tr(ex.note)}
                            </span>
                          )}
                        </div>
                        <GhostButton
                          onClick={() => playAudio(ex.en)}
                          aria-label={t('استماع', 'Listen')}
                        >
                          <Volume2 size={15} />
                        </GhostButton>
                      </div>
                    ))}
                  </div>
                </div>
              </GoldCard>
            )}

            {/* TAB 2: VISUAL TIMELINE & COMMON MISTAKES */}
            {activeTab === 'visual' && (
              <GoldCard className="space-y-5">
                {selectedTopic.timeline && (
                  <div>
                    <h3 className="text-xs font-black text-[#002147]/70 uppercase tracking-wider mb-2">
                      {t('الرسم البياني الزمني للعلاقة', 'Timeline Representation')}
                    </h3>
                    <div className="p-4 bg-[#002147] text-[#E6C36A] rounded-2xl font-mono text-xs sm:text-sm text-center border-2 border-[#C49E3A] font-black">
                      {tr(selectedTopic.timeline)}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-black text-[#002147] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <XCircle size={16} className="text-[#C49E3A]" />
                    {t('أبرز الأخطاء الشائعة وتحليلها العلمي', 'Common Grammatical Mistakes to Avoid')}
                  </h3>
                  <div className="space-y-3">
                    {selectedTopic.commonMistakes.map((mistake, mIdx) => (
                      <div key={mIdx} className="p-4 rounded-2xl border border-[#C49E3A]/40 bg-[#fdfaf3] space-y-2">
                        <div className="flex items-center gap-2 text-red-700 font-black text-xs sm:text-sm" dir="ltr">
                          <XCircle size={16} className="shrink-0 text-red-600" />
                          <span className="line-through">{mistake.wrong}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-800 font-black text-xs sm:text-sm" dir="ltr">
                          <CheckCircle2 size={16} className="shrink-0 text-green-600" />
                          <span>{mistake.correct}</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-xl text-xs text-[#002147] border border-[#C49E3A]/30 leading-relaxed font-bold">
                          <strong className="text-[#002147]">{t('السبب العلمي: ', 'Why: ')}</strong>
                          {tr(mistake.reasonAr)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GoldCard>
            )}

            {/* TAB 3: INTERACTIVE QUIZ */}
            {activeTab === 'quiz' && (
              <GoldCard className="space-y-5">
                {!quizCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#C49E3A]/25">
                      <span className="text-xs font-black text-[#002147]">
                        {t(
                          `السؤال ${currentQuizIndex + 1} من ${selectedTopic.quiz.length}`,
                          `Question ${currentQuizIndex + 1} of ${selectedTopic.quiz.length}`
                        )}
                      </span>
                      <ProgressPill>
                        {t(`الدرجة الحالية: ${quizScore}`, `Score: ${quizScore}`)}
                      </ProgressPill>
                    </div>

                    <div
                      dir="ltr"
                      className="p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-[#002147] font-black text-base sm:text-lg leading-relaxed"
                    >
                      {selectedTopic.quiz[currentQuizIndex].question}
                    </div>

                    <div className="space-y-2.5" dir="ltr">
                      {selectedTopic.quiz[currentQuizIndex].options.map((opt, optIdx) => {
                        const isSelected = selectedAnswer === optIdx;
                        const isCorrect = optIdx === selectedTopic.quiz[currentQuizIndex].correctIndex;
                        const state = !isAnswerSubmitted
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
                            selected={isSelected && !isAnswerSubmitted}
                            state={state}
                            disabled={isAnswerSubmitted}
                            onClick={() => handleAnswerClick(optIdx)}
                          />
                        );
                      })}
                    </div>

                    {isAnswerSubmitted && (
                      <div className="p-3.5 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-xs text-[#002147] flex items-start gap-3">
                        <TutorFace tutor="noura" size="sm" />
                        <div className="space-y-1 flex-1 min-w-0">
                          <strong className="text-[#002147] block text-xs sm:text-sm font-black">
                            {t('💡 التحليل والتوضيح النحوي:', '💡 Explanation:')}
                          </strong>
                          <p className="font-bold leading-relaxed">
                            {tr(selectedTopic.quiz[currentQuizIndex].explanationAr)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-1">
                      {!isAnswerSubmitted ? (
                        <PrimaryButton
                          disabled={selectedAnswer === null}
                          onClick={handleSubmitAnswer}
                        >
                          {t('تأكيد الإجابة ✓', 'Submit Answer ✓')}
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton onClick={handleNextQuestion}>
                          {currentQuizIndex + 1 < selectedTopic.quiz.length
                            ? t('السؤال التالي ➔', 'Next Question ➔')
                            : t('عرض النتيجة النهائية 🏆', 'View Results 🏆')}
                        </PrimaryButton>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Result screen -> navy card with the real score */
                  <div className="rounded-2xl bg-[#002147] text-white border-2 border-[#C49E3A] p-6 text-center space-y-4 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-[#001a38] border-2 border-[#C49E3A] text-[#E6C36A] flex items-center justify-center mx-auto">
                      <Trophy size={28} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#E6C36A]">
                      {t('أحسنت يا بطل!', 'Outstanding Effort!')}
                    </h3>
                    <p className="text-2xl font-black text-white">
                      {quizScore} / {selectedTopic.quiz.length}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white/85">
                      {t(
                        `حققت ${quizScore} من ${selectedTopic.quiz.length} إجابات صحيحة!`,
                        `You scored ${quizScore} out of ${selectedTopic.quiz.length} correct answers!`
                      )}
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                      <GhostButton
                        onClick={() => {
                          setCurrentQuizIndex(0);
                          setSelectedAnswer(null);
                          setIsAnswerSubmitted(false);
                          setQuizScore(0);
                          setQuizCompleted(false);
                        }}
                      >
                        {t('إعادة الاختبار 🔄', 'Retake Quiz 🔄')}
                      </GhostButton>
                      <PrimaryButton onClick={() => setActiveTab('learn')}>
                        {t('مراجعة الدرس 📖', 'Review Lesson 📖')}
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              </GoldCard>
            )}

            {/* TAB 4: LIVE SENTENCE DOCTOR & ANALYZER */}
            {activeTab === 'analyzer' && (
              <GoldCard className="space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147]">
                    {t('محلل الجمل والتشخيص النحوي المباشر', 'Live Sentence Doctor & Syntactic Analyzer')}
                  </h3>
                  <p className="text-xs font-bold text-[#002147]/70 mt-1">
                    {t(
                      'اكتب أي جملة باللغة الإنجليزية ليقوم المحلل بتفكيك أجزائها، وتحديد تركيبها بدقة، وتصحيح أي خطأ نحوي فوراً.',
                      'Type any English sentence to break down its syntactic components and verify its grammatical correctness in real time.'
                    )}
                  </p>
                </div>

                <div className="space-y-3">
                  <textarea
                    value={sentenceInput}
                    onChange={(e) => setSentenceInput(e.target.value)}
                    placeholder={t(
                      'اكتب جملتك هنا... (مثال: She have visited Riyadh last week)',
                      'Type your sentence here... (e.g. She have visited Riyadh last week)'
                    )}
                    className="w-full p-3.5 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 focus:border-[#C49E3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] text-sm font-bold text-[#002147] resize-none h-24"
                    dir="ltr"
                  />
                  <div className="flex justify-end">
                    <PrimaryButton
                      disabled={!sentenceInput.trim() || isAnalyzing}
                      onClick={handleAnalyzeSentence}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          {t('جاري التحليل العلمي...', 'Analyzing...')}
                        </>
                      ) : (
                        <>
                          <Brain size={15} />
                          {t('فحص وتحليل الجملة 🔬', 'Analyze Sentence 🔬')}
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </div>

                {analysisResult && (
                  <div className="p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 space-y-3">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#C49E3A]/25">
                      <span className="text-xs font-black text-[#002147] uppercase">
                        {t('تقرير الفحص النحوي المعتمد', 'Syntactic Analysis Report')}
                      </span>
                      <GhostButton onClick={() => playAudio(sentenceInput)}>
                        <Volume2 size={14} />
                        {t('استماع', 'Listen')}
                      </GhostButton>
                    </div>

                    <div className="text-xs sm:text-sm text-[#002147] leading-relaxed font-bold">
                      {tr(analysisResult.ruleSummaryAr || '')}
                    </div>

                    {analysisResult.formula && (
                      <div className="p-3 bg-[#001a38] text-[#E6C36A] border border-[#C49E3A] font-mono text-xs font-black rounded-xl text-center" dir="ltr">
                        {analysisResult.formula}
                      </div>
                    )}

                    {analysisResult.commonMistakes && analysisResult.commonMistakes.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-xs font-black text-[#002147]">
                          {t('التصحيح المقترح والسبب:', 'Correction & Reason:')}
                        </div>
                        {analysisResult.commonMistakes.map((cm: any, idx: number) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-[#C49E3A]/30 text-xs space-y-1">
                            <div className="text-green-700 font-black" dir="ltr">✓ {cm.correct}</div>
                            <div className="text-[#002147]/80 font-bold">{tr(cm.reason || '')}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </GoldCard>
            )}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
};
