import { L, useT } from '../lib/explainLang';
import { getExplainLang } from '../lib/explainLang';
import ExplainLangToggle from './ExplainLangToggle';
import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, Square, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { playCloudAudioAs, cancelAllSpeech, fetchCloudVoice } from '../lib/audio';
import { BOARD_PERSONAS, personaById, type BoardPersona } from '../data/saraBoardPersonas';
import { toToolCalls, type BoardResult } from '../lib/boardActions';
const TutorTldrawBoard = lazy(() => import('./TutorTldrawBoard'));
import TutorTrackPlayer from './TutorTrackPlayer';
import { TUTOR_TRACKS, type TutorTrack } from '../data/tutorTracks';
import { SaraTracksHub } from './SaraTracksHub';
import { TUTOR_FILL_BLANK_TRACKS } from '../data/fillBlankTracks';
const FillBlankPlayer = lazy(() => import('./SaraFillBlankPlayer').then(m => ({ default: m.FillBlankPlayer })));
const SaraRepeatPractice = lazy(() => import('./SaraRepeatPractice'));

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
      const j = await fetchCloudVoice(text, voice);
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
      ? <button onClick={v.stop} data-testid="board-voice-stop" className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Square size={13} className="inline" /> {L("إيقاف", "Stop")}</button>
      : <button onClick={() => void v.play(text, p.voice)} data-testid="board-voice-play" className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Volume2 size={13} className="inline" /> {v.state === 'failed' ? L('إعادة المحاولة', 'Try again') : L(`استمع لـ${p.nameAr}`, `Listen to ${p.nameEn}`)}</button>}
    {v.state === 'failed' && <span className="text-[10px] text-rose-300 font-bold">{L("الصوت غير متاح الآن", "Audio is not available right now")}</span>}
  </div>
);

