import type { TutorLesson } from './nouraL1';
import type { SaraChoiceQuestion } from '../saraTracks/foundations';
/**
 * لينا — picture classes for kids. Every sentence has its own 3D illustration (public/lina/<class>/<h|m>NN-i.webp, 768×768 webp).
 * Built and open: «فصل البيت» (lessons 1–10) and «فصل السوق» (lessons 11–20), 4 pictures per lesson. The other 6 classes are on
 * the map as «قريباً» with text-only outlines. Progress uses the existing tutor counter (tutor_track_tutor-lina_*); a class badge
 * comes from that counter, and the class story only keeps a «seen» flag in localStorage.
 */
export type PicScene = { img: string; en: string; ar: string };
export type PicWrong = { scene: number; en: string; bad: string; fix: string };
export type PicLesson = {
  scenes: PicScene[]; /** scenes asked in «اختر الصورة الصحيحة» */ choose: number[]; /** «وش الغلط في الصورة؟» */ wrong: PicWrong;
  /** Lessons without a story (vocabulary scenes): «وصّل الصورة بجملتها» instead of «رتّب حسب القصة». */
  match?: boolean;
  /** «اسمع واختر الصورة» (text hidden): one of this lesson's sentences among pictures from the class's other lessons. */
  listen?: { scene: number; decoys: PicScene[] };
  /** «قلها بصوتك»: the sentence the kid says into the mic (never blocks the lesson). */
  say?: number;
};
/** Activities counted in the result: choose × n, listen (when present), order/match, spot the mistake. «قلها بصوتك» is practice, not scored. */
export const picTotal = (p: PicLesson) => p.choose.length + (p.listen ? 1 : 0) + 2;

