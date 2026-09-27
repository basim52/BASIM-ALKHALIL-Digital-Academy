import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Volume2, VolumeX, Mic, Send, ArrowRight, RefreshCw, ExternalLink } from 'lucide-react';
import { auth } from '../lib/firebase';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface SaraTutorProps {
  studentName?: string;
  level?: string;
  onOpenSection: (id: string) => void;
  onBack?: () => void;
  isRtl?: boolean;
}

interface ChatMsg {
  role: 'user' | 'model';
  text: string;
  actions?: { type: string; sectionId: string }[];
}

interface SaraBoard {
  title?: string;
  sentence?: string;
  highlight?: string;
  correction?: { wrong: string; right: string };
  quiz?: { question: string; options: string[]; answerIndex: number };
}

interface SaraResponse {
  reply: string;
  board?: SaraBoard;
  actions?: { type: string; sectionId: string }[];
  sessionDone?: boolean;
}

interface SpeechRec {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

const getSpeechRecCtor = (): (new () => SpeechRec) | null => {
  const w = window as unknown as { SpeechRecognition?: new () => SpeechRec; webkitSpeechRecognition?: new () => SpeechRec };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

const sectionArabicNames: Record<string, string> = {
  'grammar-academy': 'أكاديمية القواعد',
  'reading-lab': 'مختبر القراءة',
  'writing-spelling-studio': 'استوديو التعبير والإملاء',
  'pronunciation-lab': 'معمل النطق',
  'interactive-learning': 'تعليم تفاعلي',
  'educational-games': 'واحة الألعاب',
  'story-library': 'مكتبة القصص',
  'video-library': 'مكتبة الفيديو',
  'live-translate': 'مترجم المباشر',
  'early-childhood': 'الطفولة المبكرة',
  'placement-test': 'اختبار تحديد المستوى',
  'flashcards-hub': 'البطاقات التعليمية',
  'english-songs': 'أغاني إنجليزية',
};

export default function SaraTutor({ studentName, level, onOpenSection, onBack, isRtl }: SaraTutorProps) {
  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    try {
      const saved = sessionStorage.getItem('sara_session_v1');
      return saved ? (JSON.parse(saved).messages ?? []) : [];
    } catch {
      return [];
    }
  });
  const [board, setBoard] = useState<SaraBoard | null>(() => {
    try {
      const saved = sessionStorage.getItem('sara_session_v1');
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed?.board ?? null;
    } catch {
      return null;
    }
  });
  const [sessionDone, setSessionDone] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('sara_session_v1');
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed?.sessionDone ?? false;
    } catch {
      return false;
    }
  });
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [ttsOn, setTtsOn] = useState<boolean>(() => localStorage.getItem('sara_tts') === '1');
  const [listening, setListening] = useState<boolean>(false);
  const [quizPick, setQuizPick] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<SpeechRec | null>(null);

  useEffect(() => {
    sessionStorage.setItem('sara_session_v1', JSON.stringify({ messages, board, sessionDone }));
  }, [messages, board, sessionDone]);

  useEffect(() => {
    return () => {
      cancelAllSpeech();
      recRef.current?.stop();
    };
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const speak = (text: string) => {
    if (!ttsOn) return;
    const arabicLetterCount = (text.match(/[؀-ۿ]/g) || []).length;
    const latinLetterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const lang = arabicLetterCount > 0 && latinLetterCount <= arabicLetterCount ? 'ar' : 'en';
    speakAcademyText(text, lang, () => setSpeaking(true), () => setSpeaking(false));
  };

  const toggleTts = () => {
    setTtsOn(prev => {
      const next = !prev;
      localStorage.setItem('sara_tts', next ? '1' : '0');
      if (!next) {
        cancelAllSpeech();
        setSpeaking(false);
      }
      return next;
    });
  };

  const newLesson = () => {
    cancelAllSpeech();
    setMessages([]);
    setBoard(null);
    setSessionDone(false);
    setInput('');
    setQuizPick(null);
    sessionStorage.removeItem('sara_session_v1');
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    const history = messages.slice(-12).map(m => ({ role: m.role, text: m.text }));
    let token: string | null = null;
    try {
      const user = await auth.currentUser;
      token = user ? await user.getIdToken() : null;
    } catch (e) {
      console.error('Failed to get ID token:', e);
    }

    if (!token) {
      setMessages(prev => [...prev, { role: 'model', text: 'سجّل دخولك مرة ثانية عشان نكمل 🙏' }]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/sara/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
          history,
          student: { name: studentName, level },
        }),
      });

      if (res.status === 401) {
        setMessages(prev => [...prev, { role: 'model', text: 'سجّل دخولك مرة ثانية عشان نكمل 🙏' }]);
      } else if (res.status === 429) {
        const data = await res.json();
        const msg = data.message || 'خلصت رسائل اليوم، نكمل بكرة إن شاء الله 🌙';
        setMessages(prev => [...prev, { role: 'model', text: msg }]);
      } else if (!res.ok) {
        setMessages(prev => [...prev, { role: 'model', text: 'صار خطأ بسيط، جرّب مرة ثانية 🙏' }]);
      } else {
        const data: SaraResponse = await res.json();
        setMessages(prev => [...prev, { role: 'model', text: data.reply, actions: data.actions?.filter(a => a.type === 'open_section') ?? [] }]);
        if (data.board) {
          setBoard(data.board);
          setQuizPick(null);
        }
        if (data.sessionDone) {
          setSessionDone(true);
        }
        if (ttsOn && data.reply) {
          speak(data.reply);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'صار خطأ بسيط، جرّب مرة ثانية 🙏' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    const Ctor = getSpeechRecCtor();
    if (!Ctor) return;
    if (listening) {
      recRef.current?.stop();
      setListening(false);
    } else {
      const rec = new Ctor();
      recRef.current = rec;
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      rec.start();
      setListening(true);
    }
  };

  const handleQuizPick = (index: number) => {
    if (!board?.quiz) return;
    setQuizPick(index);
    const option = board.quiz.options[index];
    sendMessage(`My answer: ${option}`);
  };

  return (
    <div dir="rtl" className="max-w-3xl mx-auto p-3 sm:p-6 space-y-4 pb-28">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        {onBack && (
          <button onClick={onBack} className="rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-3 py-2 font-black text-slate-600 flex items-center gap-2">
            <ArrowRight size={18} className="rotate-180" />
            رجوع
          </button>
        )}
        {messages.length > 0 && (
          <button onClick={newLesson} className="rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-3 py-2 font-black text-slate-600 flex items-center gap-2">
            <RefreshCw size={18} />
            درس جديد
          </button>
        )}
      </div>

      {/* Avatar card */}
      <div className="bg-white rounded-3xl border-2 border-b-4 border-slate-200 p-4 flex items-center gap-4">
        <div className="relative w-20 h-20">
          {speaking && (
            <span className="absolute inset-0 rounded-full bg-[#58cc02]/30 animate-ping" />
          )}
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="#e8f7d9" />
            {/* Hijab */}
            <path d="M30 20 Q25 10 50 10 Q75 10 70 20 L70 60 Q68 62 65 62 Q62 62 60 60 L60 20 Q58 18 50 18 Q42 18 40 20 L40 60 Q38 62 35 62 Q32 62 30 60 Z" fill="#58cc02" />
            {/* Hijab fold */}
            <path d="M40 40 Q38 38 35 38 Q32 38 30 40" fill="#46a302" />
            {/* Face */}
            <ellipse cx="50" cy="46" rx="17" ry="20" fill="#f5d0b0" />
            {/* Eyes */}
            <circle cx="43" cy="40" r="2.2" fill="#3b2f2f" />
            <circle cx="57" cy="40" r="2.2" fill="#3b2f2f" />
            {/* Cheeks */}
            <circle cx="40" cy="52" r="3" fill="#f4a6a6" opacity="0.6" />
            <circle cx="60" cy="52" r="3" fill="#f4a6a6" opacity="0.6" />
            {/* Smile */}
            <path d="M40 58 Q50 68 60 58" stroke="#b0554f" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="font-black text-lg text-slate-800">سارة – معلمتك</div>
          {loading ? (
            <>
              <span className="inline-flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span className="ml-2">سارة تكتب…</span>
            </>
          ) : speaking ? (
            '🔊 سارة تتكلم…'
          ) : (
            <span className="text-sm text-slate-500 font-bold">معلمتك الذكية للغة الإنجليزية ✨</span>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggleTts} className={`rounded-2xl border-2 border-b-4 px-3 py-2 text-xs font-black ${ttsOn ? 'bg-[#58cc02] text-white border-[#46a302]' : 'bg-white text-slate-500 border-slate-200'}`}>
            {ttsOn ? <VolumeX size={18} /> : <Volume2 size={18} />}
            🔊 سارة تتكلم
          </button>
        </div>
      </div>

      {/* Lesson Board */}
      {board && (
        <div className="bg-white rounded-3xl border-2 border-b-4 border-slate-200 p-4">
          <h3 className="text-[#58cc02] font-black text-sm">سبورة الدرس 📝</h3>
          <div dir="ltr" className="text-left space-y-3 mt-2">
            {board.title && <p className="font-black text-slate-800">{board.title}</p>}
            {board.sentence && (
              <div className="bg-slate-50 rounded-2xl p-3 text-lg font-bold relative">
                {board.highlight ? (() => {
                  const text = board.sentence;
                  const highlight = board.highlight;
                  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
                  if (index === -1) return text;
                  const before = text.slice(0, index);
                  const match = text.slice(index, index + highlight.length);
                  const after = text.slice(index + highlight.length);
                  return (
                    <>
                      {before}
                      <mark className="bg-yellow-200 rounded px-1">{match}</mark>
                      {after}
                    </>
                  );
                })() : board.sentence}
              </div>
            )}
            {board.correction && (
              <div className="flex items-baseline gap-2">
                <span className="text-red-500 line-through">{board.correction.wrong}</span>
                <span className="text-green-600 font-black">{board.correction.right}</span>
              </div>
            )}
            {board.quiz && (
              <>
                <p className="font-bold">{board.quiz.question}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {board.quiz.options.map((opt, idx) => {
                    const isCorrect = idx === board.quiz?.answerIndex;
                    const isPicked = quizPick === idx;
                    const baseClasses = `border-2 border-b-4 border-slate-200 rounded-2xl p-3 font-bold ${quizPick === null ? 'hover:border-[#58cc02]' : 'cursor-not-allowed'}`;
                    const pickedClasses = isPicked
                      ? isCorrect
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-red-50 border-red-500 text-red-600'
                      : 'bg-white text-slate-800';
                    return (
                      <button
                        key={idx}
                        onClick={() => !quizPick && handleQuizPick(idx)}
                        className={`${baseClasses} ${pickedClasses} w-full`}
                        disabled={quizPick !== null}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizPick !== null && (
                  <p className="mt-2 text-center font-bold" dir="rtl">
                    {quizPick === board.quiz?.answerIndex
                      ? 'أحسنت! إجابة صحيحة ✅'
                      : `قريبة! الإجابة الصحيحة: ${board.quiz.options[board.quiz.answerIndex]} ❌`}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Chat card */}
      <div className="bg-white rounded-3xl border-2 border-b-4 border-slate-200 p-3 sm:p-4 space-y-3 max-h-[55vh] overflow-y-auto">
        {messages.length === 0 && !sessionDone && (
          <div className="text-center space-y-4">
            <p className="font-bold text-slate-700">{`هلا ${studentName || 'بطلنا'}! أنا سارة، معلمتك للإنجليزي 👋 جاهز نبدأ درس اليوم؟`}</p>
            <button onClick={() => sendMessage('مرحبا سارة')} className="bg-[#58cc02] text-white rounded-2xl border-b-4 border-[#46a302] px-4 py-2 font-black">
              ابدأ الدرس
            </button>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            {msg.role === 'user' && (
              <div dir="auto" className="self-start bg-[#58cc02] text-white rounded-2xl rounded-tr-sm max-w-[85%] px-4 py-2.5 font-bold text-sm whitespace-pre-wrap">
                {msg.text}
              </div>
            )}
            {msg.role === 'model' && (
              <>
                <div dir="auto" className="self-end bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm max-w-[85%] px-4 py-2.5 font-bold text-sm whitespace-pre-wrap">
                  {msg.text}
                </div>
                {msg.actions?.map((action, actIdx) => (
                  <button
                    key={actIdx}
                    onClick={() => onOpenSection(action.sectionId)}
                    className="mt-2 w-fit bg-[#1cb0f6] text-white rounded-xl border-b-4 border-[#1292ce] px-3 py-1.5 text-xs font-black flex items-center gap-1"
                  >
                    افتح التمرين
                    {sectionArabicNames[action.sectionId] && (
                      <span className="ml-1 text-xs">{sectionArabicNames[action.sectionId]}</span>
                    )}
                    <ExternalLink size={14} className="ml-1" />
                  </button>
                ))}
              </>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-center">
            <div className="self-end bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm max-w-[85%] px-4 py-2.5 font-bold text-sm whitespace-pre-wrap dir-auto">
              <span className="inline-flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Session done banner */}
      {sessionDone && (
        <div className="bg-[#58cc02]/10 border-2 border-[#58cc02] rounded-3xl p-4 text-center font-black text-[#46a302]">
          أحسنت! انتهى درس اليوم 🎉
          <button onClick={newLesson} className="mt-4 bg-[#58cc02] text-white rounded-2xl border-b-4 border-[#46a302] px-4 py-2 font-black">
            درس جديد
          </button>
        </div>
      )}

      {/* Input bar */}
      <div className="sticky bottom-3 left-0 right-0 bg-white rounded-3xl border-2 border-b-4 border-slate-200 p-2 flex items-center gap-2">
        {getSpeechRecCtor() && (
          <button
            onClick={handleMicClick}
            className={`rounded-2xl p-3 ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600'}`}
          >
            <Mic size={18} />
          </button>
        )}
        <input
          dir="auto"
          maxLength={1000}
          placeholder="اكتب لسارة… (Write in English!)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          className="flex-1 min-w-0 bg-transparent px-2 py-2 font-bold outline-none"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className={`bg-[#58cc02] text-white rounded-2xl border-b-4 border-[#46a302] p-3 ${loading || !input.trim() ? 'opacity-50' : ''}`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}