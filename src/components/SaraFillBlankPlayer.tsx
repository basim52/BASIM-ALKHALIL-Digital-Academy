import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import ExplainLangToggle from './ExplainLangToggle';
import { useT } from '../lib/explainLang';
import { cancelAllSpeech } from '../lib/audio';
import { pushTrackProgress, markLastTrack, syncTrackProgress } from '../lib/saraProgressSync';
import { readUnlocked, progressKey, saraNarrate, saraStopNarrator, saraUnlockNarrator, saraPrefetchLine } from './SaraTrackPlayer';
import { readTutorUnlocked, saveTutorUnlocked, tutorProgressKey } from '../lib/tutorProgress';
import { personaById, type KidsTheme } from '../data/saraBoardPersonas';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TutorVideoFace } from './tutor3d/TutorVideoFace';
import './tutor3d/tutorBoard.css';
import { type SaraBlankLesson, type SaraBlankCard, type FillBlankTrack, fillBlankLevel, FILL_BLANK_LEVELS } from '../data/saraTracks/fillBlank';
import { SARA_FILL_BLANK } from '../data/fillBlankTracks';

interface Props { isOpen: boolean; onClose: () => void; uid?: string; unlockAll?: boolean }
interface TrackProps extends Props { track: FillBlankTrack }
type Phase = 'ask' | 'wait' | 'reveal';
const THINK_MS = 3000;

/** Sentence with the blank (or the filled word in gold). */
const Sentence: React.FC<{ c: SaraBlankCard; filled: boolean; k?: KidsTheme }> = ({ c, filled, k }) => {
  const parts = c.en.split(new RegExp(`\\b${c.answer}\\b`));
  return (
    <span dir="ltr" className="block text-start text-[17px] font-black text-[#002147]" style={{ direction: 'ltr', ...(k ? { color: k.ink, fontSize: 19 } : {}) }}>
      {parts[0]}
      {filled
        ? <span className="inline-block px-1.5 mx-0.5 rounded-md bg-[#002147] text-[#E8C468] animate-[pulse_0.6s_ease-out_1]" style={k ? { background: k.accent, color: '#fff' } : undefined}>{c.answer}</span>
        : <span className="inline-block w-12 mx-1 border-b-[3px] border-[#C49E3A] align-baseline" style={k ? { borderColor: k.accent, background: k.soft, borderRadius: 4 } : undefined}>&nbsp;</span>}
      {parts.slice(1).join(c.answer)}
    </span>
  );
};

