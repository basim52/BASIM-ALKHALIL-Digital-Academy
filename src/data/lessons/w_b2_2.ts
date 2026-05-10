import { Lesson } from "../../types";

export const summaryWritingB2: Lesson = {
  id: 'w_b2_2',
  title: 'Summarizing & Paraphrasing',
  titleAr: 'التلخيص وإعادة الصياغة',
  slides: [
    { id: 's1', type: 'intro', content: 'Summarizing means shortening text, while paraphrasing means rewriting it in your own words.', contentAr: 'يعني التلخيص تقصير النص، بينما تعني إعادة الصياغة كتابته بكلماتك الخاصة.' },
    { id: 's2', type: 'vocabulary', content: 'Summarize, Paraphrase, Condense, Reword, Core message.', contentAr: 'يلخص، يعيد صياغة، يكثف، يغير اللفظ، الرسالة الجوهرية.' },
    { id: 's3', type: 'exercise', question: 'Which word means "using your own words"?', questionAr: 'أي كلمة تعني "استخدام كلماتك الخاصة"؟', options: ['Summarize', 'Paraphrase', 'Quote', 'Plagiarize'], correctIndex: 1 }
  ]
};
