import { test } from 'node:test';
import assert from 'node:assert/strict';
import { iceConfig, iceServersHandler, turnMode, PUBLIC_STUN } from '../src/server/iceServers';

const never = async () => { throw new Error('must not be called'); };

test('no TURN env: public STUN only, flagged relay:false (the teacher is told mobile students may not hear him)', async () => {
  assert.equal(turnMode({}), 'stun-only');
  assert.deepEqual(await iceConfig({}, never), { iceServers: [PUBLIC_STUN], relay: false, source: 'stun-only', ttlSeconds: 21600 });
});

test('fixed TURN credentials from env (any provider / own coturn)', async () => {
  const env = { ABBOUD_TURN_URLS: 'turn:turn.example.com:3478?transport=udp, turns:turn.example.com:5349?transport=tcp, http://bad', ABBOUD_TURN_USERNAME: 'user', ABBOUD_TURN_CREDENTIAL: 'pass' };
  assert.equal(turnMode(env), 'static');
  const c = await iceConfig(env, never);
  assert.equal(c.relay, true); assert.equal(c.source, 'static');
  assert.deepEqual(c.iceServers[1], { urls: ['turn:turn.example.com:3478?transport=udp', 'turns:turn.example.com:5349?transport=tcp'], username: 'user', credential: 'pass' });
  assert.equal(turnMode({ ABBOUD_TURN_URLS: 'turn:x', ABBOUD_TURN_USERNAME: 'u' }), 'stun-only', 'incomplete config is ignored');
});

test('Cloudflare TURN: short-lived credentials are minted per request; on failure the secret never leaks and STUN is used', async () => {
  const env = { CLOUDFLARE_TURN_KEY_ID: 'kid', CLOUDFLARE_TURN_KEY_API_TOKEN: 'tok' };
  const calls: { url: string; auth: string; body: string }[] = [];
  const ok = await iceConfig(env, async (url, init) => { calls.push({ url, auth: init.headers.Authorization, body: init.body }); return { ok: true, status: 201, json: async () => ({ iceServers: { urls: ['stun:stun.cloudflare.com:3478', 'turn:turn.cloudflare.com:3478?transport=udp', 'turn:turn.cloudflare.com:53?transport=udp'], username: 'gen-user', credential: 'gen-cred' } }) }; });
  assert.equal(calls[0].url, 'https://rtc.live.cloudflare.com/v1/turn/keys/kid/credentials/generate-ice-servers');
  assert.equal(calls[0].auth, 'Bearer tok'); assert.deepEqual(JSON.parse(calls[0].body), { ttl: 21600 });
  assert.equal(ok.relay, true); assert.equal(ok.source, 'cloudflare');
  assert.deepEqual(ok.iceServers[1], { urls: ['stun:stun.cloudflare.com:3478', 'turn:turn.cloudflare.com:3478?transport=udp'], username: 'gen-user', credential: 'gen-cred' }, 'port 53 dropped (browsers block it; no trickle ICE)');
  const logs: string[] = [];
  const down = await iceConfig(env, async () => ({ ok: false, status: 401, json: async () => ({}) }), l => logs.push(l));
  assert.equal(down.relay, false); assert.equal(down.source, 'stun-only');
  assert.ok(logs.every(l => !l.includes('tok')), 'token never logged');
  const both = await iceConfig({ ...env, ABBOUD_TURN_URLS: 'turn:b', ABBOUD_TURN_USERNAME: 'u', ABBOUD_TURN_CREDENTIAL: 'p' }, async () => { throw new Error('network'); });
  assert.equal(both.source, 'static', 'Cloudflare down → fixed TURN if also configured');
});

test('handler: JSON, no-store', async () => {
  const headers: Record<string, string> = {}; let body: unknown;
  const res = { setHeader: (k: string, v: string) => { headers[k] = v; }, json: (b: unknown) => { body = b; } };
  await iceServersHandler({}, never)({} as never, res as never);
  assert.equal(headers['Cache-Control'], 'no-store');
  assert.deepEqual((body as { relay: boolean }).relay, false);
});
