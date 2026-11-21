import React from 'react';
import type { MapZone } from '../../lib/gamify';

/** 🎨 Original drawn backdrop for one level of the lesson map (pure SVG + small emoji decorations; display only). */
export function MapZoneScene({ zone, width, height, rows, locked }: { zone: MapZone; width: number; height: number; rows: { x: number; y: number }[]; locked?: boolean }) {
  const w = Math.max(240, width); const H = 96; const id = `zg-${zone.kind}`;
  const sil = horizon(zone, w, H);
  const cx = w / 2;
  // One decoration between each pair of lessons, on the side away from the path.
  const decor = rows.slice(0, -1).map((p, i) => {
    const q = rows[i + 1]; const mx = (p.x + q.x) / 2; const left = mx > cx;
    return { x: left ? 22 + (i % 3) * 6 : w - 22 - (i % 3) * 6, y: (p.y + q.y) / 2, e: zone.decor[i % zone.decor.length] };
  });
  return (
    <div data-testid="sara-map-zone" data-zone={zone.kind} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute left-0 top-0" width={w} height={height}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={zone.sky} />
            <stop offset="100%" stopColor={zone.ground} />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={w} height={height} fill={`url(#${id})`} />
        {sil}
      </svg>
      {decor.map((d, i) => (
        <span key={i} className="absolute text-[22px] leading-none select-none" style={{ left: d.x, top: d.y, transform: 'translate(-50%,-50%)', opacity: 0.9 }}>{d.e}</span>
      ))}
      {locked && (
        <div data-testid="sara-map-zone-fog" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(241,245,249,.55), rgba(226,232,240,.8))' }}>
          {[0.12, 0.38, 0.64, 0.86].map((f, i) => (
            <span key={i} className="absolute text-[44px] opacity-70" style={{ top: `${f * 100}%`, [i % 2 ? 'left' : 'right']: '6%' } as React.CSSProperties}>☁️</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Horizon silhouette drawn at the top of each zone. */
function horizon(z: MapZone, w: number, H: number): React.ReactNode {
  const n = Math.ceil(w / 60);
  switch (z.kind) {
    case 'forest':
      return (<g>
        <path d={`M0 ${H} Q ${w * 0.25} ${H - 40} ${w * 0.5} ${H - 18} T ${w} ${H - 30} V ${H + 20} H 0 Z`} fill={z.hill} />
        {Array.from({ length: n }, (_, i) => { const x = i * 60 + 20; const h = 34 + (i % 3) * 10; return <g key={i}><rect x={x - 3} y={H - 14} width={6} height={14} fill="#8b5a2b" /><path d={`M${x - 16} ${H - 12} L${x} ${H - 12 - h} L${x + 16} ${H - 12} Z`} fill={z.hill2} /></g>; })}
      </g>);
    case 'sea':
      return (<g>
        <circle cx={w - 50} cy={30} r={18} fill="#ffd34d" />
        {[0, 1, 2].map(k => { const y = H - 30 + k * 14; return <path key={k} d={`M 0 ${y} ` + Array.from({ length: n + 1 }, (_, i) => `Q ${i * 60 + 30} ${y - 12} ${i * 60 + 60} ${y}`).join(' ')} fill="none" stroke={k % 2 ? z.hill : z.hill2} strokeWidth={5} strokeLinecap="round" />; })}
      </g>);
    case 'mountain':
      return (<g>
        {Array.from({ length: Math.ceil(w / 110) + 1 }, (_, i) => { const x = i * 110; const h = 60 + (i % 2) * 22; return <g key={i}><path d={`M${x - 70} ${H} L${x} ${H - h} L${x + 70} ${H} Z`} fill={i % 2 ? z.hill2 : z.hill} /><path d={`M${x - 16} ${H - h + 18} L${x} ${H - h} L${x + 16} ${H - h + 18} L${x + 6} ${H - h + 13} L${x - 6} ${H - h + 19} Z`} fill="#fff" /></g>; })}
      </g>);
    case 'city':
      return (<g>
        {Array.from({ length: n * 2 }, (_, i) => { const x = i * 30; const h = 30 + ((i * 37) % 50); return <g key={i}><rect x={x} y={H - h} width={26} height={h} rx={3} fill={i % 2 ? z.hill2 : z.hill} />{Array.from({ length: Math.floor(h / 14) }, (_, r) => <rect key={r} x={x + 6} y={H - h + 6 + r * 14} width={5} height={6} fill="#fff7d6" />)}</g>; })}
      </g>);
    case 'desert':
      return (<g>
        <circle cx={60} cy={30} r={20} fill="#ffb627" />
        <path d={`M0 ${H} Q ${w * 0.3} ${H - 46} ${w * 0.6} ${H - 14} Q ${w * 0.8} ${H - 34} ${w} ${H - 10} V ${H + 20} H0 Z`} fill={z.hill} />
        <path d={`M0 ${H} Q ${w * 0.5} ${H - 22} ${w} ${H} Z`} fill={z.hill2} />
      </g>);
    case 'island':
      return (<g>
        <rect x={0} y={H - 22} width={w} height={22} fill={z.hill} />
        <ellipse cx={w * 0.7} cy={H - 22} rx={70} ry={20} fill="#f6dfa0" />
        <path d={`M${w * 0.7} ${H - 34} q 4 -30 -6 -46`} stroke="#8b5a2b" strokeWidth={5} fill="none" />
        <path d={`M${w * 0.7 - 6} ${H - 80} q -24 -2 -34 12 M${w * 0.7 - 6} ${H - 80} q 24 -6 34 8 M${w * 0.7 - 6} ${H - 80} q -4 -20 -22 -22`} stroke={z.hill2} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>);
    case 'castle':
      return (<g>
        <path d={`M0 ${H} Q ${w / 2} ${H - 30} ${w} ${H} Z`} fill={z.hill} />
        {[w * 0.38, w * 0.62].map((x, i) => <g key={i}><rect x={x - 14} y={H - 74} width={28} height={60} fill={z.hill2} /><path d={`M${x - 18} ${H - 74} L${x} ${H - 98} L${x + 18} ${H - 74} Z`} fill="#c2185b" /></g>)}
        <rect x={w * 0.38} y={H - 52} width={w * 0.24} height={40} fill={z.hill2} />
        <path d={`M${w / 2 - 9} ${H - 12} v -16 a 9 9 0 0 1 18 0 v 16 Z`} fill="#7a3b5e" />
      </g>);
    case 'space':
    default:
      return (<g>
        {Array.from({ length: n * 3 }, (_, i) => <circle key={i} cx={(i * 47) % w} cy={8 + ((i * 29) % (H - 16))} r={i % 4 ? 1.6 : 2.6} fill="#7581dd" />)}
        <circle cx={w - 60} cy={44} r={22} fill={z.hill} /><ellipse cx={w - 60} cy={44} rx={36} ry={7} fill="none" stroke={z.hill2} strokeWidth={4} />
      </g>);
  }
}

export default MapZoneScene;
