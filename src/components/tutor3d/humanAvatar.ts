import * as THREE from "three";
/**
 * Procedural human teacher bust (no external assets → no license or download cost).
 * Realistic-ish proportions, eyes with iris/pupil/catch-light, lids that blink, brows, lips + jaw for lip-sync,
 * modest hijab for the women, short hair + neat beard for the men, smart clothing. All units ≈ metres.
 */
export interface HumanLook {
  gender: "female" | "male";
  skin: number; lip: number; brow: number; iris: number;
  hair?: number; beard?: number;               // men
  hijab?: number; hijabTrim?: number;          // women
  outfit: number; outfitTrim: number;          // top / jacket / thobe + gold trim
  shirt?: number; tie?: number; bisht?: number; glasses?: boolean;
}
export const LOOKS: Record<string, HumanLook> = {
  // Sara: ivory hijab with gold trim, navy abaya
  sara: { gender: "female", skin: 0xe8b996, lip: 0xb5655e, brow: 0x3b2618, iris: 0x4a2c17, hijab: 0xf1e6d2, hijabTrim: 0xc49e3a, outfit: 0x0f2747, outfitTrim: 0xc49e3a },
  // Noura: navy hijab, dusty-rose top, reading glasses
  grammar: { gender: "female", skin: 0xd9a57f, lip: 0xa85a57, brow: 0x2a1a10, iris: 0x3a2412, hijab: 0x1b2f52, hijabTrim: 0xc49e3a, outfit: 0x9c5b6b, outfitTrim: 0xf3e3c3, glasses: true },
  // Mohammed: navy suit, white shirt, gold tie, neat beard
  business: { gender: "male", skin: 0xcf9a73, lip: 0x9c5a4f, brow: 0x1c140f, iris: 0x2e1d10, hair: 0x17110d, beard: 0x1d1510, outfit: 0x13284a, outfitTrim: 0x0d1d38, shirt: 0xf6f7fb, tie: 0xc49e3a },
  // Ali: white thobe, navy bisht with gold trim, short beard
  exams: { gender: "male", skin: 0xc48d66, lip: 0x955447, brow: 0x16100c, iris: 0x2a190d, hair: 0x120d0a, beard: 0x18110d, outfit: 0xf7f6f1, outfitTrim: 0xe7e3d8, bisht: 0x0f2340, tie: 0xc49e3a },
};

export interface HumanRig {
  root: THREE.Group; torso: THREE.Group; head: THREE.Group; jaw: THREE.Group;
  lids: THREE.Object3D[]; brows: THREE.Object3D[]; irises: THREE.Object3D[]; mouth: THREE.Mesh; lowerLip: THREE.Object3D; upperLip: THREE.Object3D;
  armL: THREE.Group; armR: THREE.Group; foreL: THREE.Group; foreR: THREE.Group; handR: THREE.Object3D;
  dispose: () => void;
}

