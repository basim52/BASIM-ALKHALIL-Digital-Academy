import { FOUNDATIONS_TRACK, type SaraTrack } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { readUnlocked } from '../components/SaraTrackPlayer';
import { readLastTrack } from './saraProgressSync';
import { extractLessonItems, readLastLesson, type RepeatLessonSource } from './repeatPractice';

/** Sara's tracks shown in her hub (the ones whose lessons feed «ردّد مع سارة»). */
export const SARA_REPEAT_TRACKS: SaraTrack[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK];

export function saraLessonSource(trackId: string, lessonId: string): RepeatLessonSource | null {
  const t = SARA_REPEAT_TRACKS.find(x => x.id === trackId);
  const l = t?.lessons.find(x => x.id === lessonId);
  if (!t || !l) return null;
  const items = extractLessonItems(l as any);
  return items.length ? { trackId, lessonId, titleAr: l.titleAr, titleEn: l.titleEn, items } : null;
}

/** Last lesson passed in this track, from the existing progress counter (next unlocked order − 1). */
function lastPassedIn(t: SaraTrack, uid?: string): RepeatLessonSource | null {
  const done = readUnlocked(t.id, uid) - 1;
  const l = t.lessons.find(x => x.order === done);
  return l ? saraLessonSource(t.id, l.id) : null;
}

/**
 * The lesson «ردّد مع سارة» (فصل المعلمين) practises: the student's last passed Sara lesson
 * (recorded when a lesson is passed), else the last track opened, else any track with progress. null → built-in sentences.
 */
export function resolveSaraRepeatLesson(uid?: string): RepeatLessonSource | null {
  const last = readLastLesson('sara', uid);
  if (last) {
    const s = saraLessonSource(last.trackId, last.lessonId); // fresh items from the hub tracks
    if (s) return s;
    if (last.items.length && last.titleAr) return last; // other Sara tracks (path / curriculum): items saved when passed
  }
  const lt = readLastTrack(uid);
  const t = lt && SARA_REPEAT_TRACKS.find(x => x.id === lt.id);
  if (t) { const s = lastPassedIn(t, uid); if (s) return s; }
  for (const tr of SARA_REPEAT_TRACKS) { const s = lastPassedIn(tr, uid); if (s) return s; }
  return null;
}
