/**
 * «ركّب الجملة» — picture sentence cards for the classrooms (فصل المعلمين + فصل عبود).
 * Each class has its OWN 4 graded sets of 5 sentences (3 → 4 → 5 → 6–7 words) matching that teacher's specialty
 * in src/data/saraBoardPersonas.ts and docs/tutor-curricula-levels.md; Abboud's class follows its 15 lesson topics
 * (src/lib/abboud/curriculum.ts). Static, beginner-friendly; independent of every track, progress, XP and certificates.
 * Pictures are emoji in circles (no photos of people). Sentences carry no punctuation so they split cleanly into chips.
 */
import type { PersonaId } from '../saraBoardPersonas';

export interface PictureSentence { id: string; emoji: string; en: string; ar: string }
export interface PictureSentenceSet { id: string; titleAr: string; titleEn: string; words: string; rows: PictureSentence[] }
export type ClassroomId = PersonaId | 'abboud';
export interface ClassroomSentences { themeAr: string; basisAr: string; sets: PictureSentenceSet[] }

export const CLASSROOM_SENTENCES: Record<ClassroomId, ClassroomSentences> = {
  sara: {
    themeAr: "الحياة اليومية والمحادثة", basisAr: "معلمتك الأساسية (general): يومي، أكلي، بيتي",
    sets: [
      { id: 'sara-1', titleAr: "جمل قصيرة عن يومي", titleEn: "Short sentences about my day", words: "٣ كلمات", rows: [
        { id: 'sara-1-1', emoji: "🍚", en: "I eat rice", ar: "أنا آكل رز" },
        { id: 'sara-1-2', emoji: "💧", en: "I drink water", ar: "أنا أشرب ماء" },
        { id: 'sara-1-3', emoji: "😴", en: "I am sleepy", ar: "أنا نعسان" },
        { id: 'sara-1-4', emoji: "🐱", en: "I love cats", ar: "أنا أحب القطط" },
        { id: 'sara-1-5', emoji: "📖", en: "She reads books", ar: "هي تقرأ كتب" },
      ] },
      { id: 'sara-2', titleAr: "في البيت والمدرسة", titleEn: "At home and school", words: "٤ كلمات", rows: [
        { id: 'sara-2-1', emoji: "⚽", en: "The boy plays football", ar: "الولد يلعب كرة قدم" },
        { id: 'sara-2-2', emoji: "🏫", en: "I go to school", ar: "أنا أروح المدرسة" },
        { id: 'sara-2-3', emoji: "🍎", en: "She eats an apple", ar: "هي تاكل تفاحة" },
        { id: 'sara-2-4', emoji: "🐶", en: "The dog is happy", ar: "الكلب مبسوط" },
        { id: 'sara-2-5', emoji: "🌧️", en: "It is raining today", ar: "الجو ممطر اليوم" },
      ] },
      { id: 'sara-3', titleAr: "وش يصير الحين؟", titleEn: "What is happening now?", words: "٥ كلمات", rows: [
        { id: 'sara-3-1', emoji: "⚽", en: "The boy is playing football", ar: "الولد يلعب كرة قدم الحين" },
        { id: 'sara-3-2', emoji: "🍳", en: "My mom is cooking dinner", ar: "أمي تطبخ العشاء" },
        { id: 'sara-3-3', emoji: "🎮", en: "I play with my brother", ar: "ألعب مع أخوي" },
        { id: 'sara-3-4', emoji: "🐦", en: "The bird is singing now", ar: "العصفور يغني الحين" },
        { id: 'sara-3-5', emoji: "🎉", en: "We have a party today", ar: "عندنا حفلة اليوم" },
      ] },
      { id: 'sara-4', titleAr: "أوصف يومي", titleEn: "Describing my day", words: "٦–٧ كلمات", rows: [
        { id: 'sara-4-1', emoji: "🚌", en: "We go to school by bus", ar: "نروح المدرسة بالباص" },
        { id: 'sara-4-2', emoji: "🪥", en: "I brush my teeth every night", ar: "أفرّش أسناني كل ليلة" },
        { id: 'sara-4-3', emoji: "📚", en: "I do my homework after school", ar: "أسوي واجباتي بعد المدرسة" },
        { id: 'sara-4-4', emoji: "🛒", en: "We buy fruit from the market", ar: "نشتري فواكه من السوق" },
        { id: 'sara-4-5', emoji: "🏖️", en: "We go to the beach on Friday", ar: "نروح البحر يوم الجمعة" },
      ] },
    ],
  },
  grammar: {
    themeAr: "الصح بدل أخطاء العرب الشائعة", basisAr: "نورة: القواعد وأخطاء العرب الشائعة (is/am/are، s المضارع، a/the، الأزمنة، borrow/lend)",
    sets: [
      { id: 'grammar-1', titleAr: "لا تنسَ is وam وare", titleEn: "Do not forget the verb to be", words: "٣ كلمات", rows: [
        { id: 'grammar-1-1', emoji: "📏", en: "He is tall", ar: "هو طويل" },
        { id: 'grammar-1-2', emoji: "☕", en: "She likes tea", ar: "هي تحب الشاي" },
        { id: 'grammar-1-3', emoji: "😊", en: "I am happy", ar: "أنا مبسوط" },
        { id: 'grammar-1-4', emoji: "🤝", en: "They are friends", ar: "هم أصحاب" },
        { id: 'grammar-1-5', emoji: "🔥", en: "It is hot", ar: "الجو حار" },
      ] },
      { id: 'grammar-2', titleAr: "a وthe والجمع", titleEn: "Articles and plurals", words: "٤ كلمات", rows: [
        { id: 'grammar-2-1', emoji: "🎒", en: "He goes to school", ar: "هو يروح المدرسة" },
        { id: 'grammar-2-2', emoji: "🐈", en: "I have two cats", ar: "عندي قطتين" },
        { id: 'grammar-2-3', emoji: "👩‍⚕️", en: "She is a doctor", ar: "هي دكتورة" },
        { id: 'grammar-2-4', emoji: "🏠", en: "We are at home", ar: "احنا في البيت" },
        { id: 'grammar-2-5', emoji: "☀️", en: "The sun is hot", ar: "الشمس حارة" },
      ] },
      { id: 'grammar-3', titleAr: "النفي وحروف الجر", titleEn: "Negatives and prepositions", words: "٥ كلمات", rows: [
        { id: 'grammar-3-1', emoji: "🥩", en: "She does not eat meat", ar: "هي ما تاكل لحم" },
        { id: 'grammar-3-2', emoji: "📻", en: "I listen to the radio", ar: "أسمع الراديو" },
        { id: 'grammar-3-3', emoji: "👨‍💼", en: "My father works in Riyadh", ar: "أبوي يشتغل في الرياض" },
        { id: 'grammar-3-4', emoji: "📚", en: "There are three books here", ar: "فيه ثلاث كتب هنا" },
        { id: 'grammar-3-5', emoji: "🎨", en: "I am interested in art", ar: "أنا مهتم بالفن" },
      ] },
      { id: 'grammar-4', titleAr: "الأزمنة والكلمة الصح", titleEn: "Tenses and the right word", words: "٦–٧ كلمات", rows: [
        { id: 'grammar-4-1', emoji: "📅", en: "I have been here since Monday", ar: "أنا هنا من يوم الاثنين" },
        { id: 'grammar-4-2', emoji: "✏️", en: "Please lend me your pen today", ar: "سلّفني قلمك اليوم لو سمحت" },
        { id: 'grammar-4-3', emoji: "🎬", en: "I watched a movie last night", ar: "شفت فيلم أمس بالليل" },
        { id: 'grammar-4-4', emoji: "📞", en: "When I finish I will call you", ar: "لما أخلص بتصل عليك" },
        { id: 'grammar-4-5', emoji: "🎾", en: "She is good at playing tennis", ar: "هي شاطرة في التنس" },
      ] },
    ],
  },
  business: {
    themeAr: "إنجليزية العمل والمكتب", basisAr: "محمد: إنجليزية الأعمال (التعريف بالنفس، الإيميل، الاجتماعات، المقابلات، العروض والتفاوض)",
    sets: [
      { id: 'business-1', titleAr: "في المكتب", titleEn: "At the office", words: "٣ كلمات", rows: [
        { id: 'business-1-1', emoji: "🏢", en: "I work here", ar: "أنا أشتغل هنا" },
        { id: 'business-1-2', emoji: "📧", en: "Send the email", ar: "أرسل الإيميل" },
        { id: 'business-1-3', emoji: "⏱️", en: "We start now", ar: "نبدأ الحين" },
        { id: 'business-1-4', emoji: "🙏", en: "Thank you all", ar: "شكراً للجميع" },
        { id: 'business-1-5', emoji: "🪑", en: "Please sit down", ar: "تفضل اجلس" },
      ] },
      { id: 'business-2', titleAr: "أعرّف بنفسي في الشغل", titleEn: "Introducing myself at work", words: "٤ كلمات", rows: [
        { id: 'business-2-1', emoji: "🪪", en: "My name is Khalid", ar: "اسمي خالد" },
        { id: 'business-2-2', emoji: "💼", en: "I work in sales", ar: "أشتغل في المبيعات" },
        { id: 'business-2-3', emoji: "📅", en: "The meeting starts today", ar: "الاجتماع يبدأ اليوم" },
        { id: 'business-2-4', emoji: "📄", en: "Please check the report", ar: "لو سمحت راجع التقرير" },
        { id: 'business-2-5', emoji: "🤝", en: "I agree with you", ar: "أنا أتفق معك" },
      ] },
      { id: 'business-3', titleAr: "إيميلات واجتماعات", titleEn: "Emails and meetings", words: "٥ كلمات", rows: [
        { id: 'business-3-1', emoji: "✉️", en: "Thank you for your email", ar: "شكراً على إيميلك" },
        { id: 'business-3-2', emoji: "🗓️", en: "Let us meet on Sunday", ar: "خلنا نجتمع يوم الأحد" },
        { id: 'business-3-3', emoji: "🧑‍💼", en: "I have a job interview", ar: "عندي مقابلة عمل" },
        { id: 'business-3-4', emoji: "📈", en: "Sales went up this month", ar: "المبيعات زادت هالشهر" },
        { id: 'business-3-5', emoji: "👥", en: "I am a team player", ar: "أحب الشغل مع الفريق" },
      ] },
      { id: 'business-4', titleAr: "مقابلة وعرض وتفاوض", titleEn: "Interviews, presentations and deals", words: "٦–٧ كلمات", rows: [
        { id: 'business-4-1', emoji: "📬", en: "I look forward to your reply", ar: "أنتظر ردك" },
        { id: 'business-4-2', emoji: "📎", en: "Please send me the file today", ar: "لو سمحت أرسل لي الملف اليوم" },
        { id: 'business-4-3', emoji: "🏆", en: "I led a team of five people", ar: "قدت فريق من خمسة أشخاص" },
        { id: 'business-4-4', emoji: "📊", en: "Let me show you our plan", ar: "خلني أوريك خطتنا" },
        { id: 'business-4-5', emoji: "💰", en: "We can offer a better price", ar: "نقدر نعطيك سعر أفضل" },
      ] },
    ],
  },
  exams: {
    themeAr: "جمل اختبار IELTS", basisAr: "علي: استراتيجيات IELTS (القراءة والاستماع، Task 1 وTask 2، المحادثة Part 2 وPart 3)",
    sets: [
      { id: 'exams-1', titleAr: "نصائح الاختبار", titleEn: "Test tips", words: "٣ كلمات", rows: [
        { id: 'exams-1-1', emoji: "❓", en: "Read the question", ar: "اقرأ السؤال" },
        { id: 'exams-1-2', emoji: "👀", en: "Skim the text", ar: "تصفّح النص بسرعة" },
        { id: 'exams-1-3', emoji: "🎧", en: "Listen for numbers", ar: "ركّز على الأرقام" },
        { id: 'exams-1-4', emoji: "📝", en: "Plan your essay", ar: "خطط لمقالك" },
        { id: 'exams-1-5', emoji: "🔤", en: "Check your spelling", ar: "راجع الإملاء" },
      ] },
      { id: 'exams-2', titleAr: "أجزاء الاختبار والرسوم", titleEn: "Test parts and graphs", words: "٤ كلمات", rows: [
        { id: 'exams-2-1', emoji: "4️⃣", en: "IELTS has four parts", ar: "آيلتس له أربعة أقسام" },
        { id: 'exams-2-2', emoji: "📈", en: "Sales rose in May", ar: "المبيعات ارتفعت في مايو" },
        { id: 'exams-2-3', emoji: "📉", en: "The number fell sharply", ar: "الرقم نزل بقوة" },
        { id: 'exams-2-4', emoji: "🏙️", en: "I live in Jeddah", ar: "أنا ساكن في جدة" },
        { id: 'exams-2-5', emoji: "🖍️", en: "Underline the key words", ar: "حط خط تحت الكلمات المهمة" },
      ] },
      { id: 'exams-3', titleAr: "وصف ومقال", titleEn: "Describing and essays", words: "٥ كلمات", rows: [
        { id: 'exams-3-1', emoji: "📊", en: "The graph shows three countries", ar: "الرسم يوضح ثلاث دول" },
        { id: 'exams-3-2', emoji: "👴", en: "I will describe my grandfather", ar: "بوصف لكم جدي" },
        { id: 'exams-3-3', emoji: "💻", en: "In conclusion technology is useful", ar: "الخلاصة إن التقنية مفيدة" },
        { id: 'exams-3-4', emoji: "🚗", en: "Many cities have heavy traffic", ar: "مدن كثيرة فيها زحمة" },
        { id: 'exams-3-5', emoji: "🚫", en: "The answer is not given", ar: "الإجابة غير موجودة في النص" },
      ] },
      { id: 'exams-4', titleAr: "جمل المحادثة والكتابة", titleEn: "Speaking and writing phrases", words: "٦–٧ كلمات", rows: [
        { id: 'exams-4-1', emoji: "🔝", en: "Prices reached a peak in June", ar: "الأسعار وصلت القمة في يونيو" },
        { id: 'exams-4-2', emoji: "🏎️", en: "On the other hand cars are fast", ar: "من جهة ثانية السيارات سريعة" },
        { id: 'exams-4-3', emoji: "✈️", en: "I want to talk about my trip", ar: "أبي أتكلم عن رحلتي" },
        { id: 'exams-4-4', emoji: "🤔", en: "That is a really interesting question", ar: "هذا سؤال حلو مرة" },
        { id: 'exams-4-5', emoji: "🧳", en: "Overall the number of tourists increased", ar: "بشكل عام عدد السياح زاد" },
      ] },
    ],
  },
  lama: {
    themeAr: "الحروف والأصوات والقراءة", basisAr: "لمى: الحروف وأصواتها، قراءة الكلمات القصيرة، كلمات البصر، قصص قصيرة",
    sets: [
      { id: 'lama-1', titleAr: "كلمات بأصوات قصيرة", titleEn: "Short sound words", words: "٣ كلمات", rows: [
        { id: 'lama-1-1', emoji: "🐱", en: "The cat sat", ar: "القطة جلست" },
        { id: 'lama-1-2', emoji: "🐟", en: "I see fish", ar: "أشوف سمك" },
        { id: 'lama-1-3', emoji: "🐸", en: "Tom can hop", ar: "توم يقدر ينط" },
        { id: 'lama-1-4', emoji: "👟", en: "She has shoes", ar: "هي عندها جزمة" },
        { id: 'lama-1-5', emoji: "🐶", en: "The dog dug", ar: "الكلب حفر" },
      ] },
      { id: 'lama-2', titleAr: "اقرأ كلمات قصيرة", titleEn: "Reading short words", words: "٤ كلمات", rows: [
        { id: 'lama-2-1', emoji: "🐈", en: "The cat is fat", ar: "القطة سمينة" },
        { id: 'lama-2-2', emoji: "🖊️", en: "The pen is red", ar: "القلم أحمر" },
        { id: 'lama-2-3', emoji: "🐠", en: "A fish can swim", ar: "السمكة تقدر تسبح" },
        { id: 'lama-2-4', emoji: "🚌", en: "The bus is big", ar: "الباص كبير" },
        { id: 'lama-2-5', emoji: "🧶", en: "Sit on the rug", ar: "اجلس على السجادة" },
      ] },
      { id: 'lama-3', titleAr: "كلمات البصر في جمل", titleEn: "Sight words in sentences", words: "٥ كلمات", rows: [
        { id: 'lama-3-1', emoji: "🚢", en: "I can see the ship", ar: "أقدر أشوف السفينة" },
        { id: 'lama-3-2', emoji: "🎒", en: "This is my red bag", ar: "هذي شنطتي الحمراء" },
        { id: 'lama-3-3', emoji: "🛝", en: "We like to play here", ar: "نحب نلعب هنا" },
        { id: 'lama-3-4', emoji: "🌕", en: "Look at the big moon", ar: "شوف القمر الكبير" },
        { id: 'lama-3-5', emoji: "🦆", en: "Come and see the duck", ar: "تعال شوف البطة" },
      ] },
      { id: 'lama-4', titleAr: "قصص قصيرة", titleEn: "Tiny stories", words: "٦–٧ كلمات", rows: [
        { id: 'lama-4-1', emoji: "🪵", en: "The frog sat on a log", ar: "الضفدع جلس على جذع شجرة" },
        { id: 'lama-4-2', emoji: "🦊", en: "The fox ran into the box", ar: "الثعلب ركض داخل الصندوق" },
        { id: 'lama-4-3', emoji: "🎣", en: "Sam and his dad went fishing", ar: "سام وأبوه راحوا يصيدون سمك" },
        { id: 'lama-4-4', emoji: "🐑", en: "The sheep sleeps under the tree", ar: "الخروف ينام تحت الشجرة" },
        { id: 'lama-4-5', emoji: "🎵", en: "A little bird sang a song", ar: "عصفور صغير غنّى أغنية" },
      ] },
    ],
  },
  reem: {
    themeAr: "كلمات كل يوم", basisAr: "ريم: كلماتي الأولى (ألوان، فواكه، عائلة)، بيتي ومدينتي وأكلي، أفعال وصفات، كلمات الحياة والعمل",
    sets: [
      { id: 'reem-1', titleAr: "ألوان وفواكه وعائلة", titleEn: "Colours, fruit and family", words: "٣ كلمات", rows: [
        { id: 'reem-1-1', emoji: "🍌", en: "Bananas are yellow", ar: "الموز أصفر" },
        { id: 'reem-1-2', emoji: "❤️", en: "I love Mom", ar: "أحب أمي" },
        { id: 'reem-1-3', emoji: "🌱", en: "Grass is green", ar: "العشب أخضر" },
        { id: 'reem-1-4', emoji: "🍓", en: "Strawberries are red", ar: "الفراولة حمراء" },
        { id: 'reem-1-5', emoji: "👵", en: "This is Grandma", ar: "هذي جدتي" },
      ] },
      { id: 'reem-2', titleAr: "بيتي ومدينتي وأكلي", titleEn: "My home, city and food", words: "٤ كلمات", rows: [
        { id: 'reem-2-1', emoji: "🍽️", en: "The kitchen is clean", ar: "المطبخ نظيف" },
        { id: 'reem-2-2', emoji: "🏠", en: "My house is big", ar: "بيتي كبير" },
        { id: 'reem-2-3', emoji: "🛍️", en: "The mall is near", ar: "المول قريب" },
        { id: 'reem-2-4', emoji: "🍞", en: "I want some bread", ar: "أبي خبز" },
        { id: 'reem-2-5', emoji: "🌳", en: "The park has trees", ar: "الحديقة فيها أشجار" },
      ] },
      { id: 'reem-3', titleAr: "أفعال وصفات", titleEn: "Verbs and adjectives", words: "٥ كلمات", rows: [
        { id: 'reem-3-1', emoji: "👶", en: "The baby is very small", ar: "البيبي صغير مرة" },
        { id: 'reem-3-2', emoji: "🎒", en: "My bag is too heavy", ar: "شنطتي ثقيلة مرة" },
        { id: 'reem-3-3', emoji: "🍲", en: "The soup is very hot", ar: "الشوربة حارة مرة" },
        { id: 'reem-3-4', emoji: "🚶", en: "The old man walks slowly", ar: "الرجل الكبير يمشي ببطء" },
        { id: 'reem-3-5', emoji: "🚪", en: "I open the door quickly", ar: "أفتح الباب بسرعة" },
      ] },
      { id: 'reem-4', titleAr: "كلمات الحياة والعمل", titleEn: "Life and work words", words: "٦–٧ كلمات", rows: [
        { id: 'reem-4-1', emoji: "🏥", en: "The nurse works at the hospital", ar: "الممرضة تشتغل في المستشفى" },
        { id: 'reem-4-2', emoji: "🥛", en: "We buy milk at the supermarket", ar: "نشتري حليب من السوبرماركت" },
        { id: 'reem-4-3', emoji: "🧑‍🏫", en: "The teacher writes on the board", ar: "المعلم يكتب على السبورة" },
        { id: 'reem-4-4', emoji: "🚗", en: "My uncle drives a white car", ar: "خالي يسوق سيارة بيضاء" },
        { id: 'reem-4-5', emoji: "✈️", en: "The pilot flies a big plane", ar: "الطيار يطير طيارة كبيرة" },
      ] },
    ],
  },
  haya: {
    themeAr: "الجمل الأساسية", basisAr: "هيا: جملي الأولى (I like / I have / There is)، المضارع البسيط، الماضي والمستقبل، جمل للحياة اليومية",
    sets: [
      { id: 'haya-1', titleAr: "أحب وعندي", titleEn: "I like and I have", words: "٣ كلمات", rows: [
        { id: 'haya-1-1', emoji: "🍰", en: "I like cake", ar: "أحب الكيك" },
        { id: 'haya-1-2', emoji: "🧸", en: "I have toys", ar: "عندي ألعاب" },
        { id: 'haya-1-3', emoji: "🐕", en: "I like dogs", ar: "أحب الكلاب" },
        { id: 'haya-1-4', emoji: "✏️", en: "I have pencils", ar: "عندي أقلام رصاص" },
        { id: 'haya-1-5', emoji: "🏊", en: "We like swimming", ar: "نحب السباحة" },
      ] },
      { id: 'haya-2', titleAr: "فيه وعنده", titleEn: "There is and has", words: "٤ كلمات", rows: [
        { id: 'haya-2-1', emoji: "🐈‍⬛", en: "There is a cat", ar: "فيه قطة" },
        { id: 'haya-2-2', emoji: "🚙", en: "There is a car", ar: "فيه سيارة" },
        { id: 'haya-2-3', emoji: "👧", en: "I have a sister", ar: "عندي أخت" },
        { id: 'haya-2-4', emoji: "🌷", en: "She likes the park", ar: "هي تحب الحديقة" },
        { id: 'haya-2-5', emoji: "🚲", en: "He has a bike", ar: "عنده سيكل" },
      ] },
      { id: 'haya-3', titleAr: "المضارع البسيط", titleEn: "Present simple", words: "٥ كلمات", rows: [
        { id: 'haya-3-1', emoji: "⏰", en: "He wakes up at six", ar: "يصحى الساعة ست" },
        { id: 'haya-3-2', emoji: "🐟", en: "She does not like fish", ar: "هي ما تحب السمك" },
        { id: 'haya-3-3', emoji: "🌲", en: "There are two big trees", ar: "فيه شجرتين كبار" },
        { id: 'haya-3-4', emoji: "☕", en: "My dad drinks coffee daily", ar: "أبوي يشرب قهوة كل يوم" },
        { id: 'haya-3-5', emoji: "🎲", en: "We play games after school", ar: "نلعب ألعاب بعد المدرسة" },
      ] },
      { id: 'haya-4', titleAr: "الماضي والمستقبل", titleEn: "Past and future", words: "٦–٧ كلمات", rows: [
        { id: 'haya-4-1', emoji: "👵", en: "I visited my grandma last week", ar: "زرت جدتي الأسبوع اللي فات" },
        { id: 'haya-4-2', emoji: "🏔️", en: "We will travel to Abha tomorrow", ar: "بنسافر أبها بكرة" },
        { id: 'haya-4-3', emoji: "👭", en: "She played with her friends yesterday", ar: "لعبت مع صديقاتها أمس" },
        { id: 'haya-4-4', emoji: "🧹", en: "I am going to clean my room", ar: "بنظّف غرفتي" },
        { id: 'haya-4-5', emoji: "🌴", en: "He ate dates and drank milk", ar: "أكل تمر وشرب حليب" },
      ] },
    ],
  },
  jana: {
    themeAr: "تمارين ومراجعة القواعد", basisAr: "جنى: تمارين البداية (am/is/are، a/an، at/to/for)، الحاضر، الماضي والمستقبل، مراجعة نحو A2",
    sets: [
      { id: 'jana-1', titleAr: "am وis وare", titleEn: "am, is and are", words: "٣ كلمات", rows: [
        { id: 'jana-1-1', emoji: "✅", en: "I am ready", ar: "أنا جاهز" },
        { id: 'jana-1-2', emoji: "💖", en: "You are kind", ar: "أنت طيب" },
        { id: 'jana-1-3', emoji: "📍", en: "She is here", ar: "هي هنا" },
        { id: 'jana-1-4', emoji: "⌛", en: "We are late", ar: "احنا متأخرين" },
        { id: 'jana-1-5', emoji: "😢", en: "He is sad", ar: "هو زعلان" },
      ] },
      { id: 'jana-2', titleAr: "a وan وat وfor", titleEn: "a, an, at and for", words: "٤ كلمات", rows: [
        { id: 'jana-2-1', emoji: "🥚", en: "It is an egg", ar: "هذي بيضة" },
        { id: 'jana-2-2', emoji: "🐘", en: "I see an elephant", ar: "أشوف فيل" },
        { id: 'jana-2-3', emoji: "🏫", en: "She is at school", ar: "هي في المدرسة" },
        { id: 'jana-2-4', emoji: "🎁", en: "This is for you", ar: "هذا لك" },
        { id: 'jana-2-5', emoji: "🍊", en: "He has an orange", ar: "عنده برتقالة" },
      ] },
      { id: 'jana-3', titleAr: "تمارين الحاضر", titleEn: "Present practice", words: "٥ كلمات", rows: [
        { id: 'jana-3-1', emoji: "💇", en: "She brushes her hair daily", ar: "تمشط شعرها كل يوم" },
        { id: 'jana-3-2', emoji: "🤸", en: "They are playing outside now", ar: "يلعبون برا الحين" },
        { id: 'jana-3-3', emoji: "😺", en: "My cat sleeps a lot", ar: "قطتي تنام كثير" },
        { id: 'jana-3-4', emoji: "🏖️", en: "We are not at school", ar: "احنا مو في المدرسة" },
        { id: 'jana-3-5', emoji: "📺", en: "He watches TV at night", ar: "يتفرج تلفزيون بالليل" },
      ] },
      { id: 'jana-4', titleAr: "مراجعة الماضي والمستقبل", titleEn: "Past and future review", words: "٦–٧ كلمات", rows: [
        { id: 'jana-4-1', emoji: "🦁", en: "I went to the zoo yesterday", ar: "رحت حديقة الحيوان أمس" },
        { id: 'jana-4-2', emoji: "🎂", en: "She will bake a cake tomorrow", ar: "بتخبز كيكة بكرة" },
        { id: 'jana-4-3', emoji: "🛋️", en: "We did not go out yesterday", ar: "ما طلعنا أمس" },
        { id: 'jana-4-4', emoji: "⛈️", en: "There was a big storm last night", ar: "كان فيه عاصفة قوية أمس بالليل" },
        { id: 'jana-4-5', emoji: "🍏", en: "I bought an apple for my friend", ar: "اشتريت تفاحة لصديقي" },
      ] },
    ],
  },
  abboud: {
    themeAr: "مواضيع دروس فصل عبود", basisAr: "فصل عبود: دروسه الـ15 (التحية، الألوان، الأعداد، الحيوانات، العائلة، الأكل، الجسم، الملابس، الطقس، الأيام، المدرسة، المشاعر، الأفعال اليومية)",
    sets: [
      { id: 'abboud-1', titleAr: "التحية والألوان والأعداد", titleEn: "Greetings, colours and numbers", words: "٣ كلمات", rows: [
        { id: 'abboud-1-1', emoji: "🌅", en: "Good morning Reem", ar: "صباح الخير يا ريم" },
        { id: 'abboud-1-2', emoji: "👦", en: "I am Badr", ar: "أنا بدر" },
        { id: 'abboud-1-3', emoji: "🖊️", en: "Pens are blue", ar: "الأقلام زرقاء" },
        { id: 'abboud-1-4', emoji: "🔟", en: "I count ten", ar: "أعد لين عشرة" },
        { id: 'abboud-1-5', emoji: "🐱", en: "Cats say meow", ar: "القطط تقول مياو" },
      ] },
      { id: 'abboud-2', titleAr: "العائلة والأكل والجسم", titleEn: "Family, food and body", words: "٤ كلمات", rows: [
        { id: 'abboud-2-1', emoji: "👨", en: "This is my father", ar: "هذا أبوي" },
        { id: 'abboud-2-2', emoji: "🧃", en: "I drink orange juice", ar: "أشرب عصير برتقال" },
        { id: 'abboud-2-3', emoji: "🖐️", en: "I have two hands", ar: "عندي يدين" },
        { id: 'abboud-2-4', emoji: "🧥", en: "I wear a jacket", ar: "ألبس جاكيت" },
        { id: 'abboud-2-5', emoji: "🦁", en: "The lion is strong", ar: "الأسد قوي" },
      ] },
      { id: 'abboud-3', titleAr: "الطقس والأيام والمدرسة", titleEn: "Weather, days and school", words: "٥ كلمات", rows: [
        { id: 'abboud-3-1', emoji: "☀️", en: "It is sunny and hot", ar: "الجو مشمس وحار" },
        { id: 'abboud-3-2', emoji: "📅", en: "We have Arabic on Monday", ar: "عندنا عربي يوم الاثنين" },
        { id: 'abboud-3-3', emoji: "🏫", en: "My teacher is very nice", ar: "معلمي لطيف مرة" },
        { id: 'abboud-3-4', emoji: "😄", en: "I feel happy and excited", ar: "أحس إني مبسوط ومتحمس" },
        { id: 'abboud-3-5', emoji: "🎀", en: "Reem has a pink bag", ar: "ريم عندها شنطة وردية" },
      ] },
      { id: 'abboud-4', titleAr: "المشاعر والأفعال اليومية", titleEn: "Feelings and daily actions", words: "٦–٧ كلمات", rows: [
        { id: 'abboud-4-1', emoji: "⏰", en: "I wake up at seven every day", ar: "أصحى الساعة سبع كل يوم" },
        { id: 'abboud-4-2', emoji: "🌧️", en: "Badr is sad because it rains", ar: "بدر زعلان لأن الجو ممطر" },
        { id: 'abboud-4-3', emoji: "🧼", en: "I wash my hands before lunch", ar: "أغسل يديني قبل الغدا" },
        { id: 'abboud-4-4', emoji: "🥅", en: "We play football on Friday afternoon", ar: "نلعب كورة يوم الجمعة العصر" },
        { id: 'abboud-4-5', emoji: "👨‍🏫", en: "I teach Badr and Reem English", ar: "أعلّم بدر وريم إنجليزي" },
      ] },
    ],
  },
};

/** The sets for one class (unknown ids fall back to Sara's everyday sets). */
export const sentencesFor = (id: string): ClassroomSentences => CLASSROOM_SENTENCES[id as ClassroomId] || CLASSROOM_SENTENCES.sara;
/** Kept for callers that want the default (Sara's) sets. */
export const PICTURE_SENTENCE_SETS: PictureSentenceSet[] = CLASSROOM_SENTENCES.sara.sets;
