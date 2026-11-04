import React from 'react';

/**
 * «بندق» — the academy's own mascot (a round golden cub with a navy scarf), drawn as inline SVG.
 * Every card scene is composed from the mascot + simple props so the art stays consistent and tiny (no image files).
 */
export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'scared' | 'excited' | 'bored' | 'sleep' | 'calm' | 'proud';
export type Accessory = 'mustache' | 'hijab' | 'cap' | 'bow' | 'grandpa' | 'grandma' | 'uncle';
export type BodyPart = 'head' | 'eye' | 'ear' | 'nose' | 'mouth' | 'hand' | 'foot' | 'leg' | 'tooth' | 'hair';

export interface MascotProps { x: number; y: number; s?: number; mood?: Mood; acc?: Accessory; part?: BodyPart; arms?: 'down' | 'up' | 'front'; flip?: boolean; fur?: string }

const FUR = '#FFC23D', FUR_D = '#E09A12', NAVY = '#002147', GOLD = '#C49E3A';

/** Mascot drawn around (x,y) = body centre; feet reach y+24 at scale 1. */
export const Mascot: React.FC<MascotProps> = ({ x, y, s = 1, mood = 'happy', acc, part, arms = 'down', flip, fur = FUR }) => {
  const eyesClosed = mood === 'sleep' || mood === 'tired';
  const mouth = {
    happy: <path d="M-5 5 Q0 10 5 5" stroke={NAVY} strokeWidth="1.6" fill="none" strokeLinecap="round" />,
    proud: <path d="M-5 5 Q0 10 5 5" stroke={NAVY} strokeWidth="1.6" fill="none" strokeLinecap="round" />,
    excited: <path d="M-5 4 Q0 12 5 4 Z" fill={NAVY} />,
    calm: <path d="M-3 6 L3 6" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />,
    sad: <path d="M-5 8 Q0 3 5 8" stroke={NAVY} strokeWidth="1.6" fill="none" strokeLinecap="round" />,
    angry: <path d="M-5 8 Q0 4 5 8" stroke={NAVY} strokeWidth="2" fill="none" strokeLinecap="round" />,
    tired: <ellipse cx="0" cy="7" rx="2.5" ry="2" fill={NAVY} />,
    scared: <ellipse cx="0" cy="7" rx="3" ry="3.5" fill={NAVY} />,
    bored: <path d="M-4 7 L4 6" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />,
    sleep: <path d="M-2 7 Q0 8 2 7" stroke={NAVY} strokeWidth="1.4" fill="none" />,
  }[mood];
  const armL = arms === 'up' ? 'M-16 0 Q-24 -10 -22 -20' : arms === 'front' ? 'M-15 2 Q-10 10 -3 10' : 'M-16 2 Q-22 10 -20 16';
  const armR = arms === 'up' ? 'M16 0 Q24 -10 22 -20' : arms === 'front' ? 'M15 2 Q10 10 3 10' : 'M16 2 Q22 10 20 16';
  const handL = arms === 'up' ? [-22, -20] : arms === 'front' ? [-3, 10] : [-20, 16];
  const handR = arms === 'up' ? [22, -20] : arms === 'front' ? [3, 10] : [20, 16];
  const P: Record<BodyPart, [number, number, number]> = { head: [0, -6, 21], eye: [-6, -3, 5], ear: [-15, -15, 6], nose: [0, 1, 4], mouth: [0, 7, 5.5], hand: [handL[0], handL[1], 5.5], foot: [-7, 23, 5.5], leg: [-7, 19, 6], tooth: [0, 7, 4], hair: [0, -20, 6] };
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="25" rx="16" ry="2.5" fill="#000" opacity=".12" />
      <rect x="-11" y="14" width="7" height="10" rx="3.5" fill={FUR_D} />
      <rect x="4" y="14" width="7" height="10" rx="3.5" fill={FUR_D} />
      <path d={armL} stroke={FUR_D} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d={armR} stroke={FUR_D} strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="-14" cy="-14" r="5.5" fill={fur} stroke={FUR_D} strokeWidth="1.2" />
      <circle cx="14" cy="-14" r="5.5" fill={fur} stroke={FUR_D} strokeWidth="1.2" />
      <circle cx="-14" cy="-14" r="2.5" fill="#FF9FB0" />
      <circle cx="14" cy="-14" r="2.5" fill="#FF9FB0" />
      <circle cx="0" cy="0" r="18" fill={fur} stroke={FUR_D} strokeWidth="1.4" />
      <ellipse cx="0" cy="9" rx="10" ry="7" fill="#FFE3A3" />
      <path d="M-3 -18 Q0 -25 2 -18 Q4 -23 6 -17" fill={FUR_D} />
      {acc === 'hijab' || acc === 'grandma' ? <path d="M-19 4 Q-21 -21 0 -21 Q21 -21 19 4 Q19 -14 0 -15 Q-19 -14 -19 4 Z" fill={acc === 'grandma' ? '#7A8394' : '#3B5BA9'} /> : null}
      {acc === 'cap' && <><path d="M-14 -11 Q0 -24 14 -11 Z" fill="#E4572E" /><rect x="-2" y="-14" width="22" height="3" rx="1.5" fill="#B83D1C" /></>}
      {acc === 'bow' && <path d="M8 -17 l6 -4 v8 z M8 -17 l-6 -4 v8 z" fill="#FF5FA2" />}
      {(acc === 'grandpa') && <path d="M-16 -9 Q0 -27 16 -9 Q0 -15 -16 -9 Z" fill="#FFFFFF" stroke="#C9CED6" strokeWidth=".8" />}
      {eyesClosed ? <>
        <path d="M-9 -3 Q-6 0 -3 -3" stroke={NAVY} strokeWidth="1.6" fill="none" />
        <path d="M3 -3 Q6 0 9 -3" stroke={NAVY} strokeWidth="1.6" fill="none" />
      </> : <>
        <circle cx="-6" cy="-3" r={mood === 'scared' ? 3.6 : 3} fill={NAVY} /><circle cx="-5" cy="-4.2" r="1" fill="#fff" />
        <circle cx="6" cy="-3" r={mood === 'scared' ? 3.6 : 3} fill={NAVY} /><circle cx="7" cy="-4.2" r="1" fill="#fff" />
      </>}
      {mood === 'angry' && <><path d="M-10 -9 L-3 -6" stroke={NAVY} strokeWidth="1.8" /><path d="M10 -9 L3 -6" stroke={NAVY} strokeWidth="1.8" /></>}
      {mood === 'sad' && <><path d="M-9 -7 L-3 -9" stroke={NAVY} strokeWidth="1.4" /><path d="M9 -7 L3 -9" stroke={NAVY} strokeWidth="1.4" /><path d="M-8 1 q-1 3 0 4 q1 -1 0 -4" fill="#5EB8FF" /></>}
      {mood === 'bored' && <><path d="M-9 -4 H-3" stroke={fur} strokeWidth="3" /><path d="M3 -4 H9" stroke={fur} strokeWidth="3" /></>}
      {(acc === 'grandpa' || acc === 'grandma' || acc === 'uncle') && <g stroke={NAVY} strokeWidth="1.1" fill="none"><circle cx="-6" cy="-3" r="4.5" /><circle cx="6" cy="-3" r="4.5" /><path d="M-1.5 -3 H1.5" /></g>}
      <ellipse cx="0" cy="1.5" rx="2.2" ry="1.6" fill="#B5651D" />
      {part === 'tooth' ? <><path d="M-5 4 Q0 11 5 4 Z" fill={NAVY} /><rect x="-2" y="4" width="4" height="3" fill="#fff" /></> : mouth}
      {(acc === 'mustache' || acc === 'uncle') && <path d="M-7 4.5 Q-3 2 0 4 Q3 2 7 4.5 Q3 6 0 5 Q-3 6 -7 4.5 Z" fill="#5B3A1A" />}
      {acc === 'grandpa' && <path d="M-9 5 Q0 18 9 5 Q0 9 -9 5 Z" fill="#fff" stroke="#C9CED6" strokeWidth=".8" />}
      <circle cx="-11" cy="4" r="2.6" fill="#FF8FA3" opacity=".55" />
      <circle cx="11" cy="4" r="2.6" fill="#FF8FA3" opacity=".55" />
      <path d="M-13 12 Q0 18 13 12 L12 15 Q0 21 -12 15 Z" fill={NAVY} />
      <rect x="6" y="14" width="4" height="8" rx="1" fill={GOLD} />
      <circle cx={handL[0]} cy={handL[1]} r="3.2" fill={fur} stroke={FUR_D} strokeWidth="1" />
      <circle cx={handR[0]} cy={handR[1]} r="3.2" fill={fur} stroke={FUR_D} strokeWidth="1" />
      {part && <circle cx={P[part][0]} cy={P[part][1]} r={P[part][2]} fill="none" stroke="#E11D48" strokeWidth="1.8" strokeDasharray="3 2" />}
    </g>
  );
};

