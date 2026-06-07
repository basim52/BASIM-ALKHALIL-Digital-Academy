import React from 'react';
import { motion } from 'motion/react';
import { 
  Music, 
  Film, 
  Key, 
  Users, 
  Sparkles, 
  Zap,
  BookOpen,
  Palette,
  Trophy,
  Gamepad2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { UserProfile, AppView } from '../types';

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
      id: 'flashcards-hub' as const,
      title: '📖 مستودع البطاقات التعليمية الذكية',
      titleEn: 'Smart Vocabulary Flashcards 📖',
      description: 'تعلم كلمات أكسفورد وقواعد الإنجليزية بالتكرار المتباعد والنطق المسموع والتقييم الفطن للذاكرة!',
      descriptionEn: 'Master premium academic Oxford vocabulary and rules via interactive spaced-repetition card flipping and audio!',
      icon: BookOpen,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-800',
      bgColor: 'bg-indigo-50/70',
      borderColor: 'border-indigo-100',
      pillColor: 'bg-indigo-100 text-indigo-800',
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
      color: 'bg-blue-500',
      textColor: 'text-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      pillColor: 'bg-blue-100 text-blue-800',
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
      color: 'bg-teal-500',
      textColor: 'text-teal-800',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-100',
      pillColor: 'bg-teal-100 text-teal-800',
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
      color: 'bg-indigo-500',
      textColor: 'text-indigo-800',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      pillColor: 'bg-indigo-100 text-indigo-800',
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
      color: 'bg-purple-500',
      textColor: 'text-purple-800',
      bgColor: 'bg-purple-50/50',
      borderColor: 'border-purple-200/60',
      pillColor: 'bg-purple-100 text-purple-800',
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

  return (
    <div className="min-h-screen bg-[#FCFAF5] pb-24 text-slate-800 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#FFF2D7]/40 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 pt-8 relative z-10">

        {/* Master Hub Header */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-amber-500/10 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-4.5">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#002147] to-[#C49E3A] rounded-2.5xl flex items-center justify-center text-white shadow-xl shadow-[#002147]/10 shrink-0">
              <Gamepad2 size={28} className="animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-black text-[#C49E3A] uppercase tracking-widest block mb-0.5">
                {isRtl ? 'منصة الأنشطة اللامنهجية الممتعة 🚀' : 'GAMIFIED ADVENTURE PLATFORM 🚀'}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'تعليم تفاعلي ⚡' : 'Interactive Play ⚡'}
              </h1>
              <p className="text-xs text-slate-500 font-bold max-w-2xl leading-normal mt-1">
                {isRtl 
                  ? 'قسم الألعاب الإبداعية والمرح اللغوي الاستكشافي المتكامل! تعلم النطق بالأغاني، ومثّل مشاهد الكرتون، واكسر أقفال التحديات، وحاور بالذكاء الاصطناعي وبسط لغتك بأمان.' 
                  : 'Welcome to your premium unified games room! Sing karaoke, act cartoons, escape towers, interact with visual glossaries and play offline co-op boards.'}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-black text-xs transition-all cursor-pointer shadow-3xs ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>{isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}</span>
          </button>
        </div>

        {/* Interactive Apps Bento Grid (8 items grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {activities.map((act) => {
            const IconComponent = act.icon;

            return (
              <motion.div
                key={act.id}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => onNavigate(act.id)}
                className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 lg:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all cursor-pointer relative group overflow-hidden"
              >
                {/* Micro corner highlights */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${act.bgColor} rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform duration-500`} />
                
                <div className="space-y-4 relative z-10">
                  
                  {/* Icon & Badges */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${act.bgColor} ${act.textColor} border ${act.borderColor} rounded-2xl flex items-center justify-center shadow-xs`}>
                      <IconComponent size={22} className="stroke-[2.5px]" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-[#C49E3A]/10 text-[#C49E3A] px-2.5 py-1 rounded-lg border border-[#C49E3A]/25">
                        {act.level}
                      </span>
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <Trophy size={11} />
                        <strong>{act.xpReward}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Title & Body Description */}
                  <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-black text-[#002147] group-hover:text-amber-600 transition-colors">
                      {isRtl ? act.title : act.titleEn}
                    </h3>
                    
                    <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider ${act.textColor} bg-slate-100 rounded-md px-2 py-0.5`}>
                      {act.badge}
                    </span>

                    <p className="text-xs text-slate-500 font-bold leading-relaxed pt-2">
                      {isRtl ? act.description : act.descriptionEn}
                    </p>
                  </div>

                </div>

                {/* Footer Action Bar */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-650 transition-colors">
                    {isRtl ? 'تطبيق تفاعلي بالكامل' : 'FULLY INTERACTIVE GAME'}
                  </span>

                  <span className={`flex items-center gap-1.5 text-xs font-black p-2.5 px-4 rounded-xl transition-all ${act.bgColor} ${act.textColor} border ${act.borderColor} group-hover:scale-105`}>
                    <span>{isRtl ? 'ابدأ اللعب والمغامرة ⚡' : 'Start Adventure ⚡'}</span>
                    {isRtl ? <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Co-op / Educational Info Footer Banner */}
        <div className="mt-12 bg-[#002147] rounded-[2.5rem] p-6 lg:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-xl border-b-4 border-[#C49E3A]">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[#C49E3A]/5 rounded-l-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-[#002147] p-1 rounded-lg text-xs font-black">AI & CO-OP</span>
              <strong className="text-sm font-bold tracking-wider text-[#C49E3A] uppercase">{isRtl ? 'توجيه عائلي وإثرائي متكامل' : 'ENRICHMENT COMPLEMENTS'}</strong>
            </div>
            <h3 className="text-lg md:text-xl font-black">{isRtl ? 'آمن، تفاعلي، ومناسب لحجر العائلة ومسابقات الذكاء!' : 'Designed for high engagement, safe interactive loops & parent co-play'}</h3>
            <p className="text-xs text-slate-300 font-bold leading-normal">
              {isRtl 
                ? 'أعدت هذه المجموعة من الأنشطة خصيصاً لمساعدة الأطفال على إضفاء طابع تفاعلي ممتع وعملي على مخرجات الدروس اللغوية. حصد الطلاب للنقاط يساهم في لوحة الصدارة!' 
                : 'All game points (XP rewards) count seamlessly towards the main student leaderboard and progress profiles, fostering productive, fun learning environments.'}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0 w-24 h-24 bg-white/5 border border-white/15 rounded-3xl p-3 relative z-10 text-center backdrop-blur-md">
            <span className="text-3xl animate-pulse">👑</span>
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-500 mt-1">{isRtl ? 'ألعاب معتمدة' : 'Verified Play'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
