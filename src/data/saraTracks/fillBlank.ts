import { SARA_FILL_BLANK_MORE } from './fillBlankMore';
import type { PersonaId } from '../saraBoardPersonas';
/**
 * Sara "Complete the sentence" (fill the blank) — new exercise type on the tutor board.
 * Each card: English sentence with one blank + Arabic meaning + 3 option chips.
 * Every spoken line is written here literally, so it is real curriculum text (trigram allow-list → voice works without a token).
 */
export interface SaraBlankCard {
  /** Full correct sentence (no final full stop; a question keeps its ?). */
  en: string;
  /** The missing word (must appear in `en`). */
  answer: string;
  ar: string;
  options: string[];
  /** Spoken first: the sentence with the blank + the question. */
  sayAsk: string;
  /** Spoken after a correct pick (laugh cue: "Excellent"). */
  sayRight: string;
  /** Spoken after a wrong pick / no pick. */
  sayReveal: string;
  /** Optional picture for the «من الصفر» teachers' cards. */
  emoji?: string;
}
export interface SaraBlankLesson { id: string; order: number; titleAr: string; titleEn: string; icon: string; introAr: string; introEn: string; cards: SaraBlankCard[] }

/** A complete-the-sentence track for one tutor. Lessons unlock in order; every 10 lessons form a level. */
export interface FillBlankTrack { id: string; store: 'sara' | 'tutor'; personaId: PersonaId; voice: string; titleAr: string; titleEn: string; lessons: SaraBlankLesson[]; /** Optional own level titles (one per 10 lessons); default FILL_BLANK_LEVELS. */ levels?: { ar: string; en: string }[] }
export const fillBlankLevel = (order: number) => Math.min(3, Math.ceil(order / 10));
export const FILL_BLANK_LEVELS = [
  { ar: 'المستوى الأول: مبتدئ', en: 'Level 1: Beginner' },
  { ar: 'المستوى الثاني: متوسط', en: 'Level 2: Intermediate' },
  { ar: 'المستوى الثالث: متقدم', en: 'Level 3: Advanced' },
];

export const FILL_BLANK_TRACK_ID = 'fill_blank';

