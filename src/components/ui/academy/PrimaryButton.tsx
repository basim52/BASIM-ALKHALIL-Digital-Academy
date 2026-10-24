import React from 'react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/** Sara primary button: gold text & border on navy background (#002147). */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#002147] hover:bg-[#001a38] text-[#E6C36A] border-2 border-[#C49E3A] text-xs sm:text-sm font-black shadow-sm active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default PrimaryButton;
