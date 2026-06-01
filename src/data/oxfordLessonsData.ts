export interface OxfordUnit {
  id: string;
  category: 
    | 'phonics_heroes' 
    | 'oxford_reading_adventures' 
    | 'clil_discover' 
    | 'values_stories' 
    | 'project_time' 
    | 'grammar_friends' 
    | 'everyday_english'
    | 'big_questions'
    | 'reading_tree'
    | 'skills'
    | 'phonics';
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  
  bigQuestion?: string;
  bigQuestionAr?: string;
  isReadingLesson?: boolean;
  reading?: {
    title: string;
    text: string;
    audioSource: string;
  };
  vocab: { id: number; word: string; ar: string; img: string }[];
  comprehension?: { id: number; question: string; options: string[]; correct: string }[];
  quiz: { id: number; question: string; options: string[]; correct: string; img?: string }[];
  dialogue?: { speaker: string; english: string; arabic: string }[];
  practice?: {
    instructions_ar: string;
    questions: { sentence: string; options: string[]; correct: string }[];
  };
}

// Color palettes for the 7 premium chapters
const COLORS = {
  phonics_heroes: { bg: 'bg-rose-500', light: 'bg-rose-50' },
  oxford_reading_adventures: { bg: 'bg-emerald-500', light: 'bg-emerald-50' },
  clil_discover: { bg: 'bg-blue-500', light: 'bg-blue-50' },
  values_stories: { bg: 'bg-amber-500', light: 'bg-amber-50' },
  project_time: { bg: 'bg-purple-500', light: 'bg-purple-50' },
  grammar_friends: { bg: 'bg-indigo-500', light: 'bg-indigo-50' },
  everyday_english: { bg: 'bg-teal-500', light: 'bg-teal-50' }
};

