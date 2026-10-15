import { SaraNewLevelTest } from './SaraNewLevelTest';
import SaraLevelledList from './SaraLevelledList';
import { levelTitleAr, type NewLevelId } from '../lib/saraNewTrackTests';
import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, Lock, CheckCircle2, Volume2, RotateCcw } from 'lucide-react';
import { LISTENING_LESSONS, LISTENING_TRACK_ID, LISTENING_TITLE_AR, type SaraListeningLesson } from '../data/saraTracks/listening';
import { readUnlocked, progressKey, saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { pushTrackProgress, syncTrackProgress } from '../lib/saraProgressSync';

interface Props { isOpen: boolean; onClose: () => void; uid?: string; unlockAll?: boolean }

const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean);
/** Share of dictation words written correctly, in order (real score, no estimate). */
export function dictationScore(target: string, typed: string): number {
  const a = norm(target), b = norm(typed);
  if (!a.length) return 0;
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return Math.round((dp[a.length][b.length] / Math.max(a.length, b.length)) * 100);
}
const DICTATION_PASS = 80;

type Audio = 'idle' | 'loading' | 'playing' | 'failed' | 'blocked';

const Lesson: React.FC<{ l: SaraListeningLesson; onBack: () => void; onPassed: () => void }> = ({ l, onBack, onPassed }) => {
  const [audio, setAudio] = useState<Audio>('idle');
  const [step, setStep] = useState<'q' | 'd' | 'done'>('q');
  const [picked, setPicked] = useState<(number | null)[]>(l.questions.map(() => null));
  const [typed, setTyped] = useState('');
  const [score, setScore] = useState<number | null>(null);
  useEffect(() => () => saraStopNarrator(), []);
  const play = (text: string) => {
    saraUnlockNarrator(); setAudio('loading');
    saraNarrate(text, () => setAudio('blocked'), () => setAudio('failed'), () => setAudio('idle'));
    setTimeout(() => setAudio(a => (a === 'loading' ? 'playing' : a)), 1200);
  };
  const right = picked.filter((p, i) => p === l.questions[i].correctIndex).length;
  const allPicked = picked.every(p => p !== null);
  const qPass = right >= 2;
  const check = () => { const s = dictationScore(l.dictation, typed); setScore(s); if (s >= DICTATION_PASS && qPass) { setStep('done'); onPassed(); } };
  const audioBtn = (text: string, label: string) => (
    <button onClick={() => play(text)} disabled={audio === 'loading'}
      className="flex-1 py-2 rounded-xl bg-[#C49E3A] text-[#002147] text-[13px] font-black flex items-center justify-center gap-1.5 disabled:opacity-60">
      {audio === 'failed' || audio === 'blocked' ? <RotateCcw size={15} /> : <Volume2 size={15} />}
      {audio === 'loading' ? 'سارة تجهّز الصوت…' : audio === 'failed' ? 'تعذّر الصوت، إعادة المحاولة' : audio === 'blocked' ? 'اضغط للتشغيل' : label}
    </button>
  );
  return (
    <div className="flex-1 min-h-0 flex flex-col p-3 gap-2 overflow-hidden" data-testid="listening-lesson">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-1.5 rounded-lg bg-[#002147] text-white" aria-label="back"><ArrowRight size={16} /></button>
        <p className="flex-1 text-[14px] font-black text-[#002147] truncate">{((l.order - 1) % 30) + 1}. {l.titleAr}</p>
        {l.cefr && <span className="text-[10px] font-black px-1.5 rounded bg-[#002147] text-amber-300">{l.cefr}</span>}
      </div>
      {step === 'q' && <>
        <p className="text-[12px] text-slate-600 font-bold">اسمع الحوار من سارة، وبعدين جاوب. تقدر تعيده كل ما احتجت.</p>
        <div className="flex">{audioBtn(l.audioText, 'اسمع الحوار')}</div>
        <div className="flex-1 min-h-0 grid gap-2 content-start">
          {l.questions.map((q, qi) => (
            <div key={qi} className="rounded-xl bg-white border border-amber-200 p-2">
              <p className="text-[12px] font-black text-slate-800">{q.questionAr} <span dir="ltr" className="text-[#002147]">{q.questionEn}</span></p>
              <div className="flex flex-wrap gap-1 mt-1">
                {q.options.map((o, oi) => {
                  const p = picked[qi]; const st = p === null ? 'bg-slate-50 border-slate-200' : oi === q.correctIndex ? 'bg-emerald-100 border-emerald-500' : p === oi ? 'bg-rose-100 border-rose-400' : 'opacity-60 border-slate-200';
                  return <button key={oi} dir="ltr" disabled={p !== null} onClick={() => setPicked(v => v.map((x, k) => (k === qi ? oi : x)))} className={`px-2 py-1 rounded-lg border text-[12px] font-bold ${st}`}>{o}</button>;
                })}
              </div>
            </div>
          ))}
        </div>
        {allPicked && (qPass
          ? <button onClick={() => { saraStopNarrator(); setAudio('idle'); setStep('d'); }} className="py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">ممتاز {right}/3 — التالي: الإملاء</button>
          : <button onClick={() => setPicked(l.questions.map(() => null))} className="py-2.5 rounded-xl bg-rose-600 text-white font-black text-sm">{right}/3 — اسمع مرة ثانية وحاول</button>)}
      </>}
      {step === 'd' && <>
        <p className="text-[12px] text-slate-600 font-bold">الإملاء: اسمع الجملة واكتبها بالإنجليزي مثل ما سمعتها.</p>
        <div className="flex">{audioBtn(l.dictation, 'اسمع الجملة')}</div>
        <textarea dir="ltr" value={typed} onChange={e => setTyped(e.target.value)} rows={3} autoCapitalize="off" autoCorrect="off" spellCheck={false}
          className="w-full rounded-xl border-2 border-amber-300 p-2 text-[14px] font-bold text-[#002147] bg-white" placeholder="Type what you hear…" />
        {score !== null && score < DICTATION_PASS && <p className="text-[12px] font-black text-rose-600">صحيح {score}% من الكلمات. اسمعها مرة ثانية وعدّل.</p>}
        <button disabled={!typed.trim()} onClick={check} className="py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm disabled:opacity-50">تحقق</button>
      </>}
      {step === 'done' && <div className="flex-1 min-h-0 flex flex-col gap-2">
        <p className="text-[14px] font-black text-emerald-700">أحسنت! الأسئلة {right}/3 والإملاء {score}%. انفتح الدرس التالي.</p>
        <div dir="ltr" className="flex-1 min-h-0 overflow-hidden rounded-xl bg-[#002147] text-white p-2 text-[12px] leading-snug">
          {l.scriptLines.map((s, i) => <p key={i}>{s}</p>)}
          <p className="mt-1 text-amber-300 font-black">✍️ {l.dictation}</p>
        </div>
        <button onClick={onBack} className="py-2.5 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm">رجوع للدروس</button>
      </div>}
    </div>
  );
};

export const SaraListeningPlayer: React.FC<Props> = ({ isOpen, onClose, uid, unlockAll }) => {
  const [unlockedRaw, setUnlocked] = useState(() => readUnlocked(LISTENING_TRACK_ID, uid));
  const [active, setActive] = useState<SaraListeningLesson | null>(null);
  const [testing, setTesting] = useState<NewLevelId | null>(null);
  const [testTick, setTestTick] = useState(0);
  useEffect(() => {
    if (!isOpen) return;
    setUnlocked(readUnlocked(LISTENING_TRACK_ID, uid));
    if (uid) syncTrackProgress(uid, [LISTENING_TRACK_ID]).then(c => { if (c) setUnlocked(readUnlocked(LISTENING_TRACK_ID, uid)); });
  }, [isOpen, uid]);
  const passed = useMemo(() => Math.min(LISTENING_LESSONS.length, unlockedRaw - 1), [unlockedRaw]);
  if (!isOpen) return null;
  const onPassed = (l: SaraListeningLesson) => {
    const next = l.order + 1;
    if (next > unlockedRaw) {
      try { localStorage.setItem(progressKey(LISTENING_TRACK_ID, uid), String(next)); } catch { /* ignore */ }
      setUnlocked(next); void pushTrackProgress(uid, LISTENING_TRACK_ID, next);
    }
  };
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-listening" className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">🎧</span>
          <p className="flex-1 text-sm font-black">{LISTENING_TITLE_AR}{active ? ` — ${levelTitleAr(active.levelId)}` : ''}</p>
          <span className="text-[11px] text-amber-300 font-bold">{passed}/{LISTENING_LESSONS.length}</span>
          <button onClick={() => { saraStopNarrator(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {active ? <Lesson key={active.id} l={active} onBack={() => setActive(null)} onPassed={() => onPassed(active)} /> : (
          <SaraLevelledList lessons={LISTENING_LESSONS} unlockedRaw={unlockedRaw} unlockAll={unlockAll} uid={uid} track="listening" trackId={LISTENING_TRACK_ID}
            refresh={testTick} onOpen={l => setActive(LISTENING_LESSONS.find(x => x.id === l.id) || null)} onTest={lv => setTesting(lv)} />
        )}
        {testing && <SaraNewLevelTest track="listening" level={testing} uid={uid} onClose={() => { setTesting(null); setTestTick(n => n + 1); }} />}
      </div>
    </div>
  );
};
export default SaraListeningPlayer;
