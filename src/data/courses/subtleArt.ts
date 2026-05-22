import { BookCourse } from './types';

export const subtleArtCourse: BookCourse = {
  id: 'subtle_art',
  titleAr: 'فن اللامبالاة لعيش حياة تخالف المألوف',
  titleEn: 'The Subtle Art of Not Giving a F*ck',
  authorAr: 'مارك مانسون',
  authorEn: 'Mark Manson',
  coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'عن تجريد الحياة العصرية والقبول اللامشروط للمصاعب واختيار القيم القيّمة الكبرى ومكتسب المسؤولية الذاتية والتحرر من الأوعية الزائفة.',
  descriptionEn: 'A counterintuitive guide to living a good life, focusing on choosing what really matters, taking raw responsibility, and letting go of superficial desires.',
  isLocked: false,
  chapters: [
    {
      id: 'sa_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: كيف تكسر حلقة الجحيم المفرط؟',
      titleEn: 'Chapter 1: Breaking the Loop of Overcaring',
      descriptionAr: 'استراتيجية التوقف عن السعي خلف الإيجابية المزيفة وقبول الواقع الشجاع والتحرر من دوامات القلق المركيز.',
      descriptionEn: 'Why accepting negative experiences is itself a positive experience and how to bypass the Feedback Loop from Hell.',
      lessons: [
        {
          id: 'sa_ch1_l1',
          idNum: 1,
          titleAr: '1. بوابة الإدراك: لماذا الرغبة الدائمة بالنجاح هي فخ؟',
          titleEn: '1. Orientation: The Illusion of Constant Success',
          duration: '4m',
          type: 'intro',
          contentAr: `يتعلم الفرد اليوم في ثقافة استهلاكية تدفعه باستمرار عبر وسائل التواصل الاجتماعي لتفترض أنه يجب أن تكون ثرياً ومثيراً وسعيداً ومنتجاً طوال الوقت. لكن الحقيقة مختلفة جداً.
الرغبة الدائمة في تجارب أفضل وأكثر إيجابية هي بذاتها تجربة سلبية للأسف! ومفتاح العيش الرغيد هو الاكتراث بالقيم الأعمق والأصح وتجاهل السطحيات التافهة من حولنا.`,
          contentEn: `In today's digital era, society constantly targets you with messages saying you must always be richer, happier, and better. But this constant pursuit actually underlines what you lack.
The desire for more positive experiences is itself a negative experience. Accepting your raw, human limitations is the first step toward genuine freedom.`
        },
        {
          id: 'sa_ch1_l2',
          idNum: 2,
          titleAr: '2. حلقة الجحيم التكرارية: كيف نقع ضحية مشاعر القلق المفرط؟',
          titleEn: '2. Feedback Loop from Hell: Feeling Anxious About Being Anxious',
          duration: '4m',
          type: 'core',
          contentAr: `هل حدث لك يوماً أن شعرت بالقلق تجاه أمر معين، ثم بمجرد وعيك بقلقك، بدأت تقلق لأنك قلق؟ هذا ما نسمية **"حلقة الجحيم التكرارية"**.
هو اضطراب عصبي وعقلي ينشأ لأننا نرفض قبول مشاعرنا السلبية الطبيعية كالغضب والمخاوف والحزن. صرنا نرى هذه المشاعر كدليل عار أو مشكلة تستدعي العلاج، مما يعيد إنتاج مشاعر سلبية مضاعفة. عندما ترى خوفك أو حزنك كأمر بديهي يمر به الجميع، فإن حظوة تلك الحلقة تزول كلياً!`,
          contentEn: `Have you ever felt stressed, and then started getting stressed about the fact that you are stressed? This is the definition of the **"Feedback Loop from Hell."**
It occurs because contemporary culture programs us to believe that negative emotions are moral failures to be immediately cured or hidden. Instant acceptance of ordinary human discomfort is key.`
        }
      ],
      quiz: [
        {
          questionAr: "تشارلز بوكوفسكي نقش على قبره عبارة 'لا تحاول'. ما المغزى العميق وراء هذه النصيحة؟",
          questionEn: "Charles Bukowski’s gravestone read 'Don't Try'. What is the deep intention behind this?",
          optionsAr: [
            "أنه ينبغي التخلي عن الطموح والجلوس بلا عمل طوال الحياة.",
            "أنه يجب قبول واقعك الحقيقي ونقاط ضعفك بدلاً من محاولة تزييفها بهوس.",
            "أنه كان يكره العمل الروائي والترجمة في حياته العادية."
          ],
          optionsEn: [
            "That people should abandon goals and sit idle their entire lives.",
            "That you should fully accept your raw reality and vulnerabilities instead of obsessively trying to stage fake perfection.",
            "That he hated writing or translating during his career."
          ],
          correctIndex: 1,
          explanationAr: "توضح النصيحة أن قبول الحقيقة البسيطة لواقعك يحررك من فخ القلق وهوس المثالية ويدفعك للعمل بصدق مطلق دون زيف.",
          explanationEn: "Accepting your natural struggles and limitations relieves you of the performance anxiety of showing fake perfection, allowing you to function with immense honesty."
        }
      ]
    },
    {
      id: 'sa_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: وهم القصر السعيد وتحدي الباندا المفيد',
      titleEn: 'Chapter 2: The Illusion of Constant Happiness & The Superhero of Truth',
      descriptionAr: 'كشف الأوهام المتعلقة بالسعادة الدائمة وقبول فكرة أن الحياة قائمة على حل المشاكل وتحديات الباندا المفيد القاصي للحقيقة.',
      descriptionEn: 'Why suffering is a biological constant, and why happiness comes from choosing the right problems to solve.',
      lessons: [
        {
          id: 'sa_ch2_l1',
          idNum: 1,
          titleAr: '1. المشاكل كقواعد بناء: نحن لا نتذوق السعادة إلا بحلها',
          titleEn: '1. Suffering is a Biological Metric: Happiness Comes from Action',
          duration: '3m',
          type: 'core',
          contentAr: `الحياة حافلة بالمشاكل التي لا تنتهي أبداً. حل مشكلة ما في العمل أو المنزل ينتج تلقائياً مشاكل جديدة أخرى يجب التعامل معها. السعادة الحقيقية لا تكمن في الجحود أو غياب العقبات والتهرب منها، بل تكمن في **نشاطك الفصيح بحل هذه العقبات**. السعادة فعل، حركة، وعمل مستمر يتغذى على القبول والتطور وتجاوز الحواجز يوماً بعد آخر.`,
          contentEn: `Problems do not terminate; they merely evolve. Solving a problem in one sphere of life immediately spawns another to handle. Happiness does not reside in the absolute absence of obstacles; it flourishes in the **very action of resolving them**. Happiness is a dynamic state of motion, feeding on focus, determination, and persistence.`
        },
        {
          id: 'sa_ch2_l2',
          idNum: 2,
          titleAr: '2. تحدي السؤال الجوهري: ما هو حجم الألم الذي تود دفعه وثمنه؟',
          titleEn: '2. The Ultimate Strategic Question: What Pain Do You Choose to Carry?',
          duration: '4m',
          type: 'core',
          contentAr: `يسرد الكثير من الناس قائمة تفضيلاتهم: "أريد عيشاً هنيئاً، أريد المال الوفير، عائلة مثالية ووظيفة مرموقة". لكن السؤال الاستراتيجي الشجاع الذي يغير خارطة طريقك هو: **"ما هو نوع الألم والعذاب والجهد الذي تود بذله بكل سرور لتصل لتلك الغاية؟"** إن رغبتك بالنجاح الرياضي تتطلب بالتأكيد التزاماً تاماً ببذل عرق ووجع العضلات فجر كل يوم داخل صالات التمرين، ورغبتك بالتفوق المعرفي والأكاديمي تتطلب مشقة الدراسة والسهر الطويل. ثمار حياتك تصاغ بتوافقك مع أثمان تلك المشقة!`,
          contentEn: `Almost everyone wants a premium income, a flawless physique, and comfortable prestige. But the truly path-defining question you must ask is: **"What struggles and pain are you actively willing to bear to clear the tab for that success?"** A stellar fitness level requires waking up at dawn to execute exhausting training. Your outcomes are shaped by the pricing you are prepared to cover.`
        }
      ],
      quiz: [
        {
          questionAr: "أين يكمن الينبوع الفعلي الفطري لمشاعر السعادة وفقاً لتعريف علم هندسة المحتوى بالكتاب؟",
          questionEn: "Where does the authentic source of happiness lie according to the core deconstruction?",
          optionsAr: [
            "في نشاطك وعملك المستمر لحل الصعاب والمشاكل المتجددة في واقعك.",
            "في الحصول على سيارة فارهة جداً والعيش طوال الوقت بسفر فاخر.",
            "في التظاهر بعدم وجود أي عوائق ونفي الصعوبات كلياً."
          ],
          optionsEn: [
            "In the active, dynamic process of solving evolving problems in your life.",
            "In owning high-end sportscars and leading a constant vacation lifestyle.",
            "In completely shutting down problems and pretending everything is perfect."
          ],
          correctIndex: 0,
          explanationAr: "السعادة ليست تذكاراً ثابتاً بل هي عملية تفعيل وحلول مستمرة تمنح الإنسان شعوراً عميقاً بالهدف والتطور والتحسن.",
          explanationEn: "Happiness is a dynamic active state rather than a static goal. Solving actual challenges provides humans with profound meaning and direction."
        }
      ]
    },
    {
      id: 'sa_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: وهم الاستثنائية (أنت لست مميزاً)',
      titleEn: 'Chapter 3: You Are Not Special (The Fallacy of Exceptionalism)',
      descriptionAr: 'تفكيك ثقافة تقدير الذات المنتفخة وقبول فكرة أن معظم حياتنا تقع في حيز عادي وبسيط، وفخ الاستحقاق اللاشعوري.',
      descriptionEn: 'Deconstructing hyper-inflated self-esteem and embracing the beauty of being ordinary, freeing yourself from unearned entitlements.',
      lessons: [
        {
          id: 'sa_ch3_l1',
          idNum: 1,
          titleAr: '1. بطل الرواية المزيف: فخ الشعور بالاستحقاق المفرط',
          titleEn: '1. The Entitlement Trap: Feeling Deserved without Performing',
          duration: '4m',
          type: 'intro',
          contentAr: `نشأت فكرة خاطئة مبادؤها: "يجب أن يشعر الجميع بأنهم استثنائيون ومختلفون ليكونوا سعداء". لقد أنتج هذا جيلاً يعتقد في قرارة نفسه بأنه يستحق النجاح الساحق والامتيازات دون بذل عمل شاق حقيقي. وهو عندما تعتقد بأن مشاكلك فريدة من نوعها وبالتالي تستحق معاملة خاصة من العالم، وهو ما يسلبك العزيمة والتحسين الفعلي ويرميك في عزلة الشكوى العقيمة.`,
          contentEn: `In the self-esteem craze of the late 20th century, a dangerous doctrine was born: "Everyone is special and born to rule." This created a generation believing they are inherently entitled to grand benefits. Entitlement is the subconscious conviction that your problems are more profound than anyone else's, which justifies special treatment.`
        },
        {
          id: 'sa_ch3_l2',
          idNum: 2,
          titleAr: '2. منحنى بيل والتوزيع الطبيعي: الحياة تقع في المنتصف دائماً',
          titleEn: '2. The Bell Curve of Reality: Most of life is beautifully mediocre',
          duration: '3m',
          type: 'core',
          contentAr: `بينما يوجد قلة بارعة في قمة الهرم وأخرى تعاني في أسفله، تقع الأغلبية الساحقة من تجاربنا وحياتنا اليومية في الوسط العادي البسيط. أن تقبل فكرة أنك لست عبقرياً دائماً ليس معناه الاستسلام للكسل؛ بل هو تحرير مطلق لضغط التوقعات غير الواقعية البائسة والبدء الفعلي بالتحسن التدريجي والهادئ كإنسان حقيقي.`,
          contentEn: `Let's look at the Bell Curve of human capability. While there are extreme outliers at the top and bottom, the vast bulk of our hours and achievements fall into the warm, standard middle. Accepting that you are not constantly brilliant is not lazy submission; it is a liberating detachment from extreme pressure.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الخلل البنيوي الرئيسي الذي تسببه عقيدة الاستحقاق المفرط؟",
          questionEn: "What is the primary vulnerability caused by the entitlement trap?",
          optionsAr: [
            "تجعل الفرد محفزاً للعمل المتواصل فجر كل يوم.",
            "تسلب الفرد الحافز وتحبسه في دوامة لوم الآخرين والمطالبة بمعاملة تفضيلية بلا عمل.",
            "تؤدي لانخفاض مؤشرات التضخم بالأسواق الاستثمارية."
          ],
          optionsEn: [
            "It keeps people highly motivated to wake up at dawn and execute tasks.",
            "It drains the drive to improve, trapping the individual in complaints and expecting special treatment without paying the dues.",
            "It directly decreases overall inflation across consumer markets."
          ],
          correctIndex: 1,
          explanationAr: "الشعور المزيف بالاستحقاق يمنع صاحبه من رؤية أخطائه الحقيقية وبالتالي يجمد مسار نموه واستقلاله.",
          explanationEn: "Entitlement prevents you from addressing your actual development gaps, blocking both active learning and career progression."
        }
      ]
    },
    {
      id: 'sa_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: دافع الألم (قيمة المعاناة والمقاييس السامقة)',
      titleEn: 'Chapter 4: The Value of Suffering & Choosing Better Metrics',
      descriptionAr: 'اختيار القيم النبيلة وتأسيس معايير تفوقك الشخصية بدلاً من المقاييس السطحية المدمرة للذات.',
      descriptionEn: 'How to structure your values, adopting healthy standards of success instead of toxic external metrics.',
      lessons: [
        {
          id: 'sa_ch4_l1',
          idNum: 1,
          titleAr: '1. لغز المقياس الزائف: هل تقيس حياتك بالسيارة أم بالقيمة؟',
          titleEn: '1. Metric Deconstruction: How Do You Score Your Life?',
          duration: '4m',
          type: 'intro',
          contentAr: `المشكلة ليست دائماً في حدوث المصاعب، بل تكمن في المقياس الذي تستخدمه لتقييم نجاحك وسعادتك. عندما تربط سعادتك بأرقام حسابات الآخرين أو مظاهرهم، أو تقارن فرقتك بفرق أخرى حائزة على نجاحات كونية، فإنك تبيد استقرارك الروحي والمهني بالكامل.`,
          contentEn: `Problems are inevitable, but the metrics you utilize to evaluate those problems determine your mental well-being. A poor metric is one that relies entirely on social status or comparing your own outcomes against extreme global outliers.`
        },
        {
          id: 'sa_ch4_l2',
          idNum: 2,
          titleAr: '2. مقاييس خائبة ومقاييس بطلة: غرس المقاييس الداخلية الحصينة',
          titleEn: '2. Toxic vs. Healthy Metrics: Structuring Inward Values',
          duration: '3m',
          type: 'core',
          contentAr: `المقاييس السيئة هي قيم خارجية غير خاضعة لسيطرتك تماماً (مثل الشهرة والمظهر والممتلكات الفخمة). أما المقاييس البطلة كالتسامح، والصدق، والابتكار، خاضعة لسيطرتك بالكامل وتخدم تحسن المجتمع وتحميك من طقس الظروف المتقلب.`,
          contentEn: `Monson distinguishes between toxic metrics (outside your control, like status, reputation, luxury display) and healthy metrics (inside your control, like radical honesty, creative contribution, humility). Real control shields your life from outer turmoil.`
        }
      ],
      quiz: [
        {
          questionAr: "لماذا يشعر الموسيقار ديف مستاين بالخيبة رغم نجاحه التجاري الهائل؟",
          questionEn: "Why did David Mustaine feel like a failure despite Megadeth's massive success?",
          optionsAr: [
            "لأنه لم يتمكن من كسب أموال وعاش بضائقة دائمة.",
            "لأنه دشن مقياس نجاح خارجي تدميري يلزمه بالتفوق على ميتاليكا التي طردته.",
            "بسبب معارضة عائلته لمشروعه الغنائي."
          ],
          optionsEn: [
            "Because he never earned money and lived in chronic debt.",
            "Because he adopted a toxic external comparison metric requiring him to outperform Metallica.",
            "Because his family actively rejected his artistic style."
          ],
          correctIndex: 1,
          explanationAr: "تغيير وتثبيت مقياس التقييم الذاتي من الخارجي المقارن إلى الداخلي الحقيقي يغير شعورك تجاه الإنجاز بالكامل.",
          explanationEn: "Your metrics dictate your perception. Selecting uncontrollable external comparisons produces chronic unhappiness."
        }
      ]
    },
    {
      id: 'sa_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: السيادة والمسؤولية المطلقة',
      titleEn: 'Chapter 5: Raw Responsibility & Choosing Your Response',
      descriptionAr: 'تولي المسؤولية الكاملة عن استجابتك وتوجيه العقل نحو الأفعال والمواقف الخاضعة لإرادتك.',
      descriptionEn: 'Taking absolute ownership of your choices, distinct from assigning fault, to claim your operational power.',
      lessons: [
        {
          id: 'sa_ch5_l1',
          idNum: 1,
          titleAr: '1. قانون ملكية المشاكل: الفارق الحاد بين الخطأ والمسؤولية',
          titleEn: '1. Fault vs. Responsibility: Taking Command of Your Current State',
          duration: '4m',
          type: 'intro',
          contentAr: `قد لا تكون مخطئاً في حدوث المأساة أو الخسارة كوجود عطب مفاجئ في الأسواق؛ لكنك مسؤول بالكامل عن استجابتك وتوجيه عقلك نحو الأفعال الحالية. الخطأ يرتبط بالماضي (من سبب المشكلة)، والمسؤولية ترتبط باللحظة الحالية (ماذا سأفعل لحلها وصيانة مستقبلي بنبالة وشرف).`,
          contentEn: `You may not be at fault for the tragedy that touches your path, but you are entirely responsible for how you choose to react to it. Fault belongs to the past (who caused it), while responsibility is your present platform for strategic adjustment.`
        },
        {
          id: 'sa_ch5_l2',
          idNum: 2,
          titleAr: '2. وهم الضحية المهنية: قوة الامتلاك المطلق لردة الفعل',
          titleEn: '2. The Victimhood Fallacy: Reclaiming Executive Focus',
          duration: '3m',
          type: 'core',
          contentAr: `يتفجر مسار الإنجاز الحركي المعاصر حين تمتنع عن البحث عن كبش فداء أو التباكي في أروقة العمل، وتقرر بصمت وشجاعة تحمل عتبات التغيير وتسييس عقلك للوصول لحلول رصينة وفعالة.`,
          contentEn: `Your professional transformation ignites when you refuse to wait for a savior or blame bad luck, actively owning your choices to discover creative ways out of any impasse.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الفارق الجوهري بين الخطأ (Fault) والمسؤولية (Responsibility)؟",
          questionEn: "What is the critical boundary between Fault and Responsibility?",
          optionsAr: [
            "الخطأ والمسؤولية مفهومان متطابقان يدلان على العقاب فقط.",
            "الخطأ يرتبط بالماضي ومن تسبب بالحدث، والمسؤولية ترتبط باللحظة الحالية وقراراتك الفاعلية لتجاوز الموقف.",
            "الخطأ يحل القضايا تلقائياً بمرور الزمن."
          ],
          optionsEn: [
            "They are identical terms highlighting only legal punishment.",
            "Fault belongs to the past showing who caused the issue; responsibility is your present initiative to resolve it.",
            "Fault resolves corporate situations naturally over time without action."
          ],
          correctIndex: 1,
          explanationAr: "تولي المسؤولية يخرجك من حالة الضحية الجبانة إلى حالة القائد الفعّال الممسك بزمام التحكم.",
          explanationEn: "Embracing responsibility transitions your stance from a passive victim to an active driver of your own destiny."
        }
      ]
    },
    {
      id: 'sa_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: التواضع العقلي (أنت مخطئ في كل شيء، وأنا كذلك)',
      titleEn: 'Chapter 6: Cognitive Humility: You’re Wrong About Everything',
      descriptionAr: 'قوة الشك والتحرر من سجن اليقين المطلق واليقين الزائف المانع للنمو والابتكار بالشركات.',
      descriptionEn: 'The liberating power of doubt, and why intellectual certainty blocks creative problem-solving and collaboration.',
      lessons: [
        {
          id: 'sa_ch6_l1',
          idNum: 1,
          titleAr: '1. خدعة الدماغ السحرية: كيف نصنع قناعات مضللة بيقين جاد؟',
          titleEn: '1. The Ego-Projection Trap: Constructing Flawed Beliefs with Pride',
          duration: '4m',
          type: 'intro',
          contentAr: `يعتقد عقلنا باستمرار أنه توصل لليقين المطلق والحقيقة الكاملة بالدائرة. الحقيقة العلمية تشير إلى أن عقولنا متحيزة وتصيغ سيناريوهات ومفاهيم مضللة استناداً لتجارب قديمة وتبررها بغرور تافه. التحرر الحقيقي يبدأ بالسماح برحيل أوهام اليقين والاعتراف بقنوات الخطأ الطبيعية.`,
          contentEn: `Our mind continuously acts as an interpretation engine, forming rigid beliefs based on fragmented data. True liberation begins when we surrender the desperate need for absolute certainty and open our designs to self-correction.`
        },
        {
          id: 'sa_ch6_l2',
          idNum: 2,
          titleAr: '2. فضل الشك الإيجابي: ترقية الفكر وقبول التعديل المستمر',
          titleEn: '2. The Scientific Doubt Rule: Letting Go of Intellectual Rigidity',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تتبنى الشك الإيجابي حيال معتقداتك وآرائك وأفكارك بالعمل، تصبح مرناً وقادراً على استيعاب الحقائق الجديدة وتعديل الخطط بذكاء وقار، لتتفوق علمياً وأكاديمياً دون عداء مع محيط المطورين والخبراء.`,
          contentEn: `Constructive skepticism toward your own cognitive formulas unlocks continuous growth. By welcoming the possibility of being wrong, you dynamically adjust to new datasets with professional ease.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يفيدنا الشك المعرفي المتواضع في كسر جمود الأداء المؤسسي؟",
          questionEn: "How does cognitive doubt help us overcome performance stagnation?",
          optionsAr: [
            "يجعل الموظف متردداً وعاجزاً عن التعبير عن رأيه بالكامل.",
            "يزيل التصلب المعرفي ويفتح الباب للتعاون الفعال وتقبل الآراء المبتكرة والتصحيح الهيكلي للمسارات.",
            "يدفعنا للاستسلام لخطط الخصوم دون مراجعة تفصيلية."
          ],
          optionsEn: [
            "It turns us into insecure operators who decline to voice any technical opinions.",
            "It dissolves dogmatic pride, welcoming collaborative upgrades, innovative feedback, and objective debugging.",
            "It forces us to surrender our plans to competitors unconditionally."
          ],
          correctIndex: 1,
          explanationAr: "السماح بالرحيل لشحنة الأنا العارفة يجعلنا أسرع في اكتساب العلوم وتغيير الافتراضات الخاطئة بوعي.",
          explanationEn: "Ditching the obsession with being right clears the channel for genuine learning and fluid, data-driven adaptation."
        }
      ]
    },
    {
      id: 'sa_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: الفشل كطريق وحيد للتقدم (مبدأ \"افعل شيئاً\")',
      titleEn: 'Chapter 7: Failure as the Only Way Forward & the "Do Something" Rule',
      descriptionAr: 'تحويل علاقتك بالفشل من الهزيمة المعنوية إلى وقود الابتكار الحركي المعاصر.',
      descriptionEn: 'Redefine failure as a mandatory prerequisite for growth, using action to catalyze immediate momentum.',
      lessons: [
        {
          id: 'sa_ch7_l1',
          idNum: 1,
          titleAr: '1. مفارقة الألم والإتقان: لا وجود للتميز دون عثرات جائرة',
          titleEn: '1. The Grit Fallacy: Decoding the Pain Threshold of Skill Acquisition',
          duration: '4m',
          type: 'intro',
          contentAr: `العقل البشري يميل لتجنب المغامرة خوفاً من نكهة الفشل المريرة بالعمل. الحقيقة البديهية هي أن الإتقان والتميز يولد من ركام مئات الأخطاء والعثرات المتتالية. من يخشى الفشل يجمد في مكانه، ومن يرحب به كأصل تعليمي يتصدر ساحات الصدارة بوقار وثبات.`,
          contentEn: `The mind naturally retreats from risks to protect itself from disappointment. Yet, elite mastery is built exclusively from the ashes of ongoing struggles. Welcoming failure as useful data is the ultimate competitive advantage.`
        },
        {
          id: 'sa_ch7_l2',
          idNum: 2,
          titleAr: '2. قانون التدفق المعرفي السريع: الفارق بين الدافع والبدء بالحركة',
          titleEn: '2. The "Do Something" Principle: Action is Both Cause and Effect',
          duration: '3m',
          type: 'core',
          contentAr: `ينتظر الكثيرون "الإلهام" أو "الحافز" للبدء بالعمل؛ لكن مانسون يعلمنا قانوناً ثورياً: **"الحركة ليست فقط نتيجة للحافز، بل هي السبب الحقيقي في توليد هذا الحافز!"**. افعل أي شيء بسيط تجاه هدفك، وستجد شحنة الحماس والتدفق المعرفي تشرق بصدرك تلقائياً لتدفعك للإنجاز.`,
          contentEn: `Most wait for inspiration before taking action. Manson's counterintuitive rule states: **Action generates inspiration**. Even a microscopic physical action toward your milestone shatters mental paralysis, igniting the drive.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الجوهر العملي لمبدأ 'افعل شيئاً' (Do Something Principle) عند مارك مانسون؟",
          questionEn: "What is the core takeaway of Manson’s 'Do Something' principle?",
          optionsAr: [
            "الانتظار حتى يتولد الحماس بنسبة ١٠٠٪ قبل لمس أي لوحة برمجة بالشركات.",
            "البدء بالعمل والحركة كأداة ذكية لتوليد الإلهام والأفكار الإبداعية بدلاً من ترقبها السلبي العقيم.",
            "تفويض كافة مسؤولياتك للآخرين هرباً من النقد الاجتماعي."
          ],
          optionsEn: [
            "Waiting patiently until inspiration is completely saturated before taking action.",
            "Initiating small physical steps as a dynamic strategy to generate energy and thoughts, bypassing inertia.",
            "Outsourcing your primary obligations to avoid peer reviews."
          ],
          correctIndex: 1,
          explanationAr: "الفعل والعمل البسيط يدمر ركود الخوف والبلادة تلقائياً ويولد التدفق المعرفي والتقدير الذاتي لنجاح العمل الحركي.",
          explanationEn: "Action functions as both the cause and the effect of motivation. Executing a minor task clears anxiety and triggers momentum."
        }
      ]
    },
    {
      id: 'sa_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: فضيلة الرفض وصيانة وعاء الحدود (أهمية قول لا)',
      titleEn: 'Chapter 8: The Boundary Shield: The Sacred Art of Saying No',
      descriptionAr: 'تأسيس استقلالك وحماية مناعتك المهنية عبر قول لا المعرفية للأشياء المقلة خارج بوصلتك قيمك.',
      descriptionEn: 'How to build healthy emotional and operational boundaries, using selective rejection to secure your primary goals.',
      lessons: [
        {
          id: 'sa_ch8_l1',
          idNum: 1,
          titleAr: '1. فخ استجداء الرضا الاجتماعي وتشتيت كنز التركيز الشخصي',
          titleEn: '1. The Approval Chase Trap: Why Saying Yes to Everything Destroys focus',
          duration: '4m',
          type: 'intro',
          contentAr: `يسعى الكثير من المطورين لإرساء الود مع كل شخص وموافقة كل طلب، مما يعرض طاقتهم المهنية وحركتهم للضياع والتبعثر. التورط بالموافقات العشوائية هو شكل مستتر من الضعف والاستحقاق الوهن، ونقص حاد في النضج الإداري وصيانة الذات والوقار بساحات العمل الكونية.`,
          contentEn: `Agreeing to every request is a hidden symptom of low self-worth. Spreading your cognitive assets thin across endless side-projects guarantees distraction. Reclaiming absolute focus is a mandatory act of strategic self-defense.`
        },
        {
          id: 'sa_ch8_l2',
          idNum: 2,
          titleAr: '2. هندسة الحدود الصامتة: اختيار الالتزام الطاهر والانتقائي بالشركاء',
          titleEn: '2. The Commitment Arbitrage: Saying No to Unify Your Core Energy',
          duration: '3m',
          type: 'core',
          contentAr: `النجاح والقيمة لا يتولدان من تجميع مئات الخصائص والمشاريع السطحية؛ بل من **الالتزام الفاحص والعميق بعدد قليل من المشاريع والقيم النبيلة وعقد صلات صلبة معها**. عندما ترفض الملهيات بصرامة واقتدار، تتدفق قوتك المعرفية بوقار متكامل وتصيب أهدافك بثبات عظيم مبرز بالعمل الأكاديمي والمالي.`,
          contentEn: `Real sophistication derives from commitment to a selective array of high-value priorities. Rejecting non-essential distractions focuses your critical capacity, converting scattered effort into massive outcomes.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يساهم السلوك الإيجابي الحاسم لقول 'لا' وصناعة الرفض في تماسك البنيان المهني؟",
          questionEn: "How does active rejection and saying 'No' solidify professional stamina?",
          optionsAr: [
            "يجعل الموظف منعزلاً وبلا أصدقاء بالشركة.",
            "يحمي طاقته الحيوية ويوجه تركيزه لخدمة أهدافه وقضاياه الكبرى بكفاءة واكتفاء دون إهدار للموارد في تفاهات وضيعين.",
            "يسهم في زيادة ديون البنوك وتشتيت عقود الصفقات."
          ],
          optionsEn: [
            "It isolating the operator and strips them of all useful colleagues.",
            "It seals somatic and temporal leaks, focusing your cognitive power strictly on high-impact projects without wasting resources.",
            "It drives up bank interest and compromises commercial deals."
          ],
          correctIndex: 1,
          explanationAr: "فضيلة الرفض وصون وعاء الحدود تمنحك حضوراً وقوراً يعلّي من قيمة موافقتك وصمت مبادرتك الأكاديمية بالشركات والمطورين بالكامل.",
          explanationEn: "Sovereignty over your boundaries is a primary mark of a self-actualized specialist. Saying 'no' honors your select 'yes'."
        }
      ]
    },
    {
      id: 'sa_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: بوصلة الموت لإرساء النقاء والأمان (مكتسب النهاية والوضوح الجلي)',
      titleEn: 'Chapter 9: Clear Vision through Mortality: Death as the Supreme Filter',
      descriptionAr: 'استعمال تذكار النهاية والموت لتبديد صغائر الهموم واعتناق الفكر النبيل والأهداف الحيوية الباذخة.',
      descriptionEn: 'Leveraging mortality reflection to strip away superficial trivia, focusing your brief hours on authentic meaning.',
      lessons: [
        {
          id: 'sa_ch9_l1',
          idNum: 1,
          titleAr: '1. مرآة الفناء المعرفية: كيف تتبخر مخاوف الانتقاد والمظهر؟',
          titleEn: '1. The Mortality Filter: Dissolving the Fear of Social Judgment',
          duration: '4m',
          type: 'intro',
          contentAr: `نقضي معظم أيامنا قلقين مغتمين بشأن تفاصيل هامشية وركيكة: هل صورتي مثالية بالمنشور؟ هل وجهوا لي نقداً مهيناً؟ الحقيقة الرهيبة هي أنه بمرور بضعة عقود، سنزول جميعاً وسينسى العالم هذه التفاصيل السخيفة. تذكر النهاية يبخر فجأة مشاعر القلق ويعيد تثبيت بوصلتنا نحو الإنجاز الطاهر والنبالة والشرف الواعي دون قيود.`,
          contentEn: `We squander immense hours micro-worrying about societal metrics: Do they like my profile? Did a peer write a dismissive review? Reflecting on the finality of existence instantly drains power from global vanity, focusing you on truth.`
        },
        {
          id: 'sa_ch9_l2',
          idNum: 2,
          titleAr: '2. تفكيك وساوس الأنانية: صياغة قيم ترفرف فوق الفناء والغياب',
          titleEn: '2. Leaving a Real Legacy: Investing in Values Beyond Your Comfort',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تواجه حقيقة النهاية بهدوء ورزانة عقلية، تتوقف عن عبادة صورتك التفاخرية الزائفة، وتبدأ بتأسيس قيم وقرارات وعقود تخدم الأجيال القادمة وتصنع أثراً معنوياً وعلمياً حياً فوق الغياب والصعاب بساحات العمل والشركات الكونية بالكامل.`,
          contentEn: `Confronting mortality with unshakeable composure turns your drive away from temporary vanity and redirects your energy toward designing systems that serve future cohorts long after your work is complete.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يفيدنا مبدأ 'مظلة الموت وتذكر النهاية' في تقليص وتطهير مشاعر القلق والهلع اليومي؟",
          questionEn: "How does reflecting on mortality support us in clearing workplace stress?",
          optionsAr: [
            "يجعل الفرد يائساً ومحبطاً ويتخلى عن العمل والدراسة بالكلية.",
            "يبخر وساوس وصغائر الهموم ويظهر تفاهة الأحقاد والرياء المظهري، معيداً توجيه طاقتك بالكامل للأولويات والقيم النبيلة السامقة.",
            "يجبرنا على التباكي ومقاومة المبادرات الهندسية المبرزة بوقاحة."
          ],
          optionsEn: [
            "It triggers immediate apathy and stops study or corporate activity.",
            "It evaporates petty social anxieties and trivial conflicts, pointing your focus directly at your highest Priorities.",
            "It prompts us to cry and block architectural projects with arrogance."
          ],
          correctIndex: 1,
          explanationAr: "تذكر الموت يقصر اللامبالاة على ما يستحق ويسلخ الهلع من المستقبل لترتق بجوارحك لأمان الصفاء والسلام الروحي والتوافق المعرفي.",
          explanationEn: "Embracing mortality clears the field of synthetic distractions, anchoring your choices on genuine contribution and unshakeable peace."
        }
      ]
    },
    {
      id: 'sa_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: قبول العادية والسكينة الحية (الحرية في العبور بجمال وتواضع)',
      titleEn: 'Chapter 10: Surrendering to Normalcy: Celebrating Mundane Integrity',
      descriptionAr: 'التكامل النهائي مع البساطة والحرية في تقدير اللحظات الحاضرة، وجسر العبور لتطبيقاتك بصدومة وتمكين تام.',
      descriptionEn: 'Reclaiming peace by discarding status and self-glorification traps, finding happiness in ordinary, authentic existence.',
      lessons: [
        {
          id: 'sa_ch10_l1',
          idNum: 1,
          titleAr: '1. العكاز الذهبي لجمال العادية: الحرية من متطلبات العظمة الزائفة',
          titleEn: '1. The Beauty of Mundane Integrity: Living without the Burden of Grandeur',
          duration: '4m',
          type: 'intro',
          contentAr: `في ختام رحلتنا المعرفية مع هذا السفر المبارك، نصل للنضج الأسمى: قبول العادية والسكينة البسيطة. الحرية لا تكمن في قناع العبقرية الكاذبة أو الشهرة الطنانة بالأسواق؛ بل في قدرتك الطاهرة على العيش بسلام وصدق والقيام بواجباتك المهنية والذاتية بأمانة تامة وبسطور رقيقة ترسم وقار حضورك الساكن الصالح المميز.`,
          contentEn: `True maturity is the celebration of absolute simplicity. Peace does not belong to grandiose facades or frantic social titles; it is found in quiet, uncompromised integrity, executing your duties cleanly while appreciating standard, human life.`
        },
        {
          id: 'sa_ch10_l2',
          idNum: 2,
          titleAr: '2. جسر التحرر التطبيقي: دمج اللامبالاة الذكية بهندسة مستقبلك الفصيح',
          titleEn: '2. The Surrender Bridge: Merging Poised Focus with Daily Career Action',
          duration: '3m',
          type: 'core',
          contentAr: `الآن، وأنت تمتلك أركان هذه الحكمة، وجه نيتك الصادقة للبدايات الصالحة. ابسط سيطرتك على ردود أفعالك، اختر مقاييسك بدقة طاهرة، صمم مشاريعك وعقودك بثبات صلب، ودع غبار الملميات يعبر ويرحل بسلام. هذا هو الفن الحقيقي للامبالاة الذكية والقيادة الحية الصابرة بالكامل.`,
          contentEn: `Equipped with this unshakeable philosophy, step forward. Govern your reactions, refine your metrics, draft your business designs with courage, and allow superficial noise to dissolve without resistance. This is your foundation for lasting mastery.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو المحور الأسمى والمنتهى الفعلي لمسار اللامبالاة الذكية عند مارك مانسون؟",
          questionEn: "What is the ultimate culmination of Manson’s Subtle Art philosophy?",
          optionsAr: [
            "الوصول للعيش في هوس دائم بالمال والشهرة وممتلكات تفاخرية زائفة بالكامل.",
            "التصالح المطلق مع بساطة وهشاشة الوجود الإنساني الطبيعي واختيار قيم نبيلة باطنية وهندستها بنشاط وقوة بساحات العمل بنبالة وبشرف مبرهنين.",
            "تجنب المطورين والزملاء بالشركة والتهرب من سداد مستحقات البنوك."
          ],
          optionsEn: [
            "Achieving a state of relentless obsession with global wealth, fame, and status symbols.",
            "radical reconciliation with ordinary human existence, adopting deep internal values, and building your career with unshakeable authenticity and complete integrity.",
            "Escaping corporate coworkers and refusing to pay your legal financial dues."
          ],
          correctIndex: 1,
          explanationAr: "تجاوز هوس المظاهرات وتأسيس بوصلة قيمك الداخلية الحصينة يصنع منك هامة وقورة تسكن أفعالها حكمة القادة الأحرار بالدائرة.",
          explanationEn: "Ditching the obsession with external validation leaves your mind clean to execute targets with absolute dedication, clarity, and deep personal authority."
        }
      ]
    },
    {
      id: 'sa_ch11',
      chapterNum: 11,
      titleAr: 'الفصل الحادي عشر: قوة الرفض - العثور على الحرية الحقيقية من خلال الالتزام العميق',
      titleEn: 'Chapter 11: The Value of Saying NO - Finding Freedom Through Radical Commitment',
      descriptionAr: 'لماذا السعي وراء كل الخيارات والفرص السطحية يسلبك التركيز، بينما يمنحك الرفض الواعي والالتزام عمق الإنجاز السعيد.',
      descriptionEn: 'Why chasing endless alternatives makes life shallow, and how declining distractions brings immense significance to your professional focus.',
      lessons: [
        {
          id: 'sa_ch11_l1',
          idNum: 1,
          titleAr: '1. الرفض كحرية حقيقية: أهمية تسييج حياتك بالحدود الصحية والرفض الأنيق',
          titleEn: '1. The Liberty of Denial: Embracing Limits Over Endlessly Shallow Options',
          duration: '3m',
          type: 'core',
          contentAr: `لكي تمنح قيمة حقيقية لشيء ما في حياتك، يجب عليك بالضرورة **أن ترفض ما سواه**. ثقافة الاستهلاك الحديث تضغط عليك لتقبل وتجرب كل عرض وكل فرصة، مما يجعلك مشتتاً وخاوي الوفاض. الرفض الأنيق يحررك من فخ القلق، ويجعل نعمك القادمة بالغة الصدق والقوة والفاعلية.`,
          contentEn: `To value anything genuinely, you must reject everything else. Modern branding lures you to try every trend, making you unstable and shallow. Rejecting non-essentials clarifies your path, giving your ultimate choices immense spiritual and functional gravity.`
        },
        {
          id: 'sa_ch11_l2',
          idNum: 2,
          titleAr: '2. الالتزام العميق: رونق البقاء والوقار عندما تنضج العهود والمشاريع',
          titleEn: '2. Infinite Commitment: Discovering Joy in Consistent, Patient Partnerships',
          duration: '4m',
          type: 'tips',
          contentAr: `يتصور الهواة أن السعادة تكمن في قفزات التغيير المستمرة، لكن الفوز والصدارة الحقيقية تولد فقط في أراضي **الالتزام الطويل والعميق**. عندما تلتزم بمكان عمل، أو بموضوع دراسي، أو بعلاقة إنسانية واثقة، فإنك تبطن عقلك بالدقة والمهارة وتستمر في حل مشكلات أعمق تطور من كيانك بتبجيم ووقار هائلين.`,
          contentEn: `Amateurs mistake flighty novelty for freedom. True success resides in deep, prolonged commitment. Committing to a specific science, a long-term business model, or a trusted alliance trains your focus to resolve complex internal challenges, unlocking incredible career authority.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يحقق الالتزام والرفض الواعي للمشتتات (Saying NO) تحرراً حقيقياً للأفراد؟",
          questionEn: "How does radical commitment and consciously saying NO liberate your life?",
          optionsAr: [
            "عبر زيادة الديون والتهرب من المسؤوليات الأكاديمية تماماً.",
            "بالتخلص من هوس المقارنة والخيارات السطحية، والتركيز المطلق على صيانة المشاريع والقيم النبيلة وتوسيع أثرها بوقار وشرف.",
            "برفض كل سبل التعاون والعيش في عزلة تامة وجحود مفرط."
          ],
          optionsEn: [
            "By accumulating liabilities and walking away from professional deadlines completely.",
            "By eliminating the stress of FOMO and shallow alternatives, channeling all your mental energy to sustain valuable targets and grow them with honor.",
            "By refusing to cooperate with anyone style and accepting rigid isolation."
          ],
          correctIndex: 1,
          explanationAr: "اختيار مرجعيات وقيم محدودة والالتزام بعقودها يعود على الفرد بصيت ريادي مرموق ويعمر أوقاته بالبركة والتنمية.",
          explanationEn: "Filtering out minor alternatives creates space to master complex tasks, translating to lasting professional dominance."
        }
      ]
    },
    {
      id: 'sa_ch12',
      chapterNum: 12,
      titleAr: 'الفصل الثاني عشر: لقاء الفناء وجهاً لوجه - اختيار الأثر والتركة التي تخلد من بعدك بكرامة صلبة',
      titleEn: 'Chapter 12: The Reality of Mortality - Choosing the Legacy That Outlives You',
      descriptionAr: 'مواجهة حقيقة الموت كأداة فلسفية ووجودية كفيلة لتصفير تفاهة السطحيات وبناء ناصية النوايا الصالحة الصادقة.',
      descriptionEn: 'Using the awareness of your brief human lifespan as the ultimate compass to filter superficial worries, building an unshakeable legacy.',
      lessons: [
        {
          id: 'sa_ch12_l1',
          idNum: 1,
          titleAr: '1. بوصلة الفناء الوجودية: كيف يدير وعيك بنهايتك بوصلة اهتماماتك اليومية؟',
          titleEn: '1. The Mortality Compass: Dismantling Ego Tribulations to Uncover Real Purpose',
          duration: '3m',
          type: 'core',
          contentAr: `عندما تدرك يقيناً في قرارة نفسك أن أيامك على هذا الكوكب معدودة ومحدودة للغاية، يتبخر هوس الكبرياء والغرور والقلق فجأة. تصبح مشكلات العمل التافهة أو كلمات المنتقدين بلا وزن حقيقي؛ حقيقة الموت الوجودية تعزز حضورك في اللحظة الراهنة وتدفعك للسعي الحثيث وبذل عرق جهودك في القضايا ذات المعنى الأسمى والأنبل بصدق تام.`,
          contentEn: `When you absorb the reality of your finite lifespan, pretenses and trivial fears instantly dissolve. Social criticisms and administrative squabbles lose their sting. The awareness of death serves as a strategic compass, pushing you to invest your days in noble efforts with clarity.`
        },
        {
          id: 'sa_ch12_l2',
          idNum: 2,
          titleAr: '2. صياغة التركة الطاهرة: ترك عهد صالح يتجاوز مجرد عيشك الفردي بوقار وحب',
          titleEn: '2. Building Your True Legacy: Shaping Professional Contribution Over Selfish Concerns',
          duration: '4m',
          type: 'tips',
          contentAr: `التركة الطاهرة والأثر الحقيقي (Legacy) ليس مجرد ادخار للمال الزائف؛ القائد الحكيم هو من يصيغ في حياته مشاريع عملية، كفاءات متمكنة، وقنوات علمية تنشر السلام والمعرفة وتدوم طاقات نفعها للمجتمع طويلاً بعد رحيله. التزم بالنبالة، أسس الشرف في عقود عاداتك، واجعل حياتك بطاقة تهنئة فريدة للكون.`,
          contentEn: `An authentic legacy is not selfish hoarding; it is professional and human contribution. True leaders design actionable networks, empower coworkers, and generate knowledge frameworks that sustain the community long after they depart. Build your legacy on honor and profound peace.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف تساهم حقيقة الوعي الوجودي بالموت في إعادة هندسة وترتيب أولويات الأحرار؟",
          questionEn: "How does the existential awareness of mortality redefine a wise person’s priorities?",
          optionsAr: [
            "تدعوهم للكسل المطلق وتجنب ممارسة الرياضة والتهرب من المسؤوليات.",
            "تبدد هموم السطحيات التافهة والغرور الخاوي، وتركز بوصلة وجودهم على الإسهام النبيل والتمكين وبناء التركة الصالحة بوقار تام.",
            "تجعلهم يبحثون عن صفقات سريعة استهلاكية زائفة وممتلكات مظهرية."
          ],
          optionsEn: [
            "It drives them to overall laziness, avoiding training or taking on responsibilities.",
            "It strips away trivial anxieties and ego-driven behaviors, locking their target on values, community empowerment, and building a meaningful legacy.",
            "It pushes them to seek superficial deals and consume luxury items endlessly."
          ],
          correctIndex: 1,
          explanationAr: "مواجهة فنائنا تخرس زعيق المظاهر السلبية وتمهد القنوات لعطاء وصدارة أكاديمية حرة تخلد بكل محبة ووقار.",
          explanationEn: "Embracing mortality clears the field of trivial clutter, guiding you to allocate your energy toward tasks of supreme value."
        }
      ]
    }
  ]
};
