import React from 'react';

/** Self-contained (inline styles) shareable report: 1080 wide, height grows with content (cap ~1920). Real data only; missing → "—". */
export interface ReportExportData {
  studentName: string;
  level?: string;
  dateLabel: string;
  weekly?: { done: number; goal: number | null; minutes: number | null; lastTest: string | null; weakest: string | null } | null;
  tracks: { title: string; done: number; total: number }[];
  levelTests: { title: string; passed: boolean; latest: number; best: number; attempts: number; date?: string; weak: string[] }[];
  calls: { title: string; date: string; duration: string; turns: number; words: number; verdict?: string; corrections?: string[]; topic?: string; focus?: string[] }[];
  passMark: number;
  sampleLabel?: string;
}

const NAVY = '#002147', NAVY2 = '#0a2d5c', GOLD = '#C49E3A', GOLD_L = '#F5E6B8';
const font = "'Cairo','Tajawal','IBM Plex Sans Arabic',sans-serif";
const card: React.CSSProperties = { background: NAVY2, border: `2px solid ${GOLD}55`, borderRadius: 26, padding: '18px 22px' };
const h: React.CSSProperties = { color: GOLD, fontSize: 27, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.3 };
const one: React.CSSProperties = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const chip: React.CSSProperties = { background: NAVY, color: GOLD, fontWeight: 900, fontSize: 17, padding: '3px 12px', borderRadius: 999, whiteSpace: 'nowrap' };

