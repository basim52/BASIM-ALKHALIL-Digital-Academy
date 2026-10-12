import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Timer,
  Award,
  Zap,
  Globe,
  MessageSquare,
  CheckCircle2,
  RotateCcw,
  Headphones,
  Radio,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

export interface PhoneScenario {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  category: string;
  initialPrompt: string;
  starterSaraSpeech: string;
  starterSaraSpeechAr: string;
}

export const PHONE_SCENARIOS: PhoneScenario[] = [
  {
    id: 'casual_chat',
    titleAr: 'دردشة يومية ودية حرة',
    titleEn: 'Casual Daily Life Chat',
    icon: '☕',
    category: 'Daily',
    initialPrompt: 'Let\'s have a casual friendly phone call catching up about our day, hobbies, and plans.',
    starterSaraSpeech: "Hello there! It is so wonderful to hear from you today. How is your day going so far?",
    starterSaraSpeechAr: "أهلاً بك! سعيدة جداً باتصالك اليوم. كيف يسير يومك حتى الآن؟"
  },
  {
    id: 'job_interview',
    titleAr: 'محاكاة مقابلة عمل رسمية',
    titleEn: 'Job Interview Simulation',
    icon: '💼',
    category: 'Career',
    initialPrompt: 'You are the HR hiring manager calling the candidate for a preliminary phone screen interview. Ask professional interview questions.',
    starterSaraSpeech: "Good morning! This is Sara from the Talent Acquisition team. Thank you for joining this phone interview. Could you start by briefly introducing yourself?",
    starterSaraSpeechAr: "صباح الخير! معك سارة من إدارة استقطاب المواهب. شكراً لانضمامك للمقابلة الهاتفية. هل يمكنك البدء بتعريف موجز عن نفسك؟"
  },
  {
    id: 'airport_customs',
    titleAr: 'إجراءات السفر والمطار',
    titleEn: 'Airport Transit & Customs',
    icon: '✈️',
    category: 'Travel',
    initialPrompt: 'You are an airport customs and border officer questioning a traveler on arrival.',
    starterSaraSpeech: "Welcome to Heathrow Airport. May I see your passport and boarding pass, please? What is the primary purpose of your visit to the UK?",
    starterSaraSpeechAr: "مرحباً بك في مطار هيثرو. هل يمكنني رؤية جواز سفرك وبطاقة الصعود؟ ما هو الغرض الأساسي من زيارتك للمملكة المتحدة؟"
  },
  {
    id: 'restaurant_order',
    titleAr: 'طلب طعام وحجز طاولة',
    titleEn: 'Food Ordering & Table Booking',
    icon: '🍕',
    category: 'Lifestyle',
    initialPrompt: 'You are the friendly receptionist at an authentic Italian bistro taking a phone reservation and takeaway order.',
    starterSaraSpeech: "Hello! Welcome to Bella Vista Bistro. How can I help you today? Would you like to reserve a table or place a delivery order?",
    starterSaraSpeechAr: "أهلاً بك في مطعم بيلا فيستا. كيف يمكنني مساعدتك اليوم؟ هل ترغب في حجز طاولة أم طلب وجبة توصيل؟"
  },
  {
    id: 'hotel_concierge',
    titleAr: 'حجز فندق واستعلامات النزيل',
    titleEn: 'Hotel Reservation & Concierge',
    icon: '🏨',
    category: 'Travel',
    initialPrompt: 'You are the front-desk concierge at a luxury five-star hotel assisting a guest with bookings and local recommendations.',
    starterSaraSpeech: "Royal Palace Hotel, Sara speaking. Good evening! How may I assist you with your booking or room preferences tonight?",
    starterSaraSpeechAr: "فندق القصر الملكي، معك سارة. مساء الخير! كيف يمكنني مساعدتك في حجزك وتفضيلات غرفتك الليلة؟"
  },
  {
    id: 'academic_debate',
    titleAr: 'نقاش فكري وطلاقة متقدمة',
    titleEn: 'Intellectual Discussion & Debate',
    icon: '🎓',
    category: 'Academic',
    initialPrompt: 'You are a friendly Cambridge debate mentor discussing modern topics like artificial intelligence, remote work, and the future of education.',
    starterSaraSpeech: "Hello! It is fantastic to discuss big ideas with you. Today, let us examine whether artificial intelligence will completely transform future classrooms. What is your perspective on this?",
    starterSaraSpeechAr: "أهلاً بك! رائع أن نناقش أفكاراً عميقة معاً. اليوم، هل تعتقد أن الذكاء الاصطناعي سيغير الفصول الدراسية كلياً؟ ما هي وجهة نظرك؟"
  }
];

