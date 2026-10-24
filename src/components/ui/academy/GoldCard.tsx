import React from 'react';

export interface GoldCardProps {
  children: React.ReactNode;
  className?: string;
  dir?: 'rtl' | 'ltr';
  onClick?: () => void;
  'data-testid'?: string;
}

/** Sara design language card: white rounded-2xl card with gold/40 border and soft shadow. */
export const GoldCard: React.FC<GoldCardProps> = ({
  children,
  className = '',
  dir,
  onClick,
  'data-testid': testId,
}) => (
  <div
    dir={dir}
    onClick={onClick}
    data-testid={testId}
    className={`rounded-2xl bg-white border border-[#C49E3A]/40 shadow-sm p-4 sm:p-5 text-[#002147] ${className}`}
  >
    {children}
  </div>
);

export default GoldCard;
