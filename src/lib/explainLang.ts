import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { lessonTextsForEnglish, lessonSig } from './lessonEnglishKeys';
import { auth, db } from './firebase';

/**
 * Global explanation language for Sara + tutor lessons: 'ar' (default, Arabic explanations) or 'en' (full English).
 * Saved in localStorage and merged into users/{uid}.explainLang (one extra field; nothing else is touched).
 */
export type ExplainLang = 'ar' | 'en';
const LS = 'academy_explain_lang';
const EVT = 'academy-explain-lang';
export const getExplainLang = (): ExplainLang => { try { return localStorage.getItem(LS) === 'en' ? 'en' : 'ar'; } catch { return 'ar'; } };
export const setExplainLang = (l: ExplainLang) => {
  try { localStorage.setItem(LS, l); } catch { /* ignore */ }
  try { window.dispatchEvent(new CustomEvent(EVT, { detail: l })); } catch { /* ignore */ }
  const uid = auth.currentUser?.uid;
  if (uid) void setDoc(doc(db, 'users', uid), { explainLang: l }, { merge: true }).catch(() => {});
};
/** Adopt the saved account preference once after sign-in (other devices). */
export const adoptExplainLangFromProfile = (v: unknown) => {
  if ((v === 'en' || v === 'ar') && v !== getExplainLang()) { try { localStorage.setItem(LS, v); window.dispatchEvent(new CustomEvent(EVT, { detail: v })); } catch { /* ignore */ } }
};
let adopted = false;
try { onAuthStateChanged(auth, u => { if (!u || adopted) return; adopted = true; let local: string | null = null; try { local = localStorage.getItem(LS); } catch { /* ignore */ }
  if (local) return; void getDoc(doc(db, 'users', u.uid)).then(d => adoptExplainLangFromProfile(d.data()?.explainLang)).catch(() => {}); }); } catch { /* ignore */ }
// Site-wide EN safety net (lazy import keeps it out of the AR path).
if (typeof window !== 'undefined') { const sync = () => { void import('./domTranslate').then(m => m.syncDomTranslation()); }; if (getExplainLang() === 'en') sync(); window.addEventListener(EVT, sync); }
export const useExplainLang = (): [ExplainLang, (l: ExplainLang) => void] => {
  const [l, setL] = useState<ExplainLang>(getExplainLang);
  useEffect(() => {
    const f = () => setL(getExplainLang());
    window.addEventListener(EVT, f); window.addEventListener('storage', f);
    return () => { window.removeEventListener(EVT, f); window.removeEventListener('storage', f); };
  }, []);
  return [l, setExplainLang];
};

/* ---------- English versions of static lesson texts (server AI + cache) ---------- */
const mem = new Map<string, string[]>();
const inflight = new Map<string, Promise<string[] | null>>();
const lsKey = (id: string) => `lesson_en_v1_${id}`;
/** Build-time English for every lesson (public/lesson-en/all.json): loaded once, makes EN switching instant. */
let staticAll: Promise<Record<string, { sig: string; texts: string[] }>> | null = null;
export const loadStaticEnglish = () => (staticAll ??= fetch('/lesson-en/all.json').then(r => r.ok ? r.json() : {}).catch(() => ({})));
export const fetchEnglishTexts = async (id: string, texts: string[]): Promise<string[] | null> => {
  const s = (await loadStaticEnglish())[id];
  if (s && s.sig === lessonSig(texts) && s.texts.length === texts.length) return s.texts;
  return fetchEnglishTextsServer(id, texts);
};
const fetchEnglishTextsServer = (id: string, texts: string[]): Promise<string[] | null> => {
  const sig = `${id}|${texts.join('\u0001').length}|${texts.length}`;
  const hit = mem.get(sig); if (hit) return Promise.resolve(hit);
  try { const c = JSON.parse(localStorage.getItem(lsKey(id)) || 'null'); if (c?.sig === sig && Array.isArray(c.texts)) { mem.set(sig, c.texts); return Promise.resolve(c.texts); } } catch { /* ignore */ }
  const run = inflight.get(sig); if (run) return run;
  const p = (async () => {
    try {
      const r = await fetch('/api/lesson/english', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, texts }) });
      const j = r.ok ? await r.json() : null;
      if (!Array.isArray(j?.texts) || j.texts.length !== texts.length) return null;
      mem.set(sig, j.texts); try { localStorage.setItem(lsKey(id), JSON.stringify({ sig, texts: j.texts })); } catch { /* full */ }
      return j.texts as string[];
    } catch { return null; } finally { inflight.delete(sig); }
  })();
  inflight.set(sig, p); return p;
};

