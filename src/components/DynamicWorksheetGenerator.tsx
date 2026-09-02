import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowLeft, 
  Download, 
  BookOpen, 
  Award, 
  Layers, 
  User, 
  Sliders, 
  Send,
  Eye,
  Check,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestionItem {
  id: string;
  type: 'mcq' | 'fill-blank' | 'correction';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanationAr: string;
  hint: string;
}

interface WorksheetData {
  titleEn: string;
  titleAr: string;
  studentName: string;
  level: string;
  theme: string;
  instructionsEn: string;
  instructionsAr: string;
  passageTitle?: string;
  passage?: string;
  questions: QuestionItem[];
  teacherKeyNotes?: string;
}

interface DynamicWorksheetGeneratorProps {
  lang: 'ar' | 'en';
  userName?: string;
  userLevel?: string;
  onBack: () => void;
  onAwardXp?: (amount: number) => void;
}

const DOMAINS = [
  { id: 'Grammar & Structure', ar: 'القواعد والتراكيب النحوية', en: 'Grammar & Structure', icon: '📐' },
  { id: 'Reading Comprehension & Fluency', ar: 'الفهم القرائي والاستيعاب', en: 'Reading Comprehension', icon: '📖' },
  { id: 'Vocabulary & Idiomatic Phrases', ar: 'المفردات والمتلازمات والتعبيرات', en: 'Vocabulary & Idioms', icon: '💡' },
  { id: 'Writing & Error Correction', ar: 'صياغة الجمل وتصحيح الأخطاء', en: 'Writing & Error Correction', icon: '✍️' },
  { id: 'Oxford Comprehensive Assessment', ar: 'تقييم أكسفورد التراكمي الشامل', en: 'Oxford Comprehensive', icon: '🏆' }
];

