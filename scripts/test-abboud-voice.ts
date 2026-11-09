import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { ClassroomVoice } from '../src/lib/abboud/voice';

// Web Speech/TTS boundaries are mocked; queue, cancellation and ordering are real.
class Utterance {
  text: string; lang = ''; voice: unknown = null;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(text: string) { this.text = text; }
}
let latest: Utterance | null = null;
const spoken: string[] = [];
const synthesis = {
  cancel: mock.fn(() => {}),
  getVoices: () => [],
  speak: (u: Utterance) => { latest = u; spoken.push(u.text); u.onstart?.(); }
};
Object.assign(globalThis, {
  window: { speechSynthesis: synthesis },
  document: { querySelectorAll: () => [] },
  SpeechSynthesisUtterance: Utterance
});
async function tick() { await new Promise(resolve => setImmediate(resolve)); }
test('student audio is sequential: second speaker cannot start until first ends', async () => {
  mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 503 }));
  const voice = new ClassroomVoice(); const active: unknown[] = []; let fallback = 0;
  try {
    const playing = voice.play([{ speaker: 'badr', text: 'First' }, { speaker: 'reem', text: 'Second' }], speaker => active.push(speaker), () => fallback++);
    await tick(); assert.deepEqual(spoken, ['First']); assert.deepEqual(active, ['badr']);
    assert.ok(latest); latest.onend?.(); await tick(); assert.deepEqual(spoken, ['First', 'Second']);
    assert.ok(latest); latest.onend?.(); await playing;
    assert.equal(fallback, 2); assert.deepEqual(active, ['badr', null, 'reem', null, null]);
  } finally { voice.stop(); mock.restoreAll(); spoken.length = 0; }
});
test('stop releases pending playback and prevents the next speaker', async () => {
  mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 503 }));
  const voice = new ClassroomVoice();
  try {
    const playing = voice.play([{ speaker: 'badr', text: 'First' }, { speaker: 'reem', text: 'Never' }], () => {}, () => {});
    await tick(); voice.stop(); await playing;
    assert.deepEqual(spoken, ['First']); assert.ok(latest); assert.equal(latest.onend, null); assert.equal(latest.onerror, null);
  } finally { voice.stop(); mock.restoreAll(); spoken.length = 0; }
});
test('native audio errors reject instead of silently completing', async () => {
  mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 503 }));
  const voice = new ClassroomVoice();
  try {
    const playing = voice.play([{ speaker: 'badr', text: 'Blocked' }], () => {}, () => {});
    const rejected = assert.rejects(playing, /AUDIO_FAILED/);
    await tick(); assert.ok(latest); latest.onerror?.(); await rejected;
  } finally { voice.stop(); mock.restoreAll(); spoken.length = 0; }
});
test('cancelling a TTS request cannot start late audio', async () => {
  let resolve!: (response: Response) => void;
  mock.method(globalThis, 'fetch', () => new Promise<Response>(r => { resolve = r; }));
  const voice = new ClassroomVoice();
  try {
    const playing = voice.play([{ speaker: 'badr', text: 'Late' }], () => {}, () => {});
    voice.stop(); resolve(new Response('{}', { status: 503 })); await playing;
    assert.deepEqual(spoken, []);
  } finally { voice.stop(); mock.restoreAll(); }
});
test('cloud TTS waits for media ended, then highlights the next student, and releases URLs', async () => {
  class AudioElement {
    static latest: AudioElement;
    src = ''; onplaying: (() => void) | null = null; onended: (() => void) | null = null; onerror: (() => void) | null = null;
    constructor() { AudioElement.latest = this; }
    pause() {} load() {} removeAttribute() { this.src = ''; }
    play() { this.onplaying?.(); return Promise.resolve(); }
  }
  Object.assign(globalThis, { Audio: AudioElement });
  mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ audio: 'd2F2' })));
  const revoke = mock.method(URL, 'revokeObjectURL');
  const voice = new ClassroomVoice(); const active: unknown[] = [];
  try {
    const playing = voice.play([{ speaker: 'badr', text: 'First' }, { speaker: 'reem', text: 'Second' }], s => active.push(s), () => assert.fail('Native fallback not expected'));
    await tick(); assert.deepEqual(active, ['badr']); AudioElement.latest.onended?.();
    await tick(); assert.deepEqual(active, ['badr', null, 'reem']); AudioElement.latest.onended?.();
    await playing; assert.equal(revoke.mock.callCount(), 2); assert.equal(AudioElement.latest.onended, null);
  } finally { voice.stop(); mock.restoreAll(); }
});
test('blocked cloud autoplay can be retried synchronously on the replay click without refetching TTS', async () => {
  let gesture = false; let plays = 0;
  class ReplayAudio {
    static latest: ReplayAudio;
    src = ''; onplaying: (() => void) | null = null; onended: (() => void) | null = null; onerror: (() => void) | null = null;
    constructor() { ReplayAudio.latest = this; }
    pause() {} load() {} removeAttribute() { this.src = ''; }
    play() { plays++; if (!gesture) return Promise.reject(new Error('NotAllowedError')); this.onplaying?.(); return Promise.resolve(); }
  }
  Object.assign(globalThis, { Audio: ReplayAudio });
  const fetcher = mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ audio: 'd2F2' })));
  const voice = new ClassroomVoice(); const turns = [{ speaker: 'badr', text: 'Cloud response' }] satisfies Parameters<ClassroomVoice['play']>[0];
  try {
    await assert.rejects(voice.play(turns, () => {}, () => {}), /AUDIO_BLOCKED/);
    assert.equal(fetcher.mock.callCount(), 1);
    gesture = true;
    const replay = voice.play(turns, () => {}, () => {});
    assert.equal(plays, 2, 'audio.play must occur before any async boundary on a replay click');
    assert.equal(fetcher.mock.callCount(), 1, 'replay must not burn a second TTS request');
    ReplayAudio.latest.onended?.(); await replay;
  } finally { voice.stop(); mock.restoreAll(); }
});
test('native fallback replay also stays in the user click instead of awaiting another failed cloud fetch', async () => {
  const fetcher = mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 503 }));
  const voice = new ClassroomVoice(); const turns = [{ speaker: 'reem', text: 'Read this board word' }] satisfies Parameters<ClassroomVoice['play']>[0];
  try {
    const first = voice.play(turns, () => {}, () => {}); const failed = assert.rejects(first, /AUDIO_FAILED/);
    await tick(); assert.ok(latest); latest.onerror?.(); await failed;
    const before = spoken.length;
    const replay = voice.play(turns, () => {}, () => {});
    assert.equal(spoken.length, before + 1, 'native speak must run in the replay click');
    assert.equal(fetcher.mock.callCount(), 1); assert.ok(latest); latest.onend?.(); await replay;
  } finally { voice.stop(); mock.restoreAll(); spoken.length = 0; }
});
test('each speaker gets their own server-accepted voice: Badr and Reem never fall back to Sara\'s', async () => {
  const { SPEAKER_VOICES } = await import('../src/lib/abboud/voice');
  const { readFileSync } = await import('node:fs');
  const allowed = readFileSync('src/server/routes.ts', 'utf8').match(/const ALLOWED_VOICES = new Set\(\[([^\]]+)\]\)/);
  assert.ok(allowed, 'server allowlist found');
  const serverVoices = new Set(allowed[1].match(/"([A-Za-z]+)"/g)!.map(v => v.slice(1, -1)));
  for (const [speaker, name] of Object.entries(SPEAKER_VOICES)) assert.ok(serverVoices.has(name), `${speaker}'s voice ${name} would be replaced by Kore`);
  assert.equal(new Set(Object.values(SPEAKER_VOICES)).size, 3, 'three different voices');
  assert.equal(SPEAKER_VOICES.sara, 'Kore');
  const bodies: { voiceName: string; text: string }[] = [];
  mock.method(globalThis, 'fetch', async (_url: unknown, options: RequestInit) => { bodies.push(JSON.parse(String(options.body))); return new Response('{}', { status: 503 }); });
  const voice = new ClassroomVoice(); const active: unknown[] = []; const voices: [string, unknown, number][] = [];
  const installed = [{ lang: 'en-US', name: 'A' }, { lang: 'en-GB', name: 'B' }, { lang: 'en-AU', name: 'C' }];
  synthesis.getVoices = () => installed as never;
  try {
    const playing = voice.play([{ speaker: 'badr', text: 'Is it red?' }, { speaker: 'reem', text: 'It is blue.' }, { speaker: 'sara', text: 'Well done.' }], s => active.push(s), () => {});
    for (let i = 0; i < 3; i++) { await tick(); assert.ok(latest); const u = latest as Utterance & { pitch?: number }; voices.push([u.text, (u.voice as { name: string } | null)?.name, u.pitch ?? 1]); u.onend?.(); }
    await playing;
    assert.deepEqual(bodies.map(b => [b.text, b.voiceName]), [['Is it red?', 'Orus'], ['It is blue.', 'Laomedeia'], ['Well done.', 'Kore']]);
    assert.deepEqual(voices, [['Is it red?', 'B', 1.2], ['It is blue.', 'C', 1.4], ['Well done.', 'A', 1]], 'fallback: own installed voice and pitch per speaker');
    assert.deepEqual(active.filter(Boolean), ['badr', 'reem', 'sara'], 'the face that talks is the speaker of that turn');
  } finally { synthesis.getVoices = () => []; voice.stop(); mock.restoreAll(); spoken.length = 0; }
});