type Raw = { titleAr: string; titleEn: string; icon: string; explain: string; alt: string; scenes: [string, string][]; choose: number[]; wrong: PicWrong; match?: boolean };
const RAW: Raw[] = [
  { titleAr: 'غرف البيت', titleEn: 'Rooms of the House', icon: '🏠',
    explain: 'أهلاً يا بطل! اليوم نتجول في البيت ونعرف أسماء الغرف بالإنجليزي. شوف الصورة واسمع الجملة وكررها معي.',
    alt: 'كل غرفة لها اسم: المطبخ kitchen، وغرفة النوم bedroom، والصالة living room، والحديقة garden. نقول This is يعني «هذا هو».',
    scenes: [['This is the kitchen.', 'هذا المطبخ.'], ['This is the bedroom.', 'هذي غرفة النوم.'], ['This is the living room.', 'هذي الصالة.'], ['This is the garden.', 'هذي الحديقة.']],
    choose: [1, 3], wrong: { scene: 0, en: 'This is the bathroom.', bad: 'bathroom', fix: 'kitchen' }, match: true },
  { titleAr: 'صباح الخير', titleEn: 'Good Morning', icon: '🌅',
    explain: 'عمر صحى من النوم! تعال نشوف وش يسوي كل صباح. كل صورة لها جملة، اسمعها وكررها.',
    alt: 'الصباح خطوات: يصحى wakes up، ويفرش أسنانه brushes his teeth، ويغسل وجهه washes his face، ويلبس ملابسه puts on his clothes.',
    scenes: [['Omar wakes up.', 'عمر يصحى من النوم.'], ['He brushes his teeth.', 'يفرش أسنانه.'], ['He washes his face.', 'يغسل وجهه.'], ['He puts on his clothes.', 'يلبس ملابسه.']],
    choose: [2, 0], wrong: { scene: 1, en: 'He brushes his hair.', bad: 'hair', fix: 'teeth' } },
  { titleAr: 'الفطور', titleEn: 'Breakfast', icon: '🍳',
    explain: 'وقت الفطور! ماما تطبخ وبابا يصب الحليب. شوف كل صورة واسمع وش يصير.',
    alt: 'تعلم كلمات الفطور: بيضة egg، حليب milk، عصير برتقال orange juice. ونقول eats يعني ياكل، و drinks يعني يشرب.',
    scenes: [['Mom makes breakfast.', 'ماما تسوي الفطور.'], ['Dad pours the milk.', 'بابا يصب الحليب.'], ['Omar eats an egg.', 'عمر ياكل بيضة.'], ['Omar drinks orange juice.', 'عمر يشرب عصير برتقال.']],
    choose: [3, 1], wrong: { scene: 1, en: 'Dad pours the juice.', bad: 'juice', fix: 'milk' }, match: true },
  { titleAr: 'نطلع من البيت', titleEn: 'Leaving Home', icon: '🚪',
    explain: 'عمر بيطلع للمدرسة. يلبس جزمته وياخذ شنطته ويودع ماما، وبابا يوصله بالسيارة.',
    alt: 'shoes يعني جزمة، و school bag يعني شنطة المدرسة، و goodbye يعني مع السلامة، و drives يعني يسوق.',
    scenes: [['Omar puts on his shoes.', 'عمر يلبس جزمته.'], ['He takes his school bag.', 'ياخذ شنطة المدرسة.'], ['He says goodbye to Mom.', 'يقول لماما مع السلامة.'], ['Dad drives the car.', 'بابا يسوق السيارة.']],
    choose: [0, 2], wrong: { scene: 3, en: 'Mom drives the car.', bad: 'Mom', fix: 'Dad' } },
  { titleAr: 'الواجب', titleEn: 'Homework', icon: '✏️',
    explain: 'رجع عمر من المدرسة وجلس يحل واجبه. بابا جا يساعده، وبالأخير عمر مبسوط.',
    alt: 'homework يعني الواجب، و pencil يعني قلم رصاص، و helps يعني يساعد، و notebook يعني الدفتر.',
    scenes: [['Omar does his homework.', 'عمر يحل واجبه.'], ['He writes with a pencil.', 'يكتب بقلم رصاص.'], ['Dad helps him.', 'بابا يساعده.'], ['He closes his notebook.', 'يسكر دفتره.']],
    choose: [1, 3], wrong: { scene: 2, en: 'Mom helps him.', bad: 'Mom', fix: 'Dad' } },
  { titleAr: 'ننظف البيت', titleEn: 'Cleaning the House', icon: '🧹',
    explain: 'اليوم كلنا ننظف البيت! كل واحد عنده شغلة. شوف مين يسوي وش.',
    alt: 'makes his bed يعني يرتب سريره، و sweeps يعني يكنس، و waters the plants يعني يسقي الزرع، و trash يعني الزبالة.',
    scenes: [['Omar makes his bed.', 'عمر يرتب سريره.'], ['Mom sweeps the floor.', 'ماما تكنس الأرض.'], ['Dad waters the plants.', 'بابا يسقي الزرع.'], ['Omar takes out the trash.', 'عمر يطلع الزبالة.']],
    choose: [2, 0], wrong: { scene: 1, en: 'Mom sweeps the garden.', bad: 'garden', fix: 'floor' }, match: true },
  { titleAr: 'في المطبخ', titleEn: 'In the Kitchen', icon: '🍅',
    explain: 'العائلة تطبخ الغدا مع بعض. ماما تقطع الطماط، وعمر يغسل الخضار، وبابا يطبخ الرز.',
    alt: 'cuts يعني يقطع، و washes يعني يغسل، و cooks يعني يطبخ، و ready يعني جاهز.',
    scenes: [['Mom cuts the tomatoes.', 'ماما تقطع الطماط.'], ['Omar washes the vegetables.', 'عمر يغسل الخضار.'], ['Dad cooks the rice.', 'بابا يطبخ الرز.'], ['The food is ready.', 'الأكل جاهز.']],
    choose: [3, 1], wrong: { scene: 0, en: 'Mom cuts the bananas.', bad: 'bananas', fix: 'tomatoes' } },
  { titleAr: 'في الصالة', titleEn: 'In the Living Room', icon: '🛋️',
    explain: 'وقت الراحة في الصالة. كل واحد يسوي شي يحبه، حتى القطوة!',
    alt: 'reads a book يعني يقرا كتاب، و plays يعني يلعب، و drinks tea يعني تشرب شاي، و sleeps يعني تنام.',
    scenes: [['Dad reads a book.', 'بابا يقرا كتاب.'], ['Omar plays with his blocks.', 'عمر يلعب بالمكعبات.'], ['Mom drinks tea.', 'ماما تشرب شاي.'], ['The cat sleeps on the sofa.', 'القطوة نايمة على الكنبة.']],
    choose: [0, 2], wrong: { scene: 3, en: 'The dog sleeps on the sofa.', bad: 'dog', fix: 'cat' }, match: true },
  { titleAr: 'العشا مع العائلة', titleEn: 'Family Dinner', icon: '🍽️',
    explain: 'العائلة تتعشى مع بعض على الطاولة. شوف كيف يساعدون بعض.',
    alt: 'table يعني طاولة، و passes يعني يعطي ويمرر، و eats يعني ياكل، و pours يعني تصب.',
    scenes: [['The family sits at the table.', 'العائلة جالسة على الطاولة.'], ['Omar passes the salad.', 'عمر يعطي السلطة.'], ['Dad eats chicken and rice.', 'بابا ياكل دجاج ورز.'], ['Mom pours the water.', 'ماما تصب الماي.']],
    choose: [1, 3], wrong: { scene: 3, en: 'Mom pours the milk.', bad: 'milk', fix: 'water' }, match: true },
  { titleAr: 'وقت النوم', titleEn: 'Bedtime', icon: '🌙',
    explain: 'خلص اليوم! عمر يتروش ويلبس بيجامته، وماما تقرا له قصة، وبعدين يطفي النور.',
    alt: 'takes a bath يعني يتروش في البانيو، و pajamas يعني بيجامة، و story يعني قصة، و turns off the light يعني يطفي النور.',
    scenes: [['Omar takes a bath.', 'عمر ياخذ حمام.'], ['He puts on his pajamas.', 'يلبس بيجامته.'], ['Mom reads him a story.', 'ماما تقرا له قصة.'], ['Omar turns off the light.', 'عمر يطفي النور.']],
    choose: [2, 0], wrong: { scene: 2, en: 'Dad reads him a story.', bad: 'Dad', fix: 'Mom' } },
];

