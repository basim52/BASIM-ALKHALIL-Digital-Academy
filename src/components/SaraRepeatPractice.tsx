import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Mic, MicOff, Volume2, Camera, CameraOff, RotateCcw, SkipForward, CheckCircle2 } from 'lucide-react';
import { SectionShell, GoldCard, PrimaryButton, GhostButton, ProgressPill, TutorFace } from './ui/academy';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { scoreRepeat } from '../utils/repeatMatch';
import { FilteredSelfieCanvas, SelfieFilterPicker, SparkleOverlay, filterInfo, useSelfieFilter } from './selfieFilters';
import { RepeatLessonSource, RepeatTeacherInfo, loadWeakWords, pickReviewWords, updateWeakWords } from '../lib/repeatPractice';

/**
 * «ردّد مع سارة» — split-screen repeat-after-me practice (pilot with Sara).
 * Sara speaks with her cloud voice only (saraNarrate, voice Kore). The student repeats; the score comes from the
 * real speech-recognition transcript (Web Speech API, en-US) checked by checkSpokenAnswer — never a made-up number.
 * The selfie camera is display only: it is never recorded, saved or uploaded, and its tracks stop on exit.
 */

type Level = 'beginner' | 'intermediate';
const ROUND = 5;

const ITEMS: Record<Level, string[]> = {
  beginner: [
    'Hello', 'Thank you', 'Water', 'Family', 'School',
    'Good morning.', 'How are you today?', 'I am fine, thank you.', 'Nice to meet you.', 'See you tomorrow.',
    'I like apples.', 'This is my book.', 'I have a cat.', 'The sun is hot.', 'I go to school.',
    'Can I help you?', 'Where is the door?', 'I love my family.', 'Open the window, please.', 'It is a nice day.',
  ],
  intermediate: [
    'Beautiful', 'Comfortable', 'Vegetable', 'Important', 'Restaurant',
    'I would like a cup of coffee.', 'Could you speak more slowly?', 'What time does the store open?', 'I study every day.', "Let's meet after work.",
    'The weather is getting colder.', 'She is reading an interesting book.', 'We usually travel in the summer.', 'I forgot my phone at home.', 'Can you recommend a good restaurant?',
    "I'm looking forward to the weekend.", "He didn't understand the question.", 'It takes half an hour to get there.', 'Practice makes perfect.', 'Thank you for your help.',
  ],
};

type ItemResult = { score: number | null; transcript: string; missing: string[]; passed?: boolean };

/** A teacher for the practice screen: identity + her own narrator. Pilot: Sara (cloud voice via saraNarrate only). */
export interface RepeatTeacher extends RepeatTeacherInfo {
  narrate: (text: string, onBlocked: () => void, onFailed: () => void, onEnd: () => void) => void;
  stop: () => void;
  unlock: () => void;
  /** male teacher (Mohammed, Ali): masculine Arabic wording on screen */
  male?: boolean;
}
export const SARA_TEACHER: RepeatTeacher = { id: 'sara', nameAr: 'سارة', face: 'sara', narrate: saraNarrate, stop: saraStopNarrator, unlock: saraUnlockNarrator };
type Voice = 'idle' | 'loading' | 'blocked' | 'failed' | 'done';
type CamState = 'off' | 'loading' | 'on' | 'denied' | 'unavailable';

const pct = (s: number) => Math.round(s * 100);

/** Front (selfie) camera, display only. Tracks are stopped on unmount and whenever the student turns it off. */
function useSelfieCamera() {
  const [state, setState] = useState<CamState>('off');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const genRef = useRef(0); // bumped on stop/unmount so a late getUserMedia result is released, never shown
  const stop = useCallback(() => {
    genRef.current++;
    streamRef.current?.getTracks().forEach(t => { try { t.stop(); } catch { /* ignore */ } });
    streamRef.current = null; setStream(null); setState('off');
  }, []);
  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setState('unavailable'); return; }
    const gen = ++genRef.current;
    setState('loading');
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } }, audio: false });
      if (gen !== genRef.current) { s.getTracks().forEach(t => t.stop()); return; }
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = s; setStream(s); setState('on');
    } catch (e: any) {
      if (gen !== genRef.current) return;
      setState(e?.name === 'NotAllowedError' || e?.name === 'SecurityError' ? 'denied' : 'unavailable');
    }
  }, []);
  useEffect(() => () => { genRef.current++; streamRef.current?.getTracks().forEach(t => { try { t.stop(); } catch { /* ignore */ } }); streamRef.current = null; }, []);
  return { state, stream, start, stop };
}

