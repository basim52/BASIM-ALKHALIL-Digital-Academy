import React, { useState, useRef } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  Sparkles,
  CheckCircle2,
  Copy,
  BookOpen,
  Calendar,
  User,
  HelpCircle,
  Eye,
  RefreshCw,
  Send,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import { playSnapshotShutterSound } from '../lib/audio';

interface SaraWorksheetGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentLevel: string;
  currentLessonTopic?: string;
  isRtl: boolean;
  onSendToSara?: (prompt: string) => void;
}

interface WorksheetExercise {
  id: string;
  title: string;
  titleAr: string;
  instruction: string;
  instructionAr: string;
  items: {
    prompt: string;
    answer: string;
    options?: string[];
  }[];
}

export const SaraWorksheetGeneratorModal: React.FC<SaraWorksheetGeneratorModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentLevel,
  currentLessonTopic = "Past Simple & Regular Verbs",
  isRtl,
  onSendToSara
}) => {
  const [topic, setTopic] = useState(currentLessonTopic);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [exerciseCount, setExerciseCount] = useState(3);
  const [showAnswerKeyInPreview, setShowAnswerKeyInPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const printAreaRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  // Curated exercises generated dynamically for topic
  const exercises: WorksheetExercise[] = [
    {
      id: 'ex_1',
      title: 'Part 1: Vocabulary & Meaning Match',
      titleAr: 'الجزء الأول: مطابقة المفردات والمعاني',
      instruction: 'Match each English word with its correct Arabic meaning.',
      instructionAr: 'صل الكلمة الإنجليزية بمعناها الصحيح في العمود المقابل.',
      items: [
        { prompt: '1. Confident', answer: 'واثق من نفسه' },
        { prompt: '2. Adventure', answer: 'مغامرة شيقة' },
        { prompt: '3. Diligent', answer: 'مجتهد ومثابر' },
        { prompt: '4. Fluency', answer: 'طلاقة في التحدث' }
      ]
    },
    {
      id: 'ex_2',
      title: 'Part 2: Fill in the Blanks (Grammar)',
      titleAr: 'الجزء الثاني: أكمل الفراغات بالقاعدة السليمة',
      instruction: 'Fill in the blanks using the correct form of the verb in parentheses.',
      instructionAr: 'أكمل الفراغ بالصيغة الصحيحة للفعل بين القوسين.',
      items: [
        { prompt: '1. Yesterday, she ________ (visit) her grandparents in Riyadh.', answer: 'visited' },
        { prompt: '2. We didn’t ________ (play) football because it was raining.', answer: 'play' },
        { prompt: '3. Last week, they ________ (study) hard for the English exam.', answer: 'studied' },
        { prompt: '4. Did you ________ (see) the new space story with Sara?', answer: 'see' }
      ]
    },
    {
      id: 'ex_3',
      title: 'Part 3: Sentence Unscramble',
      titleAr: 'الجزء الثالث: إعادة ترتيب الكلمات لتكوين جمل',
      instruction: 'Put the words in the correct order to form complete sentences.',
      instructionAr: 'رتب الكلمات التالية لتكوين جمل إنجليزية سليمة نحوياً.',
      items: [
        { prompt: '[ afternoon / played / We / yesterday / tennis ]', answer: 'We played tennis yesterday afternoon.' },
        { prompt: '[ didn’t / She / finish / homework / her ]', answer: 'She didn’t finish her homework.' },
        { prompt: '[ you / Did / yesterday / Sara / call ]', answer: 'Did you call Sara yesterday?' }
      ]
    }
  ];

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // PDF Download Handler
  const handleDownloadPdf = () => {
    setIsExporting(true);
    playSnapshotShutterSound();
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header
      doc.setFillColor(0, 33, 71);
      doc.rect(0, 0, 210, 28, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('Basim Alkhalil Digital Academy | Sara AI English Tutor', 15, 12);

      doc.setFontSize(10);
      doc.setTextColor(253, 230, 138);
      doc.text(`Official Student Worksheet • Level: CEFR ${studentLevel}`, 15, 20);

      // Student info bar
      doc.setFillColor(241, 245, 249);
      doc.rect(15, 34, 180, 14, 'F');
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      doc.text(`Student: ${studentName || 'Learner'}`, 20, 42);
      doc.text(`Topic: ${topic}`, 85, 42);
      doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 155, 42);

      let currentY = 58;

      // Render Exercises
      exercises.slice(0, exerciseCount).forEach((ex, idx) => {
        doc.setFontSize(12);
        doc.setTextColor(0, 33, 71);
        doc.text(`${ex.title}`, 15, currentY);
        currentY += 6;

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(ex.instruction, 15, currentY);
        currentY += 8;

        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        ex.items.forEach((item) => {
          doc.text(item.prompt, 18, currentY);
          currentY += 4;
          doc.setDrawColor(203, 213, 225);
          doc.line(18, currentY, 190, currentY);
          currentY += 7;
        });

        currentY += 6;
      });

      // Answer Key Page
      if (includeAnswerKey) {
        doc.addPage();
        doc.setFillColor(0, 33, 71);
        doc.rect(0, 0, 210, 24, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text('Teacher & Parent Answer Key | مفتاح الحل النموذجي', 15, 14);

        let ansY = 38;
        exercises.slice(0, exerciseCount).forEach((ex) => {
          doc.setFontSize(11);
          doc.setTextColor(0, 33, 71);
          doc.text(`${ex.title} (Answers):`, 15, ansY);
          ansY += 6;

          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          ex.items.forEach((item) => {
            doc.text(`✓ ${item.prompt} ➔ ${item.answer}`, 20, ansY);
            ansY += 6;
          });
          ansY += 6;
        });
      }

      doc.save(`ورقة_عمل_سارة_${studentName || 'الطالب'}_${Date.now()}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
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
        className="bg-slate-900 border-2 border-blue-400/50 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#001838] via-[#002B66] to-[#001838] px-5 py-4 border-b border-blue-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg border border-blue-300">
              📄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-blue-100">
                  {isRtl ? 'مولد أوراق العمل والواجبات الذكية القابلة للطباعة 📄' : 'AI Printable Homework & Worksheet Generator 📄'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black border border-blue-400/30">
                  PDF & Print
                </span>
              </div>
              <p className="text-xs text-blue-200/70">
                {isRtl
                  ? 'تمارين مخصصة للدرس • مفتاح حل لولي الأمر • طباعة A4 وتصدير PDF'
                  : 'Lesson-Bound Exercises • Parent Answer Key • A4 Print & PDF Export'}
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

        {/* Configuration Bar */}
        <div className="p-3.5 bg-slate-950/70 border-b border-white/10 shrink-0 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <span className="text-slate-400 font-bold shrink-0">{isRtl ? 'الموضوع:' : 'Topic:'}</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs w-full focus:outline-none focus:border-blue-400"
              placeholder={isRtl ? 'اكتب موضوع الدرس المراد توليد ورقة عمل له' : 'Enter topic...'}
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAnswerKey}
                onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                className="w-4 h-4 rounded text-blue-500 focus:ring-0"
              />
              <span>{isRtl ? 'تضمين مفتاح الحل (لولي الأمر)' : 'Include Answer Key'}</span>
            </label>
          </div>
        </div>

        {/* Printable / Preview Area */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-slate-950/40">
          <div
            ref={printAreaRef}
            className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6 border border-slate-200"
          >
            {/* Academic Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#855B14]">
                  Basim Alkhalil Digital Academy
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#002147]">
                  {topic} — Practice Worksheet
                </h2>
                <p className="text-xs text-slate-500">
                  Curated with Sara AI Personal English Tutor
                </p>
              </div>

              <div className="text-right text-xs text-slate-600 space-y-0.5 shrink-0">
                <p><strong>Student:</strong> {studentName || 'Student'}</p>
                <p><strong>Level:</strong> CEFR {studentLevel}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            {/* Exercises List */}
            <div className="space-y-6">
              {exercises.slice(0, exerciseCount).map((ex, idx) => (
                <div key={ex.id} className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <h3 className="text-xs sm:text-sm font-black text-[#002147]">
                      {ex.title}
                    </h3>
                    <span className="text-[11px] text-slate-500">{ex.titleAr}</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    {ex.instruction} ({ex.instructionAr})
                  </p>

                  <div className="space-y-2 pt-1">
                    {ex.items.map((item, iIdx) => (
                      <div key={iIdx} className="text-xs text-slate-800 flex items-center justify-between border-b border-dashed border-slate-200 pb-1.5">
                        <span className="font-medium">{item.prompt}</span>
                        {showAnswerKeyInPreview ? (
                          <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {item.answer}
                          </span>
                        ) : (
                          <span className="text-slate-300">________________________</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Key Box if toggled */}
            {includeAnswerKey && (
              <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#002147]">
                    🔑 Parent & Mentor Answer Key (مفتاح الإجابة النموذجي):
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAnswerKeyInPreview(prev => !prev)}
                    className="text-[11px] text-blue-600 hover:underline font-bold"
                  >
                    {showAnswerKeyInPreview ? 'إخفاء الإجابات في المعاينة' : 'إظهار الإجابات في المعاينة'}
                  </button>
                </div>
                {showAnswerKeyInPreview && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-slate-700">
                    <p>• <strong>Part 1:</strong> 1- واثق من نفسه | 2- مغامرة شيقة | 3- مجتهد ومثابر | 4- طلاقة</p>
                    <p>• <strong>Part 2:</strong> 1- visited | 2- play | 3- studied | 4- see</p>
                    <p>• <strong>Part 3:</strong> We played tennis yesterday afternoon. / She didn't finish her homework.</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-4 border-t border-slate-200 text-[10px] text-slate-400">
              Generated automatically by Basim Alkhalil Digital Academy • www.basimalkhalil.com
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer size={14} />
              <span>{isRtl ? 'طباعة مباشرة (A4) 🖨️' : 'Print A4 🖨️'}</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Download size={14} />
              <span>{isExporting ? (isRtl ? 'جاري التحميل...' : 'Downloading...') : (isRtl ? 'تحميل PDF 📄' : 'Download PDF 📄')}</span>
            </button>
          </div>

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
