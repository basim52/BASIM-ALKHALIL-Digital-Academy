import React from 'react';

export interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

/** Sara ghost button: navy outline on white/cream, or solid navy when active. */
export const GhostButton: React.FC<GhostButtonProps> = ({
  children,
  active = false,
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49E3A] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${
      active
        ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
        : 'bg-white text-[#002147] border-[#002147]/30 hover:border-[#C49E3A] hover:bg-[#fdfaf3]'
    } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default GhostButton;
