export interface ConfidenceExercise {
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

export const CONFIDENCE_EXERCISES: ConfidenceExercise[] = [
  {
    "id": "conf_001",
    "title_ar": "أنا أمام المرآة",
    "title_en": "Me in the Mirror",
    "description_ar": "تدرب على التحدث أمام المرآة لمدة دقيقتين. شاهد نفسك وأنت تتكلم. لاحظ تعابير وجهك، حركات يديك، وقفتك. صديقك في المرآة هو أول جمهور لك.",
    "skill_focus": "التعرف على لغة الجسد",
    "activity_type": "تدريب فردي",
    "steps_ar": [
      "قف أمام مرآة كبيرة.",
      "تحدث عن أي موضوع (يومك، حلمك) لمدة دقيقتين دون توقف.",
      "راقب: هل تبتسم؟ هل تنظر لعينيك؟ هل تقف بشكل واثق؟",
      "كرر يومياً ولاحظ تحسن ثقتك."
    ],
    "steps_en": [
      "Stand in front of a big mirror.",
      "Talk about any topic for 2 minutes without stopping.",
      "Observe: Are you smiling? Making eye contact with yourself? Standing confidently?",
      "Repeat daily and notice your confidence improving."
    ],
    "outcome_ar": "بناء الوعي بلغة الجسد وتصحيحها ذاتياً.",
    "emoji": "🪞"
  },
  {
    "id": "conf_002",
    "title_ar": "تنفس البطل",
    "title_en": "Hero Breathing",
    "description_ar": "قبل أي الحديث، تنفس 3 مرات عميقة: شهيق 4 ثوان، حبس 4 ثوان، زفير 6 ثوان. هذا يهدئ الأعصاب ويجعل صوتك أقوى.",
    "skill_focus": "التحكم بالتوتر",
    "activity_type": "تمرين تنفس",
    "steps_ar": [
      "ضع يدك على بطنك.",
      "شهيق بطيء من الأنف (عد 4)، احبس (عد 4).",
      "زفير من الفم بصوت 'هففف' (عد 6).",
      "كرر 3 مرات قبل أي موقف مهم."
    ],
    "steps_en": [
      "Place hand on belly.",
      "Inhale slowly through nose (count 4), hold (4).",
      "Exhale with 'whoosh' sound (count 6).",
      "Repeat 3 times before any important moment."
    ],
    "outcome_ar": "السيطرة على رهاب المسرح عبر التنفس العميق.",
    "emoji": "🫁"
  },
  {
    "id": "conf_003",
    "title_ar": "تحدي الـ 30 ثانية",
    "title_en": "The 30-Second Challenge",
    "description_ar": "اختر كلمة عشوائية (تفاحة، قمر، مدرسة). تحدث عنها دون توقف لمدة 30 ثانية. لا تفكر، فقط تكلم. الهدف الطلاقة وليس الكمال.",
    "skill_focus": "الطلاقة والارتجال",
    "activity_type": "لعبة ارتجالية",
    "steps_ar": [
      "اطلب من أحدهم إعطاءك كلمة عشوائية.",
      "اضبط مؤقت 30 ثانية.",
      "تكلم دون توقف عن أي شيء يخطر ببالك متعلق بالكلمة.",
      "كرر مع كلمات جديدة كل يوم."
    ],
    "steps_en": [
      "Ask someone to give you a random word.",
      "Set a 30-second timer.",
      "Speak nonstop about anything related to that word.",
      "Repeat with new words daily."
    ],
    "outcome_ar": "تدريب العقل على التفكير السريع والحديث بطلاقة.",
    "emoji": "⏱️"
  },
  {
    "id": "conf_004",
    "title_ar": "قصتي في دقيقة",
    "title_en": "My Story in a Minute",
    "description_ar": "لخص قصة واقعية حدثت لك (موقف مضحك، موقف محرج) في دقيقة واحدة. درب نفسك حتى تستطيع روايتها بسلاسة.",
    "skill_focus": "السرد القصصي المختصر",
    "activity_type": "رواية شفهية",
    "steps_ar": [
      "اختر موقفاً شخصياً صغيراً.",
      "اكتبه في 5 جمل قصيرة فقط.",
      "احفظه ثم احكه بصوت عالٍ أمام شخص أو مسجل.",
      "لاحظ: البداية المشوقة، الذروة، النهاية."
    ],
    "steps_en": [
      "Choose a small personal moment.",
      "Write it in only 5 short sentences.",
      "Memorize then tell it aloud to someone or a recorder.",
      "Notice: exciting start, climax, ending."
    ],
    "outcome_ar": "إتقان فن جذب الانتباه بسرد القصص الشخصية.",
    "emoji": "🗣️"
  },
  {
    "id": "conf_005",
    "title_ar": "وضعية القوة",
    "title_en": "Power Pose",
    "description_ar": "قف 'كوضعية المنتصر': قدمان متباعدتان قليلاً، يدان على الخصر، صدر مفتوح، ذقن مرفوعة. ابقَ دقيقتين. هذه وضعية تزيد هرمون الثقة.",
    "skill_focus": "لغة الجسد الواثقة",
    "activity_type": "تمرين جسدي",
    "steps_ar": [
      "قف في منتصف الغرفة.",
      "خذ وضعية 'المنتصر': أرجل ثابتة، أكتاف للخلف، يدين على الخصر.",
      "ابقَ في هذه وضعية دقيقتين كاملتين وأنت تتنفس بعمق.",
      "لاحظ شعورك بعدها وكرر قبل أي عرض."
    ],
    "steps_en": [
      "Stand in the middle of the room.",
      "Take the 'victory' pose: steady legs, shoulders back, hands on hips.",
      "Stay for 2 full minutes breathing deeply.",
      "Notice your feeling afterwards and repeat before any presentation."
    ],
    "outcome_ar": "استخدام لغة الجسد لبرمجة العقل على الثقة.",
    "emoji": "🦸"
  },
  {
    "id": "conf_006",
    "title_ar": "أخطاء متعمدة",
    "title_en": "Deliberate Mistakes",
    "description_ar": "أثناء التدريب، تعمد ارتكاب خطأ بسيط وتجاوزه بسلاسة. ستتعلم أن الخطأ ليس نهاية العالم، بل جزء طبيعي من الحديث.",
    "skill_focus": "المرونة أثناء الحديث",
    "activity_type": "محاكاة الخطأ",
    "steps_ar": [
      "أثناء حديثك التدريبي، تعمد تلعثم بسيط أو خطأ في كلمة.",
      "صحح نفسك بهدوء أو ابتسم واستمر وكأن شيئاً لم يحدث.",
      "لاحظ أن الجمهور (حتى لو شخص واحد) لن يهتم بالخطأ.",
      "كرر حتى تفقد الخوف من الأخطاء."
    ],
    "steps_en": [
      "During practice talk, deliberately stumble or mispronounce a word.",
      "Correct yourself calmly or smile and continue as if nothing happened.",
      "Notice the audience won't care about the mistake.",
      "Repeat until you lose fear of errors."
    ],
    "outcome_ar": "تحرير النفس من هوس الكمال والخوف من الأخطاء.",
    "emoji": "🔄"
  },
  {
    "id": "conf_007",
    "title_ar": "سؤال وجواب ارتجالي",
    "title_en": "Impromptu Q&A",
    "description_ar": "اطلب من أحدهم أن يسألك 5 أسئلة غير متوقعة. أجب بسرعة دون تفكير طويل. تدرب على التفكير على قدميك.",
    "skill_focus": "الاستجابة السريعة",
    "activity_type": "لعبة ثنائية",
    "steps_ar": [
      "اجلس مع صديق أو أخ.",
      "دعه يسألك أسئلة مفاجئة (ما رأيك في...؟ ماذا لو...؟).",
      "أجب فوراً دون تردد. لا بأس إن كانت الإجابة غير كاملة.",
      "تبادل الأدوار."
    ],
    "steps_en": [
      "Sit with a friend or sibling.",
      "Let them ask you surprise questions (What do you think of...? What if...?).",
      "Answer immediately without hesitation. Imperfect answers are fine.",
      "Switch roles."
    ],
    "outcome_ar": "تنمية سرعة البديهة ورد الفعل اللفظي.",
    "emoji": "❓"
  },
  {
    "id": "conf_008",
    "title_ar": "صوتي مسموع",
    "title_en": "My Voice is Heard",
    "description_ar": "تدرب على إيصال صوتك بوضوح. تحدث بصوت مرتفع يكفي لشخص في آخر الغرفة. لا تصرخ. فقط أوصل صوتك بثقة.",
    "skill_focus": "علو الصوت المناسب",
    "activity_type": "تدريب صوتي",
    "steps_ar": [
      "قف في طرف غرفة وتخيل شخصاً في الطرف الآخر.",
      "تحدث معه بصوت واضح مسموع دون صراخ.",
      "سجل صوتك واستمع: هل هو واضح؟ قوي؟",
      "تدرب على إيصال الصوت من بطنك لا حلقك."
    ],
    "steps_en": [
      "Stand at one end of a room and imagine someone at the other end.",
      "Speak to them clearly, audibly without shouting.",
      "Record and listen: Is it clear? Strong?",
      "Practice projecting from your belly, not throat."
    ],
    "outcome_ar": "التخلص من الصوت المنخفض أو المتردد.",
    "emoji": "📢"
  },
  {
    "id": "conf_009",
    "title_ar": "قاعدة الـ 3 نقاط",
    "title_en": "The 3-Point Rule",
    "description_ar": "لكي تتحدث بوضوح، قسم أي موضوع إلى 3 نقاط فقط. مثال: 'التعليم: 1- يبني العقل، 2- يفتح الفرص، 3- يصنع المستقبل.'",
    "skill_focus": "تنظيم الأفكار",
    "activity_type": "هيكلة ذهنية",
    "steps_ar": [
      "اختر أي موضوع.",
      "فكر في 3 نقاط رئيسية فقط لتقوله عنه.",
      "قل: 'سأتحدث عن [الموضوع] من 3 جوانب: أولاً... ثانياً... ثالثاً...'.",
      "لاحظ كيف يصبح كلامك منظماً."
    ],
    "steps_en": [
      "Choose any topic.",
      "Think of only 3 main points to say about it.",
      "Say: 'I'll talk about [topic] from 3 aspects: First... Second... Third...'.",
      "Notice how organized your speech becomes."
    ],
    "outcome_ar": "تحويل الكلام العشوائي إلى خطاب منظم ومؤثر.",
    "emoji": "🔺"
  },
  {
    "id": "conf_010",
    "title_ar": "عرض مصعد",
    "title_en": "Elevator Pitch",
    "description_ar": "تخيل أنك تقابل شخصاً مهماً في المصعد. لديك 30 ثانية لتعرف بنفسك وتترك انطباعاً رائعاً. ماذا ستقول؟",
    "skill_focus": "تقديم النفس باختصار",
    "activity_type": "محاكاة موقف",
    "steps_ar": [
      "جهزي 3 جمل: 1- اسمي... 2- أحب/أجيد... 3- حلمي...",
      "تدرب على قولهم في 30 ثانية بحماس وابتسامة.",
      "جرب عرضك على أفراد أسرتك.",
      "اطلب منهم تقييم: 'هل فهمت من أنا وماذا أريد؟'."
    ],
    "steps_en": [
      "Prepare 3 sentences: 1- My name is... 2- I love/excel at... 3- My dream is...",
      "Practice saying them in 30 seconds with enthusiasm and a smile.",
      "Try your pitch on family members.",
      "Ask them: 'Did you understand who I am and what I want?'."
    ],
    "outcome_ar": "الاستعداد لأي فرصة تعارف أو مقابلة.",
    "emoji": "🛗"
  },
  {
    "id": "conf_011",
    "title_ar": "التحدث مع الجماد",
    "title_en": "Talking to Objects",
    "description_ar": "لتتغلب على الخوف من نظرات الناس، تدرب على التحدث إلى 'جمهور' من الدمى أو الوسائد المرتبة على الكنب. انظر في 'أعينهم' وتحدث.",
    "skill_focus": "التغلب على رهاب الجمهور",
    "activity_type": "تدريب محاكاة",
    "steps_ar": [
      "رتب مجموعة من الدمى أو الوسائد كمستمعين.",
      "قف أمامهم وتحدث عن أي موضوع 3 دقائق.",
      "انظر في 'أعينهم' بالتناوب. ابتسم لهم.",
      "كرر حتى تشعر أن التحدث أمام جمهور حقيقي أصبح أسهل."
    ],
    "steps_en": [
      "Arrange dolls or cushions as an audience.",
      "Stand and talk about any topic for 3 minutes.",
      "Look into their 'eyes' alternately. Smile at them.",
      "Repeat until speaking to a real audience feels easier."
    ],
    "outcome_ar": "تخفيف حدة الخوف من مواجهة الجمهور تدريجياً.",
    "emoji": "🧸"
  },
  {
    "id": "conf_012",
    "title_ar": "تحدي عدم التوقف",
    "title_en": "The No-Stop Challenge",
    "description_ar": "تحدى صديقك: من يستطيع التحدث دون توقف لمدة دقيقتين عن موضوع معين دون أن يقول 'اممم' أو 'يعني'؟ من يخطئ يخسر نقطة.",
    "skill_focus": "التخلص من كلمات الحشو",
    "activity_type": "لعبة تنافسية",
    "steps_ar": [
      "اختر أنت وصديق موضوعاً.",
      "تبادلا الأدوار. كل واحد يتحدث دقيقتين.",
      "عينوا 'حكماً' يعد كلمات الحشو (إممم، يعني، زي ما تقول...).",
      "من يستخدم حشواً أقل يفوز."
    ],
    "steps_en": [
      "Choose a topic with a friend.",
      "Take turns. Each speaks for 2 minutes.",
      "Appoint a 'judge' to count filler words (umm, like, you know...).",
      "Whoever uses fewer fillers wins."
    ],
    "outcome_ar": "تحسين جودة الحديث بالتخلص من الكلمات غير المفيدة.",
    "emoji": "🚫"
  },
  {
    "id": "conf_013",
    "title_ar": "حكواتي العائلة",
    "title_en": "Family Storyteller",
    "description_ar": "في ليلة عائلية، كن أنت 'الحكواتي'. احكِ قصة (من القصص التعليمية) لأفراد أسرتك بصوت معبر وحركات جسد. استمتع بكونك مركز الاهتمام.",
    "skill_focus": "الأداء القصصي أمام جمع صغير",
    "activity_type": "عرض عائلي",
    "steps_ar": [
      "اختر قصة قصيرة تحبها.",
      "تدرب على حكايتها بصوت مرتفع وبتعبيرات وجه.",
      "في وقت العشاء أو الجلسة العائلية، أعلن: 'لدي قصة لكم!'.",
      "احكِها واستمتع بتصفيق عائلتك."
    ],
    "steps_en": [
      "Choose a short story you love.",
      "Practice telling it loudly with facial expressions.",
      "At dinner or family time, announce: 'I have a story for you!'.",
      "Tell it and enjoy your family's applause."
    ],
    "outcome_ar": "بناء الثقة من خلال التجارب الإيجابية في بيئة آمنة.",
    "emoji": "🎪"
  },
  {
    "id": "conf_014",
    "title_ar": "راوي الأخبار",
    "title_en": "News Anchor",
    "description_ar": "تخيل أنك مذيع أخبار. اقرأ فقرة خبرية (من جريدة أو موقع) بصوت المذيعين: واضح، جاد، ومتحمس قليلاً. سجل فيديو لنفسك.",
    "skill_focus": "التنغيم والتعبير الصوتي",
    "activity_type": "محاكاة إعلامية",
    "steps_ar": [
      "اختر خبراً قصيراً.",
      "اقرأه أولاً بصوت عادي.",
      "اقرأه ثانية 'كمذيع': غير نبرتك، توقف عند الفواصل، أبرز الكلمات المهمة.",
      "شاهد تسجيلك ولاحظ الفرق."
    ],
    "steps_en": [
      "Choose a short news piece.",
      "Read it first in a normal voice.",
      "Read it again 'as an anchor': change tone, pause at commas, highlight key words.",
      "Watch your recording and notice the difference."
    ],
    "outcome_ar": "إتقان التنويع الصوتي لجذب انتباه المستمعين.",
    "emoji": "📺"
  },
  {
    "id": "conf_015",
    "title_ar": "كسر حاجز الصمت",
    "title_en": "Breaking the Ice",
    "description_ar": "في أي تجمع، تحدى نفسك ببدء حديث مع شخص لا تعرفه. اسأل: 'ما أكثر شيء ممتع فعلته اليوم؟'. الهدف: المبادرة أنت أولاً.",
    "skill_focus": "المبادأة الاجتماعية",
    "activity_type": "تحدي اجتماعي واقعي",
    "steps_ar": [
      "في مناسبة عائلية أو تجمع أصدقاء.",
      "اختر شخصاً لا تعرفه جيداً.",
      "خذ نفساً عميقاً وقل: 'مرحباً! أنا... ما أكثر شيء ممتع فعلته اليوم؟'.",
      "كافئ نفسك على شجاعتك."
    ],
    "steps_en": [
      "At a family gathering or friend meetup.",
      "Choose someone you don't know well.",
      "Take a deep breath and say: 'Hi! I'm... What's the most fun thing you did today?'.",
      "Reward yourself for your courage."
    ],
    "outcome_ar": "تحويل الخوف من الغرباء إلى فرصة لبناء علاقات جديدة.",
    "emoji": "🧊"
  },
  {
    "id": "conf_016",
    "title_ar": "سرد الصور",
    "title_en": "Picture Narration",
    "description_ar": "افتح صورة عشوائية (من مجلة أو هاتف). اشرح ما تراه وكأنك دليل سياحي يصف لوحة فنية. تحدث عن الألوان، المشاعر، القصة خلف الصورة.",
    "skill_focus": "الوصف الإبداعي",
    "activity_type": "وصف شفهي",
    "steps_ar": [
      "اختر صورة واحدة.",
      "ضع مؤقتاً لدقيقتين.",
      "صف كل ما تراه: 'في هذه الصورة، أرى... الألوان توحي بـ...'.",
      "أضف تخميناً: 'أعتقد أن القصة خلف هذه الصورة هي...'."
    ],
    "steps_en": [
      "Choose one picture.",
      "Set a 2-minute timer.",
      "Describe everything: 'In this picture, I see... the colors suggest...'.",
      "Add a guess: 'I think the story behind this picture is...'."
    ],
    "outcome_ar": "تنمية مهارة الوصف الحي والمرتجل.",
    "emoji": "🖼️"
  },
  {
    "id": "conf_017",
    "title_ar": "خطاب التأثير",
    "title_en": "The Persuasive Speech",
    "description_ar": "اختر قضية تؤمن بها (القراءة، الرياضة، البيئة). اكتب خطاباً من 5 جمل تحاول فيه إقناع أسرتك بتبني رأيك. استخدم 'لأن' و'تخيلوا'.",
    "skill_focus": "الإقناع وبناء الحجة",
    "activity_type": "كتابة وإلقاء",
    "steps_ar": [
      "اختر موضوعاً واحداً تحبه.",
      "اكتب: 1- رأيي، 2- سببي الأول، 3- سببي الثاني، 4- دليل، 5- خاتمة.",
      "ألقِ الخطاب على أسرتك بحماس.",
      "اسألهم: 'هل أقنعتكم؟ لماذا أو لماذا لا؟'."
    ],
    "steps_en": [
      "Choose one topic you believe in.",
      "Write: 1- My opinion, 2- First reason, 3- Second reason, 4- Evidence, 5- Conclusion.",
      "Deliver the speech to your family with passion.",
      "Ask them: 'Did I convince you? Why or why not?'."
    ],
    "outcome_ar": "تعلم فن الإقناع المبني على المنطق والعاطفة.",
    "emoji": "🎯"
  },
  {
    "id": "conf_018",
    "title_ar": "الوقوف تحت الأضواء",
    "title_en": "Standing in the Spotlight",
    "description_ar": "قف حرفياً تحت ضوء قوي (مصباح موجه) في غرفة مظلمة. تحدث عن أي شيء 3 دقائق. تعلم أن تكون مرتاحاً وأنت محط أنظار الجميع.",
    "skill_focus": "تحمل التركيز",
    "activity_type": "محاكاة جسدية",
    "steps_ar": [
      "في غرفة مظلمة، وجه مصباحاً على نفسك.",
      "قف في دائرة الضوء وتحدث عن 'أكبر حلم لي'.",
      "اشعر بالضوء والاهتمام الوهمي وتقبله.",
      "لاحظ أنك بعد دقائق ستعتاد الشعور وتسترخي."
    ],
    "steps_en": [
      "In a dark room, point a lamp at yourself.",
      "Stand in the spotlight and talk about 'My biggest dream'.",
      "Feel the light and imaginary attention and accept it.",
      "Notice after minutes you'll get used to it and relax."
    ],
    "outcome_ar": "التكيف مع الشعور بأنك مركز الانتباه دون توتر.",
    "emoji": "💡"
  },
  {
    "id": "conf_019",
    "title_ar": "تحدي الصوت الواحد",
    "title_en": "The One-Voice Challenge",
    "description_ar": "سجل صوتك وأنت تقرأ فقرة. استمع للتسجيل. حدد شيئاً واحداً تريد تحسينه (السرعة، الوضوح، النبرة). أعد التسجيل وحاول تحسينه.",
    "skill_focus": "التقييم الذاتي والتحسين",
    "activity_type": "تسجيل صوتي",
    "steps_ar": [
      "اقرأ فقرة قصيرة وسجلها.",
      "استمع للتسجيل وكأنه صوت شخص آخر.",
      "اكتب ملاحظة واحدة: 'أحتاج إلى...' (الإبطاء مثلاً).",
      "أعد التسجيل وأنت تركز على تحسين هذه النقطة."
    ],
    "steps_en": [
      "Read a short paragraph and record it.",
      "Listen as if it's someone else's voice.",
      "Write one note: 'I need to...' (slow down, for example).",
      "Re-record focusing on improving that point."
    ],
    "outcome_ar": "تعلم النقد الذاتي البناء دون جلد الذات.",
    "emoji": "🎤"
  },
  {
    "id": "conf_020",
    "title_ar": "حفل تخرج المتحدثين",
    "title_en": "Speakers' Graduation Ceremony",
    "description_ar": "نظم 'حفلاً' في البيت. أنت 'خريج الإلقاء'. جهز خطاباً من 3 دقائق عن رحلتك في تعلم الثقة. ادعُ أسرتك واستلم 'شهادتك'.",
    "skill_focus": "تتويج الرحلة",
    "activity_type": "حدث عائلي",
    "steps_ar": [
      "جهز خطاباً بعنوان: 'كيف تغيرت علاقتي بالحديث أمام الناس'.",
      "زين زاوية في البيت كمنصة.",
      "ادعُ أسرتك رسمياً. ألقِ خطابك بكل ثقة.",
      "اطلب منهم تسليمك 'شهادة المتحدث الواثق' التي صممتها."
    ],
    "steps_en": [
      "Prepare a speech: 'How my relationship with public speaking changed'.",
      "Decorate a corner at home as a stage.",
      "Formally invite your family. Deliver your speech with full confidence.",
      "Ask them to present you with the 'Confident Speaker Certificate' you designed."
    ],
    "outcome_ar": "الاحتفاء بالتقدم وترسيخ الهوية الجديدة كمتحدث واثق.",
    "emoji": "🎓"
  }
];