/** Isometric grey cube; (x,y) = bottom-left of the front face. */
export const Cube: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 26 }) => {
  const d = w * 0.35;
  return (
    <g>
      <path d={`M${x} ${y - w} l${d} ${-d} h${w} l${-d} ${d} Z`} fill="#D5DAE1" stroke="#9AA3AF" strokeWidth=".8" />
      <path d={`M${x + w} ${y - w} l${d} ${-d} v${w} l${-d} ${d} Z`} fill="#A7B0BC" stroke="#8A94A2" strokeWidth=".8" />
      <rect x={x} y={y - w} width={w} height={w} fill="#BEC5CF" stroke="#8A94A2" strokeWidth=".8" />
    </g>
  );
};

export type Scene =
  | { k: 'prep'; p: 'on' | 'in' | 'under' | 'next to' | 'in front of' | 'behind' | 'between' | 'around' | 'through' }
  | { k: 'color'; c: string }
  | { k: 'shape'; sh: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart' | 'oval' | 'diamond' }
  | { k: 'count'; n: number }
  | { k: 'emoji'; e: string; mood?: Mood; arms?: MascotProps['arms'] }
  | { k: 'body'; part: BodyPart }
  | { k: 'mood'; mood: Mood; bubble?: string }
  | { k: 'family'; acc?: Accessory; small?: boolean; group?: boolean; parent?: Accessory }
  | { k: 'weather'; w: 'sun' | 'rain' | 'wind' | 'cloud' | 'storm' | 'snow' | 'warm' };

const Ground = () => <rect x="0" y="86" width="120" height="14" fill="#EEF2F7" />;
const Cloud = ({ x, y, c = '#fff' }: { x: number; y: number; c?: string }) => <g fill={c} stroke="#C9D2DE" strokeWidth=".8"><ellipse cx={x} cy={y} rx="14" ry="8" /><ellipse cx={x - 9} cy={y + 3} rx="9" ry="6" /><ellipse cx={x + 10} cy={y + 3} rx="10" ry="6" /></g>;
const Sun = ({ x, y, r = 10 }: { x: number; y: number; r?: number }) => <g><g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <line key={a} x1={x + Math.cos(a * Math.PI / 180) * (r + 3)} y1={y + Math.sin(a * Math.PI / 180) * (r + 3)} x2={x + Math.cos(a * Math.PI / 180) * (r + 7)} y2={y + Math.sin(a * Math.PI / 180) * (r + 7)} />)}</g><circle cx={x} cy={y} r={r} fill="#FDD835" stroke="#F59E0B" /></g>;

