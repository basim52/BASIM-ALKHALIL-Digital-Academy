import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  X, 
  RotateCcw, 
  Trash2, 
  Download, 
  PenTool, 
  Highlighter, 
  Eraser, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Check, 
  Maximize2, 
  Minimize2,
  Palette,
  Camera,
  Layers,
  Wand2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { SaraBoardData } from '../types';
import { playSnapshotShutterSound } from '../lib/audio';

interface SmartWhiteboardProps {
  isOpen: boolean;
  onClose: () => void;
  boardData: SaraBoardData | null;
  isRtl: boolean;
  onSpeak: (text: string) => void;
  onQuizAnswer?: (index: number) => void;
  quizSelectedOption?: number | null;
  quizFeedback?: 'correct' | 'wrong' | null;
}

// ========================================================
// 1. KID-FRIENDLY BACKGROUND THEMES
// ========================================================
export interface WhiteboardTheme {
  id: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  bgHex: string;
  gradientToHex: string;
  borderHex: string;
  headerFrom: string;
  headerVia: string;
  headerTo: string;
  textColor: string;
  textSecondary: string;
  accentHex: string;
  cardBg: string;
  cardBorder: string;
  gridColor: string;
  isLight: boolean;
}

export const WHITEBOARD_THEMES: WhiteboardTheme[] = [
  {
    id: 'green',
    nameAr: 'أخضر مدرسي زمردي',
    nameEn: 'Classroom Green',
    emoji: '🌲',
    bgHex: '#072F2B',
    gradientToHex: '#0D3E39',
    borderHex: '#C49E3A',
    headerFrom: '#1c1810',
    headerVia: '#2d2417',
    headerTo: '#1c1810',
    textColor: 'text-white',
    textSecondary: 'text-amber-100/70',
    accentHex: '#FDE68A',
    cardBg: 'rgba(0, 0, 0, 0.45)',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    gridColor: 'rgba(255, 255, 255, 0.04)',
    isLight: false
  },
  {
    id: 'blue',
    nameAr: 'أزرق فضائي مرح',
    nameEn: 'Cosmic Blue',
    emoji: '🚀',
    bgHex: '#0B2038',
    gradientToHex: '#123154',
    borderHex: '#38BDF8',
    headerFrom: '#0A1828',
    headerVia: '#102742',
    headerTo: '#0A1828',
    textColor: 'text-white',
    textSecondary: 'text-sky-200/80',
    accentHex: '#7DD3FC',
    cardBg: 'rgba(5, 15, 30, 0.55)',
    cardBorder: 'rgba(56, 189, 248, 0.2)',
    gridColor: 'rgba(56, 189, 248, 0.05)',
    isLight: false
  },
  {
    id: 'pink',
    nameAr: 'وردي كاندي مبهج',
    nameEn: 'Candy Pink',
    emoji: '🌸',
    bgHex: '#3D0E25',
    gradientToHex: '#581636',
    borderHex: '#F472B6',
    headerFrom: '#2B0819',
    headerVia: '#3F0D27',
    headerTo: '#2B0819',
    textColor: 'text-white',
    textSecondary: 'text-pink-200/80',
    accentHex: '#FBCFE8',
    cardBg: 'rgba(30, 5, 18, 0.55)',
    cardBorder: 'rgba(244, 114, 182, 0.22)',
    gridColor: 'rgba(244, 114, 182, 0.05)',
    isLight: false
  },
  {
    id: 'purple',
    nameAr: 'بنفسجي سحري',
    nameEn: 'Magic Purple',
    emoji: '🦄',
    bgHex: '#230E3D',
    gradientToHex: '#36155E',
    borderHex: '#C084FC',
    headerFrom: '#18082B',
    headerVia: '#270C46',
    headerTo: '#18082B',
    textColor: 'text-white',
    textSecondary: 'text-purple-200/80',
    accentHex: '#E9D5FF',
    cardBg: 'rgba(20, 5, 35, 0.55)',
    cardBorder: 'rgba(192, 132, 252, 0.22)',
    gridColor: 'rgba(192, 132, 252, 0.05)',
    isLight: false
  },
  {
    id: 'white',
    nameAr: 'سبورة بيضاء مدرسية',
    nameEn: 'Clean Whiteboard',
    emoji: '📄',
    bgHex: '#F8FAFC',
    gradientToHex: '#FFFFFF',
    borderHex: '#0284C7',
    headerFrom: '#0F172A',
    headerVia: '#1E293B',
    headerTo: '#0F172A',
    textColor: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentHex: '#0284C7',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    cardBorder: 'rgba(15, 23, 42, 0.12)',
    gridColor: 'rgba(15, 23, 42, 0.06)',
    isLight: true
  },
  {
    id: 'navy',
    nameAr: 'كحلي ليلي كلاسيكي',
    nameEn: 'Midnight Navy',
    emoji: '🌙',
    bgHex: '#090F1C',
    gradientToHex: '#121C30',
    borderHex: '#E2B857',
    headerFrom: '#050912',
    headerVia: '#0E1729',
    headerTo: '#050912',
    textColor: 'text-white',
    textSecondary: 'text-slate-300',
    accentHex: '#FCD34D',
    cardBg: 'rgba(0, 0, 0, 0.55)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    gridColor: 'rgba(255, 255, 255, 0.03)',
    isLight: false
  },
  {
    id: 'warm',
    nameAr: 'عسلي دافئ',
    nameEn: 'Warm Honey',
    emoji: '🍯',
    bgHex: '#331F08',
    gradientToHex: '#472B0B',
    borderHex: '#F59E0B',
    headerFrom: '#241403',
    headerVia: '#361E06',
    headerTo: '#241403',
    textColor: 'text-white',
    textSecondary: 'text-amber-100/70',
    accentHex: '#FDE68A',
    cardBg: 'rgba(25, 12, 2, 0.55)',
    cardBorder: 'rgba(245, 158, 11, 0.22)',
    gridColor: 'rgba(245, 158, 11, 0.05)',
    isLight: false
  }
];

