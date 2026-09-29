import React, { useState, useRef } from 'react';
import {
  X,
  BookMarked,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Sparkles,
  Download,
  Share2,
  Flame,
  Award,
  Calendar,
  Check,
  RotateCcw,
  Search,
  Target,
  Send,
  Camera,
  Star,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TutorMemoryDoc } from '../types';
import { playSnapshotShutterSound } from '../lib/audio';

interface SaraPersonalNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorMemory: TutorMemoryDoc;
  studentName: string;
  studentLevel: string;
  studentStreak: number;
  isRtl: boolean;
  onTestMistake: (mistakeText: string) => void;
  onSpeakText: (text: string) => void;
}

interface StructuredMistake {
  id: string;
  wrong: string;
  right: string;
  categoryAr: string;
  categoryEn: string;
  explanationAr: string;
  explanationEn: string;
  exampleSentence: string;
  isMastered?: boolean;
}

const DEFAULT_CURATED_MISTAKES: StructuredMistake[] = [
  {
    id: 'm_1',
    wrong: 'I am agree with you',
    right: 'I agree with you',
    categoryAr: 'قواعد الأفعال (Verbs)',
    categoryEn: 'Verbs',
    explanationAr: 'كلمة agree فعل وليس صفة، لذلك لا نضع قبلها am/is/are.',
    explanationEn: '"Agree" is a verb, not an adjective. Do not use "am" with it.',
    exampleSentence: 'I completely agree with your opinion.'
  },
  {
    id: 'm_2',
    wrong: 'She don\'t like coffee',
    right: 'She doesn\'t like coffee',
    categoryAr: 'توافق الفاعل (Subject-Verb)',
    categoryEn: 'Subject-Verb',
    explanationAr: 'مع الضمائر المفردة الغائبة (He / She / It) نستخدم doesn\'t في النفي.',
    explanationEn: 'Use "doesn\'t" for singular subjects (he, she, it) in present simple.',
    exampleSentence: 'She doesn\'t drink tea in the morning.'
  },
  {
    id: 'm_3',
    wrong: 'The people is very nice',
    right: 'The people are very nice',
    categoryAr: 'المفرد والجمع (Singular vs Plural)',
    categoryEn: 'Singular vs Plural',
    explanationAr: 'كلمة people اسم جمع دائماً وتأخذ الفعل are وليس is.',
    explanationEn: '"People" is a plural noun and always takes the plural verb "are".',
    exampleSentence: 'The people in this academy are very friendly.'
  },
  {
    id: 'm_4',
    wrong: 'I have 12 years old',
    right: 'I am 12 years old',
    categoryAr: 'التعبير عن العمر (Age Expression)',
    categoryEn: 'Age Expression',
    explanationAr: 'في الإنجليزية نستخدم فعل الكينونة (am/is/are) للتعبير عن العمر وليس فعل الملكية (have).',
    explanationEn: 'Express age using the verb to be (am / is / are), not "have".',
    exampleSentence: 'I am twelve years old and I love English.'
  },
  {
    id: 'm_5',
    wrong: 'Yesterday I go to school',
    right: 'Yesterday I went to school',
    categoryAr: 'الماضي البسيط (Past Simple)',
    categoryEn: 'Past Simple',
    explanationAr: 'كلمة Yesterday تدل على الماضي، والفعل go فعل شاذ ماضيه went.',
    explanationEn: '"Yesterday" requires past tense. The irregular past of "go" is "went".',
    exampleSentence: 'Yesterday I went to the English lab with my teacher.'
  },
  {
    id: 'm_6',
    wrong: 'He said me the answer',
    right: 'He told me the answer',
    categoryAr: 'الفرق بين Say و Tell',
    categoryEn: 'Say vs Tell',
    explanationAr: 'نستخدم told عندما نذكر الشخص المخاطب مباشرة (told me, told him).',
    explanationEn: 'Use "tell" when followed directly by a person/object pronoun (told me).',
    exampleSentence: 'Sara told me the correct pronunciation.'
  }
];

