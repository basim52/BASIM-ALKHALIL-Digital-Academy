import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  FileText, 
  Share2, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  User,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export interface CertificateData {
  unitId: string;
  unitTitle: string;
  unitTitleAr?: string;
  completedAt?: string | number;
  studentName?: string;
}

interface CompletionCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData | null;
  isRtl?: boolean;
}

export const CompletionCertificateModal: React.FC<CompletionCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  isRtl = true,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [sharingWa, setSharingWa] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && certificate) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#002147', '#C49E3A', '#58cc02', '#ffc800', '#2563eb']
        });
        setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#C49E3A', '#ffc800']
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#002147', '#58cc02']
          });
        }, 250);
      } catch (e) {
        // confetti fallback
      }
    }
  }, [isOpen, certificate]);

  if (!isOpen || !certificate) return null;

  const studentName = certificate.studentName || (isRtl ? 'طالب متميز' : 'Distinguished Student');
  const unitTitle = certificate.unitTitle || 'Unit Study';
  const unitTitleAr = certificate.unitTitleAr || certificate.unitTitle || 'الوحدة التعليمية';
  
  // Format completion date
  const dateObj = certificate.completedAt ? new Date(certificate.completedAt) : new Date();
  const formattedDateAr = dateObj.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedDateEn = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Generate PNG
  const handleDownloadPng = async () => {
    if (!certRef.current) return;
    setDownloadingPng(true);
    setFeedback(null);
    try {
      const dataUrl = await toPng(certRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `Certificate-${studentName.replace(/\s+/g, '_')}-${certificate.unitId}.png`;
      link.href = dataUrl;
      link.click();
      setFeedback(isRtl ? 'تم تحميل صورة الشهادة بنجاح! 🖼️' : 'Certificate image downloaded! 🖼️');
    } catch (err) {
      console.error('Failed to export certificate image:', err);
      setFeedback(isRtl ? 'تعذر تحميل الصورة، يرجى المحاولة مرة أخرى.' : 'Failed to download image.');
    } finally {
      setDownloadingPng(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Generate PDF (A4 Landscape)
  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    setDownloadingPdf(true);
    setFeedback(null);
    try {
      const dataUrl = await toPng(certRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });

      // A4 Landscape is 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
      pdf.save(`Certificate-${studentName.replace(/\s+/g, '_')}-${certificate.unitId}.pdf`);
      setFeedback(isRtl ? 'تم تحميل ملف PDF للشهادة بنجاح! 📄' : 'Certificate PDF downloaded! 📄');
    } catch (err) {
      console.error('Failed to export certificate PDF:', err);
      setFeedback(isRtl ? 'تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.' : 'Failed to generate PDF.');
    } finally {
      setDownloadingPdf(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Share WhatsApp (Web Share API with file on mobile, or wa.me fallback)
  const handleShareWhatsApp = async () => {
    if (!certRef.current) return;
    setSharingWa(true);
    setFeedback(null);
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://basim-academy.com';
    const waText = `🎉 أتممت بنجاح دراسة وحدة "${unitTitleAr}" في أكاديمية باسم الخليل الرقمية 🌟\n\n📜 شهادة إنجاز معتمدة باسم: ${studentName}\n🌐 رابط الأكاديمية:\n${siteUrl}`;

    try {
      // Attempt Web Share API with image file if supported (typically mobile)
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        const blob = await toBlob(certRef.current, { quality: 0.95, pixelRatio: 2 });
        if (blob) {
          const file = new File([blob], `Certificate-${certificate.unitId}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'شهادة إنجاز - أكاديمية باسم الخليل الرقمية',
              text: waText,
            });
            setSharingWa(false);
            return;
          }
        }
      }
    } catch (shareErr: any) {
      if (shareErr.name === 'AbortError') {
        setSharingWa(false);
        return;
      }
      console.warn('Web Share failed, using direct WhatsApp URL:', shareErr);
    }

    // Direct WhatsApp Web Fallback
    const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    setSharingWa(false);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900/90 text-white rounded-3xl p-4 sm:p-6 max-w-4xl w-full shadow-2xl border border-white/10 my-auto flex flex-col items-center"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Top Bar with Title and Close Button */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#C49E3A]/20 text-[#C49E3A] flex items-center justify-center border border-[#C49E3A]/30">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  {isRtl ? 'شهادة إنجاز وتفوق أكاديمي 🎓' : 'Certificate of Achievement 🎓'}
                </h3>
                <p className="text-[11px] text-white/60">
                  {isRtl ? 'مبروك إتمام متطلبات الوحدة بنجاح! يمكنك تحميل الشهادة أو مشاركتها' : 'Congratulations on completing this unit! Download or share your certificate'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Certificate Container with Landscape A4 Ratio (1.414 : 1) */}
          <div className="w-full flex justify-center py-2 overflow-x-auto">
            <div
              ref={certRef}
              id="printable-certificate-card"
              className="relative w-full max-w-[800px] aspect-[1.414/1] bg-gradient-to-br from-[#ffffff] via-[#fefdfa] to-[#fbf8ee] text-slate-900 p-6 sm:p-10 rounded-2xl shadow-2xl border-[6px] border-[#002147] select-none flex flex-col justify-between overflow-hidden"
              style={{ minHeight: '380px' }}
              dir="rtl"
            >
              {/* Inner Decorative Gold Frame */}
              <div className="absolute inset-2 sm:inset-3 border-2 border-[#C49E3A] rounded-xl pointer-events-none" />
              <div className="absolute inset-3 sm:inset-4 border border-[#C49E3A]/40 rounded-lg pointer-events-none" />

              {/* Corner Ornaments */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#002147] pointer-events-none" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#002147] pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#002147] pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#002147] pointer-events-none" />

              {/* Watermark Crest Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <div className="text-[180px] font-black text-[#002147]">B</div>
              </div>

              {/* 1. Header: Academy Name & Logo */}
              <div className="relative z-10 flex items-center justify-between border-b-2 border-[#C49E3A]/40 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#002147] text-white flex items-center justify-center shadow-md border-2 border-[#C49E3A] font-black text-2xl">
                    🦉
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg sm:text-2xl font-black text-[#002147] tracking-tight leading-none">
                      أكاديمية باسم الخليل الرقمية
                    </h2>
                    <p className="text-[10px] sm:text-xs font-bold text-[#C49E3A] uppercase tracking-widest mt-1">
                      Basim Alkhalil Digital Academy
                    </p>
                  </div>
                </div>

                <div className="text-left hidden sm:block">
                  <span className="inline-block px-3 py-1 bg-[#002147] text-[#C49E3A] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#C49E3A]/40 shadow-sm">
                    شهادة إنجاز معتمدة
                  </span>
                  <p className="text-[9px] text-slate-400 font-mono mt-1">VERIFIED ACCREDITED</p>
                </div>
              </div>

              {/* 2. Certificate Body */}
              <div className="relative z-10 text-center my-auto py-2">
                <div className="inline-block mb-1 sm:mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    تشهد الأكاديمية بأن الطالب المتميز / This certifies that
                  </span>
                </div>

                {/* Student Name */}
                <h1 className="text-2xl sm:text-4xl font-black text-[#002147] tracking-tight mb-2 drop-shadow-sm">
                  {studentName}
                </h1>

                <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-[#C49E3A] to-transparent mx-auto mb-3" />

                {/* Short line: أتمّ بنجاح */}
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed mb-2">
                  قد <span className="text-emerald-700 font-black">أتمّ بنجاح</span> واقتدار متطلبات الوحدة الدراسية:
                </p>

                {/* Unit Name (Arabic & English) */}
                <div className="bg-[#002147]/5 border border-[#C49E3A]/40 rounded-xl py-2 px-4 max-w-lg mx-auto inline-block shadow-sm">
                  <p className="text-sm sm:text-lg font-black text-[#002147]">
                    {unitTitleAr}
                  </p>
                  {unitTitle && unitTitle !== unitTitleAr && (
                    <p className="text-[11px] sm:text-xs font-bold text-slate-500 font-sans mt-0.5" dir="ltr">
                      {unitTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Footer: Date, Verified Seal, Signature */}
              <div className="relative z-10 pt-3 border-t border-[#C49E3A]/30 flex items-end justify-between text-right">
                {/* Completion Date */}
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">تاريخ الإنجاز / Completion Date</p>
                  <p className="text-xs sm:text-sm font-black text-[#002147] mt-0.5">{formattedDateAr}</p>
                  <p className="text-[10px] font-mono text-slate-500" dir="ltr">{formattedDateEn}</p>
                </div>

                {/* Royal Verified Seal */}
                <div className="flex flex-col items-center justify-center mx-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#e6c15c] via-[#C49E3A] to-[#997722] p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full border border-dashed border-white/60 flex flex-col items-center justify-center bg-[#C49E3A] text-white">
                      <Sparkles size={14} className="text-yellow-200" />
                      <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">معتمد</span>
                      <span className="text-[6px] font-bold opacity-80">VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Academic Director Signature */}
                <div className="text-left" dir="ltr">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Director</p>
                  <div className="font-serif italic text-base sm:text-lg font-black text-[#002147] leading-none my-1">
                    Basim Alkhalil
                  </div>
                  <p className="text-[9px] font-bold text-[#C49E3A]">أكاديمية باسم الخليل الرقمية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback banner if downloaded/shared */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-2.5 my-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 rounded-xl text-xs font-bold text-center"
            >
              {feedback}
            </motion.div>
          )}

          {/* 4. Action Buttons: Download PNG, Download PDF, Share WhatsApp */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-white/10">
            {/* PNG Image Download */}
            <button
              onClick={handleDownloadPng}
              disabled={downloadingPng}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-black text-xs sm:text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {downloadingPng ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download size={16} className="text-[#ffc800]" />
              )}
              <span>{isRtl ? 'تحميل صورة (PNG)' : 'Download Image (PNG)'}</span>
            </button>

            {/* PDF Download */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="py-3 px-4 rounded-xl bg-[#002147] hover:bg-[#002d61] active:scale-95 text-white font-black text-xs sm:text-sm border border-[#C49E3A]/40 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {downloadingPdf ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FileText size={16} className="text-[#C49E3A]" />
              )}
              <span>{isRtl ? 'تحميل PDF' : 'Download PDF'}</span>
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleShareWhatsApp}
              disabled={sharingWa}
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {sharingWa ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <MessageCircle size={16} />
              )}
              <span>{isRtl ? 'مشاركة واتساب' : 'Share WhatsApp'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
