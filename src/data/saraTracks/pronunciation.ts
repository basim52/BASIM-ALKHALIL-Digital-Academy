/** Pronunciation — Level 1: 30 lessons on the sounds Arabic speakers find hardest. Real, hand-written content. */
export interface SaraPronExercise { promptAr: string; /** Sara plays this first (cloud voice). */ play?: string; options: string[]; correctIndex: number }
export interface SaraPronLesson {
  id: string; order: number; titleAr: string; titleEn: string;
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

export const PRONUNCIATION_LESSONS: SaraPronLesson[] = RAW.map(([titleAr, titleEn, ideaAr, pw, sayEn, ex], i) => {
  const isPairs = Array.isArray(pw[0]);
  const pairs = isPairs ? (pw as [string, string][]) : undefined;
  return { id: `pron-a-${String(i + 1).padStart(2, '0')}`, order: i + 1, titleAr, titleEn, ideaAr, pairs, words: isPairs ? undefined : (pw as string[]), sayEn,
    exercises: ex || pairExercises(pairs!) };
});
export const PRONUNCIATION_TRACK_ID = 'pronunciation';
