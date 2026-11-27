import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, Heart, Flame, Timer, X, RotateCcw, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { BidiText } from './BidiText';
import { useExplainLang } from '../lib/explainLang';
import { useLandscapeSplit } from '../lib/useLandscapeSplit';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { personaById } from '../data/saraBoardPersonas';
import {
  HAYAT_CLASSES, hayatClass, buildSession, countFor, MODE_KINDS, SESSION_LEN, CHALLENGE_SECONDS, readHayatBest, saveHayatBest, loadHayatEnglish,
  type HayatClassId, type HayatMode, type HayatLang, type HayatQ, type HayatPic,
} from '../data/hayat/questions';

/**
 * 🌿 مدرسة حياة — Hayat teaches nothing: she only asks, using the lessons of every class.
 * Local-only: no Firestore, no XP, no progress, no certificates (best scores in localStorage via saveHayatBest).
 */
const EMERALD = '#0F766E';
const HEARTS = 3;
type Answer = { q: HayatQ; ok: boolean };
const MODES: { id: HayatMode; img: string; ar: string; en: string; subAr: string; subEn: string }[] = [
  { id: 'mixed', img: '/tutors/hayat.webp', ar: 'خلطة حياة', en: "Hayat's Mix", subAr: '١٠ أسئلة من كل نوع', subEn: '10 questions of every kind' },
  { id: 'challenge', img: '/hayat/challenge.webp', ar: 'تحدي حياة', en: 'Hayat Challenge', subAr: `${CHALLENGE_SECONDS} ثانية، جاوب أكثر شي`, subEn: `${CHALLENGE_SECONDS} seconds, answer as many as you can` },
  { id: 'picture', img: '/hayat/pictures.webp', ar: 'الصورة وكلمتها', en: 'Picture to word', subAr: 'شوف الصورة واختر جملتها', subEn: 'See the picture, pick its sentence' },
  { id: 'listen', img: '/hayat/listen.webp', ar: 'اسمع واختر', en: 'Listen and choose', subAr: 'اسمع الجملة واختر صورتها', subEn: 'Hear it, pick the picture' },
  { id: 'tf', img: '/hayat/truefalse.webp', ar: 'صح ولا غلط؟', en: 'True or false?', subAr: 'اسحب الكرت يمين أو يسار', subEn: 'Swipe the card right or left' },
  { id: 'vocab', img: '/tutors/sara.webp', ar: 'معنى الكلمة', en: 'Word meaning', subAr: 'كلمة إنجليزي ومعناها، بالاتجاهين', subEn: 'English words and what they mean, both ways' },
  { id: 'hear', img: '/hayat/listen.webp', ar: 'اسمع واقرأ', en: 'Listen and read', subAr: 'اسمع الجملة واختر المكتوبة صح', subEn: 'Hear it, pick the sentence you heard' },
  { id: 'order', img: '/hayat/order.webp', ar: 'رتّب الجملة', en: 'Order the sentence', subAr: 'رتّب الكلمات صح', subEn: 'Put the words in order' },
];
const PRAISE: [string, string][] = [['ممتاز! 🌟', 'Excellent! 🌟'], ['يا سلام عليك! 👏', 'Brilliant! 👏'], ['برافو! 💚', 'Bravo! 💚'], ['صح عليك! ✨', 'Spot on! ✨'], ['كفو! 🔥', 'Great! 🔥']];
const GENTLE: [string, string][] = [['قريب! شوف الصح 👇', 'Close! Here is the right one 👇'], ['ولا يهمك، نتعلم منها 💚', 'No worries, we learn from it 💚'], ['محاولة حلوة! الصح هنا 👇', 'Nice try! The answer is here 👇']];
const shuffle = <T,>(a: T[]) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const voiceFor = (q: HayatQ) => q.cls === 'abboud' ? 'Kore' : personaById(q.cls).voice;

/** The right answer as a short line (feedback + results card). */
export const answerLine = (q: HayatQ, en = false): string => {
  switch (q.kind) {
    case 'choice': return q.options[q.correct];
    case 'picture': return `${q.options[q.correct]} = ${q.ar}`;
    case 'listen': case 'hear': return `${q.say} = ${q.ar}`;
    case 'tf': return en ? (q.truth ? `True: “${q.en}” = ${q.trueAr}` : `False: “${q.en}” means ${q.trueAr}`) : (q.truth ? `صح: «${q.en}» = ${q.trueAr}` : `غلط: «${q.en}» معناها ${q.trueAr}`);
    case 'gap': case 'order': return `${q.en} = ${q.ar}`;
    case 'vocab': return `${q.en} = ${q.ar}`;
  }
};

const Pic: React.FC<{ pic: HayatPic; big?: boolean; onZoom?: (p: HayatPic) => void; className?: string }> = ({ pic, big, onZoom, className = '' }) => (
  pic.img
    ? <img src={pic.img} alt="" loading="lazy" decoding="async" onClick={onZoom ? e => { e.stopPropagation(); onZoom(pic); } : undefined}
        className={`${className} object-cover rounded-2xl bg-white ${onZoom ? 'cursor-zoom-in' : ''}`} />
    : <span className={`${className} flex items-center justify-center rounded-2xl bg-white ${big ? 'text-[84px]' : 'text-[48px]'} leading-none select-none`}>{pic.emoji}</span>
);

