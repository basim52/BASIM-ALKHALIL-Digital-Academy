import { loadTrackMeta, readLastTrack } from './saraProgressSync';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import type { SaraTrack } from '../data/saraTracks/foundations';

export const SARA_TRACKS: SaraTrack[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK];
export interface ContinueTarget { isNew: boolean; trackId: string; trackTitleAr: string; lessonId: string | null; lessonOrder: number; lessonTitleAr: string; passed: number; total: number }
const TARGET_KEY = 'sara_continue_target';

/** Next unlocked lesson in the most recently used Sara track (cloud ∪ device progress, same merge as the skills chart). */
export async function computeContinue(uid?: string): Promise<ContinueTarget> {
  const meta = uid ? await loadTrackMeta(uid) : { progress: {}, lastTrack: null, at: 0 };
  const local = (id: string) => { try { return Number(localStorage.getItem(`sara_track_${id}_${uid || 'guest'}`)) || 1; } catch { return 1; } };
  const unlocked = (t: SaraTrack) => Math.max(Number(meta.progress[t.id]) || 1, local(t.id));
  const dev = readLastTrack(uid);
  const lastId = dev && (dev.at >= meta.at || !meta.lastTrack) ? dev.id : meta.lastTrack;
  const started = SARA_TRACKS.filter(t => unlocked(t) > 1);
  let track = SARA_TRACKS.find(t => t.id === lastId) || null;
  if (!track && started.length) track = started.sort((a, b) => unlocked(b) - unlocked(a))[0];
  const isNew = !track || (started.length === 0 && !lastId);
  if (!track) track = FOUNDATIONS_TRACK;
  const u = isNew ? 1 : unlocked(track);
  const order = Math.min(track.lessons.length, u);
  const lesson = track.lessons.find(l => l.order === order) || track.lessons[0];
  const done = u > track.lessons.length; // finished: open the track list (level test)
  return { isNew, trackId: track.id, trackTitleAr: track.titleAr, lessonId: done || !lesson?.content ? null : lesson.id, lessonOrder: lesson.order, lessonTitleAr: lesson.titleAr, passed: Math.min(track.lessons.length, u - 1), total: track.lessons.length };
}
export function setContinueTarget(t: { trackId: string; lessonId: string | null }) { try { sessionStorage.setItem(TARGET_KEY, JSON.stringify(t)); } catch { /* ignore */ } }
export function getContinueTarget(): { trackId: string; lessonId: string | null } | null { try { const v = sessionStorage.getItem(TARGET_KEY); return v ? JSON.parse(v) : null; } catch { return null; } }
