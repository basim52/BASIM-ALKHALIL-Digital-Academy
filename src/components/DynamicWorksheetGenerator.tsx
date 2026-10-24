import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Award,
  RefreshCw,
} from 'lucide-react';
import { useT } from '../lib/explainLang';
import {
  SectionShell,
  GoldCard,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace,
} from './ui/academy';

interface DynamicWorksheetGeneratorProps {
  lang: 'ar' | 'en';
  userName?: string;
  userLevel?: string;
  onBack: () => void;
  onAwardXp?: (amount: number) => void;
}

interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
  explanationEn: string;
}

interface FillBlankQuestion {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correctWord: string;
  hintAr: string;
}

interface GeneratedWorksheet {
  titleEn: string;
  titleAr: string;
  level: string;
  topic: string;
  grammarRuleSummaryEn: string;
  grammarRuleSummaryAr: string;
  mcqQuestions: MCQQuestion[];
  fillInBlankQuestions: FillBlankQuestion[];
  wordBank: string[];
  writingPromptEn: string;
  writingPromptAr: string;
}

const TOPICS = [
  { id: 'present_perfect', labelAr: 'المضارع التام (Present Perfect)', labelEn: 'Present Perfect Tense', icon: '⏳' },
  { id: 'travel_airport', labelAr: 'المحادثة في المطار والسفر', labelEn: 'Airport & Travel Vocabulary', icon: '✈️' },
  { id: 'business_emails', labelAr: 'مراسلات العمل الرسمية', labelEn: 'Formal Business Emails', icon: '💼' },
  { id: 'conditionals', labelAr: 'الجمل الشرطية (If Conditionals)', labelEn: 'If Conditionals (Type 1 & 2)', icon: '🔀' },
  { id: 'food_restaurant', labelAr: 'الطلب في المطاعم والمقاهي', labelEn: 'Ordering at Restaurants', icon: '🍽️' },
  { id: 'academic_connectors', labelAr: 'الروابط الأكاديمية للمقالات', labelEn: 'Academic Essay Connectors', icon: '🎓' },
];

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

