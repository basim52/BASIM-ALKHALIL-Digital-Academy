import { useT } from '../lib/explainLang';
import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Volume2, Square, Lock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { readTutorUnlocked, saveTutorUnlocked } from '../lib/tutorProgress';
import { TtsDebugOverlay, longPressDebug } from './TtsDebugOverlay';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator, saraLastReason } from './SaraTrackPlayer';
import { toToolCalls } from '../lib/boardActions';
import { personaById } from '../data/saraBoardPersonas';
import TutorConversation from './TutorConversation';
import KidsCardBoard from './KidsCardBoard';
import ExplainLangToggle from './ExplainLangToggle';
import { useExplainLang, useLessonView, englishLessonAsync } from '../lib/explainLang';
import type { TutorTrack, TutorLesson } from '../data/tutorTracks';
import type { SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { useBoardNextTransition, boardDrawMs, ExercisesDoneCue, LessonSteps } from './BoardNextTransition';
import { extractLessonItems } from '../lib/repeatPractice';
import type { RepeatTeacher } from './SaraRepeatPractice';
const TutorTldrawBoard = lazy(() => import('./TutorTldrawBoard'));
const SaraRepeatPractice = lazy(() => import('./SaraRepeatPractice'));

const saveUnlocked = saveTutorUnlocked;
export { readTutorUnlocked };

type Step = { k: 'board' } | { k: 'explain' } | { k: 'check' } | { k: 'ex'; i: number } | { k: 'done' };

const useVoice = (voice: string) => {
  const [st, setSt] = useState<'idle' | 'loading' | 'failed' | 'blocked'>('idle');
  useEffect(() => () => saraStopNarrator(), []);
  return {
    st,
    /** the teacher's own cloud voice; cb.done = natural end, cb.fail = failed/blocked */
    play: (text: string, cb?: { done?: () => void; fail?: () => void }) => { saraUnlockNarrator(); setSt('loading'); void saraNarrate(text, () => { setSt('blocked'); cb?.fail?.(); }, () => { setSt('failed'); cb?.fail?.(); }, () => { setSt('idle'); cb?.done?.(); }, voice); },
    stop: () => { saraStopNarrator(); setSt('idle'); },
  };
};

const Choices: React.FC<{ q: SaraChoiceQuestion; picked: number | null; onPick: (i: number) => void; big?: boolean }> = ({ q, picked, onPick, big }) => (
  <div className="grid gap-1.5 shrink-0">
    {q.options.map((o, i) => {
      const st = picked === null ? 'bg-white text-[#001a38] border-amber-300' : i === q.correctIndex ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-600 border-slate-200';
      return <button key={i} dir="ltr" data-testid="tutor-option" disabled={picked !== null} onClick={() => onPick(i)} className={`px-3 py-2.5 rounded-xl border text-[14px] font-bold text-start ${big ? 'border-2 text-[16px] font-black' : ''} ${big && !/[a-z\u0600-\u06FF]/i.test(o) ? 'text-center text-[30px] py-1.5' : ''} ${st}`}>{o}</button>;
    })}
  </div>
);

export const TutorTrackPlayer: React.FC<{ track: TutorTrack; uid?: string; onBack: () => void; mockLessonOrder?: number; mockStep?: Step }> = ({ track, uid, onBack, mockLessonOrder, mockStep }) => {
  const persona = personaById(track.personaId);
  const t = useT(); const NM = t(persona.nameAr, persona.nameEn);
  const [unlocked, setUnlocked] = useState(() => readTutorUnlocked(track.id, uid));
  const [lessonRaw, setLesson] = useState<TutorLesson | null>(mockLessonOrder ? track.lessons[mockLessonOrder - 1] : null);
  const [lang] = useExplainLang();
  const { view: lesson, loading: enLoading } = useLessonView(lessonRaw, lang);
  const [step, setStep] = useState<Step>(mockStep || { k: 'board' });
  const [picked, setPicked] = useState<number | null>(null);
  const [checkWrong, setCheckWrong] = useState(false);
  const [correct, setCorrect] = useState(0);
  const v = useVoice(persona.voice);
  const [replay, setReplay] = useState(0);
  const [talk, setTalk] = useState(false);
  const calls = useMemo(() => (lesson?.board ? toToolCalls(lesson.board) : []), [lesson]);
  const kidsBoard = !!(persona.kids && lesson?.kids);
  const boardNarration = lesson?.content ? (kidsBoard ? `${lesson.content.explanationAr} ${lesson.kids!.say}` : `${lesson.content.explanationAr} ${lesson.content.example.map(e => e.en).join('. ')}`) : '';
  // Board end → check question: this teacher's own cloud voice says the cue line, gold card + 3s countdown (first run only).
  const trans = useBoardNextTransition({
    active: !!lesson?.content && step.k === 'board' && !talk,
    drawMs: kidsBoard ? 1500 : boardDrawMs(calls.length),
    say: (text, onEnd) => v.play(text, { done: onEnd, fail: onEnd }),
    stopSay: () => v.stop(),
    onAdvance: () => { v.stop(); setPicked(null); setCheckWrong(false); setStep({ k: 'check' }); },
    onReplay: () => { setReplay(r => r + 1); playBoard(boardNarration, true); },
    focusSel: '[data-testid=tutor-q]',
  });
  const playBoard = (text: string, replayed = false) => { trans.narrationStarted(replayed); v.play(text, { done: trans.narrationDone, fail: trans.narrationFailed }); };
  // «ردّد مع المعلم» after the exercises: same practice screen, this teacher's face + own cloud voice.
  const teacher: RepeatTeacher = useMemo(() => ({ id: persona.id, nameAr: persona.nameAr, face: persona.id, male: persona.gender === 'male',
    narrate: (text, b, f, e) => { void saraNarrate(text, b, f, e, persona.voice); }, stop: saraStopNarrator, unlock: saraUnlockNarrator }), [persona]);
  const repeatItems = useMemo(() => (lessonRaw ? extractLessonItems(lessonRaw) : []), [lessonRaw]);
  const [repeatOpen, setRepeatOpen] = useState(false);

  const shell = (head: React.ReactNode, body: React.ReactNode) => (
    <div data-testid="tutor-track" className="flex-1 min-h-0 p-3 flex flex-col gap-2 bg-[#001a38] text-white overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => { v.stop(); if (lesson) setLesson(null); else onBack(); }} aria-label={t("رجوع", "Back")} className="p-1.5 rounded-lg bg-white/10"><ArrowRight size={16} /></button>
        <div className="min-w-0 flex-1">{head}</div>
        <ExplainLangToggle />
        {lesson?.content && <button onClick={() => { v.stop(); setTalk(true); }} data-testid={`tutor-lesson-talk-${persona.id}`} className="shrink-0 px-2.5 py-1.5 rounded-xl bg-[#0a2d5c] border border-[#C49E3A] text-amber-300 text-[11px] font-black">💬 {t("محاورة", "Talk with")} {NM}</button>}
      </div>
      {lesson?.content && <LessonSteps at={step.k === 'done' ? 2 : step.k === 'check' || step.k === 'ex' ? 1 : 0} repeat={repeatItems.length > 0} />}
      {body}
      <TtsDebugOverlay />
    </div>
  );
  const VoiceBtn: React.FC<{ text: string; onPlay?: () => void }> = ({ text, onPlay }) => (
    <div className="flex items-center gap-2 shrink-0">
      {v.st === 'loading'
        ? <button onClick={v.stop} className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Square size={13} className="inline" /> {t("إيقاف", "Stop")}</button>
        : <button onClick={() => (onPlay ? onPlay() : v.play(text))} data-testid="tutor-voice" className="px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Volume2 size={13} className="inline" /> {v.st === 'failed' ? t('إعادة المحاولة', 'Try again') : t(`استمع لـ${persona.nameAr}`, `Listen to ${persona.nameEn}`)}</button>}
      {v.st === 'failed' && <span className="text-[10px] text-rose-300 font-bold">{t("الصوت غير متاح الآن", "Audio is not available right now")} <span data-no-i18n className="opacity-60">({saraLastReason()})</span></span>}
      {v.st === 'blocked' && <button onClick={() => (onPlay ? onPlay() : v.play(text))} className="px-3 py-1.5 rounded-xl bg-[#C49E3A] text-[#001a38] text-[12px] font-black animate-pulse">{t("اضغط للاستماع 🔊", "Tap to listen 🔊")}</button>}
    </div>
  );
  const nextBtn = (label: string, onClick: () => void, disabled = false) => (
    <button disabled={disabled} onClick={() => { v.stop(); onClick(); }} data-testid="tutor-next" className="shrink-0 w-full py-3 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black disabled:opacity-40">{label}</button>
  );

  // Lesson list
  if (!lesson) {
    return shell(
      <><p {...longPressDebug()} className="text-[10px] text-amber-300 font-bold select-none">{persona.emoji} {NM}</p><p className="text-[13px] font-black truncate">{t(track.titleAr, (track as { titleEn?: string }).titleEn || track.titleAr)}</p></>,
      <div className="flex-1 min-h-0 overflow-y-auto grid gap-1.5 content-start" data-testid="tutor-lessons">
        {track.lessons.map((l, idx) => {
          const open = l.order <= unlocked;
          const lvl = track.levels?.find(v => v.id === l.levelId);
          const showLevel = !!lvl && (track.levels?.length || 0) > 1 && (idx === 0 || track.lessons[idx - 1].levelId !== l.levelId);
          return (
            <React.Fragment key={l.id}>
            {showLevel && <p className="mt-2 first:mt-0 px-1 text-[12px] font-black text-amber-300" data-testid="tutor-level-head">{t(lvl!.titleAr, (lvl as { titleEn?: string }).titleEn || lvl!.titleAr)}</p>}
            <button disabled={!open} onClick={() => { setLesson(l); setStep({ k: 'board' }); trans.reset(); const cc = l.content!; const lk = persona.kids ? (l as TutorLesson).kids : undefined; if (lang === 'en') { v.stop(); trans.narrationStarted(); void englishLessonAsync(l).then(x => { const e2 = x.content!; playBoard(lk ? `${e2.explanationAr} ${lk.say}` : `${e2.explanationAr} ${e2.example.map(e => e.en).join('. ')}`); }); } else playBoard(lk ? `${cc.explanationAr} ${lk.say}` : `${cc.explanationAr} ${cc.example.map(e => e.en).join('. ')}`); setPicked(null); setCheckWrong(false); setCorrect(0); }}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-start border ${open ? 'bg-[#0a2d5c] border-amber-400/40' : 'bg-white/5 border-white/10 opacity-60'}`}>
              <span className="w-7 h-7 shrink-0 rounded-full bg-amber-400 text-[#001a38] text-[12px] font-black flex items-center justify-center">{l.order}</span>
              <span className="flex-1 min-w-0">{lang === 'en' ? <span dir="ltr" className="block text-[13px] font-black truncate text-start">{l.titleEn}</span> : <><span className="block text-[13px] font-black truncate">{l.titleAr}</span><span dir="ltr" className="block text-[11px] text-white/60 font-bold truncate text-start">{l.titleEn}</span></>}</span>
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
  const head = <><p {...longPressDebug()} className="text-[10px] text-amber-300 font-bold select-none">{NM} — {t('الدرس', 'Lesson')} {lesson.order}</p><p className="text-[13px] font-black truncate">{t(lesson.titleAr, lesson.titleEn)}{enLoading ? ' · …EN' : ''}</p></>;
  const kids = persona.kids && lesson.kids ? lesson.kids : null; // «من الصفر» teachers: picture-card board instead of tldraw
  const narration = kids ? `${c.explanationAr} ${kids.say}` : `${c.explanationAr} ${c.example.map(e => e.en).join('. ')}`;

  if (step.k === 'board') return shell(head, <>
    <div onClickCapture={e => { if ((e.target as HTMLElement).closest('[data-testid=tutor-voice]')) setReplay(r => r + 1); }}><VoiceBtn text={narration} onPlay={() => playBoard(narration)} /></div>
    <div className="flex-1 min-h-0">
      {kids ? <KidsCardBoard persona={persona} listTitle={kids.listTitle} cards={kids.cards} speaking={v.st === 'loading'} onSpeak={() => playBoard(narration)} /> :
      <Suspense fallback={<div className="w-full h-full rounded-2xl border-2 border-amber-400/60 bg-[#0a2d5c] flex items-center justify-center text-[12px] font-bold text-amber-200">{t("جاري فتح السبورة…", "Opening the board…")}</div>}>
        <TutorTldrawBoard calls={calls} personaId={persona.id} lessonTitle={`${lesson.titleEn} (${lesson.titleAr})`} speaking={v.st === 'loading'} replayKey={replay} onSpeak={() => { setReplay(r => r + 1); playBoard(narration, true); }} />
      </Suspense>}
    </div>
    {trans.banner}
    {!trans.banner && nextBtn(t('التمارين', 'Exercises'), () => { v.stop(); setPicked(null); setCheckWrong(false); setStep({ k: 'check' }); })}
  </>);

  if (step.k === 'explain') return shell(head, <>
    <VoiceBtn text={narration} />
    <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
      <p className="text-[14px] leading-7 font-bold" data-testid="tutor-explain">{c.explanationAr}</p>
      {c.example.map((e, i) => persona.kids ? (
        <div key={i} data-testid="kids-example" className="rounded-2xl bg-white px-3 py-2 flex items-center gap-2.5" style={{ border: `3px solid ${persona.kids.accent}` }}>
          {kids?.cards[i] && <span className="text-[28px] leading-none shrink-0" aria-hidden>{kids.cards[i].emoji}</span>}
          <span className="min-w-0 flex-1"><p dir="ltr" className="text-[16px] font-black text-start" style={{ color: persona.kids.ink }}>{e.en}</p>{t(e.ar, '') && <p className="text-[12px] text-slate-500 font-bold">{e.ar}</p>}</span>
        </div>
      ) : (
        <div key={i} className="rounded-xl bg-[#0a2d5c] border border-amber-400/30 px-3 py-2">
          <p dir="ltr" className="text-[14px] font-black text-start">{e.en}</p><p className="text-[12px] text-white/70 font-bold">{e.ar}</p>
        </div>
      ))}
    </div>
    {nextBtn(t('سؤال سريع', 'Quick question'), () => { setPicked(null); setCheckWrong(false); setStep({ k: 'check' }); })}
  </>);

  if (step.k === 'check' || step.k === 'ex') {
    const q = step.k === 'check' ? c.check : c.exercises[step.i];
    const n = step.k === 'check' ? 1 : step.i + 2;
    const isLast = step.k === 'ex' && step.i === c.exercises.length - 1;
    return shell(head, <>
      <div className="flex items-center gap-2 shrink-0">
        <p data-testid="tutor-q" tabIndex={-1} className="flex-1 text-[11px] font-black text-amber-300 outline-none">{t('سؤال', 'Question')} {n} {t('من', 'of')} {total}</p>
        {step.k === 'check' && picked === null && <button onClick={() => { v.stop(); setStep({ k: 'explain' }); }} data-testid="tutor-read-explain" className="px-2 py-0.5 rounded-lg bg-white/10 text-[11px] font-black text-amber-200">{t('📖 اقرأ الشرح', '📖 Read the explanation')}</button>}
      </div>
      {persona.kids ? (
        <div className="rounded-2xl bg-white p-3 shrink-0" style={{ border: `4px solid ${persona.kids.accent}`, background: persona.kids.soft }} data-testid="kids-question">
          <p className="text-[14px] font-black" style={{ color: persona.kids.ink }}>{q.promptAr}</p>
          {q.promptEn && <p dir="ltr" className="text-[18px] font-black text-start mt-1" style={{ color: persona.kids.ink }}>{q.promptEn.split('___').map((p, i, a) => <React.Fragment key={i}>{p}{i < a.length - 1 && <span className="inline-block w-12 mx-1 border-b-[3px] align-baseline" style={{ borderColor: persona.kids!.accent, background: '#fff' }}>&nbsp;</span>}</React.Fragment>)}</p>}
        </div>
      ) : (
      <div className="rounded-xl bg-[#0a2d5c] border border-amber-400/40 p-3 shrink-0">
        <p className="text-[14px] font-black">{q.promptAr}</p>
        {q.promptEn && <p dir="ltr" className="text-[15px] font-black text-amber-200 text-start mt-1">{q.promptEn}</p>}
      </div>)}
      <Choices big={!!persona.kids} q={q} picked={picked} onPick={i => { setPicked(i); if (i === q.correctIndex) setCorrect(x => x + 1); else if (step.k === 'check') setCheckWrong(true); }} />
      {picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === q.correctIndex ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === q.correctIndex ? <><CheckCircle2 size={15} className="inline" /> {t('صح!', 'Correct!')}</> : <><XCircle size={15} className="inline" /> {t('الجواب:', 'Answer:')} <span dir="ltr">{q.options[q.correctIndex]}</span></>}</p>}
      {step.k === 'check' && checkWrong && <p className="text-[12px] leading-6 font-bold text-white/85 rounded-xl bg-white/5 p-2 overflow-hidden" data-testid="tutor-alt">{c.altExplanationAr}</p>}
      <div className="flex-1" />
      {nextBtn(isLast ? t('النتيجة', 'Result') : t('التالي', 'Next'), () => {
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
      <p className="text-[18px] font-black text-amber-300" data-testid="tutor-result">{t(`جاوبت ${correct} من ${total} صح`, `You got ${correct} of ${total} right`)}</p>
      <p className="text-[12px] font-bold text-white/80">{correct === total ? t('ممتاز!', 'Excellent!') : t('تقدر تعيد الدرس متى ما بغيت.', 'You can redo the lesson any time.')}</p>
    </div>
    <div className="shrink-0">
      <ExercisesDoneCue say={(text, end) => v.play(text, { done: end })} onRepeat={repeatItems.length > 0 ? () => { v.stop(); setRepeatOpen(true); } : undefined}
        onNext={nextLesson ? () => { v.stop(); setLesson(nextLesson); setStep({ k: 'board' }); setCorrect(0); } : () => { v.stop(); setLesson(null); }}
        nextLabel={nextLesson ? t("الدرس التالي", "Next lesson") : t("قائمة الدروس", "Lesson list")} nextTestId={nextLesson ? 'tutor-next-lesson' : 'tutor-lesson-list'} />
    </div>
    <div className="flex gap-2 shrink-0">
      <button onClick={() => { v.stop(); setStep({ k: 'board' }); setCorrect(0); }} className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 text-[13px] font-black">{t("أعد الدرس", "Redo lesson")}</button>
    </div>
    {repeatOpen && lessonRaw && repeatItems.length > 0 && (
      <Suspense fallback={null}>
        <SaraRepeatPractice autoStart uid={uid} teacher={teacher} backLabel="رجوع للدرس" onClose={() => setRepeatOpen(false)}
          lesson={{ trackId: track.id, lessonId: lessonRaw.id, titleAr: lessonRaw.titleAr, titleEn: lessonRaw.titleEn, items: repeatItems }} />
      </Suspense>
    )}
  </>);
};
export default TutorTrackPlayer;
