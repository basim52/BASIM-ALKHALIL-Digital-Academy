import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Volume2, Square, Lock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { toToolCalls } from '../lib/boardActions';
import { personaById } from '../data/saraBoardPersonas';
import TutorConversation from './TutorConversation';
import type { TutorTrack, TutorLesson } from '../data/tutorTracks';
import type { SaraChoiceQuestion } from '../data/saraTracks/foundations';
const TutorTldrawBoard = lazy(() => import('./TutorTldrawBoard'));

/** Tutor progress lives under its OWN key (localStorage + users/{uid}.tutorTrackProgress.{trackId}); Sara's progress is never read or written. */
const key = (trackId: string, uid?: string) => `tutor_track_${trackId}_${uid || 'guest'}`;
export const readTutorUnlocked = (trackId: string, uid?: string) => { try { return Math.max(1, Number(localStorage.getItem(key(trackId, uid))) || 1); } catch { return 1; } };
const saveUnlocked = (trackId: string, uid: string | undefined, n: number) => {
  try { localStorage.setItem(key(trackId, uid), String(n)); } catch { /* ignore */ }
  if (uid) void updateDoc(doc(db, 'users', uid), { [`tutorTrackProgress.${trackId}`]: n }).catch(() => {});
};

type Step = { k: 'board' } | { k: 'explain' } | { k: 'check' } | { k: 'ex'; i: number } | { k: 'done' };

const useVoice = (voice: string) => {
  const [st, setSt] = useState<'idle' | 'loading' | 'failed' | 'blocked'>('idle');
  useEffect(() => () => saraStopNarrator(), []);
  return {
    st,
    play: (text: string) => { saraUnlockNarrator(); setSt('loading'); void saraNarrate(text, () => setSt('blocked'), () => setSt('failed'), () => setSt('idle'), voice); },
    stop: () => { saraStopNarrator(); setSt('idle'); },
  };
};

const Choices: React.FC<{ q: SaraChoiceQuestion; picked: number | null; onPick: (i: number) => void }> = ({ q, picked, onPick }) => (
  <div className="grid gap-1.5 shrink-0">
    {q.options.map((o, i) => {
      const st = picked === null ? 'bg-white text-[#001a38] border-amber-300' : i === q.correctIndex ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-600 border-slate-200';
      return <button key={i} dir="ltr" data-testid="tutor-option" disabled={picked !== null} onClick={() => onPick(i)} className={`px-3 py-2.5 rounded-xl border text-[14px] font-bold text-start ${st}`}>{o}</button>;
    })}
  </div>
);

