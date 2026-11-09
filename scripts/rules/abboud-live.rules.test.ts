// @ts-nocheck — not part of `npm test`/tsc: needs the Firestore emulator (Java) and @firebase/rules-unit-testing.
// Rules-emulator test for «فصل عبود المباشر»: drives the real Firestore store (liveFirestore.ts) against firestore.rules.
// Run (from the repo root, nothing is deployed):
//   npm i --no-save --legacy-peer-deps @firebase/rules-unit-testing
//   firebase emulators:exec --only firestore --project demo-abboud "npx tsx --test scripts/rules/abboud-live.rules.test.ts"
// (emulator on 127.0.0.1:8085 — e.g. firebase.json "emulators": { "firestore": { "port": 8085 } } or FIRESTORE_EMULATOR_HOST.)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import * as fs from 'firebase/firestore';
import { createFirestoreLiveStore } from '../../src/lib/abboud/liveFirestore.ts';

let env: RulesTestEnvironment;
const db = (uid: string, token: Record<string, unknown> = {}) => env.authenticatedContext(uid, token).firestore() as unknown as fs.Firestore;
const store = (uid: string, token?: Record<string, unknown>) => createFirestoreLiveStore(db(uid, token), fs);
const admin = () => store('boss', { email: 'basim5252@gmail.com' });
const config = { hostUid: 'abood', hostName: 'عبود', allowed: ['salma', 'hessa'], names: { salma: 'سلمى', hessa: 'حصة' } };
const state = { active: true, sessionId: 'S1', lessonId: 2, lessonTitle: '🎨 الألوان', source: 'red', draft: '', explained: ['w1'], speaker: '' };
const msg = { senderId: 'salma', text: 'What is blue?', via: 'text' as const, sessionId: 'S1' };
const firstValue = <T,>(watch: (cb: (v: T) => void, err: (e: unknown) => void) => () => void) => new Promise<T>((res, rej) => { const stop = watch(v => { stop(); res(v); }, e => { rej(e); }); });