// ========================================================
// 2. EXPANDED KID-FRIENDLY PEN COLORS
// ========================================================
export interface PenColor {
  name: string;
  value: string;
  labelAr: string;
  labelEn: string;
}

export const SMART_PEN_COLORS: PenColor[] = [
  { name: 'white', value: '#FFFFFF', labelAr: 'أبيض طبشوري', labelEn: 'Chalk White' },
  { name: 'gold', value: '#FACC15', labelAr: 'أصفر شمسي', labelEn: 'Sunny Gold' },
  { name: 'orange', value: '#FB923C', labelAr: 'برتقالي مرح', labelEn: 'Vibrant Orange' },
  { name: 'coral', value: '#F43F5E', labelAr: 'أحمر مرجاني', labelEn: 'Coral Red' },
  { name: 'pink', value: '#F472B6', labelAr: 'وردي حلاوة', labelEn: 'Candy Pink' },
  { name: 'purple', value: '#A855F7', labelAr: 'بنفسجي نيون', labelEn: 'Neon Violet' },
  { name: 'sky', value: '#38BDF8', labelAr: 'أزرق سماوي', labelEn: 'Sky Blue' },
  { name: 'emerald', value: '#34D399', labelAr: 'أخضر نعناعي', labelEn: 'Mint Green' },
  { name: 'black', value: '#1E293B', labelAr: 'فحم أسود', labelEn: 'Charcoal Black' },
  { name: 'brown', value: '#92400E', labelAr: 'بني شوكولاتة', labelEn: 'Chocolate Brown' }
];

