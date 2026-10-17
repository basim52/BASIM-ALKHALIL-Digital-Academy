import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface SentenceOption { en: string; ar: string; icon?: string }
export interface SentenceCard {
  id: string; icon: string; labelAr: string;
  beforeEn: string; afterEn: string; beforeAr: string; afterAr: string;
  options: SentenceOption[];
}
export interface SentenceBuilderInput {
  titleEn: string; titleAr: string; level?: string;
  examples?: { en: string; ar: string }[];
  vocab?: { en: string; ar: string; emoji: string }[];
}
interface Bank { keys: string[]; icon: string; categoryEn: string; categoryAr: string; items: SentenceOption[]; actions: SentenceOption[]; goals: SentenceOption[]; activities: SentenceOption[]; places: SentenceOption[] }
const o = (en: string, ar: string, icon?: string): SentenceOption => ({ en, ar, icon });
const BANK = (keys: string[], icon: string, categoryEn: string, categoryAr: string, items: SentenceOption[], actions: SentenceOption[], goals: SentenceOption[], activities: SentenceOption[], places: SentenceOption[]): Bank => ({ keys, icon, categoryEn, categoryAr, items, actions, goals, activities, places });

const BANKS: Bank[] = [
  BANK(['sport','football','soccer','tennis','swim','رياض','كرة'], '⚽', 'sport', 'الرياضة',
    [o('football','كرة القدم','⚽'),o('tennis','التنس','🎾'),o('swimming','السباحة','🏊'),o('basketball','كرة السلة','🏀')],
    [o('play football','ألعب كرة القدم'),o('swim fast','أسبح بسرعة'),o('run every morning','أركض كل صباح'),o('train with my team','أتدرب مع فريقي')],
    [o('join a football team','أن أنضم لفريق كرة قدم'),o('win a school match','أن أفوز بمباراة مدرسية'),o('swim without stopping','أن أسبح بدون توقف'),o('run five kilometres','أن أركض خمسة كيلومترات')],
    [o('playing football','ألعب كرة القدم'),o('training with my team','أتدرب مع فريقي'),o('watching a match','أشاهد مباراة'),o('running in the park','أركض في الحديقة')],
    [o('the stadium','الملعب'),o('the sports club','النادي الرياضي'),o('the park','الحديقة'),o('school','المدرسة')]),
  BANK(['game','gaming','video','playstation','xbox','ألعاب','لعبة'], '🎮', 'game', 'الألعاب',
    [o('video games','ألعاب الفيديو','🎮'),o('board games','ألعاب الطاولة','🎲'),o('chess','الشطرنج','♟️'),o('puzzle games','ألعاب الألغاز','🧩')],
    [o('play with my friends','ألعب مع أصدقائي'),o('finish a difficult level','أنهي مرحلة صعبة'),o('build a city in a game','أبني مدينة في لعبة'),o('solve a puzzle','أحل لغزاً')],
    [o('design my own game','أن أصمم لعبتي الخاصة'),o('win an online tournament','أن أفوز ببطولة إلكترونية'),o('create a game character','أن أصمم شخصية لعبة'),o('learn game programming','أن أتعلم برمجة الألعاب')],
    [o('playing with friends','ألعب مع أصدقائي'),o('building a virtual city','أبني مدينة افتراضية'),o('solving a puzzle','أحل لغزاً'),o('watching a game video','أشاهد فيديو لعبة')],
    [o('my friend’s house','بيت صديقي'),o('the gaming club','نادي الألعاب'),o('home','البيت'),o('school','المدرسة')]),
  BANK(['tech','computer','phone','app','internet','robot','تقنية','حاسوب','هاتف'], '💻', 'technology', 'التقنية',
    [o('useful apps','التطبيقات المفيدة','📱'),o('computers','الحواسيب','💻'),o('robots','الروبوتات','🤖'),o('the internet','الإنترنت','🌐')],
    [o('use a computer','أستخدم الحاسوب'),o('make a simple app','أصنع تطبيقاً بسيطاً'),o('type quickly','أكتب بسرعة'),o('learn coding','أتعلم البرمجة')],
    [o('build an app','أن أبني تطبيقاً'),o('learn programming','أن أتعلم البرمجة'),o('start a tech project','أن أبدأ مشروعاً تقنياً'),o('help students learn online','أن أساعد الطلاب على التعلم عبر الإنترنت')],
    [o('using a learning app','أستخدم تطبيقاً تعليمياً'),o('writing code','أكتب كوداً'),o('watching a tech video','أشاهد فيديو تقنياً'),o('designing an app','أصمم تطبيقاً')],
    [o('the computer lab','مختبر الحاسوب'),o('school','المدرسة'),o('home','البيت'),o('the library','المكتبة')]),
  BANK(['movie','film','cinema','series','show','فيلم','أفلام','سينما'], '🎬', 'movie', 'الأفلام',
    [o('action movies','أفلام الأكشن','🎬'),o('funny movies','الأفلام الكوميدية','😂'),o('adventure movies','أفلام المغامرات','🗺️'),o('animated movies','أفلام الرسوم المتحركة','🎨')],
    [o('watch a movie','أشاهد فيلماً'),o('act in a school play','أمثل في مسرحية مدرسية'),o('tell a story','أحكي قصة'),o('take great photos','ألتقط صوراً رائعة')],
    [o('watch a movie in English','أن أشاهد فيلماً بالإنجليزية'),o('make a short film','أن أصنع فيلماً قصيراً'),o('meet a famous actor','أن أقابل ممثلاً مشهوراً'),o('understand movies without subtitles','أن أفهم الأفلام بدون ترجمة')],
    [o('watching a movie','أشاهد فيلماً'),o('reading about actors','أقرأ عن الممثلين'),o('making a short video','أصنع فيديو قصيراً'),o('listening to a film song','أستمع لأغنية فيلم')],
    [o('the cinema','السينما'),o('home','البيت'),o('my friend’s house','بيت صديقي'),o('the theatre','المسرح')]),
  BANK(['travel','trip','airport','flight','hotel','journey','سفر','رحلة','مطار'], '✈️', 'place', 'السفر',
    [o('the beach','الشاطئ','🏖️'),o('the mountains','الجبال','⛰️'),o('new cities','المدن الجديدة','🏙️'),o('famous landmarks','المعالم المشهورة','🗽')],
    [o('travel by plane','أسافر بالطائرة'),o('take photos','ألتقط صوراً'),o('visit new places','أزور أماكن جديدة'),o('pack a bag','أجهز حقيبة')],
    [o('visit London','أن أزور لندن'),o('travel with my family','أن أسافر مع عائلتي'),o('see the sea','أن أرى البحر'),o('explore a new country','أن أستكشف دولة جديدة')],
    [o('planning a trip','أخطط لرحلة'),o('looking at travel photos','أنظر إلى صور السفر'),o('packing my bag','أجهز حقيبتي'),o('watching planes','أشاهد الطائرات')],
    [o('the airport','المطار'),o('the beach','الشاطئ'),o('a new city','مدينة جديدة'),o('the mountains','الجبال')]),
  BANK(['ambition','dream','future','goal','job','career','طموح','مستقبل','وظيفة','حلم'], '🌟', 'dream', 'الأحلام',
    [o('my future job','وظيفتي المستقبلية','💼'),o('big goals','الأهداف الكبيرة','🎯'),o('learning English','تعلم الإنجليزية','🇬🇧'),o('helping people','مساعدة الناس','🤝')],
    [o('speak English well','أتحدث الإنجليزية جيداً'),o('read English books','أقرأ كتباً إنجليزية'),o('help my family','أساعد عائلتي'),o('learn new skills','أتعلم مهارات جديدة')],
    [o('become a doctor','أن أصبح طبيباً'),o('become a teacher','أن أصبح معلماً'),o('start my own business','أن أبدأ مشروعي الخاص'),o('study at a great university','أن أدرس في جامعة رائعة')],
    [o('studying English','أدرس الإنجليزية'),o('planning my future','أخطط لمستقبلي'),o('learning a new skill','أتعلم مهارة جديدة'),o('reading about successful people','أقرأ عن الناجحين')],
    [o('the library','المكتبة'),o('school','المدرسة'),o('a university','جامعة'),o('my future office','مكتبي المستقبلي')]),
  BANK(['food','eat','restaurant','breakfast','lunch','dinner','طعام','أكل','مطعم','فطور'], '🍽️', 'food', 'الطعام',
    [o('pizza','البيتزا','🍕'),o('apples','التفاح','🍎'),o('rice and chicken','الأرز والدجاج','🍗'),o('fresh salad','السلطة الطازجة','🥗')],
    [o('cook rice','أطبخ الأرز'),o('make a salad','أحضر سلطة'),o('bake bread','أخبز الخبز'),o('order food politely','أطلب الطعام بأدب')],
    [o('try Japanese food','أن أجرب الطعام الياباني'),o('cook dinner for my family','أن أطبخ العشاء لعائلتي'),o('open a small restaurant','أن أفتح مطعماً صغيراً'),o('learn a new recipe','أن أتعلم وصفة جديدة')],
    [o('eating breakfast','أتناول الفطور'),o('cooking with my family','أطبخ مع عائلتي'),o('choosing fruit','أختار الفاكهة'),o('drinking water','أشرب الماء')],
    [o('a restaurant','مطعم'),o('the market','السوق'),o('home','البيت'),o('a café','مقهى')]),
  BANK(['school','class','teacher','student','lesson','homework','مدرسة','صف','معلم','درس'], '🏫', 'school subject', 'المواد الدراسية',
    [o('English','الإنجليزية','🇬🇧'),o('maths','الرياضيات','➗'),o('science','العلوم','🔬'),o('sports at school','الرياضة المدرسية','⚽')],
    [o('read English','أقرأ الإنجليزية'),o('answer questions','أجيب عن الأسئلة'),o('write neat homework','أكتب واجباً مرتباً'),o('work with my classmates','أعمل مع زملائي')],
    [o('get excellent marks','أن أحصل على درجات ممتازة'),o('speak English in class','أن أتحدث الإنجليزية في الصف'),o('help a classmate','أن أساعد زميلاً'),o('read a whole English book','أن أقرأ كتاباً إنجليزياً كاملاً')],
    [o('studying English','أدرس الإنجليزية'),o('doing my homework','أحل واجبي'),o('reading a story','أقرأ قصة'),o('listening to my teacher','أستمع لمعلمي')],
    [o('school','المدرسة'),o('the library','المكتبة'),o('my classroom','صفي'),o('the school library','مكتبة المدرسة')]),
  BANK(['music','song','sing','listen','موسيقى','أغنية','غناء'], '🎵', 'music', 'الموسيقى',
    [o('calm music','الموسيقى الهادئة','🎵'),o('English songs','الأغاني الإنجليزية','🎤'),o('piano music','موسيقى البيانو','🎹'),o('school songs','أغاني المدرسة','🎶')],
    [o('sing a song','أغني أغنية'),o('play the piano','أعزف البيانو'),o('listen carefully','أستمع بانتباه'),o('learn song words','أتعلم كلمات الأغاني')],
    [o('sing in English','أن أغني بالإنجليزية'),o('learn an instrument','أن أتعلم آلة موسيقية'),o('perform at school','أن أقدم عرضاً في المدرسة'),o('write a song','أن أكتب أغنية')],
    [o('listening to music','أستمع للموسيقى'),o('singing with friends','أغني مع أصدقائي'),o('learning a new song','أتعلم أغنية جديدة'),o('playing an instrument','أعزف آلة موسيقية')],
    [o('the music room','غرفة الموسيقى'),o('school','المدرسة'),o('home','البيت'),o('a concert','حفل موسيقي')]),
];

