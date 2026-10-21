import React, { useEffect, useState } from 'react';
import { syncTrackProgress } from '../lib/saraProgressSync';
import { X, Lock } from 'lucide-react';
import { SaraTrackPlayer, readUnlocked } from './SaraTrackPlayer';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import type { SaraTrack } from '../data/saraTracks/foundations';

interface Props { isOpen: boolean; onClose: () => void; uid?: string; unlockAll?: boolean; filter?: 'all' | 'grammar' | 'conversation' | 'reading' | 'writing' }

/** 📚 Track picker: foundations + advanced grammar (advanced opens after foundations lesson 1). */
export const SaraTracksHub: React.FC<Props> = ({ isOpen, onClose, uid, unlockAll, filter = 'all' }) => {
  const [active, setActive] = useState<SaraTrack | null>(null);
  const [, setSyncTick] = useState(0);
  // Pull cloud progress (other device / reinstall) when the hub opens; push anything newer from this device.
  useEffect(() => {
    if (!isOpen || !uid) return;
    let alive = true;
    syncTrackProgress(uid, [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK].map(t => t.id))
      .then(changed => { if (alive && changed) setSyncTick(n => n + 1); });
    return () => { alive = false; };
  }, [isOpen, uid]);
  if (!isOpen) return null;
  const advancedOpen = !!unlockAll || readUnlocked(FOUNDATIONS_TRACK.id, uid) >= 2;
  // 💬, 📖 and ✍️ each have a single track: open it directly (its list shows the level sections) once unlocked.
  const direct = filter === 'conversation' || ((filter === 'reading' || filter === 'writing') && advancedOpen); // conversation is always open
  if (active || direct) {
    const t = active || (filter === 'reading' ? READING_TRACK : filter === 'writing' ? WRITING_TRACK : CONVERSATION_TRACK);
    return <SaraTrackPlayer isOpen onClose={() => (direct && !active ? onClose() : setActive(null))} track={t} uid={uid} unlockAll={unlockAll} />;
  }
  const built = (t: SaraTrack) => t.lessons.filter(l => l.content).length;
  const cards: { track: SaraTrack; open: boolean; note: string; icon: string }[] = [
    { track: FOUNDATIONS_TRACK, open: true, note: `${FOUNDATIONS_TRACK.lessons.length} درس`, icon: '🌱' },
    { track: ADVANCED_TRACK, open: advancedOpen, icon: '🎓',
      note: advancedOpen ? `${ADVANCED_TRACK.levels!.length} مستويات · ${built(ADVANCED_TRACK)} درس جاهز` : 'يفتح بعد إنهاء الدرس الأول من الأساسيات' },
    { track: CONVERSATION_TRACK, open: true, icon: '💬',
      note: true ? `${CONVERSATION_TRACK.levels!.length} مستويات · ${built(CONVERSATION_TRACK)} درس جاهز` : 'يفتح بعد إنهاء الدرس الأول من الأساسيات' },
    { track: READING_TRACK, open: advancedOpen, icon: '📖',
      note: advancedOpen ? `${READING_TRACK.levels!.length} مستويات · ${built(READING_TRACK)} درس جاهز` : 'يفتح بعد إنهاء الدرس الأول من الأساسيات' },
    { track: WRITING_TRACK, open: advancedOpen, icon: '✍️',
      note: advancedOpen ? `${WRITING_TRACK.levels!.length} مستويات · ${built(WRITING_TRACK)} درس جاهز` : 'يفتح بعد إنهاء الدرس الأول من الأساسيات' }
  ].filter(c => filter === 'all'
    || (filter === 'grammar' ? (c.track.id === FOUNDATIONS_TRACK.id || c.track.id === ADVANCED_TRACK.id)
      : filter === 'reading' ? c.track.id === READING_TRACK.id : filter === 'writing' ? c.track.id === WRITING_TRACK.id : c.track.id === CONVERSATION_TRACK.id));
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">📚</span>
          <p className="flex-1 text-sm font-black">مناهج سارة</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-3 grid gap-2 content-start">
          {cards.map(c => (
            <button key={c.track.id} disabled={!c.open} onClick={() => setActive(c.track)}
              className={`w-full min-w-0 overflow-hidden flex items-center gap-3 p-3 rounded-2xl border-2 text-start ${c.open ? 'bg-white border-amber-300 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
              <span className="text-2xl">{c.icon}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-[14px] font-black text-[#002147]">{c.track.titleAr}</span>
                <span className="block text-[11px] text-slate-500">{c.note}</span>
                {c.track.levels && <span className="block text-[11px] text-amber-700 font-bold truncate">{c.track.levels.map(l => l.titleAr).join(' · ')}</span>}
              </span>
              {!c.open && <Lock size={16} className="text-slate-400" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaraTracksHub;