const FALLBACK_WORKSHEETS: Record<string, GeneratedWorksheet> = {
  present_perfect: {
    titleEn: 'Mastering the Present Perfect Tense',
    titleAr: 'إتقان زمن المضارع التام (Present Perfect)',
    level: 'B1',
    topic: 'Present Perfect Tense',
    grammarRuleSummaryEn:
      'Form: Have / Has + Past Participle (V3). Used for actions that started in the past and continue to the present, or past actions with a visible result now.',
    grammarRuleSummaryAr:
      'القاعدة الذهبية: يتكون من (Have / Has + التصريف الثالث للفعل V3). يُستخدم للتعبير عن حدث بدأ في الماضي ولا يزال مستمراً، أو حدث انتهى للتو وله أثر في الحاضر.',
    wordBank: ['already', 'since', 'never', 'for', 'visited'],
    mcqQuestions: [
      {
        id: 1,
        question: 'She _______ to London three times in her life.',
        options: ['have been', 'has been', 'was been', 'is being'],
        correctIndex: 1,
        explanationAr: 'الفاعل المفرد (She) يأخذ (has) متبوعاً بالتصريف الثالث (been).',
        explanationEn: 'Singular subject (She) takes "has" + past participle "been".',
      },
      {
        id: 2,
        question: 'We have lived in Riyadh _______ 2019.',
        options: ['for', 'since', 'ago', 'during'],
        correctIndex: 1,
        explanationAr: 'نستخدم (since) مع نقطة زمنية محددة مثل سنة 2019.',
        explanationEn: 'Use "since" with a specific point in time (2019).',
      },
      {
        id: 3,
        question: 'Have you _______ finished your English homework?',
        options: ['yet', 'already', 'since', 'for'],
        correctIndex: 1,
        explanationAr: 'تأتي (already) بين الفعل المساعد والتصريف الثالث للتعبير عن الإنجاز المبكر.',
        explanationEn: '"Already" is placed before the main verb to emphasize early completion.',
      },
      {
        id: 4,
        question: 'They _______ seen that documentary yet.',
        options: ["hasn't", "haven't", "didn't", "don't"],
        correctIndex: 1,
        explanationAr: 'وجود كلمة (yet) في نهاية الجملة المنفية يدل على المضارع التام مع الفاعل الجمع (They -> haven’t).',
        explanationEn: '"Yet" signals present perfect negative; plural "They" takes "haven\'t".',
      },
      {
        id: 5,
        question: 'My brother has worked at this hospital _______ five years.',
        options: ['since', 'for', 'from', 'in'],
        correctIndex: 1,
        explanationAr: 'نستخدم (for) مع المدة الزمنية الكاملة (five years).',
        explanationEn: 'Use "for" with a duration of time (five years).',
      },
    ],
    fillInBlankQuestions: [
      {
        id: 1,
        sentenceBefore: 'I have ',
        sentenceAfter: ' eaten sushi before, so this is my first time.',
        correctWord: 'never',
        hintAr: 'أبداً / ولا مرة',
      },
      {
        id: 2,
        sentenceBefore: 'Sara has studied English ',
        sentenceAfter: ' six months.',
        correctWord: 'for',
        hintAr: 'لمدة زمنية',
      },
      {
        id: 3,
        sentenceBefore: 'We have ',
        sentenceAfter: ' the National Museum twice this year.',
        correctWord: 'visited',
        hintAr: 'التصريف الثالث من يزور',
      },
      {
        id: 4,
        sentenceBefore: 'He has ',
        sentenceAfter: ' booked the flight tickets!',
        correctWord: 'already',
        hintAr: 'بالفعل / مسبقاً',
      },
    ],
    writingPromptEn:
      'Write 3 sentences about achievements or experiences you have accomplished this year using the Present Perfect tense.',
    writingPromptAr:
      'اكتب ٣ جمل مفيدة عن إنجازات أو تجارب قمت بها هذا العام مستخدماً زمن المضارع التام (have/has + V3).',
  },
  default: {
    titleEn: 'Comprehensive English Practice Worksheet',
    titleAr: 'ورقة عمل تطبيقية شاملة في اللغة الإنجليزية',
    level: 'B1',
    topic: 'Practical Communication & Grammar',
    grammarRuleSummaryEn:
      'Focus on context clues, subject-verb agreement, and natural collocations used in everyday British and American English.',
    grammarRuleSummaryAr:
      'التركيز الأكاديمي: انتبه لتوافق الفاعل مع الفعل، واستخدم المتلازمات اللفظية الطبيعية حسب سياق الجملة.',
    wordBank: ['boarding', 'fluent', 'schedule', 'politely', 'confirm'],
    mcqQuestions: [
      {
        id: 1,
        question: 'Could you please _______ my reservation for tomorrow evening?',
        options: ['confirm', 'confirms', 'confirming', 'confirmed'],
        correctIndex: 0,
        explanationAr: 'بعد (Could you please) يأتي الفعل في المصدر المجرد (confirm).',
        explanationEn: 'Modal requests with "Could you" require the base verb "confirm".',
      },
      {
        id: 2,
        question: 'If I _______ more free time, I would practice speaking every day.',
        options: ['have', 'had', 'will have', 'having'],
        correctIndex: 1,
        explanationAr: 'الحالة الشرطية الثانية (If + Past Simple -> would + infinitive).',
        explanationEn: 'Second conditional uses past simple "had" in the if-clause.',
      },
      {
        id: 3,
        question: 'Passengers must show their _______ pass at Gate 14.',
        options: ['board', 'boarding', 'boarded', 'boards'],
        correctIndex: 1,
        explanationAr: 'المصطلح الصحيح لبطاقة صعود الطائرة هو (boarding pass).',
        explanationEn: '"Boarding pass" is the standard compound noun.',
      },
      {
        id: 4,
        question: 'Furthermore, regular reading significantly _______ your vocabulary.',
        options: ['expand', 'expands', 'expanding', 'expanded'],
        correctIndex: 1,
        explanationAr: 'الفاعل المفرد (regular reading) يأخذ فعل مضارع مضافاً له s (expands).',
        explanationEn: 'Singular gerund phrase "regular reading" takes singular verb "expands".',
      },
    ],
    fillInBlankQuestions: [
      {
        id: 1,
        sentenceBefore: 'Please check the flight ',
        sentenceAfter: ' on the screen.',
        correctWord: 'schedule',
        hintAr: 'جدول المواعيد',
      },
      {
        id: 2,
        sentenceBefore: 'She speaks ',
        sentenceAfter: ' English after completing the academy track.',
        correctWord: 'fluent',
        hintAr: 'بطلاقة / فصيح',
      },
      {
        id: 3,
        sentenceBefore: 'Always ask ',
        sentenceAfter: ' when requesting assistance.',
        correctWord: 'politely',
        hintAr: 'بأدب ولطف',
      },
      {
        id: 4,
        sentenceBefore: 'We need to ',
        sentenceAfter: ' our meeting time via email.',
        correctWord: 'confirm',
        hintAr: 'يؤكد',
      },
    ],
    writingPromptEn:
      'Write a short paragraph (3–4 sentences) applying at least three words from today’s worksheet in a real-life situation.',
    writingPromptAr:
      'اكتب فقرة قصيرة (٣-٤ جمل) توظف فيها ثلاث كلمات على الأقل من ورقة عمل اليوم في موقف واقعي.',
  },
};

