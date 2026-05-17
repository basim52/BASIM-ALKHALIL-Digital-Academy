
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
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
  MessageCircle,
  Mic,
  Users
} from 'lucide-react';

interface ConversationUnit {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  prepQuestionEn: string;
  prepQuestionAr: string;
  contextEn: string;
  contextAr: string;
  phrases: { id: string; en: string; ar: string; note?: string }[];
  scenarios: { titleEn: string; titleAr: string; contentEn: string; contentAr: string }[];
}

export type ConversationLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const ALL_CONVERSATION_UNITS: Record<ConversationLevel, ConversationUnit[]> = {
  A1: [
    {
      id: 'c_a1_1',
      titleEn: 'First Contact: Elite Greetings',
      titleAr: 'الاتصال الأول: قمة التحيات',
      descriptionEn: 'Breaking the silence with diplomatic precision.',
      descriptionAr: 'كسر حاجز الصمت بدقة دبلوماسية.',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      prepQuestionEn: 'How do you want to be remembered after a first meeting?',
      prepQuestionAr: 'كيف تريد أن يتذكرك الناس بعد اللقاء الأول؟',
      contextEn: 'In high-level interactions, a greeting is more than just "Hello". It sets the tone for professional and social respect.',
      contextAr: 'في التفاعلات رفيعة المستوى، التحية هي أكثر من مجرد "مرحباً". فهي تحدد نبرة الاحترام المهني والاجتماعي.',
      phrases: [
        { id: 'gr-1', en: 'It is a pleasure to make your acquaintance.', ar: 'يسعدني التعرف عليك.' },
        { id: 'gr-2', en: 'How have you been faring lately?', ar: 'كيف كانت أحوالك مؤخراً؟' },
        { id: 'gr-3', en: 'I have heard great things about your work.', ar: 'لقد سمعت أشياء رائعة عن عملك.' }
      ],
      scenarios: [
        { titleEn: 'Formal Event', titleAr: 'حدث رسمي', contentEn: 'Introducing yourself to a guest of honor.', contentAr: 'تقديم نفسك لضيف شرف.' },
        { titleEn: 'Casual Encounter', titleAr: 'لقاء عابر', contentEn: 'Saying hello to a neighbor in a polite way.', contentAr: 'إلقاء التحية على جار بطريقة مهذبة.' }
      ]
    },
    {
      id: 'c_a1_2',
      titleEn: 'Identity & Narrative',
      titleAr: 'الهوية والسرد الشخصي',
      descriptionEn: 'Constructing your personal story in a new language.',
      descriptionAr: 'بناء قصتك الشخصية بلغة جديدة.',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      prepQuestionEn: 'If you had one minute to describe yourself, what would you say?',
      prepQuestionAr: 'إذا كان لديك دقيقة واحدة لوصف نفسك، فماذا ستقول؟',
      contextEn: 'Talking about yourself requires clarity. Focus on your essence: who you are, what you love, and where you come from.',
      contextAr: 'يتطلب الحديث عن نفسك الوضوح. ركز على جوهرك: من أنت، وماذا تحب، ومن أين أتيت.',
      phrases: [
        { id: 'id-1', en: 'I am passionate about continuous learning.', ar: 'أنا شغوف بالتعلم المستمر.' },
        { id: 'id-2', en: 'My background is in design and technology.', ar: 'خلفيتي في التصميم والتكنولوجيا.' },
        { id: 'id-3', en: 'I find great joy in simple everyday moments.', ar: 'أجد متعة كبيرة في لحظات الحياة اليومية البسيطة.' }
      ],
      scenarios: [
        { titleEn: 'Interview Intro', titleAr: 'مقدمة مقابلة', contentEn: 'The first "Tell me about yourself" moment.', contentAr: 'اللحظة الأولى من "حدثني عن نفسك".' },
        { titleEn: 'New Club', titleAr: 'نادي جديد', contentEn: 'Joining a group and making friends.', contentAr: 'الانضمام لمجموعة وتكوين صداقات.' }
      ]
    }
  ],
  A2: [
    {
      id: 'c_a2_1',
      titleEn: 'The Art of Negotiation',
      titleAr: 'فن التفاوض والحوار',
      descriptionEn: 'Navigating daily transactions with courtesy and firmness.',
      descriptionAr: 'إدارة المعاملات اليومية بكياسة وحزم.',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50',
      prepQuestionEn: 'Do you prefer to agree quickly or discuss more?',
      prepQuestionAr: 'هل تفضل الموافقة بسرعة أم المناقشة أكثر؟',
      contextEn: 'Daily life involves constant micro-negotiations. Learning to state your needs politely is a key social skill.',
      contextAr: 'تتضمن الحياة اليومية مفاوضات صغيرة مستمرة. تعلم ذكر احتياجاتك بأدب مهارة اجتماعية أساسية.',
      phrases: [
        { id: 'neg-1', en: 'Would it be possible to consider another option?', ar: 'هل سيكون من الممكن التفكير في خيار آخر؟' },
        { id: 'neg-2', en: 'I appreciate the offer, but I was looking for something slightly different.', ar: 'أقدر العرض، ولكني كنت أبحث عن شيء مختلف قليلاً.' },
        { id: 'neg-3', en: 'Could we reach a compromise on this matter?', ar: 'هل يمكننا الوصول إلى حل وسط بشأن هذا الأمر؟' }
      ],
      scenarios: [
        { titleEn: 'At the Market', titleAr: 'في السوق', contentEn: 'Asking for a better price with respect.', contentAr: 'طلب سعر أفضل باحترام.' },
        { titleEn: 'Changing Plans', titleAr: 'تغيير الخطط', contentEn: 'Suggesting a new time for a meeting.', contentAr: 'اقتراح موعد جديد للاجتماع.' }
      ]
    }
  ],
  B1: [
    {
      id: 'c_b1_1',
      titleEn: 'Expressing Nuanced Opinions',
      titleAr: 'التعبير عن الآراء الدقيقة',
      descriptionEn: 'Moving beyond "I like" to complex discursive reasoning.',
      descriptionAr: 'الانتقال من "أحب" إلى منطق نقاشي معقد.',
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50',
      prepQuestionEn: 'Why is having a unique perspective important?',
      prepQuestionAr: 'لماذا تعتبر امتلاك وجهة نظر فريدة أمراً مهماً؟',
      contextEn: 'Intermediate speakers can connect ideas. Use logical markers to show the "why" behind your beliefs.',
      contextAr: 'يمكن للمتحدثين في المستوى المتوسط ربط الأفكار. استخدم علامات منطقية لإظهار "لماذا" خلف معتقداتك.',
      phrases: [
        { id: 'op-1', en: 'From my perspective, the core issue seems to be...', ar: 'من وجهة نظري، يبدو أن القضية الجوهرية هي...' },
        { id: 'op-2', en: 'I am inclined to believe that evidence suggests otherwise.', ar: 'أنا أميل إلى الاعتقاد بأن الأدلة تشير إلى عكس ذلك.' },
        { id: 'op-3', en: 'While I understand your point, I see it differently because...', ar: 'بينما أفهم وجهة نظرك، أراها بشكل مختلف لأن...' }
      ],
      scenarios: [
        { titleEn: 'Book Club', titleAr: 'نادي الكتاب', contentEn: 'Sharing thoughts on a complex story.', contentAr: 'مشاركة الأفكار حول قصة معقدة.' },
        { titleEn: 'Office Debate', titleAr: 'نقاش مكتب', contentEn: 'Discussing a project direction.', contentAr: 'مناقشة اتجاه المشروع.' }
      ]
    }
  ],
  B2: [
    {
      id: 'c_b2_1',
      titleEn: 'Strategic Discourse',
      titleAr: 'الخطاب الاستراتيجي',
      descriptionEn: 'Influencing outcomes through persuasive conversational tactics.',
      descriptionAr: 'التأثير على النتائج من خلال تكتيكات محادثة مقنعة.',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      prepQuestionEn: 'What makes a speaker persuasive?',
      prepQuestionAr: 'ما الذي يجعل المتحدث مقنعاً؟',
      contextEn: 'Persuasion isn\'t about force; it\'s about alignment. Show that you listen, then lead the conversation forward.',
      contextAr: 'الإقناع لا يتعلق بالقوة، بل بالتوافق. أظهر أنك تستمع، ثم قد المحادثة للأمام.',
      phrases: [
        { id: 'sd-1', en: 'If we pivot our focus, we might find a more lucrative path.', ar: 'إذا قمنا بتحويل تركيزنا، فقد نجد مساراً أكثر ربحية.' },
        { id: 'sd-2', en: 'Consider the long-term implications of this strategy.', ar: 'ضع في اعتبارك الآثار طويلة المدى لهذه الاستراتيجية.' },
        { id: 'sd-3', en: 'I am confident that this approach will yield the best results.', ar: 'أنا واثق من أن هذا النهج سيحقق أفضل النتائج.' }
      ],
      scenarios: [
        { titleEn: 'Business Proposal', titleAr: 'مقترح عمل', contentEn: 'Pitching an idea to stakeholders.', contentAr: 'طرح فكرة على أصحاب المصلحة.' },
        { titleEn: 'Crisis Management', titleAr: 'إدارة أزمات', contentEn: 'Calming a situation through clear talk.', contentAr: 'تهدئة موقف من خلال حديث واضح.' }
      ]
    }
  ],
  C1: [
    {
      id: 'c_c1_1',
      titleEn: 'Philosophical Inquiry',
      titleAr: 'الاستقصاء الفلسفي',
      descriptionEn: 'Debating abstract concepts with analytical depth.',
      descriptionAr: 'نقاش المفاهيم المجردة بعمق تحليلي.',
      color: 'bg-slate-900',
      lightColor: 'bg-slate-50',
      prepQuestionEn: 'How does language shape our perception of truth?',
      prepQuestionAr: 'كيف تشكل اللغة تصورنا للحقيقة؟',
      contextEn: 'At the C1 level, you navigate ambiguity. Learn to discuss morality, existence, and society with precision.',
      contextAr: 'في مستوى C1، تتنقل عبر الغموض. تعلم مناقشة الأخلاق والوجود والمجتمع بدقة.',
      phrases: [
        { id: 'ph-1', en: 'The ontological implications of this theory are profound.', ar: 'الآثار الوجودية لهذه النظرية عميقة.' },
        { id: 'ph-2', en: 'Let us examine the underlying assumptions of that argument.', ar: 'دعونا نفحص الافتراضات الأساسية لهذا الجدال.' },
        { id: 'ph-3', en: 'It is a fascinating paradox, wouldn\'t you agree?', ar: 'إنها مفارقة رائعة، ألا توافق؟' }
      ],
      scenarios: [
        { titleEn: 'Academic Seminar', titleAr: 'ندوة أكاديمية', contentEn: 'Questioning a theory during a lecture.', contentAr: 'التشكيك في نظرية خلال محاضرة.' },
        { titleEn: 'Late Night Talk', titleAr: 'حديث متأخر', contentEn: 'Deep talk with a brilliant peer.', contentAr: 'حديث عميق مع زميل ذكي.' }
      ]
    }
  ],
  C2: [
    {
      id: 'c_c2_1',
      titleEn: 'Linguistic Alchemy',
      titleAr: 'الخيمياء اللغوية والبراعة',
      descriptionEn: 'The mastery of wit, irony, and cultural resonance.',
      descriptionAr: 'إتقان البديهة والسخرية والرنين الثقافي.',
      color: 'bg-zinc-950',
      lightColor: 'bg-zinc-50',
      prepQuestionEn: 'Can silence be more eloquent than speech?',
      prepQuestionAr: 'هل يمكن أن يكون الصمت أكثر بلاغة من الكلام؟',
      contextEn: 'Full mastery means picking the right Register for the right moment. Knowing when to use slang vs. academic jargon.',
      contextAr: 'الإتقان الكامل يعني اختيار السجل اللغوي المناسب للحظة المناسبة. معرفة متى تستخدم العامية مقابل المصطلحات الأكاديمية.',
      phrases: [
        { id: 'la-1', en: 'His rhetoric is as sharp as it is deceptive.', ar: 'بلاغته حادة بقدر تضليلها.' },
        { id: 'la-2', en: 'The subtext of this meeting was far more interesting than the agenda.', ar: 'كان النص الخفي لهذا الاجتماع أكثر إثارة للاهتمام من جدول الأعمال.' },
        { id: 'la-3', en: 'We must transcend the superficial and reach for the essence.', ar: 'يجب أن نتجاوز السطحية ونصل إلى الجوهر.' }
      ],
      scenarios: [
        { titleEn: 'Gala Speech', titleAr: 'خطاب احتفالي', contentEn: 'Captivating an elite audience with charm.', contentAr: 'أسر جمهور من النخبة بالجاذبية.' },
        { titleEn: 'High-Stakes Mediation', titleAr: 'وساطة عالية المخاطر', contentEn: 'Resolving a multi-layered conflict.', contentAr: 'حل نزاع متعدد الطبقات.' }
      ]
    }
  ]
};

