import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { Trophy, CheckCircle2, ChevronRight, Star, Download } from 'lucide-react';
import { proficiencyLevel } from '../types';
import html2canvas from 'html2canvas';

interface ProgressRoadmapProps {
  lang: Language;
  currentLevel: string;
  studentName?: string;
}

const levels = [
  { id: proficiencyLevel.A1, label: 'A1', color: 'from-blue-500 to-blue-600', icon: '🌱', benchmark: 'Beginner' },
  { id: proficiencyLevel.A2, label: 'A2', color: 'from-emerald-500 to-emerald-600', icon: '🌿', benchmark: 'IELTS 3.0' },
  { id: proficiencyLevel.B1, label: 'B1', color: 'from-amber-500 to-amber-600', icon: '🌳', benchmark: 'IELTS 4.0-5.0' },
  { id: proficiencyLevel.B2, label: 'B2', color: 'from-orange-500 to-orange-600', icon: '🌻', benchmark: 'IELTS 5.5-6.5' },
  { id: proficiencyLevel.C1, label: 'C1', color: 'from-purple-500 to-purple-600', icon: '🌟', benchmark: 'IELTS 7.0-8.0' },
  { id: proficiencyLevel.C2, label: 'C2', color: 'from-indigo-500 to-indigo-600', icon: '👑', benchmark: 'IELTS 8.5-9.0' },
];

export const ProgressRoadmap = ({ lang, currentLevel, studentName }: ProgressRoadmapProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const roadmapRef = useRef<HTMLDivElement>(null);
  
  const currentIndex = levels.findIndex(l => l.id === currentLevel);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  const handleExportImage = async () => {
    if (!roadmapRef.current) return;
    
    try {
      const canvas = await html2canvas(roadmapRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('roadmap-container');
          if (clonedElement) {
            clonedElement.style.padding = '40px';
          }
          // Remove oklch from styles to prevent parser error
          const styles = clonedDoc.getElementsByTagName('style');
          for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            const html = style.innerHTML || '';
            if (html.includes('oklch')) {
              style.innerHTML = html.replace(/oklch\([^)]+\)/g, '#f1f5f9');
            }
          }
        }
      });
      
      const link = document.createElement('a');
      link.download = `BKD-Roadmap-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error exporting roadmap:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleExportImage}
          className="flex items-center gap-2 px-4 py-2 bg-[#002147] text-white rounded-xl font-bold text-xs hover:bg-[#003366] transition-colors shadow-lg active:scale-95"
        >
          <Download size={14} />
          {isRtl ? 'تحميل المسار كصورة' : 'Download Roadmap Image'}
        </button>
      </div>
      
      <div 
        id="roadmap-container"
        ref={roadmapRef}
        className={`bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm overflow-hidden relative ${isRtl ? 'font-arabic' : 'font-sans'}`} 
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <header className="mb-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-[#002147] mb-3">{t.roadmapTitle}</h3>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">{isRtl ? 'خارطة الطريق الأكاديمية نحو الإتقان الكامل' : 'Academic Roadmap Towards Full Mastery'}</p>
        </header>

        <div className="relative pt-10 pb-16">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-100 -translate-y-11 rounded-full hidden md:block" />
          <div 
            className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-500 via-emerald-500 to-orange-500 -translate-y-11 rounded-full transition-all duration-1000 hidden md:block" 
            style={{ width: `${(safeCurrentIndex / (levels.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between items-start relative gap-8 md:gap-4">
            {levels.map((level, idx) => {
              const isCompleted = idx < safeCurrentIndex;
              const isCurrent = idx === safeCurrentIndex;

              return (
                <div key={level.id} className="flex flex-col items-center relative group">
                  {/* Visual Node */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-2xl md:text-3xl shadow-lg relative transition-all duration-500 ${
                      isCurrent 
                        ? `bg-gradient-to-br ${level.color} text-white scale-125 z-10 shadow-xl ring-8 ring-white` 
                        : isCompleted 
                          ? 'bg-blue-50 text-blue-600 z-0 opacity-80' 
                          : 'bg-slate-50 text-slate-300 z-0 opacity-60'
                    }`}
                  >
                    <span className={isCurrent ? 'animate-bounce' : ''}>{level.icon}</span>
                    
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                    
                    {isCurrent && (
                      <motion.div 
                          className="absolute -inset-2 rounded-[2rem] border-2 border-dashed border-blue-400"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </motion.div>

                  {/* Level Label */}
                  <div className="mt-6 md:mt-8 text-center flex flex-col items-center">
                    <span className={`text-lg md:text-xl font-black ${isCurrent ? 'text-[#002147]' : 'text-slate-400'}`}>
                      {level.label}
                    </span>
                    <div className="h-1 w-6 rounded-full mt-1 bg-slate-100 overflow-hidden">
                       {isCurrent && <motion.div className="h-full bg-blue-600" animate={{ x: [-24, 24] }} transition={{ repeat: Infinity, duration: 1.5 }} />}
                    </div>
                  </div>

                  {/* Tooltip Content (Desktop) */}
                  <div className="absolute -top-20 bg-[#002147] text-white py-2 px-4 rounded-xl text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[40]">
                      {isCurrent ? t.currentStage : isCompleted ? t.completionState : t.nextStage}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <footer className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                🚀
              </div>
              <div>
                <h4 className="text-xl font-black text-[#002147]">
                  {isRtl ? `أنت تبلي بلاءً حسناً في ${levels[safeCurrentIndex]?.label || ''}!` : `You're doing great in ${levels[safeCurrentIndex]?.label || ''}!`}
                </h4>
                <p className="text-sm text-slate-500 font-medium">
                  {isRtl ? 'المرحلة القادمة ستفتح لك آفاقاً لغوية أوسع' : 'The next stage will open broader linguistic horizons for you'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
               <Trophy className="text-[#C49E3A]" />
               <div className="text-right">
                  <span className="block text-2xl font-black text-[#002147] leading-none">{((safeCurrentIndex + 1) / levels.length * 100).toFixed(0)}%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isRtl ? 'اكتمال المسار' : 'Path Completion'}</span>
               </div>
            </div>
        </footer>
      </div>
    </div>
  );
};
