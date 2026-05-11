/**
 * Oxford Digital Academy - Types
 */

export enum UserRole {
  STUDENT = 'student',
  PARENT = 'parent',
  ADMIN = 'admin'
}

export enum proficiencyLevel {
  A1 = 'A1', // Beginner
  A2 = 'A2', // Elementary
  B1 = 'B1', // Intermediate
  B2 = 'B2', // Upper-Intermediate
  C1 = 'C1', // Advanced
  C2 = 'C2'  // Proficiency
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: any; // Using any to support serverTimestamp during creation and Timestamp object on read
  linkedStudentId?: string;
  phoneNumber?: string;
}

export interface WhatsAppNotification {
  id: string;
  studentId: string;
  type: 'reminder' | 'encouragement' | 'absence' | 'booking';
  recipient: 'parent' | 'student';
  sentBy: string;
  content: string;
  sentAt: any;
  status: 'pending' | 'sent';
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  isCustom?: boolean;
}

export interface ParentNote {
  id: string;
  parentId: string;
  studentId: string;
  text: string;
  aiResponse?: string;
  createdAt: any;
}

export enum CurriculumCategory {
  READING = 'reading',
  GRAMMAR = 'grammar',
  CONVERSATION = 'conversation',
  WRITING = 'writing',
  EXPRESSION = 'expression'
}

export interface LearningModule {
  id: string;
  category: CurriculumCategory;
  level: proficiencyLevel;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  order: number;
  units?: CurriculumUnit[];
}

export interface CurriculumUnit {
  id: string;
  title: string;
  titleAr: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  titleAr: string;
  content?: string; // AI generated markdown content
  contentAr?: string;
  order?: number;
  unitId?: string;
  moduleId?: string;
  imageryPrompt?: string;
  slides?: any[]; // Legacy support for older lessons
  warmup?: {
    mission: string;
    missionAr: string;
    objectives: string[];
    objectivesAr: string[];
  };
  exercises?: {
    type: 'fill' | 'match' | 'multiple' | 'drag';
    instruction: string;
    instructionAr: string;
    items: any[];
  }[];
  quiz?: {
    question: string;
    questionAr: string;
    options: string[];
    optionsAr: string[];
    correctIndex: number;
    explanation: string;
    explanationAr: string;
  }[];
  readingText?: {
    paragraphs: {
      en: string;
      ar: string;
      audioUrl?: string;
    }[];
  };
  vocabulary?: {
    word: string;
    phonetic: string;
    meaningAr: string;
    example: string;
    audioUrl?: string;
  }[];
  proficiencyLevel?: proficiencyLevel;
}

export interface StudentProfile extends UserProfile {
  parentId?: string;
  level: proficiencyLevel;
  points: number;
  learningPath: string[]; // List of module IDs
  currentModuleId: string;
}

export interface ParentProfile extends UserProfile {
  childrenIds: string[];
}

export interface Grade {
  studentId: string;
  testId: string;
  score: number;
  total: number;
  feedback: string;
  date: any;
}

export interface AIConversationSession {
  sessionId: string;
  studentId: string;
  transcript: { role: 'user' | 'ai', text: string }[];
  feedback: {
    fluency: number;
    grammar: number;
    vocabulary: number;
    suggestions: string[];
  };
  date: any;
}
