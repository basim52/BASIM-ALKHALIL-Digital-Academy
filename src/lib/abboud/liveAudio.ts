import type { LiveClassStore, RtcSignal } from './liveClass';

/**
 * Live voice for «فصل عبود المباشر» over WebRTC, no media server: the teacher's device is the hub (star).
 *  - transceiver 0: teacher's mic → every joined student.
 *  - transceiver 1 (sendrecv): the allowed speaker's mic → teacher, and the teacher relays that track to the
 *    other students on their transceiver 1 (replaceTrack, so changing speaker needs no renegotiation).
 * Signaling is one Firestore doc per student (abboudClasses/{host}/rtc/{student}) with full SDPs (no trickle ICE).
 * Only public STUN is used (no TURN): on some strict networks a connection cannot form, and the student device
 * falls back to TTS of the finished sentences.
 */
export const ICE_SERVERS: RTCIceServer[] = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }];
export type AudioDeps = {
  createPeer?: () => RTCPeerConnection;
  getMic?: () => Promise<MediaStream>;
  /** How long to wait for ICE gathering before sending the SDP we have. */
  gatherMs?: number;
};
const defaultPeer = () => new RTCPeerConnection({ iceServers: ICE_SERVERS });
const defaultMic = () => navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false });
export const liveAudioSupported = () => typeof RTCPeerConnection !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;

function gathered(pc: RTCPeerConnection, ms: number) {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise<void>(resolve => {
    const done = () => { clearTimeout(timer); pc.removeEventListener('icegatheringstatechange', check); resolve(); };
    const check = () => { if (pc.iceGatheringState === 'complete') done(); };
    const timer = setTimeout(done, ms);
    pc.addEventListener('icegatheringstatechange', check);
  });
}

type HostPeer = { pc: RTCPeerConnection; teacher: RTCRtpTransceiver; relay: RTCRtpTransceiver; inbound: MediaStreamTrack | null; restart: string; state: RTCPeerConnectionState };
export type HostAudioEvents = {
  /** Connection state per student (for the host's «🎧» list). */
  onPeers?(states: Record<string, RTCPeerConnectionState>): void;
  /** The allowed speaker's live mic, for the teacher to hear (null when nobody is speaking). */
  onSpeakerTrack?(track: MediaStreamTrack | null): void;
  onError?(error: unknown): void;
};
export class HostAudio {
  private peers = new Map<string, HostPeer>();
  private mic: MediaStream | null = null;
  private speaker = '';
  private muted = false;
  private closed = false;
  constructor(private store: LiveClassStore, private hostUid: string, private sessionId: string, private deps: AudioDeps = {}, private events: HostAudioEvents = {}) {}
  /** Must run inside the teacher's tap (permission prompt). */
  async startMic() {
    this.mic = await (this.deps.getMic || defaultMic)();
    this.applyMute();
    for (const p of this.peers.values()) await p.teacher.sender.replaceTrack(this.track());
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
    for (const uid of present) if (!this.peers.has(uid)) void this.connect(uid);
    for (const uid of Array.from(this.peers.keys())) if (!present.includes(uid)) this.drop(uid);
  }
  private drop(uid: string) {
    const p = this.peers.get(uid); if (!p) return;
    this.peers.delete(uid); p.pc.close();
    void this.store.clearSignal(this.hostUid, uid).catch(() => {});
    if (uid === this.speaker) this.route();
    this.report();
  }
  async connect(uid: string, restart = '') {
    const old = this.peers.get(uid); if (old) { this.peers.delete(uid); old.pc.close(); }
    try {
      const pc = (this.deps.createPeer || defaultPeer)();
      const teacher = pc.addTransceiver('audio', { direction: 'sendonly' });
      const relay = pc.addTransceiver('audio', { direction: 'sendrecv' });
      const peer: HostPeer = { pc, teacher, relay, inbound: null, restart, state: 'new' };
      this.peers.set(uid, peer);
      if (this.track()) await teacher.sender.replaceTrack(this.track());
      pc.ontrack = e => { if (e.transceiver === relay || e.transceiver.mid === relay.mid) { peer.inbound = e.track; if (uid === this.speaker) this.route(); } };
      pc.onconnectionstatechange = () => {
        peer.state = pc.connectionState; this.report();
        if (pc.connectionState === 'failed' && this.peers.get(uid) === peer && !this.closed) setTimeout(() => { if (this.peers.get(uid) === peer) void this.connect(uid); }, 3000);
      };
      await pc.setLocalDescription(await pc.createOffer());
      await gathered(pc, this.deps.gatherMs ?? 2500);
      if (this.closed || this.peers.get(uid) !== peer) return;
      await this.store.sendOffer(this.hostUid, uid, this.sessionId, pc.localDescription?.sdp || '');
      this.report();
    } catch (error) { this.events.onError?.(error); }
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
  onError?(error: unknown): void;
};
export class GuestAudio {
  private pc: RTCPeerConnection | null = null;
  private relay: RTCRtpTransceiver | null = null;
  private handled = '';
  private mic: MediaStream | null = null;
  private tracks: MediaStreamTrack[] = [];
  private closed = false;
  constructor(private store: LiveClassStore, private hostUid: string, private uid: string, private deps: AudioDeps = {}, private events: GuestAudioEvents = {}) {}
  async onSignal(signal: RtcSignal | null, sessionId: string) {
    if (this.closed || !signal || signal.sessionId !== sessionId || !signal.offer || signal.offer === this.handled) return;
    this.handled = signal.offer;
    this.pc?.close(); this.tracks = []; this.events.onTracks?.([]);
    try {
      const pc = (this.deps.createPeer || defaultPeer)(); this.pc = pc;
      pc.ontrack = e => { this.tracks = [...this.tracks.filter(t => t.id !== e.track.id), e.track]; this.events.onTracks?.(this.tracks); };
      pc.onconnectionstatechange = () => { if (this.pc === pc) this.events.onState?.(pc.connectionState); };
      await pc.setRemoteDescription({ type: 'offer', sdp: signal.offer });
      this.relay = pc.getTransceivers()[1] || null;
      if (this.relay) { this.relay.direction = 'sendrecv'; const t = this.mic?.getAudioTracks()[0]; if (t) await this.relay.sender.replaceTrack(t); }
      await pc.setLocalDescription(await pc.createAnswer());
      await gathered(pc, this.deps.gatherMs ?? 2500);
      if (this.closed || this.pc !== pc) return;
      await this.store.sendAnswer(this.hostUid, this.uid, pc.localDescription?.sdp || '');
    } catch (error) { this.events.onError?.(error); }
  }
  /** Ask the teacher's device for a fresh connection (e.g. after a failure). */
  requestRestart() { return this.store.sendAnswer(this.hostUid, this.uid, `restart:${Date.now().toString(36)}`).catch(() => {}); }
  /** Only while this student has the turn, inside their tap. */
  async startMic() {
    this.mic = await (this.deps.getMic || defaultMic)();
    const t = this.mic.getAudioTracks()[0];
    if (this.relay && t) await this.relay.sender.replaceTrack(t);
  }
  stopMic() {
    void this.relay?.sender.replaceTrack(null).catch(() => {});
    this.mic?.getTracks().forEach(t => t.stop()); this.mic = null;
  }
  close() { this.closed = true; this.stopMic(); this.pc?.close(); this.pc = null; }
}
