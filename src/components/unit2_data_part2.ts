// Unit 2 Part 2: Leadership (20), Teamwork (20), Financial (20), Confidence (20)

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

// 5. LEADERSHIP UNIT 2 (20 Exercises)
export const LEADERSHIP_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "استراتيجية ترتيب الأولويات (مصفوفة الوقت)", en: "Priority Matrix Strategy" },
    { ar: "فن توزيع المهام بالعدل", en: "Fair Task Delegation Art" },
    { ar: "مختبر اتخاذ القرارات تحت الضغط", en: "Decision Making Under Pressure" },
    { ar: "تحدي قيادة المبادرات التطوعية", en: "Voluntary Initiative Challenge" },
    { ar: "صياغة الرؤية المستقبلية للفريق", en: "Crafting Team Future Vision" },
    { ar: "مختبر إدارة الاجتماعات المثمرة", en: "Productive Meetings Lab" },
    { ar: "تمرين التحفيز وبث الروح المعنوية", en: "Team Motivation & Morale Boost" },
    { ar: "فن تقبل النقد البناء", en: "Receiving Constructive Feedback" },
    { ar: "مختبر التخطيط للمشاريع الذكية", en: "Smart Project Planning Lab" },
    { ar: "مهارة التفاوض والحل الرابح للجميع", en: "Win-Win Negotiation Skill" },
    { ar: "إدارة المخاطر والبدائل الطارئة", en: "Risk Management & Plan B" },
    { ar: "تحديد الأهداف الذكية SMART", en: "SMART Goals Setting" },
    { ar: "تمرين القدوة والقيادة بالأفعال", en: "Leading by Example Drill" },
    { ar: "مختبر إدارة الأزمات العائلية", en: "Family Crisis Management" },
    { ar: "تمرين التواصل القيادي المباشر", en: "Direct Leadership Communication" },
    { ar: "بناء ثقافة التقدير والامتنان", en: "Building Appreciation Culture" },
    { ar: "مهارات تقديم العروض التقديمية", en: "Presentation Skills Masterclass" },
    { ar: "تمرين المرونة والحلول السريعة", en: "Agility & Rapid Solutions" },
    { ar: "مختبر قيادة الذات والانضباط", en: "Self-Leadership & Discipline" },
    { ar: "ميثاق القائد الأخلاقي الملهم", en: "Inspiring Ethical Leader Charter" }
  ];

  const emojis = ["👑", "📊", "🧠", "🌱", "🚀", "📢", "🔥", "🛡️", "📋", "🤝", "🎲", "🎯", "⭐", "🚨", "💬", "💖", "🎙️", "⚡", "🧘", "📜"];

  return {
    id: `leader_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين قيادي متقدم يهدف لتطوير ${titles[i].ar} وبناء شخصية مؤلفة ومؤثرة إيجابياً.`,
    skill_focus: "التفكير الاستراتيجي وقيادة الفرق",
    activity_type: "محاكاة ورش قيادية",
    steps_ar: [
      "حدد الهدف القيادي أو التحدي المراد التعامل معه.",
      "حلل الخيارات المتاحة واشترك مع فريقك في النقاش.",
      "نفذ الخطوة القيادية العملية بكل حزم ولطف.",
      "قيم النتائج واشكر كل من ساهم في النجاح."
    ],
    steps_en: [
      "Define the leadership goal or challenge.",
      "Analyze options and discuss with your team.",
      "Execute the action firmly and kindly.",
      "Evaluate outcomes and appreciate team members."
    ],
    outcome_ar: "تطوير الثقة بالذات، والقدرة على التوجيه وتحقيق نتائج استثنائية مع الفريق.",
    emoji: emojis[i]
  };
});

