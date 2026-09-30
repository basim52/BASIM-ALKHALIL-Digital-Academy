import { CurriculumLesson } from './academicCurriculumCatalogue';
import { SaraBoardData } from '../types';
import { ALL_GRAMMAR_UNITS } from '../components/GrammarCurriculumCompanion';
import { ALL_READING_UNITS } from '../components/ReadingCurriculumCompanion';
import { ALL_CONVERSATION_UNITS } from '../components/ConversationCurriculumCompanion';
import { ALL_WRITING_UNITS } from '../components/WritingCurriculumCompanion';
import { ALL_EXPRESSION_UNITS } from '../components/ExpressionCurriculumCompanion';
import { OXFORD_LESSONS } from '../data/oxfordLessonsData';
import { ADULTS_DAILY_DOSES } from '../data/adultsDailyDose';
import { ADULTS_DAILY_DOSES_EXTRA } from '../data/adultsDailyDose_extra';
import { PRONUNCIATION_LAB_DATA, ENGLISH_WITH_SONGS_DATA, ESCAPE_ROOM_PUZZLES_DATA, ROLE_PLAY_CHALLENGES_DATA, VISUAL_DICTIONARY_DATA, FAMILY_GAMES_DATA, COOKING_CHALLENGES_DATA } from '../data/interactiveCurriculum';
import { COURSES } from '../data/courses';
import { PRODUCED_VIDEO_LESSONS } from '../data/producedVideoLessons';
import { STORIES } from '../components/StoryLibrary';
import { KIDS_STORIES } from '../data/kidsStories';
import { KIDS_STORIES_EXTRA } from '../data/kidsStories_extra';
import { LANGUAGE_LAB_DATA } from '../data/languageLabData';

/**
 * Builds rich, pedagogical Sara Whiteboard data and spoken audio script for any Academy Curriculum Lesson.
 */
