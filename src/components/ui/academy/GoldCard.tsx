import React, { useId } from 'react';
import './GoldCard.css';

export const GOLD_CARD_TONES = ['orange', 'purple', 'green', 'blue'] as const;
export type GoldCardTone = (typeof GOLD_CARD_TONES)[number];

/** Ink color used on playful surfaces. Contrast against every tone fill is WCAG AAA. */
export const GOLD_CARD_INK = '#002147';

export const GOLD_CARD_TONE_META: Record<
  GoldCardTone,
  { emoji: string; fillEnd: string; fillStart: string }
> = {
  orange: { emoji: '🌟', fillStart: '#FFF8F1', fillEnd: '#FFE8D0' },
  purple: { emoji: '💜', fillStart: '#FBF7FF', fillEnd: '#EFE4FF' },
  green: { emoji: '🍀', fillStart: '#F3FDF7', fillEnd: '#D8F8E6' },
  blue: { emoji: '💙', fillStart: '#F3F8FF', fillEnd: '#DCEBFF' },
};

export interface GoldCardProps {
  children: React.ReactNode;
  className?: string;
  dir?: 'rtl' | 'ltr';
  onClick?: () => void;
  'data-testid'?: string;
  /** Force a colour family. When omitted, the tone rotates from `index` or a stable auto index. */
  tone?: GoldCardTone;
  /** Deterministic tone index (modulo 4). Useful in lists so colours stay put. */
  index?: number;
  /** Corner character. Pass `false` or `null` to hide. A tone default is used otherwise. */
  emoji?: string | false | null;
}

const CUSTOM_BORDER_COLOR =
  /(?:^|\s)!?border-(?!0\b|2\b|4\b|8\b)(?:solid|dashed|dotted|\[|#|[a-z]|white|black|transparent)/;
const CUSTOM_BG = /(?:^|\s)!?bg-(?!white(?:\s|$)|\[#fdfaf3\])\S+/;
const TEXT_COLOR =
  /(?:^|\s)!?text-(?:red|emerald|white|black|slate|gray|zinc|neutral|stone|amber|yellow|lime|green|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|orange|\[|#)\S*/;
const COMPACT_PADDING = /(?:^|\s)!?p-(?:0|2|3(?:\.5)?)(?=\s|$)/;

const toneIndexById = new Map<string, number>();
let nextToneIndex = 0;

/** Test-only helper so auto-assigned tones can start from orange again. */
export function resetGoldCardToneSequence() {
  toneIndexById.clear();
  nextToneIndex = 0;
}

function autoToneIndex(reactId: string): number {
  const existing = toneIndexById.get(reactId);
  if (existing != null) return existing;
  const index = nextToneIndex++;
  toneIndexById.set(reactId, index);
  return index;
}

/** Drop stale white/gold surface classes so the playful look wins, unless the caller set a custom surface. */
export function stripLegacyGoldCardClasses(className: string, applyToneSurface: boolean): string {
  if (!applyToneSurface) return className;
  let next = className
    .replace(/(^|\s)bg-white(?!\/)(?=\s|$)/g, ' ')
    .replace(/(^|\s)bg-\[#fdfaf3\](?=\s|$)/g, ' ')
    .replace(/(^|\s)border-\[#C49E3A\]\/40(?=\s|$)/g, ' ')
    .replace(/(^|\s)shadow-sm(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!CUSTOM_BORDER_COLOR.test(next)) {
    next = next.replace(/(^|\s)border(?:-2)?(?=\s|$)/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return next;
}

export function hasCustomGoldCardSurface(className: string): boolean {
  return CUSTOM_BG.test(className);
}

export function toneFromIndex(index: number): GoldCardTone {
  const wrapped = ((index % GOLD_CARD_TONES.length) + GOLD_CARD_TONES.length) % GOLD_CARD_TONES.length;
  return GOLD_CARD_TONES[wrapped];
}

export function stableToneIndex(reactId: string): number {
  return autoToneIndex(reactId);
}

/** Playful rounded card with a rotating neon-tint surface, used across the academy. */
export const GoldCard: React.FC<GoldCardProps> = ({
  children,
  className = '',
  dir,
  onClick,
  'data-testid': testId,
  tone,
  index,
  emoji,
}) => {
  const reactId = useId();
  const resolvedTone = tone ?? toneFromIndex(index ?? autoToneIndex(reactId));
  const applyToneSurface = !hasCustomGoldCardSurface(className);
  const cleaned = stripLegacyGoldCardClasses(className, applyToneSurface);
  const showDefaultEmoji = emoji === undefined;
  const resolvedEmoji = showDefaultEmoji ? GOLD_CARD_TONE_META[resolvedTone].emoji : emoji || '';
  const hideEmoji = !resolvedEmoji || (showDefaultEmoji && COMPACT_PADDING.test(className));
  const skipInk = TEXT_COLOR.test(className);

  return (
    <div
      dir={dir}
      onClick={onClick}
      data-testid={testId}
      data-tone={applyToneSurface ? resolvedTone : 'custom'}
      className={[
        'gold-card-fun',
        applyToneSurface ? `gold-card-fun--${resolvedTone}` : '',
        'p-4 sm:p-5',
        skipInk ? '' : 'text-[#002147]',
        onClick ? 'cursor-pointer' : '',
        cleaned,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {!hideEmoji && (
        <span className="gold-card-fun__emoji" aria-hidden="true" data-gold-emoji="">
          {resolvedEmoji}
        </span>
      )}
      {children}
    </div>
  );
};

export default GoldCard;