const FILL_BLANK_BASE: SaraBlankLesson[] = [
  {
    id: 'fill-blank-01', order: 1, icon: '🧩',
    titleAr: 'حروف الجر مع me', titleEn: 'Prepositions with me',
    introAr: 'كل فعل له حرف جر يمشي معه. اسمع الجملة من سارة، واختر الكلمة الناقصة قبل ما تقولها!',
    introEn: 'Each verb has its own preposition. Listen to Sara and pick the missing word before she says it!',
    cards: [
      { en: 'Wait for me', answer: 'for', ar: 'انتظرني', options: ['for', 'at', 'to'],
        sayAsk: 'Wait ... me. Which word is missing?', sayRight: 'Excellent! Wait for me.', sayReveal: 'The answer is for. Wait for me.' },
      { en: 'Look at me', answer: 'at', ar: 'انظر إليّ', options: ['for', 'on', 'at'],
        sayAsk: 'Look ... me. Which word is missing?', sayRight: 'Excellent! Look at me.', sayReveal: 'The answer is at. Look at me.' },
      { en: 'Listen to me', answer: 'to', ar: 'استمع إليّ', options: ['at', 'to', 'for'],
        sayAsk: 'Listen ... me. Which word is missing?', sayRight: 'Excellent! Listen to me.', sayReveal: 'The answer is to. Listen to me.' },
      { en: 'Reply to me', answer: 'to', ar: 'رُدّ عليّ', options: ['to', 'on', 'at'],
        sayAsk: 'Reply ... me. Which word is missing?', sayRight: 'Excellent! Reply to me.', sayReveal: 'The answer is to. Reply to me.' },
      { en: 'Depend on me', answer: 'on', ar: 'اعتمد عليّ', options: ['to', 'at', 'on'],
        sayAsk: 'Depend ... me. Which word is missing?', sayRight: 'Excellent! Depend on me.', sayReveal: 'The answer is on. Depend on me.' },
      { en: 'Smile at me', answer: 'at', ar: 'ابتسم لي', options: ['in', 'at', 'for'],
        sayAsk: 'Smile ... me. Which word is missing?', sayRight: 'Excellent! Smile at me.', sayReveal: 'The answer is at. Smile at me.' },
      { en: 'Talk to me', answer: 'to', ar: 'كلّمني', options: ['to', 'on', 'in'],
        sayAsk: 'Talk ... me. Which word is missing?', sayRight: 'Excellent! Talk to me.', sayReveal: 'The answer is to. Talk to me.' },
      { en: 'Believe in me', answer: 'in', ar: 'ثِق بي', options: ['at', 'to', 'in'],
        sayAsk: 'Believe ... me. Which word is missing?', sayRight: 'Excellent! Believe in me.', sayReveal: 'The answer is in. Believe in me.' },
    ],
  },
  {
    id: 'fill-blank-02', order: 2, icon: '🙋',
    titleAr: 'الفعل am / is / are', titleEn: 'am / is / are',
    introAr: 'الفعل to be: نستخدم am مع I، و is مع المفرد (he/she/it)، و are مع الجمع وyou. اختر الصحيح قبل سارة!',
    introEn: 'The verb to be: am with I, is with he/she/it, are with we/you/they. Pick the right one before Sara!',
    cards: [
      { en: 'I am a student', answer: 'am', ar: 'أنا طالب', options: ["am", "is", "are"],
        sayAsk: 'I ... a student. Which word is missing?', sayRight: 'Excellent! I am a student.', sayReveal: 'The answer is am. I am a student.' },
      { en: 'She is my teacher', answer: 'is', ar: 'هي معلمتي', options: ["are", "is", "am"],
        sayAsk: 'She ... my teacher. Which word is missing?', sayRight: 'Excellent! She is my teacher.', sayReveal: 'The answer is is. She is my teacher.' },
      { en: 'They are at school', answer: 'are', ar: 'هم في المدرسة', options: ["is", "am", "are"],
        sayAsk: 'They ... at school. Which word is missing?', sayRight: 'Excellent! They are at school.', sayReveal: 'The answer is are. They are at school.' },
      { en: 'We are best friends', answer: 'are', ar: 'نحن أعز الأصدقاء', options: ["are", "is", "am"],
        sayAsk: 'We ... best friends. Which word is missing?', sayRight: 'Excellent! We are best friends.', sayReveal: 'The answer is are. We are best friends.' },
      { en: 'The weather is nice today', answer: 'is', ar: 'الجو جميل اليوم', options: ["am", "are", "is"],
        sayAsk: 'The weather ... nice today. Which word is missing?', sayRight: 'Excellent! The weather is nice today.', sayReveal: 'The answer is is. The weather is nice today.' },
      { en: 'My parents are at home', answer: 'are', ar: 'والداي في البيت', options: ["is", "are", "am"],
        sayAsk: 'My parents ... at home. Which word is missing?', sayRight: 'Excellent! My parents are at home.', sayReveal: 'The answer is are. My parents are at home.' },
      { en: 'I am hungry now', answer: 'am', ar: 'أنا جائع الآن', options: ["is", "am", "are"],
        sayAsk: 'I ... hungry now. Which word is missing?', sayRight: 'Excellent! I am hungry now.', sayReveal: 'The answer is am. I am hungry now.' },
      { en: 'This book is very interesting', answer: 'is', ar: 'هذا الكتاب ممتع جداً', options: ["is", "are", "am"],
        sayAsk: 'This book ... very interesting. Which word is missing?', sayRight: 'Excellent! This book is very interesting.', sayReveal: 'The answer is is. This book is very interesting.' },
    ],
  },
  {
    id: 'fill-blank-03', order: 3, icon: '📘',
    titleAr: 'أدوات التنكير والتعريف a / an / the', titleEn: 'Articles: a / an / the',
    introAr: 'نستخدم a قبل الصوت الساكن، و an قبل الصوت المتحرك (حتى hour)، و the للشيء المعروف أو الوحيد.',
    introEn: 'Use a before a consonant sound, an before a vowel sound (even hour), and the for something known or unique.',
    cards: [
      { en: 'I have a brother', answer: 'a', ar: 'عندي أخ', options: ["a", "an", "the"],
        sayAsk: 'I have ... brother. Which word is missing?', sayRight: 'Excellent! I have a brother.', sayReveal: 'The answer is a. I have a brother.' },
      { en: 'She eats an apple every day', answer: 'an', ar: 'تأكل تفاحة كل يوم', options: ["a", "an", "the"],
        sayAsk: 'She eats ... apple every day. Which word is missing?', sayRight: 'Excellent! She eats an apple every day.', sayReveal: 'The answer is an. She eats an apple every day.' },
      { en: 'He is an engineer', answer: 'an', ar: 'هو مهندس', options: ["an", "a", "the"],
        sayAsk: 'He is ... engineer. Which word is missing?', sayRight: 'Excellent! He is an engineer.', sayReveal: 'The answer is an. He is an engineer.' },
      { en: 'The sun is very hot today', answer: 'The', ar: 'الشمس حارة جداً اليوم', options: ["A", "An", "The"],
        sayAsk: '... sun is very hot today. Which word is missing?', sayRight: 'Excellent! The sun is very hot today.', sayReveal: 'The answer is The. The sun is very hot today.' },
      { en: 'She studies at a university', answer: 'a', ar: 'هي تدرس في جامعة', options: ["an", "a", "the"],
        sayAsk: 'She studies at ... university. Which word is missing?', sayRight: 'Excellent! She studies at a university.', sayReveal: 'The answer is a. She studies at a university.' },
      { en: 'My father has a new car', answer: 'a', ar: 'أبي عنده سيارة جديدة', options: ["a", "an", "the"],
        sayAsk: 'My father has ... new car. Which word is missing?', sayRight: 'Excellent! My father has a new car.', sayReveal: 'The answer is a. My father has a new car.' },
      { en: 'Please close the door', answer: 'the', ar: 'من فضلك أغلق الباب', options: ["an", "the", "a"],
        sayAsk: 'Please close ... door. Which word is missing?', sayRight: 'Excellent! Please close the door.', sayReveal: 'The answer is the. Please close the door.' },
      { en: 'The trip takes an hour', answer: 'an', ar: 'الرحلة تستغرق ساعة', options: ["a", "the", "an"],
        sayAsk: 'The trip takes ... hour. Which word is missing?', sayRight: 'Excellent! The trip takes an hour.', sayReveal: 'The answer is an. The trip takes an hour.' },
    ],
  },
  {
    id: 'fill-blank-04', order: 4, icon: '📍',
    titleAr: 'حروف الجر للمكان', titleEn: 'Prepositions of place',
    introAr: 'أين الشيء؟ in داخل، on على، under تحت، behind خلف، between بين، near قريب من.',
    introEn: 'Where is it? in = inside, on = on top, under, behind, between, near.',
    cards: [
      { en: 'The cat is under the table', answer: 'under', ar: 'القطة تحت الطاولة', options: ["under", "on", "at"],
        sayAsk: 'The cat is ... the table. Which word is missing?', sayRight: 'Excellent! The cat is under the table.', sayReveal: 'The answer is under. The cat is under the table.' },
      { en: 'The keys are in my bag', answer: 'in', ar: 'المفاتيح في حقيبتي', options: ["on", "in", "under"],
        sayAsk: 'The keys are ... my bag. Which word is missing?', sayRight: 'Excellent! The keys are in my bag.', sayReveal: 'The answer is in. The keys are in my bag.' },
      { en: 'Your phone is on the desk', answer: 'on', ar: 'هاتفك على المكتب', options: ["in", "at", "on"],
        sayAsk: 'Your phone is ... the desk. Which word is missing?', sayRight: 'Excellent! Your phone is on the desk.', sayReveal: 'The answer is on. Your phone is on the desk.' },
      { en: 'The car is behind the house', answer: 'behind', ar: 'السيارة خلف البيت', options: ["behind", "between", "in"],
        sayAsk: 'The car is ... the house. Which word is missing?', sayRight: 'Excellent! The car is behind the house.', sayReveal: 'The answer is behind. The car is behind the house.' },
      { en: 'The bank is between the school and the park', answer: 'between', ar: 'البنك بين المدرسة والحديقة', options: ["behind", "between", "under"],
        sayAsk: 'The bank is ... the school and the park. Which word is missing?', sayRight: 'Excellent! The bank is between the school and the park.', sayReveal: 'The answer is between. The bank is between the school and the park.' },
      { en: 'The picture is on the wall', answer: 'on', ar: 'الصورة على الجدار', options: ["on", "in", "under"],
        sayAsk: 'The picture is ... the wall. Which word is missing?', sayRight: 'Excellent! The picture is on the wall.', sayReveal: 'The answer is on. The picture is on the wall.' },
      { en: 'The children are in the garden', answer: 'in', ar: 'الأطفال في الحديقة', options: ["at", "on", "in"],
        sayAsk: 'The children are ... the garden. Which word is missing?', sayRight: 'Excellent! The children are in the garden.', sayReveal: 'The answer is in. The children are in the garden.' },
      { en: 'The pharmacy is near my house', answer: 'near', ar: 'الصيدلية قريبة من بيتي', options: ["near", "under", "on"],
        sayAsk: 'The pharmacy is ... my house. Which word is missing?', sayRight: 'Excellent! The pharmacy is near my house.', sayReveal: 'The answer is near. The pharmacy is near my house.' },
    ],
  },
  {
    id: 'fill-blank-05', order: 5, icon: '⏰',
    titleAr: 'حروف الجر للزمن at / on / in', titleEn: 'Prepositions of time: at / on / in',
    introAr: 'at مع الساعة والوقت المحدد، on مع الأيام والتواريخ، in مع الشهور والسنين والفصول وأجزاء اليوم.',
    introEn: 'at for clock times, on for days and dates, in for months, years, seasons and parts of the day.',
    cards: [
      { en: 'I wake up at six', answer: 'at', ar: 'أستيقظ الساعة السادسة', options: ["at", "on", "in"],
        sayAsk: 'I wake up ... six. Which word is missing?', sayRight: 'Excellent! I wake up at six.', sayReveal: 'The answer is at. I wake up at six.' },
      { en: 'We have English on Monday', answer: 'on', ar: 'عندنا حصة إنجليزي يوم الاثنين', options: ["in", "on", "at"],
        sayAsk: 'We have English ... Monday. Which word is missing?', sayRight: 'Excellent! We have English on Monday.', sayReveal: 'The answer is on. We have English on Monday.' },
      { en: 'My birthday is in May', answer: 'in', ar: 'عيد ميلادي في شهر مايو', options: ["on", "at", "in"],
        sayAsk: 'My birthday is ... May. Which word is missing?', sayRight: 'Excellent! My birthday is in May.', sayReveal: 'The answer is in. My birthday is in May.' },
      { en: 'The shop closes at night', answer: 'at', ar: 'المحل يقفل في الليل', options: ["in", "at", "on"],
        sayAsk: 'The shop closes ... night. Which word is missing?', sayRight: 'Excellent! The shop closes at night.', sayReveal: 'The answer is at. The shop closes at night.' },
      { en: 'I study in the morning', answer: 'in', ar: 'أذاكر في الصباح', options: ["in", "at", "on"],
        sayAsk: 'I study ... the morning. Which word is missing?', sayRight: 'Excellent! I study in the morning.', sayReveal: 'The answer is in. I study in the morning.' },
      { en: 'We travel in summer', answer: 'in', ar: 'نسافر في الصيف', options: ["on", "in", "at"],
        sayAsk: 'We travel ... summer. Which word is missing?', sayRight: 'Excellent! We travel in summer.', sayReveal: 'The answer is in. We travel in summer.' },
      { en: 'The party is on Friday evening', answer: 'on', ar: 'الحفلة مساء يوم الجمعة', options: ["on", "in", "at"],
        sayAsk: 'The party is ... Friday evening. Which word is missing?', sayRight: 'Excellent! The party is on Friday evening.', sayReveal: 'The answer is on. The party is on Friday evening.' },
      { en: 'The class starts at noon', answer: 'at', ar: 'الحصة تبدأ الظهر', options: ["in", "on", "at"],
        sayAsk: 'The class starts ... noon. Which word is missing?', sayRight: 'Excellent! The class starts at noon.', sayReveal: 'The answer is at. The class starts at noon.' },
    ],
  },
  {
    id: 'fill-blank-06', order: 6, icon: '❓',
    titleAr: 'do / does في الأسئلة', titleEn: 'do / does in questions',
    introAr: 'في سؤال المضارع البسيط: does مع he/she/it، و do مع I/you/we/they، والفعل بعدها يبقى بدون s.',
    introEn: 'In present simple questions: does with he/she/it, do with I/you/we/they, and the verb stays without s.',
    cards: [
      { en: 'Do you like coffee?', answer: 'Do', ar: 'هل تحب القهوة؟', options: ["Do", "Does", "Is"],
        sayAsk: '... you like coffee? Which word is missing?', sayRight: 'Excellent! Do you like coffee?', sayReveal: 'The answer is Do. Do you like coffee?' },
      { en: 'Does she speak English?', answer: 'Does', ar: 'هل تتكلم الإنجليزية؟', options: ["Do", "Is", "Does"],
        sayAsk: '... she speak English? Which word is missing?', sayRight: 'Excellent! Does she speak English?', sayReveal: 'The answer is Does. Does she speak English?' },
      { en: 'Do they live near you?', answer: 'Do', ar: 'هل يسكنون قريباً منك؟', options: ["Are", "Do", "Does"],
        sayAsk: '... they live near you? Which word is missing?', sayRight: 'Excellent! Do they live near you?', sayReveal: 'The answer is Do. Do they live near you?' },
      { en: 'Does your brother play football?', answer: 'Does', ar: 'هل يلعب أخوك كرة القدم؟', options: ["Does", "Do", "Is"],
        sayAsk: '... your brother play football? Which word is missing?', sayRight: 'Excellent! Does your brother play football?', sayReveal: 'The answer is Does. Does your brother play football?' },
      { en: 'Where do you work?', answer: 'do', ar: 'أين تعمل؟', options: ["does", "are", "do"],
        sayAsk: 'Where ... you work? Which word is missing?', sayRight: 'Excellent! Where do you work?', sayReveal: 'The answer is do. Where do you work?' },
      { en: 'What time does the bus leave?', answer: 'does', ar: 'متى يغادر الباص؟', options: ["do", "does", "is"],
        sayAsk: 'What time ... the bus leave? Which word is missing?', sayRight: 'Excellent! What time does the bus leave?', sayReveal: 'The answer is does. What time does the bus leave?' },
      { en: 'Does it rain a lot here?', answer: 'Does', ar: 'هل تمطر كثيراً هنا؟', options: ["Is", "Do", "Does"],
        sayAsk: '... it rain a lot here? Which word is missing?', sayRight: 'Excellent! Does it rain a lot here?', sayReveal: 'The answer is Does. Does it rain a lot here?' },
      { en: 'Do we have homework today?', answer: 'Do', ar: 'هل عندنا واجب اليوم؟', options: ["Do", "Are", "Does"],
        sayAsk: '... we have homework today? Which word is missing?', sayRight: 'Excellent! Do we have homework today?', sayReveal: 'The answer is Do. Do we have homework today?' },
    ],
  },
  {
    id: 'fill-blank-07', order: 7, icon: '🔗',
    titleAr: 'أفعال مع حروف جر', titleEn: 'Verbs with prepositions',
    introAr: 'أفعال يومية لها حرف جر ثابت: look for، think about، belong to، agree with... احفظها كقطعة واحدة.',
    introEn: 'Everyday verbs with a fixed preposition: look for, think about, belong to, agree with... learn them as one chunk.',
    cards: [
      { en: 'I am looking for my keys', answer: 'for', ar: 'أبحث عن مفاتيحي', options: ["at", "for", "after"],
        sayAsk: 'I am looking ... my keys. Which word is missing?', sayRight: 'Excellent! I am looking for my keys.', sayReveal: 'The answer is for. I am looking for my keys.' },
      { en: 'She takes care of her little brother', answer: 'of', ar: 'تعتني بأخيها الصغير', options: ["of", "for", "with"],
        sayAsk: 'She takes care ... her little brother. Which word is missing?', sayRight: 'Excellent! She takes care of her little brother.', sayReveal: 'The answer is of. She takes care of her little brother.' },
      { en: 'I often think about my future', answer: 'about', ar: 'أفكر كثيراً في مستقبلي', options: ["on", "at", "about"],
        sayAsk: 'I often think ... my future. Which word is missing?', sayRight: 'Excellent! I often think about my future.', sayReveal: 'The answer is about. I often think about my future.' },
      { en: 'This book belongs to my sister', answer: 'to', ar: 'هذا الكتاب ملك أختي', options: ["for", "to", "with"],
        sayAsk: 'This book belongs ... my sister. Which word is missing?', sayRight: 'Excellent! This book belongs to my sister.', sayReveal: 'The answer is to. This book belongs to my sister.' },
      { en: 'We agree with you', answer: 'with', ar: 'نحن نتفق معك', options: ["with", "on", "to"],
        sayAsk: 'We agree ... you. Which word is missing?', sayRight: 'Excellent! We agree with you.', sayReveal: 'The answer is with. We agree with you.' },
      { en: 'Ask for help when you need it', answer: 'for', ar: 'اطلب المساعدة عندما تحتاجها', options: ["about", "to", "for"],
        sayAsk: 'Ask ... help when you need it. Which word is missing?', sayRight: 'Excellent! Ask for help when you need it.', sayReveal: 'The answer is for. Ask for help when you need it.' },
      { en: 'Don\'t worry about the test', answer: 'about', ar: 'لا تقلق بشأن الاختبار', options: ["for", "about", "on"],
        sayAsk: 'Don\'t worry ... the test. Which word is missing?', sayRight: 'Excellent! Don\'t worry about the test.', sayReveal: 'The answer is about. Don\'t worry about the test.' },
      { en: 'Thank you for your help', answer: 'for', ar: 'شكراً على مساعدتك', options: ["for", "to", "about"],
        sayAsk: 'Thank you ... your help. Which word is missing?', sayRight: 'Excellent! Thank you for your help.', sayReveal: 'The answer is for. Thank you for your help.' },
    ],
  },
  {
    id: 'fill-blank-08', order: 8, icon: '🔄',
    titleAr: 'المضارع البسيط أم المستمر', titleEn: 'Present simple or continuous',
    introAr: 'المضارع البسيط للعادة والحقيقة (every day, usually)، والمستمر لما يحدث الآن (now, look!).',
    introEn: 'Present simple for habits and facts (every day, usually); present continuous for what is happening now.',
    cards: [
      { en: 'She is reading a book now', answer: 'reading', ar: 'هي تقرأ كتاباً الآن', options: ["reads", "reading", "read"],
        sayAsk: 'She is ... a book now. Which word is missing?', sayRight: 'Excellent! She is reading a book now.', sayReveal: 'The answer is reading. She is reading a book now.' },
      { en: 'He plays football every Friday', answer: 'plays', ar: 'يلعب كرة القدم كل جمعة', options: ["plays", "playing", "play"],
        sayAsk: 'He ... football every Friday. Which word is missing?', sayRight: 'Excellent! He plays football every Friday.', sayReveal: 'The answer is plays. He plays football every Friday.' },
      { en: 'Look, it is raining outside', answer: 'raining', ar: 'انظر، إنها تمطر في الخارج', options: ["rains", "rain", "raining"],
        sayAsk: 'Look, it is ... outside. Which word is missing?', sayRight: 'Excellent! Look, it is raining outside.', sayReveal: 'The answer is raining. Look, it is raining outside.' },
      { en: 'My mother cooks dinner every day', answer: 'cooks', ar: 'أمي تطبخ العشاء كل يوم', options: ["cooking", "cooks", "cook"],
        sayAsk: 'My mother ... dinner every day. Which word is missing?', sayRight: 'Excellent! My mother cooks dinner every day.', sayReveal: 'The answer is cooks. My mother cooks dinner every day.' },
      { en: 'We are watching a movie right now', answer: 'watching', ar: 'نشاهد فيلماً الآن', options: ["watching", "watch", "watches"],
        sayAsk: 'We are ... a movie right now. Which word is missing?', sayRight: 'Excellent! We are watching a movie right now.', sayReveal: 'The answer is watching. We are watching a movie right now.' },
      { en: 'The sun rises in the east', answer: 'rises', ar: 'الشمس تشرق من الشرق', options: ["rising", "rise", "rises"],
        sayAsk: 'The sun ... in the east. Which word is missing?', sayRight: 'Excellent! The sun rises in the east.', sayReveal: 'The answer is rises. The sun rises in the east.' },
      { en: 'Be quiet, the baby is sleeping', answer: 'sleeping', ar: 'اهدأ، الطفل نائم', options: ["sleeps", "sleeping", "sleep"],
        sayAsk: 'Be quiet, the baby is .... Which word is missing?', sayRight: 'Excellent! Be quiet, the baby is sleeping.', sayReveal: 'The answer is sleeping. Be quiet, the baby is sleeping.' },
      { en: 'I go to the gym three times a week', answer: 'go', ar: 'أذهب إلى النادي ثلاث مرات في الأسبوع', options: ["going", "goes", "go"],
        sayAsk: 'I ... to the gym three times a week. Which word is missing?', sayRight: 'Excellent! I go to the gym three times a week.', sayReveal: 'The answer is go. I go to the gym three times a week.' },
    ],
  },
  {
    id: 'fill-blank-09', order: 9, icon: '⏪',
    titleAr: 'الماضي البسيط: أفعال شاذة', titleEn: 'Past simple: irregular verbs',
    introAr: 'أفعال كثيرة لا تأخذ ed في الماضي: go → went، buy → bought، eat → ate. اختر الماضي الصحيح!',
    introEn: 'Many verbs do not take ed in the past: go → went, buy → bought, eat → ate. Pick the right past form!',
    cards: [
      { en: 'I went to Riyadh last week', answer: 'went', ar: 'ذهبت إلى الرياض الأسبوع الماضي', options: ["go", "gone", "went"],
        sayAsk: 'I ... to Riyadh last week. Which word is missing?', sayRight: 'Excellent! I went to Riyadh last week.', sayReveal: 'The answer is went. I went to Riyadh last week.' },
      { en: 'She bought a new phone yesterday', answer: 'bought', ar: 'اشترت هاتفاً جديداً أمس', options: ["bought", "brought", "buy"],
        sayAsk: 'She ... a new phone yesterday. Which word is missing?', sayRight: 'Excellent! She bought a new phone yesterday.', sayReveal: 'The answer is bought. She bought a new phone yesterday.' },
      { en: 'We ate pizza last night', answer: 'ate', ar: 'أكلنا بيتزا البارحة', options: ["eaten", "ate", "eat"],
        sayAsk: 'We ... pizza last night. Which word is missing?', sayRight: 'Excellent! We ate pizza last night.', sayReveal: 'The answer is ate. We ate pizza last night.' },
      { en: 'He wrote a letter to his friend', answer: 'wrote', ar: 'كتب رسالة لصديقه', options: ["write", "written", "wrote"],
        sayAsk: 'He ... a letter to his friend. Which word is missing?', sayRight: 'Excellent! He wrote a letter to his friend.', sayReveal: 'The answer is wrote. He wrote a letter to his friend.' },
      { en: 'I saw your brother at the mall', answer: 'saw', ar: 'رأيت أخاك في المول', options: ["saw", "seen", "see"],
        sayAsk: 'I ... your brother at the mall. Which word is missing?', sayRight: 'Excellent! I saw your brother at the mall.', sayReveal: 'The answer is saw. I saw your brother at the mall.' },
      { en: 'They came home late', answer: 'came', ar: 'رجعوا إلى البيت متأخرين', options: ["come", "came", "comes"],
        sayAsk: 'They ... home late. Which word is missing?', sayRight: 'Excellent! They came home late.', sayReveal: 'The answer is came. They came home late.' },
      { en: 'My father took me to the airport', answer: 'took', ar: 'أخذني أبي إلى المطار', options: ["taken", "take", "took"],
        sayAsk: 'My father ... me to the airport. Which word is missing?', sayRight: 'Excellent! My father took me to the airport.', sayReveal: 'The answer is took. My father took me to the airport.' },
      { en: 'I forgot my book at home', answer: 'forgot', ar: 'نسيت كتابي في البيت', options: ["forgot", "forget", "forgotten"],
        sayAsk: 'I ... my book at home. Which word is missing?', sayRight: 'Excellent! I forgot my book at home.', sayReveal: 'The answer is forgot. I forgot my book at home.' },
    ],
  },
  {
    id: 'fill-blank-10', order: 10, icon: '🚀',
    titleAr: 'أفعال مركبة يومية', titleEn: 'Everyday phrasal verbs',
    introAr: 'فعل + كلمة صغيرة = معنى جديد: get up، turn off، pick up، give up. اختر الكلمة الصغيرة الصحيحة!',
    introEn: 'Verb + small word = new meaning: get up, turn off, pick up, give up. Pick the right small word!',
    cards: [
      { en: 'I get up at six every day', answer: 'up', ar: 'أصحو الساعة السادسة كل يوم', options: ["up", "on", "off"],
        sayAsk: 'I get ... at six every day. Which word is missing?', sayRight: 'Excellent! I get up at six every day.', sayReveal: 'The answer is up. I get up at six every day.' },
      { en: 'Please turn off the light', answer: 'off', ar: 'من فضلك أطفئ النور', options: ["at", "off", "in"],
        sayAsk: 'Please turn ... the light. Which word is missing?', sayRight: 'Excellent! Please turn off the light.', sayReveal: 'The answer is off. Please turn off the light.' },
      { en: 'Can you pick me up from school?', answer: 'up', ar: 'هل يمكنك أن تأخذني من المدرسة؟', options: ["in", "at", "up"],
        sayAsk: 'Can you pick me ... from school? Which word is missing?', sayRight: 'Excellent! Can you pick me up from school?', sayReveal: 'The answer is up. Can you pick me up from school?' },
      { en: 'Put on your jacket, it is cold', answer: 'on', ar: 'البس جاكيتك، الجو بارد', options: ["on", "in", "at"],
        sayAsk: 'Put ... your jacket, it is cold. Which word is missing?', sayRight: 'Excellent! Put on your jacket, it is cold.', sayReveal: 'The answer is on. Put on your jacket, it is cold.' },
      { en: 'Never give up on your dreams', answer: 'up', ar: 'لا تتخلَّ عن أحلامك أبداً', options: ["in", "up", "off"],
        sayAsk: 'Never give ... on your dreams. Which word is missing?', sayRight: 'Excellent! Never give up on your dreams.', sayReveal: 'The answer is up. Never give up on your dreams.' },
      { en: 'Please sit down and relax', answer: 'down', ar: 'تفضل اجلس واسترخِ', options: ["off", "at", "down"],
        sayAsk: 'Please sit ... and relax. Which word is missing?', sayRight: 'Excellent! Please sit down and relax.', sayReveal: 'The answer is down. Please sit down and relax.' },
      { en: 'We ran out of milk', answer: 'out', ar: 'نفد منا الحليب', options: ["out", "off", "up"],
        sayAsk: 'We ran ... of milk. Which word is missing?', sayRight: 'Excellent! We ran out of milk.', sayReveal: 'The answer is out. We ran out of milk.' },
      { en: 'Take off your shoes, please', answer: 'off', ar: 'اخلع حذاءك من فضلك', options: ["at", "in", "off"],
        sayAsk: 'Take ... your shoes, please. Which word is missing?', sayRight: 'Excellent! Take off your shoes, please.', sayReveal: 'The answer is off. Take off your shoes, please.' },
    ],
  },
];

/** Lessons 1-10 above + 11-30 (levels 2-3). Order/ids only grow → stored progress (unlocked order) stays valid. */
export const FILL_BLANK_LESSONS: SaraBlankLesson[] = [...FILL_BLANK_BASE, ...SARA_FILL_BLANK_MORE];
