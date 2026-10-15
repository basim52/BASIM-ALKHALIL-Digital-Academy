/** Pronunciation — Level 1: 30 lessons on the sounds Arabic speakers find hardest. Real, hand-written content. */
export interface SaraPronExercise { promptAr: string; /** Sara plays this first (cloud voice). */ play?: string; options: string[]; correctIndex: number }
export interface SaraPronLesson {
  id: string; order: number; levelId: 'a' | 'b' | 'c' | 'd'; titleAr: string; titleEn: string;
  ideaAr: string;
  /** Minimal pairs (tap each word to hear it). */
  pairs?: [string, string][];
  /** Example words when the lesson is not about pairs. */
  words?: string[];
  /** The student says this into the mic. */
  sayEn: string;
  exercises: SaraPronExercise[];
}

type Raw = [titleAr: string, titleEn: string, ideaAr: string, pairsOrWords: [string, string][] | string[], sayEn: string, ex?: SaraPronExercise[]];

/** "Which word did you hear?" from the pairs: alternates first/second word so the answer is not always the same slot. */
const pairExercises = (pairs: [string, string][]): SaraPronExercise[] =>
  pairs.map((p, i) => {
    const play = p[(i + 1) % 2];
    const options = i % 2 ? [p[1], p[0]] : [p[0], p[1]];
    return { promptAr: 'اسمع سارة: أي كلمة قالت؟', play, options, correctIndex: options.indexOf(play) };
  });

/** Level-2 options are authored correct-first; rotate so the answer moves between slots. */
const rotate = (e: SaraPronExercise, k: number): SaraPronExercise => {
  const n = e.options.length, r = k % n;
  const options = e.options.map((_, j) => e.options[(j - r + n) % n]);
  return { ...e, options, correctIndex: (e.correctIndex + r) % n };
};

