export interface DailyDoseExample {
  wrong: string;
  meaning_ar: string;
  right: string;
  rightMeaningAr?: string; // fallback or matches meaning_ar
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
  sections: {
    intro: {
      type: 'text';
      content_ar: string;
      content_en?: string;
    };
    explanation: {
      type: 'rule';
      content_ar: string;
      content_en?: string;
      examples: DailyDoseExample[];
    };
    practice: {
      type: 'fill_in_the_blank';
      instructions_ar: string;
      instructions_en?: string;
      questions: DailyDoseQuestion[];
    };
    challenge: {
      type: 'speaking';
      instructions_ar: string;
      instructions_en?: string;
    };
    closing: {
      type: 'text';
      content_ar: string;
      content_en?: string;
    };
  };
}

export const ADULTS_DAILY_DOSES: DailyDoseLesson[] = [
  {
    lesson_id: "adults_daily_001",
    title_ar: "أنا متحمس مش أنا مثير!",
    title_en: "I am excited vs I am exciting",
    category: "adults_daily_dose",
    level: "A2-B1",
    duration_minutes: 5,
    sections: {
      intro: {
        type: "text",
        content_ar: "تخيل أنك في مقابلة عمل وتقول: 'I am exciting!' فجأة الجميع ينظر إليك بغرابة! لماذا؟ لأنك أخبرتهم أنك شخص ممتع ومثير، بينما كنت تقصد أنك متحمس للوظيفة. دعنا نصلح هذا الخطأ الشائع."
      },
      explanation: {
        type: "rule",
        content_ar: "إذا انتهت الصفة بـ -ing فهي تصف الشيء أو الشخص الذي يسبب الشعور. إذا انتهت بـ -ed فهي تصف الشخص الذي يشعر بذلك الشعور.",
        examples: [
          {
            wrong: "I am boring.",
            meaning_ar: "أنا شخص ممل.",
            right: "I am bored.",
            rightMeaningAr: "أنا أشعر بالملل."
          },
          {
            wrong: "The movie was bored.",
            meaning_ar: "الفيلم شعر بالملل (غير منطقي).",
            right: "The movie was boring.",
            rightMeaningAr: "الفيلم كان مملاً."
          }
        ]
      },
      practice: {
        type: "fill_in_the_blank",
        instructions_ar: "اختر الكلمة الصحيحة:",
        questions: [
          {
            sentence: "I am so _____ about the trip!",
            options: ["exciting", "excited"],
            correct: "excited"
          },
          {
            sentence: "The lesson was _____. I almost slept.",
            options: ["bored", "boring"],
            correct: "boring"
          }
        ]
      },
      challenge: {
        type: "speaking",
        instructions_ar: "سجل صوتك وأنت تقول جملة صحيحة عن شيء يثير اهتمامك اليوم، استخدم 'I am excited about...'"
      },
      closing: {
        type: "text",
        content_ar: "أحسنت! تذكر دائماً: أنت تشعر بـ -ed، والشيء يكون -ing. أراك في درس الغد!"
      }
    }
  },
  {
    lesson_id: "adults_daily_002",
    title_ar: "خلال دقيقتين مش duren!",
    title_en: "Since vs For vs During",
    category: "adults_daily_dose",
    level: "A2-B1",
    duration_minutes: 5,
    sections: {
      intro: {
        type: "text",
        content_ar: "يرتكب الكثير خطأً باستعمال During عندما يريدون قول 'لمدة'. مثلاً يقولون 'During two hours' واللفظ الصحيح السليم هو 'For two hours'. لنحدد قواعد استخدامها بدقة."
      },
      explanation: {
        type: "rule",
        content_ar: "نستخدم For للتعبير عن مدة زمنية محددة بالأرقام. بينما نستخدم Since لتحديد نقطة انطلاق الحدث بالماضي. أما During فتستعمل قبل الأسماء (خلال حدث معين).",
        examples: [
          {
            wrong: "I have been here since three hours.",
            meaning_ar: "أنا هنا منذ ثلاث ساعات (غير دقيق).",
            right: "I have been here for three hours.",
            rightMeaningAr: "أنا هنا لمدة ثلاث ساعات."
          },
          {
            wrong: "I read a book for my holiday.",
            meaning_ar: "قرأت كتاباً خلال إجازتي.",
            right: "I read a book during my holiday.",
            rightMeaningAr: "قرأت كتاباً خلال إجازتي."
          }
        ]
      },
      practice: {
        type: "fill_in_the_blank",
        instructions_ar: "اختر الكلمة الزمنية الفصيحة:",
        questions: [
          {
            sentence: "She has been studying English _____ 2020.",
            options: ["for", "since", "during"],
            correct: "since"
          },
          {
            sentence: "We stayed in London _____ two weeks.",
            options: ["during", "for", "since"],
            correct: "for"
          }
        ]
      },
      challenge: {
        type: "speaking",
        instructions_ar: "سجل صوتك بعبارة تعبر عن روتينك كقولك: 'I have been working here for three years.'"
      },
      closing: {
        type: "text",
        content_ar: "رائع جداً! تذكر: For مع المقدار الممتد، Since مع لحظة الانطلاق، و During مع الأحداث والمناسبات. نلتقي غداً!"
      }
    }
  }
];
