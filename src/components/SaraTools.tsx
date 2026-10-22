import { getExplainLang } from '../lib/explainLang';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Volume2, Square, Mic, Printer, CheckCircle2 } from 'lucide-react';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { readUnlocked, saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { savePlacementLevel } from '../lib/placement';
import { buildRoadmap, LESSON_MIN, type Roadmap, readBasket, writeBasketLocal, basketAdd, basketRemove, smartBasket, buildBasketPlan, cleanBasket, type BasketData } from '../lib/saraPlan';
import { buildSaraPlan, loadPlanState, taskDone, readSavedPlan, savePlan, weekStartIso, WEEK_ORDER, DEFAULT_STUDY_DAYS, type SaraPlan, type PlanState, type PlanTask, type PlanKind } from '../lib/saraPlan';
import { trackLevels, saveLevelTestAttempt, summarizeLevelTests, type LevelTestAttempt } from '../lib/saraLevelTests';
import SaraBoardTutor from './SaraBoardTutor';
import { getDailyTopic, readFreeTopicDay, type FreeTopicDay } from '../lib/saraDailyTopic';

export type SaraToolId = 'placement' | 'speed' | 'worksheet' | 'plan' | 'roleplay' | 'pronunciation' | 'voicecoach' | 'grammar' | 'board';
export const SARA_TRACKS: SaraTrack[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK];
export interface PlacementOutcome { level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; bandId: string; trackId: string; score: number }
interface Props { tool: SaraToolId | null; onClose: () => void; uid?: string; unlockAll?: boolean; onPlacementDone?: (r: PlacementOutcome) => void; onOpenTrack?: (trackId: string) => void }

const TITLES: Record<SaraToolId, string> = {
  placement: '🎯 اختبار تحديد المستوى', speed: '⚡ تحدي السرعة', worksheet: '📝 ورقة عمل', plan: '🗓️ خطة الدراسة الأسبوعية',
  roleplay: '🎭 مغامرات لعب الأدوار', pronunciation: '🔊 مختبر النطق', voicecoach: '🎙️ مدرب الصوت', grammar: '✍️ تدقيق نحوي', board: '🧑‍🏫 فصل المعلمين',
};

const shuffle = <T,>(a: T[]): T[] => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const shuffleQ = (q: SaraChoiceQuestion): SaraChoiceQuestion => { const o = shuffle(q.options.map((_, i) => i)); return { ...q, options: o.map(i => q.options[i]), correctIndex: o.indexOf(q.correctIndex) }; };
const lsGet = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : d; } catch { return d; } };
const lsSet = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };
/** Lessons the student has reached (same unlock rule as the player; admins/parents see all). */
const reached = (t: SaraTrack, uid?: string, unlockAll?: boolean) => t.lessons.filter(l => l.content && (unlockAll || l.order <= readUnlocked(t.id, uid)));
/** Never voice IPA / phonetic symbols. */
const speakable = (s: string) => s.replace(/\/[^/]*\//g, ' ').replace(/\[[^\]]*\]/g, ' ').replace(/[ˈˌːəɪʊʌæɑɔθðʃʒŋ]/g, '').replace(/\s+/g, ' ').trim();
const norm = (s: string) => s.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean);
const getSR = (): any => (typeof window !== 'undefined' ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null);

const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'navy' | 'amber' | 'ghost' }> = ({ tone = 'navy', className = '', ...p }) => (
  <button {...p} className={`px-3 py-2 rounded-xl text-[13px] font-black disabled:opacity-40 ${tone === 'navy' ? 'bg-[#002147] text-white' : tone === 'amber' ? 'bg-amber-400 text-slate-950' : 'bg-white border border-amber-300 text-slate-800'} ${className}`} />
);
const Choices: React.FC<{ q: SaraChoiceQuestion; picked: number | null; onPick: (i: number) => void }> = ({ q, picked, onPick }) => (
  <div className="grid gap-1.5">
    {q.options.map((o, i) => {
      const st = picked === null ? 'bg-white border-amber-300' : i === q.correctIndex ? 'bg-emerald-100 border-emerald-500' : i === picked ? 'bg-rose-100 border-rose-500' : 'bg-white border-slate-200 opacity-60';
      return <button key={i} data-testid="tool-option" disabled={picked !== null} onClick={() => onPick(i)} className={`px-3 py-2 rounded-xl border text-[13px] font-bold text-start ${st}`}>{o}</button>;
    })}
  </div>
);
const QHead: React.FC<{ q: SaraChoiceQuestion }> = ({ q }) => (
  <div className="rounded-xl bg-white border border-amber-200 p-2.5">
    <p className="text-[13px] font-black text-slate-800">{q.promptAr}</p>
    {q.promptEn && <p dir="ltr" className="text-[13px] font-bold text-[#002147] text-start mt-1">{q.promptEn}</p>}
  </div>
);

/** Sara voice for a whole set in ONE cached GET (same /api/tts/lesson path as the lessons). */
const useSaraSet = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'failed' | 'blocked'>('idle');
  useEffect(() => () => saraStopNarrator(), []);
  const play = (text: string) => { saraUnlockNarrator(); setState('loading'); void saraNarrate(speakable(text), () => setState('blocked'), () => setState('failed'), () => setState('idle')); };
  const stop = () => { saraStopNarrator(); setState('idle'); };
  return { state, play, stop };
};
const SaraSetButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'استمع لسارة' }) => {
  const s = useSaraSet();
  return (
    <div className="flex items-center gap-2">
      {s.state === 'loading'
        ? <Btn tone="amber" onClick={s.stop} data-testid="tool-sara-stop"><Square size={14} className="inline" /> إيقاف</Btn>
        : <Btn tone="amber" onClick={() => s.play(text)} data-testid="tool-sara-play"><Volume2 size={14} className="inline" /> {s.state === 'failed' ? '🔄 إعادة المحاولة' : label}</Btn>}
      {s.state === 'failed' && <span className="text-[11px] text-rose-700 font-bold">صوت سارة غير متاح الآن، حاول بعد قليل</span>}
      {s.state === 'blocked' && <span className="text-[11px] text-slate-600 font-bold">اضغط مرة أخرى للتشغيل</span>}
    </div>
  );
};
/** Browser speech recognition (optional). Returns null when unsupported → graceful fallback. */
const useMic = () => {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [err, setErr] = useState('');
  const recRef = useRef<any>(null);
  const supported = !!getSR();
  useEffect(() => () => { try { recRef.current?.abort(); } catch { /* ignore */ } }, []);
  const listen = () => {
    const SR = getSR(); if (!SR) { setErr('الميكروفون غير مدعوم في هذا المتصفح'); return; }
    try {
      const r = new SR(); recRef.current = r; r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 1;
      r.onresult = (e: any) => setHeard(String(e.results?.[0]?.[0]?.transcript || ''));
      r.onerror = (e: any) => setErr(e?.error === 'not-allowed' ? 'اسمح باستخدام الميكروفون' : 'لم أسمع جيداً، حاول مرة أخرى');
      r.onend = () => setListening(false);
      setHeard(''); setErr(''); setListening(true); r.start();
    } catch { setListening(false); setErr('تعذر تشغيل الميكروفون'); }
  };
  return { supported, listening, heard, err, listen, reset: () => { setHeard(''); setErr(''); } };
};
const matchScore = (target: string, said: string) => {
  const t = norm(target); const s = new Set(norm(said));
  if (!t.length) return { pct: 0, missed: [] as string[] };
  const missed = t.filter(w => !s.has(w));
  return { pct: Math.round(((t.length - missed.length) / t.length) * 100), missed };
};

