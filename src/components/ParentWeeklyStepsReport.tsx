import React, { useEffect, useMemo, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

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

interface Data {
  completed: { key: string; title: string; at: number; pct: number | null }[];
  minutes: number | null; // null = no timed sessions
  sessions: { at: number; summary: string; skill: string }[];
  lastTest: { pct: number; correct: number; total: number; name: string; at: number } | null;
  weakest: { name: string; avg: number } | null;
  words: string[];
  goal: number | null;
}

export const ParentWeeklyStepsReport: React.FC<Props> = ({ student, parentUid, isParentAdmin = false }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data | null>(null);
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
      const empty: Data = { completed: [], minutes: null, sessions: [], lastTest: null, weakest: null, words: [], goal: null };
      if (uid.startsWith('sim_') || !auth.currentUser) { if (alive) { setData(empty); setLoading(false); } return; }
      const since = Date.now() - 7 * DAY;
      const out: Data = { ...empty };

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

      // 2) latest level test (newer than lesson quiz wins)
      try {
        const lt = await getDocs(collection(db, 'users', uid, 'saraLevelTests'));
        lt.forEach(s => {
          const a: any = s.data();
          const at = Number(a.createdAtMs) || 0;
          if (at && (!out.lastTest || at > out.lastTest.at) && typeof a.score === 'number') {
            out.lastTest = { pct: Math.round(a.score), correct: Number(a.correct) || 0, total: Number(a.total) || 0, name: `اختبار ${a.levelTitleAr || a.levelId || 'المستوى'}`, at };
          }
        });
      } catch (e) { console.debug('weekly report level tests note:', e); }

      // 3) Sara sessions + words
      try {
        const mem = await getDoc(doc(db, 'tutorMemory', uid));
        if (mem.exists()) out.words = ((mem.data() as any).wordsLearned || []).filter((w: any) => typeof w === 'string').slice(-8).reverse();
        const ss = await getDocs(collection(db, 'tutorMemory', uid, 'sessions'));
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

      // 4) goal
      try {
        const u = await getDoc(doc(db, 'users', uid));
        const g = u.exists() ? Number((u.data() as any).weeklyGoalLessons) : NaN;
        out.goal = Number.isInteger(g) && g >= 1 && g <= 14 ? g : null;
      } catch (e) { console.debug('weekly report goal note:', e); }

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
      setMsg('تم حفظ الهدف ✓');
    } catch (e) {
      console.warn('save weekly goal failed', e);
      setMsg('تعذّر الحفظ، حاول لاحقاً');
    } finally { setSaving(false); }
  };

  const GoalBar = ({ compact = false }: { compact?: boolean }) => (
    <div className={`rounded-2xl border border-[#C49E3A]/40 bg-[#002147] text-white ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between text-[12px] font-black">
        <span>{goal ? `المنجز هذا الأسبوع: ${done} من ${goal} دروس` : `المنجز هذا الأسبوع: ${done} دروس`}</span>
        {exceeded && <span className="text-[#C49E3A]">تجاوز الهدف 🎉</span>}
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-white/15 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${goal ? pct : 0}%`, background: GOLD }} />
      </div>
      {!goal && <p className="mt-1.5 text-[11px] text-white/70">لم يُحدَّد هدف أسبوعي بعد</p>}
    </div>
  );

  const Tile = ({ label, value, note }: { label: string; value: string; note?: string }) => (
    <div className="rounded-2xl bg-white border border-slate-200 p-3 flex flex-col justify-between min-h-0">
      <p className="text-[11px] font-bold text-slate-500 leading-tight">{label}</p>
      <p className="text-[20px] font-black leading-tight" style={{ color: NAVY }}>{value}</p>
      {note && <p className="text-[10.5px] font-bold text-slate-500 leading-tight line-clamp-2">{note}</p>}
    </div>
  );

  const steps = ['١. التقرير', '٢. الأنشطة', '٣. الهدف'];

  const body = useMemo(() => {
    if (loading || !data) return <div className="flex-1 flex items-center justify-center text-[13px] font-bold text-slate-500">جاري تحميل التقرير…</div>;
    if (step === 0) return (
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="relative">
          <GoalBar compact />
          <button onClick={() => setStep(2)} className="absolute top-2.5 left-3 text-[11px] font-black text-[#C49E3A] underline">تعديل الهدف</button>
        </div>
        <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
          <Tile label="الدروس المنجزة (7 أيام)" value={String(done)} note={done ? 'دروس مختلفة بدون تكرار' : 'لا دروس مكتملة هذا الأسبوع'} />
          <Tile label="الدقائق الفعلية المسجلة" value={data.minutes === null ? '—' : `${data.minutes} د`} note={data.minutes === null ? 'لا توجد جلسات مؤقّتة مع سارة' : 'من جلسات سارة المسجّلة'} />
          <Tile label="آخر نتيجة اختبار" value={data.lastTest ? `${data.lastTest.pct}%` : '—'} note={data.lastTest ? `${data.lastTest.total ? `(${data.lastTest.correct}/${data.lastTest.total}) ` : ''}${data.lastTest.name}` : 'لا يوجد اختبار مسجّل'} />
          <Tile label="أضعف مهارة" value={data.weakest ? data.weakest.name : '—'} note={data.weakest ? `المتوسط ${data.weakest.avg}%` : 'بيانات غير كافية هذا الأسبوع'} />
        </div>
      </div>
    );
    if (step === 1) {
      const items = [
        ...data.completed.map(c => ({ at: c.at, text: `أكمل درس: ${c.title}${c.pct !== null ? ` · ${c.pct}%` : ''}`, icon: '📘' })),
        ...data.sessions.map(s => ({ at: s.at, text: `جلسة مع سارة${s.skill ? ` (${s.skill})` : ''}${s.summary ? `: ${s.summary}` : ''}`, icon: '🎙️' })),
      ].sort((a, b) => b.at - a.at).slice(0, 4);
      return (
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          <div className="rounded-2xl bg-white border border-slate-200 p-3">
            <p className="text-[12px] font-black mb-2" style={{ color: NAVY }}>كلمات تعلّمها مؤخراً</p>
            {data.words.length ? (
              <div className="flex flex-wrap gap-1.5">{data.words.map((w, i) => <span key={i} className="px-2 py-0.5 rounded-full text-[11.5px] font-bold bg-[#C49E3A]/15 text-[#002147]" dir="ltr">{w}</span>)}</div>
            ) : <p className="text-[11.5px] font-bold text-slate-500">— لا توجد كلمات مسجّلة بعد</p>}
            <p className="mt-1.5 text-[10px] text-slate-400">آخر الكلمات من ذاكرة سارة (غير مؤرّخة بالأسبوع)</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-3 flex-1 min-h-0 overflow-hidden">
            <p className="text-[12px] font-black mb-2" style={{ color: NAVY }}>آخر النشاطات</p>
            {items.length ? (
              <ul className="space-y-1.5">{items.map((it, i) => (
                <li key={i} className="flex items-start gap-2 text-[11.5px] font-bold text-slate-700">
                  <span>{it.icon}</span><span className="flex-1 line-clamp-1">{it.text}</span><span className="text-slate-400 whitespace-nowrap">{fmtDate(it.at)}</span>
                </li>))}</ul>
            ) : <div className="h-full flex items-center justify-center text-[13px] font-black text-slate-500">لا يوجد نشاط هذا الأسبوع</div>}
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="rounded-2xl bg-white border border-slate-200 p-3">
          <p className="text-[12px] font-black mb-2" style={{ color: NAVY }}>حدّد هدف الدروس الأسبوعي</p>
          <div className="flex gap-1.5 justify-between">
            {GOAL_PRESETS.map(g => (
              <button key={g} onClick={() => setGoalDraft(g)} className={`flex-1 py-2 rounded-xl text-[13px] font-black border ${goalDraft === g ? 'bg-[#002147] text-[#C49E3A] border-[#C49E3A]' : 'bg-white text-[#002147] border-slate-200'}`}>{g}</button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button aria-label="إنقاص" onClick={() => setGoalDraft(g => Math.max(1, g - 1))} className="w-10 h-10 rounded-full bg-slate-100 text-[20px] font-black text-[#002147]">−</button>
            <span className="text-[22px] font-black min-w-[72px] text-center" style={{ color: NAVY }}>{goalDraft} دروس</span>
            <button aria-label="زيادة" onClick={() => setGoalDraft(g => Math.min(14, g + 1))} className="w-10 h-10 rounded-full bg-slate-100 text-[20px] font-black text-[#002147]">+</button>
          </div>
          <button disabled={saving || goalDraft === goal} onClick={saveGoal} className="mt-3 w-full py-2.5 rounded-xl text-[13px] font-black disabled:opacity-50" style={{ background: GOLD, color: NAVY }}>{saving ? 'جاري الحفظ…' : 'حفظ الهدف'}</button>
          {msg && <p className="mt-1.5 text-center text-[11.5px] font-bold text-slate-600">{msg}</p>}
        </div>
        <GoalBar />
      </div>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, step, goalDraft, saving, msg]);

  if (!student?.uid) return null;
  void isParentAdmin;

  return (
    <section dir="rtl" data-testid="parent-weekly-steps-report" className="rounded-3xl overflow-hidden border border-[#C49E3A]/40 bg-slate-50 flex flex-col" style={{ height: 'min(560px, calc(100dvh - 140px))', minHeight: 440 }}>
      <header className="px-4 pt-3 pb-2" style={{ background: NAVY }}>
        <p className="text-[13px] font-black text-white">التقرير الأسبوعي المختصر • آخر 7 أيام</p>
        <p className="text-[11px] font-bold text-[#C49E3A]">{student.displayName || 'الطالب'}</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {steps.map((s, i) => (
            <button key={s} onClick={() => setStep(i)} className={`py-1.5 rounded-xl text-[12px] font-black ${step === i ? 'bg-[#C49E3A] text-[#002147]' : 'bg-white/10 text-white'}`}>{s}</button>
          ))}
        </div>
      </header>
      <div className="flex-1 flex flex-col p-3 min-h-0">{body}</div>
      <footer className="px-3 py-2.5 border-t border-slate-200 bg-white flex items-center justify-between">
        <button disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))} className="px-4 py-1.5 rounded-xl text-[12px] font-black border border-slate-200 text-[#002147] disabled:opacity-40">السابق</button>
        <span className="text-[11.5px] font-bold text-slate-500">خطوة {step + 1} من 3</span>
        <button disabled={step === 2} onClick={() => setStep(s => Math.min(2, s + 1))} className="px-4 py-1.5 rounded-xl text-[12px] font-black disabled:opacity-40" style={{ background: NAVY, color: GOLD }}>التالي</button>
      </footer>
    </section>
  );
};

export default ParentWeeklyStepsReport;
