// Unit 2 Part 3: Critical (20), Innov (20), Art (20), Life (20)

export interface GenericExercise {
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

// 9. CRITICAL THINKING UNIT 2 (20 Exercises)
export const CRITICAL_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "مختبر تمييز الحقيقة عن الرأي", en: "Fact vs Opinion Detective" },
    { ar: "تحليل الأسباب الجذرية (لماذا 5 مرات)", en: "Root Cause 5 Whys Analysis" },
    { ar: "اكتشاف المغالطات المنطقية الشائعة", en: "Spotting Logical Fallacies" },
    { ar: "تحدي تقييم المصادر والمصداقية", en: "Source Credibility Evaluation" },
    { ar: "دراسة الحالة وصنع القرار المعقد", en: "Complex Case Study Decision" },
    { ar: "لعبة القبعات السبع للتفكير", en: "Seven Thinking Hats Game" },
    { ar: "تفكيك التحيزات الفكرية المسبقة", en: "Deconstructing Cognitive Biases" },
    { ar: "مختبر التحليل العلمي للتجارب", en: "Scientific Method Analysis" },
    { ar: "مناظرة الرأي والرأي الآخر بالمنطق", en: "Structured Debate & Evidence" },
    { ar: "حل الألغاز والشفريات المعقدة", en: "Complex Cipher & Logic Puzzles" },
    { ar: "مخطط السبب والأثر (عظمة السمكة)", en: "Fishbone Cause & Effect Diagram" },
    { ar: "تحدي كشف الأخبار المضللة", en: "Fake News Detection Challenge" },
    { ar: "استكشاف السيناريوهات المستقبيلة", en: "Future Scenario Planning" },
    { ar: "اختبار الفرضيات والتفكير النقدي", en: "Testing Hypotheses & Evidence" },
    { ar: "مختبر نقد الحلول وتقييم المخاطر", en: "Critiquing Solutions & Risks" },
    { ar: "تمرين المنطق الرياضي الاستنتاجي", en: "Mathematical Logic Deduction" },
    { ar: "التحليل المالي والنقدي للعروض", en: "Critical Evaluation of Offers" },
    { ar: "استكشاف التناقضات في الحجج", en: "Finding Argument Contradictions" },
    { ar: "مختبر التفكير المنظومي المترابط", en: "Systems Thinking Lab" },
    { ar: "ميثاق المفكر النقدي الحكيم", en: "Wise Critical Thinker Charter" }
  ];

  const emojis = ["🧐", "🔍", "🧠", "📖", "⚖️", "🎩", "👁️", "🔬", "🗣️", "🧩", "🐟", "📰", "🔮", "🧪", "🛡️", "🔢", "🏷️", "❌", "🌐", "📜"];

  return {
    id: `critical_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين تفكير تحليلي متقدم لـ ${titles[i].ar} لبناء عقلية نقدية واعية ومحصنة ضد الخداع.`,
    skill_focus: "التحليل وصنع القرار المعقد",
    activity_type: "تحليل وحل ألغاز منهرية",
    steps_ar: [
      "حلل المشكلة أو الادعاء المعروض بعناية.",
      "افصل الحقائق الثابتة عن الآراء والتخمينات.",
      "طرح أسئلة عميقة للوصول إلى الحقيقة والجذور.",
      "صغ قرارك المنطقي بناءً على الأدلة البراهين."
    ],
    steps_en: [
      "Analyze the problem or claim carefully.",
      "Separate verifiable facts from assumptions.",
      "Ask deep probing questions to find the root.",
      "Formulate a logical decision supported by evidence."
    ],
    outcome_ar: "امتلاك نضج عقلي وقدرة على التحليل المحايد وصنع قرارات رشيدة.",
    emoji: emojis[i]
  };
});

