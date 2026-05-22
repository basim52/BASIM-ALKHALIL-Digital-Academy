import { BookCourse } from './types';

export const youCanWinCourse: BookCourse = {
  id: 'you_can_win',
  titleAr: 'أنت تستطيع للتطبيقات التنموية والنجاح كقائد فطن',
  titleEn: 'You Can Win & Personal Leadership Mastery',
  authorAr: 'شيف كيرو',
  authorEn: 'Shiv Khera',
  coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'الدليل العملي لبناء العقلية الإيجابية المتمرسة وعقد الإصرار الفولاذي وصياغة النجاح من ركام العقبات المهنية والذاتية.',
  descriptionEn: 'A practical roadmap for building a positive attitude, developing unyielding character, setting dynamic goals, and executing with absolute integrity.',
  isLocked: false,
  chapters: [
    {
      id: 'ycw_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: معتقد اليقين - قوة الموقف الذهني الإيجابي',
      titleEn: 'Chapter 1: The Power of Attitude & Unlocking Self-Belief',
      descriptionAr: 'تحرير المارد الكامن، وفهم الأثر الحركي لموقفك وعقليتك تجاه الصعاب.',
      descriptionEn: 'Unleashing your inner drive, understanding how your fundamental attitude dictating success and failure.',
      lessons: [
        {
          id: 'ycw_ch1_l1',
          idNum: 1,
          titleAr: '1. موقفك العقلي هو الأساس: كيف يشكّل استجابتك للوجود؟',
          titleEn: '1. Attitude is Everything: Structuring Your Response to Life',
          duration: '4m',
          type: 'intro',
          contentAr: `موقفك وعقليتك السائدة (Attitude) هي الأداة الكبرى التي تقرر نجاحك أو إخفاقك بالعمل. الموقف الذهني الإيجابي لا يعني تجاهل الواقع أو نفي الأزمات الباردة؛ بل يعني اختيار التركيز المتزن على قنوات الحل والتحسين والابتكار بساحات الصدارة والعمل بصلابة الشجعان.`,
          contentEn: `Your attitude is the ultimate lens filter through which you observe reality. A positive mental attitude does not deny the existence of challenges; rather, it makes you focus dynamically on active solutions and strategic upgrades.`
        },
        {
          id: 'ycw_ch1_l2',
          idNum: 2,
          titleAr: '2. قصة البالونات والغاز الداخلي: ما يحملك للأعلى يكمن بداخلك',
          titleEn: '2. Inside Out Elevation: The Legend of the Balloon Seller',
          duration: '3m',
          type: 'core',
          contentAr: `يروي الكتاب قصة بائع البالونات الذي يسأله طفل صغير: "لو أطلقت بالوناً أسود اللون، فهل سيطير للأعلى كالبقية؟". فيجيب البائع بحنو ووقار: "يا بني، البالونات لا تطير بسبب ألوانها الخارجية، بل بسبب ما يكمن في باطنها وداخلها!". المحرك الحقيقي لصعودك المهني والذاتي يولد من نقاء باطنك وقيمك ونضارة عقليتك وليس من مظاهر الزيف.`,
          contentEn: `A kid asked a balloon vendor: "If you release a black balloon, will it fly high as well?" The vendor replied: "It's not what is on the outside that makes it rise, it is what's inside." Your drive resides within your mind and values, not on superficial vanity.`
        }
      ],
      quiz: [
        {
          questionAr: "تتأسس الفلسفة الكبرى لكتاب 'أنت تستطيع' على جوهر قصة بائع البالونات. ما مغزاها؟",
          questionEn: "What is the core takeaway of Shiv Khera's balloon vendor story?",
          optionsAr: [
            "أن طيران الأجسام والمشاريع يتطابق مع الألوان الخارجية للمظهر فقط.",
            "أن سر صعودك وتفوقك بالعمل وأكاديميتك الكونية يرتبط بما تملكه داخل عقلك وروق وعاء قيمك ومبادئك الفولاذية الصالحة.",
            "تجنب السفر والرحلات ببالونات الهواء لسلامة البدن."
          ],
          optionsEn: [
            "That physical or professional flight is determined only by external cosmetic selections.",
            "That your capacity to rise and lead in life is governed by what resides inside—your mindset, character, and integrity.",
            "Avoiding air balloons altogether to ensure somatic safety during trips."
          ],
          correctIndex: 1,
          explanationAr: "ما بداخل قلبك وبواطن عقلك من الإيجابية والتعقل والنبل المعرفي هو الوقود الحقيقي لقهر العقبات والصعود لقمم المجد.",
          explanationEn: "Your internal configurations (values, grit, ethics) drive your capability to withstand shocks and lead project initiatives successfully."
        }
      ]
    },
    {
      id: 'ycw_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: تقدير الذات الشامخ (أسرار الثقة بالنفس والنزاهة)',
      titleEn: 'Chapter 2: Authentic Self-Esteem & Building Unyielding Confidence',
      descriptionAr: 'منظومة تفكيك وهن الشك وكيف ترفع تقديرك الذاتي مستنداً إلى الإنجاز الشريف والنوايا والنزاهة.',
      descriptionEn: 'Deconstructing self-doubt, building healthy self-esteem rooted in moral clarity and persistent achievement.',
      lessons: [
        {
          id: 'ycw_ch2_l1',
          idNum: 1,
          titleAr: '1. الفارق بين تقدير الذات المنتفخ والتمكين الفعلي الصادق',
          titleEn: '1. Inflated Ego VS. Authentic Self-Esteem: Structuring True Worth',
          duration: '4m',
          type: 'intro',
          contentAr: `تقدير الذات الحقيقي (Self-Esteem) يولد من الإنجاز المعرفي الشريف، والنزاهة المعاملاتية، والالتزام بمبادئك. هو يختلف تماماً عن الغرور المنتفخ (Ego) الذي يطالب بالتفخيم والتقدير تفاخرياً دون تقديم أي نتاج حركي حقيقي أو قيمة باقية.`,
          contentEn: `True self-esteem scale is constructed on real ethical milestones, uncompromised honesty, and skills. It differs entirely from inflated ego, which craves absolute validation and superficial applause without performing any substantive tasks.`
        },
        {
          id: 'ycw_ch2_l2',
          idNum: 2,
          titleAr: '2. جسر النزاهة والضمير: صيانة سلام روح التوافق والالتزام بالقول',
          titleEn: '2. Conscience & Consistency: Aligning Words with Ethical Actions',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تلتزم بكلمتك ووعودك تجاه نفسك وتجاه شركائك، تزداد ثقتك وتقديرك الذاتي وتتطهر خلاياك من التوتر والوهن. صيانة الضمير هي الوقاية الأولى المانعة لضياع الهيبة وتوهن الشخصية بساحات العمل.`,
          contentEn: `Aligning deeds with declarations acts as an absolute defense against cognitive anxiety. Honoring commitments expands your self-valuation, giving you robust power to act decisively in commercial teams.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يفيدنا تقدير الذات الشامخ والنزاهة الضميرية في حفل الصعود المهني والشركات؟",
          questionEn: "How does authentic, uncompromised self-esteem yield professional advantages in corporate settings?",
          optionsAr: [
            "يجعل الموظف متغطرساً ويتعالى على زملائه بالشركات.",
            "يمنحه مناعة ووقاراً وشجاعة للتصرف المنهكي النبيل والوفاء بالعهود وابتكار الحلول بذكاء وسكينة.",
            "يؤدي لتجمد الأداء وإهمال متابعة مستجدات الأسواق."
          ],
          optionsEn: [
            "It triggers unhelpful pride, forcing you to look down on cohorts.",
            "It provides you with unyielding psychological resilience, clarity to fulfill oaths, and energy to solve problems calmly.",
            "It ends in performance stall and skipping market feedback."
          ],
          correctIndex: 1,
          explanationAr: "تقدير الذات المغذى بالنزاهة يطرد رعب الفشل ويمنحك حضوراً واثقاً متزناً يبدد سموم التردد والبلادة.",
          explanationEn: "Authentic self-worth dismisses performance fears, leaving your focus clear to execute milestones with poise."
        }
      ]
    },
    {
      id: 'ycw_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: الذكاء الاجتماعي وبناء المغناطيس البشري الكوني للألفة',
      titleEn: 'Chapter 3: Interpersonal Mastery & Designing Relational Magnetism',
      descriptionAr: 'قوة الألفة وبناء جسور العلاقات المتينة ونزع الصراعات بفضيلة اللين وحفظ النوايا المبرزة.',
      descriptionEn: 'The art of building resilient relational networks, dissolving conflicts with compassion and professional grace.',
      lessons: [
        {
          id: 'ycw_ch3_l1',
          idNum: 1,
          titleAr: '1. معيار الانسجام الإنساني: كيف تكسب قلوب الأقران والشركاء؟',
          titleEn: '1. Human Coherence: Cultivating Mutual Dignity and Sincerity',
          duration: '4m',
          type: 'intro',
          contentAr: `لن تبلغ غاياتك الاستثمارية أو البرمجية بمفردك؛ النجاح الحقيقي ثنائي وتفاعلي يتكامل مع الآخرين. الذكاء الاجتماعي يبدأ بالاعتراف بوجود وكرامة الجميع، وحفظ العهد، وإبداء الامتنان والشكر الحقيقي الفعال بدل المجاملات الوثنية الخاوية.`,
          contentEn: `Outstanding breakthroughs are rarely solo events; they are collaborative co-creations. Social intelligence starts by recognizing and validating others' dignity, praising sincerely, and avoiding shallow flattery.`
        },
        {
          id: 'ycw_ch3_l2',
          idNum: 2,
          titleAr: '2. تذويب النزاعات ونبذ العداوات: قوة الرصد ونبل اللامواجهة البذيئة',
          titleEn: '2. De-escalating Friction: Relational Poise Under Societal Pressures',
          duration: '3m',
          type: 'core',
          contentAr: `تصادم الآراء والمصالح أمر طبيعي في دوائر الاستثمار والشركات. الشخص البطل ينزع فتيل الغضب بمرونة وحلم، ويتجنب الجدال العقيم البذيء الذي يستنزف الروح والوقت، مستبدلاً إياه بحوار علمي مبني للمصلحة ومبهر بوقاره الكوني.`,
          contentEn: `Divergent viewpoints are natural in business. Elite operators navigate conflict without descending into hostile debates, maintaining clear communication channels to preserve relational bank accounts.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو المحرك الحقيقي لبناء علاقة اجتماعية متينة ومستقرة ببيئة العمل والشركات؟",
          questionEn: "What is the primary indicator for constructing cohesive, lasting bonds in the corporate environment?",
          optionsAr: [
            "تزييف الكلمات والمجاملات السطحية الخاوية لتحقيق مصالح عابرة وخادعة بالكامل.",
            "الصدق والنزاهة وتلمس احترام الآخرين والامتنان العميق لصنيعهم بصمت وود تامين.",
            "مقاطعة كافة اجتماعات الفريق والتهرب المهني الجبان."
          ],
          optionsEn: [
            "Faking shallow verbal compliments and manipulation to extract rapid, opportunistic benefits.",
            "Sincerity, mutual respect, demonstrating genuine gratitude, and upholding ethical integrity.",
            "Skipping corporate standups and exhibiting fear-driven avoidance."
          ],
          correctIndex: 1,
          explanationAr: "العلاقات المبنية على أصول النزاهة والمودة الصادقة تجلب تحالفات هائلة مباركة تدعم أهدافك الاستراتيجية.",
          explanationEn: "Alliances constructed on values resist stress, providing reliable scaffolding for complex industrial goals."
        }
      ]
    },
    {
      id: 'ycw_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: صقل المعدن الأخلاقي وبناء الشخصية الطاهرة',
      titleEn: 'Chapter 4: Designing Character: The Bedrock of True Leadership',
      descriptionAr: 'قيمة المبادئ الحاكمة، وصيانة الأمانة العقدية لتكون علامتك الفارقة وسط الغث والسمين بالأسواق.',
      descriptionEn: 'The role of uncompromised moral principles and values, establishing character as your ultimate competitive differentiator.',
      lessons: [
        {
          id: 'ycw_ch4_l1',
          idNum: 1,
          titleAr: '1. شفرة الشخصية ضد الشخصية المظهرية: من أنت بالظلام؟',
          titleEn: '1. True Character VS. Reputation: Integrity When Nobody is Looking',
          duration: '4m',
          type: 'intro',
          contentAr: `سمعتك (Reputation) هي ما يعتقده العوام عنك؛ أما شخصيتك الأخلاقية (Character) هي حقيقتك في الظلام وحقيقة تصرفاتك عندما تغيب الرقابة تماماً. الشخصية المعقودة بالمبادئ كالصدق والعدالة والأمانة هي المغناطيس الحقيقي الأوحد الذي يصون الثقة والوقار ويديم الصداقات والأعمال بصلابة.`,
          contentEn: `Reputation is who the public assumes you are; Character is who you act as when you are in darkness and completely unobserved. Character anchored on honesty and equity is the master stabilizer of long-term commercial trust.`
        },
        {
          id: 'ycw_ch4_l2',
          idNum: 2,
          titleAr: '2. فضيلة الالتزام المطلق: عروق الشرف وصيانة شيم الكبار',
          titleEn: '2. The Discipline of Accountability: Keeping Oaths and Safeguarding Honor',
          duration: '3m',
          type: 'core',
          contentAr: `يدفع الإغراء برأسماليي المظهر للتملص والالتفاف بالوعود والمقاييس المالية. صيانة شرف الالتزام بالأمانة العقدية والصدق مع الشركاء بالعمل تبني لك اسماً وتصنع وقاراً مهنياً يستحيل هدمه بمدرجات وسنين العمل.`,
          contentEn: `The temptation of easy shortcuts lures many to compromise. Safeguarding your integrity and holding your commitments sacrosanct yields a professional authority that outpaces any temporal material gain.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يتم عجن وصقل شخصية القائد المبروز وفقاً لمنهج علم هندسة البناء الأخلاقي لكوفي وكيرو؟",
          questionEn: "How is high leadership character forged according to ethical engineering principles?",
          optionsAr: [
            "بالتظاهر الدائم بصنع الخير وتضليل الأقران بالشركات الكونية.",
            "بالالتزام الحاسم والمستمر بمبادئ الصدق والأمانة وصيانة العهود في منأى ومرأى من المراقبة والعيون بوقار وشرف.",
            "بتجنب اتخاذ أي قرارات استباقية بالعمل هرباً من النقد."
          ],
          optionsEn: [
            "By staging superficial charity and misleading teammates across corporate sectors.",
            "By unyielding adherence to principles of honesty, accountability, and keeping vows, whether monitored or completely unobserved.",
            "By dodging active decisions in the workplace to bypass potential critiques."
          ],
          correctIndex: 1,
          explanationAr: "الشخصية الأخلاقية الطاهرة هي الأصل الوحيد الباقي الذي يقهر الزمن، ويجلب ثقة الاستثمارات الكبرى وعقود التنمية.",
          explanationEn: "Moral character is the foundational asset that resists market shocks, attracting major investment and long-term partnerships."
        }
      ]
    },
    {
      id: 'ycw_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: هندسة تحديد الأهداف وصناعة غاياتك الاستراتيجية',
      titleEn: 'Chapter 5: Goal Architecture: Structuring Your Vision for Execution',
      descriptionAr: 'قواعد صياغة الأهداف الفعالة والمنظمة وتسييس الأوقات والخطوات لتجنب العبثية والتشتت الخائب.',
      descriptionEn: 'The dynamics of setting SMART, value-aligned targets and channeling resources toward outstanding execution.',
      lessons: [
        {
          id: 'ycw_ch5_l1',
          idNum: 1,
          titleAr: '1. شفرة الصعود الممنهج: لماذا الأهداف الضبابية هي جرائم بحق زمانك؟',
          titleEn: '1. The Danger of Amorphous Intents: Goal-Setting as a Precision Science',
          duration: '4m',
          type: 'intro',
          contentAr: `الحديث الضبابي الصبياني: "أريد أن أكون ناجحاً ولديّ ثروة" هو وهم وهراء يبعثر طاقاتك ويضيع زمانك. تسييس الأهداف يتطلب شحذاً هندسياً دقيقاً: يجب صياغة أهداف محددة، قابلة للقياس، محكومة بآجال واضحة، ومتوافقة تماماً مع وعاء قيمك. الأهداف الدقيقة هي الفارق الجوهري بين المنجز الكوني والمنتظر العاجز بالدائرة.`,
          contentEn: `Abstract desires like "I want to be wealthy" are non-functional plans that scatter focus. Dynamic goal setting is a precision science: and it requires targets that are specific, measurable, value-aligned, and bounded by clear timelines.`
        },
        {
          id: 'ycw_ch5_l2',
          idNum: 2,
          titleAr: '2. خارطة العبور التفصيلية: كسر الكتلة وحفظ مسار الخطوة الدقيقة',
          titleEn: '2. Breaking the Mass: Segmenting Epic Milestones into Micro-Tasks',
          duration: '3m',
          type: 'core',
          contentAr: `لا ترهق دماغك وصحة تفكيرك بمجابهة المشاريع الهائلة ككتلة واحدة مستحيلة. قم بتجزئة الغاية الإستراتيجية إلى مهام يومية صغيرة ميسورة لتبسط لنفسك مسارات منجزة ومطردة تحفزك وتدفع حركتك المهنية لتوليد المخرجات بنقاء واكتفاء وافر بالعمل.`,
          contentEn: `Never overwhelm your cognitive capacity by treating massive projects as monolithic blocks. Segment complex targets into micro-deliverables, ensuring continuous progress and preventing mental paralysis.`
        }
      ],
      quiz: [
        {
          questionAr: "أي من الخيارات التالية يوضح الطريقة الهندسية الصحيحة والأمثل لصياغة هدف فعلي منجز؟",
          questionEn: "Which of the following outlines the correct structural protocol for formulation of active goals?",
          optionsAr: [
            "الرغبات العاطفية الضبابية والترقب السلبي للفرصة بالشركات.",
            "صياغة هدف محدد بخصائص واضحة، قابل للقياس، متفق مع قيمك النبيلة، ومقيد بخط زمن وتواريخ واضحة للإنجاز.",
            "تفويض كافة غاياتك للآخرين هرباً من تحمل تضحية الجهد المهني."
          ],
          optionsEn: [
            "Vague emotional wishes and waiting passively for external windfalls.",
            "Formulating highly specific, measurable, value-aligned milestones restricted by clear schedules and execution paths.",
            "Outsourcing your personal aspirations to escape the hard sweat of performance."
          ],
          correctIndex: 1,
          explanationAr: "تحديد المعاير والأرقام للهدف يحشد طاقات العقل بصمت لتركيز الرصد وابتكار آليات التنفيذ وصناعيتك بنشاط.",
          explanationEn: "Clear, quantitative boundaries mobilize focus, driving your mental apparatus to innovate execution paths to success."
        }
      ]
    },
    {
      id: 'ycw_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: قهر التسويف والبلادة وناموس مبدأ \"افعلها الآن\"',
      titleEn: 'Chapter 6: Defeating Procrastination: The "Do It Now" Mandate',
      descriptionAr: 'قواعد بناء الفعالية الفورية والتخلص من أعذار الانتظار الزائف والتسويف الخائب المبدد للطاقات الروحية.',
      descriptionEn: 'Breaking through inertia and excuse-making, adopting raw, immediate execution to trigger active motivation.',
      lessons: [
        {
          id: 'ycw_ch6_l1',
          idNum: 1,
          titleAr: '1. سم التسويف الصامت: كيف تضيع الهمة خلف أوراق التأجيل؟',
          titleEn: '1. The Excuse Loop: How Procrastination Silently corrodes Career Potentials',
          duration: '4m',
          type: 'intro',
          contentAr: `الكسل والتسويف هما لصوص الزمن ومبيدو بذور الإبداع. يبرر عقلنا الهروب بمقولات تافهة: "سأبدأ غداً"، "الظروف ليست سانحة الآن". الانتظار طقس ركيك؛ السانحة والفرصة لا تهبط من السماء، بل تُصنع وتصق بمثولك وعملك فجر كل يوم داخل مشروعك بلا تراخٍ.`,
          contentEn: `Procrastination is the silent thief of temporal assets. The mind devises comfortable rationalizations like "I will study tomorrow." Perfect conditions never arrive; they must be commanded via immediate action.`
        },
        {
          id: 'ycw_ch6_l2',
          idNum: 2,
          titleAr: '2. قانون التفعيل السريع: صرخة \"افعلها الآن\" لإخماد البلادة الكسولة',
          titleEn: '2. The 3-Second Action Rule: Instilling the "Do It Now" Paradigm',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تتوجه نيتك لشيء طاهر كالمذاكرة أو كود برمجي أو صفقة عقارية متروكة؛ اغلق كل دفاعات التردد وعقلية الضحية وافعلها فوراً! الحركة الفورية تسرق القلق والتوتر من دماغك وتمنحك كفاءة ذاتية منقطعة النظير تحميك من ركوب سفن الفشل بالعمل الأكاديمي والمالي بالكامل.`,
          contentEn: `When your system designs a positive action—execute immediately! Instant action bypasses the cognitive doubts that generate hesitation, yielding a surge of motivation and unshakeable momentum.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الجسر الحقيقي للتغلب النهائي على عادات الكسل والتسويف والانتظار السلبي الزائف للفرص؟",
          questionEn: "What is the primary catalyst to permanently conquer procrastination and passive waiting?",
          optionsAr: [
            "قراءة المزيد من مجلات المشاهير والتظاهر بالحكمة بالشركات.",
            "تبني سلوك الحركة الحاضنة والانطلاق الفوري وتفعيل قانون 'افعلها الآن' للتفرد بالإنجاز وتطهير زمنك من رغام المقاطعات السخيفة.",
            "جدولة بدء العمل للشهر القادم ونسيان غايات المربع الثاني كلياً."
          ],
          optionsEn: [
            "Consuming more entertainment catalogs and acting deep during corporate breaks.",
            "Activating prompt execution, implementing the 'Do It Now' mandate, and clearing your time of trivial delays.",
            "Deferring startup tasks to the next season and forgetting Quadrant II completely."
          ],
          correctIndex: 1,
          explanationAr: "الحركة الفورية والبدء بتنفيذ المهام يفتحان البوابات المغلقة للتدفق والقدرة الذهنية على التفوق باستمرارية الصب الصامد.",
          explanationEn: "Immediate action releases cognitive blocks, supplying you with consistent flow-state blocks to complete projects."
        }
      ]
    },
    {
      id: 'ycw_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: إدارة الوقت وتكريس نتاج الزمان المنظم بوقار فطن',
      titleEn: 'Chapter 7: Time Investment Strategy: The Leverage of Focused Hours',
      descriptionAr: 'منهجية حماية اللحظة من المقاطعات وسرقة الأوقات وتسييس جدولك لصالح غاياتك السامية.',
      descriptionEn: 'Structuring your daily blocks for maximum performance, weeding out distraction and preserving temporal assets.',
      lessons: [
        {
          id: 'ycw_ch7_l1',
          idNum: 1,
          titleAr: '1. شرف الزمان: كيف يدير القادة الأحرار أوقاتهم بالدقائق؟',
          titleEn: '1. The Temporal Ledger: Treating Time as an Irreplaceable Currency',
          duration: '4m',
          type: 'intro',
          contentAr: `الزمن هو أثمن وأشرف عملة تمتلكها، ومقدار تفوقك بالأسواق والشركات يقارن بمدى انضباطك في حماية ساعاتك وجدولك اليومي من النهب العشوائي. كرس الساعات الإبداعية الأولى من صباحك لغرس وتسيير الأهداف والمهام الكبرى داخل المربع الثاني بوقار تام.`,
          contentEn: `Time represents your most precious capital asset. Highly effective builders treat hours as currency, investing their prime morning energy blocks in non-urgent but highly important strategic milestones.`
        },
        {
          id: 'ycw_ch7_l2',
          idNum: 2,
          titleAr: '2. استبعاد الملهيات: قواعد حصانة درع تشتت الانتباه الرقمي',
          titleEn: '2. The Distraction Screen: Erecting Barriers Against Tech interruptions',
          duration: '3m',
          type: 'core',
          contentAr: `امنع المشتتات والخطوط الدكاكينة الرقمية (كالتصفح الهابط للهواتف والتنقل غير الواعي بين الإشعارات الصاخبة) أثناء فترات العمل الإنشائي الفعال بالشركة. صمم بيئة هادئة ومكثفة لإنتاج الأكواد والبرمجيات بثقة حديدية ونقاء مبرز.`,
          contentEn: `Erect strict cognitive shields against digital noise and continuous social media notifications. Structuring deep-work chambers allows you to output premium code or architectural designs with quiet concentration.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هي القاعدة البديهية والمثالية لحفظ وإدارة زمانك اليومي من الضياع والتشتت المهني؟",
          questionEn: "What is the core rule for safeguarding and managing your absolute time?",
          optionsAr: [
            "السماح للجميع بمقاطعتك طوال مواقيت العمل وتلبية طلباتهم دون مراجعة بوصلة قيمك.",
            "جدولة أسبوعك بدقة وحصار فترات تركيزك واستبعاد سموم الملهيات الرقمية وتخصيص ساعات الصباح الأبكر للمربع الثاني التنموي.",
            "ترك المهام تعمل العبث والارتجال دون أي تدوين أو مقاييس للنجاح."
          ],
          optionsEn: [
            "Permitting peers to interrupt your flow-state blocks throughout your day without consulting priorities.",
            "Planning your week with precision, protecting deep-focus blocks, blocking digital triggers, and reserving mornings for Quadrant II.",
            "Allowing operations to proceed randomly without recording parameters or key milestones."
          ],
          correctIndex: 1,
          explanationAr: "إدارة الوقت الممنهج تصنع منك قامة عظيمة منجزة تحظى بالتقدير، وتمنحك أوقاتاً وافرة لصناعة دروع ثروتك بكرامة.",
          explanationEn: "Temporal self-discipline elevates your profile, creating expansive hours to design robust systems with absolute peace of mind."
        }
      ]
    },
    {
      id: 'ycw_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: فضيلة الصبر والإصرار وصناعة العمود الفقري الصامد',
      titleEn: 'Chapter 8: The Science of Grit: Resilience under Extreme Stresses',
      descriptionAr: 'قوة المثابرة والوقاية من وهن الاستسلام السهل وتصليب قماشة الصبر لتفادي السقوط قبل ثمرة الصدارة.',
      descriptionEn: 'Forging persistent determination, neutralizing the urge to yield right before the breakthrough.',
      lessons: [
        {
          id: 'ycw_ch8_l1',
          idNum: 1,
          titleAr: '1. شفرة عثرات القائد: لماذا ينسحب العاديون قبل النصر بخطوة؟',
          titleEn: '1. The Stumbling Fallacy: Obstacles as Evolutionary Accelerators',
          duration: '4m',
          type: 'intro',
          contentAr: `الإحباطات والعقبات بساحات الصناعة هي الفلتر الطبيعي والضروري الذي يصفي العاديين التافهين الهاوين للراحة، ويبقي على النخبة الفطنة والصامدة. من يرى العقبة عائقاً يهرب مذعوراً ومن يراها وقوداً وعلماً للتفتيت يتصدر ويرتق بوقاره وشلوه بالأسواق والشركات بالكامل.`,
          contentEn: `Obstacles serve as the natural filter that weeds out insecure builders while leaving the resilient to lead. Viewing every setback as useful data transforms trials into fuel, accelerating your path to high-level mastery.`
        },
        {
          id: 'ycw_ch8_l2',
          idNum: 2,
          titleAr: '2. صيانة عقلك من وهن الشك الكسول: مبادئ صب الإرادة الحديدية',
          titleEn: '2. Shielding the Mind from Cynicism: Fortifying the Will to Persist',
          duration: '3m',
          type: 'core',
          contentAr: `لتصل لمبتغاك، صلب عمودك الفقري وقماشة صبرك ضد الشك والضعف المهني. تذكر دائماً عهود التزامك وصدر نيتك الصادقة للبدايات الصالحة، وواصل المسير يوماً بعد آخر بصلابة الشجعان وعزم العلماء الصابري.`,
          contentEn: `To conquer complex milestones, shield your will from self-doubt. Draw strength from your mission statement, and persist with quiet determination, knowing that consistency is the precursor of genius.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يؤثر الإصرار (Persistence) والصمود الذهني المتوازن على فترات تذبذب الأسواق والشركات؟",
          questionEn: "How does persistent grit affect your career during market turbulence and organizational changes?",
          optionsAr: [
            "يؤدي لتراجع الحافز والاستسلام السريع للظروف والبحث عن الوظيفة السهلة الآمنة كلياً.",
            "يصنع منك حصاناً رابحاً يثبت على الرؤية الاستراتيجية ويفتت المعوقات ويعاون فريقه لتجاوز الصعاب والظفر بالتمكين بوقار ومحبة تامين.",
            "يجبر الزملاء على الهروب من ساحات العمل."
          ],
          optionsEn: [
            "It diminishes self-belief, forcing you to surrender your metrics and seek easier routes immediately.",
            "It turns you into a highly reliable asset who anchors on vision, tackles blockers, and leads colleagues past difficulties with grace.",
            "It drives comrades to depart the workspace permanently."
          ],
          correctIndex: 1,
          explanationAr: "الصلابة وقبول المصاعب كأصل تنموي يبني لك سمعة وقورة تصون استثماراتك ومهاراتك من الضياع وقت الأزمات بالكامل.",
          explanationEn: "Stamina and accepting friction as training constructs a supreme corporate standing, protecting your assets when storms hit."
        }
      ]
    },
    {
      id: 'ycw_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: غرس العادات الصالحة وهدم سلاسل العادات السيئة المتمرسة',
      titleEn: 'Chapter 9: Habit Engineering: Installing Success Pathways',
      descriptionAr: 'قواعد هدم سلاسل وعادات الركود والكسل وتسييس ماكينة عادات اليوم لتعمل لصالح مستقبلك بانتظام.',
      descriptionEn: 'The neural mechanics of habit formation: breaking unproductive patterns to hardcode continuous self-improvement.',
      lessons: [
        {
          id: 'ycw_ch9_l1',
          idNum: 1,
          titleAr: '1. ماكينة العادات الصامتة: كيف نصوغ خياراتنا غير الواعية؟',
          titleEn: '1. The Automatic Pilot: Deconstructing How Habits Control Our Lives',
          duration: '4m',
          type: 'intro',
          contentAr: `عاداتنا هي التي تشكل٩٠٪ من أفعالنا ومخرجاتنا اليومية دون وعي منا. العادات السيئة (مثل تضييع الأوقات، التسويف المنهك، الأكل غير الصحي) تبدأ كخيوط حريرية بسيطة يسهل قطعها باليد وتتحول بمرور السنوات إلى سلاسل حديدية فولاذية تطوق مستقبلك وتقتادك للفشل. العبور للقمة يبدأ بغرس واعٍ ومستمر لعادات النجاح والصعود كالمبادرة والجدولة والإنصاف بالدائرة.`,
          contentEn: `Over 90% of our daily loops are navigated by silent automated habits. Destructive habits start as thin threads of silk that are easy to sever, but solidify into iron cables that trap your potential. Reaching the peak starts with deliberate habit installation.`
        },
        {
          id: 'ycw_ch9_l2',
          idNum: 2,
          titleAr: '2. هدم العادات الركيكة: تفصيل الحلقات الدائرية وبناء الحصن البديل',
          titleEn: '2. Breaking the Cable: Rewriting the cue, Routine, and Reward Loop',
          duration: '3m',
          type: 'core',
          contentAr: `لهدم أي عادة مهلكة بالزمان والمال؛ فكك الحوافز والمثيرات النفسية الكامنة وراءها، وعوض الروتين السيء بخطوات وبدائل ميسرة صالحة للياقة وسلام عقلك، مكرساً رصيد الإنجاز المعرفي المالي لنجاح مشاريعك بثقة وقرار صلب.`,
          contentEn: `To dismantle a bad habit, dissect its triggers. Replace the unproductive routine with an alternative action that benefits your health and mind, keeping your temporal assets safe for creative works.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو التوصيف المحكم والدقيق الذي وضعه شيف كيرو لخطوة ترسيخ العادات أو هدمها؟",
          questionEn: "What is Shiv Khera’s architectural description of habit formation and elimination?",
          optionsAr: [
            "العادات تولد حدة وتصلب معقود بالجينات الوراثية لا يمكن تعديله أو صياغته بالكلية.",
            "العادات السيئة تبدأ كخيوط حريرية هشة وسهلة القطع، وتنتهى كسلاسل ثقيلة تفوق طاقات القطع طوعاً إذا أهملتها.",
            "تجنب بناء أي عادات يومية والعيش طوال العمر عشوائياً بلا نظام."
          ],
          optionsEn: [
            "Habits are hardcoded directly into genetic sequences and completely resist any changes in life.",
            "Bad habits start as fragile threads of silk that are easy to break, but grow into massive iron cables that lock your lifestyle if left uncorrected.",
            "Refusing to form any habits and existing in complete disorder without rules."
          ],
          correctIndex: 1,
          explanationAr: "صياغة وبناء العادات الصالحة يدعم تحسينك بجهد يومي تلقائي ميسر يعفي دماغك من شح استهلاك الإرادة باستمرار.",
          explanationEn: "Deploying high-yield habits automates your career growth, conserving your conscious willpower for major strategic decisions."
        }
      ]
    },
    {
      id: 'ycw_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: القيادة الأخلاقية وتسييس الصعاب لخدمة الكرامة',
      titleEn: 'Chapter 10: Ethical Leadership: Transforming Obstacles into Catalysts',
      descriptionAr: 'منتهى ورونق بناء القيادة بالقدوة والضمير وتمكين الشركاء بنبالة وشرف لتصنع الصدارة والأثر الباقي.',
      descriptionEn: 'The peak of personal efficacy: leading by example, empowering partners with uncompromised ethics, and building an enduring legacy.',
      lessons: [
        {
          id: 'ycw_ch10_l1',
          idNum: 1,
          titleAr: '1. القيادة بالقدوة والضمير: لماذا تفشل أساليب الترهيب بالأسواق بالكامل؟',
          titleEn: '1. Leading through Authority, Not Power: The Integrity Model of Command',
          duration: '4m',
          type: 'intro',
          contentAr: `القيادة الحقيقية ليست سلطة تفاخرية أو بثاً للخوف بالنظامات؛ بل هي Authority مهيأة وناتجة عن نبالة قدوتك وعفتك والالتزام بالضمير والنزاهة بساحة العمل. القائد بالضمير يستبسل لتمكين الأقران وكسب ودهم ومحبتهم وتوجيه قواهم المعرفية لصنع المعجزات وتحقيق الأرقام والمقاييس بصدق تام.`,
          contentEn: `Genuine leadership does not stem from fear-mongering or positional dominance. True authority is forged through uncompromised ethics and leading by example. Compassionate leaders empower their teammates, guiding collaborative capacity.`
        },
        {
          id: 'ycw_ch10_l2',
          idNum: 2,
          titleAr: '2. الأثر التنموي الباقي للنجاح الكوني الشريف: صياغة الميراث الإنساني النبيل',
          titleEn: '2. Your Structural Legacy: Crafting a Generational Blueprint of Honor',
          duration: '3m',
          type: 'core',
          contentAr: `في ختام غايتنا التنموية مع هذا السفر المبارك، اعقد النوايا والخطوات لحماية كرامتك وكرامة من يرعاهم كفاحك. ابن مشاريعك والشركات بنظافة وصدق، واجعل من اسمك طوداً شامخاً يشع باليقين والأمل لكل متعثر بوطئ الحياة الأكاديمي والمالي بالدائرة. أنت تستطيع؛ فتقدم الآن والتمس الصدارة الشهمة الواثقة!`,
          contentEn: `As you conclude this educational journey, align your initiatives with absolute honor. Build your businesses and software with pristine ethics, converting your name into a beacon of hope and strength for any traveler on this path. Yes, You Can!`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو المبتهى الفعلي والمنتهى الأسمى لمسيرة 'أنت تستطيع' للتطوير والقيادة الشريفة؟",
          questionEn: "What is the ultimate culmination of Shiv Khera's 'You Can Win' paradigm?",
          optionsAr: [
            "تحقيق المال بأي طريقة غير شرعية والهروب من دفع الحقوق بالكامل.",
            "الوصول للسيادة الذاتية وبناء القيادة بالقدوة والنزاهة لتمكين الأقران وتشييد صروح الاستقلال المالي والعمل الشهم الصادق بوقار وشرح بالصناعة.",
            "ملازمة الشكوى والتقاعس وتجاهل التزامات المربع الثاني."
          ],
          optionsEn: [
            "Earning income through illicit channels and bypassing legal contracts with insolence.",
            "Attaining true self-mastery, leading by ethical example to empower teammates, and constructing durable structures of business with unyielding honor.",
            "Remaining captive to complaints and ignoring Quadrant II execution completely."
          ],
          correctIndex: 1,
          explanationAr: "صيانة الشخصية الأخلاقية وبناء القنوات بالصدق والنقاء يصنع منك قائداً كونياً يرجى خيره وصمت مبادرته بالتنمية المستدامة.",
          explanationEn: "Fortifying your character and designing systems with pure intent yields a standard of excellence that leaves an everlasting impact on society."
        }
      ]
    },
    {
      id: 'ycw_ch11',
      chapterNum: 11,
      titleAr: 'الفصل الحادي عشر: مهارات العلاقات الإنسانية - بناء الثقة المتبادلة والتعاون المثمر بوقار',
      titleEn: 'Chapter 11: Interpersonal Skills - Cultivating Mutual Trust & Symbiotic Collaborations',
      descriptionAr: 'قواعد نسج العلاقات المهنية والشخصية المتينة القائمة على الود والاحترام المتبادل وقيم الصدق والشهامة.',
      descriptionEn: 'The core foundations of building powerful personal and professional alliances rooted in respect, integrity, and proactive empathy.',
      lessons: [
        {
          id: 'ycw_ch11_l1',
          idNum: 1,
          titleAr: '1. ركائز بناء العلاقات الإيجابية: الوفاء بالأمانة والود الخالص للشركاء',
          titleEn: '1. Pillars of Positive Alliances: Mutual Creditability and Genuine Human Interest',
          duration: '4m',
          type: 'core',
          contentAr: `لا يمكن تحقيق نجاح عظيم ومستدام بمعزل عن الآخرين. العلاقات الإنسانية والمهنية القوية بالشركات تُبنى على مخزن هائل من الثقة والأمانة المتبادلة والاهتمام الصادق بتميز زملائك. احرص على أداء حقوق شركائك وثنائية المنافع، فكل جسر ثقة تبنيه اليوم هو رافعة قوية ترتقي بها غداً لقمم النجاح والتميز بوقار تام.`,
          contentEn: `No great and sustainable success can be achieved in completely isolated voids. Robust personal and professional partnerships are constructed on a reservoir of trust, shared values, and objective support. Treating peers with supreme honor guarantees mutual progress.`
        },
        {
          id: 'ycw_ch11_l2',
          idNum: 2,
          titleAr: '2. فضيلة التعاطف والإعلاء من شأن الآخرين: كيف تكسب العقول والقلوب بنبل؟',
          titleEn: '2. The Discipline of Empathy: Actively Validating Others with Sincerity and Poise',
          duration: '3m',
          type: 'tips',
          contentAr: `التعاطف (Empathy) هو قدرتك على رؤية العالم بنظارة الطرف الآخر وفهم طموحاته ومخاوفه بكامل الصدق. القائد المحنك يستمع ويحفز زملاءه دون نفاق أو تفخيم زائف؛ بل يسعى بضميره لمساندتهم ورفع تقديرهم لذواتهم، مما يولد تكاتفاً هائلاً وثقة تامة تجعل بيئة العمل واحة ملهمة للبذل والتفوق.`,
          contentEn: `Empathy is your strategic capacity to observe and understand environments from another person's perspective. Great managers guide and inspire their coworkers without resorting to cheap flattery; instead, they elevate self-esteem and build highly collaborative team dynamics.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف تساهم مهارات العلاقات الإنسانية والتعاطف في تسريع التقدم الشخصي والمؤسسي؟",
          questionEn: "How do robust interpersonal skills and active empathy accelerate collective and personal achievements?",
          optionsAr: [
            "عبر استنزاف جهود الفريق في صراعات سياسية ونفاق باهت.",
            "بتأسيس روابط من الثقة والأمانة المتبادلة وإعلاء روح التعاون، مما يزيل الحواجز ويوحد القوى لصنع قيمة خارقة للشركات.",
            "بتشجيع الكسل الفردي والانسحاب من ساحة التدريبات المهنية."
          ],
          optionsEn: [
            "By consuming organizational energy in passive-aggressive political disputes.",
            "By cementing bridges of secure trust, integrity, and mutual support, unlocking synergistic channels that produce peerless marketplace outcomes.",
            "By promoting lethargy and avoiding hard milestones."
          ],
          correctIndex: 1,
          explanationAr: "بناء العلاقات الحية القائمة على الصدق والاحترام يرسخ نبل حضورك ويجعل نجاحك مبروكاً وتصاعدياً تدعمه كل الأطراف المحيطة بهدوء ووقار.",
          explanationEn: "Fostering partnerships based on ethics and shared goals establishes your legacy as an inclusive leader whose growth benefits the entire ecosystem."
        }
      ]
    },
    {
      id: 'ycw_ch12',
      chapterNum: 12,
      titleAr: 'الفصل الثاني عشر: صياغة الأهداف الفعالة وخطة العمل - تحويل الرؤية إلى نتائج تطبيقية مبهرة',
      titleEn: 'Chapter 12: Goal Setting & Execution Planning - Transforming Ideation into Tangible Accomplishments',
      descriptionAr: 'علم هندسة الأهداف وصياغة خطط حركية فولاذية تحقق طموحاتك وتحميك من متاهات المماطلة والتشتت المعرفي.',
      descriptionEn: 'The structured methodology of goal-setting, designing rigorous daily action structures, and maintaining persistent focus to defeat procrastination.',
      lessons: [
        {
          id: 'ycw_ch12_l1',
          idNum: 1,
          titleAr: '1. بوصلة الأهداف الذكية والكبيرة: صياغة خارطة الطريق للحرية بوضوح صلد',
          titleEn: '1. Mapping Out Clear Objectives: The Anatomy of High-Impact Goal Structuring',
          duration: '3m',
          type: 'core',
          contentAr: `الأمنيات بلا خطة هي محض أوهام تتبخر مع شروق شمس العقبات. لتصل للقمم، يجب عليك صياغة أهداف محددة ومقيسة بوضوح صلد، مربوطة ببرنامج زمني ومنشقة من قيمك وشغفك الداخلي. احرص على تدوين أهدافك في دفاتر خاصة وجعلها مرئية لعينيك دائماً؛ فهذه البوصلة تحمي انتباهك من الضياع في مستنقع المغريات اليومية التافهة.`,
          contentEn: `Wishes without concrete frameworks are mere illusions that vanish under pressure. To excel, you must design specific, measurable, time-bound targets aligned with your moral code. Documenting your goals locks in visual attention and shields your focus from secondary noise.`
        },
        {
          id: 'ycw_ch12_l2',
          idNum: 2,
          titleAr: '2. خطة العمل والانضباط الحديدي: كيف تدير عرق المحاولة والجهد بانتظام خارق؟',
          titleEn: '2. The Action Blueprint: Maintaining Rigorous Persistence Until Accomplishment',
          duration: '4m',
          type: 'tips',
          contentAr: `تحقيق الأهداف الكبرى يعتمد بالدرجة الأولى على انضباطك الحديدي بتنفيذ الخطة اليومية، حتى عندما تفقد الحماس اللحظي أو يتسلل الملل لروحك. المحترف الشهم يمارس جهوده وخطواته بصمت وصبر وقور، واثقاً من طاقة التراكم المستدام ومتجاوزاً كبوات الفشل والتعثر المؤقت برأس شامخ وإصرار يفتت الحجر.`,
          contentEn: `Ultimate goal accomplishment relies upon systematic daily discipline, continuing actions even when transient motivation wanes. High-caliber builders operate with silence, immense faith, and persistent patience, knowing that cumulative effort is invincible.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الفارق الجوهري والعملي بين الأماني الخاوية والأهداف المخططة بذكاء وانضباط حديدي؟",
          questionEn: "What is the primary practical difference between hollow wishes and structured, disciplined goals?",
          optionsAr: [
            "الأماني تكون ممتلئة بالصخب دون جهد، بينما الأهداف تعتمد على خطة مكتوبة صلبة وانضباط حركي يومي بصمت وصبر وقور.",
            "لا يوجد أي فرق حقيقي فكلاهما يدفع للكسل والتسويف الدائم.",
            "الأهداف تجعل الفرد ثرياً بغتة دون الحاجة لتعلم محاسبة أو هندسة أو قيادة."
          ],
          optionsEn: [
            "Wishes are loaded with conversational noise without labor, whereas disciplined goals rely on a defined written strategy coupled with quiet daily grind and patience.",
            "There is no difference as they both inevitably lead to procrastination and systemic inertia.",
            "Goals yield instant unearned fortune without any requirements for finance, engineering, or leadership skills."
          ],
          correctIndex: 0,
          explanationAr: "تحويل الأمنيات إلى أهداف مكتوبة وخطة عمل مفعمة بالانضباط والجهد اليومي هو سر انتصار الأبطال بجميع الفصول بسلام ونبل.",
          explanationEn: "Translating ambiguous dreams into written blueprints and daily habits is the ultimate catalyst for elite accomplishments and personal honor."
        }
      ]
    }
  ]
};
