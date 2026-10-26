import React, { useEffect, useRef, useState } from 'react';

/**
 * Kid-friendly selfie filters for «ردّد مع سارة».
 * Everything runs locally in the browser: frames are drawn from the live <video> into a small on-screen canvas
 * (≈320px wide) and recoloured in JS. Nothing is recorded, saved or uploaded. The loop runs on requestAnimationFrame,
 * is capped at ~30fps and is cancelled on unmount or when the filter/camera changes.
 */

export type SelfieFilterId = 'normal' | 'cartoon' | 'sketch' | 'comic' | 'pop' | 'gold' | 'stars';
type Mode = 'canvas' | 'css';

export const SELFIE_FILTERS: { id: SelfieFilterId; label: string; emoji: string; mode: Mode; css?: string }[] = [
  { id: 'normal', label: 'بدون فلتر', emoji: '🙂', mode: 'css' },
  { id: 'cartoon', label: 'كرتون', emoji: '🧸', mode: 'canvas' },
  { id: 'sketch', label: 'رسم بالقلم', emoji: '✏️', mode: 'canvas' },
  { id: 'comic', label: 'كوميكس', emoji: '💥', mode: 'canvas' },
  { id: 'pop', label: 'ألوان مرحة', emoji: '🌈', mode: 'css', css: 'saturate(1.9) contrast(1.15) brightness(1.05)' },
  { id: 'gold', label: 'ذهبي', emoji: '🏅', mode: 'css', css: 'sepia(0.55) saturate(1.5) hue-rotate(-8deg) brightness(1.06) contrast(1.05)' },
  { id: 'stars', label: 'نجوم', emoji: '✨', mode: 'css', css: 'saturate(1.25) brightness(1.06)' },
];

const STORE_KEY = 'saraRepeat.selfieFilter';
const DEFAULT_FILTER: SelfieFilterId = 'cartoon';

export function useSelfieFilter(): [SelfieFilterId, (f: SelfieFilterId) => void] {
  const [f, setF] = useState<SelfieFilterId>(() => {
    try {
      const s = localStorage.getItem(STORE_KEY) as SelfieFilterId | null;
      if (s && SELFIE_FILTERS.some(x => x.id === s)) return s;
    } catch { /* storage blocked */ }
    return DEFAULT_FILTER;
  });
  const set = (id: SelfieFilterId) => { setF(id); try { localStorage.setItem(STORE_KEY, id); } catch { /* ignore */ } };
  return [f, set];
}

export const filterInfo = (id: SelfieFilterId) => SELFIE_FILTERS.find(x => x.id === id) || SELFIE_FILTERS[0];

const WORK_W = 320;
const FRAME_MS = 1000 / 30;

/** Recolours one frame in place. `lum` is a scratch buffer of w*h. */
function processFrame(id: SelfieFilterId, d: Uint8ClampedArray, lum: Uint8Array, w: number, h: number) {
  const n = w * h;
  for (let i = 0, p = 0; i < n; i++, p += 4) lum[i] = (d[p] * 77 + d[p + 1] * 150 + d[p + 2] * 29) >> 8;

  for (let y = 0; y < h; y++) {
    const yu = y > 0 ? y - 1 : y, yd = y < h - 1 ? y + 1 : y;
    for (let x = 0; x < w; x++) {
      const i = y * w + x, p = i << 2;
      const xl = x > 0 ? x - 1 : x, xr = x < w - 1 ? x + 1 : x;
      const g = Math.abs(lum[y * w + xr] - lum[y * w + xl]) + Math.abs(lum[yd * w + x] - lum[yu * w + x]);
      const L = lum[i];
      let r = d[p], gg = d[p + 1], b = d[p + 2];

      if (id === 'cartoon') {
        // Soft cel shading: quantise brightness (keep hue), boost saturation a bit, warm it up, soft dark outlines.
        const step = 42;
        const Lq = Math.min(255, (Math.floor(L / step) + 0.6) * step);
        const Lm = Lq * 0.72 + L * 0.28 + 10;
        const k = Lm / (L || 1);
        r = L + (r - L) * 1.35; gg = L + (gg - L) * 1.35; b = L + (b - L) * 1.35;
        r = r * k + 8; gg = gg * k + 3; b = b * k - 4;
        const e = g > 22 ? Math.min(1, (g - 22) / 40) * 0.8 : 0;
        r = r * (1 - e) + 22 * e; gg = gg * (1 - e) + 24 * e; b = b * (1 - e) + 48 * e;
      } else if (id === 'sketch') {
        // Pencil on cream paper: dark strokes along edges, light shading, cross-hatch in shadows.
        let v = 205 + L * 0.2 - Math.min(190, g * 3.2);
        if (L < 95 && (x + y) % 5 === 0) v -= 55;
        if (L < 55 && ((x - y) % 5 + 5) % 5 === 0) v -= 55;
        v = v < 0 ? 0 : v > 255 ? 255 : v;
        r = v * 0.992; gg = v * 0.98; b = v * 0.953;
      } else if (id === 'comic') {
        // Flat punchy colours (4 levels), halftone dots in mid/dark tones, bold black ink lines.
        const s = 1.7;
        r = L + (r - L) * s; gg = L + (gg - L) * s; b = L + (b - L) * s;
        r = Math.round(Math.max(0, Math.min(255, r)) / 85) * 85;
        gg = Math.round(Math.max(0, Math.min(255, gg)) / 85) * 85;
        b = Math.round(Math.max(0, Math.min(255, b)) / 85) * 85;
        if (L < 175) {
          const dx = (x & 3) - 1.5, dy = (y & 3) - 1.5;
          const rad = (1 - L / 175) * 2.4;
          if (dx * dx + dy * dy < rad * rad) { r *= 0.45; gg *= 0.45; b *= 0.5; }
        }
        if (g > 34) { r = 12; gg = 12; b = 20; }
      }
      d[p] = r; d[p + 1] = gg; d[p + 2] = b;
    }
  }
}

