import type { Scene, KidId } from '../components/visualCards/VisualCardArt';

/** Illustrated word cards shown before the word-by-word part of a Sara vocabulary lesson (keyed by lesson id). */
export interface VisualCard { en: string; ar: string; scene: Scene; whyAr: string }
export interface VisualCardSet { titleAr: string; cards: VisualCard[] }

const c = (en: string, ar: string, scene: Scene, whyAr: string): VisualCard => ({ en, ar, scene, whyAr });

const PREPOSITIONS: VisualCardSet = { titleAr: 'حروف الجر (أين الشيء؟)', cards: [
  c('on', 'على', { k: 'prep', p: 'on' }, 'بندق واقف فوق المكعب وملامس له، فهو on.'),
  c('in', 'في / داخل', { k: 'prep', p: 'in' }, 'بندق داخل الصندوق، فهو in.'),
  c('under', 'تحت', { k: 'prep', p: 'under' }, 'بندق تحت الطاولة، فهو under.'),
  c('next to', 'بجانب', { k: 'prep', p: 'next to' }, 'بندق جنب المكعب على نفس الأرض، فهو next to.'),
  c('in front of', 'أمام', { k: 'prep', p: 'in front of' }, 'بندق قدّام المكعب ونشوفه كامل، فهو in front of.'),
  c('behind', 'خلف', { k: 'prep', p: 'behind' }, 'المكعب يغطي بندق وهو يطل من وراه، فهو behind.'),
  c('between', 'بين', { k: 'prep', p: 'between' }, 'فيه مكعب يمينه ومكعب يساره، فهو between.'),
  c('around', 'حول', { k: 'prep', p: 'around' }, 'السهم يلف دورة كاملة حول الأسطوانة، فهو around.'),
  c('through', 'عبر / من خلال', { k: 'prep', p: 'through' }, 'بندق يدخل من جهة النفق ويطلع من الجهة الثانية، فهو through.'),
] };

const col = (en: string, ar: string, hex: string) => c(en, ar, { k: 'color', c: hex }, `لون البالونة ${ar}، وبالإنجليزي ${en}.`);
const COLOURS: VisualCardSet = { titleAr: 'الألوان', cards: [
  col('red', 'أحمر', '#EF4444'), col('blue', 'أزرق', '#3B82F6'), col('green', 'أخضر', '#22C55E'), col('yellow', 'أصفر', '#FDE047'),
  col('black', 'أسود', '#1F2937'), col('white', 'أبيض', '#FFFFFF'), col('orange', 'برتقالي', '#F97316'), col('brown', 'بني', '#92400E'),
  col('pink', 'وردي', '#F9A8D4'), col('grey', 'رمادي', '#9CA3AF'),
] };

const sh = (en: string, ar: string, s: Extract<Scene, { k: 'shape' }>['sh'], why: string) => c(en, ar, { k: 'shape', sh: s }, why);
const SHAPES: VisualCardSet = { titleAr: 'الأشكال', cards: [
  sh('circle', 'دائرة', 'circle', 'مدوّرة بدون زوايا: circle.'), sh('square', 'مربع', 'square', 'أربع أضلاع متساوية: square.'),
  sh('triangle', 'مثلث', 'triangle', 'ثلاث أضلاع: triangle.'), sh('rectangle', 'مستطيل', 'rectangle', 'أربع أضلاع، اثنين أطول من اثنين: rectangle.'),
  sh('star', 'نجمة', 'star', 'خمس رؤوس: star.'), sh('heart', 'قلب', 'heart', 'شكل القلب: heart.'),
  sh('oval', 'شكل بيضاوي', 'oval', 'مدوّر بس ممطوط مثل البيضة: oval.'), sh('diamond', 'معيّن', 'diamond', 'مربع واقف على رأسه: diamond.'),
] };

const NUM_AR = ['واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة'];
const NUM_EN = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const NUMBERS: VisualCardSet = { titleAr: 'الأرقام من ١ إلى ١٠', cards: NUM_EN.map((en, i) => c(en, NUM_AR[i], { k: 'count', n: i + 1 }, `عدّ المكعبات: ${i + 1}، يعني ${en}.`)) };