const Lightbox: React.FC<{ pic: HayatPic | null; onClose: () => void }> = ({ pic, onClose }) => !pic ? null : (
  <div data-testid="hayat-zoom" className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
    {pic.img ? <img src={pic.img} alt="" className="max-w-full max-h-full rounded-2xl shadow-2xl" /> : <span className="text-[180px]">{pic.emoji}</span>}
    <button type="button" aria-label="close" className="absolute top-3 end-3 p-2 rounded-full bg-white/15 text-white"><X size={22} /></button>
  </div>
);

export const HayatSchool: React.FC<{ mockMode?: HayatMode; mockSession?: HayatQ[] }> = ({ mockMode, mockSession }) => {
  const [lang] = useExplainLang();
  const [hl, setHl] = useState<HayatLang>(lang === 'en' ? 'en' : 'all');
  const enMode = hl === 'en' || lang === 'en';
  const t = (ar: string, en: string) => (enMode ? en : ar); const rtl = !enMode;
  // English stems/explanations (one small file) load once; counts and rounds use them.
  const [enTick, setEnTick] = useState(0); const [loading, setLoading] = useState(false);
  useEffect(() => { void loadHayatEnglish().then(() => setEnTick(x => x + 1)); }, []);
  const land = useLandscapeSplit();
  const [classes, setClasses] = useState<HayatClassId[]>(HAYAT_CLASSES.map(c => c.id));
  const [mode, setMode] = useState<HayatMode | null>(mockMode ?? null);
  const [session, setSession] = useState<HayatQ[]>(mockSession ?? []);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [hearts, setHearts] = useState(HEARTS);
  const [streak, setStreak] = useState(0); const [bestStreak, setBestStreak] = useState(0);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0); useEffect(() => { scoreRef.current = score; }, [score]);
  const [left, setLeft] = useState(CHALLENGE_SECONDS);
  const [done, setDone] = useState(false);
  const [zoom, setZoom] = useState<HayatPic | null>(null);
  const [best, setBest] = useState(readHayatBest);
  const [newBest, setNewBest] = useState(false);
  const allOn = classes.length === HAYAT_CLASSES.length;
  const toggle = (id: HayatClassId | 'all') => setClasses(cur => id === 'all' ? (allOn ? cur : HAYAT_CLASSES.map(c => c.id))
    : allOn ? [id] : cur.includes(id) ? (cur.length > 1 ? cur.filter(x => x !== id) : cur) : [...cur, id]);
  const counts = useMemo(() => Object.fromEntries(MODES.map(m => [m.id, countFor(classes, MODE_KINDS[m.id], hl)])) as Record<HayatMode, number>, [classes, hl, enTick]); // eslint-disable-line react-hooks/exhaustive-deps -- enTick: the English stems load into the bank after mount
  const total = useMemo(() => countFor(classes, MODE_KINDS.mixed, hl), [classes, hl, enTick]); // eslint-disable-line react-hooks/exhaustive-deps -- enTick: the English stems load into the bank after mount

  const start = (m: HayatMode) => {
    setMode(m); setSession([]); setLoading(true);
    void loadHayatEnglish().then(() => { setSession(buildSession(classes, m, Math.random, undefined, hl)); setLoading(false); });
    setIdx(0); setAnswers([]); setHearts(HEARTS); setStreak(0); setBestStreak(0); setScore(0);
    setLeft(CHALLENGE_SECONDS); setDone(false); setNewBest(false);
  };
  const finish = (finalScore: number) => {
    saraStopNarrator(); setDone(true);
    if (mode) { const nb = saveHayatBest(mode, finalScore); setNewBest(nb && finalScore > 0); setBest(readHayatBest()); }
  };
  // Challenge clock.
  useEffect(() => {
    if (mode !== 'challenge' || done || !session.length) return;
    const id = setTimeout(() => { if (left <= 1) { setLeft(0); finish(scoreRef.current); } else setLeft(left - 1); }, 1000);
    return () => clearTimeout(id);
  }, [mode, done, left, session.length]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => saraStopNarrator(), []);

  const q = session[idx];
  const onAnswer = (ok: boolean) => {
    const ns = ok ? streak + 1 : 0;
    const gained = ok ? (mode === 'challenge' ? 10 + Math.min(ns, 5) * 2 : 10) : 0;
    setStreak(ns); setBestStreak(b => Math.max(b, ns)); setScore(s => s + gained);
    setAnswers(a => [...a, { q, ok }]);
    if (!ok && mode !== 'challenge') setHearts(h => h - 1);
  };
  const answered = answers.length > idx;
  const last = answers[idx];
  const next = () => {
    saraStopNarrator();
    const outOfHearts = mode !== 'challenge' && hearts <= 0;
    if (outOfHearts || idx + 1 >= session.length) { finish(score); return; }
    setIdx(i => i + 1);
  };
  // The challenge moves on by itself.
  useEffect(() => {
    if (mode !== 'challenge' || !answered || done) return;
    const id = setTimeout(next, last?.ok ? 700 : 1600);
    return () => clearTimeout(id);
  }, [answered, mode, done]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- Home ----------
  if (!mode) return (
    <div data-testid="hayat-home" className="flex-1 min-h-0 overflow-y-auto bg-[#fdfaf3]" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto p-3 sm:p-5 grid gap-4">
        <div dir="ltr" className="relative overflow-hidden rounded-3xl border border-[#C49E3A]/70 bg-gradient-to-r from-[#001a38] to-[#0a2d5c] shadow-lg flex flex-col sm:flex-row-reverse" data-testid="hayat-hero">
          {/* picture on the right (Hayat stands on its right side), title beside it; stacked on phones */}
          <img src="/hayat/banner.webp" alt="" width={1024} height={576} decoding="async" onClick={() => setZoom({ img: '/hayat/banner.webp' })}
            className={`w-full sm:w-[58%] object-cover cursor-zoom-in ${land ? 'h-[160px]' : 'h-[150px] sm:h-[210px]'}`} style={{ objectPosition: '78% 25%' }} />
          <div dir={rtl ? 'rtl' : 'ltr'} className="px-4 py-3 sm:p-6 sm:flex-1 flex flex-col justify-center">
            <h2 className="text-[22px] sm:text-[30px] font-black text-[#E8C766] leading-tight">{t('مدرسة حياة', "Hayat's School")}</h2>
            <p className="mt-1 text-[12.5px] sm:text-[15px] font-bold text-white/85">{t('حياة ما تشرح، حياة تسأل! أسئلة من كل الفصول', "Hayat doesn't teach, she asks! Questions from every class")}</p>
            <p className="mt-1.5 text-[11.5px] sm:text-[13px] font-black text-emerald-200" data-testid="hayat-total">{t(`${total.toLocaleString('ar-SA')} سؤال جاهز`, `${total} questions ready`)}</p>
          </div>
        </div>

        <section className="rounded-3xl bg-white border border-amber-200 p-3 sm:p-4 shadow-sm">
          <p className="text-[14px] font-black text-[#002147] mb-2">{t('لغة الأسئلة', 'Question language')}</p>
          <div className="flex flex-wrap gap-2" data-testid="hayat-langs">
            {([['all', '🌍', 'عربي + إنجليزي', 'Arabic + English'], ['en', '🇬🇧', 'English', 'English only']] as const).map(([id, ic, ar, en]) => (
              <button key={id} type="button" data-testid={`hayat-lang-${id}`} aria-pressed={hl === id} onClick={() => setHl(id)}
                className={`px-3.5 py-2 rounded-full text-[13px] font-black border-2 ${hl === id ? 'text-white border-emerald-700' : 'bg-white text-[#002147] border-slate-200'}`} style={hl === id ? { background: EMERALD } : undefined}>{ic} {t(ar, en)}</button>))}
          </div>
          {hl === 'en' && <p className="mt-1.5 text-[11.5px] font-bold text-slate-500">{t('', 'Questions are worded in English; Arabic shows only as a small help.')}</p>}
        </section>

        <section className="rounded-3xl bg-white border border-amber-200 p-3 sm:p-4 shadow-sm">
          <p className="text-[14px] font-black text-[#002147] mb-2">{t('من أي فصل تبي الأسئلة؟', 'Which classes?')}</p>
          <div className="flex flex-wrap gap-2" data-testid="hayat-classes">
            <button type="button" data-testid="hayat-class-all" aria-pressed={allOn} onClick={() => toggle('all')}
              className={`px-3.5 py-2 rounded-full text-[13px] font-black border-2 ${allOn ? 'bg-[#002147] text-[#E8C766] border-[#C49E3A]' : 'bg-white text-[#002147] border-slate-200'}`}>🌍 {t('الجميع', 'Everyone')}</button>
            {HAYAT_CLASSES.map(c => { const on = !allOn && classes.includes(c.id); return (
              <button key={c.id} type="button" data-testid={`hayat-class-${c.id}`} aria-pressed={on} onClick={() => toggle(c.id)}
                className={`ps-1 pe-3 py-1 rounded-full text-[13px] font-black border-2 inline-flex items-center gap-1.5 ${on ? 'text-white border-emerald-700' : 'bg-white text-[#002147] border-slate-200'}`} style={on ? { background: EMERALD } : undefined}>
                <img src={c.img} alt="" width={28} height={28} loading="lazy" className="w-7 h-7 rounded-full object-cover bg-[#0a2d5c]" />{t(c.nameAr, c.nameEn)}
              </button>); })}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-3 gap-3" data-testid="hayat-modes">
          {MODES.map(m => { const n = counts[m.id]; const off = n === 0; return (
            <button key={m.id} type="button" disabled={off} data-testid={`hayat-mode-${m.id}`} onClick={() => start(m.id)}
              className={`group text-start rounded-3xl overflow-hidden border-2 bg-white shadow-sm transition-all ${off ? 'opacity-40' : 'hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] border-amber-200 hover:border-[#C49E3A]'} ${m.id === 'challenge' ? 'ring-2 ring-[#C49E3A]/50' : ''}`}>
              <span className={`flex ${land ? 'flex-row items-center' : 'flex-col sm:flex-row sm:items-center'} gap-2 p-2.5`}>
                <img src={m.img} alt="" width={160} height={160} loading="lazy" decoding="async" className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl object-cover bg-[#001a38]" />
                <span className="min-w-0">
                  <span className="block text-[15px] sm:text-[16px] font-black text-[#002147] leading-tight">{t(m.ar, m.en)}</span>
                  <span className="block mt-0.5 text-[11.5px] sm:text-[12.5px] font-bold text-slate-600 leading-snug">{t(m.subAr, m.subEn)}</span>
                  <span className="mt-1 flex flex-wrap gap-x-2 text-[11px] font-black">
                    <span className="text-emerald-700">{off ? t('ما فيه أسئلة لهالفصول', 'None for these classes') : t(`${n.toLocaleString('ar-SA')} سؤال`, `${n} questions`)}</span>
                    {best[m.id] != null && <span className="text-amber-700">🏆 {best[m.id]}</span>}
                  </span>
                </span>
              </span>
            </button>); })}
        </section>
        <p className="text-center text-[11px] font-bold text-slate-500 pb-2">{t('نتايج حياة محفوظة على جهازك بس، وما تغيّر تقدمك أو نقاطك في الأكاديمية.', "Hayat's scores stay on this device and never change your academy progress or points.")}</p>
      </div>
      <Lightbox pic={zoom} onClose={() => setZoom(null)} />
    </div>
  );

  if (loading) return <div data-testid="hayat-loading" className="flex-1 flex items-center justify-center text-[14px] font-black text-slate-500 bg-[#fdfaf3]">{t('حياة تجهّز أسئلتك…', 'Hayat is getting your questions ready…')}</div>;

  // ---------- Results ----------
  if (done || !q) {
    const right = answers.filter(a => a.ok).length; const n = answers.length || 1;
    const pct = Math.round((right / n) * 100);
    const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : right > 0 ? 1 : 0;
    const per = HAYAT_CLASSES.map(c => ({ c, all: answers.filter(a => a.q.cls === c.id).length, ok: answers.filter(a => a.q.cls === c.id && a.ok).length })).filter(x => x.all);
    const wrong = answers.filter(a => !a.ok).slice(0, 8);
    const m = MODES.find(x => x.id === mode)!;
    return (
      <div data-testid="hayat-result" className="flex-1 min-h-0 flex flex-col bg-[#fdfaf3]" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className={`max-w-5xl mx-auto p-3 sm:p-5 grid gap-3 ${land ? 'grid-cols-2 items-start' : ''}`}>
            <div className="rounded-3xl overflow-hidden border-2 border-[#C49E3A] bg-gradient-to-b from-[#001a38] to-[#0a2d5c] text-white shadow-xl p-4 sm:p-5 text-center">
              <img src="/tutors/hayat.webp" alt="" width={96} height={96} className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#C49E3A] object-cover" />
              <p className="mt-2 text-[13px] font-bold text-amber-200">{t(m.ar, m.en)}</p>
              <p className="text-[28px] tracking-widest" aria-label={`${stars} stars`}>{[0, 1, 2].map(i => <span key={i} className={i < stars ? '' : 'opacity-25 grayscale'}>⭐</span>)}</p>
              <p data-testid="hayat-score" className="text-[40px] font-black text-[#E8C766] leading-none">{score}</p>
              <p className="text-[12px] font-bold text-white/70">{t('نقطة حياة', 'Hayat points')}{newBest ? t(' · 🏆 رقم قياسي جديد!', ' · 🏆 New best!') : ''}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[12px] font-black">
                <span className="rounded-2xl bg-white/10 py-2"><span className="block text-[18px] text-emerald-300">{right}/{answers.length}</span>{t('صح', 'right')}</span>
                <span className="rounded-2xl bg-white/10 py-2"><span className="block text-[18px] text-amber-300">{pct}%</span>{t('الدقة', 'accuracy')}</span>
                <span className="rounded-2xl bg-white/10 py-2"><span className="block text-[18px] text-orange-300">🔥{bestStreak}</span>{t('أطول سلسلة', 'best streak')}</span>
              </div>
              <p className="mt-3 text-[13px] font-bold text-white/85">{pct >= 90 ? t('ما شاء الله! حياة فخورة فيك 💚', 'Amazing! Hayat is proud of you 💚') : pct >= 60 ? t('شغل حلو! كمّل وبتصير أقوى ✨', 'Good work! Keep going ✨') : t('كل سؤال تغلط فيه يعلّمك شي، جرّب مرة ثانية 🌱', 'Every miss teaches you something, try again 🌱')}</p>
            </div>
            <div className="grid gap-3">
              {per.length > 0 && <div className="rounded-3xl bg-white border border-amber-200 p-3">
                <p className="text-[13px] font-black text-[#002147] mb-2">{t('نتيجتك في كل فصل', 'By class')}</p>
                <div className="grid gap-1.5">{per.map(x => (
                  <div key={x.c.id} className="flex items-center gap-2 text-[12px] font-black text-[#002147]">
                    <img src={x.c.img} alt="" className="w-6 h-6 rounded-full object-cover" /><span className="w-14 truncate">{t(x.c.nameAr, x.c.nameEn)}</span>
                    <span className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${(x.ok / x.all) * 100}%`, background: EMERALD }} /></span>
                    <span dir="ltr">{x.ok}/{x.all}</span>
                  </div>))}</div>
              </div>}
              {wrong.length > 0 && <div className="rounded-3xl bg-white border border-amber-200 p-3" data-testid="hayat-review">
                <p className="text-[13px] font-black text-[#002147] mb-2">{t('راجع اللي فاتك', 'Review your misses')}</p>
                <ul className="grid gap-1.5">{wrong.map((a, i) => (
                  <li key={i} className="rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-[12.5px] font-bold text-emerald-900"><BidiText text={answerLine(a.q, enMode)} />
                    <span className="block text-[10.5px] text-emerald-700/80">{t(`${hayatClass(a.q.cls).nameAr} · ${a.q.lessonAr}`, `${hayatClass(a.q.cls).nameEn} · ${a.q.lessonEn}`)}</span></li>))}</ul>
              </div>}
            </div>
          </div>
        </div>
        <div className="shrink-0 border-t border-amber-200 bg-white px-3 py-2.5 flex gap-2 justify-center" style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}>
          <button type="button" data-testid="hayat-again" onClick={() => start(mode!)} className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 rounded-2xl text-white font-black text-[15px] py-3" style={{ background: EMERALD }}><RotateCcw size={17} />{t('العب مرة ثانية', 'Play again')}</button>
          <button type="button" data-testid="hayat-home-btn" onClick={() => { setMode(null); setSession([]); }} className="flex-1 max-w-xs rounded-2xl bg-[#002147] text-[#E8C766] font-black text-[15px] py-3">{t('غيّر الاختيار', 'Change')}</button>
        </div>
      </div>
    );
  }

  // ---------- Play ----------
  const praise = (last?.ok ? PRAISE : GENTLE)[idx % 3];
  const cls = hayatClass(q.cls);
  return (
    <div data-testid="hayat-play" data-kind={q.kind} className="flex-1 min-h-0 flex flex-col bg-[#fdfaf3]" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-white border-b border-amber-200">
        <button type="button" onClick={() => { saraStopNarrator(); setMode(null); setSession([]); }} aria-label={t('رجوع', 'Back')} className="p-1.5 rounded-lg hover:bg-slate-100 text-[#002147]">{rtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}</button>
        {mode === 'challenge'
          ? <span data-testid="hayat-timer" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[13px] font-black ${left <= 10 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}`}><Timer size={14} />{left}</span>
          : <span data-testid="hayat-hearts" className="inline-flex gap-0.5" aria-label={`${hearts} hearts`}>{Array.from({ length: HEARTS }, (_, i) => <Heart key={i} size={18} className={i < hearts ? 'fill-rose-500 text-rose-500' : 'text-slate-300'} />)}</span>}
        <span className="flex-1 flex justify-start h-2 rounded-full bg-slate-100 overflow-hidden mx-1">
          <span className="h-full rounded-full transition-all" style={{ width: `${mode === 'challenge' ? ((CHALLENGE_SECONDS - left) / CHALLENGE_SECONDS) * 100 : ((idx + (answered ? 1 : 0)) / Math.min(session.length, SESSION_LEN)) * 100}%`, background: EMERALD }} />
        </span>
        <span className={`inline-flex items-center gap-0.5 text-[13px] font-black ${streak >= 2 ? 'text-orange-600' : 'text-slate-400'}`}><Flame size={15} />{streak}</span>
        <span data-testid="hayat-points" className="text-[13px] font-black text-[#002147] tabular-nums">⭐{score}</span>
      </div>

      <div className={`flex-1 min-h-0 ${land ? 'grid grid-cols-2 gap-3 p-3' : 'overflow-y-auto p-3 sm:p-4'}`}>
        <div className={`${land ? 'min-h-0 overflow-y-auto' : ''} max-w-2xl w-full mx-auto`}>
          <div className="flex items-center gap-2 mb-2">
            <img src="/tutors/hayat.webp" alt="" width={44} height={44} className="w-11 h-11 rounded-full border-2 object-cover" style={{ borderColor: EMERALD }} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-black text-[#002147] leading-tight">{t('حياة تسألك', 'Hayat asks')} <span className="text-slate-400">· {mode === 'challenge' ? `#${idx + 1}` : `${idx + 1}/${session.length}`}</span></p>
              <p className="text-[11px] font-bold text-slate-500 truncate inline-flex items-center gap-1"><img src={cls.img} alt="" className="w-4 h-4 rounded-full object-cover" />{t(`من فصل ${cls.nameAr} · ${q.lessonAr}`, `From ${cls.nameEn}'s class · ${q.lessonEn}`)}</p>
            </div>
          </div>
          <Prompt q={q} t={t} en={enMode} answered={answered} onZoom={setZoom} land={land} />
        </div>
        <div className={`${land ? 'min-h-0 overflow-y-auto' : 'mt-3'} max-w-2xl w-full mx-auto`}>
          <Answers key={`${idx}-${q.id}`} q={q} t={t} answered={answered} onAnswer={onAnswer} onZoom={setZoom} />
        </div>
      </div>

      <div className="shrink-0 border-t border-amber-200 bg-white px-3 pt-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {answered ? (
          <div data-testid="hayat-feedback" data-ok={last.ok ? '1' : '0'} className={`max-w-2xl mx-auto rounded-2xl px-3 py-2 mb-2 max-h-[30dvh] overflow-y-auto ${last.ok ? 'bg-emerald-50 border border-emerald-300' : 'bg-amber-50 border border-amber-300'}`}>
            <p className={`text-[14px] font-black ${last.ok ? 'text-emerald-800' : 'text-amber-800'}`}>{t(praise[0], praise[1])}</p>
            <p className="text-[12.5px] font-bold text-slate-700 leading-snug"><BidiText text={q.kind === 'choice' ? (enMode ? `Correct answer: “${q.options[q.correct]}”.${q.explainEn ? ' ' + q.explainEn : ''}` : q.explainAr) : answerLine(q, enMode)} />
            {q.kind === 'choice' && !enMode && q.explainEn && <span dir="ltr" className="block mt-0.5 text-[12px] text-slate-600">{q.explainEn}</span>}</p>
          </div>
        ) : <p className="max-w-2xl mx-auto text-center text-[11.5px] font-bold text-slate-500 mb-1.5">{t('خذ وقتك، وبعدها اختر 💭', 'Take your time, then choose 💭')}</p>}
        {mode !== 'challenge' && (
          <button type="button" data-testid="hayat-next" disabled={!answered} onClick={next}
            className="w-full max-w-2xl mx-auto mb-1 flex items-center justify-center gap-2 rounded-2xl text-white font-black text-[15px] py-3 disabled:opacity-35" style={{ background: EMERALD }}>
            {hearts <= 0 || idx + 1 >= session.length ? t('شوف نتيجتك', 'See your result') : t('السؤال التالي', 'Next question')}{rtl ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
          </button>
        )}
      </div>
      <Lightbox pic={zoom} onClose={() => setZoom(null)} />
    </div>
  );
};

type T = (ar: string, en: string) => string;
const say = (q: HayatQ, text: string) => { saraUnlockNarrator(); void saraNarrate(text, () => {}, () => {}, () => {}, voiceFor(q)); };

/** The question side (left column on tablet landscape). */
const Prompt: React.FC<{ q: HayatQ; t: T; en: boolean; answered: boolean; onZoom: (p: HayatPic) => void; land: boolean }> = ({ q, t, en, answered, onZoom, land }) => {
  const box = 'rounded-3xl bg-white border-2 border-amber-200 shadow-sm p-3 sm:p-4';
  switch (q.kind) {
    case 'choice': return (
      <div className={box}>
        {!(en && q.promptEn) && <p className="text-[15px] sm:text-[17px] font-black text-[#002147] leading-snug"><BidiText text={q.promptAr} /></p>}
        {q.promptEn && <p dir="ltr" className={`${en ? '' : 'mt-2 '}rounded-2xl bg-[#f0f7ff] px-3 py-2 text-[16px] sm:text-[18px] font-black text-[#002147]`}>{q.promptEn}</p>}
      </div>);
    case 'picture': return (
      <div className={box}>
        <p className="text-[15px] font-black text-[#002147] mb-2">{t('وش الجملة اللي تناسب الصورة؟', 'Which sentence matches the picture?')}</p>
        <Pic pic={q.pic} big onZoom={onZoom} className={`mx-auto aspect-square ${land ? 'h-[calc(100dvh-345px)] max-h-[320px] min-h-[140px] w-auto' : 'w-full max-w-[260px]'}`} />
        {q.pic.img && <p className="mt-1 text-center text-[10.5px] font-bold text-slate-400">{t('اضغط الصورة لتكبيرها', 'Tap to enlarge')}</p>}
      </div>);
    case 'listen': case 'hear': return <ListenPrompt q={q} t={t} answered={answered} box={box} />;
    case 'vocab': return (
      <div className={box}>
        <p className="text-[15px] font-black text-[#002147] mb-2">{q.dir === 'toAr' ? t('وش معنى هالكلمة؟', 'What does this word mean?') : t('أي كلمة إنجليزية معناها:', 'Which English word means:')}</p>
        {q.dir === 'toAr'
          ? <VocabWord q={q} t={t} />
          : <p className="rounded-2xl bg-[#f0f7ff] px-3 py-4 text-center text-[24px] font-black text-[#002147]">{q.ar}</p>}
      </div>);
    case 'tf': return (
      <div className={box}>
        <p className="text-[15px] font-black text-[#002147]">{t('هل المعنى صحيح؟', 'Is the meaning right?')}</p>
        <p className="text-[11.5px] font-bold text-slate-500">{t('اسحب الكرت: يمين = صح، يسار = غلط (أو اضغط الأزرار)', 'Swipe: right = true, left = false (or tap the buttons)')}</p>
      </div>);
    case 'gap': return (
      <div className={box}>
        <p className="text-[15px] font-black text-[#002147] mb-2">{t('كمّل الفراغ بالكلمة الصح', 'Fill the gap')}</p>
        <p dir="ltr" className="rounded-2xl bg-[#f0f7ff] px-3 py-3 text-[18px] sm:text-[20px] font-black text-[#002147] leading-relaxed">{q.masked.split('___').map((p, i, a) => <React.Fragment key={i}>{p}{i < a.length - 1 && <span className="inline-block min-w-[70px] mx-1 border-b-4 border-dashed text-center" style={{ borderColor: EMERALD, color: EMERALD }}>{answered ? q.options[q.correct] : '\u00a0'}</span>}</React.Fragment>)}</p>
        <p className="mt-2 text-[13px] font-bold text-slate-600">{t('المعنى:', 'Meaning:')} {q.ar}</p>
      </div>);
    case 'order': return (
      <div className={box}>
        <p className="text-[15px] font-black text-[#002147]">{t('رتّب الكلمات عشان تصير الجملة:', 'Order the words to say:')}</p>
        <p className="mt-1 rounded-2xl bg-emerald-50 px-3 py-2 text-[15px] font-black text-emerald-900">{q.ar}</p>
      </div>);
  }
};

const VocabWord: React.FC<{ q: Extract<HayatQ, { kind: 'vocab' }>; t: T }> = ({ q, t }) => {
  useEffect(() => { say(q, q.en); }, [q]);
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-[#f0f7ff] px-3 py-3">
      <span dir="ltr" className="text-[26px] sm:text-[30px] font-black text-[#002147]">{q.en}</span>
      <button type="button" data-testid="hayat-listen" aria-label={t('اسمعها', 'Hear it')} onClick={() => say(q, q.en)} className="p-2.5 rounded-full text-white shadow active:scale-95" style={{ background: EMERALD }}><Volume2 size={20} /></button>
    </div>
  );
};

const ListenPrompt: React.FC<{ q: Extract<HayatQ, { kind: 'listen' | 'hear' }>; t: T; answered: boolean; box: string }> = ({ q, t, answered, box }) => {
  const [shown, setShown] = useState(false);
  useEffect(() => { say(q, q.say); }, [q]);
  return (
    <div className={box}>
      <p className="text-[15px] font-black text-[#002147] mb-2">{q.kind === 'hear' ? t('اسمع الجملة واختر المكتوبة', 'Listen and pick the sentence you heard') : t('اسمع الجملة واختر صورتها', 'Listen and choose the picture')}</p>
      <button type="button" data-testid="hayat-listen" onClick={() => say(q, q.say)} className="mx-auto flex items-center justify-center gap-2 rounded-full text-white font-black text-[15px] px-6 py-3 shadow-md active:scale-95" style={{ background: EMERALD }}><Volume2 size={20} />{t('اسمع مرة ثانية', 'Hear it again')}</button>
      {(shown || answered)
        ? (q.kind === 'hear'
            ? <p className="mt-2 text-center text-[14px] font-black text-emerald-800">{q.ar}</p>
            : <p dir="ltr" className="mt-2 text-center text-[16px] font-black text-[#002147]">{q.say}</p>)
        : <button type="button" onClick={() => setShown(true)} className="mt-2 mx-auto block text-[11.5px] font-bold text-slate-500 underline">{q.kind === 'hear' ? t('ما اشتغل الصوت؟ اعرض المعنى بالعربي', 'No sound? Show the Arabic meaning') : t('ما اشتغل الصوت؟ اعرض الجملة', 'No sound? Show the sentence')}</button>}
    </div>
  );
};

/** The answer side (right column on tablet landscape). */
const Answers: React.FC<{ q: HayatQ; t: T; answered: boolean; onAnswer: (ok: boolean) => void; onZoom: (p: HayatPic) => void }> = ({ q, t, answered, onAnswer, onZoom }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const pick = (i: number, correct: number) => { if (answered) return; setPicked(i); onAnswer(i === correct); };
  const tone = (i: number, correct: number) => picked === null && !answered ? 'bg-white border-amber-300 text-[#002147] hover:border-[#C49E3A]'
    : i === correct ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : i === picked ? 'bg-rose-100 border-rose-400 text-rose-900' : 'bg-white/60 border-slate-200 text-slate-500';
  switch (q.kind) {
    case 'choice': case 'picture': case 'gap': case 'vocab': case 'hear': return (
      <div className="grid gap-2">{q.options.map((o, i) => (
        <button key={i} type="button" data-testid="hayat-option" disabled={answered} onClick={() => pick(i, q.correct)} dir="auto"
          className={`w-full rounded-2xl border-2 px-3.5 py-3 text-[15px] sm:text-[16px] font-black text-start transition-all active:scale-[0.99] ${tone(i, q.correct)}`}>
          <span className="inline-flex items-center gap-2">{(answered || picked !== null) && i === q.correct && <Check size={16} />}<BidiText text={o} /></span>
        </button>))}</div>);
    case 'listen': return (
      <div className="grid grid-cols-3 gap-2">{q.options.map((p, i) => (
        <button key={i} type="button" data-testid="hayat-option" disabled={answered} onClick={() => pick(i, q.correct)} className={`rounded-2xl border-4 p-1 ${tone(i, q.correct)}`}>
          <Pic pic={p} className="w-full aspect-square" onZoom={answered ? onZoom : undefined} />
        </button>))}</div>);
    case 'tf': return <Swipe q={q} t={t} answered={answered} onAnswer={onAnswer} />;
    case 'order': return <Order q={q} t={t} answered={answered} onAnswer={onAnswer} />;
  }
};

const Swipe: React.FC<{ q: Extract<HayatQ, { kind: 'tf' }>; t: T; answered: boolean; onAnswer: (ok: boolean) => void }> = ({ q, t, answered, onAnswer }) => {
  const [dx, setDx] = useState(0); const [said, setSaid] = useState<boolean | null>(null); const [drag, setDrag] = useState(false);
  const startX = useRef<number | null>(null);
  const decide = (v: boolean) => { if (answered) return; setSaid(v); setDx(v ? 260 : -260); onAnswer(v === q.truth); };
  return (
    <div className="grid gap-3 select-none">
      <div data-testid="hayat-swipe" className="relative mx-auto w-full max-w-sm touch-pan-y"
        onPointerDown={e => { if (answered) return; startX.current = e.clientX; setDrag(true); (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
        onPointerMove={e => { if (startX.current != null) setDx(e.clientX - startX.current); }}
        onPointerUp={() => { if (startX.current == null) return; startX.current = null; setDrag(false); if (dx > 80) decide(true); else if (dx < -80) decide(false); else setDx(0); }}>
        <div className="rounded-3xl border-2 bg-white shadow-lg px-4 py-5 text-center transition-transform"
          style={{ transform: `translateX(${answered ? 0 : dx}px) rotate(${answered ? 0 : dx / 18}deg)`, borderColor: dx > 40 ? '#10B981' : dx < -40 ? '#F43F5E' : '#FCD34D', transitionDuration: drag ? '0ms' : '250ms' }}>
          <p dir="ltr" className="text-[18px] sm:text-[20px] font-black text-[#002147]">{q.en}</p>
          <p className="mt-2 text-[16px] font-black text-emerald-800">= {q.shownAr}</p>
          {answered && <p className="mt-2 text-[13px] font-black">{q.truth ? t('✅ صحيح', '✅ True') : t(`❌ غلط، معناها: ${q.trueAr}`, `❌ False: ${q.trueAr}`)}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2" dir="ltr">
        <button type="button" data-testid="hayat-false" disabled={answered} onClick={() => decide(false)} className={`rounded-2xl py-3 font-black text-[16px] border-2 ${said === false ? 'bg-rose-500 text-white border-rose-600' : 'bg-rose-50 text-rose-700 border-rose-300'}`}>❌ {t('غلط', 'False')}</button>
        <button type="button" data-testid="hayat-true" disabled={answered} onClick={() => decide(true)} className={`rounded-2xl py-3 font-black text-[16px] border-2 ${said === true ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-emerald-50 text-emerald-700 border-emerald-300'}`}>✅ {t('صح', 'True')}</button>
      </div>
    </div>
  );
};

const Order: React.FC<{ q: Extract<HayatQ, { kind: 'order' }>; t: T; answered: boolean; onAnswer: (ok: boolean) => void }> = ({ q, t, answered, onAnswer }) => {
  const tiles = useMemo(() => { let s = shuffle(q.words.map((w, i) => ({ w, i }))); for (let k = 0; k < 4 && s.every((x, j) => x.w === q.words[j]); k++) s = shuffle(s); return s; }, [q]);
  const [placed, setPlaced] = useState<number[]>([]);
  const built = placed.map(p => tiles[p].w).join(' ');
  const ok = built === q.words.join(' ');
  return (
    <div className="grid gap-2">
      <div dir="ltr" data-testid="hayat-order-line" className={`min-h-[56px] rounded-2xl border-2 border-dashed p-2 flex flex-wrap gap-1.5 ${answered ? (ok ? 'border-emerald-400 bg-emerald-50' : 'border-amber-400 bg-amber-50') : 'border-slate-300 bg-white'}`}>
        {placed.length === 0 && <span className="text-[12px] font-bold text-slate-400 self-center px-1">{t('اضغط الكلمات بالترتيب', 'Tap the words in order')}</span>}
        {placed.map((p, k) => <button key={p} type="button" disabled={answered} onClick={() => setPlaced(x => x.filter((_, j) => j !== k))} className="rounded-xl bg-[#002147] text-white px-2.5 py-1.5 text-[15px] font-black">{tiles[p].w}</button>)}
      </div>
      {answered && !ok && <p dir="ltr" className="rounded-xl bg-emerald-50 border border-emerald-300 px-2.5 py-1.5 text-[14px] font-black text-emerald-900">{q.en}</p>}
      <div dir="ltr" className="flex flex-wrap gap-1.5 justify-center">
        {tiles.map((x, i) => placed.includes(i) ? <span key={i} className="rounded-xl border-2 border-transparent bg-slate-100 px-2.5 py-1.5 text-[15px] font-black text-transparent">{x.w}</span>
          : <button key={i} type="button" data-testid="hayat-tile" disabled={answered} onClick={() => setPlaced(p => [...p, i])} className="rounded-xl border-2 border-amber-300 bg-white px-2.5 py-1.5 text-[15px] font-black text-[#002147] active:scale-95">{x.w}</button>)}
      </div>
      <button type="button" data-testid="hayat-check" disabled={answered || placed.length !== tiles.length} onClick={() => onAnswer(ok)}
        className="rounded-2xl bg-[#002147] text-[#E8C766] font-black text-[15px] py-2.5 disabled:opacity-35">{t('تحقّق', 'Check')}</button>
    </div>
  );
};

export default HayatSchool;
