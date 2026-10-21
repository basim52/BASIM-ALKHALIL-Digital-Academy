import React, { useState } from 'react';
import { Language } from '../lib/translations';
import { playAcademyIntroSound } from '../lib/audio';

interface LandingPageProps {
  lang: Language;
  onToggleLang: () => void;
  onGetStarted: () => void;
}

/** Light public landing: hero + what Sara does + 3 steps + short FAQ + footer. No animation libs, one small image. */
export const LandingPage: React.FC<LandingPageProps> = ({ lang, onToggleLang, onGetStarted }) => {
  const ar = lang === 'ar';
  const [open, setOpen] = useState<number | null>(null);
  const start = () => { try { playAcademyIntroSound(0.85).catch(() => {}); } catch { /* ignore */ } onGetStarted(); };
  const t = (a: string, e: string) => (ar ? a : e);

  const features = [
    { icon: '📚', a: 'دروس قصيرة على سبورة', e: 'Short whiteboard lessons', da: 'قواعد ومحادثة ومفردات وقراءة وكتابة، كل درس صفحة واحدة تشرحها سارة بصوتها.', de: 'Grammar, conversation, vocabulary, reading and writing — one page per lesson, explained in Sara’s voice.' },
    { icon: '📞', a: 'مكالمة صوتية مع سارة', e: 'Voice calls with Sara', da: 'تتكلم بالإنجليزي وترد عليك، وتصحح أخطاءك بلطف أثناء المحادثة.', de: 'Speak English and she replies, gently modelling the correct form.' },
    { icon: '✍️', a: 'تدقيق الجمل', e: 'Sentence checker', da: 'اكتب جملة، وسارة توضح الخطأ بالعربي وتعطيك تمارين عليه.', de: 'Write a sentence; Sara explains mistakes in Arabic and gives practice.' },
    { icon: '👨‍👩‍👦', a: 'متابعة ولي الأمر', e: 'Parent follow-up', da: 'ربط حساب ولي الأمر بالطالب ومتابعة تقدمه في الدروس.', de: 'Link a parent account and follow lesson progress.' },
  ];
  const steps = [
    { a: 'سجّل دخولك', e: 'Sign in', da: 'بحساب Google أو بالبريد.', de: 'With Google or email.' },
    { a: 'حدّد مستواك', e: 'Find your level', da: 'اختبار قصير يقترح لك من أين تبدأ.', de: 'A short test suggests where to start.' },
    { a: 'تعلّم مع سارة', e: 'Learn with Sara', da: 'درس يومي ومكالمات تدريب ومراجعة.', de: 'Daily lessons, practice calls and review.' },
  ];
  const faq = [
    { qa: 'هل أحتاج تحميل تطبيق؟', qe: 'Do I need an app?', aa: 'لا، الموقع يعمل من متصفح الجوال أو الكمبيوتر، وتقدر تضيفه للشاشة الرئيسية.', ae: 'No. It runs in the browser on phone or computer, and can be added to the home screen.' },
    { qa: 'لمن تناسب الأكاديمية؟', qe: 'Who is it for?', aa: 'للمتعلمين الناطقين بالعربية، من المبتدئ حتى المستويات المتقدمة.', ae: 'Arabic-speaking learners, from beginner to advanced levels.' },
    { qa: 'هل سارة معلمة حقيقية؟', qe: 'Is Sara a real teacher?', aa: 'سارة معلمة ذكاء اصطناعي، ممكن تخطئ أحياناً، والدروس نفسها مكتوبة ومراجعة مسبقاً.', ae: 'Sara is an AI tutor and can make mistakes; the lessons themselves are pre-written.' },
  ];
  const focus = 'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E6C36A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002147]';

  return (
    <div dir={ar ? 'rtl' : 'ltr'} lang={ar ? 'ar' : 'en'} className="min-h-[100dvh] bg-[#fdfaf3] text-[#002147]">
      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#0a3a6b_0%,#002147_50%,#000b1a_100%)] text-white">
          <div className="mx-auto max-w-5xl px-5 pt-4 pb-10 sm:pb-16">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <img src="/icon-192.png" width={40} height={40} alt="" className="w-10 h-10 rounded-xl ring-1 ring-[#C49E3A]/70" />
                <span className="text-sm font-bold text-[#E6C36A]">{t('أكاديمية باسم الخليل الرقمية', 'Basim Al-Khalil Digital Academy')}</span>
              </span>
              <button type="button" onClick={onToggleLang} className={`px-3 py-1.5 rounded-full border border-white/40 text-xs font-bold hover:bg-white/10 ${focus}`}>{ar ? 'English' : 'العربية'}</button>
            </div>
            <div className="mt-[min(12vh,5rem)] text-center">
              <img src="/icon-192.png" width={96} height={96} alt={t('شعار أكاديمية باسم الخليل الرقمية', 'Basim Al-Khalil Digital Academy logo')} fetchPriority="high"
                className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ring-2 ring-[#C49E3A] shadow-xl shadow-black/40" />
              <h1 className="mt-5 text-3xl sm:text-5xl font-black leading-tight">{t('أكاديمية باسم الخليل الرقمية', 'Basim Al-Khalil Digital Academy')}</h1>
              <p className="mt-3 text-lg sm:text-xl font-bold text-[#E6C36A]">{t('تعلّم الإنجليزية خطوة بخطوة مع المعلمة الذكية سارة', 'Learn English step by step with Sara, your AI tutor')}</p>
              <button type="button" onClick={start} data-testid="landing-start"
                className={`mt-7 w-full max-w-xs px-6 py-4 rounded-2xl bg-[#C49E3A] text-[#002147] text-lg font-black shadow-lg shadow-black/30 hover:bg-[#E6C36A] active:scale-[0.98] ${focus}`}>
                {t('سجّل الدخول وابدأ', 'Sign in to start')}
              </button>
              <p className="mt-3 text-sm text-white/85">{t('بحساب Google أو البريد الإلكتروني', 'With Google or email')}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="sara-h" className="mx-auto max-w-5xl px-5 py-12" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
          <h2 id="sara-h" className="text-2xl font-black text-center">{t('وش تسوي سارة؟', 'What Sara does')}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map(f => (
              <li key={f.a} className="rounded-2xl bg-white border border-[#C49E3A]/40 p-4 flex gap-3">
                <span aria-hidden="true" className="text-3xl">{f.icon}</span>
                <span><h3 className="font-black">{t(f.a, f.e)}</h3><p className="mt-1 text-[15px] text-slate-700">{t(f.da, f.de)}</p></span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how-h" className="bg-[#002147] text-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '400px' }}>
          <div className="mx-auto max-w-5xl px-5 py-12">
            <h2 id="how-h" className="text-2xl font-black text-center">{t('كيف تبدأ؟', 'How it works')}</h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.a} className="rounded-2xl bg-white/[0.07] border border-[#C49E3A]/50 p-4 text-center">
                  <span className="mx-auto flex w-9 h-9 items-center justify-center rounded-full bg-[#C49E3A] text-[#002147] font-black">{i + 1}</span>
                  <h3 className="mt-2 font-black text-[#E6C36A]">{t(s.a, s.e)}</h3>
                  <p className="mt-1 text-[15px] text-white/90">{t(s.da, s.de)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-h" className="mx-auto max-w-3xl px-5 py-12" style={{ contentVisibility: 'auto', containIntrinsicSize: '400px' }}>
          <h2 id="faq-h" className="text-2xl font-black text-center">{t('أسئلة شائعة', 'FAQ')}</h2>
          <div className="mt-6 grid gap-2">
            {faq.map((f, i) => (
              <div key={f.qa} className="rounded-2xl bg-white border border-slate-200">
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-3 p-4 text-start font-black rounded-2xl ${focus}`}>
                  <span>{t(f.qa, f.qe)}</span><span aria-hidden="true" className="text-[#C49E3A]">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p className="px-4 pb-4 text-[15px] text-slate-700">{t(f.aa, f.ae)}</p>}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button type="button" onClick={start} className={`px-6 py-3 rounded-2xl bg-[#002147] text-[#E6C36A] font-black ${focus}`}>{t('ابدأ الآن', 'Start now')}</button>
          </div>
        </section>
      </main>
      <footer className="bg-[#000b1a] text-white/80 text-center text-sm py-6 px-5">
        © {new Date().getFullYear()} {t('أكاديمية باسم الخليل الرقمية', 'Basim Al-Khalil Digital Academy')}
      </footer>
    </div>
  );
};
export default LandingPage;
