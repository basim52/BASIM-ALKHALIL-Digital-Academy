/** Specialty board tutors (Sara's colleagues). Each has its own Gemini cloud voice, distinct from Sara's "Kore". */
export interface BoardPersona { id: 'grammar' | 'business' | 'exams'; nameAr: string; nameEn: string; gender: 'female' | 'male'; voice: string; emoji: string; roleAr: string; trackHint: string; examplesAr: string[] }
export const BOARD_PERSONAS: BoardPersona[] = [
  { id: 'grammar', nameAr: 'نورة', nameEn: 'Noura', gender: 'female', voice: 'Aoede', emoji: '👩‍🏫', roleAr: 'القواعد والأساسيات', trackHint: 'foundations', examplesAr: ['Present Perfect vs Past Simple', 'a / an / the', 'Comparatives'] },
  { id: 'business', nameAr: 'خالد', nameEn: 'Khalid', gender: 'male', voice: 'Charon', emoji: '👨‍💼', roleAr: 'إنجليزية الأعمال والمقابلات', trackHint: 'advanced', examplesAr: ['Formal emails', 'Job interview answers', 'Meeting phrases'] },
  { id: 'exams', nameAr: 'عمر', nameEn: 'Omar', gender: 'male', voice: 'Orus', emoji: '🧑‍🎓', roleAr: 'التحضير للاختبارات (IELTS)', trackHint: 'examPrep', examplesAr: ['Linking words for essays', 'Describing a graph', 'Speaking Part 2 tips'] },
];
export const personaById = (id: string) => BOARD_PERSONAS.find(p => p.id === id) || BOARD_PERSONAS[0];
