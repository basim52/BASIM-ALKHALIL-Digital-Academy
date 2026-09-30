import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  X, 
  Minimize2, 
  Maximize2, 
  Volume2, 
  Sparkles, 
  MessageSquare, 
  Move,
  RotateCcw,
  CheckCircle2,
  Smile
} from 'lucide-react';

export type SaraEmotion = 'idle' | 'speaking' | 'listening' | 'thinking' | 'celebrating';

export type SaraGesture = 'idle' | 'waving' | 'clapping' | 'pointing' | 'explaining';

export type SaraOutfitId = 'navy_gold' | 'rose_pink' | 'emerald_green' | 'lavender_purple';

export interface SaraOutfit {
  id: SaraOutfitId;
  nameAr: string;
  nameEn: string;
  blazerHex: number;
  trimHex: number;
  badgeEmoji: string;
}

export const SARA_OUTFITS: SaraOutfit[] = [
  { id: 'navy_gold', nameAr: 'كحلي وذهبي ملكي', nameEn: 'Royal Navy & Gold', blazerHex: 0x002147, trimHex: 0xc49e3a, badgeEmoji: '👑' },
  { id: 'rose_pink', nameAr: 'وردي زهري ولؤلؤي', nameEn: 'Rose Pink & Pearl', blazerHex: 0xbe185d, trimHex: 0xfde047, badgeEmoji: '🌸' },
  { id: 'emerald_green', nameAr: 'أخضر زمردي فاخر', nameEn: 'Emerald Green', blazerHex: 0x065f46, trimHex: 0xf59e0b, badgeEmoji: '🌲' },
  { id: 'lavender_purple', nameAr: 'لافندر ملكي وفضي', nameEn: 'Royal Lavender', blazerHex: 0x6d28d9, trimHex: 0xe2e8f0, badgeEmoji: '💜' }
];

interface Sara3DCharacterProps {
  isRtl?: boolean;
  isSpeaking: boolean;
  isLiveMode: boolean;
  liveStatus: 'idle' | 'listening' | 'thinking' | 'speaking';
  currentSpeechText?: string;
  emotion?: SaraEmotion;
  onCharacterClick?: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sara3DCharacter: React.FC<Sara3DCharacterProps> = ({
  isRtl = true,
  isSpeaking,
  isLiveMode,
  liveStatus,
  currentSpeechText = '',
  emotion: propEmotion,
  onCharacterClick,
  isOpen,
  onToggle
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeOutfit, setActiveOutfit] = useState<SaraOutfitId>('navy_gold');
  const [activeGesture, setActiveGesture] = useState<SaraGesture>('idle');
  const gestureTimeoutRef = useRef<any>(null);

  const triggerGesture = (g: SaraGesture) => {
    setActiveGesture(g);
    if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
    if (g !== 'idle') {
      gestureTimeoutRef.current = setTimeout(() => {
        setActiveGesture('idle');
      }, 4500);
    }
  };

  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const hasDraggedRef = useRef(false);

  const dragStartRef = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number }>({
    mouseX: 0,
    mouseY: 0,
    posX: 0,
    posY: 0
  });

  // Determine current active emotion
  let currentEmotion: SaraEmotion = propEmotion || 'idle';
  if (isSpeaking || liveStatus === 'speaking') {
    currentEmotion = 'speaking';
  } else if (liveStatus === 'listening') {
    currentEmotion = 'listening';
  } else if (liveStatus === 'thinking') {
    currentEmotion = 'thinking';
  }

