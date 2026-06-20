import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { 
  Trophy, 
  Award, 
  Flame, 
  Moon, 
  Zap, 
  Compass, 
  Lock, 
  Sparkles, 
  CheckCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { Language } from '../lib/translations';

interface BadgesProps {
  lang: Language;
  userId: string;
  points?: number;
}

interface BadgeDefinition {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: React.ElementType;
  colorClass: string;
  bgGlowClass: string;
  textColorClass: string;
  checkUnlocked: (results: any[], xp: number) => {
    unlocked: boolean;
    progress: number;
    target: number;
    dateUnlocked?: Date;
  };
}

export const Badges = ({ lang, userId, points = 0 }: BadgesProps) => {
  const isRtl = lang === 'ar';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [confetti, setConfetti] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'lessonResults'),
          where('userId', '==', userId)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort in memory securely
        data.sort((a: any, b: any) => {
          const tA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : 0;
          const tB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : 0;
          return tB - tA;
        });

        setResults(data);
      } catch (err) {
        console.warn("Error fetching lesson results for achievements:", String(err));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchResults();
    }
  }, [userId]);

  // Define Badge list mapping performance data inside
  const badgeDefinitions: BadgeDefinition[] = [
    {
      id: 'early_bird',
      titleEn: 'Early Bird',
      titleAr: 'طائر الصباح المبكر',
      descEn: 'Complete at least one lesson or activity early in the morning (between 4:00 AM and 9:59 AM).',
      descAr: 'أكمل درساً أو نشاطاً تعليمياً واحداً على الأقل في الصباح الباكر (بين الساعة 4:00 والـ 9:59 صباحاً).',
      icon: Compass, // Custom icon representation
      colorClass: 'bg-amber-100 text-amber-600 border-amber-300',
      bgGlowClass: 'from-amber-400 to-amber-600 shadow-amber-500/20',
      textColorClass: 'text-amber-800',
      checkUnlocked: (items: any[]) => {
        const matched = items.find(item => {
          if (!item.timestamp?.toDate) return false;
          const hr = item.timestamp.toDate().getHours();
          return hr >= 4 && hr < 10;
        });
        return {
          unlocked: !!matched,
          progress: matched ? 1 : 0,
          target: 1,
          dateUnlocked: matched?.timestamp?.toDate ? matched.timestamp.toDate() : undefined
        };
      }
    },
    {
      id: 'perfect_scorer',
      titleEn: 'Perfect Scorer',
      titleAr: 'العلامة الكاملة',
      descEn: 'Achieve a 100% score on any quiz, assessment, or assignment.',
      descAr: 'احصل على درجة كاملة بنسبة 100% في أي اختبار أو تحدي أو واجب.',
      icon: Award,
      colorClass: 'bg-emerald-100 text-emerald-600 border-emerald-300',
      bgGlowClass: 'from-emerald-400 to-emerald-600 shadow-emerald-500/20',
      textColorClass: 'text-emerald-800',
      checkUnlocked: (items: any[]) => {
        const matched = items.find(item => Number(item.score) >= 100);
        return {
          unlocked: !!matched,
          progress: matched ? 1 : 0,
          target: 1,
          dateUnlocked: matched?.timestamp?.toDate ? matched.timestamp.toDate() : undefined
        };
      }
    },
    {
      id: 'consistent_learner',
      titleEn: 'Consistent Scholar',
      titleAr: 'المتعلم المثابر',
      descEn: 'Complete 5 or more educational lessons or activities in the academy.',
      descAr: 'أكمل 5 دروس أو أنشطة تعليمية متنوعة في الأكاديمية.',
      icon: Flame,
      colorClass: 'bg-rose-100 text-rose-600 border-rose-300',
      bgGlowClass: 'from-rose-400 to-rose-600 shadow-rose-500/20',
      textColorClass: 'text-rose-800',
      checkUnlocked: (items: any[]) => {
        const count = items.length;
        // Date of unlocking is the 5th lesson completion date
        const fifthItem = count >= 5 ? items[items.length - 5] : null; 
        return {
          unlocked: count >= 5,
          progress: count,
          target: 5,
          dateUnlocked: fifthItem?.timestamp?.toDate ? fifthItem.timestamp.toDate() : undefined
        };
      }
    },
    {
      id: 'night_owl',
      titleEn: 'Night Owl Storyteller',
      titleAr: 'نسر الليل المبدع',
      descEn: 'Complete an English lesson or story read late at night (between 9:00 PM and 3:59 AM).',
      descAr: 'أكمل درساً أو قصة باللغة الإنجليزية في أوقات متأخرة من الليل (بين الساعة 9:00 مساءً والـ 3:59 فجراً).',
      icon: Moon,
      colorClass: 'bg-indigo-100 text-indigo-600 border-indigo-300',
      bgGlowClass: 'from-indigo-400 to-indigo-600 shadow-indigo-500/20',
      textColorClass: 'text-indigo-800',
      checkUnlocked: (items: any[]) => {
        const matched = items.find(item => {
          if (!item.timestamp?.toDate) return false;
          const hr = item.timestamp.toDate().getHours();
          return hr >= 21 || hr < 4;
        });
        return {
          unlocked: !!matched,
          progress: matched ? 1 : 0,
          target: 1,
          dateUnlocked: matched?.timestamp?.toDate ? matched.timestamp.toDate() : undefined
        };
      }
    },
    {
      id: 'xp_champion',
      titleEn: 'XP Champion',
      titleAr: 'بطل النقاط المتميز',
      descEn: 'Accumulate a milestone of 500 XP or larger in your student account.',
      descAr: 'احصد مسار تجميع متميز يبلغ 500 نقطة خبرة (XP) أو أكثر في حسابك.',
      icon: Zap,
      colorClass: 'bg-cyan-100 text-cyan-600 border-cyan-300',
      bgGlowClass: 'from-cyan-400 to-cyan-600 shadow-cyan-400/20',
      textColorClass: 'text-cyan-800',
      checkUnlocked: (items: any[], xp: number) => {
        return {
          unlocked: xp >= 500,
          progress: xp,
          target: 500,
          dateUnlocked: undefined // Points are real-time, no specific timestamp easily mapped
        };
      }
    },
    {
      id: 'academic_polymath',
      titleEn: 'Academy Pioneer',
      titleAr: 'رائد مسارات التعلم',
      descEn: 'Engage with lessons in 3 different academic types (e.g. stories, games, tests, quizzes).',
      descAr: 'خض تجارب تعلم في 3 تخصصات أو أنواع محتوى مختلفة (مثل القصص، الألعاب، الاختبارات).',
      icon: Trophy,
      colorClass: 'bg-violet-100 text-violet-600 border-violet-300',
      bgGlowClass: 'from-violet-400 to-violet-600 shadow-violet-500/20',
      textColorClass: 'text-violet-800',
      checkUnlocked: (items: any[]) => {
        const uniqueTypes = new Set(items.map(item => item.type || 'lesson').filter(Boolean));
        return {
          unlocked: uniqueTypes.size >= 3,
          progress: uniqueTypes.size,
          target: 3,
          dateUnlocked: undefined
        };
      }
    }
  ];

  const processedBadges = badgeDefinitions.map(badge => {
    const check = badge.checkUnlocked(results, points);
    return {
      ...badge,
      ...check
    };
  });

  const unlockedCount = processedBadges.filter(b => b.unlocked).length;

  const filteredBadges = processedBadges.filter(badge => {
    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  const handleBadgeClick = (badge: any) => {
    setSelectedBadge(badge);
    if (badge.unlocked) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-10 h-10 border-4 border-[#C49E3A] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-400">{isRtl ? 'جاري تحليل الأرقام والـإنجازات...' : 'Evaluating your milestones...'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Trophy Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0d3b66] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-lg shadow-blue-900/10">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform translate-x-12 -translate-y-6">
          <Trophy size={160} />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-yellow-400/20 text-yellow-300 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-yellow-400/30">
              <Sparkles size={12} />
              {isRtl ? 'الأوسمة والـإنجازات الرقمية' : 'Digital Badges & Milestones'}
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
              {isRtl ? 'خزانة تفوقك الدراسي' : 'Your Achievements Locker'}
            </h3>
            <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-lg">
              {isRtl 
                ? 'استمر في استكشاف المناهج وحل الاختبارات بامتياز لتفتح أوسمة برونزية وذهبية تؤكد ريادتك وموهبتك!'
                : 'Complete lessons, score perfectly, or study dynamically to unlock magnificent custom badges to showcase your scholarship.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-5 self-start md:self-center shrink-0">
            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-300 to-amber-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-md transform rotate-3">
              <Trophy size={28} />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-[#C49E3A]">
                {isRtl ? 'الأوسمة المكتشفة' : 'Badges Unlocked'}
              </span>
              <span className="text-2xl font-black">
                {unlockedCount} <span className="text-sm font-medium text-slate-300">/ {processedBadges.length}</span>
              </span>
              <div className="w-24 bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(unlockedCount / processedBadges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              filter === 'all' 
                ? 'bg-[#002147] text-white' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {isRtl ? 'الكل' : 'All Badges'}
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              filter === 'unlocked' 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <CheckCircle size={13} />
            {isRtl ? 'المكتشفة' : 'Unlocked'}
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              filter === 'locked' 
                ? 'bg-slate-600 text-white' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Lock size={12} />
            {isRtl ? 'قيد الإنجاز' : 'In Progress'}
          </button>
        </div>

        <div className="text-[11px] font-bold text-slate-400">
          {isRtl ? `تم العثور على ${filteredBadges.length} وسام` : `Found ${filteredBadges.length} badges`}
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className={`group bg-white rounded-3xl p-6 border-2 border-b-6 border-slate-200 hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between select-none ${
                badge.unlocked ? 'hover:scale-[1.02] duration-200' : 'opacity-85'
              }`}
            >
              {/* Unlock glow state overlay */}
              {badge.unlocked && (
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-yellow-300/10 to-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-300" />
              )}

              <div>
                {/* Visual badge top block */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 ${
                    badge.unlocked 
                      ? `${badge.colorClass} group-hover:scale-110` 
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}>
                    {badge.unlocked ? <Icon size={22} className="stroke-[2.5]" /> : <Lock size={18} />}
                  </div>

                  {badge.unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <CheckCircle size={10} className="stroke-[3]" />
                      {isRtl ? 'تم الكشف' : 'UNLOCKED'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                      <Lock size={10} />
                      {isRtl ? 'مغلق' : 'LOCKED'}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-black text-[#002147] mb-1.5 group-hover:text-blue-900 transition-colors">
                  {isRtl ? badge.titleAr : badge.titleEn}
                </h4>
                
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                  {isRtl ? badge.descAr : badge.descEn}
                </p>
              </div>

              {/* Progress info at bottom */}
              <div className="border-t border-slate-100 pt-3 mt-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                  <span>{isRtl ? 'مستوى التقدم' : 'Milestone Progress'}</span>
                  <span>
                    {badge.unlocked ? `${badge.target}/${badge.target}` : `${badge.progress}/${badge.target}`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.unlocked 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(100, (badge.progress / badge.target) * 100)}%` }}
                  />
                </div>
                
                {badge.unlocked && badge.dateUnlocked && (
                  <div className="text-[10px] text-slate-400 font-medium mt-2">
                    {isRtl ? 'تم التفعيل بتاريخ:' : 'Unlocked on:'} {badge.dateUnlocked.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating success popup details modal with Flying SVGs & Confetti Sparkles */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative border-2 border-[#002147]/5 outline-none font-sans"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Sparkle background elements for Unlocked achievements */}
              {selectedBadge.unlocked && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [-20, 200],
                        x: [0, (i % 2 === 0 ? 50 : -50)],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 0.5
                      }}
                      className="absolute text-yellow-500"
                      style={{
                        top: `${Math.random() * 40}%`,
                        left: `${15 + i * 15}%`
                      }}
                    >
                      <Sparkles size={14 + i} />
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors"
                id="close-badge-modal-btn"
              >
                <X size={18} />
              </button>

              <div className="text-center pt-4">
                {/* Expanded Badge Icon Frame */}
                <div className="inline-flex relative mb-6">
                  {selectedBadge.unlocked && (
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse scale-125" />
                  )}
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-lg relative z-10 ${
                    selectedBadge.unlocked 
                      ? `bg-gradient-to-tr ${selectedBadge.bgGlowClass} text-white` 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {selectedBadge.unlocked ? (
                      <selectedBadge.icon size={44} className="stroke-[2.5]" />
                    ) : (
                      <Lock size={36} />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#002147] mb-2 uppercase tracking-wide">
                  {isRtl ? selectedBadge.titleAr : selectedBadge.titleEn}
                </h3>

                {selectedBadge.unlocked ? (
                  <div className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mb-4">
                    <CheckCircle size={12} className="stroke-[3]" />
                    {isRtl ? 'تم تحقيق الإنجاز بنجاح!' : 'ACHIEVEMENT UNLOCKED!'}
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 text-xs font-black text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 mb-4">
                    <Lock size={12} />
                    {isRtl ? 'تحدي دراسي مستمر' : 'CHALLENGE IN PROGRESS'}
                  </div>
                )}

                <p className="text-sm text-slate-500 font-medium px-4 leading-relaxed mb-6">
                  {isRtl ? selectedBadge.descAr : selectedBadge.descEn}
                </p>

                {/* Statistics panel in popup */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left mb-6" dir={isRtl ? 'rtl' : 'ltr'}>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-bold mb-1.5">
                    <span>{isRtl ? 'مسار تتبع المتطلبات:' : 'Requirements Path:'}</span>
                    <span>{selectedBadge.unlocked ? `${selectedBadge.target}/${selectedBadge.target}` : `${selectedBadge.progress}/${selectedBadge.target}`}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        selectedBadge.unlocked 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(100, (selectedBadge.progress / selectedBadge.target) * 100)}%` }}
                    />
                  </div>
                  {selectedBadge.unlocked && selectedBadge.dateUnlocked && (
                    <div className="text-[10px] text-slate-400 mt-2.5 font-bold text-center">
                      🌟 {isRtl ? 'تاريخ الكشف بنجاح:' : 'Successfully unlocked on:'} {selectedBadge.dateUnlocked.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="w-full py-4 px-6 bg-[#002147] hover:bg-[#001530] text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-colors active:scale-95 duration-150"
                  >
                    {isRtl ? 'استمر في الدراسة 🎉' : 'Keep Learning 🎉'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
