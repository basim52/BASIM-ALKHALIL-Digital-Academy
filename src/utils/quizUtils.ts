import { SaraBoardQuiz } from '../types';

/**
 * Shuffles quiz options so the correct answer is uniformly distributed
 * across all positions and NEVER perpetually stuck at option 0.
 */
export function shuffleQuiz<T extends { options: string[]; answerIndex?: number; correctIndex?: number }>(
  quiz: T,
  forceNonZeroIfPossible: boolean = true
): T {
  if (!quiz || !Array.isArray(quiz.options) || quiz.options.length <= 1) {
    return quiz;
  }

  const rawCorrectIndex = quiz.answerIndex ?? quiz.correctIndex ?? 0;
  const safeCorrectIndex = (rawCorrectIndex >= 0 && rawCorrectIndex < quiz.options.length)
    ? rawCorrectIndex
    : 0;

  const correctText = quiz.options[safeCorrectIndex];

  // Create indexed list
  const indexed = quiz.options.map((opt, idx) => ({
    opt,
    isCorrect: idx === safeCorrectIndex
  }));

  // Perform Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indexed[i];
    indexed[i] = indexed[j];
    indexed[j] = temp;
  }

  let newCorrectIndex = indexed.findIndex(item => item.isCorrect);

  // If forceNonZeroIfPossible is true and it landed on 0, swap with index 1 or 2
  if (forceNonZeroIfPossible && newCorrectIndex === 0 && indexed.length > 1) {
    const swapTarget = 1 + Math.floor(Math.random() * (indexed.length - 1));
    const temp = indexed[0];
    indexed[0] = indexed[swapTarget];
    indexed[swapTarget] = temp;
    newCorrectIndex = swapTarget;
  }

  const newOptions = indexed.map(item => item.opt);

  return {
    ...quiz,
    options: newOptions,
    ...(quiz.answerIndex !== undefined ? { answerIndex: newCorrectIndex } : {}),
    ...(quiz.correctIndex !== undefined ? { correctIndex: newCorrectIndex } : {})
  };
}

/**
 * Builds a limited 5-question lesson quiz set for any lesson or topic.
 */