function shapePath(sh: Extract<Scene, { k: 'shape' }>['sh']) {
  const c = { fill: '#5B8DEF', stroke: NAVY, strokeWidth: 1.5 };
  switch (sh) {
    case 'circle': return <circle cx="82" cy="50" r="22" {...c} />;
    case 'square': return <rect x="61" y="29" width="42" height="42" rx="2" {...c} fill="#F97316" />;
    case 'triangle': return <path d="M82 26 L106 72 L58 72 Z" {...c} fill="#22C55E" />;
    case 'rectangle': return <rect x="56" y="36" width="54" height="30" rx="2" {...c} fill="#A855F7" />;
    case 'star': return <path d="M82 24 L88 42 L107 42 L92 53 L98 72 L82 61 L66 72 L72 53 L57 42 L76 42 Z" {...c} fill="#FACC15" />;
    case 'heart': return <path d="M82 72 C60 56 58 40 70 34 C77 31 82 36 82 40 C82 36 87 31 94 34 C106 40 104 56 82 72 Z" {...c} fill="#EF4444" />;
    case 'oval': return <ellipse cx="82" cy="50" rx="26" ry="17" {...c} fill="#14B8A6" />;
    case 'diamond': return <path d="M82 24 L104 50 L82 76 L60 50 Z" {...c} fill="#EC4899" />;
  }
}

