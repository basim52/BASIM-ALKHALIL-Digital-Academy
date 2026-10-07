import { CurriculumLesson } from './academicCurriculumCatalogue';
import { SaraBoardData } from '../types';
import { ALL_GRAMMAR_UNITS } from '../components/GrammarCurriculumCompanion';
import { ALL_READING_UNITS } from '../components/ReadingCurriculumCompanion';
import { ALL_CONVERSATION_UNITS } from '../components/ConversationCurriculumCompanion';
import { ALL_WRITING_UNITS } from '../components/WritingCurriculumCompanion';
import { ALL_EXPRESSION_UNITS } from '../components/ExpressionCurriculumCompanion';
import { OXFORD_LESSONS } from '../data/oxfordLessonsData';
import { ADULTS_DAILY_DOSES } from '../data/adultsDailyDose';
import { PRONUNCIATION_LAB_DATA, ENGLISH_WITH_SONGS_DATA, ESCAPE_ROOM_PUZZLES_DATA, ROLE_PLAY_CHALLENGES_DATA, VISUAL_DICTIONARY_DATA, FAMILY_GAMES_DATA, COOKING_CHALLENGES_DATA } from '../data/interactiveCurriculum';
import { COURSES } from '../data/courses';
import { PRODUCED_VIDEO_LESSONS } from '../data/producedVideoLessons';
import { STORIES } from '../components/StoryLibrary';
import { KIDS_STORIES } from '../data/kidsStories';
import { LANGUAGE_LAB_DATA } from '../data/languageLabData';
import { shuffleQuiz, buildLimitedLessonQuizSet } from './quizUtils';

/**
 * Builds rich, pedagogical Sara Whiteboard data and spoken audio script for any Academy Curriculum Lesson.
 */
function buildSaraCurriculumExplanationInternal(
  lesson: CurriculumLesson,
  lang: 'ar' | 'en' = 'ar'
): {
  boardData: SaraBoardData;
  spokenIntro: string;
  chatMessage: string;
} {
  const isRtl = lang === 'ar';
  const level = lesson.level || 'A1';

  // 1. GRAMMAR CURRICULUM
  if (lesson.pillarId === 'grammar') {
    const units = (ALL_GRAMMAR_UNITS as any)[level] || [];
    const unit = units.find((u: any) => String(u.id) === String(lesson.id)) || units[0];

    const isPastSimple = String(lesson.id) === 'g_a2_1' || 
      lesson.titleAr?.includes('الماضي البسيط') || 
      lesson.titleEn?.includes('Past Simple');

    const title = isRtl
      ? `منهج القواعد (${level}): ${lesson.titleAr}`
      : `Grammar Academy (${level}): ${lesson.titleEn}`;

    const mainExample = unit?.examples?.[0];
    const sentence = isPastSimple 
      ? 'I visited London last year.' 
      : (mainExample ? mainExample.en : 'She studies English diligently every day.');

    const formula = isPastSimple
      ? (isRtl 
          ? 'الإثبات: Subject + Verb(V2/-ed/شاذ) + Time | النفي: Subject + didn\'t + Verb(Base) | السؤال: Did + Subject + Verb(Base)?'
          : 'Affirmative: Subject + Verb(V2) + Time | Negative: Subject + didn\'t + Verb(Base) | Question: Did + Subject + Verb(Base)?')
      : (unit?.rules?.[0]
          ? `${unit.rules[0].titleEn}: ${unit.rules[0].contentEn}`
          : 'Subject + Auxiliary / Modal + Verb + Complement');

    const grammarBreakdownParts = (() => {
      if (isPastSimple) {
        return [
          { label: 'Subject (الفاعل)', text: 'I', color: 'blue' },
          { label: 'Past Verb V2 (فعل ماضٍ)', text: 'visited', color: 'amber' },
          { label: 'Object & Time (المفعول والظرف)', text: 'London last year', color: 'emerald' }
        ];
      }
      const words = sentence.replace(/[.,!?]/g, '').split(' ');
      if (words.length >= 3) {
        return [
          { label: 'Subject', text: words[0], color: 'blue' },
          { label: 'Verb / Action', text: words[1], color: 'amber' },
          { label: 'Object / Rest', text: words.slice(2).join(' '), color: 'emerald' }
        ];
      }
      return undefined;
    })();

    const commonPitfall = isPastSimple
      ? {
          bad: 'I didn\'t went to school yesterday',
          good: 'I didn\'t go to school yesterday',
          explanation: isRtl 
            ? 'فخ شائع جداً للناطقين بالعربية: بعد didn\'t أو Did نعيد الفعل فوراً لمصدره الأصلي المجرد (go وليس went).' 
            : 'Crucial Arab learner trap: after "didn\'t" or "Did", always revert the main verb to its base form (go, not went).'
        }
      : {
          bad: isRtl ? `تجاهل صياغة ${lesson.titleAr} باللغة الإنجليزية` : `Misusing grammar tense in ${lesson.titleEn}`,
          good: sentence,
          explanation: isRtl 
            ? `تذكر دائماً الصيغة الصحيحة: ${formula}. عند النفي أو السؤال، انتبه لتصريف الفعل وإعادته لأصله المجرد.` 
            : `Make sure to align subject and verb correctly using: ${formula}. In negation or questions, always revert the main verb to its base form.`
        };

    const mnemonic = isPastSimple
      ? (isRtl
          ? '✨ مفتاح الإتقان الذهبي: تذكر أن did تأخذ الماضي لنفسها، فيبقى الفعل بعدها حراً ومجرداً!'
          : '✨ Golden Rule: "Did" carries the past marker, so the main verb stays free in its bare base form!')
      : (isRtl
          ? `✨ مفتاح الإتقان السريع: احفظ هذا النموذج وطبقه في حديثك: "${sentence}"`
          : `✨ Quick Mastery Key: Anchor your memory to model: "${sentence}"`);

    const drillChallenge = isPastSimple
      ? {
          type: 'transform' as const,
          instruction: isRtl 
            ? 'حول الجملة: "She bought a new phone" إلى صيغة النفي باستخدام didn\'t' 
            : 'Transform "She bought a new phone" into negative with didn\'t',
          targetText: 'She didn\'t buy a new phone',
          hint: 'didn\'t + buy'
        }
      : {
          type: 'repeat' as const,
          instruction: isRtl 
            ? `ردد الجملة النموذجية بصوتك مع سارة لتثبيت القاعدة: "${sentence}"` 
            : `Repeat the model sentence aloud with Sara: "${sentence}"`,
          targetText: sentence,
          hint: formula
        };

    const vocabularyBank = isPastSimple
      ? [
          { word: 'visited', meaning: isRtl ? 'زار (فعل منتظم - V2)' : 'visited (regular past)', pos: 'Verb', example: 'I visited London last year.' },
          { word: 'went', meaning: isRtl ? 'ذهب (فعل شاذ - V2 من go)' : 'went (irregular past of go)', pos: 'Verb', example: 'They went to the museum yesterday.' },
          { word: 'didn\'t', meaning: isRtl ? 'أداة نفي الماضي البسيط' : 'did not (past auxiliary)', pos: 'Auxiliary', example: 'She didn\'t watch the movie.' },
          { word: 'yesterday', meaning: isRtl ? 'أمس (ظرف زمان دال)' : 'the day before today', pos: 'Adverb', example: 'We arrived yesterday.' }
        ]
      : undefined;

    const speakingPrompt = isPastSimple
      ? {
          instruction: isRtl 
            ? 'تحدث بالمايك مع سارة: اذكر 3 أنشطة قمت بها أمس مستخدماً صيغة الماضي البسيط.' 
            : 'Speak into your mic: Tell Sara 3 things you did yesterday using the Past Simple.',
          sampleAnswer: 'Yesterday, I visited my friends, played football, and studied English.'
        }
      : {
          instruction: isRtl 
            ? `تحدث بالمايك: كوّن جملة جديدة من إنشائك تطبق فيها درس: ${lesson.titleAr}` 
            : `Speak now: Create your own original sentence applying: ${lesson.titleEn}`,
          sampleAnswer: sentence
        };

    // Construct progressive multi-question quizzes for real deep testing
    const quizList = (() => {
      const list: any[] = [];
      if (unit?.examples && unit.examples.length > 0) {
        unit.examples.forEach((ex: any, idx: number) => {
          const words = ex.en.split(' ');
          const verbWord = words.find((w: string) => w.length > 3) || words[1] || 'learned';
          list.push({
            question: isRtl
              ? `السؤال ${idx + 1}: اختر الجملة الصحيحة لـ: "${ex.ar}"`
              : `Question ${idx + 1}: Choose the correct sentence for: "${ex.ar || ex.en}"`,
            options: [
              ex.en,
              ex.en.replace(verbWord, verbWord.toLowerCase().replace(/ed$|s$/, '')),
              `He ${verbWord} yesterday wrongly`
            ],
            answerIndex: 0
          });
        });
      }
      if (list.length === 0) {
        list.push({
          question: isRtl ? `اختر الصيغة الصحيحة لقاعدة: ${lesson.titleAr}` : `Choose the correct form for: ${lesson.titleEn}`,
          options: [sentence, 'He study English yesterday', 'They was studying now'],
          answerIndex: 0
        });
      }
      return list;
    })();

    const quiz = quizList[0];

    const examplesAudioText = unit?.examples && unit.examples.length > 0
      ? unit.examples.map((ex: any, idx: number) => isRtl ? `المثال ${idx + 1}: "${ex.en}" ومعناه: "${ex.ar}"` : `Example ${idx + 1}: "${ex.en}"`).join('، ومثال آخر: ')
      : `المثال النموذجي: "${sentence}"`;

    const rulesAudioText = unit?.rules && unit.rules.length > 0
      ? unit.rules.map((r: any) => isRtl ? `${r.titleAr}: ${r.contentAr}` : `${r.titleEn}: ${r.contentEn}`).join(' • ')
      : formula;

    const prepQuestionAudio = isRtl
      ? (unit?.prepQuestionAr ? `ولنبدأ بسؤال تفكيري: ${unit.prepQuestionAr}` : 'في هذه الحصة سنبني فهمك النحوي خطوة بخطوة.')
      : (unit?.prepQuestionEn ? `Let us start with: ${unit.prepQuestionEn}` : 'We will build your structural mastery step-by-step.');

    // Comprehensive, thorough voice explanation that teaches the whole lesson
    const voiceExplanation = isPastSimple
      ? (isRtl
          ? `أهلاً بك يا بطل في حصتنا الشاملة لدرس: ${lesson.titleAr}! 🌸
دعنا نفهم أولاً جوهر الماضي البسيط: نستخدمه للتحدث عن أحداث بدأت واكتملت تماماً في الماضي في وقت محدد.
القاعدة الذهبية لصياغة الجملة الإيجابية هي: الفاعل يليه التصريف الثاني للفعل، مثل: I visited London last year أو They went to the museum.
ولاحظ أن الأفعال تنقسم إلى قسمين:
أولاً، الأفعال المنتظمة التي نضيف لها ed، مثل: played و visited.
وثانياً، الأفعال غير المنتظمة الشاذة التي يتغير شكلها بالكامل، مثل: go تصبح went، و see تصبح saw، و buy تصبح bought.
أما عند النفي، فهناك سر ذهبي مهم جداً: نستخدم didn't ونعيد الفعل فوراً إلى شكله الأصلي المجرد! فنقول: She didn't study، وإياك أن تقول didn't studied.
وعند السؤال، نبدأ بكلمة Did يليها الفاعل ثم الفعل الأصلي، مثل: Did you visit London?.
وضعت لك على السبورة الذكية تفكيك الجملة نحوياً، وبنك الأفعال الشاذة الشائعة، والفخاخ لتتجنبها، وسلسلة تمارين وتحدي تحدث بالمايك سنحلها معاً طوال وقت حصتنا المقررة.
استمع للشرح بتركيز! هل استوعبت هذا النموذج يا بطل؟ اضغط على زر 'اقلب الصفحة 📄' لنشرح الصفحة التالية معاً ونواصل رحلتنا خطوة بخطوة!`
          : `Welcome champion to our comprehensive masterclass on: ${lesson.titleEn}! 🌸
Let us first understand the true core of Past Simple: we use it for actions that started and finished completely in the past at a specific time.
Our golden formula for affirmative sentences is: Subject + Past Verb (V2) + Time marker, such as: "I visited London last year" or "They went to the museum yesterday".
Notice verbs are divided into two main categories:
First, regular verbs where we add -ed, like played and visited.
Second, irregular verbs that change completely, such as go becoming went, see becoming saw, and buy becoming bought.
When forming negative sentences, remember this crucial rule: we use "didn't" and immediately return the verb to its base form! We say: "She didn't watch", never "didn't watched".
For questions, we begin with "Did" followed by the subject and base verb: "Did you finish your project?".
I have set up the full syntax formula, irregular verb bank, common pitfalls, and speaking drills on your smart chalkboard.
Listen carefully to this model! Did you get it? Click 'Turn Page 📄' so we can unpack the formula together step-by-step!`)
      : (isRtl
          ? `أهلاً بك يا بطل في حصتنا الشاملة والمفصلة لدرس: ${lesson.titleAr}! 🌸
دعنا نتأمل أولاً الهدف الحقيقي من هذه القاعدة: ${unit?.explanationAr || lesson.descriptionAr || 'هذه القاعدة أساسية جداً في اللغة الإنجليزية'}.
${prepQuestionAudio}
الصيغة والقاعدة التركيبية التي كتبتها لك بالطبشور على السبورة هي: ${formula}.
ولكي تتقن استخدامها بدقة في حياتك اليومية، لاحظ القواعد التفصيلية:
${rulesAudioText}.
دعنا نطبق ذلك عملياً على الأمثلة الحية المكتوبة على السبورة:
${examplesAudioText}.
وانتبه جيداً: عندما ننفي الجملة أو نسأل سؤالاً، يتغير ترتيب الكلمات ونعيد الفعل لأصله المجرد.
وقد جهزت لك على السبورة الذكية تفكيك الجملة نحوياً، والفخاخ الشائعة لتتجنبها، وبنك المفردات، وسلسلة أسئلة وتحديات تدريبية سنحلها معاً طوال وقت الحصة.
استمع للشرح بتركيز، واضغط على زر 'اقلب الصفحة 📄' لنشرح الخطوة التالية معاً!`
          : `Welcome champion to our comprehensive masterclass on: ${lesson.titleEn}! 🌸
Let us first understand the true purpose: ${unit?.explanationEn || lesson.descriptionEn || 'This structure is essential for clear communication'}.
${prepQuestionAudio}
Our master formula on the smart chalkboard is: ${formula}.
To apply it with complete accuracy, pay close attention to these rules:
${rulesAudioText}.
Let us examine the real-world models on the board:
${examplesAudioText}.
Notice how negation and question structures operate with base verbs.
I have outlined the formula, sentence models, common pitfalls, and quick quiz on your smart whiteboard.
Listen to this first step, then click 'Turn Page 📄' to continue our lesson together!`);

    // Deep structured study guide in chat
    const chatMessage = isRtl
      ? `📚 **حصة دراسية شاملة ومفصلة: ${lesson.titleAr} (${level})**

🌟 **الهدف وسياق الاستخدام في الحياة اليومية:**
${unit?.explanationAr || lesson.descriptionAr || 'إتقان هذه القاعدة يمنحك ثقة عالية في التحدث والكتابة.'}
${unit?.prepQuestionAr ? `💡 *سؤال تمهيدي للتفكير:* ${unit.prepQuestionAr}` : ''}

📐 **القاعدة والصيغة التركيبية:**
\`${formula}\`

📌 **الأركان والقواعد التفصيلية:**
${unit?.rules ? unit.rules.map((r: any) => `• **${r.titleAr}:** ${r.contentAr}`).join('\n') : `• ${formula}`}

🗣️ **أمثلة حية متعددة من واقع الحياة:**
${unit?.examples ? unit.examples.map((ex: any) => `• \`${ex.en}\` ➔ ${ex.ar}`).join('\n') : `• \`${sentence}\``}

