
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  ChevronRight, 
  Play, 
  GraduationCap, 
  Search, 
  Sticker, 
  Mic2, 
  Brain, 
  Library,
  ArrowLeft,
  XCircle,
  Pause,
  Lightbulb,
  CheckCircle2,
  Trophy,
  Star,
  Settings,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  Square,
  Quote,
  Zap,
  Layers,
  Code
} from 'lucide-react';

interface GrammarUnit {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  prepQuestionEn: string;
  prepQuestionAr: string;
  explanationEn: string;
  explanationAr: string;
  examples: { id: string; en: string; ar: string; note?: string }[];
  rules: { titleEn: string; titleAr: string; contentEn: string; contentAr: string }[];
}

export type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const ALL_GRAMMAR_UNITS: Record<GrammarLevel, GrammarUnit[]> = {
  A1: [
    {
      id: 'g_a1_1',
      titleEn: 'Parts of Speech Masterclass',
      titleAr: 'ماستر كلاس أقسام الكلام',
      descriptionEn: 'Categorizing reality through nouns, verbs, and descriptors.',
      descriptionAr: 'تصنيف الواقع من خلال الأسماء والأفعال والصفات.',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      prepQuestionEn: 'Can you name three things you see around you right now?',
      prepQuestionAr: 'هل يمكنك تسمية ثلاثة أشياء تراها حولك الآن؟',
      explanationEn: 'Grammar is the skeleton of language. Every word has a specific role: Nouns name things, Verbs describe actions, and Adjectives add detail.',
      explanationAr: 'القواعد هي الهيكل العظمي للغة. كل كلمة لها دور محدد: الأسماء تسمي الأشياء، والأفعال تصف الأفعال، والصفات تضيف التفاصيل.',
      examples: [
        { id: 'ex-1', en: 'The teacher (Noun) eats (Verb) a red (Adjective) apple.', ar: 'المعلم (اسم) يأكل (فعل) تفاحة حمراء (صفة).' },
        { id: 'ex-2', en: 'A fast car drove by.', ar: 'مرت سيارة سريعة.' },
        { id: 'ex-3', en: 'Ali studies at home.', ar: 'علي يدرس في المنزل.' }
      ],
      rules: [
        { titleEn: 'Nouns', titleAr: 'الأسماء', contentEn: 'Names of people, places, or things.', contentAr: 'أسماء الأشخاص أو الأماكن أو الأشياء.' },
        { titleEn: 'Verbs', titleAr: 'الأفعال', contentEn: 'Action or state words.', contentAr: 'كلمات تعبر عن حدث أو حالة.' },
        { titleEn: 'Adjectives', titleAr: 'الصفات', contentEn: 'Describe nouns.', contentAr: 'تصف الأسماء.' }
      ]
    },
    {
      id: 'g_a1_2',
      titleEn: 'Present Simple Universe',
      titleAr: 'عالم المضارع البسيط',
      descriptionEn: 'Mastering the timeline of habits, facts, and daily life.',
      descriptionAr: 'إتقان الجدول الزمني للعادات والحقائق والحياة اليومية.',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      prepQuestionEn: 'What is one thing you do every morning?',
      prepQuestionAr: 'ما هو الشيء الذي تفعله كل صباح؟',
      explanationEn: 'The Present Simple is for things that are true now or happen often. Remember the "s" for He, She, and It!',
      explanationAr: 'المضارع البسيط هو للأشياء التي تعتبر حقيقية الآن أو تحدث غالباً. تذكر إضافة "s" مع He و She و It!',
      examples: [
        { id: 'ps-1', en: 'I drink coffee every day.', ar: 'أنا أشرب القهوة كل يوم.' },
        { id: 'ps-2', en: 'She works in an office.', ar: 'هي تعمل في مكتب.' },
        { id: 'ps-3', en: 'The sun rises in the east.', ar: 'تشرق الشمس من الشرق.' }
      ],
      rules: [
        { titleEn: 'Usage', titleAr: 'الاستخدام', contentEn: 'Habits and general truths.', contentAr: 'العادات والحقائق العامة.' },
        { titleEn: 'The "S" Rule', titleAr: 'قاعدة الـ S', contentEn: 'Add -s to verbs with He/She/It.', contentAr: 'أضف -s للأفعال مع هو/هي/لغير العاقل.' }
      ]
    },
    {
      id: 'g_a1_3',
      titleEn: 'Singular & Plural Logic',
      titleAr: 'منطق المفرد والجمع',
      descriptionEn: 'Quantifying existence through linguistic plurality.',
      descriptionAr: 'تحديد الكمية من خلال التعدد اللغوي.',
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50',
      prepQuestionEn: 'How do we talk about more than one item?',
      prepQuestionAr: 'كيف نتحدث عن أكثر من شيء واحد؟',
      explanationEn: 'Most nouns add -s to become plural. But some are special and change differently!',
      explanationAr: 'معظم الأسماء تضيف -s لتصبح جمعاً. لكن بعضها خاص ويتغير بشكل مختلف!',
      examples: [
        { id: 'sp-1', en: 'One apple -> Two apples.', ar: 'تفاحة واحدة -> تفاحتان.' },
        { id: 'sp-2', en: 'One box -> Three boxes.', ar: 'صندوق واحد -> ثلاثة صناديق.' },
        { id: 'sp-3', en: 'One child -> Many children.', ar: 'طفل واحد -> أطفال كثيرون.' }
      ],
      rules: [
        { titleEn: 'The General Rule', titleAr: 'القاعدة العامة', contentEn: 'Add -s to make a noun plural.', contentAr: 'أضف -s لتحويل الاسم إلى جمع.' },
        { titleEn: 'ES Ending', titleAr: 'نهاية ES', contentEn: 'Add -es for nouns ending in s, x, ch, sh.', contentAr: 'أضف -es للأسماء التي تنتهي بـ s, x, ch, sh.' }
      ]
    }
  ],
  A2: [
    {
      id: 'g_a2_1',
      titleEn: 'Past Simple Logic',
      titleAr: 'منطق الماضي البسيط',
      descriptionEn: 'Chronological anchoring through completed past events.',
      descriptionAr: 'الاستناد الزمني من خلال الأحداث الماضية المكتملة.',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50',
      prepQuestionEn: 'Where were you yesterday at this time?',
      prepQuestionAr: 'أين كنت أمس في مثل هذا الوقت؟',
      explanationEn: 'The Past Simple talks about things that finished in the past. Regular verbs end in -ed, but watch out for the irregular ones!',
      explanationAr: 'يتحدث الماضي البسيط عن أشياء انتهت في الماضي. تنتهي الأفعال المنتظمة بـ -ed، ولكن انتبه للأفعال غير المنتظمة!',
      examples: [
        { id: 'past-1', en: 'I visited London last year.', ar: 'زرت لندن العام الماضي.' },
        { id: 'past-2', en: 'They went to the park yesterday.', ar: 'ذهبوا إلى الحديقة أمس.' },
        { id: 'past-3', en: 'He spoke to the manager.', ar: 'تحدث هو إلى المدير.' }
      ],
      rules: [
        { titleEn: 'Regular Verbs', titleAr: 'الأفعال المنتظمة', contentEn: 'Add -ed to the base form.', contentAr: 'أضف -ed للمصدر.' },
        { titleEn: 'Irregular Verbs', titleAr: 'الأفعال غير المنتظمة', contentEn: 'Must be memorized separately.', contentAr: 'يجب حفظها بشكل منفصل.' }
      ]
    },
    {
      id: 'g_a2_3',
      titleEn: 'Elite Comparison',
      titleAr: 'المقارنة الفائقة',
      descriptionEn: 'Evaluating quality and scale through comparative structures.',
      descriptionAr: 'تقييم الجودة والمقياس من خلال تراكيب المقارنة.',
      color: 'bg-cyan-600',
      lightColor: 'bg-cyan-50',
      prepQuestionEn: 'Which is faster: a train or a car?',
      prepQuestionAr: 'أيهما أسرع: القطار أم السيارة؟',
      explanationEn: 'Use -er or "more" to compare two things. For long adjectives, "more" is your best friend!',
      explanationAr: 'استخدم -er أو "more" للمقارنة بين شيئين. للصفات الطويلة، "more" هي صديقك المفضل!',
      examples: [
        { id: 'comp-1', en: 'A car is faster than a bike.', ar: 'السيارة أسرع من الدراجة.' },
        { id: 'comp-2', en: 'English is more interesting than math.', ar: 'اللغة الإنجليزية أكثر إثارة من الرياضيات.' },
        { id: 'comp-3', en: 'He is taller than his brother.', ar: 'هو أطول من أخيه.' }
      ],
      rules: [
        { titleEn: 'Short Adjectives', titleAr: 'الصفات القصيرة', contentEn: 'Adjective + -er + than.', contentAr: 'الصفة + er + than.' },
        { titleEn: 'Long Adjectives', titleAr: 'الصفات الطويلة', contentEn: 'More + adjective + than.', contentAr: 'More + الصفة + than.' }
      ]
    }
  ],
  B1: [
    {
      id: 'g_b1_1',
      titleEn: 'Present Perfect Bridge',
      titleAr: 'جسر المضارع التام',
      descriptionEn: 'The intersection of past experiences and current reality.',
      descriptionAr: 'نقطة التقاء التجارب الماضية والواقع الحالي.',
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50',
      prepQuestionEn: 'Have you ever traveled to a country with a different language?',
      prepQuestionAr: 'هل سبق لك السفر إلى بلد بلغة مختلفة؟',
      explanationEn: 'The Present Perfect connects the past to the present. We use it for experiences or things that happened at an unspecified time.',
      explanationAr: 'يربط المضارع التام الماضي بالحاضر. نستخدمه للتجارب أو الأشياء التي حدثت في وقت غير محدد.',
      examples: [
        { id: 'pp-1', en: 'I have finished my homework.', ar: 'لقد انتهيت من واجبي المنزلي.' },
        { id: 'pp-2', en: 'She has lived here for ten years.', ar: 'هي تعيش هنا منذ عشر سنوات.' },
        { id: 'pp-3', en: 'We have never seen that movie.', ar: 'لم يسبق لنا مشاهدة ذلك الفيلم.' }
      ],
      rules: [
        { titleEn: 'Structure', titleAr: 'الهيكل', contentEn: 'Have/Has + Past Participle (V3).', contentAr: 'Have/Has + التصريف الثالث للفعل.' },
        { titleEn: 'Unspecified Time', titleAr: 'وقت غير محدد', contentEn: 'Use when the exact time is not important.', contentAr: 'يستخدم عندما لا يكون الوقت المحدد مهماً.' }
      ]
    },
    {
      id: 'g_b1_4',
      titleEn: 'Conditionals: The Logic of If',
      titleAr: 'الشرطية: منطق الـ If',
      descriptionEn: 'Navigating hypothetical scenarios and predictable outcomes.',
      descriptionAr: 'التنقل عبر السيناريوهات الافتراضية والنتائج المتوقعة.',
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50',
      prepQuestionEn: 'What will you do if it rains tomorrow?',
      prepQuestionAr: 'ماذا ستفعل إذا أمطرت غداً؟',
      explanationEn: 'Conditionals help us talk about results based on specific conditions. The First Conditional is for real possibilities.',
      explanationAr: 'تساعدنا الجمل الشرطية في التحدث عن النتائج بناءً على شروط محددة. الشرط الأول هو للاحتمالات الحقيقية.',
      examples: [
        { id: 'cond-1', en: 'If it rains, I will stay at home.', ar: 'إذا أمطرت، سأبقى في المنزل.' },
        { id: 'cond-2', en: 'If you study hard, you will pass.', ar: 'إذا درست بجد، ستنجح.' }
      ],
      rules: [
        { titleEn: 'First Conditional', titleAr: 'الحالة الشرطية الأولى', contentEn: 'If + Present Simple, Will + Verb.', contentAr: 'If + مضارع بسيط، Will + فعل.' }
      ]
    }
  ],
  B2: [
    {
      id: 'g_b2_1',
      titleEn: 'Passive Voice Mastery',
      titleAr: 'إتقان المبني للمجهول',
      descriptionEn: 'Shifting focus from the actor to the action itself.',
      descriptionAr: 'تحويل التركيز من الفاعل إلى الفعل نفسه.',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      prepQuestionEn: 'Is the result often more important than who did it?',
      prepQuestionAr: 'هل تكون النتيجة غالباً أهم من الشخص الذي قام بها؟',
      explanationEn: 'In the Passive Voice, the object becomes the subject. It is used when we don\'t know or don\'t care who did the action.',
      explanationAr: 'في المبني للمجهول، يصبح المفعول به هو الفاعل. يتم استخدامه عندما لا نعرف أو لا نهتم بمن قام بالفعل.',
      examples: [
        { id: 'pv-1', en: 'The bridge was built in 1920.', ar: 'بُني الجسر في عام 1920.' },
        { id: 'pv-2', en: 'New laws are being discussed.', ar: 'تتم مناقشة قوانين جديدة.' },
        { id: 'pv-3', en: 'Active: Ali ate the cake. Passive: The cake was eaten by Ali.', ar: 'نشط: علي أكل الكعكة. مجهول: أكل علي الكعكة.' }
      ],
      rules: [
        { titleEn: 'Formation', titleAr: 'التكوين', contentEn: 'Be + Past Participle.', contentAr: 'فعل (Be) + التصريف الثالث.' },
        { titleEn: 'Emphasis', titleAr: 'التأكيد', contentEn: 'Focus on the receiver of the action.', contentAr: 'التركيز على مستقبل الفعل.' }
      ]
    }
  ],
  C1: [
    {
      id: 'g_c1_1',
      titleEn: 'Inversion Techniques',
      titleAr: 'تقنيات القلب (Inversion)',
      descriptionEn: 'Dramatic emphasis through reversed syntactic structures.',
      descriptionAr: 'التأكيد الدرامي من خلال تراكيب نحوية مقلوبة.',
      color: 'bg-slate-900',
      lightColor: 'bg-slate-50',
      prepQuestionEn: 'How can you make a sentence sound more formal or dramatic?',
      prepQuestionAr: 'كيف يمكنك جعل الجملة تبدو أكثر رسمية أو درامية؟',
      explanationEn: 'Inversion happens when the verb comes before the subject. It is often used after certain negative adverbs to add emphasis.',
      explanationAr: 'يحدث القلب عندما يسبق الفعل الفاعل. غالباً ما يستخدم بعد ظروف سلبية معينة لإضافة التأكيد.',
      examples: [
        { id: 'inv-1', en: 'Never have I seen such a beautiful sight.', ar: 'لم يسبق لي أن رأيت مثل هذا المنظر الجميل.' },
        { id: 'inv-2', en: 'Seldom does he complain.', ar: 'نادراً ما يشتكي.' },
        { id: 'inv-3', en: 'Hardly had I arrived when the phone rang.', ar: 'بمجرد وصولي رن الهاتف.' }
      ],
      rules: [
        { titleEn: 'Negative Adverbs', titleAr: 'الظروف السلبية', contentEn: 'Never, Seldom, Hardly, Rarely.', contentAr: 'أبداً، نادراً، بالكاد.' },
        { titleEn: 'Structure Shift', titleAr: 'تحول الهيكل', contentEn: 'Adverb + Auxiliary Verb + Subject + Main Verb.', contentAr: 'الظرف + الفعل المساعد + الفاعل + الفعل الرئيسي.' }
      ]
    }
  ],
  C2: [
    {
      id: 'g_c2_1',
      titleEn: 'Syntactic Fluidity',
      titleAr: 'السيولة النحوية والبراعة',
      descriptionEn: 'The artistic mastery of complex sentence architecture.',
      descriptionAr: 'الإتقان الفني لهندسة الجمل المعقدة.',
      color: 'bg-zinc-950',
      lightColor: 'bg-zinc-50',
      prepQuestionEn: 'Can grammar be used as a creative tool for expression?',
      prepQuestionAr: 'هل يمكن استخدام القواعد كأداة إبداعية للتعبير؟',
      explanationEn: 'At the C2 level, grammar is about nuance and register. It involves using structures intuitively to convey precise meaning and tone.',
      explanationAr: 'في مستوى C2، تتعلق القواعد بالفروق الدقيقة والسياق. يتضمن استخدام الهياكل بشكل حدسي لنقل المعنى والنبرة بدقة.',
      examples: [
        { id: 'sf-1', en: 'Should you find yourself in need of assistance, do not hesitate to reach out.', ar: 'إذا وجدت نفسك بحاجة لمساعدة، فلا تتردد في التواصل.' },
        { id: 'sf-2', en: 'Such was her disappointment that she left immediately.', ar: 'بلغت خيبة أملها حداً جعلها تغادر فوراً.' },
        { id: 'sf-3', en: 'Not only did he win, but he also broke the record.', ar: 'لم يكتفِ بالفوز فحسب، بل حطم الرقم القياسي أيضاً.' }
      ],
      rules: [
        { titleEn: 'Subjunctive Mood', titleAr: 'صيغة التمني/الفرض', contentEn: 'Expressing wishes, suggestions, or hypothetical situations.', contentAr: 'التعبير عن الأمنيات أو الاقتراحات أو المواقف الافتراضية.' },
        { titleEn: 'Nominalization', titleAr: 'التحويل لأسماء', contentEn: 'Using noun phrases to create more academic or concise text.', contentAr: 'استخدام العبارات الاسمية لإنشاء نص أكثر أكاديمية أو إيجازاً.' }
      ]
    }
  ]
};

