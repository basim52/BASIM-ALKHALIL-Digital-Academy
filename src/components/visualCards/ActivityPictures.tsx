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
type Sc = { e: string[]; bg: string; who: 'salma' | 'yousef' };
const SCEN: [RegExp, Sc][] = [
  [/مطعم|مقهى|قهوة|طعام|أكل|طلب|caf|restaurant|food|order/i, { e: ['☕', '🍰'], bg: '#FFF4E0', who: 'salma' }],
  [/مطار|سفر|رحلة|طيران|airport|travel|flight/i, { e: ['✈️', '🧳'], bg: '#E6F1FF', who: 'yousef' }],
  [/فندق|حجز|hotel|book/i, { e: ['🏨', '🛎️'], bg: '#EEF0FF', who: 'salma' }],
  [/تسوق|متجر|سوق|شراء|ملابس|shop|store|buy|price/i, { e: ['🛍️', '🏷️'], bg: '#FDEBF3', who: 'salma' }],
  [/طبيب|مستشفى|صيدلي|صحة|مريض|doctor|health|pharm/i, { e: ['🧑‍⚕️', '💊'], bg: '#E8FAF2', who: 'yousef' }],
  [/اتجاه|طريق|عنوان|مكان|direction|way|map/i, { e: ['🗺️', '📍'], bg: '#F1F8E8', who: 'yousef' }],
  [/مدرسة|جامعة|دراسة|صف|school|class|study/i, { e: ['🏫', '📚'], bg: '#FFF8E0', who: 'salma' }],
  [/هاتف|اتصال|مكالمة|phone|call/i, { e: ['📱', '💬'], bg: '#EAF6FF', who: 'yousef' }],
  [/عائلة|أسرة|بيت|منزل|family|home/i, { e: ['🏠', '❤️'], bg: '#FFF0F0', who: 'salma' }],
  [/عمل|وظيفة|مقابلة|اجتماع|work|job|interview|meeting/i, { e: ['💼', '🤝'], bg: '#EEF2F7', who: 'yousef' }],
  [/تعارف|تحية|مرحبا|نفسك|greet|hello|introduc/i, { e: ['👋', '😊'], bg: '#FFF8E0', who: 'salma' }],
  [/طقس|جو|weather/i, { e: ['☀️', '🌧️'], bg: '#E6F1FF', who: 'yousef' }],
  [/رياضة|نادي|sport|gym/i, { e: ['⚽', '🏃'], bg: '#E8FAF2', who: 'yousef' }],
];
export const ScenarioArt: React.FC<{ title: string; className?: string; icon?: string }> = ({ title, className = 'w-full h-20', icon }) => {
  const sc = (SCEN.find(([r]) => r.test(title)) || [null, { e: [icon || '💬', '⭐'], bg: '#F7FAFF', who: 'salma' as const }])[1];
  const e = icon ? [icon, sc.e[1]] : sc.e;
  return (
    <svg viewBox="0 0 240 90" direction="ltr" style={LTR} className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <rect width="240" height="90" rx="10" fill={sc.bg} />
      <rect y="78" width="240" height="12" fill="#EEF2F7" />
      <Mascot x={58} y={50} s={0.95} arms="up" />
      <Kid x={182} y={50} s={0.95} who={sc.who} arms="front" flip />
      <text x="120" y="42" textAnchor="middle" fontSize="30">{e[0]}</text>
      <text x="120" y="74" textAnchor="middle" fontSize="18">{e[1]}</text>
      <g><rect x="6" y="5" width="30" height="15" rx="6" fill="#fff" stroke={NAVY} strokeWidth="1" /><path d="M24 20 l4 6 l2 -6 Z" fill="#fff" stroke={NAVY} strokeWidth="1" /><text x="21" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill={NAVY}>Hi!</text></g>
      <g><rect x="198" y="5" width="36" height="15" rx="6" fill={GOLD} /><path d="M206 20 l-2 6 l6 -6 Z" fill={GOLD} /><text x="216" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff">Hello</text></g>
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
  if (/^(think|three)\b/.test(t)) return 'tongueout';
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
