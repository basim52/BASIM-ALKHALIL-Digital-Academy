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
  isWhiteboardOpen?: boolean;
  isExplainingWhiteboard?: boolean;
  currentLang?: 'ar' | 'en';
  onToggleLang?: () => void;
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
  onToggle,
  isWhiteboardOpen = false,
  isExplainingWhiteboard = false,
  currentLang = 'ar',
  onToggleLang
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

  // Synchronize whiteboard explanation gesture
  useEffect(() => {
    if (isExplainingWhiteboard) {
      setActiveGesture('pointing');
    } else if (activeGesture === 'pointing') {
      setActiveGesture('idle');
    }
  }, [isExplainingWhiteboard]);

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
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesGroupRef = useRef<THREE.Points | null>(null);
  const leftArmGroupRef = useRef<THREE.Group | null>(null);
  const rightArmGroupRef = useRef<THREE.Group | null>(null);
  const leftForearmGroupRef = useRef<THREE.Group | null>(null);
  const rightForearmGroupRef = useRef<THREE.Group | null>(null);
  const blazerMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const trimMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Mouse tracking in Three.js coordinates
  const mouseCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Touch and click coordination refs
  const touchTapCoordsRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });
  const suppressNextClickRef = useRef<boolean>(false);

  // --- GRAVITY & PHYSICS SIMULATION STATE ---
  // Harmonic spring-damper model for realistic inertia, gravity bounce, and touch response
  const physicsRef = useRef({
    // Vertical displacement and velocity (gravity compression & rebound)
    y: 0,
    vy: 0,
    targetY: 0,

    // Pitch tilt (rotation around X axis: nodding / leaning back & forward)
    pitch: 0,
    vPitch: 0,
    targetPitch: 0,

    // Roll tilt (rotation around Z axis: sway / leaning left & right)
    roll: 0,
    vRoll: 0,
    targetRoll: 0,

    // Secondary head follow-through lag (natural neck compliance)
    headPitchLag: 0,
    headRollLag: 0,

    // Kinetic energy surge for particles and halo
    spinBoost: 0,

    // Drag velocity tracking for inertia and fling momentum
    lastClientX: 0,
    lastClientY: 0,
    lastTimestamp: 0,
    dragVx: 0,
    dragVy: 0,
  });

  const applyPhysicsImpulse = (impulseY: number, impulsePitch: number, impulseRoll: number, boost: number = 1.2) => {
    const p = physicsRef.current;
    p.vy += impulseY;
    p.vPitch += impulsePitch;
    p.vRoll += impulseRoll;
    p.spinBoost = Math.min(p.spinBoost + boost, 4.0);
  };

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

    // --- MATERIALS (Lifelike Human Skin, Hair, Eyes & Fabric Shaders) ---
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: 0xffdfd0, // Warm luminous porcelain-peach Mediterranean/Arabian skin tone
      roughness: 0.52,
      metalness: 0.0,
      clearcoat: 0.08,
      clearcoatRoughness: 0.35,
      sheen: 0.45,
      sheenColor: new THREE.Color(0xffc8ba) // Skin subsurface scattering & peach fuzz glow
    });

    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xff7568, // Soft rosy coral airbrushed cheek blush
      roughness: 0.75,
      transparent: true,
      opacity: 0.28
    });

    const lipMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9576e, // Soft natural rose-coral satin lips
      roughness: 0.28,
      metalness: 0.0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2 // Subtle natural lip moisture
    });

    const teethMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7, // Clean pearly ivory enamel
      roughness: 0.22,
      metalness: 0.0
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x24150e, // Rich dark warm chestnut / espresso
      roughness: 0.65,
      metalness: 0.05
    });

    const eyebrowMat = new THREE.MeshStandardMaterial({
      color: 0x2c1b12, // Natural warm dark brown brows
      roughness: 0.85
    });

    // Pure Radiant White Chiffon/Silk Hijab
    const whiteHijabMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.82, // Authentic soft cloth matte weave
      metalness: 0.01
    });

    const scarfSilkMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45,
      metalness: 0.02
    });

    const academyNavyMat = new THREE.MeshStandardMaterial({
      color: 0x002147,
      roughness: 0.45,
      metalness: 0.12
    });

    const academyGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc49e3a,
      roughness: 0.22,
      metalness: 0.85
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });

    // Realistic Eye Materials
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xfaf9f6,
      roughness: 0.1,
      metalness: 0.0
    });

    const irisLimbalMat = new THREE.MeshBasicMaterial({
      color: 0x1a0f0a // Dark defined outer limbal ring framing the iris
    });

    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x5e3518, // Warm hazel-amber with golden flecks
      roughness: 0.15,
      metalness: 0.05
    });

    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0x0a0604 // Deep black pupil
    });

    const catchlightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    const lashMat = new THREE.MeshBasicMaterial({
      color: 0x160d08 // Deep espresso natural lash line
    });

    const caruncleMat = new THREE.MeshBasicMaterial({
      color: 0xefa098 // Soft peach inner eye tear duct
    });

    // --- ARTICULATED FEMININE HANDS BUILDER ---
    const createRealisticHand = (isLeft: boolean) => {
      const handGroup = new THREE.Group();
      const sign = isLeft ? 1 : -1;

      // 1. Palm (soft tapered rounded volume)
      const palmGeo = new THREE.BoxGeometry(0.075, 0.085, 0.035);
      const palmMesh = new THREE.Mesh(palmGeo, skinMat);
      palmMesh.position.set(0, -0.045, 0);
      handGroup.add(palmMesh);

      // 2. Thumb (naturally angled inward and forward)
      const thumbGroup = new THREE.Group();
      thumbGroup.position.set(sign * 0.042, -0.025, 0.012);
      thumbGroup.rotation.z = sign * 0.45;
      thumbGroup.rotation.y = sign * 0.35;
      
      const thumbProximalGeo = new THREE.CylinderGeometry(0.014, 0.013, 0.04, 8);
      const thumbProximal = new THREE.Mesh(thumbProximalGeo, skinMat);
      thumbProximal.position.y = -0.02;
      thumbGroup.add(thumbProximal);

      const thumbTipGeo = new THREE.SphereGeometry(0.012, 8, 8);
      thumbTipGeo.scale(1, 1.3, 0.9);
      const thumbTip = new THREE.Mesh(thumbTipGeo, skinMat);
      thumbTip.position.y = -0.042;
      thumbGroup.add(thumbTip);
      handGroup.add(thumbGroup);

      // 3. Four Fingers with natural curvature and gentle graduation
      const fingerParams = [
        { x: sign * 0.028, len: 0.055, rad: 0.011 },  // Index
        { x: sign * 0.009, len: 0.062, rad: 0.0115 }, // Middle
        { x: -sign * 0.01, len: 0.056, rad: 0.0105 }, // Ring
        { x: -sign * 0.027, len: 0.045, rad: 0.0095 } // Pinky
      ];

      fingerParams.forEach((f, idx) => {
        const fingerGroup = new THREE.Group();
        fingerGroup.position.set(f.x, -0.085, 0);
        fingerGroup.rotation.x = -0.15 - idx * 0.04; // Natural resting curve

        const phalanxGeo = new THREE.CylinderGeometry(f.rad * 0.9, f.rad, f.len, 8);
        const phalanx = new THREE.Mesh(phalanxGeo, skinMat);
        phalanx.position.y = -f.len / 2;
        fingerGroup.add(phalanx);

        const tipGeo = new THREE.SphereGeometry(f.rad * 0.95, 8, 8);
        tipGeo.scale(1, 1.2, 0.9);
        const tip = new THREE.Mesh(tipGeo, skinMat);
        tip.position.y = -f.len;
        fingerGroup.add(tip);

        handGroup.add(fingerGroup);
      });

      return handGroup;
    };

    // --- TORSO / BLAZER ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = -0.55;

    // Main Tailored Blazer Body
    const blazerGeo = new THREE.CylinderGeometry(0.36, 0.46, 0.7, 32);
    const blazerMesh = new THREE.Mesh(blazerGeo, academyNavyMat);
    torsoGroup.add(blazerMesh);

    // White Shirt Inner V-Neck
    const shirtGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.68, 16, 1, false, 0, Math.PI);
    const shirtMesh = new THREE.Mesh(shirtGeo, whiteMat);
    shirtMesh.position.set(0, 0.03, 0.23);
    shirtMesh.rotation.y = Math.PI / 2;
    torsoGroup.add(shirtMesh);

    // Gold Lapel Trim
    const lapelGeo = new THREE.TorusGeometry(0.25, 0.018, 12, 32, Math.PI);
    const lapelMesh = new THREE.Mesh(lapelGeo, academyGoldMat);
    lapelMesh.position.set(0, 0.22, 0.3);
    lapelMesh.rotation.x = Math.PI / 2;
    lapelMesh.rotation.z = Math.PI;
    torsoGroup.add(lapelMesh);

    // Academy Gold Pin on Chest
    const pinGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.015, 16);
    const pinMesh = new THREE.Mesh(pinGeo, academyGoldMat);
    pinMesh.position.set(0.18, 0.12, 0.4);
    pinMesh.rotation.x = Math.PI / 2;
    torsoGroup.add(pinMesh);

    // --- ARMS WITH ARTICULATED REALISTIC HANDS ---
    const upperArmGeo = new THREE.CylinderGeometry(0.088, 0.078, 0.32, 16);
    upperArmGeo.translate(0, -0.16, 0);

    const forearmGeo = new THREE.CylinderGeometry(0.078, 0.072, 0.28, 16);
    forearmGeo.translate(0, -0.14, 0);

    const cuffGeo = new THREE.CylinderGeometry(0.082, 0.082, 0.032, 16);

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.41, 0.2, 0.02);
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

    // Realistic Sculpted Left Hand
    const leftHand = createRealisticHand(true);
    leftHand.position.set(0, -0.28, 0);
    leftForearmGroup.add(leftHand);

    leftArmGroup.add(leftForearmGroup);
    torsoGroup.add(leftArmGroup);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.41, 0.2, 0.02);
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

    // Realistic Sculpted Right Hand
    const rightHand = createRealisticHand(false);
    rightHand.position.set(0, -0.28, 0);
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

    // Refined Feminine Neck
    const neckGeo = new THREE.CylinderGeometry(0.125, 0.145, 0.26, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, 0.42, 0);
    torsoGroup.add(neckMesh);

    characterGroup.add(torsoGroup);

    // --- HEAD GROUP WITH ANATOMICAL FACIAL SCULPTING ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.28, 0);
    headGroupRef.current = headGroup;

    // 1. Cranium (Oval head base)
    const headGeo = new THREE.SphereGeometry(0.38, 32, 32);
    headGeo.scale(0.96, 1.14, 1.02);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    // 2. Sculpted Feminine Chin & Tapered Jawline
    const chinGeo = new THREE.SphereGeometry(0.12, 24, 24);
    chinGeo.scale(1.05, 0.85, 1.1);
    const chinMesh = new THREE.Mesh(chinGeo, skinMat);
    chinMesh.position.set(0, -0.24, 0.26);
    headGroup.add(chinMesh);

    // Left and Right Jaw Contours
    const jawGeo = new THREE.CylinderGeometry(0.045, 0.035, 0.22, 16);
    const leftJaw = new THREE.Mesh(jawGeo, skinMat);
    leftJaw.position.set(-0.16, -0.16, 0.18);
    leftJaw.rotation.z = -0.55;
    leftJaw.rotation.x = 0.25;
    headGroup.add(leftJaw);

    const rightJaw = new THREE.Mesh(jawGeo, skinMat);
    rightJaw.position.set(0.16, -0.16, 0.18);
    rightJaw.rotation.z = 0.55;
    rightJaw.rotation.x = 0.25;
    headGroup.add(rightJaw);

    // 3. High Cheekbones & Apple-Cheek Contours with Airbrushed Rosy Blush
    const cheekGeo = new THREE.SphereGeometry(0.09, 16, 16);
    cheekGeo.scale(1.15, 0.7, 0.55);

    const leftCheek = new THREE.Mesh(cheekGeo, blushMat);
    leftCheek.position.set(-0.21, -0.04, 0.33);
    leftCheek.rotation.y = -0.35;
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, blushMat);
    rightCheek.position.set(0.21, -0.04, 0.33);
    rightCheek.rotation.y = 0.35;
    headGroup.add(rightCheek);

    // 4. Sculpted Realistic Feminine Nose (Bridge, Rounded Tip, and Nostril Wings)
    const noseGroup = new THREE.Group();
    noseGroup.position.set(0, 0, 0);

    // Nasal Bridge
    const noseBridgeGeo = new THREE.CylinderGeometry(0.022, 0.038, 0.16, 16);
    const noseBridgeMesh = new THREE.Mesh(noseBridgeGeo, skinMat);
    noseBridgeMesh.position.set(0, 0.06, 0.43);
    noseBridgeMesh.rotation.x = -0.22;
    noseGroup.add(noseBridgeMesh);

    // Rounded Nasal Tip (Lobule)
    const noseTipGeo = new THREE.SphereGeometry(0.034, 16, 16);
    noseTipGeo.scale(1.1, 0.95, 1.2);
    const noseTipMesh = new THREE.Mesh(noseTipGeo, skinMat);
    noseTipMesh.position.set(0, -0.02, 0.44);
    noseGroup.add(noseTipMesh);

    // Delicate Nostrils (Alar Wings)
    const nostrilGeo = new THREE.SphereGeometry(0.022, 12, 12);
    nostrilGeo.scale(0.8, 0.9, 1.2);
    
    const leftNostril = new THREE.Mesh(nostrilGeo, skinMat);
    leftNostril.position.set(-0.032, -0.028, 0.415);
    noseGroup.add(leftNostril);

    const rightNostril = new THREE.Mesh(nostrilGeo, skinMat);
    rightNostril.position.set(0.032, -0.028, 0.415);
    noseGroup.add(rightNostril);

    headGroup.add(noseGroup);

    // 5. Philtrum Groove & Realistic Expressive Lips
    const philtrumGeo = new THREE.BoxGeometry(0.02, 0.045, 0.015);
    const philtrumMesh = new THREE.Mesh(philtrumGeo, skinMat);
    philtrumMesh.position.set(0, -0.085, 0.41);
    headGroup.add(philtrumMesh);

    // Mouth Group (Upper lip, Lower lip, and Pearly Teeth)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.145, 0.41);

    // Upper Lip with Cupid's Bow Curve
    const upperLipGeo = new THREE.CylinderGeometry(0.022, 0.028, 0.11, 16);
    upperLipGeo.scale(1.1, 0.7, 0.7);
    const upperLipMesh = new THREE.Mesh(upperLipGeo, lipMat);
    upperLipMesh.position.set(0, 0.016, 0.005);
    upperLipMesh.rotation.z = Math.PI / 2;
    mouthGroup.add(upperLipMesh);

    // Pearly Teeth Row (subtly visible during smile and speech)
    const teethGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.085, 16, 1, false, 0, Math.PI);
    const teethMesh = new THREE.Mesh(teethGeo, teethMat);
    teethMesh.position.set(0, 0.004, -0.008);
    teethMesh.rotation.x = Math.PI / 2;
    teethMesh.rotation.z = Math.PI;
    mouthGroup.add(teethMesh);

    // Lower Pillowed Lip
    const lowerLipGeo = new THREE.CylinderGeometry(0.028, 0.024, 0.115, 16);
    lowerLipGeo.scale(1.15, 0.85, 0.85);
    const lowerLipMesh = new THREE.Mesh(lowerLipGeo, lipMat);
    lowerLipMesh.position.set(0, -0.018, 0.008);
    lowerLipMesh.rotation.z = Math.PI / 2;
    mouthGroup.add(lowerLipMesh);

    mouthRef.current = mouthGroup as any;
    headGroup.add(mouthGroup);

    // 6. SOULFUL HUMAN EYES (Almond contour, Limbal ring, Wet Specular reflections)
    const createRealisticEye = (isLeft: boolean) => {
      const eyeGroup = new THREE.Group();
      const xPos = isLeft ? -0.155 : 0.155;
      eyeGroup.position.set(xPos, 0.095, 0.365);

      // Almond Sclera (Eye White with realistic curvature)
      const scleraGeo = new THREE.SphereGeometry(0.082, 24, 24);
      scleraGeo.scale(1.1, 0.95, 0.65);
      const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
      eyeGroup.add(scleraMesh);

      // Inner Corner Tear Duct (Lacrimal Caruncle)
      const caruncleGeo = new THREE.SphereGeometry(0.016, 8, 8);
      const caruncle = new THREE.Mesh(caruncleGeo, caruncleMat);
      caruncle.position.set(isLeft ? 0.065 : -0.065, -0.008, 0.038);
      eyeGroup.add(caruncle);

      // Iris Container (with Dark Limbal Ring + Hazel Golden Amber Depth)
      const irisGroup = new THREE.Group();
      irisGroup.position.set(0, 0, 0.046);

      // Dark Limbal Ring (Crucial for realistic human eye depth!)
      const limbalGeo = new THREE.TorusGeometry(0.044, 0.007, 12, 24);
      const limbalMesh = new THREE.Mesh(limbalGeo, irisLimbalMat);
      irisGroup.add(limbalMesh);

      // Warm Hazel Amber Center
      const irisGeo = new THREE.CircleGeometry(0.044, 24);
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisGroup.add(irisMesh);

      // Deep Black Pupil
      const pupilGeo = new THREE.CircleGeometry(0.024, 16);
      const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
      pupilMesh.position.z = 0.002;
      irisGroup.add(pupilMesh);

      // Primary Crisp Specular Catchlight (Gives living human spark!)
      const catchlight1Geo = new THREE.SphereGeometry(0.009, 8, 8);
      const catchlight1 = new THREE.Mesh(catchlight1Geo, catchlightMat);
      catchlight1.position.set(0.016, 0.016, 0.008);
      irisGroup.add(catchlight1);

      // Secondary Soft Bounce Specular Sparkle
      const catchlight2Geo = new THREE.SphereGeometry(0.0055, 6, 6);
      const catchlight2 = new THREE.Mesh(catchlight2Geo, catchlightMat);
      catchlight2.position.set(-0.014, -0.012, 0.006);
      irisGroup.add(catchlight2);

      eyeGroup.add(irisGroup);

      // Upper Eyelash Eyeliner Line (Gentle winged natural lash line)
      const lashGeo = new THREE.TorusGeometry(0.082, 0.011, 8, 16, Math.PI * 0.7);
      const lashMesh = new THREE.Mesh(lashGeo, lashMat);
      lashMesh.position.set(0, 0.022, 0.035);
      lashMesh.rotation.z = isLeft ? -0.15 : Math.PI - 0.15;
      eyeGroup.add(lashMesh);

      // Supratarsal Eyelid Crease (Double-fold crease)
      const creaseGeo = new THREE.TorusGeometry(0.088, 0.005, 6, 16, Math.PI * 0.6);
      const creaseMesh = new THREE.Mesh(creaseGeo, lashMat);
      creaseMesh.position.set(0, 0.05, 0.028);
      creaseMesh.rotation.z = isLeft ? -0.18 : Math.PI - 0.18;
      eyeGroup.add(creaseMesh);

      // Eyelid for Blinking Animation
      const eyelidGeo = new THREE.SphereGeometry(0.086, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
      eyelidGeo.scale(1.12, 1.02, 0.72);
      const eyelidMesh = new THREE.Mesh(eyelidGeo, skinMat);
      eyelidMesh.position.set(0, 0.01, 0.022);
      eyelidMesh.rotation.x = -Math.PI / 2;
      eyelidMesh.scale.set(1, 0.05, 1); // Start open
      eyeGroup.add(eyelidMesh);

      // Feathered Arched Dark Chestnut Eyebrow
      const browGeo = new THREE.TorusGeometry(0.084, 0.013, 8, 16, Math.PI / 1.5);
      const browMesh = new THREE.Mesh(browGeo, eyebrowMat);
      browMesh.position.set(0, 0.11, 0.03);
      browMesh.rotation.z = isLeft ? -0.16 : Math.PI - 0.16;
      eyeGroup.add(browMesh);

      return { eyeGroup, eyelidMesh, pupilMesh: irisGroup as any };
    };

    const leftEye = createRealisticEye(true);
    leftEyeRef.current = leftEye.eyeGroup;
    leftEyelidRef.current = leftEye.eyelidMesh;
    leftPupilRef.current = leftEye.pupilMesh;
    headGroup.add(leftEye.eyeGroup);

    const rightEye = createRealisticEye(false);
    rightEyeRef.current = rightEye.eyeGroup;
    rightEyelidRef.current = rightEye.eyelidMesh;
    rightPupilRef.current = rightEye.pupilMesh;
    headGroup.add(rightEye.eyeGroup);

    // 7. ULTRA-SLENDER DELICATE GOLD GLASSES (Intelligent educator framing)
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.095, 0.435);

    const glassRimGeo = new THREE.TorusGeometry(0.092, 0.006, 12, 24);
    const leftRim = new THREE.Mesh(glassRimGeo, academyGoldMat);
    leftRim.position.set(-0.155, 0, 0);
    glassesGroup.add(leftRim);

    const rightRim = new THREE.Mesh(glassRimGeo, academyGoldMat);
    rightRim.position.set(0.155, 0, 0);
    glassesGroup.add(rightRim);

    // Slender Glasses Bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.0055, 0.0055, 0.075, 8);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, academyGoldMat);
    bridgeMesh.rotation.z = Math.PI / 2;
    bridgeMesh.position.set(0, 0.012, 0.005);
    glassesGroup.add(bridgeMesh);

    headGroup.add(glassesGroup);

    // --- PURE WHITE ELEGANT HIJAB & NATURAL SOFT DRAPERY ---
    // 1. Soft Radiant White Luminous Halo behind Sara's head
    const headHaloGeo = new THREE.CircleGeometry(0.72, 32);
    const headHaloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const headHaloMesh = new THREE.Mesh(headHaloGeo, headHaloMat);
    headHaloMesh.position.set(0, 0.28, -0.25);
    characterGroup.add(headHaloMesh);

    // 2. Main Pure White Hijab Volume covering head & framing face naturally
    const hijabGeo = new THREE.SphereGeometry(0.46, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.78);
    hijabGeo.scale(1.02, 1.16, 1.06);
    const hijabMesh = new THREE.Mesh(hijabGeo, whiteHijabMat);
    hijabMesh.position.set(0, 0.05, -0.05);
    headGroup.add(hijabMesh);

    // 3. Pure White Forehead Undercap Band framing upper face cleanly
    const foreheadBandGeo = new THREE.TorusGeometry(0.42, 0.035, 16, 32);
    const foreheadBandMesh = new THREE.Mesh(foreheadBandGeo, whiteHijabMat);
    foreheadBandMesh.position.set(0, 0.22, 0.08);
    foreheadBandMesh.rotation.x = Math.PI / 4.2;
    headGroup.add(foreheadBandMesh);

    // 4. Subtle Natural Warm Espresso Baby Hair wisps peeking beneath band
    const fringeGeo = new THREE.SphereGeometry(0.11, 16, 16);
    fringeGeo.scale(1.2, 0.45, 0.45);
    const fringeMesh = new THREE.Mesh(fringeGeo, hairMat);
    fringeMesh.position.set(0, 0.36, 0.33);
    fringeMesh.rotation.z = 0.08;
    headGroup.add(fringeMesh);

    // 5. Elegant Academy Gold Trim ribbon on the white band
    const goldTrimGeo = new THREE.TorusGeometry(0.43, 0.009, 12, 32);
    const goldTrimMesh = new THREE.Mesh(goldTrimGeo, academyGoldMat);
    goldTrimMesh.position.set(0, 0.23, 0.09);
    goldTrimMesh.rotation.x = Math.PI / 4.2;
    headGroup.add(goldTrimMesh);

    // 6. Pure White Chin & Jaw Wrap framing lower face softly
    const chinWrapGeo = new THREE.TorusGeometry(0.24, 0.055, 16, 32);
    chinWrapGeo.scale(1.05, 0.65, 1.15);
    const chinWrapMesh = new THREE.Mesh(chinWrapGeo, whiteHijabMat);
    chinWrapMesh.position.set(0, -0.19, 0.22);
    chinWrapMesh.rotation.x = Math.PI / 3.4;
    headGroup.add(chinWrapMesh);

    // 7. Pure White Layered Fabric Drapery over Neck & Shoulders
    const shoulderDrapeGeo = new THREE.CylinderGeometry(0.26, 0.42, 0.28, 32, 1, false, 0, Math.PI * 1.5);
    const shoulderDrapeMesh = new THREE.Mesh(shoulderDrapeGeo, whiteHijabMat);
    shoulderDrapeMesh.position.set(0, 0.16, 0.06);
    shoulderDrapeMesh.rotation.y = Math.PI * 0.8;
    torsoGroup.add(shoulderDrapeMesh);

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
    shadowMeshRef.current = shadowMesh;
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

      // --- PHYSICAL SPRING & GRAVITY INTEGRATION ---
      const dt = Math.min(delta, 0.04);
      const p = physicsRef.current;

      // Natural harmonic oscillator constants (k = stiffness, c = damping)
      const springK = 16.0;
      const damping = 4.2;

      // 1. Vertical axis: gravity displacement & spring recovery
      const effectiveTargetY = isDragging ? p.targetY : 0;
      const diffY = p.y - effectiveTargetY;
      const ay = -springK * diffY - damping * p.vy;
      p.vy += ay * dt;
      p.y += p.vy * dt;

      // 2. Pitch axis (rotation X): leaning forward/backward with inertia
      const effectiveTargetPitch = isDragging ? p.targetPitch : 0;
      const diffPitch = p.pitch - effectiveTargetPitch;
      const aPitch = -springK * diffPitch - damping * p.vPitch;
      p.vPitch += aPitch * dt;
      p.pitch += p.vPitch * dt;

      // 3. Roll axis (rotation Z): lateral sway & tilt with inertia
      const effectiveTargetRoll = isDragging ? p.targetRoll : 0;
      const diffRoll = p.roll - effectiveTargetRoll;
      const aRoll = -springK * diffRoll - damping * p.vRoll;
      p.vRoll += aRoll * dt;
      p.roll += p.vRoll * dt;

      // 4. Secondary organic head lag (elastic neck follow-through)
      p.headRollLag += (-p.roll * 0.35 - p.headRollLag) * (dt * 10);
      p.headPitchLag += (-p.pitch * 0.25 - p.headPitchLag) * (dt * 10);

      // 5. Kinetic energy spin boost decay
      p.spinBoost = Math.max(0, p.spinBoost - dt * 1.4);

      // 1. Idle Floating Bobbing + Physics Gravity displacement
      if (characterGroupRef.current) {
        const floatY = Math.sin(time * 2.2) * 0.045;
        characterGroupRef.current.position.y = floatY + p.y;
        
        // Gentle breathing rotation combined with physics roll and pitch
        characterGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.04;
        characterGroupRef.current.rotation.z = p.roll;
        characterGroupRef.current.rotation.x = p.pitch;
      }

      // Rotate glowing halo ring (speeds up with touch/movement physics energy)
      if (haloRingRef.current) {
        haloRingRef.current.rotation.z = time * 0.6 + p.spinBoost * 1.8;
      }

      // Dynamic scale of ground contact shadow matching gravity distance
      if (shadowMeshRef.current) {
        const shadowScale = Math.max(0.65, Math.min(1.35, 1.0 - p.y * 1.5));
        shadowMeshRef.current.scale.set(shadowScale, shadowScale, shadowScale);
      }

      // Animate floating sparkles (speeds up with physics interaction)
      if (particlesGroupRef.current) {
        particlesGroupRef.current.rotation.y = time * 0.15 + p.spinBoost * 1.2;
      }

      // 2. Eye & Head Tracking Cursor + Secondary Organic Physics Lag
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

        // Add secondary inertial head compliance
        headGroupRef.current.rotation.z += p.headRollLag;
        headGroupRef.current.rotation.x += p.headPitchLag;
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

      // 5. Natural Mouth Speech Animation (Viseme Phonemes)
      if (mouthRef.current) {
        if (currentEmotion === 'speaking') {
          // Open/close mouth rhythmically with voice
          const speechOpen = Math.abs(Math.sin(time * 14)) * 0.45 + Math.abs(Math.cos(time * 7)) * 0.25;
          mouthRef.current.scale.y = 1.0 + speechOpen * 0.85;
          mouthRef.current.scale.x = 1.0 - speechOpen * 0.1;

          // Enthusiastic gentle head movement while speaking
          if (headGroupRef.current) {
            headGroupRef.current.position.y = 0.28 + Math.sin(time * 12) * 0.01;
          }
        } else {
          // Warm natural resting smile
          mouthRef.current.scale.set(1.0, 1.0, 1.0);
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

  // Handle Dragging (Mouse & Touch for Mobile / Tablet) with Velocity & Physics
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position?.x || 0,
      posY: position?.y || 0
    };
    const p = physicsRef.current;
    p.lastClientX = e.clientX;
    p.lastClientY = e.clientY;
    p.lastTimestamp = performance.now();
    p.dragVx = 0;
    p.dragVy = 0;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    const touch = e.touches[0];
    dragStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      posX: position?.x || 0,
      posY: position?.y || 0
    };
    touchTapCoordsRef.current = { clientX: touch.clientX, clientY: touch.clientY };
    const p = physicsRef.current;
    p.lastClientX = touch.clientX;
    p.lastClientY = touch.clientY;
    p.lastTimestamp = performance.now();
    p.dragVx = 0;
    p.dragVy = 0;
  };

  // Click handler on canvas with touch poke physics impulse
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current || suppressNextClickRef.current) return;

    if (mountRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Downward gravity dip + lateral and pitch recoil based on touch location
      const impulseY = -0.16;
      const impulsePitch = normY * 0.22;
      const impulseRoll = -normX * 0.28;

      applyPhysicsImpulse(impulseY, impulsePitch, impulseRoll, 2.0);

      // Subtle haptic response on supported devices
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(15); } catch (_) {}
      }
    }

    onCharacterClick?.();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasDraggedRef.current = true;
      }

      // Physics velocity tracking
      const now = performance.now();
      const p = physicsRef.current;
      const dt = Math.max(1, now - p.lastTimestamp);
      const vx = ((e.clientX - p.lastClientX) / dt) * 1000;
      const vy = ((e.clientY - p.lastClientY) / dt) * 1000;

      p.dragVx = p.dragVx * 0.6 + vx * 0.4;
      p.dragVy = p.dragVy * 0.6 + vy * 0.4;
      p.lastClientX = e.clientX;
      p.lastClientY = e.clientY;
      p.lastTimestamp = now;

      // Realistic inertia: lean away from acceleration + compress against gravity
      p.targetRoll = Math.max(-0.35, Math.min(0.35, -p.dragVx * 0.00035));
      p.targetPitch = Math.max(-0.35, Math.min(0.35, p.dragVy * 0.00035));
      p.targetY = Math.max(-0.16, Math.min(0.16, -p.dragVy * 0.00018));

      setPosition({
        x: dragStartRef.current.posX + deltaX,
        y: dragStartRef.current.posY + deltaY
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartRef.current.mouseX;
      const deltaY = touch.clientY - dragStartRef.current.mouseY;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        hasDraggedRef.current = true;
      }

      // Physics velocity tracking for touch
      const now = performance.now();
      const p = physicsRef.current;
      const dt = Math.max(1, now - p.lastTimestamp);
      const vx = ((touch.clientX - p.lastClientX) / dt) * 1000;
      const vy = ((touch.clientY - p.lastClientY) / dt) * 1000;

      p.dragVx = p.dragVx * 0.6 + vx * 0.4;
      p.dragVy = p.dragVy * 0.6 + vy * 0.4;
      p.lastClientX = touch.clientX;
      p.lastClientY = touch.clientY;
      p.lastTimestamp = now;

      p.targetRoll = Math.max(-0.35, Math.min(0.35, -p.dragVx * 0.00035));
      p.targetPitch = Math.max(-0.35, Math.min(0.35, p.dragVy * 0.00035));
      p.targetY = Math.max(-0.16, Math.min(0.16, -p.dragVy * 0.00018));

      setPosition({
        x: dragStartRef.current.posX + deltaX,
        y: dragStartRef.current.posY + deltaY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const p = physicsRef.current;
      p.targetRoll = 0;
      p.targetPitch = 0;
      p.targetY = 0;

      // Transfer release momentum into natural spring oscillation
      const speed = Math.hypot(p.dragVx, p.dragVy);
      if (speed > 80) {
        p.vRoll += Math.max(-1.4, Math.min(1.4, -p.dragVx * 0.001));
        p.vPitch += Math.max(-1.4, Math.min(1.4, p.dragVy * 0.001));
        p.vy += Math.max(-0.25, Math.min(0.25, -p.dragVy * 0.00035));
        p.spinBoost = Math.min(3.5, p.spinBoost + speed * 0.0015);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      const p = physicsRef.current;
      p.targetRoll = 0;
      p.targetPitch = 0;
      p.targetY = 0;

      if (!hasDraggedRef.current) {
        // Touch poke on tablet / mobile without drag movement
        if (mountRef.current) {
          const rect = mountRef.current.getBoundingClientRect();
          const normX = ((touchTapCoordsRef.current.clientX - rect.left) / rect.width) * 2 - 1;
          const normY = -(((touchTapCoordsRef.current.clientY - rect.top) / rect.height) * 2 - 1);

          const impulseY = -0.16;
          const impulsePitch = normY * 0.22;
          const impulseRoll = -normX * 0.28;

          applyPhysicsImpulse(impulseY, impulsePitch, impulseRoll, 2.0);

          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(15); } catch (_) {}
          }
        }
        suppressNextClickRef.current = true;
        setTimeout(() => {
          suppressNextClickRef.current = false;
        }, 350);
        onCharacterClick?.();
      } else {
        // Transfer release momentum
        const speed = Math.hypot(p.dragVx, p.dragVy);
        if (speed > 80) {
          p.vRoll += Math.max(-1.4, Math.min(1.4, -p.dragVx * 0.001));
          p.vPitch += Math.max(-1.4, Math.min(1.4, p.dragVy * 0.001));
          p.vy += Math.max(-0.25, Math.min(0.25, -p.dragVy * 0.00035));
          p.spinBoost = Math.min(3.5, p.spinBoost + speed * 0.0015);
        }
      }
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
      className={`fixed ${isWhiteboardOpen ? 'z-60' : 'z-40'} select-none transition-[bottom,left,right] ${
        position
          ? ''
          : isWhiteboardOpen
            ? (isRtl ? 'bottom-6 left-6 sm:bottom-8 sm:left-10' : 'bottom-6 right-6 sm:bottom-8 sm:right-10')
            : (isRtl ? 'bottom-20 left-4 sm:bottom-16 sm:left-8' : 'bottom-20 right-4 sm:bottom-16 sm:right-8')
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

          {/* Whiteboard Explaining Active Badge */}
          {isExplainingWhiteboard && (
            <div className="absolute -top-20 z-40 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 rounded-full font-black text-xs shadow-2xl border-2 border-white flex items-center gap-1.5 animate-bounce">
              <span>📐</span>
              <span>{isRtl ? 'سارة تشرح على السبورة 🎙️' : 'Explaining on Whiteboard 🎙️'}</span>
            </div>
          )}
          
          {/* Floating Dialogue Speech Balloon (when speaking) */}
          {currentSpeechText && !isExplainingWhiteboard && (
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

            {/* Quick Arabic / English Language Toggle Button for Sara */}
            {onToggleLang && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLang();
                }}
                className="px-1.5 py-0.5 rounded-full bg-white/20 hover:bg-white/35 text-[10px] font-black text-amber-300 border border-amber-300/50 flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-xs"
                title={currentLang === 'ar' ? 'التبديل إلى English' : 'التبديل إلى عربي'}
              >
                <span>🌐</span>
                <span>{currentLang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            )}

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

              {/* Sara Arabic / English Language Toggle Row */}
              {onToggleLang && (
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                  <span className="text-amber-200/80 font-bold">{isRtl ? 'لغة سارة:' : "Sara's Language:"}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLang();
                    }}
                    className="px-2 py-0.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/35 text-amber-300 font-black border border-amber-400/30 flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                    title={isRtl ? 'تبديل لغة سارة إلى الإنجليزية' : 'Switch Sara to Arabic'}
                  >
                    <span>🌐</span>
                    <span>{currentLang === 'ar' ? 'العربية 🇸🇦' : 'English 🇬🇧'}</span>
                  </button>
                </div>
              )}

              {/* Gravity & Physics Interactive Poke Button */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-amber-200/80 font-bold">{isRtl ? 'تفاعل الجاذبية:' : 'Physics Poke:'}</span>
                <button
                  onClick={() => {
                    applyPhysicsImpulse(-0.18, 0.22, (Math.random() - 0.5) * 0.35, 2.5);
                    if (typeof navigator !== 'undefined' && navigator.vibrate) {
                      try { navigator.vibrate(15); } catch (_) {}
                    }
                  }}
                  className="px-2 py-0.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold border border-amber-400/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title={isRtl ? 'اهتزاز وفيزياء الجاذبية' : 'Trigger gravity bounce'}
                >
                  {isRtl ? 'اهتزاز تفاعلي 🎈' : 'Bounce / Jiggle 🎈'}
                </button>
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
