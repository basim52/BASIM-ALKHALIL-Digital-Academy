import React, { useEffect, useState } from 'react';
import { TutorVideoFace } from './tutor3d/TutorVideoFace';
import './tutor3d/tutorBoard.css';

export type StudentId = 'badr' | 'reem';
/** Everyone in Abboud's class: the two students and Abboud himself, the teacher. */
export type ClassFaceId = StudentId | 'abboud';
const FACES: Record<ClassFaceId, { asset: string; name: string; emoji: string }> = {
  badr: { asset: 'student-badr', name: 'بدر', emoji: '👦🏻' },
  reem: { asset: 'student-reem', name: 'ريم', emoji: '👧🏻' },
  abboud: { asset: 'teacher-abboud', name: 'عبود المعلّم', emoji: '👦🏽' },
};
const PHONE = '(max-width: 639px)';
const isPhone = () => typeof window !== 'undefined' && !!window.matchMedia?.(PHONE).matches;

/**
 * Badr, Reem and Abboud (the teacher) use the teachers' face system: the same TutorVideoFace (portrait + idle/talk loops from /tutors),
 * gold ring and still/emoji fallbacks. Each face talks only while that person speaks
 * (a student's reply audio, or Abboud while his microphone is open).
 * On phones only the speaker plays video; the others show the still portrait (one video at a time).
 */
export function AbboudStudentFace({ id, speaking, className = '' }: { id: ClassFaceId; speaking: boolean; className?: string }) {
  const student = FACES[id];
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [phone, setPhone] = useState(isPhone);
  useEffect(() => {
    const query = window.matchMedia?.(PHONE); if (!query) return;
    const update = () => setPhone(query.matches);
    query.addEventListener?.('change', update); return () => query.removeEventListener?.('change', update);
  }, []);
  const still = <img className="tutor-video-poster" src={`/tutors/${student.asset}.webp`} alt={student.name} draggable={false} onError={() => setImageFailed(true)} />;
  return <div className={`abboud-student-face ${className} ${speaking ? 'is-speaking' : ''}`} data-face={student.asset} data-speaking={String(speaking)}>
    {imageFailed ? <span aria-hidden="true" className="abboud-student-emoji">{student.emoji}</span>
      : videoFailed || (phone && !speaking) ? still
      : <TutorVideoFace id={student.asset} alt={student.name} isSpeaking={speaking} followPlayback={false} laugh={false} onFail={() => setVideoFailed(true)} />}
  </div>;
}
export default AbboudStudentFace;
