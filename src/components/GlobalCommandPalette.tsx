import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Video, 
  Sparkles, 
  Gamepad2, 
  Award, 
  User, 
  FileText, 
  Mic, 
  GraduationCap, 
  Compass, 
  Languages, 
  Film,
  Zap,
  Star,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from '../types';

interface GlobalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView, payload?: any) => void;
  isRtl?: boolean;
}

interface CommandItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: any;
  category: 'curriculum' | 'media' | 'ai' | 'practice' | 'dashboard';
  view: AppView;
  badge?: string;
  payload?: any;
}

export const GlobalCommandPalette: React.FC<GlobalCommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  isRtl = true
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Command items repository
  const items: CommandItem[] = [
    // Curriculum
    {
      id: 'oxford-discover',
      titleAr: 'سلسلة أوكسفورد ديسكفر (Oxford Discover 1-6)',
      titleEn: 'Oxford Discover Series (Grades 1-6)',
      descriptionAr: 'الوحدات المنهجية الكاملة، المشاريع البحثية، والتمارين التفاعلية',
      descriptionEn: 'Complete units, research projects, and interactive exercises',
      icon: BookOpen,
      category: 'curriculum',
      view: 'oxford-discover',
      badge: 'المنهج الأساسي'
    },
    {
      id: 'curriculum-grammar',
      titleAr: 'منهج القواعد الشامل (A1 - C2)',
      titleEn: 'Comprehensive Grammar Mastery (A1-C2)',
      descriptionAr: 'الأزمنة، الشرطيات، المبني للمجهول، والتركيبات الأكاديمية المتقدمة',
      descriptionEn: 'Tenses, Conditionals, Passive Voice & Academic structures',
      icon: GraduationCap,
      category: 'curriculum',
      view: 'curriculum',
      badge: 'CEFR Standard'
    },
    {
      id: 'curriculum-reading',
      titleAr: 'منهج القراءة والاستيعاب (A1 - C2)',
      titleEn: 'Reading & Comprehension Track',
      descriptionAr: 'نصوص تفاعلية، تحليل الأفكار، والتفكير الناقد',
      descriptionEn: 'Interactive texts, idea analysis, and critical thinking',
      icon: FileText,
      category: 'curriculum',
      view: 'curriculum'
    },
    {
      id: 'curriculum-conversation',
      titleAr: 'منهج المحادثة والطلاقة الشفهية',
      titleEn: 'Conversational Fluency Track',
      descriptionAr: 'حوارات واقعية، مواقف يومية، والمفاوضات بالإنجليزية',
      descriptionEn: 'Real-life dialogues, daily scenarios, and negotiations',
      icon: Mic,
      category: 'curriculum',
      view: 'curriculum'
    },
    {
      id: 'curriculum-writing',
      titleAr: 'منهج الكتابة الأكاديمية والإنشاء',
      titleEn: 'Academic & Creative Writing Track',
      descriptionAr: 'صياغة المقالات، الرسائل الرسمية، والتحليل النقدي',
      descriptionEn: 'Essays, formal emails, and critical analysis',
      icon: FileText,
      category: 'curriculum',
      view: 'curriculum'
    },

    // Media & Video Studio
    {
      id: 'produced-videos',
      titleAr: 'الدروس المرئية المنتجة بالصوت والصورة',
      titleEn: 'Produced Audiovisual Lessons',
      descriptionAr: 'فيديوهات تفاعلية مجهزة بالرسوم، الشخصيات، والتمارين المدمجة',
      descriptionEn: 'Fully animated multimedia lessons with built-in exercises',
      icon: Film,
      category: 'media',
      view: 'video-library',
      badge: 'جديد ومحدث'
    },
    {
      id: 'video-studio',
      titleAr: 'استوديو إنتاج الفيديوهات التعليمية (AI Studio)',
      titleEn: 'AI Video Producer Studio',
      descriptionAr: 'توليد دروس مرئية سينمائية ناطقة بالذكاء الاصطناعي الفوري',
      descriptionEn: 'Generate animated educational video lessons with AI',
      icon: Sparkles,
      category: 'media',
      view: 'video-library',
      badge: 'AI Creator'
    },

    // AI & Smart Tools
    {
      id: 'ai-live-voice',
      titleAr: 'المحادثة الصوتية المباشرة (Live AI Voice)',
      titleEn: 'Live Voice AI Conversation',
      descriptionAr: 'تحدث صوتياً مع الذكاء الاصطناعي مع قياس مخارج الحروف والنبر',
      descriptionEn: 'Real-time spoken dialogue with accent coaching',
      icon: Mic,
      category: 'ai',
      view: 'ai-chat',
      badge: 'Gemini 3.7'
    },
    {
      id: 'ai-placement-test',
      titleAr: 'اختبار تحديد المستوى الذكي (CEFR Placement)',
      titleEn: 'AI Placement Diagnostic Test',
      descriptionAr: 'تشخيص دقيق لمستواك من A1 إلى C2 مع خطة دراسية مخصصة',
      descriptionEn: 'Precise diagnostic test from A1 to C2 with custom plan',
      icon: Zap,
      category: 'ai',
      view: 'placement-test',
      badge: 'شهادة فورية'
    },
    {
      id: 'adult-daily-dose',
      titleAr: 'الجرعة اليومية للبالغين والمحترفين',
      titleEn: 'Adult Daily Fluency Dose',
      descriptionAr: 'إنجليزي الأعمال، المقابلات، والتواصل القيادي المتقدم',
      descriptionEn: 'Business English, interviews, and executive communication',
      icon: Award,
      category: 'practice',
      view: 'adults-daily-dose'
    },

    // Practice & Kids
    {
      id: 'kids-zone',
      titleAr: 'منطقة الأطفال والمبتدئين الصغار',
      titleEn: 'Kids & Young Learners Zone',
      descriptionAr: 'قصص تفاعلية، أغاني أكسفورد، وقاموس مصور ممتع',
      descriptionEn: 'Interactive stories, Oxford songs, and visual dictionary',
      icon: Gamepad2,
      category: 'practice',
      view: 'kids-story-player'
    },
    {
      id: 'interactive-games',
      titleAr: 'معمل الألعاب اللغوية وغرفة الهروب',
      titleEn: 'Interactive Educational Games',
      descriptionAr: 'تحديات الوقت، ترتيب الجمل، وتحدي الكلمات المتقاطعة',
      descriptionEn: 'Time attack, sentence puzzles, and vocabulary challenges',
      icon: Gamepad2,
      category: 'practice',
      view: 'educational-games'
    },
    {
      id: 'flashcards-lab',
      titleAr: 'مختبر بطاقات الاستذكار الفلاشية (Flashcards)',
      titleEn: 'Smart Spaced Repetition Flashcards',
      descriptionAr: 'حفظ وتثبيت الكلمات مع النطق الصوتي الفوري',
      descriptionEn: 'Vocabulary retention with audio and spaced repetition',
      icon: Star,
      category: 'practice',
      view: 'flashcards-hub'
    },

    // Dashboard & Admin
    {
      id: 'dashboard-profile',
      titleAr: 'لوحة إنجازات الطالب وشهادات التقدير',
      titleEn: 'Student Achievements & Certificates',
      descriptionAr: 'سجل النقاط، الإحصائيات، ومتابعة التقدم اليومي',
      descriptionEn: 'Points ledger, stats, and daily progress tracking',
      icon: User,
      category: 'dashboard',
      view: 'progress'
    },
    {
      id: 'dashboard-leaderboard',
      titleAr: 'لوحة الشرف وتصنيف المتفوقين',
      titleEn: 'Honor Roll & Leaderboard',
      descriptionAr: 'منافسة أبطال الأكاديمية على مستوى المجموعات',
      descriptionEn: 'Academy champion leaderboards and tier rankings',
      icon: Award,
      category: 'dashboard',
      view: 'leaderboard'
    }
  ];

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.titleAr.toLowerCase().includes(q) ||
        item.titleEn.toLowerCase().includes(q) ||
        item.descriptionAr.toLowerCase().includes(q) ||
        item.descriptionEn.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCategory, items]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md"
        dir={isRtl ? 'rtl' : 'ltr'}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* SEARCH INPUT BAR */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
            <Search className="text-[#58cc02] shrink-0" size={22} />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isRtl ? 'ابحث عن أي درس، وحدة، استوديو فيديو، اختبار، أو لعبة...' : 'Search lessons, video studio, tests, games... (Ctrl+K)'}
              className="flex-1 bg-transparent border-none text-sm md:text-base font-bold text-slate-800 outline-none placeholder:text-slate-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X size={16} />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-black text-slate-400 bg-slate-200/80 px-2 py-1 rounded-lg">
              <span>ESC</span>
            </div>
          </div>

          {/* CATEGORY FILTER CHIPS */}
          <div className="flex items-center gap-1.5 p-2 px-4 border-b border-slate-100 overflow-x-auto text-xs font-black shrink-0 bg-white">
            {[
              { id: 'all', labelAr: 'الكل ✨', labelEn: 'All ✨' },
              { id: 'curriculum', labelAr: 'المناهج الدراسية 📚', labelEn: 'Curriculum 📚' },
              { id: 'media', labelAr: 'استوديو الفيديو 🎬', labelEn: 'Video Studio 🎬' },
              { id: 'ai', labelAr: 'الذكاء الاصطناعي 🤖', labelEn: 'AI Tools 🤖' },
              { id: 'practice', labelAr: 'أنشطة وألعاب 🎮', labelEn: 'Activities 🎮' },
              { id: 'dashboard', labelAr: 'لوحة المتابعة 📊', labelEn: 'Dashboard 📊' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#58cc02] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRtl ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* RESULTS LIST */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.view, item.payload);
                      onClose();
                    }}
                    className="w-full p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-3 text-right group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#58cc02]/10 group-hover:text-[#58cc02] text-slate-600 flex items-center justify-center transition-colors shrink-0">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-xs sm:text-sm text-slate-800 group-hover:text-[#58cc02] transition-colors">
                            {isRtl ? item.titleAr : item.titleEn}
                          </h4>
                          {item.badge && (
                            <span className="text-[9px] font-black px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5 line-clamp-1">
                          {isRtl ? item.descriptionAr : item.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <span className="text-slate-300 group-hover:text-[#58cc02] text-xs font-black opacity-0 group-hover:opacity-100 transition-all">
                      {isRtl ? 'انتقال ↵' : 'Go ↵'}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Search size={32} className="mx-auto opacity-30" />
                <p className="text-xs font-bold">
                  {isRtl ? 'لم نتمكن من العثور على نتائج مطابقة لبحثك' : 'No matching items found'}
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 font-bold flex items-center justify-between px-4">
            <span>{isRtl ? 'أكاديمية باسم آل خليل الذكية - التحديث الشامل' : 'Basim Alkhalil Digital Academy'}</span>
            <span>{isRtl ? 'اضغط ↵ للانتقال المباشر' : 'Press ↵ to jump'}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
