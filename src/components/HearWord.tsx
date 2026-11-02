import React, { useEffect, useState } from 'react';
import { getPronunciation, playWord } from '../lib/freeWordApis';

/** 🔊 «اسمع الكلمة»: real recorded pronunciation (Free Dictionary) with browser-voice fallback; optional IPA. */
export const HearWord: React.FC<{ word: string; showIpa?: boolean; label?: boolean; className?: string; dark?: boolean }> = ({ word, showIpa = true, label = true, className = '', dark }) => {
  const [ipa, setIpa] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true; setIpa(null);
    if (showIpa) getPronunciation(word).then(p => { if (live) setIpa(p?.ipa || null); });
    return () => { live = false; };
  }, [word, showIpa]);
  if (!word || typeof window === 'undefined') return null;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} dir="ltr">
      <button type="button" data-testid="hear-word" aria-label={`اسمع الكلمة ${word}`}
        onClick={e => { e.stopPropagation(); setBusy(true); playWord(word).finally(() => setBusy(false)); }}
        className={`inline-flex items-center gap-1 rounded-full px-2 h-7 text-[11px] font-black border active:scale-95 ${dark ? 'bg-white/10 border-amber-300/60 text-amber-200' : 'bg-white border-[#C49E3A]/60 text-[#002147]'} ${busy ? 'opacity-60' : ''}`}>
        🔊{label && <span dir="rtl">اسمع الكلمة</span>}
      </button>
      {ipa && <span className={`text-[11px] font-mono ${dark ? 'text-slate-300' : 'text-slate-500'}`}>{ipa}</span>}
    </span>
  );
};
