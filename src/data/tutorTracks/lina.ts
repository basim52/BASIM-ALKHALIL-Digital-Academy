import type { TutorLesson } from './nouraL1';
import type { SaraChoiceQuestion } from '../saraTracks/foundations';
/**
 * لينا — picture classes for kids. Every sentence has its own 3D illustration (public/lina/<class>/hNN-i.webp, 512px webp).
 * Built now: «فصل البيت» (10 lessons × 4 pictures). The other 7 classes are on the map as «قريباً» with text-only outlines,
 * so their pictures can be added in later batches. Progress uses the existing tutor counter (tutor_track_tutor-lina_*).
 */
export type PicScene = { img: string; en: string; ar: string };
export type PicWrong = { scene: number; en: string; bad: string; fix: string };
export type PicLesson = { scenes: PicScene[]; /** scenes asked in «اختر الصورة الصحيحة» */ choose: number[]; /** «وش الغلط في الصورة؟» */ wrong: PicWrong };
/** Activities counted in the result: choose × n, order the story, spot the mistake. */
export const picTotal = (p: PicLesson) => p.choose.length + 2;

type Raw = { titleAr: string; titleEn: string; icon: string; explain: string; alt: string; scenes: [string, string][]; choose: number[]; wrong: PicWrong };
const RAW: Raw[] = [
  { titleAr: 'غرف البيت', titleEn: 'Rooms of the House', icon: '🏠',
    explain: 'أهلاً يا بطل! اليوم نتجول في البيت ونعرف أسماء الغرف بالإنجليزي. شوف الصورة واسمع الجملة وكررها معي.',
    alt: 'كل غرفة لها اسم: المطبخ kitchen، وغرفة النوم bedroom، والصالة living room، والحديقة garden. نقول This is يعني «هذا هو».',
    scenes: [['This is the kitchen.', 'هذا المطبخ.'], ['This is the bedroom.', 'هذي غرفة النوم.'], ['This is the living room.', 'هذي الصالة.'], ['This is the garden.', 'هذي الحديقة.']],
    choose: [1, 3], wrong: { scene: 0, en: 'This is the bathroom.', bad: 'bathroom', fix: 'kitchen' } },
  { titleAr: 'صباح الخير', titleEn: 'Good Morning', icon: '🌅',
    explain: 'عمر صحى من النوم! تعال نشوف وش يسوي كل صباح. كل صورة لها جملة، اسمعها وكررها.',
    alt: 'الصباح خطوات: يصحى wakes up، ويفرش أسنانه brushes his teeth، ويغسل وجهه washes his face، ويلبس ملابسه puts on his clothes.',
    scenes: [['Omar wakes up.', 'عمر يصحى من النوم.'], ['He brushes his teeth.', 'يفرش أسنانه.'], ['He washes his face.', 'يغسل وجهه.'], ['He puts on his clothes.', 'يلبس ملابسه.']],
    choose: [2, 0], wrong: { scene: 1, en: 'He brushes his hair.', bad: 'hair', fix: 'teeth' } },
  { titleAr: 'الفطور', titleEn: 'Breakfast', icon: '🍳',
    explain: 'وقت الفطور! ماما تطبخ وبابا يصب الحليب. شوف كل صورة واسمع وش يصير.',
    alt: 'تعلم كلمات الفطور: بيضة egg، حليب milk، عصير برتقال orange juice. ونقول eats يعني ياكل، و drinks يعني يشرب.',
    scenes: [['Mom makes breakfast.', 'ماما تسوي الفطور.'], ['Dad pours the milk.', 'بابا يصب الحليب.'], ['Omar eats an egg.', 'عمر ياكل بيضة.'], ['Omar drinks orange juice.', 'عمر يشرب عصير برتقال.']],
    choose: [3, 1], wrong: { scene: 1, en: 'Dad pours the juice.', bad: 'juice', fix: 'milk' } },
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
    choose: [2, 0], wrong: { scene: 1, en: 'Mom sweeps the garden.', bad: 'garden', fix: 'floor' } },
  { titleAr: 'في المطبخ', titleEn: 'In the Kitchen', icon: '🍅',
    explain: 'العائلة تطبخ الغدا مع بعض. ماما تقطع الطماط، وعمر يغسل الخضار، وبابا يطبخ الرز.',
    alt: 'cuts يعني يقطع، و washes يعني يغسل، و cooks يعني يطبخ، و ready يعني جاهز.',
    scenes: [['Mom cuts the tomatoes.', 'ماما تقطع الطماط.'], ['Omar washes the vegetables.', 'عمر يغسل الخضار.'], ['Dad cooks the rice.', 'بابا يطبخ الرز.'], ['The food is ready.', 'الأكل جاهز.']],
    choose: [3, 1], wrong: { scene: 0, en: 'Mom cuts the bananas.', bad: 'bananas', fix: 'tomatoes' } },
  { titleAr: 'في الصالة', titleEn: 'In the Living Room', icon: '🛋️',
    explain: 'وقت الراحة في الصالة. كل واحد يسوي شي يحبه، حتى القطوة!',
    alt: 'reads a book يعني يقرا كتاب، و plays يعني يلعب، و drinks tea يعني تشرب شاي، و sleeps يعني تنام.',
    scenes: [['Dad reads a book.', 'بابا يقرا كتاب.'], ['Omar plays with his blocks.', 'عمر يلعب بالمكعبات.'], ['Mom drinks tea.', 'ماما تشرب شاي.'], ['The cat sleeps on the sofa.', 'القطوة نايمة على الكنبة.']],
    choose: [0, 2], wrong: { scene: 3, en: 'The dog sleeps on the sofa.', bad: 'dog', fix: 'cat' } },
  { titleAr: 'العشا مع العائلة', titleEn: 'Family Dinner', icon: '🍽️',
    explain: 'العائلة تتعشى مع بعض على الطاولة. شوف كيف يساعدون بعض.',
    alt: 'table يعني طاولة، و passes يعني يعطي ويمرر، و eats يعني ياكل، و pours يعني تصب.',
    scenes: [['The family sits at the table.', 'العائلة جالسة على الطاولة.'], ['Omar passes the salad.', 'عمر يعطي السلطة.'], ['Dad eats chicken and rice.', 'بابا ياكل دجاج ورز.'], ['Mom pours the water.', 'ماما تصب الماي.']],
    choose: [1, 3], wrong: { scene: 3, en: 'Mom pours the milk.', bad: 'milk', fix: 'water' } },
  { titleAr: 'وقت النوم', titleEn: 'Bedtime', icon: '🌙',
    explain: 'خلص اليوم! عمر يتروش ويلبس بيجامته، وماما تقرا له قصة، وبعدين يطفي النور.',
    alt: 'takes a bath يعني يتروش في البانيو، و pajamas يعني بيجامة، و story يعني قصة، و turns off the light يعني يطفي النور.',
    scenes: [['Omar takes a bath.', 'عمر ياخذ حمام.'], ['He puts on his pajamas.', 'يلبس بيجامته.'], ['Mom reads him a story.', 'ماما تقرا له قصة.'], ['Omar turns off the light.', 'عمر يطفي النور.']],
    choose: [2, 0], wrong: { scene: 2, en: 'Dad reads him a story.', bad: 'Dad', fix: 'Mom' } },
];

