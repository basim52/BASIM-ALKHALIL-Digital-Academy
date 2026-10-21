import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, Square, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { playCloudAudioAs, cancelAllSpeech } from '../lib/audio';
import { BOARD_PERSONAS, personaById, type BoardPersona } from '../data/saraBoardPersonas';
import { toToolCalls, type BoardResult } from '../lib/boardActions';
const TutorTldrawBoard = lazy(() => import('./TutorTldrawBoard'));
import TutorTrackPlayer from './TutorTrackPlayer';
import { TUTOR_TRACKS, type TutorTrack } from '../data/tutorTracks';

const OWNER = 'sara-board';
type Step = 'pick' | 'board' | 'check' | 'done';

/** Persona cloud voice only (Gemini TTS via /api/tts). No browser voice fallback. */
const usePersonaVoice = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'failed'>('idle');
  const stopRef = useRef<{ stop: () => void } | null>(null);
  const stop = () => { try { stopRef.current?.stop(); } catch { /* ignore */ } cancelAllSpeech(OWNER); setState('idle'); };
  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const play = async (text: string, voice: string) => {
    stop(); setState('loading');
    try {
      const r = await fetch('/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text.slice(0, 1200), lang: 'en', voiceName: voice }) });
      const j = r.ok ? await r.json() : null;
      if (!j?.audio) { setState('failed'); return; }
      setState('playing');
      const p = await playCloudAudioAs(OWNER, j.audio, () => setState('idle'));
      stopRef.current = p || null;
      if (!p) setState('failed');
    } catch { setState('failed'); }
  };
  return { state, play, stop };
};

const boardSpeech = (b: BoardResult) => b.boardActions.map(a =>
  a.kind === 'example' ? a.en : a.kind === 'fix' ? `Not "${a.wrong}". Say "${a.right}".` : a.kind === 'arrow' ? `${a.from}, becomes ${a.to}.` : a.text).join('. ');

const VoiceBtn: React.FC<{ v: ReturnType<typeof usePersonaVoice>; text: string; p: BoardPersona }> = ({ v, text, p }) => (
  <div className="flex items-center gap-2 shrink-0">
    {v.state === 'loading' || v.state === 'playing'
      ? <button onClick={v.stop} data-testid="board-voice-stop" className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Square size={13} className="inline" /> إيقاف</button>
      : <button onClick={() => void v.play(text, p.voice)} data-testid="board-voice-play" className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Volume2 size={13} className="inline" /> {v.state === 'failed' ? 'إعادة المحاولة' : `استمع لـ${p.nameAr}`}</button>}
    {v.state === 'failed' && <span className="text-[10px] text-rose-300 font-bold">الصوت غير متاح الآن</span>}
  </div>
);

