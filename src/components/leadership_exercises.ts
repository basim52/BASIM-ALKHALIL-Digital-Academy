export interface LeadershipExercise {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  skill_focus: string;
  activity_type: string;
  steps_ar: string[];
  steps_en: string[];
  outcome_ar: string;
  emoji: string;
}

export const LEADERSHIP_EXERCISES: LeadershipExercise[] = [
  {
    "id": "leader_001",
    "title_ar": "قائدي المهام اليوم",
    "title_en": "My Daily Task Commander",
    "description_ar": "كل صباح، اكتب قائمة بـ 3 مهام تريد إنجازها. رتبها: الأهم أولاً. في المساء، ضع ✓ أمام ما أنجزته. المهام غير المنجزة تنتقل لليوم التالي.",
    "skill_focus": "تحديد الأولويات",
    "activity_type": "تخطيط يومي",
    "steps_ar": [
      "أحضر دفتراً صغيراً وسمِّه 'دفتر القيادة'.",
      "كل صباح، اكتب 3 مهام فقط (لا تزيد).",
      "رتبها: 1 للأهم، 2 للمهم، 3 للعادي.",
      "في المساء، راجع وعلّم بجانب كل مهمة: ✓ تمت، → تأجلت، ✗ ألغيت."
    ],
    "steps_en": [
      "Get a small notebook and name it 'Leadership Log'.",
      "Every morning, write only 3 tasks (no more).",
      "Order them: 1 for most important, 2 for important, 3 for normal.",
      "In the evening, review and mark each: ✓ done, → moved, ✗ cancelled."
    ],
    "outcome_ar": "تعلم فن ترتيب الأولويات بدلاً من الانشغال الدائم.",
    "emoji": "👑"
  },
  {
    "id": "leader_002",
    "title_ar": "تحدي المؤقت 25 دقيقة",
    "title_en": "The 25-Minute Timer Challenge",
    "description_ar": "تقنية بومودورو للشباب: اضبط مؤقتاً على 25 دقيقة. في هذه الفترة، لا شيء موجود إلا المهمة التي أمامك. بعدها، 5 دقائق راحة (حركة، ماء، تنفس).",
    "skill_focus": "التركيز العميق",
    "activity_type": "إدارة الوقت",
    "steps_ar": [
      "اختر مهمة واحدة (مذاكرة، ترتيب، قراءة).",
      "اضبط مؤقت 25 دقيقة. ضع هاتفك بعيداً.",
      "اعمل بتركيز تام حتى يرن الجرس.",
      "كافئ نفسك بـ 5 دقائق من بطاقات 'تحرك وتعلم'."
    ],
    "steps_en": [
      "Choose one task (studying, tidying, reading).",
      "Set a timer for 25 minutes. Put your phone away.",
      "Work with full focus until the bell rings.",
      "Reward yourself with 5 minutes of 'Move & Learn' cards."
    ],
    "outcome_ar": "إنجاز مضاعف في وقت أقل عبر تركيز غير مشتت.",
    "emoji": "⏱️"
  },
  {
    "id": "leader_003",
    "title_ar": "مصفوفة أيزنهاور للناشئة",
    "title_en": "Eisenhower Matrix for Youth",
    "description_ar": "ارسم مربعاً كبيراً وقسمه 4 أجزاء: 1- عاجل ومهم (افعل الآن). 2- مهم غير عاجل (خطط له). 3- عاجل غير مهم (فوضه). 4- غير عاجل وغير مهم (احذفه).",
    "skill_focus": "تصنيف المهام",
    "activity_type": "تخطيط استراتيجي",
    "steps_ar": [
      "ارسم مربعاً كبيراً على ورقة وقسمه لأربعة أرباع.",
      "اكتب كل مهامك في المربع المناسب.",
      "لاحظ: معظم الناجحين يركزون على المربع رقم 2.",
      "علق المصفوفة على الحائط أمام مكتبك."
    ],
    "steps_en": [
      "Draw a big square and divide into four quarters.",
      "Write all your tasks in the right quadrant.",
      "Notice: most successful people focus on quadrant 2.",
      "Hang the matrix on the wall in front of your desk."
    ],
    "outcome_ar": "تمييز المهام المهمة حقاً من الملهيات والعاجل الوهمي.",
    "emoji": "📊"
  },
  {
    "id": "leader_004",
    "title_ar": "المهمة كالوحش",
    "title_en": "The Task as a Monster",
    "description_ar": "ارسم مهمتك الصعبة على شكل وحش مخيف. الآن ارسم نفسك كبطل يواجهه. ما سلاحك؟ (الهدوء، التخطيط، طلب المساعدة).",
    "skill_focus": "التغلب على الخوف من المهام",
    "activity_type": "رسم وتصور",
    "steps_ar": [
      "فكر في مهمة تخيفك أو تماطل فيها.",
      "ارسمها كوحش له أسنان ومخالب.",
      "ارسم نفسك مقابله كبطل. اكتب على درعك: 'أنا قادر'.",
      "في النهاية، اقطع رأس الوحش: أنجز المهمة فعلياً."
    ],
    "steps_en": [
      "Think of a task that scares you or you procrastinate on.",
      "Draw it as a monster with teeth and claws.",
      "Draw yourself as a hero facing it. Write on your shield: 'I am capable'.",
      "Finally, behead the monster: actually do the task."
    ],
    "outcome_ar": "تحويل القلق من المهام إلى شجاعة عبر التصور الإبداعي.",
    "emoji": "👾"
  },
  {
    "id": "leader_005",
    "title_ar": "عقد الـ 5 دقائق",
    "title_en": "The 5-Minute Contract",
    "description_ar": "إذا كنت تماطل في بدء مهمة، قل لنفسك: 'سأعمل عليها 5 دقائق فقط، ثم لي أن أتوقف'. الأغلب ستستمر بعد البداية.",
    "skill_focus": "كسر حاجز التسويف",
    "activity_type": "حيلة نفسية",
    "steps_ar": [
      "ضع مؤقت 5 دقائق.",
      "ابدأ المهمة التي تماطل فيها.",
      "بعد 5 دقائق، اسأل نفسك: 'هل أكمل؟'.",
      "ستجد غالباً أنك دخلت في حالة تدفق وتريد الاستمرار."
    ],
    "steps_en": [
      "Set a timer for 5 minutes.",
      "Start the task you've been avoiding.",
      "After 5 minutes, ask yourself: 'Do I continue?'.",
      "You will often find you've entered a flow state and want to keep going."
    ],
    "outcome_ar": "اكتشاف أن أصعب لحظة هي لحظة البدء فقط.",
    "emoji": "📝"
  },
  {
    "id": "leader_006",
    "title_ar": "مراسيم الإنجاز الصباحية",
    "title_en": "Morning Achievement Ritual",
    "description_ar": "اصنع طقساً صباحياً خاصاً بك: ترتيب السرير فوراً، 10 قفزات، ثم قراءة مهمة اليوم بصوت عالٍ. هذا البرنامج يبرمج عقلك للنجاح.",
    "skill_focus": "بناء روتين إيجابي",
    "activity_type": "طقس يومي",
    "steps_ar": [
      "فور استيقاظك، رتب سريرك (إنجاز أول).",
      "قم بـ 10 قفزات نجمة لتنشيط جسدك.",
      "قف أمام المرآة واقرأ قائمة مهام اليوم بصوت عالٍ.",
      "قل: 'أنا مستعد/ة ليوم عظيم'."
    ],
    "steps_en": [
      "Immediately upon waking, make your bed (first win).",
      "Do 10 jumping jacks to wake up your body.",
      "Stand in front of the mirror and read your task list out loud.",
      "Say: 'I am ready for a great day'."
    ],
    "outcome_ar": "بدء اليوم بإنجاز فوري يبني زخماً إيجابياً لباقي اليوم.",
    "emoji": "🌅"
  },
  {
    "id": "leader_007",
    "title_ar": "درج العادات",
    "title_en": "The Habit Staircase",
    "description_ar": "ارسم درجاً من 7 درجات. في الأسفل، اكتب عادة تريد بناءها. كل يوم تمارسها، ارسم نفسك تصعد درجة. بعد 7 أيام متتالية، تكافأ.",
    "skill_focus": "بناء العادات",
    "activity_type": "تتبع العادات",
    "steps_ar": [
      "ارسم درجاً بـ 7 درجات على لوحة.",
      "في الأسفل، اكتب عادة واحدة تريد اكتسابها (مثلاً: قراءة 10 صفحات).",
      "كل يوم تلتزم بها، لون درجة واصعد.",
      "بعد 7 أيام، احتفل بإنجازك (مشاهدة فيلم، حلوى مفضلة...)."
    ],
    "steps_en": [
      "Draw a 7-step staircase on a board.",
      "At the bottom, write one habit you want to build (e.g., read 10 pages).",
      "Every day you stick to it, color one step and climb.",
      "After 7 days, celebrate (watch a movie, favorite candy...)."
    ],
    "outcome_ar": "بناء عادة إيجابية جديدة في أسبوع واحد بمتعة بصرية.",
    "emoji": "🪜"
  },
  {
    "id": "leader_008",
    "title_ar": "مكتبي مسؤوليتي",
    "title_en": "My Desk, My Responsibility",
    "description_ar": "نظف ورتب مكتبك أو زاوية دراستك بنفسك. تخلص مما لا تحتاجه. ضع كل شيء في مكانه. المساحة المرتبة تصنع عقلاً مرتباً.",
    "skill_focus": "تحمل مسؤولية المساحة الشخصية",
    "activity_type": "تنظيم المكان",
    "steps_ar": [
      "أفرغ مكتبك بالكامل.",
      "امسح الغبار ونظف السطح.",
      "أعد فقط ما تستخدمه يومياً. الباقي في الأدراج أو سلة المهملات.",
      "ضع نبتة صغيرة أو صورة ملهمة."
    ],
    "steps_en": [
      "Empty your desk completely.",
      "Dust and clean the surface.",
      "Put back only what you use daily. The rest in drawers or trash.",
      "Add a small plant or inspiring picture."
    ],
    "outcome_ar": "فهم أن النظام الخارجي يعكس ويؤثر على النظام الداخلي.",
    "emoji": "🧹"
  },
  {
    "id": "leader_009",
    "title_ar": "سفير المهمة",
    "title_en": "Task Ambassador",
    "description_ar": "تطوع بمهمة منزلية لست مسؤولاً عنها اليوم (ترتيب مائدة، مسح الأرض...). افعلها دون أن يطلب منك أحد. راقب شعور الفخر بعدها.",
    "skill_focus": "المبادرة",
    "activity_type": "عمل تطوعي منزلي",
    "steps_ar": [
      "لاحظ مهمة في البيت يقوم بها غيرك عادة.",
      "اذهب وافعلها بهدوء دون إخبار أحد.",
      "لاحظ تعابير الامتنان على وجوه أسرتك.",
      "اكتب في دفترك: 'اليوم بادرت بـ...'."
    ],
    "steps_en": [
      "Notice a household task usually done by someone else.",
      "Go do it quietly without telling anyone.",
      "Observe the gratitude on your family's faces.",
      "Write in your log: 'Today I took initiative by...'."
    ],
    "outcome_ar": "اكتشاف متعة العطاء غير المطلوب وبناء روح المبادرة.",
    "emoji": "🤝"
  },
  {
    "id": "leader_010",
    "title_ar": "يوم بلا شاشة ترفيهية",
    "title_en": "A Day Without Entertainment Screens",
    "description_ar": "تحدَّ نفسك: 24 ساعة بدون يوتيوب، ألعاب، أو تواصل اجتماعي ترفيهي. ماذا ستفعل بدلاً منها؟ اكتشف قدراتك المخفية.",
    "skill_focus": "ضبط النفس",
    "activity_type": "تحدي يوم كامل",
    "steps_ar": [
      "اختر يوماً (مثلاً الجمعة) وأعلنه 'يوم التحدي'.",
      "أغلق كل تطبيقات التسلية. أبقِ التعليمية فقط.",
      "حضر قائمة بديلة: كتاب، رسم، رياضة، طبخ...",
      "في المساء، اكتب: 'ماذا تعلمت عن نفسي اليوم؟'."
    ],
    "steps_en": [
      "Choose a day and declare it 'Challenge Day'.",
      "Close all entertainment apps. Keep only educational ones.",
      "Prepare an alternative list: book, drawing, sport, cooking...",
      "In the evening, write: 'What did I learn about myself today?'."
    ],
    "outcome_ar": "استعادة السيطرة على الوقت واكتشاف اهتمامات جديدة.",
    "emoji": "📵"
  },
  {
    "id": "leader_011",
    "title_ar": "قاعدة الدقيقتين",
    "title_en": "The Two-Minute Rule",
    "description_ar": "إذا استغرقت مهمة دقيقتين أو أقل، افعلها فوراً. لا تؤجلها. (تعليق مفتاحك، سقي النبتة، رد سريع).",
    "skill_focus": "التخلص من تراكم المهام الصغيرة",
    "activity_type": "قاعدة سلوكية",
    "steps_ar": [
      "لاحظ المهام الصغيرة جداً التي تتراكم حولك.",
      "اسأل: 'هل تستغرق أقل من دقيقتين؟'.",
      "إذا كان الجواب نعم، قم بها الآن.",
      "في نهاية اليوم، لاحظ كم مهمة اختفت من قائمتك."
    ],
    "steps_en": [
      "Notice the tiny tasks piling up around you.",
      "Ask: 'Does it take less than two minutes?'.",
      "If yes, do it now.",
      "At day's end, see how many tasks vanished from your list."
    ],
    "outcome_ar": "بيئة نظيفة وذهن صافٍ من المهام الصغيرة المزعجة.",
    "emoji": "⚡"
  },
  {
    "id": "leader_012",
    "title_ar": "خطة الطوارئ الشخصية",
    "title_en": "My Personal Emergency Plan",
    "description_ar": "خطط مسبقاً لما ستفعله إذا شعرت بالإحباط أو التعب. اكتب: 'عندما أشعر بـ... سأفعل...' (مثلاً: سأستمع لأغنيتي المفضلة).",
    "skill_focus": "إدارة المشاعر بشكل استباقي",
    "activity_type": "تخطيط وقائي",
    "steps_ar": [
      "اكتب 3 مشاعر سلبية تواجهها غالباً (ملل، غضب، تعب).",
      "بجانب كل شعور، اكتب 3 حلول سريعة تفعلها.",
      "احفظ الورقة في جيبك أو على مكتبك.",
      "عند الشعور، ارجع للخطة ونفذ أحد الحلول."
    ],
    "steps_en": [
      "Write 3 negative feelings you often face.",
      "Next to each, write 3 quick solutions you can do.",
      "Keep the paper in your pocket or on your desk.",
      "When you feel it, check the plan and do one solution."
    ],
    "outcome_ar": "عدم ترك النفس فريسة للمشاعر السلبية دون خطة إنقاذ.",
    "emoji": "🛡️"
  },
  {
    "id": "leader_013",
    "title_ar": "مراجعة الأسبوع البطل",
    "title_en": "Hero's Weekly Review",
    "description_ar": "كل نهاية أسبوع، اسأل نفسك 3 أسئلة: 1- ما أفضل شيء حققته؟ 2- ما التحدي الأكبر؟ 3- ما الذي سأركز عليه الأسبوع القادم؟",
    "skill_focus": "المراجعة والتخطيط المستقبلي",
    "activity_type": "تأمل أسبوعي",
    "steps_ar": [
      "اجلس في مكان هادئ كل جمعة مساءً.",
      "أحضر دفتر القيادة وأجب عن الأسئلة الثلاثة.",
      "اكتب إنجازاً واحداً تفتخر به هذا الأسبوع.",
      "ضع هدفاً واحداً ذكياً للأسبوع القادم."
    ],
    "steps_en": [
      "Sit in a quiet place every Friday evening.",
      "Bring your Leadership Log and answer the three questions.",
      "Write one achievement you're proud of this week.",
      "Set one smart goal for the coming week."
    ],
    "outcome_ar": "التعلم من الماضي والتخطيط للمستقبل بعقلية النمو.",
    "emoji": "🏁"
  },
  {
    "id": "leader_014",
    "title_ar": "تحدي 'لا للكسل'",
    "title_en": "The 'No to Laziness' Challenge",
    "description_ar": "عندما يخبرك عقلك 'لست مستعداً' أو 'سأفعلها لاحقاً'، تحدّه. قل: 'سأعد حتى 3 وأبدأ'. 1-2-3... انهض فوراً.",
    "skill_focus": "التغلب على الصوت الداخلي المثبط",
    "activity_type": "تحدي ذاتي فوري",
    "steps_ar": [
      "لاحظ اللحظة التي تقول فيها لنفسك 'لاحقاً'.",
      "قف فوراً وقل بصوت عالٍ: '1... 2... 3... انطلاق!'.",
      "تحرك باتجاه المهمة قبل أن يفكر عقلك بالتراجع.",
      "بعد إنجازها، صفق لنفسك بحماس."
    ],
    "steps_en": [
      "Notice the moment you tell yourself 'later'.",
      "Stand up immediately and say aloud: '1... 2... 3... Go!'.",
      "Move towards the task before your brain thinks of retreating.",
      "After finishing, clap for yourself enthusiastically."
    ],
    "outcome_ar": "كسر دورة التسويف برد فعل جسدي فوري.",
    "emoji": "☄️"
  },
  {
    "id": "leader_015",
    "title_ar": "جدار الأولويات",
    "title_en": "The Priority Wall",
    "description_ar": "علق على حائط غرفتك 3 أوراق كبيرة: 'أولويات اليوم'، 'أولويات الأسبوع'، 'أولويات الشهر'. املأها وراجعها يومياً.",
    "skill_focus": "الرؤية الواضحة للأهداف",
    "activity_type": "تنظيم بصري",
    "steps_ar": [
      "جهر 3 أوراق ملونة وعلقها على حائط مرئي.",
      "كل صباح، اكتب على 'اليوم' مهمة أو مهمتين فقط.",
      "كل أحد، جدد 'الأسبوع'. كل بداية شهر، جدد 'الشهر'.",
      "راجعها يومياً لتتذكر بوصلتك."
    ],
    "steps_en": [
      "Prepare 3 colored sheets and hang them visibly.",
      "Every morning, write only 1-2 tasks on 'Today'.",
      "Every Sunday, refresh 'This Week'. Every month start, refresh 'This Month'.",
      "Review daily to remember your compass."
    ],
    "outcome_ar": "عدم التوهان في زحام اليوميات برؤية واضحة ومعلنة.",
    "emoji": "🧗"
  },
  {
    "id": "leader_016",
    "title_ar": "صديق المساءلة",
    "title_en": "The Accountability Buddy",
    "description_ar": "اتفق مع صديق أو أخ: كل مساء ترسلان لبعض 'أنجزت اليوم: 1- 2- 3-'. من لا يرسل 3 أيام متتالية، عليه 'عقاب' (هدية للآخر، تحدي رياضي...).",
    "skill_focus": "المساءلة الاجتماعية",
    "activity_type": "شراكة تحفيزية",
    "steps_ar": [
      "اختر صديقاً ملتزماً واطلب منه أن يكون 'رفيق المساءلة'.",
      "اتفقا على إرسال قائمة الإنجازات اليومية مساءً.",
      "حددا 'تعويضة' ممتعة لمن يخالف 3 أيام.",
      "شجعا بعضكما واحتفلا بالإنجازات الأسبوعية."
    ],
    "steps_en": [
      "Choose a committed friend as your 'accountability buddy'.",
      "Agree to send daily achievement lists every evening.",
      "Set a fun 'forfeit' for whoever misses 3 days.",
      "Encourage each other and celebrate weekly wins."
    ],
    "outcome_ar": "زيادة الالتزام عندما تعرف أن هناك من ينتظر تقريرك.",
    "emoji": "🧑‍🤝‍🧑"
  },
  {
    "id": "leader_017",
    "title_ar": "تقسيم الفيل إلى لقيمات",
    "title_en": "Divide the Elephant into Bites",
    "description_ar": "المهمة الضخمة (تقرير، مشروع، بحث) = فيل. لا يمكنك أكل فيل مرة واحدة. قطعه لقطع صغيرة. اكتب الخطوات الصغيرة وابدأ بأولها فقط.",
    "skill_focus": "تقسيم المهام الضخمة",
    "activity_type": "تخطيط المشاريع",
    "steps_ar": [
      "ارسم فيلاً كبيراً على ورقة.",
      "داخل الفيل، اكتب اسم مشروعك الكبير.",
      "خارج الفيل، اكتب 7 خطوات صغيرة لإنجازه.",
      "ابدأ بالخطوة 1 فقط. لا تفكر في الباقي."
    ],
    "steps_en": [
      "Draw a big elephant on paper.",
      "Inside the elephant, write your big project name.",
      "Outside, write 7 small steps to accomplish it.",
      "Start only step 1. Don't think about the rest."
    ],
    "outcome_ar": "تحويل الرهبة من المشاريع الكبيرة إلى خطة خطوة بخطوة.",
    "emoji": "🐘"
  },
  {
    "id": "leader_018",
    "title_ar": "كرسي القيادة اليومي",
    "title_en": "The Daily Leadership Chair",
    "description_ar": "في العائلة، خصصوا 'كرسي القائد' ليوم واحد. من يجلس عليه يقرر: ماذا سنأكل؟ ما اللعبة؟ ما النشاط؟ يتعلم تحمل مسؤولية القرار.",
    "skill_focus": "اتخاذ القرارات",
    "activity_type": "نشاط عائلي",
    "steps_ar": [
      "ضعوا كرسياً مميزاً وسمّوه 'كرسي القيادة'.",
      "كل يوم، فرد مختلف يجلس عليه.",
      "القائد يقرر 3 أشياء: وجبة، نشاطاً، وقاعدة لليوم.",
      "الجميع يحترم القرارات. القائد يتعلم التوازن بين رغبته ورغبة الآخرين."
    ],
    "steps_en": [
      "Set a special chair and name it 'Leadership Chair'.",
      "Each day, a different person sits on it.",
      "The leader decides 3 things: a meal, an activity, and a rule for the day.",
      "Everyone respects the decisions. The leader learns balance."
    ],
    "outcome_ar": "ممارسة اتخاذ القرارات وتحمل نتائجها في بيئة آمنة.",
    "emoji": "🪑"
  },
  {
    "id": "leader_019",
    "title_ar": "حفل توزيع جوائز الأسبوع",
    "title_en": "Weekly Award Ceremony",
    "description_ar": "مرة في الأسبوع، اجتمعوا كعائلة. كل فرد يمنح 'جائزة' لفرد آخر: 'جائزة المبادرة'، 'جائزة التنظيم'... الهدف تقدير الجهود.",
    "skill_focus": "تقدير الذات والآخرين",
    "activity_type": "احتفال عائلي",
    "steps_ar": [
      "جهروا أوراقاً صغيرة وأقلاماً.",
      "كل فرد يكتب جائزة يمنحها لشخص آخر في العائلة مع سبب.",
      "اقرأوا الجوائز بصوت عالٍ وصفقوا بحرارة.",
      "علقوا 'شهادات التقدير' على لوحة العائلة."
    ],
    "steps_en": [
      "Prepare small papers and pens.",
      "Everyone writes an award to give to another family member with a reason.",
      "Read the awards aloud and applaud warmly.",
      "Hang the 'certificates' on the family board."
    ],
    "outcome_ar": "خلق ثقافة تقدير متبادلة ورؤية الأثر الإيجابي لكل فرد.",
    "emoji": "🏆"
  },
  {
    "id": "leader_020",
    "title_ar": "عقدي مع نفسي",
    "title_en": "My Contract with Myself",
    "description_ar": "اكتب 'عقداً' رسمياً بينك وبين نفسك. تلتزم فيه بعادة أو هدف لمدة 21 يوماً. وقّعه وعلقه حيث تراه كل صباح.",
    "skill_focus": "الالتزام الذاتي",
    "activity_type": "تعهد رسمي",
    "steps_ar": [
      "اكتب على ورقة: 'أنا [اسمك]، أتعهد بأن [العادة] لمدة 21 يوماً'.",
      "أضف سبباً: 'لأنني أريد أن أصبح...'.",
      "وقع الورقة وألصقها على المرآة أو باب الغرفة.",
      "كل صباح، اقرأها بصوت عالٍ."
    ],
    "steps_en": [
      "Write on paper: 'I, [Your Name], commit to [habit] for 21 days'.",
      "Add a reason: 'Because I want to become...'.",
      "Sign it and stick it on your mirror or door.",
      "Every morning, read it out loud."
    ],
    "outcome_ar": "بناء الالتزام الداخلي القوي الذي لا يعتمد على رقابة خارجية.",
    "emoji": "📜"
  }
];