const q = (promptAr: string, options: string[], correctIndex: number): SaraChoiceQuestion => ({ promptAr, options, correctIndex });
/** Text copy of the picture questions (same shape every tutor lesson has: used by reports, translation and validators). */
const textQuestions = (scenes: PicScene[], salt: number) => scenes.map((s, i) => {
  const others = scenes.filter((_, j) => j !== i).map(x => x.en);
  const pick = [others[(i + salt) % others.length], others[(i + salt + 1) % others.length]];
  const at = (i + salt) % 3; const options = [...pick]; options.splice(at, 0, s.en);
  return q(`«${s.ar.replace(/\.$/, '')}» بالإنجليزي:`, options, at);
});

export const LINA_HOUSE: TutorLesson[] = RAW.map((r, k) => {
  const order = k + 1, nn = String(order).padStart(2, '0');
  const scenes: PicScene[] = r.scenes.map(([en, ar], i) => ({ img: `/lina/house/h${nn}-${i + 1}.webp`, en, ar }));
  const [check, ...exercises] = textQuestions(scenes, k);
  return {
    id: `tutor-lina-${nn}`, order, levelId: 'house', titleAr: r.titleAr, titleEn: r.titleEn, icon: r.icon,
    content: { explanationAr: r.explain, altExplanationAr: r.alt, example: scenes.map(({ en, ar }) => ({ en, ar })), check, exercises },
    board: [{ kind: 'title', text: r.titleEn }, { kind: 'highlight', text: scenes[0].en }, { kind: 'example', en: scenes[0].en, ar: scenes[0].ar }, { kind: 'example', en: scenes[1].en, ar: scenes[1].ar }],
    pics: { scenes, choose: r.choose, wrong: r.wrong },
  } as TutorLesson;
});