export const DynamicWorksheetGenerator: React.FC<DynamicWorksheetGeneratorProps> = ({
  lang,
  userName = 'Student',
  userLevel = 'B1',
  onAwardXp,
}) => {
  const t = useT();
  const isRtl = lang === 'ar';

  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0].id);
  const [customTopic, setCustomTopic] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>(userLevel || 'B1');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [worksheet, setWorksheet] = useState<GeneratedWorksheet>(
    FALLBACK_WORKSHEETS.present_perfect
  );
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  // Interactive Solving State
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [checkedScore, setCheckedScore] = useState<number | null>(null);

  const resetInteractiveState = () => {
    setMcqAnswers({});
    setFillAnswers({});
    setCheckedScore(null);
  };

  const handleGenerateWorksheet = async () => {
    setIsGenerating(true);
    resetInteractiveState();

    const topicObj = TOPICS.find((tp) => tp.id === selectedTopic);
    const topicLabel =
      customTopic.trim() || (topicObj ? topicObj.labelEn : 'English Grammar');

    try {
      const response = await fetch('/api/ai/generate-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicLabel,
          level: selectedLevel,
          studentName: userName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.mcqQuestions && Array.isArray(data.mcqQuestions)) {
          setWorksheet(data);
          setIsGenerating(false);
          return;
        }
      }
    } catch {
      // Fallback to curated worksheet if offline
    }

    await new Promise((r) => setTimeout(r, 600));
    const base =
      selectedTopic === 'present_perfect' && !customTopic.trim()
        ? FALLBACK_WORKSHEETS.present_perfect
        : {
            ...FALLBACK_WORKSHEETS.default,
            titleEn: `${topicLabel} — Level ${selectedLevel} Practice`,
            titleAr: `ورقة عمل تطبيقية: ${
              customTopic.trim() || topicObj?.labelAr || ''
            } (${selectedLevel})`,
            level: selectedLevel,
            topic: topicLabel,
          };

    setWorksheet({ ...base, level: selectedLevel });
    setIsGenerating(false);
  };

  const handleCheckInteractiveAnswers = () => {
    let score = 0;
    worksheet.mcqQuestions.forEach((q) => {
      if (mcqAnswers[q.id] === q.correctIndex) score += 1;
    });
    worksheet.fillInBlankQuestions.forEach((f) => {
      if (
        (fillAnswers[f.id] || '').trim().toLowerCase() ===
        f.correctWord.toLowerCase()
      ) {
        score += 1;
      }
    });
    setCheckedScore(score);
    if (onAwardXp && score > 0) {
      onAwardXp(score * 15);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalInteractiveQuestions =
    worksheet.mcqQuestions.length + worksheet.fillInBlankQuestions.length;

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className="print:p-0 print:max-w-none">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-worksheet, #printable-worksheet * {
            visibility: visible;
          }
          #printable-worksheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Controls & Status Bar (Hidden in Print) */}
      <GoldCard className="no-print bg-[#fdfaf3]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <TutorFace tutor="sara" size="sm" />
            <div className="min-w-0">
              <span className="inline-block text-[11px] font-black text-[#C49E3A] uppercase tracking-wider">
                📝 {t('مولّد أوراق العمل الذكية والتمارين المطبوعة', 'Smart Printable Worksheet Studio')}
              </span>
              <h2 className="text-base sm:text-xl font-black text-[#002147] truncate">
                {t(worksheet.titleAr, worksheet.titleEn)}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ProgressPill>🎯 {worksheet.level}</ProgressPill>
            {checkedScore !== null && (
              <ProgressPill>
                ⭐ {checkedScore} / {totalInteractiveQuestions}
              </ProgressPill>
            )}
            <GhostButton
              onClick={() => setInteractiveMode(!interactiveMode)}
              className="text-xs py-2 px-3 min-h-[38px]"
            >
              <span>
                {interactiveMode
                  ? t('🖨️ وضع الطباعة', '🖨️ Print View')
                  : t('💻 الحل التفاعلي', '💻 Interactive Mode')}
              </span>
            </GhostButton>
            <GhostButton
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="text-xs py-2 px-3 min-h-[38px]"
            >
              {showAnswerKey ? <EyeOff size={15} /> : <Eye size={15} />}
              <span>{t('نموذج الإجابة', 'Answer Key')}</span>
            </GhostButton>
            <PrimaryButton
              onClick={handlePrint}
              className="text-xs py-2 px-3.5 min-h-[38px]"
            >
              <Printer size={15} />
              <span>{t('طباعة / PDF', 'Print / Save PDF')}</span>
            </PrimaryButton>
          </div>
        </div>
      </GoldCard>

      {/* Options Form: White GoldCard with Gold-Border Inputs/Selects and Pill Toggles */}
      <GoldCard className="no-print space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-[#C49E3A]/30 pb-3">
          <h3 className="text-sm sm:text-base font-black text-[#002147]">
            ⚙️ {t('إعدادات تخصيص ورقة العمل', 'Worksheet Customization Options')}
          </h3>
          <ProgressPill>
            {TOPICS.length} {t('مواضيع جاهزة', 'Preset Topics')}
          </ProgressPill>
        </div>

        {/* CEFR Level Pill Toggles */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-[#002147]">
            🎓 {t('اختر المستوى الأكاديمي (CEFR):', 'Select CEFR Level:')}
          </label>
          <div className="flex flex-wrap items-center gap-2" dir="ltr">
            {LEVELS.map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-transform active:scale-95 cursor-pointer min-h-[40px] ${
                    active
                      ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
                      : 'bg-white text-[#002147] border-[#C49E3A]/40 hover:border-[#C49E3A]'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preset Topic Pill Toggles */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-[#002147]">
            📚 {t('اختر موضوع الدرس أو القاعدة:', 'Select Lesson or Grammar Topic:')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {TOPICS.map((topic) => {
              const active = selectedTopic === topic.id && !customTopic.trim();
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    setCustomTopic('');
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-black border text-start transition-transform active:scale-95 cursor-pointer flex items-center gap-2 min-h-[42px] ${
                    active
                      ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
                      : 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40 hover:border-[#C49E3A]'
                  }`}
                >
                  <span className="shrink-0">{topic.icon}</span>
                  <span className="truncate">{t(topic.labelAr, topic.labelEn)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Topic Input + Generate PrimaryButton with Gold Spinner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#C49E3A]/20 items-end">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-black text-[#002147]">
              ✍️ {t('أو اكتب موضوعاً مخصصاً:', 'Or enter a custom topic:')}
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder={t(
                'مثال: Passive Voice, Medical English, Phrasal Verbs...',
                'e.g., Passive Voice, Medical English, Phrasal Verbs...'
              )}
              className="w-full rounded-xl border border-[#C49E3A]/40 bg-[#fdfaf3] px-4 py-2.5 text-sm font-bold text-[#002147] placeholder:text-[#002147]/45 focus:outline-none focus:ring-2 focus:ring-[#C49E3A] min-h-[44px]"
            />
          </div>

          <PrimaryButton
            onClick={handleGenerateWorksheet}
            disabled={isGenerating}
            className="w-full justify-center"
          >
            {isGenerating ? (
              <>
                <span
                  className="inline-block w-4 h-4 rounded-full border-2 border-[#002147]/25 border-t-[#002147] ring-2 ring-[#C49E3A] animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span>{t('جارٍ تصميم الورقة...', 'Generating...')}</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>{t('توليد ورقة عمل جديدة', 'Generate Worksheet')}</span>
              </>
            )}
          </PrimaryButton>
        </div>
      </GoldCard>

      {/* Generated Worksheet Preview: Clean White Paper Card with Navy Headings & Thin Gold Divider */}
      <div
        id="printable-worksheet"
        className="bg-white rounded-2xl border border-[#C49E3A]/40 shadow-sm p-5 sm:p-8 md:p-10 space-y-6"
      >
        {/* Official Paper Header with Thin Gold Divider */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[#C49E3A]/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#002147] text-[#E6C36A] text-[10px] font-black uppercase tracking-wider">
                {t('أكاديمية باسم الخليل الرقمية', 'Basim Al-Khalil Digital Academy')}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#fdfaf3] border border-[#C49E3A]/40 text-[#002147] text-[10px] font-black uppercase">
                CEFR {worksheet.level}
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-[#002147]">
              📄 {t(worksheet.titleAr, worksheet.titleEn)}
            </h1>
            <p className="text-xs font-bold text-[#C49E3A]" dir="ltr">
              {worksheet.titleEn}
            </p>
          </div>

          {/* Student Info Box for Print & Screen */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl p-3 text-xs w-full sm:w-auto">
            <div>
              <span className="text-[#002147]/60 font-bold">
                {t('الطالب:', 'Student:')}
              </span>{' '}
              <span className="font-black text-[#002147]">{userName}</span>
            </div>
            <div>
              <span className="text-[#002147]/60 font-bold">
                {t('المستوى:', 'Level:')}
              </span>{' '}
              <span className="font-black text-[#C49E3A]">{worksheet.level}</span>
            </div>
            <div>
              <span className="text-[#002147]/60 font-bold">
                {t('التاريخ:', 'Date:')}
              </span>{' '}
              <span className="font-bold text-[#002147]">
                {new Date().toLocaleDateString(isRtl ? 'ar-SA' : 'en-GB')}
              </span>
            </div>
            <div>
              <span className="text-[#002147]/60 font-bold">
                {t('الدرجة:', 'Score:')}
              </span>{' '}
              <span className="font-black text-[#002147]">
                {checkedScore !== null
                  ? `${checkedScore} / ${totalInteractiveQuestions}`
                  : `____ / ${totalInteractiveQuestions}`}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Golden Rule Summary */}
        <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl p-4 sm:p-5 space-y-2">
          <h3 className="text-xs sm:text-sm font-black text-[#002147] pb-2 border-b border-[#C49E3A]/30">
            💡 {t('ملخص القاعدة الذهبية (Golden Rule Summary)', 'Golden Rule Summary')}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#002147] leading-relaxed">
            {worksheet.grammarRuleSummaryAr}
          </p>
          <p
            className="text-xs font-semibold text-[#002147]/80 leading-relaxed pt-1"
            dir="ltr"
          >
            {worksheet.grammarRuleSummaryEn}
          </p>
        </div>

        {/* Section 2: Multiple Choice Questions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#C49E3A]/40">
            <span className="w-6 h-6 rounded-lg bg-[#002147] text-[#E6C36A] flex items-center justify-center font-black text-xs">
              1
            </span>
            <h3 className="text-sm sm:text-base font-black text-[#002147]">
              {t(
                'القسم الأول: اختر الإجابة الصحيحة (Multiple Choice)',
                'Part 1: Choose the Correct Option (Multiple Choice)'
              )}
            </h3>
          </div>

          <div className="space-y-3.5" dir="ltr">
            {worksheet.mcqQuestions.map((q, idx) => {
              const userAns = mcqAnswers[q.id];
              const isRevealed = checkedScore !== null || showAnswerKey;

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-[#fdfaf3]/60 border border-[#C49E3A]/30 space-y-3"
                >
                  <p className="text-sm font-black text-[#002147]">
                    <span className="text-[#C49E3A] mr-2">{idx + 1}.</span>
                    {q.question}
                  </p>

                  {interactiveMode ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userAns === oIdx;
                        const state = !isRevealed
                          ? 'normal'
                          : oIdx === q.correctIndex
                          ? 'correct'
                          : isSelected
                          ? 'wrong'
                          : 'normal';

                        return (
                          <AnswerOption
                            key={oIdx}
                            label={`${String.fromCharCode(65 + oIdx)}) ${opt}`}
                            selected={isSelected}
                            state={state}
                            disabled={checkedScore !== null}
                            onClick={() => {
                              if (checkedScore !== null) return;
                              setMcqAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                            }}
                            dir="ltr"
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className="px-3 py-2 rounded-xl border border-[#C49E3A]/40 bg-white text-xs font-bold text-[#002147] flex items-center gap-2"
                        >
                          <span className="w-5 h-5 rounded-full border border-[#002147] text-[10px] font-black flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isRevealed && (
                    <div
                      className="text-xs font-bold text-[#002147] bg-white border border-[#C49E3A]/40 rounded-xl px-3 py-2"
                      dir={isRtl ? 'rtl' : 'ltr'}
                    >
                      💡 {t(q.explanationAr, q.explanationEn)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Fill in the Blank with Word Bank */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#C49E3A]/40">
            <span className="w-6 h-6 rounded-lg bg-[#002147] text-[#E6C36A] flex items-center justify-center font-black text-xs">
              2
            </span>
            <h3 className="text-sm sm:text-base font-black text-[#002147]">
              {t(
                'القسم الثاني: أكمل الفراغات من صندوق الكلمات (Fill in the Blanks)',
                'Part 2: Complete the Sentences Using the Word Bank'
              )}
            </h3>
          </div>

          {/* Word Bank Box */}
          <div
            className="bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl p-3.5 flex flex-wrap items-center gap-2"
            dir="ltr"
          >
            <span className="text-xs font-black text-[#002147] uppercase tracking-wider mr-2">
              Word Bank:
            </span>
            {worksheet.wordBank.map((w, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white border border-[#C49E3A]/40 rounded-xl text-xs font-black text-[#002147]"
              >
                {w}
              </span>
            ))}
          </div>

          <div className="space-y-2.5" dir="ltr">
            {worksheet.fillInBlankQuestions.map((f, idx) => {
              const val = fillAnswers[f.id] || '';
              const isCorrect =
                checkedScore !== null &&
                val.trim().toLowerCase() === f.correctWord.toLowerCase();
              const isWrong = checkedScore !== null && !isCorrect;

              return (
                <div
                  key={f.id}
                  className="p-3.5 rounded-2xl bg-[#fdfaf3]/60 border border-[#C49E3A]/30 flex flex-wrap items-center gap-2 text-sm font-bold text-[#002147]"
                >
                  <span className="font-black text-[#C49E3A] mr-1">{idx + 1}.</span>
                  <span>{f.sentenceBefore}</span>
                  {interactiveMode ? (
                    <input
                      type="text"
                      value={showAnswerKey ? f.correctWord : val}
                      onChange={(e) =>
                        setFillAnswers((prev) => ({ ...prev, [f.id]: e.target.value }))
                      }
                      placeholder="..........."
                      className={`px-3 py-1 rounded-xl border-b-2 text-center font-black text-xs w-32 focus:outline-none ${
                        isCorrect
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : isWrong
                          ? 'border-red-500 bg-red-50 text-red-900'
                          : 'border-[#C49E3A] bg-white text-[#002147]'
                      }`}
                    />
                  ) : (
                    <span className="inline-block w-32 border-b-2 border-[#002147] text-center font-black text-[#002147]">
                      {showAnswerKey ? f.correctWord : ''}
                    </span>
                  )}
                  <span>{f.sentenceAfter}</span>
                  <span className="text-xs font-bold text-[#C49E3A] ml-auto" dir="rtl">
                    ({f.hintAr})
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Open-Ended Writing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#C49E3A]/40">
            <span className="w-6 h-6 rounded-lg bg-[#002147] text-[#E6C36A] flex items-center justify-center font-black text-xs">
              3
            </span>
            <h3 className="text-sm sm:text-base font-black text-[#002147]">
              {t(
                'القسم الثالث: التطبيق الكتابي الحر (Writing Production)',
                'Part 3: Guided Writing Production'
              )}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 space-y-3">
            <p className="text-xs sm:text-sm font-bold text-[#002147]">
              {t(worksheet.writingPromptAr, worksheet.writingPromptEn)}
            </p>
            <div className="space-y-4 pt-2">
              <div className="border-b border-dashed border-[#C49E3A]/50 h-6" />
              <div className="border-b border-dashed border-[#C49E3A]/50 h-6" />
              <div className="border-b border-dashed border-[#C49E3A]/50 h-6" />
            </div>
          </div>
        </div>

        {/* Interactive Grading Footer (Hidden in Print) */}
        {interactiveMode && (
          <div className="no-print pt-4 border-t border-[#C49E3A]/30 flex flex-wrap items-center justify-between gap-3">
            {checkedScore === null ? (
              <PrimaryButton onClick={handleCheckInteractiveAnswers}>
                <CheckCircle2 size={16} />
                <span>
                  {t(
                    'تصحيح الورقة تفاعلياً واحتساب النقاط',
                    'Check Answers & Claim XP'
                  )}
                </span>
              </PrimaryButton>
            ) : (
              <div className="flex flex-wrap items-center gap-3 w-full justify-between">
                <div className="flex items-center gap-2.5 bg-[#fdfaf3] border border-[#C49E3A] px-4 py-2 rounded-2xl">
                  <Award size={20} className="text-[#C49E3A]" />
                  <div>
                    <p className="text-xs sm:text-sm font-black text-[#002147]">
                      {t('النتيجة النهائية:', 'Final Score:')} {checkedScore} /{' '}
                      {totalInteractiveQuestions}
                    </p>
                    <p className="text-[11px] font-bold text-[#C49E3A]">
                      +{checkedScore * 15} XP
                    </p>
                  </div>
                </div>
                <GhostButton onClick={resetInteractiveState}>
                  <RefreshCw size={15} />
                  <span>{t('إعادة المحاولة', 'Try Again')}</span>
                </GhostButton>
              </div>
            )}
          </div>
        )}

        {/* Answer Key Box */}
        {showAnswerKey && (
          <div
            className="pt-4 border-t border-[#C49E3A]/40 bg-[#fdfaf3] rounded-2xl p-4 space-y-1.5"
            dir="ltr"
          >
            <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
              🔑 Official Teacher Answer Key
            </h4>
            <p className="text-xs font-bold text-[#002147]">
              <strong>Part 1 (MCQ):</strong>{' '}
              {worksheet.mcqQuestions
                .map(
                  (q, i) =>
                    `${i + 1}: ${String.fromCharCode(65 + q.correctIndex)} (${
                      q.options[q.correctIndex]
                    })`
                )
                .join(' • ')}
            </p>
            <p className="text-xs font-bold text-[#002147]">
              <strong>Part 2 (Fill in Blank):</strong>{' '}
              {worksheet.fillInBlankQuestions
                .map((f, i) => `${i + 1}: ${f.correctWord}`)
                .join(' • ')}
            </p>
          </div>
        )}
      </div>
    </SectionShell>
  );
};

export default DynamicWorksheetGenerator;
