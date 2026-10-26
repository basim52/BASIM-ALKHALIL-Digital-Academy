import React, { useCallback, useEffect, useRef, useState } from 'react';
import { L } from '../lib/explainLang';

/** Time TutorTldrawBoard needs to write every step (400ms + 1.1s per call); kids card boards show all cards at once. */
export const boardDrawMs = (calls: number) => 400 + Math.max(0, calls) * 1100;

type Opts = {
  /** true only while the student is on the board view of a lesson */
  active: boolean;
  /** how long the board takes to finish writing its last step */
  drawMs: number;
  /** the teacher's OWN cloud voice: speak `text`, call `onEnd` when it ends or fails */
  say: (text: string, onEnd: () => void) => void;
  stopSay: () => void;
  /** move to the existing next stage (check question / exercises) */
  onAdvance: () => void;
  /** «أبي أعيد الشرح»: replay the board explanation (player calls narrationStarted(true)) */
  onReplay: () => void;
  /** element to scroll to / focus after advancing */
  focusSel?: string;
  seconds?: number;
};

/**
 * Board end → next stage. Fires when the board narration ends naturally (not stopped).
 * - First full narration of the lesson: teacher says a short line, then a 3s countdown auto-advances.
 * - After a manual replay, or when the voice failed/was blocked/never started: the banner shows with the button only (no auto-advance).
 */