const GENERIC: Bank = BANK(['english'], '💬', 'thing', 'الأشياء',
  [o('English','الإنجليزية','🇬🇧'),o('new words','الكلمات الجديدة','🔤'),o('short stories','القصص القصيرة','📚'),o('speaking practice','تدريب التحدث','🗣️')],
  [o('speak English','أتحدث الإنجليزية'),o('read short stories','أقرأ قصصاً قصيرة'),o('use new words','أستخدم كلمات جديدة'),o('ask questions','أطرح أسئلة')],
  [o('speak English confidently','أن أتحدث الإنجليزية بثقة'),o('learn ten new words','أن أتعلم عشر كلمات جديدة'),o('tell a story in English','أن أحكي قصة بالإنجليزية'),o('talk with Sara every week','أن أتحدث مع سارة كل أسبوع')],
  [o('learning English','أتعلم الإنجليزية'),o('practising new words','أتدرب على كلمات جديدة'),o('reading a story','أقرأ قصة'),o('talking with Sara','أتحدث مع سارة')],
  [o('school','المدرسة'),o('the library','المكتبة'),o('home','البيت'),o('the academy','الأكاديمية')]);

const pickBank = (input: SentenceBuilderInput): Bank => {
  const text = `${input.titleEn} ${input.titleAr} ${(input.examples || []).map(e => e.en).join(' ')}`.toLowerCase();
  return BANKS.find(b => b.keys.some(k => text.includes(k))) || GENERIC;
};
const bandOf = (level?: string) => {
  const l = String(level || '').toLowerCase();
  return l.includes('c') || l === 'd' || l.includes('b2') ? 'advanced' : l.includes('b') || l.includes('b1') ? 'intermediate' : 'beginner';
};
const card = (id: string, icon: string, labelAr: string, beforeEn: string, afterEn: string, beforeAr: string, afterAr: string, options: SentenceOption[]): SentenceCard => ({ id, icon, labelAr, beforeEn, afterEn, beforeAr, afterAr, options });
const BAD_WORDS = new Set(['hello','goodbye','please','thank you','sorry','welcome','name','yes','no','okay','morning','night','today','tomorrow']);

