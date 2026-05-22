import { BookCourse } from './types';

export const atomicHabitsCourse: BookCourse = {
  id: 'atomic_habits',
  titleAr: 'العادات الذرية: منهج سهل وبسيط لبناء عادات جيدة والتخلص من السيئة',
  titleEn: 'Atomic Habits: Tiny Changes, Remarkable Results',
  authorAr: 'جيمس كلير',
  authorEn: 'James Clear',
  coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
  descriptionAr: 'الدليل العملي الأوسع انتشاراً عالمياً لبناء العادات الطيبة والتخلص من العادات السلبية عبر استغلال القوانين الأربعة لتغيير السلوك البشري بمعدل تراكمي يومي يبلغ 1%، والتخلي عن التركيز التقليدي على الأهداف لصالح بناء أنظمة مبرهنة.',
  descriptionEn: 'The world-renowned practical guide to breaking bad routines and building good habits, utilizing the Four Laws of Behavior Change to harness the power of a 1% daily compound interest, swapping outcome-oriented goals for systematic routines.',
  isLocked: false,
  chapters: [
    {
      id: 'ah_ch1',
      chapterNum: 1,
      titleAr: 'الفصل الأول: القوة المذهلة للعادات الذرية ووادي الإحباط الكامن',
      titleEn: 'Chapter 1: The Surprising Power of Atomic Habits & The Valley of Disappointment',
      descriptionAr: 'فهم كيمياء التغير التراكمي وتفكيك صراعات الأهداف مقابل قوة بناء الأنظمة والهوية الاستراتيجية.',
      descriptionEn: 'Understanding the mathematics of daily compounding interest, breaking down systems vs. goals, and formatting identity.',
      lessons: [
        {
          id: 'ah_ch1_l1',
          idNum: 1,
          titleAr: '1. رياضيات التراكم اليومي (1% أفضل كل يوم): الفوز الصامت بالمستقبل',
          titleEn: '1. The Mathematics of 1% Improvement: Compounding Small Wins',
          duration: '4m',
          type: 'intro',
          contentAr: 'يتجاهل معظم الناس التغييرات الطفيفة لعدم تبيان نتائجها العاجلة بالوجود، لكن تكرار تحسين بسيط بنسبة 1% يومياً لمدة عام كامل يجعل سلوكك أو مهاراتك أفضل بـ 37 مرة مذهلة (37.78)! وعلى النقيض، فإن التراجع الطفيف بنسبة 1% يومياً يدنو بك نحو الصفر المطلق (0.03)، مما يثبت أن عاداتك اليومية هي الفائدة التراكمية لجهدك ونظامك الشخصي.',
          contentEn: 'Small adjustments are easily dismissed because their immediate impact is invisible. However, getting 1% better every day for a full year compounds into making you 37 times better (37.78)! Conversely, declining by 1% daily degrades your performance close to zero (0.03). Habits are the compound interest of self-improvement.'
        },
        {
          id: 'ah_ch1_l2',
          idNum: 2,
          titleAr: '2. وادي الإحباط ومنحنى النتائج المتأخرة: لماذا نتخلى عن عادة ناجحة مبكراً؟',
          titleEn: '2. The Valley of Disappointment: Surviving the Latent Plateau',
          duration: '3m',
          type: 'core',
          contentAr: 'نتوقع عفوياً أن التغيير يسلك مساراً خطياً مستقيماً، لكن التراكم الفعلي للعادات يحتاج وقتاً طويلاً ليخترق "منحنى القدرة الكامنة" (Plateau of Latent Potential). يقع أغلبنا في "وادي الإحباط" حيث يبذل جهداً لأسابيع دون ملموسية لنتائج فورية، متناسيين أن الطاقة المبذولة تُختزن دائماً لتثور وتتبلور الأهداف دفعة واحدة في النهاية.',
          contentEn: 'We intuitively expect progress to be linear, but biological habits store progress on a Latent Plateau. Most people collapse within the \'Valley of Disappointment\', believing their hard work yields no feedback, failing to see that effort is never wasted—it is simply being stored until the compound threshold is crossed.'
        },
        {
          id: 'ah_ch1_l3',
          idNum: 3,
          titleAr: '3. الأنظمة مقابل الأهداف والعادات المرتكزة على الهوية الأعمق للذات',
          titleEn: '3. Systems vs. Goals: Implementing Identity-Based Habits',
          duration: '4m',
          type: 'tips',
          contentAr: 'الأهداف تتعلق بالنتائج المطلوب تحقيقها، أما الأنظمة فتتعلق بالعمليات الروتينية المحققة لتلك الأرقام. الفائزون والخاسرون يمتلكون نفس الأهداف بالتمام، والفارق يتمركز في جودة نظام التشييد وسير المعاملات اليومية. يرافق هذا التركيز على "الهوية"؛ فالتغيير الدائم يبدأ من معتقدك التأسيسي عن ذاتك (أنا كاتب) وليس رغبتك بالنتيجة فقط (أريد كتابة كتاب).',
          contentEn: 'Goals are about the results you want to achieve, while systems are about the process. Winners and losers share the exact same goals; their systems define the variance. Sustainable change is identity-based; you must transition from focusing on what you wish to achieve to who you wish to become.'
        }
      ],
      quiz: [
        {
          questionAr: "رياضياً، في حال قمت بتحسين عاداتك وسلوكياتك بنسبة ضئيلة تبلغ 1% يومياً لمدة عام، كم مرة ستصبح أفضل في النهاية؟",
          questionEn: "Mathematically, if you improve your habits and behavior by a small margin of 1% daily for a full year, how many times better do you become?",
          optionsAr: [
            "حوالي مرتين فقط (2x) نتيجة التعب الطبيعي للمخ.",
            "حوالي 37 مرة أفضل (37x) بفعل التراكم الهندسي المتصاعد.",
            "تنخفض إنتاجيتك بالكامل بفعل الإعياء والتكرار."
          ],
          optionsEn: [
            "About 2 times (2x) due to the biological baseline of thought.",
            "About 37 times better (37.78) driven by compounding returns.",
            "Your production completely crashes due to mental fatigue."
          ],
          correctIndex: 1,
          explanationAr: "تراكم العادات اليومي يشبه تسييل الفائدة المركبة بالمعاملات البنكية؛ تكرار السعير الطفيف يؤول لنمو عملاق بمرور الوقت.",
          explanationEn: "Daily improvements compound geometrically. Small, repetitive micro-gains build massive long-term output."
        }
      ]
    },
    {
      id: 'ah_ch2',
      chapterNum: 2,
      titleAr: 'الفصل الثاني: القانون الأول (اجعلها واضحة) وتصميم البيئة البصرية المعززة',
      titleEn: 'Chapter 2: The 1st Law (Make It Obvious) & Visual Environmental Design',
      descriptionAr: 'قراءة بطاقة رصد العادات وتوجيه الإشارات المرئية بغرض خفض عبء الانتباه وتسهيل القرارات الأوتوماتيكية.',
      descriptionEn: 'The core scorecard architecture and priming your surroundings to trigger smart subconscious loops.',
      lessons: [
        {
          id: 'ah_ch2_l1',
          idNum: 1,
          titleAr: '1. رصد المعاملات اليومية: كيف تصنع بطاقة تسجيل عادات حيادية وبناءة؟',
          titleEn: '1. Awareness First: Formatting Your First Habit Scorecard',
          duration: '3m',
          type: 'intro',
          contentAr: 'تبدأ عملية تشكيل العادات بـ "الوعي المطلق" بالمسار الحسي. استخدم "بطاقة تسجيل العادات" (Habits Scorecard) لكتابة كافة سلوكياتك اليومية الاعتيادية وتقييمها بوضع لافتة (+) للعادات البناءة، و(-) للعادات المستنزفة، و(=) للمحايدة. هذه الأداة لا تهدف للجلد الذاتي، بل لانتزاع الرقابة وحرق مساحات الغياب العقلي.',
          contentEn: 'You cannot optimize a habit without exposing its existence. The Habits Scorecard works by having you list down everything you do from waking up to sleeping, attributing (+, -, or =) to evaluate biological utility, bringing light to autopilot loops.'
        },
        {
          id: 'ah_ch2_l2',
          idNum: 2,
          titleAr: '2. تصميم إشارات محيطك: تقوية حضور محفز المياه، كتب القراءة، وأدوات العمل',
          titleEn: '2. Cue Prominence: Shaping Visual Clues for Better Decisions',
          duration: '4m',
          type: 'core',
          contentAr: 'الإنسان يتلقى الإسهام الأكبر لمحفزاته حساً عبر مخرجات البصر. إذا أردت جعل عادة ما في صدر الأولويات، فعليك بتصميم محيطك بحيث تعجز الأعين عن تجاوز إشارتها (Cue). لتناول المزيد من الخضار وضع أطباق الفاكهة في منتصف الطاولة، ولتدرس الإنجليزية ضع الكتاب مفتوحاً على وسادتك قبل المغامرة باليوم.',
          contentEn: 'Visual clues dominate the human decision tree. Redesign your surroundings so that the cues for positive habits are incredibly obvious and placed in crucial friction-free focal points, forcing your attention stream to cross their path.'
        },
        {
          id: 'ah_ch2_l3',
          idNum: 3,
          titleAr: '3. صياغة نيات التنفيذ وتشييد قناطر الربط الزمنية للبداية الناجحة',
          titleEn: '3. Intentional Contexts: Locking Down the Chronos & Location Rules',
          duration: '3m',
          type: 'tips',
          contentAr: 'الافتقاد ليس بدافع الحافز المفقود، بل بالوضوح الهيكلي لمجال الزمان والمكان. إن صياغة "نية التنفيذ" (Implementation Intention) تحدد مخرجات نجاحك (سأمشي لمدة 15 دقيقة في تمام الساعة 6 مساءً في حديقة الحي)، مما يعفي عقلك من عبء اتخاذ القرار المنهك عند حلول التوقيت.',
          contentEn: 'Most people fail from lack of clarity. Specifying: "I will [BEHAVIOR] at [TIME] in [LOCATION]" resolves the processing latency of procrastination, freeing the brain from deciding when to execute under stress.'
        }
      ],
      quiz: [
        {
          questionAr: "لماذا تنجح فكرة إعادة تشييد أو تصميم البيئة البصرية في تيسير بناء العادات الطيبة؟",
          questionEn: "Why is physical environmental design highly effective for structural behavior changes?",
          optionsAr: [
            "لأنها تزيل الحاجة للتطبيقات السحابية المتقدمة.",
            "لأنها تضع إشارات العادات البناءة مباشرة في خط رؤيتك البصرية، مقللة عبء اتخاذ القرار والدافع الإنساني المقاوم بالصبر.",
            "لأنها تخلو من الدوبامين بشكل كامل وتلقائي."
          ],
          optionsEn: [
            "Because it completely eliminates cloud server requirements.",
            "Because it places habit cues directly in your visual field, reducing the cellular overhead of willpower and decision making.",
            "Because it is naturally devoid of biological dopamine loop models."
          ],
          correctIndex: 1,
          explanationAr: "تسهيل البيئة البصرية يمنح المحفزات الموصى بها صدارة الحضور بالبشرة العصبية البصرية للمخ دون مقاومة.",
          explanationEn: "Lowering behavioral entry barrier via visual cue prominence bypasses complex cognitive willpower filters."
        }
      ]
    },
    {
      id: 'ah_ch3',
      chapterNum: 3,
      titleAr: 'الفصل الثالث: القانون الثاني (اجعلها جذابة) وتأثير الرغبة ومغريات الانتماء',
      titleEn: 'Chapter 2: The 2nd Law (Make It Attractive) & Dopamine Anticipation',
      descriptionAr: 'تطويع خلايا الدوبامين عبر أسلوب تجميع التعقيدات المغرية وقوانين القطيع الاجتماعي والمجتمعات.',
      descriptionEn: 'Farness of dopamine pathways, temptation bundling, and the tribal peer pressure paradigm.',
      lessons: [
        {
          id: 'ah_ch3_l1',
          idNum: 1,
          titleAr: '1. نظام ترقب المكافأة: كيف تثير خلايا الدوبامين لتنفيذ المهام الشاقة؟',
          titleEn: '1. Dopamine Spikes: Leveraging the Anticipation Curve',
          duration: '3m',
          type: 'intro',
          contentAr: 'تثبت التحاليل الفسيولوجية لدماغ الكائنات أن الدوبامين (مادة رصد الرغبة) يُفرز بأعلى معدلاته عند "توقع" المكافأة وصورتها الذهنية، وليس عند "تلقيها" الفعلي بمخرجات الحواس. هذا الترقب هو السعير الحقيقي الروحي لخطوات العمل؛ لذلك ننجح بصياغة الرغبات لتبدو شديدة الجاذبية في مخارج الحوسبة الذهنية.',
          contentEn: 'Neuroscience reveals dopamine spikes dramatically when anticipating a pleasure, rather than actually experiencing it. This drive represents the organic fire for pushing through effort; utilizing this enables you to bind work to attractive anticipation loops.'
        },
        {
          id: 'ah_ch3_l2',
          idNum: 2,
          titleAr: '2. تكنيك تجميع المغريات: ربط رغبتك الجامحة بما هو غاية الأهمية لنموك الأكاديمي',
          titleEn: '2. Temptation Bundling: Injecting High-Probability Pleasure Assets',
          duration: '4m',
          type: 'core',
          contentAr: 'يقوم مفهوم "تجميع المغريات" (Temptation Bundling) على دمج فعل أنت "بحاجة إليه" مع فعل أخر أنت "ترغب فيه" بشدة فطرية. على سبيل المثال: (سأتحقق من إشعارات هاتفي فقط أثناء ممارسة رياضة الجري للتحضير البدني)، مما يقيد المتعة بنيل المستهدف ويروض النفوس.',
          contentEn: "Temptation Bundles merge an action you must take to secure goals with an action you intensely desire. This pairing leverages pre-existing cognitive desires to bolster the adherence rate of hard habits."
        },
        {
          id: 'ah_ch3_l3',
          idNum: 3,
          titleAr: '3. جاذبية الفروع الاجتماعية وقوانين المحيط: كيف تستغل قطيع الأصدقاء؟',
          titleEn: '3. Peer Acculturation: Finding Tribally Shared Baselines',
          duration: '3m',
          type: 'tips',
          contentAr: 'البشر ينتمون فطرياً لقبائلهم ويتوقون للفوز بتقديرها وحيازة الثقة. الممارسة الصحيحة للتغيير ههنا هي بالتواجد وسط مجموعات وبيئة اجتماعية تكون فيها العادة الصالح المطلوب بناؤها هي "سلوكاً شائعاً معيارياً يومياً بالفرع"، مما يجعل روتينك الأكاديمي يبدو بحد ذاته جذاباً وميسوراً لتبتعد عن النبذ والفتور.',
          contentEn: 'Social cohesion is a profound biological force. You must surround yourself with micro-environments and groups where your desired positive habits represent the default social baseline, easing adaptation.'
        }
      ],
      quiz: [
        {
          questionAr: "حسب الفسيولوجيا العقلية، متى يُفرز ناقل الرغبة (الدوبامين) بأعظم تدفقاته الكيميائية داخل مجس الدماغ؟",
          questionEn: "Physiologically, when does the brain experience the highest release of dopamine?",
          optionsAr: [
            "عند قضاء العادة وانصراف المكافأة في الغالب.",
            "عند لحظة الترقب والانتظار وتوقع قفل المكافأة واللذة اللاحقة.",
            "فقط عند نيل الإعياء بعد 4 ساعات من المذاكرة والعمل الشاق."
          ],
          optionsEn: [
            "Immediately upon consuming the reward and post-event rest state.",
            "During the exact moment of anticipation, build-up, and expecting the reward.",
            "Only at the physical point of total exhaustion after 4 hours of strict manual labor."
          ],
          correctIndex: 1,
          explanationAr: "ترقب المتعة واللذة القادمة هو الوقود الذي يدفع البشر للحركة والأفعال وتخطي الحواجز والعقبات الصعبة.",
          explanationEn: "The neurological system builds driving potential on anticipation. It is the craving, not the reward, that generates action."
        }
      ]
    },
    {
      id: 'ah_ch4',
      chapterNum: 4,
      titleAr: 'الفصل الرابع: القانون الثالث (اجعلها سهلة) وتوطيد التكرار والتنفيذ الفعلي',
      titleEn: 'Chapter 4: The 3rd Law (Make It Easy) & Cognitive Overlap Prevention',
      descriptionAr: 'تفكيك الكسل البشري عبر السحن المتوالي للتكرارات وتجاوز أفخاخ الاستعداد اللانهائي لبر الأمان الفعلي.',
      descriptionEn: 'The psychology of repetition, minimizing initial friction, and establishing active motor outputs.',
      lessons: [
        {
          id: 'ah_ch4_l1',
          idNum: 1,
          titleAr: '1. حركة التحضير الأبدي المخطط مقابل الأفعال المباشرة: احفظ عقلك من أفخاخ الهدوء الخادع',
          titleEn: '1. Motion vs. True Action: The Illusion of Productive Planning',
          duration: '3m',
          type: 'intro',
          contentAr: 'هناك فارق رئيسي وصامت بين الـ "الحركة التحضيرية" (Being in Motion) والـ "التنفيذ الفعلي" (Taking Action). الأول رائع للتخطيط والتصميم والطباعة، لكنه حيلة الهروب الفطري الخامل للهروب من قلة الكفاءة والمخاطرة دون جلب نتائج حية بالدماغ. الثاني هو الممارسة البدنية لتصنيع ترابط حاسم وبث العادات.',
          contentEn: "We conflate being 'in motion' (studying catalogs, checking resources, highlighting) with acting. Motion makes us feel like we are making progress without risking failure; Action actually achieves rewiring."
        },
        {
          id: 'ah_ch4_l2',
          idNum: 2,
          titleAr: '2. قانون الجهد البشري الأدنى: كيف توظف المسودات وسهولة الخطوة الأولى لنجاحك؟',
          titleEn: '2. The Path of Least Resistance: Designing Micro Step Boundaries',
          duration: '4m',
          type: 'core',
          contentAr: 'يميل العقل البشري دوماً لتجسيد النشاط ذي التكلفة الحركية والجهد الأدنى فسيولوجياً. لعقد طاقة عاداتنا بشكل مستدام، علينا بتسهيل المسارات أمامها وتقصير المسافات. إذا رغبت بالرسم، ضع الكراسة ومقلمة الألوان مفرودة وجاهزة في مرمى يديك مباشرة لتبدأ دون تكاسل.',
          contentEn: 'Human instinct defaults to the thermodynamic path of least resistance. Simplify execution by priming tools, removing geographic obstacles, and reducing preparation steps to activate frictionless loops.'
        },
        {
          id: 'ah_ch4_l3',
          idNum: 3,
          titleAr: '3. السحر المطلق لقاعدة الدقيقتين: دليلك العملي لكسر جبل التسويف والبدء الفوري',
          titleEn: '3. Under 120 Seconds: Leveraging the Two-Minute Initiation Standard',
          duration: '4m',
          type: 'tips',
          contentAr: 'القاعدة الذهبية تفيد أن أي كبسولة معرفية أو عادة ترغب بمشاركتها يجب تفكيك بوابتها لتأخذ أقل من دقيقتين للعبور والبدء! بدلاً من (سأذاكر لمدة ساعتين بالمنصة) اجعل شعارك (سأفتح واجهة المنصة بالمتصفح فقط)، لأن البدء يستدعي زخماً يبدد الكسل فسيولوجياً.',
          contentEn: 'You cannot optimize a habit that does not actively exist. Scale down the entry ritual of any difficult task to a micro-habit requiring less than two minutes. Once you show up and cross the portal, momentum handles the load.'
        }
      ],
      quiz: [
        {
          questionAr: "ما هو الفارق الجوهري والعملي بين الـ 'Being in motion' والـ 'Taking action' بمجالات نمو الطالب؟",
          questionEn: "What is the key functional difference between 'Being in motion' and 'Taking action'?",
          optionsAr: [
            "العمل المخطط (Motion) مجرد تصفح وقراءة وتدبير تكتيكي لا يولد بناء فيزيائياً للمسارات العصبية، بينما الفعلي (Action) هو الممارسة التجريبية الحركية الدافعة للبناء.",
            "لا يوجد أي فارق، كلاهما يعتمد بشكل كامل على التخزين السحابي الحتمي.",
            "العمل المخطط يحتاج حتماً طاقة دوبامين أكثر بكثير من الفعلي السهل."
          ],
          optionsEn: [
            "Motion comprises strategizing and collecting resources without actual neurological wiring, while True Action is physical practice that structurally shapes habit pathways.",
            "There is absolutely no difference; both are fully bound to programmatic cloud memory structures.",
            "Action is strictly easier for the subconscious to perform while preparing requires higher biological CPU load."
          ],
          correctIndex: 0,
          explanationAr: "التكرار الفعلي للعادات مراراً وتكراراً هو من يصنع الترسبات العصبية الراسخة ويدشن المسارات الممهدة بالبنية الدماغية.",
          explanationEn: "Dynamic muscle and brain motor responses via direct repetition are what construct physical neural pathways, not mere planning."
        }
      ]
    },
    {
      id: 'ah_ch5',
      chapterNum: 5,
      titleAr: 'الفصل الخامس: القانون الرابع (اجعلها مشبعة) وتتبع العوائد اليومية العابرة',
      titleEn: 'Chapter 5: The 4th Law (Make It Satisfying) & Instant Gratification Loops',
      descriptionAr: 'تشييد الفائدة المركبة للعادات وتحقيق قفل الدورة بمتبع عادات مرئي وصارم وممتع بالمخرجات.',
      descriptionEn: 'The core biology of immediate reward patterns, tracking daily streaks, and the Never Miss Twice standard.',
      lessons: [
        {
          id: 'ah_ch5_l1',
          idNum: 1,
          titleAr: '1. لغز عوائد الآجل العابرة: لماذا لا يرى عقل الثدييات فوائد العادات الحسنة مباشرة؟',
          titleEn: '1. Delayed Returns: Overcoming the Bio-Temporal Evolutionary Gap',
          duration: '3m',
          type: 'intro',
          contentAr: 'العقل البشري متأثر وبشدة بتاريخه البيولوجي ومبرمج على التماس الرضا العاجل والفوري، بينما فوائد العادات البناءة (مثل حيازة مهارة المذاكرة والتألق) متأخرة الدفع بالزمن؛ لذا نعالج هذا بربط عادة جيدة بمكافأة حية وفورية تصنع الفرحة.',
          contentEn: "We hold brains optimized for an immediate-return environment, while progress demands working within a delayed-return framework. We must cross this gap by attaching immediate micro-pleasures to target workflows."
        },
        {
          id: 'ah_ch5_l2',
          idNum: 2,
          titleAr: '2. هندسة متتبع العادات: كيف تصنع سجلاً مرئياً يحفز دوبامين الانتصارات اليومية؟',
          titleEn: '2. Gamifying Progress: Rebuilding Visual Streaks to Retain Power',
          duration: '4m',
          type: 'core',
          contentAr: 'متتبع العادات (Habit Tracker) هو المحفز البصري الأقوى عن طريق وضع علامة (X) فورية على لوحة التقويم الجداري عند ممارسة السلوك لمرة واحدة. إن إظهار مسارات الإنجاز ونمو السلسلة يعد بحد ذاته مكافأة مرضية تمنع الفشل والاستسلام.',
          contentEn: 'Habit tracking shifts your mental feedback loop. The physical act of marking a calendar yields an immediate reward, generating pride and cementing the micro-identity of a top performer.'
        },
        {
          id: 'ah_ch5_l3',
          idNum: 3,
          titleAr: '3. القانون الحاسم للحلقات المنهارة: كيف يعيدنا مبدأ "لا تنقطع مرتين" فوراً؟',
          titleEn: '3. Neurological Shielding: Living Within the "Never Miss Twice" Standard',
          duration: '4m',
          type: 'tips',
          contentAr: 'في حال أصابك انشغال أو اعتلال منَع ممارسة عادتك ليوم، استدع "ميثاق الانقطاع الأحادي"؛ لا تنقطع مرتين متتاليتين (Never Miss Twice) بأي حال من الأحوال. اليوم الأول حادثة خارج الحسبان؛ واليوم الثاني هو تفعيل عادة جديدة سيئة ستدمر ترسباتها مسارك التراكمي المكتشف.',
          contentEn: 'Missing a habit once is an isolated accident. Missing it twice in a row represents the active formation of an unwanted bad routine. Re-establish balance immediately to insulate your mental progress.'
        }
      ],
      quiz: [
        {
          questionAr: "كيف نتجاوز فجوة تفضيل العقل للمتعة الفورية على حساب عاداتنا الأكاديمية البعيدة الفائدة؟",
          questionEn: "How do we structurally bridge the evolutionary gap of instantaneous returns?",
          optionsAr: [
            "بالاعتماد على الصبر التام وحذف قنوات الترفيه بالوجود.",
            "بقرن عادة جيدة بمكافأة حسية فورية تسعد الدماغ لحظة الانتهاء من ممارستها.",
            "بإهمال الأهداف وتأجيل المذاكرة للأوقات والامتحانات النهائية."
          ],
          optionsEn: [
            "By relying fully on pure raw willpower and deleting all social interactions.",
            "By immediately capturing the completion of a good habit with an instant artificial micro-gratification.",
            "By removing structural goals entirely and deferring study to test-week limits."
          ],
          correctIndex: 1,
          explanationAr: "تغذية الدماغ الواعي بانتصارات بالمرصد الفوري يحافظ على شهية الاستمرار لأيام وأسابيع طويلة دون ملل.",
          explanationEn: "By aligning evolutionary biology with active targets via intermediate dopamine rewards, the habit maintains momentum."
        }
      ]
    },
    {
      id: 'ah_ch6',
      chapterNum: 6,
      titleAr: 'الفصل السادس: انعكاس القوانين الأولى لهدم العادات السيئة والمدمرة',
      titleEn: 'Chapter 6: Inversion of Behavior Change (Make It Invisible & Make It Unattractive)',
      descriptionAr: 'قمع العادات السلبية بصنع حصون العزل الفولاذية وإبادة المشتتات والتحقق من تفكيك سحر المغريات.',
      descriptionEn: 'Eviscerating negative routines by mastering structural friction, cue destruction, and visual camouflage.',
      lessons: [
        {
          id: 'ah_ch6_l1',
          idNum: 1,
          titleAr: '1. اجعلها غير مرئية (Make It Invisible): محاربة قوة الإشارات الضارة بإزالتها',
          titleEn: '1. Cue Removal: Eliminating Temptations Before They Exhaust Your Willpower',
          duration: '3m',
          type: 'intro',
          contentAr: 'تثبت أبحاث الإرادة أن من يتمتعون بأقوى انضباط ذاتي هم في الحقيقة من يقضون أقل الأوقات في مواجهة المشتتات ويفعلون ذلك بمهارة استبعاد الإشارات. لا تصارع رغبتك بالهاتف المزعج وهو على مكتبك؛ بل اخرجه تماماً من الغرفة واجعله غير مرئي لتنحى بك السكينة.',
          contentEn: 'Willpower is an exhaustible energy buffer. High-willpower individuals do not struggle with persistent temptations—they proactively design habitats that are clear of them, making cues for negative behavior physically invisible.'
        },
        {
          id: 'ah_ch6_l2',
          idNum: 2,
          titleAr: '2. تدمير التوق السيء: كيف تجعل العادة الهدامة غير جذابة وغير محفزة؟',
          titleEn: '2. Reframing Associations: Making Distractions Look Unattractive',
          duration: '4m',
          type: 'core',
          contentAr: 'العادات تنبع من الرغبة بتسكين وتخفيف التوق الحاصل بمجرد رؤية المشتت. لنقمع العادات السيئة، نسلط مجهر التحليل لنقرنها بمخرجات بالغة الإخفاق وعوائق وخيمة؛ أعد صياغة معتقداتك لتصوّر التسويف والتمرير اللانهائي للسوشيال ميديا كسجن وسرقة لعمرك وطموحك الحر بالأكاديمية.',
          contentEn: "We can combat bad habits by highlighting the massive unseen cognitive costs of keeping them in play, consciously linking temporal distractions directly with mental fatigue, loss of focus, and compromised career targets."
        },
        {
          id: 'ah_ch6_l3',
          idNum: 3,
          titleAr: '3. تكنيك الفلترة الصارمة: تصميم الغرفة والأجهزة للتخلص الكلي الفوري من الملهيات',
          titleEn: '3. Digital Camouflage: Restructuring Device Boundaries',
          duration: '4m',
          type: 'tips',
          contentAr: 'إن تصفح اللامجدى يبدأ في لحظات فراغ الانتباه الضعيفة بمراتنا. قم بحذف التطبيقات الأكثر تفاهة من هاتفك أو قفلها ببرمجيات معززة من الصعب معها كسر الصبر، متبعاً انعكاس القانون الأول بدقة ترسيخ العوائق.',
          contentEn: "Prune your application suite. Set severe device boundaries to shield academic blocks from sudden, thoughtless dopamine hunting sessions, forcing you to regain conscious balance."
        }
      ],
      quiz: [
        {
          questionAr: "ما هو أفضل تكتيك يتبعه ممارسو الانضباط الذاتي المتميزون للتخلص الكلي المستمر من مشتتات الهواتف المحمولة أثناء التحصيل العلمي؟",
          questionEn: "What is the most effective tactic high-discipline individuals use to handle smart device distractions?",
          optionsAr: [
            "بوضع الهاتف مباشرة تحت أوراق المذاكرة وتحدي نداء الدوبامين بالصبر والمجالدة.",
            "بالحد التام الفوري من وجود إشاراتها مرئياً (صنع العزلة وإبعاد الجهاز كلياً عن الغرفة) ليتحرر الدماغ من الصراع النفسي.",
            "بالاستسلام والتحجج بصعوبات الإرادة الفطرية بالأكاديمية."
          ],
          optionsEn: [
            "Keeping the phone directly under active worksheets to test raw focus reserves.",
            "Removing the cues entirely from the visual field (e.g., leaving the phone in another room), bypassing continuous internal struggle.",
            "Admitting complete structural defeat due to genetic predispositions."
          ],
          correctIndex: 1,
          explanationAr: "إبعاد مصدر المشتتات والملهيات عن عينيك يقطع الحلقة العصبية في خطوتها الأولى ومبادأتها بالتمام وهي خطوة الإشارة.",
          explanationEn: "Removing biological cues altogether prevents bad routines from entering their primary processing phase."
        }
      ]
    },
    {
      id: 'ah_ch7',
      chapterNum: 7,
      titleAr: 'الفصل السابع: انعكاس القوانين الأخيرة (اجعلها صعبة واجعلها غير مشبعة)',
      titleEn: 'Chapter 7: Inversion of Laws 3 & 4 (Make It Difficult & Make It Unsatisfying)',
      descriptionAr: 'قمع العادات السيئة برص جدران المقاومة، واستغلال المقابس الذكية، وأدوات الحظر لكسر سلاسل الإدمان الاستهلاكي.',
      descriptionEn: 'Weaving operational obstacles and financial contracts around bad behaviors to crash adherence rates.',
      lessons: [
        {
          id: 'ah_ch7_l1',
          idNum: 1,
          titleAr: '1. القانون الثالث بالاتجاه المعاكس (اجعلها صعبة): لغز التكلفة الحركية العالية وسلاسل التكبيل',
          titleEn: '1. Law 3 Inverted (Make It Difficult): Erecting Friction Frontiers',
          duration: '4m',
          type: 'intro',
          contentAr: 'إذا أردت التخلص من عادة استهلاك التلفزيون أو الوجبات السريعة، تدرج برفع العقبات والاحتكاك الفسيولوجي المانع لمريدك. قم بفصل كابل الكهرباء، وضعه في القفل، واطلب من زميل حيازة المفتاح. هذا الكم المنهك من الاحتكاك (Friction) سيجبر عقلك على حرق المقاومة والانصراف عفوياً للبدائل البناءة المهيأة.',
          contentEn: 'To block destructive temptations, multiply the work required to execute them. Unplug power cords, log out of social profiles on all web sessions, and place barriers between yourself and bad habits, shutting down immediate comfort routes.'
        },
        {
          id: 'ah_ch7_l2',
          idNum: 2,
          titleAr: '2. القانون الرابع بالاتجاه المعاكس (اجعلها غير مشبعة): كيف يحمينا الألم والمشاورة المباشرة من السقوط؟',
          titleEn: '2. Law 4 Inverted (Make It Unsatisfying): Coupling Pain and Action Cycles',
          duration: '3m',
          type: 'core',
          contentAr: 'المخ البشري يتفادى بسرعة أي سلوك يورث ألماً عاجلاً أو خسارة بالميزان الفوري. لجعل عاداتك السيئة غير مشبعة بالوجود، أحط خادمك بسلسلة غرامات مالية فورية تفوق لذة الممارسة (مثل دفع 100 ريال غرامة فورية لزميلك عند تمرير الوقت بصفحات المشتتات).',
          contentEn: "Humans naturally avoid actions carrying immediate biological or financial costs. Under this law, you must pair bad triggers with fast discomfort to offset the immediate gratification loop."
        },
        {
          id: 'ah_ch7_l3',
          idNum: 3,
          titleAr: '3. استخدام المقابس الذكية وصمامات الأمان لهندسة السلوك قسرياً بريادة تكنولوجية',
          titleEn: '3. Smart Locks & Tech Restraints: Locking In True Operational Commitments',
          duration: '3m',
          type: 'tips',
          contentAr: 'وظف تقنيات هاتفك المحمول لقفل وتجميد حسابات الترفيه بعد نصف ساعة من الممارسات اليومية، مما يمنع الدماغ من الاستماع لرواية الكسل ويقود التزامك قسرياً نحو النجاح المطلق بالأكاديمية.',
          contentEn: 'Leverage screen blockers and device schedules. Forcing software tools to lock you out of recreational channels acts as a digital commitment device, ensuring you default to focus-centered behaviors.'
        }
      ],
      quiz: [
        {
          questionAr: "كيف يفيد تكثيف الاحتكاك (Friction) في هدم وإبادة العادات السيئة المتمثلة في ضياع الوقت؟",
          questionEn: "How does multiplying friction successfully extinguish bad habits related to time-wasting?",
          optionsAr: [
            "عبر جعل السلوك يتطلب عمليات فسيولوجية وجسدية معقدة ومرهقة وبطيئة للمبادأة، مما يقنع العقل البالبلادة بالتجاوز عنها والتوجه للفوائد الميسرة.",
            "بجعل السلوك عالي السطوع بالبيئة البصرية المحيطة دون مقاومة.",
            "بالتقليل من كلف المشتتات وجعلها رخيصة وحاضرة باليد."
          ],
          optionsEn: [
            "By making the negative behavior require complex, exhausting step-boundaries to initiate, persuading the primitive brain to abandon it in favor of easy default tasks.",
            "By increasing the semantic visibility and cue prominence of distractions around.",
            "By lowering the barrier of access and making temptations highly accessible."
          ],
          correctIndex: 0,
          explanationAr: "العقل فسيولوجياً مبرمج لتتبع الطاقة الأدنى والمسار الأقل مقاومة؛ فإذا كثرت عقبات المشتت، كفّ العقل عن طلبها والتصق بالمتوفر الميسر.",
          explanationEn: "Since biology defaults to conserving metabolic energy, placing tedious friction loops around bad choices naturally dampens craving cycles."
        }
      ]
    },
    {
      id: 'ah_ch8',
      chapterNum: 8,
      titleAr: 'الفصل الثامن: شريك المساءلة السلوكية وعقود ومواثيق الالتزام الصارمة',
      titleEn: 'Chapter 8: The Social Accountability Framework & Commitment Contracts',
      descriptionAr: 'قفل الحلقة الاجتماعية، وبناء مواثيق الالتزام، وتسخير الرقابة التبادلية لمنع السقوط الحركي الصامت.',
      descriptionEn: 'The psychology of peer systems, drafting formal commitment contracts, and selecting your support matrix.',
      lessons: [
        {
          id: 'ah_ch8_l1',
          idNum: 1,
          titleAr: '1. شريك المساءلة (Accountability Partner): كيف يستجيب عقلنا لمراقب خارجي موثوق؟',
          titleEn: '1. The Watcher Effect: Biological Vulnerability to Social Status Loss',
          duration: '3m',
          type: 'intro',
          contentAr: 'نحن نهتم بعناية برؤية الآخرين ونظرتهم لقدراتنا وانضباطنا. إن حيازة "شريك مساءلة" (Accountability Partner) موثق يشاطرك مراجعة أهدافك اليومية يخلق حافزاً هائلاً يدمر المماطلة؛ لأن الخوف من الخجل والاعتراف بالكسل أمام الآخرين أقوى من إغراء الراحة العابرة.',
          contentEn: "We are deeply social animals. Having an Accountability Partner watch your progress leverages our evolutionary dread of local status degradation, injecting powerful motivation to stay consistent with academic objectives."
        },
        {
          id: 'ah_ch8_l2',
          idNum: 2,
          titleAr: '2. ميثاق العادة المكتوب (Habit Contract): صياغة عقوبة مالية أو معنوية تبيد التسويف عفوياً',
          titleEn: '2. The Habit Contract: Coding Strict Penalties Into Your Routines',
          duration: '4m',
          type: 'core',
          contentAr: 'عقد الالتزام (Habit Contract) هو مسودة رسمية مكتوبة وموثقة تقيد سلوكك برادع واضح وقابل للقياس، مثل (سأستيقظ في تمام الساعة 5:30 صباحاً يومياً للمذاكرة، وفي حال تخلفي سأدفع 50 ريالاً كغرامة فورية لشريكي). هذا التحديد الحاسم يحول العواقب المستقبلية إلى ألم فوري جارف.',
          contentEn: "A Habit Contract translates vague self-promises into formal agreements carrying severe, instant, and painful penalties. This immediately rebalances your brain's evolutionary choice matrix in favor of proactive target actions."
        },
        {
          id: 'ah_ch8_l3',
          idNum: 3,
          titleAr: '3. الفرسان الثلاثة: كيف تختار مجموعات الدعم والمساءلة حول المنصة الأكاديمية؟',
          titleEn: '3. Peer Engineering: Picking Your Circle Wisely',
          duration: '3m',
          type: 'tips',
          contentAr: 'أحط خادمك بثلاثة فرسان يمتلكون طموحاً صاعداً ويتمتعون بوعي دراسي ممتاز. تشاركوا لوحات الملاحظة والمتتبعات الأسبوعية وافتخروا بعدد السلاسل الطيبة لتثبيت الهوية الموحدة.',
          contentEn: 'Find study partners who represent your future aspirations. Display schedules, track and celebrate joint streak completions, and let relational contracts solidify a common academic identity.'
        }
      ],
      quiz: [
        {
          questionAr: "كيف يحول ميثاق العادة المكتوب (Habit Contract) الكسل والتسويف إلى طاقة تحصيل علمي مفرزة بالوجود؟",
          questionEn: "How does a Habit Contract successfully bypass the barrier of passive work delay?",
          optionsAr: [
            "بالاعتماد على مذكرات يومية تفصيلية دون معترفات أو غرامات.",
            "بتحويل العواقب البعيدة المدى للعادات السيئة إلى ألم فوري مادي أو معنوي يخافه دماغنا في الوقت الحاضر.",
            "بالحد من أهمية الأهداف تماماً والرضا بالنوم الهادئ."
          ],
          optionsEn: [
            "By relying purely on text journals without penalties or consequences.",
            "By converting vague, long-term costs of failure into immediate, painful financial or social costs experienced in the present moment.",
            "By discarding academic requirements and enabling comfortable sleep models."
          ],
          correctIndex: 1,
          explanationAr: "عندما ترفق العقوبة المالية الفورية أو الخسارة الاجتماعية بالتقصير، يرى عقلك الباطن العمل الشاق أرحم بكثير من كلفة الكسل العاجلة.",
          explanationEn: "Binding immediate discomfort to laziness aligns evolutionary reward systems with modern hard-working expectations."
        }
      ]
    },
    {
      id: 'ah_ch9',
      chapterNum: 9,
      titleAr: 'الفصل التاسع: قاعدة جولديلوكس الساحرة وثنائية الجينات والمثابرة ضد الملل',
      titleEn: 'Chapter 9: The Goldilocks Rule, Genetic Fit & Navigating Habit Boredom',
      descriptionAr: 'معايير إبقاء الشغف متقداً عبر التدرب عند حافة القدرات وتفكيك أكذوبة الدافع المستمر لمكافحة زحف الملل الروتيني.',
      descriptionEn: 'How to practice at the edge of your abilities, aligning biology with targets, and surviving the routine plateau.',
      lessons: [
        {
          id: 'ah_ch9_l1',
          idNum: 1,
          titleAr: '1. قاعدة جولديلوكس (Goldilocks Rule): كيف تعمل وتدرس عند حواف قدراتنا العقلية المثلى؟',
          titleEn: '1. The Goldilocks Rule: Optimal Stimulation on the Border of Chaos',
          duration: '4m',
          type: 'intro',
          contentAr: 'تثبت التحاليل الفسيولوجية أن البشر يختبرون أعلى مستويات التركيز والشغف عند ممارسة مهام ترقد تحديداً عند "حافة قدراتهم الحالية"؛ ليست بالغة السهولة فتورث الملل والبلادة، وليست شديدة التعقيد فتورث التقاعس والقلق. حافظ على مستوى صعوبة للألعاب والمناهج يزيد بنسبة 4% فقط عن منطقتك الميسرة لتسيل طاقتك الإبداعية.',
          contentEn: 'The Goldilocks Rule states humans experience peak motivation when working on tasks that are right on the edge of their current abilities—ideally around 4% beyond their comfortable baseline, maintaining sweet-spot focus streams.'
        },
        {
          id: 'ah_ch9_l2',
          idNum: 2,
          titleAr: '2. معضلة الجينات والموائمة الفطرية: متى نغيّر اللعبة لتتناسب مع تركيبتنا البيولوجية؟',
          titleEn: '2. Genetic Alignment: Selecting Arenas That Reward Your Biological Strengths',
          duration: '3m',
          type: 'core',
          contentAr: 'الجينات والمواهب الموروثة تحدد ساحات القوة والفرص الاستثنائية بوضوح؛ فهي لا تعفيك بأي حال من بذل الجهد الشاق، بل ترشدك وتملي عليك "أين ينبغي أن تصب باجتهادك الخالص". اختر الساحات والمناهج التي تدعم ميولك المعرفية، وإن لم تجد ساحة ملائمة تفوز بها، فاصنع لنفسك تخصصاً يتداخل فيه تميزك الخاص.',
          contentEn: 'Genes do not eliminate the absolute demand for hard work—they show you where to target it. Align your training paths with your native cognitive patterns; if you cannot find a rewarding arena, engineer a custom hybrid niche.'
        },
        {
          id: 'ah_ch9_l3',
          idNum: 3,
          titleAr: '3. سيكولوجية المثابرة ضد التكرار: كيف يتجاوز العباقرة زحف الملل والروتين اليومي؟',
          titleEn: '3. Staying Power: Falling in Love with Boredom to Win Long-Term',
          duration: '4m',
          type: 'tips',
          contentAr: 'التهديد الأكبر لاستمرارنا ليس الفشل والخوف، بل هو "الملل والفتور" المتولد بمجرد تكرار السلسلة اليومية وفقدان بريق البدايات. الفارق الوحيد والقاتل بين المحترف الطموح والهاوي العابر هو قدرة الأول على الوقوف عند مكتبه والنهوض بعمله "حتى عندما تسكن الرغبة ويسود الركام والملل".',
          contentEn: 'The greatest threat to long-term success is not failure, but boredom. Anyone can practice when motivated; elite performers are those who maintain consistency and "fall in love with boredom" when the initial excitement fades away.'
        }
      ],
      quiz: [
        {
          questionAr: "وفقاً لقاعدة جولديلوكس (Goldilocks Rule)، ما هي بيئة المهام المثالية لضمان بقاء تركيز الطالب العلمي متقداً دون تراجع؟",
          questionEn: "Under the Goldilocks Rule, what task difficulty delivers peak cognitive engagement and focus?",
          optionsAr: [
            "المهام بالغة السهولة والتكرار لتوفير تداعي الطاقة العصبية بالجسد.",
            "المهام المتوازنة على حواف وصدر الحدود القصوى لقدراتنا (تزيد 4% عن المعتاد)، متجاوزة ترهل السهولة وعقد التعقيد الصعب.",
            "المهام الأكثر تعقيداً في دكتوراه الفلسفة العقلية مباشرة."
          ],
          optionsEn: [
            "Tasks that are extremely easy to minimize physical brain CPU usage.",
            "Tasks that rest directly on the edge of your limits (about 4% beyond comfortable baseline), balancing ease with a healthy dosage of challenge.",
            "Insanely abstract and complex assignments located far beyond your logical range."
          ],
          correctIndex: 1,
          explanationAr: "العمل عند حافة القدرة يحافظ على تغذية المخ الحسي بمحفزات الترقب وتدفقات مستمرة للإنجاز السلس.",
          explanationEn: "Operational friction balanced beautifully around your limit maintains continuous focus stimulation without anxiety."
        }
      ]
    },
    {
      id: 'ah_ch10',
      chapterNum: 10,
      titleAr: 'الفصل العاشر: وهم التلقائية وتدقيق العادات السنوي وبلوغ مرافيء الإتقان الحر',
      titleEn: 'Chapter 10: The Downside of Habits, Deliberate Practice & Annual Review Audit',
      descriptionAr: 'تفكيك فخ التلقائية والتحجيم العصبي، والتأكد من صيانة مهاراتك بشكل مستدام عبر سجلات التدقيق والملاحظة الصارمة.',
      descriptionEn: 'The pitfalls of automatic habits, blending routines with deliberate study, and running periodic audits.',
      lessons: [
        {
          id: 'ah_ch10_l1',
          idNum: 1,
          titleAr: '1. وهم الإتقان الخادع: كيف تسبب تلقائية العادة تراجع دقة الأداء والملاحظة؟',
          titleEn: '1. The Automaticity Trap: When Comfort Halts Growth',
          duration: '3m',
          type: 'intro',
          contentAr: 'عندما نعتاد تكرار عادة ما لشهور، يتولاها العقل الباطن بشكل أوتوماتيكي ونتوقف عن التفكير والملاحظة الحية للتفاصيل؛ يؤدي هذا لـ "تراجع جودة واتجاه الأداء" بفعل وهم الإتقان وغياب تصحيح الأخطاء. العادات ضرورية للسرعة والرشاقة، لكن الإتقان العبقري يتطلب تجميع "العادات العفوية" بقرنها "بالمراس الصارم الواعي المصحح لخط التقدم".',
          contentEn: "Once a habit becomes automatic, we execute it mindlessly, which can conceal decline in precision. While habits build speed, mastery requires combining systematic routines with conscious, targeted, deliberate practice."
        },
        {
          id: 'ah_ch10_l2',
          idNum: 2,
          titleAr: '2. سجل التدقيق السنوي والتقييم السلوكي (Habit Audit): الصيانة الدورية لصمام هويتك',
          titleEn: '2. The Annual Audit: Maintaining Self-Correction Metrics',
          duration: '4m',
          type: 'core',
          contentAr: 'المحترف لا يدع سفينة عاداته تبحر بلا رصد أو تصحيح مسار. خصص مرة أو مرتين سنوياً للقيام بـ "التدقيق السلوكي والأكاديمي" (Habit Audit) للإجابة الصادقة عن ثلاثة أسئلة: (ما هي قيم ممارساتي الروحية الأساسية؟ كيف أديت عاداتي؟ كيف أحدثت الأخطاء مسار تقهقري؟)، لمعادلة وتصفير ميزان النمو.',
          contentEn: 'Elite leaders run systematic reviews. Dedicate time biannually to execute a formal "Habit Audit" addressing core values, execution efficacy, and hidden errors to accurately realign your systems with targets.'
        },
        {
          id: 'ah_ch10_l3',
          idNum: 3,
          titleAr: '3. التخلص من الهوية المغلقة والتحلي بمرونة الانتماء لترقية حوسبة الذات الصاعدة',
          titleEn: '3. Identity Decoupling: Keeping Core Beliefs Fluid for Future Levels',
          duration: '3m',
          type: 'tips',
          contentAr: 'التمسك المفرط بهوية ضيقة ومحددة (مثلاً: أنا طالب علوم بالمنصة فقط) قد يصنع في عقلك أزمة وجودية وانهياراً نفسياً عند حدوث قفزة انتقالية أو تقلبات بمحيطك. احرص على جعل هويتك وصورة ذاتك مرنة ومستقلة وقابلة للتواؤم مع فصول الحياة المتوالية (أنا باحث مستكشف يعشق التراكم العلمي).',
          contentEn: 'Avoid sticking too tightly to a fragile, narrow identity description. Keep definitions of self fluid and functional. Transitioning from "I am an elite student" to "I am an adaptive lifelong learner" preserves and upgrades ultimate power.'
        }
      ],
      quiz: [
        {
          questionAr: "كيف نتفادى تراجع مهاراتنا العلمية والسلوكية الناتجة عن وهم الإتقان الأوتوماتيكي وتكرار العادة دون وعي؟",
          questionEn: "How do we prevent skill degradation caused by mindless autopilot execution of established habits?",
          optionsAr: [
            "بالحد التام من تكرار المهام والرضا بالمستويات والانجازات الحالية الصامتة.",
            "بدمج عاداتنا التلقائية بمراس صارم وواعٍ ومواكبته بجدائل التدقيق والمراجعة والتقويم السنوي الصادق للأولويات والمسارات.",
            "بالاعتماد على الصدق العاطفي والتمسك بهويات أكاديمية بالغة التمسك والانغلاق الصدري."
          ],
          optionsEn: [
            "By halting repetitive habits altogether to remain stable within comfort zones.",
            "By pairing our automatic routines with deliberate target practice, backed by periodic, honest performance audits and self-correction checks.",
            "By relying strictly on emotional feedback and guarding a rigid, fragile description of self."
          ],
          correctIndex: 1,
          explanationAr: "الإتقان التام يعادل دمج العادات السلسة مع التدريب الدؤوب والتقييم والتدقيق الواعي المصلح للمسار والتوصيل العصبي.",
          explanationEn: "True mastery equals automatic habits combined with deliberate practice, ensuring continuous calibration over time."
        }
      ]
    },
    {
      id: 'ah_ch11',
      chapterNum: 11,
      titleAr: 'الفصل الحادي عشر: قانون المقاومة الأدنى - هندسة الخيارات وتهيؤ البيئة المحيطة',
      titleEn: 'Chapter 11: The Law of Least Friction - Choice Architecture & Environmental Priming',
      descriptionAr: 'تطبيق علوم التصميم البيئي لتسهيل طوع العادات الإيجابية بمقاومة تقارب الصفر وجعل السلبية صعبة للغاية.',
      descriptionEn: 'Structuring physical spaces and interface flows so that positive habits become paths of least resistance, while bad ones require maximum friction.',
      lessons: [
        {
          id: 'ah_ch11_l1',
          idNum: 1,
          titleAr: '1. هندسة الخيارات: كيف توجهك البيئة الفيزيائية دون قرار واعٍ منك؟',
          titleEn: '1. Choice Architecture: Setting Up Cue Dominance in Your Space',
          duration: '3m',
          type: 'core',
          contentAr: `يتصور الناس أن قراراتهم تنبع من داخلهم، لكن معظم العادات تتشكل بناءً على الإشارات الأبرز في البيئة المحيطة. إذا كنت ترغب في شرب المزيد من الماء، ضع زجاجات ممتلئة في كل زاوية من غرفتك. وإذا كنت ترغب في ممارسة الرياضة، جهز ملابسك وحذائك بجانب الفراش ليلاً لتقليل مجهود القرار صباحاً.`,
          contentEn: `We falsely assume our decisions arise from pure willpower. In reality, modern humans behave according to context clues and layout prompts. If you want to drink more water, scatter full jars in your line of sight. Environmental optimization reduces starting friction.`
        },
        {
          id: 'ah_ch11_l2',
          idNum: 2,
          titleAr: '2. إعادة هندسة الاحتكاك: زيادة العقبات أمام العادات التي تود الخلاص منها',
          titleEn: '2. Friction Manipulation: Hardening Obstacles for Destructive Routines',
          duration: '4m',
          type: 'core',
          contentAr: `تريد التقليل من تصفح الشبكات الهدامة أثناء المذاكرة والعمل؟ ضع هاتفك في غرفة أخرى كلياً، أو امنح كلمة مرور برامج الترفيه لصديقك. بزيادة عدد الخطوات اللازمة لممارسة العادة السلبية، يمكنك بسهولة كسرها واستعادة السيطرة الحرة على وقتك وتركيزك.`,
          contentEn: `To drop a toxic habit, increase the friction to execute it. If you browse social networks during deep work, leave your device in a separate room. By adding minor steps of physical labor, you reclaim focus from passive distractions.`
        }
      ],
      quiz: [
        {
          questionAr: "ما هو جوهر مفهوم 'هندسة الخيار والبديل' (Choice Architecture) للتأثير في السلوك البشري؟",
          questionEn: "What is the core premise of Choice Architecture in behavior modification?",
          optionsAr: [
            "ألا نهتم مطلقاً بتفاصيل البيئة أو شكل المكتب وغرف الدراسة.",
            "إعادة ترتيب الفضاء الخارجي والبيئي المحيط لزيادة فاعلية العادات المفيدة وتقليص المجهود اللازم للبدء فيها كلياً.",
            "جعل كل شيء معقداً وصعباً كطريقة وحيدة لإثبات قوة الإرادة الباطنية."
          ],
          optionsEn: [
            "That physical layouts have zero outcome on unconscious behavior.",
            "Re-organizing your physical environment to prime positive triggers while minimizing starting effort.",
            "Making everything complex to test and prove your raw willpower capacity."
          ],
          correctIndex: 1,
          explanationAr: "السياق والبيئة المحيطة هما الصانع المتكتم لمعظم عاداتنا اليومية، لذا غير بيئتك لتغيير مصيرك.",
          explanationEn: "Your surrounding context is the architect of unconscious habits. Design your room to make failure friction-heavy."
        }
      ]
    },
    {
      id: 'ah_ch12',
      chapterNum: 12,
      titleAr: 'الفصل الثاني عشر: قاعدة المعتدل الذهبي (The Goldilocks Rule) - كيف تحافظ على دوافعك في الحياة والعمل؟',
      titleEn: 'Chapter 12: The Goldilocks Rule - Sustaining Peak Motivation & Defeating Boredom',
      descriptionAr: 'البؤرة المثيرة للأداء وتفادي الملل القاتل عبر العمل عند أطراف طاقتك الكامنة بليونة وحافز علمي مرموق.',
      descriptionEn: 'Managing long-term drive by balancing task difficulty, ensuring challenges are neither too hard to break you nor too easy to bore you.',
      lessons: [
        {
          id: 'ah_ch12_l1',
          idNum: 1,
          titleAr: '1. قاعدة المعتدل الذهبي: تحديات ملائمة بدقة لا تنهك العقل ولا تقتله بالرتابة',
          titleEn: '1. The Just-Right Zone: Finding the Peak Inherent Inflow',
          duration: '3m',
          type: 'core',
          contentAr: `يصل الإنسان لذروة التحفيز العصبي والذهني عندما يعمل على مهام تقع "عند حافة قدراته الحالية تماماً"؛ أي ليست بالغة السهولة فتسبب الملل المطبق، وليست بالغة الصعوبة الخارقة فتسبب الذعر والانسحاب السلوكي. كنس القاعدة الذهبية يقترح ممارسة تمارين تزيد بنسبة 4% فقط عن مستواك الحالي لضمان عيش حالة التدفق الحركي الابتكاري التام.`,
          contentEn: `Peak human motivation occurs when working on tasks that sit exactly on the edge of current ability: not too easy to breed complacency, and not too difficult to trigger despair. Targeted challenges keep neuronal flows dynamic.`
        },
        {
          id: 'ah_ch12_l2',
          idNum: 2,
          titleAr: '2. قهر وحل مشكلة الملل: العادات النبيلة والمحترفون الحقيقيون بالصناعة',
          titleEn: '2. The Professional Standard: Falling in Love with Boredom to Build Mastery',
          duration: '3m',
          type: 'tips',
          contentAr: `المشكلة الكبرى في طريق الاتقان ليست الفشل، بل هي "الملل والرتابة المصاحبة للتكرار". يلتزم المحترق ببرنامجه اليومي وتدريباته حتى عندما تكون ثقيلة ومملة، بينما ينسحب الهواة ويبحثون باستمرار عن مشتتات أو برامج جديدة طوال الوقت. العظمة تكمن في قدرتك على مواصلة المسير بصحة وصمت وقرار وقور.`,
          contentEn: `The peak threat to lifelong mastery is not failure; it is boredom. True elite performers stick to their drills even when the freshness wears off and routine set in. Amateurs drift. Mastery is loving the process.`
        }
      ],
      quiz: [
        {
          questionAr: "كيف يمكنك معالجة وحل فخ الملل المستدام أثناء السير نحو طموحاتك المعرفية الممتدة؟",
          questionEn: "How do you conquer the threat of boredom on the long road to professional mastery?",
          optionsAr: [
            "بالبحث الفوري واليومي عن ترفيه ومشتتات جديدة لتبديد الضجر.",
            "بالتحول والتحلي بعقلية المحترف الذي ينفذ المهام المخططة مع ضبط التحدي بنسبة 4% وصناعة معاهدة حب مع الروتين والصمت.",
            "بإلغاء أهدافك بالكلية ومواصلة النوم والانسحاب الكلي من الحلبة الاكاديمية."
          ],
          optionsEn: [
            "By seeking instant digital novelties whenever routine sets in.",
            "By adopting a professional standard that executes plans with 4% difficulty tweaks, while learning to tolerate and love the rhythmic routine.",
            "By dropping all long-term academic targets and resting indefinitely."
          ],
          correctIndex: 1,
          explanationAr: "الحفاظ على الصمود في وجه التكرار هو الفارق اللوني النبيل الذي يصنع عبقرية الكفاءة المبرزة بالأسواق.",
          explanationEn: "Embracing monotonous consistency builds the automatic pathways that solidify superior elite status."
        }
      ]
    }
  ]
};