export function useBoardNextTransition(o: Opts) {
  const opts = useRef(o); opts.current = o;
  const [banner, setBanner] = useState<null | { auto: boolean }>(null);
  const [left, setLeft] = useState<number | null>(null);
  const pending = useRef(false), had = useRef(false), manual = useRef(false);
  const t0 = useRef(Date.now());
  const timers = useRef<number[]>([]);
  const clear = () => { timers.current.forEach(t => clearTimeout(t)); timers.current = []; };
  const hide = useCallback(() => { clear(); setBanner(null); setLeft(null); }, []);
  const reset = useCallback(() => { hide(); pending.current = false; had.current = false; manual.current = false; t0.current = Date.now(); }, [hide]);

  const show = (auto: boolean, speak: boolean) => {
    if (!opts.current.active) return;
    clear(); setBanner({ auto }); setLeft(null);
    if (!speak) return;
    let begun = false;
    const begin = () => { if (begun) return; begun = true; if (auto) setLeft(opts.current.seconds ?? 3); };
    opts.current.say(L('أحسنت! خلنا نبدأ التمارين', "Well done! Let's start the exercises."), begin);
    timers.current.push(window.setTimeout(begin, 6000)); // slow/failed line: count down anyway
  };

  const advance = useCallback(() => {
    hide();
    opts.current.onAdvance();
    const sel = opts.current.focusSel;
    if (sel) window.setTimeout(() => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return;
      try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch { /* ignore */ }
      try { el.focus({ preventScroll: true }); } catch { /* ignore */ }
    }, 120);
  }, [hide]);

  // countdown tick
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { advance(); return; }
    const t = window.setTimeout(() => setLeft(s => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [left, advance]);

  // leaving the board view cancels everything; arriving with no narration → button-only banner once the board is written
  useEffect(() => {
    if (!o.active) { reset(); return; }
    t0.current = Date.now();
    if (pending.current || had.current) return;
    const t = window.setTimeout(() => { if (!pending.current && !had.current) show(false, false); }, opts.current.drawMs + 6000);
    timers.current.push(t);
  }, [o.active]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => clear(), []);

  return {
    reset,
    /** call whenever the board narration starts; replay=true for a student-requested replay */
    narrationStarted: (replay = false) => {
      hide();
      if (replay || had.current) manual.current = true;
      pending.current = true;
      if (replay) t0.current = Date.now();
    },
    /** board narration ended naturally (not stopped) */
    narrationDone: () => {
      if (!pending.current) return;
      pending.current = false; had.current = true;
      show(!manual.current, true);
    },
    /** voice failed / blocked: wait for the board's last step, then show the button (never forced) */
    narrationFailed: () => {
      if (!pending.current) return;
      pending.current = false;
      clear();
      const wait = Math.max(0, t0.current + opts.current.drawMs - Date.now()) + 2500;
      timers.current.push(window.setTimeout(() => show(false, false), wait));
    },
    banner: banner ? (
      <div data-testid="board-next-banner" role="status" aria-live="polite"
        className="shrink-0 rounded-2xl border-2 border-[#E8C766] bg-[#C49E3A] text-[#002147] px-3 py-2 shadow-lg flex flex-col gap-1.5 animate-[pulse_1.6s_ease-in-out_2]">
        <p className="text-[14px] font-black text-center">
          {banner.auto
            ? <>{L('التمارين تبدأ الحين…', 'Exercises start now…')} {left !== null && <span data-testid="board-next-count" className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#002147] text-amber-300 text-[13px] align-middle">{left}</span>}</>
            : L('خلص الشرح 👏 جاهز للتمارين؟', 'Explanation done 👏 Ready for the exercises?')}
        </p>
        <button type="button" data-testid="board-next-start" onClick={() => { opts.current.stopSay(); advance(); }}
          className="w-full py-2 rounded-xl bg-[#002147] text-amber-300 text-[14px] font-black active:scale-95 transition-transform">{L('ابدأ الحين ←', 'Start now →')}</button>
        <button type="button" data-testid="board-next-stay" onClick={() => { hide(); opts.current.stopSay(); opts.current.onReplay(); }}
          className="self-center text-[11px] font-black underline underline-offset-2 text-[#002147]/80">{L('أبي أعيد الشرح', 'Replay the explanation')}</button>
      </div>
    ) : null,
  };
}

/**
 * Exercises finished: the teacher (own cloud voice) cues the next step once, and the gold card highlights
 * «تدرّب على نطق كلمات الدرس» (opened only by the student's tap — the camera is never opened automatically),
 * with «الدرس التالي» as the secondary action.
 */
export const ExercisesDoneCue: React.FC<{
  say: (text: string) => void;
  onRepeat?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextTestId?: string;
}> = ({ say, onRepeat, onNext, nextLabel, nextTestId = 'cue-next-lesson' }) => {
  useEffect(() => {
    // deferred one tick so a stop() from the click that opened this screen (or a StrictMode remount) can't cut it off
    const t = window.setTimeout(() => say(onRepeat ? L('ممتاز! الحين ردّد معي كلمات الدرس', 'Excellent! Now repeat the lesson words with me.') : L('ممتاز! يلا للدرس التالي', "Excellent! Let's go to the next lesson.")), 150);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div data-testid="exercises-done-cue" role="status" className="rounded-2xl border-2 border-[#E8C766] bg-[#C49E3A] text-[#002147] p-2.5 flex flex-col gap-1.5 shadow-lg">
      <p className="text-[13px] font-black text-center">{onRepeat ? L('ممتاز! 🌟 الخطوة الجاية: ردّد كلمات الدرس', 'Excellent! 🌟 Next: repeat the lesson words') : L('ممتاز! 🌟 الخطوة الجاية: الدرس التالي', 'Excellent! 🌟 Next: the next lesson')}</p>
      {onRepeat && <button type="button" onClick={onRepeat} data-testid="lesson-repeat-open"
        className="w-full py-2.5 rounded-xl bg-[#002147] text-amber-300 text-[14px] font-black ring-4 ring-[#E8C766]/70 animate-pulse active:scale-95 transition-transform">🎙️ تدرّب على نطق كلمات الدرس</button>}
      {onNext && <button type="button" onClick={onNext} data-testid={nextTestId}
        className={`w-full py-2 rounded-xl text-[13px] font-black ${onRepeat ? 'bg-white/80 text-[#002147] border border-[#002147]/20' : 'bg-[#002147] text-amber-300 ring-4 ring-[#E8C766]/70 animate-pulse'}`}>{nextLabel || L('الدرس التالي ←', 'Next lesson →')}</button>}
    </div>
  );
};
