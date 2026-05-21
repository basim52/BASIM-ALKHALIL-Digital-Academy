import { subtleArtCourse } from './subtleArt';
import { sevenHabitsCourse } from './sevenHabits';
import { richDadCourse } from './richDad';
import { youCanWinCourse } from './youCanWin';
import { powerOfNowCourse } from './powerOfNow';
import { lettingGoCourse } from './lettingGo';
import { thinkingFastSlowCourse } from './thinkingFastSlow';
import { BookCourse } from './types';

export * from './types';
export * from './subtleArt';
export * from './sevenHabits';
export * from './richDad';
export * from './youCanWin';
export * from './powerOfNow';
export * from './lettingGo';
export * from './thinkingFastSlow';

export const COURSES: BookCourse[] = [
  subtleArtCourse,
  sevenHabitsCourse,
  richDadCourse,
  youCanWinCourse,
  powerOfNowCourse,
  lettingGoCourse,
  thinkingFastSlowCourse
];

export const PRELOADED_COURSES = COURSES;

