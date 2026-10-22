import React from 'react';
import { useExplainLang } from '../lib/explainLang';
import ExplainLangToggle from './ExplainLangToggle';

/** Light choice page shown once per session after the intro/login: Sara tutor or the academy home. */
export const EntryChooser: React.FC<{ onChoose: (c: 'sara' | 'academy') => void }> = ({ onChoose }) => {
  const [lang] = useExplainLang(); const en = lang === 'en'; const t = (a: string, e: string) => (en ? e : a);
  return (
  <main dir={en ? 'ltr' : 'rtl'} lang={lang} data-testid="entry-chooser" aria-labelledby="entry-title"
    className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 sm:gap-7 px-5 py-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,#0a3a6b_0%,#002147_45%,#000b1a_100%)] text-white">
    <header className="flex flex-col items-center text-center">
      <img src="/icon-192.png" width={72} height={72} alt={t("شعار أكاديمية باسم الخليل الرقمية", "Basim Al-Khalil Digital Academy logo")} decoding="async"
        className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl ring-2 ring-[#C49E3A]/70 shadow-lg shadow-black/40" />
      <p className="mt-3 text-[#E6C36A] text-sm font-bold tracking-wide">{t("أكاديمية باسم الخليل الرقمية", "Basim Al-Khalil Digital Academy")}</p>
      <h1 id="entry-title" className="mt-1 text-2xl sm:text-4xl font-black leading-tight">{t("إلى أين تريد الذهاب اليوم؟", "Where would you like to go today?")}</h1>
      <div aria-hidden="true" className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
    </header>
    <nav aria-label={t("اختيار الوجهة", "Choose where to go")} className="grid w-full max-w-md sm:max-w-2xl gap-3 sm:gap-4 sm:grid-cols-2">
      <button type="button" data-testid="choose-sara" onClick={() => onChoose('sara')}
        aria-label={t("سارة، معلمتك الذكية: دروس ومحادثة وأدوات تدريب", "Sara, your smart teacher: lessons, conversation and practice tools")}
        className="group rounded-3xl bg-white/[0.07] border-2 border-[#C49E3A]/60 p-5 sm:p-7 text-center transition hover:bg-white/[0.12] hover:border-[#E6C36A] active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6C36A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002147]">
        <span aria-hidden="true" className="block text-4xl sm:text-5xl">👩‍🏫</span>
        <span className="mt-2 block text-xl sm:text-2xl font-black text-[#E6C36A]">{t("سارة", "Sara")}</span>
        <span className="mt-1 block text-[14px] text-white/90">{t("معلمتك الذكية: دروس ومحادثة وأدوات تدريب", "Your smart teacher: lessons, conversation and practice tools")}</span>
      </button>
      <button type="button" data-testid="choose-academy" onClick={() => onChoose('academy')}
        aria-label={t("الأكاديمية، الصفحة الرئيسية: البرامج والخطط والتقارير", "The academy home: programs, plans and reports")}
        className="group rounded-3xl bg-white/[0.07] border-2 border-white/30 p-5 sm:p-7 text-center transition hover:bg-white/[0.12] hover:border-white/70 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#002147]">
        <span aria-hidden="true" className="block text-4xl sm:text-5xl">🎓</span>
        <span className="mt-2 block text-xl sm:text-2xl font-black">{t("الأكاديمية", "The Academy")}</span>
        <span className="mt-1 block text-[14px] text-white/90">{t("الصفحة الرئيسية: البرامج والخطط والتقارير", "Home: programs, plans and reports")}</span>
      </button>
    </nav>
    <ExplainLangToggle />
  </main>
  );
};
export default EntryChooser;
