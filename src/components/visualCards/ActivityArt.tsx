import React from 'react';
import { Mascot, Kid } from './VisualCardArt';

/** Illustrated tiles for Sara's activities (بندق / سلمى / يوسف, flat style). Display-only. */
const NAVY = '#002147', GOLD = '#C49E3A', TEAL = '#0F9D8F', RED = '#E11D48';
const Bubble = ({ x, y, w = 30, t, c = '#fff' }: { x: number; y: number; w?: number; t: string; c?: string }) => (
  <g><rect x={x} y={y} width={w} height="16" rx="7" fill={c} stroke={NAVY} strokeWidth="1" /><path d={`M${x + 6} ${y + 16} l3 5 l3 -5`} fill={c} stroke={NAVY} strokeWidth="1" />
    <text x={x + w / 2} y={y + 11.5} fontSize="9" fontWeight="900" textAnchor="middle" fill={NAVY}>{t}</text></g>
);
const Book = ({ x, y, c = RED }: { x: number; y: number; c?: string }) => <g><rect x={x} y={y} width="18" height="22" rx="2" fill={c} /><rect x={x + 3} y={y + 3} width="12" height="3" fill="#fff" opacity=".7" /></g>;
const Star = ({ x, y, r = 8, c = GOLD }: { x: number; y: number; r?: number; c?: string }) => {
  const pts = Array.from({ length: 10 }, (_, i) => { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; return `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)}`; }).join(' ');
  return <polygon points={pts} fill={c} stroke={NAVY} strokeWidth=".8" />;
};
const Waves = ({ x, y }: { x: number; y: number }) => <g stroke={TEAL} strokeWidth="2" fill="none" strokeLinecap="round"><path d={`M${x} ${y - 6} q5 6 0 12`} /><path d={`M${x + 5} ${y - 10} q8 10 0 20`} /></g>;
const Ground = () => <rect x="0" y="76" width="120" height="14" fill="#EAF2E3" />;