export const SaraBoardTutor: React.FC<{ uid?: string; mock?: { step: Step; persona?: string; board?: BoardResult } }> = ({ uid, mock }) => {
  const [step, setStep] = useState<Step>(mock?.step || 'pick');
  const [persona, setPersona] = useState<BoardPersona>(personaById(mock?.persona || 'grammar'));
  const [topic, setTopic] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [board, setBoard] = useState<BoardResult | null>(mock?.board || null);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [saved, setSaved] = useState<'no' | 'ok' | 'fail'>('no');
  const voice = usePersonaVoice();
  const [track, setTrack] = useState<TutorTrack | null>(null);
  const calls = useMemo(() => (board ? ((board as any).toolCalls || toToolCalls(board.boardActions)) : []), [board]);

  const ask = async () => {
    const t = topic.trim(); if (!t || busy) return;
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/sara/board', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ persona: persona.id, topic: t }) });
      if (r.status === 429) { setErr('وصلت الحد المؤقت للسبورة، جرّب بعد شوي.'); return; }
      if (!r.ok) throw new Error(String(r.status));
      setBoard(await r.json()); setQi(0); setPicked(null); setCorrect(0); setSaved('no'); setStep('board');
    } catch { setErr(`${persona.nameAr} مشغول الحين، جرّب بعد شوي.`); }
    finally { setBusy(false); }
  };

  const finish = async (finalCorrect: number) => {
    setStep('done'); voice.stop();
    if (!uid || !board || mock) return;
    try {
      await addDoc(collection(db, 'users', uid, 'saraBoardSessions'), { personaId: persona.id, topic: topic.trim().slice(0, 300), checksTotal: board.checks.length, checksCorrect: finalCorrect, createdAt: serverTimestamp() });
      setSaved('ok');
    } catch { setSaved('fail'); }
  };

  const shell = (children: React.ReactNode) => (
    <div data-testid="sara-board-tutor" className="flex-1 min-h-0 p-3 flex flex-col gap-2 bg-[#001a38] text-white overflow-hidden">{children}</div>
  );

  if (track) return <TutorTrackPlayer track={track} uid={uid} onBack={() => setTrack(null)} />;
  const personaTrack = TUTOR_TRACKS.find(t => t.personaId === persona.id);

  if (step === 'pick') return shell(<>
    <p className="text-[11px] text-amber-200/90 font-bold shrink-0">اختر المعلم واكتب وش تبي تتعلم، ويشرحه لك على السبورة.</p>
    <div className="grid grid-cols-3 gap-1.5 shrink-0">
      {BOARD_PERSONAS.map(p => (
        <button key={p.id} data-testid={`board-persona-${p.id}`} onClick={() => setPersona(p)}
          className={`rounded-xl border p-2 flex flex-col items-center gap-0.5 ${persona.id === p.id ? 'bg-amber-400 text-[#001a38] border-amber-300' : 'bg-[#0a2d5c] border-white/10'}`}>
          <span className="text-[22px] leading-none">{p.emoji}</span>
          <span className="text-[13px] font-black">{p.nameAr}</span>
          <span className={`text-[9px] font-bold text-center leading-tight ${persona.id === p.id ? 'text-[#001a38]/80' : 'text-white/70'}`}>{p.roleAr}</span>
        </button>
      ))}
    </div>
    <input dir="ltr" value={topic} maxLength={300} onChange={e => setTopic(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void ask(); }}
      placeholder={persona.examplesAr[0]} data-testid="board-topic"
      className="shrink-0 rounded-xl bg-[#0a2d5c] border border-amber-400/40 px-3 py-2 text-[14px] font-bold text-white placeholder:text-white/30 outline-none focus:border-amber-400" />
    <div className="flex flex-wrap gap-1.5 shrink-0">
      {persona.examplesAr.map(e => <button key={e} onClick={() => setTopic(e)} className="px-2 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-bold" dir="ltr">{e}</button>)}
    </div>
    {err && <p className="text-[12px] font-bold text-rose-300 shrink-0">{err}</p>}
    {personaTrack && (
      <button onClick={() => { voice.stop(); setTrack(personaTrack); }} data-testid="tutor-track-open"
        className="shrink-0 rounded-xl border border-amber-400/60 bg-[#0a2d5c] px-3 py-2 text-start flex items-center gap-2">
        <span className="text-[20px]">📚</span>
        <span className="flex-1 min-w-0"><span className="block text-[13px] font-black text-amber-300">دروس {persona.nameAr}</span><span className="block text-[11px] font-bold text-white/75 truncate">{personaTrack.titleAr} · {personaTrack.lessons.length} درس</span></span>
      </button>
    )}
    <div className="flex-1" />
    <button onClick={() => void ask()} disabled={!topic.trim() || busy} data-testid="board-ask"
      className="shrink-0 w-full py-3 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black disabled:opacity-40">{busy ? `${persona.nameAr} ${persona.gender === 'female' ? 'تجهّز' : 'يجهّز'} السبورة…` : 'اشرح لي على السبورة'}</button>
  </>);

  if (!board) return shell(null);

  if (step === 'board') return shell(<>
    <div className="flex items-center justify-between gap-2 shrink-0">
      <p className="text-[12px] font-black text-amber-300">{persona.emoji} {persona.nameAr} — {persona.roleAr}</p>
      <VoiceBtn v={voice} text={boardSpeech(board)} p={persona} />
    </div>
    <div data-testid="board-surface" className="flex-1 min-h-0">
      <Suspense fallback={<div className="w-full h-full rounded-2xl border-2 border-amber-400/60 bg-[#0a2d5c] flex items-center justify-center text-[12px] font-bold text-amber-200">جاري فتح السبورة…</div>}>
        <TutorTldrawBoard calls={calls} personaId={persona.id} speaking={voice.state === 'loading' || voice.state === 'playing'} onSpeak={() => void voice.play(boardSpeech(board), persona.voice)} />
      </Suspense>
    </div>
    {board.explanationAr && <p className="text-[12px] font-bold text-white/85 shrink-0 line-clamp-3">{board.explanationAr}</p>}
    <div className="flex gap-2 shrink-0">
      <button onClick={() => { voice.stop(); setStep('pick'); }} className="px-3 py-3 rounded-xl bg-white/10 text-[13px] font-black">موضوع ثاني</button>
      <button onClick={() => { voice.stop(); if (board.checks.length) { setQi(0); setPicked(null); setCorrect(0); setStep('check'); } else void finish(0); }} data-testid="board-next"
        className="flex-1 py-3 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">{board.checks.length ? 'تأكد إنك فهمت' : 'تم'} <ArrowLeft size={14} className="inline" /></button>
    </div>
  </>);

  if (step === 'check') {
    const c = board.checks[qi];
    const last = qi === board.checks.length - 1;
    return shell(<>
      <p className="text-[11px] font-black text-amber-300 shrink-0">سؤال {qi + 1} من {board.checks.length}</p>
      <div className="rounded-xl bg-[#0a2d5c] border border-amber-400/40 p-3 shrink-0"><p dir="ltr" className="text-[15px] font-black text-start">{c.q}</p></div>
      <div className="grid gap-1.5 shrink-0">
        {c.options.map((o, i) => {
          const st = picked === null ? 'bg-white text-[#001a38] border-amber-300' : i === c.correctIndex ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-600 border-slate-200';
          return <button key={i} dir="ltr" data-testid="board-option" disabled={picked !== null} onClick={() => { setPicked(i); if (i === c.correctIndex) setCorrect(n => n + 1); }} className={`px-3 py-2.5 rounded-xl border text-[14px] font-bold text-start ${st}`}>{o}</button>;
        })}
      </div>
      {picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === c.correctIndex ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === c.correctIndex ? <><CheckCircle2 size={15} className="inline" /> صح!</> : <><XCircle size={15} className="inline" /> الجواب الصحيح: <span dir="ltr">{c.options[c.correctIndex]}</span></>}</p>}
      <div className="flex-1" />
      <button disabled={picked === null} data-testid="board-check-next" onClick={() => { if (last) void finish(correct); else { setQi(qi + 1); setPicked(null); } }}
        className="shrink-0 w-full py-3 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black disabled:opacity-40">{last ? 'النتيجة' : 'التالي'}</button>
    </>);
  }

  const total = board.checks.length;
  return shell(<>
    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
      <span className="text-[44px]">{persona.emoji}</span>
      <p className="text-[18px] font-black text-amber-300">{total ? `جاوبت ${correct} من ${total} صح` : 'خلصنا الشرح'}</p>
      <p className="text-[12px] font-bold text-white/80">{total && correct === total ? 'ممتاز، فهمت الفكرة.' : 'راجع السبورة مرة ثانية إذا تحب.'}</p>
      {saved === 'fail' && <p className="text-[11px] font-bold text-rose-300">ما انحفظت الجلسة، بس ما يأثر على دروسك.</p>}
    </div>
    <div className="flex gap-2 shrink-0">
      <button onClick={() => setStep('board')} className="px-3 py-3 rounded-xl bg-white/10 text-[13px] font-black">رجوع للسبورة</button>
      <button onClick={() => { setTopic(''); setBoard(null); setStep('pick'); }} data-testid="board-new" className="flex-1 py-3 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">موضوع جديد</button>
    </div>
  </>);
};
export default SaraBoardTutor;
