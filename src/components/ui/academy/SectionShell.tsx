import React from 'react';

export interface SectionShellProps {
  children: React.ReactNode;
  dir?: 'rtl' | 'ltr';
  className?: string;
  'data-testid'?: string;
}

/** Sara design language shell: cream background (#fdfaf3), navy text (#002147), centered max width. */
export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  dir,
  className = '',
  'data-testid': testId,
}) => (
  <section
    dir={dir}
    data-testid={testId}
    className={`min-h-screen bg-[#fdfaf3] text-[#002147] px-3 py-3 sm:px-6 sm:py-5 font-sans ${className}`}
  >
    <div className="max-w-6xl mx-auto space-y-4">{children}</div>
  </section>
);

export default SectionShell;
