
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenTool, 
  ChevronRight, 
  Play, 
  Brain, 
  ArrowLeft,
  Pause,
  Trophy,
  Volume2,
  Quote,
  Zap,
  Layers,
  FileText,
  Type,
  Edit3
} from 'lucide-react';

interface WritingUnit {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  prepQuestionEn: string;
  prepQuestionAr: string;
  conceptEn: string;
  conceptAr: string;
  vocabulary: { id: string; en: string; ar: string; note?: string }[];
  structures: { titleEn: string; titleAr: string; contentEn: string; contentAr: string }[];
}

export type WritingLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const ALL_WRITING_UNITS: Record<WritingLevel, WritingUnit[]> = {
  A1: [
    {
      id: 'w_a1_1',
      titleEn: 'Foundations: The Sentence Lab',
      titleAr: 'الأساسيات: مختبر الجملة',
      descriptionEn: 'Building the fundamental blocks of written thought.',
      descriptionAr: 'بناء اللبنات الأساسية للفكر المكتوب.',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      prepQuestionEn: 'What is the most important part of a sentence?',
      prepQuestionAr: 'ما هو أهم جزء في الجملة؟',
      conceptEn: 'Every great piece of writing starts with a simple, clear sentence. Mastering the Subject-Verb-Object structure is your first step to clarity.',
      conceptAr: 'تبدأ كل كتابة عظيمة بجملة بسيطة وواضحة. إتقان هيكل (الفاعل-الفعل-المفعول به) هو خطوتك الأولى نحو الوضوح.',
      vocabulary: [
        { id: 'v-1', en: 'Subject', ar: 'الفاعل' },
        { id: 'v-2', en: 'Predicate', ar: 'الخبر/المسند' },
        { id: 'v-3', en: 'Punctuation', ar: 'علامات الترقيم' }
      ],
      structures: [
        { titleEn: 'The SVO Pattern', titleAr: 'نمط SVO', contentEn: 'Who did what to whom.', contentAr: 'من فعل ماذا ولمن.' },
        { titleEn: 'Capitalization', titleAr: 'استخدام الحروف الكبيرة', contentEn: 'Names and starts of sentences.', contentAr: 'الأسماء وبدايات الجمل.' }
      ]
    },
    {
      id: 'w_a1_2',
      titleEn: 'Digital Communication Basics',
      titleAr: 'أساسيات التواصل الرقمي',
      descriptionEn: 'Crafting brief, clear messages for a digital world.',
      descriptionAr: 'صياغة رسائل قصيرة وواضحة لعالم رقمي.',
      color: 'bg-teal-600',
      lightColor: 'bg-teal-50',
      prepQuestionEn: 'Why is brevity important in text messages?',
      prepQuestionAr: 'لماذا الإيجاز مهم في الرسائل النصية؟',
      conceptEn: 'Digital writing requires speed and precision. Learn to convey your point without unnecessary fluff.',
      conceptAr: 'تتطلب الكتابة الرقمية السرعة والدقة. تعلم إيصال وجهة نظرك دون حشو غير ضروري.',
      vocabulary: [
        { id: 'v-4', en: 'Concise', ar: 'موجز' },
        { id: 'v-5', en: 'Greeting', ar: 'تحية' },
        { id: 'v-6', en: 'Closing', ar: 'خاتمة' }
      ],
      structures: [
        { titleEn: 'Imperative Mood', titleAr: 'صيغة الأمر', contentEn: 'Giving instructions or making requests.', contentAr: 'إعطاء التعليمات أو تقديم الطلبات.' }
      ]
    }
  ],
  A2: [
    {
      id: 'w_a2_1',
      titleEn: 'Chronological Narratives',
      titleAr: 'السرد الزمني المتسلسل',
      descriptionEn: 'Structuring simple stories and daily logs.',
      descriptionAr: 'هيكلة القصص البسيطة والسجلات اليومية.',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50',
      prepQuestionEn: 'How do you sequence events in a story?',
      prepQuestionAr: 'كيف ترتب الأحداث في القصة؟',
      conceptEn: 'Using "First", "Then", and "Finally" transforms a list of facts into a narrative flow.',
      conceptAr: 'استخدام كلمات مثل "أولاً"، "ثم"، و "أخيراً" يحول قائمة الحقائق إلى تدفق سردي.',
      vocabulary: [
        { id: 'v-1', en: 'Sequence', ar: 'تسلسل' },
        { id: 'v-2', en: 'Timeline', ar: 'خط زمني' },
        { id: 'v-3', en: 'Transition', ar: 'انتقال' }
      ],
      structures: [
        { titleEn: 'Time Linkers', titleAr: 'روابط الزمن', contentEn: 'First, Next, After that, Finally.', contentAr: 'أولاً، تالياً، بعد ذلك، أخيراً.' }
      ]
    },
    {
      id: 'w_a2_2',
      titleEn: 'The Art of the Personal Profile',
      titleAr: 'فن الملف الشخصي',
      descriptionEn: 'Presenting yourself with clarity and impact.',
      descriptionAr: 'تقديم نفسك بوضوح وتأثير.',
      color: 'bg-fuchsia-600',
      lightColor: 'bg-fuchsia-50',
      prepQuestionEn: 'What three words define your writing legacy?',
      prepQuestionAr: 'ما هي الكلمات الثلاث التي تحدد إرثك الكتابي؟',
      conceptEn: 'A profile is a micro-biography. It requires balancing facts with a touch of personality.',
      conceptAr: 'الملف الشخصي هو سيرة ذاتية مصغرة. يتطلب الموازنة بين الحقائق ولمسة من الشخصية.',
      vocabulary: [
        { id: 'v-4', en: 'Aspiration', ar: 'طموح' },
        { id: 'v-5', en: 'Competence', ar: 'كفاءة' },
        { id: 'v-6', en: 'Attribute', ar: 'سمة/صفة' }
      ],
      structures: [
        { titleEn: 'Adjective Clauses', titleAr: 'جمل الصفة', contentEn: 'Adding specific details to nouns.', contentAr: 'إضافة تفاصيل محددة للأسماء.' }
      ]
    }
  ],
  B1: [
    {
      id: 'w_b1_1',
      titleEn: 'Descriptive Synergy',
      titleAr: 'التآزر الوصفي',
      descriptionEn: 'Painting pictures with adjectives and sensory details.',
      descriptionAr: 'رسم الصور باستخدام الصفات والتفاصيل الحسية.',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      prepQuestionEn: 'Can you describe a room using only your senses?',
      prepQuestionAr: 'هل يمكنك وصف غرفة باستخدام حواسك فقط؟',
      conceptEn: 'B1 writing is about adding depth. Instead of saying "The car is fast", say "The crimson engine roared as it accelerated".',
      conceptAr: 'تتعلق كتابة B1 بإضافة العمق. بدلاً من قول "السيارة سريعة"، قل "زأر المحرك القرمزي أثناء تسارعه".',
      vocabulary: [
        { id: 'v-1', en: 'Nuance', ar: 'فوارق دقيقة' },
        { id: 'v-2', en: 'Sensory', ar: 'حسي' },
        { id: 'v-3', en: 'Vivid', ar: 'حيوي/واضح' }
      ],
      structures: [
        { titleEn: 'Adjective Stacking', titleAr: 'تراكم الصفات', contentEn: 'Opinion, Size, Age, Shape, Color, Origin, Material, Purpose.', contentAr: 'الرأي، الحجم، العمر، الشكل، اللون، الأصل، المادة، الغرض.' }
      ]
    },
    {
      id: 'w_b1_2',
      titleEn: 'Discursive Foundations',
      titleAr: 'أسس النقاش الكتابي',
      descriptionEn: 'Organizing thoughts for and against a topic.',
      descriptionAr: 'تنظيم الأفكار المؤيدة والمعارضة لموضوع ما.',
      color: 'bg-sky-600',
      lightColor: 'bg-sky-50',
      prepQuestionEn: 'Is it better to focus on one side or show balance?',
      prepQuestionAr: 'هل من الأفضل التركيز على جانب واحد أم إظهار التوازن؟',
      conceptEn: 'Discursive writing explores multiple perspectives. Use contrasting links to show intellectual range.',
      conceptAr: 'تستكشف الكتابة النقاشية وجهات نظر متعددة. استخدم روابط التباين لإظهار النطاق الفكري.',
      vocabulary: [
        { id: 'v-4', en: 'Contrast', ar: 'تباين' },
        { id: 'v-5', en: 'Perspective', ar: 'وجهة نظر' },
        { id: 'v-6', en: 'Logical', ar: 'منطقي' }
      ],
      structures: [
        { titleEn: 'Contrast Connectors', titleAr: 'موصلات التباين', contentEn: 'However, On the other hand, Conversely.', contentAr: 'ومع ذلك، من ناحية أخرى، بالعكس.' }
      ]
    }
  ],
  B2: [
    {
      id: 'w_b2_1',
      titleEn: 'The Persuasive Essay',
      titleAr: 'المقال الإقناعي',
      descriptionEn: 'Architecting arguments and logical persuasion.',
      descriptionAr: 'هندسة الحجج والإقناع المنطقي.',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      prepQuestionEn: 'What makes an argument logically sound?',
      prepQuestionAr: 'ما الذي يجعل الحجة سليمة منطقياً؟',
      conceptEn: 'B2 writing requires a clear thesis and supporting evidence. Use data and logical reasoning to lead the reader.',
      conceptAr: 'تتطلب كتابة B2 أطروحة واضحة وأدلة داعمة. استخدم البيانات والمنطق لقيادة القارئ.',
      vocabulary: [
        { id: 'v-1', en: 'Thesis', ar: 'أطروحة' },
        { id: 'v-2', en: 'Evidence', ar: 'دليل' },
        { id: 'v-3', en: 'Counter-argument', ar: 'حجة مضادة' }
      ],
      structures: [
        { titleEn: 'PEEL Method', titleAr: 'طريقة PEEL', contentEn: 'Point, Evidence, Explanation, Link.', contentAr: 'النقطة، الدليل، الشرح، الربط.' }
      ]
    },
    {
      id: 'w_b2_2',
      titleEn: 'The Professional Executive Log',
      titleAr: 'السجل التنفيذي المهني',
      descriptionEn: 'Reporting professional progress with authority.',
      descriptionAr: 'الإبلاغ عن التقدم المهني بسلطة وثقة.',
      color: 'bg-violet-600',
      lightColor: 'bg-violet-50',
      prepQuestionEn: 'How can you show progress without being overly boastful?',
      prepQuestionAr: 'كيف يمكنك إظهار التقدم دون المبالغة في التباهي؟',
      conceptEn: 'At B2, professional tone is key. Use action verbs and quantifiable results to show impact.',
      conceptAr: 'في B2، النبرة المهنية هي المفتاح. استخدم أفعال الحركة والنتائج القابلة للقياس لإظهار التأثير.',
      vocabulary: [
        { id: 'v-4', en: 'Milestone', ar: 'حدث هام/علامة فارقة' },
        { id: 'v-5', en: 'KPI', ar: 'مؤشر أداء رئيسي' },
        { id: 'v-6', en: 'Strategic', ar: 'استراتيجي' }
      ],
      structures: [
        { titleEn: 'Nominalization', titleAr: 'تحويل الأفعال لأسماء', contentEn: 'Turning verbs into nouns for a more formal tone.', contentAr: 'تحويل الأفعال إلى أسماء للحصول على نبرة أكثر رسمية.' }
      ]
    }
  ],
  C1: [
    {
      id: 'w_c1_1',
      titleEn: 'Professional Synthesized Writing',
      titleAr: 'الكتابة المهنية التركيبية',
      descriptionEn: 'Mastering the formal register and academic precision.',
      descriptionAr: 'إتقان السجل الرسمي والدقة الأكاديمية.',
      color: 'bg-slate-900',
      lightColor: 'bg-slate-50',
      prepQuestionEn: 'How does formal writing differ from social interaction?',
      prepQuestionAr: 'كيف تختلف الكتابة الرسمية عن التفاعل الاجتماعي؟',
      conceptEn: 'At C1, you must synthesize multiple viewpoints into a cohesive, professional document while maintaining a neutral tone.',
      conceptAr: 'في C1، يجب عليك دمج وجهات نظر متعددة في وثيقة مهنية متماسكة مع الحفاظ على نبرة محايدة.',
      vocabulary: [
        { id: 'v-1', en: 'Synthesis', ar: 'تركيب/دمج' },
        { id: 'v-2', en: 'Objective', ar: 'موضوعي' },
        { id: 'v-3', en: 'Syntactic', ar: 'نحوي/تركيبي' }
      ],
      structures: [
        { titleEn: 'Passive Precision', titleAr: 'الدقة في المجهول', contentEn: 'Using passive voice to emphasize results.', contentAr: 'استخدام المبني للمجهول للتركيز على النتائج.' }
      ]
    },
    {
      id: 'w_c1_2',
      titleEn: 'Critical Review & Meta-Analysis',
      titleAr: 'المراجعة النقدية والتحليل الميتافيزيقي',
      descriptionEn: 'Evaluating arguments with high-level skepticism.',
      descriptionAr: 'تقييم الحجج بشكوكية عالية المستوى وبحث دقيق.',
      color: 'bg-stone-800',
      lightColor: 'bg-stone-50',
      prepQuestionEn: 'Can an analysis be truly objective?',
      prepQuestionAr: 'هل يمكن للتحليل أن يكون موضوعياً حقاً؟',
      conceptEn: 'C1 writers must deconstruct others\' works. Learn to critique methodologies and theoretical frameworks.',
      conceptAr: 'يجب على كتاب C1 تفكيك أعمال الآخرين. تعلم نقد المنهجيات والأطر النظرية.',
      vocabulary: [
        { id: 'v-4', en: 'Fallacy', ar: 'مغالطة' },
        { id: 'v-5', en: 'Postulate', ar: 'يفترض/مسلمة' },
        { id: 'v-6', en: 'Empirical', ar: 'تجريبي' }
      ],
      structures: [
        { titleEn: 'Hedged Claims', titleAr: 'الادعاءات المحتاطة', contentEn: 'Using "suggests", "might", "potentially" to lower risk.', contentAr: 'استخدام كلمات الاحتمالية لتقليل المخاطر والموضوعية.' }
      ]
    }
  ],
  C2: [
    {
      id: 'w_c2_1',
      titleEn: 'Creative Mastery: Style & Tone',
      titleAr: 'الإتقان الإبداعي: الأسلوب والنبرة',
      descriptionEn: 'The artistic fusion of vocabulary and unique voice.',
      descriptionAr: 'الاندماج الفني للمفردات والصوت الفريد.',
      color: 'bg-zinc-950',
      lightColor: 'bg-zinc-50',
      prepQuestionEn: 'Can writing have a soul without sacrificing precision?',
      prepQuestionAr: 'هل يمكن للكتابة أن تملك روحاً دون التضحية بالدقة؟',
      conceptEn: 'Full C2 mastery is about "voice". It is the ability to break rules intentionally for stylistic effect.',
      conceptAr: 'إتقان C2 الكامل يتعلق بـ "الصوت". إنها القدرة على كسر القواعد عمداً من أجل تأثير أسلوبي.',
      vocabulary: [
        { id: 'v-1', en: 'Eloquent', ar: 'بليغ' },
        { id: 'v-2', en: 'Poignant', ar: 'مؤثر' },
        { id: 'v-3', en: 'Subtle', ar: 'رقيق/خفي' }
      ],
      structures: [
        { titleEn: 'Rhetorical Devices', titleAr: 'الأدوات البلاغية', contentEn: 'Metaphor, Alliteration, Parallelism.', contentAr: 'الاستعارة، الجناس، التوازي.' }
      ]
    },
    {
      id: 'w_c2_2',
      titleEn: 'The Editorial Manifesto',
      titleAr: 'البيان الافتتاحي (المانيفستو)',
      descriptionEn: 'Shaping public opinion with high-frequency rhetoric.',
      descriptionAr: 'تشكيل الرأي العام ببلاغة عالية التردد وتأثير عميق.',
      color: 'bg-black',
      lightColor: 'bg-gray-50',
      prepQuestionEn: 'How can words incite change on a global scale?',
      prepQuestionAr: 'كيف يمكن للكلمات أن تحرك التغيير على نطاق عالمي؟',
      conceptEn: 'Manifesto writing is bold and rhythmic. It combines philosophical depth with a call to action.',
      conceptAr: 'كتابة المانيفستو جريئة وإيقاعية. فهي تجمع بين العمق الفلسفي والدعوة إلى العمل.',
      vocabulary: [
        { id: 'v-4', en: 'Paradigmatic', ar: 'نموذجي/فلسفي' },
        { id: 'v-5', en: 'Inexorable', ar: 'لا يلين/محتوم' },
        { id: 'v-6', en: 'Transcendence', ar: 'تساَمي' }
      ],
      structures: [
        { titleEn: 'Anaphora', titleAr: 'التكرار الاستهلالي', contentEn: 'Repeating keywords for maximum dramatic effect.', contentAr: 'تكرار الكلمات الرئيسية لتحقيق أقصى تأثير درامي.' }
      ]
    }
  ]
};

