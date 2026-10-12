import React, { useState } from 'react';
import {
  X,
  Brain,
  Sparkles,
  Zap,
  Target,
  Clock,
  Compass,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Award,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TutorMemoryDoc, LearningStyleType, LearningPacingType } from '../types';

interface SaraAdaptiveMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorMemory: TutorMemoryDoc;
  studentName: string;
  studentLevel: string;
  isRtl: boolean;
  onUpdateLearningStyle: (style: LearningStyleType, pacing: LearningPacingType) => Promise<void>;
  onClearMemory: () => Promise<void>;
  onPracticeTopic: (topicPrompt: string) => void;
  onPracticeMistake: (mistakePrompt: string) => void;
}

const LEARNING_STYLES: {
  id: LearningStyleType;
  titleAr: string;
  titleEn: string;
  icon: string;
  descAr: string;
  descEn: string;
  tagAr: string;
  tagEn: string;
  gradient: string;
}[] = [
  {
    id: 'visual_interactive',
    titleAr: 'بصري وتفاعلي',
    titleEn: 'Visual & Interactive',
    icon: '🎨',
    descAr: 'تركز سارة على السبورة التفاعلية، المخططات الملونة، تفكيك صيغ القواعد بصرياً، والرموز التوضيحية.',
    descEn: 'Sara prioritizes whiteboard diagrams, color-coded syntax formulas, and visual model sentences.',
    tagAr: 'السبورة والألوان',
    tagEn: 'Chalkboard & Color Maps',
    gradient: 'from-amber-500/20 to-orange-500/10 border-amber-400/40'
  },
  {
    id: 'scaffolded_step_by_step',
    titleAr: 'خطوات تدريجية مبسطة',
    titleEn: 'Step-by-Step Scaffolding',
    icon: '🪜',
    descAr: 'تقسيم كل قاعدة إلى خطوات صغيرة ومبسطة، مع أسئلة تحقق سريعة وتلميحات إرشادية قبل التقدم.',
    descEn: 'Breaks every rule into bite-sized sequential micro-steps with gentle guided discovery.',
    tagAr: 'تبسيط وتدرج',
    tagEn: 'Bite-sized Steps',
    gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-400/40'
  },
  {
    id: 'gamified_challenges',
    titleAr: 'تحديات وألعاب حماسية',
    titleEn: 'Gamified & Challenges',
    icon: '🕹️',
    descAr: 'صياغة الدروس كتحديات ومهام ومسابقات سريعة لاختبار السرعة والتركيز مع حماس ونقاط تشجيعية.',
    descEn: 'Frames explanations as quests, speed drills, and score-earning challenges with energetic feedback.',
    tagAr: 'نقاط ومسابقات',
    tagEn: 'Quests & Points',
    gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-400/40'
  },
  {
    id: 'conversational_immersive',
    titleAr: 'حواري وتطبيقي واقعي',
    titleEn: 'Conversational Immersion',
    icon: '💬',
    descAr: 'التركيز على المواقف الحياتية الواقعية، الطلاقة السريعة، والتحدث الطبيعي بدلاً من القواعد الجافة.',
    descEn: 'Focuses on real-world situational roleplay, rapid conversational turns, and communicative fluency.',
    tagAr: 'تحدث وطلاقة',
    tagEn: 'Fluency & Immersion',
    gradient: 'from-purple-500/20 to-pink-500/10 border-purple-400/40'
  }
];

const PACING_OPTIONS: {
  id: LearningPacingType;
  titleAr: string;
  titleEn: string;
  icon: string;
  descAr: string;
  descEn: string;
}[] = [
  {
    id: 'gentle_patient',
    titleAr: 'هادئة وصبورة ومطمئنة 🌿',
    titleEn: 'Gentle & Patient 🌿',
    icon: '🌿',
    descAr: 'إعطاء وقت كافٍ للتفكير، تشجيع مكثف، وإعادة الصياغة بلطف دون استعجال.',
    descEn: 'Plenty of thinking time, extra warm encouragement, and reassuring repetition.'
  },
  {
    id: 'balanced',
    titleAr: 'متوازنة ومعتدلة ⚖️',
    titleEn: 'Balanced & Steady ⚖️',
    icon: '⚖️',
    descAr: 'وتيرة طبيعية تجمع بين الشرح الكافي والتدريب التفاعلي المنتظم.',
    descEn: 'Natural progression balancing comprehensive explanation and interactive practice.'
  },
  {
    id: 'fast_challenging',
    titleAr: 'سريعة ومليئة بالتحديات ⚡',
    titleEn: 'Fast & High Challenge ⚡',
    icon: '⚡',
    descAr: 'الانتقال السريع للأمثلة المتقدمة والحالات الخاصة والأسئلة الاستثنائية.',
    descEn: 'Accelerated pacing jumping straight to advanced models, nuances, and rapid drills.'
  }
];

