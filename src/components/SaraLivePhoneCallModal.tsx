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
import { cancelAllSpeech, setExclusiveAudioOwner, prefetchAcademyAudio, playCloudAudioAs } from '../lib/audio';
import { saraUnlockNarrator } from './SaraTrackPlayer';
import { buildCallContext, saveCallRecord, type CallContext, type CallRecord } from '../lib/saraCallLink';


import { mergeSpeech, collapseRepeats, sessionText } from '../lib/speechMerge';
import { SaraAvatar } from './SaraAvatar';
import { canUseSara3D } from '../lib/sara3dSupport';
const SaraCall3D = React.lazy(() => import('./SaraCall3D')); // three.js only loads when a conversation opens
/** The student's silence allowance per turn (before speaking and between words). */
const STUDENT_WAIT_MS = 10000;
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
  /** Linkage: real student data so Sara practises what this student needs. */
  studentId?: string;
  lessonTitle?: string;
  recentMistakes?: string[];
  /** Lesson mode: one fixed scenario (from a lesson) and the key phrases Sara nudges the student to use. */
  preset?: PhoneScenario & { keyPhrases?: string[]; trackTag?: string };
}

export const SaraLivePhoneCallModal: React.FC<SaraLivePhoneCallModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentLevel,
  isRtl,
  onSuccessXP,
  onSaveCallSummary,
  onSendTranscriptToChat,
  studentId,
  lessonTitle,
  recentMistakes,
  preset
}) => {
  const [callCtx, setCallCtx] = useState<CallContext | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    buildCallContext(studentId, { placement: studentLevel, lessonTitle, mistakes: recentMistakes }).then(c => { if (alive) setCallCtx(c); });
    return () => { alive = false; };
  }, [isOpen, studentId, lessonTitle]);
  const [callState, setCallStateRaw] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [selectedScenario, setSelectedScenario] = useState<PhoneScenario>(preset || PHONE_SCENARIOS[0]);
  useEffect(() => { if (isOpen && preset) setSelectedScenario(preset); }, [isOpen, preset?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const keyPhrases = preset?.keyPhrases || [];
  const isWords = preset?.trackTag === 'vocab';
  const isFree = preset?.id === 'free-talk';
  const [typed, setTyped] = useState('');
  type RP = { said: string; better: string; tipAr: string };
  type Review = { tooShort?: boolean; verdict?: string; verdictAr?: string; summaryAr?: string; pronunciationNoteAr?: string; pronunciation?: RP[]; vocabulary?: RP[]; grammar?: RP[]; fluency?: RP[] };
  const [review, setReview] = useState<{ st: 'loading' | 'ok' | 'fail'; d?: Review } | null>(null);
  const [revTab, setRevTab] = useState<'pronunciation' | 'vocabulary' | 'grammar' | 'fluency'>('grammar');
  const [revVoice, setRevVoice] = useState<'idle' | 'loading' | 'fail'>('idle');
  const recRef = useRef<CallRecord | null>(null);
  /** End-of-call review (free mode only): the real transcript goes to the AI; nothing is evaluated during the call. */
  const fetchReview = async () => {
    setReview({ st: 'loading' });
    try {
      const r = await fetch('/api/sara/call-review', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: studentLevel, transcript: transcriptRef.current.map(t => ({ role: t.role, text: t.text })) }) });
      if (!r.ok) throw new Error(String(r.status));
      const d: Review = await r.json();
      setReview({ st: 'ok', d });
      const tabs = (['grammar', 'vocabulary', 'fluency', 'pronunciation'] as const).find(k => (d[k] || []).length);
      if (tabs) setRevTab(tabs);
      if (recRef.current && !d.tooShort) {
        const points = (['pronunciation', 'vocabulary', 'grammar', 'fluency'] as const).flatMap(k => (d[k] || []).map(p => ({ area: k, said: p.said, better: p.better })));
        recRef.current = { ...recRef.current, review: { verdict: d.verdict || '', verdictAr: d.verdictAr || '', summaryAr: d.summaryAr || '', points } };
        saveCallRecord(studentId, recRef.current);
      }
    } catch { setReview({ st: 'fail' }); }
  };
  const speakVerdict = async (text: string) => {
    setRevVoice('loading');
    const a = await prefetchAcademyAudio(text, 'ar', 'Kore').catch(() => null);
    if (!a) { setRevVoice('fail'); return; }
    setRevVoice('idle'); playCloudAudioAs('call', a);
  };
  const sendTyped = () => { const t = typed.trim(); if (!t || stateRef.current !== 'connected') return; setTyped(''); stopListening(); if (speakingRef.current) stopSaraAudio(); handleStudentSpoke(t); };
  const [usedPhrases, setUsedPhrases] = useState<string[]>([]);
  const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
  /** A key phrase counts as used when most of its words appear, in order, in what the student said (real speech text). */
  const phraseUsed = (said: string, ph: string) => {
    const w = norm(ph).split(' ').filter(x => x.length > 1); const t = norm(said);
    if (!w.length) return false; if (t.includes(norm(ph))) return true;
    let pos = 0, hit = 0; for (const x of w) { const k = t.indexOf(x, pos); if (k >= 0) { hit++; pos = k + x.length; } }
    return hit / w.length >= 0.75;
  };
  const [isMuted, setIsMutedRaw] = useState(false);
  const [isSpeakerOn, setIsSpeakerOnRaw] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);

  // Call analytics & state (all real counts)
  const [callSeconds, setCallSeconds] = useState(0);
  const [callTurns, setCallTurns] = useState(0);
  const [studentWordsSpoken, setStudentWordsSpoken] = useState(0);
  const [isSaraSpeaking, setIsSaraSpeakingRaw] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isStudentListening, setIsStudentListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [callTranscript, setCallTranscript] = useState<{ role: 'user' | 'sara'; text: string; time: string }[]>([]);
  const [currentAiSpeechText, setCurrentAiSpeechText] = useState('');
  const [voiceError, setVoiceError] = useState<null | 'audio' | 'ai'>(null);
  const [latencies, setLatencies] = useState<number[]>([]); // measured: student stops speaking → Sara's first audio (ms)

  // Refs mirror state so recognition / audio callbacks never read stale values.
  const stateRef = useRef(callState);
  const mutedRef = useRef(false);
  const speakerRef = useRef(true);
  const speakingRef = useRef(false);
  const transcriptRef = useRef<{ role: 'user' | 'sara'; text: string; time: string }[]>([]);
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const isComponentMounted = useRef<boolean>(true);
  const turnIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const playingRef = useRef<{ stop: () => void } | null>(null);
  const segRef = useRef<{ text: string; audio?: string | null }[]>([]);
  const playIdxRef = useRef(0);
  const streamDoneRef = useRef(true);
  const spokeAtRef = useRef(0);
  const lastUserTextRef = useRef('');
  const silenceTimerRef = useRef<any>(null);

  const setCallState = (s: 'idle' | 'calling' | 'connected' | 'ended') => { stateRef.current = s; setCallStateRaw(s); };
  const setIsMuted = (m: boolean) => { mutedRef.current = m; setIsMutedRaw(m); };
  const setIsSpeakerOn = (v: boolean) => { speakerRef.current = v; setIsSpeakerOnRaw(v); };
  const setIsSaraSpeaking = (v: boolean) => { speakingRef.current = v; setIsSaraSpeakingRaw(v); };
  const nowTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const pushLine = (role: 'user' | 'sara', text: string) => {
    transcriptRef.current = [...transcriptRef.current, { role, text, time: nowTime() }];
    setCallTranscript(transcriptRef.current);
  };
  const appendSara = (text: string, newTurn: boolean) => {
    const t = transcriptRef.current;
    if (!newTurn && t.length && t[t.length - 1].role === 'sara') {
      transcriptRef.current = [...t.slice(0, -1), { ...t[t.length - 1], text: `${t[t.length - 1].text} ${text}` }];
      setCallTranscript(transcriptRef.current);
    } else pushLine('sara', text);
  };

  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
      stopCallCleanup();
    };
  }, []);

  // While the call is open it owns the audio: other sounds stop and background narration can't interrupt Sara.
  useEffect(() => {
    if (!isOpen) return;
    setExclusiveAudioOwner('call');
    return () => { cancelAllSpeech('call'); setExclusiveAudioOwner(null); };
  }, [isOpen]);

  // Timer effect when connected
  useEffect(() => {
    if (callState === 'connected') {
      timerIntervalRef.current = setInterval(() => setCallSeconds(prev => prev + 1), 1000);
    } else if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [callState]);

  const stopSaraAudio = () => {
    turnIdRef.current++;
    abortRef.current?.abort(); abortRef.current = null;
    try { playingRef.current?.stop(); } catch (_) {}
    playingRef.current = null;
    cancelAllSpeech('call');
    segRef.current = []; playIdxRef.current = 0; streamDoneRef.current = true;
    setIsSaraSpeaking(false); setIsThinking(false);
  };

  const stopListening = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    finalizeTurnRef.current = null; clearStudentTurn();
    if (recognitionRef.current) { const r = recognitionRef.current; recognitionRef.current = null; r.onend = null; try { r.abort(); } catch (e) {} }
    setIsStudentListening(false);
  };

  const stopCallCleanup = () => {
    stopSaraAudio();
    stopListening();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  /** Sara's turn finished (all sentences played): hand the floor back to the student. */
  const afterSaraTurn = () => {
    setIsSaraSpeaking(false);
    if (stateRef.current === 'connected' && !mutedRef.current) setTimeout(() => startSpeechRecognition(), 120);
  };

  /** Plays queued sentences in order; each sentence's cloud audio may still be arriving. Sara's cloud voice only. */
  const pumpQueue = async (turn: number) => {
    if (turn !== turnIdRef.current || playingRef.current) return;
    const i = playIdxRef.current;
    const seg = segRef.current[i];
    if (!seg) { if (streamDoneRef.current) afterSaraTurn(); return; }
    if (seg.audio === undefined) return; // waiting for this sentence's audio
    let audio = seg.audio;
    if (!audio) { // the stream could not voice it: one direct retry, never a browser voice
      audio = await prefetchAcademyAudio(seg.text, 'en', 'Kore').catch(() => null);
      if (turn !== turnIdRef.current) return;
      if (!audio) { setVoiceError('audio'); setIsSaraSpeaking(false); return; }
      seg.audio = audio;
    }
    setVoiceError(null);
    setIsThinking(false);
    setIsSaraSpeaking(true);
    setCurrentAiSpeechText(seg.text);
    if (spokeAtRef.current) { const ms = Math.round(performance.now() - spokeAtRef.current); spokeAtRef.current = 0; setLatencies(l => [...l, ms]); }
    if (!speakerRef.current) { playIdxRef.current = i + 1; pumpQueue(turn); return; }
    let ended = false;
    const onEnd = () => {
      if (ended) return; ended = true;
      playingRef.current = null;
      if (turn !== turnIdRef.current) return;
      playIdxRef.current = i + 1;
      pumpQueue(turn);
    };
    const node = await playCloudAudioAs('call', audio, onEnd).catch(() => null);
    if (turn !== turnIdRef.current) { try { node?.stop(); } catch (_) {} return; }
    if (node && !ended) playingRef.current = node;
    else if (!node && !ended) { setVoiceError('audio'); setIsSaraSpeaking(false); }
  };

  /** Retry after a voice / connection failure: replays the stuck sentence, or resends the student's last words. */
  const retryVoice = () => {
    const kind = voiceError;
    setVoiceError(null);
    if (kind === 'ai' && lastUserTextRef.current) { askSara(lastUserTextRef.current, false); return; }
    const seg = segRef.current[playIdxRef.current];
    if (seg) { seg.audio = null; setIsSaraSpeaking(true); pumpQueue(turnIdRef.current); }
    else afterSaraTurn();
  };

  /** Speak a fixed line (greeting) through the same queue. */
  const speakLines = (texts: string[], audios: (string | null | undefined)[] = []) => {
    stopSaraAudio();
    const turn = turnIdRef.current;
    segRef.current = texts.map((text, k) => ({ text, audio: audios[k] === undefined ? null : audios[k] }));
    playIdxRef.current = 0; streamDoneRef.current = true;
    setIsSaraSpeaking(true);
    pumpQueue(turn);
  };

  // Start outgoing call: no fake ring — we warm the server and fetch Sara's greeting audio, then connect.
  const handleStartCall = async () => {
    setCallState('calling');
    setCallSeconds(0); setCallTurns(0); setUsedPhrases([]); setStudentWordsSpoken(0); setLatencies([]); setVoiceError(null);
    transcriptRef.current = []; setCallTranscript([]);
    saraUnlockNarrator();
    const starterText = selectedScenario.starterSaraSpeech;
    fetch('/api/sara/call-turn', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ warm: true }) }).catch(() => {});
    const greeting = await Promise.race([
      prefetchAcademyAudio(starterText, 'en', 'Kore').catch(() => null),
      new Promise<null>(r => setTimeout(() => r(null), 9000)),
    ]);
    if (!isComponentMounted.current || stateRef.current !== 'calling') return;
    setCallState('connected');
    pushLine('sara', starterText);
    speakLines([starterText], [greeting]);
  };

  // Student turn: the student gets up to STUDENT_WAIT_MS of silence (before speaking AND between words) before the
  // turn is sent. Words heard so far survive the browser's own recognizer restarts. «أنهيت» sends early.
  const turnTextRef = useRef('');        // final words already heard this turn
  const turnInterimRef = useRef('');     // current not-yet-final words
  const turnDeadlineRef = useRef(0);
  const turnTickRef = useRef<any>(null);
  const finalizeTurnRef = useRef<(() => void) | null>(null);
  const [waitLeft, setWaitLeft] = useState(0);
  const [heardSomething, setHeardSomething] = useState(false);
  const armStudentWait = () => {
    turnDeadlineRef.current = Date.now() + STUDENT_WAIT_MS;
    setWaitLeft(Math.ceil(STUDENT_WAIT_MS / 1000));
    if (!turnTickRef.current) turnTickRef.current = setInterval(() => {
      const left = turnDeadlineRef.current - Date.now();
      setWaitLeft(Math.max(0, Math.ceil(left / 1000)));
      if (left <= 0 && (turnTextRef.current || turnInterimRef.current).trim()) finalizeTurnRef.current?.();
    }, 250);
  };
  const clearStudentTurn = () => {
    if (turnTickRef.current) clearInterval(turnTickRef.current);
    turnTickRef.current = null; turnTextRef.current = ''; turnInterimRef.current = '';
    setWaitLeft(0); setHeardSomething(false);
  };
  const turnText = () => collapseRepeats(mergeSpeech(turnTextRef.current, turnInterimRef.current)); // earlier sessions + this one, no repeats
  /** «أنهيت»: send what was heard right now, without waiting. */
  const finishStudentTurn = () => { if (turnText()) finalizeTurnRef.current?.(); };

  // Speech Recognition Handling (reads refs, so hands-free restarts work)
  const startSpeechRecognition = (keepTurn = false) => {
    if (mutedRef.current || stateRef.current !== 'connected' || speakingRef.current) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { console.warn('SpeechRecognition API not available in this browser.'); return; }
    try {
      if (recognitionRef.current) { try { recognitionRef.current.abort(); } catch (e) {} recognitionRef.current = null; }
      if (!keepTurn) { clearStudentTurn(); armStudentWait(); }
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      let done = false;
      const finalize = () => {
        if (done) return; done = true;
        const text = turnText();
        clearStudentTurn();
        try { recognition.abort(); } catch (_) {}
        if (recognitionRef.current === recognition) recognitionRef.current = null;
        setIsStudentListening(false);
        if (text) handleStudentSpoke(text);
      };
      finalizeTurnRef.current = finalize;
      recognition.onstart = () => { setIsStudentListening(true); if (!keepTurn) setInterimTranscript(''); };
      const finals: string[] = []; // this session's final results, by result index (re-sent results overwrite, never append)
      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex || 0; i < event.results.length; ++i) {
          const t = String(event.results[i][0]?.transcript || '');
          if (event.results[i].isFinal) finals[i] = t.trim();
          else interim += ' ' + t;
        }
        // this session's words, deduped (Android sends cumulative/repeated finals); interim is only a preview on top
        turnInterimRef.current = sessionText(finals, interim);
        const all = turnText();
        setInterimTranscript(all);
        if (all) setHeardSomething(true);
        armStudentWait(); // every new sound restarts the 10 s pause allowance
      };
      const reopen = () => {
        if (done) return;
        if (recognitionRef.current === recognition) recognitionRef.current = null;
        // the recognizer stopped by itself: keep the same turn (and its words) open until the pause allowance runs out
        if (turnInterimRef.current) { turnTextRef.current = turnText(); turnInterimRef.current = ''; }
        if (stateRef.current !== 'connected' || mutedRef.current) { clearStudentTurn(); setIsStudentListening(false); return; }
        if (turnDeadlineRef.current - Date.now() <= 0 && turnText()) { finalize(); return; }
        setTimeout(() => { if (!done && !recognitionRef.current) startSpeechRecognition(true); }, 150);
      };
      recognition.onerror = (event: any) => {
        if (done || event.error === 'aborted') return;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') { setIsStudentListening(false); return; }
      };
      recognition.onend = reopen;
      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setIsStudentListening(false);
    }
  };

  /** Barge-in: tap while Sara talks to cut her off and speak. */
  const interruptSara = () => {
    if (!speakingRef.current && !isThinking) return;
    stopSaraAudio();
    setVoiceError(null);
    setTimeout(() => startSpeechRecognition(), 80);
  };

  // One streamed request per turn: sentences + their Sara-voice audio arrive as soon as each is ready.
  const askSara = async (spokenText: string, record: boolean) => {
    stopSaraAudio();
    const turn = turnIdRef.current;
    const ctrl = new AbortController(); abortRef.current = ctrl;
    segRef.current = []; playIdxRef.current = 0; streamDoneRef.current = false;
    setIsThinking(true); setIsSaraSpeaking(true);
    setCurrentAiSpeechText(isRtl ? 'سارة تفكر في الرد...' : 'Sara is thinking...');
    const history = transcriptRef.current.slice(record ? -9 : -8, -1).map(item => ({ role: item.role === 'sara' ? 'model' : 'user', text: item.text }));
    let first = true;
    try {
      const response = await fetch('/api/sara/call-turn', {
        method: 'POST', signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: spokenText, history,
          scenario: `${selectedScenario.titleEn}: ${selectedScenario.initialPrompt}`,
          level: studentLevel, name: studentName, context: isFree ? '' : (callCtx?.text || ''), free: isFree,
        }),
      });
      if (!response.ok || !response.body) throw new Error(`call-turn ${response.status}`);
      const reader = response.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      let failed = false;
      const handle = (line: string) => {
        if (!line.trim()) return;
        let ev: any; try { ev = JSON.parse(line); } catch { return; }
        if (turn !== turnIdRef.current) return;
        if (ev.t === 's') { segRef.current[ev.i] = { text: ev.text, audio: segRef.current[ev.i]?.audio }; appendSara(ev.text, first); first = false; }
        else if (ev.t === 'a') { if (segRef.current[ev.i]) segRef.current[ev.i].audio = ev.audio || null; pumpQueue(turn); }
        else if (ev.t === 'error') failed = true;
      };
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf('\n')) >= 0) { handle(buf.slice(0, nl)); buf = buf.slice(nl + 1); }
      }
      handle(buf);
      if (turn !== turnIdRef.current) return;
      streamDoneRef.current = true;
      segRef.current.forEach(s => { if (s && s.audio === undefined) s.audio = null; });
      if (failed && segRef.current.length === 0) throw new Error('AI failed');
      pumpQueue(turn);
    } catch (err: any) {
      if (err?.name === 'AbortError' || turn !== turnIdRef.current) return;
      console.error('Phone AI call error:', err);
      streamDoneRef.current = true;
      setIsThinking(false); setIsSaraSpeaking(false);
      setVoiceError('ai'); // honest error + retry instead of a canned reply
    }
  };

  // Student spoke
  const handleStudentSpoke = (spokenText: string) => { // speech arrives already deduped (turnText); typed text is kept as typed
    if (!spokenText.trim()) return;
    spokeAtRef.current = performance.now();
    lastUserTextRef.current = spokenText;
    pushLine('user', spokenText);
    setCallTurns(prev => prev + 1);
    setStudentWordsSpoken(prev => prev + spokenText.split(/\s+/).filter(Boolean).length);
    setInterimTranscript('');
    if (keyPhrases.length) setUsedPhrases(u => [...u, ...keyPhrases.filter(ph => !u.includes(ph) && phraseUsed(spokenText, ph))]);
    askSara(spokenText, true);
  };

  const avgLatency = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;

  // End Call
  const handleEndCall = () => {
    stopCallCleanup();
    setCallState('ended');
    const earnedXP = Math.max(20, Math.min(100, Math.floor(callSeconds / 3) + (callTurns * 5)));
    try { confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
    if (onSuccessXP) onSuccessXP(earnedXP);
    if (callTurns > 0) saveCallRecord(studentId, recRef.current = {
      at: Date.now(), scenario: selectedScenario.titleEn, scenarioAr: selectedScenario.titleAr, seconds: callSeconds, turns: callTurns,
      words: studentWordsSpoken, avgReplyMs: avgLatency,
      focus: keyPhrases.length ? [`${isRtl ? (isWords ? 'كلمات مستخدمة' : 'عبارات مستخدمة') : 'phrases used'} ${usedPhrases.length}/${keyPhrases.length}`, ...usedPhrases.slice(0, 4)] : (callCtx?.focusAr || []),
    });
    if (onSaveCallSummary) {
      const summary = `Sara Phone Call (${selectedScenario.titleEn}): ${formatTime(callSeconds)} duration, ${callTurns} speech turns, ${studentWordsSpoken} words spoken.${avgLatency ? ` Avg reply ${(avgLatency / 1000).toFixed(1)}s.` : ''}${keyPhrases.length ? ` Key phrases used ${usedPhrases.length}/${keyPhrases.length}: ${usedPhrases.join('; ') || 'none'}.` : callCtx?.focusEn.length ? ` Focus: ${callCtx.focusEn.join('; ')}.` : ''}`;
      onSaveCallSummary(summary);
    }
    setReview(null); setRevVoice('idle');
    if (isFree) { if (callTurns > 0) fetchReview(); else setReview({ st: 'ok', d: { tooShort: true } }); }
    if (onSendTranscriptToChat && transcriptRef.current.length > 0) {
      onSendTranscriptToChat(transcriptRef.current.map(t => ({ role: t.role, text: t.text })));
    }
  };

  if (!isOpen) return null;

  const NAVY = '#002147', GOLD = '#C49E3A';
  const [use3D, setUse3D] = useState(() => canUseSara3D());
  const [ready3D, setReady3D] = useState(false);
  const [callRoot, setCallRoot] = useState<HTMLDivElement | null>(null);
  const [camOn, setCamOn] = useState(false);
  const camVideoRef = useRef<HTMLVideoElement>(null);
  const camStreamRef = useRef<MediaStream | null>(null);
  const stopCam = () => { camStreamRef.current?.getTracks().forEach(t => t.stop()); camStreamRef.current = null; setCamOn(false); };
  /** AR feel: the student's own (front) camera behind Sara. Video only — the mic stays with speech recognition. */
  const toggleCam = async () => {
    if (camOn) { stopCam(); return; }
    try { const st = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 } }, audio: false }); camStreamRef.current = st; setCamOn(true); }
    catch { setCamOn(false); }
  };
  useEffect(() => { if (camOn && camVideoRef.current && camStreamRef.current) { camVideoRef.current.srcObject = camStreamRef.current; void camVideoRef.current.play().catch(() => {}); } }, [camOn]);
  useEffect(() => () => { camStreamRef.current?.getTracks().forEach(t => t.stop()); }, []);
  const phase: 'connecting' | 'thinking' | 'speaking' | 'listening' | 'idle' =
    callState === 'calling' ? 'connecting' : isThinking ? 'thinking' : isSaraSpeaking ? 'speaking' : isStudentListening ? 'listening' : 'idle';
  const phaseLabel = {
    connecting: isRtl ? 'جارٍ الاتصال بسارة…' : 'Connecting to Sara…',
    thinking: isRtl ? 'سارة تفكّر…' : 'Sara is thinking…',
    speaking: isRtl ? 'سارة تتحدث' : 'Sara is speaking',
    listening: isRtl ? 'سارة تسمعك… تكلّم' : 'Listening… speak now',
    idle: isMuted ? (isRtl ? 'المايك مكتوم' : 'Mic muted') : (isRtl ? 'الخط مفتوح' : 'Line open'),
  }[phase];
  const lastSara = [...callTranscript].reverse().find(t => t.role === 'sara');
  const lastUser = [...callTranscript].reverse().find(t => t.role === 'user');
  const close = () => { stopCam(); stopCallCleanup(); setCallState('idle'); onClose(); };
  const ring = phase === 'speaking' ? GOLD : phase === 'listening' ? '#34d399' : phase === 'thinking' ? '#fcd34d' : 'rgba(196,158,58,0.35)';

  const happy = phase !== 'thinking' && !!lastSara && /\b(great|excellent|well done|awesome|perfect|amazing|good job|fantastic|brilliant|nice)\b/i.test(lastSara.text);
  const Avatar = ({ size }: { size: number }) => (
    <div className="relative flex items-center justify-center" style={{ width: size + 40, height: size + 40 }}>
      {!ready3D && (phase === 'speaking' || phase === 'listening' || phase === 'connecting') && [0, 1].map(k => (
        <motion.div key={k} className="absolute rounded-full border-2" style={{ width: size, height: size, borderColor: ring }}
          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.8 }} />
      ))}
      <div className="relative z-10 transition-opacity duration-300" style={{ opacity: ready3D ? 0 : 1 }}>
        <SaraAvatar size={size} state={phase} happy={happy} ring={ring} />
      </div>
    </div>
  );

  const CtrlBtn = ({ on, onClick, icon, label, testid, danger }: { on?: boolean; onClick: () => void; icon: React.ReactNode; label: string; testid: string; danger?: boolean }) => (
    <button onClick={onClick} data-testid={testid} aria-pressed={on} className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform">
      <span className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-colors ${danger ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/40' : on ? 'bg-amber-300 text-[#002147] border-amber-200' : 'bg-white/5 text-white border-white/15'}`}>{icon}</span>
      <span className="text-[10px] font-bold text-white/70">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        data-testid="sara-call" ref={setCallRoot}
        className="w-full h-[100dvh] sm:h-[min(820px,94dvh)] sm:max-w-md sm:rounded-[2rem] flex flex-col text-white overflow-hidden relative sm:border"
        style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #001631 100%)`, borderColor: 'rgba(196,158,58,0.35)' }}
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(196,158,58,0.12)' }} />
        {camOn && <video ref={camVideoRef} data-testid="sara-cam" autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ transform: 'scaleX(-1)' }} />}
        {camOn && <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,33,71,.55), rgba(0,22,49,.35) 40%, rgba(0,22,49,.7))' }} />}
        {use3D && callRoot && <React.Suspense fallback={null}><SaraCall3D root={callRoot} state={phase} happy={happy} onReady={() => setReady3D(true)} onFail={() => { setUse3D(false); setReady3D(false); }} /></React.Suspense>}

        {/* Header */}
        <div className="px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-2 flex items-center justify-between relative z-10 shrink-0">
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-wide" style={{ color: GOLD }}>{isRtl ? 'مكالمة مع سارة' : 'Call with Sara'}</div>
            <div className="text-sm font-black truncate">{isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}</div>
          </div>
          <div className="flex items-center gap-2">
            {ready3D && <button data-testid="cam-toggle" onClick={toggleCam} aria-pressed={camOn} className={`h-8 px-2.5 rounded-full text-[11px] font-black cursor-pointer ${camOn ? 'bg-amber-300 text-[#002147]' : 'bg-white/10 text-white/85'}`}>{camOn ? (isRtl ? '📷 إيقاف' : '📷 Off') : (isRtl ? '📷 شغّل الكاميرا' : '📷 Camera')}</button>}
            {callState === 'connected' && <span className="text-xs font-black tabular-nums text-amber-300" data-testid="call-timer">{formatTime(callSeconds)}</span>}
            <button onClick={close} aria-label="close" className="w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center cursor-pointer">✕</button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] relative z-10">
          {/* PICK SCENARIO */}
          {callState === 'idle' && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex flex-col items-center text-center pt-1 pb-3 shrink-0">
                {Avatar({ size: 104 })}
                <p className="text-xs text-white/70 max-w-xs leading-relaxed -mt-1">
                  {preset ? (isRtl ? 'تكلّم بصوتك أو اكتب — سارة ترد بصوتها مباشرة.' : 'Speak or type — Sara answers in her own voice.') : (isRtl ? 'اختر موضوع المكالمة وتحدّث بصوتك — سارة ترد بصوتها مباشرة.' : 'Pick a topic and just talk — Sara answers in her own voice.')}
                </p>
                {!!callCtx?.focusAr.length && !preset && (
                  <p data-testid="call-focus" className="mt-1.5 text-[11px] font-bold text-amber-300 line-clamp-2 max-w-xs">
                    {isRtl ? '🎯 سارة بتركّز على: ' : '🎯 Sara will focus on: '}{(isRtl ? callCtx.focusAr : callCtx.focusEn).join(' · ')}
                  </p>
                )}
              </div>
              {preset ? (
                <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden" data-testid="call-preset">
                  <p className="text-[11px] font-black" style={{ color: GOLD }}>{keyPhrases.length ? (isRtl ? (isWords ? 'حاول تستخدم هالكلمات في كلامك:' : 'حاول تستخدم هالعبارات في كلامك:') : 'Try to use these phrases:') : (isRtl ? 'عن أي موضوع تحبه — بدون جمل جاهزة ولا تقييم. المكالمة تستمر لين تضغط إنهاء.' : 'Any topic you like — no set sentences, no scoring. It continues until you tap End.')}</p>
                  {keyPhrases.slice(0, 5).map(ph => <p key={ph} dir="ltr" className="text-[12.5px] font-bold text-white text-left rounded-xl px-2.5 py-1.5 border truncate" style={{ borderColor: 'rgba(196,158,58,0.35)', background: 'rgba(255,255,255,0.04)' }}>{ph}</p>)}
                </div>
              ) : (
              <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 content-start">
                {PHONE_SCENARIOS.map(sc => {
                  const on = selectedScenario.id === sc.id;
                  return (
                    <button key={sc.id} onClick={() => setSelectedScenario(sc)}
                      className="p-2.5 rounded-2xl border text-start flex items-center gap-2 cursor-pointer transition-colors"
                      style={{ background: on ? 'rgba(196,158,58,0.18)' : 'rgba(255,255,255,0.04)', borderColor: on ? GOLD : 'rgba(255,255,255,0.12)' }}>
                      <span className="text-xl shrink-0">{sc.icon}</span>
                      <span className="text-[11px] font-black leading-tight line-clamp-2">{isRtl ? sc.titleAr : sc.titleEn}</span>
                    </button>
                  );
                })}
              </div>
              )}
              <button onClick={handleStartCall} data-testid="call-start"
                className="mt-3 w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shrink-0"
                style={{ background: GOLD, color: NAVY }}>
                <Phone size={18} />
                {isRtl ? 'اتصل بسارة' : 'Call Sara'}
              </button>
            </div>
          )}

          {/* CONNECTING / IN CALL */}
          {(callState === 'calling' || callState === 'connected') && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex flex-col items-center pt-2 shrink-0">
                <div onClick={interruptSara} data-testid="call-barge-in" className={phase === 'speaking' || phase === 'thinking' ? 'cursor-pointer' : ''}>
                  {Avatar({ size: 148 })}
                </div>
                <div className="text-lg font-black -mt-1">{isRtl ? 'سارة' : 'Sara'}</div>
                <div data-testid="call-phase" data-phase={phase} className="mt-1 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.06)', color: phase === 'listening' ? '#6ee7b7' : '#fcd34d' }}>
                  {phase === 'listening' ? <Mic size={13} /> : phase === 'speaking' ? <Volume2 size={13} /> : <Radio size={13} />}
                  {phaseLabel}
                </div>
                <div className="h-7 mt-1 text-[10px] text-white/50 flex items-center justify-center gap-2">
                  {(phase === 'speaking' || phase === 'thinking') && (isRtl ? 'اضغط على سارة لمقاطعتها والتحدث' : 'Tap Sara to interrupt')}
                  {phase === 'listening' && (<>
                    <span data-testid="call-wait" className="inline-flex items-center gap-1.5 text-amber-200/80 font-bold">
                      <span className="relative w-14 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <span className="absolute inset-y-0 right-0 rounded-full transition-all duration-300" style={{ width: `${(waitLeft / (STUDENT_WAIT_MS / 1000)) * 100}%`, background: GOLD }} />
                      </span>
                      {heardSomething ? (isRtl ? `أكمل… ${waitLeft}ث` : `Go on… ${waitLeft}s`) : (isRtl ? 'خذ وقتك' : 'Take your time')}
                    </span>
                    {heardSomething && <button data-testid="call-done" onClick={finishStudentTurn} className="px-2.5 py-1 rounded-full font-black text-[11px] cursor-pointer" style={{ background: GOLD, color: NAVY }}>{isRtl ? 'أنهيت ✓' : 'Done ✓'}</button>}
                  </>)}
                </div>
              </div>

              {/* Live captions */}
              <div className="flex-1 min-h-0 flex flex-col justify-center py-2">
                {showCaptions && callState === 'connected' && (
                  <div data-testid="call-captions" className="rounded-2xl p-3 border overflow-hidden" style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(196,158,58,0.25)' }} dir="ltr">
                    {(interimTranscript || lastUser) && (
                      <p className="text-[11px] text-emerald-200/80 line-clamp-2 mb-1.5"><span className="font-black">{isRtl ? 'أنت: ' : 'You: '}</span>{interimTranscript || lastUser?.text}</p>
                    )}
                    <p className="text-sm sm:text-base font-bold leading-snug text-amber-100 line-clamp-4">
                      {isThinking ? '…' : (lastSara?.text || '')}
                    </p>
                  </div>
                )}
                {voiceError && (
                  <button onClick={retryVoice} data-testid="call-retry" className="mt-2 w-full py-2.5 rounded-2xl border text-amber-300 text-xs font-black flex items-center justify-center gap-2 cursor-pointer" style={{ borderColor: GOLD, background: 'rgba(196,158,58,0.12)' }}>
                    <RotateCcw size={14} />
                    {voiceError === 'ai' ? (isRtl ? 'تعذّر الوصول لسارة — أعد المحاولة' : "Couldn't reach Sara — retry") : (isRtl ? 'تعذّر تشغيل صوت سارة — أعد المحاولة' : "Sara's voice failed — retry")}
                  </button>
                )}
              </div>

              {/* Optional typing: same turn as speaking */}
              {callState === 'connected' && (
                <form onSubmit={e => { e.preventDefault(); sendTyped(); }} className="shrink-0 flex gap-1.5 pt-1" dir="ltr">
                  <input data-testid="call-type" value={typed} onChange={e => setTyped(e.target.value)} placeholder={isRtl ? 'أو اكتب بالإنجليزي…' : 'Or type in English…'}
                    className="flex-1 min-w-0 rounded-xl px-3 py-2 text-[13px] bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-[#C49E3A]" />
                  <button type="submit" data-testid="call-type-send" disabled={!typed.trim()} className="px-3 rounded-xl font-black text-[12px] disabled:opacity-40" style={{ background: GOLD, color: NAVY }}>{isRtl ? 'إرسال' : 'Send'}</button>
                </form>
              )}

              {/* Controls */}
              <div className="shrink-0 flex items-end justify-around pt-2">
                <CtrlBtn testid="call-mute" on={isMuted} onClick={() => { const m = !isMuted; setIsMuted(m); if (m) stopListening(); else startSpeechRecognition(); }}
                  icon={isMuted ? <MicOff size={22} /> : <Mic size={22} />} label={isMuted ? (isRtl ? 'مكتوم' : 'Muted') : (isRtl ? 'كتم' : 'Mute')} />
                <CtrlBtn testid="call-captions-toggle" on={showCaptions} onClick={() => setShowCaptions(!showCaptions)} icon={<MessageSquare size={22} />} label={isRtl ? 'الترجمة النصية' : 'Captions'} />
                <CtrlBtn testid="call-speaker" on={!isSpeakerOn} onClick={() => setIsSpeakerOn(!isSpeakerOn)} icon={isSpeakerOn ? <Volume2 size={22} /> : <VolumeX size={22} />} label={isRtl ? 'الصوت' : 'Sound'} />
                <CtrlBtn testid="call-end" danger onClick={callState === 'calling' ? () => { stopCallCleanup(); setCallState('idle'); } : handleEndCall} icon={<PhoneOff size={24} />} label={isRtl ? 'إنهاء' : 'End'} />
              </div>
            </div>
          )}

          {/* ENDED: real numbers only */}
          {callState === 'ended' && (
            <div className="flex-1 min-h-0 flex flex-col justify-center gap-4" data-testid="call-ended">
              <div className="text-center">
                {!isFree && <div className="inline-flex p-3 rounded-full mb-2" style={{ background: 'rgba(196,158,58,0.15)', color: GOLD }}><Award size={30} /></div>}
                <h4 className="text-lg font-black">{isRtl ? 'انتهت المكالمة' : 'Call ended'}</h4>
                <p className="text-xs text-white/70 mt-1">{isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}</p>
              </div>
              {!isFree && <div className="grid grid-cols-2 gap-2">
                {[
                  [isRtl ? 'المدة' : 'Duration', formatTime(callSeconds)],
                  [isRtl ? 'مرات تحدّثك' : 'Your turns', String(callTurns)],
                  [isRtl ? 'كلمات قلتها' : 'Words you said', String(studentWordsSpoken)],
                  [isRtl ? 'متوسط زمن رد سارة' : 'Avg Sara reply', avgLatency ? `${(avgLatency / 1000).toFixed(1)}s` : '—'],
                ].map(([k, v]) => (
                  <div key={k} className="p-3 rounded-2xl text-center border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(196,158,58,0.25)' }}>
                    <div className="text-base font-black text-amber-300 tabular-nums">{v}</div>
                    <div className="text-[10px] text-white/60 font-bold">{k}</div>
                  </div>
                ))}
              </div>}
              {keyPhrases.length > 0 && (
                <div data-testid="call-phrases-used" className="rounded-2xl p-2.5 border" style={{ borderColor: 'rgba(196,158,58,0.3)' }}>
                  <p className="text-[11px] font-black text-amber-300 mb-1">{isRtl ? `${isWords ? 'الكلمات' : 'العبارات'} اللي استخدمتها: ${usedPhrases.length} من ${keyPhrases.length}` : `Phrases you used: ${usedPhrases.length} of ${keyPhrases.length}`}</p>
                  <div className="flex flex-wrap gap-1" dir="ltr">
                    {keyPhrases.slice(0, 6).map(ph => <span key={ph} className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-lg max-w-full truncate ${usedPhrases.includes(ph) ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/5 text-white/45'}`}>{usedPhrases.includes(ph) ? '✓ ' : ''}{ph}</span>)}
                  </div>
                </div>
              )}
              {isFree && review && (
                <div data-testid="call-review" className="flex flex-col gap-2 min-h-0">
                  {review.st === 'loading' && <p className="text-center text-sm font-black text-amber-300 animate-pulse py-6">سارة تراجع مكالمتك… ✍️</p>}
                  {review.st === 'fail' && (
                    <button onClick={fetchReview} data-testid="review-retry" className="py-3 rounded-2xl border text-amber-300 text-xs font-black flex items-center justify-center gap-2" style={{ borderColor: GOLD }}>
                      <RotateCcw size={14} />تعذّر تجهيز التقييم — أعد المحاولة
                    </button>
                  )}
                  {review.st === 'ok' && review.d?.tooShort && (
                    <p className="text-center text-[13px] font-bold text-white/80 rounded-2xl p-3 border" style={{ borderColor: 'rgba(196,158,58,0.3)' }}>المكالمة كانت قصيرة شوي عشان أقيّمها 😊 المرة الجاية كلّمني أكثر — جملتين ثلاث على الأقل — وبعطيك ملاحظاتي.</p>
                  )}
                  {review.st === 'ok' && review.d && !review.d.tooShort && (() => { const d = review.d; const pts = d[revTab] || [];
                    const tabs = [['grammar', 'القواعد'], ['vocabulary', 'المفردات'], ['fluency', 'الطلاقة'], ['pronunciation', 'النطق']] as const;
                    return <>
                      <div className="rounded-2xl p-2.5 border" style={{ borderColor: GOLD, background: 'rgba(196,158,58,0.1)' }}>
                        <div className="flex items-center gap-2">
                          <p data-testid="review-verdict" className="flex-1 text-[15px] font-black text-amber-300">{d.verdictAr || (d.verdict === 'good' ? 'شغلك جيد 👏' : d.verdict === 'needs_work' ? 'تحتاج تحسين بسيط 💪' : 'ماشي حالك، كمّل 👍')}</p>
                          <button onClick={() => speakVerdict(`${d.verdictAr || ''}. ${d.summaryAr || ''}`)} data-testid="review-voice" className="shrink-0 px-2 py-1 rounded-lg text-[11px] font-black" style={{ background: GOLD, color: NAVY }}>
                            {revVoice === 'loading' ? '…' : revVoice === 'fail' ? '🔄 الصوت' : '🔊 اسمع'}
                          </button>
                        </div>
                        <p className="text-[12px] font-bold text-white/85 leading-snug line-clamp-3 mt-0.5">{d.summaryAr}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {tabs.map(([k, label]) => (
                          <button key={k} onClick={() => setRevTab(k)} data-testid={`review-tab-${k}`} className="py-1.5 rounded-xl text-[11px] font-black border"
                            style={revTab === k ? { background: GOLD, color: NAVY, borderColor: GOLD } : { borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                            {label}{(d[k] || []).length ? ' •' : ''}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-2xl p-2 border flex flex-col gap-1.5 overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.2)' }}>
                        {revTab === 'pronunciation' && <p className="text-[10.5px] font-bold text-white/55">{d.pronunciationNoteAr || 'ملاحظات النطق مبنية فقط على الكلمات اللي التقطها التعرّف على الصوت، مو تحليل صوتي دقيق.'}</p>}
                        {pts.length === 0 && <p className="text-[12px] font-bold text-emerald-200">ما لاحظت شي يحتاج تعديل هنا 👍</p>}
                        {pts.map((pt, i) => (
                          <div key={i} className="text-[12px] leading-snug">
                            <p dir="ltr" className="text-left text-rose-200/90 line-clamp-2">✗ “{pt.said}”</p>
                            <p dir="ltr" className="text-left text-emerald-200 font-bold line-clamp-2">✓ {pt.better}</p>
                            {pt.tipAr && <p className="text-white/70 text-[11px] line-clamp-2">{pt.tipAr}</p>}
                          </div>
                        ))}
                      </div>
                    </>; })()}
                </div>
              )}
              <p className="text-[11px] text-white/60 text-center">{isRtl ? 'حُفظ ملخص المكالمة في تقدّمك وتقرير وليّ الأمر.' : 'A summary was saved to your progress and parent report.'}</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setCallState('idle')} className="py-3 rounded-2xl border border-white/20 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer">
                  <RotateCcw size={14} />{isRtl ? 'مكالمة جديدة' : 'New call'}
                </button>
                <button onClick={close} className="py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer" style={{ background: GOLD, color: NAVY }}>
                  <CheckCircle2 size={14} />{isRtl ? 'العودة لسارة' : 'Back to Sara'}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
