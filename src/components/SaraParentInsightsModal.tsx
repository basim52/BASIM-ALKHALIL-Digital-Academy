import React, { useState, useRef } from 'react';
import {
  X,
  Award,
  Sparkles,
  TrendingUp,
  Heart,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  BookOpen,
  Target,
  Flame,
  Lightbulb,
  Compass,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TutorMemoryDoc, TutorSessionDoc } from '../types';
import { playSnapshotShutterSound } from '../lib/audio';
import { SaraProgressPanel } from './SaraProgressPanel';

interface SaraParentInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorMemory: TutorMemoryDoc;
  studentName: string;
  studentLevel: string;
  studentStreak: number;
  isRtl: boolean;
  studentUid?: string;
}

export const SaraParentInsightsModal: React.FC<SaraParentInsightsModalProps> = ({
  isOpen,
  onClose,
  tutorMemory,
  studentName,
  studentLevel,
  studentStreak,
  isRtl,
  studentUid
}) => {
  const [activeTab, setActiveTab] = useState<'digest' | 'fluency' | 'home_tips'>('digest');
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Derive CEFR metrics
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentLevelIdx = Math.max(0, levelOrder.indexOf(studentLevel.toUpperCase()));
  const fluencyPercentage = Math.min(100, Math.round(((currentLevelIdx + 1) / 6) * 100));

  // Real data only: no invented strengths/mistakes/word counts.
  const strengthsList: string[] = tutorMemory.strengths || [];
  const focusList: string[] = tutorMemory.frequentMistakes || [];

  const wordsLearnedCount = tutorMemory.wordsLearned?.length || 0;

  // Export Parent Insights Canvas Card
  const handleExportParentCard = async () => {
    try {
      setIsExporting(true);
      playSnapshotShutterSound();

      const canvas = document.createElement('canvas');
      const width = 1200;
      const height = 1500;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background Royal Navy Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#001A38');
      grad.addColorStop(0.5, '#002147');
      grad.addColorStop(1, '#071224');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold Academic Border Frame
      ctx.strokeStyle = '#C49E3A';
      ctx.lineWidth = 14;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 45, width - 90, height - 90);

      // Header Banner
      ctx.fillStyle = '#C49E3A';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('أكاديمية باسم الخليل الرقمية | BASIM ALKHALIL ACADEMY', width / 2, 110);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 38px system-ui, sans-serif';
      ctx.fillText('تقرير التقدم الأكاديمي الشامل لولي الأمر 🎓', width / 2, 175);

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText(`تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')} | المعلمة الذكية: سارة (Sara)`, width / 2, 220);

      // Student Profile Card
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(80, 270, width - 160, 160, 24);
      ctx.fill();
      ctx.strokeStyle = '#C49E3A';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FDE68A';
      ctx.font = '900 32px system-ui, sans-serif';
      ctx.fillText(`الطالب: ${studentName || 'المتعلم المتميز'}`, width - 120, 330);

      ctx.fillStyle = '#E2E8F0';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText(`المستوى الأكاديمي: CEFR ${studentLevel} | الاستمرارية: 🔥 ${studentStreak} يوم`, width - 120, 380);

      // Strengths Section
      ctx.fillStyle = '#C49E3A';
      ctx.font = '900 26px system-ui, sans-serif';
      ctx.fillText('🌟 أبرز ما أتقنه الطالب وأبدع فيه:', width - 80, 500);

      strengthsList.slice(0, 3).forEach((str, idx) => {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px system-ui, sans-serif';
        ctx.fillText(`✓  ${str}`, width - 110, 560 + idx * 55);
      });

      // Growth Metrics Box
      ctx.fillStyle = 'rgba(196, 158, 58, 0.15)';
      ctx.beginPath();
      ctx.roundRect(80, 760, width - 160, 160, 20);
      ctx.fill();
      ctx.strokeStyle = '#C49E3A';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#FDE68A';
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.fillText('📊 مؤشر الطلاقة وسرعة التطور الأكاديمي:', width - 110, 810);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 21px system-ui, sans-serif';
      ctx.fillText(`• نسبة تقدم الطلاقة في المستوى: ${fluencyPercentage}% وفق المعايير الدولية`, width - 110, 860);
      ctx.fillText(`• رصيد المفردات التراكمي المكتسب: ${wordsLearnedCount} كلمة ومصطلحاً جديداً`, width - 110, 900);

      // Home Coaching Recommendation
      ctx.fillStyle = '#C49E3A';
      ctx.font = '900 26px system-ui, sans-serif';
      ctx.fillText('💡 نصيحة وتوصية سارة لولي الأمر في المنزل:', width - 80, 990);

      ctx.fillStyle = '#CBD5E1';
      ctx.font = 'bold 21px system-ui, sans-serif';
      ctx.fillText('• شجع الطالب على التحدث لمدة 5 دقائق يومياً واستخدام الكلمات الجديدة في مواقف المنزل.', width - 110, 1045);
      ctx.fillText('• امدح جهوده الإيجابية بدلاً من التركيز على الخطأ لبناء طلاقة لغوية وجرأة صوتية عالية.', width - 110, 1090);

      // Footer Stamp
      ctx.fillStyle = '#C49E3A';
      ctx.font = '900 22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Basim Alkhalil Academic Standard of Excellence 🌟', width / 2, 1370);

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('تم توليد هذا التقرير آلياً بواسطة سارة، رفيقة ومعلمة الطالب الذكية في الأكاديمية.', width / 2, 1410);

      // Download
      const link = document.createElement('a');
      link.download = `تقرير_ولي_الأمر_سارة_${studentName || 'الطالب'}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      setExportMessage(isRtl ? 'تم تصدير بطاقة التقرير كصورة بنجاح! 📸🎉' : 'Report card exported successfully! 📸🎉');
      setTimeout(() => setExportMessage(null), 4000);
    } catch (err) {
      console.error('Failed to export parent card:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border-2 border-emerald-400/50 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#00241B] via-[#00382B] to-[#00241B] px-5 py-4 border-b border-emerald-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg border border-emerald-300">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-emerald-200">
                  {isRtl ? 'تحليلات التقدم وتقارير أولياء الأمور 📊' : 'Parent & Mentor Insights Hub 📊'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-400/30">
                  CEFR {studentLevel}
                </span>
              </div>
              <p className="text-xs text-emerald-200/70">
                {isRtl
                  ? 'ملخص أسبوعي • مؤشر الطلاقة التراكمي • توصيات الدعم المنزلي'
                  : 'Weekly Digest • CEFR Fluency Meter • Home Co-Learning Tips'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950/70 border-b border-white/10 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('digest')}
            className={`py-2 px-2 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'digest'
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <BookOpen size={14} />
            <span className="truncate">{isRtl ? 'الملخص الأسبوعي' : 'Weekly Digest'}</span>
          </button>

          <button
            onClick={() => setActiveTab('fluency')}
            className={`py-2 px-2 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'fluency'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <TrendingUp size={14} />
            <span className="truncate">{isRtl ? 'مؤشر الطلاقة CEFR' : 'Fluency Meter'}</span>
          </button>

          <button
            onClick={() => setActiveTab('home_tips')}
            className={`py-2 px-2 rounded-2xl font-black transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
              activeTab === 'home_tips'
                ? 'bg-indigo-500 text-white border-indigo-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Heart size={14} />
            <span className="truncate">{isRtl ? 'توصيات المنزل' : 'Home Co-Learning'}</span>
          </button>
        </div>

        {/* Toast Alert */}
        <AnimatePresence>
          {exportMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-4 mt-3 p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-black flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{exportMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: WEEKLY DIGEST */}
          {activeTab === 'digest' && (
            <div className="space-y-4">
              {studentUid && <SaraProgressPanel uid={studentUid} compact pickChild />}
              <div className="p-4 rounded-3xl bg-slate-800/80 border border-emerald-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <Sparkles size={14} />
                    {isRtl ? 'تقرير إنجاز الطالب هذا الأسبوع' : 'Student Weekly Highlights'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isRtl ? `الطالب: ${studentName || 'المتعلم'}` : `Student: ${studentName || 'Learner'}`}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tutorMemory.lastSessionSummary || (isRtl
                    ? 'ما فيه ملخص جلسة محفوظ مع سارة للحين.'
                    : 'No saved session summary with Sara yet.')}
                </p>
              </div>

              {/* Mastered Strengths */}
              <div className="space-y-2">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>{isRtl ? 'ما أتقنه الطالب بجدارة هذا الأسبوع 🌟' : 'Skills Mastered This Week 🌟'}</span>
                </span>
                <div className="space-y-1.5">
                  {!strengthsList.length && <p className="text-[11px] text-slate-400 font-bold">{isRtl ? 'ما رصدت سارة نقاط قوة محفوظة للحين.' : 'No strengths saved by Sara yet.'}</p>}
                  {strengthsList.map((str, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black shrink-0">
                        ✓
                      </span>
                      <span className="font-bold">{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge Addressed */}
              <div className="space-y-2">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Target size={14} className="text-amber-400" />
                  <span>{isRtl ? 'التحديات التي رصدتها سارة وتدرب عليها الطالب 🎯' : 'Challenges Addressed with Sara 🎯'}</span>
                </span>
                <div className="space-y-1.5">
                  {!focusList.length && <p className="text-[11px] text-slate-400 font-bold">{isRtl ? 'ما فيه أخطاء متكررة محفوظة للحين.' : 'No recurring mistakes saved yet.'}</p>}
                  {focusList.map((f, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-100">
                      <span className="text-sm shrink-0">💡</span>
                      <span className="font-bold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CEFR FLUENCY METER */}
          {activeTab === 'fluency' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-amber-300 block">
                      {isRtl ? 'المستوى اللغوي الحالي' : 'Current CEFR Level'}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      CEFR {studentLevel}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{isRtl ? 'نسبة التقدم' : 'Fluency Meter'}</span>
                    <span className="text-xl font-black text-emerald-400">{fluencyPercentage}%</span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fluencyPercentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                    <span>A1</span>
                    <span>A2</span>
                    <span>B1</span>
                    <span>B2</span>
                    <span>C1</span>
                    <span>C2</span>
                  </div>
                </div>
              </div>

              {/* Milestone Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 text-center space-y-1">
                  <span className="text-2xl block">📚</span>
                  <span className="text-xs text-slate-400 block">{isRtl ? 'المفردات المتقنة' : 'Vocabulary Bank'}</span>
                  <span className="text-lg font-black text-emerald-400">{wordsLearnedCount} كلمة</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 text-center space-y-1">
                  <span className="text-2xl block">🔥</span>
                  <span className="text-xs text-slate-400 block">{isRtl ? 'الاستمرارية اليومية' : 'Learning Streak'}</span>
                  <span className="text-lg font-black text-orange-400">{studentStreak} يوم متواصل</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOME CO-LEARNING RECOMMENDATIONS */}
          {activeTab === 'home_tips' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-start gap-3 text-xs text-indigo-200">
                <Heart size={18} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {isRtl ? 'كيف تساهم كولي أمر في تعزيز طلاقة ابنك بالمنزل؟' : 'How to support your child at home?'}
                  </p>
                  <p className="text-indigo-200/80 leading-relaxed mt-0.5">
                    {isRtl
                      ? 'لا تحتاج إلى التحدث بالإنجليزية بطلاقة! يكفي توفير التشجيع والممارسة اللطيفة لمدة 5 إلى 10 دقائق يومياً.'
                      : 'You do not need fluent English! Gentle encouragement and 5 minutes of daily practice work wonders.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-1">
                  <h4 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Lightbulb size={14} />
                    <span>{isRtl ? '1. التحدث الإيجابي في المواقف اليومية' : '1. Positive Daily Micro-Moments'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isRtl
                      ? 'اطلب من ابنك أن يعلمك كلمة جديدة تعلمها اليوم مع سارة أثناء وجبة الغداء أو الطريق بالسيارة.'
                      : 'Ask your child to teach you 1 new word they learned with Sara today during lunch or in the car.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-1">
                  <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    <span>{isRtl ? '2. التركيز على الجرأة قبل الدقة' : '2. Praise Confidence Over Perfection'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isRtl
                      ? 'امدح محاولته التحدث باللغة الإنجليزية حتى لو أخطأ، فالخطأ هو الخطوة الطبيعية للإتقان وسارة تتولى التصحيح بلطف.'
                      : 'Celebrate the attempt to speak. Mistakes are stepping stones, and Sara handles gentle correction.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-1">
                  <h4 className="text-xs font-black text-purple-300 flex items-center gap-1.5">
                    <Flame size={14} />
                    <span>{isRtl ? '3. الحفاظ على سلسلة الأيام (Streak)' : '3. Protect the Learning Streak'}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isRtl
                      ? 'ممارسة 10 دقائق يومياً أفضل بأضعاف من ساعة واحدة في الأسبوع لتثبيت الذاكرة اللغوية طويلة المدى.'
                      : '10 daily minutes beats 1 weekly hour for locking language into long-term memory.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Export Button */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <button
            onClick={handleExportParentCard}
            disabled={isExporting}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-105 text-slate-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            <Download size={14} />
            <span>{isExporting ? (isRtl ? 'جاري التصدير...' : 'Exporting...') : (isRtl ? 'تصدير بطاقة تقرير رسمي (صورة) 📸' : 'Export Official Card 📸')}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
          >
            {isRtl ? 'إغلاق ✕' : 'Close ✕'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
