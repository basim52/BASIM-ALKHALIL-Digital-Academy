// ============================================================================
// SARA'S EXCLUSIVE INDEPENDENT CURRICULUMS (مناهج سارة التخصصية المستقلة للطلاقة)
// Decoupled completely from the Academy. Designed purely for conversational fluency.
// 4 Specialized Tracks x 30 Comprehensive Lessons = 120 Total Lessons
// ============================================================================

export * from './types';
export * from './grammarLessons';
export * from './conversationLessons';
export * from './readingLessons';
export * from './writingLessons';

import { SaraCurriculumLesson, SaraPillarId } from './types';
import { SARA_SPOKEN_GRAMMAR_LESSONS } from './grammarLessons';
import { SARA_ACTIVE_CONVERSATION_LESSONS } from './conversationLessons';
import { SARA_READING_PHONETICS_LESSONS } from './readingLessons';
import { SARA_CONVERSATIONAL_WRITING_LESSONS } from './writingLessons';

export const ALL_SARA_EXCLUSIVE_LESSONS: SaraCurriculumLesson[] = [
  ...SARA_SPOKEN_GRAMMAR_LESSONS,
  ...SARA_ACTIVE_CONVERSATION_LESSONS,
  ...SARA_READING_PHONETICS_LESSONS,
  ...SARA_CONVERSATIONAL_WRITING_LESSONS
];

export const SARA_PILLARS_META = [
  {
    id: 'grammar' as SaraPillarId,
    titleAr: 'منهج القواعد التحدثية السريعة (30 درساً)',
    titleEn: 'Spoken Grammar & Fast Patterns (30 Lessons)',
    shortTitleAr: 'القواعد التحدثية',
    shortTitleEn: 'Spoken Grammar',
    icon: '🧠',
    badgeAr: '30 قالباً للحديث الفوري',
    badgeEn: '30 Fast Templates',
    color: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-400',
    lightBg: 'bg-blue-50/90 text-blue-900',
    accentColor: '#2563EB',
    taglineAr: 'تراكيب كلام جاهزة للتحدث المباشر دون توقف أو ترجمة ذهنية.'
  },
  {
    id: 'conversation' as SaraPillarId,
    titleAr: 'منهج المحادثة والطلاقة التفاعلية (30 درساً)',
    titleEn: 'Active Fluency & Conversation (30 Lessons)',
    shortTitleAr: 'المحادثة والطلاقة',
    shortTitleEn: 'Active Fluency',
    icon: '💬',
    badgeAr: '30 تحدياً لكسر حاجز الخوف',
    badgeEn: '30 Fear-Breaker Drills',
    color: 'from-cyan-600 to-blue-700',
    borderColor: 'border-cyan-400',
    lightBg: 'bg-cyan-50/90 text-cyan-900',
    accentColor: '#0891B2',
    taglineAr: 'حوارات مواقف حية وتدريب شفهي متدرج لإطلاق لسانك بثقة كاملة.'
  },
  {
    id: 'reading' as SaraPillarId,
    titleAr: 'منهج القراءة التعبيرية والنطق الصوتي (30 درساً)',
    titleEn: 'Expressive Reading & Phonetics Lab (30 Lessons)',
    shortTitleAr: 'القراءة والنطق',
    shortTitleEn: 'Reading & Phonetics',
    icon: '📖',
    badgeAr: '30 تدريباً صوتياً وإيقاعياً',
    badgeEn: '30 Phonetic Drills',
    color: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-400',
    lightBg: 'bg-emerald-50/90 text-emerald-900',
    accentColor: '#059669',
    taglineAr: 'نصوص حية مقروءة، ضبط مخارج الحروف، التظليل الصوتي، والنبر التعبيري.'
  },
  {
    id: 'writing' as SaraPillarId,
    titleAr: 'منهج الكتابة التعبيرية الحوارية (30 درساً)',
    titleEn: 'Conversational Writing & Quick Messaging (30 Lessons)',
    shortTitleAr: 'الكتابة التعبيرية',
    shortTitleEn: 'Conversational Writing',
    icon: '✍️',
    badgeAr: '30 مهارة للتفكير بالإنجليزية',
    badgeEn: '30 Direct Thinking Skills',
    color: 'from-purple-600 to-fuchsia-700',
    borderColor: 'border-purple-400',
    lightBg: 'bg-purple-50/90 text-purple-900',
    accentColor: '#7C3AED',
    taglineAr: 'شات سريع، إيميلات ذكية، وتفريغ خواطر يومية لبرمجة التفكير بالإنجليزية.'
  }
];

export function getSaraLessonById(id: string): SaraCurriculumLesson | undefined {
  return ALL_SARA_EXCLUSIVE_LESSONS.find(l => l.id === id);
}

export function getSaraLessonsByPillar(pillarId: SaraPillarId): SaraCurriculumLesson[] {
  return ALL_SARA_EXCLUSIVE_LESSONS.filter(l => l.pillarId === pillarId);
}
