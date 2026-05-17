
import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  GraduationCap,
  ArrowLeft,
  Trophy,
  Star
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {MODERN_MODULES.map((module, idx) => (
             <motion.div
               key={module.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
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
           <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 mb-6">
                 <GraduationCap size={28} />
              </div>
              <h4 className="text-lg font-black text-[#002147]/40 mb-2">{isRtl ? 'قريباً: منهج التحدث' : 'Coming Soon: Speaking'}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">Level B1 Developed</p>
           </div>
        </div>
      </main>

      <footer className="py-20 text-center space-y-4">
         <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full" />
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Basim Alkhalil Academic Content © 2026</p>
      </footer>
    </div>
  );
};
