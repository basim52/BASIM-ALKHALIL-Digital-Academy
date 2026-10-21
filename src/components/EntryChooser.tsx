import React from 'react';

/** Light choice page shown once per session after the intro/login: Sara tutor or the academy home. */
export const EntryChooser: React.FC<{ onChoose: (c: 'sara' | 'academy') => void }> = ({ onChoose }) => (
  <main dir="rtl" lang="ar" data-testid="entry-chooser" aria-labelledby="entry-title"
    className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 sm:gap-7 px-5 py-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,#0a3a6b_0%,#002147_45%,#000b1a_100%)] text-white">
    <header className="flex flex-col items-center text-center">
      <img src="/icon-192.png" width={72} height={72} alt="شعار أكاديمية باسم الخليل الرقمية" decoding="async"
        className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl ring-2 ring-[#C49E3A]/70 shadow-lg shadow-black/40" />
      <p className="mt-3 text-[#E6C36A] text-sm font-bold tracking-wide">أكاديمية باسم الخليل الرقمية</p>
      <h1 id="entry-title" className="mt-1 text-2xl sm:text-4xl font-black leading-tight">إلى أين تريد الذهاب اليوم؟</h1>
      <div aria-hidden="true" className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
    </header>
    <nav aria-label="اختيار الوجهة" className="grid w-full max-w-md sm:max-w-2xl gap-3 sm:gap-4 sm:grid-cols-2">
      <button type="button" data-testid="choose-sara" onClick={() => onChoose('sara')}
        aria-label="سارة، معلمتك الذكية: دروس ومحادثة وأدوات تدريب"
        className="group rounded-3xl bg-white/[0.07] border-2 border-[#C49E3A]/60 p-5 sm:p-7 text-center transition hover:bg-white/[0.12] hover:border-[#E6C36A] active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6C36A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002147]">
        <span aria-hidden="true" className="block text-4xl sm:text-5xl">👩‍🏫</span>
        <span className="mt-2 block text-xl sm:text-2xl font-black text-[#E6C36A]">سارة</span>
        <span className="mt-1 block text-[14px] text-white/90">معلمتك الذكية: دروس ومحادثة وأدوات تدريب</span>
      </button>
      <button type="button" data-testid="choose-academy" onClick={() => onChoose('academy')}
        aria-label="الأكاديمية، الصفحة الرئيسية: البرامج والخطط والتقارير"
        className="group rounded-3xl bg-white/[0.07] border-2 border-white/30 p-5 sm:p-7 text-center transition hover:bg-white/[0.12] hover:border-white/70 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#002147]">
        <span aria-hidden="true" className="block text-4xl sm:text-5xl">🎓</span>
        <span className="mt-2 block text-xl sm:text-2xl font-black">الأكاديمية</span>
        <span className="mt-1 block text-[14px] text-white/90">الصفحة الرئيسية: البرامج والخطط والتقارير</span>
      </button>
    </nav>
  </main>
);
export default EntryChooser;
