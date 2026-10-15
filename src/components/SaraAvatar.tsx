import React, { useEffect, useRef } from 'react';
import { getSaraSpeechLevel } from '../lib/saraSpeechLevel';

export type SaraAvatarState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'connecting';

/*
 * Sara — hand-made SVG teacher (hijab, academy navy/gold). Separate parts are driven directly through refs
 * (no React re-render per frame): blinking every 3–6 s, eyebrows per mood, five mouth shapes lip-synced to the
 * real loudness of her cloud voice, gentle breathing / head sway, listening nod, thinking (eyes up + dots),
 * happy (smile + raised brows). rAF runs only while she speaks and the tab is visible; prefers-reduced-motion
 * turns off sway/breathing/nod.
 */
const MOUTH = {
  closed: 'M89 141 Q100 146.5 111 141',
  smile: 'M86 139 Q100 151 114 139',
  slight: 'M90 140 Q100 143.5 110 140 Q100 147.5 90 140Z',
  open: 'M89 139 Q100 142 111 139 Q100 152 89 139Z',
  wide: 'M87 138 Q100 141 113 138 Q100 157 87 138Z',
  oo: 'M95 141 Q100 136.5 105 141 Q100 149 95 141Z',
} as const;
type MouthKey = keyof typeof MOUTH;

const CSS = `
@keyframes sa-breathe { 0%,100% { transform: scale(1) } 50% { transform: scale(1.012, 1.02) } }
@keyframes sa-sway { 0%,100% { transform: rotate(-1.2deg) } 50% { transform: rotate(1.2deg) } }
@keyframes sa-nod { 0%,100% { transform: rotate(0) translateY(0) } 40% { transform: rotate(0.6deg) translateY(2.2px) } }
@keyframes sa-dot { 0%,80%,100% { opacity: .25; transform: translateY(0) } 40% { opacity: 1; transform: translateY(-3px) } }
@keyframes sa-pop { 0% { transform: scale(.55); opacity: 0 } 70% { transform: scale(1.06); opacity: 1 } 100% { transform: scale(1) } }
.sa-root { animation: sa-pop .55s cubic-bezier(.2,.9,.3,1.2) both }
.sa-body { transform-origin: 100px 200px; animation: sa-breathe 4.2s ease-in-out infinite }
.sa-head { transform-origin: 100px 160px; animation: sa-sway 6.5s ease-in-out infinite }
.sa-listening .sa-head { animation: sa-nod 2.4s ease-in-out infinite }
.sa-eye { transform-box: fill-box; transform-origin: center; transition: transform .07s }
.sa-blink .sa-eye { transform: scaleY(.08) }
.sa-iris { transition: transform .35s ease }
.sa-thinking .sa-iris { transform: translate(2px, -3px) }
.sa-brow { transition: transform .3s ease }
.sa-thinking .sa-brow-l { transform: translateY(-2.5px) rotate(-4deg); transform-box: fill-box; transform-origin: center }
.sa-happy .sa-brow { transform: translateY(-2px) }
.sa-cheek { transition: opacity .4s }
.sa-dots circle { animation: sa-dot 1.2s infinite ease-in-out; transform-box: fill-box }
.sa-dots circle:nth-child(2) { animation-delay: .15s } .sa-dots circle:nth-child(3) { animation-delay: .3s }
@media (prefers-reduced-motion: reduce) { .sa-root, .sa-body, .sa-head, .sa-listening .sa-head, .sa-dots circle { animation: none !important } }
`;

