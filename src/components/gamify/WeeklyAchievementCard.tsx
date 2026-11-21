import React, { useEffect, useRef, useState } from 'react';
import { X, Share2, Download } from 'lucide-react';
import { toBlob } from 'html-to-image';
import { loadWeeklyReportData, type WeeklyReportData } from '../ParentWeeklyStepsReport';
import type { StreakData } from '../../services/streakService';
import { liveStreak, weekStudyDays, weeklyBadge, weekRangeLabel } from '../../lib/gamify';

const NAVY = '#002147';
const GOLD = '#C49E3A';

/** Parent line under the card — built only from real numbers. */
export function parentLine(name: string, lessons: number, days: number): string {
  const who = name || 'بطلنا';
  if (lessons === 0 && days === 0) return `أسبوع جديد ينتظر ${who}… أول درس يبدأ المشوار ✨`;
  if (lessons >= 5 || days >= 5) return `${who} كان نجم الأسبوع! التزام رائع يستاهل التشجيع 🌟`;
  return `${who} يتقدّم خطوة بخطوة، كلمة تشجيع منكم تفرق كثير 💛`;
}

/** 🏅 Weekly achievement card for parents (navy & gold) — real data only, exported as a PNG and shared (Web Share) or downloaded. Read only. */
export function WeeklyAchievementCard({ uid, name, streak, xp, today, onClose }: { uid: string | null; name: string; streak: StreakData | null; xp: number | null; today: string; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<WeeklyReportData | null>(null);
  const [loading, setLoading] = useState(!!uid);
  const [busy, setBusy] = useState<'share' | 'save' | null>(null);
  const [note, setNote] = useState('');
  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    let alive = true;
    loadWeeklyReportData(uid).then(d => { if (alive) { setData(d); setLoading(false); } }).catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [uid]);

  const days = liveStreak(streak, today);
  const studiedDays = weekStudyDays(days > 0 ? streak : null, today).filter(d => d.studied).length;
  const badge = weeklyBadge(studiedDays).earned;
  const lessons = data?.completed.length ?? 0;
  const titles = (data?.completed ?? []).slice(0, 4).map(c => c.title);
  const words = (data?.words ?? []).slice(0, 6);
  const range = weekRangeLabel(today);
  const childName = name || 'طالبنا';

  const makeFile = async (): Promise<File | null> => {
    if (!cardRef.current) return null;
    const blob = await toBlob(cardRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: NAVY });
    return blob ? new File([blob], `بطاقة-الأسبوع-${today}.png`, { type: 'image/png' }) : null;
  };
  const download = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a'); a.href = url; a.download = file.name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };
  const share = async () => {
    setBusy('share'); setNote('');
    try {
      const file = await makeFile(); if (!file) throw new Error('no image');
      const nav: any = navigator;
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        await nav.share({ files: [file], title: 'بطاقة إنجاز الأسبوع', text: `إنجاز ${childName} هالأسبوع في أكاديمية باسم الخليل 🌟` });
      } else { download(file); setNote('جهازك ما يدعم المشاركة المباشرة، نزّلت الصورة — أرسلها من الواتساب.'); }
    } catch (e: any) { if (e?.name !== 'AbortError') setNote('ما قدرت أجهّز الصورة، جرّب مرة ثانية.'); }
    setBusy(null);
  };
  const save = async () => {
    setBusy('save'); setNote('');
    try { const file = await makeFile(); if (file) { download(file); setNote('✅ نزلت الصورة'); } } catch { setNote('ما قدرت أجهّز الصورة، جرّب مرة ثانية.'); }
    setBusy(null);
  };

  return (
    <div data-testid="gamify-card-modal" className="fixed inset-0 z-[400] bg-slate-950/70 flex items-stretch sm:items-center justify-center" dir="rtl">
      <div className="w-full sm:max-w-md bg-slate-100 sm:rounded-3xl flex flex-col max-h-[100dvh] sm:max-h-[96vh] overflow-hidden">
        <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-white">
          <p className="text-[15px] font-black text-[#002147]">🏅 بطاقة إنجاز للأهل</p>
          <button onClick={onClose} aria-label="إغلاق" className="p-1.5 rounded-xl bg-slate-100"><X size={18} /></button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col items-center">
          {/* The card itself (exported as an image) */}
          <div ref={cardRef} data-testid="gamify-card" className="w-[340px] rounded-[28px] p-5 text-white relative overflow-hidden" dir="rtl"
            style={{ background: `radial-gradient(circle at 85% 0%, #0f4a8a 0%, ${NAVY} 55%, #00152e 100%)`, border: `3px solid ${GOLD}`, fontFamily: 'inherit' }}>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(230,195,106,.25), transparent 70%)' }} />
            <div className="relative flex items-center gap-3">
              <img src="/icon-512.png" alt="" width={46} height={46} className="w-[46px] h-[46px] rounded-xl border-2" style={{ borderColor: GOLD }} />
              <div className="min-w-0">
                <p className="text-[11px] font-black" style={{ color: '#E6C36A' }}>أكاديمية باسم الخليل الرقمية</p>
                <p className="text-[18px] font-black leading-tight">بطاقة إنجاز الأسبوع</p>
                <p className="text-[11px] font-bold text-white/70">{range}</p>
              </div>
            </div>
            <div className="relative mt-4 text-center">
              <p className="text-[12px] font-bold text-white/70">بكل فخر نقدّم</p>
              <p data-testid="gamify-card-name" className="text-[24px] font-black" style={{ color: '#F5D061' }}>{childName}</p>
              {badge && <p className="text-[12px] font-black mt-0.5">{badge.emoji} {badge.nameAr}</p>}
            </div>
            <div className="relative mt-4 grid grid-cols-3 gap-2">
              {[
                { v: loading ? '…' : String(lessons), l: 'دروس خلّصها', i: '📘', id: 'lessons' },
                { v: String(studiedDays), l: 'أيام دراسة', i: '🔥', id: 'days' },
                { v: xp == null ? '—' : xp.toLocaleString('en-US'), l: 'نقاط XP', i: '⭐', id: 'xp' },
              ].map(s => (
                <div key={s.id} data-testid={`gamify-card-${s.id}`} className="rounded-2xl p-2 text-center" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(230,195,106,.45)' }}>
                  <p className="text-[18px] leading-none">{s.i}</p>
                  <p className="text-[20px] font-black mt-1" style={{ color: '#F5D061' }}>{s.v}</p>
                  <p className="text-[10px] font-bold text-white/80">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-4 rounded-2xl p-3" style={{ background: 'rgba(255,255,255,.06)' }}>
              <p className="text-[12px] font-black mb-1.5" style={{ color: '#E6C36A' }}>وش تعلّم هالأسبوع</p>
              {titles.length ? (
                <ul className="space-y-1">{titles.map((x, i) => <li key={i} className="text-[12px] font-bold leading-snug truncate" dir="auto">✅ {x}</li>)}</ul>
              ) : <p className="text-[12px] font-bold text-white/70">{loading ? 'نجهّز البيانات…' : 'ما فيه دروس مسجّلة هالأسبوع للحين'}</p>}
              {words.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1" dir="ltr">{words.map(w => <span key={w} className="px-2 py-0.5 rounded-full text-[11px] font-black" style={{ background: 'rgba(230,195,106,.18)', color: '#F5D061' }}>{w}</span>)}</div>
              )}
            </div>
            <p className="relative mt-3 text-[12px] font-bold leading-relaxed text-center text-white/90">{parentLine(name, lessons, studiedDays)}</p>
            <p className="relative mt-2 text-center text-[10px] font-black tracking-wide" style={{ color: GOLD }}>— سارة ومعلمات الأكاديمية 💛</p>
          </div>
          <div className="w-[340px] mt-3 grid grid-cols-2 gap-2">
            <button data-testid="gamify-card-share" onClick={share} disabled={!!busy || loading} className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#25D366] text-white text-[13px] font-black disabled:opacity-60">
              <Share2 size={16} /> {busy === 'share' ? 'نجهّز…' : 'شارك (واتساب)'}
            </button>
            <button data-testid="gamify-card-save" onClick={save} disabled={!!busy || loading} className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#002147] text-white text-[13px] font-black disabled:opacity-60">
              <Download size={16} /> {busy === 'save' ? 'نجهّز…' : 'تنزيل الصورة'}
            </button>
          </div>
          {note && <p className="w-[340px] mt-2 text-[12px] font-bold text-slate-600 text-center">{note}</p>}
        </div>
      </div>
    </div>
  );
}
export default WeeklyAchievementCard;
