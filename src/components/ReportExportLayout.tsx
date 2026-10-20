import React from 'react';

/** Self-contained (inline styles) 1080x1350 shareable report. Only real data is passed in; missing → "—". */
export interface ReportExportData {
  studentName: string;
  level?: string;
  dateLabel: string;
  weekly?: { done: number; goal: number | null; minutes: number | null; lastTest: string | null; weakest: string | null } | null;
  tracks: { title: string; done: number; total: number }[];
  levelTests: { title: string; passed: boolean; latest: number; best: number; attempts: number; weak: string[] }[];
  calls: { title: string; date: string; duration: string; turns: number; words: number; verdict?: string }[];
  passMark: number;
  sampleLabel?: string;
}

const NAVY = '#002147', NAVY2 = '#0a2d5c', GOLD = '#C49E3A', GOLD_L = '#F5E6B8';
const font = "'Cairo','Tajawal','IBM Plex Sans Arabic',sans-serif";
const card: React.CSSProperties = { background: NAVY2, border: `2px solid ${GOLD}55`, borderRadius: 28, padding: '22px 26px' };
const h: React.CSSProperties = { color: GOLD, fontSize: 30, fontWeight: 900, margin: '0 0 14px' };

export const ReportExportLayout = React.forwardRef<HTMLDivElement, { data: ReportExportData; logoSrc: string }>(({ data, logoSrc }, ref) => {
  const w = data.weekly;
  const tiles: [string, string][] = [
    ['الدروس المنجزة (7 أيام)', w ? (w.goal ? `${w.done} من ${w.goal}` : String(w.done)) : '—'],
    ['الدقائق مع سارة', w && w.minutes !== null ? `${w.minutes} د` : '—'],
    ['آخر نتيجة اختبار', w?.lastTest || '—'],
    ['أضعف مهارة', w?.weakest || '—'],
  ];
  const tracks = data.tracks.filter(t => t.done > 0).slice(0, 4);
  return (
    <div ref={ref} dir="rtl" style={{ width: 1080, height: 1350, boxSizing: 'border-box', padding: 56, fontFamily: font, color: '#fff', display: 'flex', flexDirection: 'column', gap: 24, background: `linear-gradient(160deg, ${NAVY} 0%, #001428 100%)`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 18, border: `3px solid ${GOLD}`, borderRadius: 40, pointerEvents: 'none' }} />
      {data.sampleLabel && <div style={{ position: 'absolute', bottom: 40, left: 40, background: '#b91c1c', color: '#fff', fontWeight: 900, fontSize: 26, padding: '6px 18px', borderRadius: 12 }}>{data.sampleLabel}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <img src={logoSrc} alt="" width={110} height={110} style={{ borderRadius: 26, border: `3px solid ${GOLD}` }} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 40, fontWeight: 900, color: GOLD }}>أكاديمية باسم الخليل الرقمية</p>
          <p style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, color: GOLD_L }}>تعلّم الإنجليزية مع سارة</p>
        </div>
      </div>
      <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: 22, color: '#ffffffb0', fontWeight: 700 }}>تقرير الطالب</p>
          <p style={{ margin: '2px 0 0', fontSize: 40, fontWeight: 900 }}>{data.studentName}</p>
        </div>
        <div style={{ textAlign: 'left' }}>
          {data.level && <span style={{ background: GOLD, color: NAVY, fontWeight: 900, fontSize: 26, padding: '6px 18px', borderRadius: 999 }}>المستوى {data.level}</span>}
          <p style={{ margin: '10px 0 0', fontSize: 22, color: '#ffffffb0', fontWeight: 700 }}>{data.dateLabel}</p>
        </div>
      </div>
      <div style={card}>
        <p style={h}>التقرير الأسبوعي • آخر 7 أيام</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14 }}>
          {tiles.map(([k, v]) => (
            <div key={k} style={{ background: NAVY, borderRadius: 20, padding: '14px 12px', border: `1px solid ${GOLD}44` }}>
              <p style={{ margin: 0, fontSize: 19, color: '#ffffffb0', fontWeight: 700 }}>{k}</p>
              <p style={{ margin: '6px 0 0', fontSize: 30, color: GOLD, fontWeight: 900, lineHeight: 1.2, wordBreak: 'break-word' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...card, flexShrink: 0 }}>
        <p style={h}>اختبارات نهاية المستوى <span style={{ fontSize: 20, color: '#ffffffa0' }}>(النجاح {data.passMark}%)</span></p>
        {tracks.length > 0 && <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>{tracks.map(t => (
          <div key={t.title} style={{ flex: 1, background: NAVY, borderRadius: 16, padding: '10px 12px' }}>
            <p style={{ margin: 0, fontSize: 18, color: '#ffffffc0', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</p>
            <p style={{ margin: '2px 0 6px', fontSize: 24, fontWeight: 900, color: GOLD }}>{t.done} من {t.total} درس</p>
            <div style={{ height: 8, background: '#ffffff22', borderRadius: 8 }}><div style={{ height: 8, width: `${Math.min(100, (t.done / t.total) * 100)}%`, background: GOLD, borderRadius: 8 }} /></div>
          </div>))}</div>}
        {data.levelTests.length === 0 ? <p style={{ fontSize: 24, color: '#ffffffb0', margin: 0 }}>— لا توجد اختبارات مستوى بعد</p> : data.levelTests.slice(0, 3).map(t => (
          <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderTop: `1px solid ${GOLD}33` }}>
            <span style={{ fontSize: 24, fontWeight: 900, flex: 1 }}>{t.title}</span>
            <span style={{ background: t.passed ? GOLD : '#7f1d1d', color: t.passed ? NAVY : '#fff', fontWeight: 900, fontSize: 20, padding: '4px 14px', borderRadius: 999 }}>{t.passed ? 'ناجح' : 'لم ينجح بعد'}</span>
            <span style={{ fontSize: 22, color: GOLD_L, fontWeight: 700 }}>آخر {t.latest}% · أفضل {t.best}% · {t.attempts} محاولة</span>
          </div>))}
      </div>
      <div style={{ ...card, flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <p style={h}>مكالمات المحادثة مع سارة</p>
        {data.calls.length === 0 ? <p style={{ fontSize: 24, color: '#ffffffb0', margin: 0 }}>— لا توجد مكالمات مسجّلة بعد</p> : data.calls.slice(0, 3).map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderTop: i ? `1px solid ${GOLD}33` : 'none' }}>
            <span style={{ fontSize: 23, fontWeight: 900, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</span>
            <span style={{ fontSize: 21, color: GOLD_L, fontWeight: 700 }}>{c.duration} · {c.turns} مداخلة · {c.words} كلمة</span>
            <span style={{ fontSize: 19, color: '#ffffff90' }}>{c.date}</span>
          </div>))}
      </div>
      <p style={{ margin: 0, textAlign: 'center', fontSize: 20, color: '#ffffff80', fontWeight: 700 }}>بيانات فعلية من حساب الطالب • {data.dateLabel}</p>
    </div>
  );
});
ReportExportLayout.displayName = 'ReportExportLayout';
