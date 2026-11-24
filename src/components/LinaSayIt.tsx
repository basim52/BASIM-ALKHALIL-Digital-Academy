import React, { useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import { useRepeatRecognition } from './SaraRepeatPractice';

/**
 * 🎤 «قلها بصوتك» (لينا): the kid says one sentence; the score comes from the same speech check as «ردّد مع سارة»
 * (useRepeatRecognition → scoreRepeat). Practice only: never scored in the lesson, never blocks it — no mic,
 * a denied permission or a browser without speech recognition just shows a short note and the Next button stays on.
 * Nothing is recorded, saved or uploaded.
 */
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
  const start = () => {
    stop(); setRes(null);
    rec.start(sentence, r => { const sc = r.score ?? 0; setRes({ score: sc, passed: !!r.passed, heard: r.transcript, missing: r.missing }); onTry?.(sc, !!r.passed); });
  };
  const pct = res ? Math.round(res.score * 100) : 0;
  const stars = res ? (res.passed ? 3 : pct >= 50 ? 2 : 1) : 0;
  return (
    <div data-testid="lina-say-box" className="shrink-0 flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        {supported ? (rec.listening
          ? <button data-testid="lina-say-stop" onClick={() => rec.stop()} className="flex-1 min-w-[10rem] inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500 text-white text-[16px] font-black animate-pulse"><Square size={18} /> {t('أسمعك… اضغط إذا خلصت', 'Listening… tap when done')}</button>
          : <button data-testid="lina-say-mic" onClick={start} className="flex-1 min-w-[10rem] inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-[16px] font-black" style={{ background: accent }}><Mic size={20} /> {res ? t('قلها مرة ثانية', 'Say it again') : t('اضغط وقل الجملة', 'Tap and say it')}</button>)
          : <p data-testid="lina-say-unsupported" className="flex-1 text-[13px] font-bold text-amber-200 rounded-xl bg-white/10 p-2">{t('المايك مو متاح في هالمتصفح. قل الجملة بصوت عالي مع لينا، وبعدين اضغط «التالي».', 'The mic is not available in this browser. Say the sentence out loud with Lina, then tap «Next».')}</p>}
        <button data-testid="lina-say-listen" onClick={() => say(sentence)} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-3 rounded-2xl bg-amber-400 text-[#001a38] text-[13px] font-black"><Volume2 size={16} /> {t('اسمع لينا', 'Hear Lina')}</button>
      </div>
      {rec.error && <p data-testid="lina-say-error" className="text-[12px] font-bold text-rose-200 rounded-xl bg-white/10 p-2">{rec.error} {t('تقدر تضغط «التالي» وتكمل.', 'You can tap «Next» and go on.')}</p>}
      {res && <div data-testid="lina-say-result" data-passed={res.passed ? '1' : '0'} className="rounded-xl bg-white/10 p-2">
        <p className={`text-[15px] font-black ${res.passed ? 'text-emerald-300' : 'text-amber-200'}`}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)} {res.passed ? t('نطق ممتاز! 🎉', 'Great speaking! 🎉') : pct >= 50 ? t('قريب! جرّبها مرة ثانية', 'Close! Try once more') : t('حاول مرة ثانية، قلها ببطء', 'Try again, say it slowly')}</p>
        {res.heard && <p dir="ltr" className="text-[12px] font-bold text-white/80 text-start">🎧 {res.heard}</p>}
        {!res.passed && res.missing.length > 0 && <p className="text-[12px] font-bold text-white/80">{t('ركّز على:', 'Focus on:')} <span dir="ltr" className="text-amber-200">{res.missing.slice(0, 4).join(' · ')}</span></p>}
      </div>}
    </div>
  );
};
export default LinaSayIt;