/* ---------------- 🎯 Placement ---------------- */
const BANDS: { id: string; titleAr: string; track: SaraTrack; levelId: string }[] = [
  { id: 'foundations', titleAr: 'الأساسيات', track: FOUNDATIONS_TRACK, levelId: 'all' },
  ...(ADVANCED_TRACK.levels || []).map(v => ({ id: v.id, titleAr: v.titleAr, track: ADVANCED_TRACK, levelId: v.id })),
];
const placementKey = (uid?: string) => `sara_placement_${uid || 'guest'}`;
const Placement: React.FC<{ uid?: string; onDone?: (r: PlacementOutcome) => void }> = ({ uid, onDone }) => {
  const qs = useMemo(() => BANDS.flatMap((b, bi) => {
    const lv = trackLevels(b.track).find(l => l.id === b.levelId);
    const pool = shuffle((lv?.lessons || []).filter(l => l.content)).slice(0, 4);
    return pool.map(l => ({ band: bi, q: shuffleQ(shuffle([l.content!.check, ...l.content!.exercises])[0]) }));
  }), []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [prev, setPrev] = useState(() => lsGet<{ bandTitleAr: string; score: number; at: number } | null>(placementKey(uid), null));
  const done = answers.length === qs.length && qs.length > 0;
  const result = useMemo(() => {
    if (!done) return null;
    let band = 0;
    for (let b = 0; b < BANDS.length; b++) {
      const mine = qs.map((q, k) => ({ q, ok: answers[k] })).filter(x => x.q.band === b);
      const ok = mine.filter(x => x.ok).length;
      if (mine.length && ok / mine.length >= 0.75) band = Math.min(b + 1, BANDS.length - 1); else break;
    }
    const correct = answers.filter(Boolean).length;
    return { band, correct, score: Math.round((correct / qs.length) * 100) };
  }, [done, answers, qs]);
  useEffect(() => {
    if (!result) return;
    const b = BANDS[result.band];
    const rec = { bandId: b.id, bandTitleAr: b.titleAr, trackId: b.track.id, score: result.score, at: Date.now() };
    lsSet(placementKey(uid), rec); setPrev(rec);
    // Stored with the level-test attempts (existing users/{uid}/saraLevelTests path) so parents see it in the same report.
    const a: LevelTestAttempt = { trackId: 'placement', trackTitleAr: '🎯 تحديد المستوى', levelId: b.id, levelTitleAr: `البداية المقترحة: ${b.titleAr}`,
      score: result.score, correct: result.correct, total: qs.length, passed: true, wrongByLesson: {}, weakLessons: [], createdAtMs: Date.now() };
    void saveLevelTestAttempt(uid, a);
    // Official level (single placement test for the whole academy): saved server-side (students can't write `level`).
    const fCorrect = qs.map((q, k) => ({ q, ok: answers[k] })).filter(x => x.q.band === 0 && x.ok).length;
    const level = (b.id === 'foundations' ? (fCorrect >= 2 ? 'A2' : 'A1') : b.id.toUpperCase()) as PlacementOutcome['level'];
    const outcome: PlacementOutcome = { level, bandId: b.id, trackId: b.track.id, score: result.score };
    void savePlacementLevel(level, { totalScore: result.score, quizScore: result.score });
    if (uid) void updateDoc(doc(db, 'users', uid), { placementStartTrackId: b.track.id, placementStartBandId: b.id, placementScore: result.score, placementAt: Date.now(), placementTestCompleted: true }).catch(() => {});
    onDone?.(outcome);
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!qs.length) return <p className="p-3 text-sm">لا توجد أسئلة</p>;
  if (result) {
    const b = BANDS[result.band];
    return (
      <div data-testid="placement-result" className="flex-1 min-h-0 p-4 grid content-center gap-3 text-center">
        <p className="text-4xl">🎯</p>
        <p className="text-lg font-black text-[#002147]">نتيجتك: {result.correct}/{qs.length} ({result.score}%)</p>
        <p className="text-[15px] font-black text-amber-700">ابدأ من: {b.track.titleAr} — {b.titleAr}</p>
        <p className="text-[12px] text-slate-600">حُفظت النتيجة كمستواك الرسمي في الأكاديمية، ويمكن لولي الأمر رؤيتها في تقرير الاختبارات.</p>
        <Btn onClick={() => { setI(0); setAnswers([]); setPicked(null); }}>إعادة الاختبار</Btn>
      </div>
    );
  }
  const cur = qs[i];
  return (
    <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
      <div className="flex justify-between text-[11px] font-black text-slate-600"><span>سؤال {i + 1} / {qs.length}</span><span>{BANDS[cur.band].titleAr}</span></div>
      <div className="h-1.5 rounded bg-slate-200"><div className="h-full rounded bg-amber-400" style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      {prev && i === 0 && picked === null && <p className="text-[11px] text-slate-500">آخر نتيجة: {prev.bandTitleAr} ({prev.score}%)</p>}
      <QHead q={cur.q} />
      <Choices q={cur.q} picked={picked} onPick={setPicked} />
      <Btn data-testid="tool-next" className="mt-auto" disabled={picked === null} onClick={() => { setAnswers(a => [...a, picked === cur.q.correctIndex]); setPicked(null); setI(k => Math.min(k + 1, qs.length - 1)); }}>
        {i + 1 === qs.length ? 'عرض النتيجة' : 'التالي'}
      </Btn>
    </div>
  );
};

/* ---------------- ⚡ Speed drills ---------------- */
const DRILL_SECS = 60;
const SpeedDrill: React.FC<{ uid?: string; unlockAll?: boolean }> = ({ uid, unlockAll }) => {
  const pool = useMemo(() => SARA_TRACKS.flatMap(t => reached(t, uid, unlockAll)).flatMap(l => [l.content!.check, ...l.content!.exercises]), [uid, unlockAll]);
  const bestKey = `sara_speed_best_${uid || 'guest'}`;
  const [best, setBest] = useState(() => lsGet<{ score: number; streak: number }>(bestKey, { score: 0, streak: 0 }));
  const [run, setRun] = useState<{ end: number; score: number; streak: number; maxStreak: number; q: SaraChoiceQuestion } | null>(null);
  const [left, setLeft] = useState(DRILL_SECS);
  const [flash, setFlash] = useState<'ok' | 'bad' | null>(null);
  const [last, setLast] = useState<{ score: number; streak: number } | null>(null);
  const nextQ = () => shuffleQ(pool[Math.floor(Math.random() * pool.length)]);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => {
      const s = Math.max(0, Math.ceil((run.end - Date.now()) / 1000)); setLeft(s);
      if (s <= 0) {
        const r = { score: run.score, streak: run.maxStreak }; setLast(r); setRun(null);
        const nb = { score: Math.max(best.score, r.score), streak: Math.max(best.streak, r.streak) }; setBest(nb); lsSet(bestKey, nb);
      }
    }, 250);
    return () => clearInterval(t);
  }, [run, best]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!pool.length) return <p className="p-4 text-sm font-bold">ابدأ أول درس لتظهر أسئلة التحدي.</p>;
  if (!run) return (
    <div className="flex-1 min-h-0 p-4 grid content-center gap-3 text-center">
      <p className="text-4xl">⚡</p>
      <p className="text-[14px] font-black text-[#002147]">{DRILL_SECS} ثانية — أجب عن أكبر عدد من الأسئلة من دروسك</p>
      {last && <p data-testid="speed-result" className="text-[15px] font-black text-amber-700">نتيجتك: {last.score} · أطول سلسلة: {last.streak}</p>}
      <p className="text-[12px] text-slate-600">أفضل نتيجة: {best.score} · أفضل سلسلة: {best.streak} · {pool.length} سؤال متاح</p>
      <Btn data-testid="speed-start" onClick={() => { setLeft(DRILL_SECS); setRun({ end: Date.now() + DRILL_SECS * 1000, score: 0, streak: 0, maxStreak: 0, q: nextQ() }); }}>ابدأ</Btn>
    </div>
  );
  const pick = (i: number) => {
    const ok = i === run.q.correctIndex; setFlash(ok ? 'ok' : 'bad'); setTimeout(() => setFlash(null), 300);
    setRun(r => r && ({ ...r, score: r.score + (ok ? 1 : 0), streak: ok ? r.streak + 1 : 0, maxStreak: Math.max(r.maxStreak, ok ? r.streak + 1 : 0), q: nextQ() }));
  };
  return (
    <div className={`flex-1 min-h-0 p-3 flex flex-col gap-2 ${flash === 'ok' ? 'bg-emerald-50' : flash === 'bad' ? 'bg-rose-50' : ''}`}>
      <div className="flex justify-between text-[13px] font-black"><span>⏱️ {left}s</span><span>✅ {run.score}</span><span>🔥 {run.streak}</span></div>
      <QHead q={run.q} />
      <Choices key={run.q.promptAr + run.score + run.streak} q={run.q} picked={null} onPick={pick} />
    </div>
  );
};

/* ---------------- shared lesson picker ---------------- */
const LessonPicker: React.FC<{ tracks: SaraTrack[]; uid?: string; unlockAll?: boolean; value: string; onChange: (id: string) => void }> = ({ tracks, uid, unlockAll, value, onChange }) => (
  <select data-testid="tool-lesson" value={value} onChange={e => onChange(e.target.value)} className="w-full px-2 py-2 rounded-xl border border-amber-300 bg-white text-[13px] font-bold">
    {tracks.map(t => {
      const lv = trackLevels(t);
      return lv.map(v => {
        const ls = reached(t, uid, unlockAll).filter(l => v.id === 'all' || l.levelId === v.id);
        if (!ls.length) return null;
        return <optgroup key={t.id + v.id} label={v.id === 'all' ? t.titleAr : `${t.titleAr} — ${v.titleAr}`}>
          {ls.map(l => <option key={l.id} value={l.id}>{l.order}. {l.titleAr}</option>)}
        </optgroup>;
      });
    })}
  </select>
);
const findLesson = (id: string) => { for (const t of SARA_TRACKS) { const l = t.lessons.find(x => x.id === id); if (l) return { t, l }; } return null; };

