import type { Firestore } from 'firebase/firestore';
import * as firestore from 'firebase/firestore';
import { cleanText, MAX_MESSAGE, type LiveClassConfig, type LiveClassStore, type LiveMessage, type LiveState, type Participant } from './liveClass';

/**
 * Firestore backend for «فصل عبود المباشر» (collection `abboudClasses`, see firestore.rules).
 * Firestore functions are injected so the rules-emulator test can drive this exact code with its own SDK instance.
 */
type Fs = Pick<typeof firestore, 'doc' | 'collection' | 'onSnapshot' | 'setDoc' | 'deleteDoc' | 'updateDoc' | 'addDoc' | 'query' | 'where' | 'limit' | 'serverTimestamp'>;
const millis = (v: unknown) => (v && typeof (v as { toMillis?: () => number }).toMillis === 'function' ? (v as { toMillis: () => number }).toMillis() : Date.now());
const ESTIMATE = { serverTimestamps: 'estimate' } as const;
function toConfig(id: string, d: Record<string, unknown> | undefined): LiveClassConfig | null {
  if (!d || !Array.isArray(d.allowed)) return null;
  return { hostUid: id, hostName: String(d.hostName || ''), allowed: d.allowed.filter((x): x is string => typeof x === 'string'),
    names: d.names && typeof d.names === 'object' ? Object.fromEntries(Object.entries(d.names as Record<string, unknown>).map(([k, v]) => [k, String(v)])) : {} };
}
function toState(d: Record<string, unknown> | undefined): LiveState | null {
  if (!d) return null;
  return { active: d.active === true, sessionId: String(d.sessionId || ''), lessonId: Number(d.lessonId) || 1, lessonTitle: String(d.lessonTitle || ''),
    source: String(d.source || ''), draft: String(d.draft || ''), explained: Array.isArray(d.explained) ? d.explained.map(String) : [], speaker: String(d.speaker || ''), updatedAt: millis(d.updatedAt) };
}
export function createFirestoreLiveStore(db: Firestore, f: Fs = firestore): LiveClassStore {
  const classDoc = (hostUid: string) => f.doc(db, 'abboudClasses', hostUid);
  const stateDoc = (hostUid: string) => f.doc(db, 'abboudClasses', hostUid, 'live', 'state');
  const participant = (hostUid: string, uid: string) => f.doc(db, 'abboudClasses', hostUid, 'participants', uid);
  return {
    watchAllConfigs: (cb, onError) => f.onSnapshot(f.collection(db, 'abboudClasses'), snap => cb(snap.docs.map(d => toConfig(d.id, d.data())).filter((c): c is LiveClassConfig => !!c)), onError),
    // A missing class is a normal «no class» (exists() false). Errors — including permission-denied — are reported, never hidden.
    watchConfig: (hostUid, cb, onError) => f.onSnapshot(classDoc(hostUid), snap => cb(snap.exists() ? toConfig(snap.id, snap.data()) : null), error => { cb(null); onError?.(error); }),
    watchClassesFor: (uid, cb, onError) => f.onSnapshot(f.query(f.collection(db, 'abboudClasses'), f.where('allowed', 'array-contains', uid), f.limit(10)),
      snap => cb(snap.docs.map(d => toConfig(d.id, d.data())).filter((c): c is LiveClassConfig => !!c)), onError),
    saveConfig: config => f.setDoc(classDoc(config.hostUid), { hostUid: config.hostUid, hostName: config.hostName, allowed: config.allowed, names: config.names, updatedAt: f.serverTimestamp() }),
    deleteConfig: hostUid => f.deleteDoc(classDoc(hostUid)),
    watchState: (hostUid, cb, onError) => f.onSnapshot(stateDoc(hostUid), snap => cb(snap.exists() ? toState(snap.data(ESTIMATE)) : null), onError),
    publishState: (hostUid, s) => f.setDoc(stateDoc(hostUid), { active: s.active, sessionId: s.sessionId, lessonId: s.lessonId, lessonTitle: s.lessonTitle,
      source: s.source, draft: s.draft, explained: s.explained, speaker: s.speaker, updatedAt: f.serverTimestamp() }),
    watchParticipants: (hostUid, cb, onError) => f.onSnapshot(f.collection(db, 'abboudClasses', hostUid, 'participants'), snap => cb(snap.docs.map(d => {
      const data = d.data(ESTIMATE);
      return { uid: d.id, sessionId: String(data.sessionId || ''), hand: data.hand === true, lastSeen: millis(data.lastSeen) } satisfies Participant;
    })), onError),
    join: (hostUid, uid, sessionId, hand) => f.setDoc(participant(hostUid, uid), { sessionId, hand, lastSeen: f.serverTimestamp() }),
    setHand: (hostUid, uid, hand) => f.updateDoc(participant(hostUid, uid), hand ? { hand, lastSeen: f.serverTimestamp() } : { hand }),
    leave: (hostUid, uid) => f.deleteDoc(participant(hostUid, uid)),
    // Equality-only query (no composite index needed); ordered on the client.
    watchMessages: (hostUid, sessionId, cb, onError) => f.onSnapshot(f.query(f.collection(db, 'abboudClasses', hostUid, 'messages'), f.where('sessionId', '==', sessionId), f.limit(200)),
      snap => cb(snap.docs.map(d => { const m = d.data(ESTIMATE); return { id: d.id, senderId: String(m.senderId), text: String(m.text), via: m.via === 'mic' ? 'mic' : 'text', sessionId: String(m.sessionId), createdAt: millis(m.createdAt) } satisfies LiveMessage; })
        .sort((a, b) => a.createdAt - b.createdAt)), onError),
    postMessage: async (hostUid, m) => { await f.addDoc(f.collection(db, 'abboudClasses', hostUid, 'messages'), { senderId: m.senderId, text: cleanText(m.text, MAX_MESSAGE), via: m.via, sessionId: m.sessionId, createdAt: f.serverTimestamp() }); }
  };
}
