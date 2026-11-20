import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Small "more below" button for a scrollable nav list. Shows only while the list
 * still has hidden items under the fold (e.g. the sidebar on a short iPad landscape
 * screen) and scrolls them into view when tapped.
 */
export const NavOverflowHint: React.FC<{ target: React.RefObject<HTMLElement | null>; label: string }> = ({ target, label }) => {
  const [more, setMore] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const update = () => setMore(el.scrollHeight - el.clientHeight - el.scrollTop > 4);
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (ro) { ro.observe(el); Array.from(el.children).forEach(c => ro.observe(c)); }
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); ro?.disconnect(); };
  }, [target]);
  if (!more) return null;
  return (
    <button
      type="button"
      data-testid="sidebar-more"
      aria-label={label}
      title={label}
      onClick={() => { const el = target.current; if (el) el.scrollBy({ top: Math.max(120, el.clientHeight * 0.8), behavior: 'smooth' }); }}
      className="absolute bottom-0 inset-x-0 h-10 flex items-end justify-center pb-1 bg-gradient-to-t from-white via-white/90 to-transparent text-[#58cc02] cursor-pointer"
    >
      <ChevronDown size={20} strokeWidth={3} className="animate-bounce" />
    </button>
  );
};
