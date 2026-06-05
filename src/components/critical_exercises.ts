export interface CriticalExercise {
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

export const CRITICAL_EXERCISES: CriticalExercise[] = [
  {
    "id": "critical_001",
    "title_ar": "رأي أم حقيقة؟",
    "title_en": "Opinion or Fact?",
    "description_ar": "تعلم الفرق بين الرأي (شيء تعتقده) والحقيقة (شيء يمكن إثباته). تدرب على تصنيف جمل مختلفة إلى 'رأي' أو 'حقيقة'.",
    "skill_focus": "التمييز بين الرأي والحقيقة",
    "activity_type": "تصنيف وتحليل",
    "steps_ar": [
      "اقرأ قائمة من 10 جمل (مثل: 'السماء زرقاء'، 'البيتزا لذيذة').",
      "اسأل نفسك: 'هل يمكنني إثبات هذه المعلومة بدليل؟'.",
      "صنف كل جملة إلى 'حقيقة' أو 'رأي'.",
      "قارن تصنيفك مع أحد أفراد أسرتك وناقش الاختلافات."
    ],
    "steps_en": [
      "Read a list of 10 sentences (e.g., 'The sky is blue', 'Pizza is delicious').",
      "Ask yourself: 'Can I prove this with evidence?'.",
      "Classify each as 'Fact' or 'Opinion'.",
      "Compare with a family member and discuss differences."
    ],
    "outcome_ar": "فهم أن ليس كل ما يقال صحيحاً بالضرورة.",
    "emoji": "🧐"
  },
  {
    "id": "critical_002",
    "title_ar": "أسئلة الصحفي الخمسة",
    "title_en": "The 5 Journalist Questions",
    "description_ar": "عندما تسمع خبراً أو قصة، اسأل: من؟ ماذا؟ أين؟ متى؟ لماذا؟ هذه الأسئلة تكشف الحقيقة الكاملة.",
    "skill_focus": "طرح الأسئلة الصحيحة",
    "activity_type": "استجواب النص",
    "steps_ar": [
      "اختر خبراً قصيراً من الإنترنت أو الجريدة.",
      "اكتب إجابات الأسئلة الخمسة بناءً على الخبر.",
      "إذا لم تجد إجابة أحد الأسئلة، فهذا يعني أن الخبر ناقص.",
      "اسأل نفسك: 'لماذا قد يخفي الكاتب بعض المعلومات؟'."
    ],
    "steps_en": [
      "Choose a short news story.",
      "Answer the five questions based on the story.",
      "If one answer is missing, the story is incomplete.",
      "Ask yourself: 'Why might the author hide some info?'."
    ],
    "outcome_ar": "تعلم تحليل أي محتوى بشكل نقدي ومنظم.",
    "emoji": "📰"
  },
  {
    "id": "critical_003",
    "title_ar": "لغز الأرقام المتسلسلة",
    "title_en": "Number Sequence Puzzle",
    "description_ar": "أكمل المتسلسلة: 2، 4، 8، 16، ؟ فكر في القاعدة التي تبنيها. هذا تدريب على التفكير المنطقي المتسلسل.",
    "skill_focus": "التفكير التسلسلي",
    "activity_type": "ألغاز رياضية",
    "steps_ar": [
      "انظر للمتسلسلة وحاول اكتشاف النمط.",
      "اكتب القاعدة التي وجدتها (مثلاً: كل رقم يضرب في 2).",
      "طبق القاعدة لإكمال المتسلسلة.",
      "اصنع متسلسلة خاصة بك وتحدى بها أحداً."
    ],
    "steps_en": [
      "Look at the sequence and find the pattern.",
      "Write down the rule you found (e.g., multiply by 2).",
      "Apply the rule to complete it.",
      "Create your own sequence and challenge someone."
    ],
    "outcome_ar": "تدريب العقل على اكتشاف الأنماط والقواعد الخفية.",
    "emoji": "🧮"
  },
  {
    "id": "critical_004",
    "title_ar": "حل المشكلة بالمقلوب",
    "title_en": "Reverse Problem Solving",
    "description_ar": "خذ مشكلة بسيطة (مثل: 'لماذا غرفتي غير مرتبة؟') وابدأ من النتيجة ثم عد للوراء خطوة بخطوة لتكتشف الأسباب الجذرية.",
    "skill_focus": "تحليل الأسباب الجذرية",
    "activity_type": "تفكير عكسي",
    "steps_ar": [
      "اكتب المشكلة في أعلى الورقة.",
      "اسأل: 'لماذا حدث هذا؟' واكتب الإجابة.",
      "خذ الإجابة واسأل عنها 'لماذا؟' مرة أخرى. كرر 5 مرات.",
      "ستكتشف أن السبب الجذري غالباً غير متوقع."
    ],
    "steps_en": [
      "Write the problem at the top.",
      "Ask: 'Why did this happen?' and write the answer.",
      "Take that answer and ask 'Why?' again. Repeat 5 times.",
      "You'll often find the root cause is unexpected."
    ],
    "outcome_ar": "فهم أن حل المشكلة يبدأ من جذورها لا من سطحها.",
    "emoji": "🔄"
  },
  {
    "id": "critical_005",
    "title_ar": "القاضي الصغير",
    "title_en": "The Little Judge",
    "description_ar": "استمع إلى شخصين يختلفان في الرأي. مهمتك: تلخيص حجة كل طرف بأمانة، ثم تحديد نقاط القوة والضعف في كلامهما.",
    "skill_focus": "الاستماع النقدي والتقييم",
    "activity_type": "تحليل حوار",
    "steps_ar": [
      "استمع لحوار أو نقاش (حقيقي أو من التلفاز).",
      "اكتب: 'الشخص الأول يعتقد أن...' و'الشخص الثاني يعتقد أن...'.",
      "ضع خطاً تحت الأدلة القوية، وخطاً متقطعاً تحت الادعاءات الضعيفة.",
      "شارك تحليلك مع أحد والديك."
    ],
    "steps_en": [
      "Listen to a debate (real or TV).",
      "Write: 'Person 1 believes...' and 'Person 2 believes...'.",
      "Underline strong evidence, dashed-underline weak claims.",
      "Share your analysis with a parent."
    ],
    "outcome_ar": "تعلم الاستماع بهدف الفهم والتقييم، لا بهدف الرد فقط.",
    "emoji": "⚖️"
  },
  {
    "id": "critical_006",
    "title_ar": "مخطط تدفق الصباح",
    "title_en": "Morning Flowchart",
    "description_ar": "ارسم 'خريطة خطوات' لروتينك الصباحي. استخدم أشكالاً: مستطيل للخطوات، معين للقرارات (مثلاً: هل أنا جائع؟). هذا تفكير برمجي!",
    "skill_focus": "التفكير الخوارزمي",
    "activity_type": "رسم خريطة تدفق",
    "steps_ar": [
      "اكتب كل خطوة من خطوات صباحك (استيقظ، اغسل وجهك...).",
      "ارسمها كمستطيلات متصلة بأسهم.",
      "أضف أسئلة قرار: 'هل لدي مدرسة اليوم؟' → نعم/لا → مساران مختلفان.",
      "علق المخطط لتتبعه يومياً."
    ],
    "steps_en": [
      "Write every step of your morning.",
      "Draw them as connected rectangles with arrows.",
      "Add decision questions: 'School today?' → Yes/No → two paths.",
      "Hang the chart and follow it daily."
    ],
    "outcome_ar": "تعلم أساسيات البرمجة بدون حاسوب، عبر تنظيم الحياة.",
    "emoji": "📊"
  },
  {
    "id": "critical_007",
    "title_ar": "ماذا لو؟",
    "title_en": "What If? Scenarios",
    "description_ar": "فكر في سيناريوهات 'ماذا لو' وحاول حلها منطقياً. 'ماذا لو انقطعت الكهرباء طوال اليوم؟' كيف ستتكيف؟",
    "skill_focus": "التفكير الافتراضي وحل المشكلات",
    "activity_type": "سيناريوهات افتراضية",
    "steps_ar": [
      "اختر سيناريو 'ماذا لو' مع العائلة.",
      "اكتب قائمة بكل المشاكل التي قد تحدث.",
      "بجانب كل مشكلة، اكتب حلاً منطقياً ممكنناً.",
      "ناقشوا: 'من صاحب أفضل خطة طوارئ؟'."
    ],
    "steps_en": [
      "Choose a 'What If' scenario with family.",
      "List all problems that might arise.",
      "Next to each, write a logical possible solution.",
      "Discuss: 'Who has the best emergency plan?'."
    ],
    "outcome_ar": "تدريب العقل على الاستعداد للمفاجآت والتفكير بهدوء.",
    "emoji": "❓"
  },
  {
    "id": "critical_008",
    "title_ar": "لغز القبعة والثلاثة",
    "title_en": "The Hat Puzzle",
    "description_ar": "ثلاثة أشخاص، قبعتان زرقاوان وقبعة حمراء. من يستطيع معرفة لون قبعته بالنظر للآخرين؟ فكر في الاحتمالات.",
    "skill_focus": "التفكير بالاحتمالات",
    "activity_type": "ألغاز منطقية",
    "steps_ar": [
      "اقرأ اللغز بتمعن.",
      "ارسم الاحتمالات الممكنة على ورقة.",
      "استبعد الاحتمالات المستحيلة خطوة بخطوة.",
      "اشرح حلّك لشخص آخر وتأكد من منطقيته."
    ],
    "steps_en": [
      "Read the puzzle carefully.",
      "Draw possible scenarios on paper.",
      "Eliminate impossible ones step by step.",
      "Explain your solution to someone and verify its logic."
    ],
    "outcome_ar": "تنمية القدرة على التفكير المنطقي والتجريدي.",
    "emoji": "🎩"
  },
  {
    "id": "critical_009",
    "title_ar": "الإعلان الصادق",
    "title_en": "The Honest Advertisement",
    "description_ar": "شاهد إعلاناً تجارياً. اسأل: 'ما الذي يحاول بيعُه؟' 'ما الذي لا يقوله؟' 'هل الصورة مبالغ فيها؟' اكتب تحليلك.",
    "skill_focus": "تحليل الرسائل الإعلانية",
    "activity_type": "تحليل إعلامي",
    "steps_ar": [
      "اختر إعلاناً واحداً.",
      "اكتب: 'المنتج يدّعي أن... لكنه لم يذكر...'.",
      "لاحظ الألوان والموسيقى: كيف تؤثر على مشاعرك?.",
      "صمم 'إعلاناً صادقاً' للمنتج نفسه."
    ],
    "steps_en": [
      "Choose one ad.",
      "Write: 'The product claims... but it didn't mention...'.",
      "Notice colors and music: how do they affect your emotions?",
      "Design an 'honest ad' for the same product."
    ],
    "outcome_ar": "بناء مناعة ضد التلاعب الإعلاني.",
    "emoji": "📢"
  },
  {
    "id": "critical_010",
    "title_ar": "تقسيم المشكلة",
    "title_en": "Chunking the Problem",
    "description_ar": "خذ مشكلة كبيرة (تنظيف البيت كله). قسمها لأجزاء صغيرة جداً (الغرفة 1، الغرفة 2...). ثم قسمها أكثر (سرير، مكتب...).",
    "skill_focus": "تجزئة المشكلات",
    "activity_type": "تخطيط تنفيذي",
    "steps_ar": [
      "اكتب مشكلة كبيرة في دائرة.",
      "ارسم منها 3 أسهم إلى 3 مشكلات أصغر.",
      "من كل مشكلة صغيرة، ارسم 3 أسهم أخرى لأجزاء أصغر.",
      "أنهِ بأجزاء يمكن تنفيذها في 5 دقائق."
    ],
    "steps_en": [
      "Write a big problem in a circle.",
      "Draw 3 arrows to 3 smaller problems.",
      "From each, draw 3 more arrows to even smaller parts.",
      "End with parts solvable in 5 minutes."
    ],
    "outcome_ar": "التغلب على الإرهاق بتقسيم أي تحدي كبير.",
    "emoji": "🧩"
  },
  {
    "id": "critical_011",
    "title_ar": "القاضي المنطقي",
    "title_en": "The Logical Judge",
    "description_ar": "اقرأ حكاية قصيرة فيها خلاف بين شخصيتين. قرر من المخطئ ومن المصيب بناءً على الأدلة في النص فقط، لا على تعاطفك.",
    "skill_focus": "اتخاذ قرار بناءً على الأدلة",
    "activity_type": "قراءة نقدية",
    "steps_ar": [
      "اقرأ قصة خلاف قصيرة.",
      "ضع خطاً تحت أي دليل في النص.",
      "اكتب حكمك: 'أعتقد أن [فلان] محق لأن النص يقول...'.",
      "تأكد أن حكمك مبني على أدلة وليس مشاعر."
    ],
    "steps_en": [
      "Read a short conflict story.",
      "Underline any evidence in the text.",
      "Write your verdict: 'I believe [X] is right because the text says...'.",
      "Ensure your verdict is evidence-based, not emotion-based."
    ],
    "outcome_ar": "تعلم الفصل بين العاطفة والمنطق في الأحكام.",
    "emoji": "👨‍⚖️"
  },
  {
    "id": "critical_012",
    "title_ar": "لغز الاختيار الصعب",
    "title_en": "The Hard Choice Puzzle",
    "description_ar": "معضلة أخلاقية: أنت طبيب، لديك دواء واحد فقط، ومريضان يحتاجانه. من تختار؟ ولماذا؟ اشرح منطقك.",
    "skill_focus": "الاستدلال الأخلاقي والمنطقي",
    "activity_type": "مناظرة داخلية",
    "steps_ar": [
      "اقرأ المعضلة بهدوء.",
      "اكتب أسباب اختيار كل مريض.",
      "اختر مريضاً واحداً واكتب جملة واحدة تشرح 'لماذا' بناءً على المنطق.",
      "ناقش اختيارك مع العائلة واستمع لوجهات نظرهم."
    ],
    "steps_en": [
      "Read the dilemma calmly.",
      "Write reasons to choose each patient.",
      "Choose one and write one sentence explaining 'Why' based on logic.",
      "Discuss your choice with family and hear their views."
    ],
    "outcome_ar": "فهم أن بعض المشكلات لها حلول صعبة، والمهم هو التفكير المنطقي.",
    "emoji": "🤔"
  },
  {
    "id": "critical_013",
    "title_ar": "الادعاء والدليل",
    "title_en": "Claim and Evidence",
    "description_ar": "عندما يقول أحدهم شيئاً، اسأل: 'ما دليلك؟'. تدرب على هذا في حواراتك. لا تقبل أي ادعاء بدون دليل.",
    "skill_focus": "المطالبة بالأدلة",
    "activity_type": "ممارسة حوارية",
    "steps_ar": [
      "في أي حوار اليوم، اسأل مرة واحدة على الأقل: 'ما دليلك على ذلك؟'.",
      "اسمع الرد بهدوء.",
      "إذا لم يكن هناك دليل، قل: 'إذاً هذا رأيك، وليس حقيقة مثبتة'.",
      "لاحظ كيف يتغير مستوى الحوار."
    ],
    "steps_en": [
      "In any conversation today, ask at least once: 'What's your evidence?'.",
      "Listen to the reply calmly.",
      "If no evidence, say: 'So that's your opinion, not a proven fact'.",
      "Notice how the conversation quality changes."
    ],
    "outcome_ar": "بناء عادة المطالبة بالأدلة كمفكر نقدي.",
    "emoji": "🔍"
  },
  {
    "id": "critical_014",
    "title_ar": "لعبة 20 سؤالاً",
    "title_en": "20 Questions Game",
    "description_ar": "فكر في شيء. على الآخرين تخمينه بـ 20 سؤالاً فقط. يجب أن تكون أسئلتهم ذكية (تبدأ بـ 'هل هو حي؟' لا 'هل هو تفاحة؟').",
    "skill_focus": "طرح أسئلة استراتيجية",
    "activity_type": "لعبة عائلية",
    "steps_ar": [
      "اختر شيئاً في ذهنك.",
      "دع الآخرين يسألون أسئلة 'نعم/لا' فقط.",
      "شجعهم على طرح أسئلة عامة تضيق الاحتمالات أولاً.",
      "ناقشوا بعد اللعبة: 'ما السؤال الأذكى الذي سُئل؟'."
    ],
    "steps_en": [
      "Pick something in mind.",
      "Let others ask only 'Yes/No' questions.",
      "Encourage broad questions first to narrow down possibilities.",
      "Discuss after: 'What was the smartest question asked?'."
    ],
    "outcome_ar": "تعلم فن طرح الأسئلة التي تقود إلى الحل.",
    "emoji": "🎲"
  },
  {
    "id": "critical_015",
    "title_ar": "تفكيك الشائعة",
    "title_en": "Debunking a Rumor",
    "description_ar": "اسمع شائعة منتشرة (في المدرسة أو الإنترنت). طبق عليها الأسئلة الخمسة وأسأل عن الأدلة. هل تصمد الشائعة؟",
    "skill_focus": "التحقق من المعلومات",
    "activity_type": "تحري",
    "steps_ar": [
      "فكر في شائعة سمعتها مؤخراً.",
      "اكتب كل 'الأدلة' التي سمعتها عنها.",
      "ابحث (مع والديك) عن مصدر موثوق ينفيها أو يؤكدها.",
      "اكتب خلاصة: 'هذه شائعة لأن...' أو 'هذه حقيقة لأن...'."
    ],
    "steps_en": [
      "Think of a rumor you heard recently.",
      "Write all 'evidence' you heard about it.",
      "Research (with parents) a reliable source denying or confirming it.",
      "Write conclusion: 'This is a rumor because...' or 'This is true because...'."
    ],
    "outcome_ar": "أن تصبح محققاً في المعلومات لا ناقلاً لها.",
    "emoji": "🛡️"
  },
  {
    "id": "critical_016",
    "title_ar": "التفكير الجانبي",
    "title_en": "Lateral Thinking",
    "description_ar": "لغز: 'رجل دفع فندقاً بـ 100 دولار. لم يتكلم معه أحد. عرف أنه معجب بالفندق. كيف؟' (لأنه دفع نقداً وليس ببطاقة). فكر خارج الصندوق.",
    "skill_focus": "التفكير الإبداعي",
    "activity_type": "ألغاز غير تقليدية",
    "steps_ar": [
      "اقرأ اللغز ولا تبحث عن الحل مباشرة.",
      "اكتب 5 حلول 'مجنونة' محتملة.",
      "اسأل نفسك: 'ما هو الافتراض الخفي الذي أحمله؟'.",
      "قارن حلك بالحل الحقيقي وتعلم من طريقة التفكير."
    ],
    "steps_en": [
      "Read the puzzle, don't search for answer directly.",
      "Write 5 'crazy' possible solutions.",
      "Ask: 'What hidden assumption am I holding?'.",
      "Compare your solution with the real one and learn the thinking method."
    ],
    "outcome_ar": "الخروج من الصندوق الضيق للتفكير التقليدي.",
    "emoji": "💡"
  },
  {
    "id": "critical_017",
    "title_ar": "برمجة الروبوت البشري",
    "title_en": "Programming a Human Robot",
    "description_ar": "أخوك الصغير 'روبوت'. اكتب له 'كوداً' (تعليمات دقيقة) لعمل شطيرة. لا تنس أي خطوة. إذا أخطأت التعليمات، سيفشل الروبوت!",
    "skill_focus": "الدقة في إعطاء التعليمات",
    "activity_type": "لعبة محاكاة برمجة",
    "steps_ar": [
      "اجلب أخاك أو أحد أفراد أسرتك.",
      "اكتب تعليمات 'صنع شطيرة' خطوة بخطوة.",
      "يجب على 'الروبوت' تنفيذ ما تكتبه حرفياً.",
      "إذا أخطأ، أصلح 'الكود' وأعد المحاولة."
    ],
    "steps_en": [
      "Bring your sibling or family member.",
      "Make a sandwich' instructions step by step.",
      "The 'robot' must execute exactly what you wrote.",
      "If it goes wrong, debug the 'code' and retry."
    ],
    "outcome_ar": "فهم عميق لأهمية الدقة في التفكير والتعليمات.",
    "emoji": "🤖"
  },
  {
    "id": "critical_018",
    "title_ar": "معضلة القطار",
    "title_en": "The Trolley Problem",
    "description_ar": "قطار مندفع، 5 عمال على السكة. يمكنك تحويله ليسلك سكة فيها عامل واحد. ماذا تفعل؟ ناقش سبب اختيارك مع العائلة.",
    "skill_focus": "التفكير الأخلاقي المعقد",
    "activity_type": "مناقشة فلسفية",
    "steps_ar": [
      "اقرأ المعضلة لجميع أفراد الأسرة.",
      "كل فرد يكتب قراره وسببه بصمت.",
      "اكشفوا عن إجاباتكم وناقشوا بهدوء.",
      "تذكر: لا توجد إجابة 'صحيحة' واحدة."
    ],
    "steps_en": [
      "Read the dilemma to all family members.",
      "Everyone writes their decision and reason silently.",
      "Reveal answers and discuss calmly.",
      "Remember: there is no single 'right' answer."
    ],
    "outcome_ar": "التدرب على التفكير في العواقب الأخلاقية للقرارات.",
    "emoji": "🚃"
  },
  {
    "id": "critical_019",
    "title_ar": "استراتيجية 'ماذا، لماذا، كيف'",
    "title_en": "What, Why, How Strategy",
    "description_ar": "عند مواجهة أي مشكلة، طبق: ماذا حدث؟ (التعريف)، لماذا حدث؟ (التحليل)، كيف نحل؟ (الحل). جربها على مشكلة حقيقية.",
    "skill_focus": "منهجية حل المشكلات",
    "activity_type": "تطبيق عملي",
    "steps_ar": [
      "اختر مشكلة صغيرة في حياتك.",
      "اكتب: 'ماذا حدث؟' بجملة واحدة واضحة.",
      "اكتب: 'لماذا حدث؟' بأكبر عدد من الأسباب الممكنة.",
      "اكتب: 'كيف أحل؟' بـ 3 خطوات عملية."
    ],
    "steps_en": [
      "Choose a small real-life problem.",
      "Write: 'What happened?' in one clear sentence.",
      "Write: 'Why did it happen?' with as many causes as possible.",
      "Write: 'How to solve?' with 3 actionable steps."
    ],
    "outcome_ar": "اكتساب منهجية ثابتة لمواجهة أي مشكلة.",
    "emoji": "📝"
  },
  {
    "id": "critical_020",
    "title_ar": "شهادة المفكر النقدي",
    "title_en": "Critical Thinker Certificate",
    "description_ar": "صمم شهادة 'مفكر نقدي معتمد' لنفسك. اكتب فيها 5 مهارات اكتسبتها. سلمها لأحد والديك ليوقعها 'كراعٍ رسمي للتفكير'.",
    "skill_focus": "تتويج التعلم",
    "activity_type": "احتفال",
    "steps_ar": [
      "صمم شهادة جميلة.",
      "اكتب 5 مهارات تعلمتها (مثل: التمييز بين الرأي والحقيقة...).",
      "اطلب من أحد والديك التوقيع.",
      "علق الشهادة في مكان دراستك."
    ],
    "steps_en": [
      "Design a beautiful certificate.",
      "Write 5 skills you learned (e.g., distinguishing fact from opinion...).",
      "Ask a parent to sign.",
      "Hang it in your study area."
    ],
    "outcome_ar": "الاحتفاء بالتحول إلى مفكر نقدي واعٍ.",
    "emoji": "🎓"
  }
];
