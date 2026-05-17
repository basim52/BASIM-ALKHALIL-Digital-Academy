
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
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
  Palette,
  Heart,
  Wind,
  Mic,
  Star
} from 'lucide-react';

interface ExpressionUnit {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  prepQuestionEn: string;
  prepQuestionAr: string;
  philosophyEn: string;
  philosophyAr: string;
  concepts: { id: string; en: string; ar: string; descriptionEn: string; descriptionAr: string }[];
  scenarios: { titleEn: string; titleAr: string; contentEn: string; contentAr: string }[];
}

export type ExpressionLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const ALL_EXPRESSION_UNITS: Record<ExpressionLevel, ExpressionUnit[]> = {
  A1: [
    {
      id: 'e_a1_1',
      titleEn: 'Emotional Foundations',
      titleAr: 'أسس الملاحظة الوجدانية',
      descriptionEn: 'Translating internal feelings into external clarity.',
      descriptionAr: 'ترجمة المشاعر الداخلية إلى وضوح خارجي.',
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50',
      prepQuestionEn: 'How does a color make you feel?',
      prepQuestionAr: 'كيف يجعلك اللون المفضل تشعر؟',
      philosophyEn: 'Expression starts inside. Before we talk to the world, we must understand the language of our own emotions.',
      philosophyAr: 'التعبير يبدأ من الداخل. قبل أن نتحدث إلى العالم، يجب أن نفهم لغة عواطفنا الخاصة.',
      concepts: [
        { id: 'c-1', en: 'Core Emotions', ar: 'المشاعر الجوهرية', descriptionEn: 'Happiness, Sadness, Surprise, Fear.', descriptionAr: 'السعادة، الحزن، المفاجأة، الخوف.' },
        { id: 'c-2', en: 'Simple Metaphor', ar: 'الاستعارة البسيطة', descriptionEn: 'Using "like" and "as" to explain feelings.', descriptionAr: 'استخدام الكاف للتشبيه لشرح المشاعر.' }
      ],
      scenarios: [
        { titleEn: 'First Reaction', titleAr: 'رد الفعل الأول', contentEn: 'Expressing joy at a gift.', contentAr: 'التعبير عن الفرح عند تلقي هدية.' },
        { titleEn: 'Daily Mood', titleAr: 'المزاج اليومي', contentEn: 'Telling a friend how your day went.', contentAr: 'إخبار صديق كيف سار يومك.' }
      ]
    }
  ],
  A2: [
    {
      id: 'e_a2_1',
      titleEn: 'Sensory Storytelling',
      titleAr: 'سرد القصص الحسي',
      descriptionEn: 'Building narratives through sights, sounds, and smells.',
      descriptionAr: 'بناء القصص من خلال المشاهد والأصوات والروائح.',
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50',
      prepQuestionEn: 'What is the smell of your favorite childhood memory?',
      prepQuestionAr: 'ما هي رائحة أغلى ذكريات طفولتك؟',
      philosophyEn: 'To express is to recreate an experience. Sensory details are the bridges between your mind and your audience.',
      philosophyAr: 'التعبير هو إعادة خلق تجربة. التفاصيل الحسية هي الجسور بين عقلك وجمهورك.',
      concepts: [
        { id: 'c-1', en: 'Visual Anchors', ar: 'المرتكزات البصرية', descriptionEn: 'Describing colors and light settings.', descriptionAr: 'وصف الألوان وإعدادات الإضاءة.' },
        { id: 'c-2', en: 'Auditory Depth', ar: 'العمق السمعي', descriptionEn: 'Translating sounds into evocative words.', descriptionAr: 'ترجمة الأصوات إلى كلمات موحية.' }
      ],
      scenarios: [
        { titleEn: 'A Walk in Nature', titleAr: 'نزهة في الطبيعة', contentEn: 'Describing a garden to someone who isn\'t there.', contentAr: 'وصف حديقة لشخص غير موجود.' },
        { titleEn: 'Kitchen Memories', titleAr: 'ذكريات المطبخ', contentEn: 'Expressing the warmth of a family meal.', contentAr: 'التعبير عن دفء وجبة عائلية.' }
      ]
    }
  ],
  B1: [
    {
      id: 'e_b1_1',
      titleEn: 'Abstract Articulation',
      titleAr: 'صياغة المفاهيم المجردة',
      descriptionEn: 'Discussing values and beliefs with intellectual flow.',
      descriptionAr: 'مناقشة القيم والمعتقدات بانسياب فكري.',
      color: 'bg-cyan-600',
      lightColor: 'bg-cyan-50',
      prepQuestionEn: 'What does "Freedom" look like in your daily life?',
      prepQuestionAr: 'كيف تبدو "الحرية" في حياتك اليومية؟',
      philosophyEn: 'Intermediate expression moves from "what" to "why". It requires the courage to share personal convictions.',
      philosophyAr: 'ينتقل التعبير في المستوى المتوسط من "ماذا" إلى "لماذا". يتطلب الشجاعة لمشاركة القناعات الشخصية.',
      concepts: [
        { id: 'c-1', en: 'The Definition Frame', ar: 'إطار التعريف الشخصي', descriptionEn: 'Defining complex ideas in your own words.', descriptionAr: 'تعريف الأفكار المعقدة بكلماتك الخاصة.' },
        { id: 'c-2', en: 'Moral Reasoning', ar: 'الاستدلال الأخلاقي', descriptionEn: 'Explaining the logic behind a choice.', descriptionAr: 'شرح المنطق الكامن وراء اختيار ما.' }
      ],
      scenarios: [
        { titleEn: 'Value Debate', titleAr: 'نقاش القيم', contentEn: 'Explaining why honesty matters to you.', contentAr: 'شرح لماذا تهمك الصراحة.' },
        { titleEn: 'Future Vision', titleAr: 'رؤية المستقبل', contentEn: 'Expressing your hopes for the next decade.', contentAr: 'التعبير عن آمالك للعقد القادم.' }
      ]
    }
  ],
  B2: [
    {
      id: 'e_b2_1',
      titleEn: 'Strategic Rhetoric',
      titleAr: 'البلاغة الاستراتيجية',
      descriptionEn: 'The art of inspiring change and leading thought.',
      descriptionAr: 'فن إلهام التغيير وقيادة الفكر.',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      prepQuestionEn: 'Can a single speech change the world?',
      prepQuestionAr: 'هل يمكن لخطاب واحد أن يغير العالم؟',
      philosophyEn: 'B2 expression is about impact. It merges emotional resonance with logical structure to move an audience.',
      philosophyAr: 'تعبير B2 يتعلق بالتأثير. فهو يدمج الرنين العاطفي مع الهيكل المنطقي لتحريك الجمهور.',
      concepts: [
        { id: 'c-1', en: 'Ethos & Pathos', ar: 'المصداقية والعاطفة', descriptionEn: 'Balancing credibility and feeling.', descriptionAr: 'الموازنة بين المصداقية والمشاعر.' },
        { id: 'c-2', en: 'The Climactic Build', ar: 'البناء التصاعدي', descriptionEn: 'Structuring a message for maximum power.', descriptionAr: 'هيكلة الرسالة لتحقيق أقصى قدر من القوة.' }
      ],
      scenarios: [
        { titleEn: 'Motivational Talk', titleAr: 'حديث تحفيزي', contentEn: 'Inspiring a team during a challenge.', contentAr: 'إلهام فريق خلال تحدٍ ما.' },
        { titleEn: 'Tribute Speech', titleAr: 'خطاب تكريم', contentEn: 'Expressing deep gratitude to a mentor.', contentAr: 'التعبير عن امتنانه العميق لمرشد.' }
      ]
    }
  ],
  C1: [
    {
      id: 'e_c1_1',
      titleEn: 'Nuanced Cultural Commentary',
      titleAr: 'التحليل الثقافي الدقيق',
      descriptionEn: 'Analyzing society and art with sophisticated edge.',
      descriptionAr: 'تحليل المجتمع والفن بحافة متطورة.',
      color: 'bg-slate-900',
      lightColor: 'bg-slate-50',
      prepQuestionEn: 'How does modern media affect our sense of identity?',
      prepQuestionAr: 'كيف تؤثر وسائل الإعلام الحديثة على شعورنا بالهوية؟',
      philosophyEn: 'At C1, expression is analytical. You dissect complexity and offer new frameworks for understanding the world.',
      philosophyAr: 'في C1، يكون التعبير تحليلياً. أنت تفكك التعقيد وتقدم أطراً جديدة لفهم العالم.',
      concepts: [
        { id: 'c-1', en: 'Subtext Analysis', ar: 'تحليل النص الخفي', descriptionEn: 'Expressing what is not explicitly said.', descriptionAr: 'التعبير عما لم يُقل صراحة.' },
        { id: 'c-2', en: 'Synthesized Critique', ar: 'النقد التركيبي', descriptionEn: 'Combining multiple perspectives into one voice.', descriptionAr: 'دمج وجهات نظر متعددة في صوت واحد.' }
      ],
      scenarios: [
        { titleEn: 'Art Review', titleAr: 'مراجعة فنية', contentEn: 'Critiquing a complex film or book.', contentAr: 'نقد فيلم أو كتاب معقد.' },
        { titleEn: 'Socratical Seminar', titleAr: 'ندوة سقراطية', contentEn: 'Leading a deep discussion on social trends.', contentAr: 'قيادة نقاش عميق حول الاتجاهات الاجتماعية.' }
      ]
    }
  ],
  C2: [
    {
      id: 'e_c2_1',
      titleEn: 'Linguistic Poetics & Universal Truths',
      titleAr: 'الشعرية اللغوية والحقائق الكونية',
      descriptionEn: 'The summit of eloquence and intellectual resonance.',
      descriptionAr: 'قمة البلاغة والرنين الفكري.',
      color: 'bg-black',
      lightColor: 'bg-zinc-50',
      prepQuestionEn: 'Is language enough to capture the infinite?',
      prepQuestionAr: 'هل اللغة كافية لالتقاط ما لا نهاية؟',
      philosophyEn: 'Full mastery is the alchemy of logic and passion. It is the ability to speak to the soul while honoring the mind.',
      philosophyAr: 'الإتقان الكامل هو خيمياء المنطق والعاطفة. إنها القدرة على مخاطبة الروح مع احترام العقل.',
      concepts: [
        { id: 'c-1', en: 'Rhetorical Eloquence', ar: 'الفصاحة البلاغية', descriptionEn: 'Mastering the flow of high-frequency words.', descriptionAr: 'إتقان تدفق الكلمات عالية التردد.' },
        { id: 'c-2', en: 'The Moral Compass', ar: 'البوصلة الأخلاقية', descriptionEn: 'Aligning expression with ultimate values.', descriptionAr: 'مواءمة التعبير مع القيم الأسمى.' }
      ],
      scenarios: [
        { titleEn: 'Keynote Address', titleAr: 'خطاب رئيسي', contentEn: 'Speaking at a global summit.', contentAr: 'التحدث في قمة عالمية.' },
        { titleEn: 'Philosophical Treatise', titleAr: 'رسالة فلسفية', contentEn: 'Arguing for a new way of living.', contentAr: 'المجادلة من أجل طريقة جديدة للعيش.' }
      ]
    }
  ]
};

