import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./tutorBoard.css";
import { BOARD_PERSONAS } from "../../data/saraBoardPersonas";
import { buildHuman, LOOKS } from "./humanAvatar";
import { getSpeechLevel } from "../../lib/speechLevel";
// Ported from ai-tutor-platform; characters rebuilt as procedural human teachers (humanAvatar.ts, no external assets).
type Agent = { id: string; gender: "male" | "female"; nameAr: string; nameEn: string };
const AGENTS: Agent[] = BOARD_PERSONAS.map(p => ({ id: p.id, gender: p.gender, nameAr: p.nameAr, nameEn: p.nameEn }));

export interface Tutor3DAvatarProps {
  agentId: string;
  isArabic: boolean;
  isSpeaking: boolean;
  isListening?: boolean;
  isThinking?: boolean;
  compact?: boolean;
  mode?: "showcase" | "docked" | "floating";
  onToggleFloating?: () => void;
  onTriggerVoicePreview?: () => void;
}

export const Tutor3DAvatar: React.FC<Tutor3DAvatarProps> = ({
  agentId,
  isArabic,
  isSpeaking,
  isListening = false,
  isThinking = false,
  compact = false,
  mode = "docked",
  onToggleFloating,
  onTriggerVoicePreview,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [gesture, setGesture] = useState<"idle" | "wave" | "explain" | "celebrate">("idle");
  const [cameraAngle, setCameraAngle] = useState<"front" | "side" | "closeup">("front");

  // Mutable refs for animation loop access without rebuilding scene
  const stateRef = useRef({
    isSpeaking,
    isListening,
    isThinking,
    gesture,
    cameraAngle,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    stateRef.current.isSpeaking = isSpeaking;
    stateRef.current.isListening = isListening;
    stateRef.current.isThinking = isThinking;
    stateRef.current.gesture = gesture;
    stateRef.current.cameraAngle = cameraAngle;
  }, [isSpeaking, isListening, isThinking, gesture, cameraAngle]);

  const agent: Agent = AGENTS.find((a) => a.id === agentId) || AGENTS[0];

  const triggerTemporaryGesture = (newGesture: "wave" | "explain" | "celebrate") => {
    setGesture(newGesture);
    setTimeout(() => {
      setGesture("idle");
    }, 2600);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const look = LOOKS[agent.id] || LOOKS.sara;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || (compact ? 210 : 280);
    const mobile = typeof window !== "undefined" && (window.innerWidth < 700 || /Mobi|Android/i.test(navigator.userAgent));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 50);
    camera.position.set(0, 0.82, 2.35);
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: "low-power", preserveDrawingBuffer: !!(window as any).__AVATAR_SHOT__ }); }
    catch { container.innerHTML = ""; return; } // no WebGL: the board's AvatarBoundary/fallback card is shown instead
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Soft studio light + gold rim (navy/gold framing comes from the card CSS)
    scene.add(new THREE.HemisphereLight(0xfff6e8, 0x1b2b48, 1.15));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.9); key.position.set(1.6, 2.6, 3.2); scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.65); fill.position.set(-2.4, 1.4, 2.2); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xc49e3a, 1.4); rim.position.set(0, 2.2, -2.6); scene.add(rim);

    const rig = buildHuman(look);
    rig.root.position.set(0, 0, 0);
    scene.add(rig.root);
    // gold halo behind the teacher
    const haloGeo = new THREE.RingGeometry(0.62, 0.66, 64); const haloMat = new THREE.MeshBasicMaterial({ color: 0xc49e3a, transparent: true, opacity: 0.55 });
    const halo = new THREE.Mesh(haloGeo, haloMat); halo.position.set(0, 0.95, -0.45); scene.add(halo);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.mouseX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      stateRef.current.mouseY = Math.max(-1, Math.min(1, -((e.clientY - rect.top) / rect.height) * 2 + 1));
    };
    window.addEventListener("mousemove", handlePointerMove);

    // Only animate while visible (performance on mobile / hidden tabs)
    let visible = true;
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(es => { visible = es.some(e => e.isIntersecting); }) : null;
    io?.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0, nextBlink = 1.5, blinkT = -1, mouthLvl = 0, lastT = 0;
    const shot = (window as any).__AVATAR_SHOT__ as { speaking?: number; gesture?: string; cam?: string } | undefined;
    const lerp = shot ? (_a: number, b: number, _k: number) => b : (a: number, b: number, k: number) => a + (b - a) * k; // screenshots: settle instantly

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime(); const dt = Math.min(0.05, t - lastT); lastT = t;
      if (mobile && !stateRef.current.isSpeaking && Math.floor(t * 60) % 2) return; // ~30fps when idle on phones
      const st = shot?.cam ? { ...stateRef.current, cameraAngle: shot.cam as any } : stateRef.current;
      const live = getSpeechLevel();
      const speaking = st.isSpeaking || live >= 0 || !!shot?.speaking;
      const gestureNow = (shot?.gesture as any) || st.gesture;

      // camera
      const cz = st.cameraAngle === "closeup" ? 1.35 : 2.65, cx = st.cameraAngle === "side" ? 0.8 : 0, cy = st.cameraAngle === "closeup" ? 0.92 : 0.8;
      camera.position.x = lerp(camera.position.x, cx, 0.08); camera.position.y = lerp(camera.position.y, cy, 0.08); camera.position.z = lerp(camera.position.z, cz, 0.08);
      camera.lookAt(0, st.cameraAngle === "closeup" ? 0.88 : 0.58, 0);

      // breathing + idle sway
      const br = Math.sin(t * 1.7);
      rig.torso.scale.set(1 + br * 0.006, 1 + br * 0.008, 1 + br * 0.01);
      rig.torso.rotation.z = Math.sin(t * 0.6) * 0.012;
      rig.torso.rotation.y = Math.sin(t * 0.37) * 0.03;

      // head: look toward pointer + subtle life motion; more animated while speaking
      let hy = st.mouseX * 0.22 + Math.sin(t * 0.5) * 0.05, hx = -st.mouseY * 0.1 + Math.sin(t * 0.8) * 0.02, hz = Math.sin(t * 0.43) * 0.025;
      if (speaking) { hy += Math.sin(t * 2.3) * 0.06; hx += Math.sin(t * 3.1) * 0.035 + mouthLvl * 0.03; hz += Math.sin(t * 1.7) * 0.03; }
      else if (st.isListening) { hz = 0.08; hx = 0.05 + Math.sin(t * 3) * 0.02; }
      else if (st.isThinking) { hy = 0.2; hx = -0.1; }
      rig.head.rotation.y = lerp(rig.head.rotation.y, hy, 0.08); rig.head.rotation.x = lerp(rig.head.rotation.x, hx, 0.08); rig.head.rotation.z = lerp(rig.head.rotation.z, hz, 0.08);
      for (const ir of rig.irises) { ir.position.x = lerp(ir.position.x, st.mouseX * 0.004, 0.1); ir.position.y = lerp(ir.position.y, st.mouseY * 0.003, 0.1); }

      // blinking (natural random interval, occasional double blink)
      if (blinkT < 0 && t > nextBlink) { blinkT = 0; nextBlink = t + 2 + Math.random() * 3.5; }
      let lid = -2.0;
      if (blinkT >= 0) { blinkT += dt; const k = Math.sin(Math.min(1, blinkT / 0.16) * Math.PI); lid = -2.0 + k * 2.05; if (blinkT > 0.16) blinkT = -1; }
      for (const l of rig.lids) l.rotation.x = lid;

      // lip-sync: real TTS loudness when available, otherwise a speech rhythm while speaking
      const target = live >= 0 ? live : speaking ? (shot?.speaking ?? (0.35 + 0.35 * Math.abs(Math.sin(t * 11)) * Math.abs(Math.sin(t * 3.3)))) : 0;
      mouthLvl = lerp(mouthLvl, target, target > mouthLvl ? 0.55 : 0.25);
      rig.mouth.scale.y = 0.12 + mouthLvl * 0.85;
      rig.lowerLip.position.y = -0.006 - mouthLvl * 0.012;
      rig.upperLip.position.y = 0.005 + mouthLvl * 0.002;
      rig.jaw.rotation.x = mouthLvl * 0.05;
      const browUp = speaking ? 0.002 + mouthLvl * 0.004 : 0;
      rig.brows.forEach(b => { b.position.y = lerp(b.position.y, 0.05 + browUp, 0.2); });

      // gestures
      const ease = 0.09;
      let rz = 0.08, rx = -0.05, fr = -0.18, lz = -0.08, lx = -0.05, fl = -0.18;
      if (gestureNow === "wave") { rz = 2.5; rx = 0; fr = -0.5 + Math.sin(t * 9) * 0.35; }
      else if (gestureNow === "celebrate") { rz = 2.3 + Math.sin(t * 8) * 0.15; lz = -2.3 - Math.sin(t * 8) * 0.15; fr = -0.3; fl = -0.3; }
      else if (gestureNow === "explain" || speaking) { rx = -1.05 + Math.sin(t * 1.9) * 0.12; rz = 0.12 + Math.sin(t * 1.3) * 0.08; fr = -0.8 + Math.sin(t * 2.4) * 0.2; lx = -0.7 + Math.sin(t * 1.6 + 1) * 0.08; lz = -0.1; fl = -0.7 + Math.sin(t * 2 + 2) * 0.12; }
      rig.armR.rotation.z = lerp(rig.armR.rotation.z, rz, ease); rig.armR.rotation.x = lerp(rig.armR.rotation.x, rx, ease); rig.foreR.rotation.x = lerp(rig.foreR.rotation.x, fr, ease);
      rig.armL.rotation.z = lerp(rig.armL.rotation.z, lz, ease); rig.armL.rotation.x = lerp(rig.armL.rotation.x, lx, ease); rig.foreL.rotation.x = lerp(rig.foreL.rotation.x, fl, ease);
      halo.scale.setScalar(1 + (speaking ? mouthLvl * 0.04 : 0));
      renderer.render(scene, camera);
    };
    if (shot) { for (let i = 0; i < 90; i++) { clock.elapsedTime += 1 / 30; } }
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || 320, h = container.clientHeight || (compact ? 210 : 280);
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handlePointerMove);
      resizeObserver.disconnect(); io?.disconnect();
      rig.dispose(); haloGeo.dispose(); haloMat.dispose();
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [agentId, agent.id, compact]);

  return (
    <div className={`tutor-3d-stage-card ${mode} ${isSpeaking ? "is-speaking" : ""} ${isListening ? "is-listening" : ""}`}>
      {/* Top Status & Camera Controls */}
      <div className="tutor-3d-stage-header">
        <div className="tutor-3d-badge">
          <span className="pulse-dot-3d" />
          <span>
            {isSpeaking
              ? isArabic
                ? `🔊 ${agent.nameAr} يتحدث الآن (3D Live)`
                : `🔊 ${agent.nameEn} Speaking (3D Live)`
              : isListening
              ? isArabic
                ? "🎙️ يستمع إليك بانتباه..."
                : "🎙️ Listening attentively..."
              : isThinking
              ? isArabic
                ? "⚡ يحلل السبورة بـ Gemini 4..."
                : "⚡ Analyzing via Gemini 4..."
              : isArabic
              ? `🧊 مجسّم ثلاثي الأبعاد • ${agent.nameAr}`
              : `🧊 3D Human Avatar • ${agent.nameEn}`}
          </span>
        </div>

        <div className="tutor-3d-header-actions">
          <button
            type="button"
            onClick={() =>
              setCameraAngle((prev) =>
                prev === "front" ? "closeup" : prev === "closeup" ? "side" : "front"
              )
            }
            className="tutor-3d-mini-btn"
            title={isArabic ? "تغيير زاوية الكاميرا ثلاثية الأبعاد" : "Switch 3D Camera Angle"}
          >
            🎥 {cameraAngle === "front" ? "1x" : cameraAngle === "closeup" ? "Zoom" : "Side"}
          </button>

          {onToggleFloating && (
            <button
              type="button"
              onClick={onToggleFloating}
              className="tutor-3d-mini-btn highlight"
              title={
                mode === "floating"
                  ? isArabic
                    ? "تثبيت المجسم في القائمة الجانبية"
                    : "Dock 3D Avatar"
                  : isArabic
                  ? "انبثاق المجسم ثلاثي الأبعاد فوق السبورة"
                  : "Pop-out 3D Avatar"
              }
            >
              {mode === "floating"
                ? isArabic
                  ? "📌 تثبيت"
                  : "📌 Dock"
                : isArabic
                ? "✨ انبثاق 3D"
                : "✨ Pop-out 3D"}
            </button>
          )}
        </div>
      </div>

      {/* WebGL 3D Canvas Container */}
      <div
        ref={mountRef}
        className={`tutor-3d-canvas-mount ${compact ? "compact" : ""}`}
      />

      {/* Interactive 3D Expression & Voice Bar */}
      <div className="tutor-3d-controls-bar">
        <button
          type="button"
          onClick={() => triggerTemporaryGesture("wave")}
          className={`tutor-3d-gesture-btn ${gesture === "wave" ? "active" : ""}`}
        >
          👋 {isArabic ? "تحية" : "Wave"}
        </button>
        <button
          type="button"
          onClick={() => triggerTemporaryGesture("explain")}
          className={`tutor-3d-gesture-btn ${gesture === "explain" ? "active" : ""}`}
        >
          👉 {isArabic ? "حركة شرح" : "Explain"}
        </button>
        <button
          type="button"
          onClick={() => triggerTemporaryGesture("celebrate")}
          className={`tutor-3d-gesture-btn ${gesture === "celebrate" ? "active" : ""}`}
        >
          🎉 {isArabic ? "تشجيع" : "Cheer"}
        </button>
        {onTriggerVoicePreview && (
          <button
            type="button"
            onClick={onTriggerVoicePreview}
            className={`tutor-3d-gesture-btn voice-btn ${isSpeaking ? "speaking" : ""}`}
          >
            🎙️ {isArabic ? "نطق مباشر" : "Speak"}
          </button>
        )}
      </div>
    </div>
  );
};
