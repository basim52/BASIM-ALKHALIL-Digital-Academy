/** Display-only pictures for Sara's activities (no scoring / progress logic here). All SVGs are forced LTR. */
import React from 'react';
import { Mascot, Kid, VisualCardArt, type Scene } from './VisualCardArt';
import { SARA_VISUAL_CARDS } from '../../data/saraVisualCards';
import { VISUAL_DICTIONARY } from '../../data/visualDictionary';

const NAVY = '#002147', GOLD = '#C49E3A';
const LTR = { direction: 'ltr' as const };

/* ---------- word → picture ---------- */
const EXTRA: Record<string, string> = {
  ship: '🚢', sheep: '🐑', live: '🏠', leave: '🚪', full: '🍽️', fool: '🤡', bat: '🦇', bet: '🎲', cat: '🐱', cut: '✂️', pen: '🖊️', pan: '🍳',
  think: '🤔', sink: '🚰', very: '💯', berry: '🍓', fan: '🪭', van: '🚐', pull: '🫷', pool: '🏊', bed: '🛏️', bad: '👎', cup: '☕', cap: '🧢',
  hot: '🔥', hut: '🛖', boy: '👦', buy: '🛒', walk: '🚶', work: '💼', desert: '🏜️', dessert: '🍰', three: '3️⃣', tree: '🌳', rice: '🍚', lice: '🪳',
  coffee: '☕', tea: '🍵', water: '💧', airport: '✈️', hotel: '🏨', doctor: '🧑‍⚕️', school: '🏫', phone: '📱', car: '🚗', bus: '🚌', train: '🚆',
  ticket: '🎫', money: '💵', apple: '🍎', banana: '🍌', bread: '🍞', milk: '🥛', book: '📖', house: '🏠', dog: '🐶', sun: '☀️', rain: '🌧️',
  happy: '😊', sad: '😢', eat: '🍽️', drink: '🥤', sleep: '😴', run: '🏃', swim: '🏊', read: '📖', write: '✍️', play: '⚽', cook: '🍳',
  bike: '🚲', plane: '✈️', pizza: '🍕', chicken: '🍗', fish: '🐟', egg: '🥚', shoes: '👟', shirt: '👕', key: '🔑', door: '🚪', window: '🪟',
  friend: '🤝', family: '👨‍👩‍👧', mother: '👩', father: '👨', baby: '👶', teacher: '🧑‍🏫', hospital: '🏥', shop: '🛍️', market: '🛒', menu: '📋',
};
const STOP = new Set(['the', 'and', 'you', 'are', 'was', 'were', 'have', 'has', 'this', 'that', 'with', 'for', 'not', 'but', 'what', 'which', 'when', 'where', 'who', 'how', 'can', 'will', 'did', 'does', 'his', 'her', 'she', 'they', 'them', 'our', 'your', 'its', 'from', 'there', 'then', 'than', 'very', 'live']);
const PICTURABLE: Scene['k'][] = ['emoji', 'kid', 'many', 'color', 'weather', 'body', 'shape', 'mood', 'family', 'yesno', 'cmp'];
let INDEX: Map<string, Scene> | null = null;
function index() {
  if (INDEX) return INDEX;
  const m = new Map<string, Scene>();
  for (const [w, e] of Object.entries(EXTRA)) m.set(w, { k: 'emoji', e });
  for (const c of VISUAL_DICTIONARY) for (const it of c.items) if (it.emoji) m.set(it.word.toLowerCase().trim(), { k: 'emoji', e: it.emoji });
  for (const sets of Object.values(SARA_VISUAL_CARDS)) for (const s of sets) for (const c of s.cards) {
    const w = c.en.toLowerCase().replace(/^(a|an|the|to)\s+/, '').trim();
    if (!w.includes(' ') && PICTURABLE.includes(c.scene.k) && !m.has(w)) m.set(w, c.scene);
  }
  return (INDEX = m);
}
/** A picture for one word / short option (exact match), or null. */
export function pictureForWord(text: string): Scene | null {
  const w = text.toLowerCase().replace(/[^a-z' ]/g, '').trim();
  return w ? index().get(w) || index().get(w.replace(/s$/, '')) || null : null;
}
/** A picture for a sentence: the longest picturable content word, or null. */
export function pictureForText(text: string): Scene | null {
  const words = (text.toLowerCase().match(/[a-z]{3,}/g) || []).filter(w => !STOP.has(w)).sort((a, b) => b.length - a.length);
  for (const w of words) { const s = pictureForWord(w); if (s) return s; }
  return null;
}
export const PictureHint: React.FC<{ text: string; className?: string; word?: boolean }> = ({ text, className = 'w-16 h-14', word }) => {
  const s = word ? pictureForWord(text) : pictureForText(text);
  return s ? <span dir="ltr" className={`inline-block shrink-0 rounded-lg overflow-hidden border border-amber-200 bg-white ${className}`}><VisualCardArt scene={s} className="w-full h-full" /></span> : null;
};

/* ---------- role-play / lesson scenarios ---------- */
/** One scene per topic: two pictures + the two speech bubbles (بندق says `a`, the kid answers `b`).
 *  Bubbles are scene-specific; a scene with nothing to say gets none. Matched on the English title (word-bounded). */
type Sc = { id: string; r: RegExp; e: [string, string]; bg: string; who: 'salma' | 'yousef'; a?: string; b?: string };
export const SCENES: Sc[] = [
  { id: 'grammar', r: /present perfect|conditional|used to|past (simple|continuous)|passive|relative|reported|should|must|wish\b|speculat|hedging|register|euphemism/i, e: ['📘', '✏️'], bg: '#F7FAFF', who: 'salma' },
  { id: 'listen-skill', r: /skimming a|linking|weak forms|intonation|flap|contraction|elision|homophone|skimming|scanning|inference|between the lines|fillers|connected speech|phrasal/i, e: ['👂', '🎧'], bg: '#F7FAFF', who: 'yousef' },
  { id: 'writing', r: /\bemail|^writing|cover letter|letter|essay|paragraph|summary|editing|linkedin|proofread|formal request|contract/i, e: ['✍️', '📧'], bg: '#F7FAFF', who: 'salma' },
  { id: 'lecture', r: /lecture|^talk:|philosophy|psychology|history|abstract|culture/i, e: ['🎓', '📖'], bg: '#F3EEFF', who: 'salma', a: "Let's begin today's lecture." },
  { id: 'debate', r: /\bdebat|\bpanel\b|^discussion\b/i, e: ['🗣️', '🎤'], bg: '#F3EEFF', who: 'salma', a: 'I disagree, because…', b: 'Fair point, however…' },
  { id: 'greet', r: /\bgreeting|\bintroducing people|\bhello\b/i, e: ['👋', '😊'], bg: '#FFF8E0', who: 'salma', a: 'Hi! How are you?', b: 'Fine, thanks!' },
  { id: 'visa', r: /\bvisa\b/i, e: ['🛂', '📄'], bg: '#E6F1FF', who: 'yousef', a: 'Why do you want to study here?', b: 'For my degree.' },
  { id: 'jobint', r: /\bjob interview|interview:? (about|final|strength|extract)|\binterview basics|behavioural interview|admission interview|tell me about yourself/i, e: ['💼', '🤝'], bg: '#EEF2F7', who: 'yousef', a: 'Tell me about yourself.', b: "I'm a team player." },
  { id: 'media', r: /\bmedia\b|\bradio\b|interview with|interview:|\bpodcast\b/i, e: ['🎙️', '📻'], bg: '#F3EEFF', who: 'salma', a: 'Welcome to the show!', b: 'Thanks for having me.' },
  { id: 'meetpeople', r: /meeting people|talking about yourself|names, countries/i, e: ['🌍', '🪪'], bg: '#F1F8E8', who: 'salma', a: "I'm from Riyadh.", b: 'Nice to meet you!' },
  { id: 'luggage', r: /\bluggage\b/i, e: ['🧳', '❓'], bg: '#E6F1FF', who: 'yousef', a: "My bag didn't arrive.", b: "Let's fill in a form." },
  { id: 'plane', r: /on the plane|missed connection/i, e: ['✈️', '🧃'], bg: '#E6F1FF', who: 'salma', a: 'Chicken or fish?', b: 'Chicken, please.' },
  { id: 'airport', r: /\bairport\b|\bpassport\b|\bflight|arranging travel/i, e: ['✈️', '🛂'], bg: '#E6F1FF', who: 'yousef', a: 'Passport, please.', b: 'Here you are.' },
  { id: 'hotelprob', r: /hotel (room problem|complaint)/i, e: ['🏨', '🔧'], bg: '#EEF0FF', who: 'salma', a: "The AC isn't working.", b: "I'll send someone now." },
  { id: 'hotel', r: /\bhotel\b|changing a booking/i, e: ['🏨', '🔑'], bg: '#EEF0FF', who: 'salma', a: 'I have a booking.', b: "Here's your key." },
  { id: 'allergy', r: /allerg/i, e: ['🥜', '🚫'], bg: '#FFF4E0', who: 'salma', a: 'Does this have nuts?', b: 'No, it\u2019s nut-free.' },
  { id: 'bill', r: /the bill\b/i, e: ['🧾', '💳'], bg: '#FFF4E0', who: 'yousef', a: 'Can we have the bill?', b: 'Of course.' },
  { id: 'delivery', r: /delivery/i, e: ['🛵', '🍕'], bg: '#FFF4E0', who: 'yousef', a: 'Your order is here!', b: 'Thank you!' },
  { id: 'cooking', r: /cooking|recipe/i, e: ['🍳', '🥗'], bg: '#FFF4E0', who: 'salma', a: 'First, chop the onions.', b: 'Got it!' },
  { id: 'cafe', r: /\bfood\b|\bdrinks?\b|restaurant|\bcaf[eé]|\bdinner\b|ordering|booking for an occasion/i, e: ['☕', '🍰'], bg: '#FFF4E0', who: 'salma', a: 'Can I have a coffee?', b: 'Sure!' },
  { id: 'dentist', r: /dentist/i, e: ['🦷', '🪥'], bg: '#E8FAF2', who: 'yousef', a: 'My tooth hurts.', b: "Let's take a look." },
  { id: 'emergency', r: /emergenc|\bthe er\b|accident|theft/i, e: ['🚑', '🆘'], bg: '#FDECEC', who: 'yousef', a: 'Please help, quickly!', b: 'Help is coming.' },
  { id: 'pharmacy', r: /pharmacy/i, e: ['💊', '🧴'], bg: '#E8FAF2', who: 'salma', a: 'Something for a cold?', b: 'Try these tablets.' },
  { id: 'doctor', r: /doctor|clinic|health|antibiotic|test results|sugar|sleep/i, e: ['🧑‍⚕️', '🩺'], bg: '#E8FAF2', who: 'yousef', a: 'I have a headache.', b: 'Rest and drink water.' },
  { id: 'clothes', r: /clothes|fitting/i, e: ['👕', '🏷️'], bg: '#FDEBF3', who: 'salma', a: 'Do you have a medium?', b: 'Yes, try it on.' },
  { id: 'returns', r: /return|exchange|refund/i, e: ['📦', '↩️'], bg: '#FDEBF3', who: 'salma', a: "I'd like to return this.", b: 'Do you have the receipt?' },
  { id: 'supermarket', r: /supermarket/i, e: ['🛒', '🍎'], bg: '#F1F8E8', who: 'salma', a: 'Where is the milk?', b: 'Aisle three.' },
  { id: 'phonebuy', r: /buying a phone/i, e: ['📱', '🏷️'], bg: '#FDEBF3', who: 'yousef', a: 'How much is this phone?', b: "It's on sale today." },
  { id: 'negotiate', r: /negotiat|closing a deal|supplier|\bdeal\b/i, e: ['🤝', '💰'], bg: '#FFF8E0', who: 'yousef', a: 'Can you do a better price?', b: "Let's meet halfway." },
  { id: 'raise', r: /salary|\braise\b/i, e: ['💵', '📈'], bg: '#FFF8E0', who: 'yousef', a: 'I think I deserve a raise.', b: "Let's discuss it." },
  { id: 'numbers', r: /numbers|prices|shopping/i, e: ['🔢', '🕒'], bg: '#FDEBF3', who: 'salma', a: 'How much is it?', b: "It's ten riyals." },
  { id: 'directions', r: /direction|helping a visitor/i, e: ['🗺️', '📍'], bg: '#F1F8E8', who: 'yousef', a: "Where's the museum?", b: 'Turn left here.' },
  { id: 'taxi', r: /taxi|metro|getting around|transport|\brail\b|renting a car/i, e: ['🚕', '🚇'], bg: '#FFF8E0', who: 'yousef', a: 'To the airport, please.', b: 'Hop in!' },
  { id: 'garage', r: /garage/i, e: ['🚗', '🔧'], bg: '#EEF2F7', who: 'yousef', a: 'My car makes a noise.', b: "We'll check it." },
  { id: 'bank', r: /\bbank\b|insurance|disputing a bill/i, e: ['🏦', '💳'], bg: '#EEF2F7', who: 'salma', a: 'My card is blocked.', b: "I'll fix it for you." },
  { id: 'money', r: /financ|money|econom|saving/i, e: ['💰', '📊'], bg: '#F1F8E8', who: 'yousef', a: 'How can I save more?', b: 'Make a monthly budget.' },
  { id: 'landlord', r: /landlord|apartment|\bflat\b|home repair|neighbour/i, e: ['🏠', '🔑'], bg: '#FFF0F0', who: 'salma', a: 'The sink is leaking.', b: "I'll send a plumber." },
  { id: 'techsupport', r: /technical|internet support/i, e: ['💻', '📶'], bg: '#EAF6FF', who: 'yousef', a: "My internet isn't working.", b: 'Restart the router.' },
  { id: 'phone', r: /\bphone\b|\bcalls?\b|voicemail|leaving a message/i, e: ['📱', '💬'], bg: '#EAF6FF', who: 'yousef', a: 'Can I leave a message?', b: 'Of course.' },
  { id: 'appointment', r: /appointment|barber/i, e: ['📅', '✂️'], bg: '#EAF6FF', who: 'salma', a: 'Is 4 pm free?', b: "Yes, see you then." },
  { id: 'parentteacher', r: /parent-teacher/i, e: ['🏫', '📒'], bg: '#FFF8E0', who: 'salma', a: 'How is my son doing?', b: "He's doing well." },
  { id: 'school', r: /classroom|school|project|stud(y|ies|ent)|universit|admission|exam|extension|\bphd\b|seminar|\bviva\b/i, e: ['🏫', '📚'], bg: '#FFF8E0', who: 'salma', a: 'Can you repeat that, please?', b: 'Sure!' },
  { id: 'weather', r: /weather|temperature|climate/i, e: ['☀️', '🌧️'], bg: '#E6F1FF', who: 'yousef', a: "It's so hot today!", b: 'Let\u2019s stay inside.' },
  { id: 'gym', r: /\bgym\b|fitness/i, e: ['🏋️', '💪'], bg: '#E8FAF2', who: 'yousef', a: 'How many sets?', b: 'Three, then rest.' },
  { id: 'hobbies', r: /hobb|free time|likes|preferences/i, e: ['⚽', '🎨'], bg: '#E8FAF2', who: 'salma', a: 'What do you do for fun?', b: 'I love drawing.' },
  { id: 'invite', r: /invit|plans|suggest|organising an event|group trip|volunteer|fundrais/i, e: ['🎉', '📅'], bg: '#FFF0F6', who: 'salma', a: 'Are you free on Friday?', b: "Yes, I'd love to!" },
  { id: 'holiday', r: /holiday|museum|weekend|\btour\b/i, e: ['🏖️', '📸'], bg: '#E6F1FF', who: 'salma', a: 'What did you do?', b: 'We went to the beach.' },
  { id: 'congrats', r: /congratulat|occasion|toast|gratitude|thanking|achievement/i, e: ['🎊', '🎁'], bg: '#FFF0F6', who: 'salma', a: 'Congratulations!', b: 'Thank you so much!' },
  { id: 'sympathy', r: /condolence|sympathy|comfort|bad news|offering support|feelings/i, e: ['🤗', '💙'], bg: '#EEF0FF', who: 'salma', a: "I'm so sorry.", b: 'Thank you for being here.' },
  { id: 'apology', r: /apolog|excuse|owning a mistake|late\b/i, e: ['🙏', '⏰'], bg: '#FFF4E0', who: 'yousef', a: "Sorry I'm late.", b: 'No problem.' },
  { id: 'complaint', r: /complain|angry customer|customer service|escalat/i, e: ['🧾', '😕'], bg: '#FDECEC', who: 'salma', a: 'This arrived broken.', b: "We'll replace it." },
  { id: 'favour', r: /favou?r|asking for help|\bleave\b|recommend|reference/i, e: ['🙋', '🤝'], bg: '#F1F8E8', who: 'yousef', a: 'Could you do me a favour?', b: 'Sure, what is it?' },
  { id: 'saying-no', r: /saying no|turning down|resign|pushing back|conceding/i, e: ['✋', '🙂'], bg: '#EEF2F7', who: 'yousef', a: "I'm afraid I can't.", b: 'I understand.' },
  { id: 'clarify', r: /clarif|enquir|checking|probing|active listening|interrupt/i, e: ['❓', '👂'], bg: '#EAF6FF', who: 'salma', a: 'Sorry, do you mean…?', b: 'Yes, exactly.' },
  { id: 'feedback', r: /feedback|criticism|performance|delegat|motivating|coaching|poor performance/i, e: ['📋', '⭐'], bg: '#EEF2F7', who: 'yousef', a: 'Great work on this!', b: 'Thanks, I tried hard.' },
  { id: 'opinion', r: /opinion|agree|disagree|debat|pros|cons|rebuttal|persua|panel|mediat|conflict|dispute|discussion|discussing/i, e: ['🗣️', '⚖️'], bg: '#F3EEFF', who: 'yousef', a: 'In my opinion…', b: 'I see your point, but…' },
  { id: 'meeting', r: /meeting|\bteam\b|board|colleague|supervisor|remote work|four-day|\bwork\b|networking|chairing|virtual|announcement|client/i, e: ['💼', '📊'], bg: '#EEF2F7', who: 'yousef', a: 'Shall we start the meeting?', b: "Yes, let's begin." },
  { id: 'present', r: /present|speech|pitch|signposting|storytelling|idea\b/i, e: ['🎤', '📊'], bg: '#FFF8E0', who: 'salma', a: "Today I'll talk about…" },
  { id: 'story', r: /\bstor(y|ies)\b/i, e: ['📖', '😲'], bg: '#FFF8E0', who: 'salma', a: 'Guess what happened!', b: 'Tell me!' },
  { id: 'smalltalk', r: /small talk|react|empathy|banter|humour|idiom|ending conversations|awkward/i, e: ['☕', '😄'], bg: '#FFF4E0', who: 'salma', a: 'How was your weekend?', b: 'Really nice, thanks!' },
  { id: 'family', r: /famil|relationship|describing people|looks and personality/i, e: ['👨‍👩‍👧', '❤️'], bg: '#FFF0F0', who: 'salma', a: 'This is my sister.', b: 'She looks like you!' },
  { id: 'news', r: /\bnews\b|report|documentary|update|data|trends/i, e: ['📰', '📈'], bg: '#EEF2F7', who: 'yousef', a: "Here's today's news." },
];
export const scenarioFor = (title: string) => SCENES.find(x => x.r.test(title)) || null;
const bubbleW = (t: string) => Math.min(108, 10 + t.length * 4.6);
export const ScenarioArt: React.FC<{ title: string; className?: string; icon?: string }> = ({ title, className = 'w-full h-20', icon }) => {
  const sc = scenarioFor(title);
  const e = [icon || sc?.e[0] || '💬', sc?.e[1] || '⭐'];
  const a = sc?.a, b = sc?.b, who = sc?.who || 'salma';
  const wa = a ? bubbleW(a) : 0, wb = b ? bubbleW(b) : 0;
  return (
    <svg viewBox="0 0 240 90" direction="ltr" style={LTR} className={className} role="img" aria-label={[a, b].filter(Boolean).join(' / ') || title} preserveAspectRatio="xMidYMid meet">
      <rect width="240" height="90" rx="10" fill={sc?.bg || '#F7FAFF'} />
      <rect y="78" width="240" height="12" fill="#EEF2F7" />
      <Mascot x={50} y={54} s={0.85} arms="up" />
      <Kid x={190} y={54} s={0.85} who={who} arms="front" flip />
      <text x="120" y="58" textAnchor="middle" fontSize="26">{e[0]}</text>
      <text x="120" y="80" textAnchor="middle" fontSize="15">{e[1]}</text>
      {a && <g><rect x="4" y="3" width={wa} height="15" rx="6" fill="#fff" stroke={NAVY} strokeWidth="1" /><path d="M34 18 l4 6 l3 -6 Z" fill="#fff" stroke={NAVY} strokeWidth="1" /><text x={4 + wa / 2} y="13.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={NAVY}>{a}</text></g>}
      {b && <g><rect x={236 - wb} y={a && wa + wb > 228 ? 21 : 3} width={wb} height="15" rx="6" fill={GOLD} /><text x={236 - wb / 2} y={(a && wa + wb > 228 ? 21 : 3) + 10.5} textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#fff">{b}</text></g>}
    </svg>
  );
};

/* ---------- phonetic lab: how the mouth makes the sound ---------- */
export type MouthKind = 'lips' | 'lipteeth' | 'tongueout' | 'round' | 'smile' | 'open' | 'tip' | 'back' | 'melody';
export const MOUTH_TIP: Record<MouthKind, string> = {
  lips: 'الشفتان تنطبقان ثم تنفتحان (P بدون صوت، B بصوت)',
  lipteeth: 'الأسنان العليا تلمس الشفة السفلى (F / V)',
  tongueout: 'طرف اللسان بين الأسنان ونفخ هواء (TH)',
  round: 'الشفتان مدوّرتان للأمام',
  smile: 'ابتسم وافرد الشفتين',
  open: 'افتح الفم واسعاً والفك للأسفل',
  tip: 'طرف اللسان يرتفع خلف الأسنان العليا',
  back: 'مؤخرة اللسان أو الحلق يعمل الصوت',
  melody: 'الصوت يطلع وينزل مثل اللحن',
};
export function mouthKindFor(text: string): MouthKind {
  const t = text.toLowerCase();
  if (/^(think|three)\b(?!-)/.test(t)) return 'tongueout';
  if (/-tion|-sion|-ture|-sure|-age\b|linking with w|linking r\b/.test(t)) return 'round';
  if (/can vs can't/.test(t)) return 'open';
  if (/dropping h|ch as k/.test(t)) return 'back';
  if (/^three-consonant/.test(t)) return 'tip';
  if (/disappearing|-ous\b|unfinished|final challenge|voicing/.test(t)) return 'melody';
  if (/silent|stress|schwa|weak|strong form|linking|intonation|rhythm|reduction|elision|assimilation|thought group|pitch|pace|shadow|reading|presentation|contraction|filler|emphatic|exclamation|question|homophone|spelling|number|year|word famil/.test(t)) return 'melody';
  if (/\bng\b|\bk vs|\bh vs|glottal/.test(t)) return 'back';
  if (/^(ship|live)\b/.test(t)) return 'smile';
  if (/^(bat|cat|pen)\b/.test(t)) return 'open';
  if (/^(full|pull)\b/.test(t)) return 'round';
  if (/^(very|fan)\b/.test(t)) return 'lipteeth';
  if (/\bth\b|th /.test(t) || /^(think|three|thin|this|that|bath|mouth|thought)/.test(t)) return 'tongueout';
  if (/\bf vs v|v vs w|\bf\b|\bv\b/.test(t)) return /v vs w/.test(t) ? 'round' : 'lipteeth';
  if (/p vs b|\bp\b|\bb\b|can vs/.test(t)) return 'lips';
  if (/\bsh\b|\bch\b|\bzh\b|oo|\bow|\boy|oa|aw|\bo vs|ough|\bw\b|walk/.test(t)) return 'round';
  if (/ee|long a|\bi vs|\by vs/.test(t)) return 'smile';
  if (/\bu vs|\be vs a|\bar\b|cup|cap|bad|cut/.test(t)) return 'open';
  if (/\br vs l|\bl\b|\bt\b|\bd\b|\bs\b|\bz\b|\bn\b|flap|dark l|final|cluster|-ed|-s /.test(t)) return 'tip';
  if (/\bk\b|\bg\b|ng|\bh\b|glottal/.test(t)) return 'back';
  return 'melody';
}
export const MouthArt: React.FC<{ kind: MouthKind; label?: string; className?: string }> = ({ kind, label, className = 'w-20 h-16' }) => {
  const lip = '#E0607E', teeth = '#fff', tongue = '#F59AAE';
  let m: React.ReactNode;
  switch (kind) {
    case 'lips': m = <><path d="M30 52 q30 -10 60 0 q-30 12 -60 0 Z" fill={lip} /><line x1="30" y1="52" x2="90" y2="52" stroke="#A33A55" strokeWidth="2" /><text x="98" y="40" fontSize="12">💨</text></>; break;
    case 'lipteeth': m = <><path d="M30 46 q30 -14 60 0 Z" fill={lip} /><rect x="42" y="45" width="36" height="7" rx="2" fill={teeth} stroke="#ccc" /><path d="M30 54 q30 16 60 0 q-30 -4 -60 0 Z" fill={lip} /></>; break;
    case 'tongueout': m = <><path d="M28 44 q32 -16 64 0 q-32 26 -64 0 Z" fill="#7A1F35" /><rect x="40" y="42" width="40" height="6" rx="2" fill={teeth} /><rect x="40" y="54" width="40" height="5" rx="2" fill={teeth} /><ellipse cx="60" cy="52" rx="14" ry="6" fill={tongue} /><path d="M28 44 q32 -16 64 0" stroke={lip} strokeWidth="5" fill="none" /><path d="M28 44 q32 26 64 0" stroke={lip} strokeWidth="5" fill="none" /></>; break;
    case 'round': m = <><ellipse cx="60" cy="50" rx="15" ry="13" fill={lip} /><ellipse cx="60" cy="50" rx="7" ry="6" fill="#7A1F35" /></>; break;
    case 'smile': m = <><path d="M22 44 q38 4 76 0 q-38 22 -76 0 Z" fill="#7A1F35" /><rect x="34" y="44" width="52" height="6" rx="2" fill={teeth} /><path d="M22 44 q38 4 76 0" stroke={lip} strokeWidth="4" fill="none" /><path d="M22 44 q38 22 76 0" stroke={lip} strokeWidth="4" fill="none" /></>; break;
    case 'open': m = <><ellipse cx="60" cy="52" rx="22" ry="18" fill="#7A1F35" stroke={lip} strokeWidth="5" /><rect x="46" y="35" width="28" height="6" rx="2" fill={teeth} /><ellipse cx="60" cy="64" rx="13" ry="5" fill={tongue} /></>; break;
    case 'tip': m = <><path d="M28 44 q32 -14 64 0 q-32 26 -64 0 Z" fill="#7A1F35" stroke={lip} strokeWidth="5" /><rect x="42" y="40" width="36" height="5" rx="2" fill={teeth} /><path d="M40 60 q16 -2 22 -14 q4 10 18 14 Z" fill={tongue} /><text x="96" y="38" fontSize="11">⬆️</text></>; break;
    case 'back': m = <><path d="M28 44 q32 -14 64 0 q-32 26 -64 0 Z" fill="#7A1F35" stroke={lip} strokeWidth="5" /><path d="M36 58 q24 -18 48 -6 v4 h-48 Z" fill={tongue} /><circle cx="84" cy="48" r="3" fill="#FCD34D" /></>; break;
    default: m = <><path d="M32 52 q28 10 56 0" stroke={lip} strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M8 26 q12 -14 24 0 t24 0 t24 0 t24 0" stroke={GOLD} strokeWidth="3" fill="none" /><text x="100" y="18" fontSize="11">🎵</text></>;
  }
  return (
    <svg viewBox="0 0 120 84" direction="ltr" style={LTR} className={className} role="img" aria-label={MOUTH_TIP[kind]}>
      <rect width="120" height="84" rx="10" fill="#FFF4EC" />
      <ellipse cx="60" cy="48" rx="46" ry="34" fill="#F2C9A0" />
      <circle cx="38" cy="22" r="2.5" fill={NAVY} /><circle cx="82" cy="22" r="2.5" fill={NAVY} />
      {m}
      {label && <text x="60" y="81" textAnchor="middle" fontSize="9" fontWeight="900" fill={NAVY}>{label}</text>}
    </svg>
  );
};

/* ---------- achievements: illustrated badges ---------- */
export const BadgeArt: React.FC<{ icon: string; unlocked: boolean; className?: string }> = ({ icon, unlocked, className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 60 60" direction="ltr" style={{ ...LTR, filter: unlocked ? undefined : 'grayscale(1)', opacity: unlocked ? 1 : 0.55 }} className={className} role="img" aria-hidden>
    <path d="M18 40 l-6 18 l9 -4 l5 7 l4 -17 Z" fill={unlocked ? '#B91C1C' : '#64748B'} />
    <path d="M42 40 l6 18 l-9 -4 l-5 7 l-4 -17 Z" fill={unlocked ? '#1D4ED8' : '#64748B'} />
    <circle cx="30" cy="28" r="22" fill={unlocked ? GOLD : '#94A3B8'} stroke={unlocked ? '#8A6A1F' : '#475569'} strokeWidth="2" />
    <circle cx="30" cy="28" r="16" fill={unlocked ? '#FFF7E0' : '#E2E8F0'} />
    {[0, 60, 120, 180, 240, 300].map(a => <circle key={a} cx={30 + 19 * Math.cos(a * Math.PI / 180)} cy={28 + 19 * Math.sin(a * Math.PI / 180)} r="1.6" fill="#fff" />)}
    <text x="30" y="34" textAnchor="middle" fontSize="16">{unlocked ? icon : '🔒'}</text>
  </svg>
);