function prep(p: Extract<Scene, { k: 'prep' }>['p']) {
  switch (p) {
    case 'on': return <><Ground /><Cube x={45} y={88} w={30} /><Mascot x={65} y={36} s={0.85} mood="excited" arms="up" /></>;
    case 'under': return <><Ground /><rect x="22" y="40" width="80" height="7" rx="2" fill="#BEC5CF" stroke="#8A94A2" /><rect x="27" y="47" width="5" height="40" fill="#A7B0BC" /><rect x="92" y="47" width="5" height="40" fill="#A7B0BC" /><Mascot x={62} y={66} s={0.8} mood="happy" /></>;
    case 'in': return <><Ground /><path d="M38 52 l10 -9 h40 l-10 9 Z" fill="#8A94A2" /><Mascot x={60} y={50} s={0.8} mood="excited" arms="up" /><rect x="38" y="52" width="40" height="36" fill="#BEC5CF" stroke="#8A94A2" /><path d="M78 52 l10 -9 v36 l-10 9 Z" fill="#A7B0BC" stroke="#8A94A2" strokeWidth=".8" /></>;
    case 'next to': return <><Ground /><Cube x={14} y={88} w={30} /><Mascot x={88} y={62} s={0.95} mood="happy" /></>;
    case 'in front of': return <><Ground /><Cube x={40} y={72} w={32} /><Mascot x={58} y={64} s={0.95} mood="happy" arms="up" /></>;
    case 'behind': return <><Ground /><Mascot x={53} y={33} s={0.8} mood="scared" /><Cube x={30} y={90} w={40} /><path d="M33 47 q3 -5 7 -1 M74 47 q3 -5 7 -1" stroke="#E09A12" strokeWidth="4" fill="none" strokeLinecap="round" /></>;
    case 'between': return <><Ground /><Cube x={8} y={88} w={28} /><Cube x={82} y={88} w={28} /><Mascot x={62} y={63} s={0.9} mood="happy" /></>;
    case 'around': return <><Ground />
      <ellipse cx="60" cy="74" rx="40" ry="11" fill="none" stroke="#E11D48" strokeWidth="2.2" strokeDasharray="5 3" />
      <rect x="47" y="36" width="26" height="40" fill="#BEC5CF" stroke="#8A94A2" /><ellipse cx="60" cy="36" rx="13" ry="4.5" fill="#D5DAE1" stroke="#8A94A2" /><ellipse cx="60" cy="76" rx="13" ry="4.5" fill="#BEC5CF" stroke="#8A94A2" />
      <path d="M22 78 Q40 88 66 85" fill="none" stroke="#E11D48" strokeWidth="2.2" /><path d="M66 85 l-6 -4 l1 7 Z" fill="#E11D48" />
      <Mascot x={96} y={68} s={0.55} mood="excited" flip /></>;
    case 'through': return <><Ground />
      <path d="M30 88 V48 a30 30 0 0 1 60 0 V88 H76 V52 a16 16 0 0 0 -32 0 V88 Z" fill="#BEC5CF" stroke="#8A94A2" />
      <Mascot x={60} y={66} s={0.75} mood="excited" />
      <path d="M8 78 H104" stroke="#E11D48" strokeWidth="2.2" strokeDasharray="5 3" /><path d="M112 78 l-8 -4 v8 Z" fill="#E11D48" /></>;
  }
}

function weather(w: Extract<Scene, { k: 'weather' }>['w']) {
  switch (w) {
    case 'sun': return <><Sun x={92} y={22} r={11} /><Ground /><Mascot x={45} y={62} mood="happy" arms="up" /></>;
    case 'warm': return <><Sun x={92} y={20} r={12} /><Ground /><Mascot x={45} y={62} mood="tired" /><path d="M62 42 q2 4 0 6 q-2 -2 0 -6" fill="#5EB8FF" /><path d="M28 44 q2 4 0 6 q-2 -2 0 -6" fill="#5EB8FF" /></>;
    case 'cloud': return <><Cloud x={40} y={22} /><Cloud x={88} y={30} /><Ground /><Mascot x={60} y={64} mood="calm" /></>;
    case 'rain': return <><Cloud x={60} y={18} c="#CBD5E1" /><g stroke="#3B82F6" strokeWidth="2" strokeLinecap="round">{[30, 45, 60, 75, 90].map((x, i) => <line key={x} x1={x} y1={32 + (i % 2) * 6} x2={x - 3} y2={40 + (i % 2) * 6} />)}</g><Ground /><path d="M40 52 Q60 32 80 52 Z" fill="#E4572E" /><line x1="60" y1="44" x2="60" y2="60" stroke={NAVY} strokeWidth="1.5" /><Mascot x={60} y={64} mood="happy" /></>;
    case 'storm': return <><Cloud x={60} y={18} c="#94A3B8" /><path d="M58 28 L50 46 L58 46 L52 62 L68 40 L60 40 L66 28 Z" fill="#FACC15" stroke="#CA8A04" /><Ground /><Mascot x={90} y={64} s={0.8} mood="scared" /></>;
    case 'snow': return <><Cloud x={60} y={16} /><g fill="#fff" stroke="#93C5FD">{[[28, 36], [48, 30], [70, 38], [92, 32], [38, 50], [84, 50]].map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="2.6" />)}</g><rect x="0" y="86" width="120" height="14" fill="#fff" /><Mascot x={60} y={64} mood="excited" fur="#FFD873" /></>;
    case 'wind': return <><g stroke="#60A5FA" strokeWidth="2.2" fill="none" strokeLinecap="round"><path d="M6 36 H52 q8 0 8 -6 q0 -6 -6 -6" /><path d="M10 52 H64 q8 0 8 6 q0 6 -6 6" /><path d="M14 44 H40" /></g><Ground /><Mascot x={88} y={62} mood="scared" arms="up" flip /></>;
  }
}

