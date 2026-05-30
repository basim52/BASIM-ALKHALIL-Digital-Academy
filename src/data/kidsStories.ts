export interface KidStoryLine {
  speaker: string;
  english: string;
  arabic: string;
}

export interface KidStoryWord {
  word: string;
  meaning_ar: string;
  important: boolean;
}

export interface KidStoryQuestion {
  sentence: string;
  options: string[];
  correct: string;
}

export interface KidStory {
  lesson_id: string;
  title_ar: string;
  title_en: string;
  category: string;
  series: string;
  episode: number;
  age_range: string;
  level: string;
  duration_minutes: number;
  characters: string[];
  location: string;
  vocabulary: { word: string; meaning_ar: string }[];
  sections: {
    story_dialogue: {
      type: 'bilingual_dialogue';
      instructions_ar: string;
      lines: KidStoryLine[];
    };
    mini_dictionary: {
      type: 'vocabulary_table';
      instructions_ar: string;
      words: KidStoryWord[];
    };
    practice: {
      type: 'fill_in_the_blank';
      instructions_ar: string;
      questions: KidStoryQuestion[];
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

export const KIDS_STORIES: KidStory[] = [
  {
    "lesson_id": "kids_story_001",
    "title_ar": "نور تصل إلى لندن",
    "title_en": "Noor Arrives in London",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 1,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Security Officer"],
    "location": "Heathrow Airport",
    "vocabulary": [
      { "word": "terminal", "meaning_ar": "صالة المطار" },
      { "word": "platform", "meaning_ar": "رصيف القطار" },
      { "word": "single ticket", "meaning_ar": "تذكرة ذهاب فقط" },
      { "word": "Where is...?", "meaning_ar": "أين ...؟" },
      { "word": "straight", "meaning_ar": "مباشرة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Excuse me, where is the train station?", "arabic": "المعذرة، أين محطة القطار؟" },
          { "speaker": "Officer", "english": "It's in Terminal 3. Go straight, then turn left.", "arabic": "إنها في الصالة رقم 3. اذهب مباشرة ثم انعطف يساراً." },
          { "speaker": "Noor", "english": "Thank you! And where is the platform?", "arabic": "شكراً لك! وأين الرصيف؟" },
          { "speaker": "Officer", "english": "Platform 5. You need a single ticket.", "arabic": "الرصيف 5. تحتاجين تذكرة ذهاب فقط." },
          { "speaker": "Noor", "english": "How much is a single ticket?", "arabic": "كم سعر تذكرة الذهاب؟" },
          { "speaker": "Officer", "english": "£10. The machine is over there.", "arabic": "10 جنيهات. الآلة هناك." },
          { "speaker": "Noor", "english": "Thank you very much!", "arabic": "شكراً جزيلاً لك!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "terminal", "meaning_ar": "صالة المطار", "important": false },
          { "word": "platform", "meaning_ar": "رصيف القطار", "important": true },
          { "word": "single ticket", "meaning_ar": "تذكرة ذهاب فقط", "important": true },
          { "word": "straight", "meaning_ar": "مباشرة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "The train is at _____ 5.", "options": ["terminal", "platform"], "correct": "platform" },
          { "sentence": "Noor needs a _____ ticket.", "options": ["single", "return"], "correct": "single" },
          { "sentence": "The station is in _____ 3.", "options": ["Terminal", "Platform"], "correct": "Terminal" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول:",
        "sentence": "Excuse me, where is the train station?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت بطل! لقد أنهيت الحلقة الأولى. الآن تستطيع أن تسأل عن المكان باللغة الإنجليزية. أراك في الحلقة القادمة حيث ستطلب نور الطعام في المطعم!"
      }
    }
  },
  {
    "lesson_id": "kids_story_002",
    "title_ar": "نور وجدول الحافلات",
    "title_en": "Noor and the Bus Timetable",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 2,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Bus Driver"],
    "location": "Bus Stop near Train Station",
    "vocabulary": [
      { "word": "bus stop", "meaning_ar": "محطة الحافلات" },
      { "word": "timetable", "meaning_ar": "جدول المواعيد" },
      { "word": "delay", "meaning_ar": "تأخير" },
      { "word": "Which bus goes to...?", "meaning_ar": "أي حافلة تذهب إلى...؟" },
      { "word": "every 10 minutes", "meaning_ar": "كل 10 دقائق" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Excuse me, which bus goes to the city center?", "arabic": "المعذرة، أي حافلة تذهب إلى وسط المدينة؟" },
          { "speaker": "Driver", "english": "Bus number 45. It comes every 10 minutes.", "arabic": "الحافلة رقم 45. تأتي كل 10 دقائق." },
          { "speaker": "Noor", "english": "Is there a timetable?", "arabic": "هل يوجد جدول مواعيد؟" },
          { "speaker": "Driver", "english": "Yes, look at the board. But today there is a small delay.", "arabic": "نعم، انظري إلى اللوحة. لكن اليوم يوجد تأخير بسيط." },
          { "speaker": "Noor", "english": "Oh, I see. Thank you for your help!", "arabic": "آه، فهمت. شكراً على مساعدتك!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "bus stop", "meaning_ar": "محطة الحافلات", "important": true },
          { "word": "timetable", "meaning_ar": "جدول المواعيد", "important": true },
          { "word": "delay", "meaning_ar": "تأخير", "important": false },
          { "word": "every 10 minutes", "meaning_ar": "كل 10 دقائق", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "The bus comes _____ 10 minutes.", "options": ["every", "once"], "correct": "every" },
          { "sentence": "Noor looked at the _____ to check the times.", "options": ["timetable", "map"], "correct": "timetable" },
          { "sentence": "There was a small _____ today.", "options": ["delay", "party"], "correct": "delay" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل السائق:",
        "sentence": "Which bus goes to the city center?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "رائع! أنت الآن تستطيع ركوب الحافلة في لندن. الحلقة القادمة سنشتري تذكرة القطار!"
      }
    }
  },
  {
    "lesson_id": "kids_story_003",
    "title_ar": "نور تشتري تذكرة القطار",
    "title_en": "Noor Buys a Train Ticket",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 3,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Ticket Machine Voice"],
    "location": "Train Station",
    "vocabulary": [
      { "word": "return ticket", "meaning_ar": "تذكرة ذهاب وعودة" },
      { "word": "cash", "meaning_ar": "نقداً" },
      { "word": "card", "meaning_ar": "بطاقة" },
      { "word": "insert", "meaning_ar": "أدخل" },
      { "word": "collect", "meaning_ar": "استلم" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "I need a ticket to Oxford Street.", "arabic": "أحتاج تذكرة إلى شارع أكسفورد." },
          { "speaker": "Machine", "english": "Single or return?", "arabic": "ذهاب فقط أم ذهاب وعودة؟" },
          { "speaker": "Noor", "english": "Return, please. How can I pay?", "arabic": "ذهاب وعودة من فضلك. كيف يمكنني الدفع؟" },
          { "speaker": "Machine", "english": "Cash or card. Insert your card here.", "arabic": "نقداً أو بطاقة. أدخل بطاقتك هنا." },
          { "speaker": "Noor", "english": "Okay... done! Where do I collect the ticket?", "arabic": "حسناً... تم! أين أستلم التذكرة؟" },
          { "speaker": "Machine", "english": "Take it from the slot below.", "arabic": "خذيها من الفتحة بالأسفل." },
          { "speaker": "Noor", "english": "Thank you! I have my return ticket!", "arabic": "شكراً! لقد حصلت على تذكرتي ذهاباً وعودة!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "return ticket", "meaning_ar": "تذكرة ذهاب وعودة", "important": true },
          { "word": "cash", "meaning_ar": "نقداً", "important": false },
          { "word": "insert", "meaning_ar": "أدخل", "important": true },
          { "word": "collect", "meaning_ar": "استلم", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor wanted a _____ ticket.", "options": ["single", "return"], "correct": "return" },
          { "sentence": "She paid by _____.", "options": ["cash", "card"], "correct": "card" },
          { "sentence": "She collected the ticket from the _____.", "options": ["slot", "screen"], "correct": "slot" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشتري تذكرة:",
        "sentence": "I need a return ticket, please."
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت محترف! الآن تستطيع شراء تذكرة قطار بنفسك. في الحلقة القادمة سنزور المتحف!"
      }
    }
  },
  {
    "lesson_id": "kids_story_004",
    "title_ar": "نور تضيع في المتحف",
    "title_en": "Noor Gets Lost in the Museum",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 4,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Museum Guard"],
    "location": "Museum",
    "vocabulary": [
      { "word": "map", "meaning_ar": "خريطة" },
      { "word": "exhibition", "meaning_ar": "معرض" },
      { "word": "lost", "meaning_ar": "ضائع" },
      { "word": "Can you help me?", "meaning_ar": "هل يمكنك مساعدتي؟" },
      { "word": "down the hall", "meaning_ar": "في نهاية الممر" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Excuse me, I think I am lost. Can you help me?", "arabic": "المعذرة، أعتقد أنني ضائعة. هل يمكنك مساعدتي؟" },
          { "speaker": "Guard", "english": "Of course. Where do you want to go?", "arabic": "بالتأكيد. إلى أين تريدين الذهاب؟" },
          { "speaker": "Noor", "english": "I want to see the dinosaur exhibition.", "arabic": "أريد مشاهدة معرض الديناصورات." },
          { "speaker": "Guard", "english": "Here is a map. Go down the hall and turn right.", "arabic": "هذه خريطة. اذهبي إلى نهاية الممر ثم انعطفي يميناً." },
          { "speaker": "Noor", "english": "Down the hall... turn right. Got it! Thank you!", "arabic": "نهاية الممر... انعطف يميناً. فهمت! شكراً لك!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "map", "meaning_ar": "خريطة", "important": true },
          { "word": "lost", "meaning_ar": "ضائع", "important": true },
          { "word": "exhibition", "meaning_ar": "معرض", "important": false },
          { "word": "down the hall", "meaning_ar": "في نهاية الممر", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor was _____ in the museum.", "options": ["lost", "happy"], "correct": "lost" },
          { "sentence": "The guard gave her a _____.", "options": ["map", "ticket"], "correct": "map" },
          { "sentence": "The dinosaur exhibition was _____ the hall.", "options": ["down", "up"], "correct": "down" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب المساعدة بأدب:",
        "sentence": "Can you help me, please?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "ممتاز! الآن تعرف كيف تطلب المساعدة عندما تضيع. الحلقة القادمة في يوم ممطر!"
      }
    }
  },
  {
    "lesson_id": "kids_story_005",
    "title_ar": "يوم ممطر في لندن",
    "title_en": "A Rainy Day in London",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 5,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Shopkeeper"],
    "location": "Souvenir Shop",
    "vocabulary": [
      { "word": "umbrella", "meaning_ar": "مظلة" },
      { "word": "raincoat", "meaning_ar": "معطف مطر" },
      { "word": "wet", "meaning_ar": "مبلل" },
      { "word": "It's raining", "meaning_ar": "إنها تمطر" },
      { "word": "stay dry", "meaning_ar": "ابق جافاً" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Oh no, it's raining! I'm getting wet.", "arabic": "أوه لا، إنها تمطر! سأتبلل." },
          { "speaker": "Shopkeeper", "english": "Come in! Do you need an umbrella?", "arabic": "تفضلي بالدخول! هل تحتاجين مظلة؟" },
          { "speaker": "Noor", "english": "Yes, please. And maybe a raincoat.", "arabic": "نعم من فضلك. وربما معطف مطر أيضاً." },
          { "speaker": "Shopkeeper", "english": "This raincoat is good. Stay dry!", "arabic": "معطف المطر هذا جيد. ابق جافة!" },
          { "speaker": "Noor", "english": "How much is it?", "arabic": "كم سعره؟" },
          { "speaker": "Shopkeeper", "english": "£15 for the raincoat, £5 for the umbrella.", "arabic": "15 جنيهاً للمعطف، و5 جنيهات للمظلة." },
          { "speaker": "Noor", "english": "I'll take both. Thank you!", "arabic": "سآخذ كليهما. شكراً!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "umbrella", "meaning_ar": "مظلة", "important": true },
          { "word": "raincoat", "meaning_ar": "معطف مطر", "important": true },
          { "word": "wet", "meaning_ar": "مبلل", "important": false },
          { "word": "stay dry", "meaning_ar": "ابق جافاً", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "It was _____, so Noor needed an umbrella.", "options": ["sunny", "raining"], "correct": "raining" },
          { "sentence": "She bought an umbrella and a _____.", "options": ["raincoat", "hat"], "correct": "raincoat" },
          { "sentence": "The shopkeeper said: Stay _____!", "options": ["dry", "wet"], "correct": "dry" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشتري مظلة:",
        "sentence": "I need an umbrella, please."
      },
      "encouragement": {
        "type": "text",
        "content_ar": "الآن أنت مستعد لأي يوم ممطر في لندن! الحلقة القادمة سنذهب إلى السوبرماركت."
      }
    }
  },
  {
    "lesson_id": "kids_story_006",
    "title_ar": "نور في السوبرماركت",
    "title_en": "Noor at the Supermarket",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 6,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Shop Assistant"],
    "location": "Supermarket",
    "vocabulary": [
      { "word": "apples", "meaning_ar": "تفاح" },
      { "word": "bananas", "meaning_ar": "موز" },
      { "word": "how many", "meaning_ar": "كم عدد" },
      { "word": "a kilo of", "meaning_ar": "كيلو من" },
      { "word": "fresh", "meaning_ar": "طازج" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Excuse me, where can I find apples?", "arabic": "المعذرة، أين أجد التفاح؟" },
          { "speaker": "Assistant", "english": "In the fruit section. How many do you need?", "arabic": "في قسم الفواكه. كم عدد ما تحتاجين؟" },
          { "speaker": "Noor", "english": "A kilo of apples and some bananas, please.", "arabic": "كيلو من التفاح وبعض الموز من فضلك." },
          { "speaker": "Assistant", "english": "These bananas are very fresh. Anything else?", "arabic": "هذا الموز طازج جداً. أي شيء آخر؟ text: values?" },
          { "speaker": "Noor", "english": "No, that's all. Thank you!", "arabic": "لا، هذا كل شيء. شكراً!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "apples", "meaning_ar": "تفاح", "important": true },
          { "word": "a kilo of", "meaning_ar": "كيلو من", "important": true },
          { "word": "fresh", "meaning_ar": "طازج", "important": true },
          { "word": "how many", "meaning_ar": "كم عدد", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor wanted a _____ of apples.", "options": ["kilo", "bag"], "correct": "kilo" },
          { "sentence": "The bananas were very _____.", "options": ["fresh", "old"], "correct": "fresh" },
          { "sentence": "She found the fruit in the fruit _____.", "options": ["section", "shelf"], "correct": "section" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن الفاكهة:",
        "sentence": "Where can I find apples, please?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "ممتاز! الآن تستطيع التسوق في السوبرماركت. الحلقة القادمة سنزور برج لندن الشهير!"
      }
    }
  },
  {
    "lesson_id": "kids_story_007",
    "title_ar": "نور تزور برج لندن",
    "title_en": "Noor Visits the Tower of London",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 7,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Tour Guide"],
    "location": "Tower of London",
    "vocabulary": [
      { "word": "entrance", "meaning_ar": "مدخل" },
      { "word": "guide", "meaning_ar": "مرشد" },
      { "word": "crown", "meaning_ar": "تاج" },
      { "word": "How old is...?", "meaning_ar": "كم عمر...؟" },
      { "word": "almost 1000 years", "meaning_ar": "ما يقرب من 1000 سنة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Wow! How old is the Tower of London?", "arabic": "واو! كم عمر برج لندن؟" },
          { "speaker": "Guide", "english": "It's almost 1000 years old!", "arabic": "عمره ما يقرب من 1000 سنة!" },
          { "speaker": "Noor", "english": "That's amazing! Can we see the crowns?", "arabic": "هذا مذهل! هل يمكننا رؤية التيجان؟" },
          { "speaker": "Guide", "english": "Yes, follow me. The entrance is over here.", "arabic": "نعم، اتبعيني. المدخل من هنا." },
          { "speaker": "Noor", "english": "Thank you for being our guide!", "arabic": "شكراً لكونك مرشدنا!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "entrance", "meaning_ar": "مدخل", "important": true },
          { "word": "guide", "meaning_ar": "مرشد", "important": true },
          { "word": "crown", "meaning_ar": "تاج", "important": true },
          { "word": "almost 1000 years", "meaning_ar": "ما يقرب من 1000 سنة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "The Tower is almost 1000 _____ old.", "options": ["years", "days"], "correct": "years" },
          { "sentence": "The _____ showed them the entrance.", "options": ["guide", "guard"], "correct": "guide" },
          { "sentence": "Noor wanted to see the _____.", "options": ["crowns", "swords"], "correct": "crowns" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن التاريخ:",
        "sentence": "How old is this building?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت مؤرخ صغير! الآن تعرف كيف تسأل عن عمر الأماكن. الحلقة القادمة سنذهب إلى الصيدلية."
      }
    }
  },
  {
    "lesson_id": "kids_story_008",
    "title_ar": "نور تذهب إلى الصيدلية",
    "title_en": "Noor Goes to the Pharmacy",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 8,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Pharmacist"],
    "location": "Pharmacy",
    "vocabulary": [
      { "word": "headache", "meaning_ar": "صداع" },
      { "word": "medicine", "meaning_ar": "دواء" },
      { "word": "pharmacist", "meaning_ar": "صيدلي" },
      { "word": "I need something for...", "meaning_ar": "أحتاج شيئاً لـ..." },
      { "word": "twice a day", "meaning_ar": "مرتين يومياً" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Hello, I have a headache. I need something for it.", "arabic": "مرحباً، لدي صداع. أحتاج شيئاً له." },
          { "speaker": "Pharmacist", "english": "I see. Take this medicine twice a day.", "arabic": "حسناً. خذي هذا الدواء مرتين يومياً." },
          { "speaker": "Noor", "english": "Twice a day... morning and night?", "arabic": "مرتين يومياً... صباحاً ومساءً؟" },
          { "speaker": "Pharmacist", "english": "Yes. Drink water and rest. Feel better!", "arabic": "نعم. اشربي الماء واستريحي. أتمنى لك الشفاء!" },
          { "speaker": "Noor", "english": "Thank you, pharmacist!", "arabic": "شكراً أيها الصيدلي!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "headache", "meaning_ar": "صداع", "important": true },
          { "word": "medicine", "meaning_ar": "دواء", "important": true },
          { "word": "twice a day", "meaning_ar": "مرتين يومياً", "important": true },
          { "word": "pharmacist", "meaning_ar": "صيدلي", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor had a _____.", "options": ["headache", "toothache"], "correct": "headache" },
          { "sentence": "She needed to take medicine _____ a day.", "options": ["twice", "once"], "correct": "twice" },
          { "sentence": "The _____ gave her the medicine.", "options": ["pharmacist", "doctor"], "correct": "pharmacist" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تصف ألماً للصيدلي:",
        "sentence": "I have a headache. I need something for it."
      },
      "encouragement": {
        "type": "text",
        "content_ar": "صحياً رائع! الآن تستطيع شراء الدواء عند الحاجة. الحلقة القادمة سنكتب بطاقة بريدية!"
      }
    }
  },
  {
    "lesson_id": "kids_story_009",
    "title_ar": "نور تكتب بطاقة بريدية",
    "title_en": "Noor Writes a Postcard",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 9,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Post Office Clerk"],
    "location": "Post Office",
    "vocabulary": [
      { "word": "stamp", "meaning_ar": "طابع بريدي" },
      { "word": "address", "meaning_ar": "عنوان" },
      { "word": "post office", "meaning_ar": "مكتب البريد" },
      { "word": "Dear...", "meaning_ar": "عزيزي/عزيزتي..." },
      { "word": "best wishes", "meaning_ar": "أطيب الأمنيات" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "I want to send a postcard to my family.", "arabic": "أريد إرسال بطاقة بريدية لعائلتي." },
          { "speaker": "Clerk", "english": "Sure. You need a stamp. Where is the address?", "arabic": "بالتأكيد. تحتاجين طابعاً بريدياً. ما هو العنوان؟" },
          { "speaker": "Noor", "english": "The address is in Saudi Arabia. I will write: Dear Mom and Dad...", "arabic": "العنوان في السعودية. سأكتب: أمي وأبي العزيزين..." },
          { "speaker": "Clerk", "english": "Don't forget to write 'Best wishes'!", "arabic": "لا تنسي كتابة 'أطيب الأمنيات'!" },
          { "speaker": "Noor", "english": "Done! Here is the postcard with the stamp.", "arabic": "تم! ها هي البطاقة مع الطابع." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "stamp", "meaning_ar": "طابع بريدي", "important": true },
          { "word": "address", "meaning_ar": "عنوان", "important": true },
          { "word": "post office", "meaning_ar": "مكتب البريد", "important": false },
          { "word": "best wishes", "meaning_ar": "أطيب الأمنيات", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor needed a _____ to send the postcard.", "options": ["stamp", "ticket"], "correct": "stamp" },
          { "sentence": "She wrote the _____ in Saudi Arabia.", "options": ["address", "letter"], "correct": "address" },
          { "sentence": "She ended the card with '_____ wishes'.", "options": ["Best", "Good"], "correct": "Best" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب طابعاً:",
        "sentence": "I need a stamp for this postcard, please."
      },
      "encouragement": {
        "type": "text",
        "content_ar": "بطاقتك وصلت! الآن أنت تعرف كيف ترسل البطاقات البريدية. الحلقة القادمة ستلتقي نور بالجيران!"
      }
    }
  },
  {
    "lesson_id": "kids_story_010",
    "title_ar": "نور تتحدث مع الجيران",
    "title_en": "Noor Talks to the Neighbors",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 10,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Emma"],
    "location": "Garden",
    "vocabulary": [
      { "word": "neighbor", "meaning_ar": "جار" },
      { "word": "garden", "meaning_ar": "حديقة" },
      { "word": "Would you like to...?", "meaning_ar": "هل ترغب في...؟" },
      { "word": "play", "meaning_ar": "يلعب" },
      { "word": "maybe next time", "meaning_ar": "ربما في المرة القادمة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Hi, I'm Noor. Are you my neighbor?", "arabic": "مرحباً، أنا نور. هل أنت جارتي؟" },
          { "speaker": "Emma", "english": "Yes, I'm Emma. Would you like to play in the garden?", "arabic": "نعم، أنا إيما. هل ترغبين في اللعب في الحديقة؟" },
          { "speaker": "Noor", "english": "I would love to! But today I'm busy.", "arabic": "أود ذلك! لكنني مشغولة اليوم." },
          { "speaker": "Emma", "english": "Maybe next time. Nice to meet you!", "arabic": "ربما في المرة القادمة. سعيدة بلقائك!" },
          { "speaker": "Noor", "english": "Nice to meet you too, Emma!", "arabic": "أنا أيضاً سعيدة بلقائك يا إيما!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "neighbor", "meaning_ar": "جار", "important": true },
          { "word": "garden", "meaning_ar": "حديقة", "important": true },
          { "word": "Would you like to...?", "meaning_ar": "هل ترغب في...؟", "important": true },
          { "word": "maybe next time", "meaning_ar": "ربما في المرة القادمة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Emma is Noor's _____.", "options": ["neighbor", "teacher"], "correct": "neighbor" },
          { "sentence": "Emma asked: 'Would you like to play in the _____?'", "options": ["garden", "house"], "correct": "garden" },
          { "sentence": "Noor said: '_____ next time'.", "options": ["Maybe", "Never"], "correct": "Maybe" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تدعو شخصاً للعب:",
        "sentence": "Would you like to play with me?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "لديك صديقة جديدة! الآن تعرف كيف تدعو الآخرين للعب. الحلقة القادمة سنشتري حيواناً أليفاً!"
      }
    }
  },
  {
    "lesson_id": "kids_story_011",
    "title_ar": "حيوان نور الأليف الجديد",
    "title_en": "Noor’s New Pet",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 11,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Pet Shop Owner"],
    "location": "Pet Shop",
    "vocabulary": [
      { "word": "hamster", "meaning_ar": "هامستر" },
      { "word": "cage", "meaning_ar": "قفص" },
      { "word": "feed", "meaning_ar": "يطعم" },
      { "word": "take care of", "meaning_ar": "يعتني بـ" },
      { "word": "soft", "meaning_ar": "ناعم" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "I want a small pet. Can I see the hamsters?", "arabic": "أريد حيواناً أليفاً صغيراً. هل يمكنني رؤية الهامستر؟" },
          { "speaker": "Owner", "english": "Of course! This one is very soft. You need a cage and food.", "arabic": "بالتأكيد! هذا ناعم جداً. تحتاجين قفصاً وطعاماً." },
          { "speaker": "Noor", "english": "I will take care of it. How often do I feed it?", "arabic": "سأعتني به. كم مرة أطعمه؟" },
          { "speaker": "Owner", "english": "Twice a day. And clean the cage every week.", "arabic": "مرتين يومياً. ونظفي القفص كل أسبوع." },
          { "speaker": "Noor", "english": "I'm so excited! I'll name him 'Fluffy'.", "arabic": "أنا متحمسة جداً! سأسميه 'فَلفي'." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "hamster", "meaning_ar": "هامستر", "important": true },
          { "word": "cage", "meaning_ar": "قفص", "important": true },
          { "word": "feed", "meaning_ar": "يطعم", "important": true },
          { "word": "take care of", "meaning_ar": "يعتني بـ", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor chose a _____ as a pet.", "options": ["hamster", "dog"], "correct": "hamster" },
          { "sentence": "The pet needs a _____ to live in.", "options": ["cage", "box"], "correct": "cage" },
          { "sentence": "She must _____ it twice a day.", "options": ["feed", "wash"], "correct": "feed" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن حيوان أليف:",
        "sentence": "Can I see the hamsters, please?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "لديك صديق فروي جديد! الآن تعرف كيف تشتري حيواناً أليفاً. الحلقة القادمة سنعد الفطور الإنجليزي!"
      }
    }
  },
  {
    "lesson_id": "kids_story_012",
    "title_ar": "نور تعد الفطور الإنجليزي",
    "title_en": "Noor Makes an English Breakfast",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 12,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Mrs. Smith"],
    "location": "Kitchen",
    "vocabulary": [
      { "word": "eggs", "meaning_ar": "بيض" },
      { "word": "toast", "meaning_ar": "خبز محمص" },
      { "word": "beans", "meaning_ar": "فاصوليا" },
      { "word": "sausage", "meaning_ar": "سجق" },
      { "word": "delicious", "meaning_ar": "لذيذ" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Mrs. Smith", "english": "Good morning, Noor! Let's make an English breakfast.", "arabic": "صباح الخير يا نور! دعينا نعد الفطور الإنجليزي." },
          { "speaker": "Noor", "english": "Yummy! What do we need?", "arabic": "يممي! ماذا نحتاج؟" },
          { "speaker": "Mrs. Smith", "english": "Eggs, toast, beans, and sausages.", "arabic": "بيض وخبز محمص وفاصوليا وسجق." },
          { "speaker": "Noor", "english": "I can cook the eggs! And toast the bread.", "arabic": "أستطيع طهي البيض! وتحميص الخبز." },
          { "speaker": "Mrs. Smith", "english": "Great! Now sit down. It's delicious!", "arabic": "رائع! الآن اجلسي. إنه لذيذ!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "eggs", "meaning_ar": "بيض", "important": true },
          { "word": "toast", "meaning_ar": "خبز محمص", "important": true },
          { "word": "beans", "meaning_ar": "فاصوليا", "important": false },
          { "word": "delicious", "meaning_ar": "لذيذ", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "They cooked _____ for breakfast.", "options": ["eggs", "rice"], "correct": "eggs" },
          { "sentence": "Noor toasted the _____.", "options": ["bread", "beans"], "correct": "bread" },
          { "sentence": "The breakfast was _____.", "options": ["delicious", "terrible"], "correct": "delicious" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول إن الطعام لذيذ:",
        "sentence": "This breakfast is delicious!"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "شيف صغير! الآن تعرف مكونات الفطور الإنجليزي. الحلقة القادمة سنزور محطة الإطفاء!"
      }
    }
  },
  {
    "lesson_id": "kids_story_013",
    "title_ar": "نور في محطة الإطفاء",
    "title_en": "Noor at the Fire Station",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 13,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Firefighter"],
    "location": "Fire Station",
    "vocabulary": [
      { "word": "fire engine", "meaning_ar": "سيارة إطفاء" },
      { "word": "hose", "meaning_ar": "خرطوم" },
      { "word": "helmet", "meaning_ar": "خوذة" },
      { "word": "brave", "meaning_ar": "شجاع" },
      { "word": "put out fire", "meaning_ar": "إطفاء الحريق" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Wow! Is that a fire engine?", "arabic": "واو! هل هذه سيارة إطفاء؟" },
          { "speaker": "Firefighter", "english": "Yes. We use the hose to put out fire.", "arabic": "نعم. نستخدم الخرطوم لإطفاء الحريق." },
          { "speaker": "Noor", "english": "Can I try the helmet?", "arabic": "هل يمكنني تجربة الخوذة؟" },
          { "speaker": "Firefighter", "english": "Sure. You look very brave!", "arabic": "بالتأكيد. تبدين شجاعة جداً!" },
          { "speaker": "Noor", "english": "Thank you! Firefighters are heroes.", "arabic": "شكراً! رجال الإطفاء أبطال." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "fire engine", "meaning_ar": "سيارة إطفاء", "important": true },
          { "word": "hose", "meaning_ar": "خرطوم", "important": true },
          { "word": "helmet", "meaning_ar": "خوذة", "important": true },
          { "word": "brave", "meaning_ar": "شجاع", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "The firefighter uses a _____ to put out fire.", "options": ["hose", "bucket"], "correct": "hose" },
          { "sentence": "Noor wore a _____ on her head.", "options": ["helmet", "hat"], "correct": "helmet" },
          { "sentence": "Firefighters are very _____.", "options": ["brave", "scared"], "correct": "brave" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن الخوذة:",
        "sentence": "Can I try the helmet, please?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت بطلة شجاعة! الآن تعرف أدوات الإطفاء. الحلقة القادمة سنحتفل بالهالوين!"
      }
    }
  },
  {
    "lesson_id": "kids_story_014",
    "title_ar": "نور تحتفل بالهالوين",
    "title_en": "Noor Celebrates Halloween",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 14,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Emma"],
    "location": "Street",
    "vocabulary": [
      { "word": "costume", "meaning_ar": "زي تنكري" },
      { "word": "trick or treat", "meaning_ar": "خدعة أم حلوى" },
      { "word": "pumpkin", "meaning_ar": "قرع" },
      { "word": "scary", "meaning_ar": "مخيف" },
      { "word": "candy", "meaning_ar": "حلوى" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Emma", "english": "Happy Halloween, Noor! I love your costume.", "arabic": "عيد هالوين سعيد يا نور! أحب زيك التنكري." },
          { "speaker": "Noor", "english": "Thanks! I am a pumpkin. Let's say 'Trick or treat!'", "arabic": "شكراً! أنا قرعة. دعينا نقول 'خدعة أم حلوى!'" },
          { "speaker": "Neighbor", "english": "Oh, you look scary! Here is some candy.", "arabic": "أوه، تبدوان مخيفتين! هذه بعض الحلوى." },
          { "speaker": "Noor", "english": "Thank you! This is so fun.", "arabic": "شكراً! هذا ممتع جداً." },
          { "speaker": "Emma", "english": "Look at all the candy! Best night ever!", "arabic": "انظري إلى كل هذه الحلوى! أفضل ليلة على الإطلاق!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "costume", "meaning_ar": "زي تنكري", "important": true },
          { "word": "trick or treat", "meaning_ar": "خدعة أم حلوى", "important": true },
          { "word": "pumpkin", "meaning_ar": "قرع", "important": false },
          { "word": "candy", "meaning_ar": "حلوى", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor wore a pumpkin _____.", "options": ["costume", "jacket"], "correct": "costume" },
          { "sentence": "The children said: '_____ or treat!'", "options": ["Trick", "Candy"], "correct": "Trick" },
          { "sentence": "The neighbor gave them _____.", "options": ["candy", "money"], "correct": "candy" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول العبارة الشهيرة:",
        "sentence": "Trick or treat!"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "حفلة هالوين سعيدة! الآن تعرف تقاليد الهالوين. الحلقة القادمة سنتعلم ركوب الدراجة!"
      }
    }
  },
  {
    "lesson_id": "kids_story_015",
    "title_ar": "نور تتعلم ركوب الدراجة",
    "title_en": "Noor Learns to Ride a Bike",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 15,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Bike Instructor"],
    "location": "Park",
    "vocabulary": [
      { "word": "helmet", "meaning_ar": "خوذة" },
      { "word": "brakes", "meaning_ar": "مكابح" },
      { "word": "balance", "meaning_ar": "توازن" },
      { "word": "I can do it!", "meaning_ar": "أستطيع فعلها!" },
      { "word": "push", "meaning_ar": "ادفع" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Instructor", "english": "First, put on your helmet. Safety first!", "arabic": "أولاً، ضعي الخوذة. السلامة أولاً!" },
          { "speaker": "Noor", "english": "Okay. How do I stop?", "arabic": "حسناً. كيف أتوقف؟" },
          { "speaker": "Instructor", "english": "Use the brakes. Now, keep your balance and push.", "arabic": "استخدمي المكابح. الآن، حافظي على توازنك وادفعي." },
          { "speaker": "Noor", "english": "I'm doing it! I can do it!", "arabic": "أنا أفعلها! أستطيع فعلها!" },
          { "speaker": "Instructor", "english": "Well done, Noor! You are a natural.", "arabic": "أحسنت يا نور! أنت موهوبة." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "helmet", "meaning_ar": "خوذة", "important": true },
          { "word": "brakes", "meaning_ar": "مكابح", "important": true },
          { "word": "balance", "meaning_ar": "توازن", "important": true },
          { "word": "I can do it!", "meaning_ar": "أستطيع فعلها!", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor put on her _____ first.", "options": ["helmet", "shoes"], "correct": "helmet" },
          { "sentence": "To stop, she used the _____.", "options": ["brakes", "pedals"], "correct": "brakes" },
          { "sentence": "She kept her _____ and rode the bike.", "options": ["balance", "speed"], "correct": "balance" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشجع نفسك:",
        "sentence": "I can do it!"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت راكب دراجة ماهر! الآن تستطيع ركوب الدراجة بأمان. الحلقة القادمة سنزور مكتب البريد لإرسال طرد."
      }
    }
  },
  {
    "lesson_id": "kids_story_016",
    "title_ar": "نور تزور مكتب البريد",
    "title_en": "Noor Visits the Post Office",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 16,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Post Office Clerk"],
    "location": "Post Office",
    "vocabulary": [
      { "word": "parcel", "meaning_ar": "طرد" },
      { "word": "weight", "meaning_ar": "وزن" },
      { "word": "stamp", "meaning_ar": "طابع" },
      { "word": "How long will it take?", "meaning_ar": "كم ستستغرق؟" },
      { "word": "overseas", "meaning_ar": "خارج البلاد" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "I want to send this parcel to my family overseas.", "arabic": "أريد إرسال هذا الطرد إلى عائلتي خارج البلاد." },
          { "speaker": "Clerk", "english": "Sure. Let me check the weight. It's 2 kilos.", "arabic": "بالتأكيد. دعيني أتحقق من الوزن. إنه 2 كيلو." },
          { "speaker": "Noor", "english": "How long will it take?", "arabic": "كم ستستغرق؟" },
          { "speaker": "Clerk", "english": "About one week. You need two stamps.", "arabic": "حوالي أسبوع واحد. تحتاجين طابعين." },
          { "speaker": "Noor", "english": "Here are the stamps. Thank you!", "arabic": "هذه الطوابع. شكراً!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "parcel", "meaning_ar": "طرد", "important": true },
          { "word": "weight", "meaning_ar": "وزن", "important": true },
          { "word": "overseas", "meaning_ar": "خارج البلاد", "important": true },
          { "word": "How long will it take?", "meaning_ar": "كم ستستغرق؟", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor sent a _____ to her family.", "options": ["parcel", "letter"], "correct": "parcel" },
          { "sentence": "The clerk checked the _____ of the parcel.", "options": ["weight", "color"], "correct": "weight" },
          { "sentence": "The parcel will go _____.", "options": ["overseas", "next door"], "correct": "overseas" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن مدة الإرسال:",
        "sentence": "How long will it take?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "طردك في طريقه! الآن تعرف كيف ترسل الطرود. الحلقة القادمة سنذهب إلى حلبة التزلج!"
      }
    }
  },
  {
    "lesson_id": "kids_story_017",
    "title_ar": "نور تذهب إلى حلبة التزلج",
    "title_en": "Noor Goes to the Ice Rink",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 17,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Emma"],
    "location": "Ice Rink",
    "vocabulary": [
      { "word": "skates", "meaning_ar": "زلاجات" },
      { "word": "ice", "meaning_ar": "جليد" },
      { "word": "slippery", "meaning_ar": "زلق" },
      { "word": "Can you hold my hand?", "meaning_ar": "هل يمكنك الإمساك بيدي؟" },
      { "word": "fall", "meaning_ar": "يسقط" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Emma", "english": "Put on your skates. The ice is very slippery!", "arabic": "ارتدي زلاجاتك. الجليد زلق جداً!" },
          { "speaker": "Noor", "english": "I'm scared. Can you hold my hand?", "arabic": "أنا خائفة. هل يمكنك الإمساك بيدي؟" },
          { "speaker": "Emma", "english": "Of course. Don't worry, I won't let you fall.", "arabic": "بالتأكيد. لا تقلقي، لن أسمح لك بالسقوط." },
          { "speaker": "Noor", "english": "This is fun! I'm skating!", "arabic": "هذا ممتع! أنا أتزلج!" },
          { "speaker": "Emma", "english": "You're doing great! Let's go around again.", "arabic": "أنت تبلي بلاءً حسناً! دعينا نذهب لجولة أخرى." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "skates", "meaning_ar": "زلاجات", "important": true },
          { "word": "slippery", "meaning_ar": "زلق", "important": true },
          { "word": "Can you hold my hand?", "meaning_ar": "هل يمكنك الإمساك بيدي؟", "important": true },
          { "word": "fall", "meaning_ar": "يسقط", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor wore _____ on her feet.", "options": ["skates", "shoes"], "correct": "skates" },
          { "sentence": "The ice was very _____.", "options": ["slippery", "dry"], "correct": "slippery" },
          { "sentence": "Noor asked Emma to hold her _____.", "options": ["hand", "bag"], "correct": "hand" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب المساعدة بأدب:",
        "sentence": "Can you hold my hand, please?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "متزلجة رائعة! الآن تستطيع التزلج بأمان. الحلقة القادمة سنصنع البيتزا مع الأصدقاء!"
      }
    }
  },
  {
    "lesson_id": "kids_story_018",
    "title_ar": "نور تصنع بيتزا مع صديقتها",
    "title_en": "Noor Makes Pizza with Her Friend",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 18,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Emma"],
    "location": "Kitchen",
    "vocabulary": [
      { "word": "dough", "meaning_ar": "عجينة" },
      { "word": "cheese", "meaning_ar": "جبنة" },
      { "word": "tomato sauce", "meaning_ar": "صلصة طماطم" },
      { "word": "oven", "meaning_ar": "فرن" },
      { "word": "yummy", "meaning_ar": "لذيذ" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Emma", "english": "Let's make pizza! First, roll the dough.", "arabic": "دعينا نصنع البيتزا! أولاً، افردي العجينة." },
          { "speaker": "Noor", "english": "Okay. Now add tomato sauce?", "arabic": "حسناً. الآن نضيف صلصة الطماطم؟" },
          { "speaker": "Emma", "english": "Yes, then add cheese on top.", "arabic": "نعم، ثم أضيفي الجبنة فوقها." },
          { "speaker": "Noor", "english": "Put it in the oven for 15 minutes!", "arabic": "ضعيها في الفرن لمدة 15 دقيقة!" },
          { "speaker": "Emma", "english": "Mmm, it's ready! This pizza is yummy.", "arabic": "ممم، إنها جاهزة! هذه البيتزا لذيذة." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "dough", "meaning_ar": "عجينة", "important": true },
          { "word": "cheese", "meaning_ar": "جبنة", "important": true },
          { "word": "oven", "meaning_ar": "فرن", "important": true },
          { "word": "yummy", "meaning_ar": "لذيذ", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "First, they rolled the _____.", "options": ["dough", "cheese"], "correct": "dough" },
          { "sentence": "They put the pizza in the _____.", "options": ["oven", "fridge"], "correct": "oven" },
          { "sentence": "The pizza was _____.", "options": ["yummy", "salty"], "correct": "yummy" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول إن البيتزا جاهزة:",
        "sentence": "The pizza is ready! It's yummy!"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "شيف بيتزا محترف! الآن تعرف كيف تصنع البيتزا. الحلقة القادمة سنزور حوض الأسماك!"
      }
    }
  },
  {
    "lesson_id": "kids_story_019",
    "title_ar": "نور تزور حوض الأسماك",
    "title_en": "Noor Visits the Aquarium",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 19,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Aquarium Guide"],
    "location": "Aquarium",
    "vocabulary": [
      { "word": "shark", "meaning_ar": "قرش" },
      { "word": "turtle", "meaning_ar": "سلحفاة" },
      { "word": "jellyfish", "meaning_ar": "قنديل بحر" },
      { "word": "tank", "meaning_ar": "حوض" },
      { "word": "amazing", "meaning_ar": "مذهل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noor", "english": "Look at the shark! It's so big!", "arabic": "انظروا إلى القرش! إنه كبير جداً!" },
          { "speaker": "Guide", "english": "Yes, and here is a turtle. It's swimming slowly.", "arabic": "نعم، وهذه سلحفاة. إنها تسبح ببطء." },
          { "speaker": "Noor", "english": "What are those? They look like umbrellas.", "arabic": "ما هذه؟ تشبه المظلات." },
          { "speaker": "Guide", "english": "Those are jellyfish. They live in the big tank.", "arabic": "هذه قناديل بحر. تعيش في الحوض الكبير." },
          { "speaker": "Noor", "english": "This is amazing! I love the aquarium.", "arabic": "هذا مذهل! أحب حوض الأسماك." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "shark", "meaning_ar": "قرش", "important": true },
          { "word": "turtle", "meaning_ar": "سلحفاة", "important": true },
          { "word": "jellyfish", "meaning_ar": "قنديل بحر", "important": false },
          { "word": "amazing", "meaning_ar": "مذهل", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor saw a big _____ in the aquarium.", "options": ["shark", "cat"], "correct": "shark" },
          { "sentence": "The _____ was swimming slowly.", "options": ["turtle", "fish"], "correct": "turtle" },
          { "sentence": "She thought the jellyfish looked like _____.", "options": ["umbrellas", "balls"], "correct": "umbrellas" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تعبر عن إعجابك:",
        "sentence": "This is amazing!"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "مستكشف بحري رائع! الآن تعرف أسماء حيوانات البحر. الحلقة القادمة سنعود إلى المطار للعودة إلى الوطن."
      }
    }
  },
  {
    "lesson_id": "kids_story_020",
    "title_ar": "نور في المطار للعودة",
    "title_en": "Noor at the Airport to Return",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 20,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Check-in Agent"],
    "location": "Airport",
    "vocabulary": [
      { "word": "check-in", "meaning_ar": "تسجيل الوصول" },
      { "word": "boarding pass", "meaning_ar": "بطاقة صعود الطائرة" },
      { "word": "departure", "meaning_ar": "مغادرة" },
      { "word": "suitcase", "meaning_ar": "حقيبة" },
      { "word": "window seat", "meaning_ar": "مقعد بجانب النافذة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Agent", "english": "Good morning. Can I see your passport?", "arabic": "صباح الخير. هل يمكنني رؤية جواز سفرك؟" },
          { "speaker": "Noor", "english": "Here it is. I want to check-in my suitcase.", "arabic": "ها هو. أريد تسجيل حقيبتي." },
          { "speaker": "Agent", "english": "Okay. Window seat or aisle seat?", "arabic": "حسناً. مقعد بجانب النافذة أم الممر؟" },
          { "speaker": "Noor", "english": "Window seat, please. What time is departure?", "arabic": "مقعد النافذة من فضلك. متى موعد المغادرة؟" },
          { "speaker": "Agent", "english": "Departure is at 10 am. Here is your boarding pass.", "arabic": "المغادرة الساعة 10 صباحاً. هذه بطاقة صعودك." },
          { "speaker": "Noor", "english": "Thank you! I'm going home.", "arabic": "شكراً! سأعود إلى وطني." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "check-in", "meaning_ar": "تسجيل الوصول", "important": true },
          { "word": "boarding pass", "meaning_ar": "بطاقة صعود الطائرة", "important": true },
          { "word": "departure", "meaning_ar": "مغادرة", "important": true },
          { "word": "suitcase", "meaning_ar": "حقيبة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor went to the _____ desk.", "options": ["check-in", "check-out"], "correct": "check-in" },
          { "sentence": "The agent gave her a _____.", "options": ["boarding pass", "ticket"], "correct": "boarding pass" },
          { "sentence": "She chose a _____ seat.", "options": ["window", "middle"], "correct": "window" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن موعد المغادرة:",
        "sentence": "What time is departure?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "مسافرة ذكية! الآن تعرفين إجراءات المطار. الحلقة الأخيرة ستصلين فيها إلى البيت!"
      }
    }
  },
  {
    "lesson_id": "kids_story_021",
    "title_ar": "نور تصل إلى بيتها",
    "title_en": "Noor Arrives Home",
    "category": "kids_stories",
    "series": "نادي حكايات نور",
    "episode": 21,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noor", "Noor's Mother"],
    "location": "Home",
    "vocabulary": [
      { "word": "miss", "meaning_ar": "يفتقد" },
      { "word": "hug", "meaning_ar": "عناق" },
      { "word": "excited", "meaning_ar": "متحمس" },
      { "word": "I had a great time", "meaning_ar": "قضيت وقتاً رائعاً" },
      { "word": "next adventure", "meaning_ar": "المغامرة القادمة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Mother", "english": "Noor! Welcome home! I missed you so much!", "arabic": "نور! أهلاً بعودتك! لقد اشتقت إليك كثيراً!" },
          { "speaker": "Noor", "english": "Mom! I missed you too. Give me a hug!", "arabic": "أمي! اشتقت إليك أيضاً. عانقيني!" },
          { "speaker": "Mother", "english": "How was London? Tell me everything.", "arabic": "كيف كانت لندن؟ أخبريني بكل شيء." },
          { "speaker": "Noor", "english": "I had a great time! I made friends and learned so much.", "arabic": "قضيت وقتاً رائعاً! كونت صداقات وتعلمت الكثير." },
          { "speaker": "Mother", "english": "I'm so excited for your next adventure!", "arabic": "أنا متحمسة جداً لمغامرتك القادمة!" },
          { "speaker": "Noor", "english": "Me too! But now, I'm happy to be home.", "arabic": "وأنا أيضاً! لكن الآن، أنا سعيدة لكوني في البيت." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "miss", "meaning_ar": "يفتقد", "important": true },
          { "word": "hug", "meaning_ar": "عناق", "important": true },
          { "word": "excited", "meaning_ar": "متحمس", "important": true },
          { "word": "I had a great time", "meaning_ar": "قضيت وقتاً رائعاً", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "Noor's mother _____ her very much.", "options": ["missed", "forgot"], "correct": "missed" },
          { "sentence": "They gave each other a big _____.", "options": ["hug", "handshake"], "correct": "hug" },
          { "sentence": "Noor said she _____ a great time in London.", "options": ["had", "made"], "correct": "had" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تعبر عن فرحتك بالعودة:",
        "sentence": "I'm happy to be home!"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "لقد عدت إلى البيت يا بطلة! أتمنى أن تكون قد استمتعت بمغامرات نور في لندن. انتظرونا في مغامرات جديدة!"
      }
    }
  }
];