export const ReportExportLayout = React.forwardRef<HTMLDivElement, { data: ReportExportData; logoSrc: string }>(({ data, logoSrc }, ref) => {
  const w = data.weekly;
  const tiles: [string, string][] = [
    ['الدروس (7 أيام)', w ? (w.goal ? `${w.done} من ${w.goal}` : String(w.done)) : '—'],
    ['الدقائق مع سارة', w && w.minutes !== null ? `${w.minutes} د` : '—'],
    ['آخر اختبار', w?.lastTest || '—'],
    ['أضعف مهارة', w?.weakest || '—'],
  ];
  return (
    <div ref={ref} dir="rtl" style={{ width: 1080, minHeight: 1350, maxHeight: 1920, boxSizing: 'border-box', padding: '48px 50px 40px', fontFamily: font, color: '#fff', display: 'flex', flexDirection: 'column', gap: 18, background: `linear-gradient(160deg, ${NAVY} 0%, #001428 100%)`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 16, border: `3px solid ${GOLD}`, borderRadius: 38, pointerEvents: 'none' }} />
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <img src={logoSrc} alt="" width={96} height={96} style={{ borderRadius: 22, border: `3px solid ${GOLD}`, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 900, color: GOLD, lineHeight: 1.3 }}>أكاديمية باسم الخليل الرقمية</p>
          <p style={{ margin: 0, fontSize: 21, fontWeight: 700, color: GOLD_L }}>تعلّم الإنجليزية مع سارة</p>
        </div>
      </div>
      <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 19, color: '#ffffffb0', fontWeight: 700, whiteSpace: 'nowrap' }}>اختبارات نهاية المستوى مع سارة</p>
          <p style={{ margin: '2px 0 0', fontSize: 36, fontWeight: 900, lineHeight: 1.3, ...one }}>{data.studentName}</p>
        </div>
        <div style={{ textAlign: 'left', flexShrink: 0 }}>
          {data.level && <span style={{ display: 'inline-block', whiteSpace: 'nowrap', background: GOLD, color: NAVY, fontWeight: 900, fontSize: 23, padding: '4px 16px', borderRadius: 999 }}>المستوى {data.level}</span>}
          <p style={{ margin: '6px 0 0', fontSize: 19, color: '#ffffffb0', fontWeight: 700, whiteSpace: 'nowrap' }}>{data.dateLabel}</p>
        </div>
      </div>
      {/* compact weekly */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {tiles.map(([k, v]) => (
          <div key={k} style={{ background: NAVY2, border: `1px solid ${GOLD}44`, borderRadius: 18, padding: '10px 12px' }}>
            <p style={{ margin: 0, fontSize: 16, color: '#ffffffb0', fontWeight: 700, ...one }}>{k}</p>
            <p style={{ margin: '2px 0 0', fontSize: 25, color: GOLD, fontWeight: 900, lineHeight: 1.25, ...one }}>{v}</p>
          </div>
        ))}
      </div>
      {/* tracks */}
      <div style={card}>
        <p style={h}>تقدّم المسارات <span style={{ fontSize: 18, color: '#ffffffa0' }}>(درجة النجاح {data.passMark}%)</span></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {data.tracks.map(t => { const full = t.total > 0 && t.done >= t.total; return (
            <div key={t.title} style={{ background: NAVY, borderRadius: 14, padding: '8px 10px', border: `1px solid ${full ? GOLD : GOLD + '33'}` }}>
              <p style={{ margin: 0, fontSize: 16, color: '#ffffffc0', fontWeight: 700, ...one }}>{t.title}</p>
              <p style={{ margin: '0 0 5px', fontSize: 19, fontWeight: 900, color: GOLD, whiteSpace: 'nowrap' }}>{t.done} من {t.total}{full ? ' ✓' : ''}</p>
              <div style={{ height: 6, background: '#ffffff22', borderRadius: 6 }}><div style={{ height: 6, width: `${t.total ? Math.min(100, (t.done / t.total) * 100) : 0}%`, background: GOLD, borderRadius: 6 }} /></div>
            </div>); })}
        </div>
      </div>
      {/* level tests */}
      <div style={card}>
        <p style={h}>اختبارات نهاية المستوى</p>
        {data.levelTests.length === 0 ? <p style={{ fontSize: 21, color: '#ffffffb0', margin: 0 }}>— لا توجد اختبارات مستوى بعد</p> : data.levelTests.slice(0, 3).map((t, i) => (
          <div key={t.title} style={{ padding: '8px 0', borderTop: i ? `1px solid ${GOLD}33` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22, fontWeight: 900, flex: 1, minWidth: 0, ...one }}>{t.title}</span>
              <span style={{ background: t.passed ? GOLD : '#9f1239', color: t.passed ? NAVY : '#fff', fontWeight: 900, fontSize: 17, padding: '3px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>{t.passed ? 'ناجح ✓' : 'لم ينجح بعد'}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
              <span style={chip}>آخر محاولة (المعتمدة) {t.latest}%</span><span style={chip}>أفضل نتيجة {t.best}%</span><span style={chip}>المحاولات {t.attempts}</span>
              {t.date && <span style={{ fontSize: 16, color: '#ffffff90', whiteSpace: 'nowrap', marginRight: 'auto' }}>{t.date}</span>}
            </div>
            {t.weak.length > 0 && <p style={{ margin: '6px 0 0', fontSize: 17, color: GOLD_L, fontWeight: 700, lineHeight: 1.4, ...one }}>دروس ضعيفة: {t.weak.slice(0, 5).join(' · ')}</p>}
          </div>))}
      </div>
      {/* calls */}
      <div style={{ ...card, flexShrink: 1, minHeight: 0, overflow: 'hidden' }}>
        <p style={h}>مكالمات المحادثة مع سارة (آخر 5)</p>
        {data.calls.length === 0 ? <p style={{ fontSize: 21, color: '#ffffffb0', margin: 0 }}>— لا توجد مكالمات مسجّلة بعد</p> : data.calls.slice(0, 5).map((c, i) => (
          <div key={i} style={{ padding: '7px 0', borderTop: i ? `1px solid ${GOLD}33` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 900, flex: 1, minWidth: 0, ...one }}>{c.title}</span>
              <span style={{ fontSize: 17, color: GOLD_L, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>⏱ {c.duration} · {c.turns} مداخلة · {c.words} كلمة</span>
              <span style={{ fontSize: 16, color: '#ffffff90', whiteSpace: 'nowrap', flexShrink: 0 }}>{c.date}</span>
            </div>
            {c.verdict ? <p style={{ margin: '3px 0 0', fontSize: 16, color: '#ffffffd0', fontWeight: 700, ...one }}>📝 {c.verdict}</p> : null}
            {c.corrections?.length ? <div style={{ display: 'flex', gap: 8, marginTop: 3, overflow: 'hidden' }}>{c.corrections.slice(0, 2).map((x, j) => <span key={j} dir="auto" style={{ fontSize: 15, color: '#fff', background: '#ffffff14', borderRadius: 8, padding: '1px 8px', unicodeBidi: 'isolate', ...one, maxWidth: 480 }}>{x}</span>)}</div> : null}
            {(c.topic || c.focus?.length) ? <p style={{ margin: '2px 0 0', fontSize: 15, color: GOLD_L, fontWeight: 700, ...one }}>{c.topic ? `موضوع: ${c.topic}` : ''}{c.topic && c.focus?.length ? '  •  ' : ''}{c.focus?.length ? `التركيز: ${c.focus.join(' · ')}` : ''}</p> : null}
          </div>))}
      </div>
      <p style={{ margin: 0, textAlign: 'center', fontSize: 17, color: '#ffffff80', fontWeight: 700 }}>بيانات فعلية من حساب الطالب • {data.dateLabel}</p>
      {data.sampleLabel && <div style={{ position: 'absolute', bottom: 30, left: 36, background: '#b91c1c', color: '#fff', fontWeight: 900, fontSize: 22, padding: '4px 14px', borderRadius: 10 }}>{data.sampleLabel}</div>}
    </div>
  );
});
ReportExportLayout.displayName = 'ReportExportLayout';
