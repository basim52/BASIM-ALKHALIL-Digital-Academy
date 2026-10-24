import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Volume2, Sparkles, Eye } from 'lucide-react';
import { GoldCard, PrimaryButton, AnswerOption } from '../ui/academy';
import { useT, isEn } from '../../lib/explainLang';
import { savePlacementLevel } from '../../lib/placement';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from '../SaraTrackPlayer';
import {
  buildPath, commitPath, deferOnboarding, PATH_INFO, stepPortrait, stepTitle,
  type OnboardingAnswers, type OnboardingRecord, type PlacementResult, type WhoAnswer, type GoalAnswer, type LevelAnswer, type MinutesAnswer,
} from '../../lib/onboarding';
import { LISTENING_AT, PLACEMENT_ITEMS, makeItem, nextBand, scorePlacement, startBand, type PlacementItem } from '../../lib/onboardingPlacement';

type Card<V> = { v: V; icon: string; ar: string; en: string };
const WHO: Card<WhoAnswer>[] = [
  { v: 'child', icon: '🧒', ar: 'طفل', en: 'A child' },
  { v: 'student', icon: '🎒', ar: 'طالب مدرسة أو جامعة', en: 'School / university student' },
  { v: 'employee', icon: '💼', ar: 'موظف', en: 'Employee' },
  { v: 'adult', icon: '🌱', ar: 'كبير وأبدأ من الصفر', en: 'Adult starting from zero' },
];
const GOAL: Card<GoalAnswer>[] = [
  { v: 'travel', icon: '✈️', ar: 'سفر وحياة يومية', en: 'Travel & daily life' },
  { v: 'school', icon: '📚', ar: 'أنجح في المدرسة', en: 'Pass at school' },
  { v: 'exams', icon: '📝', ar: 'اختبارات (IELTS، STEP)', en: 'Exams (IELTS, STEP)' },
  { v: 'work', icon: '🏢', ar: 'الشغل', en: 'Work' },
  { v: 'start', icon: '🚀', ar: 'بس أبي أبدأ', en: 'I just want to start' },
];
const LEVEL: Card<LevelAnswer>[] = [
  { v: 'none', icon: '🥚', ar: 'ما أعرف شي', en: 'I know nothing' },
  { v: 'words', icon: '🔤', ar: 'أعرف كلمات بسيطة', en: 'I know some words' },
  { v: 'understand', icon: '👂', ar: 'أفهم بس ما أتكلم', en: "I understand but can't speak" },
  { v: 'intermediate', icon: '💬', ar: 'متوسط', en: 'Intermediate' },
];
const MINUTES: Card<MinutesAnswer>[] = [
  { v: 10, icon: '⏱️', ar: '١٠ دقائق باليوم', en: '10 minutes a day' },
  { v: 20, icon: '⏰', ar: '٢٠ دقيقة باليوم', en: '20 minutes a day' },
  { v: 30, icon: '🕰️', ar: '٣٠ دقيقة باليوم', en: '30 minutes a day' },
];

