/**
 * 🏠 Room sync (غرفتي across devices).
 * Cloud copy: users/{uid}/gamify/room = { character, hat, pet, wall, decor[], updatedAt(ms) } — a separate small doc,
 * never touches progress, XP (users/{uid}.points) or any other field. localStorage stays the cache / offline copy.
 * Merge rule: the most recent `updatedAt` wins (tie → cloud); the loser side is updated to match.
 */
import { DEFAULT_ROOM, type RoomState } from './gamify';

export interface StampedRoom { room: RoomState; updatedAt: number }
export const ROOM_ID_RE = /^[a-z]+-[a-z]+$/;

/** Only the five known fields, in the exact shape the Firestore rule accepts. */
export function toCloudDoc(room: RoomState, updatedAt: number) {
  return { character: room.character, hat: room.hat, pet: room.pet, wall: room.wall, decor: room.decor.slice(0, 4), updatedAt: Math.floor(updatedAt) };
}
/** Reads a cloud doc defensively (unknown / malformed → null). Unlock checks happen later in sanitizeRoom. */
export function fromCloudDoc(d: unknown): StampedRoom | null {
  if (!d || typeof d !== 'object') return null;
  const x = d as Record<string, unknown>;
  const str = (v: unknown, fb: string) => (typeof v === 'string' && ROOM_ID_RE.test(v) ? v : fb);
  const updatedAt = Number(x.updatedAt);
  if (!Number.isFinite(updatedAt) || updatedAt <= 0) return null;
  return {
    room: {
      character: str(x.character, DEFAULT_ROOM.character), hat: str(x.hat, DEFAULT_ROOM.hat), pet: str(x.pet, DEFAULT_ROOM.pet), wall: str(x.wall, DEFAULT_ROOM.wall),
      decor: Array.isArray(x.decor) ? x.decor.filter((v): v is string => typeof v === 'string' && ROOM_ID_RE.test(v)).slice(0, 4) : DEFAULT_ROOM.decor,
    },
    updatedAt,
  };
}

export type MergeResult = { winner: 'local' | 'cloud' | 'none'; room: StampedRoom | null; pushCloud: boolean; writeLocal: boolean };
/** Most recent wins; tie → cloud. Tells the caller which side needs updating. */
export function mergeRooms(local: StampedRoom | null, cloud: StampedRoom | null): MergeResult {
  const l = local && local.updatedAt > 0 ? local : null;
  if (!l && !cloud) return { winner: 'none', room: null, pushCloud: false, writeLocal: false };
  if (l && (!cloud || l.updatedAt > cloud.updatedAt)) return { winner: 'local', room: l, pushCloud: true, writeLocal: false };
  return { winner: 'cloud', room: cloud, pushCloud: false, writeLocal: !l || l.updatedAt !== cloud!.updatedAt || JSON.stringify(l.room) !== JSON.stringify(cloud!.room) };
}

export interface RoomIO {
  readLocal(): StampedRoom | null;
  writeLocal(r: StampedRoom): void;
  readCloud(): Promise<StampedRoom | null>;
  writeCloud(r: StampedRoom): Promise<void>;
}
/** One sync pass. Offline / denied cloud → keeps the device copy and retries next time (local stays newer). */
export async function syncRoomWith(io: RoomIO): Promise<MergeResult & { error?: unknown }> {
  const local = io.readLocal();
  let cloud: StampedRoom | null;
  try { cloud = await io.readCloud(); } catch (error) { return { winner: 'local', room: local, pushCloud: false, writeLocal: false, error }; }
  const m = mergeRooms(local, cloud);
  if (m.room && m.writeLocal) io.writeLocal(m.room);
  if (m.room && m.pushCloud) { try { await io.writeCloud(m.room); } catch (error) { return { ...m, error }; } }
  return m;
}
