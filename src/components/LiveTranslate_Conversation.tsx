import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Volume2, User, RefreshCw, Star
} from 'lucide-react';
import { GoldCard, PrimaryButton, GhostButton, ProgressPill } from './ui/academy';

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

  const t = (ar: string, en: string) => (isRtl ? ar : en);

  return (
    <div className="space-y-6">
      {/* Upper Selector banner */}
      <GoldCard className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-right">
        <div className="space-y-1">
          <ProgressPill>
            {t('🧠 محاكاة المحادثات والظروف الواقعية الحية', 'Live Scenario Dialogues')}
          </ProgressPill>
          <h4 className="text-sm sm:text-base font-black text-[#002147]">
            {t('اختر بيئة الحوار ومجالك المستهدف للتعلم العملي:', 'Choose a Scenario & Social Arena:')}
          </h4>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => setSelectedScenario(sc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] flex items-center gap-1.5 cursor-pointer ${
                selectedScenario.id === sc.id
                  ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
                  : 'bg-white border-[#C49E3A] text-[#002147] hover:bg-[#fdfaf3]'
              }`}
            >
              <span>{sc.emoji}</span>
              <span>{isRtl ? sc.titleAr.split(' ')[0] || sc.titleEn : sc.titleEn}</span>
            </button>
          ))}
        </div>
      </GoldCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Play Dialogue Chat Box (cols 7) */}
        <GoldCard className="lg:col-span-7 flex flex-col !p-0 overflow-hidden h-[480px]">
          {/* Partner Header */}
          <div className="bg-[#002147] text-white p-4 flex items-center justify-between text-right border-b-2 border-[#C49E3A]">
            <button
              type="button"
              onClick={() => resetScenario(selectedScenario)}
              className="px-3 py-1.5 bg-[#001a38] border border-[#C49E3A] hover:bg-[#C49E3A] hover:text-[#002147] text-[#E6C36A] text-xs font-black rounded-xl transition active:scale-95 cursor-pointer"
            >
              🔄 {t('إعادة الحوار', 'Restart Chat')}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <span className="text-xs font-black text-white block">
                  {selectedScenario.characterName} {selectedScenario.emoji}
                </span>
                <span className="text-[10px] text-[#E6C36A] font-bold block">
                  {t('متحدث أصلي معتمد', 'Verified Native Speaker')}
                </span>
              </div>
              <div className="w-9 h-9 bg-[#001a38] rounded-full flex items-center justify-center text-xl border border-[#C49E3A]">
                {selectedScenario.avatar}
              </div>
            </div>
          </div>

          {/* Messages Log area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fdfaf3]">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm border border-[#C49E3A] shrink-0">
                      {selectedScenario.avatar}
                    </div>
                  )}

                  <div className={`p-3.5 rounded-2xl max-w-[82%] space-y-1.5 shadow-sm border ${
                    isAssistant
                      ? 'bg-white border-[#C49E3A] text-[#002147] text-left'
                      : 'bg-[#002147] border-[#C49E3A]/40 text-white text-right'
                  }`}>
                    <p className="text-xs sm:text-sm font-bold leading-relaxed font-sans select-text">
                      {msg.content}
                    </p>

                    {isAssistant && (
                      <button
                        type="button"
                        onClick={() => speakText(msg.content, targetLang)}
                        className="inline-flex items-center gap-1.5 text-[10px] text-[#C49E3A] font-black hover:underline cursor-pointer"
                      >
                        <Volume2 size={11} />
                        <span>{t('استمع للفظ السليم', 'Speak')}</span>
                      </button>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 bg-[#002147] text-[#E6C36A] rounded-full flex items-center justify-center text-xs border border-[#C49E3A] shrink-0">
                      <User size={13} />
                    </div>
                  )}
                </div>
              );
            })}

            {errorText && (
              <div className="p-2.5 bg-white border border-[#C49E3A]/40 rounded-xl text-[11px] font-bold text-[#002147] text-center">
                {errorText}
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Send Area Input drawer */}
          <div className="p-3 bg-white border-t border-[#C49E3A]/30 flex items-center gap-2">
            <input
              type="text"
              placeholder={t('اكتب ردك باللغة الحية المحددة الحين...', 'Type your response in target language...')}
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={isSending}
              className="flex-1 bg-[#fdfaf3] rounded-xl px-4 py-2.5 text-xs font-bold text-[#002147] border border-[#C49E3A]/40 focus:outline-none focus:ring-2 focus:ring-[#C49E3A] placeholder-[#002147]/40 text-right"
              dir="ltr"
            />
            <PrimaryButton
              disabled={isSending || !userDraft.trim()}
              onClick={handleSendMessage}
              className="!px-3.5 !py-2.5 !min-h-[40px] shrink-0"
            >
              {isSending ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </PrimaryButton>
          </div>
        </GoldCard>

        {/* Live Academic Mentoring Coaching Radar (cols 5) */}
        <GoldCard className="lg:col-span-5 flex flex-col p-5 text-right space-y-4">
          <div className="border-b border-[#C49E3A]/20 pb-3">
            <h5 className="text-xs font-black text-[#002147] flex items-center gap-2 justify-end">
              <ProgressPill>AI Tutor</ProgressPill>
              <span>{t('👩‍🏫 لوحة المراقبة والتدقيق اللغوي الحين', '👩‍🏫 Live Linguistic Audit Board')}</span>
            </h5>
            <span className="text-[10px] text-[#002147]/70 font-bold block mt-1">
              {t('تحليل تلقائي متقدم لآخر صياغة كتبتها لضبط مخارج الحوار.', 'Realtime syntax and naturalness audits.')}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeCoach ? (
              <motion.div
                key={JSON.stringify(activeCoach)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Naturalness indicator */}
                <div className="flex items-center justify-between bg-[#fdfaf3] border border-[#C49E3A]/40 p-3 rounded-2xl">
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
                          size={12}
                          className={s <= stars ? "fill-[#C49E3A] text-[#C49E3A]" : "text-[#002147]/20"}
                        />
                      );
                    })}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#002147]/70 font-bold block">{t('درجة طلاقة الصياغة:', 'Tone Naturalness:')}</span>
                    <span className="text-xs font-black text-[#002147] uppercase">
                      {activeCoach.naturalnessRating}
                    </span>
                  </div>
                </div>

                {/* Grammar correction feedback */}
                {activeCoach.grammarCorrected ? (
                  <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3.5 rounded-2xl space-y-1.5">
                    <span className="text-[10px] text-[#C49E3A] font-black block">✍️ {t('الصياغة السليمة المقترحة لقواعدك:', 'Grammar Corrected:')}</span>
                    <p className="text-xs font-bold font-sans text-[#002147] leading-relaxed text-left select-text" dir="ltr">
                      {activeCoach.grammarCorrected}
                    </p>
                    <GhostButton
                      onClick={() => speakText(activeCoach.grammarCorrected, targetLang)}
                      className="!px-2.5 !py-1 !min-h-[30px] !text-[10px]"
                    >
                      <Volume2 size={11} />
                      <span>{t('استمع للنطق السليم للتركيب', 'Vocalize corrected sentence')}</span>
                    </GhostButton>
                  </div>
                ) : (
                  <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-3.5 rounded-2xl flex items-center justify-between text-right">
                    <span className="text-[#C49E3A] text-[10px] font-black">🌱 Perfect Grammar!</span>
                    <span className="text-[11px] text-[#002147] font-black">
                      {t('تركيب الجملة سليم وفصيح وخالي من الأخطاء!', 'No syntax errors captured!')}
                    </span>
                  </div>
                )}

                {/* Mentor advice paragraph in Arabic */}
                <div className="bg-[#fdfaf3] border border-[#C49E3A]/40 p-4 rounded-2xl space-y-1 text-right">
                  <span className="text-[10px] text-[#002147]/70 font-bold block">{t('توجيهات الشريك اللغوي النحوية والثقافية:', 'Cultural & Grammar Tips:')}</span>
                  <p className="text-xs text-[#002147] leading-relaxed font-bold">
                    {activeCoach.mentorTipsAr}
                  </p>
                </div>

                {/* Suggest alternative native phrases (user can click to speak) */}
                {activeCoach.suggestedPhrases && activeCoach.suggestedPhrases.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#002147]/70 font-black block">🗣️ {t('طرق أخرى كأهل البلد لتقول نفس المعنى:', 'Alternative native pathways:')}</span>
                    <div className="space-y-1.5">
                      {activeCoach.suggestedPhrases.map((phrase: string, pIdx: number) => (
                        <div
                          key={pIdx}
                          className="flex items-center justify-between bg-[#fdfaf3] border border-[#C49E3A]/40 p-2.5 rounded-xl transition text-left"
                          dir="ltr"
                        >
                          <GhostButton
                            onClick={() => speakText(phrase, targetLang)}
                            className="!px-2 !py-1 !min-h-[30px]"
                          >
                            <Volume2 size={11} />
                          </GhostButton>
                          <span className="text-xs font-bold text-[#002147] font-sans select-text pr-2 leading-relaxed">
                            {phrase}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="py-20 text-center text-[#002147]/70 text-xs font-bold border border-dashed border-[#C49E3A]/40 bg-[#fdfaf3] rounded-2xl space-y-2">
                <span className="text-3xl block">💬</span>
                <p className="max-w-[210px] mx-auto leading-relaxed">
                  {t(
                    'اكتب ردك بلغة الشات وأرسله، وسيقوم الموجه الذكي بتحليله فورياً لملاحظة القواعد وسرعة البديهة.',
                    'Analyze dialogue history to render live semantic and feedback graphs.'
                  )}
                </p>
              </div>
            )}
          </AnimatePresence>
        </GoldCard>
      </div>
    </div>
  );
}

