import { FOUNDATIONS_4_TO_30 } from './foundations4to30';

/** Sara track: English foundations for Arabic-speaking beginners. One lesson = one page. */
export interface SaraChoiceQuestion {
  promptAr: string;
  /** Optional English text shown with the question. */
  promptEn?: string;
  options: string[];
  correctIndex: number;
}

export interface SaraTrackLesson {
  id: string;
  order: number;
  titleAr: string;
  titleEn: string;
  /** Built lessons have content; locked placeholders only have titles. */
  content?: {
    explanationAr: string;
    /** Re-explanation from a different angle, shown when the check answer is wrong. */
    altExplanationAr: string;
    example: { en: string; ar: string }[];
    check: SaraChoiceQuestion;
    /** 3 for light lessons, 4 for heavier ones. */
    exercises: SaraChoiceQuestion[];
  };
}

export interface SaraTrack {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: SaraTrackLesson[];
}

const t = (order: number, titleAr: string, titleEn: string): SaraTrackLesson => ({
  id: `foundations-${String(order).padStart(2, '0')}`, order, titleAr, titleEn
});

export const FOUNDATIONS_TRACK: SaraTrack = {
  id: 'foundations',
  titleAr: 'أساسيات الإنجليزي للمبتدئين',
  titleEn: 'English Foundations for Beginners',
  lessons: [
    {
      ...t(1, 'التحية والتعريف بنفسك', 'Greetings & Introducing Yourself'),
      content: {
        explanationAr:
          'أول ما تقابل أحد بالإنجليزي تبدأ بالتحية: Hello أو Hi يعني «مرحبا». بعدها تعرّف بنفسك بجملة: My name is وبعدها اسمك، يعني «اسمي ...». ولو تبي تعرف اسم الشخص تسأله: What\'s your name? يعني «وش اسمك؟». وفي الأخير تقول: Nice to meet you يعني «تشرفنا».',
        altExplanationAr:
          'خلنا نسويها ثلاث خطوات بس: ١) سلّم وقل Hi. ٢) قل اسمك: My name is ثم اسمك، مثل My name is Ali. ٣) اسأل صاحبك: What\'s your name? تخيّل أول يوم في المدرسة وتبي تتعرف على اللي جنبك، هذي الثلاث جمل تكفيك.',
        example: [
          { en: "A: Hi! My name is Omar. What's your name?", ar: 'مرحبا! اسمي عمر. وش اسمك؟' },
          { en: 'B: Hello, Omar! My name is Sara. Nice to meet you.', ar: 'مرحبا عمر! اسمي سارة. تشرفنا.' }
        ],
        check: {
          promptAr: 'كيف تقول «اسمي أحمد» بالإنجليزي؟',
          options: ['My name is Ahmed.', 'I name Ahmed.', 'Name my Ahmed.'],
          correctIndex: 0
        },
        exercises: [
          { promptAr: 'اختر الرد المناسب:', promptEn: "What's your name?", options: ['My name is Ali.', "I'm fine.", 'Goodbye.'], correctIndex: 0 },
          { promptAr: 'وش معنى هذي الجملة؟', promptEn: 'Nice to meet you.', options: ['مع السلامة', 'تشرفنا', 'كيف حالك؟'], correctIndex: 1 },
          { promptAr: 'رتّب الكلمات: is / My / Sara / name', options: ['Name is my Sara.', 'My Sara is name.', 'My name is Sara.'], correctIndex: 2 }
        ]
      }
    },
    {
      ...t(2, 'أصوات الحروف الإنجليزية', 'The Alphabet & Letter Sounds'),
      content: {
        explanationAr:
          'الإنجليزي فيه 26 حرف، ولكل حرف اسم وصوت. الاسم نقوله في الأبجدية: A «اي»، B «بي»، C «سي». لكن داخل الكلمة نستخدم الصوت: b في bag تنطق «بـ»، و c في cat تنطق «كـ». الحروف الخمسة a e i o u اسمها vowels وأصواتها تتغير، مثل a في cat تنطق «آ» قصيرة. وانتبه: p غير b، الـ p تطلع معها نفخة هوا مثل pen.',
        altExplanationAr:
          'فكّر في الحرف كأنه شخص له اسم وله صوت. اسمه نناديه فيه: B «بي». وصوته اللي يطلع في الكلمات: «بـ» مثل ball. جرّب تحط يدك قدام فمك وقل pen وبعدها ben: مع p تحس بهوا، ومع b ما تحس. يعني الاسم للتهجئة، والصوت للقراءة.',
        example: [
          { en: 'c - a - t → cat', ar: 'كـ + آ + تـ = cat (قطة)' },
          { en: 'p - e - n → pen', ar: 'بـ بنفخة + إ + نـ = pen (قلم)' }
        ],
        check: {
          promptAr: 'وش الصوت اللي يطلعه حرف c في كلمة cat؟',
          options: ['«كـ»', '«سي»', '«تشـ»'],
          correctIndex: 0
        },
        exercises: [
          { promptAr: 'أي كلمة تبدأ بصوت «بـ» بدون نفخة؟', options: ['ball', 'pen', 'cat'], correctIndex: 0 },
          { promptAr: 'كم عدد حروف اللغة الإنجليزية؟', options: ['28', '26', '24'], correctIndex: 1 },
          { promptAr: 'أي حرف من هذي الحروف vowel؟', options: ['t', 'm', 'e'], correctIndex: 2 },
          { promptAr: 'وش اسم الحرف B في الأبجدية؟', options: ['«بي»', '«بـ»', '«با»'], correctIndex: 0 }
        ]
      }
    },
    {
      ...t(3, 'الأرقام من 1 إلى 100', 'Numbers 1–100'),
      content: {
        explanationAr:
          'من 1 إلى 10: one, two, three, four, five, six, seven, eight, nine, ten. و 11 و 12 لهم اسم خاص: eleven و twelve. من 13 إلى 19 نضيف teen: thirteen, fifteen. والعشرات تنتهي بـ ty: twenty, thirty, forty, fifty. وأي رقم بينهم نركّب العشرة مع الآحاد: 25 = twenty-five. و 100 = one hundred. وانتبه للفخ: thirteen (13) غير thirty (30).',
        altExplanationAr:
          'خلّها مثل تركيب الليقو: عندك قطع صغيرة من one إلى nine، وقطع كبيرة twenty, thirty, forty… تبي 47؟ خذ القطعة الكبيرة forty وركّب عليها seven: forty-seven. والأرقام من 13 إلى 19 نهايتها teen مثل fourteen و sixteen، أما العشرات فنهايتها ty مثل forty و sixty.',
        example: [
          { en: 'I am twelve years old.', ar: 'عمري ١٢ سنة.' },
          { en: 'The price is forty-five riyals.', ar: 'السعر ٤٥ ريال.' }
        ],
        check: {
          promptAr: 'كيف تكتب ٣٧ بالإنجليزي؟',
          options: ['thirteen-seven', 'thirty-seven', 'seventy-three'],
          correctIndex: 1
        },
        exercises: [
          { promptAr: 'وش الرقم؟', promptEn: 'fifteen', options: ['5', '50', '15'], correctIndex: 2 },
          { promptAr: 'اختر الكتابة الصحيحة للرقم 20:', options: ['twenty', 'twoty', 'twelve'], correctIndex: 0 },
          { promptAr: 'أي كلمة تعني ٣٠؟', options: ['thirteen', 'thirty', 'three'], correctIndex: 1 },
          { promptAr: 'كيف تقول ١٠٠؟', options: ['ten ten', 'one thousand', 'one hundred'], correctIndex: 2 }
        ]
      }
    },
    ...FOUNDATIONS_4_TO_30
  ]
};
