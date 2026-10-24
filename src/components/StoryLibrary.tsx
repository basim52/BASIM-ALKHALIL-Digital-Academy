import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  Volume2, 
  Search, 
  Languages, 
  BookOpen, 
  ArrowLeft,
  X,
  Play,
  Pause,
  Square,
  Heart,
  AlertCircle,
  ImageIcon,
  Mic,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw,
  RotateCcw
} from 'lucide-react';
import { UserProfile, MASTER_ADMINS } from '../types';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { managedSpeak } from '../lib/audio';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace,
} from './ui/academy';

interface Story {
  id: string;
  titleEn: string;
  titleAr: string;
  level: string;
  image: string;
  content: string;
  isKidsStory?: boolean;
}

export const STORIES: Story[] = [
  {
    id: 'kids_story_001',
    titleEn: 'Noor Arrives in London',
    titleAr: 'نور تصل إلى لندن',
    level: 'A1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8E%A1%3C/text%3E%3C/svg%3E',
    content: 'Follow Noor as she lands at Heathrow Airport in London, meets a security officer, buys a ticket, and sets off on her very first interactive adventure!',
    isKidsStory: true
  },
  {
    id: '1',
    titleEn: 'The Little Hero',
    titleAr: 'البطل الصغير',
    level: 'A1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A6%B8%3C/text%3E%3C/svg%3E',
    content: 'Once upon a time, there was a small boy named Sam. Sam loved to help everyone in his village. One day, he found a lost puppy near the river. He carried the puppy home and gave it some milk. The village was proud of the little hero.'
  },
  {
    id: '2',
    titleEn: 'A Weekend in London',
    titleAr: 'عطلة نهاية الأسبوع في لندن',
    level: 'A2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8E%A1%3C/text%3E%3C/svg%3E',
    content: 'London is a magnificent city with a rich history. Sarah visited the Big Ben and walked across the Tower Bridge. She stayed in a cozy hotel near the park. The British weather was rainy, but the atmosphere was magical. She bought several souvenirs for her family back home.'
  },
  {
    id: '3',
    titleEn: 'The Future of AI',
    titleAr: 'مستقبل الذكاء الاصطناعي',
    level: 'B2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A4%96%3C/text%3E%3C/svg%3E',
    content: 'Artificial intelligence is rapidly transforming our global society. From healthcare diagnostics to autonomous vehicles, the integration of smart algorithms is enhancing efficiency. While ethical concerns remain a subject of debate, the potential for human augmentation through technology is undeniable. Modern education systems must adapt to this technological shift.'
  },
  {
    id: '4',
    titleEn: 'The Brave Firefighter',
    titleAr: 'الإطفائي الشجاع',
    level: 'A1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23ec4899%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23db2777%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%A7%91%E2%80%8D%F0%9F%9A%92%3C/text%3E%3C/svg%3E',
    content: 'Jack is a firefighter. He is very brave. Every day, he wears a red uniform and a big helmet. When the bell rings, Jack jumps into the red fire truck. He drives quickly to help people. Jack loves his job because he helps save lives.'
  },
  {
    id: '5',
    titleEn: 'A Journey to the Moon',
    titleAr: 'رحلة إلى القمر',
    level: 'A2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%99%3C/text%3E%3C/svg%3E',
    content: 'Astronauts travel into space using large rockets. In 1969, humans landed on the moon for the first time. They wore special space suits to breathe. The moon has no air and no water. Looking at the Earth from the moon is a beautiful sight that few people have seen.'
  },
  {
    id: '6',
    titleEn: 'The Secret Garden',
    titleAr: 'الحديقة السرية',
    level: 'B1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%B7%3C/text%3E%3C/svg%3E',
    content: 'Mary found an old key buried in the soil. It belonged to a hidden garden that had been locked for ten years. As she opened the door, she saw beautiful roses and tall trees. She decided to take care of the garden. Working in the garden made her feel happy and healthy.'
  },
  {
    id: '7',
    titleEn: 'The Mystery of the Old Clock',
    titleAr: 'لغز الساعة القديمة',
    level: 'B1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%E2%8F%B0%3C/text%3E%3C/svg%3E',
    content: 'In the dusty attic, there stood an ancient wooden clock that never ticked. One evening, thin smoke started coming out of it. Detective Leo was called to investigate the strange event. He found a hidden compartment inside the clock containing a map to a hidden treasure under the stairs.'
  },
  {
    id: '8',
    titleEn: 'Exploring the Amazon',
    titleAr: 'استكشاف الأمازون',
    level: 'B2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%94%A4%3C/text%3E%3C/svg%3E',
    content: 'The Amazon rainforest is the largest tropical forest in the world. It is home to millions of species of plants and animals. Scientists explore this jungle to discover new medicines. However, deforestation is a serious threat to this diverse ecosystem. We must protect it to maintain the balance of our planet.'
  },
  {
    id: '9',
    titleEn: 'The History of Olympics',
    titleAr: 'تاريخ الألعاب الأولمبية',
    level: 'B2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%9C%3C/text%3E%3C/svg%3E',
    content: 'The Olympic Games originated in ancient Greece as a religious festival. Today, the modern Olympics are a major international sporting event featuring thousands of athletes. They compete in various sports to represent their nations. The spirit of the games is about friendship, solidarity, and fair play among different cultures.'
  },
  {
    id: '10',
    titleEn: 'The Impact of Climate Change',
    titleAr: 'تأثير تغير المناخ',
    level: 'C1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23f59e0b%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%23ea580c%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%8C%8D%3C/text%3E%3C/svg%3E',
    content: 'Climate change is primarily driven by anthropogenic greenhouse gas emissions, leading to unprecedented global warming. The melting of polar ice caps and rising sea levels pose significant risks to coastal communities worldwide. Mitigation strategies require international cooperation and a transition toward renewable energy sources. Failure to act swiftly could result in irreversible damage to the biosphere.'
  },
  {
    id: '11',
    titleEn: 'AI in Modern Medicine',
    titleAr: 'الذكاء الاصطناعي في الطب الحديث',
    level: 'C1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2306b6d4%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230891b2%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%8A%3C/text%3E%3C/svg%3E',
    content: 'The implementation of machine learning algorithms in healthcare has revolutionized diagnostic accuracy and personalized treatment plans. AI-driven systems can analyze vast datasets of medical imaging to detect abnormalities at early stages. Furthermore, predictive analytics assist clinicians in anticipating patient outcomes. Despite these advancements, the human element in medicine remains irreplaceable for ethical judgment.'
  },
  {
    id: '12',
    titleEn: 'The Philosophy of Happiness',
    titleAr: 'فلسفة السعادة',
    level: 'C2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%23002147%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%231e4b8f%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%98%8A%3C/text%3E%3C/svg%3E',
    content: 'Philosophical inquiries into the nature of happiness have shifted from purely hedonistic interpretations to eudaimonic perspectives. Eudaimonia emphasizes long-term fulfillment through the realization of one\'s potential and virtuous living. Modern psychology aligns with these ancient concepts, suggesting that purpose and social connection are fundamental pillars of well-being. Ultimately, happiness is a subjective construct influenced by internal and external variables.'
  },
  {
    id: '13',
    titleEn: 'Global Economic Trends',
    titleAr: 'الاتجاهات الاقتصادية العالمية',
    level: 'C2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%93%88%3C/text%3E%3C/svg%3E',
    content: 'The contemporary global economic landscape is characterized by increasing volatility and the rise of decentralized financial systems. Traditional monetary policies are being challenged by the emergence of digital currencies and cross-border trade complexities. Structural shifts in labor markets, driven by automation, necessitate comprehensive policy reforms. Sustaining equitable growth requires a balanced approach between innovation and social safety nets.'
  },
  {
    id: '14',
    titleEn: 'The Golden Treasure',
    titleAr: 'الكنز الذهبي',
    level: 'A1',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%2310b981%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%230d9488%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%92%B0%3C/text%3E%3C/svg%3E',
    content: 'Deep in the heart of the forest, a group of friends found an old wooden box. Inside the box, there were gold coins and beautiful jewelry. They decided to give the treasure to the village museum. Everyone celebrated the discovery of the golden treasure.'
  },
  {
    id: '15',
    titleEn: 'The Magic of Space',
    titleAr: 'سحر الفضاء',
    level: 'B2',
    image: 'data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20300%27%3E%3Cdefs%3E%3ClinearGradient%20id=%27g%27%20x1=%270%27%20y1=%270%27%20x2=%271%27%20y2=%271%27%3E%3Cstop%20offset=%270%27%20stop-color=%27%238b5cf6%27/%3E%3Cstop%20offset=%271%27%20stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width=%27400%27%20height=%27300%27%20fill=%27url(%23g)%27/%3E%3Ccircle%20cx=%27200%27%20cy=%27150%27%20r=%2795%27%20fill=%27white%27%20fill-opacity=%27.16%27/%3E%3Ctext%20x=%27200%27%20y=%27152%27%20font-size=%27120%27%20text-anchor=%27middle%27%20dominant-baseline=%27central%27%3E%F0%9F%9A%80%3C/text%3E%3C/svg%3E',
    content: 'The universe is vast and full of mysteries. Black holes can swallow entire stars, while nebulas create new ones in a dance of light and dust. Exploring the galaxy helps scientists understand how the Earth was formed millions of years ago. It is a journey that requires courage and curiosity.'
  }
];