const em = (en: string, ar: string, e: string, why: string, mood?: Extract<Scene, { k: 'emoji' }>['mood'], arms?: Extract<Scene, { k: 'emoji' }>['arms']) => c(en, ar, { k: 'emoji', e, mood, arms }, why);
const ANIMALS: VisualCardSet = { titleAr: 'الحيوانات', cards: [
  em('cat', 'قطة', '🐈', 'هذي قطة: cat.'), em('dog', 'كلب', '🐕', 'هذا كلب: dog.'), em('camel', 'جمل', '🐪', 'هذا جمل: camel.'),
  em('horse', 'حصان', '🐎', 'هذا حصان: horse.'), em('bird', 'طائر', '🐦', 'هذا طائر: bird.'), em('lion', 'أسد', '🦁', 'هذا أسد: lion.'),
  em('sheep', 'خروف', '🐑', 'هذا خروف: sheep.'), em('cow', 'بقرة', '🐄', 'هذي بقرة: cow.'), em('falcon', 'صقر', '🦅', 'هذا صقر: falcon.'), em('goat', 'ماعز', '🐐', 'هذي ماعز: goat.'),
] };

const bp = (en: string, ar: string, part: Extract<Scene, { k: 'body' }>['part']) => c(en, ar, { k: 'body', part }, `الدائرة الحمراء على ${ar}، وبالإنجليزي ${en}.`);
const BODY: VisualCardSet = { titleAr: 'أعضاء الجسم', cards: [
  bp('head', 'رأس', 'head'), bp('eye', 'عين', 'eye'), bp('ear', 'أذن', 'ear'), bp('nose', 'أنف', 'nose'), bp('mouth', 'فم', 'mouth'),
  bp('hand', 'يد', 'hand'), bp('foot', 'قدم', 'foot'), bp('leg', 'رجل / ساق', 'leg'), bp('tooth', 'سن', 'tooth'), bp('hair', 'شعر', 'hair'),
] };

const VERBS: VisualCardSet = { titleAr: 'الأفعال اليومية', cards: [
  em('wake up', 'يستيقظ', '⏰', 'المنبه رن وبندق يتمطّى: wake up.', 'excited', 'up'),
  em('eat', 'يأكل', '🍎', 'بندق ماسك تفاحة يبي ياكلها: eat.'),
  em('drink', 'يشرب', '🥛', 'بندق معه كاس حليب يشربه: drink.'),
  em('sleep', 'ينام', '🛏️', 'عيونه مسكّرة وجنبه سرير: sleep.', 'sleep', 'down'),
  em('read', 'يقرأ', '📖', 'بندق ماسك كتاب: read.'),
  em('write', 'يكتب', '✏️', 'بندق ماسك قلم: write.'),
  em('walk', 'يمشي', '🚶', 'بندق يمشي بهدوء: walk.', 'calm', 'down'),
  em('run', 'يركض', '🏃', 'بندق يركض بسرعة: run.', 'excited', 'up'),
  em('wash', 'يغسل', '🧼', 'معه صابون يغسل يدينه: wash.'),
  em('pray', 'يصلّي', '🕌', 'بندق رايح يصلّي في المسجد: pray.', 'calm', 'down'),
] };

const md = (en: string, ar: string, mood: Extract<Scene, { k: 'mood' }>['mood'], why: string, bubble?: string) => c(en, ar, { k: 'mood', mood, bubble }, why);
const FEELINGS: VisualCardSet = { titleAr: 'المشاعر', cards: [
  md('happy', 'سعيد', 'happy', 'يبتسم: happy.'), md('sad', 'حزين', 'sad', 'فمه نازل ودمعة على خده: sad.'),
  md('angry', 'غاضب', 'angry', 'حواجبه معقودة: angry.'), md('tired', 'تعبان', 'tired', 'عيونه شبه مسكّرة: tired.'),
  md('hungry', 'جوعان', 'calm', 'يفكر بالأكل: hungry.', '🍔'), md('thirsty', 'عطشان', 'calm', 'يفكر بالماي: thirsty.', '💧'),
  md('scared', 'خائف', 'scared', 'عيونه كبيرة وفمه مفتوح: scared.'), md('excited', 'متحمس', 'excited', 'رافع يدينه وفاتح فمه من الفرحة: excited.'),
  md('bored', 'ملول / زهقان', 'bored', 'عيونه نص مفتوحة وفمه مايل: bored.'), md('proud', 'فخور', 'proud', 'رافع يدينه ومعه ميدالية: proud.', '🏅'),
] };

const wt = (en: string, ar: string, w: Extract<Scene, { k: 'weather' }>['w'], why: string) => c(en, ar, { k: 'weather', w }, why);
const WEATHER: VisualCardSet = { titleAr: 'الطقس', cards: [
  wt('sun', 'شمس', 'sun', 'الشمس طالعة: sun.'), wt('rain', 'مطر', 'rain', 'قطرات تنزل وبندق تحت المظلة: rain.'),
  wt('wind', 'رياح', 'wind', 'خطوط الهوا تدفه: wind.'), wt('cloud', 'غيمة', 'cloud', 'غيوم بيضاء في السما: cloud.'),
  wt('storm', 'عاصفة', 'storm', 'غيمة سودا وبرق: storm.'), wt('snow', 'ثلج', 'snow', 'حبات بيضا والأرض بيضا: snow.'),
  wt('warm', 'دافئ / حار', 'warm', 'الشمس قوية وبندق يعرق: warm.'),
] };