const Lesson: React.FC<{ l: SaraBlankLesson; track: FillBlankTrack; onBack: () => void; onDone: (score: number) => void; hasNext: boolean; onNext: () => void }> = ({ l, track, onBack, onDone, hasNext, onNext }) => {
  const t = useT();
  const P = personaById(track.personaId), V = track.voice, NM = t(P.nameAr, P.nameEn), K = P.kids;
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('ask');
  const [picks, setPicks] = useState<(string | null)[]>(() => l.cards.map(() => null));
  const [speaking, setSpeaking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [noVoice, setNoVoice] = useState(false);
  const [praise, setPraise] = useState(false);
  const run = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const done = started && idx >= l.cards.length;
  const score = picks.filter((p, i) => p !== null && p === l.cards[i].answer).length;

  const clear = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };
  useEffect(() => () => { run.current++; clear(); saraStopNarrator(); }, []);
  useEffect(() => { listRef.current?.querySelector('[data-current="1"]')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [idx, phase]);

  /** Speak one line; resolves when it ends (or fails/blocked — the exercise still continues). */
  const say = (text: string, r: number) => new Promise<void>(res => {
    setSpeaking(true);
    const end = () => { if (r === run.current) setSpeaking(false); res(); };
    saraNarrate(text, () => { setBlocked(true); end(); }, () => { setNoVoice(true); end(); }, end, V);
  });

  const reveal = async (i: number, pick: string | null, r: number) => {
    clear();
    if (r !== run.current) return;
    setPicks(p => { const n = [...p]; n[i] = pick; return n; });
    setPhase('reveal');
    const c = l.cards[i];
    const right = pick === c.answer;
    if (right) { setPraise(true); try { window.dispatchEvent(new CustomEvent('tutor-speech-text', { detail: { text: 'ممتاز! ' + c.sayRight } })); } catch { /* face cue only */ } }
    await say(right ? c.sayRight : c.sayReveal, r);
    if (r !== run.current) return;
    timer.current = setTimeout(() => { if (r !== run.current) return; setPraise(false); next(i + 1, r); }, 900);
  };

  const next = async (i: number, r: number) => {
    setIdx(i); setPhase('ask'); setPraise(false);
    if (i >= l.cards.length) return; // summary + onDone via effect
    const c = l.cards[i];
    saraPrefetchLine(c.sayRight, V); saraPrefetchLine(c.sayReveal, V);
    if (l.cards[i + 1]) saraPrefetchLine(l.cards[i + 1].sayAsk, V);
    await say(c.sayAsk, r);
    if (r !== run.current) return;
    setPhase(p => (p === 'ask' ? 'wait' : p));
    timer.current = setTimeout(() => { void reveal(i, null, r); }, THINK_MS);
  };

  const start = () => {
    saraUnlockNarrator(); // inside the tap (mobile autoplay)
    const r = ++run.current; clear(); saraStopNarrator();
    setStarted(true); setBlocked(false); setNoVoice(false); setPicks(l.cards.map(() => null));
    void next(0, r);
  };
  const pick = (o: string) => {
    if (phase === 'reveal' || picks[idx] !== null) return;
    saraUnlockNarrator();
    const r = ++run.current; saraStopNarrator();
    void reveal(idx, o, r);
  };
  const retryVoice = () => { // playback was blocked: replay the current step inside this tap
    saraUnlockNarrator(); setBlocked(false);
    const r = ++run.current; clear(); saraStopNarrator();
    if (phase === 'reveal') void reveal(idx, picks[idx], r); else void next(idx, r);
  };
  useEffect(() => { if (done) onDone(score); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const shown = started ? l.cards.slice(0, Math.min(idx + 1, l.cards.length)) : [];
  return (
    <div data-testid="fill-blank-lesson" className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-hidden bg-[#001a38]">
      <div className="shrink-0 flex items-center gap-2">
        <button onClick={() => { run.current++; clear(); saraStopNarrator(); onBack(); }} className="p-1 rounded-lg text-white hover:bg-white/10" aria-label="back"><ArrowRight size={16} className={t('', 'rotate-180')} /></button>
        <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-amber-400 text-[#001a38]">{t(`${P.emoji} ${P.nameAr} على السبورة`, `${P.emoji} ${P.nameEn} on the board`)}</span>
        <span className="flex-1 min-w-0 truncate text-[12px] font-black text-white" dir="ltr">{l.titleEn}</span>
        {started && !done && <span className="text-[11px] font-black text-amber-300">{Math.min(idx + 1, l.cards.length)}/{l.cards.length}</span>}
      </div>
      <div className="flex-1 min-h-0 flex gap-2">
        {/* Sara's video face */}
        <div className="shrink-0 w-[30%] max-w-[150px] flex flex-col items-center gap-1.5 pt-1">
          <div className={`relative w-full aspect-square rounded-full border-4 ${speaking ? 'border-amber-300 shadow-[0_0_18px_rgba(232,196,104,.6)]' : 'border-[#C49E3A]'}`} style={K ? { borderColor: K.accent, boxShadow: speaking ? `0 0 18px ${K.accent}` : undefined } : undefined}>
            <TutorVideoFace id={P.id} alt={NM} isSpeaking={speaking} onFail={() => {}} />
          </div>
          <span className="text-[12px] font-black text-amber-300">{NM}</span>
          {praise && <span data-testid="fill-blank-praise" className="px-2 py-0.5 rounded-full bg-[#C49E3A] text-[#001a38] text-[13px] font-black animate-bounce">{t('ممتاز! 🎉', 'Excellent! 🎉')}</span>}
          {blocked && <button onClick={retryVoice} className="px-2 py-1 rounded-lg bg-amber-400 text-[#001a38] text-[11px] font-black animate-bounce">{t('اضغط للاستماع 🔊', 'Tap to listen 🔊')}</button>}
          {noVoice && !blocked && <span className="text-[10px] text-center font-bold text-white/60">{t('الصوت غير متاح الآن', 'Voice unavailable right now')}</span>}
        </div>
        {/* Cards column */}
        <div ref={listRef} className="flex-1 min-w-0 overflow-y-auto flex flex-col gap-2 pb-2">
          {!started && (
            <div className="rounded-2xl bg-white p-3 space-y-2 border-2 border-[#C49E3A]" style={K ? { borderColor: K.accent, borderWidth: 4, background: K.soft } : undefined}>
              <p className="text-[15px] font-black text-[#002147]">{l.icon} {t(l.titleAr, l.titleEn)}</p>
              <p className="text-[13px] font-semibold text-slate-700 leading-relaxed">{t(l.introAr, l.introEn)}</p>
              <button data-testid="fill-blank-start" onClick={start} className="w-full py-2.5 rounded-xl bg-[#002147] text-amber-300 border-2 border-[#C49E3A] text-[14px] font-black">{t(`▶️ ابدأ مع ${P.nameAr}`, `▶️ Start with ${P.nameEn}`)}</button>
            </div>
          )}
          {shown.map((c, i) => {
            const cur = i === idx && !done;
            const filled = !cur || phase === 'reveal';
            const p = picks[i];
            return (
              <div key={i} data-current={cur ? '1' : '0'} data-testid="fill-blank-card"
                className={`rounded-2xl bg-white px-3 py-2 shadow-md transition-all ${cur ? 'ring-4 ring-amber-300/70' : 'opacity-90'}`}
                style={K ? { border: `3px solid ${K.accent}`, ...(cur ? { boxShadow: `0 0 0 4px ${K.soft}, 0 6px 14px rgba(0,0,0,.12)` } : {}) } : undefined}>
                {c.emoji ? (
                  <div className="flex items-center gap-2" dir="ltr">
                    <span data-testid="fill-blank-emoji" className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-[30px]" style={{ background: K?.soft || '#fdfaf3' }} aria-hidden>{c.emoji}</span>
                    <span className="flex-1 min-w-0"><Sentence c={c} filled={filled} k={K} /></span>
                  </div>
                ) : <Sentence c={c} filled={filled} k={K} />}
                {t(c.ar, '') && <span className="block text-[12px] font-bold text-slate-500 text-end" dir="rtl">{c.ar}</span>}
                {cur && (
                  <div className="mt-1.5 flex gap-1.5" dir="ltr">
                    {c.options.map(o => {
                      const kidSt = K && phase === 'reveal' && o === c.answer ? { background: K.accent, borderColor: K.accent, color: '#fff' } : K && phase !== 'reveal' ? { borderColor: K.accent + '66', color: K.ink, background: K.soft } : undefined;
                      const st = phase !== 'reveal' ? 'bg-[#fdfaf3] border-[#002147]/20 text-[#002147]'
                        : o === c.answer ? 'bg-[#002147] border-[#C49E3A] text-[#E8C468]'
                        : o === p ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-white border-slate-200 text-slate-400';
                      return <button key={o} data-testid="fill-blank-option" disabled={phase === 'reveal'} onClick={() => pick(o)} style={kidSt}
                        className={`flex-1 py-1.5 rounded-full border-2 text-[14px] font-black active:scale-95 ${st}`}>{o}</button>;
                    })}
                  </div>
                )}
                {cur && phase === 'wait' && <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden"><div key={i} className="h-full bg-[#C49E3A] origin-left" style={{ animation: `fbShrink ${THINK_MS}ms linear forwards` }} /></div>}
                {!cur && p !== null && <span className="block text-[11px] font-black text-end" dir="rtl">{p === c.answer ? <span className="text-emerald-600">✓</span> : <span className="text-slate-400">{t('الجواب', 'Answer')}: {c.answer}</span>}</span>}
              </div>
            );
          })}
          {done && (
            <div data-testid="fill-blank-done" className="rounded-2xl bg-white p-3 text-center space-y-2 border-2 border-[#C49E3A]">
              <p className="text-2xl">🌟</p>
              <p className="text-[14px] font-black text-[#002147]">{t(`أجبت صح على ${score} من ${l.cards.length}`, `You got ${score} of ${l.cards.length} right`)}</p>
              <button onClick={start} className="w-full py-2 rounded-xl bg-amber-400 text-[#001a38] text-[13px] font-black">{t('🔁 أعد الدرس', '🔁 Replay the lesson')}</button>
              {hasNext && <button onClick={onNext} className="w-full py-2 rounded-xl bg-[#58cc02] text-white text-[13px] font-black">{t('الدرس التالي ←', 'Next lesson →')}</button>}
              <button onClick={onBack} className="w-full py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">{t('رجوع للدروس', 'Back to lessons')}</button>
            </div>
          )}
        </div>
      </div>
      <style>{'@keyframes fbShrink{from{transform:scaleX(1)}to{transform:scaleX(0)}}'}</style>
    </div>
  );
};

/** 🧩 Complete-the-sentence lessons: the tutor's video face + gold-filled blank cards, voiced by that tutor's cloud voice.
 *  Progress: Sara → sara_track_* / saraTrackProgress; tutors → tutor_track_* / tutorTrackProgress (same stores as their other tracks). */
export const FillBlankPlayer: React.FC<TrackProps> = ({ isOpen, onClose, uid, unlockAll, track }) => {
  const t = useT();
  const LESSONS = track.lessons, TID = track.id, sara = track.store === 'sara';
  const read = () => (sara ? readUnlocked(TID, uid) : readTutorUnlocked(TID, uid));
  const [unlockedRaw, setUnlocked] = useState(read);
  const [active, setActive] = useState<SaraBlankLesson | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    setUnlocked(read());
    if (!uid) return;
    if (sara) { syncTrackProgress(uid, [TID]).then(c => { if (c) setUnlocked(read()); }); return; }
    // tutor tracks: take the higher of this device and the cloud copy (another device may be ahead)
    getDoc(doc(db, 'users', uid)).then(d => {
      const cloud = Number((d.data()?.tutorTrackProgress || {})[TID]) || 0;
      if (cloud > read()) { try { localStorage.setItem(tutorProgressKey(TID, uid), String(cloud)); } catch { /* ignore */ } setUnlocked(cloud); }
    }).catch(() => {});
  }, [isOpen, uid, TID]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!isOpen) return null;
  const unlocked = unlockAll ? LESSONS.length : unlockedRaw;
  const onDone = (l: SaraBlankLesson) => setUnlocked(cur => {
    const next = l.order + 1; if (next <= cur) return cur;
    if (sara) {
      try { localStorage.setItem(progressKey(TID, uid), String(next)); } catch { /* ignore */ }
      void pushTrackProgress(uid, TID, next);
    } else saveTutorUnlocked(TID, uid, next);
    return next;
  });
  const close = () => { saraStopNarrator(); cancelAllSpeech(); setActive(null); onClose(); };
  const LV = track.levels?.length ? track.levels : FILL_BLANK_LEVELS;
  const nextOf = (l: SaraBlankLesson) => LESSONS.find(x => x.order === l.order + 1);
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir={t('rtl', 'ltr')}>
      <div data-testid="sara-fill-blank" data-track={TID} className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">🧩</span>
          <p className="flex-1 text-sm font-black">{t(track.titleAr, track.titleEn)}</p>
          <ExplainLangToggle />
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {active ? (
          <Lesson key={active.id} l={active} track={track} onBack={() => { saraStopNarrator(); setActive(null); }} onDone={() => onDone(active)}
            hasNext={!!nextOf(active)} onNext={() => { const n = nextOf(active); if (n) setActive(n); }} />
        ) : (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 grid gap-1.5 content-start">
            {LESSONS.map((l, i) => {
              const open = l.order <= unlocked;
              const lv = fillBlankLevel(l.order), head = i === 0 || fillBlankLevel(LESSONS[i - 1].order) !== lv ? LV[Math.min(lv, LV.length) - 1] : null;
              return (
                <React.Fragment key={l.id}>
                  {head && <p data-testid="fill-blank-level" className="mt-1 px-1 text-[12px] font-black text-[#002147] border-b-2 border-[#C49E3A]/50 pb-0.5">{t(head.ar, head.en)}</p>}
                  <button disabled={!open} data-testid="fill-blank-lesson-item" onClick={() => { saraUnlockNarrator(); if (sara) markLastTrack(uid, TID); setActive(l); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-start ${open ? 'bg-white border-amber-300 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                    <span className="w-6 h-6 rounded-full bg-[#002147] text-white text-[11px] font-black flex items-center justify-center shrink-0">{l.order}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] font-black text-slate-800 truncate">{l.icon} {t(l.titleAr, l.titleEn)}</span>
                      <span dir="ltr" className="block text-[11px] text-slate-500 truncate text-end">{l.titleEn} · {t(`${l.cards.length} جمل`, `${l.cards.length} sentences`)}</span>
                    </span>
                    {open ? (l.order < unlockedRaw ? <CheckCircle2 size={16} className="text-emerald-600" /> : null) : <Lock size={14} className="text-slate-400" />}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export const SaraFillBlankPlayer: React.FC<Props> = props => <FillBlankPlayer {...props} track={SARA_FILL_BLANK} />;
export default SaraFillBlankPlayer;
