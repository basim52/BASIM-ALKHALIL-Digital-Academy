import MixedText from './MixedText';
import { SaraNewLevelTest } from './SaraNewLevelTest';
import SaraLevelledList from './SaraLevelledList';
import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Lock, CheckCircle2, Volume2, RotateCcw } from 'lucide-react';
import { PRONUNCIATION_LESSONS, PRONUNCIATION_TRACK_ID, type SaraPronLesson } from '../data/saraTracks/pronunciation';
import { pauseNarrator, resumeNarrator } from './SaraTrackPlayer';
import { readUnlocked, progressKey, saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { pushTrackProgress, syncTrackProgress } from '../lib/saraProgressSync';
import SpeakingDrillCheck from './SpeakingDrillCheck';

interface Props { isOpen: boolean; onClose: () => void; uid?: string; unlockAll?: boolean }

/** Sara's cloud voice only; on failure the tapped control turns into a retry. */
function useSara() {
  const [state, setState] = useState<{ text: string; s: 'loading' | 'failed' | 'blocked' } | null>(null);
  useEffect(() => () => saraStopNarrator(), []);
  const play = (text: string) => {
    saraUnlockNarrator(); setState({ text, s: 'loading' });
    saraNarrate(text, () => setState({ text, s: 'blocked' }), () => setState({ text, s: 'failed' }), () => setState(null));
    setTimeout(() => setState(v => (v && v.text === text && v.s === 'loading' ? null : v)), 1500);
  };
  return { state, play };
}

const Lesson: React.FC<{ l: SaraPronLesson; onBack: () => void; onPassed: () => void }> = ({ l, onBack, onPassed }) => {
  const { state, play } = useSara();
  const [picked, setPicked] = useState<(number | null)[]>(l.exercises.map(() => null));
  const [tries, setTries] = useState(0);
  const [spoke, setSpoke] = useState(false);
  const [done, setDone] = useState(false);
  const right = picked.filter((p, i) => p === l.exercises[i].correctIndex).length;
  const all = picked.every(p => p !== null);
  // Passing: 2/3 heard correctly + the sentence said (or skipped after 3 real mic attempts — no fake score).
  const canPass = all && right >= 2 && (spoke || tries >= 3);
  useEffect(() => { if (canPass && !done) { setDone(true); onPassed(); } }, [canPass, done, onPassed]);
  const chip = (w: string, key: string) => {
    const st = state?.text === w ? state.s : null;
    return <button key={key} dir="ltr" onClick={() => play(w)} className={`px-2.5 py-1 rounded-lg border-2 text-[13px] font-black flex items-center gap-1 ${st === 'failed' ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-amber-300 bg-white text-[#002147]'}`}>
      {st === 'failed' ? <RotateCcw size={12} /> : <Volume2 size={12} className="text-[#C49E3A]" />}{w}{st === 'loading' && '…'}</button>;
  };
  const failed = state?.s === 'failed';
  // Sara explains: the idea text on screen, then she models every example word shown below it (same order).
  const examples = l.pairs ? l.pairs.flat() : l.words!;
  const lesson = `${l.ideaAr} ${examples.join('، ')}`;
  const [paused, setPaused] = useState(false);
  useEffect(() => { play(lesson); /* auto-explain on open (tap already unlocked audio) */ }, [l.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const explaining = state?.text === lesson;
  return (
    <div className="flex-1 min-h-0 flex flex-col p-2.5 gap-1.5 overflow-hidden" data-testid="pron-lesson">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-1.5 rounded-lg bg-[#002147] text-white" aria-label="back"><ArrowRight size={16} /></button>
        <p className="flex-1 text-[14px] font-black text-[#002147] truncate">{l.order > 30 ? l.order - 30 : l.order}. {l.titleAr}</p>
        <span dir="ltr" className="text-[10px] font-black px-1.5 rounded bg-[#002147] text-amber-300">{l.titleEn}</span>
      </div>
      <div className="flex gap-1.5">
        <button onClick={() => { setPaused(false); play(lesson); }} className="flex-1 py-1.5 rounded-xl bg-[#C49E3A] text-[#002147] text-[12px] font-black flex items-center justify-center gap-1">
          {explaining && state?.s === 'failed' ? <><RotateCcw size={13} />تعذّر الصوت، إعادة المحاولة</> : explaining && state?.s === 'loading' ? 'سارة تجهّز الشرح…' : <><Volume2 size={13} />اشرحي يا سارة</>}
        </button>
        <button onClick={() => { if (paused) { resumeNarrator(); setPaused(false); } else { pauseNarrator(); setPaused(true); } }} className="px-3 py-1.5 rounded-xl bg-[#002147] text-amber-300 text-[12px] font-black">{paused ? '▶️ كمّلي' : '⏸️ إيقاف مؤقت'}</button>
      </div>
      <p className="text-[12.5px] leading-snug font-bold text-slate-700 bg-white rounded-xl border-2 border-amber-300 p-2"><MixedText text={l.ideaAr} /></p>
      <div className="flex flex-wrap gap-1.5 items-center">
        {l.pairs ? l.pairs.map((p, i) => <span key={i} className="flex items-center gap-1">{chip(p[0], `a${i}`)}<span className="text-slate-400 text-[11px]">/</span>{chip(p[1], `b${i}`)}</span>)
          : l.words!.map((w, i) => chip(w, `w${i}`))}
      </div>
      {failed && !explaining && <p className="text-[11px] font-black text-rose-600">تعذّر صوت سارة. اضغط الكلمة مرة ثانية لإعادة المحاولة.</p>}
      <div className="grid gap-1.5">
        {l.exercises.map((e, ei) => (
          <div key={ei} className="rounded-xl bg-white border border-amber-200 p-1.5 flex items-center gap-1.5 flex-wrap">
            {e.play && <button onClick={() => play(e.play!)} className="w-7 h-7 rounded-full bg-[#C49E3A] text-[#002147] flex items-center justify-center shrink-0" aria-label="play"><Volume2 size={14} /></button>}
            <p className="text-[12px] font-black text-slate-800 flex-1 min-w-[120px]">{e.promptAr}</p>
            <div className="flex gap-1 flex-wrap">
              {e.options.map((o, oi) => {
                const p = picked[ei]; const st = p === null ? 'bg-slate-50 border-slate-200' : oi === e.correctIndex ? 'bg-emerald-100 border-emerald-500' : p === oi ? 'bg-rose-100 border-rose-400' : 'opacity-60 border-slate-200';
                return <button key={oi} dir="auto" disabled={p !== null} onClick={() => setPicked(v => v.map((x, k) => (k === ei ? oi : x)))} className={`px-2 py-0.5 rounded-lg border text-[12px] font-bold ${st}`}>{o}</button>;
              })}
            </div>
          </div>
        ))}
      </div>
      {all && right < 2 && <button onClick={() => setPicked(l.exercises.map(() => null))} className="py-1.5 rounded-xl bg-rose-600 text-white font-black text-[12px]">{right}/3 — اسمع مرة ثانية وحاول</button>}
      <div className="rounded-xl bg-[#002147] p-2">
        <div className="flex items-center gap-2">
          <p className="flex-1 text-[12px] font-black text-amber-300">قلها بصوتك:</p>
          <button onClick={() => play(l.sayEn)} className="px-2 py-0.5 rounded-lg bg-[#C49E3A] text-[#002147] text-[11px] font-black flex items-center gap-1"><Volume2 size={12} />اسمع سارة</button>
        </div>
        <p dir="ltr" className="text-[14px] font-black text-white">{l.sayEn}</p>
        <SpeakingDrillCheck expected={l.sayEn} isRtl attempts={tries} passed={spoke} onResult={ok => { setTries(t => t + 1); if (ok) setSpoke(true); }} />
      </div>
      {done && <div className="flex gap-2"><p className="flex-1 text-[13px] font-black text-emerald-700 self-center">أحسنت! انفتح الدرس التالي.</p><button onClick={onBack} className="px-3 py-2 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm">رجوع</button></div>}
    </div>
  );
};

export const SaraPronunciationPlayer: React.FC<Props> = ({ isOpen, onClose, uid, unlockAll }) => {
  const [unlockedRaw, setUnlocked] = useState(() => readUnlocked(PRONUNCIATION_TRACK_ID, uid));
  const [active, setActive] = useState<SaraPronLesson | null>(null);
  const [testing, setTesting] = useState<'a' | 'b' | null>(null);
  const [testTick, setTestTick] = useState(0);
  useEffect(() => {
    if (!isOpen) return;
    setUnlocked(readUnlocked(PRONUNCIATION_TRACK_ID, uid));
    if (uid) syncTrackProgress(uid, [PRONUNCIATION_TRACK_ID]).then(c => { if (c) setUnlocked(readUnlocked(PRONUNCIATION_TRACK_ID, uid)); });
  }, [isOpen, uid]);
  if (!isOpen) return null;
  const passed = Math.min(PRONUNCIATION_LESSONS.length, unlockedRaw - 1);
  const onPassed = (l: SaraPronLesson) => {
    const next = l.order + 1;
    setUnlocked(cur => {
      if (next <= cur) return cur;
      try { localStorage.setItem(progressKey(PRONUNCIATION_TRACK_ID, uid), String(next)); } catch { /* ignore */ }
      void pushTrackProgress(uid, PRONUNCIATION_TRACK_ID, next);
      return next;
    });
  };
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-pron" className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">🗣️</span>
          <p className="flex-1 text-sm font-black">النطق{active ? (active.levelId === 'b' ? ' — المستوى الثاني' : ' — المستوى الأول') : ''}</p>
          <span className="text-[11px] text-amber-300 font-bold">{passed}/{PRONUNCIATION_LESSONS.length}</span>
          <button onClick={() => { saraStopNarrator(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {active ? <Lesson key={active.id} l={active} onBack={() => setActive(null)} onPassed={() => onPassed(active)} /> : (
          <SaraLevelledList lessons={PRONUNCIATION_LESSONS} unlockedRaw={unlockedRaw} unlockAll={unlockAll} uid={uid} track="pronunciation" trackId={PRONUNCIATION_TRACK_ID}
            refresh={testTick} onOpen={l => setActive(PRONUNCIATION_LESSONS.find(x => x.id === l.id) || null)} onTest={lv => setTesting(lv)} />
        )}
        {testing && <SaraNewLevelTest track="pronunciation" level={testing} uid={uid} onClose={() => { setTesting(null); setTestTick(n => n + 1); }} />}
      </div>
    </div>
  );
};
export default SaraPronunciationPlayer;
