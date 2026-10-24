import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Zap, 
  Brain, 
  FileText, 
  GitBranch, 
  Gamepad2, 
  BookOpen, 
  Music, 
  Film, 
  Users, 
  Key, 
  Palette, 
  Sparkles 
} from 'lucide-react';
import { UserProfile, AppView } from '../types';
import { SectionShell, GoldCard, LessonTile, PrimaryButton, ProgressPill } from './ui/academy';

interface InteractiveLearningHubProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onNavigate: (view: AppView) => void;
  onBack: () => void;
}

export const InteractiveLearningHub: React.FC<InteractiveLearningHubProps> = ({
  lang,
  userProfile,
  onNavigate,
  onBack
}) => {
  const isRtl = lang === 'ar';

  const activities = [
    {
      id: 'real-time-voice-call' as const,
      title: '🎙️ المكالمة الصوتية المباشرة (Gemini 3.8 Flash)',
      titleEn: 'Ultra-Fast Real-Time Voice AI Call 🎙️',
      description: 'مكالمات صوتية فائقة السرعة مع متحدثين أصليين بالذكاء الاصطناعي مع رسم بياني لحظي لنبرة الصوت ومخارج الحروف!',
      descriptionEn: 'Ultra-fast voice call with native AI tutors featuring real-time acoustic waveform and intonation coaching!',
      icon: Zap,
      color: 'bg-emerald-600',
      textColor: 'text-emerald-800',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-200',
      pillColor: 'bg-emerald-100 text-emerald-800',
      badge: isRtl ? 'صوت مباشر Gemini 3.8' : 'Gemini 3.8 Flash Live',
      xpReward: '+150 XP',
      level: 'All Levels 🔥'
    },
    {
      id: 'adaptive-learning-path' as const,
      title: '🧠 مسار التعلم التكيفي وتشخيص الثغرات الذكي',
      titleEn: 'Adaptive Learning Path & Knowledge Gap Diagnostics 🧠',
      description: 'يقوم الذكاء الاصطناعي بتحليل إجاباتك ورصد نقاط الضعف الدقيقة وتوليد كويزات وتمارين علاجية مخصصة فوراً!',
      descriptionEn: 'AI pinpoints exact linguistic weaknesses, offering custom targeted drills and dynamic quizzes to master every skill!',
      icon: Brain,
      color: 'bg-[#002147]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/80',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'ذكاء تكيفي تنبؤي' : 'Predictive Gap Tree',
      xpReward: '+200 XP',
      level: 'All CEFR Tiers 🎯'
    },
    {
      id: 'dynamic-worksheets' as const,
      title: '📄 صانع أوراق العمل والاختبارات التوليدية',
      titleEn: 'Dynamic AI Worksheet & Exam Generator 📄',
      description: 'قم بتوليد أوراق عمل واختبارات تفاعلية مخصصة فوراً حسب اهتماماتك ومستواك، مع خيار الحل المباشر أو الطباعة الأكاديمية بنموذج الإجابة!',
      descriptionEn: 'Generate tailored academic worksheets with instant online grading, printable PDF mode, and comprehensive answer keys!',
      icon: FileText,
      color: 'bg-[#002147]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/80',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'أوراق عمل تفاعلية وطباعة' : 'Gemini 3.8 Worksheets',
      xpReward: '+120 XP',
      level: 'A1 - C2 📄'
    },
    {
      id: 'branching-stories' as const,
      title: '🌟 القصص التفاعلية متعددة النهايات (Branching Stories)',
      titleEn: 'Interactive Branching Stories & Decisions 🌟',
      description: 'اختر مسار مغامراتك باللغة الإنجليزية في لندن والفضاء وأكسفورد! كل قرار تتخذه يصنع فصلاً جديداً ونهايات مشوقة غير متوقعة.',
      descriptionEn: 'Make critical choices in authentic English adventures. Every decision dynamically crafts new plot branches with audio narration!',
      icon: GitBranch,
      color: 'bg-[#002147]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/80',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'مغامرات متفرعة حية' : 'Branching Choices',
      xpReward: '+150 XP',
      level: 'All Tiers 🧭'
    },
    {
      id: 'educational-games' as const,
      title: '🎮 واحة الألعاب التعليمية المشوقة',
      titleEn: 'Immersive Educational Playzone 🎮',
      description: 'انغمس في عالم المغامرات والألغاز الإنجليزية التفاعلية، وميز العادات الحسنة والذوقيات الرفيعة بمنتهى المتعة اللعبية!',
      descriptionEn: 'Dive into interactive English word puzzles, detect and perfect noble habits and exquisite social etiquette with active gamified fun!',
      icon: Gamepad2,
      color: 'bg-rose-500',
      textColor: 'text-rose-800',
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-rose-100',
      pillColor: 'bg-rose-100 text-rose-800',
      badge: isRtl ? 'ألعاب، أدب، عادات وألغاز' : 'Etiquette, Riddles & Habits',
      xpReward: '+50 XP',
      level: 'All Ages ⭐'
    },
    {
      id: 'flashcards-hub' as const,
      title: '📖 مستودع البطاقات التعليمية الذكية',
      titleEn: 'Smart Vocabulary Flashcards 📖',
      description: 'تعلم كلمات أكسفورد وقواعد الإنجليزية بالتكرار المتباعد والنطق المسموع والتقييم الفطن للذاكرة!',
      descriptionEn: 'Master premium academic Oxford vocabulary and rules via interactive spaced-repetition card flipping and audio!',
      icon: BookOpen,
      color: 'bg-[#002147]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/70',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'حفظ ذكي وتكرار متباعد' : 'Spaced Repetition Mastery',
      xpReward: '+30 XP',
      level: 'All Levels'
    },
    {
      id: 'adults-daily-dose' as const,
      title: 'الجرعة اليومية للبالغين ⚡',
      titleEn: 'Adults Daily Dose ⚡',
      description: 'جرعة لغوية يومية مكثفة وسريعة مصممة لرفع مهارات الاستماع وتركيب الجمل فوراً للشباب والكبار.',
      descriptionEn: 'Fast-paced immersive grammar, vocabulary boosts and sentence synthesis optimized for adult learners.',
      icon: Zap,
      color: 'bg-amber-500',
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      pillColor: 'bg-amber-100 text-amber-800',
      badge: isRtl ? 'ثقافة وجرعة سريعة' : 'Quick Immersive Dose',
      xpReward: '+15 XP',
      level: 'Adult Track'
    },
    {
      id: 'english-songs' as const,
      title: 'الإنجليزية عبر الأغاني 🎵',
      titleEn: 'English with Songs 🎵',
      description: 'استمع للأغاني الكلاسيكية مع الكلمات التفاعلية وملء الفراغات للفوز بجوائز رائعة!',
      descriptionEn: 'Sing along to classic English tracks with dynamic real-time lyrics and vocabulary quiz questions!',
      icon: Music,
      color: 'bg-[#C49E3A]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/10',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'مهارات الاستماع والغناء' : 'Listening & Pronunciation',
      xpReward: '+15 XP',
      level: 'A1 - Active'
    },
    {
      id: 'kids-story-player' as const,
      title: 'القصص التعليمية المسموعة 📚',
      titleEn: 'Interactive Audio Stories 📚',
      description: 'مكتبة قصصية تفاعلية مسموعة للأطفال لتنمية المفردات اللغوية بأسلوب شيق وبسيط.',
      descriptionEn: 'A magical library of voiced, interactive bilingual stories tailored to build children’s vocabulary effortlessly.',
      icon: BookOpen,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      pillColor: 'bg-emerald-100 text-emerald-800',
      badge: isRtl ? 'مخزون لغوي وقراءة' : 'Reading & Vocabulary',
      xpReward: '+20 XP',
      level: 'Kids Play'
    },
    {
      id: 'animated-storyboard' as const,
      title: 'لوحة مشاهد لندن الكرتونية 🎬',
      titleEn: 'London Cartoon Storyboards 🎬',
      description: 'حول مغامرات الطفلة "نور" في لندن لمشهد سينمائي مسموع يتعلم فيه الأطفال حركة الكاميرا والسيناريو المباشر.',
      descriptionEn: 'Step inside London’s subway as a digital voice actor. Learn camera guidelines, scripts & direct translation.',
      icon: Film,
      color: 'bg-[#C49E3A]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/10',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'التمثيل الصوتي والسيناريو' : 'Voice Acting & Drama',
      xpReward: '+25 XP',
      level: 'Junior Play'
    },
    {
      id: 'roleplay-challenges' as const,
      title: 'حوارات تمثيلية تفاعلية 🎭',
      titleEn: 'Simulated Role-Play 🎭',
      description: 'عش مواقف واقعية وسجل صوتك للتحدث بالمطعم والمطار والفندق وصحح نطقك فوراً بالذكاء الاصطناعي.',
      descriptionEn: 'Practice real-life conversations in restaurants, airports, and hotels with smart feedback and scoring.',
      icon: Users,
      color: 'bg-[#C49E3A]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/10',
      borderColor: 'border-[#C49E3A]/30',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'المحادثة اللبقة وسرعة البديهة' : 'Conversational Speaking',
      xpReward: '+30 XP',
      level: 'B1 speaking'
    },
    {
      id: 'escape-room' as const,
      title: 'غرفة هروب القواعد الذكية 🔐',
      titleEn: 'Grammar Escape Room 🔐',
      description: 'كن المحقق الذكي وفك المجهول والرموز النحوية (زمن المضارع البسيط) لتتحرر من حجر برج وساعة بيغ بن العريقة!',
      descriptionEn: 'Solve Subject-Verb coordination and negative agreement ciphers to unlock heavy Big Ben doors!',
      icon: Key,
      color: 'bg-[#C49E3A]',
      textColor: 'text-[#9a7a2c]',
      bgColor: 'bg-[#C49E3A]/50',
      borderColor: 'border-[#C49E3A]/60',
      pillColor: 'bg-[#C49E3A]/10 text-[#9a7a2c]',
      badge: isRtl ? 'ذكاء وقواعد وتراكيب' : 'Active Logic & Grammar',
      xpReward: '+30 XP',
      level: 'A1/A2 Logic'
    },
    {
      id: 'visual-dictionary' as const,
      title: 'القاموس المصور الذكي 🎨',
      titleEn: 'Ultimate Visual Dictionary 🎨',
      description: 'تعريفات بصرية مذهلة للمفردات الأساسية مدعومة بالنطق الصوتي العالي الدقة والجمل التوضيحية البسيطة.',
      descriptionEn: 'Explore visual glossary boards with audio spelling prompts to master concrete and abstract objects easily.',
      icon: Palette,
      color: 'bg-rose-500',
      textColor: 'text-rose-800',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
      pillColor: 'bg-rose-100 text-rose-800',
      badge: isRtl ? 'الألوان والتصنيفات والربط' : 'Vocabulary Board',
      xpReward: '+10 XP',
      level: 'A1 Basics'
    },
    {
      id: 'family-activities' as const,
      title: 'بينغو وطبيخ العائلة 👨‍👩‍👧‍👦',
      titleEn: 'Family Game & Kitchen 👨‍👩‍👧‍👦',
      description: 'مسابقات بينغو كلمات الأوفلاين التفاعلية للعائلة، وتحدي تحضير بيتزا الوجه السعيد مع الأولاد في المطبخ!',
      descriptionEn: 'Call dynamic voice Bingo words offline with siblings, or tap custom steps for cooking happy-face pizzas safely.',
      icon: Sparkles,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      pillColor: 'bg-emerald-100 text-emerald-800',
      badge: isRtl ? 'تفاعل عائلي وعملي' : 'Cooperative Family Play',
      xpReward: '+20 XP',
      level: 'Interactive'
    }
  ];

  const getEmoji = (title: string, fallback: string = '⚡') => {
    const match = title.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u);
    return match ? match[0] : fallback;
  };

  const cleanTitle = (str: string) => {
    return str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
  };

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <h2 className="text-sm sm:text-base font-black text-[#002147] flex items-center gap-2">
          <span>⚡</span>
          <span>{isRtl ? 'الأنشطة التفاعلية واللامنهجية' : 'Interactive Activities & Quests'}</span>
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <ProgressPill>
            {activities.length} {isRtl ? 'أنشطة تفاعلية' : 'Activities'}
          </ProgressPill>
          {userProfile?.points !== undefined && (
            <ProgressPill>
              🏆 {userProfile.points} XP
            </ProgressPill>
          )}
        </div>
      </div>

      {/* Quest Cabin / Progression Keys */}
      <GoldCard className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base">🔐</span>
              <h3 className="text-sm sm:text-base font-black text-[#002147]">
                {isRtl ? 'حجرة مفاتيح التحديات الكبرى' : 'Grand Interactive Quest Cabin'}
              </h3>
            </div>
            <p className="text-xs font-bold text-[#002147]/70">
              {isRtl 
                ? 'اجمع المفاتيح الذهبية عبر التفوق في الأنشطة لتأهيل مجموع نقاطك إلى لوحة الشرف!' 
                : 'Complete mini-quests across activities to earn golden progression keys and boost your overall rank.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { nameAr: 'مفتاح الفلاش كاردز', key: 'Flashcards Key', emoji: '🔑' },
              { nameAr: 'مفتاح الهروب', key: 'Escape Key', emoji: '🔑' },
              { nameAr: 'مفتاح الأداء الصوتي', key: 'Voice Acting Key', emoji: '🔑' }
            ].map((item, idx) => (
              <span
                key={`p-key-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-[#002147] text-xs font-black shadow-xs"
              >
                <span>{item.emoji}</span>
                <span>{isRtl ? item.nameAr : item.key}</span>
              </span>
            ))}
          </div>
        </div>
      </GoldCard>

      {/* Activities Grid - 2 columns on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {activities.map((act, idx) => (
          <LessonTile
            key={act.id}
            order={idx + 1}
            emoji={getEmoji(act.title)}
            title={isRtl ? cleanTitle(act.title) : cleanTitle(act.titleEn)}
            subtitle={`${act.badge} • ${act.xpReward}`}
            level={act.level.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()}
            onClick={() => onNavigate(act.id)}
            className="!px-2.5 !py-3 min-h-[72px]"
          />
        ))}
      </div>

      {/* Co-op / Educational Info Footer Banner */}
      <GoldCard className="p-4 sm:p-5 mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base">👑</span>
              <h4 className="text-xs sm:text-sm font-black text-[#002147]">
                {isRtl ? 'أنشطة آمنة وتفاعلية موجهة للمتعلم والأسرة' : 'Safe, Interactive & Co-Op Friendly'}
              </h4>
            </div>
            <p className="text-xs font-bold text-[#002147]/70">
              {isRtl 
                ? 'أعدت هذه المجموعة من الأنشطة لترسيخ مخرجات الدروس اللغوية بطابع مرح. نقاط XP تحتسب في ملفك ولوحة الشرف.' 
                : 'Designed to reinforce language outcomes with playful practice. All earned XP seamlessly updates your profile and leaderboard ranking.'}
            </p>
          </div>

          <PrimaryButton onClick={() => onNavigate('leaderboard')} className="!px-3 !py-1.5 !text-xs shrink-0">
            <Trophy size={14} />
            <span>{isRtl ? 'لوحة الشرف' : 'Leaderboard'}</span>
          </PrimaryButton>
        </div>
      </GoldCard>
    </SectionShell>
  );
};
