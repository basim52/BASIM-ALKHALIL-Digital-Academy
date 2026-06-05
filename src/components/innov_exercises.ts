export interface InnovExercise {
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

export const INNOV_EXERCISES: InnovExercise[] = [
  {
    "id": "innov_001",
    "title_ar": "عين المبادر",
    "title_en": "The Initiator's Eye",
    "description_ar": "تدرب على ملاحظة المشكلات من حولك. اكتب 5 مشكلات صغيرة تواجهك يومياً في البيت أو المدرسة. اختر واحدة تشعر أنك تستطيع حلها.",
    "skill_focus": "ملاحظة الفرص",
    "activity_type": "مراقبة وتدوين",
    "steps_ar": [
      "احمل دفتراً صغيراً لمدة يومين.",
      "اكتب كل مشكلة أو إزعاج تلاحظه.",
      "في نهاية اليومين، راجع القائمة.",
      "ضع نجمة بجانب المشكلة التي تثير حماسك لحلها."
    ],
    "steps_en": [
      "Carry a small notebook for two days.",
      "Write every problem or inconvenience you notice.",
      "At the end, review your list.",
      "Star the problem that excites you most to solve."
    ],
    "outcome_ar": "تعلم أن كل مشكلة هي فرصة لمشروع جديد.",
    "emoji": "👁️"
  },
  {
    "id": "innov_002",
    "title_ar": "من أنا؟ بطاقة التعاطف",
    "title_en": "Who Am I? Empathy Card",
    "description_ar": "اختر شخصاً تعرفه (جدتك، صديقك). املأ 'بطاقة تعاطف': ماذا يفكر؟ ماذا يشعر؟ ما الذي يحزنه؟ ما الذي يحتاجه؟",
    "skill_focus": "التعاطف مع المستخدم",
    "activity_type": "بحث تعاطفي",
    "steps_ar": [
      "ارسم شخصاً في وسط الورقة.",
      "ارسم فقاعات حوله: فقاعة 'يفكر'، فقاعة 'يشعر'، فقاعة 'يحتاج'.",
      "املأ الفقاعات بناءً على ملاحظاتك أو بسؤاله مباشرة.",
      "اسأل نفسك: 'كيف يمكنني مساعدته بشيء أصنعه؟'."
    ],
    "steps_en": [
      "Draw a person in the center.",
      "Add bubbles: 'Thinks', 'Feels', 'Needs'.",
      "Fill them based on observation or by asking directly.",
      "Ask yourself: 'How can I help with something I create?'."
    ],
    "outcome_ar": "فهم أن الابتكار يبدأ بالتعاطف مع حاجة حقيقية.",
    "emoji": "❤️"
  },
  {
    "id": "innov_003",
    "title_ar": "العصف الذهني المجنون",
    "title_en": "Crazy Brainstorming",
    "description_ar": "لحل المشكلة التي اخترتها، فكر في 10 حلول. لكن بشرط: 5 منها 'مجنونة ومستحيلة' و5 'منطقية'. لا تحكم على أي فكرة الآن.",
    "skill_focus": "توليد الأفكار",
    "activity_type": "عصف ذهني",
    "steps_ar": [
      "اكتب المشكلة في أعلى الورقة.",
      "ضع مؤقتاً لمدة 5 دقائق.",
      "اكتب أي فكرة تخطر ببالك دون توقف أو نقد.",
      "بعد انتهاء الوقت، اقرأ الأفكار وفاجئ نفسك بالحلول الإبداعية."
    ],
    "steps_en": [
      "Write the problem at the top.",
      "Set a timer for 5 minutes.",
      "Write any idea that comes to mind without stopping or judging.",
      "After time's up, read and surprise yourself with creative solutions."
    ],
    "outcome_ar": "كسر حاجز الخوف من الأفكار 'الغبية' لاكتشاف العبقرية.",
    "emoji": "🌪️"
  },
  {
    "id": "innov_004",
    "title_ar": "اختيار البطل",
    "title_en": "Choosing the Hero",
    "description_ar": "من بين أفكارك، اختر فكرة واحدة لتطويرها. معيار الاختيار: هل هي سهلة التنفيذ بمواردك الحالية؟ هل تفيد شخصاً حقيقياً؟",
    "skill_focus": "تقييم واختيار الأفكار",
    "activity_type": "تحليل واختيار",
    "steps_ar": [
      "ارسم جدولاً من 3 أعمدة: الفكرة، سهلة التنفيذ؟، تفيد أحداً؟",
      "قيم كل فكرة بـ ✓ أو ✗.",
      "اختر الفكرة التي حصلت على ✓✓.",
      "اكتب اسمها في دائرة وقل: 'هذه فكرتي التي سأبنيها'."
    ],
    "steps_en": [
      "Draw a 3-column table: Idea, Easy to do?, Helps someone?",
      "Rate each with ✓ or ✗.",
      "Pick the idea with ✓✓.",
      "Circle its name and say: 'This is my idea to build'."
    ],
    "outcome_ar": "تعلم اختيار الفكرة الأكثر قابلية للتنفيذ وذات التأثير.",
    "emoji": "🏆"
  },
  {
    "id": "innov_005",
    "title_ar": "النموذج الأولي بالورق",
    "title_en": "Paper Prototype",
    "description_ar": "ارسم منتجك أو خدمتك على الورق. كيف يبدو شكله؟ ما أجزاؤه؟ هذه هي الخطوة الأولى قبل البناء الحقيقي.",
    "skill_focus": "صنع نموذج أولي",
    "activity_type": "رسم وتصميم",
    "steps_ar": [
      "أحضر ورقة وألواناً.",
      "ارسم فكرتك بأكبر قدر من التفاصيل.",
      "اكتب أسماء الأجزاء ووظائفها.",
      "اعرض الرسم على أحد أفراد أسرتك واطلب ملاحظاتهم."
    ],
    "steps_en": [
      "Get paper and colors.",
      "Draw your idea with as much detail as possible.",
      "Label parts and their functions.",
      "Show it to a family member and ask for feedback."
    ],
    "outcome_ar": "تحويل الفكرة من مجرد خيال إلى شيء مرئي وملموس.",
    "emoji": "📝"
  },
  {
    "id": "innov_006",
    "title_ar": "اسأل زبونك",
    "title_en": "Ask Your Customer",
    "description_ar": "قبل أن تبني أي شيء، اسأل 3 أشخاص: 'هل ستستخدم هذا؟ كم ستدفع مقابله؟ ما الذي يعجبك فيه؟ ما الذي لا يعجبك؟'.",
    "skill_focus": "التحقق من السوق",
    "activity_type": "مقابلات",
    "steps_ar": [
      "جهز 4 أسئلة قصيرة.",
      "قابل 3 أشخاص (أصدقاء، جيران، أقارب).",
      "اكتب إجاباتهم بدقة.",
      "إذا قال الجميع 'لا أحتاجه'، فكر في تعديل فكرتك."
    ],
    "steps_en": [
      "Prepare 4 short questions.",
      "Interview 3 people (friends, neighbors, relatives).",
      "Record their answers precisely.",
      "If everyone says 'I don't need it', consider modifying your idea."
    ],
    "outcome_ar": "فهم أن رأي الزبون أهم من حبنا لأفكارنا.",
    "emoji": "🗣️"
  },
  {
    "id": "innov_007",
    "title_ar": "سعر التكلفة وسعر البيع",
    "title_en": "Cost and Selling Price",
    "description_ar": "إذا أردت بيع منتجك، احسب: كم كلفك صنعه؟ (مواد، وقت). ثم حدد سعر البيع الذي يغطي التكلفة ويعطيك ربحاً بسيطاً.",
    "skill_focus": "التسعير",
    "activity_type": "حساب مالي",
    "steps_ar": [
      "اكتب كل المواد التي تحتاجها وأسعارها.",
      "قدر وقت العمل بـ 'أجر ساعة' رمزي (مثلاً 5 ريالات).",
      "اجمع التكلفة الكلية.",
      "حدد سعر بيع = التكلفة + 20% ربح."
    ],
    "steps_en": [
      "List all materials and their costs.",
      "Estimate work time with a symbolic 'hourly wage'.",
      "Add up total cost.",
      "Set selling price = cost + 20% profit."
    ],
    "outcome_ar": "فهم أساسيات التسعير والربح.",
    "emoji": "🏷️"
  },
  {
    "id": "innov_008",
    "title_ar": "الاسم والشعر",
    "title_en": "Name and Logo",
    "description_ar": "فكر في اسم لمشروعك. يجب أن يكون سهلاً وجذاباً. صمم شعاراً بسيطاً له (بالرسم أو باستخدام تطبيق).",
    "skill_focus": "بناء العلامة التجارية",
    "activity_type": "تصميم",
    "steps_ar": [
      "اكتب 5 أسماء محتملة.",
      "اختر أسهلها وأكثرها تعبيراً.",
      "ارسم 3 أشكال بسيطة للشعار.",
      "اختر أفضلها ولوّنه."
    ],
    "steps_en": [
      "Write 5 possible names.",
      "Pick the easiest and most expressive.",
      "Draw 3 simple logo shapes.",
      "Choose the best and color it."
    ],
    "outcome_ar": "إدراك أن لكل مشروع هوية بصرية تميزه.",
    "emoji": "🎨"
  },
  {
    "id": "innov_009",
    "title_ar": "قصة المشروع",
    "title_en": "The Project Story",
    "description_ar": "اكتب 'قصة' مشروعك في 3 جمل: 1- المشكلة التي وجدتها. 2- الحل الذي تقدمه. 3- لماذا سينجح؟ هذه 'مصعدك'.",
    "skill_focus": "عرض المشروع",
    "activity_type": "كتابة",
    "steps_ar": [
      "اكتب الجملة الأولى: 'لاحظت أن الناس يعانون من...'.",
      "الجملة الثانية: 'لذلك صنعت... الذي يساعدهم على...'.",
      "الجملة الثالثة: 'هذا المشروع سينجح لأنه...'.",
      "اقرأها بصوت عالٍ وتأكد أنها 30 ثانية فقط."
    ],
    "steps_en": [
      "Write first sentence: 'I noticed people struggle with...'.",
      "Second: 'So I created... that helps them...'.",
      "Third: 'This project will succeed because...'.",
      "Read aloud and ensure it's only 30 seconds."
    ],
    "outcome_ar": "تعلم تلخيص المشروع لجذب الاهتمام.",
    "emoji": "📖"
  },
  {
    "id": "innov_010",
    "title_ar": "يوم السوق",
    "title_en": "Market Day",
    "description_ar": "نظم 'سوقاً' في بيتك. اعرض منتجك أو خدمتك على أفراد أسرتك. تدرب على البيع، الشرح، والتفاوض. استخدم 'عملة البيت'.",
    "skill_focus": "البيع المباشر",
    "activity_type": "محاكاة سوق",
    "steps_ar": [
      "جهز 'منتجك' (حتى لو كان مجرد فكرة على ورق).",
      "جهز 'عملة ورقية' من صنعكم.",
      "قف خلف 'طاولة العرض' واشرح منتجك لكل زبون.",
      "في النهاية، احسب 'أرباحك'."
    ],
    "steps_en": [
      "Prepare your 'product' (even if just on paper).",
      "Make paper 'currency'.",
      "Stand behind a 'display table' and pitch to each customer.",
      "At the end, count your 'profits'."
    ],
    "outcome_ar": "تجربة حقيقية للبيع والشراء والتواصل مع الزبائن.",
    "emoji": "🎪"
  },
  {
    "id": "innov_011",
    "title_ar": "ردود الفعل",
    "title_en": "Feedback, Not Failure",
    "description_ar": "بعد أن تعرض فكرتك، استمع للملاحظات بهدوء. اكتب شيئاً واحداً قالوه يمكنك تحسينه. الملاحظات ليست هجوماً شخصياً.",
    "skill_focus": "تقبل النقد",
    "activity_type": "جلسة استماع",
    "steps_ar": [
      "بعد عرض فكرتك، اسأل: 'ما الشيء الوحيد الذي تغيره في مشروعي؟'.",
      "استمع دون مقاطعة أو تبرير.",
      "اكتب الملاحظة وقل: 'شكراً، سأفكر في هذا'.",
      "طبق تحسيناً واحداً بناءً على الملاحظات."
    ],
    "steps_en": [
      "After your pitch, ask: 'What's one thing you'd change in my project?'.",
      "Listen without interrupting or justifying.",
      "Write the note and say: 'Thank you, I'll consider it'.",
      "Apply one improvement based on feedback."
    ],
    "outcome_ar": "تحويل النقد من عدو إلى أداة تطوير.",
    "emoji": "🎯"
  },
  {
    "id": "innov_012",
    "title_ar": "الخطة خطوة خطوة",
    "title_en": "Step-by-Step Plan",
    "description_ar": "اكتب خطة من 5 خطوات لتنفيذ مشروعك خلال الأسبوع القادم. كل خطوة يجب أن تكون محددة وقابلة للتنفيذ.",
    "skill_focus": "تخطيط المشروع",
    "activity_type": "كتابة خطة",
    "steps_ar": [
      "اكتب الهدف النهائي في جملة واحدة.",
      "قسمه إلى 5 خطوات صغيرة.",
      "ضع تاريخاً بجانب كل خطوة.",
      "في نهاية الأسبوع، راجع: 'كم خطوة أنجزت؟'."
    ],
    "steps_en": [
      "Write the final goal in one sentence.",
      "Break it into 5 small steps.",
      "Set a date next to each.",
      "At week's end, review: 'How many steps done?'."
    ],
    "outcome_ar": "تحويل الحلم الكبير إلى خطة أسبوعية قابلة للتنفيذ.",
    "emoji": "📅"
  },
  {
    "id": "innov_013",
    "title_ar": "بطاقة العمل",
    "title_en": "My Business Card",
    "description_ar": "صمم 'بطاقة عمل' لنفسك كمبادر. اكتب: اسمك، اسم مشروعك، ماذا تقدم، وكيفية التواصل معك (حتى لو وهمياً).",
    "skill_focus": "التسويق الشخصي",
    "activity_type": "تصميم",
    "steps_ar": [
      "قص قطعة ورق بحجم بطاقة.",
      "في الأمام: الاسم والشعار.",
      "في الخلف: 'أقدم: ...' و'للتواصل: ...'.",
      "وزع نسخاً على أفراد أسرتك."
    ],
    "steps_en": [
      "Cut a card-sized paper.",
      "Front: name and logo.",
      "Back: 'I offer: ...' and 'Contact: ...'.",
      "Distribute copies to your family."
    ],
    "outcome_ar": "الاعتزاز بمشروعك وتقديمه بشكل احترافي.",
    "emoji": "📇"
  },
  {
    "id": "innov_014",
    "title_ar": "قاعدة 1%",
    "title_en": "The 1% Rule",
    "description_ar": "لا تحاول أن تكون مثالياً من البداية. فقط حسّن مشروعك بنسبة 1% كل يوم. التقدم الصغير المستمر يصنع المعجزات.",
    "skill_focus": "التحسين المستمر",
    "activity_type": "عقلية النمو",
    "steps_ar": [
      "اليوم، اسأل نفسك: 'ما الشيء الوحيد الذي يمكنني تحسينه 1% فقط؟'.",
      "افعل هذا التحسين الصغير فوراً.",
      "كرر السؤال غداً.",
      "بعد شهر، انظر للخلف ولاحظ كم تقدمت."
    ],
    "steps_en": [
      "Today, ask: 'What's the one thing I can improve just 1%?'.",
      "Do that small improvement immediately.",
      "Repeat the question tomorrow.",
      "After a month, look back and see how far you've come."
    ],
    "outcome_ar": "بناء عادة التحسين اليومي البطيء لكن الثابت.",
    "emoji": "📈"
  },
  {
    "id": "innov_015",
    "title_ar": "عرض المستثمرين",
    "title_en": "Investor Pitch",
    "description_ar": "تخيل أن والديك 'مستثمران'. قدم لهما عرضاً من 3 دقائق: المشكلة، حلك، لماذا أنت الشخص المناسب، وماذا ستفعل بـ 'الاستثمار'.",
    "skill_focus": "الإقناع",
    "activity_type": "عرض تقديمي",
    "steps_ar": [
      "جهة 4 شرائح (ورق): المشكلة، الحل، لماذا أنا، الخطة.",
      "تدرب على العرض 3 مرات.",
      "قدمه لوالديك بثقة.",
      "اسألهم: 'هل ستستثمرون في مشروعي؟ لماذا؟'."
    ],
    "steps_en": [
      "Prepare 4 slides (paper): Problem, Solution, Why Me, Plan.",
      "Practice 3 times.",
      "Pitch to your parents confidently.",
      "Ask them: 'Would you invest? Why?'."
    ],
    "outcome_ar": "اكتساب ثقة عرض الأفكار على صناع القرار.",
    "emoji": "🤝"
  },
  {
    "id": "innov_016",
    "title_ar": "الفشل خطوة للأمام",
    "title_en": "Failing Forward",
    "description_ar": "اكتب عن مرة 'فشلت' فيها (في مشروع مدرسي، لعبة...). ماذا تعلمت؟ كيف ساعدك هذا 'الفشل' أن تصبح أفضل؟",
    "skill_focus": "المرونة",
    "activity_type": "كتابة تأملية",
    "steps_ar": [
      "فكر في 'فشل' صغير.",
      "اكتب: 'حاولت أن... لكن...'.",
      "أكمل: 'لكنني تعلمت أن... وبسبب هذا، في المرة القادمة سأفعل...'.",
      "شارك قصتك مع شخص أصغر منك."
    ],
    "steps_en": [
      "Think of a small 'failure'.",
      "Write: 'I tried to... but...'.",
      "Complete: 'But I learned that... and because of this, next time I will...'.",
      "Share your story with someone younger."
    ],
    "outcome_ar": "تحويل الفشل من عار إلى وسام تعلم.",
    "emoji": "🧗"
  },
  {
    "id": "innov_017",
    "title_ar": "أسبوع الابتكار",
    "title_en": "Innovation Week",
    "description_ar": "خصص أسبوعاً كاملاً حيث كل يوم تتعلم مهارة جديدة صغيرة (الطهي، الرسم، البرمجة...). في نهايته، ادمجهم في مشروع واحد.",
    "skill_focus": "التعلم المتعدد",
    "activity_type": "تحدي أسبوعي",
    "steps_ar": [
      "خطط لـ 7 مهارات صغيرة، واحدة لكل يوم.",
      "تعلمها من يوتيوب أو من أحد أفراد أسرتك.",
      "في اليوم السابع، اصنع شيئاً يستخدم 3 من هذه المهارات.",
      "اعرض 'اختراعك الأسبوعي'."
    ],
    "steps_en": [
      "Plan 7 small skills, one per day.",
      "Learn them from YouTube or a family member.",
      "On day 7, create something using 3 of those skills.",
      "Present your 'weekly invention'."
    ],
    "outcome_ar": "فهم أن الابتكار يزدهر بتنوع المهارات.",
    "emoji": "💡"
  },
  {
    "id": "innov_018",
    "title_ar": "خدمتي للآخرين",
    "title_en": "Service to Others",
    "description_ar": "ليس كل مشروع للربح. فكر في 'خدمة' يمكنك تقديمها مجاناً لجيرانك أو أقاربك (تعليم، مساعدة، تنظيم). نفذها هذا الأسبوع.",
    "skill_focus": "ريادة اجتماعية",
    "activity_type": "مشروع خدمي",
    "steps_ar": [
      "اسأل: 'ما المهارة التي أملكها ويمكن أن تفيد غيري؟'.",
      "اعرض خدمتك على شخص واحد.",
      "قدم الخدمة بابتسامة ودون انتظار مقابل.",
      "اكتب كيف شعرت بعد تقديمها."
    ],
    "steps_en": [
      "Ask: 'What skill do I have that could benefit others?'.",
      "Offer your service to one person.",
      "Provide it with a smile and without expecting payment.",
      "Write how you felt afterwards."
    ],
    "outcome_ar": "اكتشاف أن ريادة الأعمال يمكن أن تكون عطاءً.",
    "emoji": "🎁"
  },
  {
    "id": "innov_019",
    "title_ar": "متحف الأفكار",
    "title_en": "Museum of Ideas",
    "description_ar": "اجمع كل ما أنتجته خلال هذه الدروس (رسومات، نماذج، بطاقات) في 'متحف' صغير في زاوية غرفتك. ادعُ أسرتك للزيارة.",
    "skill_focus": "توثيق الرحلة",
    "activity_type": "عرض",
    "steps_ar": [
      "رتب أعمالك على طاولة أو رف.",
      "اكتب بطاقة شرح صغيرة بجانب كل عمل.",
      "قم بجولة إرشادية لأسرتك.",
      "احتفظ بالمتحف لتتذكر بداياتك."
    ],
    "steps_en": [
      "Arrange your works on a table or shelf.",
      "Write a small explanation card next to each.",
      "Give a guided tour to your family.",
      "Keep the museum to remember your beginnings."
    ],
    "outcome_ar": "رؤية النمو الشخصي والتطور عبر الزمن.",
    "emoji": "🏛️"
  },
  {
    "id": "innov_020",
    "title_ar": "شهادة المبتكر",
    "title_en": "Innovator Certificate",
    "description_ar": "صمم شهادة 'مبتكر بالفطرة'. اكتب فيها: 3 مشكلات لاحظتها، فكرتان طورتهما، ومشروع واحد بدأته. وقعها كرئيس تنفيذي لمستقبلك.",
    "skill_focus": "تتويج المسيرة",
    "activity_type": "احتفال",
    "steps_ar": [
      "صمم شهادة فاخرة.",
      "املأ إنجازاتك فيها.",
      "وقعها باسمك واطلب توقيع أحد والديك.",
      "علقها لتذكرك أنك 'مبتكر بالفطرة'."
    ],
    "steps_en": [
      "Design a fancy certificate.",
      "Fill in your achievements.",
      "Sign it and ask a parent to sign.",
      "Hang it to remember you are a 'Natural Innovator'."
    ],
    "outcome_ar": "تتويج الرحلة بهوية المبتكر الواثق.",
    "emoji": "🎓"
  }
];
