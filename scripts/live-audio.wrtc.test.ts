// @ts-nocheck — not part of `npm test`/tsc: needs a native WebRTC stack for Node.
// Real WebRTC check of the live-class audio hub (liveAudio.ts): real SDP/ICE/RTP between 3 peers on this machine, tone "mics".
// Run (from the repo root): npm i --no-save @roamhq/wrtc node-turn && npx tsx --test scripts/live-audio.wrtc.test.ts
import { createRequire } from 'node:module';
import { test, after } from 'node:test';
after(() => setTimeout(() => process.exit(process.exitCode || 0), 500));
import assert from 'node:assert/strict';
import { createMemoryLiveBackend, liveState } from '../src/lib/abboud/liveClass.ts';
import { HostAudio, GuestAudio } from '../src/lib/abboud/liveAudio.ts';
const w = createRequire(import.meta.url)('@roamhq/wrtc');
const { RTCAudioSource, RTCAudioSink } = w.nonstandard;
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
const timers: NodeJS.Timeout[] = [];
// A real "microphone": a 48 kHz sine fed in 10 ms frames.
function tone(freq: number) {
  const source = new RTCAudioSource(); let t = 0;
  timers.push(setInterval(() => { const samples = new Int16Array(480); for (let i = 0; i < 480; i++) samples[i] = Math.round(8000 * Math.sin(2 * Math.PI * freq * (t++) / 48000)); source.onData({ samples, sampleRate: 48000, bitsPerSample: 16, channelCount: 1, numberOfFrames: 480 }); }, 10));
  const track = source.createTrack(); return async () => new w.MediaStream([track]) as MediaStream;
}
// Listens to a received track; counts loud frames.
function ear(track: MediaStreamTrack) { const sink = new RTCAudioSink(track); const ear = { loud: 0, frames: 0, stop: () => sink.stop() }; sink.ondata = (d: { samples: Int16Array }) => { ear.frames++; let m = 0; for (const s of d.samples) m = Math.max(m, Math.abs(s)); if (m > 1000) ear.loud++; }; return ear; }

test('real WebRTC (native stack): teacher voice reaches both students; the speaker reaches the teacher and is relayed to the other student', async () => {
  const b = createMemoryLiveBackend();
  await b.as('boss', { admin: true }).saveConfig({ hostUid: 'abood', hostName: 'عبود', allowed: ['salma', 'hessa'], names: { salma: 'سلمى', hessa: 'حصة' } });
  const hs = b.as('abood');
  await hs.publishState('abood', liveState({ active: true, sessionId: 'S1', lessonId: 2, lessonTitle: 't', source: '', draft: '', explained: [], speaker: '' }));
  const peer = () => new w.RTCPeerConnection({ iceServers: [] }) as RTCPeerConnection;
  let speaker: MediaStreamTrack | null = null; const states: Record<string, string> = {};
  const host = new HostAudio(hs, 'abood', 'S1', { createPeer: peer, getMic: tone(440), gatherMs: 1500 }, { onSpeakerTrack: t => { speaker = t; }, onPeers: s => Object.assign(states, s), onError: e => console.error('host', e) });
  await host.startMic();
  const stopHost = hs.watchSignals('abood', s => void host.onSignals(s));
  const guests: Record<string, { audio: GuestAudio; tracks: MediaStreamTrack[]; state: string; stop: () => void }> = {};
  for (const g of ['salma', 'hessa']) {
    const st = b.as(g); await st.join('abood', g, 'S1', false);
    const entry: any = { tracks: [], state: 'new' };
    entry.audio = new GuestAudio(st, 'abood', g, { createPeer: peer, getMic: tone(g === 'salma' ? 660 : 880), gatherMs: 1500 }, { onTracks: t => { entry.tracks = t; }, onState: s => { entry.state = s; }, onError: e => console.error(g, e) });
    entry.stop = st.watchSignal('abood', g, sig => void entry.audio.onSignal(sig, 'S1'));
    guests[g] = entry;
  }
  host.sync(['salma', 'hessa']);
  for (let i = 0; i < 60 && !(guests.salma.state === 'connected' && guests.hessa.state === 'connected'); i++) await wait(200);
  assert.equal(guests.salma.state, 'connected'); assert.equal(guests.hessa.state, 'connected');
  assert.deepEqual(states, { salma: 'connected', hessa: 'connected' });
  assert.equal(guests.salma.tracks.length, 2, 'teacher + relay tracks');
  const teacherAtSalma = ear(guests.salma.tracks[0]), teacherAtHessa = ear(guests.hessa.tracks[0]), relayAtHessa = ear(guests.hessa.tracks[1]);
  await wait(1200);
  assert.ok(teacherAtSalma.loud > 20, `Salma hears the teacher (${teacherAtSalma.loud} loud frames)`);
  assert.ok(teacherAtHessa.loud > 20, `Hessa hears the teacher (${teacherAtHessa.loud})`);
  assert.equal(relayAtHessa.loud, 0, 'nobody has the turn: the relay is silent');
  // Salma gets the turn and opens her mic (no renegotiation).
  await guests.salma.audio.startMic(); host.setSpeaker('salma');
  for (let i = 0; i < 25 && !speaker; i++) await wait(200);
  assert.ok(speaker, 'teacher device has Salma\'s live track');
  const salmaAtHost = ear(speaker!); const before = relayAtHessa.loud;
  await wait(1500);
  assert.ok(salmaAtHost.loud > 20, `the teacher hears Salma (${salmaAtHost.loud})`);
  assert.ok(relayAtHessa.loud - before > 20, `Hessa hears Salma relayed (${relayAtHessa.loud - before})`);
  // Badr/Reem playing on the teacher's device: his mic is muted.
  host.setMuted(true); await wait(600); const m0 = teacherAtSalma.loud; await wait(1000);
  assert.ok(teacherAtSalma.loud - m0 <= 2, `muted teacher is silent (${teacherAtSalma.loud - m0})`);
  host.setMuted(false); await wait(600); const m1 = teacherAtSalma.loud; await wait(1000);
  assert.ok(teacherAtSalma.loud - m1 > 20, 'unmuted again');
  // Turn ends: relay goes quiet.
  guests.salma.audio.stopMic(); host.setSpeaker(''); await wait(600); const r0 = relayAtHessa.loud; await wait(1000);
  assert.ok(relayAtHessa.loud - r0 <= 2, `relay silent after the turn (${relayAtHessa.loud - r0})`);
  for (const e of [teacherAtSalma, teacherAtHessa, relayAtHessa, salmaAtHost]) e.stop();
  host.close(); stopHost(); for (const g of Object.values(guests)) { g.stop(); g.audio.close(); }
  timers.forEach(clearInterval);
});