// Raw definitions for Phonics Heroes (20 units)
const PHONICS_RAW = [
  { focus: 'letter sounds', alphabet: 'A, B, C', val: [{ s: 'ant', a: 'نملة', i: 'https://images.unsplash.com/photo-1558521810-ac71df5aa93e?w=400' }, { s: 'bat', a: 'مضرب/خفاش', i: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400' }, { s: 'cat', a: 'قطة', i: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' }] },
  { focus: 'letter sounds', alphabet: 'D, E, F', val: [{ s: 'dog', a: 'كلب', i: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400' }, { s: 'egg', a: 'بيضة', i: 'https://images.unsplash.com/photo-1582722411494-20db3f05f184?w=400' }, { s: 'fish', a: 'سمكة', i: 'https://images.unsplash.com/photo-1524704654690-b56006404424?w=400' }] },
  { focus: 'letter sounds', alphabet: 'G, H, I', val: [{ s: 'girl', a: 'بنت', i: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400' }, { s: 'hat', a: 'قبعة', i: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=400' }, { s: 'igloo', a: 'بيت جليدي', i: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400' }] },
  { focus: 'letter sounds', alphabet: 'J, K, L', val: [{ s: 'jam', a: 'مربى', i: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400' }, { s: 'kite', a: 'طائرة ورقية', i: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=400' }, { s: 'lion', a: 'أسد', i: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400' }] },
  { focus: 'letter sounds', alphabet: 'M, N, O', val: [{ s: 'milk', a: 'حليب', i: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' }, { s: 'nest', a: 'عش', i: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400' }, { s: 'orange', a: 'برتقال', i: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' }] },
  { focus: 'letter sounds', alphabet: 'P, Q, R', val: [{ s: 'pen', a: 'قلم جاف', i: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400' }, { s: 'queen', a: 'ملكة', i: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400' }, { s: 'rabbit', a: 'أرنب', i: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400' }] },
  { focus: 'letter sounds', alphabet: 'S, T, U', val: [{ s: 'sun', a: 'شمس', i: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400' }, { s: 'tiger', a: 'نمر', i: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b811?w=400' }, { s: 'umbrella', a: 'مظلة', i: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=400' }] },
  { focus: 'letter sounds', alphabet: 'V, W, X, Y, Z', val: [{ s: 'van', a: 'شاحنة', i: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=400' }, { s: 'window', a: 'نافذة', i: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?w=400' }, { s: 'fox', a: 'ثعلب', i: 'https://images.unsplash.com/photo-1474314881126-1d12976f30d8?w=400' }] },
  { focus: 'short vowel a', alphabet: '-at, -an (cat, man)', val: [{ s: 'cat', a: 'قطة', i: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' }, { s: 'man', a: 'رجل', i: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }, { s: 'hat', a: 'قبعة', i: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=400' }] },
  { focus: 'short vowel e', alphabet: '-et, -en (pet, hen)', val: [{ s: 'pet', a: 'حيوان أليف', i: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400' }, { s: 'hen', a: 'دجاجة', i: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400' }, { s: 'net', a: 'شبكة', i: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400' }] },
  { focus: 'short vowel i', alphabet: '-it, -in (sit, pin)', val: [{ s: 'sit', a: 'يجلس', i: 'https://images.unsplash.com/photo-1503252947848-7338d3f92f31?w=400' }, { s: 'pin', a: 'دبوس', i: 'https://images.unsplash.com/photo-1515564224754-9b4515c137a6?w=400' }, { s: 'bin', a: 'سلة مهمات', i: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=400' }] },
  { focus: 'short vowel o', alphabet: '-ot, -og (hot, dog)', val: [{ s: 'hot', a: 'حار', i: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400' }, { s: 'dog', a: 'كلب', i: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400' }, { s: 'pot', a: 'وعاء طهي', i: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400' }] },
  { focus: 'short vowel u', alphabet: '-ut, -un (cut, sun)', val: [{ s: 'cut', a: 'يقص/يقطع', i: 'https://images.unsplash.com/photo-1503795313014-efc07cfbe03c?w=400' }, { s: 'sun', a: 'شمس', i: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400' }, { s: 'nut', a: 'حبة مكسرات', i: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400' }] },
  { focus: 'long vowel a', alphabet: 'a_e (cake, game)', val: [{ s: 'cake', a: 'كعكة', i: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' }, { s: 'game', a: 'لعبة الفوز', i: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400' }, { s: 'lake', a: 'بحيرة جميله', i: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400' }] },
  { focus: 'long vowel i', alphabet: 'i_e (bike, time)', val: [{ s: 'bike', a: 'دراجة', i: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400' }, { s: 'time', a: 'ساعة يد/وقت', i: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400' }, { s: 'kite', a: 'طائرة ورقية', i: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=400' }] },
  { focus: 'long vowel o', alphabet: 'o_e (home, rope)', val: [{ s: 'home', a: 'منزل دافئ', i: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400' }, { s: 'rope', a: 'حبل مشدود', i: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400' }, { s: 'bone', a: 'عظمة', i: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' }] },
  { focus: 'digraphs', alphabet: 'sh, ch, th, wh', val: [{ s: 'ship', a: 'سفينة في البحر', i: 'https://images.unsplash.com/photo-1444312645910-ffa973656eba?w=400' }, { s: 'chair', a: 'كرسي مريح', i: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400' }, { s: 'thin', a: 'نحيف', i: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400' }] },
  { focus: 'blends', alphabet: 'st, sp, bl, cl', val: [{ s: 'star', a: 'نجم تائه', i: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400' }, { s: 'spoon', a: 'ملعقة', i: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=400' }, { s: 'blue', a: 'اللون الأزرق', i: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' }] },
  { focus: 'diphthongs', alphabet: 'ee, oo, ai', val: [{ s: 'tree', a: 'شجرة خضراء', i: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400' }, { s: 'moon', a: 'قمر الليل', i: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400' }, { s: 'rain', a: 'مطر منهمر', i: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400' }] },
  { focus: 'early reading', alphabet: 'sentences & story', val: [{ s: 'read', a: 'يقرأ كتاباً', i: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400' }, { s: 'book', a: 'كتاب مصور', i: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' }, { s: 'happy', a: 'سعيد ومرح', i: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400' }] }
];

// Raw definitions for Reading Adventures (20 units)
const READING_RAW = [
  { tAr: 'في المدرسة', tEn: 'At School', rAr: 'قصة شيقة عن اليوم الدراسي الأول واللعب في الفصل مع المعلم.', rEn: 'At School story about Biff, Chip, and Kipper starting their warm classes and drawing on the blackboard.' },
  { tAr: 'الحذاء الجديد', tEn: 'The New Shoes', rAr: 'مغامرة مضحكة مع حذاء تشيب الجديد ومشاكسة الكلب فلوبي.', rEn: 'Dad bought Chip lovely red shoes. Floppy jumped into a wet puddle, splattering mud on them!' },
  { tAr: 'البيت على الشجرة', tEn: 'The Treehouse', rAr: 'بناء بيت خشبي سحري وسط الحديقة لأجل المغامرات والأصدقاء.', rEn: 'Dad constructed a tiny wooden treehouse. Biff and Chip brought sweet apple juice to share inside.' },
  { tAr: 'مفتاح السحر', tEn: 'The Magic Key', rAr: 'بداية توهج المفتاح الغامض في الصندوق القديم وإعلان مغامرة جديدة.', rEn: 'From an old wooden chest in Biff\'s bedroom, the magical glowing key shines with soft golden hues.' },
  { tAr: 'رحلة إلى القمر', tEn: 'A Trip to the Moon', rAr: 'المفتاح السحري ينقل عائلتنا إلى سطح القمر البارد للعب والقفز.', rEn: 'Wielding zero gravity, the magic key propels the children to walk on the moon, collecting stones.' },
  { tAr: 'القرصان المفقود', tEn: 'The Lost Pirate', rAr: 'مساعدة قرصان مسكين في العثور على جزيرة كنز مدفونة.', rEn: 'Stranded on a hot sandy beach, they meet a weeping captain looking for his lost wooden ship.' },
  { tAr: 'العاصفة', tEn: 'The Storm', rAr: 'عاصفة ترعد في الليل وتسقط شجرة عملاقة في فناء البيت.', rEn: 'Loud thunder shakes the windows. The kids wake up to see a massive tree fallen across the fence.' },
  { tAr: 'الكلب النائم', tEn: 'The Sleeping Dog', rAr: 'يوم من الكسل والنوم الشديد للكلب اللطيف فلوبي.', rEn: 'Floppy feels extremely drowsy, sleeping on the warm carpet while everyone plays softly.' },
  { tAr: 'في الحديقة', tEn: 'In the Garden', rAr: 'زراعة بذور زهور برية ملونة وريّها بالماء حتى تزهر.', rEn: 'With dirt on her hands, Mum helps Keith plant yellow sunflower seeds in the sunny backyard.' },
  { tAr: 'وليمة القلعة', tEn: 'Castle Feast', rAr: 'الدخول لقلعة تاريخية ضخمة تملؤها طاولات الطعام الفاخر والفرسان.', rEn: 'Splendid stone castles await Biff as the key glows, welcoming them to help with a royal feast.' },
  { tAr: 'الغابة المطيرة', tEn: 'The Rainforest', rAr: 'اكتشاف قرود ملونة وفراشات طائرة في قلب غابة مطيرة دافئة.', rEn: 'Wandering thick vegetation, they watch butterflies slide past giant green tree canopies.' },
  { tAr: 'الروبوت العملاق', tEn: 'The Giant Robot', rAr: 'مساعدة روبوت معدني عملاق في أعمال الزراعة والتصليح.', rEn: 'A kind metallic giant walks across the fields, lifting branches to rescue a little stuck lamb.' },
  { tAr: 'مسرح الدمى', tEn: 'The Puppet Show', rAr: 'صناعة دمى ورقية وتأدية مسرحية خيالية أمام العائلة.', rEn: 'Weaving buttons on socks, Chip puts on a dramatic funny play with a make-shift cardboard stage.' },
  { tAr: 'السباق الكبير', tEn: 'The Big Race', rAr: 'يوم الرياضة والسباق السريع في ساحة المدرسة ونيل الفوز السعيد.', rEn: 'Wearing green trainers, Biff crosses the finish line with lightning speed, receiving a medal.' },
  { tAr: 'سر الجدة', tEn: 'Grandma\'s Secret', rAr: 'العثور على صندوق ألعاب قديم للغاية مدفون في صندرة الجدة.', rEn: 'Up the creaky attic ladders, Grandma uncovers a hidden wooden musical box from her youth.' },
  { tAr: 'رسالة في زجاجة', tEn: 'Message in a Bottle', rAr: 'العثور على زجاجة زجاجية في شاطئ البحر وبها رسالة قديمة.', rEn: 'Floppy unearths a glass bottle on the beach. Inside, a rolled map directs them to a friendly cove.' },
  { tAr: 'الكهف الغامض', tEn: 'The Mysterious Cave', rAr: 'استكشاف كهف عميق ومليء بالصخور الكريستالية اللامعة.', rEn: 'Guided by a small hand torch, they look at glowing violet crystals inside the ocean cave.' },
  { tAr: 'الكنز تحت البحر', tEn: 'Treasure Under the Sea', rAr: 'رحلة في عمق المحيط بمجسم غواصة ونيل صندوق الجواهر والذهب.', rEn: 'Surrounded by coral reefs, they salvage a decaying wooden chest filled with golden coins.' },
  { tAr: 'رحلة عبر الزمن', tEn: 'Journey Through Time', rAr: 'المفتاح السحري يفتح بوابة للماضي لعصر الديناصورات العشبية.', rEn: 'Transported to prehistoric wetlands, Biff stands beneath a gentle plant-eating Brachiosaurus.' },
  { tAr: 'حفلة الوداع', tEn: 'The Farewell Party', rAr: 'حفلة سعيدة مع الأصدقاء بمناسبة نهاية الفصل وتناول الكعك اللذيذ.', rEn: 'Draped in fairy lights, the family plays acoustic guitar and serves sweet lemon cupcakes.' }
];

// Raw definitions for CLIL Discover (20 units)
const CLIL_RAW = [
  { tAr: 'لماذا تمطر؟', tEn: 'Why do we have rain?', topic: 'العلوم', descAr: 'تعرف على التبخر والسحب وتكوّن قطرات المطر وسقوطها.', v: [{ w: 'evaporation', a: 'تبخر' }, { w: 'clouds', a: 'سحب' }] },
  { tAr: 'كيف تنمو النباتات؟', tEn: 'How do plants grow?', topic: 'العلوم', descAr: 'دور التربة والماء وضوء الشمس في رعاية بذور الزهور.', v: [{ w: 'sunlight', a: 'ضوء الشمس' }, { w: 'roots', a: 'جذور' }] },
  { tAr: 'أين تعيش الحيوانات؟', tEn: 'Where do animals live?', topic: 'العلوم', descAr: 'استكشف مواطن عيش الكائنات الحية من صحاري وغابات وأعماق مياه.', v: [{ w: 'habitat', a: 'موطن طبيعي' }, { w: 'forest', a: 'غابة' }] },
  { tAr: 'ما الذي يجعل السيارة تتحرك؟', tEn: 'What makes a car move?', topic: 'الفيزياء', descAr: 'كيف تولد المحركات الحركة عبر استهلاك الوقود وتدوير العجلات.', v: [{ w: 'engine', a: 'محرك' }, { w: 'wheels', a: 'عجلات' }] },
  { tAr: 'كيف يعمل جسم الإنسان؟', tEn: 'How does the human body work?', topic: 'الأحياء', descAr: 'تعلم كيف يقوم العقل والقلب والعضلات بتسيير حركات اليوم.', v: [{ w: 'heart', a: 'قلب' }, { w: 'brain', a: 'دماغ' }] },
  { tAr: 'لماذا يذوب الثلج؟', tEn: 'Why does ice melt?', topic: 'العلوم', descAr: 'سحر تفاعل جزيئات الماء الصلبة مع الحرارة لتتحول لسائل جاري.', v: [{ w: 'heat', a: 'حرارة' }, { w: 'melting', a: 'ذوبان' }] },
  { tAr: 'من بنى الأهرامات؟', tEn: 'Who built the pyramids?', topic: 'التاريخ', descAr: 'لمحة تاريخية عن بناة الأهرام العظماء وحضارتهم الفرعونية.', v: [{ w: 'ancient', a: 'قديم' }, { w: 'builder', a: 'بَنَّاء' }] },
  { tAr: 'كيف نصنع الورق؟', tEn: 'How is paper made?', topic: 'التكنولوجيا', descAr: 'معالجة أخشاب الغابات في المصانع لإنتاج أوراق الكتابة.', v: [{ w: 'factory', a: 'مصنع' }, { w: 'wood', a: 'خشب' }] },
  { tAr: 'أين تشرق الشمس؟', tEn: 'Where does the sun rise?', topic: 'الجغرافيا', descAr: 'دراسة دوران الأرض لمعرفة جهة الشرق وغروبها في الغرب.', v: [{ w: 'direction', a: 'اتجاه' }, { w: 'east', a: 'الشرق' }] },
  { tAr: 'ما هي البراكين؟', tEn: 'What are volcanoes?', topic: 'الجغرافيا', descAr: 'جبال نارية تقذف الصخور المنصهرة والحمم الملتهبة من الأرض.', v: [{ w: 'lava', a: 'حمم نارية' }, { w: 'eruption', a: 'ثوران بركاني' }] },
  { tAr: 'كيف يصل الصوت إلى أذني؟', tEn: 'How does sound reach my ear?', topic: 'الفيزياء', descAr: 'صناعة الاهتزازات السمعية لموجات في الهواء تلتقطها الأذن.', v: [{ w: 'vibration', a: 'اهتزاز' }, { w: 'waves', a: 'موجات' }] },
  { tAr: 'ماذا يأكل رواد الفضاء؟', tEn: 'What do astronauts eat?', topic: 'الفضاء', descAr: 'كيف يتناول الرواد طعاماً معلباً ومجففاً في بيئة منعدمة الجاذبية.', v: [{ w: 'astronaut', a: 'رائد فضاء' }, { w: 'gravity', a: 'جاذبية' }] },
  { tAr: 'لماذا نغسل أيدينا؟', tEn: 'Why do we wash our hands?', topic: 'الصحة', descAr: 'التخلص من الجراثيم والميكروبات عبر فرك اليدين بالماء والصابون.', v: [{ w: 'germs', a: 'جراثيم' }, { w: 'soap', a: 'صابون' }] },
  { tAr: 'كيف تطير الطائرة؟', tEn: 'How does an airplane fly?', topic: 'الفيزياء', descAr: 'دور الأجنحة الانسيابية ومحركات الدفع النفاثة في التغلب على الجاذبية.', v: [{ w: 'lift', a: 'قوة الرفع' }, { w: 'wings', a: 'أجنحة' }] },
  { tAr: 'ما هو قوس قزح؟', tEn: 'What is a rainbow?', topic: 'العلوم', descAr: 'تحلل أشعة الضوء الأبيض عبر قطرات المطر المعلقة لألوان الطيف السبعة.', v: [{ w: 'spectrum', a: 'طيف الألوان' }, { w: 'prism', a: 'منشور تحليل الضوء' }] },
  { tAr: 'أين يعيش البطريق؟', tEn: 'Where do penguins live?', topic: 'الجغرافيا', descAr: 'الحياة الفريدة للبطاريق في بيئة القطب الجنوبي الثلجية الباردة.', v: [{ w: 'polar', a: 'قطبي مائي' }, { w: 'ice', a: 'جليد' }] },
  { tAr: 'كيف يصنع العسل؟', tEn: 'How is honey made?', topic: 'العلوم', descAr: 'النحلات المجتهدات يجمعن رحيق الزهور البرية ليصنعن أحلى غذاء.', v: [{ w: 'nectar', a: 'رحيق الزهر' }, { w: 'honeycomb', a: 'قرص العسل' }] },
  { tAr: 'ما هي الدائرة؟ (الأشكال)', tEn: 'What is a circle?', topic: 'الرياضيات', descAr: 'دراسة الأشكال الهندسية مستديرة الحواف بلا زوايا أو حواف حادة.', v: [{ w: 'circle', a: 'دائرة' }, { w: 'shape', a: 'شكل هندسي' }] },
  { tAr: 'كيف نعرف الوقت؟', tEn: 'How do we tell time?', topic: 'التاريخ', descAr: 'تطور الساعات من شمسية وظلية حتى ساعات اليد الإلكترونية المعاصرة.', v: [{ w: 'second', a: 'ثانية' }, { w: 'clock', a: 'ساعة جدارية' }] },
  { tAr: 'لماذا توجد فصول السنة؟', tEn: 'Why do we have seasons?', topic: 'العلوم', descAr: 'دوران الأرض المائلة حول الشمس يمنحنا الشتاء والصيف والربيع والخريف.', v: [{ w: 'orbit', a: 'مسار فلكي' }, { w: 'tilt', a: 'ميلان محور الأرض' }] }
];

// Raw definitions for Values Stories (20 units)
const VALUES_RAW = [
  { valAr: 'مساعدة الآخرين', tEn: 'Helping Others', sAr: 'دان يسقط في الطريق، ويسارع رفيقه توني لمساعدته وجمع أشياءه بابتسامة.', sEn: 'Dan fell in the muddy soil. Sally ran to help him stand up, brushing off dirt and carrying his bag.' },
  { valAr: 'الصدق', tEn: 'Being Honest', sAr: 'ليو يكسر زهرية الوالدة بالخطأ، وبدلاً من إنكار ذلك يقر بالصدق فتنال الأمانة احترامها.', sEn: 'Leo broke Mum\'s ceramic vase. He immediately told her the truth, and she hugged him for being honest.' },
  { valAr: 'المشاركة', tEn: 'Sharing', sAr: 'سام يمتلك علبة تلوين كبيرة، يشارك الألوان الجميلة مع صديقه الذي نسي أدواته.', sEn: 'Max did not have any crayons. Sam split his colorful pencil box, making them both excited to color trees.' },
  { valAr: 'اللطف', tEn: 'Kindness', sAr: 'إنقاذ عصفور صغير سقط من عشه الأرضي وتقديم حبات القمح له حتى عودة أمه.', sEn: 'A baby bird was shivering. Tim made a warm small cotton box, feeding it seeds until it could fly.' },
  { valAr: 'الصبر', tEn: 'Patience', sAr: 'تارا تزرع بذر زهور وتهتم بيوميات نموها يومياً راضية بالصبر حتى تفتحت الزهور.', sEn: 'Tara watered her seeds for seven weeks patiently. At last, a gorgeous red rose blossomed.' },
  { valAr: 'الامتنان', tEn: 'Gratitude', sAr: 'كتابة رسائل شكر رقيقة لسائق الحافلة وجدتها لخدمة اليوم بكل سعادة وحب.', sEn: 'Joy created a lovely thank-you letter for the cleaning lady, making her smile with deep gratitude.' },
  { valAr: 'الشجاعة', tEn: 'Courage', sAr: 'التغلب على رهبة الحديث أمام طلاب المدرسة وإلقاء كلمة الصباح بثقة وقوة.', sEn: 'Ray was afraid to speak in the classroom. He took a bold deep breath and read his story smoothly.' },
  { valAr: 'الاحترام', tEn: 'Respect', sAr: 'الاستماع بإنصات وأدب لأحاديث الجد والجدة والحرص على عدم مقاطعة كلامهم.', sEn: 'Mia sat quietly, listening to grandfather\'s old stories without making noise or interrupting him.' },
  { valAr: 'العمل الجماعي', tEn: 'Teamwork', sAr: 'أربعة زملاء يتعاونون في حل أحجية صعبة وبناء قلعة كرتونية عملاقة بنجاح.', sEn: 'The homework puzzle was very large. Working together, four friends sorted and finished it in minutes.' },
  { valAr: 'الفضول وحب المعرفة', tEn: 'Curiosity', sAr: 'رصد مسارات نمل الحديقة بشغف واستكشاف أماكن جحورها ومخابئ طعامها.', sEn: 'Zayd keeps asking questions about space. He looks at science encyclopedias to find stars.' },
  { valAr: 'تحمل المسؤولية', tEn: 'Responsibility', sAr: 'ترتيب غرفة النوم والملابس وإطعام قطتك الصغيرة بانتظام يومي مشهود.', sEn: 'Mary takes responsibility by feeding her little white cat and tidying up her study desk.' },
  { valAr: 'تقبل الاختلاف', tEn: 'Accepting Differences', sAr: 'الترحيب بزميل جديد قادم من بلد أجنبي وتعليمه العربية ولعب الكرة معه.', sEn: 'A new boy from Spain joined classes. Liam introduced him to everyone, honoring his cool ways.' },
  { valAr: 'المرونة', tEn: 'Flexibility', sAr: 'هطول المطر يلغي رحلة خارجية، فيتحول الأصحاب للعب ألعاب لوحية ممتعة بداخل البيت.', sEn: 'Heavy rain cancelled the picnic. Instead of crying, the kids built an indoor card fortress happily.' },
  { valAr: 'التفاؤل', tEn: 'Optimism', sAr: 'خسارة مباراة الوداد بروح رياضية والتأكيد على التدرب بشكل أفضل لنيل الفوز.', sEn: 'Although the team lost the cup, Sam shouted that they will practice more and win next season.' },
  { valAr: 'الإيثار', tEn: 'Selflessness', sAr: 'حمل مظلة صغيرة تغلف أختك الصغرى من قطرات المطر وتحفظ كتبها من الرطوبة.', sEn: 'Luke had only one jacket. He wraps it around his sister in the cold, sacrificing his own comfort.' },
  { valAr: 'النظام', tEn: 'Being Organized', sAr: 'ترتيب دفاتر واجباتك الملونة بملفات مخصصة وحفظ أقلامك بالحقيبة مرتبة.', sEn: 'Rose arranges her textbooks carefully in her school backpack, storing pencils by height.' },
  { valAr: 'الطموح', tEn: 'Ambition', sAr: 'رسم مجسم طائرة وتأليف كتيب صغير حول حلم القيادة والرحلات الجوية الممتدة.', sEn: 'Mark drafts detailed engineering plans of small drones, aspiring to build clean energetic flyers.' },
  { valAr: 'الصداقة الحقيقية', tEn: 'True Friendship', sAr: 'مرافقة صديق مريض بالمنزل ومساعدته في فهم واجبات المدرسة ودروس الغيبة.', sEn: 'When Roy fell ill, Cole walked to his house daily to share lesson highlights and explain tasks.' },
  { valAr: 'الاعتذار', tEn: 'Apologizing', sAr: 'الاصطدام بقلعتك الورقية بالخطأ، والإسراع في قول "أنا أسف" ومساعدة رفيقك على إعادة البناء.', sEn: 'Billy accidentally split Jane\'s paper block. He smiled, said "I am sorry", and helped fix it.' },
  { valAr: 'الوفاء بالوعد', tEn: 'Keeping Promises', sAr: 'الوعد بسقاية نباتات الجيران وقت سفرهم، وإنجاز ذلك يومياً دون تقاعس.', sEn: 'Even in heavy thunder, Ken walked outside to feed his neighbor\'s bunnies as promised.' }
];

// Raw definitions for Project Time (20 projects)
const PROJECTS_RAW = [
  { outcome: 'poster', tAr: 'ملصق عن عائلتي', descAr: 'جمع صور أفراد عائلتك وكتابة مهنهم ورسائل حب رقيقة على ملصق ملون.' },
  { outcome: 'model', tAr: 'نموذج بركان ورقي', descAr: 'صناعة بركان ورقي ثلاثي الأبعاد وإضافة بيكربونات لتجربة فوران رائع.' },
  { outcome: 'video report', tAr: 'تقرير الطقس الأسبوعي', descAr: 'تسجيل مقطع تعريفي تصف فيه درجات حرارة الأسبوع باستخدام خرائط يدوية.' },
  { outcome: 'illustrated booklet', tAr: 'كتاب الوصفات المصورة', descAr: 'تحضير تجميعة لوصفات شطائر صحية وتزيين الصفحات برسوم فواكه وخضراوات.' },
  { outcome: 'map', tAr: 'خريطة حيوانات العالم', descAr: 'رسم خريطة قارات الأرض ووضع رموز للفهود والحيتان والبطاريق في أماكنها.' },
  { outcome: 'audio/video', tAr: 'تسجيل نشرة أخبار مدرسية', descAr: 'أداء دور مذيع تلفزيوني لإعلان أخبار رحلات المدرسة وإنجازات المتفوقين.' },
  { outcome: 'drawing', tAr: 'تصميم علم لدولة جديدة', descAr: 'تأليف قصة دولة خيالية وابتكار رموز لملابسها وعلم ملون يوافق رسالتها.' },
  { outcome: 'model', tAr: 'مجسم المجموعة الشمسية', descAr: 'تعليق كرات ملونة تمثل الكواكب وطبيعة مداراتها الدائرية حول الشمس.' },
  { outcome: 'brochure', tAr: 'دليل السفر لمدينتي', descAr: 'طي ورقة لصناعة كتيب للمتاحف والحدائق الجميلة لجذب سياح العالم.' },
  { outcome: 'plant booklet', tAr: 'حديقة نباتات مصغرة', descAr: 'جمع أوراق شجر برية مجففة ولصقها في دفتر مع كتابة أسمائها ومعلوماتها.' },
  { outcome: 'exhibition', tAr: 'متحف العائلة', descAr: 'عرض أغراض تاريخية لجدك وجدتك مع صياغة بطاقات شرح ليرتادها الأقارب.' },
  { outcome: 'photo album', tAr: 'ألبوم صور مع تعليقات', descAr: 'صياغة كتيب لذكريات رحلة الصيف مدموجاً بتعليقات حول ركوب الخيل والأكل.' },
  { outcome: 'puppet show', tAr: 'مسرحية دمى قصيرة', descAr: 'حبك حوار مسرحي بين الثعلب المشاكس والدجاجة الحكيمة وحركات الدمى.' },
  { outcome: 'diary story', tAr: 'يوميات حيوان أليف', descAr: 'تأليف مذكرات من وجهة نظر كلبك فلوبي يصف فيها حلم الركض والقرصان.' },
  { outcome: 'musical instrument', tAr: 'آلة موسيقية منزلية', descAr: 'صنع غيتار أو طبول باستخدام مطاط وعلب كارتون فارغة لإصدار إيقاعات.' },
  { outcome: 'paper clock', tAr: 'ساعة لتعليم الوقت', descAr: 'قص عقارب كرتونية قابلة للحركة للتحكم في قراءة الساعات والدقائق اليومية.' },
  { outcome: 'board game', tAr: 'لعبة لوحية من صنعك', descAr: 'تصميم مسار به مربعات ومكعب نرد وأسئلة ذكاء ليتنافس عليها الأصدقاء.' },
  { outcome: 'cardboard city', tAr: 'مدينة من الكرتون', descAr: 'تجميع علب الدواء الكرتونية لبناء الحي المدرسي وممرات السيارات والمشفى.' },
  { outcome: 'family tree', tAr: 'شجرة العائلة', descAr: 'تثبيت صور أجدادك وأقاربك بشكل متدرج يوضح صلة القرابة برسم الشجرة.' },
  { outcome: 'time capsule', tAr: 'كبسولة زمن', descAr: 'جمع رسائل وألعاب اليوم ودفنها في علبة مغلقة لتفتحها بعد خمس سنوات.' }
];

// Raw definitions for Grammar Friends (20 units)
const GRAMMAR_RAW = [
  {
    "id": "gram_001",
    "title_ar": "ما هو الفعل؟ (Action Words)",
    "title_en": "What is a Verb?",
    "dialogue": [
      { "speaker": "Mona", "english": "I jump. I run. What do you do?", "arabic": "أنا أقفز. أنا أركض. ماذا تفعل؟" },
      { "speaker": "Zaid", "english": "I read. I write. These are verbs!", "arabic": "أنا أقرأ. أنا أكتب. هذه أفعال!" }
    ],
    "practice": {
      "instructions_ar": "اختر الفعل المناسب:",
      "questions": [
        { "sentence": "I _____ with my legs.", "options": ["walk", "book"], "correct": "walk" },
        { "sentence": "She _____ a story.", "options": ["reads", "table"], "correct": "reads" }
      ]
    }
  },
  {
    "id": "gram_002",
    "title_ar": "ما هو الاسم؟ (Naming Words)",
    "title_en": "What is a Noun?",
    "dialogue": [
      { "speaker": "Mona", "english": "Look at the cat. The table is big.", "arabic": "انظر إلى القطة. الطاولة كبيرة." },
      { "speaker": "Zaid", "english": "Cat and table are nouns. They name things.", "arabic": "قطة وطاولة أسماء. تسمي الأشياء." }
    ],
    "practice": {
      "instructions_ar": "اختر الاسم من بين الكلمات:",
      "questions": [
        { "sentence": "The _____ is red.", "options": ["apple", "run"], "correct": "apple" },
        { "sentence": "_____ is a good student.", "options": ["Ali", "Sleep"], "correct": "Ali" }
      ]
    }
  },
  {
    "id": "gram_003",
    "title_ar": "أدوات التعريف: a, an, the",
    "title_en": "Articles: a, an, the",
    "dialogue": [
      { "speaker": "Zaid", "english": "I see a bird. It's an owl. The owl is white.", "arabic": "أرى طائراً. إنها بومة. البومة بيضاء." },
      { "speaker": "Mona", "english": "A for new, an before a/e/i/o/u, the for something we know.", "arabic": "A للجديد، an قبل الحروف المتحركة، the لشيء نعرفه." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ a أو an أو the:",
      "questions": [
        { "sentence": "I have ___ apple.", "options": ["a", "an"], "correct": "an" },
        { "sentence": "___ sun is hot.", "options": ["The", "A"], "correct": "The" }
      ]
    }
  },
  {
    "id": "gram_004",
    "title_ar": "المفرد والجمع: -s, -es",
    "title_en": "Singular and Plural",
    "dialogue": [
      { "speaker": "Mona", "english": "One cat. Two cats. One box. Two boxes.", "arabic": "قطة واحدة. قطتان. صندوق واحد. صندوقان." },
      { "speaker": "Zaid", "english": "Add -s or -es. Easy!", "arabic": "نضيف -s أو -es. سهل!" }
    ],
    "practice": {
      "instructions_ar": "اجعل الكلمة جمعاً:",
      "questions": [
        { "sentence": "One dog, two _____.", "options": ["dogs", "doges"], "correct": "dogs" },
        { "sentence": "One bus, three _____.", "options": ["buses", "buss"], "correct": "buses" }
      ]
    }
  },
  {
    "id": "gram_005",
    "title_ar": "الضمائر: I, you, he, she, it",
    "title_en": "Subject Pronouns",
    "dialogue": [
      { "speaker": "Zaid", "english": "I am Zaid. You are my friend. He is Ali. She is Mona.", "arabic": "أنا زيد. أنت صديقي. هو علي. هي منى." },
      { "speaker": "Mona", "english": "And it is our cat. We are happy!", "arabic": "وهي قطتنا. نحن سعداء!" }
    ],
    "practice": {
      "instructions_ar": "اختر الضمير الصحيح:",
      "questions": [
        { "sentence": "_____ am a student.", "options": ["I", "He"], "correct": "I" },
        { "sentence": "_____ is my mother.", "options": ["She", "You"], "correct": "She" }
      ]
    }
  },
  {
    "id": "gram_006",
    "title_ar": "ضمائر الملكية: my, your, his, her",
    "title_en": "Possessive Pronouns",
    "dialogue": [
      { "speaker": "Mona", "english": "This is my book. That is your pen.", "arabic": "هذا كتابي. ذاك قلمك." },
      { "speaker": "Zaid", "english": "His bag is blue. Her shoes are red.", "arabic": "حقيبته زرقاء. حذاؤها أحمر." }
    ],
    "practice": {
      "instructions_ar": "اختر ضمير الملكية الصحيح:",
      "questions": [
        { "sentence": "This is _____ pencil. (I)", "options": ["my", "your"], "correct": "my" },
        { "sentence": "Look at _____ hat. (she)", "options": ["her", "his"], "correct": "her" }
      ]
    }
  },
  {
    "id": "gram_007",
    "title_ar": "الفعل to be: am, is, are",
    "title_en": "Verb to be: am, is, are",
    "dialogue": [
      { "speaker": "Zaid", "english": "I am happy. You are kind. He is tall.", "arabic": "أنا سعيد. أنت لطيف. هو طويل." },
      { "speaker": "Mona", "english": "We are friends. They are here.", "arabic": "نحن أصدقاء. هم هنا." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ am, is, are:",
      "questions": [
        { "sentence": "I _____ a teacher.", "options": ["am", "is"], "correct": "am" },
        { "sentence": "They _____ in the garden.", "options": ["are", "is"], "correct": "are" }
      ]
    }
  },
  {
    "id": "gram_008",
    "title_ar": "الفعل to have: have, has",
    "title_en": "Verb to have",
    "dialogue": [
      { "speaker": "Mona", "english": "I have a cat. You have a dog.", "arabic": "أنا لدي قطة. أنت لديك كلب." },
      { "speaker": "Zaid", "english": "He has a bird. She has a fish.", "arabic": "هو لديه طائر. هي لديها سمكة." }
    ],
    "practice": {
      "instructions_ar": "اختر have أو has:",
      "questions": [
        { "sentence": "I _____ two brothers.", "options": ["have", "has"], "correct": "have" },
        { "sentence": "She _____ a new phone.", "options": ["has", "have"], "correct": "has" }
      ]
    }
  },
  {
    "id": "gram_009",
    "title_ar": "المضارع البسيط (I play)",
    "title_en": "Present Simple",
    "dialogue": [
      { "speaker": "Zaid", "english": "I play football every day. She plays tennis on Sunday.", "arabic": "ألعب كرة القدم كل يوم. هي تلعب تنس يوم الأحد." },
      { "speaker": "Mona", "english": "Add -s for he, she, it!", "arabic": "أضف -s لـ هو، هي، لغير العاقل!" }
    ],
    "practice": {
      "instructions_ar": "صحح الفعل بين القوسين:",
      "questions": [
        { "sentence": "He _____ (play) the piano.", "options": ["plays", "play"], "correct": "plays" },
        { "sentence": "They _____ (eat) lunch at 2.", "options": ["eat", "eats"], "correct": "eat" }
      ]
    }
  },
  {
    "id": "gram_010",
    "title_ar": "النفي في المضارع: don't, doesn't",
    "title_en": "Negatives: don't / doesn't",
    "dialogue": [
      { "speaker": "Mona", "english": "I don't like spiders. He doesn't like snakes.", "arabic": "أنا لا أحب العناكب. هو لا يحب الثعابين." },
      { "speaker": "Zaid", "english": "Don't for I/you/we/they. Doesn't for he/she/it.", "arabic": "Don't مع أنا/أنت/نحن/هم. Doesn't مع هو/هي." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ don't أو doesn't:",
      "questions": [
        { "sentence": "I _____ understand.", "options": ["don't", "doesn't"], "correct": "don't" },
        { "sentence": "She _____ eat meat.", "options": ["doesn't", "don't"], "correct": "doesn't" }
      ]
    }
  },
  {
    "id": "gram_011",
    "title_ar": "أسئلة نعم/لا: Do you...?",
    "title_en": "Yes/No Questions with Do",
    "dialogue": [
      { "speaker": "Zaid", "english": "Do you like ice cream? Yes, I do.", "arabic": "هل تحب الآيس كريم؟ نعم، أحب." },
      { "speaker": "Mona", "english": "Does he play chess? No, he doesn't.", "arabic": "هل يلعب الشطرنج؟ لا، لا يلعب." }
    ],
    "practice": {
      "instructions_ar": "أعد ترتيب السؤال:",
      "questions": [
        { "sentence": "you / Do / like / pizza ?", "options": ["Do you like pizza?", "You do like pizza?"], "correct": "Do you like pizza?" },
        { "sentence": "she / Does / speak / English ?", "options": ["Does she speak English?", "She does speak English?"], "correct": "Does she speak English?" }
      ]
    }
  },
  {
    "id": "gram_012",
    "title_ar": "أسئلة Wh-: What, Where, When",
    "title_en": "Wh- Questions",
    "dialogue": [
      { "speaker": "Mona", "english": "What is your name? Where are you from? When is your birthday?", "arabic": "ما اسمك؟ من أين أنت؟ متى عيد ميلادك؟" },
      { "speaker": "Zaid", "english": "My name is Zaid. I'm from Jordan. It's in June.", "arabic": "اسمي زيد. أنا من الأردن. إنه في يونيو." }
    ],
    "practice": {
      "instructions_ar": "اختر كلمة السؤال المناسبة:",
      "questions": [
        { "sentence": "_____ is your favorite color?", "options": ["What", "When"], "correct": "What" },
        { "sentence": "_____ is the school?", "options": ["Where", "What"], "correct": "Where" }
      ]
    }
  },
  {
    "id": "gram_013",
    "title_ar": "المضارع المستمر (I am eating)",
    "title_en": "Present Continuous",
    "dialogue": [
      { "speaker": "Zaid", "english": "I am eating now. She is reading a book. They are playing outside.", "arabic": "أنا آكل الآن. هي تقرأ كتاباً. هم يلعبون في الخارج." },
      { "speaker": "Mona", "english": "Am/is/are + verb-ing. It's happening now!", "arabic": "am/is/are + الفعل مع ing. إنه يحدث الآن!" }
    ],
    "practice": {
      "instructions_ar": "أكمل الفعل في الجملة:",
      "questions": [
        { "sentence": "Look! It _____ (rain).", "options": ["is raining", "rains"], "correct": "is raining" },
        { "sentence": "We _____ (study) English.", "options": ["are studying", "study"], "correct": "are studying" }
      ]
    }
  },
  {
    "id": "gram_014",
    "title_ar": "الماضي البسيط: was, were",
    "title_en": "Past Simple: was/were",
    "dialogue": [
      { "speaker": "Mona", "english": "Yesterday, I was at home. You were at school.", "arabic": "أمس، كنت في البيت. كنت في المدرسة." },
      { "speaker": "Zaid", "english": "He was tired. We were happy to meet.", "arabic": "هو كان متعباً. كنا سعداء بلقائنا." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ was أو were:",
      "questions": [
        { "sentence": "She _____ late for class.", "options": ["was", "were"], "correct": "was" },
        { "sentence": "They _____ at the park.", "options": ["were", "was"], "correct": "were" }
      ]
    }
  },
  {
    "id": "gram_015",
    "title_ar": "الماضي البسيط: -ed",
    "title_en": "Past Simple: -ed",
    "dialogue": [
      { "speaker": "Zaid", "english": "I walked to the shop. She watched a movie.", "arabic": "مشيت إلى المتجر. شاهدت فيلماً." },
      { "speaker": "Mona", "english": "Add -ed for past. If it ends with e, just add -d.", "arabic": "أضف -ed للماضي. إذا انتهت بـ e، أضف -d فقط." }
    ],
    "practice": {
      "instructions_ar": "حول الفعل إلى الماضي:",
      "questions": [
        { "sentence": "I _____ (play) football.", "options": ["played", "play"], "correct": "played" },
        { "sentence": "She _____ (like) the gift.", "options": ["liked", "likeed"], "correct": "liked" }
      ]
    }
  },
  {
    "id": "gram_016",
    "title_ar": "أفعال الماضي الشاذة",
    "title_en": "Irregular Past Verbs",
    "dialogue": [
      { "speaker": "Mona", "english": "Yesterday, I went to the zoo. I saw a lion. I ate an apple.", "arabic": "أمس، ذهبت إلى الحديقة. رأيت أسداً. أكلت تفاحة." },
      { "speaker": "Zaid", "english": "Go → went. See → saw. Eat → ate. We must memorize them.", "arabic": "يذهب → ذهب. يرى → رأى. يأكل → أكل. يجب أن نحفظها." }
    ],
    "practice": {
      "instructions_ar": "اختر صيغة الماضي الصحيحة:",
      "questions": [
        { "sentence": "She _____ (go) to the market.", "options": ["went", "goed"], "correct": "went" },
        { "sentence": "I _____ (see) a doctor.", "options": ["saw", "seed"], "correct": "saw" }
      ]
    }
  },
  {
    "id": "gram_017",
    "title_ar": "المستقبل: will, going to",
    "title_en": "Future: will / going to",
    "dialogue": [
      { "speaker": "Zaid", "english": "I will visit my grandma tomorrow. She is going to bake a cake.", "arabic": "سأزور جدتي غداً. ستخبز كعكة." },
      { "speaker": "Mona", "english": "Will for promises. Going to for plans.", "arabic": "Will للوعود. Going to للخطط." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ will أو going to:",
      "questions": [
        { "sentence": "I promise I _____ help you.", "options": ["will", "going to"], "correct": "will" },
        { "sentence": "Look at the clouds. It _____ rain.", "options": ["is going to", "will"], "correct": "is going to" }
      ]
    }
  },
  {
    "id": "gram_018",
    "title_ar": "أسماء الإشارة: this, that, these, those",
    "title_en": "Demonstratives",
    "dialogue": [
      { "speaker": "Mona", "english": "This book is here. That book is over there.", "arabic": "هذا الكتاب هنا. ذلك الكتاب هناك." },
      { "speaker": "Zaid", "english": "These are my pens. Those are your pencils.", "arabic": "هذه أقلامي. تلك أقلامك." }
    ],
    "practice": {
      "instructions_ar": "اختر اسم الإشارة المناسب:",
      "questions": [
        { "sentence": "_____ is my chair. (قريب)", "options": ["This", "That"], "correct": "This" },
        { "sentence": "_____ are my shoes over there. (بعيد)", "options": ["Those", "These"], "correct": "Those" }
      ]
    }
  },
  {
    "id": "gram_019",
    "title_ar": "الظروف: quickly, slowly, happily",
    "title_en": "Adverbs",
    "dialogue": [
      { "speaker": "Zaid", "english": "He runs quickly. She speaks slowly. They play happily.", "arabic": "هو يركض بسرعة. هي تتحدث ببطء. هم يلعبون بسعادة." },
      { "speaker": "Mona", "english": "Add -ly to the word. It describes the verb.", "arabic": "أضف -ly للكلمة. تصف الفعل." }
    ],
    "practice": {
      "instructions_ar": "أكمل الظرف المناسب:",
      "questions": [
        { "sentence": "She sings _____ (beautiful).", "options": ["beautifully", "beautiful"], "correct": "beautifully" },
        { "sentence": "He ate his food _____ (quick).", "options": ["quickly", "quick"], "correct": "quickly" }
      ]
    }
  },
  {
    "id": "gram_020",
    "title_ar": "حروف الجر: in, on, under, next to",
    "title_en": "Prepositions of Place",
    "dialogue": [
      { "speaker": "Mona", "english": "The cat is in the box. The book is on the table.", "arabic": "القطة في الصندوق. الكتاب على الطاولة." },
      { "speaker": "Zaid", "english": "My shoes are under the bed. The bank is next to the school.", "arabic": "حذائي تحت السرير. البنك بجانب المدرسة." }
    ],
    "practice": {
      "instructions_ar": "اختر حرف الجر الصحيح:",
      "questions": [
        { "sentence": "The pencil is _____ the desk.", "options": ["on", "under"], "correct": "on" },
        { "sentence": "The dog is sleeping _____ the table.", "options": ["under", "in"], "correct": "under" }
      ]
    }
  },
  {
    "id": "gram_021",
    "title_ar": "أسئلة Wh-: Why, Who, How",
    "title_en": "More Wh- Questions",
    "dialogue": [
      { "speaker": "Zaid", "english": "Why are you late? Who is that girl? How do you go to school?", "arabic": "لماذا تأخرت؟ من تلك الفتاة؟ كيف تذهب إلى المدرسة؟" },
      { "speaker": "Mona", "english": "Why = reason. Who = person. How = way.", "arabic": "Why = سبب. Who = شخص. How = طريقة." }
    ],
    "practice": {
      "instructions_ar": "اختر كلمة السؤال:",
      "questions": [
        { "sentence": "_____ is your best friend?", "options": ["Who", "Why"], "correct": "Who" },
        { "sentence": "_____ do you come to class?", "options": ["How", "What"], "correct": "How" }
      ]
    }
  },
  {
    "id": "gram_022",
    "title_ar": "There is / There are",
    "title_en": "There is / There are",
    "dialogue": [
      { "speaker": "Mona", "english": "There is a bird in the tree. There are two eggs in the nest.", "arabic": "يوجد طائر في الشجرة. توجد بيضتان في العش." },
      { "speaker": "Zaid", "english": "There is for one. There are for many.", "arabic": "There is للمفرد. There are للجمع." }
    ],
    "practice": {
      "instructions_ar": "اختر There is أو There are:",
      "questions": [
        { "sentence": "_____ a cat on the roof.", "options": ["There is", "There are"], "correct": "There is" },
        { "sentence": "_____ five students in class.", "options": ["There are", "There is"], "correct": "There are" }
      ]
    }
  },
  {
    "id": "gram_023",
    "title_ar": "Can / Can't للقدرة",
    "title_en": "Can / Can't for Ability",
    "dialogue": [
      { "speaker": "Zaid", "english": "I can swim. I can't fly.", "arabic": "أستطيع السباحة. لا أستطيع الطيران." },
      { "speaker": "Mona", "english": "Can you cook? Yes, I can. No, I can't.", "arabic": "هل تستطيع الطهي؟ نعم، أستطيع. لا، لا أستطيع." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ can أو can't:",
      "questions": [
        { "sentence": "Birds _____ fly.", "options": ["can", "can't"], "correct": "can" },
        { "sentence": "A baby _____ drive a car.", "options": ["can't", "can"], "correct": "can't" }
      ]
    }
  },
  {
    "id": "gram_024",
    "title_ar": "الأمر والنهي (Do / Don't)",
    "title_en": "Imperatives",
    "dialogue": [
      { "speaker": "Mona", "english": "Sit down. Open your book.", "arabic": "اجلس. افتح كتابك." },
      { "speaker": "Zaid", "english": "Don't run. Don't shout.", "arabic": "لا تركض. لا تصرخ." }
    ],
    "practice": {
      "instructions_ar": "أكمل الجملة:",
      "questions": [
        { "sentence": "_____ your hands before eating.", "options": ["Wash", "Don't wash"], "correct": "Wash" },
        { "sentence": "_____ on the grass.", "options": ["Don't walk", "Walk"], "correct": "Don't walk" }
      ]
    }
  },
  {
    "id": "gram_025",
    "title_ar": "ضمائر المفعول: me, him, her",
    "title_en": "Object Pronouns",
    "dialogue": [
      { "speaker": "Zaid", "english": "Give me the ball. I love her. Listen to him.", "arabic": "أعطني الكرة. أحبها. استمع إليه." },
      { "speaker": "Mona", "english": "Me, you, him, her, it, us, them. After the verb.", "arabic": "ياء المتكلم، كاف المخاطب، هاء الغائب... بعد الفعل." }
    ],
    "practice": {
      "instructions_ar": "اختر ضمير المفعول:",
      "questions": [
        { "sentence": "Call _____ (I) later.", "options": ["me", "I"], "correct": "me" },
        { "sentence": "I saw _____ (she) at the mall.", "options": ["her", "she"], "correct": "her" }
      ]
    }
  },
  {
    "id": "gram_026",
    "title_ar": "الفرق بين Some و Any",
    "title_en": "Some vs Any",
    "dialogue": [
      { "speaker": "Mona", "english": "I have some apples. Do you have any oranges?", "arabic": "لدي بعض التفاح. هل لديك أي برتقال؟" },
      { "speaker": "Zaid", "english": "Some for positive. Any for negative and questions.", "arabic": "Some في الجمل المثبتة. Any في النفي والسؤال." }
    ],
    "practice": {
      "instructions_ar": "أكمل بـ some أو any:",
      "questions": [
        { "sentence": "There are _____ flowers in the garden.", "options": ["some", "any"], "correct": "some" },
        { "sentence": "I don't have _____ money.", "options": ["any", "some"], "correct": "any" }
      ]
    }
  },
  {
    "id": "gram_027",
    "title_ar": "أدوات المقارنة: bigger, smaller",
    "title_en": "Comparatives",
    "dialogue": [
      { "speaker": "Zaid", "english": "My house is bigger than yours. This cat is smaller than that dog.", "arabic": "بيتي أكبر من بيتك. هذه القطة أصغر من ذلك الكلب." },
      { "speaker": "Mona", "english": "Add -er for short words. Use 'more' for long words.", "arabic": "أضف -er للكلمات القصيرة. استخدم 'more' للكلمات الطويلة." }
    ],
    "practice": {
      "instructions_ar": "أكمل المقارنة:",
      "questions": [
        { "sentence": "An elephant is _____ (big) than a mouse.", "options": ["bigger", "more big"], "correct": "bigger" },
        { "sentence": "This book is _____ (interesting) than that one.", "options": ["more interesting", "interestinger"], "correct": "more interesting" }
      ]
    }
  },
  {
    "id": "gram_028",
    "title_ar": "أدوات التفوق: the biggest, the best",
    "title_en": "Superlatives",
    "dialogue": [
      { "speaker": "Mona", "english": "He is the tallest in the class. This is the most beautiful flower.", "arabic": "هو الأطول في الصف. هذه أجمل زهرة." },
      { "speaker": "Zaid", "english": "Add -est or use 'the most'. Irregular: good → best, bad → worst.", "arabic": "أضف -est أو استخدم 'the most'. الشاذ: جيد → الأفضل، سيء → الأسوأ." }
    ],
    "practice": {
      "instructions_ar": "أكمل صيغة التفضيل:",
      "questions": [
        { "sentence": "She is the _____ (smart) student.", "options": ["smartest", "most smart"], "correct": "smartest" },
        { "sentence": "This is the _____ (good) day ever!", "options": ["best", "goodest"], "correct": "best" }
      ]
    }
  },
  {
    "id": "gram_029",
    "title_ar": "ادوات التكرار: always, sometimes, never",
    "title_en": "Adverbs of Frequency",
    "dialogue": [
      { "speaker": "Zaid", "english": "I always brush my teeth. She sometimes eats cake. He never smokes.", "arabic": "أنا دائماً أنظف أسناني. هي أحياناً تأكل كعكة. هو لا يدخن أبداً." },
      { "speaker": "Mona", "english": "Always 100%, sometimes 50%, never 0%.", "arabic": "دائماً 100%، أحياناً 50%، أبداً 0%." }
    ],
    "practice": {
      "instructions_ar": "اختر ظرف التكرار المناسب للجملة:",
      "questions": [
        { "sentence": "The sun _____ rises in the east.", "options": ["always", "sometimes"], "correct": "always" },
        { "sentence": "I _____ eat spicy food. I don't like it.", "options": ["never", "always"], "correct": "never" }
      ]
    }
  },
  {
    "id": "gram_030",
    "title_ar": "مراجعة الأزمنة الثلاثة",
    "title_en": "Review of Three Tenses",
    "dialogue": [
      { "speaker": "Mona", "english": "I eat (present). I ate (past). I will eat (future).", "arabic": "أنا آكل (مضارع). أكلت (ماضي). سآكل (مستقبل)." },
      { "speaker": "Zaid", "english": "Three times: now, before, later.", "arabic": "ثلاثة أزمنة: الآن، قبل، لاحقاً." }
    ],
    "practice": {
      "instructions_ar": "ضع الفعل في الزمن الصحيح:",
      "questions": [
        { "sentence": "Yesterday, I _____ (watch) TV.", "options": ["watched", "watch"], "correct": "watched" },
        { "sentence": "Tomorrow, I _____ (visit) my friend.", "options": ["will visit", "visited"], "correct": "will visit" },
        { "sentence": "Every day, she _____ (read) a book.", "options": ["reads", "read"], "correct": "reads" }
      ]
    }
  }
];

// Raw definitions for Everyday English (20 units)
const EVERYDAY_RAW = [
  { tAr: 'التحية والتعارف', tEn: 'Greetings', v: [{ w: 'Hello', a: 'مرحباً' }, { w: 'Nice to meet you', a: 'سررت بلقائك' }], q: "What is the polite reply to 'How are you?'", o: ['I am fine, thank you.', 'Goodbye.', 'Yes please.'], c: 'I am fine, thank you.' },
  { tAr: 'في البقالة', tEn: 'At the Grocery Store', v: [{ w: 'How much', a: 'بكم السعر' }, { w: 'fresh apple', a: ' تفاح طازج' }], q: "You want grocery prices. You say: ________ is this?", o: ['How much', 'Where', 'What time'], c: 'How much' },
  { tAr: 'عند الطبيب', tEn: 'At the Doctor\'s', v: [{ w: 'sore throat', a: 'احتقان الحلق' }, { w: 'medicine', a: 'عمر دواء' }], q: "What does a doctor write down for medicine?", o: ['prescription', 'ticket', 'menu'], c: 'prescription' },
  { tAr: 'في محطة القطار', tEn: 'At the Train Station', v: [{ w: 'platform', a: 'رصيف المغادرة' }, { w: 'ticket office', a: 'مكتب التذاكر' }], q: "Where do passengers wait to board the train?", o: ['platform', 'classroom', 'kitchen'], c: 'platform' },
  { tAr: 'في المقهى', tEn: 'At the Café', v: [{ w: 'hot coffee', a: 'قهوة ساخنة' }, { w: 'sugar', a: 'مكعبات سكر' }], q: "You order food. You say: 'I ________ a hot coffee, please.'", o: ['would like', 'am', 'run'], c: 'would like' },
  { tAr: 'حجز موعد', tEn: 'Booking an Appointment', v: [{ w: 'schedule', a: 'جدول مواعيد' }, { w: 'available', a: 'متاح للزيارة' }], q: "Would you like to ________ an appointment for 3 PM?", o: ['book', 'buy', 'sing'], c: 'book' },
  { tAr: 'وصف الطريق', tEn: 'Giving Directions', v: [{ w: 'turn left', a: 'انعطف يساراً' }, { w: 'go straight', a: 'تابع للأمام' }], q: "To direct someone to change streets, you say: '________ left.'", o: ['Turn', 'Walk', 'Stop'], c: 'Turn' },
  { tAr: 'على الهاتف', v: [{ w: 'speaking', a: 'يتحدث' }, { w: 'who is calling', a: 'من المتصل' }], tEn: 'On the Phone', q: "When answering, you say: 'Hello, this is Toby ________.'", o: ['speaking', 'talking', 'listening'], c: 'speaking' },
  { tAr: 'كتابة رسالة شكر', tEn: 'Writing a Thank-You Note', v: [{ w: 'kindness', a: 'لطف معروفي' }, { w: 'grateful', a: 'شاكر/ممتن' }], q: "Start a thank-you note with: '________ Biff, thank you.'", o: ['Dear', 'Bye', 'From'], c: 'Dear' },
  { tAr: 'دعوة الأصدقاء', tEn: 'Inviting Friends', v: [{ w: 'party invitation', a: 'دعوة للحفلة' }, { w: 'join us', a: 'تشارك معنا' }], q: "To invite someone, say: 'Would you like to ________ our dinner?'", o: ['join', 'break', 'lose'], c: 'join' },
  { tAr: 'الحديث عن العائلة', tEn: 'Talking About Family', v: [{ w: 'parents', a: 'الوالدان' }, { w: 'relatives', a: 'الأقارب' }], q: "My father and mother are called my ________.", o: ['parents', 'children', 'brothers'], c: 'parents' },
  { tAr: 'التعبير عن المشاعر', tEn: 'Expressing Feelings', v: [{ w: 'excited', a: 'متحمس جداً' }, { w: 'relaxed', a: 'مسترخٍ هادى' }], q: "How do you feel when you win a gold medal?", o: ['excited', 'sad', 'tired'], c: 'excited' },
  { tAr: 'في المطار', tEn: 'At the Airport', v: [{ w: 'boarding pass', a: 'بطاقة الصعود' }, { w: 'luggage', a: 'حقائب السفر' }], q: "Where do you check in your large travel suitcases?", o: ['luggage desk', 'café', 'taxi list'], c: 'luggage desk' },
  { tAr: 'شراء التذاكر', tEn: 'Buying Tickets', v: [{ w: 'one-way ticket', a: 'تذكرة ذهاب فقط' }, { w: 'return ticket', a: 'تذكرة عودة' }], q: "A ticket to go and come back is a ________ ticket.", o: ['return', 'single', 'free'], c: 'return' },
  { tAr: 'طلب المساعدة', tEn: 'Asking for Help', v: [{ w: 'excuse me', a: 'معذرةً' }, { w: 'assist', a: 'يساند/يساعد' }], q: "To ask stranger politely, start with: '________, can you assist me?'", o: ['Excuse me', 'Hey', 'Listen'], c: 'Excuse me' },
  { tAr: 'الحديث عن الروتين', tEn: 'Talking About Routines', v: [{ w: 'wake up', a: 'يستيقظ' }, { w: 'brush teeth', a: 'ينظف الأسنان' }], q: "Every night before sleeping, I always ________ my teeth.", o: ['brush', 'wash', 'drink'], c: 'brush' },
  { tAr: 'وصف شخص', tEn: 'Describing a Person', v: [{ w: 'tall', a: 'طويل القامة' }, { w: 'cheerful', a: 'بشوش/مبهج' }], q: "The girl is always laughing and smiling. She is ________.", o: ['cheerful', 'angry', 'scared'], c: 'cheerful' },
  { tAr: 'طلب الطعام', tEn: 'Ordering Food', v: [{ w: 'menu', a: 'قائمة الأطعمة' }, { w: 'beverage', a: 'المشروع السائل' }], q: "What list do you look at to select your food?", o: ['menu', 'bill', 'receipt'], c: 'menu' },
  { tAr: 'الحديث عن الطقس', tEn: 'Talking About Weather', v: [{ w: 'forecast', a: 'نشرة التوقعات' }, { w: 'breeze', a: 'نسيم عليل' }], q: "The morning has safe winds. There is a sweet ________.", o: ['breeze', 'blizzard', 'storm'], c: 'breeze' },
  { tAr: 'قول وداعاً', tEn: 'Saying Goodbye', v: [{ w: 'see you later', a: 'أراك لاحقاً' }, { w: 'take care', a: 'انتبه لنفسك' }], q: "What do citizens say when leaving?", o: ['Goodbye', 'Good morning', 'Hello'], c: 'Goodbye' }
];

const padNum = (n: number) => String(n).padStart(3, '0');

export const OXFORD_LESSONS: OxfordUnit[] = [
  // Expand Phonics Heroes (IDs phonics_001 - phonics_020)
  ...PHONICS_RAW.map((p, idx): OxfordUnit => ({
    id: `phonics_${padNum(idx + 1)}`,
    category: 'phonics_heroes',
    titleEn: `Phonics ${idx + 1}: Vowel and Letter ${p.alphabet}`,
    titleAr: `أبطال الصوتيات ${idx + 1}: ${p.focus}`,
    descriptionEn: `Practice sounds for: ${p.alphabet} with illustrated activities.`,
    descriptionAr: `أتقن نطق وصوت الحرف: ${p.alphabet} عبر تفاعلات صوتية مميزة.`,
    color: COLORS.phonics_heroes.bg,
    lightColor: COLORS.phonics_heroes.light,
    bigQuestion: `How do we pronounce the sounds of ${p.alphabet}?`,
    bigQuestionAr: `كيف ننطق مخارج الأصوات الخاصة بـ ${p.alphabet}؟`,
    vocab: p.val.map((v, i) => ({ id: i + 1, word: v.s, ar: v.a, img: v.i })),
    quiz: [
      { id: 1, question: `Which vocabulary contains the key focus sound '${p.alphabet.split(',')[0].trim()}'?`, options: p.val.map(x => x.s), correct: p.val[0].s }
    ]
  })),

  // Expand Oxford Reading Adventures (IDs ort_001 - ort_020)
  ...READING_RAW.map((r, idx): OxfordUnit => {
    const defaultImg = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400';
    return {
      id: `ort_${padNum(idx + 1)}`,
      category: 'oxford_reading_adventures',
      titleEn: `Reading Lvl ${Math.floor(idx / 4) + 1}: ${r.tEn}`,
      titleAr: `مغامرات القراءة: ${r.tAr}`,
      descriptionEn: `Read-along the classic Oxford graded adventure: ${r.tEn}.`,
      descriptionAr: `${r.rAr}`,
      color: COLORS.oxford_reading_adventures.bg,
      lightColor: COLORS.oxford_reading_adventures.light,
      isReadingLesson: true,
      reading: {
        title: r.tEn,
        text: r.rEn,
        audioSource: "reading"
      },
      vocab: [
        { id: 1, word: r.tEn.split(' ')[0], ar: r.tAr.split(' ')[0], img: defaultImg }
      ],
      comprehension: [
        { id: 1, question: `What is the story of '${r.tEn}' primarily about?`, options: [r.tEn, 'Nothing', 'A doctor'], correct: r.tEn }
      ],
      quiz: [
        { id: 1, question: `Complete the sentence based on the story adventure: "${r.rEn.slice(0, 40)}..."`, options: [r.tEn.split(' ')[0], 'ocean', 'something'], correct: r.tEn.split(' ')[0] }
      ]
    };
  }),

  // Expand CLIL Discover (IDs clil_001 - clil_020)
  ...CLIL_RAW.map((c, idx): OxfordUnit => ({
    id: `clil_${padNum(idx + 1)}`,
    category: 'clil_discover',
    titleEn: `CLIL ${idx + 1}: ${c.tEn}`,
    titleAr: `أكسفورد ديسكفر: ${c.tAr}`,
    descriptionEn: `Learn about ${c.topic} in English through interactive exploration.`,
    descriptionAr: `تعلم مادة ${c.topic} باللغة الإنجليزية: ${c.descAr}`,
    color: COLORS.clil_discover.bg,
    lightColor: COLORS.clil_discover.light,
    bigQuestion: c.tEn,
    bigQuestionAr: `لماذا وكيف: ${c.tAr}؟`,
    vocab: c.v.map((item, i) => ({ id: i + 1, word: item.w, ar: item.a, img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400' })),
    quiz: [
      { id: 1, question: `What is the primary scientific term for '${c.v[0].a}'?`, options: c.v.map(term => term.w), correct: c.v[0].w }
    ]
  })),

  // Expand Values Stories (IDs val_001 - val_020)
  ...VALUES_RAW.map((v, idx): OxfordUnit => ({
    id: `val_${padNum(idx + 1)}`,
    category: 'values_stories',
    titleEn: `Value: ${v.tEn}`,
    titleAr: `قصة قيمة: ${v.valAr}`,
    descriptionEn: `Read an educational story about ${v.tEn} from Family & Friends.`,
    descriptionAr: `قصة قصيرة لغرس السلوك الأخلاقي القويم: ${v.valAr}`,
    color: COLORS.values_stories.bg,
    lightColor: COLORS.values_stories.light,
    isReadingLesson: true,
    reading: {
      title: v.tEn,
      text: v.sEn,
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: v.tEn, ar: v.valAr, img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400' }
    ],
    comprehension: [
      { id: 1, question: `Which positive human value does this story promote?`, options: [v.tEn, 'Selfishness', 'Anger'], correct: v.tEn }
    ],
    quiz: [
      { id: 1, question: `By following the story of ${v.tEn}, we learn to be ________.`, options: [v.tEn, 'mean', 'lazy'], correct: v.tEn }
    ]
  })),

  // Expand Project Time (IDs proj_001 - proj_020)
  ...PROJECTS_RAW.map((p, idx): OxfordUnit => ({
    id: `proj_${padNum(idx + 1)}`,
    category: 'project_time',
    titleEn: `Weekly Project: ${p.tAr.replace('ملصق عن عائلتي', 'Family Poster').replace('نموذج بركان ورقي', 'Paper Volcano')}`,
    titleAr: `ساعة المشروع: ${p.tAr}`,
    descriptionEn: `Create your weekly physical project: ${p.outcome}.`,
    descriptionAr: `صمم مشروعك الأسبوعي الثنائي اللغات لتنمية الابتكار: ${p.descAr}`,
    color: COLORS.project_time.bg,
    lightColor: COLORS.project_time.light,
    bigQuestion: `How do we construct a ${p.outcome}?`,
    bigQuestionAr: `كيف نصنع ونقيم نموذج لـ ${p.tAr}؟`,
    vocab: [
      { id: 1, word: p.outcome, ar: p.outcome === 'poster' ? 'ملصق' : 'نموذج', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400' }
    ],
    quiz: [
      { id: 1, question: `What is the expected physical learning outcome of this project?`, options: [p.outcome, 'sleeping', 'nothing'], correct: p.outcome }
    ]
  })),

  // Expand Grammar Friends (IDs gram_001 - gram_030)
  ...GRAMMAR_RAW.map((g): OxfordUnit => ({
    id: g.id,
    category: 'grammar_friends',
    titleEn: g.title_en,
    titleAr: g.title_ar,
    descriptionEn: `Learn about ${g.title_en} with interactive dialogue roleplay and practice.`,
    descriptionAr: `تعلم قصة القواعد والتمارين التفاعلية لـ ${g.title_ar}`,
    color: COLORS.grammar_friends.bg,
    lightColor: COLORS.grammar_friends.light,
    bigQuestion: g.title_en,
    bigQuestionAr: g.title_ar,
    vocab: [
      { id: 1, word: g.dialogue[0].english.split(' ').slice(0, 2).join(' '), ar: g.dialogue[0].arabic.split(' ').slice(0, 2).join(' '), img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400' }
    ],
    quiz: g.practice.questions.map((q, qIdx) => ({
      id: qIdx + 1,
      question: q.sentence,
      options: q.options,
      correct: q.correct,
      img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
    })),
    dialogue: g.dialogue,
    practice: g.practice
  })),

  // Expand Everyday English (IDs every_001 - every_020)
  ...EVERYDAY_RAW.map((e, idx): OxfordUnit => ({
    id: `every_${padNum(idx + 1)}`,
    category: 'everyday_english',
    titleEn: `Everyday English: ${e.tEn}`,
    titleAr: `الإنجليزية اليومية: ${e.tAr}`,
    descriptionEn: `Talk with confidence in daily situations like: ${e.tEn}.`,
    descriptionAr: `تدريبات تفاعلية للمحادثة وطلاقة التحدث في: ${e.tAr}`,
    color: COLORS.everyday_english.bg,
    lightColor: COLORS.everyday_english.light,
    bigQuestion: `How do we communicate in the context of '${e.tEn}'?`,
    bigQuestionAr: `كيف نتحدث بلباقة وثقة في موقف '${e.tAr}'؟`,
    vocab: e.v.map((item, i) => ({ id: i + 1, word: item.w, ar: item.a, img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400' })),
    quiz: [
      { id: 1, question: e.q, options: e.o, correct: e.c }
    ]
  }))
];
