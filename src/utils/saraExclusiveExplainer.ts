import { SaraCurriculumLesson } from '../data/saraExclusiveCurriculums';
import { SaraBoardData } from '../types';
import { getLessonPedagogicalBreakdown } from './saraLessonMethodology';
import { buildLessonPageBoard, buildLessonBoardKey } from './saraBoardSpeech';

/**
 * Builds rich, teacher-led pedagogical explanation and whiteboard data for any of Sara's exclusive lessons.
 * Instead of dry text cards, Sara acts as an active, authentic coach who deconstructs the lesson into actionable steps.
 */
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
  const breakdown = getLessonPedagogicalBreakdown(lesson);

  // Map breakdown steps into whiteboard diagram items so the SmartWhiteboard displays them beautifully
  const diagramItems = breakdown.steps.map((st) => ({
    title: isRtl ? st.titleAr : st.titleEn,
    desc: isRtl
      ? `${st.actionAr} 💡 (السر: ${st.whyAr}) 🎯 مثال: "${st.exampleSnippet}"`
      : `${st.actionEn} 💡 (Why: ${st.whyEn}) 🎯 Example: "${st.exampleSnippet}"`,
    icon: st.icon
  }));

  // Build high-impact whiteboard notes that explain HOW to apply the lesson
  const lessonObjectives = (Array.isArray(isRtl ? lesson.objectivesAr : lesson.objectivesEn) ? (isRtl ? lesson.objectivesAr : lesson.objectivesEn)! : []).slice(0, 3);
  const boardNotes: string[] = isRtl
    ? [
        ...lessonObjectives.map(o => `🎯 ${o}`),
        `🏆 القاعدة الذهبية: ${breakdown.goldenRuleAr}`,
        `🎯 الهدف التطبيقي: ${lesson.speakingGoalAr}`,
        ...breakdown.steps.map(s => `${s.icon} ${s.titleAr}: ${s.actionAr}`),
        `⚠️ تجنب الفخ: ${commonMistake ? `بدلاً من "${commonMistake.incorrect}" قل "${commonMistake.correct}"` : 'تجنب الترجمة الحرفية'}`,
        `🎙️ التحدي الصوتي: ${lesson.speakingChallenge.promptAr}`
      ]
    : [
        ...lessonObjectives.map(o => `🎯 ${o}`),
        `🏆 Golden Rule: ${breakdown.goldenRuleEn}`,
        `🎯 Applied Goal: ${lesson.speakingGoalEn}`,
        ...breakdown.steps.map(s => `${s.icon} ${s.titleEn}: ${s.actionEn}`),
        `⚠️ Pitfall: ${commonMistake ? `Avoid "${commonMistake.incorrect}" ➡️ Use "${commonMistake.correct}"` : 'Avoid word-by-word translation'}`,
        `🎙️ Challenge: ${lesson.speakingChallenge.promptEn}`
      ];

  // Map quizzes ensuring answerIndex and correctIndex are both set for SmartWhiteboard evaluation
  // Final exam = masteryCheck.questions (fallback: lesson quiz). Beginners get a gentler 60s timer.
  const examSource = Array.isArray(lesson.masteryCheck?.questions) && lesson.masteryCheck!.questions.length > 0
    ? lesson.masteryCheck!.questions
    : lesson.quiz;
  const examSeconds = lesson.cefr === 'Pre-A1' || lesson.cefr === 'A1' ? 60 : 30;
  const mappedQuizzes = examSource.map((q, idx) => ({
    question: isRtl ? q.questionAr : q.questionEn,
    options: Array.isArray(q.options) ? q.options : [],
    answerIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
    correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
    questionNumber: idx + 1,
    totalQuestions: examSource.length,
    timeLimitSeconds: examSeconds,
    explanation: q.explanationAr
  }));

  // Build grammar breakdown parts from formula tokens
  const formulaTokens = (lesson.keyPattern?.formula || '').split('+').map(t => t.trim()).filter(Boolean);
  const grammarParts = formulaTokens.map((token, idx) => ({
    label: idx === 0 ? (isRtl ? 'البداية' : 'Start') : idx === 1 ? (isRtl ? 'الفعل / الرابط' : 'Core') : (isRtl ? 'المكمل' : 'Rest'),
    text: token,
    color: idx % 3 === 0 ? 'sky' : idx % 3 === 1 ? 'amber' : 'emerald'
  }));

  // Build interactive drill challenge from the lesson's own speaking task + model answer
  // (never from the raw formula string).
  const tiers = lesson.exercises;
  const allExercises = tiers
    ? [...(Array.isArray(tiers.medium) ? tiers.medium : []), ...(Array.isArray(tiers.hard) ? tiers.hard : []), ...(Array.isArray(tiers.easy) ? tiers.easy : [])]
    : [];
  const hardEx = (tiers && Array.isArray(tiers.hard) ? tiers.hard : []).find(e => e.type === 'translate' || e.type === 'order');
  const modelAnswer = lesson.speakingChallenge?.recommendedResponseEn || hardEx?.answer || mainEx?.en || '';
  const starter = modelAnswer.split(/\s+/).slice(0, 3).join(' ');
  const drillChallenge = lesson.speakingChallenge && modelAnswer
    ? {
        type: 'transform' as const,
        instruction: isRtl ? `✍️ ${lesson.speakingChallenge.promptAr}` : `✍️ ${lesson.speakingChallenge.promptEn}`,
        targetText: modelAnswer,
        hint: isRtl ? `ابدأ هكذا: "${starter}…"` : `Start like this: "${starter}…"`
      }
    : hardEx
      ? {
          type: (hardEx.type === 'translate' ? 'translate' : 'transform') as 'translate' | 'transform',
          instruction: isRtl ? hardEx.promptAr : hardEx.promptEn,
          targetText: hardEx.answer,
          hint: hardEx.explanationAr
        }
      : {
          type: 'repeat' as const,
          instruction: isRtl ? `ردّد الجملة النموذجية: "${mainEx?.en || ''}"` : `Repeat the model sentence: "${mainEx?.en || ''}"`,
          targetText: mainEx?.en || '',
          hint: mainEx?.ar
        };

  // Concept check (CCQ) from a real lesson exercise with options, answer and Arabic explanation.
  const ccqSource = allExercises.find(e => Array.isArray(e.options) && e.options.length >= 2 && typeof e.correctIndex === 'number');
  const quizFallback = lesson.quiz[0];
  const ccq = ccqSource
    ? {
        question: isRtl ? ccqSource.promptAr.includes('أكمل') ? `${ccqSource.promptAr} — ${ccqSource.promptEn}` : ccqSource.promptAr : ccqSource.promptEn,
        options: ccqSource.options as string[],
        answerIndex: ccqSource.correctIndex as number,
        explanation: ccqSource.explanationAr
      }
    : {
        question: quizFallback ? (isRtl ? quizFallback.questionAr : quizFallback.questionEn) : (isRtl ? lesson.titleAr : lesson.titleEn),
        options: quizFallback && Array.isArray(quizFallback.options) ? quizFallback.options : [],
        answerIndex: quizFallback && typeof quizFallback.correctIndex === 'number' ? quizFallback.correctIndex : 0,
        explanation: quizFallback?.explanationAr
      };

  // Build vocabulary bank (real lesson vocabulary when available)
  const vocabularyBank = lesson.vocabulary && lesson.vocabulary.length > 0
    ? lesson.vocabulary.map((v) => ({
        word: v.word,
        meaning: v.ar,
        pos: v.note ? `${v.ipa} · ${v.note}` : v.ipa,
        example: v.exampleEn
      }))
    : lesson.practicalExamples.slice(0, 4).map((ex, idx) => {
        const words = ex.en.split(' ').filter(w => w.length > 2);
        return {
          word: words[idx % words.length] || words[0] || 'Pattern',
          meaning: ex.ar,
          pos: 'Key Phrase',
          example: ex.en
        };
      });

  const boardData: SaraBoardData = {
    title: `${lesson.pillarIcon} ${isRtl ? lesson.titleAr : lesson.titleEn}`,
    sentence: mainEx ? mainEx.en : undefined,
    highlight: lesson.keyPattern.formula,
    formula: lesson.keyPattern.formula,
    notes: boardNotes,
    teacherNote: isRtl
      ? `معلمتك سارة: ${breakdown.overviewAr} دعنا نطبق خطوات (${breakdown.breakdownTitleAr}) خطوة بخطوة معاً!`
      : `Teacher Sara: ${breakdown.overviewEn} Let's apply the step-by-step masterclass together!`,
    learningTip: isRtl
      ? `سر الإتقان: ${breakdown.goldenRuleAr}`
      : `Mastery Secret: ${breakdown.goldenRuleEn}`,
    diagram: {
      label: isRtl ? `خطوات التنفيذ العملي خطوة بخطوة 🛠️ (${breakdown.steps.length} خطوات)` : `Step-by-Step Action Plan 🛠️ (${breakdown.steps.length} Steps)`,
      items: diagramItems
    },
    commonPitfall: commonMistake
      ? {
          bad: commonMistake.incorrect,
          good: commonMistake.correct,
          explanation: `${commonMistake.whyAr} — ${isRtl ? 'طبق الخطوة الصحيحة مباشرة كما في السبورة' : 'Apply the direct fix immediately'}`,
          incorrect: commonMistake.incorrect,
          correct: commonMistake.correct,
          whyAr: commonMistake.whyAr
        } as any
      : undefined,
    grammarBreakdown: grammarParts.length > 0 ? {
      label: isRtl ? 'تفكيك الصيغة التركيبية' : 'Syntax Dissection',
      parts: grammarParts
    } : undefined,
    drillChallenge,
    ccq,
    vocabularyBank,
    speakingPrompt: {
      instruction: isRtl ? lesson.speakingChallenge.promptAr : lesson.speakingChallenge.promptEn,
      sampleAnswer: lesson.speakingChallenge.recommendedResponseEn
    },
    quiz: mappedQuizzes[0],
    quizzes: mappedQuizzes,
    lessonKey: buildLessonBoardKey(lesson, lang),
    masteryPassScore: lesson.masteryCheck?.passScore,
    lessonExercises: lesson.exercises,
    reviewQuestions: Array.isArray(lesson.reviewOfPrevious) && lesson.reviewOfPrevious.length > 0 ? lesson.reviewOfPrevious : undefined,
    listeningTask: lesson.listeningTask && Array.isArray(lesson.listeningTask.questions) ? lesson.listeningTask : undefined,
    pronunciationFocus: lesson.pronunciationFocus && Array.isArray(lesson.pronunciationFocus.items) ? lesson.pronunciationFocus : undefined,
    pageBoard: buildLessonPageBoard(lesson, lang)
  };

  // Build authentic, warm, energetic spoken teacher explanation from Sara
  // Rather than just reading text, Sara explains WHY, HOW, and WALKS THROUGH THE STEPS!
  const stepsVoiceScriptAr = breakdown.steps
    .map(s => `${s.titleAr}. ${s.actionAr}. ${s.whyAr}`)
    .join('. وثانياً: ');

  const spokenIntro = isRtl
    ? `يا أهلاً وسهلاً بك في حصتنا التدريبية اليوم مع سارة! درسنا هو: "${lesson.titleAr}". ${breakdown.overviewAr}. لن نقرأ كلاماً نظرياً، بل سأعلمك الآن كيف تطبق هذا العنوان عملياً خطوة بخطوة. انظر معي إلى السبورة الذكية: ${stepsVoiceScriptAr}. القاعدة الذهبية التي أريدك أن تحفظها هي: ${breakdown.goldenRuleAr}. الآن، استمع للنموذج الحي وتدرب على تطبيقه معي بصوتك!`
    : `Welcome to today's interactive masterclass with Teacher Sara! Our topic is "${lesson.titleEn}". ${breakdown.overviewEn}. We are not just reciting rules—I will teach you how to execute this step-by-step in real life! Look at your smart board: ${breakdown.steps.map(s => `${s.titleEn}: ${s.actionEn}`).join('. Then: ')}. Remember the golden rule: ${breakdown.goldenRuleEn}. Now listen to the live model and practice speaking it aloud with me!`;

  // Build structured chat message explaining the How-To breakdown clearly
  const chatMessage = isRtl
    ? `🌸 **أهلاً بك في حصة التدريب العملي مع معلمتك سارة!**\n\n` +
      `📌 **عنوان الدرس:** ${lesson.titleAr}\n` +
      `🏷️ **المسار التعليمي:** ${lesson.pillarNameAr} (${lesson.level})\n` +
      `🎯 **الهدف العملي:** ${lesson.speakingGoalAr}\n\n` +
      `💡 **السر والمفهوم العملي للدرس:**\n${breakdown.overviewAr}\n\n` +
      `🛠️ **دليل الخطوات العملية خطوة بخطوة (How-To Blueprint):**\n` +
      breakdown.steps.map(s => `**${s.icon} ${s.titleAr}**\n• **ماذا تفعل:** ${s.actionAr}\n• **السر والسبب:** ${s.whyAr}\n• **صيغة تطبيقية:** \`${s.exampleSnippet}\``).join('\n\n') +
      `\n\n🧩 **القالب التحدثي الرئيسي:**\n\`${lesson.keyPattern.formula}\`\n\n` +
      `📝 **نموذج تطبيقي عملي متكامل:**\n` +
      `> ${breakdown.liveModel.annotatedModel.replace(/\n/g, '\n> ')}\n` +
      `*(💡 ${breakdown.liveModel.modelExplanationAr})*\n\n` +
      `⚠️ **فخ لغوي شائع وتصحيحه:**\n` +
      (commonMistake ? `❌ خطأ شائع: *${commonMistake.incorrect}*\n✅ الصواب: **${commonMistake.correct}**\n🔍 السبب: ${commonMistake.whyAr}\n\n` : '') +
      `🎙️ **تحدي سارة المباشر لك الآن:**\n"${lesson.speakingChallenge.saraQuestionAr}"\n\n` +
      `رد عليّ الآن بالصوت 🎙️ أو بالكتابة، والسبورة التفاعلية مفتوحة أمامك بالخطوات والأمثلة لنتدرب معاً!`
    : `🌸 **Welcome to Teacher Sara's Practical Coaching Session!**\n\n` +
      `📌 **Lesson Topic:** ${lesson.titleEn}\n` +
      `🏷️ **Track:** ${lesson.pillarNameEn} (${lesson.level})\n` +
      `🎯 **Practical Objective:** ${lesson.speakingGoalEn}\n\n` +
      `💡 **Core Concept & Mastery Secret:**\n${breakdown.overviewEn}\n\n` +
      `🛠️ **Step-by-Step Execution Blueprint:**\n` +
      breakdown.steps.map(s => `**${s.icon} ${s.titleEn}**\n• **Action:** ${s.actionEn}\n• **Why it matters:** ${s.whyEn}\n• **Snippet:** \`${s.exampleSnippet}\``).join('\n\n') +
      `\n\n🧩 **Core Speech Formula:**\n\`${lesson.keyPattern.formula}\`\n\n` +
      `📝 **Full Practical Live Model:**\n` +
      `> ${breakdown.liveModel.annotatedModel.replace(/\n/g, '\n> ')}\n\n` +
      (commonMistake ? `⚠️ **Common Pitfall to Avoid:**\n❌ Avoid: *${commonMistake.incorrect}*\n✅ Use: **${commonMistake.correct}**\n\n` : '') +
      `🎙️ **Sara's Live Challenge for You:**\n"${lesson.speakingChallenge.saraQuestionEn}"\n\n` +
      `Speak back to me via microphone 🎙️ or chat, and follow the interactive smart whiteboard!`;

  const curriculumExtras = buildCurriculumExtras(lesson, isRtl);

  return {
    boardData,
    spokenIntro,
    chatMessage: curriculumExtras ? `${chatMessage}\n\n${curriculumExtras}` : chatMessage
  };
}

