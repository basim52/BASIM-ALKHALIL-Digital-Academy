import React from 'react';
import { useExplainLang } from '../lib/explainLang';
/** Navy/gold AR/EN switch for explanation language (Sara + tutors). */
export const ExplainLangToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [lang, setLang] = useExplainLang();
  const b = (l: 'ar' | 'en', label: string) => (
    <button type="button" onClick={e => { e.stopPropagation(); setLang(l); }} aria-pressed={lang === l} data-testid={`explain-lang-${l}`}
      className={`px-2 py-0.5 rounded-lg text-[11px] font-black ${lang === l ? 'bg-[#C49E3A] text-[#001a38]' : 'text-amber-200'}`}>{label}</button>
  );
  return (
    <div dir="ltr" title="لغة الشرح / Explanation language" className={`shrink-0 inline-flex items-center gap-0.5 rounded-xl bg-[#002147] border border-[#C49E3A] p-0.5 ${className}`}>
      {b('ar', 'ع')}{b('en', 'EN')}
    </div>
  );
};
export default ExplainLangToggle;
