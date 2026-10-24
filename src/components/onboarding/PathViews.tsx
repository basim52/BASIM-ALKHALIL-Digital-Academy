import React, { useMemo, useState } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { GoldCard, PrimaryButton, AnswerOption } from '../ui/academy';
import { useT, isEn } from '../../lib/explainLang';
import { TutorTrackPlayer } from '../TutorTrackPlayer';
import { SaraTrackPlayer } from '../SaraTrackPlayer';
import { saveLevelTestAttempt } from '../../lib/saraLevelTests';
import {
  readLocalOnboarding, nextPathLesson, buildCheckpoint, nextLevelOrder, raiseUnlocked, readStepUnlocked,
  saveOnboarding, pathTrack, CHECK_EVERY, lessonsSincePath, type OnboardingRecord, type CheckQ, type PathStep,
} from '../../lib/onboarding';
import type { TutorTrack } from '../../data/tutorTracks';
import type { SaraTrack } from '../../data/saraTracks/foundations';

/** Opens the next lesson of the path in the existing players (their own progress saving). Preview: guest progress only. */
export const PathLessonView: React.FC<{ uid?: string; profile: any; rec: OnboardingRecord; preview?: boolean; at?: { step: PathStep; order: number } | null; onBack: () => void }> = ({ uid, profile, rec, preview, at, onBack }) => {
  const t = useT();
  const target = useMemo(() => {
    if (at) { const tr = pathTrack(at.step); return tr ? { step: at.step, track: tr, order: at.order } : null; }
    if (preview) { const s = rec.steps[0]; const tr = s && pathTrack(s); return tr ? { step: s, track: tr, order: s.startOrder } : null; }
    const n = nextPathLesson(rec, uid, profile); return n ? { step: n.step, track: n.track, order: n.order } : null;
  }, [rec, uid, profile, preview, at]);
  if (!target) return <div dir="rtl" className="p-6 text-center"><p className="font-black text-[#002147]">{t('خلّصت دروس مسارك 🎉', 'You finished your path 🎉')}</p><PrimaryButton className="mt-4" onClick={onBack}>{t('رجوع', 'Back')}</PrimaryButton></div>;
  const pu = preview ? undefined : uid; // preview never writes the admin's own progress
  const lesson = target.track.lessons.find(l => l.order === target.order) || target.track.lessons[0];
  return (
    <div className="relative">
      {preview && <div data-testid="path-preview-ribbon" className="fixed bottom-3 left-3 z-[200] pointer-events-none rounded-full shadow-lg border border-[#002147]/20 bg-[#C49E3A] text-[#002147] text-[10.5px] font-black px-2.5 py-1 flex items-center gap-1"><Eye size={12} /> {t('تجربة — ما ينحفظ', 'Preview — not saved')}</div>}
      {target.step.kind === 'tutor'
        ? <TutorTrackPlayer track={target.track as TutorTrack} uid={pu} mockLessonOrder={lesson.order} onBack={onBack} />
        : <SaraTrackPlayer isOpen track={target.track as SaraTrack} uid={pu} unlockAll={!!preview} initialLessonId={lesson.id} onClose={onBack} />}
    </div>
  );
};