/* ---------------- 📝 Worksheet ---------------- */
const Worksheet: React.FC<{ uid?: string; unlockAll?: boolean }> = ({ uid, unlockAll }) => {
  const first = SARA_TRACKS.flatMap(t => reached(t, uid, unlockAll))[0];
  const [id, setId] = useState(first?.id || '');
  const [key, setKey] = useState(false);
  const f = findLesson(id);
  if (!f || !f.l.content) return <p className="p-4 text-sm font-bold">ابدأ أول درس لإنشاء ورقة عمل.</p>;
  const c = f.l.content; const items = [c.check, ...c.exercises];
  return (
    <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
      <style>{`@media print { body * { visibility: hidden !important; } #sara-worksheet, #sara-worksheet * { visibility: visible !important; } #sara-worksheet { position: absolute; inset: 0; overflow: visible !important; height: auto !important; border: 0 !important; } }`}</style>
      <LessonPicker tracks={SARA_TRACKS} uid={uid} unlockAll={unlockAll} value={id} onChange={setId} />
      <div className="flex gap-2">
        <Btn tone="ghost" data-testid="worksheet-key" onClick={() => setKey(k => !k)}>{key ? 'إخفاء الإجابات' : '🔑 مفتاح الإجابات'}</Btn>
        <Btn data-testid="worksheet-print" onClick={() => window.print()}><Printer size={14} className="inline" /> طباعة</Btn>
      </div>
      <div id="sara-worksheet" data-testid="worksheet" className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white border border-amber-200 p-3 text-slate-900">
        <p className="text-[14px] font-black">{f.t.titleAr} — {f.l.order}. {f.l.titleAr}</p>
        <p className="text-[11px] text-slate-500 mb-2">الاسم: ____________ التاريخ: ________</p>
        {c.example.length > 0 && <div dir="ltr" className="text-[12px] mb-2 text-start">{c.example.map((e, k) => <p key={k}>• {e.en}</p>)}</div>}
        <ol className="grid gap-2 list-decimal ps-5">
          {items.map((q, k) => (
            <li key={k} className="text-[12px]">
              <p className="font-bold">{q.promptAr}</p>
              {q.promptEn && <p dir="ltr" className="text-start">{q.promptEn}</p>}
              <p className="flex flex-wrap gap-x-3">{q.options.map((o, oi) => <span key={oi} className={key && oi === q.correctIndex ? 'font-black text-emerald-700 underline' : ''}>{'أبجد'[oi] || oi + 1}) {o}</span>)}</p>
            </li>
          ))}
        </ol>
        {key && <p className="mt-2 text-[11px] font-black text-emerald-700">الإجابات: {items.map((q, k) => `${k + 1}-${'أبجد'[q.correctIndex]}`).join('  ')}</p>}
      </div>
    </div>
  );
};

