
import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  GraduationCap,
  ArrowLeft,
  Trophy,
  Star,
  Zap,
  MessageSquare,
  PenTool
} from 'lucide-react';

interface CurriculumModule {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  icon: any;
  targetView: string;
  level: string;
}

const MODERN_MODULES: CurriculumModule[] = [
  {
    id: 'reading-a1',
    titleEn: 'Elite Reading A1',
    titleAr: 'منهج القراءة المطور A1',
    descriptionEn: 'Advanced literacy foundation with visual semantic mapping.',
    descriptionAr: 'تأسيس لغوي متقدم يعتمد على الخرائط الدلالية المرئية وكشف الرموز.',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50',
    icon: BookOpen,
    targetView: 'reading-curriculum',
    level: 'A1'
  },
  {
    id: 'reading-a2',
    titleEn: 'Elite Reading A2',
    titleAr: 'منهج القراءة المطور A2',
    descriptionEn: 'Narrative expansion and communicative social literacy.',
    descriptionAr: 'التوسع في السرد والثقافة الاجتماعية التواصلية.',
    color: 'bg-cyan-600',
    lightColor: 'bg-cyan-50',
    icon: BookOpen,
    targetView: 'reading-curriculum',
    level: 'A2'
  },
  {
    id: 'reading-b1',
    titleEn: 'Elite Reading B1',
    titleAr: 'منهج القراءة المطور B1',
    descriptionEn: 'Functional independence and analytical comprehension.',
    descriptionAr: 'الاستقلالية الوظيفية والفهم التحليلي المتقدم.',
    color: 'bg-indigo-600',
    lightColor: 'bg-indigo-50',
    icon: BookOpen,
    targetView: 'reading-curriculum',
    level: 'B1'
  },
  {
    id: 'reading-b2',
    titleEn: 'Elite Reading B2',
    titleAr: 'منهج القراءة المطور B2',
    descriptionEn: 'Critical analysis, logic, and expert-level reasoning.',
    descriptionAr: 'التحليل النقدي والمنطق والاستنتاج بمستوى الخبراء.',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    icon: BookOpen,
    targetView: 'reading-curriculum',
    level: 'B2'
  },
  {
    id: 'reading-c1',
    titleEn: 'Elite Reading C1',
    titleAr: 'منهج القراءة المطور C1',
    descriptionEn: 'Strategic literacy and complex technical synthesis.',
    descriptionAr: 'الطلاقة الاستراتيجية والتركيب التقني والخطاب المعقد.',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50',
    icon: BookOpen,
    targetView: 'reading-curriculum',
    level: 'C1'
  },
  {
    id: 'reading-c2',
    titleEn: 'Elite Reading C2',
    titleAr: 'منهج القراءة المطور C2',
    descriptionEn: 'Mastery, nuance, and philosophical expert discourse.',
    descriptionAr: 'الإتقان والبراعة والخطاب الفلسفي المعمق.',
    color: 'bg-slate-900',
    lightColor: 'bg-slate-50',
    icon: BookOpen,
    targetView: 'reading-curriculum',
    level: 'C2'
  },
  {
    id: 'grammar-a1',
    titleEn: 'Elite Grammar A1',
    titleAr: 'منهج القواعد المطور A1',
    descriptionEn: 'Linguistic scaffolding and the syntax of existence.',
    descriptionAr: 'السقالات اللغوية وبناء جمل الوجود الأساسية.',
    color: 'bg-emerald-700',
    lightColor: 'bg-emerald-50',
    icon: Zap,
    targetView: 'grammar-curriculum',
    level: 'A1'
  },
  {
    id: 'grammar-a2',
    titleEn: 'Elite Grammar A2',
    titleAr: 'منهج القواعد المطور A2',
    descriptionEn: 'Temporal mechanics and chronological anchoring.',
    descriptionAr: 'ميكانيكا الزمن والاستناد الزمني في الماضي والمستقبل.',
    color: 'bg-purple-700',
    lightColor: 'bg-purple-50',
    icon: Zap,
    targetView: 'grammar-curriculum',
    level: 'A2'
  },
  {
    id: 'grammar-b1',
    titleEn: 'Elite Grammar B1',
    titleAr: 'منهج القواعد المطور B1',
    descriptionEn: 'Synergistic connections and structural flexibility.',
    descriptionAr: 'الروابط التآزرية والحرية الهيكلية في صياغة الأفكار.',
    color: 'bg-amber-700',
    lightColor: 'bg-amber-50',
    icon: Zap,
    targetView: 'grammar-curriculum',
    level: 'B1'
  },
  {
    id: 'grammar-b2',
    titleEn: 'Elite Grammar B2',
    titleAr: 'منهج القواعد المطور B2',
    descriptionEn: 'Complex synthesis and the art of emphasis.',
    descriptionAr: 'التركيب المعقد وفن التأكيد اللغوي المتقدم.',
    color: 'bg-indigo-700',
    lightColor: 'bg-indigo-50',
    icon: Zap,
    targetView: 'grammar-curriculum',
    level: 'B2'
  },
  {
    id: 'grammar-c1',
    titleEn: 'Elite Grammar C1',
    titleAr: 'منهج القواعد المطور C1',
    descriptionEn: 'Syntactic mastery and professional linguistic edge.',
    descriptionAr: 'الإتقان النحوي والبراعة اللغوية الاحترافية.',
    color: 'bg-slate-900',
    lightColor: 'bg-slate-50',
    icon: Zap,
    targetView: 'grammar-curriculum',
    level: 'C1'
  },
  {
    id: 'grammar-c2',
    titleEn: 'Elite Grammar C2',
    titleAr: 'منهج القواعد المطور C2',
    descriptionEn: 'Philosophical precision and fluid expert discourse.',
    descriptionAr: 'الدقة الفلسفية والسيولة اللغوية بمستوى الخبراء.',
    color: 'bg-zinc-950',
    lightColor: 'bg-zinc-50',
    icon: Zap,
    targetView: 'grammar-curriculum',
    level: 'C2'
  },
  {
    id: 'conversation-a1',
    titleEn: 'Elite Conversation A1',
    titleAr: 'منهج المحادثة المطور A1',
    descriptionEn: 'Linguistic scaffolding and social architecture.',
    descriptionAr: 'السقالات اللغوية والهندسة الاجتماعية للحوار.',
    color: 'bg-emerald-700',
    lightColor: 'bg-emerald-50',
    icon: MessageSquare,
    targetView: 'conversation-curriculum',
    level: 'A1'
  },
  {
    id: 'conversation-a2',
    titleEn: 'Elite Conversation A2',
    titleAr: 'منهج المحادثة المطور A2',
    descriptionEn: 'Daily dynamics and transactional fluency.',
    descriptionAr: 'الديناميكيات اليومية والطلاقة في المعاملات.',
    color: 'bg-purple-700',
    lightColor: 'bg-purple-50',
    icon: MessageSquare,
    targetView: 'conversation-curriculum',
    level: 'A2'
  },
  {
    id: 'conversation-b1',
    titleEn: 'Elite Conversation B1',
    titleAr: 'منهج المحادثة المطور B1',
    descriptionEn: 'Social synergy and flexible discursive reasoning.',
    descriptionAr: 'التآزر الاجتماعي والمنطق النقاشي المرن.',
    color: 'bg-amber-700',
    lightColor: 'bg-amber-50',
    icon: MessageSquare,
    targetView: 'conversation-curriculum',
    level: 'B1'
  },
  {
    id: 'conversation-b2',
    titleEn: 'Elite Conversation B2',
    titleAr: 'منهج المحادثة المطور B2',
    descriptionEn: 'Strategic discourse and the art of persuasion.',
    descriptionAr: 'الخطاب الاستراتيجي وفن الإقناع المتقدم.',
    color: 'bg-indigo-700',
    lightColor: 'bg-indigo-50',
    icon: MessageSquare,
    targetView: 'conversation-curriculum',
    level: 'B2'
  },
  {
    id: 'conversation-c1',
    titleEn: 'Elite Conversation C1',
    titleAr: 'منهج المحادثة المطور C1',
    descriptionEn: 'Philosophical depth and analytical speaking edge.',
    descriptionAr: 'العمق الفلسفي والبراعة التحليلية في التحدث.',
    color: 'bg-slate-900',
    lightColor: 'bg-slate-50',
    icon: MessageSquare,
    targetView: 'conversation-curriculum',
    level: 'C1'
  },
  {
    id: 'conversation-c2',
    titleEn: 'Elite Conversation C2',
    titleAr: 'منهج المحادثة المطور C2',
    descriptionEn: 'Rhetorical mastery and cultural resonance.',
    descriptionAr: 'الإتقان البلاغي والرنين الثقافي بمستوى الخبراء.',
    color: 'bg-zinc-950',
    lightColor: 'bg-zinc-50',
    icon: MessageSquare,
    targetView: 'conversation-curriculum',
    level: 'C2'
  },
  {
    id: 'writing-a1',
    titleEn: 'Elite Writing A1',
    titleAr: 'منهج الكتابة المطور A1',
    descriptionEn: 'Syntactic foundations and sentence architecture.',
    descriptionAr: 'الأساسيات النحوية وهندسة الجملة.',
    color: 'bg-emerald-700',
    lightColor: 'bg-emerald-50',
    icon: PenTool,
    targetView: 'writing-curriculum',
    level: 'A1'
  },
  {
    id: 'writing-a2',
    titleEn: 'Elite Writing A2',
    titleAr: 'منهج الكتابة المطور A2',
    descriptionEn: 'Narrative structure and descriptive depth.',
    descriptionAr: 'الهيكل السردي والعمق الوصفي في التعبير.',
    color: 'bg-purple-700',
    lightColor: 'bg-purple-50',
    icon: PenTool,
    targetView: 'writing-curriculum',
    level: 'A2'
  },
  {
    id: 'writing-b1',
    titleEn: 'Elite Writing B1',
    titleAr: 'منهج الكتابة المطور B1',
    descriptionEn: 'Complex synthesis and technical clarity.',
    descriptionAr: 'التركيب المعقد والوضوح الفني في الكتابة.',
    color: 'bg-amber-700',
    lightColor: 'bg-amber-50',
    icon: PenTool,
    targetView: 'writing-curriculum',
    level: 'B1'
  },
  {
    id: 'writing-b2',
    titleEn: 'Elite Writing B2',
    titleAr: 'منهج الكتابة المطور B2',
    descriptionEn: 'Persuasive architecture and argumentative logic.',
    descriptionAr: 'هندسة الإقناع والمنطق الجدلي في المقالات.',
    color: 'bg-indigo-700',
    lightColor: 'bg-indigo-50',
    icon: PenTool,
    targetView: 'writing-curriculum',
    level: 'B2'
  },
  {
    id: 'writing-c1',
    titleEn: 'Elite Writing C1',
    titleAr: 'منهج الكتابة المطور C1',
    descriptionEn: 'Professional synthesis and academic precision.',
    descriptionAr: 'التركيب المهني والدقة الأكاديمية الاحترافية.',
    color: 'bg-slate-900',
    lightColor: 'bg-slate-50',
    icon: PenTool,
    targetView: 'writing-curriculum',
    level: 'C1'
  },
  {
    id: 'writing-c2',
    titleEn: 'Elite Writing C2',
    titleAr: 'منهج الكتابة المطور C2',
    descriptionEn: 'Literary mastery and unique authorial voice.',
    descriptionAr: 'الإتقان الأدبي والصوت الكتابي الفريد والبراعة.',
    color: 'bg-zinc-950',
    lightColor: 'bg-zinc-50',
    icon: PenTool,
    targetView: 'writing-curriculum',
    level: 'C2'
  },
  {
    id: 'expression-a1',
    titleEn: 'Elite Expression A1',
    titleAr: 'منهج التعبير المطور A1',
    descriptionEn: 'Internalizing feelings and emotional foundations.',
    descriptionAr: 'استيعاب المشاعر والأسس الوجدانبة للتعبير.',
    color: 'bg-rose-700',
    lightColor: 'bg-rose-50',
    icon: Sparkles,
    targetView: 'expression-curriculum',
    level: 'A1'
  },
  {
    id: 'expression-a2',
    titleEn: 'Elite Expression A2',
    titleAr: 'منهج التعبير المطور A2',
    descriptionEn: 'Sensory painting and experiential storytelling.',
    descriptionAr: 'الرسم الحسي والسرد التجريبي للقصص.',
    color: 'bg-amber-700',
    lightColor: 'bg-amber-50',
    icon: Sparkles,
    targetView: 'expression-curriculum',
    level: 'A2'
  },
  {
    id: 'expression-b1',
    titleEn: 'Elite Expression B1',
    titleAr: 'منهج التعبير المطور B1',
    descriptionEn: 'Abstract thinking and value articulation.',
    descriptionAr: 'التفكير المجرد وصياغة القيم الإنسانية.',
    color: 'bg-cyan-700',
    lightColor: 'bg-cyan-50',
    icon: Sparkles,
    targetView: 'expression-curriculum',
    level: 'B1'
  },
  {
    id: 'expression-b2',
    titleEn: 'Elite Expression B2',
    titleAr: 'منهج التعبير المطور B2',
    descriptionEn: 'Strategic rhetoric and leadership resonance.',
    descriptionAr: 'البلاغة الاستراتيجية والرنين القيادي للكلمة.',
    color: 'bg-indigo-700',
    lightColor: 'bg-indigo-50',
    icon: Sparkles,
    targetView: 'expression-curriculum',
    level: 'B2'
  },
  {
    id: 'expression-c1',
    titleEn: 'Elite Expression C1',
    titleAr: 'منهج التعبير المطور C1',
    descriptionEn: 'Cultural critique and meta-analysis of society.',
    descriptionAr: 'النقد الثقافي والتحليل العميق للمجتمع.',
    color: 'bg-slate-900',
    lightColor: 'bg-slate-50',
    icon: Sparkles,
    targetView: 'expression-curriculum',
    level: 'C1'
  },
  {
    id: 'expression-c2',
    titleEn: 'Elite Expression C2',
    titleAr: 'منهج التعبير المطور C2',
    descriptionEn: 'Universal truths and poetic intellectual mastery.',
    descriptionAr: 'الحقائق الكونية والإتقان الفكري الشاعري.',
    color: 'bg-black',
    lightColor: 'bg-zinc-50',
    icon: Sparkles,
    targetView: 'expression-curriculum',
    level: 'C2'
  }
];