const SCENES: Record<string, React.ReactNode> = {
  curricula: <><Ground /><Book x={14} y={52} c={RED} /><Book x={30} y={50} c={TEAL} /><Book x={46} y={54} c={GOLD} /><Mascot x={92} y={52} arms="up" /><Star x={70} y={22} /></>,
  listening: <><Ground /><Kid x={50} y={50} who="salma" /><path d="M38 31 Q50 14 62 31" stroke={NAVY} strokeWidth="3" fill="none" /><rect x="35" y="29" width="6" height="9" rx="2" fill={RED} /><rect x="59" y="29" width="6" height="9" rx="2" fill={RED} /><text x="88" y="34" fontSize="20">🎵</text></>,
  pronunciation: <><Ground /><Kid x={36} y={50} who="yousef" mood="excited" /><Waves x={50} y={31} /><Bubble x={66} y={16} w={44} t="/ʃ/ sh" /></>,
  daily: <><rect x="0" y="0" width="120" height="76" fill="#FFF4D6" /><Ground /><circle cx="98" cy="18" r="10" fill="#FDB813" /><Kid x={34} y={50} who="salma" arms="up" /><Mascot x={72} y={54} /><text x="52" y="22" fontSize="14">☕</text></>,
  exam: <><Ground /><rect x="20" y="18" width="40" height="52" rx="3" fill="#fff" stroke={NAVY} /><path d="M27 30 l4 4 l7 -8 M27 46 l4 4 l7 -8" stroke="#16A34A" strokeWidth="2.4" fill="none" /><rect x="42" y="30" width="12" height="3" fill="#CBD5E1" /><rect x="42" y="46" width="12" height="3" fill="#CBD5E1" /><Kid x={88} y={50} who="yousef" mood="proud" /><path d="M74 24 h28 l-14 -7 z" fill={NAVY} /></>,
  placement: <><Ground />{[0, 1, 2, 3].map(i => <rect key={i} x={14 + i * 18} y={70 - i * 12} width="18" height={6 + i * 12} fill={i === 2 ? GOLD : '#CBD5E1'} stroke={NAVY} strokeWidth=".8" />)}<Mascot x={59} y={24} s={.8} /><text x="96" y="40" fontSize="22">🎯</text></>,
  worksheet: <><Ground /><rect x="30" y="14" width="44" height="58" rx="3" fill="#fff" stroke={NAVY} />{[24, 34, 44, 54].map(y => <rect key={y} x="36" y={y} width="32" height="3" fill="#CBD5E1" />)}<path d="M80 66 l16 -30 l5 3 l-16 30 z" fill={GOLD} /><Kid x={100} y={52} who="salma" s={.8} /></>,
  whiteboard: <><Ground /><rect x="10" y="10" width="64" height="44" rx="3" fill="#0B3D2E" stroke="#8B5E34" strokeWidth="3" /><text x="42" y="30" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="900">A b c</text><text x="42" y="46" fontSize="10" fill={GOLD} textAnchor="middle">✨ I am…</text><Kid x={94} y={50} who="yousef" arms="point" flip /></>,
  free: <><Ground /><Kid x={30} y={50} who="salma" /><Kid x={90} y={50} who="yousef" flip /><Bubble x={8} y={6} w={34} t="Hi!" /><Bubble x={72} y={6} w={40} t="Hello!" c="#FFF4D6" /></>,
  live: <><Ground /><rect x="52" y="22" width="16" height="28" rx="8" fill={NAVY} /><path d="M46 40 q14 18 28 0 M60 52 v14" stroke={NAVY} strokeWidth="2.4" fill="none" /><circle cx="90" cy="20" r="6" fill={RED} /><Waves x={76} y={36} /><Mascot x={24} y={52} /></>,
  call: <><Ground /><rect x="44" y="14" width="30" height="54" rx="6" fill={NAVY} /><rect x="48" y="20" width="22" height="38" rx="2" fill="#E0F2FE" /><circle cx="59" cy="34" r="7" fill="#F2C9A0" /><path d="M52 31 q7 -11 14 0" fill={TEAL} /><text x="59" y="52" fontSize="6" textAnchor="middle" fill={NAVY} fontWeight="900">Sara</text><circle cx="59" cy="63" r="2.5" fill="#22C55E" /><Kid x={96} y={52} who="yousef" s={.8} /></>,
  roleplay: <><rect x="0" y="0" width="120" height="76" fill="#FDECEC" /><Ground /><rect x="44" y="40" width="36" height="20" fill="#8B5E34" /><text x="62" y="36" fontSize="14" textAnchor="middle">☕</text><Kid x={24} y={50} who="salma" /><Mascot x={100} y={52} acc="cap" flip /><Bubble x={68} y={6} w={44} t="Order?" /></>,
  speed: <><Ground /><Kid x={40} y={50} who="yousef" arms="up" mood="excited" /><path d="M8 40 h16 M4 48 h18 M10 56 h14" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" /><circle cx="90" cy="38" r="18" fill="#fff" stroke={NAVY} strokeWidth="2" /><path d="M90 38 v-12 M90 38 l8 5" stroke={RED} strokeWidth="2.4" strokeLinecap="round" /></>,
  phonetic: <><Ground /><ellipse cx="44" cy="40" rx="26" ry="18" fill="#F9A8B8" stroke={NAVY} /><ellipse cx="44" cy="42" rx="18" ry="9" fill="#7F1D1D" /><rect x="30" y="30" width="28" height="5" rx="2" fill="#fff" /><ellipse cx="44" cy="47" rx="9" ry="3.5" fill="#F472B6" /><Waves x={74} y={40} /><Bubble x={84} y={14} w={30} t="θ" /></>,
  voicecoach: <><Ground /><Kid x={34} y={50} who="salma" mood="excited" /><path d="M58 50 v-24 M66 50 v-34 M74 50 v-16 M82 50 v-28 M90 50 v-10" stroke={TEAL} strokeWidth="4" strokeLinecap="round" /><Star x={104} y={18} r={7} /></>,
  grammar: <><Ground /><rect x="12" y="20" width="64" height="30" rx="4" fill="#fff" stroke={NAVY} /><text x="44" y="33" fontSize="9" textAnchor="middle" fill={RED} textDecoration="line-through">He go</text><text x="44" y="45" fontSize="9" textAnchor="middle" fill="#16A34A" fontWeight="900">He goes ✓</text><Mascot x={96} y={52} acc="cap" /></>,
  memory: <><Ground /><circle cx="44" cy="38" r="22" fill="#FBCFE8" stroke={NAVY} /><path d="M30 36 q6 -10 14 0 q8 -10 14 0 M32 46 q12 8 24 0" stroke="#BE185D" strokeWidth="1.6" fill="none" /><Star x={44} y={14} r={6} /><Mascot x={94} y={52} /></>,
  achievements: <><Ground /><path d="M44 18 h32 v12 q0 18 -16 20 q-16 -2 -16 -20 z" fill={GOLD} stroke={NAVY} /><rect x="54" y="50" width="12" height="10" fill={GOLD} /><rect x="46" y="60" width="28" height="6" fill={NAVY} /><Star x={60} y={32} r={7} c="#fff" /><text x="14" y="40" fontSize="18">🔥</text><Kid x={98} y={50} who="yousef" arms="up" mood="excited" s={.85} /></>,
  notebook: <><Ground /><rect x="22" y="14" width="46" height="58" rx="3" fill={TEAL} /><rect x="27" y="18" width="38" height="50" fill="#fff" /><text x="46" y="34" fontSize="9" textAnchor="middle" fill={RED}>✗ goed</text><text x="46" y="48" fontSize="9" textAnchor="middle" fill="#16A34A" fontWeight="900">✓ went</text><Kid x={94} y={50} who="salma" s={.85} /></>,
  parent: <><Ground /><rect x="14" y="16" width="52" height="52" rx="4" fill="#fff" stroke={NAVY} />{[0, 1, 2].map(i => <rect key={i} x={22 + i * 14} y={58 - (i + 1) * 10} width="9" height={(i + 1) * 10} fill={[TEAL, GOLD, '#16A34A'][i]} />)}<Mascot x={84} y={52} acc="mustache" /><Kid x={106} y={56} who="salma" s={.7} /></>,
  'archive-list': <><Ground /><rect x="22" y="30" width="60" height="40" rx="3" fill="#B45309" /><rect x="28" y="18" width="48" height="16" fill="#fff" stroke={NAVY} /><rect x="26" y="40" width="52" height="5" fill="#92400E" /><Mascot x={100} y={52} s={.85} /></>,
  'archive-now': <><Ground /><rect x="30" y="34" width="44" height="36" fill="#D6A55C" stroke={NAVY} /><path d="M30 34 l22 -12 l22 12" fill="#E8C07D" stroke={NAVY} /><path d="M52 44 v14 M46 52 l6 6 l6 -6" stroke={NAVY} strokeWidth="2.4" fill="none" /><Kid x={96} y={50} who="yousef" s={.85} /></>,
  sound: <><Ground /><path d="M36 34 h10 l14 -12 v40 l-14 -12 h-10 z" fill={NAVY} /><Waves x={66} y={42} /><Mascot x={100} y={54} s={.8} /></>,
  rate: <><Ground /><text x="20" y="54" fontSize="26">🐢</text><path d="M54 44 h22 m-6 -6 l6 6 l-6 6" stroke={GOLD} strokeWidth="3" fill="none" /><text x="82" y="54" fontSize="26">🚀</text></>,
  lang: <><Ground /><Bubble x={10} y={20} w={40} t="ABC" /><Bubble x={66} y={20} w={44} t="أ ب ت" c="#FFF4D6" /><Mascot x={60} y={58} s={.8} /></>,
  sara3d: <><Ground /><Kid x={60} y={48} who="salma" s={1.2} arms="up" /><Star x={22} y={22} r={6} /><Star x={98} y={18} r={5} /></>,
};

export const ActivityArt: React.FC<{ id: string; className?: string }> = ({ id, className }) => (
  <svg viewBox="0 0 120 90" className={className} role="img" aria-hidden="true" direction="ltr" style={{ direction: "ltr" }}>
    <rect x="0" y="0" width="120" height="90" fill="#F3F8FF" />{SCENES[id] ?? <><Ground /><Mascot x={60} y={52} /></>}
  </svg>
);
export const hasActivityArt = (id: string) => id in SCENES;
export default ActivityArt;
