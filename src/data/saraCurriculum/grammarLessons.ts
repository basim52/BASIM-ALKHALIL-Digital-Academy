import { SaraCurriculumLesson } from './types';

export const SARA_SPOKEN_GRAMMAR_LESSONS: SaraCurriculumLesson[] = [
  // ==========================================
  // STARTER LEVEL (A1-A2) - Lessons 1 to 10
  // ==========================================
  {
    id: 'sg_101',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب التعبير عن النوايا والقرارات الفورية (Gonna vs Will)',
    titleEn: 'Instant Intentions: Gonna vs Will for Fast Talk',
    descAr: 'كيف تتحدث عن خططك المستقبلية وقراراتك العفوية بطلاقة مثل المتحدثين الأصليين دون توقف للتفكير.',
    descEn: 'Master spontaneous decisions vs planned intentions in fast spoken English.',
    speakingGoalAr: 'التحدث عن خططك لليوم والغد بطلاقة خلال 30 ثانية باستخدام gonna دون ترجمة ذهنية.',
    speakingGoalEn: 'Express your immediate and future plans naturally using spoken reductions.',
    keyPattern: {
      ruleAr: 'في التحدث السريع نستخدم "gonna" للخطط المسبقة، ونستخدم "I\'ll" للقرار الفوري المتخذ في لحظة الكلام.',
      ruleEn: 'Use "I\'m gonna + base verb" for planned intentions, and "I\'ll + verb" for snap decisions.',
      formula: "Plan: I'm gonna + [Verb] | Snap: I'll + [Verb]"
    },
    practicalExamples: [
      {
        en: "I'm gonna grab some coffee, do you want anything?",
        ar: 'أنا رايح أجيب قهوة، ودك شي؟',
        spokenNoteAr: 'تنطق gonna ككلمة واحدة سلسة بدلاً من going to.'
      },
      {
        en: "Don't worry, I'll take care of it right away.",
        ar: 'لا تقلق، أنا سأهتم بالأمر فوراً.',
        spokenNoteAr: "قرار فوري، لذا نستخدم I'll وليس gonna."
      },
      {
        en: "We're gonna head out in five minutes.",
        ar: 'بنطلع بعد خمس دقائق.',
        spokenNoteAr: 'head out تعبير تحدثي شهير يعني نغادر أو نتحرك.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I am going to will call you.",
        correct: "I'll call you / I'm gonna call you.",
        whyAr: 'لا يجوز الجمع بين will و going to في جملة واحدة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أخبر سارة بخطة واحدة تنوي القيام بها الليلة، وقرار فوري ستفعله الآن!',
      promptEn: 'Tell Sara one thing you are gonna do tonight and one snap decision using I will!',
      saraQuestionAr: 'Hey! What are you gonna do after this session?',
      saraQuestionEn: 'Hey! What are you gonna do after this session?',
      recommendedResponseEn: "I'm gonna practice speaking with you, and then I'll relax!"
    },
    quiz: [
      {
        questionAr: 'الهاتف يرن الآن! كيف ترد بقرار فوري وسريع؟',
        questionEn: 'The phone is ringing right now! How do you reply instantly?',
        options: [
          "I'm gonna answer it tomorrow.",
          "I'll get it!",
          "I was answer it.",
          "I am answer."
        ],
        correctIndex: 1,
        explanationAr: 'للقرارات اللحظية الفورية نستخدم دائماً صيغة I\'ll get it!'
      }
    ],
    whiteboardNotes: {
      title: 'Speaking Rule: Gonna vs Will',
      pointsAr: [
        'للتحدث اليومي: I am going to ⬅️ تختصر إلى I\'m gonna',
        'للقرار اللحظي المفاجئ: نستخدم I\'ll فقط',
        'تدريب اللسان: كرر ثلاث مرات: "I\'m gonna do it!"'
      ],
      pointsEn: [
        'Spoken reduction: going to ➡️ gonna',
        'Snap decision right now ➡️ I\'ll [Verb]',
        'Pronunciation flow: keep your jaw relaxed!'
      ],
      chalkHighlight: "I'm gonna [Do] VS I'll [Do it now!]"
    }
  },
  {
    id: 'sg_104',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قوالب الرغبة والإلزام السريع (Wanna & Gotta)',
    titleEn: 'Natural Spoken Reductions: Wanna & Gotta',
    descAr: 'كيف تعبر عن رغباتك اليومية والأشياء التي يجب عليك فعلها فوراً بالصوت الإنجليزي الانسيابي.',
    descEn: 'Communicate everyday desires and obligations without robotic pauses.',
    speakingGoalAr: 'التعبير عن رغبتك في شيء والتزامك بفعل آخر باستخدام Wanna و Gotta.',
    speakingGoalEn: 'Use "wanna" and "gotta" smoothly in spontaneous exchanges.',
    keyPattern: {
      ruleAr: '"want to" تتحول صوتياً إلى "wanna"، و "have got to" تتحول إلى "gotta".',
      ruleEn: 'Want to becomes "wanna"; (have) got to becomes "gotta".',
      formula: "I wanna + [Verb] | I gotta + [Verb]"
    },
    practicalExamples: [
      {
        en: "I gotta run now, catch you later!",
        ar: 'لازم أمشي الآن، ألقاك لاحقاً!',
        spokenNoteAr: 'gotta run تعبير يومي سريع يعني يجب أن أغادر فوراً.'
      },
      {
        en: "Do you wanna grab a bite to eat?",
        ar: 'ودك ناكل شي على السريع؟',
        spokenNoteAr: 'grab a bite تعبير عفوي لتناول وجبة خفيفة.'
      },
      {
        en: "I really wanna learn how to speak fast.",
        ar: 'ودي فعلاً أتعلم كيف أتكلم بسرعة وسلاسة.',
        spokenNoteAr: 'wanna تمنحك إيقاعاً ناعماً ومتصلاً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "He wanna go now.",
        correct: "He wants to go / He's gotta go.",
        whyAr: 'مع He/She/It لا نستخدم wanna بل wants to أو gotta.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أخبر سارة بشيء تريد فعله اليوم وشيء ملزم بإنجازه!',
      promptEn: 'Tell Sara one thing you wanna do and one thing you gotta finish today!',
      saraQuestionAr: 'What do you wanna do this weekend?',
      saraQuestionEn: 'What do you wanna do this weekend?',
      recommendedResponseEn: "I wanna hang out with my friends, but I gotta study first!"
    },
    quiz: [
      {
        questionAr: 'ما المعنى التحدثي الدقيق لجملة "I gotta go"؟',
        questionEn: 'What does "I gotta go" mean in spoken English?',
        options: [
          "I wanted to go yesterday.",
          "I have to leave right now.",
          "I will never go.",
          "I forgot to go."
        ],
        correctIndex: 1,
        explanationAr: 'gotta تعني "لازم / يجب عليّ الآن" وهي اختصار لـ have got to.'
      }
    ],
    whiteboardNotes: {
      title: 'Fast Speech: Wanna & Gotta',
      pointsAr: [
        'Want to ➡️ Wanna (أريد / ودّي)',
        'Have got to ➡️ Gotta (لازم / ينبغي)',
        'تذكر: لا تضع to بعد wanna أو gotta!'
      ],
      pointsEn: [
        'Want to ➡️ Wanna',
        'Have got to ➡️ Gotta',
        'Never say "wanna to" or "gotta to"!'
      ],
      chalkHighlight: 'I wanna [Verb] | I gotta [Verb]'
    }
  },
  {
    id: 'sg_105',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قوالب الاقتراح الذكي والودي (How about vs What about)',
    titleEn: 'Instant Suggestions: How about vs What about',
    descAr: 'كيف تقترح أفكاراً وتجارب ومواعيد بطريقة ودية تشجع الآخرين على الموافقة فوراً.',
    descEn: 'Propose ideas and activities enthusiastically without commanding.',
    speakingGoalAr: 'تقديم اقتراحين لسارة لقضاء وقت ممتع باستخدام How about + V-ing.',
    speakingGoalEn: 'Make natural suggestions using "How about + -ing".',
    keyPattern: {
      ruleAr: 'بعد How about نستخدم دائماً فعل ينتهي بـ -ing أو اسماً صريحاً.',
      ruleEn: 'Always follow "How about" with a gerund (verb-ing) or a noun.',
      formula: 'How about + [Verb-ing] / [Noun]?'
    },
    practicalExamples: [
      {
        en: "How about grabbing some pizza tonight?",
        ar: 'ما رأيك لو نجيب بيتزا الليلة؟',
        spokenNoteAr: 'تنطق How about بنبرة صاعدة تدل على الحماس.'
      },
      {
        en: "What about meeting at 6 PM instead?",
        ar: 'ماذا عن اللقاء عند الساعة 6 بدلاً من ذلك؟',
        spokenNoteAr: 'What about تستخدم غالباً لتعديل خيار أو لفت الانتباه لنقطة جديدة.'
      },
      {
        en: "How about a quick break?",
        ar: 'ما رأيك في استراحة قصيرة؟',
        spokenNoteAr: 'استخدام اسم مباشر بعد How about أسلوب عملي جداً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "How about we go eat?",
        correct: "How about going to eat? / Why don't we go eat?",
        whyAr: 'بعد How about نفضل verb-ing، أما بعد Why don\'t we فيأتي الفعل مجرداً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اقترح على سارة نشاطاً لممارسة الإنجليزية اليوم باستخدام How about!',
      promptEn: 'Suggest an English activity to Sara using "How about"!',
      saraQuestionAr: 'I have 15 minutes free. What should we do?',
      saraQuestionEn: 'I have 15 minutes free. What should we do?',
      recommendedResponseEn: "How about practicing a real-life coffee shop conversation?"
    },
    quiz: [
      {
        questionAr: 'اختر الصيغة الصحيحة بعد How about:',
        questionEn: 'Choose the correct form after "How about":',
        options: [
          "How about to watch a movie?",
          "How about watching a movie?",
          "How about watched a movie?",
          "How about we to watch a movie?"
        ],
        correctIndex: 1,
        explanationAr: 'يأتي بعد How about صيغة الـ gerund (فعل + ing): watching.'
      }
    ],
    whiteboardNotes: {
      title: 'Suggestion Formula',
      pointsAr: [
        'How about + [Verb-ing]? ➡️ ما رأيك لو...؟',
        'Why don\'t we + [Base Verb]? ➡️ لمَ لا نفعل...؟',
        'تدرّب: How about taking a walk?'
      ],
      pointsEn: [
        'How about + [Verb-ing]?',
        'Why don\'t we + [Base Verb]?',
        'Cadence: Upbeat, questioning tone'
      ],
      chalkHighlight: 'How about + [Verb-ing]?'
    }
  },
  {
    id: 'sg_106',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب العادات السابقة والحالية (Used to vs I\'m used to)',
    titleEn: 'Past Habits vs Current Comfort: Used to vs I\'m used to',
    descAr: 'تخلص من الخلط الشائع بين ما اعتدت فعله في الماضي وما أصبحت معتاداً عليه الآن.',
    descEn: 'Differentiate effortlessly between past routines and current familiarity.',
    speakingGoalAr: 'التحدث عن عادة ماضية تركتها وعادة حالية أصبحت مألوفة لديك.',
    speakingGoalEn: 'Contrast a discarded past habit with a current lifestyle norm.',
    keyPattern: {
      ruleAr: 'Used to + مصدر تعني اعتدت زمان وانتهى. أما be used to + ing فتعني أنا متعود ومألوف لدي الآن.',
      ruleEn: 'Used to + base verb = past routine; be used to + -ing = accustomed to now.',
      formula: "Past: I used to + [Verb] | Present: I'm used to + [Noun/Verb-ing]"
    },
    practicalExamples: [
      {
        en: "I used to stay up late, but now I wake up early.",
        ar: 'كنت معتاداً على السهر في الماضي، أما الآن فأستيقظ مبكراً.',
        spokenNoteAr: 'used to تنطق [yoo-stuh] دون نطق d منفصلة.'
      },
      {
        en: "I'm used to speaking English at work now.",
        ar: 'أنا متعود على التحدث بالإنجليزية في العمل الآن (أصبح الأمر طبيعياً لي).',
        spokenNoteAr: 'لاحظ إضافة ing بعد used to لأنها تعني التأقلم.'
      },
      {
        en: "Don't worry about the noise, I'm used to it.",
        ar: 'لا تقلق بشأن الضوضاء، أنا معتاد عليها.',
        spokenNoteAr: 'ممكن أن يتبعها اسم أو ضمير مباشر (it).'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I am used to wake up early every day.",
        correct: "I'm used to waking up early / I wake up early.",
        whyAr: 'إذا وضعت am قبل used to فيجب وضع ing للفعل اللاحق.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أخبر سارة بشيء كنت تفعله في طفولتك وتوقفت عنه باستخدام Used to!',
      promptEn: 'Tell Sara a childhood habit you stopped doing using "used to"!',
      saraQuestionAr: 'Did you have any fun habits when you were younger?',
      saraQuestionEn: 'Did you have any fun habits when you were younger?',
      recommendedResponseEn: "I used to play video games all night, but now I'm used to sleeping early!"
    },
    quiz: [
      {
        questionAr: 'ما معنى جملة "I used to drink soda"؟',
        questionEn: 'What does "I used to drink soda" imply?',
        options: [
          "I drink soda every day now.",
          "I drank soda in the past, but I don't anymore.",
          "I will drink soda tomorrow.",
          "I hate soda."
        ],
        correctIndex: 1,
        explanationAr: 'used to + فعل مجرد تدل على عادة ماضية انقطعت تماماً في الحاضر.'
      }
    ],
    whiteboardNotes: {
      title: 'Habit Mastery Rule',
      pointsAr: [
        'Used to + مصدر ⬅️ عادة قديمة توقفت',
        'Am/Is/Are used to + ing ⬅️ متأقلم ومعتاد حالياً',
        'نطق used to ⬅️ يوستو [yoostuh]'
      ],
      pointsEn: [
        'Used to + base verb = Discontinued habit',
        'Be used to + -ing = Accustomed and comfortable',
        'Phonetic pronunciation: "yoos-tuh"'
      ],
      chalkHighlight: 'I used to [Verb] 🆚 I\'m used to [Verb-ing]'
    }
  },
  {
    id: 'sg_107',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب الموافقة والتطابق السريع (So do I / Neither do I)',
    titleEn: 'Instant Agreement: So do I vs Neither do I',
    descAr: 'كيف توافق المتحدث وتؤكد أنك مثله تماماً في الإيجاب والسلب دون تكرار "Me too" طوال الوقت.',
    descEn: 'Agree dynamically in positive and negative conversations like a native.',
    speakingGoalAr: 'الرد على جملتين إحداهما مثبتة والأخرى منفية باستخدام So / Neither.',
    speakingGoalEn: 'Respond automatically with matching auxiliaries for agreement.',
    keyPattern: {
      ruleAr: 'مع الجمل المثبتة نستخدم So + الفعل المساعد + الفاعل. ومع الجمل المنفية نستخدم Neither.',
      ruleEn: 'Positive agreement: So + auxiliary + subject. Negative: Neither + auxiliary + subject.',
      formula: "Positive: So + [Aux] + I | Negative: Neither + [Aux] + I"
    },
    practicalExamples: [
      {
        en: "I love black coffee! ➡️ So do I!",
        ar: 'أنا أعشق القهوة السوداء! ⬅️ وأنا كذلك!',
        spokenNoteAr: 'So do I تنطق ككتلة صوتية متصلة [so-duh-I].'
      },
      {
        en: "I don't like crowded places. ➡️ Neither do I.",
        ar: 'لا أحب الأماكن المزدحمة. ⬅️ ولا أنا أيضاً.',
        spokenNoteAr: 'لاحظ استخدام do لأن الجملة الأصلية فيها don\'t.'
      },
      {
        en: "I can't swim very well. ➡️ Neither can I.",
        ar: 'لا أستطيع السباحة جيداً. ⬅️ ولا أنا أستطيع.',
        spokenNoteAr: 'نستخدم can لأن الفعل المساعد الأصلي هو can\'t.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I don't like tea. ➡️ Me too!",
        correct: "Neither do I / Me neither.",
        whyAr: 'مع النفي لا يصح قول Me too، بل يقال Me neither أو Neither do I.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة ستقول جملة منفية عن الأطعمة السريعة. وافقها باستخدام Neither do I!',
      promptEn: 'Sara will state a negative habit. Agree using "Neither do I"!',
      saraQuestionAr: "I don't really enjoy eating fast food late at night.",
      saraQuestionEn: "I don't really enjoy eating fast food late at night.",
      recommendedResponseEn: "Neither do I! It always makes me feel sluggish the next day."
    },
    quiz: [
      {
        questionAr: 'شخص يقول: "I am ready for the trip!" كيف توافقه بصيغة So؟',
        questionEn: 'Someone says: "I am ready for the trip!" What is the matching reply?',
        options: [
          "So do I.",
          "So am I.",
          "Neither am I.",
          "So have I."
        ],
        correctIndex: 1,
        explanationAr: 'بما أن الجملة تستخدم فعل الكينونة (am)، فإن الموافقة المتطابقة هي: So am I.'
      }
    ],
    whiteboardNotes: {
      title: 'Fast Agreement Echoes',
      pointsAr: [
        'جملة مثبتة: So do I / So am I / So can I',
        'جملة منفية: Neither do I / Neither am I / Neither can I',
        'تجنب: Me too عند النفي!'
      ],
      pointsEn: [
        'Positive statement ➡️ So + [Aux] + I',
        'Negative statement ➡️ Neither + [Aux] + I',
        'Never say "Me too" to a negative sentence!'
      ],
      chalkHighlight: 'Positive ➡️ So do I | Negative ➡️ Neither do I'
    }
  },
  {
    id: 'sg_108',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب وصف المحيط والوجود (There\'s vs It has)',
    titleEn: 'Describing Your Surroundings: There is/are vs It has',
    descAr: 'كيف تصف الأماكن والغرف والمدن بإنجليزية طبيعية دون أن تترجم حرفياً من لغتك الأم.',
    descEn: 'Describe rooms, places, and scenes naturally without translation traps.',
    speakingGoalAr: 'وصف الغرفة أو المكان الذي تجلس فيه الآن بـ 3 جمل باستخدام There is / There are.',
    speakingGoalEn: 'Describe what exists in your immediate environment with accuracy.',
    keyPattern: {
      ruleAr: 'للإشارة إلى وجود شيء في مكان نستخدم There is للمفرد و There are للجمع. لا نستخدم It has إلا إذا كان الفاعل يملك الشيء كجزء منه.',
      ruleEn: "Use \"There is / There's\" for singular and \"There are\" for plural presence.",
      formula: "Singular: There's a + [Noun] | Plural: There are + [Plural Noun]"
    },
    practicalExamples: [
      {
        en: "There's a cozy cafe right around the corner.",
        ar: 'هناك مقهى دافئ وجميل عند زاوية الشارع مباشرة.',
        spokenNoteAr: 'There is تختصر دائماً صوتياً إلى There\'s.'
      },
      {
        en: "There are lots of great options on the menu.",
        ar: 'توجد خيارات كثيرة ورائعة في قائمة الطعام.',
        spokenNoteAr: 'There are تنطق بسرعة كـ [There-er].'
      },
      {
        en: "Is there any Wi-Fi available here?",
        ar: 'هل يتوفر أي اتصال واي فاي هنا؟',
        spokenNoteAr: 'في السؤال نقلب الترتيب: Is there...?'
      }
    ],
    commonMistakes: [
      {
        incorrect: "In my city has many parks.",
        correct: "There are many parks in my city.",
        whyAr: 'في الإنجليزية لا تبدأ الجملة بـ has دون فاعل؛ الصحيح استخدام There are.'
      }
    ],
    speakingChallenge: {
      promptAr: 'صف لسارة ما يوجد على مكتبك الآن في جملتين سريعتين!',
      promptEn: 'Tell Sara what is currently on your desk using "There is" and "There are"!',
      saraQuestionAr: 'What does your workspace look like right now?',
      saraQuestionEn: 'What does your workspace look like right now?',
      recommendedResponseEn: "There's a warm cup of coffee and there are two notebooks on my desk!"
    },
    quiz: [
      {
        questionAr: 'أكمل الجملة: "______ a lot of people at the event today."',
        questionEn: 'Complete: "______ a lot of people at the event today."',
        options: [
          "There is",
          "There are",
          "It has",
          "They is"
        ],
        correctIndex: 1,
        explanationAr: 'كلمة people اسم جمع، لذا نستخدم معها There are.'
      }
    ],
    whiteboardNotes: {
      title: 'Spoken Existence Markers',
      pointsAr: [
        'There is (There\'s) ⬅️ للمفرد غير المعدود',
        'There are ⬅️ للجمع',
        'خطأ شائع: لا تقل "In here has" بل قل "There is"'
      ],
      pointsEn: [
        'There\'s + singular / uncountable',
        'There are + plural items',
        'Avoid translating Arabic "فيه" to "has"!'
      ],
      chalkHighlight: "There's a... | There are some..."
    }
  },
  {
    id: 'sg_109',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب الطلب المهذب الفوري (Could you / Would you mind)',
    titleEn: 'Polite Requests on the Fly: Could you vs Would you mind',
    descAr: 'كيف تطلب مساعدة أو خدمة من الآخرين بأسلوب غاية في اللباقة يضمن تجاوبهم بابتسامة.',
    descEn: 'Ask for favors gracefully without sounding demanding or abrasive.',
    speakingGoalAr: 'طلب خدمة بسيطة من سارة باستخدام Could you ثم بصيغة Would you mind + ing.',
    speakingGoalEn: 'Make high-politeness requests smoothly using modal frames.',
    keyPattern: {
      ruleAr: 'Could you + مصدر أسلوب مهذب مباشر. أما Would you mind فيتبعها فعل به -ing دائماً.',
      ruleEn: 'Could you + base verb. Would you mind + verb-ing.',
      formula: "Could you please + [Base Verb]? | Would you mind + [Verb-ing]?"
    },
    practicalExamples: [
      {
        en: "Could you give me a quick hand with this?",
        ar: 'هل بإمكانك مساعدتي قليلاً في هذا؟',
        spokenNoteAr: 'give me a hand تعبير تحدثي لطيف يعني ساعدني.'
      },
      {
        en: "Would you mind repeating that one more time?",
        ar: 'هل تمانع في تكرار ذلك مرة أخرى؟',
        spokenNoteAr: 'لاحظ إضافة ing بعد mind.'
      },
      {
        en: "Could you pass the salt, please?",
        ar: 'لو سمحت، هل يمكنك تمرير الملح؟',
        spokenNoteAr: 'وضع please في البداية أو النهاية يضفي تهذيباً فورياً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Would you mind to close the door?",
        correct: "Would you mind closing the door?",
        whyAr: 'بعد mind لا نضع to ومصدر، بل نضع فعل + ing.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اطلب من سارة التحدث ببطء أكثر بلباقة شديدة باستخدام Would you mind!',
      promptEn: 'Ask Sara to speak a bit slower using "Would you mind"!',
      saraQuestionAr: 'Am I speaking at a comfortable pace for you?',
      saraQuestionEn: 'Am I speaking at a comfortable pace for you?',
      recommendedResponseEn: "Would you mind speaking just a little slower, please?"
    },
    quiz: [
      {
        questionAr: 'ما الصيغة الصحيحة بعد "Would you mind"؟',
        questionEn: 'Which is correct after "Would you mind"?',
        options: [
          "Would you mind help me?",
          "Would you mind helping me?",
          "Would you mind helped me?",
          "Would you mind to help me?"
        ],
        correctIndex: 1,
        explanationAr: 'يأتي بعد Would you mind دائماً فعل ينتهي بـ -ing: helping.'
      }
    ],
    whiteboardNotes: {
      title: 'Polite Request Ladder',
      pointsAr: [
        'مستوى 1: Can you...? (عادي وغير رسمي)',
        'مستوى 2: Could you please...? (مهذب جداً ومثالي)',
        'مستوى 3: Would you mind + ing...? (قمة اللباقة والدبلوماسية)'
      ],
      pointsEn: [
        'Level 1: Can you...? (Casual)',
        'Level 2: Could you please...? (Respectful standard)',
        'Level 3: Would you mind + -ing...? (Ultra polite)'
      ],
      chalkHighlight: 'Could you [Verb]? | Would you mind [Verb-ing]?'
    }
  },
  {
    id: 'sg_110',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب التجارب الحياتية (Have you ever vs Did you)',
    titleEn: 'Life Experiences vs Specific Times: Have you ever vs Did you',
    descAr: 'كيف تسأل وتتحدث عن تجارب العمر دون خلط بين الماضي البسيط والمضارع التام في الكلام السريع.',
    descEn: 'Talk about milestones and bucket-list experiences without hesitation.',
    speakingGoalAr: 'إجراء محادثة سريعة مع سارة حول تجربة سفر سابقة ووقتها المحدد.',
    speakingGoalEn: 'Transition smoothly from a life experience question to specific past details.',
    keyPattern: {
      ruleAr: 'اسأل عن تجربة العمر بـ "Have you ever + V3"، وعندما يدخل الحوار في تفاصيل الوقت والتاريخ تحوّل فوراً إلى الماضي البسيط "Did you".',
      ruleEn: 'Ask about lifetime experience with "Have you ever + V3"; zoom into details with past simple.',
      formula: "General: Have you ever + [V3]? ➡️ Specific: When did you + [Verb]?"
    },
    practicalExamples: [
      {
        en: "Have you ever tried authentic sushi? ➡️ Yes, I tried it in Tokyo last summer.",
        ar: 'هل جربت السوشي الأصلي من قبل؟ ⬅️ نعم، جربته في طوكيو الصيف الماضي.',
        spokenNoteAr: 'لاحظ كيف تحولنا من have tried إلى tried بمجرد ذكر last summer.'
      },
      {
        en: "Have you ever visited London?",
        ar: 'هل سبق لك زيارة لندن في حياتك؟',
        spokenNoteAr: 'Have you ever تنطق بسرعة كـ [Ha-vyu-ever].'
      },
      {
        en: "I've never been to South America, but I'd love to go.",
        ar: 'لم يسبق لي الذهاب إلى أمريكا الجنوبية، لكني أود ذلك بشدة.',
        spokenNoteAr: "I've never been تعبير سريع شائع للتعبير عن عدم خوض التجربة بعد."
      }
    ],
    commonMistakes: [
      {
        incorrect: "Have you ever visited Paris last year?",
        correct: "Did you visit Paris last year? / Have you ever visited Paris?",
        whyAr: 'لا يجوز وضع وقت محدد مثل last year مع Have you ever.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اسأل سارة عما إذا كانت قد جربت القفز المظلي من قبل!',
      promptEn: 'Ask Sara if she has ever tried skydiving!',
      saraQuestionAr: 'I love adventurous activities! What about you?',
      saraQuestionEn: 'I love adventurous activities! What about you?',
      recommendedResponseEn: "Have you ever tried skydiving? I've always wanted to do that!"
    },
    quiz: [
      {
        questionAr: 'ما السؤال الصحيح لمعرفة ما إذا كان الشخص قد زار اليابان في حياته؟',
        questionEn: 'Which question correctly inquires about someone’s life experience in Japan?',
        options: [
          "Did you ever been to Japan?",
          "Have you ever been to Japan?",
          "Are you ever go to Japan?",
          "Were you ever in Japan yesterday?"
        ],
        correctIndex: 1,
        explanationAr: 'صيغة تجارب الحياة في اللغة الإنجليزية هي: Have you ever been to...?'
      }
    ],
    whiteboardNotes: {
      title: 'Experience Flow Rule',
      pointsAr: [
        'خطوة 1: Have you ever + V3? (هل سبق لك في حياتك؟)',
        'خطوة 2: الإجابة: Yes, I have / No, never',
        'خطوة 3: التفاصيل: When did you go? (تحول للماضي البسيط فوراً)'
      ],
      pointsEn: [
        'Step 1: Have you ever + V3? (Lifetime opener)',
        'Step 2: Reply: Yes, I have / No, not yet',
        'Step 3: Details: When did you do it? (Pivot to Past Simple)'
      ],
      chalkHighlight: 'General Life: Have you ever...? ➡️ Details: When did you...?'
    }
  },
  {
    id: 'sg_120_s',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'قالب التطلع والشوق للمستقبل (Looking Forward to + ING)',
    titleEn: 'Excited Expectations: I am Looking Forward to + ING',
    descAr: 'كيف تعبر عن حماسك وشوقك لحدث قادم دون الوقوع في الفخ الشائع بوضع مصدر مجرد بعد to.',
    descEn: 'Master positive future anticipation using "looking forward to" followed by a gerund.',
    speakingGoalAr: 'التعبير عن حدث قادم أنت متحمس له مع سارة باستخدام Looking forward to + ing.',
    speakingGoalEn: 'Express genuine anticipation for an upcoming milestone or weekend activity.',
    keyPattern: {
      ruleAr: 'في عبارة look forward to تعتبر "to" حرف جر وليست علامة مصدر؛ ولذلك يجب أن يتبعها فعل ينتهي بـ -ing أو اسم صريح.',
      ruleEn: '"to" is a preposition in this idiom, meaning it MUST be followed by a noun or verb-ing.',
      formula: "I'm looking forward to + [Verb-ing / Noun]"
    },
    practicalExamples: [
      {
        en: "I'm really looking forward to meeting your team tomorrow!",
        ar: 'أنا متطلع حقاً ومتشوق لمقابلة فريقك غداً!',
        spokenNoteAr: 'لاحظ إضافة ing لكلمة meet لأن to هنا حرف جر وليست to المصدرية.'
      },
      {
        en: "We're looking forward to the long weekend.",
        ar: 'نحن ننتظر عطلة نهاية الأسبوع الطويلة بفارغ الصبر.',
        spokenNoteAr: 'يمكن أن يأتي بعدها اسم مباشر (the weekend).'
      },
      {
        en: "Looking forward to hearing from you soon!",
        ar: 'أتطلع لسماع أخبارك قريباً! (خاتمة شهيرة في الإيميلات والشات).',
        spokenNoteAr: 'تستخدم كخاتمة مهذبة وودية في نهاية المحادثات.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I am looking forward to meet you.",
        correct: "I am looking forward to meeting you.",
        whyAr: 'الخطأ الأكثر شيوعاً عند المتعلمين هو حذف ing بعد to في هذا التركيب بالذات.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أخبر سارة بحدث قادم خلال الأسبوعين القادمين أنت متشوق له باستخدام Looking forward to!',
      promptEn: 'Tell Sara about an upcoming plan you are eager for using "looking forward to"!',
      saraQuestionAr: 'What is one exciting thing on your calendar that you can’t wait for?',
      saraQuestionEn: 'What is one exciting thing on your calendar that you can’t wait for?',
      recommendedResponseEn: "I'm really looking forward to finishing my course and celebrating with my family!"
    },
    quiz: [
      {
        questionAr: 'اختر الصيغة الصحيحة لغوياً بعد "I am looking forward to":',
        questionEn: 'Which option correctly completes "I am looking forward to":',
        options: [
          "see you tomorrow",
          "seeing you tomorrow",
          "saw you tomorrow",
          "be see you tomorrow"
        ],
        correctIndex: 1,
        explanationAr: 'يتبع تركيب looking forward to دائماً صيغة verb-ing (seeing).'
      }
    ],
    whiteboardNotes: {
      title: 'The Anticipation Rule',
      pointsAr: [
        '1. I\'m looking forward to + [Verb-ing]',
        '2. تذكر: to هنا حرف جر وليس مصدراً!',
        '3. خاتمة رائعة للشات: Looking forward to our next session!'
      ],
      pointsEn: [
        '1. I\'m looking forward to + [Gerund / Noun]',
        '2. "to" is a preposition ➡️ Requires -ing',
        '3. Classic closing: "Looking forward to seeing you!"'
      ],
      chalkHighlight: "I'm looking forward to + [Verb-ing]"
    }
  },

  // ==========================================
  // INTERMEDIATE LEVEL (B1-B2) - Lessons 11 to 20
  // ==========================================
  {
    id: 'sg_102',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قوالب إبداء الرأي بلباقة وبدائل كلمة I Think',
    titleEn: 'Natural Opinion Templates: Beyond "I Think"',
    descAr: 'تخلص من تكرار كلمة I think وتعلم 5 قوالب ذكية تجعل كلامك جذاباً وأكثر نضجاً واحتراماً في النقاش.',
    descEn: 'Sound sophisticated and persuasive with smooth opinion starters in discussions.',
    speakingGoalAr: 'التعبير عن وجهة نظرك في موضوع مع سارة بثلاث طرق مختلفة دون نطق I think.',
    speakingGoalEn: 'Share your perspective politely using nuanced conversational starters.',
    keyPattern: {
      ruleAr: 'في النقاشات الإنجليزية، استخدام بدائل مثل "From my perspective" أو "As far as I can tell" يمنحك قوة وهدوء أثناء التحدث.',
      ruleEn: 'Start your sentence with varied perspective markers to sound confident and fluent.',
      formula: '[Opinion Starter] + [Complete Thought / Point]'
    },
    practicalExamples: [
      {
        en: "From my perspective, consistency is way more important than speed.",
        ar: 'من وجهة نظري، الاستمرارية أهم بكثير من السرعة.',
        spokenNoteAr: 'نبرة هادئة ومقنعة جداً في مقابلات العمل والنقاشات.'
      },
      {
        en: "As far as I'm concerned, we should keep things simple.",
        ar: 'على حد قناعتي، ينبغي أن نبقي الأمور بسيطة.',
        spokenNoteAr: 'تعبير لبق يبين أنك تعبر عن رأيك دون فرض.'
      },
      {
        en: "If you ask me, this option seems much more practical.",
        ar: 'إذا سألتني، فهذا الخيار يبدو أكثر عملية بكثير.',
        spokenNoteAr: 'طبيعية جداً في المحادثات العفوية مع الزملاء.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "According to me, this is good.",
        correct: "In my opinion / From my perspective, this is good.",
        whyAr: 'تعبير According to me غير مستخدم في الإنجليزية، بل يقال According to him/the news.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة ستسألك عن رأيك في تعلم الإنجليزية يومياً. أجب باستخدام أحد القوالب الجديدة!',
      promptEn: 'Sara will ask about daily learning. Share your opinion using a fresh template!',
      saraQuestionAr: 'What do you think is the secret to speaking fluently?',
      saraQuestionEn: 'What do you think is the secret to speaking fluently?',
      recommendedResponseEn: "If you ask me, speaking every single day without fear is the real key."
    },
    quiz: [
      {
        questionAr: 'أي من هذه العبارات غير صحيحة للتعبير عن رأيك الشخصي؟',
        questionEn: 'Which phrase is grammatically unnatural for stating your own view?',
        options: [
          "From my perspective",
          "According to me",
          "As far as I can tell",
          "In my view"
        ],
        correctIndex: 1,
        explanationAr: 'عبارة According to me خاطئة شائعة؛ الصحيح استخدام In my view أو From my perspective.'
      }
    ],
    whiteboardNotes: {
      title: 'Smart Opinion Starters',
      pointsAr: [
        '1. If you ask me... (إذا ودك رأيي)',
        '2. From my perspective... (من زاويتي)',
        '3. As far as I can tell... (بحسب ما يتضح لي)',
        '4. تجنب تماماً: According to me!'
      ],
      pointsEn: [
        '1. If you ask me, ...',
        '2. From my perspective, ...',
        '3. As far as I can tell, ...',
        'Rule: Never say "According to me"!'
      ],
      chalkHighlight: 'If you ask me, speaking beats memorizing!'
    }
  },
  {
    id: 'sg_111',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قوالب الافتراض والنصيحة الخيالية (If I were you & What if)',
    titleEn: 'Hypothetical Advice: If I were you & Second Conditionals',
    descAr: 'كيف تقدم نصيحة راقية أو تطرح أفكاراً افتراضية دون أن تبدو آمراً أو متسلطاً.',
    descEn: 'Give diplomatic advice and explore possibilities without being bossy.',
    speakingGoalAr: 'تقديم نصيحة لسارة حول تنظيم الوقت باستخدام قالب If I were you.',
    speakingGoalEn: 'Deliver constructive advice using "If I were you, I would...".',
    keyPattern: {
      ruleAr: 'في الافتراضات التخيلية نستخدم were مع جميع الضمائر (بما فيها I و he/she) متبوعة بـ would والمصدر.',
      ruleEn: 'Use subjunctive "were" for all subjects in unreal conditionals: If I were you, I would...',
      formula: "If I were you, I'd + [Base Verb] | What if we + [Past Verb]?"
    },
    practicalExamples: [
      {
        en: "If I were in your shoes, I'd take that job offer immediately.",
        ar: 'لو كنت مكانك، لوافقت على هذا العرض الوظيفي فوراً.',
        spokenNoteAr: 'in your shoes تعبير بلاغي رائع يعني في مكانك وموقفك.'
      },
      {
        en: "What if we rescheduled the meeting for Friday morning?",
        ar: 'ماذا لو أعدنا جدولة الاجتماع لصباح الجمعة؟',
        spokenNoteAr: 'What if أسلوب دبلوماسي لطرح الاقتراحات.'
      },
      {
        en: "If I had more time, I'd read a book every single week.",
        ar: 'لو كان لدي متسع من الوقت، لقرأت كتاباً كل أسبوع.',
        spokenNoteAr: "I'd هي اختصار I would الشائع في الحديث السريع."
      }
    ],
    commonMistakes: [
      {
        incorrect: "If I am you, I will do it.",
        correct: "If I were you, I would do it.",
        whyAr: 'لأنك لست هو في الواقع؛ إنه موقف خيالي يتطلب الماضي الافتراضي were و would.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تشعر بالتوتر قبل مقابلة عمل. انصحها باستخدام If I were you!',
      promptEn: 'Sara feels nervous before an interview. Give her advice using "If I were you"!',
      saraQuestionAr: "I have a big interview tomorrow and I'm feeling quite anxious. Any advice?",
      saraQuestionEn: "I have a big interview tomorrow and I'm feeling quite anxious. Any advice?",
      recommendedResponseEn: "If I were you, I'd take a deep breath and practice your key stories in front of a mirror!"
    },
    quiz: [
      {
        questionAr: 'ما الصيغة الصحيحة للجملة الافتراضية؟',
        questionEn: 'Which is the standard hypothetical conditional form?',
        options: [
          "If I was you, I will buy it.",
          "If I were you, I would buy it.",
          "If I am you, I buy it.",
          "If I had been you, I buy it."
        ],
        correctIndex: 1,
        explanationAr: 'الصيغة القياسية لتقديم النصيحة التخيلية هي: If I were you, I would buy it.'
      }
    ],
    whiteboardNotes: {
      title: 'Hypothetical Advice Formula',
      pointsAr: [
        'If I were you, I\'d + مصدر ⬅️ لو كنت مكانك لفعلت...',
        'What if we + ماضي ⬅️ ماذا لو جربنا...؟',
        'نبرة متواضعة ومحبوبة جداً في بيئة العمل'
      ],
      pointsEn: [
        'If I were you, I\'d [Base Verb]',
        'What if we [Past Verb]?',
        'High diplomacy, non-intrusive advice'
      ],
      chalkHighlight: 'If I were you, I\'d + [Verb]'
    }
  },
  {
    id: 'sg_112',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب التمني والرجاء الواقعي (Wish vs Hope)',
    titleEn: 'Regrets vs Optimistic Realities: Wish vs Hope',
    descAr: 'كيف تفرق بين الأمنيات الواقعية القابلة للتحقيق (Hope) والحسرات والأمنيات الخيالية (Wish).',
    descEn: 'Stop confusing optimistic hopes with retrospective or impossible wishes.',
    speakingGoalAr: 'التعبير عن أمنية للمستقبل باستخدام Hope، وأمنية لتغيير وضع حالي باستخدام Wish.',
    speakingGoalEn: 'Articulate an optimistic hope and a counterfactual wish with correct grammar.',
    keyPattern: {
      ruleAr: 'Hope تأتي للأشياء الممكنة في المستقبل (مضارع بسيط). Wish تأتي للوضع الحالي الذي تتمنى لو كان مختلفاً (ماضي بسيط).',
      ruleEn: 'Hope + present for realistic future; Wish + past tense for present counterfactual desires.',
      formula: "Realistic: I hope you + [Present Verb] | Counterfactual: I wish I + [Past Verb]"
    },
    practicalExamples: [
      {
        en: "I hope you have a fantastic trip to Dubai!",
        ar: 'أتمنى لك رحلة رائعة إلى دبي! (أمر ممكن وقادم)',
        spokenNoteAr: 'نستخدم hope لأن الرحلة ستحصل بالفعل في المستقبل.'
      },
      {
        en: "I wish I could speak five languages fluently.",
        ar: 'أتمنى لو كنت أستطيع التحدث بخمس لغات بطلاقة. (وضع حالي خيالي)',
        spokenNoteAr: 'لاحظ استخدام could بدلاً من can للتعبير عن التمني.'
      },
      {
        en: "I wish it weren't raining right now.",
        ar: 'يا ليت المطر لم يكن يهطل الآن.',
        spokenNoteAr: 'تمني تغيير الواقع الفعلي في هذه اللحظة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I wish you pass the exam tomorrow.",
        correct: "I hope you pass the exam tomorrow.",
        whyAr: 'لأن الامتحان غداً وأنت ترجو له التوفيق في أمر واقعي ممكن، فنستخدم hope وليس wish.'
      }
    ],
    speakingChallenge: {
      promptAr: 'تمنى لسارة يوماً سعيداً بـ hope، ثم عبر عن أمنية شخصية بـ wish!',
      promptEn: 'Wish Sara a great day using "hope", then share a personal wish using "wish"!',
      saraQuestionAr: 'What are you looking forward to today?',
      saraQuestionEn: 'What are you looking forward to today?',
      recommendedResponseEn: "I hope you have a wonderful day! Personally, I wish I had more hours to study English!"
    },
    quiz: [
      {
        questionAr: 'صديقك يجري مقابلة عمل بعد ساعة. ماذا تقول له؟',
        questionEn: 'Your friend has an interview in an hour. What do you say?',
        options: [
          "I wish you get the job.",
          "I hope you get the job!",
          "I wish you got the job yesterday.",
          "I hope you had got the job."
        ],
        correctIndex: 1,
        explanationAr: 'للأمنيات المستقبلية الواقعية الممكنة نستخدم دائماً Hope.'
      }
    ],
    whiteboardNotes: {
      title: 'Wish vs Hope Demystified',
      pointsAr: [
        'Hope + مضارع ⬅️ رجاء واقعي للمستقبل (I hope you win)',
        'Wish + ماضي ⬅️ تمني تغيير واقع حالي (I wish I had more time)',
        'قاعدة ذهبية: لا تستخدم wish للتمني الإيجابي المستقبلي لشخص'
      ],
      pointsEn: [
        'Hope + present = Realistic future optimism',
        'Wish + past = Craving a different current reality',
        'Golden Rule: Use "hope" for good luck wishes!'
      ],
      chalkHighlight: 'Hope + [Present] | Wish + [Past]'
    }
  },
  {
    id: 'sg_113',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قوالب الاستنتاج الذكي (Must be, Can\'t be, Might be)',
    titleEn: 'Spoken Deductions: Must be, Can\'t be, Might be',
    descAr: 'كيف تستنتج المواقف والأحداث كالمحققين بذكاء دون أن تجزم أو تتسرع في الحكم.',
    descEn: 'Deduce facts, likelihoods, and impossibilities conversationally in seconds.',
    speakingGoalAr: 'التعبير عن استنتاج شبه مؤكد (must be) واستنتاج مستحيل (can\'t be) مع سارة.',
    speakingGoalEn: 'Make deductions about everyday scenarios with varying degrees of certainty.',
    keyPattern: {
      ruleAr: 'Must be = شبه متأكد بنسبة 95% أنه صحيح. Can\'t be = مستحيل أن يكون صحيحاً. Might be = احتمال 50%.',
      ruleEn: 'Must be = 95% certainty; Can\'t be = 99% impossible; Might/Could be = 50% possible.',
      formula: "Certain: It must be + [Adj/Noun] | Impossible: It can't be + [Adj/Noun]"
    },
    practicalExamples: [
      {
        en: "You've been working for 10 hours straight, you must be exhausted!",
        ar: 'أنت تعمل منذ 10 ساعات متواصلة، لابد أنك منهك تماماً!',
        spokenNoteAr: 'must be تعبر عن تعاطف واستنتاج منطقي بديهي.'
      },
      {
        en: "That can't be true, I just talked to him five minutes ago.",
        ar: 'مستحيل أن يكون هذا صحيحاً، لقد تحدثت معه للتو قبل خمس دقائق.',
        spokenNoteAr: 'can\'t be تعبر عن الاستحالة المطلقة للموقف.'
      },
      {
        en: "He might be running late due to the heavy traffic.",
        ar: 'ربما يكون متأخراً بسبب زحمة السير.',
        spokenNoteAr: 'might be احتمال وارد دون جزم.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "It mustn't be true! (when meaning impossible)",
        correct: "It can't be true!",
        whyAr: 'في الاستنتاج المعاكس للاستحالة نستخدم can\'t be، أما mustn\'t فتعني النهي والتحريم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'شخص يطرق بابك في منتصف الليل. عبر عن استنتاجك واستحالة أن يكون البريد!',
      promptEn: 'Someone knocks on your door at midnight. Make a deduction using "can\'t be"!',
      saraQuestionAr: 'Someone is knocking at the door at 2 AM. Who do you think it is?',
      saraQuestionEn: 'Someone is knocking at the door at 2 AM. Who do you think it is?',
      recommendedResponseEn: "It can't be the mailman at this hour! It must be an emergency or my neighbor."
    },
    quiz: [
      {
        questionAr: 'سيارة جارك الجديدة فارهة جداً. كيف تستنتج أنه دفع الكثير؟',
        questionEn: 'Your neighbor got a brand new supercar. What deduction fits best?',
        options: [
          "It must cost a fortune!",
          "It can't be expensive.",
          "It should cost nothing.",
          "It mustn't be fast."
        ],
        correctIndex: 0,
        explanationAr: 'must cost a fortune تعني بالتأكيد تكلف ثروة بناءً على الدليل الواضح.'
      }
    ],
    whiteboardNotes: {
      title: 'The Deduction Gauge',
      pointsAr: [
        'Must be ⬅️ أكيد 95% (بناءً على دليل واضح)',
        'Might / Could be ⬅️ ربما 50% (احتمال مفتوح)',
        'Can\'t be ⬅️ مستحيل 99% (غير قابل للتصديق)'
      ],
      pointsEn: [
        'Must be = 95% certainty based on evidence',
        'Might be = 50% plausible guess',
        'Can\'t be = 99% impossible deduction'
      ],
      chalkHighlight: 'Must be ➡️ Might be ➡️ Can\'t be'
    }
  },
  {
    id: 'sg_114',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب اللوم والندم البناء (Should have & Could have)',
    titleEn: 'Constructive Reflection: Should have & Could have in Fast Speech',
    descAr: 'كيف تتحدث عن قرارات الماضي بوعي وذكاء وتنطق shoulda و coulda كمتحدث أصلي.',
    descEn: 'Reflect on past actions and missed opportunities with relaxed spoken contractions.',
    speakingGoalAr: 'التعبير عن درس تعلمته من موقف سابق باستخدام I should have.',
    speakingGoalEn: 'Voice past reflections using native reductions "shoulda" and "coulda".',
    keyPattern: {
      ruleAr: 'في الكلام السريع تنطق should have كـ "shoulda" [shoo-duh]، وتنطق could have كـ "coulda" [koo-duh].',
      ruleEn: 'Spoken reductions: should have ➡️ shoulda; could have ➡️ coulda.',
      formula: "I should have + [V3] (sounds like: I shoulda + [V3])"
    },
    practicalExamples: [
      {
        en: "I should have listened to your advice earlier.",
        ar: 'كان ينبغي عليّ الاستماع لنصيحتك مبكراً.',
        spokenNoteAr: 'تنطق [I shoulda listened] بانسيابية كاملة.'
      },
      {
        en: "We could have taken the train to avoid this traffic.",
        ar: 'كان بإمكاننا ركوب القطار لتفادي هذا الزحام.',
        spokenNoteAr: 'تنطق [We coulda taken] ككتلة صوتية واحدة.'
      },
      {
        en: "You shouldn't have worried about it so much.",
        ar: 'ما كان ينبغي عليك القلق بشأنه إلى هذا الحد.',
        spokenNoteAr: 'تعبير مواساة دافئ يخفف عن الشخص الآخر.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I should of called you yesterday.",
        correct: "I should have called you yesterday.",
        whyAr: 'خطأ إملائي شهير جداً بسبب النطق الصوتي المتطابق، الكلمة هي have وليست of.'
      }
    ],
    speakingChallenge: {
      promptAr: 'شارك سارة شيئاً تمنيت لو بدأته قبل عام في مسيرتك التعليمية!',
      promptEn: 'Share one thing you should have started earlier with Sara!',
      saraQuestionAr: 'Is there any habit you wish you had started a year ago?',
      saraQuestionEn: 'Is there any habit you wish you had started a year ago?',
      recommendedResponseEn: "I should have started practicing speaking every single day much earlier!"
    },
    quiz: [
      {
        questionAr: 'ما النطق الطبيعي التحدثي لعبارة "I should have known"؟',
        questionEn: 'How does "I should have known" sound in fluent conversational English?',
        options: [
          "I should of known",
          "I shoulda known",
          "I shall have known",
          "I should had known"
        ],
        correctIndex: 1,
        explanationAr: 'في الحديث السريع تدمج have مع should لتنطق صوتياً: shoulda.'
      }
    ],
    whiteboardNotes: {
      title: 'Spoken Reductions: Past Modals',
      pointsAr: [
        'Should have ➡️ Shoulda [shoo-duh] (كان ينبغي)',
        'Could have ➡️ Coulda [koo-duh] (كان بإمكانه)',
        'Would have ➡️ Woulda [woo-duh] (لو حصل لكان)',
        'احذر كتابتها "should of"!'
      ],
      pointsEn: [
        'Should have ➡️ Shoulda',
        'Could have ➡️ Coulda',
        'Would have ➡️ Woulda',
        'Grammar tip: Never write "of" instead of "have"!'
      ],
      chalkHighlight: 'Shoulda ➡️ Coulda ➡️ Woulda'
    }
  },
  {
    id: 'sg_115',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب الأسئلة الضمنية المهذبة (Embedded Questions)',
    titleEn: 'Embedded Questions: Do you know where... without sounding blunt',
    descAr: 'كيف تسأل الغرباء والزملاء أسئلة راقية غير مباشرة دون قلب ترتيب الجملة الفعلي.',
    descEn: 'Ask delicate questions politely without triggering defensive reactions.',
    speakingGoalAr: 'تحويل سؤال مباشر حاد إلى سؤال ضمني غاية في اللباقة.',
    speakingGoalEn: 'Convert direct interrogatives into polished embedded questions.',
    keyPattern: {
      ruleAr: 'في السؤال الضمني، يعود ترتيب الجملة إلى صيغة الخبر: (فاعل + فعل) ولا نستخدم do/does/did كأفعال مساعدة مقلوبة.',
      ruleEn: 'Embedded questions return to normal declarative order (Subject + Verb). No auxiliary inversion.',
      formula: "Do you know + [Question Word] + [Subject] + [Verb]?"
    },
    practicalExamples: [
      {
        en: "Do you know where the nearest subway station is?",
        ar: 'هل تعرف أين تقع أقرب محطة مترو؟',
        spokenNoteAr: 'لاحظ: is جاءت في النهاية بعد the station وليس قبلها.'
      },
      {
        en: "Could you tell me what time the meeting starts?",
        ar: 'هل بإمكانك إخباري في أي وقت يبدأ الاجتماع؟',
        spokenNoteAr: 'starts تنتهي بـ s لأن الفاعل the meeting مفرد، وحذفنا does.'
      },
      {
        en: "I wonder if they have an open table for two.",
        ar: 'أتساءل عما إذا كان لديهم طاولة شاغرة لشخصين.',
        spokenNoteAr: 'I wonder if أسلوب استفسار راقٍ جداً في المطاعم والفنادق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Do you know where is the station?",
        correct: "Do you know where the station is?",
        whyAr: 'في السؤال الضمني لا نقلب الفعل، بل يبقى الفاعل أولاً ثم الفعل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اسأل سارة بلباقة عن المكان الذي تعيش فيه باستخدام Could you tell me where...!',
      promptEn: 'Ask Sara where she lives politely using an embedded question!',
      saraQuestionAr: 'Feel free to ask me anything about my daily routine!',
      saraQuestionEn: 'Feel free to ask me anything about my daily routine!',
      recommendedResponseEn: "Could you tell me what your favorite part of the day is?"
    },
    quiz: [
      {
        questionAr: 'اختر الصيغة الصحيحة للسؤال الضمني:',
        questionEn: 'Which sentence is a grammatically correct embedded question?',
        options: [
          "Can you tell me where does he work?",
          "Can you tell me where he works?",
          "Can you tell me where works he?",
          "Can you tell me where do he work?"
        ],
        correctIndex: 1,
        explanationAr: 'في السؤال الضمني نحذف does ونضع الفاعل أولاً متبوعاً بالفعل المصرف: where he works.'
      }
    ],
    whiteboardNotes: {
      title: 'Polite Embedded Structure',
      pointsAr: [
        'سؤال مباشر: Where is the bank? (جاف ومباشر)',
        'سؤال ضمني: Do you know where the bank is? (مهذب وراقي)',
        'القاعدة: أداة السؤال ⬅️ الفاعل ⬅️ الفعل'
      ],
      pointsEn: [
        'Direct: Where is the bank? (Blunt)',
        'Embedded: Do you know where the bank is? (Diplomatic)',
        'Word order: Question word + Subject + Verb'
      ],
      chalkHighlight: 'Do you know [Where / When / What] + Subject + Verb?'
    }
  },
  {
    id: 'sg_116',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب تفويض المهام والأفعال السببية (Have vs Get someone to do)',
    titleEn: 'Causatives & Delegating: Have someone do vs Get someone to do',
    descAr: 'كيف تعبر عن إنجاز المهام بواسطة الآخرين (إصلاح السيارة، قص الشعر، تفويض العمل).',
    descEn: 'Express delegation, services, and persuasive action naturally in speech.',
    speakingGoalAr: 'التحدث عن خدمة أو مهمة جعلت شخصاً آخر ينجزها لك.',
    speakingGoalEn: 'Describe delegating a professional or household task.',
    keyPattern: {
      ruleAr: 'Have someone do (مصدر بدون to) لطلب رسمي مدفوع. Get someone to do (مع to) لإقناع أو تحفيز شخص.',
      ruleEn: 'Have someone + base verb (formal/service); Get someone + to + verb (persuasion).',
      formula: "Have someone + [Base Verb] | Get someone to + [Base Verb]"
    },
    practicalExamples: [
      {
        en: "I need to have my laptop fixed before Monday.",
        ar: 'أحتاج إلى إصلاح جهازي المحمول لدى مختص قبل يوم الاثنين.',
        spokenNoteAr: 'have something fixed صيغة مجهول سببي شهيرة جداً.'
      },
      {
        en: "I finally got my brother to lend me his car.",
        ar: 'أخيراً أقنعت أخي بأن يعيرني سيارته.',
        spokenNoteAr: 'get someone to do تعني أنك بذلت جهداً في إقناعه.'
      },
      {
        en: "I had the technician check the Wi-Fi connection.",
        ar: 'طلبت من الفني فحص اتصال الواي فاي.',
        spokenNoteAr: 'لاحظ عدم وجود to بعد technician.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I got him clean the office.",
        correct: "I got him to clean the office / I had him clean the office.",
        whyAr: 'مع get نضع to دائماً، ومع have نضع الفعل مجرداً بدون to.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أخبر سارة بآخر شيء قمت بإصلاحه أو إنجازه بواسطة مختص!',
      promptEn: 'Tell Sara about something you had fixed or repaired recently!',
      saraQuestionAr: 'Did you get any errands or repairs done this week?',
      saraQuestionEn: 'Did you get any errands or repairs done this week?',
      recommendedResponseEn: "I actually had my car inspected at the service center yesterday."
    },
    quiz: [
      {
        questionAr: 'أكمل الجملة: "She got her assistant ______ the flight tickets."',
        questionEn: 'Complete: "She got her assistant ______ the flight tickets."',
        options: [
          "book",
          "to book",
          "booked",
          "booking"
        ],
        correctIndex: 1,
        explanationAr: 'الفعل السببي get يتطلب حرف الجر to قبل المصدر: to book.'
      }
    ],
    whiteboardNotes: {
      title: 'The Delegation Matrix',
      pointsAr: [
        'Have + شخص + [فعل مجرد] (مهمة مدفوعة أو روتينية)',
        'Get + شخص + to [فعل مجرد] (إقناع وتحفيز)',
        'Have + شيء + V3 (خدمة منجزة: I had my hair cut)'
      ],
      pointsEn: [
        'Have + person + [Base Verb]',
        'Get + person + to [Base Verb]',
        'Have + item + V3 (Service received)'
      ],
      chalkHighlight: 'Have someone do 🆚 Get someone to do'
    }
  },
  {
    id: 'sg_117',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب المبني للمجهول التحدثي العفوي (The "Get" Passive)',
    titleEn: 'Everyday Spoken Passive: Using "Get" instead of "Be"',
    descAr: 'كيف يعبر المتحدثون الأصليون عن المفاجآت والحوادث والأمور المنجزة باستخدام Get بدلاً من الصيغ الأكاديمية الجافة.',
    descEn: 'Master dynamic spoken passive voice using "get" for actions, mishaps, and sudden events.',
    speakingGoalAr: 'التعبير عن حدث مفاجئ أو ترقية أو إلغاء باستخدام Get Passive.',
    speakingGoalEn: 'Describe an unexpected event or outcome using get + past participle.',
    keyPattern: {
      ruleAr: 'في المحادثات اليومية يستبدل المتحدثون verb to be بكلمة get للتعبير عن الأحداث الحركية المفاجئة.',
      ruleEn: 'In informal spoken English, "get + past participle" replaces "be + past participle".',
      formula: 'Subject + got + [Past Participle V3]'
    },
    practicalExamples: [
      {
        en: "Our flight got delayed for three hours due to fog.",
        ar: 'تأخرت رحلتنا لثلاث ساعات بسبب الضباب.',
        spokenNoteAr: 'got delayed أكثر حيوية وتداولاً من was delayed.'
      },
      {
        en: "Guess what? Ahmed got promoted to senior manager!",
        ar: 'تخيل ماذا؟ تمت ترقية أحمد إلى مدير أول!',
        spokenNoteAr: 'got promoted تعبر عن حدث مفرح وسريع.'
      },
      {
        en: "My phone screen got cracked when I dropped it.",
        ar: 'انكسرت شاشة هاتفي عندما أسقطته.',
        spokenNoteAr: 'got cracked تعبر عن وقوع الحادث.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "My flight got delay yesterday.",
        correct: "My flight got delayed yesterday.",
        whyAr: 'بعد get في المبني للمجهول يجب أن يكون الفعل في التصريف الثالث (V3).'
      }
    ],
    speakingChallenge: {
      promptAr: 'شارك سارة خبراً مفاجئاً عن حدث أُلغي أو تأجل مؤخراً باستخدام got!',
      promptEn: 'Tell Sara about an event that got cancelled or rescheduled!',
      saraQuestionAr: 'Did any of your plans change unexpectedly this week?',
      saraQuestionEn: 'Did any of your plans change unexpectedly this week?',
      recommendedResponseEn: "Yeah, our weekend camping trip got cancelled because of the rain!"
    },
    quiz: [
      {
        questionAr: 'ما الجملة الأكثر عفوية وتداولاً في الشارع الأمريكي عند الحديث عن سرقة المحفظة؟',
        questionEn: 'Which sentence sounds most natural and colloquial for a stolen wallet?',
        options: [
          "My wallet was being stolen.",
          "My wallet got stolen on the bus.",
          "My wallet is stole.",
          "My wallet did steal."
        ],
        correctIndex: 1,
        explanationAr: 'في الإنجليزية المحكية نستخدم got stolen للتعبير عن الحوادث والمفاجآت.'
      }
    ],
    whiteboardNotes: {
      title: 'The Spoken Get Passive',
      pointsAr: [
        'الكتابة الأكاديمية: The project was completed.',
        'الحديث اليومي: The project got done!',
        'أمثلة شهيرة: Got promoted, Got delayed, Got lost'
      ],
      pointsEn: [
        'Academic: It was canceled',
        'Conversational: It got canceled!',
        'High frequency: Got caught, Got fired, Got invited'
      ],
      chalkHighlight: 'Got + [V3] ➡️ Faster, punchier spoken voice'
    }
  },
  {
    id: 'sg_118',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب التفضيل والمقارنة الذكية (Would rather vs Prefer)',
    titleEn: 'Nuanced Preferences: Would rather vs Prefer in Daily Choices',
    descAr: 'كيف تختار وتفاضل بين خيارين بلباقة وتوضح ما يناسبك دون تردد.',
    descEn: 'State your options and priorities decisively with native precision.',
    speakingGoalAr: 'تفضيل خيار على آخر في سياق عمل أو ترفيه باستخدام would rather + than.',
    speakingGoalEn: 'Contrast two lifestyle or professional options using "would rather".',
    keyPattern: {
      ruleAr: 'Would rather يتبعها فعل مجرد ثم than. أما Prefer فيتبعها اسم أو verb-ing متبوعة بـ to.',
      ruleEn: 'Would rather + base verb + than. Prefer + -ing + to + -ing.',
      formula: "I'd rather + [Base Verb] + than + [Base Verb] | I prefer + [V-ing] + to + [V-ing]"
    },
    practicalExamples: [
      {
        en: "I'd rather stay in tonight than go to a crowded party.",
        ar: 'أفضل البقاء في المنزل الليلة على الذهاب إلى حفلة مزدحمة.',
        spokenNoteAr: "I'd rather تنطق بسلاسة، والفعل بعدها يأتي مجرداً بدون to."
      },
      {
        en: "I prefer working in the morning to studying late at night.",
        ar: 'أفضل العمل في الصباح على المذاكرة في وقت متأخر من الليل.',
        spokenNoteAr: 'لاحظ استخدام to للمقارنة بعد prefer وليس than.'
      },
      {
        en: "Would you rather have tea or coffee?",
        ar: 'هل تفضل الشاي أم القهوة؟',
        spokenNoteAr: 'سؤال كلاسيكي سريع لعرض الخيارات.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I'd rather to drink tea than coffee.",
        correct: "I'd rather drink tea than coffee.",
        whyAr: 'بعد would rather لا نضع to أبداً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة ستسألك: هل تفضل العمل عن بعد أم من المكتب؟ أجب باستخدام would rather!',
      promptEn: 'Answer Sara about remote vs office work using "I would rather"!',
      saraQuestionAr: 'Would you rather work remotely from home or work from a company office?',
      saraQuestionEn: 'Would you rather work remotely from home or work from a company office?',
      recommendedResponseEn: "I'd rather work remotely because it gives me flexibility and saves commuting time!"
    },
    quiz: [
      {
        questionAr: 'اختر الجملة الصحيحة لغوياً بعد would rather:',
        questionEn: 'Which sentence is grammatically correct with "would rather"?',
        options: [
          "I'd rather walking than drive.",
          "I'd rather walk than drive.",
          "I'd rather to walk than driving.",
          "I'd rather walk to drive."
        ],
        correctIndex: 1,
        explanationAr: 'يأتي بعد would rather فعل مجرد متبوعاً بـ than وفعل مجرد: walk than drive.'
      }
    ],
    whiteboardNotes: {
      title: 'Preferences at a Glance',
      pointsAr: [
        'Would rather + مصدر + than + مصدر (I\'d rather sleep than eat)',
        'Prefer + ing + to + ing (I prefer sleeping to eating)',
        'قاعدة ذهبية: لا تخلط بين than مع prefer أو to مع rather'
      ],
      pointsEn: [
        'Would rather + base + than + base',
        'Prefer + -ing + to + -ing',
        'Avoid pairing "prefer" with "than"!'
      ],
      chalkHighlight: 'I\'d rather [Do X] than [Do Y]'
    }
  },
  {
    id: 'sg_119',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'قالب الربط الوصفي السلس (Relative Clauses in Fast Talk)',
    titleEn: 'Conversational Connectors: Who, Which & That without pauses',
    descAr: 'كيف تدمج فكرتين في جملة واحدة رشيقة دون أن تتوقف وتكرر الفاعل مثل المبتدئين.',
    descEn: 'Merge sentences fluidly using relative clauses to sound natural and articulate.',
    speakingGoalAr: 'وصف صديق أو تطبيق مفضل في جملة مركبة واحدة بسلاسة تامة.',
    speakingGoalEn: 'Combine two descriptive ideas into a single seamless sentence.',
    keyPattern: {
      ruleAr: 'في الحديث السريع نستخدم that للأشخاص والأشياء، وغالباً ما نحذف ضمير الوصل تماماً إذا كان يعود على مفعول به.',
      ruleEn: 'Drop "that/who" when it refers to the object to achieve native cadence.',
      formula: 'The thing [you mentioned] ➡️ Notice: "that" is naturally omitted!'
    },
    practicalExamples: [
      {
        en: "The book you recommended was absolutely fascinating.",
        ar: 'الكتاب الذي أوصيتني به كان مذهلاً تماماً.',
        spokenNoteAr: 'لاحظ كيف حذفنا that تلقائياً ليصبح الكلام أسرع وأكثر طبيعية.'
      },
      {
        en: "She's the mentor who inspired me to start my own venture.",
        ar: 'إنها المرشدة التي ألهمتني لبدء مشروعي الخاص.',
        spokenNoteAr: 'who تربط الفاعل بإنجازه دون توقف.'
      },
      {
        en: "That's exactly the outcome we were hoping for.",
        ar: 'هذه بالضبط هي النتيجة التي كنا نأمل في تحقيقها.',
        spokenNoteAr: 'حذف ضمير الوصل يجعل الجملة محكمة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "The guy who he called me yesterday is my friend.",
        correct: "The guy who called me yesterday is my friend.",
        whyAr: 'لا تكرر الفاعل (he) بعد who لأن who حلت محله بالفعل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'صف لسارة في جملة واحدة التطبيق الذي تستخدمه يومياً لتعلم الإنجليزية!',
      promptEn: 'Describe your favorite English learning tool to Sara in one merged sentence!',
      saraQuestionAr: 'What tool helps you the most with your daily routine?',
      saraQuestionEn: 'What tool helps you the most with your daily routine?',
      recommendedResponseEn: "Sara Academy is the interactive platform that keeps me motivated every day!"
    },
    quiz: [
      {
        questionAr: 'في أي من هذه الجمل يمكن حذف ضمير الوصل "that" بأمان وسلاسة؟',
        questionEn: 'In which sentence can "that" be safely omitted in fast speech?',
        options: [
          "The movie that won the Oscar was thrilling.",
          "The coffee that I ordered was delicious.",
          "The dog that barked all night ran away.",
          "The doctor that treated me was kind."
        ],
        correctIndex: 1,
        explanationAr: 'في جملة "The coffee that I ordered"، تعود that على مفعول به لذا يمكن حذفها: "The coffee I ordered".'
      }
    ],
    whiteboardNotes: {
      title: 'Fast Relative Connections',
      pointsAr: [
        'لربط الأشخاص: who / that',
        'لربط الأشياء: which / that',
        'السر الاحترافي: إذا كان هناك فاعل جديد بعدها، احذف that تماماً!'
      ],
      pointsEn: [
        'People: who / that',
        'Objects: which / that',
        'Pro tip: Drop "that" when followed by a new subject (e.g. "The car I bought")'
      ],
      chalkHighlight: 'The idea [that] you shared was brilliant!'
    }
  },

  // ==========================================
  // ADVANCED LEVEL (C1) - Lessons 21 to 30
  // ==========================================
  {
    id: 'sg_103',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قوالب السرد القصصي السلس وربط الأحداث (Storytelling Connectors)',
    titleEn: 'Seamless Narrative Flow & Conversational Transitions',
    descAr: 'كيف تروي قصة أو موقفاً حصل لك بسلاسة دون أن تقول "And... and... and..." باستمرار.',
    descEn: 'Narrate experiences with natural rhythm, transitions, and native suspense markers.',
    speakingGoalAr: 'رواية موقف حدث لك بالأمس في 45 ثانية مع سارة بربط سلس.',
    speakingGoalEn: 'Share an anecdote smoothly using natural transitions instead of repeated "and".',
    keyPattern: {
      ruleAr: 'استخدم روابط السرد التحدثي مثل: Out of nowhere (فجأة وبدون مقدمات)، It turned out that (اتضح أن)، Long story short (باختصار).',
      ruleEn: 'Deploy dynamic story markers to maintain curiosity and flow.',
      formula: '[Context] ➡️ [Out of nowhere...] ➡️ [It turned out that...] ➡️ [Long story short...]'
    },
    practicalExamples: [
      {
        en: "I was just about to leave my office, and out of nowhere, my boss showed up.",
        ar: 'كنت على وشك مغادرة مكتبي، وفجأة وبدون سابق إنذار ظهر مديري.',
        spokenNoteAr: 'out of nowhere تنطق بنبرة مفاجأة لشد انتباه المستمع.'
      },
      {
        en: "It turned out that we were both attending the same conference in London.",
        ar: 'اتضح في النهاية أننا كنا نحضر المؤتمر ذاته في لندن.',
        spokenNoteAr: 'It turned out تعبير سردي ذكي يكشف المفاجأة في القصة.'
      },
      {
        en: "Long story short, we ended up launching the product two weeks ahead of schedule.",
        ar: 'باختصار وموجز القصة، انتهى بنا الأمر بإطلاق المنتج قبل موعده بأسبوعين.',
        spokenNoteAr: 'Long story short أسلوب مثالي لإنهاء السرد وتقديم الخلاصة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "And then I went, and then he said, and then we ate...",
        correct: "Meanwhile, suddenly, as it turned out...",
        whyAr: 'تكرار and then يقتل جاذبية القصة ويشعر المستمع بالملل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اروِ لسارة موقفاً طريفاً أو مفاجئاً واختمه بعبارة Long story short!',
      promptEn: 'Tell Sara a brief surprising event and conclude with "Long story short"!',
      saraQuestionAr: 'Has anything unexpected happened to you recently?',
      saraQuestionEn: 'Has anything unexpected happened to you recently?',
      recommendedResponseEn: "I lost my car keys this morning, but it turned out they were in my pocket all along! Long story short, I still made it on time."
    },
    quiz: [
      {
        questionAr: 'ما التعبير الأنسب لختام قصة طويلة والوصول إلى نتيجتها النهائية بسرعة؟',
        questionEn: 'Which idiomatic phrase best transitions a story to its punchline/conclusion?',
        options: [
          "Short story long",
          "Long story short",
          "Story is short",
          "At first glance"
        ],
        correctIndex: 1,
        explanationAr: 'تعبير "Long story short" هو التعبير الاصطلاحي الشهير بمعنى "باختصار شديد".'
      }
    ],
    whiteboardNotes: {
      title: 'Storytelling Connectors Toolkit',
      pointsAr: [
        '1. المفاجأة: Out of nowhere... (فجأة وبدون مقدمات)',
        '2. الكشف: It turned out that... (اتضح أن الأمر...)',
        '3. النتيجة: We ended up... (انتهى بنا المطاف إلى...)',
        '4. الختام: Long story short... (باختصار)'
      ],
      pointsEn: [
        '1. Suspense: "Out of nowhere..."',
        '2. Revelation: "It turned out that..."',
        '3. Outcome: "We ended up [Verb-ing]..."',
        '4. Punchline: "Long story short..."'
      ],
      chalkHighlight: 'Out of nowhere ➡️ It turned out ➡️ Long story short'
    }
  },
  {
    id: 'sg_121',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب القلب البلاغي للتركيز والهيبة (Spoken Inversion)',
    titleEn: 'Conversational Inversion: Not only... but also & Rarely have I',
    descAr: 'كيف تضفي قوة استثنائية ونبرة قيادية على حديثك وعروضك التقديمية بقلب ترتيب الجملة.',
    descEn: 'Use advanced inversion to highlight crucial insights in presentations and discussions.',
    speakingGoalAr: 'إلقاء جملة قوية في اجتماع أو عرض تقديمي باستخدام Not only... but also.',
    speakingGoalEn: 'Deliver an inverted sentence smoothly to create high-impact rhetorical emphasis.',
    keyPattern: {
      ruleAr: 'عند بدء الجملة بظرف منفي أو مقيد (Not only, Rarely, Seldom)، نقلب الفعل المساعد والفاعل تماماً كالسؤال.',
      ruleEn: 'Starting with negative/restrictive adverbs triggers question word-order for emphasis.',
      formula: 'Not only + [Auxiliary] + [Subject] + [Verb], but [Subject] also...'
    },
    practicalExamples: [
      {
        en: "Not only did we meet our quarterly target, but we also doubled our customer retention.",
        ar: 'لم نقتصر على تحقيق هدفنا الربع سنوي فحسب، بل ضاعفنا أيضاً نسبة استبقاء العملاء.',
        spokenNoteAr: 'نبرة قيادية ومقنعة جداً في العروض الرسمية.'
      },
      {
        en: "Rarely have I seen such an enthusiastic team spirit.",
        ar: 'نادراً ما رأيت روح فريق مفعمة بالحماس كهذه.',
        spokenNoteAr: 'Rarely have I تعطي وزناً وهيبة للمديح والتقدير.'
      },
      {
        en: "Little did I know that this decision would redefine my career.",
        ar: 'ما كنت أدري حينها قط أن هذا القرار سيعيد صياغة مسيرتي المهنية بالكامل.',
        spokenNoteAr: 'تعبير سردي درامي مشوق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Not only we met our target, but also...",
        correct: "Not only did we meet our target, but...",
        whyAr: 'عند البدء بـ Not only يجب قلب الفعل المساعد مع الفاعل (did we meet).'
      }
    ],
    speakingChallenge: {
      promptAr: 'قدم لسارة جملة تمدح فيها إتقانها وودها باستخدام Not only... but also!',
      promptEn: 'Compliment Sara using formal inversion: "Not only do you... but you also..."!',
      saraQuestionAr: 'How are you finding our advanced speaking sessions together?',
      saraQuestionEn: 'How are you finding our advanced speaking sessions together?',
      recommendedResponseEn: "Not only do you explain patterns clearly, but you also make every conversation truly engaging!"
    },
    quiz: [
      {
        questionAr: 'اختر الترتيب الصحيح للجملة بعد "Seldom":',
        questionEn: 'Which inversion sentence is grammatically flawless?',
        options: [
          "Seldom I have witnessed such passion.",
          "Seldom have I witnessed such passion.",
          "Seldom do I witnessed such passion.",
          "Seldom did have I witnessed such passion."
        ],
        correctIndex: 1,
        explanationAr: 'بعد Seldom نضع الفعل المساعد have أولاً ثم الفاعل I: Seldom have I witnessed.'
      }
    ],
    whiteboardNotes: {
      title: 'Executive Inversion Formula',
      pointsAr: [
        'Not only + [فعل مساعد] + [فاعل] + [فعل]...',
        'Rarely have I... (نادراً ما شاهدت...)',
        'Little did we know... (ما كان يخطر ببالنا...)',
        'تمنحك لغة كبار التنفيذيين والخطباء'
      ],
      pointsEn: [
        'Not only + [Aux] + [Subject] + [Verb]...',
        'Rarely have I + [V3]...',
        'Little did we know...',
        'Elevates speech to executive boardroom tier'
      ],
      chalkHighlight: 'Not only did we + [Verb], but we also + [Verb]'
    }
  },
  {
    id: 'sg_122',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب الشرط المختلط للواقع المعاصر (Mixed Conditionals in Practice)',
    titleEn: 'Mixed Conditionals: Linking Past Decisions to Present Realities',
    descAr: 'كيف تشرح أثر قرار اتخذته في الماضي على حياتك الحالية دون تلعثم في الأزمنة المركبة.',
    descEn: 'Connect past historical decisions with their present ongoing consequences.',
    speakingGoalAr: 'التحدث عن قرار ماضٍ غيّر وضعك الحالي للأفضل باستخدام الشرط المختلط.',
    speakingGoalEn: 'Articulate how a specific past event directly shapes your present life.',
    keyPattern: {
      ruleAr: 'لو حدث شيء في الماضي (Had + V3)، لكان وضعي الحالي الآن مختلفاً (Would + مصدر).',
      ruleEn: 'Past cause (If + had + V3) ➡️ Present result (would + base verb today).',
      formula: "If I hadn't + [V3 in past], I wouldn't be + [in present state today]"
    },
    practicalExamples: [
      {
        en: "If I hadn't taken that English course last year, I wouldn't be working at this global firm today.",
        ar: 'لو لم أكن قد التحقت بتلك الدورة العام الماضي، لما كنت أعمل في هذه الشركة العالمية اليوم.',
        spokenNoteAr: 'ربط عبقري بين سبب ماضٍ منتهٍ ونتيجة معيشة في الحاضر.'
      },
      {
        en: "If we had closed the deal earlier, we'd be leading the market right now.",
        ar: 'لو كنا قد أتممنا الصفقة مبكراً، لكنا نقود السوق في هذه اللحظة.',
        spokenNoteAr: "we'd be leading تعبير مستمر في الوقت الحالي."
      },
      {
        en: "If I weren't so busy today, I would have joined your morning run.",
        ar: 'لو لم أكن مشغولاً جداً اليوم (حالة حاضرة)، لكنت قد شاركتك في الركض الصباحي (حدث ماضٍ).',
        spokenNoteAr: 'النوع العكسي من الشرط المختلط: حالة راهنة أثرت على حدث سابق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "If I didn't learn English, I wouldn't work here today.",
        correct: "If I hadn't learned English, I wouldn't be working here today.",
        whyAr: 'لأن التعلم كان في الماضي (hadn\'t learned)، والعمل مستمر في الحاضر (wouldn\'t be working).'
      }
    ],
    speakingChallenge: {
      promptAr: 'شارك سارة حقيقة واقعية: لو لم تقرر تعلم الإنجليزية، ماذا كان سيفوتك اليوم؟',
      promptEn: 'Tell Sara how learning English shapes your opportunities right now!',
      saraQuestionAr: 'How has learning English impacted your current journey?',
      saraQuestionEn: 'How has learning English impacted your current journey?',
      recommendedResponseEn: "If I hadn't committed to English, I wouldn't be feeling this confident in international discussions today!"
    },
    quiz: [
      {
        questionAr: 'اختر الجملة التي تعبر بدقة عن شرط مختلط (سبب ماضٍ ونتيجة حاضرة):',
        questionEn: 'Which sentence correctly demonstrates a mixed conditional?',
        options: [
          "If I bought the car yesterday, I drive it today.",
          "If I had bought the car yesterday, I would be driving it today.",
          "If I had bought the car, I will drive it.",
          "If I buy the car, I would drive it."
        ],
        correctIndex: 1,
        explanationAr: 'الصيغة الدقيقة: If I had bought (ماضٍ تام) ... I would be driving (مضارع افتراضي).'
      }
    ],
    whiteboardNotes: {
      title: 'The Mixed Conditional Bridge',
      pointsAr: [
        'جسر زمني بين الماضي والحاضر:',
        'الماضي: If I had / hadn\'t + V3',
        'الحاضر: ...I would / wouldn\'t be + [حالة الحاضر]',
        'تجعلك تتحدث كالمفكرين والمحللين الاستراتيجيين'
      ],
      pointsEn: [
        'Time Bridge: Past decision ➡️ Present impact',
        'Cause in Past: If I had/hadn\'t + V3',
        'Result Today: ...I would/wouldn\'t be + [Present state]'
      ],
      chalkHighlight: 'If I had [Past V3] ➡️ I would be [Today]'
    }
  },
  {
    id: 'sg_123',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب الجمل المجتزأة لتسليط الضوء (Cleft Sentences)',
    titleEn: 'Emphatic Cleft Sentences: What really matters is...',
    descAr: 'كيف تركز انتباه المستمعين على فكرتك الجوهرية وتمنع أي سوء فهم في النقاشات الحساسة.',
    descEn: 'Highlight the single most vital variable in your argument using cleft structures.',
    speakingGoalAr: 'إعادة صياغة نقطة محورية في نقاش باستخدام What I really mean is...',
    speakingGoalEn: 'Deploy cleft focus phrases to direct listener attention to your thesis.',
    keyPattern: {
      ruleAr: 'بدلاً من قول "Consistency matters"، نقول: "What really matters is consistency" لمضاعفة الأثر عشر مرات.',
      ruleEn: 'Start with "What [Clause] is [Focus item]" or "It was [Focus item] that..." for emphasis.',
      formula: 'What we really need is + [Focus Point] | It was [X] that created [Y]'
    },
    practicalExamples: [
      {
        en: "What we really need right now is absolute clarity, not more data.",
        ar: 'ما نحتاجه حقاً الآن هو الوضوح التام، وليس المزيد من البيانات.',
        spokenNoteAr: 'نبرة حاسمة تنهي التشتت في الاجتماعات.'
      },
      {
        en: "What struck me most was his complete calmness under immense pressure.",
        ar: 'أكثر ما لفت انتباهي وأدهشني كان هدوءه الكامل تحت الضغط الشديد.',
        spokenNoteAr: 'What struck me most أسلوب سردي راقٍ للتأمل.'
      },
      {
        en: "It was Sarah who first identified the root cause of the glitch.",
        ar: 'كانت سارة هي أول من حدد السبب الجذري للخلل التقني.',
        spokenNoteAr: 'صيغة It was... that تنسب الفضل بدقة لصاحبه.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "What I need it is more time.",
        correct: "What I need is more time.",
        whyAr: 'لا تكرر الضمير it لأن عبارة What I need هي فاعل الجملة بالفعل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أخبر سارة بما تحتاجه حقاً للوصول للطلاقة التامة باستخدام What I really need is...!',
      promptEn: 'Tell Sara what you truly need for fluency using "What I really need is..."!',
      saraQuestionAr: 'When you reflect on your English goals, what stands out as most vital?',
      saraQuestionEn: 'When you reflect on your English goals, what stands out as most vital?',
      recommendedResponseEn: "What I really need is daily immersion and the courage to make mistakes without hesitating!"
    },
    quiz: [
      {
        questionAr: 'كيف تحول جملة "I love her work ethic" إلى جملة Cleft توكيدية مشددة؟',
        questionEn: 'How do you convert "I love her work ethic" into an emphatic cleft sentence?',
        options: [
          "What I love is her work ethic.",
          "I love what her work ethic is.",
          "Her work ethic what I love.",
          "It love her work ethic."
        ],
        correctIndex: 0,
        explanationAr: 'الصيغة التوكيدية هي: What I love is her work ethic (ما أحبه حقاً هو أخلاقياتها في العمل).'
      }
    ],
    whiteboardNotes: {
      title: 'Emphatic Cleft Architecture',
      pointsAr: [
        '1. العبارة المبتدئة بـ What: What we need is action.',
        '2. العبارة المبتدئة بـ It: It was his vision that drove success.',
        '3. أثرها: تجعل المستمع يصمت وينتبه للنقطة الفاصلة فوراً'
      ],
      pointsEn: [
        '1. Wh- Cleft: What we need is [Target]',
        '2. It- Cleft: It was [Entity] that achieved [Result]',
        '3. Psychological effect: Commands instant focused attention'
      ],
      chalkHighlight: 'What really matters is + [Your Core Point]'
    }
  },
  {
    id: 'sg_124',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب التحوط والدبلوماسية المهنية (Conversational Hedging)',
    titleEn: 'Diplomatic Hedging: It appears that, Tend to & Arguably',
    descAr: 'كيف تعبر عن آرائك المهنية كالمستشارين والخبراء دون تعميمات جازمة قد تؤخذ ضدك.',
    descEn: 'Soften absolute claims and convey expert nuance with sophisticated hedges.',
    speakingGoalAr: 'إبداء رأي تحليلي في استراتيجية عمل باستخدام tend to و it appears that.',
    speakingGoalEn: 'Present analytical conclusions diplomatically without dogmatic assertions.',
    keyPattern: {
      ruleAr: 'بدلاً من الجزم المطلق (People are lazy)، نستخدم أدوات التحوط: People tend to hesitate, It seems that, Arguably.',
      ruleEn: 'Replace absolute dogmatism with calibrated modifiers like "tend to", "it seems", and "to some extent".',
      formula: 'Subject + tends to + [Verb] | It appears that + [Clause]'
    },
    practicalExamples: [
      {
        en: "It appears that our initial projections were slightly overly optimistic.",
        ar: 'يبدو من واقع البيانات أن توقعاتنا الأولية كانت متفائلة أكثر مما ينبغي قليلاً.',
        spokenNoteAr: 'طريقة لبقة ومحترفة للاعتراف بالخطأ دون إحراج أحد.'
      },
      {
        en: "Team members tend to be much more engaged when they own their KPIs.",
        ar: 'يميل أعضاء الفريق إلى أن يكونوا أكثر تفاعلاً حينما يمتلكون مؤشرات أدائهم.',
        spokenNoteAr: 'tend to تبين أن هذا سلوك عام وشائع وليس حكماً جازماً.'
      },
      {
        en: "This is arguably the most resilient framework we have designed so far.",
        ar: 'من المرجح وبقوة أن هذا هو الإطار الأكثر متانة الذي صممناه حتى الآن.',
        spokenNoteAr: 'arguably كلمة راقية تستخدم عند تقديم حجة قابلة للنقاش.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "This product is 100% bad and everyone hates it.",
        correct: "Feedback suggests that users tend to find the interface somewhat unintuitive.",
        whyAr: 'التعميمات الفجة تفقدك المصداقية؛ التحوط يظهر نضجك التحليلي.'
      }
    ],
    speakingChallenge: {
      promptAr: 'عبر لسارة عن رأيك في سبب خوف البعض من التحدث بالإنجليزية باستخدام tend to!',
      promptEn: 'Explain why many hesitate to speak English using "tend to"!',
      saraQuestionAr: 'Why do you think so many smart learners freeze up when speaking?',
      saraQuestionEn: 'Why do you think so many smart learners freeze up when speaking?',
      recommendedResponseEn: "Learners tend to obsess over grammatical perfection, which arguably fuels performance anxiety."
    },
    quiz: [
      {
        questionAr: 'ما الكلمة التي تعطي وزناً تحليلياً راقياً بمعنى "يمكن القول بحجة قوية"؟',
        questionEn: 'Which adverb diplomatically signals a well-defended, defensible assertion?',
        options: [
          "Arguably",
          "Angrily",
          "Accidentally",
          "Awfully"
        ],
        correctIndex: 0,
        explanationAr: 'كلمة Arguably تعني "من الممكن القول بحجة متينة" وتستخدم بكثرة في الحديث القيادي والتحليلي.'
      }
    ],
    whiteboardNotes: {
      title: 'The Art of Executive Hedging',
      pointsAr: [
        '1. Tend to + مصدر (يميل عادة إلى...)',
        '2. It appears / seems that... (يتضح من المعطيات أن...)',
        '3. Arguably... (يمكن القول بحجة معتبرة...)',
        'تجنب الأحكام القطعية: Always / Never / 100%'
      ],
      pointsEn: [
        '1. Subject + tends to + [Verb]',
        '2. It appears that...',
        '3. Arguably the best approach...',
        'Rule: Nuance reflects intellectual maturity'
      ],
      chalkHighlight: 'Tend to ➡️ It appears that ➡️ Arguably'
    }
  },
  {
    id: 'sg_125',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب صيغة النصب التوصياتية الرسمية (The Mandative Subjunctive)',
    titleEn: 'Executive Mandates: I recommend that he be present',
    descAr: 'كيف تقدم توصيات وقرارات رسمية رفيعة المستوى باستخدام صيغة الفعل المجرد حتى مع He و She.',
    descEn: 'Deploy the mandative subjunctive in corporate governance and formal recommendations.',
    speakingGoalAr: 'تقديم توصية تنظيمية لفريق العمل باستخدام recommend that he be...',
    speakingGoalEn: 'State an authoritative corporate recommendation with the subjunctive mood.',
    keyPattern: {
      ruleAr: 'بعد أفعال الطلب والتوصية (recommend, suggest, insist, demand) يأتي الفعل مجرداً من أي إضافات حتى مع المفرد الغائب.',
      ruleEn: 'Verbs of recommendation take bare infinitives in that-clauses: suggest that he BE / do / arrive.',
      formula: 'I recommend that + [Subject] + [Bare Infinitive Verb (be / do / attend)]'
    },
    practicalExamples: [
      {
        en: "I strongly recommend that the project lead be informed immediately.",
        ar: 'أوصي بشدة بأن يتم إخطار قائد المشروع على الفور.',
        spokenNoteAr: 'لاحظ استخدام be وليس is لأنها صيغة توصية رسمية.'
      },
      {
        en: "The board insisted that he submit the revised audit by Monday.",
        ar: 'أصر مجلس الإدارة على أن يقدم التدقيق المالي المعدل بحلول يوم الاثنين.',
        spokenNoteAr: 'لاحظ: submit بدون حرف s رغم أن الفاعل he.'
      },
      {
        en: "It is crucial that everyone remain fully aligned during this transition.",
        ar: 'من الأهمية بمكان أن يظل الجميع على توافق تام خلال هذه المرحلة الانتقالية.',
        spokenNoteAr: 'remain بدون s رغم أن الفاعل everyone.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I suggest that she is on time.",
        correct: "I suggest that she be on time.",
        whyAr: 'في صيغة Subjunctive الرسمية نستخدم الفعل الأساسي be دائماً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'قدم لسارة توصية رسمية باجتماع المراجعة الأسبوعي!',
      promptEn: 'Propose an executive review meeting using "I suggest that we hold..."!',
      saraQuestionAr: 'How should we maintain our high standards across teams?',
      saraQuestionEn: 'How should we maintain our high standards across teams?',
      recommendedResponseEn: "I suggest that each team lead be present at a weekly 15-minute sync."
    },
    quiz: [
      {
        questionAr: 'اختر الصيغة الرسمية الصحيحة: "The manager insisted that he ______ the contract."',
        questionEn: 'Choose the correct formal mandative subjunctive form:',
        options: [
          "signs",
          "sign",
          "signed",
          "to sign"
        ],
        correctIndex: 1,
        explanationAr: 'في صيغة Subjunctive بعد insisted that يأتي الفعل في المصدر المجرد دون s: sign.'
      }
    ],
    whiteboardNotes: {
      title: 'The Mandative Subjunctive',
      pointsAr: [
        'أفعال التوصية: Recommend, Suggest, Insist, Demand',
        'القاعدة الصادمة للمبتدئين: الفعل يظل مجرداً تماماً مع He و She!',
        'مثال: I insist that he be here (وليس he is)'
      ],
      pointsEn: [
        'Verbs: Recommend, Suggest, Insist, Demand',
        'Bare infinitive for all persons: He be / She attend / It remain',
        'High hallmark of executive C1 English'
      ],
      chalkHighlight: 'I suggest that he [be / attend / review]'
    }
  },
  {
    id: 'sg_126',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب الجمل الحالية الموجزة (Participle Clauses in Spoken Cadence)',
    titleEn: 'Participle Clauses: Compressing Ideas with Elegance',
    descAr: 'كيف تختصر جملتين في عبارة رشيقة تبدأ بـ Having done أو Looking back لتعطي حديثك إيقاعاً ساحراً.',
    descEn: 'Condense background context and sequences into punchy participial openers.',
    speakingGoalAr: 'افتتاح حديثك بعبارة حالية رشيقة مثل Having analyzed the situation.',
    speakingGoalEn: 'Frame a conclusion using a perfect or present participle clause.',
    keyPattern: {
      ruleAr: 'استخدم Having + V3 لتلخيص خطوة سابقة وانتقل مباشرة للخطوة الحالية دون مقدمات مكررة.',
      ruleEn: 'Use "Having + V3" to package prior actions concisely before launching into the main result.',
      formula: 'Having + [V3], [Subject] + [Main Action / Conclusion]'
    },
    practicalExamples: [
      {
        en: "Having weighed all the available options, we decided to pivot toward mobile development.",
        ar: 'بعد أن وازنا كافة الخيارات المتاحة، قررنا التحول نحو تطوير تطبيقات الجوال.',
        spokenNoteAr: 'بداية مختصرة وبليغة تغنيك عن تكرار "Because we had weighed...".'
      },
      {
        en: "Looking back at the past twelve months, our perseverance truly paid off.",
        ar: 'بالنظر إلى الوراء إلى الاثني عشر شهراً الماضية، فقد أثمر إصرارنا بحق.',
        spokenNoteAr: 'Looking back افتتاحية تأملية عاطفية ملهمة.'
      },
      {
        en: "Realizing the urgency of the matter, she dialed the CEO directly.",
        ar: 'إدراكاً منها لمدى إلحاح الأمر، اتصلت بالرئيس التنفيذي مباشرة.',
        spokenNoteAr: 'Realizing the urgency تختصر شعورها وسبب تصرفها في كلمتين.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Having arrived at the station, the train left.",
        correct: "Having arrived at the station, we saw the train leave.",
        whyAr: 'خطأ الفاعل المعلق (Dangling participle)؛ يجب أن يكون فاعل الجملة الرئيسية هو نفس فاعل الفعل الأول.'
      }
    ],
    speakingChallenge: {
      promptAr: 'شارك سارة حكمة خرجت بها من تجربتك بالبدء بـ Looking back at...!',
      promptEn: 'Share a life reflection starting with "Looking back at..."!',
      saraQuestionAr: 'How do you view the challenges you overcame in your journey?',
      saraQuestionEn: 'How do you view the challenges you overcame in your journey?',
      recommendedResponseEn: "Looking back at those obstacles, I realize they were exactly what shaped my resilience today!"
    },
    quiz: [
      {
        questionAr: 'ما المعنى الدقيق لعبارة "Having reviewed the data, we signed the agreement"؟',
        questionEn: 'What does "Having reviewed the data, we signed the agreement" mean?',
        options: [
          "Before reviewing the data, we signed.",
          "After we had thoroughly reviewed the data, we signed.",
          "While we were signing, someone reviewed.",
          "We never reviewed the data."
        ],
        correctIndex: 1,
        explanationAr: 'صيغة Having + V3 تدل على اكتمال الفعل الأول تماماً قبل الشروع في الفعل الثاني.'
      }
    ],
    whiteboardNotes: {
      title: 'Participle Clause Polish',
      pointsAr: [
        '1. Having + V3 ⬅️ تعني "بعد أن أتممنا كذا..." (Having seen the report...)',
        '2. Verb-ing في البداية ⬅️ تصف الحالة المتزامنة (Knowing the risk...)',
        '3. النتيجة: حديث رشيق يخلو من الحشو والروابط الركيكة'
      ],
      pointsEn: [
        '1. Having + V3 = After completing prior action',
        '2. Present participle (-ing) = Simultaneous background state',
        '3. Renders speech crisp and cinematic'
      ],
      chalkHighlight: 'Having + [V3] ➡️ Main Action'
    }
  },
  {
    id: 'sg_127',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب التنازل البلاغي والتسليم الذكي (Advanced Concession Patterns)',
    titleEn: 'Nuanced Concessions: Be that as it may & Notwithstanding',
    descAr: 'كيف تعترف بنقطة الخصم أو المشكلة في النقاش وتتجاوزها بذكاء دون أن تضعف موقفك التفاوضي.',
    descEn: 'Concede counterarguments gracefully while firmly steering towards your strategic goal.',
    speakingGoalAr: 'إبداء موافقة جزئية على اعتراض ثم الالتفاف نحو الحل المقترح بـ Be that as it may.',
    speakingGoalEn: 'Acknowledge an objection graciously and pivot back to your core proposal.',
    keyPattern: {
      ruleAr: 'استخدم عبارات التنازل الراقية: "Be that as it may" (مهما يكن من أمر)، "Even so" (ورغم ذلك كله)، لتجاوز العقبات في الحوار.',
      ruleEn: 'Deploy diplomatic concessions to validate concerns before steering the narrative.',
      formula: '[Valid Point] ➡️ Be that as it may, [Your Primary Strategy]'
    },
    practicalExamples: [
      {
        en: "I understand the timeline is tight. Be that as it may, compromising on quality is off the table.",
        ar: 'أتفهم ضيق الوقت، ولكن مهما يكن من أمر، فإن المساومة على الجودة أمر غير وارد إطلاقاً.',
        spokenNoteAr: 'حزم دبلوماسي فائق يحترم الواقع ولا يتنازل عن المعايير.'
      },
      {
        en: "Even so, we cannot afford to lose momentum at this crucial stage.",
        ar: 'رغم ذلك كله، لا يمكننا تحمل خسارة الزخم في هذه المرحلة الحاسمة.',
        spokenNoteAr: 'Even so تعيد توجيه الطاقة نحو التقدم.'
      },
      {
        en: "Much as I respect their feedback, our data paints a totally different picture.",
        ar: 'بقدر ما أحترم ملاحظاتهم، إلا أن بياناتنا ترسم مشهداً مختلفاً تماماً.',
        spokenNoteAr: 'Much as I respect... طريقة لبقة لرفض وجهة نظر دون تقليل منها.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Although but we have problems.",
        correct: "Although we have problems, we will proceed / Even so, we will proceed.",
        whyAr: 'لا يجوز الجمع بين although و but في جملة واحدة أبداً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تقول إن المشروع مكلف. اعترف بالتكلفة ثم أعد التوجيه بـ Be that as it may!',
      promptEn: 'Sara notes the initiative is costly. Concede and pivot using "Be that as it may"!',
      saraQuestionAr: "This upgrade requires a substantial budget. Isn't that a big risk?",
      saraQuestionEn: "This upgrade requires a substantial budget. Isn't that a big risk?",
      recommendedResponseEn: "It is indeed a significant investment. Be that as it may, staying with obsolete software poses a far greater risk to our security."
    },
    quiz: [
      {
        questionAr: 'ما التعبير الاصطلاحي المتقدم الذي يعني "مهما يكن من أمر ومع الإقرار بذلك"؟',
        questionEn: 'Which advanced idiom translates to "Regardless of that truth, we must continue"?',
        options: [
          "Be that as it may",
          "So that it was",
          "As it may be that",
          "There that it is"
        ],
        correctIndex: 0,
        explanationAr: 'تعبير "Be that as it may" هو المصطلح البلاغي المعتمد للاعتراف بالنقطة وتجاوزها بحكمة.'
      }
    ],
    whiteboardNotes: {
      title: 'Mastering Strategic Concessions',
      pointsAr: [
        '1. Be that as it may... (مهما يكن من أمر)',
        '2. Even so... (رغم كل ما ذكر)',
        '3. Much as I appreciate your view... (بقدر تقديري لرأيك، إلا أن...)',
        'قوة التنازل تكمن في احترام المقابل ثم قيادة الدفة'
      ],
      pointsEn: [
        '1. "Be that as it may..." (Acknowledge and steer)',
        '2. "Even so..." (Resilient counter-focus)',
        '3. "Much as I appreciate..." (Gentle dissent)',
        'Validates counterparty while protecting strategy'
      ],
      chalkHighlight: 'Acknowledge ➡️ Be that as it may ➡️ Lead'
    }
  },
  {
    id: 'sg_128',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب التناسب الطردي والتطور المتوازي (The More... The Better)',
    titleEn: 'Double Comparatives: The More... The Better in Strategic Speech',
    descAr: 'كيف تصف العلاقات الطردية والنتائج المترتبة بأسلوب إيقاعي متناغم وسريع الحفظ.',
    descEn: 'Structure correlative cause-and-effect relationships with balanced cadence.',
    speakingGoalAr: 'صياغة علاقة طردية متوازنة في جملة واحدة باستخدام The [Comparative], the [Comparative].',
    speakingGoalEn: 'Deliver a double-comparative rhythmically with zero hesitation.',
    keyPattern: {
      ruleAr: 'كلما زاد الشق الأول، زاد الشق الثاني: نضع The متبوعة بصيغة مقارنة، ثم نكرر نفس التركيب في الشق الثاني.',
      ruleEn: 'Correlative comparatives balance two mirrored clauses: The + comparative, the + comparative.',
      formula: 'The + [Comparative + Subject + Verb], the + [Comparative + Subject + Verb]'
    },
    practicalExamples: [
      {
        en: "The more consistently you practice, the more effortless your fluency becomes.",
        ar: 'كلما مارست بانتظام أكبر، أصبحت طلاقتك أكثر عفوية وسهولة.',
        spokenNoteAr: 'جملة إيقاعية موسيقية تثبت في عقل السامع فوراً.'
      },
      {
        en: "The sooner we align on the scope, the faster we can ship the product.",
        ar: 'كلما توافقنا على نطاق العمل مبكراً، تمكنا من إطلاق المنتج أسرع.',
        spokenNoteAr: 'قالب ممتاز لإنجاز الأعمال في فرق التطوير.'
      },
      {
        en: "The higher the stakes, the calmer a leader must remain.",
        ar: 'كلما تعاظمت الرهانات والمخاطر، كان لزاماً على القائد أن يكون أكثر هدوءاً.',
        spokenNoteAr: 'حكمة قيادية مصاغة بقالب التناسب الطردي.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "More you practice, more you learn.",
        correct: "The more you practice, the more you learn.",
        whyAr: 'يجب وضع أداة التعريف The قبل كلا الشقين لتحقيق التوازن اللغوي السليم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'صغ لسارة حكمة عن التعلم باستخدام The more... the better!',
      promptEn: 'Craft a learning maxim for Sara using a double comparative!',
      saraQuestionAr: 'What is your core philosophy about continuous self-improvement?',
      saraQuestionEn: 'What is your core philosophy about continuous self-improvement?',
      recommendedResponseEn: "The more curious you stay, the richer your journey through life becomes!"
    },
    quiz: [
      {
        questionAr: 'أكمل الجملة المتوازنة: "The earlier we leave, ______ the traffic will be."',
        questionEn: 'Complete the double comparative: "The earlier we leave, ______ the traffic will be."',
        options: [
          "the lighter",
          "lighter",
          "more light",
          "the more lightly"
        ],
        correctIndex: 0,
        explanationAr: 'يجب أن تبدأ المقارنة الثانية بـ The متبوعة بصيغة المقارنة: the lighter.'
      }
    ],
    whiteboardNotes: {
      title: 'The Double Comparative Rhythm',
      pointsAr: [
        'The + [مقارنة 1]... ⬅️ the + [مقارنة 2]...',
        'The sooner, the better (كلما كان أبكر كان أفضل)',
        'The more you read, the better you speak',
        'تمنح كلامك إيقاعاً متوازناً كالشعر والمقولات الخالدة'
      ],
      pointsEn: [
        'The + comparative, the + comparative',
        'The sooner, the better',
        'The more you listen, the clearer your pronunciation',
        'Memorable, punchy, rhetorical symmetry'
      ],
      chalkHighlight: 'The [More / Sooner], the [Better / Faster]'
    }
  },
  {
    id: 'sg_129',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب أدوات التأطير والمناظرة القيادية (Discourse Framing Markers)',
    titleEn: 'Discourse Framing & Perspective Shifters for High-Stakes Panels',
    descAr: 'كيف تضع الأرقام والأفكار في سياقها الصحيح (To put this into perspective, On balance, In retrospect).',
    descEn: 'Frame complex concepts seamlessly in executive briefings and expert panel discussions.',
    speakingGoalAr: 'وضع رقم أو معلومة في إطار مفهوم ومؤثر باستخدام To put this into perspective.',
    speakingGoalEn: 'Provide contextual clarity to data using executive framing markers.',
    keyPattern: {
      ruleAr: 'استخدم أدوات التأطير الذكي لربط التفاصيل بالصورة الكلية: "To put it into perspective", "On balance", "All things considered".',
      ruleEn: 'Deploy framing transitions to bridge granular data with macro-level strategic insight.',
      formula: '[Framing Marker] ➡️ [Contextual Comparison or Macro Synthesis]'
    },
    practicalExamples: [
      {
        en: "To put this into perspective, that single feature saved our users 20,000 hours this month.",
        ar: 'لو وضعنا هذا في نصابه وسياقه الصحيح، فإن تلك الميزة وحدها وفرت على مستخدمينا 20 ألف ساعة هذا الشهر.',
        spokenNoteAr: 'تحول الأرقام الجافة إلى قيمة ملموسة يفهمها المستمع فوراً.'
      },
      {
        en: "On balance, the long-term benefits clearly outweigh the initial upfront costs.",
        ar: 'عند الموازنة الشاملة بين جميع الجوانب، فإن الفوائد بعيدة المدى تفوق التكاليف الأولية بمراحل.',
        spokenNoteAr: 'On balance تلخص النقاش وتطرح حكماً متزناً وناضجاً.'
      },
      {
        en: "In retrospect, that unexpected pivot was the catalyst for our breakthrough.",
        ar: 'في ضوء النظر إلى الماضي، كان ذلك التحول المفاجئ هو المحفز لانطلاقتنا الكبرى.',
        spokenNoteAr: 'In retrospect تقدم حكمة مستخلصة بعد انقضاء الحدث.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "To make it in perspective...",
        correct: "To put this into perspective...",
        whyAr: 'التعبير الصحيح المعتمد في اللغة القيادية هو put something into perspective.'
      }
    ],
    speakingChallenge: {
      promptAr: 'لخص لسارة ما أنجزته حتى الآن في تعلم الإنجليزية باستخدام All things considered!',
      promptEn: 'Summarize your English learning progress using "All things considered"!',
      saraQuestionAr: 'Looking at your whole journey so far, how would you evaluate your progress?',
      saraQuestionEn: 'Looking at your whole journey so far, how would you evaluate your progress?',
      recommendedResponseEn: "All things considered, I've transformed from feeling hesitant into someone who truly enjoys real-time conversations!"
    },
    quiz: [
      {
        questionAr: 'ما التعبير المناسب لوضع رقم أو إحصائية في سياق يوضح حجمها وأهميتها للجمهور؟',
        questionEn: 'Which phrase is specifically used to contextualize scale and significance?',
        options: [
          "To put this into perspective",
          "To make this an excuse",
          "To keep this into silence",
          "To take this as granted"
        ],
        correctIndex: 0,
        explanationAr: 'عبارة "To put this into perspective" هي المصطلح القياسي لتوضيح حجم وأهمية المعطيات.'
      }
    ],
    whiteboardNotes: {
      title: 'Executive Perspective Framing',
      pointsAr: [
        '1. To put this into perspective... (لو وضعنا هذا في سياقه الصحيح)',
        '2. On balance... (في المحصلة الشاملة بعد وزن الأمور)',
        '3. In retrospect... (في ضوء ما تكشف لاحقاً)',
        '4. All things considered... (مع مراعاة جميع الظروف)'
      ],
      pointsEn: [
        '1. "To put this into perspective..." (Macro scaling)',
        '2. "On balance..." (Weighing pros vs cons)',
        '3. "In retrospect..." (Wisdom with hindsight)',
        '4. "All things considered..." (Holistic verdict)'
      ],
      chalkHighlight: 'To put this into perspective ➡️ Real Value'
    }
  },
  {
    id: 'sg_130',
    pillarId: 'grammar',
    pillarNameAr: 'القواعد التحدثية السريعة',
    pillarNameEn: 'Spoken Grammar & Fast Patterns',
    pillarIcon: '🧠',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'قالب التلخيص التنفيذي وختام الخطاب (The Executive Synthesis Pattern)',
    titleEn: 'Executive Synthesis: Distilling Complex Debates into Action',
    descAr: 'كيف تختم نقاشاً طويلاً أو اجتماعاً معقداً بـ 3 جمل محكمة تجمع الشتات وتحدد الخطوات القادمة.',
    descEn: 'Synthesize wide-ranging discussions into decisive strategic takeaways and next steps.',
    speakingGoalAr: 'تقديم خلاصة تنفيذية حاسمة لنقاش استمر 30 دقيقة في 45 ثانية فقط.',
    speakingGoalEn: 'Deliver a crisp 3-sentence executive wrap-up that drives action.',
    keyPattern: {
      ruleAr: 'قالب التلخيص الذهبي: 1) النقطة المرجعية (Where we stand) 2) الإجماع المشترك (The common ground) 3) الخطوة الحاسمة (The decisive next step).',
      ruleEn: 'The 3-Step Synthesis: Synthesize consensus ➡️ Highlight the core priority ➡️ Lock down ownership.',
      formula: 'To synthesize our discussion: [Common Ground] + Therefore, our immediate focus is + [Action]'
    },
    practicalExamples: [
      {
        en: "To synthesize our takeaways: we all agree that user retention is our north star, so let's double down on onboarding this sprint.",
        ar: 'لتلخيص مخرجات نقاشنا: نتفق جميعاً أن استبقاء المستخدمين هو بوصلتنا الأساسية، فلنكثف جهودنا إذن على تجربة البداية في هذه الدورة.',
        spokenNoteAr: 'تلخيص حاسم ينقل الفريق من النقاش إلى التنفيذ.'
      },
      {
        en: "At the end of the day, execution beats endless deliberation every single time.",
        ar: 'في نهاية المطاف، التنفيذ الفعلي يتفوق على المداولات العقيمة في كل مرة.',
        spokenNoteAr: 'At the end of the day أسلوب أمريكي شهير لإبراز الخلاصة الحاسمة.'
      },
      {
        en: "Moving forward, let's treat this pilot as our primary benchmark.",
        ar: 'انطلاقاً من هذه النقطة، لنتعامل مع هذا المشروع التجريبي كمعيارنا الأساسي للمستقبل.',
        spokenNoteAr: 'Moving forward أسلوب احترافي لتوجيه الأنظار للمستقبل.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Reopening the whole debate from scratch with new doubts at the end of the meeting.",
        correct: "Affirm the consensus, assign ownership, and set a concrete check-in milestone.",
        whyAr: 'إعادة فتح النقاش عند الختام يضيع الوقت ويهز الثقة في القرار.'
      }
    ],
    speakingChallenge: {
      promptAr: 'قدم لسارة تلخيصاً تنفيذياً حاسماً لخطتك في دراسة مسارات سارة التعليمية!',
      promptEn: 'Deliver an executive wrap-up to Sara regarding your dedication to mastering these tracks!',
      saraQuestionAr: 'How are you planning to leverage all 30 lessons across these four tracks?',
      saraQuestionEn: 'How are you planning to leverage all 30 lessons across these four tracks?',
      recommendedResponseEn: "To summarize my plan: I'm dedicating 15 minutes each morning to one lesson, practicing the speaking prompt out loud, and reviewing whiteboard highlights weekly!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل عبارة لافتتاح ختام تنفيذي جامع بعد جلسة عصف ذهني طويلة؟',
        questionEn: 'Which opener best signals a decisive, unifying executive wrap-up?',
        options: [
          "To synthesize our core takeaways...",
          "Maybe we should start from zero...",
          "I forgot what we talked about...",
          "Let's complain about the problems..."
        ],
        correctIndex: 0,
        explanationAr: 'عبارة "To synthesize our core takeaways" هي العبارة القيادية المعتمدة لجمع الأفكار والتوجه نحو العمل.'
      }
    ],
    whiteboardNotes: {
      title: 'The Executive Wrap-Up Protocol',
      pointsAr: [
        '1. الربط: To synthesize what we agreed on...',
        '2. البوصلة: Our north star is...',
        '3. التنفيذ: Moving forward, our immediate milestone is...',
        'الطلاقة ليست مجرد كلمات، بل قدرة على قيادة الحوار والقرار!'
      ],
      pointsEn: [
        '1. Consolidate: "To synthesize what we agreed on..."',
        '2. Anchor: "Our north star is [Core Priority]"',
        '3. Mobilize: "Moving forward, the immediate milestone is..."',
        'True fluency is strategic communicative leadership'
      ],
      chalkHighlight: 'Synthesize consensus ➡️ Anchor north star ➡️ Mobilize action'
    }
  }
];