export const VisualCardArt: React.FC<{ scene: Scene; className?: string; label?: string }> = ({ scene, className, label }) => {
  let body: React.ReactNode;
  switch (scene.k) {
    case 'prep': body = prep(scene.p); break;
    case 'weather': body = weather(scene.w); break;
    case 'color': body = <><Ground /><line x1="58" y1="74" x2="74" y2="38" stroke="#64748B" strokeWidth="1" /><ellipse cx="78" cy="26" rx="16" ry="19" fill={scene.c} stroke="#334155" strokeWidth="1.2" /><path d="M76 45 l2 -2 l2 2 Z" fill={scene.c} stroke="#334155" strokeWidth=".8" /><ellipse cx="72" cy="19" rx="4" ry="6" fill="#fff" opacity=".35" /><Mascot x={40} y={62} mood="excited" /></>; break;
    case 'shape': body = <><Ground />{shapePath(scene.sh)}<Mascot x={30} y={62} s={0.9} mood="happy" arms="front" /></>; break;
    case 'count': body = <><Ground />{Array.from({ length: scene.n }).map((_, i) => <Cube key={i} x={44 + (i % 5) * 14} y={88 - Math.floor(i / 5) * 15} w={12} />)}<Mascot x={22} y={62} s={0.85} mood="happy" arms="up" /></>; break;
    case 'emoji': body = <><Ground /><text x="88" y="64" fontSize="34" textAnchor="middle">{scene.e}</text><Mascot x={38} y={62} mood={scene.mood || 'happy'} arms={scene.arms || 'front'} /></>; break;
    case 'body': body = <><Ground /><Mascot x={60} y={58} s={1.55} mood="happy" arms={scene.part === 'hand' ? 'up' : 'down'} part={scene.part} /></>; break;
    case 'mood': body = <><Ground /><Mascot x={scene.bubble ? 44 : 60} y={58} s={1.45} mood={scene.mood} arms={scene.mood === 'excited' || scene.mood === 'proud' ? 'up' : 'down'} />
      {scene.bubble && <><circle cx="80" cy="36" r="2" fill="#fff" stroke="#94A3B8" /><circle cx="86" cy="28" r="3" fill="#fff" stroke="#94A3B8" /><ellipse cx="100" cy="16" rx="16" ry="12" fill="#fff" stroke="#94A3B8" /><text x="100" y="22" fontSize="15" textAnchor="middle">{scene.bubble}</text></>}
      {scene.mood === 'sleep' && <text x="86" y="26" fontSize="13" fill={NAVY} fontWeight="900">Z z</text>}</>; break;
    case 'family':
      body = scene.group
        ? <><Ground /><Mascot x={22} y={56} s={1.05} acc="mustache" /><Mascot x={50} y={56} s={1.05} acc="hijab" /><Mascot x={76} y={68} s={0.7} acc="cap" /><Mascot x={100} y={68} s={0.7} acc="bow" /><path d="M60 4 c-3 -4 -9 -2 -7 3 l7 6 l7 -6 c2 -5 -4 -7 -7 -3 Z" fill="#EF4444" /></>
        : scene.parent
          ? <><Ground /><g opacity=".45"><Mascot x={36} y={52} s={1.2} acc={scene.parent} /></g><Mascot x={82} y={68} s={0.75} acc={scene.acc} mood="excited" /></>
          : <><Ground /><Mascot x={60} y={scene.small ? 66 : 56} s={scene.small ? 0.85 : 1.25} acc={scene.acc} />{(scene.acc === 'grandpa' || scene.acc === 'grandma') && <path d="M88 88 V58 q0 -6 6 -6" stroke="#7C4A1E" strokeWidth="3" fill="none" strokeLinecap="round" />}</>;
      break;
  }
  return (
    <svg viewBox="0 0 120 100" className={className} role="img" aria-label={label}>
      <rect x="0" y="0" width="120" height="100" fill="#F7FAFF" />
      {body}
    </svg>
  );
};
export default VisualCardArt;
