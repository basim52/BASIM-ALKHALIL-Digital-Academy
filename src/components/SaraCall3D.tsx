import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getSaraSpeechLevel } from '../lib/saraSpeechLevel';
import type { SaraAvatarState } from './SaraAvatar';

/*
 * Sara 3D (call / free chat / lesson conversations) — a procedurally built stylized 3D teacher (own model, no
 * third-party asset, so no licence issue): navy hijab with gold trim + pin, long navy abaya, toon shading.
 * She pops in with gold particles and a wave, wanders along the screen, hops up and sits on the edge of the
 * transcript card while the student talks, turns her head/body, breathes, blinks, nods while listening,
 * tilts + "thinking dots" while thinking, and her mouth follows the real loudness of her cloud voice.
 * Transparent overlay (pointer-events: none), ≤30 fps, pixel ratio ≤1.5, paused when the tab is hidden.
 */
export interface SaraCall3DProps {
  root: HTMLElement;
  state: SaraAvatarState;
  happy: boolean;
  onReady?: () => void;
  onFail?: () => void;
}

const NAVY = 0x0d2f63, NAVY_D = 0x08234d, NAVY_L = 0x1d4a8a, GOLD = 0xd4ae4f, SKIN = 0xf5d3ba, DARK = 0x2a180c;
const H = 152; // model height in model units (feet at y=0)

function toonGradient() {
  const c = document.createElement('canvas'); c.width = 4; c.height = 1; const g = c.getContext('2d')!;
  ['#555', '#999', '#ddd', '#fff'].forEach((col, i) => { g.fillStyle = col; g.fillRect(i, 0, 1, 1); });
  const t = new THREE.CanvasTexture(c); t.minFilter = t.magFilter = THREE.NearestFilter; t.generateMipmaps = false; return t;
}

