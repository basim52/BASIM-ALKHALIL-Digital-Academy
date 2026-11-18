import type { LiveClassStore, RtcSignal } from './liveClass';

/**
 * Live voice for «فصل عبود المباشر» over WebRTC, no media server: the teacher's device is the hub (star).
 *  - transceiver 0: teacher's mic → every joined student.
 *  - transceiver 1 (sendrecv): the allowed speaker's mic → teacher, and the teacher relays that track to the
 *    other students on their transceiver 1 (replaceTrack, so changing speaker needs no renegotiation).
 * Signaling is one Firestore doc per student (abboudClasses/{host}/rtc/{student}) with full SDPs (no trickle ICE).
 * ICE servers come from the server (POST /api/abboud/ice-servers): public STUN plus a TURN relay when one is
 * configured. Without TURN, phones on mobile data / carrier NAT usually cannot connect at all — that was why students
 * heard a synthetic voice instead of Abboud. Voices are never re-synthesised: what is not heard live is only shown as text.
 */
export const ICE_SERVERS: RTCIceServer[] = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }];
export type IceInfo = { iceServers: RTCIceServer[]; relay: boolean };
export type AudioDeps = {
  createPeer?: (iceServers: RTCIceServer[]) => RTCPeerConnection;
  getMic?: () => Promise<MediaStream>;
  /** Where the STUN/TURN list comes from (default: the server endpoint, falling back to public STUN). */
  loadIce?: () => Promise<IceInfo>;
  /** How long to wait for ICE gathering before sending the SDP we have (TURN candidates can take a few seconds). */
  gatherMs?: number;
};
const defaultPeer = (iceServers: RTCIceServer[]) => new RTCPeerConnection({ iceServers });
const defaultMic = () => navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false });
export const liveAudioSupported = () => typeof RTCPeerConnection !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
const DEFAULT_GATHER_MS = 4000;