before(async () => { env = await initializeTestEnvironment({ projectId: 'demo-abboud', firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8'), host: '127.0.0.1', port: 8085 } }); });
after(async () => { await env?.cleanup(); });

test('config: only the admin writes it; host and listed students can read; others cannot', async () => {
  await env.clearFirestore();
  await assertFails(store('abood').saveConfig(config));
  await assertFails(store('salma').saveConfig({ ...config, allowed: ['salma', 'omar'] }));
  await assertFails(admin().saveConfig({ ...config, allowed: ['abood', 'salma'] }));
  await assertFails(admin().saveConfig({ ...config, allowed: [] }));
  await assertFails(admin().saveConfig({ ...config, allowed: Array.from({ length: 31 }, (_, i) => `u${i}`) }));
  await assertSucceeds(admin().saveConfig(config));
  await assertSucceeds(fs.getDoc(fs.doc(db('abood'), 'abboudClasses/abood')));
  await assertSucceeds(fs.getDoc(fs.doc(db('salma'), 'abboudClasses/abood')));
  await assertFails(fs.getDoc(fs.doc(db('omar'), 'abboudClasses/abood')));
  const mine = await firstValue(store('salma').watchClassesFor.bind(null, 'salma') as never) as { hostUid: string }[];
  assert.deepEqual(mine.map(c => c.hostUid), ['abood'], 'array-contains query works for listed students');
  await assertFails(fs.getDocs(fs.collection(db('omar'), 'abboudClasses')), );
  assert.equal(await firstValue(store('omar').watchConfig.bind(null, 'abood') as never), null, 'permission-denied maps to "no class"');
  await assertFails(store('abood').deleteConfig('abood'));
});

test('live state: only the host, only with a config, speaker must be listed', async () => {
  await env.clearFirestore();
  await assertFails(store('abood').publishState('abood', state));
  await admin().saveConfig(config);
  await assertSucceeds(store('abood').publishState('abood', state));
  await assertFails(store('salma').publishState('abood', { ...state, speaker: 'salma' }));
  await assertFails(store('abood').publishState('abood', { ...state, speaker: 'omar' }));
  await assertFails(store('abood').publishState('abood', { ...state, lessonId: 99 }));
  await assertSucceeds(store('abood').publishState('abood', { ...state, speaker: 'salma' }));
  await assertSucceeds(fs.getDoc(fs.doc(db('hessa'), 'abboudClasses/abood/live/state')));
  await assertFails(fs.getDoc(fs.doc(db('omar'), 'abboudClasses/abood/live/state')));
});

test('participants: join own seat only; own hand up/down; host may only lower', async () => {
  await env.clearFirestore();
  await admin().saveConfig(config);
  await store('abood').publishState('abood', state);
  await assertFails(store('omar').join('abood', 'omar', 'S1', true));
  await assertFails(store('salma').join('abood', 'hessa', 'S1', true));
  await assertSucceeds(store('salma').join('abood', 'salma', 'S1', false));
  await assertSucceeds(store('salma').setHand('abood', 'salma', true));
  await assertSucceeds(store('salma').setHand('abood', 'salma', false));
  await assertSucceeds(store('salma').setHand('abood', 'salma', true));
  await assertFails(store('abood').setHand('abood', 'salma', true));
  await assertSucceeds(store('abood').setHand('abood', 'salma', false));
  await assertFails(store('hessa').setHand('abood', 'salma', true));
  await assertFails(fs.getDocs(fs.collection(db('omar'), 'abboudClasses/abood/participants')));
  await assertSucceeds(fs.getDocs(fs.collection(db('abood'), 'abboudClasses/abood/participants')));
  await assertSucceeds(store('salma').leave('abood', 'salma'));
});

test('messages: only the current speaker of the active session; no edits', async () => {
  await env.clearFirestore();
  await admin().saveConfig(config);
  await store('abood').publishState('abood', state);
  await assertFails(store('salma').postMessage('abood', msg));
  await store('abood').publishState('abood', { ...state, speaker: 'salma' });
  await assertFails(store('hessa').postMessage('abood', msg));
  await assertFails(store('hessa').postMessage('abood', { ...msg, senderId: 'hessa' }));
  await assertFails(store('salma').postMessage('abood', { ...msg, sessionId: 'OLD' }));
  // (text over 300 chars is trimmed client-side by cleanText; the rule caps it server-side.)
  await assertFails(fs.addDoc(fs.collection(db("salma"), "abboudClasses/abood/messages"), { ...msg, text: "x".repeat(301), createdAt: fs.serverTimestamp() }));
  await assertSucceeds(store('salma').postMessage('abood', msg));
  await assertSucceeds(store('salma').postMessage('abood', { ...msg, via: 'mic' }));
  const list = await firstValue(store('hessa').watchMessages.bind(null, 'abood', 'S1') as never) as { senderId: string; via: string }[];
  assert.deepEqual(list.map(m => m.via), ['text', 'mic']);
  await assertFails(fs.getDocs(fs.collection(db('omar'), 'abboudClasses/abood/messages')));
  const ref = (await fs.getDocs(fs.collection(db('salma'), 'abboudClasses/abood/messages'))).docs[0].ref;
  await assertFails(fs.updateDoc(fs.doc(db('salma'), ref.path), { text: 'edited' }));
  await store('abood').publishState('abood', { ...state, speaker: '' });
  await assertFails(store('salma').postMessage('abood', msg));
  await store('abood').publishState('abood', { ...state, active: false, speaker: '' });
  // A message after the class ended is rejected even if the speaker field were stale.
  await assertFails(store("salma").postMessage("abood", msg));
});

test('existing collections are unaffected: a student still cannot read other users', async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async ctx => { await fs.setDoc(fs.doc(ctx.firestore() as never, 'users/hessa'), { role: 'student', email: 'hessa@x.com' }); });
  await assertFails(fs.getDoc(fs.doc(db('salma'), 'users/hessa')));
});

test('the admin can attend: listed admin joins, raises a hand, and posts only when given the turn', async () => {
  await env.clearFirestore();
  const bossToken = { email: 'basim5252@gmail.com' };
  await assertSucceeds(admin().saveConfig({ ...config, allowed: ['salma', 'boss'], names: { salma: 'سلمى', boss: 'بسام' } }));
  await store('abood').publishState('abood', state);
  await assertSucceeds(store('boss', bossToken).join('abood', 'boss', 'S1', true));
  await assertSucceeds(store('boss', bossToken).setHand('abood', 'boss', false));
  await assertFails(store('boss', bossToken).postMessage('abood', { ...msg, senderId: 'boss' }));
  await assertSucceeds(store('abood').publishState('abood', { ...state, speaker: 'boss' }));
  await assertSucceeds(store('boss', bossToken).postMessage('abood', { ...msg, senderId: 'boss' }));
  const mine = await firstValue(store('boss', bossToken).watchClassesFor.bind(null, 'boss') as never) as { hostUid: string }[];
  assert.deepEqual(mine.map(c => c.hostUid), ['abood']);
});

test('a parent account listed by the admin can attend too', async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async ctx => { await fs.setDoc(fs.doc(ctx.firestore() as never, 'users/mama'), { role: 'parent' }); });
  await admin().saveConfig({ ...config, allowed: ['mama'], names: { mama: 'أم سلمى' } });
  await store('abood').publishState('abood', state);
  await assertSucceeds(store('mama').join('abood', 'mama', 'S1', true));
  await assertSucceeds(fs.getDoc(fs.doc(db('mama'), 'abboudClasses/abood/live/state')));
});

test('watchConfig: a missing class is "no class" without an error; a denied read reports permission-denied', async () => {
  await env.clearFirestore();
  const errors: unknown[] = [];
  const value = await new Promise(res => { const stop = store('abood').watchConfig('abood', v => { stop(); res(v); }, e => errors.push(e)); });
  assert.equal(value, null); assert.equal(errors.length, 0, 'the teacher can read his own (absent) class doc');
  await admin().saveConfig(config);
  const denied = await new Promise<unknown>(res => { store('omar').watchConfig('abood', () => {}, e => res(e)); });
  assert.equal((denied as { code?: string }).code, 'permission-denied', 'reported, not hidden');
  const found = await new Promise(res => { const stop = store('abood').watchConfig('abood', v => { if (v) { stop(); res(v); } }); });
  assert.equal((found as { hostUid: string }).hostUid, 'abood', 'host lookup is by the signed-in uid == class doc id (users/{uid} doc id chosen by the admin)');
});
