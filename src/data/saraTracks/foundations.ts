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
    t(2, 'أصوات الحروف الإنجليزية', 'The Alphabet & Letter Sounds'),
    t(3, 'الأرقام من 1 إلى 100', 'Numbers 1–100'),
    t(4, 'الضمائر الشخصية', 'Subject Pronouns (I, you, he, she...)'),
    t(5, 'فعل الكينونة: am / is / are', 'The Verb To Be'),
    t(6, 'النفي والسؤال مع to be', 'To Be: Negatives & Questions'),
    t(7, 'أداة النكرة a و an', 'Articles: a / an'),
    t(8, 'الجمع في الإنجليزي', 'Plural Nouns'),
    t(9, 'هذا وذاك: this / that / these / those', 'This, That, These, Those'),
    t(10, 'الألوان والعائلة', 'Colors & Family'),
    t(11, 'الملكية: have / has', 'Have & Has'),
    t(12, 'صفات الملكية: my / your / his / her', 'Possessive Adjectives'),
    t(13, 'المضارع البسيط: الإثبات', 'Present Simple: Affirmative'),
    t(14, 'المضارع البسيط: النفي', 'Present Simple: Negative'),
    t(15, 'المضارع البسيط: السؤال', 'Present Simple: Questions'),
    t(16, 'الأيام والساعة', 'Days & Telling the Time'),
    t(17, 'يوجد: there is / there are', 'There Is / There Are'),
    t(18, 'حروف المكان: in / on / under', 'Prepositions of Place'),
    t(19, 'القدرة: can و can\'t', 'Can / Can\'t'),
    t(20, 'الأوامر والطلبات', 'Imperatives'),
    t(21, 'المضارع المستمر', 'Present Continuous'),
    t(22, 'الماضي من to be: was / were', 'Past of To Be'),
    t(23, 'الماضي البسيط: الأفعال المنتظمة', 'Past Simple: Regular Verbs'),
    t(24, 'الماضي البسيط: الأفعال الشاذة', 'Past Simple: Irregular Verbs'),
    t(25, 'أدوات السؤال: what / where / when / who', 'Question Words'),
    t(26, 'المستقبل مع going to', 'Future with Going To'),
    t(27, 'أحب وما أحب: like / don\'t like', 'Likes & Dislikes'),
    t(28, 'الصفات والمقارنة', 'Adjectives & Comparatives'),
    t(29, 'طلب الأكل والسؤال عن الاتجاهات', 'Ordering Food & Asking for Directions'),
    t(30, 'مراجعة شاملة', 'Final Review')
  ]
};
