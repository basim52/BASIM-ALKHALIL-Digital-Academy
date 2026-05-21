import { BookCourse } from './types';

export const thinkingFastSlowCourse: BookCourse = {
  id: 'thinking_fast_slow',
  titleAr: 'التفكير السريع والبطيء وتفكيك أوهام العقل وانحيازاته',
  titleEn: 'Thinking, Fast and Slow & Deconstructing Cognitive Biases',
  authorAr: 'دانيال كانمان',
  authorEn: 'Daniel Kahneman',
  coverImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'تحفة علم النفس السلوكي والاقتصاد الحائزة على جائزة نوبل، والتي تفكك الصراع الدائم بين العقل البديهي السريع والعقل التحليلي البطيء وتكشف شراك المغالطات الفكرية لقراراتنا.',
  descriptionEn: 'The monumental Nobel-winning masterpiece of behavioral economics, deconstructing the eternal clash between instant intuitive System 1 and logical System 2, detailing a map to conquer logical and financial fallacies.',
  isLocked: false,
  chapters: [
    {
      id: 'tfs_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: شخصيات القصة والمشهد العام (النظام 1 والنظام 2)',
      titleEn: 'Chapter 1: Characters of the Story (System 1 and System 2)',
      descriptionAr: 'فك ارتباط قوى الوعي غير المرئية وتأقلم العقل البديهي السريع مقابل التحليل اللطيف.',
      descriptionEn: 'Understanding the automatic, effortless fast-thinking system vs. the slow, analytical system.',
      lessons: [
        {
          id: 'tfs_ch1_l1',
          idNum: 1,
          titleAr: '1. النظام 1 السريع والتلقائي: كيف يوفر طاقتنا ويهندس انطباعاتنا الأولى؟',
          titleEn: '1. System 1: The Quick, Automatic Intuition Engine',
          duration: '4m',
          type: 'intro',
          contentAr: `يعمل النظام 1 تلقائياً وبسرعة فائقة، مع بذل جهد بسيط أو دون أي وعي أو سيطرة طوعية مباشرة. إنه المحرك المسؤول عن ردود الفعل الغريزية، والتعرف اللحظي على السمات الوجدانية بالوجوه، وتفادي المخاطر، وقراءة الكلمات البسيطة على اللوحات الإعلانية دون استهلاك لطاقة ذهننا الواعي.`,
          contentEn: `System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. It drives rapid intuitive reactions, instant facial recognition of emotion, and daily routines without draining conscious computational bandwidth.`
        },
        {
          id: 'tfs_ch1_l2',
          idNum: 2,
          titleAr: '2. النظام 2 البطيء والمجهد: صيانة العمليات الحسابية والتركيز المتعمد',
          titleEn: '2. System 2: Deliberate Intellect & Structural Concentration',
          duration: '3m',
          type: 'core',
          contentAr: `يوجه النظام 2 تركيزه وانتباهه المحدود للمهام العقلية المعقدة التي تتطلب جهداً وحساباً معقداً. عندما تقوم بحل مسألة ضرب صعبة (مثل 17 × 24) أو تبحث عن ملامح صديق في قاعة مزدحمة، فإنك تعتمد بالكامل على تفعيل النظام 2، وهو المقر الفعلي لتعب فاعليتك وتقديرك للخيارات بدقة صائبة.`,
          contentEn: `System 2 allocates temporary attention to the effortful mental operations that demand it, including complex calculations. When multiplying 17 x 24 or searching for a specific face in a dense stadium, you mobilize the conscious control units of System 2.`
        }
      ],
      quiz: [
        {
          questionAr: "أي من الأنظمة التالية يمثل العقل التلقائي السريع الذي يعمل بلا مجهود واعي ويتحكم بالاستجابات الغريزية والحدسية؟",
          questionEn: "Which of the following mental models represents the fast, automatic system that operates effortlessly and handles instinctive and rapid reactions?",
          optionsAr: [
            "النظام 2 (البطيء والتحليلي والمجهد).",
            "النظام 1 (السريع والتلقائي والحدسي).",
            "القشرة القشرية الواعية بفاعلية التفويض الطبي."
          ],
          optionsEn: [
            "System 2 (slow, calculating, effortful).",
            "System 1 (fast, automatic, effortless).",
            "The Executive Conscious Cortex representing pure clinical logic."
          ],
          correctIndex: 1,
          explanationAr: "النظام 1 هو الجهاز المتأهب دائماً لتوليد الانطباعات والمشاعر السريعة التي ترفد قراراتنا اليومية بسلاسة تامة.",
          explanationEn: "System 1 is the automatic generator of impressions, feelings, and rapid responses that feed your daily actions."
        }
      ]
    },
    {
      id: 'tfs_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: الانتباه والجهد المعرفي والمتحكم الكسول',
      titleEn: 'Chapter 2: Attention, Cognitive Effort, and the Lazy Controller',
      descriptionAr: 'قراءة التعب الجسدي والفسيولوجي المرافق للتفكير العميق وتجنب الكسل العقلي السائد.',
      descriptionEn: 'Anatomy of mental taxation, pupillometry metrics, and the baseline cost of thinking.',
      lessons: [
        {
          id: 'tfs_ch2_l1',
          idNum: 1,
          titleAr: '1. لغة الجسد المعرفية: كيف تعبر حدقة أعيننا ونبضاتنا عن الجهد الذهني؟',
          titleEn: '1. Physical Signals of Thought: Pupil Dilation Metrics',
          duration: '4m',
          type: 'intro',
          contentAr: `رصد كاهنمان أن مجرد ممارسة الجهد المعرفي يعبئ قوى هائلة بجسمنا فسيولوجياً. تتسع حدقة أعيننا بوضوح متناسب طردياً مع صعوبة المسائل الرياضية وبذل الوعي المنظم. عند تمرين إضافة 3، يتسع البصر وتزداد ضربات القلب، مما يثبت أن الانتباه مورد بيولوجي محدود ومكلف بالكامل.`,
          contentEn: `Kahneman observed that mental effort mobilizes immediate physiological markers. Pupil size dilates proportionately according to complex math tasks. Performing the "add-3" test expands pupils, demonstrating that attention is a limited biological asset.`
        },
        {
          id: 'tfs_ch2_l2',
          idNum: 2,
          titleAr: '2. المتحكم الكسول: كيف تقع عقولنا المجهدة في شراك انحياز الرضا البسيط؟',
          titleEn: '2. The Lazy Controller: Managing Your Mental Budget',
          duration: '3m',
          type: 'core',
          contentAr: `نظراً لمحدودية تسييل الجهد الذهني العالي، يميل المخ للكسل وتفويض القرارات للنظام السريع. هذا ما يجعل النظام 2 يتصرف كمتحكم كسول (Lazy Controller)، يرضى بتبني أول فكرة منسجمة يقدمها له الحدس العفوي والنمطي المسرع للنتائج لتفادي عناء التدقيق والتحقيق البطيء.`,
          contentEn: `Because high analytical thinking is intensely expensive, our system defaults to laziness. System 2 serves as a lazy controller, easily accepting the first coherent impression of the rapid System 1 to avoid the metabolic effort of validation.`
        }
      ],
      quiz: [
        {
          questionAr: "ما العلاقة الطردية التي رصدها دانيال كاهنمان بين ازدياد حدة الجهد المعرفي والمؤشرات الفسيولوجية للجسم؟",
          questionEn: "What direct physiological correlation did Daniel Kahneman observe between increasing cognitive effort and somatic markers?",
          optionsAr: [
            "انخفاض حاد في نبضات القلب وانقباض متزايد في مجاري التنفس والبلع.",
            "اتساع واضح في حدقة العين مع ارتفاع نسبي لضربات القلب متناسب طردياً مع صعوبة المسألة المعالجة بالذهن.",
            "تلاشي حاسة البصر المؤقت مع انخفاض درجات حرارة الأطراف بالكامل تهيئة للراحة."
          ],
          optionsEn: [
            "A sharp decrease in heart rate and respiratory constriction.",
            "Somatic markers of mental load: pupil dilation and heart rate spikes, rising in direct proportion to task difficulty.",
            "Temporary optical loss accompanied by complete drop of limb temperature to support sleep."
          ],
          correctIndex: 1,
          explanationAr: "اتساع حدقة العين يمثل المقياس الأمثل والأدق لحظياً لمدى استهلاك خلايا الدماغ لمجهود التفكير الفعال.",
          explanationEn: "Pupil dilation is a highly accurate representation of real-time mental work, measuring cognitive load with extreme precision."
        }
      ]
    },
    {
      id: 'tfs_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: آلية التداعي العفوية ومصيدة اليسر الإدراكي',
      titleEn: 'Chapter 3: The Associative Machine and Cognitive Ease',
      descriptionAr: 'قوة أثر استباق الوعي وتأثير المنظومة السمعية والبصرية على إذابة التشكك المنطقي.',
      descriptionEn: 'The hidden influence of priming effects and how mental smoothness breeds uncritical belief.',
      lessons: [
        {
          id: 'tfs_ch3_l1',
          idNum: 1,
          titleAr: '1. أثر الاستباق (Priming): كيف يوجه وعينا الخفي المحيط الخارجي بصمت؟',
          titleEn: '1. The Priming Nexus: How Concepts Secretly Prepare Our Actions',
          duration: '4m',
          type: 'intro',
          contentAr: `تعمل آلية التداعي في عقلنا كشبكة متصلة تنشط المفردات بصمت غير مرئي. فمجرد عرض كلمة (طعام) أو (موز) يهيئ خلايا المخ لتمييز الكلمات البسيطة ذات الصلة بالفاكهة أو التغذية بشكل أسرع بكثير بمجرد التلميح، مما يوجه خياراتنا وسلوكياتنا دون تبيان واعٍ منا.`,
          contentEn: `The associative machine links concepts automatically below conscious thresholds. Being exposed to a simple concept (like 'eat' or 'banana') primes your brain to recognize and accept subsequent words or behaviors related to food much faster.`
        },
        {
          id: 'tfs_ch3_l2',
          idNum: 2,
          titleAr: '2. اليسر الإدراكي (Cognitive Ease): مصيدة السلاسة وتفكيك الأمان الكاذب',
          titleEn: '2. Cognitive Ease: The Threat of Smooth Processing',
          duration: '3m',
          type: 'core',
          contentAr: `اليسر الإدراكي هو الحالة التي يستشعر فيها الدماغ سلاسة تدفق البيانات والشعور بالأمان، مما يقوده لتقليل الرقابة النقدية وتصديق الادعاءات لمجرد تكرارها أو تجميلها البصري. وعلى العكس، فإن الجهد المعرفي والخط الصعب يثير التشكك البناء ويوقظ دفاعات النظام 2 الحذرة.`,
          contentEn: `Cognitive Ease is a cerebral state where processing is smooth and frictionless, breeding comfort and familiarity. This causes System 2 to drop its analytical shields, blindly accepting repetitive statements or visual layouts.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يؤثر 'اليسر الإدراكي' (Cognitive Ease) على قابلية الإنسان لتصديق المعلومات والافتراضات دون مراجعة فاحصة؟",
          questionEn: "How does 'Cognitive Ease' influence a person's cognitive susceptibility to believe statements without verification?",
          optionsAr: [
            "يزيد من الشك الغريزي ويفعل المنظومات المنطقية العميقة لردع الأكاذيب وسحبها.",
            "يرسل إشارات أمان طمأنينية تجعل الفرد يتقبل المغالطات والأقوال المكررة بنوع من الاسترخاء المعرفي المعيق للحل.",
            "يجبر خلايا الدماغ على الدخول في حالة ركود خاملة تقود للصداع النصفي المزمن."
          ],
          optionsEn: [
            "It heightens baseline skepticism, firing up logical systems to dismantle false statements.",
            "It signals security and casual comfort, leading the mind to accept fallacies and repeated statements without scrutiny.",
            "It locks brain cells in complete dormancy, frequently triggering chronic migraines."
          ],
          correctIndex: 1,
          explanationAr: "يتأثر الدماغ بقلة المقاومة وعلامات السلاسة السمعية، مما يسبب قبول الافتراضات الكاذبة كحقائق بديهية.",
          explanationEn: "The brain mistakes processing comfort for factual certainty, accepting falsehoods simply because they flow smoothly."
        }
      ]
    },
    {
      id: 'tfs_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: آلية القفز إلى النتائج والتسرع في إصدار الأحكام',
      titleEn: 'Chapter 4: Jumping to Conclusions & Making Judgments',
      descriptionAr: 'منهج البخل الفكري وسلوك الاستبدال العفوي للمصطلحات والافتراضات وقت الصراعات.',
      descriptionEn: 'The logic of uncritical shortcuts, the halo effect, and heuristic substitution of difficult parameters.',
      lessons: [
        {
          id: 'tfs_ch4_l1',
          idNum: 1,
          titleAr: '1. قانون WYSIATI: وهم اكتمال الصورة وتجاهل الأدلة الغائبة بالذكاء',
          titleEn: '1. WYSIATI: What You See Is All There Is',
          duration: '4m',
          type: 'intro',
          contentAr: `يسير عقلنا السريع وفق قانون "ما تراه هو كل ما هنالك" (WYSIATI). يصنع النظام 1 قصة منسجمة ومريحة ذهتياً بناءً على شذرات بسيطة من الأدلة المتاحة أمامه، متجاهلاً كلياً غياب البيانات الإحصائية أو وجهات النظر الأخرى المعارضة لبناء الحصافة.`,
          contentEn: `The intuitive system operates under the core heuristic: 'What You See Is All There Is' (WYSIATI). It builds a beautifully structured narrative out of tiny fragments of raw data, filtering out missing context to avoid systemic doubts.`
        },
        {
          id: 'tfs_ch4_l2',
          idNum: 2,
          titleAr: '2. الاستبدال العفوي وأثر الهالة: كيف نتهرب من المعاضل المعقدة؟',
          titleEn: '2. Heuristic Substitution & The Halo Effect',
          duration: '3m',
          type: 'core',
          contentAr: `عندما نجابه أسئلة صعبة معقدة، يقوم العقل لا شعورياً باستبدالها بأسئلة سهلة ومألوفة والإجابة عليها بدلاً منها. يرافق هذا تحيز "أثر الهالة" (Halo Effect) حيث نعمم صفة إيجابية يتيمة لشخص (مثل المظهر والمكانة) لتصنيف كامل شخصيته بغير حجة.`,
          contentEn: `When facing highly complex queries, System 1 replaces them behind the scenes with a simpler heuristic question, answering it without your conscious awareness. This aligns with the Halo effect, which generalizes a single positive trait to direct entire character judgments.`
        }
      ],
      quiz: [
        {
          questionAr: "ماذا يعني مبدأ 'ما تراه هو كل ما هنالك' (WYSIATI) كأحد ركائز تحيز النظام 1؟",
          questionEn: "What does the 'What You See Is All There Is' (WYSIATI) principle signify as a pillar of System 1 bias?",
          optionsAr: [
            "أن البصر البشري يستحوذ على 90٪ من الإدراك الذهني للبيئة المحيطة لتجاوز الوجع.",
            "أن العقل يميل لتأسيس قصة منسجمة منطقياً بناءً على الأدلة المتاحة فقط، متجاهلاً تماماً غياب الحقائق والمعلومات الحيوية الكبرى.",
            "اقتصار الذكاء البشري على النطاقات المرئية للألوان والأطياف في الطبيعة لحمايته."
          ],
          optionsEn: [
            "That visual input consumes over 90% of your operational mental focus across tasks.",
            "That the mind is biased to construct coherent stories out of available pieces of evidence, ignoring empty gaps and missing statistical dimensions.",
            "Restricting human intelligence onto localized visible wavelengths and physical spectrums in nature."
          ],
          correctIndex: 1,
          explanationAr: "يسعى النظام 1 للوصول لقصة خالية من التناقض بسرعة، حتى لو تطلب هذا تشويه أو تجاهل الحقائق الحيوية الغائبة.",
          explanationEn: "System 1 values cognitive consistency over statistical rigor, utilizing only what is actively present to synthesize immediate facts."
        }
      ]
    },
    {
      id: 'tfs_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: الطرق الاستدلالية وقانون الأرقام الصغيرة ووهم الرضوخ',
      titleEn: 'Chapter 5: Heuristics, the Law of Small Numbers, and Anchoring Effects',
      descriptionAr: 'أخطاء القياس الإحصائي في حيازة البيانات وقوة أثر الارتساء وديناميكية التفاوض بالشركات.',
      descriptionEn: 'The danger of small-sample variance and how numerical anchors warp negotiations and valuations.',
      lessons: [
        {
          id: 'tfs_ch5_l1',
          idNum: 1,
          titleAr: '1. قانون الأرقام الصغيرة: أوهام العينات الشاذة بتوجيه استراتيجيات الأعمال',
          titleEn: '1. The Law of Small Numbers: Fallacies in Sample generalisations',
          duration: '4m',
          type: 'intro',
          contentAr: `يميل العوام وشرائح واسعة من الإداريين لإعطاء أوزان عملاقة وصادمة للعينات الصغيرة، معتبرين شذوذ الأرقام بقانون السوق دلالة مستمرة مكررة. إحصائياً، العينات الصغيرة معرضة بشدة للتذبذب والانفلات الشاذ ولا تصلح منهجياً كأسس للأحكام وصناعة الصدارة.`,
          contentEn: `People share a natural tendency to generalize broad truths from sparse samples. Statistically, smaller sample sets are highly vulnerable to volatile standard deviations, rendering them dangerous frameworks for objective evaluations.`
        },
        {
          id: 'tfs_ch5_l2',
          idNum: 2,
          titleAr: '2. أثر الارتساء (Anchoring): شفرة التحكم الرقمية الأولى بجلسات المفاوضات التجارية',
          titleEn: '2. Anchoring Effects: Decoding the Power of Initial Numbers',
          duration: '3m',
          type: 'core',
          contentAr: `يتجسد انحياز الارتساء في تأثير أول رقم يتم الإعلان عنه على كافة تقديراتنا المعاملاتية اللاحقة. عند الدخول بمفاوضة تجارية، فإن مجرد طرح رقم أولي مرتفع (كعقد الاستثمار أو سعر السلعة) يرسى مرساة ذهنية تجبر الخصوم والنقاش على الدوران بظلالها.`,
          contentEn: `Anchoring is a cognitive behavior where first mentions of a number act as a gravity well for all future estimations. Pitching high numbers in commercial sprints forces the entire discussion to revolve closely around that baseline.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف تستعمل الشركات والمفاوضون المحترفون سلاح 'أثر الارتساء' (Anchoring) لتوجيه صفقاتهم؟",
          questionEn: "How do corporate negotiators utilize 'Anchoring' to influence market valuations?",
          optionsAr: [
            "بطرح رقم مغامر مرتفع للغاية في البداية لتسوية الاتفاق حول قيمة تناسب هوامشهم المربحة المخططة بوقار.",
            "بتجنب الإفصاح عن السعر حتى يقدم الطرف الآخر عرضه المالي بالكامل بنقاء.",
            "بالاعتماد الكلي على أسعار الصرف الدولية السائدة بالمنطقة تمثيلاً للحقوق."
          ],
          optionsEn: [
            "By establishing a bold first price target to serve as a mental baseline, forcing subsequent bids to skew in their favor.",
            "By withholding quotes until counterparts fully detail their financial parameters.",
            "By relying strictly on international global exchange indices dynamically."
          ],
          correctIndex: 0,
          explanationAr: "طرح الرقم الأول يحمل قوة ارتساء نفسية تفوق بمراحل تفاوض ردود الفعل المتأخرة، مما يحسم الهوامش الاستراتيجية مبكراً.",
          explanationEn: "Presenting the first figure creates a psychological baseline, warping all future offers in close relationship to it."
        }
      ]
    },
    {
      id: 'tfs_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: سهولة التوفر والمشاعر ومصفوفة تقدير المخاطر والمصائب',
      titleEn: 'Chapter 6: Availability, Affect, and the Risk Estimation Matrix',
      descriptionAr: 'قنص الحقائق الساخنة وتأثير سهولة الاسترجاع الذهني على صياغة التأمين الشخصي.',
      descriptionEn: 'The availability heuristic, memory ease, and emotional bias in risk assessment.',
      lessons: [
        {
          id: 'tfs_ch6_l1',
          idNum: 1,
          titleAr: '1. استدلال التوفر (Availability): عندما تحل سهولة تذكر الحوادث بدلاً من حساب النِسب',
          titleEn: '1. The Availability Heuristic: Frequency Overrated by Memory Ease',
          duration: '4m',
          type: 'intro',
          contentAr: `يقدر العقل نسبة تكرار الكوارث والمخاطر بناءً على سهولة استدعاء عقلنا لأمثلة حية مشابهة. عند وقوع تحطم طائرة تغطيه الشاشات بشكل مستمر، يرتعب المسافرون ويهدرون ميزانياتهم بالتأمين البري الأشد خطورة رياضياً لمجرد طفو لقطات الكارثة بالرأس.`,
          contentEn: `The Availability Heuristic dictates that the brain judges frequency by how easily relevant events can be extracted from memory. After a heavily publicized plane crash, public dread surges, opting for dangerous road trips instead.`
        },
        {
          id: 'tfs_ch6_l2',
          idNum: 2,
          titleAr: '2. استدلال المشاعر (Affect Heuristic): عندما تقرر عواطفنا حجم المنفعة بدلاً من الحساب الإحصائي',
          titleEn: '2. The Affect Heuristic: Emotional Weight Inverting Logical Safety',
          duration: '3m',
          type: 'core',
          contentAr: `في مصفوفة الخطر الباطنة، يقمع الوجدان حساب الأرقام. استدلال المشاعر (Affect Heuristic) يقودك لنسب فوائد مهولة ومخاطر متدنية لخياراتك ومفضلاتك السياسية أو التجارية، ونسب خطر داهم ومنافع تافهة لاستثمارات أو مبادرات خصومك بنسب اعتباطية.`,
          contentEn: `The Affect Heuristic demonstrates that emotional preferences dictate mathematical evaluations. If you favor an option or technology, System 1 automatically discounts its risks and inflates its benefits, and vice-versa.`
        }
      ],
      quiz: [
        {
          questionAr: "وفقاً لطريقة 'التوفر الاستدلالية'، أي من الأحداث يقدّر العوام احتمالية تكراره بمعدلات أعلى من الواقع؟",
          questionEn: "According to the Availability Heuristic, which type of events do people assess as having inflated probabilities?",
          optionsAr: [
            "الأحداث البسيطة والمملة التي تتكرر يومياً بصمت وهدوء بساحات التنمية.",
            "الأحداث النادرة والدرامية والمثيرة للمشاعر التي يتداولها الإعلام بشكل صاخب مؤخراً.",
            "الأحداث التي لم تقع قط في نطاق تاريخ المنطقة الجغرافي تمثيلاً للحقوق."
          ],
          optionsEn: [
            "Monotonous and mundane processes that occur daily across sectors.",
            "Highly dramatic, emotionally charged rare occurrences recently sensationalized by news outlets.",
            "Geographic scenarios that have never occurred in that localized region."
          ],
          correctIndex: 1,
          explanationAr: "سهولة تذكر اللقطات الصاخبة تخدع عقل التوقعات السريع، وتعزز افتراضنا بأن البشاعة أو الفرادة أمر معتاد الحدوث.",
          explanationEn: "Sensational memories are highly retrievable, confusing quick thinkers into treating rare anomalies as highly probable events."
        }
      ]
    },
    {
      id: 'tfs_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: مسألة ليندا، ووهم التخصص، وسوء تقدير احتمالات الإحصاء بالقرارات',
      titleEn: 'Chapter 7: Linda\'s Paradox, Conjunction Fallacy, and Statistical Illusions',
      descriptionAr: 'مغالطة التداخل الإحصائي ومصيدة تطابق الصفات على حساب المعدل المرجعي السائد بالوجود.',
      descriptionEn: 'Deconstructing the conjunction fallacy, representation bias, and base-rate neglect.',
      lessons: [
        {
          id: 'tfs_ch7_l1',
          idNum: 1,
          titleAr: '1. مسألة ليندا النسوية: المغالطة الرياضية التي يقع بها حتى حائزو جوه نوبل',
          titleEn: '1. Linda the Feminist Bank Teller: The Conjunction Fallacy Exposed',
          duration: '4m',
          type: 'intro',
          contentAr: `في تجربة ليندا الشهيرة، وُصفت ليندا بأنها شابة ثائرة ضد القهر والتمييز بجامعتها، وسُئل المشاركون عن الاحتمال الأجدر: هل هي صرافة بنك؟ أم صرافة بنك وناشطة نسوية؟ تفوق خيار التداخل الفئوي بدوافع جمال الصفات متناسين حقيقة الإحصاء البديهية!`,
          contentEn: `In Kahneman's Linda experiment, Linda is described as an outspoken social activist. Asked if it is more likely she is a bank teller, or a bank teller active in feminist causes, most chose the latter, committing a serious conjunction fallacy.`
        },
        {
          id: 'tfs_ch7_l2',
          idNum: 2,
          titleAr: '2. وهم التمثل وإهمال المعدل المرجعي: متى نسقط تفاصيل الصندوق الكلي؟',
          titleEn: '2. Representativeness Bias & Base-Rate Neglect',
          duration: '3m',
          type: 'core',
          contentAr: `التمثل (Representativeness) هو تحيز يدفعنا لربط الأفراد والعينات بأقرب نمط شائع منسجم مع مفاهيمنا السابقة. يسبب هذا إهمالاً فاجعاً ببيئات الاستثمار للمعدل المرجعي (Base Rate)، وهو النسبة الإجمالية السائدة لنجاح أو فشل مثل هذه المشاريع الفنية بالأسواق.`,
          contentEn: `Representativeness causes us to judge probability based on stereotypic descriptions, neglecting base-rate mathematics. We consistently ignore overall statistical metrics of business failure/success in favor of compelling personal narratives.`
        }
      ],
      quiz: [
        {
          questionAr: "لماذا يمثل تفضيل العينة لكون ليندا 'صرافة بنك وبنفس الوقت ناشطة نسوية' مغالطة إحصائية جائرة؟",
          questionEn: "Why does selecting Linda as a bank teller AND activist constitute a severe logical and statistical fallacy?",
          optionsAr: [
            "لعدم وجود نساء عاملات بمهنة الصرافة البنكية في زمن إجراء تلك التجارب الكونية.",
            "لأن احتمال حدوث شرطين مجتمعين معاً (تداخل) مستحيل رياضياً أن يفوق أو يتجاوز احتمال حدوث شرط منفرد واسع النطاق.",
            "لتأثير المغناطيس الوجداني واقتران المغالطة بأساليب تمثيل الأبحاث غير القانونية بالكامل."
          ],
          optionsEn: [
            "Because female banking employment was completely undocumented at the historical time of tests.",
            "Because the probability of two joint parameters (conjunction) can never be greater than the probability of any single constituent.",
            "Because emotional magnets force experimental tools to record illegal statistics."
          ],
          correctIndex: 1,
          explanationAr: "مهما صاغ العقل قصصاً منسجمة، رياضياً تظل إشارة حدوث فئتين متحدتين أصغر أو مساوية بالتأكيد للفئة الكبرى المنفردة.",
          explanationEn: "Mathematically, the likelihood of a conjunction (A + B) is always significantly lower than or equal to its constituent parent (A)."
        }
      ]
    },
    {
      id: 'tfs_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: وهم الفهم والصحة وعلم حدس الخبراء المبرر بالوجود',
      titleEn: 'Chapter 8: The Illusion of Validity, Understanding, and Expert Intuition',
      descriptionAr: 'مغالطة السلوكيات التاريخية التفسيرية بأثر رجعي وشروط حصانة كفاءة الحدس المهني.',
      descriptionEn: 'Retrospective narrative fallacies, the illusion of stock-picking validity, and boundaries of true expertise.',
      lessons: [
        {
          id: 'tfs_ch8_l1',
          idNum: 1,
          titleAr: '1. أزمة التفسير بأثر رجعي: كيف نصنع أوهام السيطرة وفهم أزمات الاقتصاد السابقة؟',
          titleEn: '1. Retrospective Narrative Fallacies & Hindsight Bias',
          duration: '4m',
          type: 'intro',
          contentAr: `يمتلك البشر قصوراً باهراً في فهم العشوائية وسوء تقدير الحظ في توجيه الأحداث الكبرى. ينشئ النظام 1 وهم الفهم عبر حبك قصص هادئة ومقنعة تفسر انهيار البورصات أو فوز المبادرات بأثر رجعي، منتشلاً عقولنا بنوع مضلل من انحياز الإدراك المتأخر (Hindsight Bias).`,
          contentEn: `Humans struggle to accept cosmic randomness, constructing the illusion of understanding via neat cause-and-effect explanations. Hindsight Bias tricks you into believing you 'knew it all along' after market conditions settle.`
        },
        {
          id: 'tfs_ch8_l2',
          idNum: 2,
          titleAr: '2. كسر كبرياء اليد الواثقة: متى وبأي شروط يصبح حدس المستشاري والخبراء جديراً بالإيمان؟',
          titleEn: '2. True Expert Intuition: Predictable Contexts & Tight Feedback Loops',
          duration: '3m',
          type: 'core',
          contentAr: `لا يصنع طول التمرين خبيراً بل طبيعة البيئة وحدها. فك كاهنمان شفرة حدس الخبراء وصنفه كآلية رصد تلقائي لعلامات محفوظة، واشترط شرطين لحصانته: بيئة ذات هيكل ونظام عالي الانتظام والترابط، ومثول وافر ومستمر للخبير ببيئة ردود فعل وتغذية فورية وسريعة بالدائرة.`,
          contentEn: `True expertise depends not on confidence but context. Valid intuitive expertise demands: first, an environments of high-level, predictable rules, and second, an opportunity to learn those traits over rapid, unambiguous feedback.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هي الشروط الجوهرية والبيئية التي حددها دانيال كاهنمان لتكون أحكام وحدس الخبراء قابلة ومستحقة للثقة؟",
          questionEn: "What environmental criteria did Daniel Kahneman define to classify an expert's intuitive judgments as reliable and trust-worthy?",
          optionsAr: [
            "أن يحمل الخبير شهادات أكاديمية متعددة تفوق 3 تخصصات بنظام علمي حازم ومبرهن.",
            "توفر بيئة ذات انتظام تام وقواعد سلوكية متكررة قابلة للتكهن، مع فرصة ممتدة لتلقي ردود وتغذية راجعة سريعة وموثوقة على ممارساته.",
            "أن يتم توظيف الخبير برتبة إدارية عليا لأكثر من عشرين عاماً بالدائرة تمجيداً لخبره."
          ],
          optionsEn: [
            "Acquiring high academic achievements spanning over 3 distinct scientific fields.",
            "An environment of high-level systemic predictability and regular patterns, combined with prolonged practice and near-instant feedback.",
            "Holding high-level bureaucratic administrative positions inside relevant divisions for over two decades."
          ],
          correctIndex: 1,
          explanationAr: "لا تعني الثقة المفرطة لدى الخبير شيئاً في بيئة غير منتظمة أو فاقدة لسرعة التغذية الراجعة كالتوقعات المالية للبورصات الطويلة.",
          explanationEn: "Overconfidence in chaotic, long-term environments (like currency speculation) is a psychological illusion, not valid expertise."
        }
      ]
    },
    {
      id: 'tfs_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: سيكولوجيا الاختيار - نظرية التوقع، أخطاء برنولي وتأثير المنحة',
      titleEn: 'Chapter 9: The Psychology of Choice - Prospect Theory, Bernoulli\'s Errors & Endowment Effect',
      descriptionAr: 'قراءة تفصيلية لكراهية الخسارة البيلوجية ووعاء نظرية التوقعات الثورية وسيكولوجيا الامتلاك.',
      descriptionEn: 'The psychology of wealth decisions, loss aversion dynamics, and the endowment effect bias.',
      lessons: [
        {
          id: 'tfs_ch9_l1',
          idNum: 1,
          titleAr: '1. نظرية التوقع (Prospect Theory): كراهية الخسارة كصمام أمان بيولوجي جائر بصناعة القرار',
          titleEn: '1. Prospect Theory: Why Losses Hurt Twice as Much as Gains',
          duration: '4m',
          type: 'intro',
          contentAr: `فند كاهنمان وتفرسكي افتراض الاستهلاك الرشيد لبرنولي، وصاغا نظرية التوقع الحائزة على نوبل. كشفا أن البشر يزنون المعنويات بنسب مغايرة: فالهلع ومرارة خسارة 500$ يعادل ويعلو نفسياً طموح وفرح مكسب 1000$ بالتمام، مما يخلط آليات الاستثمار ويجبرنا على جمود مفرط.`,
          contentEn: `Kahneman and Tversky introduced Prospect Theory, exposing key gaps in classical utility models. They isolated Loss Aversion: mathematically, the emotional pain of a deficit is roughly twice as intense as the pleasure of an equivalent gain.`
        },
        {
          id: 'tfs_ch9_l2',
          idNum: 2,
          titleAr: '2. تأثير المنحة (Endowment Effect): وهم حيازة الأصول وتكلفة التعلق الممتلك العفوي بالبيع',
          titleEn: '2. The Endowment Effect: How Possession Distorts Fair Value Evaluation',
          duration: '3m',
          type: 'core',
          contentAr: `تأثير المنحة هو الميل اللاواعي لتعظيم القيمة المادية والتسعير للسلع والأدوات بمجرد تملكنا وقبض يدنا عليها. يتوقع البائع دوماً أرقاماً باهظة ومبالغ فيها لعقاره أو أسهمه المجهولة ببساطة لأن ملكيتهم تزاوجت مع نفوذ الأنا لديه، معطلة نزاهة تقدير السوق الحقيقي.`,
          contentEn: `The Endowment Effect is the tendency for people to over-value assets simply because they hold actual ownership of them. Sellers demand inflated prices because parting with possessions is registered by System 1 as a somatic loss.`
        }
      ],
      quiz: [
        {
          questionAr: "وفقاً لمفهوم 'كراهية الخسارة' (Loss Aversion) بنظرية التوقع، كيف يصنف العقل البشري وزن الربح مقابل الخسارة للمبالغ المتطابقة؟",
          questionEn: "Under 'Loss Aversion' dynamics, how does the cognitive system weigh matching gains vs. losses?",
          optionsAr: [
            "ربح الأموال يمنح روعة ولذة تفوق حزن الوجع بمرتين كاملتين لتغذية الروح الصاعدة.",
            "وجع الخسارة يعادل ويفوق نفسياً لذة ربح نفس الميزانية والمقدار بمرتين تقريباً، مما يسبب تجنب تسييس صك الصفقات الجريئة.",
            "العقل يعاملوهما بشكل متماثل ودقيق بقرارات الموازنة المالية بالبنوك تمثيلاً للحقوق."
          ],
          optionsEn: [
            "Gaining capital yields double the gratification of losing it, triggering aggressive risk-seeking parameters.",
            "The threat of a loss is psychologically weighted twice as heavily as an equivalent gain, locking investors in risk-averse stasis.",
            "The brain treats both events symmetrically and rationally in line with financial balance sheets."
          ],
          correctIndex: 1,
          explanationAr: "مقياس العاطفة يميل لحماية الثابت والهروب من ذل الخسارة، جاعلاً ميزان الخسارة ثقيلاً جائراً في توجيه قرارات الاستثمار.",
          explanationEn: "Our biology is loss-averse. System 1 processes a potential loss with massive neurological alarms, restricting boldness."
        }
      ]
    },
    {
      id: 'tfs_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: لغز النفسين - نفس التجربة مقابل نفس التذكر والعيش السعيد الكوني',
      titleEn: 'Chapter 10: The Two Selves Puzzle - Experiencing Self vs. Remembering Self & Satisfying Life',
      descriptionAr: 'قراءة وتفكيك النفس الحية العابرة مقابل النفس الروائية الروتينية وصياغتها لقاعدة الذروة والنهاية.',
      descriptionEn: 'The conflict between active real-time and remembered experience, detailing duration neglect.',
      lessons: [
        {
          id: 'tfs_ch10_l1',
          idNum: 1,
          titleAr: '1. نفس التجربة (Experiencing Self) ونفس التذكر (Remembering Self): صراع المحتوى الفصلي للحياة الحرة',
          titleEn: '1. The Two Selves: Present Experience VS. Memory Scorekeeping',
          duration: '4m',
          type: 'intro',
          contentAr: `يمتلك كل منا ذاتين منفصلتين تماماً: نفس التجربة العابرة الحية التي تميز اللحظات الآنية وتتساءل "هل أتألم الآن؟"، ونفس التذكر الروائية التي تسجل الحصاد وتصيغ قصة الوجود في لقطات وتصنع القرارات المستقبلية بموجب قانون الذاكرة المشوه للزمن بالكامل.`,
          contentEn: `Daniel Kahneman introduced the division of the two selves. The Experiencing Self lives in the raw present ('Does it feel good/bad now?'). The Remembering Self keeps score, crafting historical narrative and driving future choices.`
        },
        {
          id: 'tfs_ch10_l2',
          idNum: 2,
          titleAr: '2. قانون الذروة والنهاية (Peak-End Rule) وتجاهل طول المدة: كيف تخدعنا الذاكرة بصك الأحداث؟',
          titleEn: '2. The Peak-End Rule & Duration Neglect: How Memories Deceive Us',
          duration: '3m',
          type: 'core',
          contentAr: `تتحكم بمشاعر وأحداث التذكر مسارات قاعدة الذروة والنهاية (Peak-End Rule) وإهمال طول المدة (Duration Neglect). يقيم اللاشعور كفاءة أو بؤس التجارب الطويلة بموجب متوسط الوجع أو السعادة عند قمتها الأكثر عنفاً (ذروتها) وعند نفحتها الأخيرة الحاضرة بختامها، مغفلاً تماماً ثواني ودقائق التجربة.`,
          contentEn: `The Remembering Self follows the Peak-End Rule: it evaluates experiences entirely by averaging the most intense moment (peak) and the closing moment (end). The total elapsed time of the ordeal is completely dismissed (Duration Neglect).`
        }
      ],
      quiz: [
        {
          questionAr: "كيف تفسر 'قاعدة الذروة والنهاية' (Peak-End Rule) طريقة تقييم عقل التذكر (Remembering Self) للتجارب والآلام الطويلة؟",
          questionEn: "How does the 'Peak-End Rule' explain how the Remembering Self evaluates long corporate or medical ordeals?",
          optionsAr: [
            "بحساب تكاملي شامل ومتقن لعدد الثواني والدقائق التي استغرقتها الرحلة بالكامل للتسييل.",
            "بتعديل التقييم بناء على متوسط درجة التجربة عاطفياً عند قمتها الأكثر حدة (ذروتها) وفي لحظاتها الأخيرة الختامية، مع تجاهل تام لطول المدة.",
            "بالاعتماد الحصري على رأى الأقران المحيطين وقت المغامرة وصياغتها للحل بالشركات."
          ],
          optionsEn: [
            "By calculating a total, integrated sum of every second and minute of the actual temporal event.",
            "By averaging the subjective intensity of the event at its absolute highest point (peak) and its final moments (end), ignoring chronological duration.",
            "By relying strictly on opinions of surrounding peers present during the experience."
          ],
          correctIndex: 1,
          explanationAr: "لا يسجل الذهن أطوال المدة الطيبة أو السيئة؛ بل يحصر انطباعاته في لقطات البداية والذروة والنهاية ليوجه الخيارات والمخاوف القادمة.",
          explanationEn: "Memory is an editor, not a recorder. It cuts long durations into highly condensed clips of peaking highs, lows, and closing moments."
        }
      ]
    }
  ]
};