function buildSara() {
  const grad = toonGradient();
  const toon = (color: number, extra: Partial<THREE.MeshToonMaterialParameters> = {}) => new THREE.MeshToonMaterial({ color, gradientMap: grad, ...extra });
  const mNavy = toon(NAVY), mNavyD = toon(NAVY_D), mNavyL = toon(NAVY_L), mGold = toon(GOLD, { emissive: 0x3a2a05 }), mSkin = toon(SKIN), mDark = toon(DARK);
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);

  // long abaya (lathe) + gold hem
  const robeProfile = [[0, 0], [31, 0], [30, 8], [27, 30], [23, 55], [20, 74], [19, 84], [14, 92], [0, 93]].map(([r, y]) => new THREE.Vector2(r, y));
  const robe = new THREE.Mesh(new THREE.LatheGeometry(robeProfile, 40), mNavy); body.add(robe);
  const hem = new THREE.Mesh(new THREE.TorusGeometry(30.6, 1.3, 8, 48), mGold); hem.rotation.x = Math.PI / 2; hem.position.y = 3; body.add(hem);
  // front opening trim (two thin gold strips)
  for (const s of [-1, 1]) { const strip = new THREE.Mesh(new THREE.BoxGeometry(1.4, 78, 1.2), mGold); strip.position.set(s * 3.2, 46, 24.5 - 0 * s); strip.rotation.x = -0.07; body.add(strip); }
  // feet
  const feet: THREE.Mesh[] = [];
  for (const s of [-1, 1]) { const f = new THREE.Mesh(new THREE.SphereGeometry(5.5, 16, 10), mNavyD); f.scale.set(1, 0.55, 1.6); f.position.set(s * 9, 2, 14); body.add(f); feet.push(f); }

  // arms (shoulder pivots) with sleeves + hands
  const arms: THREE.Group[] = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group(); pivot.position.set(s * 20, 86, 0);
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(5.6, 30, 6, 12), mNavyL); sleeve.position.y = -19; pivot.add(sleeve);
    const cuff = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.9, 6, 20), mGold); cuff.rotation.x = Math.PI / 2; cuff.position.y = -35; pivot.add(cuff);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(4.6, 14, 10), mSkin); hand.position.y = -39.5; pivot.add(hand);
    pivot.rotation.z = s * 0.1; body.add(pivot); arms.push(pivot);
  }

  // head group (neck pivot)
  const head = new THREE.Group(); head.position.y = 92; head.scale.setScalar(1.3); body.add(head); // bigger, friendly (Bitmoji-like) head
  const drape = new THREE.Mesh(new THREE.LatheGeometry([[0, -6], [24, -6], [25, -2], [22, 6], [16, 14], [0, 16]].map(([r, y]) => new THREE.Vector2(r, y)), 36), mNavy); head.add(drape);
  const hijab = new THREE.Mesh(new THREE.SphereGeometry(21, 32, 24), mNavy); hijab.scale.set(1, 1.1, 1); hijab.position.set(0, 22, -1); head.add(hijab);
  const face = new THREE.Mesh(new THREE.SphereGeometry(15.6, 32, 24), mSkin); face.scale.set(1, 1.15, 0.86); face.position.set(0, 22, 9); head.add(face);
  const band = new THREE.Mesh(new THREE.TorusGeometry(16.6, 1.6, 10, 40), mNavyL); band.scale.set(1, 1.16, 1); band.position.set(0, 22, 13.2); head.add(band);
  const trim = new THREE.Mesh(new THREE.TorusGeometry(18.4, 0.7, 6, 40, Math.PI * 1.15), mGold); trim.scale.set(1, 1.14, 1); trim.rotation.z = -0.07 * Math.PI; trim.position.set(0, 22.5, 12.8); head.add(trim);
  const pin = new THREE.Mesh(new THREE.SphereGeometry(2.4, 12, 10), mGold); pin.position.set(12, 2, 18); head.add(pin);
  const pinGem = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), toon(0x002147)); pinGem.position.set(12.4, 2.2, 20.2); head.add(pinGem);
  // eyes
  const eyes: THREE.Group[] = []; const pupils: THREE.Mesh[] = [];
  for (const s of [-1, 1]) {
    const g = new THREE.Group(); g.position.set(s * 5.9, 24.5, 21.4);
    const white = new THREE.Mesh(new THREE.SphereGeometry(3.3, 16, 12), toon(0xffffff)); white.scale.set(1.1, 1, 0.45); g.add(white);
    const p = new THREE.Mesh(new THREE.SphereGeometry(2.05, 14, 10), mDark); p.scale.set(1, 1, 0.5); p.position.z = 1.15; g.add(p); pupils.push(p);
    const shine = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff })); shine.position.set(0.7, 0.8, 2.1); p.add(shine);
    const lash = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.45, 6, 16, Math.PI), mDark); lash.position.set(0, 0.3, 0.6); g.add(lash);
    head.add(g); eyes.push(g);
  }
  const brows: THREE.Mesh[] = [];
  for (const s of [-1, 1]) { const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.75, 4.6, 4, 8), mDark); b.rotation.z = Math.PI / 2 - s * 0.12; b.position.set(s * 6.1, 29.6, 21.2); head.add(b); brows.push(b); }
  const nose = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 8), toon(0xeab79a)); nose.position.set(0, 19.6, 23.6); head.add(nose);
  for (const s of [-1, 1]) { const ch = new THREE.Mesh(new THREE.CircleGeometry(2.6, 16), new THREE.MeshBasicMaterial({ color: 0xf29a9a, transparent: true, opacity: 0.45 })); ch.position.set(s * 9.6, 18.4, 21.9); ch.rotation.y = s * 0.45; head.add(ch); }
  // mouth: dark open shape (scaled by loudness) + smile line
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(2.6, 16, 10), toon(0x7a2434)); mouth.position.set(0, 14.6, 22.4); mouth.scale.set(1.35, 0.15, 0.45); head.add(mouth);
  const smile = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.55, 6, 16, Math.PI), toon(0xc0505f)); smile.rotation.z = Math.PI; smile.position.set(0, 16.2, 22.6); head.add(smile);

  // thinking dots
  const dots = new THREE.Group(); dots.position.set(22, 46, 10);
  for (let i = 0; i < 3; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(2.4, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfcd34d })); d.position.set(i * 7, i * 6, 0); dots.add(d); }
  dots.visible = false; head.add(dots);

  // soft blob shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(32, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false }));
  shadow.scale.set(1, 0.22, 1); shadow.position.set(0, 0.5, -30); root.add(shadow);

  return { root, body, head, arms, feet, eyes, pupils, brows, mouth, smile, dots, shadow, robe };
}

