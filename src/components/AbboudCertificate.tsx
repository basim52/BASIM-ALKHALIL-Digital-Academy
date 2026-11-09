import React, { useEffect, useRef, useState } from 'react';
import { CERTIFICATE_NOTE, CERTIFICATE_REASON, CERTIFICATE_SIZE, CERTIFICATE_TITLE, drawCertificate } from '../lib/abboud/certificate';

const PRINTING = 'abboud-print-certificate';
/** The activity's own encouragement certificate: printable, or saved as a PNG drawn with the 2D canvas. */
export default function AbboudCertificate({ name, stars, onName, onClose }: { name: string; stars: number; onName: (name: string) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(name);
  const [notice, setNotice] = useState('');
  const input = useRef<HTMLInputElement | null>(null);
  const date = new Date().toLocaleDateString('ar-SA-u-ca-gregory', { dateStyle: 'long' });
  useEffect(() => { input.current?.focus(); }, []);
  useEffect(() => () => document.body.classList.remove(PRINTING), []);
  function print() {
    const done = () => { document.body.classList.remove(PRINTING); window.removeEventListener('afterprint', done); };
    document.body.classList.add(PRINTING); window.addEventListener('afterprint', done);
    // The class only affects print CSS, so it can safely wait for afterprint (mobile print is asynchronous) or unmount.
    try { window.print(); } catch { done(); setNotice('تعذّرت الطباعة في هذا المتصفح.'); }
  }
  function saveImage() {
    const canvas = document.createElement('canvas'); canvas.width = CERTIFICATE_SIZE.width; canvas.height = CERTIFICATE_SIZE.height;
    let ctx: CanvasRenderingContext2D | null = null;
    try { ctx = canvas.getContext('2d'); } catch { ctx = null; }
    if (!ctx || typeof canvas.toBlob !== 'function') { setNotice('حفظ الصورة غير متاح هنا؛ استخدم «طباعة» واختر الحفظ PDF.'); return; }
    drawCertificate(ctx, { name: draft.trim() || name, stars, date });
    canvas.toBlob(blob => {
      if (!blob) { setNotice('تعذّر تجهيز الصورة؛ جرّب الطباعة.'); return; }
      const url = URL.createObjectURL(blob); const link = document.createElement('a');
      link.href = url; link.download = 'little-teacher-certificate.png'; document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice('حُفظت الشهادة كصورة ✅');
    }, 'image/png');
  }
  return <div className="abboud-certificate-backdrop" role="dialog" aria-modal="true" aria-label={CERTIFICATE_TITLE} data-testid="abboud-certificate">
    <div className="abboud-certificate" dir="rtl">
      <p className="abboud-certificate-title">🎓 {CERTIFICATE_TITLE}</p>
      <p>تُمنح هذه الشهادة إلى</p>
      <p className="abboud-certificate-name" data-testid="abboud-certificate-name">{draft.trim() || name}</p>
      <p>{CERTIFICATE_REASON}</p>
      <p className="abboud-certificate-stars">⭐ {stars} نجمة معلّم</p>
      <p className="abboud-certificate-small">{date}</p>
      <p className="abboud-certificate-small">{CERTIFICATE_NOTE}</p>
    </div>
    <div className="abboud-certificate-actions">
      <label className="text-sm">الاسم على الشهادة <input ref={input} value={draft} maxLength={30} onChange={e => setDraft(e.target.value)} onBlur={() => onName(draft)} className="mr-2 rounded-lg border p-2 text-slate-900" /></label>
      <button type="button" onClick={() => { onName(draft); print(); }} className="rounded-lg bg-white px-3 py-2 font-bold text-slate-900">🖨️ طباعة</button>
      <button type="button" onClick={() => { onName(draft); saveImage(); }} className="rounded-lg bg-amber-400 px-3 py-2 font-bold text-slate-900">🖼️ حفظ كصورة</button>
      <button type="button" onClick={() => { onName(draft); onClose(); }} className="rounded-lg border border-white px-3 py-2 text-white">إغلاق الشهادة</button>
      {notice && <p role="status" className="w-full text-sm text-amber-200">{notice}</p>}
    </div>
  </div>;
}
