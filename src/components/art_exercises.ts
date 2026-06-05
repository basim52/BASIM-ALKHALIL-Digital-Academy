export interface ArtExercise {
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

export const ART_EXERCISES: ArtExercise[] = [
  {
    "id": "art_001",
    "title_ar": "اللوحة الناطقة",
    "title_en": "The Talking Painting",
    "description_ar": "اختر لوحة فنية مشهورة (أو أي صورة). تخيل أنك داخل اللوحة. ماذا تسمع؟ ماذا تشم؟ ماذا تشعر؟ اكتب 5 جمل تصف فيها العالم من داخل اللوحة.",
    "skill_focus": "التذوق البصري والتعبير الوصفي",
    "activity_type": "كتابة وصفية",
    "steps_ar": [
      "ابحث عن لوحة فنية تعجبك (في كتاب أو الإنترنت).",
      "تأملها 5 دقائق بصمت تام.",
      "أغمض عينيك وتخيل أنك داخل اللوحة. افتح عينيك واكتب 5 جمل عن 'عالمك' هناك.",
      "اقرأ ما كتبت بصوت عالٍ وكأنك ترشد زائراً في متحف."
    ],
    "steps_en": [
      "Find a painting you like (in a book or online).",
      "Observe it for 5 minutes in complete silence.",
      "Close your eyes and imagine you're inside the painting. Open them and write 5 sentences about 'your world' there.",
      "Read aloud as if guiding a museum visitor."
    ],
    "outcome_ar": "تنمية الحس الجمالي والتعبير الحي عن الصور.",
    "emoji": "🖼️"
  },
  {
    "id": "art_002",
    "title_ar": "قصيدة من وحي الطبيعة",
    "title_en": "A Poem from Nature",
    "description_ar": "اجلس في حديقة أو قرب نافذة. استمع لأصوات الطبيعة. اكتب 4 أسطر شعرية بسيطة (بالعربية أو الإنجليزية) تصف ما تراه وتشعر به.",
    "skill_focus": "كتابة الشعر الحر",
    "activity_type": "تأمل وكتابة شعرية",
    "steps_ar": [
      "اجلس في مكان هادئ قريب من الطبيعة.",
      "أغلق عينيك دقيقتين واستمع فقط.",
      "افتح عينيك واكتب 4 أسطر تبدأ بـ 'أرى...'، 'أسمع...'، 'أشعر...'، 'أتمنى...'.",
      "اقرأ قصيدتك لشجرة أو زهرة."
    ],
    "steps_en": [
      "Sit in a quiet place near nature.",
      "Close your eyes for 2 minutes and just listen.",
      "Open them and write 4 lines starting with 'I see...', 'I hear...', 'I feel...', 'I wish...'.",
      "Read your poem to a tree or flower."
    ],
    "outcome_ar": "التعبير عن المشاعر عبر الشعر البسيط المستوحى من الطبيعة.",
    "emoji": "🍃"
  },
  {
    "id": "art_003",
    "title_ar": "رسالة إلى شخصية",
    "title_en": "A Letter to a Character",
    "description_ar": "اختر شخصية من قصة أو رواية تحبها. اكتب لها رسالة. اسألها، انصحها، أو اشكرها على ما علمتك إياه.",
    "skill_focus": "التفاعل العميق مع النص",
    "activity_type": "كتابة تأملية",
    "steps_ar": [
      "اختر شخصية أثرت فيك.",
      "ابدأ رسالتك: 'عزيزي/عزيزتي [اسم الشخصية]...'.",
      "اكتب 5 جمل: شيئاً تعلمته منها، سؤالاً لها، نصيحة.",
      "احتفظ بالرسالة في كتابك المفضل."
    ],
    "steps_en": [
      "Choose a character that impacted you.",
      "Start: 'Dear [Character Name]...'.",
      "Write 5 sentences: something you learned, a question, advice.",
      "Keep the letter in your favorite book."
    ],
    "outcome_ar": "بناء علاقة شخصية مع الأدب وتحويل القراءة لحوار.",
    "emoji": "✉️"
  },
  {
    "id": "art_004",
    "title_ar": "فن الكلمة الواحدة",
    "title_en": "One-Word Art",
    "description_ar": "اختر كلمة عربية جميلة (مثل: شغف، حنين، ألق). صممها كقطعة فنية: ارسمها بخط جميل، زينها، واكتب تعريفك الخاص لها.",
    "skill_focus": "تذوق جمال المفردات والخط",
    "activity_type": "تصميم فني",
    "steps_ar": [
      "اختر كلمة عربية تشعر أنها قوية أو جميلة.",
      "اكتبها بخط كبير ومزخرف على ورقة.",
      "أضف رسوماً صغيرة تعبر عن معناها.",
      "علقها على حائط غرفتك."
    ],
    "steps_en": [
      "Choose an Arabic word you feel is powerful or beautiful.",
      "Write it in large, decorated letters on paper.",
      "Add small drawings expressing its meaning.",
      "Hang it on your room wall."
    ],
    "outcome_ar": "تنمية الحس الجمالي باللغة العربية وخطوطها.",
    "emoji": "✒️"
  },
  {
    "id": "art_005",
    "title_ar": "قصة من 3 صور",
    "title_en": "A Story in 3 Pictures",
    "description_ar": "بدلاً من كتابة قصة، ارسمها. ارسم 3 صور متسلسلة تروي قصة كاملة (بداية، وسط، نهاية). لا تستخدم أي كلمات.",
    "skill_focus": "السرد البصري",
    "activity_type": "رسم قصصي",
    "steps_ar": [
      "فكر في قصة بسيطة (طفل يزرع بذرة).",
      "ارسمها في 3 مربعات على ورقة واحدة.",
      "تأكد أن القصة مفهومة دون أي كتابة.",
      "اعرضها على أحد واطلب منه أن يحكي لك القصة التي فهمها."
    ],
    "steps_en": [
      "Think of a simple story (a child plants a seed).",
      "Draw it in 3 boxes on one paper.",
      "Ensure the story is understandable without words.",
      "Show it to someone and ask them to tell you the story they understood."
    ],
    "outcome_ar": "إتقان فن السرد البصري والتعبير بدون كلمات.",
    "emoji": "🎨"
  },
  {
    "id": "art_006",
    "title_ar": "الاستعارة الذكية",
    "title_en": "The Clever Metaphor",
    "description_ar": "الاستعارة تقول شيئاً يشبه شيئاً آخر. 'الحياة كالحديقة'. اكتب 5 استعارات من ابتكارك. حول مشاعرك أو أفكارك إلى صور شعرية.",
    "skill_focus": "التفكير الاستعاري",
    "activity_type": "كتابة إبداعية",
    "steps_ar": [
      "فكر في شعور (الفرح، الحزن، الغضب).",
      "اسأل: 'بماذا يشبه هذا الشعور؟'.",
      "اكتب 5 استعارات. مثال: 'الغضب إعصار يبدأ من الصدر'.",
      "شارك أفضلها مع صديق."
    ],
    "steps_en": [
      "Think of a feeling (joy, sadness, anger).",
      "Ask: 'What is this feeling like?'.",
      "Write 5 metaphors. Example: 'Anger is a hurricane starting from the chest'.",
      "Share your best with a friend."
    ],
    "outcome_ar": "إثراء التعبير بالصور الجمالية والاستعارات.",
    "emoji": "💭"
  },
  {
    "id": "art_007",
    "title_ar": "نحت المشاعر",
    "title_en": "Sculpting Feelings",
    "description_ar": "استخدم الصلصال أو الطين أو حتى العجين المنزلي. اصنع شكلاً يعبر عن شعورك الآن. لا تفكر في الجمال، فقط عبر.",
    "skill_focus": "التعبير الفني المجسم",
    "activity_type": "نحت",
    "steps_ar": [
      "جهة مادة تشكيل (صلصال، طين، عجين ملح).",
      "أغلق عينيك واسأل نفسك: 'كيف يبدو شعوري اليوم؟'.",
      "شكل ما يخرج من داخلك دون حكم على شكله.",
      "ضع منحوتتك على مكتبك وتحدث عنها مع العائلة."
    ],
    "steps_en": [
      "Prepare sculpting material.",
      "Close your eyes and ask: 'What does my feeling look like today?'.",
      "Shape whatever comes out without judging.",
      "Place your sculpture on your desk and talk about it with family."
    ],
    "outcome_ar": "تفريغ المشاعر عبر النحت وتجسيدها بشكل ملموس.",
    "emoji": "🏺"
  },
  {
    "id": "art_008",
    "title_ar": "مراجعة فنية صغيرة",
    "title_en": "Little Art Critic",
    "description_ar": "شاهد فيلماً قصيراً أو اقرأ قصة. اكتب 'مراجعة' من 5 جمل: 1- ما أعجبك، 2- ما لم يعجبك، 3- ما تعلمته، 4- لمن تنصح به، 5- تقييم من 5 نجوم.",
    "skill_focus": "النقد الفني",
    "activity_type": "كتابة نقدية",
    "steps_ar": [
      "اختر فيلماً قصيراً أو قصة.",
      "أحضر ورقة وقلماً.",
      "اكتب 5 جمل بالترتيب أعلاه.",
      "شارك مراجعتك مع العائلة أو اكتبها في دفترك."
    ],
    "steps_en": [
      "Choose a short film or story.",
      "Get paper and pen.",
      "Write 5 sentences in the above order.",
      "Share your review with family or write it in your journal."
    ],
    "outcome_ar": "تعلم التعبير عن الرأي الفني بشكل منظم وبناء.",
    "emoji": "🧐"
  },
  {
    "id": "art_009",
    "title_ar": "صوت القصة",
    "title_en": "The Voice of the Story",
    "description_ar": "سجل صوتك وأنت تقرأ قصة قصيرة. جرب تغيير صوتك مع كل شخصية. أضف مؤثرات صوتية بفمك. شارك التسجيل مع أسرتك.",
    "skill_focus": "الأداء الصوتي والتعبير",
    "activity_type": "تسجيل صوتي",
    "steps_ar": [
      "اختر قصة قصيرة (3 فقرات).",
      "تدرب على قراءتها بتعبير.",
      "سجل صوتك وأنت تؤدي كل شخصية بصوت مختلف.",
      "شغل التسجيل في جلسة عائلية."
    ],
    "steps_en": [
      "Choose a short story (3 paragraphs).",
      "Practice reading it expressively.",
      "Record yourself performing each character in a different voice.",
      "Play it at a family gathering."
    ],
    "outcome_ar": "إحياء القصص صوتياً وفهم قوة الأداء في التأثير.",
    "emoji": "🎙️"
  },
  {
    "id": "art_010",
    "title_ar": "صمم غلاف كتاب",
    "title_en": "Design a Book Cover",
    "description_ar": "تخيل أن قصتك المفضلة لم تنشر بعد. صمم لها غلافاً جديداً: ارسم الصورة، اكتب العنوان بخط جميل، وأضف اسمك كمصمم.",
    "skill_focus": "التصميم الجرافيكي الأدبي",
    "activity_type": "تصميم",
    "steps_ar": [
      "اختر قصة تحبها.",
      "ارسم غلافاً جديداً لها على ورقة A4.",
      "اكتب العنوان بخط فني، وأضف جملة تشويقية في الخلف.",
      "ضع الغلاف على كتاب حقيقي وشاهده."
    ],
    "steps_en": [
      "Choose a story you love.",
      "Design a new cover on A4 paper.",
      "Write the title in artistic font, add a tagline on the back.",
      "Place it on a real book and see it."
    ],
    "outcome_ar": "دمج حب القراءة مع الإبداع في التصميم.",
    "emoji": "📔"
  },
  {
    "id": "art_011",
    "title_ar": "اقتباسي الملهم",
    "title_en": "My Inspiring Quote",
    "description_ar": "ابحث عن اقتباس جميل من كتاب أو مقولة. اكتبه بخط يدك على ورق مزخرف. علقه في مكان تراه يومياً.",
    "skill_focus": "تقدير الحكمة المكتوبة",
    "activity_type": "خط وتجميع",
    "steps_ar": [
      "ابحث عن اقتباس يعجبك.",
      "اكتبه ببطء وبخط جميل على ورقة.",
      "زين الورقة برسوم بسيطة.",
      "علقه على المرآة أو الثلاجة."
    ],
    "steps_en": [
      "Find a quote you love.",
      "Write it slowly in beautiful handwriting.",
      "Decorate with simple drawings.",
      "Hang it on the mirror or fridge."
    ],
    "outcome_ar": "التأثر الإيجابي بكلمات الحكماء وجعلها جزءاً من الحياة.",
    "emoji": "💬"
  },
  {
    "id": "art_012",
    "title_ar": "ألوان مشاعري",
    "title_en": "Colors of My Feelings",
    "description_ar": "اختر 3 مشاعر شعرت بها اليوم. خصص لكل شعور لوناً. ارسم لوحة تجريدية (مجرد ألوان وأشكال) تعبر عن يومك العاطفي.",
    "skill_focus": "التعبير اللوني",
    "activity_type": "رسم تجريدي",
    "steps_ar": [
      "اكتب 3 مشاعر شعرت بها اليوم.",
      "اختر لوناً لكل شعور.",
      "ارسم مساحات لونية على ورقة، وامزجها كما اختلطت مشاعرك.",
      "اكتب عنواناً للوحتك."
    ],
    "steps_en": [
      "Write 3 feelings you had today.",
      "Choose a color for each.",
      "Paint color areas on paper, blending as your feelings did.",
      "Title your painting."
    ],
    "outcome_ar": "فهم أن الفن التجريدي يمكنه التعبير عن أعمق المشاعر.",
    "emoji": "🎨"
  },
  {
    "id": "art_013",
    "title_ar": "حوار مع مؤلف",
    "title_en": "Dialogue with an Author",
    "description_ar": "تخيل أنك تقابل كاتب قصتك المفضلة. اكتب 5 أسئلة ستسأله إياها. ثم تخيل إجاباته واكتبها أيضاً.",
    "skill_focus": "التفاعل الخيالي مع المبدعين",
    "activity_type": "كتابة حوار",
    "steps_ar": [
      "اختر كاتباً تحبه.",
      "اكتب 5 أسئلة: 'كيف خطرت لك فكرة...؟'، 'ما أصعب جزء في الكتابة؟'...",
      "تخيل أنه يجيبك. اكتب إجابات محتملة.",
      "شارك الحوار مع أحد والديك."
    ],
    "steps_en": [
      "Choose an author you love.",
      "Write 5 questions: 'How did you get the idea for...?', 'What's the hardest part...?'.",
      "Imagine their answers and write them.",
      "Share the dialogue with a parent."
    ],
    "outcome_ar": "التواصل مع العقول المبدعة وفهم عملية الإبداع.",
    "emoji": "✍️"
  },
  {
    "id": "art_014",
    "title_ar": "فن الكولاج",
    "title_en": "Collage Art",
    "description_ar": "من مجلات قديمة أو أوراق ملونة، قص صوراً وكلمات. ألصقها على لوحة لتصنع 'رسالة فنية' عن شيء تؤمن به.",
    "skill_focus": "فن التركيب",
    "activity_type": "كولاج",
    "steps_ar": [
      "اختر موضوعاً (السلام، الصداقة، الأحلام).",
      "قص صوراً وكلمات من مجلات قديمة.",
      "رتبها على ورقة كبيرة وألصقها.",
      "اكتب عنواناً للوحتك."
    ],
    "steps_en": [
      "Choose a theme (peace, friendship, dreams).",
      "Cut images and words from old magazines.",
      "Arrange and glue on a big paper.",
      "Write a title."
    ],
    "outcome_ar": "إيصال رسالة إيجابية عبر فن القص واللصق.",
    "emoji": "✂️"
  },
  {
    "id": "art_015",
    "title_ar": "وصف الجمال الصامت",
    "title_en": "Describing Silent Beauty",
    "description_ar": "اذهب إلى مكان هادئ. لاحظ شيئاً صغيراً (ورقة شجر، قطرة ماء، غيمة). اكتب 3 جمل تصفه بأكبر قدر من الجمال والدقة.",
    "skill_focus": "التأمل والوصف الدقيق",
    "activity_type": "كتابة وصفية",
    "steps_ar": [
      "اختر شيئاً طبيعياً صغيراً.",
      "تأمله 5 دقائق من كل الزوايا.",
      "اكتب 3 جمل تصف لونه، ملمسه، شكله، رائحته.",
      "اقرأها لشخص واطلب منه تخمين الشيء."
    ],
    "steps_en": [
      "Choose a small natural object.",
      "Observe it for 5 minutes from all angles.",
      "Write 3 sentences describing its color, texture, shape, smell.",
      "Read to someone and have them guess it."
    ],
    "outcome_ar": "تنمية القدرة على ملاحظة الجمال في التفاصيل الصغيرة.",
    "emoji": "🔍"
  },
  {
    "id": "art_016",
    "title_ar": "تمثيل العبرة",
    "title_en": "Acting the Moral",
    "description_ar": "اختر قصة قصيرة ذات عبرة. مثلها مع إخوتك أو أصدقائك في مشهدين. أنت المخرج والممثل.",
    "skill_focus": "التعبير الدرامي",
    "activity_type": "تمثيل",
    "steps_ar": [
      "اختر قصة فيها درس أخلاقي.",
      "وزع الأدوار على أفراد أسرتك.",
      "تدربوا 10 دقائق.",
      "اعرضوا المسرحية القصيرة وصفقوا لأنفسكم."
    ],
    "steps_en": [
      "Choose a story with a moral.",
      "Assign roles to family.",
      "Rehearse 10 minutes.",
      "Perform and applaud yourselves."
    ],
    "outcome_ar": "فهم أن الأدب يمكن أن يتحول إلى حياة على المسرح.",
    "emoji": "🎭"
  },
  {
    "id": "art_017",
    "title_ar": "يوميات فنان",
    "title_en": "An Artist's Diary",
    "description_ar": "ليوم واحد، عش كفنان. سجل كل شيء ألهمك (صوت، لون، كلمة). حول إحداها إلى عمل فني صغير.",
    "skill_focus": "عيش الهوية الفنية",
    "activity_type": "مشروع يومي",
    "steps_ar": [
      "احمل دفتراً طوال اليوم.",
      "سجل أي شيء جميل أو مثير للاهتمام.",
      "في المساء، اختر شيئاً واحداً وحوله إلى رسم أو قصيدة.",
      "اكتب تاريخ اليوم على العمل."
    ],
    "steps_en": [
      "Carry a notebook all day.",
      "Record anything beautiful or interesting.",
      "In the evening, choose one and turn it into a drawing or poem.",
      "Date your work."
    ],
    "outcome_ar": "فهم أن الفن يولد من ملاحظة الحياة بعمق.",
    "emoji": "📓"
  },
  {
    "id": "art_018",
    "title_ar": "النمط والإيقاع",
    "title_en": "Pattern and Rhythm",
    "description_ar": "ابحث عن 'نمط' متكرر في بيتك (بلاط، قماش، ورق جدران). انقله لورقتك. أضف ألواناً لتجعله عملاً فنياً.",
    "skill_focus": "اكتشاف الأنماط البصرية",
    "activity_type": "رسم أنماط",
    "steps_ar": [
      "ابحث عن نمط متكرر في المنزل.",
      "حاول تقليده على ورقة.",
      "لون النمط بألوان جديدة.",
      "علق النمط الجديد كلوحة فنية."
    ],
    "steps_en": [
      "Find a repeating pattern at home.",
      "Try to replicate it on paper.",
      "Color it with new colors.",
      "Hang it as art."
    ],
    "outcome_ar": "رؤية الجمال في التكرار والتناغم البصري.",
    "emoji": "🌀"
  },
  {
    "id": "art_019",
    "title_ar": "الفن رسالة سلام",
    "title_en": "Art as a Message of Peace",
    "description_ar": "صمم بطاقة بريدية فنية تحمل رسالة سلام للعالم. ارسمها، اكتب رسالتك بالإنجليزية، واحتفظ بها أو أرسلها لصديق.",
    "skill_focus": "الفن الهادف",
    "activity_type": "تصميم بطاقة",
    "steps_ar": [
      "فكر في رسالة سلام تريد إيصالها.",
      "ارسم صورة تعبر عنها على بطاقة.",
      "اكتب جملة أو اثنتين بالإنجليزية.",
      "أرسلها أو احفظها لتذكرك بمهمتك الفنية."
    ],
    "steps_en": [
      "Think of a peace message.",
      "Draw an image expressing it on a card.",
      "Write a sentence or two in English.",
      "Send or keep it."
    ],
    "outcome_ar": "استخدام الفن كوسيلة للتغيير الإيجابي.",
    "emoji": "🕊️"
  },
  {
    "id": "art_020",
    "title_ar": "معرض نوافذ",
    "title_en": "Windows Exhibition",
    "description_ar": "اجمع كل ما صنعته (لوحات، قصائد، بطاقات) في 'معرض' صغير. ادعُ أسرتك لزيارته. اشرح لهم قصة كل عمل.",
    "skill_focus": "تتويج الإبداع",
    "activity_type": "معرض فني",
    "steps_ar": [
      "رتب أعمالك على حائط أو طاولة.",
      "اكتب بطاقة تعريف صغيرة لكل عمل.",
      "ادعُ أسرتك لزيارة 'معرض نوافذ'.",
      "اشرح لهم: 'ماذا يمثل هذا العمل؟ وما القصة خلفه؟'."
    ],
    "steps_en": [
      "Arrange works on a wall or table.",
      "Write a small label for each.",
      "Invite family to the 'Windows Exhibition'.",
      "Explain: 'What does this piece represent? What's the story?'."
    ],
    "outcome_ar": "الاحتفاء بالإبداع ومشاركة الذات مع الأحبة.",
    "emoji": "🏛️"
  }
];
