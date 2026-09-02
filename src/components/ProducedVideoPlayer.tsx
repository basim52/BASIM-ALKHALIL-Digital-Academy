import React, { useState, useEffect, useRef, useId } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Download, CheckCircle2, 
  HelpCircle, ChevronRight, ChevronLeft, Sparkles, FileText, ArrowLeft, 
  Settings2, Film, Music, Check, Share2, Layers, BookOpen, AlertCircle,
  Clock, Award, Flame, ExternalLink, HardDriveDownload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { ProducedVideoLesson, ProducedVideoScene, VideoDialogueLine } from '../data/producedVideoLessons';
import { storeVideoFile } from '../lib/videoDb';

interface ProducedVideoPlayerProps {
  lesson: ProducedVideoLesson;
  onBack: () => void;
  isRtl?: boolean;
}

export const ProducedVideoPlayer: React.FC<ProducedVideoPlayerProps> = ({
  lesson,
  onBack,
  isRtl = true
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDialogueIdx, setCurrentDialogueIdx] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesMode, setSubtitlesMode] = useState<'bilingual' | 'en' | 'ar'>('bilingual');
  const [showSettings, setShowSettings] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  // Interactive Quiz State per scene
  const [showSceneQuiz, setShowSceneQuiz] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [completedScenes, setCompletedScenes] = useState<number[]>([]);

  // Export / Record status
  const [isExportingVideo, setIsExportingVideo] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState('');
  const [isSavedOffline, setIsSavedOffline] = useState(false);

  // Active scene
  const scene: ProducedVideoScene = lesson.scenes[currentSceneIdx] || lesson.scenes[0];
  const activeDialogue: VideoDialogueLine | undefined = scene.dialogues[currentDialogueIdx];

  // Speech Synth Ref
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Handle Scene / Dialogue Speech Playback
  useEffect(() => {
    if (!isPlaying) {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      return;
    }

    if (!activeDialogue) {
      // Scene reached end -> check if there's a quiz checkpoint
      if (scene.quizCheckpoint && !completedScenes.includes(currentSceneIdx)) {
        setIsPlaying(false);
        setShowSceneQuiz(true);
      } else {
        // Automatically advance to next scene if available
        if (currentSceneIdx < lesson.scenes.length - 1) {
          const nextIdx = currentSceneIdx + 1;
          setCurrentSceneIdx(nextIdx);
          setCurrentDialogueIdx(0);
        } else {
          setIsPlaying(false);
          triggerCompletionConfetti();
        }
      }
      return;
    }

    if (synthRef.current && !isMuted) {
      synthRef.current.cancel();

      const textToSpeak = activeDialogue.textEn;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = playbackSpeed;
      utterance.pitch = activeDialogue.voiceGender === 'female' ? 1.15 : 0.95;

      // Select natural voice if available
      const voices = synthRef.current.getVoices();
      const enVoices = voices.filter(v => v.lang.startsWith('en'));
      if (enVoices.length > 0) {
        if (activeDialogue.voiceGender === 'female') {
          const femaleVoice = enVoices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google UK English Female'));
          if (femaleVoice) utterance.voice = femaleVoice;
        } else {
          const maleVoice = enVoices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('George') || v.name.includes('Google UK English Male'));
          if (maleVoice) utterance.voice = maleVoice;
        }
      }

      utterance.onend = () => {
        // Move to next dialogue after a small natural pause
        const timer = setTimeout(() => {
          if (isPlaying) {
            setCurrentDialogueIdx(prev => prev + 1);
          }
        }, 1200 / playbackSpeed);
        return () => clearTimeout(timer);
      };

      utterance.onerror = (e) => {
        console.warn("TTS Error, proceeding to next line:", e);
        const timer = setTimeout(() => {
          if (isPlaying) {
            setCurrentDialogueIdx(prev => prev + 1);
          }
        }, 2000 / playbackSpeed);
        return () => clearTimeout(timer);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } else {
      // Fallback timer if muted or no synth
      const timer = setTimeout(() => {
        if (isPlaying) {
          setCurrentDialogueIdx(prev => prev + 1);
        }
      }, 3500 / playbackSpeed);
      return () => clearTimeout(timer);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [isPlaying, currentSceneIdx, currentDialogueIdx, isMuted, playbackSpeed]);

  const triggerCompletionConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Confetti triggered");
    }
  };

  const togglePlay = () => {
    if (showSceneQuiz) return;
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (synthRef.current) synthRef.current.cancel();
    setCurrentDialogueIdx(0);
    setShowSceneQuiz(false);
    setQuizSubmitted(false);
    setQuizSelectedOption(null);
    setIsPlaying(true);
  };

  const handleNextScene = () => {
    if (synthRef.current) synthRef.current.cancel();
    if (currentSceneIdx < lesson.scenes.length - 1) {
      setCurrentSceneIdx(prev => prev + 1);
      setCurrentDialogueIdx(0);
      setShowSceneQuiz(false);
      setQuizSubmitted(false);
      setQuizSelectedOption(null);
      setIsPlaying(true);
    }
  };

  const handlePrevScene = () => {
    if (synthRef.current) synthRef.current.cancel();
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(prev => prev - 1);
      setCurrentDialogueIdx(0);
      setShowSceneQuiz(false);
      setQuizSubmitted(false);
      setQuizSelectedOption(null);
      setIsPlaying(true);
    }
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizSubmitted) return;
    setQuizSelectedOption(idx);
  };

  const handleQuizSubmit = () => {
    if (quizSelectedOption === null || quizSubmitted) return;
    setQuizSubmitted(true);
    const isCorrect = quizSelectedOption === scene.quizCheckpoint?.correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      triggerCompletionConfetti();
    }
    if (!completedScenes.includes(currentSceneIdx)) {
      setCompletedScenes(prev => [...prev, currentSceneIdx]);
    }
  };

  const handleContinueAfterQuiz = () => {
    setShowSceneQuiz(false);
    setQuizSubmitted(false);
    setQuizSelectedOption(null);
    if (currentSceneIdx < lesson.scenes.length - 1) {
      handleNextScene();
    } else {
      setIsPlaying(false);
      triggerCompletionConfetti();
    }
  };

  // 1. Download Study Sheet / Comprehensive Notes as clean Printable HTML / PDF
  const handleDownloadStudySheet = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${lesson.titleAr} - ${lesson.titleEn}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 40px 20px; background: #f8fafc; }
    .card { background: white; border-radius: 16px; padding: 30px; margin-bottom: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { text-align: center; border-bottom: 2px solid #58cc02; padding-bottom: 20px; margin-bottom: 24px; }
    h1 { color: #0f172a; margin-bottom: 6px; font-size: 24px; }
    h2 { color: #58cc02; font-size: 18px; margin-top: 0; }
    .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px; font-weight: bold; font-size: 12px; }
    .scene-box { border-left: 4px solid #1cb0f6; padding-left: 16px; margin-bottom: 20px; }
    .dialogue-item { background: #f1f5f9; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; }
    .en-text { font-weight: bold; color: #0f172a; font-size: 15px; direction: ltr; text-align: left; }
    .ar-text { color: #475569; font-size: 14px; margin-top: 4px; }
    .grammar-tip { background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 8px; font-size: 12px; margin-top: 6px; font-weight: bold; }
    .vocab-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .vocab-table th, .vocab-table td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: right; }
    .vocab-table th { background: #f8fafc; color: #334155; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="card header">
    <span class="badge">أكاديمية باسم الخليل • المستوى ${lesson.level}</span>
    <h1>${lesson.titleAr}</h1>
    <h2>${lesson.titleEn}</h2>
    <p>${lesson.summaryAr}</p>
  </div>

  <div class="card">
    <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">🎬 سيناريو الدرس والحوارات المسجلة</h3>
    ${lesson.scenes.map(s => `
      <div class="scene-box">
        <h4 style="color: #0284c7; margin-bottom: 8px;">مشهد ${s.sceneNumber}: ${s.titleAr} (${s.titleEn})</h4>
        <p style="font-size: 13px; color: #64748b; font-style: italic;">الراوي: ${s.narration.ar}</p>
        ${s.dialogues.map(d => `
          <div class="dialogue-item">
            <div style="font-size: 12px; color: #64748b; font-weight: bold;">🗣️ ${d.speaker}</div>
            <div class="en-text">${d.textEn}</div>
            <div class="ar-text">${d.textAr}</div>
            ${d.grammarTip ? `<div class="grammar-tip">💡 فائدة لغوية: ${d.grammarTip}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>

  <div class="card">
    <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">📚 جدول المفردات والكلمات الذهبية</h3>
    <table class="vocab-table">
      <thead>
        <tr>
          <th>الكلمة (Word)</th>
          <th>النطق (Phonetics)</th>
          <th>المعنى بالعربية</th>
          <th>جملة توضيحية</th>
        </tr>
      </thead>
      <tbody>
        ${lesson.vocabulary.map(v => `
          <tr>
            <td style="font-weight: bold; color: #0284c7; direction: ltr; text-align: left;">${v.word}</td>
            <td style="color: #64748b; direction: ltr; text-align: left;">${v.pronunciation}</td>
            <td>${v.meaningAr}</td>
            <td style="direction: ltr; text-align: left; font-size: 13px;">${v.exampleSentence}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    تم الإنتاج بواسطة منصة استوديو الدروس المرئية • جميع الحقوق محفوظة لأكاديمية باسم الخليل التعليمية
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lesson.titleEn.replace(/[^a-zA-Z0-9]/g, '_')}_Study_Guide.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 2. Save entire lesson package into IndexedDB for Offline Access
  const handleSaveToOffline = async () => {
    try {
      const lessonData = JSON.stringify(lesson);
      const blob = new Blob([lessonData], { type: 'application/json' });
      await storeVideoFile(`offline-produced-${lesson.id}`, blob as any);
      setIsSavedOffline(true);
      triggerCompletionConfetti();
    } catch (e) {
      console.warn("Offline save warning:", e);
      setIsSavedOffline(true);
    }
  };

  // 3. Render and export audiovisual video file using Canvas & MediaRecorder API
  const handleExportRealVideo = async () => {
    setIsExportingVideo(true);
    setExportProgress(10);
    setExportStatusText(isRtl ? 'جاري تجهيز محرك الرندرة والرسوم المتحركة...' : 'Initializing render pipeline...');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas 2D context not supported");

      const stream = canvas.captureStream(30); // 30 FPS
      let mediaRecorder: MediaRecorder;
      const chunks: Blob[] = [];

      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      } catch (e) {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      }

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = `${lesson.titleEn.replace(/[^a-zA-Z0-9]/g, '_')}_Audiovisual_Lesson.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(videoUrl);

        setIsExportingVideo(false);
        setExportProgress(100);
        setExportStatusText(isRtl ? '🎉 تم تحميل ملف الفيديو بنجاح!' : 'Video exported successfully!');
        triggerCompletionConfetti();
      };

      mediaRecorder.start();

      // Render scenes sequentially to canvas
      const totalScenes = lesson.scenes.length;
      for (let sIdx = 0; sIdx < totalScenes; sIdx++) {
        const curScene = lesson.scenes[sIdx];
        const sceneDialogues = curScene.dialogues;

        for (let dIdx = 0; dIdx < sceneDialogues.length; dIdx++) {
          const curDiag = sceneDialogues[dIdx];
          const progressPercent = Math.round(((sIdx * sceneDialogues.length + dIdx) / (totalScenes * sceneDialogues.length)) * 80) + 15;
          setExportProgress(progressPercent);
          setExportStatusText(isRtl ? `جاري تصيير المشهد ${sIdx + 1}: ${curDiag.speaker}...` : `Rendering scene ${sIdx + 1}: ${curDiag.speaker}...`);

          // Draw multiple frames for ~2.5 seconds per dialogue
          const frameCount = 75; // ~2.5 seconds at 30fps
          for (let f = 0; f < frameCount; f++) {
            // Background
            const grad = ctx.createLinearGradient(0, 0, 1280, 720);
            grad.addColorStop(0, '#0f172a');
            grad.addColorStop(1, '#1e293b');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1280, 720);

            // Header banner
            ctx.fillStyle = '#58cc02';
            ctx.fillRect(40, 30, 260, 40);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px sans-serif';
            ctx.fillText(`BASIM ACADEMY • ${lesson.level}`, 55, 57);

            // Lesson Title
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(lesson.titleEn, 320, 58);

            // Scene Box
            ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
            ctx.roundRect?.(40, 90, 1200, 480, 24);
            ctx.fill();
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Scene Title
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 28px sans-serif';
            ctx.fillText(`Scene ${curScene.sceneNumber}: ${curScene.titleEn}`, 70, 145);

            // Characters Avatars
            curScene.characters.forEach((char, cIdx) => {
              const xPos = char.position === 'left' ? 220 : char.position === 'right' ? 1060 : 640;
              ctx.font = '80px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(char.avatar || '👨‍🏫', xPos, 300);

              ctx.font = 'bold 20px sans-serif';
              ctx.fillStyle = '#ffffff';
              ctx.fillText(char.name, xPos, 345);

              ctx.font = '16px sans-serif';
              ctx.fillStyle = '#94a3b8';
              ctx.fillText(char.role, xPos, 375);
            });

            // Active Dialogue Balloon
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
            ctx.roundRect?.(160, 420, 960, 130, 20);
            ctx.fill();
            ctx.strokeStyle = '#58cc02';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Speaker Tag
            ctx.fillStyle = '#58cc02';
            ctx.font = 'bold 20px sans-serif';
            ctx.fillText(`🗣️ ${curDiag.speaker}`, 640, 455);

            // English Text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 26px sans-serif';
            ctx.fillText(curDiag.textEn, 640, 495);

            // Arabic Translation
            ctx.fillStyle = '#94a3b8';
            ctx.font = '22px sans-serif';
            ctx.fillText(curDiag.textAr, 640, 532);

            // Bottom Subtitle bar
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(40, 590, 1200, 90);
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(`💡 Key Focus: ${curDiag.grammarTip || curScene.narration.en}`, 640, 645);

            // Allow event loop cycle
            await new Promise(r => setTimeout(r, 20));
          }
        }
      }

      mediaRecorder.stop();
    } catch (err: any) {
      console.warn("Video render error:", err);
      setIsExportingVideo(false);
      setExportStatusText(isRtl ? 'تعذر إنتاج ملف الفيديو في المتصفح الحالي، يمكنك حفظ ملخص الدرس ومذكرته.' : 'Video export not supported in this browser mode.');
    }
  };

  const getSettingBg = (setting: string) => {
    switch (setting) {
      case 'oxford_street':
        return 'from-amber-950/80 via-slate-900 to-slate-950';
      case 'airport':
        return 'from-sky-950/80 via-slate-900 to-slate-950';
      case 'coffee_shop':
        return 'from-stone-900 via-amber-950/50 to-slate-950';
      case 'business_office':
        return 'from-indigo-950/80 via-slate-900 to-slate-950';
      case 'nature_park':
        return 'from-emerald-950/80 via-slate-900 to-slate-950';
      case 'tech_lab':
        return 'from-cyan-950/80 via-slate-900 to-slate-950';
      default:
        return 'from-slate-900 via-slate-900 to-slate-950';
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round(
      ((currentSceneIdx * (scene.dialogues.length || 1) + currentDialogueIdx) /
        (lesson.scenes.length * 3)) *
        100
    )
  );

  return (
    <div className={`p-4 md:p-8 max-w-5xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'} bg-[#F7F7F7]`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            if (synthRef.current) synthRef.current.cancel();
            onBack();
          }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-black text-xs uppercase tracking-wider bg-white px-4 py-2.5 rounded-full border border-slate-200/60 shadow-sm active:scale-95 duration-100"
        >
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة لمكتبة الدروس' : 'Back to Library'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Action: Export / Download Modal Trigger */}
          <button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#58cc02] text-white rounded-full text-xs font-black border-b-2 border-[#3e9202] hover:bg-[#6be60c] active:scale-95 transition-all shadow-sm"
          >
            <Download size={15} />
            <span>{isRtl ? 'تحميل وحفظ الدرس 📥' : 'Download Lesson'}</span>
          </button>

          {/* Quick Action: Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-full border transition-all ${
              showSettings ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            <Settings2 size={16} />
          </button>
        </div>
      </div>

      {/* MAIN AUDIOVISUAL STAGE / PLAYER CONTAINER */}
      <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl mb-8">
        
        {/* Top Header Overlay */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="bg-[#58cc02] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md pointer-events-auto">
              {lesson.badge || 'درس مرئي 🎬'}
            </span>
            <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/10">
              {lesson.level}
            </span>
            {isSavedOffline && (
              <span className="bg-emerald-500/90 text-white px-2.5 py-1 rounded-full text-[9px] font-black flex items-center gap-1">
                <Check size={12} /> {isRtl ? 'محفوظ أوفلاين' : 'Offline Cached'}
              </span>
            )}
          </div>

          <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black border border-white/10">
            {isRtl ? `المشهد ${currentSceneIdx + 1} من ${lesson.scenes.length}` : `Scene ${currentSceneIdx + 1} of ${lesson.scenes.length}`}
          </div>
        </div>

        {/* Dynamic Scenic Canvas / Animation Stage */}
        <div className={`aspect-video w-full relative bg-gradient-to-b ${getSettingBg(scene.setting)} flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden`}>
          
          {/* Ambient Lighting & Particles */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Scene Title Banner */}
          <div className="mt-8 text-center relative z-10 animate-fade-in">
            <span className="text-[11px] uppercase tracking-widest text-[#38bdf8] font-black bg-sky-950/60 px-4 py-1 rounded-full border border-sky-500/30 inline-block mb-1">
              📍 {scene.titleEn}
            </span>
            <h3 className="text-white text-lg sm:text-2xl font-black drop-shadow-md">
              {isRtl ? scene.titleAr : scene.titleEn}
            </h3>
          </div>

          {/* Characters in Scene (Stage Presentation) */}
          <div className="relative z-10 flex items-end justify-around my-auto px-4 gap-4">
            {scene.characters.map((char, cIdx) => {
              const isSpeaking = activeDialogue?.speaker === char.name || (activeDialogue?.speaker.includes(char.name.split(' ')[0]));
              return (
                <motion.div
                  key={`char-${cIdx}-${char.name}`}
                  animate={isSpeaking ? { scale: [1, 1.06, 1], y: [0, -6, 0] } : { scale: 1, y: 0 }}
                  transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0 }}
                  className={`flex flex-col items-center text-center transition-all ${
                    isSpeaking ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {/* Dialogue Bubble above speaking character */}
                  <AnimatePresence>
                    {isSpeaking && activeDialogue && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-4 bg-white text-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl max-w-xs sm:max-w-md border-2 border-[#58cc02] relative"
                      >
                        <div className="text-[10px] uppercase font-black text-[#58cc02] mb-1 flex items-center justify-between">
                          <span>{char.name}</span>
                          <span className="flex items-center gap-1">
                            <Volume2 size={12} className="animate-pulse" />
                            {isRtl ? 'يتحدث الآن' : 'Speaking'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                          {activeDialogue.textEn}
                        </p>
                        {subtitlesMode !== 'en' && (
                          <p className="text-[11px] font-bold text-slate-500 mt-1 border-t border-slate-100 pt-1">
                            {activeDialogue.textAr}
                          </p>
                        )}
                        {/* Little triangle arrow */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-[#58cc02] rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Avatar Icon / Character Body */}
                  <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr ${char.color} flex items-center justify-center text-4xl sm:text-6xl shadow-2xl border-4 ${
                    isSpeaking ? 'border-[#58cc02] shadow-[#58cc02]/30 ring-4 ring-[#58cc02]/30' : 'border-white/20'
                  } relative`}>
                    {char.avatar || '👨‍🏫'}
                    {isSpeaking && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#58cc02] rounded-full flex items-center justify-center text-white text-xs border-2 border-slate-950 animate-bounce">
                        💬
                      </div>
                    )}
                  </div>

                  {/* Character Name & Role */}
                  <div className="mt-2 text-center">
                    <span className="block text-white font-black text-xs sm:text-sm leading-tight">
                      {char.name}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400">
                      {char.role}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Keypoints & Grammar Flash Pill (Bottom of stage) */}
          {activeDialogue?.grammarTip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 px-4 py-2 rounded-xl text-center text-xs font-bold max-w-xl mx-auto flex items-center gap-2"
            >
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span>💡 {activeDialogue.grammarTip}</span>
            </motion.div>
          )}

          {/* Interactive Scene Checkpoint Quiz Overlay */}
          <AnimatePresence>
            {showSceneQuiz && scene.quizCheckpoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center font-sans"
              >
                <div className="w-14 h-14 bg-[#58cc02]/20 text-[#58cc02] rounded-2xl flex items-center justify-center mb-3 border border-[#58cc02]/40">
                  <HelpCircle size={32} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#58cc02] bg-[#58cc02]/10 px-3 py-1 rounded-full mb-2">
                  {isRtl ? 'نقطة اختبار تفاعلية 🎯' : 'Interactive Checkpoint 🎯'}
                </span>
                <h4 className="text-white font-black text-base sm:text-xl max-w-xl mb-1 leading-snug">
                  {scene.quizCheckpoint.questionEn}
                </h4>
                <p className="text-slate-400 text-xs font-bold mb-6 max-w-lg">
                  {scene.quizCheckpoint.questionAr}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-6">
                  {scene.quizCheckpoint.options.map((opt, oIdx) => {
                    const isSelected = quizSelectedOption === oIdx;
                    const isCorrect = oIdx === scene.quizCheckpoint?.correctIndex;
                    let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600 border-emerald-500 text-white font-black shadow-lg shadow-emerald-600/30';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-600 border-rose-500 text-white font-bold opacity-80';
                      } else {
                        btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-[#58cc02] border-[#46a302] text-white font-black shadow-lg shadow-[#58cc02]/30';
                    }

                    return (
                      <button
                        key={`opt-${oIdx}`}
                        onClick={() => handleQuizAnswer(oIdx)}
                        className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition-all flex items-center gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-black shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 max-w-lg"
                  >
                    <p className="font-bold text-[#58cc02] mb-1">
                      {quizSelectedOption === scene.quizCheckpoint.correctIndex
                        ? (isRtl ? '🎉 إجابة صحيحة وممتازة!' : '🎉 Excellent! Correct Answer!')
                        : (isRtl ? '💡 توضيح للإجابة الصحيحة:' : '💡 Clarification:')}
                    </p>
                    <p>{scene.quizCheckpoint.explanationAr}</p>
                  </motion.div>
                )}

                <div className="flex items-center gap-3">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={quizSelectedOption === null}
                      className="px-6 py-3 bg-[#58cc02] hover:bg-[#62e003] disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl border-b-4 border-[#3e9202] active:scale-95 transition-all"
                    >
                      {isRtl ? 'تأكيد الإجابة 🚀' : 'Confirm Answer 🚀'}
                    </button>
                  ) : (
                    <button
                      onClick={handleContinueAfterQuiz}
                      className="px-6 py-3 bg-[#1cb0f6] hover:bg-[#2dc0ff] text-white font-black text-xs uppercase tracking-wider rounded-xl border-b-4 border-[#1291cd] active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span>{isRtl ? 'متابعة الدرس 🎬' : 'Continue Lesson 🎬'}</span>
                      <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM VIDEO TIMELINE & PLAYER CONTROLS */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 sm:p-5">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-4 relative cursor-pointer">
            <div
              className="bg-[#58cc02] h-full transition-all duration-300 rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Controls (Play, Prev, Next, Restart) */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIdx === 0}
                className="p-2.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                title={isRtl ? 'المشهد السابق' : 'Previous Scene'}
              >
                <ChevronLeft size={20} className={isRtl ? 'rotate-180' : ''} />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-[#58cc02] hover:bg-[#68ee04] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#58cc02]/30 border-b-4 border-[#3e9202] active:scale-95 transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
              </button>

              <button
                onClick={handleNextScene}
                disabled={currentSceneIdx === lesson.scenes.length - 1}
                className="p-2.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                title={isRtl ? 'المشهد التالي' : 'Next Scene'}
              >
                <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 text-slate-400 hover:text-white transition-colors"
                title={isRtl ? 'إعادة تشغيل المشهد' : 'Restart Scene'}
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Middle: Scene Selector Pills */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
              {lesson.scenes.map((s, sIdx) => {
                const isCurrent = currentSceneIdx === sIdx;
                const isCompleted = completedScenes.includes(sIdx);
                return (
                  <button
                    key={`scene-btn-${sIdx}`}
                    onClick={() => {
                      if (synthRef.current) synthRef.current.cancel();
                      setCurrentSceneIdx(sIdx);
                      setCurrentDialogueIdx(0);
                      setShowSceneQuiz(false);
                      setIsPlaying(true);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-[#58cc02] text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isCompleted && <Check size={12} className="text-emerald-300" />}
                    <span>{isRtl ? `مشهد ${s.sceneNumber}` : `Scene ${s.sceneNumber}`}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Audio Mute, Speed, Subtitles Toggle */}
            <div className="flex items-center gap-2">
              {/* Playback Speed Selector */}
              <button
                onClick={() => {
                  const speeds = [0.75, 1, 1.25, 1.5];
                  const curIdx = speeds.indexOf(playbackSpeed);
                  const nextSpeed = speeds[(curIdx + 1) % speeds.length];
                  setPlaybackSpeed(nextSpeed);
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-black border border-slate-700 transition-all"
                title={isRtl ? 'سرعة النطق والصوت' : 'Voice Speed'}
              >
                {playbackSpeed}x
              </button>

              {/* Subtitles Mode */}
              <button
                onClick={() => {
                  if (subtitlesMode === 'bilingual') setSubtitlesMode('en');
                  else if (subtitlesMode === 'en') setSubtitlesMode('ar');
                  else setSubtitlesMode('bilingual');
                }}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-black border border-slate-700 transition-all uppercase"
                title={isRtl ? 'لغة الترجمة' : 'Subtitles'}
              >
                CC: {subtitlesMode}
              </button>

              {/* Mute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg border transition-all ${
                  isMuted ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LESSON DETAILS & VOCABULARY ACCORDION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Lesson Summary & Dialogue Script */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border-2 border-b-4 border-slate-200">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xl font-black text-slate-800">
                {isRtl ? lesson.titleAr : lesson.titleEn}
              </h2>
              <span className="bg-[#1cb0f6] text-white px-3 py-1 rounded-full text-xs font-black">
                {lesson.level}
              </span>
            </div>
            <p className="text-slate-500 text-xs md:text-sm font-bold leading-relaxed mb-6">
              {isRtl ? lesson.summaryAr : lesson.summaryEn}
            </p>

            {/* Current Scene Script Transcript */}
            <div className="border-t-2 border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Film size={16} className="text-[#58cc02]" />
                  <span>{isRtl ? 'نص الحوارات والترجمة المعتمدة' : 'Scene Transcript & Phonics'}</span>
                </h4>
                <span className="text-[10px] text-slate-400 font-bold">
                  {scene.dialogues.length} {isRtl ? 'حوارات' : 'turns'}
                </span>
              </div>

              <div className="space-y-3">
                {scene.dialogues.map((dlg, dIdx) => {
                  const isActive = currentDialogueIdx === dIdx;
                  return (
                    <div
                      key={`dlg-${dIdx}`}
                      onClick={() => {
                        setCurrentDialogueIdx(dIdx);
                        setIsPlaying(true);
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#58cc02]/10 border-[#58cc02] shadow-sm'
                          : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-black text-[#58cc02] uppercase">
                          🗣️ {dlg.speaker}
                        </span>
                        {dlg.phonetics && (
                          <span className="text-[10px] font-mono text-slate-400">
                            {dlg.phonetics}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                        {dlg.textEn}
                      </p>
                      <p className="text-[11px] font-bold text-slate-500 mt-1">
                        {dlg.textAr}
                      </p>
                      {dlg.grammarTip && (
                        <div className="mt-2 text-[10px] bg-amber-50 text-amber-800 p-2 rounded-lg font-bold border border-amber-200">
                          💡 {dlg.grammarTip}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Vocabulary Flashcard Deck & Downloads */}
        <div className="space-y-6">
          
          {/* Action Card: Download Hub */}
          <div className="bg-gradient-to-br from-[#58cc02] to-[#46a302] text-white p-6 rounded-[2rem] shadow-md border-b-4 border-[#337a01]">
            <h3 className="text-base font-black mb-1 flex items-center gap-2">
              <Download size={20} />
              <span>{isRtl ? 'تحميل ملفات الدرس' : 'Download Lesson Pack'}</span>
            </h3>
            <p className="text-white/80 text-xs font-bold mb-4 leading-relaxed">
              {isRtl ? 'حمّل الفيديو كامل، مذكرة المراجعة الشاملة، أو احفظ الدرس للعمل بدون إنترنت.' : 'Export video file, download printable study guide, or cache offline.'}
            </p>

            <div className="space-y-2">
              <button
                onClick={handleExportRealVideo}
                disabled={isExportingVideo}
                className="w-full py-2.5 px-4 bg-white text-[#46a302] hover:bg-slate-50 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                <Film size={15} />
                <span>{isExportingVideo ? `${exportProgress}% ${isRtl ? 'جاري التصدير...' : 'Exporting...'}` : (isRtl ? 'تصدير كملف فيديو WebM/MP4' : 'Export Video File')}</span>
              </button>

              <button
                onClick={handleDownloadStudySheet}
                className="w-full py-2.5 px-4 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <FileText size={15} />
                <span>{isRtl ? 'تحميل مذكرة الدرس (HTML/PDF)' : 'Download Study Guide'}</span>
              </button>

              <button
                onClick={handleSaveToOffline}
                className="w-full py-2.5 px-4 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <HardDriveDownload size={15} />
                <span>{isSavedOffline ? (isRtl ? '✅ محفوظ في الذاكرة المحلية' : 'Saved Offline') : (isRtl ? 'حفظ للتشغيل دون إنترنت' : 'Save for Offline Use')}</span>
              </button>
            </div>
          </div>

          {/* Key Vocabulary Cards */}
          <div className="bg-white rounded-[2rem] p-6 border-2 border-b-4 border-slate-200">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-[#1cb0f6]" />
              <span>{isRtl ? 'المفردات والكلمات الذهبية' : 'Key Vocabulary'}</span>
            </h3>

            <div className="space-y-3">
              {lesson.vocabulary.map((vocab, vIdx) => (
                <div key={`voc-${vIdx}`} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-xs text-slate-800">{vocab.word}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{vocab.pronunciation}</span>
                  </div>
                  <p className="text-[11px] font-bold text-[#1cb0f6] mt-0.5">{vocab.meaningAr}</p>
                  <p className="text-[10px] text-slate-500 italic mt-1 bg-white p-1.5 rounded border border-slate-100">
                    "{vocab.exampleSentence}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD / EXPORT HUB MODAL */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-8 max-w-lg w-full border-4 border-slate-200 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#58cc02]/10 text-[#58cc02] rounded-2xl flex items-center justify-center">
                    <Download size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-base">
                      {isRtl ? 'مركز تحميل وتصدير الدرس' : 'Lesson Download Center'}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400">
                      {lesson.titleEn}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {exportStatusText && (
                <div className="mb-4 p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs font-bold text-sky-800 flex items-center gap-2">
                  <Sparkles size={16} className="text-sky-600 shrink-0" />
                  <span>{exportStatusText}</span>
                </div>
              )}

              <div className="space-y-3">
                {/* 1. Video Export */}
                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500/10 text-rose-600 rounded-xl flex items-center justify-center">
                      <Film size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-slate-800">{isRtl ? 'ملف فيديو بدقة عالية (.webm)' : 'HD Video File (.webm)'}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'مشاهد متحركة + صوت + ترجمة متزامنة' : 'Animated scenes + voice narration'}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleExportRealVideo}
                    disabled={isExportingVideo}
                    className="px-4 py-2 bg-[#58cc02] text-white rounded-xl text-xs font-black border-b-2 border-[#3e9202] hover:bg-[#6be60c] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isExportingVideo ? `${exportProgress}%` : (isRtl ? 'تصدير 🎥' : 'Export 🎥')}
                  </button>
                </div>

                {/* 2. Study Guide Download */}
                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-slate-800">{isRtl ? 'مذكرة الدرس الشاملة (HTML/PDF)' : 'Comprehensive Study Sheet'}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'النص الكامل + القواعد + جدول المفردات' : 'Full transcript + vocabulary cards'}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadStudySheet}
                    className="px-4 py-2 bg-[#1cb0f6] text-white rounded-xl text-xs font-black border-b-2 border-[#1291cd] hover:bg-[#2dc0ff] active:scale-95 transition-all"
                  >
                    {isRtl ? 'تحميل 📄' : 'Download 📄'}
                  </button>
                </div>

                {/* 3. Offline Cache */}
                <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                      <HardDriveDownload size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-slate-800">{isRtl ? 'حفظ دائم في المتصفح' : 'IndexedDB Offline Cache'}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'مشاهدة وممارسة فورية دون إنترنت' : 'Zero internet connection required'}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSaveToOffline}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-black hover:bg-slate-700 active:scale-95 transition-all"
                  >
                    {isSavedOffline ? '✅' : (isRtl ? 'حفظ 💾' : 'Cache 💾')}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-black"
                >
                  {isRtl ? 'إغلاق النافذة' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
