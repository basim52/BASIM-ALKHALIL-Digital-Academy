import { SaraCurriculumLesson } from './types';

export const SARA_ACTIVE_CONVERSATION_LESSONS: SaraCurriculumLesson[] = [
  // ==========================================
  // STARTER LEVEL (A1-A2) - Lessons 1 to 10
  // ==========================================
  {
    id: 'sc_201',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'تحدي كسر الجمود وبدء الحوار العفوي (Small Talk Mastery)',
    titleEn: 'Mastering Everyday Small Talk & Icebreakers',
    descAr: 'كيف تفتح محادثة ودية مع أي شخص في المصعد، المطار، أو المقهى بثقة تامة ودون خوف من الصمت المحرج.',
    descEn: 'Break awkward silences naturally with warm questions and friendly follow-ups.',
    speakingGoalAr: 'بدء محادثة وتبادل 3 جمل عفوية مع سارة في موقف يومي.',
    speakingGoalEn: 'Initiate and sustain a 3-turn friendly exchange without hesitations.',
    keyPattern: {
      ruleAr: 'قاعدة الـ 3 خطوات للمحادثة الخفيفة: 1) ملاحظة الموقف الحالي 2) سؤال مفتوح خفيف 3) تعليق مشجع.',
      ruleEn: 'The 3-Step Icebreaker: 1) Observe context 2) Ask open question 3) Add warm comment.',
      formula: '[Friendly Greeting] + [Context Observation] + [How about you?]'
    },
    practicalExamples: [
      {
        en: "Crazy weather today, isn't it? Have you been waiting long?",
        ar: 'الجو غريب اليوم، أليس كذلك؟ هل أنت في الانتظار منذ وقت طويل؟',
        spokenNoteAr: 'السؤال التذييلي isn\'t it يعطي إشارة للطرف الآخر للبدء بالكلام.'
      },
      {
        en: "I love the vibe of this place! What would you recommend?",
        ar: 'يعجبني جو هذا المكان! ما الذي تنصحني بتجربته؟',
        spokenNoteAr: 'السؤال عن النصيحة يفتح قلوب الناس للحديث فوراً.'
      },
      {
        en: "How's your week shaping up so far?",
        ar: 'كيف تسير أمور أسبوعك حتى الآن؟',
        spokenNoteAr: 'بديل راقٍ وعصري لسؤال How are you التقليدي.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Just answering 'Yes' or 'No' and staying silent.",
        correct: "Answer + give 1 detail + ask: 'How about you?'",
        whyAr: 'الرد بكلمة واحدة يوقف المحادثة؛ دائماً أضف تفصيلاً وسؤالاً مقلوباً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'تخيل أنك تقابل سارة في مقهى هادئ. افتح معها محادثة خفيفة وسارة سترد عليك فوراً!',
      promptEn: 'You are at a cafe with Sara. Start a friendly small talk exchange right now!',
      saraQuestionAr: 'Hi there! Looks like this place is packed today, huh?',
      saraQuestionEn: 'Hi there! Looks like this place is packed today, huh?',
      recommendedResponseEn: "Yeah, totally! It's super busy, but the coffee smells incredible here!"
    },
    quiz: [
      {
        questionAr: 'عندما يسألك شخص "How was your weekend?" ما الرد الأفضل لبقاء المحادثة حية؟',
        questionEn: 'When someone asks "How was your weekend?", which reply keeps the conversation flowing?',
        options: [
          "Good.",
          "It was really relaxing, I went hiking! How about yours?",
          "No comment.",
          "I don't know."
        ],
        correctIndex: 1,
        explanationAr: 'دائماً أجب بالتفصيل ثم اقلب السؤال (How about yours?) لإبقاء الحوار حياً.'
      }
    ],
    whiteboardNotes: {
      title: 'Small Talk Golden Rule',
      pointsAr: [
        'قاعدة الذهب: الإجابة + معلومة إضافية + سؤال مقلوب',
        'تجنب الأجوبة بكلمة واحدة (Yes / No)',
        'استخدم: How about you? / How about yours?'
      ],
      pointsEn: [
        'Golden Rule: Answer + 1 Extra Detail + Ping-Pong Question',
        'Never reply with one word',
        'Always pass the ball back: "What about you?"'
      ],
      chalkHighlight: 'Answer ➡️ 1 Detail ➡️ "How about you?"'
    }
  },
  {
    id: 'sc_204',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'طلب القهوة وتخصيص المشروبات بثقة (Modern Coffee Shop Orders)',
    titleEn: 'Ordering at a Specialty Coffee Shop Like a Local',
    descAr: 'كيف تطلب قهوتك المفضلة، ونوع الحليب، وحجم الكوب، وتدفع الحساب دون ارتباك أمام الباريستا.',
    descEn: 'Order espresso drinks, customize syrups and milk, and pay with breezy confidence.',
    speakingGoalAr: 'طلب مشروب قهوة مخصص من سارة في دور الباريستا مع تفاصيل الحجم والحليب.',
    speakingGoalEn: 'Order a customized coffee with size, milk preference, and for-here/to-go options.',
    keyPattern: {
      ruleAr: 'قالب طلب القهوة السريع: Can I get a + [الحجم] + [اسم المشروب] + with [نوع الحليب/التعديل] + to go, please?',
      ruleEn: 'The Barista Formula: "Can I get a [Size] [Drink] with [Modifier], [For here / To go], please?"',
      formula: 'Can I get a [Size] [Drink] with [Milk/Syrup], [to go / for here], please?'
    },
    practicalExamples: [
      {
        en: "Can I get a medium iced oat latte with an extra shot to go, please?",
        ar: 'ممكن أحصل على آيس لاتيه وسط بحليب الشوفان وشوت إضافي سفري، لو سمحت؟',
        spokenNoteAr: 'Can I get هي العبارة الأكثر شيوعاً وعفوية في المقاهي بدلاً من I want.'
      },
      {
        en: "Do you have any dairy-free options available?",
        ar: 'هل يتوفر لديكم أي خيارات خالية من الألبان ومشتقات الحليب؟',
        spokenNoteAr: 'dairy-free تعني خالٍ من الحليب الحيواني (كالشوفان أو اللوز).'
      },
      {
        en: "I'll take that for here, thank you!",
        ar: 'سآخذه للشرب هنا في المقهى، شكراً لك!',
        spokenNoteAr: 'for here تعني محلي داخل المقهى، وعكسها to go.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Give me coffee quickly.",
        correct: "Could I please get a black Americano to go?",
        whyAr: 'في ثقافة المقاهي الغربية يعتبر "Give me" أمراً فظاً؛ استخدم "Can I get" أو "Could I have".'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي الباريستا! اطلب منها قهوتك الصباحية المفضلة مع تحديد الحجم ونوع الحليب!',
      promptEn: 'Sara is the barista! Order your morning coffee with your custom preferences!',
      saraQuestionAr: 'Hi there! Welcome to The Roast Lab. What can I get started for you today?',
      saraQuestionEn: 'Hi there! Welcome to The Roast Lab. What can I get started for you today?',
      recommendedResponseEn: "Hi! Can I please get a large vanilla latte with almond milk to go?"
    },
    quiz: [
      {
        questionAr: 'عندما يسألك الباريستا: "For here or to go?" ماذا تعني كلمة "To go"؟',
        questionEn: 'What does "To go" mean when asked by a barista?',
        options: [
          "Drink it inside the cafe",
          "Take it away / Takeout",
          "Cancel the order",
          "Pay by credit card"
        ],
        correctIndex: 1,
        explanationAr: 'كلمة "To go" تعني سفري / للخارج، بينما "For here" تعني للشرب داخل المقهى.'
      }
    ],
    whiteboardNotes: {
      title: 'Coffee Ordering Cheat Sheet',
      pointsAr: [
        '1. العبارة السحرية: Can I get a...',
        '2. الحجم: Small / Medium / Large',
        '3. الحليب: Oat milk (شوفان), Almond (لوز), Skim (قليل الدسم)',
        '4. المكان: For here (محلي) / To go (سفري)'
      ],
      pointsEn: [
        '1. Golden opener: "Can I get a..."',
        '2. Size order: Small / Medium / Large',
        '3. Milk options: Whole, Oat, Almond, Coconut',
        '4. Destination: "For here" vs "To go"'
      ],
      chalkHighlight: 'Can I get a [Size] [Drink] with [Milk] to go, please?'
    }
  },
  {
    id: 'sc_205',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'محادثات المطار والجوازات دون توتر (Airport & Border Control)',
    titleEn: 'Breezing Through Airport Check-in & Customs',
    descAr: 'كيف تجيب على ضابط الجوازات وموظف تسجيل الصعود بثقة وسرعة ودون خوف من التحقيق.',
    descEn: 'Answer border control questions crisply and navigate check-in with total calm.',
    speakingGoalAr: 'الإجابة على أسئلة ضابط الجوازات (سارة) حول سبب الزيارة ومدة الإقامة بدقة.',
    speakingGoalEn: 'Answer passport control questions regarding trip purpose, duration, and accommodation.',
    keyPattern: {
      ruleAr: 'في الجوازات، الإجابة تكون قصيرة ومباشرة وصادقة: الغرض (Business/Vacation) + المدة + مكان الإقامة.',
      ruleEn: 'Keep answers concise: state purpose directly, declare length of stay, name your hotel.',
      formula: "I'm here for [Vacation/Work] for [Number] days. I'm staying at [Hotel name]."
    },
    practicalExamples: [
      {
        en: "What is the purpose of your visit? ➡️ I'm here for tourism and sightseeing.",
        ar: 'ما هو الغرض من زيارتك؟ ⬅️ أنا هنا للسياحة وزيارة المعالم.',
        spokenNoteAr: 'إجابة واضحة ومباشرة دون كلام زائد يثير الشكوك.'
      },
      {
        en: "How long are you planning to stay? ➡️ Just ten days, here is my return ticket.",
        ar: 'كم تنوي أن تقيم؟ ⬅️ عشرة أيام فقط، وتذكرة عودتي جاهزة هنا.',
        spokenNoteAr: 'تقديم تذكرة العودة يبني ثقة فورية مع الضابط.'
      },
      {
        en: "Would you prefer a window seat or an aisle seat?",
        ar: 'هل تفضل مقعداً بجوار النافذة أم مقعداً بجانب الممر؟',
        spokenNoteAr: 'سؤال موظف التذاكر: window (نافذة) و aisle (ممر - حرف s صامت).'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I don't know where I sleep, maybe with friend.",
        correct: "I have a reservation at the Hilton Hotel downtown.",
        whyAr: 'الردود المبهمة تدفع ضابط الجوازات للاشتباه بك؛ جهز اسم فندقك وعنوانك مسبقاً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي ضابطة الجوازات في مطار هيثرو بلندن! أجب على أسئلتها بثقة تامة!',
      promptEn: 'Sara is the border control officer at London Heathrow! Answer her inquiries clearly!',
      saraQuestionAr: 'Good afternoon. What brings you to the UK and how long is your stay?',
      saraQuestionEn: 'Good afternoon. What brings you to the UK and how long is your stay?',
      recommendedResponseEn: "Good afternoon! I'm here for a one-week holiday, and I'm staying at the Central Park Hotel."
    },
    quiz: [
      {
        questionAr: 'كيف يُنطق مقعد الممر "Aisle seat" بالإنجليزية؟',
        questionEn: 'How is the word "Aisle" in "Aisle seat" correctly pronounced?',
        options: [
          "Eyes-uhl (حرف s صامت تماماً)",
          "Ay-zel",
          "Ice-uhl",
          "As-lee"
        ],
        correctIndex: 0,
        explanationAr: 'كلمة Aisle يُنطق فيها الحرف s صامتاً تماماً وتلفظ مثل كلمة "eye" متبوعة بـ "uhl".'
      }
    ],
    whiteboardNotes: {
      title: 'Airport Customs Survival Kit',
      pointsAr: [
        '1. الغرض: Tourism (سياحة) / Business (عمل) / Visiting family',
        '2. المدة: For [X] days / weeks',
        '3. الإقامة: I\'m staying at [اسم الفندق]',
        '4. مقعد الطائرة: Window seat (نافذة) / Aisle seat (ممر)'
      ],
      pointsEn: [
        '1. Purpose: Tourism / Business / Transit',
        '2. Duration: "Just X days"',
        '3. Lodging: "I am booked at [Hotel]"',
        '4. Seating: Window seat vs Aisle seat [eye-uhl]'
      ],
      chalkHighlight: 'Purpose ➡️ Duration ➡️ Hotel reservation'
    }
  },
  {
    id: 'sc_206',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'سؤال المارة عن الاتجاهات والمواقع (Asking for Directions)',
    titleEn: 'Street Navigation: Asking for Directions Without Anxiety',
    descAr: 'كيف تستوقف شخصاً في الشارع بلباقة، وتسأل عن وجهتك، وتفهم تعليمات اليمين واليسار والمسافة.',
    descEn: 'Stop strangers politely, ask for navigation help, and decipher turning instructions.',
    speakingGoalAr: 'استيقاف شخص وسؤاله عن أقرب صراف آلي أو محطة حافلات بأسلوب مهذب.',
    speakingGoalEn: 'Inquire about landmarks and walking distance using clear conversational markers.',
    keyPattern: {
      ruleAr: 'معادلة السؤال عن الاتجاهات: تحية استئذان (Excuse me) + استفسار مباشر (How do I get to / Is it far?) + شكر.',
      ruleEn: 'The Street Formula: "Excuse me, could you point me toward [Location]?"',
      formula: 'Excuse me, how do I get to [Place]? | Is it within walking distance?'
    },
    practicalExamples: [
      {
        en: "Excuse me, could you point me in the direction of the British Museum?",
        ar: 'عفواً، هل يمكن أن تدلني على اتجاه المتحف البريطاني؟',
        spokenNoteAr: 'point me in the direction أسلوب لطيف جداً لسؤال المارة.'
      },
      {
        en: "Go straight for two blocks, then take a sharp right at the pharmacy.",
        ar: 'امشِ للأمام لمسافة مبنيين، ثم انعطف يميناً مباشرة عند الصيدلية.',
        spokenNoteAr: 'two blocks تعني مسافة تقاطعين أو شارعين.'
      },
      {
        en: "Is it within walking distance or should I take a cab?",
        ar: 'هل يمكن الوصول إليها مشياً على الأقدام أم يجدر بي أخذ سيارة أجرة؟',
        spokenNoteAr: 'within walking distance تعبير عملي يعني قريب يمكن المشي إليه.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Where museum? (walking up and shouting abruptly)",
        correct: "Excuse me, sorry to bother you, do you know where the museum is?",
        whyAr: 'البدء بـ Excuse me يزيل أي إحساس بالإزعاج ويجعل الناس يتوقفون لمساعدتك فوراً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'تخيل أنك تائه في وسط المدينة. استوقف سارة واسألها عن أقرب صيدلية مفتوحة!',
      promptEn: 'You are looking for a pharmacy. Ask Sara for directions politely!',
      saraQuestionAr: 'Hi there! You look like you are searching for something. Can I help?',
      saraQuestionEn: 'Hi there! You look like you are searching for something. Can I help?',
      recommendedResponseEn: "Excuse me! Could you tell me if there's a pharmacy nearby within walking distance?"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني عبارة "It is just around the corner"؟',
        questionEn: 'What does "It is just around the corner" mean in street navigation?',
        options: [
          "It is extremely far away.",
          "It is very close, right past the next turn.",
          "It is closed permanently.",
          "You must take an airplane."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "around the corner" تعني قريباً جداً، خلف المنعطف التالي مباشرة.'
      }
    ],
    whiteboardNotes: {
      title: 'Direction Navigation Key Phrases',
      pointsAr: [
        '1. الاستئذان: Excuse me, sorry to bother you...',
        '2. السؤال: How do I get to [المكان]؟',
        '3. المسافة: Is it within walking distance? (هل يصلح للمشي؟)',
        '4. التعليمات: Go straight (واصل للأمام) / Turn left (انعطف يساراً)'
      ],
      pointsEn: [
        '1. Approach: "Excuse me, do you have a quick second?"',
        '2. Query: "How do I get to...?"',
        '3. Distance: "Is it within walking distance?"',
        '4. Signals: Go straight / Take a right / Just around the corner'
      ],
      chalkHighlight: 'Excuse me ➡️ How do I get to [Place]? ➡️ Is it walkable?'
    }
  },
  {
    id: 'sc_207',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'تسجيل الوصول في الفندق وطلب الخدمات (Hotel Check-in & Requests)',
    titleEn: 'Hotel Check-in & Requesting Upgrades Gracefully',
    descAr: 'كيف تسجل وصولك في الفندق، وتطلب غرفة بإطلالة هادئة أو مناشف إضافية، وتستفسر عن الإفطار.',
    descEn: 'Check into your hotel room, ask for quiet rooms, and clarify breakfast timings.',
    speakingGoalAr: 'إتمام إجراءات الدخول للفندق مع سارة (موظفة الاستقبال) وطلب غرفة في طابق علوي.',
    speakingGoalEn: 'Check into a hotel reservation and request a quiet room on a high floor.',
    keyPattern: {
      ruleAr: 'في الفندق: اذكر اسم الحجز أولاً (I have a reservation under [Name]) ثم اطرح طلباتك بلطف (Could we have a quiet room?).',
      ruleEn: 'State booking name first ➡️ present ID ➡️ make polite room preference asks.',
      formula: 'I have a reservation under the name [Name]. Could we possibly get a room on a higher floor?'
    },
    practicalExamples: [
      {
        en: "Hi, I have a reservation for three nights under the name Mansoor.",
        ar: 'مرحباً، لدي حجز لثلاث ليالٍ باسم منصور.',
        spokenNoteAr: 'under the name تعني مسجل باسم كذا.'
      },
      {
        en: "Could we possibly get a quiet room facing away from the street?",
        ar: 'هل يمكننا الحصول على غرفة هادئة بعيدة عن ضوضاء الشارع؟',
        spokenNoteAr: 'facing away from the street تعبير ذكي لتجنب إزعاج السيارات.'
      },
      {
        en: "What time is breakfast served in the morning, and what is the Wi-Fi password?",
        ar: 'في أي وقت يُقدم الإفطار صباحاً، وما هي كلمة مرور الواي فاي؟',
        spokenNoteAr: 'استفسار أساسي يطرحه كل مسافر فور تسجيل الدخول.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Give me good room now.",
        correct: "If possible, could we get a room with a nice view?",
        whyAr: 'إضافة "If possible" تفتح الباب للموظف لترقيتك مجاناً تقديراً للباقتك.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي موظفة الاستقبال في فندقك بنيويورك! سجل وصولك واطلب تسجيل مغادرة متأخر (Late checkout)!',
      promptEn: 'Sara is the front desk manager! Check in and ask if a late checkout is possible!',
      saraQuestionAr: 'Welcome to The Grand Plaza! Are you checking in today?',
      saraQuestionEn: 'Welcome to The Grand Plaza! Are you checking in today?',
      recommendedResponseEn: "Yes, I am! I have a booking under my name. By the way, is it possible to arrange a late checkout for Sunday?"
    },
    quiz: [
      {
        questionAr: 'ما التعبير المناسب لطلب البقاء في الغرفة لساعات إضافية يوم المغادرة؟',
        questionEn: 'Which term refers to staying in the hotel room past standard departure time?',
        options: [
          "Late checkout",
          "Early sleep",
          "Slow leave",
          "Delayed elevator"
        ],
        correctIndex: 0,
        explanationAr: 'المصطلح الفندقي العالمي لتأخير وقت الخروج هو "Late checkout".'
      }
    ],
    whiteboardNotes: {
      title: 'Hotel Check-in Dialogue Flow',
      pointsAr: [
        '1. الحجز: I have a reservation under the name [الاسم]',
        '2. التفضيل: Could we get a high-floor room? (غرفة في دور مرتفع)',
        '3. الإفطار: Is breakfast included? (هل الإفطار مشمول؟)',
        '4. المغادرة المتأخرة: Would late checkout be available?'
      ],
      pointsEn: [
        '1. Arrival: "Reservation under [Name]"',
        '2. Upgrades: "Could we get a quiet room?"',
        '3. Dining: "Is breakfast included?"',
        '4. Departure: "Can I request a late checkout?"'
      ],
      chalkHighlight: 'Reservation under [Name] ➡️ High floor ➡️ Late checkout'
    }
  },
  {
    id: 'sc_208',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'التسوق وقياس الملابس وتجربتها (Shopping & Fitting Rooms)',
    titleEn: 'Shopping Smoothly: Sizes, Fitting Rooms & Returns',
    descAr: 'كيف تطلب مقاساً أكبر أو أصغر، وتسأل عن غرفة القياس، وتستفسر عن سياسة الاستبدال والخصومات.',
    descEn: 'Try on clothes, ask for alternate sizes, and understand store return policies.',
    speakingGoalAr: 'طلب تجربة قميص بمقاس مختلف وسؤال سارة عن موقع غرفة القياس.',
    speakingGoalEn: 'Ask for a different size, locate the fitting room, and inquire about discounts.',
    keyPattern: {
      ruleAr: 'في التسوق: Do you have this in a [Size / Color]? + Where are the fitting rooms?',
      ruleEn: 'The Retail Formula: "Do you have this in a [Size]? Where can I try this on?"',
      formula: 'Do you have this in a size [Medium/Large]? Where are the fitting rooms?'
    },
    practicalExamples: [
      {
        en: "Do you happen to have this jacket in a size medium?",
        ar: 'هل يتوفر لديكم هذا الجاكيت بمقاس وسط بالصدفة؟',
        spokenNoteAr: 'Do you happen to have أسلوب مهذب جداً يعني هل يتصادف وجود...'
      },
      {
        en: "Where are the fitting rooms located? I'd love to try this on.",
        ar: 'أين تقع غرف قياس الملابس؟ أود تجربة هذا.',
        spokenNoteAr: 'try on تعني يقيس الملابس للتأكد من المقاس.'
      },
      {
        en: "Is this item on sale, or does the discount only apply to the rack over there?",
        ar: 'هل هذه القطعة مشمولة بالتخفيض، أم أن الخصم يقتصر على ذلك الستاند فقط؟',
        spokenNoteAr: 'on sale تعني معروض بسعر مخفض.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Can I try this cloth in the toilet?",
        correct: "Where can I try this on? Where are the fitting rooms?",
        whyAr: 'غرفة قياس الملابس في المتاجر تسمى Fitting room أو Dressing room.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تعمل في متجر ملابس. اسألها إن كان الحذاء متوفراً بمقاسك وأين تدفع الحساب!',
      promptEn: 'Sara works at a store. Inquire about shoes in your size and where checkout is!',
      saraQuestionAr: 'Hi! Let me know if you need help finding any sizes or colors today!',
      saraQuestionEn: 'Hi! Let me know if you need help finding any sizes or colors today!',
      recommendedResponseEn: "Hi! Do you have these sneakers in size 42? And where can I try them on?"
    },
    quiz: [
      {
        questionAr: 'ما المكان المخصص لتجربة وقياس الملابس داخل المتاجر؟',
        questionEn: 'What is the designated room to try on clothes called?',
        options: [
          "Fitting room",
          "Restroom",
          "Kitchen",
          "Waiting hall"
        ],
        correctIndex: 0,
        explanationAr: 'غرفة قياس وتجربة الملابس في المتاجر تسمى "Fitting room".'
      }
    ],
    whiteboardNotes: {
      title: 'Retail Shopping Vocabulary',
      pointsAr: [
        '1. السؤال عن مقاس: Do you have this in a [Small / Medium / Large]?',
        '2. تجربة اللباس: I\'d like to try this on (أود قياسه)',
        '3. غرفة القياس: Fitting room',
        '4. التخفيض: On sale (عليه خصم)'
      ],
      pointsEn: [
        '1. Size inquiry: "Do you have this in a Medium?"',
        '2. Phrasal verb: "Try on" = put on to test size',
        '3. Location: "Fitting room" / "Dressing room"',
        '4. Price: "On sale" (discounted)'
      ],
      chalkHighlight: 'Do you have this in size [M]? ➡️ Where is the fitting room?'
    }
  },
  {
    id: 'sc_209',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'التعريف بالنفس والتشبيك الودي (Casual Introductions & Networking)',
    titleEn: 'Friendly Introductions: Making a Memorable First Impression',
    descAr: 'كيف تقدم نفسك في دورة تدريبية أو مناسبة اجتماعية باختصار جذاب وتتعرف على الآخرين.',
    descEn: 'Introduce yourself comfortably without sounding like a robotic resume.',
    speakingGoalAr: 'تقديم نفسك لسارة في 30 ثانية: اسمك، مجالك، وشيء شخصي يثير الاهتمام.',
    speakingGoalEn: 'Deliver a warm 3-sentence introduction including name, career, and a passion.',
    keyPattern: {
      ruleAr: 'معادلة التعريف الجذاب: الاسم + الدور الوظيفي بلغة بشرية (I help / I work in) + هواية أو شغف.',
      ruleEn: 'The Human Intro: Name + What you build/do + What excites you outside work.',
      formula: "I'm [Name]. I work in [Field], and when I'm not doing that, I love [Hobby]."
    },
    practicalExamples: [
      {
        en: "Nice to meet you! I'm Khalid, I work in software design, and I'm a huge coffee enthusiast.",
        ar: 'تشرفت بلقائك! أنا خالد، أعمل في تصميم البرمجيات، ومن عشاق القهوة المختصة.',
        spokenNoteAr: 'إضافة اهتمام شخصي يمنح الطرف الآخر فرصة سهلة لفتح موضوع معك.'
      },
      {
        en: "What brought you to this event today?",
        ar: 'ما الذي قادك لحضور هذه الفعالية اليوم؟',
        spokenNoteAr: 'سؤال ممتاز لكسر الجليد بعد التعريف بالنفس مباشرة.'
      },
      {
        en: "It was really great chatting with you! Do you happen to be on LinkedIn?",
        ar: 'سعدت جداً بالحديث معك! هل أنت متواجد على لينكد إن؟',
        spokenNoteAr: 'أسلوب طبيعي وأنيق لتبادل جهات الاتصال في نهاية اللقاء.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Reciting your entire university degree and GPA when someone asks 'Tell me about yourself'.",
        correct: "Share your current focus and one relatable passion in 30 seconds.",
        whyAr: 'التعريف العفوي ليس مقابلة رسمية؛ اجعل الأمر ممتعاً وقابلاً للتواصل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'عرف نفسك لسارة في ملتقى دولي: اسمك، مجالك، وشغف تمارسه في وقت فراغك!',
      promptEn: 'Introduce yourself to Sara at a global workshop in 3 lively sentences!',
      saraQuestionAr: "Hey there! Welcome to the mixer. I'm Sara, an AI conversational mentor. Who do we have here?",
      saraQuestionEn: "Hey there! Welcome to the mixer. I'm Sara, an AI conversational mentor. Who do we have here?",
      recommendedResponseEn: "Hi Sara, great to meet you! I'm passionate about technology, and in my free time, I love traveling and exploring new cultures."
    },
    quiz: [
      {
        questionAr: 'ما أفضل سؤال لطرحه على شخص التقيت به للتو في مؤتمر بعد التعريف باسمك؟',
        questionEn: 'What is an engaging follow-up question after introducing your name at a conference?',
        options: [
          "How much money do you make?",
          "What brought you to this event today?",
          "Why are you standing here?",
          "Do you have a passport?"
        ],
        correctIndex: 1,
        explanationAr: 'سؤال "What brought you to this event today?" سؤال ودي ومثالي لفتح حوار احترافي.'
      }
    ],
    whiteboardNotes: {
      title: 'The 30-Second Intro Blueprint',
      pointsAr: [
        '1. الاسم: I\'m [اسمك]',
        '2. المجال: I work in [مجالك] / I run a project in...',
        '3. الشغف: Outside of work, I\'m really into [هوايتك]',
        '4. الختام: Great to connect with you!'
      ],
      pointsEn: [
        '1. Identity: "I\'m [Name]"',
        '2. Profession: "I work in [Field]"',
        '3. Human touch: "Outside of work, I love [Hobby]"',
        '4. Bridge: "Great connecting with you!"'
      ],
      chalkHighlight: 'Name ➡️ Role / Craft ➡️ Relatable Passion'
    }
  },
  {
    id: 'sc_210',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'المكالمات الهاتفية السريعة والرسائل الصوتية (Phone Calls & Voicemails)',
    titleEn: 'Handling Phone Calls & Taking Messages with Ease',
    descAr: 'كيف تجيب على الهاتف بالإنجليزية دون خوف، وتطلب التحدث مع شخص، أو تترك له رسالة واضحة.',
    descEn: 'Answer calls, ask for the caller’s identity, and leave concise voicemails without panic.',
    speakingGoalAr: 'إجراء مكالمة هاتفية مع سارة لطلب التحدث مع مدير الفرع أو ترك رسالة صوتية.',
    speakingGoalEn: 'Conduct a polite phone inquiry, handle bad reception, and leave a message.',
    keyPattern: {
      ruleAr: 'في المكالمات نستخدم "This is [Name] calling" بدلاً من "I am [Name]". ونستخدم "May I speak to...?" لطلب شخص.',
      ruleEn: 'Phone conventions: "This is [Name]" (not "I am"); "May I speak with [Person]?".',
      formula: 'Hi, this is [Name]. May I please speak with [Person]? / Could I leave a quick message?'
    },
    practicalExamples: [
      {
        en: "Hi there, this is Tariq calling from Riyadh. May I speak with Dr. Miller, please?",
        ar: 'مرحباً، معك طارق يتصل من الرياض. هل يمكنني التحدث مع الدكتور ميلر، لو سمحت؟',
        spokenNoteAr: 'لاحظ: This is Tariq calling هي الصيغة القياسية في الهاتف.'
      },
      {
        en: "I'm having a bit of trouble hearing you, the connection is breaking up.",
        ar: 'أواجه صعوبة بسيطة في سماعك، الخط يتقطع.',
        spokenNoteAr: 'the connection is breaking up تعبير شهير لتقطع الصوت في المكالمات.'
      },
      {
        en: "Could you please tell him that I called and ask him to ring me back?",
        ar: 'هل يمكنك إخباره بأنني اتصلت والطلب منه معاودة الاتصال بي؟',
        spokenNoteAr: 'ring me back تعبير تحدثي بريطاني يعني عاود الاتصال بي (وفي أمريكا call me back).'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Hello, who are you? I am Tariq on phone.",
        correct: "Hello, this is Tariq. Who am I speaking with?",
        whyAr: 'في المكالمات لا نقول "I am Tariq" بل "This is Tariq"، ولا نقول "Who are you" بجفاء.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اتصل بسارة هاتفياً واطلب التحدث مع قسم خدمة العملاء، واشرح أن الصوت يتقطع قليلاً!',
      promptEn: 'Call Sara to ask for customer service and mention a slight audio cutout!',
      saraQuestionAr: 'Ring, ring! Hello, thank you for calling Sara Academy. How can I direct your call?',
      saraQuestionEn: 'Ring, ring! Hello, thank you for calling Sara Academy. How can I direct your call?',
      recommendedResponseEn: "Hi, this is Ahmed calling. Could you connect me to customer support? You were breaking up for a second."
    },
    quiz: [
      {
        questionAr: 'عندما ترد على مكالمة عمل هاتفية، كيف تعرف عن نفسك باللغة الإنجليزية الصحيحة؟',
        questionEn: 'How do you identify yourself correctly when making a phone call?',
        options: [
          "I am Sarah on the phone.",
          "This is Sarah speaking.",
          "Here is Sarah talking.",
          "Sarah is me."
        ],
        correctIndex: 1,
        explanationAr: 'في المحادثات الهاتفية الصيغة القياسية للتعريف هي: "This is [Name] speaking".'
      }
    ],
    whiteboardNotes: {
      title: 'Telephone Etiquette Protocol',
      pointsAr: [
        '1. التعريف: This is [اسمك] speaking',
        '2. الطلب: May I speak with [الشخص]؟',
        '3. تقطع الصوت: You are breaking up a little',
        '4. الرسالة: Could you ask him to call me back?'
      ],
      pointsEn: [
        '1. Opener: "This is [Name] speaking"',
        '2. Request: "May I speak with...?"',
        '3. Audio issue: "You are breaking up"',
        '4. Follow-up: "Could you ask him to call me back?"'
      ],
      chalkHighlight: 'This is [Name] ➡️ May I speak with [Person]? ➡️ Call me back'
    }
  },
  {
    id: 'sc_211_s',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'طلب الطعام في المطاعم وتقسيم الفاتورة (Dining Out & Splitting the Bill)',
    titleEn: 'Restaurant Fluency: Reservations, Dietary Preferences & The Bill',
    descAr: 'كيف تطلب وجبتك في المطعم، وتسأل عن الحساسية والمكونات، وتطلب تقسيم الفاتورة بلباقة دون إحراج.',
    descEn: 'Order dishes gracefully, specify allergies, and ask to split the bill like a local.',
    speakingGoalAr: 'طلب وجبة لشخصين في مطعم مع سارة (النادل) وسؤالها عن إمكانية تقسيم الحساب.',
    speakingGoalEn: 'Order a meal with dietary modifications and request separate checks smoothly.',
    keyPattern: {
      ruleAr: 'في المطعم: 1) البدء بـ "We\'d like a table for [عدد]" 2) الطلب بـ "I\'ll have the [الطبق]" 3) الحساب بـ "Could we get the bill, please? Could we split it?"',
      ruleEn: 'The Dining Formula: "Could we get a table for [X]?" ➡️ "I\'ll have the..." ➡️ "Could we split the bill?"',
      formula: "I'll have the [Dish] with [Modification], please. Could we split the check?"
    },
    practicalExamples: [
      {
        en: "Do you have any gluten-free or vegetarian recommendations?",
        ar: 'هل تتوفر لديكم أي توصيات خالية من الغلوتين أو نباتية؟',
        spokenNoteAr: 'dietary needs تعبير لطيف للاستفسار عن الحميات والحساسية الغذائية.'
      },
      {
        en: "I'll have the grilled sea bass with dressing on the side, please.",
        ar: 'سآخذ سمك القاروص المشوي مع وضع الصلصة جانباً، لو سمحت.',
        spokenNoteAr: 'on the side تعبير شهير لطلب وضع الصوص أو الصلصة في طبق جانبي منفصل.'
      },
      {
        en: "Could we get the check, please? Can we split it between two cards?",
        ar: 'ممكن الفاتورة، لو سمحت؟ وهل يمكننا تقسيمها بين بطاقتين؟',
        spokenNoteAr: 'split the check تعني تقسيم قيمة الحساب بين الأشخاص.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Snapping fingers and yelling 'Waiter! Bill!' across the dining hall.",
        correct: "Catch the server's eye with a warm nod and say: 'Excuse me, could we please get the check?'.",
        whyAr: 'فرقعة الأصابع أو الصياح يعتبر قمة قلة الاحترام في الثقافة الغربية؛ إيماءة العين الهادئة تكفي.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي النادلة في مطعمك المفضل! اطلب منها طبقك المفضل واطلب الفاتورة مقسمة!',
      promptEn: 'Sara is your server. Order dinner and ask if you can pay separately!',
      saraQuestionAr: 'Good evening! Have you decided on what you’d like to have tonight?',
      saraQuestionEn: 'Good evening! Have you decided on what you’d like to have tonight?',
      recommendedResponseEn: "Yes! I'll have the roasted chicken with vegetables, please. And could we split the bill when we're done?"
    },
    quiz: [
      {
        questionAr: 'ما التعبير المناسب لطلب تقسيم فاتورة الطعام بين الأصدقاء في المطعم؟',
        questionEn: 'Which phrase is the standard polite request to divide a restaurant bill?',
        options: [
          "Break the paper!",
          "Could we split the bill / check, please?",
          "Take half money and run.",
          "I will not pay today."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "Could we split the bill/check?" هي التعبير الاصطلاحي العالمي لتقسيم الفاتورة.'
      }
    ],
    whiteboardNotes: {
      title: 'Dining Out Toolkit',
      pointsAr: [
        '1. الحجز: Table for two, please',
        '2. الطلب: I\'ll have the [اسم الطبق]',
        '3. الإضافات الجانبية: Dressing on the side',
        '4. الفاتورة: Could we get the check / bill? Could we split it?'
      ],
      pointsEn: [
        '1. Seating: "Table for [X], please"',
        '2. Ordering: "I\'ll have the [Dish]"',
        '3. Sauce control: "On the side"',
        '4. Payment: "Could we get the check? Can we split it?"'
      ],
      chalkHighlight: "I'll have the [Dish] ➡️ Dressing on the side ➡️ Split the check"
    }
  },
  {
    id: 'sc_212_s',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'المواصلات وسيارات الأجرة وتطبيقات النقل (Uber, Cabs & City Transit)',
    titleEn: 'Rideshares & City Transit: Navigating Cabs, Uber & Subway Stops',
    descAr: 'كيف تتواصل مع سائق أوبر أو التاكسي، وتحدد نقطة الركوب والنزول، وتسأل عن أسرع مسار في المدينة.',
    descEn: 'Communicate with rideshare drivers, confirm drop-off spots, and navigate public transit.',
    speakingGoalAr: 'إرشاد سائق التاكسي (سارة) إلى نقطة النزول الدقيقة أمام الفندق.',
    speakingGoalEn: 'Direct a rideshare driver regarding pickup location, traffic route, and drop-off corner.',
    keyPattern: {
      ruleAr: 'في سيارات الأجرة: تأكيد الوجهة (Heading to [Destination]) ➡️ توجيه نقطة النزول (You can drop me off right by the entrance / at the corner).',
      ruleEn: 'Rideshare phrases: "Heading to [Destination]" ➡️ "You can drop me off [At landmark / Corner]".',
      formula: 'Could you drop me off right at [Landmark / Corner]? Keep the change!'
    },
    practicalExamples: [
      {
        en: "Hi! Are you picking up for Mansoor? Heading to terminal 2, please.",
        ar: 'أهلاً! هل الرحلة باسم منصور؟ متوجهون إلى الصالة رقم 2، لو سمحت.',
        spokenNoteAr: 'تأكيد الاسم والوجهة قبل الانطلاق لضمان ركوب السيارة الصحيحة.'
      },
      {
        en: "You can just drop me off right by the curb next to the bookstore.",
        ar: 'يمكنك إنزالي عند الرصيف بجوار المكتبة مباشرة.',
        spokenNoteAr: 'drop me off تعبير يعني أنزلني هنا.'
      },
      {
        en: "Is traffic usually this heavy on the bridge this time of day?",
        ar: 'هل حركة السير مزدحمة هكذا عادة على الجسر في هذا الوقت من اليوم؟',
        spokenNoteAr: 'فتح حديث ودي خفيف مع السائق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Shouting 'Stop car here right now!' abruptly in the middle of a highway.",
        correct: "Give the driver 20 seconds notice: 'You can pull over right at the next corner, please.'",
        whyAr: 'إشعار السائق قبل التوقف بمسافة كافية يضمن السلامة واللباقة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي سائقة أوبر! اطلب منها إنزالك أمام محطة المترو واشكرها على الرحلة!',
      promptEn: 'Sara is your rideshare driver. Ask her to pull over at the metro station entrance!',
      saraQuestionAr: 'We are approaching your destination pin! Where exactly would you like me to stop?',
      saraQuestionEn: 'We are approaching your destination pin! Where exactly would you like me to stop?',
      recommendedResponseEn: "Right by the metro station entrance on the right is perfect! Thanks so much for the smooth ride, have a great day!"
    },
    quiz: [
      {
        questionAr: 'ما التعبير المناسب للطلب من سائق التاكسي التوقف على جانب الطريق لإنزالك؟',
        questionEn: 'Which phrasal verb means to steer a car to the side of the road to let a passenger out?',
        options: [
          "Pull over / Drop off",
          "Fly away",
          "Crash down",
          "Jump over"
        ],
        correctIndex: 0,
        explanationAr: 'تعبير "Pull over" يعني الانعطاف بجانب الطريق والتوقف، وتعبير "Drop off" يعني إنزال الراكب.'
      }
    ],
    whiteboardNotes: {
      title: 'City Transit & Rideshare Navigator',
      pointsAr: [
        '1. تأكيد الرحلة: Are you picking up for [اسمك]؟',
        '2. التوقف بجانب الرصيف: Pull over by the curb',
        '3. نقطة النزول: You can drop me off right here',
        '4. الإكرامية: Keep the change! (احتفظ بالباقي)'
      ],
      pointsEn: [
        '1. Identity check: "Picking up for [Name]?"',
        '2. Roadside stop: "Could you pull over here?"',
        '3. Drop-off: "Drop me off right by the entrance"',
        '4. Courtesy tip: "Keep the change, thanks!"'
      ],
      chalkHighlight: 'Heading to [Destination] ➡️ Pull over ➡️ Drop me off here'
    }
  },

  // ==========================================
  // INTERMEDIATE LEVEL (B1-B2) - Lessons 11 to 20
  // ==========================================
  {
    id: 'sc_202',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'الاعتراض المهذب والتفاوض اللبق دون هجوم (Polite Disagreement)',
    titleEn: 'Diplomatic Disagreement & Smooth Negotiation',
    descAr: 'كيف تختلف في الرأي أو تعتذر عن طلب بأسلوب راقٍ يحافظ على الود والعلاقة مع المتحدث.',
    descEn: 'Disagree constructively without sounding harsh or confrontational.',
    speakingGoalAr: 'إبداء اعتراض لطيف ومقنع على اقتراح تطرحه سارة خلال الحوار الصوتي.',
    speakingGoalEn: 'Express respectful dissent and offer an alternative suggestion smoothly.',
    keyPattern: {
      ruleAr: 'في الإنجليزية المهذبة، نبدأ بالاعتراف بنقطة الطرف الآخر (I see your point)، ثم نضع التحفظ بلباقة (However / But).',
      ruleEn: 'The Cushion Technique: Acknowledge first ➡️ Soften disagreement ➡️ Propose alternative.',
      formula: "I see your point, but [Softer Counter-View] + [Alternative Proposal]"
    },
    practicalExamples: [
      {
        en: "I see where you're coming from, but have you considered the budget?",
        ar: 'أفهم وجهة نظرك تماماً، ولكن هل أخذت الميزانية في الحسبان؟',
        spokenNoteAr: 'I see where you\'re coming from تعني أنا متفهم لزاويتك تماماً.'
      },
      {
        en: "I'm not quite sure that would work for our schedule, to be honest.",
        ar: 'لست متأكداً تماماً أن ذلك سيناسب جدولنا، بصراحة.',
        spokenNoteAr: 'كلمة quite و to be honest تخففان حدة الرفض بدرجة عالية.'
      },
      {
        en: "That's an interesting angle, although maybe we could try a middle ground?",
        ar: 'هذه زاوية مثيرة للاهتمام، مع أنه ربما يجدر بنا تجربة حل وسط؟',
        spokenNoteAr: 'middle ground تعني حلاً وسطاً يرضي الجميع.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "You are wrong! That is bad idea.",
        correct: "I see what you mean, but I have a slightly different take on this.",
        whyAr: 'القول المباشر "You are wrong" يعتبر هجومياً في الثقافة الإنجليزية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تقترح عليك العمل طوال عطلة نهاية الأسبوع! ارفض بأسلوب لبق واقترح حلاً بديلاً!',
      promptEn: 'Sara suggests working all weekend. Disagree politely and propose an alternative!',
      saraQuestionAr: 'I think we should put in 10 hours this Saturday and Sunday. What do you think?',
      saraQuestionEn: 'I think we should put in 10 hours this Saturday and Sunday. What do you think?',
      recommendedResponseEn: "I appreciate the dedication, but I think taking time to recharge will help us perform better on Monday."
    },
    quiz: [
      {
        questionAr: 'أي من الردود التالية هو الأكثر لباقة واحترافية للاعتراض؟',
        questionEn: 'Which reply represents the most diplomatic way to disagree?',
        options: [
          "That is completely wrong.",
          "I see where you're coming from, but I see it slightly differently.",
          "No way, never.",
          "I reject this."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة I see where you\'re coming from تمتص الحدة وتعبر عن نضج في الحوار.'
      }
    ],
    whiteboardNotes: {
      title: 'The Soft Cushion Technique',
      pointsAr: [
        '1. امتصاص الفكرة: I understand your point...',
        '2. التلطيف: ...but I see it slightly differently.',
        '3. البديل: How about we meet in the middle?'
      ],
      pointsEn: [
        '1. Cushion: I see where you are coming from...',
        '2. Pivot: ...however, my main concern is...',
        '3. Solution: Maybe we can try a middle ground?'
      ],
      chalkHighlight: 'Acknowledge ➡️ Pivot softly ➡️ Propose balance'
    }
  },
  {
    id: 'sc_213',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'حل شكاوى العملاء واسترداد الأموال بحزم مهذب (Resolving Disputes & Refunds)',
    titleEn: 'Assertive Customer Service & Requesting Refunds Without Losing Your Cool',
    descAr: 'كيف تشتكي من منتج تالف أو خدمة سيئة وتسترد حقك باحترام وهدوء حازم دون انفعال.',
    descEn: 'Demand refunds or replacements politely and firmly using consumer rights phrases.',
    speakingGoalAr: 'شرح مشكلة منتج به عيب لسارة (مديرة المتجر) والمطالبة باسترداد كامل المبلغ أو استبداله.',
    speakingGoalEn: 'Articulate a product defect calmly and negotiate an exchange or refund.',
    keyPattern: {
      ruleAr: 'في الشكاوى المهذبة: اشرح الواقعة بحياد (Unfortunately, the item didn\'t match) ➡️ أرفق الدليل ➡️ اطلب الحل المناسب (I\'d appreciate a replacement).',
      ruleEn: 'State the factual discrepancy calmly ➡️ reference your receipt ➡️ request a fair resolution.',
      formula: "Unfortunately, [The issue occurred]. I'd appreciate it if we could arrange a refund or replacement."
    },
    practicalExamples: [
      {
        en: "I bought this laptop yesterday, but unfortunately, the battery refuses to charge.",
        ar: 'اشتريت هذا الجهاز المحمول بالأمس، ولكن للأسف فإن البطارية ترفض الشحن تماماً.',
        spokenNoteAr: 'Unfortunately تضع نبرة موضوعية بعيدة عن الصراخ.'
      },
      {
        en: "Given the inconvenience caused, I would appreciate a full refund to my card.",
        ar: 'نظراً للإزعاج الذي تسبب فيه هذا العطل، أود التكرم باسترداد كامل المبلغ إلى بطاقتي.',
        spokenNoteAr: 'Given the inconvenience تعبير قوي يُلزم المتجر بالتعويض.'
      },
      {
        en: "Could I please speak with the store manager regarding this matter?",
        ar: 'هل يمكنني التحدث مع مدير المتجر بخصوص هذا الأمر، لو سمحت؟',
        spokenNoteAr: 'طلب تصعيد المشكلة بهدوء دون الدخول في جدال مع الموظف العادي.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "You are scammers and I will destroy your store!",
        correct: "This does not meet the promised quality, and I expect an immediate solution.",
        whyAr: 'التهديد والصراخ يوقف التعاون القانوني؛ الحزم الهادئ يحصل على استرداد أموالك أسرع بكثير.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي مديرة خدمة العملاء. اشرح لها أن طلبك تأخر أسبوعاً واطلب تعويضاً أو إلغاءً!',
      promptEn: 'Sara is customer support. Explain your order is a week late and request a resolution!',
      saraQuestionAr: 'Hello, thank you for reaching out to support. What seems to be the issue with your order?',
      saraQuestionEn: 'Hello, thank you for reaching out to support. What seems to be the issue with your order?',
      recommendedResponseEn: "Hi Sara. My package is over a week overdue with no tracking update. Could you please look into this or initiate a full refund?"
    },
    quiz: [
      {
        questionAr: 'ما أفضل عبارة للمطالبة باسترداد أموالك بطريقة مهذبة وحازمة قانونياً؟',
        questionEn: 'Which phrase represents a firm and diplomatic refund request?',
        options: [
          "Give back my cash immediately or else!",
          "I would appreciate a full refund to my original payment method.",
          "I don't care about money.",
          "Maybe you can keep it."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "I would appreciate a full refund to my original payment method" تجمع بين الأدب والحزم التجاري.'
      }
    ],
    whiteboardNotes: {
      title: 'Assertive Dispute Resolution',
      pointsAr: [
        '1. المشكلة بحيادية: Unfortunately, the item arrived damaged.',
        '2. الأثر: This has caused significant delay for our team.',
        '3. الحل: I\'d appreciate a replacement / full refund.',
        'الحزم الهادئ يحقق نتائج أسرع من الغضب!'
      ],
      pointsEn: [
        '1. Fact: "Unfortunately, the product is defective"',
        '2. Impact: "It prevented us from completing the task"',
        '3. Ask: "I\'d appreciate a replacement or refund"',
        'Cool assertiveness yields immediate results'
      ],
      chalkHighlight: 'Fact ➡️ Business Impact ➡️ Firm Request'
    }
  },
  {
    id: 'sc_214',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تحديثات العمل والاجتماعات اليومية (Daily Standups & Sprint Updates)',
    titleEn: 'Agile Standups: Sharing Work Progress & Blockers in 60 Seconds',
    descAr: 'كيف تقدم تحديثك اليومي في اجتماعات Standup في دقيقة واحدة: ما أنجزته، ما تفعله اليوم، وأي معوقات.',
    descEn: 'Deliver punchy daily standup updates: yesterday’s wins, today’s sprint, and blockers.',
    speakingGoalAr: 'تقديم تحديث مهني منظم في 45 ثانية لسارة باستخدام هيكل Standup الثلاثي.',
    speakingGoalEn: 'Summarize tasks completed, current focus, and any project blockers.',
    keyPattern: {
      ruleAr: 'قالب Standup الثلاثي السريع: 1) ما أنجزته (Yesterday, I wrapped up...) 2) تركيز اليوم (Today, I\'m tackling...) 3) المعوقات (No blockers / I\'m blocked on...).',
      ruleEn: 'The 3-Point Standup: "Yesterday I completed... Today I\'m focusing on... My only blocker is...".',
      formula: "Yesterday: [Completed item] ➡️ Today: [Focus item] ➡️ Blockers: [Blocker / None]"
    },
    practicalExamples: [
      {
        en: "Yesterday, I wrapped up the mobile login redesign and pushed the code for review.",
        ar: 'بالأمس، أنهيت إعادة تصميم شاشة تسجيل الدخول للجوال ورفعت الكود للمراجعة.',
        spokenNoteAr: 'wrapped up تعبير عملي يعني أنهيت وأغلقت المهمة تماماً.'
      },
      {
        en: "Today, my main priority is writing unit tests for the checkout pipeline.",
        ar: 'اليوم، أولويتي الأساسية هي كتابة اختبارات الوحدة لمسار الدفع.',
        spokenNoteAr: 'my main priority تحدد تركيزك بوضوح أمام الفريق.'
      },
      {
        en: "I don't have any major blockers, but I might need 5 minutes with Sarah on API endpoints.",
        ar: 'لا توجد لدي أي معوقات كبرى، لكن قد أحتاج 5 دقائق مع سارة لمراجعة نقاط الاتصال البرمجية.',
        spokenNoteAr: 'blocker يعني أي عائق يمنعك من إكمال عملك.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Rambling for 10 minutes about your entire life and technical philosophy during a 15-minute team standup.",
        correct: "Stick strictly to the 60-second rule: Done ➡️ Doing ➡️ Blockers.",
        whyAr: 'اجتماع Standup مصمم ليكون سريعاً ورشيقاً لا يتعدى دقيقة لكل عضو.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تدير اجتماع Standup الصباحي! قدم تحديثك عن عمل الأمس، خطة اليوم، ومعوق واحد!',
      promptEn: 'Sara is leading the morning standup. Give your 60-second update crisply!',
      saraQuestionAr: 'Good morning everyone! Let’s do a quick round of standup updates. You are up first!',
      saraQuestionEn: 'Good morning everyone! Let’s do a quick round of standup updates. You are up first!',
      recommendedResponseEn: "Morning! Yesterday I finalized the presentation slides. Today I'm running client demos, and I have no blockers so far."
    },
    quiz: [
      {
        questionAr: 'ماذا تعني كلمة "Blocker" في اجتماعات العمل السريعة (Standups)؟',
        questionEn: 'What does a "Blocker" refer to in daily Agile meetings?',
        options: [
          "A person who blocks the doorway.",
          "An obstacle or dependency preventing task progress.",
          "A piece of sports equipment.",
          "A vacation request."
        ],
        correctIndex: 1,
        explanationAr: 'كلمة Blocker في بيئة العمل تعني عائقاً تقنياً أو انتظار موافقة تمنعك من مواصلة المهمة.'
      }
    ],
    whiteboardNotes: {
      title: 'The 60-Second Standup Template',
      pointsAr: [
        '1. الأمس: Yesterday, I wrapped up [المهمة]',
        '2. اليوم: Today, I\'m diving into [المهمة القادمة]',
        '3. العوائق: I\'m blocked on [المعوق] / No blockers on my side!',
        'السر: الإيجاز والدقة واحترام وقت الزملاء'
      ],
      pointsEn: [
        '1. What’s done: "Yesterday I shipped / closed..."',
        '2. What’s next: "Today my focus is..."',
        '3. Roadblocks: "My main blocker is waiting on..."',
        'Brevity signals engineering discipline'
      ],
      chalkHighlight: 'Yesterday I finished ➡️ Today I\'m tackling ➡️ Blockers'
    }
  },
  {
    id: 'sc_215',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'إعادة جدولة المواعيد وضبط التقويم باحترافية (Rescheduling Appointments)',
    titleEn: 'Rescheduling Meetings & Managing Calendar Conflicts Smoothly',
    descAr: 'كيف تعتذر عن اجتماع طارئ وتقترح مواعيد بديلة دون أن تبدو غير ملتزم أو غير مبالٍ.',
    descEn: 'Move conflicting appointments gracefully while preserving business relationships.',
    speakingGoalAr: 'إخطار سارة بوجود تعارض في المواعيد واقتراح موعدين بديلين مناسبين للطرفين.',
    speakingGoalEn: 'Apologize for a scheduling conflict and propose two alternative time slots.',
    keyPattern: {
      ruleAr: 'معادلة تغيير الموعد: اعتذار سريع + سبب وجيز + اقتراح خيارين بديلين جاهزين على الفور.',
      ruleEn: 'The Reschedule Formula: Apologize briefly ➡️ Cite conflict ➡️ Propose 2 specific slots.',
      formula: "Something urgent has come up. Would it be possible to push our meeting to [Slot A] or [Slot B]?"
    },
    practicalExamples: [
      {
        en: "Something unexpected has come up on my end; would you mind if we pushed our chat to 3 PM?",
        ar: 'استجد أمر طارئ غير متوقع من جانبي، هل تمانع لو أخرنا محادثتنا إلى الثالثة عصراً؟',
        spokenNoteAr: 'push our chat to تعبير عفوي لترحيل الموعد لوقت لاحق اليوم.'
      },
      {
        en: "I have a hard stop at 2:00, so could we reschedule for tomorrow morning?",
        ar: 'لدي التزام صارم لا يقبل التأخير عند الساعة 2:00، فهل بإمكاننا إعادة الجدولة لصباح الغد؟',
        spokenNoteAr: 'hard stop تعني موعداً حاسماً يجب المغادرة عنده فوراً.'
      },
      {
        en: "Does Thursday at 10 AM work on your end, or does Friday suit you better?",
        ar: 'هل يناسبك يوم الخميس الساعة 10 صباحاً، أم أن يوم الجمعة أفضل بالنسبة لك؟',
        spokenNoteAr: 'تقديم خيارين يسهل على الطرف الآخر الاختيار فوراً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I cannot come. Bye.",
        correct: "Apologies for the late notice, but could we reschedule? I'm free Thursday afternoon.",
        whyAr: 'الإلغاء دون تقديم بديل يترك انطباعاً بعدم الاهتمام بالموعد والشخص.'
      }
    ],
    speakingChallenge: {
      promptAr: 'لديك تضارب مواعيد مع سارة اليوم! اعتذر بلطف واقترح عليها موعدين بديلين هذا الأسبوع!',
      promptEn: 'You have a calendar clash with Sara. Reschedule gracefully proposing 2 alternate slots!',
      saraQuestionAr: 'Hey! Just checking if we are still on for our 2 PM check-in today?',
      saraQuestionEn: 'Hey! Just checking if we are still on for our 2 PM check-in today?',
      recommendedResponseEn: "Hi Sara, apologies for the short notice, but an urgent client call came up. Could we push to tomorrow at 11 AM or Thursday at 2 PM?"
    },
    quiz: [
      {
        questionAr: 'ماذا يعني تعبير "I have a hard stop at 3 PM" في بيئة الأعمال؟',
        questionEn: 'What does "I have a hard stop at 3 PM" signify in business communication?',
        options: [
          "My computer will break at 3 PM.",
          "I must end the meeting strictly at 3 PM due to another commitment.",
          "I am taking a nap at 3 PM.",
          "I will not start before 3 PM."
        ],
        correctIndex: 1,
        explanationAr: 'تعبير "hard stop" يعني التزاماً حتمياً بمغادرة الاجتماع في الوقت المحدد تماماً.'
      }
    ],
    whiteboardNotes: {
      title: 'Calendar Rescheduling Playbook',
      pointsAr: [
        '1. السبب: Something unexpected came up (استجد طارئ)',
        '2. التأخير: Could we push it back to...? (هل نؤخره لـ...؟)',
        '3. التقديم: Could we bring it forward to...? (هل نقدمه لـ...؟)',
        '4. الخيارات: Does Tuesday or Wednesday work better for you?'
      ],
      pointsEn: [
        '1. Alert: "Something urgent came up on my end"',
        '2. Push back = delay to later time',
        '3. Bring forward = move to earlier slot',
        '4. Choice: "Would slot A or B fit your schedule better?"'
      ],
      chalkHighlight: 'Apologize ➡️ Cite conflict ➡️ Offer 2 alternative slots'
    }
  },
  {
    id: 'sc_216',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'طرح الأفكار والمقترحات في جلسات العصف الذهني (Brainstorming & Pitching Ideas)',
    titleEn: 'Pitching Ideas in Brainstorming Sessions Without Fear of Rejection',
    descAr: 'كيف تطرح أفكارك في جلسات العمل كبالون اختبار منخفض المخاطر يشجع الجميع على التفاعل.',
    descEn: 'Introduce creative proposals collaboratively using low-stakes conversational framing.',
    speakingGoalAr: 'طرح فكرة مبتكرة على سارة لتحسين خدمة العملاء باستخدام قالب Just hear me out.',
    speakingGoalEn: 'Pitch a low-risk experimental idea during a creative team session.',
    keyPattern: {
      ruleAr: 'في العصف الذهني: اطرح الفكرة كتجربة قابلة للاختبار (What if we tested... / Hear me out) لتفادي المقاومة المبكرة.',
      ruleEn: 'Frame ideas as low-risk pilots: "What if we ran a quick experiment on [Concept]?"',
      formula: "Hear me out on this: What if we tried [Idea] on a small scale to see how it performs?"
    },
    practicalExamples: [
      {
        en: "Just hear me out on this: what if we created a 30-second video walkthrough for new users?",
        ar: 'اسمعني في هذه النقطة فقط: ماذا لو أنشأنا جولة فيديو مدتها 30 ثانية للمستخدمين الجدد؟',
        spokenNoteAr: 'Hear me out تعبير جاذب للانتباه يعني استمع لفكرتي قبل أن تحكم عليها.'
      },
      {
        en: "To build on what you just said, we could also automate the onboarding emails.",
        ar: 'بناءً على ما ذكرته للتو وتطويراً له، يمكننا أيضاً أتمتة رسائل البريد الإلكتروني الترحيبية.',
        spokenNoteAr: 'To build on what you said أسلوب ذكي لإظهار أنك مستمع رائع وتطور أفكار زملائك.'
      },
      {
        en: "Let's treat it as a two-week pilot project and see what the data reveals.",
        ar: 'دعونا نتعامل معها كمشروع تجريبي لمدة أسبوعين ونرى ما ستكشفه البيانات.',
        spokenNoteAr: 'pilot project يقلل الخوف من التكلفة والمخاطرة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "My idea is the only good one and everything else is wrong.",
        correct: "Here's a thought from a different angle: what if we tested...",
        whyAr: 'التعصب للفكرة يغلق عقول الفريق؛ العصف الذهني يزدهر بالتواضع والتجريب.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تبحث عن طريقة لتحفيز الطلاب على ممارسة التحدث. اطرح عليها فكرة مبتكرة!',
      promptEn: 'Brainstorm an innovative speaking practice initiative with Sara!',
      saraQuestionAr: 'I want to encourage our learners to speak 5 minutes every single day. Any wild ideas?',
      saraQuestionEn: 'I want to encourage our learners to speak 5 minutes every single day. Any wild ideas?',
      recommendedResponseEn: "Hear me out: what if we launched a daily 3-minute voice memo challenge with instant Sara feedback?"
    },
    quiz: [
      {
        questionAr: 'ما التعبير المناسب لربط فكرتك بفكرة زميلك في جلسة العصف الذهني وإثرائها؟',
        questionEn: 'Which phrase gracefully connects your proposal to a colleague’s previous point?',
        options: [
          "To destroy what you said...",
          "To build on what you just mentioned...",
          "Forget what you said...",
          "I disagree completely with everyone..."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "To build on what you just mentioned" هي التعبير الاحترافي الأول لتطوير وتوسيع أفكار الفريق.'
      }
    ],
    whiteboardNotes: {
      title: 'Brainstorming Pitch Toolkit',
      pointsAr: [
        '1. لفت الانتباه الودي: Hear me out on this...',
        '2. البناء على أفكار الزملاء: To build on what you said...',
        '3. تقليل المخاطرة: Let\'s run a small two-week pilot',
        '4. النتيجة: فريق مرحب ومتحمس لاختبار الفكرة'
      ],
      pointsEn: [
        '1. Attention hook: "Hear me out on this..."',
        '2. Synergy: "Building on [Name]\'s point..."',
        '3. Low risk: "Let\'s pilot this for 2 weeks"',
        '4. Mindset: Collaborative exploration over ego'
      ],
      chalkHighlight: 'Hear me out ➡️ Build on prior point ➡️ Low-risk pilot'
    }
  },
  {
    id: 'sc_217',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'التشبيك المهني في المؤتمرات الدولية (International Conference Networking)',
    titleEn: 'Navigating Conference Mixers: Exchanging Insights & Making Contacts',
    descAr: 'كيف تندمج في حلقات النقاش في المؤتمرات وتتبادل بطاقات العمل وأرقام التواصل بلباقة.',
    descEn: 'Mingle at professional mixers, discuss industry trends, and cement future collaborations.',
    speakingGoalAr: 'الانضمام إلى حلقة نقاش وبدء حوار مع سارة في مؤتمر تقني دولي.',
    speakingGoalEn: 'Join an active conversation circle and transition smoothly to contact exchange.',
    keyPattern: {
      ruleAr: 'في المؤتمرات: 1) استئذان دخول الحلقة (Mind if I join you?) 2) السؤال عن الجلسات المفضلة 3) تبادل التواصل (Let\'s connect on LinkedIn).',
      ruleEn: 'Conference Protocol: Circle entry ➡️ Discuss keynote takeaway ➡️ Exchange digital contacts.',
      formula: 'Mind if I join you? What has been your favorite keynote or takeaway so far?'
    },
    practicalExamples: [
      {
        en: "Do you mind if I join you folks? I caught your conversation about AI agents.",
        ar: 'هل تمانعون لو انضممت إليكم؟ لفت انتباهي حديثكم عن وكلاء الذكاء الاصطناعي.',
        spokenNoteAr: 'Do you mind if I join you أسلوب مهذب وسلس لدخول أي مجموعة واقفة.'
      },
      {
        en: "What was your main takeaway from this morning's keynote presentation?",
        ar: 'ما هي أهم فائدة أو خلاصة خرجت بها من الكلمة الافتتاحية هذا الصباح؟',
        spokenNoteAr: 'main takeaway تعبير مهني شهير يعني الفائدة الأبرز المستخلصة.'
      },
      {
        en: "I'd love to stay in touch and see how your project develops. Are you active on LinkedIn?",
        ar: 'يسعدني جداً البقاء على تواصل ومتابعة تطورات مشروعك. هل أنت نشط على لينكد إن؟',
        spokenNoteAr: 'أسلوب راقٍ لطلب التواصل دون إحراج أو إلحاح.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Thrusting your paper business card into people's hands before even saying hello.",
        correct: "Have a 3-minute genuine conversation first, then suggest connecting online.",
        whyAr: 'التشبيك الحقيقي مبني على بناء العلاقات الإنسانية أولاً وليس توزيع الإعلانات.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تقف في استراحة القهوة في مؤتمر دبي للتقنية. انضم إليها وافتح حواراً مهنياً!',
      promptEn: 'Join Sara during the coffee break at a tech summit and discuss the morning session!',
      saraQuestionAr: 'Hi there! What an intense morning session on natural language models!',
      saraQuestionEn: 'Hi there! What an intense morning session on natural language models!',
      recommendedResponseEn: "Totally agree! Do you mind if I join you? What was your single biggest takeaway from the keynote?"
    },
    quiz: [
      {
        questionAr: 'ما العبارة الأنسب لدخول مجموعة أشخاص يتحدثون في استراحة مؤتمر دون تطفل؟',
        questionEn: 'Which phrase is most natural for joining a standing group at a networking mixer?',
        options: [
          "Stop talking and listen to me!",
          "Do you mind if I join you folks?",
          "Who told you to stand here?",
          "I want free food."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "Do you mind if I join you folks?" هي العبارة المهذبة المعتمدة لدخول حلقات الحوار.'
      }
    ],
    whiteboardNotes: {
      title: 'Conference Mixer Navigator',
      pointsAr: [
        '1. الدخول: Mind if I join you? (هل تمانعون انضمامي؟)',
        '2. السؤال الذهبي: What’s your biggest takeaway so far?',
        '3. الاهتمام: What project are you currently focused on?',
        '4. الختام: Let’s connect on LinkedIn!'
      ],
      pointsEn: [
        '1. Approach: "Mind if I join you folks?"',
        '2. Conversational hook: "What’s been your favorite session?"',
        '3. Curiosity: "What are you currently building?"',
        '4. Follow-up: "Let’s connect on LinkedIn!"'
      ],
      chalkHighlight: 'Mind if I join? ➡️ What’s your key takeaway? ➡️ Let’s connect!'
    }
  },
  {
    id: 'sc_218',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'مقابلات التوظيف: الإجابة على سؤال "عرفنا عن نفسك" (Tell Me About Yourself)',
    titleEn: 'Job Interviews: The Present-Past-Future Elevator Pitch',
    descAr: 'كيف تجيب على السؤال الأول في مقابلات التوظيف بإتقان يجمع بين خبرتك الحالية وإنجازاتك وطموحك.',
    descEn: 'Master the classic interview opener using the proven Present-Past-Future framework.',
    speakingGoalAr: 'تقديم إجابة متقنة في 60 ثانية لسارة (مديرة التوظيف) باستخدام نموذج Present-Past-Future.',
    speakingGoalEn: 'Deliver a concise 60-second interview introduction answering "Tell me about yourself".',
    keyPattern: {
      ruleAr: 'إطار الحاضر-الماضي-المستقبل: 1) دورك الحالي وخبرتك 2) إنجاز رئيسي صنعته في السابق 3) لماذا أنت متحمس لهذه الفرصة بالذات.',
      ruleEn: 'The Present-Past-Future Formula: Current role ➡️ Past milestone ➡️ Why this company now.',
      formula: 'Present: [Current expertise] ➡️ Past: [Key achievement] ➡️ Future: [Excited for this role]'
    },
    practicalExamples: [
      {
        en: "Currently, I lead product marketing for an educational startup where I grew user engagement by 40%.",
        ar: 'أقود حالياً تسويق المنتجات لشركة ناشئة تعليمية حيث نجحت في زيادة تفاعل المستخدمين بنسبة 40%.',
        spokenNoteAr: 'الشق الأول: الحاضر والإنجاز الملموس بالأرقام.'
      },
      {
        en: "Before this, I developed my analytical foundation across five years in consulting.",
        ar: 'قبل ذلك، بنيت أساسي التحليلي عبر خمس سنوات من العمل في مجال الاستشارات.',
        spokenNoteAr: 'الشق الثاني: الماضي وكيف بنيت مهاراتك.'
      },
      {
        en: "Looking forward, I'm thrilled about this role because your mission directly matches my expertise.",
        ar: 'وبالنظر للمستقبل، أنا متحمس جداً لهذا الدور لأن رسالة شركتكم تتطابق مباشرة مع خبرتي.',
        spokenNoteAr: 'الشق الثالث: المستقبل ولماذا هذه الشركة بالتحديد.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Starting with your birth date, elementary school, and personal hobbies.",
        correct: "Focus on your professional journey and value proposition in 90 seconds max.",
        whyAr: 'المحاور يريد معرفة قيمتك المهنية للشركة وليس سيرة طفولتك الشخصية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي مديرة التوظيف في شركة أحلامك! أجب على سؤالها الافتتاحي بنموذج Present-Past-Future!',
      promptEn: 'Sara is your interviewer. Deliver your Present-Past-Future pitch with poise!',
      saraQuestionAr: 'Welcome to our team interview! To kick things off: Could you tell me a little about yourself?',
      saraQuestionEn: 'Welcome to our team interview! To kick things off: Could you tell me a little about yourself?',
      recommendedResponseEn: "Currently, I specialize in digital communication. Previously, I helped scale several community projects, and I'm eager to bring that energy to your team!"
    },
    quiz: [
      {
        questionAr: 'ما الترتيب الأفضل للرد على سؤال المقابلة الشهير "Tell me about yourself"؟',
        questionEn: 'What is the most effective structure for "Tell me about yourself"?',
        options: [
          "Past childhood ➡️ High school ➡️ Hobbies",
          "Present (Current role) ➡️ Past (Proven milestone) ➡️ Future (Why here)",
          "Salary demands ➡️ Complaints about old boss ➡️ Questions",
          "Silence and asking the interviewer to read the CV"
        ],
        correctIndex: 1,
        explanationAr: 'نموذج Present-Past-Future هو الإطار الذهبي المعتمد عالمياً للإجابة باحترافية وجاذبية.'
      }
    ],
    whiteboardNotes: {
      title: 'The Interview Pitch Framework',
      pointsAr: [
        '1. الحاضر (Present): دورك وخبرتك الحالية + إنجاز',
        '2. الماضي (Past): كيف بنيت مهارتك وخلفيتك السابقة',
        '3. المستقبل (Future): لماذا هذا المنصب بالتحديد وما ستضيفه لهم',
        'الوقت المثالي: 60 إلى 90 ثانية كحد أقصى'
      ],
      pointsEn: [
        '1. Present: "Currently, I focus on..."',
        '2. Past: "Before this, I developed skills in..."',
        '3. Future: "I\'m excited about this opportunity because..."',
        'Optimal duration: 60 to 90 seconds'
      ],
      chalkHighlight: 'Present (Current) ➡️ Past (Milestone) ➡️ Future (Why this role)'
    }
  },
  {
    id: 'sc_219',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'نقاش الأفلام والمسلسلات والترشيحات (Discussing Movies, Series & Plots)',
    titleEn: 'Reviewing Films, Binge-Watching & Avoiding Spoilers',
    descAr: 'كيف تناقش الأفلام والمسلسلات بحماس، وتصف الحبكة الدرامية، دون حرق الأحداث للآخرين.',
    descEn: 'Share film and TV recommendations, discuss plot twists, and warn about spoilers.',
    speakingGoalAr: 'التوصية بفيلم أو مسلسل مفضل لسارة وشرح سبب إعجابك به في 45 ثانية.',
    speakingGoalEn: 'Recommend a movie or show, describing the premise without spoiling the plot.',
    keyPattern: {
      ruleAr: 'في نقاش الأفلام: صف الفكرة العامة (It revolves around...) ➡️ امتدح التمثيل أو الإخراج ➡️ حذر من الحرق (No spoilers, but...).',
      ruleEn: 'Film Review Pattern: State premise ➡️ Praise pacing/acting ➡️ Deliver spoiler-free verdict.',
      formula: "It revolves around [Premise]. Without giving away any spoilers, the plot twist will blow your mind!"
    },
    practicalExamples: [
      {
        en: "Have you seen that new documentary? I ended up binge-watching the whole season in one weekend!",
        ar: 'هل شاهدت ذلك الوثائقي الجديد؟ انتهى بي المطاف بمتابعة الموسم كاملاً دفعة واحدة في عطلة نهاية الأسبوع!',
        spokenNoteAr: 'binge-watching تعبير عصري يعني مشاهدة حلقات متتالية دون توقف.'
      },
      {
        en: "It revolves around an architect who uncovers a hidden secret in the city archives.",
        ar: 'تدور القصة حول مهندس معماري يكتشف سراً مخفياً في أرشيف المدينة.',
        spokenNoteAr: 'revolves around تعبير كلاسيكي رائع لبيان محور القصة.'
      },
      {
        en: "Without giving away any spoilers, the ending will completely blow your mind.",
        ar: 'دون أي حرق للأحداث، النهاية ستذهلك وتصدمك تماماً.',
        spokenNoteAr: 'blow your mind تعبير يعني يذهلك لشدة الروعة والمفاجأة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "The film is about a man who dies at minute 85 and his brother is the killer.",
        correct: "No spoilers, but the plot twists will keep you on the edge of your seat!",
        whyAr: 'حرق الأحداث يفسد متعة الحوار؛ حافظ دائماً على التشويق دون ذكر النهايات.'
      }
    ],
    speakingChallenge: {
      promptAr: 'رشح لسارة عملاً درامياً أو وثائقياً أعجبك مؤخراً واشرح فكرته باختصار دون حرق!',
      promptEn: 'Recommend a show to Sara and share why it hooked you without dropping spoilers!',
      saraQuestionAr: "I'm looking for a gripping show to watch this Friday evening. Got any recommendations?",
      saraQuestionEn: "I'm looking for a gripping show to watch this Friday evening. Got any recommendations?",
      recommendedResponseEn: "You should definitely watch Inception! It revolves around dream heists, and without giving any spoilers, the concept is mind-bending!"
    },
    quiz: [
      {
        questionAr: 'ما المصطلح الذي يصف مشاهدة عدة حلقات من مسلسل في جلسة واحدة متواصلة؟',
        questionEn: 'What term describes watching multiple TV episodes back-to-back in one sitting?',
        options: [
          "Binge-watching",
          "Slow viewing",
          "Fast acting",
          "Single streaming"
        ],
        correctIndex: 0,
        explanationAr: 'مصطلح "Binge-watching" يعني المشاهدة الماراثونية لعدة حلقات متتالية.'
      }
    ],
    whiteboardNotes: {
      title: 'Film & Pop Culture Talk',
      pointsAr: [
        '1. الفكرة: It revolves around [الفكرة العامة]',
        '2. المشاهدة المتتابعة: Binge-watching (ماراثون مشاهدة)',
        '3. الحرق: Spoilers (حرق الأحداث)',
        '4. التشويق: Keeps you on the edge of your seat!'
      ],
      pointsEn: [
        '1. Premise: "It revolves around [Concept]"',
        '2. Habit: "Binge-watching" (marathon viewing)',
        '3. Warning: "No spoilers, but..."',
        '4. Suspense: "Keeps you on the edge of your seat"'
      ],
      chalkHighlight: 'It revolves around... ➡️ No spoilers! ➡️ Blew my mind'
    }
  },
  {
    id: 'sc_220',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تقديم الملاحظات البناءة والنقد المشجع (Constructive Feedback & Mentorship)',
    titleEn: 'Delivering Constructive Feedback: The Feedback Sandwich Technique',
    descAr: 'كيف تنتقد عمل زميل أو صديق وتقدم نصيحة تطويرية بأسلوب يحفزه ولا يجرح مشاعره.',
    descEn: 'Give actionable, empathetic peer feedback using positive-constructive-positive framing.',
    speakingGoalAr: 'تقديم ملاحظة تطويرية لسارة على مسودة تقرير باستخدام تقنية الشطيرة (Sandwich).',
    speakingGoalEn: 'Deliver constructive critique balancing genuine praise with actionable areas for growth.',
    keyPattern: {
      ruleAr: 'تقنية الشطيرة: 1) مديح حقيقي لنقطة قوة 2) الملاحظة التطويرية المقترحة 3) ختام تشجيعي يعزز الثقة.',
      ruleEn: 'The Feedback Sandwich: Genuine praise ➡️ Actionable improvement ➡️ Inspiring encouragement.',
      formula: "What I loved is [Strength]. One area to level up is [Refinement]. Overall, fantastic work!"
    },
    practicalExamples: [
      {
        en: "Your presentation had incredible energy and great visual design.",
        ar: 'كان عرضك التقديمي مفعماً بالطاقة والتصميم البصري الرائع.',
        spokenNoteAr: 'البداية بتقدير الجهد الصادق تبني جسر تقبل الملاحظات.'
      },
      {
        en: "One area where we could sharpen the narrative is simplifying the data slides on page 4.",
        ar: 'إحدى النقاط التي يمكننا تعزيز الحبكة فيها هي تبسيط شرائح البيانات في الصفحة الرابعة.',
        spokenNoteAr: 'لاحظ استخدام we could sharpen بدلاً من you made a mistake.'
      },
      {
        en: "Overall, you're on a fantastic trajectory, and I'm confident the clients will love it.",
        ar: 'في المحصلة الشاملة، أنت تسير على مسار رائع، وأنا واثق تماماً أن العملاء سينبهرون به.',
        spokenNoteAr: 'ختام دافئ يعطي دفعة معنوية هائلة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "This report is terrible and full of mistakes.",
        correct: "The core ideas are solid; let's refine the formatting to make the key takeaways pop.",
        whyAr: 'الهجوم المباشر يولد الدفاعية والعناد؛ التوجيه الذكي يبني الإبداع والتعاون.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة أعدت لك خطة تدريب صوتي. أثنِ عليها واقترح إضافة تدريب إضافي على التنفس!',
      promptEn: 'Give Sara constructive feedback on her practice plan using the sandwich method!',
      saraQuestionAr: 'I designed a new 10-minute daily speaking drill for us! How does it look to you?',
      saraQuestionEn: 'I designed a new 10-minute daily speaking drill for us! How does it look to you?',
      recommendedResponseEn: "I love how practical the drills are! One small tweak: adding 30 seconds of breath control at the start would make it even more powerful. Fantastic work overall!"
    },
    quiz: [
      {
        questionAr: 'ما المبدأ الأساسي في تقنية "Feedback Sandwich" لتقديم الملاحظات؟',
        questionEn: 'What is the core principle of the Feedback Sandwich technique?',
        options: [
          "Offer food before talking about business.",
          "Sandwich the constructive critique between two genuine positive affirmations.",
          "Never mention any mistakes at all.",
          "Only criticize without praising."
        ],
        correctIndex: 1,
        explanationAr: 'تقنية الشطيرة تعتمد على وضع الملاحظة النقدية في المنتصف بين نقطتي مديح وتشجيع حقيقي.'
      }
    ],
    whiteboardNotes: {
      title: 'The Constructive Feedback Formula',
      pointsAr: [
        '1. الخبز الأول: مديح حقيقي لنقطة قوة (I loved how you...)',
        '2. الحشوة: الملاحظة بلغة الشراكة (One area we could sharpen is...)',
        '3. الخبز الثاني: تشجيع واثق بالمستقبل (Overall, truly impressive work!)',
        'الهدف: التطوير والتحفيز، لا الإحباط'
      ],
      pointsEn: [
        '1. Top bun: Genuine specific praise ("What worked really well was...")',
        '2. The meat: Collaborative growth ask ("One thing we could polish...")',
        '3. Bottom bun: Uplifting encouragement ("Overall, tremendous effort!")',
        'Inspires excellence without triggering defensiveness'
      ],
      chalkHighlight: 'Genuine Praise ➡️ Actionable Refinement ➡️ Inspiring Encouragement'
    }
  },
  {
    id: 'sc_221_m',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'الاعتذار الراقي وتصحيح الأخطاء المهنية (Graceful Apologies & Owning Mistakes)',
    titleEn: 'Radical Accountability: Apologizing Gracefully Without Excuses',
    descAr: 'كيف تعتذر عن خطأ في العمل بوقار وشجاعة ودون اختلاق أعذار واهية، وقدم خطة تصحيحية فورية.',
    descEn: 'Apologize for slip-ups with executive poise: own the impact, skip the excuses, and fix it.',
    speakingGoalAr: 'الاعتذار لسارة عن تأخر تسليم تقرير وتقديم حل تعويضي فوري دون تبريرات.',
    speakingGoalEn: 'Deliver an unreserved professional apology with immediate corrective action.',
    keyPattern: {
      ruleAr: 'ثلاثية الاعتذار القيادي: 1) الاعتراف المباشر (I apologize unreservedly) 2) تحمل المسؤولية (That is on me) 3) خطة التصحيح الفورية (Here is how I am resolving it).',
      ruleEn: 'The 3-Step Apology: Acknowledge mistake directly ➡️ Take personal ownership ➡️ State corrective action.',
      formula: "I sincerely apologize for the oversight. That was entirely on me. Here is how I'm fixing it..."
    },
    practicalExamples: [
      {
        en: "I sincerely apologize for the delay on this report; that was entirely on me and my oversight.",
        ar: 'أعتذر بصدق عن التأخير في هذا التقرير؛ كان ذلك خطئي وتقصيري بالكامل.',
        spokenNoteAr: 'That was on me تعبير يعكس شجاعة وتحمل مسؤولية يبني ثقة فورية.'
      },
      {
        en: "I've already updated the draft and implemented extra checks to ensure this won't happen again.",
        ar: 'لقد قمت بالفعل بتحديث المسودة ووضعت تدقيقات إضافية لضمان عدم تكرار هذا الأمر ثانية.',
        spokenNoteAr: 'تقديم الحل قبل أن يطلبه منك المدير يقلب الخطأ إلى إشادة بمهنيتك.'
      },
      {
        en: "Thank you for bringing this to my attention; I will personally see to it that it's completed by 3 PM.",
        ar: 'شكراً لتنبيهي إلى هذه النقطة؛ سأحرص شخصياً على إتمامها بحلول الساعة الثالثة عصراً.',
        spokenNoteAr: 'I will personally see to it تعهد شخصي حاسم.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Making 10 defensive excuses: 'It was the traffic, my computer broke, and John didn't tell me'.",
        correct: "Skip all excuses. Own the mistake boldly and focus 100% of your energy on the remedy.",
        whyAr: 'الأعذار الكثيرة تبدو طفولية؛ الاعتراف الشجاع هو سمة القادة والمهنيين الكبار.'
      }
    ],
    speakingChallenge: {
      promptAr: 'تأخرت 10 دقائق عن اجتماع مع سارة! اعتذر باحترافية ودون تبريرات وابدأ جدول الأعمال فوراً!',
      promptEn: 'You joined Sara’s meeting 10 minutes late. Apologize with poise and pivot to the agenda!',
      saraQuestionAr: 'Hey! We were waiting for you to kick off our scheduled project review.',
      saraQuestionEn: 'Hey! We were waiting for you to kick off our scheduled project review.',
      recommendedResponseEn: "I sincerely apologize for keeping you waiting, Sara. That was my oversight. I appreciate your patience, and I'm ready to dive straight into item one."
    },
    quiz: [
      {
        questionAr: 'ما التعبير الاصطلاحي الذي يعني "هذا خطئي وأنا أتحمل مسؤوليته الكاملة" في بيئة العمل؟',
        questionEn: 'Which idiom translates to taking complete personal ownership for an error?',
        options: [
          "That was on me.",
          "That was on the floor.",
          "That was flying.",
          "That was under the table."
        ],
        correctIndex: 0,
        explanationAr: 'تعبير "That was on me" هو التعبير الأكثر استخداماً وقوة للاعتراف بالمسؤولية الشخصية عن الخطأ.'
      }
    ],
    whiteboardNotes: {
      title: 'The Executive Apology Formula',
      pointsAr: [
        '1. الاعتذار الصريح: I sincerely apologize for the delay',
        '2. شجاعة المسؤولية: That was entirely on me (بدون أعذار!)',
        '3. الحل الفوري: Here is how I am resolving it right now',
        '4. الضمان المستقبلي: Steps taken to prevent recurrence'
      ],
      pointsEn: [
        '1. Direct Apology: "I apologize unreservedly"',
        '2. Ownership: "That is completely on me"',
        '3. Immediate Remedy: Corrective action already underway',
        '4. Future proof: Process adjusted so it never recurs'
      ],
      chalkHighlight: 'I Apologize ➡️ That Was On Me ➡️ Immediate Remedy'
    }
  },

  // ==========================================
  // ADVANCED LEVEL (C1) - Lessons 21 to 30
  // ==========================================
  {
    id: 'sc_203',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'تحدي التحدث المرتجل دون تحضير لمدة دقيقتين (Impromptu Flow)',
    titleEn: 'Two-Minute Impromptu Speech Under Zero Pressure',
    descAr: 'كيف ترتب أفكارك ذهنياً وتتحدث بانسيابية عندما يسألك شخص سؤالاً غير متوقع دون توقف أو صمت طويل.',
    descEn: 'Structure unscripted thoughts instantly using the PREP formula.',
    speakingGoalAr: 'التحدث لمدة دقيقة كاملة مع سارة حول موضوع مفاجئ باستخدام هيكل PREP.',
    speakingGoalEn: 'Deliver a coherent 60-second spontaneous response using Point-Reason-Example-Point.',
    keyPattern: {
      ruleAr: 'هيكل PREP السريع: P (Point الفكرة الأساسية) ➡️ R (Reason السبب) ➡️ E (Example مثال واقعي) ➡️ P (Point تأكيد الفكرة).',
      ruleEn: 'The PREP Framework keeps your unscripted speech structured and fluid.',
      formula: 'Point ➡️ Reason ➡️ Example ➡️ Wrap-up Point'
    },
    practicalExamples: [
      {
        en: "To give you my quick take on remote work: I believe flexibility boosts output.",
        ar: 'لأعطيك رأيي السريع في العمل عن بعد: أؤمن أن المرونة ترفع الإنتاجية.',
        spokenNoteAr: 'Point: البداية المباشرة التي تحدد موقفك.'
      },
      {
        en: "The main reason is that people waste zero energy on daily rush hour traffic.",
        ar: 'السبب الأساسي هو أن الناس لا يهدرون طاقتهم في زحام السير اليومي.',
        spokenNoteAr: 'Reason: تعليل منطقي قوي في جملة واحدة.'
      },
      {
        en: "For instance, our team completed the project two weeks earlier when working from home.",
        ar: 'على سبيل المثال، فريقنا أكمل المشروع قبل أسبوعين من موعده عند العمل من البيت.',
        spokenNoteAr: 'Example: مثال يدعم الحجة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Thinking in complete silence for 20 seconds before answering.",
        correct: "Use a filler: 'That's a fascinating question, let me break it down...'",
        whyAr: 'استخدم عبارة تمهيدية لشراء وقت تفكير بدلاً من الصمت المربك.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة ستسألك سؤالاً مفاجئاً! خذ ثانية وابدأ بهيكل PREP!',
      promptEn: 'Sara will drop a surprise question. Tackle it using PREP!',
      saraQuestionAr: 'If you could master any single skill overnight, what would it be and why?',
      saraQuestionEn: 'If you could master any single skill overnight, what would it be and why?',
      recommendedResponseEn: "I would definitely choose public speaking. The reason is that communication drives everything in life. For example, great leaders inspire millions simply with their words. So mastering that would be life-changing!"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني حروف استراتيجية PREP في الحديث المرتجل؟',
        questionEn: 'What does the PREP speaking framework stand for?',
        options: [
          "Plan - Read - Edit - Publish",
          "Point - Reason - Example - Point",
          "Practice - Repeat - Echo - Perfect",
          "Pause - Relax - Enjoy - Proceed"
        ],
        correctIndex: 1,
        explanationAr: 'حروف PREP ترمز إلى: Point (الفكرة) ثم Reason (السبب) ثم Example (المثال) ثم Point (تأكيد الفكرة).'
      }
    ],
    whiteboardNotes: {
      title: 'The PREP Impromptu Framework',
      pointsAr: [
        'P = Point: اطرح فكرتك الأولى في جملة واحدة',
        'R = Reason: اذكر السبب المقنع (The main reason is...)',
        'E = Example: اضرب مثالاً واقعياً (For instance...)',
        'P = Point: أعد تأكيد فكرتك (That is why...)'
      ],
      pointsEn: [
        'P = Point: State your main thesis clearly',
        'R = Reason: Why do you believe this?',
        'E = Example: Give a real-world story or data',
        'P = Point: Summarize with punchy conclusion'
      ],
      chalkHighlight: 'P (Point) ➡️ R (Reason) ➡️ E (Example) ➡️ P (Point)'
    }
  },
  {
    id: 'sc_222',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'التعامل مع الأسئلة المحرجة والمستفزة (Handling Hostile Questions & The Bridging Technique)',
    titleEn: 'Defusing Hostile Questions: The Art of the Conversational Bridge',
    descAr: 'كيف تمتص الأسئلة المحرجة في المؤتمرات واللقاءات الإعلامية وتعيد توجيه دفة الحديث نحو رسالتك.',
    descEn: 'Defuse aggressive questions and steer back to your core message using media bridging.',
    speakingGoalAr: 'امتصاص سؤال حاد من سارة وإعادة التوجيه بسلاسة بعبارة The core issue here is...',
    speakingGoalEn: 'Acknowledge a confrontational question and bridge smoothly to your key narrative.',
    keyPattern: {
      ruleAr: 'تقنية الجسر (Bridging): 1) امتصاص السؤال دون انفعال (That is a fair concern) 2) وضع الجسر (However, what matters most is) 3) تقديم رسالتك.',
      ruleEn: 'The Bridging Formula: Acknowledge emotion ➡️ Deploy bridge phrase ➡️ Deliver core strategic truth.',
      formula: 'I hear your concern, but the broader question we should be asking is + [Core Message]'
    },
    practicalExamples: [
      {
        en: "I understand why that looks challenging on the surface; however, the real driver behind this decision is long-term stability.",
        ar: 'أتفهم تماماً لماذا يبدو هذا الأمر صعباً من الظاهر؛ ولكن المحرك الحقيقي وراء هذا القرار هو الاستقرار بعيد المدى.',
        spokenNoteAr: 'امتصاص هادئ يحول الدفة من الشكوى السطحية إلى الاستراتيجية العميقة.'
      },
      {
        en: "That's certainly one perspective, but let's look at what the underlying data actually demonstrates.",
        ar: 'هذه بالتأكيد إحدى وجهات النظر، ولكن دعونا ننظر إلى ما توضحه البيانات الأساسية في الواقع.',
        spokenNoteAr: 'جسر تحويلي ينقل النقاش من العواطف إلى الأرقام.'
      },
      {
        en: "While that was true in the past, what we are seeing today is fundamentally different.",
        ar: 'بينما كان ذلك صحيحاً في الماضي، إلا أن ما نراه اليوم مختلف اختلافاً جوهرياً.',
        spokenNoteAr: 'فصل ذكي بين الماضي والحاضر.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Getting defensive, raising your voice, or yelling 'That's a stupid question!'.",
        correct: "Never validate the aggression; calmly pivot to the broader objective.",
        whyAr: 'الانفعال في الرد يثبت التهمة عليك؛ الهدوء والتحويل الذكي يظهر هيبتك القيادية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تطرح سؤالاً مشككاً في جدولك الزمني! امتص التشكيك واجسر نحو التزام الفريق!',
      promptEn: 'Sara challenges your project timeline aggressively. Bridge smoothly to your quality focus!',
      saraQuestionAr: "Isn't your team severely falling behind schedule on this release?",
      saraQuestionEn: "Isn't your team severely falling behind schedule on this release?",
      recommendedResponseEn: "I appreciate the scrutiny on timing; however, what matters most is delivering an uncompromised, bug-free product that our users can trust."
    },
    quiz: [
      {
        questionAr: 'ما وظيفة "عبارة الجسر" (Bridge phrase) في مواجهة الأسئلة المستفزة؟',
        questionEn: 'What is the strategic purpose of a "Bridge phrase" in high-stakes Q&A?',
        options: [
          "To end the conversation immediately.",
          "To pivot smoothly from the questioner's trap to your positive core message.",
          "To insult the speaker.",
          "To avoid answering any questions forever."
        ],
        correctIndex: 1,
        explanationAr: 'وظيفة عبارة الجسر هي تحويل النقاش بمرونة من الفخ المستفز إلى رسالتك الإيجابية الأساسية.'
      }
    ],
    whiteboardNotes: {
      title: 'Media Training: The Bridging Bridge',
      pointsAr: [
        '1. الامتصاص: I understand why that question arises...',
        '2. الجسر: Having said that, the real priority is...',
        '3. الرسالة: We are laser-focused on value creation.',
        'القاعدة: لا تقبل بتأطير الخصم، بل أعد تأطير المشهد بنفسك!'
      ],
      pointsEn: [
        '1. Acknowledge: "I understand that sentiment..."',
        '2. The Bridge: "However, what is vital to recognize is..."',
        '3. The Anchor: "Our priority remains delivering excellence."',
        'Never accept the opponent’s negative frame'
      ],
      chalkHighlight: 'Acknowledge ➡️ Deploy Bridge ➡️ Deliver Core Narrative'
    }
  },
  {
    id: 'sc_223',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'التفاوض على الراتب وحزم المزايا الوظيفية (Salary Negotiation & Total Compensation)',
    titleEn: 'Executive Compensation: Anchoring Value & Counter-Offering with Gravitas',
    descAr: 'كيف تتفاوض على راتبك، والمكافآت، وأيام الإجازة بثقة ووقار دون تردد أو خوف من خسارة العرض.',
    descEn: 'Negotiate salary packages and executive perks professionally based on proven ROI.',
    speakingGoalAr: 'تقديم عرض مقابل (Counter-offer) لسارة مبني على القيمة السوقية والنتائج المتوقعة.',
    speakingGoalEn: 'Make an evidence-backed counteroffer for compensation with executive poise.',
    keyPattern: {
      ruleAr: 'معادلة التفاوض الراقي: الشكر على العرض ➡️ ربط الزيادة بالقيمة السوقية ومخرجاتك ➡️ طرح نطاق سعري مرن (Range).',
      ruleEn: 'The Value Anchor: Express excitement ➡️ anchor against market benchmark ➡️ offer a range with flexibility.',
      formula: "I'm thrilled about the offer. Based on my track record and industry benchmarks, I was targeting [Range]."
    },
    practicalExamples: [
      {
        en: "I'm genuinely excited about joining the mission. Based on the scope of the role and my track record, I was targeting something in the range of 120k to 130k.",
        ar: 'أنا متحمس بصدق للانضمام إلى هذه الرسالة. وبناءً على نطاق هذا الدور وسجلي من الإنجازات، كنت أستهدف نطاقاً بين 120 إلى 130 ألفاً.',
        spokenNoteAr: 'نبرة هادئة وواثقة تبرر الرقم بالقيمة والمسؤولية.'
      },
      {
        en: "If the base salary is fixed, is there flexibility around equity vesting, sign-on bonus, or remote work stipends?",
        ar: 'إذا كان الراتب الأساسي ثابتاً، فهل تتوفر مرونة حول أسهم الشركة، أو مكافأة التوقيع، أو بدلات العمل عن بعد؟',
        spokenNoteAr: 'توسيع طاولة المفاوضات ليشمل حزمة المزايا الشاملة (Total compensation).'
      },
      {
        en: "Could we meet in the middle at 115k with a performance review milestone at six months?",
        ar: 'هل يمكننا الوصول لحل وسط عند 115 ألفاً مع تحديد محطة لمراجعة الأداء بعد ستة أشهر؟',
        spokenNoteAr: 'اقتراح ذكي يربط الزيادة بإثبات الجدارة السريع.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "I need more money because my rent is expensive and I have debts.",
        correct: "Based on the market value of driving this level of growth, the target range is...",
        whyAr: 'الشركات لا تدفع بناءً على فواتيرك الشخصية، بل بناءً على القيمة الاقتصادية التي تضيفها لأرباحهم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة قدمت لك عرض عمل. اشكرها واطلب زيادة 10% بناءً على خبرتك القيادية في مجالك!',
      promptEn: 'Sara made a job offer. Express appreciation and counter for a 10% adjustment!',
      saraQuestionAr: "We are thrilled to offer you the role at 90,000 annually. How does that sound to you?",
      saraQuestionEn: "We are thrilled to offer you the role at 90,000 annually. How does that sound to you?",
      recommendedResponseEn: "Thank you so much, Sara! I'm really excited. Given the expanded scope of this team, I was hoping to target around 100k. Is there room for discussion there?"
    },
    quiz: [
      {
        questionAr: 'ما المبرر الأكثر احترافية وقبولاً عند التفاوض على زيادة الراتب؟',
        questionEn: 'What is the most compelling argument during a salary counteroffer?',
        options: [
          "Personal bills and shopping desires.",
          "Market benchmarks and measurable business impact you bring to the table.",
          "Threatening to post negative reviews on social media.",
          "Asking what other employees make."
        ],
        correctIndex: 1,
        explanationAr: 'المبرر الاحترافي الأقوى هو القيمة السوقية والإنجازات القابلة للقياس التي تحققها للشركة.'
      }
    ],
    whiteboardNotes: {
      title: 'The Compensation Negotiation Playbook',
      pointsAr: [
        '1. الامتنان والترحيب: I\'m truly enthusiastic about the team.',
        '2. الربط بالقيمة: Based on market data and the scope...',
        '3. النطاق: I was targeting a range of [X] to [Y].',
        '4. المزايا البديلة: Equity, Sign-on bonus, Flexible hours'
      ],
      pointsEn: [
        '1. Genuine enthusiasm for the mission',
        '2. Anchor in market benchmark & ROI',
        '3. Always propose a targeted range, not a rigid number',
        '4. Expand the pie: Equity, bonus, remote stipends'
      ],
      chalkHighlight: 'Enthusiasm ➡️ Value Benchmark ➡️ Targeted Range'
    }
  },
  {
    id: 'sc_224',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'إدارة الأزمات وتهدئة العميل الغاضب (Crisis Management & Calming an Irate Stakeholder)',
    titleEn: 'De-escalation Masterclass: Calming Furious Stakeholders and Rebuilding Trust',
    descAr: 'كيف تمتص غضب عميل ثائر، وتبدي تعاطفاً حقيقياً، وتقدم خطة حل عاجلة تحول الأزمة إلى ولاء.',
    descEn: 'Master high-stakes de-escalation: extreme empathy, radical accountability, and rapid action.',
    speakingGoalAr: 'امتصاص غضب سارة (عميلة غاضبة بسبب تعطل النظام) وتقديم خطة طوارئ في 45 ثانية.',
    speakingGoalEn: 'De-escalate an upset client using empathetic acknowledgment and a decisive 3-step fix.',
    keyPattern: {
      ruleAr: 'ثلاثية امتصاص الغضب (The EAR Method): E (Empathy تعاطف كامل) ➡️ A (Accountability تحمل المسؤولية دون تبرير) ➡️ R (Resolution حل فوري بموعد محدد).',
      ruleEn: 'The EAR Framework: Empathy (validate distress) ➡️ Accountability (own the fix) ➡️ Resolution (concrete next steps).',
      formula: "I completely hear your frustration. You have every right to be upset. Here is our immediate action plan..."
    },
    practicalExamples: [
      {
        en: "I completely understand how critical this outage is for your operations, and you have every right to be frustrated.",
        ar: 'أتفهم تماماً مدى خطورة هذا العطل على عملياتكم التشغيلية، ومعك كل الحق في أن تشعر بالاستياء البالغ.',
        spokenNoteAr: 'validate the emotion: الاعتراف بحقه في الغضب يمتص 80% من التوتر فوراً.'
      },
      {
        en: "We are not making excuses; our engineering leads are personally handling this right now.",
        ar: 'نحن لا نختلق أي أعذار؛ قادة الهندسة لدينا يتعاملون مع هذا الأمر شخصياً في هذه اللحظة.',
        spokenNoteAr: 'تحمل المسؤولية بشجاعة يبعث على الاحترام الفوري.'
      },
      {
        en: "I will personally send you a status update every 30 minutes until we are 100% operational.",
        ar: 'سأرسل لك شخصياً تقريراً محدثاً كل 30 دقيقة حتى تعود الأنظمة للعمل بنسبة 100%.',
        spokenNoteAr: 'تحديد موعد تواصل ثابت يعيد الأمان للعميل.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Telling an angry person: 'Calm down, it's not our fault, read the terms of service'.",
        correct: "Never say 'Calm down'! Acknowledge their urgency and outline immediate containment steps.",
        whyAr: 'كلمة Calm down تزيد الغضب اشتعالاً؛ التعاطف والحل العملي هما الترياق الوحيد.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تتصل غاضبة جداً بسبب تأخر بيانات مهمة! طبق نموذج EAR لتهدئتها واعرض خطة حل!',
      promptEn: 'Sara is furious over missing critical reports. Apply EAR to de-escalate and reassure her!',
      saraQuestionAr: "This delay is unacceptable! Our whole launch is blocked and nobody contacted us!",
      saraQuestionEn: "This delay is unacceptable! Our whole launch is blocked and nobody contacted us!",
      recommendedResponseEn: "You are completely right, Sara, and I sincerely apologize for the breakdown in communication. I am personally auditing the data now and will deliver the report to you by 2 PM."
    },
    quiz: [
      {
        questionAr: 'ما أسوأ عبارة يمكن أن تقولها لعميل غاضب في ذروة انفعاله؟',
        questionEn: 'What is the absolute worst phrase to utter to an enraged customer?',
        options: [
          "Calm down and relax.",
          "I hear your frustration completely.",
          "Here is what we are doing to fix this right away.",
          "Let me take personal ownership of this."
        ],
        correctIndex: 0,
        explanationAr: 'قول "Calm down" لغاضب يقلل من مشاعره ويزيد الأزمة اشتعالاً؛ يجب استبدالها بالتعاطف الصادق.'
      }
    ],
    whiteboardNotes: {
      title: 'The EAR Crisis Protocol',
      pointsAr: [
        '1. Empathy: You have every right to feel upset.',
        '2. Accountability: We own this issue, zero excuses.',
        '3. Resolution: Here is what happens in the next 15 minutes.',
        'قاعدة ذهبية: لا تقل قط "Calm down"!'
      ],
      pointsEn: [
        '1. Empathy: Validate their real pain and impact',
        '2. Accountability: Zero defensiveness, full ownership',
        '3. Resolution: Concrete timeline and direct reporting',
        'Golden Rule: Never say "Calm down"!'
      ],
      chalkHighlight: 'Empathy (Hear them) ➡️ Accountability (Own it) ➡️ Rapid Resolution'
    }
  },
  {
    id: 'sc_225',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'سرد القصص وعروض المستثمرين عالية التأثير (High-Stakes Investor Pitching)',
    titleEn: 'Pitching to Investors: The Narrative Arc of Problem, Solution & Vision',
    descAr: 'كيف تقدم فكرة مشروعك لرجال الأعمال والمستثمرين بقصة مشوقة تحرك العاطفة والأرقام معاً.',
    descEn: 'Master the 3-minute venture pitch: acute market pain, unfair advantage, and market scale.',
    speakingGoalAr: 'إلقاء عرض موجز لمشروعك لسارة (مستثمرة جريئة) في 60 ثانية يشرح المشكلة والحل.',
    speakingGoalEn: 'Deliver a compelling 60-second elevator pitch covering problem, traction, and vision.',
    keyPattern: {
      ruleAr: 'هيكل عرض المستثمر: 1) الألم الحقيقي في السوق 2) ميزتنا التنافسية غير العادلة 3) المؤشرات والنمو 4) حجم السوق المستهدف.',
      ruleEn: 'The Pitch Architecture: Visceral Pain Point ➡️ Proprietary Solution ➡️ Traction Metric ➡️ Scalable Vision.',
      formula: "We solve [Acute Pain] for [Target Users] by providing [Unique Solution], already growing at [Traction]."
    },
    practicalExamples: [
      {
        en: "Every year, millions of language learners waste thousands of hours memorizing grammar rules they can never use in real speech.",
        ar: 'كل عام، يهدر ملايين متعلمي اللغات آلاف الساعات في حفظ قواعد لن يستخدموها أبداً في المحادثة الحقيقية.',
        spokenNoteAr: 'تجسيد الألم الواقعي بوضوح لشد انتباه المستثمر.'
      },
      {
        en: "We bridge that exact gap by turning theoretical knowledge into instinctive reflex through interactive AI mentoring.",
        ar: 'نحن نسد تلك الفجوة بالتحديد عبر تحويل المعرفة النظرية إلى ردود فعل تلقائية من خلال التوجيه بالذكاء الاصطناعي.',
        spokenNoteAr: 'طرح الحل الفريد كجسر سحري يحل المعاناة.'
      },
      {
        en: "In just six months, we've achieved 85% monthly retention with organic word-of-mouth growth.",
        ar: 'في غضون ستة أشهر فقط، حققنا نسبة استبقاء شهرية بلغت 85% بنمو عضوي يعتمد على التوصيات.',
        spokenNoteAr: 'الأرقام والمؤشرات (Traction) هي لغة المستثمرين المفضلة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Spending 5 minutes talking about coding algorithms and zero minutes talking about customer pain and revenue.",
        correct: "Investors invest in market appetite and strong teams, not just code snippets.",
        whyAr: 'المستثمر يبحث عن حجم السوق، وقابلية التوسع، وقوة الفريق التجاري.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة مستثمرة جريئة! قدم لها فكرة منصة تعليمية ذكية في 60 ثانية واختم بطلب استثماري واضح!',
      promptEn: 'Pitch an interactive learning platform to Sara with clear problem, solution, and traction!',
      saraQuestionAr: "You've got 60 seconds before my next board meeting. What is your venture and why should I care?",
      saraQuestionEn: "You've got 60 seconds before my next board meeting. What is your venture and why should I care?",
      recommendedResponseEn: "Adult learners struggle with conversational confidence. We solve this through real-time voice AI coaching, seeing 80% weekly retention. We are scaling into regional markets!"
    },
    quiz: [
      {
        questionAr: 'ما العنصر الأكثر إقناعاً للمستثمر في عرض فكرة المشروع بعد طرح المشكلة؟',
        questionEn: 'What is the most persuasive proof point in an early-stage startup pitch?',
        options: [
          "The color of the logo.",
          "Measurable traction (active users, retention, or revenue).",
          "The number of coffee machines in the office.",
          "Long theoretical essays."
        ],
        correctIndex: 1,
        explanationAr: 'مؤشرات الإنجاز الحقيقية (Traction) مثل نمو المستخدمين والاستبقاء هي البرهان الأقوى للمستثمرين.'
      }
    ],
    whiteboardNotes: {
      title: 'The Venture Pitch Arc',
      pointsAr: [
        '1. المشكلة: The burning pain point in the market',
        '2. الحل الفريد: Our secret sauce / proprietary tech',
        '3. الأدلة: Traction, retention, and growth metrics',
        '4. الرؤية: The multi-billion dollar market opportunity'
      ],
      pointsEn: [
        '1. The Pain: Acute, universal friction',
        '2. The Solution: Defensible, scalable differentiator',
        '3. Traction: Hard metrics proving real engagement',
        '4. The Ask & Vision: Why now, and how big can it become?'
      ],
      chalkHighlight: 'Visceral Pain ➡️ Proprietary Solution ➡️ Hard Traction'
    }
  },
  {
    id: 'sc_226',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'الذكاء الثقافي والتواصل عالي وسياق التواصل المنخفض (Cross-Cultural Fluency & Context)',
    titleEn: 'Cross-Cultural Fluency: High-Context vs Low-Context Communication',
    descAr: 'كيف تترجم الفروق الثقافية بين الصراحة الغربية المباشرة واللباقة الدبلوماسية في بيئات العمل العالمية.',
    descEn: 'Navigate direct vs indirect feedback cultures seamlessly in multinational teams.',
    speakingGoalAr: 'شرح فكرة لمشروع عالمي تراعي الفروق الثقافية في التواصل والاتفاق.',
    speakingGoalEn: 'Adapt communication style from direct to indirect cultural frameworks.',
    keyPattern: {
      ruleAr: 'في الثقافات عالية السياق (High-context) يُقرأ المعنى بين السطور، بينما في الثقافات منخفضة السياق (Low-context كأمريكا وألمانيا) يُقال كل شيء بصراحة تامة.',
      ruleEn: 'Bridge the cultural gap: clarify explicit expectations with low-context peers; preserve face and harmony with high-context partners.',
      formula: "To ensure we are completely aligned across cultures: [Explicit Clarification with Warmth]"
    },
    practicalExamples: [
      {
        en: "To ensure absolute clarity across our international teams, let me summarize our agreed next steps in writing.",
        ar: 'لضمان الوضوح التام بين فرقنا الدولية، اسمحوا لي بتلخيص خطواتنا القادمة المتفق عليها كتابياً.',
        spokenNoteAr: 'توثيق الخطوات يزيل أي سوء فهم ناتج عن اختلاف الثقافات.'
      },
      {
        en: "In our partner's culture, silence often signifies deep contemplation rather than hesitation or disagreement.",
        ar: 'في ثقافة شريكنا، غالباً ما يدل الصمت على التأمل العميق وليس على التردد أو الاعتراض.',
        spokenNoteAr: 'فهم الصمت كإشارة احترام وليس جموداً.'
      },
      {
        en: "Could we double-check if this timeline feels achievable from your local market perspective?",
        ar: 'هل يمكننا التأكد معاً مما إذا كان هذا الجدول الزمني يبدو قابلاً للتنفيذ من واقع سوقكم المحلي؟',
        spokenNoteAr: 'سؤال يحترم خصوصية السوق المحلي دون فرض وصاية.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Assuming that a nodding head always means 'Yes, I agree and will sign the contract'.",
        correct: "In many cultures, nodding simply means 'I am listening respectfully', not legal agreement.",
        whyAr: 'في ثقافات كثيرة، هز الرأس يعني "أنا أسمعك باحترام" وليس بالضرورة الموافقة على العرض.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة شريكة أعمال يابانية. اشرح لها مقترحك بأسلوب يحترم بناء الثقة أولاً قبل العقود!',
      promptEn: 'Frame a business proposal to Sara respecting high-context relationship building!',
      saraQuestionAr: 'We value long-term partnership deeply before jumping into contract specifics. How do you approach this?',
      saraQuestionEn: 'We value long-term partnership deeply before jumping into contract specifics. How do you approach this?',
      recommendedResponseEn: "We completely share that philosophy. For us, establishing mutual trust and understanding your team's values is the true foundation of any lasting agreement."
    },
    quiz: [
      {
        questionAr: 'في بيئات العمل منخفضة السياق (Low-context كالولايات المتحدة وألمانيا)، كيف يفضلون التواصل؟',
        questionEn: 'How do low-context communication cultures typically convey business messages?',
        options: [
          "Directly, explicitly, and in writing with zero ambiguity.",
          "Using subtle metaphors and silence only.",
          "Without ever signing contracts.",
          "Exclusively through poetry."
        ],
        correctIndex: 0,
        explanationAr: 'الثقافات منخفضة السياق تفضل الصراحة التامة، والوضوح المباشر، وتوثيق كل التفاصيل كتابياً.'
      }
    ],
    whiteboardNotes: {
      title: 'Cross-Cultural Communication Bridge',
      pointsAr: [
        '1. منخفض السياق (Low-context): مباشر، صريح، كتابي (أمريكا، ألمانيا، بريطانيا)',
        '2. عالي السياق (High-context): غير مباشر، العلاقات أولاً، قراءة ما بين السطور (الشرق الأوسط، اليابان)',
        '3. القائد العالمي: يتكيف مع ثقافة شريكه دون تصادم'
      ],
      pointsEn: [
        '1. Low-Context: Explicit, literal, task-oriented (US, Germany)',
        '2. High-Context: Relational, nuanced, face-preserving (Japan, Middle East)',
        '3. Global leader adjusts communication code with empathy'
      ],
      chalkHighlight: 'Direct Clarity 🤝 Respectful Nuance ➡️ Global Harmony'
    }
  },
  {
    id: 'sc_227',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'إدارة وتوجيه الجلسات الحوارية والمناظرات (Moderating Panel Discussions)',
    titleEn: 'Panel Moderation: Guiding Debates, Balancing Airtime & Audience Q&A',
    descAr: 'كيف تدير ندوة أو جلسة نقاش، وتوزع الوقت بعدالة بين المتحدثين، وتلخص المداخلات ببراعة.',
    descEn: 'Command a panel stage: introduce experts, distribute speaking time, and synthesize Q&A.',
    speakingGoalAr: 'افتتاح جلسة نقاش مع سارة كمتحدثة خبيرة وتوجيه سؤال عميق لها مع إدارة الوقت.',
    speakingGoalEn: 'Moderate a dynamic panel segment, balancing expert insights and time constraints.',
    keyPattern: {
      ruleAr: 'قالب الميسر الذكي: 1) إرساء الموضوع 2) تمرير الكرة لمتحدث معين بالاسم 3) تلخيص الفكرة وربطها بالمتحدث التالي.',
      ruleEn: 'The Moderator Protocol: Frame theme ➡️ Direct question to designated panelist ➡️ Synthesize and pivot to next speaker.',
      formula: "[Panelist Name], picking up on that point: How do you see [Challenge] impacting [Industry]?"
    },
    practicalExamples: [
      {
        en: "Let's bring Sarah into the conversation: Sarah, from an engineering perspective, how do you tackle this bottleneck?",
        ar: 'دعونا نشرك سارة في الحوار: سارة، من منظور هندسي، كيف تواجهون عنق الزجاجة هذا؟',
        spokenNoteAr: 'Let\'s bring [Name] into the conversation أسلوب قيادي لإشراك المتحدث بهدوء.'
      },
      {
        en: "In the interest of time, let's keep our closing remarks to 30 seconds each, starting with Dr. Mark.",
        ar: 'حرصاً على الوقت المتاح، فلنحصر ملاحظاتنا الختامية في 30 ثانية لكل متحدث، ونبدأ مع الدكتور مارك.',
        spokenNoteAr: 'In the interest of time عبارة مهذبة وحاسمة لضبط الوقت دون إحراج أحد.'
      },
      {
        en: "That brings us neatly to our next theme: sustainable scaling.",
        ar: 'هذا يقودنا بسلاسة تامة إلى محورنا التالي: التوسع المستدام.',
        spokenNoteAr: 'ربط أفكار المتحدث بالمحور اللاحق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "The moderator speaking 80% of the time and giving panelists only 20%.",
        correct: "A great moderator is a generous conductor: shine the spotlight on your panelists.",
        whyAr: 'دور الميسر هو إبراز الضيوف وقيادة الوقت وليس الاستئثار بالحديث.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أنت تدير جلسة حوارية في مؤتمر! قدم سارة كخبيرة ذكاء اصطناعي واطرح عليها أول سؤال!',
      promptEn: 'Moderate a panel: Introduce Sara and direct an insightful first question to her!',
      saraQuestionAr: 'Good morning moderator! Our audience is seated and eager to begin. The floor is yours!',
      saraQuestionEn: 'Good morning moderator! Our audience is seated and eager to begin. The floor is yours!',
      recommendedResponseEn: "Welcome everyone! Today we examine the future of conversational AI. Sara, as our leading specialist, what single shift excites you most this year?"
    },
    quiz: [
      {
        questionAr: 'ما أفضل عبارة دبلوماسية يستخدمها ميسر الجلسة لتذكير المتحدث بالالتزام بالوقت دون إحراجه؟',
        questionEn: 'Which diplomatic transition best reminds a panelist to wrap up without causing offense?',
        options: [
          "Shut up, your time is over!",
          "In the interest of time and giving everyone equal voice, could we hear your closing takeaway?",
          "Nobody wants to listen to you.",
          "I am cutting your mic."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "In the interest of time..." تضبط الوقت باحترام ومساواة بين المتحدثين.'
      }
    ],
    whiteboardNotes: {
      title: 'Panel Moderation Playbook',
      pointsAr: [
        '1. الافتتاح: Welcome everyone, our theme today is...',
        '2. توجيه السؤال: Let\'s bring [الاسم] into this discussion...',
        '3. ضبط الوقت: In the interest of time, let\'s move to...',
        '4. الربط: That connects neatly to our next theme!'
      ],
      pointsEn: [
        '1. Stage setting: "Welcome, our focus today is..."',
        '2. Passing the mic: "Let\'s bring [Name] in on this..."',
        '3. Timekeeping: "In the interest of time..."',
        '4. Synthesis: "That leads neatly into our next topic"'
      ],
      chalkHighlight: 'Set the Frame ➡️ Spotlight Experts ➡️ Synthesize & Pivot'
    }
  },
  {
    id: 'sc_228',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'مناظرة السياسات والمعضلات الأخلاقية (Debating Dilemmas & Complex Trade-offs)',
    titleEn: 'Ethical Dilemmas: Weighing Trade-offs & Articulating Principles Under Scrutiny',
    descAr: 'كيف تناقش قضايا شائكة (كالذكاء الاصطناعي، الخصوصية، والبيئة) بعقلانية فلسفية وموازنة دقيقة.',
    descEn: 'Debate high-stakes ethical trade-offs calmly, acknowledging multifaceted complexities.',
    speakingGoalAr: 'مناقشة معضلة التوفيق بين سرعة الابتكار وضمانات الخصوصية مع سارة.',
    speakingGoalEn: 'Weigh ethical trade-offs between rapid innovation and data privacy protections.',
    keyPattern: {
      ruleAr: 'في مناظرة المعضلات: لا توجد حلول سحرية، بل مقايضات (Trade-offs): اعترف بالجانبين ➡️ بيّن الكلفة الأخلاقية ➡️ اطرح معيار الحوكمة المتزن.',
      ruleEn: 'The Trade-off Framework: Frame as a balance ➡️ examine second-order consequences ➡️ propose principled guardrails.',
      formula: "We are balancing two competing virtues: [Virtue A] and [Virtue B]. The key lies in establishing transparent guardrails."
    },
    practicalExamples: [
      {
        en: "This isn't a simple binary of right versus wrong; it's a nuanced trade-off between speed to market and safety protocols.",
        ar: 'هذه ليست مسألة ثنائية بسيطة بين صح وخطأ؛ بل هي موازنة دقيقة بين سرعة الوصول للسوق ومعايير السلامة.',
        spokenNoteAr: 'nuanced trade-off تعبير فكري ناضج يرفض التسطيح.'
      },
      {
        en: "If we prioritize absolute privacy at all costs, we may inadvertently stall life-saving medical breakthroughs.",
        ar: 'إذا وضعنا الخصوصية المطلقة كأولوية بأي ثمن، فقد نعطل عن غير قصد ابتكارات طبية تنقذ الأرواح.',
        spokenNoteAr: 'inadvertently تعني عن غير قصد أو دون تعمد.'
      },
      {
        en: "Where we must draw the line is on non-consensual biometric tracking.",
        ar: 'النقطة التي يجب أن نضع عندها حداً فاصلاً وحازماً هي التتبع البيومتري دون موافقة مسبقة.',
        spokenNoteAr: 'draw the line تعبير اصطلاحي شهير يعني وضع حد أخلاقي صارم.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Saying 'The solution is super easy, just ban everything!'.",
        correct: "Acknowledge the competing values and explore secondary consequences thoughtfully.",
        whyAr: 'المعضلات الأخلاقية الكبرى لا تحل بالشعبوية البسيطة؛ النضج الفكري يكمن في وزن التبعات.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تناقشك: هل يجب حظر أدوات الذكاء الاصطناعي في المدارس أم دمجها؟ ناقش الموازنة!',
      promptEn: 'Debate AI in education with Sara: Weigh cheating risks against future workforce skills!',
      saraQuestionAr: 'Should schools completely ban AI to prevent cheating, or mandate it in the curriculum?',
      saraQuestionEn: 'Should schools completely ban AI to prevent cheating, or mandate it in the curriculum?',
      recommendedResponseEn: "Banning it ignores reality. Instead, we must redesign assessments to test original critical thinking while teaching students ethical AI literacy."
    },
    quiz: [
      {
        questionAr: 'ما التعبير الإنجليزي الاصطلاحي الذي يعني "وضع حد فاصل لا يمكن تجاوزه أخلاقياً"؟',
        questionEn: 'Which idiom means to establish a strict boundary of acceptable behavior?',
        options: [
          "Draw the line",
          "Cut the cake",
          "Color the box",
          "Erase the road"
        ],
        correctIndex: 0,
        explanationAr: 'تعبير "Draw the line" يعني وضع حد فاصل صارم لا يجوز تخطيه.'
      }
    ],
    whiteboardNotes: {
      title: 'Ethical Debate Architecture',
      pointsAr: [
        '1. رفض التسطيح: It is not a binary choice',
        '2. الموازنة: A nuanced trade-off between X and Y',
        '3. التبعات غير المقصودة: Second-order consequences',
        '4. الحد الفاصل: Where we must draw the line'
      ],
      pointsEn: [
        '1. Reject false binaries: "It is not purely black and white"',
        '2. Frame as trade-offs: "Competing priorities"',
        '3. Foresee ripple effects: "Inadvertent consequences"',
        '4. Moral anchor: "Draw the line"'
      ],
      chalkHighlight: 'Not a binary choice ➡️ Nuanced trade-off ➡️ Principled guardrails'
    }
  },
  {
    id: 'sc_229',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'الهيبة والحضور القيادي في الاجتماعات الافتراضية (Executive Gravitas in Hybrid Boardrooms)',
    titleEn: 'Commanding Hybrid Meetings: Vocal Variety, Intentional Pauses & Screen Gravitas',
    descAr: 'كيف تفرض هيبتك واحترامك عبر الكاميرا والمايك في الاجتماعات الكبرى دون الحاجة لرفع صوتك.',
    descEn: 'Project unshakeable executive presence in Zoom/Teams boardrooms through pacing and pauses.',
    speakingGoalAr: 'إلقاء بيان افتتاحي حاسم في اجتماع افتراضي باستخدام الوقفات الصامتة المقصودة.',
    speakingGoalEn: 'Demonstrate vocal authority, controlled pacing, and pregnant pauses in a virtual executive briefing.',
    keyPattern: {
      ruleAr: 'الهيبة الصوتية القيادية: 1) إبطاء الإيقاع بنسبة 15% 2) استخدام الوقفات الصامتة بدلاً من الهمهمات (um, uh) 3) خفض النبرة في نهاية الجملة (Downward inflection).',
      ruleEn: 'The Gravitas Formula: Slow pace by 15% ➡️ embrace silent pauses over filler sounds ➡️ land statements with downward pitch.',
      formula: 'Lower pitch + 1-second silence before core takeaway ➡️ Downward terminal contour'
    },
    practicalExamples: [
      {
        en: "Team... [intentional pause]... our goal this quarter is not merely to compete. Our goal is to set the new industry standard.",
        ar: 'فريق العمل... [وقفة صامتة محسوبة]... هدفنا في هذا الربع ليس مجرد المنافسة، بل وضع المعيار الجديد للصناعة بأكملها.',
        spokenNoteAr: 'الوقفة الصامتة لمدة ثانية تجعل كل شخص يرفع عينيه إلى الشاشة فوراً.'
      },
      {
        en: "Let that sink in for a moment before we discuss implementation.",
        ar: 'دعوا هذه الحقيقة تستقر في أذهانكم للحظة قبل أن نشرع في مناقشة التنفيذ.',
        spokenNoteAr: 'Let that sink in عبارة قيادية عميقة تمنح الفكرة وزناً استثنائياً.'
      },
      {
        en: "I want to be unequivocally clear on this priority.",
        ar: 'أريد أن أكون واضحاً وضوحاً لا لبس فيه ولا غموض بشأن هذه الأولوية.',
        spokenNoteAr: 'unequivocally clear تعبر عن حزم قاطع وثقة مطلقة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Speaking ultra-fast with high pitch and ending sentences like questions (Up-talk)?",
        correct: "Ground your voice, pause boldly, and end with downward authority.",
        whyAr: 'رفع النبرة في نهاية الجملة يجعلك تبدو كمن يطلب الإذن أو يشكك في نفسه.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تحضر معك اجتماعاً تنفيذياً. ألقِ بياناً حاسماً باستخدام وقفة صامتة واختم بنبرة هابطة!',
      promptEn: 'Deliver a decisive executive directive to Sara using an intentional pause!',
      saraQuestionAr: 'We are facing a fork in the road on this project. What is your final decision?',
      saraQuestionEn: 'We are facing a fork in the road on this project. What is your final decision?',
      recommendedResponseEn: "We stay the course. [Pause] Quality is non-negotiable, and our reputation depends entirely on this standard."
    },
    quiz: [
      {
        questionAr: 'ما التكتيك الصوتي الأكثر فاعلية لإظهار الهيبة القيادية عند التحدث في الاجتماعات؟',
        questionEn: 'Which vocal habit most effectively conveys executive gravitas?',
        options: [
          "Speaking as fast as possible without breathing.",
          "Using deliberate silent pauses instead of filler words (um, uh) and landing with a downward inflection.",
          "Whispering constantly.",
          "Interrupting everyone every ten seconds."
        ],
        correctIndex: 1,
        explanationAr: 'استخدام الوقفات الصامتة المتعمدة والنبرة الهابطة الحازمة يعكس ثقة مطلقة وهيبة قيادية.'
      }
    ],
    whiteboardNotes: {
      title: 'Executive Presence Blueprint',
      pointsAr: [
        '1. الوقفة الصامتة المتعمدة (The Power Pause) تقتل التلعثم والـ "اممم"',
        '2. النبرة الهابطة (Downward Inflection) تؤكد أن كلامك حقيقة وليس سؤالاً',
        '3. عبارة العمق: Let that sink in for a moment...',
        '4. الهدوء = القوة والسلطة الحقيقية'
      ],
      pointsEn: [
        '1. The Power Pause replaces filler words with authority',
        '2. Downward inflection turns statements into definitive facts',
        '3. Gravitas marker: "Let that sink in..."',
        '4. Calmness equals commanded respect'
      ],
      chalkHighlight: 'Intentional Pause ➡️ Grounded Voice ➡️ Downward Inflection'
    }
  },
  {
    id: 'sc_230',
    pillarId: 'conversation',
    pillarNameAr: 'المحادثة والطلاقة التفاعلية',
    pillarNameEn: 'Active Conversation & Fluency Drills',
    pillarIcon: '💬',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'التوجيه القيادي وطرح الأسئلة التحولية (Executive Coaching & The GROW Model)',
    titleEn: 'Transformational Mentorship: The GROW Coaching Model & Powerful Questions',
    descAr: 'كيف توجه زملاءك وتدربهم على إيجاد الحلول بأنفسهم باستخدام الأسئلة المفتوحة العميقة.',
    descEn: 'Coach leaders and mentees using the GROW framework: Goal, Reality, Options, Will.',
    speakingGoalAr: 'إجراء جلسة توجيه (Coaching) لسارة ومساعدتها على اكتشاف خياراتها بنموذج GROW.',
    speakingGoalEn: 'Facilitate a mentoring dialogue using open, transformative coaching inquiries.',
    keyPattern: {
      ruleAr: 'نموذج GROW التوجيهي: 1) Goal (ما الهدف؟) 2) Reality (ما الواقع الفعلي الآن؟) 3) Options (ما الخيارات المتاحة؟) 4) Will (ما خطوتك الأولى؟).',
      ruleEn: 'The GROW Coaching Framework: Goal ➡️ Current Reality ➡️ Exploration of Options ➡️ Way Forward / Will.',
      formula: "What does success look like for you here? What is currently within your direct control?"
    },
    practicalExamples: [
      {
        en: "If you could fast-forward six months and this issue was resolved, what would success look like?",
        ar: 'لو قفزنا بالزمن ستة أشهر للأمام وحُلت هذه المشكلة تماماً، فكيف سيبدو النجاح في نظرك؟',
        spokenNoteAr: 'سؤال رؤية ملهم (Goal) يخرج المتحدث من التفكير في المشكلة إلى التفكير في النتيجة.'
      },
      {
        en: "What part of this equation is completely within your direct span of control?",
        ar: 'ما هو الجزء في هذه المعادلة الذي يقع بالكامل تحت نطاق سيطرتك المباشرة؟',
        spokenNoteAr: 'سؤال الواقع (Reality) يركز الطاقة على ما يمكن تغييره بدلاً من الشكوى.'
      },
      {
        en: "What is the single highest-leverage action you can take before this Friday?",
        ar: 'ما هو الإجراء المفرد ذو الأثر الأكبر الذي يمكنك القيام به قبل يوم الجمعة هذا؟',
        spokenNoteAr: 'سؤال الالتزام (Way forward) يحول الفكرة إلى خطوة عملية عاجلة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Immediately telling the person: 'Here is what you must do: Step 1, Step 2'.",
        correct: "A coach doesn't give answers; a coach asks powerful questions that help them discover their own path.",
        whyAr: 'التوجيه القيادي يبني استقلالية التفكير والمسؤولية الذاتية، بينما إعطاء الأوامر يكرس الاتكالية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تشعر بالحيرة بين مسارين مهنيين! وجه لها سؤال كوتشينغ ملهم يساعدها على اتخاذ القرار!',
      promptEn: 'Sara is torn between two career choices. Ask her a powerful coaching question!',
      saraQuestionAr: "I'm torn between leading a technical team or focusing on product design. How should I decide?",
      saraQuestionEn: "I'm torn between leading a technical team or focusing on product design. How should I decide?",
      recommendedResponseEn: "Looking ahead five years: which of those two paths brings you closer to the legacy you want to build?"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني حروف نموذج الكوتشينغ العالمي الشهير GROW؟',
        questionEn: 'What do the four letters in the GROW coaching model stand for?',
        options: [
          "Get - Read - Open - Win",
          "Goal - Reality - Options - Will (or Way Forward)",
          "Great - Real - Old - Wise",
          "Generate - Review - Order - Write"
        ],
        correctIndex: 1,
        explanationAr: 'نموذج GROW يرمز إلى: Goal (الهدف)، Reality (الواقع)، Options (الخيارات)، Will/Way Forward (الإرادة والخطوة القادمة).'
      }
    ],
    whiteboardNotes: {
      title: 'The GROW Coaching Arc',
      pointsAr: [
        'G = Goal: What do you truly want to achieve?',
        'R = Reality: What is happening right now, objectively?',
        'O = Options: What choices do you have on the table?',
        'W = Will: What will you do, and by when?'
      ],
      pointsEn: [
        'G = Goal: "What does optimal success look like?"',
        'R = Reality: "What is within your direct control today?"',
        'O = Options: "What alternative paths could we explore?"',
        'W = Will: "What is your committed first milestone?"'
      ],
      chalkHighlight: 'Goal ➡️ Reality ➡️ Options ➡️ Will to Act'
    }
  }
];