export interface OnboardingFlowProps {
  uid?: string;
  profile: any;
  /** Admin preview: nothing is saved unless «احفظه كمساري» is tapped. */
  preview?: boolean;
  /** «أكمل لاحقاً» (hidden in preview). */
  onLater?: () => void;
  onClose: () => void;
  /** Path saved as the student's own. */
  onSaved?: (rec: OnboardingRecord) => void;
  /** «ابدأ أول درس»: rec is the saved record, or an unsaved preview record. */
  onStartLesson: (rec: OnboardingRecord, preview: boolean) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ uid, profile, preview, onLater, onClose, onSaved, onStartLesson }) => {
  const t = useT();
  const [step, setStep] = useState(0); // 0..3 questions · 4 placement · 5 result
  const [ans, setAns] = useState<Partial<OnboardingAnswers>>({});
  const [placement, setPlacement] = useState<PlacementResult | null>(null);
  const [saved, setSaved] = useState<OnboardingRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const questions: { key: keyof OnboardingAnswers; titleAr: string; titleEn: string; cards: Card<any>[] }[] = [
    { key: 'who', titleAr: 'مين أنت؟', titleEn: 'Who are you?', cards: WHO },
    { key: 'goal', titleAr: 'وش هدفك؟', titleEn: "What's your goal?", cards: GOAL },
    { key: 'level', titleAr: 'مستواك تقريباً؟', titleEn: 'Your level, roughly?', cards: LEVEL },
    { key: 'minutes', titleAr: 'كم وقتك؟', titleEn: 'How much time?', cards: MINUTES },
  ];

  const pick = (key: keyof OnboardingAnswers, v: any) => {
    const next = { ...ans, [key]: v };
    setAns(next);
    if (step < 3) setStep(step + 1);
    else if (next.level === 'none') { setPlacement(null); setStep(5); } // «ما أعرف شي» → straight to the from-zero path
    else setStep(4);
  };

  const answers = ans as OnboardingAnswers;
  const plan = useMemo(() => (step === 5 ? buildPath(answers, placement) : null), [step, placement]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const rec = await commitPath(uid, profile, answers, placement, profile?.onboarding || null);
      setSaved(rec); onSaved?.(rec);
      // Official level goes through the server route only (never in preview); a failure must not block the path.
      if (placement && !preview) { try { await savePlacementLevel(placement.level, { totalScore: placement.score }); } catch (e) { console.debug('placement level save note:', e); } }
    } finally { setSaving(false); }
  };
  // Real students: the path is saved as soon as it is shown. Preview: only on «احفظه كمساري».
  const autoSaved = useRef(false);
  useEffect(() => { if (step === 5 && !preview && !autoSaved.current) { autoSaved.current = true; void save(); } }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const previewRec = (): OnboardingRecord => ({ v: 1, done: true, answers, placement, path: plan!.path, steps: plan!.steps, baseline: {}, skipped: {}, checkpoints: [], updatedAt: Date.now() });

  return (
    <div dir="rtl" className="min-h-[100dvh] bg-gradient-to-b from-[#002147] to-[#00152e] text-white flex flex-col" data-testid="onboarding">
      {preview && (
        <div className="bg-[#C49E3A] text-[#002147] text-[12px] font-black px-3 py-1.5 flex items-center gap-1.5 justify-center" data-testid="onboarding-preview-ribbon">
          <Eye size={14} /> {t('وضع التجربة للأدمن — ما ينحفظ شي إلا إذا ضغطت «احفظه كمساري»', 'Admin preview — nothing is saved unless you tap “Save as my path”')}
        </div>
      )}
      <div className="flex items-center gap-2 px-4 pt-4">
        {(step > 0 && step < 5) || preview ? (
          <button onClick={() => { saraStopNarrator(); if (step > 0 && step < 5) setStep(step === 4 ? 3 : step - 1); else onClose(); }} aria-label={t('رجوع', 'Back')} className="p-2 rounded-xl bg-white/10"><ArrowRight size={16} /></button>
        ) : <span className="w-8" />}
        <div className="flex-1 flex gap-1.5" aria-hidden>
          {[0, 1, 2, 3, 4, 5].map(i => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-[#E6C36A]' : 'bg-white/15'}`} />)}
        </div>
        <img src="/tutors/sara.webp" alt="" className="w-9 h-9 rounded-full border-2 border-[#C49E3A] object-cover" />
      </div>

      <div className="flex-1 w-full max-w-xl mx-auto px-4 py-5 flex flex-col">
        {step < 4 && (() => {
          const q = questions[step];
          return (
            <div className="flex-1 flex flex-col" data-testid={`onboarding-q${step + 1}`}>
              <p className="text-[12px] font-bold text-[#E6C36A]">{t(`سؤال ${step + 1} من ٤`, `Question ${step + 1} of 4`)}</p>
              <h1 className="text-2xl font-black mt-1 mb-4">{t(q.titleAr, q.titleEn)}</h1>
              <div className="grid grid-cols-2 gap-3">
                {q.cards.map(c => (
                  <button key={String(c.v)} onClick={() => pick(q.key, c.v)} data-testid={`card-${q.key}-${c.v}`}
                    className={`rounded-2xl bg-white text-[#002147] border-2 p-3 min-h-[118px] flex flex-col items-center justify-center gap-2 text-center active:scale-95 transition-transform ${ans[q.key] === c.v ? 'border-[#C49E3A] ring-2 ring-[#E6C36A]' : 'border-[#C49E3A]/40'}`}>
                    <span className="text-4xl leading-none" aria-hidden>{c.icon}</span>
                    <span className="text-[13px] font-black leading-snug">{t(c.ar, c.en)}</span>
                  </button>
                ))}
              </div>
              <div className="flex-1" />
              {!preview && onLater && (
                <button onClick={() => { deferOnboarding(uid); onLater(); }} className="mt-6 self-center text-[12px] font-bold text-white/60 underline underline-offset-4" data-testid="onboarding-later">
                  {t('أكمل لاحقاً', 'Finish later')}
                </button>
              )}
            </div>
          );
        })()}

        {step === 4 && <PlacementRun level={answers.level} onDone={r => { setPlacement(r); setStep(5); }} />}

        {step === 5 && plan && (
          <div className="flex flex-col gap-4" data-testid="onboarding-result">
            <div className="text-center">
              <Sparkles className="mx-auto text-[#E6C36A]" size={28} />
              <h1 className="text-2xl font-black mt-1">{t('مسارك جاهز!', 'Your path is ready!')}</h1>
              <p className="text-[13px] text-white/75 font-bold mt-1">
                {placement
                  ? t(`مستواك التقريبي ${placement.level} — جاوبت صح ${placement.correct} من ${placement.total}`, `Approximate level ${placement.level} — ${placement.correct} of ${placement.total} correct`)
                  : t('بنبدأ معك من الصفر خطوة بخطوة', "We'll start from zero, step by step")}
              </p>
            </div>
            <GoldCard>
              <p className="text-[15px] font-black">{t(PATH_INFO[plan.path].titleAr, PATH_INFO[plan.path].titleEn)}</p>
              <p className="text-[12px] font-bold text-slate-600 mt-1 leading-6">{t(PATH_INFO[plan.path].descAr, PATH_INFO[plan.path].descEn)}</p>
              <ol className="mt-3 space-y-2">
                {plan.steps.map((s, i) => (
                  <li key={s.trackId + i} className="flex items-center gap-3" data-testid="path-step">
                    <span className="w-5 text-[12px] font-black text-[#C49E3A]">{i + 1}</span>
                    <img src={`/tutors/${stepPortrait(s)}.webp`} alt="" className="w-11 h-11 rounded-full border-2 border-[#C49E3A] object-cover bg-[#002147]" />
                    <span className="text-[13px] font-black leading-snug">{stepTitle(s, isEn())}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[11px] font-bold text-slate-500">{t(`درس واحد باليوم يناسب وقتك (${answers.minutes} دقيقة)، وكل ١٠ دروس فحص قصير.`, `One lesson a day fits your time (${answers.minutes} min), with a short check every 10 lessons.`)}</p>
            </GoldCard>

            {/* «الباقة المناسبة» — reserved slot for a future plan suggestion by level/goal. Intentionally empty: no prices, no payment code. */}
            <div data-slot="suggested-plan" hidden aria-hidden />

            {preview ? (
              <>
                <PrimaryButton className="w-full py-3.5 text-base" disabled={saving || !!saved} onClick={save} data-testid="onboarding-save-mine">
                  {saved ? t('انحفظ كمسارك ✓', 'Saved as your path ✓') : saving ? t('جارٍ الحفظ…', 'Saving…') : t('احفظه كمساري', 'Save as my path')}
                </PrimaryButton>
                <button onClick={() => onStartLesson(saved || previewRec(), !saved)} className="w-full py-3 rounded-xl border-2 border-[#C49E3A] text-[#E6C36A] font-black text-sm" data-testid="onboarding-start">
                  {saved ? t('ابدأ أول درس', 'Start first lesson') : t('جرّب أول درس (بدون حفظ)', 'Try first lesson (not saved)')}
                </button>
                <button onClick={() => { setAns({}); setPlacement(null); setSaved(null); setStep(0); }} className="text-[12px] font-bold text-white/60 underline" data-testid="onboarding-again">{t('جرّب من جديد', 'Try again')}</button>
              </>
            ) : (
              <PrimaryButton className="w-full py-4 text-base" disabled={!saved} onClick={() => saved && onStartLesson(saved, false)} data-testid="onboarding-start">
                {saved ? t('ابدأ أول درس', 'Start first lesson') : t('جارٍ حفظ مسارك…', 'Saving your path…')}
              </PrimaryButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** ~8 adaptive real questions; the 4th is listening via the cloud voice (never the browser voice). */
const PlacementRun: React.FC<{ level: LevelAnswer; onDone: (r: PlacementResult) => void }> = ({ level, onDone }) => {
  const t = useT();
  const used = useRef(new Set<string>());
  const [log, setLog] = useState<{ band: number; right: boolean | null }[]>([]);
  const [item, setItem] = useState<PlacementItem>(() => makeItem(startBand(level), 0, used.current));
  const [picked, setPicked] = useState<number | null>(null);
  const [audio, setAudio] = useState<'idle' | 'loading' | 'playing' | 'played' | 'failed'>('idle');
  const idx = log.length;

  useEffect(() => () => saraStopNarrator(), []);
  const play = () => {
    if (!item.audio) return;
    saraUnlockNarrator(); setAudio('loading');
    saraNarrate(item.audio, () => setAudio('failed'), () => setAudio('failed'), () => setAudio('played'), 'Kore');
    setTimeout(() => setAudio(a => (a === 'loading' ? 'playing' : a)), 400);
  };
  const advance = (right: boolean | null) => {
    saraStopNarrator();
    const nl = [...log, { band: item.band, right }];
    setLog(nl); setPicked(null); setAudio('idle');
    if (nl.length >= PLACEMENT_ITEMS) { onDone(scorePlacement(nl)); return; }
    const b = right === null ? item.band : nextBand(item.band, right);
    setItem(makeItem(b, nl.length, used.current));
  };

  return (
    <div className="flex-1 flex flex-col" data-testid="onboarding-placement">
      <p className="text-[12px] font-bold text-[#E6C36A]">{t(`اختبار تحديد المستوى — ${idx + 1} من ${PLACEMENT_ITEMS}`, `Placement — ${idx + 1} of ${PLACEMENT_ITEMS}`)}</p>
      <h1 className="text-xl font-black mt-1 mb-1">{item.kind === 'listen' ? t('سؤال استماع 🎧', 'Listening 🎧') : t('اختر الجواب الصح', 'Choose the right answer')}</h1>
      <p className="text-[11px] font-bold text-white/55 mb-3">{t('عادي لو ما تعرف — الأسئلة تتغير حسب جوابك.', "It's fine not to know — questions adapt to you.")}</p>
      <GoldCard>
        {item.kind === 'listen' && (
          <div className="mb-3 flex flex-col items-center gap-2">
            <button onClick={play} data-testid="placement-listen" className="w-16 h-16 rounded-full bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] flex items-center justify-center active:scale-95">
              <Volume2 size={28} className={audio === 'loading' ? 'animate-pulse' : ''} />
            </button>
            <span className="text-[11px] font-bold text-slate-500">
              {audio === 'failed' ? t('الصوت ما اشتغل الحين', "Audio didn't play") : audio === 'played' ? t('تقدر تسمعها مرة ثانية', 'You can listen again') : t('اضغط واسمع سارة', 'Tap to hear Sara')}
            </span>
            {audio === 'failed' && <button onClick={() => advance(null)} className="text-[12px] font-black text-[#002147] underline" data-testid="placement-skip-audio">{t('تخطَّ هذا السؤال', 'Skip this question')}</button>}
          </div>
        )}
        <p className="text-[14px] font-black leading-7 mb-3" dir="auto">{item.kind === 'listen' ? t(item.q.promptAr, item.q.promptEn || item.q.promptAr) : item.q.promptAr}</p>
        <div className="grid gap-2">
          {item.q.options.map((o, i) => (
            <AnswerOption key={i} dir="ltr" label={o} disabled={picked !== null || (item.kind === 'listen' && audio === 'idle')}
              state={picked === null ? 'normal' : i === item.q.correctIndex ? (picked === i ? 'correct' : 'normal') : picked === i ? 'wrong' : 'normal'}
              selected={picked === i} onClick={() => setPicked(i)} data-testid={`placement-opt-${i}`} />
          ))}
        </div>
        {item.kind === 'listen' && audio === 'idle' && <p className="mt-2 text-[11px] font-bold text-slate-500">{t('اسمع أول، بعدها اختر.', 'Listen first, then choose.')}</p>}
      </GoldCard>
      <div className="flex-1" />
      <PrimaryButton className="w-full py-3.5 mt-4" disabled={picked === null} onClick={() => advance(picked === item.q.correctIndex)} data-testid="placement-next">
        {idx + 1 >= PLACEMENT_ITEMS ? t('النتيجة', 'Result') : t('التالي', 'Next')}
      </PrimaryButton>
    </div>
  );
};
export { LISTENING_AT };
export default OnboardingFlow;