function particles() {
  const n = 70; const g = new THREE.BufferGeometry(); const pos = new Float32Array(n * 3); const vel: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, r = 0.4 + Math.random(); vel.push(new THREE.Vector3(Math.cos(a) * 130 * r, 60 + Math.random() * 170, Math.sin(a) * 30)); }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({ color: GOLD, size: 3.2, transparent: true, opacity: 1, depthWrite: false, sizeAttenuation: false });
  return { pts: new THREE.Points(g, m), vel, pos, n };
}

type Mode = 'pop' | 'stand' | 'walk' | 'hop' | 'sit';

const SaraCall3D: React.FC<SaraCall3DProps> = ({ root, state, happy, onReady, onFail }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const live = useRef({ state, happy });
  live.current = { state, happy };

  useEffect(() => {
    const canvas = canvasRef.current!; let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { onFail?.(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(0, 1, 1, 0, -2000, 2000); cam.position.z = 500;
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(-0.6, 1, 1.2); scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd98a, 0.8); rim.position.set(1, 0.6, -1); scene.add(rim);
    const sara = buildSara(); scene.add(sara.root);
    const fx = particles(); scene.add(fx.pts);

    let W = 1, Hh = 1, scale = 1;
    const world = { home: new THREE.Vector2(), card: null as null | { x0: number; x1: number; y: number } };
    const measure = () => {
      const r = root.getBoundingClientRect(); W = Math.max(1, r.width); Hh = Math.max(1, r.height);
      renderer.setSize(W, Hh, false); cam.left = 0; cam.right = W; cam.top = Hh; cam.bottom = 0; cam.updateProjectionMatrix();
      const slot = root.querySelector('[data-testid=sara-avatar]') as HTMLElement | null;
      if (slot) { const s = slot.getBoundingClientRect(); world.home.set(s.left - r.left + s.width / 2, Hh - (s.bottom - r.top) + 4); scale = Math.max(0.55, Math.min(1.4, (s.height * 1.08) / H)); }
      else { world.home.set(W / 2, Hh * 0.62); scale = 1; }
      const cap = root.querySelector('[data-testid=call-captions]') as HTMLElement | null;
      world.card = cap ? (() => { const c = cap.getBoundingClientRect(); return c.width > 0 ? { x0: c.left - r.left + 40, x1: c.right - r.left - 40, y: Hh - (c.top - r.top) } : null; })() : null;
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(root);
    const mi = setInterval(measure, 700);

    // behaviour
    let mode: Mode = 'pop', modeT = 0, t = 0;
    const pos = new THREE.Vector2(world.home.x, world.home.y);
    let target = pos.clone(), hopFrom = pos.clone(), hopTo = pos.clone(), afterHop: Mode = 'stand';
    let facing = 0, sitAmt = 0, walkPh = 0, lp = 0, nextIdle = 1.6, firstWalk = true, blinkIn = 2 + Math.random() * 3, blinkT = -1, glance = 0, glanceIn = 3;
    let onCard = false;
    const go = (m: Mode) => { mode = m; modeT = 0; };
    const walkTo = (x: number) => { target.set(Math.max(40, Math.min(W - 40, x)), pos.y); go('walk'); };
    const hop = (to: THREE.Vector2, then: Mode) => { hopFrom = pos.clone(); hopTo = to.clone(); afterHop = then; go('hop'); };

    let raf = 0, last = performance.now(), acc = 0, readySent = false;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const dtRaw = Math.min(0.1, (now - last) / 1000); last = now; acc += dtRaw;
      if (acc < 1 / 31) return; const dt = acc; acc = 0; t += dt; modeT += dt;
      const { state: st, happy: hp } = live.current;
      const speaking = st === 'speaking', listening = st === 'listening', thinking = st === 'thinking';

      // ---- decide what to do
      if (mode === 'pop') {
        if (modeT > 1.8) go('stand');
      } else if (mode === 'stand' || mode === 'sit') {
        nextIdle -= dt;
        const card = world.card;
        if (listening && card && !onCard && mode === 'stand' && modeT > 0.6) {
          // go sit on the transcript card while the student talks
          const sx = card.x1 - 10; // sit near the card's corner so she covers as little text as possible
          if (Math.abs(sx - pos.x) > 6) walkTo(sx); else hop(new THREE.Vector2(sx, card.y - 8 * scale), 'sit');
        } else if (!speaking && !listening && !thinking && nextIdle <= 0) {
          nextIdle = 3 + Math.random() * 4;
          if (onCard) hop(new THREE.Vector2(pos.x, world.home.y), 'stand');
          else if (firstWalk || Math.random() < 0.7) { const fw = firstWalk; firstWalk = false; walkTo(fw ? W * 0.22 : Math.random() < 0.4 ? world.home.x : 40 + Math.random() * (W - 80)); }
        } else if (onCard && !card) { onCard = false; hop(new THREE.Vector2(pos.x, world.home.y), 'stand'); }
      } else if (mode === 'walk') {
        if (speaking) go('stand');
        const dx = target.x - pos.x; const sp = 75 * scale * dt;
        if (Math.abs(dx) <= sp) { pos.x = target.x; go('stand'); } else { pos.x += Math.sign(dx) * sp; walkPh += dt * 9; }
        facing = Math.sign(dx) * 1.15;
      } else if (mode === 'hop') {
        const k = Math.min(1, modeT / 0.75); const e = k * k * (3 - 2 * k);
        pos.x = hopFrom.x + (hopTo.x - hopFrom.x) * e; pos.y = hopFrom.y + (hopTo.y - hopFrom.y) * e + Math.sin(Math.PI * k) * 46 * scale;
        if (k >= 1) { onCard = afterHop === 'sit'; go(afterHop); }
      }
      if (mode === 'stand' && !onCard) { pos.y += (world.home.y - pos.y) * Math.min(1, dt * 6); }
      if (mode !== 'walk') facing *= Math.pow(0.02, dt); // turn back to the student

      // ---- pose
      const R = sara.root; R.position.set(pos.x, pos.y, 0);
      let s = scale;
      if (mode === 'pop') { const k = Math.min(1, modeT / 0.9); const back = 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2); s *= Math.max(0.001, back); R.rotation.y = (1 - k) * Math.PI * 2; }
      else R.rotation.y = facing;
      R.scale.setScalar(s);
      sitAmt += ((mode === 'sit' ? 1 : 0) - sitAmt) * Math.min(1, dt * 6);
      const breathe = 1 + Math.sin(t * 1.7) * 0.012;
      const sy = breathe * (1 - 0.4 * sitAmt); // sitting: the abaya folds over the knees
      sara.body.scale.set(1 + 0.06 * sitAmt, sy, 1 + 0.25 * sitAmt);
      sara.head.scale.set(1.3 / (1 + 0.06 * sitAmt), 1.3 / sy * breathe, 1.3 / (1 + 0.25 * sitAmt));
      sara.arms.forEach(a => a.scale.set(1, 1 / sy * breathe, 1));
      const step = mode === 'walk' ? Math.sin(walkPh) : 0;
      sara.body.position.y = mode === 'walk' ? Math.abs(Math.sin(walkPh)) * 2.4 : 0;
      sara.feet.forEach((f, i) => { const ph = i ? -step : step; f.position.z = 14 + ph * 7 + sitAmt * 16; f.position.y = 2 + Math.max(0, ph) * 3 - sitAmt * 22 + (sitAmt > 0.5 ? Math.sin(t * 2 + i * 1.6) * 2 : 0); }); // feet dangle over the edge
      sara.shadow.visible = sitAmt < 0.5 && mode !== 'hop';
      sara.shadow.material.opacity = mode === 'pop' ? Math.min(0.28, modeT * 0.3) : 0.28;
      // arms: walk swing, wave on pop-in, gesture while speaking, hands on lap when sitting
      const [aL, aR] = sara.arms;
      const talkG = speaking ? Math.sin(t * 2.3) * 0.18 : 0;
      aL.rotation.x = step * 0.45 - sitAmt * 0.7; aL.rotation.z = -0.12 - talkG * 0.5;
      if (mode === 'pop' && modeT > 0.6) { aR.rotation.z = 2.5 + Math.sin(t * 12) * 0.3; aR.rotation.x = 0; }
      else { aR.rotation.x = -step * 0.45 - sitAmt * 0.7 + (speaking ? -0.35 + talkG : 0); aR.rotation.z += ((speaking ? 0.35 : 0.12) - aR.rotation.z) * Math.min(1, dt * 5); }
      if (hp) { aR.rotation.z = 0.5 + Math.abs(Math.sin(t * 6)) * 0.2; }
      // head: look at the student, glance around, nod while listening, tilt while thinking
      glanceIn -= dt; if (glanceIn <= 0) { glance = speaking || listening ? 0 : (Math.random() - 0.5) * 0.9; glanceIn = 2 + Math.random() * 3; }
      const H0 = sara.head;
      const wantY = -facing * 0.6 + glance * 0.6; H0.rotation.y += (wantY - H0.rotation.y) * Math.min(1, dt * 4);
      H0.rotation.x = listening ? Math.sin(t * 2.6) * 0.07 + 0.04 : thinking ? -0.08 : Math.sin(t * 0.9) * 0.02;
      H0.rotation.z += ((thinking ? 0.16 : Math.sin(t * 0.7) * 0.03) - H0.rotation.z) * Math.min(1, dt * 4);
      sara.dots.visible = thinking; if (thinking) sara.dots.children.forEach((d, i) => { d.scale.setScalar(0.7 + 0.4 * Math.max(0, Math.sin(t * 5 - i))); });
      sara.pupils.forEach(p => { p.position.y += ((thinking ? 1.1 : 0) - p.position.y) * Math.min(1, dt * 6); p.position.x += ((thinking ? 0.8 : glance * 1.4) - p.position.x) * Math.min(1, dt * 6); });
      sara.brows.forEach(b => { b.position.y = 29.6 + (hp || thinking ? 1.3 : 0) + (speaking ? lp * 0.8 : 0); });
      // blink
      blinkIn -= dt; if (blinkIn <= 0) { blinkT = 0; blinkIn = 3 + Math.random() * 3; }
      let eyeY = hp && !speaking ? 0.6 : 1; if (blinkT >= 0) { blinkT += dt; eyeY = blinkT < 0.07 ? 1 - blinkT / 0.07 * 0.92 : blinkT < 0.15 ? 0.08 + (blinkT - 0.07) / 0.08 * 0.92 : (blinkT = -1, eyeY); }
      sara.eyes.forEach(e => { e.scale.y = Math.max(0.08, eyeY); });
      // mouth from Sara's real voice loudness
      const lvl = speaking ? getSaraSpeechLevel() : 0; lp = lp * 0.45 + lvl * 0.55;
      sara.mouth.scale.set(1.25 + lp * 0.35, 0.15 + lp * 1.15, 0.45);
      sara.mouth.visible = lp > 0.05; sara.smile.visible = !sara.mouth.visible;
      sara.smile.scale.set(hp ? 1.25 : 1, hp ? 1.35 : 0.8, 1);
      // particles (pop-in)
      fx.pts.visible = mode === 'pop' && modeT < 1.6;
      if (fx.pts.visible) {
        for (let i = 0; i < fx.n; i++) { const v = fx.vel[i], k = modeT; const sp = Math.min(1, k * 2.2); fx.pos[i * 3] = pos.x + v.x * sp * scale; fx.pos[i * 3 + 1] = pos.y + (v.y * sp - 40 * k * k) * scale + 6; fx.pos[i * 3 + 2] = 200; }
        fx.pts.geometry.attributes.position.needsUpdate = true; (fx.pts.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - modeT / 1.6);
      }
      renderer.render(scene, cam);
      if (!readySent) { readySent = true; onReady?.(); }
    };
    raf = requestAnimationFrame(frame);
    (window as any).__sara3d = { get mode() { return mode; }, get onCard() { return onCard; } };
    return () => { cancelAnimationFrame(raf); ro.disconnect(); clearInterval(mi); renderer.dispose(); scene.traverse(o => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); const mt = m.material as THREE.Material | THREE.Material[] | undefined; (Array.isArray(mt) ? mt : mt ? [mt] : []).forEach(x => x.dispose()); }); };
  }, [root]); // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} data-testid="sara-3d" className="absolute inset-0 w-full h-full pointer-events-none z-20" aria-hidden />;
};

export default SaraCall3D;