export function buildSaraCurriculumExplanation(
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

    const title = isRtl
      ? `منهج القواعد (${level}): ${lesson.titleAr}`
      : `Grammar Academy (${level}): ${lesson.titleEn}`;

    const mainExample = unit?.examples?.[0];
    const sentence = mainExample ? mainExample.en : 'She studies English diligently every day.';
    const formula = unit?.rules?.[0]
      ? `${unit.rules[0].titleEn}: ${unit.rules[0].contentEn}`
      : 'Subject + Auxiliary / Modal + Verb + Complement';

    const notes = unit?.rules
      ? unit.rules.map((r: any) => isRtl ? `📌 ${r.titleAr}: ${r.contentAr}` : `📌 ${r.titleEn}: ${r.contentEn}`)
      : [
          isRtl ? `شرح القاعدة: ${unit?.explanationAr || lesson.descriptionAr}` : `Rule explanation: ${unit?.explanationEn || lesson.descriptionEn}`,
          isRtl ? `مثال: ${sentence}` : `Example: ${sentence}`,
          isRtl ? 'التطبيق العملي: استخدم هذه الصيغة في التحدث اليومي' : 'Usage: Apply this structure in daily conversation'
        ];

    const quiz = unit?.quiz?.[0]
      ? {
          question: isRtl ? unit.quiz[0].questionAr : unit.quiz[0].questionEn,
          options: unit.quiz[0].options,
          answerIndex: unit.quiz[0].correctIndex ?? 0
        }
      : {
          question: isRtl ? `اختر الصيغة الصحيحة لقاعدة: ${lesson.titleAr}` : `Choose the correct form for: ${lesson.titleEn}`,
          options: [sentence, 'He study English yesterday', 'They was studying now'],
          answerIndex: 0
        };

    const voiceExplanation = isRtl
      ? `أهلاً بك يا بطل في أكاديمية القواعد! اليوم نشرح معاً درس: ${lesson.titleAr}. ${unit?.explanationAr || 'هذه القاعدة أساسية لبناء الجمل بالإنجليزية بشكل صحيح'}. لاحظ معي المثال على السبورة: "${sentence}". جهزت لك تمرين سريع لنختبر فهمك!`
      : `Welcome to the Grammar Academy! Today we are mastering: ${lesson.titleEn}. ${unit?.explanationEn || 'This structure is essential for clear communication'}. Look at our example on the board: "${sentence}". Let us practice!`;

    const chatMessage = isRtl
      ? `📚 **اخترت منهج القواعد: ${lesson.titleAr} (${level})**\n\nكتبت لك القاعدة والأمثلة والشرح بالطبشور على السبورة الذكية 📐، واستمع لشرحي الصوتي يا بطل!`
      : `📚 **Selected Grammar Module: ${lesson.titleEn} (${level})**\n\nI have outlined the formula, sentence models, and quick quiz on the smart whiteboard 📐. Listen to my spoken walkthrough!`;

    return {
      boardData: {
        title,
        sentence,
        formula,
        highlight: mainExample?.en?.split(' ')?.[0] || 'Grammar Rule',
        notes: notes.slice(0, 4),
        quiz,
        voiceExplanation,
        teacherNote: isRtl ? `المستوى المستهدف: ${level} | المدة: ${lesson.duration}` : `Target: ${level} | Duration: ${lesson.duration}`,
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

    const notes = [
      isRtl ? `📖 الفكرة المركزية: ${unit?.descriptionAr || lesson.descriptionAr}` : `📖 Main Idea: ${unit?.descriptionEn || lesson.descriptionEn}`,
      isRtl ? `🔤 أهم المفردات: ${vocabList}` : `🔤 Key Words: ${vocabList}`,
      isRtl ? `💡 المعنى باللغة العربية: ${unit?.readingTextAr || 'استوعب سياق الجملة وتدرب على قراءتها بصوت جهوري'}` : `💡 Target: Practice smooth phrasing and intonation`,
    ];

    const voiceExplanation = isRtl
      ? `مرحباً بك في مختبر القراءة والفهم! درسنا اليوم هو: ${lesson.titleAr}. استمع جيداً لقراءة النص على السبورة: "${sentence}". التركيز على مخارج الحروف والربط بين الكلمات هو سر الطلاقة الحقيقية!`
      : `Welcome to the Reading Lab! Today we explore: ${lesson.titleEn}. Listen closely to our key passage on the whiteboard: "${sentence}". Focusing on cadence and rhythm will build your natural fluency!`;

    return {
      boardData: {
        title,
        sentence,
        highlight: unit?.cards?.[0]?.en || 'Reading Comprehension',
        formula: isRtl ? 'مهارة: القراءة الصامتة ثم الجهرية والتحليل' : 'Skill: Phrasing, Rhythm & Comprehension',
        notes,
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

    return {
      boardData: {
        title,
        sentence: mainPhrase,
        highlight: mainPhrase.split(' ').slice(0, 3).join(' '),
        formula: isRtl ? 'نمط المحادثة: استماع فعال + رد لبق وسريع' : 'Pattern: Active Listening + Diplomatic Response',
        notes,
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

  // 10. BESTSELLER BOOK COURSES & SELF-DEVELOPMENT
  if (lesson.pillarId === 'book_courses') {
    const book = COURSES.find(b => b.id === lesson.courseId) || COURSES[0];
    let foundLesson: any = null;
    let foundChapter: any = null;

    if (book && book.chapters) {
      for (const ch of book.chapters) {
        for (const les of ch.lessons) {
          if (`${book.id}__${les.id}` === lesson.id || les.id === lesson.id) {
            foundLesson = les;
            foundChapter = ch;
            break;
          }
        }
        if (foundLesson) break;
      }
    }

    const bookShortAr = book?.titleAr?.includes(':') ? book.titleAr.split(':')[0] : (book?.titleAr || 'الكتب العالمية');
    const bookShortEn = book?.titleEn?.includes(':') ? book.titleEn.split(':')[0] : (book?.titleEn || 'Bestseller Books');

    const title = isRtl
      ? `كتاب ${bookShortAr}: ${lesson.titleAr}`
      : `${bookShortEn}: ${lesson.titleEn}`;

    const quoteEn = foundLesson?.contentEn?.slice(0, 160) || 'Small habits compound daily into massive life transformations.';
    const quoteAr = foundLesson?.contentAr?.slice(0, 160) || 'العادات والأنظمة اليومية تصنع الفارق الحقيقي في الإتقان والطلاقة.';

    const notes = [
      isRtl ? `📖 كتاب: "${book?.titleAr}" (${book?.authorAr})` : `📖 Book: "${book?.titleEn}" by ${book?.authorEn}`,
      isRtl ? `💡 المبدأ المركزي: ${quoteAr}` : `💡 Core Principle: ${quoteEn}`,
      isRtl ? `🎯 الربط باللغة: استخدم هذه الأفكار والمصطلحات في حديثك اليومي بالإنجليزية` : `🎯 Language Link: Practice articulating this philosophical mindset in English`
    ];

    const quizObj = foundChapter?.quiz?.[0] ? {
      question: isRtl ? foundChapter.quiz[0].questionAr : (foundChapter.quiz[0].questionEn || foundChapter.quiz[0].questionAr),
      options: isRtl ? (foundChapter.quiz[0].optionsAr || ['الخيار الصحيح', 'خيار غير صحيح', 'خيار آخر']) : (foundChapter.quiz[0].optionsAr || ['Correct Option', 'Incorrect', 'Other']),
      answerIndex: 0
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
      ? `مرحباً بك في رحاب الكتب العالمية الملهمة! اليوم سنشرح معاً درساً رائعاً من كتاب "${bookShortAr}" للمؤلف ${book?.authorAr || ''}. الدرس بعنوان: ${lesson.titleAr}. تأمل معي هذا المبدأ الذهبي على السبورة: "${quoteAr}". تعال نناقشه ونربطه باللغة الإنجليزية!`
      : `Welcome to our Bestselling Books Masterclass! Today we explore a lesson from "${bookShortEn}" by ${book?.authorEn}: "${lesson.titleEn}". Notice the powerful insight on our whiteboard: "${quoteEn}". Let us discuss it!`;

    return {
      boardData: {
        title,
        sentence: quoteEn,
        highlight: bookShortEn,
        formula: isRtl ? `منهج الكتب العالمية: ${bookShortAr} (${book?.authorAr})` : `Bestseller Curriculum: ${bookShortEn}`,
        notes,
        quiz: quizObj,
        voiceExplanation,
        teacherNote: isRtl ? `منهج الكتب العالمية وتطوير الذات | مستوى B2` : `Bestseller Books Academy | Level B2`,
        openWhiteboard: true
      },
      spokenIntro: voiceExplanation,
      chatMessage: isRtl
        ? `📚 **اخترت منهج الكتب العالمية: ${lesson.titleAr} (${bookShortAr})**\n\nوضعت لك ملخص المبدأ، الحكمة وسؤال التفكير على السبورة الذكية 📐. استمع لشرحي الصوتي وسأساعدك في استيعابه كاملاً!`
        : `📚 **Selected Bestseller Book Lesson: ${lesson.titleEn}**\n\nI have prepared the core philosophy, vocabulary, and quick quiz on the smart whiteboard 📐!`
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

    const sampleText = story?.textEn?.slice(0, 160) || 'Noor arrived in London, eager to explore the city and meet new friends.';
    const sampleTextAr = story?.textAr?.slice(0, 160) || 'وصلت نور إلى لندن مفعمة بالشغف لاستكشاف المدينة ومقابلة أصدقاء جدد.';

    const notes = [
      isRtl ? `🎧 عنوان القصة: ${story?.titleAr}` : `🎧 Story Title: ${story?.titleEn}`,
      isRtl ? `📖 أحداث القصة: ${sampleTextAr}` : `📖 Story Arc: ${sampleText}`,
      isRtl ? `🌟 مهارة الاستماع: استمع للصوت وركز على مخارج الكلمات وتسلسل الأحداث` : `🌟 Listening Skill: Focus on word phrasing and chronological narrative`
    ];

    const quizObj = story?.quiz?.[0] ? {
      question: isRtl ? story.quiz[0].questionAr : story.quiz[0].questionEn,
      options: isRtl ? story.quiz[0].optionsAr : story.quiz[0].optionsEn,
      answerIndex: story.quiz[0].correctIndex
    } : {
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
    const allKidsStories = [...KIDS_STORIES, ...KIDS_STORIES_EXTRA];
    const kStory = allKidsStories.find(s => s.lesson_id === lesson.id) || allKidsStories[0];

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

  // 10. DEFAULT / GENERAL LESSON EXPLANATION
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