export const ModernCurriculumHome = ({ lang, onBack, onNavigate }: { lang: 'en' | 'ar', onBack: () => void, onNavigate: (view: any, level?: any) => void }) => {
  const isRtl = lang === 'ar';

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#002147] transition-all active:scale-95"
          >
            <ArrowLeft className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C49E3A] text-white rounded-xl shadow-lg shadow-[#C49E3A]/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#002147] leading-none uppercase tracking-tighter">
                {isRtl ? 'المناهج المطورة' : 'Elite Curriculums'}
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                {isRtl ? 'الجيل القادم من التعليم' : 'Next-Gen Learning Experience'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Star className="text-[#C49E3A] fill-[#C49E3A]" size={12} />
              <span className="text-xs font-black text-[#002147]">Exclusive Access</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
        <section className="relative overflow-hidden bg-[#002147] rounded-[3rem] p-8 md:p-16 text-white shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
           <div className="relative z-10 space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#C49E3A] px-3 py-1 rounded-full">
                 <Sparkles size={12} className="text-[#002147]" />
                 <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest leading-none">Powered by Elite AI</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                {isRtl ? 'مستقبل التعليم الرقمي بين يديك' : 'The Future of Elite Digital Education'}
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                {isRtl 
                  ? 'مناهج حصرية صممتها أكاديمية باسم الخليل لتوفير أقصى درجات الفعالية في التعلم السريع والمستدام.' 
                  : 'Exclusive curricula designed by Basim Alkhalil Academy to provide maximum effectiveness in rapid and sustainable learning.'}
              </p>
           </div>
        </section>

        <div className="space-y-16">
          {/* Reading Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[#002147] tracking-tight">
                  {isRtl ? 'قسم القراءة المطور' : 'Elite Reading Section'}
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  {isRtl ? 'ستة مستويات من الإتقان القرائي' : 'Six Levels of Reading Mastery'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MODERN_MODULES.filter(m => m.targetView === 'reading-curriculum').map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onNavigate(module.targetView, module.level)}
                  className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} opacity-5 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${module.lightColor} ${module.color.replace('bg-', 'text-')} w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                      <module.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-[#C49E3A] transition-colors">
                      {isRtl ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">Platinum Standard</p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                      {isRtl ? module.descriptionAr : module.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.level} - Mastery</div>
                      </div>
                      <div className="p-3 bg-[#002147] text-white rounded-2xl group-hover:bg-[#C49E3A] transition-all">
                          <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Grammar Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[#002147] tracking-tight">
                  {isRtl ? 'قسم القواعد المطور' : 'Elite Grammar Section'}
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  {isRtl ? 'هندسة اللغة والقواعد الذكية' : 'Linguistic Engineering & Smart Grammar'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MODERN_MODULES.filter(m => m.targetView === 'grammar-curriculum').map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onNavigate(module.targetView, module.level)}
                  className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} opacity-5 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${module.lightColor} ${module.color.replace('bg-', 'text-')} w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                      <module.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-[#C49E3A] transition-colors">
                      {isRtl ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">Platinum Standard</p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                      {isRtl ? module.descriptionAr : module.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.level} - Mastery</div>
                      </div>
                      <div className="p-3 bg-[#002147] text-white rounded-2xl group-hover:bg-[#C49E3A] transition-all">
                          <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                </motion.div>
              ))}

              {/* Placeholder for future modules */}
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-60 h-full min-h-[300px]">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
                  <GraduationCap size={28} />
                </div>
                <h4 className="text-lg font-black text-[#002147]/40 mb-2">{isRtl ? 'قريباً: المزيد من القواعد' : 'Coming Soon: Advanced Grammar'}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">Level C2+ Developed</p>
              </div>
            </div>
          </section>
          
          {/* Conversation Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[#002147] tracking-tight">
                  {isRtl ? 'قسم المحادثة المطور' : 'Elite Conversation Section'}
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  {isRtl ? 'بناء الشخصية والحوار الذكي' : 'Personality Building & Smart Dialogue'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MODERN_MODULES.filter(m => m.targetView === 'conversation-curriculum').map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onNavigate(module.targetView, module.level)}
                  className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} opacity-5 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${module.lightColor} ${module.color.replace('bg-', 'text-')} w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                      <module.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-rose-600 transition-colors">
                      {isRtl ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">Platinum Standard</p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                      {isRtl ? module.descriptionAr : module.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.level} - Mastery</div>
                      </div>
                      <div className="p-3 bg-[#002147] text-white rounded-2xl group-hover:bg-rose-600 transition-all">
                          <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                </motion.div>
              ))}

              {/* Placeholder for future modules */}
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-60 h-full min-h-[300px]">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
                  <GraduationCap size={28} />
                </div>
                <h4 className="text-lg font-black text-[#002147]/40 mb-2">{isRtl ? 'قريباً: المحادثة المتقدمة' : 'Coming Soon: Advanced Conversation'}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">Level C2+ Specialized</p>
              </div>
            </div>
          </section>
          
          {/* Writing Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <PenTool size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[#002147] tracking-tight">
                  {isRtl ? 'قسم الكتابة المطور' : 'Elite Writing Section'}
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  {isRtl ? 'هندسة النصوص والبراعة الكتابية' : 'Text Engineering & Composition Mastery'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MODERN_MODULES.filter(m => m.targetView === 'writing-curriculum').map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onNavigate(module.targetView, module.level)}
                  className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} opacity-5 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${module.lightColor} ${module.color.replace('bg-', 'text-')} w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                      <module.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-indigo-600 transition-colors">
                      {isRtl ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">Platinum Standard</p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                      {isRtl ? module.descriptionAr : module.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.level} - Mastery</div>
                      </div>
                      <div className="p-3 bg-[#002147] text-white rounded-2xl group-hover:bg-indigo-600 transition-all">
                          <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                </motion.div>
              ))}

              {/* Placeholder for future modules */}
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-60 h-full min-h-[300px]">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
                  <GraduationCap size={28} />
                </div>
                <h4 className="text-lg font-black text-[#002147]/40 mb-2">{isRtl ? 'قريباً: التأليف الإبداعي' : 'Coming Soon: Creative Authorship'}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">Level C2+ Specialized</p>
              </div>
            </div>
          </section>
          
          {/* Expression Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[#002147] tracking-tight">
                  {isRtl ? 'قسم التعبير المطور' : 'Elite Expression Section'}
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                  {isRtl ? 'الفصاحة البلاغية والبراعة الوجدانية' : 'Rhetorical Eloquence & Emotional Brilliance'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MODERN_MODULES.filter(m => m.targetView === 'expression-curriculum').map((module, idx) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onNavigate(module.targetView, module.level)}
                  className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} opacity-5 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${module.lightColor} ${module.color.replace('bg-', 'text-')} w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                      <module.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-amber-600 transition-colors">
                      {isRtl ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">Platinum Standard</p>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                      {isRtl ? module.descriptionAr : module.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.level} - Mastery</div>
                      </div>
                      <div className="p-3 bg-[#002147] text-white rounded-2xl group-hover:bg-amber-600 transition-all">
                          <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                </motion.div>
              ))}

              {/* Placeholder for future modules */}
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-60 h-full min-h-[300px]">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
                  <GraduationCap size={28} />
                </div>
                <h4 className="text-lg font-black text-[#002147]/40 mb-2">{isRtl ? 'قريباً: التعبير القيادي' : 'Coming Soon: Leadership Expression'}</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">Level C2+ Beyond</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-20 text-center space-y-4">
         <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full" />
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Basim Alkhalil Academic Content © 2026</p>
      </footer>
    </div>
  );
};