function buildCurriculumExtras(lesson: SaraCurriculumLesson, isRtl: boolean): string {
  const parts: string[] = [];
  if (lesson.cefr || lesson.unit) {
    parts.push(isRtl
      ? `📶 **المستوى:** ${lesson.cefr || lesson.levelCode}${lesson.unit ? ` • الوحدة ${lesson.unit}` : ''}`
      : `📶 **Level:** ${lesson.cefr || lesson.levelCode}${lesson.unit ? ` • Unit ${lesson.unit}` : ''}`);
  }
  if (lesson.objectivesAr?.length) {
    const objs = isRtl ? lesson.objectivesAr : (lesson.objectivesEn || lesson.objectivesAr);
    parts.push((isRtl ? '✅ **أهداف الدرس:**\n' : '✅ **Objectives:**\n') + objs.map(o => `• ${o}`).join('\n'));
  }
  if (lesson.vocabulary?.length) {
    parts.push((isRtl ? '📚 **كلمات الدرس:**\n' : '📚 **Lesson vocabulary:**\n') +
      lesson.vocabulary.map(v => `• **${v.word}** ${v.ipa} — ${v.ar}`).join('\n'));
  }
  if (lesson.modelDialogue?.length) {
    parts.push((isRtl ? '🗣️ **الحوار النموذجي:**\n' : '🗣️ **Model dialogue:**\n') +
      lesson.modelDialogue.map(l => `**${l.speaker}:** ${l.en}${isRtl ? `\n   _${l.ar}_` : ''}`).join('\n'));
  }
  if (lesson.pronunciationFocus) {
    parts.push((isRtl ? '🔊 **تركيز النطق:** ' : '🔊 **Pronunciation focus:** ') +
      `${lesson.pronunciationFocus.focus}\n${lesson.pronunciationFocus.items.map(i => `• ${i}`).join('\n')}\n💡 ${lesson.pronunciationFocus.tipAr}`);
  }
  if (lesson.arabicLearnerPitfalls?.length) {
    parts.push((isRtl ? '🚩 **أخطاء يقع فيها المتعلم العربي:**\n' : '🚩 **Arabic-speaker pitfalls:**\n') +
      lesson.arabicLearnerPitfalls.map(p => `❌ ${p.incorrect} ➜ ✅ ${p.correct} (${p.whyAr})`).join('\n'));
  }
  return parts.join('\n\n');
}
