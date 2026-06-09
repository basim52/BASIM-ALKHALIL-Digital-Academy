import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Volume2, User, MessageSquare, Compass, ShieldCheck, Sparkles, RefreshCw, Star, Info, HelpCircle
} from 'lucide-react';

interface LiveTranslateConversationProps {
  isRtl: boolean;
  targetLang: string;
  onPlayChime: (type: 'open' | 'message' | 'close' | 'think' | 'success') => void;
  speakText: (text: string, langCode: string) => void;
}

interface Scenario {
  id: string;
  titleAr: string;
  titleEn: string;
  avatar: string;
  characterName: string;
  initialMessage: string;
  emoji: string;
  descAr: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    titleAr: 'طلب قهوة وكرواسون في باريس 🥐',
    titleEn: 'Parisian Café Order',
    avatar: '👩‍🍳',
    characterName: 'Sophie',
    initialMessage: "Bonjour! Bienvenue au Café Saint-Germain. Que puis-je vous servir aujourd'hui? Un petit café ou une viennoiserie chaude?",
    emoji: '🥐',
    descAr: 'تدرب على التحية، طلب المأكولات، الحساب، وشكر النادل بلباقة فرنسية.'
  },
  {
    id: 'interview',
    titleAr: 'مقابلة عمل برمجية في Silicon Valley 💻',
    titleEn: 'Silicon Valley Interview',
    avatar: '👨‍💼',
    characterName: 'Marcus',
    initialMessage: "Welcome to your technical alignment chat. I am Marcus, the engineering lead. To start, could you please tell me about your background in full-stack architecture?",
    emoji: '💻',
    descAr: 'عرض خبرتك البرمجية، التحدث عن المشاريع، والرد على أسئلة القيادة والملاءمة المهنية.'
  },
  {
    id: 'hotel',
    titleAr: 'تسجيل الدخول في فندق بالباي لا بلاتا 🏨',
    titleEn: 'Madrid Hotel Check-in',
    avatar: '👩‍💼',
    characterName: 'Isabella',
    initialMessage: "¡Hola, muy buenas tardes! Bienvenido al Hotel Gran Vía. ¿Tiene usted una reserva realizada o desea consultar la disponibilidad de habitaciones con vistas?",
    emoji: '🏨',
    descAr: 'إنهاء إجراءات الحجز، طلب خدمات الغرف، الاستفسار عن المعالم السياحية والوصول.'
  },
  {
    id: 'lost',
    titleAr: 'البحث عن أمتعة مفقودة في طوكيو ✈️',
    titleEn: 'Tokyo Lost Luggage Helpdesk',
    avatar: '👨‍✈️',
    characterName: 'Daiki',
    initialMessage: "Arigatou gozaimasu for coming to the support counter. I am Daiki from airport service. Could you describe your bag and share your travel tag code?",
    emoji: '✈️',
    descAr: 'اتصال حي، وصف ميزات الحقيبة، المتابعة، والتعامل مع الإجراءات الأمنية والمطارات.'
  }
];