⚠️ **فخ شائع للناطقين بالعربية:**
${commonPitfall.bad} ➔ الصواب: \`${commonPitfall.good}\`
*السبب الأكاديمي:* ${commonPitfall.explanation}

🧠 **حيلة الذاكرة الذكية:**
${mnemonic}

⏱️ **خطة الحصة المقررة:**
سنقضي وقت الحصة كاملاً معاً في الشرح والتطبيق وحل التمارين والتحدث الصوتي بالمايك خطوة بخطوة. استمع لشرحي الصوتي المفصل أعلاه، وافتح السبورة الذكية 📐 لنبدأ!`
      : `📚 **Comprehensive Masterclass: ${lesson.titleEn} (${level})**

🌟 **Context & Purpose:**
${unit?.explanationEn || lesson.descriptionEn || 'Mastering this rule builds immense confidence in speaking and writing.'}
${unit?.prepQuestionEn ? `💡 *Concept Starter:* ${unit.prepQuestionEn}` : ''}

📐 **Grammar Formula:**
\`${formula}\`

📌 **Detailed Structural Rules:**
${unit?.rules ? unit.rules.map((r: any) => `• **${r.titleEn}:** ${r.contentEn}`).join('\n') : `• ${formula}`}

🗣️ **Real-World Model Sentences:**
${unit?.examples ? unit.examples.map((ex: any) => `• \`${ex.en}\` ➔ ${ex.ar || ''}`).join('\n') : `• \`${sentence}\``}