/** Teacher portrait (/tutors/{id}.webp) in a gold ring; falls back to the persona emoji if the photo is missing. */
const TeacherPhoto: React.FC<{ p: BoardPersona; size: number; ring?: string; className?: string }> = ({ p, size, ring = '#C49E3A', className = '' }) => {
  const [bad, setBad] = useState(false);
  if (bad) return <span className={`leading-none ${className}`} style={{ fontSize: Math.round(size * 0.55) }}>{p.emoji}</span>;
  return <img src={`/tutors/${p.id}.webp`} alt={L(p.nameAr, p.nameEn)} loading="lazy" decoding="async" draggable={false} onError={() => setBad(true)} width={size} height={size}
    className={`rounded-full object-cover shrink-0 ${className}`} style={{ width: size, height: size, boxShadow: `0 0 0 3px ${ring}` }} />;
};

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
  useT(); // re-render on the ع/EN switch
  const voice = usePersonaVoice();
  const [track, setTrack] = useState<TutorTrack | null>(null);
  const [saraHub, setSaraHub] = useState(false);
  const [fbOpen, setFbOpen] = useState(false);
  const [repeatOpen, setRepeatOpen] = useState(false); // «ردّد مع سارة» (pilot: Sara only)
  const calls = useMemo(() => (board ? ((board as any).toolCalls || toToolCalls(board.boardActions)) : []), [board]);

  const ask = async () => {
    const t = topic.trim(); if (!t || busy) return;
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/sara/board', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ persona: persona.id, topic: t, lang: getExplainLang() }) });
      if (r.status === 429) { setErr(L('وصلت الحد المؤقت للسبورة، جرّب بعد شوي.', 'Board limit reached for now, try again later.')); return; }
      if (!r.ok) throw new Error(String(r.status));
      setBoard(await r.json()); setQi(0); setPicked(null); setCorrect(0); setSaved('no'); setStep('board');
    } catch { setErr(L(`${persona.nameAr} مشغول الحين، جرّب بعد شوي.`, `${persona.nameEn} is busy right now, try again later.`)); }
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
  const fbTrack = TUTOR_FILL_BLANK_TRACKS.find(t => t.personaId === persona.id);

  if (step === 'pick') return shell(<>
    <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[11px] text-amber-200/90 font-bold">{L("اختر المعلم واكتب وش تبي تتعلم، ويشرحه لك على السبورة.", "Pick a teacher and type what you want to learn; they explain it on the board.")}</p><ExplainLangToggle /></div>
    <div className="grid grid-cols-4 gap-1.5 shrink-0">
      {BOARD_PERSONAS.filter(p => !p.kids).map(p => {
        const card = (
        <button key={p.id} data-testid={`board-persona-${p.id}`} onClick={() => { setPersona(p); if (p.id === 'sara' && !mock) { voice.stop(); setSaraHub(true); } }}
          className={`rounded-2xl border p-1.5 pt-2 flex flex-col items-center gap-0.5 transition-transform active:scale-95 ${persona.id === p.id ? 'bg-amber-400 text-[#001a38] border-amber-300' : 'bg-[#0a2d5c] border-white/10'}`}>
          <TeacherPhoto p={p} size={48} ring={persona.id === p.id ? '#001a38' : '#C49E3A'} className="mb-0.5" />
          <span className="text-[13px] font-black">{L(p.nameAr, p.nameEn)}</span>
          <span className={`text-[9px] font-bold text-center leading-tight ${persona.id === p.id ? 'text-[#001a38]/80' : 'text-white/70'}`}>{L(p.roleAr, p.roleEn || p.roleAr)}</span>
        </button>
        );
        if (p.id !== 'sara') return card;
        // Sara's card carries the «ردّد مع سارة» pilot button (other teachers later).
        return (
          <div key={p.id} className="flex flex-col gap-1 min-w-0">
            {card}
            <button type="button" onClick={() => { voice.stop(); setRepeatOpen(true); }} data-testid="sara-repeat-open"
              className="w-full rounded-xl bg-[#C49E3A] hover:bg-[#d4ae4a] text-[#002147] border border-[#E8C766] px-1 py-1 text-[10px] sm:text-[11px] font-black leading-tight shadow-md active:scale-95 transition-transform">🎙️ ردّد مع سارة</button>
          </div>
        );
      })}
    </div>
    {repeatOpen && <Suspense fallback={null}><SaraRepeatPractice onClose={() => setRepeatOpen(false)} /></Suspense>}
    <div data-testid="kids-teachers" className="shrink-0 rounded-2xl bg-[#fdfaf3] border-2 border-[#C49E3A] p-2">
      <p className="text-[12px] font-black text-[#002147] mb-1.5">{L("🌱 من الصفر — للصغار والكبار", "🌱 From zero, for kids and adults")}</p>
      <div className="grid grid-cols-4 gap-1.5">
        {BOARD_PERSONAS.filter(p => p.kids).map(p => {
          const on = persona.id === p.id, k = p.kids!;
          return (
            <button key={p.id} data-testid={`board-persona-${p.id}`} onClick={() => setPersona(p)}
              className="rounded-2xl p-1.5 flex flex-col items-center gap-0.5 bg-white transition-transform active:scale-95" style={{ border: `3px solid ${on ? k.accent : k.accent + '40'}`, background: on ? k.soft : '#fff' }}>
              <img src={`/tutors/${p.id}.webp`} alt={L(p.nameAr, p.nameEn)} loading="lazy" draggable={false} className="w-12 h-12 rounded-full object-cover" style={{ boxShadow: `0 0 0 3px ${k.accent}` }} />
              <span className="text-[13px] font-black" style={{ color: k.ink }}>{L(p.nameAr, p.nameEn)}</span>
              <span className="text-[9px] font-bold text-center leading-tight text-slate-600">{L(p.roleAr, p.roleEn || p.roleAr)}</span>
            </button>
          );
        })}
      </div>
    </div>
    <input dir="ltr" value={topic} maxLength={300} onChange={e => setTopic(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void ask(); }}
      placeholder={persona.examplesAr[0]} data-testid="board-topic"
      className="shrink-0 rounded-xl bg-[#0a2d5c] border border-amber-400/40 px-3 py-2 text-[14px] font-bold text-white placeholder:text-white/30 outline-none focus:border-amber-400" />
    <div className="flex flex-wrap gap-1.5 shrink-0">
      {persona.examplesAr.map(e => <button key={e} onClick={() => setTopic(e)} className="px-2 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-bold" dir="ltr">{e}</button>)}
    </div>
    {err && <p className="text-[12px] font-bold text-rose-300 shrink-0">{err}</p>}
    {persona.id === 'sara' && (
      <button onClick={() => { voice.stop(); setSaraHub(true); }} data-testid="sara-curricula-open"
        className="shrink-0 rounded-xl border border-amber-400/60 bg-[#0a2d5c] px-3 py-2 text-start flex items-center gap-2">
        <span className="text-[20px]">📚</span>
        <span className="flex-1 min-w-0"><span className="block text-[13px] font-black text-amber-300">{L("مناهج سارة", "Sara's Curricula")}</span><span className="block text-[11px] font-bold text-white/75 truncate">{L("القواعد · المحادثة · القراءة · الكتابة — على السبورة بصوت سارة", "Grammar · Conversation · Reading · Writing, on the board in Sara's voice")}</span></span>
      </button>
    )}
    {saraHub && <SaraTracksHub isOpen uid={uid} onClose={() => setSaraHub(false)} />}
    {personaTrack && (
      <button onClick={() => { voice.stop(); setTrack(personaTrack); }} data-testid="tutor-track-open"
        className="shrink-0 rounded-xl border border-amber-400/60 bg-[#0a2d5c] px-3 py-2 text-start flex items-center gap-2">
        <span className="text-[20px]">📚</span>
        <span className="flex-1 min-w-0"><span className="block text-[13px] font-black text-amber-300">{L(`دروس ${persona.nameAr}`, `${persona.nameEn}'s lessons`)}</span><span className="block text-[11px] font-bold text-white/75 truncate">{L(personaTrack.titleAr, personaTrack.titleEn)} · {personaTrack.lessons.length} {L("درس", "lessons")}</span></span>
      </button>
    )}
    {fbTrack && (
      <button onClick={() => { voice.stop(); setFbOpen(true); }} data-testid="tutor-fill-blank-open"
        className="shrink-0 rounded-xl border border-amber-400/60 bg-[#0a2d5c] px-3 py-2 text-start flex items-center gap-2">
        <span className="text-[20px]">🧩</span>
        <span className="flex-1 min-w-0"><span className="block text-[13px] font-black text-amber-300">{L(fbTrack.titleAr, fbTrack.titleEn)}</span><span className="block text-[11px] font-bold text-white/75 truncate">{L("اختر الكلمة الناقصة", "Pick the missing word")} · {fbTrack.lessons.length} {L("درس", "lessons")}</span></span>
      </button>
    )}
    {fbOpen && fbTrack && <Suspense fallback={null}><FillBlankPlayer isOpen track={fbTrack} uid={uid} onClose={() => setFbOpen(false)} /></Suspense>}
    <div className="flex-1" />
    <button onClick={() => void ask()} disabled={!topic.trim() || busy} data-testid="board-ask"
      className="shrink-0 w-full py-3 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black disabled:opacity-40">{busy ? L(`${persona.nameAr} ${persona.gender === 'female' ? 'تجهّز' : 'يجهّز'} السبورة…`, `${persona.nameEn} is preparing the board…`) : L('اشرح لي على السبورة', 'Explain it on the board')}</button>
  </>);

  if (!board) return shell(null);

  if (step === 'board') return shell(<>
    <div className="flex items-center justify-between gap-2 shrink-0">
      <p className="text-[12px] font-black text-amber-300 flex items-center gap-2"><TeacherPhoto p={persona} size={28} /> {L(persona.nameAr, persona.nameEn)} — {L(persona.roleAr, persona.roleEn || persona.roleAr)}</p>
      <VoiceBtn v={voice} text={boardSpeech(board)} p={persona} />
    </div>
    <div data-testid="board-surface" className="flex-1 min-h-0">
      <Suspense fallback={<div className="w-full h-full rounded-2xl border-2 border-amber-400/60 bg-[#0a2d5c] flex items-center justify-center text-[12px] font-bold text-amber-200">{L("جاري فتح السبورة…", "Opening the board…")}</div>}>
        <TutorTldrawBoard calls={calls} personaId={persona.id} lessonTitle={topic} speaking={voice.state === 'loading' || voice.state === 'playing'} onSpeak={() => void voice.play(boardSpeech(board), persona.voice)} />
      </Suspense>
    </div>
    {board.explanationAr && <p className="text-[12px] font-bold text-white/85 shrink-0 line-clamp-3">{board.explanationAr}</p>}
    <div className="flex gap-2 shrink-0">
      <button onClick={() => { voice.stop(); setStep('pick'); }} className="px-3 py-3 rounded-xl bg-white/10 text-[13px] font-black">{L("موضوع ثاني", "Another topic")}</button>
      <button onClick={() => { voice.stop(); if (board.checks.length) { setQi(0); setPicked(null); setCorrect(0); setStep('check'); } else void finish(0); }} data-testid="board-next"
        className="flex-1 py-3 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">{board.checks.length ? L('تأكد إنك فهمت', 'Check you understood') : L('تم', 'Done')} <ArrowLeft size={14} className="inline" /></button>
    </div>
  </>);

  if (step === 'check') {
    const c = board.checks[qi];
    const last = qi === board.checks.length - 1;
    return shell(<>
      <p className="text-[11px] font-black text-amber-300 shrink-0">{L('سؤال', 'Question')} {qi + 1} {L('من', 'of')} {board.checks.length}</p>
      <div className="rounded-xl bg-[#0a2d5c] border border-amber-400/40 p-3 shrink-0"><p dir="ltr" className="text-[15px] font-black text-start">{c.q}</p></div>
      <div className="grid gap-1.5 shrink-0">
        {c.options.map((o, i) => {
          const st = picked === null ? 'bg-white text-[#001a38] border-amber-300' : i === c.correctIndex ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-600 border-slate-200';
          return <button key={i} dir="ltr" data-testid="board-option" disabled={picked !== null} onClick={() => { setPicked(i); if (i === c.correctIndex) setCorrect(n => n + 1); }} className={`px-3 py-2.5 rounded-xl border text-[14px] font-bold text-start ${st}`}>{o}</button>;
        })}
      </div>
      {picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === c.correctIndex ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === c.correctIndex ? <><CheckCircle2 size={15} className="inline" /> {L("صح!", "Correct!")}</> : <><XCircle size={15} className="inline" /> {L("الجواب الصحيح:", "Correct answer:")} <span dir="ltr">{c.options[c.correctIndex]}</span></>}</p>}
      <div className="flex-1" />
      <button disabled={picked === null} data-testid="board-check-next" onClick={() => { if (last) void finish(correct); else { setQi(qi + 1); setPicked(null); } }}
        className="shrink-0 w-full py-3 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black disabled:opacity-40">{last ? L('النتيجة', 'Result') : L('التالي', 'Next')}</button>
    </>);
  }

  const total = board.checks.length;
  return shell(<>
    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
      <TeacherPhoto p={persona} size={72} className="mb-1" />
      <p className="text-[18px] font-black text-amber-300">{total ? L(`جاوبت ${correct} من ${total} صح`, `You got ${correct} of ${total} right`) : L('خلصنا الشرح', 'Explanation finished')}</p>
      <p className="text-[12px] font-bold text-white/80">{total && correct === total ? L('ممتاز، فهمت الفكرة.', 'Excellent, you got the idea.') : L('راجع السبورة مرة ثانية إذا تحب.', 'Review the board again if you like.')}</p>
      {saved === 'fail' && <p className="text-[11px] font-bold text-rose-300">{L("ما انحفظت الجلسة، بس ما يأثر على دروسك.", "The session was not saved, but your lessons are not affected.")}</p>}
    </div>
    <div className="flex gap-2 shrink-0">
      <button onClick={() => setStep('board')} className="px-3 py-3 rounded-xl bg-white/10 text-[13px] font-black">{L("رجوع للسبورة", "Back to the board")}</button>
      <button onClick={() => { setTopic(''); setBoard(null); setStep('pick'); }} data-testid="board-new" className="flex-1 py-3 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">{L("موضوع جديد", "New topic")}</button>
    </div>
  </>);
};
export default SaraBoardTutor;
