import { SaraCurriculumLesson } from '../data/saraExclusiveCurriculums';
import { SaraBoardData } from '../types';

export function buildSaraExclusiveLessonExplanation(
  lesson: SaraCurriculumLesson,
  lang: 'ar' | 'en' = 'ar'
): {
  boardData: SaraBoardData;
  spokenIntro: string;
  chatMessage: string;
} {
  const isRtl = lang === 'ar';
  const mainEx = lesson.practicalExamples[0];
  const commonMistake = lesson.commonMistakes[0];

  const boardData: SaraBoardData = {
    title: `${lesson.pillarIcon} ${isRtl ? lesson.titleAr : lesson.titleEn}`,
    sentence: mainEx ? mainEx.en : undefined,
    highlight: lesson.keyPattern.formula,
    formula: lesson.keyPattern.formula,
    notes: isRtl
      ? [
          ...lesson.whiteboardNotes.pointsAr,
          `💡 نصيحة سارة: ${lesson.speakingGoalAr}`,
          `🎙️ تحدي اليوم: ${lesson.speakingChallenge.promptAr}`
        ]
      : [
          ...lesson.whiteboardNotes.pointsEn,
          `💡 Sara's Tip: ${lesson.speakingGoalEn}`,
          `🎙️ Speaking Challenge: ${lesson.speakingChallenge.promptEn}`
        ],
    teacherNote: isRtl
      ? `معلمتك سارة: ${lesson.descAr} ركّز على نطق الجملة بصوت عالٍ دون تردد!`
      : `Teacher Sara: ${lesson.descEn} Voice this sentence aloud with confidence!`,
    learningTip: isRtl
      ? `هدف الحصة: ${lesson.speakingGoalAr}`
      : `Lesson Goal: ${lesson.speakingGoalEn}`,
    diagram: {
      label: isRtl ? 'أمثلة عملية للحديث الفوري 🎙️' : 'Practical Spoken Examples 🎙️',
      items: lesson.practicalExamples.map((ex, idx) => ({
        title: ex.en,
        desc: isRtl ? ex.ar : (ex.spokenNoteEn || ex.ar),
        icon: idx === 0 ? '🌟' : idx === 1 ? '🎯' : '✨'
      }))
    },
    commonPitfall: commonMistake
      ? {
          incorrect: commonMistake.incorrect,
          correct: commonMistake.correct,
          whyAr: commonMistake.whyAr,
          whyEn: `Avoid: ${commonMistake.incorrect} ➡️ Use: ${commonMistake.correct}`
        }
      : undefined,
    speakingPrompt: {
      instruction: isRtl ? lesson.speakingChallenge.promptAr : lesson.speakingChallenge.promptEn,
      sampleAnswer: lesson.speakingChallenge.recommendedResponseEn
    },
    quizzes: lesson.quiz.map((q) => ({
      question: isRtl ? q.questionAr : q.questionEn,
      options: q.options,
      correctAnswer: q.options[q.correctIndex] || q.options[0],
      explanation: q.explanationAr
    }))
  };

  const spokenIntro = isRtl
    ? `يا أهلاً وسهلاً بك في منهج سارة التخصصي! درسنا اليوم بعنوان: "${lesson.titleAr}". ${lesson.descAr}. فتحت لك السبورة الذكية لترى القالب العملي والأمثلة. استمع لي جيداً وتدرب على النطق بصوتك معي!`
    : `Welcome to your exclusive session with Sara! Today's lesson is "${lesson.titleEn}". ${lesson.descEn}. Look at the smart board for the practical pattern and speak aloud with me!`;

  const chatMessage = isRtl
    ? `🌸 **مرحباً بك في منهج سارة التخصصي المستقل للطلاقة!**\n\n` +
      `📌 **الدرس الحالي:** ${lesson.titleAr}\n` +
      `🏷️ **المسار:** ${lesson.pillarNameAr} (${lesson.level})\n` +
      `🎯 **هدف الطلاقة اليوم:** ${lesson.speakingGoalAr}\n\n` +
      `🧩 **القالب التحدثي:**\n\`${lesson.keyPattern.formula}\`\n\n` +
      `🎙️ **أمثلة حية:**\n` +
      lesson.practicalExamples.map(e => `• **${e.en}**\n  *(${e.ar})*`).join('\n') +
      `\n\n💬 **تحدي سارة المباشر لك:**\n"${lesson.speakingChallenge.saraQuestionAr}"\n\n` +
      `جرب أن ترد عليّ الآن بالمايك 🎙️ أو بالكتابة، والسبورة مفتوحة أمامك بالشرح والتمارين!`
    : `🌸 **Welcome to Teacher Sara's Dedicated Fluency Curriculum!**\n\n` +
      `📌 **Lesson:** ${lesson.titleEn}\n` +
      `🏷️ **Track:** ${lesson.pillarNameEn} (${lesson.level})\n` +
      `🎯 **Speaking Goal:** ${lesson.speakingGoalEn}\n\n` +
      `🧩 **Key Pattern:**\n\`${lesson.keyPattern.formula}\`\n\n` +
      `🎙️ **Live Examples:**\n` +
      lesson.practicalExamples.map(e => `• **${e.en}**\n  *(${e.ar})*`).join('\n') +
      `\n\n💬 **Sara's Challenge:**\n"${lesson.speakingChallenge.saraQuestionEn}"\n\n` +
      `Reply to me using voice 🎙️ or chat, and practice on the smart whiteboard!`;

  return {
    boardData,
    spokenIntro,
    chatMessage
  };
}
