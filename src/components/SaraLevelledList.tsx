import React, { useState } from 'react';
import { SARA_NEW_LEVELS, useLevelPassed } from '../lib/saraLevelGate';
import { NewLevelTestCard } from './SaraNewLevelTest';
import type { NewTrackKey, NewLevelId } from '../lib/saraNewTrackTests';
import { saraUnlockNarrator } from './SaraTrackPlayer';
import SaraLessonMap, { useSaraStreak } from './SaraLessonMap';
import { SaraLivePhoneCallModal } from './SaraLivePhoneCallModal';
import { freeCallPresetFor } from './SaraLessonCall';
import type { MapKind } from '../lib/saraLessonMap';

interface Item { id: string; order: number; titleAr: string; titleEn?: string; icon?: string }
/** Each track's emoji family + first level colour on the map. */
const STYLE: Record<NewTrackKey, { kind: MapKind; colorOffset: number }> = {
  daily: { kind: 'daily', colorOffset: 5 }, vocabulary: { kind: 'vocabulary', colorOffset: 6 },
  listening: { kind: 'listening', colorOffset: 1 }, pronunciation: { kind: 'pronunciation', colorOffset: 2 },
};

/** Lesson map split by level: the next level opens when the previous level's lessons are finished (or its test was passed, older rule kept so nothing re-locks). Failing a test never blocks progress.
 *  Display only: reads the saved counter, never writes progress. */
export function SaraLevelledList<T extends Item>({ lessons, unlockedRaw, unlockAll, uid, track, trackId, refresh, onOpen, onTest, titleAr = '', titleEn }: {
  lessons: T[]; unlockedRaw: number; unlockAll?: boolean; uid?: string; track: NewTrackKey; trackId: string; refresh: number;
  onOpen: (l: T) => void; onTest: (level: NewLevelId) => void; titleAr?: string; titleEn?: string;
}) {
  const passed = { a: useLevelPassed(uid, trackId, 'a', refresh), b: useLevelPassed(uid, trackId, 'b', refresh), c: useLevelPassed(uid, trackId, 'c', refresh) } as Record<string, boolean>;
  const unlocked = unlockAll ? lessons.length : unlockedRaw;
  const [chat, setChat] = useState(false);
  const streak = useSaraStreak(uid);
  const levelOf = (order: number) => SARA_NEW_LEVELS.find(lv => order >= lv.from && order <= lv.to);
  const gateOf = (li: number) => {
    const prev = li > 0 ? SARA_NEW_LEVELS[li - 1] : null;
    return !prev || !!unlockAll || passed[prev.id] || unlockedRaw > prev.to;
  };
  const levels = SARA_NEW_LEVELS.map((lv, li) => {
    const prev = li > 0 ? SARA_NEW_LEVELS[li - 1] : null;
    return { id: lv.id, titleAr: lv.titleAr, noteAr: gateOf(li) || !prev ? undefined : `يفتح بعد إنهاء دروس ${prev.titleAr}` };
  });
  const current = lessons.find(l => l.order === Math.min(unlockedRaw, lessons.length)) || lessons[0];
  const style = STYLE[track] || { kind: 'conversation' as MapKind, colorOffset: 0 };
  return (
    <>
      <SaraLessonMap lessons={lessons} levels={levels} sectionOf={l => levelOf(l.order)?.id ?? 'a'} numbering="level"
        unlocked={unlockedRaw} unlockAll={unlockAll} lang="ar" trackTitleAr={titleAr} trackTitleEn={titleEn} kind={style.kind} colorOffset={style.colorOffset}
        isOpen={l => { const li = SARA_NEW_LEVELS.findIndex(lv => l.order >= lv.from && l.order <= lv.to); return gateOf(Math.max(0, li)) && l.order <= unlocked; }}
        onOpen={l => { saraUnlockNarrator(); onOpen(l); }}
        onFreeChat={current ? () => { saraUnlockNarrator(); setChat(true); } : undefined} streak={streak}
        renderLevelEnd={id => {
          const li = SARA_NEW_LEVELS.findIndex(lv => lv.id === id); const lv = SARA_NEW_LEVELS[li];
          if (!lv) return null;
          return <NewLevelTestCard uid={uid} admin={!!unlockAll} refresh={refresh} track={track} level={lv.id} open={!!unlockAll || (gateOf(li) && unlockedRaw > lv.to)} onStart={() => onTest(lv.id)} />;
        }} />
      {chat && current && <SaraLivePhoneCallModal isOpen onClose={() => setChat(false)} studentName="" studentLevel="A2" isRtl studentId={uid} preset={freeCallPresetFor(current.titleEn || current.titleAr, current.titleAr)} />}
    </>
  );
}
export default SaraLevelledList;
