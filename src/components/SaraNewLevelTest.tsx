import { BidiText } from './BidiText';
import React, { useEffect, useMemo, useState } from 'react';
import { X, Volume2, RotateCcw, Lock } from 'lucide-react';
import { buildNewTrackTest, NEW_TRACK_META, levelTitleAr, type NewTrackKey, type NewTestItem, type NewLevelId } from '../lib/saraNewTrackTests';
import { MarksStrip } from './LevelTestMarks';
import { saveLevelTestAttempt, gradeWeighted, LEVEL_TEST_PASS, type LevelTestAttempt } from '../lib/saraLevelTests';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';

/** Card at the end of a level-1 lesson list: locked for students until lesson 30 is passed; admin open. */
export const NewLevelTestCard: React.FC<{ track: NewTrackKey; level?: NewLevelId; open: boolean; onStart: () => void }> = ({ track, level = 'a', open, onStart }) => (
  <button data-testid="new-level-test-card" disabled={!open} onClick={() => { saraUnlockNarrator(); onStart(); }}
    className={`w-full min-w-0 flex items-center gap-2 p-2.5 rounded-xl border-2 text-start ${open ? 'bg-[#002147] border-[#C49E3A]' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
    <span className="text-xl">🏁</span>
    <span className="flex-1 min-w-0">
      <span className={`block text-[13px] font-black ${open ? 'text-amber-300' : 'text-[#002147]'}`}>اختبار نهاية {levelTitleAr(level)}</span>
      <span className={`block text-[11px] font-bold ${open ? 'text-white/80' : 'text-slate-500'}`}>{open ? `من دروس ${NEW_TRACK_META[track].titleAr} الـ ${NEW_TRACK_META[track].total} · النجاح ${LEVEL_TEST_PASS}%` : `يفتح بعد إنهاء الدرس ${({ a: 30, b: 60, c: 90, d: 120 })[level]}`}</span>
    </span>
    {!open && <Lock size={14} className="text-slate-400" />}
  </button>
);

export const SaraNewLevelTest: React.FC<{ track: NewTrackKey; level?: NewLevelId; uid?: string; onClose: () => void }> = ({ track, level = 'a', uid, onClose }) => {
  const meta = { ...NEW_TRACK_META[track], levelId: level, levelTitleAr: levelTitleAr(level) };
  const [seed, setSeed] = useState(0);
  const qs: NewTestItem[] = useMemo(() => buildNewTrackTest(track, level), [track, level, seed]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [audio, setAudio] = useState<null | 'loading' | 'failed'>(null);
  const [result, setResult] = useState<LevelTestAttempt | null>(null);
  const q = qs[i];
  const play = (t?: string) => {
    if (!t) return; saraUnlockNarrator(); setAudio('loading');
    saraNarrate(t, () => setAudio('failed'), () => setAudio('failed'), () => setAudio(null));
    setTimeout(() => setAudio(a => (a === 'loading' ? null : a)), 1500);
  };
  useEffect(() => { if (!result && q?.play) play(q.play); }, [i, seed, result]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => saraStopNarrator(), []);
  const next = () => {
    const a = [...answers, picked!]; setAnswers(a); setPicked(null); saraStopNarrator(); setAudio(null);
    if (i + 1 < qs.length) { setI(i + 1); return; }
    const wrongByLesson: Record<string, number> = {}; let correct = 0;
    qs.forEach((x, k) => { if (a[k] === x.correctIndex) correct++; else wrongByLesson[x.lessonId] = (wrongByLesson[x.lessonId] || 0) + 1; });
    const { items, score } = gradeWeighted(qs, a);
    const weakLessons = Object.entries(wrongByLesson).map(([id, wrong]) => { const x = qs.find(y => y.lessonId === id)!; return { id, order: x.lessonOrder, titleAr: x.lessonTitleAr, wrong }; })
      .sort((p, r) => r.wrong - p.wrong || p.order - r.order);
    const att: LevelTestAttempt = { trackId: meta.trackId, trackTitleAr: meta.titleAr, levelId: meta.levelId, levelTitleAr: meta.levelTitleAr, score, correct, total: qs.length, passed: score >= LEVEL_TEST_PASS, items, scoring: 'weighted', wrongByLesson, weakLessons, createdAtMs: Date.now() };
    setResult(att); void saveLevelTestAttempt(uid, att);
  };
  return (
    <div className="fixed inset-0 z-[220] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="new-level-test" className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">🏁</span>
          <p className="flex-1 text-sm font-black truncate">اختبار {meta.titleAr} — {meta.levelTitleAr}</p>
          {!result && <span className="text-[11px] text-amber-300 font-bold">{i + 1}/{qs.length}</span>}
          <button onClick={() => { saraStopNarrator(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {!result && q && <div className="flex-1 min-h-0 flex flex-col p-3 gap-2 overflow-hidden" data-testid="new-level-test-q">
          <div className="h-1.5 rounded bg-slate-200"><div className="h-full rounded bg-[#C49E3A]" style={{ width: `${(i / qs.length) * 100}%` }} /></div>
          <div className="rounded-2xl bg-white border-2 border-amber-300 p-3 text-center">
            <p className="text-[13px] font-black text-slate-700"><BidiText text={q.promptAr} /></p>
            {q.show && <p dir="auto" className="text-[19px] font-black text-[#002147] mt-1">{q.show}</p>}
            {q.play && <button onClick={() => play(q.play)} className="mt-1.5 px-3 py-1 rounded-lg bg-[#C49E3A] text-[#002147] text-[12px] font-black inline-flex items-center gap-1">
              {audio === 'failed' ? <><RotateCcw size={13} />تعذّر الصوت، إعادة المحاولة</> : audio === 'loading' ? 'سارة تجهّز الصوت…' : <><Volume2 size={13} />اسمع سارة</>}</button>}
          </div>
          <div className="grid gap-1.5">
            {q.options.map((o, oi) => (
              <button key={oi} dir="auto" onClick={() => setPicked(oi)}
                className={`py-2 px-2 rounded-xl border-2 text-[14px] font-black text-[#002147] ${picked === oi ? 'bg-amber-100 border-[#C49E3A]' : 'bg-white border-slate-200'}`}>{o}</button>
            ))}
          </div>
          <button disabled={picked === null} onClick={next} className="mt-auto py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm disabled:opacity-40">{i + 1 < qs.length ? 'التالي' : 'إنهاء الاختبار'}</button>
        </div>}
        {result && <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2 p-4 text-center overflow-hidden" data-testid="new-level-test-result">
          <p className="text-5xl">{result.passed ? '🎉' : '💪'}</p>
          <p className="text-[18px] font-black text-[#002147]">{result.score}/100 · {result.correct}/{result.total} صح</p>
          <MarksStrip items={result.items} />
          <p className="text-[13px] font-bold text-slate-600">{result.passed ? `نجحت في اختبار ${meta.levelTitleAr}! انحفظت النتيجة في تقريرك.` : `تحتاج ${LEVEL_TEST_PASS}% للنجاح. انحفظت المحاولة، راجع الدروس وحاول مرة ثانية.`}</p>
          {result.weakLessons.length > 0 && <div className="w-full rounded-xl bg-white border border-amber-200 p-2 text-start">
            <p className="text-[12px] font-black text-[#C49E3A]">دروس تحتاج مراجعة:</p>
            {result.weakLessons.slice(0, 4).map(w => <p key={w.id} className="text-[12px] font-bold text-slate-700 truncate">{w.order}. {w.titleAr}</p>)}
          </div>}
          <div className="flex gap-2 w-full mt-1">
            <button onClick={() => { setResult(null); setI(0); setAnswers([]); setSeed(s => s + 1); }} className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">اختبار جديد</button>
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm">رجوع</button>
          </div>
        </div>}
      </div>
    </div>
  );
};
export default SaraNewLevelTest;
