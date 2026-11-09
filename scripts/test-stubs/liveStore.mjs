// Test-only stand-in for src/lib/abboud/liveFirestoreApp.ts: tests set globalThis.__abboudLiveStore (an in-memory,
// rules-mirroring store); otherwise nobody has a live class, exactly like a host the admin has not set up.
const later = fn => { queueMicrotask(fn); return () => {}; };
const denied = async () => { throw Object.assign(new Error('permission-denied'), { code: 'permission-denied' }); };
const none = {
  watchAllConfigs: (cb) => later(() => cb([])), watchConfig: (_h, cb) => later(() => cb(null)), watchClassesFor: (_u, cb) => later(() => cb([])),
  watchState: (_h, cb) => later(() => cb(null)), watchParticipants: (_h, cb) => later(() => cb([])), watchMessages: (_h, _s, cb) => later(() => cb([])),
  watchFeed: (_h, cb) => later(() => cb(null)), watchSignal: (_h, _g, cb) => later(() => cb(null)), watchSignals: (_h, cb) => later(() => cb([])),
  publishFeed: denied, sendOffer: denied, sendAnswer: denied, clearSignal: denied,
  saveConfig: denied, deleteConfig: denied, publishState: denied, join: denied, setHand: denied, leave: denied, postMessage: denied
};
export const liveStore = new Proxy({}, { get: (_t, key) => (globalThis.__abboudLiveStore ?? none)[key] });
export const watchLiveUid = cb => { queueMicrotask(() => cb(globalThis.__abboudLiveUid ?? null)); return () => {}; };