interface SaraLivePhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentLevel: string;
  isRtl: boolean;
  onSuccessXP?: (xp: number) => void;
  onSaveCallSummary?: (summary: string) => void;
  onSendTranscriptToChat?: (transcript: { role: 'user' | 'sara'; text: string }[]) => void;
}

export const SaraLivePhoneCallModal: React.FC<SaraLivePhoneCallModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentLevel,
  isRtl,
  onSuccessXP,
  onSaveCallSummary,
  onSendTranscriptToChat
}) => {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [selectedScenario, setSelectedScenario] = useState<PhoneScenario>(PHONE_SCENARIOS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [handsFreeAutoListen, setHandsFreeAutoListen] = useState(true);

  // Call analytics & state
  const [callSeconds, setCallSeconds] = useState(0);
  const [callTurns, setCallTurns] = useState(0);
  const [studentWordsSpoken, setStudentWordsSpoken] = useState(0);
  const [isSaraSpeaking, setIsSaraSpeaking] = useState(false);
  const [isStudentListening, setIsStudentListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [callTranscript, setCallTranscript] = useState<{ role: 'user' | 'sara'; text: string; time: string }[]>([]);
  const [currentAiSpeechText, setCurrentAiSpeechText] = useState('');

  // Audio recognition ref
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const isComponentMounted = useRef<boolean>(true);

  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
      stopCallCleanup();
    };
  }, []);

  // Timer effect when connected
  useEffect(() => {
    if (callState === 'connected') {
      timerIntervalRef.current = setInterval(() => {
        setCallSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [callState]);

  const stopCallCleanup = () => {
    cancelAllSpeech();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start outgoing call
  const handleStartCall = () => {
    setCallState('calling');
    setCallSeconds(0);
    setCallTurns(0);
    setStudentWordsSpoken(0);
    setCallTranscript([]);

    // Simulate ringtone for 2.2 seconds then connect
    setTimeout(() => {
      if (!isComponentMounted.current) return;
      setCallState('connected');

      // Sara speaks initial greeting
      const starterText = selectedScenario.starterSaraSpeech;
      playSaraPhoneVoice(starterText, () => {
        if (handsFreeAutoListen && !isMuted) {
          startSpeechRecognition();
        }
      });

      const initialTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCallTranscript([
        { role: 'sara', text: starterText, time: initialTime }
      ]);
    }, 2200);
  };

  // Play Sara Voice with callback
  const playSaraPhoneVoice = (text: string, onEnd?: () => void) => {
    if (!isSpeakerOn) {
      if (onEnd) onEnd();
      return;
    }
    setIsSaraSpeaking(true);
    setCurrentAiSpeechText(text);

    // Stop listening while Sara speaks to avoid echo
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }
    setIsStudentListening(false);

    speakAcademyText(text, 'en', () => {
      setIsSaraSpeaking(false);
      if (onEnd) onEnd();
    });
  };

  // Speech Recognition Handling
  const startSpeechRecognition = () => {
    if (isMuted || callState !== 'connected' || isSaraSpeaking) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available in this browser.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsStudentListening(true);
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        setInterimTranscript(interim || final);

        if (final.trim()) {
          handleStudentSpoke(final.trim());
        }
      };

      recognition.onerror = (event: any) => {
        setIsStudentListening(false);
        // If no speech detected in hands-free mode, restart after slight delay
        if (event.error === 'no-speech' && handsFreeAutoListen && callState === 'connected' && !isMuted && !isSaraSpeaking) {
          setTimeout(() => {
            if (callState === 'connected' && !isSaraSpeaking && !isMuted) {
              startSpeechRecognition();
            }
          }, 800);
        }
      };

      recognition.onend = () => {
        setIsStudentListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setIsStudentListening(false);
    }
  };

  // Student spoke response
  const handleStudentSpoke = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCallTranscript(prev => [...prev, { role: 'user', text: spokenText, time: nowTime }]);
    setCallTurns(prev => prev + 1);
    const wordsInUtterance = spokenText.split(/\s+/).filter(Boolean).length;
    setStudentWordsSpoken(prev => prev + wordsInUtterance);
    setInterimTranscript('');

    // Fetch Sara AI response
    try {
      setIsSaraSpeaking(true);
      setCurrentAiSpeechText(isRtl ? 'سارة تفكر في الرد...' : 'Sara is thinking...');

      const historyFormatted = callTranscript.slice(-6).map(item => ({
        role: item.role === 'sara' ? 'model' : 'user',
        text: item.text
      }));

      const response = await fetch('/api/sara/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: spokenText,
          history: historyFormatted,
          rolePlay: {
            scenarioTitle: selectedScenario.titleEn,
            scenarioPrompt: `${selectedScenario.initialPrompt}. This is a real-time telephone conversation with ${studentName || 'the student'}. Speak concisely in 1-3 spoken conversational sentences suited for natural phone call audio. Do not format with markdown or bullets.`
          },
          snapshot: {
            name: studentName,
            level: studentLevel,
            pacing: 'conversational_immersive'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get Sara audio response');
      }

      const data = await response.json();
      const replyText = data.reply || "I hear you clearly! Let us keep chatting.";

      setCallTranscript(prev => [...prev, { role: 'sara', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

      playSaraPhoneVoice(replyText, () => {
        if (handsFreeAutoListen && !isMuted && callState === 'connected') {
          startSpeechRecognition();
        }
      });
    } catch (err) {
      console.error('Phone AI chat error:', err);
      const fallbackReply = "That makes total sense! Tell me more about what you think.";
      setCallTranscript(prev => [...prev, { role: 'sara', text: fallbackReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      playSaraPhoneVoice(fallbackReply, () => {
        if (handsFreeAutoListen && !isMuted && callState === 'connected') {
          startSpeechRecognition();
        }
      });
    }
  };

  // End Call
  const handleEndCall = () => {
    stopCallCleanup();
    setCallState('ended');

    // Calculate XP reward based on duration & words
    const earnedXP = Math.max(20, Math.min(100, Math.floor(callSeconds / 3) + (callTurns * 5)));

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (onSuccessXP) {
      onSuccessXP(earnedXP);
    }

    if (onSaveCallSummary) {
      const summary = `Sara Phone Call (${selectedScenario.titleEn}): ${formatTime(callSeconds)} duration, ${callTurns} speech turns, ${studentWordsSpoken} words spoken.`;
      onSaveCallSummary(summary);
    }

    if (onSendTranscriptToChat && callTranscript.length > 0) {
      onSendTranscriptToChat(callTranscript.map(t => ({ role: t.role, text: t.text })));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl text-white overflow-hidden relative"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP STATUS BAR */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between z-10 bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Phone size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-white">
                  {isRtl ? 'مكالمة هاتفية حية مع سارة 📞' : 'Live Phone Call with Sara 📞'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  HD Voice
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Oxford London AI Studio • CEFR {studentLevel}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCallCleanup();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col z-10">
          {/* STATE 1: IDLE / PICK SCENARIO */}
          {callState === 'idle' && (
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="text-center space-y-2 pt-2">
                <div className="inline-flex p-3 rounded-3xl bg-blue-500/10 border border-blue-400/20 text-blue-400 mb-1">
                  <Headphones size={28} />
                </div>
                <h4 className="text-lg font-black text-white">
                  {isRtl ? 'اختر موضوع المكالمة الهاتفية' : 'Choose Your Phone Call Scenario'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  {isRtl
                    ? 'تدرب على التحدث بالإنجليزية في مكالمة هاتفية واقعية حرة اليدين. تحدث بصوتك دون لمس الشاشة وسترد عليك سارة فورياً.'
                    : 'Practice spoken English in a realistic hands-free phone conversation. Speak naturally and Sara answers directly.'}
                </p>
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PHONE_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenario(sc)}
                    className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex items-start gap-3 ${
                      selectedScenario.id === sc.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-slate-800 border border-slate-700">
                      {sc.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black truncate">
                          {isRtl ? sc.titleAr : sc.titleEn}
                        </span>
                        {selectedScenario.id === sc.id && (
                          <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-2 mt-0.5">
                        {isRtl ? sc.starterSaraSpeechAr : sc.starterSaraSpeech}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Start Call CTA Button */}
              <div className="pt-2">
                <button
                  onClick={handleStartCall}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer active:scale-98"
                >
                  <Phone size={20} className="fill-slate-950" />
                  <span>
                    {isRtl
                      ? `بدء الاتصال بسارة الآن (${selectedScenario.titleAr}) 📞`
                      : `Call Sara Now (${selectedScenario.titleEn}) 📞`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: OUTGOING CALLING */}
          {callState === 'calling' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-blue-500/20 border-2 border-blue-400/40 animate-ping absolute inset-0" />
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#002147] to-blue-700 border-4 border-blue-400 flex items-center justify-center shadow-2xl relative z-10">
                  <span className="text-5xl">👩‍🏫</span>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-black text-white">Sara Oxford Tutor</h4>
                <p className="text-xs text-blue-400 font-bold mt-1 animate-pulse">
                  {isRtl ? 'جارٍ الاتصال بسارة... 📡' : 'Calling Sara in London... 📡'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setCallState('idle')}
                  className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer transition-all"
                >
                  <PhoneOff size={16} />
                  <span>{isRtl ? 'إلغاء الاتصال' : 'Cancel Call'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: CONNECTED ACTIVE CALL */}
          {callState === 'connected' && (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              {/* Call Header / Timer */}
              <div className="flex items-center justify-between bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black text-emerald-400 tracking-wider">
                    {formatTime(callSeconds)}
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-xs font-black text-white">{isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}</div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <span>{callTurns} {isRtl ? 'مداخلات' : 'turns'}</span>
                </div>
              </div>

              {/* Sara Interactive Avatar & Wave */}
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="relative">
                  {/* Speaking glow ring */}
                  {isSaraSpeaking && (
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md"
                    />
                  )}
                  {isStudentListening && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="absolute -inset-3 rounded-full bg-emerald-400/30 blur-md"
                    />
                  )}

                  <div className={`w-28 h-28 rounded-full bg-gradient-to-tr from-[#002147] to-blue-800 border-4 ${
                    isSaraSpeaking ? 'border-amber-400' : isStudentListening ? 'border-emerald-400' : 'border-slate-600'
                  } flex items-center justify-center shadow-2xl relative z-10 transition-colors`}>
                    <span className="text-5xl">👩‍🏫</span>
                  </div>
                </div>

                {/* State Indicator Badge */}
                <div>
                  {isSaraSpeaking ? (
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black flex items-center gap-1.5 animate-pulse">
                      <Volume2 size={14} />
                      {isRtl ? 'سارة تتحدث إليك الآن...' : 'Sara is speaking...'}
                    </span>
                  ) : isStudentListening ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5 animate-pulse">
                      <Mic size={14} />
                      {isRtl ? 'سارة تستمع إلى صوتك... تحدث بحرية' : 'Sara is listening... Speak now'}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5">
                      <Radio size={14} className="text-blue-400" />
                      {isRtl ? 'الخط متصل وثابت' : 'Call Connected'}
                    </span>
                  )}
                </div>

                {/* Audio Waves Simulation */}
                <div className="flex items-center gap-1 h-8">
                  {[40, 70, 95, 60, 85, 100, 75, 45, 90, 65, 80, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: (isSaraSpeaking || isStudentListening) ? [`${Math.max(15, h * 0.3)}%`, `${h}%`, `${Math.max(10, h * 0.2)}%`] : '15%'
                      }}
                      transition={{
                        duration: 0.6 + (i * 0.05),
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className={`w-1 rounded-full ${
                        isSaraSpeaking ? 'bg-amber-400' : isStudentListening ? 'bg-emerald-400' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Transcript / Subtitles */}
              {showCaptions && (
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 max-h-36 overflow-y-auto space-y-2 text-xs">
                  {callTranscript.length === 0 && (
                    <p className="text-slate-500 italic text-center">
                      {isRtl ? 'المحادثة الصوتية بدأت...' : 'Voice call started...'}
                    </p>
                  )}
                  {callTranscript.slice(-3).map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl ${
                        item.role === 'sara'
                          ? 'bg-blue-900/30 border border-blue-800/40 text-blue-200'
                          : 'bg-emerald-900/30 border border-emerald-800/40 text-emerald-200'
                      }`}
                    >
                      <span className="font-black text-[10px] block opacity-75 mb-0.5">
                        {item.role === 'sara' ? '👩‍🏫 Sara' : '👤 You'}
                      </span>
                      <p className="leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                  {interimTranscript && (
                    <div className="p-2 rounded-xl bg-slate-800 text-slate-300 italic animate-pulse">
                      <span className="font-bold text-[10px] block text-emerald-400 mb-0.5">👤 Listening...</span>
                      "{interimTranscript}"
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Phone Control Pad */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {/* Mute button */}
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (!isMuted && recognitionRef.current) {
                        try { recognitionRef.current.abort(); } catch (e) {}
                      } else if (isMuted && !isSaraSpeaking) {
                        startSpeechRecognition();
                      }
                    }}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isMuted
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    <span className="text-[10px] font-black">{isMuted ? (isRtl ? 'كتم' : 'Muted') : (isRtl ? 'المايك' : 'Mic')}</span>
                  </button>

                  {/* Speaker button */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      !isSpeakerOn
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {!isSpeakerOn ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <span className="text-[10px] font-black">{isRtl ? 'المكبر' : 'Speaker'}</span>
                  </button>

                  {/* Push to talk / Manual Mic Trigger */}
                  <button
                    onClick={() => {
                      if (!isSaraSpeaking) {
                        startSpeechRecognition();
                      }
                    }}
                    disabled={isSaraSpeaking}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isStudentListening
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Radio size={18} />
                    <span className="text-[10px] font-black">{isRtl ? 'تحدث' : 'Push Talk'}</span>
                  </button>

                  {/* Toggle Captions */}
                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      showCaptions
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <MessageSquare size={18} />
                    <span className="text-[10px] font-black">{isRtl ? 'النص' : 'Captions'}</span>
                  </button>
                </div>

                {/* END CALL BUTTON */}
                <button
                  onClick={handleEndCall}
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 transition-all cursor-pointer active:scale-98"
                >
                  <PhoneOff size={20} />
                  <span>{isRtl ? 'إنهاء المكالمة والحصول على التقرير 🛑' : 'End Call & Get Debrief 🛑'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: ENDED / DEBRIEF SUMMARY */}
          {callState === 'ended' && (
            <div className="flex-1 flex flex-col justify-between space-y-5 py-2">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-3xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-1">
                  <Award size={32} />
                </div>
                <h4 className="text-xl font-black text-white">
                  {isRtl ? 'أحسنت يا بطل! اكتملت المكالمة بنجاح 🎉' : 'Awesome Job! Call Completed 🎉'}
                </h4>
                <p className="text-xs text-slate-300">
                  {isRtl
                    ? `لقد أجريت محادثة هاتفية حية باللغة الإنجليزية في سيناريو "${selectedScenario.titleAr}".`
                    : `You practiced real-time spoken English in the "${selectedScenario.titleEn}" scenario.`}
                </p>
              </div>

              {/* Call Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <Timer size={18} className="mx-auto text-blue-400 mb-1" />
                  <div className="text-base font-black text-white">{formatTime(callSeconds)}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{isRtl ? 'مدة المكالمة' : 'Duration'}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <Radio size={18} className="mx-auto text-amber-400 mb-1" />
                  <div className="text-base font-black text-white">{callTurns}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{isRtl ? 'جولات التحدث' : 'Spoken Turns'}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <Zap size={18} className="mx-auto text-emerald-400 mb-1" />
                  <div className="text-base font-black text-emerald-400">
                    +{Math.max(20, Math.min(100, Math.floor(callSeconds / 3) + (callTurns * 5)))} XP
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">{isRtl ? 'النقاط المكتسبة' : 'XP Rewarded'}</div>
                </div>
              </div>

              {/* Performance Feedback */}
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <h5 className="text-xs font-black text-white">
                    {isRtl ? 'تقييم سارة الفوري للطلاقة الصوتية' : 'Sara’s Instant Voice Feedback'}
                  </h5>
                </div>
                <p className="text-xs text-blue-200 leading-relaxed font-medium">
                  {callTurns >= 3
                    ? (isRtl
                      ? `استجابة سريعة ممتازة وثقة ملحوظة في التحدث عبر الهاتف دون تردد! استخدمت مصطلحات مناسبة لموقف ${selectedScenario.titleAr}. استمر في هذا الزخم!`
                      : `Great auditory reaction time and confidence speaking on the telephone! You maintained good composure in the ${selectedScenario.titleEn} situation.`)
                    : (isRtl
                      ? 'مجهود رائع كبداية! في المكالمة القادمة، جرب التحدث بجمل أطول وإضافة تفاصيل أكثر لزيادة طلاقتك الهاتفية.'
                      : 'Good effort! Next call, try elaborating with longer sentences to build telephone conversation stamina.')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setCallState('idle');
                  }}
                  className="py-3 rounded-2xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw size={14} />
                  <span>{isRtl ? 'مكالمة جديدة' : 'New Call'}</span>
                </button>

                <button
                  onClick={() => {
                    stopCallCleanup();
                    onClose();
                  }}
                  className="py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer transition-all"
                >
                  <CheckCircle2 size={14} />
                  <span>{isRtl ? 'العودة لدردشة سارة' : 'Back to Sara'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
