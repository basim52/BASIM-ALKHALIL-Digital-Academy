import { BookCourse } from './types';

export const powerOfNowCourse: BookCourse = {
  id: 'power_of_now',
  titleAr: 'قوة الآن: بوابتك إلى السلام الروحي والتنوير الحقيقي',
  titleEn: 'The Power of Now & Spiritual Awakening',
  authorAr: 'إيكهارت تول',
  authorEn: 'Eckhart Tolle',
  coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'رحلة وجدانية عميقة لفك ارتباط الهوية عن ثرثرة العقل الصاخب وتجاوز وهم الماضي والمستقبل واعتناق حضور الحاضر الساكن.',
  descriptionEn: 'An immersive journey to free your core identity from the incessant noise of the mind, dissolving psychological time to anchor yourself in the profound stillness of the present.',
  isLocked: false,
  chapters: [
    {
      id: 'pon_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: وهم العقل الحاكم كبوابة للعبث',
      titleEn: 'Chapter 1: You Are Not Your Mind & The Egoic identification Illusion',
      descriptionAr: 'فك الارتباط عن الأفكار الصاخبة واسترجاع حقيقتك كشاهد ومراقب مهيب للثرثرة.',
      descriptionEn: 'Decoupling your core self-identity from continuous thoughts, discovering your true self as the quiet observer.',
      lessons: [
        {
          id: 'pon_ch1_l1',
          idNum: 1,
          titleAr: '1. شفرة العقل الحالم: وهم الهوية الفكرية والأفكار المشتتة',
          titleEn: '1. The Illusion of Thought: Breaking Connection with the Mental Radio',
          duration: '4m',
          type: 'intro',
          contentAr: `يتطابق معظم البشر اليوم مع عقولهم وأفكارهم ظانين أنهم هم ذلك الصوت الداخلي الذي ينطق ويفسر ويصرخ بلا انقطاع بوعيهم. الحقيقة الروحية العظمى تكشف: **أنت لست عقلك؛ عقلك مجرد أداة إنتاج وتحليل**، وأنت الكينونة الشاهد والمراقب الساكن المستقر خلف كل تلك الأفكار بسلام وقار.`,
          contentEn: `Most people operate under the belief that they are identical to their thoughts. The master spiritual truth reveals: You are not your mind. Your mind is an active processing tool; you represent the silent awareness observing that mental activity.`
        },
        {
          id: 'pon_ch1_l2',
          idNum: 2,
          titleAr: '2. العائق الأكبر للتنوير: وهم الاضطرار للماضي والهروب للمجهول',
          titleEn: '2. The Core Blocker of Awakening: The Compulsion to Judge and Refuse the Now',
          duration: '3m',
          type: 'core',
          contentAr: `ينشأ ركود الروح عندما يرفض عقلنا اللحظة الحالية (الآن) ويسجننا في حسرات الأمس أو قلق وتخطيط المستقبل السيكولوجي اللانهائي. التحسين والانطلاق المعرفي يبدآن بقبول متكامل وسلام تام مع الحاضر كما هو، لنوفر طاقتنا الكامنة للتصميم والإتقان بالعمل بذكاء.`,
          contentEn: `Spiritual stagnation occurs when the egoic mind rejects the Present and chains our awareness to past regrets or future anxiety. Surrendering to the present moment preserves your internal energy to create designs with outstanding execution.`
        }
      ],
      quiz: [
        {
          questionAr: "من أنت حقيقةً خلف تلك الأفكار والثرثرة العقلية المستمرة التي يصفها إيكهارت تول؟",
          questionEn: "Who are you truly behind the continuous thoughts and mental noise described by Eckhart Tolle?",
          optionsAr: [
            "أنت ذلك الصوت الداخلي الذي يتحدث طوال الوقت دون توقف.",
            "أنت الوعي الشاهد والمراقب الساكن المستقر خلف حركة العقل والأفكار بوقار ونقاء.",
            "أنت تجميع للشهادات المهنية والأكاديمية التي حزتها بحياتك."
          ],
          optionsEn: [
            "You are that inner chatterbox that speaks non-stop throughout your shifts.",
            "You are the silent Witness, the observing consciousness behind the stream of thoughts.",
            "You are the simple accumulation of academic degrees and certifications acquired."
          ],
          correctIndex: 1,
          explanationAr: "إدراكك وتسييس فكرك كشاهد على تفكير يحررك فوراً من سجن الأنا الزائف ويوقظ سكينتك الطبيعية الحية.",
          explanationEn: "Identifying as the silent observer of your mind instantly releases you from egoic tension, unleashing your tranquil presence."
        }
      ]
    },
    {
      id: 'pon_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: الوعي مخرج العذاب وإذابة جسد الألم',
      titleEn: 'Chapter 2: Conquering the Pain-Body & Dissolving Egoic Suffering',
      descriptionAr: 'تشريح الكيان العاطفي المظلم الممتص لطاقاتك، وكيفية إذابته بالحضور الساكن.',
      descriptionEn: 'Deconstructing the emotional entity called the Pain-Body, and using conscious attention to dissolve it.',
      lessons: [
        {
          id: 'pon_ch2_l1',
          idNum: 1,
          titleAr: '1. جسد الألم (Pain-Body): كيفية تراكم الأثقال الكامنة بالباطن',
          titleEn: '1. The Pain-Body: Understanding the Parasitic Emotional Energy Field',
          duration: '4m',
          type: 'intro',
          contentAr: `جسد الألم هو تراكم لكل مشاعر الحزن والغضب والخسارة التي عشتها ولم تسلم معها بالماضي. هذا الكيان الخفي يتقوت على آلامك ويدفعك بشراسة لاختلاق خصومات عائلية أو عمالية ركيكة ليعيد تجديد طاقته المظلمة.`,
          contentEn: `The Paint-Body is the accumulated field of past trauma and grief you failed to accept. It acts as an energetic parasite, taking over your mind during distress to feed on drama and conflict.`
        },
        {
          id: 'pon_ch2_l2',
          idNum: 2,
          titleAr: '2. تفكيك الكيان الساحق: قوة الرصد اللحظي والتسليم الشهم بغير معارضة',
          titleEn: '2. The Transmutation: Uncoupling Pain-Body through Witness Consciousness',
          duration: '3m',
          type: 'core',
          contentAr: `عندما ينهض الغضب أو الحزن الثقيل فجأة بصدرك؛ لا تقاومه ولا تصنفه كعدو ولا تسقط فيه، بل ارصده كطاقة عاطفية حية بالجسد وأبق معها كشاهد صامت. هذا الرصد الحاضر الودود يسحب الوقود تدريجياً من جسد الألم ويذيبه في محيط السلام والوقار الذاتي بالكامل.`,
          contentEn: `When waves of sorrow or anger erupt inside you, suppress the urge to react. Observe the somatic energy directly without judgment. Quietly witnessing the feeling starves the Pain-Body, dissolving it into peaceful focus.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف تفكك وتذيب طاقة 'جسد الألم' (Pain-Body) المحتقنة بداخلك دون مقاومة قمعية؟",
          questionEn: "How do you actively dissolve the heavy parasitic energy of the Pain-Body without suppression?",
          optionsAr: [
            "بالاشتباك الساخط والتباكي ولوم الآخرين وتغذية دوامة الصراع الم منهجي.",
            "برصده ومراقبته كطاقة عاطفية حية بالجسد كشاهد صامت ودود دون أن تعارضه أو تصنف نفسك معه بجهالة.",
            "بالذهاب للنوم الطويل وتجاهل الأزمة كلياً."
          ],
          optionsEn: [
            "By entering hostile arguments, playing victim, and feeding the loop of dramatic conflict.",
            "By observing the feeling directly as a physical vibration, staying as the silent Witness without identifying with it.",
            "By sleeping long hours and pretending nothing is wrong."
          ],
          correctIndex: 1,
          explanationAr: "مراقبة مشاعرك بهدوء وسكينة تسحب الفتيل والشحنة الكهربية والتوتر ليبقى عقلك صافياً متميزاً.",
          explanationEn: "Observing emotional energy with silent attention removes its charge, leaving your mind clear to function on strategic milestones."
        }
      ]
    },
    {
      id: 'pon_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: التحرك بعمق في الآن وتجاوز وهم الزمن السيكولوجي',
      titleEn: 'Chapter 3: Transcending Psychological Time & Embracing the Present',
      descriptionAr: 'تفكيك أغلال أوهام الأمس والغد والالتزام بشرف اللحظة الآنية كبوابة للاستقلال والوفرة.',
      descriptionEn: 'Breaking free from mental conditioning of past and future, anchoring yourself in the absolute Present.',
      lessons: [
        {
          id: 'pon_ch3_l1',
          idNum: 1,
          titleAr: '1. لغز اللعبة الزمنية: الماضي لم يعد موجوداً والمستقبل لم يأت بعد',
          titleEn: '1. The Absolute Present: Past is Memory, Future is projection',
          duration: '4m',
          type: 'intro',
          contentAr: `الماضي مجرد أثر لذكرى في عقلك لعبرة انقضت، والمستقبل صورة خيالية لم تشرق شمسها. الشيء الوحيد الملموس والحقيقي والذي تملك فيه السيادة والقرار والأمان بالوجود هو **هذه اللحظة (الآن - Now)**. عندما تستحوذ اللحظة تماماً على رصدك، تتلاشى فجأة ضغوط المعيشة وتشرق رهافة الإبداع والتمكين الفعال.`,
          contentEn: `The past is simply a memory trace of a moment gone; the future is a projected fantasy. The single real platform where you actually exist and hold executive authority is the **Now**. Anchoring focus here clears mental fatigue.`
        },
        {
          id: 'pon_ch3_l2',
          idNum: 2,
          titleAr: '2. الزمن العملي مقابل الزمن السيكولوجي: التمييز الفارق لسلامتك',
          titleEn: '2. Clock Time VS. Psychological Time: Navigating Goals Without Anxiety',
          duration: '3m',
          type: 'core',
          contentAr: `استخدم زمن الساعة (Clock Time) لجدولة المواعيد وتصميم المشاريع وتطوير الأكواد؛ ولكن تخلص فوراً من الزمن السيكولوجي (Psychological Time) وهو العيش في هم وحسرة الأخطاء القديمة أو الهلع من فقر الغد؛ لتصون استقرارك المهني والذاتي بسلام.`,
          contentEn: `Utilize Clock Time to set targets, schedule coding blocks, and coordinate tasks. Shed Psychological Time (revisiting old regrets or dreading future failures) to maintain clean mental integrity.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الفارق الجوهرى والخط العام الذي يفصل 'زمن الساعة' عن 'الزمن السيكولوجي'؟",
          questionEn: "What critical boundary separates 'Clock Time' from 'Psychological Time' according to Eckhart Tolle?",
          optionsAr: [
            "لا وجود لأي فارق فكلاهما مصنف بدقة بالبنوك والشركات.",
            "زمن الساعة مخصص للتحديد والتنفيذ العملي للمهام؛ والزمن السيكولوجي هو الارتداد المعيق بالذاكرة حزناً أو هلعاً من المجهول.",
            "زمن الساعة يحتاج لقروض مرتفعة وفوائد لشرائه."
          ],
          optionsEn: [
            "There is no difference, as both are recorded in financial spreadsheets identically.",
            "Clock Time is for practical scheduling and task execution; Psychological Time is the anxious dwelling in memories and fantasies.",
            "Clock Time demands massive high-interest bank financing to procure."
          ],
          correctIndex: 1,
          explanationAr: "تطهير وعاء زمانك من أعباء الزمن السيكولوجي ينير بصيرتك لتتمكن من حل المهام البرمجية والهندسية الحاضرة بنبوغ.",
          explanationEn: "Ditching psychological time cleanses your cognitive apparatus, enabling you to deliver outstanding focus on present engineering challenges."
        }
      ]
    },
    {
      id: 'pon_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: تفكيك صخب الأنا والتسليم المطلق للآن',
      titleEn: 'Chapter 4: Dissolving the Ego and Bypassing Egoic Reactivity',
      descriptionAr: 'التحرر من متطلبات العظمة الزائفة والأنا المتهكمة التي تبث الفتن بالقلوب.',
      descriptionEn: 'Shedding the false self and its defensive mechanisms, returning to authentic presence.',
      lessons: [
        {
          id: 'pon_ch4_l1',
          idNum: 1,
          titleAr: '1. وهم الأنا التفاخري: كيف يبني العقل دروعه الدفاعية الزائفة؟',
          titleEn: '1. The Egoic Identity: How Your Mind Strains You with Comparisons',
          duration: '4m',
          type: 'intro',
          contentAr: `الأنا (Ego) هو هوية اصطناعية تصيغها عقولنا استناداً للممتلكات الخاضعة لملكيتك، ورأى الناس فيك، والمظهر الخارجي وصداقات الشهرة. الأنا يعيش في رعب دائم من الفناء والانجراف بغير انتباه؛ مما يبث مشاعر الغيرة والحسد وحروب المكاتب الركيكة. تحررك من الأنا يبدأ بالارتماء في بساطة الحضور.`,
          contentEn: `The Ego is a synthetic identity manufactured by the mind using possessions, titles, reputation, and social loops. It resides in chronic dread of being ignored or proven wrong, producing jealousy and office conflicts.`
        },
        {
          id: 'pon_ch4_l2',
          idNum: 2,
          titleAr: '2. التسليم المطلق (Surrender): القوة الإعجازية التي لاتفهمها القوى العادية',
          titleEn: '2. The Surrender Bridge: Converting Present Resistance into Tranquil Energy',
          duration: '3m',
          type: 'core',
          contentAr: `التسليم والقبول ليس انهزاماً أو ضعفاً كلياً؛ هو قبول عميق وصامت للوضعية الحالية كما هي دون معارضة ذهنية أو تباكي. عندما تقبل حقيقة المأزق، يتلاشى الضغط العاطفي فوراً، وتنبجس من باطن لدنك الحكمة والحلول الفطرية الفائقة لتسييس أي صعاب بساحات التفوق والشركات الكونية بسلام.`,
          contentEn: `Surrender is not passive defeat or complacency; it is a profound, silent acceptance of the current condition as it is. Surrendering clears emotional panic, allowing clear-minded intellect to construct creative escape paths.`
        }
      ],
      quiz: [
        {
          questionAr: "ما الذي يقصده الكاتب بمفهوم 'التسليم المطلق' (Surrender) بمسيرة التنوير؟",
          questionEn: "What is Eckhart Tolle's functional explanation of 'Surrender'?",
          optionsAr: [
            "الاستسلام للكسول وتفويض العمل والعيش في فقر ووهن دائم.",
            "القبول الصامت والوعي الشجاع بالواقع الراهن كما هو دون تباكٍ أو معارضة ذهنية من قماشة الأنا، متبوعاً بحراك شجاع للحل.",
            "التنازل عن كافة القوانين ومبادئ النزاهة ورصيد العهد."
          ],
          optionsEn: [
            "Submitting to laziness, stopping work completely, and existing in chronic dependence.",
            "Accepting the present reality as it is without internal egoic resistance, followed by dynamic, focused action toward resolutions.",
            "Ditching all ethical boundaries and covenant agreements with cynicism."
          ],
          correctIndex: 1,
          explanationAr: "التسليم الواعي ينهي هدر الطاقة في الحرب النفسية مع الحقيقة، ويوجه رصيد العقل لتأسيس وصيانة الأصول والتميز.",
          explanationEn: "Surrender stops the cognitive hemorrhage of fighting reality, directing your entire executive reserve toward constructive solutions."
        }
      ]
    },
    {
      id: 'pon_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: بوابات الجسد الداخلي والسكينة الكبرى للروح',
      titleEn: 'Chapter 5: Accessing the Inner Body for Restorative Serenity',
      descriptionAr: 'غمر خلاياك بالوعي المطلق لإنهاء سموم التوتر والاتصال السري بنبع الكينونة السائد.',
      descriptionEn: 'Flooding your cells with conscious attention, establishing deep somatic tranquility to mute corporate stress.',
      lessons: [
        {
          id: 'pon_ch5_l1',
          idNum: 1,
          titleAr: '1. جسدك الداخلي المعبر: بوابتك السائلة نحو التنوير الحي والصفاء الوجودي',
          titleEn: '1. Somatic Anchor: Reclaiming the Alive Energy within Your Physical Vessel',
          duration: '4m',
          type: 'intro',
          contentAr: `يقضي العوام حياتهم منفصلين عن أبدانهم، غارقين بالكامل في رؤوسهم وصراخ أفكارهم. جسدك الداخلي (Inner Body) هو بوابة وقناتك السائلة نحو الكينونة الكبرى. عندما تبسط وتوجه تركيزك لتشعر بالطاقة الحيوية والأنفاس من باطن خلايا جسمك؛ تصمت فجأة الأفكار كالسحر وتعم السكينة.`,
          contentEn: `Most people exist completely severed from their bodies, trapped in the loud echo chambers of their heads. Tuning into your Inner Body—sensing the life energy vibrating in your limbs—quiets mental noise immediately.`
        },
        {
          id: 'pon_ch5_l2',
          idNum: 2,
          titleAr: '2. غمر الجسد بالوعي المطلق: تمرين فك الاحتقان العصبي اليومي',
          titleEn: '2. Somatic Cleansing: Flooding the Physical Network with Quiet Consciousness',
          duration: '3m',
          type: 'core',
          contentAr: `قبل الدخول في قاعة اجتماع هام أو أمام لوحة تحكيم، خذ دقيقة لتغمير وعيك ببدنك. اشعر بيقظة ذراعيك وصدرك وتدفق الأنفاس بوقار وتؤدة. هذا التمرين البسيط يطرد التوتر ويرش الهدوء ويثبت مناعتك العملية من الهلع والوهن بالشركات بالكامل.`,
          contentEn: `Prior to entering any critical presentation, allocate two minutes to flood your body with attention. Sense the internal life force in your posture. This somatic grounding ejects workplace anxiety, establishing absolute composure.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يفيدنا الاتصال المنهجي مع 'الجسد الداخلي' (Inner Body) في صيانة الأداء اليومي؟",
          questionEn: "How does periodic connection with the Inner Body preserve daily performance?",
          optionsAr: [
            "يجعل الموظف متردداً وعاجزاً عن التعبير عن رأيه بالكامل بمسير العمل.",
            "يعمل كمرساة حاضرة تسحب وعيك وعقلك من صخب الأفكار وتدمر بذور التوتر والهلع عصبياً وصحياً ببراعة.",
            "يجذب الديون والمشاكل القانونية للشركات."
          ],
          optionsEn: [
            "It turns you into a highly hesitant worker incapable of speaking in corporate sprints.",
            "It acts as a powerful anchor that grounds your consciousness from mental chatter, dissolving biological and neurological stress.",
            "It attracts financial liabilities and legal litigation toward your startup."
          ],
          correctIndex: 1,
          explanationAr: "يقظتك السوماتية تمنع انزلاق عقلك في سيناريوهات الخوف والترقب وتمنحك حضوراً واثقاً كحضور ملوك الكينونة.",
          explanationEn: "Somatic anchoring blocks the cognitive descent into worry loops, yielding an unshakeable poise that impresses clients."
        }
      ]
    },
    {
      id: 'pon_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: الحضور الخالص ودور الشاهد المعرفي اليقظ',
      titleEn: 'Chapter 6: The State of Presence & The Witnessing Consciousness',
      descriptionAr: 'صناعة مساحة الصمت والوعي المفتوح دون الحاجة الدائمة للحكم والتصنيف بالأسواق كلياً.',
      descriptionEn: 'Cultivating spacious attention, learning to perceive life without the immediate urge to label and judge.',
      lessons: [
        {
          id: 'pon_ch6_l1',
          idNum: 1,
          titleAr: '1. شفرة الحضور الواعي: ألا تكون غائباً وأنت بالعمل',
          titleEn: '1. Intentional Presence: Escaping the Trance of Autopilot Habits',
          duration: '4m',
          type: 'intro',
          contentAr: `الحضور الخالص (Presence) هو أن تكون هنا بجوارحك وكامل انتباهك باللحظة الحالية. غياب وعيك وأنت تقود أو تكتب البرمجيات يهدر مواردك ويجعلك تفقد التفاصيل الفنية الهامة التي تفصل المتميز المنجز عن السطحي العادي. الحضور هو قمة التمكين والسيادة بساحات العمل.`,
          contentEn: `Presence is the state of being fully awake, with 100% of your attention integrated into the current space. Slipping into autopilot while drafting coding or business layouts leaks cognitive efficiency, eroding performance quality.`
        },
        {
          id: 'pon_ch6_l2',
          idNum: 2,
          titleAr: '2. الوعي كشاهد ناصح: ترويض جنون الأفكار المكررة وصون الكينونة',
          titleEn: '2. The Witness as a Safe Guard: Silencing Repetitive Mental loops',
          duration: '3m',
          type: 'core',
          contentAr: `عقلك قد يكرر سيناريوهات الهلع والقلق لمئات المرات دون وعي منك. التزامك بوعي الشاهد كشاهد ناصح صامت ومراقب يقظ ينهي بهدوء وتؤدة تلك الحلقات المكررة ويطرد الخوف؛ لتنعم بسماء صافية من النور والإبداع والسكينة الحية بالدائرة.`,
          contentEn: `The mind often runs the same loops of self-doubt and validation hundreds of times. Installing the Witness stance isolates you from these cognitive distortions, restoring mental stillness and peace of mind.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف نمر ونصل للحضور الفعلي الخالص (Presence) بمسيرة التطبيق التنموية بالكتاب؟",
          questionEn: "How do we enter the profound state of conscious Presence in our daily work?",
          optionsAr: [
            "باللهاث خلف شحنة الهواتف والأجهزة التقنية لمطالعة كل الإشعارات فجر كل يوم.",
            "بتسليط كامل طاقات انتباهك ورصدك للحظة الراهنة، وسحب قنوات التغذية من الذكريات القديمة وقلق المجهول بسلام وقار.",
            "بالتظاهر بعدم الاهتمام بصحة ومستقبل الأقران."
          ],
          optionsEn: [
            "By obsessively tracking digital notifications on your smartphone from dawn until dusk.",
            "By directing the totality of your attention onto what is happening now, cutting feed channels to memories and future fear.",
            "By showing cold disregard for the security and success of teammates."
          ],
          correctIndex: 1,
          explanationAr: "توجيه بوصلة وعيك للحاضر يمنحك تركيزاً كاسحاً لتفتيت المشاكل البرمجية والمالية بدقة المشرط الجراحي.",
          explanationEn: "Directing awareness to the Now channels raw cognitive power toward your work, letting you solve complex issues with surgical precision."
        }
      ]
    },
    {
      id: 'pon_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: النبع غير التجلي وصمت الأثولوجي لسلام الروح بالشركة والتطوير الكوني للذات',
      titleEn: 'Chapter 7: Accessing the Unmanifested: Source of Eternal Stillness',
      descriptionAr: 'قوة الفراغ والصمت الكوني لإعادة تليين وتوطيد نضارة الإدراك واسترجاع قواك الفطرية.',
      descriptionEn: 'Connecting with the deep unmanifested dimension of Being through outer silence and spacial awareness.',
      lessons: [
        {
          id: 'pon_ch7_l1',
          idNum: 1,
          titleAr: '1. شرف الصمت والفراغ: كيف تمخر سفن طاقتك الروحية بحكمة؟',
          titleEn: '1. The Oasis of Silence: Unplugging from the Constant Acoustic Chaos',
          duration: '4m',
          type: 'intro',
          contentAr: `في عالم يفيض بالصخب والضوضاء السمعية والبصرية بالشركات؛ يصبح الصمت الخارجي والداخلي هو بوابتك الفخمة لإعادة شحن العقل. تلمس الصمت والخلود لعدة دقائق كل صباح يطرد التشويش الذهني ويديك بوقار لافت بساحات الإبداع بالعمل بالكامل.`,
          contentEn: `In an era flooded with cognitive noise and endless digital notifications, outer and inner silence serves as your primary sanctuary. Resting in absolute silence for several minutes each morning restores neural freshness.`
        },
        {
          id: 'pon_ch7_l2',
          idNum: 2,
          titleAr: '2. الوعي الفراغي: النظر للفراغ الكامن بين الأشياء بدل الركوب فيها',
          titleEn: '2. Spatial Awareness: Sensing the Vast Space that Hosts the Material World',
          duration: '3m',
          type: 'core',
          contentAr: `العقل يركز دوماً على الممتكلات والأجسام والمشاكل المادية؛ الحكماء يوجهون رصدهم نحو الفراغ والمحيط الصامت المهيب الذي يضم تلك الأجسام. هذا التحول بالمنظور ينقل وعيك لأبعاد السلام والسكينة الكبرى للوجود بكرامة صلبة.`,
          contentEn: `The human mind concentrates on physical containers and temporal conflicts. Sages learn to perceive the silent, quiet space holding those objects. This perspective shift aligns you with the deep tranquility of Being.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يسهم سكون 'النبع غير المتجلي' (The Unmanifested) في ترقية إبداع الباني والمهندس بالعمل؟",
          questionEn: "How does tuning into the Unmanifested upgrade a creator's structural creativity?",
          optionsAr: [
            "يجعله مهملاً لمهامه ومبادراته ويؤدي لخسارة الصفقات بالأسواق بالكلية.",
            "يطرد تشويش العصف الذهني غير الواعي ويوفر له صفاءً وابتكاراً ينبعان من السكون لحل الأزمات بكفاءة مبرزة.",
            "يحرر الزملاء من دفع الحقوق المالية وعقود الشراكة الزائفة."
          ],
          optionsEn: [
            "It turns them into listless operators, leading to missed targets and complete business loss.",
            "It dismisses the static noise of frantic thinking, returning a pristine clarity that solves complex bugs with calm mastery.",
            "It frees cohorts from fulfilling their legal contracts and financial covenants."
          ],
          correctIndex: 1,
          explanationAr: "السكون والاتصال بنبع الصفاء والخلود تتوجه بدماغك للبدايات والنواتج الصالحة لتفوز دوماً بقلب وعقل مطمئن بنقاء وافر.",
          explanationEn: "Attuning to inner silence cleanses your intelligence, preparing your mind to navigate complex problems with outstanding elegance."
        }
      ]
    },
    {
      id: 'pon_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: العلاقات المتنويرة (تحويل التعلق والغيرة المزمنة لسلام متبادل)',
      titleEn: 'Chapter 8: Enlightened Relationships: Transforming Attachment to Shared Peace',
      descriptionAr: 'قواعد فك شفرة العلاقات النرجسية والأسرية المبتزة وتسيير صلات المحبة والنماء بوقار ومحبة تامين.',
      descriptionEn: 'Reconstructing relationships, transmuting egoic dependency and control into authentic warmth and space.',
      lessons: [
        {
          id: 'pon_ch8_l1',
          idNum: 1,
          titleAr: '1. فخاخ التعلق العاطفي والغيرة المزمنة بالأنا الزائفة',
          titleEn: '1. The Addiction to Love: How Egoic Attachments Mask Deep Self-Rejection',
          duration: '4m',
          type: 'intro',
          contentAr: `التعلق العاطفي المرضي والاستهلاك الشره لقلوب الشركاء هو شكل مستتر من الرفض الذاتي ونقص الوعي الروحي ببدن الأنا. الأنا تستجدي الرضا والحصانة والراحة من تملك الشريك للنجاة والهروب من المعاناة؛ مما يحول العلاقة لميدان حرب حامضة من السيطرة والتفتيت.`,
          contentEn: `Egoic relationship attachments function as a smoke screen for self-rejection. They seek security and happiness from the partner to cover an internal void, transforming the union into an insecure cycle of control and anxiety.`
        },
        {
          id: 'pon_ch8_l2',
          idNum: 2,
          titleAr: '2. جسر العلاقات المتنويرة: توفير مساحة القبول والنبل الصادق',
          titleEn: '2. Harmonious Alliances: Cultivating Presence in Common Bonds',
          duration: '3m',
          type: 'core',
          contentAr: `العلاقة المتنويرة تنشأ بالاحترام المتبادل وقبول شريكك كإنسان حقيقي كما هو بكل نقائصه، بحضور ساكن يفتت الاحتقان. رعاية العلاقة بغير معارضة نرجسية يرسى أسس الأمان والاتفاق الهادف لخدمة مشاريع التنمية بوقار ومحبة تامة.`,
          contentEn: `Enlightened partnerships develop from mutual validation, accepting the partner as a human being without egoic demands. Maintaining presence builds spacious safety, allowing love to grow securely.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف نؤسس ونرقى بالعلاقات الإنسانية لتبلغ مستوى 'العلاقة المتنويرة' الروحية الفخمة؟",
          questionEn: "How do we cultivate interpersonal dynamics to reach an 'Enlightened Relationship'?",
          optionsAr: [
            "بالطاعة العمياء والتنازل التام عن كرامتك وكيانك وشرف عهودك بالكامل.",
            "بالتحرر الصادق من رعب الأنا واستعمار تملك الشريك، ورعاية الصلة بالحضور والقبول والصمت الودود لدوافع الشريك بوقار مبرز.",
            "بتجنب الحديث مع شريكك والعيش في عزلة مستقلة وجافة."
          ],
          optionsEn: [
            "By blind compliance, throwing away your personal dignity and integrity completely.",
            "By liberating oneself from egoic control dramas, nurturing the bond via compassionate presence, and mutual validation.",
            "By ending communication and living in rigid, distant isolation."
          ],
          correctIndex: 1,
          explanationAr: "توجيه بوصلتك للقبول الوجداني مع الشركاء دون اشتراط تملك وتفصيل تفاخري يصون استقرارك ويبارك نضجك بالعيش كحر وقور.",
          explanationEn: "Steering your relationship toward spiritual acceptance without manipulative demands structures a deep, lasting haven of support."
        }
      ]
    },
    {
      id: 'pon_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: قوة الاستسلام والتنوير في بؤرة الوجع والأزمات الصعبة',
      titleEn: 'Chapter 9: Converting Present Resistance into Tranquil Energy',
      descriptionAr: 'قواعد تحويل المأزق والمرض وأزمات الزمان والمال لبوابات للعبور الروحي والارتقاء.',
      descriptionEn: 'How to convert crisis, illness, and external failures into paths toward unshakeable spiritual mastery.',
      lessons: [
        {
          id: 'pon_ch9_l1',
          idNum: 1,
          titleAr: '1. تحويل الوجع لكيمياء روحية: عندما تصنع الأزمات تماسكك',
          titleEn: '1. Alchemical Suffering: Using Extreme Setbacks as Portals to Presence',
          duration: '4m',
          type: 'intro',
          contentAr: `في بؤرة الألم والمرض والخسارة الجائرة؛ ينهض عقلنا بالرفض والصراخ: "لماذا أنا؟". الاستسلام هنا ليس ركوداً مستكيناً بل كيمياء روحية: عندما تقر بالواقع الصادم بصدر ساكن وبلا شكوى، تذوب طاقات التعاسة ويصق معدنك وتتحرك قوتك المعرفية لتصخر الظروف بصلابة وقار.`,
          contentEn: `During intense periods of shock or crisis, the egoic mind screams "Why me?" Surrendering is an alchemical process: accepting the raw reality with unshakeable calmness dissolves internal panic, anchoring you in supreme wisdom.`
        },
        {
          id: 'pon_ch9_l2',
          idNum: 2,
          titleAr: '2. التسليم الختامي: السكينة الصالحة التي تلغي هجمات الخوف عاطفياً',
          titleEn: '2. The Shield of Non-Resistance: Dissolving Workplace Stress',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تمتنع عن مقاومة المجرى والظروف وتنسحب بلطف وهدوء كأمير للسلام؛ تتهاوى قوى التوتر والخصوم أمامك كأوراق مبعثرة بالرياح. صب إرادتك وصمت نيتك بالخير ينشئ لك حصانة معنوية فائقة تحميك من زحف دكاكين القلق والخوف بالمسير بالكامل.`,
          contentEn: `By abandoning non-essential inner resistance, the friction of workplace drama and external gossip simply passes through you with zero impact. Sages maintain non-resistance as their shield, conserving raw power.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف نستخدم مبدأ 'عدم المقاومة' (Non-Resistance) في حماية صحتنا العقلية والجسدية وقت الشدائد؟",
          questionEn: "How do we implement the power of 'Non-Resistance' to protect our mental stability during crises?",
          optionsAr: [
            "بالتباكي والغضب والصراخ ومواجهة الخصوم بعدوانية بذيئة بالشركة.",
            "بالقبول والتصالح الحاضر الصامت مع الحدث، متبوعاً بحراك وقور مبسط لتوجيه حلول المشكلة بصلابة عقول العلماء الهادئة.",
            "بتجنب التفكير والعيش في إدمان الترفيه السلبي الخاوي."
          ],
          optionsEn: [
            "By screaming, raging, and clashing with teammates with hostile behavior in the workspace.",
            "By accepting and reconciling with the present conditions calmly, followed by measured, focused action to resolve challenges.",
            "By shutting down thinking and diving into addictive and empty escape activities."
          ],
          correctIndex: 1,
          explanationAr: "عدم المقاومة وسكون الوجدان يطهر جرحك الداخلي بسرعة ويسرع التحام عواطفك لتعود بطلاً كاسحاً بالأسواق والشركات بصلابة.",
          explanationEn: "Non-resistance preserves your diagnostic capacities, preventing emotional panic from hijacking your operational intellect."
        }
      ]
    },
    {
      id: 'pon_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: السكون المطلق والسكينة الحية والحضور الكوني الصامت',
      titleEn: 'Chapter 10: Absolute Stillness and the Peace that Passes All Understanding',
      descriptionAr: 'التكامل الأسمى والمنتهى الفعلي لمسارات السكن وسلام الروح، والفيض المستقر بمسيرة العمر النبيلة.',
      descriptionEn: 'The ultimate realization of spiritual coherence, finding the permanent silence that supports all modern achievements.',
      lessons: [
        {
          id: 'pon_ch10_l1',
          idNum: 1,
          titleAr: '1. شرف النهاية الصالحة العظيمة: واجهة السكون المستمر بقلب العاصفة',
          titleEn: '1. The Sanctuary of Stillness: Finding Eternal Calmness amidst Corporate Chaos',
          duration: '4m',
          type: 'intro',
          contentAr: `في منتهى رحلتنا السامقة مع هذا السفر المبارك، نصل للجدار التنموي الأوسع: **السكون المطلق** (Absolute Stillness). هذا السكون ليس فراغاً موتاً بل فيضاً وحيوية هادئة تسكن بصدرك طهراً وسلاما. هو السلام الذي يتجاوز كل حسابات عقول العوام بساحات الزمان والمال المتقلبة.`,
          contentEn: `At the culmination of this spiritual journey, we yield to Absolute Stillness. This is not static vacancy but dynamic, living serenity. It represents the peace that passes all academic comprehension, keeping you unshakeable in turmoil.`
        },
        {
          id: 'pon_ch10_l2',
          idNum: 2,
          titleAr: '2. العيش من نبع الكينونة السائد: مظهر السيادة والوقار الشهم الصامد مدى الحياة',
          titleEn: '2. The Radiant Life: Radiating Peace and Authentic Presence in the World',
          duration: '3m',
          type: 'core',
          contentAr: `الآن، وأنت تمتلك أركان هذا النبل، تقدم بوقار كوني واحمل سكينتك وحضورك الصامت لتنير به كل مشروع ومكتب وقنوات اتصال بالشركات المبرزة. دع غبار الملميات يعبر ولا تلتفت لصغار الضوضاء؛ وصن عهد نيتك بالخير والجمال بالكامل. مبارك عليك؛ فقد نلت صدارة الحاضر الشهم المنجز!`,
          contentEn: `Armed with this unyielding realization, step forward. Inject your presence and unshakeable poise into every business module, engineering standup, and partnership channel. Let superficial storms pass without trace. You have claimed the Present!`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الجسد والمنتهى الأسمى والأمل الحقيقي لمسار قوة الآن والتنوير الذاتي الروحي؟",
          questionEn: "What is the ultimate destination and reward of practicing Eckhart Tolle's Power of Now philosophy?",
          optionsAr: [
            "الحصول على أرباح تفاخرية سريعة وهدم علاقاتك الاجتماعية ببلادة بالكامل.",
            "التكامل المطلق مع اللحظة الآنية بسلام وعفّة، وتطهير النفس من غبار الحسد وزعل الأمس، وتسيير الإنجاز والعمل الشريف بصدر وتواطؤ مطمئن بوقار وبنبل.",
            "ملازمة الشك والتباكي وقت الكساد العام بالأسواق الاستثمارية."
          ],
          optionsEn: [
            "Securing quick superficial feedback and breaking social relationships with dullness.",
            "Complete integration with the present Moment, cleansing the self of old burdens and future dread, and performing honest crafts with unshakeable composure.",
            "Remaining in cyclic self-pity and blame when standard market corrections take place."
          ],
          correctIndex: 1,
          explanationAr: "تأسيس بوصلتك على سكون الكينونة ينير عقلك لتتفوق بساحات العمل بنبل وشرف متكاملين يوقظان ثقة الأقران.",
          explanationEn: "Anchoring your identity on silent, conscious presence allows your biological intelligence to manifest work of uncompromised caliber."
        }
      ]
    }
  ]
};