const fm = (en: string, ar: string, scene: Extract<Scene, { k: 'family' }>, why: string) => c(en, ar, scene, why);
const FAMILY: VisualCardSet = { titleAr: 'أفراد العائلة', cards: [
  fm('father', 'أب', { k: 'family', acc: 'mustache' }, 'الكبير أبو شنب: father.'),
  fm('mother', 'أم', { k: 'family', acc: 'hijab' }, 'الكبيرة بالحجاب: mother.'),
  fm('brother', 'أخ', { k: 'family', acc: 'cap', small: true }, 'الصغير أبو كاب: brother.'),
  fm('sister', 'أخت', { k: 'family', acc: 'bow', small: true }, 'الصغيرة أم الفيونكة: sister.'),
  fm('son', 'ابن', { k: 'family', acc: 'cap', parent: 'mustache' }, 'الصغير جنب أبوه، هو ولده: son.'),
  fm('daughter', 'ابنة', { k: 'family', acc: 'bow', parent: 'hijab' }, 'الصغيرة جنب أمها، هي بنتها: daughter.'),
  fm('grandfather', 'جد', { k: 'family', acc: 'grandpa' }, 'لحية بيضاء وعصا: grandfather.'),
  fm('grandmother', 'جدة', { k: 'family', acc: 'grandma' }, 'حجاب رمادي ونظارة وعصا: grandmother.'),
  fm('uncle', 'عم / خال', { k: 'family', acc: 'uncle' }, 'شنب ونظارة: uncle.'),
  fm('family', 'عائلة', { k: 'family', group: true }, 'الكل مع بعض: family.'),
] };


