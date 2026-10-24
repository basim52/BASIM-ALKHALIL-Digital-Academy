import React from 'react';

export interface LessonTileProps {
  order: number;
  title: string;
  subtitle?: string;
  emoji?: string;
  level?: string;
  active?: boolean;
  done?: boolean;
  locked?: boolean;
  onClick?: () => void;
  className?: string;
  'data-testid'?: string;
}

/** Same look as Sara's fill-blank lesson cards: lesson number, ✓ when done or 🔒 when locked, level badge. */
export const LessonTile: React.FC<LessonTileProps> = ({
  order,
  title,
  subtitle,
  emoji,
  level,
  active = false,
  done = false,
  locked = false,
  onClick,
  className = '',
  'data-testid': testId,
}) => (
  <button
    type="button"
    disabled={locked}
    onClick={onClick}
    data-testid={testId}
    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-start transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] ${
      locked
        ? 'bg-[#fdfaf3]/60 border-[#C49E3A]/20 opacity-60 cursor-not-allowed'
        : active
        ? 'bg-[#fdfaf3] border-[#C49E3A] ring-2 ring-[#C49E3A]/40 shadow-sm cursor-pointer'
        : 'bg-white border-[#C49E3A]/40 hover:border-[#C49E3A] shadow-sm cursor-pointer'
    } ${className}`}
  >
    <span className="w-7 h-7 rounded-full bg-[#002147] text-[#E6C36A] text-xs font-black flex items-center justify-center shrink-0">
      {order}
    </span>
    <span className="flex-1 min-w-0">
      <span className="block text-[13px] sm:text-sm font-black text-[#002147] truncate">
        {!locked && emoji ? `${emoji} ` : ''}{title}
      </span>
      {subtitle && (
        <span dir="ltr" className="block text-[11px] font-bold text-[#002147]/65 truncate">
          {subtitle}
        </span>
      )}
    </span>
    {level && (
      <span className="px-2 py-0.5 rounded-full bg-[#002147] text-[#E6C36A] text-[10px] font-black shrink-0">
        {level}
      </span>
    )}
    {locked ? (
      <span className="text-xs shrink-0" aria-label="locked">🔒</span>
    ) : done ? (
      <span className="w-5 h-5 rounded-full bg-[#E6C36A]/35 text-[#002147] text-xs font-black flex items-center justify-center shrink-0" aria-label="done">
        ✓
      </span>
    ) : null}
  </button>
);

export default LessonTile;
