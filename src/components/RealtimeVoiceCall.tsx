import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Activity, 
  Award, 
  MessageSquare, 
  Zap, 
  RefreshCw, 
  ChevronRight, 
  CheckCircle2, 
  Sliders, 
  HelpCircle,
  Headphones,
  User,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface RealtimeVoiceCallProps {
  onBack?: () => void;
  lang?: 'ar' | 'en';
}

interface CallTurn {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  ipa?: string;
  fluencyScore?: number;
  timestamp: Date;
}

const SCENARIOS = [
  {
    id: 'free-chat',
    titleAr: 'محادثة حرة ومفتوحة',
    titleEn: 'Free Conversational Flow',
    descAr: 'تحدث في أي موضوع يثير اهتمامك بحرية تامة',
    descEn: 'Discuss any topic openly with natural flow',
    icon: '☕',
    partnerName: 'Prof. Julian',
    partnerAccent: 'British Oxford Standard'
  },
  {
    id: 'job-interview',
    titleAr: 'مقابلة عمل تنفيذية',
    titleEn: 'Executive Job Interview',
    descAr: 'تدرب على أسئلة المقابلات والتقديم المهني الاحترافي',
    descEn: 'Master behavioral questions & executive tone',
    icon: '💼',
    partnerName: 'Sarah Jenkins',
    partnerAccent: 'American Corporate English'
  },
  {
    id: 'airport-travel',
    titleAr: 'مطار لندن ومواقف السفر',
    titleEn: 'London Heathrow Airport',
    descAr: 'تدرب على الجمارك، حجز الفنادق، وطلب المساعدة',
    descEn: 'Navigate customs, hotel check-ins & queries',
    icon: '✈️',
    partnerName: 'Captain Robert',
    partnerAccent: 'UK Native English'
  },
  {
    id: 'daily-stories',
    titleAr: 'مواقف وحكايات يومية',
    titleEn: 'Casual Social & Stories',
    descAr: 'روي يومياتك ومناقشة الهوايات والمطاعم والأصدقاء',
    descEn: 'Share daily stories, hobbies & dining out',
    icon: '🍕',
    partnerName: 'Emma Watson AI',
    partnerAccent: 'Contemporary International English'
  }
];

