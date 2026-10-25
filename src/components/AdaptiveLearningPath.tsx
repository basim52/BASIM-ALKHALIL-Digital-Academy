import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  Target,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Zap,
  Volume2,
  Lightbulb,
  ShieldCheck,
  Compass,
  BarChart3,
  Flame,
  ArrowLeft
} from 'lucide-react';
import { managedSpeak } from '../lib/audio';
import { computeSaraSkills } from '../lib/saraSkills';
import { loadLevelTestAttempts, summarizeLevelTests } from '../lib/saraLevelTests';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace
} from './ui/academy';

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
  uid?: string;
}

export const AdaptiveLearningPath: React.FC<AdaptiveLearningPathProps> = ({
  lang,
  onBack,
  userLevel = 'B1',
  userName = 'Student',
  onNavigateToView,
  uid
}) => {
  const isRtl = lang === 'ar';
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<GapAnalysisData | null>(null);
  const [loadError, setLoadError] = useState('');
  const [noData, setNoData] = useState(false);

  // Active Drill State
  const [activeDrillIndex, setActiveDrillIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [_drillScore, setDrillScore] = useState(0);
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
  }, [userLevel, uid]);

  const fetchGapAnalysis = async () => {
    setLoading(true);
    setLoadError('');
    try {
      // Real data only: Sara track progress + level-test results. No sample answers.
      const sk = await computeSaraSkills(uid, userLevel);
      const tests = uid ? summarizeLevelTests(await loadLevelTestAttempts(uid)) : [];
      if (!sk.hasData && tests.length === 0) {
        setNoData(true); setAnalysisData(null); setLoading(false);
        return;
      }
      setNoData(false);
      const studentAnswers = [
        ...sk.skills.map(x => ({ skill: x.labelEn, lessonsPassed: x.passed, lessonsTotal: x.total, bestLevelTest: x.testBest })),
        ...tests.map(t => ({ levelTest: `${t.trackId}/${t.levelId}`, bestScore: t.best.score, latestScore: t.latest.score, attempts: t.attempts,
          weakLessons: (t.latest.weakLessons || []).slice(0, 6).map(w => ({ lesson: w.titleAr, wrong: w.wrong })) })),
        ...sk.exam.map(e => ({ examPractice: `${e.exam} ${e.kind}: ${e.title}`, note: 'original practice set; raw correct answers only, NOT an official band/score',
          bestCorrect: e.bestCorrect, lastCorrect: e.lastCorrect, questions: e.total, lastTimeSec: e.lastTimeSec, timeLimitSec: e.limitSec, attempts: e.attempts })),
      ];
      const realPct = (id: string) => sk.skills.find(x => x.id === id);
      const res = await fetch('/api/ai/adaptive-gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentLevel: userLevel, studentName: userName, studentAnswers })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || !Array.isArray(data.detectedGaps)) throw new Error('BAD_RESPONSE');
      const radar: Record<string, number> = {};
      sk.skills.forEach(x => { radar[x.id] = x.testBest !== null ? Math.max(x.pct, x.testBest) : x.pct; });
      const vals = Object.values(radar);
      setAnalysisData({ ...data, overallMastery: vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0, cefrEstimated: userLevel, skillRadar: radar, actionPlanAr: Array.isArray(data.actionPlanAr) ? data.actionPlanAr : [] });
      void realPct;
      setLoadError('');
    } catch (e) {
      console.error(e);
      setAnalysisData(null);
      setLoadError('تعذّر تحميل التحليل الآن. تأكد من تسجيل الدخول والاتصال ثم أعد المحاولة.');
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
    managedSpeak(utterance);
  };

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-24 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#C49E3A]/25">
        <div className="flex items-center gap-3">
          <TutorFace tutor="sara" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'مسار التعلم التكيفي وتشخيص الثغرات الذكي' : 'Adaptive Learning Path & Gap Diagnostics'}
              </h1>
              <ProgressPill>
                {userLevel} CEFR
              </ProgressPill>
            </div>
            <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
              {isRtl 
                ? 'تحليل ذكي للأداء اللغوي واستخراج الثغرات وتوليد التمارين العلاجية الفورية'
                : 'AI-driven diagnostics to pinpoint knowledge gaps and solve targeted remedial drills'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <GhostButton
            onClick={fetchGapAnalysis}
            disabled={loading}
          >
            <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{isRtl ? 'إعادة الفحص' : 'Re-run'}</span>
          </GhostButton>

          <GhostButton onClick={onBack}>
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            <span>{isRtl ? 'العودة' : 'Back'}</span>
          </GhostButton>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <GoldCard className="flex flex-col items-center justify-center p-12 sm:p-16 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full border-3 border-[#C49E3A]/30 border-t-[#002147] animate-spin" />
          <p className="text-xs sm:text-sm font-bold text-[#002147]/70">
            {isRtl ? 'جاري تحليل الأداء اللغوي واستخراج الثغرات الدقيقة وتوليد التمارين العلاجية...' : 'Analyzing linguistic mastery and pinpointing knowledge gaps...'}
          </p>
        </GoldCard>
      )}

      {/* No Data State */}
      {!loading && noData && (
        <GoldCard className="mx-auto my-8 max-w-md p-6 text-center space-y-4">
          <p className="text-5xl font-black text-[#002147]">0%</p>
          <p className="text-xs sm:text-sm font-bold text-[#002147]/70">
            {isRtl ? 'ما فيه نتائج دروس أو اختبارات بعد. ابدأ أول درس عشان نحلل مستواك الحقيقي.' : 'No lesson or test results yet. Start your first lesson to analyze your level.'}
          </p>
          <PrimaryButton onClick={() => onNavigateToView?.('sara-continue')} className="w-full">
            {isRtl ? 'ابدأ أول درس' : 'Start First Lesson'}
          </PrimaryButton>
        </GoldCard>
      )}

      {/* Error State */}
      {!loading && !analysisData && loadError && (
        <GoldCard className="mx-auto my-8 max-w-md p-6 text-center space-y-4">
          <p className="text-xs sm:text-sm font-bold text-red-700">{loadError}</p>
          <PrimaryButton onClick={fetchGapAnalysis} className="w-full">
            {isRtl ? 'إعادة المحاولة' : 'Retry'}
          </PrimaryButton>
        </GoldCard>
      )}

      {/* Main Dashboard Content */}
      {!loading && analysisData && (
        <div className="space-y-6">
          
          {/* Overview Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Overall Mastery */}
            <GoldCard className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#002147]/70">
                  {isRtl ? 'مؤشر الإتقان العام' : 'Overall Mastery Score'}
                </span>
                <Award className="w-5 h-5 text-[#C49E3A]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#002147]">{analysisData.overallMastery}%</span>
                <ProgressPill className="text-[10px]">
                  {isRtl ? '+5% هذا الأسبوع' : '+5% this week'}
                </ProgressPill>
              </div>
              <div className="w-full bg-[#fdfaf3] border border-[#C49E3A]/30 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#002147] transition-all duration-700"
                  style={{ width: `${analysisData.overallMastery}%` }}
                />
              </div>
            </GoldCard>

            {/* CEFR Level Evaluation */}
            <GoldCard className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#002147]/70">
                  {isRtl ? 'المستوى المقدر حالياً' : 'Estimated CEFR Level'}
                </span>
                <Compass className="w-5 h-5 text-[#C49E3A]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#002147]">{analysisData.cefrEstimated}</span>
                <span className="text-xs font-bold text-[#002147]/70">
                  {isRtl ? 'معيار أكسفورد الأوروبي' : 'Oxford CEFR Aligned'}
                </span>
              </div>
              <p className="text-xs text-[#002147]/65">
                {isRtl ? 'مؤهل للانتقال إلى المستوى التالي بعد معالجة الثغرات المحددة.' : 'Targeting next CEFR tier upon finishing remedial tasks.'}
              </p>
            </GoldCard>

            {/* Resolved Drills */}
            <GoldCard className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#002147]/70">
                  {isRtl ? 'الثغرات المعالجة' : 'Gaps Successfully Remediated'}
                </span>
                <ShieldCheck className="w-5 h-5 text-[#C49E3A]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#002147]">{completedDrills.length}</span>
                <span className="text-xs font-bold text-[#002147]/70">/ {analysisData.detectedGaps.length}</span>
              </div>
              <div className="w-full bg-[#fdfaf3] border border-[#C49E3A]/30 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C49E3A] transition-all duration-700"
                  style={{ width: `${(completedDrills.length / (analysisData.detectedGaps.length || 1)) * 100}%` }}
                />
              </div>
            </GoldCard>

          </div>

          {/* 5-Pillar Competency Breakdown */}
          <GoldCard className="p-5 sm:p-6 space-y-4">
            <h2 className="text-sm sm:text-base font-black text-[#002147] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C49E3A]" />
              <span>{isRtl ? 'توزيع الكفاءة عبر المهارات اللغوية الخمس' : '5-Pillar Competency Breakdown'}</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {Object.entries(analysisData.skillRadar).map(([skill, val]) => {
                const skillNames: Record<string, { ar: string; en: string }> = {
                  grammar: { ar: 'القواعد (Grammar)', en: 'Grammar' },
                  vocabulary: { ar: 'المفردات (Vocab)', en: 'Vocabulary' },
                  pronunciation: { ar: 'النطق والصوتيات', en: 'Pronunciation' },
                  listening: { ar: 'الاستماع (Listening)', en: 'Listening' },
                  reading: { ar: 'القراءة والفهم', en: 'Reading' }
                };
                return (
                  <div key={skill} className="p-3.5 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/30 flex flex-col items-center text-center">
                    <span className="text-xs font-black text-[#002147]">{isRtl ? skillNames[skill]?.ar : skillNames[skill]?.en}</span>
                    <span className="text-xl sm:text-2xl font-black text-[#002147] mt-1.5">{val}%</span>
                    <div className="w-full bg-white border border-[#C49E3A]/30 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-[#C49E3A] rounded-full" 
                        style={{ width: `${val}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GoldCard>

          {/* Detected Gaps & Targeted Remedial Drills */}
          <GoldCard className="p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C49E3A]/25 pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#002147] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#C49E3A]" />
                  <span>{isRtl ? 'الثغرات المرصودة والتمارين العلاجية المباشرة' : 'Detected Gaps & Targeted Remedial Drills'}</span>
                </h2>
                <p className="text-xs text-[#002147]/70 mt-0.5">
                  {isRtl ? 'اختر أي ثغرة لبدء التمرين التفاعلي ومعالجتها فورا بالأمثلة التوضيحية.' : 'Click on any detected gap to solve targeted drills and close linguistic weaknesses.'}
                </p>
              </div>

              <ProgressPill>
                {completedDrills.length} / {analysisData.detectedGaps.length} {isRtl ? 'معالجة' : 'Solved'}
              </ProgressPill>
            </div>

            {/* Gaps List mapped using LessonTile */}
            <div className="space-y-3">
              {analysisData.detectedGaps.map((gap, index) => {
                const isResolved = completedDrills.includes(gap.id);
                const isOpened = activeDrillIndex === index;

                return (
                  <div key={gap.id} className="space-y-2">
                    <LessonTile
                      order={index + 1}
                      title={isRtl ? gap.topicAr : gap.topicEn}
                      subtitle={`${gap.domain} · ${gap.explanationAr}`}
                      level={gap.severity}
                      done={isResolved}
                      active={isOpened}
                      onClick={() => {
                        setActiveDrillIndex(isOpened ? null : index);
                        setSelectedOption(null);
                        setIsAnswerSubmitted(false);
                        setShowHint(false);
                      }}
                    />

                    {/* Expanded Drill View */}
                    {isOpened && (
                      <div className="p-4 sm:p-5 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl space-y-4">
                        {/* Explanation Box */}
                        <div className="p-3.5 rounded-xl bg-white border border-[#C49E3A]/30 flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-[#C49E3A] shrink-0 mt-0.5" />
                          <div className="text-xs text-[#002147]/80 leading-relaxed">
                            <strong className="text-[#002147]">{isRtl ? 'التفسير الأكاديمي والحل: ' : 'Pedagogical Explanation: '}</strong>
                            {gap.explanationAr}
                          </div>
                        </div>

                        {/* Question Sentence */}
                        <div className="p-4 rounded-xl bg-white border border-[#C49E3A]/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#002147] flex items-center gap-1.5">
                              <Target className="w-4 h-4 text-[#C49E3A]" />
                              <span>{isRtl ? 'التمرين العلاجي المباشر' : 'Remedial Drill'}</span>
                            </span>
                            
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleStartDynamicQuiz(gap.topicEn)}
                                className="px-2.5 py-1 rounded-lg bg-[#fdfaf3] border border-[#C49E3A]/40 hover:bg-white text-[11px] font-black text-[#002147] flex items-center gap-1 cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-[#C49E3A]" />
                                <span>{isRtl ? 'اختبار مولد ذكياً' : 'AI Quiz'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => speakText(gap.remedialDrill.question)}
                                className="p-1 rounded-lg bg-[#fdfaf3] border border-[#C49E3A]/40 hover:bg-white text-[#002147] cursor-pointer"
                                title="Pronounce"
                              >
                                <Volume2 className="w-4 h-4 text-[#C49E3A]" />
                              </button>
                            </div>
                          </div>

                          <p className="text-sm sm:text-base font-black text-[#002147]">
                            {gap.remedialDrill.question}
                          </p>

                          {/* Options using AnswerOption */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {gap.remedialDrill.options.map((opt, optIdx) => {
                              const state = isAnswerSubmitted
                                ? optIdx === gap.remedialDrill.correctIndex
                                  ? 'correct'
                                  : selectedOption === optIdx
                                  ? 'wrong'
                                  : 'normal'
                                : 'normal';

                              return (
                                <AnswerOption
                                  key={optIdx}
                                  label={opt}
                                  state={state}
                                  selected={selectedOption === optIdx}
                                  disabled={isAnswerSubmitted}
                                  onClick={() => setSelectedOption(optIdx)}
                                />
                              );
                            })}
                          </div>

                          {/* Actions and Hint */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <GhostButton
                              onClick={() => setShowHint(!showHint)}
                              className="text-xs"
                            >
                              <HelpCircle className="w-3.5 h-3.5 text-[#C49E3A]" />
                              <span>{showHint ? (isRtl ? 'إخفاء التلميح' : 'Hide Hint') : (isRtl ? 'طلب تلميح ذكي' : 'Need a hint?')}</span>
                            </GhostButton>

                            {!isAnswerSubmitted ? (
                              <PrimaryButton
                                onClick={() => handleDrillSubmit(gap.remedialDrill.correctIndex, gap.id)}
                                disabled={selectedOption === null}
                              >
                                {isRtl ? 'تأكيد الإجابة' : 'Submit Answer'}
                              </PrimaryButton>
                            ) : (
                              <ProgressPill>
                                {selectedOption === gap.remedialDrill.correctIndex
                                  ? (isRtl ? 'إجابة صحيحة! أحسنت 🌟' : 'Excellent! Gap closed.')
                                  : (isRtl ? 'راجع التفسير أعلاه وحاول مجدداً' : 'Review explanation above.')}
                              </ProgressPill>
                            )}
                          </div>

                          {/* Hint Box */}
                          {showHint && (
                            <div className="p-3 rounded-xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-xs text-[#002147] font-semibold">
                              💡 {gap.remedialDrill.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </GoldCard>

          {/* Dynamic AI Generated Quiz Section */}
          {generatingQuiz && (
            <GoldCard className="p-8 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-[#C49E3A]/30 border-t-[#002147] rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-[#002147]/70">
                {isRtl ? 'جاري توليد اختبار ديناميكي مخصص بالذكاء الاصطناعي...' : 'Generating dynamic adaptive AI quiz...'}
              </p>
            </GoldCard>
          )}

          {dynamicQuiz && (
            <GoldCard className="p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-[#C49E3A]/25 pb-3">
                <div>
                  <ProgressPill className="text-[10px] mb-1">
                    Dynamic Adaptive Quiz
                  </ProgressPill>
                  <h3 className="text-base sm:text-lg font-black text-[#002147]">{dynamicQuiz.quizTitle}</h3>
                </div>
                <GhostButton
                  onClick={() => setDynamicQuiz(null)}
                  className="p-1.5"
                >
                  <XCircle className="w-5 h-5" />
                </GhostButton>
              </div>

              {quizQuestionIndex < (dynamicQuiz.questions?.length || 0) ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[#002147]/70">
                    <span>{isRtl ? `سؤال ${quizQuestionIndex + 1} من ${dynamicQuiz.questions.length}` : `Question ${quizQuestionIndex + 1} of ${dynamicQuiz.questions.length}`}</span>
                    <ProgressPill>{isRtl ? `النقاط: ${quizScore}` : `Score: ${quizScore}`}</ProgressPill>
                  </div>

                  <p className="text-sm sm:text-base font-black text-[#002147]">
                    {dynamicQuiz.questions[quizQuestionIndex].question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {dynamicQuiz.questions[quizQuestionIndex].options.map((opt: string, i: number) => {
                      const state = quizSubmitted
                        ? i === dynamicQuiz.questions[quizQuestionIndex].correctIndex
                          ? 'correct'
                          : quizSelectedOption === i
                          ? 'wrong'
                          : 'normal'
                        : 'normal';

                      return (
                        <AnswerOption
                          key={i}
                          label={opt}
                          state={state}
                          selected={quizSelectedOption === i}
                          disabled={quizSubmitted}
                          onClick={() => setQuizSelectedOption(i)}
                        />
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {!quizSubmitted ? (
                      <PrimaryButton
                        onClick={() => handleQuizSubmit(dynamicQuiz.questions[quizQuestionIndex].correctIndex)}
                        disabled={quizSelectedOption === null}
                      >
                        {isRtl ? 'تحقق من الإجابة' : 'Check'}
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        onClick={handleNextQuizQuestion}
                        className="flex items-center gap-1.5"
                      >
                        <span>{isRtl ? 'السؤال التالي' : 'Next Question'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </PrimaryButton>
                    )}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3.5 rounded-xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-xs text-[#002147]">
                      <span className="font-black text-[#002147]">{isRtl ? 'الشرح: ' : 'Explanation: '}</span>
                      {dynamicQuiz.questions[quizQuestionIndex].explanationAr}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <Award className="w-12 h-12 text-[#C49E3A] mx-auto" />
                  <h4 className="text-base sm:text-lg font-black text-[#002147]">
                    {isRtl ? 'اكتمل الاختبار التكيفي بنجاح!' : 'Adaptive Quiz Completed!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#002147]/70 font-bold">
                    {isRtl ? `نتيجتك: ${quizScore} من ${dynamicQuiz.questions.length}` : `Your Score: ${quizScore} / ${dynamicQuiz.questions.length}`}
                  </p>
                  <PrimaryButton onClick={() => setDynamicQuiz(null)}>
                    {isRtl ? 'إغلاق والعودة للمسار' : 'Done'}
                  </PrimaryButton>
                </div>
              )}
            </GoldCard>
          )}

          {/* Action Plan Roadmap */}
          <GoldCard className="p-5 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-black text-[#002147] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C49E3A]" />
              <span>{isRtl ? 'خطة العمل والتوصيات الأكاديمية المقترحة' : 'Pedagogical Recommendations & Action Plan'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {analysisData.actionPlanAr.map((plan, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#002147] text-[#E6C36A] font-black text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-xs font-semibold text-[#002147]/80 leading-relaxed">{plan}</p>
                </div>
              ))}
            </div>
          </GoldCard>

        </div>
      )}
    </SectionShell>
  );
};