export const SaraAvatar: React.FC<{ size: number; state: SaraAvatarState; happy?: boolean; ring?: string }> = ({ size, state, happy, ring = '#C49E3A' }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const teethRef = useRef<SVGPathElement>(null);
  const shapeRef = useRef<MouthKey>('closed');

  const setMouth = (k: MouthKey) => {
    if (shapeRef.current === k) return; shapeRef.current = k;
    const filled = k !== 'closed' && k !== 'smile';
    fillRef.current?.setAttribute('d', filled ? MOUTH[k] : MOUTH.slight);
    fillRef.current?.setAttribute('opacity', filled ? '1' : '0');
    teethRef.current?.setAttribute('opacity', k === 'open' || k === 'wide' ? '1' : '0');
    lineRef.current?.setAttribute('d', filled ? MOUTH.closed : MOUTH[k]);
    lineRef.current?.setAttribute('opacity', filled ? '0' : '1');
  };

  // Blink at random 3–6 s (plus an occasional double blink)
  useEffect(() => {
    let t: any; let alive = true;
    const blink = (again: boolean) => {
      if (!alive) return;
      rootRef.current?.classList.add('sa-blink');
      setTimeout(() => { rootRef.current?.classList.remove('sa-blink'); if (again && Math.random() < 0.25) setTimeout(() => blink(false), 180); }, 120);
    };
    const loop = () => { t = setTimeout(() => { if (!document.hidden) blink(true); loop(); }, 3000 + Math.random() * 3000); };
    loop();
    return () => { alive = false; clearTimeout(t); };
  }, []);

  // Lip-sync while speaking: loudness → mouth shape (smoothed), paused when the tab is hidden
  useEffect(() => {
    if (state !== 'speaking') { setMouth(happy ? 'smile' : 'closed'); return; }
    let raf = 0, lp = 0, last = 0, prev = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden || now - last < 45) return; // ~22 updates/s is plenty for mouths and cheap
      last = now;
      const lvl = getSaraSpeechLevel();
      lp = lp * 0.45 + lvl * 0.55;
      const rising = lp - prev; prev = lp;
      setMouth(lp < 0.08 ? (happy ? 'smile' : 'closed') : lp < 0.25 ? (rising < -0.05 ? 'oo' : 'slight') : lp < 0.55 ? 'open' : 'wide');
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); setMouth(happy ? 'smile' : 'closed'); };
  }, [state, happy]); // eslint-disable-line react-hooks/exhaustive-deps

  const glow = state === 'listening' ? '0 0 0 3px rgba(52,211,153,.55), 0 0 26px rgba(52,211,153,.45)' : state === 'speaking' ? `0 0 0 3px ${ring}, 0 0 26px rgba(196,158,58,.5)` : `0 0 0 3px ${ring}`;
  return (
    <div ref={rootRef} data-testid="sara-avatar" data-state={state} className={`sa-root sa-${state} ${happy ? 'sa-happy' : ''} relative rounded-full overflow-hidden`}
      style={{ width: size, height: size, boxShadow: glow, transition: 'box-shadow .4s', background: 'radial-gradient(circle at 35% 25%, #1b4f94, #002147 70%)' }}>
      <style>{CSS}</style>
      <svg viewBox="22 24 156 156" width={size} height={size} aria-label="Sara" role="img">
        <defs>
          <linearGradient id="sa-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7dcc6" /><stop offset="1" stopColor="#eec4a6" /></linearGradient>
          <linearGradient id="sa-hijab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1d4a8a" /><stop offset=".6" stopColor="#0d2f63" /><stop offset="1" stopColor="#08234d" /></linearGradient>
          <linearGradient id="sa-gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a8822b" /><stop offset=".5" stopColor="#e4c46a" /><stop offset="1" stopColor="#a8822b" /></linearGradient>
          <radialGradient id="sa-iris" cx=".45" cy=".4" r=".6"><stop offset="0" stopColor="#7a4a26" /><stop offset="1" stopColor="#3a2112" /></radialGradient>
        </defs>
        <g className="sa-body">
          {/* shoulders / abaya */}
          <path d="M22 200 C28 168 60 150 100 150 C140 150 172 168 178 200Z" fill="url(#sa-hijab)" />
          <path d="M70 158 Q100 176 130 158" fill="none" stroke="url(#sa-gold)" strokeWidth="2.2" strokeLinecap="round" opacity=".9" />
          <circle cx="132" cy="166" r="4.2" fill="url(#sa-gold)" /><circle cx="132" cy="166" r="1.6" fill="#002147" />
          <g className="sa-head">
            {/* hijab back + drape */}
            <path d="M100 34 C52 34 40 78 42 112 C44 150 60 174 100 180 C140 174 156 150 158 112 C160 78 148 34 100 34Z" fill="url(#sa-hijab)" stroke="#3a6bb0" strokeWidth="1.2" />
            {/* face */}
            <ellipse cx="100" cy="108" rx="35" ry="43" fill="url(#sa-skin)" />
            {/* inner cap band framing the face */}
            <path d="M63 104 C62 70 80 56 100 56 C120 56 138 70 137 104 C133 80 120 68 100 68 C80 68 67 80 63 104Z" fill="#163e78" />
            <path d="M64 100 C66 74 82 61 100 61 C118 61 134 74 136 100" fill="none" stroke="url(#sa-gold)" strokeWidth="1.8" opacity=".85" />
            {/* hijab wrap under chin */}
            <path d="M64 118 C66 146 82 160 100 162 C118 160 134 146 136 118 C138 150 124 172 100 174 C76 172 62 150 64 118Z" fill="#0f3570" />
            {/* cheeks */}
            <ellipse className="sa-cheek" cx="80" cy="126" rx="7" ry="4.2" fill="#f19a9a" opacity={happy ? 0.45 : 0.25} />
            <ellipse className="sa-cheek" cx="120" cy="126" rx="7" ry="4.2" fill="#f19a9a" opacity={happy ? 0.45 : 0.25} />
            {/* brows */}
            <path className="sa-brow sa-brow-l" d="M76 95 Q85 89.5 93 93.5" fill="none" stroke="#3b2414" strokeWidth="2.6" strokeLinecap="round" />
            <path className="sa-brow sa-brow-r" d="M107 93.5 Q115 89.5 124 95" fill="none" stroke="#3b2414" strokeWidth="2.6" strokeLinecap="round" />
            {/* eyes */}
            {[85, 115].map(x => (
              <g key={x} className="sa-eye">
                <ellipse cx={x} cy="106" rx="7.2" ry={happy ? 4.6 : 5.6} fill="#fff" />
                <g className="sa-iris"><circle cx={x} cy="106.5" r="3.9" fill="url(#sa-iris)" /><circle cx={x} cy="106.5" r="1.7" fill="#1b0f08" /><circle cx={x + 1.4} cy="105" r="1.1" fill="#fff" /></g>
                <path d={`M${x - 7.6} 104.6 Q${x} ${happy ? 98.4 : 99.2} ${x + 7.6} 104.6`} fill="none" stroke="#2a180c" strokeWidth="1.9" strokeLinecap="round" />
                <path d={`M${x + 6.4} 102.6 l2.4 -1.6`} stroke="#2a180c" strokeWidth="1.3" strokeLinecap="round" />
              </g>
            ))}
            {/* nose */}
            <path d="M100 112 Q97.6 121 99.4 124 Q101.6 125 103 123.6" fill="none" stroke="#d69f80" strokeWidth="1.6" strokeLinecap="round" />
            {/* mouth: line (closed/smile) + filled shapes (speaking) */}
            <path ref={fillRef} d={MOUTH.slight} opacity="0" fill="#7a2434" stroke="#c45a68" strokeWidth="1.6" strokeLinejoin="round" />
            <path ref={teethRef} d="M92 140.6 Q100 143 108 140.6 L107 142.6 Q100 144.6 93 142.6Z" fill="#fff" opacity="0" />
            <path ref={lineRef} d={happy ? MOUTH.smile : MOUTH.closed} fill="none" stroke="#c0505f" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        </g>
        {state === 'thinking' && (
          <g className="sa-dots" fill="#fcd34d"><circle cx="146" cy="62" r="4" /><circle cx="156" cy="54" r="4" /><circle cx="166" cy="46" r="4" /></g>
        )}
      </svg>
    </div>
  );
};
