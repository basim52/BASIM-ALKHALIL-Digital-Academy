import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Eraser, 
  RotateCcw, 
  Sparkles, 
  Wand2, 
  Camera, 
  CheckCircle,
  Brain,
  Palette
} from 'lucide-react';

interface DrawingLabProps {
  isRtl: boolean;
  onBack: () => void;
  onComplete: (score: number, total: number) => void;
}

const COLORS = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#000000'
];

export const DrawingLab: React.FC<DrawingLabProps> = ({ isRtl, onBack, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(8);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [targetObject, setTargetObject] = useState('');

  const challenges = [
    { id: 'cat', name: 'Cat', nameAr: 'قطة', icon: '🐱' },
    { id: 'sun', name: 'Sun', nameAr: 'شمس', icon: '☀️' },
    { id: 'tree', name: 'Tree', nameAr: 'شجرة', icon: '🌳' },
    { id: 'house', name: 'House', nameAr: 'منزل', icon: '🏠' },
    { id: 'apple', name: 'Apple', nameAr: 'تفاحة', icon: '🍎' },
  ];

  useEffect(() => {
    // Pick a random challenge
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    setTargetObject(isRtl ? challenge.nameAr : challenge.name);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setAnalysisResult(null);
  };

  const analyzeDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    const dataUrl = canvas.toDataURL('image/png');
    
    try {
      // In a real app, we'd send this to an AI endpoint
      // For now, let's simulate AI analysis with a generic prompt
      const response = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: isRtl 
            ? `أنا طفل رسمت ${targetObject}. هل يمكنك التعليق على رسمي وتشجيعي؟ (باللغة العربية، جملة واحدة مشجعة جداً)`
            : `I am a child who drew a ${targetObject}. Can you comment on my drawing and encourage me? (One encouraging sentence)`,
          context: "Child Creative Lab Analysis"
        })
      });
      const data = await response.json();
      setAnalysisResult(data.text);
      
      // Simulate success
      setTimeout(() => {
        onComplete(100, 100);
      }, 2000);
    } catch (err) {
      setAnalysisResult(isRtl ? "رسم رائع جداً! أنت فنان حقيقي." : "Amazing drawing! You are a true artist.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>

        <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-black text-[#002147] flex items-center gap-2">
                <Palette className="text-pink-500" />
                {isRtl ? 'مختبر الإبداع' : 'Creative Lab'}
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                {isRtl ? 'ارسم ما تراه لتصبح فناناً' : 'DRAW TO BECOME AN ARTIST'}
            </p>
        </div>

        <div className="w-12 h-12 opacity-0" />
      </header>

      <main className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Toolbar */}
        <div className="lg:col-span-2 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            <div className="bg-white p-6 rounded-[2rem] shadow-xl border-4 border-slate-50 space-y-6 shrink-0 w-44 lg:w-full">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{isRtl ? 'الألوان' : 'COLORS'}</p>
                <div className="grid grid-cols-3 gap-3">
                   {COLORS.map((c, idx) => (
                     <button 
                        key={`color-${c}-${idx}`}
                        onClick={() => { setColor(c); setTool('pen'); }}
                        className={`w-8 h-8 rounded-full shadow-inner transition-transform ${color === c && tool === 'pen' ? 'scale-125 ring-4 ring-slate-100' : 'hover:scale-110'}`}
                        style={{ backgroundColor: c }}
                     />
                   ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-xl border-4 border-slate-50 space-y-4 shrink-0 w-44 lg:w-full">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{isRtl ? 'الأدوات' : 'TOOLS'}</p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => setTool('pen')}
                        className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${tool === 'pen' ? 'bg-[#002147] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                        <Wand2 size={20} />
                        <span className="font-bold text-sm">{isRtl ? 'قلم' : 'Pen'}</span>
                    </button>
                    <button 
                        onClick={() => setTool('eraser')}
                        className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${tool === 'eraser' ? 'bg-[#002147] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    >
                        <Eraser size={20} />
                        <span className="font-bold text-sm">{isRtl ? 'ممحاة' : 'Eraser'}</span>
                    </button>
                    <button 
                        onClick={clearCanvas}
                        className="p-4 rounded-2xl flex items-center gap-3 bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                    >
                        <RotateCcw size={20} />
                        <span className="font-bold text-sm">{isRtl ? 'مسح' : 'Reset'}</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] shadow-2xl p-4 md:p-8 border-8 border-slate-100 relative group overflow-hidden">
                <div className="absolute top-6 left-6 z-10 bg-yellow-400 text-[#002147] px-6 py-2 rounded-full font-black text-xs md:text-sm shadow-xl flex items-center gap-2">
                    <Sparkles size={16} />
                    {isRtl ? `ارسم: ${targetObject}` : `Draw: ${targetObject}`}
                </div>
                
                <canvas 
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                    className="w-full h-auto bg-white rounded-2xl cursor-crosshair touch-none"
                />
            </div>
        </div>

        {/* AI Sidebar */}
        <div className="lg:col-span-3 space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                        <Brain className="text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-2">{isRtl ? 'ذكاء باسل الفني' : "Basil's Art Eye"}</h3>
                    <p className="text-indigo-100 text-sm font-bold leading-relaxed mb-6">
                        {isRtl ? 'عندما تنتهي من رسمك الجميل، اضغط على زر التحليل لأخبرك برأيي فيه!' : 'When you finish your beautiful drawing, click analyze and I will tell you what I think!'}
                    </p>
                    <button 
                        onClick={analyzeDrawing}
                        disabled={isAnalyzing}
                        className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-yellow-400 hover:text-yellow-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? (
                           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                             <Camera size={24} />
                           </motion.div>
                        ) : (
                          <Sparkles size={24} />
                        )}
                        {isAnalyzing ? (isRtl ? 'جاري الفحص...' : 'Analyzing...') : (isRtl ? 'افحص رسمي' : 'Analyze My Art')}
                    </button>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                    <Wand2 size={180} />
                </div>
            </div>

            <AnimatePresence>
                {analysisResult && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white p-8 rounded-[2.5rem] border-4 border-emerald-400 shadow-2xl relative"
                  >
                     <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle />
                     </div>
                     <p className="text-lg font-bold text-[#002147] leading-relaxed italic">
                        "{analysisResult}"
                     </p>
                  </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
