// ============================================================================
// SARA'S EXCLUSIVE INDEPENDENT CURRICULUMS - TYPES & MODELS
// ============================================================================

export type SaraPillarId = 'grammar' | 'conversation' | 'reading' | 'writing';
export type SaraLessonLevel = 'مبتدئ (Starter)' | 'متوسط (Intermediate)' | 'متقدم (Advanced)';


export type SaraCefr = 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface SaraVocabItem {
  word: string;
  ipa: string;
  ar: string;
  exampleEn: string;
  exampleAr: string;
  /** Grammar form / expansion note (English), kept out of the Arabic gloss. */
  note?: string;
}

export interface SaraQuestion {
  questionAr: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

export interface SaraExercise {
  id: string;
  type: 'meaning' | 'gap' | 'order' | 'translate';
  promptEn: string;
  promptAr: string;
  options?: string[];
  correctIndex?: number;
  answer: string;
  explanationAr: string;
}

export interface SaraReviewItem extends SaraQuestion {
  fromLessonId: string;
}

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
  // ---- Rebuilt curriculum fields (optional for backward compatibility) ----
  unit?: number;
  cefr?: SaraCefr;
  objectivesAr?: string[];
  objectivesEn?: string[];
  vocabulary?: SaraVocabItem[];
  grammarFocus?: {
    ruleAr: string;
    ruleEn: string;
    formula: string;
    examples: Array<{ en: string; ar: string }>;
  };
  modelDialogue?: Array<{ speaker: string; en: string; ar: string }>;
  listeningTask?: {
    instructionsAr: string;
    script: string;
    questions: SaraQuestion[];
  };
  pronunciationFocus?: {
    focus: string;
    items: string[];
    tipAr: string;
  };
  exercises?: {
    easy: SaraExercise[];
    medium: SaraExercise[];
    hard: SaraExercise[];
  };
  arabicLearnerPitfalls?: Array<{ incorrect: string; correct: string; whyAr: string }>;
  reviewOfPrevious?: SaraReviewItem[];
  masteryCheck?: {
    passScore: number;
    questions: SaraQuestion[];
  };
}