export const WritingCurriculumCompanion = ({ 
  lang, 
  level = 'A1', 
  onBack, 
  onStartLesson,
  initialUnitId
}: { 
  lang: 'en' | 'ar', 
  level?: WritingLevel, 
  onBack: () => void, 
  onStartLesson: (unitId: string) => void,
  initialUnitId?: string | null
}) => {
  const [selectedUnit, setSelectedUnit] = useState<WritingUnit | null>(null);

  useEffect(() => {
    if (initialUnitId) {
      const unit = ALL_WRITING_UNITS[level].find(u => u.id === initialUnitId);
      if (unit) {
        setSelectedUnit(unit);
        setActiveTab('rules');
      }
    }
  }, [initialUnitId, level]);
  const [activeTab, setActiveTab] = useState<'rules' | 'vocabulary' | 'lab'>('lab');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const units = ALL_WRITING_UNITS[level];

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
    A1: 'أساسيات الجملة',
    A2: 'الوصف والسرد',
    B1: 'العمق الوصفي',
    B2: 'الإقناع المنطقي',
    C1: 'الكتابة المهنية',
    C2: 'الإبداع والأسلوب'
  };

  const levelInfoEn = {
    A1: 'Sentence Foundations',
    A2: 'Description & Narrative',
    B1: 'Descriptive Depth',
    B2: 'Logical Persuasion',
    C1: 'Professional Synthesis',
    C2: 'Creative Style'
  };

  return (
    <div className="flex-1 bg-[#fafafa] min-h-screen font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={selectedUnit ? () => setSelectedUnit(null) : onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#002147] transition-all active:scale-95"
          >
            <ArrowLeft className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20">
              <PenTool size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#002147] leading-none uppercase tracking-tighter">
                {isRtl ? 'منهج الكتابة المطور' : 'Elite Writing Curriculum'}
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
              { id: 'vocabulary', label: isRtl ? 'المصطلحات' : 'Terms', icon: Type },
              { id: 'rules', label: isRtl ? 'الهياكل' : 'Structures', icon: Edit3 },
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
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-indigo-600 font-black">
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
                    {isRtl ? 'كتابة المستوى' : 'Level'} <span className="text-indigo-600">{level}</span>
                    {isRtl ? 'المطورة' : 'Elite Composition'}
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
                    {isRtl 
                      ? `اكتب بسلطة أدبية. منهاج يركز على هيكلة الأفكار، والوضوح النحوي، والأسلوب الكتابي الراقي.` 
                      : `Write with literary authority. A curriculum focused on structuring ideas, syntactic clarity, and sophisticated writing style.`}
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
                      <PenTool size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-indigo-600 transition-colors">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                       {isRtl ? unit.descriptionAr : unit.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 group-hover:bg-[#002147] group-hover:text-white transition-all uppercase tracking-widest">
                          Draft Ideas
                       </div>
                       <ChevronRight size={20} className={`${isRtl ? 'rotate-180' : ''} text-slate-300 group-hover:text-indigo-600 transition-colors`} />
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
                      {isRtl ? 'وحدة الكتابة' : 'Composition Module'}
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
                      className="px-10 py-5 bg-[#002147] text-white rounded-[2rem] font-black text-sm flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-xl"
                    >
                      <FileText size={20} />
                      {isRtl ? 'بدء تدريب الكتابة والتأليف' : 'Start Writing Workshop'}
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-[#002147] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <Brain className="text-indigo-400" size={32} />
                        <div className="flex gap-2">
                           <button 
                             onClick={() => handleSpeech(selectedUnit.prepQuestionEn, 'en-US', 'prep-en')}
                             className={`p-2 rounded-lg transition-all flex items-center gap-1 ${speakingId === 'prep-en' ? 'bg-indigo-600 text-white scale-110' : 'bg-white/10 hover:bg-white/20'}`}
                           >
                             <Volume2 size={16} />
                           </button>
                        </div>
                      </div>
                      
                      <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2 relative z-10">
                        {isRtl ? 'التهيئة الذهنية للكتابة' : 'Composition Prep'}
                      </p>
                      <p className="text-sm font-bold leading-relaxed mb-6 relative z-10">
                         {isRtl ? selectedUnit.prepQuestionAr : selectedUnit.prepQuestionEn}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-white/10 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Structure Focus</p>
                        {selectedUnit.structures.map((st, idx) => (
                          <div key={idx} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                            <p className="text-xs font-black leading-relaxed">{st.titleEn}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{st.contentEn}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm mt-12 min-h-[600px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-[#fafafa]/50 -skew-x-12 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 border-b border-slate-100 pb-12">
                    {[
                      { id: 'lab', label: isRtl ? 'جوهر الأسلوب' : 'The Style Core', icon: Brain },
                      { id: 'vocabulary', label: isRtl ? 'مصطلحات الكتابة' : 'Writing Terms', icon: Type },
                      { id: 'rules', label: isRtl ? 'هياكل النصوص' : 'Text Structures', icon: Edit3 },
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
                        <Zap size={48} className="text-indigo-600 mb-8" />
                        <h3 className="text-3xl font-black text-[#002147] mb-8">{isRtl ? 'المنطق الكتابي لهذه الوحدة' : 'Writing Logic of this Unit'}</h3>
                        <div className="w-full p-10 md:p-14 bg-[#002147] text-white rounded-[3.5rem] mb-12 shadow-2xl relative group">
                           <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                              <Quote size={80} />
                           </div>
                           <p className="text-2xl md:text-3xl font-medium leading-relaxed relative z-10 italic">
                              {isRtl ? selectedUnit.conceptAr : selectedUnit.conceptEn}
                           </p>
                        </div>
                        <button 
                          onClick={() => handleSpeech(selectedUnit.conceptEn, 'en-US', 'concept-main')} 
                          className={`px-12 py-6 rounded-full font-black text-sm flex items-center gap-3 transition-all ${speakingId === 'concept-main' ? 'bg-indigo-600 text-white scale-105 shadow-xl' : 'bg-[#002147] text-white hover:bg-[#002147]/90'}`}
                        >
                           {speakingId === 'concept-main' ? <Pause size={20} /> : <Volume2 size={20} />} 
                           {isRtl ? 'استماع للمنطق (EN)' : 'Listen to Logic (EN)'}
                        </button>
                      </motion.div>
                    )}

                    {activeTab === 'vocabulary' && (
                      <motion.div key="vocabulary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedUnit.vocabulary.map((v) => (
                           <div key={v.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                             <p className="text-xl font-black text-[#002147]">{v.en}</p>
                             <p className="text-slate-400 font-bold">{v.ar}</p>
                             {v.note && <p className="mt-4 text-[10px] text-indigo-600 uppercase font-black">{v.note}</p>}
                           </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'rules' && (
                      <motion.div key="rules" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                         {selectedUnit.structures.map((st, idx) => (
                           <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-slate-50 hover:shadow-xl transition-all">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                   <Edit3 size={24} />
                                </div>
                                <div>
                                   <h4 className="text-xl font-black text-[#002147] group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{isRtl ? st.titleAr : st.titleEn}</h4>
                                   <p className="text-slate-500 font-medium leading-relaxed mt-2">{isRtl ? st.contentAr : st.contentEn}</p>
                                </div>
                              </div>
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
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Writing Workshop Engine © 2026</p>
      </footer>
    </div>
  );
};
