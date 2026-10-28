import React, { useEffect, useRef, useState } from 'react';
import { GoldCard, PrimaryButton, GhostButton, AnswerOption } from './ui/academy';
import { FOUNDATION_LESSON_CHECKS } from './AiFoundationChecks';

interface Props {
  lessonNumber: number;
  isRtl: boolean;
  alreadyCompleted: boolean;
  /** Called once when the student has answered every question correctly. */
  onPass: () => void;
}

/**
 * Short 3-question check at the end of a foundational lesson.
 * A wrong answer shows the reason and lets the student try again, so the
 * lesson is only marked complete after every question is answered correctly.
 */
export const AiFoundationLessonCheck: React.FC<Props> = ({ lessonNumber, isRtl, alreadyCompleted, onPass }) => {
  const questions = FOUNDATION_LESSON_CHECKS[lessonNumber] || [];
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const passedRef = useRef(false);
  const wasCompletedRef = useRef(alreadyCompleted);

  useEffect(() => {
    setIndex(0);
    setPicked(null);
    setWrongPicks([]);
    setFirstTryCorrect(0);
    setDone(false);
    passedRef.current = false;
    wasCompletedRef.current = alreadyCompleted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonNumber]);

  if (questions.length === 0) return null;

  const q = questions[index];
  const answeredCorrectly = picked === q.correct;

  const choose = (optIdx: number) => {
    if (answeredCorrectly) return;
    setPicked(optIdx);
    if (optIdx === q.correct) {
      if (wrongPicks.length === 0) setFirstTryCorrect(c => c + 1);
    } else if (!wrongPicks.includes(optIdx)) {
      setWrongPicks(prev => [...prev, optIdx]);
    }
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setPicked(null);
      setWrongPicks([]);
    } else {
      setDone(true);
      if (!passedRef.current) {
        passedRef.current = true;
        onPass();
      }
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setWrongPicks([]);
    setFirstTryCorrect(0);
    setDone(false);
  };

  return (
    <GoldCard className="p-6 md:p-8 space-y-5 bg-white border-[#C49E3A]/40" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#C49E3A] block">
            {isRtl ? 'تحقق من فهمك' : 'Check your understanding'}
          </span>
          <h5 className="text-lg md:text-xl font-black text-[#002147]">
            {isRtl ? 'أسئلة الدرس 🌟' : 'Lesson questions 🌟'}
          </h5>
        </div>
        {!done && (
          <span className="text-xs font-black text-[#002147] bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-full px-3 py-1 shrink-0">
            {isRtl ? `سؤال ${index + 1} من ${questions.length}` : `Question ${index + 1} of ${questions.length}`}
          </span>
        )}
      </div>

      {!done ? (
        <div className="p-5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/30 space-y-4">
          <p className="text-base md:text-lg font-black text-[#002147] leading-relaxed">
            {isRtl ? q.q : q.qEn}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, optIdx) => {
              const state = answeredCorrectly && optIdx === q.correct
                ? 'correct'
                : wrongPicks.includes(optIdx)
                ? 'wrong'
                : 'normal';
              return (
                <AnswerOption
                  key={optIdx}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  state={state}
                  selected={picked === optIdx}
                  disabled={answeredCorrectly || wrongPicks.includes(optIdx)}
                  onClick={() => choose(optIdx)}
                  label={isRtl ? opt : q.optionsEn[optIdx]}
                />
              );
            })}
          </div>

          {picked !== null && (
            <div
              className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                answeredCorrectly
                  ? 'bg-green-50 border-green-200 text-[#002147]'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              <p className="font-black mb-1">
                {answeredCorrectly
                  ? (isRtl ? 'إجابة صحيحة! 🎉' : 'Correct! 🎉')
                  : (isRtl ? 'ليست هذه، حاول مرة أخرى 💡' : 'Not this one, try again 💡')}
              </p>
              {answeredCorrectly && <p>{isRtl ? q.why : q.whyEn}</p>}
            </div>
          )}

          {answeredCorrectly && (
            <div className="flex justify-end">
              <PrimaryButton onClick={next} className="!px-6 !py-3 !rounded-2xl">
                {index < questions.length - 1
                  ? (isRtl ? 'السؤال التالي ←' : 'Next question →')
                  : (isRtl ? 'إنهاء الأسئلة ✓' : 'Finish ✓')}
              </PrimaryButton>
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 bg-green-50 border border-green-200 rounded-2xl space-y-3 text-[#002147]">
          <p className="font-black text-base">
            {isRtl ? 'أحسنت! أنهيت أسئلة الدرس 🎉' : 'Well done! You finished the lesson questions 🎉'}
          </p>
          <p className="text-sm">
            {isRtl
              ? `أجبت صح من أول محاولة في ${firstTryCorrect} من ${questions.length} أسئلة.`
              : `You got ${firstTryCorrect} of ${questions.length} right on the first try.`}
          </p>
          <p className="text-sm font-bold">
            {wasCompletedRef.current
              ? (isRtl ? 'هذا الدرس مسجّل مكتملاً في تقدمك ✓' : 'This lesson is saved as complete ✓')
              : (isRtl ? 'تم تسجيل الدرس مكتملاً وحصلت على 50 نقطة XP!' : 'Lesson saved as complete. +50 XP!')}
          </p>
          <GhostButton onClick={restart}>{isRtl ? 'أعد الأسئلة' : 'Try again'}</GhostButton>
        </div>
      )}
    </GoldCard>
  );
};

export default AiFoundationLessonCheck;
