export interface MicroLesson {
  id: string;
  idNum: number;
  titleEn: string;
  titleAr: string;
  duration: string;
  type: 'intro' | 'core' | 'review' | 'tips';
  contentAr: string;
  contentEn: string;
}

export interface Chapter {
  id: string;
  chapterNum: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  lessons: MicroLesson[];
  quiz: {
    questionAr: string;
    questionEn: string;
    optionsAr: string[];
    optionsEn: string[];
    correctIndex: number;
    explanationAr: string;
    explanationEn: string;
  }[];
}

export interface BookCourse {
  id: string;
  titleEn: string;
  titleAr: string;
  authorEn: string;
  authorAr: string;
  coverImage: string;
  descriptionEn: string;
  descriptionAr: string;
  chapters: Chapter[];
  isLocked?: boolean;
}
