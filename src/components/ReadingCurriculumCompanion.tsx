
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  ChevronRight, 
  Play, 
  GraduationCap, 
  Search, 
  Sticker, 
  Mic2, 
  Brain, 
  Library,
  ArrowLeft,
  XCircle,
  Pause,
  Lightbulb,
  CheckCircle2,
  Trophy,
  Star,
  Settings,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  Square,
  Quote,
  Plus as PlusIcon,
  Clock as ClockIcon
} from 'lucide-react';
import { managedSpeak } from '../lib/audio';

interface ReadingUnit {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lightColor: string;
  prepQuestionEn: string;
  prepQuestionAr: string;
  readingTextEn: string;
  readingTextAr: string;
  cards: { id: string; en: string; ar: string; img: string; phonetic?: string }[];
  selfPacedLessons: { titleEn: string; titleAr: string; duration: string; type: string }[];
}

export type ReadingLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const ALL_READING_UNITS: Record<ReadingLevel, ReadingUnit[]> = {
  A1: [
    {
      id: 'r_a1_1',
      titleEn: 'Phonemic Awareness',
      titleAr: 'الوعي الصوتي',
      descriptionEn: 'Decoding the 44 English phonemes with visual symbols.',
      descriptionAr: 'فك رموز 44 وحدة صوتية إنجليزية برموز مرئية.',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      prepQuestionEn: 'What is the first sound you hear in "Apple"?',
      prepQuestionAr: 'ما هو الصوت الأول الذي تسمعه في كلمة "Apple"؟',
      readingTextEn: 'A big red apple is on the green tree.',
      readingTextAr: 'تفاحة حمراء كبيرة على الشجرة الخضراء.',
      cards: [
        { id: 'pa-1', en: 'Apple', ar: 'تفاح', phonetic: '/ˈæpl/', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8D%8E%3C/text%3E%3C/svg%3E' },
        { id: 'pa-2', en: 'Bird', ar: 'طائر', phonetic: '/bɜːrd/', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%234f46e5%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%237c3aed%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%90%A6%3C/text%3E%3C/svg%3E' },
        { id: 'pa-3', en: 'Cat', ar: 'قطة', phonetic: '/kæt/', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%90%B1%3C/text%3E%3C/svg%3E' },
        { id: 'pa-4', en: 'Dog', ar: 'كلب', phonetic: '/dɔːɡ/', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%90%B6%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'The /a/ Sound Mastery', titleAr: 'إتقان صوت حرف A', duration: '5m', type: 'Phonics' },
        { titleEn: 'First Letter Recognition', titleAr: 'التعرف على الحرف الأول', duration: '8m', type: 'Visual' }
      ]
    },
    {
      id: 'r_a1_2',
      titleEn: 'Academic Sight Words',
      titleAr: 'الكلمات البصرية',
      descriptionEn: 'Mastering the first 100 high-frequency academic words.',
      descriptionAr: 'إتقان أول 100 كلمة من الكلمات الأكاديمية الشائعة.',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      prepQuestionEn: 'Can you spot the word "The" in your favorite book?',
      prepQuestionAr: 'هل يمكنك العثور على كلمة "The" في كتابك المفضل؟',
      readingTextEn: 'The cat is big. The dog is small.',
      readingTextAr: 'القط كبير. الكلب صغير.',
      cards: [
        { id: 'sw-1', en: 'The', ar: 'الـ (التعريف)', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%94%A4%3C/text%3E%3C/svg%3E' },
        { id: 'sw-2', en: 'And', ar: 'و (حرف عطف)', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9E%95%3C/text%3E%3C/svg%3E' },
        { id: 'sw-3', en: 'Is', ar: 'يكون', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%94%A4%3C/text%3E%3C/svg%3E' },
        { id: 'sw-4', en: 'You', ar: 'أنت', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%89%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Top 10 High Frequency Words', titleAr: 'أهم 10 كلمات شائعة', duration: '10m', type: 'Memory' },
        { titleEn: 'Sentence Building Blocks', titleAr: 'لبنات بناء الجملة', duration: '12m', type: 'Syntax' }
      ]
    },
    {
      id: 'r_a1_3',
      titleEn: 'Environmental Print',
      titleAr: 'النصوص البيئية',
      descriptionEn: 'Reading common signs, labels, and logos in daily life.',
      descriptionAr: 'قراءة العلامات والملصقات والشعارات الشائعة في الحياة اليومية.',
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50',
      prepQuestionEn: 'What signs do you see on your way to school?',
      prepQuestionAr: 'ما هي العلامات التي تراها في طريقك إلى المدرسة؟',
      readingTextEn: 'Stop! The exit is here. Push the door.',
      readingTextAr: 'قف! المخرج هنا. ادفع الباب.',
      cards: [
        { id: 'ep-1', en: 'Stop Sign', ar: 'علامة قف', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9B%91%3C/text%3E%3C/svg%3E' },
        { id: 'ep-2', en: 'Exit', ar: 'مخرج', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9A%AA%3C/text%3E%3C/svg%3E' },
        { id: 'ep-3', en: 'Push', ar: 'ادفع', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9A%AA%3C/text%3E%3C/svg%3E' },
        { id: 'ep-4', en: 'Pull', ar: 'اسحب', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9A%AA%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Safety Signs Recognition', titleAr: 'التعرف على علامات السلامة', duration: '5m', type: 'Visual' },
        { titleEn: 'Public Area Navigation', titleAr: 'التنقل في الأماكن العامة', duration: '7m', type: 'Context' }
      ]
    },
    {
      id: 'r_a1_4',
      titleEn: 'Family & Kinship',
      titleAr: 'العائلة والقرابة',
      descriptionEn: 'Understanding terms for family members and relationships.',
      descriptionAr: 'فهم مصطلحات أفراد العائلة والعلاقات الأسرية.',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50',
      prepQuestionEn: 'Who is the oldest person in your family?',
      prepQuestionAr: 'من هو أكبر شخص سناً في عائلتك؟',
      readingTextEn: 'This is my mother and father. I have a brother and a sister.',
      readingTextAr: 'هذه أمي وأبي. لدي أخ وأخت.',
      cards: [
        { id: 'fk-1', en: 'Mother', ar: 'أم', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%A9%3C/text%3E%3C/svg%3E' },
        { id: 'fk-2', en: 'Father', ar: 'أب', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%A8%3C/text%3E%3C/svg%3E' },
        { id: 'fk-3', en: 'Brother', ar: 'أخ', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%A6%3C/text%3E%3C/svg%3E' },
        { id: 'fk-4', en: 'Sister', ar: 'أخت', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%A7%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Family Tree Vocabulary', titleAr: 'مفردات شجرة العائلة', duration: '10m', type: 'Vocab' },
        { titleEn: 'Identifying Relationships', titleAr: 'تحديد العلاقات الأسرية', duration: '8m', type: 'Social' }
      ]
    },
    {
      id: 'r_a1_5',
      titleEn: 'Social Interaction',
      titleAr: 'التفاعل الاجتماعي',
      descriptionEn: 'Basic greetings and social scripts in written form.',
      descriptionAr: 'التحيات الأساسية والنصوص الاجتماعية المكتوبة.',
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50',
      prepQuestionEn: 'What do you say when you meet someone new?',
      prepQuestionAr: 'ماذا تقول عندما تقابل شخصاً جديداً؟',
      readingTextEn: 'Hello! How are you? Thank you and please.',
      readingTextAr: 'مرحباً! كيف حالك؟ شكراً لك ومن فضلك.',
      cards: [
        { id: 'si-1', en: 'Hello', ar: 'مرحباً', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%8B%3C/text%3E%3C/svg%3E' },
        { id: 'si-2', en: 'Goodbye', ar: 'وداعاً', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%8B%3C/text%3E%3C/svg%3E' },
        { id: 'si-3', en: 'Thank you', ar: 'شكراً لك', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%89%3C/text%3E%3C/svg%3E' },
        { id: 'si-4', en: 'Please', ar: 'من فضلك', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%99%8F%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Polite Phrases Mastery', titleAr: 'إتقان العبارات المهذبة', duration: '6m', type: 'Social' },
        { titleEn: 'Responding to Greetings', titleAr: 'الرد على التحيات', duration: '9m', type: 'Dialogue' }
      ]
    }
  ],
  A2: [
    {
      id: 'r_a2_1',
      titleEn: 'Daily Routines & Habits',
      titleAr: 'الروتين اليومي والعادات',
      descriptionEn: 'Reading schedules, professional habits, and time management.',
      descriptionAr: 'قراءة الجداول والعادات المهنية وإدارة الوقت.',
      color: 'bg-cyan-600',
      lightColor: 'bg-cyan-50',
      prepQuestionEn: 'What time does your busy day finally end, and how do you organize it?',
      prepQuestionAr: 'في أي وقت ينتهي يومك الحافل، وكيف تنظمه؟',
      readingTextEn: 'My morning starts when the sun rises. I strictly follow a schedule to stay organized. First, I prepare my materials for work. Then, I commute to the office. It is a productive habit that keeps me focused.',
      readingTextAr: 'يبدأ صباحي عندما تشرق الشمس. أتبع جدولاً زمنياً بدقة لأبقى منظماً. أولاً، أجهز موادي للعمل. ثم، أنتقل إلى المكتب. إنها عادة مثمرة تجعلني مركزاً.',
      cards: [
        { id: 'dr-1', en: 'Schedule', ar: 'جدول زمني', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%85%3C/text%3E%3C/svg%3E' },
        { id: 'dr-2', en: 'Organized', ar: 'منظم', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%97%82%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'dr-3', en: 'Commute', ar: 'التنقل (للعمل)', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%234f46e5%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%237c3aed%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9A%87%3C/text%3E%3C/svg%3E' },
        { id: 'dr-4', en: 'Productive', ar: 'مثمر / منتج', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9C%85%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Frequency Adverbs Mastery', titleAr: 'إتقان ظروف التكرار', duration: '12m', type: 'Grammar' },
        { titleEn: 'Time Management in Reading', titleAr: 'إدارة الوقت في القراءة', duration: '15m', type: 'Syllabus' }
      ]
    },
    {
      id: 'r_a2_2',
      titleEn: 'The Narrative Journey',
      titleAr: 'الرحلة السردية',
      descriptionEn: 'Understanding story structure: conflict and resolution.',
      descriptionAr: 'فهم هيكل القصة: الصراع والحل.',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      prepQuestionEn: 'Can a small event change the whole direction of a story?',
      prepQuestionAr: 'هل يمكن لحدث صغير أن يغير اتجاه القصة بالكامل؟',
      readingTextEn: 'The journey began at dawn. The traveler encountered a mysterious stranger on the road. A conflict arose when the path was blocked. Eventually, they found a peaceful resolution through cooperation and patience.',
      readingTextAr: 'بدأت الرحلة عند الفجر. واجه المسافر غريباً غامضاً على الطريق. نشأ صراع عندما تم سد المسار. وفي النهاية، وجدوا حلاً سلمياً من خلال التعاون والصبر.',
      cards: [
        { id: 'na-1', en: 'Encountered', ar: 'واجه / صادف', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A4%9D%3C/text%3E%3C/svg%3E' },
        { id: 'na-2', en: 'Conflict', ar: 'صراع', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9A%94%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'na-3', en: 'Resolution', ar: 'حل (للمشكلة)', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%95%8A%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'na-4', en: 'Cooperation', ar: 'تعاون', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A4%9D%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Sequencing Key Events', titleAr: 'تسلسل الأحداث الرئيسية', duration: '10m', type: 'Logic' },
        { titleEn: 'Character Evolution', titleAr: 'تطور الشخصيات', duration: '12m', type: 'Literary' }
      ]
    },
    {
      id: 'r_a2_3',
      titleEn: 'Smart Communication',
      titleAr: 'التواصل الذكي',
      descriptionEn: 'Etiquette in digital correspondence and professional replies.',
      descriptionAr: 'الإتيكيت في المراسلات الرقمية والردود المهنية.',
      color: 'bg-sky-600',
      lightColor: 'bg-sky-50',
      prepQuestionEn: 'Why is it important to be clear and concise in a professional message?',
      prepQuestionAr: 'لماذا من المهم أن تكون واضحاً ومختصراً في الرسالة المهنية؟',
      readingTextEn: 'Digital etiquette is vital for success. Always include a clear subject line and a polite greeting. Be concise in your body text to respect the recipient\'s time. Don\'t forget to check the attachment before sending.',
      readingTextAr: 'الإتيكيت الرقمي حيوي للنجاح. قم دائماً بتضمين سطر موضوع واضح وتحية مهذبة. كن مختصراً في نص الرسالة لاحترام وقت المستلم. لا تنسَ التحقق من المرفق قبل الإرسال.',
      cards: [
        { id: 'dc-1', en: 'Etiquette', ar: 'إتيكيت / آداب', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%234f46e5%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%237c3aed%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8E%A9%3C/text%3E%3C/svg%3E' },
        { id: 'dc-2', en: 'Concise', ar: 'مختصر / وجيز', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9C%82%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'dc-3', en: 'Recipient', ar: 'مستلم', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%A8%3C/text%3E%3C/svg%3E' },
        { id: 'dc-4', en: 'Attachment', ar: 'مرفق', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%234f46e5%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%237c3aed%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%8E%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Email Layout Basics', titleAr: 'أساسيات تنسيق البريد', duration: '15m', type: 'Functional' },
        { titleEn: 'Professional Closings', titleAr: 'الخواتيم المهنية', duration: '10m', type: 'Modern' }
      ]
    },
    {
      id: 'r_a2_4',
      titleEn: 'Public Navigation',
      titleAr: 'التنقل في الأماكن العامة',
      descriptionEn: 'Reading signs in healthcare and transport hubs.',
      descriptionAr: 'قراءة اللوحات في الرعاية الصحية ومراكز النقل.',
      color: 'bg-teal-600',
      lightColor: 'bg-teal-50',
      prepQuestionEn: 'How would you ask for specific facilities in a large hospital?',
      prepQuestionAr: 'كيف تطلب مرافق محددة في مستشفى كبير؟',
      readingTextEn: 'Public facilities require specific navigation. At the reception, state your purpose clearly. Follow the colored lines on the floor to find the laboratory or the pharmacy. Always respect safety signs in the building.',
      readingTextAr: 'تتطلب المرافق العامة ملاحة محددة. في الاستقبال، حدد غرضك بوضوح. اتبع الخطوط الملونة على الأرض للعثور على المختبر أو الصيدلية. احترم دائماً علامات السلامة في المبنى.',
      cards: [
        { id: 'ps-1', en: 'Facilities', ar: 'مرافق', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8F%A2%3C/text%3E%3C/svg%3E' },
        { id: 'ps-2', en: 'Reception', ar: 'استقبال', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9B%8E%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'ps-3', en: 'Navigation', ar: 'ملاحة / تنقل', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%AD%3C/text%3E%3C/svg%3E' },
        { id: 'ps-4', en: 'Laboratory', ar: 'مختبر', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%AA%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Facility Vocabulary', titleAr: 'مفردات المرافق', duration: '12m', type: 'Health' },
        { titleEn: 'Directional Reading', titleAr: 'قراءة الاتجاهات', duration: '15m', type: 'Practical' }
      ]
    },
    {
      id: 'r_a2_5',
      titleEn: 'Perspectives & Reviews',
      titleAr: 'وجهات النظر والمراجعات',
      descriptionEn: 'Forming opinions on modern innovation and quality.',
      descriptionAr: 'تكوين آراء حول الابتكار والجودة الحديثة.',
      color: 'bg-orange-600',
      lightColor: 'bg-orange-50',
      prepQuestionEn: 'Do you prefer modern innovation or classic reliable styles?',
      prepQuestionAr: 'هل تفضل الابتكار الحديث أم الأنماط الكلاسيكية الموثوقة؟',
      readingTextEn: 'Critics debate the quality of modern innovation. While some find it innovative, my personal preference is for classic styles that prioritize detail. I value a clear perspective when evaluating any product.',
      readingTextAr: 'يناقش النقاد جودة الابتكار الحديث. بينما يجد البعض أنه مبتكر، فإن تفضيلي الشخصي هو للأنماط الكلاسيكية التي تعطي الأولوية للتفاصيل. أنا أقدر وجهة النظر الواضحة عند تقييم أي منتج.',
      cards: [
        { id: 'to-1', en: 'Innovative', ar: 'مبتكر', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%A1%3C/text%3E%3C/svg%3E' },
        { id: 'to-2', en: 'Preference', ar: 'تفضيل', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%8D%3C/text%3E%3C/svg%3E' },
        { id: 'to-3', en: 'Perspective', ar: 'وجهة نظر / منظور', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%81%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'to-4', en: 'Quality', ar: 'جودة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%8E%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Subjective Language', titleAr: 'اللغة الذاتية', duration: '10m', type: 'Social' },
        { titleEn: 'Comparative Analysis', titleAr: 'التحليل المقارن', duration: '12m', type: 'Vocab' }
      ]
    }
  ],
  B1: [
    {
      id: 'r_b1_1',
      titleEn: 'Travel Dynamics & Culture',
      titleAr: 'ديناميكيات السفر والثقافة',
      descriptionEn: 'Deep dive into travel itineraries, local customs, and cultural navigation.',
      descriptionAr: 'تعمق في مسارات السفر، والعادات المحلية، والملاحة الثقافية.',
      color: 'bg-emerald-700',
      lightColor: 'bg-emerald-50',
      prepQuestionEn: 'How can understanding local customs enhance your travel experience?',
      prepQuestionAr: 'كيف يمكن لفهم العادات المحلية أن يحسن تجربة سفرك؟',
      readingTextEn: 'The itinerary is carefully designed to include both historic landmarks and local cultural workshops. Travelers are encouraged to respect local customs, such as traditional dress codes and polite greetings. Navigating a new culture requires patience and a keen observation of social cues.',
      readingTextAr: 'تم تصميم مسار الرحلة بعناية ليشمل كلاً من المعالم التاريخية وورش العمل الثقافية المحلية. يتم تشجيع المسافرين على احترام العادات المحلية، مثل قواعد اللباس التقليدي والتحيات المهذبة. تتطلب الملاحة في ثقافة جديدة الصبر والملاحظة الدقيقة للإشارات الاجتماعية.',
      cards: [
        { id: 'td-1', en: 'Destination', ar: 'وجهة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%8D%3C/text%3E%3C/svg%3E' },
        { id: 'td-2', en: 'Itinerary', ar: 'مسار الرحلة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%97%BA%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'td-3', en: 'Customs', ar: 'عادات / تقاليد', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9B%82%3C/text%3E%3C/svg%3E' },
        { id: 'td-4', en: 'Landmark', ar: 'معلم بارز', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%97%BC%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Booking a Flight Online', titleAr: 'حجز رحلة طيران عبر الإنترنت', duration: '15m', type: 'Functional' },
        { titleEn: 'Cultural Nuances in London', titleAr: 'الفروق الثقافية في لندن', duration: '20m', type: 'Culture' }
      ]
    },
    {
      id: 'r_b1_2',
      titleEn: 'Professional Echo & Ethics',
      titleAr: 'الصدى الاحترافي والأخلاقيات',
      descriptionEn: 'Mastering workplace memos, professional etiquette, and efficient communication.',
      descriptionAr: 'إتقان مذكرات العمل، وآداب المهنة، والتواصل الفعال.',
      color: 'bg-slate-700',
      lightColor: 'bg-slate-50',
      prepQuestionEn: 'Why is professional efficiency tied to clear communication?',
      prepQuestionAr: 'لماذا يرتبط الكفاءة المهنية بالتواصل الواضح؟',
      readingTextEn: 'Maintaining professional efficiency is directly linked to meeting strict deadlines. Formal communication ensures that all team members are on the same page. Workplace etiquette, like respecting colleagues\' time, creates a collaborative and productive environment.',
      readingTextAr: 'يرتبط الحفاظ على الكفاءة المهنية ارتباطاً مباشراً بالالتزام بالمواعيد النهائية الصارمة. يضمن التواصل الرسمي أن يكون جميع أعضاء الفريق في نفس الصفحة. تخلق آداب مكان العمل، مثل احترام وقت الزملاء، بيئة تعاونية ومنتجة.',
      cards: [
        { id: 'pe-1', en: 'Deadline', ar: 'الموعد النهائي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%8F%B3%3C/text%3E%3C/svg%3E' },
        { id: 'pe-2', en: 'Efficient', ar: 'كفء / فعال', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9A%A1%3C/text%3E%3C/svg%3E' },
        { id: 'pe-3', en: 'Formal', ar: 'رسمي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%91%94%3C/text%3E%3C/svg%3E' },
        { id: 'pe-4', en: 'Collaboration', ar: 'تعاون', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A4%9D%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Email Etiquette', titleAr: 'إتيكيت البريد الإلكتروني', duration: '18m', type: 'Work' },
        { titleEn: 'Team Collaboration Terms', titleAr: 'مصطلحات تعاون الفريق', duration: '15m', type: 'Vocab' }
      ]
    },
    {
      id: 'r_b1_3',
      titleEn: 'Health & Holistic Wellness',
      titleAr: 'الصحة والرفاهية الشاملة',
      descriptionEn: 'Scientific perspectives on fitness, mental health, and holistic wellness.',
      descriptionAr: 'منظور علمي حول اللياقة البدنية، والصحة العقلية، والرفاهية الشاملة.',
      color: 'bg-teal-700',
      lightColor: 'bg-teal-50',
      prepQuestionEn: 'How can mindfulness contribute to long-term health?',
      prepQuestionAr: 'كيف يمكن لليقظة الذهنية أن تساهم في الصحة على المدى الطويل؟',
      readingTextEn: 'A holistic approach to wellness includes consistent exercise and mental rejuvenation. Practicing mindfulness can significantly lower cortisol levels and improve focus. Understanding your body\'s needs is essential for maintaining vitality throughout the day.',
      readingTextAr: 'يتضمن النهج الشامل للرفاهية ممارسة التمارين الرياضية المتسقة وتجديد النشاط العقلي. يمكن لممارسة اليقظة الذهنية أن تقلل بشكل كبير من مستويات الكورتيزول وتحسن التركيز. فهم احتياجات جسمك أمر ضروري للحفاظ على الحيوية طوال اليوم.',
      cards: [
        { id: 'hw-1', en: 'Mindfulness', ar: 'اليقظة الذهنية', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%98%3C/text%3E%3C/svg%3E' },
        { id: 'hw-2', en: 'Wellness', ar: 'رفاهية / عافية', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%98%3C/text%3E%3C/svg%3E' },
        { id: 'hw-3', en: 'Exercise', ar: 'تمرين', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8F%8B%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'hw-4', en: 'Vitality', ar: 'حيوية / نشاط', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%9E%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Describing Symptoms', titleAr: 'وصف الأعراض', duration: '12m', type: 'Health' },
        { titleEn: 'Healthy Habits', titleAr: 'عادات صحية', duration: '10m', type: 'Life' }
      ]
    }
  ],
  B2: [
    {
      id: 'r_b2_1',
      titleEn: 'Rhetoric, Logic & Edge',
      titleAr: 'البلاغة، المنطق والقوة',
      descriptionEn: 'Mastering persuasive mechanics, logical fallacies, and social influence.',
      descriptionAr: 'إتقان آليات الإقناع، والمغالطات المنطقية، والتأثير الاجتماعي.',
      color: 'bg-zinc-800',
      lightColor: 'bg-zinc-50',
      prepQuestionEn: 'How can identifying a logical fallacy change a debate\'s outcome?',
      prepQuestionAr: 'كيف يمكن لتحديد مغالطة منطقية أن يغير نتيجة المناظرة؟',
      readingTextEn: 'Persuasive communication relies on the ancient pillars of Ethos, Pathos, and Logos. However, modern rhetoric also involves identifying logical fallacies that often deceive the audience. Mastering these tools gives you a strategic edge in any formal or informal negotiation.',
      readingTextAr: 'يعتمد التواصل المقنع على الأركان القديمة: الإقناع الأخلاقي والعاطفي والمنطقي. ومع ذلك، تشمل البلاغة الحديثة أيضاً تحديد المغالطات المنطقية التي غالباً ما تخدع الجمهور. إتقان هذه الأدوات يمنحك أفضلية استراتيجية في أي مفاوضات رسمية أو غير رسمية.',
      cards: [
        { id: 're-1', en: 'Persuade', ar: 'يقنع', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%97%A3%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 're-2', en: 'Rhetoric', ar: 'بلاغة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8E%A4%3C/text%3E%3C/svg%3E' },
        { id: 're-3', en: 'Ethos', ar: 'المنطق الأخلاقي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8F%9B%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 're-4', en: 'Fallacy', ar: 'مغالطة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9A%A0%EF%B8%8F%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Logical Fallacies', titleAr: 'المغالطات المنطقية', duration: '25m', type: 'Logic' },
        { titleEn: 'Speech Analysis: MLK', titleAr: 'تحليل الخطاب: لوثر كينغ', duration: '30m', type: 'Case Study' }
      ]
    },
    {
      id: 'r_b2_2',
      titleEn: 'Technological Frontier & AI',
      titleAr: 'الآفاق التكنولوجية والذكاء الاصطناعي',
      descriptionEn: 'Critical analysis of AI integration, automation, and digital ethics.',
      descriptionAr: 'تحليل نقدي لدمج الذكاء الاصطناعي، والأتمتة، والأخلاقيات الرقمية.',
      color: 'bg-blue-900',
      lightColor: 'bg-blue-50',
      prepQuestionEn: 'What are the primary ethical concerns when automating human-centric jobs?',
      prepQuestionAr: 'ما هي المخاوف الأخلاقية الأساسية عند أتمتة الوظائف التي تتمحور حول الإنسان؟',
      readingTextEn: 'The integration of Artificial Intelligence into daily workflows is accelerating at an unprecedented pace. While automation increases efficiency, it also raises critical questions about data privacy and job security. Ethical considerations must guide technological development to ensure human progress.',
      readingTextAr: 'يتسارع دمج الذكاء الاصطناعي في سير العمل اليومي بوتيرة غير مسبوقة. بينما تزيد الأتمتة من الكفاءة، فإنها تثير أيضاً أسئلة حرجة حول خصوصية البيانات والأمن الوظيفي. يجب أن توجه الاعتبارات الأخلاقية التطور التكنولوجي لضمان التقدم البشري.',
      cards: [
        { id: 'tf-1', en: 'Automation', ar: 'أتمتة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A4%96%3C/text%3E%3C/svg%3E' },
        { id: 'tf-2', en: 'Ethics', ar: 'أخلاقيات', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9A%96%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'tf-3', en: 'Innovation', ar: 'ابتكار', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%A1%3C/text%3E%3C/svg%3E' },
        { id: 'tf-4', en: 'Privacy', ar: 'خصوصية', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%94%92%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'AI Ethics Debate', titleAr: 'مناظرة أخلاقيات الذكاء الاصطناعي', duration: '20m', type: 'Debate' },
        { titleEn: 'The Future of Content', titleAr: 'مستقبل المحتوى', duration: '15m', type: 'Industry' }
      ]
    },
    {
      id: 'r_b2_3',
      titleEn: 'Global Economy & Trends',
      titleAr: 'الاقتصاد العالمي والاتجاهات',
      descriptionEn: 'Interpreting global trade, market shifts, and economic volatility.',
      descriptionAr: 'تفسير التجارة العالمية، وتحولات السوق، والتقلبات الاقتصادية.',
      color: 'bg-amber-700',
      lightColor: 'bg-amber-50',
      prepQuestionEn: 'How does global inflation affect emerging markets differently?',
      prepQuestionAr: 'كيف يؤثر التضخم العالمي على الأسواق الناشئة بشكل مختلف؟',
      readingTextEn: 'The global economy is currently undergoing major shifts due to changing trade policies and rising inflation. Market trends suggest a move towards sustainable investment. Understanding economic indicators is crucial for predicting future volatility in emerging markets.',
      readingTextAr: 'يمر الاقتصاد العالمي حالياً بتحولات كبرى بسبب تغير السياسات التجارية وارتفاع التضخم. تشير اتجاهات السوق إلى التحرك نحو الاستثمار المستدام. فهم المؤشرات الاقتصادية أمر بالغ الأهمية للتنبؤ بالتقلبات المستقبلية في الأسواق الناشئة.',
      cards: [
        { id: 'ge-1', en: 'Inflation', ar: 'تضخم', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%88%3C/text%3E%3C/svg%3E' },
        { id: 'ge-2', en: 'Volatility', ar: 'تقلب', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%89%3C/text%3E%3C/svg%3E' },
        { id: 'ge-3', en: 'Market', ar: 'سوق', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9B%92%3C/text%3E%3C/svg%3E' },
        { id: 'ge-4', en: 'Investment', ar: 'استثمار', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%8A%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Macroeconomic Principles', titleAr: 'مبادئ الاقتصاد الكلي', duration: '22m', type: 'Finance' },
        { titleEn: 'Sustainable Investment', titleAr: 'الاستثمار المستدام', duration: '18m', type: 'Trend' }
      ]
    }
  ],
  C1: [
    {
      id: 'r_c1_1',
      titleEn: 'Critical Review & Literary Merit',
      titleAr: 'المراجعة النقدية والجدارة الأدبية',
      descriptionEn: 'Advanced evaluation of literary merit, structural choices, and narrative fragmentation.',
      descriptionAr: 'تقييم متقدم للجدارة الأدبية، والخيارات الهيكلية، وتفتت السرد.',
      color: 'bg-stone-900',
      lightColor: 'bg-stone-50',
      prepQuestionEn: 'How does narrative fragmentation affect the reader\'s perception of truth?',
      prepQuestionAr: 'كيف يؤثر تفتت السرد على إدراك القارئ للحقيقة؟',
      readingTextEn: 'The intentional fragmentation of the narrative reflects the protagonist\'s deteriorating mental state and the subjective nature of memory. Structural choices in modern literature are not mere coincidences; they are calculated moves to challenge the reader\'s expectations and redefine the boundaries of storytelling.',
      readingTextAr: 'يعكس التفتت المتعمد للسرد تدهور الحالة الذهنية للبطل والطبيعة الذاتية للذاكرة. الخيارات الهيكلية في الأدب الحديث ليست مجرد مصادفات؛ إنها تحركات محسوبة لتحدي توقعات القارئ وإعادة تعريف حدود سرد القصص.',
      cards: [
        { id: 'cr-1', en: 'Aesthetic', ar: 'جمالي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8E%A8%3C/text%3E%3C/svg%3E' },
        { id: 'cr-2', en: 'Fragmentation', ar: 'تفتت / تجزئة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%A9%3C/text%3E%3C/svg%3E' },
        { id: 'cr-3', en: 'Protagonist', ar: 'البطل / الشخصية الرئيسية', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A6%B8%3C/text%3E%3C/svg%3E' },
        { id: 'cr-4', en: 'Subjective', ar: 'ذاتي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%234f46e5%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%237c3aed%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%AD%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Deconstructionism', titleAr: 'التفكيكية', duration: '40m', type: 'Theory' },
        { titleEn: 'Complex Satire Analysis', titleAr: 'تحليل الهجاء المعقد', duration: '35m', type: 'Advanced' }
      ]
    },
    {
      id: 'r_c1_2',
      titleEn: 'Sociolinguistic Flux',
      titleAr: 'التدفق اللغوي والاجتماعي',
      descriptionEn: 'How language evolves with social movements.',
      descriptionAr: 'كيف تتطور اللغة مع الحركات الاجتماعية.',
      color: 'bg-indigo-900',
      lightColor: 'bg-indigo-50',
      prepQuestionEn: 'Can language change the way we think about the world?',
      prepQuestionAr: 'هل يمكن للغة أن تغير الطريقة التي نفكر بها في العالم؟',
      readingTextEn: 'Socio-political context dictates the evolution of vernacular. Linguistic shifts often mirror deep-seated societal changes.',
      readingTextAr: 'يحدد السياق الاجتماعي والسياسي تطور اللغة العامية. غالباً ما تعكس التحولات اللغوية تغيرات مجتمعية عميقة.',
      cards: [
        { id: 'sf-1', en: 'Vernacular', ar: 'العامية / لغة البلاد', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%AC%3C/text%3E%3C/svg%3E' },
        { id: 'sf-2', en: 'Connotation', ar: 'دلالة إيحائية', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%AC%3C/text%3E%3C/svg%3E' },
        { id: 'sf-3', en: 'Sociolinguistics', ar: 'علم اللغة الاجتماعي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%97%A3%EF%B8%8F%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Dialectical Variations', titleAr: 'الاختلافات اللهجية', duration: '30m', type: 'Ling' },
        { titleEn: 'Language & Identity', titleAr: 'اللغة والهوية', duration: '25m', type: 'Sociology' }
      ]
    },
    {
      id: 'r_c1_3',
      titleEn: 'Ethical Dilemmas',
      titleAr: 'المعضلات الأخلاقية',
      descriptionEn: 'Analyzing philosophical paradoxes in modern times.',
      descriptionAr: 'تحليل المتناقضات الفلسفية في العصر الحديث.',
      color: 'bg-rose-900',
      lightColor: 'bg-rose-50',
      prepQuestionEn: 'Is it ever ethical to sacrifice the few for the many?',
      prepQuestionAr: 'هل من الأخلاقي التضحية بالقليل من أجل الكثير؟',
      readingTextEn: 'The utilitarian argument posits that the greatest good for the greatest number is the ultimate moral metric, though critics highlight individual rights.',
      readingTextAr: 'تفترض الحجة النفعية أن أكبر قدر من الخير لأكبر عدد هو المقياس الأخلاقي النهائي، على الرغم من أن النقاد يسلطون الضوء على حقوق الفرد.',
      cards: [
        { id: 'ed-1', en: 'Utilitarianism', ar: 'النفعية', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%9A%96%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'ed-2', en: 'Paradox', ar: 'مفارقة / تناقض', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%99%BE%EF%B8%8F%3C/text%3E%3C/svg%3E' },
        { id: 'ed-3', en: 'Virtue', ar: 'فضيلة', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%9F%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Kant vs Mill', titleAr: 'كانط ضد ميل', duration: '35m', type: 'Philosophy' },
        { titleEn: 'Modern Bioethics', titleAr: 'أخلاقيات علم الأحياء الحديثة', duration: '40m', type: 'Science' }
      ]
    }
  ],
  C2: [
    {
      id: 'r_c2_1',
      titleEn: 'Philosophical Mastery',
      titleAr: 'الإتقان الفلسفي',
      descriptionEn: 'Deep immersion in ethical and existential treatises.',
      descriptionAr: 'انغماس عميق في الأطروحات الأخلاقية والوجودية.',
      color: 'bg-black',
      lightColor: 'bg-slate-100',
      prepQuestionEn: 'Is language the limit of our reality?',
      prepQuestionAr: 'هل اللغة هي حدود واقعنا؟',
      readingTextEn: 'The ontological implications of linguistic relativity remain a central debate in modern cognitive science.',
      readingTextAr: 'تظل الآثار الوجودية للنسبية اللغوية نقاشاً مركزياً في العلوم المعرفية الحديثة.',
      cards: [
        { id: 'pm-1', en: 'Existential', ar: 'وجودي', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%8C%3C/text%3E%3C/svg%3E' },
        { id: 'pm-2', en: 'Cognizant', ar: 'مدرك / واعٍ', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%A0%3C/text%3E%3C/svg%3E' },
        { id: 'pm-3', en: 'Ontology', ar: 'علم الوجود', img: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%230ea5e9%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%232563eb%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%80%3C/text%3E%3C/svg%3E' },
      ],
      selfPacedLessons: [
        { titleEn: 'Phenomenology of Reading', titleAr: 'فينومينولوجيا القراءة', duration: '60m', type: 'Expert' },
        { titleEn: 'Linguistic Archetypes', titleAr: 'الأنماط اللغوية البدائية', duration: '50m', type: 'Cognitive' }
      ]
    }
  ]
};

export const ReadingCurriculumCompanion = ({ 
  lang, 
  level = 'A1', 
  onBack, 
  onStartLesson,
  initialUnitId
}: { 
  lang: 'en' | 'ar', 
  level?: ReadingLevel, 
  onBack: () => void, 
  onStartLesson: (unitId: string) => void,
  initialUnitId?: string | null
}) => {
  const [selectedUnit, setSelectedUnit] = useState<ReadingUnit | null>(null);

  // Auto-select unit if initialUnitId is provided
  useEffect(() => {
    if (initialUnitId) {
      const unit = ALL_READING_UNITS[level].find(u => u.id === initialUnitId);
      if (unit) {
        setSelectedUnit(unit);
        setActiveTab('lessons'); // Switch to lessons tab when auto-starting
      }
    }
  }, [initialUnitId, level]);
  const [activeTab, setActiveTab] = useState<'visual' | 'lessons' | 'lab'>('lab');
  const [loadingLesson, setLoadingLesson] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<{ title: string; step: number } | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (loadingLesson) {
      const timer = setTimeout(() => {
        const lessonTitle = loadingLesson;
        setLoadingLesson(null);
        setActiveLesson({ title: lessonTitle, step: 1 });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loadingLesson]);

  const units = ALL_READING_UNITS[level];

  const handleSpeech = (text: string, voiceLang: string = 'en-US', id: string) => {
    if (speakingId === id) {
      handleStopSpeech();
      return;
    }

    handleStopSpeech();
    
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    utterance.rate = 0.9;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingId(id);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };
    
    utterance.onerror = (e) => {
      console.error('Speech error occurred:', e.error || 'unknown error');
      setIsSpeaking(false);
      setSpeakingId(null);
    };
    
    managedSpeak(utterance);
  };

  const handleStopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingId(null);
  };

  const levelInfoAr = {
    A1: 'بناء الأساس اللغوي',
    A2: 'التواصل والسرد',
    B1: 'الاستقلالية الوظيفية',
    B2: 'التحليل والاستنتاج',
    C1: 'الطلاقة الاستراتيجية',
    C2: 'الإتقان والبراعة'
  };

  const levelInfoEn = {
    A1: 'Foundational Literacy',
    A2: 'Narrative Expansion',
    B1: 'Functional Independence',
    B2: 'Analytical Reasoning',
    C1: 'Strategic Literacy',
    C2: 'Mastery & Nuance'
  };

  return (
    <div className="flex-1 bg-[#f0f4f8] min-h-screen font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={selectedUnit ? () => setSelectedUnit(null) : onBack}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#002147] transition-all active:scale-95"
          >
            <ArrowLeft className={isRtl ? 'rotate-180' : ''} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#002147] text-white rounded-xl">
              <BookOpen size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#002147] leading-none uppercase tracking-tighter">
                {isRtl ? 'منهج القراءة المتقدم' : 'Elite Reading Curriculum'}
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                Level {level} • {isRtl ? levelInfoAr[level] : levelInfoEn[level]}
              </p>
            </div>
          </div>
        </div>
        
        {selectedUnit && (
          <div className="hidden md:flex bg-slate-50 p-1 rounded-2xl border border-slate-200">
            {[
              { id: 'lab', label: isRtl ? 'النص المقروء' : 'Reading Text', icon: BookOpen },
              { id: 'visual', label: isRtl ? 'بنك الكلمات' : 'Visual Bank', icon: ImageIcon },
              { id: 'lessons', label: isRtl ? 'وحدات التعلم' : 'Modules', icon: PlayIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#002147] shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedUnit ? (
            <motion.div 
              key="unit-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-black text-[#002147] leading-tight flex items-center gap-4 flex-wrap">
                    {isRtl ? 'المستوى' : 'Level'} <span className="text-[#C49E3A]">{level}</span>
                    {isRtl ? 'وحدات القراءة' : 'Reading Units'}
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
                    {isRtl 
                      ? `${levelInfoAr[level]}: رحلة استكشافية مصممة لبناء مهارات القراءة المتقدمة وفهم النصوص في سياقها الحقيقي.` 
                      : `${levelInfoEn[level]}: An exploratory journey designed to build advanced literacy and reading comprehension in real-world contexts.`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {units.map((unit, idx) => (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedUnit(unit)}
                    className="group bg-white rounded-[2.5rem] p-8 pb-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${unit.color} opacity-10 rounded-bl-[4rem] group-hover:scale-125 transition-transform`} />
                    <div className={`${unit.lightColor} ${unit.color.replace('bg-', 'text-')} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform`}>
                      <span className="text-2xl font-black">{idx + 1}</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#002147] mb-3 group-hover:text-[#C49E3A] transition-colors">{isRtl ? unit.titleAr : unit.titleEn}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                       {isRtl ? unit.descriptionAr : unit.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-[#002147] group-hover:text-white transition-all">
                          <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unit-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className={`${selectedUnit.lightColor} ${selectedUnit.color.replace('bg-', 'text-')} px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest`}>
                      {isRtl ? 'الوحدة النشطة' : 'Active Module'}
                    </span>
                    <span className="text-slate-300 font-black">/</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{selectedUnit.id}</span>
                  </div>
                  <h2 className="text-5xl font-black text-[#002147] leading-tight">
                    {isRtl ? selectedUnit.titleAr : selectedUnit.titleEn}
                  </h2>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
                    {isRtl ? selectedUnit.descriptionAr : selectedUnit.descriptionEn}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => onStartLesson(selectedUnit.id)}
                      className="px-10 py-5 bg-[#002147] text-white rounded-[2rem] font-black text-sm flex items-center gap-3 hover:bg-[#C49E3A] transition-all shadow-xl"
                    >
                      <PlayIcon fill="currentColor" size={20} />
                      {isRtl ? 'ابدأ الدرس المباشر' : 'Start Live Lesson'}
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-[#C49E3A] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-6">
                        <Brain className="opacity-80" size={32} />
                        <div className="flex gap-2">
                           <button 
                             onClick={() => handleSpeech(selectedUnit.prepQuestionEn, 'en-US', 'mental-prep-en')}
                             className={`p-2 rounded-lg transition-all flex items-center gap-1 ${speakingId === 'mental-prep-en' ? 'bg-white text-[#C49E3A] scale-110' : 'bg-white/20 hover:bg-white/40'}`}
                             title={isRtl ? 'استماع (إنجليزي)' : 'Listen (EN)'}
                           >
                             {speakingId === 'mental-prep-en' ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
                             <span className="text-[10px] font-bold">EN</span>
                           </button>
                           <button 
                             onClick={() => handleSpeech(selectedUnit.prepQuestionAr, 'ar-SA', 'mental-prep-ar')}
                             className={`p-2 rounded-lg transition-all flex items-center gap-1 ${speakingId === 'mental-prep-ar' ? 'bg-white text-[#C49E3A] scale-110' : 'bg-white/20 hover:bg-white/40'}`}
                             title={isRtl ? 'استماع (عربي)' : 'Listen (AR)'}
                           >
                             {speakingId === 'mental-prep-ar' ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
                             <span className="text-[10px] font-bold">AR</span>
                           </button>
                        </div>
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">{isRtl ? 'التهيئة الذهنية' : 'Mental Preparation'}</p>
                      <p className="text-sm font-bold leading-relaxed mb-6">
                         {isRtl ? selectedUnit.prepQuestionAr : selectedUnit.prepQuestionEn}
                      </p>
                      
                      <div className="space-y-3 pt-4 border-t border-white/20">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{isRtl ? 'مفردات هامة' : 'Key Vocabulary'}</p>
                        {selectedUnit.cards.slice(0, 3).map((card) => (
                          <div key={`prep-vocab-${card.id}`} className="flex items-center justify-between bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all">
                            <div className="flex flex-col">
                              <span className="text-xs font-black">{card.en}</span>
                              <span className="text-[10px] opacity-60 font-medium">{card.ar}</span>
                            </div>
                            <div className="flex gap-1">
                              {speakingId === `prep-card-${card.id}` && (
                                <button 
                                  onClick={handleStopSpeech}
                                  className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center transition-all shadow-lg"
                                >
                                  <Square size={14} fill="currentColor" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleSpeech(card.en, 'en-US', `prep-card-${card.id}`)}
                                className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center ${speakingId === `prep-card-${card.id}` ? 'bg-[#002147] text-white scale-110' : 'bg-white/20 hover:bg-white/40'}`}
                              >
                                {speakingId === `prep-card-${card.id}` ? <Pause size={14} fill="currentColor" /> : <Volume2 size={14} />}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-4 md:p-10 border border-slate-200 shadow-sm mt-12 min-h-[600px]">
                <AnimatePresence mode="wait">
                  {activeLesson ? (
                    <motion.div
                      key="lesson-runner"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#002147] rounded-[3rem] p-8 md:p-16 text-white relative flex flex-col justify-center min-h-[500px]"
                    >
                      <button 
                        onClick={() => setActiveLesson(null)}
                        className="absolute top-8 left-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                      >
                        <ArrowLeft className={isRtl ? 'rotate-180' : ''} />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          {isRtl ? 'رجوع' : 'Back'}
                        </span>
                      </button>

                      <div className="max-w-3xl mx-auto w-full">
                        <AnimatePresence mode="wait">
                          {activeLesson.step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center">
                              <div className="flex justify-center gap-4 mb-4">
                                <button 
                                  onClick={() => handleSpeech(selectedUnit.prepQuestionEn, 'en-US', 'internal-prep-en')}
                                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${speakingId === 'internal-prep-en' ? 'bg-[#C49E3A] text-white scale-105 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
                                >
                                  {speakingId === 'internal-prep-en' ? <Square size={18} fill="currentColor" /> : <Volume2 size={18} />}
                                  <span className="text-xs font-bold uppercase">{isRtl ? 'توقف' : 'Listen EN'}</span>
                                </button>
                                <button 
                                  onClick={() => handleSpeech(selectedUnit.prepQuestionAr, 'ar-SA', 'internal-prep-ar')}
                                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${speakingId === 'internal-prep-ar' ? 'bg-[#C49E3A] text-white scale-105 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
                                >
                                  {speakingId === 'internal-prep-ar' ? <Square size={18} fill="currentColor" /> : <Volume2 size={18} />}
                                  <span className="text-xs font-bold uppercase">{isRtl ? 'توقف' : 'Listen AR'}</span>
                                </button>
                              </div>
                              <h3 className="text-4xl font-black">{isRtl ? 'التهيئة الذهنية' : 'Preparation'}</h3>
                              <p className="text-xl text-blue-100/70">{isRtl ? selectedUnit.prepQuestionAr : selectedUnit.prepQuestionEn}</p>
                              <button onClick={() => setActiveLesson({ ...activeLesson, step: 2 })} className="px-12 py-5 bg-[#C49E3A] text-white rounded-full font-black">
                                {isRtl ? 'بدء التحليل' : 'Start Analysis'}
                              </button>
                            </motion.div>
                          )}
                          {activeLesson.step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                               <div className="flex items-center justify-between">
                                 <h3 className="text-xl font-black text-[#C49E3A]">{isRtl ? 'تحليل النص' : 'Text Analysis'}</h3>
                                 <div className="flex gap-2">
                                   <button 
                                     onClick={() => handleSpeech(selectedUnit.readingTextEn, 'en-US', 'internal-text-en')}
                                     className={`p-4 rounded-xl transition-all flex items-center gap-2 ${speakingId === 'internal-text-en' ? 'bg-[#C49E3A] text-white scale-105' : 'bg-white/10 hover:bg-white/20'}`}
                                   >
                                     {speakingId === 'internal-text-en' ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
                                     <span className="text-[10px] font-black underline uppercase">EN</span>
                                   </button>
                                   <button 
                                     onClick={() => handleSpeech(selectedUnit.readingTextAr, 'ar-SA', 'internal-text-ar')}
                                     className={`p-4 rounded-xl transition-all flex items-center gap-2 ${speakingId === 'internal-text-ar' ? 'bg-[#C49E3A] text-white scale-105' : 'bg-white/10 hover:bg-white/20'}`}
                                   >
                                     {speakingId === 'internal-text-ar' ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
                                     <span className="text-[10px] font-black underline uppercase">AR</span>
                                   </button>
                                 </div>
                               </div>
                               <div className="bg-white p-8 rounded-[2.5rem] text-[#002147] shadow-inner max-h-[300px] overflow-y-auto">
                                  <ReactMarkdown>{isRtl ? selectedUnit.readingTextAr : selectedUnit.readingTextEn}</ReactMarkdown>
                               </div>
                               <button onClick={() => setActiveLesson({ ...activeLesson, step: 3 })} className="w-full py-6 bg-[#C49E3A] text-white rounded-3xl font-black">
                                 {isRtl ? 'أنهِ الدرس' : 'Finish Lesson'}
                               </button>
                            </motion.div>
                          )}
                          {activeLesson.step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
                               <CheckCircle2 size={64} className="mx-auto text-emerald-500" />
                               <h4 className="text-4xl font-black">{isRtl ? 'رائع!' : 'Excellent!'}</h4>
                               <button onClick={() => setActiveLesson(null)} className="px-16 py-6 bg-white text-[#002147] rounded-full font-black">
                                 {isRtl ? 'العودة للمنهج' : 'Return'}
                               </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 border-b border-slate-100 pb-10">
                        {[
                          { id: 'lab', label: isRtl ? 'النص المقروء' : 'Reading Text', icon: BookOpen, color: 'bg-indigo-600' },
                          { id: 'lessons', label: isRtl ? 'وحدات التعلم' : 'Modules', icon: PlayIcon, color: 'bg-emerald-600' },
                          { id: 'visual', label: isRtl ? 'بنك الكلمات' : 'Visual Bank', icon: ImageIcon, color: 'bg-blue-600' },
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-5 px-8 rounded-3xl flex items-center justify-center gap-2 transition-all ${
                              activeTab === tab.id ? `${tab.color} text-white shadow-lg` : 'bg-slate-50 text-slate-400 font-bold'
                            }`}
                          >
                            <tab.icon size={20} />
                            <span className="text-xs uppercase tracking-tighter">{tab.label}</span>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {activeTab === 'visual' && (
                          <motion.div key="visual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {selectedUnit.cards.map((card) => (
                              <div key={card.id} className="bg-slate-50 rounded-3xl p-4 border border-slate-200">
                                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                                   <img src={card.img} alt={card.en} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="text-center">
                                   <h4 className="font-black text-[#002147]">{card.en}</h4>
                                   <p className="text-slate-400 font-bold text-sm tracking-wide">{card.ar}</p>
                                   <div className="flex items-center justify-center gap-3 mt-3">
                                      <button 
                                        onClick={() => handleSpeech(card.en, 'en-US', `card-en-${card.id}`)} 
                                        className={`p-2 rounded-lg transition-all ${speakingId === `card-en-${card.id}` ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-300 hover:text-[#002147] hover:bg-white'}`}
                                        title={isRtl ? 'استماع إنجليزي' : 'Listen EN'}
                                      >
                                        {speakingId === `card-en-${card.id}` ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
                                      </button>
                                      <button 
                                        onClick={() => handleSpeech(card.ar, 'ar-SA', `card-ar-${card.id}`)} 
                                        className={`p-2 rounded-lg transition-all font-bold text-[10px] ${speakingId === `card-ar-${card.id}` ? 'bg-[#002147] text-white shadow-lg' : 'text-slate-300 hover:text-[#002147] hover:bg-white'}`}
                                        title={isRtl ? 'استماع عربي' : 'Listen AR'}
                                      >
                                        {speakingId === `card-ar-${card.id}` ? <Square size={16} fill="currentColor" /> : 'AR'}
                                      </button>
                                       {speakingId && (
                                         <button 
                                           onClick={handleStopSpeech} 
                                           className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                           title={isRtl ? 'توقف' : 'Stop'}
                                         >
                                           <Square size={16} />
                                         </button>
                                       )}
                                   </div>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {activeTab === 'lessons' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {loadingLesson && (
                              <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-12">
                                 <div className="w-16 h-16 border-4 border-[#002147] border-t-[#C49E3A] rounded-full animate-spin mb-4" />
                                 <p className="text-slate-500 font-black">{isRtl ? 'تحميل...' : 'Loading Module...'}</p>
                              </div>
                            )}
                            {selectedUnit.selfPacedLessons.map((lesson, i) => (
                              <div key={i} onClick={() => setLoadingLesson(isRtl ? lesson.titleAr : lesson.titleEn)} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#002147] shadow-sm group-hover:bg-[#002147] group-hover:text-white transition-all"><PlayIcon fill="currentColor" size={16} /></div>
                                    <div>
                                       <h4 className="font-black text-[#002147]">{isRtl ? lesson.titleAr : lesson.titleEn}</h4>
                                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{lesson.duration} • {lesson.type}</p>
                                    </div>
                                 </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'lab' && (
                          <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center py-10">
                            <h3 className="text-2xl font-black text-[#002147] mb-6">{isRtl ? 'النص التعليمي المعتمد' : 'Official Educational Passage'}</h3>
                            <div className="max-w-4xl w-full p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-[3rem] mb-10 shadow-inner relative group">
                               <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                  <Quote size={48} className="text-[#002147]" />
                                </div>
                               <p className="text-3xl md:text-5xl font-serif text-[#002147] leading-[1.6] md:leading-[1.8] font-medium">
                                  {isRtl ? selectedUnit.readingTextAr : selectedUnit.readingTextEn}
                               </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                               <button 
                                 onClick={() => handleSpeech(selectedUnit.readingTextEn, 'en-US', 'lab-en')} 
                                 className={`px-12 py-6 rounded-full font-black text-sm flex items-center gap-3 transition-all ${speakingId === 'lab-en' ? 'bg-[#C49E3A] text-[#002147] scale-105 shadow-xl' : 'bg-[#002147] text-white hover:bg-[#002147]/90'}`}
                               >
                                  {speakingId === 'lab-en' ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />} 
                                  {isRtl ? 'استماع (EN)' : 'Listen (EN)'}
                               </button>
                               <button 
                                 onClick={() => handleSpeech(selectedUnit.readingTextAr, 'ar-SA', 'lab-ar')} 
                                 className={`px-12 py-6 rounded-full font-black text-sm flex items-center gap-3 transition-all ${speakingId === 'lab-ar' ? 'bg-[#C49E3A] text-[#002147] scale-105 shadow-xl' : 'bg-slate-200 text-[#002147] hover:bg-slate-300'}`}
                               >
                                  {speakingId === 'lab-ar' ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />} 
                                  {isRtl ? 'استماع (AR)' : 'Listen (AR)'}
                               </button>
                               <button 
                                 onClick={handleStopSpeech} 
                                 className={`px-8 py-6 rounded-full font-black text-sm flex items-center gap-3 shadow-lg transition-all ${speakingId ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-300 opacity-50 cursor-not-allowed'}`}
                                 disabled={!speakingId}
                               >
                                  <Square size={20} /> {isRtl ? 'توقف' : 'Stop'}
                               </button>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#002147]/90 backdrop-blur-md px-8 py-4 rounded-[2.5rem] border border-white/20 shadow-2xl flex items-center gap-10 z-50 text-white">
        <button className="flex flex-col items-center gap-1 group">
          <BookOpen size={20} className="group-hover:text-[#C49E3A] transition-colors" />
          <span className="text-[8px] font-black uppercase tracking-widest">{isRtl ? 'المناهج' : 'COURSES'}</span>
        </button>
        <button className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-opacity">
          <Library size={20} className="group-hover:text-[#C49E3A] transition-colors" />
          <span className="text-[8px] font-black uppercase tracking-widest">{isRtl ? 'المكتبة' : 'ARCHIVE'}</span>
        </button>
      </footer>
    </div>
  );
};

const PlayIcon = ({ size, className, fill }: { size?: number, className?: string, fill?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const Plus = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Clock = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
