export interface CapstoneIdea {
  id: number;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  badgeAr: string;
  badgeEn: string;
  iconName: string;
  summaryAr: string;
  summaryEn: string;
  targetAudienceAr: string;
  targetAudienceEn: string;
  keyFeaturesAr: string[];
  aiIntegrationsAr: string[];
  recommendedTech: string[];
  samplePromptAr: string;
  defaultPRDAr: {
    problemStatement: string;
    solutionOverview: string;
    targetUsers: string;
    coreModules: string[];
    aiServicesUsed: string[];
    dataFlow: string;
    commercialModel: string;
  };
  simulatedAppConfig: {
    bannerTitle: string;
    bannerSub: string;
    features: { title: string; desc: string; badge: string }[];
    aiActionLabel: string;
    sampleAiOutput: string;
  };
}

export const CAPSTONE_PROJECT_IDEAS: CapstoneIdea[] = [
  {
    id: 1,
    titleAr: "منصة المساعد التعليمي الذكي (AI Study Copilot)",
    titleEn: "AI Study Copilot & Quiz Generator",
    categoryAr: "التعليم والتدريب الذكي (EdTech)",
    categoryEn: "EdTech & Smart Learning",
    badgeAr: "الأكثر طلباً 🌟",
    badgeEn: "Top Rated 🌟",
    iconName: "GraduationCap",
    summaryAr: "موقع ويب يرفع الطلاب إليه ملفات PDF والكتب الدراسية لتوليد ملخصات بصرية، وبطاقات استذكار، واختبارات تفاعلية، ومساعد شات صوتي يختبر حفظ الفهم.",
    summaryEn: "A web platform where students upload study PDFs to generate summaries, flashcards, quizzes, and voice study sessions.",
    targetAudienceAr: "طلاب المدارس، الجوامع، والمعلمون الراغبون بإنشاء مواد تفاعلية بكفاءة عالية.",
    targetAudienceEn: "School & University students and educators.",
    keyFeaturesAr: [
      "رفع الكتب وتلخيص المناهج بنقرة واحدة",
      "مولد البطاقات الاستذكارية التفاعلية (Flashcards Engine)",
      "إنشاء اختبارات قصيرة متعددة الخيارات مع شرح فوري للإجابات",
      "شات بوت محاكاة المعلم الخصوصي الذكي"
    ],
    aiIntegrationsAr: [
      "Gemini 2.5 Flash للتلخيص وتحليل المستندات الضخمة",
      "Gemini Multimodal لقراءة المخططات والجداول في الكتب",
      "Text-to-Speech لقراءة الملخصات صوتياً"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "PDF.js", "Lucide Icons"],
    samplePromptAr: "صمّم موقعاً لخدمة الطلاب باسم (StudyGenius AI). يحتاج المستخدم لرفع ملف المادة، فيقوم الذكاء الاصطناعي بتنظيف النص واستخراج 10 أسئلة اختيار من متعدد و5 بطاقات مراجعة مع لوحة تحكم لقياس الفهم.",
    defaultPRDAr: {
      problemStatement: "يعاني الطلاب من تشتت الوقت أثناء قراءة المناهج الطويلة وصعوبة قياس استيعابهم قبل الامتحانات.",
      solutionOverview: "منصة ويب خفيفة تقوم بتفكيك المحتوى الدراسي تحليلياً وتحويله لبطاقات تفاعلية واختبارات ذكية فورية.",
      targetUsers: "طلاب المرحلة الثانوية والجامعية والطلاب المتقدمون للاختبارات القياسية.",
      coreModules: [
        "صفحة هبوط جذابة وبوابة رفع المستندات",
        "لوحة التلخيص والتحليل المفاهيمي",
        "معمل الاختبارات والتقييم المباشر",
        "واجهة البطاقات الاستذكارية المقلوبة (Flip Cards)"
      ],
      aiServicesUsed: ["Gemini Text & Multimodal API", "Web Speech API"],
      dataFlow: "رفع المستند ⬅️ استخراج النص ⬅️ معالجة Gemini API ⬅️ توزيع النتائج على لوحة الاختبار والبطاقات",
      commercialModel: "اشتراك مجاني لـ 3 كتب شهرياً، وباقة مدفوعة Unlimited للطلاب والمؤسسات."
    },
    simulatedAppConfig: {
      bannerTitle: "مساعدك الدراسي الذكي - StudyGenius AI",
      bannerSub: "ارفع أي كتاب أو مذكرة دراسية واحصل على ملخص شامل واختبار تفاعلي خلال 5 ثوانٍ!",
      features: [
        { title: "ملخص المادة", desc: "استخراج الأفكار الرئيسية في نقاط ذهبية مرتبة", badge: "ذكي ⚡" },
        { title: "اختبار قياس الفهم", desc: "10 أسئلة تفاعلية مع شرح الإجابة الصحيحة", badge: "تفاعلي 🎯" },
        { title: "بطاقات الاستذكار", desc: "بطاقات تقلب تفاعلية للمراجعة السريعة", badge: "تكرار متباعد 🧠" }
      ],
      aiActionLabel: "توليد ملخص واختبار تجريبي الآن",
      sampleAiOutput: "تم تلخيص المادة بنجاح! المفاهيم الأساسية: 1. معمارية المحولات (Transformers). 2. آلية الانتباه الذاتي (Self-Attention). 3. ضبط المعلمات الفائقة. درجة صعوبة الاختبار المتوقعة: متوسط."
    }
  },
  {
    id: 2,
    titleAr: "منصة التسويق وصانع المحتوى الذكي (AI Content & Marketing Studio)",
    titleEn: "AI Content & Marketing Studio",
    categoryAr: "التجارة والأعمال والإنتاجية (Business & SaaS)",
    categoryEn: "Business & E-Commerce",
    badgeAr: "عالي القيمة التجارية 💼",
    badgeEn: "Commercial Value 💼",
    iconName: "TrendingUp",
    summaryAr: "تطبيق ويب متكامل يتيح لأصحاب المتاجر والمشاريع إدخال فكرة المنتج لتوليد حملة تسويقية كاملة: منشورات منصات التواصل، إعلانات مقنعة، وشعارات مرئية.",
    summaryEn: "An all-in-one marketing generator for e-commerce stores creating social posts, ad copy, and visuals.",
    targetAudienceAr: "أصحاب المتاجر الإلكترونية، رواد الأعمال، والمسوقون الرقميون.",
    targetAudienceEn: "E-commerce owners, startups & digital marketers.",
    keyFeaturesAr: [
      "توليد منشورات إكس وتيك توك وإنستغرام بنبرات متعددة",
      "صانع نصوص الإعلانات الممولة المقنعة (Ad Copy Generator)",
      "توليد الصور الترويجية للمنتجات بالذكاء الاصطناعي",
      "جدولة الحملات التسويقية وحساب عائد الاستثمار (ROI Calculator)"
    ],
    aiIntegrationsAr: [
      "Gemini Flash لنصوص الإعلانات والمنشورات",
      "Imagen / Midjourney لإنشاء صور المنتجات والبوسترات",
      "Gemini Structured Output لتوليد تقويم محتوى كامل (Content Calendar)"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "Recharts"],
    samplePromptAr: "صمم موقعاً باسم (MarketAI Hub). يتيح للمستخدم إدخال اسم منتجه (مثلاً: عطر خليجي فاخر)، ليقوم الموقع بتوليد 5 نصوص إعلانية، خطة منشورات لمدة أسبوع، ووصف زمني لإعلان فيديو قصير.",
    defaultPRDAr: {
      problemStatement: "تستهلك كتابة المحتوى الإعلاني وتجهيز الحملات التسويقية ميزانيات ضخمة وأوقاتاً طويلة من أصحاب المتاجر الناشئة.",
      solutionOverview: "استوديو تسويق رقمي ذكي يولد جدول محتوى إعلاني وتسويقي متكامل خلال دقائق معدودة.",
      targetUsers: "أصحاب المتاجر على زد وسلة وصناع المحتوى التجاري.",
      coreModules: [
        "محلل المنتج ونبرة العلامة التجارية",
        "مولد منشورات وسائل التواصل الاجتماعي",
        "مصمم بوسترات المنتجات الإعلانية",
        "تقويم الجدولة والتصدير بنقرة واحدة"
      ],
      aiServicesUsed: ["Gemini API", "Image Generation Skill"],
      dataFlow: "بيانات المنتج ⬅️ خوارزمية هندسة المطالبات ⬅️ خطة الحملة الإعلانية والنصوص والصور",
      commercialModel: "نموذج اشتراك شهري مع تجربة 7 أيام مجانية."
    },
    simulatedAppConfig: {
      bannerTitle: "استوديو التسويق الذكي - MarketAI Hub",
      bannerSub: "حوّل منتجك إلى حملة تسويقية ناجحة مع نصوص إعلانية وصور احترافية بنقرة زر!",
      features: [
        { title: "نصوص إعلانية مقنعة", desc: "صياغة إعلانات بأسلوب AIDA وPAS التسويقي", badge: "مبيعات 📈" },
        { title: "جدول محتوى أسبوعي", desc: "7 منشورات جاهزة للنشر بالنبرة الخليجية المناسبة", badge: "جدولة 🗓️" },
        { title: "صانع صور المنتجات", desc: "خلفيات فاخرة للمنتجات بدقة عالية", badge: "ابتكار 🎨" }
      ],
      aiActionLabel: "توليد حملة تسويقية كاملة للمنتج",
      sampleAiOutput: "عنوان الإعلان المقترح: 'أصالة العطور الخليجية بين يديك ✨'. النص الإعلاني: 'هل تبحث عن حضور يسبق خطواتك؟ اكتشف مزيج العود والصندل النادر. اطلب الآن مع خصم 20% لفترة محدودة!'"
    }
  },
  {
    id: 3,
    titleAr: "أكاديمية تعليم اللغات التفاعلية (AI Speech & Language Academy)",
    titleEn: "AI Speech & Language Academy",
    categoryAr: "التعليم والتدريب الذكي (EdTech)",
    categoryEn: "EdTech & Smart Learning",
    badgeAr: "محادثة شفهية 🎤",
    badgeEn: "Voice AI 🎤",
    iconName: "MessageSquare",
    summaryAr: "موقع لتعلّم وممارسة اللغات الأجنبية (مثل الإنجليزية) عبر محاكاة مواقف واقعية (مطار، مطعم، مقابلة عمل) مع شات بوت شفهي وصوتي يصحح الأخطاء فوراً.",
    summaryEn: "An interactive language learning portal providing simulated real-life spoken scenarios and live grammar feedback.",
    targetAudienceAr: "الراغبون بتطوير التحدث باللغات، الطلاب، والمسافرون للخارج.",
    targetAudienceEn: "Language learners, travelers, and job seekers.",
    keyFeaturesAr: [
      "محادثات شفهية تفاعلية بأسلوب السيناريو الواقعي (Scenario Roleplay)",
      "تحليل ومحي الأخطاء القواعدية والنطقية فورياً (Instant Grammar Fix)",
      "قاموس بلمسة واحدة يترجم الكلمات الصعبة ويضعها في جمل",
      "بطاقات تقدم ودرجات طلاقة اللسان (Fluency Score)"
    ],
    aiIntegrationsAr: [
      "Gemini Live / Audio API للتحدث الشفهي مع المتعلم",
      "Gemini Flash لتصحيح القواعد وتوضيح الفرق اللغوي",
      "Web Speech API للتعرف على الصوت وقراءته"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Web Speech API", "Gemini API"],
    samplePromptAr: "ابنِ منصة تعلّم لغات باسم (TalkNative AI). تتيح للمتدرب اختيار سيناريو (طلب قهوة في نيويورك)، ثم تبدأ محادثة صوتية تفاعلية مع إبراز أي خطأ لغوي وتزويده بالصياغة الأفضل.",
    defaultPRDAr: {
      problemStatement: "يعاني أغلب متعلمي اللغات من الخجل وصعوبة إيجاد شريك يتحدث معهم بالإنجليزية يومياً دون إحراج.",
      solutionOverview: "بيئة آمنة وذكية للمحادثات الصافية الشفهية محاكية للمواقف الحقيقية مع تقييم دقيق للطاقة اللغوية.",
      targetUsers: "المبتدئون والمتوسطون في تعلم اللغة الإنجليزية واللغات الحية.",
      coreModules: [
        "مكتبة سيناريوهات الحياة اليومية",
        "غرفة المحادثة الصوتية والنصية الحية",
        "مستكشف الأخطاء القواعدية والمفردات",
        "مؤشر الطلاقة ومستوى CEFR"
      ],
      aiServicesUsed: ["Gemini Speech & Multimodal API", "SpeechRecognition API"],
      dataFlow: "تسجيل صوت الطالب ⬅️ تحويل لنص ⬅️ معالجة Gemini لتوليد الرد وتصحيح القواعد ⬅️ نطق الرد تقنياً",
      commercialModel: "اشتراك مجاني لـ 5 سيناريوهات، واشتراك ذهبي للتدريب المفتوح."
    },
    simulatedAppConfig: {
      bannerTitle: "أكاديمية المحادثة اللغوية - TalkNative AI",
      bannerSub: "تمارس الإنجليزية مع معلم الذكاء الاصطناعي في سيناريوهات واقعية واحصل على طلاقة حقيقية!",
      features: [
        { title: "سيناريوهات واقعية", desc: "مقابلة عمل، حجز فندق، طلب طعام، وسفر", badge: "محاكاة ✈️" },
        { title: "تصحيح لغوي فوري", desc: "تحديد القواعد الخاطئة واقتراح البديل الطبيعي", badge: "دقيق 🎯" },
        { title: "قياس طلاقة النطق", desc: "تحليل سرعة النطق ومخارج الحروف", badge: "صوتي 🎤" }
      ],
      aiActionLabel: "بدء محاكاة محادثة طلب القهوة (Coffee Shop)",
      sampleAiOutput: "AI Barista: 'Hello! Welcome to Starbucks. What can I get started for you today?'\nالمستخدم: 'I want small coffee please.'\nتطوير القواعد: يفضل قول 'I'd like a small coffee, please' لتبدو أكثر لباقة ورسمية."
    }
  },
  {
    id: 4,
    titleAr: "مستشار اللياقة والتغذية الذكي (AI Nutrition & Workout Coach)",
    titleEn: "AI Nutrition & Workout Coach",
    categoryAr: "الصحة والنمط الحيوي (Health & Wellness)",
    categoryEn: "Health & Fitness",
    badgeAr: "مبتكر وصحي 🥗",
    badgeEn: "Health Tech 🥗",
    iconName: "HeartPulse",
    summaryAr: "تطبيق ويب يحلل الوجبات من خلال الصور أو الوصف النصي، ويحسب السعرات والماكروز، ويصمم جدول تمارين وجدولاً غذائياً أسبوعياً مخصصاً لهدف المستخدم.",
    summaryEn: "A health web app analyzing food photos/descriptions to calculate calories, macros, and design personalized meal/workout plans.",
    targetAudienceAr: "ممارسو الرياضة، متبعو الحميات الغذائية، ومن يبحثون عن نمط حياة صحي.",
    targetAudienceEn: "Fitness enthusiasts, dietitians, and active individuals.",
    keyFeaturesAr: [
      "تحليل صور الوجبات بالرؤية الحاسوبية وحساب السعرات الحرارية",
      "توليد جدول غذائي أسبوعي متكامل يناسب التفضيلات العربية والرجيم",
      "مصمم برامج الرياضة المنزلية والنادي بحسب اللياقة",
      "مساعد شات الإجابة على استفسارات التغذية والبدائل الصحية"
    ],
    aiIntegrationsAr: [
      "Gemini Multimodal Vision للتعرف على محتويات طبق الطعام",
      "Gemini Flash لتصميم الجداول الغذائية المتوازنة",
      "Recharts لرسم منحنى الوزن والتقدم الأسبوعي"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini Vision API", "Recharts"],
    samplePromptAr: "أنشئ تطبيق ويب باسم (NutriFit AI). يتيح رفع صورة لطبق الغداء، ليقوم بتحديد المكونات (أرز، دجاج، سلطة)، تقدير السعرات، واقتراح بديل صحي لتقليل الكربوهيدرات.",
    defaultPRDAr: {
      problemStatement: "صعوبة حساب السعرات الحرارية بدقة للوجبات العربية التقليدية وعدم إمكانية تحمّل تكاليف مدرب ومدرب تغذية خاص.",
      solutionOverview: "مدرب صحي ذكي يتوفر في الجيب لتقييم الوجبات وتصميم الجداول الرياضية والغذائية الشاملة.",
      targetUsers: "الرياضيون، الراغبون في إنقاص أو زيادة الوزن، والمهتمون بالتغذية الصحية.",
      coreModules: [
        "الماكينات البصرية لتحليل الوجبة (Meal Scanner)",
        "صانع الجدول الغذائي والتمارين",
        "لوحة متابعة السعرات والوزن",
        "المستشار التغذوي الذكي"
      ],
      aiServicesUsed: ["Gemini 2.5 Vision API", "Nutrition Dataset"],
      dataFlow: "صورة الوجبة ⬅️ تحليل Gemini Vision ⬅️ استخراج المكونات ⬅️ حساب السعرات واقتراح التوصيات",
      commercialModel: "مجاني مع الخطة الأساسية، واشتراك للمزايا المتقدمة وتتبع مؤشرات الجسم."
    },
    simulatedAppConfig: {
      bannerTitle: "مدرب التغذية واللياقة - NutriFit AI",
      bannerSub: "صور وجبتك واستلم تحليلاً فورياً للسعرات الحرارية والماكروز مع برنامج تدريبي متكامل!",
      features: [
        { title: "ماسح الوجبات بالصورة", desc: "التعرف الذكي على الوجبات العربية والعالمية", badge: "رؤية حاسوبية 📸" },
        { title: "برنامج التغذية المخصص", desc: "وجبات يومية حسب طولك ووزنك وهدفك الصحي", badge: "شخصي 🥑" },
        { title: "مخطط التمارين المنزلية", desc: "تمارين بالفيديو التوضيحي وبدون أدوات", badge: "رياضي 🏋️‍♂️" }
      ],
      aiActionLabel: "تحليل طبق كبسة الدجاج (صورة توضيحية)",
      sampleAiOutput: "النتائج التقديرية للطبق:\n- المكونات: أرز بسمتي (200جم)، صدر دجاج مشوي (150جم)، سلطة خضراء.\n- إجمالي السعرات: 520 كالوري (بروتين: 42جم | كربوهيدرات: 58جم | دهون: 12جم).\n💡 نصيحة الكابتن: وجبة ممتازة غنية بالبروتين! يُنصح باستبدال الأرز الأبيض بأرز بني أو زيادة السلطة لخيار ألياف أفضل."
    }
  },
  {
    id: 5,
    titleAr: "شات بوت خدمة العملاء والمبيعات الذكي (AI Smart Support & Sales Bot)",
    titleEn: "AI Smart Support & Sales Bot",
    categoryAr: "التجارة والأعمال والإنتاجية (Business & SaaS)",
    categoryEn: "Business & E-Commerce",
    badgeAr: "مطلوب للشركات 🤖",
    badgeEn: "Enterprise Bot 🤖",
    iconName: "Bot",
    summaryAr: "تطبيق ويب يتيح لأصحاب الأعمال إدخال معلومات مشروعهم أو رابط موقعهم لإنشاء شات بوت خدمة عملاء ومبيعات مخصص يمكن تضمينه في موقعهم الإلكتروني.",
    summaryEn: "A web platform enabling business owners to feed product data and generate a customized customer service & sales widget.",
    targetAudienceAr: "الشركات الناشئة، المتاجر الإلكترونية، والعيادات والخدمات المحلية.",
    targetAudienceEn: "E-commerce stores, startups, and service providers.",
    keyFeaturesAr: [
      "تغذية الشات بوت بكتالوج المنتجات والأسئلة الشائعة (Knowledge Base)",
      "تخصيص لون ونبرة وشخصية المساعد الذكي بما يناسب الهوية",
      "الرد الفوري على الاستفسارات وتوجيه العميل لإنهاء الشراء",
      "لوحة تحكم لتحليل أسئلة العملاء والتقارير الأسبوعية"
    ],
    aiIntegrationsAr: [
      "Gemini System Instructions للالتزام بقواعد الشركة",
      "Gemini Context Caching لمعالجة أدلة المنتجات الضخمة",
      "Embeddable Widget Script لتنسيق كود التضمين"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "Express Server"],
    samplePromptAr: "صمم موقعاً باسم (CustBot AI). يتيح للمستخدم كتابة اسم متجره وسياسته (الاسترجاع خلال 14 يوماً، الشحن خلال يومين)، ليولد نافذة محادثة تفاعلية تجيب العميل كأنها موظف خدمة عملاء خبير.",
    defaultPRDAr: {
      problemStatement: "تأخر الرد على استفسارات العملاء في المتاجر يؤدي لضياع المبيعات وارتفاع تكاليف الموظفين.",
      solutionOverview: "شات بوت ذكي يتعلم سرياً قواعد المتجر ويجيب العملاء بدقة بدلاً من موظف الدعم التقليدي.",
      targetUsers: "المتاجر الرقمية والعيادات ومقدمو الخدمات الحرة.",
      coreModules: [
        "مدير قاعدة المعرفة (Product & Policy Builder)",
        "منشئ الشخصية والتخصيص البصري",
        "معمل اختبار المحادثات الحية",
        "كود التضمين للمواقع (JS Widget Code)"
      ],
      aiServicesUsed: ["Gemini Flash API", "System Prompts"],
      dataFlow: "استفسار العميل ⬅️ مطابقة السياسات والمنتجات ⬅️ صياغة رد دقيق ولطيف ⬅️ إرسال للعميل",
      commercialModel: "اشتراك بحسب عدد المحادثات الشهرية."
    },
    simulatedAppConfig: {
      bannerTitle: "بوت خدمة العملاء والمبيعات - CustBot AI",
      bannerSub: "أدخل معلومات متجرك واحصل على بوت خدمة عملاء ذكي يجيب 24/7 ويضاعف مبيعاتك!",
      features: [
        { title: "تغذية البيانات بسهولة", desc: "أدخل الأسئلة الشائعة والسياسات في دقائق", badge: "سهل ⚡" },
        { title: "شخصية ونبرة براندك", desc: "تحديد نبرة حديث رسمية أو وديدة مع العميل", badge: "هوية 🎨" },
        { title: "تضمين في موقعك", desc: "كود بسيط ينسخ ويلصق في أي متجر سلة أو ووردبريس", badge: "تكامل 🔗" }
      ],
      aiActionLabel: "اختبار البوت مع متجر 'أناقة العود'",
      sampleAiOutput: "العميل: 'كم يستغرق التوصيل للرياض وهل يوجد استرجاع؟'\nCustBot: 'أهلاً بك في متجر أناقة العود! 🌸 التوصيل داخل الرياض يتم خلال 24 إلى 48 ساعة عمل. كما نسعد بتقديم سياسة استرجاع مجانية خلال 14 يوماً من استلام الطلب. هل تحب أساعدك باختيار عودك المفضل اليوم؟'"
    }
  },
  {
    id: 6,
    titleAr: "محاكي المقابلات ومستشار السير الذاتية (AI CV & Mock Interviewer)",
    titleEn: "AI CV & Mock Interviewer Platform",
    categoryAr: "الابتكار والخدمات المبتكرة (Innovative Services)",
    categoryEn: "Career & HR Tech",
    badgeAr: "مستقبل التوظيف 👔",
    badgeEn: "Career Tech 👔",
    iconName: "Briefcase",
    summaryAr: "منصة ذكية تحلل السيرة الذاتية وتطابقها مع الوظيفة المستهدفة، ثم تبدأ مقابلة عمل صوتية/نصية محاكاة وتقيم أداء المتقدم مع نقاط القوة والضعف.",
    summaryEn: "An AI career builder analyzing CVs, matching target job descriptions, and orchestrating voice/text mock interviews with full feedback.",
    targetAudienceAr: "الخريجون الجدد، الباحثون عن عمل، والراغبون بتغيير المسار المهني.",
    targetAudienceEn: "Job seekers, fresh graduates, and career changers.",
    keyFeaturesAr: [
      "فحص السيرة الذاتية عبر نظام ATS المقبول لدى الشركات",
      "محاكاة مقابلة عمل تفاعلية بناءً على المسمى الوظيفي المستهدف",
      "تقييم إجابات المتقدم وإعطاء نصائح تحسين لغة الجسد والنبرة",
      "صانع السيرة الذاتية الاحترافية القابلة للتحميل PDF"
    ],
    aiIntegrationsAr: [
      "Gemini Multimodal للتحليل الهيكلي لملفات السيرة الذاتية",
      "Gemini System Instruction لتقمص دور مدير التوظيف الصارم",
      "Speech-to-Text لمعالجة الإجابات الشفهية"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "jspdf"],
    samplePromptAr: "صمم موقعاً باسم (HirePrep AI). يتيح للمستخدم كتابة المسمى الوظيفي (مثلاً: مهندس ذكاء اصطناعي)، فيبدأ الموقع بطرح 5 أسئلة تقنية وسلوكية متدرجة الصعوبة ويقيم إجابته بنسبة مئوية.",
    defaultPRDAr: {
      problemStatement: "خوف الخريجين من المقابلات الوظيفية وعدم معرفتهم بآلية فحص السير الذاتية بواسطة أنظمة الـ ATS.",
      solutionOverview: "مدرب توظيف افتراضي يجهز المتقدم لمقابلات الشركات العالمية ويوجه إجاباته بدقة احترافية.",
      targetUsers: "الطلاب والخريجون والباحثون عن فرص عمل أفضل.",
      coreModules: [
        "فاحص ومحسن السيرة الذاتية (ATS Analyzer)",
        "غرفة محاكاة المقابلات الشفهية",
        "تقييم الإجابات ومؤشر الجاهزية",
        "تصدير السيرة الذاتية القوالب المقبولة"
      ],
      aiServicesUsed: ["Gemini 2.5 Flash API", "PDF Parsing"],
      dataFlow: "بيانات الوظيفة والسيرة ⬅️ تحليل الفجوة ⬅️ توليد أسئلة المقابلة ⬅️ تقييم الإجابات وإصدار التقرير",
      commercialModel: "مقابلة مجانية واحدة، واشتراك مفتوح لإجراء مقابلات بلا حدود."
    },
    simulatedAppConfig: {
      bannerTitle: "منصة التجهيز للمقابلات - HirePrep AI",
      bannerSub: "حلل سيرتك الذاتية واجرِ مقابلة عمل افتراضية مع مدير توظيف الذكاء الاصطناعي لتضمن وظيفتك!",
      features: [
        { title: "مطابقة نظام ATS", desc: "معرفة نسبة قبول سيرتك الذاتية في نظام الشركات", badge: "توظيف 📊" },
        { title: "مقابلة عمل محاكاة", desc: "أسئلة سلوكية وتقنية مخصصة لمجالك", badge: "تفاعلي 🎯" },
        { title: "تقرير التقييم والتوصيات", desc: "نقاط القوة والإجابات النماذجية المحسنة", badge: "تقرير 📝" }
      ],
      aiActionLabel: "بدء مقابلة تجريبية لوظيفة (مطور frontend)",
      sampleAiOutput: "المقابِل الذكي: 'أهلاً بك! دعنا نبدأ. اشرح لي كيف تقوم بإدارة حالة التطبيق (State Management) في مشروع React ضخم وكيف تتعامل مع إيقاف إعادة التقديم غير الضرورية (Re-renders)؟'\nالتقييم المتوقع: السؤال يختبر الفهم العميق لـ React Hooks والمعالجة الأداء."
    }
  },
  {
    id: 7,
    titleAr: "منصة تخطيط الرحلات والسياحة الذكية (AI Smart Travel Planner)",
    titleEn: "AI Smart Travel Planner",
    categoryAr: "الابتكار والخدمات المبتكرة (Innovative Services)",
    categoryEn: "Travel & Hospitality",
    badgeAr: "ممتع وتفاعلي ✈️",
    badgeEn: "Travel Tech ✈️",
    iconName: "MapPin",
    summaryAr: "موقع ويب يخطط رحلات سياحية كاملة باليوم والدقيقة بناءً على الميزانية، عدد الأيام، الاهتمامات (عائلية، مغامرة، تسوق)، حالة الطقس، والخريطة.",
    summaryEn: "An intelligent travel planner generating day-by-day customized travel itineraries based on budget, preferences, and local events.",
    targetAudienceAr: "المسافرون، العائلات، عشاق الرحلات والاستكشاف.",
    targetAudienceEn: "Travelers, families, and solo explorers.",
    keyFeaturesAr: [
      "توليد الجدول السياحي اليومي المقسم (صباح، ظهر، مساء)",
      "حساب الميزانية التقديرية للرحلة (تذاكر، مواصلات، مطاعم)",
      "خريطة تفاعلية بالفعاليات وأفضل الأماكن القريبة",
      "دليل النصائح الثقافية وحالة الطقس والتجهيزات المطلوبة"
    ],
    aiIntegrationsAr: [
      "Gemini Flash لتصميم الجداول السياحية الدقيقة",
      "Google Maps Grounding لربط الفعاليات بخرائط حقيقية",
      "JSON Mode لتشكيل الجدول في بطاقات قابلة للتعديل"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "Leaflet / Maps API"],
    samplePromptAr: "صمم موقعاً باسم (VoyageAI). يدخل فيه المسافر الوجهة (طوكيو)، المدة (7 أيام)، الميزانية (متوسطة)، والاهتمامات (أنمي وطعام)، فينشئ خطة يومية مفصلة مع أماكن مطاعم ومقاهي موصى بها.",
    defaultPRDAr: {
      problemStatement: "تستغرق الترتيبات للرحلات السياحية وتصفح المنتديات ساعات طويلة مع صعوبة ضبط الميزانية وتنظيم الوقت.",
      solutionOverview: "مرشد سياحي ذكي يصمم خطة سفر مفصلة تناسب شغف المسافر وميزانيته في ثوانٍ.",
      targetUsers: "المخططون للرحلات العائلية والرحلات الشبابية.",
      coreModules: [
        "محلل رغبات المسافر والميزانية",
        "جدول الرحلة اليومي التفاعلي",
        "حاسبة التكاليف التقديرية",
        "تصدير الخطة لـ PDF أو مشاركتها عبر واتساب"
      ],
      aiServicesUsed: ["Gemini API Grounding", "Maps Integration"],
      dataFlow: "مدخلات الرحلة ⬅️ معالجة Gemini ⬅️ خطة مبوبة بالخرائط والمواعيد ⬅️ العرض التفاعلي",
      commercialModel: "خطة مجانية لجدول رحلة واحدة، واشتراك للمسافرين الدائمين."
    },
    simulatedAppConfig: {
      bannerTitle: "مخطط الرحلات الذكي - VoyageAI",
      bannerSub: "صمم جدول رحلتك السياحية القادمة في ثوانٍ بناءً على ميزانيتك واهتماماتك الخاصة!",
      features: [
        { title: "جدول يومي مفصل", desc: "ترتيب الأماكن السياحية حسب القرب الجغرافي", badge: "منظم 🗺️" },
        { title: "حاسبة الميزانية", desc: "توزيع المصاريف على السكن والطعام والتذاكر", badge: "مالي 💰" },
        { title: "توصيات المطاعم", desc: "مطاعم حلال ومقاهي ممتازة بالقرب من جولاتك", badge: "طعام 🍜" }
      ],
      aiActionLabel: "توليد خطة سفر لـ (دبي - 3 أيام عائلية)",
      sampleAiOutput: "الخطة المقترحة:\n- اليوم 1: صباحاً: زيارة متحف المستقبل. عصراً: جولة دبي مول والنافورة. مساءً: عشاء في برج خليفة.\n- الميزانية التقديرية اليومية: 450 درهم للشخص.\n💡 نصيحة سفر: يُفضل حجز تذاكر متحف المستقبل مسبقاً إلكترونياً لتجنب الازدحام."
    }
  },
  {
    id: 8,
    titleAr: "منصة التدوين والدعم النفسي (AI Mental Wellness Companion)",
    titleEn: "AI Mental Wellness & Journaling Hub",
    categoryAr: "الصحة والنمط الحيوي (Health & Wellness)",
    categoryEn: "Health & Fitness",
    badgeAr: "راحة وإيجابية 🌿",
    badgeEn: "Wellness 🌿",
    iconName: "Smile",
    summaryAr: "موقع ويب يساعد على متابعة المزاج اليومي، وتدوين الأفكار بطريقة موجهة، وتقليل التوتر عبر تمارين تنفس تفاعلية وإرشادات دعم إيجابي.",
    summaryEn: "A mental health platform tracking daily mood, offering guided journaling, breathing exercises, and supportive AI dialogue.",
    targetAudienceAr: "الأفراد الذين يعانون من ضغوط العمل أو الدراسة ويبحثون عن واحة استرخاء وتفريغ ذهني.",
    targetAudienceEn: "Anyone dealing with stress or seeking daily mindfulness.",
    keyFeaturesAr: [
      "متابع المزاج اليومي بالرسوم البيانية البصرية (Mood Tracker)",
      "التدوين اليومي الموجه بالتأمل والأسئلة الإيجابية (Guided Journaling)",
      "تمارين التنفس العميق والتهدئة التفاعلية بصرياً وصوتياً",
      "صديق الاستماع الذكي الودود والمحفز"
    ],
    aiIntegrationsAr: [
      "Gemini System Prompt بالنبرة الدافئة والمشجعة",
      "Sentiment Analysis لتشخيص انطباع التدوينة",
      "Recharts لرسم منحنى الحالة المزاجية عبر الأسابيع"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "Framer Motion"],
    samplePromptAr: "أنشئ تطبيق تدوين ذكي باسم (AuraWellness). يكتب فيه المستخدم مشاعره اليومية، فيحلل الذكاء الاصطناعي المشاعر، يقدم اقتباساً محفزاً، ويتيح تمرين تنفس مرئي مدته 60 ثانية.",
    defaultPRDAr: {
      problemStatement: "تزايد ضغوط الحياة والعمل بدون وجود مساحة آمنة لتفريغ المشاعر وممارسة التفكير الإيجابي.",
      solutionOverview: "واحة استرخاء رقمية تقدم تدويناً موجهاً ودعماً وديداً يعزز الصحة النفسية والذهنية.",
      targetUsers: "الموظفون والطلاب ومن يبحثون عن التوازن والسلام الداخلي.",
      coreModules: [
        "سجل المزاج البصري",
        "المحرر الذكي للتدوين الموجه",
        "واجهة تمارين التنفس والتأمل",
        "محتوى التحفيز والتأملات اليومية"
      ],
      aiServicesUsed: ["Gemini Emotion Analysis", "Safety Content Rules"],
      dataFlow: "نص التدوينة ⬅️ تحليل المشاعر ⬅️ توليد التوجيه الإيجابي والتأمل ⬅️ تحديث لوحة المزاج",
      commercialModel: "مجاني بالكامل مع خيارات تخصيص ثيمات الاسترخاء."
    },
    simulatedAppConfig: {
      bannerTitle: "واحة السلام والتدوين - AuraWellness",
      bannerSub: "فرّغ أفكارك واكتشف التوازن الداخلي مع التدوين الموجه وتمارين التنفس الذكية!",
      features: [
        { title: "تدوين موجه ولطيف", desc: "أسئلة تساعدك على اكتشاف الامتنان والإنجازات", badge: "تأمل 🧘" },
        { title: "تحليل المشاعر التلقائي", desc: "فهم العوامل المؤثرة على مزاجك الأسبوعي", badge: "تحليلي 📈" },
        { title: "تمارين التنفس البصرية", desc: "دائرة تنفس موجهة لتقليل القلق والتوتر", badge: "استرخاء 🍃" }
      ],
      aiActionLabel: "كتابة تدوينة عن إنجاز اليوم مع تحليل المزاج",
      sampleAiOutput: "تحليل الشعور: امتنان وفخر هادئ (Gratitude 85%).\nرسالة Aura: 'أنت تقوم بعمل رائع! تذكر أن كل خطوة صغيرة تخطوها اليوم هي بناء لمستقبل أجمل. خذ نفساً عميقاً واستمتع بسلام هذه اللحظة.'"
    }
  },
  {
    id: 9,
    titleAr: "مولد قصص الأطفال التفاعلية المصورة (Interactive Kids Story Studio)",
    titleEn: "Interactive Kids Story Studio",
    categoryAr: "التعليم والتدريب الذكي (EdTech)",
    categoryEn: "EdTech & Kids",
    badgeAr: "ممتع وتربوي 📚",
    badgeEn: "Kids & Family 📚",
    iconName: "Sparkles",
    summaryAr: "منصة تتيح للوالدين والمعلمين كتابة اسم الطفل والقيمة المراد تعزيزها (الصدق، الشجاعة، القراءة)، فيولد الذكاء الاصطناعي قصة مصورة ومسموعة باللغة العربية.",
    summaryEn: "A platform generating personalized illustrated audio stories for kids reinforcing values like honesty & courage.",
    targetAudienceAr: "الوالدان، المعلمون في رياض الأطفال، ومربو الأجيال.",
    targetAudienceEn: "Parents, kindergarten teachers, and educators.",
    keyFeaturesAr: [
      "توليد قصة مخصصة بررواية اسم الطفل وهواياته",
      "صنع صور توضيحية خيالية تناسب أحداث القصة",
      "قراءة صوتية معبرة للقصة (Audio Narrator)",
      "تصدير القصة في كتاب رقمي مصور printable PDF"
    ],
    aiIntegrationsAr: [
      "Gemini Flash لتأليف القصص التربوية المشوقة",
      "Image Generation Skill لرسم الشخصيات الكرتونية",
      "Web Speech API للقراءة الصوتية التفاعلية"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "Image Skill"],
    samplePromptAr: "أنشئ تطبيق قصص أطفال باسم (StoryLand AI). يتيح إدخال اسم الطفل (سارة) والقيمة (التعاون)، فيكتب قصة قصيرة من 3 مشاهد، ويرسم صورة كرتونية لكل مشهد مع خيار الاستماع.",
    defaultPRDAr: {
      problemStatement: "ندرة المحتوى العربي المخصص والأخلاقي التفاعلي الموجه للأطفال بشكل جذّاب وممتع.",
      solutionOverview: "استوديو قصص ذكي يحول القيم التربوية إلى حكايات مصورة ومسموعة يكون الطفل هو بطلها.",
      targetUsers: "الأمهات والآباء والأطفال من عمر 4 إلى 10 سنوات.",
      coreModules: [
        "منشئ أبطال القصة والقيم التربوية",
        "مستعرض القصة المصورة التفاعلي",
        "قارئ القصة الصوتي التفاعلي",
        "مكتبة قصصي المفضلة والتصدير"
      ],
      aiServicesUsed: ["Gemini Creative Writing", "Imagen / Canvas Skill", "Audio Speech"],
      dataFlow: "اسم الطفل والقيمة ⬅️ تأليف القصة ⬅️ رسم المشاهد البصرية ⬅️ دمج القراءة الصوتية",
      commercialModel: "قصتان مجاناً أسبوعياً، واشتراك مفتوح للعائلات والمدارس."
    },
    simulatedAppConfig: {
      bannerTitle: "عالم قصص الأطفال - StoryLand AI",
      bannerSub: "صمّم قصة تربوية مصورة ومسموعة يكون طفلك بطلها الفائز والقائد فيها!",
      features: [
        { title: "بطولة الطفل المخصصة", desc: "دخول الطفل باسمه ورسوماته المفضلة في المغامرة", badge: "شخصي 🌟" },
        { title: "مشاهد مصورة جذابّة", desc: "رسومات كرتونية آمنة عالية الجودة", badge: "بصري 🎨" },
        { title: "سرد صوتي دافئ", desc: "قراءة معبرة تناسب نوم الأطفال والتعلم", badge: "صوتي 🎧" }
      ],
      aiActionLabel: "توليد قصة (البطلة سارة والقلعة الشجاعة)",
      sampleAiOutput: "المشهد 1: كانت سارة تحب مساعدة أصدقائها في المدرسة. وفي يوم من الأيام، وجدوا زهرة صغيرة تحتا للماء...\nالدرس التربوي: 'الرحمة والتعاون يصنعان المعجزات!'"
    }
  },
  {
    id: 10,
    titleAr: "منصة تحليل الفواتير والبيانات المالية (AI Finance & Invoice Dashboard)",
    titleEn: "AI Finance & Invoice Dashboard",
    categoryAr: "التجارة والأعمال والإنتاجية (Business & SaaS)",
    categoryEn: "Business & Finance",
    badgeAr: "دقة وتحليل 📊",
    badgeEn: "FinTech 📊",
    iconName: "BarChart3",
    summaryAr: "منصة ويب ترفع إليها الشركات الفواتير والمستندات المالية لتستخرج البيانات تلقائياً، وتحسب الأرباح والمصروفات، وتقدم توصيات بالذكاء الاصطناعي لزيادة الربحية.",
    summaryEn: "An automated financial portal parsing invoices, categorizing expenses, and generating predictive AI financial dashboards.",
    targetAudienceAr: "المحاسبون، أصحاب المتاجر، ومدراء الشؤون المالية بالشركات.",
    targetAudienceEn: "Small businesses, accountants, and finance managers.",
    keyFeaturesAr: [
      "مسح الفواتير بالذكاء الاصطناعي واستخراج الضريبة والمبالغ (OCR)",
      "تصنيف المصروفات والإيرادات تلقائياً في فئات مرتبة",
      "توقع الأرباح المستقبيلة بناءً على بيانات الأشهر السابقة",
      "لوحات قيادة تفاعلية مع رسوم بيانية وتنبيهات الهدر المالي"
    ],
    aiIntegrationsAr: [
      "Gemini Multimodal OCR لقراءة الفواتير الضريبية",
      "Gemini Structured JSON لتوليد التقرير المالي",
      "Recharts للرسوم البيانية المتقدمة"
    ],
    recommendedTech: ["React 18", "Tailwind CSS", "Gemini API", "Recharts"],
    samplePromptAr: "صمم تطبيق ويب باسم (FinData AI). يتيح رفع صورة فاتورة، لاستخراج اسم المورد، التاريخ، الضريبة، والمبلغ الإجمالي، وعرضها في جدول ولوحة رسم بياني مع اقتراحات لتقليل المصاريف.",
    defaultPRDAr: {
      problemStatement: "تستغرق الإدخالات اليدوية للفواتير والمصاريف المالية أوقاتاً طويلة وتحدث فيها أخطاء بشرية.",
      solutionOverview: "لوحة مالية ذكية تستخرج الفواتير تلقائياً وتقدم نصائح مالية تزيد من الأرباح التنافسية.",
      targetUsers: "المؤسسات الصغيرة والمتوسطة والمحاسبون المستقلون.",
      coreModules: [
        "الماسح الذكي للفواتير (Invoice OCR)",
        "جدول الإيرادات والمصروفات",
        "لوحة القيادة والمؤشرات التنبؤية",
        "توصيات خفض المصاريف المالية"
      ],
      aiServicesUsed: ["Gemini OCR Vision", "Structured Output Engine"],
      dataFlow: "رفع الفاتورة ⬅️ القراءة البصرية ⬅️ التبويب المحاسبي ⬅️ تحديث الرسم البياني للأرباح",
      commercialModel: "اشتراك مجاني لـ 20 فاتورة شهرياً، وباقات مرنة للمؤسسات."
    },
    simulatedAppConfig: {
      bannerTitle: "اللوحة المالية الذكية - FinData AI",
      bannerSub: "ارفع فواتيرك ومستنداتك المالية واحصل على تقرير أرباح ومصروفات تلقائي فوراً!",
      features: [
        { title: "قراءة الفواتير تلقائياً", desc: "استخراج المبالغ والضريبة المضافة بنقرة", badge: "OCR 📄" },
        { title: "توقع نمو الأرباح", desc: "تحليل الاتجاهات المباشرة والتنبؤ المالي", badge: "تنبؤي 📈" },
        { title: "تنبيهات خفض المصاريف", desc: "اكتشاف الاشتراك والمصاريف المكررة", badge: "توفير 💵" }
      ],
      aiActionLabel: "تحليل فاتورة المشتريات المرفوعة",
      sampleAiOutput: "تم استخراج بيانات الفاتورة:\n- المورد: شركة التقنية للتوريد\n- المبلغ الخاضع للضريبة: 1,000 ر.س | الضريبة (15%): 150 ر.س | الإجمالي: 1,150 ر.س\n💡 الملاحظة المالية: تم تسجيل ارتفاع بنسبة 12% في مصاريف التوريد هذا الشهر مقارنة بالشهر السابق."
    }
  }
];
