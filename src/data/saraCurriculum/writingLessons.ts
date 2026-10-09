import { SaraCurriculumLesson } from './types';

export const SARA_CONVERSATIONAL_WRITING_LESSONS: SaraCurriculumLesson[] = [
  // ==========================================
  // STARTER LEVEL (A1-A2) - Lessons 1 to 10
  // ==========================================
  {
    id: 'scw_401',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'كتابة الرسائل السريعة والمحادثات اليومية (Modern Chat & Quick Texts)',
    titleEn: 'Texting Like a Native: Quick Chats, Slang & Modern Etiquette',
    descAr: 'كيف تراسل أصدقاءك وزملاءك في واتساب وسلاك بأسلوب شبابي رشيق ومختصر ومفهوم دون لغة رسمية متحجرة.',
    descEn: 'Write breezy, engaging messages for WhatsApp, Slack, and social interactions.',
    speakingGoalAr: 'كتابة رسالة شات من 3 أسطر لسارة لترتيب موعد أو لقاء سريع.',
    speakingGoalEn: 'Craft a relaxed, natural 3-line chat message to plan a coffee meetup.',
    keyPattern: {
      ruleAr: 'في الشات الإنجليزي الحديث، نستخدم اختصارات ذكية وعبارات عفوية مثل: Up to you (على راحتك)، Down for that (أنا جاهز ومتحمس)، Shoot me a text (راسلني).',
      ruleEn: 'Conversational messaging uses energetic contractions and warm idioms.',
      formula: '[Casual Salutation] + [Quick Suggestion] + [Are you down for that?]'
    },
    practicalExamples: [
      {
        en: "Hey! Are you free for a quick coffee run this afternoon? Totally up to you!",
        ar: 'أهلاً! هل عندك وقت نطلع نشرب قهوة سريعة اليوم؟ الأمر راجع لك تماماً!',
        spokenNoteAr: 'coffee run تعبير خفيف يعني نطلع نجيب قهوة.'
      },
      {
        en: "I'm totally down for that. Just shoot me the location whenever!",
        ar: 'أنا جاهز ومتحمس جداً لذلك. فقط أرسل لي الموقع في أي وقت!',
        spokenNoteAr: 'down for that تعني موافق ومتحمس للمقترح.'
      },
      {
        en: "Running a bit behind schedule, be there in 10 mins!",
        ar: 'متأخر قليلاً عن الموعد، سأكون عندك خلال 10 دقائق!',
        spokenNoteAr: 'Running behind تعبير مهذب للاعتذار عن التأخير الخفيف.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing ultra-formal letters in a casual WhatsApp chat: 'Dear Sir, I am writing to inform you...'",
        correct: "Keep it warm and direct: 'Hey Sarah, hope you're having a good one!'",
        whyAr: 'الرسائل الفورية اليومية تتطلب لغة حية ودافئة وليس خطابات رسمية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة رسالة شات سريعة تدعوها فيها لاجتماع قهوة ومناقشة مشروعك الجديد!',
      promptEn: 'Send Sara a quick chat text inviting her to discuss your project over coffee!',
      saraQuestionAr: 'Drop me a quick text to set up our next coffee chat! What would you say?',
      saraQuestionEn: 'Drop me a quick text to set up our next coffee chat! What would you say?',
      recommendedResponseEn: "Hey Sara! Are you free for a quick coffee tomorrow? Would love to pick your brain on a new project!"
    },
    quiz: [
      {
        questionAr: 'ما المعنى التحدثي للعبارة الشائعة في الشات "I\'m down for that"؟',
        questionEn: 'What does "I\'m down for that" mean in casual text messages?',
        options: [
          "I am feeling sad and depressed.",
          "I am interested and happy to join!",
          "I am falling down on the floor.",
          "I refuse the idea completely."
        ],
        correctIndex: 1,
        explanationAr: 'تعبير "I\'m down" يعني: أنا موافق ومتحمس جداً للمشاركة.'
      }
    ],
    whiteboardNotes: {
      title: 'Modern Chatting Toolkit',
      pointsAr: [
        '1. Down for that = جاهز ومتحمس للمقترح',
        '2. Up to you = القرار لك / على راحتك',
        '3. Shoot me a text = أرسل لي رسالة سريعة',
        '4. Running a bit behind = متأخر قليلاً'
      ],
      pointsEn: [
        '1. "Down for that" = Eager & onboard',
        '2. "Up to you" = Your call',
        '3. "Shoot me a text" = Message me',
        '4. "Running behind" = Slight delay'
      ],
      chalkHighlight: "Hey! Down for coffee? Up to you! ☕"
    }
  },
  {
    id: 'scw_404',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'إتيكيت المحادثات في سلاك وواتساب (Slack & WhatsApp Etiquette)',
    titleEn: 'Slack & Teams Chat Etiquette: Reactions, Threads & Punchy Replies',
    descAr: 'كيف تتواصل مع فريق العمل في قنوات الدردشة باحترافية: متى تستخدم الإيموجي، وكيف ترد في الثريد دون إزعاج الجميع.',
    descEn: 'Communicate effectively in remote team chats: use threads, reactions, and clear status updates.',
    speakingGoalAr: 'كتابة رد احترافي في سلاك لسارة يؤكد استلام المهمة والبدء بها فوراً.',
    speakingGoalEn: 'Craft a crisp Slack acknowledgment using modern business chat conventions.',
    keyPattern: {
      ruleAr: 'في بيئة العمل الحديثة: لا ترسل "Hello" وتنتظر دقائق، بل اكتب التحية والطلب في رسالة واحدة متكاملة (One-message rule).',
      ruleEn: 'The One-Message Rule: Never just send "Hi" alone; combine greeting + context + request in one concise bubble.',
      formula: 'Hey [Name], [Context in one sentence] + [Specific Ask] + Thanks!'
    },
    practicalExamples: [
      {
        en: "Hey Sarah! Quick question on the pitch deck: where can I find the latest slide numbers? Thanks!",
        ar: 'أهلاً سارة! سؤال سريع بخصوص العرض التقديمي: أين أجد أحدث أرقام الشرائح؟ شكراً!',
        spokenNoteAr: 'رسالة واحدة متكاملة توفر وقت الجميع دون انتظار مريب.'
      },
      {
        en: "On it! Will share the draft in this thread by 3 PM. 👍",
        ar: 'أنا على رأس الأمر الآن! سأشارك المسودة في هذا الثريد بحلول الثالثة عصراً. 👍',
        spokenNoteAr: 'On it تعني بدأت التنفيذ فوراً؛ عبارة مفضلة لدى المدراء.'
      },
      {
        en: "Heads up team: jumping into a deep-work block until noon, ping me for emergencies only.",
        ar: 'تنبيه سريع يا فريق: سأنعزل في جلسة عمل عميق حتى الظهيرة، راسلوني للطوارئ فقط.',
        spokenNoteAr: 'Heads up تعني تنبيه ودي وسريع.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Typing 'Hi' and waiting 10 minutes until the other person replies 'Hi' back.",
        correct: "Send your greeting and request together in a single polite message.",
        whyAr: 'إرسال "Hi" وحدها يشتت الزملاء ويضيع الوقت؛ قاعدة سلاك الذهبية هي جمع الطلب مع التحية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة أرسلت لك ملفاً في شات العمل. اكتب لها رداً يؤكد استلامه ومراجعته اليوم!',
      promptEn: 'Sara dropped a project file in Slack. Write a crisp confirmation message!',
      saraQuestionAr: "Hey! Just shared the Q3 review file. Let me know when you can look it over!",
      saraQuestionEn: "Hey! Just shared the Q3 review file. Let me know when you can look it over!",
      recommendedResponseEn: "Got it, thanks Sara! On it right now—will review and drop my notes in this thread by 4 PM. 👍"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني عبارة "On it!" الشائعة جداً في محادثات العمل السريعة؟',
        questionEn: 'What does "On it!" mean in professional team chat messaging?',
        options: [
          "I am sitting on the computer.",
          "I am actively taking care of this task right now.",
          "I refuse to do this work.",
          "I am sleeping on the desk."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "On it!" تعني: "أنا أتولى هذه المهمة وأعمل عليها الآن فوراً".'
      }
    ],
    whiteboardNotes: {
      title: 'Remote Chat Golden Rules',
      pointsAr: [
        '1. قاعدة الرسالة الواحدة: لا ترسل "Hi" وحدها أبداً!',
        '2. عبارة التنفيذ: "On it!" = جاري التنفيذ الآن',
        '3. التنبيه السريع: "Heads up team..."',
        '4. استخدام الردود في الثريد (Threads) للحفاظ على ترتيب القناة'
      ],
      pointsEn: [
        '1. No Hello-only messages (One-message rule)',
        '2. "On it!" = I am actively executing now',
        '3. "Heads up" = Friendly advance notice',
        '4. Keep clutter off main channels by replying in threads'
      ],
      chalkHighlight: 'Hey [Name] + Context + Ask in ONE bubble! 💬'
    }
  },
  {
    id: 'scw_405',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'كتابة قوائم المهام والملاحظات الذاتية (Actionable To-Do Lists in English)',
    titleEn: 'Writing Actionable Daily To-Do Lists with High-Impact Verbs',
    descAr: 'كيف تكتب مهامك اليومية بالإنجليزية باستخدام أفعال حركة قوية تجعل إنجازك أسرع وتنظم عقلك.',
    descEn: 'Stop writing passive notes: master punchy imperative verbs for personal task management.',
    speakingGoalAr: 'كتابة قائمة من 3 مهام يومية لسارة باستخدام أفعال حركة واضحة مثل Draft و Follow up و Review.',
    speakingGoalEn: 'Draft a 3-item daily action list using strong imperative action verbs.',
    keyPattern: {
      ruleAr: 'في كتابة المهام: ابدأ دائماً بفعل أمر مباشر (Action Verb) + المفعول به + الموعد المحدد (Deadline).',
      ruleEn: 'The Action-Item Formula: [Strong Action Verb] + [Clear Deliverable] + [Time Anchor / Owner].',
      formula: '[Action Verb: Draft / Review / Sync / Finalize] + [Deliverable] by [Time]'
    },
    practicalExamples: [
      {
        en: "• Follow up with the design lead regarding logo revisions by 2 PM.",
        ar: '• متابعة الأمر مع مسؤول التصميم بخصوص تعديلات الشعار قبل الساعة 2 ظهراً.',
        spokenNoteAr: 'Follow up with تعبير مهني شهير يعني المتابعة مع شخص.'
      },
      {
        en: "• Draft the outline for the speaking workshop.",
        ar: '• صياغة المسودة الأولية لمحاور ورشة التحدث.',
        spokenNoteAr: 'Draft تعني يكتب مسودة أولية.'
      },
      {
        en: "• Schedule a 15-minute sync with Sarah for tomorrow morning.",
        ar: '• جدولة اجتماع تنسيقي مدته 15 دقيقة مع سارة لصباح الغد.',
        spokenNoteAr: 'Sync تعني اجتماع تنسيق سريع ومختصر.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing vague nouns like 'Project' or 'Emails' on your task list.",
        correct: "Use clear action verbs: 'Send email to client' or 'Audit project timeline'.",
        whyAr: 'الكلمات العامة المبهمة تؤدي إلى التسويف؛ الأفعال المحددة تحفز العقل على الإنجاز الفوري.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة قائمة مهامك لليوم في 3 نقاط محددة تبدأ بأفعال حركة قوية!',
      promptEn: 'Share your 3-item English task list for today with Sara using strong action verbs!',
      saraQuestionAr: 'What does your priority list look like for today? Drop your top 3 tasks!',
      saraQuestionEn: 'What does your priority list look like for today? Drop your top 3 tasks!',
      recommendedResponseEn: "1. Practice 15 minutes of speaking drills. 2. Finalize my presentation slides. 3. Follow up with my team by 5 PM!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل طريقة لصياغة مهمة يومية في قائمة المهام لضمان إنجازها دون تسويف؟',
        questionEn: 'What is the most effective format for an actionable daily task item?',
        options: [
          "Just writing 'Work' with a question mark.",
          "Starting with a clear action verb: 'Review budget report by 3 PM'.",
          "Writing a 500-word paragraph.",
          "Leaving the notebook blank."
        ],
        correctIndex: 1,
        explanationAr: 'البدء بفعل أمر محدد وموعد إنجاز واضح (Action Verb + Deadline) يضمن الوضوح وسرعة التنفيذ.'
      }
    ],
    whiteboardNotes: {
      title: 'High-Impact Action Verbs for Lists',
      pointsAr: [
        'Draft (اكتب مسودة)',
        'Review / Audit (راجع / دقق)',
        'Follow up with (تابع مع شخص)',
        'Finalize / Wrap up (أنهِ وأغلق)',
        'Schedule / Sync (جدول موعداً)'
      ],
      pointsEn: [
        'Draft: Create initial copy/plan',
        'Follow up with: Check in on a pending item',
        'Finalize: Bring to 100% completion',
        'Sync: Quick alignment meeting'
      ],
      chalkHighlight: '[Action Verb] ➡️ [Deliverable] ➡️ [Deadline]'
    }
  },
  {
    id: 'scw_406',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'رسائل الشكر والامتنان الصادقة (Expressing Genuine Appreciation)',
    titleEn: 'Writing Warm Thank-You Notes Beyond "Thanks a lot"',
    descAr: 'كيف تشكر زميلاً أو معلماً أو صديقاً بكلمات دافئة تترك أثراً جميلاً في قلبه (Appreciate you, Means a lot).',
    descEn: 'Write heartfelt, personal notes of gratitude that strengthen relationships.',
    speakingGoalAr: 'كتابة رسالة شكر من جملتين لسارة على مساعدتها في تصحيح نطقك.',
    speakingGoalEn: 'Craft a sincere 2-sentence note of appreciation specifying what you are grateful for.',
    keyPattern: {
      ruleAr: 'معادلة الشكر الصادق: عبارة شكر دافئة ➡️ ذكر الشيء المحدد الذي فعله من أجلك ➡️ أثر ذلك عليك (Means a lot).',
      ruleEn: 'The Gratitude Arc: Thank warmly ➡️ cite specific helpful action ➡️ express personal impact.',
      formula: "Thanks so much for [Specific Help]! Really appreciate your time—it means a lot!"
    },
    practicalExamples: [
      {
        en: "Just wanted to say a huge thank you for your feedback today; it made such a difference!",
        ar: 'أردت فقط أن أتوجه لك بجزيل الشكر على ملاحظاتك اليوم؛ لقد صنعت فارقاً حقيقياً كبيراً!',
        spokenNoteAr: 'Just wanted to say افتتاحية رقيقة وعفوية للشكر.'
      },
      {
        en: "Really appreciate you taking the time to explain that. You're a lifesaver!",
        ar: 'ممتن لك حقاً لتخصيص وقتك لشرح ذلك. لقد أنقذت موقفي بحق!',
        spokenNoteAr: 'lifesaver تعبير مجازي لطيف يعني ساعدتني مساعدة مصيرية.'
      },
      {
        en: "Thanks a million for jumping in on short notice! Means the world.",
        ar: 'ألف شكر على تدخلك ومساعدتك في وقت ضيق! هذا يعني لي الكثير جداً.',
        spokenNoteAr: 'Means the world تعبير يعني أقدر هذا من أعماق قلبي.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Sending just 'thx' with no context to a mentor who spent an hour helping you.",
        correct: "Add one specific sentence mentioning what you learned or appreciated.",
        whyAr: 'تخصيص الشكر بذكر التفاصيل يبين صدقك وامتنانك الحقيقي.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة رسالة شكر دافئة تشكرها فيها على صبرها وتدريبها الصوتي معك اليوم!',
      promptEn: 'Draft a warm thank-you message to Sara for today’s speaking session!',
      saraQuestionAr: 'We wrapped up another great session today! How did it feel for you?',
      saraQuestionEn: 'We wrapped up another great session today! How did it feel for you?',
      recommendedResponseEn: "Huge thanks for your patience today, Sara! Your feedback on my sentence stress made a real difference—really appreciate you!"
    },
    quiz: [
      {
        questionAr: 'ما التعبير الاصطلاحي الذي يعني بالإنجليزية "لقد أنقذت موقفي بمساعدتك الكريمة"؟',
        questionEn: 'Which idiomatic praise translates to "You helped me out of a difficult spot"?',
        options: [
          "You are a lifesaver!",
          "You are a computer.",
          "You are swimming.",
          "You took my breath."
        ],
        correctIndex: 0,
        explanationAr: 'تعبير "You\'re a lifesaver!" هو التعبير الأكثر استخداماً للتعبير عن الامتنان لمن ساعدك في مأزق.'
      }
    ],
    whiteboardNotes: {
      title: 'Warm Gratitude Phrasebook',
      pointsAr: [
        '1. الشكر الحار: Huge thanks for [السبب]',
        '2. التقدير: Really appreciate your support',
        '3. الأثر: It made such a difference / Means a lot',
        '4. المديح: You\'re a lifesaver!'
      ],
      pointsEn: [
        '1. "Huge thanks for [Specific Thing]"',
        '2. "Really appreciate you taking the time"',
        '3. "It means a lot / Means the world"',
        '4. "You\'re a lifesaver!"'
      ],
      chalkHighlight: 'Thanks for [X] ➡️ Appreciate you ➡️ Means a lot! ❤️'
    }
  },
  {
    id: 'scw_407',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'كتابة تعليقات وسائل التواصل والكابشن (Social Media Captions & Comments)',
    titleEn: 'Social Media Writing: Punchy Captions, Emojis & Authentic Comments',
    descAr: 'كيف تكتب كابشن جذاباً لصورك في إنستغرام أو تعليقاً مشجعاً على منشورات أصدقائك بالإنجليزية دون تكلف.',
    descEn: 'Write breezy captions and genuine comments for Instagram, X, and personal feeds.',
    speakingGoalAr: 'كتابة كابشن لرحلة سفر أو إنجاز تعليمي في سطرين مفعمين بالحياة والطاقة.',
    speakingGoalEn: 'Compose a concise, engaging photo caption with natural phrasing and emojis.',
    keyPattern: {
      ruleAr: 'في كابشن الصور: سطر أول جذاب (The Hook) + تعليق شخصي خفيف + إيموجي معبر يكمل المعنى.',
      ruleEn: 'The Caption Formula: Visual hook ➡️ Personal sentiment ➡️ Complementary emoji.',
      formula: '[Visual Hook / City / Milestone] + [Fun Reflection] + ✨'
    },
    practicalExamples: [
      {
        en: "Golden hour walks in the old city. Nothing beats this stillness. 🌅✨",
        ar: 'جولات ساعة الغروب الذهبية في المدينة القديمة. لا شيء يضاهي هذا الهدوء. 🌅✨',
        spokenNoteAr: 'Golden hour مصطلح عالمي لساعة ما قبل غروب الشمس.'
      },
      {
        en: "One month into daily speaking practice, and the fear is officially gone! Proud moment. 🎙️🚀",
        ar: 'شهر كامل من الممارسة اليومية للتحدث، والخوف تبخر رسمياً! لحظة فخر. 🎙️🚀',
        spokenNoteAr: 'officially gone تعبير عفوي عن التخلص التام من الشيء.'
      },
      {
        en: "Spot on! Couldn't agree more with this perspective. 👏",
        ar: 'في الصميم تماماً! لا يمكنني الاتفاق أكثر من هذا مع وجهة نظرك. 👏',
        spokenNoteAr: 'Spot on تعليق ذكي على منشور يعني كلامك أصاب عين الحقيقة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing a dry essay of 300 words for a simple cup of coffee photo.",
        correct: "Keep it under two punchy sentences that match the mood of the moment.",
        whyAr: 'وسائل التواصل منصات بصرية وسريعة؛ الكابشن الرشيق يحظى بتفاعل أكبر بكثير.'
      }
    ],
    speakingChallenge: {
      promptAr: 'تخيل أنك نشرت صورة لك مع معلمتك سارة وأنت تنهي أحد المسارات! اكتب كابشن ملهماً!',
      promptEn: 'Draft an energetic caption celebrating completing your Sara speaking milestone!',
      saraQuestionAr: 'Imagine sharing our learning journey online! What caption would you post?',
      saraQuestionEn: 'Imagine sharing our learning journey online! What caption would you post?',
      recommendedResponseEn: "Leveling up my speaking game one daily session at a time with Sara! Fluency feels real now. 🎙️✨"
    },
    quiz: [
      {
        questionAr: 'ما المعنى الشائع للتعليق الشهير "Spot on!" على منشورات وسائل التواصل؟',
        questionEn: 'What does the social comment "Spot on!" mean?',
        options: [
          "You have a spot on your clothes.",
          "Completely accurate and exactly right!",
          "I disagree with you.",
          "Delete this post."
        ],
        correctIndex: 1,
        explanationAr: 'تعبير "Spot on!" يعني أصبت كبد الحقيقة وبدقة 100%.'
      }
    ],
    whiteboardNotes: {
      title: 'Social Captions & Comment Kit',
      pointsAr: [
        '1. الساعة الذهبية للغروب: Golden hour',
        '2. الاتفاق التام: Spot on! / Couldn\'t agree more',
        '3. الرحلة: One day at a time (خطوة بخطوة)',
        '4. الإيجاز والبهجة: الكابشن القصير هو الأجمل دائماً'
      ],
      pointsEn: [
        '1. "Golden hour" (sunset magic)',
        '2. "Spot on!" = Perfectly accurate',
        '3. "Couldn\'t agree more" = 100% agreement',
        '4. Brevity + energy + authentic emoji'
      ],
      chalkHighlight: 'Hook ➡️ Mood Reflection ➡️ Authentic Emoji ✨'
    }
  },
  {
    id: 'scw_408',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'رسائل الحالة والردود التلقائية للغياب (Out-of-Office & Status Updates)',
    titleEn: 'Writing Professional Out-of-Office (OOO) & Away Statuses',
    descAr: 'كيف تضع رسالة غياب أو إجازة في بريدك وسلاك تخبر المتصلين بموعد عودتك ومن يتواصلون معه في الطوارئ.',
    descEn: 'Draft clear, friendly Out-of-Office auto-replies and instant messenger status updates.',
    speakingGoalAr: 'كتابة رسالة رد تلقائي لإجازة العيد أو عطلة أسبوعية في 3 جمل محكمة.',
    speakingGoalEn: 'Write a professional Out-of-Office auto-responder with return date and emergency backup.',
    keyPattern: {
      ruleAr: 'قالب رسالة الغياب المهنية: فترة الغياب ➡️ موعد العودة المباشر ➡️ من يتواصلون معه في الحالات العاجلة.',
      ruleEn: 'The OOO Formula: Away window ➡️ exact return date ➡️ emergency alternate contact.',
      formula: "I'm currently away until [Date] with limited access to email. For urgent matters, please contact [Colleague]."
    },
    practicalExamples: [
      {
        en: "Thanks for reaching out! I'm currently out of the office on annual leave, returning on Monday, Oct 15th.",
        ar: 'شكراً لتواصلك! أنا حالياً خارج المكتب في إجازتي السنوية، وسأعود يوم الاثنين 15 أكتوبر.',
        spokenNoteAr: 'out of the office تختصر مهنياً إلى OOO.'
      },
      {
        en: "I'll have limited access to email while away and will respond as soon as I'm back.",
        ar: 'سيكون وصولي للبريد الإلكتروني محدوداً أثناء غيابي، وسأرد فور عودتي.',
        spokenNoteAr: 'limited access تضع توقعاً واقعياً بعدم انتظار رد فوري.'
      },
      {
        en: "For anything urgent, please feel free to loop in Khalid at khalid@example.com.",
        ar: 'لأي أمر طارئ، لا تتردد في التواصل مع الزميل خالد عبر البريد.',
        spokenNoteAr: 'loop in تعبير عملي يعني إشراك شخص في المراسلة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing 'I am on vacation, do not text me ever.'",
        correct: "Keep it professional: state your return date and provide a trusted team contact.",
        whyAr: 'رسالة الغياب يقرأها عملاء وشركاء؛ يجب أن تعكس احترامك للمصلحة العامة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة رسالة رد تلقائي تفيد بأنك في إجازة تدريبية حتى نهاية الأسبوع!',
      promptEn: 'Draft a friendly Out-of-Office auto-reply for your upcoming training week!',
      saraQuestionAr: 'I see you have an off-site training coming up. What will your auto-responder say?',
      saraQuestionEn: 'I see you have an off-site training coming up. What will your auto-responder say?',
      recommendedResponseEn: "Hi! I'm out of the office for a leadership workshop until Friday. I'll get back to you upon my return. For urgent requests, please contact my team lead."
    },
    quiz: [
      {
        questionAr: 'ماذا يعني الاختصار الشائع جداً "OOO" في بيئات العمل والبريد الإلكتروني؟',
        questionEn: 'What does the acronym "OOO" stand for in business messaging?',
        options: [
          "Out Of Office",
          "Out Of Order",
          "Only One Option",
          "Over Our Objective"
        ],
        correctIndex: 0,
        explanationAr: 'اختصار OOO يعني "Out Of Office" (خارج المكتب / في إجازة أو مهمة عمل).'
      }
    ],
    whiteboardNotes: {
      title: 'The Perfect OOO Auto-Reply',
      pointsAr: [
        '1. سبب وتاريخ الغياب: I am out of the office until [التاريخ]',
        '2. إمكانية الرد: Limited access to email',
        '3. البديل للطوارئ: For urgent inquiries, please contact [الاسم]',
        '4. الختام: I will respond upon my return'
      ],
      pointsEn: [
        '1. Clear dates: "Away from [Date] through [Date]"',
        '2. Expectation: "Limited connectivity"',
        '3. Backup: "For emergencies, please loop in [Name]"',
        '4. Professional warmth throughout'
      ],
      chalkHighlight: 'Dates Away ➡️ Limited Access ➡️ Emergency Backup Contact'
    }
  },
  {
    id: 'scw_409',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'كتابة تقييمات المنتجات والخدمات (Writing Authentic Product Reviews)',
    titleEn: 'Writing 5-Star Reviews: Praising Products & Services Naturally',
    descAr: 'كيف تكتب تقييماً ممتازاً لتطبيق، فندق، أو مطعم في أمازون أو جوجل بأسلوب مقنع ومفيد للقراء.',
    descEn: 'Write constructive, engaging positive online reviews that highlight specific features.',
    speakingGoalAr: 'كتابة تقييم من 3 أسطر لتطبيق أو مطعم مفضل يوضح ما يميزه بالضبط.',
    speakingGoalEn: 'Draft a short 5-star review citing usability, customer care, and a clear recommendation.',
    keyPattern: {
      ruleAr: 'معادلة التقييم الممتاز: الحكم العام (Game-changer) ➡️ ميزة محددة أذهلتك ➡️ التوصية النهائية للآخرين.',
      ruleEn: 'The Review Framework: Headline hook ➡️ Specific standout feature ➡️ Enthusiastic verdict.',
      formula: "Hands down the best [Product/Service]! What stood out most was [Feature]. Highly recommended!"
    },
    practicalExamples: [
      {
        en: "Hands down the best coffee shop in town! The cold brew is super smooth and the staff are incredibly welcoming. 5/5 stars!",
        ar: 'بلا منازع أفضل مقهى في المدينة! القهوة الباردة سلسة للغاية وطاقم العمل ودود جداً. 5 من 5 نجوم!',
        spokenNoteAr: 'Hands down تعبير يعني بلا أي منازع وبجدارة تامة.'
      },
      {
        en: "This app has been an absolute game-changer for my speaking confidence. Highly recommend it to any serious learner!",
        ar: 'هذا التطبيق كان نقطة تحول حقيقية (Game-changer) لثقتي في التحدث. أوصي به بشدة لأي متعلم جاد!',
        spokenNoteAr: 'game-changer تعبير شهير جداً للشيء الذي يحدث ثورة حقيقية في التجربة.'
      },
      {
        en: "Exceeded all my expectations! Fast shipping, immaculate packaging, and top-notch quality.",
        ar: 'فاق كل توقعاتي! شحن سريع، وتغليف ممتاز، وجودة من الدرجة الأولى.',
        spokenNoteAr: 'top-notch تعني من أعلى وأرقى المستويات.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing only 'Good' or 'Bad' without saying WHY.",
        correct: "Mention at least one concrete feature that made your experience memorable.",
        whyAr: 'التقييم المفيد هو الذي يوضح للمشترين سبب تميز المنتج بالتحديد.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب تقييماً من 3 أسطر لمنصة سارة التعليمية توضح فيه كيف ساعدتك على إطلاق لسانك!',
      promptEn: 'Draft a 3-sentence positive review for Sara Academy highlighting real-time speaking!',
      saraQuestionAr: 'If you reviewed our learning lab on an app store, what would your review highlight?',
      saraQuestionEn: 'If you reviewed our learning lab on an app store, what would your review highlight?',
      recommendedResponseEn: "Hands down the most engaging English mentor! The interactive speaking whiteboard turned my passive knowledge into real conversational reflexes. 5 stars!"
    },
    quiz: [
      {
        questionAr: 'ماذا يعني التعبير الاصطلاحي الشهير "Hands down" في تقييمات المنتجات؟',
        questionEn: 'What does the idiom "Hands down" signify in product reviews?',
        options: [
          "With hands on the floor.",
          "Without any doubt or contest (بلا منازع).",
          "Very cheap.",
          "Broken item."
        ],
        correctIndex: 1,
        explanationAr: 'تعبير "Hands down" يعني بلا أدنى شك وبلا منازع، ويستخدم عند تفضيل شيء كأفضل خيار مطلق.'
      }
    ],
    whiteboardNotes: {
      title: '5-Star Review Vocabulary',
      pointsAr: [
        '1. بلا منازع: Hands down the best...',
        '2. نقطة تحول كبرى: An absolute game-changer',
        '3. فاق التوقعات: Exceeded my expectations',
        '4. جودة رفيعة: Top-notch quality',
        '5. التوصية: Highly recommended!'
      ],
      pointsEn: [
        '1. "Hands down the best..." (Undisputed)',
        '2. "A game-changer" (Transformative)',
        '3. "Exceeded expectations"',
        '4. "Top-notch quality"',
        '5. "Cannot recommend this enough!"'
      ],
      chalkHighlight: 'Hands Down Best ➡️ Standout Feature ➡️ Highly Recommend'
    }
  },
  {
    id: 'scw_410',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'طرح الأسئلة السريعة في الشات دون مقاطعة (Asynchronous Team Questions)',
    titleEn: 'Asynchronous Inquiries: Asking Questions in Team Chats Politely',
    descAr: 'كيف تطرح سؤالاً على زميل أو مدير في الشات بأسلوب يتيح له الرد على مهل دون إحراج الاتصال المفاجئ.',
    descEn: 'Ask non-intrusive asynchronous questions respecting your colleagues’ focus time.',
    speakingGoalAr: 'كتابة سؤال مهني غير ملح لسارة في الشات مع توضيح أنه ليس عاجلاً.',
    speakingGoalEn: 'Pose a clear asynchronous question clarifying timeline with a "no-rush" courtesy marker.',
    keyPattern: {
      ruleAr: 'في الرسائل غير المتزامنة: اطرح السؤال بوضوح ➡️ أرفق الرابط أو السياق ➡️ أضف عبارة ترفع الضغط مثل (No rush at all / Whenever you have a second).',
      ruleEn: 'The Low-Pressure Ask: State question ➡️ attach reference link ➡️ add "No rush at all".',
      formula: 'Quick check-in when you have a second: [Specific Question]? (No rush at all!)'
    },
    practicalExamples: [
      {
        en: "Hey Sarah! Quick check-in when you have a free moment: do we have the final branding guidelines saved anywhere? No rush on this!",
        ar: 'أهلاً سارة! استفسار سريع عندما يتاح لك وقت: هل لدينا دليل الهوية البصرية النهائي محفوظاً في أي مكان؟ لا داعي للاستعجال إطلاقاً!',
        spokenNoteAr: 'No rush on this تزيل التوتر وتسمح لها بالرد عند فراغها.'
      },
      {
        en: "Do you happen to have five minutes this afternoon to glance over my draft? Totally fine if tomorrow works better.",
        ar: 'هل يتوفر لديك 5 دقائق بعد ظهر اليوم لإلقاء نظرة سريعة على مسودتي؟ لا بأس إطلاقاً إذا كان الغد يناسبك أكثر.',
        spokenNoteAr: 'إعطاء خيار الغد يظهر احترامك العميق لجدولها.'
      },
      {
        en: "Leaving this here for tomorrow morning: could you confirm the final slide deck?",
        ar: 'أترك هذا هنا لمطالعته صباح الغد: هل يمكنك تأكيد شرائح العرض النهائية؟',
        spokenNoteAr: 'Leaving this here for tomorrow تبين أنك لا تتوقع رداً في المساء.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Sending 'URGENT PLEASE ANSWER NOW' for a non-critical routine question.",
        correct: "Calibrate your urgency honestly; non-critical asks should include 'No rush'.",
        whyAr: 'المبالغة في تصوير كل سؤال كحالة طوارئ يسبب الإرهاق الوظيفي ويفقدك المصداقية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اطرح على سارة استفساراً في الشات عن موعد الجلسة القادمة، وأكد لها أنه لا داعي للاستعجال!',
      promptEn: 'Ask Sara an asynchronous schedule question adding a polite "no rush" marker!',
      saraQuestionAr: 'Feel free to leave any curriculum questions in my chat inbox!',
      saraQuestionEn: 'Feel free to leave any curriculum questions in my chat inbox!',
      recommendedResponseEn: "Hey Sara! Quick check-in when you have a free moment: what topic are we tackling next? No rush at all on this!"
    },
    quiz: [
      {
        questionAr: 'ما العبارة الأنسب لإضافتها في نهاية رسالة شات لتوضيح أن الأمر غير عاجل ويحترم وقت الزميل؟',
        questionEn: 'Which courtesy phrase signals that an inquiry is not an emergency?',
        options: [
          "Answer within 5 seconds!",
          "No rush at all, whenever you get a chance!",
          "I am watching you.",
          "Stop whatever you are doing."
        ],
        correctIndex: 1,
        explanationAr: 'عبارة "No rush at all, whenever you get a chance" تظهر الاحترام والمهنية وتخفف ضغط الاستعجال.'
      }
    ],
    whiteboardNotes: {
      title: 'Asynchronous Courtesy Kit',
      pointsAr: [
        '1. الاستئذان اللطيف: Quick check-in when you have a second...',
        '2. السؤال المباشر بالسياق الكامل',
        '3. رفع الضغط: No rush on this at all! (لا استعجال)',
        '4. المراعاة: Totally fine if tomorrow works better',
        'النتيجة: احترام متبادل وإنتاجية مريحة للجميع'
      ],
      pointsEn: [
        '1. Gentle opener: "Quick check-in when you get a chance..."',
        '2. Self-contained question with links/context',
        '3. Pressure release: "No rush at all on this!"',
        '4. Flexibility: "Whenever suits you best"',
        'Respects deep focus and asynchronous boundaries'
      ],
      chalkHighlight: 'Quick Question ➡️ Full Context ➡️ "No rush at all!"'
    }
  },
  {
    id: 'scw_411_s',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'كتابة تعليمات التوصيل والشحن (Delivery Notes & Address Instructions)',
    titleEn: 'Delivery Notes: Giving Flawless Drop-off Instructions in English',
    descAr: 'كيف تكتب تعليمات دقيقة لمندوب التوصيل في تطبيقات الطلبات: ترك الطرد عند الباب، رمز البوابة، وعدم دق الجرس.',
    descEn: 'Write crisp delivery instructions for couriers, gate codes, and parcel drop-offs.',
    speakingGoalAr: 'كتابة ملاحظة توصيل في سطرين لسارة (سائقة التوصيل) تحدد مكان وضع الطرد ورقم الشقة.',
    speakingGoalEn: 'Compose concise delivery instructions specifying gate code and contactless drop-off.',
    keyPattern: {
      ruleAr: 'في ملاحظات التوصيل: جمل أمرية مباشرة ومختصرة: [Leave at / Please do not ring / Gate code is #].',
      ruleEn: 'The Delivery Note Formula: Direct drop-off spot ➡️ Gate/buzzer code ➡️ Special request.',
      formula: 'Please leave at [Door / Front porch]. Gate code is [Code]. Please do not ring the bell.'
    },
    practicalExamples: [
      {
        en: "Please leave package on front porch behind the potted plant. Gate code is #4321.",
        ar: 'يرجى ترك الطرد على الشرفة الأمامية خلف حوض النباتات. رمز البوابة هو #4321.',
        spokenNoteAr: 'تعليمات واضحة تضمن سلامة الطرد وسهولة عثور المندوب عليه.'
      },
      {
        en: "Apt 4B on 3rd floor. Please ring buzzer upon arrival. Fragile item inside!",
        ar: 'شقة 4B في الطابق الثالث. يرجى دق الجرس عند الوصول. يحتوي على غرض قابل للكسر!',
        spokenNoteAr: 'Fragile تعني قابل للكسر لتنبيه المندوب بحمله بحذر.'
      },
      {
        en: "Contactless delivery: please leave by door and do not ring bell (sleeping baby). Thanks!",
        ar: 'توصيل بدون تلامس: يرجى تركه عند الباب وعدم دق الجرس (طفل نائم). شكراً!',
        spokenNoteAr: 'توضيح سبب عدم دق الجرس يضمن التزام المندوب بابتسامة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing a long story in Arabic or leaving the delivery note blank when your building has a gate code.",
        correct: "Provide exact English instructions with buzzer code and floor number.",
        whyAr: 'التعليمات الواضحة تمنع اتصالات السائق المربكة وأنت مشغول.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة هي مندوبة التوصيل! اكتب لها ملاحظة توصيل تطلب منها ترك الطعام عند الباب وعدم رن الجرس!',
      promptEn: 'Write a quick delivery instruction note for Sara specifying contactless drop-off!',
      saraQuestionAr: 'I’ve arrived at your building complex! Where should I drop off your order?',
      saraQuestionEn: 'I’ve arrived at your building complex! Where should I drop off your order?',
      recommendedResponseEn: "Please leave the package right outside apartment 204 on the second floor. Please do not ring the bell. Thank you so much!"
    },
    quiz: [
      {
        questionAr: 'ما الكلمة الإنجليزية التحذيرية التي توضع على الطرود للدلالة على احتوائها على مواد قابلة للكسر؟',
        questionEn: 'Which English label warns couriers that a package contains easily breakable items?',
        options: [
          "Fragile (قابل للكسر)",
          "Fast",
          "Free",
          "Frozen"
        ],
        correctIndex: 0,
        explanationAr: 'كلمة "Fragile" تعني قابل للكسر ويجب التعامل معه بحذر وعناية.'
      }
    ],
    whiteboardNotes: {
      title: 'Delivery Note Essentials',
      pointsAr: [
        '1. المكان: Leave at front door / on porch',
        '2. رمز البوابة: Gate code is [الرمز]',
        '3. الحذر: Fragile (قابل للكسر)',
        '4. الهدوء: Please do not ring bell (لا ترن الجرس)'
      ],
      pointsEn: [
        '1. Location: "Leave outside door / at reception"',
        '2. Access: "Gate code is #..."',
        '3. Caution: "Fragile — handle with care"',
        '4. Preference: "Contactless delivery — do not knock"'
      ],
      chalkHighlight: 'Drop-off Spot ➡️ Gate Code ➡️ "Do not ring bell" 📦'
    }
  },
  {
    id: 'scw_412_s',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'مبتدئ (Starter)',
    levelCode: 'A1-A2',
    titleAr: 'الرد على الدعوات والمناسبات (RSVP & Accepting/Declining Invitations)',
    titleEn: 'RSVP Etiquette: Accepting or Declining Invitations with Warmth',
    descAr: 'كيف ترد على دعوة لحفل عشاء، عيد ميلاد، أو ورشة عمل بالقبول الحماسي أو الاعتذار الرقيق المسبب.',
    descEn: 'Accept or decline invitations warmly and punctually in text messages and calendar invites.',
    speakingGoalAr: 'كتابة رد قبول دعوة حماسي لسارة مع عرض إحضار شيء معك للمناسبة.',
    speakingGoalEn: 'Draft an enthusiastic RSVP accepting an invitation or a warm, polite decline.',
    keyPattern: {
      ruleAr: 'في الرد على الدعوات: 1) للقبول: "Count me in! Would love to be there. Can I bring anything?" 2) للاعتذار: "So wish I could make it, but I have a prior commitment. Have a blast!"',
      ruleEn: 'Acceptance: "Count me in!" | Declining: "Won\'t be able to make it due to prior plans. Have the best time!"',
      formula: 'Accept: Count me in! 🥳 | Decline: Wish I could make it, but [Gentle reason]. Have fun!'
    },
    practicalExamples: [
      {
        en: "Count me in! I'd love to celebrate with you. Can I bring anything along?",
        ar: 'احسبني من الحاضرين بالتأكيد! يسعدني جداً الاحتفال معك. هل يمكنني إحضار أي شيء معي؟',
        spokenNoteAr: 'Count me in تعبير عفوي شهير يعني أنا حاضر بالتأكيد.'
      },
      {
        en: "I'm so bummed I won't be able to make it! I have a prior family commitment that evening. Have a blast!",
        ar: 'أنا حزين حقاً لأنني لن أتمكن من الحضور! لدي التزام عائلي مسبق في ذلك المساء. استمتعوا بوقت رائع!',
        spokenNoteAr: 'bummed تعبير يعني متأسف ومحبط لعدم قدرته على الحضور.'
      },
      {
        en: "RSVP: Confirmed +1. Really looking forward to catching up with everyone!",
        ar: 'تأكيد الحضور: مؤكد بحضور شخص إضافي (+1). متطلع بشدة لرؤية الجميع!',
        spokenNoteAr: '+1 تعني سأصطحب معي ضيفاً إضافياً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Ignoring an invitation completely and leaving the host wondering how much food to prepare.",
        correct: "Always reply within 48 hours, even if your answer is a polite no.",
        whyAr: 'تجاهل الرد على الدعوات (Ghosting) يعتبر تصرفاً غير لائق في إتيكيت المناسبات.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تدعوك لحفل تخرج الدورة اللغوية! اكتب لها رداً حماسياً بالقبول واعرض المساعدة!',
      promptEn: 'Sara invites you to a curriculum completion party. Write an enthusiastic acceptance RSVP!',
      saraQuestionAr: "Hey! We're hosting a small speaking celebration this Friday at 7 PM. Would love to have you join!",
      saraQuestionEn: "Hey! We're hosting a small speaking celebration this Friday at 7 PM. Would love to have you join!",
      recommendedResponseEn: "Count me in, Sara! Wouldn't miss it for the world. Can I bring any snacks or drinks along? So excited!"
    },
    quiz: [
      {
        questionAr: 'ما التعبير الاصطلاحي الأكثر عفوية وتداولاً لقبول دعوة وتأكيد الحضور بحماس؟',
        questionEn: 'Which conversational idiom signals enthusiastic acceptance of an invitation?',
        options: [
          "Count me in!",
          "Count my money.",
          "Close the door.",
          "I forgot you."
        ],
        correctIndex: 0,
        explanationAr: 'تعبير "Count me in!" هو التعبير الأكثر استخداماً وحماساً لتأكيد الحضور والمشاركة.'
      }
    ],
    whiteboardNotes: {
      title: 'RSVP Master Kit',
      pointsAr: [
        '1. قبول حماسي: Count me in! Wouldn\'t miss it!',
        '2. عرض المساعدة: Can I bring anything along?',
        '3. اعتذار مهذب: Wish I could make it, but have prior plans',
        '4. تمني أوقات ممتعة: Have a blast! / Have the best time!'
      ],
      pointsEn: [
        '1. Enthusiastic "Yes": "Count me in!"',
        '2. Thoughtful host offer: "Can I bring anything?"',
        '3. Gracious "No": "So bummed I won\'t be able to make it"',
        '4. Warm sendoff: "Have a blast!"'
      ],
      chalkHighlight: 'Accept: "Count me in!" 🥳 🆚 Decline: "Prior commitment, have fun!"'
    }
  },

  // ==========================================
  // INTERMEDIATE LEVEL (B1-B2) - Lessons 11 to 20
  // ==========================================
  {
    id: 'scw_402',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تفريغ الأفكار اليومية بالإنجليزية وفك الترجمة الذهنية (Freewriting in English)',
    titleEn: 'Journaling & Unlocking Direct Thinking in English',
    descAr: 'كيف تكتب يومياتك أو خواطرك بالإنجليزية مباشرة دون ترجمة مسبقة من العربية للتخلص من البطء الذهني.',
    descEn: 'Stop translating mentally by writing spontaneous reflections directly in English.',
    speakingGoalAr: 'كتابة تدوينة سريعة من 4 أسطر تصف بها شعورك وتطلعاتك لهذا اليوم.',
    speakingGoalEn: 'Freewrite a 4-line personal reflection without translating from your native language.',
    keyPattern: {
      ruleAr: 'في الكتابة الحرة: اكتب أفكارك بالإنجليزية فوراً دون تصحيح إملائي أو لغوي في الدقائق الثلاث الأولى لفك القفل الذهني.',
      ruleEn: 'Freewriting rule: write continuously for 3 minutes without editing to activate native pathways.',
      formula: 'Brain Dump in English ➡️ No backspacing ➡️ Fluid expression'
    },
    practicalExamples: [
      {
        en: "Today felt chaotic at first, but taking a deep breath helped me regain my focus.",
        ar: 'اليوم بدا فوضوياً في بدايته، لكن أخذ نَفَس عميق ساعدني على استعادة تركيزي.',
        spokenNoteAr: 'لاحظ السرد المباشر للشعور دون تكلف.'
      },
      {
        en: "I've realized that waiting for the perfect moment is just fear in disguise.",
        ar: 'أدركت أن انتظار اللحظة المثالية ليس سوى خوف متنكر.',
        spokenNoteAr: 'in disguise تعبير عميق وجميل يعني متنكراً أو مختبئاً.'
      },
      {
        en: "Small daily wins matter way more than giant occasional leaps.",
        ar: 'الانتصارات الصغيرة اليومية أهم بكثير من القفزات الكبيرة المتباعدة.',
        spokenNoteAr: 'فكرة ملهمة وسهلة الحفظ والتطبيق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing the Arabic sentence on paper and looking up each word in Google Translate.",
        correct: "Use simple English words you already know to describe your thought directly.",
        whyAr: 'الترجمة كلمة بكلمة تنتج جملاً ركيكة وتزيد التردد.'
      }
    ],
    speakingChallenge: {
      promptAr: 'شارك سارة خاطرة سريعة من جملتين عما تعلمته هذا الأسبوع!',
      promptEn: 'Share a 2-sentence quick reflection with Sara about what you learned this week!',
      saraQuestionAr: 'What was your biggest takeaway from this past week? Type it directly in English!',
      saraQuestionEn: 'What was your biggest takeaway from this past week? Type it directly in English!',
      recommendedResponseEn: "I learned that practicing consistently every morning makes speaking feel so much easier and natural!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل طريقة للتخلص من عادة الترجمة من العربية إلى الإنجليزية أثناء التعبير؟',
        questionEn: 'What is the most effective technique to stop translating mentally from Arabic to English?',
        options: [
          "Memorize an Arabic-English dictionary.",
          "Write and speak using simpler structures you already know directly in English.",
          "Stop reading in English.",
          "Translate word-by-word slowly."
        ],
        correctIndex: 1,
        explanationAr: 'استخدام تراكيب بسيطة تعرفها مباشرة بالإنجليزية يبرمج العقل على التفكير التلقائي.'
      }
    ],
    whiteboardNotes: {
      title: 'Direct English Thinking Secret',
      pointsAr: [
        '1. توقف عن ترجمة الكلمات العربية حرفياً',
        '2. إذا نسيت كلمة معقدة، بسّط فكرتك واستخدم بديلاً سهلاً',
        '3. 3 دقائق كتابة حرة يومياً تكسر حاجز التردد التحدثي'
      ],
      pointsEn: [
        '1. Ditch word-for-word translation',
        '2. Circumlocution: Describe the concept with simple words',
        '3. 3 minutes of daily stream-of-consciousness journaling'
      ],
      chalkHighlight: 'Simple Direct Words ➡️ Bypass Translation ➡️ Automatic Speech'
    }
  },
  {
    id: 'scw_413',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'الاعتذار المهذب عن المهام الإضافية (Polite Pushback & Saying No Gracefully)',
    titleEn: 'Setting Boundaries: Pushing Back on Unrealistic Demands Without Burning Bridges',
    descAr: 'كيف ترفض طلباً أو مشروعاً إضافياً يفوق طاقتك بلباقة مهنية عالية دون أن تبدو كسولاً أو غير متعاون.',
    descEn: 'Say "no" gracefully in business writing by framing your capacity around team quality.',
    speakingGoalAr: 'كتابة إيميل اعتذار مهذب لسارة عن تولي مشروع جديد بسبب ضيق الوقت المتاح (Bandwidth).',
    speakingGoalEn: 'Draft an email setting bandwidth boundaries while offering an alternative timeline.',
    keyPattern: {
      ruleAr: 'معادلة الرفض المهني الراقي: الترحيب بالفكرة ➡️ بيان محدودية الطاقة والوقت حالياً (Bandwidth constraints) ➡️ اقتراح تأجيلها للربع القادم أو المساعدة في التفويض.',
      ruleEn: 'The Professional Pushback Formula: Validate initiative ➡️ state capacity limits around quality ➡️ propose future milestone.',
      formula: "I'd love to help, but given my current commitments to [Project], I lack the bandwidth to give this the focus it deserves."
    },
    practicalExamples: [
      {
        en: "I'd love to support this initiative, but my current bandwidth is fully committed to our Q3 product launch.",
        ar: 'يسعدني جداً دعم هذه المبادرة، ولكن طاقتي ووقتي الحاليان مستهلكان بالكامل في إطلاق منتج الربع الثالث.',
        spokenNoteAr: 'bandwidth مصطلح مهني فائق الرقي يعني سعة الوقت والطاقة الذهنية المتاحة.'
      },
      {
        en: "To ensure we don't compromise on quality, could we revisit this in two weeks?",
        ar: 'لضمان ألا نساوم على معايير الجودة، هل يمكننا إعادة فتح هذا الموضوع بعد أسبوعين؟',
        spokenNoteAr: 'ربط الرفض بالحرص على الجودة يجعلك تبدو مسؤولاً وملتزماً.'
      },
      {
        en: "I won't be able to take lead on this, but I'm happy to review the final draft for 20 minutes.",
        ar: 'لن أتمكن من قيادة هذا المشروع، لكني سأكون سعيداً بمراجعة مسودته النهائية لمدة 20 دقيقة.',
        spokenNoteAr: 'عرض مساعدة جزئية صغيرة يثبت روح الفريق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Replying 'I am too busy and don't care about this.'",
        correct: "Frame your boundary around protecting quality on current commitments.",
        whyAr: 'الرفض الفج يدمر العلاقات؛ الرفض الذكي يربط قرارك بالحرص على نجاح الشركة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة تطلب منك إعداد تقرير إضافي بحلول الغد! اعتذر بلباقة موضحاً التزامك بموعد تسليم آخر!',
      promptEn: 'Push back politely on Sara’s extra report request citing prior deadline priorities!',
      saraQuestionAr: "Could you take over compiling the regional analytics report by tomorrow afternoon?",
      saraQuestionEn: "Could you take over compiling the regional analytics report by tomorrow afternoon?",
      recommendedResponseEn: "I'd love to help, Sara, but I'm laser-focused on finalizing the client deck for tomorrow's demo. Could we tackle this report early next week?"
    },
    quiz: [
      {
        questionAr: 'ما المصطلح المهني العصري الأكثر شيوعاً في بيئات الأعمال للإشارة إلى سعة وقتك وطاقتك للعمل؟',
        questionEn: 'Which corporate buzzword gracefully refers to your available time and mental capacity?',
        options: [
          "Bandwidth",
          "Battery life",
          "Footstep",
          "Oxygen level"
        ],
        correctIndex: 0,
        explanationAr: 'كلمة "Bandwidth" تُستخدم في بيئة الأعمال المعاصرة للتعبير عن الطاقة الاستيعابية والوقت المتاح لإنجاز المهام.'
      }
    ],
    whiteboardNotes: {
      title: 'The Art of Polite Pushback',
      pointsAr: [
        '1. التقدير: I would love to support this...',
        '2. الطاقة الاستيعابية: My current bandwidth is committed to...',
        '3. الحفاظ على الجودة: To ensure we don\'t compromise quality...',
        '4. البديل: Could we revisit this next quarter? / Happy to do a quick review'
      ],
      pointsEn: [
        '1. Validate: "I appreciate you thinking of me..."',
        '2. Capacity: "My current bandwidth is fully allocated to [Priority]"',
        '3. Standard: "I want to give this the focus it deserves"',
        '4. Alternative: "Could we slate this for next sprint?"'
      ],
      chalkHighlight: 'Validate ➡️ Cite Bandwidth Limits ➡️ Protect Quality ➡️ Propose Date'
    }
  },
  {
    id: 'scw_414',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'توثيق الأعطال البرمجية والخلل التقني (Writing Clear Bug Reports)',
    titleEn: 'Writing Crystal-Clear Bug Reports & Issue Summaries',
    descAr: 'كيف تكتب تقرير خلل تقني يفهمه المطورون وفريق الدعم فوراً: الخطوات، والنتيجة المتوقعة، والنتيجة الفعلية.',
    descEn: 'Write structured, reproducible issue tickets that developers love to resolve.',
    speakingGoalAr: 'كتابة تقرير خلل تقني لسارة مكون من 3 بنود: الخطوات، المتوقع، والفعلي.',
    speakingGoalEn: 'Draft an engineering bug ticket covering steps to reproduce, expected vs actual behavior.',
    keyPattern: {
      ruleAr: 'هيكل تقرير الخلل الذهبي: 1) خطوات إعادة المشكلة (Steps to reproduce) 2) السلوك المتوقع (Expected behavior) 3) السلوك الفعلي الخاطئ (Actual behavior).',
      ruleEn: 'The Standard Bug Template: Summary ➡️ Steps to reproduce ➡️ Expected result ➡️ Actual result.',
      formula: 'Steps to reproduce: 1, 2, 3 ➡️ Expected: [What should happen] ➡️ Actual: [Glitch observed]'
    },
    practicalExamples: [
      {
        en: "Steps to reproduce: 1. Click Profile icon. 2. Tap Edit Bio. 3. Hit Save.",
        ar: 'خطوات استدعاء الخلل: 1. اضغط على أيقونة الملف الشخصي. 2. انقر تعديل النبذة. 3. اضغط حفظ.',
        spokenNoteAr: 'ترقيم الخطوات يجعل تجربة الخطأ سهلة الفحص للمهندس.'
      },
      {
        en: "Expected behavior: Profile bio updates instantly. Actual behavior: App crashes with error 500.",
        ar: 'السلوك المتوقع: تحديث النبذة فوراً. السلوك الفعلي: إغلاق مفاجئ للتطبيق مع خطأ 500.',
        spokenNoteAr: 'مقارنة دقيقة تقضي على أي غموض في التقرير.'
      },
      {
        en: "Environment: iOS 17.2, Chrome Mobile, App Version 3.4.1.",
        ar: 'بيئة التشغيل: نظام iOS 17.2، متصفح كروم للجوال، إصدار التطبيق 3.4.1.',
        spokenNoteAr: 'ذكر البيئة يسرع من حل المشكلة بـ 5 أضعاف.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Submitting a ticket saying: 'The app is broken please fix!'.",
        correct: "Always provide reproduction steps and specify what you saw versus what should have happened.",
        whyAr: 'التقارير المبهمة لا يمكن للمطورين حلها لأنهم لا يعرفون كيف حدث الخطأ.'
      }
    ],
    speakingChallenge: {
      promptAr: 'واجهت مشكلة في زر تشغيل الصوت بالمنصة! اكتب لسارة تقرير خلل تقني منظم في 3 أسطر!',
      promptEn: 'Draft a structured bug summary for Sara about an audio button glitch!',
      saraQuestionAr: 'Our engineering team is logging system issues. What did you notice with the audio player?',
      saraQuestionEn: 'Our engineering team is logging system issues. What did you notice with the audio player?',
      recommendedResponseEn: "Steps: Clicked Audio Play on lesson 3. Expected: Voice snippet plays. Actual: Button spins endlessly with no sound output. (Chrome on desktop)"
    },
    quiz: [
      {
        questionAr: 'ما القسم الأهم على الإطلاق في أي تقرير خلل تقني (Bug Report)؟',
        questionEn: 'What is the single most vital component of any actionable bug report?',
        options: [
          "A poem about computers.",
          "Steps to reproduce the issue (خطوات استدعاء الخلل وتكراره).",
          "Complaining about the price.",
          "Your favorite color."
        ],
        correctIndex: 1,
        explanationAr: 'خطوات استدعاء المشكلة (Steps to reproduce) هي حجر الزاوية الذي يمكن المهندس من مشاهدة الخلل وإصلاحه.'
      }
    ],
    whiteboardNotes: {
      title: 'The Engineering Bug Template',
      pointsAr: [
        '1. العنوان: [المكان] - وصف العطل الموجز',
        '2. الخطوات: Steps to reproduce (1, 2, 3)',
        '3. المتوقع: Expected behavior',
        '4. الفعلي: Actual behavior',
        '5. البيئة: Device & browser version'
      ],
      pointsEn: [
        '1. Summary: Clear, specific headline',
        '2. Steps to Reproduce: Numbered step-by-step',
        '3. Expected Behavior: What should occur',
        '4. Actual Behavior: What broke/failed',
        '5. Environment: OS, Browser, App build'
      ],
      chalkHighlight: 'Steps to Reproduce ➡️ Expected Behavior ➡️ Actual Glitch'
    }
  },
  {
    id: 'scw_415',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'كتابة منشورات لينكد إن الجذابة والمؤثرة (Crafting High-Engagement LinkedIn Posts)',
    titleEn: 'LinkedIn Thought Leadership: The Hook, Story, Lesson & Question Arc',
    descAr: 'كيف تكتب منشوراً احترافياً على لينكد إن يشد انتباه المتابعين في أول سطرين وينتهي بسؤال يحرك النقاش.',
    descEn: 'Write engaging, authentic LinkedIn updates that showcase professional growth without cringe.',
    speakingGoalAr: 'كتابة منشور لينكد إن في 4 فقرات قصيرة يروي تجربة تعلم مهارة التحدث بالإنجليزية.',
    speakingGoalEn: 'Draft an engaging LinkedIn post using the Hook-Story-Insight-Question framework.',
    keyPattern: {
      ruleAr: 'هيكل منشور لينكد إن الناجح: 1) السطر الأول الصادم أو الجذاب (The Hook) 2) القصة أو التحدي 3) الدرس المستفاد 4) سؤال مفتوح للجمهور.',
      ruleEn: 'The LinkedIn Framework: 2-line curiosity hook ➡️ Short narrative challenge ➡️ Core insight ➡️ Community question.',
      formula: '[Curiosity Hook] ➡️ [The Real Challenge] ➡️ [Key Takeaway] ➡️ [What about you?]'
    },
    practicalExamples: [
      {
        en: "Most people think confidence precedes competence. In my experience, it's the exact opposite.",
        ar: 'يعتقد معظم الناس أن الثقة تسبق الكفاءة. وفي تجربتي، الواقع عكس ذلك تماماً.',
        spokenNoteAr: 'سطر أول قوي يتحدى فكرة شائعة ويجبر القارئ على الضغط على "...see more".'
      },
      {
        en: "For years, I waited until my grammar felt 'perfect' before speaking up in global calls. All it produced was missed opportunities.",
        ar: 'لسنوات، انتظرت حتى تصبح قواعدي "مثالية" قبل أن أتحدث في المكالمات الدولية. وكل ما نتج عن ذلك كان فرصاً ضائعة.',
        spokenNoteAr: 'مشاركة ضعف حقيقي وتجربة شخصية تبني مصداقية هائلة.'
      },
      {
        en: "Action creates clarity. Speaking daily built the confidence no textbook ever could. How do you tackle public speaking fears?",
        ar: 'العمل يخلق الوضوح. التحدث اليومي بنى الثقة التي عجزت عنها الكتب. كيف تواجهون مخاوف التحدث أمام الجمهور؟',
        spokenNoteAr: 'درس حكيم ينتهي بسؤال مجتمعي مفتوح يدعو للتعليق.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing a giant wall of unbroken text with 20 hashtags at the beginning.",
        correct: "Use generous line breaks, 1-2 sentence paragraphs, and max 3 relevant hashtags at the bottom.",
        whyAr: 'القراءة على شاشات الجوال تتطلب مساحات بيضاء مريحة للعين.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة مسودة منشور لينكد إن تحتفل فيه بتطورك في التحدث وتختم بسؤال لمتابعيك!',
      promptEn: 'Draft a short LinkedIn post celebrating your conversational English breakthrough!',
      saraQuestionAr: 'If you shared your speaking breakthrough on LinkedIn today, how would you structure the post?',
      saraQuestionEn: 'If you shared your speaking breakthrough on LinkedIn today, how would you structure the post?',
      recommendedResponseEn: "I spent years studying English silently. Today, I completed 30 active speaking sessions with AI mentor Sara. Consistency beats perfection every single time. What daily habit transformed your growth this year?"
    },
    quiz: [
      {
        questionAr: 'ما الجزء الأكثر أهمية في منشور لينكد إن لجعل القارئ يضغط على زر "See more"؟',
        questionEn: 'What is the most crucial part of a LinkedIn post to trigger the "See more" click?',
        options: [
          "The first two lines (The Hook).",
          "The hashtags at the bottom.",
          "The date of graduation.",
          "The company phone number."
        ],
        correctIndex: 0,
        explanationAr: 'السطران الافتتاحيان (The Hook) هما ما يحددان ما إذا كان القارئ سيتوقف ليقرأ المنشور أم سيتجاوزه.'
      }
    ],
    whiteboardNotes: {
      title: 'The LinkedIn Post Blueprint',
      pointsAr: [
        '1. الخطاف (The Hook): أول سطرين يصنعان الفارق',
        '2. القصة (The Vulnerability): تحدٍ حقيقي مررت به',
        '3. الحكمة (The Insight): درس عملي يضيف قيمة للقارئ',
        '4. السؤال المفتوح: What about you? لتحفيز التعليقات',
        'التنسيق: أسطر قصيرة ومسافات بيضاء مريحة'
      ],
      pointsEn: [
        '1. Hook: 1-2 punchy lines defying conventional wisdom',
        '2. Story: Vulnerable, relatable hurdle',
        '3. Insight: Actionable takeaway for peers',
        '4. Community Ask: Open question to spark comments',
        'Formatting: Generous white space between short paragraphs'
      ],
      chalkHighlight: 'Curiosity Hook ➡️ Relatable Story ➡️ Actionable Insight ➡️ Question'
    }
  },
  {
    id: 'scw_416',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'كتابة محاضر الاجتماعات والمهام التنفيذية (Meeting Minutes & Action Items)',
    titleEn: 'Writing Action-Oriented Meeting Minutes in 5 Bullets',
    descAr: 'كيف تلخص اجتماعاً مدته ساعة في 5 أسطر محكمة تحدد ما اتفق عليه ومن المسؤول عن كل مهمة وتاريخ التسليم.',
    descEn: 'Distill hour-long meetings into crisp, accountable action-item summaries.',
    speakingGoalAr: 'كتابة محضر اجتماع موجز لسارة يحدد 3 مهام تنفيذية مع المسؤول وموعد التسليم.',
    speakingGoalEn: 'Draft an executive meeting summary highlighting Decisions Made and Action Items (Owner + ETA).',
    keyPattern: {
      ruleAr: 'هيكل محضر الاجتماع العصري: 1) القرارات الأساسية (Decisions made) 2) جدول المهام: المهمة ⬅️ المسؤول ⬅️ موعد التسليم (Task | Owner | ETA).',
      ruleEn: 'The Executive Minutes Formula: Key Decisions ➡️ Action Items [What | Who | By When].',
      formula: '• [Task / Action] ➡️ Owner: [Name] | ETA: [Date / Time]'
    },
    practicalExamples: [
      {
        en: "Key Decision: Team approved the revised mobile onboarding flow.",
        ar: 'القرار الأساسي: اعتمد الفريق مسار تجربة المستخدم الجديد لتطبيق الجوال.',
        spokenNoteAr: 'توثيق القرار بوضوح يمنع العودة لنقاشه من الصفر مجدداً.'
      },
      {
        en: "Action item: Finalize localized Arabic copy ➡️ Owner: Ahmed | ETA: Thursday 3 PM.",
        ar: 'مهمة تنفيذية: إنهاء النصوص العربية المترجمة ⬅️ المسؤول: أحمد | موعد التسليم: الخميس 3 عصراً.',
        spokenNoteAr: 'وضوح تام في اسم الشخص المسؤول وتاريخ التسليم الدقيق.'
      },
      {
        en: "Action item: Deploy staging build for QA testing ➡️ Owner: Tech Lead | ETA: Friday noon.",
        ar: 'مهمة تنفيذية: رفع النسخة التجريبية لاختبارات الجودة ⬅️ المسؤول: القائد التقني | الموعد: ظهر الجمعة.',
        spokenNoteAr: 'لا تترك مهمة معلقة دون تحديد صاحبها وموعدها.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing a verbatim transcript of who said what for 10 pages.",
        correct: "Nobody reads transcripts; write only the decisions made and assigned action items.",
        whyAr: 'المدراء والفرق التنفيذية يحتاجون فقط لمعرفة القرارات وما يجب تنفيذه تالياً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'لخص اجتماعنا اليوم في نقطة قرار واحدة ومهمتين تنفيذيتين مع تحديد الموعد!',
      promptEn: 'Draft a 3-bullet meeting summary for Sara with Decisions Made and Action Items!',
      saraQuestionAr: 'Let’s lock down our study strategy: Could you write up our session minutes with next milestones?',
      saraQuestionEn: 'Let’s lock down our study strategy: Could you write up our session minutes with next milestones?',
      recommendedResponseEn: "Decision: Focus on active speaking practice 15 mins daily. Action 1: Review Track 3 phonetics drills (Owner: Me | ETA: Tomorrow). Action 2: Voice record audio response (Owner: Me | ETA: Friday)."
    },
    quiz: [
      {
        questionAr: 'ما العنصران الأساسيان اللذان يجب أن تشتمل عليهما أي مهمة تنفيذية (Action Item) في محضر الاجتماع؟',
        questionEn: 'What two elements must accompany every Action Item to ensure accountability?',
        options: [
          "The coffee flavor and weather.",
          "The Owner (المسؤول) and the ETA / Deadline (تاريخ التسليم المحدد).",
          "A random joke.",
          "The office room number."
        ],
        correctIndex: 1,
        explanationAr: 'كل مهمة تنفيذية يجب أن تحدد بوضوح الشخص المسؤول عنها (Owner) وموعد تسليمها النهائي (ETA/Deadline).'
      }
    ],
    whiteboardNotes: {
      title: 'Action-Item Minutes Template',
      pointsAr: [
        '1. القرارات المتخذة: Key Decisions Made',
        '2. جدول المهام: Action Items',
        '3. لكل مهمة: المهمة ⬅️ المسؤول (Owner) ⬅️ موعد التسليم (ETA)',
        'قاعدة الذهب: الإيجاز يحقق الإنجاز!'
      ],
      pointsEn: [
        '1. Core Outcomes: "Decisions Approved"',
        '2. Accountability Matrix: [Action | Owner | Due Date]',
        '3. Zero transcription fluff',
        'Clarity drives velocity'
      ],
      chalkHighlight: 'Key Decisions ➡️ [Action Item | Owner | ETA]'
    }
  },
  {
    id: 'scw_417',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'رسائل التواصل المهني الأول غير المتوقع (Cold Outreach on LinkedIn)',
    titleEn: 'Cold Outreach That Converts: Specific Praise, Zero Pitch & Low-Friction Ask',
    descAr: 'كيف تراسل خبيراً أو مديراً تنفيذياً للمرة الأولى بركيزة إنسانية ذكية تضمن رده الإيجابي بدلاً من تجاهلك.',
    descEn: 'Send cold InMails that get replies by avoiding early pitches and offering authentic value.',
    speakingGoalAr: 'كتابة رسالة تواصل مهني أولى لسارة في لينكد إن من 4 أسطر تطلب فيها استشارة سريعة.',
    speakingGoalEn: 'Draft an effective cold outreach message with a personalized hook and low-friction ask.',
    keyPattern: {
      ruleAr: 'معادلة التواصل البارد الناجح: 1) إشادة حقيقية بمحتوى أو إنجاز حديث له 2) الرابط المشترك أو الاهتمام 3) طلب خفيف جداً لا يستغرق وقتاً (Low-friction ask: سؤال واحد فقط).',
      ruleEn: 'The Cold Outreach Arc: Personalized hook ➡️ Mutual context ➡️ Zero sales pitch ➡️ Tiny low-friction ask.',
      formula: "Loved your talk on [Topic]. Working on [Project] and had a quick question: [One Question]? Either way, thanks!"
    },
    practicalExamples: [
      {
        en: "Hi Sarah, loved your recent article on speech synthesis models—especially the point about latency.",
        ar: 'مرحباً سارة، أعجبني جداً مقالك الأخير عن نماذج التوليف الصوتي، ولا سيما نقطتك حول زمن الاستجابة.',
        spokenNoteAr: 'البداية بذكر تفصيل محدد يثبت أنك قرأت عمله بالفعل ولست رسالة عشوائية.'
      },
      {
        en: "I'm currently building an educational tool in that space. Would love to hear your perspective on one quick question if you ever have two minutes?",
        ar: 'أنا أقوم حالياً ببناء أداة تعليمية في هذا المجال. وأود بشدة سماع وجهة نظرك حول سؤال واحد سريع إذا أتيحت لك دقيقتان في أي وقت؟',
        spokenNoteAr: 'طلب دقيقتين وسؤال واحد يسهل جداً الموافقة عليه.'
      },
      {
        en: "No worries at all if you're swamped. Keep up the phenomenal work!",
        ar: 'لا تقلق إطلاقاً إذا كنت غارقاً في العمل. واصل هذا العمل الاستثنائي الرائع!',
        spokenNoteAr: 'رفع الضغط في النهاية يبني احتراماً فورياً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Sending a 10-paragraph essay asking: 'Can I pick your brain over a 1-hour coffee meeting?'.",
        correct: "Never ask a busy stranger for an hour of their time right away; ask one specific, thoughtful question.",
        whyAr: 'الخبراء مشغولون جداً؛ السؤال المحدد يظهر ذكاءك ويسهل الرد عليه في 30 ثانية.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب رسالة تواصل باردة لسارة في لينكد إن تعبر فيها عن إعجابك بأسلوبها التعليمي وتطلب نصيحة في جملة!',
      promptEn: 'Draft a 4-line cold LinkedIn message to Sara with specific appreciation and a single question!',
      saraQuestionAr: 'How would you craft a message to reach out to an industry specialist you admire?',
      saraQuestionEn: 'How would you craft a message to reach out to an industry specialist you admire?',
      recommendedResponseEn: "Hi Sara! Really loved your insights on overcoming speaking anxiety. Quick question: what single habit helped you most when you started out? No worries if swamped!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل طريقة لطلب النصيحة من خبير مشغول في رسالة التواصل الأولى (Cold Message)؟',
        questionEn: 'What is the most effective request to make in an initial cold outreach message?',
        options: [
          "Ask for a free 2-hour Zoom call immediately.",
          "Ask one specific, thoughtful question that takes under 2 minutes to answer.",
          "Send your entire 40-page portfolio.",
          "Demand their personal phone number."
        ],
        correctIndex: 1,
        explanationAr: 'طرح سؤال واحد محدد ومدروس (Low-friction ask) يحظى بنسبة ردود تفوق 80% مقارنة بطلب اجتماعات طويلة.'
      }
    ],
    whiteboardNotes: {
      title: 'The High-Converting Cold Message',
      pointsAr: [
        '1. الخطاف الشخصي: Loved your recent post on [تفصيل محدد]',
        '2. الصلة المشتركة: I am currently working on...',
        '3. الطلب الخفيف: Quick question on [النقطة]',
        '4. التحرير من الضغط: No worries if swamped, keep up the great work!',
        'تجنب: طلب اجتماعات طويلة في الرسالة الأولى'
      ],
      pointsEn: [
        '1. Personalized proof of work: "Loved your piece on [X]"',
        '2. Context: "I am building in this domain"',
        '3. Low-friction ask: Exactly ONE focused question',
        '4. Graceful exit: "No worries if swamped!"',
        'Brevity and genuine respect unlock replies'
      ],
      chalkHighlight: 'Specific Praise ➡️ One Focused Question ➡️ Graceful Exit'
    }
  },
  {
    id: 'scw_418',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'تقارير تقدم المشاريع للمدراء (Traffic Light Status Reports: Green, Yellow, Red)',
    titleEn: 'Writing Executive Status Updates: The Traffic Light Method',
    descAr: 'كيف تقدم تقرير إنجاز أسبوعي لمديرك التنفيذي بنظام إشارات المرور: الأخضر، الأصفر، والأحمر.',
    descEn: 'Communicate project health to leadership using color-coded progress summaries.',
    speakingGoalAr: 'كتابة تقرير أسبوعي لسارة بنظام إشارات المرور يوضح الإنجازات ومخاطر المشروع.',
    speakingGoalEn: 'Draft an executive project health summary with Highlights, Lowlights, and Risks.',
    keyPattern: {
      ruleAr: 'نظام إشارات المرور التنفيذي: 🟢 أخضر (تسير وفق الخطة)، 🟡 أصفر (تحديات تحت السيطرة)، 🔴 أحمر (خطر يتطلب تدخل الإدارة). يتبعه: Highlights و Risks.',
      ruleEn: 'The Traffic Light Report: Status code (🟢 Green / 🟡 Yellow / 🔴 Red) ➡️ Highlights ➡️ Lowlights ➡️ Next milestones.',
      formula: 'Status: 🟢 Green | Key Highlight: [Win] | Risk / Lowlight: [Flag] | Next Milestone: [ETA]'
    },
    practicalExamples: [
      {
        en: "Project Health: 🟢 GREEN — On track for next sprint deployment.",
        ar: 'حالة المشروع: 🟢 أخضر — نسير وفق الجدول الزمني لإطلاق الدورة القادمة.',
        spokenNoteAr: 'اللون يعطي المدير انطباعاً فورياً في ثانية واحدة.'
      },
      {
        en: "Highlight: Completed user testing with 94% positive satisfaction rating.",
        ar: 'أبرز الإنجازات: إتمام اختبارات المستخدمين بنسبة رضا إيجابي بلغت 94%.',
        spokenNoteAr: 'ذكر الإنجاز بالأرقام الملموسة.'
      },
      {
        en: "Risk (Yellow): Third-party API documentation is delayed; mitigating by building mock data.",
        ar: 'الخطر (أصفر): تأخر توثيق الواجهة البرمجية للشريك؛ ونعالج الأمر ببناء بيانات تجريبية بديلة.',
        spokenNoteAr: 'ذكر المشكلة مع خطة احتوائها الفورية يظهر نضجك الإداري.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Hiding project delays and pretending everything is Green until the deadline fails.",
        correct: "Flag issues as Yellow early so leadership can provide support before it turns Red.",
        whyAr: 'الشفافية المبكرة تبني الثقة؛ المفاجآت المتأخرة تدمرها.'
      }
    ],
    speakingChallenge: {
      promptAr: 'قدم لسارة تقرير حالة أسبوعي عن دراستك للمسارات بنظام إشارات المرور!',
      promptEn: 'Submit an executive status update on your learning progress using the Traffic Light method!',
      saraQuestionAr: 'What is the current project status of your speaking curriculum mastery?',
      saraQuestionEn: 'What is the current project status of your speaking curriculum mastery?',
      recommendedResponseEn: "Status: 🟢 GREEN. Highlights: Completed all Starter lessons with high quiz scores. Risk: Finding extra evening speaking time. Mitigation: Switched to 15-minute morning sessions!"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني إشارة 🟡 "Yellow" في تقارير تقدم المشاريع للمدراء؟',
        questionEn: 'What does a "🟡 Yellow" status signify in an executive progress report?',
        options: [
          "The project is canceled permanently.",
          "There are emerging risks or delays, but they are currently being managed with a mitigation plan.",
          "Everyone is on vacation.",
          "We reached the final goal."
        ],
        correctIndex: 1,
        explanationAr: 'اللون الأصفر 🟡 يعني وجود تحديات أو تأخيرات محتملة تحت المتابعة مع خطة علاجية قائمة.'
      }
    ],
    whiteboardNotes: {
      title: 'Traffic Light Reporting Structure',
      pointsAr: [
        '🟢 Green: كل شيء يسير وفق الخطة والميزانية',
        '🟡 Yellow: توجد مخاطر محتملة تحت السيطرة والمتابعة',
        '🔴 Red: توقف حرج يتطلب تدخل الإدارة العليا فوراً',
        'البنود: Status ➡️ Highlights (النجاحات) ➡️ Risks (المخاطر) ➡️ Next Milestone'
      ],
      pointsEn: [
        '🟢 Green: On schedule, within budget',
        '🟡 Yellow: Manageable risks present, mitigation active',
        '🔴 Red: Off track, executive intervention required',
        'Sections: Status ➡️ Highlights ➡️ Lowlights/Risks ➡️ Next Milestones'
      ],
      chalkHighlight: '🟢/🟡/🔴 Status ➡️ Highlights ➡️ Risks & Mitigation ➡️ Next Milestones'
    }
  },
  {
    id: 'scw_419',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'كتابة الملاحظات ومراجعات العمل (Reviewing Code, Pull Requests & Documents)',
    titleEn: 'Reviewing Work with Empathy: Nitpicks, Blockers & Suggestions',
    descAr: 'كيف تراجع كود أو مستند زميل وتكتب ملاحظاتك بوضوح تصنيفي يميز بين الملاحظة البسيطة (Nit) والعائق الحاسم (Blocker).',
    descEn: 'Tag review comments with clear severity prefixes to make collaborative feedback painless.',
    speakingGoalAr: 'كتابة 3 ملاحظات مراجعة لسارة باستخدام بادئات التصنيف المهنية (Nit, Question, Suggestion).',
    speakingGoalEn: 'Write peer review feedback using modern severity labels: Nitpick, Suggestion, and Blocker.',
    keyPattern: {
      ruleAr: 'بادئات المراجعة الاحترافية: [Nit] للملاحظات الجمالية البسيطة غير الملزمة، [Question] للاستفسار، [Suggestion] للاقتراح، [Blocker] للخطأ الحاسم الذي يجب إصلاحه.',
      ruleEn: 'Conventional Comments prefixes: Nit (optional polish), Question (seeking info), Suggestion (better path), Blocker (must fix).',
      formula: '[Prefix: Nit / Suggestion / Question] + [Observation] + [Proposed Solution]'
    },
    practicalExamples: [
      {
        en: "[Suggestion] We could extract this helper function to improve testability. What do you think?",
        ar: '[اقتراح] يمكننا فصل هذه الدالة المساعدة لتعزيز سهولة الاختبار. ما رأيك؟',
        spokenNoteAr: 'طرح الملاحظة كاقتراح يفتح باب النقاش المهني الصحي.'
      },
      {
        en: "[Nit] Small typo on line 42: 'recieve' ➡️ 'receive'. Otherwise looks great!",
        ar: '[ملاحظة بسيطة] خطأ إملائي طفيف في السطر 42. عدا ذلك، العمل رائع جداً!',
        spokenNoteAr: 'Nit تعني ملاحظة غير مانعة للاعتماد ولا تعطل العمل.'
      },
      {
        en: "[Blocker] This database query lacks pagination, which will crash production under heavy load.",
        ar: '[عائق حاسم] هذا الاستعلام يفتقر إلى تقسيم الصفحات، مما سيعطل النظام تحت الضغط العالي.',
        spokenNoteAr: 'Blocker تعني نقطة حرجة يجب معالجتها قبل الموافقة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing cryptic comments like 'Bad code' or 'Fix this now' with zero explanation.",
        correct: "Explain WHY the change is needed and suggest an alternative solution with a clear severity label.",
        whyAr: 'التعليقات الجافة تثير التوتر وتعيق التعلم؛ التصنيف الواضح يحترم وقت الزميل.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة ملاحظتي مراجعة على وثيقة عمل: الأولى [Nit] والثانية [Suggestion]!',
      promptEn: 'Provide peer review comments to Sara using Conventional Comment tags [Nit] and [Suggestion]!',
      saraQuestionAr: 'I submitted the drafted presentation. Drop your review notes below!',
      saraQuestionEn: 'I submitted the drafted presentation. Drop your review notes below!',
      recommendedResponseEn: "[Nit] Font size on slide 3 is slightly small. [Suggestion] How about adding a visual graph on slide 5 to highlight the growth numbers? Great flow overall!"
    },
    quiz: [
      {
        questionAr: 'ماذا تعني البادئة "[Nit]" في مراجعة الأكواد والمستندات المهنية؟',
        questionEn: 'What does the label "[Nit]" signify in modern peer review feedback?',
        options: [
          "A critical fatal bug that stops the whole company.",
          "A minor, non-blocking cosmetic detail (تفصيلة شكلية بسيطة غير مانعة للاعتماد).",
          "An angry complaint.",
          "A request to delete the document."
        ],
        correctIndex: 1,
        explanationAr: 'بادئة [Nit] (أو Nitpick) تعني تفصيلة ثانوية جمالية لا تعطل اعتماد العمل ولا تمنع إطلاقه.'
      }
    ],
    whiteboardNotes: {
      title: 'Conventional Review Tags',
      pointsAr: [
        '1. [Blocker]: خطأ فادح يجب حله قبل المضي قدماً',
        '2. [Suggestion]: مقترح تطويري أفضل',
        '3. [Question]: سؤال لفهم السبب وسياق الفكرة',
        '4. [Nit]: لمسة تجميلية بسيطة غير ملزمة',
        '5. [Praise]: مديح حقيقي لحل ذكي ومبتكر'
      ],
      pointsEn: [
        '1. [Blocker]: Mandatory fix before release',
        '2. [Suggestion]: Alternative recommended approach',
        '3. [Question]: Seeking intent/clarification',
        '4. [Nit]: Trivial cosmetic polish (non-blocking)',
        '5. [Praise]: Celebrating exceptional craft'
      ],
      chalkHighlight: '[Nit] ➡️ [Suggestion] ➡️ [Blocker] ➡️ [Praise]'
    }
  },
  {
    id: 'scw_420',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'كتابة النبذة المهنية التعريفية (Crafting High-Impact Professional Bios)',
    titleEn: 'Writing Your Professional Bio: Who You Are, What You Solve & Why It Matters',
    descAr: 'كيف تصيغ نبذتك المهنية في 3 فقرات قصيرة لملفات المؤتمرات، مواقع العمل، ومقدمات المحاضرات.',
    descEn: 'Draft an authentic, credible professional bio showcasing expertise, achievements, and mission.',
    speakingGoalAr: 'كتابة نبذة مهنية لسارة مكونة من 50 كلمة تجمع بين خبرتك وشغفك وطاقتك الإيجابية.',
    speakingGoalEn: 'Compose a sharp 50-word third-person professional bio ready for conference stages.',
    keyPattern: {
      ruleAr: 'معادلة النبذة المهنية: 1) الهوية والمجال الأساسي 2) الإنجاز الأبرز أو القيمة التي تضيفها 3) الرسالة أو الشغف الشخصي.',
      ruleEn: 'The Professional Bio Arc: Identity & craft ➡️ Quantifiable impact or focus ➡️ Guiding mission.',
      formula: '[Name] is a [Title] who helps [Audience] achieve [Result]. Passionate about [Mission].'
    },
    practicalExamples: [
      {
        en: "Omar is an educational technologist who designs interactive language platforms that help adult learners build real-world speaking fluency.",
        ar: 'عمر خبير في تكنولوجيا التعليم يصمم منصات لغوية تفاعلية تساعد المتعلمين البالغين على بناء طلاقة التحدث الواقعية.',
        spokenNoteAr: 'جملة أولى تحدد الهوية والجمهور المستهدف والقيمة المضافة بوضوح تام.'
      },
      {
        en: "With a background in software architecture, he has scaled digital products to over 100,000 active users.",
        ar: 'بفضل خلفيته في هندسة البرمجيات، قاد توسع منتجات رقمية لأكثر من 100 ألف مستخدم نشط.',
        spokenNoteAr: 'إثبات الكفاءة بالأرقام والمصداقية.'
      },
      {
        en: "Outside of work, he mentors aspiring engineers and is an avid specialty coffee brewer.",
        ar: 'خارج أوقات العمل، يقدم التوجيه للمهندسين الصاعدين ويعشق تحضير القهوة المختصة.',
        spokenNoteAr: 'لمسة إنسانية تجعل النبذة قريبة من القلوب.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Listing 40 buzzwords like 'synergistic rockstar ninja visionary guru'.",
        correct: "Use grounded, plain English that describes real problems you solve and real results you drive.",
        whyAr: 'الكلمات الرنانة المبتذلة تثير النفور؛ الوضوح والإنجاز الحقيقي هما ما يجذبان الاحترام.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة نبذتك المهنية الشخصية في 3 جمل جاهزة للعرض في ملفك التعريفي!',
      promptEn: 'Draft your personal 3-sentence professional bio for Sara’s feedback!',
      saraQuestionAr: 'Let’s polish your personal elevator bio! What are your three core lines?',
      saraQuestionEn: 'Let’s polish your personal elevator bio! What are your three core lines?',
      recommendedResponseEn: "I am a growth-minded professional dedicated to cross-border communication and tech. I leverage real-time AI tools to accelerate my mastery and lead international initiatives. Passionate about continuous learning and global impact."
    },
    quiz: [
      {
        questionAr: 'ما الترتيب الأفضل للنبذة المهنية المكتوبة الموجهة للمؤتمرات والملفات التعريفية؟',
        questionEn: 'What is the optimal structure for a polished professional bio?',
        options: [
          "Childhood memories ➡️ Favorite food ➡️ Hobbies",
          "Identity & Core Expertise ➡️ Proven Impact/Results ➡️ Mission or Human Touch",
          "Salary requirements only",
          "Complaints about past employers"
        ],
        correctIndex: 1,
        explanationAr: 'الهيكل القياسي العالمي هو: الهوية والمجال ⬅️ الإنجاز والقيمة المضافة ⬅️ الرسالة واللمسة الإنسانية.'
      }
    ],
    whiteboardNotes: {
      title: 'The Professional Bio Blueprint',
      pointsAr: [
        '1. الجملة الأولى: من أنت وماذا تصنع ولمن؟ (Identity + Audience + Value)',
        '2. الجملة الثانية: الإنجاز الملموس أو الخلفية المهارية (Proven Impact)',
        '3. الجملة الثالثة: الرسالة أو الشغف الإنساني (Mission & Human Touch)',
        'تجنب الكلمات المبتذلة: Guru / Ninja / Rockstar'
      ],
      pointsEn: [
        '1. Hook: Identity + Audience + Problem solved',
        '2. Proof: Credibility, metrics, domain experience',
        '3. Soul: Human touch, personal mission, hobby',
        'Banish buzzword inflation: let substance speak'
      ],
      chalkHighlight: 'Who You Are ➡️ What You Solve ➡️ Guiding Mission'
    }
  },
  {
    id: 'scw_421_m',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متوسط (Intermediate)',
    levelCode: 'B1-B2',
    titleAr: 'كتابة تقارير الحالة الأسبوعية وتلخيص التقدم',
    titleEn: 'Writing Weekly Status Reports & Progress Updates',
    descAr: 'صياغة تقارير العمل الأسبوعية بنمط مختصر واحترافي يوضح الإنجازات والتحديات والخطوات القادمة بوضوح.',
    descEn: 'Format crisp weekly status reports that showcase achievements, blockers, and next steps with executive clarity.',
    speakingGoalAr: 'أن تصيغ تقرير حالة أسبوعي عملي وموجز وفق صيغة PPP (Progress, Plans, Problems).',
    speakingGoalEn: 'Write clear and structured weekly status digests using the PPP framework.',
    keyPattern: {
      ruleAr: 'قالب تقرير الإنجازات والتحديات الأسبوعي (PPP Format).',
      ruleEn: 'Executive status reporting framework for weekly progress, roadblocks, and deliverables.',
      formula: 'Progress: [Shipped] | Blockers: [Pending] | Next: [Goal]'
    },
    practicalExamples: [
      {
        en: 'Weekly Summary: ✅ Shipped onboarding flow. ⏳ Testing payment gateway. ⚠️ Blocked on API keys from vendor.',
        ar: 'ملخص أسبوعي: ✅ تم إطلاق تدفق التهيئة. ⏳ جاري اختبار بوابة الدفع. ⚠️ معطلون بانتظار مفاتيح الـ API من المزود.',
        spokenNoteAr: 'استخدم الرموز التعبيرية بحذر كنقاط بصرية لسرعة القراءة والمسح البصري',
        spokenNoteEn: 'Use emojis sparingly as visual anchors for rapid scanning'
      },
      {
        en: 'Key Highlight: We saw a 15% increase in weekly active users following the Monday update.',
        ar: 'أبرز إنجاز: شهدنا زيادة بنسبة 15% في المستخدمين النشطين أسبوعياً عقب تحديث يوم الاثنين.',
        spokenNoteAr: 'ادعم الإنجازات دائماً بأرقام ومؤشرات واضحة',
        spokenNoteEn: 'Always support achievements with crisp data points'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I worked all week on many different small things that took up my time.',
        correct: 'Delivered Sprint 4 sprint backlog items, including database query optimization.',
        whyAr: 'تجنب العبارات الغامضة التي لا تبرز نتائج ملموسة؛ استخدم صياغات دقيقة قائمة على الأفعال والمخرجات.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة ملخص تقرير أسبوعي يحتوي على إنجاز واحد وعائق واحد وخطة واحدة!',
      promptEn: 'Draft a quick 3-bullet status update for Sara showing: 1 Achievement, 1 Blocker, 1 Next Step!',
      saraQuestionAr: 'What does your weekly status snapshot look like? Give me Progress, Blocker, and Next Step!',
      saraQuestionEn: 'What does your weekly status snapshot look like? Give me Progress, Blocker, and Next Step!',
      recommendedResponseEn: "Progress: Finished drafting the client onboarding guide. Blocker: Waiting for legal feedback on contract terms. Next Step: Schedule kick-off call once reviewed."
    },
    quiz: [
      {
        questionAr: 'ما هو نموذج PPP الشائع والفعال في كتابة تحديثات الحالة للمشاريع والفرق؟',
        questionEn: 'What does the popular executive status format PPP stand for?',
        options: [
          "People, Places, Promises",
          "Progress, Plans, Problems (Blockers)",
          "Print, Paper, Pen",
          "Past, Present, Past-perfect"
        ],
        correctIndex: 1,
        explanationAr: 'صيغة PPP تعني: Progress (الإنجازات)، Plans (الخطط القادمة)، Problems (المشاكل والمعوقات).'
      }
    ],
    whiteboardNotes: {
      title: 'The Executive 3P Update',
      pointsAr: [
        'Progress: ما أنجزته بالفعل مع أرقام أو نتائج ملموسة',
        'Plans: ما تلتزم بإنجازه خلال الأسبوع القادم',
        'Problems: المعوقات التي تحتاج تدخلاً فورياً لإزالتها',
        'القاعدة الذهبية: سهل القراءة في 30 ثانية'
      ],
      pointsEn: [
        'Progress: Concrete shipped milestones & metrics',
        'Plans: High-impact commitments for the upcoming sprint',
        'Problems: Real blockers requiring leadership help',
        'Golden Rule: Scannable by busy leaders in 30 seconds'
      ],
      chalkHighlight: 'Progress ➡️ Plans ➡️ Problems (PPP Formula)'
    }
  },

  // ==========================================
  // ADVANCED LEVEL (C1) - Lessons 21 to 30
  // ==========================================
  {
    id: 'scw_403',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'صياغة الإيميلات المهنية الذكية والمختصرة (Punchy Professional Emails)',
    titleEn: 'Writing Punchy, Decisive Professional Emails That Get Replies',
    descAr: 'كيف تكتب إيميل عمل احترافي من 5 أسطر يحظى بالرد السريع دون حشو أو إطالة مملة.',
    descEn: 'Master high-impact business communication that respects the recipient’s time.',
    speakingGoalAr: 'كتابة إيميل متابعة (Follow-up) احترافي ومختصر لسارة في دقيقتين.',
    speakingGoalEn: 'Draft a crisp 4-sentence professional follow-up email that triggers immediate action.',
    keyPattern: {
      ruleAr: 'قاعدة الإيميل العصري: 1) تحية وسبب المراسلة المباشر 2) الإجراء المطلوب بوضوح (Action Item) 3) الموعد المتوقع.',
      ruleEn: 'The Executive Email Pattern: Purpose ➡️ Action required ➡️ Next milestone.',
      formula: '[Clear Purpose] + [Key Bullet / Action] + [Gentle Call to Action]'
    },
    practicalExamples: [
      {
        en: "Following up on our discussion yesterday: here are the two action items we agreed to tackle.",
        ar: 'متابعةً لنقاشنا بالأمس: إليك المهمتان الأساسيتان اللتان اتفقنا على إنجازهما.',
        spokenNoteAr: 'بداية حاسمة تحدد سياق الإيميل فوراً دون مقدمات طويلة.'
      },
      {
        en: "Could you confirm if this timeline aligns with your team's bandwidth?",
        ar: 'هل بإمكانك تأكيد ما إذا كان هذا الجدول الزمني يتوافق مع طاقة فريقك الاستيعابية؟',
        spokenNoteAr: 'bandwidth مصطلح مهني شائع يعني سعة الطاقة والوقت المتاح.'
      },
      {
        en: "Looking forward to your feedback by Thursday afternoon.",
        ar: 'أتطلع إلى ملاحظاتكم بحلول بعد ظهر يوم الخميس.',
        spokenNoteAr: 'تحديد موعد لطيف يشجع المستلم على الرد دون تسويف.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing a novel of 500 words with no clear question or request at the end.",
        correct: "Keep it under 100 words with bold action items and a clear deadline.",
        whyAr: 'المدراء والعملاء يتجاهلون الإيميلات الطويلة لضيق وقتهم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة إيميل متابعة من 3 أسطر تطلب فيه اعتماد مسودة المشروع!',
      promptEn: 'Draft a 3-line email asking Sara to approve your draft project!',
      saraQuestionAr: 'Write me a swift email requesting approval on the latest draft before 5 PM!',
      saraQuestionEn: 'Write me a swift email requesting approval on the latest draft before 5 PM!',
      recommendedResponseEn: "Hi Sara, hope all is well. Attached is the revised project draft. Could you take a quick look and give the green light before 5 PM today? Thanks!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل موضع في الإيميل المهني لوضع الطلب أو الإجراء المطلوب (Call to Action)؟',
        questionEn: 'Where should the primary Call to Action be placed in a punchy business email?',
        options: [
          "Buried deep inside the middle paragraph.",
          "Clearly stated in the first 2 sentences or highlighted as a clear closing ask.",
          "In a postscript (P.S.) footnote only.",
          "Never mention an action item."
        ],
        correctIndex: 1,
        explanationAr: 'الإجراء المطلوب يجب أن يكون واضحاً ومباشراً في البداية أو في خاتمة واضحة لضمان الرد السريع.'
      }
    ],
    whiteboardNotes: {
      title: 'The 100-Word Professional Email Rule',
      pointsAr: [
        '1. السبب مباشرة: Following up on our chat...',
        '2. الإجراء: Could you please review...',
        '3. الموعد: ...by Thursday 3 PM?',
        'احترم وقت المتلقي لتنال احترامه وسرعة رده!'
      ],
      pointsEn: [
        '1. Clear hook: "Following up on..."',
        '2. Crisp ask: "Could you please review..."',
        '3. Definite deadline: "...by Thursday?"',
        'Brevity signals executive maturity'
      ],
      chalkHighlight: 'Purpose ➡️ Crisp Ask ➡️ Concrete Deadline'
    }
  },
  {
    id: 'scw_422',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'مذكرات الأزمات والتحليل البعدي للأخطاء (Crisis Incident Post-Mortems)',
    titleEn: 'Blameless Post-Mortems: Analyzing System Failures with Radical Clarity',
    descAr: 'كيف تكتب تقريراً تحليلياً عن عطل أو خطأ كبير في النظام دون تبادل اتهامات، مع التركيز على الأسباب الجذرية وخطوات الوقاية.',
    descEn: 'Write blameless post-mortem reports that deconstruct root causes and prevent recurrence.',
    speakingGoalAr: 'كتابة ملخص تحليل بعدي (Post-Mortem) لسارة يحدد السبب الجذري للعطل وإجراءات الوقاية الدائمة.',
    speakingGoalEn: 'Draft an engineering post-mortem summarizing impact, root cause, and preventive guardrails.',
    keyPattern: {
      ruleAr: 'ثقافة التحليل دون لوم (Blameless): 1) الأثر على المستخدمين (Impact) 2) السبب الجذري الحقيقي (Root cause) 3) الإجراء التصحيحي الدائم (Remediation guardrails).',
      ruleEn: 'The Post-Mortem Structure: Executive Impact ➡️ Timeline ➡️ Root Cause ➡️ Preventive Action Items.',
      formula: 'Impact: [Users affected] ➡️ Root Cause: [Underlying failure] ➡️ Guardrail: [What prevents this forever]'
    },
    practicalExamples: [
      {
        en: "Incident Impact: Approximately 4,000 users experienced checkout timeouts between 14:10 and 14:45 UTC.",
        ar: 'أثر الحادثة: واجه نحو 4 آلاف مستخدم بطئاً في إتمام الدفع بين الساعة 14:10 و 14:45 بتوقيت غرينتش.',
        spokenNoteAr: 'توثيق الأثر بدقة وموضوعية دون تهوين أو تضخيم.'
      },
      {
        en: "Root Cause: A race condition in the cache invalidation script triggered database connection exhaustion.",
        ar: 'السبب الجذري: تسابق برمجي غير متزامن في تفريغ الذاكرة المؤقتة تسبب في استنزاف اتصالات قاعدة البيانات.',
        spokenNoteAr: 'تركيز على الخلل النظامي بدلاً من لوم المبرمج الذي كتب الكود.'
      },
      {
        en: "Action Items: Implement automated rate-limiting and introduce regression tests before deployment.",
        ar: 'إجراءات الوقاية: تطبيق تحديد معدل الطلبات الآلي وإدخال اختبارات رجعية قبل أي إطلاق مستقبلي.',
        spokenNoteAr: 'تحويل الأزمة إلى حماية دائمة للمستقبل.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing 'The outage happened because John pushed bad code and John is fired.'",
        correct: "Focus on systemic vulnerabilities: why did our automated tests fail to catch John's code?",
        whyAr: 'لوم الأشخاص يخلق بيئة خوف وتستر؛ تحليل الأنظمة يبني مؤسسات عملاقة متماسكة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة ملخص Post-Mortem في 3 أسطر عن عطل مؤقت في قاعدة البيانات!',
      promptEn: 'Draft a 3-line blameless post-mortem summary for Sara explaining an outage fix!',
      saraQuestionAr: 'Our servers suffered a 20-minute outage. What is your post-mortem summary?',
      saraQuestionEn: 'Our servers suffered a 20-minute outage. What is your post-mortem summary?',
      recommendedResponseEn: "Impact: Service interrupted for 20 mins. Root Cause: Traffic spike exceeded replica limits. Remediation: Auto-scaling thresholds have been lowered and load-tested."
    },
    quiz: [
      {
        questionAr: 'ما المبدأ الفلسفي الأهم في ثقافة "Blameless Post-Mortem" في كبرى شركات التقنية؟',
        questionEn: 'What is the core philosophical tenet of a "Blameless Post-Mortem"?',
        options: [
          "Finding a scapegoat to blame.",
          "Assuming people had good intentions and analyzing the systemic flaws that allowed failure.",
          "Deleting the server logs.",
          "Pretending the outage never happened."
        ],
        correctIndex: 1,
        explanationAr: 'المبدأ الجوهري هو الافتراض بأن الموظفين تصرفوا بحسن نية والتركيز على الخلل النظامي الذي سمح بحدوث العطل.'
      }
    ],
    whiteboardNotes: {
      title: 'The Blameless Post-Mortem',
      pointsAr: [
        '1. الأثر بالأرقام: Total downtime and users affected',
        '2. السبب الجذري الفعلي: Systemic root cause analysis',
        '3. الحماية الدائمة: Guardrails that make recurrence impossible',
        'القاعدة الذهبية: أصلح النظام، ولا تبحث عن كبش فداء!'
      ],
      pointsEn: [
        '1. Objective Impact: Measurable outage scope',
        '2. Root Cause: Deconstruct systemic failure, not human error',
        '3. Remediation: Concrete guardrails preventing recurrence',
        'Fix the system, never scapegoat the engineer'
      ],
      chalkHighlight: 'Impact ➡️ Systemic Root Cause ➡️ Permanent Guardrails'
    }
  },
  {
    id: 'scw_423',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'مذكرات الأمازون والصفحة الواحدة الاستراتيجية (The Amazon-Style 1-Pager Memo)',
    titleEn: 'Writing Narrative Strategy Memos: The Amazon-Style 1-Pager',
    descAr: 'كيف تكتب مذكرة استراتيجية سردية بدون شرائح باوربوينت: سياق المشكلة، والخيارات، وتبرير القرار.',
    descEn: 'Master narrative business memos: replace bullet points with cohesive strategic logic.',
    speakingGoalAr: 'كتابة مذكرة صفحة واحدة لسارة تبرر فيها الاستثمار في تجربة المستخدم الصوتي.',
    speakingGoalEn: 'Draft an Amazon-style strategic narrative memo arguing for a product pivot.',
    keyPattern: {
      ruleAr: 'مذكرة الأمازون السردية: 1) السياق والفرصة 2) المبادئ القيادية الحاكمة 3) خيارات الاستراتيجية المقارنة 4) التوصية الحاسمة والأسئلة الشائعة (FAQ).',
      ruleEn: 'The Narrative 1-Pager: Context & Tenets ➡️ Customer Friction ➡️ Proposed Architecture ➡️ FAQs & Metrics.',
      formula: 'Context ➡️ The Strategic Bet ➡️ Tenets ➡️ Proposed Path & Projected ROI'
    },
    practicalExamples: [
      {
        en: "Context: While our competitors rely on static multiple-choice drills, user demand has shifted drastically toward conversational confidence.",
        ar: 'السياق: بينما يعتمد منافسونا على تدريبات الخيارات المتعددة الساكنة، تحول طلب المستخدمين جذرياً نحو ثقة المحادثة الواقعية.',
        spokenNoteAr: 'رسم سياق السوق بوضوح يبين ضرورة التحرك الاستراتيجي.'
      },
      {
        en: "Tenet: We prioritize real-time voice reflex over theoretical grammar memorization in every product decision.",
        ar: 'المبدأ الحاكم: نضع رد الفعل الصوتي الفوري كأولوية تسبق حفظ القواعد النظري في كل قرار تصميمي.',
        spokenNoteAr: 'المبادئ الحاكمة (Tenets) تحسم الخلافات الداخلية للفريق.'
      },
      {
        en: "Strategic Proposal: Pivot 40% of development resources into dedicated voice simulation modules.",
        ar: 'المقترح الاستراتيجي: إعادة توجيه 40% من موارد التطوير نحو وحدات المحاكاة الصوتية المتخصصة.',
        spokenNoteAr: 'توصية واضحة ومحددة بالأرقام.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Creating a deck of 50 slides full of animations and zero prose sentences.",
        correct: "Write clean narrative paragraphs where the logic of your argument must stand on its own merits.",
        whyAr: 'السرد النثري يكشف عيوب التفكير التي تختبئ خلف رسوم الباوربوينت المتحركة.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة فقرة استراتيجية من مذكرة من صفحة واحدة تبرر فيها إضافة 30 درساً صوتياً لكل مسار!',
      promptEn: 'Draft an executive narrative paragraph justifying expanding each curriculum track to 30 lessons!',
      saraQuestionAr: 'Why should we invest in expanding each of our tracks to 30 dedicated lessons?',
      saraQuestionEn: 'Why should we invest in expanding each of our tracks to 30 dedicated lessons?',
      recommendedResponseEn: "Context: Learners require sustained immersion to cross the threshold from hesitant speech to effortless instinct. By providing 30 tiered lessons per track, we guarantee a comprehensive journey from Starter to C1 mastery, dramatically boosting long-term user retention."
    },
    quiz: [
      {
        questionAr: 'لماذا تحظر شركات رائدة مثل أمازون عروض الباوربوينت في اجتماعات القيادة وتستبدلها بالمذكرات السردية (Narrative Memos)؟',
        questionEn: 'Why did Amazon ban PowerPoint in leadership meetings in favor of 6-page narrative memos?',
        options: [
          "Because projectors are too expensive.",
          "Because narrative memos force clear, deep thinking and expose logical flaws that slides hide.",
          "Because nobody knew how to use software.",
          "To finish meetings in 30 seconds."
        ],
        correctIndex: 1,
        explanationAr: 'المذكرات السردية تجبر الكاتب على التفكير العميق والمنطقي المتسلسل، وتكشف أي ثغرات فكرية قد تخفيها الشرائح البصرية.'
      }
    ],
    whiteboardNotes: {
      title: 'The Narrative 1-Pager Architecture',
      pointsAr: [
        '1. Context: المشهد الراهن والفرصة الضائعة في السوق',
        '2. Tenets: المبادئ التوجيهية الثابتة التي تحكم القرار',
        '3. Proposed Strategy: الرهان الاستراتيجي والحل المقترح',
        '4. Projected ROI: العائد المتوقع ومقاييس النجاح',
        'الكتابة الواضحة دليل على التفكير الواضح!'
      ],
      pointsEn: [
        '1. Context: Market dynamics and latent demand',
        '2. Tenets: Non-negotiable philosophical principles',
        '3. The Bet: Explicit strategic recommendation',
        '4. ROI & Metrics: Quantifiable success markers',
        'Clear writing reflects clear strategic thinking'
      ],
      chalkHighlight: 'Context ➡️ Core Tenets ➡️ Strategic Bet ➡️ Measurable ROI'
    }
  },
  {
    id: 'scw_424',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'صياغة العروض التجارية والمقترحات التعاقدية (Writing High-Stakes Business Proposals)',
    titleEn: 'Writing Winning B2B Proposals: Executive Summaries & ROI Justifications',
    descAr: 'كيف تكتب ملخصاً تنفيذياً لمقترح تجاري يقنع مجالس الإدارة والعملاء الكبار بتوقيع العقد فوراً.',
    descEn: 'Structure compelling enterprise proposals that articulate quantifiable commercial ROI.',
    speakingGoalAr: 'كتابة ملخص تنفيذي لمقترح شراكة استراتيجية في 4 أسطر لسارة (صانعة القرار).',
    speakingGoalEn: 'Draft a high-impact B2B executive proposal summary demonstrating 3x ROI.',
    keyPattern: {
      ruleAr: 'الملخص التنفيذي للمقترح: التحدي الراهن للعميل ➡️ الحل المقترح ➡️ العائد المالي المتوقع (ROI) ➡️ الجدول الزمني للتنفيذ.',
      ruleEn: 'The Proposal Matrix: Client Problem ➡️ Tailored Solution ➡️ Financial Payoff (ROI) ➡️ Rollout Roadmap.',
      formula: 'Client Challenge: [Friction] ➡️ Proposed Solution: [Value] ➡️ Projected ROI: [Metric] ➡️ Implementation: [Timeline]'
    },
    practicalExamples: [
      {
        en: "Executive Summary: By modernizing the customer communication workflow, this initiative projects a 35% reduction in ticket resolution time.",
        ar: 'الملخص التنفيذي: من خلال تحديث مسار التواصل مع العملاء، تتوقع هذه المبادرة خفض زمن حل التذاكر بنسبة 35%.',
        spokenNoteAr: 'البدء بالأثر المالي المباشر على كفاءة الشركة.'
      },
      {
        en: "Investment & Return: A projected 3.2x ROI within the first twelve months of full enterprise rollout.",
        ar: 'الاستثمار والعائد: عائد متوقع قدره 3.2 ضعف الاستثمار خلال أول اثني عشر شهراً من الإطلاق الكامل.',
        spokenNoteAr: 'لغة العائد على الاستثمار هي الحجة الأكثر إقناعاً للمدير المالي.'
      },
      {
        en: "Implementation Milestones: Phased pilot in Month 1, full enterprise deployment across all departments by Month 3.",
        ar: 'محطات التنفيذ: مشروع تجريبي في الشهر الأول، وإطلاق كامل على مستوى المؤسسة بحلول الشهر الثالث.',
        spokenNoteAr: 'تدرج آمن يقلل المخاطرة في ذهن العميل.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Starting the proposal with 20 pages about your company's history, awards, and founder's biography.",
        correct: "Start with the CLIENT's problem and how your solution will generate revenue or save costs for them.",
        whyAr: 'العميل لا يهتم بتاريخك؛ هو يهتم فقط بما يمكنك حله لمشاكله وأرباحه اليوم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'قدم لسارة ملخصاً تنفيذياً لمقترح تدريب منسوبي شركتها على التحدث بالإنجليزية في 3 أسطر!',
      promptEn: 'Draft an executive B2B proposal summary offering English fluency coaching for Sara’s team!',
      saraQuestionAr: 'Why should our executive board approve funding for this corporate fluency program?',
      saraQuestionEn: 'Why should our executive board approve funding for this corporate fluency program?',
      recommendedResponseEn: "Executive Summary: Cross-border communication bottlenecks delay regional project handoffs by 20%. This 8-week fluency program eliminates hesitation on international calls, directly unlocking smoother multinational execution."
    },
    quiz: [
      {
        questionAr: 'ما العامل الحاسم الذي يبحث عنه صانع القرار في أول صفحة من أي مقترح تجاري (Proposal)؟',
        questionEn: 'What is the decisive element an executive looks for on page 1 of a business proposal?',
        options: [
          "The company’s color palette.",
          "Clear understanding of their core business challenge and the projected ROI.",
          "The list of all holidays.",
          "Poetic descriptions of the team."
        ],
        correctIndex: 1,
        explanationAr: 'صانع القرار يبحث في المقام الأول عن فهمك العميق لمشكلته والعائد الاستثماري الملموس (ROI) الذي ستحققه له.'
      }
    ],
    whiteboardNotes: {
      title: 'The B2B Winning Proposal Arc',
      pointsAr: [
        '1. مشكلة العميل: The Client’s Critical Friction',
        '2. الحل المخصص: Tailored Value Architecture',
        '3. العائد المالي: Quantifiable Commercial ROI (3x returns)',
        '4. الأمان: Phased risk-free rollout milestones',
        'اجعل العميل بطل القصة، لا شركتك أنت!'
      ],
      pointsEn: [
        '1. Client-centric friction definition',
        '2. Tailored solution eliminating friction',
        '3. Explicit financial payoff (ROI / cost-savings)',
        '4. Phased low-risk deployment roadmap',
        'Make the client the hero of the proposal'
      ],
      chalkHighlight: 'Client Friction ➡️ Tailored Architecture ➡️ 3x ROI ➡️ Phased Roadmap'
    }
  },
  {
    id: 'scw_425',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'المفاوضات المكتوبة وإعادة صياغة الشروط (Diplomatic Contract Revisions & Redlines)',
    titleEn: 'Written Negotiations: Pushing Back on Contract Clauses Without Hostility',
    descAr: 'كيف ترفض بنداً تعاقدياً مجحفاً، أو تطلب تعديل شروط الدفع، بأسلوب قانوني ودبلوماسي يحمي حقوقك دون توتر.',
    descEn: 'Negotiate contract terms and redlines diplomatically, proposing balanced compromise language.',
    speakingGoalAr: 'كتابة بريد تفاوضي لسارة تطلب فيه تعديل بند حقوق الملكية الفكرية وشروط الدفع.',
    speakingGoalEn: 'Draft a diplomatic contract counter-proposal addressing intellectual property and payment terms.',
    keyPattern: {
      ruleAr: 'في التفاوض المكتوب: اعترف بسلامة نية الطرف الآخر ➡️ اشرح المخاطر القانونية المتبادلة ➡️ اطرح صياغة بديلة متوازنة جاهزة للاعتماد (Proposed Redline).',
      ruleEn: 'The Redline Diplomacy Framework: Affirm mutual alignment ➡️ identify specific clause friction ➡️ offer balanced ready-to-sign language.',
      formula: "We are aligned on the scope; however, regarding Clause [X], we propose adjusting the language to: [Proposed Language]."
    },
    practicalExamples: [
      {
        en: "We are thrilled with the overall scope of the partnership; however, regarding section 4.2 (Liability), the current uncapped clause presents significant exposure on our end.",
        ar: 'نحن سعداء للغاية بالنطاق العام للشراكة؛ ومع ذلك، بخصوص البند 4.2 (المسؤولية)، فإن صياغة المسؤولية غير المحدودة تشكل خطراً تعاقدياً كبيراً علينا.',
        spokenNoteAr: 'تحديد موضع التحفظ بدقة مع إظهار الحماس العام للاتفاق.'
      },
      {
        en: "To ensure a mutually equitable arrangement, we propose capping liability at the total annual contract value.",
        ar: 'لضمان ترتيب عادل ومنصف للطرفين، نقترح وضع حد أقصى للمسؤولية يعادل القيمة السنوية الإجمالية للعقد.',
        spokenNoteAr: 'اقتراح حل وسط متوازن ومعتمد في المعايير الصناعية.'
      },
      {
        en: "Attached is our suggested redline for your legal counsel's review. Let us know if this works on your side.",
        ar: 'مرفق لكم مسودتنا المعدلة لمراجعتها من قِبل مستشاركم القانوني. تفضلوا بإخطارنا بما إذا كان هذا يناسبكم.',
        spokenNoteAr: 'تقديم صياغة جاهزة يسارع في إغلاق الصفقة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing: 'Your contract is unfair and predatory, we will never sign this!'.",
        correct: "Never take contract clauses personally; treat redlines as collaborative risk management.",
        whyAr: 'المفاوضات التعاقدية هي إدارة مخاطر مشتركة وليست عداءً شخصياً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'سارة أرسلت عقداً بدفعة واحدة بعد 90 يوماً! اقترح تعديل شرط الدفع إلى 50% مقدماً و 50% عند التسليم!',
      promptEn: 'Negotiate payment terms diplomatically with Sara: Propose a 50/50 split instead of Net-90!',
      saraQuestionAr: 'Our standard terms specify full payment Net-90 after completion. Does this work?',
      saraQuestionEn: 'Our standard terms specify full payment Net-90 after completion. Does this work?',
      recommendedResponseEn: "We appreciate your standard terms; however, to maintain sustained team allocation on our end, we typically structure projects around 50% upfront and 50% on final milestone delivery. Would this structure align with your accounting flow?"
    },
    quiz: [
      {
        questionAr: 'ما المصطلح الشائع لوثيقة العقد التي تظهر التعديلات والشطب والإضافات المقترحة بخطوط ملونة؟',
        questionEn: 'What is the standard legal term for a marked-up contract draft showing proposed edits?',
        options: [
          "Redline (المسودة المعلمة بالتعديلات)",
          "Blue paper",
          "Black box",
          "Whiteboard draft"
        ],
        correctIndex: 0,
        explanationAr: 'مصطلح "Redline" هو المصطلح القانوني المعتمد للنسخة التي توضح التعديلات والشطب والإضافات التعاقدية المقترحة.'
      }
    ],
    whiteboardNotes: {
      title: 'The Written Negotiation Playbook',
      pointsAr: [
        '1. الإشادة بالاتفاق العام: Thrilled with the partnership scope',
        '2. تحديد البند بدقة: Section 4.2 presents mutual exposure',
        '3. المبدأ: To ensure a mutually equitable structure...',
        '4. الصياغة البديلة: We propose the following redline language...',
        'التفاوض الراقي يحمي حقوقك ويقوي الشراكة'
      ],
      pointsEn: [
        '1. Affirm core commercial intent',
        '2. Isolate specific clause exposure without drama',
        '3. Anchor in industry fairness ("Mutually equitable")',
        '4. Provide drop-in replacement redline language',
        'Cool professionalism seals enterprise partnerships'
      ],
      chalkHighlight: 'Affirm Scope ➡️ Isolate Clause ➡️ Propose Balanced Redline'
    }
  },
  {
    id: 'scw_426',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'كتابة مقالات الرأي والقيادة الفكرية (Thought Leadership Op-Eds)',
    titleEn: 'Writing Provocative Thought Leadership: Op-Eds for Forbes & Industry Press',
    descAr: 'كيف تكتب مقال رأي قيادي يتحدى الأفكار السائدة في مجالك، ويدعمه بالبيانات، ويؤسس لمكانتك كمرجع مهني.',
    descEn: 'Author compelling industry op-eds that challenge orthodoxy and establish domain authority.',
    speakingGoalAr: 'صياغة أطروحة مقال رأي قيادي (Op-Ed) لسارة تتحدى الطرق التقليدية لتعليم اللغات.',
    speakingGoalEn: 'Draft an op-ed thesis and supporting evidence deconstructing a persistent industry myth.',
    keyPattern: {
      ruleAr: 'هيكل مقال القيادة الفكرية: 1) نقد المسلّمة الشائعة (The Conventional Myth) 2) الدليل التجريبي الواقعي 3) النموذج البديل الجديد (The New Paradigm) 4) نداء التغيير.',
      ruleEn: 'The Op-Ed Architecture: The Status Quo Fallacy ➡️ Empirical Reality Check ➡️ The New Operating Model ➡️ The Call to Action.',
      formula: 'The industry assumes [Status Quo], but real data proves [Emerging Reality]. Here is how we must adapt.'
    },
    practicalExamples: [
      {
        en: "For decades, language education has operated on a manufacturing-era assembly line: grammar rules first, speaking last.",
        ar: 'لعقود خلت، عمل تعليم اللغات على خط إنتاج ينتمي لعصر الثورة الصناعية: القواعد أولاً، والتحدث في النهاية.',
        spokenNoteAr: 'تشبيه بلاغي قوي يكشف قدم النموذج القديم.'
      },
      {
        en: "Yet cognitive neuroscience proves that speech is a sensorimotor reflex, not a mathematical equation.",
        ar: 'إلا أن علوم الأعصاب المعرفية تثبت أن التحدث هو رد فعل حسي حركي، وليس معادلة رياضية.',
        spokenNoteAr: 'الاستناد إلى علوم موثوقة لإسناد الأطروحة.'
      },
      {
        en: "The institutions that fail to embrace interactive voice simulation will find themselves training students for a world that no longer exists.",
        ar: 'المؤسسات التي تعجز عن تبني المحاكاة الصوتية التفاعلية ستجد نفسها تدرب طلاباً لعالم لم يعد له وجود.',
        spokenNoteAr: 'تحذير استراتيجي يوقظ القادة للمستقبل.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing a bland summary of what everyone already agrees on.",
        correct: "True thought leadership must take a bold, defensible stance on a controversial trend.",
        whyAr: 'المقالات التي تكرر البديهيات لا يقرأها أحد؛ القيادة الفكرية تتطلب شجاعة الطرح الجديد.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة افتتاحية مقال رأي قيادي في 3 أسطر تتحدى فيه مقولة "الطلاقة تتطلب السفر للخارج"!',
      promptEn: 'Draft an op-ed opener challenging the myth that immersion requires moving abroad!',
      saraQuestionAr: 'How would you challenge the belief that learners must live abroad to achieve true fluency?',
      saraQuestionEn: 'How would you challenge the belief that learners must live abroad to achieve true fluency?',
      recommendedResponseEn: "We've long romanticized moving abroad as the only true path to fluency. Yet thousands live in foreign capitals for years without uttering a fluent sentence. Physical location is an illusion; deliberate daily vocal engagement is the true territory."
    },
    quiz: [
      {
        questionAr: 'ما العنصر الأساسي الذي يميز "مقال القيادة الفكرية" الحقيقي عن المقال الإخباري العادي؟',
        questionEn: 'What primarily distinguishes an authentic "Thought Leadership Op-Ed" from standard reporting?',
        options: [
          "It lists yesterday's stock prices.",
          "It presents an original, bold thesis that challenges the industry status quo backed by data.",
          "It is completely written in capital letters.",
          "It contains no opinions whatsoever."
        ],
        correctIndex: 1,
        explanationAr: 'القيادة الفكرية تتميز بطرح أطروحة جريئة وأصيلة تتحدى الوضع الراهن مدعومة بالأدلة والتحليل العميق.'
      }
    ],
    whiteboardNotes: {
      title: 'The Thought Leadership Blueprint',
      pointsAr: [
        '1. الخطاف: كشف زيف الخرافة الشائعة (The Conventional Myth)',
        '2. الدليل: أرقام، أبحاث، وتجارب حية من الواقع',
        '3. النموذج الجديد: The New Paradigm',
        '4. نداء التغيير: حث القادة على إعادة التفكير قبل فوات الأوان'
      ],
      pointsEn: [
        '1. Challenge orthodox assumptions',
        '2. Present empirical counter-evidence',
        '3. Propose a coherent forward-looking paradigm',
        '4. Conclude with an urgent call to action',
        'Originality + Courage = Industry Authority'
      ],
      chalkHighlight: 'Status Quo Myth ➡️ Empirical Evidence ➡️ New Paradigm ➡️ Call to Action'
    }
  },
  {
    id: 'scw_427',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'كتابة الخطب والكلمات المسرحية للأذن (Writing for the Ear: Speechwriting Craft)',
    titleEn: 'Speechwriting Craft: Crafting Scripts Designed for the Human Ear',
    descAr: 'كيف تكتب نص كلمة أو خطاب لإلقائه على المسرح: جمل قصيرة، إيقاع حركي، وعبارات خالدة تعلق بالأذهان.',
    descEn: 'Write speeches meant to be spoken aloud: sensory imagery, rhythmic cadence, and punchy soundbites.',
    speakingGoalAr: 'كتابة مسودة خطاب مسرحي من 4 أسطر لسارة يعتمد على الجمل القصيرة والإيقاع السمعي.',
    speakingGoalEn: 'Draft an oratorical speech excerpt optimized for vocal delivery and auditory retention.',
    keyPattern: {
      ruleAr: 'الكتابة للأذن تختلف عن كتابة المقالات: استخدم جملاً قصيرة جداً، كرر الكلمات المفتاحية عمداً (Anaphora)، وضع نقاط وقوف للتنفس، واستخدم كلمات حسية يراها السامع.',
      ruleEn: 'Writing for the Ear: Short conversational sentences, intentional repetition (anaphora), and vivid sensory words.',
      formula: '[Short Sentence]. [Fragment for impact]. [Repetition with crescendo]. [The memorable soundbite].'
    },
    practicalExamples: [
      {
        en: "We didn't come here to play it safe. We came here to build. We came here to transform.",
        ar: 'لم نأتِ إلى هنا لنلعب في المنطقة الآمنة. جئنا إلى هنا لنبني. جئنا إلى هنا لنحدث التحول.',
        spokenNoteAr: 'تكرار "We came here to" يرسخ الإيقاع في أذن السامع بقوة.'
      },
      {
        en: "Ideas are cheap. Execution is everything.",
        ar: 'الأفكار رخيصة ومتوفرة. التنفيذ هو كل شيء.',
        spokenNoteAr: 'جملة صوتية رنانة (Soundbite) يسهل تداولها واقتباسها.'
      },
      {
        en: "Look around this room. Every breakthrough in human history began with someone being called foolish.",
        ar: 'انظروا حولكم في هذه القاعة. كل انطلاقة كبرى في تاريخ البشرية بدأت بشخص وُصف بالجنون في بدايته.',
        spokenNoteAr: 'توجيه حسي يربط المستمع بالمكان واللحظة.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing 50-word compound sentences with multiple semicolons and academic passive voice for a speech.",
        correct: "Keep sentences under 12 words; the ear cannot 're-read' what it didn't catch the first time.",
        whyAr: 'المستمع لا يملك زراً للرجوع إلى الوراء؛ الجمل الطويلة تضيع المعنى وتشتت الجمهور.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب نص خطاب مسرحي من 3 أسطر لسارة لإلهام طلاب الإنجليزية باستخدام التكرار البلاغي!',
      promptEn: 'Draft a 3-line speech script for Sara designed purely for the ear using intentional repetition!',
      saraQuestionAr: 'Write me a 3-line speech to ignite the room at our upcoming student summit!',
      saraQuestionEn: 'Write me a 3-line speech to ignite the room at our upcoming student summit!',
      recommendedResponseEn: "Do not wait for perfection. Speak through the fear. Speak through the stumble. Because every mistake is proof that you are boldly stepping forward!"
    },
    quiz: [
      {
        questionAr: 'ما القاعدة الذهبية الأولى عند كتابة نصوص الخطب والكلمات المسرحية الموجهة للإلقاء (Speechwriting)؟',
        questionEn: 'What is the number one golden rule of speechwriting for the stage?',
        options: [
          "Use the longest academic words possible.",
          "Write for the ear, not the eye: keep sentences punchy, rhythmic, and sensory.",
          "Include full mathematical proofs.",
          "Never look at the audience."
        ],
        correctIndex: 1,
        explanationAr: 'القاعدة الذهبية هي "الكتابة للأذن": استخدام جمل قصيرة، وإيقاع صوتي متناغم، وصور حسية يسهل على المستمع التقاطها فوراً.'
      }
    ],
    whiteboardNotes: {
      title: 'Speechwriting Rules of Thumb',
      pointsAr: [
        '1. اكتب للأذن: الجملة لا تتعدى 10-12 كلمة',
        '2. التكرار المتعمد (Anaphora): يرسخ الإيقاع في الوجدان',
        '3. العبارة الرنانة (Soundbite): جملة واحدة تعلق في الأذهان لسنوات',
        '4. الوقفات المحسوبة: ضع إشارة [Pause] في النص لتمنح نفسك وقتاً للتنفس'
      ],
      pointsEn: [
        '1. Write for the ear: Keep sentences under 12 words',
        '2. Intentional Anaphora: Repetitive rhythmic phrasing',
        '3. Soundbite craft: Create tweetable, memorable hooks',
        '4. Built-in pauses: Score the script for breath and cadence'
      ],
      chalkHighlight: 'Short Sentences ➡️ Anaphora Rhythm ➡️ Punchy Soundbites'
    }
  },
  {
    id: 'scw_428',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'مذكرات الخيارات الاستراتيجية والتوصيات (Executive Decision Memos: Options A, B, C)',
    titleEn: 'Decision Memos: Framing Strategic Trade-offs (Option A vs B vs C)',
    descAr: 'كيف تقدم للمدير التنفيذي أو مجلس الإدارة مذكرة قرار استراتيجية تقارن بين 3 خيارات وتوصي بالخيار الأمثل.',
    descEn: 'Structure executive decision memos with balanced trade-off matrices and clear recommendations.',
    speakingGoalAr: 'كتابة مذكرة قرار لسارة تفاضل بين خيارين لتطوير المنتج مع التوصية الصريحة بأحدهما.',
    speakingGoalEn: 'Draft an executive options memo comparing trade-offs and stating a decisive recommendation.',
    keyPattern: {
      ruleAr: 'هيكل مذكرة القرار: 1) القرار المطلوب (Decision Needed) 2) مقارنة الخيارات (Option A vs Option B) مع الإيجابيات والسلبيات 3) التوصية الحاسمة والمبرر.',
      ruleEn: 'The Decision Memo Structure: Decision Needed ➡️ Options Matrix (Pros/Cons/Cost) ➡️ Explicit Recommendation.',
      formula: 'Decision Needed: [X] ➡️ Option A: [Details] ➡️ Option B: [Details] ➡️ Recommended: [Choice & Rationale]'
    },
    practicalExamples: [
      {
        en: "Decision Needed: Select our enterprise infrastructure architecture for the 2026 expansion.",
        ar: 'القرار المطلوب: اختيار معمارية البنية التحتية للمؤسسة للتوسع في عام 2026.',
        spokenNoteAr: 'تحديد القرار المطلوب بوضوح في أول سطر.'
      },
      {
        en: "Option A: Build proprietary in-house models (High upfront capital, full IP control). Option B: Partner with established enterprise API (Low latency, zero maintenance overhead).",
        ar: 'الخيار أ: بناء نماذج خاصة داخلية (تكلفة أولية عالية، ملكية كاملة). الخيار ب: الشراكة مع واجهة برمجية معتمدة (سرعة استجابة، صفر تكاليف صيانة).',
        spokenNoteAr: 'مقارنة عادلة تزن التكاليف والمخاطر.'
      },
      {
        en: "Recommendation: We strongly recommend Option B. Speed to market outweighs proprietary ownership at our current stage of growth.",
        ar: 'التوصية: نوصي بشدة بالخيار ب؛ سرعة الوصول للسوق تفوق أهمية الملكية الحصرية في مرحلة نمونا الراهنة.',
        spokenNoteAr: 'توصية حاسمة تبرر سبب الاختيار الاستراتيجي.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Presenting only one option and hiding all alternatives, forcing leadership into a corner.",
        correct: "Present viable alternative options honestly; mature leaders earn trust by demonstrating they considered trade-offs.",
        whyAr: 'طرح الخيارات البديلة يثبت نضجك التحليلي ويبني ثقة القيادة في سلامة قرارك.'
      }
    ],
    speakingChallenge: {
      promptAr: 'قدم لسارة مذكرة قرار تفاضل بين خيارين: (أ) التعلم الذاتي فقط و (ب) التعلم الموجه اليومي مع سارة!',
      promptEn: 'Draft an executive Decision Memo comparing self-study vs daily interactive Sara mentoring!',
      saraQuestionAr: 'Frame a decision memo: Which learning modality yields the highest ROI for busy professionals?',
      saraQuestionEn: 'Frame a decision memo: Which learning modality yields the highest ROI for busy professionals?',
      recommendedResponseEn: "Decision Needed: Optimal learning model. Option A: Self-study apps (Low cost, high drop-off rate). Option B: Daily interactive Sara sessions (Focused immersion, proven reflex building). Recommendation: Option B delivers 3x faster conversational breakthroughs."
    },
    quiz: [
      {
        questionAr: 'ما الخطأ الأكبر الذي يقع فيه الموظفون عند تقديم مذكرات اتخاذ القرار (Decision Memos) للقيادة؟',
        questionEn: 'What is the most fatal flaw when drafting executive decision memos?',
        options: [
          "Failing to make a clear, definitive recommendation (leaving the decision completely open with no guidance).",
          "Using clean formatting.",
          "Including numbers.",
          "Printing on white paper."
        ],
        correctIndex: 0,
        explanationAr: 'الخطأ الأكبر هو التردد وعدم تقديم توصية صريحة؛ القادة يريدون تحليلك وخبرتك وتوصيتك الواضحة، وليس مجرد سرد محايد.'
      }
    ],
    whiteboardNotes: {
      title: 'The Decision Memo Template',
      pointsAr: [
        '1. القرار المطلوب: Decision Needed (واضح ومحدد في سطر)',
        '2. الخيار أ: المميزات، العيوب، والتكلفة',
        '3. الخيار ب: المميزات، العيوب، والتكلفة',
        '4. التوصية الحاسمة: Recommendation & Strategic Rationale',
        'القادة يدفعون مقابل قدرتك على التوصية الحكيمة!'
      ],
      pointsEn: [
        '1. Decision Needed: Crisp single-line framing',
        '2. Options Matrix: Balanced pros, cons, and financial cost',
        '3. Explicit Recommendation: Never be neutral; take a stand',
        '4. Strategic Rationale: Why this option wins now',
        'Leadership values clarity and reasoned courage'
      ],
      chalkHighlight: 'Decision Needed ➡️ Options Matrix ➡️ Decisive Recommendation'
    }
  },
  {
    id: 'scw_429',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'تقارير المستثمرين الدورية (Monthly Investor Updates: The Good, The Bad & The Ask)',
    titleEn: 'Monthly Investor Updates: The Good, The Bad & The Specific Ask',
    descAr: 'كيف تكتب رسالة تحديث شهرية للمستثمرين ورجال الأعمال: الإنجازات، التحديات بشفافية، وطلب المساعدة بدقة.',
    descEn: 'Write transparent, trusted monthly investor updates featuring hard metrics and precise asks.',
    speakingGoalAr: 'كتابة تقرير مستثمرين شهري لسارة مكون من 3 أقسام: The Good، The Bad، و The Ask.',
    speakingGoalEn: 'Draft an executive investor newsletter deconstructing traction, hurdles, and a specific ask.',
    keyPattern: {
      ruleAr: 'ثلاثية تحديث المستثمرين: 1) The Good (أرقام النمو والإنجازات) 2) The Bad (التحديات والعقبات بشفافية) 3) The Ask (طلب محدد بالاسم لفتح أبواب أو توظيف).',
      ruleEn: 'The Investor Newsletter Triad: The Good (Metrics & Wins) ➡️ The Bad (Honest bottlenecks) ➡️ The Ask (Targeted introductions).',
      formula: 'Highlights & Metrics ➡️ Lowlights & Headwinds ➡️ The Specific Ask'
    },
    practicalExamples: [
      {
        en: "The Good: Monthly active learners grew 32% to 24,000, and our lesson completion rate reached an all-time high of 88%.",
        ar: 'الجانب الإيجابي: نما عدد المتعلمين النشطين شهرياً بنسبة 32% إلى 24 ألفاً، وحقق معدل إكمال الدروس رقماً قياسياً بلغ 88%.',
        spokenNoteAr: 'أرقام ملموسة وصادقة تثبت الزخم.'
      },
      {
        en: "The Bad: Enterprise B2B sales cycles are taking 45 days longer than projected due to multi-tiered legal reviews.",
        ar: 'الجانب التحدي: دورات مبيعات الشركات الكبرى تستغرق 45 يوماً أطول من المتوقع بسبب المراجعات القانونية المتعددة.',
        spokenNoteAr: 'الاعتراف بالتحدي بشجاعة يبني ثقة المستثمرين.'
      },
      {
        en: "The Ask: We are looking for warm introductions to Chief Learning Officers at telecom firms across the region.",
        ar: 'الطلب المحدد: نبحث عن تزكيات ومعارف مباشرة مع مسؤولي التعليم والتدريب في شركات الاتصالات بالمنطقة.',
        spokenNoteAr: 'طلب دقيق ومحدد يمكن للمستثمر مساعدتك فيه فوراً.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Sending updates only when things are great and vanishing for 6 months when problems arise.",
        correct: "Consistent monthly transparency—especially sharing the Bad—is what turns investors into lifelong allies.",
        whyAr: 'المستثمرون يعلمون أن الشركات الناشئة تواجه صعوبات؛ الاختفاء يثير الرعب، والشفافية تولد الدعم.'
      }
    ],
    speakingChallenge: {
      promptAr: 'اكتب لسارة تقريراً شهرياً للمستثمرين عن مسارك التعليمي: الإيجابيات، التحديات، وطلب مساعدة محدد!',
      promptEn: 'Draft an investor-style monthly update on your English growth: The Good, The Bad, and The Ask!',
      saraQuestionAr: 'If you gave an investor report on your learning venture, what would your update look like?',
      saraQuestionEn: 'If you gave an investor report on your learning venture, what would your update look like?',
      recommendedResponseEn: "The Good: Completed 30 lessons across all 4 pillars with 90% retention. The Bad: Still working through fast connected speech on C1 reading texts. The Ask: Would love your help running a mock 10-minute panel interview!"
    },
    quiz: [
      {
        questionAr: 'ما أفضل طريقة لصياغة "The Ask" (طلب المساعدة) في تقارير المستثمرين الشهرية؟',
        questionEn: 'What makes an "Ask" effective in a monthly investor update?',
        options: [
          "Asking vaguely for 'general advice and lots of money'.",
          "A hyper-specific request: 'An introduction to Person X or 3 candidate referrals for Role Y'.",
          "Leaving it blank.",
          "Demanding they do your daily tasks."
        ],
        correctIndex: 1,
        explanationAr: 'الطلب المحدد للغاية (مثل طلب معرفة بشخص معين أو منصب وظيفي محدد) يسهل على المستثمر إنجازه في 60 ثانية.'
      }
    ],
    whiteboardNotes: {
      title: 'The Monthly Investor Update Template',
      pointsAr: [
        '1. The Good: الأرقام الحقيقية ومعدلات النمو',
        '2. The Bad: العقبات بشفافية تامة مع خطة المعالجة',
        '3. Runway: المدى المالي المتبقي بالأشهر',
        '4. The Ask: طلب محدد بالاسم لفتح علاقات أو توظيف',
        'الشفافية الدائمة تبني ثقة الملايين'
      ],
      pointsEn: [
        '1. The Good: Hard numbers, retention, and growth metrics',
        '2. The Bad: Honest bottlenecks and headwinds',
        '3. Runway: Exact months of cash remaining',
        '4. The Ask: Actionable, targeted introductions',
        'Unflinching transparency commands lifelong loyalty'
      ],
      chalkHighlight: 'The Good (Metrics) ➡️ The Bad (Honesty) ➡️ The Ask (Targeted)'
    }
  },
  {
    id: 'scw_430',
    pillarId: 'writing',
    pillarNameAr: 'الكتابة التعبيرية الحوارية',
    pillarNameEn: 'Conversational Writing & Quick Messaging',
    pillarIcon: '✍️',
    level: 'متقدم (Advanced)',
    levelCode: 'C1',
    titleAr: 'صياغة البيانات التأسيسية وبيان الرؤية الملهمة (Writing Inspiring Manifestos & Vision Statements)',
    titleEn: 'Writing Historic Manifestos: Words That Galvanize Movements & Teams',
    descAr: 'كيف تكتب بياناً تأسيسياً (Manifesto) لمشروعك أو شركتك يحرك القلوب كبيان أبل التاريخي "Think Different".',
    descEn: 'Author timeless company manifestos and vision declarations that unite and mobilize humans.',
    speakingGoalAr: 'كتابة بيان رؤية من 4 أسطر لسارة يلهم كل من يريد تعلم التحدث بالإنجليزية دون خوف.',
    speakingGoalEn: 'Draft an authentic, galvanizing learning manifesto ready to inspire thousands.',
    keyPattern: {
      ruleAr: 'هيكل البيان التأسيسي (The Manifesto): 1) نداء للمؤمنين بالفكرة 2) إعلان رفض الوضع الراهن 3) إعلان القيم الجوهرية 4) الوعد بالمستقبل.',
      ruleEn: 'The Manifesto Arc: Call to the faithful ➡️ Rejection of mediocrity ➡️ Affirmation of core creed ➡️ The rallying promise.',
      formula: 'Here’s to those who dare to [Action]. We believe that [Core Creed]. Because [Transformational Vision].'
    },
    practicalExamples: [
      {
        en: "Here's to the learners who refuse to stay silent. The ones who stumble, who laugh at their accents, and who show up again tomorrow.",
        ar: 'تحية لأولئك المتعلمين الذين يرفضون البقاء صامتين. أولئك الذين يتعثرون، ويبتسمون لغرابة لهجاتهم، ويعودون للمحاولة غداً.',
        spokenNoteAr: 'تكريم المحاولة والشجاعة يبني رابطاً عاطفياً مقدساً.'
      },
      {
        en: "We don't study a language to pass written exams. We learn a language to connect human souls across borders.",
        ar: 'نحن لا ندرس لغة لنجتاز اختبارات ورقية، بل نتعلم لغة لنربط أرواح البشر عبر الحدود.',
        spokenNoteAr: 'إعادة تعريف الهدف السامي من التعلم.'
      },
      {
        en: "Speak with courage. Speak with passion. The world is waiting to hear your voice.",
        ar: 'تحدث بشجاعة. تحدث بشغف. فالعالم ينتظر سماع صوتك.',
        spokenNoteAr: 'ختام ملهم يهز الوجدان ويدعو للانطلاق الفوري.'
      }
    ],
    commonMistakes: [
      {
        incorrect: "Writing corporate jargon: 'Our mission is to synergistically optimize educational value paradigms.'",
        correct: "Use raw, poetic, universal human language that stirs real emotion and instills courage.",
        whyAr: 'الكلمات الرنانة الجافة تموت فور ولادتها؛ الكلمات الإنسانية الصادقة تحرك أمماً.'
      }
    ],
    speakingChallenge: {
      promptAr: 'أنت في ختام رحلة مسارات سارة! اكتب بيانك الشخصي للطلاقة في 3 أسطر واقرأه لسارة!',
      promptEn: 'Draft and read your personal Fluency Manifesto celebrating courage over perfection!',
      saraQuestionAr: 'We have conquered all 30 lessons across all 4 tracks. What is your closing Fluency Manifesto?',
      saraQuestionEn: 'We have conquered all 30 lessons across all 4 tracks. What is your closing Fluency Manifesto?',
      recommendedResponseEn: "I am no longer a passive student of rules. I am a confident voice in the world. I embrace my mistakes as milestones, and I speak every single day without fear!"
    },
    quiz: [
      {
        questionAr: 'ما الروح الجوهرية التي يجب أن تتنفس في أي بيان تأسيسي (Manifesto) ملهم؟',
        questionEn: 'What core quality makes a company or personal manifesto truly inspiring?',
        options: [
          "Overwhelming corporate legal disclaimers.",
          "Emotional resonance, courageous clarity, and an authentic rallying call to human action.",
          "A list of tax regulations.",
          "Apologizing for having dreams."
        ],
        correctIndex: 1,
        explanationAr: 'البيان التأسيسي الملهم يتنفس عمقاً عاطفياً، وشجاعة في الرؤية، ونداءً صادقاً يحث البشر على الفعل والإقدام.'
      }
    ],
    whiteboardNotes: {
      title: 'The Timeless Manifesto Architecture',
      pointsAr: [
        '1. النداء: Here’s to those who dare...',
        '2. العقيدة: We believe that language is a human bridge',
        '3. الشجاعة: Perfection is the enemy of connection',
        '4. الختام: The world is waiting for your voice!',
        'الكلمات التي تخرج من القلب تستقر في التاريخ'
      ],
      pointsEn: [
        '1. The rallying call: "Here’s to the daring..."',
        '2. The core creed: Human connection over rote tests',
        '3. Courage over perfection',
        '4. The anthem: "Speak your truth with pride"',
        'Words written with soul echo forever'
      ],
      chalkHighlight: 'Call to Courage ➡️ Unapologetic Creed ➡️ Inspiring Rallying Anthem'
    }
  }
];