// ───────── Grammar / conversation / writing / more vocabulary (characters: بندق، سلمى، يوسف) ─────────
const yes = (en: string, ar: string, e: string, ok: boolean) => c(en, ar, { k: 'yesno', e, ok }, ok ? `علامة صح خضراء: ${en}.` : `علامة خطأ حمراء: ${en}.`);
const pr = (en: string, ar: string, p: Extract<Scene, { k: 'pron' }>['p'], why: string, item?: string) => c(en, ar, { k: 'pron', p, item }, why);
const PRONOUNS: VisualCardSet = { titleAr: 'الضمائر (مين نقصد؟)', cards: [
  pr('I', 'أنا', 'I', 'بندق يشير لنفسه: I.'), pr('you', 'أنت / أنتِ', 'you', 'بندق يكلّم سلمى مباشرة: you.'),
  pr('he', 'هو', 'he', 'سلمى تتكلم عن يوسف (ولد): he.'), pr('she', 'هي', 'she', 'يوسف يتكلم عن سلمى (بنت): she.'),
  pr('it', 'هو / هي لغير العاقل', 'it', 'المكعب شيء مو إنسان: it.'), pr('we', 'نحن', 'we', 'بندق وسلمى مع بعض، وبندق منهم: we.'),
  pr('they', 'هم', 'they', 'بندق يتكلم عن سلمى ويوسف وهو مو معهم: they.'),
] };
const POSSESSIVES: VisualCardSet = { titleAr: 'صفات الملكية (لمين الشيء؟)', cards: [
  pr('my bag', 'حقيبتي', 'I', 'الحقيبة مع بندق نفسه: my.', '🎒'), pr('your bag', 'حقيبتك', 'you', 'الحقيبة مع سلمى اللي يكلمها: your.', '🎒'),
  pr('his bag', 'حقيبته', 'he', 'الحقيبة مع يوسف (ولد): his.', '🎒'), pr('her bag', 'حقيبتها', 'she', 'الحقيبة مع سلمى (بنت): her.', '🎒'),
  pr('our bags', 'حقائبنا', 'we', 'الحقائب لنا كلنا: our.', '🎒'), pr('their bags', 'حقائبهم', 'they', 'الحقائب لسلمى ويوسف: their.', '🎒'),
] };
const DEMOS: VisualCardSet = { titleAr: 'this / that / these / those', cards: [
  c('this book', 'هذا الكتاب', { k: 'demo', d: 'this', e: '📕' }, 'كتاب واحد قريب من بندق: this.'),
  c('that book', 'ذلك الكتاب', { k: 'demo', d: 'that', e: '📕' }, 'كتاب واحد بعيد: that.'),
  c('these books', 'هذه الكتب', { k: 'demo', d: 'these', e: '📕' }, 'كتب كثيرة قريبة: these.'),
  c('those books', 'تلك الكتب', { k: 'demo', d: 'those', e: '📕' }, 'كتب كثيرة بعيدة: those.'),
] };
const ARTICLES: VisualCardSet = { titleAr: 'a / an والجمع', cards: [
  c('a book', 'كتاب (واحد)', { k: 'many', e: '📘', n: 1 }, 'book يبدأ بصوت ساكن (ب) فنقول a.'),
  c('an apple', 'تفاحة (واحدة)', { k: 'many', e: '🍎', n: 1 }, 'apple يبدأ بصوت حرف علة (آ) فنقول an.'),
  c('an egg', 'بيضة (واحدة)', { k: 'many', e: '🥚', n: 1 }, 'egg يبدأ بصوت (إ) فنقول an.'),
  c('books', 'كتب', { k: 'many', e: '📘', n: 4 }, 'أكثر من واحد: نزيد s ← books.'),
  c('apples', 'تفاحات', { k: 'many', e: '🍎', n: 5 }, 'أكثر من تفاحة: apples.'),
  c('boxes', 'صناديق', { k: 'many', e: '📦', n: 3 }, 'box تنتهي بـ x فنزيد es ← boxes.'),
] };
const THERE: VisualCardSet = { titleAr: 'There is / There are', cards: [
  c('There is a cat.', 'توجد قطة.', { k: 'many', e: '🐈', n: 1 }, 'قطة وحدة بس: There is.'),
  c('There are three cats.', 'توجد ثلاث قطط.', { k: 'many', e: '🐈', n: 3 }, 'أكثر من وحدة: There are.'),
  c('There is a car.', 'توجد سيارة.', { k: 'many', e: '🚗', n: 1 }, 'سيارة وحدة: There is.'),
  c('There are five apples.', 'توجد خمس تفاحات.', { k: 'many', e: '🍎', n: 5 }, 'خمس تفاحات (جمع): There are.'),
] };
const CAN: VisualCardSet = { titleAr: "Can / Can't", cards: [
  c('I can swim.', 'أستطيع السباحة.', { k: 'yesno', e: '🏊', ok: true }, 'علامة صح خضراء: يقدر ← can.'),
  c("I can't fly.", 'لا أستطيع الطيران.', { k: 'yesno', e: '🕊️', ok: false }, "علامة خطأ حمراء: ما يقدر ← can't."),
  c('She can ride a bike.', 'هي تستطيع ركوب الدراجة.', { k: 'yesno', e: '🚲', ok: true, who: 'salma' }, 'سلمى تقدر: can.'),
  c("He can't drive.", 'هو لا يستطيع القيادة.', { k: 'yesno', e: '🚗', ok: false, who: 'yousef' }, "يوسف صغير ما يقدر يسوق: can't."),
  c('I can read.', 'أستطيع القراءة.', { k: 'yesno', e: '📖', ok: true, who: 'yousef' }, 'يوسف يقدر يقرأ: can.'),
] };
const tl = (en: string, ar: string, t: Extract<Scene, { k: 'time' }>['t'], why: string, e?: string) => c(en, ar, { k: 'time', t, e }, why);
const TENSES: VisualCardSet = { titleAr: 'الأزمنة على خط الزمن', cards: [
  tl('I play every day.', 'ألعب كل يوم.', 'habit', 'نقاط تتكرر على طول الخط: عادة ← Present Simple.', '⚽'),
  tl('I am playing now.', 'ألعب الآن.', 'progress', 'شي شغّال الحين عند «الآن»: Present Continuous.', '⚽'),
  tl('I played yesterday.', 'لعبت أمس.', 'past', 'نقطة وحدة في الماضي وخلصت: Past Simple.', '⚽'),
  tl('I will play tomorrow.', 'سألعب غداً.', 'future', 'نقطة في المستقبل: will.', '⚽'),
  tl('I am going to play.', 'أنوي أن ألعب.', 'plan', 'خطة من الآن للمستقبل: going to.', '⚽'),
  tl('I have played.', 'لقد لعبت.', 'perfect', 'شي صار في الماضي وأثره واصل للآن: Present Perfect.', '⚽'),
  tl('I was playing.', 'كنت ألعب.', 'pastprog', 'شي كان شغّال في وقت بالماضي: Past Continuous.', '⚽'),
  tl('I had played.', 'كنت قد لعبت.', 'pastperfect', 'حدث (1) صار قبل حدث (2) في الماضي: Past Perfect.', '⚽'),
] };
const pick = (set: VisualCardSet, titleAr: string, idx: number[]): VisualCardSet => ({ titleAr, cards: idx.map(i => set.cards[i]) });
const T_PRESENT = pick(TENSES, 'المضارع البسيط: عادة تتكرر', [0]);
const T_PRES_VS_CONT = pick(TENSES, 'عادة أم الآن؟', [0, 1]);
const T_PAST = pick(TENSES, 'الماضي على خط الزمن', [2]);
const T_PAST_VS_PROG = pick(TENSES, 'ماضي بسيط أم مستمر؟', [2, 6]);
const T_FUTURE = pick(TENSES, 'المستقبل: will و going to', [3, 4]);
const T_PERFECT = pick(TENSES, 'المضارع التام مقابل الماضي', [5, 2]);
const T_PASTPERF = pick(TENSES, 'الماضي التام', [7, 2]);
const T_ALL = TENSES;
const ck = (en: string, ar: string, h: number, m: number) => c(en, ar, { k: 'clock', h, m }, `العقرب القصير على ${h} والطويل يقول الدقائق: ${en}.`);
const TIME: VisualCardSet = { titleAr: 'كم الساعة؟', cards: [
  ck("three o'clock", 'الساعة الثالثة', 3, 0), ck('half past four', 'الرابعة والنصف', 4, 30), ck('quarter past seven', 'السابعة والربع', 7, 15),
  ck('quarter to nine', 'التاسعة إلا ربع', 8, 45), ck('ten past two', 'الثانية وعشر دقائق', 2, 10), ck("twelve o'clock", 'الثانية عشرة', 12, 0),
] };
const ROUTINE: VisualCardSet = { titleAr: 'روتيني اليومي', cards: [
  ck('I wake up at six.', 'أستيقظ الساعة السادسة.', 6, 0),
  c('I brush my teeth.', 'أفرّش أسناني.', { k: 'kid', who: 'yousef', e: '🪥' }, 'يوسف ماسك فرشاة الأسنان.'),
  c('I have breakfast.', 'أفطر.', { k: 'kid', who: 'salma', e: '🥣' }, 'سلمى قدامها صحن الفطور.'),
  c('I go to school.', 'أذهب إلى المدرسة.', { k: 'kid', who: 'yousef', e: '🏫' }, 'يوسف رايح المدرسة.'),
  c('I do my homework.', 'أحل واجبي.', { k: 'kid', who: 'salma', e: '📝' }, 'سلمى تكتب واجبها.'),
  c('I go to bed at ten.', 'أنام الساعة العاشرة.', { k: 'kid', who: 'bunduq', e: '🛏️', mood: 'sleep' }, 'بندق نعسان وجنبه السرير.'),
] };
const fq = (en: string, ar: string, n: number) => c(en, ar, { k: 'freq', n, e: '🏃' }, `${n} من 7 أيام: ${en}.`);
const FREQUENCY: VisualCardSet = { titleAr: 'كم مرة؟', cards: [
  fq('always', 'دائماً', 7), fq('usually', 'عادةً', 5), fq('often', 'غالباً', 4), fq('sometimes', 'أحياناً', 2), fq('rarely', 'نادراً', 1), fq('never', 'أبداً', 0),
] };
const cp = (en: string, ar: string, n: 1 | 2 | 3, e: string, why: string) => c(en, ar, { k: 'cmp', n, e }, why);
const COMPARE: VisualCardSet = { titleAr: 'المقارنة والتفضيل', cards: [
  cp('big', 'كبير', 2, '🍉', 'بطيخة كبيرة: big.'), cp('bigger', 'أكبر (من)', 3, '🍉', 'أكبر من اللي جنبها: bigger than.'),
  cp('the biggest', 'الأكبر', 3, '🏠', 'أكبر وحدة من الكل: the biggest.'), cp('small', 'صغير', 1, '🐟', 'سمكة صغيرة: small.'),
  cp('smaller', 'أصغر (من)', 1, '🐟', 'أصغر من اللي جنبها: smaller than.'),
] };
const OPPOSITES: VisualCardSet = { titleAr: 'الأضداد', cards: [
  cp('big', 'كبير', 3, '🐘', 'الفيل الكبير: big.'), cp('small', 'صغير', 1, '🐘', 'الفيل الصغير: small.'),
  em('hot', 'حار', '☕', 'كوب قهوة حار يطلع منه بخار: hot.'), em('cold', 'بارد', '🧊', 'مكعب ثلج بارد: cold.'),
  md('happy', 'سعيد', 'happy', 'يبتسم: happy.'), md('sad', 'حزين', 'sad', 'دمعة على خده: sad.'),
  em('fast', 'سريع', '🚀', 'صاروخ سريع: fast.', 'excited', 'up'), em('slow', 'بطيء', '🐢', 'سلحفاة بطيئة: slow.', 'calm', 'down'),
] };
const FOOD: VisualCardSet = { titleAr: 'الأكل', cards: [
  em('bread', 'خبز', '🍞', 'رغيف خبز: bread.'), em('rice', 'رز', '🍚', 'صحن رز: rice.'), em('chicken', 'دجاج', '🍗', 'قطعة دجاج: chicken.'),
  em('fish', 'سمك', '🐟', 'سمكة: fish.'), em('egg', 'بيضة', '🥚', 'بيضة: egg.'), em('cheese', 'جبن', '🧀', 'قطعة جبن: cheese.'),
  em('apple', 'تفاحة', '🍎', 'تفاحة حمراء: apple.'), em('banana', 'موزة', '🍌', 'موزة صفراء: banana.'), em('dates', 'تمر', '🌴', 'نخلة التمر: dates.'), em('soup', 'شوربة', '🍲', 'قدر شوربة: soup.'),
] };
const DRINKS: VisualCardSet = { titleAr: 'المشروبات', cards: [
  em('water', 'ماء', '💧', 'قطرة ماء: water.'), em('milk', 'حليب', '🥛', 'كاس حليب: milk.'), em('juice', 'عصير', '🧃', 'علبة عصير: juice.'),
  em('tea', 'شاي', '🍵', 'كوب شاي: tea.'), em('coffee', 'قهوة', '☕', 'فنجان قهوة: coffee.'), em('bottle', 'قارورة', '🍼', 'قارورة: bottle.'),
  em('hot', 'حار', '♨️', 'بخار حار: hot.'), em('cold', 'بارد', '🧊', 'ثلج بارد: cold.'),
] };
const HOME: VisualCardSet = { titleAr: 'البيت', cards: [
  em('house', 'بيت', '🏠', 'بيت: house.'), em('door', 'باب', '🚪', 'باب: door.'), em('window', 'نافذة', '🪟', 'نافذة: window.'),
  em('bed', 'سرير', '🛏️', 'سرير: bed.'), em('chair', 'كرسي', '🪑', 'كرسي: chair.'), em('bathroom', 'حمّام', '🛁', 'حوض الحمّام: bathroom.'), em('key', 'مفتاح', '🔑', 'مفتاح: key.'),
] };
const SCHOOL: VisualCardSet = { titleAr: 'المدرسة', cards: [
  em('school', 'مدرسة', '🏫', 'مبنى المدرسة: school.'), c('teacher', 'معلم / معلمة', { k: 'kid', who: 'salma', e: '👩‍🏫' }, 'المعلمة قدام سلمى: teacher.'),
  c('student', 'طالب', { k: 'kid', who: 'yousef', e: '🎒' }, 'يوسف بحقيبته طالب: student.'), em('book', 'كتاب', '📘', 'كتاب: book.'),
  em('pen', 'قلم حبر', '🖊️', 'قلم حبر: pen.'), em('pencil', 'قلم رصاص', '✏️', 'قلم رصاص: pencil.'), em('bag', 'حقيبة', '🎒', 'حقيبة: bag.'), em('exam', 'اختبار', '📝', 'ورقة اختبار: exam.'),
] };
const kd = (en: string, ar: string, who: KidId | 'bunduq', e: string, why: string) => c(en, ar, { k: 'kid', who, e }, why);
const CLOTHES: VisualCardSet = { titleAr: 'الملابس', cards: [
  kd('shirt', 'قميص', 'yousef', '👕', 'قميص: shirt.'), kd('trousers', 'بنطلون', 'yousef', '👖', 'بنطلون: trousers.'), kd('dress', 'فستان', 'salma', '👗', 'فستان: dress.'),
  kd('shoes', 'حذاء', 'yousef', '👟', 'حذاء: shoes.'), kd('hat', 'قبعة', 'bunduq', '🧢', 'قبعة: hat.'), kd('jacket', 'جاكيت', 'salma', '🧥', 'جاكيت: jacket.'),
  kd('socks', 'جوارب', 'yousef', '🧦', 'جوارب: socks.'), kd('scarf', 'وشاح', 'salma', '🧣', 'وشاح: scarf.'), kd('glasses', 'نظارة', 'bunduq', '👓', 'نظارة: glasses.'), kd('watch', 'ساعة يد', 'yousef', '⌚', 'ساعة يد: watch.'),
] };
const CITY: VisualCardSet = { titleAr: 'أماكن المدينة', cards: [
  em('street', 'شارع', '🛣️', 'شارع: street.'), em('mosque', 'مسجد', '🕌', 'مسجد: mosque.'), em('hospital', 'مستشفى', '🏥', 'مستشفى: hospital.'),
  em('park', 'حديقة عامة', '🌳', 'شجر وحديقة: park.'), em('mall', 'مول', '🛍️', 'أكياس تسوّق في المول: mall.'), em('bank', 'بنك', '🏦', 'بنك: bank.'),
  em('restaurant', 'مطعم', '🍽️', 'صحن وشوكة وسكين: restaurant.'), em('pharmacy', 'صيدلية', '💊', 'دواء من الصيدلية: pharmacy.'), em('market', 'سوق', '🏪', 'محل في السوق: market.'), em('bridge', 'جسر', '🌉', 'جسر: bridge.'),
] };
const TRANSPORT: VisualCardSet = { titleAr: 'المواصلات', cards: [
  em('car', 'سيارة', '🚗', 'سيارة: car.'), em('bus', 'حافلة', '🚌', 'حافلة: bus.'), em('train', 'قطار', '🚆', 'قطار: train.'),
  em('plane', 'طائرة', '✈️', 'طائرة: plane.'), em('taxi', 'تاكسي', '🚕', 'تاكسي: taxi.'), em('bike', 'دراجة', '🚲', 'دراجة: bike.'),
  em('ship', 'سفينة', '🚢', 'سفينة: ship.'), em('ticket', 'تذكرة', '🎫', 'تذكرة: ticket.'),
] };
const JOBS: VisualCardSet = { titleAr: 'المهن', cards: [
  em('doctor', 'طبيب', '🩺', 'سماعة الطبيب: doctor.'), em('nurse', 'ممرض', '💉', 'حقنة الممرض: nurse.'), em('engineer', 'مهندس', '🏗️', 'رافعة بناء: engineer.'),
  em('pilot', 'طيار', '✈️', 'الطيار يقود الطائرة: pilot.'), em('police officer', 'شرطي', '🚓', 'سيارة الشرطة: police officer.'), em('chef', 'طباخ', '🍳', 'مقلاة الطباخ: chef.'),
  em('farmer', 'مزارع', '🌾', 'سنابل القمح: farmer.'), em('driver', 'سائق', '🚌', 'السائق يقود الحافلة: driver.'), em('dentist', 'طبيب أسنان', '🦷', 'سن: dentist.'),
] };
const SPORTS: VisualCardSet = { titleAr: 'الرياضة', cards: [
  em('football', 'كرة قدم', '⚽', 'كرة القدم: football.'), em('swim', 'يسبح', '🏊', 'يسبح في الماء: swim.'), em('ball', 'كرة', '🏀', 'كرة: ball.'),
  em('goal', 'هدف', '🥅', 'المرمى والهدف: goal.'), yes('win', 'يفوز', '🏆', true), yes('lose', 'يخسر', '🏆', false),
] };
const KITCHEN: VisualCardSet = { titleAr: 'المطبخ', cards: [
  em('plate', 'صحن', '🍽️', 'صحن: plate.'), em('spoon', 'ملعقة', '🥄', 'ملعقة: spoon.'), em('knife', 'سكين', '🔪', 'سكين: knife.'),
  em('fridge', 'ثلاجة', '🧊', 'الثلاجة باردة مثل الثلج: fridge.'), em('pot', 'قدر', '🍲', 'قدر: pot.'), em('salt', 'ملح', '🧂', 'ملح: salt.'),
] };
const ORDERING: VisualCardSet = { titleAr: 'في المطعم', cards: [
  c('a menu, please', 'القائمة لو سمحت', { k: 'kid', who: 'yousef', e: '📋' }, 'يوسف يطلب القائمة.'),
  c("I'd like a burger.", 'أريد برجر.', { k: 'kid', who: 'salma', e: '🍔' }, 'سلمى تطلب برجر.'),
  c('a glass of water', 'كأس ماء', { k: 'kid', who: 'bunduq', e: '🥤' }, 'بندق يبي كاس ماء.'),
  c('The bill, please.', 'الحساب لو سمحت.', { k: 'kid', who: 'yousef', e: '🧾' }, 'يوسف يطلب الفاتورة.'),
] };
const DIRECTIONS: VisualCardSet = { titleAr: 'الاتجاهات', cards: [
  em('turn left', 'لف يسار', '⬅️', 'السهم لليسار: turn left.'), em('turn right', 'لف يمين', '➡️', 'السهم لليمين: turn right.'),
  em('go straight', 'امشِ على طول', '⬆️', 'السهم لقدّام: go straight.'), em('go back', 'ارجع', '↩️', 'السهم يرجع: go back.'),
  em('traffic lights', 'إشارة المرور', '🚦', 'إشارة المرور: traffic lights.'),
] };
const OCCUPATIONS_INTRO: VisualCardSet = { titleAr: 'التعارف: الاسم والبلد والمهنة', cards: [
  c("I'm Salma.", 'أنا سلمى.', { k: 'kid', who: 'salma', e: '👋' }, 'سلمى تعرّف بنفسها.'), c("I'm from Saudi Arabia.", 'أنا من السعودية.', { k: 'kid', who: 'yousef', e: '🇸🇦' }, 'يوسف يقول من وين هو.'),
  JOBS.cards[0], JOBS.cards[2], JOBS.cards[5],
] };

