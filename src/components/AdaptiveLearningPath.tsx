import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Sparkles,
  Target,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Volume2,
  Play,
  Lightbulb,
  ShieldCheck,
  Compass,
  BarChart3,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface GapItem {
  id: string;
  domain: string;
  topicAr: string;
  topicEn: string;
  severity: 'High' | 'Medium' | 'Low';
  explanationAr: string;
  remedialDrill: {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
  };
}

interface GapAnalysisData {
  overallMastery: number;
  cefrEstimated: string;
  detectedGaps: GapItem[];
  skillRadar: {
    grammar: number;
    vocabulary: number;
    pronunciation: number;
    listening: number;
    reading: number;
  };
  actionPlanAr: string[];
}

interface AdaptiveLearningPathProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  userLevel?: string;
  userName?: string;
  onNavigateToView?: (view: any) => void;
}

export const AdaptiveLearningPath: React.FC<AdaptiveLearningPathProps> = ({
  lang,
  onBack,
  userLevel = 'B1',
  userName = 'Student',
  onNavigateToView
}) => {
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<GapAnalysisData | null>(null);

  // Active Drill State
  const [activeDrillIndex, setActiveDrillIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [drillScore, setDrillScore] = useState(0);
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [dynamicQuiz, setDynamicQuiz] = useState<any | null>(null);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Initial Load & AI Diagnostic Call
  useEffect(() => {
    fetchGapAnalysis();
  }, [userLevel]);

  const fetchGapAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/adaptive-gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLevel: userLevel,
          studentName: userName,
          studentAnswers: [
            { question: "Present Perfect vs Past Simple", correct: false },
            { question: "Voicing P vs B", correct: false },
            { question: "Collocations with Make/Do", correct: true }
          ]
        })
      });
      const data = await res.json();
      setAnalysisData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDynamicQuiz = async (topic: string) => {
    setGeneratingQuiz(true);
    setDynamicQuiz(null);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);

    try {
      const res = await fetch('/api/ai/generate-dynamic-adaptive-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: userLevel,
          topic: topic,
          count: 4
        })
      });
      const data = await res.json();
      setDynamicQuiz(data);
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const handleDrillSubmit = (correctIdx: number, drillId: string) => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === correctIdx) {
      setDrillScore(prev => prev + 1);
      if (!completedDrills.includes(drillId)) {
        setCompletedDrills(prev => [...prev, drillId]);
      }
    }
  };

  const handleQuizSubmit = (correctIdx: number) => {
    if (quizSelectedOption === null) return;
    setQuizSubmitted(true);
    if (quizSelectedOption === correctIdx) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setQuizQuestionIndex(prev => prev + 1);
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700/50"
            >
              <ArrowRight className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isRtl ? 'الذكاء الاصطناعي التشخيصي والتكيفي' : 'Adaptive AI Diagnostics'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {userLevel} CEFR
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {isRtl ? 'مسار التعلم التكيفي وتشخيص الثغرات الذكي' : 'Adaptive Learning Path & Gap Diagnostics'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchGapAnalysis}
              disabled={loading}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{isRtl ? 'إعادة الفحص والتشخيص' : 'Re-run Diagnostics'}</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-16 space-y-4 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <Brain className="w-7 h-7 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="text-slate-400 font-bold text-sm">
              {isRtl ? 'جاري تحليل الأداء اللغوي واستخراج الثغرات الدقيقة وتوليد التمارين العلاجية...' : 'Analyzing linguistic mastery and pinpointing knowledge gaps...'}
            </p>
          </div>
        )}

        {/* Main Dashboard Content */}
        {!loading && analysisData && (
          <div className="space-y-6">
            
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Overall Mastery */}
              <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900/80 border border-indigo-800/40 p-5 rounded-3xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">
                    {isRtl ? 'مؤشر الإتقان العام' : 'Overall Mastery Score'}
                  </span>
                  <Award className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{analysisData.overallMastery}%</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +5% هذا الأسبوع
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${analysisData.overallMastery}%` }}
                  />
                </div>
              </div>

              {/* CEFR Level Evaluation */}
              <div className="bg-gradient-to-br from-purple-950/60 to-slate-900/80 border border-purple-800/40 p-5 rounded-3xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">
                    {isRtl ? 'المستوى المقدر حالياً' : 'Estimated CEFR Level'}
                  </span>
                  <Compass className="w-5 h-5 text-purple-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-purple-300">{analysisData.cefrEstimated}</span>
                  <span className="text-xs font-bold text-slate-400">
                    {isRtl ? 'معيار أكسفورد الأوروبي المشترك' : 'Oxford CEFR Aligned'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isRtl ? 'مؤهل للانتقال إلى المستوى التالي بعد معالجة الثغرات المحددة أدناه.' : 'Targeting next CEFR tier upon finishing remedial tasks.'}
                </p>
              </div>

              {/* Active Resolved Drills */}
              <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900/80 border border-emerald-800/40 p-5 rounded-3xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300">
                    {isRtl ? 'الثغرات التي تم تصحيحها' : 'Gaps Successfully Remediated'}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-300">{completedDrills.length}</span>
                  <span className="text-xs font-bold text-slate-400">/ {analysisData.detectedGaps.length}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${(completedDrills.length / (analysisData.detectedGaps.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Skill Radar / Strengths & Weaknesses Breakdown */}
            <div className="bg-slate-900/80 border border-slate-800/80 p-6 rounded-3xl">
              <h2 className="text-base font-black text-white flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                {isRtl ? 'توزيع الكفاءة عبر المهارات اللغوية الخمس' : '5-Pillar Competency Breakdown'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Object.entries(analysisData.skillRadar).map(([skill, val]) => {
                  const skillNames: Record<string, { ar: string; en: string }> = {
                    grammar: { ar: 'القواعد (Grammar)', en: 'Grammar' },
                    vocabulary: { ar: 'المفردات (Vocab)', en: 'Vocabulary' },
                    pronunciation: { ar: 'النطق والصوتيات', en: 'Pronunciation' },
                    listening: { ar: 'الاستماع (Listening)', en: 'Listening' },
                    reading: { ar: 'القراءة والفهم', en: 'Reading' }
                  };
                  return (
                    <div key={skill} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex flex-col items-center text-center">
                      <span className="text-xs font-black text-slate-300">{isRtl ? skillNames[skill]?.ar : skillNames[skill]?.en}</span>
                      <span className="text-2xl font-black text-indigo-400 mt-2">{val}%</span>
                      <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: `${val}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Interactive Remedial Exercises */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    {isRtl ? 'الثغرات المرصودة والتمارين العلاجية المباشرة' : 'Detected Gaps & Targeted Remedial Drills'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {isRtl ? 'اختر أي ثغرة لبدء التمرين التفاعلي ومعالجتها فورا بالأمثلة التوضيحية.' : 'Click on any detected gap to solve targeted drills and close linguistic weaknesses.'}
                  </p>
                </div>
              </div>

              {/* Gaps List */}
              <div className="grid grid-cols-1 gap-4">
                {analysisData.detectedGaps.map((gap, index) => {
                  const isResolved = completedDrills.includes(gap.id);
                  const isOpened = activeDrillIndex === index;

                  const severityBadge = {
                    High: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
                    Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                    Low: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }[gap.severity];

                  return (
                    <div
                      key={gap.id}
                      className={`border rounded-2xl transition-all ${
                        isOpened
                          ? 'bg-slate-800/80 border-indigo-500/60 shadow-xl'
                          : 'bg-slate-800/30 border-slate-700/60 hover:border-slate-600'
                      }`}
                    >
                      {/* Gap Header Accordion */}
                      <div
                        onClick={() => {
                          setActiveDrillIndex(isOpened ? null : index);
                          setSelectedOption(null);
                          setIsAnswerSubmitted(false);
                          setShowHint(false);
                        }}
                        className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                            isResolved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
                          }`}>
                            {isResolved ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-white">{isRtl ? gap.topicAr : gap.topicEn}</span>
                              <span className="text-xs text-slate-400">({gap.domain})</span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${severityBadge}`}>
                                {gap.severity} Priority
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 line-clamp-1">{gap.explanationAr}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartDynamicQuiz(gap.topicEn);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-xs font-bold text-indigo-300 flex items-center gap-1.5 transition-all"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{isRtl ? 'اختبار مولد ذكياً' : 'AI Quiz'}</span>
                          </button>
                          <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                            isResolved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {isResolved ? (isRtl ? 'تم العلاج بنجاح ✅' : 'Remediated') : (isRtl ? 'حل التمرين 🎯' : 'Start Drill')}
                          </span>
                        </div>
                      </div>

                      {/* Remedial Drill Area */}
                      <AnimatePresence>
                        {isOpened && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-5 pb-5 pt-2 border-t border-slate-700/60 space-y-4"
                          >
                            {/* Educational Explanation Box */}
                            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-start gap-3">
                              <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                              <div className="text-xs text-slate-200 leading-relaxed">
                                <span className="font-bold text-indigo-300">{isRtl ? 'التفسير الأكاديمي والحل:' : 'Pedagogical Explanation:'} </span>
                                {gap.explanationAr}
                              </div>
                            </div>

                            {/* Question sentence */}
                            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-indigo-400 flex items-center gap-1.5">
                                  <Target className="w-4 h-4" /> {isRtl ? 'التمرين العلاجي المباشر' : 'Remedial Drill'}
                                </span>
                                <button
                                  onClick={() => speakText(gap.remedialDrill.question)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                                  title="Pronounce"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>

                              <p className="text-sm sm:text-base font-bold text-white">
                                {gap.remedialDrill.question}
                              </p>

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {gap.remedialDrill.options.map((opt, optIdx) => {
                                  let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500';
                                  if (selectedOption === optIdx) {
                                    btnStyle = 'bg-indigo-600/30 border-indigo-500 text-indigo-200';
                                  }
                                  if (isAnswerSubmitted) {
                                    if (optIdx === gap.remedialDrill.correctIndex) {
                                      btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-black';
                                    } else if (selectedOption === optIdx) {
                                      btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      disabled={isAnswerSubmitted}
                                      onClick={() => setSelectedOption(optIdx)}
                                      className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between text-left cursor-pointer ${btnStyle}`}
                                    >
                                      <span>{opt}</span>
                                      {isAnswerSubmitted && optIdx === gap.remedialDrill.correctIndex && (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                      )}
                                      {isAnswerSubmitted && selectedOption === optIdx && optIdx !== gap.remedialDrill.correctIndex && (
                                        <XCircle className="w-4 h-4 text-rose-400" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Action Buttons & Hints */}
                              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                <button
                                  onClick={() => setShowHint(!showHint)}
                                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                                >
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  <span>{showHint ? (isRtl ? 'إخفاء التلميح' : 'Hide Hint') : (isRtl ? 'طلب تلميح ذكي' : 'Need a hint?')}</span>
                                </button>

                                {!isAnswerSubmitted ? (
                                  <button
                                    onClick={() => handleDrillSubmit(gap.remedialDrill.correctIndex, gap.id)}
                                    disabled={selectedOption === null}
                                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                                  >
                                    {isRtl ? 'تأكيد الإجابة' : 'Submit Answer'}
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-emerald-400">
                                      {selectedOption === gap.remedialDrill.correctIndex
                                        ? (isRtl ? 'إجابة صحيحة! أحسنت 🌟' : 'Excellent! Gap closed.')
                                        : (isRtl ? 'راجع التفسير أعلاه وحاول مجددا' : 'Review explanation above.')}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Hint Box */}
                              {showHint && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200"
                                >
                                  💡 {gap.remedialDrill.hint}
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic AI Generated Quiz Modal / Section */}
            {generatingQuiz && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-300">
                  {isRtl ? 'جاري توليد كويز ديناميكي مخصص بالذكاء الاصطناعي...' : 'Generating dynamic adaptive AI quiz...'}
                </p>
              </div>
            )}

            {dynamicQuiz && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-700/60 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-indigo-800/40 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-2.5 py-1 rounded-md border border-indigo-500/30">
                      Dynamic Adaptive Quiz
                    </span>
                    <h3 className="text-lg font-black text-white mt-1">{dynamicQuiz.quizTitle}</h3>
                  </div>
                  <button
                    onClick={() => setDynamicQuiz(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {quizQuestionIndex < (dynamicQuiz.questions?.length || 0) ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>سؤال {quizQuestionIndex + 1} من {dynamicQuiz.questions.length}</span>
                      <span>النقاط: {quizScore}</span>
                    </div>

                    <p className="text-base font-bold text-white">
                      {dynamicQuiz.questions[quizQuestionIndex].question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dynamicQuiz.questions[quizQuestionIndex].options.map((opt: string, i: number) => {
                        let style = 'bg-slate-800/80 border-slate-700 text-slate-200';
                        if (quizSelectedOption === i) style = 'bg-indigo-600/40 border-indigo-500 text-indigo-100';
                        if (quizSubmitted) {
                          if (i === dynamicQuiz.questions[quizQuestionIndex].correctIndex) {
                            style = 'bg-emerald-600/40 border-emerald-500 text-emerald-100 font-bold';
                          } else if (quizSelectedOption === i) {
                            style = 'bg-rose-600/40 border-rose-500 text-rose-100';
                          }
                        }

                        return (
                          <button
                            key={i}
                            disabled={quizSubmitted}
                            onClick={() => setQuizSelectedOption(i)}
                            className={`p-3.5 rounded-xl border text-sm font-semibold text-left transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {!quizSubmitted ? (
                        <button
                          onClick={() => handleQuizSubmit(dynamicQuiz.questions[quizQuestionIndex].correctIndex)}
                          disabled={quizSelectedOption === null}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
                        >
                          {isRtl ? 'تحقق من الإجابة' : 'Check'}
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuizQuestion}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{isRtl ? 'السؤال التالي' : 'Next Question'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300">
                        <span className="font-bold text-indigo-400">الشرح: </span>
                        {dynamicQuiz.questions[quizQuestionIndex].explanationAr}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <Award className="w-12 h-12 text-amber-400 mx-auto" />
                    <h4 className="text-lg font-black text-white">
                      {isRtl ? 'اكتمل الاختبار التكيفي بنجاح!' : 'Adaptive Quiz Completed!'}
                    </h4>
                    <p className="text-sm text-slate-300">
                      {isRtl ? `نتيجتك: ${quizScore} من ${dynamicQuiz.questions.length}` : `Your Score: ${quizScore} / ${dynamicQuiz.questions.length}`}
                    </p>
                    <button
                      onClick={() => setDynamicQuiz(null)}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                    >
                      {isRtl ? 'إغلاق والعودة للمسار' : 'Done'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Plan Roadmap */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                {isRtl ? 'خطة العمل والتوصيات الأكاديمية المقترحة' : 'Pedagogical Recommendations & Action Plan'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {analysisData.actionPlanAr.map((plan, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-black text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold text-slate-300 leading-relaxed">{plan}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