export const SaraAdaptiveMemoryModal: React.FC<SaraAdaptiveMemoryModalProps> = ({
  isOpen,
  onClose,
  tutorMemory,
  studentName,
  studentLevel,
  isRtl,
  onUpdateLearningStyle,
  onClearMemory,
  onPracticeTopic,
  onPracticeMistake
}) => {
  const [activeTab, setActiveTab] = useState<'style' | 'strengths' | 'pitfalls' | 'continuity'>('style');
  const [selectedStyle, setSelectedStyle] = useState<LearningStyleType>(
    tutorMemory.learningStyle || 'visual_interactive'
  );
  const [selectedPacing, setSelectedPacing] = useState<LearningPacingType>(
    tutorMemory.learningPacing || 'balanced'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const currentStrengths = Array.from(new Set([
    ...(tutorMemory.strengths || []),
    ...(tutorMemory.masteredTopics || [])
  ]));

  // Curated fallback strengths if empty
  const displayStrengths = currentStrengths.length > 0
    ? currentStrengths
    : [
        isRtl ? 'المشاركة الفعالة في المحادثة والتعبير عن النفس' : 'Active conversation engagement & self-expression',
        isRtl ? 'الفهم السريع للأمثلة التوضيحية البصرية' : 'Fast visual grasp of example sentences',
        isRtl ? 'نطق الكلمات الجديدة بوضوح وثقة' : 'Clear pronunciation of new vocabulary',
        isRtl ? 'التفاعل الإيجابي مع أسئلة التحقق السريعة' : 'Positive response to concept checking drills'
      ];

  const recordedMistakes = tutorMemory.frequentMistakes || [];

  const handleSavePreferences = async () => {
    try {
      setIsSaving(true);
      await onUpdateLearningStyle(selectedStyle, selectedPacing);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update learning preferences:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsSaving(true);
      await onClearMemory();
      setConfirmReset(false);
    } catch (err) {
      console.error('Failed to clear memory:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border-2 border-indigo-400/40 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0E1E38] via-[#1B2A4A] to-[#0E1E38] px-5 py-4 border-b border-indigo-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg border border-indigo-300/30">
              <Brain size={24} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-indigo-100">
                  {isRtl ? 'ذاكرة سارة الذكية وملف التعلم المعرفي 🧠' : "Sara's Smart Memory & Cognitive Profile 🧠"}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[10px] font-black">
                  {studentLevel}
                </span>
              </div>
              <p className="text-xs text-indigo-200/70">
                {isRtl
                  ? 'الذاكرة التكيفية طويلة المدى • أسلوب التعلم • نقاط القوة وتاريخ الجلسات'
                  : 'Adaptive Long-term Memory • Learning Style • Strengths & Continuity'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/80 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-950/60 border-b border-white/10 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('style')}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'style'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Sliders size={14} />
            <span className="truncate">{isRtl ? 'أسلوب التعلم' : 'Learning Style'}</span>
          </button>

          <button
            onClick={() => setActiveTab('strengths')}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'strengths'
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Award size={14} />
            <span className="truncate">{isRtl ? `نقاط القوة (${displayStrengths.length})` : `Strengths (${displayStrengths.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('pitfalls')}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'pitfalls'
                ? 'bg-rose-500 text-white border-rose-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Target size={14} />
            <span className="truncate">{isRtl ? `مجالات التطوير (${recordedMistakes.length})` : `Focus (${recordedMistakes.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('continuity')}
            className={`py-2 px-2 sm:px-3 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'continuity'
                ? 'bg-emerald-600 text-white border-emerald-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Clock size={14} />
            <span className="truncate">{isRtl ? 'استئناف الجلسات' : 'Continuity'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: LEARNING STYLE & PACING */}
          {activeTab === 'style' && (
            <div className="space-y-4">
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-indigo-200">
                <Sparkles size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">
                    {isRtl ? 'كيف تتكيف سارة مع أسلوبك الفريد؟' : 'How does Sara adapt to your unique learning style?'}
                  </p>
                  <p className="leading-relaxed text-indigo-200/80">
                    {isRtl
                      ? 'تكتشف سارة طريقة استيعابك وتضبط لغتها وسبورتها التفاعلية وأمثلتها ووتيرة حديثها لتلائمك تماماً. يمكنك اختيار الأسلوب المفضل لديك في أي وقت.'
                      : 'Sara dynamically detects your learning habits and shapes her explanations, whiteboard layouts, and challenges to match you.'}
                  </p>
                </div>
              </div>

              {/* Learning Style Grid */}
              <div className="space-y-2">
                <label className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass size={14} />
                  <span>{isRtl ? 'نمط الشرح والتعلم المفضل' : 'Preferred Teaching & Learning Style'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LEARNING_STYLES.map(style => {
                    const isSelected = selectedStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2.5 cursor-pointer text-start ${
                          isSelected
                            ? `bg-indigo-950/80 border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg shadow-indigo-950/50 scale-[1.01]`
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{style.icon}</span>
                            <span className="font-black text-sm text-white">
                              {isRtl ? style.titleAr : style.titleEn}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                              <CheckCircle2 size={14} />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {isRtl ? style.descAr : style.descEn}
                        </p>
                        <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/10 text-indigo-300">
                          {isRtl ? style.tagAr : style.tagEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pacing Preferences */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={14} />
                  <span>{isRtl ? 'وتيرة وسرعة الشرح والتمارين' : 'Explanation & Practice Pacing'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {PACING_OPTIONS.map(pacing => {
                    const isSelected = selectedPacing === pacing.id;
                    return (
                      <button
                        key={pacing.id}
                        type="button"
                        onClick={() => setSelectedPacing(pacing.id)}
                        className={`p-3 rounded-2xl border transition-all text-start cursor-pointer flex flex-col gap-1.5 ${
                          isSelected
                            ? 'bg-indigo-950/90 border-indigo-400 ring-2 ring-indigo-400/40 shadow-md text-white'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-white">
                            {isRtl ? pacing.titleAr : pacing.titleEn}
                          </span>
                          {isSelected && <CheckCircle2 size={13} className="text-indigo-400 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {isRtl ? pacing.descAr : pacing.descEn}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-3 flex items-center justify-between border-t border-white/10">
                <div className="text-xs text-indigo-300">
                  {saveSuccess && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                      <CheckCircle2 size={14} />
                      {isRtl ? 'تم حفظ وتطبيق تفضيلات التعلم بنجاح! 🌟' : 'Learning preferences saved! 🌟'}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isSaving ? 'animate-spin' : ''} />
                  <span>{isRtl ? 'حفظ وتطبيق على سارة 💾' : 'Save & Apply to Sara 💾'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STRENGTHS & MASTERIES */}
          {activeTab === 'strengths' && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-200">
                <Award size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {isRtl ? 'سجل الإتقان ونقاط القوة المرصودة 🌟' : 'Mastered Skills & Observed Strengths 🌟'}
                  </p>
                  <p className="text-amber-200/80 leading-relaxed">
                    {isRtl
                      ? 'ترصد سارة تقدمك المستمر وتضيف المهارات التي تتقنها في المحادثات والاختبارات لتشجعك وتبني عليها.'
                      : 'Sara records milestones and language competencies you have mastered across your sessions.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {displayStrengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-800/80 border border-amber-400/20 flex items-start justify-between gap-3 group hover:border-amber-400/50 transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0 text-xs font-black">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                          {str}
                        </p>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <CheckCircle2 size={11} className="text-emerald-400" />
                          {isRtl ? 'متقنة ومثبتة في الذاكرة' : 'Mastered in memory'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onPracticeTopic(
                          isRtl
                            ? `سارة، أود أن تختبريني في هذه النقطة المتقنة لأتأكد من استمرار تفوقي فيها: "${str}"! أعطني سؤالاً سريعاً.`
                            : `Sara, please give me a quick quiz challenge on this mastered skill to keep it sharp: "${str}"!`
                        );
                      }}
                      className="px-2 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-[10px] font-bold transition-all shrink-0 cursor-pointer"
                      title={isRtl ? 'تحدي سريع' : 'Quick Quiz'}
                    >
                      {isRtl ? 'تحدي 🎯' : 'Quiz 🎯'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOCUS AREAS & PITFALLS */}
          {activeTab === 'pitfalls' && (
            <div className="space-y-4">
              <div className="bg-rose-500/10 border border-rose-400/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-rose-200">
                <Target size={18} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {isRtl ? 'مجالات التركيز والتطوير المستمر 🎯' : 'Continuous Improvement & Focus Areas 🎯'}
                  </p>
                  <p className="text-rose-200/80 leading-relaxed">
                    {isRtl
                      ? 'تسجل سارة الأخطاء اللغوية لتساعدك على تجاوزها بلطف وتثبيت القاعدة الصحيحة من خلال التكرار الذكي.'
                      : 'Sara isolates specific pitfalls from your conversations so you can practice them into permanent mastery.'}
                  </p>
                </div>
              </div>

              {recordedMistakes.length === 0 ? (
                <div className="p-8 rounded-3xl bg-slate-800/40 border border-white/10 text-center space-y-2">
                  <div className="text-3xl">🎉</div>
                  <h4 className="text-sm font-black text-emerald-300">
                    {isRtl ? 'سجلك اللغوي ناصع ومبهر!' : 'Your Language Record is Spotless!'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {isRtl
                      ? 'لم ترصد سارة أي أخطاء متكررة حالياً. استمر في المحادثة والتحديات اليومية!'
                      : 'No recurring pitfalls found. Keep practicing with Sara to reinforce your fluency!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {recordedMistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-800/80 border border-rose-400/20 flex items-center justify-between gap-3 hover:border-rose-400/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 text-xs font-black">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{mistake}</p>
                          <span className="text-[10px] text-rose-300/80">
                            {isRtl ? 'ملاحظة مسجلة من جلسات المحادثة' : 'Noted from dialogue practice'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onPracticeMistake(mistake);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                      >
                        {isRtl ? 'تدرب عليها 🚀' : 'Practice Now 🚀'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SESSION CONTINUITY & CONTEXT */}
          {activeTab === 'continuity' && (
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-emerald-200">
                <Clock size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {isRtl ? 'تذكر واستئناف السياق بين الجلسات ⏱️' : 'Cross-Session Continuity & Memory Hook ⏱️'}
                  </p>
                  <p className="text-emerald-200/80 leading-relaxed">
                    {isRtl
                      ? 'تتذكر سارة أين توقفت في جلستك السابقة، وما تدربت عليه، حتى تبدأ كل جلسة من حيث انتهيت دون تكرار!'
                      : 'Sara remembers exactly what you practiced last session so you pick up right where you left off.'}
                  </p>
                </div>
              </div>

              {/* Last Session Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-400/30 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <Layers size={14} />
                    {isRtl ? 'آخر موضوع تم تدريسه' : 'Last Topic Explored'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {tutorMemory.lastSessionAt
                      ? new Date(tutorMemory.lastSessionAt?.seconds ? tutorMemory.lastSessionAt.seconds * 1000 : Date.now()).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US')
                      : isRtl ? 'الجلسة الحالية' : 'Recent Session'}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-white">
                    {tutorMemory.lastSessionTopic || tutorMemory.lastSessionSummary || (isRtl ? 'محادثة وتدريب لغوي شامل مع سارة' : 'Comprehensive English session')}
                  </h4>
                  {tutorMemory.lastSessionSummary && (
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {tutorMemory.lastSessionSummary}
                    </p>
                  )}
                </div>

                {tutorMemory.crossSessionHook && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-xs text-emerald-200 flex items-center gap-2">
                    <Lightbulb size={16} className="text-emerald-400 shrink-0" />
                    <p>{tutorMemory.crossSessionHook}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      const topic = tutorMemory.lastSessionTopic || tutorMemory.lastSessionSummary || 'our last lesson';
                      onPracticeTopic(
                        isRtl
                          ? `سارة، مرحباً بعودتي! دعينا نستأنف ونكمل التدريب على موضوعنا السابق: "${topic}". اطرحي علي تحدياً جديداً!`
                          : `Sara, welcome back! Let's resume from our previous topic: "${topic}". Give me a new challenge!`
                      );
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>{isRtl ? 'استئناف هذا الموضوع مع سارة الآن 🚀' : 'Resume This Topic with Sara 🚀'}</span>
                    <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                </div>
              </div>

              {/* Reset Section */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-300">
                    {isRtl ? 'إعادة ضبط ذاكرة سارة' : 'Reset Sara Memory'}
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    {isRtl ? 'مسح سجل الملاحظات والأخطاء للبدء بصفحة جديدة' : 'Clear notes & mistake logs for a fresh start'}
                  </p>
                </div>

                {confirmReset ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={isSaving}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs cursor-pointer"
                    >
                      {isRtl ? 'تأكيد المسح ⚠️' : 'Confirm ⚠️'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs cursor-pointer"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-400/20 text-xs font-bold transition-all cursor-pointer"
                  >
                    {isRtl ? 'إعادة ضبط الذاكرة' : 'Reset Memory'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-white/10 text-center text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-indigo-400" />
            <span>{isRtl ? 'الذاكرة نشطة وتتطور تلقائياً' : 'Adaptive Memory Active'}</span>
          </span>
          <span className="text-indigo-300 font-bold">
            {isRtl ? `الطالب: ${studentName || 'المتعلم'}` : `Student: ${studentName || 'Learner'}`}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
