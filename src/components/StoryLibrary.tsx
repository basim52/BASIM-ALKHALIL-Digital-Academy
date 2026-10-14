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
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const [selectedStory, setSelectedStory] = useState<Story | null>(() => {
    if (initialStoryId) {
      return STORIES.find(s => s.id === initialStoryId) || null;
    }
    return null;
  });

  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const getCoverGradient = (level: string) => {
    switch (level) {
      case 'A1': return 'from-[#002147] via-[#083b70] to-[#1cb0f6]';
      case 'A2': return 'from-[#004d40] via-[#00695c] to-[#00897b]';
      case 'B1': return 'from-[#4a148c] via-[#6a1b9a] to-[#8e24aa]';
      case 'B2': return 'from-[#b71c1c] via-[#c62828] to-[#e53935]';
      case 'C1': return 'from-[#1b5e20] via-[#2e7d32] to-[#388e3c]';
      case 'C2': default: return 'from-[#002147] via-[#1a237e] to-[#C49E3A]';
    }
  };

  const renderFallbackCover = (story: Story) => (
    <div className={`w-full h-full bg-gradient-to-br ${getCoverGradient(story.level)} flex flex-col justify-between p-4 text-white select-none relative overflow-hidden shadow-inner`}>
      {/* Decorative Book Spine & Shapes */}
      <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-black/25 border-r border-white/20" />
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute right-3 top-3 opacity-15 text-white">
        <BookOpen size={44} />
      </div>

      <div className="flex items-center justify-between z-10 pl-2">
        <span className="bg-[#C49E3A] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black shadow-md uppercase tracking-wider">
          {story.level}
        </span>
        <span className="bg-black/30 backdrop-blur-sm text-white/90 text-[9px] font-bold px-2 py-0.5 rounded-md">
          {story.content.split(' ').length} {isRtl ? 'كلمة' : 'words'}
        </span>
      </div>

      <div className="z-10 pl-2 pr-1 my-auto text-center py-1">
        <h3 className="font-black text-base md:text-lg leading-snug drop-shadow-md text-amber-100">
          {isRtl ? story.titleAr : story.titleEn}
        </h3>
        <p className="text-[10px] text-white/80 font-bold mt-1 line-clamp-1 italic">
          {isRtl ? story.titleEn : story.titleAr}
        </p>
      </div>

      <div className="z-10 pl-2 flex items-center justify-between text-[8px] text-white/70 font-mono tracking-widest uppercase border-t border-white/10 pt-1.5">
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
       alert(isRtl ? 'عذراً، متصفحك لا يدعم التعرف على الكلام.' : 'Sorry, your browser does not support speech recognition.');
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
    return (
      <div className={`p-8 max-w-4xl mx-auto w-full ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <button 
          onClick={() => {
            stopSpeak();
            setSelectedStory(null);
            setIsTestMode(false);
            setTestResult(null);
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold"
        >
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للمكتبة' : 'Back to Library'}
        </button>

        {isTestMode ? (
          <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0" />
             
             <header className="mb-12 text-center relative z-10">
                <div className="w-20 h-20 bg-[#C49E3A]/10 text-[#9a7a2c] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                   <Mic size={40} className={isRecording ? 'animate-pulse' : ''} />
                </div>
                <h2 className="text-3xl font-black text-[#002147] mb-2">{isRtl ? 'اختبار مهارة القراءة' : 'Reading Fluency Test'}</h2>
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{isRtl ? 'قم بقراءة النص بوضوح للميكروفون' : 'Read the text clearly into your microphone'}</p>
             </header>

             <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100 relative z-10">
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-700 italic">
                   {selectedStory.content.split(' ').map((word, idx) => {
                     const clean = word.toLowerCase().replace(/[.,!?;:]/g, '');
                     const isWrong = testResult?.mistakes.includes(clean);
                     const isCorrect = testResult && !isWrong;
                     
                     return (
                       <span 
                         key={idx} 
                         className={`mx-1 ${isWrong ? 'text-red-500 line-through' : isCorrect ? 'text-emerald-600 font-bold' : ''}`}
                       >
                         {word}{' '}
                       </span>
                     );
                   })}
                </p>
             </div>

             {testResult ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#002147] text-white p-8 rounded-3xl text-center mb-8 relative z-10 shadow-2xl"
                >
                   <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="w-24 h-24 rounded-full border-4 border-[#C49E3A]/60 flex flex-col items-center justify-center bg-white/5">
                         <span className="text-3xl font-black">{testResult.score}%</span>
                         <span className="text-[10px] font-black uppercase">{isRtl ? 'النتيجة' : 'SCORE'}</span>
                      </div>
                      <div className="text-left">
                         <p className="text-xl font-black mb-1">{testResult.score > 80 ? (isRtl ? 'أداء ممتاز!' : 'Excellent Performance!') : (isRtl ? 'أداء جيد، حاول مجدداً' : 'Good job, keep practicing!')}</p>
                         <p className="text-[#E4C77A] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <RefreshCcw size={14} /> 
                            {isRtl ? `لديك ${testResult.mistakes.length} أخطاء نطق` : `You had ${testResult.mistakes.length} pronunciation mistakes`}
                         </p>
                      </div>
                   </div>
                   <button 
                     onClick={() => {
                       setTestResult(null);
                       setRecordedText("");
                     }}
                     className="bg-[#C49E3A] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                   >
                     {isRtl ? 'إعادة الاختبار' : 'Retake Test'}
                   </button>
                </motion.div>
             ) : (
                <div className="flex flex-col items-center gap-6 relative z-10">
                   <div className="flex items-center gap-4">
                      {isRecording ? (
                         <>
                           <button 
                             onClick={pauseRecording}
                             className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors shadow-sm"
                             title={isRtl ? 'توقف مؤقت' : 'Pause'}
                           >
                             <Pause size={24} />
                           </button>
                           <button 
                             onClick={toggleRecording}
                             className="w-24 h-24 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-200 hover:scale-110 transition-transform pulse-animation"
                           >
                             <Square size={32} fill="currentColor" />
                           </button>
                         </>
                      ) : recordingPaused ? (
                        <>
                           <button 
                             onClick={resumeRecording}
                             className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-200 hover:scale-110 transition-transform"
                           >
                             <Play size={32} fill="currentColor" />
                           </button>
                           <button 
                             onClick={() => {
                               setRecordedText("");
                               setRecordingPaused(false);
                               calculateScore();
                             }}
                             className="w-16 h-16 rounded-full bg-[#C49E3A]/10 text-[#9a7a2c] flex items-center justify-center hover:bg-[#C49E3A]/10 transition-colors shadow-sm"
                           >
                             <CheckCircle2 size={24} />
                           </button>
                        </>
                      ) : (
                        <button 
                          onClick={toggleRecording}
                          className="px-12 py-6 rounded-3xl bg-[#002147] text-white font-black text-lg uppercase tracking-widest flex items-center gap-4 shadow-2xl shadow-[#C49E3A]/30 hover:bg-[#002147] transition-all group"
                        >
                          <Mic size={32} />
                          {isRtl ? 'ابدأ القراءة الآن' : 'Start Reading Now'}
                        </button>
                      )}
                   </div>
                   
                   {isRecording && (
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: [0.5, 1, 0.5] }}
                       transition={{ repeat: Infinity, duration: 1.5 }}
                       className="text-red-500 font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2"
                     >
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        {isRtl ? 'جاري الاستماع...' : 'Listening...'}
                     </motion.div>
                   )}
                </div>
             )}

             <button 
               onClick={() => {
                 setIsTestMode(false);
                 setRecordedText("");
                 setTestResult(null);
               }}
               className="mt-12 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest block mx-auto py-4 underline underline-offset-4"
             >
                {isRtl ? 'الخروج من وضع الاختبار' : 'Exit Test Mode'}
             </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 -z-0" />
            
            <header className="mb-12 text-center relative z-10">
              <span className="bg-[#C49E3A]/10 text-[#9a7a2c] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">{selectedStory.level}</span>
              <h2 className="text-4xl font-black text-[#002147] mb-4">{isRtl ? selectedStory.titleAr : selectedStory.titleEn}</h2>
              <div className="flex items-center justify-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                 <span className="flex items-center gap-2"><BookOpen size={14} /> {selectedStory.content.split(' ').length} words</span>
                 <span className="w-1 h-1 bg-slate-200 rounded-full" />
                 <span className="text-[#9a7a2c]">{t.clickWordHint}</span>
              </div>
            </header>

            <div className="relative z-10">
              <div className={`text-xl md:text-2xl font-serif leading-[2.5] text-slate-700 select-text ${isRtl ? 'text-right' : 'text-left'}`}>
                {selectedStory.content.split(' ').map((word, idx) => {
                  const isActive = activeWordIndex === idx;
                  return (
                    <span 
                      key={idx}
                      onClick={() => handleWordClick(word)}
                      className={`px-1.5 py-0.5 rounded-lg hover:bg-[#C49E3A]/10 hover:text-[#9a7a2c] cursor-pointer transition-all border border-transparent inline-block ${
                        isActive ? 'bg-amber-100 text-[#002147] font-extrabold border-amber-300 scale-105 shadow-xs' : 'hover:border-[#C49E3A]/30'
                      }`}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <button 
                onClick={() => toggleSpeak(selectedStory.content)}
                className={`bg-[#002147] text-white px-8 py-5 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-[#C49E3A] transition-all shadow-xl shadow-[#C49E3A]/30 ${isPaused || !isSpeaking ? 'bg-[#002147]' : 'bg-emerald-600'}`}
              >
                {isSpeaking && !isPaused ? <Pause size={24} /> : <Play size={24} />}
                {isSpeaking && !isPaused 
                  ? (isRtl ? 'إيقاف مؤقت' : 'Pause Audio') 
                  : (isPaused ? (isRtl ? 'استكمال' : 'Resume Story') : (isRtl ? 'استمع للقصة' : 'Listen to Story'))}
              </button>

              <button 
                onClick={handleStartTest}
                className="bg-[#C49E3A] text-white px-8 py-5 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-[#002147] transition-all shadow-xl shadow-amber-100"
              >
                <Mic size={24} />
                {isRtl ? 'اختبار القراءة' : 'Reading Test'}
              </button>

              {isSpeaking && (
                <button 
                  onClick={stopSpeak}
                  className="w-16 h-16 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Square size={24} fill="currentColor" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Word Detail Popup */}
        <AnimatePresence>
          {wordData && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-12 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-50"
            >
              <div className="bg-[#002147] text-white p-8 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1">
                    <h4 className="text-3xl font-black text-white">{wordData.word}</h4>
                    {loadingWord ? (
                      <div className="w-5 h-5 border-2 border-[#C49E3A]/60 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <button onClick={() => {
                        window.speechSynthesis.cancel();
                        const utt = new SpeechSynthesisUtterance(wordData.word);
                        utt.lang = 'en-US';
                        managedSpeak(utt);
                      }} className="text-[#E4C77A] hover:text-white transition-colors">
                        <Volume2 size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-[#E4C77A] text-xs font-bold uppercase tracking-widest mb-4 italic">/ {wordData.pronunciation || '...'} /</p>
                  <div className="bg-white/10 px-4 py-2 rounded-xl inline-block">
                    <p className="text-xl font-black text-[#C49E3A]">{wordData.translation || '...'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setWordData(null)}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 pb-32 md:pb-40 max-w-7xl mx-auto w-full min-w-0 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="mb-12">
        <h2 className="text-3xl font-black text-[#002147]">{t.storyLibrary}</h2>
        <p className="text-slate-400 mt-1 font-medium">{isRtl ? 'طور مهارات القراءة والاستماع عبر مكتبة من القصص العالمية' : 'Develop reading and listening skills through a library of global stories'}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.map((story, sIdx) => (
          <motion.div 
            key={`story-card-${story.id || sIdx}`}
            whileHover={{ y: -10 }}
            onClick={() => handleSelectStory(story)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group cursor-pointer relative"
          >
            <div className="h-48 relative overflow-hidden bg-slate-900 flex items-center justify-center text-slate-300">
               {!story.image || brokenImages[story.id] ? (
                 renderFallbackCover(story)
               ) : (
                 <>
                   <ImageIcon size={48} className="absolute opacity-20" />
                   <img 
                     src={story.image} 
                     alt={story.titleEn} 
                     referrerPolicy="no-referrer"
                     loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10" 
                     onError={() => {
                       setBrokenImages(prev => ({ ...prev, [story.id]: true }));
                     }}
                   />
                   <div className="absolute top-4 left-4 z-20">
                      <span className="bg-[#C49E3A] text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">{story.level}</span>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 z-20">
                      <div className="text-white">
                        <h3 className="font-black text-xl mb-1 leading-tight">{isRtl ? story.titleAr : story.titleEn}</h3>
                        <p className="text-[#E4C77A] text-[10px] font-bold uppercase tracking-widest">{story.content.split(' ').length} {isRtl ? 'كلمة' : 'words'}</p>
                      </div>
                   </div>
                 </>
               )}
            </div>
            <div className="p-6">
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed italic">"{story.content}"</p>
              <div className="flex items-center justify-between">
                <button className="bg-slate-50 text-[#002147] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 group-hover:border-[#C49E3A]/60 group-hover:text-[#9a7a2c] transition-all flex items-center gap-2">
                  <Play size={12} fill="currentColor" />
                  {t.readNow}
                </button>
                <button className="text-slate-300 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-[#002147] to-[#002147] rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mb-20" />
            <Languages size={40} className="mb-6 text-[#E4C77A] opacity-50" />
            <h4 className="text-2xl font-black mb-4">{isRtl ? 'مساعد الترجمة الفوري' : 'Instant Translation Assistant'}</h4>
            <p className="text-[#E4C77A] text-sm leading-relaxed mb-8 flex-1">
              {isRtl 
                ? 'لا تتوقف عند الكلمات الصعبة. اضغط على أي كلمة للحصول على ترجمة فورية ونطق صوتي دقيق مدعوم بالذكاء الاصطناعي.' 
                : "Don't stop at hard words. Click any word for instant translation and accurate AI-powered audio pronunciation."}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">1</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">2</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">3</div>
            </div>
         </div>

         <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mb-6">
               <Search size={32} />
            </div>
            <h4 className="text-xl font-black text-[#002147] mb-2">{isRtl ? 'ابحث عن قصتك المفضلة' : 'Search Your Favorite Story'}</h4>
            <p className="text-slate-400 text-sm mb-8">{isRtl ? 'نظام البحث الذكي سيساعدك في إيجاد المحتوى المناسب لمستواك.' : 'Smart search will help you find content matching your level.'}</p>
            <div className="w-full max-w-md relative">
              <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-4 px-12 focus:outline-none focus:border-[#C49E3A]/60 transition-all font-medium text-sm" placeholder={isRtl ? 'ابحث هنا...' : 'Search here...'} />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
         </div>
      </div>
    </div>
  );
};
