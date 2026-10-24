import React, { useState } from 'react';
import {
  PenTool,
  Volume2,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../lib/translations';
import { useT } from '../lib/explainLang';
import { toEnglish } from '../lib/domTranslate';
import { managedSpeak } from '../lib/audio';
import {
  SectionShell,
  GoldCard,
  PrimaryButton,
  GhostButton,
  ProgressPill,
  TutorFace,
} from './ui/academy';

interface WritingSpellingStudioProps {
  lang: Language;
  onBack?: () => void;
  userLevel?: string;
  onXPAdded?: (xp: number, details?: { lessonId: string; title: string; score: number; total: number; level: string }) => void;
}

interface SpellingItem {
  id: string;
  word: string;
  ipa: string;
  meaningAr: string;
  hintAr: string;
  phonicRuleAr: string;
  category: 'silent_letters' | 'vowel_teams' | 'suffixes' | 'doubling';
  sentence: string;
}

const SPELLING_DATASET: SpellingItem[] = [
  {
    id: 'sp-1',
    word: 'Knowledge',
    ipa: '/ˈnɒl.ɪdʒ/',
    meaningAr: 'المعرفة والعلم',
    hintAr: 'تبدأ بحرف صامت، وتحتوي على dge في النهاية',
    phonicRuleAr: 'قاعدة الحرف الصامت (Silent K): حرف K لا يُنطق إذا جاء بعده حرف N في بداية الكلمة (Kn-). وقاعدة -dge تعطي صوت /dʒ/ بعد حرف علة قصير.',
    category: 'silent_letters',
    sentence: 'Regular reading is the primary key to acquiring deep _______.'
  },
  {
    id: 'sp-2',
    word: 'Doubt',
    ipa: '/daʊt/',
    meaningAr: 'الشك والريبة',
    hintAr: 'حرف b صامت تماماً قبل حرف t',
    phonicRuleAr: 'قاعدة الحرف الصامت (Silent B): حرف B لا يُنطق عندما يأتي قبل حرف T في الكلمات ذات الأصل اللاتيني مثل Doubt و Debt.',
    category: 'silent_letters',
    sentence: 'There is no _______ that daily practice improves English fluency.'
  },
  {
    id: 'sp-3',
    word: 'Thorough',
    ipa: '/ˈθʌr.ə/',
    meaningAr: 'شامل ودقيق ومفصل',
    hintAr: 'تنتهي بالمقطع الشهير -ough',
    phonicRuleAr: 'قاعدة المقطع -ough: مقطع متعدد الأصوات، هنا ينطق بصوت الشوا الخفيف /ə/.',
    category: 'vowel_teams',
    sentence: 'The academy provides a _______ review of all grammar rules.'
  },
  {
    id: 'sp-4',
    word: 'Accommodate',
    ipa: '/əˈkɒm.ə.deɪt/',
    meaningAr: 'يستوعب / يستضيف',
    hintAr: 'تحتوي على حرفي c مضاعفين وحرفي m مضاعفين (cc + mm)',
    phonicRuleAr: 'قاعدة التضعيف المزدوج (Double Consonants): تحتوي الكلمة على cc و mm معاً وتعتبر من أكثر الكلمات اختباراً في المسابقات الدولية.',
    category: 'doubling',
    sentence: 'The new classroom can _______ up to thirty students comfortably.'
  },
  {
    id: 'sp-5',
    word: 'Conscientious',
    ipa: '/ˌkɒn.ʃiˈen.ʃəs/',
    meaningAr: 'متقن وضميري ويقظ الضمير',
    hintAr: 'تنتهي باللاحقة -tious وصوت /ʃəs/',
    phonicRuleAr: 'قاعدة اللواحق (-tious / -cious): تنطق دائماً /ʃəs/ وتستخدم لتحويل الأسماء إلى صفات تصف الاتقان والشخصية.',
    category: 'suffixes',
    sentence: 'A _______ student always completes assignments with precision.'
  }
];

const WRITING_EN_MAP: Record<string, string> = {
  'التباين والمقابلة (Contrast)': 'Contrast & Comparison',
  'السبب والنتيجة (Cause & Effect)': 'Cause & Effect',
  'التوكيد والإضافة (Addition & Emphasis)': 'Addition & Emphasis',
  'المعرفة والعلم': 'Knowledge and learning',
  'الشك والريبة': 'Uncertainty or doubt',
  'شامل ودقيق ومفصل': 'Complete, detailed, and careful',
  'يستوعب / يستضيف': 'To provide space or lodging for',
  'متقن وضميري ويقظ الضمير': 'Diligent, careful, and thorough',
  'تبدأ بحرف صامت، وتحتوي على dge في النهاية': 'Starts with a silent letter and ends with -dge',
  'حرف b صامت تماماً قبل حرف t': 'The letter b is completely silent before t',
  'تنتهي بالمقطع الشهير -ough': 'Ends with the classic -ough pattern',
  'تحتوي على حرفي c مضاعفين وحرفي m مضاعفين (cc + mm)': 'Contains both double c and double m (cc + mm)',
  'تنتهي باللاحقة -tious وصوت /ʃəs/': 'Ends with the suffix -tious pronounced /ʃəs/',
  'قاعدة الحرف الصامت (Silent K): حرف K لا يُنطق إذا جاء بعده حرف N في بداية الكلمة (Kn-). وقاعدة -dge تعطي صوت /dʒ/ بعد حرف علة قصير.':
    'Silent K rule: K is silent before N at the start of a word (Kn-). The -dge spelling makes the /dʒ/ sound after a short vowel.',
  'قاعدة الحرف الصامت (Silent B): حرف B لا يُنطق عندما يأتي قبل حرف T في الكلمات ذات الأصل اللاتيني مثل Doubt و Debt.':
    'Silent B rule: B is silent before T in Latin-origin words such as Doubt and Debt.',
  'قاعدة المقطع -ough: مقطع متعدد الأصوات، هنا ينطق بصوت الشوا الخفيف /ə/.':
    'The -ough pattern has multiple pronunciations; in "thorough" it is pronounced with a soft schwa /ə/.',
  'قاعدة التضعيف المزدوج (Double Consonants): تحتوي الكلمة على cc و mm معاً وتعتبر من أكثر الكلمات اختباراً في المسابقات الدولية.':
    'Double Consonants rule: "Accommodate" has both double c (cc) and double m (mm).',
  'قاعدة اللواحق (-tious / -cious): تنطق دائماً /ʃəs/ وتستخدم لتحويل الأسماء إلى صفات تصف الاتقان والشخصية.':
    'Suffix rule (-tious / -cious): pronounced /ʃəs/ and used to form adjectives describing character and care.',
  'كتابة ممتازة وفكرة واضحة! استخدمت روابط منطقية جيدة وتركيب جمل متناسق.':
    'Excellent writing and clear ideas! You used strong logical connectors and well-structured sentences.',
  'حافظ على نسق موحد للأزمنة في نفس الفقرة.':
    'Keep verb tenses consistent within the same paragraph.',
  'الإملاء سليم ومنضبط.':
    'Spelling is accurate and well-controlled.',
  'ترقية المفردات لأسلوب أكثر فصاحة.':
    'Upgraded vocabulary for a more academic tone.',
};

export const WritingSpellingStudio: React.FC<WritingSpellingStudioProps> = ({ lang, userLevel, onXPAdded }) => {
  const tHook = useT();
  const isEnMode = lang === 'en' || tHook('ar', 'en') === 'en';
  const isRtl = !isEnMode;
  const t = (ar: string, en: string) => (isEnMode ? en : ar);
  const tr = (ar: string) => t(ar, WRITING_EN_MAP[ar] || toEnglish(ar));

  const [activeStudioTab, setActiveStudioTab] = useState<'expression' | 'essay' | 'spelling'>('essay');

  // ==========================================
  // TAB 1: EXPRESSION & RHETORIC
  // ==========================================
  const [selectedCategory] = useState<'transitions' | 'idioms' | 'builders'>('transitions');
  void selectedCategory;

  const transitions = [
    {
      groupAr: 'التباين والمقابلة (Contrast)',
      items: [
        { en: 'On the other hand, ...', ar: 'من ناحية أخرى...', example: 'Online learning is flexible; on the other hand, in-person classes offer direct social bonding.' },
        { en: 'Nevertheless, ...', ar: 'ومع ذلك / بالرغم من ذلك...', example: 'The exam was rigorous; nevertheless, the students achieved outstanding scores.' },
        { en: 'In stark contrast to ...', ar: 'على النقيض التام من...', example: 'In stark contrast to traditional methods, modern AI tools personalize feedback instantly.' }
      ]
    },
    {
      groupAr: 'السبب والنتيجة (Cause & Effect)',
      items: [
        { en: 'Consequently, ...', ar: 'ونتيجة لذلك...', example: 'He practiced speaking daily; consequently, he achieved a native-like accent.' },
        { en: 'Owing to ...', ar: 'بسبب / نظراً لـ...', example: 'Owing to consistent effort, her writing skills improved tremendously.' },
        { en: 'For this reason, ...', ar: 'ولهذا السبب...', example: 'Vocabulary is vital; for this reason, active flashcards are essential.' }
      ]
    },
    {
      groupAr: 'التوكيد والإضافة (Addition & Emphasis)',
      items: [
        { en: 'Furthermore, ...', ar: 'علاوة على ذلك...', example: 'The course covers grammar; furthermore, it offers real-time voice conversations.' },
        { en: 'Particularly notable is ...', ar: 'مما يستحق الذكر بوجه خاص هو...', example: 'Particularly notable is his exceptional dedication to daily practice.' }
      ]
    }
  ];

  // ==========================================
  // TAB 2: ESSAY & GUIDED WRITING + AI EVALUATOR
  // ==========================================
  const [essayPrompt] = useState('How can artificial intelligence empower human education rather than replace teachers?');
  const [essayText, setEssayText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  const handleEvaluateEssay = async () => {
    if (!essayText.trim() || isEvaluating) return;
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const res = await fetch('/api/academy/writing-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: essayText.trim(),
          promptType: 'essay',
          targetLevel: 'B2'
        })
      });
      const data = await res.json();
      setEvaluationResult(data);
      if (onXPAdded && data.overallScore) {
        onXPAdded(100, {
          lessonId: 'essay_ai_future',
          title: isRtl ? 'استوديو التعبير: تقييم المقال الأكاديمي' : 'Writing Studio: Essay Evaluation',
          score: data.overallScore,
          total: 100,
          level: userLevel || 'B2'
        });
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // ==========================================
  // TAB 3: SCIENTIFIC PHONICS & SPELLING DRILLS
  // ==========================================
  const [currentSpellingIdx, setCurrentSpellingIdx] = useState(0);
  const [typedSpelling, setTypedSpelling] = useState('');
  const [isSpellingChecked, setIsSpellingChecked] = useState(false);
  const [isSpellingCorrect, setIsSpellingCorrect] = useState(false);
  const [spellingScore, setSpellingScore] = useState(0);

  const currentSpellingItem = SPELLING_DATASET[currentSpellingIdx];

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      managedSpeak(utterance);
    }
  };

  const handleCheckSpelling = () => {
    if (!typedSpelling.trim() || isSpellingChecked) return;
    const isCorrect = typedSpelling.trim().toLowerCase() === currentSpellingItem.word.toLowerCase();
    setIsSpellingCorrect(isCorrect);
    setIsSpellingChecked(true);
    if (isCorrect) {
      setSpellingScore(prev => prev + 100);
    }
  };

  const handleNextSpelling = () => {
    if (currentSpellingIdx + 1 < SPELLING_DATASET.length) {
      setCurrentSpellingIdx(prev => prev + 1);
      setTypedSpelling('');
      setIsSpellingChecked(false);
      setIsSpellingCorrect(false);
    } else {
      setCurrentSpellingIdx(0);
      setTypedSpelling('');
      setIsSpellingChecked(false);
      setIsSpellingCorrect(false);
    }
  };

  // Collect all feedback issues for Sara-style sentence check cards
  const feedbackIssues: { wrong: string; correct: string; reason: string }[] = [];
  if (evaluationResult) {
    (evaluationResult.grammarFeedback || []).forEach((g: any) => {
      const wrong = g.originalFragment || g.issue || '';
      const correct = g.correctedFragment || g.fix || '';
      const reason = g.ruleAr || g.tipAr || '';
      if (wrong || correct) feedbackIssues.push({ wrong, correct, reason });
    });
    (evaluationResult.spellingFeedback || []).forEach((s: any) => {
      const wrong = s.misspelledWord || s.word || '';
      const correct = s.correctSpelling || s.correctWord || s.correct || '';
      const reason = s.phonicRuleAr || '';
      if ((wrong || correct) && wrong !== correct) feedbackIssues.push({ wrong, correct, reason });
    });
    (evaluationResult.vocabularyEnhancements || []).forEach((v: any) => {
      if (v.original || v.upgraded) {
        feedbackIssues.push({ wrong: v.original || '', correct: v.upgraded || '', reason: v.reasonAr || '' });
      }
    });
  }

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} data-testid="writing-spelling-studio">
      {/* Studio Pill Tabs (Navy when active, white with gold border otherwise) */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { id: 'essay', labelAr: '📝 المقال والتقييم', labelEn: '📝 Essay & AI Grade' },
          { id: 'spelling', labelAr: '🎯 معمل الإملاء', labelEn: '🎯 Spelling Lab' },
          { id: 'expression', labelAr: '💬 الروابط البليغة', labelEn: '💬 Transitions' },
        ].map((tab) => {
          const active = activeStudioTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStudioTab(tab.id as any)}
              className={`py-2 px-2 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-black truncate text-center active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer ${
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
        key={activeStudioTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
      >
        {/* ================================================================= */}
        {/* SUB-STUDIO 1: SMART EXPRESSION & RHETORIC */}
        {/* ================================================================= */}
        {activeStudioTab === 'expression' && (
          <GoldCard className="space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#002147]">
                {t('روابط التعبير الأكاديمي وصياغة الأفكار', 'Academic Discourse Markers & Transition Connectors')}
              </h3>
              <p className="text-xs font-bold text-[#002147]/70 mt-0.5">
                {t(
                  'استخدم هذه الروابط لرفع مستوى فصاحتك الكتابية والشفهية من المستوى العادي إلى الأكاديمي المتقدم',
                  'Elevate your fluency from basic conversational to polished academic prose.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {transitions.map((tGroup, gIdx) => (
                <div key={gIdx} className="p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 space-y-3">
                  <h4 className="text-xs font-black text-[#002147] uppercase tracking-wide border-b border-[#C49E3A]/30 pb-1.5">
                    {tr(tGroup.groupAr)}
                  </h4>

                  <div className="space-y-2.5">
                    {tGroup.items.map((item, iIdx) => (
                      <div key={iIdx} className="p-3 bg-white rounded-xl border border-[#C49E3A]/30 space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-black text-[#002147]" dir="ltr">
                            {item.en}
                          </span>
                          <GhostButton
                            onClick={() => playAudio(item.en)}
                            className="!px-2 !py-1"
                            aria-label={t('استماع', 'Listen')}
                          >
                            <Volume2 size={13} />
                          </GhostButton>
                        </div>
                        {isRtl && (
                          <div className="text-[11px] font-bold text-[#002147]/80">
                            {item.ar}
                          </div>
                        )}
                        <div className="text-[11px] text-[#002147]/75 bg-[#fdfaf3] p-2 rounded-lg border border-[#C49E3A]/20 font-bold" dir="ltr">
                          "{item.example}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GoldCard>
        )}

        {/* ================================================================= */}
        {/* SUB-STUDIO 2: ESSAY CRAFTER & AI EVALUATOR (with Ali TutorFace) */}
        {/* ================================================================= */}
        {activeStudioTab === 'essay' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Writing Workspace */}
            <div className="lg:col-span-7">
              <GoldCard className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-nowrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TutorFace tutor="exams" size="sm" />
                    <div className="min-w-0">
                      <span className="text-xs font-black text-[#002147] block truncate">
                        {t('علي • مدرب الكتابة الأكاديمية', 'Ali • Academic Writing Coach')}
                      </span>
                      <span className="text-[11px] font-bold text-[#002147]/70 block truncate">
                        {t('موضوع المقال الأكاديمي', 'Writing Prompt')}
                      </span>
                    </div>
                  </div>
                  <ProgressPill data-testid="essay-word-counter" className="shrink-0">
                    ✍️ {wordCount} {t('كلمة', 'words')}
                  </ProgressPill>
                </div>

                <div className="p-3.5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 text-xs sm:text-sm font-black text-[#002147] leading-relaxed" dir="ltr">
                  "{essayPrompt}"
                </div>

                <textarea
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder={t(
                    'ابدأ بكتابة مقالك هنا باللغة الإنجليزية... استخدم جملاً متناسقة وروابط تباين وإضافة. (الحد الأدنى المقترح: 40 كلمة)',
                    'Type your essay or response here in English...'
                  )}
                  className="w-full p-4 rounded-2xl bg-white border border-[#C49E3A]/40 focus:border-[#C49E3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] text-sm font-bold text-[#002147] resize-none h-60 leading-relaxed"
                  dir="ltr"
                />

                <div className="flex items-center justify-between gap-2 flex-nowrap pt-1">
                  <GhostButton
                    className="!px-2.5 sm:!px-4 !text-xs whitespace-nowrap shrink-0"
                    onClick={() =>
                      setEssayText(
                        `In recent years, artificial intelligence has emerged as a groundbreaking tool in modern classrooms. Rather than replacing educators, AI empowers teachers by automating routine grading and providing real-time personalized tutoring. Furthermore, it allows students to practice conversational skills at any time, boosting confidence and fluency.`
                      )
                    }
                  >
                    {t('نموذج تجريبي', 'Sample Essay')}
                  </GhostButton>

                  <PrimaryButton
                    className="!px-3 sm:!px-4 !text-xs whitespace-nowrap shrink-0"
                    disabled={wordCount < 10 || isEvaluating}
                    onClick={handleEvaluateEssay}
                  >
                    {isEvaluating ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#C49E3A] border-t-transparent animate-spin inline-block shrink-0" />
                        <span>{t('جاري الفحص...', 'Evaluating...')}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} className="shrink-0" />
                        <span>{t('فحص المقال 🚀', 'Evaluate Essay 🚀')}</span>
                      </>
                    )}
                  </PrimaryButton>
                </div>
              </GoldCard>
            </div>

            {/* AI Evaluator Output Panel */}
            <div className="lg:col-span-5">
              <GoldCard className="space-y-4 min-h-[360px]">
                <h3 className="text-xs font-black text-[#002147]/70 uppercase tracking-wider">
                  {t('تقرير فحص الكتابة والدرجة المعتمدة', 'AI Academic Evaluation Report')}
                </h3>

                {evaluationResult ? (
                  <div className="space-y-3.5">
                    {/* Score badge in Navy/Gold */}
                    <div className="p-4 rounded-2xl bg-[#002147] text-white border-2 border-[#C49E3A] flex items-center justify-between gap-2">
                      <div>
                        <div className="text-2xl font-black text-[#E6C36A]">
                          {evaluationResult.score ?? evaluationResult.overallScore} / 100
                        </div>
                        {evaluationResult.cefrLevel && (
                          <div className="text-xs font-bold text-white/85">
                            CEFR: {evaluationResult.cefrLevel}
                          </div>
                        )}
                      </div>
                      {typeof evaluationResult.xpEarned === 'number' && (
                        <ProgressPill className="!bg-[#001a38] !text-[#E6C36A] !border-[#C49E3A]">
                          🏆 +{evaluationResult.xpEarned} XP
                        </ProgressPill>
                      )}
                    </div>

                    {/* Summary */}
                    {evaluationResult.feedbackSummaryAr && (
                      <div className="text-xs text-[#002147] bg-[#fdfaf3] p-3.5 rounded-2xl border border-[#C49E3A]/40 leading-relaxed font-bold">
                        {tr(evaluationResult.feedbackSummaryAr)}
                      </div>
                    )}

                    {/* Issues list: mistake (red), correction (green), short explanation in its own small GoldCard */}
                    {feedbackIssues.length > 0 && (
                      <div className="space-y-2.5">
                        <div className="text-xs font-black text-[#002147]">
                          {t('🔍 التصحيحات والتحسينات المقترحة:', '🔍 Corrections & Improvements:')}
                        </div>
                        {feedbackIssues.map((item, idx) => (
                          <GoldCard
                            key={idx}
                            data-testid="essay-feedback-card"
                            className="!p-3 !bg-[#fdfaf3] space-y-1.5"
                          >
                            {item.wrong && (
                              <div className="flex items-center gap-1.5 text-red-700 font-black text-xs" dir="ltr">
                                <XCircle size={14} className="shrink-0 text-red-600" />
                                <span className="line-through">{item.wrong}</span>
                              </div>
                            )}
                            {item.correct && (
                              <div className="flex items-center gap-1.5 text-green-800 font-black text-xs" dir="ltr">
                                <CheckCircle2 size={14} className="shrink-0 text-green-600" />
                                <span>{item.correct}</span>
                              </div>
                            )}
                            {item.reason && (
                              <p className="text-[11px] font-bold text-[#002147]/80 leading-relaxed">
                                {tr(item.reason)}
                              </p>
                            )}
                          </GoldCard>
                        ))}
                      </div>
                    )}

                    {/* Polished Version */}
                    {evaluationResult.polishedVersion && (
                      <div className="p-3.5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 space-y-1.5">
                        <div className="text-xs font-black text-[#002147]">
                          {t('✨ الصياغة الأكاديمية المصقولة:', '✨ Polished Academic Version:')}
                        </div>
                        <p className="text-xs text-[#002147] font-bold leading-relaxed" dir="ltr">
                          "{evaluationResult.polishedVersion}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-14 text-[#002147]/60 space-y-2">
                    <PenTool size={32} className="mx-auto text-[#C49E3A]" />
                    <p className="text-xs font-bold">
                      {t(
                        'اكتب مقالك واضغط على "فحص المقال" لعرض التحليل الشامل',
                        'Write your essay and hit evaluate to see instant feedback.'
                      )}
                    </p>
                  </div>
                )}
              </GoldCard>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* SUB-STUDIO 3: SCIENTIFIC PHONICS & SPELLING LAB (with Noura TutorFace) */}
        {/* ================================================================= */}
        {activeStudioTab === 'spelling' && (
          <div className="max-w-3xl mx-auto">
            <GoldCard className="space-y-5">
              {/* Header with Noura TutorFace */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#C49E3A]/25">
                <div className="flex items-center gap-3">
                  <TutorFace tutor="noura" size="sm" />
                  <div>
                    <ProgressPill>
                      {t(
                        `تحدي الإملاء ${currentSpellingIdx + 1} من ${SPELLING_DATASET.length}`,
                        `Challenge ${currentSpellingIdx + 1} of ${SPELLING_DATASET.length}`
                      )}
                    </ProgressPill>
                    <h3 className="text-base sm:text-lg font-black text-[#002147] mt-1">
                      {t('نورة • استمع واكتب الإملاء الصحيح علمياً', 'Noura • Listen & Type Accurate Spelling')}
                    </h3>
                  </div>
                </div>
                <ProgressPill>
                  🏆 {spellingScore} XP
                </ProgressPill>
              </div>

              {/* Audio Cue Card */}
              <div className="text-center py-5 px-4 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 space-y-2.5">
                <button
                  type="button"
                  onClick={() => playAudio(currentSpellingItem.word)}
                  className="w-14 h-14 rounded-full bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] flex items-center justify-center mx-auto shadow-sm active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer"
                  aria-label={t('استماع', 'Listen')}
                >
                  <Volume2 size={24} />
                </button>
                <div className="text-xs font-black text-[#002147]">
                  {t('اضغط للاستماع إلى النطق الصوتي الدقيق', 'Click to hear the target word')}
                </div>
                <div className="text-xs text-[#C49E3A] font-mono font-bold" dir="ltr">
                  {currentSpellingItem.ipa}
                </div>
              </div>

              {/* Context & Meaning Clues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 space-y-1">
                  <div className="text-xs text-[#002147]/70 font-bold">
                    {t('المعنى:', 'Meaning:')}
                  </div>
                  <div className="text-sm font-black text-[#002147]">
                    {tr(currentSpellingItem.meaningAr)}
                  </div>
                </div>

                <div className="p-3.5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/40 space-y-1">
                  <div className="text-xs text-[#002147]/70 font-bold">
                    {t('السياق في الجملة:', 'Context Sentence:')}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#002147]" dir="ltr">
                    "{currentSpellingItem.sentence}"
                  </div>
                </div>
              </div>

              {/* Large Spelling Input with AnswerOption-style states (normal / green / red with one pulse) */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={typedSpelling}
                  disabled={isSpellingChecked}
                  onChange={(e) => setTypedSpelling(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSpellingChecked) {
                      handleCheckSpelling();
                    }
                  }}
                  placeholder={t('اكتب الكلمة بالإنجليزية هنا...', 'Type word here...')}
                  className={`w-full p-4 text-center text-lg sm:text-xl font-black tracking-widest uppercase rounded-2xl border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] transition-colors ${
                    !isSpellingChecked
                      ? 'bg-[#fdfaf3] border-[#C49E3A]/40 focus:border-[#C49E3A] text-[#002147]'
                      : isSpellingCorrect
                      ? 'bg-green-50 border-green-600 text-[#002147] animate-[pulse_0.6s_ease-out_1]'
                      : 'bg-red-50 border-red-600 text-red-900 animate-[pulse_0.6s_ease-out_1]'
                  }`}
                  dir="ltr"
                />

                {/* Feedback and Phonics Rule */}
                {isSpellingChecked && (
                  <div
                    className={`p-4 rounded-2xl border-2 text-xs space-y-2 ${
                      isSpellingCorrect
                        ? 'bg-green-50 border-green-600 text-[#002147]'
                        : 'bg-red-50 border-red-600 text-red-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black text-sm">
                      {isSpellingCorrect ? (
                        <>
                          <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                          <span>{t('إملاء ممتاز وصحيح 100%! (+100 XP)', 'Perfect Spelling! (+100 XP)')}</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={18} className="text-red-600 shrink-0" />
                          <span>
                            {t('الإملاء الصحيح هو: ', 'Correct Spelling: ')}
                            <strong className="underline text-base tracking-wider" dir="ltr">
                              {currentSpellingItem.word}
                            </strong>
                          </span>
                        </>
                      )}
                    </div>

                    <div className="p-3 bg-white rounded-xl text-[#002147] border border-[#C49E3A]/30 leading-relaxed font-bold">
                      <strong className="text-[#002147] block mb-1">
                        {t('🔬 القاعدة الصوتية والإملائية (Phonics Rule):', '🔬 Phonics Rule:')}
                      </strong>
                      {tr(currentSpellingItem.phonicRuleAr)}
                    </div>
                  </div>
                )}

                {/* Submit / Next Button */}
                <div className="flex justify-end pt-1">
                  {!isSpellingChecked ? (
                    <PrimaryButton
                      disabled={!typedSpelling.trim()}
                      onClick={handleCheckSpelling}
                    >
                      {t('فحص الإملاء ✓', 'Check Spelling ✓')}
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton onClick={handleNextSpelling}>
                      {currentSpellingIdx + 1 < SPELLING_DATASET.length
                        ? t('الكلمة التالية ➔', 'Next Word ➔')
                        : t('إنهاء الجولة 🏆', 'Finish Round 🏆')}
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </GoldCard>
          </div>
        )}
      </motion.div>
    </SectionShell>
  );
};
