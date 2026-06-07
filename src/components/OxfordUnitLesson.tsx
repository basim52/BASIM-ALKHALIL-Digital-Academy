import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { Sparkles, HelpCircle, PlayCircle, Square, Image as ImageIcon, BookOpen, Layers, MessageSquare, ChevronRight, Speaker, ArrowLeft, Volume2, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { LANGUAGE_LAB_DATA } from '../data/languageLabData';
import confetti from 'canvas-confetti';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { OXFORD_LESSONS } from '../data/oxfordLessonsData';
import { AILessonCompanion } from './AILessonCompanion';

interface OxfordUnitLessonProps {
  lang: Language;
  unitId: string;
  onBack: () => void;
  userProfile?: any;
}

export const OLD_OXFORD_LESSONS: Record<string, any> = {
  1: {
    bigQuestion: "How do people have fun?",
    bigQuestionAr: "كيف يستمتع الناس؟",
    vocab: [
      { id: 1, word: 'festival', ar: 'مهرجان', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'folk dance', ar: 'رقص شعبي', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'wedding', ar: 'حفل زفاف', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'family reunion', ar: 'لم شمل العائلة', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'fair', ar: 'مدينة ملاهي/معرض', img: 'https://images.unsplash.com/photo-1513885542373-c1c5a9632832?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'race', ar: 'سباق', img: 'https://images.unsplash.com/photo-1530549387074-d562463b3259?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'team', ar: 'فريق', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'winner', ar: 'فائز', img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'score', ar: 'النتيجة', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'player', ar: 'لاعب', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "She's a ________.",
        options: ['player', 'winner', 'team'],
        correct: 'winner',
        img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "What's the ________?",
        options: ['winner', 'player', 'score'],
        correct: 'score',
        img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  2: {
    bigQuestion: "Who are the people in your life?",
    bigQuestionAr: "من هم الأشخاص في حياتك؟",
    vocab: [
      { id: 1, word: 'parent', ar: 'والد/والدة', img: 'https://images.unsplash.com/photo-1536640712247-c04fa6450803?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'grandmother', ar: 'جدة', img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'brother', ar: 'أخ', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'sister', ar: 'أخت', img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'uncle', ar: 'عم/خال', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'aunt', ar: 'عمة/خالة', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'cousin', ar: 'ابن عم/خال', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'neighbor', ar: 'جار', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'friends', ar: 'أصدقاء', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'baby', ar: 'طفل رضيع', img: 'https://images.unsplash.com/photo-1519689689253-ab9750242f77?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "This is my ________.",
        options: ['uncle', 'grandmother', 'neighbor'],
        correct: 'grandmother',
        img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "They are ________.",
        options: ['friends', 'parents', 'enemies'],
        correct: 'friends',
        img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  3: {
    bigQuestion: "How do we buy and sell things?",
    bigQuestionAr: "كيف نبيع ونشتري الأشياء؟",
    vocab: [
      { id: 1, word: 'market', ar: 'سوق', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'apples', ar: 'تفاح', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'bread', ar: 'خبز', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'coins', ar: 'عملات', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'vendor', ar: 'بائع', img: 'https://images.unsplash.com/photo-1543083477-4f7f44aad226?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'scales', ar: 'ميزان', img: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'basket', ar: 'سلة', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'wallet', ar: 'محفظة', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'shop', ar: 'محل/دكان', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'customer', ar: 'زبون', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Use ________ to weigh fruit.",
        options: ['wallet', 'scales', 'basket'],
        correct: 'scales',
        img: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "I have some ________.",
        options: ['coins', 'apples', 'shops'],
        correct: 'coins',
        img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  4: {
    bigQuestion: "How do we learn about the past?",
    bigQuestionAr: "كيف نتعلم عن الماضي؟",
    vocab: [
      { id: 1, word: 'temple', ar: 'معبد', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'history', ar: 'تاريخ', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'column', ar: 'عمود', img: 'https://images.unsplash.com/photo-1568249826372-c515a4521873?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'statue', ar: 'تمثال', img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'pyramid', ar: 'هرم', img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'tomb', ar: 'مقبرة/قبر', img: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'ruins', ar: 'أطلال', img: 'https://images.unsplash.com/photo-1508919892451-4b8495bc441d?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'artifact', ar: 'قطعة أثرية', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'ancient', ar: 'قديم جداً', img: 'https://images.unsplash.com/photo-1605649405073-fdedfb89131d?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'pharaoh', ar: 'فرعون', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "This is an ________ statue.",
        options: ['ancient', 'new', 'player'],
        correct: 'ancient',
        img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "The ________ are in Egypt.",
        options: ['pyramid', 'forest', 'market'],
        correct: 'pyramid',
        img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  5: {
    bigQuestion: "Where do animals live?",
    bigQuestionAr: "أين تعيش الحيوانات؟",
    vocab: [
      { id: 1, word: 'nest', ar: 'عش', img: 'https://images.unsplash.com/photo-1549491763-715783339031?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'cave', ar: 'كهف', img: 'https://images.unsplash.com/photo-1578891086254-20510103738e?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'burrow', ar: 'جحر', img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'hive', ar: 'خلية', img: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'web', ar: 'شبكة', img: 'https://images.unsplash.com/photo-1510006851264-9d51ba740aa8?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'ocean', ar: 'محيط', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'forest', ar: 'غابة', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'desert', ar: 'صحراء', img: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'jungle', ar: 'غابة استوائية', img: 'https://images.unsplash.com/photo-1549396555-3d8420952d4c?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'savanna', ar: 'سافانا', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Bears sleep in a ________.",
        options: ['nest', 'cave', 'hive'],
        correct: 'cave',
        img: 'https://images.unsplash.com/photo-1578891086254-20510103738e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "Bees live in a ________.",
        options: ['burrow', 'hive', 'web'],
        correct: 'hive',
        img: 'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  6: {
    bigQuestion: "How can we help the environment?",
    bigQuestionAr: "كيف يمكننا مساعدة البيئة؟",
    vocab: [
      { id: 1, word: 'recycle', ar: 'إعادة تدوير', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'plant', ar: 'نبتة', img: 'https://images.unsplash.com/photo-1416870230247-d0613a53047a?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'solar power', ar: 'طاقة شمسية', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'pollution', ar: 'تلوث', img: 'https://images.unsplash.com/photo-1526437523294-3349695ea137?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'earth', ar: 'الأرض', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'nature', ar: 'طبيعة', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'forest', ar: 'غابة', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'water', ar: 'ماء', img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'clean', ar: 'نظيف', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'garbage', ar: 'قمامة', img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Don't throw ________ on the ground.",
        options: ['nature', 'garbage', 'clean'],
        correct: 'garbage',
        img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "We must ________ paper.",
        options: ['recycle', 'pollution', 'plant'],
        correct: 'recycle',
        img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  7: {
    bigQuestion: "Who are real life heroes?",
    bigQuestionAr: "من هم الأبطال الحقيقيون؟",
    vocab: [
      { id: 1, word: 'firefighter', ar: 'رجل إطفاء', img: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'doctor', ar: 'طبيب', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'scientist', ar: 'عالم', img: 'https://images.unsplash.com/photo-1532187875605-1ef6c237f1f1?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'volunteer', ar: 'متطوع', img: 'https://images.unsplash.com/photo-1559027615-cd99c59630d6?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'brave', ar: 'شجاع', img: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'help', ar: 'يساعد', img: 'https://images.unsplash.com/photo-1559027615-cd99c59630d6?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'nurse', ar: 'ممرضة', img: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'police', ar: 'شرطة', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'teach', ar: 'يعلم', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'discover', ar: 'يكتشف', img: 'https://images.unsplash.com/photo-1532187875605-1ef6c237f1f1?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "The ________ saves people from fire.",
        options: ['scientist', 'firefighter', 'doctor'],
        correct: 'firefighter',
        img: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "A ________ helps sick people.",
        options: ['volunteer', 'doctor', 'teacher'],
        correct: 'doctor',
        img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  8: {
    bigQuestion: "What is delicious food?",
    bigQuestionAr: "ما هو الطعام اللذيذ؟",
    vocab: [
      { id: 1, word: 'ingredients', ar: 'مكونات', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'recipe', ar: 'وصفة', img: 'https://images.unsplash.com/photo-1466632346940-bf69ff716dba?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'healthy', ar: 'صحي', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'spices', ar: 'توابل', img: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'tasty', ar: 'لذيذ', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'chef', ar: 'طباخ', img: 'https://images.unsplash.com/photo-1577214190288-ce525046ff6f?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'vegetables', ar: 'خضروات', img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'fruit', ar: 'فاكهة', img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'sugar', ar: 'سكر', img: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'salt', ar: 'ملح', img: 'https://images.unsplash.com/photo-1518110925495-5fe2da054255?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Apples are a ________.",
        options: ['vegetable', 'fruit', 'spice'],
        correct: 'fruit',
        img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "Follow the ________ to cook.",
        options: ['recipe', 'chef', 'salt'],
        correct: 'recipe',
        img: 'https://images.unsplash.com/photo-1466632346940-bf69ff716dba?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  9: {
    bigQuestion: "How do we travel?",
    bigQuestionAr: "كيف نسافر؟",
    vocab: [
      { id: 1, word: 'airplane', ar: 'طائرة', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'train', ar: 'قطار', img: 'https://images.unsplash.com/photo-1474487548417-781f2f4817bd?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'ship', ar: 'سفينة', img: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'bicycle', ar: 'دراجة هوائية', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'fast', ar: 'سريع', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'car', ar: 'سيارة', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'bus', ar: 'حافلة', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'ticket', ar: 'تذكرة', img: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'station', ar: 'محطة', img: 'https://images.unsplash.com/photo-1474487548417-781f2f4817bd?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'airport', ar: 'مطار', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Go to the ________ to catch a train.",
        options: ['airport', 'station', 'ship'],
        correct: 'station',
        img: 'https://images.unsplash.com/photo-1474487548417-781f2f4817bd?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "An ________ flies in the sky.",
        options: ['airplane', 'bus', 'car'],
        correct: 'airplane',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  10: {
    bigQuestion: "What is in outer space?",
    bigQuestionAr: "ماذا يوجد في الفضاء الخارجي؟",
    vocab: [
      { id: 1, word: 'planet', ar: 'كوكب', img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'astronaut', ar: 'رائد فضاء', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'rocket', ar: 'صاروخ', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'stars', ar: 'نجوم', img: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'moon', ar: 'قمر', img: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'sun', ar: 'شمس', img: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'galaxy', ar: 'مجرة', img: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'telescope', ar: 'تلسكوب', img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'spacecraft', ar: 'مركبة فضائية', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'alien', ar: 'فضائي', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "The ________ is a star.",
        options: ['sun', 'rocket', 'moon'],
        correct: 'sun',
        img: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "An ________ goes to space.",
        options: ['astronaut', 'alien', 'planet'],
        correct: 'astronaut',
        img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  11: {
    bigQuestion: "What is modern technology?",
    bigQuestionAr: "ما هي التكنولوجيا الحديثة؟",
    vocab: [
      { id: 1, word: 'computer', ar: 'حاسوب', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'robot', ar: 'روبوت', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'smartphone', ar: 'هاتف ذكي', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'internet', ar: 'إنترنت', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'screen', ar: 'شاشة', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'keyboard', ar: 'لوحة مفاتيح', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'mouse', ar: 'فأرة', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'app', ar: 'تطبيق', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'coding', ar: 'برمجة', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'camera', ar: 'كاميرا', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Type on the ________.",
        options: ['mouse', 'keyboard', 'screen'],
        correct: 'keyboard',
        img: 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "A ________ can do work for us.",
        options: ['robot', 'app', 'mouse'],
        correct: 'robot',
        img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  12: {
    bigQuestion: "What is the world of art?",
    bigQuestionAr: "ما هو عالم الفن؟",
    vocab: [
      { id: 1, word: 'painting', ar: 'لوحة فنية', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'sculpture', ar: 'منحوتة', img: 'https://images.unsplash.com/photo-1554181067-56006e3bb42d?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'colors', ar: 'ألوان', img: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'museum', ar: 'متحف', img: 'https://images.unsplash.com/photo-1518998053502-53ec8a29b7ee?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'artist', ar: 'فنان', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'brush', ar: 'فرشاة', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'draw', ar: 'يرسم', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'gallery', ar: 'معرض فني', img: 'https://images.unsplash.com/photo-1518998053502-53ec8a29b7ee?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'pencil', ar: 'قلم رصاص', img: 'https://images.unsplash.com/photo-1516962215378-7fa2e1372cf5?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'paper', ar: 'ورق', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Go to the ________ to see art.",
        options: ['museum', 'market', 'station'],
        correct: 'museum',
        img: 'https://images.unsplash.com/photo-1518998053502-53ec8a29b7ee?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "An ________ makes beautiful things.",
        options: ['artist', 'player', 'vendor'],
        correct: 'artist',
        img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  13: {
    bigQuestion: "What is under the sea?",
    bigQuestionAr: "ماذا يوجد تحت البحر؟",
    vocab: [
      { id: 1, word: 'dolphin', ar: 'دولفين', img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'coral reef', ar: 'شعاب مرجانية', img: 'https://images.unsplash.com/photo-1546026423-9d2116091386?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'whale', ar: 'حوت', img: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'shark', ar: 'قرش', img: 'https://images.unsplash.com/photo-1560273552-32957b46c33b?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'fish', ar: 'سمكة', img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'water', ar: 'ماء', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'blue', ar: 'أزرق', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'deep', ar: 'عميق', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'jellyfish', ar: 'قنديل البحر', img: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'octopus', ar: 'أخطبوط', img: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "A ________ is very big.",
        options: ['fish', 'whale', 'octopus'],
        correct: 'whale',
        img: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "Be careful of the ________!",
        options: ['dolphin', 'shark', 'fish'],
        correct: 'shark',
        img: 'https://images.unsplash.com/photo-1560273552-32957b46c33b?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  14: {
    bigQuestion: "How do we stay healthy?",
    bigQuestionAr: "كيف نبقى بصحة جيدة؟",
    vocab: [
      { id: 1, word: 'exercise', ar: 'تمارين', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'vegetables', ar: 'خضروات', img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'water', ar: 'ماء', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'sleep', ar: 'نوم', img: 'https://images.unsplash.com/photo-1520206159889-623126a3375a?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'strong', ar: 'قوي', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'run', ar: 'يجري', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'milk', ar: 'حليب', img: 'https://images.unsplash.com/photo-1500315331616-db4f707c24d1?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'fruit', ar: 'فاكهة', img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'wash', ar: 'يغسل', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'soap', ar: 'صابون', img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Drink plenty of ________.",
        options: ['water', 'sugar', 'salt'],
        correct: 'water',
        img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "________ helps our body.",
        options: ['exercise', 'sleep', 'both'],
        correct: 'both',
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  15: {
    bigQuestion: "What happens at the Harbin Ice and Snow Festival?",
    bigQuestionAr: "ماذا يحدث في مهرجان هاربين للجليد والثلج؟",
    isReadingLesson: true,
    reading: {
      title: "Harbin Ice and Snow Festival",
      text: "Harbin is a town in northeast China. In winter, it is very cold. The average temperature in January is about -18°C. Some people call Harbin the 'Ice City'.\n\nDuring the Qing Dynasty, the people in Harbin made ice lanterns. The ice lanterns were very beautiful.\n\nYears later, the people of Harbin decided to have an ice and snow festival. Artists from all over the world go to Harbin to make the sculptures. First, the artists collect piles of ice from the countryside. Then they carve the ice into buildings, gardens, flowers, dragons, and other things.\n\nThere are a lot of exciting activities during the festival. There are team competitions in ice hockey and winter swimming. There are also skiing races. If you are interested, you can see people doing folk dances and singing folk songs. There are even weddings on the ice.\n\nThere is something for everyone at the festival. There are trade fairs for buying and selling things. People from all over the world can visit the ice sculptures, enjoy the fun activities, and learn about products made in Harbin.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'athletes', ar: 'رياضيون', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'bands', ar: 'فرق موسيقية', img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'championship', ar: 'بطولة', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'envelope', ar: 'ظرف', img: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      {
        id: 1,
        question: "Why is Harbin a good place to have an ice festival?",
        options: ["Because it's very hot", "Because it's very cold (-18°C)", "Because it has many markets"],
        correct: "Because it's very cold (-18°C)"
      },
      {
         id: 2,
         question: "How do artists in Harbin make ice sculptures?",
         options: ["They buy them from shops", "They collect ice from the countryside and carve it", "They use plastic"],
         correct: "They collect ice from the countryside and carve it"
      },
      {
         id: 3,
         question: "What competitive sports can people do in Harbin?",
         options: ["Football and Basketball", "Ice hockey, winter swimming, and skiing", "Chess and Cards"],
         correct: "Ice hockey, winter swimming, and skiing"
      }
    ],
    quiz: [
       {
         id: 1,
         question: "For the Chinese New Year, children often get money in a red ________.",
         options: ['envelope', 'basket', 'shop'],
         correct: 'envelope',
         img: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80'
       },
       {
         id: 2,
         question: "It's exciting to watch the World Cup soccer ________.",
         options: ['athletes', 'championship', 'bands'],
         correct: 'championship',
         img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80'
       },
       {
         id: 3,
         question: "________ from all over the world compete in the Olympic Games.",
         options: ['athletes', 'bands', 'vendors'],
         correct: 'athletes',
         img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80'
       },
       {
         id: 4,
         question: "Sometimes people have ________ that play music at weddings.",
         options: ['athletes', 'bands', 'scales'],
         correct: 'bands',
         img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=400&q=80'
       }
    ]
  },
  16: {
    bigQuestion: "What are Earth’s resources?",
    bigQuestionAr: "ما هي موارد الأرض؟",
    isReadingLesson: true,
    reading: {
      title: "Earth’s Precious Resources",
      text: "Our Earth provides us with everything we need to live. These are called natural resources. Some resources, like sunlight, wind, and water, are renewable. This means they will never run out.\n\nHowever, other resources like oil, coal, and natural gas are non-renewable. Once we use them, they are gone forever. Many of our daily items are made from Earth’s resources. For example, metals come from rocks in the ground, and plastic is made from oil.\n\nIt is important to use these resources wisely. If we recycle paper and glass, we save trees and energy. Protecting Earth’s resources ensures a better future for everyone.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'natural gas', ar: 'غاز طبيعي', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'metals', ar: 'معادن', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'recycle', ar: 'إعادة تدوير', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      {
        id: 1,
        question: "What are renewable resources?",
        options: ["Resources that run out", "Resources like sunlight and wind that never run out", "Resources used only in winter"],
        correct: "Resources like sunlight and wind that never run out"
      },
      {
         id: 2,
         question: "Where do metals come from?",
         options: ["From animals", "From trees", "From rocks in the ground"],
         correct: "From rocks in the ground"
      },
      {
         id: 3,
         question: "Why should we recycle paper and glass?",
         options: ["To make them look pretty", "To save trees and energy", "Because we have too much"],
         correct: "To save trees and energy"
      }
    ],
    quiz: [
       { id: 1, question: "Plastics are made from ________.", options: ['oil', 'trees', 'wind'], correct: 'oil', img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=400&q=80' },
       { id: 2, word: "________ is a non-renewable resource.", options: ['Sunlight', 'Wind', 'Natural gas'], correct: 'Natural gas', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
       { id: 3, word: "We save ________ when we recycle paper.", options: ['plastic', 'trees', 'oil'], correct: 'trees', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  17: {
    bigQuestion: "How do living things grow?",
    bigQuestionAr: "كيف تنمو الكائنات الحية؟",
    isReadingLesson: true,
    reading: {
      title: "The Cycle of Life",
      text: "Every living thing follows a life cycle. A life cycle shows how a living thing is born, grows, and dies. For example, a butterfly starts as a tiny egg. Then it hatches into a caterpillar. After eating a lot of leaves, it makes a chrysalis. Finally, a beautiful butterfly comes out!\n\nPlants also have life cycles. They start as seeds. With water and sunlight, the seed grows into a seedling and then a full plant. The plant makes new seeds, and the cycle starts again. Life cycles help keep the world full of life.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'butterfly', ar: 'فراشة', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'seedling', ar: 'شتلة', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'caterpillar', ar: 'يسروع', img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is the first stage of a butterfly?", options: ["Caterpillar", "Egg", "Chrysalis"], correct: "Egg" },
      { id: 2, question: "What does the caterpillar do before making a chrysalis?", options: ["It sleeps", "It eats a lot of leaves", "It flies"], correct: "It eats a lot of leaves" },
      { id: 3, question: "How do plants start their life cycle?", options: ["As fruits", "As seeds", "As flowers"], correct: "As seeds" }
    ],
    quiz: [
       { id: 1, question: "Plants start their life cycle as ________.", options: ['flowers', 'seeds', 'fruits'], correct: 'seeds', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "A ________ hatches from a butterfly egg.", options: ['seedling', 'caterpillar', 'chrysalis'], correct: 'caterpillar', img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Seeds need ________ and sunlight to grow.", options: ['oil', 'water', 'sand'], correct: 'water', img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  18: {
    bigQuestion: "What help us find our way?",
    bigQuestionAr: "ما الذي يساعدنا في العثور على طريقنا؟",
    isReadingLesson: true,
    reading: {
      title: "Exploring with Maps",
      text: "Maps and globes help us understand where we are in the world. A globe is a round model of the Earth. It shows continents and oceans. A map is a flat drawing of a place. Maps can show a small room or the whole world.\n\nMost maps have a compass rose. It shows directions: North, South, East, and West. Using a map and a compass, explorers can find their way across mountains and seas.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'continent', ar: 'قارة', img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'compass', ar: 'بوصلة', img: 'https://images.unsplash.com/photo-1511210113110-449e25ca528d?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'globe', ar: 'مجسم الكرة الأرضية', img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is a globe?", options: ["A flat map", "A round model of the Earth", "A type of car"], correct: "A round model of the Earth" },
      { id: 2, question: "What does a compass rose show?", options: ["Colors", "Directions", "Prices"], correct: "Directions" },
      { id: 3, question: "Which directions are on a compass rose?", options: ["Hot and Cold", "North, South, East, West", "Fast and Slow"], correct: "North, South, East, West" }
    ],
    quiz: [
       { id: 1, question: "A ________ shows directions like North and South.", options: ['ruler', 'compass', 'clock'], correct: 'compass', img: 'https://images.unsplash.com/photo-1511210113110-449e25ca528d?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "A ________ is a flat drawing of a place.", options: ['globe', 'map', 'book'], correct: 'map', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "A globe shows ________ and oceans.", options: ['trees', 'continents', 'houses'], correct: 'continents', img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  19: {
    bigQuestion: "Where does energy come from?",
    bigQuestionAr: "من أين تأتي الطاقة؟",
    isReadingLesson: true,
    reading: {
      title: "Powering Our World",
      text: "Energy is what makes things move and work. We get energy from many sources. Some energy is renewable, like solar power from the sun and wind power from wind turbines. These are clean sources that don’t hurt the Earth.\n\nEnergy is also stored in batteries for our gadgets. We use energy to light our homes, cook our food, and drive our cars. Scientists are always looking for better ways to make energy.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'wind turbine', ar: 'توربينات الرياح', img: 'https://images.unsplash.com/photo-1466611653911-954ffea1127b?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'battery', ar: 'بطارية', img: 'https://images.unsplash.com/photo-1548332441-ae9459ca833b?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'solar power', ar: 'طاقة شمسية', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "Which is a clean energy source?", options: ["Oil", "Coal", "Solar power"], correct: "Solar power" },
      { id: 2, question: "Where is energy stored for gadgets?", options: ["In boxes", "In batteries", "In pockets"], correct: "In batteries" },
      { id: 3, question: "What does energy do?", options: ["Makes things stop", "Makes things move and work", "Makes things cold"], correct: "Makes things move and work" }
    ],
    quiz: [
       { id: 1, question: "We store energy in a ________ for mobile phones.", options: ['box', 'battery', 'wire'], correct: 'battery', img: 'https://images.unsplash.com/photo-1548332441-ae9459ca833b?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "________ power comes from the sun.", options: ['Wind', 'Solar', 'Coal'], correct: 'Solar', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Wind ________ produce energy from wind.", options: ['turbines', 'cars', 'clocks'], correct: 'turbines', img: 'https://images.unsplash.com/photo-1466611653911-954ffea1127b?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  20: {
    bigQuestion: "How do animals survive?",
    bigQuestionAr: "كيف تنجو الحيوانات؟",
    isReadingLesson: true,
    reading: {
      title: "Built for Survival",
      text: "Animals have special features that help them survive. This is called adaptation. For example, polar bears have thick white fur to stay warm in the Arctic. Camels have humps that store fat to help them live in the desert without much water.\n\nSome animals use camouflage to hide from enemies. They look like the trees or sand around them. Adaptations help animals stay safe and find food in their habitats.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'camouflage', ar: 'تمويه', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'polar bear', ar: 'دب قطبي', img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'hump', ar: 'سنام', img: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is camouflage?", options: ["A loud sound", "Hiding by looking like your surroundings", "Running fast"], correct: "Hiding by looking like your surroundings" },
      { id: 2, question: "Why do polar bears have thick white fur?", options: ["To stay cool", "To stay warm and hide in the snow", "To look scary"], correct: "To stay warm and hide in the snow" },
      { id: 3, question: "What is adaptation?", options: ["Eating food", "Special features for survival", "Sleeping all day"], correct: "Special features for survival" }
    ],
    quiz: [
       { id: 1, question: "A ________ lives in the cold Arctic.", options: ['camel', 'polar bear', 'lion'], correct: 'polar bear', img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "Camels have ________ to store fat.", options: ['fur', 'humps', 'wings'], correct: 'humps', img: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Some animals use ________ to hide from enemies.", options: ['running', 'camouflage', 'singing'], correct: 'camouflage', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  21: {
    bigQuestion: "What are weather patterns?",
    bigQuestionAr: "ما هي أنماط الطقس؟",
    isReadingLesson: true,
    reading: {
      title: "Wild Weather",
      text: "Weather changes every day, but sometimes it becomes extreme. A tornado is a spinning wind that can be very powerful. A blizzard is a huge snowstorm with strong winds and very cold air.\n\nWeather experts use tools to predict these patterns. Knowing the weather helps people stay safe. In some places, it rains for months, while others are dry and sunny most of the year.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'tornado', ar: 'إعصار قمعي', img: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'blizzard', ar: 'عاصفة ثلجية', img: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'prediction', ar: 'تنبؤ', img: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is a blizzard?", options: ["A heatwave", "A strong snowstorm", "A light rain"], correct: "A strong snowstorm" },
      { id: 2, question: "What do weather experts do?", options: ["Make weather", "Predict weather patterns", "Stop tornadoes"], correct: "Predict weather patterns" },
      { id: 3, question: "What is a tornado?", options: ["Heavy rain", "Powerful spinning wind", "Falling snow"], correct: "Powerful spinning wind" }
    ],
    quiz: [
       { id: 1, question: "A ________ is a powerful spinning wind.", options: ['cloud', 'tornado', 'rainbow'], correct: 'tornado', img: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "A ________ has strong winds and huge snow.", options: ['blizzard', 'sun', 'rain'], correct: 'blizzard', img: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Knowing the weather helps people stay ________.", options: ['wet', 'safe', 'lost'], correct: 'safe', img: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  22: {
    bigQuestion: "What makes things move?",
    bigQuestionAr: "ما الذي يجعل الأشياء تتحرك؟",
    isReadingLesson: true,
    reading: {
      title: "Moving and Pulling",
      text: "Why does an apple fall from a tree? It’s because of gravity. Gravity is an invisible force that pulls everything down to the Earth. Without gravity, we would float in the air!\n\nMagnets are another cool force. They can pull metal objects toward them. Pushing and pulling are how we move objects every day. Understanding motion helps us build cars, planes, and rockets.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'gravity', ar: 'جاذبية', img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'magnet', ar: 'مغناطيس', img: 'https://images.unsplash.com/photo-1590486803833-ffc9171e63a7?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'force', ar: 'قوة', img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What does gravity do?", options: ["Pushes things away", "Pulls everything down to Earth", "Makes things hot"], correct: "Pulls everything down to Earth" },
      { id: 2, question: "What can magnets pull?", options: ["Water", "Metal objects", "Plastic"], correct: "Metal objects" },
      { id: 3, question: "What would happen without gravity?", options: ["We would float", "We would run fast", "We would be heavy"], correct: "We would float" }
    ],
    quiz: [
       { id: 1, question: "A ________ can pull some metals.", options: ['magnet', 'paper', 'water'], correct: 'magnet', img: 'https://images.unsplash.com/photo-1590486803833-ffc9171e63a7?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "________ pulls apples down from trees.", options: ['Wind', 'Gravity', 'Sun'], correct: 'Gravity', img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Pushing and ________ are how we move objects.", options: ['looking', 'pulling', 'sleeping'], correct: 'pulling', img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  23: {
    bigQuestion: "How does our body work?",
    bigQuestionAr: "كيف يعمل جسمنا؟",
    isReadingLesson: true,
    reading: {
      title: "The Human Machine",
      text: "Our body is like a busy machine. Inside us, we have a skeleton made of many bones. It gives our body shape and protects our organs. Our heart beats to pump blood all over the body.\n\nOur brain is the control center. it tells us when to eat, sleep, and run. To keep our body machine working well, we need to eat healthy food and get plenty of exercise.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'skeleton', ar: 'هيكل عظمي', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'heartbeat', ar: 'نبض القلب', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'brain', ar: 'دماغ', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What does the skeleton do?", options: ["Pumps blood", "Gives shape and protects organs", "Thinks for us"], correct: "Gives shape and protects organs" },
      { id: 2, question: "Which organ is the control center?", options: ["Heart", "Brain", "Leg"], correct: "Brain" },
      { id: 3, question: "Why does the heart beat?", options: ["To make sound", "To pump blood", "To protect bones"], correct: "To pump blood" }
    ],
    quiz: [
       { id: 1, question: "The ________ pumps blood.", options: ['leg', 'heart', 'arm'], correct: 'heart', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "Our ________ is the control center.", options: ['brain', 'skin', 'hair'], correct: 'brain', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Bones make up our ________.", options: ['heart', 'skeleton', 'shoes'], correct: 'skeleton', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  24: {
    bigQuestion: "What are simple machines?",
    bigQuestionAr: "ما هي الآلات البسيطة؟",
    isReadingLesson: true,
    reading: {
      title: "Making Work Easier",
      text: "Simple machines help us do work with less effort. A lever can help us lift heavy weights. A pulley uses a wheel and a rope to pull things up. A wheel and axle help us move heavy objects across the ground.\n\nWe see simple machines everywhere. Scissors, slides, and bicycles all use simple machines. By combining them, we can build huge cranes and fast cars.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'pulley', ar: 'بكرة', img: 'https://images.unsplash.com/photo-1622329760012-9214777cd362?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'lever', ar: 'رافعة', img: 'https://images.unsplash.com/photo-1622329760012-9214777cd362?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'wheel', ar: 'عجلة', img: 'https://images.unsplash.com/photo-1622329760012-9214777cd362?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What does a pulley use?", options: ["A wheel and rope", "A motor", "A key"], correct: "A wheel and rope" },
      { id: 2, question: "How do simple machines help us?", options: ["They make us tired", "They help us do work with less effort", "They look cool"], correct: "They help us do work with less effort" },
      { id: 3, question: "Which of these is a simple machine?", options: ["A lever", "A computer", "A tree"], correct: "A lever" }
    ],
    quiz: [
       { id: 1, question: "A ________ helps lift things up.", options: ['door', 'pulley', 'carpet'], correct: 'pulley', img: 'https://images.unsplash.com/photo-1622329760012-9214777cd362?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "We see simple machines in ________.", options: ['scissors', 'water', 'clouds'], correct: 'scissors', img: 'https://images.unsplash.com/photo-1549491763-715783339031?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "A ________ can help us lift heavy weights.", options: ['lever', 'pencil', 'shoe'], correct: 'lever', img: 'https://images.unsplash.com/photo-1622329760012-9214777cd362?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  25: {
    bigQuestion: "What is an ecosystem?",
    bigQuestionAr: "ما هو النظام البيئي؟",
    isReadingLesson: true,
    reading: {
      title: "Nature’s Balance",
      text: "An ecosystem is a community where living and non-living things work together. Plants are producers because they make their own food from sunlight. Animals are consumers because they eat plants or other animals.\n\nA food web shows how energy moves from one living thing to another. If one part of the ecosystem is hurt, the whole community is affected. We must protect our ecosystems to keep the world healthy.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'producer', ar: 'منتج', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'consumer', ar: 'مستهلك', img: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'food web', ar: 'شبكة غذائية', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is a producer in nature?", options: ["An animal", "A plant", "A rock"], correct: "A plant" },
      { id: 2, question: "What is an ecosystem?", options: ["A type of car", "A community of living and non-living things", "A solo animal"], correct: "A community of living and non-living things" },
      { id: 3, question: "Why are animals called consumers?", options: ["Because they make food", "Because they eat plants or other animals", "Because they sleep"], correct: "Because they eat plants or other animals" }
    ],
    quiz: [
       { id: 1, question: "Animals are ________ because they eat food.", options: ['producers', 'consumers', 'seeds'], correct: 'consumers', img: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80' },
       { id: 2, question: "A ________ shows how energy moves.", options: ['food web', 'map', 'clock'], correct: 'food web', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80' },
       { id: 3, question: "Plants make food from ________.", options: ['oil', 'sunlight', 'salt'], correct: 'sunlight', img: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  26: {
    bigQuestion: "Why do we play games?",
    bigQuestionAr: "لماذا نلعب الألعاب؟",
    isReadingLesson: true,
    reading: {
      title: "Playing Footbag for Fun",
      text: "I live in Colombia, in a small town near Medellín. My town is in the Andes Mountains, about 1,500 meters above sea level. Around my town, there are large plains, deep canyons, and wide valleys.\n\nWhat do I do for fun? I play footbag. A footbag is a soft bag filled with plastic beads. Today I'm playing footbag with my friends in the park. We're playing next to a lake.\n\nThere are different ways to play footbag. The most popular is called 'circle kicking.' We stand in a circle and take turns kicking the footbag. It's not easy because the footbag can only touch your body below the knee. You have to pass the footbag to the next person in the circle, but it can't touch the ground.\n\nFootbags aren't like balls. When they fall, they don't bounce. Some of the older kids play 'freestyle footbag.' That's really hard, and you have to learn to do tricks. For now, I enjoy playing footbag with my friends.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'boa constrictor', ar: 'أفعى الأصلة العاصرة', img: 'https://images.unsplash.com/photo-1549491763-715783339031?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'toss', ar: 'رمي بخفة', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'landing', ar: 'هبوط', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'balance', ar: 'توازن', img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      {
        id: 1,
        question: "What refers to the rules of circle kicking?",
        options: ["You must use your hands", "You must use your body below the knee", "The bag can touch the ground"],
        correct: "You must use your body below the knee"
      },
      {
         id: 2,
         question: "What is a footbag filled with?",
         options: ["Air", "Feathers", "Plastic beads"],
         correct: "Plastic beads"
      },
      {
         id: 3,
         question: "Where is the town in the story located?",
         options: ["In the Sahara Desert", "In the Andes Mountains", "On a small island"],
         correct: "In the Andes Mountains"
      }
    ],
    quiz: [
       {
         id: 1,
         question: "Footbags are exactly like balls.",
         options: ['True', 'False'],
         correct: 'False',
         img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80'
       },
       {
         id: 2,
         question: "When footbags fall, they ________.",
         options: ['bounce high', 'don\'t bounce', 'explode'],
         correct: 'don\'t bounce',
         img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80'
       },
       {
         id: 3,
         question: "A ________ can keep steady and not fall over.",
         options: ['balance', 'toss', 'landing'],
         correct: 'balance',
         img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80'
       }
    ]
  },
  27: {
    bigQuestion: "What is beneath our feet?",
    bigQuestionAr: "ماذا يوجد تحت أقدامنا؟",
    isReadingLesson: true,
    reading: {
      title: "Journey to Earth's Core",
      text: "The Earth has different layers. The layer we live on is the crust. It is like the skin of an apple. Under the crust is the mantle, which is made of hot, solid rock. Deeper still is the core. The outer core is liquid metal, and the inner core is a solid ball of iron.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'crust', ar: 'قشرة', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'mantle', ar: 'وشاح', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'core', ar: 'لب/نواة', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is the Earth's hottest layer?", options: ["The crust", "The core", "The ocean"], correct: "The core" },
      { id: 2, question: "Which layer is like apple skin?", options: ["The crust", "The mantle", "The core"], correct: "The crust" }
    ],
    quiz: [
       { id: 1, question: "The Earth's ________ is solid iron.", options: ['crust', 'inner core', 'ocean'], correct: 'inner core', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  28: {
    bigQuestion: "How did people trade in the past?",
    bigQuestionAr: "كيف كان الناس يتاجرون في الماضي؟",
    isReadingLesson: true,
    reading: {
      title: "The Silk Road",
      text: "Long ago, traders traveled thousands of miles across mountains and deserts. This network of routes was called the Silk Road. Traders from China carried silk, tea, and porcelain to the West. They returned with gold, silver, and glass. The Silk Road helped share ideas and inventions between different cultures.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'merchant', ar: 'تاجر', img: 'https://images.unsplash.com/photo-1543083477-4f7f44aad226?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'route', ar: 'طريق', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'invention', ar: 'اختراع', img: 'https://images.unsplash.com/photo-1532187875605-1ef6c237f1f1?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What was the Silk Road?", options: ["A single road made of silk", "A network of trade routes", "A river"], correct: "A network of trade routes" }
    ],
    quiz: [
       { id: 1, question: "The Silk Road helped share ________.", options: ['sand', 'ideas and inventions', 'nothing'], correct: 'ideas and inventions', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  29: {
    bigQuestion: "Why do animals move?",
    bigQuestionAr: "لماذا تتحرك الحيوانات؟",
    isReadingLesson: true,
    reading: {
      title: "Animal Migration",
      text: "Every year, millions of animals travel long distances. This is called migration. Birds fly south for the winter to find warm weather and food. Gray whales swim thousands of miles to reach warm waters. Migration is a dangerous journey, but it helps animals survive.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'migration', ar: 'هجرة', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'journey', ar: 'رحلة', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c7f3?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'survive', ar: 'ينجو', img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "Why do birds fly south?", options: ["To play", "To find warm weather and food", "To hide"], correct: "To find warm weather and food" }
    ],
    quiz: [
       { id: 1, question: "The seasonal movement of animals is ________.", options: ['sleeping', 'migration', 'walking'], correct: 'migration', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  30: {
    bigQuestion: "How do humans build big things?",
    bigQuestionAr: "كيف يبني البشر أشياء كبيرة؟",
    isReadingLesson: true,
    reading: {
      title: "Wonders of Engineering",
      text: "Engineering is about using science to solve problems and build things. Modern wonders like the Burj Khalifa or the Panama Canal required thousands of workers and huge machines. Engineers must plan everything carefully so that the buildings are safe and strong.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'engineer', ar: 'مهندس', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'plan', ar: 'خطة/يخطط', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'structure', ar: 'هيكل/بناء', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What do engineers use science for?", options: ["To solve problems", "To paint", "To cook"], correct: "To solve problems" }
    ],
    quiz: [
       { id: 1, question: "Building a skyscraper is a feat of ________.", options: ['art', 'engineering', 'nature'], correct: 'engineering', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  31: {
    bigQuestion: "How do we remember things?",
    bigQuestionAr: "كيف نتذكر الأشياء؟",
    isReadingLesson: true,
    reading: {
      title: "Inside Your Brain",
      text: "The human brain is amazing. It stores memories, controls our movements, and helps us think. Different parts of the brain have different jobs. One part helps us with balance, while another part handles our feelings and memory.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'memory', ar: 'ذاكرة', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'neuron', ar: 'عصبون', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'processing', ar: 'معالجة', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What is the control center of the body?", options: ["The heart", "The brain", "The hand"], correct: "The brain" }
    ],
    quiz: [
       { id: 1, question: "Your brain is the ________ of your body.", options: ['engine', 'control center', 'window'], correct: 'control center', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  32: {
    bigQuestion: "What is clean power?",
    bigQuestionAr: "ما هي الطاقة النظيفة؟",
    isReadingLesson: true,
    reading: {
      title: "Renewable Energy",
      text: "Renewable energy comes from sources that never run out. Solar panels collect energy from the sun. Wind turbines catch the wind to make electricity. These sources are better for the environment than burning coal or oil.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'solar panel', ar: 'لوحة شمسية', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'turbine', ar: 'توربين', img: 'https://images.unsplash.com/photo-1466611653911-954ffea1127b?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'electricity', ar: 'كهرباء', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "Where does solar energy come from?", options: ["The moon", "The sun", "The wind"], correct: "The sun" }
    ],
    quiz: [
       { id: 1, question: "Solar panels create ________.", options: ['water', 'electricity', 'sand'], correct: 'electricity', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  33: {
    bigQuestion: "What did people believe long ago?",
    bigQuestionAr: "ماذا كان الناس يؤمنون قديماً؟",
    isReadingLesson: true,
    reading: {
      title: "Mythology and Legends",
      text: "In the past, people told stories called myths to explain nature. They had myths about why the sun rises or why it rains. These legends were full of gods, heroes, and magical creatures. Even today, these stories are famous in books and movies.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'myth', ar: 'أسطورة', img: 'https://images.unsplash.com/photo-1605649405073-fdedfb89131d?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'god', ar: 'إله', img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'hero', ar: 'بطل', img: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "Why did people tell myths?", options: ["To explain nature", "To sell things", "To go to sleep"], correct: "To explain nature" }
    ],
    quiz: [
       { id: 1, question: "A ________ is an ancient story about gods.", options: ['newspaper', 'myth', 'email'], correct: 'myth', img: 'https://images.unsplash.com/photo-1605649405073-fdedfb89131d?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  34: {
    bigQuestion: "What is in the deep ocean?",
    bigQuestionAr: "ماذا يوجد في أعماق المحيط؟",
    isReadingLesson: true,
    reading: {
      title: "Life in the Dark",
      text: "Thousands of meters below the ocean surface, it is very dark and cold. Sunlight cannot reach the deep ocean. Still, strange creatures live there. Some fish have their own lights on their bodies to find food in the dark.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'abyss', ar: 'هاوية', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'bioluminescence', ar: 'توهج حيوي', img: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'pressure', ar: 'ضغط', img: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8da8?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "Why is it dark in the deep ocean?", options: ["The water is blue", "Sunlight cannot reach it", "Because it's winter"], correct: "Sunlight cannot reach it" }
    ],
    quiz: [
       { id: 1, question: "Some deep sea fish produce their own ________.", options: ['ice', 'light', 'sand'], correct: 'light', img: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  35: {
    bigQuestion: "Are there other worlds?",
    bigQuestionAr: "هل هناك عوالم أخرى؟",
    isReadingLesson: true,
    reading: {
      title: "Searching for Life",
      text: "Astronomers use giant telescopes to look at distant planets. They want to know if there is life elsewhere in space. They look for planets that have water and the right temperature. One day, we might find a new home in the stars.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'astronomer', ar: 'عالم فلك', img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'distant', ar: 'بعيد', img: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'habitable', ar: 'قابل للسكن', img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What do astronomers look for?", options: ["Life in space", "Gold", "Fish"], correct: "Life in space" }
    ],
    quiz: [
       { id: 1, question: "A ________ helps see distant planets.", options: ['mirror', 'telescope', 'window'], correct: 'telescope', img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  36: {
    bigQuestion: "How do we behave online?",
    bigQuestionAr: "كيف نتصرف على الإنترنت؟",
    isReadingLesson: true,
    reading: {
      title: "Digital Citizenship",
      text: "The internet is a big community. Just like in real life, we must follow rules online. We should be kind to others, keep our secrets safe, and not share our personal information with strangers. Being a good digital citizen helps everyone have a great time online.",
      audioSource: "reading"
    },
    vocab: [
      { id: 1, word: 'privacy', ar: 'خصوصية', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'stranger', ar: 'غريب', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'safety', ar: 'سلامة', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80' },
    ],
    comprehension: [
      { id: 1, question: "What should you not share with strangers?", options: ["Personal information", "A hello", "A game"], correct: "Personal information" }
    ],
    quiz: [
       { id: 1, question: "Being ________ to others online is important.", options: ['kind', 'angry', 'mean'], correct: 'kind', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80' }
    ]
  }
};

export const OxfordUnitLesson = ({ lang, unitId, onBack, userProfile }: OxfordUnitLessonProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const isLanguageLab = false;
  const languageData = null;
  const isOldUnit = String(unitId).startsWith('old_') || !isNaN(Number(unitId));
  const normalizedId = String(unitId).startsWith('old_') ? String(unitId).replace('old_', '') : unitId;
  const data = OXFORD_LESSONS.find(lesson => lesson.id === unitId) || OLD_OXFORD_LESSONS[normalizedId] || {
    bigQuestion: "",
    bigQuestionAr: "",
    vocab: [],
    quiz: [],
    isReadingLesson: false
  };
  const isReading = data?.isReadingLesson;
  const isGrammar = (data as any)?.category === 'grammar_friends';

  const [step, setStep] = useState<'intro' | 'reading' | 'matching' | 'quiz' | 'finish' | 'grammar_dialogue'>('intro');
  const [matchingStatus, setMatchingStatus] = useState<Record<number, boolean>>({});
  const [compAnswers, setCompAnswers] = useState<Record<number, string | null>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | null>>({});
  const [score, setScore] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [userInput, setUserInput] = useState('');

  const submitResult = async (finalScore: number) => {
    if (!userProfile) return;
    try {
      const totalQuestions = isLanguageLab ? (languageData?.exercises?.length || 0) : (data?.quiz?.length || 0);
      const title = isLanguageLab ? (languageData?.title || "") : (data?.bigQuestion || "");
      
      // Save Lesson Result
      await addDoc(collection(db, 'lessonResults'), {
        userId: userProfile.uid,
        parentIds: userProfile.linkedParentIds || [],
        lessonId: String(unitId), // maps to item.unitId in planner
        courseId: 'oxford', // Added courseId so Oxford results are tracked correctly
        lessonTitle: title || '',
        score: finalScore,
        total: totalQuestions,
        timestamp: serverTimestamp()
      });

      // Add points
      const extraPoints = 100;
      const userRef = doc(db, 'users', userProfile.uid);
      await updateDoc(userRef, {
        points: (userProfile.points || 0) + extraPoints
      });
    } catch (e) {
      console.error("Error saving Oxford unit result:", e);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleStart = () => {
    if (isLanguageLab) {
      setStep('languageLab' as any);
    } else if (isReading) {
      setStep('reading');
    } else if (isGrammar) {
      setStep('grammar_dialogue');
    } else {
      setStep('matching');
    }
  };

  const handleCompQuiz = (id: number, opt: string) => {
    setCompAnswers(prev => ({ ...prev, [id]: opt }));
    const question = (data as any).comprehension.find((q: any) => q.id === id);
    if (opt === question.correct) {
      speak("Correct", "en-US");
    } else {
      speak("Check again", "en-US");
    }

    if (Object.keys(compAnswers).length + 1 === (data as any).comprehension.length) {
       setTimeout(() => setStep('matching'), 1500);
    }
  };

  const speak = (text: string, voiceLang: string = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    utterance.rate = 0.9;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeak = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleMatch = (id: number, word: string) => {
    const item = data.vocab.find(v => v.id === id);
    if (item?.word === word) {
      setMatchingStatus(prev => ({ ...prev, [id]: true }));
      speak(word);
      if (Object.keys(matchingStatus).length + 1 === data.vocab.length) {
        setTimeout(() => setStep('quiz'), 1500);
      }
    }
  };

  const handleQuiz = (questionId: number, option: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: option }));
    const question = data.quiz.find((q: any) => q.id === questionId);
    let finalScore = score;
    if (option === question?.correct) {
      finalScore += 1;
      setScore(prev => prev + 1);
      speak("Correct!", "en-US");
    } else {
      speak("Try again", "en-US");
    }

    if (Object.keys(quizAnswers).length + 1 === data.quiz.length) {
      setTimeout(() => {
        setStep('finish');
        submitResult(finalScore);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1500);
    }
  };

  const handleLanguageExercise = (answer: string) => {
    if (!languageData) return;
    const exercise = languageData.exercises[currentExerciseIdx];
    setExerciseAnswers(prev => ({ ...prev, [exercise.id]: answer }));
    
    let finalScore = score;
    if (answer.toLowerCase().trim() === exercise.correct.toLowerCase().trim()) {
      finalScore += 1;
      setScore(prev => prev + 1);
      speak("Correct!", "en-US");
    } else {
      speak("Try again", "en-US");
    }

    setTimeout(() => {
      if (currentExerciseIdx < languageData.exercises.length - 1) {
        setCurrentExerciseIdx(prev => prev + 1);
        setUserInput('');
      } else {
        setStep('finish');
        submitResult(finalScore);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1500);
  };

  return (
    <div className={`flex-1 p-6 md:p-12 overflow-y-auto bg-slate-50 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold">
          <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للملحق' : 'Back to Companion'}
        </button>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center py-12"
            >
              <div className="bg-[#002147] text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden mb-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
                <div className="relative z-10">
                  <span className="px-4 py-1 bg-amber-500 rounded-full text-[12px] font-black uppercase tracking-widest mb-4 inline-block">
                    {t.oxfordBigQuestion}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    {data.bigQuestion}
                  </h1>
                  <p className="text-xl text-blue-100 font-medium opacity-80">
                    {data.bigQuestionAr}
                  </p>
                  <button 
                    onClick={() => isSpeaking ? stopSpeak() : speak(data.bigQuestion)}
                    className="mt-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full mx-auto flex items-center justify-center transition-all group"
                  >
                    {isSpeaking ? (
                      <Square className="group-hover:scale-110 transition-transform fill-white" size={24} />
                    ) : (
                      <Volume2 className="group-hover:scale-110 transition-transform" size={24} />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-left rtl:text-right">
                    <h3 className="text-xl font-black text-[#002147] mb-4 flex items-center gap-3">
                       <PlayCircle className="text-blue-500" />
                       {isLanguageLab 
                         ? (isRtl ? 'أهداف مختبر اللغة' : 'Language Lab Goals')
                         : isReading 
                           ? (isRtl ? 'أهداف المختبر القرائي' : 'Reading Lab Goals')
                           : (isRtl ? 'خطة الدرس' : 'Lesson Plan')}
                    </h3>
                    <div className="flex items-start gap-4 mb-6">
                       <p className="text-sm font-medium text-slate-400 leading-relaxed flex-1">
                          {isLanguageLab
                            ? (isRtl 
                                ? 'مرحباً بك في مختبر اللغة. هنا سنقوم بتحليل أسرار اللغة، من دراسة وظائف الكلمات كأفعال أو أسماء، وصولاً إلى إتقان القواعد المعقدة وبناء أساس قوي في التعبير اللغوي.'
                                : 'Welcome to the Language Lab. Here we will analyze the secrets of language, from studying word functions as verbs or nouns, to mastering complex grammar and building a strong foundation in linguistic expression.')
                            : isReading
                              ? (isRtl 
                                  ? 'في هذا المختبر الحصري، سنمر برحلة قرائية متكاملة: من قراءة النص بذكاء، استخراج المفردات المفتاحية، وصولاً إلى تحليل النص بعمق لضمان الفهم الشامل.'
                                  : 'In this exclusive lab, we will go through an integrated reading journey: from reading the text smartly, extracting key vocabulary, to deep text analysis for comprehensive understanding.')
                              : (isRtl 
                                  ? 'بدلاً من التوصيل التقليدي بالخطوط، ستقوم بربط الكلمة بالصورة المناسبة لها من خلال النقر المباشر، مما يساعد على تثبيت المعنى عقلياً مع الصورة.' 
                                  : 'Instead of traditional line matching, you will link each word to its appropriate image by clicking directly, which helps fix the meaning mentally with the visual.')}
                       </p>
                       <button 
                         onClick={() => speak(isLanguageLab
                           ? (isRtl ? 'مرحباً بك في مختبر اللغة. هنا سنقوم بتحليل أسرار اللغة، من دراسة وظائف الكلمات كأفعال أو أسماء، وصولاً إلى إتقان القواعد المعقدة وبناء أساس قوي في التعبير اللغوي.' : 'Welcome to the Language Lab. Here we will analyze the secrets of language, from studying word functions as verbs or nouns, to mastering complex grammar and building a strong foundation in linguistic expression.')
                           : isReading 
                             ? (isRtl ? 'في هذا المختبر الحصري، سنمر برحلة قرائية متكاملة: من قراءة النص بذكاء، استخراج المفردات المفتاحية، وصولاً إلى تحليل النص بعمق لضمان الفهم الشامل.' : 'In this exclusive lab, we will go through an integrated reading journey: from reading the text smartly, extracting key vocabulary, to deep text analysis for comprehensive understanding.')
                             : (isRtl ? 'بدلاً من التوصيل التقليدي بالخطوط، ستقوم بربط الكلمة بالصورة المناسبة لها من خلال النقر المباشر، مما يساعد على تثبيت المعنى عقلياً مع الصورة.' : 'Instead of traditional line matching, you will link each word to its appropriate image by clicking directly, which helps fix the meaning mentally with the visual.'), isRtl ? 'ar-SA' : 'en-US')}
                         className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors"
                       >
                         <Volume2 size={16} />
                       </button>
                    </div>
                    <ul className="space-y-4 text-slate-500 font-bold">
                       {isLanguageLab ? (
                         <>
                          <li className="flex items-center gap-3">
                              <CheckCircle2 className="text-indigo-500" size={18} />
                              {isRtl ? 'دراسة المفاهيم اللغوية' : 'Language Concept Study'}
                          </li>
                          <li className="flex items-center gap-3">
                              <CheckCircle2 className="text-indigo-500" size={18} />
                              {isRtl ? 'أمثلة تطبيقية واقعية' : 'Real-world Examples'}
                          </li>
                          <li className="flex items-center gap-3">
                              <CheckCircle2 className="text-indigo-500" size={18} />
                              {isRtl ? 'تدريبات لغوية تفاعلية' : 'Interactive Drills'}
                          </li>
                         </>
                       ) : isReading ? (
                         <>
                          <li className="flex items-center gap-3">
                              <CheckCircle2 className="text-sky-500" size={18} />
                              {isRtl ? 'تحليل النص القرائي' : 'Reading Text Analysis'}
                          </li>
                          <li className="flex items-center gap-3">
                              <CheckCircle2 className="text-sky-500" size={18} />
                              {isRtl ? 'مختبر المفردات المفتاحية' : 'Key Vocabulary Lab'}
                          </li>
                          <li className="flex items-center gap-3">
                              <CheckCircle2 className="text-sky-500" size={18} />
                              {isRtl ? 'اختبار الفهم والاستيعاب' : 'Comprehension Mastery Quiz'}
                          </li>
                         </>
                       ) : (
                         <>
                          <li className="flex items-center gap-3">
                             <CheckCircle2 className="text-emerald-500" size={18} />
                             {isRtl ? 'تعلم المفردات الأساسية' : 'Learn key vocabulary'}
                          </li>
                          <li className="flex items-center gap-3">
                             <CheckCircle2 className="text-emerald-500" size={18} />
                             {isRtl ? 'نشاط مطابقة الصور' : 'Matching activity'}
                          </li>
                          <li className="flex items-center gap-3">
                             <CheckCircle2 className="text-emerald-500" size={18} />
                             {isRtl ? 'اختيار الإجابة الصحيحة' : 'Circle the correct answer'}
                          </li>
                         </>
                       )}
                    </ul>
                 </div>
                 <div className="flex flex-col justify-center items-center p-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStart}
                      className="w-full bg-[#002147] text-white py-6 rounded-2xl text-xl font-black shadow-xl shadow-blue-500/20 flex items-center justify-center gap-4 group"
                    >
                      {t.oxfordStart}
                      <PlayCircle size={28} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'grammar_dialogue' && (
            <motion.div
              key="grammar_dialogue"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl relative overflow-hidden">
                <span className="px-4 py-1 bg-[#C49E3A] rounded-full text-[12px] font-black uppercase tracking-widest mb-4 inline-block text-white">
                  {isRtl ? 'حوار القواعد والقصة' : 'Grammar Dialogue & Story'}
                </span>
                <h2 className="text-3xl font-black text-[#002147] mb-6">
                  {data.bigQuestion}
                </h2>
                
                {/* Dialogue Area */}
                <div className="space-y-6 mb-8 max-h-[500px] overflow-y-auto pr-2">
                  {(data as any).dialogue?.map((line: any, idx: number) => {
                    const isMona = line.speaker === "Mona";
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className={`flex gap-4 items-start ${isMona ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg text-lg flex-shrink-0 ${
                          isMona ? 'bg-rose-500' : 'bg-amber-500'
                        }`}>
                          {line.speaker[0]}
                        </div>
                        {/* Speech Bubble */}
                        <div className={`p-6 rounded-3xl max-w-[80%] flex flex-col gap-2 relative shadow-md ${
                          isMona 
                            ? 'bg-rose-50 border border-rose-100 text-slate-800 rounded-tl-none' 
                            : 'bg-amber-50/70 border border-amber-100 text-slate-800 rounded-tr-none'
                        }`}>
                          <span className="text-xs font-black uppercase text-slate-400">
                             {line.speaker}
                          </span>
                          <p className="text-lg font-black text-[#002147] leading-relaxed">
                            {line.english}
                          </p>
                          <p className="text-sm font-bold text-slate-500 border-t border-dashed border-slate-200/60 pt-2">
                            {line.arabic}
                          </p>
                          <button
                            onClick={() => speak(line.english, 'en-US')}
                            className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-xl transition-all shadow-sm border border-slate-100`}
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Instructions */}
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-8 flex justify-between items-center gap-4">
                  <p className="text-sm font-bold text-amber-800">
                    {isRtl ? 'استمع للحوار وتدرب على النطق بالضغط على أيقونات الصوت، ثم انتقل لتمارين التدريب للتحقق من فهمك!' : 'Listen to the dialogue, practice pronunciation by clicking the audio icons, then proceed to the training exercises to check your understanding!'}
                  </p>
                </div>

                {/* Confirm/Next Button */}
                <div className="flex justify-end">
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setStep('quiz')}
                     className="bg-[#002147] text-white py-4 px-10 rounded-2xl text-lg font-black shadow-xl hover:bg-slate-800 transition-colors flex items-center gap-3"
                   >
                     {isRtl ? 'بدء التمارين' : 'Start Practice'}
                     <ChevronRight size={22} className={isRtl ? 'rotate-180' : ''} />
                   </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === ('languageLab' as any) && languageData && (
            <motion.div
              key="language-lab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                      {languageData.type === 'grammar' ? <BookOpen size={24} /> : <Layers size={24} />}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-[#002147]">{isRtl ? languageData.titleAr : languageData.title}</h2>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Explanation Lab</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-8 relative">
                     <button 
                       onClick={() => isSpeaking ? stopSpeak() : speak(isRtl ? languageData.explanationAr : languageData.explanation, isRtl ? 'ar-SA' : 'en-US')}
                       className="absolute top-4 right-4 p-3 bg-white text-indigo-600 rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100"
                     >
                       {isSpeaking ? <Square size={18} fill="currentColor" /> : <Volume2 size={18} />}
                     </button>
                     <p className="text-xl font-bold text-slate-700 leading-relaxed max-w-[90%]">
                        {isRtl ? languageData.explanationAr : languageData.explanation}
                     </p>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={14} />
                        Examples / أمثلة
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {languageData.examples.map((ex, idx) => (
                           <motion.div 
                             key={idx}
                             whileHover={{ scale: 1.02 }}
                             className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2"
                           >
                              <div className="flex items-center justify-between">
                                 <p className="text-lg font-black text-[#002147]">{ex.en}</p>
                                 <button onClick={() => speak(ex.en)} className="text-slate-300 hover:text-indigo-600 transition-colors">
                                    <Volume2 size={16} />
                                 </button>
                              </div>
                              <p className="text-slate-400 font-bold text-sm border-t border-slate-50 pt-2">{ex.ar}</p>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                     <Sparkles size={120} />
                  </div>
                  
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-10">
                        <div>
                           <h3 className="text-2xl font-black mb-2">Practice Exercise</h3>
                           <p className="text-indigo-300 font-bold">Apply what you learned!</p>
                        </div>
                        <div className="bg-white/10 px-6 py-2 rounded-xl border border-white/20">
                           <span className="font-black text-xl italic">{currentExerciseIdx + 1} / {languageData.exercises.length}</span>
                        </div>
                     </div>

                     <AnimatePresence mode="wait">
                        <motion.div 
                          key={currentExerciseIdx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                           <div className="flex flex-col md:flex-row gap-10">
                              {languageData.exercises[currentExerciseIdx].img && (
                                 <div className="w-full md:w-64 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 flex-shrink-0 bg-white/5">
                                    <img 
                                      src={languageData.exercises[currentExerciseIdx].img} 
                                      alt="" 
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover" 
                                    />
                                 </div>
                              )}
                              <div className="flex-1">
                                 <h4 className="text-2xl font-black mb-8 leading-relaxed">
                                    {languageData.exercises[currentExerciseIdx].question}
                                    {languageData.exercises[currentExerciseIdx].context && (
                                       <span className="block text-sm text-indigo-300 mt-2 italic">({languageData.exercises[currentExerciseIdx].context})</span>
                                    )}
                                 </h4>

                                 <div className="grid grid-cols-1 gap-4">
                                    {languageData.exercises[currentExerciseIdx].type === 'choose' || languageData.exercises[currentExerciseIdx].type === 'identify' ? (
                                       languageData.exercises[currentExerciseIdx].options?.map((opt) => (
                                          <button
                                             key={opt}
                                             onClick={() => handleLanguageExercise(opt)}
                                             className={`w-full py-5 rounded-2xl bg-white/10 border-2 border-white/10 hover:border-white hover:bg-white/20 transition-all text-left px-8 font-black text-lg flex items-center justify-between group ${exerciseAnswers[languageData.exercises[currentExerciseIdx].id] === opt ? 'border-white bg-white/20' : ''}`}
                                          >
                                             {opt}
                                             <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                          </button>
                                       ))
                                    ) : (
                                       <div className="flex flex-col gap-4">
                                          <input 
                                             type="text"
                                             value={userInput}
                                             onChange={(e) => setUserInput(e.target.value)}
                                             onKeyDown={(e) => e.key === 'Enter' && handleLanguageExercise(userInput)}
                                             placeholder="Type your answer here..."
                                             className="w-full py-5 px-8 rounded-2xl bg-white/5 border-2 border-white/20 focus:border-white focus:bg-white/10 outline-none font-black text-xl placeholder:text-white/20 transition-all"
                                          />
                                          <button 
                                             onClick={() => handleLanguageExercise(userInput)}
                                             className="py-4 bg-white text-indigo-900 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-colors shadow-xl"
                                          >
                                             Check Answer
                                          </button>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 'reading' && isReading && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                     <button 
                       onClick={() => isSpeaking ? stopSpeak() : speak((data as any).reading.text)}
                       className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg group ${isSpeaking ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                       title={isSpeaking ? "Stop Reading" : "Listen to Reading"}
                     >
                       {isSpeaking ? (
                         <Square className="group-hover:scale-110 transition-transform fill-current" size={28} />
                       ) : (
                         <Volume2 className="group-hover:scale-110 transition-transform" size={28} />
                       )}
                     </button>
                  </div>

                  <span className="inline-block px-4 py-1 bg-sky-100 text-sky-600 rounded-full text-[12px] font-black uppercase tracking-widest mb-6">
                    Reading Passage
                  </span>
                  
                  <h2 className="text-4xl font-black text-[#002147] mb-8">{(data as any).reading.title}</h2>
                  
                  <div className="prose prose-slate max-w-none">
                     {(data as any).reading.text.split('\n\n').map((para: string, idx: number) => (
                       <p key={idx} className="text-xl leading-relaxed text-slate-600 font-medium mb-6">
                         {para}
                       </p>
                     ))}
                  </div>

                  <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center">
                     <p className="text-sm font-bold text-blue-700 italic">
                       {isRtl ? 'استمع إلى النص بتركيز ثم أجب عن الأسئلة بالأسفل.' : 'Listen to the text carefully then answer the questions below.'}
                     </p>
                  </div>
              </div>

              <div className="space-y-8 mt-12 mb-12">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-[#002147] flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-500" />
                      Comprehension Quiz
                    </h3>
                    <div className="bg-white px-4 py-1 rounded-lg border border-slate-200 font-black text-xs">
                      {Object.keys(compAnswers).length} / {(data as any).comprehension.length}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {(data as any).comprehension.map((q: any, idx: number) => (
                      <div key={q.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50">
                        <div className="flex items-start gap-4 mb-6">
                            <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black flex-shrink-0">{idx + 1}</span>
                            <h4 className="text-xl font-bold text-[#002147]">{q.question}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                            {q.options.map((opt: string) => (
                              <button
                                  key={opt}
                                  onClick={() => handleCompQuiz(q.id, opt)}
                                  className={`py-4 px-6 rounded-2xl text-left rtl:text-right font-bold transition-all border-2 ${
                                    compAnswers[q.id] === opt
                                      ? opt === q.correct 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                        : 'bg-rose-50 border-rose-500 text-rose-700'
                                      : 'bg-slate-50 border-transparent hover:border-blue-500 text-slate-500'
                                  }`}
                              >
                                  {opt}
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </motion.div>
          )}

          {step === 'matching' && (
            <motion.div 
              key="matching"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h2 className="text-3xl font-black text-[#002147]">
                      {isReading ? (isRtl ? 'أ. مختبر المفردات' : 'A. Vocabulary Lab') : `A. ${t.oxfordMatchWords}`}
                    </h2>
                    <p className="text-slate-400 font-bold">{isRtl ? 'انقر على الصورة الصحيحة للكلمة' : 'Click the correct image for each word'}</p>
                 </div>
                 <div className="bg-white px-5 py-2 rounded-xl border border-slate-200">
                    <span className="text-[#002147] font-black">{Object.keys(matchingStatus).length} / {data.vocab.length}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {data.vocab.map((v) => (
                  <motion.button
                    key={v.id}
                    disabled={matchingStatus[v.id]}
                    onClick={() => handleMatch(v.id, v.word)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative aspect-square rounded-2xl overflow-hidden shadow-sm border-4 transition-all bg-slate-50 flex items-center justify-center ${
                      matchingStatus[v.id] ? 'border-emerald-500 grayscale' : 'border-white hover:border-blue-500'
                    }`}
                  >
                    <HelpCircle size={32} className="absolute text-slate-200" />
                    <img 
                      src={v.img} 
                      alt={v.word} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 z-20" />
                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg py-1 px-2">
                       <p className="text-[10px] font-black text-[#002147] uppercase truncate">{v.word}</p>
                    </div>
                    {matchingStatus[v.id] && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                         <div className="bg-white rounded-full p-2">
                            <CheckCircle2 className="text-emerald-500" size={24} />
                         </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
                       <HelpCircle size={24} />
                    </div>
                    <div>
                       <h4 className="font-black text-[#002147]">{isRtl ? 'تعليمات' : 'Instructions'}</h4>
                       <p className="text-sm font-medium text-blue-600">{isRtl ? 'طابق جميع الكلمات الـ 10 للانتقال للاختبار' : 'Match all 10 words to proceed to the quiz'}</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-14 h-14 bg-[#C49E3A] text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <HelpCircle size={28} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-[#002147]">
                      {isGrammar 
                        ? (isRtl ? 'تمارين التدريب' : 'Practice Exercises')
                        : isReading 
                          ? (isRtl ? 'ب. تحليل النص' : 'B. Text Analysis Lab') 
                          : `B. ${t.oxfordQuizTime}`}
                    </h2>
                    <p className="text-slate-400 font-bold">
                      {isGrammar 
                        ? ((data as any).practice?.instructions_ar || (isRtl ? 'اختر الإجابة الصحيحة' : 'Choose the correct answer'))
                        : (isRtl ? 'اختر الإجابة الصحيحة بناءً على الصورة' : 'Choose the correct answer based on the picture')}
                    </p>
                 </div>
              </div>

              <div className="space-y-12">
                {data.quiz.map((q, idx) => (
                  <div key={q.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-100/50">
                    <div className={isGrammar ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-10"}>
                      {!isGrammar && (
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                          <ImageIcon size={64} className="absolute text-slate-200" />
                          <img 
                            src={q.img} 
                            alt="Question" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover relative z-10"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.opacity = '0';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                           <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">{idx + 1}</span>
                           <h3 className="text-2xl font-black text-[#002147]">{q.question}</h3>
                        </div>
                        <div className="space-y-4">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleQuiz(q.id, opt)}
                              className={`w-full py-4 px-6 rounded-2xl text-left rtl:text-right font-black transition-all border-2 ${
                                quizAnswers[q.id] === opt
                                  ? opt === q.correct 
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                    : 'bg-rose-50 border-rose-500 text-rose-700'
                                  : 'bg-slate-50 border-transparent hover:border-blue-500 text-slate-500'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                 <span>{opt}</span>
                                 {quizAnswers[q.id] === opt && (
                                   opt === q.correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />
                                 )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'finish' && (
            <motion.div 
              key="finish"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-40 h-40 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Trophy size={80} />
              </div>
              <h2 className="text-5xl font-black text-[#002147] mb-6">
                {score === (isLanguageLab ? languageData.exercises.length : data.quiz.length) ? t.oxfordExcellent : t.oxfordTryAgain}
              </h2>
              <p className="text-xl text-slate-400 font-bold mb-12">
                {isRtl 
                  ? `لقد أكملت الدرس بنجاح وحصلت على ${score} من ${isLanguageLab ? languageData.exercises.length : data.quiz.length} في الاختبار!` 
                  : `You completed the lesson and scored ${score} out of ${isLanguageLab ? languageData.exercises.length : data.quiz.length} in the quiz!`}
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <button
                  onClick={() => {
                    setStep('intro');
                    setMatchingStatus({});
                    setQuizAnswers({});
                    setScore(0);
                    setCurrentExerciseIdx(0);
                    setExerciseAnswers({});
                    setUserInput('');
                  }}
                  className="bg-white border-2 border-[#002147] text-[#002147] px-10 py-4 rounded-2xl font-black hover:bg-[#002147] hover:text-white transition-all shadow-lg"
                >
                  {isRtl ? 'إعادة الدرس' : 'Restart Lesson'}
                </button>
                <button
                  onClick={onBack}
                  className="bg-[#002147] text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl"
                >
                  <Sparkles size={20} />
                  {isRtl ? 'العودة للملحق' : 'Back to Companion'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AILessonCompanion lesson={isLanguageLab ? languageData : (data || {})} isRtl={isRtl} />
    </div>
  );
};
