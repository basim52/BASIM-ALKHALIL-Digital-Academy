import { KidStory } from "./kidsStories";

export const KIDS_STORIES_EXTRA: KidStory[] = [
  {
    "lesson_id": "kids_story_022",
    "title_ar": "سامي في حديقة الحيوان",
    "title_en": "Sami at the Zoo",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 22,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Sami", "Zookeeper"],
    "location": "Zoo",
    "vocabulary": [
      { "word": "lion", "meaning_ar": "أسد" },
      { "word": "cage", "meaning_ar": "قفص" },
      { "word": "dangerous", "meaning_ar": "خطر" },
      { "word": "feed", "meaning_ar": "يطعم" },
      { "word": "zookeeper", "meaning_ar": "حارس الحديقة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Sami", "english": "Look at the lion! Can I feed him?", "arabic": "انظر إلى الأسد! هل يمكنني إطعامه؟" },
          { "speaker": "Zookeeper", "english": "No, it's dangerous. We feed them at 12.", "arabic": "لا، إنه خطر. نحن نطعمهم الساعة 12." },
          { "speaker": "Sami", "english": "What does he eat?", "arabic": "ماذا يأكل؟" },
          { "speaker": "Zookeeper", "english": "Meat and special food.", "arabic": "لحماً وطعاماً خاصاً." },
          { "speaker": "Sami", "english": "Wow! I love lions. They are the kings.", "arabic": "واو! أحب الأسود. إنهم الملوك." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة مهمة!",
        "words": [
          { "word": "lion", "meaning_ar": "أسد", "important": true },
          { "word": "dangerous", "meaning_ar": "خطر", "important": true },
          { "word": "feed", "meaning_ar": "يطعم", "important": true },
          { "word": "zookeeper", "meaning_ar": "حارس الحديقة", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة:",
        "questions": [
          { "sentence": "The _____ is the king of animals.", "options": ["lion", "cat"], "correct": "lion" },
          { "sentence": "Do not touch! It's _____.", "options": ["dangerous", "safe"], "correct": "dangerous" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن الحيوان:",
        "sentence": "Can I feed the lion?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت شجاع مثل الأسد! تعلمت عن الحيوانات."
      }
    }
  },
  {
    "lesson_id": "kids_story_023",
    "title_ar": "ليلى تزرع زهرة",
    "title_en": "Laila Plants a Flower",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 23,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Laila", "Grandma"],
    "location": "Garden",
    "vocabulary": [
      { "word": "seed", "meaning_ar": "بذرة" },
      { "word": "soil", "meaning_ar": "تربة" },
      { "word": "water", "meaning_ar": "ماء / يسقي" },
      { "word": "grow", "meaning_ar": "ينمو" },
      { "word": "flower", "meaning_ar": "زهرة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Laila", "english": "Grandma, how do flowers grow?", "arabic": "جدتي، كيف تنمو الأزهار؟" },
          { "speaker": "Grandma", "english": "We put a seed in the soil and water it.", "arabic": "نضع بذرة في التربة ونسقيها." },
          { "speaker": "Laila", "english": "Can I plant one?", "arabic": "هل يمكنني زرع واحدة؟" },
          { "speaker": "Grandma", "english": "Of course. This is a sunflower seed.", "arabic": "بالتأكيد. هذه بذرة دوار الشمس." },
          { "speaker": "Laila", "english": "I will water it every day so it grows big!", "arabic": "سأسقيها كل يوم حتى تنمو كبيرة!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "seed", "meaning_ar": "بذرة", "important": true },
          { "word": "soil", "meaning_ar": "تربة", "important": true },
          { "word": "grow", "meaning_ar": "ينمو", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "Put the _____ in the soil.", "options": ["seed", "leaf"], "correct": "seed" },
          { "sentence": "Plants need sun and _____ to grow.", "options": ["water", "milk"], "correct": "water" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل جدتك:",
        "sentence": "Grandma, can I plant a flower?"
      },
      "encouragement": { "type": "text", "content_ar": "أصبحت مزارعاً صغيراً! اهتم ببذرتك." }
    }
  },
  {
    "lesson_id": "kids_story_024",
    "title_ar": "عمر يذهب إلى طبيب الأسنان",
    "title_en": "Omar Goes to the Dentist",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 24,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Omar", "Dentist"],
    "location": "Dental Clinic",
    "vocabulary": [
      { "word": "tooth", "meaning_ar": "سن" },
      { "word": "brush", "meaning_ar": "فرشاة / ينظف" },
      { "word": "cavity", "meaning_ar": "تسوس" },
      { "word": "open wide", "meaning_ar": "افتح فمك واسعاً" },
      { "word": "healthy", "meaning_ar": "صحي" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Dentist", "english": "Hello, Omar. Open wide, please.", "arabic": "مرحباً عمر. افتح فمك واسعاً من فضلك." },
          { "speaker": "Omar", "english": "Aaaah... Is my tooth okay?", "arabic": "آآآه... هل سني بخير؟" },
          { "speaker": "Dentist", "english": "You have a small cavity. Do you brush your teeth?", "arabic": "لديك تسوس صغير. هل تنظف أسنانك؟" },
          { "speaker": "Omar", "english": "Sometimes... I forget at night.", "arabic": "أحياناً... أنسى في الليل." },
          { "speaker": "Dentist", "english": "Brush twice a day to keep them healthy.", "arabic": "نظف أسنانك مرتين يومياً لتبقى صحية." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "tooth", "meaning_ar": "سن", "important": true },
          { "word": "brush", "meaning_ar": "ينظف الأسنان", "important": true },
          { "word": "cavity", "meaning_ar": "تسوس", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "_____ your teeth every day.", "options": ["Brush", "Wash"], "correct": "Brush" },
          { "sentence": "Eating too much candy can cause a _____.", "options": ["cavity", "smile"], "correct": "cavity" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول للطبيب:",
        "sentence": "I brush my teeth twice a day!"
      },
      "encouragement": { "type": "text", "content_ar": "أسنانك لؤلؤ! حافظ عليها." }
    }
  },
  {
    "lesson_id": "kids_story_025",
    "title_ar": "نورة ترسم قوس قزح",
    "title_en": "Noura Paints a Rainbow",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 25,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Noura", "Art Teacher"],
    "location": "Art Room",
    "vocabulary": [
      { "word": "rainbow", "meaning_ar": "قوس قزح" },
      { "word": "paint", "meaning_ar": "يرسم / طلاء" },
      { "word": "colors", "meaning_ar": "ألوان" },
      { "word": "brush", "meaning_ar": "فرشاة الرسم" },
      { "word": "beautiful", "meaning_ar": "جميل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Noura", "english": "Teacher, I want to paint a rainbow.", "arabic": "أستاذة، أريد رسم قوس قزح." },
          { "speaker": "Art Teacher", "english": "Great! What colors do you need?", "arabic": "رائع! ما الألوان التي تحتاجينها؟" },
          { "speaker": "Noura", "english": "Red, orange, yellow, green, blue, and purple.", "arabic": "أحمر، برتقالي، أصفر، أخضر، أزرق، وبنفسجي." },
          { "speaker": "Art Teacher", "english": "Use your brush gently. Wow, it's beautiful!", "arabic": "استخدمي فرشاتك بلطف. واو، إنها جميلة!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "rainbow", "meaning_ar": "قوس قزح", "important": true },
          { "word": "paint", "meaning_ar": "يرسم", "important": true },
          { "word": "beautiful", "meaning_ar": "جميل", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "A _____ has seven colors.", "options": ["rainbow", "tree"], "correct": "rainbow" },
          { "sentence": "I use a _____ to paint.", "options": ["brush", "pen"], "correct": "brush" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تصف ألوان قوس قزح:",
        "sentence": "Red, orange, yellow, green, blue, purple!"
      },
      "encouragement": { "type": "text", "content_ar": "لوحتك رائعة! ألوان قوس قزح كلها حفظتها." }
    }
  },
  {
    "lesson_id": "kids_story_026",
    "title_ar": "راشد يبني قلعة رملية",
    "title_en": "Rashid Builds a Sandcastle",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 26,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Rashid", "Father"],
    "location": "Beach",
    "vocabulary": [
      { "word": "sand", "meaning_ar": "رمل" },
      { "word": "castle", "meaning_ar": "قلعة" },
      { "word": "bucket", "meaning_ar": "دلو" },
      { "word": "shovel", "meaning_ar": "مجرفة" },
      { "word": "wave", "meaning_ar": "موجة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Rashid", "english": "Dad, can we build a sandcastle?", "arabic": "أبي، هل يمكننا بناء قلعة رملية؟" },
          { "speaker": "Father", "english": "Yes! Bring the bucket and shovel.", "arabic": "نعم! أحضر الدلو والمجرفة." },
          { "speaker": "Rashid", "english": "Look at the big tower! It's like a real castle.", "arabic": "انظر إلى البرج الكبير! إنها مثل قلعة حقيقية." },
          { "speaker": "Father", "english": "Careful, the waves are coming.", "arabic": "انتبه، الموج قادم." },
          { "speaker": "Rashid", "english": "Oh no! The waves washed it away.", "arabic": "أوه لا! الموج جرفها." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "sand", "meaning_ar": "رمل", "important": true },
          { "word": "castle", "meaning_ar": "قلعة", "important": true },
          { "word": "wave", "meaning_ar": "موجة", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "We use a _____ to carry sand.", "options": ["bucket", "plate"], "correct": "bucket" },
          { "sentence": "A big _____ destroyed the castle.", "options": ["wave", "bird"], "correct": "wave" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب المساعدة:",
        "sentence": "Dad, can we build a sandcastle?"
      },
      "encouragement": { "type": "text", "content_ar": "باني قلاع محترف! استمتع بالشاطئ." }
    }
  },
  {
    "lesson_id": "kids_story_027",
    "title_ar": "مها تخبز كعكة",
    "title_en": "Maha Bakes a Cake",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 27,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Maha", "Mother"],
    "location": "Kitchen",
    "vocabulary": [
      { "word": "flour", "meaning_ar": "دقيق" },
      { "word": "sugar", "meaning_ar": "سكر" },
      { "word": "mix", "meaning_ar": "يخلط" },
      { "word": "oven", "meaning_ar": "فرن" },
      { "word": "birthday", "meaning_ar": "عيد ميلاد" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Maha", "english": "Mom, it's my friend's birthday. Let's bake a cake!", "arabic": "أمي، إنه عيد ميلاد صديقتي. دعينا نخبز كعكة!" },
          { "speaker": "Mother", "english": "Good idea. We need flour, sugar, and eggs.", "arabic": "فكرة جيدة. نحتاج دقيقاً وسكراً وبيضاً." },
          { "speaker": "Maha", "english": "I will mix them in the bowl.", "arabic": "سأخلطهم في الوعاء." },
          { "speaker": "Mother", "english": "Now put it in the oven for 30 minutes.", "arabic": "الآن ضعيها في الفرن لمدة 30 دقيقة." },
          { "speaker": "Maha", "english": "It smells so good! Happy birthday to my friend.", "arabic": "رائحتها رائعة! عيد ميلاد سعيد لصديقتي." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "flour", "meaning_ar": "دقيق", "important": true },
          { "word": "mix", "meaning_ar": "يخلط", "important": true },
          { "word": "oven", "meaning_ar": "فرن", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "We need _____ to make a cake.", "options": ["flour", "salt"], "correct": "flour" },
          { "sentence": "Bake the cake in the _____.", "options": ["oven", "fridge"], "correct": "oven" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقول المكونات:",
        "sentence": "We need flour, sugar, and eggs."
      },
      "encouragement": { "type": "text", "content_ar": "شيف ماهر! كعكتك ستكون لذيذة." }
    }
  },
  {
    "lesson_id": "kids_story_028",
    "title_ar": "فيصل يرى نجماً ساطعاً",
    "title_en": "Faisal Sees a Bright Star",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 28,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Faisal", "Uncle"],
    "location": "Rooftop at night",
    "vocabulary": [
      { "word": "star", "meaning_ar": "نجم" },
      { "word": "moon", "meaning_ar": "قمر" },
      { "word": "bright", "meaning_ar": "ساطع" },
      { "word": "telescope", "meaning_ar": "تلسكوب" },
      { "word": "sky", "meaning_ar": "سماء" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Faisal", "english": "Uncle, what is that bright star?", "arabic": "عمي، ما هذا النجم الساطع؟" },
          { "speaker": "Uncle", "english": "That's not a star. It's the planet Venus.", "arabic": "هذا ليس نجماً. إنه كوكب الزهرة." },
          { "speaker": "Faisal", "english": "Can I see it with the telescope?", "arabic": "هل يمكنني رؤيته بالتلسكوب？" },
          { "speaker": "Uncle", "english": "Yes, look. The sky is full of wonders.", "arabic": "نعم، انظر. السماء مليئة بالعجائب." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "star", "meaning_ar": "نجم", "important": true },
          { "word": "moon", "meaning_ar": "قمر", "important": true },
          { "word": "bright", "meaning_ar": "ساطع", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "At night we see the _____ and the stars.", "options": ["moon", "sun"], "correct": "moon" },
          { "sentence": "The star is very _____.", "options": ["bright", "dark"], "correct": "bright" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن السماء:",
        "sentence": "Look at the bright star! Is it a planet?"
      },
      "encouragement": { "type": "text", "content_ar": "عالم فضاء صغير! استمر في استكشاف السماء." }
    }
  },
  {
    "lesson_id": "kids_story_029",
    "title_ar": "دانة تتعلم السباحة",
    "title_en": "Dana Learns to Swim",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 29,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Dana", "Coach"],
    "location": "Swimming Pool",
    "vocabulary": [
      { "word": "pool", "meaning_ar": "مسبح" },
      { "word": "kick", "meaning_ar": "يركل" },
      { "word": "float", "meaning_ar": "يطفو" },
      { "word": "deep", "meaning_ar": "عميق" },
      { "word": "breathe", "meaning_ar": "يتنفس" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Dana", "english": "Coach, the water is deep. I'm scared.", "arabic": "مدرب، الماء عميق. أنا خائفة." },
          { "speaker": "Coach", "english": "Don't worry. Kick your legs and breathe.", "arabic": "لا تقلقي. اركلي برجليك وتنفسي." },
          { "speaker": "Dana", "english": "I'm floating! I'm swimming!", "arabic": "أنا أطفو! أنا أسبح!" },
          { "speaker": "Coach", "english": "Great job! Practice makes perfect.", "arabic": "أحسنت! الممارسة تصنع الكمال." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "pool", "meaning_ar": "مسبح", "important": true },
          { "word": "kick", "meaning_ar": "يركل", "important": true },
          { "word": "breathe", "meaning_ar": "يتنفس", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "We swim in a _____.", "options": ["pool", "park"], "correct": "pool" },
          { "sentence": "_____ your legs to swim.", "options": ["Kick", "Walk"], "correct": "Kick" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشجع نفسك:",
        "sentence": "Kick and breathe! I can swim!"
      },
      "encouragement": { "type": "text", "content_ar": "سباح ماهر! استمر في التدريب." }
    }
  },
  {
    "lesson_id": "kids_story_030",
    "title_ar": "جود في المكتبة",
    "title_en": "Jood at the Library",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 30,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Jood", "Librarian"],
    "location": "Library",
    "vocabulary": [
      { "word": "book", "meaning_ar": "كتاب" },
      { "word": "quiet", "meaning_ar": "هادئ" },
      { "word": "borrow", "meaning_ar": "يستعير" },
      { "word": "return", "meaning_ar": "يعيد" },
      { "word": "shelf", "meaning_ar": "رف" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Jood", "english": "Excuse me, where are the story books?", "arabic": "المعذرة، أين كتب القصص؟" },
          { "speaker": "Librarian", "english": "On the third shelf. Remember to be quiet.", "arabic": "على الرف الثالث. تذكري أن تكوني هادئة." },
          { "speaker": "Jood", "english": "Can I borrow two books?", "arabic": "هل يمكنني استعارة كتابين؟" },
          { "speaker": "Librarian", "english": "Yes, return them in two weeks.", "arabic": "نعم، أعيديهما بعد أسبوعين." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "borrow", "meaning_ar": "يستعير", "important": true },
          { "word": "return", "meaning_ar": "يعيد", "important": true },
          { "word": "quiet", "meaning_ar": "هادئ", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "You can _____ books from the library.", "options": ["borrow", "buy"], "correct": "borrow" },
          { "sentence": "Please be _____ in the library.", "options": ["quiet", "loud"], "correct": "quiet" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل أمينة المكتبة:",
        "sentence": "Can I borrow this book, please?"
      },
      "encouragement": { "type": "text", "content_ar": "قارئ ذكي! الكتب أصدقاء رائعون." }
    }
  },
  {
    "lesson_id": "kids_story_031",
    "title_ar": "عبد الله يلعب كرة القدم",
    "title_en": "Abdullah Plays Football",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 31,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Abdullah", "Coach"],
    "location": "Football Field",
    "vocabulary": [
      { "word": "kick", "meaning_ar": "يركل" },
      { "word": "goal", "meaning_ar": "هدف" },
      { "word": "team", "meaning_ar": "فريق" },
      { "word": "pass", "meaning_ar": "يمرر" },
      { "word": "score", "meaning_ar": "يسجل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Coach", "english": "Kick the ball to the goal!", "arabic": "اركل الكرة نحو المرمى!" },
          { "speaker": "Abdullah", "english": "I scored! Our team won!", "arabic": "سجلت! فريقنا فاز!" },
          { "speaker": "Coach", "english": "Great teamwork! Pass more next time.", "arabic": "عمل جماعي رائع! مرر أكثر في المرة القادمة." },
          { "speaker": "Abdullah", "english": "I will. We are the best team.", "arabic": "سأفعل. نحن أفضل فريق." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "goal", "meaning_ar": "هدف", "important": true },
          { "word": "team", "meaning_ar": "فريق", "important": true },
          { "word": "score", "meaning_ar": "يسجل هدفاً", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "He kicked the ball and _____.", "options": ["scored", "ran"], "correct": "scored" },
          { "sentence": "We play as a _____.", "options": ["team", "group"], "correct": "team" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشجع فريقك:",
        "sentence": "Go team! Score a goal!"
      },
      "encouragement": { "type": "text", "content_ar": "هداف المستقبل! واصل التدريب." }
    }
  },
  {
    "lesson_id": "kids_story_032",
    "title_ar": "ريم في رحلة إلى الجبل",
    "title_en": "Reem's Mountain Trip",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 32,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Reem", "Guide"],
    "location": "Mountain",
    "vocabulary": [
      { "word": "mountain", "meaning_ar": "جبل" },
      { "word": "climb", "meaning_ar": "يتسلق" },
      { "word": "path", "meaning_ar": "ممر" },
      { "word": "view", "meaning_ar": "منظر" },
      { "word": "tired", "meaning_ar": "متعب" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Reem", "english": "This mountain is so high! I'm tired.", "arabic": "هذا الجبل عالٍ جداً! أنا متعبة." },
          { "speaker": "Guide", "english": "We are almost there. Look at the view!", "arabic": "نحن على وشك الوصول. انظري إلى المنظر!" },
          { "speaker": "Reem", "english": "Wow, the trees look so small from here.", "arabic": "واو، الأشجار تبدو صغيرة جداً من هنا." },
          { "speaker": "Guide", "english": "Nature is beautiful. Let's rest here.", "arabic": "الطبيعة جميلة. دعينا نرتاح هنا." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "mountain", "meaning_ar": "جبل", "important": true },
          { "word": "climb", "meaning_ar": "يتسلق", "important": true },
          { "word": "view", "meaning_ar": "منظر", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "We _____ the mountain slowly.", "options": ["climb", "run"], "correct": "climb" },
          { "sentence": "The _____ from the top is amazing.", "options": ["view", "food"], "correct": "view" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تصف المنظر:",
        "sentence": "Look at the beautiful view from the mountain!"
      },
      "encouragement": { "type": "text", "content_ar": "متسلق جبال شجاع! استمتع بالطبيعة." }
    }
  },
  {
    "lesson_id": "kids_story_033",
    "title_ar": "بدر يصلح دراجته",
    "title_en": "Badr Fixes His Bike",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 33,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Badr", "Mechanic"],
    "location": "Bike Shop",
    "vocabulary": [
      { "word": "wheel", "meaning_ar": "عجلة" },
      { "word": "broken", "meaning_ar": "مكسور" },
      { "word": "fix", "meaning_ar": "يصلح" },
      { "word": "tool", "meaning_ar": "أداة" },
      { "word": "ride", "meaning_ar": "يركب" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Badr", "english": "My bike wheel is broken. Can you fix it?", "arabic": "عجلة دراجتي مكسورة. هل يمكنك إصلاحها؟" },
          { "speaker": "Mechanic", "english": "Let me check. Yes, I need a tool.", "arabic": "دعني أتحقق. نعم، أحتاج أداة." },
          { "speaker": "Badr", "english": "How long will it take?", "arabic": "كم ستستغرق؟" },
          { "speaker": "Mechanic", "english": "About 10 minutes. Then you can ride again.", "arabic": "حوالي 10 دقائق. ثم يمكنك الركوب مجدداً." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "wheel", "meaning_ar": "عجلة", "important": true },
          { "word": "fix", "meaning_ar": "يصلح", "important": true },
          { "word": "broken", "meaning_ar": "مكسور", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The bike has two _____.", "options": ["wheels", "doors"], "correct": "wheels" },
          { "sentence": "My toy is _____. Can you fix it?", "options": ["broken", "new"], "correct": "broken" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب المساعدة:",
        "sentence": "Can you fix my bike, please?"
      },
      "encouragement": { "type": "text", "content_ar": "ميكانيكي المستقبل! أنت تصلح كل شيء." }
    }
  },
  {
    "lesson_id": "kids_story_034",
    "title_ar": "حنين تزور المزرعة",
    "title_en": "Haneen Visits the Farm",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 34,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Haneen", "Farmer"],
    "location": "Farm",
    "vocabulary": [
      { "word": "cow", "meaning_ar": "بقرة" },
      { "word": "milk", "meaning_ar": "حليب" },
      { "word": "horse", "meaning_ar": "حصان" },
      { "word": "chicken", "meaning_ar": "دجاجة" },
      { "word": "farm", "meaning_ar": "مزرعة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Haneen", "english": "Can I feed the chickens?", "arabic": "هل يمكنني إطعام الدجاج؟" },
          { "speaker": "Farmer", "english": "Yes, throw the seeds. The cow gives us milk.", "arabic": "نعم، انثري البذور. البقرة تعطينا الحليب." },
          { "speaker": "Haneen", "english": "Can I ride the horse?", "arabic": "هل يمكنني ركوب الحصان؟" },
          { "speaker": "Farmer", "english": "Maybe later. He is eating now.", "arabic": "ربما لاحقاً. إنه يأكل الآن." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "cow", "meaning_ar": "بقرة", "important": true },
          { "word": "horse", "meaning_ar": "حصان", "important": true },
          { "word": "farm", "meaning_ar": "مزرعة", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The _____ says moo.", "options": ["cow", "horse"], "correct": "cow" },
          { "sentence": "We get _____ from cows.", "options": ["milk", "water"], "correct": "milk" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل المزارع:",
        "sentence": "Can I ride the horse, please?"
      },
      "encouragement": { "type": "text", "content_ar": "مزارع صغير! أنت تعرف حيوانات المزرعة." }
    }
  },
  {
    "lesson_id": "kids_story_035",
    "title_ar": "سلطان في رحلة سفاري",
    "title_en": "Sultan on a Safari",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 35,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Sultan", "Ranger"],
    "location": "Safari Park",
    "vocabulary": [
      { "word": "elephant", "meaning_ar": "فيل" },
      { "word": "giraffe", "meaning_ar": "زرافة" },
      { "word": "jeep", "meaning_ar": "سيارة جيب" },
      { "word": "camera", "meaning_ar": "كاميرا" },
      { "word": "wild", "meaning_ar": "بري" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Sultan", "english": "Look! An elephant family is crossing the road.", "arabic": "انظر! عائلة فيلة تعبر الطريق." },
          { "speaker": "Ranger", "english": "Yes, and there is a giraffe eating from the tall tree.", "arabic": "نعم، وهناك زرافة تأكل من الشجرة العالية." },
          { "speaker": "Sultan", "english": "I'm taking a photo with my camera. This is wild!", "arabic": "سألتقط صورة بكاميرتي. هذا بري جداً!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "elephant", "meaning_ar": "فيل", "important": true },
          { "word": "giraffe", "meaning_ar": "زرافة", "important": true },
          { "word": "wild", "meaning_ar": "بري", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The _____ has a very long neck.", "options": ["giraffe", "elephant"], "correct": "giraffe" },
          { "sentence": "We saw _____ animals in the safari.", "options": ["wild", "pet"], "correct": "wild" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تصف مشهداً:",
        "sentence": "Look at the elephant! It's so big!"
      },
      "encouragement": { "type": "text", "content_ar": "مستكشف سفاري! الطبيعة البرية مذهلة." }
    }
  },
  {
    "lesson_id": "kids_story_036",
    "title_ar": "لمى تشتري خضروات من السوق",
    "title_en": "Lama Buys Vegetables",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 36,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Lama", "Vendor"],
    "location": "Market",
    "vocabulary": [
      { "word": "carrot", "meaning_ar": "جزر" },
      { "word": "potato", "meaning_ar": "بطاطس" },
      { "word": "fresh", "meaning_ar": "طازج" },
      { "word": "kilo", "meaning_ar": "كيلو" },
      { "word": "how much", "meaning_ar": "كم الثمن" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Lama", "english": "How much are the carrots?", "arabic": "كم ثمن الجزر؟" },
          { "speaker": "Vendor", "english": "One kilo is 5 riyals. Very fresh!", "arabic": "الكيلو بـ 5 ريالات. طازج جداً!" },
          { "speaker": "Lama", "english": "Give me one kilo of carrots and two kilos of potatoes.", "arabic": "أعطني كيلو جزر وكيلوين بطاطس." },
          { "speaker": "Vendor", "english": "Here you go. That's 15 riyals.", "arabic": "تفضلي. هذا بـ 15 ريالاً." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "carrot", "meaning_ar": "جزر", "important": true },
          { "word": "fresh", "meaning_ar": "طازج", "important": true },
          { "word": "how much", "meaning_ar": "كم الثمن", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "I want to buy a _____ of potatoes.", "options": ["kilo", "bag"], "correct": "kilo" },
          { "sentence": "The vegetables are very _____.", "options": ["fresh", "old"], "correct": "fresh" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن السعر:",
        "sentence": "How much is a kilo of carrots?"
      },
      "encouragement": { "type": "text", "content_ar": "متسوق ذكي! الخضروات الطازجة مهمة." }
    }
  },
  {
    "lesson_id": "kids_story_037",
    "title_ar": "فارس يخيم في الصحراء",
    "title_en": "Faris Camps in the Desert",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 37,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Faris", "Father"],
    "location": "Desert",
    "vocabulary": [
      { "word": "tent", "meaning_ar": "خيمة" },
      { "word": "fire", "meaning_ar": "نار" },
      { "word": "stars", "meaning_ar": "نجوم" },
      { "word": "blanket", "meaning_ar": "بطانية" },
      { "word": "camel", "meaning_ar": "جمل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Faris", "english": "Dad, the desert is so quiet at night.", "arabic": "أبي، الصحراء هادئة جداً في الليل." },
          { "speaker": "Father", "english": "Yes, look at the stars. They are bright.", "arabic": "نعم، انظر إلى النجوم. إنها ساطعة." },
          { "speaker": "Faris", "english": "Can we sleep under the stars?", "arabic": "هل يمكننا النوم تحت النجوم؟" },
          { "speaker": "Father", "english": "We have a tent and a warm blanket.", "arabic": "لدينا خيمة وبطانية دافئة." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "tent", "meaning_ar": "خيمة", "important": true },
          { "word": "stars", "meaning_ar": "نجوم", "important": true },
          { "word": "blanket", "meaning_ar": "بطانية", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "We sleep in a _____ when camping.", "options": ["tent", "house"], "correct": "tent" },
          { "sentence": "The _____ shine at night.", "options": ["stars", "clouds"], "correct": "stars" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تصف الليل:",
        "sentence": "Look at the bright stars in the desert sky!"
      },
      "encouragement": { "type": "text", "content_ar": "مخيم صغير! الصحراء مليئة بالأسرار." }
    }
  },
  {
    "lesson_id": "kids_story_038",
    "title_ar": "هند تنظف حديقة المنزل",
    "title_en": "Hind Cleans the Garden",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 38,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Hind", "Brother"],
    "location": "Home Garden",
    "vocabulary": [
      { "word": "leaf", "meaning_ar": "ورقة شجر" },
      { "word": "rake", "meaning_ar": "مشط الحديقة" },
      { "word": "clean", "meaning_ar": "ينظف" },
      { "word": "garbage", "meaning_ar": "قمامة" },
      { "word": "help", "meaning_ar": "يساعد" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Hind", "english": "The garden has many dry leaves. Can you help me?", "arabic": "الحديقة مليئة بالأوراق الجافة. هل يمكنك مساعدتي؟" },
          { "speaker": "Brother", "english": "Sure! I'll bring the rake.", "arabic": "بالتأكيد! سأحضر المشط." },
          { "speaker": "Hind", "english": "We must put the garbage in the bin.", "arabic": "يجب أن نضع القمامة في السلة." },
          { "speaker": "Brother", "english": "Look, the garden is clean now!", "arabic": "انظري، الحديقة نظيفة الآن!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "leaf", "meaning_ar": "ورقة شجر", "important": true },
          { "word": "clean", "meaning_ar": "ينظف", "important": true },
          { "word": "help", "meaning_ar": "يساعد", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "Use the _____ to collect leaves.", "options": ["rake", "broom"], "correct": "rake" },
          { "sentence": "Let's _____ the garden together.", "options": ["clean", "dirty"], "correct": "clean" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب المساعدة:",
        "sentence": "Can you help me clean the garden?"
      },
      "encouragement": { "type": "text", "content_ar": "حديقتك نظيفة وجميلة! العمل معاً ممتع." }
    }
  },
  {
    "lesson_id": "kids_story_039",
    "title_ar": "تركي يبني طائرة ورقية",
    "title_en": "Turki Builds a Kite",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 39,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Turki", "Sister"],
    "location": "Park",
    "vocabulary": [
      { "word": "kite", "meaning_ar": "طائرة ورقية" },
      { "word": "string", "meaning_ar": "خيط" },
      { "word": "fly", "meaning_ar": "يطير" },
      { "word": "wind", "meaning_ar": "رياح" },
      { "word": "high", "meaning_ar": "عالي" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Turki", "english": "The wind is strong. Let's fly the kite!", "arabic": "الرياح قوية. دعينا نطير الطائرة الورقية!" },
          { "speaker": "Sister", "english": "Hold the string tight. It's going high!", "arabic": "أمسك الخيط بقوة. إنها ترتفع!" },
          { "speaker": "Turki", "english": "Look, it's flying like a bird!", "arabic": "انظري، إنها تطير مثل الطائر!" },
          { "speaker": "Sister", "english": "Don't let go! The wind might take it.", "arabic": "لا تتركها! قد تأخذها الرياح." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "kite", "meaning_ar": "طائرة ورقية", "important": true },
          { "word": "fly", "meaning_ar": "يطير", "important": true },
          { "word": "wind", "meaning_ar": "رياح", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The _____ blows the kite into the sky.", "options": ["wind", "rain"], "correct": "wind" },
          { "sentence": "We need a long _____ to fly the kite.", "options": ["string", "stick"], "correct": "string" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشجع أختك:",
        "sentence": "Hold the string! It's flying so high!"
      },
      "encouragement": { "type": "text", "content_ar": "طيار الطائرات الورقية! اجعل أحلامك تحلق." }
    }
  },
  {
    "lesson_id": "kids_story_040",
    "title_ar": "غادة تعد عصير البرتقال",
    "title_en": "Ghada Makes Orange Juice",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 40,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Ghada", "Mother"],
    "location": "Kitchen",
    "vocabulary": [
      { "word": "orange", "meaning_ar": "برتقال" },
      { "word": "juice", "meaning_ar": "عصير" },
      { "word": "squeeze", "meaning_ar": "يعصر" },
      { "word": "glass", "meaning_ar": "كأس" },
      { "word": "healthy", "meaning_ar": "صحي" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Ghada", "english": "Mom, can I make orange juice?", "arabic": "أمي، هل يمكنني صنع عصير البرتقال؟" },
          { "speaker": "Mother", "english": "Yes, squeeze the oranges into the glass.", "arabic": "نعم، اعصري البرتقال في الكأس." },
          { "speaker": "Ghada", "english": "It smells so fresh! Here is your glass.", "arabic": "رائحته منعشة! هذا كأسك." },
          { "speaker": "Mother", "english": "Delicious and healthy. Thank you!", "arabic": "لذيذ وصحي. شكراً لك!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "orange", "meaning_ar": "برتقال", "important": true },
          { "word": "squeeze", "meaning_ar": "يعصر", "important": true },
          { "word": "healthy", "meaning_ar": "صحي", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "_____ the orange to make juice.", "options": ["Squeeze", "Cut"], "correct": "Squeeze" },
          { "sentence": "Fresh juice is _____.", "options": ["healthy", "bad"], "correct": "healthy" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقدم العصير:",
        "sentence": "Here is your fresh orange juice. Enjoy!"
      },
      "encouragement": { "type": "text", "content_ar": "صانع عصير ماهر! فيتامين C صحي." }
    }
  },
  {
    "lesson_id": "kids_story_041",
    "title_ar": "نايف يحل اللغز",
    "title_en": "Naif Solves the Puzzle",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 41,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Naif", "Teacher"],
    "location": "Classroom",
    "vocabulary": [
      { "word": "puzzle", "meaning_ar": "لغز" },
      { "word": "solve", "meaning_ar": "يحل" },
      { "word": "think", "meaning_ar": "يفكر" },
      { "word": "answer", "meaning_ar": "إجابة" },
      { "word": "smart", "meaning_ar": "ذكي" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Teacher", "english": "Here is a puzzle. Can you solve it?", "arabic": "هذا لغز. هل يمكنك حله؟" },
          { "speaker": "Naif", "english": "Let me think. I think the answer is 'key'.", "arabic": "دعني أفكر. أعتقد أن الإجابة هي 'مفتاح'." },
          { "speaker": "Teacher", "english": "Correct! You are very smart.", "arabic": "صحيح! أنت ذكي جداً." },
          { "speaker": "Naif", "english": "I love puzzles. They make me think.", "arabic": "أحب الألغاز. تجعلني أفكر." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "puzzle", "meaning_ar": "لغز", "important": true },
          { "word": "solve", "meaning_ar": "يحل", "important": true },
          { "word": "think", "meaning_ar": "يفكر", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "I like to _____ puzzles.", "options": ["solve", "break"], "correct": "solve" },
          { "sentence": "_____ before you answer.", "options": ["Think", "Run"], "correct": "Think" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تخمن الإجابة:",
        "sentence": "Let me think... I know the answer!"
      },
      "encouragement": { "type": "text", "content_ar": "عبقري صغير! الألغاز تقوي العقل." }
    }
  },
  {
    "lesson_id": "kids_story_042",
    "title_ar": "سارة تلتقط صوراً للطيور",
    "title_en": "Sara Takes Photos of Birds",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 42,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Sara", "Friend"],
    "location": "Park",
    "vocabulary": [
      { "word": "bird", "meaning_ar": "طائر" },
      { "word": "photo", "meaning_ar": "صورة" },
      { "word": "tree", "meaning_ar": "شجرة" },
      { "word": "fly", "meaning_ar": "يطير" },
      { "word": "nest", "meaning_ar": "عش" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Sara", "english": "Look at the bird on the tree. I want to take a photo.", "arabic": "انظر إلى الطائر على الشجرة. أريد التقاط صورة." },
          { "speaker": "Friend", "english": "Be quiet. Don't scare it away.", "arabic": "كن هادئاً. لا تخيفه." },
          { "speaker": "Sara", "english": "Got it! Look, it has a nest with baby birds.", "arabic": "التقطتها! انظر، لديه عش مع صغار." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "bird", "meaning_ar": "طائر", "important": true },
          { "word": "photo", "meaning_ar": "صورة", "important": true },
          { "word": "nest", "meaning_ar": "عش", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The _____ is singing on the branch.", "options": ["bird", "cat"], "correct": "bird" },
          { "sentence": "She took a _____ of the sunset.", "options": ["photo", "drawing"], "correct": "photo" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تطلب الهدوء:",
        "sentence": "Shh, be quiet! I want to take a photo of the bird."
      },
      "encouragement": { "type": "text", "content_ar": "مصورة الطبيعة! الطيور رائعة." }
    }
  },
  {
    "lesson_id": "kids_story_043",
    "title_ar": "خالد يزور جدته في القرية",
    "title_en": "Khalid Visits His Grandma",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 43,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Khalid", "Grandma"],
    "location": "Village",
    "vocabulary": [
      { "word": "village", "meaning_ar": "قرية" },
      { "word": "grandma", "meaning_ar": "جدة" },
      { "word": "sheep", "meaning_ar": "خروف" },
      { "word": "quiet", "meaning_ar": "هادئ" },
      { "word": "story", "meaning_ar": "قصة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Khalid", "english": "Grandma, the village is so quiet and beautiful.", "arabic": "جدتي، القرية هادئة وجميلة جداً." },
          { "speaker": "Grandma", "english": "Yes, my dear. Look at the sheep in the field.", "arabic": "نعم يا عزيزي. انظر إلى الخراف في الحقل." },
          { "speaker": "Khalid", "english": "Can you tell me a story about the old village?", "arabic": "هل يمكنك أن تحكي لي قصة عن القرية القديمة؟" },
          { "speaker": "Grandma", "english": "Of course. Sit here and listen.", "arabic": "بالتأكيد. اجلس هنا واستمع." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "village", "meaning_ar": "قرية", "important": true },
          { "word": "sheep", "meaning_ar": "خروف", "important": true },
          { "word": "story", "meaning_ar": "قصة", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "My grandma lives in a small _____.", "options": ["village", "city"], "correct": "village" },
          { "sentence": "The _____ says baa.", "options": ["sheep", "bird"], "correct": "sheep" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل جدتك:",
        "sentence": "Grandma, can you tell me a story?"
      },
      "encouragement": { "type": "text", "content_ar": "زيارة جدتي هي الأفضل! القرية مليئة بالحكايات." }
    }
  },
  {
    "lesson_id": "kids_story_044",
    "title_ar": "تالا ترقص في المهرجان",
    "title_en": "Tala Dances at the Festival",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 44,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Tala", "Friend"],
    "location": "Festival",
    "vocabulary": [
      { "word": "dance", "meaning_ar": "يرقص" },
      { "word": "music", "meaning_ar": "موسيقى" },
      { "word": "happy", "meaning_ar": "سعيد" },
      { "word": "clap", "meaning_ar": "يصفق" },
      { "word": "costume", "meaning_ar": "زي" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Tala", "english": "The music is so lively! I want to dance.", "arabic": "الموسيقى حيوية جداً! أريد أن أرقص." },
          { "speaker": "Friend", "english": "Your costume looks beautiful. Let's dance together.", "arabic": "زيك يبدو جميلاً. دعينا نرقص معاً." },
          { "speaker": "Tala", "english": "Everyone is clapping. I feel so happy!", "arabic": "الجميع يصفقون. أشعر بسعادة كبيرة!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "dance", "meaning_ar": "يرقص", "important": true },
          { "word": "music", "meaning_ar": "موسيقى", "important": true },
          { "word": "clap", "meaning_ar": "يصفق", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "We _____ to the rhythm of the music.", "options": ["dance", "sleep"], "correct": "dance" },
          { "sentence": "The _____ was loud and fun.", "options": ["music", "story"], "correct": "music" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تدعو صديقتك للرقص:",
        "sentence": "Let's dance! The music is amazing!"
      },
      "encouragement": { "type": "text", "content_ar": "راقصة رائعة! عبر عن فرحك." }
    }
  },
  {
    "lesson_id": "kids_story_045",
    "title_ar": "راكان يخترع روبوتاً",
    "title_en": "Rakan Invents a Robot",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 45,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Rakan", "Teacher"],
    "location": "School Lab",
    "vocabulary": [
      { "word": "robot", "meaning_ar": "روبوت" },
      { "word": "invent", "meaning_ar": "يخترع" },
      { "word": "battery", "meaning_ar": "بطارية" },
      { "word": "move", "meaning_ar": "يتحرك" },
      { "word": "future", "meaning_ar": "مستقبل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Rakan", "english": "Teacher, I made a small robot. Look!", "arabic": "أستاذ، صنعت روبوتاً صغيراً. انظر!" },
          { "speaker": "Teacher", "english": "Wow! Does it move?", "arabic": "واو! هل يتحرك؟" },
          { "speaker": "Rakan", "english": "Yes, I put a battery inside. It walks!", "arabic": "نعم، وضعت بطارية بالداخل. إنه يمشي!" },
          { "speaker": "Teacher", "english": "Amazing! You will invent great things in the future.", "arabic": "مذهل! ستخترع أشياء عظيمة في المستقبل." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "robot", "meaning_ar": "روبوت", "important": true },
          { "word": "invent", "meaning_ar": "يخترع", "important": true },
          { "word": "move", "meaning_ar": "يتحرك", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The _____ needs a battery to move.", "options": ["robot", "car"], "correct": "robot" },
          { "sentence": "Scientists _____ new things.", "options": ["invent", "break"], "correct": "invent" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تقدم اختراعك:",
        "sentence": "Look! I invented a robot that moves!"
      },
      "encouragement": { "type": "text", "content_ar": "مخترع الغد! استمر في الإبداع." }
    }
  },
  {
    "lesson_id": "kids_story_046",
    "title_ar": "جنى تنظف أسنانها كل يوم",
    "title_en": "Jana Brushes Her Teeth",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 46,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Jana", "Dentist"],
    "location": "Bathroom / Clinic",
    "vocabulary": [
      { "word": "toothpaste", "meaning_ar": "معجون أسنان" },
      { "word": "toothbrush", "meaning_ar": "فرشاة أسنان" },
      { "word": "morning", "meaning_ar": "صباح" },
      { "word": "night", "meaning_ar": "ليل" },
      { "word": "smile", "meaning_ar": "ابتسامة" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Jana", "english": "Dentist, how can I keep my teeth white?", "arabic": "دكتور الأسنان، كيف أحافظ على أسناني بيضاء؟" },
          { "speaker": "Dentist", "english": "Use toothpaste and brush every morning and night.", "arabic": "استخدمي معجون الأسنان ونظفيها كل صباح ومساء." },
          { "speaker": "Jana", "english": "I will brush them now. Smile!", "arabic": "سأنظفها الآن. ابتسامة!" },
          { "speaker": "Dentist", "english": "Beautiful! Keep smiling.", "arabic": "جميل! حافظي على ابتسامتك." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "toothbrush", "meaning_ar": "فرشاة أسنان", "important": true },
          { "word": "toothpaste", "meaning_ar": "معجون أسنان", "important": true },
          { "word": "smile", "meaning_ar": "ابتسامة", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "Put _____ on your toothbrush.", "options": ["toothpaste", "soap"], "correct": "toothpaste" },
          { "sentence": "Brush your teeth in the _____ and at night.", "options": ["morning", "afternoon"], "correct": "morning" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تعد طبيب الأسنان:",
        "sentence": "I promise to brush my teeth every day!"
      },
      "encouragement": { "type": "text", "content_ar": "ابتسامتك مشرقة! نظف أسنانك يومياً." }
    }
  },
  {
    "lesson_id": "kids_story_047",
    "title_ar": "إبراهيم يقرأ خريطة الكنز",
    "title_en": "Ibrahim Reads a Treasure Map",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 47,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Ibrahim", "Friend"],
    "location": "Backyard",
    "vocabulary": [
      { "word": "map", "meaning_ar": "خريطة" },
      { "word": "treasure", "meaning_ar": "كنز" },
      { "word": "dig", "meaning_ar": "يحفر" },
      { "word": "find", "meaning_ar": "يجد" },
      { "word": "box", "meaning_ar": "صندوق" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Ibrahim", "english": "I found an old map! It shows a treasure.", "arabic": "وجدت خريطة قديمة! إنها تظهر كنزاً." },
          { "speaker": "Friend", "english": "Let's follow the map and dig here.", "arabic": "دعينا نتبع الخريطة ونحفر هنا." },
          { "speaker": "Ibrahim", "english": "I found a box! Open it... It's full of gold coins!", "arabic": "وجدت صندوقاً! افتحه... إنه مليء بالقطع الذهبية!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "treasure", "meaning_ar": "كنز", "important": true },
          { "word": "map", "meaning_ar": "خريطة", "important": true },
          { "word": "dig", "meaning_ar": "يحفر", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "Pirates look for _____.", "options": ["treasure", "books"], "correct": "treasure" },
          { "sentence": "We need a _____ to find the location.", "options": ["map", "phone"], "correct": "map" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تصرخ فرحاً:",
        "sentence": "I found the treasure! It's amazing!"
      },
      "encouragement": { "type": "text", "content_ar": "صياد كنوز! المغامرات تملأ حياتك." }
    }
  },
  {
    "lesson_id": "kids_story_048",
    "title_ar": "ملاك تعلم الوقت بالساعة",
    "title_en": "Malak Learns the Time",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 48,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Malak", "Teacher"],
    "location": "Classroom",
    "vocabulary": [
      { "word": "clock", "meaning_ar": "ساعة حائط" },
      { "word": "hour", "meaning_ar": "ساعة (زمن)" },
      { "word": "minute", "meaning_ar": "دقيقة" },
      { "word": "o'clock", "meaning_ar": "تمام الساعة" },
      { "word": "half past", "meaning_ar": "الساعة والنصف" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Malak", "english": "What time is it, please?", "arabic": "كم الساعة من فضلك؟" },
          { "speaker": "Teacher", "english": "It's three o'clock. The big hand is on 12.", "arabic": "الساعة الثالثة تماماً. العقرب الكبير على 12." },
          { "speaker": "Malak", "english": "And when the big hand is on 6?", "arabic": "وعندما يكون العقرب الكبير على 6؟" },
          { "speaker": "Teacher", "english": "That's half past three. Well done!", "arabic": "هذه الثالثة والنصف. أحسنت!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "clock", "meaning_ar": "ساعة حائط", "important": true },
          { "word": "o'clock", "meaning_ar": "تمام الساعة", "important": true },
          { "word": "half past", "meaning_ar": "والنصف", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "It's 5 _____. The time is exactly five.", "options": ["o'clock", "half"], "correct": "o'clock" },
          { "sentence": "It's _____ past two.", "options": ["half", "full"], "correct": "half" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تسأل عن الوقت:",
        "sentence": "Excuse me, what time is it?"
      },
      "encouragement": { "type": "text", "content_ar": "أنت تعرف الوقت الآن! لا تتأخر." }
    }
  },
  {
    "lesson_id": "kids_story_049",
    "title_ar": "عزام ينقذ القطة",
    "title_en": "Azzam Rescues the Cat",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 49,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Azzam", "Neighbor"],
    "location": "Street",
    "vocabulary": [
      { "word": "cat", "meaning_ar": "قطة" },
      { "word": "stuck", "meaning_ar": "عالق" },
      { "word": "ladder", "meaning_ar": "سلم" },
      { "word": "safe", "meaning_ar": "آمن" },
      { "word": "brave", "meaning_ar": "شجاع" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Azzam", "english": "Look, a cat is stuck in the tree!", "arabic": "انظر، قطة عالقة في الشجرة!" },
          { "speaker": "Neighbor", "english": "Let's get a ladder. Be careful.", "arabic": "دعنا نحضر سلماً. كن حذراً." },
          { "speaker": "Azzam", "english": "Come here, little cat. You are safe now.", "arabic": "تعالي هنا أيتها القطة الصغيرة. أنت آمنة الآن." },
          { "speaker": "Neighbor", "english": "Well done! You are very brave.", "arabic": "أحسنت! أنت شجاع جداً." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "stuck", "meaning_ar": "عالق", "important": true },
          { "word": "ladder", "meaning_ar": "سلم", "important": true },
          { "word": "brave", "meaning_ar": "شجاع", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "The cat was _____ in the tree.", "options": ["stuck", "sleeping"], "correct": "stuck" },
          { "sentence": "He used a _____ to climb up.", "options": ["ladder", "rope"], "correct": "ladder" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تنقذ القطة:",
        "sentence": "Don't worry, little cat. I'll save you!"
      },
      "encouragement": { "type": "text", "content_ar": "بطل إنقاذ الحيوانات! شجاع ومحبوب." }
    }
  },
  {
    "lesson_id": "kids_story_050",
    "title_ar": "ديما تصمم فستاناً",
    "title_en": "Deema Designs a Dress",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 50,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Deema", "Mother"],
    "location": "Home",
    "vocabulary": [
      { "word": "fabric", "meaning_ar": "قماش" },
      { "word": "needle", "meaning_ar": "إبرة" },
      { "word": "sew", "meaning_ar": "يخيط" },
      { "word": "design", "meaning_ar": "يصمم" },
      { "word": "pretty", "meaning_ar": "جميل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Deema", "english": "Mom, I want to design a dress for my doll.", "arabic": "أمي، أريد تصميم فستان لدميتي." },
          { "speaker": "Mother", "english": "Choose a pretty fabric and I'll teach you to sew.", "arabic": "اختاري قماشاً جميلاً وسأعلمك الخياطة." },
          { "speaker": "Deema", "english": "Be careful with the needle. I made it!", "arabic": "كوني حذرة مع الإبرة. لقد صنعته!" },
          { "speaker": "Mother", "english": "It looks beautiful! You are a real designer.", "arabic": "يبدو جميلاً! أنت مصممة حقيقية." }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "fabric", "meaning_ar": "قماش", "important": true },
          { "word": "sew", "meaning_ar": "يخيط", "important": true },
          { "word": "design", "meaning_ar": "يصمم", "important": true }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "She bought beautiful _____ for the dress.", "options": ["fabric", "paper"], "correct": "fabric" },
          { "sentence": "Use the needle to _____.", "options": ["sew", "cut"], "correct": "sew" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تعرضين تصميمك:",
        "sentence": "Look at the dress I designed! Do you like it?"
      },
      "encouragement": { "type": "text", "content_ar": "مصممة أزياء صغيرة! أبدعي." }
    }
  },
  {
    "lesson_id": "kids_story_051",
    "title_ar": "حمزة يتعلم ركوب الخيل",
    "title_en": "Hamza Learns Horse Riding",
    "category": "kids_stories",
    "series": "قصص تعليمية",
    "episode": 51,
    "age_range": "8-12",
    "level": "A1",
    "duration_minutes": 15,
    "characters": ["Hamza", "Instructor"],
    "location": "Stable",
    "vocabulary": [
      { "word": "horse", "meaning_ar": "حصان" },
      { "word": "saddle", "meaning_ar": "سرج" },
      { "word": "rein", "meaning_ar": "لجام" },
      { "word": "trot", "meaning_ar": "هرولة" },
      { "word": "stable", "meaning_ar": "إسطبل" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار واضغط زر الاستماع.",
        "lines": [
          { "speaker": "Hamza", "english": "This horse is huge! How do I ride it?", "arabic": "هذا الحصان ضخم! كيف أركبه؟" },
          { "speaker": "Instructor", "english": "Put your foot in the saddle and hold the rein.", "arabic": "ضع قدمك في السرج وأمسك اللجام." },
          { "speaker": "Hamza", "english": "I'm on! Can we trot slowly?", "arabic": "أنا فوقه! هل يمكننا الهرولة ببطء؟" },
          { "speaker": "Instructor", "english": "Yes, pull the rein gently. Great balance!", "arabic": "نعم، اسحب اللجام بلطف. توازن رائع!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "الكلمات التي عليها نجمة مهمة اليوم!",
        "words": [
          { "word": "horse", "meaning_ar": "حصان", "important": true },
          { "word": "saddle", "meaning_ar": "سرج", "important": true },
          { "word": "rein", "meaning_ar": "لجام", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ:",
        "questions": [
          { "sentence": "You need a _____ to ride a horse.", "options": ["saddle", "chair"], "correct": "saddle" },
          { "sentence": "The _____ runs very fast.", "options": ["horse", "sheep"], "correct": "horse" }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "سجل صوتك وأنت تشجع الحصان:",
        "sentence": "Good horse! Let's trot together!"
      },
      "encouragement": { "type": "text", "content_ar": "فارس صغير! ركوب الخيل مغامرة." }
    }
  }
];
