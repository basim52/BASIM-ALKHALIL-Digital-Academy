/** Specialty board tutors (Sara's colleagues). Each has its own Gemini cloud voice, distinct from Sara's "Kore". */
export interface BoardPersona { id: 'sara' | 'grammar' | 'business' | 'exams'; nameAr: string; nameEn: string; gender: 'female' | 'male'; voice: string; emoji: string; roleAr: string; roleEn?: string; trackHint: string; examplesAr: string[] }
export const BOARD_PERSONAS: BoardPersona[] = [
  { id: 'sara', nameAr: 'سارة', nameEn: 'Sara', gender: 'female', voice: 'Kore', emoji: '👩‍💼', roleAr: 'معلمتك الأساسية', roleEn: 'Your main teacher', trackHint: 'general', examplesAr: ['Daily conversation phrases', 'Past Simple', 'Describing my day'] },
  { id: 'grammar', nameAr: 'نورة', nameEn: 'Noura', gender: 'female', voice: 'Aoede', emoji: '👩‍🏫', roleAr: 'القواعد والأساسيات', roleEn: 'Grammar and basics', trackHint: 'foundations', examplesAr: ['Present Perfect vs Past Simple', 'a / an / the', 'Comparatives'] },
  { id: 'business', nameAr: 'محمد', nameEn: 'Mohammed', gender: 'male', voice: 'Charon', emoji: '👨‍💼', roleAr: 'إنجليزية الأعمال والمقابلات', roleEn: 'Business English and interviews', trackHint: 'advanced', examplesAr: ['Formal emails', 'Job interview answers', 'Meeting phrases'] },
  { id: 'exams', nameAr: 'علي', nameEn: 'Ali', gender: 'male', voice: 'Orus', emoji: '🧑‍🎓', roleAr: 'التحضير للاختبارات (IELTS)', roleEn: 'Exam prep (IELTS)', trackHint: 'examPrep', examplesAr: ['Linking words for essays', 'Describing a graph', 'Speaking Part 2 tips'] },
];
export const personaById = (id: string) => BOARD_PERSONAS.find(p => p.id === id) || BOARD_PERSONAS[1];
