import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Volume2, Square, Mic, Printer, CheckCircle2 } from 'lucide-react';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { readUnlocked, saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { savePlacementLevel } from '../lib/placement';
import { trackLevels, saveLevelTestAttempt, summarizeLevelTests, type LevelTestAttempt } from '../lib/saraLevelTests';

export type SaraToolId = 'placement' | 'speed' | 'worksheet' | 'plan' | 'roleplay' | 'pronunciation' | 'voicecoach';
export const SARA_TRACKS: SaraTrack[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK];
export interface PlacementOutcome { level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; bandId: string; trackId: string; score: number }
interface Props { tool: SaraToolId | null; onClose: () => void; uid?: string; unlockAll?: boolean; onPlacementDone?: (r: PlacementOutcome) => void }

const TITLES: Record<SaraToolId, string> = {
  placement: '🎯 اختبار تحديد المستوى', speed: '⚡ تحدي السرعة', worksheet: '📝 ورقة عمل', plan: '🗓️ خطة الدراسة الأسبوعية',
  roleplay: '🎭 مغامرات لعب الأدوار', pronunciation: '🔊 مختبر النطق', voicecoach: '🎙️ مدرب الصوت',
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
const StudyPlan: React.FC<{ uid?: string; unlockAll?: boolean }> = ({ uid }) => {
  const weekStart = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 1) % 7)); return d.toISOString().slice(0, 10); })();
  const ck = `sara_plan_${uid || 'guest'}_${weekStart}`;
  const [done, setDone] = useState<Record<string, boolean>>(() => lsGet(ck, {}));
  const tasks = useMemo(() => {
    const attempts = lsGet<LevelTestAttempt[]>(`sara_level_tests_${uid || 'guest'}`, []);
    const weak = summarizeLevelTests(attempts).filter(s => s.trackId !== 'placement').flatMap(s => s.latest.weakLessons.map(w => ({ ...w, track: s.trackTitleAr })));
    const next: { label: string; kind: 'new' | 'review' }[] = [];
    for (const t of SARA_TRACKS) {
      const u = readUnlocked(t.id, uid);
      t.lessons.filter(l => l.content && l.order >= u).slice(0, 2).forEach(l => next.push({ label: `${t.titleAr}: ${l.order}. ${l.titleAr}`, kind: 'new' }));
    }
    const review = weak.slice(0, 7).map(w => ({ label: `مراجعة ${w.track}: ${w.order}. ${w.titleAr}`, kind: 'review' as const }));
    const all = [...next, ...review];
    return DAYS.map((d, i) => ({ day: d, items: i === 6 ? [{ label: '⚡ تحدي السرعة + مراجعة الأسبوع', kind: 'review' as const }] : all.filter((_, k) => k % 6 === i).slice(0, 2) }));
  }, [uid]);
  const toggle = (k: string) => setDone(d => { const n = { ...d, [k]: !d[k] }; lsSet(ck, n); return n; });
  const total = tasks.reduce((s, d) => s + d.items.length, 0); const ok = Object.values(done).filter(Boolean).length;
  return (
    <div className="flex-1 min-h-0 p-3 flex flex-col gap-2">
      <p className="text-[12px] font-black text-slate-600">أسبوع {weekStart} · أنجزت {ok}/{total}</p>
      <div data-testid="study-plan" className="flex-1 min-h-0 overflow-y-auto grid gap-1.5 content-start">
        {tasks.map(d => (
          <div key={d.day} className="rounded-xl bg-white border border-amber-200 px-2.5 py-1.5">
            <p className="text-[12px] font-black text-amber-700">{d.day}</p>
            {d.items.length === 0 && <p className="text-[11px] text-slate-500">راحة / مراجعة حرة</p>}
            {d.items.map(it => { const k = d.day + it.label; return (
              <label key={k} className="flex items-center gap-2 text-[12px] font-bold text-slate-800 cursor-pointer">
                <input type="checkbox" data-testid="plan-check" checked={!!done[k]} onChange={() => toggle(k)} />
                <span className={done[k] ? 'line-through text-slate-400' : ''}>{it.kind === 'review' ? '🔁' : '📘'} {it.label}</span>
              </label>); })}
          </div>
        ))}
      </div>
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
    const words = Array.from(new Set(l.content.example.flatMap(e => norm(speakable(e.en))).filter(w => w.length >= 5))).slice(0, 6);
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

/** One-page Sara tool (same look as the track player). */
export const SaraTools: React.FC<Props> = ({ tool, onClose, uid, unlockAll, onPlacementDone }) => {
  if (!tool) return null;
  const p = { uid, unlockAll };
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-track-page" className="relative w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
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
        {tool === 'plan' && <StudyPlan {...p} />}
        {tool === 'roleplay' && <RolePlay {...p} />}
        {tool === 'pronunciation' && <Pronunciation {...p} />}
        {tool === 'voicecoach' && <VoiceCoach {...p} />}
      </div>
    </div>
  );
};
export default SaraTools;