export function buildHuman(look: HumanLook): HumanRig {
  const geos: THREE.BufferGeometry[] = []; const mats: THREE.Material[] = [];
  const G = <T extends THREE.BufferGeometry>(g: T) => (geos.push(g), g);
  const M = (color: number, o: Partial<THREE.MeshStandardMaterialParameters> = {}) => { const m = new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0, ...o }); mats.push(m); return m; };
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, p: [number, number, number] = [0, 0, 0], s: [number, number, number] = [1, 1, 1]) => { const x = new THREE.Mesh(g, m); x.position.set(...p); x.scale.set(...s); return x; };
  const female = look.gender === "female";
  const skin = M(look.skin, { roughness: 0.55 });
  const skinShade = M(new THREE.Color(look.skin).multiplyScalar(0.86).getHex(), { roughness: 0.6 });
  const cloth = M(look.outfit, { roughness: 0.85 });
  const trim = M(look.outfitTrim, { roughness: 0.4, metalness: look.outfitTrim === 0xc49e3a ? 0.6 : 0 });

  const root = new THREE.Group();
  // ── torso (lathe profile, flattened front-back) ──
  const torso = new THREE.Group(); root.add(torso);
  const prof = [[0.0, -0.55], [0.34, -0.55], [0.36, -0.2], [0.38, 0.12], [0.41, 0.3], [0.39, 0.4], [0.3, 0.47], [0.16, 0.52], [0.075, 0.56], [0.0, 0.56]].map(([r, y]) => new THREE.Vector2(r, y));
  const body = mesh(G(new THREE.LatheGeometry(prof, 40)), cloth, [0, 0, 0], [1, 1, 0.62]); torso.add(body);
  if (look.bisht) { // open cloak over the thobe
    const bm = M(look.bisht, { roughness: 0.9, side: THREE.DoubleSide });
    const bp = prof.slice(0, 8).map(v => new THREE.Vector2(v.x + 0.025, v.y));
    torso.add(mesh(G(new THREE.LatheGeometry(bp, 40, 0.55, Math.PI * 2 - 1.1)), bm, [0, 0, 0], [1, 1, 0.66]));
    const edge = G(new THREE.CylinderGeometry(0.012, 0.012, 0.95, 8));
    for (const sx of [-1, 1]) { const e = mesh(edge, M(look.tie || 0xc49e3a, { metalness: 0.6, roughness: 0.35 }), [sx * 0.15, 0.0, 0.25]); e.rotation.z = sx * 0.12; torso.add(e); }
  }
  if (look.shirt) { // suit: shirt V, lapels, tie
    const shirt = M(look.shirt, { roughness: 0.7 });
    const v = new THREE.Shape(); v.moveTo(-0.11, 0.5); v.lineTo(0.11, 0.5); v.lineTo(0, 0.1); v.closePath();
    torso.add(mesh(G(new THREE.ShapeGeometry(v)), shirt, [0, 0, 0.247]));
    const lap = M(look.outfitTrim, { roughness: 0.75 });
    for (const sx of [-1, 1]) { const l = new THREE.Shape(); l.moveTo(sx * 0.11, 0.5); l.lineTo(sx * 0.2, 0.42); l.lineTo(0, 0.1); l.closePath(); torso.add(mesh(G(new THREE.ShapeGeometry(l)), lap, [0, 0, 0.25])); }
    const tie = M(look.tie || 0xc49e3a, { roughness: 0.35, metalness: 0.35 });
    torso.add(mesh(G(new THREE.BoxGeometry(0.05, 0.045, 0.02)), tie, [0, 0.47, 0.252]));
    const tb = new THREE.Shape(); tb.moveTo(-0.022, 0.45); tb.lineTo(0.022, 0.45); tb.lineTo(0.035, 0.2); tb.lineTo(0, 0.16); tb.lineTo(-0.035, 0.2); tb.closePath();
    torso.add(mesh(G(new THREE.ShapeGeometry(tb)), tie, [0, 0, 0.253]));
  } else if (!female) { // thobe collar + placket
    const col = mesh(G(new THREE.TorusGeometry(0.078, 0.012, 8, 28)), trim, [0, 0.545, 0.01], [1, 0.55, 1]); col.rotation.x = Math.PI / 2; torso.add(col);
    torso.add(mesh(G(new THREE.BoxGeometry(0.03, 0.26, 0.01)), trim, [0, 0.4, 0.246]));
    for (let i = 0; i < 3; i++) torso.add(mesh(G(new THREE.SphereGeometry(0.008, 8, 8)), M(look.tie || 0xc49e3a, { metalness: 0.6, roughness: 0.3 }), [0, 0.5 - i * 0.07, 0.252]));
  } else { // abaya trim
    const t1 = mesh(G(new THREE.BoxGeometry(0.025, 0.8, 0.01)), trim, [0, 0.05, 0.25]); torso.add(t1);
  }
  // ── neck ──
  const neck = mesh(G(new THREE.CylinderGeometry(0.075, 0.085, 0.2, 20)), skinShade, [0, 0.62, 0]); torso.add(neck);

  // ── head ──
  const head = new THREE.Group(); head.position.set(0, 0.86, 0.0); head.scale.setScalar(1.6); torso.add(head);
  head.add(mesh(G(new THREE.SphereGeometry(0.115, 48, 40)), skin, [0, 0.02, 0], [0.92, 1.12, 1.0])); // cranium + face
  head.add(mesh(G(new THREE.SphereGeometry(0.08, 32, 24)), skin, [0, -0.058, 0.0], [1.0, 0.95, 1.0])); // jaw / cheeks
  head.add(mesh(G(new THREE.SphereGeometry(0.03, 20, 16)), skin, [0, -0.108, 0.052], [1.25, 0.85, 1])); // chin
  // nose
  const nose = mesh(G(new THREE.ConeGeometry(0.017, 0.055, 16)), skin, [0, -0.012, 0.118]); nose.rotation.x = -0.35; head.add(nose);
  head.add(mesh(G(new THREE.SphereGeometry(0.016, 16, 12)), skin, [0, -0.038, 0.122], [1.25, 0.9, 1]));
  // ears (visible on men)
  if (!female) for (const sx of [-1, 1]) head.add(mesh(G(new THREE.SphereGeometry(0.022, 12, 10)), skinShade, [sx * 0.105, 0.0, -0.005], [0.45, 1, 0.8]));
  // eyes
  const white = M(0xf8f5f0, { roughness: 0.25 }); const irisM = M(look.iris, { roughness: 0.3 }); const pupilM = M(0x050505, { roughness: 0.2 });
  const glint = new THREE.MeshBasicMaterial({ color: 0xffffff }); mats.push(glint);
  const lashM = M(0x120c08, { roughness: 0.8 }); const browM = M(look.brow, { roughness: 0.9 });
  const lids: THREE.Object3D[] = [], brows: THREE.Object3D[] = [], irises: THREE.Object3D[] = [];
  for (const sx of [-1, 1]) {
    const eye = new THREE.Group(); eye.position.set(sx * 0.039, 0.016, 0.102); head.add(eye);
    eye.add(mesh(G(new THREE.SphereGeometry(0.019, 24, 16)), white, [0, 0, 0], [1.2, 0.8, 0.62]));
    const iris = new THREE.Group(); eye.add(iris); irises.push(iris);
    iris.add(mesh(G(new THREE.CircleGeometry(0.0095, 24)), irisM, [0, 0, 0.0121]));
    iris.add(mesh(G(new THREE.CircleGeometry(0.0045, 20)), pupilM, [0, 0, 0.0123]));
    iris.add(mesh(G(new THREE.CircleGeometry(0.0019, 10)), glint, [0.003, 0.003, 0.0125]));
    // upper lid: skin half-shell pivoting over the eye (rotation.x: open ≈ -1.25, closed ≈ 0.15)
    const lid = new THREE.Group(); eye.add(lid);
    lid.add(mesh(G(new THREE.SphereGeometry(0.0205, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2)), skin, [0, 0, 0], [1.2, 0.85, 0.66]));
    const lash = mesh(G(new THREE.TorusGeometry(0.0205, 0.0017, 6, 24, Math.PI)), lashM, [0, 0, 0], [1.2, 0.66, 1]); lash.rotation.x = Math.PI / 2; lid.add(lash);
    lid.rotation.x = -1.25; lids.push(lid);
    const brow = mesh(G(new THREE.CapsuleGeometry(0.004, 0.03, 4, 10)), browM, [sx * 0.041, 0.049, 0.108]);
    brow.rotation.z = Math.PI / 2 + sx * 0.12; head.add(brow); brows.push(brow);
  }
  if (look.glasses) {
    const fm = M(0x2b2b2b, { roughness: 0.3, metalness: 0.5 });
    for (const sx of [-1, 1]) head.add(mesh(G(new THREE.TorusGeometry(0.022, 0.0022, 8, 32)), fm, [sx * 0.039, 0.016, 0.112], [1.15, 0.85, 1]));
    { const br = mesh(G(new THREE.CylinderGeometry(0.0018, 0.0018, 0.02, 6)), fm, [0, 0.02, 0.113]); br.rotation.z = Math.PI / 2; head.add(br); }
  }
  // mouth: dark cavity + teeth inside a jaw group, lips on top
  const jaw = new THREE.Group(); jaw.position.set(0, -0.066, 0.103); head.add(jaw);
  const mouth = mesh(G(new THREE.SphereGeometry(0.02, 20, 12)), M(0x3a1414, { roughness: 0.9 }), [0, 0, -0.004], [1.15, 0.12, 0.45]); jaw.add(mouth);
  jaw.add(mesh(G(new THREE.BoxGeometry(0.02, 0.004, 0.004)), M(0xf3efe6, { roughness: 0.3 }), [0, 0.002, -0.001]));
  const lipM = M(look.lip, { roughness: 0.45 });
  const upperLip = mesh(G(new THREE.CapsuleGeometry(0.0042, 0.022, 4, 12)), lipM, [0, 0.004, 0.004], [1, 1, 0.7]); upperLip.rotation.z = Math.PI / 2; jaw.add(upperLip);
  const lowerLip = mesh(G(new THREE.CapsuleGeometry(0.005, 0.018, 4, 12)), lipM, [0, -0.005, 0.004], [1, 1, 0.75]); lowerLip.rotation.z = Math.PI / 2; jaw.add(lowerLip);
  if (female) for (const sx of [-1, 1]) { const b = new THREE.MeshStandardMaterial({ color: 0xe07a6e, transparent: true, opacity: 0.1, roughness: 1 }); mats.push(b); head.add(mesh(G(new THREE.SphereGeometry(0.02, 12, 10)), b, [sx * 0.058, -0.03, 0.09], [1.2, 0.7, 0.4])); }

  if (female) {
    // ── hijab: shell around the head with a face opening, forehead band, drape to the shoulders ──
    const hm = M(look.hijab || 0xf1e6d2, { roughness: 0.92, side: THREE.DoubleSide });
    const open = 1.45; // face opening (radians around the front)
    head.add(mesh(G(new THREE.SphereGeometry(0.128, 48, 32, Math.PI / 2 + open / 2, Math.PI * 2 - open, 0, Math.PI * 0.78)), hm, [0, 0.025, -0.006], [0.96, 1.12, 1.04]));
    head.add(mesh(G(new THREE.SphereGeometry(0.128, 32, 16, Math.PI / 2 - open / 2 - 0.05, open + 0.1, 0, Math.PI * 0.27)), hm, [0, 0.025, -0.006], [0.96, 1.12, 1.04]));
    const drape = [[0.112, -0.02], [0.1, -0.09], [0.12, -0.15], [0.19, -0.2], [0.265, -0.26], [0.28, -0.33]].map(([r, y]) => new THREE.Vector2(r, y));
    head.add(mesh(G(new THREE.LatheGeometry(drape, 44)), hm, [0, 0, -0.005], [1, 1, 0.78]));
    // chin wrap under the face
    head.add(mesh(G(new THREE.SphereGeometry(0.105, 32, 16, 0, Math.PI * 2, Math.PI * 0.72, Math.PI * 0.28)), hm, [0, -0.05, -0.004], [1.04, 1.0, 1.06]));
  } else {
    // ── short hair cap + neat beard/moustache ──
    const hairM = M(look.hair || 0x17110d, { roughness: 0.95 });
    head.add(mesh(G(new THREE.SphereGeometry(0.119, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.34)), hairM, [0, 0.035, -0.008], [0.95, 1.12, 1.03]));
    head.add(mesh(G(new THREE.SphereGeometry(0.119, 40, 24, Math.PI / 2 + 0.95, Math.PI * 2 - 1.9, Math.PI * 0.32, Math.PI * 0.26)), hairM, [0, 0.03, -0.006], [0.95, 1.12, 1.03]));
    const bm = M(look.beard || 0x1d1510, { roughness: 1 });
    head.add(mesh(G(new THREE.SphereGeometry(0.09, 40, 24, Math.PI * 0.04, Math.PI * 0.92, Math.PI * 0.62, Math.PI * 0.34)), bm, [0, -0.045, 0.012], [0.98, 1.0, 1.02]));
    head.add(mesh(G(new THREE.SphereGeometry(0.097, 40, 24, Math.PI * 0.04, Math.PI * 0.2, Math.PI * 0.42, Math.PI * 0.3)), bm, [0, -0.04, 0.008], [0.97, 1.0, 1.0]));
    head.add(mesh(G(new THREE.SphereGeometry(0.097, 40, 24, Math.PI * 0.76, Math.PI * 0.2, Math.PI * 0.42, Math.PI * 0.3)), bm, [0, -0.04, 0.008], [0.97, 1.0, 1.0]));
    const mus = mesh(G(new THREE.CapsuleGeometry(0.0048, 0.03, 4, 10)), bm, [0, -0.055, 0.112], [1, 1, 0.7]); mus.rotation.z = Math.PI / 2; head.add(mus);
  }

  // ── arms (shoulder → elbow → hand) ──
  const sleeve = look.bisht ? M(look.bisht, { roughness: 0.9 }) : cloth;
  const mkArm = (sx: number) => {
    const arm = new THREE.Group(); arm.position.set(sx * 0.37, 0.38, 0); torso.add(arm);
    arm.add(mesh(G(new THREE.CapsuleGeometry(0.062, 0.22, 6, 16)), sleeve, [0, -0.15, 0]));
    const fore = new THREE.Group(); fore.position.set(0, -0.3, 0); arm.add(fore);
    fore.add(mesh(G(new THREE.CapsuleGeometry(0.052, 0.2, 6, 16)), sleeve, [0, -0.13, 0]));
    fore.add(mesh(G(new THREE.CylinderGeometry(0.056, 0.056, 0.02, 16)), trim, [0, -0.255, 0]));
    const hand = mesh(G(new THREE.SphereGeometry(0.045, 20, 16)), skin, [0, -0.3, 0.005], [0.85, 1.15, 0.55]); fore.add(hand);
    const thumb = mesh(G(new THREE.CapsuleGeometry(0.012, 0.03, 4, 8)), skin, [sx * -0.03, -0.29, 0.02]); thumb.rotation.z = sx * 0.6; fore.add(thumb);
    return { arm, fore, hand };
  };
  const L = mkArm(-1), R = mkArm(1);
  return {
    root, torso, head, jaw, lids, brows, irises, mouth, lowerLip, upperLip,
    armL: L.arm, armR: R.arm, foreL: L.fore, foreR: R.fore, handR: R.hand,
    dispose: () => { geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose()); },
  };
}
