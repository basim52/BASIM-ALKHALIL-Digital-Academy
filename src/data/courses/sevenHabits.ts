import { BookCourse } from './types';

export const sevenHabitsCourse: BookCourse = {
  id: 'seven_habits',
  titleAr: 'العادات السبع للأشخاص الأكثر فعالية',
  titleEn: 'The 7 Habits of Highly Effective People',
  authorAr: 'ستيفن ر. كوفي',
  authorEn: 'Stephen R. Covey',
  coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'منظومة تنموية متكاملة للعبور من الاعتماد الإنساني المتبادل للفاعلية الفردية والنصر الجماعي وتجديد الروح.',
  descriptionEn: 'A holistic framework for personal and professional effectiveness, shifting from dependence to independence, interdependence, and continuous renewal.',
  isLocked: false,
  chapters: [
    {
      id: '7h_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: العادة الأولى - كن مبادراً (صناعة ردود أفعالك)',
      titleEn: 'Chapter 1: Habit 1 - Be Proactive & Expand Your Circle of Influence',
      descriptionAr: 'استرداد السيطرة على قرارتك واهتماماتك والعمل الحركي في مساحات تملك تغييرها فعلياً وتجاوز اللوم والتباكي.',
      descriptionEn: 'Taking absolute responsibility for your choices, shifting focus from Circle of Concern to Circle of Influence.',
      lessons: [
        {
          id: '7h_ch1_l1',
          idNum: 1,
          titleAr: '1. بوابة الإدراك: المسافة السحرية بين المثير والاستجابة',
          titleEn: '1. The Space of Freedom: Between Stimulus and Response',
          duration: '4m',
          type: 'intro',
          contentAr: `أنت تمتلك فجوة زمنية بين **المثير والاستجابة**، داخل تلك الفجوة تكمن حريتك وقدرتك على صياغة ردود أفعالك. المبادرة تعني تحريك طاقتك داخل **دائرة التأثير** (الأشياء التي تملك تغييراً فعلياً لها) عوضاً عن تشتيتها في دائرة الهموم التي لا تملك نفعاً تجاهها.`,
          contentEn: `Effective individuals recognize that their behavior is a product of their own conscious decisions based on values. Between stimulus and response, there is a gap. Within that gap lies our supreme freedom to choose our response. Proactive people focus on their Circle of Influence.`
        },
        {
          id: '7h_ch1_l2',
          idNum: 2,
          titleAr: '2. لغة المبادرة وعروقها: كيف تفصّل مواقفك؟',
          titleEn: '2. Proactive Language vs. Reactive Complaints',
          duration: '3m',
          type: 'core',
          contentAr: `الأشخاص التفاعليون يلومون الظروف، والاقتصاد، وتقلبات الحظ. أما الأشخاص المبادرون فيختارون لغتهم بعناية: "أستطيع اختيار حل بديل"، "دعنا نحدد خياراتنا". المبادرة تبدأ بتطهير لغتك من مفردات العجز والاضطرار.`,
          contentEn: `Reactive people are driven by feelings and circumstances, utilizing language like: "I have to", "I can't". Proactive people use value-driven verbs: "Let's review our parameters", "I choose", "I will deliver".`
        }
      ],
      quiz: [
        {
          questionAr: "تتأسس العادة الأولى 'كن مبادراً' على فجوة هامة ومثيرة. ما هي؟",
          questionEn: "Habit 1 ('Be Proactive') centers on a pivotal space in human awareness. What is it?",
          optionsAr: [
            "فجوة زمنية بسيطة بين الذكاء الصناعي والبشري.",
            "الفجوة بين المثير أو الحدث الخارجي والاستجابة الواعية التي يختارها الفرد.",
            "فترة الراحة اليومية للاسترخاء والتأمل الروحي."
          ],
          optionsEn: [
            "A minor structural delay between artificial and human intelligence.",
            "The cognitive gap between external stimulus and our selected responsive behavior.",
            "The basic physical break allocated for resting during intense shifts."
          ],
          correctIndex: 1,
          explanationAr: "بين المثير والاستجابة تكمن حريتنا المطلقة وقوتنا الذهنية كبشر لا canتخار وتعديل تصرفاتنا استناداً للمبادئ العميقة والواعية.",
          explanationEn: "Between stimulus and response, humans possess the unique capability to select their behaviors, establishing ethical control over circumstances."
        }
      ]
    },
    {
      id: '7h_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: العادة الثانية - ابدأ والغاية في ذهنك (رصيد الرؤية)',
      titleEn: 'Chapter 2: Habit 2 - Begin with the End in Mind & Personal Mission',
      descriptionAr: 'قانون الابتكار المزدوج وصياغة ميثاقك ورسالتك الشخصية كبوصلة ثابتة وسط عواصف الأوراق المهنية.',
      descriptionEn: 'The principle of double creation, and crafting a core Personal Mission Statement to anchor your life direction.',
      lessons: [
        {
          id: '7h_ch2_l1',
          idNum: 1,
          titleAr: '1. الابتكار المزدوج للأهداف: الصياغة الذهنية أولاً',
          titleEn: '1. The Law of Double Creation: Organizing the Blueprint First',
          duration: '4m',
          type: 'intro',
          contentAr: `البدء والغاية في ذهنك يتأسس على حقيقة أن الأشياء تُبنى مرتين: بناء ذهني أولاً (تصميم ورؤية)، وبناء مادي ثانياً (تنفيذ على أرض الواقع). إذا لم تنشئ رؤية مستقلة خاصة بك، فإنك تمنح الآخرين والظروف سلطة تصميم مستقبلك بالنيابة عنك.`,
          contentEn: `Beginning with the end in mind is based on the reality that all things are created twice: a first mental creation (vision, design), and a second physical creation (execution in the real world). Without your own blueprint, you fall into others' agendas.`
        },
        {
          id: '7h_ch2_l2',
          idNum: 2,
          titleAr: '2. الدستور الفردي: كتابة رسالة حياتك السامية',
          titleEn: '2. Crafting Your Credo: The Personal Mission Statement',
          duration: '3m',
          type: 'core',
          contentAr: `الرسالة الشخصية تصف قيمك الكبرى ومبادئك والغاية القصوى لوجودك وتعمل كدليل للملاحة والوقوف بثبات في وجه تقلبات المشهد المهني.`,
          contentEn: `A Personal Mission Statement centered on uncompromised principles is your ultimate steering compass. It acts as an anchor guiding your decisions and keeping your behaviors aligned with your deepest goals.`
        }
      ],
      quiz: [
        {
          questionAr: "ما المغزى من العادة الثانية 'ابدأ والغاية في ذهنك' ودستور الرسالة الشخصية؟",
          questionEn: "What is the primary objective of Habit 2 ('Begin with the End in Mind') and the Personal Mission Statement?",
          optionsAr: [
            "المحاكاة الذهنية للأهداف لكي لا نبدأ أي تنفيذ مادي قبل تصميم الرؤية ببوصلة مستقلة متفقة مع المبادئ.",
            "الحصول على أرباح تجارية سريعة من الاستثمار العقاري والمالي.",
            "تجنب المبادرة والانتظار حتى تسنح الفرصة سهلة دون جهد."
          ],
          optionsEn: [
            "Designing the mental blueprint first so physical efforts are shaped by a unified vision anchored on principles.",
            "Securing rapid financial returns from dynamic high-yield investments.",
            "Avoiding hard tasks and waiting passively for circumstances to fall in your favor."
          ],
          correctIndex: 0,
          explanationAr: "كل شيء يُشيد مرتين: بناء معنوي أولاً عبر الرؤية والرسالة، وبناء مادي ملموس يتطابق مع هذا التصميم الواعي الشجاع.",
          explanationEn: "All achievements are created twice: first through mental formulation, then through targeted physical execution according to that blueprint."
        }
      ]
    },
    {
      id: '7h_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: العادة الثالثة - ابدأ بالأهم قبل المهم (إدارة الأولويات)',
      titleEn: 'Chapter 3: Habit 3 - Put First Things First & Quadrant II Living',
      descriptionAr: 'منهجية جدولة الوقت والتركيز في مربع الأنشطة الهامة وغير العاجلة لتفادي لظى الاحتراق.',
      descriptionEn: 'Structuring your time-allocation around Quadrant II (Important but Not Urgent) tasks to minimize crisis management.',
      lessons: [
        {
          id: '7h_ch3_l1',
          idNum: 1,
          titleAr: '1. تشريح مصفوفة الوقت: فخاخ الأمور العاجلة والزائفة',
          titleEn: '1. The Urgency Trap: Navigating Stephen Covey’s Time Quadrants',
          duration: '4m',
          type: 'intro',
          contentAr: `ينبهنا كوفي إلى تصنيف أنشطتنا عبر مصفوفة من أربعة مربعات. المربع الأول عاجل وهام (أزمات). المربع الثاني هام وغير عاجل (تطوير وعلاقات وتخطيط). المربع الثالث عاجل وغير هام (مقاطعات ومكالمات). المربع الرابع غير عاجل وغير هام (تضييع الوقت وسفاسف الأمور). الناجحون يقضون معظم أوقاتهم داخل **المربع الثاني** لتفادي الكوارث قبل وقوعها وتجنب جحيم الفوضى والتوتر.`,
          contentEn: `Covey classifies behaviors into four quadrants: Quadrant I (Urgent & Important - Crises), Quadrant II (Not Urgent & Important - Planning, prevention), Quadrant III (Urgent & Not Important - Delusions of urgency), and Quadrant IV (Not Urgent & Not Important - Time wasting). Principled leaders focus heavily on Quadrant II.`
        },
        {
          id: '7h_ch3_l2',
          idNum: 2,
          titleAr: '2. فضيلة الرفض الدبلوماسي: التجريد المعرفي للمشتتات',
          titleEn: '2. Saying No to the Distractions: Protecting Quadrant II Blocks',
          duration: '3m',
          type: 'core',
          contentAr: `لا يمكنك زيادة تركيزك في المربع الثاني دون قول لا صريحة ولبقة لأنشطة المربعين الثالث والرابع. قل لا للمهامات التافهة واللقاءات التي تستنزف طاقتك لتستبق لنفسك تسييراً فعالاً لوقتك الإبداعي.`,
          contentEn: `To spend more time in Quadrant II, you must learn to say No politely but firmly to Quadrant III and IV distractions. Saying No is an act of high-level prioritisation to shield your core mission.`
        }
      ],
      quiz: [
        {
          questionAr: "وفقاً لمصفوفة كوفي، أين يقضي الناجحون وأصحاب الفعالية معظم أوقاتهم؟",
          questionEn: "According to Stephen Covey's matrix, where do highly effective people spend most of their time?",
          optionsAr: [
            "داخل المربع الأول لتوفير حلول فورية دائمة لكل المشاكل المفاجئة والأزمات الطارئة.",
            "داخل المربع الثاني (هام وغير عاجل) لجدولة التخطيط المستقبلي والوقاية والتطوير والتثقيف المعرفي الذاتي.",
            "داخل المربع الثالث للمقاطعة المستمرة وتلبية الطوارئ الهامشية."
          ],
          optionsEn: [
            "Staying in Quadrant I to supply immediate fire-fighting solutions to all constant emergencies.",
            "Residing in Quadrant II (Important but Not Urgent) to foster prevention, relationship-building, self-renewal, and planning.",
            "In Quadrant III handling urgent but non-valuable external distractions."
          ],
          correctIndex: 1,
          explanationAr: "المربع الثاني يستثمر في بناء مهارات متينة ووقاية استباقية ذكية تقلل تلقائياً من حجم الأزمات الطارئة مستقبلاً.",
          explanationEn: "Quadrant II focuses on prevention, strategy, and education. Investing here minimizes the frequency of future crises and burnout."
        }
      ]
    },
    {
      id: '7h_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: حساب الائتمان العاطفي وبناء رصيد الثقة الكوني',
      titleEn: 'Chapter 4: The Emotional Bank Account & Relational Trust building',
      descriptionAr: 'الذكاء الاجتماعي وبناء مخزون العلاقات المنيع من خلال الإيداعات وتفادي السحوبات الجائشة.',
      descriptionEn: 'The metaphor of relational cash flows, learning to deposit respect and trust while avoiding severe withdrawals.',
      lessons: [
        {
          id: '7h_ch4_l1',
          idNum: 1,
          titleAr: '1. هندسة العلاقات: الإيداعات مقابل السحوبات العاطفية',
          titleEn: '1. The Trust Ledger: Making Key Deposits in Important Relationships',
          duration: '4m',
          type: 'intro',
          contentAr: `رصيد بنك العلاقات العاطفي يصف حجم الثقة داخل أي علاقة إنسانية. سلوكيات الإيداع كالإيفاء بالوعود، وتوضيح التوقعات، وتلمس اعتذار صادق تصنع رصيداً دافئاً وتفكك الاحتقان العصبي المهني اليومي ببراعة. وسلوكيات السحب كالخلف والكشف والغيبة تفرغ الوعاء تماماً وتزيد التوتر.`,
          contentEn: `The Emotional Bank Account represents the quality of trust in mutual partnerships. Deposits include keeping commitments, showing kindness, clarifying expectations, and displaying absolute loyalty when the person is absent.`
        },
        {
          id: '7h_ch4_l2',
          idNum: 2,
          titleAr: '2. قواعد الذهب الستة للإيداع البشري الحكيم',
          titleEn: '2. Six Critical Relational Deposits for Long-term Alliance',
          duration: '3m',
          type: 'core',
          contentAr: `الإيداعات الست الكبرى تشمل: فهم الفرد بصدق، والاهتمام بالأمور الصغيرة، والوفاء بالعهود، وتوضيح التوقعات مسبقاً، وإبداء النزاهة الشخصية، والاعتذار الخالص عند الخطأ. التزامك بهذه الإيداعات يبني لك حصانة في سياقات العمل الكوني والشركات بالكامل.`,
          contentEn: `Covey identifies 6 key deposits: understanding the individual, attending to little things, keeping promises, clarifying expectations, showing personal integrity, and offering sincere apologies when incorrect.`
        }
      ],
      quiz: [
        {
          questionAr: "أي من التصرفات التالية يعتبر 'إيداعاً' ممتازاً في حساب بنك العلاقات العاطفي حسب ستيفن كوفي؟",
          questionEn: "Which of the following acts as a vital deposit in the Emotional Bank Account?",
          optionsAr: [
            "الوفاء بالعهود، وتوضيح التوقعات، وبناء النزاهة الشخصية الصالحة في الغياب والحضور.",
            "تقديم الهدايا المادية الباهظة والتظاهر بالاهتمام بمصالحهم.",
            "مسايرة آرائهم الخاطئة خوفاً من النقد والاختلاف."
          ],
          optionsEn: [
            "Keeping promises, clarifying expectations, and practicing integrity to individuals in both presence and absence.",
            "Supplying flashy physical gifts while silently ignoring their actual emotional boundaries.",
            "Agreeing with their bad actions out of fear of standing out or clashing."
          ],
          correctIndex: 0,
          explanationAr: "السلوكيات القائمة على المبادئ الصادقة تبني الثقة على المدى البعيد، بينما التزييف المصلحي لا يصمد أمام أول هزة حكيمة بالشركات.",
          explanationEn: "Value-centered trust transactions build robust safety nets. Shady or superficial efforts crumble immediately during workplace strains."
        }
      ]
    },
    {
      id: '7h_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: العادة الرابعة - تفكير المنفعة للجميع (ربح/ربح)',
      titleEn: 'Chapter 5: Habit 4 - Think Win-Win & The Abundance Paradigm',
      descriptionAr: 'قوة وفضيلة عقلية الوفرة واختيار صفقات المصلحة المشتركة والتحفظ الفطن بالانسحاب (ربح/ربح أو لا صفقة).',
      descriptionEn: 'Eschewing competitive scarcity paradigms to cultivate absolute Win-Win outcomes or embracing "No Deal".',
      lessons: [
        {
          id: '7h_ch5_l1',
          idNum: 1,
          titleAr: '1. شفرة الوفرة: لماذا نجاح جارك لا يعني فشلك؟',
          titleEn: '1. Decoupling from Scarcity: The Psychological Shifts of Win-Win',
          duration: '4m',
          type: 'intro',
          contentAr: `عقلية الشح أو الندرة (Scarcity Mindset) تفترض أن النجاح والخير والفرص كعكة واحدة محدودة إذا أخذ شريكك قطعة منها نقص حصادك. أما عقلية الوفرة (Abundance Mindset) تدرك أن الفرص والنجاحات تفيض وتتسع للجميع، ونهوض الآخرين ييسر لك صعوداً أفضل بساحات الصدارة.`,
          contentEn: `The Scarcity Mindset views resource as limited, sparking toxic competition. The Abundance Mindset treats opportunity as globally expanding, recognizing that another's promotion does not deplete your own reserve of success.`
        },
        {
          id: '7h_ch5_l2',
          idNum: 2,
          titleAr: '2. دستور ربح/ربح أو لا اتفاق (No Deal): حماية المبادئ',
          titleEn: '2. The Integrity Anchor: Win-Win or No Deal',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تواجه شريكاً أو مفاوضاً ولا تتمكنان من العثور على صيغة يستفيد منها كل جانب بسلام وقار، فإن الحل الأمثل والأصدق هو إعلان خيار: "ربح/ربح أو لا صفقة". الانسحاب الودي يصون ميزان الثقة ويحمى عقولكم من خديعة المساومات الرخيصة.`,
          contentEn: `If you cannot construct an outcome that honors both parties' goals, choose 'No Deal'. Stepping away gracefully prevents hidden resentment, saving resources and preserving core alignments.`
        }
      ],
      quiz: [
        {
          questionAr: "ما الذي تجسده 'عقلية الوفرة' (Abundance Mindset) في فلسفة العائدة الرابعة؟",
          questionEn: "What does an 'Abundance Mindset' represent in the context of Win-Win framework?",
          optionsAr: [
            "الإيمان بأن السعادة والنجاح والفرص متوفرة بكثرة للجميع وتكفي لمشاركة الإنجاز دون منافسة شرسة.",
            "الرغبة في تكديس الأصول المادية بكثرة وتجنب التبرع والزكاة.",
            "التظاهر بقبول الخسارة الدائمة ليرضى الجميع ويتجنبوا الصراع."
          ],
          optionsEn: [
            "Believing there is plenty of success, happiness, and prestige available for everyone to share naturally without tribal competition.",
            "Desiring to accumulate material assets at all costs while refusing charity or volunteer actions.",
            "Pretending to always accept losing so that other people stay pacified."
          ],
          correctIndex: 0,
          explanationAr: "تؤمن عقلية الوفرة بأن الحياة تتسع لنهوض ونجاح الجميع معاً، بينما ترى عقلية الشح نجاح شريكك بمثابة خسارة محققة لك.",
          explanationEn: "Abundance thinking views life as an expanding arena where there's enough for all, whereas scarcity mindset treats validation as a limited pie."
        }
      ]
    },
    {
      id: '7h_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: العادة الخامسة - اسع أولاً للفهم (التواصل والإنصات المتعاطف)',
      titleEn: 'Chapter 6: Habit 5 - Seek First to Understand, Then to Be Understood',
      descriptionAr: 'آلية الاستماع السحرية لفك مغاليق النفوس ونزع فتيل النزاعات وتوطيد صلة الكينونة بالشركاء بسلام.',
      descriptionEn: 'The art of empathic listening, yielding your own biases first to thoroughly diagnose issues before prescribing.',
      lessons: [
        {
          id: '7h_ch6_l1',
          idNum: 1,
          titleAr: '1. مصيدة تجهيز الحجج: لماذا نفشل في الحوار الصادق؟',
          titleEn: '1. The Reply Reflex: Deconstructing Our Poor Communication habits',
          duration: '4m',
          type: 'intro',
          contentAr: `يستمع معظم الناس وهم يتأهبون للرد وتأصيل آرائهم الفردية ودفاعاتهم الشخصية، مفترضين أن مقصدهم هو الفوز بالسجال. الاستماع المتعاطف يتطلب وضع فكرك وتأصيلك جانباً لدقيقة طاهرة والتركيز الكامل على قراءة كينونة المتحدث لفهم احتياجاته ومخاوفه بدقة.`,
          contentEn: `Most listen to formulate answers, prep rebuttals, or categorize the message. Empathic listening demands that you set aside your intellectual biases to understand the speaker's world view and emotions completely.`
        },
        {
          id: '7h_ch6_l2',
          idNum: 2,
          titleAr: '2. الأنفاس السبعة للاستماع السلمي: التشخيص قبل العلاج المعرفي',
          titleEn: '2. The Diagnostic Workflow: Listening with Your Core Senses',
          duration: '3m',
          type: 'core',
          contentAr: `لا تطلق أحكاماً وتوصيات معلبة قبل قيامك بتشخيص الأزمة بالكامل. عندما توجز منظور شريكك بدقة وتواضع تجده يتنازل بسلام عن حواجزه وتتلاقى رؤيتكم لابتكار حلول دقيقة وسريعة بساحات العمل.`,
          contentEn: `Never offer advice before thoroughly diagnosing the issue. Restating the other party's perspective to their satisfaction disarms defensive arguments and builds genuine intellectual alliances.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يتم تطبيق العادة الخامسة 'اسع أولاً لتبدل الفهم' في التواصل المهني والشخصي؟",
          questionEn: "How is Habit 5 ('Seek First to Understand') practically applied in our personal interactions?",
          optionsAr: [
            "الاستماع بهدف الإجابة السريعة وإعطاء النصائح الفلسفية المعلبة دون وعي بمشاعر الطرف الآخر.",
            "ممارسة الاستماع التعاطفي لفهم مشغلات ومخاوف واحتياجات الفرساء بصدق قبل اقتراح أي حلول.",
            "تجنب الحوار من الأساس ومقاطعة كل النقاشات لتوفير الطاقة."
          ],
          optionsEn: [
            "Listening purely to construct faster verbal counter-arguments and supply instant advice.",
            "Deploying empathic listening to capture the speaker's emotional state and priorities prior to offering solutions.",
            "Avoiding dialogue altogether and choosing complete isolation."
          ],
          correctIndex: 1,
          explanationAr: "الاستماع التعاطفي يبني جسوراً متينة من الثقة ويخفض التوتر النفسي فوراً، مما يمهد بشكل خارق للوصول لحلول سريعة وتآزرية.",
          explanationEn: "Empathic listening creates a psychological air buffer, reducing defensiveness and unlocking paths to cooperative results."
        }
      ]
    },
    {
      id: '7h_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: العادة السادسة - التكاتف والتآزر (معادلة الحل البديل الثالث)',
      titleEn: 'Chapter 7: Habit 6 - Synergize & Discovering the Third Alternative',
      descriptionAr: 'قوة دمج الاختلافات الفكرية لإنتاج مخارج وحلول خارقة غير تقليدية تتجاوز بكثير السطحيات الركيكة.',
      descriptionEn: 'Valuing divergent perspectives to formulate unique, creative solutions far superior to basic compromise.',
      lessons: [
        {
          id: '7h_ch7_l1',
          idNum: 1,
          titleAr: '1. سحر المعيار التآزري: الكل يفوق مجموع أجزائه الفردية',
          titleEn: '1. The Synergy Equation: Valuing Divergent Viewpoints',
          duration: '4m',
          type: 'intro',
          contentAr: `التآزر (Synergy) ليس صفقة تسوية ركيكة بل تناغم فطن لقلوب وعقول مختلفة لابتكار قيمة جديدة تماماً. المعادلة الرياضية للتآزر هي (1+1=3 أو أكثر). إن دمج رؤية المطور ورؤية المصمم دون قمع للاختلافات يجود بنتائج ساحرة وفائقة التميز بالشركات.`,
          contentEn: `Synergy is not simple settlement but structural co-creation. Valuing differences forms a collective intelligence where the aggregate output is exponentially greater than separate endeavors.`
        },
        {
          id: '7h_ch7_l2',
          idNum: 2,
          titleAr: '2. الحل البديل الثالث: إنهاء الصراع لابتكار الصدارة المشتركة',
          titleEn: '2. The Third Alternative: Transcending Simple Compromise',
          duration: '3m',
          type: 'core',
          contentAr: `في مواجهة الاختلاف، لا تختر حلاً وسطاً ركيكاً يتنازل فيه الطرفان عن غايتهم؛ بل وجه نيتك الواعية لابتكار "الحل الثالث"؛ وهي خطة إبداعية ذكية تجلب المصلحة لجميع الجوارح وتتفوق على الأفكار الفردية بالكامل.`,
          contentEn: `When parties clash, reject dry compromises. Cooperate to design a 'Third Alternative'—an innovative solution that fully satisfies both parties' core needs without sacrificial yield.`
        }
      ],
      quiz: [
        {
          questionAr: "ما المغزى الجوهري الكامن وراء معادلة التآزر والتعاضد (Habit 6: Synergize)؟",
          questionEn: "What is the key functional concept underlying Habit 6 ('Synergize')?",
          optionsAr: [
            "دمج الاختلافات الفكرية لابتكار حلول بديلة ثالثة تتجاوز بكثير مجموع القدرات المنفردة للأشخاص.",
            "إقناع الفريق كلياً بأن يسيروا خلف رأي قائد واحد دون اعتراض أو مناقشة فنية.",
            "الوصول لتسوية متوسطة يتنازل فيها الجميع عن رغباتهم كلياً."
          ],
          optionsEn: [
            "Combining safe intellectual differences to design Third Alternatives that far exceed the individual capacities of collaborators.",
            "Convincing the team to blindly support the leader's specific stance without any technical debates.",
            "Reaching a moderate compromise where both parties have to give up their goals entirely."
          ],
          correctIndex: 0,
          explanationAr: "التآزر يعيد صياغة المعادلة لتصبح (1 + 1 = 3 أو أكثر)، عبر تسخير الفروقات الفردية وتصليب نقاط القوة لبناء نتائج خارقة وغير مألوفة.",
          explanationEn: "Synergy builds a system where 1 + 1 equals 3 or more by valuing mental, creative, and technical differences to create collective magic."
        }
      ]
    },
    {
      id: '7h_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: العادة السابعة - شحذ المنشار (توازن التجديد المستمر)',
      titleEn: 'Chapter 8: Habit 7 - Sharpen the Saw & The 4 Areas of Renewal',
      descriptionAr: 'قانون تفادي الاحتراق وصيانة آلتك الوحيدة الثمينة للتغيير: الأبعاد الروحية والذهنية والجسدية والاجتماعية.',
      descriptionEn: 'The discipline of self-preservation, ensuring balanced growth across physical, mental, spiritual, and social systems.',
      lessons: [
        {
          id: '7h_ch8_l1',
          idNum: 1,
          titleAr: '1. حكاية الحطاب والمنشار الميتار: فلسفة صيانة الأدوات الشخصية',
          titleEn: '1. The Woodcutter Philosophy: Preserving the Blade of Efficacy',
          duration: '4m',
          type: 'intro',
          contentAr: `العمل المتواصل الدؤوب دون استراحة لشحذ منشارك (عقلك ونضج روحك وبدنك) هو ذكاء شكلي غبي؛ ينتهي بتبدد طاقتك الحركية والانهيار التام ضحية سياقات الاحتراق. شحذ المنشار هو التزام ووقاية استباقية دورية لتظل أدواتك حادة ومصقولة لقطع أي صعاب بالعمل بسلام وقار.`,
          contentEn: `Sustained hard labor without standard self-renewal is counterproductive, leading directly to strategic fatigue. Halting briefly to sharpen your mind and systems secures longevity and high performance.`
        },
        {
          id: '7h_ch8_l2',
          idNum: 2,
          titleAr: '2. الأركان الأربعة للتجديد الواعي: دمج العافية والجمال المعرفي',
          titleEn: '2. Physical, Mental, Spiritual, emotional Integrity',
          duration: '3m',
          type: 'core',
          contentAr: `حافظ على التوازن في التجديد: البُعد الجسدي (نوم ورياضة وغذاء صحي)، البُعد الذهني (قراءة وكتابة وتثقيف دائم)، البُعد الروحي (عبادة وتأمل والاتصال بالقيم)، البُعد الاجتماعي/العاطفي (رعاية رصيد بنك العلاقات والنزاهة). هذا التوازن يحمي مناعة كيانك اليومي بالكامل.`,
          contentEn: `Perform periodic checkups on your 4 dimensions: physical (vitality care), mental (strategic learning), spiritual (moral recharge), and social (relationship hygiene) to secure uncompromised professional authority.`
        }
      ],
      quiz: [
        {
          questionAr: "ما المغزى من حكمة شحذ المنشار السابعة وتفادي لظى الاحتراق؟",
          questionEn: "What is the primary message of sharpening the saw and preventing systemic burnout?",
          optionsAr: [
            "التركيز المهني الكثيف وإهمال العلاقات والراحة لإنهاء المهامات بأي ثمن.",
            "التأمل بصمت والابتعاد عن العمل المهني والدراسة كلياً.",
            "الاستثمار الدوري المتوازن في مستقبلك وصحة بدنك ونضارة عقلك لضمان جاهزيتك وجدارتك للتفوق باستمرار."
          ],
          optionsEn: [
            "Micro-focusing strictly on core tasks while ignoring personal health or relations.",
            "Deep isolation from modern commercial and academic operations completely.",
            "Balanced, strategic investing in your physical, cognitive, moral, and emotional states to protect long-term capacity."
          ],
          correctIndex: 2,
          explanationAr: "التدريب المتكامل وصيانة الذات تزيد من هيبة حضورك الصادق ومناعتك العملية، مما يرتق بإنتاجيتك لصدارة واعدة.",
          explanationEn: "Self-maintenance acts as a protective shield, conserving and upgrading your systems to secure consistent high performance."
        }
      ]
    },
    {
      id: '7h_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: ثورة المنظور والشخصية (من الداخل إلى الخارج)',
      titleEn: 'Chapter 9: The Power of Paradigms & Inside-Out Transformation',
      descriptionAr: 'قوة أخلاق الشخصية الحقيقية وتحدي التزييف وقبول الفكر السوي والتحول الشهم من الباطن نحو الظاهر.',
      descriptionEn: 'Shifting your focus from surface personality ethics to core character ethics, fostering structural change from inside out.',
      lessons: [
        {
          id: '7h_ch9_l1',
          idNum: 1,
          titleAr: '1. شفرة المطارح المعرفية: كيف تشوه النظارات رؤيتنا للوجود؟',
          titleEn: '1. Paradigm Shift: Deconstructing the Glasses Through Which We View Life',
          duration: '4m',
          type: 'intro',
          contentAr: `المنظور (Paradigm) هو النظارة الذهنية التي نرى من خلالها العالم. السعي لتغيير سلوكياتك وظاهرك دون تغيير منظورك الداخلي يشبه محاولة تجميل شجرة أوراقها ميتة. التحول الحقيقي والمستدام يتطلب غرس "أخلاق الشخصية" (Character Ethics) كالمصداقية والتواضع والشجاعة، بدلاً من "أخلاق المظهر" (Personality Ethics) الركيكة.`,
          contentEn: `Paradigms serve as the mental filters driving our behavior. Prioritizing superficial visual adjustments while ignoring character ethics is a futile exercise. Real evolution occurs from the inside out, aligning with natural principles.`
        },
        {
          id: '7h_ch9_l2',
          idNum: 2,
          titleAr: '2. أخلاق الشخصية مقابل أخلاق المظهر: لغز الصدق الباطني الحقيقي',
          titleEn: '2. Character Ethics vs. Personality Ethics: Cultivating Authentic Poise',
          duration: '3m',
          type: 'core',
          contentAr: `أخلاق المظهر تركز على صقل مهارات الإقناع الخارجي، والعلاقات العامة المزيفة، وتزييف الهالات التفاخرية. أخلاق الشخصية ترسخ النزاهة والعدالة والكرامة الإنسانية الصالحة. تأسيس أفعالك على الشخصية الحقيقية يصون هيبة ووقار حضورك بالشركات بنبالة لا تخفت بمرور العواصف.`,
          contentEn: `Personality ethics highlight synthetic styling, public relations tactics, and surface impressions. Character ethics lock in uncompromised honesty, dignity, and real capacity, ensuring your professional legacy stands firm.`
        }
      ],
      quiz: [
        {
          questionAr: "ما المغزى الجوهري الكامن وراء فلسفة التحول 'من الداخل إلى الخارج' (Inside-Out)؟",
          questionEn: "What is the key functional concept behind 'Inside-Out' transformation?",
          optionsAr: [
            "تغيير مظهرك الخارجي والملابس الأسبوعية لتبهر الزملاء بساحة العمل بالكامل.",
            "البدء أولاً بتطهير وتعديل أفكارك وقيمك الكبرى وصقل أخلاق شخصيتك قبل المطالبة بتغيير الزملاء والظروف الخارجية.",
            "مطالبة البنوك بمستحقات الريع للتمكن من السيطرة التجارية بوقاحة."
          ],
          optionsEn: [
            "Modifying your personal cosmetic styling to impress colleagues in the workspace.",
            "Structuring your character, inward values, and mental frameworks before demanding modifications in others or conditions.",
            "Requesting high bank loans to secure swift financial control with insolence."
          ],
          correctIndex: 1,
          explanationAr: "إرساء النوايا والأصول الباطنية والنزاهة يصنع منك كياناً وقوراً تتدفق منه قيادة أصيلة وصادقة بالدائرة.",
          explanationEn: "True progression starts at the nucleus of being. Aligning your internal character first makes subsequent behaviors authentic and powerful."
        }
      ]
    },
    {
      id: '7h_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: العادة الثامنة - العثور على صوتك وإلهام الآخرين',
      titleEn: 'Chapter 10: The 8th Habit - Find Your Voice and Inspire Others to Find Theirs',
      descriptionAr: 'منتهى ورونق صعود الفاعلية الكونية لنيل الاستقلال الذاتي المعمق وصناعة ريادة إبداعية فريدة بالأسواق والشركات.',
      descriptionEn: 'The pinnacle of Stephen Covey’s teachings: discovering your authentic purpose and elevating others toward self-creation.',
      lessons: [
        {
          id: '7h_ch10_l1',
          idNum: 1,
          titleAr: '1. شفرة الصوت الحركي المبرز: لقاء موهبة وشغف وحاجة العمل بالشركات',
          titleEn: '1. Defining Your Voice: The Nucleus of Talent, Passion, Need, and Conscience',
          duration: '4m',
          type: 'intro',
          contentAr: `في عصر المعرفة والتواصل، تكتمل العادات السبع بالصعود للعادة الثامنة: **اعثر على صوتك الفريد** (Find Your Voice). صوتك يولد عند تلاقي أربعة مسالك حيوية: موهبتك الفطرية الكامنة، شغفك الداخلي، الاحتياج ومطامح الأسواق بالشركات، ونداء ضميرك وشرف أخلاقياتك الصالحة للتأثير المبتكر.`,
          contentEn: `In the global network era, the 7 Habits evolve into the eighth habit: Discovering Your Voice. Your authentic purpose flourishes at the intersection of: your core Talent, primary Passion, market Need, and moral Conscience.`
        },
        {
          id: '7h_ch10_l2',
          idNum: 2,
          titleAr: '2. إلهام الأخرين للعثور ع صيتهم: تمكين الكفاءات وصيانة النبالة',
          titleEn: '2. The Leader’s Mandate: Coaching and Inspiring Cohorts toward Excellence',
          duration: '3m',
          type: 'core',
          contentAr: `القيادة الحقيقية والسامية ليست تحكماً وسلطة تفاخرية؛ بل هي بناء قنوات الثقة وتوثيق القبول الشهم ليرى الزملاء طاقاتهم الكامنة ويعثروا بفضل تمكينك على صيتهم وصدارهم الإبداعية الفريدة بساحات الإنجاز بوقار ومحبة تامين.`,
          contentEn: `True leadership is not boastful dominance; it is the strategic empowerment of your cohorts. Your professional legacy is anchored on helping partners identify their own unique focus, launching collective excellence.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو المحور والغاية الأسمى للعادة الثامنة 'اعثر على صوتك وألهم الآخرين' الكبرى؟",
          questionEn: "What is the ultimate objective of Stephen Covey's 8th Habit?",
          optionsAr: [
            "تحسين مستواك الرياضي واعتزال العلاقات الاجتماعية والعمل بالكلية.",
            "التواصل مع أعمق ركائز شغفك وموهبتك الحرة وضميرك لخدمة مشاريع الأسواق وتسييس طاقات تمكّينك، مع مساندة المحيطين للفوز وصناعة صدارهم بوقار وشرف.",
            "المساهمة في زيادة ديون البنوك وعقد صفقات عشوائية زائفة."
          ],
          optionsEn: [
            "Improving your athletic scores while abandoning all social and professional alliances completely.",
            "Connecting with your deepest talents, passions, conscience, and market needs, while actively coaching colleagues to find their own creative potentials.",
            "Increasing commercial debts and executing shady, non-valuable transactions."
          ],
          correctIndex: 1,
          explanationAr: "إطلاق المبادرات المبرزة وحب الخير وصون نبالة تمكين الأقران تتوثق بكينونة قوية وحضور ذي وقار وصيت أكاديمي مرموق بالكامل.",
          explanationEn: "This final stage builds exceptional, principle-centered leaders who foster self-sufficient teams, unlocking true creative breakthroughs."
        }
      ]
    },
    {
      id: '7h_ch11',
      chapterNum: 11,
      titleAr: 'الفصل الحادي عشر: القيادة المرتكزة على المبادئ والمحاذاة الشاملة',
      titleEn: 'Chapter 11: Principle-Centered Leadership & Universal Alignment',
      descriptionAr: 'ترسيخ مرجعية المبادئ لإنتاج علاقات عمل بالغة القوة والقابلية للتطوير والنجاح المستدام والمثمر.',
      descriptionEn: 'Fostering deep, trust-based, and principle-centered leadership paradigms to align individual goals with collective execution.',
      lessons: [
        {
          id: '7h_ch11_l1',
          idNum: 1,
          titleAr: '1. ركائز القيادة المتمحورة حول المبادئ: العيش بالمرجعية والنزاهة العميقة',
          titleEn: '1. Pillars of Principle-Centered Leadership: Living with Integrity and Vision',
          duration: '4m',
          type: 'core',
          contentAr: `القيادة الحقيقية تبدأ من إرساء المبادئ الكونية الخالدة كمرجعية ثابتة في جميع قراراتك المهنية والشخصية. النزاهة والعدل وتكافؤ الفرص والصبر هي أساس النجاح البشري والمهني على المدى الطويل، فالعلاقات والصداقات الخاوية من المبادئ لا تلبث أن تنهار تحت رياح الأزمات القاسية.`,
          contentEn: `True leadership flourishes by adhering to immutable universal principles like integrity, fairness, patience, and honor. Relationships or environments devoid of principle-centered foundations inevitably collapse during stressful times.`
        },
        {
          id: '7h_ch11_l2',
          idNum: 2,
          titleAr: '2. صياغة الميثاق المشترك ومحاذاة الأفراد خلف الأهداف العظيمة والملهمة',
          titleEn: '2. Mission Alignment: Orchestrating Actions Around Shared Ultimate Visions',
          duration: '3m',
          type: 'core',
          contentAr: `لتحقيق القيادة المرتكبة الشاملة بالشركات تطلعات هائلة، يجب على القائد صياغة ميثاق رسالة جماعي يعكس تطلعات الجميع ويحقق فوزاً مشتركاً للشركة وللأفراد. هذا الميثاق يضمن تسيير الحركة وتناغم الزملاء بنقاء ودون تضاد عاطفي.`,
          contentEn: `To execute unified breakthroughs, organizations must construct draft missions that accurately embody collective parameters. When individual goals align with noble corporate targets, collaboration runs fluidly.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف تساهم القيادة القائمة على المبادئ في تجاوز الصراعات المهنية وإلهام الأفرقة؟",
          questionEn: "How does principle-centered leadership resolve organizational friction and inspire team synergy?",
          optionsAr: [
            "بالاعتماد على السيطرة والسلطوية وفرض الرأي الأوحد.",
            "بتأسيس مرجعية مبادئ واضحة ومشتركة من العدل والنزاهة والتمكين، لتحفيز الفوز والتعاون المشترك بروح موحدة.",
            "بتجاهل المشكلات كلياً والركون للراحة المؤقتة والخيار الأسهل."
          ],
          optionsEn: [
            "By relying on coercive power and maintaining authoritative decisions.",
            "By embedding a common baseline of universal values like justice, deep integrity, and professional trust, guiding people toward collective, uncompromised success.",
            "By ignoring challenges and choosing temporary surface compromises."
          ],
          correctIndex: 1,
          explanationAr: "إرساء النبل في تمكين الكفاءات يولد صوتاً أكاديمياً ومهنياً وقوراً بالمنصات والأسواق بالكامل.",
          explanationEn: "Adhering to values removes political posturing inside team frameworks, making long-term growth self-governed."
        }
      ]
    },
    {
      id: '7h_ch12',
      chapterNum: 12,
      titleAr: 'الفصل الثاني عشر: قوة التكاتف الكلي والتجدد الشامل في المؤسسات والأفراد',
      titleEn: 'Chapter 12: Super-Synergetic Performance, Renewal, and Continuous Expansion',
      descriptionAr: 'منتهى التكامل وصقل الأدوات لضمان مستويات فاعلية إنتاجية وروحية واثقة وخارقة للمألوف.',
      descriptionEn: 'Harnessing the maximum potential of creative cooperation alongside regular systematic updates of your physical, mental, and spiritual states.',
      lessons: [
        {
          id: '7h_ch12_l1',
          idNum: 1,
          titleAr: '1. التدفق المتكاتف والابتكار التعاوني: استنبات عقول الوفاق بالعمل',
          titleEn: '1. Micro-Synergy & Co-Creation: Unleashing the Collective Brainpower',
          duration: '4m',
          type: 'core',
          contentAr: `التكاتف السوبر والتآزر (Synergy) ليس مجرد مهارة بسيطة؛ إنه التقدير الكلي والاحترام لمطامح الاختلاف وخبرات المحيطين بك. عندما تجتمع القلوب والعقول المبدعة لابتكار بديل ثالث يتجاوز وجهات النظر الضيقة، يمكننا تحقيق قفزات عاطفية وإنتاجية هائلة غير مسبوقة بالأسواق.`,
          contentEn: `Synergy is the dynamic celebration of creative differences. By combining diverse experiences with non-rivalrous partnerships, team members formulate a third alternative that transcends single biases.`
        },
        {
          id: '7h_ch12_l2',
          idNum: 2,
          titleAr: '2. صقل الميزان وشحذ السيف بانتظام: الأبعاد الأربعة للصيانة الذاتية والروحية',
          titleEn: '2. Sharpening the Saw (Continuous Renewal): The 4 Dimensions of Lifelong Health',
          duration: '3m',
          type: 'tips',
          contentAr: `لا تدع انشغالك بقطع الأشجار يمنعك من التوقف لشحذ منشارك بانتظام. شحذ المنشار وحوسبة التجديد (Sharpen the Saw) تغطي أربعة صروح جوهرية: الجسد (عبر ممارسة الرياضة والغذاء والمحافظة على اللياقة)، والروح (عبر التأمل والعبادة وإرساء القيم والهدوء الباطني)، والعقل (عبر القراءة الحرة والدراسة المتواصلة)، والعاطفة (عبر الاتصال والتواصل الإيجابي الداعم مع المحيطين ونشر السلام بوقار تام).`,
          contentEn: `Continuous growth demands stopping periodically to sharpen your professional tools. Systematic renewal occurs across four core dimensions: Physical (nutrition and exercise), Spiritual (peace and deep introspection), Mental (study and reading), and Social/Emotional (healthy, value-based relationships).`
        }
      ],
      quiz: [
        {
          questionAr: "ما المغزى الجوهري من مفهوم 'شحذ المنشار' أو استراتيجية التجديد الدوري المستدام للأفراد؟",
          questionEn: "What is the ultimate strategic takeaway of 'Sharpening the Saw' for human development?",
          optionsAr: [
            "تجنب الدراسة طوال العام وتأجيل الأهداف والعمل لليوم الأخير.",
            "الاستثمار المستمر والشامل في تجديد ذاتك وصيانتها روحياً وعقلياً وجسدياً وعاطفياً لتحقيق العطاء والنمو الخالد.",
            "تطوير عادات مظهرية فقط دون الالتفات لصدق النوايا أو عمق الممارسة الرياضية."
          ],
          optionsEn: [
            "Avoiding professional development until the last possible moment.",
            "Investing consistently in updating and maintaining your Physical, Mental, Spiritual, and Social assets to lock in peak capacity and results over time.",
            "Honing superficial cosmetic habits while ignoring internal character or physical excellence."
          ],
          correctIndex: 1,
          explanationAr: "تجديد الأبعاد الأربعة بانتظام يرفع من طاقتك الحيوية ومستوى الإنتاجية بجميع قطاعات حياتك الواثقة بسلام.",
          explanationEn: "Periodic updates prevent burnout while raising your core operational threshold so you can navigate life's complexities successfully."
        }
      ]
    }
  ]
};
