/**
 * «فصل عبود المباشر»: real academy students, allowlisted by the admin only, join Abboud's class from their own devices.
 * Badr and Reem (the AI students) are untouched: nothing here reaches the AI endpoint, stages, stars or progress.
 * A joined student may speak/ask/discuss only after raising a hand and Abboud allowing it (one speaker at a time);
 * Firestore rules enforce the same: a message is accepted only from the current `speaker` of an active session.
 */
export const MAX_ALLOWED = 30;
export const MAX_MESSAGE = 300;
export const MAX_SOURCE = 1200;
export const MAX_DRAFT = 600;
export const MAX_NAME = 40;
export const MAX_TITLE = 80;
export const MAX_EXPLAINED = 40;
export const PRESENCE_MS = 120_000;
export const HEARTBEAT_MS = 45_000;

export type LiveClassConfig = { hostUid: string; hostName: string; allowed: string[]; names: Record<string, string> };
export type LiveState = {
  active: boolean; sessionId: string; lessonId: number; lessonTitle: string;
  source: string; draft: string; explained: string[]; speaker: string; updatedAt?: number;
};
export type Participant = { uid: string; sessionId: string; hand: boolean; lastSeen: number };
export type LiveMessage = { id: string; senderId: string; text: string; via: 'mic' | 'text'; sessionId: string; createdAt: number };
export type NewLiveMessage = Omit<LiveMessage, 'id' | 'createdAt'>;
export type Unsubscribe = () => void;
export type OnError = (error: unknown) => void;

/** Everything the UI needs from the backend. Firestore in the app (liveFirestore.ts); an in-memory twin in tests. */
export interface LiveClassStore {
  /** Admin: every class. */
  watchAllConfigs(cb: (configs: LiveClassConfig[]) => void, onError?: OnError): Unsubscribe;
  /** Host: their own class (null until the admin creates it). */
  watchConfig(hostUid: string, cb: (config: LiveClassConfig | null) => void, onError?: OnError): Unsubscribe;
  /** Student: classes whose allowlist contains them. */
  watchClassesFor(uid: string, cb: (configs: LiveClassConfig[]) => void, onError?: OnError): Unsubscribe;
  saveConfig(config: LiveClassConfig): Promise<void>;
  deleteConfig(hostUid: string): Promise<void>;
  watchState(hostUid: string, cb: (state: LiveState | null) => void, onError?: OnError): Unsubscribe;
  publishState(hostUid: string, state: LiveState): Promise<void>;
  watchParticipants(hostUid: string, cb: (participants: Participant[]) => void, onError?: OnError): Unsubscribe;
  /** Join or heartbeat (refreshes lastSeen); keeps the hand as given. */
  join(hostUid: string, uid: string, sessionId: string, hand: boolean): Promise<void>;
  /** Host may only lower a hand (decline); a student raises/lowers their own. */
  setHand(hostUid: string, uid: string, hand: boolean): Promise<void>;
  leave(hostUid: string, uid: string): Promise<void>;
  watchMessages(hostUid: string, sessionId: string, cb: (messages: LiveMessage[]) => void, onError?: OnError): Unsubscribe;
  postMessage(hostUid: string, message: NewLiveMessage): Promise<void>;
}

export const isValidUid = (id: unknown): id is string => typeof id === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(id);
/** One line of plain text: no control characters, collapsed spaces, bounded. */
export function cleanText(raw: unknown, max: number) {
  return String(raw ?? '').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e\u2066-\u2069]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}
export type ConfigResult = { ok: true; config: LiveClassConfig } | { ok: false; reason: 'host' | 'empty' | 'too-many' };
/** Admin's picks → a valid class: host excluded from its own allowlist, ids validated, duplicates dropped, names bounded. */
export function buildConfig(hostUid: string, hostName: string, picks: readonly { uid: string; name: string }[]): ConfigResult {
  if (!isValidUid(hostUid)) return { ok: false, reason: 'host' };
  const allowed: string[] = []; const names: Record<string, string> = {};
  for (const pick of picks) {
    if (!isValidUid(pick.uid) || pick.uid === hostUid || allowed.includes(pick.uid)) continue;
    allowed.push(pick.uid); names[pick.uid] = cleanText(pick.name, MAX_NAME) || 'طالب';
  }
  if (!allowed.length) return { ok: false, reason: 'empty' };
  if (allowed.length > MAX_ALLOWED) return { ok: false, reason: 'too-many' };
  return { ok: true, config: { hostUid, hostName: cleanText(hostName, MAX_NAME) || 'عبود', allowed, names } };
}
export function isGuest(config: LiveClassConfig | null | undefined, uid: string) { return !!config && config.allowed.includes(uid); }
/** The single source of truth for «may this student talk now?» (mirrored by firestore.rules). */
export function canPost(config: LiveClassConfig | null | undefined, state: LiveState | null | undefined, uid: string) {
  return isGuest(config, uid) && !!state?.active && state.speaker === uid;
}
export function present(participants: readonly Participant[], sessionId: string, now: number) {
  return participants.filter(p => p.sessionId === sessionId && now - p.lastSeen <= PRESENCE_MS);
}
/** Raised hands waiting for Abboud, oldest first, excluding whoever is speaking now. */
export function raisedHands(participants: readonly Participant[], state: LiveState | null, now: number) {
  if (!state?.active) return [];
  return present(participants, state.sessionId, now).filter(p => p.hand && p.uid !== state.speaker).sort((a, b) => a.lastSeen - b.lastSeen);
}
export function newSessionId(now = Date.now(), random = Math.random) { return `s${now.toString(36)}${Math.floor(random() * 1e6).toString(36)}`; }
/** Host's live state, bounded to what the rules accept. */
export function liveState(input: Omit<LiveState, 'updatedAt'>): LiveState {
  return {
    active: input.active, sessionId: input.sessionId.slice(0, 40), lessonId: Math.min(16, Math.max(1, Math.trunc(input.lessonId) || 1)),
    lessonTitle: cleanText(input.lessonTitle, MAX_TITLE), source: String(input.source || '').slice(0, MAX_SOURCE), draft: String(input.draft || '').slice(0, MAX_DRAFT),
    explained: input.explained.filter(k => /^[we]\d{1,2}$/.test(k)).slice(0, MAX_EXPLAINED), speaker: input.active && isValidUid(input.speaker) ? input.speaker : ''
  };
}
export const nameOf = (config: LiveClassConfig | null | undefined, uid: string) => config?.names[uid] || 'طالب';

