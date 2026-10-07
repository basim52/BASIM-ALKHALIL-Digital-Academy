import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Share2,
  Download,
  RefreshCw,
  BookOpen,
  Mic,
  PenTool,
  Brain,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { getRiyadhDateStr, StreakData } from '../services/streakService';

interface StudentProfileData {
  uid: string;
  displayName: string;
  level?: string;
  points?: number;
  avatarUrl?: string;
  isSelf?: boolean;
}

interface ParentWeeklyReportCardProps {
  student: StudentProfileData;
  parentUid: string;
  isParentAdmin?: boolean;
  lang?: 'ar' | 'en';
}

interface SkillStats {
  nameAr: string;
  nameEn: string;
  score: number;
  count: number;
  icon: string;
}

export const ParentWeeklyReportCard: React.FC<ParentWeeklyReportCardProps> = ({
  student,
  parentUid,
  isParentAdmin = false,
  lang = 'ar'
}) => {
  const isRtl = lang === 'ar';
  const reportRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalStudyMinutes, setTotalStudyMinutes] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [streakData, setStreakData] = useState<{ current: number; longest: number }>({ current: 0, longest: 0 });
  const [bestSkill, setBestSkill] = useState<{ name: string; score: number }>({ name: 'القراءة والفهم', score: 0 });
  const [weakestSkill, setWeakestSkill] = useState<{ name: string; score: number }>({ name: 'المحادثة والنطق', score: 0 });
  const [comparison, setComparison] = useState<{ diffLessons: number; text: string; trend: 'up' | 'down' | 'same' }>({
    diffLessons: 0,
    text: 'مستوى ثابت مقارنة بالأسبوع الماضي',
    trend: 'same'
  });

  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAiSummary, setLoadingAiSummary] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchWeeklyData = async () => {
      if (!student?.uid) return;
      setLoading(true);

      const isSimulated = student.uid.startsWith('sim_') || parentUid.startsWith('sim_') || !auth.currentUser;

      if (isSimulated) {
        if (!isMounted) return;
        setLessonsCompleted(6);
        setTotalStudyMinutes(85);
        setAverageScore(92);
        setStreakData({ current: 5, longest: 7 });
        setBestSkill({ name: isRtl ? 'القراءة والفهم' : 'Reading & Comprehension', score: 96 });
        setWeakestSkill({ name: isRtl ? 'المحادثة والنطق' : 'Speaking & Pronunciation', score: 84 });
        setComparison({
          diffLessons: 2,
          text: isRtl ? '+2 دروس مقارنة بالأسبوع الماضي (تقدم ملحوظ ↗️)' : '+2 lessons vs last week (Up ↗️)',
          trend: 'up'
        });
        setAiSummary(
          isRtl
            ? `📊 [الملخص والتشخيص الأكاديمي]:\nأنجز الطالب هذا الأسبوع 6 دروس دراسية خلال 75 دقيقة تعلم تفاعلي بمعدل استيعاب عام 96% مع الحفاظ على شعلة انضباط بلغت 5 أيام متتالية. أظهر الطالب تفوقاً ملموساً واستقراراً في مهارة القراءة وفهم النصوص واستيعاب التراكيب، بينما تشير المؤشرات إلى أن مهارة المحادثة والنطق تمثل الأولوية التطويرية القادمة لردم الفجوة ورفع الطلاقة الشفوية.\n\n🎯 [التوصيات التربوية والتنفيذية]:\n1. تخصيص 10 دقائق يومياً لمحادثة تفاعلية بأسئلة مفتوحة باللغة الإنجليزية في المنزل وتطبيق العبارات المكتسبة.\n2. تشجيع الطالب على قراءة الجمل المتقنة بصوت مسموع لتعزيز الإيقاع الصوتي والجرأة في النطق.\n3. استهداف إنجاز 3 أنشطة محادثة تفاعلية مع سارة في الأسبوع القادم لرفع مؤشر النطق فوق 90%.`
            : `📊 [Academic Diagnostic Summary]:\nThe student completed 6 lessons over 75 study minutes with a 96% mastery score and an active 5-day streak. Reading & Comprehension demonstrates standout proficiency, while Speaking & Pronunciation represents the primary growth target.\n\n🎯 [Actionable Advisory Recommendations]:\n1. Dedicate 10 minutes daily to conversational practice using learned phrases at home.\n2. Encourage reading aloud to build spoken rhythm and phonetic confidence.\n3. Target 3 interactive oral sessions with Sara next week to lift speaking mastery beyond 90%.`
        );
        setLoading(false);
        return;
      }

      try {
        const now = Date.now();
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

        // 1. Fetch lesson results for this child
        // Parents have permission: owner or parentIds array-contains parentUid or admin
        let resultsSnap;
        try {
          const isSelf = student.uid === parentUid;
          const q = (isSelf || isParentAdmin)
            ? query(collection(db, 'lessonResults'), where('userId', '==', student.uid))
            : query(collection(db, 'lessonResults'), where('userId', '==', student.uid), where('parentIds', 'array-contains', parentUid));
          resultsSnap = await getDocs(q);
        } catch {
          // Fallback query without parentIds array-contains if not yet indexed
          const fallbackQ = query(collection(db, 'lessonResults'), where('userId', '==', student.uid));
          resultsSnap = await getDocs(fallbackQ);
        }

        const thisWeekDocs: any[] = [];
        const prevWeekDocs: any[] = [];

        resultsSnap.forEach((docSnap) => {
          const d = docSnap.data();
          let itemTime = 0;
          if (d.timestamp?.toMillis) {
            itemTime = d.timestamp.toMillis();
          } else if (d.timestamp?.seconds) {
            itemTime = d.timestamp.seconds * 1000;
          } else if (d.timestamp) {
            itemTime = new Date(d.timestamp).getTime();
          } else if (d.completedAt?.toMillis) {
            itemTime = d.completedAt.toMillis();
          } else if (d.completedAt) {
            itemTime = new Date(d.completedAt).getTime();
          } else if (d.createdAt) {
            itemTime = new Date(d.createdAt).getTime();
          }

          if (itemTime >= sevenDaysAgo) {
            thisWeekDocs.push({ id: docSnap.id, ...d, itemTime });
          } else if (itemTime >= fourteenDaysAgo && itemTime < sevenDaysAgo) {
            prevWeekDocs.push({ id: docSnap.id, ...d, itemTime });
          }
        });

        // 2. Fetch student streak
        let currentStreak = 0;
        let longestStreak = 0;
        try {
          const streakSnap = await getDoc(doc(db, 'streaks', student.uid));
          if (streakSnap.exists()) {
            const sd = streakSnap.data();
            currentStreak = Number(sd.current) || 0;
            longestStreak = Number(sd.longest) || 0;
          }
        } catch (streakErr) {
          console.warn('Could not read child streak document:', streakErr);
        }

        // Metrics computation for last 7 days
        const compLessons = thisWeekDocs.length;
        // Total study time: count ~12 mins per lesson or use recorded duration
        const studyMins = thisWeekDocs.reduce((acc, d) => acc + (d.durationMinutes || d.studyTime || 12), 0);

        let totalScoreSum = 0;
        let validScoresCount = 0;

        // Categorize skills
        const skillsMap: Record<string, { total: number; count: number; nameAr: string; nameEn: string }> = {
          reading: { total: 0, count: 0, nameAr: 'القراءة والفهم 📖', nameEn: 'Reading & Comprehension' },
          grammar: { total: 0, count: 0, nameAr: 'القواعد والتركيب ✍️', nameEn: 'Grammar & Syntax' },
          speaking: { total: 0, count: 0, nameAr: 'المحادثة والنطق 🎙️', nameEn: 'Speaking & Pronunciation' },
          vocabulary: { total: 0, count: 0, nameAr: 'المفردات والتهجئة 🔤', nameEn: 'Vocabulary & Spelling' },
          interactive: { total: 0, count: 0, nameAr: 'التفاعل والتطبيق 🎮', nameEn: 'Interactive Practice' }
        };

        thisWeekDocs.forEach((d) => {
          let scorePct = 100;
          if (d.total && d.total > 0 && typeof d.score === 'number') {
            scorePct = Math.round((d.score / d.total) * 100);
          } else if (typeof d.score === 'number') {
            scorePct = Math.min(100, Math.round(d.score));
          }

          totalScoreSum += scorePct;
          validScoresCount++;

          const courseId = String(d.courseId || '').toLowerCase();
          const lessonId = String(d.lessonId || '').toLowerCase();
          const title = String(d.lessonTitle || '').toLowerCase();

          if (courseId.includes('grammar') || title.includes('grammar') || lessonId.includes('grammar')) {
            skillsMap.grammar.total += scorePct;
            skillsMap.grammar.count++;
          } else if (courseId.includes('reading') || courseId.includes('story') || title.includes('reading') || title.includes('story')) {
            skillsMap.reading.total += scorePct;
            skillsMap.reading.count++;
          } else if (courseId.includes('pronunciation') || courseId.includes('conversation') || title.includes('pronunciation') || title.includes('dialogue')) {
            skillsMap.speaking.total += scorePct;
            skillsMap.speaking.count++;
          } else if (courseId.includes('vocab') || courseId.includes('spelling') || courseId.includes('daily_dose') || title.includes('vocab')) {
            skillsMap.vocabulary.total += scorePct;
            skillsMap.vocabulary.count++;
          } else {
            skillsMap.interactive.total += scorePct;
            skillsMap.interactive.count++;
          }
        });

        const avgScore = validScoresCount > 0 ? Math.round(totalScoreSum / validScoresCount) : 0;

        // Determine best and weakest skills
        const activeSkills = Object.entries(skillsMap)
          .map(([key, item]) => ({
            key,
            name: isRtl ? item.nameAr : item.nameEn,
            avg: item.count > 0 ? Math.round(item.total / item.count) : 0,
            count: item.count
          }))
          .filter((s) => s.count > 0)
          .sort((a, b) => b.avg - a.avg);

        const computedBest = activeSkills.length > 0
          ? { name: activeSkills[0].name, score: activeSkills[0].avg }
          : { name: isRtl ? 'القراءة والفهم 📖' : 'Reading 📖', score: avgScore || 90 };

        const computedWeakest = activeSkills.length > 1
          ? { name: activeSkills[activeSkills.length - 1].name, score: activeSkills[activeSkills.length - 1].avg }
          : { name: isRtl ? 'المحادثة والنطق 🎙️' : 'Speaking 🎙️', score: Math.max(70, (avgScore || 80) - 10) };

        // Comparison with previous week
        const prevCompLessons = prevWeekDocs.length;
        const diff = compLessons - prevCompLessons;
        let trend: 'up' | 'down' | 'same' = 'same';
        let compText = isRtl ? 'أداء ثابت ومستمر مقارنة بالأسبوع الماضي' : 'Consistent with last week';

        if (diff > 0) {
          trend = 'up';
          compText = isRtl
            ? `+${diff} دروس إضافية مقارنة بالأسبوع الماضي (تحسن ممتاز ↗️)`
            : `+${diff} more lessons than last week (Up ↗️)`;
        } else if (diff < 0) {
          trend = 'down';
          compText = isRtl
            ? `${diff} دروس مقارنة بالأسبوع الماضي (يحتاج تشجيعاً للمواصلة ↘️)`
            : `${diff} lessons compared to last week (Down ↘️)`;
        }

        if (!isMounted) return;
        setLessonsCompleted(compLessons);
        setTotalStudyMinutes(studyMins);
        setAverageScore(avgScore);
        setStreakData({ current: currentStreak, longest: longestStreak });
        setBestSkill(computedBest);
        setWeakestSkill(computedWeakest);
        setComparison({ diffLessons: diff, text: compText, trend });
        setLoading(false);

        // Fetch AI Summary
        fetchAiSummary({
          lessonsCompleted: compLessons,
          totalStudyMinutes: studyMins,
          averageScore: avgScore,
          bestSkill: computedBest.name,
          weakestSkill: computedWeakest.name,
          currentStreak: currentStreak,
          comparisonText: compText
        });
      } catch (err) {
        console.error('Error computing weekly report for parent:', err);
        if (isMounted) setLoading(false);
      }
    };

    fetchWeeklyData();

    return () => {
      isMounted = false;
    };
  }, [student?.uid, parentUid]);

  const fetchAiSummary = async (metrics: {
    lessonsCompleted: number;
    totalStudyMinutes: number;
    averageScore: number;
    bestSkill: string;
    weakestSkill: string;
    currentStreak: number;
    comparisonText: string;
  }) => {
    setLoadingAiSummary(true);
    try {
      const generateStructuredFallback = (m: typeof metrics) => {
        if (isRtl) {
          return `📊 [الملخص والتشخيص الأكاديمي]:\nأنجز الطالب خلال الأسبوع ${m.lessonsCompleted} دروس دراسية بمجموع ${m.totalStudyMinutes} دقيقة تعلم تفاعلي ومعدل استيعاب عام بلغ ${m.averageScore}%. يُظهر التحليل تفوقاً ملموساً واستقراراً في مهارة (${m.bestSkill})، بينما كشفت الاختبارات التفاعلية عن حاجة مهارة (${m.weakestSkill}) إلى تدريب تطبيقي مكثف لتجسير الفجوة مع بقية المهارات، مع التزام مشجع عبر شعلة تعلم متصلة بلغت ${m.currentStreak} أيام.\n\n🎯 [التوصيات التربوية والتنفيذية]:\n1. تخصيص 10 دقائق يومياً لممارسة تدريبات مركزة في مهارة (${m.weakestSkill}) عبر الحوار التفاعلي والتكرار المتباعد.\n2. استثمار ثقته العالية في (${m.bestSkill}) لربط المفاهيم الصعبة بنقاط قوته وجعل التعلم ممتعاً ومحفزاً.\n3. استهداف إنجاز 3 إلى 4 أنشطة تطبيقية جديدة هذا الأسبوع لرفع مؤشر (${m.weakestSkill}) إلى ما فوق 85%.`;
        }
        return `📊 [Academic Diagnostic Summary]:\nThe student completed ${m.lessonsCompleted} lessons (${m.totalStudyMinutes} study minutes) with an overall mastery score of ${m.averageScore}% and an active ${m.currentStreak}-day streak. Strongest proficiency was recorded in ${m.bestSkill}, while ${m.weakestSkill} represents the primary targeted growth area.\n\n🎯 [Actionable Advisory Recommendations]:\n1. Dedicate 10 minutes daily specifically to ${m.weakestSkill} using interactive quizzes and conversational prompts.\n2. Leverage student confidence in ${m.bestSkill} to tackle higher-difficulty lessons.\n3. Complete 3-4 oral/comprehension practices next week to balance overall mastery.`;
      };

      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        // Fallback friendly message for simulated / offline mode
        setAiSummary(generateStructuredFallback(metrics));
        setLoadingAiSummary(false);
        return;
      }

      const resp = await fetch('/api/parent/weekly-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
          studentId: student.uid,
          metrics
        })
      });

      if (!resp.ok) {
        throw new Error(`HTTP error ${resp.status}`);
      }

      const data = await resp.json();
      if (data.summary) {
        setAiSummary(data.summary);
      } else {
        throw new Error('No summary returned');
      }
    } catch (e) {
      console.warn('Failed to fetch AI summary from server, using client fallback:', e);
      const fallbackMetrics = metrics;
      setAiSummary(
        isRtl
          ? `📊 [الملخص والتشخيص الأكاديمي]:\nأنجز الطالب خلال الأسبوع ${fallbackMetrics.lessonsCompleted} دروس دراسية بمجموع ${fallbackMetrics.totalStudyMinutes} دقيقة تعلم تفاعلي ومعدل استيعاب عام بلغ ${fallbackMetrics.averageScore}%. يُظهر التحليل تفوقاً ملموساً واستقراراً في مهارة (${fallbackMetrics.bestSkill})، بينما كشفت الاختبارات التفاعلية عن حاجة مهارة (${fallbackMetrics.weakestSkill}) إلى تدريب تطبيقي مكثف لتجسير الفجوة مع بقية المهارات، مع التزام مشجع عبر شعلة تعلم متصلة بلغت ${fallbackMetrics.currentStreak} أيام.\n\n🎯 [التوصيات التربوية والتنفيذية]:\n1. تخصيص 10 دقائق يومياً لممارسة تدريبات مركزة في مهارة (${fallbackMetrics.weakestSkill}) عبر الحوار التفاعلي والتكرار المتباعد.\n2. استثمار ثقته العالية في (${fallbackMetrics.bestSkill}) لربط المفاهيم الصعبة بنقاط قوته وجعل التعلم ممتعاً ومحفزاً.\n3. استهداف إنجاز 3 إلى 4 أنشطة تطبيقية جديدة هذا الأسبوع لرفع مؤشر (${fallbackMetrics.weakestSkill}) إلى ما فوق 85%.`
          : `📊 [Academic Diagnostic Summary]:\nThe student completed ${fallbackMetrics.lessonsCompleted} lessons (${fallbackMetrics.totalStudyMinutes} study minutes) with an overall mastery score of ${fallbackMetrics.averageScore}% and an active ${fallbackMetrics.currentStreak}-day streak. Highest proficiency is in ${fallbackMetrics.bestSkill}, whereas ${fallbackMetrics.weakestSkill} represents the focus area for growth.\n\n🎯 [Actionable Advisory Recommendations]:\n1. Dedicate 10 minutes daily specifically to ${fallbackMetrics.weakestSkill}.\n2. Leverage strong competence in ${fallbackMetrics.bestSkill} to tackle higher-difficulty tasks.\n3. Target 3-4 interactive sessions next week to lift ${fallbackMetrics.weakestSkill} mastery.`
      );
    } finally {
      setLoadingAiSummary(false);
    }
  };

  // WhatsApp Share handler
  const handleShareWhatsApp = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://basim-academy.com';
    const text = isRtl
      ? `📊 *التقرير الأسبوعي للأداء الدراسي*\n` +
        `👤 *الطالب:* ${student.displayName}\n` +
        `🏫 *أكاديمية باسم الخليل الرقمية*\n` +
        `🗓️ *الفترة:* آخر 7 أيام\n\n` +
        `📚 *الدروس المنجزة:* ${lessonsCompleted} درس (${totalStudyMinutes} دقيقة)\n` +
        `🎯 *معدل الدرجات:* ${averageScore}%\n` +
        `🔥 *شعلة الأيام المتتالية:* ${streakData.current} يوم\n` +
        `🌟 *أقوى مهارة:* ${bestSkill.name}\n` +
        `💡 *مهارة للتركيز:* ${weakestSkill.name}\n` +
        `📈 *المقارنة بالأسبوع الماضي:* ${comparison.text}\n\n` +
        `💬 *ملخص وتوصية المستشار التربوي الذكي:*\n"${aiSummary}"\n\n` +
        `🌐 *رابط بوابة الأكاديمية:*\n${siteUrl}`
      : `Weekly Report for ${student.displayName}: ${lessonsCompleted} lessons, ${averageScore}% avg score, ${streakData.current} days streak. Check details at ${siteUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // PDF Download handler
  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setDownloadingPdf(true);
    setFeedback(null);

    try {
      const dataUrl = await toPng(reportRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // A4 is 210mm x 297mm
      const imgWidth = 190;
      const imgHeight = (reportRef.current.offsetHeight * imgWidth) / reportRef.current.offsetWidth;

      pdf.addImage(dataUrl, 'PNG', 10, 10, imgWidth, Math.min(imgHeight, 277));
      pdf.save(`التقرير_الأسبوعي_${student.displayName.replace(/\s+/g, '_')}.pdf`);

      setFeedback(isRtl ? 'تم تحميل ملف PDF للتقرير الأسبوعي بنجاح! 📄' : 'Report PDF downloaded successfully! 📄');
    } catch (err) {
      console.error('Failed to export report PDF:', err);
      setFeedback(isRtl ? 'تعذر إنشاء ملف PDF، يرجى المحاولة لاحقاً.' : 'Failed to generate PDF.');
    } finally {
      setDownloadingPdf(false);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  return (
    <div
      className={`bg-white rounded-3xl p-5 sm:p-7 shadow-sm border-2 border-slate-200/80 relative overflow-hidden text-slate-800 ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Banner Stripe */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#002147] to-[#0a4d8c] text-white flex items-center justify-center text-2xl shadow-md shadow-blue-900/20 shrink-0 border-b-3 border-[#C49E3A]">
            <FileText size={26} className="text-[#ffc800]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-[#002147]">
                {isRtl ? 'التقرير الأسبوعي' : 'Weekly Progress Report'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black uppercase tracking-wider">
                {isRtl ? 'آخر 7 أيام 🗓️' : 'Last 7 Days 🗓️'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isRtl
                ? `تحليل الأداء التراكمي للطالب (${student.displayName}) للأيام السبعة الأخيرة، مستخرج تلقائياً من الأنشطة والشعلة اليومية.`
                : `Last 7 days performance metrics for (${student.displayName}).`}
            </p>
          </div>
        </div>

        {/* Action Buttons: WhatsApp & PDF Download */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer"
            title={isRtl ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
          >
            <MessageCircle size={15} />
            <span>{isRtl ? 'مشاركة واتساب' : 'WhatsApp'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf || loading}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-[#002147] hover:bg-blue-900 active:scale-95 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title={isRtl ? 'تحميل كملف PDF' : 'Download PDF'}
          >
            {downloadingPdf ? (
              <RefreshCw size={15} className="animate-spin text-amber-300" />
            ) : (
              <Download size={15} />
            )}
            <span>{downloadingPdf ? (isRtl ? 'جاري التحضير...' : 'Exporting...') : (isRtl ? 'تحميل PDF' : 'Download PDF')}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-black flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Printable Report Canvas Area */}
      <div ref={reportRef} className="space-y-4 p-1">
        {/* Child Profile Header Sub-card */}
        <div className="p-3.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-slate-300 shrink-0">
              <img
                src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.displayName}`}
                alt={student.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#002147]">{student.displayName}</span>
                <span className="px-2 py-0.2 bg-[#002147] text-white text-[9px] font-black rounded-md">
                  {student.level || 'A1'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-bold">
                ⭐ {student.points || 0} XP {isRtl ? 'رصيد نقاط التميز الأكاديمي' : 'Academic Points'}
              </span>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500 flex items-center gap-1 self-end sm:self-auto">
            <span>📅 {isRtl ? 'تاريخ التقرير:' : 'Date:'}</span>
            <span className="font-mono text-[#002147]">{getRiyadhDateStr()}</span>
          </div>
        </div>

        {/* 4 PRIMARY METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Lessons Completed & Study Time */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-center">
            <span className="text-[10px] text-blue-700 font-bold block uppercase tracking-wider mb-0.5">
              {isRtl ? 'الدروس المكتملة' : 'Completed Lessons'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#002147] font-mono block">
              {lessonsCompleted} {isRtl ? 'درس' : 'lessons'}
            </span>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 flex items-center justify-center gap-1">
              <Clock size={11} />
              <span>{totalStudyMinutes} {isRtl ? 'دقيقة دراسة' : 'mins'}</span>
            </span>
          </div>

          {/* 2. Average Score */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-center">
            <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider mb-0.5">
              {isRtl ? 'معدل الدرجات' : 'Average Score'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono block">
              {averageScore}%
            </span>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5">
              {averageScore >= 90
                ? (isRtl ? '🏆 تقدير ممتاز جداً' : 'Excellent')
                : averageScore >= 75
                ? (isRtl ? '🌟 أداء متقدم ومبشر' : 'Good')
                : (isRtl ? '💪 بداية جيدة للتحسن' : 'Improving')}
            </span>
          </div>

          {/* 3. Current Streak */}
          <div className="p-3.5 bg-orange-50/80 border border-orange-200/80 rounded-2xl text-center">
            <span className="text-[10px] text-orange-600 font-bold block uppercase tracking-wider mb-0.5">
              {isRtl ? 'شعلة الأيام الحالية' : 'Current Streak'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-orange-600 font-mono flex items-center justify-center gap-1">
              <Flame size={20} className="text-orange-500 animate-bounce-slow" />
              <span>{streakData.current}</span>
              <span className="text-xs font-sans">{isRtl ? 'يوم' : 'd'}</span>
            </span>
            <span className="text-[10px] text-orange-700 font-bold mt-0.5 block">
              {isRtl ? `الأطول: ${streakData.longest} يوم` : `Longest: ${streakData.longest}d`}
            </span>
          </div>

          {/* 4. Comparison with Previous Week */}
          <div className="p-3.5 bg-purple-50/80 border border-purple-200/80 rounded-2xl text-center">
            <span className="text-[10px] text-purple-700 font-bold block uppercase tracking-wider mb-0.5">
              {isRtl ? 'مقارنة بالأسبوع السابق' : 'Vs Previous Week'}
            </span>
            <span className="text-sm sm:text-base font-black text-purple-900 flex items-center justify-center gap-1 mt-1">
              {comparison.trend === 'up' ? (
                <TrendingUp size={18} className="text-emerald-600 shrink-0" />
              ) : comparison.trend === 'down' ? (
                <TrendingDown size={18} className="text-rose-600 shrink-0" />
              ) : (
                <Minus size={18} className="text-slate-500 shrink-0" />
              )}
              <span>{comparison.diffLessons > 0 ? `+${comparison.diffLessons}` : comparison.diffLessons} {isRtl ? 'درس' : 'lessons'}</span>
            </span>
            <span className="text-[10px] text-purple-700 font-bold mt-0.5 block leading-tight">
              {comparison.trend === 'up'
                ? (isRtl ? 'ارتفاع ملحوظ ↗️' : 'Up ↗️')
                : comparison.trend === 'down'
                ? (isRtl ? 'تراجع طفيف ↘️' : 'Down ↘️')
                : (isRtl ? 'مستوى ثابت ➡️' : 'Steady ➡️')}
            </span>
          </div>
        </div>

        {/* BEST & WEAKEST SKILLS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Best Skill */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
                🌟
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                  {isRtl ? 'أقوى مهارة هذا الأسبوع' : 'Strongest Skill'}
                </span>
                <h4 className="text-sm font-black text-emerald-950">{bestSkill.name}</h4>
              </div>
            </div>
            <span className="text-lg font-black text-emerald-700 font-mono">{bestSkill.score}%</span>
          </div>

          {/* Weakest Skill / Area to Focus */}
          <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
                💡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                  {isRtl ? 'مهارة تحتاج لمزيد من الممارسة' : 'Skill Needing Focus'}
                </span>
                <h4 className="text-sm font-black text-amber-950">{weakestSkill.name}</h4>
              </div>
            </div>
            <span className="text-lg font-black text-amber-700 font-mono">{weakestSkill.score}%</span>
          </div>
        </div>

        {/* AI SUMMARY & CONCRETE TIP BOX */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-[#002147] to-[#012b5c] text-white rounded-2xl sm:rounded-3xl shadow-md border-2 border-[#C49E3A]/40 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#C49E3A] text-[#002147] flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#ffc800]">
                {isRtl ? 'ملخص وتوصية المستشار الأكاديمي الذكي 🤖' : 'AI Academic Advisor Summary 🤖'}
              </h4>
            </div>

            <button
              onClick={() =>
                fetchAiSummary({
                  lessonsCompleted,
                  totalStudyMinutes,
                  averageScore,
                  bestSkill: bestSkill.name,
                  weakestSkill: weakestSkill.name,
                  currentStreak: streakData.current,
                  comparisonText: comparison.text
                })
              }
              disabled={loadingAiSummary}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title={isRtl ? 'إعادة توليد التوصية' : 'Regenerate'}
            >
              <RefreshCw size={13} className={loadingAiSummary ? 'animate-spin' : ''} />
            </button>
          </div>

          {loadingAiSummary ? (
            <div className="py-6 text-center">
              <div className="w-7 h-7 border-2 border-[#ffc800] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-bold">
                {isRtl ? 'جاري صياغة التقرير والتشخيص التربوي الموجه لولي الأمر...' : 'Crafting weekly parent diagnostic summary...'}
              </p>
            </div>
          ) : (
            (() => {
              const cleaned = (aiSummary || '').trim().replace(/^"(.*)"$/s, '$1').trim();
              if (!cleaned) {
                return (
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-1">
                    {isRtl ? 'لا يتوفر ملخص حالياً' : 'No summary available'}
                  </p>
                );
              }

              const sections = cleaned.split(/(?=📊|🎯)/g).filter(s => s.trim().length > 0);
              if (sections.length > 1) {
                return (
                  <div className="space-y-3 mt-2.5">
                    {sections.map((sec, idx) => {
                      const isDiagnostic = sec.includes('📊') || sec.includes('الملخص') || sec.toLowerCase().includes('summary');
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl sm:rounded-2xl border transition-all ${
                            isDiagnostic
                              ? 'bg-black/20 border-[#C49E3A]/40 text-slate-100 shadow-inner'
                              : 'bg-emerald-950/40 border-emerald-400/30 text-emerald-50 shadow-inner'
                          }`}
                        >
                          <div className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed font-medium">
                            {sec.trim()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return (
                <div className="p-3.5 rounded-xl sm:rounded-2xl bg-black/20 border border-white/10 mt-2.5 whitespace-pre-line text-xs sm:text-[13px] text-slate-100 font-medium leading-relaxed">
                  {cleaned}
                </div>
              );
            })()
          )}

          <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-bold">
            <span>{isRtl ? 'أكاديمية باسم الخليل الرقمية • نظام الذكاء الاصطناعي الأكاديمي' : 'Basim Alkhalil Digital Academy'}</span>
            <span className="text-[#ffc800]">{isRtl ? 'تشخيص تحليلي وتوصيات عملية معتمدة' : 'Diagnostic summary & actionable recommendations'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
