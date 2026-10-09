// ============================================================================
// SARA'S EXCLUSIVE INDEPENDENT CURRICULUMS - TYPES & MODELS
// ============================================================================

export type SaraPillarId = 'grammar' | 'conversation' | 'reading' | 'writing';
export type SaraLessonLevel = 'مبتدئ (Starter)' | 'متوسط (Intermediate)' | 'متقدم (Advanced)';

export interface SaraCurriculumLesson {
  id: string;
  pillarId: SaraPillarId;
  pillarNameAr: string;
  pillarNameEn: string;
  pillarIcon: string;
  level: SaraLessonLevel;
  levelCode: 'A1-A2' | 'B1-B2' | 'C1';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  speakingGoalAr: string;
  speakingGoalEn: string;
  keyPattern: {
    ruleAr: string;
    ruleEn: string;
    formula: string;
  };
  practicalExamples: Array<{
    en: string;
    ar: string;
    spokenNoteAr?: string;
    spokenNoteEn?: string;
  }>;
  commonMistakes: Array<{
    incorrect: string;
    correct: string;
    whyAr: string;
  }>;
  speakingChallenge: {
    promptAr: string;
    promptEn: string;
    saraQuestionAr: string;
    saraQuestionEn: string;
    recommendedResponseEn: string;
  };
  quiz: Array<{
    questionAr: string;
    questionEn: string;
    options: string[];
    correctIndex: number;
    explanationAr: string;
  }>;
  whiteboardNotes: {
    title: string;
    pointsAr: string[];
    pointsEn: string[];
    chalkHighlight: string;
  };
}
