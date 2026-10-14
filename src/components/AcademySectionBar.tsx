import React from 'react';
import { Home } from 'lucide-react';

const TITLES: Record<string, [string, string]> = {
  'grammar-academy': ['أكاديمية القواعد 📐', 'Grammar Academy 📐'],
  'reading-lab': ['مختبر القراءة 📖', 'Reading Lab 📖'],
  'writing-spelling-studio': ['استوديو التعبير والإملاء ✍️', 'Writing & Spelling ✍️'],
  'pronunciation-lab': ['معمل النطق 🎙️', 'Pronunciation Lab 🎙️'],
  'live-translate': ['المترجم المباشر 🌐', 'Live Translate 🌐'],
  'interactive-learning': ['تعليم تفاعلي ⚡', 'Interactive Learning ⚡'],
  'educational-games': ['واحة الألعاب والآداب 🎮', 'Games & Manners 🎮'],
  'ai-curriculum': ['منهج الذكاء الاصطناعي 🧠', 'AI Curriculum 🧠'],
  'professional-development': ['دورات تطويرية 🎓', 'Professional Development 🎓'],
  'balance-oasis': ['واحة التوازن 🌊', 'Balance Oasis 🌊'],
  'academic-analytics': ['التحليلات الأكاديمية 📊', 'Academic Analytics 📊'],
  'academic-planner': ['الخطة الدراسية الذكية 🗓️', 'Study Planner 🗓️'],
  'story-library': ['مكتبة القصص المسموعة 📚', 'Audio Story Library 📚'],
  'video-library': ['دروس الفيديو التفاعلية 🎬', 'Interactive Video Lessons 🎬'],
  'progress': ['تقارير الأداء 📊', 'Performance Reports 📊'],
  'leaderboard': ['لوحة المتصدرين 🏆', 'Leaderboard 🏆'],
  'early-childhood': ['أكاديمية الطفولة المبكرة 👶', 'Early Childhood Academy 👶'],
  'chat': ['غرف التواصل 💬', 'Chat Rooms 💬'],
  'parent': ['لوحة ولي الأمر 👨‍👩‍👧', 'Parent Dashboard 👨‍👩‍👧'],
  'admin': ['غرفة قيادة باسم الخليل 🛡️', 'Admin Dashboard 🛡️'],
};

/** One consistent navy/gold section header with a Home button, shown above every academy section (not home, not Sara). */
export const AcademySectionBar: React.FC<{ view: string; isRtl: boolean; onHome: () => void }> = ({ view, isRtl, onHome }) => {
  const t = TITLES[view];
  const title = t ? (isRtl ? t[0] : t[1]) : (isRtl ? 'أكاديمية باسم الخليل' : 'Basim Alkhalil Academy');
  return (
    <div data-testid="academy-section-bar" dir={isRtl ? 'rtl' : 'ltr'} className="mx-3 sm:mx-6 mb-3 mt-1 flex items-center gap-3 rounded-2xl bg-[#002147] px-3 py-2.5 shadow-md border-b-4 border-[#C49E3A]">
      <button onClick={onHome} aria-label={isRtl ? 'الرئيسية' : 'Home'} className="shrink-0 flex items-center gap-1.5 rounded-xl bg-[#C49E3A] text-[#002147] px-3 py-2 min-h-[40px] text-xs font-black active:scale-95 transition-transform">
        <Home size={16} /> <span>{isRtl ? 'الرئيسية' : 'Home'}</span>
      </button>
      <h1 className="min-w-0 flex-1 truncate text-sm sm:text-base font-black text-white">{title}</h1>
    </div>
  );
};
export default AcademySectionBar;
