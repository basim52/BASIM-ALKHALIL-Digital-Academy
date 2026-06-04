export interface TeamworkExercise {
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

export const TEAMWORK_EXERCISES: TeamworkExercise[] = [
  {
    "id": "team_001",
    "title_ar": "طباخو العائلة",
    "title_en": "Family Chefs",
    "description_ar": "اختاروا وصفة معاً. أحدكم 'الشيف الرئيسي' (يقرأ الوصفة)، والثاني 'مساعد الشيف' (يجهز المكونات)، والثالث 'منظم المطبخ' (يرتب ويغسل).",
    "skill_focus": "توزيع الأدوار",
    "activity_type": "مشروع طهي جماعي",
    "steps_ar": [
      "اختاروا وصفة سهلة (بيتزا، سلطة، كعكة).",
      "وزعوا الأدوار الثلاثة: شيف، مساعد، منظم.",
      "اعملوا معاً دون تدخل في مهام الآخر.",
      "تناولوا الطبق معاً واحتفوا بإنجازكم الجماعي."
    ],
    "steps_en": [
      "Choose an easy recipe together (pizza, salad, cake).",
      "Assign the three roles: Head Chef, Sous Chef, Kitchen Organizer.",
      "Work together without interfering in each other's tasks.",
      "Eat the dish together and celebrate your collective achievement."
    ],
    "outcome_ar": "تعلم التعاون واحترام دور كل فرد في إنجاز مهمة مشتركة.",
    "emoji": "🍳"
  },
  {
    "id": "team_002",
    "title_ar": "مشروع حديقة العائلة",
    "title_en": "The Family Garden Project",
    "description_ar": "خططوا لزراعة نبتة أو زهرة معاً. أحدكم يحضر الأدوات، الثاني يجهز التربة، الثالث يزرع البذرة، والرابع يسقي. ضعوا جدولاً للري بالتناوب.",
    "skill_focus": "التخطيط والمتابعة المشتركة",
    "activity_type": "مشروع زراعي عائلي",
    "steps_ar": [
      "اختاروا نبتة واحدة تزرعونها (نعناع، ريحان، ورد).",
      "وزعوا المهام: شراء، تجهيز، زراعة، سقي.",
      "ضعوا لوحة 'جدول الري' وعلقوها قرب النبتة.",
      "كل أسبوع، التقطوا صورة للنبتة معاً."
    ],
    "steps_en": [
      "Choose one plant to grow (mint, basil, rose).",
      "Assign tasks: buying, preparing, planting, watering.",
      "Make a 'Watering Schedule' board and hang it near the plant.",
      "Every week, take a photo together with the plant."
    ],
    "outcome_ar": "الاعتناء بشيء حي معاً يعلم الصبر والمسؤولية المشتركة.",
    "emoji": "🌱"
  },
  {
    "id": "team_003",
    "title_ar": "غرفة المعيشة في 15 دقيقة",
    "title_en": "Living Room in 15 Minutes",
    "description_ar": "تحدي تنظيف غرفة المعيشة معاً في 15 دقيقة فقط. شغلوا موسيقى حماسية. كل فرد مسؤول عن زاوية. من ينهي أولاً يساعد الآخر.",
    "skill_focus": "السرعة والتعاون تحت الوقت",
    "activity_type": "تحدي تنظيف",
    "steps_ar": [
      "اضبطوا مؤقت 15 دقيقة. شغلوا أغنية مفضلة.",
      "قسموا الغرفة: كل فرد يأخذ ركناً أو مهمة.",
      "اعملوا بسرعة ومرح. من ينهي مبكراً يساعد غيره.",
      "بعد الجرس، قفوا في المنتصف وصفقوا لأنفسكم."
    ],
    "steps_en": [
      "Set a 15-minute timer. Play a favorite song.",
      "Divide the room: each person takes a corner or task.",
      "Work fast and cheerfully. Whoever finishes early helps others.",
      "When the bell rings, stand in the middle and applaud yourselves."
    ],
    "outcome_ar": "تحويل العمل المنزلي إلى لعبة جماعية ممتعة وسريعة.",
    "emoji": "🧹"
  },
  {
    "id": "team_004",
    "title_ar": "برلمان العائلة",
    "title_en": "The Family Parliament",
    "description_ar": "اجتمعوا مرة في الأسبوع. لكل فرد 3 دقائق لطرح 'قضية' (مشكلة، اقتراح، فكرة). الجميع يستمع. ثم تصوتون على الحلول معاً.",
    "skill_focus": "الحوار الديمقراطي",
    "activity_type": "اجتماع عائلي منظم",
    "steps_ar": [
      "حددوا وقتاً ثابتاً أسبوعياً.",
      "عيّنوا 'رئيس جلسة' يغيرونه كل أسبوع.",
      "كل فرد يطرح موضوعاً واحداً في 3 دقائق دون مقاطعة.",
      "صوتوا على القرارات وعلقوا 'محضر الجلسة' على الثلاجة."
    ],
    "steps_en": [
      "Set a fixed weekly time.",
      "Assign a 'Session Chair' who rotates weekly.",
      "Each person presents one topic in 3 minutes without interruption.",
      "Vote on decisions and hang the 'meeting minutes' on the fridge."
    ],
    "outcome_ar": "تعلم فن الحوار، الاستماع، واتخاذ القرار الجماعي.",
    "emoji": "🏛️"
  },
  {
    "id": "team_005",
    "title_ar": "يوم تبادل الأدوار",
    "title_en": "Role Swap Day",
    "description_ar": "ليوم واحد، تبادلوا الأدوار في البيت. الابن/الابنة يقوم بدور الأب/الأم في مهمة واحدة. والعكس. اكتشفوا صعوبة ومتعة دور الآخر.",
    "skill_focus": "التعاطف وتقدير الآخر",
    "activity_type": "تبادل أدوار",
    "steps_ar": [
      "اختاروا مهمة واحدة فقط للتبادل (إعداد الفطور، ترتيب الجرائد).",
      "الطفل يؤدي مهمة الوالد، والوالد يؤدي مهمة الطفل (مثل ترتيب الألعاب).",
      "بعد ساعة، اجلسوا وتحدثوا: 'ما أصعب شيء في دور الآخر؟'."
    ],
    "steps_en": [
      "Choose only one task to swap (making breakfast, tidying newspapers).",
      "The child does the parent's task, and the parent does the child's task.",
      "After an hour, sit and talk: 'What was the hardest part of the other's role?'."
    ],
    "outcome_ar": "فهم أعمق لتحديات كل فرد في الأسرة وزيادة التقدير المتبادل.",
    "emoji": "🎭"
  },
  {
    "id": "team_006",
    "title_ar": "حائط الذكريات",
    "title_en": "The Memory Wall",
    "description_ar": "كمشروع عائلي، اجمعوا صوركم المفضلة. رتبوها على حائط أو لوح كبير. اكتبوا تعليقات صغيرة بجانب كل صورة. الذكريات تُبنى معاً.",
    "skill_focus": "المشاركة العاطفية",
    "activity_type": "مشروع فني عائلي",
    "steps_ar": [
      "اجمعوا 10 صور عائلية من هواتفكم.",
      "اطبعوها أو ألصقوها على لوح كبير.",
      "كل فرد يكتب تعليقاً أو تاريخاً أو نكتة بجانب الصور.",
      "علقوا اللوح في مكان يراه الجميع يومياً."
    ],
    "steps_en": [
      "Collect 10 family photos from your phones.",
      "Print or stick them on a big board.",
      "Everyone writes a comment, date, or joke next to the photos.",
      "Hang the board where everyone sees it daily."
    ],
    "outcome_ar": "توثيق الحب العائلي بشكل مادي يذكّر الجميع بروابطهم.",
    "emoji": "🖼️"
  },
  {
    "id": "team_007",
    "title_ar": "تحدي الصمت ثم الحل",
    "title_en": "The Silence-Then-Solve Challenge",
    "description_ar": "عند حدوث خلاف، قاعدة: '3 دقائق صمت تام'. ثم يعبر كل فرد عن مشاعره باستخدام جملة الأنا. ثم تطرح 3 حلول وتختارون أفضلها.",
    "skill_focus": "حل الخلافات بذكاء",
    "activity_type": "بروتوكول حل خلاف",
    "steps_ar": [
      "عند الغضب، يقول أحدكم: 'قاعدة الصمت'. 3 دقائق صمت.",
      "بعدها، كل فرد يقول: 'أنا شعرت بـ... عندما...'.",
      "اطرحوا 3 حلول ممكنة. لا تنتقدوا أي حل في البداية.",
      "صوتوا للحل الأفضل وجربوه."
    ],
    "steps_en": [
      "When angry, someone says: 'Silence rule'. 3 minutes of complete silence.",
      "Then, each says: 'I felt... when...'.",
      "Propose 3 possible solutions. Don't criticize any at first.",
      "Vote for the best solution and try it."
    ],
    "outcome_ar": "تحويل الخلاف من معركة إلى ورشة حل مشكلات.",
    "emoji": "🧩"
  },
  {
    "id": "team_008",
    "title_ar": "سلسلة المساعدة",
    "title_en": "The Help Chain",
    "description_ar": "لعبة: شخص يبدأ بعمل خير لآخر في البيت. هذا الشخص يرد الجميل لشخص ثالث. وهكذا تستمر السلسلة. الهدف: 10 أعمال خير في يوم واحد.",
    "skill_focus": "الكرم والمبادرة الجماعية",
    "activity_type": "لعبة عائلية",
    "steps_ar": [
      "ابدأ أنت: افعل شيئاً لطيفاً لأحد أفراد الأسرة.",
      "أخبره: 'الآن دورك أن تفعل شيئاً لشخص آخر في البيت'.",
      "علقوا ورقة على الثلاجة لتسجيل كل عمل خير.",
      "حاولوا الوصول إلى 10 أعمال قبل نهاية اليوم."
    ],
    "steps_en": [
      "You start: do something kind for a family member.",
      "Tell them: 'Now it's your turn to do something for someone else in the house'.",
      "Hang a paper on the fridge to record each good deed.",
      "Try to reach 10 deeds before the day ends."
    ],
    "outcome_ar": "خلق دوامة إيجابية من العطاء داخل المنزل.",
    "emoji": "🤝"
  },
  {
    "id": "team_009",
    "title_ar": "ملعب الأحلام",
    "title_en": "Dream Playground",
    "description_ar": "خططوا معاً لركن ممتع في البيت أو الحديقة. ارسموا التصميم، اجمعوا الأدوات، ابنوا شيئاً بسيطاً معاً (خيمة قراءة، مرجوحة، ركن وسائد).",
    "skill_focus": "الإبداع الجماعي",
    "activity_type": "مشروع بناء",
    "steps_ar": [
      "ارسم تصميم 'الركن الممتع' على ورقة كبيرة معاً.",
      "اجمعوا ما تحتاجونه من المنزل (وسائد، أغطية، حبال).",
      "ابنوا الركن معاً. كل فرد له مهمة.",
      "استمتعوا بالركن الجديد مع كتاب أو لعبة."
    ],
    "steps_en": [
      "Draw the 'fun corner' design on a big paper together.",
      "Collect what you need from home (cushions, blankets, ropes).",
      "Build the corner together. Everyone has a task.",
      "Enjoy the new corner with a book or game."
    ],
    "outcome_ar": "الإبداع المشترك يصنع مساحة ملموسة تجمع الأسرة.",
    "emoji": "⛺"
  },
  {
    "id": "team_010",
    "title_ar": "صندوق الشكر العائلي",
    "title_en": "The Family Gratitude Box",
    "description_ar": "زينوا صندوقاً صغيراً. كل يوم، كل فرد يكتب شيئاً واحداً يشكر فرداً آخر عليه. في نهاية الأسبوع، افتحوا الصندوق واقرأوا الأوراق معاً.",
    "skill_focus": "التقدير المتبادل",
    "activity_type": "طقس عائلي",
    "steps_ar": [
      "زينوا صندوقاً واكتبوا عليه: 'صندوق الشكر'.",
      "ضعوه في مكان مشترك مع أوراق وأقلام بجانبه.",
      "كل مساء، اكتبوا شكراً واحداً لأي فرد.",
      "نهاية الأسبوع، اجتمعوا واقرأوا ما كتب."
    ],
    "steps_en": [
      "Decorate a box and write: 'The Gratitude Box'.",
      "Place it in a common area with papers and pens.",
      "Every evening, write one thanks to any family member.",
      "At week's end, gather and read what was written."
    ],
    "outcome_ar": "اكتشاف كم الأشياء الجميلة التي يفعلها الآخرون ولا نلاحظها.",
    "emoji": "📦"
  },
  {
    "id": "team_011",
    "title_ar": "خريطة المهارات العائلية",
    "title_en": "Family Skills Map",
    "description_ar": "ارسم خريطة للبيت. على كل غرفة، اكتب اسم الشخص 'الخبير' فيها. مثلاً: 'أمي خبيرة المطبخ'، 'أخي خبير الأجهزة'. تعلموا من خبراء بيتكم.",
    "skill_focus": "تقدير الخبرات الفردية",
    "activity_type": "رسم وتخطيط",
    "steps_ar": [
      "ارسم خريطة مبسطة لمنزلكم.",
      "بجانب كل غرفة، اكتب اسم 'الخبير' العائلي فيها.",
      "خططوا 'لجلسة تعليم' حيث يعلم الخبير الباقين مهارة بسيطة.",
      "تبادلوا الأدوار شهرياً."
    ],
    "steps_en": [
      "Draw a simple map of your home.",
      "Next to each room, write the name of the family 'expert' there.",
      "Plan a 'teaching session' where the expert teaches others a simple skill.",
      "Rotate roles monthly."
    ],
    "outcome_ar": "احترام مواهب كل فرد والتعلم من بعضكم البعض.",
    "emoji": "🗺️"
  },
  {
    "id": "team_012",
    "title_ar": "تحدي الميزانية الأسبوعية",
    "title_en": "Weekly Budget Challenge",
    "description_ar": "أعطوا الأبناء ميزانية صغيرة لشراء احتياجات البيت ليوم واحد. خططوا، قارنوا الأسعار، اشتروا، واحسبوا الباقي. من يدخر أكثر يفوز.",
    "skill_focus": "التخطيط المالي الجماعي",
    "activity_type": "محاكاة مالية",
    "steps_ar": [
      "أعلنوا ميزانية رمزية (مثلاً 50 ريالاً).",
      "الأبناء يخططون لقائمة مشتريات ضرورية ليوم واحد.",
      "اذهبوا للتسوق معاً. قارنوا الأسعار وسجلوا كل شيء.",
      "من ينجح في شراء كل الاحتياجات ويتبقى معه أكبر مبلغ، يفوز."
    ],
    "steps_en": [
      "Announce a symbolic budget (e.g., 50 Riyals).",
      "The children plan a shopping list of essentials for one day.",
      "Go shopping together. Compare prices and record everything.",
      "Whoever buys all needs and saves the most, wins."
    ],
    "outcome_ar": "فهم قيمة المال والتخطيط المالي كفريق.",
    "emoji": "💵"
  },
  {
    "id": "team_013",
    "title_ar": "جريدة العائلة الشهرية",
    "title_en": "The Monthly Family Newspaper",
    "description_ar": "أنشئوا 'جريدة' شهرية. أحدكم 'المحرر'، آخر 'المصور'، وآخر 'كاتب الأخبار'. اجمعوا أخبار الشهر، ألصقوا الصور، وزعوها على الجدران.",
    "skill_focus": "العمل الإعلامي الجماعي",
    "activity_type": "مشروع إعلامي",
    "steps_ar": [
      "وزعوا الأدوار: محرر، مصور، كاتب، مصمم.",
      "اجمعوا أحداث الشهر: إنجازات، زيارات، نكت، درجات.",
      "اكتبوها ورتبوها على ورقة كبيرة.",
      "علقوا 'الجريدة' في الممر ليراها الجميع."
    ],
    "steps_en": [
      "Assign roles: Editor, Photographer, Writer, Designer.",
      "Collect the month's events: achievements, visits, jokes, grades.",
      "Write and arrange them on a big paper.",
      "Hang the 'newspaper' in the hallway for all to see."
    ],
    "outcome_ar": "توثيق حياة الأسرة وتحويلها لمحتوى إبداعي مشترك.",
    "emoji": "📰"
  },
  {
    "id": "team_014",
    "title_ar": "لغز البيت الكبير",
    "title_en": "The Big House Puzzle",
    "description_ar": "صمموا 'لعبة بحث عن الكنز' في البيت. شخص يخفي أدلة (ألغاز إنجليزية) والآخرون يبحثون. الجائزة: شيء تشاركونه جميعاً (كعكة، فيلم).",
    "skill_focus": "التعاون في حل المشكلات",
    "activity_type": "لعبة جماعية",
    "steps_ar": [
      "أحدكم يكتب 5 أدلة بالإنجليزية ويخفيها.",
      "كل دليل يقود للدليل التالي.",
      "الآخرون يتعاونون لحل الألغاز والبحث.",
      "الكنز الأخير: علبة فشار لمشاهدة فيلم معاً."
    ],
    "steps_en": [
      "One person writes 5 clues in English and hides them.",
      "Each clue leads to the next.",
      "The others cooperate to solve the riddles and search.",
      "The final treasure: a popcorn box to watch a movie together."
    ],
    "outcome_ar": "التفكير الجماعي لحل المشكلات في جو من المرح والتشويق.",
    "emoji": "🗝️"
  },
  {
    "id": "team_015",
    "title_ar": "يوم بلا تذمر",
    "title_en": "A No-Complaint Day",
    "description_ar": "تحدوا بعضكم: 24 ساعة دون أي تذمر. من يتذمر، يضع ريالاً في 'حصالة التذمر'. في نهاية اليوم، تبرعوا بالمبلغ لشراء شيء للبيت.",
    "skill_focus": "ضبط النفس الجماعي",
    "activity_type": "تحدي عائلي",
    "steps_ar": [
      "ضعوا 'حصالة التذمر' في المنتصف.",
      "القاعدة: أي تذمر = ريال في الحصالة.",
      "ذكّروا بعضكم بلطف عند الخطأ.",
      "في النهاية، افتحوا الحصالة واشتروا شيئاً للبيت جميعاً."
    ],
    "steps_en": [
      "Place a 'Complaint Jar' in the middle.",
      "Rule: any complaint = 1 Riyal in the jar.",
      "Remind each other kindly when someone slips.",
      "At the end, open the jar and buy something for the house together."
    ],
    "outcome_ar": "تحويل الطاقة السلبية إلى مورد إيجابي واستبدال التذمر بالحلول.",
    "emoji": "☀️"
  },
  {
    "id": "team_016",
    "title_ar": "شجرة القرارات",
    "title_en": "The Decision Tree",
    "description_ar": "عند مواجهة قرار عائلي (أين نسافر؟ ماذا نأكل؟)، ارسموا شجرة. الجذع: السؤال. الأغصان: الخيارات. الأوراق: إيجابيات وسلبيات كل خيار. قرروا معاً بناءً على الشجرة.",
    "skill_focus": "اتخاذ القرار الجماعي",
    "activity_type": "أداة تخطيط",
    "steps_ar": [
      "ارسم شجرة كبيرة على سبورة أو ورقة.",
      "اكتب السؤال على الجذع.",
      "كل فرد يضيف خياراً كغصن، ثم أوراق إيجابيات وسلبيات.",
      "صوتوا بناءً على ما ترونه على الشجرة."
    ],
    "steps_en": [
      "Draw a big tree on a board or paper.",
      "Write the question on the trunk.",
      "Everyone adds an option as a branch, then leaves of pros and cons.",
      "Vote based on what you see on the tree."
    ],
    "outcome_ar": "جعل القرارات العائلية موضوعية ومرئية وتشاركية.",
    "emoji": "🌳"
  },
  {
    "id": "team_017",
    "title_ar": "مستشفى الألعاب",
    "title_en": "The Toy Hospital",
    "description_ar": "اجمعوا الألعاب المكسورة أو المهملة. كفريق، 'عالجوها': ألصقوا، خيطوا، لونوا. الهدف ليس الكمال، بل العمل معاً لإعادة الحياة لشيء قديم.",
    "skill_focus": "الإصلاح بدل الرمي",
    "activity_type": "ورشة إصلاح",
    "steps_ar": [
      "اجمعوا 3 ألعاب أو أغراض بحاجة لإصلاح.",
      "جهزوا أدوات بسيطة (غراء، خيط، ألوان).",
      "اعملوا معاً على 'علاج' كل لعبة.",
      "التقطوا صورة 'قبل وبعد' وعلقوها."
    ],
    "steps_en": [
      "Collect 3 toys or items needing repair.",
      "Prepare simple tools (glue, thread, colors).",
      "Work together to 'treat' each toy.",
      "Take a 'before and after' photo and hang it."
    ],
    "outcome_ar": "تعلم قيمة الإصلاح والعمل اليدوي وعدم الاستسلام للاستهلاك.",
    "emoji": "🧸"
  },
  {
    "id": "team_018",
    "title_ar": "أغنية العائلة",
    "title_en": "The Family Song",
    "description_ar": "اكتبوا كلمات أغنية قصيرة لعائلتكم. كل فرد يكتب جملة أو اثنتين بالإنجليزية عن شيء يحبه في العائلة. لحنوها بأي نغمة بسيطة وسجلوها.",
    "skill_focus": "الإبداع الموسيقي الجماعي",
    "activity_type": "مشروع فني",
    "steps_ar": [
      "اختر لحناً بسيطاً تعرفونه جميعاً.",
      "كل فرد يكتب جملة أو اثنتين بالإنجليزية عن عائلتكم.",
      "جمعوا الجمل ورتبوها لتصبح أغنية قصيرة.",
      "غنوها معاً وسجلوها فيديو."
    ],
    "steps_en": [
      "Choose a simple tune you all know.",
      "Everyone writes one or two sentences in English about your family.",
      "Collect the sentences and arrange them into a short song.",
      "Sing it together and record a video."
    ],
    "outcome_ar": "صناعة هوية عائلية إبداعية وذكرى صوتية تدوم.",
    "emoji": "🎶"
  },
  {
    "id": "team_019",
    "title_ar": "تحدي 'افعل الخير وانسَ'",
    "title_en": "Do Good and Forget Challenge",
    "description_ar": "كل فرد يفعل عملاً خيرياً لشخص خارج الأسرة (جار، قريب، غريب) دون أن يخبر أحداً. في نهاية الأسبوع، تحدثوا عن شعوركم فقط دون كشف ما فعلتم.",
    "skill_focus": "العطاء الخالص",
    "activity_type": "تحدي أخلاقي",
    "steps_ar": [
      "اتفقوا على تحدي: 'عمل خير سري هذا الأسبوع'.",
      "كل فرد يخطط لعمل خير صغير لشخص خارج البيت.",
      "لا تخبروا أحداً داخل الأسرة بما فعلتم.",
      "نهاية الأسبوع، شاركوا فقط: 'كيف شعرت وأنت تفعل الخير سراً؟'."
    ],
    "steps_en": [
      "Agree on a challenge: 'A secret good deed this week'.",
      "Everyone plans a small good deed for someone outside the house.",
      "Don't tell anyone in the family what you did.",
      "At week's end, share only: 'How did it feel doing good in secret?'."
    ],
    "outcome_ar": "تعلم أن قيمة العطاء في جوهرو وليس في الاعتراف به.",
    "emoji": "🎁"
  },
  {
    "id": "team_020",
    "title_ar": "ميثاق العائلة",
    "title_en": "The Family Charter",
    "description_ar": "اكتبوا معاً 'دستوراً' للعائلة. 5 قيم تلتزمون بها (الاحترام، الصدق، المرح، المساعدة، الامتنان). كل فرد يوقع. علقوه في مكان مشرف.",
    "skill_focus": "بناء الهوية والقيم المشتركة",
    "activity_type": "مشروع دستوري",
    "steps_ar": [
      "اجتمعوا وناقشوا: 'ما أهم 5 قيم لعائلتنا؟'",
      "اكتبوا كل قيمة مع جملة توضحها.",
      "زينوا 'الميثاق' بشكل جميل.",
      "كل فرد يوقع باسمه. علقوه حيث يراه الجميع."
    ],
    "steps_en": [
      "Gather and discuss: 'What are the 5 most important values for our family?'",
      "Write each value with a clarifying sentence.",
      "Decorate the 'Charter' beautifully.",
      "Everyone signs their name. Hang it where all can see."
    ],
    "outcome_ar": "خلق دستور أخلاقي حي يعيش في قلوب الأسرة قبل الحائط.",
    "emoji": "📜"
  }
];