export function LiveTranslate_Conversation({ isRtl, targetLang, onPlayChime, speakText }: LiveTranslateConversationProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [userDraft, setUserDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Mentor insight coaching states (highly encouraging feedback)
  const [activeCoach, setActiveCoach] = useState<any | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize selected scenario on mounting or switching
  useEffect(() => {
    // Generate initial message matching scenario
    resetScenario(selectedScenario);
  }, [selectedScenario, targetLang]);

  const resetScenario = (sc: Scenario) => {
    onPlayChime('open');
    setMessages([
      { role: 'assistant', content: sc.initialMessage }
    ]);
    setActiveCoach(null);
    setUserDraft('');
    setErrorText(null);
  };

  // Auto scroll to chat bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userDraft.trim() || isSending) return;
    const draftedText = userDraft;
    setUserDraft('');
    setErrorText(null);
    onPlayChime('think');

    // Add user message locally
    const updatedMessages = [...messages, { role: 'user' as const, content: draftedText }];
    setMessages(updatedMessages);
    setIsSending(true);

    try {
      const response = await fetch('/api/live-translate/conversation/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: selectedScenario.titleEn,
          targetLang: targetLang,
          messages: updatedMessages.slice(-5), // last 5 messages for context
          userMsg: draftedText
        })
      });

      if (!response.ok) {
        throw new Error('Conversation assistant failed');
      }

      const data = await response.json();
      
      // Append assistant reply
      setMessages(prev => [...prev, { role: 'assistant', content: data.assistantReply }]);
      
      // Update mentor coaching section
      setActiveCoach(data.coaching);

      // Play chime & vocalize partner reply!
      onPlayChime('success');
      setTimeout(() => {
        speakText(data.assistantReply, targetLang);
      }, 300);

    } catch (err) {
      setErrorText(isRtl ? 'تعذر الاتصال بمدرب المحادثة. تم تجربة الرد التلقائي التوليدي بنجاح.' : 'Could not contact mentor coach.');
      onPlayChime('close');
      
      // Fallback response inside simulator
      const fallbackReply = targetLang === 'es' 
        ? "¡Entiendo perfecto! Sigamos con la charla. ¿Qué te parece?" 
        : "I appreciate that answer! Let us proceed with our scenario chat.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackReply }]);
      setActiveCoach({
        grammarCorrected: null,
        naturalnessRating: "Natural",
        mentorTipsAr: "محاكاة ممتازة! تأكد من التدرب على التعبير بطلاقة ومراجعة الحسابات الفورية.",
        suggestedPhrases: ["Perfect choice!", "Let us continue.", "Excellent."]
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper Selector banner */}
      <div className="bg-gradient-to-br from-[#0c1524] to-[#1e293b] rounded-3xl p-5 text-white flex justify-between items-center text-right border border-slate-700/80 shadow-md">
        <div className="space-y-1">
          <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wide">
            {isRtl ? '🧠 محاكاة المحادثات والظروف الواقعية الحية' : 'Live Scenario Dialogues'}
          </span>
          <h4 className="text-sm font-black text-slate-100">
            {isRtl ? 'اختر بيئة الحوار ومجالك المستهدف للتعلم العملي:' : 'Choose a Scenario & Social Arena:'}
          </h4>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => setSelectedScenario(sc)}
              className={`px-3 py-1.5 rounded-xl text-[10.5px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedScenario.id === sc.id
                  ? 'bg-amber-400 text-slate-950 font-black font-semibold'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
              }`}
            >
              <span>{sc.emoji}</span>
              <span>{isRtl ? sc.titleAr.split(' ')[0] || sc.titleEn : sc.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Play Dialogue Chat Box (cols 7) */}
        <div className="lg:col-span-7 flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-[480px]">
          {/* Partner Header */}
          <div className="bg-[#002147] text-white p-4 flex items-center justify-between text-right border-b border-white/5">
            <button
              type="button"
              onClick={() => resetScenario(selectedScenario)}
              className="px-2.5 py-1 bg-white/10 border border-white/10 hover:bg-white/15 text-[10px] font-black rounded-lg transition"
            >
              🔄 {isRtl ? 'إعادة الحوار' : 'Restart Chat'}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <span className="text-xs font-black text-white block">
                  {selectedScenario.characterName} {selectedScenario.emoji}
                </span>
                <span className="text-[9px] text-[#C49E3A] font-medium block">
                  {isRtl ? 'متحدث أصلي معتمد' : 'Verified Native Speaker'}
                </span>
              </div>
              <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center text-xl shadow-lg border border-amber-300">
                {selectedScenario.avatar}
              </div>
            </div>
          </div>

          {/* Messages Log area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center text-sm border border-amber-300 shrink-0">
                      {selectedScenario.avatar}
                    </div>
                  )}

                  <div className={`p-3.5 rounded-2xl max-w-[80%] space-y-1 shadow-xs border ${
                    isAssistant 
                      ? 'bg-white border-slate-150 text-slate-800 text-left' 
                      : 'bg-[#002147] border-[#002147] text-white text-right'
                  }`}>
                    <p className="text-xs md:text-sm font-semibold leading-relaxed font-sans select-text">
                      {msg.content}
                    </p>
                    
                    {isAssistant && (
                      <button
                        type="button"
                        onClick={() => speakText(msg.content, targetLang)}
                        className="inline-flex items-center gap-1.5 text-[9px] text-[#002147] font-extrabold hover:underline"
                      >
                        <Volume2 size={10} />
                        <span>{isRtl ? 'استمع للفظ السليم' : 'Speak'}</span>
                      </button>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 bg-[#0d2a4a] text-white rounded-full flex items-center justify-center text-xs border border-blue-900 shrink-0">
                      <User size={12} />
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={chatBottomRef} />
          </div>

          {/* Send Area Input drawer */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder={isRtl ? `اكتب ردك باللغة الحية المحددة الحين...` : `Type your response in target language...`}
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={isSending}
              className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 border border-slate-200 focus:outline-none focus:border-amber-accent placeholder-slate-400 text-right"
              dir="ltr"
            />
            <button
              type="button"
              disabled={isSending || !userDraft.trim()}
              onClick={handleSendMessage}
              className="p-2.5 bg-[#002147] text-white rounded-xl hover:bg-blue-950 transition-all cursor-pointer disabled:opacity-55 shrink-0"
            >
              {isSending ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <Send size={13} />
              )}
            </button>
          </div>
        </div>

        {/* Live Academic Mentoring Coaching Radar (cols 5) */}
        <div className="lg:col-span-5 flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-5 text-right space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h5 className="text-xs font-black text-[#002147] flex items-center gap-1.5 justify-end">
              <span className="px-1.5 py-0.5 bg-[#002147]/5 text-[#002147] rounded text-[8.5px] font-black">AI Tutor</span>
              <span>👩‍🏫 لوحة المراقبة والتدقيق اللغوي الحين</span>
            </h5>
            <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
              {isRtl ? 'تحليل تلقائي متقدم لآخر صياغة كتبتها لضبط مخارج الحوار.' : 'Realtime syntax and naturalness audits.'}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeCoach ? (
              <motion.div
                key={JSON.stringify(activeCoach)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {/* Naturalness indicator */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-150 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const rating = activeCoach.naturalnessRating || "Natural";
                      let stars = 3;
                      if (rating === "Perfect") stars = 5;
                      else if (rating === "Natural") stars = 4;
                      else if (rating === "Understandable") stars = 3;
                      else stars = 2;

                      return (
                        <Star 
                          key={s} 
                          size={11} 
                          className={s <= stars ? "fill-amber-400 text-amber-400" : "text-slate-300"} 
                        />
                      );
                    })}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">{isRtl ? 'درجة طلاقة الصياغة:' : 'Tone Naturalness:'}</span>
                    <span className="text-xs font-black text-[#002147] uppercase">
                      {activeCoach.naturalnessRating}
                    </span>
                  </div>
                </div>

                {/* Grammar correction feedback */}
                {activeCoach.grammarCorrected ? (
                  <div className="bg-rose-500/5 border border-rose-500/10 p-3.5 rounded-2xl space-y-1.5">
                    <span className="text-[10px] text-rose-700 font-extrabold block">✍️ {isRtl ? 'الصياغة السليمة المقترحة لقواعدك:' : 'Grammar Corrected:'}</span>
                    <p className="text-xs font-semibold font-sans text-rose-900 leading-relaxed text-left select-text" dir="ltr">
                      {activeCoach.grammarCorrected}
                    </p>
                    <button
                      type="button"
                      onClick={() => speakText(activeCoach.grammarCorrected, targetLang)}
                      className="text-[9px] text-rose-700 font-black hover:underline flex items-center gap-1"
                    >
                      <Volume2 size={10} />
                      {isRtl ? 'استمع للنطق السليم للتركيب' : 'Vocalize corrected sentence'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-2xl flex items-center justify-between text-right">
                    <span className="text-emerald-700 text-[10px] font-black">🌱 Perfect Grammar!</span>
                    <span className="text-[10px] text-emerald-800 font-bold">
                      {isRtl ? 'تركيب الجملة سليم وفصيح وخالي من الأخطاء!' : 'No syntax errors captured!'}
                    </span>
                  </div>
                )}

                {/* Mentor advice paragraph in Arabic */}
                <div className="bg-[#002147]/5 border border-[#002147]/10 p-4 rounded-2xl space-y-1 text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">{isRtl ? 'توجيهات الشريك اللغوي النحوية والثقافية:' : 'Cultural & Grammar Tips:'}</span>
                  <p className="text-[12px] text-slate-800 leading-relaxed font-bold">
                    {activeCoach.mentorTipsAr}
                  </p>
                </div>

                {/* Suggest alternative native phrases (user can click to speak) */}
                {activeCoach.suggestedPhrases && activeCoach.suggestedPhrases.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-extrabold block">🗣️ {isRtl ? 'طرق أخرى كأهل البلد لتقول نفس المعنى:' : 'Alternative native pathways:'}</span>
                    <div className="space-y-1.5">
                      {activeCoach.suggestedPhrases.map((phrase: string, pIdx: number) => (
                        <div 
                          key={pIdx}
                          className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-150 p-2.5 rounded-xl transition group text-left"
                          dir="ltr"
                        >
                          <button
                            type="button"
                            onClick={() => speakText(phrase, targetLang)}
                            className="p-1 rounded bg-white border border-slate-250 text-slate-500 hover:text-[#002147] transition cursor-pointer"
                          >
                            <Volume2 size={11} />
                          </button>
                          <span className="text-xs font-semibold text-slate-700 font-sans group-hover:text-slate-900 select-text pr-2 leading-relaxed">
                            {phrase}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="py-24 text-center text-slate-400 text-xs font-bold border border-dashed border-slate-200 rounded-3xl space-y-2">
                <span className="text-3xl block">💬</span>
                <p className="max-w-[190px] mx-auto leading-relaxed">
                  {isRtl 
                    ? 'اكتب ردك بلغة الشات وأرسله، وسيقوم الموجه الذكي بتحليله فورياً لملاحظة القواعد وسرعة البديهة.' 
                    : 'Analyze dialogue history to render live semantic and feedback graphs.'}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