type CanvasProps = { video: HTMLVideoElement | null; filter: SelfieFilterId; active: boolean; className?: string; style?: React.CSSProperties };

/** On-screen canvas that renders the filtered (mirrored by CSS) selfie. Only mounted for canvas filters. */
export const FilteredSelfieCanvas: React.FC<CanvasProps> = ({ video, filter, active, className, style }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !video || !active) return;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    // Small scratch canvas: drawing the frame down then up again gives a cheap soft blur (no ctx.filter needed, works on Safari).
    const soft = document.createElement('canvas');
    const sctx = soft.getContext('2d');
    let raf = 0, last = 0, frames = 0, fpsT = performance.now(), msSum = 0;
    let lum = new Uint8Array(0);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME_MS - 2) return;
      if (video.readyState < 2 || !video.videoWidth) return;
      last = now;
      const t0 = performance.now();
      const w = WORK_W, h = Math.max(1, Math.round(WORK_W * video.videoHeight / video.videoWidth));
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      if (lum.length !== w * h) lum = new Uint8Array(w * h);
      ctx.imageSmoothingEnabled = true;
      if (filter !== 'sketch' && sctx) {
        const sw = w >> 1, sh = h >> 1;
        if (soft.width !== sw || soft.height !== sh) { soft.width = sw; soft.height = sh; }
        sctx.drawImage(video, 0, 0, sw, sh);
        ctx.drawImage(soft, 0, 0, w, h);
      } else {
        ctx.drawImage(video, 0, 0, w, h);
      }
      const img = ctx.getImageData(0, 0, w, h);
      processFrame(filter, img.data, lum, w, h);
      ctx.putImageData(img, 0, 0);
      msSum += performance.now() - t0; frames++;
      if (now - fpsT >= 1000) {
        cv.dataset.fps = String(Math.round(frames * 1000 / (now - fpsT)));
        cv.dataset.ms = (msSum / frames).toFixed(1);
        frames = 0; msSum = 0; fpsT = now;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); soft.width = soft.height = 0; };
  }, [video, filter, active]);
  return <canvas ref={ref} className={className} style={style} data-testid="repeat-filter-canvas" data-filter={filter} aria-label="كاميرا الطالب مع فلتر" />;
};

/** Sparkle overlay for the «نجوم» filter: pure CSS, no processing. */
export const SparkleOverlay: React.FC = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
    <style>{`@keyframes srTwinkle{0%,100%{opacity:.15;transform:scale(.6) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(20deg)}}`}</style>
    {[[8, 12, 0], [82, 10, .5], [15, 70, 1.1], [88, 62, .3], [50, 6, .8], [70, 85, 1.4], [28, 40, 1.7], [92, 35, .9], [5, 45, 1.3], [60, 30, 2]].map(([l, t, dl], i) => (
      <span key={i} className="absolute" style={{ left: `${l}%`, top: `${t}%`, fontSize: i % 3 === 0 ? 22 : 15, animation: `srTwinkle 1.8s ease-in-out ${dl}s infinite` }}>{i % 2 ? '⭐' : '✨'}</span>
    ))}
    <span className="absolute inset-1.5 rounded-[20px] border-2 border-dashed border-[#E8C766]/70" />
  </div>
);

type PickerProps = { value: SelfieFilterId; onChange: (f: SelfieFilterId) => void };

/** Small navy/gold chip row to choose a filter. */
export const SelfieFilterPicker: React.FC<PickerProps> = ({ value, onChange }) => (
  <div className="flex gap-1 overflow-x-auto no-scrollbar px-2 py-1" role="radiogroup" aria-label="فلاتر الكاميرا" data-testid="repeat-filter-picker">
    {SELFIE_FILTERS.map(f => {
      const on = f.id === value;
      return (
        <button key={f.id} type="button" role="radio" aria-checked={on} onClick={() => onChange(f.id)} data-testid={`repeat-filter-${f.id}`}
          className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] sm:text-[11px] font-black transition ${on ? 'bg-[#C49E3A] border-[#C49E3A] text-[#002147] shadow' : 'bg-[#002147]/80 border-[#C49E3A]/60 text-[#E8C766] hover:bg-[#002147]'}`}>
          <span aria-hidden>{f.emoji}</span>{f.label}
        </button>
      );
    })}
  </div>
);