export const SARA_VISUAL_CARDS: Record<string, VisualCardSet[]> = {
  'vocab-a-02': [FAMILY],
  'vocab-a-03': [NUMBERS],
  'vocab-a-05': [COLOURS],
  'vocab-a-10': [BODY],
  'vocab-a-12': [WEATHER],
  'vocab-a-13': [ANIMALS],
  'vocab-a-16': [VERBS],
  'vocab-a-17': [FEELINGS],
  'vocab-a-18': [SHAPES],
  'vocab-a-27': [PREPOSITIONS, DIRECTIONS],
  'vocab-a-06': [FOOD], 'vocab-a-07': [DRINKS], 'vocab-a-08': [HOME], 'vocab-a-09': [SCHOOL], 'vocab-a-11': [CLOTHES],
  'vocab-a-14': [CITY], 'vocab-a-15': [TRANSPORT], 'vocab-a-19': [JOBS], 'vocab-a-21': [SPORTS], 'vocab-a-29': [KITCHEN],
  // Grammar (foundations)
  'foundations-04': [PRONOUNS], 'foundations-05': [PRONOUNS], 'foundations-07': [ARTICLES], 'foundations-08': [ARTICLES], 'foundations-09': [DEMOS],
  'foundations-10': [COLOURS, FAMILY], 'foundations-12': [POSSESSIVES], 'foundations-13': [T_PRESENT, ROUTINE], 'foundations-16': [TIME],
  'foundations-17': [THERE], 'foundations-18': [PREPOSITIONS], 'foundations-19': [CAN], 'foundations-21': [T_PRES_VS_CONT], 'foundations-22': [T_PAST],
  'foundations-23': [T_PAST], 'foundations-24': [T_PAST], 'foundations-26': [T_FUTURE], 'foundations-28': [COMPARE, OPPOSITES], 'foundations-29': [ORDERING, DIRECTIONS],
  'foundations-30': [T_ALL],
  // Grammar (Sara's grammar track)
  'sg_101': [PRONOUNS], 'sg_104': [PRONOUNS], 'sg_106': [DEMOS], 'sg_107': [THERE], 'sg_108': [POSSESSIVES], 'sg_109': [T_PRESENT, ROUTINE], 'sg_110': [ROUTINE],
  'sg_102': [FREQUENCY], 'sg_111': [CAN], 'sg_112': [T_PRES_VS_CONT], 'sg_113': [T_PAST], 'sg_114': [T_PAST], 'sg_115': [T_PAST], 'sg_117': [COMPARE], 'sg_118': [COMPARE],
  'sg_119': [T_FUTURE], 'sg_103': [T_FUTURE], 'sg_121': [T_PERFECT], 'sg_122': [T_PERFECT], 'sg_126': [T_PAST_VS_PROG],
  'adv-b1-01': [T_PRES_VS_CONT], 'adv-b1-03': [T_PAST_VS_PROG], 'adv-b1-05': [T_PERFECT], 'adv-b1-07': [T_PERFECT], 'adv-b1-08': [T_PERFECT], 'adv-b1-10': [T_PASTPERF],
  'adv-b1-11': [T_FUTURE], 'adv-b1-15': [COMPARE], 'adv-b1-28': [FREQUENCY], 'adv-b1-20': [CAN], 'adv-b2-01': [T_ALL],
  // Conversation / writing
  'sc_204': [OCCUPATIONS_INTRO], 'sc_206': [TIME], 'sc_207': [ORDERING, FOOD], 'sc_208': [DIRECTIONS], 'sc_209': [CLOTHES], 'sc_215': [TRANSPORT], 'sc_216': [WEATHER], 'sc_217': [OPPOSITES],
  'conv-b1-03': [ORDERING], 'conv-b1-05': [DIRECTIONS], 'conv-b1-19': [TRANSPORT], 'conv-b1-20': [WEATHER], 'conv-b1-24': [FAMILY], 'conv-b1-26': [JOBS],
  'scw_405': [FAMILY], 'scw_409': [ROUTINE], 'write-b1-17': [ROUTINE], 'write-b1-15': [TIME], 'write-b1-21': [PRONOUNS], 'write-b1-22': [COMPARE],
};
export const visualCardsFor = (lessonId: string): VisualCard[] => (SARA_VISUAL_CARDS[lessonId] || []).flatMap(s => s.cards);
export const visualTitleFor = (lessonId: string) => (SARA_VISUAL_CARDS[lessonId] || []).map(s => s.titleAr).join(' + ');
