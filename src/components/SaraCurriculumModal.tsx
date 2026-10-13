import React from 'react';
import { X } from 'lucide-react';

interface SaraCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson?: (lesson: any, targetMode?: 'slides' | 'exercises' | 'quiz') => void;
  activeLessonId?: string | null;
  initialPillar?: string;
  isRtl?: boolean;
}

/** Sara's curriculum is being rebuilt from scratch: simple empty state. */
export const SaraCurriculumModal: React.FC<SaraCurriculumModalProps> = ({ isOpen, onClose, isRtl = true }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 p-4" onClick={onClose} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-400/40 p-8 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 left-3 p-1.5 rounded-lg text-slate-300 hover:bg-white/10" aria-label="close"><X size={18} /></button>
        <div className="text-4xl mb-3">🛠️</div>
        <h3 className="text-lg font-black text-amber-300">{isRtl ? 'المنهج قيد البناء' : 'Curriculum under construction'}</h3>
      </div>
    </div>
  );
};

export default SaraCurriculumModal;