// 6. TEAMWORK UNIT 2 (20 Exercises)
export const TEAMWORK_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "بناء برج التعاون والتكامل", en: "Cooperation Tower Challenge" },
    { ar: "تحدي حل الألغاز الجماعي", en: "Group Puzzle Solving Challenge" },
    { ar: "مختبر العصف الذهني التشاركي", en: "Collaborative Brainstorming" },
    { ar: "تمرين تداول الأدوار والمسؤوليات", en: "Role Rotation Exercise" },
    { ar: "تأسيس مشروع العائلة المستدام", en: "Sustainable Family Project" },
    { ar: "لعبة ثقة الشريك والتوجيه الصوتي", en: "Trust Walk Voice Guidance" },
    { ar: "مختبر إدارة الخلافات الودية", en: "Friendly Dispute Management" },
    { ar: "تصميم الميثاق الجماعي الموحد", en: "Unified Team Charter Design" },
    { ar: "تحدي السرعة والتتابع الجماعي", en: "Group Relay Speed Challenge" },
    { ar: "صناعة مسرحية العائلة الإبداعية", en: "Creative Family Play Theater" },
    { ar: "تأليف كتاب جماعي قصصي", en: "Group Storybook Authorship" },
    { ar: "تمرين الدعم والتشجيع المتبادل", en: "Mutual Support & Encouragement" },
    { ar: "تحدي جمع الموارد واستغلالها", en: "Resource Pooling Challenge" },
    { ar: "تمرين التنسيق بدون كلام (الإشارة)", en: "Non-Verbal Silent Coordination" },
    { ar: "مشروع الخدمة المجتمعية المشترك", en: "Joint Community Service Project" },
    { ar: "مختبر تبادل الأفكار وبناء الحلول", en: "Idea Exchange & Solution Build" },
    { ar: "تمرين الاحتفال بإنجازات الزملاء", en: "Celebrating Teammates Success" },
    { ar: "تحدي طوق النجاة الجماعي", en: "Group Survival Ring Game" },
    { ar: "مختبر الاتصال الفعال والشفافية", en: "Effective Clear Communication" },
    { ar: "ميثاق التآزر والروح الجماعية", en: "Synergy & Team Spirit Pact" }
  ];

  const emojis = ["🤝", "🧩", "💡", "🔄", "🏡", "🙈", "🕊️", "📜", "⚡", "🎭", "📚", "👏", "🎒", "🤫", "🌱", "🛠️", "🎉", "⭕", "💬", "🌟"];

  return {
    id: `team_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين تعاطف وتكامل جماعي يهدف لتطبيق ${titles[i].ar} وتعزيز التكاتف والروح الموحدة.`,
    skill_focus: "التضافر والابتكار التشاركي",
    activity_type: "نشاط جماعي تفاعلي",
    steps_ar: [
      "اجتمع مع أفراد فريقك أو عائلتك في أجواء مرحة.",
      "وزع المسئوليات بوضوح واتفقوا على القواعد.",
      "تعاونوا معاً لإنجاز المهمة بروح واحدة وبلا تنافس سلبي.",
      "احتفلوا بالنتيجة وقوموا بالثناء على جهد الجميع."
    ],
    steps_en: [
      "Gather with family or teammates in a cheerful setup.",
      "Assign roles clearly and agree on rules.",
      "Work together collaboratively with joy.",
      "Celebrate the result and praise everyone's contribution."
    ],
    outcome_ar: "تعميق أواصر المودة والتعاون وتحقيق إنجازات جماعية مبهرة.",
    emoji: emojis[i]
  };
});

// 7. FINANCIAL UNIT 2 (20 Exercises)
export const FINANCIAL_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "ميزانية المشروع الصغير والتخطيط", en: "Micro Project Budgeting" },
    { ar: "مختبر التمييز بين الحاجات والرغبات", en: "Needs vs Wants Sorting Lab" },
    { ar: "تحدي حصالة الاستثمار المستقبلي", en: "Future Investment Piggy Bank" },
    { ar: "مقارنة الأسعار والتسوق الذكي", en: "Price Comparison & Smart Shopping" },
    { ar: "تخطيط المشتريات الأسبوعية للعائلة", en: "Weekly Family Shopping Plan" },
    { ar: "مختبر الادخار التراكمي الذكي", en: "Smart Cumulative Savings" },
    { ar: "محاكاة البنك والمصرف الصغير", en: "Mini Bank & Savings Simulation" },
    { ar: "حساب تكلفة الفرصة البديلة", en: "Opportunity Cost Calculation" },
    { ar: "تحدي تدوير الأشياء وإعادة البيع", en: "Recycling & Upcycling Market" },
    { ar: "تصميم بطاقة الأهداف المالية", en: "Financial Goals Card Design" },
    { ar: "مختبر حماية الأموال وتجنب الاحتيال", en: "Scam Awareness & Money Protection" },
    { ar: "تمرين العطاء والصدقة البركة", en: "Generosity & Charity Blessings" },
    { ar: "حساب الخصومات ونسب التخفيضات", en: "Discount & Percentage Math" },
    { ar: "مختبر الاستثمار في المهارات", en: "Investing in Skills & Knowledge" },
    { ar: "إدارة المصروف الشخصي الحكيم", en: "Wise Personal Allowance Management" },
    { ar: "مخطط الصندوق الطارئ الاحتياطي", en: "Emergency Fund Plan" },
    { ar: "محاكاة البورصة والأسهم البسيطة", en: "Simple Stock Market Simulation" },
    { ar: "تحدي صيانة الأغراض لتقليل التكلفة", en: "Maintenance to Save Money" },
    { ar: "تخطيط ميزانية الإجازات ورحلات", en: "Trip & Vacation Budgeting" },
    { ar: "ميثاق المستثمر الواعي الصغير", en: "Young Conscious Investor Charter" }
  ];

  const emojis = ["💰", "🏷️", "🏦", "🛒", "📝", "📈", "💳", "⚖️", "♻️", "🎯", "🛡️", "💖", "٪", "📚", "💵", "🚨", "📊", "🔧", "✈️", "🏆"];

  return {
    id: `money_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين وعي مالي مستدام لتعلم ${titles[i].ar} وتطوير عقلية الادخار والاستثمار المسئول.`,
    skill_focus: "التخطيط المالي والاستثمار المستدام",
    activity_type: "محاكاة وتطبيقات مالية",
    steps_ar: [
      "حدد الميزانية أو الهدف المالي المراد دراسته.",
      "اكتب الأرقام والخيارات في جدول منظم.",
      "قارن بين البدائل واختر الخيار الأوفر والأكثر فائدة.",
      "ضع المبلغ المقتطع في الحصالة أو حساب الادخار."
    ],
    steps_en: [
      "Set your financial target or budget.",
      "List numbers and options in an organized table.",
      "Compare choices and select the wisest route.",
      "Put the saved amount in your piggy bank or savings."
    ],
    outcome_ar: "اكتساب حكمة مالية مبكرة وقدرة عالية على اتخاذ قرارات إنفاق متزنة.",
    emoji: emojis[i]
  };
});

