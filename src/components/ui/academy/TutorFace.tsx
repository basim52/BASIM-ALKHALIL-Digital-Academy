import React from 'react';
import { personaById } from '../../../data/saraBoardPersonas';
import { useT } from '../../../lib/explainLang';
import { TutorVideoFace } from '../../tutor3d/TutorVideoFace';
import '../../tutor3d/tutorBoard.css';

export type TutorId = 'sara' | 'noura' | 'grammar' | 'mohammed' | 'business' | 'ali' | 'exams';
export type TutorFaceSize = 'sm' | 'md' | 'lg' | number;

export interface TutorFaceProps {
  tutor: TutorId;
  size?: TutorFaceSize;
  isSpeaking?: boolean;
  className?: string;
}

const PERSONA_MAP: Record<TutorId, 'sara' | 'grammar' | 'business' | 'exams'> = {
  sara: 'sara',
  noura: 'grammar',
  grammar: 'grammar',
  mohammed: 'business',
  business: 'business',
  ali: 'exams',
  exams: 'exams',
};

const SIZE_PX: Record<'sm' | 'md' | 'lg', number> = {
  sm: 48,
  md: 64,
  lg: 84,
};

/** Small wrapper around TutorVideoFace with Sara's gold ring. */
export const TutorFace: React.FC<TutorFaceProps> = ({
  tutor,
  size = 'sm',
  isSpeaking = false,
  className = '',
}) => {
  const t = useT();
  const personaId = PERSONA_MAP[tutor] || 'sara';
  const persona = personaById(personaId);
  const px = typeof size === 'number' ? size : SIZE_PX[size] || 48;

  return (
    <div
      style={{ width: px, height: px }}
      className={`relative rounded-full border-2 ${
        isSpeaking ? 'border-[#E6C36A] shadow-[0_0_12px_rgba(196,158,58,0.55)]' : 'border-[#C49E3A]'
      } bg-[#001a38] overflow-hidden shrink-0 ${className}`}
    >
      <TutorVideoFace
        id={persona.id}
        alt={t(persona.nameAr, persona.nameEn)}
        isSpeaking={isSpeaking}
        onFail={() => {}}
      />
    </div>
  );
};

export default TutorFace;