export const ExpressionCurriculumCompanion = ({ lang, level = 'A1', onBack, onStartLesson }: { lang: 'en' | 'ar', level?: ExpressionLevel, onBack: () => void, onStartLesson: (unitId: string) => void }) => {
  const [selectedUnit, setSelectedUnit] = useState<ExpressionUnit | null>(null);
  const [activeTab, setActiveTab] = useState<'concepts' | 'philosophy' | 'lab'>('lab');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const units = ALL_EXPRESSION_UNITS[level];

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
    A1: 'أساسيات الوجدان',
    A2: 'الوصف الحسي',
    B1: 'الفكر المجرد',
    B2: 'قوة الإقناع',
    C1: 'التحليل الثقافي',
    C2: 'البراعة الكونية'
  };

  const levelInfoEn = {
    A1: 'Emotional Foundations',
    A2: 'Sensory Storytelling',
    B1: 'Abstract Articulation',
    B2: 'Strategic Rhetoric',
    C1: 'Cultural Commentary',
    C2: 'Universal Mastery'
  };

  return (
    <div className="flex-1 bg-[#fcfdfe] min-h-screen font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={selectedUnit ? () => setSelectedUnit(null) : onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#002147] transition-all active:scale-95"
          >
            <ArrowLeft className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#002147] leading-none uppercase tracking-tighter">
                {isRtl ? 'منهج التعبير المطور' : 'Elite Expression Curriculum'}
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
              { id: 'philosophy', label: isRtl ? 'الفلسفة' : 'Philosophy', icon: Wind },
              { id: 'concepts', label: isRtl ? 'المفاهيم' : 'Concepts', icon: Layers },
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
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-amber-600 font-black">
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
                    {isRtl ? 'تعبير المستوى' : 'Level'} <span className="text-amber-500">{level}</span>
                    {isRtl ? 'المطور' : 'Elite Articulation'}
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
                    {isRtl 
                      ? `عبّر عن فكرك ببراعة. منهاج يركز على الفصاحة البلاغية، والعمق الوجداني، والقدرة على صياغة الأفكار المعقدة.` 
                      : `Express your thoughts with brilliance. A curriculum focused on rhetorical eloquence, emotional depth, and the ability to articulate complex ideas.`}
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
                      <Sparkles size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-amber-600 transition-colors">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                       {isRtl ? unit.descriptionAr : unit.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 group-hover:bg-[#002147] group-hover:text-white transition-all uppercase tracking-widest">
                          Start Expression
                       </div>
                       <ChevronRight size={20} className={`${isRtl ? 'rotate-180' : ''} text-slate-300 group-hover:text-amber-500 transition-colors`} />
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
                      {isRtl ? 'وحدة التعبير' : 'Expression Module'}
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
                      className="px-10 py-5 bg-[#002147] text-white rounded-[2rem] font-black text-sm flex items-center gap-3 hover:bg-amber-600 transition-all shadow-xl"
                    >
                      <Palette size={20} />
                      {isRtl ? 'بدء ورشة التعبير الذكي' : 'Start Smart Expression Workshop'}
                    </button>
                    <button className="px-10 py-5 bg-white border border-slate-200 text-[#002147] rounded-[2rem] font-black text-sm flex items-center gap-3 hover:bg-slate-50 transition-all">
                       <Star size={20} className="text-amber-400" />
                       {isRtl ? 'إضافة للمفضلة' : 'Add to Collection'}
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-[#002147] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <Brain className="text-amber-400" size={32} />
                        <div className="flex gap-2">
                           <button 
                             onClick={() => handleSpeech(selectedUnit.prepQuestionEn, 'en-US', 'prep-en')}
                             className={`p-2 rounded-lg transition-all flex items-center gap-1 ${speakingId === 'prep-en' ? 'bg-amber-500 text-white scale-110' : 'bg-white/10 hover:bg-white/20'}`}
                           >
                             <Volume2 size={16} />
                           </button>
                        </div>
                      </div>
                      
                      <p className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2 relative z-10">
                        {isRtl ? 'الاستحضار الذهني' : 'Cognitive Recall'}
                      </p>
                      <p className="text-sm font-bold leading-relaxed mb-6 relative z-10">
                         {isRtl ? selectedUnit.prepQuestionAr : selectedUnit.prepQuestionEn}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-white/10 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Expression Pillars</p>
                        {selectedUnit.concepts.map((concept) => (
                          <div key={concept.id} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                            <p className="text-xs font-black leading-relaxed">{concept.en}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{concept.descriptionEn}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm mt-12 min-h-[600px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-[#fcfdfe]/50 -skew-x-12 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 border-b border-slate-100 pb-12">
                    {[
                      { id: 'lab', label: isRtl ? 'جوهر التعبير' : 'Expression Core', icon: Brain },
                      { id: 'philosophy', label: isRtl ? 'الفلسفة اللغوية' : 'Linguistic Philosophy', icon: Wind },
                      { id: 'concepts', label: isRtl ? 'خارطة المفاهيم' : 'Concept Map', icon: Layers },
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
                        <Palette size={48} className="text-amber-500 mb-8" />
                        <h3 className="text-3xl font-black text-[#002147] mb-8">{isRtl ? 'المنطق الفلسفي للتعبير' : 'Philosophical Expression Logic'}</h3>
                        <div className="w-full p-10 md:p-14 bg-[#002147] text-white rounded-[3.5rem] mb-12 shadow-2xl relative group">
                           <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                              <Quote size={80} />
                           </div>
                           <p className="text-2xl md:text-3xl font-medium leading-relaxed relative z-10 italic">
                              {isRtl ? selectedUnit.philosophyAr : selectedUnit.philosophyEn}
                           </p>
                        </div>
                        <button 
                          onClick={() => handleSpeech(selectedUnit.philosophyEn, 'en-US', 'philosophy-main')} 
                          className={`px-12 py-6 rounded-full font-black text-sm flex items-center gap-3 transition-all ${speakingId === 'philosophy-main' ? 'bg-amber-500 text-white scale-105 shadow-xl' : 'bg-[#002147] text-white hover:bg-[#002147]/90'}`}
                        >
                           {speakingId === 'philosophy-main' ? <Pause size={20} /> : <Volume2 size={20} />} 
                           {isRtl ? 'استماع للمنطق الفلسفي (EN)' : 'Listen to Philosophical Logic (EN)'}
                        </button>
                      </motion.div>
                    )}

                    {activeTab === 'philosophy' && (
                      <motion.div key="philosophy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {selectedUnit.scenarios.map((scenario, idx) => (
                          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                             <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                                <Heart size={24} />
                             </div>
                             <h4 className="text-xl font-black text-[#002147] mb-3">{isRtl ? scenario.titleAr : scenario.titleEn}</h4>
                             <p className="text-slate-500 font-medium leading-relaxed">
                                {isRtl ? scenario.contentAr : scenario.contentEn}
                             </p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'concepts' && (
                      <motion.div key="concepts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                         {selectedUnit.concepts.map((concept) => (
                           <div key={concept.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white hover:shadow-xl hover:border-transparent transition-all">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                   <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                   <p className="text-xl font-black text-[#002147] group-hover:text-amber-600 transition-colors uppercase tracking-tight">{concept.en}</p>
                                </div>
                                <p className="text-slate-500 font-bold ml-5">{concept.descriptionEn}</p>
                                <p className="text-slate-400 font-medium ml-5 italic">{concept.ar}</p>
                              </div>
                              <button 
                                onClick={() => handleSpeech(concept.en, 'en-US', `concept-list-${concept.id}`)}
                                className={`px-6 py-4 rounded-2xl font-black text-xs flex items-center gap-2 transition-all ${speakingId === `concept-list-${concept.id}` ? 'bg-[#002147] text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-[#002147] hover:text-white shadow-sm'}`}
                              >
                                {speakingId === `concept-list-${concept.id}` ? <Pause size={14} /> : <Volume2 size={14} />}
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
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Expression Synthesis Engine © 2026</p>
      </footer>
    </div>
  );
};
