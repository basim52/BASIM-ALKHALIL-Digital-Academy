export interface Lesson {
  id: number; titleAr: string; titleEn: string; emoji: string;
  chalkTargetWords: string[]; chalkRuleEn: string;
  /** Lesson picker grouping: the original basics (1–5) and the beginner topics (6–15). */
  group: 'basics' | 'topics' | 'custom';
}
/** Lesson 5 is the review of lessons 1–4: it adds Abboud's two review questions. */
export const REVIEW_LESSON_ID = 5;
/** Fixed lessons are 1..LAST_LESSON_ID; completing all of them earns the «معلّم صغير» certificate. */
export const LAST_LESSON_ID = 15;
/** «درس من اختياري»: a topic Abboud picks; follows the ordinary lesson path and never counts for the certificate. */
export const CUSTOM_LESSON_ID = 16;
export const SESSIONS_CONFIG: Lesson[] = [
  { id: 1, group: 'basics', titleAr: 'التحية والتعريف', titleEn: 'Greetings and names', emoji: '👋', chalkTargetWords: ['Hello', 'My name is', 'What is your name?'], chalkRuleEn: 'Hello greets; My name is introduces; What is your name asks for a name.' },
  { id: 2, group: 'basics', titleAr: 'الألوان والأشياء', titleEn: 'Colors and objects', emoji: '🎨', chalkTargetWords: ['red', 'blue', 'yellow', 'green', 'book', 'pencil', 'bag'], chalkRuleEn: 'Color precedes object: a red book, a blue bag.' },
  { id: 3, group: 'basics', titleAr: 'الأعداد 1–10', titleEn: 'Numbers one to ten and quantities', emoji: '🔢', chalkTargetWords: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'], chalkRuleEn: 'Count one through ten. One book, two books; add plural s for more than one.' },
  { id: 4, group: 'basics', titleAr: 'الجمل البسيطة', titleEn: 'Simple sentences', emoji: '📚', chalkTargetWords: ['This is a book', 'I like apples'], chalkRuleEn: 'This is a book identifies a nearby object. I like apples expresses a preference. Subject before verb.' },
  { id: 5, group: 'basics', titleAr: 'المراجعة وسؤالان', titleEn: 'Review and two teacher questions', emoji: '🌟', chalkTargetWords: ['Hello', 'a red book', 'two books', 'This is a book', 'I like apples'], chalkRuleEn: 'Review greetings, color before noun, numbers 1–10 and plural s, simple sentences. Abboud explains, answers a student, corrects one error, then asks two different review questions; Badr and Reem answer in turn.' },
  { id: 6, group: 'topics', titleAr: 'الحيوانات', titleEn: 'Animals', emoji: '🐾', chalkTargetWords: ['cat', 'dog', 'bird', 'fish', 'lion', 'elephant'], chalkRuleEn: 'Use a before a consonant sound (a cat, a dog) and an before a vowel sound (an elephant). More than one: add s (two cats, three birds); fish stays fish.' },
  { id: 7, group: 'topics', titleAr: 'العائلة', titleEn: 'Family', emoji: '👨‍👩‍👧‍👦', chalkTargetWords: ['mother', 'father', 'brother', 'sister', 'grandmother', 'grandfather'], chalkRuleEn: 'Introduce family with This is my + family word: This is my mother. Use I have for how many: I have two brothers.' },
  { id: 8, group: 'topics', titleAr: 'الأكل والشرب', titleEn: 'Food and drinks', emoji: '🍎', chalkTargetWords: ['apple', 'bread', 'rice', 'milk', 'water', 'juice'], chalkRuleEn: 'Eat goes with food (I eat bread, I eat rice); drink goes with drinks (I drink milk, I drink water). I like juice.' },
  { id: 9, group: 'topics', titleAr: 'أجزاء الجسم', titleEn: 'Parts of the body', emoji: '🖐️', chalkTargetWords: ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot'], chalkRuleEn: 'I have one head, one nose and two eyes. Plural adds s (two hands, two ears), but foot becomes feet.' },
  { id: 10, group: 'topics', titleAr: 'الملابس', titleEn: 'Clothes', emoji: '👕', chalkTargetWords: ['shirt', 'dress', 'hat', 'jacket', 'shoes', 'socks'], chalkRuleEn: 'Say I am wearing + clothes: I am wearing a white shirt. Color comes before the clothes word. Shoes and socks come in pairs: my shoes are black.' },
  { id: 11, group: 'topics', titleAr: 'الطقس', titleEn: 'Weather', emoji: '☀️', chalkTargetWords: ['sunny', 'rainy', 'cloudy', 'windy', 'hot', 'cold'], chalkRuleEn: 'Ask What is the weather like? Answer with It is + weather word: It is sunny. It is cold.' },
  { id: 12, group: 'topics', titleAr: 'أيام الأسبوع', titleEn: 'Days of the week', emoji: '📅', chalkTargetWords: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], chalkRuleEn: 'Days of the week always start with a capital letter. Today is Monday. Use on before a day: On Friday I visit my grandmother.' },
  { id: 13, group: 'topics', titleAr: 'المدرسة', titleEn: 'School', emoji: '🏫', chalkTargetWords: ['teacher', 'student', 'classroom', 'desk', 'board', 'pen'], chalkRuleEn: 'This is my classroom. The teacher writes on the board. I sit at my desk. Use the for a thing we both know.' },
  { id: 14, group: 'topics', titleAr: 'المشاعر', titleEn: 'Feelings', emoji: '😊', chalkTargetWords: ['happy', 'sad', 'angry', 'tired', 'hungry', 'scared'], chalkRuleEn: 'Ask How are you? Answer I am happy. Use am with I and is with he or she: She is tired.' },
  { id: 15, group: 'topics', titleAr: 'الأفعال اليومية', titleEn: 'Daily actions', emoji: '⏰', chalkTargetWords: ['wake up', 'brush my teeth', 'eat breakfast', 'go to school', 'play', 'sleep'], chalkRuleEn: 'Daily routines use the present simple: I wake up at seven. I go to school. With he or she add s: He plays. She sleeps.' }
];
/** The custom lesson keeps the topic as data: it is named here only for the client's titles, never put into AI instructions. */
export function customLesson(topic: string): Lesson {
  return { id: CUSTOM_LESSON_ID, group: 'custom', titleAr: topic, titleEn: 'A child-friendly topic chosen by Abboud (see customTopic in the payload)', emoji: '✨', chalkTargetWords: [],
    chalkRuleEn: 'Abboud chose the topic. Judge only the accuracy and clarity of the simple English he teaches about it (a few beginner words or one short sentence).' };
}
export function lessonFor(id: number, customTopic = ''): Lesson | undefined {
  return id === CUSTOM_LESSON_ID ? (customTopic ? customLesson(customTopic) : undefined) : SESSIONS_CONFIG.find(s => s.id === id);
}
