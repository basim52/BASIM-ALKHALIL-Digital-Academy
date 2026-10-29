import React from 'react';
import type { LevelTestItem } from '../lib/saraLevelTests';

const D: Record<string, string> = { easy: 'سهل', medium: 'متوسط', hard: 'صعب' };
/** Per-question marks: «س٣ صعب 0/14». Old attempts (no items) show nothing. */
export const MarksStrip: React.FC<{ items?: LevelTestItem[] }> = ({ items }) => {
  if (!items?.length) return null;
  const lost = items.reduce((a, x) => a + x.marks - x.got, 0);
  return (
    <div data-testid="level-test-marks" className="w-full mt-1">
      <p className="text-[11px] font-black text-[#002147]">درجات الأسئلة (سهل ٥ · متوسط ١٠ · صعب ١٥، والمجموع من ١٠٠){lost ? ` · خسرت ${lost}` : ''}</p>
      <div className="mt-1 flex flex-wrap justify-center gap-1">
        {items.map((x, i) => (
          <span key={i} className={`px-1.5 py-0.5 rounded-lg border text-[10px] font-black ${x.got ? 'bg-[#fdfaf3] border-[#C49E3A]/50 text-[#002147]' : 'bg-rose-50 border-rose-300 text-rose-700'}`}>
            س{i + 1} {D[x.difficulty]} {x.got}/{x.marks}
          </span>
        ))}
      </div>
    </div>
  );
};
