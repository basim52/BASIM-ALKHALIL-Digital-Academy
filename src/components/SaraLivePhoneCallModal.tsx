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
import { buildCallContext, saveCallRecord, type CallContext } from '../lib/saraCallLink';

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
    if (recognitionRef.current) { try { recognitionRef.current.abort(); } catch (e) {} recognitionRef.current = null; }
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

  // Speech Recognition Handling (reads refs, so hands-free restarts work)
  const startSpeechRecognition = () => {
    if (mutedRef.current || stateRef.current !== 'connected' || speakingRef.current) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { console.warn('SpeechRecognition API not available in this browser.'); return; }
    try {
      stopListening();
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      let done = false;
      let latestInterim = '';
      const finalize = (text: string) => {
        if (done) return; done = true;
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        try { recognition.abort(); } catch (_) {}
        if (recognitionRef.current === recognition) recognitionRef.current = null;
        setIsStudentListening(false);
        handleStudentSpoke(text);
      };
      recognition.onstart = () => { setIsStudentListening(true); setInterimTranscript(''); };
      recognition.onresult = (event: any) => {
        let interim = '', final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) final += event.results[i][0].transcript;
          else interim += event.results[i][0].transcript;
        }
        setInterimTranscript(interim || final);
        if (final.trim()) { finalize(final.trim()); return; }
        // Faster end-of-turn: if the words stop changing for 1.1 s, treat them as final.
        latestInterim = interim.trim();
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (latestInterim) silenceTimerRef.current = setTimeout(() => finalize(latestInterim), 1100);
      };
      recognition.onerror = (event: any) => {
        if (done) return;
        setIsStudentListening(false);
        if (event.error === 'aborted') return;
        if (event.error === 'no-speech' || event.error === 'network') setTimeout(() => startSpeechRecognition(), 300);
      };
      recognition.onend = () => {
        if (done) return;
        setIsStudentListening(false);
        if (latestInterim) { finalize(latestInterim); return; }
        if (recognitionRef.current === recognition) recognitionRef.current = null;
        setTimeout(() => startSpeechRecognition(), 300); // keep the line open hands-free
      };
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
          level: studentLevel, name: studentName, context: callCtx?.text || '',
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
  const handleStudentSpoke = (spokenText: string) => {
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
    if (callTurns > 0) saveCallRecord(studentId, {
      at: Date.now(), scenario: selectedScenario.titleEn, scenarioAr: selectedScenario.titleAr, seconds: callSeconds, turns: callTurns,
      words: studentWordsSpoken, avgReplyMs: avgLatency,
      focus: keyPhrases.length ? [`${isRtl ? (isWords ? 'كلمات مستخدمة' : 'عبارات مستخدمة') : 'phrases used'} ${usedPhrases.length}/${keyPhrases.length}`, ...usedPhrases.slice(0, 4)] : (callCtx?.focusAr || []),
    });
    if (onSaveCallSummary) {
      const summary = `Sara Phone Call (${selectedScenario.titleEn}): ${formatTime(callSeconds)} duration, ${callTurns} speech turns, ${studentWordsSpoken} words spoken.${avgLatency ? ` Avg reply ${(avgLatency / 1000).toFixed(1)}s.` : ''}${keyPhrases.length ? ` Key phrases used ${usedPhrases.length}/${keyPhrases.length}: ${usedPhrases.join('; ') || 'none'}.` : callCtx?.focusEn.length ? ` Focus: ${callCtx.focusEn.join('; ')}.` : ''}`;
      onSaveCallSummary(summary);
    }
    if (onSendTranscriptToChat && transcriptRef.current.length > 0) {
      onSendTranscriptToChat(transcriptRef.current.map(t => ({ role: t.role, text: t.text })));
    }
  };

  if (!isOpen) return null;

  const NAVY = '#002147', GOLD = '#C49E3A';
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
  const close = () => { stopCallCleanup(); setCallState('idle'); onClose(); };
  const ring = phase === 'speaking' ? GOLD : phase === 'listening' ? '#34d399' : phase === 'thinking' ? '#fcd34d' : 'rgba(196,158,58,0.35)';

  const Avatar = ({ size }: { size: number }) => (
    <div className="relative flex items-center justify-center" style={{ width: size + 40, height: size + 40 }}>
      {(phase === 'speaking' || phase === 'listening' || phase === 'connecting') && [0, 1].map(k => (
        <motion.div key={k} className="absolute rounded-full border-2" style={{ width: size, height: size, borderColor: ring }}
          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.8 }} />
      ))}
      <div className="rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-colors"
        style={{ width: size, height: size, background: `radial-gradient(circle at 30% 30%, #0b3a75, ${NAVY})`, border: `3px solid ${ring}` }}>
        <span style={{ fontSize: size * 0.45 }}>👩‍🏫</span>
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
        data-testid="sara-call"
        className="w-full h-[100dvh] sm:h-[min(820px,94dvh)] sm:max-w-md sm:rounded-[2rem] flex flex-col text-white overflow-hidden relative sm:border"
        style={{ background: `linear-gradient(180deg, ${NAVY} 0%, #001631 100%)`, borderColor: 'rgba(196,158,58,0.35)' }}
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(196,158,58,0.12)' }} />

        {/* Header */}
        <div className="px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-2 flex items-center justify-between relative z-10 shrink-0">
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-wide" style={{ color: GOLD }}>{isRtl ? 'مكالمة مع سارة' : 'Call with Sara'}</div>
            <div className="text-sm font-black truncate">{isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}</div>
          </div>
          <div className="flex items-center gap-2">
            {callState === 'connected' && <span className="text-xs font-black tabular-nums text-amber-300" data-testid="call-timer">{formatTime(callSeconds)}</span>}
            <button onClick={close} aria-label="close" className="w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center cursor-pointer">✕</button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] relative z-10">
          {/* PICK SCENARIO */}
          {callState === 'idle' && (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex flex-col items-center text-center pt-1 pb-3 shrink-0">
                <Avatar size={72} />
                <p className="text-xs text-white/70 max-w-xs leading-relaxed -mt-1">
                  {isRtl ? 'اختر موضوع المكالمة وتحدّث بصوتك — سارة ترد بصوتها مباشرة.' : 'Pick a topic and just talk — Sara answers in her own voice.'}
                </p>
                {!!callCtx?.focusAr.length && (
                  <p data-testid="call-focus" className="mt-1.5 text-[11px] font-bold text-amber-300 line-clamp-2 max-w-xs">
                    {isRtl ? '🎯 سارة بتركّز على: ' : '🎯 Sara will focus on: '}{(isRtl ? callCtx.focusAr : callCtx.focusEn).join(' · ')}
                  </p>
                )}
              </div>
              {preset ? (
                <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden" data-testid="call-preset">
                  <p className="text-[11px] font-black" style={{ color: GOLD }}>{keyPhrases.length ? (isRtl ? (isWords ? 'حاول تستخدم هالكلمات في كلامك:' : 'حاول تستخدم هالعبارات في كلامك:') : 'Try to use these phrases:') : (isRtl ? 'تكلّم بحرية — سارة تكمّل معك الحوار.' : 'Talk freely — Sara keeps the conversation going.')}</p>
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
                  <Avatar size={112} />
                </div>
                <div className="text-lg font-black -mt-1">{isRtl ? 'سارة' : 'Sara'}</div>
                <div data-testid="call-phase" data-phase={phase} className="mt-1 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.06)', color: phase === 'listening' ? '#6ee7b7' : '#fcd34d' }}>
                  {phase === 'listening' ? <Mic size={13} /> : phase === 'speaking' ? <Volume2 size={13} /> : <Radio size={13} />}
                  {phaseLabel}
                </div>
                <div className="h-4 mt-1 text-[10px] text-white/50">
                  {(phase === 'speaking' || phase === 'thinking') && (isRtl ? 'اضغط على سارة لمقاطعتها والتحدث' : 'Tap Sara to interrupt')}
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
                <div className="inline-flex p-3 rounded-full mb-2" style={{ background: 'rgba(196,158,58,0.15)', color: GOLD }}><Award size={30} /></div>
                <h4 className="text-lg font-black">{isRtl ? 'انتهت المكالمة' : 'Call ended'}</h4>
                <p className="text-xs text-white/70 mt-1">{isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
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
              </div>
              {keyPhrases.length > 0 && (
                <div data-testid="call-phrases-used" className="rounded-2xl p-2.5 border" style={{ borderColor: 'rgba(196,158,58,0.3)' }}>
                  <p className="text-[11px] font-black text-amber-300 mb-1">{isRtl ? `${isWords ? 'الكلمات' : 'العبارات'} اللي استخدمتها: ${usedPhrases.length} من ${keyPhrases.length}` : `Phrases you used: ${usedPhrases.length} of ${keyPhrases.length}`}</p>
                  <div className="flex flex-wrap gap-1" dir="ltr">
                    {keyPhrases.slice(0, 6).map(ph => <span key={ph} className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-lg max-w-full truncate ${usedPhrases.includes(ph) ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/5 text-white/45'}`}>{usedPhrases.includes(ph) ? '✓ ' : ''}{ph}</span>)}
                  </div>
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
