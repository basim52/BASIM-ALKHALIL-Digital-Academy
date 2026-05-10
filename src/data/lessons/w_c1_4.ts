import { Lesson } from "../../types";

export const criticalAnalysisC1: Lesson = {
  id: 'w_c1_4',
  title: 'Critical Analysis',
  titleAr: 'التحليل النقدي',
  slides: [
    { id: 's1', type: 'intro', content: 'Critical analysis involves breaking down a text to understand its underlying messages and biases.', contentAr: 'يتضمن التحليل النقدي تفكيك النص لفهم رسائله الضمنية وتحيزاته.' },
    { id: 's2', type: 'vocabulary', content: 'Bias, Deconstruction, Subtext, Implied, Critique.', contentAr: 'تحيز، تفكيك، نص ضمني، ملمح إليه، نقد.' },
    { id: 's3', type: 'exercise', question: 'What is "Subtext"?', questionAr: 'ما هو "النص الضمني" (Subtext)؟', options: ['The main title', 'The hidden meaning', 'The footer', 'The dictionary definition'], correctIndex: 1 }
  ]
};