const RAW: Raw[] = [
  ['P و B في أول الكلمة', 'P vs B (start)', 'العربي ما فيه حرف P، فنقولها B. الفرق: P بدون صوت من الحنجرة ومعها نفخة هوا. حط يدك قدام فمك: مع pin تحس بالهوا، ومع bin ما تحس.', [['pin', 'bin'], ['pack', 'back'], ['pear', 'bear']], 'Put the paper in the bin.'],
  ['P و B في آخر الكلمة', 'P vs B (end)', 'في آخر الكلمة سكّر شفايفك بقوة مع P بدون صوت، ومع B خلّ الصوت يطلع من حلقك. الخطأ هنا يغيّر المعنى: cap قبعة، و cab تاكسي.', [['cap', 'cab'], ['rope', 'robe'], ['lap', 'lab']], 'Please stop the cab.'],
  ['F و V', 'F vs V', 'الاثنين: أسنانك العليا على شفتك السفلى. F هوا بس مثل «ف»، و V نفس المكان لكن مع اهتزاز في الحلق. حط إصبعك على رقبتك: مع V تحس برجفة.', [['fan', 'van'], ['fine', 'vine'], ['few', 'view']], 'I have a very fine view.'],
  ['V و W', 'V vs W', 'V أسنان على الشفة، و W ما فيها أسنان أبد: دوّر شفايفك مثل «و». لا تقول west وأنت تقصد vest.', [['vest', 'west'], ['vine', 'wine'], ['verse', 'worse']], 'We visit very old villages.'],
  ['TH الهامسة (ث)', 'Voiceless TH', 'th في think تنطق مثل «ث» بالضبط: طرف لسانك بين أسنانك وطلّع هوا. لا تقولها «s» ولا «t»، لأن think تصير sink.', [['think', 'sink'], ['thank', 'tank'], ['three', 'tree']], 'Thank you for the three thick books.'],
  ['TH المجهورة (ذ)', 'Voiced TH', 'th في this و they تنطق مثل «ذ»: نفس مكان «ث» لكن مع صوت. لا تقولها «د» ولا «ز»، لأن they تصير day.', [['they', 'day'], ['then', 'den'], ['those', 'doze']], 'This is the other brother.'],
  ['TH في آخر الكلمة', 'Final TH', 'في آخر الكلمة طلّع لسانك شوي مع th. mouth (فم) غير mouse (فأر)، و path (طريق) غير pass.', [['mouth', 'mouse'], ['path', 'pass'], ['faith', 'face']], 'Brush your teeth after a bath.'],
  ['CH و SH', 'CH vs SH', 'sh مثل «ش» صوت طويل، و ch مثل «تش» تبدأ بسدّة سريعة. chip رقاقة، و ship سفينة.', [['chip', 'ship'], ['chair', 'share'], ['watch', 'wash']], 'Wash the dishes and watch the chicken.'],
  ['i القصيرة و ee الطويلة', 'Short i vs long ee', 'ee في sheep طويلة مثل «ـيـ» ممدودة، وشفايفك مبتسمة. i في ship قصيرة ومرتخية، بين «إ» و«ي». sit تجلس، و seat مقعد.', [['ship', 'sheep'], ['live', 'leave'], ['sit', 'seat']], 'Please sit in this seat.'],
  ['e و a', 'E vs A (bed/bad)', 'e في bed مثل «إ» مفتوحة شوي. a في bad فمك ينفتح أكثر وفكك ينزل، صوت بين «آ» و«إ». men رجال، و man رجل.', [['bed', 'bad'], ['pen', 'pan'], ['men', 'man']], 'The man has a red bag.'],
  ['u في cup و a في cap', 'U vs A (cup/cap)', 'u في cup صوت قصير مثل «أَ» من وسط الفم وفمك مرتخي. a في cap الفك ينزل أكثر. لا تقرأ u مثل «و».', [['cup', 'cap'], ['hut', 'hat'], ['bug', 'bag']], 'My uncle has a cup of tea.'],
  ['o في hot و u في hut', 'O vs U (hot/hut)', 'o في hot (بريطاني) فمك مدوّر ومفتوح مثل «أو» قصيرة. u في hut مرتخي بدون تدوير.', [['hot', 'hut'], ['cot', 'cut'], ['dog', 'dug']], 'The dog is not hungry.'],
  ['oo القصيرة والطويلة', 'Short vs long OO', 'oo في fool طويلة والشفايف مدوّرة قدام. u في full قصيرة ومرتخية. pull تسحب، و pool مسبح.', [['full', 'fool'], ['pull', 'pool'], ['look', 'Luke']], 'Look at the full moon.'],
  ['a في late و e في let', 'Long A vs E', 'a في late صوتين يتزحلقون «إي»، أطول من e في let. wait تنتظر، و wet مبلول.', [['late', 'let'], ['wait', 'wet'], ['pain', 'pen']], 'Wait, the paint is wet.'],
  ['o في coat و aw في caught', 'OA vs AW', 'oa في coat صوت يتزحلق «أو» والشفايف تتدوّر في آخره. aught في caught صوت واحد طويل مفتوح بدون تزحلق.', [['coat', 'caught'], ['low', 'law'], ['boat', 'bought']], 'I bought a warm coat.'],
  ['R و L', 'R vs L', 'R الإنجليزية ما تلمس فيها سقف الفم ولا ترجّها مثل «ر» العربية؛ لسانك يرجع لورا شوي. L طرف لسانك يلمس ورا أسنانك العليا.', [['right', 'light'], ['rice', 'lice'], ['fry', 'fly']], 'Turn right at the red light.'],
  ['الحروف المتتابعة في البداية', 'Initial clusters', 'العربي ما يبدأ بساكنين، فنقول «إسبورت» أو «سبورت» بحركة بينهم. في الإنجليزي ابدأ مباشرة بالحرفين: sport مو «إسبورت». ولو حطيت حركة بينهم تتغير الكلمة: blow تصير below.', [['sport', 'support'], ['blow', 'below'], ['prayed', 'parade']], 'Stop! The street is wet.'],
  ['الحروف المتتابعة في النهاية', 'Final clusters', 'في آخر الكلمة لا تحذف الحرف الأخير ولا تزيد حركة: asked تنطق «آسكت» بسرعة، و desks تنتهي بـ «سكس». الحرف الأخير يغيّر المعنى.', [['ask', 'asked'], ['desk', 'desks'], ['test', 'tests']], 'She asked for two desks.'],
  ['نهاية ed', '-ed endings', 'ed لها ثلاث نطقات: بعد t أو d تنطق «إد» (wanted). بعد الأصوات الهامسة مثل k و p و s و sh و ch تنطق «ت» (walked). وباقي الحالات «د» (played). لا تقول «ووكيد».', [['walk', 'walked'], ['play', 'played'], ['want', 'wanted']], 'I wanted to call, but I walked home.',
    [{ promptAr: 'كيف تنطق ed في walked؟', play: 'walked', options: ['t', 'd', 'id'], correctIndex: 0 },
     { promptAr: 'كيف تنطق ed في played؟', play: 'played', options: ['t', 'd', 'id'], correctIndex: 1 },
     { promptAr: 'كيف تنطق ed في wanted؟', play: 'wanted', options: ['t', 'd', 'id'], correctIndex: 2 }]],
  ['نهاية s', '-s endings', 's في الجمع لها ثلاث نطقات: بعد الأصوات الهامسة «س» (cats). بعد الأصوات المجهورة «ز» (bags). وبعد s و x و sh و ch تنطق «إز» (boxes).', [['cat', 'cats'], ['bag', 'bags'], ['box', 'boxes']], 'My friend likes cats and dogs.',
    [{ promptAr: 'كيف تنطق s في cats؟', play: 'cats', options: ['s', 'z', 'iz'], correctIndex: 0 },
     { promptAr: 'كيف تنطق s في bags؟', play: 'bags', options: ['s', 'z', 'iz'], correctIndex: 1 },
     { promptAr: 'كيف تنطق es في boxes؟', play: 'boxes', options: ['s', 'z', 'iz'], correctIndex: 2 }]],
  ['الحروف الصامتة K و W', 'Silent K & W', 'kn في أول الكلمة: k ما تنطق (knife «نايف»). wr في أول الكلمة: w ما تنطق (write «رايت»). العربي يقرأ كل حرف، والإنجليزي لا.', ['knife', 'know', 'knee', 'write', 'wrong'], 'I know how to write a letter.',
    [{ promptAr: 'أي حرف ما ينطق في knife؟', play: 'knife', options: ['k', 'n', 'f'], correctIndex: 0 },
     { promptAr: 'أي حرف ما ينطق في write؟', play: 'write', options: ['w', 'r', 't'], correctIndex: 0 },
     { promptAr: 'knee تنطق مثل:', play: 'knee', options: ['«ني»', '«كني»', '«كيني»'], correctIndex: 0 }]],
  ['الحروف الصامتة B و L و T', 'Silent B, L & T', 'mb في الآخر: b ما تنطق (climb «كلايم»). l ما تنطق في talk و walk و half. t ما تنطق في listen و castle.', ['climb', 'comb', 'talk', 'walk', 'listen', 'castle'], 'Listen and walk to the castle.',
    [{ promptAr: 'أي حرف ما ينطق في climb؟', play: 'climb', options: ['b', 'm', 'c'], correctIndex: 0 },
     { promptAr: 'أي حرف ما ينطق في talk؟', play: 'talk', options: ['l', 'k', 't'], correctIndex: 0 },
     { promptAr: 'أي حرف ما ينطق في listen؟', play: 'listen', options: ['t', 's', 'n'], correctIndex: 0 }]],
  ['GH الصامتة', 'Silent GH', 'igh تنطق «آي» و gh ما تنطق (night «نايت»). وفي daughter و eight ما تنطق بعد. لكن انتبه: في laugh و enough تنطق «ف».', ['night', 'light', 'eight', 'daughter', 'laugh', 'enough'], 'My daughter is eight.',
    [{ promptAr: 'gh في night:', play: 'night', options: ['ما تنطق', 'تنطق «ف»', 'تنطق «غ»'], correctIndex: 0 },
     { promptAr: 'gh في laugh:', play: 'laugh', options: ['تنطق «ف»', 'ما تنطق', 'تنطق «غ»'], correctIndex: 0 },
     { promptAr: 'eight تنطق مثل:', play: 'eight', options: ['«إيت»', '«إيغت»', '«إيفت»'], correctIndex: 0 }]],
  ['الضغط في الكلمة (مقطعين)', 'Word stress (2 syllables)', 'في الإنجليزي مقطع واحد أقوى وأطول. أغلب الأسماء من مقطعين الضغط على الأول (TEAcher, WAter)، وأغلب الأفعال على الثاني (beGIN, reLAX). والضغط الغلط يصعّب الفهم.', ['teacher', 'water', 'begin', 'relax', 'hotel'], 'The hotel is near the water.',
    [{ promptAr: 'وين الضغط في teacher؟', play: 'teacher', options: ['TEA-cher', 'tea-CHER'], correctIndex: 0 },
     { promptAr: 'وين الضغط في begin؟', play: 'begin', options: ['BE-gin', 'be-GIN'], correctIndex: 1 },
     { promptAr: 'وين الضغط في hotel؟', play: 'hotel', options: ['HO-tel', 'ho-TEL'], correctIndex: 1 }]],
  ['الضغط في الكلمات الطويلة', 'Word stress (long words)', 'الضغط يتحرك مع اللواحق: PHOtograph، و phoTOgrapher، و photoGRAPHic. وكلمات تنتهي بـ tion الضغط قبلها مباشرة: inforMAtion.', ['photograph', 'photographer', 'information', 'important', 'banana'], 'This information is important.',
    [{ promptAr: 'وين الضغط في photographer؟', play: 'photographer', options: ['PHO-to-gra-pher', 'pho-TO-gra-pher', 'pho-to-GRA-pher'], correctIndex: 1 },
     { promptAr: 'وين الضغط في information؟', play: 'information', options: ['IN-for-ma-tion', 'in-for-MA-tion', 'in-FOR-ma-tion'], correctIndex: 1 },
     { promptAr: 'وين الضغط في banana؟', play: 'banana', options: ['BA-na-na', 'ba-NA-na', 'ba-na-NA'], correctIndex: 1 }]],
  ['الشوا: الصوت الخفيف', 'The schwa', 'أكثر صوت في الإنجليزي هو «ə»: صوت خفيف قصير مثل «أَ» مرتخية، يجي في المقاطع اللي ما عليها ضغط. a في about، و er في teacher، و o في today. لا تنطقها واضحة.', ['about', 'banana', 'teacher', 'today', 'problem'], 'Today the teacher has a problem.',
    [{ promptAr: 'a الأولى في about تنطق:', play: 'about', options: ['خفيفة «ə»', '«آ» واضحة'], correctIndex: 0 },
     { promptAr: 'er في teacher (بريطاني) تنطق:', play: 'teacher', options: ['خفيفة «ə»', '«إر» واضحة'], correctIndex: 0 },
     { promptAr: 'أي مقطع قوي في today؟', play: 'today', options: ['to', 'day'], correctIndex: 1 }]],
  ['الكلمات الضعيفة في الجملة', 'Weak forms', 'كلمات صغيرة مثل can و to و for و and تنطق خفيفة في الجملة: can «كَن»، to «تَ»، and «أَن». لو نطقتها قوية يصير كلامك ثقيل.', ['can', 'to', 'for', 'and', 'of'], 'I can go to the shop for bread and milk.',
    [{ promptAr: 'في «I can swim» كلمة can تنطق:', play: 'I can swim.', options: ['خفيفة «كَن»', 'قوية «كان»'], correctIndex: 0 },
     { promptAr: 'في «a cup of tea» كلمة of تنطق:', play: 'a cup of tea', options: ['خفيفة «أَف/أَ»', 'قوية «أوف»'], correctIndex: 0 },
     { promptAr: 'أي كلمة عليها الضغط في «I want to go»؟', play: 'I want to go.', options: ['want', 'to'], correctIndex: 0 }]],
  ['ربط الكلمات', 'Linking', 'لما تنتهي كلمة بحرف ساكن واللي بعدها تبدأ بحرف علة، اربطهم: an apple «أنابل»، turn off «تيرنوف»، pick it up «بيكيتاب». لا توقف بين الكلمات.', ['an apple', 'turn off', 'pick it up', 'look at it'], 'Pick it up and turn it off.',
    [{ promptAr: 'اسمع: كيف تنربط «an apple»؟', play: 'an apple', options: ['a-napple', 'an. apple'], correctIndex: 0 },
     { promptAr: 'اسمع: «turn off» تنطق:', play: 'turn off', options: ['tur-noff', 'turn. off'], correctIndex: 0 },
     { promptAr: 'وين الربط في «look at it»؟', play: 'look at it', options: ['loo-ka-tit', 'بدون ربط'], correctIndex: 0 }]],
  ['نغمة السؤال', 'Question intonation', 'أسئلة نعم/لا صوتك يطلع في آخرها: Are you ready? ↗. وأسئلة wh مثل where و what صوتك ينزل في آخرها: Where do you live? ↘.', ['Are you ready?', 'Where do you live?', 'Is it cold?', 'What is your name?'], 'Are you ready? Where do you live?',
    [{ promptAr: 'Are you ready? الصوت في آخرها:', play: 'Are you ready?', options: ['يطلع ↗', 'ينزل ↘'], correctIndex: 0 },
     { promptAr: 'Where do you live? الصوت في آخرها:', play: 'Where do you live?', options: ['يطلع ↗', 'ينزل ↘'], correctIndex: 1 },
     { promptAr: 'Is it cold? الصوت في آخرها:', play: 'Is it cold?', options: ['ينزل ↘', 'يطلع ↗'], correctIndex: 1 }]],
  ['الضغط في الجملة', 'Sentence stress', 'في الجملة نضغط على الكلمات المهمة (الأسماء والأفعال والصفات) ونخفف الصغيرة: I WANT to BUY a NEW PHONE. هذا يخلي كلامك طبيعي وواضح.', ['I want to buy a new phone.', 'She is reading a good book.'], 'I want to buy a new phone.',
    [{ promptAr: 'أي كلمة عليها ضغط في «I want to buy a new phone»؟', play: 'I want to buy a new phone.', options: ['phone', 'a'], correctIndex: 0 },
     { promptAr: 'أي كلمة خفيفة في «She is reading a book»؟', play: 'She is reading a book.', options: ['is', 'reading'], correctIndex: 0 },
     { promptAr: 'الكلمات المهمة في الجملة:', options: ['أطول وأقوى', 'أسرع وأخف'], correctIndex: 0 }]],
];

