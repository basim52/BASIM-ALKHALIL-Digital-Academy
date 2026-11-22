import { useEffect, useState } from 'react';

/**
 * Tablet / wide landscape (same breakpoint as the other classes' landscape fixes in index.css):
 * screens this wide but short get a two-column layout so nothing hides below the fold.
 * Re-evaluates on rotate / resize.
 */
export const LANDSCAPE_SPLIT_QUERY = '(orientation: landscape) and (min-width: 900px)';

const read = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(LANDSCAPE_SPLIT_QUERY).matches;

export function useLandscapeSplit(): boolean {
  const [on, setOn] = useState<boolean>(read);
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(LANDSCAPE_SPLIT_QUERY);
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => { mq.removeEventListener?.('change', update); window.removeEventListener('resize', update); window.removeEventListener('orientationchange', update); };
  }, []);
  return on;
}
