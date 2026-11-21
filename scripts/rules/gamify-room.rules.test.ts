// @ts-nocheck — not part of `npm test`/tsc: needs the Firestore emulator (Java) and @firebase/rules-unit-testing.
// Rules-emulator test for «غرفتي» cloud sync (users/{uid}/gamify/room) + proof that XP/progress stay protected.
// Run (from the repo root, nothing is deployed):
//   npm i --no-save --legacy-peer-deps @firebase/rules-unit-testing
//   firebase emulators:exec --only firestore --project demo-gamify "npx tsx --test scripts/rules/gamify-room.rules.test.ts"
import { test, before, after } from 'node:test';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toCloudDoc } from '../../src/lib/roomSync';

let env;
const host = (process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8085').split(':');
const db = (uid, token = {}) => env.authenticatedContext(uid, token).firestore();
const room = { character: 'ch-cat', hat: 'hat-grad', pet: 'pet-chick', wall: 'wall-sunset', decor: ['dc-plant', 'dc-books'] };
const good = () => toCloudDoc(room, Date.now());

before(async () => { env = await initializeTestEnvironment({ projectId: 'demo-gamify', firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: host[0], port: Number(host[1]) } }); });
after(async () => { await env?.cleanup(); });

test('owner can create, read and update their own room', async () => {
  await env.clearFirestore();
  const r = doc(db('kid'), 'users/kid/gamify/room');
  await assertSucceeds(setDoc(r, good()));
  await assertSucceeds(getDoc(r));
  await assertSucceeds(setDoc(r, { ...good(), hat: 'hat-crown', decor: [] }));
  await assertSucceeds(updateDoc(r, { pet: 'pet-dog', updatedAt: Date.now() }));
});

test('others cannot read or write it; parent cannot write; signed-out denied', async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async c => { await setDoc(doc(c.firestore(), 'users/kid'), { role: 'student', parentIds: ['dad'], points: 300 }); await setDoc(doc(c.firestore(), 'users/kid/gamify/room'), good()); });
  await assertFails(getDoc(doc(db('stranger'), 'users/kid/gamify/room')));
  await assertFails(setDoc(doc(db('stranger'), 'users/kid/gamify/room'), good()));
  await assertFails(setDoc(doc(db('dad'), 'users/kid/gamify/room'), good()));
  await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'users/kid/gamify/room')));
});

test('only the "room" doc, exact fields, valid ids, ≤4 decor, int updatedAt', async () => {
  await env.clearFirestore();
  const k = db('kid');
  await assertFails(setDoc(doc(k, 'users/kid/gamify/other'), good()));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), points: 99999 }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), xp: 5 }));
  const { wall, ...noWall } = good();
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), noWall));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), character: 'CH CAT' }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), character: 'x'.repeat(40) + '-a' }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), decor: ['dc-a', 'dc-b', 'dc-c', 'dc-d', 'dc-e'] }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), decor: ['dc-a', 42] }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), decor: 'dc-a' }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), updatedAt: 'now' }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room'), { ...good(), updatedAt: 1.5 }));
  await assertSucceeds(setDoc(doc(k, 'users/kid/gamify/room'), good()));
  await assertSucceeds(deleteDoc(doc(k, 'users/kid/gamify/room')));
});

test('unchanged: the child still cannot touch points/xp/level on users/{uid}, nor other subcollections via gamify', async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async c => { await setDoc(doc(c.firestore(), 'users/kid'), { role: 'student', points: 300, displayName: 'K' }); });
  const k = db('kid');
  await assertFails(updateDoc(doc(k, 'users/kid'), { points: 999999 }));
  await assertFails(updateDoc(doc(k, 'users/kid'), { xp: 1 }));
  await assertSucceeds(updateDoc(doc(k, 'users/kid'), { displayName: 'Kid' }));
  await assertFails(setDoc(doc(k, 'users/kid/gamify/room/x/y'), { a: 1 }));
  await assertFails(setDoc(doc(k, 'users/kid/certificates/u1'), { a: 1 }).then(() => updateDoc(doc(k, 'users/kid/certificates/u1'), { a: 2 })));
});