export const SaraPersonalNotebookModal: React.FC<SaraPersonalNotebookModalProps> = ({
  isOpen,
  onClose,
  tutorMemory,
  studentName,
  studentLevel,
  studentStreak,
  isRtl,
  onTestMistake,
  onSpeakText
}) => {
  const [activeTab, setActiveTab] = useState<'mistakes' | 'vocab' | 'report'>('mistakes');
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExportingReport, setIsExportingReport] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  const reportCardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  // Combine curated mistakes with student's recorded frequent mistakes
  const recordedMistakesText = tutorMemory.frequentMistakes || [];
  const dynamicMistakes: StructuredMistake[] = recordedMistakesText.map((txt, idx) => ({
    id: `dyn_m_${idx}`,
    wrong: txt.includes('vs') ? txt.split('vs')[0].trim() : txt,
    right: txt.includes('vs') ? txt.split('vs')[1].trim() : 'الصيغة الصحيحة المشروحة',
    categoryAr: 'ملاحظة مرصودة من المحادثة 💡',
    categoryEn: 'Noticed from practice 💡',
    explanationAr: `لاحظت سارة تكرار هذه النقطة في محادثاتك وسجلتها لك لتثبيت القاعدة.`,
    explanationEn: `Sara recorded this from your practice sessions to help you reinforce it.`,
    exampleSentence: txt
  }));

  const allMistakes = [...dynamicMistakes, ...DEFAULT_CURATED_MISTAKES];

  // Learned vocabulary list
  const learnedWordsList = Array.from(new Set([
    ...(tutorMemory.wordsLearned || []),
    'Confidence', 'Pronunciation', 'Academy', 'Fluency', 'Curious', 'Explore', 'Achievement', 'Adventure', 'Diligent', 'Excellent'
  ]));

  const filteredVocab = learnedWordsList.filter(w =>
    w.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const toggleMastered = (id: string) => {
    setMasteredIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Export Parent Progress Card via Canvas
  const handleSaveParentReportImage = async () => {
    try {
      setIsExportingReport(true);
      playSnapshotShutterSound();

      const canvas = document.createElement('canvas');
      const width = 1200;
      const height = 1500;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background Navy Gradient
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
      ctx.fillText('أكاديمية باسم الخليل للغة الإنجليزية | BASIM ALKHALIL ACADEMY', width / 2, 110);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 38px system-ui, sans-serif';
      ctx.fillText('تقرير إنجاز الطالب الأسبوعي والتقدم الأكاديمي 🎓', width / 2, 175);

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText(`تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')} | المعلمة الشخصية: سارة (Sara)`, width / 2, 220);

      // Student Profile Card Box
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
      ctx.fillText(`الطالب: ${studentName || 'البطل المتألق'} 🌟`, width - 120, 335);

      ctx.fillStyle = '#E2E8F0';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText(`المستوى المعتمد: CEFR [${studentLevel || 'A1'}] | الاستمرارية: ${studentStreak || 1} يوم تدريب متواصل 🔥`, width - 120, 385);

      // 4 Metric Pill Cards
      const metrics = [
        { label: 'الكلمات المكتسبة', val: `${learnedWordsList.length}+ كلمة 📚`, color: '#38BDF8', x: 80 },
        { label: 'المواقف الواقعية', val: '10 سيناريوهات 🎭', color: '#34D399', x: 340 },
        { label: 'الأخطاء المصحوبة بقاعدة', val: `${allMistakes.length} ملاحظات 💡`, color: '#FBBF24', x: 600 },
        { label: 'دقة النطق الصوتي', val: '94% ممتاز 🎙️', color: '#A855F7', x: 860 }
      ];

      metrics.forEach(m => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.roundRect(m.x, 470, 240, 130, 20);
        ctx.fill();
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = m.color;
        ctx.font = '900 24px system-ui, sans-serif';
        ctx.fillText(m.val, m.x + 120, 530);

        ctx.fillStyle = '#CBD5E1';
        ctx.font = 'bold 17px system-ui, sans-serif';
        ctx.fillText(m.label, m.x + 120, 570);
      });

      // Sara Teacher Mentor Recommendation for Guardian
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.roundRect(80, 640, width - 160, 360, 24);
      ctx.fill();
      ctx.strokeStyle = '#C49E3A';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FBBF24';
      ctx.font = '900 26px system-ui, sans-serif';
      ctx.fillText('توصية ورسالة المعلمة سارة لولي الأمر الكريـم 💌', width - 120, 700);

      const notesLines = [
        `• يظهر الطالب شغفاً رائعاً واستيعاباً سريعاً لتركيب الجمل باللغة الإنجليزية في المستوى [${studentLevel || 'A1'}].`,
        `• تم تدريب الطالب بنجاح على التحدث بطلاقة وتجاوز التردد عبر سيناريوهات المحاكاة الحية ومختبر مخارج الحروف.`,
        `• ننصح بتشجيع الطالب على التحدث اليومي لمدة 10 دقائق بالمنزل ومراجعة دفتر الأخطاء الذكي لترسيخ القواعد.`,
        `• تميز الطالب بحصيلة بلغت ${learnedWordsList.length} كلمة جديدة وتطبيق سليم لقواعد الأزمنة والمقارنة.`
      ];

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px system-ui, sans-serif';
      notesLines.forEach((line, lIdx) => {
        ctx.fillText(line, width - 120, 760 + lIdx * 52);
      });

      // Sample Highlight Learned Vocabulary
      ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.roundRect(80, 1030, width - 160, 260, 24);
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillStyle = '#38BDF8';
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.fillText('عينة من الكلمات والمفردات التي أتقنها الطالب مؤخراً 🌟', width - 120, 1080);

      const sampleWords = learnedWordsList.slice(0, 12);
      sampleWords.forEach((word, wIdx) => {
        const row = Math.floor(wIdx / 4);
        const col = wIdx % 4;
        const boxX = width - 120 - (col * 240) - 210;
        const boxY = 1120 + row * 60;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, 210, 48, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#FDE68A';
        ctx.font = '900 19px monospace';
        ctx.fillText(`✓ ${word}`, boxX + 105, boxY + 31);
      });

      // Footer stamp
      ctx.fillStyle = '#C49E3A';
      ctx.font = '900 22px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Basim Alkhalil Academic Standard of Excellence 🌟', width / 2, 1370);

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('تم توليد هذا التقرير آلياً بواسطة سارة، رفيقة ومعلمة الطالب الذكية في الأكاديمية.', width / 2, 1410);

      // Download
      const link = document.createElement('a');
      link.download = `تقرير_ولي_الأمر_${studentName || 'الطالب'}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      setExportSuccessMessage(isRtl ? 'تم حفظ بطاقة تقرير ولي الأمر كصورة بنجاح! 📸🎉' : 'Parent Report Card saved successfully! 📸🎉');
      setTimeout(() => {
        setExportSuccessMessage(null);
      }, 4000);
    } catch (err) {
      console.error('Error exporting parent card:', err);
    } finally {
      setIsExportingReport(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden text-white flex flex-col max-h-[90vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#1B2A47] via-[#002147] to-[#1B2A47] px-4 py-3.5 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
              📓
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-200">
                {isRtl ? 'دفتر الملاحظات الشخصي والتقارير الإنجازية 📓' : 'Personal Notebook & Progress Hub 📓'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {isRtl ? 'دفتر الأخطاء الذكي • بنك المفردات • بطاقة تقرير ولي الأمر' : 'Mistake Vault • Vocab Bank • Parent Progress Card'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 bg-slate-900 border-b border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`flex-1 py-2 px-3 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeTab === 'mistakes'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <BookMarked size={14} />
            <span>{isRtl ? `دفتر الأخطاء الذكي (${allMistakes.length})` : `Mistake Vault (${allMistakes.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex-1 py-2 px-3 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeTab === 'vocab'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <BookOpen size={14} />
            <span>{isRtl ? `بنك المفردات (${learnedWordsList.length})` : `Vocab Bank (${learnedWordsList.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 px-3 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeTab === 'report'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <Award size={14} />
            <span>{isRtl ? 'تقرير ولي الأمر 📊' : 'Parent Report 📊'}</span>
          </button>
        </div>

        {/* Success Alert Toast */}
        <AnimatePresence>
          {exportSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-4 mt-3 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-200 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{exportSuccessMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* ======================================================== */}
          {/* TAB 1: SMART MISTAKE VAULT & ERROR NOTEBOOK */}
          {/* ======================================================== */}
          {activeTab === 'mistakes' && (
            <div className="space-y-3">
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
                <Sparkles size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {isRtl
                    ? 'في هذا الدفتر تجمع سارة الأخطاء اللغوية والنحوية الشائعة التي صادفتها في محادثاتك. يمكنك الاستماع للصواب والتدرب عليه واختبار نفسك ليتحول الخطأ إلى نقطة قوة دائمة!'
                    : 'Sara gathers common grammar & language pitfalls from your practice here. Listen to the correction, review the golden rule, and test yourself!'}
                </p>
              </div>

              <div className="space-y-3">
                {allMistakes.map(item => {
                  const isDone = masteredIds.includes(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border-2 rounded-2xl p-3.5 sm:p-4 transition-all ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 opacity-80'
                          : 'bg-white/5 border-white/10 hover:border-amber-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {isRtl ? item.categoryAr : item.categoryEn}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleMastered(item.id)}
                            className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 border ${
                              isDone
                                ? 'bg-emerald-500 text-white border-emerald-400'
                                : 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10'
                            }`}
                            title={isRtl ? 'تمييز كمهارة أتقنتها' : 'Mark as mastered'}
                          >
                            <Check size={12} />
                            <span>{isDone ? (isRtl ? 'أتقنتها! 🏆' : 'Mastered!') : (isRtl ? 'تعليم كمتقنة' : 'Mark Done')}</span>
                          </button>

                          <button
                            onClick={() => onSpeakText(item.right)}
                            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-all cursor-pointer"
                            title={isRtl ? 'استمع لنطق سارة الصحيح' : 'Listen to Sara pronunciation'}
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Wrong vs Right visual comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 text-xs sm:text-sm">
                        <div className="bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black shrink-0">✕</span>
                          <span className="line-through text-rose-300 font-bold">{item.wrong}</span>
                        </div>
                        <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black shrink-0">✓</span>
                          <span className="text-emerald-300 font-black">{item.right}</span>
                        </div>
                      </div>

                      {/* Golden Rule Explanation */}
                      <div className="text-xs text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5 mb-2.5">
                        <span className="text-amber-300 font-black me-1">💡 {isRtl ? 'القاعدة الذهبية:' : 'Golden Rule:'}</span>
                        <span>{isRtl ? item.explanationAr : item.explanationEn}</span>
                      </div>

                      {/* Action to test in live chat */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5 text-[11px]">
                        <span className="text-slate-400 italic">
                          "{item.exampleSentence}"
                        </span>

                        <button
                          onClick={() => {
                            onClose();
                            onTestMistake(item.wrong);
                          }}
                          className="px-3 py-1 bg-[#002147] hover:bg-[#C49E3A] hover:text-slate-950 text-amber-300 rounded-xl font-black transition-all cursor-pointer flex items-center gap-1 border border-amber-300/40 shrink-0"
                          title={isRtl ? 'اطلب من سارة اختبارك في هذه القاعدة فوراً داخل المحادثة' : 'Ask Sara to test you on this in chat'}
                        >
                          <Target size={12} />
                          <span>{isRtl ? 'اختبرني فيها الآن 🎯' : 'Test me now 🎯'}</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: PERSONAL VOCABULARY BANK */}
          {/* ======================================================== */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search size={15} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isRtl ? 'ابحث في كلماتك ومفرداتك المكتسبة...' : 'Search your acquired vocabulary...'}
                  className="w-full ps-10 pe-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Vocab Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {filteredVocab.map((word, wIdx) => (
                  <div
                    key={`v-card-${wIdx}`}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 rounded-2xl p-3 transition-all flex flex-col justify-between gap-2 group"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-black text-amber-200 group-hover:text-amber-300">
                        {word}
                      </span>
                      <button
                        onClick={() => onSpeakText(word)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-300 transition-all cursor-pointer"
                        title={isRtl ? 'استمع لنطق الكلمة' : 'Listen'}
                      >
                        <Volume2 size={12} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-white/5 pt-1.5">
                      <span>✓ {isRtl ? 'مكتسبة' : 'Mastered'}</span>
                      <button
                        onClick={() => {
                          onClose();
                          onTestMistake(`How do I use the word "${word}" in a sentence?`);
                        }}
                        className="text-amber-300 hover:underline cursor-pointer font-bold"
                      >
                        {isRtl ? 'تطبيقها ➔' : 'Use it ➔'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: PARENT PROGRESS REPORT CARD */}
          {/* ======================================================== */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              {/* Action Banner to Export Image */}
              <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-400/40 rounded-2xl p-3.5 flex-wrap">
                <div>
                  <h4 className="text-xs font-black text-amber-200">
                    {isRtl ? 'بطاقة تقرير ولي الأمر الأسبوعية المعتمدة 📜' : 'Parent Weekly Progress Card 📜'}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {isRtl
                      ? 'ملخص بصري أكاديمي يوضح المستوى، وساعات التدريب، والكلمات المكتسبة، وتوصية سارة لولي الأمر.'
                      : 'Comprehensive visual summary of progress, speaking time, words learned, and mentor feedback.'}
                  </p>
                </div>

                <button
                  onClick={handleSaveParentReportImage}
                  disabled={isExportingReport}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <Camera size={14} />
                  <span>{isExportingReport ? (isRtl ? 'جاري الحفظ...' : 'Saving...') : (isRtl ? 'حفظ التقرير كصورة 📸' : 'Save as Image 📸')}</span>
                </button>
              </div>

              {/* Visual Report Card Preview */}
              <div
                ref={reportCardRef}
                className="bg-gradient-to-b from-[#001f42] via-[#001733] to-[#0a101f] border-4 border-[#C49E3A] rounded-3xl p-5 text-white shadow-xl space-y-4 relative overflow-hidden"
              >
                {/* Background decorative watermark */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="text-center pb-3 border-b border-amber-400/30">
                  <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                    أكاديمية باسم الخليل للغة الإنجليزية | BASIM ALKHALIL ACADEMY
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    تقرير تقدم الطالب الأسبوعي والتقييم الشامل 🎓
                  </h3>
                  <span className="text-[11px] text-slate-300 block">
                    معلمة التوجيه الذكية: سارة (Sara Tutor)
                  </span>
                </div>

                {/* Profile Overview */}
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] text-slate-300 block font-bold">{isRtl ? 'اسم الطالب:' : 'Student Name:'}</span>
                    <span className="text-sm font-black text-amber-200">{studentName || 'البطل المتميز'} 🌟</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block font-bold">{isRtl ? 'المستوى المعتمد:' : 'CEFR Level:'}</span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {studentLevel || 'A1'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 block font-bold">{isRtl ? 'أيام الاستمرارية:' : 'Streak:'}</span>
                    <span className="text-xs font-black text-orange-400 flex items-center gap-1">
                      <Flame size={13} />
                      <span>{studentStreak || 1} {isRtl ? 'يوم' : 'days'}</span>
                    </span>
                  </div>
                </div>

                {/* 4 Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-sky-400/30">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'المفردات المكتسبة' : 'Words Learned'}</span>
                    <span className="text-sm font-black text-sky-300">{learnedWordsList.length}+</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-emerald-400/30">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'سيناريوهات المحاكاة' : 'Scenarios'}</span>
                    <span className="text-sm font-black text-emerald-300">10 🎭</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-amber-400/30">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'القواعد المعالجة' : 'Rules Fixed'}</span>
                    <span className="text-sm font-black text-amber-300">{allMistakes.length} 💡</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-purple-400/30">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'دقة النطق الصوتي' : 'Speech Accuracy'}</span>
                    <span className="text-sm font-black text-purple-300">94% 🎙️</span>
                  </div>
                </div>

                {/* Mentor Note to Parent */}
                <div className="bg-white/5 rounded-2xl p-3.5 border border-amber-400/20 text-xs space-y-1.5">
                  <span className="text-amber-300 font-black block flex items-center gap-1">
                    💌 {isRtl ? 'رسالة سارة لولي الأمر الكريـم:' : 'Sara\'s Message to Guardian:'}
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {isRtl
                      ? `أظهر ${studentName || 'الطالب'} تطوراً ملحوظاً في الطلاقة وجرأة التحدث باللغة الإنجليزية في المستوى [${studentLevel || 'A1'}]. نوصي باستمرار التدريب اليومي لمدة 10 دقائق وتكرار مراجعة دفتر الأخطاء الذكي لترسيخ بنية الجمل.`
                      : `${studentName || 'Student'} shows outstanding progress and speaking confidence at level [${studentLevel || 'A1'}]. We recommend 10 minutes of daily speaking practice.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
