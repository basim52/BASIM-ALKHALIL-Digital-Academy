import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { checkSpokenAnswer, SpokenCheckResult } from '../utils/speechAnswerCheck';

interface Props {
  expected: string;
  isRtl: boolean;
  attempts: number;
  passed: boolean;
  maxAttemptsBeforeSkip?: number;
  onResult: (passed: boolean) => void;
}

/** Mic-based speaking exercise: records with Web Speech API (en-US) and checks against the model answer. */
const SpeakingDrillCheck: React.FC<Props> = ({ expected, isRtl, attempts, passed, maxAttemptsBeforeSkip = 3, onResult }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<SpokenCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);
  const gotResultRef = useRef(false);

  // Reset when the exercise changes; always release the mic on unmount.
  useEffect(() => {
    setTranscript(''); setResult(null); setError(null); setListening(false);
    return () => { try { recRef.current?.abort(); } catch (_) {} recRef.current = null; };
  }, [expected]);

  const supported = typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const start = () => {
    setError(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError('متصفحك لا يدعم التعرّف على الصوت (مثل Firefox). جرّب Chrome أو Edge أو Safari.');
      return;
    }
    try { recRef.current?.abort(); } catch (_) {}
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 3;
    gotResultRef.current = false;
    rec.onresult = (e: any) => {
      gotResultRef.current = true;
      const alts: string[] = Array.from(e.results?.[0] || []).map((a: any) => a.transcript || '');
      // pick the best-scoring alternative
      const scored = alts.map(t => ({ t, r: checkSpokenAnswer(t, expected) })).sort((a, b) => b.r.score - a.r.score);
      const best = scored[0];
      if (!best) return;
      setTranscript(best.t);
      setResult(best.r);
      onResult(best.r.passed);
    };
    rec.onerror = (e: any) => {
      const code = e?.error;
      setError(code === 'not-allowed' || code === 'service-not-allowed'
        ? 'ما قدرنا نستخدم المايك. اسمح للموقع بالوصول للمايكروفون ثم أعد المحاولة.'
        : code === 'no-speech' ? 'ما سمعت شيء. اضغط المايك وتكلّم بوضوح.' : 'صار خطأ في التعرّف على الصوت. حاول مرة ثانية.');
      setListening(false);
    };
    // onend ALWAYS clears the listening state, so the button never spins forever.
    rec.onend = () => {
      setListening(false);
      if (!gotResultRef.current) setError(prev => prev || 'ما سمعت شيء. اضغط المايك وتكلّم بوضوح.');
      recRef.current = null;
    };
    recRef.current = rec;
    try { rec.start(); setListening(true); } catch (_) { setListening(false); setError('تعذّر تشغيل المايك. حاول مرة ثانية.'); }
  };

  const stop = () => { try { recRef.current?.stop(); } catch (_) {} };

  const expectedWords = expected.split(/\s+/);
  const missingSet = new Set(result?.missing || []);
  const canSkip = !passed && attempts >= maxAttemptsBeforeSkip;

  return (
    <div className="mt-2 p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2" dir="rtl">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={listening ? stop : start}
          className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 ${listening ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'}`}
        >
          {listening ? <MicOff size={14} /> : <Mic size={14} />}
          <span>{listening ? 'أسمعك… اضغط للإيقاف' : result ? 'سجّل مرة ثانية 🎙️' : 'اضغط وتكلّم بالإنجليزي 🎙️'}</span>
        </button>
        {result && !listening && (
          <button onClick={start} className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
            <RotateCcw size={12} /> <span>إعادة المحاولة</span>
          </button>
        )}
        <span className="text-[11px] text-slate-300">المحاولات: {attempts}</span>
      </div>

      {!supported && !error && (
        <p className="text-[11px] text-amber-200">متصفحك لا يدعم التعرّف على الصوت (مثل Firefox). استخدم Chrome أو Edge أو Safari، أو تخطَّ التمرين بعد ٣ محاولات.</p>
      )}
      {error && <p className="text-[11px] font-bold text-amber-200">{error}</p>}

      {result && (
        <div className={`p-2 rounded-lg text-xs space-y-1 ${result.passed ? 'bg-emerald-500/15 border border-emerald-400/40' : 'bg-rose-500/15 border border-rose-400/40'}`}>
          <div className="flex items-center gap-1.5 font-black">
            {result.passed ? <CheckCircle2 size={14} className="text-emerald-300" /> : <XCircle size={14} className="text-rose-300" />}
            <span className={result.passed ? 'text-emerald-200' : 'text-rose-200'}>
              {result.passed ? `ممتاز! إجابة صحيحة (${Math.round(result.score * 100)}٪) 🌟` : `قريبة! النسبة ${Math.round(result.score * 100)}٪ — حاول مرة ثانية`}
            </span>
          </div>
          <p className="text-slate-200" dir="ltr">🗣️ "{transcript}"</p>
          {!result.passed && (
            <p className="text-slate-200" dir="ltr">
              {expectedWords.map((w, k) => {
                const n = w.toLowerCase().replace(/[^a-z0-9']/g, '').replace(/'.*$/, '');
                const miss = n && missingSet.has(n);
                return <span key={k} className={miss ? 'text-rose-300 underline decoration-wavy font-black' : 'text-emerald-200'}>{w} </span>;
              })}
            </p>
          )}
          {!result.passed && result.mode === 'pattern' && (
            <p className="text-[11px] text-slate-300">💡 استخدم نفس النمط بمعلوماتك أنت (اسمك، عمرك، مدينتك). الكلمات باللون الأحمر ناقصة.</p>
          )}
        </div>
      )}
      {canSkip && <p className="text-[11px] text-sky-200">تقدر تكمل الحين وتقلب الصفحة، وارجع للتمرين لاحقاً 👍</p>}
    </div>
  );
};

export default SpeakingDrillCheck;