/** The 8 picture classes as map levels (البيت built; the rest «قريباً»). */
export type LinaMapLevel = { id: string; titleAr: string; titleEn: string; shortAr: string; shortEn: string; noteAr?: string; noteEn?: string };
const SOON_NOTE = { noteAr: 'قريباً: صور هذا الفصل تنضاف في الدفعات الجاية', noteEn: 'Coming soon: pictures for this class arrive in a later batch' };
const SOON: { id: string; titleAr: string; titleEn: string; shortAr: string; shortEn: string; icon: string; lessons: [string, string][] }[] = [
  { id: 'market', titleAr: 'فصل السوق', titleEn: 'The Market', shortAr: 'السوق', shortEn: 'Market', icon: '🛒', lessons: [['في البقالة', 'At the Grocery'], ['في المخبز', 'At the Bakery'], ['محل الفواكه', 'The Fruit Shop'], ['محل الملابس', 'The Clothes Shop'], ['عند الكاشير', 'At the Checkout']] },
  { id: 'school', titleAr: 'فصل المدرسة', titleEn: 'School', shortAr: 'المدرسة', shortEn: 'School', icon: '🏫', lessons: [['في الفصل', 'In the Classroom'], ['أدواتي', 'My School Things'], ['في الساحة', 'In the Playground'], ['في المكتبة', 'In the Library'], ['في المقصف', 'At the Canteen']] },
  { id: 'adventure', titleAr: 'فصل المغامرة: قصة مصورة على حلقات', titleEn: 'The Adventure: a Picture Story in Episodes', shortAr: 'المغامرة', shortEn: 'Adventure', icon: '🗺️', lessons: [['الحلقة ١: الخريطة الغامضة', 'Episode 1: The Secret Map'], ['الحلقة ٢: في الغابة', 'Episode 2: In the Forest'], ['الحلقة ٣: عبور النهر', 'Episode 3: Crossing the River'], ['الحلقة ٤: الكهف', 'Episode 4: The Cave'], ['الحلقة ٥: الكنز', 'Episode 5: The Treasure']] },
  { id: 'travel', titleAr: 'فصل السفر', titleEn: 'Travel', shortAr: 'السفر', shortEn: 'Travel', icon: '✈️', lessons: [['في المطار', 'At the Airport'], ['في الطيارة', 'On the Plane'], ['في الفندق', 'At the Hotel'], ['في المطعم', 'At the Restaurant'], ['على البحر', 'At the Beach']] },
  { id: 'nature', titleAr: 'فصل الحيوانات والطبيعة', titleEn: 'Animals and Nature', shortAr: 'الحيوانات', shortEn: 'Animals', icon: '🦁', lessons: [['حديقة الحيوان', 'At the Zoo'], ['في المزرعة', 'On the Farm'], ['تحت البحر', 'Under the Sea'], ['في البر', 'In the Desert'], ['ألوان وأعداد', 'Colours and Numbers']] },
  { id: 'feelings', titleAr: 'فصل المشاعر', titleEn: 'Feelings', shortAr: 'المشاعر', shortEn: 'Feelings', icon: '😊', lessons: [['مبسوط وزعلان', 'Happy and Sad'], ['خايف وشجاع', 'Scared and Brave'], ['تعبان وجوعان', 'Tired and Hungry'], ['متفاجئ', 'Surprised'], ['ليش أحس كذا؟', 'Why Do I Feel This Way?']] },
  { id: 'jobs', titleAr: 'فصل المهن', titleEn: 'Jobs', shortAr: 'المهن', shortEn: 'Jobs', icon: '👩‍🚒', lessons: [['الطبيب', 'The Doctor'], ['الطيار', 'The Pilot'], ['الطباخ', 'The Cook'], ['رجل الإطفاء', 'The Firefighter'], ['المعلمة', 'The Teacher']] },
];
export const LINA_MAP_LEVELS: LinaMapLevel[] = [
  { id: 'house', titleAr: 'فصل البيت', titleEn: 'The House', shortAr: 'البيت', shortEn: 'House' },
  ...SOON.map(s => ({ id: s.id, titleAr: s.titleAr, titleEn: s.titleEn, shortAr: s.shortAr, shortEn: s.shortEn, ...SOON_NOTE })),
];
/** Text-only outlines of the coming classes: always locked on the map (orders far past the real lessons; never opened). */
export const LINA_SOON_LESSONS: TutorLesson[] = SOON.flatMap((s, si) => s.lessons.map(([titleAr, titleEn], i) => ({
  id: `tutor-lina-soon-${s.id}-${i + 1}`, order: 1000 + si * 10 + i, levelId: s.id, titleAr, titleEn, icon: s.icon, soon: true,
} as TutorLesson)));
