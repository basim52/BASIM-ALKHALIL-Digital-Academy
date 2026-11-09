/** «درس من اختياري»: Abboud says or types a topic; it is cleaned and checked before it becomes a lesson. */
export type TopicCheck = { ok: true; topic: string } | { ok: false; reason: 'empty' | 'too_long' | 'unsuitable' };
export const TOPIC_MAX = 40;
/** Ideas that are not already fixed lessons (animals, food… have their own lessons). */
export const TOPIC_IDEAS = ['⚽ كرة القدم', '🚀 الفضاء', '🚗 السيارات', '🦖 الديناصورات', '🌊 البحر', '🎨 الرسم'];
// Whole words (Arabic prefixes like ال/و/ب are stripped) so that e.g. «كرة القدم» never matches «دم».
// Not listed: words that fold onto innocent ones (كره ← كرة «ball»), and animals such as حمار.
const UNSUITABLE = new Set([
  'kill', 'killing', 'murder', 'blood', 'gun', 'weapon', 'bomb', 'war', 'knife', 'shoot', 'shooting', 'fight', 'drug', 'drugs', 'alcohol', 'beer', 'wine', 'drunk',
  'smoke', 'smoking', 'cigarette', 'vape', 'sex', 'sexy', 'porn', 'naked', 'nude', 'kiss', 'dating', 'gambling', 'casino', 'bet', 'betting', 'suicide', 'die', 'dead',
  'death', 'terror', 'terrorist', 'horror', 'hate', 'stupid', 'idiot', 'damn', 'hell', 'shit', 'fuck',
  'قتل', 'القتل', 'دم', 'دماء', 'مسدس', 'سلاح', 'اسلحه', 'قنبله', 'حرب', 'حروب', 'سكين', 'مخدرات', 'مخدر', 'حشيش', 'خمر', 'خمور', 'كحول', 'بيره', 'سكران', 'تدخين', 'دخان',
  'سجائر', 'سيجاره', 'شيشه', 'جنس', 'اباحي', 'اباحيه', 'عري', 'عاري', 'بوس', 'تقبيل', 'مواعده', 'قمار', 'رهان', 'انتحار', 'موت', 'ارهاب', 'رعب', 'شتيمه', 'شتائم', 'غبي'
]);
function fold(text: string) {
  return text.normalize('NFKC').toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
}
function candidates(word: string) {
  const out = [word];
  for (const prefix of ['وال', 'بال', 'فال', 'كال', 'لل', 'ال', 'و', 'ب', 'ل', 'ف']) if (word.startsWith(prefix) && word.length - prefix.length >= 2) out.push(word.slice(prefix.length));
  if (/^[a-z]+s$/.test(word)) out.push(word.slice(0, -1));
  return out;
}
export function sanitizeTopic(raw: unknown): TopicCheck {
  if (typeof raw !== 'string') return { ok: false, reason: 'empty' };
  // Keep letters, numbers, spaces and simple joiners only: no markup, quotes, emoji tricks or control characters.
  const topic = raw.normalize('NFKC').replace(/[^\p{L}\p{M}\p{N}\s'-]/gu, ' ').replace(/\s+/g, ' ').trim();
  if ((topic.match(/\p{L}/gu) || []).length < 2) return { ok: false, reason: 'empty' };
  if (topic.length > TOPIC_MAX) return { ok: false, reason: 'too_long' };
  const words = fold(topic).split(/[\s'-]+/).filter(Boolean);
  if (words.some(word => candidates(word).some(c => UNSUITABLE.has(c)))) return { ok: false, reason: 'unsuitable' };
  return { ok: true, topic };
}
export function topicMessage(reason: Exclude<TopicCheck, { ok: true }>['reason']) {
  if (reason === 'too_long') return 'موضوع جميل! اختصره بكلمة أو كلمتين، مثل «كرة القدم».';
  if (reason === 'unsuitable') return 'خلّنا نختار موضوعاً يناسب فصلنا الصغير 🌟 مثل الحيوانات أو كرة القدم أو الفضاء.';
  return 'ما وصلني الموضوع. قل أو اكتب شيئاً تحبه، مثل «الحيوانات».';
}