/** «فصل السوق» (lessons 11–20): pictures in public/lina/market/mNN-i.webp, one generated 3D illustration per sentence. */
const MARKET: Raw[] = [
  { titleAr: 'في البقالة', titleEn: 'At the Grocery', icon: '🛒',
    explain: 'اليوم نروح السوق مع عمر وماما وبابا! كل واحد ياخذ شي. شوف الصور واسمع الجمل.',
    alt: 'shopping cart يعني عربية التسوق، و picks يعني يختار، و bottle of milk يعني علبة حليب، و pushes يعني يدف.',
    scenes: [['Mom takes a shopping cart.', 'ماما تاخذ عربية التسوق.'], ['Omar picks red apples.', 'عمر يختار تفاح أحمر.'], ['Dad takes a bottle of milk.', 'بابا ياخذ علبة حليب.'], ['Omar pushes the cart.', 'عمر يدف العربية.']],
    choose: [1, 3], wrong: { scene: 1, en: 'Omar picks green apples.', bad: 'green', fix: 'red' } },
  { titleAr: 'في المخبز', titleEn: 'At the Bakery', icon: '🥖',
    explain: 'ريحة الخبز الحار تجيب الجوع! تعال نشوف وش يصير في المخبز.',
    alt: 'smells يعني يشم، و baker يعني الخباز، و bread يعني خبز، و small cake يعني كيكة صغيرة.',
    scenes: [['Omar smells the bread.', 'عمر يشم ريحة الخبز.'], ['The baker makes the bread.', 'الخباز يسوي الخبز.'], ['Dad buys a bag of bread.', 'بابا يشتري كيس خبز.'], ['Omar eats a small cake.', 'عمر ياكل كيكة صغيرة.']],
    choose: [2, 0], wrong: { scene: 3, en: 'Omar eats a big cake.', bad: 'big', fix: 'small' } },
  { titleAr: 'محل الفواكه', titleEn: 'The Fruit Shop', icon: '🍌',
    explain: 'محل الفواكه مليان ألوان! نتعلم أسماء الفواكه وألوانها.',
    alt: 'bananas يعني موز، و grapes يعني عنب، و watermelon يعني حبحب، و mango يعني مانجا. و yellow أصفر، و green أخضر، و big كبير.',
    scenes: [['These are yellow bananas.', 'هذا موز أصفر.'], ['These are green grapes.', 'هذا عنب أخضر.'], ['This is a big watermelon.', 'هذي حبحبة كبيرة.'], ['Mom smells a mango.', 'ماما تشم مانجا.']],
    choose: [0, 2], wrong: { scene: 2, en: 'This is a big pineapple.', bad: 'pineapple', fix: 'watermelon' }, match: true },
  { titleAr: 'محل الخضار', titleEn: 'The Vegetable Shop', icon: '🥕',
    explain: 'وين الخضار؟ عمر وماما وبابا يختارون خضار للغدا.',
    alt: 'carrots يعني جزر، و potatoes يعني بطاط، و cucumber يعني خيارة، و onions يعني بصل.',
    scenes: [['These are orange carrots.', 'هذا جزر برتقالي.'], ['Dad picks potatoes.', 'بابا يختار بطاط.'], ['Omar holds a cucumber.', 'عمر ماسك خيارة.'], ['Mom buys red onions.', 'ماما تشتري بصل أحمر.']],
    choose: [1, 3], wrong: { scene: 2, en: 'Omar holds a banana.', bad: 'banana', fix: 'cucumber' }, match: true },
  { titleAr: 'محل الملابس', titleEn: 'The Clothes Shop', icon: '👕',
    explain: 'عمر يبي قميص جديد. يجرب واحد كبير مرة، وبعدين يلقى المقاس الصح!',
    alt: 'tries on يعني يجرب يلبس، و too big يعني كبير مرة، و small يعني صغير، و fits يعني على مقاسه.',
    scenes: [['Omar tries on a blue shirt.', 'عمر يجرب قميص أزرق.'], ['The shirt is too big.', 'القميص كبير مرة.'], ['Mom gives him a small shirt.', 'ماما تعطيه قميص صغير.'], ['Now the shirt fits!', 'الحين القميص على مقاسه!']],
    choose: [0, 3], wrong: { scene: 0, en: 'Omar tries on a red shirt.', bad: 'red', fix: 'blue' } },
  { titleAr: 'محل الجزم', titleEn: 'The Shoe Shop', icon: '👟',
    explain: 'جزمة عمر قديمة ومخرومة! بابا ياخذه يشتري جزمة جديدة.',
    alt: 'needs يعني يحتاج، و measures his foot يعني يقيس رجله، و white يعني أبيض، و walks يعني يمشي.',
    scenes: [['Omar needs new shoes.', 'عمر يحتاج جزمة جديدة.'], ['Dad measures his foot.', 'بابا يقيس رجله.'], ['Omar tries the white shoes.', 'عمر يجرب الجزمة البيضا.'], ['He walks in his new shoes.', 'يمشي بجزمته الجديدة.']],
    choose: [1, 2], wrong: { scene: 2, en: 'Omar tries the black shoes.', bad: 'black', fix: 'white' } },
  { titleAr: 'محل الألعاب', titleEn: 'The Toy Shop', icon: '🧸',
    explain: 'محل الألعاب! سيارة ودبدوب وكورة وروبوت. وش تحب أكثر؟',
    alt: 'car يعني سيارة، و teddy bear يعني دبدوب، و ball يعني كورة، و robot يعني روبوت. و red أحمر، و yellow أصفر.',
    scenes: [['This is a red car.', 'هذي سيارة حمرا.'], ['This is a big teddy bear.', 'هذا دبدوب كبير.'], ['This is a yellow ball.', 'هذي كورة صفرا.'], ['Omar plays with a robot.', 'عمر يلعب بروبوت.']],
    choose: [3, 1], wrong: { scene: 1, en: 'This is a small teddy bear.', bad: 'small', fix: 'big' }, match: true },
  { titleAr: 'محل الآيسكريم', titleEn: 'The Ice Cream Shop', icon: '🍦',
    explain: 'الجو حار وعمر يبي آيسكريم! وش النكهة اللي بيختارها؟',
    alt: 'wants يعني يبي، و chooses يعني يختار، و strawberry يعني فراولة، و pays يعني يدفع.',
    scenes: [['Omar wants ice cream.', 'عمر يبي آيسكريم.'], ['He chooses strawberry.', 'يختار فراولة.'], ['Dad pays the man.', 'بابا يدفع للبياع.'], ['Omar eats his ice cream.', 'عمر ياكل الآيسكريم حقه.']],
    choose: [0, 2], wrong: { scene: 1, en: 'He chooses chocolate.', bad: 'chocolate', fix: 'strawberry' } },
  { titleAr: 'عند الكاشير', titleEn: 'At the Checkout', icon: '💳',
    explain: 'خلصنا التسوق! الحين نروح للكاشير وندفع.',
    alt: 'belt يعني السير، و cashier يعني الكاشير، و scans يعني يمرر على الجهاز، و card يعني بطاقة، و bag يعني كيس.',
    scenes: [['Mom puts the food on the belt.', 'ماما تحط الأغراض على السير.'], ['The cashier scans the milk.', 'الكاشيرة تمرر الحليب.'], ['Dad pays with a card.', 'بابا يدفع بالبطاقة.'], ['Omar carries a bag.', 'عمر يشيل كيس.']],
    choose: [1, 3], wrong: { scene: 3, en: 'Omar carries a box.', bad: 'box', fix: 'bag' } },
  { titleAr: 'نرجع البيت', titleEn: 'Back Home', icon: '🏡',
    explain: 'رجعنا من السوق! نحط الأغراض في السيارة، وبعدين في الثلاجة.',
    alt: 'puts يعني يحط، و seatbelt يعني حزام الأمان، و fridge يعني ثلاجة، و banana يعني موزة.',
    scenes: [['Dad puts the bags in the car.', 'بابا يحط الأكياس في السيارة.'], ['Omar puts on his seatbelt.', 'عمر يلبس حزام الأمان.'], ['Mom puts the fruit in the fridge.', 'ماما تحط الفواكه في الثلاجة.'], ['Omar eats a banana.', 'عمر ياكل موزة.']],
    choose: [2, 0], wrong: { scene: 2, en: 'Mom puts the fruit in the oven.', bad: 'oven', fix: 'fridge' } },
];