export function buildLimitedLessonQuizSet(
  topicTitle: string,
  targetSentence?: string,
  ruleFormula?: string,
  existingQuiz?: SaraBoardQuiz,
  isRtl: boolean = true
): SaraBoardQuiz[] {
  const quizzes: SaraBoardQuiz[] = [];

  // Question 1: From existing quiz or primary sentence
  if (existingQuiz) {
    quizzes.push(shuffleQuiz({
      ...existingQuiz,
      questionNumber: 1,
      totalQuestions: 5,
      timeLimitSeconds: 30
    }));
  } else if (targetSentence) {
    const words = targetSentence.split(' ');
    const targetWord = words.length > 2 ? words[1] : words[0];
    quizzes.push(shuffleQuiz({
      question: isRtl 
        ? `ما الكلمة أو الصيغة الصحيحة التي تكمل الجملة: "${targetSentence.replace(targetWord, '____')}"؟` 
        : `Which word correctly completes: "${targetSentence.replace(targetWord, '____')}"?`,
      options: [targetWord, 'wrong', 'unrelated', 'incorrect'],
      answerIndex: 0,
      questionNumber: 1,
      totalQuestions: 5,
      timeLimitSeconds: 30,
      explanation: isRtl ? `الخيار الصحيح يطابق سياق الجملة: "${targetSentence}"` : `Matches: "${targetSentence}"`
    }));
  }

  // Question 2: Grammatical usage / Context
  quizzes.push(shuffleQuiz({
    question: isRtl
      ? `في درس "${topicTitle}"، ما الاستخدام الأصح لهذه القاعدة في المحادثة؟`
      : `In "${topicTitle}", what is the most natural conversational usage?`,
    options: [
      isRtl ? 'التعبير بثقة وبناء جملة واضحة ومباشرة' : 'Expressing clearly with proper sentence structure',
      isRtl ? 'ترجمة الكلمات حرفياً دون مراعاة القواعد' : 'Literal translation ignoring grammar',
      isRtl ? 'تجنب استخدام الأفعال المساعدة تماماً' : 'Omitting helper verbs completely',
      isRtl ? 'استخدام الماضي مع إشارات المستقبل' : 'Mixing past markers with future indicators'
    ],
    answerIndex: 0,
    questionNumber: 2,
    totalQuestions: 5,
    timeLimitSeconds: 30,
    explanation: isRtl ? 'الهدف الأساسي هو بناء تراكيب صحيحة وسلسة في المحادثة.' : 'Core goal is natural conversational fluency.'
  }));

  // Question 3: Spot the error or pick best formulation
  quizzes.push(shuffleQuiz({
    question: isRtl
      ? `أي من الجمل التالية مصاغة بشكل سليم تماماً بدون أخطاء؟`
      : `Which of the following sentences is grammatically sound?`,
    options: [
      targetSentence || 'She always prepares her lessons with care.',
      'She always prepare her lessons with care.',
      'She is prepare her lessons yesterday.',
      'She preparing always her lessons.'
    ],
    answerIndex: 0,
    questionNumber: 3,
    totalQuestions: 5,
    timeLimitSeconds: 30,
    explanation: isRtl ? 'توافق الفاعل مع الفعل والزمن ضروري لسلامة المعنى.' : 'Subject-verb agreement is essential.'
  }));

  // Question 4: Vocabulary / Meaning in context
  quizzes.push(shuffleQuiz({
    question: isRtl
      ? `ما الدلالة التعليمية المستفادة من تطبيق موضوع: "${topicTitle}"؟`
      : `What key takeaway should you apply when practicing "${topicTitle}"?`,
    options: [
      isRtl ? 'تكرار النمط اللغوي حتى يصبح عادة كلامية تلقائية' : 'Drilling the pattern until it becomes second nature',
      isRtl ? 'الحفظ البصري دون النطق بصوت مسموع' : 'Memorizing silently without speaking aloud',
      isRtl ? 'الاكتفاء بالقراءة لمرة واحدة فقط' : 'Reading once without practice',
      isRtl ? 'تجاهل الأخطاء المتكررة وعدم تدوينها' : 'Ignoring repeated mistakes'
    ],
    answerIndex: 0,
    questionNumber: 4,
    totalQuestions: 5,
    timeLimitSeconds: 30,
    explanation: isRtl ? 'التكرار والممارسة الصوتية هما سر ثبات اللغة في العقل.' : 'Active vocal repetition locks language patterns.'
  }));

  // Question 5: Final Mastery Challenge
  quizzes.push(shuffleQuiz({
    question: isRtl
      ? `تحدي الإتقان النهائي 🌟: كيف تثبت فهمك الكامل لدرس "${topicTitle}"؟`
      : `Mastery Challenge 🌟: How do you demonstrate mastery of "${topicTitle}"?`,
    options: [
      isRtl ? 'تكوين جملة جديدة من إنشائك واستخدامها مع المعلمة سارة' : 'Formulating your own original sentence and speaking with Sara',
      isRtl ? 'إغلاق الدرس فوراً دون التحدث بالصوت' : 'Closing the lesson without vocal practice',
      isRtl ? 'البحث عن إجابات جاهزة دون فهم' : 'Copying answers without comprehension',
      isRtl ? 'تأجيل التطبيق إلى إشعار آخر' : 'Postponing practice indefinitely'
    ],
    answerIndex: 0,
    questionNumber: 5,
    totalQuestions: 5,
    timeLimitSeconds: 30,
    explanation: isRtl ? 'الإنتاج اللغوي الذاتي والتحدث بالمايك هو المعيار الحقيقي للإتقان!' : 'Speaking your own examples is true mastery!'
  }));

  return quizzes.slice(0, 5);
}
