export interface FinancialExercise {
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

export const FINANCIAL_EXERCISES: FinancialExercise[] = [
  {
    "id": "money_001",
    "title_ar": "ما هو المال؟",
    "title_en": "What is Money?",
    "description_ar": "قبل أن تدّخر أو تنفق، يجب أن تفهم: ما هو المال أصلاً؟ اكتب تعريفك الخاص للمال من وجهة نظرك. قارنه بتعريف والديك.",
    "skill_focus": "فهم مفهوم المال",
    "activity_type": "كتابة وحوار",
    "steps_ar": [
      "اكتب على ورقة: 'المال هو...' وأكمل الجملة بطريقتك.",
      "اسأل أحد والديك: 'ما هو المال برأيك؟' واكتب إجابته.",
      "قارن بين التعريفين. هل هناك اختلاف؟ لماذا؟",
      "اكتب تعريفاً ثالثاً يجمع بين رأيك ورأي والدك."
    ],
    "steps_en": [
      "Write on a paper: 'Money is...' and complete the sentence your way.",
      "Ask a parent: 'What is money in your opinion?' and write their answer.",
      "Compare the two definitions. Any differences? Why?",
      "Write a third definition combining both views."
    ],
    "outcome_ar": "فهم أن المال مفهوم متعدد الأبعاد وليس مجرد أوراق وقطع معدنية.",
    "emoji": "💰"
  },
  {
    "id": "money_002",
    "title_ar": "كيف يصل المال إلينا؟",
    "title_en": "How Does Money Reach Us?",
    "description_ar": "ارسم خريطة ذهنية لمصادر المال في أسرتك. من أين يأتي؟ (رواتب، أعمال حرة، تجارة...). أضف دائرة 'أنا' وفكر: 'كيف يمكنني أن أكون مصدر دخل صغيراً في المستقبل؟'.",
    "skill_focus": "فهم مصادر الدخل",
    "activity_type": "رسم خريطة ذهنية",
    "steps_ar": [
      "ارسم دائرة في وسط الورقة واكتب فيها 'دخل الأسرة'.",
      "ارسم أسهمًا للخارج واكتب على كل سهم مصدر دخل.",
      "أضف دائرة صغيرة فيها 'أنا' وفكر في مهارة يمكنك تطويرها (رسم، برمجة، تدريس...)."
    ],
    "steps_en": [
      "Draw a circle in the middle and write 'Family Income'.",
      "Draw arrows outwards and write an income source on each.",
      "Add a small 'Me' circle and think of a skill you can develop."
    ],
    "outcome_ar": "إدراك أن المال يأتي من العمل والمهارات، وليس من الجيب فقط.",
    "emoji": "🗺️"
  },
  {
    "id": "money_003",
    "title_ar": "الحاجة أم الرغبة؟",
    "title_en": "Need or Want?",
    "description_ar": "تدرب على التمييز بين الحاجة (ضرورية للحياة) والرغبة (جميلة لكن غير ضرورية). صنف 10 أشياء في غرفتك إلى 'حاجة' و'رغبة'.",
    "skill_focus": "التمييز بين الحاجة والرغبة",
    "activity_type": "تصنيف وتدقيق",
    "steps_ar": [
      "اكتب قائمة بـ 10 أشياء تريد شراءها أو اشتريتها مؤخراً.",
      "بجانب كل شيء، اكتب: 'حاجة' إذا كنت لا تستطيع العيش بدونه، و'رغبة' إذا كنت تستطيع.",
      "فاجئ نفسك: كم من القائمة كان 'رغبة'؟"
    ],
    "steps_en": [
      "List 10 things you want to buy or recently bought.",
      "Next to each, write 'Need' if you can't live without it, 'Want' if you can.",
      "Surprise yourself: how many were 'Wants'?"
    ],
    "outcome_ar": "بناء مصفاة ذهنية تفرق بين الضروري والكمالي قبل الشراء.",
    "emoji": "⚖️"
  },
  {
    "id": "money_004",
    "title_ar": "ثمن الساعة",
    "title_en": "The Price of an Hour",
    "description_ar": "كم ساعة عمل تحتاج لشراء شيء تريده؟ إذا كان الشيء بـ 100 ريال وأنت تكسب 10 ريالات في الساعة، كم ساعة تعمل؟ احسبها بنفسك.",
    "skill_focus": "ربط المال بالجهد",
    "activity_type": "حساب رياضي",
    "steps_ar": [
      "اختر شيئاً تريد شراءه واعرف سعره.",
      "اسأل: 'كم أجر الساعة لعمل بسيط؟' (اسأل والديك).",
      "اقسم السعر على أجر الساعة. النتيجة = عدد ساعات العمل.",
      "اسأل نفسك: 'هل يستحق هذا الشيء كل هذه الساعات؟'."
    ],
    "steps_en": [
      "Choose something you want and find its price.",
      "Ask: 'What is the hourly wage for a simple job?'",
      "Divide the price by the hourly wage. Result = work hours.",
      "Ask yourself: 'Is this thing worth all those hours?'."
    ],
    "outcome_ar": "تقدير حقيقي لقيمة المال حين يرتبط بالجهد والوقت المبذول.",
    "emoji": "⏳"
  },
  {
    "id": "money_005",
    "title_ar": "حصالتي الذكية",
    "title_en": "My Smart Money Box",
    "description_ar": "اصنع 3 حصالات ورقية أو علب: 'للادخار'، 'للإنفاق'، 'للعطاء'. كلما حصلت على مال، وزعه عليها بنسب: 50% ادخار، 40% إنفاق، 10% عطاء.",
    "skill_focus": "التوزيع الواعي للمال",
    "activity_type": "مشروع يدوي ونظام مستمر",
    "steps_ar": [
      "جهز 3 علب وزينها: 'أدخر' (أخضر)، 'أنفق' (أصفر)، 'أعطي' (أزرق).",
      "كل أسبوع، وزع مصروفك أو هداياك المالية عليها بنسب 50-40-10.",
      "في نهاية الشهر، افتح علبة 'العطاء' وتبرع بها لشيء تختاره."
    ],
    "steps_en": [
      "Prepare 3 boxes: 'Save' (green), 'Spend' (yellow), 'Give' (blue).",
      "Every week, distribute your money by 50-40-10 ratio.",
      "At month's end, open the 'Give' box and donate it to a cause you choose."
    ],
    "outcome_ar": "بناء عادة توزيع المال بذكاء منذ الصغر.",
    "emoji": "🐖"
  },
  {
    "id": "money_006",
    "title_ar": "ميزانيتي الأسبوعية",
    "title_en": "My Weekly Budget",
    "description_ar": "خطط لمصروفك الأسبوعي على ورقة. اكتب: 'المبلغ الإجمالي'، 'ما أحتاجه'، 'ما أريده'، 'ما سأدخره'. لا تتجاوز المبلغ أبداً.",
    "skill_focus": "التخطيط المالي الأسبوعي",
    "activity_type": "كتابة جدول ميزانية",
    "steps_ar": [
      "اكتب المبلغ الذي تملكه في بداية الأسبوع.",
      "اقسمه على 3 خانات: احتياجات، رغبات، ادخار.",
      "تابع صرفك يومياً وسجله.",
      "في نهاية الأسبوع، احسب الفرق بين خطتك وصرفك الفعلي."
    ],
    "steps_en": [
      "Write the amount you have at the week's start.",
      "Divide it into 3 columns: Needs, Wants, Savings.",
      "Track your spending daily and record it.",
      "At week's end, calculate the difference between plan and actual."
    ],
    "outcome_ar": "تجربة حقيقية للشعور بالمسؤولية المالية دون مخاطر.",
    "emoji": "📅"
  },
  {
    "id": "money_007",
    "title_ar": "تحدي الـ 24 ساعة",
    "title_en": "The 24-Hour Rule",
    "description_ar": "عندما ترى شيئاً تريد شراءه فوراً، لا تشتره. انتظر 24 ساعة. بعدها اسأل نفسك: 'هل ما زلت أريده بنفس القوة؟'.",
    "skill_focus": "تجنب الشراء الاندفاعي",
    "activity_type": "تحدي تأجيل الإشباع",
    "steps_ar": [
      "إذا أردت شراء شيء غير مخطط له، اكتبه في 'قائمة الانتظار'.",
      "ضع تاريخ اليوم بجانبه. انتظر 24 ساعة كاملة.",
      "بعد مرور الوقت، راجع شعورك: هل الحماسة نفسها؟",
      "قرر: تشتري، تؤجل، أو تلغي."
    ],
    "steps_en": [
      "If you want to buy something unplanned, write it on a 'Wait List'.",
      "Put today's date next to it. Wait a full 24 hours.",
      "After the time, check your feeling: same excitement?",
      "Decide: buy, postpone, or cancel."
    ],
    "outcome_ar": "كسر إدمان الشراء اللحظي واستعادة السيطرة على القرار.",
    "emoji": "⏱️"
  },
  {
    "id": "money_008",
    "title_ar": "سوق البيت",
    "title_en": "Home Market",
    "description_ar": "حولوا غرفة المعيشة لسوق. كل فرد 'يبيع' شيئاً يصنعه (رسمة، كوب شاي، قصة). استخدموا نقاطاً أو عملة ورقية من صنعكم. تعلموا البيع والشراء والتفاوض.",
    "skill_focus": "محاكاة التجارة",
    "activity_type": "لعبة عائلية",
    "steps_ar": [
      "اصنعوا 'عملة البيت' من ورق ملون.",
      "كل فرد يجهز 'بضاعته' (خدمة أو منتج).",
      "حددوا الأسعار وابدأوا البيع والشراء والمساومة.",
      "في النهاية، من ربح أكثر؟ ولماذا؟"
    ],
    "steps_en": [
      "Make 'House Currency' from colored paper.",
      "Everyone prepares their 'goods' (service or product).",
      "Set prices and start buying, selling, bargaining.",
      "In the end, who profited most? And why?"
    ],
    "outcome_ar": "فهم عملي لديناميكيات السوق والعرض والطلب.",
    "emoji": "🏪"
  },
  {
    "id": "money_009",
    "title_ar": "هدف الادخار المرئي",
    "title_en": "The Visual Savings Goal",
    "description_ar": "ارسم الشيء الكبير الذي تريد ادخار المال لشرائه (دراجة، جهاز، هدية). علق الرسم على الحائط. كلما أضفت مالاً لحصالته، لون جزءاً من الرسم.",
    "skill_focus": "الادخار بهدف",
    "activity_type": "رسم وتحفيز بصري",
    "steps_ar": [
      "ارسم هدفك الكبير بوضوح على ورقة A4.",
      "قسم الرسم لـ 10 أجزاء (كل جزء = 10% من المبلغ).",
      "كلما ادخرت 10% من المبلغ، لون جزءاً.",
      "لا تتوقف حتى يكتمل الرسم بالألوان."
    ],
    "steps_en": [
      "Clearly draw your big goal on A4 paper.",
      "Divide it into 10 parts (each = 10% of the amount).",
      "Every time you save 10%, color a part.",
      "Don't stop until the drawing is fully colored."
    ],
    "outcome_ar": "تحويل الادخار من تضحية مؤلمة إلى لعبة مرئية ممتعة.",
    "emoji": "🎯"
  },
  {
    "id": "money_010",
    "title_ar": "سجل التدقيق المالي",
    "title_en": "The Money Audit Log",
    "description_ar": "لمدة 3 أيام، سجل كل قرش تنفقه. اكتب: 'المبلغ - على ماذا - حاجة أم رغبة'. في نهاية اليوم الثالث، راجع سجلك. ما الذي فاجأك؟",
    "skill_focus": "الوعي بالإنفاق",
    "activity_type": "تتبع وتسجيل",
    "steps_ar": [
      "احمل دفتراً صغيراً في جيبك 3 أيام.",
      "سجل كل عملية صرف فور حدوثها.",
      "في مساء اليوم الثالث، صنف مصروفاتك لحاجات ورغبات.",
      "اكتب شيئاً واحداً ستغيره في إنفاقك بناءً على هذا السجل."
    ],
    "steps_en": [
      "Carry a small notebook for 3 days.",
      "Record every expense immediately.",
      "On the third evening, classify into needs and wants.",
      "Write one thing you'll change based on this log."
    ],
    "outcome_ar": "الصدمة الإيجابية لاكتشاف أين يذهب المال بالضبط.",
    "emoji": "📑"
  },
  {
    "id": "money_011",
    "title_ar": "المقارنة الذكية",
    "title_en": "Smart Comparison",
    "description_ar": "اذهب مع والديك للتسوق. اختر منتجاً واحداً (حليب، أرز). قارن بين 3 علامات تجارية: السعر، الجودة، الكمية. أيهما الأفضل قيمة مقابل السعر؟",
    "skill_focus": "مهارة المقارنة قبل الشراء",
    "activity_type": "بحث ميداني",
    "steps_ar": [
      "اختر منتجاً واحداً في السوبرماركت.",
      "انظر لـ 3 خيارات منه. اكتب السعر والوزن والجودة الظاهرة.",
      "احسب 'سعر الكيلو' أو 'سعر الوحدة' لتعرف الأرخص فعلاً.",
      "قدم توصيتك لوالديك: 'أعتقد أن هذا هو الأفضل لأن...'."
    ],
    "steps_en": [
      "Choose one product in the supermarket.",
      "Look at 3 options. Note price, weight, apparent quality.",
      "Calculate 'price per kilo' to find the truly cheapest.",
      "Present your recommendation to parents: 'I think this is best because...'."
    ],
    "outcome_ar": "تعلم أن الأرخص سعراً ليس دائماً الأفضل، والأغلى ليس دائماً الأجود.",
    "emoji": "🛒"
  },
  {
    "id": "money_012",
    "title_ar": "بطل التخفيضات",
    "title_en": "Discount Hero",
    "description_ar": "تعلم كيف تحسب الخصم. إذا كان شيء بـ 200 ريال وعليه خصم 30%، كم ستدفع؟ تدرب على 5 أمثلة. هذه الرياضيات توفر لك مالاً حقيقياً.",
    "skill_focus": "حساب الخصومات",
    "activity_type": "تمرين رياضي",
    "steps_ar": [
      "اسأل والديك عن إعلانات التخفيضات.",
      "اختر 5 منتجات مخفضة واحسب سعرها بعد الخصم.",
      "استخدم الآلة الحاسبة لتتأكد من إجابتك.",
      "الآن: أنت جاهز لموسم التخفيضات القادم."
    ],
    "steps_en": [
      "Ask parents for discount ads.",
      "Pick 5 discounted products and calculate their final price.",
      "Use a calculator to verify.",
      "Now you're ready for the next sale season."
    ],
    "outcome_ar": "عدم الانخداع بنسب الخصم ومعرفة السعر الحقيقي بعد التخفيض.",
    "emoji": "🏷️"
  },
  {
    "id": "money_013",
    "title_ar": "يوميات التاجر الصغير",
    "title_en": "Diary of a Young Trader",
    "description_ar": "تخيل أنك تاجر تبيع شيئاً تحبه. اكتب يومياتك ليوم واحد: كيف تحدد السعر؟ كيف تقنع الزبائن؟ ماذا تفعل بالأرباح؟",
    "skill_focus": "عقلية ريادة الأعمال",
    "activity_type": "كتابة تخيلية",
    "steps_ar": [
      "اختر منتجاً تتخيل بيعه (عصير، كتب مستعملة، ألعاب).",
      "اكتب يومياتك: 'صباحاً: اشتريت البضاعة بـ... مساءً: بعت كل شيء وربحت...'.",
      "فكر: ما الصعوبات التي واجهتها؟ كيف تغلبت عليها؟",
      "اكتب نصيحة واحدة لتاجر مبتدئ."
    ],
    "steps_en": [
      "Choose a product you imagine selling.",
      "Write your diary: 'Morning: bought goods for... Evening: sold all and profited...'.",
      "Think: what difficulties did you face? How did you overcome them?",
      "Write one tip for a beginner trader."
    ],
    "outcome_ar": "زرع بذرة التفكير الريادي وفهم أن الربح يحتاج جهداً وذكاءً.",
    "emoji": "✍️"
  },
  {
    "id": "money_014",
    "title_ar": "عشاء بميزانية محدودة",
    "title_en": "Dinner on a Budget",
    "description_ar": "تحدى أسرتك: اطبخوا وجبة عشاء كاملة بميزانية صغيرة (مثلاً 30 ريالاً). خططوا، اشتروا، اطبخوا. من يستطيع إعداد ألذ وجبة بأقل تكلفة؟",
    "skill_focus": "الإبداع في حدود الميزانية",
    "activity_type": "تحدي عائلي",
    "steps_ar": [
      "حددوا ميزانية صغيرة للوجبة.",
      "خططوا لقائمة طعام ضمن الميزانية.",
      "اذهبوا للتسوق والتزموا بالمبلغ.",
      "اطبخوا معاً واستمتعوا بوجبة 'اقتصادية ولذيذة'."
    ],
    "steps_en": [
      "Set a small budget for the meal.",
      "Plan a menu within the budget.",
      "Go shopping and stick to the amount.",
      "Cook together and enjoy an 'economic and delicious' meal."
    ],
    "outcome_ar": "إثبات أن الميزانية المحدودة لا تعني طعاماً سيئاً، بل إبداعاً أكبر.",
    "emoji": "🍲"
  },
  {
    "id": "money_015",
    "title_ar": "الادخار الطارئ",
    "title_en": "Emergency Savings",
    "description_ar": "افتح حصالة 'للطوارئ فقط'. ضع فيها 5% من أي مبلغ تحصل عليه. هذه الحصالة لا تفتح إلا في حالات استثنائية حقيقية. ما هي 'الطوارئ' برأيك؟",
    "skill_focus": "الاستعداد للمفاجآت",
    "activity_type": "ادخار وقائي",
    "steps_ar": [
      "جهة حصالة حمراء واكتب عليها 'للطوارئ فقط'.",
      "ناقش مع أسرتك: 'ما هي الحالات التي تعتبر طارئة؟'.",
      "أودع 5% من كل دخل فيها بانتظام.",
      "لا تفتحها إلا لظرف حقيقي متفق عليه."
    ],
    "steps_en": [
      "Prepare a red box and write 'Emergency Only'.",
      "Discuss with family: 'What situations count as emergencies?'.",
      "Deposit 5% of every income regularly.",
      "Never open it except for an agreed real emergency."
    ],
    "outcome_ar": "بناء عادة الادخار الوقائي الذي يحمي من الأزمات المفاجئة.",
    "emoji": "🚨"
  },
  {
    "id": "money_016",
    "title_ar": "قصة ورقة نقدية",
    "title_en": "Story of a Banknote",
    "description_ar": "تخيل رحلة ورقة نقدية (10 ريالات) منذ طباعتها في البنك حتى وصولها لجيبك. اكتب قصتها: كم يداً لمستها؟ ماذا اشترت؟ أين نامت ليلاً؟",
    "skill_focus": "تأمل قيمة المال المتداول",
    "activity_type": "كتابة إبداعية",
    "steps_ar": [
      "أمسك ورقة نقدية حقيقية وتأملها.",
      "تخيل: 'ولدت في مطبعة البنك المركزي...'.",
      "اكتب قصتها في 10 جمل. أعطها مشاعر وأحلاماً.",
      "اسأل نفسك: 'هل أنا محطة عابرة في رحلتها؟ كيف ستستمر بعدي؟'."
    ],
    "steps_en": [
      "Hold a real banknote and observe it.",
      "Imagine: 'I was born in the central bank printing press...'.",
      "Write its story in 10 sentences. Give it feelings and dreams.",
      "Ask: 'Am I a stop in its journey? How will it continue after me?'."
    ],
    "outcome_ar": "فهم أن المال في حركة دائمة، ودورنا فيه إما إنفاق واعٍ أو تبديد.",
    "emoji": "💵"
  },
  {
    "id": "money_017",
    "title_ar": "عقد مصروفي",
    "title_en": "My Allowance Contract",
    "description_ar": "اكتب 'عقداً' بينك وبين والديك. أنت تتعهد فيه: 'أتقاضى [المبلغ] أسبوعياً، وأتعهد بأن أدخر [النسبة] منه، وأن أصرف الباقي بوعي'. وقعوه جميعاً.",
    "skill_focus": "المسؤولية التعاقدية",
    "activity_type": "كتابة عقد",
    "steps_ar": [
      "اكتب على ورقة: 'عقد مصروف'.",
      "حدد المبلغ، النسبة التي ستدخرها، والنسبة التي ستصرفها.",
      "أضف بنداً: 'إذا أنفقت كل شيء قبل نهاية الأسبوع، لن أطلب المزيد'.",
      "وقع أنت ووالديك. علقه في مكان ظاهر."
    ],
    "steps_en": [
      "Write on paper: 'Allowance Contract'.",
      "Specify amount, savings percentage, and spending percentage.",
      "Add clause: 'If I spend all before week's end, I won't ask for more'.",
      "Sign it with parents. Hang it visibly."
    ],
    "outcome_ar": "تحويل المصروف من عادة إلى التزام مالي له قواعد.",
    "emoji": "📜"
  },
  {
    "id": "money_018",
    "title_ar": "الفرق بين السعر والقيمة",
    "title_en": "Price vs Value",
    "description_ar": "السعر ما تدفعه. القيمة ما تحصل عليه. اكتب 3 أشياء 'سعرها منخفض وقيمتها عالية' (مثل كتاب مستعمل، لعبة بسيطة). و3 أشياء 'سعرها مرتفع وقيمتها منخفضة'.",
    "skill_focus": "تقدير القيمة الحقيقية",
    "activity_type": "تحليل ومقارنة",
    "steps_ar": [
      "قسّم ورقة لعمودين: 'سعر منخفض/قيمة عالية' و 'سعر مرتفع/قيمة منخفضة'.",
      "املأ 3 أمثلة في كل عمود من واقع حياتك.",
      "اسأل نفسك: 'لماذا بعض الأشياء غالية جداً رغم أنها ليست مفيدة؟'.",
      "علق الورقة لتذكرك بأن 'القيمة' أهم من 'السعر'."
    ],
    "steps_en": [
      "Divide paper into two columns: 'Low Price/High Value' and 'High Price/Low Value'.",
      "Fill 3 examples in each from your life.",
      "Ask: 'Why are some things very expensive though not useful?'.",
      "Hang it to remind you that 'Value' is more important than 'Price'."
    ],
    "outcome_ar": "بناء عقلية المستهلك الذكي الذي يبحث عن القيمة لا السعر.",
    "emoji": "💎"
  },
  {
    "id": "money_019",
    "title_ar": "استثمار المستقبل",
    "title_en": "Investing in the Future",
    "description_ar": "ما هو 'الاستثمار'؟ ليس فقط في الأسهم. الاستثمار هو: أن تضع مالاً/وقتاً/جهوداً اليوم لتحصل على منفعة أكبر غداً. (تعلم مهارة، شراء كتاب، دورة). اكتب استثماراً واحداً ستبدأه هذا الشهر.",
    "skill_focus": "فهم مفهوم الاستثمار",
    "activity_type": "تخطيط للنمو",
    "steps_ar": [
      "اسأل: 'ما الشيء الذي لو تعلمته أو اشتريته اليوم، سيفيدني لسنوات؟'.",
      "اكتبه وخطط لـ 'استثمار' فيه (وقت، مال، جهد).",
      "ضع تاريخاً لتحقيق هذا الاستثمار.",
      "تذكر: أفضل استثمار هو في نفسك."
    ],
    "steps_en": [
      "Ask: 'What if I learned or bought today, would benefit me for years?'.",
      "Write it and plan an 'investment' in it (time, money, effort).",
      "Set a date to achieve this investment.",
      "Remember: the best investment is in yourself."
    ],
    "outcome_ar": "تحويل مفهوم الاستثمار من فكرة الكبار إلى ممارسة شخصية مبكرة.",
    "emoji": "🚀"
  },
  {
    "id": "money_020",
    "title_ar": "شهادتي المالية",
    "title_en": "My Financial Certificate",
    "description_ar": "صمم 'شهادة خبير مالي صغير' لنفسك. اكتب فيها: 'أنا [اسمك]، أتقن: التوفير، التخطيط، التمييز بين الحاجة والرغبة'. وقعها وعلقها. أنت الآن مؤهل لإدارة مالك.",
    "skill_focus": "تتويج التعلم",
    "activity_type": "تصميم شهادة",
    "steps_ar": [
      "صمم شهادة جميلة على ورق مقوى.",
      "اكتب فيها 5 مهارات مالية أتقنتها من هذه الدروس.",
      "وقعها باسمك واسم أحد والديك 'كمراجع مالي'.",
      "علقها في غرفتك كتذكير أنك 'قائد مالي صغير'."
    ],
    "steps_en": [
      "Design a beautiful certificate on cardboard.",
      "Write 5 financial skills you've mastered from these lessons.",
      "Sign it with your name and a parent as 'Financial Reviewer'.",
      "Hang it in your room as a reminder you're a 'Young Financial Leader'."
    ],
    "outcome_ar": "الاحتفاء بالإنجاز التعليمي وبناء هوية 'المسؤول المالي' في الأسرة.",
    "emoji": "🏆"
  }
];
