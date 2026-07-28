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

export const COMMUNICATION_EXERCISES_UNIT2: CommunicationExercise[] = [
  {
    "id": "comm_u2_001",
    "title_ar": "دبلوماسية حوار الذكاء الاجتماعي",
    "title_en": "Social Intelligence Dialogue Diplomacy",
    "description_ar": "تعلم تقنية التوافُق والإضافة 'نعم، وبجانب ذلك...' بدلاً من الصدام الجاف برفض آراء الآخرين باستخدام كلمة 'لكن'.",
    "skill_focus": "الدبلوماسية الحوارية والإقناع الناعم",
    "activity_type": "تفاعل حواري ربيعي",
    "steps_ar": [
      "في أي نقاش اليوم، عندما يعبر شخص عن رأي يخالفك، تجنب استخدام كلمة 'لكن' تماماً.",
      "استبدلها بجملة: 'نعم كلامك يحمل وجهة نظر مقدرة، وبجانب ذلك يمكننا أن ننظر للأمر من زاوية...'.",
      "لاحظ كيف تحول النقاش من معركة دفاعية إلى بناء مشافهه إيجابي.",
      "اكتب في مفكرتك كيف استجاب الطرف الآخر للتحول الصيفي الدافئ في الحوار."
    ],
    "steps_en": [
      "In any discussion today, when someone expresses a opposing view, completely avoid using the word 'But'.",
      "Replace it with: 'Yes, your point is appreciated, and alongside that we can also see it from another angle...'.",
      "Notice how the debate transforms from defensive conflict into constructive dialogue.",
      "Write down how the other party responded to this warm, gentle conversational shift."
    ],
    "outcome_ar": "بناء جسور التواصل بدون إثارة الحساسيات أو الصدمات النفسية.",
    "emoji": "🌸"
  },
  {
    "id": "comm_u2_002",
    "title_ar": "قراءة لغة الجسد الصامتة",
    "title_en": "Reading Silent Body Language",
    "description_ar": "طوّر فراسة الملاحظة الدقيقة وتفسير نبرة الصوت وإيماءات اليدين لفهم المشاعر غير المنطوقة لدى عائلتك وأصدقائك.",
    "skill_focus": "الفراسة والذكاء الاجتماعي العاطفي",
    "activity_type": "ملاحظة ميدانية",
    "steps_ar": [
      "اختر جلسة عائلية أو اجتماع أصدقاء وانتبه للغة الجسد دون مقاطعة.",
      "لاحظ شبك الأيدي، اتجاه الأكتاف، نبرة الصوت، وسرعة النظرات.",
      "إذا شعرت بوجود توتر أو حزن غير منطوق، اسأل بلطف: 'أشعر أنك متعب قليلاً اليوم، هل تحب أن نتحدث؟'.",
      "سجل مدى تأثير هذه اللفتة الإنسانية الدافئة على تشجيعه للبوح."
    ],
    "steps_en": [
      "Choose a family or friend gathering and observe body language without interrupting.",
      "Notice crossed hands, shoulder direction, vocal pitch, and eye movement speed.",
      "If you sense unspoken tension or sadness, ask gently: 'You seem a bit tired, would you like to chat?'.",
      "Record how this warm human touch encouraged them to open up."
    ],
    "outcome_ar": "تعميق الفراسة الاجتماعية واحتواء المشاعر المستترة بذكاء ورقي.",
    "emoji": "☀️"
  },
  {
    "id": "comm_u2_003",
    "title_ar": "فن المصافحة ونبرة الصدق",
    "title_en": "Warm Handshake & Vocal Authenticity",
    "description_ar": "تمرين عملي على استخدام المصافحة الدافئة والتواصل البصري المباشر مع إخراج صوت دافئ ومستقر يمنح الطمأنينة.",
    "skill_focus": "الانطباع الأول والثقة الصوتية",
    "activity_type": "تطبيق سلوكي مباشر",
    "steps_ar": [
      "عند لقاء شخص اليوم، صافحه بضغط دافئ ومتزن مع ابتسامة صادقة.",
      "انظر في عينيه مباشرة لمدة 3 ثوانٍ كاملة.",
      "نادي باسمه بنبرة صوتية ربيعية مشاطرة: 'أهلاً بك يا [الاسم]، يسعدني جداً لقاؤك اليوم'.",
      "لاحظ أثر طاقة الصدق والدفء في كسر الجليد فوراً."
    ],
    "steps_en": [
      "When meeting someone today, give a warm, balanced handshake with a genuine smile.",
      "Look directly into their eyes for 3 full seconds.",
      "Say their name in a warm, welcoming tone: 'Welcome [Name], I am so happy to see you today'.",
      "Observe the instant effect of warm energy in breaking the ice."
    ],
    "outcome_ar": "إرساء انطباع أول مبهر ومحمل بعبق الثقة والمودة.",
    "emoji": "🌿"
  },
  {
    "id": "comm_u2_004",
    "title_ar": "المديح الصادق الملاحظ (غير الفضفاض)",
    "title_en": "Specific Sincere Praise",
    "description_ar": "الابتعاد عن الإطراءات العامة وتدريب النفس على توجيه مديح دقيق ومحدد يلامس جهداً حقيقياً بذله الآخر.",
    "skill_focus": "التقدير الإيجابي وبناء العلاقات",
    "activity_type": "تطبيق تقديري",
    "steps_ar": [
      "اختر شخصاً في بيتك أو عملك بذل جهداً صغيراً اليوم.",
      "تجنب الكلمات الفضفاضة مثل 'أنت ممتاز'، بل استخدم تخصيصاً دقيقاً.",
      "قل له: 'أقدر جداً اهتمامك بتنظيم هذه التفاصيل الدقيقة بطريقة رتبت لنا المكان وأراحتنا'.",
      "لاحظ كيف تحول وجهه للإشراق لأن المديح كان ملامساً لحقيقة عمله."
    ],
    "steps_en": [
      "Pick a person at home or work who made a small effort today.",
      "Avoid general words like 'You are great', use precise feedback instead.",
      "Tell them: 'I deeply appreciate how carefully you organized these details, it made the space so comfortable'.",
      "Notice how their face lights up because the praise resonated with their real effort."
    ],
    "outcome_ar": "مضاعفة دافعية المحيطين وغرس ثقافة الاعتراف بالفضل.",
    "emoji": "🌺"
  },
  {
    "id": "comm_u2_005",
    "title_ar": "حدود المحبة والاحترام (قول لا بلطف)",
    "title_en": "Loving Boundaries & Gentle Refusal",
    "description_ar": "كيفية رفض الطلبات الإضافية التي تتجاوز طاقتك دون جرح الآخرين أو الشعور بالذنب.",
    "skill_focus": "تأكيد الذات وتحديد الحدود السليمة",
    "activity_type": "تدريب على الحزم المحب",
    "steps_ar": [
      "عندما يطلب منك شخص طلباً يتجاوز وقتك أو طاقتك اليوم، لا تندفع بالقبول الزائف.",
      "استخدم قاعدة الرفض الإيجابي: 'أشكرك جداً على ثقتك بي، ولأنني أحب أن أؤدي العمل بإتقان، لن أتمكن من استلام هذه المهمة حالياً'.",
      "اقترح حلاً بديلاً إن أمكن دون أن تبرر باعتذارات طارئة متكلفة.",
      "اشعر بالراحة والسلام الداخلي لحمايتك وقتك وصحتك النفسية."
    ],
    "steps_en": [
      "When someone asks for something exceeding your bandwidth today, don't rush to falsely accept.",
      "Use positive refusal: 'Thank you for trusting me. To give things the quality they deserve, I won't be able to take this on right now'.",
      "Offer an alternative solution if possible without over-explaining or apologizing excessively.",
      "Feel inner peace and satisfaction from protecting your time and mental wellness."
    ],
    "outcome_ar": "حماية الطاقة الذاتية وإعادة رسم العلاقات على أسس الاحترام المتبادل.",
    "emoji": "🌻"
  },
  {
    "id": "comm_u2_006",
    "title_ar": "إدارة نبرة الصوت عند اشتداد الحوار",
    "title_en": "Tone Control in Heated Conversations",
    "description_ar": "استخدام خفض الصوت الهادئ لامتصاص حماس أو توتر الطرف الآخر وإعادة النقاش لمساره العقلاني.",
    "skill_focus": "الضبط الذاتي وإدارة النزاعات",
    "activity_type": "تمرين صوتي تطبيقي",
    "steps_ar": [
      "إذا ارتفع صوت الطرف المقابل في نقاش ما، خذ نفساً عميقاً وأخفض صوتك أنت بمقدار درجتين.",
      "تحدث ببطء أكبر وبنبرة ربيعية دافئة ورزينة.",
      "لاحظ كيف يضطر الطرف الآخر تلقائياً إلى خفض صوته ليلائم مستوى صوتك.",
      "قيّم كيف نجحت في قيادة الجو العام من التوتر إلى السلام والهدوء."
    ],
    "steps_en": [
      "If the other person raises their voice in a debate, take a deep breath and lower your own tone by two steps.",
      "Speak more slowly in a calm, warm, balanced spring tone.",
      "Watch how the other person automatically lowers their volume to match yours.",
      "Evaluate how you successfully led the atmosphere from tension to serenity."
    ],
    "outcome_ar": "امتلاك زمام السيطرة على أجواء النقاشات ومنع تصاعد المشادات.",
    "emoji": "🍃"
  },
  {
    "id": "comm_u2_007",
    "title_ar": "التحقق العاطفي الاحتوائي",
    "title_en": "Empathic Emotional Validation",
    "description_ar": "فن إشعار الآخر بأن مشاعره (حزنه، قلقه، حماسه) مقبولة ومفهومة تماماً قبل إعطاء النصائح.",
    "skill_focus": "التعاطف والذكاء العاطفي الاجتماعي",
    "activity_type": "احتواء وتواصل عميق",
    "steps_ar": [
      "عندما يشاركك صديق أو فرد من العائلة مشكلة، قاوم رغبتك الفورية في القفز لحلول سريعة.",
      "قل له أولاً: 'من الطبيعي جداً أن تشعر بهذا الشعور في هذا الموقف الصعب، أنا معك وأفهمك'.",
      "توقف لمدة 10 ثوانٍ ودعه يتنفس ويشعر بشرعية أحاسيسه.",
      "اسأله بعدها: 'هل تحب أن نفكر معاً في حل أم تفضل أن أستمع لك فقط؟'."
    ],
    "steps_en": [
      "When a friend or family member shares a problem, resist the urge to immediately jump into solutions.",
      "Say first: 'It is completely understandable that you feel this way in this situation. I am with you and I understand'.",
      "Pause for 10 seconds to let them feel their emotions are validated.",
      "Then ask: 'Would you like us to brainstorm solutions together, or do you just want me to listen?'."
    ],
    "outcome_ar": "بناء أمان عاطفي عميق يجعل منك ملاذاً صادقاً للمحيطين بك.",
    "emoji": "🍑"
  },
  {
    "id": "comm_u2_008",
    "title_ar": "كسر الجليد وتذويب التحفظ مع الجدد",
    "title_en": "Warm Icebreaking with New Acquaintances",
    "description_ar": "تقنيات مبسطة لفتح حوارات دافئة وممتعة مع زملائه الجدد أو أشخاص تلتقي بهم للمرة الأولى.",
    "skill_focus": "المرونة الاجتماعية والود المباشر",
    "activity_type": "مبادرة مجتمعية",
    "steps_ar": [
      "عند تواجدك في مكان جديد، ابدأ بالابتسامة والملاحظة الإيجابية المحيطة.",
      "اطرح سؤالاً استكشافياً مفتوحاً: 'ما رأيك في تنظيم هذا اللقاء اليوم؟' أو 'كيف تجد أجواء المكان؟'.",
      "استمع لإجابته باهتمام وعقّب بنقطة تلاقٍ مشتركة بينكما.",
      "أنهِ الحوار بعبارة لطيفة تترك أثراً زاهياً: 'سررت جداً بهذه الدردشة الممتعة معك'."
    ],
    "steps_en": [
      "When in a new environment, start with a smile and a warm observation of the surroundings.",
      "Ask an exploratory open question: 'What do you think of today's gathering?' or 'How do you like this ambiance?'.",
      "Listen attentively and respond with a shared common point.",
      "Conclude with a warm parting thought: 'I truly enjoyed chatting with you'."
    ],
    "outcome_ar": "توسيع الدائرة الاجتماعية بسهولة وثقة مفعمة بالحيوية الصيفية.",
    "emoji": "🌼"
  },
  {
    "id": "comm_u2_009",
    "title_ar": "التواصل الرقمي الواعي والدافئ",
    "title_en": "Mindful & Warm Digital Messaging",
    "description_ar": "صياغة الرسائل النصية وتطبيقات المراسلة بأسلوب واضح يمنع سوء الفهم وينقل المشاعر الإيجابية.",
    "skill_focus": "الذكاء الرقمي والذوق في المراسلة",
    "activity_type": "تطوير الرسائل النصية",
    "steps_ar": [
      "قبل إرسال أي رسالة نصية مهمة اليوم، اقرأها بصوت عالٍ لتفقد نبرتها الضمنية.",
      "أضف عبارة افتتاحيّة دافئة مثل: 'أتمنى لك يوماً مشرقاً ومثمراً 🌸'.",
      "إذا كان موضوع الرسالة يحتمل التأويل، استخدم رسالة صوتية قصيرة ناعمة بدلاً من النص الجاف.",
      "لاحظ انسيابية الردود والارتياح في التواصل الرقمي."
    ],
    "steps_en": [
      "Before sending any important text message today, read it out loud to check its underlying tone.",
      "Add a warm opening line like: 'Wishing you a bright and fruitful day 🌸'.",
      "If the topic could be misunderstood, send a short, gentle voice note instead of dry text.",
      "Observe the smooth and pleasant flow of digital responses."
    ],
    "outcome_ar": "تجنب جفاف الرسائل النصية وإضفاء طابع إنساني راقٍ على المحادثات الرقمية.",
    "emoji": "📱"
  },
  {
    "id": "comm_u2_010",
    "title_ar": "تحويل التذمر إلى طاقة حلول إيجابية",
    "title_en": "Reframing Complaints into Positive Solutions",
    "description_ar": "قيادة الجلسات التي يكثر فيها التذمر ونقل التركيز من ندب الحظ إلى صناعة الفرص.",
    "skill_focus": "القيادة الاجتماعية والتفكير الإيجابي",
    "activity_type": "توجيه حواري مثبت",
    "steps_ar": [
      "إذا تواجدت في مجموعة تكرر الشكوى والتذمر حول موضوع ما، استمع أولاً بدقيقة تعاطف.",
      "ثم وجه السؤال المغير للاتجاه: 'فهمت التحدي جيداً، ما هي الخطة البسيطة التي يمكننا البدء بها الآن لتحسين الوضع؟'.",
      "طرح خيارين عمليين محفزين ونقل النقاش نحو الفعل والإنتاج.",
      "لاحظ كيف تتغير طاقة المكان من الخمول والسلبية إلى الحماس المشرق."
    ],
    "steps_en": [
      "If you find yourself in a group complaining endlessly about a topic, listen for a minute with empathy.",
      "Then ask the pivot question: 'I understand the challenge well, what simple step can we take right now to improve this?'.",
      "Propose two inspiring practical options to shift focus toward action and output.",
      "Notice how the room's energy transforms from negativity to bright enthusiasm."
    ],
    "outcome_ar": "تحويل مجرى المحادثات نحو الإيجابية ونشر روح الأمل والعمل.",
    "emoji": "🌅"
  },
  {
    "id": "comm_u2_011",
    "title_ar": "تقنية الجسر الحواري لتأليف القلوب",
    "title_en": "The Dialogue Bridge Technique",
    "description_ar": "الربط بين وجهتي نظر متخالفتين بين صديقين أو فردين في العائلة وتوضيح نقاط الالتقاء بينهما.",
    "skill_focus": "الوساطة الذكية وإصلاح ذات البين",
    "activity_type": "وساطة وتقريب آراء",
    "steps_ar": [
      "عند وجود اختلاف في الرأي بين طرفين أمامك، استمع لكليهما بإنصات متزن.",
      "قل لهما: 'إذا سمحتما لي، أرى أن كلاكما يهدف للخير نفسه، فالأول يحرص على [الهدف 1] والثاني يركز على [الهدف 2]'..",
      "بث روح التوفيق: 'ما رأيكم أن ندمج الفكرتين ليكون لدينا حل مكتمل؟'.",
      "سجل كيف أسهمت كلمتك المصلحة في إعادة الدفء والسلام بينهما."
    ],
    "steps_en": [
      "When two people disagree in front of you, listen to both with balanced attention.",
      "Say: 'If you allow me, I see that both of you want the best result; the first cares about [Goal 1] and the second focuses on [Goal 2]'.",
      "Bridge them: 'What if we combine both ideas into a complete solution?'.",
      "Note how your harmonizing words restored warmth and harmony."
    ],
    "outcome_ar": "لعب دور حمامة السلام وتجسيد الذكاء الاجتماعي في أبهى صوره.",
    "emoji": "🌉"
  },
  {
    "id": "comm_u2_012",
    "title_ar": "حضور التواصل البصري الدافئ (دون إحراج)",
    "title_en": "Warm & Respectful Eye Contact Presence",
    "description_ar": "التوازن في التواصل البصري أثناء الاستماع والمحادثة لمنح الشعور بالأهمية والاهتمام المتبادل.",
    "skill_focus": "الكاريزما والحضور الاجتماعي",
    "activity_type": "تدريب بصري سلوكي",
    "steps_ar": [
      "أثناء حديث شخص معك اليوم، حافظ على نظر مريح لمثلث الوجه (العينين والجبين) بنسبة 70% من الوقت.",
      "اشعر بالدفء الداخلي والاهتمام الحقيقي بكلامه دون التحديق المزعج.",
      "انظر جانباً برفق عند التفكير ثم أعد عينيك إليه عند التأكيد والإيماء.",
      "استشعر عمق الترابط والمصداقية التي تتولد من هذا التواصل المباشر."
    ],
    "steps_en": [
      "While someone speaks with you today, maintain comfortable eye contact (eyes and forehead triangle) 70% of the time.",
      "Feel inner warmth and genuine care for their words without uncomfortable staring.",
      "Gently look away when reflecting, then return eye contact when nodding and confirming.",
      "Feel the deep bonding and credibility born from this direct connection."
    ],
    "outcome_ar": "تعزيز الكاريزما الشخصية ومنح المتحدث شعوراً راقياً بالاحترام والتقدير.",
    "emoji": "👁️"
  },
  {
    "id": "comm_u2_013",
    "title_ar": "فن الأسئلة المفتوحة والمثمرة",
    "title_en": "Art of Fruitful Open-Ended Questions",
    "description_ar": "صياغة أسئلة تبدأ بـ 'كيف' و'ماذا' لفتح آفاق الحوار المشوق وتوسيع أفكار الطرف الآخر.",
    "skill_focus": "إدارة الحوارات العميقة",
    "activity_type": "تطوير الأسئلة الحوارية",
    "steps_ar": [
      "تجنب الأسئلة المغلقة التي تجبر الآخر على إجابة اختصارية بـ 'نعم' أو 'لا'.",
      "استبدل سؤال 'هل كان يومك جيداً؟' بسؤال ربيعي مشوق: 'ما أجمل تجربة أضاءت يومك اليوم؟'.",
      "استمع للإجابة بشغف واسأله سؤالاً متفرعاً عنها.",
      "سجل فرق عمق المحادثة وتدفق الأفكار بين الطريقتين."
    ],
    "steps_en": [
      "Avoid closed questions that force a short 'Yes' or 'No' answer.",
      "Replace 'Was your day good?' with an inspiring question: 'What was the brightest experience that lit up your day?'.",
      "Listen with enthusiasm and ask a follow-up question based on their answer.",
      "Record the difference in conversation depth and idea flow."
    ],
    "outcome_ar": "إثراء جلسات الحوار واستخراج الكنوز والخبرات المخبأة لدى الآخرين.",
    "emoji": "🌱"
  },
  {
    "id": "comm_u2_014",
    "title_ar": "امتصاص واحتواء الغضب العابر",
    "title_en": "Containing Fleeting Anger Calmly",
    "description_ar": "التعامل مع انفعال أحد أفراد الأسرة أو الأصدقاء بهدوء تام دون أخذ الأمر بشكل شخصي.",
    "skill_focus": "الصلابة النفسية والاحتواء الإنساني",
    "activity_type": "مواجهة واحتواء الانفعال",
    "steps_ar": [
      "إذا صادفت شخصاً غاضباً أو منفصماً اليوم، كرر في سرك: 'غضبه يعبر عن ألمه الداخلي وليس عني'.",
      "حافظ على ثبات جسدك ولا ترد بنفس الأسلوب الأرادي المنفعل.",
      "انتظر حتى ينهي ثورته ثم قل بصلابة وهدوء: 'أسمعك جيدا، يهمني أمرك ودعنا نتحدث بهدوء لنصل لحل'.",
      "تأمل كيف يذوب الانفعال أمام صخرة الهدوء والذكاء الاجتماعي."
    ],
    "steps_en": [
      "If you encounter an angry or agitated person today, repeat internally: 'Their anger reflects their inner pain, not me'.",
      "Keep your posture steady and do not respond with reactive anger.",
      "Wait until they finish venting, then say calmly: 'I hear you clearly, I care about you, let us talk quietly to solve this'.",
      "Observe how emotion melts away against the rock of calm social intelligence."
    ],
    "outcome_ar": "حماية نفسك من الانجرار للمشاحنات العبثية وحفظ السلام العائلي والمجتمعي.",
    "emoji": "🌊"
  },
  {
    "id": "comm_u2_015",
    "title_ar": "إبراز ونسب الفضل لإنجازات الفريق",
    "title_en": "Highlighting & Attributing Team Accomplishments",
    "description_ar": "الاحتفاء بنجاحات الزملاء ونسب الفضل لأصحابه لتعزيز روح الأخوة والعمل الجماعي.",
    "skill_focus": "الكرم الاجتماعي والروح الجماعية",
    "activity_type": "تقدير وثناء علني",
    "steps_ar": [
      "عند تحقيق نجاح أو إنجاز في مشروع أو عمل عائلي، لا تسلط الضوء على نفسك فقط.",
      "اذكر أسماء المساهمين علناً: 'هذا النجاح بفضل الفكرة المبدعة التي اقترحها [الاسم] والجهد المميز من [الاسم]'..",
      "لاحظ علامات السعادة والولاء والمحبة الصادقة في وجوههم.",
      "سجل كيف يزيد هذا السلوك القيادي الراقي من مكانتك ومحبتك في قلوبهم."
    ],
    "steps_en": [
      "When achieving success in a project or family task, do not spotlight yourself alone.",
      "Publicly acknowledge contributors: 'This success happened thanks to the creative idea proposed by [Name] and the effort of [Name]'.",
      "Notice the signs of genuine happiness, loyalty, and affection on their faces.",
      "Record how this noble leadership behavior builds respect and deep admiration."
    ],
    "outcome_ar": "ترسيخ بيئة عمل وعائلة قائمة على السخاء النفسي والتقدير المتبادل.",
    "emoji": "🎉"
  },
  {
    "id": "comm_u2_016",
    "title_ar": "فراسة الانطباع الربيعي المشرق",
    "title_en": "Bright Spring Impression Mastery",
    "description_ar": "الدخول إلى أي مجلس بطاقة إيجابية وهندام مرتب وابتسامة تشع بالأمل وتنعش الحاضرين.",
    "skill_focus": "الكاريزما والطاقة الإيجابية",
    "activity_type": "حضور وإشراق اجتماعي",
    "steps_ar": [
      "قبل دخولك أي اجتماع أو مجلس اليوم، أصلح قامتك وخذ نفساً عميقاً يملأ رئتيك.",
      "تذكر فكرة سعيدة تضفي بريقاً صادقاً على عينيك وابتسامتك.",
      "ادخل بقدم واثقة وسلم بتحية دافئة بصوت مسموع ومبهج.",
      "شاهد كيف تنتقل الطاقة الربيعية المشرقة فوراً إلى كل من في القاعة."
    ],
    "steps_en": [
      "Before entering any gathering or room today, straighten your posture and take a deep, refreshing breath.",
      "Recall a happy memory that adds a natural shine to your eyes and smile.",
      "Enter with confident steps and greet everyone with a warm, uplifting voice.",
      "Watch how bright spring energy instantly spreads to everyone in the room."
    ],
    "outcome_ar": "جعل حضورك مكسباً ينتظره الجميع ومصدراً للبهجة والانشراح.",
    "emoji": "☀️"
  },
  {
    "id": "comm_u2_017",
    "title_ar": "عادة الثناء والامتنان العائلي اليومي",
    "title_en": "Daily Family Gratitude & Praise Ritual",
    "description_ar": "إبتكار طقس عائلي محبب في ختام اليوم لتبادل عبارات الشكر والتقدير بين الأفراد.",
    "skill_focus": "الترابط الأسري والتواصل الإيجابي",
    "activity_type": "طقس عائلي مستدام",
    "steps_ar": [
      "في نهاية اليوم (على العشاء أو قبل النوم)، تجمع مع أسرتك لمدة 5 دقائق.",
      "ليشارك كل فرد شيئاً واحداً جميلاً لاحظه في فرد آخر اليوم وقدم له الشكر عليه.",
      "شجع الصغار والكبار على المشاركة بلطف دون خجل.",
      "استشعر الدفء والسكينة التي تحف المنزل قبل النوم بفضل هذا التواصل الطيب."
    ],
    "steps_en": [
      "At the end of the day (dinner or bedtime), gather with your family for 5 minutes.",
      "Have each member share one nice thing they noticed about another member today and thank them for it.",
      "Encourage everyone, young and old, to participate warmly.",
      "Feel the cozy warmth and tranquility enveloping the home before sleep."
    ],
    "outcome_ar": "تغذية جذور المحبة الأسرية وإغلاق اليوم بحس مفعم بالأمان والامتنان.",
    "emoji": "🏡"
  },
  {
    "id": "comm_u2_018",
    "title_ar": "الإصغاء الوجداني الخالي من التشتت الرقمي",
    "title_en": "Distraction-Free Empathic Listening",
    "description_ar": "إبعاد الهواتف والشاشات بنسبة 100% أثناء حوارك مع ابنك، زوجتك، أو صديقك للتفرغ التام له.",
    "skill_focus": "التركيز والاهتمام الكامل",
    "activity_type": "جلسة إنصات صافية",
    "steps_ar": [
      "عندما يأتي إليك شخص ليتحدث معك اليوم، ضع هاتفك واقلبه على شاشته بعيداً عن عينيك.",
      "وجه جسدك بالكامل نحو المتحدث وأعطه انتباهك الصافي 100%.",
      "لا تنظر إلى الإشعارات أو الساعة أثناء حديثه نهائياً.",
      "لاحظ امتنان الطرف الآخر وشعوره القوي بقيمته ومكانته العالية لديك."
    ],
    "steps_en": [
      "When someone comes to talk to you today, put your phone face down away from sight.",
      "Turn your entire body toward the speaker and give them 100% focused attention.",
      "Do not look at notifications or your watch at all while they speak.",
      "Notice the other person's gratitude and their strong sense of being truly valued."
    ],
    "outcome_ar": "إعادة القيمة والكرامة الإنسانية للتواصل المباشر بعيداً عن صخب الشاشات.",
    "emoji": "🌷"
  },
  {
    "id": "comm_u2_019",
    "title_ar": "إدارة الحديث السلبي والشائعات بلباكة",
    "title_en": "Tactfully Handling Gossip & Negative Rumors",
    "description_ar": "حماية المجالس من الخوض في أعراض الآخرين وتغيير مسار الحديث بأسلوب ذكي ومقبول.",
    "skill_focus": "النزاهة والذكاء الاجتماعي الأخلاقي",
    "activity_type": "حماية الجلسات وتوجيهها",
    "steps_ar": [
      "إذا بدأ الحوار يتحول إلى غيبة أو تناقل شائعات عن غائب، لا تشارك بالاستماع الخامل.",
      "تدخل بلباقة ورقة: 'فلان فيه خير كثير، وما رأيكم أن نتحدث في موضوعنا الممتع اليوم عن...'..",
      "أو اذكر صفة إيجابية واحدة عن الغائب لتلطيف الجو وإغلاق باب السلبية.",
      "شاهد كيف تحمي المجلس وتكسب احترام الجميع لنزاهتك."
    ],
    "steps_en": [
      "If the conversation turns to gossip or rumors about an absent person, do not passively listen.",
      "Intervene tactfully: '[Person] has many great qualities, what if we talk about our exciting topic today regarding...'..",
      "Or mention one positive trait about the absent person to soften the atmosphere and close the door to negativity.",
      "Watch how you preserve the gathering's purity and gain everyone's respect for your integrity."
    ],
    "outcome_ar": "إحلال الطهارة والسلام في المجالس وبناء سمعة اجتماعية ناصعة.",
    "emoji": "🦋"
  },
  {
    "id": "comm_u2_020",
    "title_ar": "بطاقة المحبة اليدوية الرقيقة",
    "title_en": "Handwritten Heartfelt Appreciation Note",
    "description_ar": "كتابة بطاقة شكر بخط اليد وتقديمها لشخص قدم لك معروفا أو ترك أثرا جميلا في حياتك.",
    "skill_focus": "التعبير الرقيق وترك الأثر الطيب",
    "activity_type": "هدية إنسانية دافئة",
    "steps_ar": [
      "احضر ورقة أو بطاقة جميلة واكتب فيها بخط يدك 3 أسطر تعبر عن تقديرك لشخص عزيز.",
      "اكتب كلمات من القلب مثل: 'شكراً لوجودك الصادق في حياتي، طاقتك الإيجابية تلهمني دائماً'.",
      "قدمها له مع ابتسامة وردة ربيعية بسيطة أو كبسولة قهوة.",
      "احتفظ بذكرى هذه اللحظة الدافئة في وجدانكما معاً."
    ],
    "steps_en": [
      "Get a nice piece of paper or card and write by hand 3 lines expressing appreciation to a dear person.",
      "Write heartfelt words like: 'Thank you for your sincere presence in my life, your positive energy always inspires me'.",
      "Give it to them with a smile, a simple spring flower, or a coffee.",
      "Cherish the memory of this warm, beautiful moment shared together."
    ],
    "outcome_ar": "صناعة ذكريات إنسانية لا تُنسى وترسيخ مشاعر الود الخالص.",
    "emoji": "💌"
  }
];

