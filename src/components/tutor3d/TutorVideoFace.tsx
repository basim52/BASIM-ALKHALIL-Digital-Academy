import React, { useEffect, useRef, useState } from "react";
import { isSpeechPlaying } from "../../lib/speechLevel";
import { ensurePlaybackSession } from "../../lib/audio";

/** Laughter / praise cues. Gemini TTS has no fixed laugh tag in our code; we also catch bracketed style tags like [laughing] / [laughs]. */
const LAUGH_RE = /(ه{3,}|هه+ه|😄|😂|🤣|😆|😁|\[(laugh|laughs|laughing|chuckle|chuckles|giggle)[^\]]*\]|\b(haha+|hehe+|lol)\b|ممتاز|رائع|أحسنت|احسنت|برافو|بطل|\b(excellent|awesome|well done|great job|bravo|perfect|amazing)\b)/i;
export const hasLaughCue = (t: string) => LAUGH_RE.test(t || "");
const COOLDOWN_MS = 12000;
type Clip = "idle" | "talk" | "laugh";

/** Looping video face: idle by default, talk while TTS plays, laugh once on cues. Crossfades between 3 stacked <video>s. */
export const TutorVideoFace: React.FC<{ id: string; alt: string; isSpeaking: boolean; onFail: () => void }> = ({ id, alt, isSpeaking, onFail }) => {
  const root = useRef<HTMLDivElement | null>(null);
  const refs = { idle: useRef<HTMLVideoElement | null>(null), talk: useRef<HTMLVideoElement | null>(null), laugh: useRef<HTMLVideoElement | null>(null) };
  const [clip, setClip] = useState<Clip>("idle");
  const [loaded, setLoaded] = useState<Record<Clip, boolean>>({ idle: true, talk: false, laugh: false });
  const [visible, setVisible] = useState(true);
  const [bad, setBad] = useState<Record<Clip, boolean>>({ idle: false, talk: false, laugh: false }); // a missing clip never covers the still
  const fail = (k: Clip) => { setBad(b => ({ ...b, [k]: true })); if (k === "idle") onFail(); else if (k === "laugh") { laughing.current = false; setClip(isSpeechPlaying() ? "talk" : "idle"); } };
  const speakingRef = useRef(isSpeaking); speakingRef.current = isSpeaking;
  const laughing = useRef(false), lastLaugh = useRef(0), pendingLaugh = useRef(false);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // reset when tutor changes (only the active tutor's clips are ever loaded)
  useEffect(() => { setClip("idle"); setLoaded({ idle: true, talk: false, laugh: false }); setBad({ idle: false, talk: false, laugh: false }); laughing.current = false; }, [id]);

  // preload talk/laugh after idle is ready (lazy, active tutor only)
  useEffect(() => { if (reduced) return; const t = setTimeout(() => setLoaded({ idle: true, talk: true, laugh: true }), 1200); return () => clearTimeout(t); }, [id, reduced]);

  // pause offscreen
  useEffect(() => {
    const el = root.current; if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el); return () => io.disconnect();
  }, []);

  // laugh cue from spoken text
  useEffect(() => {
    const h = (e: Event) => {
      const text = (e as CustomEvent).detail?.text || "";
      if (!hasLaughCue(text) || Date.now() - lastLaugh.current < COOLDOWN_MS) return;
      pendingLaugh.current = true;
    };
    window.addEventListener("tutor-speech-text", h); return () => window.removeEventListener("tutor-speech-text", h);
  }, []);

  // decide clip
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (laughing.current) return;
      const speaking = isSpeechPlaying(); // real playback only, never the request/text event
      if (speaking && pendingLaugh.current && !reduced) {
        pendingLaugh.current = false; lastLaugh.current = Date.now(); laughing.current = true;
        setLoaded(l => ({ ...l, laugh: true })); setClip("laugh"); return;
      }
      setClip(c => (c === "laugh" ? c : speaking ? "talk" : "idle"));
    };
    tick(); return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // play/pause
  useEffect(() => {
    (Object.keys(refs) as Clip[]).forEach(k => {
      const v = refs[k].current; if (!v) return;
      const on = visible && !document.hidden && k === clip && !reduced;
      if (on) { v.muted = true; v.defaultMuted = true; v.volume = 0; ensurePlaybackSession(); if (k === "laugh") v.currentTime = 0; v.play().catch(() => {}); } else if (!v.paused) v.pause();
    });
  }, [clip, visible, loaded, reduced]);

  const endLaugh = () => { laughing.current = false; setClip(isSpeechPlaying() ? "talk" : "idle"); };

  if (reduced) return <img className="tutor-video-poster" src={`/tutors/${id}.webp`} alt={alt} draggable={false} />;
  return (
    <div ref={root} className="tutor-video-face" data-clip={clip}>
      <img className="tutor-video-poster" src={`/tutors/${id}.webp`} alt={alt} draggable={false} />
      {(["idle", "talk", "laugh"] as Clip[]).map(k => loaded[k] && (
        <video key={id + k} ref={refs[k]} className={`tutor-video-clip ${clip === k && !bad[k] ? "on" : ""}`} muted playsInline disableRemotePlayback x-webkit-airplay="deny"
          loop={k !== "laugh"} preload={k === "idle" ? "auto" : "metadata"} autoPlay={k === "idle"} aria-hidden
          onEnded={k === "laugh" ? endLaugh : undefined} onError={() => fail(k)}>
          <source src={`/tutors/video/${id}-${k}.webm`} type="video/webm" />
          {/* when every <source> fails the error fires on the last <source>, not on the <video> */}
          <source src={`/tutors/video/${id}-${k}.mp4`} type="video/mp4" onError={() => fail(k)} />
        </video>
      ))}
    </div>
  );
};
