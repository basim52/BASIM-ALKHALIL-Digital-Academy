import React, { useState } from 'react';
import { 
  PenTool, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Trophy, 
  RefreshCw, 
  Flame, 
  BookOpen, 
  Layers, 
  FileText, 
  Type, 
  Award,
  Zap,
  Lightbulb,
  Check,
  Send,
  HelpCircle,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../lib/translations';

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

export const WritingSpellingStudio: React.FC<WritingSpellingStudioProps> = ({ lang, onBack, userLevel, onXPAdded }) => {
  const isRtl = lang === 'ar';
  const [activeStudioTab, setActiveStudioTab] = useState<'expression' | 'essay' | 'spelling'>('expression');

  // ==========================================
  // TAB 1: EXPRESSION & RHETORIC
  // ==========================================
  const [selectedCategory, setSelectedCategory] = useState<'transitions' | 'idioms' | 'builders'>('transitions');

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
  const [essayPrompt, setEssayPrompt] = useState('How can artificial intelligence empower human education rather than replace teachers?');
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
      window.speechSynthesis.speak(utterance);
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
      // Loop or finish
      setCurrentSpellingIdx(0);
      setTypedSpelling('');
      setIsSpellingChecked(false);
      setIsSpellingCorrect(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/30 p-3 sm:p-6 lg:p-8 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-600 flex items-center justify-center transition-all cursor-pointer border border-slate-200"
              >
                {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
            )}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <PenTool size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isRtl ? 'استوديو التعبير والكتابة والإملاء العلمي' : 'Master Writing, Expression & Spelling Studio'}
                </h1>
                <span className="bg-purple-50 text-purple-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-purple-200">
                  {isRtl ? 'بلاغة وإملاء متقن ✍️' : 'Rhetoric & Orthography ✍️'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {isRtl
                  ? 'صياغة التعبير البليغ، كتابة المقالات الأكاديمية مع التقييم الذكي، وتدريبات الإملاء الصوتي والقواعد الإملائية'
                  : 'Master eloquent expression, essay structuring with instant AI grading, and scientific phonics spelling drills.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-black text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              <Trophy size={16} />
              {isRtl ? 'نقاط الكتابة والإملاء:' : 'Writing XP:'} 890
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main 3 Sub-Studio Switches */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
          {[
            { id: 'expression', labelAr: '💬 التعبير الذكي والروابط البليغة', labelEn: '💬 Smart Expression & Transitions' },
            { id: 'essay', labelAr: '📝 محرر المقالات ومقيم الذكاء الاصطناعي', labelEn: '📝 Essay Crafter & AI Evaluator' },
            { id: 'spelling', labelAr: '🎯 معمل الإملاء الصوتي والعلمي', labelEn: '🎯 Phonics & Spelling Lab' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStudioTab(tab.id as any)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer ${
                activeStudioTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm scale-100'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isRtl ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* SUB-STUDIO 1: SMART EXPRESSION & RHETORIC */}
        {/* ================================================================= */}
        {activeStudioTab === 'expression' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isRtl ? 'روابط التعبير الأكاديمي وصياغة الأفكار' : 'Academic Discourse Markers & Transition Connectors'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRtl
                    ? 'استخدم هذه الروابط لرفع مستوى فصاحتك الكتابية والشفهية من المستوى العادي إلى الأكاديمي المتقدم'
                    : 'Elevate your fluency from basic conversational to polished academic prose.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transitions.map((tGroup, gIdx) => (
                  <div key={gIdx} className="p-5 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-3">
                    <h4 className="text-xs font-black text-purple-900 uppercase tracking-wide">
                      {tGroup.groupAr}
                    </h4>

                    <div className="space-y-2.5">
                      {tGroup.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs group hover:border-purple-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-black text-purple-700">
                              {item.en}
                            </span>
                            <button
                              onClick={() => playAudio(item.en)}
                              className="text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <div className="text-[11px] font-bold text-slate-700">
                            {item.ar}
                          </div>
                          <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 font-medium italic">
                            "{item.example}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* SUB-STUDIO 2: ESSAY CRAFTER & AI EVALUATOR */}
        {/* ================================================================= */}
        {activeStudioTab === 'essay' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Writing Workspace */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    {isRtl ? 'موضوع المقال الأكاديمي' : 'Writing Prompt'}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {wordCount} {isRtl ? 'كلمة' : 'words'}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 leading-relaxed">
                  "{essayPrompt}"
                </div>

                <textarea
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder={isRtl 
                    ? 'ابدأ بكتابة مقالك هنا باللغة الإنجليزية... استخدم جملاً متناسقة وروابط تباين وإضافة. (الحد الأدنى المقترح: 40 كلمة)' 
                    : 'Type your essay or response here in English...'}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm outline-none resize-none h-64 font-serif leading-relaxed"
                  dir="ltr"
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setEssayText(`In recent years, artificial intelligence has emerged as a groundbreaking tool in modern classrooms. Rather than replacing educators, AI empowers teachers by automating routine grading and providing real-time personalized tutoring. Furthermore, it allows students to practice conversational skills at any time, boosting confidence and fluency.`)}
                    className="text-xs font-bold text-purple-600 hover:text-purple-800 underline cursor-pointer"
                  >
                    {isRtl ? 'إدراج نموذج تجريبي جاهز' : 'Insert Sample Essay'}
                  </button>

                  <button
                    disabled={wordCount < 10 || isEvaluating}
                    onClick={handleEvaluateEssay}
                    className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      wordCount >= 10 && !isEvaluating
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        {isRtl ? 'جاري الفحص بالذكاء الاصطناعي...' : 'Evaluating...'}
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        {isRtl ? 'فحص المقال والتقييم الأكاديمي 🚀' : 'Evaluate & Grade 🚀'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Evaluator Output Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 min-h-[400px]">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  {isRtl ? 'تقرير فحص الكتابة والدرجة المعتمدة' : 'AI Academic Evaluation Report'}
                </h3>

                {evaluationResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Score badge */}
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black text-purple-900">
                          {evaluationResult.score} / 100
                        </div>
                        <div className="text-xs font-bold text-purple-700">
                          CEFR Tier: {evaluationResult.cefrLevel}
                        </div>
                      </div>
                      <span className="text-xs font-black bg-purple-600 text-white px-3 py-1 rounded-xl shadow-xs">
                        +{evaluationResult.xpEarned || 150} XP 🏆
                      </span>
                    </div>

                    {/* Summary */}
                    <div className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed font-medium">
                      {evaluationResult.feedbackSummaryAr}
                    </div>

                    {/* Vocabulary Enhancements */}
                    {evaluationResult.vocabularyEnhancements && evaluationResult.vocabularyEnhancements.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-black text-indigo-800">
                          {isRtl ? '💡 ترقيات المفردات المقترحة:' : 'Vocabulary Upgrades:'}
                        </div>
                        {evaluationResult.vocabularyEnhancements.map((v: any, vIdx: number) => (
                          <div key={vIdx} className="p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs space-y-0.5">
                            <div className="font-bold text-indigo-900">
                              <span className="line-through text-slate-400 mr-1">{v.original}</span> ➔ <span className="text-emerald-700">{v.upgraded}</span>
                            </div>
                            <div className="text-[11px] text-slate-600">{v.reasonAr}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Polished Version */}
                    {evaluationResult.polishedVersion && (
                      <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-1.5">
                        <div className="text-xs font-black text-emerald-800">
                          {isRtl ? '✨ الصياغة الأكاديمية المصقولة:' : 'Polished Academic Version:'}
                        </div>
                        <p className="text-xs text-slate-800 font-serif leading-relaxed" dir="ltr">
                          "{evaluationResult.polishedVersion}"
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-center py-16 text-slate-400 space-y-2">
                    <PenTool size={36} className="mx-auto text-slate-300" />
                    <p className="text-xs font-bold">
                      {isRtl ? 'اكتب مقالك واضغط على "فحص المقال" لعرض التحليل الشامل' : 'Write your essay and hit evaluate to see instant feedback.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* SUB-STUDIO 3: SCIENTIFIC PHONICS & SPELLING LAB */}
        {/* ================================================================= */}
        {activeStudioTab === 'spelling' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  {isRtl ? `تحدي الإملاء ${currentSpellingIdx + 1} من ${SPELLING_DATASET.length}` : `Challenge ${currentSpellingIdx + 1} of ${SPELLING_DATASET.length}`}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  {isRtl ? 'استمع واكتب الإملاء الصحيح علمياً' : 'Listen & Type Accurate Spelling'}
                </h3>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                Score: {spellingScore} XP
              </span>
            </div>

            {/* Audio Cue Button */}
            <div className="text-center py-6 bg-purple-50/50 rounded-3xl border border-purple-100 space-y-3">
              <button
                onClick={() => playAudio(currentSpellingItem.word)}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform cursor-pointer"
              >
                <Volume2 size={28} />
              </button>
              <div className="text-xs font-black text-purple-900">
                {isRtl ? 'اضغط للاستماع إلى النطق الصوتي الدقيق' : 'Click to hear the target word'}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {currentSpellingItem.ipa}
              </div>
            </div>

            {/* Context & Meaning Clues */}
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-bold">
                  {isRtl ? 'المعنى بالعربية:' : 'Arabic Meaning:'}
                </div>
                <div className="text-sm font-black text-slate-900">
                  {currentSpellingItem.meaningAr}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500 font-bold">
                  {isRtl ? 'السياق في الجملة:' : 'Context Sentence:'}
                </div>
                <div className="text-sm font-medium text-slate-800 font-serif" dir="ltr">
                  "{currentSpellingItem.sentence}"
                </div>
              </div>
            </div>

            {/* Spelling Input */}
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
                placeholder={isRtl ? 'اكتب الكلمة بالإنجليزية هنا...' : 'Type word here...'}
                className="w-full p-4 text-center text-lg sm:text-xl font-bold tracking-widest uppercase rounded-2xl border-2 border-slate-200 focus:border-purple-600 outline-none"
                dir="ltr"
              />

              {/* Feedback and Rule */}
              {isSpellingChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isSpellingCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-sm">
                    {isSpellingCorrect ? (
                      <>
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <span>{isRtl ? 'إملاء ممتاز وصحيح 100%! (+100 XP)' : 'Perfect Spelling! (+100 XP)'}</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-rose-600" />
                        <span>
                          {isRtl ? `الإملاء الصحيح هو: ` : `Correct Spelling: `}
                          <strong className="underline text-base tracking-wider">{currentSpellingItem.word}</strong>
                        </span>
                      </>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-xl text-slate-700 border border-slate-200 leading-relaxed">
                    <strong className="text-purple-700 block mb-1">
                      {isRtl ? '🔬 القاعدة الصوتية والإملائية (Phonics Rule):' : '🔬 Phonics Rule:'}
                    </strong>
                    {currentSpellingItem.phonicRuleAr}
                  </div>
                </motion.div>
              )}

              {/* Submit / Next Button */}
              <div className="flex justify-end pt-2">
                {!isSpellingChecked ? (
                  <button
                    disabled={!typedSpelling.trim()}
                    onClick={handleCheckSpelling}
                    className={`px-8 py-3.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      typedSpelling.trim()
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isRtl ? 'فحص الإملاء ✓' : 'Check Spelling ✓'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextSpelling}
                    className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {currentSpellingIdx + 1 < SPELLING_DATASET.length
                      ? (isRtl ? 'الكلمة التالية ➔' : 'Next Word ➔')
                      : (isRtl ? 'إنهاء الجولة 🏆' : 'Finish Round 🏆')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
