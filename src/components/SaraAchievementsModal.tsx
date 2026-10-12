import React, { useState } from 'react';
import {
  X,
  Trophy,
  Award,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  Lock,
  Star,
  Target,
  Compass,
  Gift,
  ChevronRight,
  ShieldCheck,
  Brain,
  Mic,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TutorMemoryDoc } from '../types';

interface SaraAchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorMemory: TutorMemoryDoc;
  studentName: string;
  studentLevel: string;
  studentStreak: number;
  totalXP: number;
  isRtl: boolean;
  onClaimQuestXP?: (xp: number, questId: string) => void;
}

interface BadgeItem {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  descAr: string;
  descEn: string;
  category: 'speaking' | 'streak' | 'accuracy' | 'mastery' | 'elite';
  xpReward: number;
  isUnlocked: boolean;
  progressText?: string;
}

interface QuestItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  rewardXP: number;
  progress: number;
  target: number;
  isCompleted: boolean;
  isClaimed: boolean;
  icon: string;
}

export const SaraAchievementsModal: React.FC<SaraAchievementsModalProps> = ({
  isOpen,
  onClose,
  tutorMemory,
  studentName,
  studentLevel,
  studentStreak,
  totalXP,
  isRtl,
  onClaimQuestXP
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'quests' | 'leaderboard'>('badges');
  const [claimedQuestIds, setClaimedQuestIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const wordsCount = tutorMemory.wordsLearned?.length || 0;
  const strengthsCount = (tutorMemory.strengths?.length || 0) + (tutorMemory.masteredTopics?.length || 0);

  // Dynamic Badges List
  const BADGES: BadgeItem[] = [
    {
      id: 'b_voice_star',
      titleAr: 'نجم النطق الصوتي',
      titleEn: 'Voice Master',
      icon: '🎙️',
      descAr: 'مارس تدريب النطق بالمايك وحقق دقة لفظية عالية.',
      descEn: 'Practiced voice coaching with high phonetic accuracy.',
      category: 'speaking',
      xpReward: 50,
      isUnlocked: true,
      progressText: 'مكتمل ✅'
    },
    {
      id: 'b_streak_hero',
      titleAr: 'بطل الاستمرارية اليومية',
      titleEn: 'Streak Champion',
      icon: '🔥',
      descAr: 'واصل التعلم مع سارة دون انقطاع لأكثر من يومين متتاليين.',
      descEn: 'Kept the daily learning streak alive for multiple days.',
      category: 'streak',
      xpReward: 80,
      isUnlocked: studentStreak >= 2,
      progressText: `${studentStreak}/2 يوم`
    },
    {
      id: 'b_memory_maestro',
      titleAr: 'ذاكرة الفولاذ',
      titleEn: 'Memory Maestro',
      icon: '🧠',
      descAr: 'اكتسب وثبت أكثر من 8 كلمات ومفاهيم في ذاكرة سارة الذكية.',
      descEn: 'Locked 8+ words or concepts into Sara’s long-term memory.',
      category: 'mastery',
      xpReward: 60,
      isUnlocked: wordsCount >= 8,
      progressText: `${wordsCount}/8 كلمة`
    },
    {
      id: 'b_speed_demon',
      titleAr: 'سيد تحديات السرعة',
      titleEn: 'Speed Demon',
      icon: '⚡',
      descAr: 'أكمل تحدي تركيب الجمل السريع في وقت قياسي قبل انتهاء العداد.',
      descEn: 'Completed speed sentence builder before the countdown expired.',
      category: 'accuracy',
      xpReward: 70,
      isUnlocked: true,
      progressText: 'مكتمل ✅'
    },
    {
      id: 'b_strength_collector',
      titleAr: 'جامع نقاط القوة',
      titleEn: 'Strength Collector',
      icon: '🌟',
      descAr: 'وثق 4 مهارات متقنة ومثبتة في سجل إتقان الطالب.',
      descEn: 'Accumulated 4+ verified mastered skills in cognitive profile.',
      category: 'mastery',
      xpReward: 90,
      isUnlocked: strengthsCount >= 4,
      progressText: `${strengthsCount}/4 مهارات`
    },
    {
      id: 'b_grammar_guru',
      titleAr: 'خبير القواعد الذهبية',
      titleEn: 'Grammar Guru',
      icon: '📐',
      descAr: 'حل أسئلة السبورة الذكية وتحقق المفاهيم بنجاح كامل.',
      descEn: 'Answered whiteboard CCQ and grammar drills flawlessly.',
      category: 'accuracy',
      xpReward: 65,
      isUnlocked: true,
      progressText: 'مكتمل ✅'
    },
    {
      id: 'b_curriculum_explorer',
      titleAr: 'المستكشف الأكاديمي',
      titleEn: 'Curriculum Explorer',
      icon: '📚',
      descAr: 'درس وتعمق في أحد مناهج سارة التخصصية (قواعد، محادثة، قراءة).',
      descEn: 'Studied an exclusive specialized curriculum module with Sara.',
      category: 'elite',
      xpReward: 100,
      isUnlocked: true,
      progressText: 'مكتمل ✅'
    },
    {
      id: 'b_academy_elite',
      titleAr: 'نخبة الأكاديمية الدولية',
      titleEn: 'Academy Elite',
      icon: '👑',
      descAr: 'اجتز اختبار الكفاءة الدولي وحقق مرتبة الشرف الأكاديمية.',
      descEn: 'Passed the International CEFR mock assessment with honors.',
      category: 'elite',
      xpReward: 150,
      isUnlocked: totalXP >= 200,
      progressText: `${totalXP}/200 XP`
    }
  ];

  // Daily Quests
  const INITIAL_QUESTS: QuestItem[] = [
    {
      id: 'q_1',
      titleAr: 'محادثة صوتية مباشرة مع سارة 🎙️',
      titleEn: 'Voice Chat with Sara 🎙️',
      descAr: 'تحدث مع سارة بالمايك لمدة 3 جولات في أي موضوع تختاره.',
      descEn: 'Speak with Sara via mic for 3 dialogue turns.',
      rewardXP: 30,
      progress: 3,
      target: 3,
      isCompleted: true,
      isClaimed: claimedQuestIds.includes('q_1'),
      icon: '🎙️'
    },
    {
      id: 'q_2',
      titleAr: 'حل تحدي السرعة اللغوي ⚡',
      titleEn: 'Complete a Speed Drill ⚡',
      descAr: 'أكمل جولة واحدة من تحديات تركيب الجمل أو صيد الأخطاء.',
      descEn: 'Finish 1 round of sentence builder or bug hunter.',
      rewardXP: 25,
      progress: 1,
      target: 1,
      isCompleted: true,
      isClaimed: claimedQuestIds.includes('q_2'),
      icon: '⚡'
    },
    {
      id: 'q_3',
      titleAr: 'اكتساب 3 مفردات جديدة اليوم 📚',
      titleEn: 'Learn 3 New Words Today 📚',
      descAr: 'ناقش كلمات جديدة مع سارة لتضاف تلقائياً لبنك الذاكرة.',
      descEn: 'Practice new vocabulary to save to your memory bank.',
      rewardXP: 35,
      progress: Math.min(3, wordsCount),
      target: 3,
      isCompleted: wordsCount >= 3,
      isClaimed: claimedQuestIds.includes('q_3'),
      icon: '📚'
    },
    {
      id: 'q_4',
      titleAr: 'مراجعة وتحديث أسلوب التعلم 🧠',
      titleEn: 'Review Learning Profile 🧠',
      descAr: 'افتح ملف الذاكرة المعرفية وتأكد من ملاءمة أسلوب الشرح لك.',
      descEn: 'Open smart memory hub to verify your preferred teaching style.',
      rewardXP: 20,
      progress: 1,
      target: 1,
      isCompleted: true,
      isClaimed: claimedQuestIds.includes('q_4'),
      icon: '🧠'
    }
  ];

  const handleClaimQuest = (quest: QuestItem) => {
    if (!quest.isCompleted || quest.isClaimed) return;
    setClaimedQuestIds(prev => [...prev, quest.id]);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (onClaimQuestXP) {
      onClaimQuestXP(quest.rewardXP, quest.id);
    }
  };

  const unlockedBadgesCount = BADGES.filter(b => b.isUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#1B1200] via-[#382600] to-[#1B1200] px-5 py-4 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg border border-amber-300">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-amber-200">
                  {isRtl ? 'خزانة الإنجازات والمهام اليومية 🏆' : 'Achievements & Quest Vault 🏆'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black border border-amber-400/30">
                  {unlockedBadgesCount}/{BADGES.length} {isRtl ? 'أوسمة' : 'Badges'}
                </span>
              </div>
              <p className="text-xs text-amber-200/70">
                {isRtl
                  ? 'أوسمة الإتقان • مهام يومية متجددة • نقاط الخبرة والمكافآت'
                  : 'Mastery Badges • Daily Quests • Earn XP & Unlock Rewards'}
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
        <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-950/70 border-b border-white/10 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-2 px-3 rounded-2xl font-black transition-all flex items-center justify-center gap-2 border cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Trophy size={14} />
            <span>{isRtl ? `أوسمة الإنجاز والبطولات (${unlockedBadgesCount}/${BADGES.length})` : `Badges & Trophies (${unlockedBadgesCount}/${BADGES.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('quests')}
            className={`py-2 px-3 rounded-2xl font-black transition-all flex items-center justify-center gap-2 border cursor-pointer ${
              activeTab === 'quests'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
          >
            <Target size={14} />
            <span>{isRtl ? 'المهام اليومية مع سارة 🎯' : 'Daily Quests with Sara 🎯'}</span>
          </button>
        </div>

        {/* Live XP Banner */}
        <div className="px-5 py-2.5 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs font-black">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span>{isRtl ? `رصيد نقاط الخبرة: ${totalXP} XP` : `Total XP: ${totalXP} XP`}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-orange-400">
              <Flame size={13} />
              <span>{studentStreak} {isRtl ? 'أيام متواصلة' : 'days streak'}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px]">
              CEFR {studentLevel}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: BADGES */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-200">
                <Trophy size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {isRtl ? 'أوسمة الإتقان والشرف الأكاديمي 🌟' : 'Mastery Badges & Honors 🌟'}
                  </p>
                  <p className="text-amber-200/80 leading-relaxed">
                    {isRtl
                      ? 'تُمنح هذه الأوسمة تكريماً لجهودك وتفوقك في المحادثة وحل التمارين وتثبيت الكلمات مع سارة.'
                      : 'Earn badges for vocal fluency, memory retention, grammar precision, and daily dedication.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BADGES.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      badge.isUnlocked
                        ? 'bg-slate-800/90 border-amber-400/40 shadow-sm hover:border-amber-400'
                        : 'bg-slate-950/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md ${
                        badge.isUnlocked
                          ? 'bg-amber-400/20 border border-amber-400/40'
                          : 'bg-white/5 border border-white/10 grayscale'
                      }`}>
                        {badge.isUnlocked ? badge.icon : '🔒'}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {isRtl ? badge.titleAr : badge.titleEn}
                          </h4>
                          {badge.isUnlocked && (
                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {isRtl ? badge.descAr : badge.descEn}
                        </p>
                        <span className="text-[10px] text-amber-300 font-bold block pt-0.5">
                          +{badge.xpReward} XP {isRtl ? 'مكافأة' : 'reward'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        badge.isUnlocked
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {badge.progressText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DAILY QUESTS */}
          {activeTab === 'quests' && (
            <div className="space-y-4">
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-indigo-200">
                <Target size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {isRtl ? 'مهام اليوم المتجددة مع سارة 🎯' : "Today's Active Quests 🎯"}
                  </p>
                  <p className="text-indigo-200/80 leading-relaxed">
                    {isRtl
                      ? 'أكمل المهام اليومية مع سارة لجمع نقاط الخبرة الإضافية وتطوير مستواك بشكل متسارع!'
                      : 'Complete daily tasks with Sara to claim bonus XP and accelerate your English journey!'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {INITIAL_QUESTS.map(quest => (
                  <div
                    key={quest.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-between gap-3 hover:border-amber-400/40 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-xl shrink-0">
                        {quest.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {isRtl ? quest.titleAr : quest.titleEn}
                          </h4>
                          <span className="text-[10px] font-black text-emerald-400">
                            +{quest.rewardXP} XP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {isRtl ? quest.descAr : quest.descEn}
                        </p>
                        {/* Progress meter */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="w-28 h-2 bg-slate-950 rounded-full overflow-hidden border border-white/10">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                              style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {quest.progress}/{quest.target}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {quest.isClaimed ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black flex items-center gap-1 border border-emerald-400/30">
                          <CheckCircle2 size={13} />
                          <span>{isRtl ? 'تم الاستلام' : 'Claimed'}</span>
                        </span>
                      ) : quest.isCompleted ? (
                        <button
                          type="button"
                          onClick={() => handleClaimQuest(quest)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-105 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Gift size={13} />
                          <span>{isRtl ? 'استلام المكافأة 🎁' : 'Claim 🎁'}</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 text-xs font-bold border border-white/5">
                          {isRtl ? 'قيد الإنجاز' : 'In Progress'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Sparkles size={13} />
            <span>{isRtl ? `الطالب: ${studentName || 'المتعلم'}` : `Student: ${studentName || 'Learner'}`}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
          >
            {isRtl ? 'إغلاق ✕' : 'Close ✕'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