export const StoryLibrary = ({ lang, profile, onUpdateProfile, onNavigate, onBack, initialStoryId }: { lang: Language, profile: UserProfile, onUpdateProfile: (p: UserProfile) => void, onNavigate: (v: any) => void, onBack: () => void, initialStoryId?: string | null }) => {
  const t = Object.assign((ar: string, en: string) => (lang === 'ar' ? ar : en), translations[lang]);
  const isRtl = lang === 'ar';
  
  const [selectedStory, setSelectedStory] = useState<Story | null>(() => {
    if (initialStoryId) {
      return STORIES.find(s => s.id === initialStoryId) || null;
    }
    return null;
  });

  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const getCoverGradient = (_level: string) => {
    return 'bg-[#002147]';
  };

  const renderFallbackCover = (story: Story) => (
    <div className={`w-full h-full ${getCoverGradient(story.level)} flex flex-col justify-between p-4 text-white select-none relative overflow-hidden`}>
      <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-[#001a38] border-r border-[#C49E3A]/40" />
      <div className="absolute right-3 top-3 opacity-15 text-[#E6C36A]">
        <BookOpen size={44} />
      </div>

      <div className="flex items-center justify-between z-10 pl-2">
        <span className="bg-[#C49E3A] text-[#002147] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
          {story.level}
        </span>
        <span className="bg-[#001a38] text-[#E6C36A] text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#C49E3A]/30">
          {story.content.split(' ').length} {t('كلمة', 'words')}
        </span>
      </div>

      <div className="z-10 pl-2 pr-1 my-auto text-center py-1">
        <h3 className="font-black text-base md:text-lg leading-snug text-[#E6C36A]">
          {isRtl ? story.titleAr : story.titleEn}
        </h3>
        <p className="text-[10px] text-white/80 font-bold mt-1 line-clamp-1 italic">
          {isRtl ? story.titleEn : story.titleAr}
        </p>
      </div>

      <div className="z-10 pl-2 flex items-center justify-between text-[8px] text-[#E6C36A]/80 font-mono tracking-widest uppercase border-t border-[#C49E3A]/20 pt-1.5">
        <span>Alkhalil Audio</span>
        <span>📖 Audio Story</span>
      </div>
    </div>
  );

  React.useEffect(() => {
    if (initialStoryId) {
      const found = STORIES.find(s => s.id === initialStoryId);
      if (found) {
        setSelectedStory(found);
      }
    }
  }, [initialStoryId]);
  const [wordData, setWordData] = useState<{ word: string; translation: string; pronunciation: string } | null>(null);
  const [loadingWord, setLoadingWord] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  
  // Reading Test State
  const [isTestMode, setIsTestMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [testResult, setTestResult] = useState<{ score: number; mistakes: string[] } | null>(null);
  const [recordingPaused, setRecordingPaused] = useState(false);

  React.useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setRecordedText(prev => prev + ' ' + finalTranscript);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        if (isRecording && !recordingPaused) {
          try {
            rec.start();
          } catch (e) {}
        }
      };

      setRecognition(rec);
    }

    return () => {
      window.speechSynthesis.cancel();
      if (recognition) recognition.stop();
    };
  }, []);

  const handleStartTest = () => {
    setIsTestMode(true);
    setRecordedText("");
    setTestResult(null);
    stopSpeak();
  };

  const toggleRecording = () => {
    if (!recognition) {
       alert(t('عذراً، متصفحك لا يدعم التعرف على الكلام.', 'Sorry, your browser does not support speech recognition.'));
       return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      setRecordingPaused(false);
      calculateScore();
    } else {
      setRecordedText("");
      recognition.start();
      setIsRecording(true);
      setRecordingPaused(false);
    }
  };

  const pauseRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setRecordingPaused(true);
      setIsRecording(false);
    }
  };

  const resumeRecording = () => {
    if (recognition && recordingPaused) {
      recognition.start();
      setRecordingPaused(false);
      setIsRecording(true);
    }
  };

  const calculateScore = () => {
    if (!selectedStory) return;
    
    // Simple comparison logic
    const originalWords = selectedStory.content.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    const spokenWords = recordedText.toLowerCase().replace(/[.,!?;:]/g, '').split(/\s+/);
    
    let correctCount = 0;
    const mistakes: string[] = [];
    
    const spokenSet = new Set(spokenWords);
    
    originalWords.forEach(word => {
      if (spokenSet.has(word)) {
        correctCount++;
      } else {
        mistakes.push(word);
      }
    });

    const score = Math.round((correctCount / originalWords.length) * 100);
    setTestResult({ score, mistakes });

    // Save test result to Firestore for reports & analysis
    if (profile && profile.uid) {
      addDoc(collection(db, 'lessonResults'), {
        userId: profile.uid,
        parentIds: (profile as any).linkedParentIds || [],
        lessonId: selectedStory.id,
        courseId: 'story-library',
        level: selectedStory.level,
        lessonTitle: selectedStory.titleEn,
        score: score,
        total: 100,
        timestamp: serverTimestamp()
      }).catch(err => {
        console.error("Error saving story reading test to Firestore:", err);
      });
    }
  };

  const handleSelectStory = async (story: Story) => {
    if (story.isKidsStory) {
      onNavigate('kids-story-player');
      return;
    }
    if (selectedStory?.id === story.id) return;
    setSelectedStory(story);
  };

  const handleWordClick = async (word: string) => {
    const cleanWord = (word || '').replace(/[.,!?;:]/g, '');
    setLoadingWord(true);
    setWordData({ word: cleanWord, translation: '', pronunciation: '' });

    try {
      const resp = await fetch('/api/admin/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { word: cleanWord },
          prompt: `Translate the English word "${cleanWord}" to Arabic and provide a phonetic pronunciation guide. Return JSON: { "translation": "...", "pronunciation": "..." }`
        })
      });

      if (!resp.ok) {
        throw new Error(`Server responded with ${resp.status}`);
      }

      const rawData = await resp.json();
      const text = rawData.text || "";
      const jsonStr = (text || '').replace(/```json|```/g, '').trim();
      const data = JSON.parse(jsonStr);

      setWordData({ word: cleanWord, ...data });
      
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'en-US';
      managedSpeak(utterance);
    } catch (err) {
      console.error("Error translating word:", err);
    } finally {
      setLoadingWord(false);
    }
  };

  const toggleSpeak = (text: string) => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      
      utterance.onboundary = (event: any) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const textAhead = text.substring(0, charIndex);
          const wordsCount = textAhead.trim() === "" ? 0 : textAhead.split(/\s+/).filter(Boolean).length;
          setActiveWordIndex(wordsCount);
        }
      };

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveWordIndex(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveWordIndex(null);
      };
      managedSpeak(utterance);
    }
  };

  const stopSpeak = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveWordIndex(null);
  };

  if (selectedStory) {
    const words = selectedStory.content.split(' ');
    let sentenceStart = -1;
    let sentenceEnd = -1;
    if (activeWordIndex !== null && activeWordIndex >= 0 && activeWordIndex < words.length) {
      sentenceStart = activeWordIndex;
      while (sentenceStart > 0 && !/[.!?]$/.test(words[sentenceStart - 1])) {
        sentenceStart--;
      }
      sentenceEnd = activeWordIndex;
      while (sentenceEnd < words.length - 1 && !/[.!?]$/.test(words[sentenceEnd])) {
        sentenceEnd++;
      }
    }

    return (
      <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-28 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
        <div className="flex items-center justify-between">
          <GhostButton 
            onClick={() => {
              stopSpeak();
              setSelectedStory(null);
              setIsTestMode(false);
              setTestResult(null);
            }}
          >
            <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
            {t('العودة للمكتبة', 'Back to Library')}
          </GhostButton>
        </div>

        {isTestMode ? (
          <GoldCard className="p-5 sm:p-8 relative overflow-hidden">
             <header className="mb-6 text-center relative z-10">
                <div className="w-14 h-14 bg-[#fdfaf3] text-[#C49E3A] border border-[#C49E3A]/40 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                   <Mic size={28} className={isRecording ? 'animate-pulse' : ''} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#002147] mb-1">{t('اختبار مهارة القراءة', 'Reading Fluency Test')}</h2>
                <p className="text-[#002147]/70 font-bold text-xs uppercase tracking-wider">{t('قم بقراءة النص بوضوح للميكروفون', 'Read the text clearly into your microphone')}</p>
             </header>

             <div className="bg-[#fdfaf3] rounded-2xl p-5 sm:p-6 mb-6 border border-[#C49E3A]/40 relative z-10">
                <p className="text-lg sm:text-xl leading-loose text-[#002147]">
                   {words.map((word, idx) => {
                     const clean = word.toLowerCase().replace(/[.,!?;:]/g, '');
                     const isWrong = testResult?.mistakes.includes(clean);
                     const isCorrect = testResult && !isWrong;
                     
                     return (
                       <span 
                         key={idx} 
                         className={`mx-0.5 ${isWrong ? 'text-red-600 line-through' : isCorrect ? 'text-green-700 font-bold' : ''}`}
                       >
                         {word}{' '}
                       </span>
                     );
                   })}
                </p>
             </div>

             {testResult ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#002147] text-white p-6 rounded-2xl border-2 border-[#C49E3A] text-center mb-6 relative z-10 shadow-sm"
                >
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
                      <div className="w-20 h-20 rounded-full border-2 border-[#C49E3A] flex flex-col items-center justify-center bg-[#001a38]">
                         <span className="text-2xl font-black text-[#E6C36A]">{testResult.score}%</span>
                         <span className="text-[10px] font-black uppercase text-white/80">{t('النتيجة', 'SCORE')}</span>
                      </div>
                      <div className={isRtl ? 'text-center sm:text-right' : 'text-center sm:text-left'}>
                         <p className="text-lg font-black text-white mb-1">{testResult.score > 80 ? t('أداء ممتاز!', 'Excellent Performance!') : t('أداء جيد، حاول مجدداً', 'Good job, keep practicing!')}</p>
                         <p className="text-[#E6C36A] text-xs font-bold flex items-center justify-center sm:justify-start gap-1.5">
                            <RefreshCcw size={14} /> 
                            {isRtl ? `لديك ${testResult.mistakes.length} أخطاء نطق` : `You had ${testResult.mistakes.length} pronunciation mistakes`}
                         </p>
                      </div>
                   </div>
                   <PrimaryButton 
                     onClick={() => {
                       setTestResult(null);
                       setRecordedText("");
                     }}
                   >
                     {t('إعادة الاختبار', 'Retake Test')}
                   </PrimaryButton>
                </motion.div>
             ) : (
                <div className="flex flex-col items-center gap-4 relative z-10">
                   <div className="flex flex-wrap items-center justify-center gap-3">
                      {isRecording ? (
                         <>
                           <GhostButton 
                             onClick={pauseRecording}
                             title={t('توقف مؤقت', 'Pause')}
                           >
                             <Pause size={18} />
                             <span>{t('توقف مؤقت', 'Pause')}</span>
                           </GhostButton>
                           <PrimaryButton 
                             onClick={toggleRecording}
                             className="bg-red-600 hover:bg-red-700 text-white border-red-700"
                           >
                             <Square size={18} fill="currentColor" />
                             <span>{t('إيقاف وحساب النتيجة', 'Stop & Score')}</span>
                           </PrimaryButton>
                         </>
                      ) : recordingPaused ? (
                        <>
                           <PrimaryButton onClick={resumeRecording}>
                             <Play size={18} fill="currentColor" />
                             <span>{t('استكمال', 'Resume')}</span>
                           </PrimaryButton>
                           <GhostButton 
                             onClick={() => {
                               setRecordedText("");
                               setRecordingPaused(false);
                               calculateScore();
                             }}
                           >
                             <CheckCircle2 size={18} />
                             <span>{t('اعتماد النتيجة', 'Finish')}</span>
                           </GhostButton>
                        </>
                      ) : (
                        <PrimaryButton onClick={toggleRecording} className="px-6 py-3">
                          <Mic size={20} />
                          <span>{t('ابدأ القراءة الآن', 'Start Reading Now')}</span>
                        </PrimaryButton>
                      )}
                   </div>
                   
                   {isRecording && (
                     <div className="text-red-600 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        {t('جاري الاستماع...', 'Listening...')}
                     </div>
                   )}
                </div>
             )}

             <div className="mt-6 flex justify-center">
               <GhostButton 
                 onClick={() => {
                   setIsTestMode(false);
                   setRecordedText("");
                   setTestResult(null);
                 }}
               >
                 {t('الخروج من وضع الاختبار', 'Exit Test Mode')}
               </GhostButton>
             </div>
          </GoldCard>
        ) : (
          <GoldCard className="p-5 sm:p-8 relative overflow-hidden">
            <header className="mb-6 text-center relative z-10">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                <ProgressPill>📖 {selectedStory.level}</ProgressPill>
                <ProgressPill>{words.length} {t('كلمة', 'words')}</ProgressPill>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002147] mb-2">{isRtl ? selectedStory.titleAr : selectedStory.titleEn}</h2>
              <p className="text-xs font-bold text-[#C49E3A]">{t.clickWordHint}</p>
            </header>

            <div className="relative z-10 bg-[#fdfaf3] rounded-2xl p-4 sm:p-6 border border-[#C49E3A]/30">
              <div className="text-lg sm:text-xl leading-[2.2] text-[#002147] select-text text-left" dir="ltr">
                {words.map((word, idx) => {
                  const isActive = activeWordIndex === idx;
                  const inActiveSentence = activeWordIndex !== null && idx >= sentenceStart && idx <= sentenceEnd;
                  return (
                    <span 
                      key={idx}
                      onClick={() => handleWordClick(word)}
                      className={`px-1 py-0.5 rounded-lg cursor-pointer transition-colors border inline-block ${
                        isActive
                          ? 'bg-[#E6C36A] text-[#002147] font-black border-[#C49E3A]'
                          : inActiveSentence
                          ? 'bg-[#E6C36A]/35 text-[#002147] font-bold border-[#C49E3A]/40'
                          : 'border-transparent hover:bg-[#E6C36A]/20 hover:border-[#C49E3A]/40'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
              <PrimaryButton onClick={() => toggleSpeak(selectedStory.content)}>
                {isSpeaking && !isPaused ? <Pause size={18} /> : <Play size={18} />}
                <span>
                  {isSpeaking && !isPaused 
                    ? t('إيقاف مؤقت', 'Pause Audio') 
                    : (isPaused ? t('استكمال', 'Resume Story') : t('استمع للقصة', 'Listen to Story'))}
                </span>
              </PrimaryButton>

              <GhostButton onClick={handleStartTest}>
                <Mic size={18} />
                <span>{t('اختبار القراءة', 'Reading Test')}</span>
              </GhostButton>

              {isSpeaking && (
                <GhostButton onClick={stopSpeak} aria-label={t('إيقاف', 'Stop')}>
                  <Square size={16} fill="currentColor" />
                </GhostButton>
              )}
            </div>
          </GoldCard>
        )}

        {/* Word Detail Popup */}
        <AnimatePresence>
          {wordData && (
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="fixed bottom-20 left-3 right-3 md:left-1/2 md:-translate-x-1/2 md:max-w-lg z-50"
            >
              <div className="bg-[#002147] text-white p-5 rounded-2xl shadow-md border-2 border-[#C49E3A] flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl sm:text-2xl font-black text-white truncate">{wordData.word}</h4>
                    {loadingWord ? (
                      <div className="w-4 h-4 border-2 border-[#C49E3A] border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <button onClick={() => {
                        window.speechSynthesis.cancel();
                        const utt = new SpeechSynthesisUtterance(wordData.word);
                        utt.lang = 'en-US';
                        managedSpeak(utt);
                      }} className="text-[#E6C36A] hover:text-white transition-colors shrink-0">
                        <Volume2 size={18} />
                      </button>
                    )}
                  </div>
                  <p className="text-[#E6C36A] text-xs font-bold mb-2 italic">/ {wordData.pronunciation || '...'} /</p>
                  <div className="bg-[#001a38] border border-[#C49E3A]/40 px-3 py-1.5 rounded-xl inline-block">
                    <p className="text-base font-black text-[#E6C36A]">{wordData.translation || '...'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWordData(null)}
                  className="w-9 h-9 bg-[#001a38] hover:bg-[#C49E3A] hover:text-[#002147] border border-[#C49E3A]/40 rounded-xl flex items-center justify-center transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionShell>
    );
  }

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-28 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {STORIES.map((story, sIdx) => (
          <div key={`story-card-${story.id || sIdx}`} className="flex flex-col rounded-2xl border border-[#C49E3A]/40 bg-white overflow-hidden shadow-sm">
            <div onClick={() => handleSelectStory(story)} className="h-28 sm:h-36 w-full overflow-hidden bg-[#002147] cursor-pointer">
              {brokenImages[story.id] ? (
                renderFallbackCover(story)
              ) : (
                <img
                  src={story.image}
                  alt={isRtl ? story.titleAr : story.titleEn}
                  onError={() => setBrokenImages(prev => ({ ...prev, [story.id]: true }))}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <LessonTile
              order={sIdx + 1}
              title={isRtl ? story.titleAr : story.titleEn}
              subtitle={`${story.content.split(' ').length} ${t('كلمة', 'words')}`}
              emoji="📖"
              level={story.level}
              onClick={() => handleSelectStory(story)}
              className="!rounded-none !border-0 !shadow-none"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
         <GoldCard className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl">🌐</span>
                <h4 className="text-base sm:text-lg font-black text-[#002147]">{t('مساعد الترجمة الفوري', 'Instant Translation Assistant')}</h4>
              </div>
              <p className="text-[#002147]/75 text-xs sm:text-sm leading-relaxed mb-4">
                {t(
                  'لا تتوقف عند الكلمات الصعبة. اضغط على أي كلمة للحصول على ترجمة فورية ونطق صوتي دقيق مدعوم بالذكاء الاصطناعي.',
                  "Don't stop at hard words. Click any word for instant translation and accurate AI-powered audio pronunciation."
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ProgressPill>1</ProgressPill>
              <ProgressPill>2</ProgressPill>
              <ProgressPill>3</ProgressPill>
            </div>
         </GoldCard>

         <GoldCard className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-xl">🔍</span>
               <h4 className="text-base sm:text-lg font-black text-[#002147]">{t('ابحث عن قصتك المفضلة', 'Search Your Favorite Story')}</h4>
            </div>
            <p className="text-[#002147]/70 text-xs mb-4">{t('نظام البحث الذكي سيساعدك في إيجاد المحتوى المناسب لمستواك.', 'Smart search will help you find content matching your level.')}</p>
            <div className="w-full max-w-md relative">
              <input
                type="text"
                className="w-full bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-xl py-2.5 px-10 focus:outline-none focus:ring-2 focus:ring-[#C49E3A] transition-all font-bold text-xs sm:text-sm text-[#002147]"
                placeholder={t('ابحث هنا...', 'Search here...')}
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C49E3A]" size={16} />
            </div>
         </GoldCard>
      </div>
    </SectionShell>
  );
};