/** Level 2 (harder): diphthongs, more consonant contrasts, connected speech, stress & intonation in context. */
const RAW2: Raw[] = [
  ['صوت ir في bird و ar في hard', 'ER vs AR', 'ir و ur و er في bird و nurse و her صوت واحد طويل من وسط الفم والشفايف مرتخية، ما فيه «ي» ولا «ر» قوية. ar في hard الفم مفتوح لورا مثل «آ» طويلة.', [['bird', 'bard'], ['heard', 'hard'], ['firm', 'farm']], 'The nurse heard the bird first.'],
  ['oy و i الطويلة', 'OY vs I (boy/buy)', 'oy في boy تبدأ بشفايف مدوّرة «أو» وتتزحلق لـ «ي». i في buy تبدأ بفم مفتوح «آ» وتتزحلق لـ «ي». نفس النهاية، البداية مختلفة.', [['boy', 'buy'], ['toy', 'tie'], ['oil', 'aisle']], 'The boy enjoys his new toy.'],
  ['ow في now و o في no', 'OW vs OH', 'ow في now تبدأ بفم مفتوح «آ» وتنتهي بشفايف مدوّرة «و». o في no تبدأ من وسط الفم «أ» وتنتهي «و». loud عالي، و load حمولة.', [['now', 'no'], ['loud', 'load'], ['town', 'tone']], 'How about going downtown now?'],
  ['صوت ZH في measure', 'The ZH sound', 's في measure و usually تنطق مثل «ج» الشامية الناعمة (ژ): صوت «ش» لكن مع اهتزاز. لا تقولها «ز» ولا «ج» قوية.', ['measure', 'usually', 'treasure', 'television', 'decision'], 'I usually watch television at night.',
    [{ promptAr: 's في usually تنطق مثل:', play: 'usually', options: ['ژ (ش مجهورة)', 'ز', 'س'], correctIndex: 0 },
     { promptAr: 'si في television تنطق مثل:', play: 'television', options: ['ژ', 'س', 'ش'], correctIndex: 0 },
     { promptAr: 'أي كلمة فيها صوت ژ؟', play: 'treasure', options: ['treasure', 'tree', 'trust'], correctIndex: 0 }]],
  ['NG في آخر الكلمة', 'NG vs N', 'ng في sing صوت واحد من ورا اللسان عند سقف الحلق، مثل «ن» من الخشم بدون ما تنطق g. n في sin طرف اللسان ورا الأسنان.', [['sing', 'sin'], ['thing', 'thin'], ['wing', 'win']], 'She is singing a long song.'],
  ['singer و finger', 'NG with and without G', 'في singer ما ننطق g: «سِنَر». لكن في finger و hungry و English ننطق g بعد ng: «فِنْگَر». القاعدة: إذا الكلمة أصلها فعل + er مثل sing → singer ما تنطق g.', ['singer', 'finger', 'hungry', 'English', 'longer'], 'The singer hurt his finger.',
    [{ promptAr: 'في singer صوت g:', play: 'singer', options: ['ما ينطق', 'ينطق'], correctIndex: 0 },
     { promptAr: 'في finger صوت g:', play: 'finger', options: ['ينطق', 'ما ينطق'], correctIndex: 0 },
     { promptAr: 'في English صوت g:', play: 'English', options: ['ينطق', 'ما ينطق'], correctIndex: 0 }]],
  ['H في أول الكلمة', 'H vs no H', 'h الإنجليزية هوا خفيف من الحلق مثل «هـ» العربية، لا تحذفها ولا تزيدها. hair شعر، و air هواء. heat حرارة، و eat ياكل.', [['hair', 'air'], ['heat', 'eat'], ['hold', 'old']], 'Hold the hot cup with your hand.'],
  ['Y و J', 'Y vs J', 'y في yes مثل «ي» العربية، و j في jet مثل «ج». لا تخلطها: yet تعني بعد، و jet طيارة نفاثة.', [['yet', 'jet'], ['yes', 'Jess'], ['yolk', 'joke']], 'Yes, the jet is yellow.'],
  ['S و Z في آخر الكلمة', 'Final S vs Z', 'العربي ينطق z في الآخر «س». z لازم يكون معها اهتزاز في الحلق، وقبلها حركة أطول شوي. price سعر، و prize جائزة.', [['price', 'prize'], ['bus', 'buzz'], ['place', 'plays']], 'He plays for the prize.'],
  ['T و D في آخر الكلمة', 'Final T vs D', 'الحركة قبل d أطول من قبل t: bed أطول من bet. وd فيها صوت من الحلق. right يمين، و ride يركب.', [['bet', 'bed'], ['right', 'ride'], ['seat', 'seed']], 'Put the seed in the right bed.'],
  ['K و G', 'K vs G', 'k هوا بدون صوت مثل «ك» مع نفخة، و g نفس المكان مع اهتزاز مثل «ق» الخليجية. coat معطف، و goat ماعز.', [['coat', 'goat'], ['back', 'bag'], ['cold', 'gold']], 'The gold ring is in the bag.'],
  ['L الثقيلة في آخر الكلمة', 'Dark L', 'L في آخر الكلمة أو قبل حرف ساكن ثقيلة: ورا لسانك يرتفع مثل «ل» في «الله». feel و ball و milk. وفي أول الكلمة خفيفة: light.', ['feel', 'ball', 'milk', 'people', 'little'], 'People feel full after milk.',
    [{ promptAr: 'L في ball:', play: 'ball', options: ['ثقيلة', 'خفيفة'], correctIndex: 0 },
     { promptAr: 'L في light:', play: 'light', options: ['خفيفة', 'ثقيلة'], correctIndex: 0 },
     { promptAr: 'كم مرة تسمع L في little؟', play: 'little', options: ['مرتين', 'مرة'], correctIndex: 0 }]],
  ['T الأمريكية بين حرفين علة', 'The American flap T', 'في الأمريكي t بين حرفين علة تصير سريعة مثل «ر» خفيفة جدًا أو «د»: water «واتر/وادر»، better «بيدر»، city «سيدي». في البريطاني تبقى t واضحة.', ['water', 'better', 'city', 'party', 'little'], 'A little water is better.',
    [{ promptAr: 'في الأمريكي water تنطق تقريبًا:', play: 'water', options: ['«وادر»', '«واتتر» بقوة'], correctIndex: 0 },
     { promptAr: 't في city (أمريكي):', play: 'city', options: ['سريعة مثل د', 'تاء قوية'], correctIndex: 0 },
     { promptAr: 'وين تصير t سريعة؟', options: ['بين حرفين علة', 'في أول الكلمة'], correctIndex: 0 }]],
  ['ثلاث حروف ساكنة في البداية', 'Three-consonant clusters', 'str و spl و scr: انطق الثلاثة ورا بعض بدون أي حركة قبلها ولا بينها. street مو «إستريت» ولا «سِتريت».', ['street', 'strong', 'splash', 'scream', 'spring'], 'The strong spring wind is on the street.',
    [{ promptAr: 'النطق الصحيح لـ street:', play: 'street', options: ['ستريت مباشرة', 'إستريت', 'سِتِريت'], correctIndex: 0 },
     { promptAr: 'كم حرف ساكن في بداية splash؟', play: 'splash', options: ['3', '2', '1'], correctIndex: 0 },
     { promptAr: 'scream تبدأ بـ:', play: 'scream', options: ['s-c-r', 's-k', 'e-s'], correctIndex: 0 }]],
  ['نهايات صعبة', 'Hard final clusters', 'كلمات مثل months و texts و asked نهايتها ثلاث أصوات ساكنة. لا تحذفها ولا تزيد حركة. months «مَنْثس»، texts «تِكْستس».', ['months', 'texts', 'asked', 'sixth', 'world'], 'I asked for six texts this month.',
    [{ promptAr: 'آخر صوت في texts:', play: 'texts', options: ['ts', 't', 's'], correctIndex: 0 },
     { promptAr: 'asked تنطق:', play: 'asked', options: ['آسكت', 'آسكيد', 'آسك'], correctIndex: 0 },
     { promptAr: 'months فيها صوت:', play: 'months', options: ['ث ثم س', 'س بس', 'ت ثم س'], correctIndex: 0 }]],
  ['نهاية tion و sion', '-tion & -sion', 'tion تنطق «شَن» خفيفة: nation «نيشَن». sion بعد حرف علة تنطق «ژَن»: decision «دِسِژَن». والضغط دايم على المقطع اللي قبلها.', ['nation', 'station', 'decision', 'television', 'information'], 'The station made a quick decision.',
    [{ promptAr: 'tion في station تنطق:', play: 'station', options: ['شَن', 'تيون', 'سيون'], correctIndex: 0 },
     { promptAr: 'sion في decision تنطق:', play: 'decision', options: ['ژَن', 'سيون', 'شَن'], correctIndex: 0 },
     { promptAr: 'الضغط في nation على:', play: 'nation', options: ['NA', 'tion'], correctIndex: 0 }]],
  ['نهاية ture و sure', '-ture & -sure', 'ture تنطق «تشَر» خفيفة: picture «بِكتشَر». sure في آخر الكلمة بعد حرف علة «ژَر»: pleasure «بليژَر». لا تقرأها «تيور».', ['picture', 'future', 'nature', 'pleasure', 'measure'], 'It is a pleasure to see the picture.',
    [{ promptAr: 'ture في future تنطق:', play: 'future', options: ['تشَر', 'تيور'], correctIndex: 0 },
     { promptAr: 'sure في pleasure تنطق:', play: 'pleasure', options: ['ژَر', 'شور'], correctIndex: 0 },
     { promptAr: 'nature تنطق:', play: 'nature', options: ['نيتشَر', 'ناتيور'], correctIndex: 0 }]],
  ['حروف صامتة أكثر', 'More silent letters', 's ما تنطق في island، و h ما تنطق في honest و hour، و p ما تنطق في receipt، و d الأولى ما تنطق في Wednesday، و c ما تنطق في muscle.', ['island', 'honest', 'hour', 'receipt', 'Wednesday'], 'See you in an hour on Wednesday.',
    [{ promptAr: 'أي حرف ما ينطق في island؟', play: 'island', options: ['s', 'l', 'n'], correctIndex: 0 },
     { promptAr: 'أي حرف ما ينطق في receipt؟', play: 'receipt', options: ['p', 'c', 't'], correctIndex: 0 },
     { promptAr: 'لماذا نقول an hour مو a hour؟', play: 'an hour', options: ['لأن h ما تنطق', 'لأنها جمع'], correctIndex: 0 }]],
  ['كلمات نفس النطق', 'Homophones', 'كلمات تنطق نفس الشي وتختلف كتابة ومعنى: right و write، hear و here، son و sun، flour و flower. المعنى يجي من الجملة.', ['right', 'write', 'hear', 'here', 'son', 'sun'], 'I can hear you from here.',
    [{ promptAr: 'اسمع: «Please ___ your name.» أي كلمة؟', play: 'Please write your name.', options: ['write', 'right'], correctIndex: 0 },
     { promptAr: 'اسمع: «My ___ is ten.» أي كلمة؟', play: 'My son is ten.', options: ['son', 'sun'], correctIndex: 0 },
     { promptAr: 'اسمع: «Come ___.» أي كلمة؟', play: 'Come here.', options: ['here', 'hear'], correctIndex: 0 }]],
  ['نفس الكتابة ونطق مختلف', 'Same spelling, different sound', 'read في المضارع «ريد» وفي الماضي «رِد». live فعل «لِف» وصفة «لايف». wind هواء «وِند» وفعل يلف «وايند». السياق يحدد.', ['read', 'live', 'wind', 'lead', 'tear'], 'Yesterday I read a book about live music.',
    [{ promptAr: 'اسمع: read هنا في الماضي ولا المضارع؟', play: 'Yesterday I read a book.', options: ['ماضي «رِد»', 'مضارع «ريد»'], correctIndex: 0 },
     { promptAr: 'اسمع: live هنا فعل ولا صفة؟', play: 'I watched a live match.', options: ['صفة «لايف»', 'فعل «لِف»'], correctIndex: 0 },
     { promptAr: 'اسمع: wind هنا اسم ولا فعل؟', play: 'The wind is strong.', options: ['اسم «وِند»', 'فعل «وايند»'], correctIndex: 0 }]],
  ['الضغط: اسم ولا فعل', 'Noun vs verb stress', 'بعض الكلمات الاسم ضغطه على الأول والفعل على الثاني: a REcord / to reCORD، a PREsent / to preSENT، an OBject / to obJECT.', ['record', 'present', 'object', 'export', 'increase'], 'I want to record a new record.',
    [{ promptAr: 'اسمع: «I want to record a song.» الضغط:', play: 'I want to record a song.', options: ['re-CORD (فعل)', 'RE-cord (اسم)'], correctIndex: 0 },
     { promptAr: 'اسمع: «This is a present for you.» الضغط:', play: 'This is a present for you.', options: ['PRE-sent (اسم)', 'pre-SENT (فعل)'], correctIndex: 0 },
     { promptAr: 'الفعل غالبًا ضغطه على:', options: ['المقطع الثاني', 'المقطع الأول'], correctIndex: 0 }]],
  ['الضغط في الكلمات المركبة', 'Compound stress', 'الأسماء المركبة ضغطها على الكلمة الأولى: BLACKboard (سبورة)، BEDroom، AIRport. لكن صفة + اسم الضغط على الثاني: a black BOARD (لوح أسود).', ['blackboard', 'bedroom', 'airport', 'football', 'toothbrush'], 'My toothbrush is in the bedroom.',
    [{ promptAr: 'الضغط في airport:', play: 'airport', options: ['AIR-port', 'air-PORT'], correctIndex: 0 },
     { promptAr: 'الضغط في bedroom:', play: 'bedroom', options: ['BED-room', 'bed-ROOM'], correctIndex: 0 },
     { promptAr: 'الأسماء المركبة ضغطها على:', options: ['الكلمة الأولى', 'الكلمة الثانية'], correctIndex: 0 }]],
  ['الضغط يتحرك مع اللواحق', 'Stress shift with suffixes', 'مع ic و ity و ian الضغط يجي على المقطع اللي قبلها مباشرة: eCOnomy → ecoNOMic، PUblic → puBLIcity، MUsic → muSIcian.', ['economy', 'economic', 'music', 'musician', 'public', 'publicity'], 'The musician studies economics.',
    [{ promptAr: 'الضغط في economic:', play: 'economic', options: ['e-co-NOM-ic', 'E-co-nom-ic', 'e-CO-nom-ic'], correctIndex: 0 },
     { promptAr: 'الضغط في musician:', play: 'musician', options: ['mu-SI-cian', 'MU-si-cian', 'mu-si-CIAN'], correctIndex: 0 },
     { promptAr: 'مع ic الضغط يكون:', options: ['قبلها مباشرة', 'في أول الكلمة'], correctIndex: 0 }]],
  ['الاختصارات', 'Contractions', 'في الكلام نختصر: I am → I\'m، you are → you\'re، they will → they\'ll، would not → wouldn\'t. انطقها مقطع واحد سريع، مو كلمتين.', ["I'm", "you're", "they'll", "wouldn't", "it's"], "I'm sure they'll come, but it's late.",
    [{ promptAr: 'اسمع: أي اختصار قالت سارة؟', play: "They'll be here soon.", options: ["They'll", 'They are', "They'd"], correctIndex: 0 },
     { promptAr: 'اسمع: أي اختصار؟', play: "I wouldn't do that.", options: ["wouldn't", "won't", "didn't"], correctIndex: 0 },
     { promptAr: "you're معناها:", options: ['you are', 'your', 'you were'], correctIndex: 0 }]],
  ['gonna و wanna و gotta', 'Informal reductions', 'في الكلام السريع: going to → gonna، want to → wanna، got to → gotta. تسمعها كثير في الأفلام، لكن في الكتابة الرسمية اكتبها كاملة.', ['gonna', 'wanna', 'gotta', 'kinda', 'lemme'], "I'm going to call you. I want to talk.",
    [{ promptAr: 'اسمع: gonna تعني:', play: "I'm gonna call you.", options: ['going to', 'got to', 'want to'], correctIndex: 0 },
     { promptAr: 'اسمع: wanna تعني:', play: 'Do you wanna eat?', options: ['want to', 'going to', 'have to'], correctIndex: 0 },
     { promptAr: 'في إيميل رسمي تكتب:', options: ['going to', 'gonna'], correctIndex: 0 }]],
  ['حذف الأصوات في الكلام', 'Elision', 'لما تجي t أو d بين حرفين ساكنين تختفي تقريبًا: next day «نِكس دَي»، last night «لاس نايت»، handbag «هانبَاق». هذا طبيعي عند المتحدثين.', ['next day', 'last night', 'handbag', 'friendship', 'must be'], 'I saw her last night with a new handbag.',
    [{ promptAr: 'اسمع: في last night صوت t:', play: 'last night', options: ['يكاد يختفي', 'واضح جدًا'], correctIndex: 0 },
     { promptAr: 'اسمع: handbag تنطق تقريبًا:', play: 'handbag', options: ['هانبَاق', 'هاند-باق'], correctIndex: 0 },
     { promptAr: 'الحرف اللي يختفي غالبًا:', options: ['t و d', 'm و n'], correctIndex: 0 }]],
  ['اندماج الأصوات', 'Assimilation', 'd + you تصير «جو»: did you → «دِدجو». t + you تصير «تشو»: don\'t you → «دونتشو»، what you → «واتشو». اسمعها وتعوّد عليها.', ['did you', "don't you", 'would you', 'what you', 'meet you'], 'Did you see it? Would you like some?',
    [{ promptAr: 'اسمع: did you تنطق تقريبًا:', play: 'Did you eat?', options: ['دِدجو', 'دِد يو'], correctIndex: 0 },
     { promptAr: 'اسمع: what you تنطق تقريبًا:', play: 'What you need is rest.', options: ['واتشو', 'وات يو'], correctIndex: 0 },
     { promptAr: 'would you تنطق تقريبًا:', play: 'Would you like tea?', options: ['وُدجو', 'وُد يو'], correctIndex: 0 }]],
  ['التوقف ومجموعات الكلام', 'Thought groups', 'الجملة الطويلة نقسمها لمجموعات ونوقف وقفة صغيرة بينها: When I got home | I made dinner | and called my mother. الوقفة الغلط تلخبط المعنى.', ['When I got home,', 'I made dinner', 'and called my mother.'], 'When I got home, I made dinner and called my mother.',
    [{ promptAr: 'وين الوقفة المناسبة؟', play: 'After the class, we went to the park.', options: ['بعد class', 'بعد the'], correctIndex: 0 },
     { promptAr: 'الوقفة تكون غالبًا عند:', options: ['الفاصلة ونهاية الفكرة', 'وسط الكلمة'], correctIndex: 0 },
     { promptAr: 'اسمع: كم مجموعة في الجملة؟', play: 'If it rains, we will stay home.', options: ['2', '4'], correctIndex: 0 }]],
  ['الضغط للتأكيد', 'Contrastive stress', 'نضغط على الكلمة اللي نبي نصحح فيها أو نأكدها: I said BLUE, not green. نفس الجملة بضغط مختلف تعطي معنى مختلف: SHE took my pen (هي مو غيرها).', ['I said BLUE.', 'SHE took it.', 'It was MY idea.'], 'I wanted tea, not coffee.',
    [{ promptAr: '«I said BLUE, not green» الضغط على:', play: 'I said blue, not green.', options: ['blue', 'said'], correctIndex: 0 },
     { promptAr: '«It was MY idea» تعني:', options: ['أنا صاحب الفكرة مو غيري', 'الفكرة كانت سيئة'], correctIndex: 0 },
     { promptAr: 'نضغط على الكلمة اللي:', options: ['نصحح فيها أو نأكدها', 'أطول وحدة'], correctIndex: 0 }]],
  ['نغمة القوائم والاستغراب', 'List & surprise intonation', 'في القوائم الصوت يطلع مع كل عنصر وينزل مع الأخير: apples ↗, bananas ↗, and oranges ↘. وفي الاستغراب الصوت يطلع عالي: Really? ↗ You won?', ['apples, bananas, and oranges', 'Really?', 'You won?'], 'I bought apples, bananas, and oranges.',
    [{ promptAr: 'في القائمة، الصوت مع آخر عنصر:', play: 'red, green, and blue', options: ['ينزل ↘', 'يطلع ↗'], correctIndex: 0 },
     { promptAr: 'Really? للاستغراب الصوت:', play: 'Really?', options: ['يطلع ↗', 'ينزل ↘'], correctIndex: 0 },
     { promptAr: 'مع العناصر قبل الأخير الصوت:', options: ['يطلع ↗', 'ينزل ↘'], correctIndex: 0 }]],
];

export const PRONUNCIATION_LESSONS: SaraPronLesson[] = [...RAW, ...RAW2].map(([titleAr, titleEn, ideaAr, pw, sayEn, ex], i) => {
  const isPairs = Array.isArray(pw[0]);
  const pairs = isPairs ? (pw as [string, string][]) : undefined;
  return { id: `pron-${'abcd'[Math.floor(i / 30)]}-${String((i % 30) + 1).padStart(2, '0')}`, order: i + 1, levelId: 'abcd'[Math.floor(i / 30)] as 'a' | 'b' | 'c' | 'd', titleAr, titleEn, ideaAr, pairs, words: isPairs ? undefined : (pw as string[]), sayEn,
    exercises: (ex || pairExercises(pairs!)).map((e, k) => (i < 30 ? e : rotate(e, i + k))) };
});
export const PRONUNCIATION_TRACK_ID = 'pronunciation';
