import React, { useEffect, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { toPng } from 'html-to-image';
import { db } from '../lib/firebase';
import { ReportExportLayout, type ReportExportData } from './ReportExportLayout';
import { loadWeeklyReportData } from './ParentWeeklyStepsReport';
import { loadTrackProgress } from '../lib/saraProgressSync';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { NEW_SKILL_TRACKS } from '../lib/saraSkills';
import { loadExamResults, type ExamResults } from '../lib/saraExamSync';
import { EXAM_SETS } from '../data/saraTracks/examPrep';
import { loadCallRecords, type CallRecord } from '../lib/saraCallLink';
import { loadLevelTestAttempts, summarizeLevelTests, LEVEL_TEST_PASS, type LevelTestSummary } from '../lib/saraLevelTests';

/** Sara end-of-level tests per track/level: latest + best score, pass/fail, weak lessons, date. Used in parent report + analytics. */
export const SaraLevelTestsReport: React.FC<{ studentId?: string; isRtl?: boolean }> = ({ studentId, isRtl = true }) => {
  const [rows, setRows] = useState<LevelTestSummary[] | null>(null);
  const [prog, setProg] = useState<Record<string, number>>({});
  const [exam, setExam] = useState<ExamResults>({});
  const [calls, setCalls] = useState<CallRecord[]>([]);
  useEffect(() => {
    if (!studentId) { setRows([]); return; }
    let alive = true;
    loadLevelTestAttempts(studentId).then(list => { if (alive) setRows(summarizeLevelTests(list)); });
    loadTrackProgress(studentId).then(p => { if (alive) setProg(p); });
    loadExamResults(studentId).then(e => { if (alive) setExam(e); });
    loadCallRecords(studentId).then(c => { if (alive) setCalls(c); });
    return () => { alive = false; };
  }, [studentId]);
  const [who, setWho] = useState<{ name: string; level?: string }>({ name: 'الطالب' });
  const [exportData, setExportData] = useState<ReportExportData | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!studentId) return;
    getDoc(doc(db, 'users', studentId)).then(s => { const d: any = s.data() || {}; setWho({ name: d.displayName || 'الطالب', level: d.level || undefined }); }).catch(() => {});
  }, [studentId]);
  const ALL_TRACKS = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...NEW_SKILL_TRACKS];
  const doneOf = (t: { id: string; lessons: unknown[] }) => Math.min(t.lessons.length, Math.max(0, (Number(prog[t.id]) || 1) - 1));
  const dur = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  const handleExport = async () => {
    if (!studentId || exporting) return;
    setExporting(true); setExportMsg(null);
    try {
      const wk = await loadWeeklyReportData(studentId).catch(() => null);
      const lt = wk?.lastTest;
      setExportData({
        studentName: who.name, level: who.level,
        dateLabel: new Date().toLocaleDateString('ar-SA-u-nu-latn', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Riyadh' }),
        weekly: wk ? { done: wk.completed.length, goal: wk.goal, minutes: wk.minutes, lastTest: lt ? `${lt.pct}%` : null, weakest: wk.weakest ? `${wk.weakest.name} ${wk.weakest.avg}%` : null } : null,
        tracks: ALL_TRACKS.map(t => ({ title: t.titleAr, done: doneOf(t), total: t.lessons.length })),
        levelTests: (rows || []).map(r => ({ title: `${r.trackTitleAr} · ${r.levelTitleAr}`, passed: r.best.passed, latest: r.latest.score, best: r.best.score, attempts: r.attempts, weak: r.latest.weakLessons.map(w => w.titleAr) })),
        calls: calls.slice(-5).reverse().map(c => ({ title: c.scenarioAr || c.scenario, date: fmt(c.at), duration: dur(c.seconds), turns: c.turns, words: c.words })),
        passMark: LEVEL_TEST_PASS,
      });
      await new Promise(r => setTimeout(r, 60));
      try { await (document as any).fonts?.ready; } catch { /* ignore */ }
      const node = exportRef.current;
      if (!node) throw new Error('no node');
      const imgs = Array.from(node.querySelectorAll('img'));
      await Promise.all(imgs.map(im => im.complete ? null : new Promise(res => { im.onload = im.onerror = () => res(null); })));
      const url = await toPng(node, { width: 1080, height: 1350, pixelRatio: 1, cacheBust: true, backgroundColor: '#002147' });
      const fileName = `تقرير-${who.name}-${new Date().toISOString().slice(0, 10)}.png`;
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], fileName, { type: 'image/png' });
      const nav: any = navigator;
      if (nav.canShare && nav.canShare({ files: [file] })) {
        try { await nav.share({ files: [file], title: 'تقرير أكاديمية باسم الخليل' }); setExportMsg('تمت المشاركة ✓'); return; } catch (e: any) { if (e?.name === 'AbortError') return; }
      }
      const a = document.createElement('a'); a.href = url; a.download = fileName; document.body.appendChild(a); a.click(); a.remove();
      setExportMsg('تم تنزيل الصورة ✓');
    } catch (e) {
      console.warn('report export failed', e); setExportMsg('تعذّر التصدير، حاول مرة ثانية');
    } finally { setExporting(false); }
  };
  const fmt = (ms: number) => new Date(ms).toLocaleDateString(isRtl ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const N = '#002147', G = '#C49E3A';
  return (
    <div data-testid="sara-level-tests-report" dir={isRtl ? 'rtl' : 'ltr'} className="rounded-3xl p-4 sm:p-5 space-y-4 border border-[#C49E3A]/40 shadow-lg" style={{ background: `linear-gradient(160deg, ${N}, #001428)` }}>
      <div className="flex items-center gap-2">
        <span className="w-9 h-9 rounded-xl bg-[#C49E3A]/15 border border-[#C49E3A]/40 flex items-center justify-center text-lg">🏁</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-black text-[#C49E3A] leading-tight">{isRtl ? 'اختبارات نهاية المستوى مع سارة' : "Sara's end-of-level tests"}</h3>
          <p className="text-[10.5px] font-bold text-white/60">{isRtl ? `درجة النجاح ${LEVEL_TEST_PASS}%` : `Pass mark ${LEVEL_TEST_PASS}%`}</p>
        </div>
        <button type="button" data-testid="report-export-btn" onClick={handleExport} disabled={exporting || !studentId} className="shrink-0 px-3 py-2 rounded-xl text-[11.5px] font-black disabled:opacity-50" style={{ background: G, color: N }}>
          {exporting ? (isRtl ? 'جاري التجهيز…' : 'Preparing…') : (isRtl ? '🖼️ تصدير كصورة' : '🖼️ Export image')}
        </button>
      </div>
      {exportMsg && <p className="text-[11px] font-bold text-[#F5E6B8] text-center">{exportMsg}</p>}
      {Object.keys(prog).length > 0 && (
        <div data-testid="sara-track-progress" className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ALL_TRACKS.map(t => {
            const done = doneOf(t);
            const full = done >= t.lessons.length;
            return (
              <div key={t.id} className={`rounded-2xl px-2.5 py-2 border ${full ? 'border-[#C49E3A]' : 'border-[#C49E3A]/25'}`} style={{ background: '#0a2d5c' }}>
                <p className="text-[10px] font-bold text-white/70 truncate">{t.titleAr}</p>
                <p className="text-[13px] font-black text-[#C49E3A] leading-tight">{done} {isRtl ? 'من' : '/'} {t.lessons.length} <span className="text-[10px] text-white/60">{isRtl ? 'درس' : 'lessons'}</span>{full && ' ✓'}</p>
                <div className="h-1.5 rounded-full bg-white/10 mt-1"><div className="h-full rounded-full bg-[#C49E3A]" style={{ width: `${(done / t.lessons.length) * 100}%` }} /></div>
              </div>
            );
          })}
        </div>
      )}
      {rows === null && <p className="text-xs text-white/60 font-bold">{isRtl ? 'جاري التحميل…' : 'Loading…'}</p>}
      {rows && rows.length === 0 && <p className="text-xs text-white/70 font-bold rounded-2xl border border-dashed border-[#C49E3A]/30 p-3 text-center">{isRtl ? 'ما فيه اختبارات مستوى بعد. تفتح بعد اجتياز الدرس الأخير من كل مستوى.' : 'No level tests yet.'}</p>}
      {rows && rows.length > 0 && (
        <div className="grid gap-2">
          {rows.map(r => (
            <div key={`${r.trackId}:${r.levelId}`} className={`rounded-2xl p-3 border ${r.best.passed ? 'border-[#C49E3A]/70' : 'border-rose-400/50'}`} style={{ background: '#0a2d5c' }}>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-black text-white flex-1 min-w-0 truncate">{r.trackTitleAr} · {r.levelTitleAr}</span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${r.best.passed ? 'bg-[#C49E3A] text-[#002147]' : 'bg-rose-500/90 text-white'}`}>{r.best.passed ? (isRtl ? 'ناجح ✓' : 'Passed') : (isRtl ? 'لم ينجح بعد' : 'Not yet')}</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
                {[[isRtl ? 'آخر نتيجة' : 'Latest', `${r.latest.score}%`], [isRtl ? 'أفضل نتيجة' : 'Best', `${r.best.score}%`], [isRtl ? 'المحاولات' : 'Attempts', String(r.attempts)]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-[#002147] border border-[#C49E3A]/20 py-1.5">
                    <p className="text-[10px] font-bold text-white/60">{k}</p>
                    <p className="text-[15px] font-black text-[#C49E3A] leading-tight">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10.5px] font-bold text-white/55">
                <span>{fmt(r.latest.createdAtMs)}</span>
              </div>
              {r.latest.weakLessons.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span className="text-[10.5px] font-black text-[#F5E6B8]">{isRtl ? 'دروس ضعيفة:' : 'Weak lessons:'}</span>
                  {r.latest.weakLessons.slice(0, 5).map(w => <span key={w.id} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/85">{w.order}. {w.titleAr}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {EXAM_SETS.some(x => exam[x.id]) && (
        <div data-testid="sara-exam-report" className="space-y-1.5">
          <p className="text-[12px] font-black text-[#C49E3A]">{isRtl ? '🎓 تدريب IELTS و STEP (عدد الإجابات الصحيحة والوقت — ليس توقعاً للدرجة)' : '🎓 IELTS & STEP practice (raw correct answers and time — not a score prediction)'}</p>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {EXAM_SETS.filter(x => exam[x.id]).map(x => { const r = exam[x.id]; return (
              <div key={x.id} className="rounded-2xl border border-[#C49E3A]/25 px-3 py-2" style={{ background: '#0a2d5c' }}>
                <p className="text-[11px] font-black text-white truncate">{x.exam} · {x.kind === 'reading' ? (isRtl ? 'قراءة' : 'Reading') : (isRtl ? 'استماع' : 'Listening')} · {x.titleEn}</p>
                <p className="text-[11px] font-bold text-white/70">{isRtl ? 'أفضل' : 'Best'}: <b className="text-[#C49E3A]">{r.correct}/{r.total}</b> ({dur(r.timeSec)}) · {isRtl ? 'آخر' : 'Last'}: {r.lastCorrect}/{r.total} ({dur(r.lastTimeSec)}) · {isRtl ? 'محاولات' : 'Attempts'}: {r.attempts} · {fmt(r.lastAt)}</p>
              </div>); })}
          </div>
        </div>
      )}
      {calls.length > 0 && (
        <div data-testid="sara-calls-report" className="space-y-2">
          <p className="text-[12.5px] font-black text-[#C49E3A]">{isRtl ? '📞 مكالمات المحادثة مع سارة (آخر 5)' : '📞 Speaking calls with Sara (last 5)'}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {calls.slice(-5).reverse().map(c => (
              <div key={c.at} className="rounded-2xl border border-[#C49E3A]/25 px-3 py-2.5 space-y-1" style={{ background: '#0a2d5c' }}>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-black text-white truncate flex-1">{isRtl ? c.scenarioAr : c.scenario}</span>
                  <span className="text-[10.5px] font-bold text-white/55 shrink-0">{fmt(c.at)}</span>
                </div>
                <div className="flex gap-1.5 text-[10.5px] font-black">
                  <span className="px-2 py-0.5 rounded-full bg-[#002147] text-[#C49E3A]">⏱ {dur(c.seconds)}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#002147] text-[#C49E3A]">{c.turns} {isRtl ? 'مداخلة' : 'turns'}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#002147] text-[#C49E3A]">{c.words} {isRtl ? 'كلمة' : 'words'}</span>
                </div>
                {c.review && <p className="text-[10.5px] font-bold text-white/80 line-clamp-2">📝 {c.review.verdictAr} {c.review.points.slice(0, 2).map(p => `«${p.said}» ← ${p.better}`).join(' · ')}</p>}
                {c.topicEn && <p className="text-[10px] font-bold text-[#F5E6B8] truncate">{isRtl ? `موضوع اليوم (${c.dateKey || c.weekKey || ''}): ${c.topicAr || c.topicEn}` : `Daily topic (${c.dateKey || c.weekKey || ''}): ${c.topicEn}`}</p>}
                {c.focus?.length > 0 && <p className="text-[10px] font-bold text-white/60 truncate">{isRtl ? 'التركيز: ' : 'Focus: '}{c.focus.join(' · ')}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {exportData && (
        <div aria-hidden style={{ position: 'fixed', left: -20000, top: 0, pointerEvents: 'none' }}>
          <ReportExportLayout ref={exportRef} data={exportData} logoSrc="/icon-512.png" />
        </div>
      )}
    </div>
  );
};
