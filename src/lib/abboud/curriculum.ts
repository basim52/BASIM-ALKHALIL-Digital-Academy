/** One reference item written on the board: the English, its Arabic meaning, and a picture emoji. */
export type BoardWord = { en: string; ar: string; emoji: string };
export type BoardExample = { en: string; ar: string };
export interface Lesson {
  id: number; titleAr: string; titleEn: string; emoji: string;
  /** English items the AI checks against (derived from `words`). */
  chalkTargetWords: string[]; chalkRuleEn: string;
  /** Lesson picker grouping: the original basics (1–5) and the beginner topics (6–15). */
  group: 'basics' | 'topics' | 'custom';
  /** Reference written on Sara's board when the lesson starts (like Sara's own lessons): words, rule and examples. */
  words: BoardWord[]; ruleAr: string; examples: BoardExample[];
}
/** Lesson 5 is the review of lessons 1–4: it adds Abboud's two review questions. */
export const REVIEW_LESSON_ID = 5;
/** Fixed lessons are 1..LAST_LESSON_ID; completing all of them earns the «معلّم صغير» certificate. */
export const LAST_LESSON_ID = 15;
/** «درس من اختياري»: a topic Abboud picks; follows the ordinary lesson path and never counts for the certificate. */
export const CUSTOM_LESSON_ID = 16;
type W = [en: string, ar: string, emoji: string];
type E = [en: string, ar: string];
const lesson = (id: number, group: Lesson['group'], emoji: string, titleAr: string, titleEn: string, words: W[], chalkRuleEn: string, ruleAr: string, examples: E[]): Lesson => ({
  id, group, emoji, titleAr, titleEn, chalkRuleEn, ruleAr,
  words: words.map(([en, ar, emoji]) => ({ en, ar, emoji })), chalkTargetWords: words.map(([en]) => en),
  examples: examples.map(([en, ar]) => ({ en, ar }))
});
export const SESSIONS_CONFIG: Lesson[] = [
  lesson(1, 'basics', '👋', 'التحية والتعريف', 'Greetings and names',
    [['Hello', 'مرحباً', '👋'], ['My name is', 'اسمي', '🙋'], ['What is your name?', 'ما اسمك؟', '❓']],
    'Hello greets; My name is introduces; What is your name asks for a name.',
    'Hello للتحية، وMy name is لتعرّف بنفسك، وWhat is your name? لتسأل عن الاسم.',
    [['Hello! My name is Abboud.', 'مرحباً! اسمي عبود.'], ['Hello, Reem! What is your name?', 'مرحباً يا ريم! ما اسمك؟']]),
  lesson(2, 'basics', '🎨', 'الألوان والأشياء', 'Colors and objects',
    [['red', 'أحمر', '🔴'], ['blue', 'أزرق', '🔵'], ['yellow', 'أصفر', '🟡'], ['green', 'أخضر', '🟢'], ['book', 'كتاب', '📕'], ['pencil', 'قلم رصاص', '✏️'], ['bag', 'حقيبة', '🎒']],
    'Color precedes object: a red book, a blue bag.',
    'اللون يأتي قبل الشيء: a red book تعني «كتاب أحمر».',
    [['a red book', 'كتاب أحمر'], ['a blue bag', 'حقيبة زرقاء'], ['a yellow pencil', 'قلم رصاص أصفر']]),
  lesson(3, 'basics', '🔢', 'الأعداد 1–10', 'Numbers one to ten and quantities',
    [['one', 'واحد', '1️⃣'], ['two', 'اثنان', '2️⃣'], ['three', 'ثلاثة', '3️⃣'], ['four', 'أربعة', '4️⃣'], ['five', 'خمسة', '5️⃣'], ['six', 'ستة', '6️⃣'], ['seven', 'سبعة', '7️⃣'], ['eight', 'ثمانية', '8️⃣'], ['nine', 'تسعة', '9️⃣'], ['ten', 'عشرة', '🔟']],
    'Count one through ten. One book, two books; add plural s for more than one.',
    'نعدّ من one إلى ten، ونضيف s للجمع إذا كان أكثر من واحد: one book ثم two books.',
    [['one book', 'كتاب واحد'], ['two books', 'كتابان'], ['five pencils', 'خمسة أقلام رصاص']]),
  lesson(4, 'basics', '📚', 'الجمل البسيطة', 'Simple sentences',
    [['This is a book', 'هذا كتاب', '📘'], ['I like apples', 'أحب التفاح', '🍎']],
    'This is a book identifies a nearby object. I like apples expresses a preference. Subject before verb.',
    'This is a … نشير بها إلى شيء قريب، وI like … نقول بها ما نحب. الفاعل يأتي قبل الفعل.',
    [['This is a pencil.', 'هذا قلم رصاص.'], ['I like bananas.', 'أحب الموز.']]),
  lesson(5, 'basics', '🌟', 'المراجعة وسؤالان', 'Review and two teacher questions',
    [['Hello', 'مرحباً', '👋'], ['a red book', 'كتاب أحمر', '📕'], ['two books', 'كتابان', '📚'], ['This is a book', 'هذا كتاب', '📘'], ['I like apples', 'أحب التفاح', '🍎']],
    'Review greetings, color before noun, numbers 1–10 and plural s, simple sentences. Abboud explains, answers a student, corrects one error, then asks two different review questions; Badr and Reem answer in turn.',
    'نراجع التحية، واللون قبل الاسم، والأعداد مع s الجمع، والجمل البسيطة؛ ثم تطرح سؤالَي مراجعة مختلفين.',
    [['Hello! This is a red book.', 'مرحباً! هذا كتاب أحمر.'], ['I have two books.', 'عندي كتابان.']]),
  lesson(6, 'topics', '🐾', 'الحيوانات', 'Animals',
    [['cat', 'قطة', '🐱'], ['dog', 'كلب', '🐶'], ['bird', 'طائر', '🐦'], ['fish', 'سمكة', '🐟'], ['lion', 'أسد', '🦁'], ['elephant', 'فيل', '🐘']],
    'Use a before a consonant sound (a cat, a dog) and an before a vowel sound (an elephant). More than one: add s (two cats, three birds); fish stays fish.',
    'نستخدم a قبل الصوت الساكن (a cat) وan قبل صوت حرف العلة (an elephant)، ونضيف s للجمع (two dogs)، أما fish فتبقى fish.',
    [['a cat and a dog', 'قطة وكلب'], ['an elephant', 'فيل'], ['two birds', 'طائران']]),
  lesson(7, 'topics', '👨‍👩‍👧‍👦', 'العائلة', 'Family',
    [['mother', 'أم', '👩'], ['father', 'أب', '👨'], ['brother', 'أخ', '👦'], ['sister', 'أخت', '👧'], ['grandmother', 'جدة', '👵'], ['grandfather', 'جد', '👴']],
    'Introduce family with This is my + family word: This is my mother. Use I have for how many: I have two brothers.',
    'نعرّف بأفراد العائلة بـ This is my …، ونقول العدد بـ I have …',
    [['This is my mother.', 'هذه أمي.'], ['I have two brothers.', 'عندي أخَوان.'], ['This is my grandfather.', 'هذا جدي.']]),
  lesson(8, 'topics', '🍎', 'الأكل والشرب', 'Food and drinks',
    [['apple', 'تفاحة', '🍎'], ['bread', 'خبز', '🍞'], ['rice', 'أرز', '🍚'], ['milk', 'حليب', '🥛'], ['water', 'ماء', '💧'], ['juice', 'عصير', '🧃']],
    'Eat goes with food (I eat bread, I eat rice); drink goes with drinks (I drink milk, I drink water). I like juice.',
    'eat نستخدمها مع الأكل، وdrink مع المشروبات.',
    [['I eat bread.', 'آكل الخبز.'], ['I drink milk.', 'أشرب الحليب.'], ['I like juice.', 'أحب العصير.']]),
  lesson(9, 'topics', '🖐️', 'أجزاء الجسم', 'Parts of the body',
    [['head', 'رأس', '🙂'], ['eye', 'عين', '👁️'], ['ear', 'أذن', '👂'], ['nose', 'أنف', '👃'], ['mouth', 'فم', '👄'], ['hand', 'يد', '✋'], ['foot', 'قدم', '🦶']],
    'I have one head, one nose and two eyes. Plural adds s (two hands, two ears), but foot becomes feet.',
    'نضيف s للجمع (two hands, two ears)، لكن foot تصبح feet.',
    [['I have two eyes.', 'عندي عينان.'], ['I have one nose.', 'عندي أنف واحد.'], ['two feet', 'قدمان']]),
  lesson(10, 'topics', '👕', 'الملابس', 'Clothes',
    [['shirt', 'قميص', '👕'], ['dress', 'فستان', '👗'], ['hat', 'قبعة', '👒'], ['jacket', 'سترة', '🧥'], ['shoes', 'حذاء', '👟'], ['socks', 'جوارب', '🧦']],
    'Say I am wearing + clothes: I am wearing a white shirt. Color comes before the clothes word. Shoes and socks come in pairs: my shoes are black.',
    'نقول I am wearing … واللون قبل اسم الملابس. shoes وsocks تأتي زوجاً فنقول: my shoes are black.',
    [['I am wearing a white shirt.', 'ألبس قميصاً أبيض.'], ['My shoes are black.', 'حذائي أسود.']]),
  lesson(11, 'topics', '☀️', 'الطقس', 'Weather',
    [['sunny', 'مشمس', '☀️'], ['rainy', 'ممطر', '🌧️'], ['cloudy', 'غائم', '☁️'], ['windy', 'عاصف', '💨'], ['hot', 'حار', '🔥'], ['cold', 'بارد', '❄️']],
    'Ask What is the weather like? Answer with It is + weather word: It is sunny. It is cold.',
    'نسأل What is the weather like? ونجيب بـ It is + كلمة الطقس.',
    [['It is sunny.', 'الجو مشمس.'], ['It is cold today.', 'الجو بارد اليوم.']]),
  lesson(12, 'topics', '📅', 'أيام الأسبوع', 'Days of the week',
    [['Sunday', 'الأحد', '📅'], ['Monday', 'الاثنين', '📅'], ['Tuesday', 'الثلاثاء', '📅'], ['Wednesday', 'الأربعاء', '📅'], ['Thursday', 'الخميس', '📅'], ['Friday', 'الجمعة', '📅'], ['Saturday', 'السبت', '📅']],
    'Days of the week always start with a capital letter. Today is Monday. Use on before a day: On Friday I visit my grandmother.',
    'أيام الأسبوع تبدأ دائماً بحرف كبير، ونستخدم on قبل اليوم.',
    [['Today is Monday.', 'اليوم هو الاثنين.'], ['On Friday I visit my grandmother.', 'يوم الجمعة أزور جدتي.']]),
  lesson(13, 'topics', '🏫', 'المدرسة', 'School',
    [['teacher', 'معلّم', '🧑‍🏫'], ['student', 'طالب', '🧑‍🎓'], ['classroom', 'فصل', '🏫'], ['desk', 'مكتب', '🪑'], ['board', 'سبورة', '📋'], ['pen', 'قلم حبر', '🖊️']],
    'This is my classroom. The teacher writes on the board. I sit at my desk. Use the for a thing we both know.',
    'نستخدم the لشيء يعرفه المتكلم والسامع: The teacher writes on the board.',
    [['This is my classroom.', 'هذا فصلي.'], ['The teacher writes on the board.', 'المعلّم يكتب على السبورة.'], ['I sit at my desk.', 'أجلس على مكتبي.']]),
  lesson(14, 'topics', '😊', 'المشاعر', 'Feelings',
    [['happy', 'سعيد', '😊'], ['sad', 'حزين', '😢'], ['angry', 'غاضب', '😠'], ['tired', 'متعب', '🥱'], ['hungry', 'جائع', '😋'], ['scared', 'خائف', '😨']],
    'Ask How are you? Answer I am happy. Use am with I and is with he or she: She is tired.',
    'نسأل How are you? ونجيب I am …، ونستخدم am مع I وis مع he وshe.',
    [['I am happy.', 'أنا سعيد.'], ['She is tired.', 'هي متعبة.']]),
  lesson(15, 'topics', '⏰', 'الأفعال اليومية', 'Daily actions',
    [['wake up', 'أستيقظ', '⏰'], ['brush my teeth', 'أفرّش أسناني', '🪥'], ['eat breakfast', 'آكل الفطور', '🍳'], ['go to school', 'أذهب إلى المدرسة', '🏫'], ['play', 'ألعب', '⚽'], ['sleep', 'أنام', '😴']],
    'Daily routines use the present simple: I wake up at seven. I go to school. With he or she add s: He plays. She sleeps.',
    'الروتين اليومي بالمضارع البسيط: I wake up at seven، ومع he وshe نضيف s: He plays.',
    [['I wake up at seven.', 'أستيقظ الساعة السابعة.'], ['I go to school.', 'أذهب إلى المدرسة.'], ['He plays football.', 'هو يلعب كرة القدم.']])
];
/** The custom lesson keeps the topic as data: it is named here only for the client's titles, never put into AI instructions. */
export function customLesson(topic: string): Lesson {
  // No reviewed content exists for a chosen topic: the board shows only the title and what Abboud really says.
  return { id: CUSTOM_LESSON_ID, group: 'custom', titleAr: topic, titleEn: 'A child-friendly topic chosen by Abboud (see customTopic in the payload)', emoji: '✨', chalkTargetWords: [],
    chalkRuleEn: 'Abboud chose the topic. Judge only the accuracy and clarity of the simple English he teaches about it (a few beginner words or one short sentence).', words: [], ruleAr: '', examples: [] };
}
export function lessonFor(id: number, customTopic = ''): Lesson | undefined {
  return id === CUSTOM_LESSON_ID ? (customTopic ? customLesson(customTopic) : undefined) : SESSIONS_CONFIG.find(s => s.id === id);
}