const THEMES = [
  { id: 'London Adventures & British Culture', ar: 'مغامرات في لندن والحياة البريطانية', icon: '🇬🇧' },
  { id: 'Space Exploration & Galaxies', ar: 'استكشاف الفضاء والعلوم المستقبلية', icon: '🚀' },
  { id: 'World Cup Football & Athletics', ar: 'كأس العالم والرياضة وبطولات الكرة', icon: '⚽' },
  { id: 'Culinary Arts & Traditional Cafés', ar: 'فنون الطهي والمقاهي والضيافة', icon: '☕' },
  { id: 'Artificial Intelligence & Future Careers', ar: 'الذكاء الاصطناعي ومهن المستقبل', icon: '🤖' }
];

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const DynamicWorksheetGenerator: React.FC<DynamicWorksheetGeneratorProps> = ({
  lang,
  userName = 'Student',
  userLevel = 'B1',
  onBack,
  onAwardXp
}) => {
  const isRtl = lang === 'ar';

  // Config State
  const [studentName, setStudentName] = useState(userName);
  const [selectedLevel, setSelectedLevel] = useState(userLevel);
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0].id);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].id);
  const [questionCount, setQuestionCount] = useState(5);

  // Generation & View State
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheet, setWorksheet] = useState<WorksheetData | null>(null);
  const [activeTab, setActiveTab] = useState<'interactive' | 'printable'>('interactive');

  // Interactive Solving State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  // Generate Worksheet API Call
  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setRevealedHints({});
    setShowAnswerKey(false);

    try {
      const res = await fetch('/api/ai/generate-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          level: selectedLevel,
          domain: selectedDomain,
          theme: selectedTheme,
          count: questionCount
        })
      });

      if (!res.ok) throw new Error('Generation failed');
      const data: WorksheetData = await res.json();
      setWorksheet(data);
    } catch (err) {
      console.error('Worksheet generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit Interactive Quiz
  const handleSubmitInteractive = () => {
    if (!worksheet) return;
    let correctCount = 0;

    worksheet.questions.forEach((q) => {
      const ans = (userAnswers[q.id] || '').trim().toLowerCase();
      const expected = q.correctAnswer.trim().toLowerCase();
      if (ans === expected) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / worksheet.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onAwardXp) onAwardXp(120);
    }
  };

  // Trigger Print Mode
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-3 sm:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HEADER BAR (Hidden in print) */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-6 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة' : 'Back'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black rounded-full shadow-sm">
            <Sparkles size={14} className="animate-pulse" />
            Gemini 3.8 Flash
          </span>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline-block">
            {isRtl ? 'صانع أوراق العمل التوليدية الذكية' : 'Dynamic AI Worksheet Generator'}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* CONFIGURATION CARD (Hidden in print) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 print:hidden">
          <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
              <FileText size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-tight">
                {isRtl ? 'صانع أوراق العمل والاختبارات المخصصة 📄' : 'Dynamic Academic Worksheet Generator 📄'}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {isRtl 
                  ? 'قم بصياغة ورقة عمل مصممة خصيصاً لمستواك واهتماماتك، قابلة للحل التفاعلي أو الطباعة الفورية'
                  : 'Tailor worksheets to student interests & CEFR level. Solve interactively or print with answer key.'}
              </p>
            </div>
          </div>

          {/* PARAMETERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* Student Name */}
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <User size={13} />
                {isRtl ? 'اسم الطالب' : 'Student Name'}
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                placeholder={isRtl ? 'اكتب اسمك' : 'Enter name'}
              />
            </div>

            {/* CEFR Level */}
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <Award size={13} />
                {isRtl ? 'المستوى المستهدف (CEFR)' : 'Target CEFR Level'}
              </label>
              <div className="grid grid-cols-6 gap-1">
                {CEFR_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`py-2 text-xs font-black rounded-lg border transition-all ${
                      selectedLevel === lvl
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain */}
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <Layers size={13} />
                {isRtl ? 'المهارة اللغوية' : 'Linguistic Domain'}
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.icon} {isRtl ? d.ar : d.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme & Interests */}
            <div>
              <label className="block text-[11px] font-black text-slate-500 uppercase mb-1.5 flex items-center gap-1.5">
                <Sparkles size={13} />
                {isRtl ? 'موضوع الاهتمام والسياق' : 'Theme & Interest'}
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                {THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.icon} {isRtl ? th.ar : th.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                {isRtl ? 'عدد الأسئلة:' : 'Questions:'}
              </span>
              {[3, 5, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`px-3 py-1 rounded-lg text-xs font-black border transition-all ${
                    questionCount === num
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>{isRtl ? 'جاري الصياغة بـ Gemini 3.8...' : 'Generating with Gemini 3.8...'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>{isRtl ? 'توليد ورقة العمل الآن ⚡' : 'Generate Worksheet Now ⚡'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* WORKSHEET DISPLAY CONTAINER */}
        {worksheet && (
          <div className="space-y-6">
            {/* VIEW MODE TOGGLE (Hidden in print) */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 print:hidden">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('interactive')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    activeTab === 'interactive'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Send size={15} />
                  <span>{isRtl ? 'حل تفاعلي وتصحيح فوري' : 'Interactive Online Mode'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('printable')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    activeTab === 'printable'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Printer size={15} />
                  <span>{isRtl ? 'معاينة الطباعة وتصدير PDF' : 'Printable & PDF Format'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer"
                >
                  <Printer size={15} />
                  <span>{isRtl ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
                </button>
              </div>
            </div>

            {/* PRINTABLE / OFFICIAL EXAM SHEET LAYOUT */}
            <div className={`bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0 ${
              activeTab === 'interactive' ? 'block' : 'block'
            }`}>
              {/* ACADEMIC LETTERHEAD */}
              <div className="border-b-2 border-slate-900 pb-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-indigo-600 uppercase">
                      Basim Alkhalil English Academy
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {worksheet.titleEn}
                    </h2>
                    <div className="text-sm font-bold text-slate-600 mt-0.5">
                      {worksheet.titleAr}
                    </div>
                  </div>
                  <div className="text-right border-2 border-slate-900 rounded-xl px-4 py-2">
                    <div className="text-[10px] font-black text-slate-500 uppercase">Grade / Score</div>
                    <div className="text-2xl font-black text-indigo-700">
                      {isSubmitted ? `${score} / 100` : '___ / 100'}
                    </div>
                  </div>
                </div>

                {/* STUDENT METADATA ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-dashed border-slate-200 text-xs font-bold text-slate-600">
                  <div>
                    <span className="text-slate-400 font-medium mr-1">Student:</span>
                    <span className="text-slate-900 font-black">{worksheet.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium mr-1">Level:</span>
                    <span className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-black">{worksheet.level}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium mr-1">Date:</span>
                    <span className="text-slate-900">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium mr-1">Domain:</span>
                    <span className="text-slate-900">{worksheet.theme}</span>
                  </div>
                </div>
              </div>

              {/* INSTRUCTIONS */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6 text-xs text-slate-700 font-medium">
                <div className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-indigo-600" />
                  {isRtl ? 'تعليمات ورقة العمل:' : 'Instructions:'}
                </div>
                <p className="mb-0.5">{worksheet.instructionsEn}</p>
                <p className="text-slate-500">{worksheet.instructionsAr}</p>
              </div>

              {/* READING PASSAGE (IF PRESENT) */}
              {worksheet.passage && (
                <div className="border border-indigo-100 bg-indigo-50/40 rounded-2xl p-5 mb-8">
                  <div className="text-xs font-black text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span>📖 {worksheet.passageTitle || 'Reading Comprehension Passage'}</span>
                  </div>
                  <p className="text-sm font-serif leading-relaxed text-slate-800 italic">
                    "{worksheet.passage}"
                  </p>
                </div>
              )}

              {/* QUESTIONS LIST */}
              <div className="space-y-6">
                {worksheet.questions.map((q, idx) => {
                  const userAnswer = userAnswers[q.id] || '';
                  const isCorrect = isSubmitted && userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                  const isWrong = isSubmitted && !isCorrect;

                  return (
                    <div 
                      key={q.id} 
                      className={`p-4 rounded-2xl border transition-all ${
                        isSubmitted
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-rose-300 bg-rose-50/40'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Question Number & Title */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-sm font-black text-slate-900 leading-snug">
                              {q.question}
                            </p>
                            <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                              {q.type}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Hint Trigger (Hidden in print) */}
                        {activeTab === 'interactive' && !isSubmitted && (
                          <button
                            type="button"
                            onClick={() => setRevealedHints(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                            className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 shrink-0 print:hidden"
                          >
                            <HelpCircle size={14} />
                            <span>{isRtl ? 'تلميح' : 'Hint'}</span>
                          </button>
                        )}
                      </div>

                      {/* Revealed Hint */}
                      {revealedHints[q.id] && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-800 font-medium mb-3 print:hidden">
                          💡 <strong>{isRtl ? 'تلميح:' : 'Hint:'}</strong> {q.hint}
                        </div>
                      )}

                      {/* OPTIONS / ANSWER INPUT */}
                      {activeTab === 'interactive' ? (
                        /* Interactive Mode Controls */
                        <div className="space-y-2 mt-3">
                          {q.options && q.options.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt) => {
                                const selected = userAnswer === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    disabled={isSubmitted}
                                    onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                                      selected
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {selected && <Check size={14} />}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={userAnswer}
                              onChange={(e) => setUserAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                              placeholder={isRtl ? 'اكتب إجابتك هنا...' : 'Type your answer...'}
                              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
                            />
                          )}
                        </div>
                      ) : (
                        /* Printable Format (Clean lines for handwriting) */
                        <div className="mt-3 space-y-2">
                          {q.options && q.options.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                              {q.options.map((opt, oIdx) => (
                                <div key={opt} className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-400 shrink-0" />
                                  <span>{String.fromCharCode(65 + oIdx)}) {opt}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border-b-2 border-dotted border-slate-300 h-8 mt-2" />
                          )}
                        </div>
                      )}

                      {/* EXPLANATION AFTER SUBMISSION */}
                      {isSubmitted && (
                        <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <span className="text-emerald-700 font-black flex items-center gap-1">
                                <CheckCircle2 size={14} /> {isRtl ? 'إجابة صحيحة وممتازة!' : 'Correct Answer!'}
                              </span>
                            ) : (
                              <span className="text-rose-700 font-black flex items-center gap-1">
                                <XCircle size={14} /> {isRtl ? `الإجابة الصحيحة: ${q.correctAnswer}` : `Correct: ${q.correctAnswer}`}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 font-medium">
                            💡 {q.explanationAr}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SUBMIT BUTTON IN INTERACTIVE MODE (Hidden in print) */}
              {activeTab === 'interactive' && (
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between print:hidden">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmitInteractive}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white rounded-xl font-black text-sm shadow-md transition-all cursor-pointer"
                    >
                      <CheckCircle2 size={18} />
                      <span>{isRtl ? 'تسليم الإجابات وتقييم الأداء 🎯' : 'Submit & Grade Worksheet 🎯'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setUserAnswers({});
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-black text-xs transition-all cursor-pointer"
                    >
                      <RotateCcw size={15} />
                      <span>{isRtl ? 'إعادة المحاولة' : 'Try Again'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowAnswerKey(!showAnswerKey)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>{showAnswerKey ? (isRtl ? 'إخفاء دليل المعلم' : 'Hide Teacher Key') : (isRtl ? 'عرض دليل المعلم والإجابات' : 'View Teacher Key')}</span>
                  </button>
                </div>
              )}

              {/* TEACHER / PARENT ANSWER KEY SECTION */}
              {(showAnswerKey || activeTab === 'printable') && (
                <div className="mt-10 pt-6 border-t-2 border-slate-900">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Award size={14} className="text-indigo-600" />
                      {isRtl ? 'دليل المعلم ونموذج الإجابة المعتمد (Answer Key)' : 'Teacher Answer Key & Explanations'}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400">For Assessment Use</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {worksheet.questions.map((q, idx) => (
                      <div key={q.id} className="pb-2 border-b border-slate-200 last:border-b-0">
                        <span className="font-black text-slate-900 mr-1.5">Q{idx + 1}:</span>
                        <span className="font-bold text-indigo-700">{q.correctAnswer}</span>
                        <div className="text-[11px] text-slate-500 mt-0.5">{q.explanationAr}</div>
                      </div>
                    ))}
                  </div>

                  {worksheet.teacherKeyNotes && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200 font-medium">
                      📌 <strong>{isRtl ? 'ملاحظات تربوية إضافية:' : 'Pedagogical Notes:'}</strong> {worksheet.teacherKeyNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
