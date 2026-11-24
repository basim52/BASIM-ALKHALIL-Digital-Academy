import React, { useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import { useRepeatRecognition } from './SaraRepeatPractice';

/**
 * 🎤 «قلها بصوتك» (لينا): the kid says one sentence; the score comes from the same speech check as «ردّد مع سارة»
 * (useRepeatRecognition → scoreRepeat). Practice only: never scored in the lesson, never blocks it — no mic,
 * a denied permission or a browser without speech recognition just shows a short note and the Next button stays on.
 *
 * Privacy (kids): the check uses the browser's built-in speech recognition (Web Speech API). This app does not save or
 * upload the audio itself, but the browser may send it to its speech service (in Chrome: Google's servers) to turn it
 * into text. So the mic never starts before a parent agrees on a one-time card. «أوافق (ولي الأمر)» first asks a quick
 * grown-up question (a two-digit × one-digit sum on an in-card keypad); a wrong answer just stays on the card with a new
 * question. The agreement is kept in localStorage (`lina_mic_consent`), and the card comes back if it is cleared or withdrawn.
 * If localStorage is blocked, the agreement lives only in this component's state, so it counts for this step only.
 * «تخطّي» skips the mic for this step only and never blocks the lesson.
 */
export const LINA_MIC_CONSENT_KEY = 'lina_mic_consent';
export const linaMicConsented = () => { try { return localStorage.getItem(LINA_MIC_CONSENT_KEY) === '1'; } catch { return false; } };
/** A sum a young kid is unlikely to solve: 12..29 × 3..9. */
export const makeParentGate = (rnd: () => number = Math.random) => { const a = 12 + Math.floor(rnd() * 18), b = 3 + Math.floor(rnd() * 7); return { a, b, answer: a * b }; };
export interface LinaSayItProps {
  sentence: string;
  t: (ar: string, en: string) => string;
  accent: string;
  say: (text: string) => void;
  stop: () => void;
  /** Called after each scored try (score 0..1) — the lesson only shows it. */
  onTry?: (score: number, passed: boolean) => void;
}

const LinaSayIt: React.FC<LinaSayItProps> = ({ sentence, t, accent, say, stop, onTry }) => {
  const rec = useRepeatRecognition();
  const [res, setRes] = useState<{ score: number; passed: boolean; heard: string; missing: string[] } | null>(null);
  const supported = rec.supported;
  const [consent, setConsent] = useState(linaMicConsented);
  // true when localStorage refused the agreement: then it lives only here, for this step.
  const [sessionOnly, setSessionOnly] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [gate, setGate] = useState<{ a: number; b: number; answer: number } | null>(null);
  const [typed, setTyped] = useState('');
  const [gateWrong, setGateWrong] = useState(false);
  const agree = () => {
    let saved = false;
    try { localStorage.setItem(LINA_MIC_CONSENT_KEY, '1'); saved = linaMicConsented(); } catch { /* blocked storage */ }
    setSessionOnly(!saved); setConsent(true); setGate(null); setTyped(''); setGateWrong(false);
  };
  const checkGate = () => {
    if (!gate) return;
    if (typed !== '' && Number(typed) === gate.answer) agree();
    else { setGateWrong(true); setTyped(''); setGate(makeParentGate()); }
  };
  const withdraw = () => { rec.stop(); try { localStorage.removeItem(LINA_MIC_CONSENT_KEY); } catch { /* ignore */ } setConsent(false); setSessionOnly(false); setRes(null); };
  /** The mic may open only with the parent's OK: saved in localStorage, or (storage blocked) given in this step. */
  const allowed = () => consent && (sessionOnly || linaMicConsented());
  const start = () => {
    if (!allowed()) { setConsent(false); return; } // never open the mic without the parent's OK
    stop(); setRes(null);
    rec.start(sentence, r => { const sc = r.score ?? 0; setRes({ score: sc, passed: !!r.passed, heard: r.transcript, missing: r.missing }); onTry?.(sc, !!r.passed); });
  };
  const pct = res ? Math.round(res.score * 100) : 0;
  const stars = res ? (res.passed ? 3 : pct >= 50 ? 2 : 1) : 0;
  const hear = <button data-testid="lina-say-listen" onClick={() => say(sentence)} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-3 rounded-2xl bg-amber-400 text-[#001a38] text-[13px] font-black"><Volume2 size={16} /> {t('اسمع لينا', 'Hear Lina')}</button>;
  if (supported && !consent) return (
    <div data-testid="lina-say-box" className="shrink-0 flex flex-col gap-2">
      {skipped
        ? <div className="flex items-center gap-2 flex-wrap">
            <p data-testid="lina-say-skipped" className="flex-1 min-w-[10rem] text-[13px] font-bold text-amber-200 rounded-xl bg-white/10 p-2">{t('بدون مايك: قل الجملة بصوت عالي مع لينا، وبعدين اضغط «النتيجة».', 'No mic: say the sentence out loud with Lina, then tap «Result».')}</p>
            {hear}
            <button data-testid="lina-consent-reopen" onClick={() => setSkipped(false)} className="shrink-0 px-3 py-3 rounded-2xl bg-white/10 text-white text-[12px] font-black">{t('أبغى المايك', 'Use the mic')}</button>
          </div>
        : <div data-testid="lina-mic-consent" role="dialog" aria-label={t('موافقة ولي الأمر على المايك', 'Parent consent for the mic')} className="rounded-2xl bg-white p-3 text-[#001a38] flex flex-col gap-2" style={{ border: `3px solid ${accent}` }}>
            <p className="text-[14px] font-black">👨‍👩‍👦 {t('لولي الأمر', 'For the parent')}</p>
            {!gate && <p data-testid="lina-mic-consent-text" className="text-[13px] font-bold leading-relaxed">{t('هذي الخطوة تستخدم المايك. المتصفح قد يرسل صوت الطفل لخدمة Google للتعرف على الكلام وتحويله لنص. التطبيق نفسه ما يحفظ الصوت ولا يرفعه.', "This step uses the mic. The browser may send your child's voice to Google's speech service to turn it into text. The app itself does not save or upload the audio.")}</p>}
            {gate ? <div data-testid="lina-parent-gate" className="flex flex-col gap-2">
              <p className="text-[13px] font-black">🔒 {t('شكرًا! سؤال صغير للكبار عشان نتأكد إنك ولي الأمر: كم حاصل', 'Thanks! A quick grown-up check: what is')} <span dir="ltr" data-testid="lina-gate-q" className="inline-block px-1.5 rounded-md bg-amber-100 text-[16px]">{gate.a} × {gate.b}</span> {t('؟', '?')}</p>
              <div className="flex items-center gap-2">
                <output data-testid="lina-gate-input" dir="ltr" aria-live="polite" className="flex-1 min-w-0 h-10 rounded-xl border-2 border-slate-300 bg-slate-50 px-3 text-[20px] font-black flex items-center">{typed || <span className="text-slate-400 text-[14px]">{t('اكتب الجواب', 'Type the answer')}</span>}</output>
                <button data-testid="lina-gate-ok" onClick={checkGate} disabled={!typed} className="shrink-0 h-10 px-4 rounded-xl text-white text-[14px] font-black disabled:opacity-40" style={{ background: accent }}>{t('تأكيد', 'OK')}</button>
                <button data-testid="lina-mic-skip" onClick={() => { setGate(null); setTyped(''); setGateWrong(false); setSkipped(true); }} className="shrink-0 h-10 px-3 rounded-xl bg-slate-100 text-[#001a38] text-[13px] font-black border-2 border-slate-200">{t('تخطّي', 'Skip')}</button>
              </div>
              <div dir="ltr" className="grid grid-cols-6 gap-1.5">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(d => <button key={d} data-testid={`lina-gate-key-${d}`} onClick={() => { setGateWrong(false); setTyped(x => (x + d).slice(0, 4)); }} className="h-10 rounded-xl bg-slate-100 border-2 border-slate-200 text-[18px] font-black">{d}</button>)}
                <button data-testid="lina-gate-back" aria-label={t('امسح', 'Delete')} onClick={() => setTyped(x => x.slice(0, -1))} className="h-10 rounded-xl bg-slate-100 border-2 border-slate-200 text-[16px] font-black">⌫</button>
                <button data-testid="lina-gate-cancel" onClick={() => { setGate(null); setTyped(''); setGateWrong(false); }} className="h-10 rounded-xl bg-slate-100 border-2 border-slate-200 text-[12px] font-black">{t('رجوع', 'Back')}</button>
              </div>
              {gateWrong && <p data-testid="lina-gate-wrong" className="text-[12px] font-black text-rose-600">{t('مو هذا الجواب. هذا سؤال جديد، ولو تبغى تقدر تضغط «تخطّي».', 'Not quite. Here is a new one, or tap «Skip».')}</p>}
            </div> : <div className="flex gap-2 flex-wrap">
              <button data-testid="lina-mic-agree" onClick={() => { setGate(makeParentGate()); setTyped(''); setGateWrong(false); }} className="flex-1 min-w-[8rem] py-2.5 rounded-xl text-white text-[14px] font-black" style={{ background: accent }}>{t('أوافق (ولي الأمر)', 'I agree (parent)')}</button>
              <button data-testid="lina-mic-skip" onClick={() => setSkipped(true)} className="flex-1 min-w-[6rem] py-2.5 rounded-xl bg-slate-100 text-[#001a38] text-[14px] font-black border-2 border-slate-200">{t('تخطّي', 'Skip')}</button>
            </div>}
          </div>}
    </div>
  );
  return (
    <div data-testid="lina-say-box" className="shrink-0 flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        {supported ? (rec.listening
          ? <button data-testid="lina-say-stop" onClick={() => rec.stop()} className="flex-1 min-w-[10rem] inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500 text-white text-[16px] font-black animate-pulse"><Square size={18} /> {t('أسمعك… اضغط إذا خلصت', 'Listening… tap when done')}</button>
          : <button data-testid="lina-say-mic" onClick={start} className="flex-1 min-w-[10rem] inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-[16px] font-black" style={{ background: accent }}><Mic size={20} /> {res ? t('قلها مرة ثانية', 'Say it again') : t('اضغط وقل الجملة', 'Tap and say it')}</button>)
          : <p data-testid="lina-say-unsupported" className="flex-1 text-[13px] font-bold text-amber-200 rounded-xl bg-white/10 p-2">{t('المايك مو متاح في هالمتصفح. قل الجملة بصوت عالي مع لينا، وبعدين اضغط «التالي».', 'The mic is not available in this browser. Say the sentence out loud with Lina, then tap «Next».')}</p>}
        {hear}
      </div>
      {rec.error && <p data-testid="lina-say-error" className="text-[12px] font-bold text-rose-200 rounded-xl bg-white/10 p-2">{rec.error} {t('تقدر تضغط «التالي» وتكمل.', 'You can tap «Next» and go on.')}</p>}
      {res && <div data-testid="lina-say-result" data-passed={res.passed ? '1' : '0'} className="rounded-xl bg-white/10 p-2">
        <p className={`text-[15px] font-black ${res.passed ? 'text-emerald-300' : 'text-amber-200'}`}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)} {res.passed ? t('نطق ممتاز! 🎉', 'Great speaking! 🎉') : pct >= 50 ? t('قريب! جرّبها مرة ثانية', 'Close! Try once more') : t('حاول مرة ثانية، قلها ببطء', 'Try again, say it slowly')}</p>
        {res.heard && <p dir="ltr" className="text-[12px] font-bold text-white/80 text-start">🎧 {res.heard}</p>}
        {!res.passed && res.missing.length > 0 && <p className="text-[12px] font-bold text-white/80">{t('ركّز على:', 'Focus on:')} <span dir="ltr" className="text-amber-200">{res.missing.slice(0, 4).join(' · ')}</span></p>}
      </div>}
      {supported && <button data-testid="lina-mic-withdraw" onClick={withdraw} className="self-start text-[11px] font-bold text-white/60 underline">{t('إلغاء موافقة المايك', 'Withdraw mic consent')}</button>}
    </div>
  );
};
export default LinaSayIt;
