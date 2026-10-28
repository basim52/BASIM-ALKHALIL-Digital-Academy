// Lesson checks for the foundational AI curriculum (المنهج الذكي – المستوى التأسيسي).
// Each lesson that has no dedicated mini-game gets 3 short questions taken
// directly from the lesson text. Options are written so the correct answer is
// not always in the same position, and every question carries a short "why".
// Keys are the stable foundational lesson_number values (do not renumber).

export interface FoundationCheckQuestion {
  q: string;
  qEn: string;
  options: string[];
  optionsEn: string[];
  correct: number;
  why: string;
  whyEn: string;
}

export const FOUNDATION_LESSON_CHECKS: Record<number, FoundationCheckQuestion[]> = {
  5: [
    {
      q: 'كيف يفهم الذكاء الاصطناعي صوتك؟',
      qEn: 'How does AI understand your voice?',
      options: [
        'يسمع الكلام مثل الإنسان تماماً ويفهم مشاعره',
        'يحوّل موجة الصوت إلى أرقام ويقطعها إلى شرائح صغيرة ثم يقارنها بما تعلّمه',
        'يقرأ شفاه المتكلم من الكاميرا'
      ],
      optionsEn: [
        'It hears exactly like a human and feels the emotion',
        'It turns the sound wave into numbers, slices it into tiny pieces and compares them with what it learned',
        'It reads the speaker\'s lips through the camera'
      ],
      correct: 1,
      why: 'الصوت موجة، والآلة تحوّلها إلى أرقام وتقارن كل شريحة صغيرة بمكتبتها الصوتية لتعرف الحروف.',
      whyEn: 'Sound is a wave; the machine turns it into numbers and compares each tiny slice with its sound library.'
    },
    {
      q: 'ما هي "البصمة الصوتية"؟',
      qEn: 'What is a "voiceprint"?',
      options: [
        'شكل موجات صوت الشخص المميز له مثل بصمة الإصبع',
        'تطبيق لتسجيل الأغاني',
        'كلمة السر التي نكتبها في الهاتف'
      ],
      optionsEn: [
        'The unique shape of a person\'s sound waves, like a fingerprint',
        'An app for recording songs',
        'The password we type into the phone'
      ],
      correct: 0,
      why: 'لكل إنسان شكل موجات صوتية خاص به، ولهذا يستطيع الذكاء الاصطناعي تقليد صوت شخص إذا تعلّم بصمته.',
      whyEn: 'Each person\'s sound waves have their own shape, which is why AI can imitate a voice once it learns it.'
    },
    {
      q: 'وصلتك رسالة صوتية بصوت قريبك يطلب مالاً بسرعة. ما التصرف الصحيح؟',
      qEn: 'You get a voice message in a relative\'s voice urgently asking for money. What should you do?',
      options: [
        'نرسل المال فوراً لأن الصوت صوته',
        'نتجاهل كل الرسائل الصوتية للأبد',
        'نتحقق أولاً بالاتصال به مباشرة أو بسؤاله عن كلمة السر العائلية'
      ],
      optionsEn: [
        'Send the money right away because it is his voice',
        'Ignore all voice messages forever',
        'Check first by calling him directly or asking for the family code word'
      ],
      correct: 2,
      why: 'الصوت يمكن تقليده، لذلك نتحقق من الشخص بطريقة أخرى قبل أي خطوة.',
      whyEn: 'Voices can be cloned, so we verify the person another way before doing anything.'
    }
  ],
  6: [
    {
      q: 'الفيديو في حقيقته هو:',
      qEn: 'A video is really:',
      options: [
        'صورة واحدة كبيرة جداً',
        'سلسلة صور ثابتة (إطارات) تُعرض بسرعة فيراها الدماغ حركة',
        'صوت يتحول إلى ألوان'
      ],
      optionsEn: [
        'One very large picture',
        'A series of still images (frames) shown quickly so the brain sees motion',
        'Sound that turns into colours'
      ],
      correct: 1,
      why: 'عرض صور متتالية بسرعة (24 صورة في الثانية أو أكثر) يخدع الدماغ فيرى حركة مستمرة.',
      whyEn: 'Showing still images quickly (24 or more per second) tricks the brain into seeing motion.'
    },
    {
      q: 'فيديو مدته دقيقة واحدة بسرعة 24 إطاراً في الثانية، كم صورة فيه؟',
      qEn: 'A one-minute video at 24 frames per second has how many images?',
      options: ['240 صورة', '1440 صورة', '60 صورة'],
      optionsEn: ['240 images', '1,440 images', '60 images'],
      correct: 1,
      why: '24 × 60 ثانية = 1440 صورة.',
      whyEn: '24 × 60 seconds = 1,440 images.'
    },
    {
      q: 'لماذا نرى أحياناً حركات غريبة أو أيدياً مشوهة في فيديوهات الذكاء الاصطناعي؟',
      qEn: 'Why do AI videos sometimes show strange movements or distorted hands?',
      options: [
        'لأن الآلة تتوقع الإطار التالي وقد تخطئ في التوقع',
        'لأن الكاميرا كانت مكسورة أثناء التصوير',
        'لأن الإنترنت كان بطيئاً'
      ],
      optionsEn: [
        'Because the machine predicts the next frame and its prediction can be wrong',
        'Because the camera was broken while filming',
        'Because the internet was slow'
      ],
      correct: 0,
      why: 'فيديو الذكاء الاصطناعي لا يُصوَّر بكاميرا، بل يُولَّد إطاراً بعد إطار بالتوقع، والتوقع قد يخطئ.',
      whyEn: 'AI video is not filmed; it is generated frame by frame by prediction, and predictions can be wrong.'
    }
  ],
  9: [
    {
      q: 'ماذا يُقصد بـ "الهلوسة" في النماذج اللغوية؟',
      qEn: 'What does "hallucination" mean in language models?',
      options: [
        'أن يتعطل البرنامج ويتوقف عن العمل',
        'أن يرفض النموذج الإجابة دائماً',
        'أن يخترع النموذج إجابة تبدو صحيحة وواثقة لكنها غير حقيقية'
      ],
      optionsEn: [
        'The program crashes and stops working',
        'The model always refuses to answer',
        'The model invents an answer that sounds confident and correct but is not true'
      ],
      correct: 2,
      why: 'النموذج يخمّن الكلمة التالية الأكثر احتمالاً، وعندما تنقصه المعلومة قد يخترع إجابة مقنعة.',
      whyEn: 'The model guesses the most likely next word; when it lacks information it may invent a convincing answer.'
    },
    {
      q: 'لماذا تحدث الهلوسة؟',
      qEn: 'Why do hallucinations happen?',
      options: [
        'لأن النموذج يتوقع الكلمة التالية إحصائياً ولا "يعرف" الحقيقة',
        'لأن النموذج يريد أن يكذب علينا عمداً',
        'لأن الشاشة صغيرة'
      ],
      optionsEn: [
        'Because the model predicts the next word statistically and does not "know" the truth',
        'Because the model wants to lie to us on purpose',
        'Because the screen is small'
      ],
      correct: 0,
      why: 'الهلوسة ليست كذباً مقصوداً، بل نتيجة طريقة التوقع الإحصائي.',
      whyEn: 'Hallucination is not deliberate lying; it comes from statistical prediction.'
    },
    {
      q: 'أعطاك المساعد الذكي معلومة تاريخية مهمة لواجبك المدرسي. ماذا تفعل؟',
      qEn: 'An AI assistant gave you an important historical fact for homework. What do you do?',
      options: [
        'أنسخها مباشرة لأن أسلوبها واثق',
        'أتأكد منها من مصدر موثوق مثل كتاب أو موقع رسمي',
        'أسأل المساعد نفسه إن كان متأكداً وأكتفي بجوابه'
      ],
      optionsEn: [
        'Copy it straight away because it sounds confident',
        'Check it in a trusted source such as a book or an official website',
        'Ask the same assistant if it is sure and accept its answer'
      ],
      correct: 1,
      why: 'الأسلوب الواثق لا يعني الصواب. المصدر الموثوق هو الحَكَم.',
      whyEn: 'A confident tone does not mean correct. A trusted source is the judge.'
    }
  ],
  10: [
    {
      q: 'من أين يأتي "التحيز الخفي" في الذكاء الاصطناعي؟',
      qEn: 'Where does hidden bias in AI come from?',
      options: [
        'من حرارة المعالج',
        'من البيانات التي تعلّم منها، إذا كانت غير متوازنة أو فيها صور نمطية',
        'من لون شاشة الجهاز'
      ],
      optionsEn: [
        'From processor heat',
        'From the data it learned from, when that data is unbalanced or stereotyped',
        'From the colour of the screen'
      ],
      correct: 1,
      why: 'النموذج يعكس ما في بياناته. إذا كانت أغلب صور "الطبيب" لرجال، سيرسم رجلاً غالباً.',
      whyEn: 'The model mirrors its data. If most "doctor" photos show men, it will usually draw a man.'
    },
    {
      q: 'طلبت صورة "طبيب" فظهر رجل في كل مرة. ما التفسير الأقرب؟',
      qEn: 'You asked for a picture of "a doctor" and got a man every time. Best explanation?',
      options: [
        'أن النساء لا يعملن طبيبات',
        'أن البرنامج معطل',
        'أن أغلب الصور التي تدرب عليها النموذج كانت لأطباء رجال'
      ],
      optionsEn: [
        'Women do not work as doctors',
        'The program is broken',
        'Most images the model trained on showed male doctors'
      ],
      correct: 2,
      why: 'هذا انعكاس لعدم توازن البيانات، وليس حقيقة عن العالم.',
      whyEn: 'This reflects unbalanced data, not a fact about the world.'
    },
    {
      q: 'كيف نقلل التحيز في الصور التي نطلبها؟',
      qEn: 'How can we reduce bias in the images we request?',
      options: [
        'نكتب في الطلب تفاصيل واضحة عن التنوع الذي نريده، ونراجع النتائج بعين ناقدة',
        'نقبل أول صورة دائماً',
        'نطفئ الجهاز ونعيد تشغيله'
      ],
      optionsEn: [
        'Describe the diversity we want clearly in the prompt and review results critically',
        'Always accept the first image',
        'Turn the device off and on again'
      ],
      correct: 0,
      why: 'الوصف الواضح والمراجعة الناقدة يساعدان على نتائج أعدل.',
      whyEn: 'Clear descriptions and critical review lead to fairer results.'
    }
  ],
  11: [
    {
      q: 'ما هو "التزييف العميق" (Deepfake)؟',
      qEn: 'What is a deepfake?',
      options: [
        'فلتر يجمّل الصور فقط',
        'استخدام الذكاء الاصطناعي لتقليد وجه شخص أو صوته بشكل واقعي جداً',
        'فيروس يحذف الملفات'
      ],
      optionsEn: [
        'A filter that only beautifies photos',
        'Using AI to imitate a person\'s face or voice very realistically',
        'A virus that deletes files'
      ],
      correct: 1,
      why: 'التزييف العميق يصنع صوراً أو أصواتاً مفبركة يصعب تمييزها عن الحقيقة.',
      whyEn: 'Deepfakes create fake images or voices that are hard to tell from real ones.'
    },
    {
      q: 'ما أقوى حماية للعائلة من مكالمة مزيفة بصوت أحد أفرادها؟',
      qEn: 'What is the family\'s strongest protection against a fake call in a relative\'s voice?',
      options: [
        'كلمة سر عائلية نتفق عليها شفهياً ولا نكتبها أو ننشرها',
        'إغلاق الهاتف والإنترنت نهائياً',
        'رفع صوت المكالمة لسماعها بوضوح'
      ],
      optionsEn: [
        'A family code word agreed out loud and never written or posted',
        'Switching off the phone and internet for good',
        'Turning the call volume up to hear clearly'
      ],
      correct: 0,
      why: 'المحتال قد يقلد الصوت، لكنه لا يعرف الكلمة السرية التي لم تُكتب في أي مكان.',
      whyEn: 'A scammer can copy a voice but cannot know a code word that was never written anywhere.'
    },
    {
      q: 'أي تصرف يقلل خطر استنساخ أصواتنا ووجوهنا؟',
      qEn: 'Which habit lowers the risk of our voices and faces being cloned?',
      options: [
        'نشر مقاطع طويلة لوجوهنا وأصواتنا للعامة',
        'إرسال صورنا لأي حساب يطلبها',
        'مشاركة الصور والمقاطع مع من نعرفهم فقط وبحذر'
      ],
      optionsEn: [
        'Posting long public clips of our faces and voices',
        'Sending our photos to any account that asks',
        'Sharing photos and clips only with people we know, carefully'
      ],
      correct: 2,
      why: 'كلما قلّت المادة المتاحة للغرباء، صعب عليهم تقليدنا.',
      whyEn: 'The less material strangers can reach, the harder it is to imitate us.'
    }
  ],
  14: [
    {
      q: 'كيف تجعل المساعد الذكي "معلماً شخصياً" جيداً؟',
      qEn: 'How do you turn an AI assistant into a good personal tutor?',
      options: [
        'تكرر نفس السؤال مئة مرة دون تغيير',
        'تحدد له دوراً ومستواك وطريقة الشرح التي تناسبك',
        'تطلب منه حل الواجب كاملاً لتنسخه'
      ],
      optionsEn: [
        'Repeat the same question 100 times unchanged',
        'Give it a role, your level and the explanation style that suits you',
        'Ask it to do the whole homework so you can copy it'
      ],
      correct: 1,
      why: 'أنت القائد: تحدد الدور والمستوى والأسلوب، فيشرح لك بالطريقة المناسبة.',
      whyEn: 'You lead: set the role, level and style, and it explains the way that suits you.'
    },
    {
      q: 'أي طلب من هذه يساعدك على التعلّم فعلاً؟',
      qEn: 'Which request actually helps you learn?',
      options: [
        '"اكتب لي الإجابات فقط"',
        '"اشرح لي الكسور بمثال من كرة القدم ثم أعطني 3 تمارين وصحح إجاباتي"',
        '"قل لي أي شيء"'
      ],
      optionsEn: [
        '"Just write the answers for me"',
        '"Explain fractions with a football example, then give me 3 exercises and correct my answers"',
        '"Tell me anything"'
      ],
      correct: 1,
      why: 'الطلب الجيد فيه شرح بمثال قريب منك ثم تمرين وتصحيح.',
      whyEn: 'A good request includes an explanation with a relatable example, then practice and correction.'
    },
    {
      q: 'إذا لم تفهم شرح المساعد من أول مرة، ماذا تفعل؟',
      qEn: 'If you don\'t understand the explanation the first time, what do you do?',
      options: [
        'تطلب منه شرحاً بطريقة أخرى: بقصة أو رسم أو مثال أبسط',
        'تستسلم لأن الموضوع صعب',
        'تغلق التطبيق'
      ],
      optionsEn: [
        'Ask for another way: a story, a drawing or a simpler example',
        'Give up because the topic is hard',
        'Close the app'
      ],
      correct: 0,
      why: 'المساعد لا يمل من إعادة الشرح، ويمكنه تقديم طرق كثيرة حتى تجد طريقتك.',
      whyEn: 'The assistant never tires of re-explaining and can offer many ways until one clicks.'
    }
  ],
  15: [
    {
      q: 'ما معنى "التوليد المتسق" في مشروع المعرض العائلي؟',
      qEn: 'What does "consistent generation" mean in the family gallery project?',
      options: [
        'أن تكون كل صورة بأسلوب مختلف تماماً',
        'أن نولد صورة واحدة فقط',
        'أن تكون كل الصور بنفس الأسلوب والموضوع لتبدو كمعرض واحد'
      ],
      optionsEn: [
        'Every image in a completely different style',
        'Generating only one image',
        'All images share one style and theme so they look like one gallery'
      ],
      correct: 2,
      why: 'المعرض الجميل له موضوع واحد وأسلوب فني واحد يربط الصور.',
      whyEn: 'A good gallery has one theme and one art style tying the images together.'
    },
    {
      q: 'ما أفضل طريقة لتبقى الصور متناسقة؟',
      qEn: 'What is the best way to keep the images consistent?',
      options: [
        'نكرر نفس "وصفة الأسلوب" في كل طلب، مثل: "بالألوان المائية، إضاءة ذهبية دافئة"',
        'نغير الأسلوب في كل صورة',
        'نختار أي صورة من الإنترنت'
      ],
      optionsEn: [
        'Repeat the same "style recipe" in every prompt, e.g. "watercolour, warm golden light"',
        'Change the style for every image',
        'Pick any image from the internet'
      ],
      correct: 0,
      why: 'تكرار نفس كلمات الأسلوب في كل طلب يجعل النتائج متشابهة في الروح.',
      whyEn: 'Repeating the same style words in every prompt keeps the results visually consistent.'
    },
    {
      q: 'ما دور أفراد العائلة في المعرض؟',
      qEn: 'What is the family\'s role in the gallery?',
      options: [
        'لا دور لهم، الآلة تفعل كل شيء',
        'اختيار الفكرة والأسلوب وكتابة الوصف واختيار أفضل النتائج وتقديمها',
        'شراء الطابعة فقط'
      ],
      optionsEn: [
        'None, the machine does everything',
        'Choosing the idea and style, writing prompts, picking the best results and presenting them',
        'Only buying the printer'
      ],
      correct: 1,
      why: 'الذكاء الاصطناعي هو الفرشاة، والعائلة هي من يقرر الفكرة ويختار ويعرض.',
      whyEn: 'AI is the brush; the family decides the idea, chooses and presents.'
    }
  ],
  16: [
    {
      q: 'ما الهدف الأسمى من تعلّم الذكاء الاصطناعي في هذا الدرس؟',
      qEn: 'What is the main purpose of learning AI in this lesson?',
      options: [
        'استخدامه لحل مشكلات حقيقية ومساعدة الناس من حولنا',
        'التباهي أمام الأصدقاء',
        'نسخ واجبات الآخرين'
      ],
      optionsEn: [
        'Using it to solve real problems and help people around us',
        'Showing off to friends',
        'Copying other people\'s homework'
      ],
      correct: 0,
      why: 'التحدي هو أن نستخدم ما تعلمناه لمساعدة 5 أشخاص على الأقل.',
      whyEn: 'The challenge is to use what we learned to help at least 5 people.'
    },
    {
      q: 'ما أول خطوة في تصميم حل مفيد لمجتمعنا؟',
      qEn: 'What is the first step in designing a useful solution for our community?',
      options: [
        'اختيار أغلى تطبيق',
        'تحديد الفئة التي نريد مساعدتها وما تحتاجه فعلاً',
        'نشر الفكرة قبل التفكير فيها'
      ],
      optionsEn: [
        'Choosing the most expensive app',
        'Identifying who we want to help and what they really need',
        'Posting the idea before thinking it through'
      ],
      correct: 1,
      why: 'الحل الجيد يبدأ من فهم الاحتياج الحقيقي للناس.',
      whyEn: 'A good solution starts by understanding people\'s real need.'
    },
    {
      q: 'أي فكرة من هذه مثال جيد على "الذكاء الاصطناعي لخدمة الناس"؟',
      qEn: 'Which idea is a good example of "AI for good"?',
      options: [
        'صنع صور مزيفة لأشخاص حقيقيين للضحك عليهم',
        'كتابة رسائل مزعجة كثيرة',
        'كتابة قصة مسلية مصورة لطفل مريض في المستشفى'
      ],
      optionsEn: [
        'Making fake images of real people to laugh at them',
        'Writing lots of spam messages',
        'Writing an illustrated fun story for a sick child in hospital'
      ],
      correct: 2,
      why: 'استخدام الأداة لإسعاد الآخرين ومساعدتهم هو جوهر الدرس.',
      whyEn: 'Using the tool to help and cheer others is the heart of the lesson.'
    }
  ],
  17: [
    {
      q: 'ما فكرة "أسطورة العائلة الرقمية"؟',
      qEn: 'What is the "family digital legend"?',
      options: [
        'أن نحذف كل ذكريات البرنامج',
        'أن نجمع أطرف لحظاتنا في البرنامج ونصوغها مع المساعد قصة نحتفظ بها',
        'أن يكتب المساعد قصة عن عائلة لا نعرفها'
      ],
      optionsEn: [
        'Deleting all our memories of the programme',
        'Collecting our best programme moments and turning them into a keepsake story with the assistant',
        'Having the assistant write about a family we don\'t know'
      ],
      correct: 1,
      why: 'نحن نقدم الذكريات الحقيقية، والمساعد يساعدنا في صياغتها كقصة.',
      whyEn: 'We bring the real memories; the assistant helps shape them into a story.'
    },
    {
      q: 'من يضع "المادة الخام" للقصة؟',
      qEn: 'Who provides the "raw material" for the story?',
      options: [
        'أفراد العائلة بذكرياتهم ومواقفهم',
        'المساعد الذكي وحده',
        'أي موقع على الإنترنت'
      ],
      optionsEn: [
        'The family, with their memories and moments',
        'The AI assistant alone',
        'Any website'
      ],
      correct: 0,
      why: 'القصة تكون عائلية حقاً عندما تأتي تفاصيلها منا.',
      whyEn: 'The story is truly ours when the details come from us.'
    },
    {
      q: 'قبل أن نشارك القصة خارج البيت، ماذا نراجع؟',
      qEn: 'Before sharing the story outside the home, what do we check?',
      options: [
        'عدد الكلمات فقط',
        'لا شيء، ننشرها كما هي',
        'ألا تحتوي معلومات خاصة مثل العنوان أو المدرسة أو الأسماء الكاملة'
      ],
      optionsEn: [
        'Only the word count',
        'Nothing, we post it as is',
        'That it has no private details like address, school or full names'
      ],
      correct: 2,
      why: 'نحمي خصوصيتنا دائماً، حتى في القصص الجميلة.',
      whyEn: 'We always protect our privacy, even in happy stories.'
    }
  ],
  18: [
    {
      q: 'ما مسؤولية "سفير الذكاء الاصطناعي"؟',
      qEn: 'What is an "AI Ambassador\'s" responsibility?',
      options: [
        'نشر الاستخدام الواعي والآمن والأخلاقي للذكاء الاصطناعي',
        'الفوز في الألعاب الإلكترونية فقط',
        'استخدام الأدوات دون التفكير في الآخرين'
      ],
      optionsEn: [
        'Spreading aware, safe and ethical AI use',
        'Only winning video games',
        'Using tools without thinking about others'
      ],
      correct: 0,
      why: 'السفير قدوة: يستخدم الأداة بوعي ويساعد غيره على ذلك.',
      whyEn: 'An ambassador is a role model who uses AI wisely and helps others do so.'
    },
    {
      q: 'ما فكرة "الكبسولة الزمنية" في حفل التخرج؟',
      qEn: 'What is the graduation "time capsule"?',
      options: [
        'صندوق نضع فيه الأجهزة القديمة',
        'رسالة يكتبها كل فرد عن مستقبله ونفتحها بعد 3 سنوات',
        'تطبيق يحذف الرسائل تلقائياً'
      ],
      optionsEn: [
        'A box for old devices',
        'A letter each person writes about their future, opened after 3 years',
        'An app that auto-deletes messages'
      ],
      correct: 1,
      why: 'نكتب أهدافنا ونحفظها لنرى بعد سنوات كيف تقدمنا.',
      whyEn: 'We write our goals and keep them to see how far we\'ve come.'
    },
    {
      q: 'صديقك يريد استخدام الذكاء الاصطناعي لصنع صورة محرجة لزميل. ماذا يفعل السفير؟',
      qEn: 'A friend wants to use AI to make an embarrassing image of a classmate. What does an ambassador do?',
      options: [
        'يساعده لأنها مجرد مزحة',
        'يتجاهل الأمر',
        'ينصحه بلطف بأن هذا يؤذي الآخرين، ويقترح استخداماً مفيداً بدلاً منه'
      ],
      optionsEn: [
        'Helps because it\'s just a joke',
        'Ignores it',
        'Kindly explains it hurts others and suggests a better use instead'
      ],
      correct: 2,
      why: 'الأخلاق جزء من الذكاء الرقمي؛ لا نستخدم الأداة لإيذاء أحد.',
      whyEn: 'Ethics are part of digital smarts; we never use the tool to hurt anyone.'
    }
  ],
  19: [
    {
      q: 'كيف نتابع تطور الذكاء الاصطناعي السريع بلا تشتت؟',
      qEn: 'How do we keep up with fast AI progress without getting overwhelmed?',
      options: [
        'نجرب كل تطبيق جديد كل يوم',
        'نخصص وقتاً قصيراً منتظماً (مثل ساعة كل شهر) لتجربة أداة واحدة ومناقشتها',
        'نتوقف عن التعلم تماماً'
      ],
      optionsEn: [
        'Try every new app every day',
        'Set a short regular time (like one hour a month) to try one tool and discuss it',
        'Stop learning completely'
      ],
      correct: 1,
      why: 'القاعدة: القليل المنتظم خير من الكثير المتقطع.',
      whyEn: 'The rule: a little, regularly, beats a lot, irregularly.'
    },
    {
      q: 'عند تجربة "أداة الشهر"، ماذا نناقش بعدها؟',
      qEn: 'After trying the "tool of the month", what do we discuss?',
      options: [
        'فائدتها ومخاطرها وهل نحتاجها فعلاً',
        'لونها فقط',
        'كم صديقاً يستخدمها'
      ],
      optionsEn: [
        'Its benefits, its risks and whether we really need it',
        'Only its colour',
        'How many friends use it'
      ],
      correct: 0,
      why: 'التجربة الواعية تشمل التفكير في الفائدة والمخاطر معاً.',
      whyEn: 'Mindful trying means weighing benefits and risks together.'
    },
    {
      q: 'من يختار أداة الشهر؟',
      qEn: 'Who picks the tool of the month?',
      options: [
        'الأب دائماً',
        'لا أحد، نختارها عشوائياً',
        'أفراد العائلة بالتناوب'
      ],
      optionsEn: [
        'Always the father',
        'Nobody, we pick at random',
        'Family members take turns'
      ],
      correct: 2,
      why: 'التناوب يعطي كل فرد فرصة ويجعل التعلم ممتعاً ومشتركاً.',
      whyEn: 'Taking turns gives everyone a chance and keeps learning shared and fun.'
    }
  ],
  20: [
    {
      q: 'ما الرسالة الأخيرة لرحلتنا في المنهج؟',
      qEn: 'What is the final message of our journey?',
      options: [
        'أن نجمع أكبر عدد من التطبيقات',
        'أن المعرفة أمانة نستخدمها بحكمة لنبني ونفيد غيرنا',
        'أن الآلة أهم من الإنسان'
      ],
      optionsEn: [
        'Collect as many apps as possible',
        'Knowledge is a trust we use wisely to build and help others',
        'The machine matters more than people'
      ],
      correct: 1,
      why: 'القوة الحقيقية في الضمير الإنساني الذي يقود الأداة.',
      whyEn: 'The real power is the human conscience that guides the tool.'
    },
    {
      q: 'أي مبدأ من هذه يصلح لميثاق العائلة؟',
      qEn: 'Which principle fits the family charter?',
      options: [
        'لا نشارك أسرار العائلة ومعلوماتنا الخاصة مع روبوتات المحادثة',
        'نصدق كل صورة نراها',
        'ننشر كل شيء نصنعه بلا مراجعة'
      ],
      optionsEn: [
        'We don\'t share family secrets or private info with chatbots',
        'We believe every image we see',
        'We publish everything we make without checking'
      ],
      correct: 0,
      why: 'حماية الخصوصية من أهم قواعد الاستخدام الآمن.',
      whyEn: 'Protecting privacy is one of the most important safe-use rules.'
    },
    {
      q: 'صورة مثيرة لا نعرف مصدرها انتشرت في مجموعة العائلة. ما الصواب؟',
      qEn: 'A shocking image of unknown origin is spreading in the family group. What\'s right?',
      options: [
        'نعيد إرسالها فوراً',
        'نصدقها لأنها تبدو حقيقية',
        'لا نصدقها ولا ننشرها حتى نتحقق من مصدرها'
      ],
      optionsEn: [
        'Forward it immediately',
        'Believe it because it looks real',
        'Don\'t believe or share it until we verify the source'
      ],
      correct: 2,
      why: 'الصور قد تكون مولدة بالذكاء الاصطناعي؛ التحقق قبل النشر.',
      whyEn: 'Images may be AI-generated; verify before sharing.'
    }
  ]
};
