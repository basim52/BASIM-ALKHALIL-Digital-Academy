export interface BilingualDialogueLine {
  speaker: string;
  english: string;
  arabic: string;
}

export interface VocabularyWord {
  word: string;
  meaning_ar: string;
  important?: boolean;
}

export interface DailyDoseQuestion {
  sentence: string;
  options: string[];
  correct: string;
}

export interface DailyDoseLesson {
  lesson_id: string;
  title_ar: string;
  title_en: string;
  category: string;
  level: string;
  duration_minutes: number;
  narration_audio_url?: string;
  sections: {
    story_dialogue: {
      type: 'bilingual_dialogue';
      instructions_ar: string;
      audio_button?: boolean;
      lines: BilingualDialogueLine[];
    };
    mini_dictionary: {
      type: 'vocabulary_table';
      instructions_ar: string;
      words: VocabularyWord[];
    };
    practice: {
      type: 'fill_in_the_blank';
      instructions_ar: string;
      questions: DailyDoseQuestion[];
    };
    acting_challenge: {
      type: 'speaking';
      instructions_ar: string;
      sentence: string;
    };
    encouragement: {
      type: 'text';
      content_ar: string;
    };
  };
}

export const ADULTS_DAILY_DOSES: DailyDoseLesson[] = [
  {
    "lesson_id": "daily_001",
    "title_ar": "أنا متحمس مش أنا مثير!",
    "title_en": "I am excited vs I am exciting",
    "category": "daily_dose",
    "level": "A2-B1",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_001.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Ahmed", "english": "I have a job interview tomorrow. I am so excited!", "arabic": "لدي مقابلة عمل غداً. أنا متحمس جداً!" },
          { "speaker": "Teacher", "english": "Good! Just don't say 'I am exciting' or they will think you are strange.", "arabic": "جيد! فقط لا تقل 'I am exciting' وإلا سيظنون أنك غريب." },
          { "speaker": "Ahmed", "english": "Really? What's the difference?", "arabic": "حقاً؟ ما الفرق؟" },
          { "speaker": "Teacher", "english": "Excited = you feel happy. Exciting = you make others feel happy.", "arabic": "Excited = تشعر بالسعادة. Exciting = تجعل الآخرين يشعرون بالسعادة." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "excited", "meaning_ar": "متحمس (شعور داخلي)", "important": true },
          { "word": "exciting", "meaning_ar": "مثير (يسبب الشعور للآخرين)", "important": true },
          { "word": "interview", "meaning_ar": "مقابلة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "I am _____ about the trip.", "options": ["excited", "exciting"], "correct": "excited" },
          { "sentence": "The movie was very _____.", "options": ["exciting", "excited"], "correct": "exciting" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول:",
        "sentence": "I am so excited about tomorrow!"
      },
      "encouragement": { "type": "text", "content_ar": "أنت متحمس وليس مثيراً! قاعدة اليوم تنقذك من مواقف محرجة." }
    }
  },
  {
    "lesson_id": "daily_002",
    "title_ar": "لا تقول 'Yesterday I go'",
    "title_en": "Don't Say Yesterday I Go",
    "category": "daily_dose",
    "level": "A1-A2",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_002.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Sara", "english": "Yesterday I go to the mall.", "arabic": "أمس أذهب إلى المركز التجاري." },
          { "speaker": "Teacher", "english": "Stop! Yesterday is past. Say: Yesterday I went to the mall.", "arabic": "توقفي! أمس ماضٍ. قولي: أمس ذهبت إلى المركز التجاري." },
          { "speaker": "Sara", "english": "Oh right! Went. I always forget.", "arabic": "آه صحيح! Went. دائماً أنسى." },
          { "speaker": "Teacher", "english": "Remember: go - went - gone. Yesterday, I went.", "arabic": "تذكري: go - went - gone. في الماضي، went." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "went", "meaning_ar": "ذهب (ماضي go)", "important": true },
          { "word": "yesterday", "meaning_ar": "أمس", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "Yesterday, I _____ to school.", "options": ["go", "went"], "correct": "went" },
          { "sentence": "Last week, we _____ to the park.", "options": ["go", "went"], "correct": "went" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول:",
        "sentence": "Yesterday I went to the supermarket."
      },
      "encouragement": { "type": "text", "content_ar": "أحسنت! الماضي أصبح سهلاً. وداعاً لأخطاء yesterday!" }
    }
  },
  {
    "lesson_id": "daily_003",
    "title_ar": "5 بدائل لكلمة Good",
    "title_en": "5 Alternatives to Good",
    "category": "daily_dose",
    "level": "A2-B1",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_003.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Friend", "english": "How are you?", "arabic": "كيف حالك؟" },
          { "speaker": "Ali", "english": "I'm good.", "arabic": "أنا بخير." },
          { "speaker": "Teacher", "english": "Try these instead: I'm doing well, I'm great, I'm fantastic, I'm wonderful, Not bad!", "arabic": "جرب هذه بدلاً منها: أنا بأفضل حال، أنا رائع، أنا ممتاز، أنا مذهل، ليس سيئاً!" },
          { "speaker": "Ali", "english": "Wow, five new ways! I'm fantastic today!", "arabic": "واو، خمس طرق جديدة! أنا ممتاز اليوم!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "doing well", "meaning_ar": "بأفضل حال", "important": true },
          { "word": "fantastic", "meaning_ar": "ممتاز", "important": true },
          { "word": "not bad", "meaning_ar": "ليس سيئاً", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "اختر الرد المناسب:",
        "questions": [
          { "sentence": "How are you? I'm _____, thank you.", "options": ["doing well", "do well"], "correct": "doing well" },
          { "sentence": "How was your day? It was _____!", "options": ["fantastic", "fantasy"], "correct": "fantastic" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تجيب بثقة:",
        "sentence": "I'm doing very well, thank you!"
      },
      "encouragement": { "type": "text", "content_ar": "صرت محترفاً في الردود! لا تقل good بعد اليوم." }
    }
  },
  {
    "lesson_id": "daily_004",
    "title_ar": "ما معنى Venti و Grande في ستاربكس",
    "title_en": "Starbucks Sizes Explained",
    "category": "daily_dose",
    "level": "A2-B1",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_004.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Noor", "english": "I want a coffee. What size should I say?", "arabic": "أريد قهوة. أي حجم يجب أن أقول؟" },
          { "speaker": "Barista", "english": "We have Tall, Grande, and Venti.", "arabic": "لدينا صغير ووسط وكبير." },
          { "speaker": "Noor", "english": "Tall means big? That's confusing!", "arabic": "Tall يعني كبير؟ هذا محير!" },
          { "speaker": "Barista", "english": "I know! Tall is actually small. Grande is medium.", "arabic": "أعرف! Tall في الواقع صغير. Grande وسط." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "Tall", "meaning_ar": "حجم صغير في ستاربكس", "important": true },
          { "word": "Grande", "meaning_ar": "حجم وسط", "important": true },
          { "word": "Venti", "meaning_ar": "حجم كبير", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "Can I have a _____ latte, please? (medium)", "options": ["Grande", "Tall"], "correct": "Grande" },
          { "sentence": "A _____ coffee is the smallest size.", "options": ["Tall", "Venti"], "correct": "Tall" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب قهوة:",
        "sentence": "Can I have a Grande cappuccino, please?"
      },
      "encouragement": { "type": "text", "content_ar": "الآن تطلب قهوتك مثل المحترفين! لا تخف من ستاربكس." }
    }
  },
  {
    "lesson_id": "daily_005",
    "title_ar": "إيميل بجملتين فقط",
    "title_en": "Two-Sentence Professional Email",
    "category": "daily_dose",
    "level": "B1-B2",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_005.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Manager", "english": "I need to send an email but I don't have time. Help!", "arabic": "أحتاج إرسال إيميل لكن ليس لدي وقت. ساعدني!" },
          { "speaker": "Teacher", "english": "Two sentences only: I hope this email finds you well. I am writing to confirm our meeting on Monday.", "arabic": "جملتان فقط: أتمنى أن يصلك هذا الإيميل وأنت بخير. أكتب لتأكيد اجتماعنا يوم الاثنين." },
          { "speaker": "Manager", "english": "That's it? Perfect!", "arabic": "هذا كل شيء؟ ممتاز!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "I hope this email finds you well", "meaning_ar": "أتمنى أن يصلك الإيميل بخير", "important": true },
          { "word": "I am writing to confirm", "meaning_ar": "أكتب لتأكيد", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "I hope this email _____ you well.", "options": ["finds", "found"], "correct": "finds" },
          { "sentence": "I am writing to _____ the meeting.", "options": ["confirm", "confirms"], "correct": "confirm" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول الجملة الافتتاحية:",
        "sentence": "I hope this email finds you well."
      },
      "encouragement": { "type": "text", "content_ar": "إيميل احترافي في دقيقة! لا تعقد الأمور بعد اليوم." }
    }
  },
  {
    "lesson_id": "daily_006",
    "title_ar": "الفرق بين Look و Watch و See",
    "title_en": "Look vs Watch vs See",
    "category": "daily_dose",
    "level": "A2-B1",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_006.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Hassan", "english": "I see a bird. Look at it! Let's watch it fly.", "arabic": "أرى عصفوراً. انظر إليه! دعنا نشاهد طيرانه." },
          { "speaker": "Teacher", "english": "Perfect! See = without trying. Look = with attention. Watch = for some time.", "arabic": "ممتاز! See = بدون قصد. Look = بتركيز. Watch = لمدة زمنية." },
          { "speaker": "Hassan", "english": "So I watch a movie, look at a photo, and see the sky.", "arabic": "إذاً أشاهد فيلماً، أنظر إلى صورة، وأرى السماء." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "see", "meaning_ar": "يرى (بدون قصد)", "important": true },
          { "word": "look", "meaning_ar": "ينظر (بتركيز)", "important": true },
          { "word": "watch", "meaning_ar": "يشاهد (لمدة)", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "I _____ a movie every night.", "options": ["watch", "see"], "correct": "watch" },
          { "sentence": "_____ at this beautiful flower!", "options": ["Look", "Watch"], "correct": "Look" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول:",
        "sentence": "Look at that! I can't believe I'm seeing this!"
      },
      "encouragement": { "type": "text", "content_ar": "أصبحت تميز بين الثلاثة! عيونك الآن تتحدث الإنجليزية." }
    }
  },
  {
    "lesson_id": "daily_007",
    "title_ar": "لا تقل I have 30 years",
    "title_en": "Don't Say I Have 30 Years",
    "category": "daily_dose",
    "level": "A1-A2",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_007.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Fatima", "english": "Hello, I have 25 years.", "arabic": "مرحباً، لدي 25 سنة." },
          { "speaker": "Teacher", "english": "No no! In English, you ARE 25 years old. You don't have years.", "arabic": "لا لا! بالإنجليزية، أنت عمرك 25 سنة. أنت لا تملك سنوات." },
          { "speaker": "Fatima", "english": "Oh! I am 25 years old. Got it!", "arabic": "أوه! عمري 25 سنة. فهمت!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "I am ... years old", "meaning_ar": "عمري ... سنة", "important": true },
          { "word": "age", "meaning_ar": "عمر", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "How old are you? I _____ 30 years old.", "options": ["am", "have"], "correct": "am" },
          { "sentence": "She _____ 10 years old.", "options": ["is", "has"], "correct": "is" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول عمرك:",
        "sentence": "I am 20 years old."
      },
      "encouragement": { "type": "text", "content_ar": "الآن عمرك صحيح نحوياً! خطأ شائع انتهى اليوم." }
    }
  },
  {
    "lesson_id": "daily_008",
    "title_ar": "كيف تعتذر بثلاث طرق",
    "title_en": "Three Ways to Apologize",
    "category": "daily_dose",
    "level": "A2-B1",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_008.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Khalid", "english": "Oops! I stepped on your foot. Sorry!", "arabic": "أوب! دست على قدمك. آسف!" },
          { "speaker": "Stranger", "english": "It's okay.", "arabic": "لا بأس." },
          { "speaker": "Teacher", "english": "You can also say: I apologize, or Pardon me. Three ways!", "arabic": "يمكنك أيضاً قول: أعتذر، أو اعذرني. ثلاث طرق!" },
          { "speaker": "Khalid", "english": "I apologize for the mistake. Pardon me for interrupting.", "arabic": "أعتذر عن الخطأ. اعذرني على المقاطعة." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "sorry", "meaning_ar": "آسف (غير رسمي)", "important": true },
          { "word": "I apologize", "meaning_ar": "أعتذر (رسمي)", "important": true },
          { "word": "pardon me", "meaning_ar": "اعذرني (مهذب)", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "_____ for being late.", "options": ["I apologize", "Sorry me"], "correct": "I apologize" },
          { "sentence": "_____, can I pass?", "options": ["Pardon me", "Apologize"], "correct": "Pardon me" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تعتذر بطريقة رسمية:",
        "sentence": "I sincerely apologize for the inconvenience."
      },
      "encouragement": { "type": "text", "content_ar": "لديك ثلاث أدوات للاعتذار! مؤدب ورسمي وعادي." }
    }
  },
  {
    "lesson_id": "daily_009",
    "title_ar": "الفرق بين For و Since",
    "title_en": "For vs Since",
    "category": "daily_dose",
    "level": "A2-B1",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_009.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Laila", "english": "I have lived here since 5 years.", "arabic": "أعيش هنا منذ 5 سنوات." },
          { "speaker": "Teacher", "english": "Almost! Since = specific point. For = duration. Say: for 5 years.", "arabic": "تقريباً! Since = نقطة محددة. For = مدة زمنية. قولي: لمدة 5 سنوات." },
          { "speaker": "Laila", "english": "Oh! I have lived here for 5 years, since 2019.", "arabic": "أوه! أعيش هنا لمدة 5 سنوات، منذ 2019." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "for", "meaning_ar": "لمدة (فترة زمنية)", "important": true },
          { "word": "since", "meaning_ar": "منذ (نقطة بداية)", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "I have waited _____ two hours.", "options": ["for", "since"], "correct": "for" },
          { "sentence": "She has worked here _____ 2020.", "options": ["since", "for"], "correct": "since" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول:",
        "sentence": "I have studied English for three years, since 2021."
      },
      "encouragement": { "type": "text", "content_ar": "For و Since أصبحا واضحين! الفرق بينهما لم يعد يحيرك." }
    }
  },
  {
    "lesson_id": "daily_010",
    "title_ar": "كيف تطلب المساعدة في الشارع",
    "title_en": "Asking for Help on the Street",
    "category": "daily_dose",
    "level": "A1-A2",
    "duration_minutes": 5,
    "narration_audio_url": "https://example.com/audio/daily_010.mp3",
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "audio_button": true,
        "lines": [
          { "speaker": "Omar", "english": "Excuse me, can you help me? Where is the nearest station?", "arabic": "المعذرة، هل يمكنك مساعدتي؟ أين أقرب محطة؟" },
          { "speaker": "Passerby", "english": "Of course. Go straight, then turn left at the lights.", "arabic": "بالتأكيد. اذهب مباشرة ثم انعطف يساراً عند الإشارة." },
          { "speaker": "Omar", "english": "Thank you so much! Have a nice day.", "arabic": "شكراً جزيلاً! أتمنى لك يوماً سعيداً." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمة التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "Excuse me", "meaning_ar": "المعذرة", "important": true },
          { "word": "nearest", "meaning_ar": "الأقرب", "important": true },
          { "word": "straight", "meaning_ar": "مباشرة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "_____, where is the hospital?", "options": ["Excuse me", "Sorry"], "correct": "Excuse me" },
          { "sentence": "Go straight, then _____ left.", "options": ["turn", "take"], "correct": "turn" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل بأدب:",
        "sentence": "Excuse me, can you help me find the nearest station?"
      },
      "encouragement": { "type": "text", "content_ar": "أنت الآن جاهز للتجول بثقة وسؤال المارة! رائع جداً." }
    }
  }
];
