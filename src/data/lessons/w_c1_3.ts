import { Lesson } from "../../types";

export const professionalProposalsC1: Lesson = {
  id: 'w_c1_3',
  title: 'Professional Proposals',
  titleAr: 'المقترحات المهنية',
  slides: [
    { id: 's1', type: 'intro', content: 'A professional proposal outlines a solution to a problem and requests resources or approval.', contentAr: 'يوضح المقترح المهني حلاً لمشكلة ما ويطلب الموارد أو الموافقة.' },
    { id: 's2', type: 'vocabulary', content: 'Proposal, Executive Summary, Objectives, Deliverables, ROI (Return on Investment).', contentAr: 'مقترح، ملخص تنفيذي، أهداف، مخرجات، العائد على الاستثمار.' },
    { id: 's3', type: 'exercise', question: 'What is an "Executive Summary"?', questionAr: 'ما هو "الملخص التنفيذي"؟', options: ['A list of names', 'A brief overview of a proposal', 'A financial report', 'A legal contract'], correctIndex: 1 }
  ]
};
