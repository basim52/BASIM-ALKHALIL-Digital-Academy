// ============================================================================
// 🎮 SARA SCENARIOS EDUCATIONAL CURRICULUM DATA
// الشرح الحقيقي، التمارين التطبيقية، واختبارات الإتقان لسيناريوهات سارة الـ 16
// ============================================================================

export interface ScenarioVocabItem {
  word: string;
  ipa: string;
  meaningAr: string;
  meaningEn: string;
  exampleEn: string;
  exampleAr: string;
  tip?: string;
}

export interface ScenarioGrammarPoint {
  titleAr: string;
  titleEn: string;
  formula: string;
  explanationAr: string;
  explanationEn: string;
  examples: string[];
}

export interface ScenarioDialogueLine {
  speaker: 'sara' | 'student';
  textEn: string;
  textAr: string;
}

export interface ScenarioExerciseItem {
  id: string;
  type: 'vocab' | 'grammar' | 'situation';
  titleAr: string;
  titleEn: string;
  instructionAr: string;
  instructionEn: string;
  promptEn: string;
  promptAr: string;
  options: string[];
  correctIndex: number;
  hintAr?: string;
  explanationAr: string;
}

export interface ScenarioQuizQuestion {
  id: string;
  questionEn: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

export interface ScenarioEducationalContent {
  scenarioId: string;
  conceptTitleAr: string;
  conceptTitleEn: string;
  conceptAr: string;
  conceptEn: string;
  pedagogicalGoalAr: string;
  pedagogicalGoalEn: string;
  vocabulary: ScenarioVocabItem[];
  grammar: ScenarioGrammarPoint;
  modelDialogue: ScenarioDialogueLine[];
  exercises: ScenarioExerciseItem[];
  quiz: ScenarioQuizQuestion[];
}

export const SARA_SCENARIO_CURRICULUM: Record<string, ScenarioEducationalContent> = {
  // ==========================================
  // 🎮 1. ألعاب وتقنية (Gaming & Tech)
  // ==========================================
  gaming_minecraft: {
    scenarioId: 'gaming_minecraft',
    conceptTitleAr: 'التواصل التكتيكي وتحديد المواقع في الألعاب التعاونية',
    conceptTitleEn: 'Tactical Communication & Spatial Coordinates in Co-Op Gaming',
    conceptAr: 'في الألعاب الجماعية والاتصال الصوتي (مثل Discord)، يحتاج اللاعب إلى إعطاء تعليمات سريعة ودقيقة ومشاركة الإحداثيات والتنبيه من الأخطار دون تردد.',
    conceptEn: 'In team voice chats, players must rapidly communicate coordinates, give tactical commands, and call out enemy threats.',
    pedagogicalGoalAr: 'إتقان صيغ الأمر السريع (Imperatives) واستخدام حروف الجر المكانية وأرقام الإحداثيات الرياضية بالإنجليزية.',
    pedagogicalGoalEn: 'Mastering fast tactical imperatives, spatial prepositions, and coordinate numbers in real-time gaming dialogue.',
    vocabulary: [
      {
        word: 'Coordinates',
        ipa: '/koʊˈɔːr.dɪ.nəts/',
        meaningAr: 'إحداثيات الموقع (X, Y, Z)',
        meaningEn: 'Numbers showing exact position on a map',
        exampleEn: 'My coordinates are X: 240, Y: 12, Z: -150.',
        exampleAr: 'إحداثياتي هي س: 240، ص: 12، ع: -150.',
        tip: 'انطق المقطع الأول /koʊ/ بوضوح دون ابتلاع حرف الواو.'
      },
      {
        word: 'Spawn',
        ipa: '/spɔːn/',
        meaningAr: 'يظهر / يرسبن في اللعبة',
        meaningEn: 'To appear or generate inside the game world',
        exampleEn: 'Monsters spawn in dark caverns.',
        exampleAr: 'تظهر الوحوش في الكهوف المظلمة.',
        tip: 'صوت /ɔː/ مفخم وممدود مثل كلمة "saw".'
      },
      {
        word: 'Fortress',
        ipa: '/ˈfɔːr.trəs/',
        meaningAr: 'حصن / قلعة محصنة',
        meaningEn: 'A heavily fortified stronghold or castle',
        exampleEn: 'We must defend the obsidian fortress gate.',
        exampleAr: 'يجب أن ندافع عن بوابة الحصن المبني من حجر الأوبسيديان.'
      },
      {
        word: 'Craft',
        ipa: '/kræft/',
        meaningAr: 'يصنع / يركب أدوات',
        meaningEn: 'To build or assemble items using materials',
        exampleEn: 'Let’s combine diamonds to craft enchanted armor.',
        exampleAr: 'دعنا ندمج الألماس لصناعة دروع مسحورة.'
      },
      {
        word: 'Sneak',
        ipa: '/sniːk/',
        meaningAr: 'يتسلل بخفة وسرية',
        meaningEn: 'To move quietly and stealthily',
        exampleEn: 'A Creeper is sneaking behind our wooden fence!',
        exampleAr: 'هناك وحش كليبر يتسلل خلف سياجنا الخشبي!'
      }
    ],
    grammar: {
      titleAr: 'أفعال الأمر التكتيكية وصيغة التنبيه السريع (Tactical Imperatives)',
      titleEn: 'Tactical Imperatives & Urgent Callouts',
      formula: 'Verb (Base Form) + Direction / Location! (e.g., Watch out! / Retreat! / Cover me!)',
      explanationAr: 'في ألعاب الجيمينج، نستخدم الفعل في المصدر مباشرة دون فاعل لإصدار أوامر سريعة منقذة للفريق.',
      explanationEn: 'Imperatives drop the subject pronoun ("You") to deliver rapid, urgent teamwork directives.',
      examples: [
        'Watch out behind you! (احذر خلفك!)',
        'Place the torch on the left wall! (ضع الشعلة على الجدار الأيسر!)',
        'Retreat to the base immediately! (انسحب إلى القاعدة فوراً!)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Hey teammate! I'm on Discord voice! I just spawned near the mountain base. What are your coordinates?",
        textAr: "مرحباً يا زميلي! أنا على صوت الديسكورد! لقد رسبنت قرب قاعدة الجبل. ما هي إحداثياتك؟"
      },
      {
        speaker: 'student',
        textEn: "Hey Sara! My coordinates are X: 240, Y: 12. I just found a deep cavern full of diamonds!",
        textAr: "أهلاً سارة! إحداثياتي هي X: 240, Y: 12. لقد وجدت للتو كهفاً عميقاً مليئاً بالألماس!"
      },
      {
        speaker: 'sara',
        textEn: "Awesome! Watch out for Creepers and skeletons near the dark corners! Should I craft torches?",
        textAr: "رائع! احذر من الوحوش قرب الزوايا المظلمة! هل أقوم بصناعة شعلات مضيئة؟"
      },
      {
        speaker: 'student',
        textEn: "Yes, craft 20 torches and bring obsidian so we can build the portal gate!",
        textAr: "نعم، اصنعي 20 شعلة واجلبي الأوبسيديان لنبني بوابة الانتقال!"
      }
    ],
    exercises: [
      {
        id: 'gm_ex1',
        type: 'vocab',
        titleAr: 'تمرين 1: تحديد الإحداثيات والمواقع',
        titleEn: 'Exercise 1: Vocabulary in Gaming Context',
        instructionAr: 'اختر الكلمة المناسبة لإكمال الجملة التكتيكية:',
        instructionEn: 'Choose the correct word to complete the callout:',
        promptEn: 'Quick, send me your _____ on Discord so I can teleport to your base!',
        promptAr: 'بسرعة، أرسل لي _____ عبر ديسكورد حتى أستطيع الانتقال إلى قاعدتك!',
        options: ['coordinates', 'vegetables', 'homework', 'pencils'],
        correctIndex: 0,
        hintAr: 'الكلمة التي تعني أرقام تحديد الموقع الجغرافي (X, Y, Z).',
        explanationAr: 'كلمة coordinates تعني إحداثيات الموقع وتُستخدم دائماً في ألعاب الفيديو لتحديد مكان اللاعب بدقة.'
      },
      {
        id: 'gm_ex2',
        type: 'grammar',
        titleAr: 'تمرين 2: صيغة الأمر السريع والتحذير',
        titleEn: 'Exercise 2: Tactical Imperative Callout',
        instructionAr: 'اختر الصيغة النحوية الصحيحة للتنبيه من الخطر:',
        instructionEn: 'Pick the grammatically correct urgent command:',
        promptEn: '_____ out! A zombie is attacking our castle door!',
        promptAr: '_____! هناك زومبي يهاجم باب قلعتنا!',
        options: ['Watch', 'Watching', 'Watched', 'To watch'],
        correctIndex: 0,
        hintAr: 'فعل الأمر في اللغة الإنجليزية يبدأ بالمصدر المجرد بدون أي إضافات.',
        explanationAr: 'في صيغة الأمر (Imperative)، نستخدم الفعل في المصدر (Watch out!) بدون s أو ing.'
      },
      {
        id: 'gm_ex3',
        type: 'situation',
        titleAr: 'تمرين 3: الرد المناسب في موقف اللعب',
        titleEn: 'Exercise 3: Situational Response',
        instructionAr: 'ما هو الرد الأفضل عندما تسألك سارة: "What should we craft with the diamonds?"',
        instructionEn: 'What is the best tactical response when Sara asks what to craft with diamonds?',
        promptEn: 'Sara: "What should we craft with the diamonds we just mined?"',
        promptAr: 'سارة: "ماذا ينبغي أن نصنع بالألماس الذي استخرجناه للتو؟"',
        options: [
          'Let’s craft diamond swords and enchanted chestplates to defeat the boss!',
          'I am eating a green apple at school.',
          'The weather is very sunny yesterday.',
          'My favorite subject is history.'
        ],
        correctIndex: 0,
        hintAr: 'اختر الرد الذي يركز على صناعة أسلحة ودروع لمواجهة الزعيم.',
        explanationAr: 'الرد الأول هو الأنسب لسياق اللعبة ويستخدم أفعالاً تكتيكية (craft, defeat).'
      }
    ],
    quiz: [
      {
        id: 'gm_q1',
        questionEn: 'Which term describes monsters appearing in the game environment?',
        questionAr: 'أي مصطلح يصف ظهور الوحوش أو الشخصيات في بيئة اللعبة؟',
        options: ['Spawn', 'Sleep', 'Bake', 'Drive'],
        correctIndex: 0,
        explanationAr: 'كلمة Spawn تعني الظهور أو التوالد داخل عالم اللعبة.'
      },
      {
        id: 'gm_q2',
        questionEn: 'Choose the correct preposition: "Place the chest _____ the two wooden doors."',
        questionAr: 'اختر حرف الجر الصحيح: "ضع الصندوق _____ البابين الخشبيين."',
        options: ['between', 'during', 'since', 'underneath of'],
        correctIndex: 0,
        explanationAr: 'نستخدم between عندما يكون الشيء بين عنصرين محددين (البابين).'
      },
      {
        id: 'gm_q3',
        questionEn: 'What does "Watch your six!" mean in tactical team voice chat?',
        questionAr: 'ماذا تعني عبارة "Watch your six!" في المحادثات التكتيكية للألعاب؟',
        options: [
          'Watch out behind you! (احذر خلفك مباشرة)',
          'It is six o’clock now (الساعة السادسة الآن)',
          'Count from one to six (عد من 1 إلى 6)',
          'Buy six items (اشتر ستة أشياء)'
        ],
        correctIndex: 0,
        explanationAr: 'في الاصطلاح العسكري والتكتيكي، الساعة 6 ترمز لجهة الخلف، فتعني "انتبه لظهرك / خلفك".'
      },
      {
        id: 'gm_q4',
        questionEn: 'Complete the sentence: "If we gather 10 obsidian blocks, we _____ build the Nether portal."',
        questionAr: 'أكمل الجملة الشرطية: "إذا جمعنا 10 كتل أوبسيديان، سنتمكن من بناء بوابة النذر."',
        options: ['can', 'could have', 'must to', 'are'],
        correctIndex: 0,
        explanationAr: 'في الجملة الشرطية الأولى (If + present, can/will + base verb)، نستخدم can للتعبير عن القدرة.'
      }
    ]
  },

  robotics_stem: {
    scenarioId: 'robotics_stem',
    conceptTitleAr: 'الابتكار التقني وبرمجة الحساسات في نادي الروبوت',
    conceptTitleEn: 'STEM Innovation & Sensor Calibration in Robotics Club',
    conceptAr: 'تعلم المصطلحات العلمية والبرمجية لشرح طريقة عمل الروبوت، وتشخيص الأخطاء البرمجية (Debugging)، ووصف استجابة الحساسات الذكية.',
    conceptEn: 'Master scientific and coding vocabulary to explain robotic sensors, debug control loops, and test navigation.',
    pedagogicalGoalAr: 'استخدام أسلوب السبب والنتيجة (Cause & Effect: when / if), ومصطلحات التقنية (sensors, code loop, calibrate).',
    pedagogicalGoalEn: 'Applying cause and effect structures and technological terms in STEM presentations.',
    vocabulary: [
      {
        word: 'Ultrasonic sensor',
        ipa: '/ˌʌl.trəˈsɑː.nɪk ˈsen.sər/',
        meaningAr: 'حساس الموجات فوق الصوتية (لقياس المسافة)',
        meaningEn: 'A sensor that calculates distance using sound waves',
        exampleEn: 'The ultrasonic sensor detects walls up to 2 meters away.',
        exampleAr: 'حساس الموجات فوق الصوتية يكشف الجدران على بعد يصل إلى مترين.'
      },
      {
        word: 'Calibrate',
        ipa: '/ˈkæl.ɪ.breɪt/',
        meaningAr: 'يعاير / يضبط الدقة',
        meaningEn: 'To adjust finely for precise accuracy',
        exampleEn: 'We must calibrate the steering wheels before the race.',
        exampleAr: 'يجب أن نعاير عجلات التوجيه قبل السباق.'
      },
      {
        word: 'Debug',
        ipa: '/diːˈbʌɡ/',
        meaningAr: 'يصحح الأخطاء البرمجية',
        meaningEn: 'To find and remove errors in code',
        exampleEn: 'Let’s debug this infinite loop so the robot turns left.',
        exampleAr: 'دعنا نصحح هذا التكرار اللانهائي لكي يلتف الروبوت لليسار.'
      },
      {
        word: 'Obstacle',
        ipa: '/ˈɑːb.stə.kəl/',
        meaningAr: 'عقبة / حاجز',
        meaningEn: 'An object that blocks your path',
        exampleEn: 'The robot maneuvers around every obstacle smoothly.',
        exampleAr: 'يناور الروبوت حول كل عقبة بسلاسة.'
      },
      {
        word: 'Velocity',
        ipa: '/vəˈlɑː.sə.t̬i/',
        meaningAr: 'السرعة المتجهة',
        meaningEn: 'Speed in a given direction',
        exampleEn: 'Increase motor velocity on the straight track.',
        exampleAr: 'زد سرعة المحرك في المسار المستقيم.'
      }
    ],
    grammar: {
      titleAr: 'روابط السبب والنتيجة الشرطية (Whenever / When + Present Simple)',
      titleEn: 'Cause & Effect Conditionals in Programming',
      formula: 'Whenever / If + [Condition in Present Simple], [Action / Reaction] (e.g. When the sensor detects a wall, the motors stop.)',
      explanationAr: 'في البرمجة والروبوتات، نستخدم الجمل الشرطية لوصف الخوارزمية (المدخلات والمخرجات).',
      explanationEn: 'Zero conditionals describe factual robotic algorithms and automatic sensor reactions.',
      examples: [
        'Whenever an obstacle is detected, the robot reverses. (كلما اكتُشفت عقبة، تراجع الروبوت للخلف.)',
        'If the battery voltage drops, the LED flashes red. (إذا انخفض جهد البطارية، ومض المؤشر بالأحمر.)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Welcome to the robotics arena! Our bot is powered on. Can you explain how you programmed the distance sensor?",
        textAr: "أهلاً بك في حلبة الروبوتات! الروبوت يعمل الآن. هل يمكنك شرح كيف برمجت حساس المسافة؟"
      },
      {
        speaker: 'student',
        textEn: "I programmed the ultrasonic sensor to send sound pulses. Whenever an obstacle is within 20 centimeters, the bot turns right.",
        textAr: "برمجت الحساس ليرسل نبضات صوتية. كلما كانت العقبة ضمن 20 سم، ينعطف الروبوت لليمين."
      },
      {
        speaker: 'sara',
        textEn: "Brilliant algorithm! What should we do if the wheels spin too fast on the arena floor?",
        textAr: "خوارزمية ذكية! ماذا نفعل إذا دارت العجلات بسرعة زائدة على أرضية الحلبة؟"
      },
      {
        speaker: 'student',
        textEn: "We can calibrate the motor power in the code to keep high traction and smooth steering.",
        textAr: "يمكننا معايرة طاقة المحرك في الكود للحفاظ على ثبات عالٍ وتوجيه سلس."
      }
    ],
    exercises: [
      {
        id: 'rob_ex1',
        type: 'vocab',
        titleAr: 'تمرين 1: مصطلحات البرمجة والتصحيح',
        titleEn: 'Exercise 1: Debugging Terminology',
        instructionAr: 'اختر المصطلح الصحيح للبحث عن خطأ في الكود البرمجي:',
        instructionEn: 'Choose the correct technical term for fixing errors in computer code:',
        promptEn: 'Our robot didn’t turn at the corner. We need to _____ the Python script.',
        promptAr: 'لم يلتف روبوتنا عند المنعطف. نحتاج إلى _____ كود بايثون.',
        options: ['debug', 'paint', 'freeze', 'swallow'],
        correctIndex: 0,
        hintAr: 'الكلمة التي تبدأ بـ de- وتعني تصحيح الأخطاء البرمجية.',
        explanationAr: 'كلمة debug تعني تصحيح الأخطاء البرمجية وإصلاح الثغرات في الكود.'
      },
      {
        id: 'rob_ex2',
        type: 'grammar',
        titleAr: 'تمرين 2: الجمل الشرطية للخوارزميات',
        titleEn: 'Exercise 2: Conditional Algorithm Logic',
        instructionAr: 'اختر الصيغة الصحيحة للجملة الشرطية الحتمية:',
        instructionEn: 'Select the correct verb form for the robotic conditional:',
        promptEn: 'Whenever the sensor _____ a red line, the buzzer sounds.',
        promptAr: 'كلما _____ الحساس خطاً أحمر، يصدر صوت التنبيه.',
        options: ['detects', 'detecting', 'detected will', 'detection'],
        correctIndex: 0,
        hintAr: 'مع الفاعل المفرد (the sensor) في زمن المضارع البسيط، نضيف s للفعل.',
        explanationAr: 'الفاعل the sensor مفرد، لذا يأخذ الفعل s في المضارع البسيط: detects.'
      },
      {
        id: 'rob_ex3',
        type: 'situation',
        titleAr: 'تمرين 3: شرح المشروع للجنة التحكيم',
        titleEn: 'Exercise 3: Presentation Response',
        instructionAr: 'كيف تشرح ميزة الروبوت للجنة التحكيم باحترافية؟',
        instructionEn: 'How do you professionally explain your robot feature to judges?',
        promptEn: 'Judge: "What makes your robot faster than the other competitors?"',
        promptAr: 'المحكم: "ما الذي يجعل روبوتك أسرع من المنافسين الآخرين؟"',
        options: [
          'We calibrated dual high-torque motors and optimized our sensor loop for zero latency.',
          'I don’t know, it just moves.',
          'My robot is painted blue and white.',
          'I like playing games after school.'
        ],
        correctIndex: 0,
        hintAr: 'اختر الإجابة العلمية التي تحتوي على مصطلحات هندسية حقيقية.',
        explanationAr: 'الإجابة الأولى تحتوي على مصطلحات علمية قوية: calibrated, high-torque, optimized, zero latency.'
      }
    ],
    quiz: [
      {
        id: 'rob_q1',
        questionEn: 'What is the primary function of an ultrasonic sensor on a robot?',
        questionAr: 'ما هي الوظيفة الأساسية لحساس الموجات فوق الصوتية في الروبوت؟',
        options: [
          'To measure distance and avoid obstacles',
          'To play loud music',
          'To charge the battery wirelessly',
          'To paint the floor'
        ],
        correctIndex: 0,
        explanationAr: 'حساس الموجات فوق الصوتية يقيس المسافة باستخدام ارتداد الموجات لتفادي الاصطدام.'
      },
      {
        id: 'rob_q2',
        questionEn: 'Which sentence correctly uses "calibrate"?',
        questionAr: 'أي جملة تستخدم كلمة "calibrate" بالشكل الصحيح؟',
        options: [
          'Engineers calibrate the sensors to get accurate readings.',
          'We calibrate the pizza with cheese.',
          'He calibrate his shoes yesterday.',
          'The robot is calibrate in the box.'
        ],
        correctIndex: 0,
        explanationAr: 'Calibrate تعني يعاير أداة أو جهازاً لتحقيق دقة القراءة.'
      },
      {
        id: 'rob_q3',
        questionEn: 'What does "zero latency" mean in tech?',
        questionAr: 'ماذا يعني مصطلح "zero latency" في التكنولوجيا؟',
        options: [
          'Instant response with no delay (استجابة فورية دون أي تأخير)',
          'Zero battery power (انعدام طاقة البطارية)',
          'No internet connection (لا يوجد اتصال)',
          'A broken screen (شاشة معطلة)'
        ],
        correctIndex: 0,
        explanationAr: 'Latency تعني زمن الاستجابة أو التأخير، وzero latency تعني سرعة فائقة بدون تأخير.'
      },
      {
        id: 'rob_q4',
        questionEn: 'Choose the correct connector: "The robot stopped _____ it reached the edge of the table."',
        questionAr: 'اختر الرابط الصحيح: "توقف الروبوت _____ وصل إلى حافة الطاولة."',
        options: ['as soon as', 'although', 'despite', 'because of'],
        correctIndex: 0,
        explanationAr: 'As soon as تعني "بمجرد أن"، وهي الرابط الزمني الدقيق للحدث الفوري.'
      }
    ]
  },

  // ==========================================
  // ⚽ 2. رياضة وتحديات (Sports & Action)
  // ==========================================
  football_academy: {
    scenarioId: 'football_academy',
    conceptTitleAr: 'اختبارات أكاديمية كرة القدم والتعبير عن المراكز والمهارات',
    conceptTitleEn: 'Football Trials: Expressing Positions, Strengths & Tactics',
    conceptAr: 'في اختبارات أندية كرة القدم باللغة الإنجليزية، يحتاج اللاعب إلى تعريف نفسه لمدرب الفريق، والتحدث عن مركزه المفضل (Striker, Midfielder, Winger) وتكتيكاته وقدوته الكروية.',
    conceptEn: 'Communicate with football coaches about pitch positions, tactical vision, stamina, and preferred squad numbers.',
    pedagogicalGoalAr: 'التعبير عن المهارات والتفضيلات باستخدام (excel at, preferred position, role model, stamina).',
    pedagogicalGoalEn: 'Expressing sports strengths and preferences using specialized football vocabulary.',
    vocabulary: [
      {
        word: 'Striker',
        ipa: '/ˈstraɪ.kər/',
        meaningAr: 'مهاجم / رأس حربة',
        meaningEn: 'The primary attacking forward player scoring goals',
        exampleEn: 'As a striker, I look for open spaces inside the penalty box.',
        exampleAr: 'كمهاجم، أبحث عن المساحات المفتوحة داخل منطقة الجزاء.'
      },
      {
        word: 'Stamina',
        ipa: '/ˈstæm.ə.nə/',
        meaningAr: 'قوة التحمل واللياقة البدنية',
        meaningEn: 'Physical endurance to play at high intensity for 90 minutes',
        exampleEn: 'My stamina allows me to press defenders all game.',
        exampleAr: 'قوة تحمّلي تسمح لي بالضغط على المدافعين طوال المباراة.'
      },
      {
        word: 'Attacking midfielder',
        ipa: '/əˈtæk.ɪŋ ˈmɪdˌfiːl.dər/',
        meaningAr: 'صانع ألعاب / لاعب وسط هجومي',
        meaningEn: 'A playmaker who links midfield with forwards',
        exampleEn: 'He plays as an attacking midfielder with excellent vision.',
        exampleAr: 'يلعب كصانع ألعاب يتمتع برؤية استثنائية للملعب.'
      },
      {
        word: 'Squad number',
        ipa: '/skwɑːd ˈnʌm.bər/',
        meaningAr: 'رقم القميص في الفريق',
        meaningEn: 'The jersey number assigned to a player',
        exampleEn: 'May I wear squad number 10 this season?',
        exampleAr: 'هل يمكنني ارتداء القميص رقم 10 هذا الموسم؟'
      },
      {
        word: 'Endurance',
        ipa: '/ɪnˈdʊr.əns/',
        meaningAr: 'الصمود والتحمل المستمر',
        meaningEn: 'The ability to sustain prolonged physical effort',
        exampleEn: 'Pre-season drills build our stamina and endurance.',
        exampleAr: 'تدريبات قبل الموسم تبني لياقتنا وقوة صمودنا.'
      }
    ],
    grammar: {
      titleAr: 'التعبير عن المهارات والتفوق (Excel at / Specialize in + V-ing)',
      titleEn: 'Expressing Athletic Strengths with Prepositions',
      formula: 'Subject + excel at / be good at + [Noun / Verb-ing] (e.g. I excel at delivering through-balls.)',
      explanationAr: 'نستخدم excel at أو be good at للتعبير عن التميز في مهارة معينة مع إضافة ing للفعل بعدها.',
      explanationEn: 'Use "excel at" followed by a gerund to showcase your standout athletic skills.',
      examples: [
        'I excel at shooting with my left foot. (أنا متميز في التسديد بقدمي اليسرى.)',
        'She is great at reading opponents’ passes. (هي بارعة في قراءة تمريرات الخصم.)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Welcome to Premier Academy tryouts! You showed great speed during sprint drills. What position do you play best?",
        textAr: "أهلاً بك في اختبارات الأكاديمية! أظهرت سرعة رائعة أثناء سباقات السرعة. ما هو أفضل مركز تلعب فيه؟"
      },
      {
        speaker: 'student',
        textEn: "Coach Sara, I play as an attacking midfielder. I excel at creating chances and my right foot has a powerful shot.",
        textAr: "كوتش سارة، ألعب كصانع ألعاب هجومي. أنا متميز في صناعة الفرص وقدمي اليمنى تمتلك تسديدة قوية."
      },
      {
        speaker: 'sara',
        textEn: "Impressive! Who is your football role model, and which squad number would you like?",
        textAr: "مبهر! من هو قدوتك الكروية، وما هو رقم القميص الذي تفضله؟"
      },
      {
        speaker: 'student',
        textEn: "My role model is Jude Bellingham because of his work rate. I would love to wear jersey number 7 or 10!",
        textAr: "قدوتي هو جود بيلينغهام بسبب معدل عمله العالي. وأود ارتداء القميص رقم 7 أو 10!"
      }
    ],
    exercises: [
      {
        id: 'fb_ex1',
        type: 'vocab',
        titleAr: 'تمرين 1: مراكز لاعبي كرة القدم',
        titleEn: 'Exercise 1: Football Pitch Positions',
        instructionAr: 'اختر المركز الكروي الذي يقود الهجوم ويسجل الأهداف:',
        instructionEn: 'Choose the pitch position responsible for finishing goals:',
        promptEn: 'Our main _____ scored a hat-trick in the tournament final!',
        promptAr: 'سجل _____ الأساسي في فريقنا ثلاثة أهداف (هاتريك) في نهائي البطولة!',
        options: ['striker', 'referee', 'spectator', 'whistle'],
        correctIndex: 0,
        hintAr: 'اللاعب المهاجم في خط المقدمة.',
        explanationAr: 'كلمة striker تعني المهاجم / الهداف الأساسي في كرة القدم.'
      },
      {
        id: 'fb_ex2',
        type: 'grammar',
        titleAr: 'تمرين 2: التعبير عن المهارة بـ (excel at)',
        titleEn: 'Exercise 2: Strengths & Gerunds',
        instructionAr: 'اختر الصيغة الصحيحة بعد حرف الجر at:',
        instructionEn: 'Choose the correct form after the preposition "at":',
        promptEn: 'I excel at _____ precise long passes across the pitch.',
        promptAr: 'أنا أتميز في _____ التمريرات الطويلة الدقيقة عبر الملعب.',
        options: ['delivering', 'deliver', 'delivered', 'delivery of to'],
        correctIndex: 0,
        hintAr: 'حروف الجر مثل at يتبعها دائماً اسم أو فعل مضاف له -ing (Gerund).',
        explanationAr: 'القاعدة: حرف الجر at يتبعه صيغة الـ gerund (delivering).'
      },
      {
        id: 'fb_ex3',
        type: 'situation',
        titleAr: 'تمرين 3: الرد في مقابلة مدرب الفريق',
        titleEn: 'Exercise 3: Coach Interview Response',
        instructionAr: 'ماذا تقول للمدرب عندما يسألك عن سبب ملاءمتك للفريق؟',
        instructionEn: 'What do you say when the coach asks why you fit the team?',
        promptEn: 'Coach: "Why should we pick you for the academy squad?"',
        promptAr: 'المدرب: "لماذا ينبغي أن نختارك لتشكيلة الأكاديمية؟"',
        options: [
          'Because I have high stamina, strong teamwork, and I always fight for the ball until the 90th minute.',
          'Because my favorite food is spaghetti.',
          'I woke up late this morning.',
          'I don’t like running very much.'
        ],
        correctIndex: 0,
        hintAr: 'أظهر الشغف واللياقة والروح الجماعية.',
        explanationAr: 'الإجابة الأولى تبرز الروح الرياضية، واللياقة البدنية، والالتزام بالفريق حتى الدقيقة 90.'
      }
    ],
    quiz: [
      {
        id: 'fb_q1',
        questionEn: 'What does "stamina" mean for an athlete?',
        questionAr: 'ماذا تعني كلمة "stamina" بالنسبة للرياضي؟',
        options: [
          'Physical energy and endurance to keep playing (اللياقة وقوة التحمل البدني)',
          'The color of the football boots (لون الحذاء الرياضي)',
          'The price of match tickets (سعر تذاكر المباراة)',
          'A yellow card from the referee (بطاقة صفراء من الحكم)'
        ],
        correctIndex: 0,
        explanationAr: 'Stamina تعني قوة التحمل واللياقة البدنية لمواصلة الجهد.'
      },
      {
        id: 'fb_q2',
        questionEn: 'Complete the sentence: "He _____ a fantastic goal in the top corner of the net."',
        questionAr: 'أكمل الجملة: "لقد _____ هدفاً رائعاً في الزاوية العليا من الشباك."',
        options: ['scored', 'cooked', 'calculated', 'slept'],
        correctIndex: 0,
        explanationAr: 'نقول score a goal (سجل هدفاً).'
      },
      {
        id: 'fb_q3',
        questionEn: 'Which player is known as a "playmaker"?',
        questionAr: 'أي لاعب يُعرف بلقب "صانع الألعاب"؟',
        options: [
          'An attacking midfielder who creates goal opportunities',
          'The goalkeeper who stays in net',
          'The linesman waving the flag',
          'The fan shouting in the stadium'
        ],
        correctIndex: 0,
        explanationAr: 'صانع الألعاب (Playmaker) هو لاعب الوسط الذي يصنع فرص التسجيل بتمريراته الذكية.'
      },
      {
        id: 'fb_q4',
        questionEn: 'Choose the correct sentence:',
        questionAr: 'اختر الجملة الصحيحة لغوياً:',
        options: [
          'I would like to request jersey number 10, please.',
          'I want jersey 10 because give me.',
          'Jersey 10 is my wishing to wear.',
          'Please jersey 10 to me now.'
        ],
        correctIndex: 0,
        explanationAr: '"I would like to request..." هي الصيغة المهذبة والاحترافية لطلب رقم القميص.'
      }
    ]
  },

  // ==========================================
  // 🍕 3. أصدقاء ومطاعم (Food & Hangouts)
  // ==========================================
  pizza_arcade: {
    scenarioId: 'pizza_arcade',
    conceptTitleAr: 'الطلب في المطاعم واستبدال التذاكر في صالة الألعاب',
    conceptTitleEn: 'Ordering Food & Redeeming Arcade Prize Tickets',
    conceptAr: 'تعلم كيف تطلب الطعام في المطاعم الأمريكية (أنواع العجينة، الإضافات، الأحجام) وكيفية التعامل مع موظفي صالات الألعاب لاستبدال تذاكر الفوز بجوائز.',
    conceptEn: 'Learn how to customize pizza orders (crust, toppings, sides) and interact politely with arcade counter staff to redeem prize tickets.',
    pedagogicalGoalAr: 'استخدام صيغ الطلب المهذب (Could I please get... / I would like to order...) ومفردات الطعام والألعاب.',
    pedagogicalGoalEn: 'Using polite request modals (Could I / Would like) and fast casual food customization terms.',
    vocabulary: [
      {
        word: 'Stuffed crust',
        ipa: '/stʌft krʌst/',
        meaningAr: 'أطراف العجينة المحشوة بالجبن',
        meaningEn: 'Pizza crust filled with melted melted cheese',
        exampleEn: 'Could we get a large pepperoni pizza with stuffed crust?',
        exampleAr: 'هل يمكننا الحصول على بيتزا بيبروني كبيرة بأطراف محشوة بالجبن؟'
      },
      {
        word: 'Redeem',
        ipa: '/rɪˈdiːm/',
        meaningAr: 'يستبدل (تذاكر أو نقاط) بجائزة',
        meaningEn: 'To exchange tickets or vouchers for a prize or reward',
        exampleEn: 'I have 500 tickets to redeem for the giant plush toy.',
        exampleAr: 'لدي 500 تذكرة أود استبدالها بدمية الفراء الكبيرة.'
      },
      {
        word: 'Curly fries',
        ipa: '/ˈkɜːr.li fraɪz/',
        meaningAr: 'بطاطس مقرمشة لولبية / حلزونية',
        meaningEn: 'Spiral-cut seasoned fried potatoes',
        exampleEn: 'Add a side of curly fries and ranch sauce, please.',
        exampleAr: 'أضف طبقاً جانبياً من البطاطس الحلزونية وصلصة الرانش، من فضلك.'
      },
      {
        word: 'Jackpot',
        ipa: '/ˈdʒæk.pɑːt/',
        meaningAr: 'الجائزة الكبرى / أعلى رصيد تذاكر',
        meaningEn: 'The biggest prize in a game of skill or arcade machine',
        exampleEn: 'I hit the arcade jackpot and won 1,000 tickets!',
        exampleAr: 'حققت الجائزة الكبرى في لعبة الأركيد وفزت بـ 1000 تذكرة!'
      },
      {
        word: 'Topping',
        ipa: '/ˈtɑː.pɪŋ/',
        meaningAr: 'إضافات الطعام (جبن، زيتون، فطر...)',
        meaningEn: 'An ingredient added on top of food like pizza',
        exampleEn: 'What toppings would you like on your pizza?',
        exampleAr: 'ما هي الإضافات التي ترغب بها على البيتزا؟'
      }
    ],
    grammar: {
      titleAr: 'صيغ الطلب المهذب في المطاعم (Polite Modal Requests: Could I / Would like)',
      titleEn: 'Polite Requests in Customer Service & Restaurants',
      formula: 'Could I / we please have [Item] + with [Customization]? OR I would like to order [Item].',
      explanationAr: 'في المطاعم الإنجليزية لا نستخدم "I want" لأنها فظة، بل نستخدم دائماً "Could I please get..." أو "I would like...".',
      explanationEn: 'Never use blunt demands like "I want". Always use polite modals: "Could I have..." or "I’d like...".',
      examples: [
        'Could I please have a large cheese pizza with extra mushrooms? (هل لي ببيتزا جبن كبيرة مع فطر إضافي، من فضلك؟)',
        'We would like two iced drinks and some curly fries. (نود مشروبين مثلجين وبطاطس حلزونية.)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Welcome to Mega Slice Pizza & Arcade! Smells amazing today. What can I get for you and your friends?",
        textAr: "أهلاً بك في ميجا سلايس بيتزا والأركيد! الرائحة رائعة اليوم. ماذا يمكنني أن أقدم لك ولأصدقائك؟"
      },
      {
        speaker: 'student',
        textEn: "Hi Sara! Could we please get a large pepperoni pizza with stuffed crust and curly fries?",
        textAr: "أهلاً سارة! هل يمكننا الحصول على بيتزا بيبروني كبيرة بأطراف محشوة وبطاطس حلزونية، من فضلك؟"
      },
      {
        speaker: 'sara',
        textEn: "You got it! Hot and fresh in 15 minutes. And did you want to redeem your arcade tickets at the counter?",
        textAr: "طلبك جاهز وساخن خلال 15 دقيقة! وهل ترغب في استبدال تذاكر الأركيد عند الكاونتر؟"
      },
      {
        speaker: 'student',
        textEn: "Yes, I hit the jackpot earlier! I have 800 tickets to redeem for the gaming headphones on the top shelf.",
        textAr: "نعم، حققت الجائزة الكبرى سابقاً! لدي 800 تذكرة لأستبدلها بسماعات الألعاب على الرف العلوي."
      }
    ],
    exercises: [
      {
        id: 'pz_ex1',
        type: 'vocab',
        titleAr: 'تمرين 1: مفردات الأركيد واستبدال الجوائز',
        titleEn: 'Exercise 1: Arcade Ticket Terminology',
        instructionAr: 'اختر الفعل المناسب لاستبدال نقاط التذاكر بهدية:',
        instructionEn: 'Choose the correct verb for exchanging tickets for a prize:',
        promptEn: 'I won 600 tickets! I want to _____ them for a mini drone.',
        promptAr: 'فزت بـ 600 تذكرة! أود أن _____ مقابل طائرة درون صغيرة.',
        options: ['redeem', 'destroy', 'delete', 'forget'],
        correctIndex: 0,
        hintAr: 'الفعل الذي يعني استبدال القسائم أو التذاكر بهدية عينية.',
        explanationAr: 'كلمة redeem تعني يستبدل نقاطاً أو تذاكر بمكافأة أو جائزة.'
      },
      {
        id: 'pz_ex2',
        type: 'grammar',
        titleAr: 'تمرين 2: صيغة الطلب المهذب في المطعم',
        titleEn: 'Exercise 2: Polite Ordering Modals',
        instructionAr: 'اختر الصيغة الأكثر أدباً واحترافية للطلب:',
        instructionEn: 'Select the most polite ordering phrase for customer service:',
        promptEn: '_____ please get an extra cup of garlic sauce with my order?',
        promptAr: '_____ الحصول على كوب إضافي من صلصة الثوم مع طلبي، من فضلك؟',
        options: ['Could I', 'Give me now', 'I am needing', 'Must I'],
        correctIndex: 0,
        hintAr: 'نبدأ الطلب المهذب بـ Could I please get...',
        explanationAr: '"Could I please get..." هي أكثر الصيغ تهذيباً وانتشاراً عند الطلب في المطاعم الإنجليزية.'
      },
      {
        id: 'pz_ex3',
        type: 'situation',
        titleAr: 'تمرين 3: تخصيص طلب البيتزا',
        titleEn: 'Exercise 3: Food Customization',
        instructionAr: 'كيف تطلب من موظف المطعم عدم وضع البصل في البيتزا بلباقة؟',
        instructionEn: 'How do you politely ask to exclude onions from your pizza?',
        promptEn: 'Server: "Does your pizza come with all standard toppings?"',
        promptAr: 'الموظف: "هل تود البيتزا بجميع الإضافات الأساسية؟"',
        options: [
          'Could you please make it without onions? I have an allergy.',
          'I hate onions don’t touch them.',
          'Onions are purple and smell weird.',
          'No pizza today thank you.'
        ],
        correctIndex: 0,
        hintAr: 'استخدم "Could you please make it without...".',
        explanationAr: 'الصيغة الأولى تجمع بين الأدب وشرح السبب باحترافية وسلاسة.'
      }
    ],
    quiz: [
      {
        id: 'pz_q1',
        questionEn: 'What does "stuffed crust" mean when ordering a pizza?',
        questionAr: 'ماذا تعني عبارة "stuffed crust" عند طلب البيتزا؟',
        options: [
          'The pizza outer edge is filled with cheese',
          'The pizza is burned',
          'The pizza has no sauce',
          'The pizza is rectangular'
        ],
        correctIndex: 0,
        explanationAr: 'Stuffed crust تعني أطراف العجينة المحشوة بالجبن الذائب.'
      },
      {
        id: 'pz_q2',
        questionEn: 'Which phrase is the most natural and polite way to order drinks?',
        questionAr: 'أي عبارة هي الطريقة الطبيعية والأكثر أدباً لطلب المشروبات؟',
        options: [
          'We’d like two iced lemonades, please.',
          'Bring us lemonade fast.',
          'Lemonades to table now.',
          'We drink lemonades.'
        ],
        correctIndex: 0,
        explanationAr: '"We’d like... please" هي الصيغة القياسية والمهذبة.'
      },
      {
        id: 'pz_q3',
        questionEn: 'If a game says "HIT THE JACKPOT", what does it mean?',
        questionAr: 'إذا كُتب على لعبة الأركيد "HIT THE JACKPOT"، ماذا يعني ذلك؟',
        options: [
          'Win the highest prize of tickets possible (الفوز بالجائزة الكبرى)',
          'The game is out of order (اللعبة معطلة)',
          'Insert another coin (أدخل عملة أخرى)',
          'Game over, try again (خسرت، حاول ثانية)'
        ],
        correctIndex: 0,
        explanationAr: 'Jackpot تعني الجائزة الكبرى وأعلى عدد ممكن من التذاكر.'
      },
      {
        id: 'pz_q4',
        questionEn: 'Choose the correct response: "Cashier: That will be $18.50. Will that be cash or card?"',
        questionAr: 'اختر الرد المناسب: "المحاسب: المجموع 18.50 دولاراً. هل الدفع نقداً أم بالبطاقة؟"',
        options: [
          'I will pay with card, please.',
          'No I don’t like money.',
          'The card is yellow.',
          'Yes it is fifty dollars.'
        ],
        correctIndex: 0,
        explanationAr: 'الإجابة المباشرة والمهذبة هي تحديد وسيلة الدفع: "I will pay with card, please".'
      }
    ]
  },

  // ==========================================
  // 🚀 4. فضاء ومغامرات (Sci-Fi & Adventure)
  // ==========================================
  space_camp: {
    scenarioId: 'space_camp',
    conceptTitleAr: 'معسكر رواد الفضاء ومهمة استكشاف المريخ',
    conceptTitleEn: 'Space Academy: Mars Exploration & Zero-Gravity Simulation',
    conceptAr: 'تدرب على لغة البعثات الفضائية ووكالات الفضاء (NASA / ESA)، ومصطلحات انعدام الجاذبية، وفحص بدلة الفضاء، وتشغيل مسبار استكشاف سطح المريخ.',
    conceptEn: 'Master space exploration terminology, zero-gravity protocol, spacesuit telemetry, and Mars rover navigation in mission control.',
    pedagogicalGoalAr: 'التحدث بثقة عن العلوم والفضاء، واستخدام مصطلحات الإجراءات المتسلسلة (First, Next, Before launch, All systems nominal).',
    pedagogicalGoalEn: 'Using sequential mission protocols and aerospace terminology in a high-tech simulator.',
    vocabulary: [
      {
        word: 'Zero gravity',
        ipa: '/ˌzɪr.oʊ ˈɡræv.ə.t̬i/',
        meaningAr: 'انعدام الجاذبية / الطفو في الفضاء',
        meaningEn: 'Weightlessness where gravitational pull is absent or negligible',
        exampleEn: 'Astronauts train in zero gravity tanks before going to orbit.',
        exampleAr: 'يتدرب رواد الفضاء في خزانات انعدام الجاذبية قبل الذهاب إلى المدار.'
      },
      {
        word: 'Rover',
        ipa: '/ˈroʊ.vɚ/',
        meaningAr: 'مركبة استكشاف سطح الكوكب (مسبار جوال)',
        meaningEn: 'A robotic motor vehicle designed to travel on celestial bodies',
        exampleEn: 'The Mars rover collected geological soil samples from the crater.',
        exampleAr: 'جمعت مركبة المريخ الجوالة عينات جيولوجية من فوهة البركان.'
      },
      {
        word: 'Atmosphere',
        ipa: '/ˈæt.məs.fɪr/',
        meaningAr: 'الغلاف الجوي',
        meaningEn: 'The layer of gases surrounding a planet',
        exampleEn: 'The Martian atmosphere is very thin and composed mainly of carbon dioxide.',
        exampleAr: 'الغلاف الجوي للمريخ رقيق للغاية ويتكون أساساً من ثاني أكسيد الكربون.'
      },
      {
        word: 'Trajectory',
        ipa: '/trəˈdʒek.tɚ.i/',
        meaningAr: 'مسار الرحلة الفضائية',
        meaningEn: 'The curved path followed by a rocket or projectile flying through space',
        exampleEn: 'Mission control calculated the rocket’s orbital trajectory.',
        exampleAr: 'حسبت غرفة التحكم بالرحلة المسار المداري للصاروخ.'
      },
      {
        word: 'Telemetry',
        ipa: '/təˈlem.ə.tri/',
        meaningAr: 'القياس اللاسلكي للبيانات الحيوية والتقنية',
        meaningEn: 'Automatic transmission of data from instruments in space to Earth',
        exampleEn: 'Suit telemetry shows stable oxygen levels and normal heart rate.',
        exampleAr: 'تظهر بيانات البدلة اللاسلكية مستويات أكسجين مستقرة ونبض قلب طبيعي.'
      }
    ],
    grammar: {
      titleAr: 'روابط الخطوات والبروتوكولات المتسلسلة (Sequencing Adverbs: Prior to, Once, Simultaneously)',
      titleEn: 'Mission Protocols & Sequential Action Adverbs',
      formula: 'Prior to [Action], [Check/Perform]. Once [Step is verified], proceed to [Next Step].',
      explanationAr: 'في بروتوكولات الفضاء والتحكم، نستخدم روابط تسلسل دقيقة لوصف إجراءات الأمان خطوة بخطوة.',
      explanationEn: 'Sequential adverbs ensure unambiguous communication during countdown and operations.',
      examples: [
        'Prior to launch, verify life support pressure. (قبل الإطلاق، تحقق من ضغط دعم الحياة.)',
        'Once the docking seal is locked, equalize cabin pressure. (بمجرد إقفال منفذ الالتحام، وازن ضغط المقصورة.)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Welcome Commander! We are in the Mars Space Simulation Chamber. How does your spacesuit telemetry look?",
        textAr: "مرحباً أيها القائد! نحن داخل غرفة محاكاة المريخ الفضائية. كيف تبدو بيانات بدلتك الفضائية؟"
      },
      {
        speaker: 'student',
        textEn: "Flight Director Sara, all systems are nominal! Oxygen pressure is at 100% and communications are loud and clear.",
        textAr: "مديرة الرحلة سارة، جميع الأنظمة في وضعها المثالي! ضغط الأكسجين 100% والاتصالات واضحة ومسموعة."
      },
      {
        speaker: 'sara',
        textEn: "Excellent! The rover has located red rock formations near the crater ridge. Are you ready to calibrate the robotic arm?",
        textAr: "ممتاز! المسبار الجوال رصد تشكيلات صخرية حمراء قرب حافة الفوهة. هل أنت مستعد لمعايرة الذراع الآلية؟"
      },
      {
        speaker: 'student',
        textEn: "Roger that! Prior to deploying the arm, I will engage the stabilization landing thrusters and collect the core sample.",
        textAr: "عُلم ذلك! قبل نشر الذراع، سأشغّل محركات التثبيت وأجمع عينة التربة الأساسية."
      }
    ],
    exercises: [
      {
        id: 'sp_ex1',
        type: 'vocab',
        titleAr: 'تمرين 1: مصطلحات الفضاء والجاذبية',
        titleEn: 'Exercise 1: Aerospace Vocabulary',
        instructionAr: 'اختر المصطلح الذي يصف حالة الطفو والوزن المنعدم في الفضاء:',
        instructionEn: 'Identify the state of weightlessness experienced in orbit:',
        promptEn: 'During orbit, astronauts float because they are in _____ conditions.',
        promptAr: 'أثناء الدوران في المدار، يطفو رواد الفضاء لأنهم في ظروف _____.',
        options: ['zero gravity', 'heavy rain', 'deep ocean', 'muddy soil'],
        correctIndex: 0,
        hintAr: 'المصطلح الذي يعني انعدام قوى الجاذبية.',
        explanationAr: 'Zero gravity تعني حالة انعدام الوزن والجاذبية في الفضاء الخارجي.'
      },
      {
        id: 'sp_ex2',
        type: 'grammar',
        titleAr: 'تمرين 2: ترتيب خطوات الإطلاق الفضائي',
        titleEn: 'Exercise 2: Mission Sequencing Protocols',
        instructionAr: 'اختر الرابط الزمني الأنسب للخطوات المسبقة للإطلاق:',
        instructionEn: 'Choose the correct sequence marker before an action:',
        promptEn: '_____ initiating rocket ignition, the commander checks all thruster valves.',
        promptAr: '_____ بدء إشعال محركات الصاروخ، يفحص القائد جميع صمامات الدفع.',
        options: ['Prior to', 'Yesterday', 'Behind', 'Because of to'],
        correctIndex: 0,
        hintAr: 'العبارة التي تعني "قبل" أو "مسبقاً لـ".',
        explanationAr: '"Prior to" تعني قبل أو مسبقاً لإجراء معين، ويتبعها اسم أو فعل ing.'
      },
      {
        id: 'sp_ex3',
        type: 'situation',
        titleAr: 'تمرين 3: الرد التكتيكي على غرفة القيادة',
        titleEn: 'Exercise 3: Mission Control Response',
        instructionAr: 'ما هو الرد الاحترافي لرائد الفضاء عند تأكيد سلامة جميع الأنظمة؟',
        instructionEn: 'How does an astronaut professionally report that all systems are fine?',
        promptEn: 'Mission Control: "Commander, report status on power and oxygen."',
        promptAr: 'غرفة القيادة: "أيها القائد، أبلغنا عن حالة الطاقة والأكسجين."',
        options: [
          'All systems are nominal! Oxygen is at 100% and telemetry is completely stable.',
          'I want to sleep right now.',
          'The rocket is very loud and I dislike noise.',
          'Can we go home to watch television?'
        ],
        correctIndex: 0,
        hintAr: 'استخدم التعبير الفضائي "All systems are nominal".',
        explanationAr: 'كلمة nominal في هندسة الفضاء تعني "تعمل بالمعايير الطبيعية المثالية والمبرمجة".'
      }
    ],
    quiz: [
      {
        id: 'sp_q1',
        questionEn: 'What does "All systems nominal" mean in NASA communications?',
        questionAr: 'ماذا تعني عبارة "All systems nominal" في اتصالات وكالات الفضاء؟',
        options: [
          'All systems are working perfectly and within normal limits',
          'A system has caught fire',
          'The rocket lost connection',
          'The launch is cancelled'
        ],
        correctIndex: 0,
        explanationAr: 'Nominal تعني أن جميع الأنظمة تعمل ضمن الحدود الطبيعية والمثالية المخطط لها.'
      },
      {
        id: 'sp_q2',
        questionEn: 'What is a Mars rover?',
        questionAr: 'ما هي مركبة المريخ الجوالة (Rover)؟',
        options: [
          'A robotic motor vehicle designed to explore the planet surface',
          'A passenger airplane',
          'A submarine for deep water',
          'A satellite orbiting the sun'
        ],
        correctIndex: 0,
        explanationAr: 'الـ Rover هو مسبار أو مركبة آلية مصممة للتحرك على أسطح الكواكب وأخذ عينات صخرية.'
      },
      {
        id: 'sp_q3',
        questionEn: 'Complete the countdown phrase: "T-minus 10 seconds and counting, prepare for main engine _____."',
        questionAr: 'أكمل عبارة العد التنازلي: "تبقت 10 ثوانٍ، استعد لـ _____ المحرك الرئيسي."',
        options: ['ignition', 'breakfast', 'shopping', 'vacation'],
        correctIndex: 0,
        explanationAr: 'Ignition تعني إشعال / بدء تشغيل محركات الصواريخ.'
      },
      {
        id: 'sp_q4',
        questionEn: 'Why do spacesuits need telemetry monitoring?',
        questionAr: 'لماذا تحتاج بدلات الفضاء إلى مراقبة القياس اللاسلكي (Telemetry)؟',
        options: [
          'To track vital signs, oxygen levels, and suit pressure remotely',
          'To change the color of the helmet visor',
          'To play video games during spacewalks',
          'To wash the suit automatically'
        ],
        correctIndex: 0,
        explanationAr: 'Telemetry ترسل العلامات الحيوية ومستويات الأكسجين وضغط البدلة لحظة بلحظة لغرفة التحكم.'
      }
    ]
  },

  // ==========================================
  // 🏫 5. المدرسة والنوادي (School & Leadership)
  // ==========================================
  school_captain: {
    scenarioId: 'school_captain',
    conceptTitleAr: 'انتخابات قيادة المدرسة وخطاب الإذاعة المدرسية',
    conceptTitleEn: 'School Council Elections & Morning Assembly Speech',
    conceptAr: 'تعلم فن الإقناع والخطابة باللغة الإنجليزية، وتقديم الوعود والمقترحات (تحسين مقصف المدرسة، الأنشطة الرياضية، بطولات البرمجة)، وبناء الثقة كقائد طلابي.',
    conceptEn: 'Master persuasive public speaking, proposing school improvement initiatives (cafeteria, sports, robotics), and addressing peers with charismatic confidence.',
    pedagogicalGoalAr: 'استخدام أساليب الإقناع، وصيغ المستقبل والالتزام (I promise to / Our campaign aims to / Together we will).',
    pedagogicalGoalEn: 'Persuasive rhetoric, future commitment structures, and public speaking connectors.',
    vocabulary: [
      {
        word: 'Campaign',
        ipa: '/kæmˈpeɪn/',
        meaningAr: 'حملة انتخابية / مشروع مبادرة',
        meaningEn: 'An organized series of activities to achieve an election goal',
        exampleEn: 'Our election campaign focuses on student mental health and fun sports tournaments.',
        exampleAr: 'تركز حملتنا الانتخابية على الصحة النفسية للطلاب والبطولات الرياضية الممتعة.'
      },
      {
        word: 'Assembly',
        ipa: '/əˈsem.bli/',
        meaningAr: 'طابور الصباح / التجمع المدرسي العام',
        meaningEn: 'A gathering of all teachers and students in the school hall',
        exampleEn: 'I delivered my speech in front of 500 students at the morning assembly.',
        exampleAr: 'ألقيت خطابي أمام 500 طالب في طابور الصباح المدرسي.'
      },
      {
        word: 'Initiative',
        ipa: '/ɪˈnɪʃ.ə.t̬ɪv/',
        meaningAr: 'مبادرة رائدة / خطة تطوير جديدة',
        meaningEn: 'A new plan or process to solve a problem or improve conditions',
        exampleEn: 'We are introducing a peer tutoring initiative to help with math homework.',
        exampleAr: 'نحن نطلق مبادرة تعليم الأقران للمساعدة في واجبات الرياضيات.'
      },
      {
        word: 'Leadership',
        ipa: '/ˈliː.dɚ.ʃɪp/',
        meaningAr: 'القيادة والقدرة على توجيه الفريق',
        meaningEn: 'The action of leading a group or demonstrating inspiring vision',
        exampleEn: 'True leadership means listening to every student’s voice.',
        exampleAr: 'القيادة الحقيقية تعني الاستماع إلى صوت كل طالب وطالبة.'
      },
      {
        word: 'Persuasive',
        ipa: '/pɚˈsweɪ.sɪv/',
        meaningAr: 'مُقنع ومؤثر في الجمهور',
        meaningEn: 'Able to cause people to believe or agree with something',
        exampleEn: 'His speech was so persuasive that everyone clapped enthusiastically.',
        exampleAr: 'كان خطابه مقنعاً لدرجة أن الجميع صفقوا بحماس كبير.'
      }
    ],
    grammar: {
      titleAr: 'صيغ الالتزام والوعود المستقبلية للخطابة (Commitment Modals: We pledge to / I will ensure that)',
      titleEn: 'Commitment Rhetoric & Future Vision Modals',
      formula: 'I pledge to / Our team will + [Base Verb] + so that + [Positive Student Outcome].',
      explanationAr: 'في الخطابات الانتخابية، نستخدم أفعال الالتزام مثل "I pledge to" (أتعهد بأن) أو "Our council will ensure that" لإظهار القوة والمسؤولية.',
      explanationEn: 'Use strong commitment verbs like "pledge", "guarantee", and "ensure" to inspire confidence.',
      examples: [
        'I pledge to represent every grade with fairness. (أتعهد بتمثيل كل صف دراسي بعدالة.)',
        'Together, we will build a stronger and happier school community. (معاً، سنبني مجتمعاً مدرسياً أقوى وأكثر سعادة.)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Good morning candidate! The morning assembly microphone is on. How will you introduce your campaign to the students?",
        textAr: "صباح الخير أيها المرشح! ميكروفون طابور الصباح جاهز. كيف ستقدم حملتك للطلاب؟"
      },
      {
        speaker: 'student',
        textEn: "Good morning teachers and classmates! I am running for School Council President with a clear mission: your voice matters!",
        textAr: "صباح الخير معلمينا وزملائي الطلاب! أترشح لرئاسة المجلس الطلابي بمهمة واضحة: صوتكم يصنع الفارق!"
      },
      {
        speaker: 'sara',
        textEn: "Powerful opening! What specific initiatives are you proposing for the school cafeteria and clubs?",
        textAr: "افتتاحية قوية! ما هي المبادرات المحددة التي تقترحها لمقصف المدرسة والنوادي؟"
      },
      {
        speaker: 'student',
        textEn: "I pledge to add healthy snack options to the cafeteria and launch a weekly robotics and gaming club for all grades!",
        textAr: "أتعهد بإضافة خيارات وجبات صحية للمقصف وإطلاق نادٍ أسبوعي للروبوتات والألعاب لجميع الصفوف!"
      }
    ],
    exercises: [
      {
        id: 'sc_ex1',
        type: 'vocab',
        titleAr: 'تمرين 1: مفردات الانتخابات والقيادة',
        titleEn: 'Exercise 1: Campaign Terminology',
        instructionAr: 'اختر الكلمة التي تعني النشاط المنظم للفوز في الانتخابات:',
        instructionEn: 'Choose the word for an organized effort to win an election:',
        promptEn: 'Our student council _____ has the slogan: "Action, Innovation, and Fun!"',
        promptAr: 'شعار _____ مجلسنا الطلابي هو: "العمل، الابتكار، والمتعة!"',
        options: ['campaign', 'sandwich', 'eraser', 'curtain'],
        correctIndex: 0,
        hintAr: 'الكلمة التي تنتهي بحرف n صامت بعد g.',
        explanationAr: 'Campaign تعني الحملة الانتخابية المنظمة.'
      },
      {
        id: 'sc_ex2',
        type: 'grammar',
        titleAr: 'تمرين 2: صيغة التعهد والوعد في الخطاب',
        titleEn: 'Exercise 2: Public Speaking Commitment Rhetoric',
        instructionAr: 'اختر الفعل الذي يعبر عن التعهد الرسمي بقوة:',
        instructionEn: 'Choose the strongest formal verb of commitment:',
        promptEn: 'As your president, I _____ to listen to every suggestion you put in our idea box.',
        promptAr: 'كرئيس لمجلسكم، أنا _____ أن أستمع لكل اقتراح تضعونه في صندوق أفكارنا.',
        options: ['pledge', 'forget', 'refuse', 'fear'],
        correctIndex: 0,
        hintAr: 'الكلمة التي تعني أتعهد / أعد رسمياً.',
        explanationAr: '"I pledge to..." تعني أتعهد رسمياً، وهي الصيغة الخطابية الأقوى للقادة.'
      },
      {
        id: 'sc_ex3',
        type: 'situation',
        titleAr: 'تمرين 3: الختام المؤثر للخطاب المدرسي',
        titleEn: 'Exercise 3: Powerful Speech Conclusion',
        instructionAr: 'كيف تختم خطابك في طابور الصباح بحماس يلهم زملاءك للتصويت لك؟',
        instructionEn: 'How do you inspire classmates to vote for you in your conclusion?',
        promptEn: 'Sara: "Wrap up your speech with a memorable concluding sentence!"',
        promptAr: 'سارة: "اختم خطابك بجملة ختامية تعلق في أذهان الطلاب!"',
        options: [
          'Vote for innovation and positive change! Together, let’s make this school year unforgettable! Thank you!',
          'Okay, I am finished speaking now.',
          'Please sit down because the bell is ringing.',
          'Goodbye I have homework.'
        ],
        correctIndex: 0,
        hintAr: 'اختر العبارة الملهمة التي تدعو للعمل المشترك وتغيير الأفضل.',
        explanationAr: 'الخاتمة الأولى حماسية ومقنعة وتبني روح الفريق والولاء.'
      }
    ],
    quiz: [
      {
        id: 'sc_q1',
        questionEn: 'What does "to run for office" mean in school elections?',
        questionAr: 'ماذا يعني اصطلاح "to run for office" في الانتخابات المدرسية؟',
        options: [
          'To be a candidate seeking election for a leadership position',
          'To sprint inside the principal’s room',
          'To run away from school',
          'To clean the school desks'
        ],
        correctIndex: 0,
        explanationAr: 'To run for office تعني الترشح رسمياً لمنصب قيادي أو رئاسة المجلس.'
      },
      {
        id: 'sc_q2',
        questionEn: 'Which quality is most important for a school leader?',
        questionAr: 'أي صفة هي الأهم بالنسبة للقائد المدرسي؟',
        options: [
          'Active listening, empathy, and integrity',
          'Shouting louder than everyone else',
          'Keeping secrets from friends',
          'Refusing to help younger students'
        ],
        correctIndex: 0,
        explanationAr: 'الاستماع الفعال، التعاطف، والنزاهة هي جوهر القيادة الحقيقية.'
      },
      {
        id: 'sc_q3',
        questionEn: 'Choose the correct word: "The student council introduced a recycling _____ to protect our campus."',
        questionAr: 'اختر الكلمة الصحيحة: "أطلق المجلس الطلابي _____ لإعادة التدوير لحماية مدرستنا."',
        options: ['initiative', 'complaint', 'accident', 'dispute'],
        correctIndex: 0,
        explanationAr: 'Initiative تعني مبادرة تطويرية أو مشروع عمل هادف.'
      },
      {
        id: 'sc_q4',
        questionEn: 'What is the purpose of a school assembly speech?',
        questionAr: 'ما هو الهدف الأساسي من إلقاء خطاب في التجمع المدرسي؟',
        options: [
          'To inspire peers, present a clear vision, and encourage civic participation',
          'To complain about teachers',
          'To waste morning time',
          'To show off new shoes'
        ],
        correctIndex: 0,
        explanationAr: 'الهدف هو إلهام الزملاء، وطرح رؤية واضحة لحلول المدرسة، وتحفيز المشاركة.'
      }
    ]
  }
};

// ============================================================================
// Helper to retrieve educational content for any scenario with fallbacks
// ============================================================================
export function getScenarioEducationalContent(scenarioId: string): ScenarioEducationalContent {
  if (SARA_SCENARIO_CURRICULUM[scenarioId]) {
    return SARA_SCENARIO_CURRICULUM[scenarioId];
  }

  // Generic rich fallback for remaining scenarios to ensure 100% availability
  const cleanId = scenarioId || 'scenario_general';
  return {
    scenarioId: cleanId,
    conceptTitleAr: 'المحادثة العملية والتطبيق اللغوي في هذا الموقف',
    conceptTitleEn: 'Practical Communication & Language Application',
    conceptAr: 'تعلم أهم التعابير والمفردات الإنجليزية الحية المستخدمة في هذا الموقف الواقعي، وكيفية التفاعل بطلاقة وثقة ودون تردد.',
    conceptEn: 'Learn essential authentic English expressions and vocabulary for this real-world scenario to interact with confidence.',
    pedagogicalGoalAr: 'التواصل التلقائي، تطبيق القواعد السياقية السليمة، واكتساب مفردات خاصة بالموقف.',
    pedagogicalGoalEn: 'Spontaneous communication, contextual grammar usage, and authentic situational vocabulary.',
    vocabulary: [
      {
        word: 'Interact',
        ipa: '/ˌɪn.t̬ɚˈækt/',
        meaningAr: 'يتفاعل ويتواصل',
        meaningEn: 'To communicate and work together with someone',
        exampleEn: 'We interact with English speakers with confidence.',
        exampleAr: 'نتفاعل مع المتحدثين بالإنجليزية بكل ثقة.'
      },
      {
        word: 'Express',
        ipa: '/ɪkˈspres/',
        meaningAr: 'يعبّر عن رأيه أو حاجته',
        meaningEn: 'To convey your thoughts or feelings clearly',
        exampleEn: 'I can express my thoughts clearly in English.',
        exampleAr: 'أستطيع التعبير عن أفكاري بوضوح بالإنجليزية.'
      },
      {
        word: 'Respond',
        ipa: '/rɪˈspɑːnd/',
        meaningAr: 'يستجيب ويرد بسرعة',
        meaningEn: 'To say something in reply to someone',
        exampleEn: 'Listen carefully before you respond.',
        exampleAr: 'استمع بانتباه قبل أن ترد.'
      },
      {
        word: 'Fluency',
        ipa: '/ˈfluː.ən.si/',
        meaningAr: 'الطلاقة والانسيابية في الحديث',
        meaningEn: 'The ability to speak smoothly and easily',
        exampleEn: 'Daily practice with Sara builds speaking fluency.',
        exampleAr: 'الممارسة اليومية مع سارة تبني طلاقة الحديث.'
      }
    ],
    grammar: {
      titleAr: 'تراكيب المحادثة الفورية والردود الطبيعية (Conversational Connectors)',
      titleEn: 'Conversational Connectors & Spoken Discourse',
      formula: 'Discourse Marker (Well / Actually / To be honest) + Complete Sentence.',
      explanationAr: 'في المحادثة الطبيعية بالإنجليزية، نستخدم كلمات ربط سريعة مثل (Actually, Definitely, Sounds great) لإعطاء انسيابية لغوية للمحادثة.',
      explanationEn: 'Natural discourse markers make speech flow like a native speaker.',
      examples: [
        'Actually, that sounds like a fantastic idea! (في الحقيقة، تبدو هذه فكرة رائعة!)',
        'Definitely, let’s get started right away! (بالتأكيد، دعنا نبدأ على الفور!)'
      ]
    },
    modelDialogue: [
      {
        speaker: 'sara',
        textEn: "Hello! Welcome to our interactive scenario. What would you like to achieve today?",
        textAr: "مرحباً! أهلاً بك في سيناريونا التفاعلي. ما الذي تود تحقيقه اليوم؟"
      },
      {
        speaker: 'student',
        textEn: "Hi Sara! I want to master this real-life conversation and speak with total confidence.",
        textAr: "أهلاً سارة! أريد إتقان هذا الموقف الحياتي والتحدث بثقة تامة."
      }
    ],
    exercises: [
      {
        id: `${cleanId}_ex1`,
        type: 'vocab',
        titleAr: 'تمرين 1: اختيار الكلمة الأنسب للسياق',
        titleEn: 'Exercise 1: Vocabulary in Context',
        instructionAr: 'اختر الكلمة المناسبة لإكمال الجملة بطبيعية:',
        instructionEn: 'Choose the best word to complete the sentence naturally:',
        promptEn: 'Practicing English scenarios with Coach Sara helps build speaking _____.',
        promptAr: 'ممارسة سيناريوهات الإنجليزية مع المدربة سارة يساعد في بناء _____ الحديث.',
        options: ['fluency', 'shoes', 'clouds', 'pencils'],
        correctIndex: 0,
        hintAr: 'الكلمة التي تعني الطلاقة والسهولة في الكلام.',
        explanationAr: 'Fluency تعني الطلاقة اللغوية وسلاسة التعبير.'
      },
      {
        id: `${cleanId}_ex2`,
        type: 'grammar',
        titleAr: 'تمرين 2: استخدام كلمات الربط الشفهية',
        titleEn: 'Exercise 2: Discourse Markers',
        instructionAr: 'اختر كلمة الربط التي تعبر عن الموافقة التامة بحماس:',
        instructionEn: 'Select the conversational connector expressing enthusiastic agreement:',
        promptEn: 'Sara: "Should we try this exciting challenge together?" -> You: "_____, I’m ready!"',
        promptAr: 'سارة: "هل نجرب هذا التحدي المشوق معاً؟" -> أنت: "_____، أنا مستعد!"',
        options: ['Definitely', 'Never', 'Yesterday', 'Under'],
        correctIndex: 0,
        hintAr: 'الكلمة التي تعني "بالتأكيد وبلا تردد".',
        explanationAr: 'Definitely تعني بكل تأكيد وتُستخدم دائماً للموافقة الحماسية.'
      },
      {
        id: `${cleanId}_ex3`,
        type: 'situation',
        titleAr: 'تمرين 3: الرد الذاتي في الموقف',
        titleEn: 'Exercise 3: Situational Response',
        instructionAr: 'ما هو الرد الأفضل عندما تبدأ سارة الحوار معك في الموقف؟',
        instructionEn: 'What is the best way to respond naturally to open the conversation?',
        promptEn: 'Sara greets you and asks how you are doing in this situation.',
        promptAr: 'سارة تحييك وتسألك عن حالك في هذا الموقف.',
        options: [
          'Hi Sara! I am doing great and excited to take on this challenge today!',
          'I don’t want to speak any words.',
          'The sky is very blue outside.',
          'Two plus two equals four.'
        ],
        correctIndex: 0,
        hintAr: 'رد بتحية ودودة وإبداء الحماس للموقف.',
        explanationAr: 'الرد الأول إيجابي ومهذب ويفتح مجالاً لمحادثة غنية وممتعة.'
      }
    ],
    quiz: [
      {
        id: `${cleanId}_q1`,
        questionEn: 'What is the most effective way to improve your English conversational confidence?',
        questionAr: 'ما هي الطريقة الأكثر فعالية لتطوير ثقتك في المحادثة باللغة الإنجليزية؟',
        options: [
          'Practicing spoken scenarios out loud and learning from instant feedback',
          'Only reading silently without ever speaking',
          'Memorizing words without using them in sentences',
          'Avoiding mistakes by staying silent'
        ],
        correctIndex: 0,
        explanationAr: 'التحدث بصوت مسموع في مواقف حقيقية وتلقي الملاحظات الفورية هو أسرع طريق للطلاقة.'
      },
      {
        id: `${cleanId}_q2`,
        questionEn: 'Choose the correct modal for polite requests: "_____ you please help me with this?"',
        questionAr: 'اختر الأداة الصحيحة للطلب المهذب: "هل يمكنك مساعدتي في هذا، من فضلك؟"',
        options: ['Could', 'Must not', 'Will not', 'Did'],
        correctIndex: 0,
        explanationAr: 'Could هي أداة الطلب المهذب الشائعة في الإنجليزية.'
      },
      {
        id: `${cleanId}_q3`,
        questionEn: 'What does "fluency" mean?',
        questionAr: 'ماذا يعني مصطلح "Fluency"؟',
        options: [
          'Speaking smoothly, easily, and with natural flow',
          'Translating every word into Arabic in your head',
          'Speaking as fast as you can without breathing',
          'Reading from a dictionary'
        ],
        correctIndex: 0,
        explanationAr: 'الطلاقة تعني التحدث بسلاسة وانسيابية طبيعية دون تردد أو انقطاع.'
      },
      {
        id: `${cleanId}_q4`,
        questionEn: 'Complete the sentence: "I look forward to _____ more English today."',
        questionAr: 'أكمل الجملة: "أتطلع إلى ممارسة المزيد من الإنجليزية اليوم."',
        options: ['practicing', 'practice', 'practiced', 'to practice'],
        correctIndex: 0,
        explanationAr: 'العبارة "look forward to" يتبعها دائماً الفعل مضافاً إليه ing (Gerund).'
      }
    ]
  };
}