export const GrammarCurriculumCompanion = ({ 
  lang, 
  level = 'A1', 
  onBack, 
  onStartLesson,
  initialUnitId 
}: { 
  lang: 'en' | 'ar', 
  level?: GrammarLevel, 
  onBack: () => void, 
  onStartLesson: (unitId: string) => void,
  initialUnitId?: string | null
}) => {
  const [selectedUnit, setSelectedUnit] = useState<GrammarUnit | null>(null);

  // Auto-select unit if initialUnitId is provided
  useEffect(() => {
    if (initialUnitId) {
      const unit = ALL_GRAMMAR_UNITS[level].find(u => u.id === initialUnitId);
      if (unit) {
        setSelectedUnit(unit);
        setActiveTab('examples'); // Switch to examples tab when auto-starting
      }
    }
  }, [initialUnitId, level]);
  const [activeTab, setActiveTab] = useState<'rules' | 'examples' | 'lab'>('lab');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const units = ALL_GRAMMAR_UNITS[level];

  const handleSpeech = (text: string, voiceLang: string = 'en-US', id: string) => {
    if (speakingId === id) {
      handleStopSpeech();
      return;
    }
    handleStopSpeech();
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    utterance.rate = 0.9;
    utterance.onstart = () => { setSpeakingId(id); setIsSpeaking(true); };
    utterance.onend = () => { setSpeakingId(null); setIsSpeaking(false); };
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeakingId(null);
    setIsSpeaking(false);
  };

  const levelInfoAr = {
    A1: 'أساسيات البناء',
    A2: 'التوسع الزمني',
    B1: 'الربط والمرونة',
    B2: 'التركيب المتقدم',
    C1: 'الاحتراف اللغوي',
    C2: 'الإتقان والبراعة'
  };

  const levelInfoEn = {
    A1: 'Foundational Structures',
    A2: 'Temporal Expansion',
    B1: 'Bridge & Flexibility',
    B2: 'Advanced Synthesis',
    C1: 'Linguistic Mastery',
    C2: 'Philosophical Nuance'
  };

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={selectedUnit ? () => setSelectedUnit(null) : onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#002147] transition-all active:scale-95"
          >
            <ArrowLeft className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C49E3A] text-[#002147] rounded-xl shadow-lg shadow-[#C49E3A]/20">
              <Zap size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#002147] leading-none uppercase tracking-tighter">
                {isRtl ? 'منهج القواعد المطور' : 'Elite Grammar Curriculum'}
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                Level {level} • {isRtl ? levelInfoAr[level] : levelInfoEn[level]}
              </p>
            </div>
          </div>
        </div>
        
        {selectedUnit && (
          <div className="hidden md:flex bg-slate-50 p-1 rounded-2xl border border-slate-200">
            {[
              { id: 'lab', label: isRtl ? 'المنطق' : 'Logistics', icon: Brain },
              { id: 'rules', label: isRtl ? 'القواعد' : 'Rules', icon: Code },
              { id: 'examples', label: isRtl ? 'الأمثلة' : 'Examples', icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#002147] shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1 text-[#C49E3A]">
              <Trophy size={14} />
              <span className="text-xs font-black">Elite Status</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-[#002147] font-black">
             {level}
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedUnit ? (
            <motion.div 
              key="unit-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-[#002147]">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-black leading-tight flex items-center gap-4 flex-wrap">
                    {isRtl ? 'قواعد المستوى' : 'Level'} <span className="text-[#C49E3A]">{level}</span>
                    {isRtl ? 'المطورة' : 'Elite Units'}
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
                    {isRtl 
                      ? `تعلم القواعد بذكاء وليس بجهد. مناهج مصممة لربط القواعد بالمنطق اللغوي في سياقات حقيقية.` 
                      : `Learn grammar smarter, not harder. Curricula designed to link grammar to linguistic logic in real-world contexts.`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {units.map((unit, idx) => (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedUnit(unit)}
                    className="group bg-white rounded-[2.5rem] p-8 pb-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${unit.color} opacity-5 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${unit.lightColor} ${unit.color.replace('bg-', 'text-')} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                      <Zap size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-[#C49E3A] transition-colors">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                       {isRtl ? unit.descriptionAr : unit.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 group-hover:bg-[#002147] group-hover:text-white transition-all uppercase tracking-widest">
                          Analyze Logic
                       </div>
                       <ChevronRight size={20} className={`${isRtl ? 'rotate-180' : ''} text-slate-300 group-hover:text-[#C49E3A] transition-colors`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unit-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className={`${selectedUnit.lightColor} ${selectedUnit.color.replace('bg-', 'text-')} px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest`}>
                      {isRtl ? 'وحدة القواعد' : 'Grammar Module'}
                    </span>
                    <span className="text-slate-300 font-black">/</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{selectedUnit.id}</span>
                  </div>
                  <h2 className="text-5xl font-black text-[#002147] leading-tight">
                    {isRtl ? selectedUnit.titleAr : selectedUnit.titleEn}
                  </h2>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
                    {isRtl ? selectedUnit.descriptionAr : selectedUnit.descriptionEn}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => onStartLesson(selectedUnit.id)}
                      className="px-10 py-5 bg-[#002147] text-white rounded-[2rem] font-black text-sm flex items-center gap-3 hover:bg-[#C49E3A] transition-all shadow-xl"
                    >
                      <Play size={20} fill="currentColor" />
                      {isRtl ? 'تعمق في القواعد' : 'Deep Dive Theory'}
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-[#002147] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <Brain className="text-[#C49E3A]" size={32} />
                        <div className="flex gap-2">
                           <button 
                             onClick={() => handleSpeech(selectedUnit.prepQuestionEn, 'en-US', 'prep-en')}
                             className={`p-2 rounded-lg transition-all flex items-center gap-1 ${speakingId === 'prep-en' ? 'bg-[#C49E3A] text-white scale-110' : 'bg-white/10 hover:bg-white/20'}`}
                           >
                             <Volume2 size={16} />
                           </button>
                        </div>
                      </div>
                      
                      <p className="text-xs font-black uppercase tracking-widest text-[#C49E3A] mb-2 relative z-10">
                        {isRtl ? 'التهيئة الذهنية اللغوية' : 'Linguistic Preparation'}
                      </p>
                      <p className="text-sm font-bold leading-relaxed mb-6 relative z-10">
                         {isRtl ? selectedUnit.prepQuestionAr : selectedUnit.prepQuestionEn}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-white/10 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Example Logic</p>
                        {selectedUnit.examples.slice(0, 2).map((ex) => (
                          <div key={ex.id} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                            <p className="text-xs font-black leading-relaxed">{ex.en}</p>
                            {speakingId === ex.id ? (
                               <button onClick={handleStopSpeech} className="mt-2 text-[10px] text-rose-400 font-black uppercase tracking-widest">Stop</button>
                            ) : (
                               <button onClick={() => handleSpeech(ex.en, 'en-US', ex.id)} className="mt-2 text-[10px] text-[#C49E3A] font-black uppercase tracking-widest hover:underline">Listen Logic</button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm mt-12 min-h-[600px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-[#f8fafc]/50 -skew-x-12 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 border-b border-slate-100 pb-12">
                    {[
                      { id: 'lab', label: isRtl ? 'جوهر القاعدة' : 'The Core Logic', icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                      { id: 'rules', label: isRtl ? 'المخطط النحوي' : 'Grammar Schema', icon: Code, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { id: 'examples', label: isRtl ? 'الأمثلة الحية' : 'Live Examples', icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-6 px-10 rounded-3xl flex items-center justify-center gap-3 transition-all ${
                          activeTab === tab.id 
                            ? 'bg-[#002147] text-white shadow-2xl scale-105' 
                            : 'bg-slate-50 text-slate-400 hover:text-slate-600 font-bold'
                        }`}
                      >
                        <tab.icon size={20} />
                        <span className="text-xs uppercase tracking-widest">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === 'lab' && (
                      <motion.div key="lab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-10 max-w-4xl mx-auto">
                        <Zap size={48} className="text-[#C49E3A] mb-8" />
                        <h3 className="text-3xl font-black text-[#002147] mb-8">{isRtl ? 'المنطق النحوي لهذه الوحدة' : 'Grammatical Logic of this Unit'}</h3>
                        <div className="w-full p-10 md:p-14 bg-[#002147] text-white rounded-[3.5rem] mb-12 shadow-2xl relative group">
                           <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                              <Quote size={80} />
                           </div>
                           <p className="text-2xl md:text-3xl font-medium leading-relaxed relative z-10 italic">
                              {isRtl ? selectedUnit.explanationAr : selectedUnit.explanationEn}
                           </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                           <button 
                             onClick={() => handleSpeech(selectedUnit.explanationEn, 'en-US', 'core-en')} 
                             className={`px-12 py-6 rounded-full font-black text-sm flex items-center gap-3 transition-all ${speakingId === 'core-en' ? 'bg-[#C49E3A] text-[#002147] scale-105 shadow-xl' : 'bg-[#002147] text-white hover:bg-[#002147]/90'}`}
                           >
                              {speakingId === 'core-en' ? <Pause size={20} /> : <Volume2 size={20} />} 
                              {isRtl ? 'استماع للمنطق (EN)' : 'Listen to Logic (EN)'}
                           </button>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'rules' && (
                      <motion.div key="rules" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {selectedUnit.rules.map((rule, idx) => (
                          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <Code size={24} />
                             </div>
                             <h4 className="text-xl font-black text-[#002147] mb-3">{isRtl ? rule.titleAr : rule.titleEn}</h4>
                             <p className="text-slate-500 font-medium leading-relaxed">
                                {isRtl ? rule.contentAr : rule.contentEn}
                             </p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'examples' && (
                      <motion.div key="examples" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                         {selectedUnit.examples.map((ex) => (
                           <div key={ex.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white hover:shadow-xl hover:border-transparent transition-all">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                   <div className="w-2 h-2 bg-[#C49E3A] rounded-full" />
                                   <p className="text-xl font-black text-[#002147] group-hover:text-[#C49E3A] transition-colors">{ex.en}</p>
                                </div>
                                <p className="text-slate-400 font-bold ml-5">{ex.ar}</p>
                              </div>
                              <button 
                                onClick={() => handleSpeech(ex.en, 'en-US', `ex-list-${ex.id}`)}
                                className={`px-6 py-4 rounded-2xl font-black text-xs flex items-center gap-2 transition-all ${speakingId === `ex-list-${ex.id}` ? 'bg-[#002147] text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-[#002147] hover:text-white shadow-sm'}`}
                              >
                                {speakingId === `ex-list-${ex.id}` ? <Pause size={14} /> : <Volume2 size={14} />}
                                {isRtl ? 'استماع' : 'Listen'}
                              </button>
                           </div>
                         ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-20 text-center space-y-4">
         <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full" />
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Grammar Logic Engine © 2026</p>
      </footer>
    </div>
  );
};
