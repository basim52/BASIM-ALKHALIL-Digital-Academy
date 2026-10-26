import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Mic, MicOff, Volume2, Camera, CameraOff, RotateCcw, SkipForward, CheckCircle2 } from 'lucide-react';
import { SectionShell, GoldCard, PrimaryButton, GhostButton, ProgressPill, TutorFace } from './ui/academy';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { checkSpokenAnswer } from '../utils/speechAnswerCheck';

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

type ItemResult = { score: number | null; transcript: string; missing: string[] };
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

/** Mic recognition (en-US), same approach as SpeakingDrillCheck: best of 3 alternatives scored by checkSpokenAnswer. */
function useRepeatRecognition() {
  const recRef = useRef<any>(null);
  const gotRef = useRef(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supported = typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  const abort = useCallback(() => { try { recRef.current?.abort(); } catch { /* ignore */ } recRef.current = null; setListening(false); }, []);
  useEffect(() => () => { try { recRef.current?.abort(); } catch { /* ignore */ } recRef.current = null; }, []);
  const start = useCallback((expected: string, onScored: (r: ItemResult) => void, quietErrors = false) => {
    setError(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError('متصفحك ما يدعم التعرّف على الصوت. جرّب Chrome أو Safari.'); return; }
    try { recRef.current?.abort(); } catch { /* ignore */ }
    const rec = new SR();
    rec.lang = 'en-US'; rec.interimResults = false; rec.continuous = false; rec.maxAlternatives = 3;
    gotRef.current = false;
    rec.onresult = (e: any) => {
      gotRef.current = true;
      const alts: string[] = Array.from(e.results?.[0] || []).map((a: any) => a.transcript || '');
      const best = alts.map(t => ({ t, r: checkSpokenAnswer(t, expected) })).sort((a, b) => b.r.score - a.r.score)[0];
      if (!best || !best.r.heard.length) return;
      onScored({ score: best.r.score, transcript: best.t, missing: best.r.missing });
    };
    rec.onerror = (e: any) => {
      const code = e?.error;
      if (quietErrors && code !== 'no-speech') { setListening(false); return; }
      setError(code === 'not-allowed' || code === 'service-not-allowed'
        ? 'ما قدرنا نستخدم المايك. اسمح للموقع بالمايكروفون واضغط زر المايك.'
        : code === 'no-speech' ? 'ما سمعتك. اضغط المايك وردّد بصوت واضح.' : 'صار خطأ في التعرّف على الصوت. حاول مرة ثانية.');
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
      if (!gotRef.current && !quietErrors) setError(prev => prev || 'ما سمعتك. اضغط المايك وردّد بصوت واضح.');
      recRef.current = null;
    };
    recRef.current = rec;
    try { rec.start(); setListening(true); } catch { setListening(false); if (!quietErrors) setError('تعذّر تشغيل المايك. حاول مرة ثانية.'); }
  }, []);
  const stop = useCallback(() => { try { recRef.current?.stop(); } catch { /* ignore */ } }, []);
  return { listening, error, supported, start, stop, abort };
}

function adviceFor(avg: number | null, weak: string[]): string {
  const w = weak.slice(0, 4).join('، ');
  if (avg === null) return 'ما قدرت أسمعك في هالجولة. تأكد إن المايك شغّال وقرّب الجوال منك، ونعيدها سوا.';
  if (avg >= 0.85) return `ممتاز! نطقك واضح وقريب جداً من نطقي.${w ? ` بس انتبه شوي لـ ${w}.` : ''} كمّل على نفس المستوى.`;
  if (avg >= 0.65) return `زين! أغلب الكلام واضح.${w ? ` ركّز على: ${w}.` : ''} قلها على مهلك وبصوت واضح.`;
  return `ولا يهمك، البداية دايم كذا. اسمع الجملة مرة ثانية قبل ما تعيدها، وقلها كلمة كلمة.${w ? ` وركّز على: ${w}.` : ''}`;
}

interface Props { onClose: () => void }

export const SaraRepeatPractice: React.FC<Props> = ({ onClose }) => {
  const [level, setLevel] = useState<Level | null>(null);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<Record<number, ItemResult>>({});
  const [phase, setPhase] = useState<'practice' | 'review' | 'finished'>('practice');
  const [voice, setVoice] = useState<Voice>('idle');
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const cam = useSelfieCamera();
  const rec = useRepeatRecognition();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const items = level ? ITEMS[level] : [];
  const text = items[idx] || '';
  const round = Math.floor(idx / ROUND);
  const rounds = Math.ceil(items.length / ROUND);
  const res = results[idx];

  useEffect(() => { const f = () => setIsDesktop(window.innerWidth >= 768); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  useEffect(() => { const v = videoRef.current; if (v) { v.srcObject = cam.stream; if (cam.stream) v.play().catch(() => {}); } }, [cam.stream]);
  // Leaving the page: Sara stops talking, the mic is released and the camera turns off.
  const aliveRef = useRef(true);
  useEffect(() => { aliveRef.current = true; return () => { aliveRef.current = false; saraStopNarrator(); }; }, []);

  const exit = () => { saraStopNarrator(); rec.abort(); cam.stop(); onClose(); };

  const say = useCallback((t: string, then?: () => void) => {
    saraUnlockNarrator(); setVoice('loading');
    saraNarrate(t, () => setVoice('blocked'), () => setVoice('failed'), () => { if (!aliveRef.current) return; setVoice('done'); then?.(); });
  }, []);

  const keep = useCallback((i: number) => (r: ItemResult) => {
    setResults(prev => { const old = prev[i]; return old && old.score !== null && r.score !== null && old.score > r.score ? prev : { ...prev, [i]: r }; });
  }, []);

  // Sara models the item, then the mic opens automatically (the student can always tap the mic too).
  const present = useCallback((i: number, t: string) => {
    rec.abort();
    say(t, () => rec.start(t, keep(i), true));
  }, [rec, say, keep]);

  const begin = (lv: Level) => {
    saraUnlockNarrator();
    setLevel(lv); setIdx(0); setResults({}); setPhase('practice');
    void cam.start();
    present(0, ITEMS[lv][0]);
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
      <TutorFace tutor="sara" size={faceSize} isSpeaking={speaking} />
      <span className="text-[13px] sm:text-[15px] font-black text-[#E8C766]">سارة</span>
    </div>
  );

  const camOn = cam.state === 'on';
  const studentPanel = (
    <div className={`relative ${sceneH} rounded-3xl border-2 border-[#C49E3A] bg-gradient-to-b from-[#0a2d5c] to-[#001a38] overflow-hidden shadow-lg flex flex-col items-center justify-center gap-2`} data-testid="repeat-student-panel">
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] z-10 bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
      <video ref={videoRef} muted playsInline autoPlay aria-label="كاميرا الطالب" className={`absolute inset-0 w-full h-full object-cover ${camOn ? '' : 'hidden'}`} style={{ transform: 'scaleX(-1)' }} />
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
      <h1 className="flex-1 min-w-0 truncate text-[18px] sm:text-[22px] font-black text-[#002147]">🎙️ ردّد مع سارة</h1>
      {level && phase !== 'finished' && <ProgressPill data-testid="repeat-progress">الجولة {round + 1} من {rounds} · {Math.min(idx % ROUND + 1, ROUND)}/{ROUND}</ProgressPill>}
    </div>
  );

  let body: React.ReactNode;
  if (!level) {
    body = (
      <GoldCard className="space-y-3 text-center">
        <p className="text-[15px] sm:text-[17px] font-black">سارة تقول الكلمة أو الجملة، وأنت تردّدها وراها 🎧</p>
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
          <span className="flex-1 text-[12px] font-black text-[#C49E3A]">{voice === 'loading' ? 'سارة تتكلم…' : rec.listening ? 'دورك! ردّد الحين 🎙️' : res ? 'تقدر تعيد أو تكمل' : 'ردّد وراها'}</span>
          <GhostButton onClick={() => { rec.abort(); say(text); }} data-testid="repeat-listen"><Volume2 size={14} />{voice === 'failed' || voice === 'blocked' ? 'اضغط لتسمع سارة' : 'اسمع سارة مرة ثانية'}</GhostButton>
        </div>
        <p dir="ltr" className="text-center text-[24px] sm:text-[32px] font-black text-[#002147] leading-snug py-2" data-testid="repeat-text">{text}</p>
        {voice === 'failed' && <p className="text-[12px] font-bold text-rose-700 text-center">تعذّر صوت سارة الحين. اضغط «اضغط لتسمع سارة» لإعادة المحاولة، أو اقرأ الجملة وردّدها.</p>}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={rec.listening ? rec.stop : () => { saraStopNarrator(); rec.start(text, keep(idx)); }} disabled={!rec.supported} data-testid="repeat-mic"
            className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-black text-[15px] shadow-md active:scale-95 transition-transform disabled:opacity-40 ${rec.listening ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#C49E3A] text-[#002147] hover:bg-[#d4ae4a]'}`}>
            {rec.listening ? <MicOff size={18} /> : <Mic size={18} />}{rec.listening ? 'أسمعك… اضغط للإيقاف' : res ? 'ردّد مرة ثانية' : 'اضغط وردّد'}
          </button>
        </div>
        {rec.error && <p className="text-[12px] font-bold text-amber-700 text-center">{rec.error}</p>}
        {res && res.score !== null && (
          <div className={`rounded-xl border p-3 text-center space-y-1 ${res.score >= 0.85 ? 'bg-emerald-50 border-emerald-300' : res.score >= 0.65 ? 'bg-amber-50 border-amber-300' : 'bg-rose-50 border-rose-300'}`} data-testid="repeat-score">
            <p className="text-[18px] font-black">{pct(res.score)}٪ {res.score >= 0.85 ? '🌟' : res.score >= 0.65 ? '👍' : '💪'}</p>
            <p dir="ltr" className="text-[13px] font-bold text-slate-700">🗣️ “{res.transcript}”</p>
            {res.missing.length > 0 && <p className="text-[12px] font-bold text-rose-700">كلمات ما وضحت: <span dir="ltr">{res.missing.join(', ')}</span></p>}
          </div>
        )}
        <div className="flex gap-2">
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
        <p className="text-[13px] font-black text-[#C49E3A]">مراجعة سارة — الجولة {round + 1}</p>
        <p className="text-[34px] sm:text-[40px] font-black text-[#002147]">{avg === null ? '—' : `${pct(avg)}٪`}</p>
        <p className="text-[12px] font-bold text-slate-500">{avg === null ? 'ما فيه تقييم في هالجولة' : `متوسط ${scoredCount} من ${Math.min(ROUND, items.length - round * ROUND)} جمل تم تقييمها بالمايك`}</p>
        {weak.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5" dir="ltr">
            {weak.map(w => <span key={w} className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-[13px] font-black">{w}</span>)}
          </div>
        )}
        <p className="text-[14px] sm:text-[15px] font-bold text-[#002147] leading-relaxed bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl p-3">💬 {adviceFor(avg, weak)}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <GhostButton onClick={() => say(`${avg === null ? '' : `نتيجتك في هالجولة ${pct(avg)} بالمية. `}${adviceFor(avg, weak)}`)} className="py-3"><Volume2 size={14} />اسمع نصيحة سارة</GhostButton>
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
          <GhostButton onClick={() => { saraStopNarrator(); rec.abort(); setLevel(null); setIdx(0); setResults({}); setPhase('practice'); setVoice('idle'); }} className="py-3"><RotateCcw size={14} />من جديد</GhostButton>
          <PrimaryButton onClick={exit} className="flex-1 py-3">رجوع لفصل المعلمين</PrimaryButton>
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
