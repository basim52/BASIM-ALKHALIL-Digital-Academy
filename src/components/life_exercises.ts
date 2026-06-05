export interface LifeExercise {
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

export const LIFE_EXERCISES: LifeExercise[] = [
  {
    "id": "life_001",
    "title_ar": "غرفتي مملكتي",
    "title_en": "My Room, My Kingdom",
    "description_ar": "ترتيب غرفتك ليس عقاباً، بل هو تدريب على احترام مساحتك الخاصة. ضع خطة لترتيب غرفتك بالكامل، وركز على أن يكون لكل شيء مكان.",
    "skill_focus": "تنظيم المساحة الشخصية",
    "activity_type": "تطبيق عملي",
    "steps_ar": [
      "أفرغ سريرك من كل شيء وأعد ترتيبه أولاً.",
      "صنف أغراضك إلى 3 أكوام: 'أحتفظ'، 'أتبرع'، 'أرمي'.",
      "أعد كل شيء إلى مكانه المخصص فوراً.",
      "ضع صورة 'قبل' و'بعد' للغرفة."
    ],
    "steps_en": [
      "Clear your bed and make it first.",
      "Sort items into 3 piles: 'Keep', 'Donate', 'Trash'.",
      "Return everything to its designated place immediately.",
      "Take a 'before' and 'after' photo."
    ],
    "outcome_ar": "الشعور بالفخر والصفاء الذهني عند دخول غرفة مرتبة.",
    "emoji": "🛌"
  },
  {
    "id": "life_002",
    "title_ar": "قائمة الطوارئ",
    "title_en": "Emergency Checklist",
    "description_ar": "تعرف على أرقام الطوارئ في بلدك (إسعاف، دفاع مدني، شرطة). اكتبها بخط كبير وعلقها في مكان واضح في البيت.",
    "skill_focus": "معرفة أرقام الطوارئ",
    "activity_type": "حفظ وتجهيز",
    "steps_ar": [
      "ابحث مع والديك عن أرقام الطوارئ المحلية.",
      "اكتب كل رقم بخط كبير وواضح على ورقة.",
      "أضف اسماً ووصفاً بجانب كل رقم.",
      "علق الورقة على الثلاجة أو بجانب الهاتف."
    ],
    "steps_en": [
      "Research local emergency numbers with parents.",
      "Write each number clearly in large font.",
      "Add a name and description beside each.",
      "Hang the paper on the fridge or near the phone."
    ],
    "outcome_ar": "الاستعداد التام لطلب المساعدة الصحيحة في أي طارئ.",
    "emoji": "🚨"
  },
  {
    "id": "life_003",
    "title_ar": "حقيبة الطوارئ المنزلية",
    "title_en": "Home Emergency Kit",
    "description_ar": "تعرف على محتويات حقيبة الإسعافات الأولية في منزلك. تعلم اسم كل أداة وفائدتها. تأكد من أن الحقيبة في مكان يعرفه الجميع.",
    "skill_focus": "الإلمام بأدوات الإسعاف",
    "activity_type": "استكشاف وتعلم",
    "steps_ar": [
      "أحضر حقيبة الإسعافات المنزلية.",
      "أخرج كل قطعة واسأل والديك عن اسمها واستخدامها.",
      "اكتب قائمة بالمحتويات وألصقها على الحقيبة.",
      "تأكد من أن الجميع يعرف مكان الحقيبة."
    ],
    "steps_en": [
      "Bring the home first aid kit.",
      "Take out each item and ask parents its name and use.",
      "Write an inventory list and stick it on the kit.",
      "Ensure everyone knows its location."
    ],
    "outcome_ar": "التمكن من استخدام أدوات الإسعافات الأولية بثقة.",
    "emoji": "🩹"
  },
  {
    "id": "life_004",
    "title_ar": "جدول أعمالي الأسبوعي",
    "title_en": "My Weekly Schedule",
    "description_ar": "صمم جدولاً أسبوعياً معلقاً على الحائط. خصص ألواناً للمذاكرة، الرياضة، الترفيه، والأعمال المنزلية. البيئة المنظمة تبدأ من عقل منظم.",
    "skill_focus": "إدارة الوقت الشخصي",
    "activity_type": "تخطيط",
    "steps_ar": [
      "ارسم جدولاً بـ 7 أعمدة (الأيام) وصفوف (الساعات).",
      "لون كل نشاط بلون مختلف.",
      "علق الجدول فوق مكتبك.",
      "التزم به لمدة أسبوع كامل."
    ],
    "steps_en": [
      "Draw a table with 7 columns (days) and rows (hours).",
      "Color each activity differently.",
      "Hang it above your desk.",
      "Stick to it for a full week."
    ],
    "outcome_ar": "السيطرة على الوقت وتقليل التشتت.",
    "emoji": "📅"
  },
  {
    "id": "life_005",
    "title_ar": "ماذا لو اندلع حريق؟",
    "title_en": "What If a Fire Starts?",
    "description_ar": "ضع خطة هروب من المنزل في حالة الحريق. ارسم خريطة للبيت، وحدد طريقين للخروج من كل غرفة. تدربوا عليها كعائلة.",
    "skill_focus": "التخطيط للطوارئ",
    "activity_type": "محاكاة",
    "steps_ar": [
      "ارسم خريطة مبسطة لمنزلكم.",
      "حدد مخرجين من كل غرفة (باب وشباك).",
      "اتفقوا على 'نقطة تجمع' خارج المنزل.",
      "اجرِ تدريباً عائلياً مرة واحدة."
    ],
    "steps_en": [
      "Draw a simple map of your home.",
      "Mark two exits per room (door and window).",
      "Agree on a 'meeting point' outside.",
      "Conduct one family drill."
    ],
    "outcome_ar": "الاستعداد الذهني والعملي لمواجهة الحرائق.",
    "emoji": "🔥"
  },
  {
    "id": "life_006",
    "title_ar": "فن طي الملابس",
    "title_en": "The Art of Folding Clothes",
    "description_ar": "تعلم الطريقة الصحيحة لطي أنواع مختلفة من الملابس (قمصان، بناطيل، جوارب). رتب دولابك بنفسك.",
    "skill_focus": "العناية بالممتلكات",
    "activity_type": "تدريب يدوي",
    "steps_ar": [
      "شاهد فيديو تعليمياً عن طي الملابس.",
      "أفرغ رفاً واحداً من دولابك.",
      "اطوِ كل قطعة بعناية وأعدها.",
      "استمتع بمنظر الرف المرتب."
    ],
    "steps_en": [
      "Watch a folding tutorial.",
      "Empty one shelf of your closet.",
      "Fold each item carefully and return.",
      "Enjoy the neat shelf view."
    ],
    "outcome_ar": "إتقان مهارة يدوية يومية تمنح شعوراً بالإنجاز.",
    "emoji": "👕"
  },
  {
    "id": "life_007",
    "title_ar": "الإسعاف الأولي للجروح",
    "title_en": "First Aid for Cuts",
    "description_ar": "تعلم الخطوات الصحيحة لتنظيف جرح بسيط: 1- اغسل يديك، 2- نظف الجرح بالماء، 3- طهره، 4- غطِّه بضماد. تدرب على دمية أو برتقالة.",
    "skill_focus": "مهارة إسعافية أساسية",
    "activity_type": "تدريب عملي",
    "steps_ar": [
      "اجمع الأدوات: ماء، مطهر، ضماد.",
      "تخيل جرحاً على برتقالة.",
      "نظفها وطهرها وضع الضماد.",
      "كرر الخطوات بصوت عالٍ وأنت تفعلها."
    ],
    "steps_en": [
      "Gather: water, antiseptic, bandage.",
      "Imagine a wound on an orange.",
      "Clean, disinfect, and bandage it.",
      "Repeat steps aloud as you do them."
    ],
    "outcome_ar": "الاستعداد للتصرف الصحيح عند حدوث جرح بسيط.",
    "emoji": "🩹"
  },
  {
    "id": "life_008",
    "title_ar": "مطبخي الصغير",
    "title_en": "My Little Kitchen",
    "description_ar": "تعلم استخدام أدوات المطبخ الأساسية بأمان. ابدأ بصنع وجبة بسيطة جداً (سندوتش، سلطة فواكه) تحت إشراف أحد والديك.",
    "skill_focus": "مهارات المطبخ الأساسية",
    "activity_type": "طهي",
    "steps_ar": [
      "اختر وصفة بمكونات 3 فقط.",
      "اغسل يديك واجمع المكونات.",
      "حضر الوجبة ببطء وأمان.",
      "نظف المكان بعد الانتهاء."
    ],
    "steps_en": [
      "Choose a 3-ingredient recipe.",
      "Wash hands and gather ingredients.",
      "Prepare the meal slowly and safely.",
      "Clean up afterwards."
    ],
    "outcome_ar": "اكتساب الثقة في المطبخ والاعتماد على النفس في الطعام.",
    "emoji": "🍳"
  },
  {
    "id": "life_009",
    "title_ar": "حقيبة سفري",
    "title_en": "My Travel Bag",
    "description_ar": "احزم حقيبتك لرحلة لمدة 3 أيام بنفسك. اكتب قائمة بما تحتاجه، ثم ضع كل شيء. لا تنس فرشاة الأسنان!",
    "skill_focus": "التخطيط والتنظيم للسفر",
    "activity_type": "تجهيز",
    "steps_ar": [
      "اكتب قائمة بالأشياء الضرورية.",
      "ضع الملابس، أدوات النظافة، والتسلية.",
      "رتب الحقيبة بحيث يسهل الوصول لكل شيء.",
      "اطلب من والديك مراجعة الحقيبة."
    ],
    "steps_en": [
      "Write a list of essentials.",
      "Pack clothes, toiletries, and entertainment.",
      "Arrange for easy access.",
      "Ask parents to review."
    ],
    "outcome_ar": "الاستقلالية في تجهيز الأغراض الشخصية للسفر.",
    "emoji": "🧳"
  },
  {
    "id": "life_010",
    "title_ar": "ماذا لو غاب الكبار؟",
    "title_en": "What If Adults Are Away?",
    "description_ar": "ناقش مع والديك خطة 'ماذا تفعل إذا كنت وحيداً في البيت؟': من تتصل؟ ماذا تقول؟ كيف تتصرف إذا طرق أحدهم الباب؟",
    "skill_focus": "الاستعداد للبقاء وحيداً",
    "activity_type": "حوار عائلي",
    "steps_ar": [
      "اسأل والديك: 'ماذا أفعل إذا كنت وحدي؟'.",
      "احفظ رقماً للطوارئ غير 911 (جارة، قريب).",
      "تدرب على قول: 'والدي مشغول الآن' للغرباء.",
      "اكتب الخطة وعلقها."
    ],
    "steps_en": [
      "Ask parents: 'What do I do when alone?'.",
      "Memorize a non-911 emergency contact.",
      "Practice saying: 'My parent is busy now' to strangers.",
      "Write and post the plan."
    ],
    "outcome_ar": "الشعور بالأمان والثقة عند البقاء وحيداً في المنزل.",
    "emoji": "🏠"
  },
  {
    "id": "life_011",
    "title_ar": "نبتتي مسؤوليتي",
    "title_en": "My Plant, My Responsibility",
    "description_ar": "ازرع نبتة صغيرة في غرفتك. تعلم كيف تسقيها، تعرضها للشمس، وتعتني بها. رعاية كائن حي تعلمك الالتزام.",
    "skill_focus": "تحمل المسؤولية المستمرة",
    "activity_type": "زراعة",
    "steps_ar": [
      "اختر نبتة سهلة (صبار صغير، ريحان).",
      "ضعها في مكان مشمس في غرفتك.",
      "ضع 'جدول ري' أسبوعي.",
      "صور نموها كل أسبوع."
    ],
    "steps_en": [
      "Choose an easy plant.",
      "Place it in a sunny spot in your room.",
      "Set a weekly watering schedule.",
      "Photograph its growth weekly."
    ],
    "outcome_ar": "تعلم الالتزام الطويل الأمد عبر رعاية كائن حي.",
    "emoji": "🪴"
  },
  {
    "id": "life_012",
    "title_ar": "الإسعاف الأولي للحروق",
    "title_en": "First Aid for Burns",
    "description_ar": "تعلم قاعدة الحروق: 1- ماء بارد فوراً (10 دقائق)، 2- لا تضع ثلجاً أو معجون أسنان، 3- غطِّ بضماد نظيف. الماء البارد هو الصديق الأول.",
    "skill_focus": "مهارة إسعافية للحروق",
    "activity_type": "تدريب معرفي",
    "steps_ar": [
      "ارسم يداً على ورقة.",
      "اكتب عليها الخطوات الثلاث.",
      "اشرحها لأخ أصغر منك.",
      "علق الرسم قرب المطبخ."
    ],
    "steps_en": [
      "Draw a hand on paper.",
      "Write the three steps on it.",
      "Explain to a younger sibling.",
      "Hang it near the kitchen."
    ],
    "outcome_ar": "التصرف الصحيح في الثواني الأولى من الحرق.",
    "emoji": "🚒"
  },
  {
    "id": "life_013",
    "title_ar": "صيانة بسيطة في المنزل",
    "title_en": "Simple Home Maintenance",
    "description_ar": "تعلم مهمة صيانة بسيطة: تغيير لمبة، تعليق صورة، أو طي سلك بشكل صحيح. تحت إشراف شخص بالغ.",
    "skill_focus": "مهارات الصيانة المنزلية",
    "activity_type": "تدريب يدوي",
    "steps_ar": [
      "اسأل والديك عن مهمة صيانة بسيطة يمكنك تعلمها.",
      "شاهدهم وهم يؤدونها أولاً.",
      "جربها بنفسك تحت إشرافهم.",
      "اشكرهم على تعليمك."
    ],
    "steps_en": [
      "Ask parents for a simple maintenance task.",
      "Watch them do it first.",
      "Try it yourself under supervision.",
      "Thank them for teaching you."
    ],
    "outcome_ar": "اكتساب الثقة في إصلاح الأشياء البسيطة بنفسك.",
    "emoji": "🔧"
  },
  {
    "id": "life_014",
    "title_ar": "صندوق الذكريات",
    "title_en": "Memory Box",
    "description_ar": "خصص صندوقاً لتحتفظ فيه بأغراضك ذات القيمة المعنوية (تذاكر، رسائل، صور). تعلم كيف تحافظ على ممتلكاتك الثمينة.",
    "skill_focus": "حفظ المقتنيات الشخصية",
    "activity_type": "تنظيم",
    "steps_ar": [
      "اختر صندوقاً متيناً.",
      "زينه واكتب عليه 'صندوق ذكرياتي'.",
      "ضع فيه 5 أشياء تهمك الآن.",
      "ضعه في مكان آمن في دولابك."
    ],
    "steps_en": [
      "Choose a sturdy box.",
      "Decorate it and write 'My Memory Box'.",
      "Place 5 things important to you now.",
      "Store safely in your closet."
    ],
    "outcome_ar": "تعلم قيمة الاحتفاظ بالذكريات بشكل منظم وآمن.",
    "emoji": "📦"
  },
  {
    "id": "life_015",
    "title_ar": "ماذا لو غرق أحدهم؟",
    "title_en": "What If Someone Drowns?",
    "description_ar": "القاعدة الذهبية: لا تقفز للماء لإنقاذ غريق. ارمِ له شيئاً يطفو، مدد عصا، واصرخ لطلب المساعدة. لا تصبح غريقاً ثانياً.",
    "skill_focus": "الوعي بالسلامة المائية",
    "activity_type": "توعية",
    "steps_ar": [
      "اقرأ القاعدة مع والديك.",
      "تدرب على الصراخ 'ساعدوني! هناك غريق!'.",
      "ابحث في البيت عن أشياء تطفو (كرة، زجاجة فارغة).",
      "اشرح القاعدة لإخوتك."
    ],
    "steps_en": [
      "Read the rule with parents.",
      "Practice shouting 'Help! Someone is drowning!'.",
      "Find floating objects at home.",
      "Explain the rule to siblings."
    ],
    "outcome_ar": "معرفة كيفية المساعدة دون تعريض النفس للخطر.",
    "emoji": "🛟"
  },
  {
    "id": "life_016",
    "title_ar": "ميزانية مصروفي",
    "title_en": "My Allowance Budget",
    "description_ar": "سجل مصروفك الأسبوعي. اكتب كل ريال تصرفه. في نهاية الأسبوع، راجع: 'هل صرفت بحكمة؟'.",
    "skill_focus": "إدارة المال الشخصي",
    "activity_type": "تتبع مالي",
    "steps_ar": [
      "أحضر دفتراً صغيراً.",
      "اكتب فيه: 'دخل الأسبوع: ...'.",
      "سجل كل عملية صرف فوراً.",
      "في نهاية الأسبوع، احسب الباقي."
    ],
    "steps_en": [
      "Get a small notebook.",
      "Write: 'Week income: ...'.",
      "Record every expense immediately.",
      "At week's end, calculate remaining."
    ],
    "outcome_ar": "الوعي بالإنفاق وبناء عادة مالية صحية.",
    "emoji": "💰"
  },
  {
    "id": "life_017",
    "title_ar": "طاولة الدراسة المثالية",
    "title_en": "The Perfect Study Desk",
    "description_ar": "صمم طاولة دراستك المثالية. نظفها، رتب أقلامك، أبعد المشتتات. اكتب 'قوانين الطاولة' وعلقها.",
    "skill_focus": "تهيئة بيئة العمل",
    "activity_type": "تنظيم",
    "steps_ar": [
      "أفرغ طاولتك بالكامل.",
      "امسحها ونظفها.",
      "أعد فقط ما يساعدك على الدراسة.",
      "علق 'قوانين: لا هاتف، لا فوضى، لا ضوضاء'."
    ],
    "steps_en": [
      "Empty your desk completely.",
      "Wipe and clean it.",
      "Return only study-helping items.",
      "Hang 'Rules: No phone, no mess, no noise'."
    ],
    "outcome_ar": "خلق مساحة مقدسة للتركيز والإنجاز.",
    "emoji": "✍️"
  },
  {
    "id": "life_018",
    "title_ar": "وضعية الإفاقة",
    "title_en": "Recovery Position",
    "description_ar": "تعلم وضع شخص فاقد للوعي لكنه يتنفس في 'وضعية الإفاقة' (على جنبه). هذه الوضعية قد تنقذ حياة.",
    "skill_focus": "مهارة إسعافية متقدمة",
    "activity_type": "تدريب جسدي",
    "steps_ar": [
      "اطلب من أحد والديك التمدد كمتطوع.",
      "تعلم الخطوات: ارفع ذقنه، ضع يده تحت خده، اثنِ ركبته، دحرجه.",
      "جربها ببطء.",
      "شاهد فيديو تعليمي للتأكيد."
    ],
    "steps_en": [
      "Ask a parent to lie as volunteer.",
      "Learn steps: lift chin, hand under cheek, bend knee, roll.",
      "Try slowly.",
      "Watch a tutorial to confirm."
    ],
    "outcome_ar": "اكتساب مهارة قد تنقذ حياة إنسان.",
    "emoji": "🛌"
  },
  {
    "id": "life_019",
    "title_ar": "يوم الاعتماد الكامل",
    "title_en": "Full Independence Day",
    "description_ar": "تحدى نفسك: ليوم واحد، قم بكل مهامك بنفسك دون تذكير (ترتيب، دراسة، مساعدة في البيت). كافئ نفسك في النهاية.",
    "skill_focus": "الاعتماد الكلي على النفس",
    "activity_type": "تحدي يومي",
    "steps_ar": [
      "أعلن التحدي لأسرتك في الصباح.",
      "ضع قائمة مهامك لهذا اليوم.",
      "أنجزها كلها دون أن يطلب منك أحد.",
      "في المساء، احتفل بإنجازك."
    ],
    "steps_en": [
      "Announce challenge to family in the morning.",
      "List your tasks for the day.",
      "Complete all without being asked.",
      "Celebrate in the evening."
    ],
    "outcome_ar": "إثبات القدرة على الاعتماد على النفس ولو ليوم واحد.",
    "emoji": "☀️"
  },
  {
    "id": "life_020",
    "title_ar": "شهادة بطل الحياة",
    "title_en": "Life Hero Certificate",
    "description_ar": "صمم 'شهادة بطل الحياة' لنفسك. اكتب فيها: 3 مهارات حياتية أتقنتها، 3 مهارات إسعافية تعلمتها، و3 عادات جديدة اكتسبتها.",
    "skill_focus": "تتويج المسيرة العملية",
    "activity_type": "احتفال",
    "steps_ar": [
      "صمم شهادة جميلة.",
      "املأ إنجازاتك فيها.",
      "وقعها واطلب توقيع أحد والديك.",
      "علقها لتذكرك أنك 'بطل حياة'."
    ],
    "steps_en": [
      "Design a beautiful certificate.",
      "Fill in your achievements.",
      "Sign and ask a parent to sign.",
      "Hang it to remember you are a 'Life Hero'."
    ],
    "outcome_ar": "الاحتفاء بالتحول إلى شخص يعتمد على نفسه ويساعد غيره.",
    "emoji": "🎓"
  }
];
