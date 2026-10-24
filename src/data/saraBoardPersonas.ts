/** Specialty board tutors (Sara's colleagues). Each has its own Gemini cloud voice, distinct from Sara's "Kore". */
export type PersonaId = 'sara' | 'grammar' | 'business' | 'exams' | 'lama' | 'reem' | 'haya' | 'jana';
/** «من الصفر» teachers (kids and adult beginners): their own bright card colours inside the navy/gold frame. */
export interface KidsTheme { accent: string; soft: string; ink: string }
export interface BoardPersona { id: PersonaId; nameAr: string; nameEn: string; gender: 'female' | 'male'; voice: string; emoji: string; roleAr: string; roleEn?: string; trackHint: string; examplesAr: string[]; kids?: KidsTheme }
export const BOARD_PERSONAS: BoardPersona[] = [
  { id: 'sara', nameAr: 'سارة', nameEn: 'Sara', gender: 'female', voice: 'Kore', emoji: '👩‍💼', roleAr: 'معلمتك الأساسية', roleEn: 'Your main teacher', trackHint: 'general', examplesAr: ['Daily conversation phrases', 'Past Simple', 'Describing my day'] },
  { id: 'grammar', nameAr: 'نورة', nameEn: 'Noura', gender: 'female', voice: 'Aoede', emoji: '👩‍🏫', roleAr: 'القواعد والأساسيات', roleEn: 'Grammar and basics', trackHint: 'foundations', examplesAr: ['Present Perfect vs Past Simple', 'a / an / the', 'Comparatives'] },
  { id: 'business', nameAr: 'محمد', nameEn: 'Mohammed', gender: 'male', voice: 'Charon', emoji: '👨‍💼', roleAr: 'إنجليزية الأعمال والمقابلات', roleEn: 'Business English and interviews', trackHint: 'advanced', examplesAr: ['Formal emails', 'Job interview answers', 'Meeting phrases'] },
  { id: 'exams', nameAr: 'علي', nameEn: 'Ali', gender: 'male', voice: 'Orus', emoji: '🧑‍🎓', roleAr: 'التحضير للاختبارات (IELTS)', roleEn: 'Exam prep (IELTS)', trackHint: 'examPrep', examplesAr: ['Linking words for essays', 'Describing a graph', 'Speaking Part 2 tips'] },
  { id: 'lama', nameAr: 'لمى', nameEn: 'Lama', gender: 'female', voice: 'Achernar', emoji: '🔤', roleAr: 'الحروف والأصوات من الصفر', roleEn: 'Letters and sounds from zero', trackHint: 'phonics', examplesAr: ['Short a words', 'The sh sound', 'Letters A to E'], kids: { accent: '#EC4899', soft: '#FFF1F7', ink: '#831843' } },
  { id: 'reem', nameAr: 'ريم', nameEn: 'Reem', gender: 'female', voice: 'Laomedeia', emoji: '🍎', roleAr: 'كلمات كل يوم', roleEn: 'Everyday words', trackHint: 'vocabulary', examplesAr: ['Colours', 'Fruits', 'My family'], kids: { accent: '#0EA5E9', soft: '#F0F9FF', ink: '#0C4A6E' } },
  { id: 'haya', nameAr: 'هيا', nameEn: 'Haya', gender: 'female', voice: 'Vindemiatrix', emoji: '💬', roleAr: 'جمل أساسية', roleEn: 'Basic sentences', trackHint: 'sentences', examplesAr: ['I like ...', 'I have ...', 'There is ...'], kids: { accent: '#8B5CF6', soft: '#F5F3FF', ink: '#4C1D95' } },
  { id: 'jana', nameAr: 'جنى', nameEn: 'Jana', gender: 'female', voice: 'Autonoe', emoji: '✏️', roleAr: 'تمارين ومراجعة', roleEn: 'Exercises and review', trackHint: 'practice', examplesAr: ['at, to, for', 'a or an', 'am, is, are'], kids: { accent: '#10B981', soft: '#ECFDF5', ink: '#064E3B' } },
];
export const personaById = (id: string) => BOARD_PERSONAS.find(p => p.id === id) || BOARD_PERSONAS[1];