// Mobile data / carrier NAT: no direct path at all. Forcing relay-only proves the class still works through TURN, with the
// ICE servers coming from the same loader the app uses (/api/abboud/ice-servers → createPeer(iceServers)).
test('relay only (as on mobile data): teacher voice and the speaker\'s voice flow through a TURN server', async () => {
  const Turn = createRequire(import.meta.url)('node-turn');
  const turn = new Turn({ listeningPort: 3479, listeningIps: ['127.0.0.1'], relayIps: ['127.0.0.1'], authMech: 'long-term', credentials: { abboud: 'class-pass' }, realm: 'academy', debugLevel: 'OFF' });
  turn.start();
  try {
    const b = createMemoryLiveBackend();
    await b.as('boss', { admin: true }).saveConfig({ hostUid: 'abood', hostName: 'عبود', allowed: ['salma'], names: { salma: 'سلمى' } });
    const hs = b.as('abood');
    await hs.publishState('abood', liveState({ active: true, sessionId: 'R1', lessonId: 2, lessonTitle: 't', source: '', draft: '', explained: [], speaker: 'salma' }));
    const ice = { iceServers: [{ urls: ['turn:127.0.0.1:3479?transport=udp'], username: 'abboud', credential: 'class-pass' }], relay: true };
    const used: RTCIceServer[][] = []; const pcs: any[] = [];
    const peer = (iceServers: RTCIceServer[]) => { used.push(iceServers); const pc = new w.RTCPeerConnection({ iceServers, iceTransportPolicy: 'relay' }); pcs.push(pc); return pc as RTCPeerConnection; };
    let speaker: MediaStreamTrack | null = null;
    const host = new HostAudio(hs, 'abood', 'R1', { createPeer: peer, loadIce: async () => ice, getMic: tone(440), gatherMs: 3000 }, { onSpeakerTrack: t => { speaker = t; }, onError: e => console.error('host', e) });
    await host.startMic(); host.setSpeaker('salma');
    const stopHost = hs.watchSignals('abood', s => void host.onSignals(s));
    const st = b.as('salma'); await st.join('abood', 'salma', 'R1', false);
    const g: any = { tracks: [], state: 'new' };
    g.audio = new GuestAudio(st, 'abood', 'salma', { createPeer: peer, loadIce: async () => ice, getMic: tone(660), gatherMs: 3000 }, { onTracks: t => { g.tracks = t; }, onState: s => { g.state = s; } });
    const stopGuest = st.watchSignal('abood', 'salma', sig => void g.audio.onSignal(sig, 'R1'));
    host.sync(['salma']);
    for (let i = 0; i < 80 && g.state !== 'connected'; i++) await wait(200);
    assert.equal(g.state, 'connected', 'connects with relay candidates only');
    assert.ok(used.length >= 2 && used.every(s => s === ice.iceServers), 'both sides used the loaded TURN servers');
    // The selected pair really is relayed.
    const stats = await pcs[0].getStats(); let relayed = false;
    stats.forEach((r: any) => { if (r.type === 'local-candidate' && r.candidateType === 'relay') relayed = true; });
    assert.ok(relayed, 'relay candidates in use');
    const teacher = ear(g.tracks[0]); await wait(1500);
    assert.ok(teacher.loud > 20, `Salma hears the teacher through TURN (${teacher.loud})`);
    await g.audio.startMic();
    for (let i = 0; i < 25 && !speaker; i++) await wait(200);
    const atHost = ear(speaker!); await wait(1500);
    assert.ok(atHost.loud > 20, `the teacher hears Salma through TURN (${atHost.loud})`);
    teacher.stop(); atHost.stop(); host.close(); g.audio.close(); stopHost(); stopGuest();
  } finally { turn.stop(); timers.forEach(clearInterval); }
});
