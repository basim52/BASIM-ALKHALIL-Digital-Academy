import type { Scene } from '../components/visualCards/VisualCardArt';

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
  'vocab-a-27': [PREPOSITIONS],
};
export const visualCardsFor = (lessonId: string): VisualCard[] => (SARA_VISUAL_CARDS[lessonId] || []).flatMap(s => s.cards);
export const visualTitleFor = (lessonId: string) => (SARA_VISUAL_CARDS[lessonId] || []).map(s => s.titleAr).join(' + ');
