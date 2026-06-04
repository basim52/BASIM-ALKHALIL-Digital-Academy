export interface CommunicationExercise {
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

export const COMMUNICATION_EXERCISES: CommunicationExercise[] = [
  {
    "id": "comm_001",
    "title_ar": "المستمع الصامت",
    "title_en": "The Silent Listener",
    "description_ar": "تدرب على الاستماع دون مقاطعة. اطلب من شخص أن يحدثك عن يومه لمدة 3 دقائق. دورك فقط أن تومئ برأسك وتقول 'همم' دون أي تعليق.",
    "skill_focus": "الاستماع النشط",
    "activity_type": "تدريب ثنائي",
    "steps_ar": [
      "اجلس مقابل شريكك. ضع هاتفك بعيداً.",
      "اطلب منه: 'احكِ لي عن يومك'. اضبط مؤقت 3 دقائق.",
      "استمع دون أن تنطق بأي كلمة. فقط تواصل بالعين وأومئ.",
      "بعد 3 دقائق، لخص ما سمعته في جملة واحدة للتأكيد."
    ],
    "steps_en": [
      "Sit facing your partner. Put your phone away.",
      "Ask: 'Tell me about your day'. Set a timer for 3 minutes.",
      "Listen without saying a word. Just eye contact and nod.",
      "After 3 minutes, summarize what you heard in one sentence to confirm."
    ],
    "outcome_ar": "تعلم كبح الرغبة في المقاطعة وفهم الآخر بعمق.",
    "emoji": "🤫"
  },
  {
    "id": "comm_002",
    "title_ar": "جملة الأنا",
    "title_en": "The 'I' Statement",
    "description_ar": "عندما تغضب من شخص، لا تقل: 'أنت أزعجتني'. قل: 'أنا شعرت بالضيق عندما...'. حول اللوم إلى تعبير عن مشاعرك.",
    "skill_focus": "التعبير عن المشاعر دون هجوم",
    "activity_type": "تدريب لغوي",
    "steps_ar": [
      "تذكر موقفاً صغيراً أزعجك اليوم.",
      "اكتب جملة تبدأ بـ 'أنت...' تعبر عن لومك.",
      "الآن أعد كتابتها لتبدأ بـ 'أنا شعرت بـ... عندما...'.",
      "قارن بين الجملتين. أيها أسهل على السامع؟"
    ],
    "steps_en": [
      "Recall a small situation that upset you today.",
      "Write a sentence starting with 'You...' expressing blame.",
      "Now rewrite it starting with 'I felt... when...'.",
      "Compare both. Which one is easier on the listener?"
    ],
    "outcome_ar": "التعبير عن الاحتياجات دون إثارة دفاع الطرف الآخر.",
    "emoji": "👤"
  },
  {
    "id": "comm_003",
    "title_ar": "مرآة الكلمات",
    "title_en": "Word Mirror",
    "description_ar": "تدرب على إعادة صياغة كلام الآخر. بعد أن يتحدث شخص، قل: 'إذاً ما أفهمه من كلامك هو... هل هذا صحيح؟'. هذا يؤكد الاستماع ويصلح سوء الفهم فوراً.",
    "skill_focus": "إعادة الصياغة والتلخيص",
    "activity_type": "تدريب حواري",
    "steps_ar": [
      "استمع لحديث شخص ما بانتباه كامل.",
      "قبل أن ترد برأيك، قل: 'دعني أتأكد أنني فهمتك...'.",
      "أعد صياغة ما قاله في جملتين بأسلوبك.",
      "اسأل: 'هل هذا ما قصدته؟' وانتظر تأكيده."
    ],
    "steps_en": [
      "Listen to someone speaking with full attention.",
      "Before giving your opinion, say: 'Let me make sure I understood you...'.",
      "Rephrase what they said in two sentences in your own words.",
      "Ask: 'Is that what you meant?' and wait for confirmation."
    ],
    "outcome_ar": "تقليل سوء الفهم وبناء جسور من الفهم المتبادل.",
    "emoji": "🪞"
  },
  {
    "id": "comm_004",
    "title_ar": "عرض تقديمي في 60 ثانية",
    "title_en": "60-Second Pitch",
    "description_ar": "اختر أي فكرة تحبها (فيلم، كتاب، هواية). قدمها لشخص آخر في دقيقة واحدة بالضبط. تدرب على الإيجاز والوضوح والثقة.",
    "skill_focus": "التعبير الواضح والموجز",
    "activity_type": "تحدث أمام آخر",
    "steps_ar": [
      "اختر موضوعاً واحداً تحبه.",
      "جهز 3 نقاط رئيسية فقط لتقولها عنه.",
      "قف وتحدث لمدة 60 ثانية دون توقف.",
      "اطلب من المستمع تقييماً: 'ما الفكرة الأهم التي وصلتك؟'"
    ],
    "steps_en": [
      "Choose one topic you love.",
      "Prepare only 3 main points to say about it.",
      "Stand up and speak for exactly 60 seconds without stopping.",
      "Ask the listener: 'What was the main idea you got?'"
    ],
    "outcome_ar": "بناء الثقة في التحدث واختيار الكلمات المؤثرة.",
    "emoji": "⏱️"
  },
  {
    "id": "comm_005",
    "title_ar": "ماذا لو اختلفنا؟",
    "title_en": "What If We Disagree?",
    "description_ar": "تدرب على الاختلاف باحترام. اختر رأياً مختلفاً مع صديق وناقشه باستخدام عبارات: 'أفهم وجهة نظرك، لكنني أرى أن... ما رأيك؟'",
    "skill_focus": "الاختلاف المحترم",
    "activity_type": "حوار ثنائي",
    "steps_ar": [
      "اختر أنت وصديق موضوعاً تختلفان عليه (فريق رياضي، طعام...).",
      "ابدأ جملتك بـ: 'أفهم أنك تحب... لأن...'.",
      "ثم قل: 'بالنسبة لي، أفضل... والسبب هو...'.",
      "أنهِ الحوار بمصافحة أو 'شكراً على النقاش الممتع'."
    ],
    "steps_en": [
      "Choose a topic you and a friend disagree on.",
      "Start your sentence with: 'I understand you like... because...'.",
      "Then say: 'For me, I prefer... and the reason is...'.",
      "End with a handshake or 'Thanks for the nice discussion'."
    ],
    "outcome_ar": "الحفاظ على العلاقات رغم الاختلاف في الرأي.",
    "emoji": "🤝"
  },
  {
    "id": "comm_006",
    "title_ar": "لغة الجسد الواثقة",
    "title_en": "Confident Body Language",
    "description_ar": "تدرب على الوقوف والجلوس بثقة. ظهر مستقيم، أكتاف للخلف، اتصال بصري، يدان مفتوحتان. جرب التحدث بهذه الوضعية ولاحظ الفرق في صوتك.",
    "skill_focus": "لغة الجسد",
    "activity_type": "مراقبة ذاتية وممارسة",
    "steps_ar": [
      "تحدث عن أي موضوع وأنت تنظر للأسفل ويداك متشابكتان.",
      "الآن تحدث عن نفس الموضوع وظهرك مستقيم، كتفاك للخلف، وعيناك في عين المستمع.",
      "اسأل: 'أي مرة شعرت أن صوتي أقوى؟'",
      "مارس الوضعية الثانية يومياً لمدة دقيقتين أمام المرآة."
    ],
    "steps_en": [
      "Talk about any topic while looking down with crossed hands.",
      "Now talk about the same topic with a straight back, shoulders back, and eye contact.",
      "Ask: 'Which time did my voice feel stronger?'",
      "Practice the second posture daily for 2 minutes in the mirror."
    ],
    "outcome_ar": "إيصال رسالة أقوى عبر الجسد قبل أن ينطق اللسان.",
    "emoji": "🧍"
  },
  {
    "id": "comm_007",
    "title_ar": "بطاقات الأسئلة المفتوحة",
    "title_en": "Open-Ended Question Cards",
    "description_ar": "اصنع 10 بطاقات عليها أسئلة لا يمكن الإجابة عليها بـ 'نعم' أو 'لا'. استخدمها في حواراتك. مثال: 'ما أكثر شيء أثار فضولك اليوم؟'",
    "skill_focus": "طرح أسئلة محفزة",
    "activity_type": "صناعة بطاقات ومحادثة",
    "steps_ar": [
      "اكتب 10 أسئلة تبدأ بـ: كيف، لماذا، ماذا، صف لي...",
      "في أي حوار، اسحب بطاقة واسأل السؤال.",
      "استمع للإجابة بتعمق واسأل سؤالاً ثانوياً بناءً عليها.",
      "لاحظ كيف تطول المحادثة وتصبح أعمق."
    ],
    "steps_en": [
      "Write 10 questions starting with: How, Why, What, Describe...",
      "In any conversation, pull a card and ask the question.",
      "Listen deeply to the answer and ask a follow-up question.",
      "Notice how the conversation becomes longer and deeper."
    ],
    "outcome_ar": "فتح حوارات عميقة وتجنب المحادثات السطحية.",
    "emoji": "🎴"
  },
  {
    "id": "comm_008",
    "title_ar": "لا تقاطع، اكتب",
    "title_en": "Don't Interrupt, Write",
    "description_ar": "في أي نقاش عائلي، أمسك ورقة وقلماً. بدل أن تقاطع، اكتب النقطة التي تريد قولها. عندما ينتهي المتحدث، انظر لورقتك وقل رأيك.",
    "skill_focus": "كبح الاندفاع واحترام الدور",
    "activity_type": "انضباط حواري",
    "steps_ar": [
      "في اجتماع عائلي أو نقاش، أحضر دفتراً.",
      "كلما خطرت فكرة تريد مقاطعة المتحدث بها، اكتبها فوراً.",
      "انتظر حتى يسكت المتحدث تماماً.",
      "انظر لملاحظاتك وشارك أفكارك بترتيب."
    ],
    "steps_en": [
      "In a family meeting or discussion, bring a notebook.",
      "Every time you have a thought you want to interrupt with, write it immediately.",
      "Wait until the speaker completely finishes.",
      "Look at your notes and share your thoughts in order."
    ],
    "outcome_ar": "تنمية الصبر وضبط النفس أثناء الحوارات الحماسية.",
    "emoji": "✍️"
  },
  {
    "id": "comm_009",
    "title_ar": "نقد بناء بطريقة الشطيرة",
    "title_en": "The Sandwich Feedback",
    "description_ar": "عند إعطاء ملاحظة لشخص: ابدأ بإطراء (خبز)، ضع الملاحظة بلطف (لحم)، اختم بإيجابية (خبز). مثال: 'حفظك ممتاز... فقط انتبه للنطق... واثق أنك ستتحسن'.",
    "skill_focus": "تقديم النقد البناء",
    "activity_type": "تدريب لغوي",
    "steps_ar": [
      "تذكر ملاحظة تريد إيصالها لشخص.",
      "اكتب جملة إطراء صادقة عن أدائه.",
      "اكتب نقطة التحسين بلطف: 'قد يكون أفضل لو...'.",
      "اختم بجملة تشجيع وثقة فيه."
    ],
    "steps_en": [
      "Think of feedback you want to give someone.",
      "Write a sincere compliment about their performance.",
      "Write the improvement point gently: 'It might be even better if...'.",
      "End with a sentence of encouragement and confidence in them."
    ],
    "outcome_ar": "إيصال الملاحظات دون إيذاء المشاعر وتقبلها من الطرف الآخر.",
    "emoji": "🥪"
  },
  {
    "id": "comm_010",
    "title_ar": "حوار مع شخص لا تتفق معه",
    "title_en": "Dialogue with Someone You Disagree With",
    "description_ar": "ابحث عن شخص له رأي معاكس تماماً لرأيك. هدفك ليس إقناعه، بل فهمه. اسأل: 'كيف وصلت لهذه القناعة؟ ما تجربتك؟'",
    "skill_focus": "التعاطف الفكري",
    "activity_type": "حوار حقيقي",
    "steps_ar": [
      "حدد شخصاً يحترمه عقلك لكنه يختلف معك.",
      "اطلب منه 10 دقائق حوار بشرط: 'لن أحاول تغيير رأيك، فقط أفهمك'.",
      "اسأل 3 أسئلة: 'كيف؟ لماذا؟ ما الذي أثر فيك؟'.",
      "اشكره بصدق على مشاركته."
    ],
    "steps_en": [
      "Identify a person you respect but disagree with.",
      "Ask for 10 minutes with the condition: 'I won't try to change your mind, just understand you'.",
      "Ask 3 questions: 'How? Why? What influenced you?'.",
      "Thank them sincerely for sharing."
    ],
    "outcome_ar": "توسيع الأفق وتقبل أن الحقيقة لها وجوه متعددة.",
    "emoji": "🗣️"
  },
  {
    "id": "comm_011",
    "title_ar": "قل 'لا' بلطف",
    "title_en": "Saying 'No' Nicely",
    "description_ar": "تدرب على رفض طلب لا يناسبك. استخدم: 'أقدر طلبك... لكنني لا أستطيع حالياً بسبب... ربما في المرة القادمة.'",
    "skill_focus": "وضع الحدود الشخصية",
    "activity_type": "تمثيل أدوار",
    "steps_ar": [
      "اطلب من صديق أن يطلب منك طلباً صعباً.",
      "تنفس وابتسم وقل: 'شكراً لثقتك بي...'.",
      "ارفض بوضوح ولطف: 'لا يمكنني حالياً لأن...'.",
      "قدم بديلاً بسيطاً إن أمكن: 'لكن يمكنني مساعدتك بـ...'."
    ],
    "steps_en": [
      "Ask a friend to make a difficult request.",
      "Breathe, smile and say: 'Thank you for trusting me...'.",
      "Refuse clearly and kindly: 'I can't right now because...'.",
      "Offer a simple alternative if possible: 'But I can help you with...'."
    ],
    "outcome_ar": "حماية الوقت والطاقة الشخصية دون الشعور بالذنب.",
    "emoji": "🛑"
  },
  {
    "id": "comm_012",
    "title_ar": "كرسي الحوار العائلي",
    "title_en": "Family Dialogue Chair",
    "description_ar": "خصصوا كرسياً في البيت. من يجلس عليه له حق الكلام دون مقاطعة لمدة 5 دقائق عن أي موضوع. يتناوب الجميع.",
    "skill_focus": "الحوار الأسري المنظم",
    "activity_type": "نشاط عائلي",
    "steps_ar": [
      "ضعوا كرسياً خاصاً في المنتصف.",
      "من يجلس عليه يتحدث 5 دقائق عن: 'شيء أريدكم أن تفهموه عني'.",
      "الباقون يستمعون ولا يعلقون.",
      "بعد انتهاء الوقت، الكل يشكر المتحدث. ثم الدور للآخر."
    ],
    "steps_en": [
      "Place a special chair in the middle.",
      "Whoever sits speaks for 5 minutes about: 'Something I want you to understand about me'.",
      "The rest listen and don't comment.",
      "After time ends, everyone thanks the speaker. Then next turn."
    ],
    "outcome_ar": "خلق مساحة آمنة للتعبير عن المشاعر العميقة داخل الأسرة.",
    "emoji": "🪑"
  },
  {
    "id": "comm_013",
    "title_ar": "التحدث أمام المرآة",
    "title_en": "Speaking in the Mirror",
    "description_ar": "قف أمام المرآة وتحدث عن أي موضوع لمدة دقيقتين. راقب تعابير وجهك، حركات يديك، وطريقة وقوفك. صديقك أفضل ناقد.",
    "skill_focus": "الوعي الذاتي بالتواصل",
    "activity_type": "مراقبة ذاتية",
    "steps_ar": [
      "اختر موضوعاً بسيطاً (حيوانك المفضل، حلمك...).",
      "قف أمام المرآة وتحدث عنه بصوت عالٍ دقيقتين.",
      "لاحظ: هل تبتسم؟ هل تنظر لعينيك؟ هل تقف بشكل واثق؟",
      "كرر وحاول تحسين نقطة واحدة كل مرة."
    ],
    "steps_en": [
      "Choose a simple topic (favorite animal, your dream...).",
      "Stand in front of the mirror and speak aloud for 2 minutes.",
      "Observe: Are you smiling? Do you look into your own eyes? Do you stand confidently?",
      "Repeat and try to improve one point each time."
    ],
    "outcome_ar": "تحسين لغة الجسد وتعبيرات الوجه بملاحظة ذاتية.",
    "emoji": "🤳"
  },
  {
    "id": "comm_014",
    "title_ar": "رسالة الصداقة",
    "title_en": "A Friendship Letter",
    "description_ar": "اكتب رسالة يدوية لصديق تخبره فيها: 'أقدّر فيك...' و'أشكرك لأنك...'. أرسلها له أو اقرأها عليه.",
    "skill_focus": "التعبير عن المشاعر الإيجابية",
    "activity_type": "كتابة وتعبير",
    "steps_ar": [
      "اختر صديقاً واحداً.",
      "اكتب له 3 أشياء تقدرها فيه.",
      "اكتب موقفاً واحداً ساعدك فيه وتريد شكره عليه.",
      "اقرأ الرسالة له مباشرة أو أرسلها."
    ],
    "steps_en": [
      "Choose one friend.",
      "Write 3 things you appreciate about them.",
      "Write one situation where they helped you and you want to thank them for it.",
      "Read the letter to them directly or send it."
    ],
    "outcome_ar": "تقوية روابط الصداقة بالتقدير اللفظي الصريح.",
    "emoji": "✉️"
  },
  {
    "id": "comm_015",
    "title_ar": "قاعدة 3 ثوان",
    "title_en": "The 3-Second Rule",
    "description_ar": "قبل أن ترد على أي كلام، خذ 3 ثوان صمت. عد في عقلك: 1-2-3. هذه الثواني تمنع الردود الاندفاعية وتتيح لك التفكير.",
    "skill_focus": "ضبط الردود الاندفاعية",
    "activity_type": "انضباط ذاتي",
    "steps_ar": [
      "في أي حوار اليوم، درب نفسك على الصمت 3 ثوان قبل الرد.",
      "عد بصمت: 'واحد، اثنان، ثلاثة'.",
      "ثم ابدأ بالرد.",
      "لاحظ كيف تغيرت جودة ردودك."
    ],
    "steps_en": [
      "In any conversation today, train yourself to pause 3 seconds before replying.",
      "Count silently: 'One, two, three'.",
      "Then start your reply.",
      "Notice how the quality of your responses changes."
    ],
    "outcome_ar": "استبدال ردود الفعل السريعة باستجابات مدروسة وحكيمة.",
    "emoji": "🕒"
  },
  {
    "id": "comm_016",
    "title_ar": "المديح العلني",
    "title_en": "Public Praise",
    "description_ar": "في اجتماع عائلي أو بين الأصدقاء، امدح شخصاً أمام الجميع. 'أريد أن أقول أمامكم أن [الاسم] فعل كذا وأنا فخور به'.",
    "skill_focus": "التشجيع الإيجابي العلني",
    "activity_type": "ممارسة اجتماعية",
    "steps_ar": [
      "اختر شخصاً يستحق التقدير.",
      "فكر في إنجاز واحد أو صفة واحدة تريد تسليط الضوء عليها.",
      "في وجود آخرين، قل: 'أود أن أشكر/أقدر [الاسم] لأنه...'.",
      "لاحظ أثر كلماتك على وجهه."
    ],
    "steps_en": [
      "Choose someone deserving appreciation.",
      "Think of one achievement or trait you want to highlight.",
      "In front of others, say: 'I would like to thank/appreciate [name] because...'.",
      "Notice the impact of your words on their face."
    ],
    "outcome_ar": "خلق ثقافة تقدير ورفع الروح المعنوية للآخرين.",
    "emoji": "📢"
  },
  {
    "id": "comm_017",
    "title_ar": "الفضولي لا القاضي",
    "title_en": "Curious, Not Judgmental",
    "description_ar": "عندما يقول شخص شيئاً غريباً، بدل أن تحكم، اسأل: 'هذا مثير! كيف تعرفت على هذا؟'. الفضول يبني جسوراً أطول من الأحكام.",
    "skill_focus": "الانفتاح الفكري",
    "activity_type": "تغيير نمط التفكير",
    "steps_ar": [
      "في أي حوار، إذا سمعت شيئاً غريباً، امنع نفسك من قول: 'هذا غلط'.",
      "بدلاً منها، اسأل: 'كيف عرفت هذا؟' أو 'علمني أكثر'.",
      "استمع للإجابة باهتمام حقيقي.",
      "اشكرهم على المعلومات الجديدة."
    ],
    "steps_en": [
      "In any conversation, if you hear something strange, stop yourself from saying 'That's wrong'.",
      "Instead, ask: 'How did you know that?' or 'Teach me more'.",
      "Listen to the answer with genuine interest.",
      "Thank them for the new information."
    ],
    "outcome_ar": "استبدال ثقافة التصحيح والهجوم بثقافة التعلم والفضول.",
    "emoji": "🔍"
  },
  {
    "id": "comm_018",
    "title_ar": "صوتي مسموع",
    "title_en": "My Voice is Heard",
    "description_ar": "في موقف تشعر فيه أن صوتك غير مسموع، استخدم تقنية: 'أود أن أضيف نقطة...'. تحدث بوضوح، ثبت صوتك في نهاية الجملة، لا تسأل.",
    "skill_focus": "تأكيد الذات",
    "activity_type": "تدريب على الحزم",
    "steps_ar": [
      "تذكر موقفاً شعرت فيه بالتجاهل.",
      "تدرب على جملة: 'أود أن أشارك برأيي...' بصوت ثابت.",
      "في نهاية رأيك، اخفض صوتك قليلاً ولا ترفعه كالسؤال.",
      "استخدمها في أول فرصة حقيقية."
    ],
    "steps_en": [
      "Recall a situation where you felt ignored.",
      "Practice the phrase: 'I would like to share my opinion...' in a steady voice.",
      "At the end of your point, lower your voice slightly, don't raise it like a question.",
      "Use it at the first real opportunity."
    ],
    "outcome_ar": "أخذ مساحة في الحوارات دون عدوانية أو تردد.",
    "emoji": "🎤"
  },
  {
    "id": "comm_019",
    "title_ar": "الاعتذار الكامل",
    "title_en": "The Complete Apology",
    "description_ar": "الاعتذار الحقيقي من 3 خطوات: 'أنا آسف على...' (تحدد الخطأ)، 'أتفهم أنك شعرت بـ...' (تعترف بالألم)، 'في المستقبل سأفعل...' (تقدم حلاً).",
    "skill_focus": "تحمل المسؤولية",
    "activity_type": "تدريب لغوي وأخلاقي",
    "steps_ar": [
      "إذا أخطأت اليوم، لا تقل 'آسف' فقط.",
      "استخدم الجمل الثلاث: 1- 'أنا آسف لأنني [الخطأ]'.",
      "2- 'أتفهم أن هذا جعلك تشعر بـ [الشعور]'.",
      "3- 'في المرة القادمة سأحرص على [الحل]'."
    ],
    "steps_en": [
      "If you make a mistake today, don't just say 'Sorry'.",
      "Use the three sentences: 1- 'I am sorry for [the mistake]'.",
      "2- 'I understand this made you feel [the feeling]'.",
      "3- 'Next time I will make sure to [the solution]'."
    ],
    "outcome_ar": "إصلاح العلاقات بشكل عميق وبناء ثقة حقيقية.",
    "emoji": "💖"
  },
  {
    "id": "comm_020",
    "title_ar": "خطاب العائلة",
    "title_en": "The Family Speech",
    "description_ar": "حضر خطاباً قصيراً (3 دقائق) لعائلتك عن شيء واحد ممتن لهم بسببه. قف وألقه عليهم في وقت العشاء أو اجتماع عائلي.",
    "skill_focus": "التحدث أمام جمع صغير",
    "activity_type": "خطاب وتقدير",
    "steps_ar": [
      "اكتب 3 جمل فقط: 1- لماذا أنا ممتن لهذه العائلة. 2- موقف واحد جمعنا. 3- أمنية لنا.",
      "تدرب على إلقائها بثقة أمام المرآة مرة واحدة.",
      "اجمع العائلة واطلب 3 دقائق من وقتهم.",
      "ألقِ الخطاب وأنت تنظر في عيونهم."
    ],
    "steps_en": [
      "Write only 3 sentences: 1- Why I am grateful for this family. 2- One moment we shared. 3- A wish for us.",
      "Practice delivering it confidently in front of the mirror once.",
      "Gather the family and ask for 3 minutes of their time.",
      "Deliver the speech while looking into their eyes."
    ],
    "outcome_ar": "التعبير العلني عن الحب والامتنان لأقرب الناس.",
    "emoji": "🗣️"
  }
];
