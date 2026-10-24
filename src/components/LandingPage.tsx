import React, { useState } from 'react';
import { Language } from '../lib/translations';
import { playAcademyIntroSound } from '../lib/audio';

interface LandingPageProps {
  lang: Language;
  onToggleLang: () => void;
  onGetStarted: () => void;
}

/** Light public landing: hero + 8 tutors («من الصفر» track included) + features + 3 steps + short FAQ + footer. No animation libs, one small image. */
export const LandingPage: React.FC<LandingPageProps> = ({ lang, onToggleLang, onGetStarted }) => {
  const ar = lang === 'ar';
  const [open, setOpen] = useState<number | null>(null);
  const start = () => { try { playAcademyIntroSound(0.85).catch(() => {}); } catch { /* ignore */ } onGetStarted(); };
  const t = (a: string, e: string) => (ar ? a : e);

  const tutors = [
    { img: '/tutors/sara.webp', a: 'سارة', e: 'Sara', ra: 'معلمتك الأساسية: محادثة يومية ودروس شاملة', re: 'Your main teacher: daily conversation and core lessons' },
    { img: '/tutors/grammar.webp', a: 'نورة', e: 'Noura', ra: 'القواعد والأساسيات', re: 'Grammar and basics' },
    { img: '/tutors/business.webp', a: 'محمد', e: 'Mohammed', ra: 'إنجليزية الأعمال والمقابلات', re: 'Business English and interviews' },
    { img: '/tutors/exams.webp', a: 'علي', e: 'Ali', ra: 'التحضير للاختبارات (IELTS)', re: 'Exam prep (IELTS)' },
  ];
  /** «من الصفر — للصغار والكبار»: 4 levels × 30 board lessons + 120 fill-blank lessons each (src/data/tutorTracks). */
  const zero = [
    { img: '/tutors/lama.webp', a: 'لمى', e: 'Lama', ra: 'الحروف والأصوات، ثم قراءة الكلمات والجمل القصيرة', re: 'Letters and sounds, then reading short words and sentences' },
    { img: '/tutors/reem.webp', a: 'ريم', e: 'Reem', ra: 'كلمات كل يوم بالصور: البيت والأكل والمدينة والعمل', re: 'Everyday words with pictures: home, food, the city and work' },
    { img: '/tutors/haya.webp', a: 'هيا', e: 'Haya', ra: 'جمل أساسية من I am حتى الماضي والمستقبل', re: 'Basic sentences from I am to the past and future' },
    { img: '/tutors/jana.webp', a: 'جنى', e: 'Jana', ra: 'تمارين ومراجعة، وكل مستوى ينتهي بدروس مراجعة', re: 'Exercises and review; every level ends with review lessons' },
  ];
  const features = [
    { icon: '📚', a: 'دروس قصيرة على سبورة', e: 'Short whiteboard lessons', da: 'قواعد ومحادثة ومفردات وقراءة وكتابة، كل درس يشرحه معلمك بصوته.', de: 'Grammar, conversation, vocabulary, reading and writing, each lesson explained in your tutor’s voice.' },
    { icon: '🧩', a: 'أكمل الجملة: 600 درس', e: 'Fill the blank: 600 lessons', da: '30 درس مع كل من سارة ونورة ومحمد وعلي، و120 درس مع كل معلمة من معلمات «من الصفر» في 4 مستويات. تنفتح بالترتيب ويُحفظ تقدمك.', de: '30 lessons with each of Sara, Noura, Mohammed and Ali, and 120 with each «from zero» teacher in 4 levels. Unlocked in order with your progress saved.' },
    { icon: '📞', a: 'مكالمة صوتية مع سارة', e: 'Voice calls with Sara', da: 'تتكلم بالإنجليزي وترد عليك، وتصحح أخطاءك بلطف أثناء المحادثة.', de: 'Speak English and she replies, gently modelling the correct form.' },
    { icon: '📷', a: 'السبورة تقرأ الصور', e: 'The board reads images', da: 'حط صورة على السبورة والمعلم يشرح محتواها.', de: 'Put an image on the board and your tutor explains it.' },
    { icon: '🇬🇧', a: 'وضع الإنجليزي الكامل', e: 'Full English mode', da: 'بدّل الشرح والواجهة للإنجليزي بالكامل متى ما كنت جاهز.', de: 'Switch explanations and the interface fully to English when you are ready.' },
    { icon: '✍️', a: 'تدقيق الجمل', e: 'Sentence checker', da: 'اكتب جملة، والمعلم يوضح الخطأ بالعربي ويعطيك تمارين عليه.', de: 'Write a sentence; your tutor explains mistakes in Arabic and gives practice.' },
    { icon: '👨‍👩‍👦', a: 'تقرير ولي الأمر', e: 'Parent report', da: 'ربط حساب ولي الأمر بالطالب وتقرير يوضح تقدمه في الدروس.', de: 'Link a parent account and get a report on the student’s lesson progress.' },
  ];
  const steps = [
    { a: 'سجّل دخولك', e: 'Sign in', da: 'بحساب Google أو بالبريد.', de: 'With Google or email.' },
    { a: 'حدّد مستواك', e: 'Find your level', da: 'اختبار قصير يقترح لك من أين تبدأ.', de: 'A short test suggests where to start.' },
    { a: 'تعلّم مع معلمك', e: 'Learn with your tutor', da: 'اختر سارة أو نورة أو محمد أو علي، أو ابدأ من الصفر مع لمى وريم وهيا وجنى.', de: 'Pick Sara, Noura, Mohammed or Ali, or start from zero with Lama, Reem, Haya and Jana.' },
  ];
  const faq = [
    { qa: 'هل أحتاج تحميل تطبيق؟', qe: 'Do I need an app?', aa: 'لا، الموقع يعمل من متصفح الجوال أو الكمبيوتر، وتقدر تضيفه للشاشة الرئيسية.', ae: 'No. It runs in the browser on phone or computer, and can be added to the home screen.' },
    { qa: 'لمن تناسب الأكاديمية؟', qe: 'Who is it for?', aa: 'للمتعلمين الناطقين بالعربية، من الصفر حتى المستويات المتقدمة. ومسار «من الصفر» مع لمى وريم وهيا وجنى يناسب الصغار والكبار.', ae: 'Arabic-speaking learners, from zero to advanced levels. The «from zero» track with Lama, Reem, Haya and Jana suits children and adults.' },
    { qa: 'هل المعلمين أشخاص حقيقيين؟', qe: 'Are the tutors real people?', aa: 'كل المعلمين (سارة ونورة ومحمد وعلي ولمى وريم وهيا وجنى) معلمين ذكاء اصطناعي بأصوات خاصة فيهم، ممكن يخطئون أحياناً، والدروس نفسها مكتوبة ومراجعة مسبقاً.', ae: 'All the tutors (Sara, Noura, Mohammed, Ali, Lama, Reem, Haya and Jana) are AI tutors with their own voices; they can make mistakes, and the lessons themselves are pre-written.' },
    { qa: 'هل يقدر ولي الأمر يتابع؟', qe: 'Can parents follow progress?', aa: 'نعم، يربط ولي الأمر حسابه بحساب الطالب ويشوف تقرير تقدمه في الدروس.', ae: 'Yes. A parent links their account to the student’s and sees a report of lesson progress.' },
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
              <p className="mt-3 text-lg sm:text-xl font-bold text-[#E6C36A]">{t('تعلّم الإنجليزية مع 8 معلمين أذكياء، من الصفر حتى IELTS', 'Learn English with 8 AI tutors, from zero to IELTS')}</p>
              <ul className="mt-5 mx-auto max-w-md sm:max-w-none flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-4" aria-label={t('المعلمون', 'Tutors')}>
                {[...tutors, ...zero].map(m => (
                  <li key={m.e} className="flex flex-col items-center gap-1">
                    <img src={m.img} width={64} height={64} alt={t(m.a, m.e)} loading="lazy" decoding="async" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-[#C49E3A]" />
                    <span className="text-xs font-bold text-white/90">{t(m.a, m.e)}</span>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={start} data-testid="landing-start"
                className={`mt-7 w-full max-w-xs px-6 py-4 rounded-2xl bg-[#C49E3A] text-[#002147] text-lg font-black shadow-lg shadow-black/30 hover:bg-[#E6C36A] active:scale-[0.98] ${focus}`}>
                {t('سجّل الدخول وابدأ', 'Sign in to start')}
              </button>
              <p className="mt-3 text-sm text-white/85">{t('بحساب Google أو البريد الإلكتروني', 'With Google or email')}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="tutors-h" className="mx-auto max-w-5xl px-5 pt-12" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
          <h2 id="tutors-h" className="text-2xl font-black text-center">{t('معلمينك', 'Your tutors')}</h2>
          <ul className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2">
            {tutors.map(m => (
              <li key={m.e} className="rounded-2xl bg-white border border-[#C49E3A]/40 p-4 flex gap-3 items-center">
                <img src={m.img} width={72} height={72} alt="" loading="lazy" decoding="async" className="w-16 h-16 shrink-0 rounded-2xl object-cover ring-1 ring-[#C49E3A]" />
                <span>
                  <h3 className="font-black">{t(m.a, m.e)}</h3>
                  <p className="text-[15px] text-slate-700">{t(m.ra, m.re)}</p>
                  <p className="mt-1 text-xs font-bold text-[#8a6d1f]">{t('🎙️ صوت ووجه بالفيديو · 🧩 30 درس أكمل الجملة', '🎙️ Voice and video face · 🧩 30 fill-blank lessons')}</p>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="zero-h" data-testid="landing-from-zero" className="mx-auto max-w-5xl px-5 pt-12" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
          <h2 id="zero-h" className="text-2xl font-black text-center">{t('من الصفر — للصغار والكبار', 'From Zero — for Children and Adults')}</h2>
          <p className="mt-2 text-center text-[15px] text-slate-700">{t('أربع معلمات يبدأن معك من الحروف حتى الجمل اليومية، بكروت فيها صورة وكلمة إنجليزية ومعناها بالعربي.', 'Four teachers who start with you from letters to everyday sentences, with picture cards showing the English word and its Arabic meaning.')}</p>
          <ul className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2">
            {zero.map(m => (
              <li key={m.e} className="rounded-2xl bg-white border border-[#C49E3A]/40 p-4 flex gap-3 items-center">
                <img src={m.img} width={72} height={72} alt="" loading="lazy" decoding="async" className="w-16 h-16 shrink-0 rounded-2xl object-cover ring-1 ring-[#C49E3A]" />
                <span>
                  <h3 className="font-black">{t(m.a, m.e)}</h3>
                  <p className="text-[15px] text-slate-700">{t(m.ra, m.re)}</p>
                  <p className="mt-1 text-xs font-bold text-[#8a6d1f]">{t('📚 4 مستويات × 30 درس على السبورة · 🧩 120 درس أكمل الجملة', '📚 4 levels × 30 board lessons · 🧩 120 fill-blank lessons')}</p>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sara-h" className="mx-auto max-w-5xl px-5 py-12" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
          <h2 id="sara-h" className="text-2xl font-black text-center">{t('وش تقدم الأكاديمية؟', 'What the academy offers')}</h2>
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
