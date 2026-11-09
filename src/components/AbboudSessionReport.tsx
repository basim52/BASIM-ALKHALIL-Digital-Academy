import React, { useState } from 'react';
import { reportText, shareText, type SessionReport, type ShareResult } from '../lib/abboud/awards';

const statusText: Record<ShareResult, string> = {
  shared: 'تمت المشاركة ✅', copied: 'نُسخ الملخص ✅ الصقه حيث تريد.', cancelled: 'أُلغيت المشاركة.',
  failed: 'تعذّر النسخ التلقائي؛ انسخ النص أدناه يدوياً.'
};
const day = (at: string) => { const d = new Date(at); return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('ar-SA-u-ca-gregory', { day: 'numeric', month: 'short' }); };
/** The parent's view: this session's summary plus the last saved sessions. Sharing is always the parent's explicit tap. */
export default function AbboudSessionReport({ report, history, name, guest }: { report: SessionReport | null; history: readonly SessionReport[]; name: string; guest: boolean }) {
  const [status, setStatus] = useState<ShareResult | null>(null);
  const [manual, setManual] = useState('');
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  async function share(r: SessionReport) {
    const text = reportText(r, name); const result = await shareText(text);
    setStatus(result); setManual(result === 'failed' ? text : '');
  }
  if (!report && history.length === 0) return null;
  return <section aria-label="ملخص الحصة للأب" data-testid="abboud-report" className="abboud-report mx-auto mt-3 max-w-xl rounded-2xl border-2 border-amber-300 bg-white p-3 text-start">
    {report && <article data-testid="abboud-report-current">
      <h3 className="font-bold">📋 ملخص الحصة للأب — {report.lesson}</h3>
      <ul className="mt-1 space-y-1 text-sm">
        <li>🎙️ <b>ماذا شرح:</b> <span dir="auto">{report.explained || '—'}</span></li>
        <li>🔤 <b>كلمات إنجليزية استخدمها:</b> {report.englishWords.length ? <span dir="ltr">{report.englishWords.join(', ')}</span> : 'لا توجد'}</li>
        <li>🗣️ <b>تكلّم بالإنجليزي:</b> {report.englishTurns} من {report.abboudTurns} مرات كلامه</li>
        {typeof report.covered === 'string' && <li>📋 <b>عناصر السبورة التي ذكرها:</b> {report.covered}</li>}
        <li>⭐ <b>نجوم الحصة:</b> {report.stars}</li>
        <li>💡 <b>نصيحة سارة:</b> {report.tip || 'لا توجد هذه المرة'}</li>
      </ul>
      <button type="button" onClick={() => void share(report)} className="mt-2 rounded-lg bg-indigo-700 px-4 py-2 text-white">{canShare ? '📤 مشاركة الملخص' : '📋 نسخ الملخص'}</button>
    </article>}
    {status && <p role="status" className="mt-2 text-sm">{statusText[status]}</p>}
    {manual && <textarea readOnly aria-label="نص الملخص للنسخ اليدوي" value={manual} className="mt-2 w-full rounded-xl border p-2 text-sm" rows={6} />}
    {history.length > 0 && <details className="mt-2" data-testid="abboud-report-history">
      <summary className="cursor-pointer text-sm font-bold">🗂️ سجل آخر الحصص ({history.length})</summary>
      <ul className="mt-1 space-y-1 text-sm">{history.map((r, i) => <li key={`${r.at}-${i}`} className="flex flex-wrap items-center gap-2">
        <span>{day(r.at)} · {r.lesson} · ⭐ {r.stars} · 🔤 {r.englishWords.length}</span>
        <button type="button" onClick={() => void share(r)} className="rounded border px-2 text-xs">{canShare ? 'مشاركة' : 'نسخ'}</button>
      </li>)}</ul>
    </details>}
    <p className="mt-2 text-xs text-slate-500">{guest ? 'وضع ضيف: الملخص لا يُحفظ.' : 'يُحفظ آخر ١٠ حصص على هذا الجهاز فقط، ولا يُرسل شيء تلقائياً.'}</p>
  </section>;
}