// 10. INNOVATION UNIT 2 (20 Exercises)
export const INNOV_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "تطبيق التفكير التصميمي (Design Thinking)", en: "Design Thinking Framework" },
    { ar: "مختبر العصف الذهني خارج الصندوق", en: "Out of the Box Brainstorming" },
    { ar: "بناء نموذج نمذجة أولية (Prototype)", en: "Rapid Prototyping Workshop" },
    { ar: "دمج شيئين متباعدين لابتكار جديد", en: "Combining Dissimilar Concepts" },
    { ar: "تحدي إعادة استغلال المواد المهملة", en: "Upcycling Innovation Challenge" },
    { ar: "ابتكار حل لمنظومة المواصلات", en: "Smart Mobility Solution Idea" },
    { ar: "تصميم تطبيق ذكي خيالي للمستقبل", en: "Futuristic App Design Mockup" },
    { ar: "مختبر هندسة الألعاب التعليمية", en: "Educational Game Engineering" },
    { ar: "تحدي اختراع أداة تسعد كبار السن", en: "Elderly Care Helper Innovation" },
    { ar: "تصميم الهوية البصرية وشعار المبتكر", en: "Visual Identity & Logo Creation" },
    { ar: "مختبر خريطة التعاطف مع المستخدم", en: "User Empathy Mapping Lab" },
    { ar: "ابتكار منتج صديق للبيئة", en: "Eco-Friendly Green Product" },
    { ar: "تطبيق استراتيجية SCAMPER للتطوير", en: "SCAMPER Innovation Method" },
    { ar: "تحدي تحسين أداة منزلية مستعملة", en: "Home Tool Redesign Challenge" },
    { ar: "مختبر تسعير وتكلفة النموذج الأولي", en: "Cost & Pricing Model Lab" },
    { ar: "عروض الابتكار القاطعة للأفكار", en: "Innovation Pitch Presentation" },
    { ar: "ابتكار روبوت مساعد في الأعمال", en: "Helper Robot Design Concept" },
    { ar: "تحدي حماية أفكار الملكية الفكرية", en: "Intellectual Property Protection" },
    { ar: "مختبر اختبار أفكار المستخدمين", en: "User Testing & Feedback Loops" },
    { ar: "ميثاق المخترع والمبتكر الشغوف", en: "Passionate Innovator Charter" }
  ];

  const emojis = ["💡", "🚀", "🛠️", "🔀", "♻️", "🚗", "📱", "🎮", "👴", "🎨", "❤️", "🌱", "🔄", "🏠", "💵", "🎤", "🤖", "🛡️", "🧪", "🏆"];

  return {
    id: `innov_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `وراش ابتكار وتصميم عملية تهدف لـ ${titles[i].ar} وتحويل الأفكار إلى واقع ملموس.`,
    skill_focus: "التفكير التصميمي والابتكار الربيعي",
    activity_type: "ورشة عمل وابتكار أفكار",
    steps_ar: [
      "افهم المشكلة أو حاجة المستخدم بعمق وتعاطف.",
      "ولد عدداً كبيراً من الأفكار الجريئة بمرونة.",
      "صمم مجسماً أو خطة أولية تعبر عن فكرتك.",
      "اعرض ابتكارك واستقبل الملاحظات لتطويره."
    ],
    steps_en: [
      "Understand the user problem deeply with empathy.",
      "Generate a multitude of bold creative ideas.",
      "Build a quick prototype or sketch of your idea.",
      "Present your innovation and iterate based on feedback."
    ],
    outcome_ar: "تحفيز الحس الابتكاري والقدرة على تحويل التحديات لفرص واعدة.",
    emoji: emojis[i]
  };
});

// 11. ART UNIT 2 (20 Exercises)
export const ART_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "النقد الجمالي للوحات الفنية الشامخة", en: "Aesthetic Criticism of Masterpieces" },
    { ar: "نسج الاستعارات البيانية والأدبية", en: "Weaving Literary Metaphors" },
    { ar: "المسرح الإبداعي وتجسيد الشخصيات", en: "Creative Theater & Character Acting" },
    { ar: "نحت المشاعر باستخدام الصلصال", en: "Sculpting Emotions with Clay" },
    { ar: "ترتيل قصيدة من نبض الطبيعة", en: "Reciting Nature Poetry" },
    { ar: "مختبر الرسم بأسلوب التجريد الأنيق", en: "Abstract Artistic Expression" },
    { ar: "كتابة سيناريو فيلم قصير ملهم", en: "Inspiring Short Film Screenplay" },
    { ar: "تصميم جدارية السلام والأمل", en: "Peace & Hope Mural Design" },
    { ar: "تجسيد الفولكلور والتراث الأصيل", en: "Heritage & Folklore Artistry" },
    { ar: "مختبر تناسق الألوان والمشاعر", en: "Color Harmony & Emotional Moods" },
    { ar: "فن الخط العربي والزخرفة الإسلامية", en: "Arabic Calligraphy & Geometry" },
    { ar: "صناعة الدمى وتأليف الحكايات", en: "Puppet Making & Storytelling" },
    { ar: "التصوير الفوتوغرافي وزوايا الضوء", en: "Photography & Light Angles" },
    { ar: "تأليف مقطع موسيقي إيقاعي لطيف", en: "Composing Gentle Rhythmic Music" },
    { ar: "تصميم الغلاف الجذاب للكتب", en: "Captivating Book Cover Design" },
    { ar: "فن الموزاييك والفسيفساء الملونة", en: "Colorful Mosaic Mosaic Art" },
    { ar: "تحدي الرسم التعبيري الكاريكاتيري", en: "Expressive Caricature Sketching" },
    { ar: "معرض الفن المنزلي المصغر", en: "Mini Home Art Exhibition" },
    { ar: "تذوق الأدب العالمي والشعر العربي", en: "World Literature & Arabic Poetry" },
    { ar: "ميثاق الفنان والإدراك الجمالي", en: "Artist & Aesthetic Mind Charter" }
  ];

  const emojis = ["🎨", "✍️", "🎭", "🏺", "🌿", "🖼️", "🎬", "🎨", "🕌", "🌈", "✒️", "🧸", "📷", "🎵", "📚", "🧩", "✏️", "🏛️", "📖", "🌸"];

  return {
    id: `art_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين تذوق وإبداع فني يركز على ${titles[i].ar} لتنمية الحس الجمالي والتعبير الرائع.`,
    skill_focus: "النقد الجمالي والإبداع الأدبي",
    activity_type: "تأمل وتعبير فني وأدبي",
    steps_ar: [
      "تأمل التحفة الفنية أو الفكرة الأدبية بقلبك.",
      "اختر وسيلتك التعبيرية (رسم، شعر، تمثيل، خط).",
      "صمم لوحتك أو نصك الفني بلمستك الخاصة.",
      "شارك عملك الفني مع أسرتك واستمتع بجمال التعبير."
    ],
    steps_en: [
      "Contemplate the artwork or literary prompt sincerely.",
      "Choose your artistic medium (paint, poem, act, script).",
      "Create your piece with your unique touch.",
      "Share your art with family and celebrate beauty."
    ],
    outcome_ar: "الارتقاء بالذوق العام والقدرة على التعبير الجمالي الراقي.",
    emoji: emojis[i]
  };
});

// 12. LIFE SKILLS UNIT 2 (20 Exercises)
export const LIFE_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "إدارة طوارئ السلامة والحريق", en: "Fire & Safety Emergency Response" },
    { ar: "مختبر الإسعافات الأولية وتضميد الجراح", en: "First Aid & Wound Care Workshop" },
    { ar: "صيانة الأدوات المنزلية البسيطة", en: "Basic Home Hardware Repair" },
    { ar: "التخطيط لوجبة صحية طازجة متكاملة", en: "Planning Balanced Healthy Meal" },
    { ar: "تحدي تنظيم المساحة وإدارة الفوضى", en: "Space Organization & Declutter" },
    { ar: "استخدام أدوات السلامة والوقاية", en: "Safety Gear & Protection Use" },
    { ar: "إتيكيت التعامل واللباقة الاجتماعية", en: "Etiquette & Social Courtesy" },
    { ar: "مختبر العناية بالنباتات والحدائق", en: "Plant Care & Gardening Skills" },
    { ar: "إعداد قائمة الاستعداد للسفر والرحلات", en: "Travel Packing & Safety Prep" },
    { ar: "التعامل مع انقطاع الكهرباء والخدمات", en: "Handling Power Outages Calmly" },
    { ar: "العناية الشخصية والنظافة المستدامة", en: "Personal Hygiene & Self-Care" },
    { ar: "إعادة تدوير وفرز النفايات المنزلية", en: "Home Waste Sorting & Recycling" },
    { ar: "مختبر الوعي المروري والسلامة", en: "Traffic Safety & Pedestrian Awareness" },
    { ar: "صناعة منظفات آمنة وصديقة للبيئة", en: "Safe Eco-Friendly Cleaning Mix" },
    { ar: "تحدي الطهي الآمن للوجبات الخفيفة", en: "Safe Snack Cooking Challenge" },
    { ar: "إدارة الوقت اليومي وبناء الجدول", en: "Daily Routine & Time Table" },
    { ar: "التعامل الشجاع مع الحيوانات الأليفة", en: "Pet Care & Gentle Handling" },
    { ar: "إتقان مهام الغسيل والكي والترتيب", en: "Laundry, Ironing & Clothing Care" },
    { ar: "تمرين استدعاء أرقام الطوارئ بمهارة", en: "Emergency Hotline Speed Drill" },
    { ar: "ميثاق بطل الحياة المستقل والمسئول", en: "Independent Life Champion Charter" }
  ];

  const emojis = ["🛡️", "🩹", "🔧", "🥗", "🧹", "🥽", "🤝", "🌱", "🧳", "💡", "🧼", "♻️", "🚦", "🧽", "🍳", "⏰", "🐱", "👔", "📞", "🦸"];

  return {
    id: `life_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين مهارات حيوية عملية يركز على ${titles[i].ar} لبناء استقلالية تامة وقدرة على الاعتماد الذاتي.`,
    skill_focus: "السلامة المتقدمة وإدارة الطوارئ",
    activity_type: "تطبيق عملي منزلي",
    steps_ar: [
      "اقرأ إرشادات السلامة والأمان قبل التدريب.",
      "جهز الأدوات المطلوبة بمساعدة وتوجيه الأسرة.",
      "نفذ المهمة الحياتية بدقة وإتقان وحذر.",
      "تأكد من نظافة المكان وترتيب كافة الأدوات."
    ],
    steps_en: [
      "Read safety guidelines carefully before start.",
      "Prepare required items with adult supervision.",
      "Execute the practical task safely and neatly.",
      "Clean up the workspace and store tools properly."
    ],
    outcome_ar: "بناء الاعتماد على النفس والتصرف الحكيم والسريع في كافة مواقف الحياة.",
    emoji: emojis[i]
  };
});