/* ---------------- 🗓️ Study plan ---------------- */
const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const KIND_ICON: Record<PlanKind, string> = { lesson: '📘', review: '🔁', test: '🏁', exam: '🎓', catchup: '🛟' };
type PlanTab = 'week' | 'overview' | 'curricula' | 'basket';
interface PlanSettings { perDay: number; studyDays: number[]; mode: 'smart' | 'basket'; tab?: PlanTab; ticks: Record<string, Record<string, boolean>>; updatedAt: number }
const StudyPlan: React.FC<{ uid?: string; unlockAll?: boolean; onOpenTrack?: (trackId: string) => void }> = ({ uid, unlockAll, onOpenTrack }) => {
  const [plan, setPlan] = useState<SaraPlan | null>(() => readSavedPlan(uid));
  const [st, setSt] = useState<PlanState | null>(null);
  const [busy, setBusy] = useState(false);
  const [sel, setSel] = useState<number>(() => new Date().getDay());
  // Plan settings follow the student's account (users/{uid}.saraPlanSettings), newest copy wins — same as the basket.
  const skey = `sara_plan_settings_${uid || 'guest'}`;
  const saved0 = useMemo(() => lsGet<PlanSettings | null>(skey, null), [skey]);
  const [perDay, setPerDay] = useState(saved0?.perDay || plan?.perDay || 2);
  const [days, setDays] = useState<number[]>(saved0?.studyDays?.length ? saved0.studyDays : plan?.studyDays || DEFAULT_STUDY_DAYS);
  const ck = `sara_plan_v2_done_${uid || 'guest'}_${plan?.weekStart || ''}`;
  useEffect(() => { setTicks(lsGet(ck, {})); }, [ck]); // eslint-disable-line react-hooks/exhaustive-deps
  const [ticks, setTicks] = useState<Record<string, boolean>>(() => lsGet(ck, {}));
  const [basket, setBasketS] = useState<BasketData>(() => readBasket(uid));
  const [freeTopicDay, setFreeTopicDay] = useState<FreeTopicDay | null>(() => readFreeTopicDay(uid));
  const modeKey = `sara_plan_mode_${uid || 'guest'}`;
  const [mode, setModeS] = useState<'smart' | 'basket'>(() => ((saved0?.mode || (lsGet(modeKey, 'smart' as string) as string)) === 'basket' ? 'basket' : 'smart'));
  const setMode = (m: 'smart' | 'basket') => { setModeS(m); lsSet(modeKey, m); };
  const setBasket = (items: string[]) => {
    const b = { items, updatedAt: Date.now() }; setBasketS(b); writeBasketLocal(uid, b);
    if (uid) void updateDoc(doc(db, 'users', uid), { saraBasket: b }).catch(() => {});
  };
  const gen = async (pd = perDay, sd = days, m = mode, items = basket.items) => {
    setBusy(true);
    const p = m === 'basket' && items.length ? await buildBasketPlan(uid, !!unlockAll, items, { perDay: pd, studyDays: sd }) : await buildSaraPlan(uid, !!unlockAll, { perDay: pd, studyDays: sd });
    savePlan(uid, p); setPlan(p); setBusy(false); return p;
  };
  useEffect(() => {
    loadPlanState(uid).then(setSt);
    if (!readSavedPlan(uid)) gen();
    // basket from the account (newer copy wins), so it follows the student across devices
    if (uid) getDoc(doc(db, 'users', uid)).then(snap => { const r = snap.data()?.saraBasket as BasketData | undefined;
      let items = basket.items;
      if (r && Array.isArray(r.items) && (r.updatedAt || 0) > (readBasket(uid).updatedAt || 0)) { const b = { items: cleanBasket(r.items), updatedAt: r.updatedAt }; items = b.items; setBasketS(b); writeBasketLocal(uid, b); }
      const ft = snap.data()?.saraFreeTopicDay as FreeTopicDay | undefined;
      if (ft?.dateKey && ft.topicId && (!freeTopicDay || ft.dateKey > freeTopicDay.dateKey || (ft.dateKey === freeTopicDay.dateKey && ft.done))) setFreeTopicDay(ft);
      const rs = snap.data()?.saraPlanSettings as PlanSettings | undefined;
      if (rs && (rs.updatedAt || 0) > (lsGet<PlanSettings | null>(skey, null)?.updatedAt || 0)) applyRemote(rs, items);
    }).catch(() => {});
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps
  const wsMs = plan ? new Date(plan.weekStart + 'T00:00:00').getTime() : Date.now();
  const isDone = (t: PlanTask) => (st && taskDone(t, st, wsMs)) || !!ticks[t.key];
  const all = plan ? plan.days.flatMap(d => d.tasks) : [];
  const doneN = all.filter(isDone).length;
  const day = plan?.days.find(d => d.dayIdx === sel);
  const [tab, setTab] = useState<PlanTab>(() => saved0?.tab || 'week');
  // ---- settings sync: local now, account debounced ----
  const content = (): Omit<PlanSettings, 'updatedAt'> => {
    const prev = lsGet<PlanSettings | null>(skey, null)?.ticks || {};
    const t: Record<string, Record<string, boolean>> = { ...prev }; if (plan?.weekStart) t[plan.weekStart] = ticks;
    const keep = Object.keys(t).sort().slice(-3); const tk: Record<string, Record<string, boolean>> = {}; keep.forEach(k => { tk[k] = t[k]; });
    return { perDay, studyDays: days, mode, tab, ticks: tk };
  };
  const lastRef = useRef<string>(saved0 ? JSON.stringify({ perDay: saved0.perDay, studyDays: saved0.studyDays, mode: saved0.mode, tab: saved0.tab, ticks: saved0.ticks }) : '');
  const pushTimer = useRef<any>(null);
  useEffect(() => {
    const c = content(); const j = JSON.stringify(c);
    if (!lastRef.current) { lastRef.current = j; return; } // first render without saved settings: nothing changed yet
    if (j === lastRef.current) return;
    lastRef.current = j;
    const full: PlanSettings = { ...c, updatedAt: Date.now() }; lsSet(skey, full);
    if (uid) { clearTimeout(pushTimer.current); pushTimer.current = setTimeout(() => { void updateDoc(doc(db, 'users', uid), { saraPlanSettings: full }).catch(() => {}); }, 1200); }
  }, [perDay, days, mode, tab, ticks, plan?.weekStart]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => clearTimeout(pushTimer.current), []);
  function applyRemote(rs: PlanSettings, items: string[]) {
    const pd = rs.perDay || 2; const sd = rs.studyDays?.length ? rs.studyDays : DEFAULT_STUDY_DAYS; const m = rs.mode === 'basket' ? 'basket' : 'smart';
    lastRef.current = JSON.stringify({ perDay: rs.perDay, studyDays: rs.studyDays, mode: rs.mode, tab: rs.tab, ticks: rs.ticks });
    lsSet(skey, rs); lsSet(modeKey, m);
    setPerDay(pd); setDays(sd); setModeS(m); if (rs.tab) setTab(rs.tab);
    const cur = readSavedPlan(uid);
    const go = !cur || cur.perDay !== pd || JSON.stringify(cur.studyDays) !== JSON.stringify(sd) || !!cur.fromBasket !== (m === 'basket' && items.length > 0);
    const apply = (ws?: string) => { const tk = ws && rs.ticks?.[ws]; if (tk) { lsSet(`sara_plan_v2_done_${uid || 'guest'}_${ws}`, tk); setTicks(tk); } };
    if (go) void gen(pd, sd, m, items).then(p => apply(p.weekStart)); else apply(cur?.weekStart);
  }
  const useB = mode === 'basket' && basket.items.length > 0;
  const road: Roadmap | null = useMemo(() => (st ? buildRoadmap(st, { perDay, studyDays: days, unlockAll: !!unlockAll, priorityTrackId: useB ? undefined : plan?.priorityTrackId, basket: basket.items, basketOnly: useB }) : null), [st, perDay, days, unlockAll, plan?.priorityTrackId, basket.items, useB]);
  const basketRoad: Roadmap | null = useMemo(() => (st && basket.items.length ? buildRoadmap(st, { perDay, studyDays: days, unlockAll: !!unlockAll, basket: basket.items, basketOnly: true }) : null), [st, perDay, days, unlockAll, basket.items]);
  const [note, setNote] = useState('');
  const bAdd = (trackId: string, orders: number[]) => { if (!st) return; const r = basketAdd(basket.items, st, trackId, orders, !!unlockAll); setBasket(r.items); setNote(r.prereq ? `أضفنا ${r.prereq} درس قبله عشان الدروس تنفتح بالترتيب` : ''); };
  const bRemove = (trackId: string, orders: number[]) => { setBasket(basketRemove(basket.items, trackId, orders, !!unlockAll)); setNote(unlockAll ? '' : 'شلنا معه الدروس اللي بعده في نفس المنهج (تنفتح بالترتيب)'); };
  const group = (keys: string[]) => { const g: Record<string, number[]> = {}; keys.forEach(k => { const i = k.lastIndexOf(':'); (g[k.slice(0, i)] ||= []).push(Number(k.slice(i + 1))); }); return g; };
  const bAddMany = (keys: string[]) => { if (!st) return; let items = basket.items, pre = 0; for (const [id, os] of Object.entries(group(keys))) { const r = basketAdd(items, st, id, os, !!unlockAll); items = r.items; pre += r.prereq; }
    setBasket(items); setNote(`أضفنا ${keys.length} درس${pre ? ` + ${pre} قبلها عشان الترتيب` : ''}`); };
  const bRemoveMany = (keys: string[]) => { let items = basket.items; for (const [id, os] of Object.entries(group(keys))) items = basketRemove(items, id, os, !!unlockAll); setBasket(items); setNote(`شلنا ${basket.items.length - items.length} درس من السلة`); };
  const suggest = async () => { if (!st) return; const p = plan && !plan.fromBasket ? plan : await buildSaraPlan(uid, !!unlockAll, { perDay, studyDays: days }); setBasket(smartBasket(p, st, !!unlockAll)); setNote('سارة عبّت السلة من تقدّمك ونقاط ضعفك (حوالي 4 أسابيع)'); };
  const useBasket = async () => { setMode('basket'); await gen(perDay, days, 'basket', basket.items); setTab('week'); };
  const useSmart = async () => { setMode('smart'); await gen(perDay, days, 'smart'); };
  const toggleDay = (d: number) => setDays(x => x.includes(d) ? (x.length > 1 ? x.filter(y => y !== d) : x) : [...x, d]);
  return (
    <div data-testid="study-plan" className="flex-1 min-h-0 p-2.5 flex flex-col gap-2 overflow-hidden">
      <div className="grid grid-cols-4 gap-1 shrink-0">
        {([['week', '🗓️ الأسبوع'], ['overview', '🧭 الكاملة'], ['curricula', '📚 المناهج'], ['basket', `🧺 السلة${basket.items.length ? ` ${basket.items.length}` : ''}`]] as const).map(([k, l]) => (
          <button key={k} data-testid={`plan-tab-${k}`} onClick={() => setTab(k)} className={`py-1.5 rounded-xl text-[11.5px] font-black border-2 truncate ${tab === k ? 'bg-[#002147] text-amber-300 border-[#002147]' : 'bg-white text-[#002147] border-amber-300'}`}>{l}</button>
        ))}
      </div>
      {tab === 'overview' && <PlanOverview road={road} fromBasket={useB} />}
      {tab === 'curricula' && <PlanCurricula road={road} onOpenTrack={onOpenTrack} onAdd={bAdd} onRemove={bRemove} onAddMany={bAddMany} onRemoveMany={bRemoveMany} note={note} />}
      {tab === 'basket' && <PlanBasket road={basketRoad} count={basket.items.length} mode={mode} busy={busy} note={note} onSuggest={suggest} onClear={() => { setBasket([]); setNote(''); if (mode === 'basket') useSmart(); }}
        onUse={useBasket} onSmart={useSmart} onRemoveTrack={id => setBasket(basket.items.filter(k => !k.startsWith(id + ':')))} onBrowse={() => setTab('curricula')} />}
      {tab === 'week' && <>
      <div className="rounded-2xl bg-[#002147] text-white p-2.5">
        <div className="flex items-center gap-2">
          <p className="flex-1 text-[12px] font-black text-amber-300 truncate">{plan?.fromBasket ? '🧺 خطتي من السلة' : '⚡ الخطة الذكية'} · 7 أيام{plan ? ` · ${doneN}/${all.length}` : ''}</p>
          <button data-testid="plan-regen" disabled={busy} onClick={() => gen()} className="px-2 py-1 rounded-lg bg-[#C49E3A] text-[#002147] text-[11px] font-black disabled:opacity-50">{busy ? '…' : '⚡ حدّث الخطة'}</button>
        </div>
        {(plan?.focusAr || []).slice(0, 2).map(f => <p key={f} className="text-[11px] font-bold text-white/85 truncate">• {f}</p>)}
        {plan && !plan.focusAr.length && <p className="text-[11px] font-bold text-white/70">الخطة مبنية على تقدمك الفعلي في المسارات وترتيب فتح الدروس.</p>}
        {(() => { const w = getDailyTopic(new Date()); const done = freeTopicDay?.dateKey === w.dateKey && freeTopicDay.done && freeTopicDay.topicId === w.topic.id;
          return done ? <p data-testid="plan-topic-day" className="mt-1 inline-flex px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-[10.5px] font-black">موضوع اليوم ✓ · {w.topic.titleAr}</p> : null; })()}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-black text-[#002147]">
        <span>دروس باليوم:</span>
        {[1, 2, 3].map(n => <button key={n} data-testid={`plan-perday-${n}`} onClick={() => { setPerDay(n); gen(n, days); }} className={`w-7 h-6 rounded-lg border ${perDay === n ? 'bg-[#002147] text-amber-300 border-[#002147]' : 'bg-white border-amber-300'}`}>{n}</button>)}
        <span className="flex-1" />
        <button onClick={() => gen(perDay, days)} className="px-2 h-6 rounded-lg bg-white border border-amber-300">حفظ الأيام</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {(plan?.days.map(x => x.dayIdx) || WEEK_ORDER).map(d => { const pd = plan?.days.find(x => x.dayIdx === d); const n = pd?.tasks.length || 0; const k = pd?.tasks.filter(isDone).length || 0; const on = days.includes(d);
          return (
            <button key={d} data-testid="plan-day" onClick={() => setSel(d)} onDoubleClick={() => toggleDay(d)}
              className={`rounded-xl py-1 text-center border-2 ${sel === d ? 'border-[#C49E3A] bg-amber-50' : 'border-transparent bg-white'} ${on ? '' : 'opacity-50'}`}>
              <p className="text-[10px] font-black text-[#002147] truncate">{['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'][d]}</p>
              <p className={`text-[10px] font-black ${n && k === n ? 'text-emerald-600' : 'text-amber-700'}`}>{n ? `${k}/${n}` : '—'}</p>
            </button>); })}
      </div>
      {day && (
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <span className="flex-1">{day.labelAr}{days.includes(day.dayIdx) ? '' : ' — يوم راحة'}</span>
          <button data-testid="plan-toggle-day" onClick={() => toggleDay(day.dayIdx)} className="px-2 py-0.5 rounded-lg bg-white border border-amber-300 text-[#002147] font-black">{days.includes(day.dayIdx) ? 'اجعله راحة' : 'اجعله يوم دراسة'}</button>
        </div>
      )}
      <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
        {!plan && <p className="text-center text-sm font-black text-[#002147] py-6">سارة تبني خطتك من تقدّمك الحقيقي…</p>}
        {day && day.tasks.length === 0 && <p className="text-center text-[12px] font-bold text-slate-500 py-4">{days.includes(day.dayIdx) ? 'خلصت كل الدروس المتاحة 🎉' : 'راحة 🌿'}</p>}
        {day?.tasks.map(t => { const done = isDone(t); return (
          <div key={t.key} data-testid="plan-task" className={`rounded-xl border-2 px-2.5 py-1.5 ${done ? 'bg-emerald-50 border-emerald-300' : t.open ? 'bg-white border-amber-300' : 'bg-white/60 border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <span className="text-base">{done ? '✅' : KIND_ICON[t.kind]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-amber-700 truncate">{t.trackAr}</p>
                <p className={`text-[12.5px] font-black text-[#002147] truncate ${done ? 'line-through opacity-60' : ''}`}>{t.titleAr}</p>
              </div>
              {(t.kind === 'review' || t.kind === 'catchup')
                ? <button onClick={() => { const n = { ...ticks, [t.key]: !ticks[t.key] }; setTicks(n); lsSet(ck, n); }} className="shrink-0 px-2 py-1 rounded-lg border border-[#002147]/20 text-[11px] font-black text-[#002147]">{ticks[t.key] ? 'تراجع' : 'تم'}</button>
                : !done && t.open && onOpenTrack && t.trackId && <button data-testid="plan-open" onClick={() => onOpenTrack(t.trackId)} className="shrink-0 px-2.5 py-1 rounded-lg bg-[#002147] text-amber-300 text-[11px] font-black">ابدأ</button>}
              {!done && !t.open && <span className="shrink-0 text-[10px] font-black text-slate-400">🔒</span>}
            </div>
            <p className="text-[10.5px] font-bold text-slate-500 truncate">{t.reasonAr}</p>
          </div>); })}
      </div>
      </>}
    </div>
  );
};

const fmtDate = (iso: string) => iso ? new Date(iso + 'T00:00:00').toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
const fmtMin = (m: number) => m >= 60 ? `${Math.floor(m / 60)} س${m % 60 ? ` ${m % 60} د` : ''}` : `${m} د`;
/** The full smart plan: duration in months, finish date, daily/weekly time, per-track finish — all from real remaining lessons. */
const PlanOverview: React.FC<{ road: Roadmap | null; fromBasket?: boolean }> = ({ road, fromBasket }) => {
  if (!road) return <p className="text-center text-sm font-black text-[#002147] py-6">سارة تحسب خطتك الكاملة…</p>;
  const stat = (k: string, v: string) => <div key={k} className="rounded-xl bg-white border border-amber-300 px-1.5 py-1 text-center"><p className="text-[13px] font-black text-[#002147] tabular-nums">{v}</p><p className="text-[9.5px] font-bold text-slate-500">{k}</p></div>;
  return (
    <div data-testid="plan-overview" className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
      <div className="rounded-2xl bg-[#002147] text-white p-2.5 text-center">
        {road.remainingLessons ? <>
          <p className="text-[11px] font-bold text-white/70">{fromBasket ? 'مدة خطتك حتى تخلص دروس سلتك' : 'مدة خطتك الذكية حتى تخلص كل المناهج'}</p>
          <p data-testid="plan-months" className="text-[22px] font-black text-amber-300 leading-tight">{road.months} {road.months <= 2 ? 'شهر' : 'أشهر'} <span className="text-[12px] text-white/80">({road.weeks} أسبوع)</span></p>
          <p className="text-[11px] font-bold text-white/85">تخلص تقريباً في {fmtDate(road.finish)}</p>
        </> : <p className="text-[15px] font-black text-amber-300 py-2">خلصت كل الدروس المتاحة 🎉</p>}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {stat('درس متبقي', `${road.remainingLessons} من ${road.totalLessons}`)}
        {stat('درس أنجزته', String(road.doneLessons))}
        {stat('اختبار مستوى باقي', String(road.testsLeft))}
        {stat('دقائق باليوم (تقدير)', `${road.minutesPerDay}`)}
        {stat('بالأسبوع (تقدير)', fmtMin(road.weeklyMinutes))}
        {stat('دروس × أيام', `${road.perDay} × ${road.studyDaysPerWeek}`)}
      </div>
      <p className="text-[11px] font-black text-[#002147]">متى تخلص كل منهج:</p>
      <div className="flex-1 min-h-0 grid gap-1 content-start overflow-hidden">
        {road.tracks.filter(t => !fromBasket || t.total).map(t => (
          <div key={t.id} data-testid="plan-track-row" className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-2 py-0.5">
            <p className="w-24 shrink-0 text-[11px] font-black text-[#002147] truncate">{t.titleAr}</p>
            <div className="flex-1 h-1.5 rounded bg-slate-200"><div className="h-full rounded bg-[#C49E3A]" style={{ width: `${t.total ? (t.done / t.total) * 100 : 0}%` }} /></div>
            <p className="w-12 shrink-0 text-[10px] font-bold text-slate-500 tabular-nums text-center">{t.done}/{t.total}</p>
            <p className="w-24 shrink-0 text-[10px] font-black text-amber-700 text-left truncate">{t.remaining ? fmtDate(t.finish || '') : '✅ خلص'}</p>
          </div>
        ))}
      </div>
      <p className="text-[9.5px] font-bold text-slate-500 leading-snug">الحساب من دروسك المتبقية فعلياً وأيام دراستك وعدد دروسك باليوم. الوقت تقدير: ~{LESSON_MIN('foundations')} دقيقة لدرس المسارات الأساسية و~{LESSON_MIN('vocabulary')} دقيقة للمسارات الجديدة.</p>
    </div>
  );
};

/** 🧺 Lesson basket: the student's own pick of lessons from all curricula → their plan. */
const PlanBasket: React.FC<{ road: Roadmap | null; count: number; mode: 'smart' | 'basket'; busy: boolean; note: string; onSuggest: () => void; onClear: () => void; onUse: () => void; onSmart: () => void; onRemoveTrack: (id: string) => void; onBrowse: () => void }> = ({ road, count, mode, busy, note, onSuggest, onClear, onUse, onSmart, onRemoveTrack, onBrowse }) => {
  const rows = road ? road.tracks.filter(t => t.total) : [];
  return (
    <div data-testid="plan-basket" className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
      <div className="rounded-2xl bg-[#002147] text-white p-2.5 text-center">
        <p className="text-[11px] font-bold text-white/70">سلة دروسك 🧺 — اختر بنفسك من كل المناهج</p>
        <p data-testid="basket-count" className="text-[22px] font-black text-amber-300 leading-tight">{count} درس</p>
        {road && road.remainingLessons > 0 ? <p data-testid="basket-time" className="text-[11px] font-bold text-white/85">≈ {road.months} {road.months <= 2 ? 'شهر' : 'أشهر'} ({road.weeks} أسبوع) · {road.minutesPerDay} د باليوم · تخلص {fmtDate(road.finish)}</p>
          : <p className="text-[11px] font-bold text-white/70">{count ? 'خلصت كل دروس سلتك 🎉' : 'السلة فاضية — أضف دروس من «المناهج» أو خلّ سارة تقترح'}</p>}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <button data-testid="basket-suggest" disabled={busy} onClick={onSuggest} className="py-1.5 rounded-xl bg-[#C49E3A] text-[#002147] text-[12px] font-black disabled:opacity-50">✨ اقتراح سارة الذكي</button>
        <button data-testid="basket-browse" onClick={onBrowse} className="py-1.5 rounded-xl bg-white border-2 border-amber-300 text-[#002147] text-[12px] font-black">📚 أضف من المناهج</button>
      </div>
      {note && <p data-testid="basket-note" className="text-[10px] font-bold text-amber-700 truncate">{note}</p>}
      <div className="flex-1 min-h-0 grid gap-1 content-start overflow-hidden">
        {rows.map(t => (
          <div key={t.id} data-testid="basket-row" className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-2 py-1">
            <p className="flex-1 min-w-0 text-[11.5px] font-black text-[#002147] truncate">{t.titleAr}</p>
            <p className="text-[10px] font-bold text-slate-500 tabular-nums">{t.total} درس{t.done ? ` · ✅${t.done}` : ''} · {fmtMin(t.minutesLeft)}</p>
            <p className="w-20 text-[10px] font-black text-amber-700 text-left truncate">{t.remaining ? fmtDate(t.finish || '') : '✅'}</p>
            <button onClick={() => onRemoveTrack(t.id)} aria-label="شيل" className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-black">×</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-1">
        <button data-testid="basket-use" disabled={!count || busy} onClick={onUse} className="py-2 rounded-xl bg-[#002147] text-amber-300 text-[12.5px] font-black disabled:opacity-40">📅 ولّد خطتي من السلة</button>
        {count > 0 && <button data-testid="basket-clear" onClick={onClear} className="px-3 rounded-xl bg-white border border-slate-300 text-slate-600 text-[11px] font-black">تفريغ</button>}
      </div>
      {mode === 'basket' && <button data-testid="basket-smart" onClick={onSmart} className="text-[10.5px] font-black text-[#002147] underline">رجوع للخطة الذكية التلقائية</button>}
      <p className="text-[9.5px] font-bold text-slate-500 leading-snug">الوقت تقدير: ~{LESSON_MIN('foundations')} د لدرس المسارات الأساسية و~{LESSON_MIN('vocabulary')} د للجديدة. الدروس تنفتح بالترتيب، فإضافة درس مقفول تضيف اللي قبله.</p>
    </div>
  );
};

const STATE_CLS: Record<string, string> = { done: 'bg-emerald-500 text-white', next: 'bg-[#C49E3A] text-[#002147] ring-2 ring-[#002147]', open: 'bg-white text-[#002147] border border-amber-300', locked: 'bg-slate-200 text-slate-400', soon: 'bg-slate-100 text-slate-300 border border-dashed border-slate-300' };
/** All curricula: every track → level → lesson, with real done/next/locked state. One track and one block of 30 at a time (no scroll). */
const PlanCurricula: React.FC<{ road: Roadmap | null; onOpenTrack?: (id: string) => void; onAdd: (t: string, o: number[]) => void; onRemove: (t: string, o: number[]) => void; onAddMany: (k: string[]) => void; onRemoveMany: (k: string[]) => void; note: string }> = ({ road, onOpenTrack, onAdd, onRemove, onAddMany, onRemoveMany, note }) => {
  const [multi, setMulti] = useState(false);
  const [selK, setSelK] = useState<string[]>([]);
  const [tid, setTid] = useState<string>('');
  const [lv, setLv] = useState(0);
  const [pg, setPg] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  if (!road) return <p className="text-center text-sm font-black text-[#002147] py-6">…</p>;
  const t = road.tracks.find(x => x.id === tid) || road.tracks[0];
  const level = t.levels[Math.min(lv, t.levels.length - 1)];
  const pages = Math.ceil(level.lessons.length / 30); const chunk = level.lessons.slice(pg * 30, pg * 30 + 30);
  const picked = level.lessons.find(l => l.order === pick);
  const keyOf = (o: number) => `${t.id}:${o}`;
  const selectable = (ls: { order: number; state: string }[]) => ls.filter(l => l.state !== 'done' && l.state !== 'soon').map(l => keyOf(l.order));
  const toggleKeys = (ks: string[]) => setSelK(cur => { const all = ks.every(k => cur.includes(k)); return all ? cur.filter(k => !ks.includes(k)) : [...new Set([...cur, ...ks])]; });
  const selSet = new Set(selK);
  const stLabel = { done: '✅ خلصته', next: '▶️ درسك التالي', open: '🔓 مفتوح', locked: '🔒 مقفول — يفتح بالترتيب', soon: '⏳ قيد الإعداد' } as const;
  return (
    <div data-testid="plan-curricula" className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
      <div className="grid grid-cols-3 gap-1">
        {road.tracks.map(x => (
          <button key={x.id} data-testid="plan-cur-track" onClick={() => { setTid(x.id); setLv(0); setPg(0); setPick(null); }}
            className={`rounded-xl px-1 py-1 border-2 text-center ${x.id === t.id ? 'border-[#C49E3A] bg-[#002147] text-amber-300' : 'border-amber-200 bg-white text-[#002147]'}`}>
            <p className="text-[10.5px] font-black truncate">{x.titleAr}</p>
            <p className="text-[9.5px] font-bold opacity-80 tabular-nums">{x.done}/{x.total}</p>
          </button>
        ))}
      </div>
      {t.levels.length > 1 && (
        <div className="flex gap-1 overflow-hidden">
          {t.levels.map((v, i) => (
            <button key={v.id} onClick={() => { setLv(i); setPg(0); setPick(null); }} className={`flex-1 min-w-0 rounded-lg py-1 text-[10px] font-black truncate border ${i === lv ? 'bg-[#C49E3A] text-[#002147] border-[#C49E3A]' : 'bg-white text-[#002147] border-amber-200'}`}>
              {v.testPassed ? '🏁 ' : ''}{v.titleAr.replace(/المستوى /, 'م. ')}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 text-[10.5px] font-bold text-slate-600">
        <span className="flex-1 truncate">{level.titleAr}{level.testPassed === true ? ' · اختبار المستوى ✅' : level.testPassed === false ? ' · اختبار المستوى لم يُجتز' : ''}</span>
        {(() => { const free = level.lessons.filter(l => l.state !== 'done' && l.state !== 'soon'); const allIn = free.length > 0 && free.every(l => l.inBasket);
          const tFree = t.levels.flatMap(v => v.lessons).filter(l => l.state !== 'done' && l.state !== 'soon'); const tIn = tFree.length > 0 && tFree.every(l => l.inBasket);
          return <>{free.length > 0 && <button data-testid="basket-level" onClick={() => multi ? toggleKeys(selectable(level.lessons)) : allIn ? onRemove(t.id, free.map(l => l.order)) : onAdd(t.id, free.map(l => l.order))} className="px-1.5 rounded bg-white border border-amber-300 text-[#002147] font-black">{multi ? '☑ كل المستوى' : allIn ? '− المستوى' : '+ المستوى'}</button>}
            {t.levels.length > 1 && tFree.length > 0 && <button data-testid="basket-track" onClick={() => multi ? toggleKeys(tFree.map(l => keyOf(l.order))) : tIn ? onRemove(t.id, tFree.map(l => l.order)) : onAdd(t.id, tFree.map(l => l.order))} className="px-1.5 rounded bg-[#002147] text-amber-300 font-black">{multi ? '☑ كل المنهج' : tIn ? '− المنهج' : '+ المنهج'}</button>}</>; })()}
        {pages > 1 && <><button disabled={pg === 0} onClick={() => setPg(pg - 1)} className="px-1.5 rounded bg-white border border-amber-300 disabled:opacity-30">›</button><span>{pg + 1}/{pages}</span><button disabled={pg >= pages - 1} onClick={() => setPg(pg + 1)} className="px-1.5 rounded bg-white border border-amber-300 disabled:opacity-30">‹</button></>}
      </div>
      <div data-testid="plan-cur-grid" className="grid grid-cols-6 gap-1">
        {chunk.map(l => <button key={l.order} data-testid="cur-lesson" onClick={() => { if (multi) { if (l.state !== 'done' && l.state !== 'soon') toggleKeys([keyOf(l.order)]); } else setPick(l.order); }} className={`relative h-7 rounded-lg text-[11px] font-black tabular-nums ${STATE_CLS[l.state]} ${(multi ? selSet.has(keyOf(l.order)) : pick === l.order) ? 'outline outline-[3px] outline-[#002147]' : ''}`}>{multi && selSet.has(keyOf(l.order)) && <span className="absolute -bottom-1 right-0 w-3 h-3 rounded-full bg-[#002147] text-amber-300 text-[8px] leading-3">✓</span>}{l.num}{l.inBasket && <span data-testid="basket-dot" className="absolute -top-1 left-0 w-3 h-3 rounded-full bg-[#C49E3A] border border-white text-[7px] leading-[10px] text-[#002147]">🧺</span>}</button>)}
      </div>
      <div className="flex items-center gap-1.5">
        <button data-testid="multi-toggle" onClick={() => { setMulti(!multi); setSelK([]); setPick(null); }} className={`px-2 py-1 rounded-lg text-[11px] font-black border-2 ${multi ? 'bg-[#002147] text-amber-300 border-[#002147]' : 'bg-white text-[#002147] border-amber-300'}`}>{multi ? '✕ إلغاء التحديد' : '☑️ تحديد متعدد'}</button>
        {multi && <span data-testid="multi-count" className="flex-1 text-[10.5px] font-black text-[#002147] truncate">محدد {selK.length} درس{(() => { const n = new Set(selK.map(k => k.slice(0, k.lastIndexOf(':')))).size; return n > 1 ? ` من ${n} مناهج` : ''; })()}</span>}
      </div>
      {multi ? (
        <div className="rounded-xl bg-white border border-amber-300 px-2 py-1.5 min-h-[44px] grid grid-cols-2 gap-1">
          <button data-testid="multi-add" disabled={!selK.length} onClick={() => { onAddMany(selK); setSelK([]); }} className="py-1.5 rounded-lg bg-[#C49E3A] text-[#002147] text-[12px] font-black disabled:opacity-40">🧺 أضف {selK.length} للسلة</button>
          <button data-testid="multi-remove" disabled={!selK.length} onClick={() => { onRemoveMany(selK); setSelK([]); }} className="py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[12px] font-black disabled:opacity-40">− شيل {selK.length} من السلة</button>
        </div>
      ) :
      <div className="rounded-xl bg-white border border-amber-300 px-2.5 py-1.5 min-h-[44px]">
        {picked ? <>
          <p className="text-[12px] font-black text-[#002147] truncate">{picked.num}. {picked.titleAr}</p>
          <div className="flex items-center gap-2"><p className="flex-1 text-[10.5px] font-bold text-slate-500">{stLabel[picked.state]}</p>
            {picked.state !== 'done' && picked.state !== 'soon' && <button data-testid="basket-lesson" onClick={() => picked.inBasket ? onRemove(t.id, [picked.order]) : onAdd(t.id, [picked.order])} className={`px-2 py-0.5 rounded-lg text-[11px] font-black border ${picked.inBasket ? 'bg-white text-[#002147] border-amber-300' : 'bg-[#C49E3A] text-[#002147] border-[#C49E3A]'}`}>{picked.inBasket ? '− من السلة' : '+ للسلة'}</button>}
            {(picked.state === 'next' || picked.state === 'open') && onOpenTrack && <button onClick={() => onOpenTrack(t.id)} className="px-2 py-0.5 rounded-lg bg-[#002147] text-amber-300 text-[11px] font-black">ابدأ</button>}</div>
        </> : <p className="text-[11px] font-bold text-slate-500">اضغط رقم أي درس لتشوفه وتضيفه للسلة 🧺. 🟩 خلصته · 🟨 التالي · ⬜ مقفول</p>}
      </div>}
      {note && <p data-testid="basket-note" className="text-[10px] font-bold text-amber-700 truncate">{note}</p>}
    </div>
  );
};

/* ---------------- 🎭 Role-play ---------------- */
const RolePlay: React.FC<{ uid?: string; unlockAll?: boolean }> = ({ uid, unlockAll }) => {
  const lessons = reached(CONVERSATION_TRACK, uid, unlockAll);
  const [id, setId] = useState(lessons[0]?.id || '');
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const l = lessons.find(x => x.id === id);
  // Script: Sara opens with the lesson's dialogue lines, then each question is a turn where the student chooses the reply.
  const turns = useMemo(() => l?.content ? [l.content.check, ...l.content.exercises].map(shuffleQ) : [], [l]);
  if (!l?.content) return <p className="p-4 text-sm font-bold">افتح أول درس محادثة لتبدأ المغامرة.</p>;
  const lines = l.content.example;
  const end = step >= turns.length;
  const t = turns[step];
  return (
    <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
      <LessonPicker tracks={[CONVERSATION_TRACK]} uid={uid} unlockAll={unlockAll} value={id} onChange={v => { setId(v); setStep(0); setPicked(null); setStars(0); }} />
      <div className="rounded-xl bg-[#083344] text-teal-50 p-2.5 text-[12px]" dir="ltr">
        <p className="font-black text-amber-300 text-start">👩‍🏫 Sara</p>
        <p className="text-start">{lines[Math.min(step, lines.length - 1)]?.en}</p>
        <p dir="rtl" className="text-teal-200/80 text-start">{lines[Math.min(step, lines.length - 1)]?.ar}</p>
      </div>
      {end ? (
        <div data-testid="roleplay-end" className="grid gap-2 text-center content-center flex-1">
          <p className="text-3xl">{'⭐'.repeat(Math.max(1, stars))}</p>
          <p className="font-black text-[#002147]">انتهت المغامرة! {stars}/{turns.length} ردود موفقة</p>
          <Btn onClick={() => { setStep(0); setPicked(null); setStars(0); }}>العب مرة أخرى</Btn>
        </div>
      ) : (<>
        <QHead q={t} />
        <Choices q={t} picked={picked} onPick={i => { setPicked(i); if (i === t.correctIndex) setStars(s => s + 1); }} />
        {picked !== null && (
          <p className={`text-[12px] font-bold ${picked === t.correctIndex ? 'text-emerald-700' : 'text-rose-700'}`}>
            {picked === t.correctIndex ? 'سارة: Great reply! 🎉 نكمل…' : `سارة: ممم، لنجرّب طريقة أخرى. ${l.content.altExplanationAr.slice(0, 110)}`}
          </p>)}
        <div className="mt-auto flex gap-2">
          {picked !== null && picked !== t.correctIndex && <Btn tone="ghost" onClick={() => setPicked(null)}>جرّب ردًا آخر</Btn>}
          <Btn data-testid="tool-next" className="flex-1" disabled={picked === null} onClick={() => { setStep(s => s + 1); setPicked(null); }}>متابعة</Btn>
        </div>
      </>)}
    </div>
  );
};

/* ---------------- listen-and-repeat card (pronunciation + voice coach) ---------------- */
const RepeatCard: React.FC<{ items: string[] }> = ({ items }) => {
  const [i, setI] = useState(0);
  const mic = useMic();
  const target = items[i] || '';
  const res = mic.heard ? matchScore(target, mic.heard) : null;
  return (
    <div className="grid gap-2">
      <div className="rounded-xl bg-white border border-amber-200 p-3 text-center">
        <p className="text-[11px] font-black text-slate-500">{i + 1} / {items.length}</p>
        <p dir="ltr" data-testid="repeat-target" className="text-[18px] font-black text-[#002147]">{target}</p>
      </div>
      <div className="flex gap-2 justify-center">
        <Btn tone="ghost" disabled={i === 0} onClick={() => { setI(i - 1); mic.reset(); }}>السابق</Btn>
        {mic.supported
          ? <Btn data-testid="tool-mic" onClick={mic.listen} disabled={mic.listening}><Mic size={14} className="inline" /> {mic.listening ? 'أستمع…' : 'كرّر بصوتك'}</Btn>
          : <span className="text-[11px] font-bold text-slate-600 self-center">الميكروفون غير مدعوم هنا — كرّر بصوت عالٍ وقيّم نفسك</span>}
        <Btn tone="ghost" data-testid="tool-next" disabled={i + 1 >= items.length} onClick={() => { setI(i + 1); mic.reset(); }}>التالي</Btn>
      </div>
      {mic.err && <p className="text-[12px] text-rose-700 font-bold text-center">{mic.err}</p>}
      {res && (
        <div data-testid="repeat-feedback" className="text-center text-[12px] font-bold">
          <p dir="ltr">“{mic.heard}”</p>
          <p className={res.pct >= 80 ? 'text-emerald-700' : res.pct >= 50 ? 'text-amber-700' : 'text-rose-700'}>
            {res.pct >= 80 ? <><CheckCircle2 size={14} className="inline" /> ممتاز!</> : res.pct >= 50 ? 'قريب جداً، حاول مرة أخرى' : 'لنحاول مجدداً ببطء'} ({res.pct}%)
          </p>
          {res.missed.length > 0 && <p dir="ltr" className="text-rose-700">{res.missed.join(' · ')}</p>}
        </div>
      )}
    </div>
  );
};

/* ---------------- 🔊 Pronunciation lab ---------------- */
const MINIMAL_PAIRS = ['ship — sheep', 'live — leave', 'full — fool', 'bat — bet', 'cat — cut', 'pen — pan', 'think — sink', 'very — berry', 'fan — van', 'pull — pool'];
const Pronunciation: React.FC<{ uid?: string; unlockAll?: boolean }> = ({ uid, unlockAll }) => {
  const lessons = reached(READING_TRACK, uid, unlockAll);
  const [set, setSet] = useState<string>(lessons[0]?.id || 'pairs');
  const l = lessons.find(x => x.id === set);
  const items = useMemo(() => {
    if (!l?.content) return MINIMAL_PAIRS;
    // keep the original casing for display (e.g. "Riyadh"), matching is case-insensitive anyway
    const cased = new Map<string, string>();
    l.content.example.forEach(e => (speakable(e.en).match(/[A-Za-z']+/g) || []).forEach(w => { const k = w.toLowerCase(); if (!cased.has(k) || /^[A-Z]/.test(w) && cased.get(k) === k) cased.set(k, w); }));
    const words = Array.from(new Set(l.content.example.flatMap(e => norm(speakable(e.en))).filter(w => w.length >= 5))).slice(0, 6).map(w => cased.get(w) || w);
    return [...words, ...l.content.example.map(e => speakable(e.en)).filter(Boolean)].slice(0, 10);
  }, [l]);
  return (
    <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
      <select data-testid="tool-lesson" value={set} onChange={e => setSet(e.target.value)} className="w-full px-2 py-2 rounded-xl border border-amber-300 bg-white text-[13px] font-bold">
        <option value="pairs">الأزواج المتقاربة (ship / sheep…)</option>
        {lessons.map(x => <option key={x.id} value={x.id}>{x.order}. {x.titleAr}</option>)}
      </select>
      <p className="text-[11px] text-slate-600">استمع للمجموعة كاملة بصوت سارة، ثم كرّر كل كلمة.</p>
      <SaraSetButton key={set} text={items.map(s => s.replace(/—/g, ',')).join('. ')} label="استمع للمجموعة" />
      <RepeatCard key={set} items={items} />
    </div>
  );
};

/* ---------------- 🎙️ Voice coach ---------------- */
const VoiceCoach: React.FC<{ uid?: string; unlockAll?: boolean }> = ({ uid, unlockAll }) => {
  const tracks = [CONVERSATION_TRACK, FOUNDATIONS_TRACK, ADVANCED_TRACK, READING_TRACK, WRITING_TRACK];
  const first = tracks.flatMap(t => reached(t, uid, unlockAll))[0];
  const [id, setId] = useState(first?.id || '');
  const f = findLesson(id);
  if (!f?.l.content) return <p className="p-4 text-sm font-bold">ابدأ أول درس لتتدرّب مع مدرب الصوت.</p>;
  const items = f.l.content.example.map(e => speakable(e.en)).filter(Boolean);
  return (
    <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
      <LessonPicker tracks={tracks} uid={uid} unlockAll={unlockAll} value={id} onChange={setId} />
      <p className="text-[11px] text-slate-600">١) استمع لسارة تقرأ جمل الدرس ٢) كرّر كل جملة بالميكروفون ٣) شاهد الكلمات التي فاتتك.</p>
      <SaraSetButton key={id} text={items.join(' ... ')} label="استمع لسارة" />
      {items.length ? <RepeatCard key={id} items={items} /> : <p className="text-sm">لا توجد جمل في هذا الدرس</p>}
    </div>
  );
};

/* ---------------- ✍️ Grammar check ---------------- */
interface GcMistake { wrong: string; right: string; reasonAr: string }
interface GcResult { isCorrect: boolean; corrected: string; mistakes: GcMistake[]; practice: { sentence: string; answer: string; hintAr: string }[] }
const esc = (x: string) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Original sentence with each wrong piece marked. */
const Marked: React.FC<{ text: string; mistakes: GcMistake[] }> = ({ text, mistakes }) => {
  const parts = mistakes.map(m => m.wrong.trim()).filter(Boolean);
  if (!parts.length) return <>{text}</>;
  const re = new RegExp(`(${parts.map(esc).join('|')})`, 'gi');
  return <>{text.split(re).map((seg, i) => parts.some(p => p.toLowerCase() === seg.toLowerCase())
    ? <mark key={i} className="bg-rose-500/25 text-rose-200 rounded px-0.5 line-through decoration-rose-400">{seg}</mark>
    : <span key={i}>{seg}</span>)}</>;
};
const GrammarCheck: React.FC = () => {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [r, setR] = useState<GcResult | null>(null);
  const [showPractice, setShowPractice] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  const check = async () => {
    const s = text.trim(); if (!s || busy) return;
    setBusy(true); setErr(''); setR(null); setShowPractice(false); setRevealed([]);
    try {
      const res = await fetch('/api/sara/grammar-check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sentence: s, lang: getExplainLang() }) });
      if (!res.ok) throw new Error(String(res.status));
      setR(await res.json()); setChecked(s);
    } catch { setErr('ما قدرت أدقق الجملة الحين، حاول مرة ثانية.'); }
    finally { setBusy(false); }
  };
  return (
    <div data-testid="sara-grammar-check" className="flex-1 min-h-0 p-3 flex flex-col gap-2 bg-[#001a38] text-white overflow-hidden">
      <p className="text-[11px] text-amber-200/90 font-bold">اكتب جملة بالإنجليزي وسارة تصححها وتشرح لك السبب.</p>
      <div className="flex gap-2">
        <input dir="ltr" value={text} maxLength={300} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void check(); }}
          placeholder="I am live here since 2 years" data-testid="grammar-input"
          className="flex-1 min-w-0 rounded-xl bg-[#0a2d5c] border border-amber-400/40 px-3 py-2 text-[14px] font-bold text-white placeholder:text-white/30 outline-none focus:border-amber-400" />
        <button onClick={() => void check()} disabled={!text.trim() || busy} data-testid="grammar-check-btn"
          className="px-3 py-2 rounded-xl bg-amber-400 text-[#001a38] text-[13px] font-black disabled:opacity-40 shrink-0">{busy ? 'جاري التدقيق…' : 'دقّق'}</button>
      </div>
      {err && <p className="text-[12px] font-bold text-rose-300">{err}</p>}
      {r && (
        <div className="flex-1 min-h-0 flex flex-col gap-2">
          {r.isCorrect ? (
            <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/40 p-2.5 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-300 shrink-0" />
              <p className="text-[13px] font-black">جملتك صحيحة، أحسنت!</p>
            </div>
          ) : (
            <>
              <div className="rounded-xl bg-[#0a2d5c] border border-white/10 p-2.5">
                <p className="text-[10px] text-amber-300 font-black mb-1">جملتك</p>
                <p dir="ltr" className="text-[14px] font-bold text-start"><Marked text={checked} mistakes={r.mistakes} /></p>
              </div>
              <div className="rounded-xl bg-[#0a2d5c] border border-amber-400/50 p-2.5">
                <p className="text-[10px] text-amber-300 font-black mb-1">التصحيح</p>
                <p dir="ltr" data-testid="grammar-corrected" className="text-[15px] font-black text-emerald-200 text-start">{r.corrected}</p>
              </div>
              <ul className="grid gap-1">
                {r.mistakes.slice(0, 3).map((m, i) => (
                  <li key={i} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[12px] leading-snug">
                    <span dir="ltr" className="font-black"><span className="text-rose-300 line-through">{m.wrong}</span> ← <span className="text-emerald-300">{m.right}</span></span>
                    <span className="block text-white/85 font-bold">{m.reasonAr}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {r.corrected && <SaraSetButton key={r.corrected} text={r.corrected} label="استمع لسارة" />}
            {r.practice.length > 0 && !showPractice && <Btn tone="ghost" onClick={() => setShowPractice(true)} data-testid="grammar-practice-btn">تدرّب عليها</Btn>}
          </div>
          {showPractice && (
            <div className="grid gap-1.5" data-testid="grammar-practice">
              {r.practice.map((p, i) => (
                <button key={i} onClick={() => setRevealed(v => v.includes(i) ? v : [...v, i])} className="rounded-lg bg-[#0a2d5c] border border-amber-400/30 px-2.5 py-1.5 text-start">
                  <span dir="ltr" className="block text-[13px] font-bold">{i + 1}. {p.sentence}</span>
                  {revealed.includes(i)
                    ? <span dir="ltr" className="block text-[12px] font-black text-emerald-300">{p.answer}</span>
                    : <span className="block text-[11px] text-amber-200/80 font-bold">صحّحها في بالك ثم اضغط للحل · {p.hintAr}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/** One-page Sara tool (same look as the track player). */
export const SaraTools: React.FC<Props> = ({ tool, onClose, uid, unlockAll, onPlacementDone, onOpenTrack }) => {
  if (!tool) return null;
  const p = { uid, unlockAll };
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-track-page" className={`relative w-full ${tool === 'board' ? 'max-w-6xl' : 'max-w-xl'} h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden`}>
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-amber-300 font-bold truncate">أدوات سارة</p>
            <p data-testid="sara-tool-title" className="text-sm font-black truncate">{TITLES[tool]}</p>
          </div>
          <button onClick={() => { saraStopNarrator(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {tool === 'placement' && <Placement uid={uid} onDone={onPlacementDone} />}
        {tool === 'speed' && <SpeedDrill {...p} />}
        {tool === 'worksheet' && <Worksheet {...p} />}
        {tool === 'plan' && <StudyPlan {...p} onOpenTrack={onOpenTrack ? id => { saraStopNarrator(); onClose(); onOpenTrack(id); } : undefined} />}
        {tool === 'roleplay' && <RolePlay {...p} />}
        {tool === 'pronunciation' && <Pronunciation {...p} />}
        {tool === 'voicecoach' && <VoiceCoach {...p} />}
        {tool === 'grammar' && <GrammarCheck />}
        {tool === 'board' && <SaraBoardTutor uid={uid} />}
      </div>
    </div>
  );
};
export default SaraTools;
