/** Can this device run the 3D Sara comfortably? (else the 2D avatar stays) */
export function canUseSara3D(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    if (localStorage.getItem('sara_3d') === 'off') return false;
    const mem = (navigator as any).deviceMemory; if (mem && mem < 2) return false;
    const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}
