import type { SaraTrack, SaraTrackLesson } from './foundations';
import { ADVANCED_B1 } from './advancedB1';

const titles = (levelId: string, start: number, list: [string, string][]): SaraTrackLesson[] =>
  list.map(([titleAr, titleEn], i) => ({
    id: `adv-${levelId}-${String(i + 1).padStart(2, '0')}`, order: start + i, levelId, titleAr, titleEn
  }));

const B2: [string, string][] = [
  ['الأزمنة السردية', 'Narrative Tenses'], ['الماضي التام المستمر', 'Past Perfect Continuous'],
  ['المستقبل المستمر', 'Future Continuous'], ['المستقبل التام', 'Future Perfect'],
  ['الشرط الثالث', 'Third Conditional'], ['الشرط المختلط', 'Mixed Conditionals'],
  ['unless و as long as و provided', 'Unless, As Long As, Provided'], ['التمني في الحاضر: wish', 'Wish (Present)'],
  ['التمني في الماضي: wish و if only', 'Wish & If Only (Past)'], ['المبني للمجهول في كل الأزمنة', 'Passive in All Tenses'],
  ['المبني للمجهول مع الأفعال الناقصة', 'Passive with Modals'], ['have something done', 'Causative: Have Something Done'],
  ['نقل الأوامر والطلبات', 'Reported Commands & Requests'], ['أفعال النقل', 'Reporting Verbs'],
  ['جمل الصلة غير المحددة', 'Non-defining Relative Clauses'], ['ضمائر الصلة مع حروف الجر', 'Relative Pronouns with Prepositions'],
  ['الاستنتاج في الحاضر: must و can\'t و might', 'Modals of Deduction (Present)'], ['الاستنتاج في الماضي', 'Modals of Deduction (Past)'],
  ['الأفعال الناقصة الماضية: should have', 'Past Modals: Should Have, Could Have'], ['أفعال يتغير معناها: stop و remember و try', 'Gerund vs Infinitive: Change of Meaning'],
  ['أنماط الأفعال مع المفعول', 'Verb Patterns with Objects'], ['used to و be used to و get used to', 'Used To vs Be/Get Used To'],
  ['أدوات التعريف المتقدمة', 'Articles (Advanced)'], ['المعدود وغير المعدود بعمق', 'Countable & Uncountable Nuances'],
  ['صفات ed و ing', '-ed vs -ing Adjectives'], ['the more ... the more', 'Double Comparatives'],
  ['روابط الغرض والتعارض', 'Linkers of Purpose & Contrast'], ['الأفعال المركبة القابلة للفصل', 'Separable Phrasal Verbs'],
  ['المستقبل في الماضي', 'Future in the Past'], ['مراجعة المستوى B2', 'B2 Review']
];
const C1: [string, string][] = [
  ['القلب بعد الظروف المنفية', 'Inversion after Negative Adverbials'], ['القلب في الشرط: Had I known', 'Conditional Inversion'],
  ['جمل التأكيد: It is ... that', 'Cleft Sentences (It-clefts)'], ['جمل التأكيد: What I need is', 'Pseudo-clefts (Wh-clefts)'],
  ['صيغة الطلب: I suggest he go', 'The Subjunctive'], ['جمل اسم الفاعل: Having finished', 'Participle Clauses'],
  ['اختصار جمل الصلة', 'Reduced Relative Clauses'], ['المجهول للنقل: It is said that', 'Passive Reporting Structures'],
  ['التوكيد بـ do و does و did', 'Emphatic Do'], ['الحذف', 'Ellipsis'],
  ['الاستبدال: so و not و one', 'Substitution'], ['التقديم', 'Fronting'],
  ['التحويل إلى اسم', 'Nominalisation'], ["needn't have و didn't need to", "Needn't Have vs Didn't Need To"],
  ["would rather و it's time", "Would Rather & It's Time"], ['as if و as though', 'As If & As Though'],
  ['التلطيف: seem و appear و tend', 'Hedging Language'], ['أدوات الخطاب', 'Discourse Markers'],
  ['المستقبل التام المستمر', 'Future Perfect Continuous'], ['الإشارة الزمنية المختلطة', 'Mixed Time Reference'],
  ['whatever و whoever و however', 'Whatever, Whoever, However'], ['each و every و either و neither', 'Distributives'],
  ['الصفات المركبة', 'Compound Adjectives'], ['السببية المتقدمة: get و have', 'Advanced Causatives'],
  ['أشباه الجمل الاسمية المعقدة', 'Complex Noun Phrases'], ['التنازل: much as و albeit', 'Concession'],
  ['الماضي غير الحقيقي: suppose و supposing', 'Unreal Past'], ['حروف الجر التابعة للأفعال', 'Dependent Prepositions'],
  ['make و do والتلازم', 'Grammar Collocations: Make & Do'], ['مراجعة المستوى C1', 'C1 Review']
];
const C2: [string, string][] = [
  ['القلب المتقدم: Little did I know', 'Advanced Inversion'], ['القلب مع so و such', 'Inversion with So & Such'],
  ['صيغ شرطية متقدمة: But for و Were it not for', 'Advanced Conditional Forms'], ['صيغة الطلب الرسمية: be it و come what may', 'Formal Subjunctive Expressions'],
  ['التأكيد المتقدم: All I did was', 'Advanced Clefts'], ['الجمل المطلقة', 'Absolute Constructions'],
  ['الحذف المتقدم', 'Advanced Ellipsis'], ['الأزمنة للتأدب والمسافة', 'Tense for Distance & Politeness'],
  ['فروق الأفعال الناقصة الدقيقة', 'Modal Nuance'], ['تراكيب التوكيد: by no means', 'Emphatic Negation'],
  ['النقل المتقدم', 'Advanced Reported Speech'], ['المجهول المتقدم للنقل', 'Advanced Passive Reporting'],
  ['الجمل الاسمية: whether و that', 'Nominal Clauses'], ['المقارنة المتقدمة', 'Advanced Comparison'],
  ['لغة الموقف الأكاديمي', 'Academic Stance & Hedging'], ['الروابط الرسمية: notwithstanding', 'Formal Linkers'],
  ['التقديم للأسلوب', 'Fronting for Style'], ['التراكيب الاصطلاحية', 'Idiomatic Grammar'],
  ['الرسمي مقابل غير الرسمي', 'Formal vs Informal Grammar'], ['الجمل المركبة المعقدة', 'Complex Sentences'],
  ['البدل', 'Apposition'], ['التوازي في التراكيب', 'Parallelism'],
  ['تجنب المعدّلات المعلقة', 'Dangling Modifiers'], ['التعبير عن الكمية والنسبة', 'Quantity & Proportion'],
  ['أدوات التعريف للتعميم', 'Generic Reference with Articles'], ['أنماط الأفعال الدقيقة', 'Subtle Verb Patterns'],
  ['بناء الكلمات: السوابق واللواحق', 'Word Formation'], ['علامات الترقيم والقواعد', 'Punctuation & Grammar'],
  ['التنويع الأسلوبي', 'Stylistic Variation'], ['مراجعة المستوى C2', 'C2 Review']
];

/** Advanced grammar track: 4 levels × 30 lessons. Level 1 (B1) is built; levels 2–4 are titles only for now. */
export const ADVANCED_TRACK: SaraTrack = {
  id: 'advanced',
  titleAr: 'القواعد المتقدمة',
  titleEn: 'Advanced Grammar',
  levels: [
    { id: 'b1', titleAr: 'المستوى المتوسط (B1)', titleEn: 'Intermediate (B1)' },
    { id: 'b2', titleAr: 'فوق المتوسط (B2)', titleEn: 'Upper-Intermediate (B2)' },
    { id: 'c1', titleAr: 'المتقدم (C1)', titleEn: 'Advanced (C1)' },
    { id: 'c2', titleAr: 'الاحترافي (C2)', titleEn: 'Proficiency (C2)' }
  ],
  lessons: [
    ...ADVANCED_B1,
    ...titles('b2', 31, B2),
    ...titles('c1', 61, C1),
    ...titles('c2', 91, C2)
  ]
};