const q = (promptAr: string, options: string[], correctIndex: number): SaraChoiceQuestion => ({ promptAr, options, correctIndex });
/** Text copy of the picture questions (same shape every tutor lesson has: used by reports, translation and validators). */
const textQuestions = (scenes: PicScene[], salt: number) => scenes.map((s, i) => {
  const others = scenes.filter((_, j) => j !== i).map(x => x.en);
  const pick = [others[(i + salt) % others.length], others[(i + salt + 1) % others.length]];
  const at = (i + salt) % 3; const options = [...pick]; options.splice(at, 0, s.en);
  return q(`«${s.ar.replace(/\.$/, '')}» بالإنجليزي:`, options, at);
});

/** One picture class → its lessons. `first` = order of its first lesson, `dir`/`prefix` = picture folder and file prefix. */
function buildClass(raw: Raw[], levelId: string, first: number, dir: string, prefix: string): TutorLesson[] {
  const scenesOf = raw.map((r, k) => r.scenes.map(([en, ar], i) => ({ img: `/lina/${dir}/${prefix}${String(first + k).padStart(2, '0')}-${i + 1}.webp`, en, ar }) as PicScene));
  return raw.map((r, k) => {
    const order = first + k, nn = String(order).padStart(2, '0');
    const scenes = scenesOf[k];
    const [check, ...exercises] = textQuestions(scenes, k);
    // «اسمع واختر»: a sentence not asked in «اختر الصورة», among one picture from each of 3 other lessons of the class.
    const scene = [0, 1, 2, 3].find(i => !r.choose.includes(i) && i !== r.wrong.scene) ?? [0, 1, 2, 3].find(i => !r.choose.includes(i))!;
    const decoys = [1, 2, 3].map(d => { const o = (k + d * 3) % raw.length === k ? (k + d) % raw.length : (k + d * 3) % raw.length; return scenesOf[o][(k + d) % 4]; });
    const say = r.choose[0];
    return {
      id: `tutor-lina-${nn}`, order, levelId, titleAr: r.titleAr, titleEn: r.titleEn, icon: r.icon,
      content: { explanationAr: r.explain, altExplanationAr: r.alt, example: scenes.map(({ en, ar }) => ({ en, ar })), check, exercises },
      board: [{ kind: 'title', text: r.titleEn }, { kind: 'highlight', text: scenes[0].en }, { kind: 'example', en: scenes[0].en, ar: scenes[0].ar }, { kind: 'example', en: scenes[1].en, ar: scenes[1].ar }],
      pics: { scenes, choose: r.choose, wrong: r.wrong, match: r.match, listen: { scene, decoys }, say },
    } as TutorLesson;
  });
}

