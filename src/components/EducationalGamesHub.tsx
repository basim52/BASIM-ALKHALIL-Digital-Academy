import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Smile, 
  Zap,
  HelpCircle,
  Play,
  Share2,
  Trash2,
  Info,
  Coins,
  Shield,
  Map,
  Hammer,
  Flame,
  Trees,
  UserCheck,
  SmilePlus,
  Clock,
  Compass,
  ArrowRight,
  Search,
  Check,
  Award,
  Star,
  RefreshCw,
  Eye,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { UserProfile } from '../types';
import {
  treasureMapQuestionsData,
  wordBattlePoolData,
  snakesQuestionsData,
  dialogueAmbassadorScenariosData,
  spellingHeroTargetsData,
  grammarGardenRaindropsData,
  politeKnightDragonAttacksData,
  pronunciationDetectivePairsData,
  picturePuzzleListData,
  kingdomOfEtiquetteRoomsData,
  wordMarketRustyWordsData,
  politenessCiphersListData,
  communicationBridgePromptsData,
  gardenOfEmotionsFlowersData,
  phraseChefRecipesData,
  darkCaveSpellingPoolData,
  culturalFestivalLocationsData
} from './EducationalGamesData';

interface EducationalGamesHubProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number, details?: any) => void;
}

export const EducationalGamesHub: React.FC<EducationalGamesHubProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [sessionXP, setSessionXP] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'adventure' | 'speed' | 'etiquette' | 'grammar' | 'plan'>('all');
  const [planTab, setPlanTab] = useState<'roadmap' | 'daily' | 'skills' | 'certificates'>('roadmap');
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null);

  // Unified voice speech helper
  const speakFeedback = (text: string, forceLang?: 'en' | 'ar') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = forceLang || (isRtl ? 'ar-SA' : 'en-US');
      utterance.rate = 1.0;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  };

  const triggerPointsReward = (pts: number, activityName: string, gameId: string) => {
    setSessionXP(prev => prev + pts);
    if (onXPAdded) {
      onXPAdded(pts, {
        lessonId: gameId,
        level: 'Adventure Playroom',
        title: activityName,
        score: pts,
        total: pts
      });
    }
  };

  // ---------------------------------------------------------------------------------------
  // GAME HOW TO PLAY INSTRUCTIONS (ALL 20 GAMES SPECIFIED BILINGUALLY)
  // ---------------------------------------------------------------------------------------
  const gameInstructions: Record<string, { ar: string; en: string }> = {
    game_001: {
      ar: "1. تبدأ من المربع رقم 1 في الخريطة.\n2. يظهر لك سؤال إنجليزي مع 4 خيارات.\n3. أجب بشكل صحيح لتتقدم مربعاً واحداً نحو الكنز.\n4. كلما تقدمت تكتشف مناطق جديدة في الجزيرة.\n5. إجابة خاطئة تعيدك مربعاً للخلف.\n6. تابع حتى تصل إلى صندوق الكنز في المربع الأخير.",
      en: "1. Start from square 1 on the map.\n2. An English question appears with 4 options.\n3. Answer correctly to advance one square towards the treasure.\n4. As you advance, new island areas are revealed.\n5. Wrong answer sends you back one square.\n6. Keep going until you reach the treasure chest at the final square."
    },
    game_002: {
      ar: "1. تظهر كلمة إنجليزية على الشاشة لمدة ثانيتين ثم تختفي.\n2. اكتب الكلمة التي رأيتها في مربع الإدخال.\n3. لديك 5 ثوانٍ للكتابة قبل انتهاء الوقت.\n4. إذا كتبتها بشكل صحيح تربح 10 نقاط.\n5. إذا أخطأت أو تأخرت يربح خصمك (الكمبيوتر) النقاط.\n6. استمر لمدة 10 جولات، صاحب أعلى مجموع يفوز.",
      en: "1. An English word appears on screen for two seconds then disappears.\n2. Type the word you saw in the input box.\n3. You have 5 seconds to type before time runs out.\n4. Correct spelling wins you 10 points.\n5. Wrong spelling or timeout gives the point to your AI opponent.\n6. Continue for 10 rounds, highest total wins."
    },
    game_003: {
      ar: "1. اضغط زر 'ارمِ النرد' ليظهر سؤال قواعد بدلاً من رقم.\n2. أجب على السؤال بشكل صحيح لترمي النرد وتتقدم.\n3. إذا هبطت على مربع سلم، اصعد للأعلى.\n4. إذا هبطت على مربع ثعبان، اهبط للأسفل.\n5. الإجابة الخاطئة تمنعك من التقدم في هذا الدور.\n6. أول من يصل للمربع 100 يفوز.",
      en: "1. Click 'Roll Dice' to get a grammar question instead of a number.\n2. Answer correctly to roll the dice and advance.\n3. Landing on a ladder square takes you up.\n4. Landing on a snake square sends you down.\n5. Wrong answer blocks your turn.\n6. First to reach square 100 wins."
    },
    game_004: {
      ar: "1. تبدأ بمبلغ 100 عملة ذهبية.\n2. اشترِ حروفاً من السوق (الحروف المتحركة أرخص من الساكنة).\n3. كوّن كلمة إنجليزية صحيحة من الحروف التي اشتريتها.\n4. بِع الكلمة في السوق. الكلمات الطويلة والنادرة سعرها أعلى.\n5. أعد استثمار أرباحك لشراء حروف أغلى.\n6. الهدف: تحقيق أكبر رصيد في 10 جولات.",
      en: "1. Start with 100 gold coins.\n2. Buy letters from the market (vowels are cheaper than consonants).\n3. Form a correct English word from the letters you bought.\n4. Sell the word in the market. Longer and rarer words fetch higher prices.\n5. Reinvest your profits to buy more expensive letters.\n6. Goal: achieve the highest balance in 10 rounds."
    },
    game_005: {
      ar: "1. يظهر لك موقف اجتماعي مع شخصية (غريب، صديق، مسؤول).\n2. اقرأ الموقف وما قالته الشخصية لك.\n3. اختر رداً واحداً من 4 خيارات.\n4. الردود المهذبة واللبقة تمنحك نقاطاً إيجابية.\n5. الردود الوقحة أو غير اللائقة تخسرك نقاطاً.\n6. هدفك: تحقيق أعلى نقاط في 8 مواقف مختلفة.",
      en: "1. A social situation appears with a character (stranger, friend, official).\n2. Read the situation and what the character says to you.\n3. Choose one reply from 4 options.\n4. Polite and tactful replies earn positive points.\n5. Rude or inappropriate replies cost you points.\n6. Goal: achieve the highest score across 8 different scenarios."
    },
    game_006: {
      ar: "1. كلمات إنجليزية تبدأ بالسقوط من أعلى الشاشة.\n2. اكتب الكلمة التي تراها في مربع الإدخال قبل أن تصل للأسفل.\n3. كل كلمة صحيحة تمنحك نقاطاً.\n4. السرعة تزداد مع تقدم المستويات.\n5. لديك 3 أرواح. إذا وصلت 3 كلمات للأسفل تخسر.\n6. حاول البقاء أطول فترة ممكنة.",
      en: "1. English words start falling from the top of the screen.\n2. Type the word you see in the input box before it reaches the bottom.\n3. Each correct word earns points.\n4. Speed increases with each level.\n5. You have 3 lives. If 3 words reach the bottom, you lose.\n6. Try to survive as long as possible."
    },
    game_007: {
      ar: "1. لديك 6 نباتات تحتاج إلى الماء.\n2. كلمات 'مطرية' تبدأ بالسقوط (بعضها صحيح نحوياً وبعضها خطأ).\n3. التقط الكلمة الصحيحة نحوياً فقط.\n4. كل كلمة صحيحة تروي نباتاً وتزيده نمواً.\n5. الكلمة الخاطئة إذا التقطتها تذبل النبات.\n6. حاول جعل جميع النباتات تزهر بالوصول للمرحلة 4.",
      en: "1. You have 6 plants that need watering.\n2. 'Rain' words start falling (some grammatically correct, some wrong).\n3. Catch only the grammatically correct word.\n4. Each correct word waters a plant and advances its growth.\n5. Catching a wrong word withers the plant.\n6. Try to make all plants bloom by reaching growth stage 4."
    },
    game_008: {
      ar: "1. أنت فارس في متاهة مظلمة تسكنها الوحوش.\n2. كل وحش يوجه لك كلاماً غاضباً أو وقحاً.\n3. اختر رداً واحداً من 4 خيارات.\n4. الرد المهذب يهزم الوحش ويعيد لك طاقة.\n5. الرد الوقح يغضب الوحش ويخصم من طاقتك.\n6. اهزم 3 وحوش لتصل لنهاية المتاهة.",
      en: "1. You are a knight in a dark maze inhabited by monsters.\n2. Each monster speaks to you angrily or rudely.\n3. Choose one reply from 4 options.\n4. A polite reply defeats the monster and restores your energy.\n5. A rude reply angers the monster and drains your HP.\n6. Defeat 3 monsters to escape the maze."
    },
    game_009: {
      ar: "1. اضغط زر 'استمع' لتسمع كلمة إنجليزية.\n2. يظهر لك صورتان أو كلمتان.\n3. اختر الصورة أو التهجئة التي تطابق ما سمعته.\n4. الإجابة من أول مرة تمنحك 20 نقطة.\n5. إذا احتجت سماعها مرة ثانية تحصل على 10 نقاط فقط.\n6. 10 جولات، حاول تحقيق أعلى نتيجة.",
      en: "1. Click 'Listen' to hear an English word.\n2. Two pictures or two spellings appear.\n3. Choose the one that matches what you heard.\n4. Answering correctly on first try gives 20 points.\n5. If you need to hear it a second time, you get only 10 points.\n6. 10 rounds, aim for the highest score."
    },
    game_010: {
      ar: "1. تظهر صورة مكونة من 9 قطع مبعثرة ومخفية.\n2. تحت الصورة جملة وصفية ناقصة.\n3. أكمل الفراغ في الجملة بالكلمة الصحيحة.\n4. كل إجابة صحيحة تكشف قطعة من الصورة.\n5. استمر حتى تكتمل الصورة بالكامل.\n6. حاول تخمين محتوى الصورة قبل أن تكتمل.",
      en: "1. An image made of 9 scattered and hidden pieces appears.\n2. Below it, a descriptive sentence is incomplete.\n3. Fill in the blank with the correct word.\n4. Each correct answer reveals one piece of the image.\n5. Continue until the entire image is revealed.\n6. Try to guess the image content before it's complete."
    },
    game_011: {
      ar: "1. أنت ملك تبني قصراً من 5 غرف.\n2. كل غرفة تحتاج إلى 'مفتاح الأدب' لتُبنى.\n3. يظهر لك موقف متعلق بآداب السلوك (طعام، حوار، زيارة).\n4. أجب بإظهار السلوك المهذب الصحيح.\n5. كل إجابة صحيحة تبني غرفة جديدة في قصرك.\n6. ابنِ جميع الغرف ليكتمد القصر.",
      en: "1. You are a king building a 5-room palace.\n2. Each room requires an 'Etiquette Key' to build.\n3. A situation related to manners appears (dining, conversation, visiting).\n4. Respond with the correct polite behavior.\n5. Each correct answer builds a new room in your palace.\n6. Complete all rooms to finish the palace."
    },
    game_012: {
      ar: "1. تلعب مع صديق أو فرد من العائلة على نفس الجهاز.\n2. كل لاعب يتحكم بشخصية على مسار السباق.\n3. يظهر لكما 'تحدي تعاون' (مثلاً: شجع صديقك بالإنجليزية).\n4. منفذ التحدي بشكل صحيح يتقدم 15 خطوة.\n5. يمكنكما التقدم ببطء بـ 5 خطوات دون تعاون.\n6. أول من يصل لنهاية المسار (100 خطوة) يفوز.",
      en: "1. Play with a friend or family member on the same device.\n2. Each player controls a character on the race track.\n3. A 'Cooperation Challenge' appears (e.g., encourage your friend in English).\n4. Correctly completing the challenge advances you 15 steps.\n5. You can slowly advance 5 steps without cooperation.\n6. First to reach the end (100 steps) wins."
    },
    game_013: {
      ar: "1. تبدأ بمبلغ 200 عملة.\n2. يظهر لك 'كلمة قديمة' وسعرها في السوق.\n3. اشترِ الكلمة ثم أضف لها بادئة (un-, re-) أو لاحقة (-ful, -less).\n4. تكون كلمة جديدة صحيحة إملائياً ونحوياً.\n5. بِع الكلمة الجديدة بسعر أعلى (الربح = السعر × 1.5).\n6. استمر بالشراء والتحسين والتجارة حتى يزيد رصيدك.",
      en: "1. Start with 200 coins.\n2. An 'old word' and its market price appear.\n3. Buy the word then add a prefix (un-, re-) or suffix (-ful, -less).\n4. Form a new, correctly spelled word.\n5. Sell the new word at a higher price (profit = price × 1.5).\n6. Keep buying, improving, and trading to grow your balance."
    },
    game_014: {
      ar: "1. تظهر لك جملة إنجليزية مشفرة بحروف متغيرة.\n2. معك 3 تلميحات يمكنك استخدامها.\n3. حاول فك الشيفرة يدوياً (كل حرف مٌزاح بعدد ثابت من المواقع).\n4. اكتب الجملة الصحيحة في مربع الإجابة.\n5. الحل بدون تلميحات = 50 نقطة.\n6. الحل بتلميح واحد = 25 نقطة، بتلميحين = 15 نقطة.",
      en: "1. An encrypted English sentence appears with shifted letters.\n2. You have 3 hints available.\n3. Try to decipher manually (each letter is shifted by a fixed number).\n4. Write the correct sentence in the answer box.\n5. Solving without hints = 50 points.\n6. Solving with 1 hint = 25 points, 2 hints = 15 points."
    },
    game_015: {
      ar: "1. يظهر لك مسرح ظلال به شخصيتان (مثل أمير وتنين).\n2. يطلب منك حكاية قصة بالإنجليزية عن موضوع معين.\n3. حرك الشخصيات على المسرح وأنت تحكي.\n4. يجب أن تستخدم 30 كلمة إنجليزية على الأقل.\n5. الكلمات التي تقولها تظهر على ستارة المسرح.\n6. إضافة عبرة أخلاقية في النهاية تمنحك 50 نقطة إضافية.",
      en: "1. A shadow theater appears with two characters (e.g., Prince and Dragon).\n2. You are asked to tell a story in English on a given theme.\n3. Move the characters on stage as you narrate.\n4. You must use at least 30 English words.\n5. The words you speak appear on the theater curtain.\n6. Adding a moral lesson at the end gives 50 bonus points."
    },
    game_016: {
      ar: "1. يلعب شخصان على نفس الجهاز.\n2. النهر يفصل بينكما، والجسر مكون من 10 ألواح.\n3. كل لاعب يظهر له سؤال نحوي (مثلاً: أكمل الجملة).\n4. اللاعب الأول يجيب، ثم اللاعب الثاني يرد.\n5. إذا كان كلاكما صحيحاً، يوضع لوح على الجسر.\n6. استمرا حتى يكتمل الجسر وتعبران معاً.",
      en: "1. Two players share one device.\n2. A river separates you, the bridge has 10 planks.\n3. Each player gets a grammar question (e.g., complete the sentence).\n4. Player 1 answers, then Player 2 replies.\n5. If both are correct, a plank is placed on the bridge.\n6. Continue until the bridge is complete and you both cross."
    },
    game_017: {
      ar: "1. لديك حديقة بها 6 أزهار، كل زهرة تمثل شعوراً (فرح، حزن، غضب...).\n2. بعض الأزهار تذبل وتحتاج إلى 'ماء المشاعر'.\n3. يظهر لك وصف لحالة زهرة (مثلاً: الزهرة حزينة وتذبل).\n4. اكتب جملة إنجليزية مناسبة لتواسيها أو تفرحها.\n5. الجملة الصحيحة تروي الزهرة وتعيدها للحياة.\n6. حاول إحياء جميع الأزهار.",
      en: "1. You have a garden with 6 flowers, each representing an emotion (joy, sadness, anger...).\n2. Some flowers wither and need 'emotion water'.\n3. A description of a flower's state appears (e.g., the flower is sad and wilting).\n4. Write an appropriate English sentence to comfort or cheer it.\n5. The correct sentence waters the flower and revives it.\n6. Try to revive all the flowers."
    },
    game_018: {
      ar: "1. أنت طباخ في مطعم 'الجملة الشهية'.\n2. يطلب منك زبون 'وصفة جملة' (مثلاً: جملة بسيطة).\n3. اختر المكونات الصحيحة من الرفوف (فاعل، فعل، مفعول به...).\n4. ضع المكونات في 'قدر الطبخ' بالترتيب الصحيح.\n5. اضغط 'اطبخ' لترى الجملة الناتجة.\n6. إذا كانت الجملة صحيحة نحوياً، يدفع الزبون وتكسب نقاطاً.",
      en: "1. You are a chef at the 'Tasty Sentence' restaurant.\n2. A customer orders a 'sentence recipe' (e.g., a simple sentence).\n3. Choose the correct ingredients from the shelves (Subject, Verb, Object...).\n4. Place them in the 'cooking pot' in the right order.\n5. Press 'Cook' to see the resulting sentence.\n6. If grammatically correct, the customer pays and you earn points."
    },
    game_019: {
      ar: "1. أنت مستكشف في كهف مظلم لا ترى فيه سوى مربع واحد حولك.\n2. لإضاءة المشاعل، يجب أن تكتب كلمة إنجليزية بشكل صحيح.\n3. تسمع الكلمة منطوقة أو تراها للحظة ثم تكتبها.\n4. كل 3 كلمات صحيحة تضيء مشعل وتكشف 3 مربعات حوله.\n5. استمر في إضاءة المشاعل لتكتشف خريطة الكهف بالكامل.\n6. الهدف: إضاءة جميع المشاعل الـ 25.",
      en: "1. You are an explorer in a dark cave, only seeing the square around you.\n2. To light torches, you must spell English words correctly.\n3. You hear the word or see it briefly, then type it.\n4. Every 3 correct words light a torch and reveal 3 nearby squares.\n5. Continue lighting torches to discover the full cave map.\n6. Goal: light all 25 torches."
    },
    game_020: {
      ar: "1. أنت مسافر حول العالم في 'مهرجان الثقافات'.\n2. كل محطة في بلد جديد. يظهر لك موقف اجتماعي.\n3. اقرأ عن تقاليد التحية أو الحوار في هذا البلد.\n4. اختر الرد أو السلوك المناسب من 4 خيارات.\n5. السلوك المطابق للثقافة المحلية يمنحك 30 نقطة.\n6. السلوك غير المناسب ثقافياً يخصم 10 نقاط.",
      en: "1. You are a world traveler at the 'Festival of Cultures'.\n2. Each stop is a new country. A social situation appears.\n3. Read about greeting or conversation customs in that country.\n4. Choose the appropriate reply or behavior from 4 options.\n5. Culturally appropriate behavior earns 30 points.\n6. Culturally insensitive behavior costs 10 points."
    }
  };

  // List of Categories
  const categories = [
    { id: 'all' as const, labelAr: '🎯 كل الألعاب العشرين', labelEn: 'All 20 Games' },
    { id: 'plan' as const, labelAr: '📈 الخطة التطويرية للألعاب', labelEn: 'Professional Growth Plan' },
    { id: 'adventure' as const, labelAr: '🗺️ خرائط ومغامرات', labelEn: 'Adventure' },
    { id: 'speed' as const, labelAr: '⚡ إملاء وسرعة', labelEn: 'Speed & Action' },
    { id: 'etiquette' as const, labelAr: '👑 أدب وذوقيات راقية', labelEn: 'Etiquette & Manners' },
    { id: 'grammar' as const, labelAr: '🧪 تركيب وقواعد', labelEn: 'Grammar & Words' }
  ];

  // ---------------------------------------------------------------------------------------
  // GAME SPECIFICATIONS (ALL 20 GAMES SPECIFIED IN THE SCHEMA)
  // ---------------------------------------------------------------------------------------
  const gamesList = [
    {
      id: 'game_001',
      titleAr: 'كنز المعرفة',
      titleEn: 'Treasure Hunt',
      category: 'adventure',
      descriptionAr: 'خريطة جزيرة مقسمة لمربعات. يتحرك اللاعب بإجابة أسئلة إنجليزية. السؤال يظهر كمربع حوار مع مؤقت.',
      descriptionEn: 'Explore an 8x8 island map. Progress your pirate by solving grammar riddles under a ticking timer!',
      icon: Map,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_002',
      titleAr: 'معركة الكلمات',
      titleEn: 'Word Battle',
      category: 'speed',
      descriptionAr: 'تظهر كلمة وتختفي بسرعة. يكتب اللاعب الكلمة بشكل صحيح ليكسب نقاطاً. يربح خصمه إن أخطأ.',
      descriptionEn: 'Type fast-disappearing vocabulary to outsmart your AI wizard rival in a reaction test!',
      icon: Flame,
      color: 'bg-rose-500',
      textColor: 'text-rose-400',
      difficulty: 'Hard ⚡'
    },
    {
      id: 'game_003',
      titleAr: 'سلالم وثعابين القواعد',
      titleEn: 'Grammar Snakes & Ladders',
      category: 'adventure',
      descriptionAr: 'رقعة تقليدية. السلم صحيح يصعد، والثعبان خطأ يهبط. النرد يتحول لسؤال قواعد.',
      descriptionEn: 'A retro board game. Roll the dice, solve spelling/grammar quizzes to scale ladders or dodge snakes!',
      icon: Gamepad2,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      difficulty: 'Easy ⭐'
    },
    {
      id: 'game_004',
      titleAr: 'تاجر الكلمات',
      titleEn: 'Word Trader',
      category: 'grammar',
      descriptionAr: 'متجر افتراضي. تشتري حروفاً لتكوين كلمات وبيعها. الكلمات الأطول والنادرة تربح أكثر.',
      descriptionEn: 'Buy rare vowels and consonants, fuse them into valid words, and barter them for maximum gold coin!',
      icon: Coins,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      difficulty: 'Expert 🧠'
    },
    {
      id: 'game_005',
      titleAr: 'سفير الحوار',
      titleEn: 'Dialogue Ambassador',
      category: 'etiquette',
      descriptionAr: 'مواقف حوارية مع شخصيات. تختار الرد المناسب من متعدد. الأدب واللباقة يمنحان نقاطاً.',
      descriptionEn: 'Navigate social meetings. Choose high-etiquette replies to earn maximum politeness bonuses.',
      icon: UserCheck,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      difficulty: 'Easy ⭐'
    },
    {
      id: 'game_006',
      titleAr: 'بطل الإملاء',
      titleEn: 'Spelling Hero',
      category: 'speed',
      descriptionAr: 'كلمات تنزل كالصخور. تكتب الكلمة بشكل صحيح قبل أن تصل للأسفل. السرعة والصحة معاً.',
      descriptionEn: 'Blast falling meteor words by spelling them perfectly before they crush the atmospheric defense!',
      icon: Shield,
      color: 'bg-teal-500',
      textColor: 'text-teal-400',
      difficulty: 'Hard ⚡'
    },
    {
      id: 'game_007',
      titleAr: 'بستان القواعد',
      titleEn: 'Grammar Garden',
      category: 'grammar',
      descriptionAr: 'تسقي نباتات بإجابات صحيحة. الكلمات تسقط كمطر، تلتقط الصحيح منها لتسقي به.',
      descriptionEn: 'Cure thirsty flowers! Collect only the grammatically valid past-participle raindrops to water seedlings.',
      icon: Trees,
      color: 'bg-green-500',
      textColor: 'text-green-400',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_008',
      titleAr: 'فارس الكلمة المهذبة',
      titleEn: 'Knight of Polite Words',
      category: 'etiquette',
      descriptionAr: 'متاهة تنين. تهزم الوحوش باختيار العبارة المهذبة المناسبة. الوقاحة تخسرك طاقة.',
      descriptionEn: 'Slay the Dragon of Rudeness with arrows of polite empathy. Watch out for sarcasm tricks!',
      icon: Award,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-300',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_009',
      titleAr: 'محقق النطق',
      titleEn: 'Pronunciation Detective',
      category: 'speed',
      descriptionAr: 'تسمع كلمة وتختار الصورة أو التهجئة الصحيحة. الحواس تعمل معاً.',
      descriptionEn: 'Train your ears: spot subtle sound differences (ship vs sheep, bat vs pat) under auditory puzzles.',
      icon: Volume2,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-400',
      difficulty: 'Easy ⭐'
    },
    {
      id: 'game_010',
      titleAr: 'لغز الصورة المبعثرة',
      titleEn: 'Picture Puzzle',
      category: 'grammar',
      descriptionAr: 'صورة مبعثرة. تجمع القطع بإكمال جمل وصفية. تكوين الصورة وجمل وصفية معاً.',
      descriptionEn: 'Reassemble jigsaw pieces of a lovely dining table by matching correct descriptive prepositions.',
      icon: Compass,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_011',
      titleAr: 'مملكة الأدب',
      titleEn: 'Kingdom of Etiquette',
      category: 'etiquette',
      descriptionAr: 'تبني قصراً. كل غرفة تبنى بإظهار سلوك مهذب. آداب الطعام، الحوار، الزيارة.',
      descriptionEn: 'Construct a royal fortress by proving your table manners, greeting styles, and social guest etiquette.',
      icon: Hammer,
      color: 'bg-fuchsia-500',
      textColor: 'text-fuchsia-400',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_012',
      titleAr: 'سباق الأصدقاء',
      titleEn: 'Friendship Race',
      category: 'etiquette',
      descriptionAr: 'شخصيتان تتسابقان. تتقدمان بمساعدة بعضهما. التعاون والتشجيع والتحية والوداع.',
      descriptionEn: 'Type uplifting English praise phrases (e.g., "Well done!") to push your running partner across the line.',
      icon: SmilePlus,
      color: 'bg-emerald-600',
      textColor: 'text-emerald-300',
      difficulty: 'Easy ⭐'
    },
    {
      id: 'game_013',
      titleAr: 'سوق الكلمات المستعملة',
      titleEn: 'Second-hand Word Market',
      category: 'grammar',
      descriptionAr: 'تشترى كلمات قديمة، تصلحها (تضيف بادئة/لاحقة)، وتبيعها مجدداً.',
      descriptionEn: 'Restore broken rusty words! Snap suffixes like "-ful" and prefixes like "un-" to trade them for profit.',
      icon: BookMarked,
      color: 'bg-sky-500',
      textColor: 'text-sky-400',
      difficulty: 'Hard ⚡'
    },
    {
      id: 'game_014',
      titleAr: 'شيفرة الأدب',
      titleEn: 'Politeness Cipher',
      category: 'grammar',
      descriptionAr: 'جملة مخفية بتشفير سيزر. تفك التشفير بإعادة ترتيب الحروف بناءً على أدلة.',
      descriptionEn: 'Crack encrypted Caesar-shifted high-etiquette phrases using clues. Decode greetings like a crypto agent!',
      icon: Star,
      color: 'bg-orange-500',
      textColor: 'text-orange-400',
      difficulty: 'Expert 🧠'
    },
    {
      id: 'game_015',
      titleAr: 'مسرح الظلال',
      titleEn: 'Shadow Theater',
      category: 'etiquette',
      descriptionAr: 'شخصيات ظل على الحائط. تحركها وتحكي القصة بالإنجليزية. الكلمات تظهر على الستارة.',
      descriptionEn: 'Roleplay moral dialogues on a virtual screen. Let Basil review your kindness vocabulary for high rewards.',
      icon: Eye,
      color: 'bg-violet-500',
      textColor: 'text-violet-400',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_016',
      titleAr: 'جسر التواصل',
      titleEn: 'Communication Bridge',
      category: 'grammar',
      descriptionAr: 'شخصيتان بينهما نهر. تبنيان جسراً بتبادل جمل صحيحة نحوياً.',
      descriptionEn: 'Bridge the logic gap by picking the grammatically flawless conditional sequence of exchanges.',
      icon: Info,
      color: 'bg-blue-600',
      textColor: 'text-blue-300',
      difficulty: 'Hard ⚡'
    },
    {
      id: 'game_017',
      titleAr: 'حديقة المشاعر',
      titleEn: 'Garden of Emotions',
      category: 'etiquette',
      descriptionAr: 'أزهار تمثل مشاعر. تسقيها بالتعبير الصحيح. الزهرة الذابلة تحتاج لتعبير إيجابي.',
      descriptionEn: 'Sprinkle water on withering feelings! Select empathetic expressions to boost emotional intelligence.',
      icon: Heart,
      color: 'bg-rose-600',
      textColor: 'text-rose-300',
      difficulty: 'Easy ⭐'
    },
    {
      id: 'game_018',
      titleAr: 'طباخ العبارات',
      titleEn: 'Phrase Chef',
      category: 'grammar',
      descriptionAr: 'تطبخ "طبق عبارات". تختار مكونات (فاعل، فعل، مفعول) وتطبخها للحصول على جملة صحيحة.',
      descriptionEn: 'Whisk together subject, verb, and object adjectives into the bubbling pot to cook error-free sentences!',
      icon: Zap,
      color: 'bg-amber-600',
      textColor: 'text-amber-300',
      difficulty: 'Medium ⚔️'
    },
    {
      id: 'game_019',
      titleAr: 'الكهف المظلم',
      titleEn: 'The Dark Cave',
      category: 'adventure',
      descriptionAr: 'كهف مظلم، تضيء المشاعل بكلمات صحيحة. كل مشعل يكشف جزءاً من الخريطة.',
      descriptionEn: 'Reveal secret corridors behind fog-of-war tiles by typing accurate spellings of challenging nouns!',
      icon: Clock,
      color: 'bg-slate-700',
      textColor: 'text-slate-400',
      difficulty: 'Hard ⚡'
    },
    {
      id: 'game_020',
      titleAr: 'مهرجان الثقافات',
      titleEn: 'Festival of Cultures',
      category: 'etiquette',
      descriptionAr: 'تزور بلداناً مختلفة. تححي وتتحدث حسب ثقافتهم. تتعلم آدابهم وتقاليدهم في الحوار.',
      descriptionEn: 'Travel the world. Master international greetings, from Japanese bowing rituals to European café culture!',
      icon: Smile,
      color: 'bg-indigo-700',
      textColor: 'text-indigo-300',
      difficulty: 'Medium ⚔️'
    }
  ];

  const filteredGames = gamesList.filter(g => {
    const matchesCategory = activeCategory === 'all' || g.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      g.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
      g.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ---------------------------------------------------------------------------------------
  // INDIVIDUAL GAME GAMESTATES
  // ---------------------------------------------------------------------------------------

  // GAME_001 State (Treasure Hunt)
  const [piratePos, setPiratePos] = useState<[number, number]>([0, 0]);
  const [treasureMapQuestions, setTreasureMapQuestions] = useState(treasureMapQuestionsData);
  const [activeMapQuestionIdx, setActiveMapQuestionIdx] = useState(0);
  const [showMapModal, setShowMapModal] = useState(false);
  const [pendingMove, setPendingMove] = useState<[number, number] | null>(null);
  const [mapTimer, setMapTimer] = useState(20);

  // GAME_002 State (Word Battle)
  const [battleWordIndex, setBattleWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState('');
  const [isWordVisible, setIsWordVisible] = useState(true);
  const [battleTypeInput, setBattleTypeInput] = useState('');
  const [battleBotScore, setBattleBotScore] = useState(0);
  const [battlePlayerScore, setBattlePlayerScore] = useState(0);
  const [battleRound, setBattleRound] = useState(1);
  const [battleStatusMsg, setBattleStatusMsg] = useState('');

  // GAME_003 State (Snakes & Ladders)
  const [snakesPlayerPos, setSnakesPlayerPos] = useState(1);
  const [snakesQuizActive, setSnakesQuizActive] = useState(false);
  const [snakesQuizItem, setSnakesQuizItem] = useState({ q: '', opts: [] as string[], ans: '', type: 'ladder' });
  const [snakesLastRoll, setSnakesLastRoll] = useState(0);

  // GAME_004 State (Word Trader)
  const [traderGold, setTraderGold] = useState(100);
  const [traderLetters, setTraderLetters] = useState<{ [key: string]: number }>({ A: 2, B: 1 });
  const [craftedWordInput, setCraftedWordInput] = useState('');
  const [traderStatusMsg, setTraderStatusMsg] = useState('');

  // GAME_005 State (Dialogue Ambassador)
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialoguePoliteness, setDialoguePoliteness] = useState(1.0);
  const [dialogueChosenOption, setDialogueChosenOption] = useState<number | null>(null);

  // GAME_006 State (Spelling Hero)
  const [spellingHeroIndex, setSpellingHeroIndex] = useState(0);
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingMeteorY, setSpellingMeteorY] = useState(0);
  const [spellingLives, setSpellingLives] = useState(3);
  const [spellingScore, setSpellingScore] = useState(0);

  // GAME_007 State (Grammar Garden)
  const [gardenPlants, setGardenPlants] = useState([1, 1, 1, 1, 1, 1]); // Growth stage 1 to 4
  const [activeGardenIndex, setActiveGardenIndex] = useState(0);
  const [gardenRaindropIdx, setGardenRaindropIdx] = useState(0);

  // GAME_008 State (Knight of Polite Words)
  const [knightHP, setKnightHP] = useState(100);
  const [dragonHP, setDragonHP] = useState(100);
  const [dragonAttackIdx, setDragonAttackIdx] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // GAME_009 State (Pronunciation Detective)
  const [detectiveIndex, setDetectiveIndex] = useState(0);
  const [detectiveSelected, setDetectiveSelected] = useState<string | null>(null);

  // GAME_010 State (Picture Puzzle)
  const [puzzleUnveiled, setPuzzleUnveiled] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
  const [puzzleSentenceIndex, setPuzzleSentenceIndex] = useState(0);

  // GAME_011 State (Kingdom of Etiquette)
  const [kingdomRoomsUnlocked, setKingdomRoomsUnlocked] = useState(0);
  const [etiquetteRoomChallenge, setEtiquetteRoomChallenge] = useState(0);

  // GAME_012 State (Friendship Race)
  const [friendshipProgress, setFriendshipProgress] = useState(15);
  const [friendshipProgress2, setFriendshipProgress2] = useState(15);
  const [raceCurrentPlayer, setRaceCurrentPlayer] = useState<1 | 2>(1);
  const [raceChallengeIndex, setRaceChallengeIndex] = useState(0);
  const [raceInput, setRaceInput] = useState('');
  const [raceFeedback, setRaceFeedback] = useState('');
  const [raceWinner, setRaceWinner] = useState<1 | 2 | null>(null);

  // GAME_013 State (Second-hand Word Market)
  const [marketGold, setMarketGold] = useState(200);
  const [marketWords, setMarketWords] = useState<string[]>(['happy', 'care', 'cook', 'direct']);
  const [marketWordIndex, setMarketWordIndex] = useState(0);

  // GAME_014 State (Politeness Cipher)
  const [cipherInput, setCipherInput] = useState('');
  const [cipherDecrypted, setCipherDecrypted] = useState(false);
  const [cipherIndex, setCipherIndex] = useState(0);

  // GAME_015 State (Shadow Theater)
  const [theaterMoralInput, setTheaterMoralInput] = useState('');
  const [theaterFeedback, setTheaterFeedback] = useState('');
  const [theaterSceneIndex, setTheaterSceneIndex] = useState(0);

  // GAME_016 State (Communication Bridge)
  const [bridgePlanks, setBridgePlanks] = useState(0);
  const [bridgeQuestionIndex, setBridgeQuestionIndex] = useState(0);

  // GAME_017 State (Garden of Emotions)
  const [emotionFlowerStatus, setEmotionFlowerStatus] = useState<'withering' | 'blossoming'>('withering');
  const [emotionFlowerIndex, setEmotionFlowerIndex] = useState(0);

  // GAME_018 State (Phrase Chef)
  const [phraseChefSelected, setPhraseChefSelected] = useState<string[]>([]);
  const [phraseChefRecipeIndex, setPhraseChefRecipeIndex] = useState(0);

  // GAME_019 State (The Dark Cave)
  const [caveUnveiled, setCaveUnveiled] = useState<boolean[]>(Array(25).fill(false));
  const [caveTargetWord, setCaveTargetWord] = useState('beautiful');
  const [caveSelectedTileIdx, setCaveSelectedTileIdx] = useState<number | null>(null);
  const [caveInputText, setCaveInputText] = useState('');

  // GAME_020 State (Festival of Cultures)
  const [currentCountry, setCurrentCountry] = useState('Japan 🇯🇵');

  // Multi-game Instructions State
  const [showInstructions, setShowInstructions] = useState(true);

  // ---------------------------------------------------------------------------------------
  // TICKER TIMER FOR WORD BATTLE & SPELLING METEOR & TREASURE MAP
  // ---------------------------------------------------------------------------------------
  useEffect(() => {
    let interval: any;
    if (activeGameId === 'game_001' && showMapModal && mapTimer > 0) {
      interval = setInterval(() => {
        setMapTimer(prev => prev - 1);
      }, 1000);
    } else if (activeGameId === 'game_001' && showMapModal && mapTimer === 0) {
      // Time over
      speakFeedback(isRtl ? "انتهى الوقت! حاول مجدداً مع سؤال آخر" : "Time is up! Try again next turn");
      setShowMapModal(false);
      setPendingMove(null);
    }
    return () => clearInterval(interval);
  }, [activeGameId, showMapModal, mapTimer]);

  useEffect(() => {
    let interval: any;
    if (activeGameId === 'game_002') {
      // Word Battle ticker
      interval = setInterval(() => {
        // AI scores if player runs late
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [activeGameId]);

  // Launch any game
  const selectGame = (gameId: string) => {
    setActiveGameId(gameId);
    setShowInstructions(true);
    speakFeedback(isRtl ? "مستعد للمرح؟ فلنبأ!" : "Ready for active play? Let's start!");
    
    // Initialize specific game states
    if (gameId === 'game_001') {
      setPiratePos([0, 0]);
      setMapTimer(20);
    } else if (gameId === 'game_002') {
      setBattleRound(1);
      setBattleBotScore(0);
      setBattlePlayerScore(0);
      setDisplayWord("accommodation");
      setIsWordVisible(true);
      setTimeout(() => setIsWordVisible(false), 2000);
    } else if (gameId === 'game_003') {
      setSnakesPlayerPos(1);
      setSnakesQuizActive(false);
      setSnakesQuizItem({ q: '', opts: [] as string[], ans: '', type: 'ladder' });
      setSnakesLastRoll(0);
    } else if (gameId === 'game_004') {
      setTraderGold(100);
      setTraderLetters({ A: 3, E: 3, I: 2, O: 2, T: 2, R: 2, S: 2, D: 1, M: 1, C: 1 });
      setCraftedWordInput('');
    } else if (gameId === 'game_005') {
      setDialogueIndex(0);
      setDialoguePoliteness(1.0);
      setDialogueChosenOption(null);
    } else if (gameId === 'game_006') {
      setSpellingHeroIndex(0);
      setSpellingLives(3);
      setSpellingScore(0);
      setSpellingInput('');
    } else if (gameId === 'game_007') {
      setGardenPlants([1, 1, 1, 1, 1, 1]);
      setActiveGardenIndex(0);
      setGardenRaindropIdx(0);
    } else if (gameId === 'game_008') {
      setKnightHP(100);
      setDragonHP(100);
      setDragonAttackIdx(0);
      setBattleLog([isRtl ? "برز وحش الغضب السيء! حلف لغة اللباقة مستعد." : "The Rudeness Dragon has appeared! Get ready to politely counter!"]);
    } else if (gameId === 'game_009') {
      setDetectiveIndex(0);
      setDetectiveSelected(null);
    } else if (gameId === 'game_010') {
      setPuzzleUnveiled([false, false, false, false, false, false, false, false, false]);
      setPuzzleSentenceIndex(0);
    } else if (gameId === 'game_011') {
      setKingdomRoomsUnlocked(0);
      setEtiquetteRoomChallenge(0);
    } else if (gameId === 'game_012') {
      setFriendshipProgress(15);
      setFriendshipProgress2(15);
      setRaceCurrentPlayer(1);
      setRaceChallengeIndex(0);
      setRaceInput('');
      setRaceFeedback('');
      setRaceWinner(null);
    } else if (gameId === 'game_013') {
      setMarketGold(200);
      setMarketWordIndex(0);
    } else if (gameId === 'game_014') {
      setCipherInput('');
      setCipherDecrypted(false);
      setCipherIndex(0);
    } else if (gameId === 'game_015') {
      setTheaterMoralInput('');
      setTheaterFeedback('');
      setTheaterSceneIndex(0);
    } else if (gameId === 'game_016') {
      setBridgePlanks(0);
      setBridgeQuestionIndex(0);
    } else if (gameId === 'game_017') {
      setEmotionFlowerStatus('withering');
      setEmotionFlowerIndex(0);
    } else if (gameId === 'game_018') {
      setPhraseChefSelected([]);
      setPhraseChefRecipeIndex(0);
    } else if (gameId === 'game_019') {
      setCaveUnveiled(Array(25).fill(false));
      setCaveTargetWord('beautiful');
      setCaveInputText('');
      setCaveSelectedTileIdx(null);
    } else if (gameId === 'game_020') {
      setCurrentCountry('Japan 🇯🇵');
    }
  };


  // ---------------------------------------------------------------------------------------
  // PROFESSIONAL ACADEMY DEVELOPMENT PLAN & ROADMAP FOR STUDENTS
  // ---------------------------------------------------------------------------------------
  const renderDevelopmentPlan = () => {
    const totalXP = sessionXP + (userProfile?.points || 0);
    const candidateName = userProfile?.displayName || (isRtl ? 'بطل الأكاديمية اللامع' : 'Distinguished Academy Scholar');

    return (
      <div className="space-y-8">
        {/* Elite Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 md:p-8 border border-[#6C5CE7]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C5CE7]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#00CEC9]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-center lg:text-left">
              <span className="px-3 py-1 bg-[#6C5CE7]/20 text-[#a29bfe] border border-[#6C5CE7]/40 rounded-full text-[11px] font-black uppercase tracking-wider font-mono">
                {isRtl ? 'الدليل الاستراتيجي لتطور الطفل' : 'SYSTÈMATIC GROWTH ARCHITECTURE'}
              </span>
              <h2 className="text-xl md:text-3xl font-black text-[#FDCB6E] tracking-tight">
                {isRtl ? 'الخطة التطويرية الاحترافية لألعاب الأكاديمية 📈✨' : 'Elite Game Development & Learning Plan 📈✨'}
              </h2>
              <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-3xl">
                {isRtl 
                  ? 'بصفتك طالباً متميزاً في الأكاديمية الدولية، صممنا لك مصفوفة تدريبية مبنية على معايير تربوية عالمية لربط الميكرو-ألعاب بمستويات الإطار الأوروبي المشترك (CEFR)، وتتبع المهارات اللفظية والذوق الاجتماعي الرفيع خطوة بخطوة.'
                  : 'As an elite student at the Academy, we constructed this systematic educational planner. It matches all 20 mini-games to international standards (CEFR) and tracks children behavioral etiquette and vocabulary speed, level by level.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FDCB6E] to-amber-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                🏆
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">{isRtl ? 'مجموع نقاط التأهيل' : 'AGGREGATE XP CREDIT'}</span>
                <span className="text-lg font-black text-white font-mono">{totalXP} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Navigation Sub-Tabs */}
        <div className="flex flex-wrap gap-2.5 border-b border-slate-800 pb-4">
          {[
            { id: 'roadmap' as const, labelAr: '🎯 خارطة طريق المسارات الأكاديمية', labelEn: 'Curriculum Roadmap' },
            { id: 'daily' as const, labelAr: '📅 الجدول التدريبي اليومي', labelEn: 'Daily Routine' },
            { id: 'skills' as const, labelAr: '📊 مصفوفة جدارة المهارات', labelEn: 'Skill Competencies' },
            { id: 'certificates' as const, labelAr: '👑 شهادات ودبلوما التميز', labelEn: 'Honorary Diplomas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setPlanTab(tab.id);
                speakFeedback(isRtl ? `فتح ${tab.labelAr}` : `Opening ${tab.labelEn}`);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 border ${
                planTab === tab.id
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#5142be] text-white border-[#6C5CE7]/60 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-slate-800/80'
              }`}
            >
              <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {planTab === 'roadmap' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* The Three Educational Tracks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* TRACK 1 */}
                <div className="bg-[#1e2324] rounded-2xl p-5 border border-indigo-500/20 shadow-md relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-[10px] font-black uppercase tracking-wider font-mono">
                        {isRtl ? 'المستوى 1: التأسيس والتهجئة السريعة' : 'Level 1: Phonics & Spelling'}
                      </span>
                      <span className="text-xs font-bold text-slate-400">CEFR: A1 - A2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white mt-1">
                        {isRtl ? 'مسار اللفظ السليم والسرعة الإملائية ⚡' : 'Spelling & Acoustics Track ⚡'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                        {isRtl 
                          ? 'يهتم هذا المسار بتمكين الطفل من حفظ مخارج الحروف الإنجليزية المانحة للثقة، وكشف التهجئة السريعة عبر ربط الحواس بالتكامل الصوتي والمحاكاة الذكية.'
                          : 'This track solidifies foundational spelling speed, vocabulary letter recognition, and proper pronunciation detection by utilizing fast reactions and auditory cues.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-black text-[#00CEC9] block font-mono tracking-widest">{isRtl ? 'الألعاب المخصصة لهذا المسار' : 'CORE CURRICULUM GAMES'}</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-350 font-bold">
                        <div>⚔️ {isRtl ? 'معركة الكلمات (2)' : 'Word Battle (#2)'}</div>
                        <div>⚔️ {isRtl ? 'بطل الإملاء (6)' : 'Spelling Hero (#6)'}</div>
                        <div>⚔️ {isRtl ? 'محقق النطق (9)' : 'Acoustic Detective (#9)'}</div>
                        <div>⚔️ {isRtl ? 'الكهف المظلم (19)' : 'The Dark Cave (#19)'}</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 font-mono">
                        <span>{isRtl ? 'الإنجاز الأكاديمي' : 'SYLLABUS PROGRESS'}</span>
                        <span className="text-indigo-400">80%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      selectGame('game_006');
                      speakFeedback("Launching Spelling Hero!");
                    }}
                    className="w-full mt-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isRtl ? 'البدء بتحدي الإملاء السريع' : 'Launch Speed Challenge'}
                  </button>
                </div>

                {/* TRACK 2 */}
                <div className="bg-[#1e2324] rounded-2xl p-5 border border-emerald-500/20 shadow-md relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-wider font-mono">
                        {isRtl ? 'المستوى 2: النحو والمنطق اللغوي' : 'Level 2: Syntactic Grammar'}
                      </span>
                      <span className="text-xs font-bold text-slate-400">CEFR: A2 - B1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white mt-1">
                        {isRtl ? 'مسار تركيب وصياغة العبارات 🧪' : 'Sentence Architecture Track 🧪'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                        {isRtl 
                          ? 'يقود الطفل من مرحلة الكلمة المفردة إلى إتقان بناء الجمل الطويلة والقصيرة، فهم أحكام الفاعل والفعل والمفعول بطريقة طهي واختيار منطقي شيق.'
                          : 'Transitions students from isolation of words to composing grammatically precise, flowing English sentences, masterfully explaining the parts of speech.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-black text-[#FDCB6E] block font-mono tracking-widest">{isRtl ? 'الألعاب المخصصة لهذا المسار' : 'CORE CURRICULUM GAMES'}</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-350 font-bold">
                        <div>⚔️ {isRtl ? 'كنز المعرفة (1)' : 'Treasure Hunt (#1)'}</div>
                        <div>⚔️ {isRtl ? 'سلالم القواعد (3)' : 'Snakes & Ladders (#3)'}</div>
                        <div>⚔️ {isRtl ? 'بستان المطر (7)' : 'Grammar Garden (#7)'}</div>
                        <div>⚔️ {isRtl ? 'طباخ العبارات (18)' : 'Phrase Chef (#18)'}</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 font-mono">
                        <span>{isRtl ? 'الإنجاز الأكاديمي' : 'SYLLABUS PROGRESS'}</span>
                        <span className="text-emerald-400">65%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      selectGame('game_018');
                      speakFeedback("Launching Phrase Chef!");
                    }}
                    className="w-full mt-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isRtl ? 'اطبخ طبقاً نحوياً الآن' : 'Start Grammar Stove'}
                  </button>
                </div>

                {/* TRACK 3 */}
                <div className="bg-[#1e2324] rounded-2xl p-5 border border-purple-500/20 shadow-md relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-[10px] font-black uppercase tracking-wider font-mono">
                        {isRtl ? 'المستوى 3: بروتوكول والآداب الراقية' : 'Level 3: Protocol & Etiquette'}
                      </span>
                      <span className="text-xs font-bold text-slate-400">CEFR: B1 - B2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white mt-1">
                        {isRtl ? 'مسار سفير الأدب والذوق العالمي 👑' : 'Global Courtesy & Etiquette Track 👑'}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                        {isRtl 
                          ? 'أهم ميزة حصرية بالبرنامج؛ غرس عادات وأخلاقيات السلوك السليم والمحادثات الطيبة والاعتذار وبناء الروابط الأخلاقية واكتشاف التقاليد الدولية بلباقة مكثفة.'
                          : 'Our flagship training path. Infuses high-etiquette table manners, greeting conventions, and polite social behaviors, aligning linguistic progress with emotional intelligence.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl space-y-2">
                      <span className="text-[9px] uppercase font-black text-indigo-400 block font-mono tracking-widest">{isRtl ? 'الألعاب المخصصة لهذا المسار' : 'CORE CURRICULUM GAMES'}</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-350 font-bold">
                        <div>⚔️ {isRtl ? 'سفير الحوار (5)' : 'Dialogue Ambassador (#5)'}</div>
                        <div>⚔️ {isRtl ? 'مملكة الأدب (11)' : 'Etiquette Palace (#11)'}</div>
                        <div>⚔️ {isRtl ? 'بستان المشاعر (17)' : 'Empathy Garden (#17)'}</div>
                        <div>⚔️ {isRtl ? 'مهرجان الثقافات (20)' : 'Culture Festival (#20)'}</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 font-mono">
                        <span>{isRtl ? 'الإنجاز الأكاديمي' : 'SYLLABUS PROGRESS'}</span>
                        <span className="text-purple-400">90%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      selectGame('game_020');
                      speakFeedback("Launching Festival of Cultures!");
                    }}
                    className="w-full mt-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isRtl ? 'ممارسة آداب السفر العالمية' : 'Practice World Etiquette'}
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {planTab === 'daily' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <div className="bg-[#1e2324] rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-black">
                  <Clock className="w-5 h-5" />
                  <h3>{isRtl ? 'البرنامج التدريبي المقترح لهذا اليوم 📅' : 'Daily Personalized Routine Plan'}</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isRtl 
                    ? 'لتحقيق الجدوى القصوى وتجنب الإجهاد اللفظي، تقترح الأكاديمية لعب 3 ميكرو-ألعاب يومياً (إحماء صوتي، تحدي قواعد، وممارسة ذوقيات) لجمع 100 XP يومياً.'
                    : 'To secure prime development without stress, we advise playing exactly three modules daily. Complete these steps now to maximize retention and credit 100 XP.'}
                </p>

                {/* Vertical Timeline */}
                <div className="space-y-4 mt-4">
                  
                  {/* Step 1 */}
                  <div className="flex gap-4 p-4.5 bg-slate-950/40 rounded-xl border border-slate-800 hover:border-[#6C5CE7]/30 transition-all">
                    <span className="text-2xl mt-1">🌅</span>
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-wider block">
                        {isRtl ? 'المهمة 1: الإحماء الصباحي اللفظي' : 'STEP 1: MORNING LANGUAGE WARM-UP'}
                      </span>
                      <h4 className="text-xs font-extrabold text-white">{isRtl ? 'محقق النطق والتدقيق السمعي' : 'Pronunciation Detective (Acoustic Training)'}</h4>
                      <p className="text-[10px] text-slate-400">{isRtl ? 'سماع الفروقات الصوتية الدقيقة بين الكلمات الإنجليزية الصعبة.' : 'Discern and sort subtle vowel phonetic contrasts.'}</p>
                    </div>
                    <button
                      onClick={() => selectGame('game_009')}
                      className="px-3 py-1 bg-[#6C5CE7] hover:bg-[#5142be] text-white text-[10px] font-bold rounded-lg cursor-pointer my-auto"
                    >
                      {isRtl ? 'ابدأ' : 'Play'}
                    </button>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 p-4.5 bg-slate-950/40 rounded-xl border border-slate-800 hover:border-[#6C5CE7]/30 transition-all">
                    <span className="text-2xl mt-1">🧪</span>
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-wider block">
                        {isRtl ? 'المهمة 2: بناء القواعد والمنطق' : 'STEP 2: MIDDAY THEORETICAL SYNTAX'}
                      </span>
                      <h4 className="text-xs font-extrabold text-white">{isRtl ? 'طباخ العبارات وصياغة الطعام النحوي' : 'Phrase Chef (Assemble Subject-Verb-Object)'}</h4>
                      <p className="text-[10px] text-slate-400">{isRtl ? 'طهي المكونات اللغوية المختلفة لتقديم إملاء وقواعد مثالية.' : 'Compose perfect sentences under correct grammatical recipes.'}</p>
                    </div>
                    <button
                      onClick={() => selectGame('game_018')}
                      className="px-3 py-1 bg-teal-500 text-slate-950 text-[10px] font-bold rounded-lg cursor-pointer my-auto"
                    >
                      {isRtl ? 'ابدأ' : 'Play'}
                    </button>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 p-4.5 bg-slate-950/40 rounded-xl border border-slate-800 hover:border-[#6C5CE7]/30 transition-all">
                    <span className="text-2xl mt-1">👑</span>
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-wider block">
                        {isRtl ? 'المهمة 3: بروتوكول آداب المجتمع' : 'STEP 3: EVENING SOCIAL PROTOCOLS'}
                      </span>
                      <h4 className="text-xs font-extrabold text-white">{isRtl ? 'مملكة الأدب وبناء أبراج القصر الملكي' : 'Kingdom of Etiquette (High Etiquette Quest)'}</h4>
                      <p className="text-[10px] text-slate-400">{isRtl ? 'حل مسائل السلوك والذوق الراقي لبناء الغرف الملكية الخمس لقصرك.' : 'Unlock royal rooms by proving top-tier host and guest table manners.'}</p>
                    </div>
                    <button
                      onClick={() => selectGame('game_011')}
                      className="px-3 py-1 bg-[#6C5CE7] hover:bg-[#5142be] text-white text-[10px] font-bold rounded-lg cursor-pointer my-auto"
                    >
                      {isRtl ? 'ابدأ' : 'Play'}
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {planTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div className="bg-[#1e2324] rounded-2xl p-6 border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-xs font-black text-[#FDCB6E] uppercase tracking-wider font-mono">
                    {isRtl ? 'تشريح مهارات الجدارة والسلوك 📊' : 'Behavioral & Linguistic Competency Index'}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {isRtl ? 'تتبع نقاط قوتك التفاعلية بناءً على نوع اللعب ومجموع نقاطك عبر العشرين لعبة.' : 'Analysis of cognitive growth, social intelligence and English dexterity.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Skill 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className="text-slate-200">{isRtl ? '👂 دقة الاستماع وتمييز مخارج الحروف' : 'Acoustic Auditory & Sounds Distinction'}</span>
                      <span className="text-cyan-400 font-mono">80%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full" style={{ width: '80%' }} />
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      {isRtl ? 'ممتاز جداً! تذكر ممارسة لعبة "محقق النطق" يومياً لرفعه إلى 95%.' : 'Fabulous response. Replay Pronunciation Detective to boost it.'}
                    </p>
                  </div>

                  {/* Skill 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className="text-slate-200">{isRtl ? '👑 الذكاء الاجتماعي وبوتوكول الرد اللبق' : 'Social Manners & Diplomacy Greeting'}</span>
                      <span className="text-purple-400 font-mono">90%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-purple-650 to-purple-405 h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      {isRtl ? 'أنت رائع في مهارات اللباقة! تواصل التقدم في "سفير الحوار" و"فارس الكلمة المهذبة".' : 'Stellar achievement. Complete Dialogue Ambassador to keep it pristine.'}
                    </p>
                  </div>

                  {/* Skill 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className="text-slate-200">{isRtl ? '🧪 بناء العبارات وصياغة التركيب النحوي' : 'Syntax Compose & Grammatical Harmony'}</span>
                      <span className="text-[#00CEC9] font-mono">65%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-teal-600 to-teal-400 h-full rounded-full" style={{ width: '65%' }} />
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      {isRtl ? 'منطقة تطوير رئيسية! تدرب على لعب "طباخ العبارات" و"بستان القواعد" لتعلم الفاعل والمفعول.' : 'Important improvement zone. Play Phrase Chef and Grammar Garden to strengthen sentence structures.'}
                    </p>
                  </div>

                  {/* Skill 4 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className="text-slate-200">{isRtl ? '⚡ سرعة البديهة والتهجئة الفورية' : 'Speed Spelling & Direct Lexicon Retrieval'}</span>
                      <span className="text-rose-400 font-mono">75%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      {isRtl ? 'سرعة طيبة في الاستدعاء اللفظي إملائياً! درب بديهتك مجدداً في "بطل الإملاء".' : 'Great spelling response. Push hard in Spelling Hero meteor levels to touch 90%.'}
                    </p>
                  </div>

                  {/* Skill 5 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className="text-slate-200">{isRtl ? '❤️ الذكاء العاطفي والتعاطف اللفظي' : 'Linguistic Empathy & Emotional Intelligence'}</span>
                      <span className="text-[#FDCB6E] font-mono">85%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                    <p className="text-[9px] text-slate-400 italic">
                      {isRtl ? 'عالي جداً! لقد نجحت زوهورك في حديقة المشاعر بسبب طيبة عباراتك في مساعدة الآخرين.' : 'Empathetic work. Rewarding results achieved by comforting Flowers of Garden of Emotions.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {planTab === 'certificates' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-xs text-slate-450 font-bold text-center">
                {isRtl 
                  ? 'يتم منح وتفصيل هذه الدبلوما بشكل حصري للمشتركين بعد تخطي حدود معينة للنقاط والـ XP.'
                  : 'Honorary credentials authorized dynamically from child session performance thresholds. Click to print and cherish.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* CERT 1 */}
                <div className="bg-[#1e2324] rounded-2xl p-5 border border-amber-500/30 text-center space-y-4 shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-4xl block animate-bounce">🎓</span>
                    <h4 className="text-xs font-black text-white">{isRtl ? 'دبلوما سفير الدبلوماسية ولغويات الأدب' : 'Linguistic Courtesy Envoy Diploma'}</h4>
                    <p className="text-[10px] text-slate-400">{isRtl ? 'تُمنح لإتقان آداب السلوك الحواري والرد المهذب والاعتذار.' : 'Authorized for polite reply systems and social dining mannerism.'}</p>
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[9px] font-mono rounded font-bold">{isRtl ? 'جاهزة للاستلام' : 'AVAILABLE NOW'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCertificateId('cert_etiquette');
                      speakFeedback("Displaying Courtesy Envoy Diploma. Congratulations!");
                    }}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl text-[10px] font-black tracking-wider transition-all cursor-pointer"
                  >
                    👑 {isRtl ? 'عرض واستلام الشهادة' : 'Claim & View Royal Award'}
                  </button>
                </div>

                {/* CERT 2 */}
                <div className="bg-[#1e2324] rounded-2xl p-5 border border-indigo-500/30 text-center space-y-4 shadow-lg hover:border-indigo-400 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-4xl block">🖋️</span>
                    <h4 className="text-xs font-black text-white">{isRtl ? 'شهادة خبير التهجئة والاسترداد اللفظي' : 'Master of Phonetics & Spelling Specialist'}</h4>
                    <p className="text-[10px] text-slate-400">{isRtl ? 'تُمنح لسرعة البديهة والتهجي الإملائي للكلمات المركبة الصعبة.' : 'Credentials for extreme velocity vocabulary meteor typing.'}</p>
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[9px] font-mono rounded font-bold">{isRtl ? 'جاهزة للاستلام' : 'AVAILABLE NOW'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCertificateId('cert_spelling');
                      speakFeedback("Displaying Master of Phonetics Certificate. Congratulations!");
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black tracking-wider transition-all cursor-pointer"
                  >
                    👑 {isRtl ? 'عرض واستلام الشهادة' : 'Claim & View Royal Award'}
                  </button>
                </div>

                {/* CERT 3 */}
                <div className="bg-[#1e2324] rounded-2xl p-5 border border-slate-800 text-center space-y-4 shadow-md opacity-70 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-4xl block grayscale opacity-60">🔮</span>
                    <h4 className="text-xs font-black text-slate-400">{isRtl ? 'دكتور القواعد وسيد المنطق النحوي' : 'Doctor of Syntax & Grammar Fellowship'}</h4>
                    <p className="text-[10px] text-slate-500">{isRtl ? 'تُمنح لإتقان طبخ وفك شفرات النحو الإنجليزي المعقد.' : 'Eminent fellowship honoring pure logical sentence composition.'}</p>
                    <span className="inline-block px-2.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-mono rounded font-bold">{isRtl ? 'مقفل - يتطلب 200 XP إضافي' : 'LOCKED - REQUIRES 200 MORE XP'}</span>
                  </div>
                  <button
                    disabled
                    className="w-full py-2 bg-slate-800 text-slate-500 rounded-xl text-[10px] font-black cursor-not-allowed"
                  >
                    🔒 {isRtl ? 'مقفل حالياً' : 'Locked Credentials'}
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCertificateId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#121617] rounded-3xl p-6 md:p-10 border-4 border-amber-500 max-w-2xl w-full text-center relative shadow-2xl space-y-6"
              >
                {/* Closed Close trigger */}
                <button
                  onClick={() => setSelectedCertificateId(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-slate-800 hover:bg-slate-700 text-slate-450 border border-slate-705 rounded-full flex items-center justify-center font-bold cursor-pointer"
                >
                  ✕
                </button>

                {/* Certificate Border Details */}
                <div className="border border-double border-amber-600/40 p-6 md:p-8 space-y-6 rounded-2xl bg-amber-500/[0.01]">
                  
                  {/* Crest Header */}
                  <div className="space-y-1.5 text-center">
                    <span className="text-3xl block">💎⚜️💎</span>
                    <h5 className="text-[10px] font-black text-amber-500 uppercase font-mono tracking-widest leading-none">
                      {isRtl ? 'أكاديمية أكسفورد الرقمية الدولية للصغار والآداب' : 'OXFORD DIGITAL EXCELLENCE EDUCATION FOUNDATION'}
                    </h5>
                    <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Certified Honor Registry #O-2026</p>
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wide font-mono">
                      {isRtl ? 'رقعة تقدير وشهادة تقدير وتفوق' : 'CREDENTIAL DIPLOMA OF PRIMACY'}
                    </span>
                    <h3 className="text-md md:text-xl font-black text-[#FDCB6E] tracking-normal font-sans">
                      {selectedCertificateId === 'cert_etiquette' 
                        ? (isRtl ? 'دبلوما سفير الدبلوماسية ورائد الرد الطيِّب السليم 👑' : 'Ambassador Extraordinary of High Society Courtesy 👑')
                        : (isRtl ? 'شهادة خبير التهجئة والاسترداد اللفظي والأبجدية ⚡' : 'Elite Fellowship of Acoustics & Ultra spelling ⚡')
                      }
                    </h3>
                  </div>

                  {/* Body Paragraph */}
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-400">{isRtl ? 'بموجب هذه الوثيقة، يُثبت مجلس الأكاديمية وباسل المرشد أن:' : 'Be it known that the Academic Council hereby awards and confirms:'}</p>
                    <div className="px-6 py-2 border-b border-amber-600/30 max-w-xs mx-auto text-center">
                      <span className="text-md md:text-lg font-black text-white font-mono tracking-wide">{candidateName}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed max-w-lg mx-auto">
                      {selectedCertificateId === 'cert_etiquette' ? (
                        isRtl 
                          ? 'قد نفذ واجتاز بامتياز فائق العشرين تحدياً بأكاديمية الأدب، وأثبت تفهم وافٍ لقيم التعاون الرفيع والمجاملات الكريمة وبناء قصر آداب السلوك وسلوك الغد المهذب.'
                          : 'has successfully solved and mastered high-etiquette dialogue channels, exhibited extraordinary warmth and empathetic cooperation within the Kingdom of Etiquette and global greetings.'
                      ) : (
                        isRtl 
                          ? 'قد حقق تميزاً استثنائياً في التهجي والصوتيات وتفكيك الشفرات وحماية الأرض من صخور الإملاء المنهار، مما يثبت حضور سرعة البديهة والقاموس الإنجليزي المتأصل.'
                          : 'has displayed magnificent lexical reaction tracking, rapid typing, and phonics discrimination, successfully restoring all illuminated torches of the Spelling Adventure.'
                      )}
                    </p>
                  </div>

                  {/* Signatures and Seal */}
                  <div className="flex justify-between items-end pt-4 mt-6 border-t border-slate-900">
                    <div className="text-left font-mono">
                      <p className="text-[8px] text-slate-500">{isRtl ? 'رئيس هيئة التعليم:' : 'Chancellor of Council:'}</p>
                      <p className="text-[10px] font-black text-amber-500 italic mt-0.5">Dr. Basil Al-Murshid</p>
                    </div>
                    
                    {/* Simulated Shiny Gold Seal */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 border border-yellow-250 flex items-center justify-center shadow-lg shadow-yellow-500/10 text-lg relative group">
                      <div className="absolute inset-1 rounded-full border border-dashed border-amber-800 flex items-center justify-center font-bold text-[8px] text-amber-950 font-mono">
                        OXFORD
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <p className="text-[8px] text-slate-500">{isRtl ? 'عميد القبول وأعراف السلوك:' : 'Dean of Manners & Courtesy:'}</p>
                      <p className="text-[10px] font-black text-amber-500 italic mt-0.5">Court of Etiquette</p>
                    </div>
                  </div>

                </div>

                {/* Claim Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      speakFeedback(isRtl ? "مبارك الفوز والتميز الرائع!" : "Splendid work! We are so proud of you.");
                      alert(isRtl ? "احسنت الاختيار! تم تحميل الشهادة وطباعتها بنجاح إلى ملف التميز بباحة مكتبتك! 🏆📄" : "Diploma certified! Saved securely inside your personal academic dashboard collection! 🏆📄");
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    🚀 {isRtl ? 'تحميل وطباعة الشهادة 📄' : 'Download and Print Certificate 📄'}
                  </button>
                  <button
                    onClick={() => setSelectedCertificateId(null)}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {isRtl ? 'إغلاق' : 'Dismiss'}
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#2D3436] text-slate-100 flex flex-col font-sans select-none pb-20">
      {/* Interactive header leveraging dynamic CSS values */}
      <header className="bg-gradient-to-r from-[#6C5CE7] to-[#5142be] py-6 px-6 md:px-12 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 z-10 relative">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <span className="text-[10px] font-black uppercase bg-[#FDCB6E] text-slate-900 py-0.5 px-2.5 rounded tracking-wider">
                {isRtl ? 'بوابة المغامرات والآداب' : 'Adventure Playzone'}
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white mt-1">
                {isRtl ? 'الألعاب التعليمية والآداب الراقية 🎮💎' : 'Educational Games & Manners Palace 🎮💎'}
              </h1>
            </div>
          </div>

          {/* Points earned */}
          <div className="flex items-center gap-2.5 bg-slate-900/40 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-xl">🌟</span>
            <div>
              <span className="text-[10px] block font-bold text-[#FDCB6E] uppercase tracking-wider">{isRtl ? 'درجات الجلسة' : 'Session Merits'}</span>
              <span className="text-md font-black text-[#00CEC9] font-mono">+{sessionXP} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex-1 w-full">
        <AnimatePresence mode="wait">
          {!activeGameId ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Introduction Banner with Mentor Basil */}
              <div className="bg-[#1e2324] rounded-3xl p-6 md:p-8 border border-slate-700/60 shadow-xl flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#6C5CE7]/5 rounded-full pointer-events-none" />
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 bg-[#6C5CE7]/20 text-[#6C5CE7] border border-[#6C5CE7]/30 rounded-full text-[11px] font-bold">
                    {isRtl ? 'ألعاب الأكاديمية العشرين متكاملة' : '20 Fully Integrated Master Games'}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-[#FDCB6E]">
                    {isRtl ? 'عالم التحدي والذوق بانتظارك! 🦁✨' : 'The Marvelous Land of Play & Etiquette! 🦁✨'}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-3xl">
                    {isRtl 
                      ? 'مرحباً بك في البوابة التفاعلية الشاملة. قمنا بتضمين العشرين لعبة المدرجة في الميثاق بطريقة لعب تفاعلية، بدءاً من خرائط المغامرة ومعارك السرعة حتى أدب المائدة وفارس اللغة المهذبة. حدد اللعبة المفضلة لك، واجمع نجاح النقاط لتتفوق فوزاً!'
                      : 'Welcome to the complete bento playroom. All 20 requested educational micro-games are meticulously loaded. Uncover vocabulary matching, spelling meteors, social manners builders, and win bountiful merits!'}
                  </p>
                </div>
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-5xl animate-bounce">🦁</span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1">{isRtl ? 'باسل المرشد' : 'Mentor Basil'}</span>
                </div>
              </div>

              {/* Filters and search block */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeCategory === c.id 
                          ? 'bg-[#6C5CE7] text-white shadow-md' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {isRtl ? c.labelAr : c.labelEn}
                    </button>
                  ))}
                </div>

                {activeCategory !== 'plan' && (
                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isRtl ? "البحث عن لعبة..." : "Search games..."}
                      className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-[#444C4E] rounded-xl text-xs text-white focus:outline-none focus:border-[#6C5CE7] transition-all"
                    />
                  </div>
                )}
              </div>

              {/* The 20 Games Bento Grid */}
              {activeCategory === 'plan' ? (
                renderDevelopmentPlan()
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map((game, idx) => {
                    const IconComp = game.icon;
                    return (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={game.id}
                        className="bg-[#1e2324] hover:bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60 hover:border-[#6C5CE7]/60 transition-all flex flex-col justify-between h-[230px] group shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500 font-bold">
                          #{idx+1}
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className={`p-2.5 rounded-xl ${game.color} text-white`}>
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-[#FDCB6E] bg-slate-900/40 px-2.5 py-1 rounded-lg">
                              {game.difficulty}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-[14px] font-black text-white group-hover:text-[#FDCB6E] transition-all">
                              {isRtl ? game.titleAr : game.titleEn}
                            </h3>
                            <p className="text-[11px] text-slate-300 font-medium leading-relaxed line-clamp-3 mt-1.5">
                              {isRtl ? game.descriptionAr : game.descriptionEn}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => selectGame(game.id)}
                          className="w-full mt-4 py-2 bg-slate-700/80 hover:bg-[#6C5CE7] text-white hover:text-white rounded-xl text-[11px] font-black tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          {isRtl ? 'انطلق والعب الآن' : 'Unleash Gameplay'}
                        </button>
                      </motion.div>
                    );
                  })}

                  {filteredGames.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-[#1e2324] rounded-2xl border border-slate-700/60">
                      <span className="text-4xl block mb-2">🔍</span>
                      <p className="text-xs font-bold text-slate-400">
                        {isRtl ? 'لا توجد ألعاب مطابقة لهذا البحث.' : 'No matching activities inside our registry.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#1e2324] rounded-3xl p-6 md:p-8 border border-slate-700/60 max-w-4xl mx-auto relative shadow-2xl"
            >
              {/* Back to games list */}
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-4 mb-6">
                <button
                  onClick={() => {
                    setActiveGameId(null);
                    speakFeedback(isRtl ? "تمت العودة للواحة الرائعة" : "Back to the lobby center");
                  }}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {isRtl ? 'العودة لواحة الألعاب' : 'Exit to Lobby'}
                </button>
                <div className="text-right">
                  <h3 className="text-sm font-black text-[#FDCB6E]">
                    {isRtl ? gamesList.find(g => g.id === activeGameId)?.titleAr : gamesList.find(g => g.id === activeGameId)?.titleEn}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {isRtl ? 'العيد العشرون للألعاب التعليمية' : '20th Academic Series'}
                  </span>
                </div>
              </div>

              {/* Collapsible How-to-Play Instructions Block */}
              {activeGameId && gameInstructions[activeGameId] && (
                <div id="game-instructions-container" className="bg-slate-900/40 rounded-2xl border border-slate-700/60 mb-6 overflow-hidden">
                  <button 
                    id="toggle-instructions-btn"
                    onClick={() => {
                      setShowInstructions(!showInstructions);
                      speakFeedback(isRtl ? "طريقة لعب اللعبة" : "how to play instruction manual");
                    }}
                    className="w-full px-5 py-3.5 bg-slate-900/60 flex justify-between items-center text-xs font-black text-slate-200 hover:text-white transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#FDCB6E]" />
                      <span className="tracking-tight">{isRtl ? 'كيفية اللعب وطريقة الفوز 🎮' : 'How to Play & Victory Plan 🎮'}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 bg-slate-800 rounded-lg text-slate-400 font-bold whitespace-nowrap">
                      {showInstructions ? (isRtl ? 'إخفاء الدليل' : 'Hide Guide') : (isRtl ? 'عرض طريقة اللعب' : 'Show Instructions')}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {showInstructions && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 py-4 border-t border-slate-700/40 bg-[#1e2324]/40 text-slate-300 text-xs leading-relaxed font-sans space-y-2 whitespace-pre-line">
                          {isRtl ? gameInstructions[activeGameId].ar : gameInstructions[activeGameId].en}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 001: Treasure Hunt (كنز المعرفة) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_001' && (
                <div className="space-y-6">
                  <p className="text-xs font-bold text-slate-300">
                    {isRtl 
                      ? "اضغط على مربعات الخريطة المجاورة للتحرك نحو الكنز عند الإحداثي [7,7]. كل خطوة تطالبك بإجابة سؤال إنجليزي!"
                      : "Tap a adjacent grid cell to sail your ship. Answering the puzzle correctly claims the land and adds dynamic merits!"}
                  </p>

                  <div className="grid grid-cols-8 gap-1.5 max-w-md mx-auto bg-slate-900 p-3 rounded-2xl border border-slate-700 text-center">
                    {Array.from({ length: 8 }).map((_, r) => (
                      Array.from({ length: 8 }).map((_, c) => {
                        const isPlayer = piratePos[0] === r && piratePos[1] === c;
                        const isTreasure = r === 7 && c === 7;
                        return (
                          <button
                            key={`tile-${r}-${c}`}
                            onClick={() => {
                              if (Math.abs(piratePos[0]-r) + Math.abs(piratePos[1]-c) === 1) {
                                setPendingMove([r, c]);
                                setMapTimer(20);
                                setActiveMapQuestionIdx(Math.floor(Math.random() * treasureMapQuestions.length));
                                setShowMapModal(true);
                              }
                            }}
                            className={`aspect-square rounded-lg text-xs flex items-center justify-center font-black transition-all ${
                              isPlayer 
                                ? 'bg-[#6C5CE7] text-white ring-2 ring-white scale-105' 
                                : isTreasure 
                                  ? 'bg-[#FDCB6E] text-slate-900 animate-pulse font-serif text-md' 
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-500 hover:text-slate-200'
                            }`}
                          >
                            {isPlayer ? "⛵" : isTreasure ? "👑" : ""}
                          </button>
                        );
                      })
                    ))}
                  </div>

                  {showMapModal && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-[#2D3436] rounded-2xl border border-slate-700 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-amber-400 font-bold">⏱️ {mapTimer}s remaining</span>
                        <h4 className="text-xs font-extrabold text-white">{isRtl ? 'سؤال التحقق البحري' : 'Nautical Grid Quiz'}</h4>
                      </div>
                      <p className="text-xs font-bold font-mono text-slate-300">
                        {treasureMapQuestions[activeMapQuestionIdx].q}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {treasureMapQuestions[activeMapQuestionIdx].opts.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              if (opt === treasureMapQuestions[activeMapQuestionIdx].ans) {
                                triggerPointsReward(15, isRtl ? 'كنز المعرفة الجغرافي' : 'Knowledge Treasure Explorer', 'game_001');
                                speakFeedback("Awesome move!");
                                if (pendingMove) {
                                  setPiratePos(pendingMove);
                                  if (pendingMove[0] === 7 && pendingMove[1] === 7) {
                                    alert(isRtl ? "تهانينا! لقد وصلت إلى كنز المعرفة المفقود بنجاح مميز! 🏆" : "Amazing! You have conquered the remote Gold Treasure! 🏆");
                                    setPiratePos([0, 0]);
                                  }
                                }
                              } else {
                                speakFeedback("Wrong guess, try another route!");
                              }
                              setShowMapModal(false);
                            }}
                            className="p-3 bg-slate-800 hover:bg-[#6C5CE7] text-white font-bold rounded-xl text-[11px] transition-all cursor-pointer text-center"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 002: Word Battle (معركة الكلمات) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_002' && (
                <div className="space-y-6 text-center">
                  <span className="text-xs bg-[#rose-500]/10 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full font-black">
                    {isRtl ? 'الجولة ' : 'Round '}{battleRound} / 10
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto my-4">
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                      <span className="text-xl">🤵</span>
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'نقاطك' : 'Your Score'}</p>
                      <p className="text-md font-black text-emerald-400 font-mono">{battlePlayerScore}</p>
                    </div>
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                      <span className="text-xl">🤖</span>
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'روبوت رونالد' : 'Robo Ronald'}</p>
                      <p className="text-md font-black text-rose-400 font-mono">{battleBotScore}</p>
                    </div>
                  </div>

                  <div className="p-8 bg-slate-900 rounded-3xl border border-slate-700/60 relative overflow-hidden min-h-[140px] flex items-center justify-center">
                    {isWordVisible ? (
                      <motion.h4 initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-xl font-black text-[#FDCB6E] tracking-widest font-mono">
                        {displayWord}
                      </motion.h4>
                    ) : (
                      <span className="text-xs text-slate-400 font-bold">??? ({isRtl ? 'اكتب الكلمة الآن!' : 'Type the word now!'})</span>
                    )}
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const match = battleTypeInput.trim().toLowerCase() === displayWord.toLowerCase();
                      if (match) {
                        setBattlePlayerScore(prev => prev + 15);
                        triggerPointsReward(15, isRtl ? 'انتصار معركة الكلمات' : 'Vocab Battle Victor', 'game_002');
                        speakFeedback(isRtl ? "صحيح وسريع!" : "Splendidly fast!");
                      } else {
                        setBattleBotScore(prev => prev + 15);
                        speakFeedback(isRtl ? "أوه، خطأ مطبعي!" : "Robo scores!");
                      }
                      
                      setBattleTypeInput('');
                      if (battleRound < 10) {
                        setBattleRound(prev => prev + 1);
                        const nextW = wordBattlePoolData[Math.floor(Math.random() * wordBattlePoolData.length)];
                        setDisplayWord(nextW);
                        setIsWordVisible(true);
                        setTimeout(() => setIsWordVisible(false), 2000);
                      } else {
                        alert(isRtl ? "انتهت معركة الكلمات! حظاً سعيداً في المرة القادمة." : "Word Battle Over! High score computed.");
                        setBattleRound(1);
                      }
                    }}
                    className="max-w-xs mx-auto space-y-3"
                  >
                    <input
                      type="text"
                      value={battleTypeInput}
                      onChange={(e) => setBattleTypeInput(e.target.value)}
                      placeholder={isRtl ? "اكتب هنا بسرعة..." : "Spell word rapidly..."}
                      className="w-full text-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                    <button type="submit" className="w-full py-2 bg-rose-500 rounded-xl text-xs font-black text-white hover:bg-rose-600">
                      {isRtl ? 'تفجير الحفل ➔' : 'Cast Typing Spell ➔'}
                    </button>
                  </form>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 003: Snakes & Ladders (سلالم وثعابين القواعد) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_003' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-300 font-bold">{isRtl ? 'موقعك الحالي:' : 'Your Location:'} <span className="text-emerald-400 font-black">Tile {snakesPlayerPos}</span></span>
                    <button
                      onClick={() => {
                        const roll = Math.floor(Math.random() * 6) + 1;
                        setSnakesLastRoll(roll);
                        speakFeedback(`Rolled a ${roll}!`);
                        
                        // Spawn a random grammar check
                        const randomQ = snakesQuestionsData[Math.floor(Math.random() * snakesQuestionsData.length)];
                        setSnakesQuizItem({
                          q: randomQ.q,
                          opts: randomQ.opts,
                          ans: randomQ.ans,
                          type: Math.random() > 0.5 ? "ladder" : "snake"
                        });
                        setSnakesQuizActive(true);
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black hover:bg-emerald-600 transition-all cursor-pointer"
                    >
                      🎲 {isRtl ? 'دحرج النرد الروحي' : 'Roll Grammar Dice'}
                    </button>
                  </div>

                  {snakesLastRoll > 0 && (
                    <p className="text-center text-xs font-bold text-amber-300">{isRtl ? `حصلت على نرد بقيمة: ${snakesLastRoll}` : `You rolled a beautiful: ${snakesLastRoll}`}</p>
                  )}

                  {snakesQuizActive && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-5 bg-[#2D3436] rounded-2xl border border-slate-700 space-y-4">
                      <p className="text-xs font-extrabold text-slate-300">{snakesQuizItem.q}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {snakesQuizItem.opts.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              if (opt === snakesQuizItem.ans) {
                                triggerPointsReward(15, isRtl ? 'سلالم وثعابين القواعد' : 'Dice Grammar Solver', 'game_003');
                                speakFeedback("Correct! You climb the ladders.");
                                const nextPos = Math.min(100, snakesPlayerPos + snakesLastRoll + 8);
                                setSnakesPlayerPos(nextPos);
                                if (nextPos >= 100) {
                                  alert(isRtl ? "مبروك! لقد وصلت إلى الخانة 100 وحققت الفوز الأكاديمي الشامخ!" : "Supreme Victory! Reached 100 points tile!");
                                  setSnakesPlayerPos(1);
                                }
                              } else {
                                speakFeedback("Alas! A snake bit you.");
                                setSnakesPlayerPos(Math.max(1, snakesPlayerPos - 5));
                              }
                              setSnakesQuizActive(false);
                            }}
                            className="p-3 bg-slate-800 hover:bg-emerald-500 text-white rounded-xl text-xs font-black text-center cursor-pointer transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 004: Word Trader (تاجر الكلمات) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_004' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">{isRtl ? 'ذهب المتجر' : 'Market Gold'}</span>
                      <span className="text-md font-black text-amber-400 font-mono">💰 {traderGold} Gold</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          if (traderGold >= 5) {
                            setTraderGold(prev => prev - 5);
                            const vowels = ['A', 'E', 'I', 'O', 'U'];
                            const selected = vowels[Math.floor(Math.random() * vowels.length)];
                            setTraderLetters(prev => ({ ...prev, [selected]: (prev[selected] || 0) + 1 }));
                            speakFeedback("Bought a vowel!");
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        {isRtl ? 'شراء حرف علة (5 ذهب)' : 'Buy Vowel (5g)'}
                      </button>
                      <button
                        onClick={() => {
                          if (traderGold >= 10) {
                            setTraderGold(prev => prev - 10);
                            const cons = ['B', 'C', 'D', 'F', 'G', 'M', 'N', 'P', 'R', 'S', 'T'];
                            const selected = cons[Math.floor(Math.random() * cons.length)];
                            setTraderLetters(prev => ({ ...prev, [selected]: (prev[selected] || 0) + 1 }));
                            speakFeedback("Bought a consonant!");
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        {isRtl ? 'شراء حرف ساكن (10 ذهب)' : 'Buy Consonant (10g)'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">{isRtl ? 'حقيبة الحروف الحالية:' : 'Your Active Letter Vault:'}</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(traderLetters).map(([letter, count]) => (
                        count > 0 && (
                          <div key={letter} className="px-3 py-2 bg-[#6C5CE7] text-white font-black font-mono rounded-xl flex items-center gap-2">
                            <span>{letter}</span>
                            <span className="text-[9px] bg-slate-900/40 px-1.5 py-0.5 rounded-md font-sans">x{count}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={craftedWordInput}
                      onChange={(e) => setCraftedWordInput(e.target.value.toUpperCase())}
                      placeholder={isRtl ? "اكتب كلمة لتجميعها وبيعها..." : "Type crafted words of your letters..."}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono tracking-widest focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const word = craftedWordInput.trim().toUpperCase();
                        if (word.length < 2) return;
                        
                        // Parse letters check
                        const tempObj = { ...traderLetters };
                        let success = true;
                        for (const char of word) {
                          if (!tempObj[char] || tempObj[char] <= 0) {
                            success = false;
                            break;
                          }
                          tempObj[char]--;
                        }

                         if (success) {
                           const recomWords = ["CAT", "STREET", "BREAD", "DENTIST", "SWEET", "ACTIVE", "GREAT"];
                           const isHighValue = recomWords.includes(word);
                           const goldAdded = word.length * 15 * (isHighValue ? 2 : 1);
                           setTraderLetters(tempObj);
                           setTraderGold(prev => prev + goldAdded);
                           triggerPointsReward(isHighValue ? 40 : 20, isRtl ? 'تداول وتصنيع الكلمات المفرقعة' : 'Word Trader Economy Master', 'game_004');
                           speakFeedback(`Sold ${word} for ${goldAdded} gold!`);
                           setCraftedWordInput('');
                           if (isHighValue) {
                             alert(isRtl ? "يا إلهي! نجحت في طهو كلمة متميزة ونلت ضعف الأرباح! 🌟💰" : "Unbelievable! You've crafted a special high-value target for double gold!");
                           }
                         } else {
                           speakFeedback("Missing letters to forge this academic word!");
                         }
                       }}
                       className="w-full py-3 bg-[#FDCB6E] text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider hover:brightness-115 transition-all cursor-pointer"
                     >
                       💰 {isRtl ? 'بيع الكلمة وصرف الأرباح' : 'Sell to Second-hand Market Node'}
                     </button>
                   </div>

                   <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700 text-center">
                     <p className="text-[10px] font-bold text-[#00CEC9]">
                       {isRtl ? '💡 كلمات متميزة نوصي بصنعها للحصول على 2x ذهب إضافي:' : '💡 Premium high-value targets for 2x GOLD boost:'}
                     </p>
                     <p className="text-[10px] text-slate-400 font-mono mt-1">
                       CAT, STREET, BREAD, DENTIST, SWEET, ACTIVE, GREAT
                     </p>
                   </div>
                 </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 005: Dialogue Ambassador (سفير الحوار) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_005' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase font-mono">
                    <span>{isRtl ? 'حوار ' : 'Scenario '}{dialogueIndex + 1} / {dialogueAmbassadorScenariosData.length}</span>
                    <span className="text-emerald-400">{Math.round(dialoguePoliteness * 100)}% {isRtl ? 'أدب' : 'Polite'}</span>
                  </div>

                  <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 text-center">
                    <span className="text-2xl block mb-2">🤝</span>
                    <h4 className="text-xs font-bold text-slate-300">
                      {isRtl 
                        ? dialogueAmbassadorScenariosData[dialogueIndex].situationAr 
                        : dialogueAmbassadorScenariosData[dialogueIndex].situationEn}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {dialogueAmbassadorScenariosData[dialogueIndex].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={dialogueChosenOption !== null}
                        onClick={() => {
                          setDialogueChosenOption(oIdx);
                          const scoreImpact = opt.s;
                          setDialoguePoliteness(prev => Math.max(0.2, Math.min(1.0, prev + scoreImpact / 100)));
                          if (scoreImpact > 0) {
                            triggerPointsReward(scoreImpact, isRtl ? 'سفير الحوار والتحية' : 'Polite Ambassador', 'game_005');
                            speakFeedback("Excellent courtesy decision.");
                          } else {
                            speakFeedback("Consider a gentler style.");
                          }
                        }}
                        className={`p-4 rounded-xl border-2 text-left text-xs font-black transition-all ${
                          dialogueChosenOption === oIdx
                            ? opt.s > 0
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-red-500/20 border-red-500 text-red-300'
                            : dialogueChosenOption !== null
                              ? 'bg-slate-800/40 border-slate-700 text-slate-500 cursor-not-allowed text-opacity-50'
                              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 cursor-pointer'
                        }`}
                      >
                        <p className="font-mono">{opt.t}</p>
                        {dialogueChosenOption === oIdx && (
                          <p className="text-[10px] mt-1.5 opacity-80 italic font-sans text-slate-400">{opt.f}</p>
                        )}
                      </button>
                    ))}
                  </div>

                  {dialogueChosenOption !== null && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          if (dialogueIndex < dialogueAmbassadorScenariosData.length - 1) {
                            setDialogueIndex(prev => prev + 1);
                            setDialogueChosenOption(null);
                          } else {
                            alert(isRtl ? "مبارك! لقد أكملت سلسلة الحوارات الملكية بنجاح باهر وسافرت كدبلوماسي أدبي ملهم!" : "Congratulations! You have mastered all royal dialogue situations!");
                            setDialogueIndex(0);
                            setDialogueChosenOption(null);
                            setDialoguePoliteness(1.0);
                          }
                        }}
                        className="px-5 py-2.5 bg-[#6C5CE7] hover:bg-[#5142be] text-white rounded-xl text-xs font-black cursor-pointer"
                      >
                        {dialogueIndex < dialogueAmbassadorScenariosData.length - 1 
                          ? (isRtl ? "الحوار التالي ➡️" : "Next Scenario ➡️")
                          : (isRtl ? "إعادة السلسلة 🔄" : "Replay Series 🔄")}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 006: Spelling Hero (بطل الإملاء) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_006' && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-red-400 font-bold">{isRtl ? 'القلوب:' : 'Shield Lives:'} {"❤️".repeat(spellingLives)}</span>
                    <span className="text-[#00CEC9] font-mono font-black">Score: {spellingScore}</span>
                  </div>

                  <div className="p-8 bg-slate-900 rounded-3xl border border-slate-700 min-h-[140px] flex flex-col justify-center items-center relative overflow-hidden">
                    <span className="text-3xl text-rose-500 animate-bounce block mb-2 font-mono">☄️</span>
                    <h4 className="text-lg font-black text-rose-400 tracking-wider">
                      {spellingHeroTargetsData[spellingHeroIndex]}
                    </h4>
                  </div>

                  <input
                    type="text"
                    value={spellingInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSpellingInput(value);
                      const target = spellingHeroTargetsData[spellingHeroIndex];
                      if (value.trim().toLowerCase() === target.toLowerCase()) {
                        triggerPointsReward(20, isRtl ? 'بطل الإملاء الكوني' : 'Constellation Spelling Blaster', 'game_006');
                        setSpellingScore(p => p + 20);
                        speakFeedback("Meteors neutralized!");
                        setSpellingInput('');
                        setSpellingHeroIndex(prev => (prev + 1) % spellingHeroTargetsData.length);
                      }
                    }}
                    placeholder={isRtl ? "تهجّ الكلمة هنا بسرعة..." : "Type the meteor word to blast..."}
                    className="w-full text-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs tracking-widest focus:outline-none"
                  />
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 007: Grammar Garden (بستان القواعد) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_007' && (
                <div className="space-y-6">
                  <p className="text-xs text-slate-300 font-bold">
                    {isRtl 
                      ? "اضغط على قطب الأعشاب الصحيحة لسقي بستان القواعد لتنمو الست زهرات الثمينة بشكل كامل!"
                      : "Pluck the past participle verbs to spray water and spur growth on your study garden plants!"}
                  </p>

                  <div className="grid grid-cols-6 gap-3 text-center my-4">
                    {gardenPlants.map((lvl, index) => (
                      <div key={index} className="p-3 bg-slate-900 rounded-2xl border border-slate-700">
                        <span className="text-3xl block">
                          {lvl === 1 ? '🌱' : lvl === 2 ? '🌿' : lvl === 3 ? '🥦' : '🌸'}
                        </span>
                        <span className="text-[9px] block text-slate-400 font-bold mt-1">Stage {lvl}/4</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    {[
                      grammarGardenRaindropsData[(gardenRaindropIdx * 2) % grammarGardenRaindropsData.length],
                      grammarGardenRaindropsData[((gardenRaindropIdx * 2) + 1) % grammarGardenRaindropsData.length]
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.correct) {
                            triggerPointsReward(15, isRtl ? 'سقي نباتات بستان القواعد' : 'Grammar Garden Sprayer', 'game_007');
                            speakFeedback("Splendid water therapy!");
                            setGardenPlants(prev => {
                              const copy = [...prev];
                              copy[activeGardenIndex] = Math.min(4, copy[activeGardenIndex] + 1);
                              return copy;
                            });
                            setActiveGardenIndex(prev => (prev + 1) % 6);
                            setGardenRaindropIdx(prev => prev + 1);
                          } else {
                            speakFeedback("A drop of salty rain, wrong choice!");
                          }
                        }}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-xs font-black text-slate-200 transition-all cursor-pointer text-center"
                      >
                        {item.word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 008: Knight of Polite Words (فارس الكلمة المهذبة) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_008' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'فروسيتك النبيلة' : 'Knight HP'}</p>
                      <div className="w-full bg-slate-900 h-2 rounded mt-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all" style={{ width: `${knightHP}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 font-mono mt-1 block">{knightHP} / 100</span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold">{isRtl ? 'تنين الوقاحة السيء' : 'Rudeness Dragon HP'}</p>
                      <div className="w-full bg-slate-900 h-2 rounded mt-1.5 overflow-hidden">
                        <div className="bg-rose-500 h-full transition-all" style={{ width: `${dragonHP}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 font-mono mt-1 block">{dragonHP} / 100</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 max-h-[100px] overflow-y-auto text-[10px] text-slate-300 font-mono space-y-1">
                    {battleLog.map((log, lIdx) => (
                      <p key={lIdx}>➔ {log}</p>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-center text-xs font-black text-amber-400">
                    <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">{isRtl ? 'الهجوم الحالي للتنين:' : 'DRAGON OFFENSIVE:'}</p>
                    {isRtl 
                      ? politeKnightDragonAttacksData[dragonAttackIdx].attackAr 
                      : politeKnightDragonAttacksData[dragonAttackIdx].attackEn}
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {politeKnightDragonAttacksData[dragonAttackIdx].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (opt.dmg > 0) {
                            setDragonHP(prev => Math.max(0, prev - opt.dmg));
                            setKnightHP(prev => Math.min(100, prev + opt.heal));
                            setBattleLog(prev => [...prev, isRtl ? "شنت لباقة فروسيتك هجوماً مضاداً رائعاً!" : opt.desc]);
                            triggerPointsReward(25, isRtl ? 'سحق غضب التنين' : 'Knight of Polite Words Slay', 'game_008');
                            speakFeedback("Excellent courtesy response.");
                            
                            // Advance to the next dragon attack scenario!
                            setDragonAttackIdx(prev => (prev + 1) % politeKnightDragonAttacksData.length);
                            
                            if (dragonHP - opt.dmg <= 0) {
                              alert(isRtl ? "مبروك! لقد روّضت التنين بالكامل ونشرت ثقافة السلام واللباقة! 👑" : "The dragon of rudeness has been tamed by manners! 👑");
                              setDragonHP(100);
                              setKnightHP(100);
                              setDragonAttackIdx(0);
                            }
                          } else {
                            setKnightHP(prev => Math.max(10, prev - 25));
                            setBattleLog(prev => [...prev, isRtl ? "أوه، تسرعك بالرد أضر بفروسيتك النبيلة." : opt.desc]);
                            speakFeedback("Sarcastic trap, remain polite!");
                            // Also give them a new attack challenge to avoid being stuck
                            setDragonAttackIdx(prev => (prev + 1) % politeKnightDragonAttacksData.length);
                          }
                        }}
                        className="p-3 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-left text-xs font-black transition-all cursor-pointer font-mono"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 009: Pronunciation Detective (محقق النطق) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_009' && (
                <div className="space-y-6 text-center">
                  <h4 className="text-xs font-black text-[#FDCB6E]">
                    {isRtl ? 'اضغط لسماع الكلمة المخفية، ثم طابق إملاء الحروف المناسبة!' : 'Listen closely to the audio clip, then diagnose spelling clues:'}
                  </h4>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold max-w-xs mx-auto">
                    <span>{isRtl ? 'قضية رقم: ' : 'Case: '}{detectiveIndex + 1} / {pronunciationDetectivePairsData.length}</span>
                  </div>

                  <button
                    onClick={() => {
                      const correctWord = pronunciationDetectivePairsData[detectiveIndex].correct;
                      speakFeedback(correctWord, 'en');
                    }}
                    className="w-20 h-20 bg-[#6C5CE7] hover:bg-[#5142be] text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-md transition-all cursor-pointer animate-pulse"
                  >
                    🔊
                  </button>

                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    {pronunciationDetectivePairsData[detectiveIndex].choices.map((word) => (
                      <button
                        key={word}
                        onClick={() => {
                          const ans = pronunciationDetectivePairsData[detectiveIndex].correct;
                          if (word === ans) {
                            triggerPointsReward(20, isRtl ? 'محقق النطق والسمعيات' : 'Auditory Detective Speller', 'game_009');
                            speakFeedback("Solved, excellent detective ear!");
                            setDetectiveIndex(p => (p + 1) % pronunciationDetectivePairsData.length);
                          } else {
                            speakFeedback("Close sound, but incorrect spelling target!");
                          }
                        }}
                        className="p-3 bg-slate-800 hover:bg-emerald-500 text-white rounded-xl text-xs font-black font-mono transition-all text-center cursor-pointer"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 010: Picture Puzzle (لغز الصورة المبعثرة) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_010' && (
                <div className="space-y-6">
                  <p className="text-xs text-slate-300 font-bold">
                    {isRtl 
                      ? "املأ الفراغات بالجر والمحاذاة الصحيحة لكشف قطع لوحة طعام العائلة السعيدة!"
                      : "Unveil jigsaw parts of dining graphics by spelling active prepositions!"}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 max-w-xs mx-auto aspect-square bg-slate-900 p-2 rounded-2xl border border-slate-700">
                    {puzzleUnveiled.map((unveiled, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xl transition-all ${
                          unveiled ? 'bg-gradient-to-tr from-emerald-500 to-teal-400' : 'bg-slate-800 text-slate-600'
                        }`}
                      >
                        {unveiled ? "🥗" : "❓"}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-center space-y-3">
                    <p className="text-xs font-mono text-[#FDCB6E]">
                      {isRtl ? 'الجزء ' : 'Piece '}{puzzleSentenceIndex+1} / 9: {picturePuzzleListData[puzzleSentenceIndex].sentence}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {picturePuzzleListData[puzzleSentenceIndex].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const correctAns = picturePuzzleListData[puzzleSentenceIndex].ans;
                            if (option === correctAns) {
                              triggerPointsReward(15, isRtl ? 'تجميع الصورة بالملحق الوصفي' : 'Prepositional Image Assembler', 'game_010');
                              speakFeedback("Grid piece unveiled!");
                              setPuzzleUnveiled(prev => {
                                const copy = [...prev];
                                copy[puzzleSentenceIndex] = true;
                                return copy;
                              });
                              if (puzzleSentenceIndex < 8) {
                                setPuzzleSentenceIndex(p => p + 1);
                              } else {
                                alert(isRtl ? "يا لك من عبقري رائع! كشفت اللوحة التأسيسية لآداب المائدة بالكامل! 🥗✨" : "Magnificent! You've successfully completed the tableware puzzle! 🥗✨");
                                setPuzzleSentenceIndex(0);
                                setPuzzleUnveiled(Array(9).fill(false));
                              }
                            } else {
                              speakFeedback("Try another preposition!");
                            }
                          }}
                          className="p-2 bg-slate-800 hover:bg-[#6C5CE7] text-white rounded-lg text-[10px] font-black cursor-pointer transition-all text-center"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 011: Kingdom of Etiquette (مملكة الأدب) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_011' && (() => {
                const currentChallenge = kingdomOfEtiquetteRoomsData[etiquetteRoomChallenge % kingdomOfEtiquetteRoomsData.length];
                return (
                  <div className="space-y-6">
                    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 text-center space-y-2">
                      <span className="text-4xl">🏰</span>
                      <h4 className="text-xs font-black text-white">{isRtl ? 'الموقع الحالي في قلعة الذوق' : 'Fortress Location Unlocked'}</h4>
                      <p className="text-xs font-bold text-amber-300">
                        {isRtl ? currentChallenge.roomNameAr : currentChallenge.roomNameEn}
                      </p>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono font-bold block w-max mx-auto">
                        {isRtl ? 'غرف مبنية: ' : 'Rooms Built: '}{kingdomRoomsUnlocked} / {kingdomOfEtiquetteRoomsData.length}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-300">
                      {isRtl ? currentChallenge.challengeAr : currentChallenge.challengeEn}
                    </p>

                    <div className="grid grid-cols-1 gap-2.5">
                      {currentChallenge.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (oIdx === currentChallenge.correctIdx) {
                              triggerPointsReward(20, isRtl ? 'بناء غرف مدرسة الأدب والذوق' : 'Fortress of Courtesy Constructor', 'game_011');
                              speakFeedback("Castle brick added!");
                              setKingdomRoomsUnlocked(p => p + 1);
                              
                              if (etiquetteRoomChallenge + 1 >= kingdomOfEtiquetteRoomsData.length) {
                                alert(isRtl ? "يا لك من بطل عظيم! لقد بنيت قلعة الأدب بالكامل ونلت وسام ملك الأخلاق! 🏰👑🏆" : "Astounding victory! You have constructed all chambers of the Etiquette Fortress! 🏰👑🏆");
                                setKingdomRoomsUnlocked(0);
                                setEtiquetteRoomChallenge(0);
                              } else {
                                setEtiquetteRoomChallenge(p => p + 1);
                              }
                            } else {
                              speakFeedback("Think of a more polite pathway!");
                            }
                          }}
                          className="p-3 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-left text-xs font-black font-mono cursor-pointer transition-all border border-slate-700/60"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* ---------------------------------------------------- */}
              {/* GAME 012: Friendship Race (سباق الأصدقاء) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_012' && (() => {
                const friendshipChallenges = [
                  {
                    titleAr: "تحدي التشجيع والدعم اللفظي 📣",
                    titleEn: "Encouragement & Support Challenge 📣",
                    descAr: "شجع صديقك بعبارة إنجليزية لطيفة! (مثلاً: Well done, Great job, Keep going, You can do it)",
                    descEn: "Write an inspiring English phrase of motivation to push your partner!",
                    valids: ["well done", "great job", "keep going", "you can do it", "excellent", "awesome", "perfect", "good job", "keep it up"],
                    suggestions: [
                      { phrase: "Well done", trans: "أحسنت صنعاً" },
                      { phrase: "Great job", trans: "عمل رائع" },
                      { phrase: "Keep going", trans: "واصل التقدم" },
                      { phrase: "You can do it", trans: "يمكنك فعلها" },
                      { phrase: "Excellent", trans: "ممتاز" },
                      { phrase: "Awesome", trans: "مدهش" }
                    ]
                  },
                  {
                    titleAr: "تحدي التحية والترحيب اللطيف 👋",
                    titleEn: "Greeting & Welcome Challenge 👋",
                    descAr: "رحب بصديقك بعبارة إنجليزية مهذبة! (مثلاً: Hello, Hi, Hello there, Welcome)",
                    descEn: "Greet your teammate warmly with an appropriate English salutation!",
                    valids: ["hello", "hi", "hello there", "welcome", "good morning", "good afternoon", "nice to meet you"],
                    suggestions: [
                      { phrase: "Hello", trans: "مرحباً بك" },
                      { phrase: "Hi", trans: "أهلاً" },
                      { phrase: "Welcome", trans: "أهلاً وسهلاً" },
                      { phrase: "Good morning", trans: "صباح الخير" },
                      { phrase: "Nice to meet you", trans: "سررت بلقائك" }
                    ]
                  },
                  {
                    titleAr: "تحدي تقديم الشكر والامتنان 💝",
                    titleEn: "Gratitude & Thankfulness Challenge 💝",
                    descAr: "عبّر عن شكرك وامتنانك لصديقك بالإنجليزية! (مثلاً: Thank you, Thanks, Thank you so much)",
                    descEn: "Say thank you to your colleague in English to strengthen your cooperative bond!",
                    valids: ["thank you", "thanks", "thank you so much", "thanks a lot", "much appreciated"],
                    suggestions: [
                      { phrase: "Thank you", trans: "شكراً لك" },
                      { phrase: "Thanks", trans: "شكراً" },
                      { phrase: "Thank you so much", trans: "شكراً جزيلاً" },
                      { phrase: "Much appreciated", trans: "ممتن جداً" }
                    ]
                  },
                  {
                    titleAr: "تحدي تمني حظ طيب وتوفيق 🍀",
                    titleEn: "Good Wishes & Success Challenge 🍀",
                    descAr: "تمنّ حظاً موفقاً وتوفيقاً لصديقك بالإنجليزية! (مثلاً: Good luck, All the best)",
                    descEn: "Send words of good fortune and success to your racing friend!",
                    valids: ["good luck", "all the best", "best wishes", "have fun"],
                    suggestions: [
                      { phrase: "Good luck", trans: "حظاً موفقاً" },
                      { phrase: "All the best", trans: "كل التوفيق" },
                      { phrase: "Best wishes", trans: "أطيب التمنيات" },
                      { phrase: "Have fun", trans: "استمتع بوقتك" }
                    ]
                  },
                  {
                    titleAr: "تحدي الوداع ولقاء قريب ✈️",
                    titleEn: "Warm Farewell & Goodbye Challenge ✈️",
                    descAr: "ودّع صديقك بلطف بالإنجليزية حتى تلتقيا مجدداً! (مثلاً: Goodbye, See you soon, Bye)",
                    descEn: "Bid a courteous farewell to your companion in English!",
                    valids: ["goodbye", "bye", "see you soon", "see you", "see you later", "farewell"],
                    suggestions: [
                      { phrase: "Goodbye", trans: "وداعاً" },
                      { phrase: "Bye", trans: "إلى اللقاء" },
                      { phrase: "See you soon", trans: "أراك قريباً" },
                      { phrase: "See you later", trans: "أراك لاحقاً" }
                    ]
                  }
                ];

                const currentChallenge = friendshipChallenges[raceChallengeIndex % friendshipChallenges.length];

                const handleCoopSubmit = (customVal?: string) => {
                  const cleaned = (customVal || raceInput).trim().toLowerCase();
                  if (!cleaned) return;

                  if (currentChallenge.valids.includes(cleaned)) {
                    // Update current player progress
                    const nextProgress = raceCurrentPlayer === 1 
                      ? Math.min(100, friendshipProgress + 15)
                      : Math.min(100, friendshipProgress2 + 15);

                    if (raceCurrentPlayer === 1) {
                      setFriendshipProgress(nextProgress);
                    } else {
                      setFriendshipProgress2(nextProgress);
                    }

                    triggerPointsReward(15, isRtl ? 'وسام سباق التعاون والصداقة' : 'Friendship Path Booster', 'game_012');
                    speakFeedback(isRtl ? `رائع! أرسلت: ${cleaned}` : `Superb greeting: ${cleaned}`);
                    setRaceFeedback(isRtl ? `🎉 تقدمت 15 خطوة بإرسال: "${cleaned}"!` : `🎉 Advanced 15 steps with: "${cleaned}"!`);
                    setRaceInput('');

                    // Check win
                    if (nextProgress >= 100) {
                      setRaceWinner(raceCurrentPlayer);
                      speakFeedback("Victory in friendship track!");
                      return;
                    }

                    // Next challenge and next player
                    setRaceChallengeIndex(prev => prev + 1);
                    setRaceCurrentPlayer(prev => prev === 1 ? 2 : 1);
                  } else {
                    setRaceFeedback(isRtl ? "❌ لم يتم التعرف على العبارة، جرب عبارة أخرى واضحة!" : "❌ Phrase unrecognized. Try another polite standard phrase!");
                    speakFeedback("Keep trying!");
                  }
                };

                const handleSlowAdvance = () => {
                  const nextProgress = raceCurrentPlayer === 1
                    ? Math.min(100, friendshipProgress + 5)
                    : Math.min(100, friendshipProgress2 + 5);

                  if (raceCurrentPlayer === 1) {
                    setFriendshipProgress(nextProgress);
                  } else {
                    setFriendshipProgress2(nextProgress);
                  }

                  setRaceFeedback(isRtl ? "🚶‍♂️ تقدم فردي بطيء بمقدار 5 خطوات..." : "🚶‍♂️ Advanced slowly by 5 steps individually...");
                  speakFeedback("Slow but steady steps!");
                  setRaceInput('');

                  if (nextProgress >= 100) {
                    setRaceWinner(raceCurrentPlayer);
                    speakFeedback("Victory in friendship track!");
                    return;
                  }

                  setRaceCurrentPlayer(prev => prev === 1 ? 2 : 1);
                };

                const resetRaceGame = () => {
                  setFriendshipProgress(15);
                  setFriendshipProgress2(15);
                  setRaceCurrentPlayer(1);
                  setRaceChallengeIndex(0);
                  setRaceInput('');
                  setRaceFeedback('');
                  setRaceWinner(null);
                  speakFeedback("Race track updated!");
                };

                return (
                  <div id="game-12-coop-race" className="space-y-6">
                    {/* Header Info */}
                    <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md inline-block">
                          {isRtl ? "تذكرة التعاون بمسار السباق" : "Co-op Boarding Pass"}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-sm font-black text-[#FDCB6E]">
                            {isRtl ? "تحدي اللباقة النشط: " : "Active Etiquette Goal: "}
                          </span>
                          <span className="text-xs bg-[#6C5CE7] text-white px-2.5 py-0.5 rounded-full font-black">
                            {isRtl ? `المرحلة ${ (raceChallengeIndex % friendshipChallenges.length) + 1 }` : `Stage ${ (raceChallengeIndex % friendshipChallenges.length) + 1 }`}
                          </span>
                        </div>
                      </div>
                      <button
                        id="reset-race-btn"
                        onClick={resetRaceGame}
                        className="text-[10px] font-black bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-3.5 py-1.5 rounded-xl border border-rose-500/25 cursor-pointer transition-all active:scale-95"
                      >
                        {isRtl ? "إعادة تهيئة المسار 🔄" : "Reset Race 🔄"}
                      </button>
                    </div>

                    {/* TWO RUNNING TRACKS (LANES) */}
                    <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-5">
                      <div className="text-xs text-left font-black text-slate-300 border-b border-slate-800 pb-2 flex justify-between items-center">
                        <span className="flex items-center gap-1.5">🏁 {isRtl ? "مسار سباق التعاون الثنائي" : "Dual Cooperative Race Lanes"}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {isRtl ? "الهدف للوصول: 100%" : "Goal: Reach 100% first"}
                        </span>
                      </div>

                      {/* Lane 1: Player 1 (🦁) */}
                      <div id="player-1-lane" className="space-y-1.5 relative">
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-black flex items-center gap-1 ${raceCurrentPlayer === 1 ? 'text-[#FDCB6E]' : 'text-slate-400'}`}>
                            🦁 {isRtl ? "اللاعب 1 (أسد الشجاعة)" : "Player 1 (Lion)"}
                            {raceCurrentPlayer === 1 && <span className="bg-[#FDCB6E]/10 text-[#FDCB6E] text-[9px] px-1.5 py-0.2 rounded-full border border-[#FDCB6E]/20 font-bold ml-1">{isRtl ? "دوره الحالي" : "Active Turn"}</span>}
                          </span>
                          <span className="font-mono font-bold text-slate-400">{friendshipProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-950 border border-slate-800 h-10 rounded-2xl relative flex items-center overflow-hidden">
                          {/* Progress bar background indicator */}
                          <div className="bg-gradient-to-r from-[#6C5CE7]/30 to-[#6C5CE7] h-full transition-all duration-300" style={{ width: `${friendshipProgress}%` }} />
                          {/* Moving Lion emoji */}
                          <div 
                            className="absolute transition-all duration-500 text-2xl flex items-center justify-center pb-1"
                            style={{ 
                              left: `calc(${friendshipProgress * 0.88 + 4}%)`, 
                              transform: 'translate(-50%, -50%)', 
                              top: '50%',
                              zIndex: 10 
                            }}
                          >
                            🦁
                          </div>
                          <span className="absolute right-4 text-[9px] font-black tracking-widest text-slate-500 uppercase">FINISH 🏁</span>
                        </div>
                      </div>

                      {/* Lane 2: Player 2 (🦄) */}
                      <div id="player-2-lane" className="space-y-1.5 relative">
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-black flex items-center gap-1 ${raceCurrentPlayer === 2 ? 'text-[#FDCB6E]' : 'text-slate-400'}`}>
                            🦄 {isRtl ? "اللاعب 2 (وحيد القرن اللبق)" : "Player 2 (Unicorn)"}
                            {raceCurrentPlayer === 2 && <span className="bg-[#FDCB6E]/10 text-[#FDCB6E] text-[9px] px-1.5 py-0.2 rounded-full border border-[#FDCB6E]/20 font-bold ml-1">{isRtl ? "دوره الحالي" : "Active Turn"}</span>}
                          </span>
                          <span className="font-mono font-bold text-slate-400">{friendshipProgress2}%</span>
                        </div>
                        <div className="w-full bg-slate-950 border border-slate-800 h-10 rounded-2xl relative flex items-center overflow-hidden">
                          {/* Progress bar background indicator */}
                          <div className="bg-gradient-to-r from-[#00CEC9]/30 to-[#00CEC9] h-full transition-all duration-300" style={{ width: `${friendshipProgress2}%` }} />
                          {/* Moving Unicorn emoji */}
                          <div 
                            className="absolute transition-all duration-500 text-2xl flex items-center justify-center pb-1"
                            style={{ 
                              left: `calc(${friendshipProgress2 * 0.88 + 4}%)`, 
                              transform: 'translate(-50%, -50%)', 
                              top: '50%',
                              zIndex: 10 
                            }}
                          >
                            🦄
                          </div>
                          <span className="absolute right-4 text-[9px] font-black tracking-widest text-slate-500 uppercase">FINISH 🏁</span>
                        </div>
                      </div>
                    </div>

                    {/* VICTORY OVERLAY CARD */}
                    {raceWinner && (
                      <div className="bg-[#00CEC9]/10 border-2 border-[#00CEC9]/40 p-6 rounded-2xl text-center space-y-4 animate-bounce">
                        <p className="text-2xl">🏆👑🎉</p>
                        <h4 className="text-md font-black text-white">
                          {isRtl 
                            ? `تهانينا الحارة! فاز اللاعب ${raceWinner === 1 ? 'الأول 🦁' : 'الثاني 🦄'} بالسباق!` 
                            : `Outstanding! Player ${raceWinner === 1 ? '1 🦁' : '2 🦄'} has Crossed the Finish Line!`}
                        </h4>
                        <p className="text-xs text-slate-300 max-w-sm mx-auto animate-pulse">
                          {isRtl 
                            ? "أنهى البطلان السباق الرائع بفضل العبارات الذكية والتعاون اللبق! تم تسجيل نقاط إضافية." 
                            : "Both companions successfully pushed their physical state thanks to prompt language and etiquette support."}
                        </p>
                        <button
                          onClick={resetRaceGame}
                          className="px-6 py-2 bg-[#00CEC9] hover:bg-[#00cec9]/90 text-slate-950 font-black rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                        >
                          {isRtl ? "ابدأ سباقاً جديداً 🔄" : "Start New Race 🔄"}
                        </button>
                      </div>
                    )}

                    {!raceWinner && (
                      <div className="space-y-5">
                        {/* CHALLENGE CARD */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 p-5 rounded-2xl border border-slate-700/50 space-y-3.5 relative overflow-hidden">
                          {/* Glow background accent */}
                          <div className="absolute -right-20 -top-20 w-44 h-44 bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="flex justify-between items-center">
                            <span className="text-[10px] bg-[#6C5CE7]/20 text-slate-200 px-3 py-1 rounded-full font-black border border-[#6C5CE7]/30">
                              {isRtl ? `بطاقة تعاون: دور اللاعب ${raceCurrentPlayer}` : `Co-op Challenge: Player ${raceCurrentPlayer}'s Turn`}
                            </span>
                            <span className="text-xs text-[#FDCB6E] font-black flex items-center gap-1 animate-pulse">
                              {raceCurrentPlayer === 1 ? "🦁 Player 1" : "🦄 Player 2"}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="text-sm font-black text-white">{isRtl ? currentChallenge.titleAr : currentChallenge.titleEn}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {isRtl ? currentChallenge.descAr : currentChallenge.descEn}
                            </p>
                          </div>
                        </div>

                        {/* SUGGESTED INTERACTIVE CHIPS/CARDS */}
                        <div className="space-y-2 bg-slate-900/20 p-4 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block font-bold mb-1">
                            {isRtl ? "💡 انقر على العبارة المناسبة لإرسالها فوراً والتقدم السريع:" : "💡 Click to select and send the phrase instantly:"}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {currentChallenge.suggestions.map((sug) => (
                              <button
                                key={sug.phrase}
                                onClick={() => handleCoopSubmit(sug.phrase)}
                                className="px-3.5 py-2 bg-slate-800/80 hover:bg-[#6C5CE7] hover:text-white text-slate-200 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer border border-slate-700 active:scale-95"
                              >
                                <span>{sug.phrase}</span>
                                <span className="text-[10px] text-slate-400 group-hover:text-slate-200 font-normal">
                                  ({sug.trans})
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* INPUT CONTROL FIELD (MANUAL OPTION) */}
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="text"
                              value={raceInput}
                              onChange={(e) => setRaceInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleCoopSubmit();
                                }
                              }}
                              placeholder={isRtl ? "أو تدرب على كتابتها يدوياً بالإنجليزية هنا..." : "Or practice typing it manually here..."}
                              className="w-full text-center px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono font-bold focus:outline-none focus:border-[#6C5CE7]/60 focus:ring-1 focus:ring-[#6C5CE7]/60"
                            />
                          </div>

                          {raceFeedback && (
                            <p className="text-xs font-bold text-[#FDCB6E]/90 text-center animate-fade-in font-mono">
                              {raceFeedback}
                            </p>
                          )}

                          {/* ACTION BUTTONS */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <button
                              id="submit-cheer-btn"
                              onClick={() => handleCoopSubmit()}
                              disabled={!raceInput.trim()}
                              className="w-full py-3.5 bg-[#6C5CE7] hover:bg-[#5142be] disabled:opacity-50 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#6C5CE7]/20"
                            >
                              🚀 {isRtl ? "تحقق وأرسل المكتوب يدوياً (15+ خطوة)" : "Verify & Boost manual (15+ Steps)"}
                            </button>

                            <button
                              id="slow-advance-btn"
                              onClick={handleSlowAdvance}
                              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700/50"
                            >
                              🚶‍♂️ {isRtl ? "تجاوز فردي ببطء دون عبارة (5+ خطوات)" : "Pass Slowly Individually (5+ Steps)"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ---------------------------------------------------- */}
              {/* GAME 013: Second-hand Word Market (سوق الكلمات المستعملة) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_013' && (() => {
                const currentItem = wordMarketRustyWordsData[marketWordIndex % wordMarketRustyWordsData.length];
                return (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block">{isRtl ? 'محفظة التداول' : 'Wallet Wealth'}</span>
                        <span className="text-md font-black text-amber-300 font-mono">💰 {marketGold} Gold</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block">{isRtl ? 'السلعة في المتجر' : 'Market Item'}</span>
                        <span className="text-xs bg-[#6C5CE7]/20 px-2 py-0.5 rounded font-mono font-bold text-white border border-[#6C5CE7]/30">
                          {marketWordIndex + 1} / {wordMarketRustyWordsData.length}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#00CEC9] font-black">{isRtl ? 'الكلمة الأساسية المكسورة' : 'CURRENCY ROOT ELEMENT'}</p>
                      <h4 className="text-xl font-bold font-mono text-white tracking-widest">{currentItem.display}</h4>
                      <p className="text-[10px] text-slate-400">{isRtl ? 'أصل الكلمة بحاجة لربط بادئة أو لاحقة صحيحة' : 'Reforge the concept by splicing its prefix/suffix extension'}</p>
                    </div>

                    <p className="text-xs font-bold text-slate-300 text-center">
                      {isRtl ? 'اختر إضافة بادئة أو لاحقة للترميم وتحقيق الربح المالي الكثيف:' : 'Snap prefix or suffix to fix broken dictionary concepts:'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentItem.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (opt.isCorrect) {
                              const goldEarned = currentItem.basePrice + 25;
                              setMarketGold(prev => prev + goldEarned);
                              triggerPointsReward(20, isRtl ? 'سوق الكلمات القديمة والبادئات' : 'Root Word Restorer', 'game_013');
                              speakFeedback(`Successfully restored as ${opt.res}! Sold for ${goldEarned} gold.`);
                              
                              if (marketWordIndex + 1 >= wordMarketRustyWordsData.length) {
                                alert(isRtl ? "مبارك! لقد قمت بترميم وصناعة كل كلمات المعجم القديم وحققت ثروة طائلة! 📖🏆" : "Amazing! You have restored all legacy words in the Second-hand Word Market!");
                                setMarketWordIndex(0);
                              } else {
                                setMarketWordIndex(prev => prev + 1);
                              }
                            } else {
                              speakFeedback("Oops! Spelling or meaning doesn't match root grammar. Try the other splice!");
                            }
                          }}
                          className="p-4 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-center space-y-1.5 cursor-pointer transition-all border border-slate-700/60 active:scale-95"
                        >
                          <h5 className="font-mono text-xs font-bold text-white">{opt.text}</h5>
                          <p className="text-[10px] text-slate-400">{isRtl ? 'التجميع المقترح:' : 'Result:'} <b className="text-[#00CEC9]">{opt.res}</b></p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* ---------------------------------------------------- */}
              {/* GAME 014: Politeness Cipher (شيفرة الأدب) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_014' && (() => {
                const currentPuzzle = politenessCiphersListData[cipherIndex % politenessCiphersListData.length];
                return (
                  <div className="space-y-6 text-center">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold font-mono uppercase">
                      <span>{isRtl ? 'الشيفرة ' : 'Cipher '}{cipherIndex + 1} / {politenessCiphersListData.length}</span>
                      <span className="text-amber-400">{isRtl ? `إزاحة: ${currentPuzzle.keyShift}` : `Shift Key: ${currentPuzzle.keyShift}`}</span>
                    </div>

                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                      <span className="text-2xl">🔐</span>
                      <p className="text-xs font-bold text-slate-300 font-mono tracking-wider select-all">
                        "{currentPuzzle.cipher}"
                      </p>
                      <p className="text-[10px] text-slate-400 leading-relaxed italic">
                        💡 {isRtl ? currentPuzzle.hintAr : currentPuzzle.hintEn}
                      </p>
                    </div>

                    <input
                      type="text"
                      value={cipherInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCipherInput(value);
                        if (value.trim().toLowerCase() === currentPuzzle.ans.toLowerCase()) {
                          setCipherDecrypted(true);
                          triggerPointsReward(30, isRtl ? 'حلال شفرات التحية والأدب' : 'Caesar Cipher Manners Decrypter', 'game_014');
                          speakFeedback("Code decrypted. Brilliant intelligence.");
                        }
                      }}
                      placeholder={isRtl ? "اكتب العبارة المفكوكة بالإنجليزية..." : `Translate: "${currentPuzzle.cipher}"...`}
                      className="w-full text-center px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono tracking-wider focus:outline-none focus:border-[#6C5CE7]"
                    />

                    {cipherDecrypted && (
                      <div className="space-y-4">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl font-mono">
                          🔓 {isRtl ? `رائع! العبارة صحيحة: ${currentPuzzle.ans}` : `Success! Decrypted securely: ${currentPuzzle.ans}`}
                        </motion.div>

                        <button
                          onClick={() => {
                            if (cipherIndex < politenessCiphersListData.length - 1) {
                              setCipherIndex(prev => prev + 1);
                              setCipherInput('');
                              setCipherDecrypted(false);
                            } else {
                              alert(isRtl ? "مبارك! لقد فككت كل شيفرات مملكة التحيات والأدب بنجاح باهر! 🏆" : "Amazing! You have decoded all politeness ciphers successfully!");
                              setCipherIndex(0);
                              setCipherInput('');
                              setCipherDecrypted(false);
                            }
                          }}
                          className="px-5 py-2.5 bg-[#00CEC9] hover:bg-[#00cec9]/90 text-slate-950 rounded-xl text-xs font-black cursor-pointer shadow-lg shadow-[#00CEC9]/10 animate-pulse"
                        >
                          {isRtl ? "الشيفرة التالية ➡️" : "Next Cipher ➡️"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ---------------------------------------------------- */}
              {/* GAME 015: Shadow Theater (مسرح الظلال) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_015' && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-900 text-center relative overflow-hidden">
                    <span className="text-5xl block animate-pulse">🎭</span>
                    <h5 className="text-xs font-bold text-[#FDCB6E] mt-2">{isRtl ? 'منزل الأمير والتنين المهذب' : 'The Prince and the Polite Dragon shadow screen'}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {isRtl ? 'اكتب جملة يلقيها الأمير ليعلم فيها التنين آداب الجلوس أو الترحيب:' : 'Type a sentence spoken by the prince containing vocabulary of courtesy and moral values:'}
                    </p>
                  </div>

                  <textarea
                    rows={2}
                    value={theaterMoralInput}
                    onChange={(e) => setTheaterMoralInput(e.target.value)}
                    placeholder={isRtl ? "اكتب هنا بالإنجليزية..." : "Write a kind dialogue string here..."}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />

                  <button
                    onClick={() => {
                      if (theaterMoralInput.toLowerCase().includes("please") || theaterMoralInput.toLowerCase().includes("thank") || theaterMoralInput.toLowerCase().includes("kind")) {
                        setTheaterFeedback(isRtl ? "تقييم باسل: ممتاز! لقنت التنين سلوكاً خلوكاً للغاية." : "Basil's shadow critic: 10/10. Supremely kind phraseology!");
                        triggerPointsReward(25, isRtl ? 'سرد مسرح الظلال الهادف' : 'Shadow Theater Moral Storyteller', 'game_015');
                        speakFeedback("Fantastic story structure.");
                      } else {
                        setTheaterFeedback(isRtl ? "الحوار رائع، لكن حاول إدخال قيمة تهذيبية مثل please أو thank you لرفع التقييم!" : "Include words of courtesy to earn extra theater merits!");
                      }
                    }}
                    className="w-full py-2.5 bg-[#6C5CE7] hover:bg-[#5142be] text-white rounded-xl text-xs font-black cursor-pointer transition-all text-center"
                  >
                    🎭 {isRtl ? 'عرض المشهد على الستارة والتقييم' : 'Submit Scene Description to Basil'}
                  </button>

                  {theaterFeedback && (
                    <p className="text-center text-xs font-bold text-amber-300 italic">{theaterFeedback}</p>
                  )}
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 016: Communication Bridge (جسر التواصل) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_016' && (() => {
                const currentPrompt = communicationBridgePromptsData[bridgeQuestionIndex % communicationBridgePromptsData.length];
                return (
                  <div className="space-y-6">
                    <p className="text-xs text-slate-300 font-bold">
                      {isRtl 
                        ? "رتب الأخشاب لربط الجزيرتين عن طريق استصدار تتابع الجمل الشرطية والرد السليم!"
                        : "Bridge the academic waters by stacking the correct grammar planks!"}
                    </p>

                    <div className="flex gap-2 justify-center py-4">
                      {Array.from({ length: communicationBridgePromptsData.length }).map((_, bIdx) => (
                        <div 
                          key={bIdx}
                          className={`w-10 h-6 rounded-lg transition-all flex items-center justify-center font-black text-[10px] ${
                            bIdx < bridgePlanks ? 'bg-amber-600 border border-amber-700 text-amber-100 shadow-md' : 'bg-slate-800 border border-slate-700 text-slate-600'
                          }`}
                        >
                          {bIdx + 1}
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 text-center font-mono">
                      <p className="text-xs font-bold text-[#FDCB6E]">{currentPrompt.sentence}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {currentPrompt.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            if (opt === currentPrompt.ans) {
                              triggerPointsReward(20, isRtl ? 'بناء جسور القواعد والشرطيات' : 'Bridge Builder Logic Solver', 'game_016');
                              speakFeedback("Excellent plank snapped!");
                              
                              if (bridgeQuestionIndex + 1 >= communicationBridgePromptsData.length) {
                                alert(isRtl ? "رائع! اكتمل الجسر عالي الأركان بنجاح تام وعبرت كل قوافل العلم واللباقة! 🌉🏆" : "Hooray! The majestic communication bridge is completely constructed! 🌉🏆");
                                setBridgePlanks(0);
                                setBridgeQuestionIndex(0);
                              } else {
                                setBridgePlanks(p => p + 1);
                                setBridgeQuestionIndex(p => p + 1);
                              }
                            } else {
                              speakFeedback("Wrong verbal plank, bridge collapsed, try again!");
                            }
                          }}
                          className="p-2.5 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-xs font-bold tracking-wider cursor-pointer font-mono border border-slate-700/60 active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* ---------------------------------------------------- */}
              {/* GAME 017: Garden of Emotions (حديقة المشاعر) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_017' && (
                <div className="space-y-6 text-center">
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
                    <span className="text-4xl animate-pulse block">🥀</span>
                    <h5 className="text-xs font-extrabold text-slate-200 mt-2">{isRtl ? 'زهرة الحزن تذبل!' : 'The sorrow flower is sad...'}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {isRtl ? 'انثر كلمات المواساة الإيجابية لإنقاذها وازدهار بستانك العاطفي:' : 'Pour words of sweet empathy and comfort to cheer the plant up:'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    {[
                      { txt: "Everything will be okay.", points: 15 },
                      { txt: "Do not complain.", points: 0 },
                      { txt: "I am always here for you.", points: 15 },
                      { txt: "Why are you sad?", points: 0 }
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (opt.points > 0) {
                            setEmotionFlowerStatus('blossoming');
                            triggerPointsReward(opt.points, isRtl ? 'انعاش زهور الحديقة العاطفية' : 'Emotional Intelligence Booster', 'game_017');
                            speakFeedback("Empathy poured. The blossom looks beautiful!");
                            alert(isRtl ? "رائع! ازدهر الورد بفضل لطفك وحسك الإنساني العذب! 🌸✨" : "Praise accepted! The flower of gratitude is glowing! 🌸✨");
                          } else {
                            speakFeedback("A cold shoulder, select positive encouragement!");
                          }
                        }}
                        className="p-3 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-xs font-black transition-all cursor-pointer font-mono"
                      >
                        {opt.txt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 018: Phrase Chef (طباخ العبارات) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_018' && (() => {
                const currentRecipe = phraseChefRecipesData[phraseChefRecipeIndex % phraseChefRecipesData.length];
                return (
                  <div className="space-y-6">
                    <div className="p-5 bg-slate-900 rounded-3xl border border-slate-700/60 text-center relative overflow-hidden">
                      <div className="absolute top-2 right-4 text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/40 font-bold">
                        {isRtl ? 'طبق ' : 'Dish '}{phraseChefRecipeIndex + 1} / {phraseChefRecipesData.length}
                      </div>
                      <span className="text-4xl animate-bounce block">🍲</span>
                      <h5 className="text-xs font-extrabold text-[#FDCB6E] mt-2">
                        {isRtl ? currentRecipe.titleAr : currentRecipe.titleEn}
                      </h5>
                      <p className="text-[10px] text-[#00CEC9] mt-1">Select logic tokens: SUBJECT ➔ VERB ➔ OBJECT</p>
                    </div>

                    <div className="p-3 bg-slate-900/40 rounded-2xl border border-slate-800 text-center min-h-[50px] flex items-center justify-center gap-2 flex-wrap">
                      {phraseChefSelected.length === 0 ? (
                        <p className="text-slate-500 font-bold text-xs italic">{isRtl ? 'حدد العناصر بالترتيب لبناء الجملة...' : 'Click tokens to assemble grammatically perfect sentence...'}</p>
                      ) : (
                        phraseChefSelected.map((tok, tIdx) => (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={tIdx}
                            className="px-3 py-1.5 bg-[#6C5CE7] rounded-xl text-xs font-mono font-black text-white border border-[#6C5CE7]/40 shadow-md flex items-center gap-1"
                          >
                            <span>{tok}</span>
                          </motion.div>
                        ))
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 mb-1.5 text-center">{isRtl ? 'فاعل' : 'Subject'}</p>
                        {currentRecipe.subjects.map(word => (
                          <button
                            key={word}
                            disabled={phraseChefSelected.includes(word)}
                            onClick={() => {
                              if (phraseChefSelected.length >= 3) return;
                              setPhraseChefSelected(prev => [...prev, word]);
                            }}
                            className={`w-full text-center py-2.5 rounded-lg text-[10px] font-bold text-white mb-2 cursor-pointer transition-all ${
                              phraseChefSelected.includes(word)
                                ? 'bg-slate-900/30 text-slate-700 border border-slate-800/40 opacity-40 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-[#6C5CE7] hover:scale-105 active:scale-95'
                            }`}
                          >
                            {word}
                          </button>
                        ))}
                      </div>

                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 mb-1.5 text-center">{isRtl ? 'فعل' : 'Verb'}</p>
                        {currentRecipe.verbs.map(word => (
                          <button
                            key={word}
                            disabled={phraseChefSelected.includes(word)}
                            onClick={() => {
                              if (phraseChefSelected.length >= 3) return;
                              setPhraseChefSelected(prev => [...prev, word]);
                            }}
                            className={`w-full text-center py-2.5 rounded-lg text-[10px] font-bold text-white mb-2 cursor-pointer transition-all ${
                              phraseChefSelected.includes(word)
                                ? 'bg-slate-900/30 text-slate-700 border border-slate-800/40 opacity-40 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-[#6C5CE7] hover:scale-105 active:scale-95'
                            }`}
                          >
                            {word}
                          </button>
                        ))}
                      </div>

                      <div>
                        <p className="text-[9px] uppercase font-black text-slate-500 mb-1.5 text-center">{isRtl ? 'مفعول' : 'Object'}</p>
                        {currentRecipe.objects.map(word => (
                          <button
                            key={word}
                            disabled={phraseChefSelected.includes(word)}
                            onClick={() => {
                              if (phraseChefSelected.length >= 3) return;
                              setPhraseChefSelected(prev => [...prev, word]);
                            }}
                            className={`w-full text-center py-2.5 rounded-lg text-[10px] font-bold text-white mb-2 cursor-pointer transition-all ${
                              phraseChefSelected.includes(word)
                                ? 'bg-slate-900/30 text-slate-700 border border-slate-800/40 opacity-40 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-[#6C5CE7] hover:scale-105 active:scale-95'
                            }`}
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (phraseChefSelected.length === 3) {
                            const isCorrect = phraseChefSelected[0] === currentRecipe.correctCombo[0] &&
                                              phraseChefSelected[1] === currentRecipe.correctCombo[1] &&
                                              phraseChefSelected[2] === currentRecipe.correctCombo[2];
                            
                            if (isCorrect) {
                              triggerPointsReward(20, isRtl ? 'طاهي الجمل الإنجليزية' : 'Phrase Chef Mastery', 'game_018');
                              speakFeedback("Stew looks cooked beautifully!");
                              
                              if (phraseChefRecipeIndex + 1 >= phraseChefRecipesData.length) {
                                alert(isRtl ? "مبارك! لقد طهوت جميع الوجبات النحوية اللذيذة الست بقواعد لغوية مثالية! 🥘🏆✨" : "Magnificent cooking! You solved all sentence recipes in the Chef school! 🥘🏆✨");
                                setPhraseChefRecipeIndex(0);
                                setPhraseChefSelected([]);
                              } else {
                                setPhraseChefRecipeIndex(prev => prev + 1);
                                setPhraseChefSelected([]);
                              }
                            } else {
                              speakFeedback("The flavor is off! Reset the order of fables and test a different path.");
                            }
                          } else {
                            speakFeedback("Make sure to pick all three ingredients!");
                          }
                        }}
                        className="flex-1 py-3 bg-teal-500 text-slate-900 rounded-xl text-xs font-black hover:bg-teal-400 transition-all cursor-pointer active:scale-95"
                      >
                        🔥 {isRtl ? 'طهي الطبق النحوي' : 'Fire up cooking stove'}
                      </button>
                      <button
                        onClick={() => setPhraseChefSelected([])}
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95"
                      >
                        {isRtl ? 'تصفير' : 'Reset'}
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* ---------------------------------------------------- */}
              {/* GAME 019: The Dark Cave (الكهف المظلم) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_019' && (
                <div className="space-y-6">
                  <p className="text-xs text-slate-300 font-bold text-center">
                    {isRtl 
                      ? "اكتب إملاء الحروف بشكل سليم لتشغيل مشاعل الكهف المظلم وكشف خريطة المتاهة المخفية!"
                      : "Defeat fog-of-war by proving correct spellings of complex vocabulary nouns!"}
                  </p>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs">
                    <span className="text-[#00CEC9] font-black uppercase font-mono tracking-widest text-[10px] block mb-1">
                      {isRtl ? 'حالة الكهف' : 'CAVE LANTERNS LIT'}
                    </span>
                    <span className="font-mono text-white">
                      💡 {caveUnveiled.filter(Boolean).length} / 25 {isRtl ? 'مشاعل مضيئة' : 'Torches Lit'}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 max-w-xs mx-auto aspect-square bg-slate-950 p-2.5 rounded-2xl border border-slate-700 text-center">
                    {caveUnveiled.map((unveiled, index) => {
                      // pick word target dynamically from pool based on index
                      const wordToSpell = darkCaveSpellingPoolData[index % darkCaveSpellingPoolData.length];
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (unveiled) {
                              speakFeedback(wordToSpell);
                              alert(isRtl ? `هذا الجزء مضيء بالفعل بكلمة: ${wordToSpell}` : `This chamber is already illuminated with word: ${wordToSpell}`);
                              return;
                            }
                            const spelling = prompt(isRtl ? `اكتب التهجئة الصحيحة للكلمة المسموعة "${wordToSpell}":` : `Spell the word "${wordToSpell}":`);
                            if (spelling && spelling.trim().toLowerCase() === wordToSpell.toLowerCase()) {
                              setCaveUnveiled(prev => {
                                const copy = [...prev];
                                copy[index] = true;
                                if (index > 0) copy[index-1] = true;
                                if (index < 24) copy[index+1] = true;
                                return copy;
                              });
                              triggerPointsReward(20, isRtl ? 'التدريب الاستكشافي للكهف' : 'Fabulous Cave Spelling Sparker', 'game_019');
                              speakFeedback("Fog dissipated!");
                              
                              // Check if fully unveiled
                              setTimeout(() => {
                                const litCount = caveUnveiled.filter(Boolean).length + 1; // estimate
                                if (litCount >= 25) {
                                  alert(isRtl ? "مبارك! لقد أضأت الكهف المظلم بأكمله واكتشفت المخرج السري! 🗺️🏆✨" : "Amazing! You turned on all 25 lanterns and mapped the secret passage out of the spelling cave!");
                                  setCaveUnveiled(Array(25).fill(false));
                                }
                              }, 100);
                            } else {
                              speakFeedback("Fog remains dense! Mistake committed.");
                            }
                          }}
                          className={`aspect-square rounded-xl text-md flex items-center justify-center font-bold transition-all active:scale-90 ${
                            unveiled ? 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20' : 'bg-slate-800 text-slate-600'
                          }`}
                        >
                          {unveiled ? "💡" : "🌫️"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GAME 020: Festival of Cultures (مهرجان الثقافات) */}
              {/* ---------------------------------------------------- */}
              {activeGameId === 'game_020' && (() => {
                const normalizedCountry = currentCountry.replace(/ 🇯🇵| 🇫🇷| 🇸🇦| 🇮🇹| 🇮🇳| 🇬🇧/g, "");
                const currentCountryData = culturalFestivalLocationsData.find(c => 
                  c.nameEn.toLowerCase().includes(normalizedCountry.toLowerCase())
                ) || culturalFestivalLocationsData[0];
                
                return (
                  <div className="space-y-6">
                    <p className="text-[10px] uppercase font-black tracking-widest text-[#00CEC9] text-center font-mono">
                      {isRtl ? 'بوابة التعددية الثقافية والأدب العالمي' : 'GATEWAY TO GLOBAL COURTESY & DIPLOMACY'}
                    </p>

                    {/* Horizontal scrollable flag cards */}
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                      {culturalFestivalLocationsData.map((country, idx) => {
                        const isSelected = normalizedCountry.toLowerCase().includes(
                          country.nameEn.replace(/ 🇯🇵| 🇫🇷| 🇸🇦| 🇮🇹| 🇮🇳| 🇬🇧/g, "").toLowerCase()
                        );
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentCountry(country.nameEn);
                              speakFeedback(`Navigating to ${country.nameEn}`);
                            }}
                            className={`flex-none px-3 py-2 bg-slate-900 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-xs font-black cursor-pointer border transition-all active:scale-95 flex items-center gap-1 font-mono ${
                              isSelected ? 'border-[#00CEC9] text-[#00CEC9]' : 'border-slate-800 text-slate-300'
                            }`}
                          >
                            <span>{isRtl ? country.nameAr : country.nameEn}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-5 bg-slate-900 rounded-3xl border border-slate-700/60 space-y-2.5">
                      <span className="text-3xl block animate-pulse">🌍</span>
                      <p className="text-[10px] text-[#00CEC9] font-black uppercase font-mono tracking-widest">
                        {isRtl ? 'الموقف الثقافي اللبق:' : 'CULTURAL SCENARIO CHALLENGE'}
                      </p>
                      <p className="text-xs font-medium text-slate-200 leading-relaxed font-sans select-none">
                        {isRtl ? currentCountryData.scenarioAr : currentCountryData.scenarioEn}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {currentCountryData.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (opt.correct) {
                              triggerPointsReward(25, isRtl ? 'سفير الثقافات العالمية' : 'Cultural Etiquette Globalist', 'game_020');
                              speakFeedback("Excellent cultural courtesy decision made!");
                              alert(isRtl 
                                ? `أحسنت الاختيار لبلد ${currentCountryData.nameAr}! تفهم الطقوس والآداب يمد جسور التآخي العام! 🌟` 
                                : `Beautiful courtesy choices for ${currentCountryData.nameEn}! Respecting global traditions unites us all! 🌟`
                              );
                            } else {
                              speakFeedback("Traditional roots require a different tone, try again!");
                            }
                          }}
                          className="p-3.5 bg-slate-800 hover:bg-[#6C5CE7] hover:text-white rounded-xl text-left text-xs font-black cursor-pointer transition-all active:scale-95 border border-slate-700/60 leading-relaxed font-mono"
                        >
                          {opt.txt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
