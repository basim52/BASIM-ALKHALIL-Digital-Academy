import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Baby, 
  Briefcase, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Brain, 
  Mic2, 
  Globe, 
  Compass, 
  HelpCircle,
  Layers
} from 'lucide-react';
import { Language } from '../lib/translations';

interface LandingPageProps {
  lang: Language;
  onToggleLang: () => void;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onToggleLang,
  onGetStarted
}) => {
  const isRtl = lang === 'ar';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Real programs in the app
  const programs = [
    {
      id: 'english-mastery',
      icon: GraduationCap,
      color: 'bg-blue-600',
      badgeAr: 'المسار الأكاديمي الشامل',
      badgeEn: 'Core Academic Track',
      titleAr: 'برنامج اللغة الإنجليزية الشامل (A1 - C2)',
      titleEn: 'Comprehensive English Mastery (A1 - C2)',
      descAr: 'تغطية شاملة لكافة المستويات المعيارية الأوروبية (CEFR) مع مناهج أكسفورد المعتمدة، قراءة ناطقة، تصحيح مخارج الحروف، ومحادثات صوتية حية.',
      descEn: 'Full CEFR coverage with standardized Oxford curricula, read-aloud modules, pronunciation acoustics, and live AI voice dialogues.',
      featuresAr: ['مستويات متدرجة من A1 حتى C2', 'مختبر نطق وتحليل صوتي فوري', 'قصص تفاعلية وقواعد مشروحة ومترجمة'],
      featuresEn: ['Structured A1 to C2 progression', 'Instant voice pronunciation feedback', 'Interactive stories & bilingual grammar']
    },
    {
      id: 'early-childhood',
      icon: Baby,
      color: 'bg-emerald-600',
      badgeAr: 'مسار الصغار والطفولة',
      badgeEn: 'Kids & Early Childhood',
      titleAr: 'واحة الطفولة المبكرة (Early Childhood)',
      titleEn: 'Early Childhood Learning Oasis',
      descAr: 'بيئة تعليمية مبهجة وآمنة للأطفال مع رفيق التعلم الذكي "الأسد باسل"، كتب الملصقات، الأناشيد الإنجليزية، والألعاب الصوتية المحفزة.',
      descEn: 'A joyful and safe interactive space with smart companion Basil the Lion, sticker books, English nursery songs, and phonics games.',
      featuresAr: ['شخصية تفاعلية تتحدث مع الطفل', 'دفتر ملصقات رقمي ومكافآت تشجيعية', 'أناشيد تعليمية وألعاب مطابقة بصرية'],
      featuresEn: ['Interactive mascot that talks to children', 'Digital sticker book & reward badges', 'Educational songs & visual matching games']
    },
    {
      id: 'adults-daily-dose',
      icon: BookOpen,
      color: 'bg-amber-600',
      badgeAr: 'مسار الكبار وتطوير الذات',
      badgeEn: 'Adults & Personal Growth',
      titleAr: 'مسار الكبار والجرعة اليومية (Daily Dose)',
      titleEn: 'Adults Learning & Daily Dose',
      descAr: 'دروس معرفية مكثفة للكبار مستوحاة من روائع الكتب العالمية مثل "العادات الذرية"، "التفكير السريع والبطيء"، ومذكرات القيادة المؤثرة.',
      descEn: 'Concentrated knowledge doses inspired by world-class bestsellers including Atomic Habits, Thinking Fast & Slow, and leadership biographies.',
      featuresAr: ['مقتطفات لغوية من أمهات الكتب', 'تراكيب ومصطلحات متقدمة في سياقها', 'تمارين فكرية لترسيخ المفردات الفلسفية'],
      featuresEn: ['Curated excerpts from master books', 'Advanced idiomatic vocabulary in context', 'Reflective questions to build high-level fluency']
    },
    {
      id: 'career-skills',
      icon: Briefcase,
      color: 'bg-indigo-600',
      badgeAr: 'مسار المهنيين والمستقبل',
      badgeEn: 'Career & Future Skills',
      titleAr: 'المهارات المهنية ومستقبل الأعمال (Career Track)',
      titleEn: 'Professional & Future Workplace Skills',
      descAr: 'إتقان الإنجليزية للأعمال، إعداد وتقديم العروض، التفاوض، واجتياز المقابلات الوظيفية، إلى جانب أدوات واستخدامات الذكاء الاصطناعي في بيئة العمل.',
      descEn: 'Master business communication, presentations, negotiations, interview preparation, and real-world AI productivity co-pilots.',
      featuresAr: ['صياغة المراسلات المهنية بطلاقة', 'محاكاة مقابلات العمل مع مدرب ذكي', 'أدوات الذكاء الاصطناعي العملية للمحترفين'],
      featuresEn: ['Professional email & pitch drafting', 'Interactive AI mock job interviews', 'Hands-on practical AI workplace tools']
    }
  ];

  // How it works steps
  const steps = [
    {
      stepNumber: '01',
      titleAr: 'تسجيل الدخول السريع عبر Google',
      titleEn: 'Fast Sign-In with Google',
      descAr: 'انضم بضغطة زر واحدة عبر حساب Google دون الحاجة لملء استمارات طويلة أو انتظار تفعيل يدوي.',
      descEn: 'Join in one click with your Google account—no lengthy forms or manual waiting periods.'
    },
    {
      stepNumber: '02',
      titleAr: 'اختبار تحديد المستوى والخطة الذكية',
      titleEn: 'Placement Test & Smart Adaptive Plan',
      descAr: 'يحدد النظام بدقة مستواك الأكاديمي الحقيقي ويصمم لك جدولاً أسبوعياً مخصصاً يتناسب مع وقتك وأهدافك.',
      descEn: 'Our placement engine determines your real CEFR proficiency and formulates a flexible weekly study schedule tailored to your goals.'
    },
    {
      stepNumber: '03',
      titleAr: 'التدريب التفاعلي مع المساعد الصوتي الذكي',
      titleEn: 'Practice with Real-Time AI Voice Tutor',
      descAr: 'تدرب على النطق والمحادثات الحية وتلقَّ تصحيحات لغوية فورية وتقارير متابعة مستمرة لتقييم تقدمك بثقة.',
      descEn: 'Engage in natural voice-to-voice dialogues, receive instant pronunciation feedback, and track your ongoing growth reports.'
    }
  ];

  // FAQ items
  const faqs = [
    {
      qAr: 'كيف أحدد المستوى الدراسي المناسب لي في الأكاديمية؟',
      qEn: 'How do I determine my appropriate proficiency level?',
      aAr: 'بمجرد تسجيل الدخول، يقدم لك النظام اختبار تحديد مستوى ذكي يقيس مهارات القراءة، القواعد، والاستيعاب، ثم يوجهك مباشرة للوحدات والدروس التي تلائم قدراتك بدقة.',
      aEn: 'Upon sign-in, the system provides an adaptive placement test evaluating reading, grammar, and comprehension, placing you directly into the most fitting lessons.'
    },
    {
      qAr: 'كيف يعمل المساعد الصوتي والذكاء الاصطناعي في المحادثة؟',
      qEn: 'How does the AI voice assistant work for speaking practice?',
      aAr: 'تعتمد الأكاديمية على محركات ذكاء اصطناعي صوتية مباشرة فائقة السرعة، حيث يمكنك التحدث بصوتك والاستماع لردود فورية باللكنة البريطانية أو الأمريكية مع تحليل دقيق لمخارج الحروف والتنغيم.',
      aEn: 'The academy integrates ultra-responsive real-time AI voice models. You speak naturally and hear immediate feedback with acoustic accuracy, accent guidance, and syntactic tips.'
    },
    {
      qAr: 'هل المنهاج ملائم لجميع الفئات العمرية؟',
      qEn: 'Is the curriculum suitable for different age groups?',
      aAr: 'نعم، تم تصميم الأكاديمية بمسارات متخصصة ومستقلة: مسار الطفولة المبكرة للأطفال ببيئة مرحة وآمنة، مسار الطلاب الأكاديمي المتدرج، ومسار الكبار والمهنيين لتطوير مهارات العمل.',
      aEn: 'Yes! The academy features distinct tracks: Early Childhood with safe gamified learning, the Core Academic Track for students, and the Career/Adults Track for professional advancement.'
    },
    {
      qAr: 'هل يمكنني الدراسة عبر الهاتف المحمول؟',
      qEn: 'Can I study smoothly on my mobile phone?',
      aAr: 'نعم بكل تأكيد، المنصة مصممة بالكامل وفق معايير Mobile-First وتعمل بسلاسة تامة على جميع الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر دون الحاجة لتحميل تطبيقات خارجية.',
      aEn: 'Absolutely. The platform is engineered mobile-first, ensuring an optimized and fluid experience across all smartphones, tablets, and desktop browsers without extra installations.'
    }
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-800 ${isRtl ? 'font-arabic' : 'font-sans'} selection:bg-[#C49E3A]/20 selection:text-[#002147]`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Academy Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-[#C49E3A] shrink-0">
              B
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-[#002147] tracking-tight block leading-tight">
                {isRtl ? 'أكاديمية باسم الخليل' : 'Basim Al-Khalil Academy'}
              </span>
              <span className="text-[10px] font-bold text-[#C49E3A] uppercase tracking-wider block">
                {isRtl ? 'منصة التعليم والمهارات الذكية' : 'Digital Academy & Future Skills'}
              </span>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-black text-slate-600">
            <button 
              onClick={() => scrollToSection('programs')} 
              className="hover:text-[#002147] transition-colors cursor-pointer"
            >
              {isRtl ? 'البرامج الدراسية' : 'Programs'}
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-[#002147] transition-colors cursor-pointer"
            >
              {isRtl ? 'كيف يعمل النظام' : 'How It Works'}
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-[#002147] transition-colors cursor-pointer"
            >
              {isRtl ? 'الأسئلة الشائعة' : 'FAQ'}
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
              title={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe size={14} className="text-[#C49E3A]" />
              <span>{isRtl ? 'English' : 'عربي'}</span>
            </button>

            {/* Start Now Button */}
            <button
              onClick={onGetStarted}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#002147] hover:bg-[#002c5f] text-white text-xs sm:text-sm font-black shadow-md border-b-3 border-[#C49E3A] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isRtl ? 'ابدأ الآن' : 'Start Now'}</span>
              {isRtl ? <ArrowLeft size={15} className="text-[#C49E3A]" /> : <ArrowRight size={15} className="text-[#C49E3A]" />}
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-slate-50 to-[#f8fafc] border-b border-slate-200/70">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002147 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Hero Copy */}
            <div className={`lg:col-span-7 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#002147]/5 border border-[#002147]/15 text-[#002147] text-xs font-black">
                <Sparkles size={14} className="text-[#C49E3A]" />
                <span>{isRtl ? 'منظومة تعليمية متكاملة مدعومة بالذكاء الاصطناعي' : 'AI-Powered Complete Educational Ecosystem'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#002147] tracking-tight leading-[1.2] text-balance">
                {isRtl ? (
                  <>
                    تعلّم الإنجليزية ومهارات المستقبل <span className="text-[#C49E3A]">بخطّة ذكية تناسبك</span>
                  </>
                ) : (
                  <>
                    Learn English & Future Skills <span className="text-[#C49E3A]">with a Smart Plan for You</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl text-balance">
                {isRtl 
                  ? 'منصة أكاديمية تجمع بين المناهج العالمية، التدريب الصوتي المباشر مع الذكاء الاصطناعي، ومسارات متخصصة للأطفال، الطلاب، والكبار لضمان إتقان حقيقي للغة والتواصل بثقة.'
                  : 'An elite academy integrating standardized global curricula, instant interactive voice AI coaching, and specialized tracks for kids, students, and professionals to achieve genuine fluency.'}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={onGetStarted}
                  className="px-7 py-4 rounded-2xl bg-[#002147] hover:bg-[#002c5f] text-white text-base font-black shadow-lg shadow-blue-950/20 border-b-4 border-[#C49E3A] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>{isRtl ? 'ابدأ الآن مجاناً 🚀' : 'Start Now Free 🚀'}</span>
                  {isRtl ? <ArrowLeft size={18} className="text-[#C49E3A]" /> : <ArrowRight size={18} className="text-[#C49E3A]" />}
                </button>

                <button
                  onClick={() => scrollToSection('programs')}
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-[#002147] text-base font-black border-2 border-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass size={18} className="text-[#C49E3A]" />
                  <span>{isRtl ? 'استعرض البرامج' : 'Explore Programs'}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{isRtl ? 'دخول فوري بحساب Google' : 'Instant Google Sign-In'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{isRtl ? 'تحديد مستوى تفاعلي' : 'Adaptive Placement Test'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{isRtl ? 'مناسب لجميع أفراد الأسرة' : 'All Ages & Tracks'}</span>
                </div>
              </div>

            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Decorative glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#002147]/20 via-[#C49E3A]/30 to-blue-600/20 rounded-[2.5rem] blur-xl opacity-70" />
                
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
                  
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-sm border border-[#C49E3A]">
                        B
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800 leading-tight">
                          {isRtl ? 'مستشارك الأكاديمي الذكي' : 'Your Smart Academic Co-Pilot'}
                        </p>
                        <p className="text-[10px] text-emerald-600 font-bold">
                          {isRtl ? 'متصل وجاهز للتدريب الصوتي 🎙️' : 'Connected & Ready for Voice 🎙️'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
                      CEFR A1-C2
                    </span>
                  </div>

                  {/* Feature preview elements */}
                  <div className="space-y-3">
                    <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Mic2 size={18} />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-black text-[#002147]">
                          {isRtl ? 'المعلم الصوتي الفوري' : 'Real-time Speaking Coach'}
                        </p>
                        <p className="text-slate-500 text-[11px] truncate">
                          {isRtl ? 'محادثات واقعية مع تصحيح نطق آني' : 'Real-life dialogues with acoustic accuracy'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#C49E3A] text-white flex items-center justify-center shrink-0">
                        <Brain size={18} />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-black text-[#002147]">
                          {isRtl ? 'خطة تعلم تفاعلية ذكية' : 'Personalized Adaptive Roadmap'}
                        </p>
                        <p className="text-slate-500 text-[11px] truncate">
                          {isRtl ? 'جدولة أسبوعية مرنة تناسب وتيرتك' : 'Weekly schedules adapted to your pace'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Baby size={18} />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-black text-[#002147]">
                          {isRtl ? 'مسار الأطفال والطفولة المبكرة' : 'Early Childhood Oasis'}
                        </p>
                        <p className="text-slate-500 text-[11px] truncate">
                          {isRtl ? 'تعليم باللعب والملصقات مع الأسد باسل' : 'Gamified fun with Basil the Lion'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <button
                    onClick={onGetStarted}
                    className="w-full py-3.5 rounded-xl bg-[#002147] hover:bg-[#002c5f] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isRtl ? 'تسجيل الدخول والبدء الآن' : 'Sign In & Get Started'}</span>
                    {isRtl ? <ArrowLeft size={14} className="text-[#C49E3A]" /> : <ArrowRight size={14} className="text-[#C49E3A]" />}
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-[#C49E3A] px-3 py-1 bg-amber-50 rounded-lg inline-block border border-amber-200">
              {isRtl ? 'المسارات الأكاديمية والمهنية' : 'Curricula & Educational Programs'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#002147] tracking-tight">
              {isRtl ? 'برامج شاملة تلائم جميع المستويات والأعمار' : 'Comprehensive Programs for Every Stage'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {isRtl
                ? 'تم بناء جميع البرامج داخل المنصة استناداً إلى مناهج أكسفورد المعيارية وأحدث أساليب التعليم التفاعلي.'
                : 'Engineered from accredited Oxford frameworks and real interactive modules implemented inside the academy.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {programs.map((prog) => {
              const IconComp = prog.icon;
              return (
                <div
                  key={prog.id}
                  className="bg-[#f8fafc] hover:bg-slate-50 border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-lg flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    
                    <div className="flex items-center justify-between gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${prog.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-[11px] font-black text-slate-600 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                        {isRtl ? prog.badgeAr : prog.badgeEn}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#002147] mb-2 leading-snug">
                        {isRtl ? prog.titleAr : prog.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {isRtl ? prog.descAr : prog.descEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 space-y-2">
                      {(isRtl ? prog.featuresAr : prog.featuresEn).map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  <button
                    onClick={onGetStarted}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#002147] hover:text-white text-[#002147] font-black text-xs border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isRtl ? 'استكشف البرنامج' : 'Explore Track'}</span>
                    {isRtl ? <ArrowLeft size={14} className="text-[#C49E3A]" /> : <ArrowRight size={14} className="text-[#C49E3A]" />}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-[#002147] px-3 py-1 bg-blue-50 rounded-lg inline-block border border-blue-200">
              {isRtl ? 'رحلتك في الأكاديمية' : 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#002147] tracking-tight">
              {isRtl ? '3 خطوات بسيطة لبدء رحلة التميز' : '3 Simple Steps to Start Learning'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {isRtl ? 'طريقة عمل المنظومة مصممة لتكون مباشرة وسلسة من اللحظة الأولى.' : 'Engineered for seamless onboarding and immediate value from day one.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, sIdx) => (
              <div 
                key={sIdx} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#002147] text-[#C49E3A] font-black text-lg flex items-center justify-center mb-6 shadow-sm">
                    {st.stepNumber}
                  </div>
                  <h3 className="text-lg font-black text-[#002147] mb-2 leading-snug">
                    {isRtl ? st.titleAr : st.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {isRtl ? st.descAr : st.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-black text-[#C49E3A]">
                  <CheckCircle2 size={14} />
                  <span>{isRtl ? 'خطوة أساسية فورية' : 'Instant Core Step'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 rounded-2xl bg-[#002147] hover:bg-[#002c5f] text-white text-sm sm:text-base font-black shadow-md border-b-4 border-[#C49E3A] active:scale-95 transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>{isRtl ? 'ابدأ خطوتك الأولى الآن 🚀' : 'Start Your First Step Now 🚀'}</span>
              {isRtl ? <ArrowLeft size={16} className="text-[#C49E3A]" /> : <ArrowRight size={16} className="text-[#C49E3A]" />}
            </button>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-[#C49E3A] px-3 py-1 bg-amber-50 rounded-lg inline-block border border-amber-200">
              {isRtl ? 'إجابات واضحة' : 'Clear Answers'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#002147] tracking-tight">
              {isRtl ? 'الأسئلة الشائعة حول الأكاديمية' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {isRtl ? 'كل ما تحتاج لمعرفته قبل بدء تجربتك التعليمية معنا.' : 'Everything you need to know before embarking on your learning journey.'}
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-black text-sm sm:text-base text-[#002147] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{isRtl ? faq.qAr : faq.qEn}</span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100">
                          {isRtl ? faq.aAr : faq.aEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#002147] to-[#001733] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto border border-[#C49E3A]">
            <Sparkles className="text-[#C49E3A]" size={24} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isRtl ? 'جاهز للانطلاق نحو الطلاقة والتفوق؟' : 'Ready to Elevate Your English & Skills?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto">
            {isRtl 
              ? 'سجّل دخولك الآن بضغطة زر، وابدأ بتحديد مستواك وخوض تجربتك التعليمية الممتعة.'
              : 'Sign in with your Google account now, take the placement test, and begin your personalized learning roadmap.'}
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl bg-[#C49E3A] hover:bg-[#b58f31] text-[#002147] text-base font-black shadow-xl active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{isRtl ? 'ابدأ الآن بحساب Google' : 'Start Now with Google'}</span>
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#001a38] text-slate-400 py-12 border-t-4 border-[#C49E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-lg border border-[#C49E3A]">
                B
              </div>
              <div>
                <p className="text-white font-black text-base leading-tight">
                  {isRtl ? 'أكاديمية باسم الخليل' : 'Basim Al-Khalil Academy'}
                </p>
                <p className="text-xs text-[#C49E3A] font-bold">
                  {isRtl ? 'المنصة الرقمية لتعليم الإنجليزية والمهارات الذكية' : 'Digital Academy for English & Future Skills'}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300">
              <button onClick={() => scrollToSection('programs')} className="hover:text-white transition-colors cursor-pointer">
                {isRtl ? 'البرامج' : 'Programs'}
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                {isRtl ? 'كيف يعمل' : 'How It Works'}
              </button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                {isRtl ? 'الأسئلة الشائعة' : 'FAQ'}
              </button>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
            <p>
              {isRtl 
                ? `© ${new Date().getFullYear()} جميع الحقوق محفوظة لأكاديمية باسم الخليل.`
                : `© ${new Date().getFullYear()} Basim Al-Khalil Academy. All rights reserved.`}
            </p>
            <div className="flex items-center gap-4">
              <button onClick={onToggleLang} className="hover:text-white transition-colors cursor-pointer font-bold">
                {isRtl ? 'English Version' : 'النسخة العربية'}
              </button>
              <span>·</span>
              <button onClick={onGetStarted} className="text-[#C49E3A] hover:underline cursor-pointer font-bold">
                {isRtl ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