/** Every 10 path lessons: ~5 real questions from those lessons. ≥80% → offer next level · <60% → suggest review. */
export const PathCheckView: React.FC<{ uid?: string; profile: any; rec: OnboardingRecord; onBack: () => void; onReview: (step: PathStep, order: number) => void; onUpdated: (r: OnboardingRecord) => void }> = ({ uid, profile, rec, onBack, onReview, onUpdated }) => {
  const t = useT();
  const [check] = useState(() => buildCheckpoint(rec, uid, profile));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [leveled, setLeveled] = useState(false);
  if (!check) return <div dir="rtl" className="p-6 text-center"><p className="font-black text-[#002147]">{t('ما فيه أسئلة كافية للفحص الحين.', 'Not enough questions for a check yet.')}</p><PrimaryButton className="mt-4" onClick={onBack}>{t('رجوع', 'Back')}</PrimaryButton></div>;
  const qs = check.qs;
  const finished = answers.length >= qs.length;
  const correct = answers.filter((a, k) => a === qs[k].q.correctIndex).length;
  const score = Math.round((correct / qs.length) * 100);
  const outcome: 'up' | 'keep' | 'review' = score >= 80 ? 'up' : score < 60 ? 'review' : 'keep';
  const weak: CheckQ[] = qs.filter((q, k) => answers[k] !== q.q.correctIndex);
  const unlocked = readStepUnlocked(check.step, uid, profile);
  const upTo = nextLevelOrder(check.track, unlocked);

  const record = async (final: number[]) => {
    const c = final.filter((a, k) => a === qs[k].q.correctIndex).length; const sc = Math.round((c / qs.length) * 100);
    const oc: 'up' | 'keep' | 'review' = sc >= 80 ? 'up' : sc < 60 ? 'review' : 'keep';
    const nr: OnboardingRecord = { ...rec, checkpoints: [...(rec.checkpoints || []), { at: Date.now(), lessonsDone: lessonsSincePath(rec, uid, profile), trackId: check.track.id, correct: c, total: qs.length, outcome: oc }] };
    await saveOnboarding(uid, nr); onUpdated(nr);
    const wrongByLesson: Record<string, number> = {};
    qs.forEach((q, k) => { if (final[k] !== q.q.correctIndex) wrongByLesson[q.lesson.id] = (wrongByLesson[q.lesson.id] || 0) + 1; });
    void saveLevelTestAttempt(uid, {
      trackId: `path-check-${check.track.id}`, trackTitleAr: `فحص المسار — ${check.track.titleAr}`, levelId: `check-${nr.checkpoints.length}`, levelTitleAr: `فحص بعد ${nr.checkpoints.length * CHECK_EVERY} دروس`,
      score: sc, correct: c, total: qs.length, passed: sc >= 80, wrongByLesson,
      weakLessons: qs.filter((q, k) => final[k] !== q.q.correctIndex).map(q => ({ id: q.lesson.id, order: q.lesson.order, titleAr: q.lesson.titleAr, wrong: wrongByLesson[q.lesson.id] || 1 })),
      createdAtMs: Date.now(),
    });
  };
  const levelUp = async () => {
    if (!upTo) return;
    const j = raiseUnlocked(check.step, uid, profile, upTo);
    const latest = readLocalOnboarding(uid) || rec;
    const nr: OnboardingRecord = { ...latest, skipped: { ...(latest.skipped || {}), [check.track.id]: ((latest.skipped || {})[check.track.id] || 0) + j }, jumpsSinceBaseline: (latest.jumpsSinceBaseline || 0) + j };
    await saveOnboarding(uid, nr); onUpdated(nr); setLeveled(true);
  };

  return (
    <div dir="rtl" className="min-h-[100dvh] bg-gradient-to-b from-[#002147] to-[#00152e] text-white" data-testid="path-check">
      <div className="max-w-xl mx-auto px-4 py-4 flex flex-col gap-3 min-h-[100dvh]">
        <div className="flex items-center gap-2">
          <button onClick={onBack} aria-label={t('رجوع', 'Back')} className="p-2 rounded-xl bg-white/10"><ArrowRight size={16} /></button>
          <p className="font-black text-[15px] flex-1">{t('فحص قصير', 'Quick check')} · {isEn() ? check.track.titleEn : check.track.titleAr}</p>
        </div>
        {!finished ? (<>
          <p className="text-[12px] font-bold text-[#E6C36A]">{t(`سؤال ${i + 1} من ${qs.length}`, `Question ${i + 1} of ${qs.length}`)}</p>
          <GoldCard>
            <p className="text-[14px] font-black leading-7 mb-3" dir="auto">{qs[i].q.promptAr}{qs[i].q.promptEn && <span dir="ltr" className="block">{qs[i].q.promptEn}</span>}</p>
            <div className="grid gap-2">{qs[i].q.options.map((o, k) => (
              <AnswerOption key={k} dir="ltr" label={o} disabled={picked !== null} selected={picked === k}
                state={picked === null ? 'normal' : k === qs[i].q.correctIndex ? (picked === k ? 'correct' : 'normal') : picked === k ? 'wrong' : 'normal'} onClick={() => setPicked(k)} />
            ))}</div>
          </GoldCard>
          <div className="flex-1" />
          <PrimaryButton className="w-full py-3.5" disabled={picked === null} onClick={() => { const na = [...answers, picked!]; setAnswers(na); setPicked(null); if (na.length < qs.length) setI(i + 1); else void record(na); }}>
            {i + 1 >= qs.length ? t('النتيجة', 'Result') : t('التالي', 'Next')}
          </PrimaryButton>
        </>) : (
          <GoldCard>
            <p className="text-2xl font-black text-center">{correct} / {qs.length}</p>
            {outcome === 'up' && <>
              <p className="text-[14px] font-black text-center mt-1">{t('ممتاز! مستواك أعلى من دروسك 👏', 'Excellent! You are ahead 👏')}</p>
              {upTo && !leveled && <PrimaryButton className="w-full mt-3" onClick={levelUp} data-testid="check-level-up">{t('انقلني للمستوى اللي بعده', 'Move me up a level')}</PrimaryButton>}
              {leveled && <p className="text-[12px] font-bold text-emerald-700 text-center mt-2">{t('تم! درس اليوم صار من المستوى الجديد.', "Done! Today's lesson is now from the next level.")}</p>}
              {!upTo && <p className="text-[12px] font-bold text-slate-600 text-center mt-2">{t('أنت في آخر مستوى بهذا المسار — كمّل.', 'You are on the last level of this track — keep going.')}</p>}
            </>}
            {outcome === 'keep' && <p className="text-[14px] font-black text-center mt-1">{t('زين! كمّل على نفس المستوى.', 'Good! Keep going at this level.')}</p>}
            {outcome === 'review' && <>
              <p className="text-[14px] font-black text-center mt-1">{t('نقترح تراجع هالدروس قبل تكمل:', 'We suggest reviewing these lessons first:')}</p>
              <div className="mt-2 grid gap-1.5">{Array.from(new Map(weak.map(w => [w.lesson.id, w.lesson])).values()).map(l => (
                <button key={l.id} onClick={() => onReview(check.step, l.order)} className="w-full text-start rounded-xl border border-[#C49E3A]/50 px-3 py-2 text-[13px] font-black">{t('درس', 'Lesson')} {l.order}: {isEn() ? l.titleEn : l.titleAr}</button>
              ))}</div>
            </>}
            <button onClick={onBack} className="w-full mt-3 py-2.5 rounded-xl border-2 border-[#C49E3A] font-black text-sm">{t('رجوع للرئيسية', 'Back to home')}</button>
          </GoldCard>
        )}
      </div>
    </div>
  );
};