// 8. CONFIDENCE UNIT 2 (20 Exercises)
export const CONFIDENCE_EXERCISES_UNIT2: GenericExercise[] = Array.from({ length: 20 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  const titles = [
    { ar: "خطابة الوقوف بثبات أمام الجمهور", en: "Public Speaking Stance Mastery" },
    { ar: "مختبر التغلب على الخجل والارتباك", en: "Overcoming Shyness & Stage Fright" },
    { ar: "تمرين نبرة الصوت الواثقة والمؤثرة", en: "Confident Vocal Tone Practice" },
    { ar: "فن التواصل البصري الشجاع", en: "Courageous Eye Contact Art" },
    { ar: "إلقاء كلمة افتتاحية لمناسبة", en: "Delivering an Opening Speech" },
    { ar: "لغة الجسد المفتوحة والحازمة", en: "Open & Assertive Body Language" },
    { ar: "مختبر الرد الذكي على التحديات", en: "Quick & Smart Comebacks" },
    { ar: "تحدي التحدث بدون تحضير مسبق", en: "Impromptu Speech Challenge" },
    { ar: "تأطير نقاط القوة الشخصية", en: "Framing Personal Superpowers" },
    { ar: "مختبر إدارة الحوار ومواجهة الإحراج", en: "Handling Embarrassment Gracefully" },
    { ar: "فن قول 'لا' بلباقة وحزم", en: "Art of Polite & Firm Refusal" },
    { ar: "تمرين الدفاع عن الرأي بالمنطق", en: "Logical Opinion Defense" },
    { ar: "مقابلة التوظيف والقيادة التخيلية", en: "Mock Leadership Interview" },
    { ar: "عرض مشروع أمام المستثمرين", en: "Project Pitch to Investors" },
    { ar: "فن سرد القصص المؤثرة (Storytelling)", en: "Impactful Storytelling Art" },
    { ar: "تمرين الثقة في المظهر والتعبير", en: "Self-Presentation Confidence" },
    { ar: "مختبر التخلص من صوت الخوف الداخلي", en: "Silencing Inner Self-Doubt" },
    { ar: "تمرين الاحتفال بالبصمة الفريدة", en: "Celebrating Unique Identity" },
    { ar: "فن إدارة الأسئلة المفاجئة", en: "Handling Surprise Questions" },
    { ar: "ميثاق الخطيب الشجاع والمؤثر", en: "Courageous Speaker Charter" }
  ];

  const emojis = ["🎙️", "🦁", "📢", "👁️", "🎤", "🧍", "🧠", "⚡", "⭐", "🛡️", "🚫", "⚖️", "👔", "🚀", "📖", "✨", "🤫", "💖", "❓", "🏆"];

  return {
    id: `conf_u2_${num}`,
    title_ar: titles[i].ar,
    title_en: titles[i].en,
    description_ar: `تمرين بناء شخصية جسورة يركز على ${titles[i].ar} للتعبير عن الذات بحرية واقتدار.`,
    skill_focus: "الخطابة الجماهيرية والإقناع المتقدم",
    activity_type: "تدريب عملي على الخطابة",
    steps_ar: [
      "قف باستقامة واجعل كتفيك للخلف ونظرك للأمام.",
      "خذ تنفساً عميقاً وابتسم بثقة قبل البدء.",
      "تحدث بنبرة صريحة وواضحة مستخدماً لغة جسد مريحة.",
      "اشعر بجمال رسالتك وبقدرتك على التأثير الإيجابي."
    ],
    steps_en: [
      "Stand tall with shoulders back and eyes forward.",
      "Take a deep breath and smile before starting.",
      "Speak in a clear tone with open gestures.",
      "Embrace your message and your power to inspire."
    ],
    outcome_ar: "كسر حاجز الخوف والوصول إلى حضور واثق وجذاب في أي موقف.",
    emoji: emojis[i]
  };
});