export const TutorTrackPlayer: React.FC<{ track: TutorTrack; uid?: string; onBack: () => void; mockLessonOrder?: number; mockStep?: Step }> = ({ track, uid, onBack, mockLessonOrder, mockStep }) => {
  const persona = personaById(track.personaId);
  const [unlocked, setUnlocked] = useState(() => readTutorUnlocked(track.id, uid));
  const [lesson, setLesson] = useState<TutorLesson | null>(mockLessonOrder ? track.lessons[mockLessonOrder - 1] : null);
  const [step, setStep] = useState<Step>(mockStep || { k: 'board' });
  const [picked, setPicked] = useState<number | null>(null);
  const [checkWrong, setCheckWrong] = useState(false);
  const [correct, setCorrect] = useState(0);
  const v = useVoice(persona.voice);
  const [replay, setReplay] = useState(0);
  const [talk, setTalk] = useState(false);
  const calls = useMemo(() => (lesson?.board ? toToolCalls(lesson.board) : []), [lesson]);

  const shell = (head: React.ReactNode, body: React.ReactNode) => (
    <div data-testid="tutor-track" className="flex-1 min-h-0 p-3 flex flex-col gap-2 bg-[#001a38] text-white overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => { v.stop(); if (lesson) setLesson(null); else onBack(); }} aria-label="رجوع" className="p-1.5 rounded-lg bg-white/10"><ArrowRight size={16} /></button>
        <div className="min-w-0 flex-1">{head}</div>
        {lesson?.content && <button onClick={() => { v.stop(); setTalk(true); }} data-testid={`tutor-lesson-talk-${persona.id}`} className="shrink-0 px-2.5 py-1.5 rounded-xl bg-[#0a2d5c] border border-[#C49E3A] text-amber-300 text-[11px] font-black">💬 محاورة {persona.nameAr}</button>}
      </div>
      {body}
    </div>
  );
  const VoiceBtn: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-2 shrink-0">
      {v.st === 'loading'
        ? <button onClick={v.stop} className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Square size={13} className="inline" /> إيقاف</button>
        : <button onClick={() => v.play(text)} data-testid="tutor-voice" className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Volume2 size={13} className="inline" /> {v.st === 'failed' ? 'إعادة المحاولة' : `استمع لـ${persona.nameAr}`}</button>}
      {v.st === 'failed' && <span className="text-[10px] text-rose-300 font-bold">الصوت غير متاح الآن</span>}
      {v.st === 'blocked' && <span className="text-[10px] text-white/70 font-bold">اضغط مرة ثانية</span>}
    </div>
  );
  const nextBtn = (label: string, onClick: () => void, disabled = false) => (
    <button disabled={disabled} onClick={() => { v.stop(); onClick(); }} data-testid="tutor-next" className="shrink-0 w-full py-3 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black disabled:opacity-40">{label}</button>
  );

  // Lesson list
  if (!lesson) {
    return shell(
      <><p className="text-[10px] text-amber-300 font-bold">{persona.emoji} {persona.nameAr}</p><p className="text-[13px] font-black truncate">{track.titleAr}</p></>,
      <div className="flex-1 min-h-0 overflow-y-auto grid gap-1.5 content-start" data-testid="tutor-lessons">
        {track.lessons.map((l, idx) => {
          const open = l.order <= unlocked;
          const lvl = track.levels?.find(v => v.id === l.levelId);
          const showLevel = !!lvl && (track.levels?.length || 0) > 1 && (idx === 0 || track.lessons[idx - 1].levelId !== l.levelId);
          return (
            <React.Fragment key={l.id}>
            {showLevel && <p className="mt-2 first:mt-0 px-1 text-[12px] font-black text-amber-300" data-testid="tutor-level-head">{lvl!.titleAr}</p>}
            <button disabled={!open} onClick={() => { setLesson(l); setStep({ k: 'board' }); const cc = l.content!; v.play(`${cc.explanationAr} ${cc.example.map(e => e.en).join('. ')}`); setPicked(null); setCheckWrong(false); setCorrect(0); }}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-start border ${open ? 'bg-[#0a2d5c] border-amber-400/40' : 'bg-white/5 border-white/10 opacity-60'}`}>
              <span className="w-7 h-7 shrink-0 rounded-full bg-amber-400 text-[#001a38] text-[12px] font-black flex items-center justify-center">{l.order}</span>
              <span className="flex-1 min-w-0"><span className="block text-[13px] font-black truncate">{l.titleAr}</span><span dir="ltr" className="block text-[11px] text-white/60 font-bold truncate text-start">{l.titleEn}</span></span>
              {!open && <Lock size={14} className="text-white/50 shrink-0" />}
              {l.order < unlocked && <CheckCircle2 size={14} className="text-emerald-300 shrink-0" />}
            </button>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  const c = lesson.content!;
  if (talk) return <TutorConversation persona={persona} onBack={() => setTalk(false)} lesson={{ titleEn: lesson.titleEn, titleAr: lesson.titleAr, examples: c.example.map(e => e.en) }} />;
  const total = 1 + c.exercises.length;
  const head = <><p className="text-[10px] text-amber-300 font-bold">{persona.nameAr} — الدرس {lesson.order}</p><p className="text-[13px] font-black truncate">{lesson.titleAr}</p></>;
  const narration = `${c.explanationAr} ${c.example.map(e => e.en).join('. ')}`;

  if (step.k === 'board') return shell(head, <>
    <div onClickCapture={e => { if ((e.target as HTMLElement).closest('[data-testid=tutor-voice]')) setReplay(r => r + 1); }}><VoiceBtn text={narration} /></div>
    <div className="flex-1 min-h-0">
      <Suspense fallback={<div className="w-full h-full rounded-2xl border-2 border-amber-400/60 bg-[#0a2d5c] flex items-center justify-center text-[12px] font-bold text-amber-200">جاري فتح السبورة…</div>}>
        <TutorTldrawBoard calls={calls} personaId={persona.id} lessonTitle={`${lesson.titleEn} (${lesson.titleAr})`} speaking={v.st === 'loading'} replayKey={replay} onSpeak={() => { setReplay(r => r + 1); v.play(narration); }} />
      </Suspense>
    </div>
    {nextBtn('الشرح', () => setStep({ k: 'explain' }))}
  </>);

  if (step.k === 'explain') return shell(head, <>
    <VoiceBtn text={narration} />
    <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
      <p className="text-[14px] leading-7 font-bold" data-testid="tutor-explain">{c.explanationAr}</p>
      {c.example.map((e, i) => (
        <div key={i} className="rounded-xl bg-[#0a2d5c] border border-amber-400/30 px-3 py-2">
          <p dir="ltr" className="text-[14px] font-black text-start">{e.en}</p><p className="text-[12px] text-white/70 font-bold">{e.ar}</p>
        </div>
      ))}
    </div>
    {nextBtn('سؤال سريع', () => { setPicked(null); setCheckWrong(false); setStep({ k: 'check' }); })}
  </>);

  if (step.k === 'check' || step.k === 'ex') {
    const q = step.k === 'check' ? c.check : c.exercises[step.i];
    const n = step.k === 'check' ? 1 : step.i + 2;
    const isLast = step.k === 'ex' && step.i === c.exercises.length - 1;
    return shell(head, <>
      <p className="text-[11px] font-black text-amber-300 shrink-0">سؤال {n} من {total}</p>
      <div className="rounded-xl bg-[#0a2d5c] border border-amber-400/40 p-3 shrink-0">
        <p className="text-[14px] font-black">{q.promptAr}</p>
        {q.promptEn && <p dir="ltr" className="text-[15px] font-black text-amber-200 text-start mt-1">{q.promptEn}</p>}
      </div>
      <Choices q={q} picked={picked} onPick={i => { setPicked(i); if (i === q.correctIndex) setCorrect(x => x + 1); else if (step.k === 'check') setCheckWrong(true); }} />
      {picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === q.correctIndex ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === q.correctIndex ? <><CheckCircle2 size={15} className="inline" /> صح!</> : <><XCircle size={15} className="inline" /> الجواب: <span dir="ltr">{q.options[q.correctIndex]}</span></>}</p>}
      {step.k === 'check' && checkWrong && <p className="text-[12px] leading-6 font-bold text-white/85 rounded-xl bg-white/5 p-2 overflow-hidden" data-testid="tutor-alt">{c.altExplanationAr}</p>}
      <div className="flex-1" />
      {nextBtn(isLast ? 'النتيجة' : 'التالي', () => {
        setPicked(null);
        if (step.k === 'check') setStep({ k: 'ex', i: 0 });
        else if (!isLast) setStep({ k: 'ex', i: step.i + 1 });
        else {
          setStep({ k: 'done' });
          if (!mockStep && lesson.order >= unlocked && lesson.order < track.lessons.length + 1) { const nu = lesson.order + 1; setUnlocked(nu); saveUnlocked(track.id, uid, nu); }
        }
      }, picked === null)}
    </>);
  }

  const nextLesson = track.lessons[lesson.order];
  return shell(head, <>
    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
      <span className="text-[44px]">{persona.emoji}</span>
      <p className="text-[18px] font-black text-amber-300" data-testid="tutor-result">جاوبت {correct} من {total} صح</p>
      <p className="text-[12px] font-bold text-white/80">{correct === total ? 'ممتاز!' : 'تقدر تعيد الدرس متى ما بغيت.'}</p>
    </div>
    <div className="flex gap-2 shrink-0">
      <button onClick={() => { setStep({ k: 'board' }); setCorrect(0); }} className="px-3 py-3 rounded-xl bg-white/10 text-[13px] font-black">أعد الدرس</button>
      {nextLesson
        ? <button onClick={() => { setLesson(nextLesson); setStep({ k: 'board' }); setCorrect(0); }} data-testid="tutor-next-lesson" className="flex-1 py-3 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">الدرس التالي</button>
        : <button onClick={() => setLesson(null)} className="flex-1 py-3 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">قائمة الدروس</button>}
    </div>
  </>);
};
export default TutorTrackPlayer;