/**
 * Mic recognition (en-US), same approach as SpeakingDrillCheck: best of 3 alternatives scored by checkSpokenAnswer.
 * Android Chrome: the FIRST item used to fail (later ones worked) because the first recognizer was the one that had to
 * obtain the mic while the camera was opening. Now the «ابدأ» tap warms the mic first (getUserMedia audio, tracks
 * stopped right away), then the camera opens, then the teacher speaks. A mic tap with the permission still not
 * granted asks for it explicitly the same way. Interim results are kept as a fallback: if the engine ends
 * without a final result, the last interim transcript is scored. The raw error code is shown (small) for diagnosis.
 * Every attempt is a fresh SpeechRecognition with its own session id, so a late event of an older one is ignored.
 */
const AUTO_START_DELAY_MS = 350;
export const IS_ANDROID = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '');
type MicPerm = 'granted' | 'denied' | 'prompt' | 'unknown';
const MIC_DENIED_MSG = 'المايك مقفول لهالموقع. افتح قفل 🔒 جنب رابط الموقع في Chrome ← أذونات (الإعدادات) ← الميكروفون ← سماح، وبعدها حدّث الصفحة واضغط «اضغط وردّد».';
const WRONG_MSG = '❌ في الجملة خطأ في النطق. اضغط المايك وعيدها، أو اضغط «تخطَّ».';
const errMsg = (code: string): string => {
  switch (code) {
    case 'not-allowed': case 'service-not-allowed': return MIC_DENIED_MSG;
    case 'no-speech': return 'ما وصلني صوتك. اضغط «اضغط وردّد» وقل الكلمة على طول بصوت واضح وقرّب الجوال من فمك.';
    case 'audio-capture': return 'المايك مشغول أو ما اشتغل. سكّر أي تطبيق ثاني يستخدم المايك (مكالمة، تسجيل، سماعة بلوتوث) واضغط «اضغط وردّد».';
    case 'network': return 'التعرّف على الصوت يحتاج إنترنت. تأكد من الاتصال واضغط «اضغط وردّد».';
    case 'language-not-supported': return 'التعرّف على الإنجليزي مو متاح في جوالك. حدّث تطبيق Google من المتجر وجرّب مرة ثانية.';
    case 'aborted': return 'انقطع المايك. اضغط «اضغط وردّد» مرة ثانية.';
    case 'no-result': return 'ما وصلني صوتك. اضغط «اضغط وردّد» وقل الكلمة على طول بصوت واضح.';
    default: return 'صار خطأ في المايك. اضغط «اضغط وردّد» وحاول مرة ثانية.';
  }
};
function useRepeatRecognition() {
  const recRef = useRef<any>(null);
  const sessionRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const permRef = useRef<MicPerm>('unknown');
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string>('');
  const supported = typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  useEffect(() => {
    let on = true;
    try {
      (navigator as any).permissions?.query({ name: 'microphone' }).then((st: any) => {
        if (!on) return; permRef.current = st.state; st.onchange = () => { permRef.current = st.state; };
      }).catch(() => {});
    } catch { /* ignore */ }
    return () => { on = false; };
  }, []);
  const clearTimers = () => { timersRef.current.forEach(t => window.clearTimeout(t)); timersRef.current = []; };
  const later = (fn: () => void, ms: number) => { timersRef.current.push(window.setTimeout(fn, ms)); };
  const kill = () => {
    sessionRef.current++; clearTimers();
    const old = recRef.current; recRef.current = null;
    if (old) { old.onresult = old.onerror = old.onend = old.onstart = null; try { old.abort(); } catch { /* ignore */ } }
  };
  const abort = useCallback(() => { kill(); setListening(false); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => kill(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const start = useCallback((expected: string, onScored: (r: ItemResult) => void, auto = false) => {
    setError(null); setDebug('');
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError('متصفحك ما يدعم التعرّف على الصوت. جرّب Chrome أو Safari.'); return; }
    kill();
    const session = sessionRef.current;
    const live = () => session === sessionRef.current;
    const t0 = Date.now();
    const secs = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;
    setListening(true);
    const launch = (attempt: number) => {
      if (!live()) return;
      let rec: any;
      try { rec = new SR(); } catch (e: any) { setListening(false); setDebug(`ctor:${e?.name || 'err'}`); setError(errMsg('ctor')); return; }
      rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 5;
      let started = false, scored = false, ended = false, lastCode = '', rawHeard = '';
      let interim: string[] = [];
      const mine = () => live() && recRef.current === rec;
      const score = (alts: string[]) => {
        if (alts.some(a => a.trim())) rawHeard = alts.find(a => a.trim()) || rawHeard;
        const best = scoreRepeat(alts, expected);
        if (!best) return false;
        scored = true;
        onScored({ score: best.score, transcript: best.transcript, missing: best.missing, passed: best.passed });
        return true;
      };
      rec.onstart = () => { if (!mine()) return; started = true; setListening(true); };
      rec.onresult = (e: any) => {
        if (!mine()) return;
        for (let i = e.resultIndex ?? 0; i < (e.results?.length || 0); i++) {
          const r = e.results[i];
          const alts: string[] = Array.from(r || []).map((a: any) => a.transcript || '');
          if (r.isFinal) { if (score(alts)) setDebug(`ok · ${secs()}`); }
          else if (alts.some(Boolean)) { interim = alts; rawHeard = alts.find(Boolean) || rawHeard; }
        }
      };
      rec.onerror = (e: any) => {
        if (!mine()) return;
        lastCode = e?.error || 'unknown';
        // Died before it ever opened (busy audio right after playback): recreate it once, quietly.
        if (!started && attempt === 0 && (lastCode === 'aborted' || lastCode === 'audio-capture')) {
          ended = true; recRef.current = null; later(() => launch(1), 400); return;
        }
        if (lastCode === 'not-allowed' || lastCode === 'service-not-allowed') permRef.current = 'denied';
      };
      rec.onend = () => {
        if (!mine() || ended) return;
        ended = true; recRef.current = null; clearTimers();
        setListening(false);
        if (!scored && interim.length && score(interim)) { setDebug(`interim · ${secs()}`); return; }
        if (scored) return;
        const code = lastCode || 'no-result';
        setDebug(`${code}${started ? '' : ' · no-start'} · ${secs()}`);
        // Speech that didn't match (or couldn't be made out) is a pronunciation miss, not «ما سمعتك».
        const unclear = code === 'no-speech' || code === 'no-result';
        if (rawHeard.trim()) setError(`${WRONG_MSG} سمعتك تقول: «${rawHeard.trim()}».`);
        else setError(unclear && started ? WRONG_MSG : errMsg(code));
      };
      recRef.current = rec;
      try { rec.start(); }
      catch (e: any) {
        recRef.current = null;
        if (attempt === 0) { later(() => launch(1), 300); return; }
        setListening(false); setDebug(`start:${e?.name || 'err'}`); setError(errMsg('start'));
      }
    };
    const go = () => { if (auto) later(() => launch(0), AUTO_START_DELAY_MS); else launch(0); };
    // First tap with the mic permission not granted yet: ask for it explicitly, release the stream, then listen.
    if (!auto && IS_ANDROID && permRef.current !== 'granted' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        s.getTracks().forEach(t => { try { t.stop(); } catch { /* ignore */ } });
        permRef.current = 'granted';
        if (!live()) return;
        later(() => launch(0), 300); // let the device release the mic before recognition takes it
      }).catch((e: any) => {
        if (!live()) return;
        setListening(false);
        const name = e?.name || 'err';
        setDebug(`mic:${name}`);
        if (name === 'NotAllowedError' || name === 'SecurityError') { permRef.current = 'denied'; setError(MIC_DENIED_MSG); }
        else if (name === 'NotFoundError') setError('ما لقينا مايك في الجهاز.');
        else if (name === 'NotReadableError') setError(errMsg('audio-capture'));
        else go(); // unknown failure of the permission probe: still try recognition directly
      });
      return;
    }
    go();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  /** Android: ask for / warm the mic once, inside the start tap, and release it before recognition needs it. */
  const warm = useCallback(async (): Promise<boolean> => {
    if (!IS_ANDROID || !navigator.mediaDevices?.getUserMedia) return true;
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      s.getTracks().forEach(t => { try { t.stop(); } catch { /* ignore */ } });
      permRef.current = 'granted';
      await new Promise(r => setTimeout(r, 300));
      return true;
    } catch (e: any) {
      const name = e?.name || 'err';
      setDebug(`mic:${name}`);
      if (name === 'NotAllowedError' || name === 'SecurityError') { permRef.current = 'denied'; setError(MIC_DENIED_MSG); return false; }
      return true;
    }
  }, []);
  const stop = useCallback(() => { const r = recRef.current; if (!r) { abort(); return; } try { r.stop(); } catch { abort(); } }, [abort]);
  return { listening, error, debug, supported, start, stop, abort, warm };
}

function adviceFor(avg: number | null, weak: string[]): string {
  const w = weak.slice(0, 4).join('، ');
  if (avg === null) return 'ما قدرت أسمعك في هالجولة. تأكد إن المايك شغّال وقرّب الجوال منك، ونعيدها سوا.';
  if (avg >= 0.85) return `ممتاز! نطقك واضح وقريب جداً من نطقي.${w ? ` بس انتبه شوي لـ ${w}.` : ''} كمّل على نفس المستوى.`;
  if (avg >= 0.65) return `زين! أغلب الكلام واضح.${w ? ` ركّز على: ${w}.` : ''} قلها على مهلك وبصوت واضح.`;
  return `ولا يهمك، البداية دايم كذا. اسمع الجملة مرة ثانية قبل ما تعيدها، وقلها كلمة كلمة.${w ? ` وركّز على: ${w}.` : ''}`;
}

interface Props {
  onClose: () => void;
  /** Defaults to Sara. */
  teacher?: RepeatTeacher;
  /** Lesson-based practice (title + the lesson's own English items). Without it: built-in sentences with a level pick. */
  lesson?: RepeatLessonSource | null;
  /** Student id, for the weak-words memory (guest when missing). */
  uid?: string;
  /** Label of the final «back» button. */
  backLabel?: string;
  /** Opened straight from the lesson: start the lesson words at once, camera left off (opens only on the student's tap). */
  autoStart?: boolean;
}

export const SaraRepeatPractice: React.FC<Props> = ({ onClose, teacher = SARA_TEACHER, lesson, uid, backLabel, autoStart }) => {
  const saraNarrate = teacher.narrate, saraStopNarrator = teacher.stop, saraUnlockNarrator = teacher.unlock;
  const lessonItems = lesson?.items?.length ? lesson.items : null;
  const [level, setLevel] = useState<Level | 'lesson' | null>(null);
  const [sessionItems, setSessionItems] = useState<string[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const weakRef = useRef<string[]>([]);
  useEffect(() => { let on = true; loadWeakWords(teacher.id, uid).then(w => { if (on) weakRef.current = w; }); return () => { on = false; }; }, [teacher.id, uid]);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<Record<number, ItemResult>>({});
  const [phase, setPhase] = useState<'practice' | 'review' | 'finished'>('practice');
  const [voice, setVoice] = useState<Voice>('idle');
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const cam = useSelfieCamera();
  const rec = useRepeatRecognition();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const bindVideo = useCallback((el: HTMLVideoElement | null) => { videoRef.current = el; setVideoEl(el); }, []);
  const [selfieFilter, setSelfieFilter] = useSelfieFilter();
  const items = level ? sessionItems : [];
  const text = items[idx] || '';
  const round = Math.floor(idx / ROUND);
  const rounds = Math.ceil(items.length / ROUND);
  const res = results[idx];

  useEffect(() => { const f = () => setIsDesktop(window.innerWidth >= 768); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  useEffect(() => { const v = videoRef.current; if (v) { v.srcObject = cam.stream; if (cam.stream) v.play().catch(() => {}); } }, [cam.stream]);
  // Leaving the page: Sara stops talking, the mic is released and the camera turns off.
  const aliveRef = useRef(true);
  useEffect(() => { aliveRef.current = true; return () => { aliveRef.current = false; saraStopNarrator(); }; }, []);

  const exit = () => { saraStopNarrator(); rec.abort(); cam.stop(); if (level && phase === 'practice') remember(idx); onClose(); };

  const say = useCallback((t: string, then?: () => void) => {
    saraUnlockNarrator(); setVoice('loading');
    saraNarrate(t, () => setVoice('blocked'), () => setVoice('failed'), () => { if (!aliveRef.current) return; setVoice('done'); then?.(); });
  }, [saraNarrate, saraUnlockNarrator]);

  const keep = useCallback((i: number) => (r: ItemResult) => {
    setResults(prev => { const old = prev[i]; return old && old.score !== null && r.score !== null && old.score > r.score ? prev : { ...prev, [i]: r }; });
  }, []);

  // Sara models the item, then the mic opens automatically (the student can always tap the mic too).
  const present = useCallback((i: number, t: string) => {
    rec.abort();
    say(t, () => rec.start(t, keep(i), true));
  }, [rec, say, keep]);

  const begin = (lv: Level | 'lesson', withCam = true) => {
    saraUnlockNarrator();
    const base = lv === 'lesson' ? (lessonItems || []) : ITEMS[lv];
    // Previous weak words (up to 3) open round 1, labelled «مراجعة».
    const review = pickReviewWords(weakRef.current, base);
    const list = [...review, ...base];
    if (!list.length) return;
    setSessionItems(list); setReviewCount(review.length);
    setLevel(lv); setIdx(0); setResults({}); setPhase('practice');
    // Mic first (Android warm-up), then the camera, then the first item — so the first recognizer never races them.
    void (async () => {
      const micOk = await rec.warm();
      if (!aliveRef.current) return;
      if (withCam) { await cam.start(); if (!aliveRef.current) return; }
      if (micOk) present(0, list[0]); else say(list[0]); // mic blocked: keep the how-to-allow message on screen
    })();
  };

  const autoRef = useRef(false);
  useEffect(() => { if (autoStart && lessonItems && !autoRef.current) { autoRef.current = true; begin('lesson', false); } }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Weak-words memory: an item scored under the pass threshold adds its unclear words; a review word said well is dropped.
  const remember = (i: number) => {
    const r = results[i];
    if (!r || r.score === null) return;
    const said = items[i];
    if (r.passed) { if (i < reviewCount) void updateWeakWords(teacher.id, uid, [], [said.toLowerCase()]); return; }
    void updateWeakWords(teacher.id, uid, r.missing, []);
  };

  const roundStats = (r: number) => {
    const scored: ItemResult[] = [];
    for (let i = r * ROUND; i < Math.min(items.length, (r + 1) * ROUND); i++) if (results[i]?.score != null) scored.push(results[i]);
    const avg = scored.length ? scored.reduce((s, x) => s + (x.score as number), 0) / scored.length : null;
    const weak = Array.from(new Set(scored.flatMap(x => x.missing))).slice(0, 6);
    return { avg, weak, scoredCount: scored.length };
  };

  const next = () => {
    rec.abort(); saraStopNarrator();
    remember(idx);
    const n = idx + 1;
    if (n % ROUND === 0 || n >= items.length) {
      setPhase('review');
      const { avg, weak } = roundStats(round);
      say(`${avg === null ? '' : `نتيجتك في هالجولة ${pct(avg)} بالمية. `}${adviceFor(avg, weak)}`);
      return;
    }
    setIdx(n); present(n, items[n]);
  };

  const continueRound = () => {
    saraStopNarrator();
    const n = idx + 1;
    if (n >= items.length) { setPhase('finished'); return; }
    setPhase('practice'); setIdx(n); present(n, items[n]);
  };

  const overall = useMemo(() => {
    const s = Object.values(results).filter(r => r.score !== null) as ItemResult[];
    return s.length ? s.reduce((a, r) => a + (r.score as number), 0) / s.length : null;
  }, [results]);

  const faceSize = isDesktop ? 220 : 128;
  const sceneH = isDesktop ? 'h-[340px]' : 'h-[210px]';
  const speaking = voice === 'loading';

  const saraPanel = (
    <div className={`relative ${sceneH} rounded-3xl border-2 border-[#C49E3A] bg-gradient-to-b from-[#0a2d5c] to-[#001a38] flex flex-col items-center justify-center gap-2 overflow-hidden shadow-lg`} data-testid="repeat-sara-panel">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
      <TutorFace tutor={teacher.face as any} size={faceSize} isSpeaking={speaking} />
      <span className="text-[13px] sm:text-[15px] font-black text-[#E8C766]">{teacher.nameAr}</span>
    </div>
  );

  const camOn = cam.state === 'on';
  const fInfo = filterInfo(selfieFilter);
  const canvasFilter = camOn && fInfo.mode === 'canvas';
  const studentPanel = (
    <div className={`relative ${sceneH} rounded-3xl border-2 border-[#C49E3A] bg-gradient-to-b from-[#0a2d5c] to-[#001a38] overflow-hidden shadow-lg flex flex-col items-center justify-center gap-2`} data-testid="repeat-student-panel">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] z-10 bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
      {/* The video keeps playing (needed as the filter source); with a canvas filter it sits invisible under the canvas. */}
      <video ref={bindVideo} muted playsInline autoPlay aria-label="كاميرا الطالب" className={`absolute inset-0 w-full h-full object-cover ${camOn ? '' : 'hidden'} ${canvasFilter ? 'opacity-0' : ''}`} style={{ transform: 'scaleX(-1)', filter: !canvasFilter && fInfo.css ? fInfo.css : undefined }} />
      {canvasFilter && <FilteredSelfieCanvas video={videoEl} filter={selfieFilter} active={camOn} lowPower={rec.listening} className="absolute inset-0 w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} />}
      {camOn && selfieFilter === 'gold' && <span aria-hidden className="pointer-events-none absolute inset-0 z-[5] rounded-3xl" style={{ boxShadow: 'inset 0 0 28px 6px rgba(196,158,58,0.55)' }} />}
      {camOn && selfieFilter === 'stars' && <SparkleOverlay />}
      {camOn && <div className="absolute top-1.5 inset-x-0 z-10"><SelfieFilterPicker value={selfieFilter} onChange={setSelfieFilter} /></div>}
      {!camOn && (
        <>
          <span className="rounded-full border-2 border-[#C49E3A] bg-[#002147] flex items-center justify-center shadow-inner" style={{ width: faceSize, height: faceSize, fontSize: Math.round(faceSize * 0.5) }}>🧑‍🎓</span>
          <span className="text-[11px] sm:text-[12px] font-bold text-white/75 px-3 text-center">
            {cam.state === 'loading' ? 'جاري فتح الكاميرا…' : cam.state === 'denied' ? 'الكاميرا مقفلة، تقدر تكمل بدونها' : cam.state === 'unavailable' ? 'الكاميرا غير متاحة، تقدر تكمل بدونها' : 'أنت'}
          </span>
        </>
      )}
      <span className="absolute bottom-2 inset-x-0 z-10 flex justify-center">
        {camOn
          ? <button type="button" onClick={cam.stop} className="inline-flex items-center gap-1 rounded-full bg-[#002147]/80 border border-[#C49E3A]/70 text-[#E8C766] text-[11px] font-black px-2.5 py-1"><CameraOff size={12} />إيقاف الكاميرا</button>
          : cam.state !== 'loading' && level && <button type="button" onClick={() => void cam.start()} className="inline-flex items-center gap-1 rounded-full bg-[#002147]/80 border border-[#C49E3A]/70 text-[#E8C766] text-[11px] font-black px-2.5 py-1"><Camera size={12} />شغّل الكاميرا</button>}
      </span>
    </div>
  );

  const scene = (
    <div className="rounded-[28px] bg-[#002147] p-2.5 sm:p-4 shadow-xl" data-testid="repeat-scene">
      <div className={`grid gap-2.5 sm:gap-4 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>{saraPanel}{studentPanel}</div>
      <p className="mt-2 text-center text-[10.5px] font-bold text-white/60">🔒 الكاميرا للعرض بس، ما تنسجل ولا تنحفظ ولا ترتفع لأي مكان.</p>
    </div>
  );

  const header = (
    <div className="flex items-center gap-2">
      <GhostButton onClick={exit} data-testid="repeat-back"><ArrowRight size={15} />العودة</GhostButton>
      <div className="flex-1 min-w-0">
        <h1 className="truncate text-[18px] sm:text-[22px] font-black text-[#002147]">🎙️ ردّد مع {teacher.nameAr}</h1>
        {lessonItems && lesson && <p className="truncate text-[12px] sm:text-[13px] font-bold text-[#C49E3A]" data-testid="repeat-lesson-title">📘 {lesson.titleAr}{lesson.titleEn ? <span dir="ltr" className="text-slate-500"> · {lesson.titleEn}</span> : null}</p>}
      </div>
      {level && phase !== 'finished' && <ProgressPill data-testid="repeat-progress">الجولة {round + 1} من {rounds} · {Math.min(idx % ROUND + 1, ROUND)}/{Math.min(ROUND, items.length - round * ROUND)}</ProgressPill>}
    </div>
  );

  let body: React.ReactNode;
  if (!level && lessonItems) {
    body = (
      <GoldCard className="space-y-3 text-center">
        <p className="text-[15px] sm:text-[17px] font-black">{teacher.nameAr} {teacher.male ? 'يقول' : 'تقول'} كلمات وجمل الدرس، وأنت تردّدها {teacher.male ? 'وراه' : 'وراها'} 🎧</p>
        <p className="text-[12.5px] font-bold text-slate-600">{lessonItems.length} {lessonItems.length > 10 ? 'كلمة وجملة' : 'كلمات وجمل'} من الدرس{lessonItems.length > ROUND ? '، وبعد كل ٥ تراجع معك النتيجة' : ''}. نحتاج المايك للتقييم، والكاميرا اختيارية.</p>
        <PrimaryButton onClick={() => begin('lesson')} data-testid="repeat-start-lesson" className="w-full py-3 text-sm">▶️ ابدأ التدريب</PrimaryButton>
        {!rec.supported && <p className="text-[12px] font-bold text-rose-700">متصفحك ما يدعم التعرّف على الصوت، فما راح يطلع لك تقييم. جرّب Chrome أو Safari.</p>}
      </GoldCard>
    );
  } else if (!level) {
    body = (
      <GoldCard className="space-y-3 text-center">
        <p className="text-[15px] sm:text-[17px] font-black">{teacher.nameAr} {teacher.male ? 'يقول' : 'تقول'} الكلمة أو الجملة، وأنت تردّدها {teacher.male ? 'وراه' : 'وراها'} 🎧</p>
        <p className="text-[12.5px] font-bold text-slate-600">بعد كل ٥ جمل تراجع معك النتيجة وتعطيك نصيحة. نحتاج المايك للتقييم، والكاميرا اختيارية.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <PrimaryButton onClick={() => begin('beginner')} data-testid="repeat-level-beginner" className="py-3 text-sm">🌱 مبتدئ — كلمات وجمل قصيرة</PrimaryButton>
          <PrimaryButton onClick={() => begin('intermediate')} data-testid="repeat-level-intermediate" className="py-3 text-sm">🚀 متوسط — جمل أطول</PrimaryButton>
        </div>
        {!rec.supported && <p className="text-[12px] font-bold text-rose-700">متصفحك ما يدعم التعرّف على الصوت، فما راح يطلع لك تقييم. جرّب Chrome أو Safari.</p>}
      </GoldCard>
    );
  } else if (phase === 'practice') {
    body = (
      <GoldCard className="space-y-3" data-testid="repeat-card">
        <div className="flex items-center gap-2">
          {idx < reviewCount && <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-black" data-testid="repeat-review-tag">مراجعة</span>}
          <span className="flex-1 text-[12px] font-black text-[#C49E3A]">{voice === 'loading' ? `${teacher.nameAr} ${teacher.male ? 'يتكلم' : 'تتكلم'}…` : rec.listening ? 'دورك! ردّد الحين 🎙️' : res ? 'تقدر تعيد أو تكمل' : (teacher.male ? 'ردّد وراه' : 'ردّد وراها')}</span>
          <GhostButton onClick={() => { rec.abort(); say(text); }} data-testid="repeat-listen"><Volume2 size={14} />{voice === 'failed' || voice === 'blocked' ? `اضغط لتسمع ${teacher.nameAr}` : `اسمع ${teacher.nameAr} مرة ثانية`}</GhostButton>
        </div>
        <p dir="ltr" className="text-center text-[24px] sm:text-[32px] font-black text-[#002147] leading-snug py-2" data-testid="repeat-text">{text}</p>
        {voice === 'failed' && <p className="text-[12px] font-bold text-rose-700 text-center">تعذّر صوت {teacher.nameAr} الحين. اضغط «اضغط لتسمع {teacher.nameAr}» لإعادة المحاولة، أو اقرأ الجملة وردّدها.</p>}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={rec.listening ? rec.stop : () => { saraStopNarrator(); rec.start(text, keep(idx)); }} disabled={!rec.supported} data-testid="repeat-mic"
            className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-black text-[15px] shadow-md active:scale-95 transition-transform disabled:opacity-40 ${rec.listening ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#C49E3A] text-[#002147] hover:bg-[#d4ae4a]'}`}>
            {rec.listening ? <MicOff size={18} /> : <Mic size={18} />}{rec.listening ? 'أسمعك… اضغط للإيقاف' : res ? 'ردّد مرة ثانية' : 'اضغط وردّد'}
          </button>
        </div>
        {rec.error && <p className="text-[12px] font-bold text-amber-700 text-center">{rec.error}</p>}
        {rec.debug && <p dir="ltr" className="text-[10px] font-mono text-slate-400 text-center" data-testid="repeat-mic-debug">mic: {rec.debug}</p>}
        {res && res.score !== null && (
          <div className={`rounded-xl border p-3 text-center space-y-1 ${res.score >= 0.85 ? 'bg-emerald-50 border-emerald-300' : res.score >= 0.65 ? 'bg-amber-50 border-amber-300' : 'bg-rose-50 border-rose-300'}`} data-testid="repeat-score">
            <p className="text-[18px] font-black">{pct(res.score)}٪ {res.score >= 0.85 ? '🌟' : res.score >= 0.65 ? '👍' : '💪'}</p>
            <p className="text-[13px] font-bold text-slate-700">🗣️ سمعتك تقول: <span dir="ltr">“{res.transcript}”</span></p>
            {res.missing.length > 0 && <p className="text-[12px] font-bold text-rose-700">كلمات ما وضحت: <span dir="ltr">{res.missing.join(', ')}</span></p>}
            {res.score < 0.65 && <p className="text-[12px] font-black text-rose-700" data-testid="repeat-wrong">❌ في الجملة خطأ. عيدها أو اضغط «تخطَّ».</p>}
          </div>
        )}
        <div className="flex gap-2">
          {res && res.score !== null && res.score < 0.65 && <GhostButton onClick={next} className="py-3" data-testid="repeat-skip-wrong"><SkipForward size={14} />تخطَّ</GhostButton>}
          {res
            ? <PrimaryButton onClick={next} className="flex-1 py-3" data-testid="repeat-next"><CheckCircle2 size={16} />{(idx + 1) % ROUND === 0 || idx + 1 >= items.length ? 'شوف نتيجة الجولة' : 'التالي'}</PrimaryButton>
            : <GhostButton onClick={next} className="flex-1 py-3" data-testid="repeat-skip"><SkipForward size={14} />تخطَّ (بدون تقييم)</GhostButton>}
        </div>
      </GoldCard>
    );
  } else if (phase === 'review') {
    const { avg, weak, scoredCount } = roundStats(round);
    body = (
      <GoldCard className="space-y-3 text-center" data-testid="repeat-review">
        <p className="text-[13px] font-black text-[#C49E3A]">مراجعة {teacher.nameAr} — الجولة {round + 1}</p>
        <p className="text-[34px] sm:text-[40px] font-black text-[#002147]">{avg === null ? '—' : `${pct(avg)}٪`}</p>
        <p className="text-[12px] font-bold text-slate-500">{avg === null ? 'ما فيه تقييم في هالجولة' : `متوسط ${scoredCount} من ${Math.min(ROUND, items.length - round * ROUND)} جمل تم تقييمها بالمايك`}</p>
        {weak.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5" dir="ltr">
            {weak.map(w => <span key={w} className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-[13px] font-black">{w}</span>)}
          </div>
        )}
        <p className="text-[14px] sm:text-[15px] font-bold text-[#002147] leading-relaxed bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl p-3">💬 {adviceFor(avg, weak)}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <GhostButton onClick={() => say(`${avg === null ? '' : `نتيجتك في هالجولة ${pct(avg)} بالمية. `}${adviceFor(avg, weak)}`)} className="py-3"><Volume2 size={14} />اسمع نصيحة {teacher.nameAr}</GhostButton>
          <PrimaryButton onClick={continueRound} className="flex-1 py-3" data-testid="repeat-continue">{idx + 1 >= items.length ? 'النتيجة النهائية' : 'كمّل الخمس الجاية'}</PrimaryButton>
        </div>
      </GoldCard>
    );
  } else {
    body = (
      <GoldCard className="space-y-3 text-center" data-testid="repeat-finished">
        <p className="text-[16px] font-black">خلّصت كل الجولات 🎉</p>
        <p className="text-[34px] font-black text-[#002147]">{overall === null ? '—' : `${pct(overall)}٪`}</p>
        <p className="text-[12px] font-bold text-slate-500">{overall === null ? 'ما فيه تقييم لأن المايك ما سمع شي' : 'متوسط كل الجمل اللي تقيّمت بالمايك'}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <GhostButton onClick={() => { saraStopNarrator(); rec.abort(); setLevel(null); setIdx(0); setResults({}); setPhase('practice'); setVoice('idle'); setReviewCount(0); loadWeakWords(teacher.id, uid).then(w => { weakRef.current = w; }); }} className="py-3"><RotateCcw size={14} />من جديد</GhostButton>
          <PrimaryButton onClick={exit} className="flex-1 py-3">{backLabel || 'رجوع لفصل المعلمين'}</PrimaryButton>
        </div>
      </GoldCard>
    );
  }

  return (
    <div className="fixed inset-0 z-[230] overflow-y-auto bg-[#fdfaf3]" data-testid="sara-repeat-practice">
      <SectionShell dir="rtl" className="!min-h-full">
        {header}
        {scene}
        {body}
      </SectionShell>
    </div>
  );
};

export default SaraRepeatPractice;
