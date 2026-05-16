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
  linkedStudentIds?: string[];
  studentCode?: string;
  phoneNumber?: string;
  lastSeen?: number;
  credits?: number; // Credit balance
  // Childhood Minutes System
  dailyMinutesLimit?: number;
  remainingMinutesToday?: number;
  lastMinutesResetDate?: string; // YYYY-MM-DD
  childhoodSubscriptionType?: 'bronze' | 'silver' | 'gold' | null;
  subscriptionExpiryDate?: any;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // Positive for purchase, negative for usage
  type: 'purchase' | 'consumption' | 'childhood_subscription';
  description: string;
  timestamp: any;
}

export interface SubscriptionPackage {
  id: string;
  priceSAR: number;
  credits: number;
  label: string;
  dailyMinutes?: number;
}

export const CREDIT_PACKAGES: SubscriptionPackage[] = [
  { id: 'starter', priceSAR: 30, credits: 12, label: 'باقة الانطلاق - 12 درس' },
  { id: 'standard', priceSAR: 60, credits: 35, label: 'باقة المهارة - 35 درس' },
  { id: 'pro', priceSAR: 120, credits: 80, label: 'باقة الإتقان - 80 درس' }
];

export const CHILDHOOD_PACKAGES = [
  { id: 'bronze_3', priceSAR: 10, dailyMinutes: 10, durationDays: 3, label: 'برونزية (تجربة 3 أيام) - 10 دقائق يومياً' },
  { id: 'bronze_monthly', priceSAR: 35, dailyMinutes: 10, durationDays: 30, label: 'برونزية شهرية - 10 دقائق يومياً' },
  { id: 'silver_3', priceSAR: 18, dailyMinutes: 20, durationDays: 3, label: 'فضية (تجربة 3 أيام) - 20 دقيقة يومياً' },
  { id: 'silver_monthly', priceSAR: 55, dailyMinutes: 20, durationDays: 30, label: 'فضية شهرية - 20 دقيقة يومياً' },
  { id: 'gold_3', priceSAR: 25, dailyMinutes: 30, durationDays: 3, label: 'ذهبية (تجربة 3 أيام) - 30 دقيقة يومياً' },
  { id: 'gold_monthly', priceSAR: 70, dailyMinutes: 30, durationDays: 30, label: 'ذهبية شهرية - 30 دقيقة يومياً' },
];

export const GIFT_PACKAGE = { id: 'gift', priceSAR: 0, credits: 2, label: 'باقة الهدية - 2 درس مجاناً' };

export enum CreditCost {
  READING_LESSON = 1,
  AI_CONVERSATION = 3,
  VIDEO_LESSON = 5,
  AUDIO_STORY = 2
}

export const MASTER_ADMINS = ['basim5252@gmail.com', 'aboodalkhalil73@gmail.com', 'aboodalkhaleel73@gmail.com', 'ab3256792@gmail.com'];

export type AppView = 'dashboard' | 'placement-test' | 'curriculum' | 'lesson' | 'progress' | 'leaderboard' | 'chat' | 'admin' | 'ai-chat' | 'video-library' | 'story-library' | 'credits' | 'early-childhood' | 'oxford-discover';

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
  unitTitle?: string;
  studentId?: string;
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
  EXPRESSION = 'expression',
  EARLY_CHILDHOOD = 'early-childhood'
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