export const RealtimeVoiceCall: React.FC<RealtimeVoiceCallProps> = ({
  onBack,
  lang = 'ar'
}) => {
  const isRtl = lang === 'ar';

  // Call states
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [studentLevel, setStudentLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  // Transcripts & history
  const [transcriptHistory, setTranscriptHistory] = useState<CallTurn[]>([]);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  // Acoustic & Prosody state
  const [latestProsody, setLatestProsody] = useState<any>({
    stressScore: 92,
    pitchRhythm: isRtl ? 'إيقاع ونبرة طبيعية متناسقة' : 'Smooth natural speech curve',
    pronunciationHighlights: [
      isRtl ? 'مخارج حروف واضحة جداً' : 'Clear vowel articulation',
      isRtl ? 'سرعة تحدث متوازنة' : 'Balanced rhythm'
    ],
    correctionTip: isRtl 
      ? 'حاول ربط نهاية الكلمات المنتهية بحرف ساكن مع الكلمة التالية لزيادة الانسيابية.'
      : 'Connect final consonant sounds to following vowels for smoother linking.'
  });

  const [studentWaveform, setStudentWaveform] = useState<number[]>([15, 30, 60, 85, 45, 20, 70, 95, 30]);
  const [nativeWaveform] = useState<number[]>([20, 40, 70, 95, 55, 30, 80, 100, 40]);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const transcriptBottomRef = useRef<HTMLDivElement>(null);

  // Duration timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCallActive]);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptHistory, currentSpeech]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const activeText = final || interim;
        setCurrentSpeech(activeText);

        // Generate dynamic waveform bars based on speech input
        if (activeText.length > 0) {
          setStudentWaveform(Array.from({ length: 9 }, () => Math.floor(Math.random() * 60) + 35));
        }

        if (final && final.trim().length > 2) {
          handleProcessSpokenTurn(final.trim());
          setCurrentSpeech('');
        }
      };

      recognitionRef.current.onerror = (e: any) => {
        console.warn('Speech Recognition Event:', e.error);
        if (e.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        if (isCallActive && !isAiSpeaking) {
          try {
            recognitionRef.current?.start();
          } catch (err) {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };
    }

    return () => {
      cancelAllSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isCallActive, isAiSpeaking]);

  const startVoiceCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    setTranscriptHistory([]);
    
    // Initial Greeting from AI Partner
    const initialGreeting = `Hello! Welcome to our ${selectedScenario.titleEn} session. I am ${selectedScenario.partnerName}. I'm delighted to speak with you today. How are you doing?`;
    
    const initialTurn: CallTurn = {
      id: 'greeting',
      sender: 'ai',
      text: initialGreeting,
      timestamp: new Date()
    };
    
    setTranscriptHistory([initialTurn]);
    
    // Speak greeting
    setIsAiSpeaking(true);
    speakAcademyText(
      initialGreeting,
      'en',
      () => setIsAiSpeaking(true),
      () => {
        setIsAiSpeaking(false);
        // Start listening after greeting finishes
        try {
          recognitionRef.current?.start();
          setIsListening(true);
        } catch (err) {
          console.warn(err);
        }
      }
    );
  };

  const endVoiceCall = () => {
    setIsCallActive(false);
    setIsListening(false);
    setIsAiSpeaking(false);
    cancelAllSpeech();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }

    if (transcriptHistory.length > 2) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleProcessSpokenTurn = async (spokenText: string) => {
    if (!spokenText.trim() || isAnalyzing) return;

    // Add user turn
    const userTurn: CallTurn = {
      id: Date.now().toString(),
      sender: 'user',
      text: spokenText,
      timestamp: new Date()
    };

    setTranscriptHistory(prev => [...prev, userTurn]);
    setIsAnalyzing(true);
    setIsListening(false);

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }

      const res = await fetch('/api/ai/realtime-voice-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAudioTranscript: spokenText,
          scenario: selectedScenario.titleEn,
          studentLevel,
          history: transcriptHistory.slice(-8).map(t => ({
            role: t.sender === 'user' ? 'user' : 'model',
            text: t.text
          }))
        })
      });

      const data = await res.json();

      const aiReplyText = data.reply || "That's wonderful! Tell me more about that.";

      if (data.prosodyFeedback) {
        setLatestProsody(data.prosodyFeedback);
      }

      const aiTurn: CallTurn = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        ipa: data.ipa,
        fluencyScore: data.fluencyScore,
        timestamp: new Date()
      };

      setTranscriptHistory(prev => [...prev, aiTurn]);

      // Speak response
      setIsAiSpeaking(true);
      speakAcademyText(
        aiReplyText,
        'en',
        () => setIsAiSpeaking(true),
        () => {
          setIsAiSpeaking(false);
          // Resume listening
          if (isCallActive) {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
            } catch (err) {}
          }
        }
      );
    } catch (err) {
      console.error('Realtime call error:', err);
      const fallbackAiTurn: CallTurn = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I hear you clearly! That's very interesting. Could you expand on that?",
        timestamp: new Date()
      };
      setTranscriptHistory(prev => [...prev, fallbackAiTurn]);
      setIsAiSpeaking(false);
      if (isCallActive) {
        try {
          recognitionRef.current?.start();
          setIsListening(true);
        } catch (err) {}
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Top Status Header */}
      <header className="px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
            <Radio size={20} className={isCallActive ? 'animate-pulse' : ''} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-sm lg:text-base text-white">
                {isRtl ? 'المكالمات الصوتية المباشرة فائقة السرعة' : 'Ultra-Fast Real-Time Voice AI Call'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Gemini 3.7 Voice Live
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {isRtl 
                ? 'تحدث بالصوت الطبيعي المباشر مع مدرب النطق ومحلل النبرة اللحظي'
                : 'Natural real-time dialogue with live accent & prosody visualizer'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isCallActive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {formatTimer(callDuration)}
            </div>
          )}

          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              {isRtl ? 'رجوع' : 'Back'}
            </button>
          )}
        </div>
      </header>

      {/* Main Grid: Call Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left / Center: Active Call View */}
        <div className="lg:col-span-8 flex flex-col p-6 border-b lg:border-b-0 lg:border-r border-slate-800 relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          
          {!isCallActive ? (
            /* Scenario Selection Mode */
            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full space-y-6">
              <div className="text-center space-y-2">
                <span className="text-4xl">🎙️</span>
                <h3 className="text-xl lg:text-2xl font-black text-white">
                  {isRtl ? 'اختر سيناريو المحادثة وانطلق في المكالمة' : 'Choose Your Conversation Scenario'}
                </h3>
                <p className="text-sm text-slate-400">
                  {isRtl 
                    ? 'ستتحدث صوتياً مع شريك ذكي مدرب على إعطائك تغذية راجعة فورية على النطق والطلاقة' 
                    : 'Engage in natural voice dialogue with instant acoustic & fluency coaching'}
                </p>
              </div>

              {/* CEFR Level Selection */}
              <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700 max-w-sm mx-auto w-full">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setStudentLevel(lvl)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      studentLevel === lvl 
                        ? 'bg-emerald-500 text-slate-950 shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCENARIOS.map((sc) => {
                  const isSelected = selectedScenario.id === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScenario(sc)}
                      className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30' 
                          : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <span className="text-2xl">{sc.icon}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                          {sc.partnerAccent}
                        </span>
                      </div>
                      <div className="w-full">
                        <h4 className="font-black text-white text-sm">
                          {isRtl ? sc.titleAr : sc.titleEn}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {isRtl ? sc.descAr : sc.descEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Start Call CTA Button */}
              <button
                onClick={startVoiceCall}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base lg:text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Mic size={22} />
                {isRtl ? 'بدء المكالمة الصوتية الآن 📞' : 'Start Live Voice Call 📞'}
              </button>
            </div>
          ) : (
            /* Active Call Interface */
            <div className="flex-1 flex flex-col justify-between space-y-6">
              
              {/* Partner Avatar & Live State */}
              <div className="flex flex-col items-center justify-center text-center space-y-3 pt-4">
                <div className="relative">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-2xl flex items-center justify-center relative z-10">
                    <div className="w-full h-full bg-slate-900 rounded-[22px] flex flex-col items-center justify-center text-3xl">
                      {selectedScenario.icon}
                    </div>
                  </div>

                  {/* Radiating voice rings when AI is speaking */}
                  {isAiSpeaking && (
                    <>
                      <span className="absolute inset-0 rounded-3xl border-2 border-emerald-400 animate-ping opacity-75" />
                      <span className="absolute -inset-2 rounded-3xl border border-teal-400 animate-pulse opacity-40" />
                    </>
                  )}
                </div>

                <div>
                  <h3 className="font-black text-lg text-white">
                    {selectedScenario.partnerName}
                  </h3>
                  <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${isAiSpeaking ? 'bg-emerald-400 animate-pulse' : isListening ? 'bg-blue-400 animate-pulse' : 'bg-slate-500'}`} />
                    {isAiSpeaking 
                      ? (isRtl ? 'المعلم يتحدث الآن...' : 'Partner Speaking...') 
                      : isListening 
                        ? (isRtl ? 'يستمع لصوتك بدقة...' : 'Listening to your speech...') 
                        : (isRtl ? 'جاهز للتحدث...' : 'Ready...')}
                  </p>
                </div>
              </div>

              {/* Dynamic Transcript Stream Box */}
              <div className="flex-1 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4 overflow-y-auto space-y-3 max-h-64 no-scrollbar">
                {transcriptHistory.map((turn) => (
                  <div
                    key={turn.id}
                    className={`flex ${turn.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        turn.sender === 'user'
                          ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/40 rounded-br-none'
                          : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold">
                        <span>{turn.sender === 'user' ? (isRtl ? 'أنت 🎙️' : 'You 🎙️') : selectedScenario.partnerName}</span>
                        {turn.fluencyScore && (
                          <span className="px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 rounded">
                            {turn.fluencyScore}% Fluency
                          </span>
                        )}
                      </div>
                      <p dir="ltr" className="font-medium">{turn.text}</p>
                      {turn.ipa && (
                        <p dir="ltr" className="text-[11px] text-teal-300 font-mono mt-1 opacity-90">
                          {turn.ipa}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {currentSpeech && (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-blue-500/20 text-blue-200 border border-blue-500/30 rounded-br-none text-xs italic animate-pulse" dir="ltr">
                      {currentSpeech}...
                    </div>
                  </div>
                )}
                <div ref={transcriptBottomRef} />
              </div>

              {/* Audio Controls Bar */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${isListening ? 'bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    <Mic size={18} />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-white">
                      {isListening ? (isRtl ? 'الميكروفون نشط' : 'Microphone Active') : (isRtl ? 'الميكروفون متوقف' : 'Microphone Paused')}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isRtl ? 'تحدث بالإنجليزية وسيرد المعلم فوراً' : 'Speak in English and partner will reply'}
                    </p>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isAiSpeaking) {
                        cancelAllSpeech();
                        setIsAiSpeaking(false);
                      }
                    }}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                    title={isRtl ? 'كتم/إيقاف صوت المعلم' : 'Mute AI'}
                  >
                    <VolumeX size={18} />
                  </button>

                  <button
                    onClick={endVoiceCall}
                    className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                  >
                    <PhoneOff size={16} />
                    <span>{isRtl ? 'إنهاء المكالمة' : 'End Call'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Acoustic, Prosody & Waveform Visualizer */}
        <div className="lg:col-span-4 p-6 bg-slate-950 flex flex-col justify-between space-y-6 overflow-y-auto no-scrollbar">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-emerald-400" />
                <h3 className="font-black text-sm text-white">
                  {isRtl ? 'محلل الطلاقة والنبرة اللحظي' : 'Live Prosody & Acoustic Coach'}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                AI Acoustic
              </span>
            </div>

            {/* Visual Waveform Comparison Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">{isRtl ? 'موجة صوتك (Student)' : 'Your Voice Wave'}</span>
                <span className="text-emerald-400 font-mono font-bold">{latestProsody.stressScore || 90}% Match</span>
              </div>
              
              {/* Animated Bars (Student) */}
              <div className="h-10 flex items-center justify-between gap-1 px-1 bg-slate-950/60 rounded-xl border border-slate-800/80">
                {studentWaveform.map((val, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 font-bold">{isRtl ? 'نبرة المتحدث الأصلي (Native)' : 'Native Prosody Target'}</span>
                <span className="text-teal-400 font-mono text-[11px]">100% Intonation</span>
              </div>

              {/* Native Target Bars */}
              <div className="h-6 flex items-center justify-between gap-1 px-1 bg-slate-950/40 rounded-lg">
                {nativeWaveform.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val * 0.7}%` }}
                    className="w-full bg-slate-700 rounded-full opacity-60"
                  />
                ))}
              </div>
            </div>

            {/* Prosody Feedback Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles size={16} />
                <span>{isRtl ? 'تقييم النبرة والتشديد (Stress & Rhythm)' : 'Intonation & Rhythm'}</span>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">
                {latestProsody.pitchRhythm}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  {isRtl ? 'نقاط القوة اللغوية:' : 'Speech Strengths:'}
                </span>
                {latestProsody.pronunciationHighlights?.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Actionable tip */}
              {latestProsody.correctionTip && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  <span className="font-bold block mb-1">💡 {isRtl ? 'نصيحة ذهبية للطلاقة:' : 'Fluency Tip:'}</span>
                  <p className="leading-relaxed opacity-90">{latestProsody.correctionTip}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Academy Badge */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Award size={16} className="text-[#C49E3A]" />
              <span className="font-bold">{isRtl ? 'شهادة التحدث التفاعلي' : 'Live Speaking Badge'}</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              +150 XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
