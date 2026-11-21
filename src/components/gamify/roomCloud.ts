import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { roomKey, saveRoom, roomUpdatedAt, DEFAULT_ROOM, type RoomState } from '../../lib/gamify';
import { fromCloudDoc, syncRoomWith, toCloudDoc, type RoomIO, type StampedRoom } from '../../lib/roomSync';

export const ROOM_EVENT = 'academy-room-changed';
/** Cloud sync only for a real signed-in owner (guests / sim users stay device-only). */
export const canSyncRoom = (uid: string | null | undefined): uid is string => !!uid && !uid.startsWith('sim_') && auth.currentUser?.uid === uid;
const roomDoc = (uid: string) => doc(db, 'users', uid, 'gamify', 'room');

function readLocal(uid: string): StampedRoom | null {
  try {
    const s = localStorage.getItem(roomKey(uid)); if (!s) return null;
    const x = JSON.parse(s) || {};
    const room: RoomState = { character: x.character ?? DEFAULT_ROOM.character, hat: x.hat ?? DEFAULT_ROOM.hat, pet: x.pet ?? DEFAULT_ROOM.pet, wall: x.wall ?? DEFAULT_ROOM.wall, decor: Array.isArray(x.decor) ? x.decor : DEFAULT_ROOM.decor };
    return { room, updatedAt: roomUpdatedAt(uid) };
  } catch { return null; }
}
export function firestoreRoomIO(uid: string): RoomIO {
  return {
    readLocal: () => readLocal(uid),
    writeLocal: r => saveRoom(uid, r.room, r.updatedAt),
    readCloud: async () => { const s = await getDoc(roomDoc(uid)); return s.exists() ? fromCloudDoc(s.data()) : null; },
    writeCloud: async r => { await setDoc(roomDoc(uid), toCloudDoc(r.room, r.updatedAt)); },
  };
}
/** Pull/push once; tells the map & room to re-read when the device copy changed. Never throws. */
export async function syncRoom(uid: string | null | undefined): Promise<void> {
  if (!canSyncRoom(uid)) return;
  try {
    const m = await syncRoomWith(firestoreRoomIO(uid));
    if (m.writeLocal) window.dispatchEvent(new Event(ROOM_EVENT));
  } catch { /* offline: device copy stays */ }
}
/** Save after the child changes something: device first (instant), then cloud (best effort). */
export function saveRoomEverywhere(uid: string | null | undefined, room: RoomState) {
  const updatedAt = Date.now();
  saveRoom(uid, room, updatedAt);
  try { window.dispatchEvent(new Event(ROOM_EVENT)); } catch { /* ignore */ }
  if (canSyncRoom(uid)) setDoc(roomDoc(uid), toCloudDoc(room, updatedAt)).catch(() => { /* retried by the next sync (device copy is newer) */ });
}