/** Validates the server's answer; anything odd falls back to public STUN (never throws). */
export function parseIce(body: unknown): IceInfo {
  const list = body && typeof body === 'object' && Array.isArray((body as { iceServers?: unknown }).iceServers) ? (body as { iceServers: unknown[] }).iceServers : [];
  const servers: RTCIceServer[] = [];
  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const { urls, username, credential } = item as Record<string, unknown>;
    const u = (Array.isArray(urls) ? urls : [urls]).filter((x): x is string => typeof x === 'string' && /^(stun|turns?):/i.test(x));
    if (u.length) servers.push({ urls: u, ...(typeof username === 'string' ? { username } : {}), ...(typeof credential === 'string' ? { credential } : {}) });
  }
  const relay = servers.some(s => (Array.isArray(s.urls) ? s.urls : [s.urls]).some(x => /^turns?:/i.test(x)) && !!s.username && !!s.credential);
  return servers.length ? { iceServers: servers, relay } : { iceServers: ICE_SERVERS, relay: false };
}
let cached: { at: number; info: Promise<IceInfo> } | null = null;
const ICE_CACHE_MS = 60 * 60 * 1000;
/** Signed-in POST (the app adds the Firebase token to every POST /api/*); cached for an hour. */
export function fetchIce(fetchImpl: typeof fetch = (input, init) => fetch(input, init)): Promise<IceInfo> {
  if (cached && Date.now() - cached.at < ICE_CACHE_MS) return cached.info;
  const info = fetchImpl('/api/abboud/ice-servers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error(`ice-${r.status}`)))
    .then(parseIce)
    .catch(() => { cached = null; return { iceServers: ICE_SERVERS, relay: false }; });
  cached = { at: Date.now(), info };
  return info;
}
export function resetIceCache() { cached = null; }
const iceFor = (deps: AudioDeps) => deps.loadIce ? deps.loadIce().catch(() => ({ iceServers: ICE_SERVERS, relay: false })) : deps.createPeer ? Promise.resolve({ iceServers: ICE_SERVERS, relay: false }) : fetchIce();

function gathered(pc: RTCPeerConnection, ms: number) {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise<void>(resolve => {
    const done = () => { clearTimeout(timer); pc.removeEventListener('icegatheringstatechange', check); resolve(); };
    const check = () => { if (pc.iceGatheringState === 'complete') done(); };
    const timer = setTimeout(done, ms);
    pc.addEventListener('icegatheringstatechange', check);
  });
}

type HostPeer = { pc: RTCPeerConnection; teacher: RTCRtpTransceiver; relay: RTCRtpTransceiver; inbound: MediaStreamTrack | null; restart: string; state: RTCPeerConnectionState; retry?: ReturnType<typeof setTimeout> };
export type HostAudioEvents = {
  /** Connection state per student (for the host's «🎧» list). */
  onPeers?(states: Record<string, RTCPeerConnectionState>): void;
  /** The allowed speaker's live mic, for the teacher to hear (null when nobody is speaking). */
  onSpeakerTrack?(track: MediaStreamTrack | null): void;
  /** Whether a TURN relay is configured (false = only direct/STUN connections, often impossible on mobile data). */
  onIce?(info: IceInfo): void;
  /** The teacher's mic stopped by itself (another app/call took it, or the device was unplugged). */
  onMicEnded?(): void;
  onError?(error: unknown): void;
};
/** A connection that stays «disconnected» this long is rebuilt (mobile networks drop and come back). */
const DISCONNECT_GRACE_MS = 6000;
const RETRY_MS = 3000;
export class HostAudio {
  private peers = new Map<string, HostPeer>();
  private mic: MediaStream | null = null;
  private speaker = '';
  private muted = false;
  private closed = false;
  private ice: Promise<IceInfo>;
  /** Latest connect() per student; an older one still waiting for ICE servers gives up. */
  private attempts = new Map<string, number>();
  private attemptSeq = 0;
  constructor(private store: LiveClassStore, private hostUid: string, readonly sessionId: string, private deps: AudioDeps = {}, private events: HostAudioEvents = {}) {
    this.ice = iceFor(deps);
    void this.ice.then(info => { if (!this.closed) this.events.onIce?.(info); });
  }
  /** Asks for the microphone (inside the teacher's tap, or silently when permission was already granted). */
  async startMic() {
    if (this.mic) return;
    const mic = await (this.deps.getMic || defaultMic)();
    if (this.closed) { mic.getTracks().forEach(t => t.stop()); return; }
    this.mic = mic;
    const track = this.track();
    track?.addEventListener?.('ended', () => { if (this.mic === mic) { this.mic = null; this.events.onMicEnded?.(); for (const p of this.peers.values()) void p.teacher.sender.replaceTrack(null).catch(() => {}); } });
    this.applyMute();
    for (const p of this.peers.values()) await p.teacher.sender.replaceTrack(track);
  }
  get hasMic() { return !!this.mic; }
  private track() { return this.mic?.getAudioTracks()[0] || null; }
  /** Silence the teacher's mic while Badr/Reem/Sara play on his device (students hear them by their own TTS, not as an echo). */
  setMuted(muted: boolean) { this.muted = muted; this.applyMute(); }
  private applyMute() { const t = this.track(); if (t) t.enabled = !this.muted; }
  private report() { this.events.onPeers?.(Object.fromEntries(Array.from(this.peers, ([uid, p]) => [uid, p.state]))); }
  /** Keep one connection per present student. */
  sync(present: readonly string[]) {
    if (this.closed) return;
    for (const uid of present) if (!this.peers.has(uid) && !this.attempts.has(uid)) void this.connect(uid);
    for (const uid of Array.from(this.attempts.keys())) if (!present.includes(uid)) { this.attempts.delete(uid); this.drop(uid); }
  }
  /** Rebuild every student's connection (the teacher's «🔄 أعد توصيل الصوت»). */
  reconnectAll(present: readonly string[] = Array.from(this.peers.keys())) { for (const uid of new Set([...this.peers.keys(), ...present])) void this.connect(uid); }
  private drop(uid: string) {
    const p = this.peers.get(uid); if (!p) return;
    this.peers.delete(uid); this.attempts.delete(uid); clearTimeout(p.retry); p.pc.close();
    void this.store.clearSignal(this.hostUid, uid).catch(() => {});
    if (uid === this.speaker) this.route();
    this.report();
  }
  async connect(uid: string, restart = '') {
    const old = this.peers.get(uid); if (old) { this.peers.delete(uid); clearTimeout(old.retry); old.pc.close(); }
    const attempt = ++this.attemptSeq; this.attempts.set(uid, attempt);
    try {
      const { iceServers } = await this.ice;
      if (this.closed || this.attempts.get(uid) !== attempt) return;
      const pc = (this.deps.createPeer || defaultPeer)(iceServers);
      const teacher = pc.addTransceiver('audio', { direction: 'sendonly' });
      const relay = pc.addTransceiver('audio', { direction: 'sendrecv' });
      const peer: HostPeer = { pc, teacher, relay, inbound: null, restart, state: 'new' };
      this.peers.set(uid, peer);
      if (this.track()) await teacher.sender.replaceTrack(this.track());
      pc.ontrack = e => { if (e.transceiver === relay || e.transceiver.mid === relay.mid) { peer.inbound = e.track; if (uid === this.speaker) this.route(); } };
      const retry = (ms: number) => { clearTimeout(peer.retry); peer.retry = setTimeout(() => { if (this.peers.get(uid) === peer && !this.closed && peer.state !== 'connected') void this.connect(uid); }, ms); };
      pc.onconnectionstatechange = () => {
        peer.state = pc.connectionState; this.report();
        if (this.peers.get(uid) !== peer || this.closed) return;
        if (pc.connectionState === 'failed') retry(RETRY_MS);
        else if (pc.connectionState === 'disconnected') retry(DISCONNECT_GRACE_MS);
        else if (pc.connectionState === 'connected') { clearTimeout(peer.retry); if (uid === this.speaker || this.speaker) this.route(); }
      };
      await pc.setLocalDescription(await pc.createOffer());
      await gathered(pc, this.deps.gatherMs ?? DEFAULT_GATHER_MS);
      if (this.closed || this.peers.get(uid) !== peer) return;
      await this.store.sendOffer(this.hostUid, uid, this.sessionId, pc.localDescription?.sdp || '');
      this.report();
    } catch (error) {
      // Forget this attempt so «🔄 أعد توصيل الصوت» or the student rejoining tries again.
      if (this.attempts.get(uid) === attempt) { const p = this.peers.get(uid); this.peers.delete(uid); this.attempts.delete(uid); p?.pc.close(); this.report(); }
      this.events.onError?.(error);
    }
  }
  /** Answers (and restart requests) from students. */
  async onSignals(signals: readonly RtcSignal[]) {
    for (const s of signals) {
      const peer = this.peers.get(s.guestUid);
      if (!peer || s.sessionId !== this.sessionId || !s.answer) continue;
      if (s.answer.startsWith('restart:')) { if (peer.restart !== s.answer) void this.connect(s.guestUid, s.answer); continue; }
      if (peer.pc.signalingState === 'have-local-offer') {
        try { await peer.pc.setRemoteDescription({ type: 'answer', sdp: s.answer }); } catch (error) { this.events.onError?.(error); }
      }
    }
  }
  /** Who may talk: their mic reaches the teacher and is relayed to everyone else. */
  setSpeaker(uid: string) { this.speaker = uid; this.route(); }
  private route() {
    const track = (this.speaker && this.peers.get(this.speaker)?.inbound) || null;
    for (const [uid, p] of this.peers) void p.relay.sender.replaceTrack(uid === this.speaker ? null : track).catch(() => {});
    this.events.onSpeakerTrack?.(track);
  }
  states() { return Object.fromEntries(Array.from(this.peers, ([uid, p]) => [uid, p.state])); }
  close() {
    this.closed = true;
    for (const uid of Array.from(this.peers.keys())) this.drop(uid);
    this.mic?.getTracks().forEach(t => t.stop()); this.mic = null;
  }
}

export type GuestAudioEvents = {
  /** Remote tracks to play (teacher's voice, relayed speaker). */
  onTracks?(tracks: MediaStreamTrack[]): void;
  onState?(state: RTCPeerConnectionState): void;
  onIce?(info: IceInfo): void;
  onError?(error: unknown): void;
};
export class GuestAudio {
  private pc: RTCPeerConnection | null = null;
  private relay: RTCRtpTransceiver | null = null;
  private handled = '';
  private mic: MediaStream | null = null;
  private tracks: MediaStreamTrack[] = [];
  private closed = false;
  private ice: Promise<IceInfo>;
  constructor(private store: LiveClassStore, private hostUid: string, private uid: string, private deps: AudioDeps = {}, private events: GuestAudioEvents = {}) {
    this.ice = iceFor(deps);
    void this.ice.then(info => { if (!this.closed) this.events.onIce?.(info); });
  }
  async onSignal(signal: RtcSignal | null, sessionId: string) {
    if (this.closed || !signal || signal.sessionId !== sessionId || !signal.offer || signal.offer === this.handled) return;
    this.handled = signal.offer;
    this.pc?.close(); this.tracks = []; this.events.onTracks?.([]);
    try {
      const { iceServers } = await this.ice;
      if (this.closed || this.handled !== signal.offer) return;
      const pc = (this.deps.createPeer || defaultPeer)(iceServers); this.pc = pc;
      pc.ontrack = e => { this.tracks = [...this.tracks.filter(t => t.id !== e.track.id), e.track]; this.events.onTracks?.(this.tracks); };
      pc.onconnectionstatechange = () => { if (this.pc === pc) this.events.onState?.(pc.connectionState); };
      await pc.setRemoteDescription({ type: 'offer', sdp: signal.offer });
      this.relay = pc.getTransceivers()[1] || null;
      if (this.relay) { this.relay.direction = 'sendrecv'; const t = this.mic?.getAudioTracks()[0]; if (t) await this.relay.sender.replaceTrack(t); }
      await pc.setLocalDescription(await pc.createAnswer());
      await gathered(pc, this.deps.gatherMs ?? DEFAULT_GATHER_MS);
      if (this.closed || this.pc !== pc) return;
      await this.store.sendAnswer(this.hostUid, this.uid, pc.localDescription?.sdp || '');
    } catch (error) { this.events.onError?.(error); }
  }
  /** Ask the teacher's device for a fresh connection (e.g. after a failure). */
  requestRestart() { return this.store.sendAnswer(this.hostUid, this.uid, `restart:${Date.now().toString(36)}`).catch(() => {}); }
  get micOn() { return !!this.mic; }
  /** Only while this student has the turn, inside their tap. Independent of speech-to-text: the voice keeps going even if dictation stops. */
  async startMic() {
    if (this.mic) return;
    const mic = await (this.deps.getMic || defaultMic)();
    if (this.closed) { mic.getTracks().forEach(t => t.stop()); return; }
    this.mic = mic;
    const t = mic.getAudioTracks()[0];
    if (this.relay && t) await this.relay.sender.replaceTrack(t);
  }
  stopMic() {
    void this.relay?.sender.replaceTrack(null).catch(() => {});
    this.mic?.getTracks().forEach(t => t.stop()); this.mic = null;
  }
  close() { this.closed = true; this.stopMic(); this.pc?.close(); this.pc = null; }
}
