import React, { useMemo, useState } from 'react';
import { GoldCard, PrimaryButton, GhostButton, AnswerOption } from './ui/academy';
import { FOUNDATION_LESSON_CHECKS, FoundationCheckQuestion } from './AiFoundationChecks';

interface Props {
  isRtl: boolean;
  /** Called when the student scores at least PASS_MARK of the questions. */
  onPass: (score: number, total: number) => void;
}

export const CERT_TEST_TOTAL = 10;
export const CERT_TEST_PASS_MARK = 0.8;

/** Pick one question from each of 10 lessons; a new attempt picks different questions. */
function pickQuestions(attempt: number): FoundationCheckQuestion[] {
  const lessons = Object.keys(FOUNDATION_LESSON_CHECKS).map(Number).sort((a, b) => a - b);
  const start = (attempt * 3) % lessons.length;
  const chosen: FoundationCheckQuestion[] = [];
  for (let i = 0; i < lessons.length && chosen.length < CERT_TEST_TOTAL; i++) {
    const qs = FOUNDATION_LESSON_CHECKS[lessons[(start + i) % lessons.length]];
    if (qs && qs.length) chosen.push(qs[(attempt + i) % qs.length]);
  }
  return chosen;
}

/**
 * Graded certificate test for the AI curriculum: 10 multiple-choice questions
 * drawn from the foundational lessons, pass mark 80%. Answers are only marked
 * after the student submits, then wrong ones show the right answer and why.
 */
export const AiCertificateTest: React.FC<Props> = ({ isRtl, onPass }) => {
  const [attempt, setAttempt] = useState(0);
  const questions = useMemo(() => pickQuestions(attempt), [attempt]);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(CERT_TEST_TOTAL).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
  const needed = Math.ceil(total * CERT_TEST_PASS_MARK);
  const passed = submitted && score >= needed;
  const allAnswered = answers.slice(0, total).every(a => a !== null);

  const submit = () => {
    if (!allAnswered || submitted) return;
    setSubmitted(true);
    if (score >= needed) onPass(score, total);
  };

  const retry = () => {
    setAttempt(a => a + 1);
    setAnswers(Array(CERT_TEST_TOTAL).fill(null));
    setSubmitted(false);
  };

  return (
    <GoldCard className="p-6 md:p-8 space-y-5 bg-white border-[#C49E3A]/40" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#C49E3A] block">
          {isRtl ? 'اختبار الشهادة' : 'Certificate test'}
        </span>
        <h5 className="text-lg md:text-xl font-black text-[#002147]">
          {isRtl ? `${total} أسئلة من دروس المنهج — النجاح من ${needed} إجابات صحيحة` : `${total} questions from the lessons — pass with ${needed} correct`}
        </h5>
      </div>

      {questions.map((q, qi) => (
        <div key={`${attempt}-${qi}`} className="p-5 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/30 space-y-3">
          <p className="text-base font-black text-[#002147] leading-relaxed">
            {qi + 1}. {isRtl ? q.q : q.qEn}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt, oi) => {
              const state = submitted
                ? (oi === q.correct ? 'correct' : answers[qi] === oi ? 'wrong' : 'normal')
                : 'normal';
              return (
                <AnswerOption
                  key={oi}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  state={state}
                  selected={answers[qi] === oi}
                  disabled={submitted}
                  onClick={() => setAnswers(prev => prev.map((a, i) => (i === qi ? oi : a)))}
                  label={isRtl ? opt : q.optionsEn[oi]}
                />
              );
            })}
          </div>
          {submitted && answers[qi] !== q.correct && (
            <p className="text-sm text-[#002147] bg-amber-50 border border-amber-200 rounded-xl p-3">
              💡 {isRtl ? q.why : q.whyEn}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <div className="flex justify-end">
          <PrimaryButton onClick={submit} disabled={!allAnswered} className="!px-6 !py-3 !rounded-2xl disabled:opacity-50">
            {allAnswered
              ? (isRtl ? 'تسليم الإجابات ✓' : 'Submit answers ✓')
              : (isRtl ? 'أجب عن كل الأسئلة أولاً' : 'Answer every question first')}
          </PrimaryButton>
        </div>
      ) : (
        <div role="status" className={`p-5 rounded-2xl border space-y-3 ${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} text-[#002147]`}>
          <p className="font-black text-base">
            {isRtl ? `نتيجتك: ${score} من ${total}` : `Your score: ${score} / ${total}`}
          </p>
          <p className="text-sm">
            {passed
              ? (isRtl ? 'نجحت في اختبار الشهادة! 🎉 أكمل الخطوة التالية.' : 'You passed the certificate test! 🎉 Continue to the next step.')
              : (isRtl ? `تحتاج ${needed} إجابات صحيحة على الأقل. راجع الشرح أعلاه وحاول بأسئلة جديدة.` : `You need at least ${needed} correct. Review the notes above and try again with new questions.`)}
          </p>
          {!passed && <GhostButton onClick={retry}>{isRtl ? 'حاول مرة أخرى' : 'Try again'}</GhostButton>}
        </div>
      )}
    </GoldCard>
  );
};

export default AiCertificateTest;
