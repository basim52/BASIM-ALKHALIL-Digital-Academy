/** Tiny, dependency-free part of onboarding (no track data) so the app shell can decide the gate cheaply. */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { OnboardingRecord } from './onboarding';

export const LS = (uid?: string) => `academy_onboarding_${uid || 'guest'}`;
export const LS_LATER = (uid?: string) => `academy_onboarding_later_${uid || 'guest'}`;

export function readLocalOnboarding(uid?: string): OnboardingRecord | null {
  try { const v = localStorage.getItem(LS(uid)); return v ? JSON.parse(v) : null; } catch { return null; }
}
/** «أكمل لاحقاً»: remember the deferral (device + cloud) so the gate does not reopen; home shows «حدّد مسارك». */
export function deferOnboarding(uid?: string) {
  try { localStorage.setItem(LS_LATER(uid), String(Date.now())); } catch { /* ignore */ }
  if (uid) void updateDoc(doc(db, 'users', uid), { onboardingDeferredAt: Date.now() }).catch(() => {});
}
export function isDeferred(uid?: string, profile?: any): boolean {
  try { if (localStorage.getItem(LS_LATER(uid))) return true; } catch { /* ignore */ }
  return !!profile?.onboardingDeferredAt;
}
/** Students who were already studying before this feature: never forced, they only get the banner. */
export function isExistingStudent(profile: any, uid?: string): boolean {
  if (!profile) return false;
  if (profile.placementTestCompleted || profile.placementCompleted) return true;
  if ((Number(profile.points) || 0) > 0 || (Number(profile.xp) || 0) > 0) return true;
  if (profile.tutorTrackProgress && Object.values(profile.tutorTrackProgress).some(v => Number(v) > 1)) return true;
  if (profile.saraTrackProgress && Object.values(profile.saraTrackProgress).some(v => Number(v) > 1)) return true;
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i) || ''; if ((k.startsWith('sara_track_') || k.startsWith('tutor_track_')) && (!uid || k.endsWith(uid)) && Number(localStorage.getItem(k)) > 1) return true; } } catch { /* ignore */ }
  const created = profile.createdAt?.toMillis ? profile.createdAt.toMillis() : (typeof profile.createdAt === 'string' ? Date.parse(profile.createdAt) : Number(profile.createdAt) || 0);
  return created > 0 && created < Date.parse('2026-10-24T00:00:00+03:00');
}


/** Should the onboarding gate open right after sign-in? New students only, once, until done or deferred. */
export function shouldGateOnboarding(uid: string | undefined, profile: any): boolean {
  if (!profile || (profile.role && String(profile.role).toLowerCase() !== 'student')) return false;
  if (profile.onboarding?.done || readLocalOnboarding(uid)?.done) return false;
  if (isDeferred(uid, profile)) return false;
  return !isExistingStudent(profile, uid);
}