⚠️ **Common Pitfall to Avoid:**
${commonPitfall.bad} ➔ Say: \`${commonPitfall.good}\`
*Pedagogical Reason:* ${commonPitfall.explanation}

🧠 **Smart Memory Hook:**
${mnemonic}

⏱️ **Paced Lesson Roadmap:**
We will spend our full session time practicing, analyzing sentence parts, and drilling speaking and quiz challenges together. Listen to the detailed audio walkthrough above and open the smart whiteboard 📐 to begin!`;

    const notes = [
      isRtl ? `🎯 الهدف التواصلي: ${unit?.explanationAr || lesson.descriptionAr}` : `🎯 Core Purpose: ${unit?.explanationEn || lesson.descriptionEn}`,
      isRtl ? `📐 الصيغة التركيبية: ${formula}` : `📐 Syntax Formula: ${formula}`,
      ...(unit?.rules ? unit.rules.map((r: any) => isRtl ? `📌 ${r.titleAr}: ${r.contentAr}` : `📌 ${r.titleEn}: ${r.contentEn}`) : []),
      ...(unit?.examples ? unit.examples.map((ex: any) => isRtl ? `💬 نموذج واقعي: "${ex.en}" ➔ ${ex.ar}` : `💬 Model Sentence: "${ex.en}"`) : []),
      isRtl ? `⚠️ فخ شائع: راجع بطاقة التحذير على السبورة لتجنب خلط الأزمنة وتصريف الأفعال` : `⚠️ Common Trap: Watch auxiliary verb harmony and base forms`,
      isRtl ? `⏱️ التدريب المستمر: نتدرب ونتفاعل معاً طوال مدة الحصة المقررة خطوة بخطوة` : `⏱️ Continuous Practice: We drill and interact for the full lesson duration`
    ];

    return {
      boardData: {
        title,
        sentence,
        formula,
        highlight: mainExample?.en?.split(' ')?.[0] || 'Grammar Rule',
        notes: notes.slice(0, 6),
        grammarBreakdown: grammarBreakdownParts ? { label: 'Syntax Dissection', parts: grammarBreakdownParts } : undefined,
        commonPitfall,
        mnemonic,
        drillChallenge,
        vocabularyBank,
        speakingPrompt,
        quiz,
        quizzes: quizList,
        voiceExplanation,
        teacherNote: isRtl ? `المستوى المستهدف: ${level} | المدة المقررة: ${lesson.duration}` : `Target: ${level} | Duration: ${lesson.duration}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage
    };
  }

  // 2. READING LAB
  if (lesson.pillarId === 'reading') {
    const units = (ALL_READING_UNITS as any)[level] || [];
    const unit = units.find((u: any) => String(u.id) === String(lesson.id)) || units[0];

    const title = isRtl
      ? `مختبر القراءة والطلاقة (${level}): ${lesson.titleAr}`
      : `Reading Lab (${level}): ${lesson.titleEn}`;

    const sentence = unit?.readingTextEn || 'Reading books expands your imagination and vocabulary.';
    const vocabList = unit?.cards?.map((c: any) => `${c.en} (${c.ar})`).slice(0, 3).join(' • ') || 'Vocabulary • Fluency • Comprehension';

    const vocabularyBank = unit?.cards?.slice(0, 4).map((c: any) => ({
      word: c.en,
      meaning: c.ar || 'مفردة أساسية',
      pos: 'Word',
      example: sentence
    }));

    const notes = [
      isRtl ? `📖 الفكرة المركزية: ${unit?.descriptionAr || lesson.descriptionAr}` : `📖 Main Idea: ${unit?.descriptionEn || lesson.descriptionEn}`,
      isRtl ? `🔤 أهم المفردات: ${vocabList}` : `🔤 Key Words: ${vocabList}`,
      isRtl ? `💡 المعنى باللغة العربية: ${unit?.readingTextAr || 'استوعب سياق الجملة وتدرب على قراءتها بصوت جهوري'}` : `💡 Target: Practice smooth phrasing and intonation`,
    ];

    const voiceExplanation = isRtl
      ? `مرحباً بك في مختبر القراءة والفهم! درسنا اليوم هو: ${lesson.titleAr}. استمع جيداً لقراءة النص على السبورة: "${sentence}". التركيز على مخارج الحروف والربط بين الكلمات هو سر الطلاقة الحقيقية!`
      : `Welcome to the Reading Lab! Today we explore: ${lesson.titleEn}. Listen closely to our key passage on the whiteboard: "${sentence}". Focusing on cadence and rhythm will build your natural fluency!`;

    const speakingPrompt = {
      instruction: isRtl 
        ? `اقرأ النص بالمايك بصوت واضح وجهوري مع التركيز على النطق السليم:` 
        : `Read the passage aloud clearly into your microphone:`,
      sampleAnswer: sentence
    };

    return {
      boardData: {
        title,
        sentence,
        highlight: unit?.cards?.[0]?.en || 'Reading Comprehension',
        formula: isRtl ? 'مهارة: القراءة الصامتة ثم الجهرية والتحليل' : 'Skill: Phrasing, Rhythm & Comprehension',
        notes,
        vocabularyBank,
        speakingPrompt,
        drillChallenge: {
          type: 'repeat' as const,
          instruction: isRtl ? 'تدرب على القراءة الجهرية المتصلة مع سارة' : 'Practice connected speech with Sara',
          targetText: sentence
        },
        quiz: {
          question: isRtl ? `ما الكلمة التي تعني: "${unit?.cards?.[0]?.ar || 'المعنى الأساسي'}"؟` : `What word best completes the reading passage?`,
          options: [unit?.cards?.[0]?.en || 'Correct Word', 'Unrelated', 'Incorrect'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? `قسم القراءة المتقدم | مستوى ${level}` : `Reading Lab | Level ${level}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `📖 **اخترت مختبر القراءة: ${lesson.titleAr} (${level})**\n\nوضعت لك النص التفاعلي والكلمات المفتاحية على السبورة 📐. استمع لنطقي وسأساعدك في القراءة!`
        : `📖 **Selected Reading Lab: ${lesson.titleEn} (${level})**\n\nI have presented the passage and key vocabulary on the whiteboard 📐. Let us read together!`
    };
  }

  // 3. CONVERSATION & AI SPEAKING
  if (lesson.pillarId === 'conversation') {
    const units = (ALL_CONVERSATION_UNITS as any)[level] || [];
    const unit = units.find((u: any) => String(u.id) === String(lesson.id)) || units[0];

    const title = isRtl
      ? `أكاديمية المحادثة (${level}): ${lesson.titleAr}`
      : `Conversation Academy (${level}): ${lesson.titleEn}`;

    const mainPhrase = unit?.phrases?.[0]?.en || 'It is an absolute pleasure to converse with you.';
    const phraseAr = unit?.phrases?.[0]?.ar || 'يسعدني جداً التحدث معك.';

    const notes = [
      isRtl ? `🗣️ السياق الحواري: ${unit?.contextAr || lesson.descriptionAr}` : `🗣️ Context: ${unit?.contextEn || lesson.descriptionEn}`,
      isRtl ? `💬 العبارة الأساسية: "${mainPhrase}" (${phraseAr})` : `💬 Core Expression: "${mainPhrase}"`,
      isRtl ? `🎭 سيناريو التدريب: ${unit?.scenarios?.[0]?.titleAr || 'محادثة شفهية تفاعلية'}` : `🎭 Role Scenario: ${unit?.scenarios?.[0]?.titleEn || 'Interactive Dialogue'}`
    ];

    const voiceExplanation = isRtl
      ? `أهلاً بك يا بطل في استوديو المحادثة الشفهية! درسنا المنهجي هو: ${lesson.titleAr}. في المحادثات الحقيقية، نستخدم عبارات دبلوماسية واثقة مثل: "${mainPhrase}". ردد معي بصوتك بالمايك!`
      : `Welcome to the Conversation Studio! Today we are practicing: ${lesson.titleEn}. In real dialogues, speaking with confidence and warmth makes all the difference: "${mainPhrase}". Repeat after me!`;

    const speakingPrompt = {
      instruction: isRtl 
        ? `تحدث بالمايك ورد على سارة مستخدماً عبارة المحادثة: "${mainPhrase}"` 
        : `Speak into your mic and respond using: "${mainPhrase}"`,
      sampleAnswer: mainPhrase
    };

    const commonPitfall = {
      bad: isRtl ? 'التردد أو الصمت الطويل أثناء المحادثة' : 'Hesitating without a conversational filler',
      good: isRtl ? 'استخدم جملاً تمهيدية مثل: "Well, let me see..."' : 'Use conversational fillers: "Well, honestly..."',
      explanation: isRtl 
        ? 'في المحادثة الإنجليزية الطبيعية، استخدام عبارات ملء الفراغ يعطيك وقتاً للتفكير ويبقيك متحدثاً واثقاً' 
        : 'Conversational fillers keep dialogue flowing smoothly while you formulate your ideas'
    };

    return {
      boardData: {
        title,
        sentence: mainPhrase,
        highlight: mainPhrase.split(' ').slice(0, 3).join(' '),
        formula: isRtl ? 'نمط المحادثة: استماع فعال + رد لبق وسريع' : 'Pattern: Active Listening + Diplomatic Response',
        notes,
        speakingPrompt,
        drillChallenge: {
          type: 'repeat' as const,
          instruction: isRtl ? 'تحدي النطق الحواري السريع مع سارة' : 'Rapid conversational rhythm challenge',
          targetText: mainPhrase
        },
        commonPitfall,
        quiz: {
          question: isRtl ? `كيف ترد بلباقة في هذا الموقف بالإنجليزية؟` : `Choose the most polite and natural response:`,
          options: [mainPhrase, 'No, I do not want to talk', 'Whatever you say'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? `استوديو المحادثة | مستوى ${level}` : `Conversation Studio | Level ${level}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🗣️ **اخترت منهج المحادثة: ${lesson.titleAr} (${level})**\n\nكتبت لك السيناريو وأهم العبارات على السبورة 📐. اضغط المايك وتحدث معي لنتدرب شفهياً!`
        : `🗣️ **Selected Conversation Unit: ${lesson.titleEn} (${level})**\n\nI have prepared the role-play scenario and phrases on the whiteboard 📐. Speak with me via mic to practice!`
    };
  }

  // 4. WRITING & SPELLING STUDIO
  if (lesson.pillarId === 'writing') {
    const units = (ALL_WRITING_UNITS as any)[level] || [];
    const unit = units.find((u: any) => String(u.id) === String(lesson.id)) || units[0];

    const title = isRtl
      ? `استوديو التعبير والكتابة (${level}): ${lesson.titleAr}`
      : `Writing & Spelling Studio (${level}): ${lesson.titleEn}`;

    const sentence = unit?.modelParagraphEn || unit?.modelEn || 'Strong writing begins with a clear topic sentence and vivid supporting details.';
    const notes = [
      isRtl ? `✍️ الهدف الإنشائي: ${lesson.descriptionAr}` : `✍️ Writing Objective: ${lesson.descriptionEn}`,
      isRtl ? `🔗 أدوات الربط: Furthermore, In addition, Consequently` : `🔗 Linking Transitions: Furthermore, In addition, Consequently`,
      isRtl ? `📝 بنية النص: مقدمة متناسقة، عرض مدعم بالأدلة، وخاتمة ملهمة` : `📝 Structure: Hook, Supporting Arguments, Cohesive Conclusion`
    ];

    const voiceExplanation = isRtl
      ? `أهلاً بك في استوديو التعبير والإملاء! درسنا اليوم: ${lesson.titleAr}. الكتابة الاحترافية تعتمد على وضوح الفكرة وروابط الجمل المتناسقة. انظر إلى هيكل الفقرة النموذجية على السبورة لنطبقه سوياً!`
      : `Welcome to the Writing Studio! Today we focus on: ${lesson.titleEn}. Cohesive writing relies on clear topic sentences and smooth transitions. Check our model structure on the whiteboard!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: 'Topic Sentence & Transitions',
        formula: 'Hook + Topic Sentence + Evidence + Concluding Transition',
        notes,
        quiz: {
          question: isRtl ? 'ما هي الأداة الأفضل للربط بين فكرتين تدعمان نفس النتيجة؟' : 'Which transition best connects two complementary ideas?',
          options: ['Furthermore', 'However', 'Despite'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? `استوديو الكتابة | مستوى ${level}` : `Writing Studio | Level ${level}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `✍️ **اخترت استوديو الكتابة: ${lesson.titleAr} (${level})**\n\nأعددت لك هيكل التعبير وأدوات الربط على السبورة 📐. اكتب لي جملتك وسأصححها لك فوراً!`
        : `✍️ **Selected Writing Studio: ${lesson.titleEn} (${level})**\n\nI have outlined the composition blueprint and transitions on the whiteboard 📐. Type your sentence and I will review it!`
    };
  }

  // 5. EXPRESSION & IDIOMS
  if (lesson.pillarId === 'expression') {
    const units = (ALL_EXPRESSION_UNITS as any)[level] || [];
    const unit = units.find((u: any) => String(u.id) === String(lesson.id)) || units[0];

    const title = isRtl
      ? `استوديو التعبير والبلاغة (${level}): ${lesson.titleAr}`
      : `Expression & Idioms Studio (${level}): ${lesson.titleEn}`;

    const mainIdiom = unit?.idioms?.[0]?.en || 'A piece of cake';
    const idiomMeaning = unit?.idioms?.[0]?.ar || 'أمر في غاية السهولة والبساطة';
    const exampleSentence = unit?.examples?.[0]?.en || `Learning with Sara is a piece of cake!`;

    const voiceExplanation = isRtl
      ? `مرحباً بك في عالم التعبير والبلاغة! درسنا الممتع اليوم هو: ${lesson.titleAr}. التعبيرات الاصطلاحية تجعل لغتك قريبة من المتحدث الأصلي، مثل تعبير: "${mainIdiom}"، ويعني: ${idiomMeaning}. تعال نشاهد كيفية استخدامه على السبورة!`
      : `Welcome to the Expression & Idioms Studio! Today we explore: ${lesson.titleEn}. Idioms make your English natural and vivid, like: "${mainIdiom}". Let us see how to use it on the whiteboard!`;

    return {
      boardData: {
        title,
        sentence: exampleSentence,
        highlight: mainIdiom,
        formula: isRtl ? `تعبير بلاغي: ${mainIdiom} = ${idiomMeaning}` : `Idiomatic Pattern: ${mainIdiom}`,
        notes: [
          isRtl ? `🌟 التعبير الأساسي: "${mainIdiom}"` : `🌟 Core Idiom: "${mainIdiom}"`,
          isRtl ? `💡 المعنى المجازي: ${idiomMeaning}` : `💡 Figurative Meaning: Very easy / effortless`,
          isRtl ? `🗣️ مثال في سياق: "${exampleSentence}"` : `🗣️ Example Context: "${exampleSentence}"`
        ],
        quiz: {
          question: isRtl ? `ماذا يعني تعبير "${mainIdiom}"؟` : `What does "${mainIdiom}" mean?`,
          options: [idiomMeaning, 'أمر معقد وشديد الصعوبة', 'نوع من الطعام والحلويات'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? `استوديو البلاغة | مستوى ${level}` : `Expression Lab | Level ${level}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🌟 **اخترت منهج التعبير والبلاغة: ${lesson.titleAr} (${level})**\n\nكتبت لك التعبير البلاغي ومثاله على السبورة 📐. استمع لشرحي واستخدمه في جملتك!`
        : `🌟 **Selected Expression & Idioms: ${lesson.titleEn} (${level})**\n\nI have highlighted the idiom and example on the smart whiteboard 📐. Listen to my explanation!`
    };
  }

  // 6. OXFORD DISCOVER CURRICULUM
  if (lesson.pillarId === 'oxford') {
    const oxfordLesson = (OXFORD_LESSONS as any[]).find(o => String(o.id) === String(lesson.id)) || OXFORD_LESSONS[0];

    const title = isRtl
      ? `سلسلة أكسفورد العالمية: ${lesson.titleAr}`
      : `Oxford Discover: ${lesson.titleEn}`;

    const bigQuestion = oxfordLesson?.bigQuestion || 'How do we discover the world around us?';
    const bigQuestionAr = oxfordLesson?.bigQuestionAr || 'كيف نكتشف العالم المذهل من حولنا؟';
    const sampleSentence = oxfordLesson?.vocab?.[0]
      ? `Key Word: ${oxfordLesson.vocab[0].word} - ${oxfordLesson.vocab[0].ar}`
      : `Big Question: ${bigQuestion}`;

    const vocabList = oxfordLesson?.vocab?.slice(0, 3).map((v: any) => `${v.word} (${v.ar})`).join(' • ') || 'Discover • Values • Science';

    const voiceExplanation = isRtl
      ? `أهلاً بك في منهج أكسفورد العالمي المرموق! وحدتنا التعليمية هي: ${lesson.titleAr}. سؤالنا الكبير للتفكير والبحث هو: "${bigQuestionAr}". انظر للسبورة الذكية لتستكشف الكلمات والمفاهيم المصورة!`
      : `Welcome to the Oxford Discover Curriculum! Our unit is: ${lesson.titleEn}. Our Big Question is: "${bigQuestion}". Look at the smart whiteboard to explore our key vocabulary!`;

    return {
      boardData: {
        title,
        sentence: `Big Question: ${bigQuestion}`,
        highlight: oxfordLesson?.vocab?.[0]?.word || 'Oxford Discover',
        formula: isRtl ? `السؤال الكبير: ${bigQuestionAr}` : `Big Question: ${bigQuestion}`,
        notes: [
          isRtl ? `❓ السؤال الكبير: ${bigQuestionAr}` : `❓ Big Question: ${bigQuestion}`,
          isRtl ? `📚 مفردات الوحدة: ${vocabList}` : `📚 Unit Vocabulary: ${vocabList}`,
          isRtl ? `🌱 القيم والمهارات الحياتية: الاستكشاف، والتعاون، والتفكير الإبداعي` : `🌱 Global Values: Discovery, Collaboration & Critical Inquiry`
        ],
        quiz: {
          question: isRtl ? `في منهج أكسفورد: ${bigQuestionAr}، ما هي الكلمة المرتبطة؟` : `Which vocabulary item connects to: "${bigQuestion}"?`,
          options: [oxfordLesson?.vocab?.[0]?.word || 'Discover', 'Ignore', 'Forget'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'منهج أكسفورد ديسكفر العالمي' : 'Oxford Discover Global Series',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🏆 **اخترت سلسلة مناهج أكسفورد: ${lesson.titleAr}**\n\nوضعت لك السؤال الكبير والكلمات المفتاحية على السبورة 📐. تعال نتناقش فيه سوا!`
        : `🏆 **Selected Oxford Discover Unit: ${lesson.titleEn}**\n\nI have posted the Big Question and vocabulary on the whiteboard 📐. Let us explore together!`
    };
  }

  // 7. EARLY CHILDHOOD & TODDLERS (البراعم)
  if (lesson.pillarId === 'early_childhood') {
    const title = isRtl
      ? `أكاديمية البراعم والطفولة المبكرة: ${lesson.titleAr}`
      : `Early Childhood Academy: ${lesson.titleEn}`;

    const sentence = 'A B C D E F G - Learning English is fun with Sara! 🌟';
    const voiceExplanation = isRtl
      ? `أهلاً بصغيري البطل ومامته وباباه في أكاديمية البراعم! درسنا الجميل اليوم هو: ${lesson.titleAr}. جهزت لك على السبورة أشكالاً ملونة وأصواتاً ممتعة، تعال نرددها ونلعب معاً! 🌸`
      : `Welcome little champion to the Early Childhood Academy! Today we play and learn: ${lesson.titleEn}. Look at the bright colors and fun words on our board! Let us sing together! 🌸`;

    return {
      boardData: {
        title,
        sentence,
        highlight: 'Fun Phonics & Shapes 🎈',
        formula: '🌟 Visual • Auditory • Happy Mascot 🦁',
        notes: [
          isRtl ? '🎈 كلمات بصرية ملونة تناسب سن 2 إلى 6 سنوات' : '🎈 Visual toddler vocabulary for ages 2-6',
          isRtl ? '🦁 أصوات الحروف والأرقام بنطق تفاعلي واضح' : '🦁 Phonics and numbers with cheerful mascot pronunciation',
          isRtl ? '🎨 تلوين وربط الصورة بالصوت لتثبيت التعلم المبكر' : '🎨 Interactive coloring and sensory audio matching'
        ],
        quiz: {
          question: isRtl ? 'ما هو الحرف الأول في كلمة "Apple" 🍎؟' : 'What is the first letter of "Apple" 🍎?',
          options: ['A', 'B', 'C'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'قسم البراعم والطفولة المبكرة 👶' : 'Early Childhood Phonics 👶',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `👶 **اخترت أكاديمية البراعم: ${lesson.titleAr}**\n\nرسمت لك الكلمات والأشكال بالطبشور على السبورة 📐. استمع لصوتي يا بطل وردد معي!`
        : `👶 **Selected Early Childhood Module: ${lesson.titleEn}**\n\nI have illustrated the fun words on the whiteboard 📐. Listen and repeat after me!`
    };
  }

  // 8. PRONUNCIATION & PHONETICS
  if (lesson.pillarId === 'pronunciation') {
    const pData = PRONUNCIATION_LAB_DATA.find(p => p.id === lesson.id) || PRONUNCIATION_LAB_DATA[0];
    const soundPair = pData?.sound_pair ? pData.sound_pair.join(' vs ') : (pData?.topic || 'Phonics Sounds');

    const title = isRtl
      ? `معمل الصوتيات ومخارج الحروف: ${lesson.titleAr}`
      : `Phonetics & Pronunciation Lab: ${lesson.titleEn}`;

    const sentence = isRtl 
      ? `التدريب الصوتي على نطق: ${soundPair}` 
      : `Acoustic phonetics practice for: ${soundPair}`;
    const voiceExplanation = isRtl
      ? `مرحباً بك في معمل الصوتيات والمخارج! درسنا التخصصي اليوم هو: ${lesson.titleAr}. سنركز على مخرج الصوت الصحيح، انظر للجملة المستهدفة على السبورة واستمع لنطقي الدقيق!`
      : `Welcome to the Phonetics Lab! Today we focus on: ${lesson.titleEn}. We will train your mouth placement and pitch. Listen carefully to our target phrase on the whiteboard!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: soundPair,
        formula: isRtl ? 'مخرج الحرف: موضع اللسان + حركة الشفاه + هواء التنفس' : 'Articulatory Placement: Tongue + Lips + Vocal Vibration',
        notes: [
          isRtl ? `🎙️ الرمز الصوتي المستهدف: ${soundPair}` : `🎙️ Target Sound: ${soundPair}`,
          isRtl ? `👅 نصيحة المخرج: ضع طرف اللسان والشفتين في الموضع السليم` : `👅 Tip: Place the tongue and lips in the exact phonetic position`,
          isRtl ? `🔊 تدريب: استمع ثم اضغط على المايك وانطق بوضوح` : `🔊 Exercise: Listen and speak via microphone to practice`
        ],
        quiz: {
          question: isRtl ? `أي الأصوات التالية يمثل الهدف الصوتي لدرس: "${lesson.titleAr}"؟` : `Which sound represents the target of this lab?`,
          options: [soundPair, '/z/ vs /d/', '/k/ vs /g/'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'معمل النطق الصوتي الفوري' : 'Phonetics & Articulation Lab',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🎙️ **اخترت معمل النطق الصوتي: ${lesson.titleAr}**\n\nوضعت لك الرمز الصوتي ومخرج الحرف على السبورة 📐. انطق معي بالمايك لأحلل صوتك!`
        : `🎙️ **Selected Pronunciation Lab: ${lesson.titleEn}**\n\nI have placed the IPA phonetics on the whiteboard 📐. Speak via mic for acoustic analysis!`
    };
  }

  // 9. DAILY DOSE (الجرعة اليومية وتصحيح الأخطاء)
  if (lesson.pillarId === 'daily_dose') {
    const dose = ADULTS_DAILY_DOSES.find(d => d.lesson_id === lesson.id) || ADULTS_DAILY_DOSES[0];
    const dialogueLine = dose?.sections?.story_dialogue?.lines?.[0];
    const vocabWord = dose?.sections?.mini_dictionary?.words?.[0];

    const title = isRtl
      ? `الجرعة اليومية المكثفة: ${lesson.titleAr}`
      : `Daily Dose: ${lesson.titleEn}`;

    const sentence = dialogueLine?.english || 'Continuous daily practice builds natural fluency.';
    const sentenceAr = dialogueLine?.arabic || 'الممارسة اليومية المستمرة تبني الطلاقة الطبيعية.';

    const voiceExplanation = isRtl
      ? `أهلاً بك في جرعتك اللغوية اليومية المكثفة! درسنا اليوم: ${lesson.titleAr}. انظر للعبارات والمفردات الذهبية على السبورة الذكية، تعال نستعرضها ونمارسها سوياً!`
      : `Welcome to your high-impact Daily Dose! Today we study: ${lesson.titleEn}. Check our gold standard sentences and vocabulary on the whiteboard!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: vocabWord?.word || 'Daily Practice',
        correction: {
          wrong: 'I practice English rarely',
          right: 'I practice English every single day'
        },
        formula: isRtl ? 'الجرعة اليومية: استماع + محادثة + تكرار يومي' : 'Daily Dose: Listen + Speak + Retain Daily',
        notes: [
          isRtl ? `💬 جملة الحوار: "${sentence}"` : `💬 Dialogue Phrase: "${sentence}"`,
          isRtl ? `💡 المعنى بالعربية: ${sentenceAr}` : `💡 Arabic Meaning: ${sentenceAr}`,
          isRtl ? `⭐ كلمة هامة: ${vocabWord?.word || 'Practice'} (${vocabWord?.meaning_ar || 'ممارسة'})` : `⭐ Vocabulary Word: ${vocabWord?.word || 'Practice'}`
        ],
        quiz: {
          question: isRtl ? `ما المعنى الصحيح لكلمة "${vocabWord?.word || 'Practice'}"؟` : `What is the meaning of "${vocabWord?.word || 'Practice'}"?`,
          options: [vocabWord?.meaning_ar || 'ممارسة وتطبيق', 'تجاهل', 'نسيان'],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'الجرعة اليومية وتصحيح الأخطاء 🔥' : 'Daily Dose Fluency Builder 🔥',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🔥 **اخترت الجرعة اليومية: ${lesson.titleAr}**\n\nكتبت لك الحوار والمفردات على السبورة 📐. استمع لشرحي وطبقها في يومك!`
        : `🔥 **Selected Daily Dose: ${lesson.titleEn}**\n\nI have summarized the dialogue and key vocabulary on the whiteboard 📐!`
    };
  }

// Helper to resolve book, chapter, and microLesson from COURSES
function resolveBookChapterAndMicroLesson(lesson: CurriculumLesson) {
  let targetBook = COURSES.find(b => 
    b.id === lesson.courseId ||
    lesson.id.includes(b.id) ||
    (lesson.courseLabelAr && (lesson.courseLabelAr.includes(b.titleAr) || b.titleAr.includes(lesson.courseLabelAr))) ||
    (lesson.courseLabelEn && (lesson.courseLabelEn.includes(b.titleEn) || b.titleEn.includes(lesson.courseLabelEn))) ||
    (lesson.titleAr && (lesson.titleAr.includes(b.titleAr) || b.titleAr.includes(lesson.titleAr))) ||
    (lesson.titleEn && (lesson.titleEn.includes(b.titleEn) || b.titleEn.includes(lesson.titleEn)))
  );

  if (!targetBook) {
    if (lesson.id.includes('atomic') || lesson.titleAr?.includes('الذرية')) targetBook = COURSES.find(b => b.id === 'atomic_habits');
    else if (lesson.id.includes('seven') || lesson.titleAr?.includes('السبع')) targetBook = COURSES.find(b => b.id === 'seven_habits');
    else if (lesson.id.includes('rich') || lesson.titleAr?.includes('الغني')) targetBook = COURSES.find(b => b.id === 'rich_dad');
    else if (lesson.id.includes('power') || lesson.titleAr?.includes('الآن')) targetBook = COURSES.find(b => b.id === 'power_of_now');
    else if (lesson.id.includes('letting') || lesson.titleAr?.includes('الرحيل')) targetBook = COURSES.find(b => b.id === 'letting_go');
    else if (lesson.id.includes('thinking') || lesson.titleAr?.includes('التفكير')) targetBook = COURSES.find(b => b.id === 'thinking_fast_slow');
    else if (lesson.id.includes('subtle') || lesson.titleAr?.includes('اللامبالاة')) targetBook = COURSES.find(b => b.id === 'subtle_art');
    else if (lesson.id.includes('win') || lesson.titleAr?.includes('تفوز')) targetBook = COURSES.find(b => b.id === 'you_can_win');
  }
  const book = targetBook || COURSES[0];

  let targetChapter: any = null;
  let targetLesson: any = null;

  if (book && book.chapters) {
    for (const ch of book.chapters) {
      if (
        lesson.id.includes(ch.id) ||
        (lesson.titleAr && lesson.titleAr.includes(ch.titleAr)) ||
        (lesson.titleEn && lesson.titleEn.includes(ch.titleEn))
      ) {
        targetChapter = ch;
      }
      for (const les of ch.lessons) {
        if (
          `${book.id}__${les.id}` === lesson.id ||
          les.id === lesson.id ||
          lesson.id.includes(les.id) ||
          (lesson.titleAr && lesson.titleAr.includes(les.titleAr)) ||
          (lesson.titleEn && lesson.titleEn.includes(les.titleEn))
        ) {
          targetLesson = les;
          if (!targetChapter) targetChapter = ch;
          break;
        }
      }
      if (targetLesson && targetChapter) break;
    }
  }

  const chapter = targetChapter || book?.chapters?.[0];
  const microLesson = targetLesson || chapter?.lessons?.[0];

  return { book, chapter, microLesson };
}

  // 10. BESTSELLER BOOK COURSES & SELF-DEVELOPMENT
  if (lesson.pillarId === 'book_courses') {
    const { book, chapter, microLesson } = resolveBookChapterAndMicroLesson(lesson);

    const bookShortAr = book?.titleAr?.includes(':') ? book.titleAr.split(':')[0] : (book?.titleAr || 'الكتب العالمية');
    const bookShortEn = book?.titleEn?.includes(':') ? book.titleEn.split(':')[0] : (book?.titleEn || 'Bestseller Books');

    const title = isRtl
      ? `كتاب "${bookShortAr}": ${microLesson?.titleAr || chapter?.titleAr || lesson.titleAr}`
      : `"${bookShortEn}": ${microLesson?.titleEn || chapter?.titleEn || lesson.titleEn}`;

    const quoteEn = microLesson?.contentEn?.slice(0, 160) || chapter?.descriptionEn || 'Small habits compound daily into massive life transformations.';
    const quoteAr = microLesson?.contentAr?.slice(0, 160) || chapter?.descriptionAr || 'العادات والأنظمة اليومية تصنع الفارق الحقيقي في الإتقان والطلاقة.';

    const notes = [
      isRtl ? `📖 كتاب: "${book?.titleAr}" للمؤلف (${book?.authorAr})` : `📖 Book: "${book?.titleEn}" by ${book?.authorEn}`,
      isRtl ? `💡 المبدأ المركزي: ${quoteAr}` : `💡 Core Principle: ${quoteEn}`,
      isRtl ? `🎯 الربط باللغة والتطبيق: استخدم هذه الأفكار والمصطلحات في حديثك اليومي بالإنجليزية` : `🎯 Language Link: Practice articulating this philosophical mindset in English`
    ];

    const rawQuiz = chapter?.quiz?.[0];
    const quizObj = rawQuiz ? {
      question: isRtl ? rawQuiz.questionAr : (rawQuiz.questionEn || rawQuiz.questionAr),
      options: isRtl 
        ? (rawQuiz.optionsAr || ['الخيار الصحيح', 'خيار غير صحيح', 'خيار آخر']) 
        : ((rawQuiz.optionsEn && rawQuiz.optionsEn.length > 0) ? rawQuiz.optionsEn : (rawQuiz.optionsAr || ['Correct Option', 'Incorrect', 'Other'])),
      answerIndex: typeof rawQuiz.correctIndex === 'number' ? rawQuiz.correctIndex : 0,
      explanation: isRtl ? rawQuiz.explanationAr : (rawQuiz.explanationEn || rawQuiz.explanationAr)
    } : {
      question: isRtl ? `ما الحكمة والهدف الأساسي من درس "${lesson.titleAr}"؟` : `What is the core insight of "${lesson.titleEn}"?`,
      options: [
        isRtl ? 'التراكم اليومي المستمر وتطوير الهوية' : 'Daily compounding and habit consistency',
        isRtl ? 'التراجع عند أول عقبة' : 'Giving up easily',
        isRtl ? 'التركيز على الأهداف دون بناء أنظمة' : 'Focusing solely on goals'
      ],
      answerIndex: 0
    };

    const voiceExplanation = isRtl
      ? `مرحباً بك في رحاب الكتب العالمية الملهمة! اليوم سنشرح معاً درساً رائعاً من كتاب "${bookShortAr}" للمؤلف ${book?.authorAr || ''}. الدرس بعنوان: ${microLesson?.titleAr || chapter?.titleAr || lesson.titleAr}. تأمل معي هذا المبدأ الذهبي على السبورة: "${quoteAr}". تعال نناقشه ونربطه باللغة الإنجليزية!`
      : `Welcome to our Bestselling Books Masterclass! Today we explore a lesson from "${bookShortEn}" by ${book?.authorEn}: "${microLesson?.titleEn || chapter?.titleEn || lesson.titleEn}". Notice the powerful insight on our whiteboard: "${quoteEn}". Let us discuss it!`;

    return {
      boardData: {
        title,
        sentence: quoteEn,
        highlight: bookShortEn,
        formula: isRtl ? `منهج الكتب العالمية: ${bookShortAr} (${book?.authorAr})` : `Bestseller Curriculum: ${bookShortEn}`,
        notes,
        quiz: quizObj,
        voiceExplanation,
        teacherNote: isRtl ? `منهج الكتب العالمية وتطوير الذات | ${bookShortAr}` : `Bestseller Books Academy | ${bookShortEn}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `📚 **اخترت منهج الكتب العالمية: كتاب "${book?.titleAr}" (${book?.authorAr})**\n\n📌 **${microLesson?.titleAr || chapter?.titleAr || lesson.titleAr}**\n\n💡 **المبدأ الجوهري:** ${quoteAr}\n\nوضعت لك ملخص المبدأ، الحكمة وسؤال التفكير على السبورة الذكية 📐. استمع لشرحي الصوتي وسأساعدك في استيعابه كاملاً!`
        : `📚 **Selected Bestseller Book Lesson: "${book?.titleEn}" by ${book?.authorEn}**\n\n📌 **${microLesson?.titleEn || chapter?.titleEn || lesson.titleEn}**\n\n💡 **Key Takeaway:** ${quoteEn}\n\nI have prepared the core philosophy, vocabulary, and quick quiz on the smart whiteboard 📐!`
    };
  }

  // 11. CINEMATIC VIDEO LESSONS & REAL-WORLD SCENARIOS
  if (lesson.pillarId === 'video_lessons') {
    const vid = PRODUCED_VIDEO_LESSONS.find(v => v.id === lesson.courseId) || PRODUCED_VIDEO_LESSONS[0];
    const sceneMatch = lesson.id.match(/scene_(\d+)/);
    const sceneNum = sceneMatch ? parseInt(sceneMatch[1], 10) : 1;
    const scene = vid?.scenes?.find(s => s.sceneNumber === sceneNum) || vid?.scenes?.[0];

    const title = isRtl
      ? `المشهد المصور: ${scene?.titleAr || lesson.titleAr}`
      : `Cinematic Scene: ${scene?.titleEn || lesson.titleEn}`;

    const dialogue = scene?.dialogues?.[0];
    const sentence = dialogue ? `${dialogue.speaker}: "${dialogue.textEn}"` : 'Welcome to our London street scene!';
    const sentenceAr = dialogue ? `${dialogue.speaker}: "${dialogue.textAr}"` : 'مرحباً بك في مشهد شوارع لندن المصور!';

    const notes = [
      isRtl ? `🎬 موقع المشهد: ${scene?.setting || 'موقف حي واقعي'}` : `🎬 Setting: ${scene?.setting || 'Real-world context'}`,
      isRtl ? `💬 الحوار النموذجي: ${sentenceAr}` : `💬 Dialogue line: ${sentence}`,
      isRtl ? `💡 نصيحة النطق: ${dialogue?.grammarTip || 'تحدث بثقة ووضوح مع مراعاة نبرة الصوت'}` : `💡 Speech tip: ${dialogue?.grammarTip || 'Speak clearly and naturally'}`
    ];

    const quizObj = scene?.quizCheckpoint ? {
      question: isRtl ? scene.quizCheckpoint.questionAr : scene.quizCheckpoint.questionEn,
      options: scene.quizCheckpoint.options,
      answerIndex: scene.quizCheckpoint.correctIndex
    } : {
      question: isRtl ? `في مشهد: ${scene?.titleAr || lesson.titleAr}، كيف ترد في هذا الموقف؟` : `In this scene, what is the best reply?`,
      options: [
        dialogue?.textEn || 'Pleased to meet you, welcome!',
        'No, I am not interested',
        'Go away please'
      ],
      answerIndex: 0
    };

    const voiceExplanation = isRtl
      ? `أهلاً بك في الاستوديو المصور والمشاهد التفاعلية الحية! اليوم نعيش معاً: ${scene?.titleAr || lesson.titleAr}. المشهد يدور في ${scene?.setting || 'بيئة واقعية'}. انظر للحوار والنصائح على السبورة، واستمع لنطقي الدقيق!`
      : `Welcome to the Cinematic Scenario Studio! Today we experience: ${scene?.titleEn || lesson.titleEn}. Look at the dialogue line on the whiteboard and practice speaking with me!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: dialogue?.textEn?.split(' ')?.[0] || 'Dialogue Scene',
        formula: isRtl ? `المشهد المصور: ${vid?.titleAr} (${scene?.setting})` : `Cinematic Scene: ${vid?.titleEn}`,
        notes,
        quiz: quizObj,
        voiceExplanation,
        teacherNote: isRtl ? `المشاهد المصورة | مستوى ${lesson.level}` : `Cinematic Video Lessons | Level ${lesson.level}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🎬 **اخترت المشهد المصور: ${lesson.titleAr} (${vid?.titleAr})**\n\nكتبت لك الحوار، المشهد وسؤال التطبيق على السبورة 📐. استمع لشرحي وردد بالمايك!`
        : `🎬 **Selected Cinematic Lesson: ${lesson.titleEn}**\n\nI have outlined the real-world scene dialogue and quiz on the whiteboard 📐!`
    };
  }

  // 12. AUDITORY STORIES & NOOR IN LONDON
  if (lesson.pillarId === 'stories') {
    const story = STORIES.find(s => s.id === lesson.id) || STORIES[0];

    const title = isRtl
      ? `القصة المسموعة: ${lesson.titleAr}`
      : `Auditory Story: ${lesson.titleEn}`;

    const sampleText = story?.content?.slice(0, 160) || 'Noor arrived in London, eager to explore the city and meet new friends.';
    const sampleTextAr = lesson.descriptionAr || 'وصلت نور إلى لندن مفعمة بالشغف لاستكشاف المدينة ومقابلة أصدقاء جدد.';

    const notes = [
      isRtl ? `🎧 عنوان القصة: ${story?.titleAr || lesson.titleAr}` : `🎧 Story Title: ${story?.titleEn || lesson.titleEn}`,
      isRtl ? `📖 أحداث القصة: ${sampleTextAr}` : `📖 Story Arc: ${sampleText}`,
      isRtl ? `🌟 مهارة الاستماع: استمع للصوت وركز على مخارج الكلمات وتسلسل الأحداث` : `🌟 Listening Skill: Focus on word phrasing and chronological narrative`
    ];

    const quizObj = {
      question: isRtl ? `ما الفكرة الرئيسية لقصة: "${lesson.titleAr}"؟` : `What is the main theme of "${lesson.titleEn}"?`,
      options: [
        isRtl ? 'المغامرة والاستكشاف وبناء الثقة اللغوية' : 'Adventure, exploration and language confidence',
        isRtl ? 'البقاء في المنزل وتجنب الحوار' : 'Staying home and avoiding conversation',
        isRtl ? 'الاستسلام للخوف' : 'Giving in to fear'
      ],
      answerIndex: 0
    };

    const voiceExplanation = isRtl
      ? `مرحباً بك في عالم القصص المسموعة ومغامرات نور في لندن! قصتنا اليوم: ${lesson.titleAr}. الاستماع للقصص يبني حصيلتك اللغوية بشكل ساحر وطبيعي. انظر لملخص القصة على السبورة واستمع لشرحي الممتع!`
      : `Welcome to our Auditory Story Library! Today we enjoy: ${lesson.titleEn}. Listening to stories builds effortless fluency and vocabulary. Check the story overview on the whiteboard!`;

    return {
      boardData: {
        title,
        sentence: sampleText,
        highlight: story?.titleEn || 'Auditory Story',
        formula: isRtl ? `القصص المسموعة: مغامرات نور في لندن` : `Auditory Story: Noor in London`,
        notes,
        quiz: quizObj,
        voiceExplanation,
        teacherNote: isRtl ? `القصص المسموعة | مستوى ${lesson.level}` : `Story Library | Level ${lesson.level}`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🎧 **اخترت القصة المسموعة: ${lesson.titleAr}**\n\nوضعت لك ملخص القصة وسؤال الاستيعاب على السبورة 📐. استمع لصوتي لنعيش أحداث القصة معاً!`
        : `🎧 **Selected Audio Story: ${lesson.titleEn}**\n\nI have posted the story synopsis and listening check on the whiteboard 📐!`
    };
  }

  // 13. KIDS & JUNIOR STORIES
  if (lesson.pillarId === 'kids_stories') {
    const kStory = KIDS_STORIES.find(s => s.lesson_id === lesson.id) || KIDS_STORIES[0];

    const title = isRtl
      ? `قصة الأطفال: ${lesson.titleAr}`
      : `Junior Story: ${lesson.titleEn}`;

    const sentence = kStory?.sections?.story_dialogue?.lines?.[0]?.english || 'Kindness and curiosity make the world brighter.';
    const sentenceAr = kStory?.sections?.story_dialogue?.lines?.[0]?.arabic || 'اللطف والفضول يجعلان العالم أكثر إشراقاً.';

    const notes = [
      isRtl ? `🌟 القيمة التربوية: الصدق، التعاون والشجاعة` : `🌟 Core Value: Kindness, Honesty & Courage`,
      isRtl ? `💬 جملة من القصة: "${sentence}"` : `💬 Story Quote: "${sentence}"`,
      isRtl ? `💡 المعنى بالعربية: ${sentenceAr}` : `💡 Meaning: ${sentenceAr}`
    ];

    const quizObj = {
      question: isRtl ? `ما العبرة الجميلة التي نتعلمها من قصة "${lesson.titleAr}"؟` : `What beautiful lesson do we learn from "${lesson.titleEn}"?`,
      options: [
        isRtl ? 'التعاون ومساعدة الآخرين بصدق' : 'Helping others with kindness and honesty',
        isRtl ? 'الأنانية وتجاهل الأصدقاء' : 'Selfishness and ignoring friends',
        isRtl ? 'الكسل وعدم التعلم' : 'Laziness and not learning'
      ],
      answerIndex: 0
    };

    const voiceExplanation = isRtl
      ? `أهلاً بك يا بطل في مكتبة قصص الأطفال واليافعين! قصتنا المشوقة اليوم: ${lesson.titleAr}. القصص الهادفة تنمي شخصيتك الإيجابية وتمنحك أروع الكلمات بالإنجليزية. انظر للسبورة واستمع لنطقي الجميل!`
      : `Welcome young champion to the Junior Stories Library! Today our story is: ${lesson.titleEn}. Great stories inspire great character and vocabulary. Look at the board and listen to my walkthrough!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: kStory?.title_en || 'Junior Story',
        formula: isRtl ? 'قصص الأطفال: قيم نبيلة + مفردات ممتعة' : 'Junior Stories: Positive Values + Engaging Vocab',
        notes,
        quiz: quizObj,
        voiceExplanation,
        teacherNote: isRtl ? 'قصص الأطفال واليافعين 🌟' : 'Kids & Junior Story Library 🌟',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🌟 **اخترت قصة الأطفال: ${lesson.titleAr}**\n\nكتبت لك عبرة القصة وجملها الجميلة على السبورة 📐. استمع لشرحي واستمتع بالعبرة!`
        : `🌟 **Selected Junior Story: ${lesson.titleEn}**\n\nI have highlighted the moral values and vocabulary on the whiteboard 📐!`
    };
  }

  // 14. INTERACTIVE PLAY, SONGS, ESCAPE ROOMS & FAMILY
  if (lesson.pillarId === 'interactive_play') {
    const title = isRtl
      ? `التعليم التفاعلي: ${lesson.titleAr}`
      : `Interactive Play: ${lesson.titleEn}`;

    const sentence = 'Learning English through play, songs, and puzzles boosts memory retention!';
    const voiceExplanation = isRtl
      ? `أهلاً بك في عالم المرح والتعليم التفاعلي! نشاطنا اليوم هو: ${lesson.titleAr}. الأغاني والألعاب الذكية تجعل حفظ الكلمات والقواعد أمراً في غاية السهولة والمرح. تعال نشاهد التحدي على السبورة!`
      : `Welcome to Interactive Play & Gamified Learning! Today our activity is: ${lesson.titleEn}. Games, karaoke songs, and puzzles make English unforgettable. Check the challenge on the whiteboard!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: 'Interactive Challenge 🎮',
        formula: isRtl ? 'تعليم باللعب: إيقاع + تحدي + تطبيق فوري' : 'Gamified Learning: Rhythm + Puzzle + Immediate Practice',
        notes: [
          isRtl ? `🎮 نوع النشاط: ${lesson.courseLabelAr}` : `🎮 Activity Type: ${lesson.courseLabelEn}`,
          isRtl ? `💡 الهدف: ${lesson.descriptionAr}` : `💡 Target: ${lesson.descriptionEn}`,
          isRtl ? '⭐ التطبيق: شارك في التحدي التفاعلي بالصوت والحل' : '⭐ Practice: Solve the challenge and sing or speak along'
        ],
        quiz: {
          question: isRtl ? `ما هو سر النجاح في تحديات ${lesson.courseLabelAr}؟` : `What makes ${lesson.courseLabelEn} so effective?`,
          options: [
            isRtl ? 'المشاركة النشطة والتفاعل الصوتي' : 'Active participation and vocal engagement',
            isRtl ? 'المشاهدة الصامتة دون تفاعل' : 'Passive watching without interaction',
            isRtl ? 'الاستعجال دون فهم' : 'Rushing without comprehension'
          ],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'التعليم التفاعلي والألعاب 🎮' : 'Interactive Play & Gamified English 🎮',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🎮 **اخترت التعليم التفاعلي: ${lesson.titleAr}**\n\nأعددت لك التحدي والملاحظات على السبورة الذكية 📐. استمع لشرحي واستمتع بالتطبيق!`
        : `🎮 **Selected Interactive Challenge: ${lesson.titleEn}**\n\nI have set up the activity instructions and puzzle on the whiteboard 📐!`
    };
  }

  // 15. TRANSLATION & LANGUAGE LAB
  if (lesson.pillarId === 'translation_language_lab') {
    const labItem = Object.values(LANGUAGE_LAB_DATA).find(l => `lang_lab_${l.id}` === lesson.id) || Object.values(LANGUAGE_LAB_DATA)[0];

    const title = isRtl
      ? `مختبر اللغة والترجمة: ${lesson.titleAr}`
      : `Language Lab: ${lesson.titleEn}`;

    const sentence = labItem?.title || 'Precision in translation reflects deep mastery of thought.';
    const sentenceAr = labItem?.titleAr || 'الدقة في الترجمة تعكس إتقاناً عميقاً للفكر واللغة.';

    const notes = [
      isRtl ? `🔬 المفهوم اللغوي: ${labItem?.titleAr}` : `🔬 Linguistic Concept: ${labItem?.title}`,
      isRtl ? `💡 الشرح التفصيلي: ${labItem?.explanationAr || lesson.descriptionAr}` : `💡 Deep Explanation: ${labItem?.explanation || lesson.descriptionEn}`,
      isRtl ? '🔍 التحليل: تفكيك الجملة إلى مبتدأ وفعل وسياق ثقافي ملائم' : '🔍 Analysis: Dissecting syntax, prefixes, and cultural register'
    ];

    const voiceExplanation = isRtl
      ? `مرحباً بك في مختبر اللغة والترجمة المتقدم! درسنا اليوم: ${lesson.titleAr}. الترجمة الاحترافية ليست مجرد نقل حرفي للكلمات، بل هي نقل دقيق للمعنى والسياق. انظر لتحليل المفهوم على السبورة!`
      : `Welcome to the Language Lab & Translation Workshop! Today we dissect: ${lesson.titleEn}. True translation preserves context, tone, and nuance. Check the analysis on the smart whiteboard!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: labItem?.title || 'Translation Analysis',
        formula: isRtl ? 'مختبر الترجمة: تفكيك تركيبي + دقة سياقية' : 'Language Lab: Syntax Dissection + Contextual Nuance',
        notes,
        quiz: {
          question: isRtl ? `ما هو المعيار الأهم في الترجمة الاحترافية؟` : `What is the most critical factor in professional translation?`,
          options: [
            isRtl ? 'نقل المعنى والسياق الثقافي بدقة' : 'Conveying meaning and cultural register accurately',
            isRtl ? 'الترجمة الحرفية كلمة بكلمة' : 'Literal word-for-word translation',
            isRtl ? 'تغيير المعنى عشوائياً' : 'Altering meaning randomly'
          ],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'مختبر اللغة والترجمة 🔬' : 'Language Lab & Translation 🔬',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🔬 **اخترت مختبر اللغة والترجمة: ${lesson.titleAr}**\n\nكتبت لك تفكيك المفهوم والتحليل الدقيق على السبورة 📐. استمع لشرحي واستفد من هذا التحليل العميق!`
        : `🔬 **Selected Language Lab: ${lesson.titleEn}**\n\nI have presented the structural breakdown and translation notes on the whiteboard 📐!`
    };
  }

  // 16. FOUNDATIONAL AI PROGRAM (البرنامج التأسيسي للذكاء الاصطناعي)
  if (lesson.pillarId === 'ai_foundational') {
    const title = isRtl
      ? `تأسيس الذكاء الاصطناعي: ${lesson.titleAr}`
      : `Foundational AI: ${lesson.titleEn}`;

    const sentence = 'AI is a powerful pattern-hunting system transforming learning and creativity.';
    const notes = [
      isRtl ? `🤖 المفهوم الجوهري: ${lesson.descriptionAr || 'فهم كيفية تفكير النماذج التوليدية وصيد الأنماط'}` : `🤖 Core Concept: ${lesson.descriptionEn || 'Understanding pattern hunting and foundational generative models'}`,
      isRtl ? '📐 قاعدة الحوار الذهبي (3C): السياق (Context) + التوضيح (Clarification) + القيود (Constraints)' : '📐 The 3C Prompt Rule: Context + Clarification + Constraints',
      isRtl ? '🛡️ التفكير النقدي والأخلاقيات: الآلة تتنبأ بالأنماط ولا تملك الوعي البشري، دورك هو التوجيه الحكيم' : '🛡️ Critical Thinking: The model predicts tokens statistically; human wisdom guides the outcome'
    ];

    const voiceExplanation = isRtl
      ? `أهلاً بك يا بطل في البرنامج التأسيسي للذكاء الاصطناعي! درسنا اليوم: ${lesson.titleAr}. الذكاء الاصطناعي ليس سحراً غامضاً، بل هو صياد أنماط مذهل يتغذى على البيانات. وضعت لك خريطة الدرس والمفاهيم على السبورة، تعال نستكشفها معاً خطوة بخطوة! 🤖✨`
      : `Welcome champion to the Foundational AI Literacy Program! Today we explore: ${lesson.titleEn}. AI is an extraordinary pattern hunter powered by data. Check the concepts and activities on our smart whiteboard! 🤖✨`;

    return {
      boardData: {
        title,
        sentence,
        highlight: 'AI Pattern Hunter & Generative Models',
        formula: isRtl ? 'الذكاء الاصطناعي = بيانات ضخمة + خوارزميات أنماط + هندسة أوامر واعية' : 'AI = Big Data + Neural Patterns + Conscious Prompting',
        notes,
        quiz: {
          question: isRtl ? 'ما هو المحرك الأساسي الذي يعتمد عليه الذكاء الاصطناعي التوليدي في صياغة إجاباته؟' : 'What is the primary engine generative AI relies on to construct responses?',
          options: [
            isRtl ? 'صيد الأنماط الإحصائية والتنبؤ بالكلمات التالية بدقة' : 'Statistical pattern recognition and predicting likely tokens',
            isRtl ? 'حفظ الإنترنت كاملاً عن ظهر قلب كلمة بكلمة' : 'Memorizing the entire internet word-for-word',
            isRtl ? 'التفكير والشعور البشري المستقل' : 'Conscious emotional human thinking'
          ],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'البرنامج التأسيسي للذكاء الاصطناعي 🤖' : 'Foundational AI Program 🤖',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🤖 **البرنامج التأسيسي للذكاء الاصطناعي: ${lesson.titleAr}**\n\nكتبت لك خريطة المفهوم وقاعدة الحوار الذهبي على السبورة الذكية 📐. استمع لشرحي ولنبدأ التطبيق!`
        : `🤖 **Selected Foundational AI Lesson: ${lesson.titleEn}**\n\nI have structured the core pattern principles and guidelines on the whiteboard 📐!`
    };
  }

  // 17. ADVANCED SPECIALIZED AI TRACKS (المسارات التخصصية للذكاء الاصطناعي)
  if (lesson.pillarId === 'ai_specialized') {
    const title = isRtl
      ? `المسار التخصصي للذكاء الاصطناعي: ${lesson.titleAr}`
      : `Specialized AI Track: ${lesson.titleEn}`;

    const sentence = 'Deep architectures, neural embeddings, and autonomous workflows power modern AI solutions.';
    const notes = [
      isRtl ? `⚡ التخصص المتقدم: ${lesson.courseLabelAr}` : `⚡ Specialized Domain: ${lesson.courseLabelEn}`,
      isRtl ? `🔬 التحليل التطبيقي: ${lesson.descriptionAr}` : `🔬 Applied Analysis: ${lesson.descriptionEn}`,
      isRtl ? '🛠️ المعمارية والإنتاج: ضبط الأوزان، دوال التنشيط، وأتمتة مسارات العمل البرمجية' : '🛠️ Production Architecture: Weights, activation thresholds, and autonomous pipelines'
    ];

    const voiceExplanation = isRtl
      ? `مرحباً بك في المسارات التخصصية المتقدمة للذكاء الاصطناعي! جلستنا اليوم حول: ${lesson.titleAr}. هذا المسار ينقلك من مجرد مستخدم للأدوات إلى مهندس فاهم للمعماريات العميقة وتدفقات العمل المؤتمتة. انظر للسبورة لنحلل المكونات معاً! ⚡`
      : `Welcome to the Advanced Specialized AI Tracks! Today we master: ${lesson.titleEn}. This track elevates you into production-ready architectures and automation. Let's inspect the technical breakdown on the board! ⚡`;

    return {
      boardData: {
        title,
        sentence,
        highlight: 'Specialized Neural Architecture & Automation',
        formula: isRtl ? 'المسار التخصصي = نماذج عميقة + معالجة اللغات والرؤية + وكلاء أذكياء' : 'Specialized AI = Deep Architecture + NLP/Vision + Autonomous Agents',
        notes,
        quiz: {
          question: isRtl ? 'ما فائدة دوال التنشيط (Activation Functions) والأوزان في الشبكات العصبية؟' : 'What is the role of activation functions and weights in neural networks?',
          options: [
            isRtl ? 'تمكين الشبكة من تعلم العلاقات غير الخطية المعقدة وتعديل قوة الإشارات' : 'Enabling the network to learn non-linear patterns and adjust signal weights',
            isRtl ? 'حذف البيانات تلقائياً دون معالجة' : 'Deleting data without processing',
            isRtl ? 'إيقاف تشغيل الخوارزمية فوراً' : 'Immediately halting execution'
          ],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'المسارات التخصصية للذكاء الاصطناعي ⚡' : 'Advanced Specialized AI Tracks ⚡',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `⚡ **المسار التخصصي المتقدم: ${lesson.titleAr}**\n\nأعددت لك التحليل الفني والنمذجة الرياضية على السبورة 📐. استمع للشرح المتقدم وانطلق بالتطبيق!`
        : `⚡ **Specialized AI Track: ${lesson.titleEn}**\n\nI have detailed the architectural blueprint and core mechanics on the whiteboard 📐!`
    };
  }

  // 18. PROMPT ENGINEERING PROFESSIONAL ACADEMY (أكاديمية احترافية المطالبات)
  if (lesson.pillarId === 'ai_prompt_pro') {
    const title = isRtl
      ? `احترافية المطالبات: ${lesson.titleAr}`
      : `Prompt Engineering Pro: ${lesson.titleEn}`;

    const sentence = 'A Mega-Prompt harmonizes Persona, Context, Detailed Constraints, and Structured Output.';
    const notes = [
      isRtl ? `🏆 المستوى الاحترافي: ${lesson.courseLabelAr}` : `🏆 Professional Level: ${lesson.courseLabelEn}`,
      isRtl ? '🎯 هيكل المطالبة الضخمة (Mega-Prompt): الدور المستهدف + السياق المحدد + التعليمات الصريحة + القيود + هيكل المخرج' : '🎯 Mega-Prompt Anatomy: Role + Context + Step-by-Step Task + Negative Constraints + Output Schema',
      isRtl ? '🛡️ أمان المطالبات (Security): حماية سياق النظام، منع تسريب الأوامر، ومكافحة هجمات الجيلبريك وحقن المطالبة' : '🛡️ Prompt Defense: System prompt isolation, leak prevention, and jailbreak guardrails'
    ];

    const voiceExplanation = isRtl
      ? `أهلاً بك في أكاديمية احترافية المطالبات! محاضرتنا المتقدمة اليوم: ${lesson.titleAr}. هندسة الأوامر ليست مجرد كتابة أسئلة عادية، بل هي لغة توجيه وبرمجة الأنظمة الذكية باللغة الطبيعية. انظر لهيكل الـ Mega-Prompt على السبورة! 🏆`
      : `Welcome to the Prompt Engineering Professional Academy! Today our masterclass is: ${lesson.titleEn}. Prompting is precision natural language programming. Check the Mega-Prompt architecture and guardrails on our board! 🏆`;

    return {
      boardData: {
        title,
        sentence,
        highlight: 'Mega-Prompting, CoT & Security Guardrails',
        formula: isRtl ? 'المطالبة الاحترافية = الدور + السياق المقيد + التفكير المتسلسل + هيكل المخرج + حواجز الأمان' : 'Mega-Prompt = Role + Context + CoT Reasoning + Output Schema + Guardrails',
        notes,
        quiz: {
          question: isRtl ? 'ما هي الركيزة الأهم لمنع هلوسة النموذج والحصول على مخرجات دقيقة للغاية؟' : 'What is the most effective technique to reduce hallucinations and ensure precision?',
          options: [
            isRtl ? 'تحديد قيود صارمة (Constraints) وطلب التفكير خطوة بخطوة وتنسيق محدد' : 'Setting strict constraints, chain-of-thought instructions, and schema definitions',
            isRtl ? 'كتابة كلمة واحدة وترك النموذج يخمن الباقي' : 'Writing a single vague word and letting the model guess',
            isRtl ? 'تكرار نفس الجملة 100 مرة' : 'Repeating the exact same phrase 100 times'
          ],
          answerIndex: 0
        },
        voiceExplanation,
        teacherNote: isRtl ? 'أكاديمية احترافية المطالبات 🏆' : 'Prompt Engineering Pro Academy 🏆',
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `🏆 **أكاديمية احترافية المطالبات: ${lesson.titleAr}**\n\nكتبت لك معمارية الأوامر الاحترافية وأطر الحماية على السبورة 📐. استمع للشرح وطبق الصياغة فوراً!`
        : `🏆 **Prompt Engineering Pro: ${lesson.titleEn}**\n\nI have outlined the advanced prompt anatomy and reasoning triggers on the whiteboard 📐!`
    };
  }

  // 19. PROFESSIONAL & PERSONAL DEVELOPMENT COURSES (الدورات التطويرية والمهنية وبناء القيادة)
  if (lesson.pillarId === 'professional_dev') {
    const { book, chapter, microLesson } = resolveBookChapterAndMicroLesson(lesson);

    const bookShortAr = book?.titleAr?.includes(':') ? book.titleAr.split(':')[0] : (book?.titleAr || 'الدورات التطويرية');
    const bookShortEn = book?.titleEn?.includes(':') ? book.titleEn.split(':')[0] : (book?.titleEn || 'Executive Development');

    const chapterTitleAr = chapter?.titleAr || lesson.titleAr;
    const chapterTitleEn = chapter?.titleEn || lesson.titleEn;

    const title = isRtl
      ? `دورة تطويرية: كتاب "${bookShortAr}" - ${chapterTitleAr}`
      : `Executive Course: "${bookShortEn}" - ${chapterTitleEn}`;

    const quoteEn = microLesson?.contentEn?.slice(0, 160) || chapter?.descriptionEn || 'True leadership and mastery are built through consistent habits and disciplined systems.';
    const quoteAr = microLesson?.contentAr?.slice(0, 160) || chapter?.descriptionAr || 'القيادة الحقيقية والتميز يصنعان من خلال أنظمة تفكير وعادات يومية واعية.';

    const notes = [
      isRtl ? `📚 الكتاب والمرجع المعتمد: "${book?.titleAr}" (${book?.authorAr})` : `📚 Core Reference: "${book?.titleEn}" by ${book?.authorEn}`,
      isRtl ? `💡 المبدأ القيادي والفكري: ${chapter?.descriptionAr || quoteAr}` : `💡 Strategic Principle: ${chapter?.descriptionEn || quoteEn}`,
      isRtl ? `🎯 التطبيق العملي واللغوي: تحويل المفهوم إلى ممارسة يومية وصياغته بطلاقة بالإنجليزية` : `🎯 Actionable Application: Converting mindset shifts into daily measurable habits and English articulation`
    ];

    const rawQuiz = chapter?.quiz?.[0];
    const quizObj = rawQuiz ? {
      question: isRtl ? rawQuiz.questionAr : (rawQuiz.questionEn || rawQuiz.questionAr),
      options: isRtl 
        ? (rawQuiz.optionsAr || ['الخيار الصحيح', 'خيار غير صحيح', 'خيار آخر']) 
        : ((rawQuiz.optionsEn && rawQuiz.optionsEn.length > 0) ? rawQuiz.optionsEn : (rawQuiz.optionsAr || ['Correct Option', 'Incorrect', 'Other'])),
      answerIndex: typeof rawQuiz.correctIndex === 'number' ? rawQuiz.correctIndex : 0,
      explanation: isRtl ? rawQuiz.explanationAr : (rawQuiz.explanationEn || rawQuiz.explanationAr)
    } : {
      question: isRtl ? `ما هو المبدأ الأساسي لبناء العادات القوية والنجاح المستدام في "${chapterTitleAr}"؟` : `What is the primary principle behind sustained success in "${chapterTitleEn}"?`,
      options: [
        isRtl ? 'التركيز على نظام يومي متدرج وتراكم التحسينات المستمرة' : 'Focusing on daily disciplined systems and continuous compounding growth',
        isRtl ? 'الاعتماد على الحماس المؤقت فقط دون خطة' : 'Relying exclusively on fleeting motivation without a system',
        isRtl ? 'الاستسلام عند أول تحدٍ أو صعوبة' : 'Giving up at the first sign of difficulty'
      ],
      answerIndex: 0
    };

    const voiceExplanation = isRtl
      ? `مرحباً بك في مسار الدورات التطويرية وبناء المهارات القيادية! اليوم نتعلم من أمهات الكتب: كتاب "${book?.titleAr}" للمؤلف الرائع ${book?.authorAr}. فصلنا اليوم بعنوان: ${chapterTitleAr}. المبدأ الجوهري: "${chapter?.descriptionAr || quoteAr}". تأمل معي الاقتباس الإنجليزي وخطة التطبيق على السبورة الذكية، ودعنا نناقشه ونربطه باللغة الإنجليزية وحياتك العملية! 📚🌟`
      : `Welcome to our Executive & Personal Development masterclass! Today we learn from "${book?.titleEn}" by ${book?.authorEn}. Our session covers: "${chapterTitleEn}". Strategic principle: "${chapter?.descriptionEn || quoteEn}". Let's inspect the principles on our smart whiteboard! 📚🌟`;

    return {
      boardData: {
        title,
        sentence: quoteEn,
        highlight: chapterTitleEn || 'Executive Habits & Leadership',
        formula: isRtl ? `📚 كتاب: "${bookShortAr}" | المؤلف: ${book?.authorAr} | ${chapterTitleAr}` : `Executive Curriculum: "${bookShortEn}" by ${book?.authorEn}`,
        notes,
        quiz: quizObj,
        voiceExplanation,
        teacherNote: isRtl ? `الدورات التطويرية وبناء المهارات | كتاب "${bookShortAr}"` : `Professional Development & Leadership | "${bookShortEn}"`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `📚 **دورة تطويرية: كتاب "${book?.titleAr}"**\n✍️ **المؤلف:** ${book?.authorAr}\n\n📌 **${chapterTitleAr}**\n\n💡 **المبدأ الجوهري:** ${chapter?.descriptionAr || quoteAr}\n\n📝 **خلاصة الدرس:** ${microLesson?.contentAr || book?.descriptionAr}\n\nكتبت لك المبدأ وخطة التطبيق والتدريب اللغوي على السبورة الذكية 📐. استمع للشرح ودعنا نناقشه!`
        : `📚 **Executive Development Course: "${book?.titleEn}"**\n✍️ **Author:** ${book?.authorEn}\n\n📌 **${chapterTitleEn}**\n\n💡 **Strategic Principle:** ${chapter?.descriptionEn || quoteEn}\n\nI have highlighted the actionable habits and leadership frameworks on the whiteboard 📐!`
    };
  }
  const title = isRtl
    ? `منهج الأكاديمية: ${lesson.titleAr}`
    : `Academy Curriculum: ${lesson.titleEn}`;

  const sentence = `Mastering ${lesson.titleEn} opens up new horizons in your English fluency.`;
  const voiceExplanation = isRtl
    ? `أهلاً بك في منهج الأكاديمية! درسنا اليوم هو: ${lesson.titleAr}. جهزت لك الشرح المتكامل والأمثلة التوضيحية على السبورة الذكية، تعال نستعرضها سوياً خطوة بخطوة! 🌸`
    : `Welcome to the Academy Curriculum! Today we are studying: ${lesson.titleEn}. I have prepared the full explanation and examples on the smart whiteboard. Let us dive in! 🌸`;

  return {
    boardData: {
      title,
      sentence,
      highlight: lesson.titleEn,
      formula: isRtl ? `المستوى: ${level} | القسم: ${lesson.courseLabelAr}` : `Level: ${level} | Department: ${lesson.courseLabelEn}`,
      notes: [
        isRtl ? `🎯 الهدف الأكاديمي: ${lesson.descriptionAr || 'إتقان المفاهيم اللغوية وتطبيقها في السياق اليومي'}` : `🎯 Goal: ${lesson.descriptionEn || 'Master foundational linguistic concepts'}`,
        isRtl ? `⏱️ المدة التقديرية للحصة: ${lesson.duration}` : `⏱️ Estimated Duration: ${lesson.duration}`,
        isRtl ? '💡 استمع للشرح الصوتي واطرح أي سؤال على سارة' : '💡 Listen to the audio walkthrough and ask Sara any question'
      ],
      quiz: {
        question: isRtl ? `ما هو الهدف الأساسي من دراسة درس: "${lesson.titleAr}"؟` : `What is the primary target of: "${lesson.titleEn}"?`,
        options: [
          isRtl ? 'بناء الطلاقة والاستخدام السليم' : 'Building fluency and precision',
          isRtl ? 'الحفظ دون فهم' : 'Rote memorization',
          isRtl ? 'تجاهل القواعد' : 'Ignoring grammar'
        ],
        answerIndex: 0
      },
      voiceExplanation,
      teacherNote: isRtl ? `منهاج أكاديمية باسم الخليل | ${lesson.level}` : `Basim Alkhalil Curriculum | ${lesson.level}`,
      openWhiteboard: true
    },
    spokenIntro: voiceExplanation,
    chatMessage: isRtl
      ? `📚 **اخترت المنهج التعليمي: ${lesson.titleAr} (${level})**\n\nأعددت لك لوحة الشرح والتطبيق على السبورة الذكية 📐. استمع لشرحي واستمتع برحلة التعلم!`
      : `📚 **Selected Curriculum Lesson: ${lesson.titleEn} (${level})**\n\nI have arranged the lesson concepts and interactive quiz on the smart whiteboard 📐. Let us begin!`
  };
}

/**
 * Public function: Builds rich pedagogical explanation with randomized quiz positions
 * and a limited 5-question timed lesson quiz set.
 */
export function buildSaraCurriculumExplanation(
  lesson: CurriculumLesson,
  lang: 'ar' | 'en' = 'ar'
): {
  boardData: SaraBoardData;
  spokenIntro: string;
  chatMessage: string;
} {
  const result = buildSaraCurriculumExplanationInternal(lesson, lang);
  const isRtl = lang === 'ar';

  if (result.boardData.quizzes && result.boardData.quizzes.length >= 3) {
    const total = Math.min(5, result.boardData.quizzes.length);
    result.boardData.quizzes = result.boardData.quizzes.slice(0, 5).map((q, idx) => {
      const sq = shuffleQuiz(q, true);
      sq.questionNumber = idx + 1;
      sq.totalQuestions = total;
      sq.timeLimitSeconds = 30;
      return sq;
    });
  } else {
    result.boardData.quizzes = buildLimitedLessonQuizSet(
      lesson.titleAr || lesson.titleEn || result.boardData.title || 'Lesson',
      result.boardData.sentence,
      result.boardData.formula,
      result.boardData.quiz,
      isRtl
    );
  }

  // Ensure primary quiz is always populated from quizzes[0]
  if (!result.boardData.quiz && result.boardData.quizzes && result.boardData.quizzes.length > 0) {
    result.boardData.quiz = result.boardData.quizzes[0];
  } else if (result.boardData.quiz) {
    result.boardData.quiz = shuffleQuiz(result.boardData.quiz, true);
    result.boardData.quiz.questionNumber = 1;
    result.boardData.quiz.totalQuestions = 5;
    result.boardData.quiz.timeLimitSeconds = 30;
  }

  return result;
}

