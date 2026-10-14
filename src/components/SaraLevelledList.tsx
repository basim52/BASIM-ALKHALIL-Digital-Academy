import React from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { SARA_NEW_LEVELS, useLevelPassed } from '../lib/saraLevelGate';
import { NewLevelTestCard } from './SaraNewLevelTest';
import type { NewTrackKey, NewLevelId } from '../lib/saraNewTrackTests';
import { saraUnlockNarrator } from './SaraTrackPlayer';

interface Item { id: string; order: number; titleAr: string; icon?: string }
/** Lesson list split by level: level 2 opens only after the level-1 end test is passed (admin open). */
export function SaraLevelledList<T extends Item>({ lessons, unlockedRaw, unlockAll, uid, track, trackId, refresh, onOpen, onTest }: {
  lessons: T[]; unlockedRaw: number; unlockAll?: boolean; uid?: string; track: NewTrackKey; trackId: string; refresh: number;
  onOpen: (l: T) => void; onTest: (level: NewLevelId) => void;
}) {
  const passedA = useLevelPassed(uid, trackId, 'a', refresh);
  const unlocked = unlockAll ? lessons.length : unlockedRaw;
  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-3 grid gap-1.5 content-start">
      {SARA_NEW_LEVELS.map(lv => {
        const ls = lessons.filter(l => l.order >= lv.from && l.order <= lv.to);
        if (!ls.length) return null;
        const gate = lv.id === 'a' || !!unlockAll || passedA;
        return (
          <React.Fragment key={lv.id}>
            <p className="text-[12px] font-black text-[#C49E3A] mt-1">{lv.titleAr}{!gate && <span className="text-slate-500"> · يفتح بعد النجاح في اختبار المستوى الأول</span>}</p>
            {ls.map(l => {
              const open = gate && l.order <= unlocked;
              return (
                <button key={l.id} disabled={!open} onClick={() => { saraUnlockNarrator(); onOpen(l); }}
                  className={`w-full min-w-0 flex items-center gap-2 p-2.5 rounded-xl border-2 text-start ${open ? 'bg-white border-amber-300' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                  <span className="w-7 h-7 rounded-full bg-[#002147] text-amber-300 text-[12px] font-black flex items-center justify-center shrink-0">{l.order - lv.from + 1}</span>
                  <span className="flex-1 min-w-0 text-[13px] font-black text-[#002147] truncate">{l.icon ? `${l.icon} ` : ''}{l.titleAr}</span>
                  {open ? (l.order < unlockedRaw ? <CheckCircle2 size={16} className="text-emerald-600" /> : null) : <Lock size={14} className="text-slate-400" />}
                </button>
              );
            })}
            <NewLevelTestCard track={track} level={lv.id} open={!!unlockAll || (gate && unlockedRaw > lv.to)} onStart={() => onTest(lv.id)} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default SaraLevelledList;
