import { L, useExplainLang } from '../lib/explainLang';
import React, { useEffect, useMemo, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { SaraProgressPanel } from './SaraProgressPanel';

/**
 * Parent weekly report in 3 one-page steps (التقرير / الأنشطة / الهدف).
 * Real data only:
 *  - lessonResults (userId == child): completion time = timestamp | completedAt | createdAt.
 *    "Completed this week" = DISTINCT (courseId|lessonId) with a completion time in the last 7 days.
 *  - tutorMemory/{child}/sessions: minutes = sum(endedAt - startedAt) for sessions started in last 7 days.
 *  - tutorMemory/{child}.wordsLearned (no per-word dates → shown as "latest words", not "this week").
 *  - users/{child}/saraLevelTests: latest level test.
 *  - users/{child}.weeklyGoalLessons: goal set by the parent.
 */

interface Props {
  student: { uid: string; displayName?: string } | null | undefined;
  parentUid: string;
  isParentAdmin?: boolean;
}

const DAY = 24 * 60 * 60 * 1000;
const GOAL_PRESETS = [1, 2, 3, 5, 7];
const NAVY = '#002147';
const GOLD = '#C49E3A';

function toMs(v: any): number {
  if (!v) return 0;
  if (typeof v.toMillis === 'function') return v.toMillis();
  if (typeof v.seconds === 'number') return v.seconds * 1000;
  if (typeof v === 'number') return v;
  const t = new Date(v).getTime();
  return isNaN(t) ? 0 : t;
}

function skillOf(d: any): string {
  const s = `${d.courseId || ''} ${d.lessonId || ''} ${d.lessonTitle || ''}`.toLowerCase();
  if (s.includes('grammar')) return 'القواعد';
  if (s.includes('reading') || s.includes('story')) return 'القراءة';
  if (s.includes('pronunciation') || s.includes('conversation') || s.includes('dialogue') || s.includes('speak')) return 'المحادثة والنطق';
  if (s.includes('vocab') || s.includes('spelling') || s.includes('word')) return 'المفردات';
  if (s.includes('listen')) return 'الاستماع';
  return '';
}

export interface WeeklyReportData {
  completed: { key: string; title: string; at: number; pct: number | null }[];
  minutes: number | null; // null = no timed sessions
  sessions: { at: number; summary: string; skill: string }[];
  lastTest: { pct: number; correct: number; total: number; name: string; at: number } | null;
  weakest: { name: string; avg: number } | null;
  words: string[];
  goal: number | null;
}

export async function loadWeeklyReportData(uid: string, parentUid: string = auth.currentUser?.uid || ''): Promise<WeeklyReportData> {
      const empty: WeeklyReportData = { completed: [], minutes: null, sessions: [], lastTest: null, weakest: null, words: [], goal: null };
  if (uid.startsWith('sim_') || !auth.currentUser) return empty;
  const since = Date.now() - 7 * DAY;
  const out: WeeklyReportData = { ...empty };

  // All reads in parallel (independent queries)
  let lvl: WeeklyReportData['lastTest'] = null;
  await Promise.all([
  (async () => {
  // 1) lesson results
  try {
    let snap;
    try { snap = await getDocs(query(collection(db, 'lessonResults'), where('userId', '==', uid))); }
    catch { snap = await getDocs(query(collection(db, 'lessonResults'), where('userId', '==', uid), where('parentIds', 'array-contains', parentUid))); }
    const byKey = new Map<string, { key: string; title: string; at: number; pct: number | null; raw: any }>();
    let latestScored: { pct: number; correct: number; total: number; name: string; at: number } | null = null;
    snap.forEach(s => {
      const d: any = s.data();
      const at = toMs(d.timestamp) || toMs(d.completedAt) || toMs(d.createdAt);
      if (!at) return; // no completion date → never counted
      const total = Number(d.total) || 0;
      const correct = typeof d.score === 'number' ? d.score : NaN;
      const pct = total > 0 && !isNaN(correct) ? Math.max(0, Math.min(100, Math.round((correct / total) * 100))) : (typeof d.percentage === 'number' ? Math.round(d.percentage) : null);
      if (total > 0 && !isNaN(correct) && (!latestScored || at > latestScored.at)) {
        latestScored = { pct: pct ?? 0, correct, total, name: String(d.lessonTitle || d.lessonId || 'درس'), at };
      }
      if (at < since) return;
      const key = `${d.courseId || ''}|${d.lessonId || s.id}`;
      const prev = byKey.get(key);
      if (!prev || at > prev.at) byKey.set(key, { key, title: String(d.lessonTitle || d.lessonId || 'درس'), at, pct, raw: d });
    });
    const list = Array.from(byKey.values()).sort((a, b) => b.at - a.at);
    out.completed = list.map(({ key, title, at, pct }) => ({ key, title, at, pct }));
    out.lastTest = latestScored;
    const skills = new Map<string, { sum: number; n: number }>();
    list.forEach(r => { const k = skillOf(r.raw); if (!k || r.pct === null) return; const v = skills.get(k) || { sum: 0, n: 0 }; v.sum += r.pct; v.n++; skills.set(k, v); });
    const ranked = Array.from(skills.entries()).map(([name, v]) => ({ name, avg: Math.round(v.sum / v.n) })).sort((a, b) => a.avg - b.avg);
    out.weakest = ranked.length >= 2 ? ranked[0] : null;
  } catch (e) { console.debug('weekly report lessonResults note:', e); }

  })(),
  (async () => {
  // 2) latest level test (newer than lesson quiz wins)
  try {
    const lt = await getDocs(collection(db, 'users', uid, 'saraLevelTests'));
    lt.forEach(s => {
      const a: any = s.data();
      const at = Number(a.createdAtMs) || 0;
      if (at && (!lvl || at > lvl.at) && typeof a.score === 'number') {
        lvl = { pct: Math.round(a.score), correct: Number(a.correct) || 0, total: Number(a.total) || 0, name: `اختبار ${a.levelTitleAr || a.levelId || 'المستوى'}`, at };
      }
    });
  } catch (e) { console.debug('weekly report level tests note:', e); }

  })(),
  (async () => {
  // 3) Sara sessions + words
  try {
    const [mem, ss] = await Promise.all([getDoc(doc(db, 'tutorMemory', uid)), getDocs(collection(db, 'tutorMemory', uid, 'sessions'))]);
    if (mem.exists()) out.words = ((mem.data() as any).wordsLearned || []).filter((w: any) => typeof w === 'string').slice(-8).reverse();
    let mins = 0; let timed = 0;
    ss.forEach(s => {
      const d: any = s.data();
      const st = toMs(d.startedAt);
      if (!st || st < since) return;
      out.sessions.push({ at: st, summary: String(d.summary || ''), skill: String(d.skill || '') });
      const en = toMs(d.endedAt);
      if (en > st && en - st < 4 * 60 * 60 * 1000) { mins += (en - st) / 60000; timed++; }
    });
    out.sessions.sort((a, b) => b.at - a.at);
    out.minutes = timed > 0 ? Math.round(mins) : null;
  } catch (e) { console.debug('weekly report sessions note:', e); }

  })(),
  (async () => {
  // 4) goal
  try {
    const u = await getDoc(doc(db, 'users', uid));
    const g = u.exists() ? Number((u.data() as any).weeklyGoalLessons) : NaN;
    out.goal = Number.isInteger(g) && g >= 1 && g <= 14 ? g : null;
  } catch (e) { console.debug('weekly report goal note:', e); }

  })(),
  ]);
  if (lvl && (!out.lastTest || (lvl as any).at > out.lastTest.at)) out.lastTest = lvl;
  return out;
}

export const ParentWeeklyStepsReport: React.FC<Props> = ({ student, parentUid, isParentAdmin = false }) => {
  const [plang] = useExplainLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WeeklyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [goalDraft, setGoalDraft] = useState<number>(3);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const uid = student?.uid;
    if (!uid) return;
    setLoading(true);
    (async () => {
      const out = await loadWeeklyReportData(uid, parentUid);
      if (alive) { setData(out); setGoalDraft(out.goal ?? 3); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [student?.uid, parentUid]);

  const done = data?.completed.length ?? 0;
  const goal = data?.goal ?? null;
  const pct = goal ? Math.min(100, Math.round((done / goal) * 100)) : 0;
  const exceeded = goal !== null && done > goal;
  const fmtDate = (ms: number) => new Date(ms).toLocaleDateString('ar-SA-u-nu-latn', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Riyadh' });

  const saveGoal = async () => {
    if (!student?.uid) return;
    setSaving(true); setMsg(null);
    try {
      await setDoc(doc(db, 'users', student.uid), { weeklyGoalLessons: goalDraft }, { merge: true });
      setData(d => d ? { ...d, goal: goalDraft } : d);
      setMsg(L('تم حفظ الهدف ✓', 'Goal saved ✓'));
    } catch (e) {
      console.warn('save weekly goal failed', e);
      setMsg(L('تعذّر الحفظ، حاول لاحقاً', 'Could not save, try later'));
    } finally { setSaving(false); }
  };

  const GoalBar = ({ compact = false }: { compact?: boolean }) => (
    <div className={`rounded-2xl border border-[#C49E3A]/40 bg-[#002147] text-white ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between text-[12px] font-black">
        <span>{goal ? L(`المنجز هذا الأسبوع: ${done} من ${goal} دروس`, `Done this week: ${done} of ${goal} lessons`) : L(`المنجز هذا الأسبوع: ${done} دروس`, `Done this week: ${done} lessons`)}</span>
        {exceeded && <span className="text-[#C49E3A]">{L("تجاوز الهدف 🎉", "Goal exceeded 🎉")}</span>}
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-white/15 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${goal ? pct : 0}%`, background: GOLD }} />
      </div>
      {!goal && <p className="mt-1.5 text-[11px] text-white/70">{L("لم يُحدَّد هدف أسبوعي بعد", "No weekly goal set yet")}</p>}
    </div>
  );

  const Tile = ({ label, value, note }: { label: string; value: string; note?: string }) => (
    <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 p-3 flex flex-col justify-between min-h-0">
      <p className="text-[11px] font-bold text-white/70 leading-tight">{label}</p>
      <p className="text-[20px] font-black leading-tight" style={{ color: GOLD }}>{value}</p>
      {note && <p className="text-[10.5px] font-bold text-white/70 leading-tight line-clamp-2">{note}</p>}
    </div>
  );

  const steps = [L('١. التقرير', '1. Report'), L('٢. الأنشطة', '2. Activity'), L('٣. الهدف', '3. Goal')];

  const body = useMemo(() => {
    if (loading || !data) return <div className="flex-1 flex items-center justify-center text-[13px] font-bold text-white/70">{L("جاري تحميل التقرير…", "Loading the report…")}</div>;
    if (step === 0) return (
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="relative">
          <GoalBar compact />
          <button onClick={() => setStep(2)} className="absolute top-2.5 left-3 text-[11px] font-black text-[#C49E3A] underline">{L("تعديل الهدف", "Edit goal")}</button>
        </div>
        <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
          <Tile label={L("الدروس المنجزة (7 أيام)", "Lessons completed (7 days)")} value={String(done)} note={done ? L('دروس مختلفة بدون تكرار', 'Distinct lessons, no repeats') : L('لا دروس مكتملة هذا الأسبوع', 'No lessons completed this week')} />
          <Tile label={L("الدقائق الفعلية المسجلة", "Recorded minutes")} value={data.minutes === null ? '—' : `${data.minutes} د`} note={data.minutes === null ? 'لا توجد جلسات مؤقّتة مع سارة' : 'من جلسات سارة المسجّلة'} />
          <Tile label={L("آخر نتيجة اختبار", "Latest test result")} value={data.lastTest ? `${data.lastTest.pct}%` : '—'} note={data.lastTest ? `${data.lastTest.total ? `(${data.lastTest.correct}/${data.lastTest.total}) ` : ''}${data.lastTest.name}` : 'لا يوجد اختبار مسجّل'} />
          <Tile label={L("أضعف مهارة", "Weakest skill")} value={data.weakest ? data.weakest.name : '—'} note={data.weakest ? `المتوسط ${data.weakest.avg}%` : 'بيانات غير كافية هذا الأسبوع'} />
        </div>
      </div>
    );
    if (step === 1) {
      const items = [
        ...data.completed.map(c => ({ at: c.at, text: `${L('أكمل درس:', 'Completed lesson:')} ${c.title}${c.pct !== null ? ` · ${c.pct}%` : ''}`, icon: '📘' })),
        ...data.sessions.map(s => ({ at: s.at, text: `${L('جلسة مع سارة', 'Session with Sara')}${s.skill ? ` (${s.skill})` : ''}${s.summary ? `: ${s.summary}` : ''}`, icon: '🎙️' })),
      ].sort((a, b) => b.at - a.at).slice(0, 4);
      return (
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 p-3">
            <p className="text-[12px] font-black mb-2" style={{ color: GOLD }}>{L("كلمات تعلّمها مؤخراً", "Recently learned words")}</p>
            {data.words.length ? (
              <div className="flex flex-wrap gap-1.5">{data.words.map((w, i) => <span key={i} className="px-2 py-0.5 rounded-full text-[11.5px] font-bold bg-[#C49E3A]/20 text-[#F5E6B8]" dir="ltr">{w}</span>)}</div>
            ) : <p className="text-[11.5px] font-bold text-white/70">{L("— لا توجد كلمات مسجّلة بعد", "No words recorded yet")}</p>}
            <p className="mt-1.5 text-[10px] text-white/55">{L("آخر الكلمات من ذاكرة سارة (غير مؤرّخة بالأسبوع)", "Latest words from Sara's memory (not limited to this week)")}</p>
          </div>
          <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 p-3 flex-1 min-h-0 overflow-hidden">
            <p className="text-[12px] font-black mb-2" style={{ color: GOLD }}>{L("آخر النشاطات", "Recent activity")}</p>
            {items.length ? (
              <ul className="space-y-1.5">{items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-[11.5px] font-bold text-white">
                  <span>{it.icon}</span><span className="flex-1 line-clamp-1">{it.text}</span><span className="text-white/55 whitespace-nowrap">{fmtDate(it.at)}</span>
                </li>))}</ul>
            ) : <div className="h-full flex items-center justify-center text-[13px] font-black text-white/70">{L("لا يوجد نشاط هذا الأسبوع", "No activity this week")}</div>}
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 p-3">
          <p className="text-[12px] font-black mb-2" style={{ color: GOLD }}>{L("حدّد هدف الدروس الأسبوعي", "Set the weekly lesson goal")}</p>
          <div className="flex gap-1.5 justify-between">
            {GOAL_PRESETS.map(g => (
              <button key={g} onClick={() => setGoalDraft(g)} className={`flex-1 py-2 rounded-xl text-[13px] font-black border ${goalDraft === g ? 'bg-[#002147] text-[#C49E3A] border-[#C49E3A]' : 'bg-[#0a2d5c] text-white border-[#C49E3A]/30'}`}>{g}</button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button aria-label={L("إنقاص", "Decrease")} onClick={() => setGoalDraft(g => Math.max(1, g - 1))} className="w-10 h-10 rounded-full bg-[#002147] border border-[#C49E3A]/50 text-[20px] font-black text-[#C49E3A]">−</button>
            <span className="text-[22px] font-black min-w-[72px] text-center" style={{ color: GOLD }}>{goalDraft} {L("دروس", "lessons")}</span>
            <button aria-label={L("زيادة", "Increase")} onClick={() => setGoalDraft(g => Math.min(14, g + 1))} className="w-10 h-10 rounded-full bg-[#002147] border border-[#C49E3A]/50 text-[20px] font-black text-[#C49E3A]">+</button>
          </div>
          <button disabled={saving || goalDraft === goal} onClick={saveGoal} className="mt-3 w-full py-2.5 rounded-xl text-[13px] font-black disabled:opacity-50" style={{ background: GOLD, color: NAVY }}>{saving ? 'جاري الحفظ…' : 'حفظ الهدف'}</button>
          {msg && <p className="mt-1.5 text-center text-[11.5px] font-bold text-white/80">{msg}</p>}
        </div>
        <GoalBar />
      </div>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, step, goalDraft, saving, msg]);

  if (!student?.uid) return null;
  void isParentAdmin;

  return (<>
    <section dir={plang === "en" ? "ltr" : "rtl"} data-testid="parent-weekly-steps-report" className="rounded-3xl overflow-hidden border border-[#C49E3A]/40 bg-[#001a38] flex flex-col" style={{ height: 'min(560px, calc(100dvh - 140px))', minHeight: 440 }}>
      <header className="px-4 pt-3 pb-2" style={{ background: NAVY }}>
        <p className="text-[13px] font-black text-white">{L("التقرير الأسبوعي المختصر • آخر 7 أيام", "Weekly summary • last 7 days")}</p>
        <p className="text-[11px] font-bold text-[#C49E3A]">{student.displayName || L('الطالب', 'Student')}</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {steps.map((s, i) => (
            <button key={s} onClick={() => setStep(i)} className={`py-1.5 rounded-xl text-[12px] font-black ${step === i ? 'bg-[#C49E3A] text-[#002147]' : 'bg-white/10 text-white'}`}>{s}</button>
          ))}
        </div>
      </header>
      <div className="flex-1 flex flex-col p-3 min-h-0">{body}</div>
      <footer className="px-3 py-2.5 border-t border-[#C49E3A]/30 bg-[#002147] flex items-center justify-between">
        <button disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))} className="px-4 py-1.5 rounded-xl text-[12px] font-black border border-[#C49E3A]/50 text-white disabled:opacity-40">{L("السابق", "Previous")}</button>
        <span className="text-[11.5px] font-bold text-white/70">{L("خطوة", "Step")} {step + 1} {L("من", "of")} 3</span>
        <button disabled={step === 2} onClick={() => setStep(s => Math.min(2, s + 1))} className="px-4 py-1.5 rounded-xl text-[12px] font-black disabled:opacity-40" style={{ background: GOLD, color: NAVY }}>{L("التالي", "Next")}</button>
      </footer>
    </section>
    <div className="mt-3"><SaraProgressPanel uid={student.uid} /></div>
  </>);
};

export default ParentWeeklyStepsReport;