/** Five sentence-pattern cards for a lesson, from its topic/vocabulary/examples. Teen-clean templates; no invented scores. */
export function buildSentenceCards(input: SentenceBuilderInput): SentenceCard[] {
  const bank = pickBank(input);
  const band = bandOf(input.level);
  const vocabOptions = (input.vocab || []).filter(w => !BAD_WORDS.has(w.en.toLowerCase()) && w.en.length <= 26).slice(0, 4).map(w => o(w.en, w.ar, w.emoji));
  const like = card('like', bank.icon, 'عبّر عن شيء تحبه', 'I like ', '.', 'أنا أحب ', '.', bank.items);
  const favourite = vocabOptions.length >= 3
    ? card('fav-word', '🔤', 'اختر كلمتك المفضلة من الدرس', 'My favourite word is ', '.', 'كلمتي المفضلة هي ', '.', vocabOptions)
    : card('favourite', bank.icon, 'اختر المفضّل عندك', `My favourite ${bank.categoryEn} is `, '.', `أكثر شيء أحبه في ${bank.categoryAr} هو `, '.', bank.items);
  const can = card('can', '💪', 'وش تقدر تسوي؟', 'I can ', '.', 'أنا أقدر ', '.', bank.actions);
  const want = card('want', '🎯', 'حدّد هدفاً أو رغبة', 'I want to ', '.', 'أنا أبغى ', '.', bank.goals);
  const now = card('now', '⏱️', 'وش تسوي الآن؟', 'I am ', ' now.', 'أنا ', ' الآن.', bank.activities);
  const went = card('went', '📍', 'وين رحت؟', 'I went to ', ' yesterday.', 'رحت إلى ', ' أمس.', bank.places);
  const goal0 = bank.goals[0];
  const outcome = card('outcome', '🚀', 'ليش تبي تحقق هدفك؟', `I want to ${goal0.en} because it will help me `, '.', `أنا أبغى ${goal0.ar} لأنه بيساعدني `, '.', [
    o('learn faster','أتعلم أسرع'), o('speak with confidence','أتحدث بثقة'), o('help my family','أساعد عائلتي'), o('get better opportunities','أحصل على فرص أفضل')]);
  return band === 'beginner' ? [like, favourite, can, now, want] : band === 'intermediate' ? [like, can, want, went, favourite] : [want, outcome, can, went, favourite];
}

export interface SentenceActivity { trackId: string; lessonId: string; lessonTitleAr: string; sentencesBuilt: number; sentences: string[]; at: number }
const KEY = (uid?: string) => `sara_sentence_builder_${uid || 'guest'}`;
export function readSentenceActivities(uid?: string): SentenceActivity[] { try { return JSON.parse(localStorage.getItem(KEY(uid)) || '[]'); } catch { return []; } }
/** Real practice activity only (does not pass/unlock a lesson): saved on the device and in users/{uid}.saraSentenceActivity. */
export async function saveSentenceActivity(uid: string | undefined, a: SentenceActivity): Promise<void> {
  const list = [...readSentenceActivities(uid), a].slice(-50);
  try { localStorage.setItem(KEY(uid), JSON.stringify(list)); } catch { /* ignore */ }
  if (!uid) return;
  try {
    const cloud = ((await getDoc(doc(db, 'users', uid))).data()?.saraSentenceActivity as SentenceActivity[]) || [];
    await updateDoc(doc(db, 'users', uid), { saraSentenceActivity: [...cloud, a].slice(-50) });
  } catch { /* offline: local copy remains */ }
}
