import React, { useEffect, useMemo, useState } from 'react';
import { buildConfig, MAX_ALLOWED, type LiveClassConfig, type LiveClassStore } from '../lib/abboud/liveClass';
import { useLiveStore } from '../lib/abboud/useLiveStore';

import AbboudLiveJoin from './AbboudLiveJoin';

export type AdminStudent = { id: string; displayName?: string; email?: string; role?: string };
const label = (s: AdminStudent) => s.displayName?.trim() || s.email?.split('@')[0] || s.id.slice(0, 6);
const ROLE_TAG: Record<string, string> = { admin: ' (مدير)', parent: ' (ولي أمر)' };
const isTeacherCandidate = (s: AdminStudent) => s.role !== 'admin' && s.role !== 'parent';

/**
 * Admin only: choose the host (the student who teaches in «عبود المعلّم») and which registered students may join his
 * class live from their own devices. Only names chosen here are shared with that class — never emails or other fields.
 */
export default function AbboudLiveClassAdmin({ students: users, liveStore, selfUid, selfName }: {
  /** Every registered account (students, parents, admins) — any of them may attend. */
  students: AdminStudent[]; liveStore?: LiveClassStore | null;
  /** The signed-in admin: listed first as «أنا (المدير)» so he can add himself, even without a users/ doc. */
  selfUid?: string; selfName?: string;
}) {
  const students = useMemo(() => selfUid && !users.some(u => u.id === selfUid) ? [...users, { id: selfUid, displayName: selfName, role: 'admin' }] : users, [users, selfUid, selfName]);
  const store = useLiveStore(liveStore);
  const [classes, setClasses] = useState<LiveClassConfig[]>([]);
  const [hostUid, setHostUid] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => { if (!store) return; return store.watchAllConfigs(setClasses, () => setStatus('تعذّر قراءة الفصول. تأكّد أن قواعد Firestore الجديدة منشورة.')); }, [store]);
  const sorted = useMemo(() => [...students].sort((a, b) => (a.id === selfUid ? -1 : b.id === selfUid ? 1 : 0) || label(a).localeCompare(label(b), 'ar')), [students, selfUid]);
  const optionLabel = (s: AdminStudent) => s.id === selfUid ? 'أنا (المدير)' : label(s) + (ROLE_TAG[s.role || ''] || '');
  const existing = classes.find(c => c.hostUid === hostUid);
  useEffect(() => { setPicked(existing ? existing.allowed : []); setStatus(''); }, [hostUid]); // eslint-disable-line react-hooks/exhaustive-deps
  const visible = sorted.filter(s => s.id !== hostUid && (!search.trim() || label(s).includes(search.trim()) || (s.email || '').toLowerCase().includes(search.trim().toLowerCase())));
  const byId = (id: string) => students.find(s => s.id === id);
  async function save() {
    const host = byId(hostUid);
    const result = buildConfig(hostUid, host ? label(host) : 'عبود', picked.map(id => ({ uid: id, name: byId(id) ? label(byId(id)!) : (existing?.names[id] || 'طالب') })));
    if (result.ok === false) { setStatus(result.reason === 'empty' ? 'اختر طالباً واحداً على الأقل.' : result.reason === 'too-many' ? `الحد الأقصى ${MAX_ALLOWED} طالباً.` : 'اختر المعلّم أولاً.'); return; }
    try { await store!.saveConfig(result.config); setStatus(`تم الحفظ: ${result.config.allowed.length} طالب يمكنهم الانضمام${selfUid && result.config.allowed.includes(selfUid) ? ' (منهم أنت)' : ''}.`); }
    catch { setStatus('لم يُحفظ. تأكّد أن قواعد Firestore الجديدة منشورة وأنك مسجّل كمسؤول.'); }
  }
  async function remove(id: string) {
    try { await store!.deleteConfig(id); setStatus('أُزيل الفصل المباشر لهذا المعلّم.'); if (id === hostUid) setPicked([]); } catch { setStatus('تعذّر الحذف.'); }
  }
  return <section dir="rtl" data-testid="abboud-live-admin" aria-labelledby="abboud-live-admin-title" className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <header><h3 id="abboud-live-admin-title" className="text-lg font-black text-[#002147]">👨‍🏫 فصل عبود المباشر</h3>
      <p className="text-sm text-slate-600">أنت فقط تختار من ينضم من أجهزتهم. بدر وريم (الطالبان الافتراضيان) لا يتأثران. يُشارَك مع الفصل اسم الطالب فقط.</p></header>
    {selfUid && <div data-testid="abboud-live-admin-join" className="rounded-xl bg-slate-50 p-3 text-sm">
      <p className="text-slate-600">لتحضر بنفسك: اختر المعلّم وعلّم على «أنا (المدير)» ثم احفظ. عندما يبدأ البث يظهر زر الانضمام هنا (وفي فصل سارة أيضاً).</p>
      <AbboudLiveJoin uid={selfUid} liveStore={liveStore} />
    </div>}
    {!store && <p className="text-sm text-slate-500">جاري التحميل…</p>}
    <label className="block text-sm font-bold">المعلّم (صاحب نشاط «عبود المعلّم»)
      <select value={hostUid} onChange={e => setHostUid(e.target.value)} className="mt-1 block w-full rounded-lg border p-2">
        <option value="">— اختر —</option>
        {sorted.filter(s => isTeacherCandidate(s) || s.id === hostUid).map(s => <option key={s.id} value={s.id}>{label(s)}{classes.some(c => c.hostUid === s.id) ? ' (له فصل)' : ''}</option>)}
      </select></label>
    {hostUid && <>
      <input type="search" aria-label="ابحث عن طالب" placeholder="ابحث بالاسم أو البريد" value={search} onChange={e => setSearch(e.target.value)} className="w-full rounded-lg border p-2" />
      <fieldset className="max-h-72 overflow-y-auto rounded-xl border p-2">
        <legend className="px-1 text-sm font-bold">المسموح لهم بالحضور ({picked.length}/{MAX_ALLOWED})</legend>
        {visible.map(s => <label key={s.id} className="flex items-center gap-2 py-1 text-sm">
          <input type="checkbox" checked={picked.includes(s.id)} onChange={e => setPicked(p => e.target.checked ? [...p, s.id] : p.filter(x => x !== s.id))} />
          <span>{optionLabel(s)}</span></label>)}
        {!visible.length && <p className="text-sm text-slate-500">لا يوجد طلاب مطابقون.</p>}
      </fieldset>
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={!store} onClick={() => void save()} className="rounded-xl bg-[#002147] px-4 py-2 font-bold text-white disabled:opacity-40">حفظ قائمة الفصل</button>
        {existing && <button type="button" onClick={() => void remove(hostUid)} className="rounded-xl border px-4 py-2 font-bold text-red-700">إلغاء فصل هذا المعلّم</button>}
      </div>
    </>}
    {status && <p role="status" className="text-sm font-bold text-[#002147]">{status}</p>}
    {classes.length > 0 && <div><h4 className="text-sm font-black">الفصول الحالية</h4>
      <ul className="text-sm">{classes.map(c => <li key={c.hostUid}>{c.hostName}: {c.allowed.map(id => c.names[id] || 'طالب').join('، ')}</li>)}</ul></div>}
  </section>;
}
