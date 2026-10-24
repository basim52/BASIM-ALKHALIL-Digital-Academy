import React from 'react';

export interface ProgressPillProps {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

/** Small gold progress badge in Sara's palette. */
export const ProgressPill: React.FC<ProgressPillProps> = ({
  children,
  className = '',
  'data-testid': testId,
}) => (
  <span
    data-testid={testId}
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6C36A]/25 border border-[#C49E3A] text-[#002147] text-xs font-black ${className}`}
  >
    {children}
  </span>
);

export default ProgressPill;
