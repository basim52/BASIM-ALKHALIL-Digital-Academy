import React from 'react';

/** Light choice page shown once per session after the intro/login: Sara tutor or the academy home. */
export const EntryChooser: React.FC<{ onChoose: (c: 'sara' | 'academy') => void }> = ({ onChoose }) => (
  <div dir="rtl" data-testid="entry-chooser" className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 px-5 overflow-hidden bg-gradient-to-b from-[#002147] to-[#000b1a] text-white">
    <div className="text-center">
      <p className="text-amber-300 text-xs font-bold tracking-wide">أكاديمية باسم الخليل الرقمية</p>
      <h1 className="mt-1 text-2xl sm:text-3xl font-black">إلى أين تريد الذهاب اليوم؟</h1>
    </div>
    <div className="grid w-full max-w-md sm:max-w-2xl gap-3 sm:grid-cols-2">
      <button data-testid="choose-sara" onClick={() => onChoose('sara')}
        className="group rounded-3xl bg-white/[0.06] border border-amber-300/40 p-5 sm:p-7 text-center transition hover:bg-white/10 hover:border-amber-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
        <span className="block text-4xl sm:text-5xl">👩‍🏫</span>
        <span className="mt-2 block text-xl sm:text-2xl font-black text-amber-300">سارة</span>
        <span className="mt-1 block text-[13px] text-white/70">معلمتك الذكية: دروس ومحادثة وأدوات تدريب</span>
      </button>
      <button data-testid="choose-academy" onClick={() => onChoose('academy')}
        className="group rounded-3xl bg-white/[0.06] border border-white/20 p-5 sm:p-7 text-center transition hover:bg-white/10 hover:border-white/60 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <span className="block text-4xl sm:text-5xl">🎓</span>
        <span className="mt-2 block text-xl sm:text-2xl font-black">الأكاديمية</span>
        <span className="mt-1 block text-[13px] text-white/70">الصفحة الرئيسية: البرامج والخطط والتقارير</span>
      </button>
    </div>
  </div>
);
export default EntryChooser;
