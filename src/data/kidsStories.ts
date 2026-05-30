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
    "series": "مغامرات نور في لندن",
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
      { "word": "How much is...?", "meaning_ar": "كم سعر ...؟" }
    ],
    "sections": {
      "story_dialogue": {
        "type": "bilingual_dialogue",
        "instructions_ar": "اقرأ الحوار بصوت عالٍ. حاول تقمص شخصية نور!",
        "lines": [
          { "speaker": "Noor", "english": "Excuse me, where is the train station?", "arabic": "المعذرة، أين محطة القطار؟" },
          { "speaker": "Officer", "english": "It’s in Terminal 3. Go straight, then turn left.", "arabic": "إنها في الصالة رقم 3. اذهب مباشرة ثم انعطف يساراً." },
          { "speaker": "Noor", "english": "Thank you! And where is the platform?", "arabic": "شكراً لك! وأين الرصيف؟" },
          { "speaker": "Officer", "english": "Platform 5. You need a single ticket. It’s £10.", "arabic": "الرصيف 5. تحتاجين تذكرة ذهاب فقط. سعرها 10 جنيهات." },
          { "speaker": "Noor", "english": "How much is a single ticket?", "arabic": "كم سعر تذكرة الذهاب؟" },
          { "speaker": "Officer", "english": "£10. The machine is over there.", "arabic": "10 جنيهات. الآلة هناك." },
          { "speaker": "Noor", "english": "Thank you very much!", "arabic": "شكراً جزيلاً لك!" }
        ]
      },
      "mini_dictionary": {
        "type": "vocabulary_table",
        "instructions_ar": "احفظ هذه الكلمات. الكلمات التي عليها نجمة هي الأهم اليوم!",
        "words": [
          { "word": "terminal", "meaning_ar": "صالة المطار", "important": false },
          { "word": "platform", "meaning_ar": "رصيف القطار", "important": true },
          { "word": "single ticket", "meaning_ar": "تذكرة ذهاب فقط", "important": true },
          { "word": "straight", "meaning_ar": "مباشرة", "important": false },
          { "word": "turn left", "meaning_ar": "انعطف يساراً", "important": false }
        ]
      },
      "practice": {
        "type": "fill_in_the_blank",
        "instructions_ar": "أكمل الفراغ بالكلمة الصحيحة مما بين القوسين:",
        "questions": [
          {
            "sentence": "The train is at _____ 5.",
            "options": ["terminal", "platform"],
            "correct": "platform"
          },
          {
            "sentence": "Noor needs a _____ ticket.",
            "options": ["single", "return"],
            "correct": "single"
          },
          {
            "sentence": "The station is in _____ 3.",
            "options": ["Terminal", "Platform"],
            "correct": "Terminal"
          }
        ]
      },
      "acting_challenge": {
        "type": "speaking",
        "instructions_ar": "تخيل أنك نور! سجل صوتك وأنت تقول هذه الجملة من الحوار. حاول أن تبدو شجاعاً ومبتسماً:",
        "sentence": "Excuse me, where is the train station?"
      },
      "encouragement": {
        "type": "text",
        "content_ar": "أنت بطل! لقد أنهيت الحلقة الأولى. الآن تستطيع أن تسأل عن المكان باللغة الإنجليزية. أراك في الحلقة القادمة حيث ستطلب نور الطعام في المطعم!"
      }
    }
  }
];