export const LINA_HOUSE: TutorLesson[] = buildClass(RAW, 'house', 1, 'house', 'h');
export const LINA_MARKET: TutorLesson[] = buildClass(MARKET, 'market', 11, 'market', 'm');
/** Every built picture lesson, in order (the track's lessons). */
export const LINA_LESSONS: TutorLesson[] = [...LINA_HOUSE, ...LINA_MARKET];

/** 🏅 + 📖 per built class: badge (earned from the existing progress counter) and the end-of-class story. */
export type LinaStoryQuestion = { promptAr: string; promptEn: string; options: string[]; correctIndex: number };
export type LinaClassStory = { titleAr: string; titleEn: string; pages: PicScene[]; questions: LinaStoryQuestion[] };
export type LinaClass = { id: string; titleAr: string; titleEn: string; badgeEmoji: string; badgeAr: string; badgeEn: string; firstOrder: number; lastOrder: number; story: LinaClassStory };
const pic = (lessons: TutorLesson[], order: number, i: number) => lessons.find(l => l.order === order)!.pics!.scenes[i - 1].img;
export const LINA_CLASSES: LinaClass[] = [
  { id: 'house', titleAr: 'فصل البيت', titleEn: 'The House', badgeEmoji: '🏠', badgeAr: 'شارة البيت', badgeEn: 'House badge', firstOrder: 1, lastOrder: 10,
    story: { titleAr: 'يوم عمر', titleEn: "Omar's Day", pages: [
      { img: pic(LINA_HOUSE, 2, 1), en: 'In the morning, Omar wakes up.', ar: 'الصبح، عمر يصحى من النوم.' },
      { img: pic(LINA_HOUSE, 3, 3), en: 'He eats an egg for breakfast.', ar: 'ياكل بيضة على الفطور.' },
      { img: pic(LINA_HOUSE, 5, 1), en: 'After school, he does his homework.', ar: 'بعد المدرسة، يحل واجبه.' },
      { img: pic(LINA_HOUSE, 10, 4), en: 'At night, he turns off the light.', ar: 'في الليل، يطفي النور.' },
    ], questions: [
      { promptAr: 'وش ياكل عمر على الفطور؟', promptEn: 'What does Omar eat for breakfast?', options: ['an egg', 'a cake', 'a banana'], correctIndex: 0 },
      { promptAr: 'وش يسوي عمر بعد المدرسة؟', promptEn: 'What does Omar do after school?', options: ['He swims.', 'He does his homework.', 'He cooks.'], correctIndex: 1 },
    ] } },
  { id: 'market', titleAr: 'فصل السوق', titleEn: 'The Market', badgeEmoji: '🛒', badgeAr: 'شارة السوق', badgeEn: 'Market badge', firstOrder: 11, lastOrder: 20,
    story: { titleAr: 'يوم التسوق', titleEn: 'Shopping Day', pages: [
      { img: pic(LINA_MARKET, 11, 2), en: 'At the market, Omar picks red apples.', ar: 'في السوق، عمر يختار تفاح أحمر.' },
      { img: pic(LINA_MARKET, 15, 4), en: 'He gets a new blue shirt.', ar: 'ياخذ قميص أزرق جديد.' },
      { img: pic(LINA_MARKET, 19, 3), en: 'Dad pays with a card.', ar: 'بابا يدفع بالبطاقة.' },
      { img: pic(LINA_MARKET, 20, 3), en: 'At home, Mom puts the fruit in the fridge.', ar: 'في البيت، ماما تحط الفواكه في الثلاجة.' },
    ], questions: [
      { promptAr: 'وش لون التفاح اللي اختاره عمر؟', promptEn: 'What colour are the apples?', options: ['green', 'yellow', 'red'], correctIndex: 2 },
      { promptAr: 'وين حطت ماما الفواكه؟', promptEn: 'Where does Mom put the fruit?', options: ['in the fridge', 'in the oven', 'in the car'], correctIndex: 0 },
    ] } },
];
/** A class is done (badge earned) once the existing counter is past its last lesson — no new storage, no new Firebase field. */
export const linaClassDone = (c: LinaClass, unlocked: number) => unlocked > c.lastOrder;
export const linaClassOf = (order: number) => LINA_CLASSES.find(c => order >= c.firstOrder && order <= c.lastOrder);