export const ConversationCurriculumCompanion = ({ lang, level = 'A1', onBack, onStartLesson }: { lang: 'en' | 'ar', level?: ConversationLevel, onBack: () => void, onStartLesson: (unitId: string) => void }) => {
  const [selectedUnit, setSelectedUnit] = useState<ConversationUnit | null>(null);
  const [activeTab, setActiveTab] = useState<'context' | 'phrases' | 'lab'>('lab');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const units = ALL_CONVERSATION_UNITS[level];

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
    A1: 'أساسيات الاتصال',
    A2: 'التفاعل الاجتماعي',
    B1: 'الطلاقة والانسياب',
    B2: 'الإقناع والتأثير',
    C1: 'العمق والتحليل',
    C2: 'البراعة الفكرية'
  };

  const levelInfoEn = {
    A1: 'Communication Foundations',
    A2: 'Social Interaction',
    B1: 'Fluency & Flow',
    B2: 'Persuasion & Influence',
    C1: 'Depth & Analysis',
    C2: 'Intellectual Mastery'
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
            <div className="p-2 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20">
              <MessageSquare size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#002147] leading-none uppercase tracking-tighter">
                {isRtl ? 'منهج المحادثة المطور' : 'Elite Conversation Curriculum'}
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
              { id: 'context', label: isRtl ? 'السياق' : 'Context', icon: Users },
              { id: 'phrases', label: isRtl ? 'العبارات' : 'Phrases', icon: MessageCircle },
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
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-rose-600 font-black">
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
                    {isRtl ? 'محادثات المستوى' : 'Level'} <span className="text-rose-500">{level}</span>
                    {isRtl ? 'المطورة' : 'Elite Interactions'}
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
                    {isRtl 
                      ? `تكلم بثقة وذكاء. منهاج يركز على التواصل الفعال والسياقات الاجتماعية والمهنية الراقية.` 
                      : `Speak with confidence and intelligence. A curriculum focused on effective communication and sophisticated social/professional contexts.`}
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
                      <MessageSquare size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-rose-600 transition-colors">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                       {isRtl ? unit.descriptionAr : unit.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 group-hover:bg-[#002147] group-hover:text-white transition-all uppercase tracking-widest">
                          Enter Conversation
                       </div>
                       <ChevronRight size={20} className={`${isRtl ? 'rotate-180' : ''} text-slate-300 group-hover:text-rose-500 transition-colors`} />
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
                      {isRtl ? 'وحدة المحادثة' : 'Dialogue Module'}
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
                      className="px-10 py-5 bg-[#002147] text-white rounded-[2rem] font-black text-sm flex items-center gap-3 hover:bg-rose-600 transition-all shadow-xl"
                    >
                      <Mic size={20} />
                      {isRtl ? 'بدء تدريب المحادثة AI' : 'Start AI Conversation'}
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-[#002147] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <Brain className="text-rose-500" size={32} />
                        <div className="flex gap-2">
                           <button 
                             onClick={() => handleSpeech(selectedUnit.prepQuestionEn, 'en-US', 'prep-en')}
                             className={`p-2 rounded-lg transition-all flex items-center gap-1 ${speakingId === 'prep-en' ? 'bg-rose-500 text-white scale-110' : 'bg-white/10 hover:bg-white/20'}`}
                           >
                             <Volume2 size={16} />
                           </button>
                        </div>
                      </div>
                      
                      <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-2 relative z-10">
                        {isRtl ? 'التهيئة الذهنية للحوار' : 'Dialogue Preparation'}
                      </p>
                      <p className="text-sm font-bold leading-relaxed mb-6 relative z-10">
                         {isRtl ? selectedUnit.prepQuestionAr : selectedUnit.prepQuestionEn}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-white/10 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Essential Phrases</p>
                        {selectedUnit.phrases.slice(0, 2).map((ph) => (
                          <div key={ph.id} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-all border border-white/5">
                            <p className="text-xs font-black leading-relaxed">{ph.en}</p>
                            <button onClick={() => handleSpeech(ph.en, 'en-US', ph.id)} className="mt-2 text-[10px] text-rose-500 font-black uppercase tracking-widest hover:underline">
                               {speakingId === ph.id ? 'Playing...' : 'Listen Phrase'}
                            </button>
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
                      { id: 'lab', label: isRtl ? 'جوهر الحوار' : 'The Dialogue Core', icon: Brain },
                      { id: 'context', label: isRtl ? 'مواقف الاستخدام' : 'Usage Scenarios', icon: Users },
                      { id: 'phrases', label: isRtl ? 'بنك التعبير' : 'Expression Bank', icon: MessageCircle },
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
                        <Zap size={48} className="text-rose-500 mb-8" />
                        <h3 className="text-3xl font-black text-[#002147] mb-8">{isRtl ? 'المنطق التواصلي لهذه الوحدة' : 'Communicative Logic of this Unit'}</h3>
                        <div className="w-full p-10 md:p-14 bg-[#002147] text-white rounded-[3.5rem] mb-12 shadow-2xl relative group">
                           <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                              <Quote size={80} />
                           </div>
                           <p className="text-2xl md:text-3xl font-medium leading-relaxed relative z-10 italic">
                              {isRtl ? selectedUnit.contextAr : selectedUnit.contextEn}
                           </p>
                        </div>
                        <button 
                          onClick={() => handleSpeech(selectedUnit.contextEn, 'en-US', 'context-main')} 
                          className={`px-12 py-6 rounded-full font-black text-sm flex items-center gap-3 transition-all ${speakingId === 'context-main' ? 'bg-rose-500 text-white scale-105 shadow-xl' : 'bg-[#002147] text-white hover:bg-[#002147]/90'}`}
                        >
                           {speakingId === 'context-main' ? <Pause size={20} /> : <Volume2 size={20} />} 
                           {isRtl ? 'استماع للمنطق (EN)' : 'Listen to Logic (EN)'}
                        </button>
                      </motion.div>
                    )}

                    {activeTab === 'context' && (
                      <motion.div key="context" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {selectedUnit.scenarios.map((scenario, idx) => (
                          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                             <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                                <Users size={24} />
                             </div>
                             <h4 className="text-xl font-black text-[#002147] mb-3">{isRtl ? scenario.titleAr : scenario.titleEn}</h4>
                             <p className="text-slate-500 font-medium leading-relaxed">
                                {isRtl ? scenario.contentAr : scenario.contentEn}
                             </p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'phrases' && (
                      <motion.div key="phrases" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                         {selectedUnit.phrases.map((ph) => (
                           <div key={ph.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white hover:shadow-xl hover:border-transparent transition-all">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                   <div className="w-2 h-2 bg-rose-500 rounded-full" />
                                   <p className="text-xl font-black text-[#002147] group-hover:text-rose-600 transition-colors">{ph.en}</p>
                                </div>
                                <p className="text-slate-400 font-bold ml-5">{ph.ar}</p>
                              </div>
                              <button 
                                onClick={() => handleSpeech(ph.en, 'en-US', `phrase-list-${ph.id}`)}
                                className={`px-6 py-4 rounded-2xl font-black text-xs flex items-center gap-2 transition-all ${speakingId === `phrase-list-${ph.id}` ? 'bg-[#002147] text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-[#002147] hover:text-white shadow-sm'}`}
                              >
                                {speakingId === `phrase-list-${ph.id}` ? <Pause size={14} /> : <Volume2 size={14} />}
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
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Dialogue Engine © 2026</p>
      </footer>
    </div>
  );
};