/* ---------- In-memory store: the same permission model as firestore.rules, per signed-in actor (tests). ---------- */
type Listener = () => void;
export class PermissionDenied extends Error { code = 'permission-denied'; constructor() { super('permission-denied'); } }
export function createMemoryLiveBackend(now: () => number = Date.now) {
  const configs = new Map<string, LiveClassConfig>();
  const states = new Map<string, LiveState>();
  const participants = new Map<string, Map<string, Participant>>();
  const messages = new Map<string, LiveMessage[]>();
  const listeners = new Set<Listener>();
  let seq = 0;
  const notify = () => { for (const l of Array.from(listeners)) l(); };
  const watch = (emit: () => void): Unsubscribe => { const l = () => emit(); listeners.add(l); queueMicrotask(l); return () => { listeners.delete(l); }; };
  function as(actor: string, { admin = false } = {}): LiveClassStore {
    const deny = () => { throw new PermissionDenied(); };
    const host = (hostUid: string) => actor === hostUid && configs.has(hostUid);
    const guest = (hostUid: string) => isGuest(configs.get(hostUid), actor);
    const reader = (hostUid: string) => admin || host(hostUid) || guest(hostUid);
    const guarded = <T>(hostUid: string, read: () => T, cb: (v: T) => void, onError?: OnError) => watch(() => {
      if (!reader(hostUid)) { onError?.(new PermissionDenied()); return; }
      cb(read());
    });
    return {
      watchAllConfigs: (cb, onError) => watch(() => admin ? cb(Array.from(configs.values())) : onError?.(new PermissionDenied())),
      watchConfig: (hostUid, cb, onError) => watch(() => admin || actor === hostUid || guest(hostUid) ? cb(configs.get(hostUid) || null) : onError?.(new PermissionDenied())),
      watchClassesFor: (uid, cb, onError) => watch(() => uid === actor || admin ? cb(Array.from(configs.values()).filter(c => c.allowed.includes(uid))) : onError?.(new PermissionDenied())),
      async saveConfig(config) { if (!admin) deny(); configs.set(config.hostUid, structuredClone(config)); notify(); },
      async deleteConfig(hostUid) { if (!admin) deny(); configs.delete(hostUid); notify(); },
      watchState: (hostUid, cb, onError) => guarded(hostUid, () => states.get(hostUid) || null, cb, onError),
      async publishState(hostUid, state) {
        if (!host(hostUid)) deny();
        if (state.speaker && !configs.get(hostUid)!.allowed.includes(state.speaker)) deny();
        states.set(hostUid, { ...liveState(state), updatedAt: now() }); notify();
      },
      watchParticipants: (hostUid, cb, onError) => guarded(hostUid, () => Array.from(participants.get(hostUid)?.values() || []), cb, onError),
      async join(hostUid, uid, sessionId, hand) {
        if (uid !== actor || !guest(hostUid)) deny();
        const room = participants.get(hostUid) || new Map(); participants.set(hostUid, room);
        room.set(uid, { uid, sessionId, hand, lastSeen: now() }); notify();
      },
      async setHand(hostUid, uid, hand) {
        const p = participants.get(hostUid)?.get(uid);
        if (!p) deny();
        if (!((uid === actor && guest(hostUid)) || (host(hostUid) && hand === false))) deny();
        participants.get(hostUid)!.set(uid, { ...p!, hand, ...(uid === actor ? { lastSeen: now() } : {}) }); notify();
      },
      async leave(hostUid, uid) { if (!(uid === actor || host(hostUid) || admin)) deny(); participants.get(hostUid)?.delete(uid); notify(); },
      watchMessages: (hostUid, sessionId, cb, onError) => guarded(hostUid, () => (messages.get(hostUid) || []).filter(m => m.sessionId === sessionId), cb, onError),
      async postMessage(hostUid, message) {
        const state = states.get(hostUid);
        const text = cleanText(message.text, MAX_MESSAGE);
        if (message.senderId !== actor || !canPost(configs.get(hostUid), state, actor) || message.sessionId !== state!.sessionId || !text || !['mic', 'text'].includes(message.via)) deny();
        const list = messages.get(hostUid) || []; messages.set(hostUid, list);
        list.push({ ...message, text, id: `m${++seq}`, createdAt: now() }); notify();
      }
    };
  }
  return { as, configs, states, participants, messages };
}