type Q = { promptAr: string; promptEn?: string; options: string[]; correctIndex: number };
type LessonLike = { id: string; titleAr: string; titleEn: string; content?: { explanationAr: string; altExplanationAr: string; example: { en: string; ar: string }[]; check: Q; exercises: Q[] } | null; board?: any[] };
const textsOf = (l: LessonLike) => lessonTextsForEnglish(l);
const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);
/** Same lesson object with every Arabic explanation/prompt replaced by English; example translations dropped. */
export const englishLesson = <T extends LessonLike>(l: T, en: string[]): T => {
  const c = l.content!; const [ex, alt, chk, ...exs] = en;
  const q = (x: Q, t: string): Q => ({ ...x, promptAr: x.promptEn && t && !isArabic(t) ? '' : t || x.promptAr });
  return { ...l, titleAr: l.titleEn,
    content: { ...c, explanationAr: ex || c.explanationAr, altExplanationAr: alt || c.altExplanationAr, example: c.example.map(e => ({ ...e, ar: '' })), check: q(c.check, chk), exercises: c.exercises.map((x, i) => q(x, exs[i])) },
    ...(l.board ? { board: l.board.map((b: any) => b.kind === 'example' ? { ...b, ar: '' } : b) } : {}) } as T;
};
/** Ready English view of a lesson (or null while loading); call with lang==='ar' to get the original. */
export const englishLessonAsync = async <T extends LessonLike>(l: T): Promise<T> => {
  if (!l.content) return l;
  const en = await fetchEnglishTexts(l.id, textsOf(l));
  return en ? englishLesson(l, en) : l;
};
let staticSync: Record<string, { sig: string; texts: string[] }> | null = null;
if (typeof window !== 'undefined') { const warm = () => { void loadStaticEnglish().then(d => { staticSync = d; }); }; if (getExplainLang() === 'en') warm(); window.addEventListener(EVT, () => { if (getExplainLang() === 'en') warm(); }); }
const viewCache = new WeakMap<object, any>();
const syncView = <T extends LessonLike>(l: T): T | null => { const hit = viewCache.get(l); if (hit) return hit; const s = staticSync?.[l.id]; const t = textsOf(l); if (!(s && s.sig === lessonSig(t) && s.texts.length === t.length)) return null; const v = englishLesson(l, s.texts); viewCache.set(l, v); return v; };
export const useLessonView = <T extends LessonLike>(l: T | null, lang: ExplainLang): { view: T | null; loading: boolean; failed: boolean } => {
  const [st, setSt] = useState<{ id: string; view: T | null; failed: boolean } | null>(null);
  useEffect(() => {
    if (!l?.content || lang !== 'en') return;
    let live = true;
    void fetchEnglishTexts(l.id, textsOf(l)).then(en => { if (live) setSt({ id: l.id, view: en ? englishLesson(l, en) : null, failed: !en }); });
    return () => { live = false; };
  }, [l, lang]);
  if (!l || !l.content || lang !== 'en') return { view: l, loading: false, failed: false };
  if (!st || st.id !== l.id) { const v = syncView(l); if (v) return { view: v, loading: false, failed: false }; }
  if (!st || st.id !== l.id) return { view: l, loading: true, failed: false };
  return { view: st.view || l, loading: false, failed: st.failed };
};

/** Tiny i18n helper for hard-coded Arabic UI strings: t('عربي', 'English'). Re-renders on the ع/EN switch. */
export const useT = () => { const [l] = useExplainLang(); return (ar: string, en: string) => (l === 'en' ? en : ar); };
export const isEn = () => getExplainLang() === 'en';
/** Non-hook variant for small child components whose parent already re-renders on the switch. */
export const L = (ar: string, en: string) => (getExplainLang() === 'en' ? en : ar);
