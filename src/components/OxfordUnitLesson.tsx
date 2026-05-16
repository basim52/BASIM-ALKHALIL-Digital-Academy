import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  Sparkles,
  HelpCircle,
  PlayCircle,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OxfordUnitLessonProps {
  lang: Language;
  unitId: number;
  onBack: () => void;
}

const LESSON_DATA = {
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
  }
};

export const OxfordUnitLesson = ({ lang, unitId, onBack }: OxfordUnitLessonProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const data = LESSON_DATA[unitId as keyof typeof LESSON_DATA];

  const [step, setStep] = useState<'intro' | 'reading' | 'matching' | 'quiz' | 'finish'>('intro');
  const [matchingStatus, setMatchingStatus] = useState<Record<number, boolean>>({});
  const [compAnswers, setCompAnswers] = useState<Record<number, string | null>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | null>>({});
  const [score, setScore] = useState(0);

  const isReading = (data as any)?.isReadingLesson;

  const handleStart = () => {
    if (isReading) {
      setStep('reading');
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
    window.speechSynthesis.speak(utterance);
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
    const question = data.quiz.find(q => q.id === questionId);
    if (option === question?.correct) {
      setScore(prev => prev + 1);
      speak("Correct!", "en-US");
    } else {
      speak("Try again", "en-US");
    }

    if (Object.keys(quizAnswers).length + 1 === data.quiz.length) {
      setTimeout(() => {
        setStep('finish');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1500);
    }
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
                    onClick={() => speak(data.bigQuestion)}
                    className="mt-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full mx-auto flex items-center justify-center transition-all group"
                  >
                    <Volume2 className="group-hover:scale-110 transition-transform" size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-left rtl:text-right">
                    <h3 className="text-xl font-black text-[#002147] mb-4 flex items-center gap-3">
                       <PlayCircle className="text-blue-500" />
                       {isRtl ? 'خطة الدرس' : 'Lesson Plan'}
                    </h3>
                    <div className="flex items-start gap-4 mb-6">
                       <p className="text-sm font-medium text-slate-400 leading-relaxed flex-1">
                          {isRtl 
                            ? 'بدلاً من التوصيل التقليدي بالخطوط، ستقوم بربط الكلمة بالصورة المناسبة لها من خلال النقر المباشر، مما يساعد على تثبيت المعنى عقلياً مع الصورة.' 
                            : 'Instead of traditional line matching, you will link each word to its appropriate image by clicking directly, which helps fix the meaning mentally with the visual.'}
                       </p>
                       <button 
                         onClick={() => speak(isRtl ? 'بدلاً من التوصيل التقليدي بالخطوط، ستقوم بربط الكلمة بالصورة المناسبة لها من خلال النقر المباشر، مما يساعد على تثبيت المعنى عقلياً مع الصورة.' : 'Instead of traditional line matching, you will link each word to its appropriate image by clicking directly, which helps fix the meaning mentally with the visual.', isRtl ? 'ar-SA' : 'en-US')}
                         className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors"
                       >
                         <Volume2 size={16} />
                       </button>
                    </div>
                    <ul className="space-y-4 text-slate-500 font-bold">
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
                       onClick={() => speak((data as any).reading.text)}
                       className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg group"
                       title="Listen to Reading"
                     >
                       <Volume2 className="group-hover:scale-110 transition-transform" size={28} />
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
                    <h2 className="text-3xl font-black text-[#002147]">A. {t.oxfordMatchWords}</h2>
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
                    <h2 className="text-3xl font-black text-[#002147]">B. {t.oxfordQuizTime}</h2>
                    <p className="text-slate-400 font-bold">{isRtl ? 'اختر الإجابة الصحيحة بناءً على الصورة' : 'Choose the correct answer based on the picture'}</p>
                 </div>
              </div>

              <div className="space-y-12">
                {data.quiz.map((q, idx) => (
                  <div key={q.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-100/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                {score === data.quiz.length ? t.oxfordExcellent : t.oxfordTryAgain}
              </h2>
              <p className="text-xl text-slate-400 font-bold mb-12">
                {isRtl 
                  ? `لقد أكملت الدرس بنجاح وحصلت على ${score} من ${data.quiz.length} في الاختبار!` 
                  : `You completed the lesson and scored ${score} out of ${data.quiz.length} in the quiz!`}
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <button
                  onClick={() => {
                    setStep('intro');
                    setMatchingStatus({});
                    setQuizAnswers({});
                    setScore(0);
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
    </div>
  );
};