export const SmartWhiteboard: React.FC<SmartWhiteboardProps> = ({
  isOpen,
  onClose,
  boardData,
  isRtl,
  onSpeak,
  onQuizAnswer,
  quizSelectedOption,
  quizFeedback
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Whiteboard Appearance State
  const [activeThemeId, setActiveThemeId] = useState<string>('green');
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);
  
  // Drawing Tools State
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'pen' | 'highlighter' | 'glow' | 'eraser'>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#FACC15');
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'draw'>('content');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  
  const dragControls = useDragControls();
  const [positionKey, setPositionKey] = useState(0);

  const currentTheme = WHITEBOARD_THEMES.find(t => t.id === activeThemeId) || WHITEBOARD_THEMES[0];

  // Auto-adapt pen color if user selects white theme and current pen is white
  useEffect(() => {
    if (currentTheme.isLight && selectedColor === '#FFFFFF') {
      setSelectedColor('#1E293B');
    } else if (!currentTheme.isLight && selectedColor === '#1E293B') {
      setSelectedColor('#FACC15');
    }
  }, [activeThemeId]);

  const resetPosition = () => {
    setPositionKey(prev => prev + 1);
  };

  // Resize canvas when opened, tab changed, or window resized
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      const width = Math.max(320, rect.width);
      const height = Math.max(380, rect.height);

      const ctx = canvas.getContext('2d');
      let prevData: ImageData | null = null;
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        try {
          prevData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (e) {}
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (prevData) {
          try {
            ctx.putImageData(prevData, 0, 0);
          } catch (e) {}
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, isMaximized, activeTab]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => [...prev.slice(-12), data]);
    } catch (e) {}
  }, []);

  const undoLastStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop();
    const previous = newHistory[newHistory.length - 1];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (previous) {
      ctx.putImageData(previous, 0, 0);
    }
    setHistory(newHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    setIsDrawing(true);

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (selectedTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = lineWidth * 5;
      ctx.shadowBlur = 0;
    } else if (selectedTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = `${selectedColor}55`; // translucent
      ctx.lineWidth = lineWidth * 4;
      ctx.shadowBlur = 0;
    } else if (selectedTool === 'glow') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = 14;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = lineWidth;
      ctx.shadowBlur = 0;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    ctx.shadowBlur = 0; // reset shadow
  };

  // ========================================================
  // 3. MASTER "SAVE WHITEBOARD AS IMAGE" ENGINE
  // ========================================================
  const saveWhiteboardAsImage = () => {
    try {
      playSnapshotShutterSound();

      const exportWidth = 1200;
      // Calculate dynamic height based on content
      let estimatedHeight = 720;
      if (boardData?.formula) estimatedHeight += 110;
      if (boardData?.sentence) estimatedHeight += 120;
      if (boardData?.correction) estimatedHeight += 90;
      if (boardData?.notes && boardData.notes.length > 0) estimatedHeight += boardData.notes.length * 45 + 50;
      if (boardData?.diagram) estimatedHeight += 140;
      if (boardData?.quiz) estimatedHeight += 140;

      const exportHeight = Math.max(850, estimatedHeight);

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = exportWidth;
      exportCanvas.height = exportHeight;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      // 1. Draw themed background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, exportWidth, exportHeight);
      bgGrad.addColorStop(0, currentTheme.bgHex);
      bgGrad.addColorStop(1, currentTheme.gradientToHex);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, exportWidth, exportHeight);

      // 2. Draw subtle chalkboard/whiteboard grid
      ctx.strokeStyle = currentTheme.gridColor;
      ctx.lineWidth = 1.5;
      for (let x = 0; x < exportWidth; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, exportHeight);
        ctx.stroke();
      }
      for (let y = 0; y < exportHeight; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(exportWidth, y);
        ctx.stroke();
      }

      // 3. Draw elegant outer frame (Brass / Gold / Theme Accent)
      ctx.lineWidth = 14;
      ctx.strokeStyle = currentTheme.borderHex;
      ctx.strokeRect(7, 7, exportWidth - 14, exportHeight - 14);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeRect(16, 16, exportWidth - 32, exportHeight - 32);

      // 4. Header Bar Banner
      ctx.fillStyle = currentTheme.isLight ? '#0F172A' : '#140E06';
      ctx.fillRect(18, 18, exportWidth - 36, 95);

      // Golden line under header
      ctx.fillStyle = currentTheme.borderHex;
      ctx.fillRect(18, 110, exportWidth - 36, 4);

      // Header Texts
      ctx.textAlign = 'right';
      ctx.fillStyle = currentTheme.borderHex;
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillText('أكاديمية باسم الخليل للغة الإنجليزية 🏛️', exportWidth - 50, 52);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 30px system-ui, -apple-system, sans-serif';
      const title = boardData?.title || 'لوحة الشرح التفاعلية مع المعلمة سارة 👩‍🏫';
      ctx.fillText(title, exportWidth - 50, 92);

      // Timestamp & Date
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 15px monospace';
      const now = new Date();
      const dateStr = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
      ctx.fillText(`🗓️ ${dateStr}`, 45, 55);
      ctx.fillStyle = currentTheme.borderHex;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('شرح المعلمة سارة 👩‍🏫', 45, 88);

      // 5. Draw Content Blocks
      let curY = 150;
      const textMainColor = currentTheme.isLight ? '#0F172A' : '#FFFFFF';
      const textSecondaryColor = currentTheme.isLight ? '#334155' : '#CBD5E1';

      // Block A: Grammar Formula (if present)
      if (boardData?.formula) {
        ctx.fillStyle = currentTheme.isLight ? '#EFF6FF' : 'rgba(196, 158, 58, 0.18)';
        ctx.strokeStyle = currentTheme.borderHex;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, 75, 18);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#0369A1' : '#FDE68A';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText('قاعدة وتكوين الجملة 📐', exportWidth - 75, curY + 28);

        ctx.textAlign = 'center';
        ctx.fillStyle = currentTheme.isLight ? '#0F172A' : '#FFFFFF';
        ctx.font = '900 24px monospace';
        ctx.fillText(boardData.formula, exportWidth / 2, curY + 58);

        curY += 95;
      }

      // Block B: Target Sentence Example
      if (boardData?.sentence) {
        ctx.fillStyle = currentTheme.isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.55)';
        ctx.strokeStyle = currentTheme.isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, 95, 20);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#0284C7' : '#FCD34D';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText('الجملة المستهدفة للشرح 🎯', exportWidth - 75, curY + 30);

        ctx.textAlign = 'center';
        ctx.fillStyle = textMainColor;
        ctx.font = '900 26px system-ui, sans-serif';
        ctx.fillText(`"${boardData.sentence}"`, exportWidth / 2, curY + 68);

        curY += 115;
      }

      // Block C: Gentle Correction Card (if present)
      if (boardData?.correction) {
        const cardWidth = exportWidth - 100;
        ctx.fillStyle = currentTheme.isLight ? '#F1F5F9' : 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = currentTheme.isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(50, curY, cardWidth, 70, 16);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillStyle = '#EF4444';
        ctx.fillText(`❌ الخطأ: ${boardData.correction.wrong}`, exportWidth / 2 - 200, curY + 43);

        ctx.fillStyle = currentTheme.borderHex;
        ctx.fillText('➔', exportWidth / 2, curY + 43);

        ctx.fillStyle = '#10B981';
        ctx.fillText(`✅ الصواب: ${boardData.correction.right}`, exportWidth / 2 + 200, curY + 43);

        curY += 90;
      }

      // Block D: Teacher Sara's Golden Explanation Points
      if (boardData?.notes && boardData.notes.length > 0) {
        const notesBoxHeight = 45 + boardData.notes.length * 36;
        ctx.fillStyle = currentTheme.isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.35)';
        ctx.strokeStyle = currentTheme.isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, notesBoxHeight, 20);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#B45309' : '#FCD34D';
        ctx.font = '900 17px system-ui, sans-serif';
        ctx.fillText('نقاط الشرح الذهبية من المعلمة سارة 💡', exportWidth - 75, curY + 30);

        ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillStyle = textSecondaryColor;
        boardData.notes.forEach((note, idx) => {
          const itemY = curY + 62 + idx * 34;
          ctx.fillStyle = currentTheme.borderHex;
          ctx.fillText('✦', exportWidth - 80, itemY);
          ctx.fillStyle = textMainColor;
          ctx.fillText(note, exportWidth - 105, itemY);
        });

        curY += notesBoxHeight + 20;
      }

      // Block E: Vocabulary / Diagram (if present)
      if (boardData?.diagram && boardData.diagram.items.length > 0) {
        ctx.fillStyle = currentTheme.isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.35)';
        ctx.strokeStyle = currentTheme.isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, 95, 20);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#0284C7' : '#38BDF8';
        ctx.font = '900 16px system-ui, sans-serif';
        ctx.fillText(boardData.diagram.label || 'المفردات والتراكيب 🌟', exportWidth - 75, curY + 28);

        const colWidth = (exportWidth - 140) / Math.min(3, boardData.diagram.items.length);
        boardData.diagram.items.slice(0, 3).forEach((item, i) => {
          const colX = exportWidth - 75 - (i * colWidth);
          ctx.textAlign = 'right';
          ctx.fillStyle = textMainColor;
          ctx.font = '900 17px system-ui, sans-serif';
          ctx.fillText(`${item.icon || '📌'} ${item.title}`, colX, curY + 58);
          ctx.fillStyle = textSecondaryColor;
          ctx.font = 'normal 14px system-ui, sans-serif';
          ctx.fillText(item.desc, colX, curY + 80);
        });

        curY += 115;
      }

      // 6. Draw User Chalk Drawings OVERLAY if any exist on canvasRef
      const studentCanvas = canvasRef.current;
      if (studentCanvas && studentCanvas.width > 0 && studentCanvas.height > 0) {
        // If student made drawings on canvas, render them
        if (activeTab === 'draw') {
          // Full drawing mode: scale student canvas to fill content area nicely
          ctx.drawImage(studentCanvas, 50, 140, exportWidth - 100, exportHeight - 220);
        } else {
          // Overlay drawing over notes if present
          ctx.drawImage(studentCanvas, 50, 140, exportWidth - 100, exportHeight - 220);
        }
      }

      // 7. Footer Bar & Motivational Stamp
      ctx.fillStyle = currentTheme.isLight ? '#0F172A' : '#140E06';
      ctx.fillRect(18, exportHeight - 65, exportWidth - 36, 47);

      ctx.textAlign = 'right';
      ctx.fillStyle = currentTheme.borderHex;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('احتفظ بهذه البطاقة للمراجعة والتميز الأكاديمي 🌟🎓', exportWidth - 45, exportHeight - 35);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText('سارة - رفيقتك الذكية لتعلم الإنجليزية 👩‍🏫', 45, exportHeight - 35);

      // 8. Download PNG
      const cleanTitle = (boardData?.title || 'شرح_سارة')
        .replace(/[^\w\u0600-\u06FF\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .slice(0, 30);

      const fileName = `بطاقة_شرح_سارة_${cleanTitle}_${Date.now()}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = exportCanvas.toDataURL('image/png', 1.0);
      link.click();

      // Show friendly confirmation toast
      setSaveSuccessMessage(isRtl ? 'تم حفظ لوحة الشرح كصورة بنجاح! 📸🎉 يمكنك الآن مراجعتها في أي وقت.' : 'Whiteboard image saved successfully! 📸🎉');
      setTimeout(() => {
        setSaveSuccessMessage(null);
      }, 4000);

    } catch (err) {
      console.error('Error saving whiteboard image:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={`smart-whiteboard-${positionKey}-${isMaximized}-${activeThemeId}`}
        drag={!isMaximized}
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.05}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className={`fixed z-50 transition-shadow ${
          isMaximized 
            ? 'inset-2 sm:inset-4' 
            : 'top-14 sm:top-16 inset-x-2 sm:inset-x-auto sm:right-6 sm:w-[740px] max-h-[88vh]'
        } flex flex-col rounded-3xl shadow-2xl overflow-hidden font-sans border-4`}
        style={{
          borderColor: currentTheme.borderHex,
          backgroundColor: currentTheme.bgHex,
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px ${currentTheme.borderHex}44`
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* ======================================================== */}
        {/* SUCCESS TOAST BANNER */}
        {/* ======================================================== */}
        <AnimatePresence>
          {saveSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-14 left-4 right-4 z-60 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-2xl shadow-xl border-2 border-emerald-300 flex items-center justify-between text-xs sm:text-sm font-black"
            >
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-emerald-200 animate-bounce" />
                <span>{saveSuccessMessage}</span>
              </div>
              <button 
                onClick={() => setSaveSuccessMessage(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* TOP WOODEN / BRASS HEADER BAR (DRAGGABLE HANDLE) */}
        {/* ======================================================== */}
        <div 
          onPointerDown={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, input, select, a, textarea')) return;
            dragControls.start(e);
          }}
          className={`bg-gradient-to-r ${currentTheme.headerFrom} ${currentTheme.headerVia} ${currentTheme.headerTo} px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 flex items-center justify-between shrink-0 shadow-md select-none touch-none ${
            !isMaximized ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          style={{ borderColor: `${currentTheme.borderHex}66` }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-slate-900 shadow-inner font-black text-xs sm:text-sm shrink-0"
              style={{ backgroundColor: currentTheme.borderHex }}
            >
              {currentTheme.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 
                  className="text-xs sm:text-base font-black tracking-wide"
                  style={{ color: currentTheme.accentHex }}
                >
                  {isRtl ? 'السبورة الذكية للشرح 📐' : 'Smart Whiteboard 📐'}
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-200/70 font-medium truncate max-w-[180px] sm:max-w-[280px]">
                {boardData?.title || (isRtl ? 'مساحة الشرح والكتابة التفاعلية' : 'Interactive chalkboard notes')}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Theme Picker Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="px-2 sm:px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-black flex items-center gap-1 transition-all cursor-pointer text-amber-200"
                title={isRtl ? 'تغيير ألوان وخلفية السبورة للأطفال' : 'Change Whiteboard Theme'}
              >
                <Palette size={14} />
                <span className="hidden xs:inline">{isRtl ? 'الخلفية' : 'Theme'}</span>
                <span className="text-xs">{currentTheme.emoji}</span>
              </button>

              {/* Theme Picker Dropdown */}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 5 }}
                    className="absolute top-full mt-2 end-0 w-64 bg-[#111827] border-2 border-amber-400/40 rounded-2xl shadow-2xl p-3 z-60 text-white"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-black text-amber-300">
                      <span>{isRtl ? '🎨 اختر خلفية السبورة للأطفال:' : '🎨 Select Whiteboard Theme:'}</span>
                      <button 
                        onClick={() => setShowThemePicker(false)}
                        className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto">
                      {WHITEBOARD_THEMES.map(theme => (
                        <button
                          key={`theme-${theme.id}`}
                          onClick={() => {
                            setActiveThemeId(theme.id);
                            setShowThemePicker(false);
                          }}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeThemeId === theme.id
                              ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{theme.emoji}</span>
                            <span>{isRtl ? theme.nameAr : theme.nameEn}</span>
                          </div>
                          <div 
                            className="w-5 h-5 rounded-full border border-white/40 shadow-inner"
                            style={{ backgroundColor: theme.bgHex }}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Board as Image Button (ALWAYS VISIBLE IN HEADER) */}
            <button
              onClick={saveWhiteboardAsImage}
              className="px-2 sm:px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer active:scale-95"
              title={isRtl ? 'حفظ اللوحة بالكامل كصورة للمراجعة لاحقاً 📸' : 'Save Whiteboard as Image 📸'}
            >
              <Camera size={14} className="text-slate-900" />
              <span className="hidden xs:inline">{isRtl ? 'حفظ اللوحة' : 'Save Image'}</span>
            </button>

            {/* Tab switch (Notes vs Chalk) */}
            <div className="flex bg-black/40 p-0.5 rounded-xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs ${
                  activeTab === 'content'
                    ? 'text-slate-900 shadow-sm font-black'
                    : 'text-amber-100/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'content' ? currentTheme.borderHex : 'transparent'
                }}
              >
                {isRtl ? 'الشرح 📋' : 'Notes 📋'}
              </button>
              <button
                onClick={() => setActiveTab('draw')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs ${
                  activeTab === 'draw'
                    ? 'text-slate-900 shadow-sm font-black'
                    : 'text-amber-100/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'draw' ? currentTheme.borderHex : 'transparent'
                }}
              >
                {isRtl ? 'الطبشور ✍️' : 'Chalk ✍️'}
              </button>
            </div>

            {/* Reset position button */}
            {!isMaximized && (
              <button
                onClick={resetPosition}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200/80 hover:text-amber-200 transition-all cursor-pointer"
                title={isRtl ? 'إعادة للموضع الافتراضي' : 'Reset position'}
              >
                <RotateCcw size={14} />
              </button>
            )}

            {/* Maximize toggle */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200/80 transition-all cursor-pointer"
              title={isMaximized ? (isRtl ? 'تصغير' : 'Minimize') : (isRtl ? 'تكبير كامل الشاشة' : 'Maximize')}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-all cursor-pointer"
              title={isRtl ? 'إغلاق السبورة' : 'Close whiteboard'}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN BOARD CHALKBOARD / WHITEBOARD CANVAS */}
        {/* ======================================================== */}
        <div 
          ref={containerRef}
          className={`flex-1 overflow-y-auto p-4 sm:p-5 relative min-h-[380px] select-none ${currentTheme.textColor}`}
          style={{
            backgroundColor: currentTheme.bgHex,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, ${currentTheme.gradientToHex} 0%, transparent 85%),
              linear-gradient(${currentTheme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${currentTheme.gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 32px 32px, 32px 32px'
          }}
        >
          {/* TAB 1: STRUCTURED CONTENT FROM SARA */}
          {activeTab === 'content' && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Formula Ribbon if available */}
              {boardData?.formula && (
                <div 
                  className="rounded-2xl p-3.5 text-center shadow-inner border-2"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.borderHex
                  }}
                >
                  <span 
                    className="text-[11px] font-black uppercase tracking-wider block mb-1"
                    style={{ color: currentTheme.accentHex }}
                  >
                    {isRtl ? 'قاعدة وتكوين الجملة 📐' : 'Grammar Formula 📐'}
                  </span>
                  <div className="text-base sm:text-xl font-black font-mono tracking-wider flex items-center justify-center flex-wrap gap-2">
                    {boardData.formula.split('+').map((item, idx) => (
                      <React.Fragment key={`formula-${idx}`}>
                        <span 
                          className="px-2.5 py-1 rounded-xl border shadow-sm"
                          style={{
                            backgroundColor: currentTheme.isLight ? '#F1F5F9' : 'rgba(0,0,0,0.5)',
                            borderColor: currentTheme.borderHex,
                            color: currentTheme.isLight ? '#0F172A' : '#FDE68A'
                          }}
                        >
                          {item.trim()}
                        </span>
                        {idx < boardData.formula!.split('+').length - 1 && (
                          <span style={{ color: currentTheme.borderHex }} className="font-bold">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Sentence Display with Glow and Listen button */}
              {boardData?.sentence && (
                <div 
                  className="border-2 rounded-2xl p-4 shadow-xl relative group"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.cardBorder
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span 
                      className="text-[11px] font-black uppercase tracking-wider"
                      style={{ color: currentTheme.accentHex }}
                    >
                      {isRtl ? 'الجملة المستهدفة 🎯' : 'Target Example 🎯'}
                    </span>
                    <button
                      onClick={() => onSpeak(boardData.sentence!)}
                      className="px-2.5 py-1 active:scale-95 text-slate-900 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                      style={{ backgroundColor: currentTheme.borderHex }}
                    >
                      <Volume2 size={14} />
                      <span>{isRtl ? 'استمع للنطق' : 'Pronounce'}</span>
                    </button>
                  </div>

                  <p className={`text-lg sm:text-2xl font-bold tracking-wide text-center leading-relaxed ${currentTheme.textColor}`}>
                    {(() => {
                      const isAwaitingQuiz = !!boardData?.quiz && (quizSelectedOption === null || quizSelectedOption === undefined);
                      const shouldShowHighlight = !isAwaitingQuiz && !!boardData?.highlight;

                      return boardData.sentence.split(shouldShowHighlight ? boardData.highlight! : '___NON_EXISTENT___').map((part, i, arr) => (
                        <React.Fragment key={`sent-piece-${i}`}>
                          <span>{part}</span>
                          {i < arr.length - 1 && shouldShowHighlight && (
                            <span 
                              className="px-2.5 py-1 mx-1.5 rounded-xl font-black shadow-lg animate-pulse inline-block text-slate-950 border border-amber-200"
                              style={{ backgroundColor: currentTheme.borderHex }}
                            >
                              {boardData.highlight}
                            </span>
                          )}
                        </React.Fragment>
                      ));
                    })()}
                  </p>
                </div>
              )}

              {/* Gentle Correction Display if present (hidden during quiz to prevent cheating) */}
              {boardData?.correction && (!boardData.quiz || (quizSelectedOption !== null && quizSelectedOption !== undefined)) && (
                <div 
                  className="border rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-around gap-2 text-xs sm:text-sm"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.cardBorder
                  }}
                >
                  <div className="flex items-center gap-2 text-rose-300 bg-rose-950/60 border border-rose-500/30 px-3.5 py-2 rounded-xl">
                    <XCircle size={16} className="text-rose-400 shrink-0" />
                    <span className="line-through opacity-80 font-bold">{boardData.correction.wrong}</span>
                  </div>
                  <span style={{ color: currentTheme.borderHex }} className="font-black text-lg">➔</span>
                  <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-2 rounded-xl font-black">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{boardData.correction.right}</span>
                  </div>
                </div>
              )}

              {/* Chalk Notes / Bullet points */}
              {boardData?.notes && boardData.notes.length > 0 && (
                <div 
                  className="border rounded-2xl p-4"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.cardBorder
                  }}
                >
                  <h4 
                    className="text-xs font-black mb-2 flex items-center gap-1.5"
                    style={{ color: currentTheme.accentHex }}
                  >
                    <BookOpen size={14} />
                    <span>{isRtl ? 'نقاط الشرح الذهبية 💡' : 'Key Explanation Points 💡'}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium">
                    {boardData.notes.map((note, nIdx) => (
                      <li key={`note-${nIdx}`} className="flex items-start gap-2">
                        <span style={{ color: currentTheme.borderHex }} className="font-black text-sm shrink-0">✦</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Diagram / Vocabulary Cards */}
              {boardData?.diagram && (
                <div 
                  className="border rounded-2xl p-4"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.cardBorder
                  }}
                >
                  <h4 
                    className="text-xs font-black mb-3 flex items-center gap-1.5"
                    style={{ color: currentTheme.accentHex }}
                  >
                    <Sparkles size={14} />
                    <span>{boardData.diagram.label}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {boardData.diagram.items.map((item, dIdx) => (
                      <div 
                        key={`diag-${dIdx}`} 
                        className="border rounded-xl p-3 hover:border-amber-400/50 transition-all"
                        style={{
                          backgroundColor: currentTheme.isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.06)',
                          borderColor: currentTheme.cardBorder
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {item.icon && <span className="text-base">{item.icon}</span>}
                          <span 
                            className="text-sm font-black"
                            style={{ color: currentTheme.accentHex }}
                          >
                            {item.title}
                          </span>
                        </div>
                        <p className={`text-xs ${currentTheme.isLight ? 'text-slate-600' : 'text-slate-300'}`}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Mini-Quiz on the Whiteboard */}
              {boardData?.quiz && (
                <div 
                  className="border-2 rounded-2xl p-4"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: `${currentTheme.borderHex}66`
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="w-6 h-6 rounded-full text-slate-900 font-black text-xs flex items-center justify-center"
                      style={{ backgroundColor: currentTheme.borderHex }}
                    >
                      ?
                    </span>
                    <p 
                      className="text-xs sm:text-sm font-black"
                      style={{ color: currentTheme.accentHex }}
                    >
                      {boardData.quiz.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {boardData.quiz.options.map((opt, oIdx) => {
                      const isSelected = quizSelectedOption === oIdx;
                      const isCorrect = oIdx === boardData.quiz?.answerIndex;

                      let btnClass = 'bg-white/10 border-white/15 text-slate-200 hover:bg-white/20 hover:border-amber-300';
                      if (currentTheme.isLight) {
                        btnClass = 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200';
                      }

                      if (quizSelectedOption !== null && quizSelectedOption !== undefined) {
                        if (isCorrect) {
                          btnClass = 'bg-emerald-600/40 border-emerald-400 text-emerald-200 font-black';
                        } else if (isSelected && !isCorrect) {
                          btnClass = 'bg-rose-600/40 border-rose-400 text-rose-200 line-through';
                        } else {
                          btnClass = 'bg-black/20 border-transparent text-slate-500 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={`wb-opt-${oIdx}`}
                          disabled={quizSelectedOption !== null && quizSelectedOption !== undefined}
                          onClick={() => onQuizAnswer?.(oIdx)}
                          className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {quizSelectedOption !== null && isCorrect && (
                            <Check size={14} className="text-emerald-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizFeedback && (
                    <p className={`text-xs font-black mt-2.5 text-center ${quizFeedback === 'correct' ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {quizFeedback === 'correct' 
                        ? (isRtl ? '🎉 كفو عليك! إجابة صحيحة وممتازة' : '🎉 Excellent! That is correct!')
                        : (isRtl ? '👏 محاولة جيدة! ركز على الخيار الأخضر' : '👏 Good try! Note the green correct option')}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons: Switch to Drawing OR Save Image */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setActiveTab('draw')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black cursor-pointer transition-all active:scale-95"
                  style={{
                    backgroundColor: currentTheme.isLight ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                    borderColor: currentTheme.cardBorder,
                    color: currentTheme.accentHex
                  }}
                >
                  <PenTool size={14} />
                  <span>{isRtl ? 'الرسم والكتابة بالطبشور على السبورة ✍️' : 'Draw or write with chalk ✍️'}</span>
                </button>

                <button
                  onClick={saveWhiteboardAsImage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-950 text-xs font-black cursor-pointer shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: currentTheme.borderHex }}
                >
                  <Camera size={15} />
                  <span>{isRtl ? 'حفظ بطاقة الشرح كصورة لمراجعتها 📸' : 'Save Explanation Card 📸'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE CHALK DRAWING CANVAS */}
          <div className={`${activeTab === 'draw' ? 'block' : 'hidden'} absolute inset-0`}>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair touch-none"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM WOODEN / BRASS TRAY / TOOLBAR FOR DRAWING */}
        {/* ======================================================== */}
        {activeTab === 'draw' && (
          <div 
            className={`bg-gradient-to-r ${currentTheme.headerFrom} ${currentTheme.headerVia} ${currentTheme.headerTo} px-3 sm:px-4 py-2.5 border-t-2 flex items-center justify-between flex-wrap gap-2 shrink-0`}
            style={{ borderColor: `${currentTheme.borderHex}66` }}
          >
            {/* 1. Drawing Tool Selector */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedTool('pen')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  selectedTool === 'pen'
                    ? 'text-slate-900 border-white shadow-sm font-black scale-105'
                    : 'bg-white/5 text-amber-200/80 border-white/10 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: selectedTool === 'pen' ? currentTheme.borderHex : undefined
                }}
                title={isRtl ? 'قلم ذكي / طبشور' : 'Smart Chalk Pen'}
              >
                <PenTool size={15} />
              </button>
              <button
                onClick={() => setSelectedTool('highlighter')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  selectedTool === 'highlighter'
                    ? 'text-slate-900 border-white shadow-sm font-black scale-105'
                    : 'bg-white/5 text-amber-200/80 border-white/10 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: selectedTool === 'highlighter' ? currentTheme.borderHex : undefined
                }}
                title={isRtl ? 'تظليل فسفوري شفاف' : 'Highlighter'}
              >
                <Highlighter size={15} />
              </button>
              <button
                onClick={() => setSelectedTool('glow')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  selectedTool === 'glow'
                    ? 'text-slate-900 border-white shadow-sm font-black scale-105'
                    : 'bg-white/5 text-amber-200/80 border-white/10 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: selectedTool === 'glow' ? currentTheme.borderHex : undefined
                }}
                title={isRtl ? 'قلم النجوم المضيء السحري ✨' : 'Magic Glow Pen ✨'}
              >
                <Wand2 size={15} />
              </button>
              <button
                onClick={() => setSelectedTool('eraser')}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  selectedTool === 'eraser'
                    ? 'text-slate-900 border-white shadow-sm font-black scale-105'
                    : 'bg-white/5 text-amber-200/80 border-white/10 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: selectedTool === 'eraser' ? currentTheme.borderHex : undefined
                }}
                title={isRtl ? 'ممحاة السبورة' : 'Eraser'}
              >
                <Eraser size={15} />
              </button>
            </div>

            {/* 2. Expanded Kid-Friendly Pen Colors */}
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-2xl border border-white/10 overflow-x-auto max-w-[220px] sm:max-w-none">
              {SMART_PEN_COLORS.map(c => {
                const isSelected = selectedColor === c.value && selectedTool !== 'eraser';
                return (
                  <button
                    key={`pen-color-${c.name}`}
                    onClick={() => {
                      setSelectedColor(c.value);
                      if (selectedTool === 'eraser') setSelectedTool('pen');
                    }}
                    style={{ backgroundColor: c.value }}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'border-white scale-125 shadow-lg shadow-amber-300/40 z-10'
                        : 'border-black/50 hover:scale-110 opacity-90'
                    }`}
                    title={isRtl ? c.labelAr : c.labelEn}
                  />
                );
              })}
            </div>

            {/* 3. Stroke Thickness (Fine, Medium, Bold, Jumbo) */}
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl border border-white/10">
              <span className="text-[10px] text-amber-200/70 font-bold hidden sm:inline ml-1">
                {isRtl ? 'الحجم:' : 'Size:'}
              </span>
              {[
                { size: 3, label: 'S' },
                { size: 6, label: 'M' },
                { size: 12, label: 'L' },
                { size: 22, label: 'XL' }
              ].map(({ size, label }) => (
                <button
                  key={`stroke-${size}`}
                  onClick={() => setLineWidth(size)}
                  className={`w-6 h-6 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
                    lineWidth === size 
                      ? 'text-slate-900' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: lineWidth === size ? currentTheme.borderHex : 'transparent'
                  }}
                  title={label === 'XL' ? (isRtl ? 'تلوين عريض للأطفال' : 'Jumbo Coloring') : undefined}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 4. Undo, Clear, and Save Whiteboard as Image */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={undoLastStroke}
                disabled={history.length === 0}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-amber-200/80 border border-white/10 transition-all cursor-pointer"
                title={isRtl ? 'تراجع عن آخر خط' : 'Undo'}
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={clearCanvas}
                className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                title={isRtl ? 'مسح السبورة بالكامل' : 'Clear Whiteboard'}
              >
                <Trash2 size={15} />
              </button>
              <button
                onClick={saveWhiteboardAsImage}
                className="px-2.5 py-1.5 rounded-xl text-slate-950 shadow-md font-black text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                style={{ backgroundColor: currentTheme.borderHex }}
                title={isRtl ? 'حفظ اللوحة بالكامل كصورة لمراجعتها لاحقاً' : 'Save Board as Image'}
              >
                <Camera size={14} className="text-slate-900" />
                <span>{isRtl ? 'حفظ كصورة 📸' : 'Save Image 📸'}</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