  // Three.js animation and object references
  const animFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const mouthRef = useRef<THREE.Mesh | null>(null);
  const leftEyeRef = useRef<THREE.Group | null>(null);
  const rightEyeRef = useRef<THREE.Group | null>(null);
  const leftEyelidRef = useRef<THREE.Mesh | null>(null);
  const rightEyelidRef = useRef<THREE.Mesh | null>(null);
  const leftPupilRef = useRef<THREE.Mesh | null>(null);
  const rightPupilRef = useRef<THREE.Mesh | null>(null);
  const haloRingRef = useRef<THREE.Mesh | null>(null);
  const particlesGroupRef = useRef<THREE.Points | null>(null);
  const leftArmGroupRef = useRef<THREE.Group | null>(null);
  const rightArmGroupRef = useRef<THREE.Group | null>(null);
  const leftForearmGroupRef = useRef<THREE.Group | null>(null);
  const rightForearmGroupRef = useRef<THREE.Group | null>(null);
  const blazerMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const trimMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Mouse tracking in Three.js coordinates
  const mouseCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize Three.js Scene
  useEffect(() => {
    if (!isOpen || isMinimized || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 220;
    const height = container.clientHeight || 280;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 3.2);
    camera.lookAt(0, 0.25, 0);

    // 3. Renderer with antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Lighting setup - WARM STUDIO PORTRAIT (Zero blue tint!)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.8);
    scene.add(ambientLight);

    // Main key light (Warm flattering studio light)
    const keyLight = new THREE.DirectionalLight(0xfffdf6, 2.4);
    keyLight.position.set(2, 3.5, 3);
    scene.add(keyLight);

    // Golden Rim Light (Academy Gold #C49E3A)
    const rimLight = new THREE.DirectionalLight(0xffc83b, 1.8);
    rimLight.position.set(-2.5, 3, -2);
    scene.add(rimLight);

    // Soft Warm Peach Fill Light from front-bottom (Natural skin glow - NO BLUE)
    const fillLight = new THREE.DirectionalLight(0xffede0, 1.5);
    fillLight.position.set(0, 0.5, 2.5);
    scene.add(fillLight);

    // 5. Build Sara Character
    const characterGroup = new THREE.Group();
    characterGroupRef.current = characterGroup;
    scene.add(characterGroup);

    // --- MATERIALS (Warm, natural, glowing skin & hair) ---
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffdfcb, // Luminous warm peach-ivory Arabian skin tone
      roughness: 0.6,
      metalness: 0.0 // No metallic shine so no blue reflection!
    });

    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xff8a80, // Soft vibrant warm rosy-coral blush
      roughness: 0.5,
      transparent: true,
      opacity: 0.42
    });

    // Natural Silky Dark Chestnut Hair (Warm, NOT NAVY BLUE!)
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x24160d, // Rich dark warm chestnut / espresso
      roughness: 0.65,
      metalness: 0.05
    });

    // Natural Warm Eyebrows
    const eyebrowMat = new THREE.MeshStandardMaterial({
      color: 0x331f13, // Warm dark brown
      roughness: 0.8
    });

    // Pure Radiant White Silk Hijab / Scarf (Framing face completely in pure white)
    const whiteHijabMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Pure Radiant White
      roughness: 0.38,
      metalness: 0.02
    });

    // Soft Pearl-Ivory Silk Accent
    const scarfSilkMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.02
    });

    const academyNavyMat = new THREE.MeshStandardMaterial({
      color: 0x002147,
      roughness: 0.4,
      metalness: 0.15
    });

    const academyGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc49e3a,
      roughness: 0.25,
      metalness: 0.75
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });

    const eyeIrisMat = new THREE.MeshStandardMaterial({
      color: 0x4e2d14, // Warm hazel brown eyes with golden flecks
      roughness: 0.1,
      metalness: 0.15
    });

    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0c0806 });
    const mouthMat = new THREE.MeshStandardMaterial({
      color: 0xde5264, // Soft natural rose-coral lips
      roughness: 0.35
    });

    // --- TORSO / BLAZER ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = -0.55;

    // Main Blazer Body
    const blazerGeo = new THREE.CylinderGeometry(0.38, 0.48, 0.7, 32);
    const blazerMesh = new THREE.Mesh(blazerGeo, academyNavyMat);
    torsoGroup.add(blazerMesh);

    // White Shirt Inner V-Neck
    const shirtGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.68, 16, 1, false, 0, Math.PI);
    const shirtMesh = new THREE.Mesh(shirtGeo, whiteMat);
    shirtMesh.position.set(0, 0.03, 0.23);
    shirtMesh.rotation.y = Math.PI / 2;
    torsoGroup.add(shirtMesh);

    // Gold Lapel Trim
    const lapelGeo = new THREE.TorusGeometry(0.26, 0.02, 12, 32, Math.PI);
    const lapelMesh = new THREE.Mesh(lapelGeo, academyGoldMat);
    lapelMesh.position.set(0, 0.22, 0.3);
    lapelMesh.rotation.x = Math.PI / 2;
    lapelMesh.rotation.z = Math.PI;
    torsoGroup.add(lapelMesh);

    // Academy Gold Pin on Chest
    const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.015, 16);
    const pinMesh = new THREE.Mesh(pinGeo, academyGoldMat);
    pinMesh.position.set(0.18, 0.12, 0.4);
    pinMesh.rotation.x = Math.PI / 2;
    torsoGroup.add(pinMesh);

    // --- ARMS FOR INTERACTIVE GESTURES (Waving, Clapping, Pointing, Explaining) ---
    const upperArmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.32, 16);
    upperArmGeo.translate(0, -0.16, 0);

    const forearmGeo = new THREE.CylinderGeometry(0.08, 0.075, 0.28, 16);
    forearmGeo.translate(0, -0.14, 0);

    const cuffGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.035, 16);
    const handGeo = new THREE.SphereGeometry(0.065, 16, 16);
    handGeo.scale(0.8, 1.2, 0.6);

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.42, 0.2, 0.02);
    leftArmGroupRef.current = leftArmGroup;

    const leftUpperArm = new THREE.Mesh(upperArmGeo, academyNavyMat.clone());
    leftArmGroup.add(leftUpperArm);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.set(0, -0.32, 0);
    leftForearmGroupRef.current = leftForearmGroup;

    const leftForearm = new THREE.Mesh(forearmGeo, academyNavyMat.clone());
    leftForearmGroup.add(leftForearm);

    const leftCuff = new THREE.Mesh(cuffGeo, academyGoldMat.clone());
    leftCuff.position.set(0, -0.26, 0);
    leftForearmGroup.add(leftCuff);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(0, -0.32, 0);
    leftForearmGroup.add(leftHand);

    leftArmGroup.add(leftForearmGroup);
    torsoGroup.add(leftArmGroup);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.42, 0.2, 0.02);
    rightArmGroupRef.current = rightArmGroup;

    const rightUpperArm = new THREE.Mesh(upperArmGeo, academyNavyMat.clone());
    rightArmGroup.add(rightUpperArm);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0, -0.32, 0);
    rightForearmGroupRef.current = rightForearmGroup;

    const rightForearm = new THREE.Mesh(forearmGeo, academyNavyMat.clone());
    rightForearmGroup.add(rightForearm);

    const rightCuff = new THREE.Mesh(cuffGeo, academyGoldMat.clone());
    rightCuff.position.set(0, -0.26, 0);
    rightForearmGroup.add(rightCuff);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0, -0.32, 0);
    rightForearmGroup.add(rightHand);

    rightArmGroup.add(rightForearmGroup);
    torsoGroup.add(rightArmGroup);

    // Store references to update outfit materials
    blazerMaterialsRef.current = [
      blazerMesh.material as THREE.MeshStandardMaterial,
      leftUpperArm.material as THREE.MeshStandardMaterial,
      leftForearm.material as THREE.MeshStandardMaterial,
      rightUpperArm.material as THREE.MeshStandardMaterial,
      rightForearm.material as THREE.MeshStandardMaterial
    ];
    trimMaterialsRef.current = [
      lapelMesh.material as THREE.MeshStandardMaterial,
      pinMesh.material as THREE.MeshStandardMaterial,
      leftCuff.material as THREE.MeshStandardMaterial,
      rightCuff.material as THREE.MeshStandardMaterial
    ];

    // Apply active outfit initial colors
    const activeOutfitObj = SARA_OUTFITS.find(o => o.id === activeOutfit) || SARA_OUTFITS[0];
    blazerMaterialsRef.current.forEach(m => m.color.setHex(activeOutfitObj.blazerHex));
    trimMaterialsRef.current.forEach(m => m.color.setHex(activeOutfitObj.trimHex));

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.25, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, 0.42, 0);
    torsoGroup.add(neckMesh);

    characterGroup.add(torsoGroup);

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.28, 0);
    headGroupRef.current = headGroup;

    // Head Base (Smooth sphere)
    const headGeo = new THREE.SphereGeometry(0.42, 32, 32);
    headGeo.scale(1, 1.15, 1.05);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    // Cute Cheeks Blush (Left & Right)
    const cheekGeo = new THREE.SphereGeometry(0.08, 16, 16);
    cheekGeo.scale(1.2, 0.6, 0.5);

    const leftCheek = new THREE.Mesh(cheekGeo, blushMat);
    leftCheek.position.set(-0.25, -0.06, 0.38);
    leftCheek.rotation.y = -0.3;
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, blushMat);
    rightCheek.position.set(0.25, -0.06, 0.38);
    rightCheek.rotation.y = 0.3;
    headGroup.add(rightCheek);

    // Nose
    const noseGeo = new THREE.SphereGeometry(0.05, 16, 16);
    noseGeo.scale(0.8, 1, 1.2);
    const noseMesh = new THREE.Mesh(noseGeo, skinMat);
    noseMesh.position.set(0, 0.02, 0.44);
    headGroup.add(noseMesh);

    // Mouth
    const mouthGeo = new THREE.SphereGeometry(0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    mouthGeo.scale(1.3, 0.6, 0.5);
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.position.set(0, -0.16, 0.42);
    mouthMesh.rotation.x = Math.PI / 2;
    mouthRef.current = mouthMesh;
    headGroup.add(mouthMesh);

    // --- EYES (Interactive tracking & blinking) ---
    const createEye = (isLeft: boolean) => {
      const eyeGroup = new THREE.Group();
      const xPos = isLeft ? -0.16 : 0.16;
      eyeGroup.position.set(xPos, 0.1, 0.37);

      // Sclera (White)
      const scleraGeo = new THREE.SphereGeometry(0.085, 24, 24);
      scleraGeo.scale(1, 1, 0.6);
      const scleraMesh = new THREE.Mesh(scleraGeo, whiteMat);
      eyeGroup.add(scleraMesh);

      // Iris (Warm Hazel)
      const irisGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 24);
      const irisMesh = new THREE.Mesh(irisGeo, eyeIrisMat);
      irisMesh.position.set(0, 0, 0.045);
      irisMesh.rotation.x = Math.PI / 2;
      eyeGroup.add(irisMesh);

      // Pupil (Dark)
      const pupilGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.016, 16);
      const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
      pupilMesh.position.set(0, 0, 0.047);
      pupilMesh.rotation.x = Math.PI / 2;
      eyeGroup.add(pupilMesh);

      // Catchlight / Specular Highlight Dot
      const catchlightGeo = new THREE.SphereGeometry(0.012, 8, 8);
      const catchlightMesh = new THREE.Mesh(catchlightGeo, whiteMat);
      catchlightMesh.position.set(0.018, 0.018, 0.055);
      eyeGroup.add(catchlightMesh);

      // Eyelid for Blinking
      const eyelidGeo = new THREE.SphereGeometry(0.09, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
      eyelidGeo.scale(1.05, 1.05, 0.7);
      const eyelidMesh = new THREE.Mesh(eyelidGeo, skinMat);
      eyelidMesh.position.set(0, 0.01, 0.02);
      eyelidMesh.rotation.x = -Math.PI / 2;
      eyelidMesh.scale.set(1, 0.05, 1); // Start open
      eyeGroup.add(eyelidMesh);

      // Eyebrow (Warm natural dark brown)
      const browGeo = new THREE.TorusGeometry(0.08, 0.014, 8, 16, Math.PI / 1.5);
      const browMesh = new THREE.Mesh(browGeo, eyebrowMat);
      browMesh.position.set(0, 0.11, 0.03);
      browMesh.rotation.z = isLeft ? -0.15 : Math.PI - 0.15;
      eyeGroup.add(browMesh);

      return { eyeGroup, eyelidMesh, pupilMesh };
    };

    const leftEye = createEye(true);
    leftEyeRef.current = leftEye.eyeGroup;
    leftEyelidRef.current = leftEye.eyelidMesh;
    leftPupilRef.current = leftEye.pupilMesh;
    headGroup.add(leftEye.eyeGroup);

    const rightEye = createEye(false);
    rightEyeRef.current = rightEye.eyeGroup;
    rightEyelidRef.current = rightEye.eyelidMesh;
    rightPupilRef.current = rightEye.pupilMesh;
    headGroup.add(rightEye.eyeGroup);

    // --- STYLISH SMART GLASSES (Gold frames) ---
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.1, 0.44);

    const glassRimGeo = new THREE.TorusGeometry(0.095, 0.009, 12, 24);
    const leftRim = new THREE.Mesh(glassRimGeo, academyGoldMat);
    leftRim.position.set(-0.16, 0, 0);
    glassesGroup.add(leftRim);

    const rightRim = new THREE.Mesh(glassRimGeo, academyGoldMat);
    rightRim.position.set(0.16, 0, 0);
    glassesGroup.add(rightRim);

    // Glasses Bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.08, 8);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, academyGoldMat);
    bridgeMesh.rotation.z = Math.PI / 2;
    bridgeMesh.position.set(0, 0.015, 0.005);
    glassesGroup.add(bridgeMesh);

    headGroup.add(glassesGroup);

    // --- PURE WHITE ELEGANT HIJAB & FACE FRAMING (محيط الوجه أبيض ناصع) ---
    // 1. Soft Radiant White Luminous Halo behind Sara's head
    const headHaloGeo = new THREE.CircleGeometry(0.72, 32);
    const headHaloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const headHaloMesh = new THREE.Mesh(headHaloGeo, headHaloMat);
    headHaloMesh.position.set(0, 0.28, -0.25);
    characterGroup.add(headHaloMesh);

    // 2. Main Pure White Hijab Volume covering head & framing face
    const hijabGeo = new THREE.SphereGeometry(0.48, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.78);
    hijabGeo.scale(1.04, 1.18, 1.08);
    const hijabMesh = new THREE.Mesh(hijabGeo, whiteHijabMat);
    hijabMesh.position.set(0, 0.05, -0.05);
    headGroup.add(hijabMesh);

    // 3. Pure White Forehead Undercap Band framing upper face
    const foreheadBandGeo = new THREE.TorusGeometry(0.44, 0.04, 16, 32);
    const foreheadBandMesh = new THREE.Mesh(foreheadBandGeo, whiteHijabMat);
    foreheadBandMesh.position.set(0, 0.22, 0.08);
    foreheadBandMesh.rotation.x = Math.PI / 4.2;
    headGroup.add(foreheadBandMesh);

    // 4. Elegant Academy Gold Trim ribbon on the white band
    const goldTrimGeo = new THREE.TorusGeometry(0.45, 0.012, 12, 32);
    const goldTrimMesh = new THREE.Mesh(goldTrimGeo, academyGoldMat);
    goldTrimMesh.position.set(0, 0.23, 0.09);
    goldTrimMesh.rotation.x = Math.PI / 4.2;
    headGroup.add(goldTrimMesh);

    // 5. Pure White Chin & Jaw Wrap framing lower face
    const chinWrapGeo = new THREE.TorusGeometry(0.26, 0.065, 16, 32);
    chinWrapGeo.scale(1.05, 0.65, 1.15);
    const chinWrapMesh = new THREE.Mesh(chinWrapGeo, whiteHijabMat);
    chinWrapMesh.position.set(0, -0.18, 0.22);
    chinWrapMesh.rotation.x = Math.PI / 3.4;
    headGroup.add(chinWrapMesh);

    // 6. Pure White Neck & Shoulder Drape
    const shoulderDrapeGeo = new THREE.CylinderGeometry(0.28, 0.44, 0.26, 32, 1, false, 0, Math.PI * 1.4);
    const shoulderDrapeMesh = new THREE.Mesh(shoulderDrapeGeo, whiteHijabMat);
    shoulderDrapeMesh.position.set(0, 0.16, 0.06);
    shoulderDrapeMesh.rotation.y = Math.PI * 0.8;
    torsoGroup.add(shoulderDrapeMesh);

    // 7. Subtle natural warm hair peek beneath white band
    const fringeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    fringeGeo.scale(1.3, 0.5, 0.5);
    const fringeMesh = new THREE.Mesh(fringeGeo, hairMat);
    fringeMesh.position.set(0, 0.38, 0.34);
    fringeMesh.rotation.z = 0.08;
    headGroup.add(fringeMesh);

    characterGroup.add(headGroup);

    // --- FLOATING HOLOGRAPHIC PEDESTAL / BASE ---
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -1.02, 0);

    // Soft Shadow Disk
    const shadowGeo = new THREE.CircleGeometry(0.55, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x001530,
      transparent: true,
      opacity: 0.35
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    baseGroup.add(shadowMesh);

    // Glowing Holographic Golden Ring
    const haloRingGeo = new THREE.TorusGeometry(0.48, 0.015, 16, 32);
    const haloRingMat = new THREE.MeshStandardMaterial({
      color: 0xc49e3a,
      emissive: 0xc49e3a,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.y = 0.08;
    haloRingRef.current = haloRing;
    baseGroup.add(haloRing);

    characterGroup.add(baseGroup);

    // --- FLOATING CELEBRATION SPARKLE PARTICLES ---
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 1.6;
      particlePos[i + 1] = Math.random() * 1.8 - 0.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 1.6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xfde68a,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesGroupRef.current = particles;
    scene.add(particles);

    // Mouse movement listener for eye & head tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseCoords.current = {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y))
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;
    let blinkProgress = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // 1. Idle Floating Bobbing
      if (characterGroupRef.current) {
        const floatY = Math.sin(time * 2.2) * 0.045;
        characterGroupRef.current.position.y = floatY;
        
        // Gentle breathing rotation
        characterGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.04;
      }

      // Rotate glowing halo ring
      if (haloRingRef.current) {
        haloRingRef.current.rotation.z = time * 0.6;
      }

      // Animate floating sparkles
      if (particlesGroupRef.current) {
        particlesGroupRef.current.rotation.y = time * 0.15;
      }

      // 2. Eye & Head Tracking Cursor
      if (headGroupRef.current) {
        const targetHeadRotY = mouseCoords.current.x * 0.25;
        const targetHeadRotX = -mouseCoords.current.y * 0.18;

        headGroupRef.current.rotation.y += (targetHeadRotY - headGroupRef.current.rotation.y) * 0.08;
        headGroupRef.current.rotation.x += (targetHeadRotX - headGroupRef.current.rotation.x) * 0.08;

        // Specific tilt based on state
        if (currentEmotion === 'listening') {
          headGroupRef.current.rotation.z = 0.08; // Curious attentive tilt
        } else if (currentEmotion === 'thinking') {
          headGroupRef.current.rotation.x = -0.15; // Looking thoughtfully upward
          headGroupRef.current.rotation.y = 0.15;
        } else {
          headGroupRef.current.rotation.z = Math.sin(time * 1.5) * 0.015;
        }
      }

      // 3. Eye Pupil Tracking
      if (leftPupilRef.current && rightPupilRef.current) {
        const pupilX = mouseCoords.current.x * 0.018;
        const pupilY = mouseCoords.current.y * 0.015;
        leftPupilRef.current.position.x = pupilX;
        leftPupilRef.current.position.y = pupilY;
        rightPupilRef.current.position.x = pupilX;
        rightPupilRef.current.position.y = pupilY;
      }

      // 4. Natural Blinking logic
      blinkTimer += delta;
      if (blinkTimer > 3.5 && !isBlinking) {
        isBlinking = true;
        blinkProgress = 0;
        blinkTimer = 0;
      }

      if (isBlinking) {
        blinkProgress += delta * 9;
        const lidScale = Math.sin(blinkProgress) * 1.0;
        if (leftEyelidRef.current && rightEyelidRef.current) {
          leftEyelidRef.current.scale.y = Math.max(0.05, Math.min(1.0, lidScale));
          rightEyelidRef.current.scale.y = Math.max(0.05, Math.min(1.0, lidScale));
        }

        if (blinkProgress >= Math.PI) {
          isBlinking = false;
          if (leftEyelidRef.current && rightEyelidRef.current) {
            leftEyelidRef.current.scale.y = 0.05;
            rightEyelidRef.current.scale.y = 0.05;
          }
        }
      }

      // 5. Mouth Speech Animation (Viseme Phonemes)
      if (mouthRef.current) {
        if (currentEmotion === 'speaking') {
          // Open/close mouth rhythmically with voice
          const speechOpen = Math.abs(Math.sin(time * 14)) * 0.9 + Math.abs(Math.cos(time * 7)) * 0.4;
          mouthRef.current.scale.y = 0.6 + speechOpen * 1.2;
          mouthRef.current.scale.x = 1.3 - speechOpen * 0.25;

          // Enthusiastic head bobbing while speaking
          if (headGroupRef.current) {
            headGroupRef.current.position.y = 0.28 + Math.sin(time * 12) * 0.015;
          }
        } else {
          // Warm resting smile
          mouthRef.current.scale.set(1.3, 0.45, 0.5);
          if (headGroupRef.current) {
            headGroupRef.current.position.y = 0.28;
          }
        }
      }

      // 6. Arms & Dynamic Gestures Animation
      if (leftArmGroupRef.current && rightArmGroupRef.current && leftForearmGroupRef.current && rightForearmGroupRef.current) {
        if (activeGesture === 'waving') {
          // Right arm waving
          rightArmGroupRef.current.rotation.z = -1.6 + Math.sin(time * 7) * 0.25;
          rightArmGroupRef.current.rotation.x = -0.3;
          rightForearmGroupRef.current.rotation.z = -0.5 + Math.cos(time * 7) * 0.3;

          leftArmGroupRef.current.rotation.z = 0.2 + Math.sin(time * 1.5) * 0.04;
          leftForearmGroupRef.current.rotation.x = -0.1;
        } else if (activeGesture === 'clapping' || currentEmotion === 'celebrating') {
          // Clapping hands
          const clapCycle = Math.sin(time * 12) * 0.2;
          rightArmGroupRef.current.rotation.set(-0.7, -0.4 + clapCycle, -0.5);
          leftArmGroupRef.current.rotation.set(-0.7, 0.4 - clapCycle, 0.5);
          rightForearmGroupRef.current.rotation.set(-0.4, 0, -0.2);
          leftForearmGroupRef.current.rotation.set(-0.4, 0, 0.2);
        } else if (activeGesture === 'pointing') {
          // Right arm points toward board / screen
          rightArmGroupRef.current.rotation.set(-0.8, -0.5, -0.3);
          rightForearmGroupRef.current.rotation.set(-0.2, 0, 0.1);
          leftArmGroupRef.current.rotation.set(0.1, 0, 0.2);
          leftForearmGroupRef.current.rotation.set(-0.1, 0, 0);
        } else if (activeGesture === 'explaining' || currentEmotion === 'speaking') {
          // Explaining hands moving gently
          rightArmGroupRef.current.rotation.x = -0.35 + Math.sin(time * 3) * 0.15;
          rightArmGroupRef.current.rotation.z = -0.35 + Math.cos(time * 2.5) * 0.1;
          rightForearmGroupRef.current.rotation.x = -0.35 + Math.sin(time * 3) * 0.2;

          leftArmGroupRef.current.rotation.x = -0.35 + Math.cos(time * 3) * 0.15;
          leftArmGroupRef.current.rotation.z = 0.35 + Math.sin(time * 2.5) * 0.1;
          leftForearmGroupRef.current.rotation.x = -0.35 + Math.cos(time * 3) * 0.2;
        } else {
          // Idle natural resting posture with subtle breathing
          rightArmGroupRef.current.rotation.z = -0.18 + Math.sin(time * 1.2) * 0.03;
          rightArmGroupRef.current.rotation.x = Math.cos(time * 1.5) * 0.03;
          rightForearmGroupRef.current.rotation.x = -0.1;

          leftArmGroupRef.current.rotation.z = 0.18 - Math.sin(time * 1.2) * 0.03;
          leftArmGroupRef.current.rotation.x = Math.cos(time * 1.5) * 0.03;
          leftForearmGroupRef.current.rotation.x = -0.1;
        }
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      renderer.dispose();
    };
  }, [isOpen, isMinimized, currentEmotion, activeGesture, activeOutfit]);

  // Handle Dragging (Mouse & Touch for Mobile)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position?.x || 0,
      posY: position?.y || 0
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      mouseX: e.touches[0].clientX,
      mouseY: e.touches[0].clientY,
      posX: position?.x || 0,
      posY: position?.y || 0
    };
  };

  const handleCanvasClick = () => {
    if (hasDraggedRef.current) return;
    onCharacterClick();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasDraggedRef.current = true;
      }
      setPosition({
        x: dragStartRef.current.posX + deltaX,
        y: dragStartRef.current.posY + deltaY
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - dragStartRef.current.mouseX;
      const deltaY = e.touches[0].clientY - dragStartRef.current.mouseY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasDraggedRef.current = true;
      }
      setPosition({
        x: dragStartRef.current.posX + deltaX,
        y: dragStartRef.current.posY + deltaY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        transform: position ? `translate3d(${position.x}px, ${position.y}px, 0)` : undefined
      }}
      className={`fixed z-40 select-none ${
        position ? '' : isRtl ? 'bottom-20 left-4 sm:bottom-16 sm:left-8' : 'bottom-20 right-4 sm:bottom-16 sm:right-8'
      }`}
    >
      {/* Minimized View (Clean Floating Circular 3D Badge) */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#002147] to-[#0a3568] border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group"
          title={isRtl ? 'انقر لتكبير مجسم سارة 3D' : 'Click to expand Sara 3D'}
        >
          <span className="text-2xl filter drop-shadow">👩‍🏫</span>
          {isSpeaking && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
          )}
          <span className="text-[9px] font-black text-amber-300 mt-0.5 group-hover:scale-105 transition-transform">
            {isRtl ? 'سارة 3D' : 'Sara 3D'}
          </span>
        </button>
      ) : (
        /* Pure 3D Figure View (بدون أي إطار أو خلفية مستطيلة إطلاقاً) */
        <div className="relative flex flex-col items-center group pointer-events-auto">
          
          {/* Floating Dialogue Speech Balloon (when speaking) */}
          {currentSpeechText && (
            <div className="absolute -top-14 sm:-top-16 inset-x-0 mx-auto max-w-[240px] z-30 p-2.5 bg-slate-900/95 backdrop-blur-md border-2 border-amber-400/80 rounded-2xl shadow-2xl text-center text-xs text-amber-100 font-medium leading-relaxed animate-in fade-in zoom-in-95">
              <p className="line-clamp-2">{currentSpeechText}</p>
              {/* Pointer arrow pointing down towards Sara */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-amber-400/80" />
            </div>
          )}

          {/* Discreet Floating Action Micro-Bar on Hover / Touch */}
          <div 
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="absolute -top-4 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/50 shadow-xl opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-30 cursor-move text-white"
            title={isRtl ? 'اسحب لنقل سارة في أي مكان بالشاشة' : 'Drag to reposition Sara'}
          >
            <Move size={11} className="text-amber-400" />
            <span className="text-[10px] font-black text-amber-300 pe-1">
              {isRtl ? 'سارة 3D' : 'Sara 3D'}
            </span>

            {/* Speaking/listening status indicator */}
            <span className={`w-1.5 h-1.5 rounded-full ${
              currentEmotion === 'speaking' ? 'bg-amber-400 animate-pulse' :
              currentEmotion === 'listening' ? 'bg-emerald-400 animate-ping' :
              'bg-emerald-400'
            }`} />

            {/* Quick gestures & outfits trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickMenu(!showQuickMenu);
              }}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                showQuickMenu ? 'bg-amber-400 text-slate-950' : 'hover:bg-white/20 text-amber-300'
              }`}
              title={isRtl ? 'حركات وأزياء سارة' : 'Gestures & Outfits'}
            >
              <Sparkles size={11} />
            </button>

            {/* Minimize button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              className="p-1 hover:bg-white/20 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={isRtl ? 'تصغير' : 'Minimize'}
            >
              <Minimize2 size={11} />
            </button>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="p-1 hover:bg-rose-500/80 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={isRtl ? 'إغلاق' : 'Close'}
            >
              <X size={11} />
            </button>
          </div>

          {/* Quick Gestures & Outfits Floating Micro-Menu */}
          {showQuickMenu && (
            <div className="absolute top-4 z-40 bg-slate-900/95 backdrop-blur-md border border-amber-400/60 rounded-2xl p-2.5 shadow-2xl text-white text-xs w-52 space-y-2 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between text-[10px] font-black text-amber-300 pb-1 border-b border-white/10">
                <span>{isRtl ? 'حركات سارة ✨' : 'Gestures ✨'}</span>
                <button 
                  onClick={() => setShowQuickMenu(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'waving' as SaraGesture, label: '👋' },
                  { id: 'clapping' as SaraGesture, label: '👏' },
                  { id: 'pointing' as SaraGesture, label: '👉' },
                  { id: 'explaining' as SaraGesture, label: '💡' }
                ].map(g => (
                  <button
                    key={`gesture-${g.id}`}
                    onClick={() => triggerGesture(g.id)}
                    className={`py-1 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                      activeGesture === g.id
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-amber-200/80 font-bold">{isRtl ? 'الزي:' : 'Outfit:'}</span>
                <div className="flex items-center gap-1">
                  {SARA_OUTFITS.map(outfit => (
                    <button
                      key={`outfit-${outfit.id}`}
                      onClick={() => {
                        setActiveOutfit(outfit.id);
                        blazerMaterialsRef.current.forEach(m => m.color.setHex(outfit.blazerHex));
                        trimMaterialsRef.current.forEach(m => m.color.setHex(outfit.trimHex));
                      }}
                      className={`w-6 h-6 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center border ${
                        activeOutfit === outfit.id
                          ? 'border-amber-300 scale-110 shadow-sm bg-amber-400/20'
                          : 'border-white/20 hover:scale-105 bg-white/5'
                      }`}
                      title={isRtl ? outfit.nameAr : outfit.nameEn}
                    >
                      {outfit.badgeEmoji}
                    </button>
                  ))}
                </div>
              </div>

              {position && (
                <button
                  onClick={() => setPosition(null)}
                  className="w-full py-1 text-center text-[10px] text-slate-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 cursor-pointer pt-1 border-t border-white/10"
                >
                  <RotateCcw size={10} />
                  <span>{isRtl ? 'إعادة الموقع الأساسي' : 'Reset position'}</span>
                </button>
              )}
            </div>
          )}

          {/* Pure 3D Canvas Mount - No Card Box, No Rectangular Borders */}
          <div
            ref={mountRef}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="w-48 xs:w-56 sm:w-64 h-56 xs:h-64 sm:h-72 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-[1.03] transition-transform select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)]"
            title={isRtl ? 'مجسم سارة 3D: اسحب لنقلها، أو انقر للتفاعل الصوتي ✨' : 'Sara 3D: Drag to move, or click to interact ✨'}
          />

          {/* Subtle natural 3D contact shadow under Sara's pedestal */}
          <div className="w-36 h-3 -mt-2 bg-radial from-black/40 via-black/15 to-transparent rounded-full blur-[2px] pointer-events-none" />
        </div>
      )}
    </div>
  );
};