/** The 8 picture classes as map levels (البيت and السوق built; the rest «قريباً»). */
export type LinaMapLevel = { id: string; titleAr: string; titleEn: string; shortAr: string; shortEn: string; noteAr?: string; noteEn?: string };
const SOON_NOTE = { noteAr: 'قريباً: صور هذا الفصل تنضاف في الدفعات الجاية', noteEn: 'Coming soon: pictures for this class arrive in a later batch' };
const SOON: { id: string; titleAr: string; titleEn: string; shortAr: string; shortEn: string; icon: string; lessons: [string, string][] }[] = [
  { id: 'school', titleAr: 'فصل المدرسة', titleEn: 'School', shortAr: 'المدرسة', shortEn: 'School', icon: '🏫', lessons: [['في الفصل', 'In the Classroom'], ['أدواتي', 'My School Things'], ['في الساحة', 'In the Playground'], ['في المكتبة', 'In the Library'], ['في المقصف', 'At the Canteen'], ['حصة الرسم', 'Art Class'], ['حصة الرياضة', 'PE Class'], ['أصحابي', 'My Friends'], ['نرتب الفصل', 'Tidying the Classroom'], ['نهاية اليوم', 'End of the Day']] },
  { id: 'adventure', titleAr: 'فصل المغامرة: قصة مصورة على حلقات', titleEn: 'The Adventure: a Picture Story in Episodes', shortAr: 'المغامرة', shortEn: 'Adventure', icon: '🗺️', lessons: [['الحلقة ١: الخريطة الغامضة', 'Episode 1: The Secret Map'], ['الحلقة ٢: في الغابة', 'Episode 2: In the Forest'], ['الحلقة ٣: عبور النهر', 'Episode 3: Crossing the River'], ['الحلقة ٤: الكهف', 'Episode 4: The Cave'], ['الحلقة ٥: الكنز', 'Episode 5: The Treasure']] },
  { id: 'travel', titleAr: 'فصل السفر', titleEn: 'Travel', shortAr: 'السفر', shortEn: 'Travel', icon: '✈️', lessons: [['في المطار', 'At the Airport'], ['في الطيارة', 'On the Plane'], ['في الفندق', 'At the Hotel'], ['في المطعم', 'At the Restaurant'], ['على البحر', 'At the Beach']] },
  { id: 'nature', titleAr: 'فصل الحيوانات والطبيعة', titleEn: 'Animals and Nature', shortAr: 'الحيوانات', shortEn: 'Animals', icon: '🦁', lessons: [['حديقة الحيوان', 'At the Zoo'], ['في المزرعة', 'On the Farm'], ['تحت البحر', 'Under the Sea'], ['في البر', 'In the Desert'], ['ألوان وأعداد', 'Colours and Numbers']] },
  { id: 'feelings', titleAr: 'فصل المشاعر', titleEn: 'Feelings', shortAr: 'المشاعر', shortEn: 'Feelings', icon: '😊', lessons: [['مبسوط وزعلان', 'Happy and Sad'], ['خايف وشجاع', 'Scared and Brave'], ['تعبان وجوعان', 'Tired and Hungry'], ['متفاجئ', 'Surprised'], ['ليش أحس كذا؟', 'Why Do I Feel This Way?']] },
  { id: 'jobs', titleAr: 'فصل المهن', titleEn: 'Jobs', shortAr: 'المهن', shortEn: 'Jobs', icon: '👩‍🚒', lessons: [['الطبيب', 'The Doctor'], ['الطيار', 'The Pilot'], ['الطباخ', 'The Cook'], ['رجل الإطفاء', 'The Firefighter'], ['المعلمة', 'The Teacher']] },
];
export const LINA_MAP_LEVELS: LinaMapLevel[] = [
  { id: 'house', titleAr: 'فصل البيت', titleEn: 'The House', shortAr: 'البيت', shortEn: 'House' },
  { id: 'market', titleAr: 'فصل السوق', titleEn: 'The Market', shortAr: 'السوق', shortEn: 'Market' },
  ...SOON.map(s => ({ id: s.id, titleAr: s.titleAr, titleEn: s.titleEn, shortAr: s.shortAr, shortEn: s.shortEn, ...SOON_NOTE })),
];
/** Text-only outlines of the coming classes: always locked on the map (orders far past the real lessons; never opened). */
export const LINA_SOON_LESSONS: TutorLesson[] = SOON.flatMap((s, si) => s.lessons.map(([titleAr, titleEn], i) => ({
  id: `tutor-lina-soon-${s.id}-${i + 1}`, order: 1000 + si * 20 + i, levelId: s.id, titleAr, titleEn, icon: s.icon, soon: true,
} as TutorLesson)));
