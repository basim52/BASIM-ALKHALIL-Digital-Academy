import React from 'react';

export type AnswerOptionState = 'normal' | 'correct' | 'wrong';

export interface AnswerOptionProps {
  label: React.ReactNode;
  state?: AnswerOptionState;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  dir?: 'rtl' | 'ltr';
  className?: string;
  'data-testid'?: string;
}

/** Three states (normal / correct green / wrong red) with a single pulse. */
export const AnswerOption: React.FC<AnswerOptionProps> = ({
  label,
  state = 'normal',
  selected = false,
  disabled = false,
  onClick,
  dir,
  className = '',
  'data-testid': testId,
}) => {
  const stateClasses =
    state === 'correct'
      ? 'bg-green-50 border-green-600 text-[#002147] animate-[pulse_0.6s_ease-out_1]'
      : state === 'wrong'
      ? 'bg-red-50 border-red-600 text-red-900 animate-[pulse_0.6s_ease-out_1]'
      : selected
      ? 'bg-[#fdfaf3] border-[#C49E3A] text-[#002147] ring-2 ring-[#C49E3A]/40'
      : 'bg-white border-[#C49E3A]/40 text-[#002147] hover:border-[#C49E3A] hover:bg-[#fdfaf3]';

  return (
    <button
      type="button"
      dir={dir}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      className={`w-full px-4 py-3 rounded-2xl border-2 text-start text-xs sm:text-sm font-black flex items-center justify-between gap-2 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] cursor-pointer disabled:cursor-default ${stateClasses} ${className}`}
    >
      <span className="min-w-0 flex-1">{label}</span>
      {state === 'correct' && (
        <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-black flex items-center justify-center shrink-0">
          ✓
        </span>
      )}
      {state === 'wrong' && (
        <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center shrink-0">
          ✗
        </span>
      )}
    </button>
  );
};

export default AnswerOption;
