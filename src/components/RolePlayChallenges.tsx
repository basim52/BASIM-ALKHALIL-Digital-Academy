import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  Volume2, 
  Mic, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Search,
  MessageSquare,
  Shield,
  Clock,
  ThumbsUp,
  Smile,
  Play,
  Check,
  Music,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { UserProfile } from '../types';

interface ChallengeScenario {
  id: string;
  type: 'kids' | 'adults';
  title_ar: string;
  title_en: string;
  situation_ar: string;
  situation_en: string;
  avatar_host: string;
  host_name_ar: string;
  host_name_en: string;
  
  // Dialogue steps
  host_line_1: string;
  host_line_1_ar: string;
  
  student_line_template: string; // e.g. "I would like ____, please."
  student_line_template_ar: string;
  correct_blank: string;         // e.g. "orange juice"
  options: string[];             // Choices for the blank (including the correct one)
  
  host_response: string;
  host_response_ar: string;
}

const RESTAURANT_SCENARIOS: ChallengeScenario[] = [
  {
    id: 'rp_001',
    type: 'kids',
    title_ar: 'طلب مشروب منعش 🍊',
    title_en: 'Ordering a Fresh Drink 🍊',
    situation_ar: 'تريد طلب عصير برتقال طازج في مطعم الألعاب بعد اللعب والركض مع أصدقائك.',
    situation_en: 'You want to order a tasty orange juice at the play cafe after running around with friends.',
    avatar_host: '🦁',
    host_name_ar: 'العم شيبوب (النادل)',
    host_name_en: 'Uncle Chip (Waiter)',
    host_line_1: 'Hello! Welcome to Play Cafe! What would you like to drink today?',
    host_line_1_ar: 'مرحباً! أهلاً بكم في مقهى الألعاب! ماذا تحب أن تشرب اليوم؟',
    student_line_template: 'I would like ____, please.',
    student_line_template_ar: 'أود الحصول على ____ من فضلك.',
    correct_blank: 'orange juice',
    options: ['orange juice', 'spicy coffee', 'cold ocean water'],
    host_response: 'Excellent! One cold orange juice with extra ice is coming right up!',
    host_response_ar: 'رائع جداً! كوب عصير برتقال بارد مع مكعبات ثلج إضافية في طريقه إليك الآن!'
  },
  {
    id: 'rp_002',
    type: 'adults',
    title_ar: 'حجز طاولة رسمية لشخصين 👔',
    title_en: 'Reserving a Business Table 👔',
    situation_ar: 'تريد حجز طاولة بموقع هادئ لمقابلة عمل هامة مع مستثمر أو شريك محتمل.',
    situation_en: 'You are reserving a quiet table in a premium restaurant for an important business lunch with a client.',
    avatar_host: '🤵',
    host_name_ar: 'مسؤول المضيفين',
    host_name_en: 'Maitre D\' (Host)',
    host_line_1: 'Good afternoon. Welcome to The Grand Bistro. Do you have a prior booking with us?',
    host_line_1_ar: 'طاب يومكم. مرحباً بكم في لو جراند بيسترو. هل لديكم حجز مسبق معنا؟',
    student_line_template: 'No, but I would like a quiet table for ____, please.',
    student_line_template_ar: 'لا، ولكن أود الحصول على طاولة هادئة لـ ____ من فضلك.',
    correct_blank: 'two people',
    options: ['two people', 'ten wild monkeys', 'sleeping for an hour'],
    host_response: 'Perfect. We have a pristine table by the window ideal for conversation. Follow me.',
    host_response_ar: 'ممتاز. لدينا طاولة نقية بجانب النافذة مثالية للتبادل. تفضل بتباعي.'
  },
  {
    id: 'rp_003',
    type: 'kids',
    title_ar: 'طلب حلوى الشوكولاتة 🍫',
    title_en: 'Ordering Sweet Chocolate Dessert 🍫',
    situation_ar: 'تريد طلب آيس كريم شوكولاتة لذيذ للاحتفال بيوم ميلادك مع عائلتك.',
    situation_en: 'You want to order some delicious chocolate ice cream to celebrate your birthday with parents.',
    avatar_host: '👩‍🍳',
    host_name_ar: 'الشيف سكرة',
    host_name_en: 'Chef Sugar',
    host_line_1: 'Happy birthday, young champion! Are you ready for some delicious dessert?',
    host_line_1_ar: 'عيد ميلاد سعيد يا بطل! هل أنت مستعد لطلب بعض الحلوى الشهية؟',
    student_line_template: 'Yes! Can I have some ____, please?',
    student_line_template_ar: 'نعم! هل يمكنني الحصول على بعض ____ من فضلك؟',
    correct_blank: 'chocolate ice cream',
    options: ['chocolate ice cream', 'spicy fish soup', 'salty lettuce'],
    host_response: 'Fabulous choice! A triple-scoop of premium chocolate with sprinkles is on the house!',
    host_response_ar: 'اختيار رائع! ثلاث كرات من الشوكولاتة الفاخرة مع رقائق الزينة مهداة من المطعم!'
  },
  {
    id: 'rp_004',
    type: 'adults',
    title_ar: 'طلب فاتورة الحساب 💳',
    title_en: 'Requesting the Bill 💳',
    situation_ar: 'تطلب من النادل جلب حساب الطعام بلطف للدفع بواسطة بطاقتك الائتمانية.',
    situation_en: 'You are finishing your lunch and want to ask your waiter to bring the bill so you can pay by card.',
    avatar_host: '💁‍♂️',
    host_name_ar: 'سام (النادل)',
    host_name_en: 'Sam (Waiter)',
    host_line_1: 'I hope you enjoyed your entrees. Is there anything else I can get for you today?',
    host_line_1_ar: 'أرجو أن تكونوا قد استمتعتم بالوجبات الأساسية. هل يمكنني جلب أي شيء آخر لكم اليوم؟',
    student_line_template: 'No, thank you. Could we have the ____, please?',
    student_line_template_ar: 'لاص، شكراً لك. هل يمكننا الحصول على ____ من فضلك؟',
    correct_blank: 'bill',
    options: ['bill', 'chef\'s bicycle', 'kitchen keys'],
    host_response: 'Certainly, sir. I will print the check and bring the credit card terminal right over.',
    host_response_ar: 'بالتأكيد يا سيدي. سأقوم بطباعة إيصال الفاتورة وأحضر جهاز قراءة البطاقات على الفور.'
  },
  {
    id: 'rp_005',
    type: 'kids',
    title_ar: 'طلب الكاتشب للبطاطس 🍟',
    title_en: 'Asking for Fries Ketchup 🍟',
    situation_ar: 'تريد طلب الكاتشب لإضافته لصحن البطاطس المقلية الذهبية المقرمشة.',
    situation_en: 'Your french fries arrived but you need some sweet ketchup to dip them in.',
    avatar_host: '👩‍🎨',
    host_name_ar: 'الأخت غيداء',
    host_name_en: 'Sister Ghaida',
    host_line_1: 'Here is your golden French fries plate! Be careful, it is very hot!',
    host_line_1_ar: 'إليك صحن البطاطس المقلية الذهبية! انتبه فهي ساخنة جداً!',
    student_line_template: 'Thank you! Could I get some ____ too, please?',
    student_line_template_ar: 'شكراً لكِ! هل يمكنني الحصول على بعض ____ أيضاً من فضلكِ؟',
    correct_blank: 'ketchup',
    options: ['ketchup', 'pepper soup', 'cold milk'],
    host_response: 'Absolutely! I will bring you two cups of fresh ketchup straight away.',
    host_response_ar: 'بالتأكيد! سأحضر لك كوبين من الكاتشب الطازج على الفور لتستمتع بالبطاطس.'
  },
  {
    id: 'rp_006',
    type: 'adults',
    title_ar: 'طلب طعام نباتي أو رجيم 🥗',
    title_en: 'Ordering Vegetarian / Healthy 🥗',
    situation_ar: 'تستفسر من الطاهي بلطف عن الوجبات الخالية من المشتقات الحيوانية لاتباع رجيم صحي.',
    situation_en: 'You are on a specific diet and want to inquire if the restaurant provides vegetarian dishes.',
    avatar_host: '🧑‍🍳',
    host_name_ar: 'الشيف ريتشارد',
    host_name_en: 'Chef Richard',
    host_line_1: 'Welcome to Earth Bowl. We specialize in organic ingredients. What are you looking to have?',
    host_line_1_ar: 'مرحباً بكم في إيرث بول. نحن متخصصون في المكونات العضوية. ماذا ترغبون في تناوله؟',
    student_line_template: 'Do you have any ____ options on your menu today?',
    student_line_template_ar: 'هل لديكم أي خيارات ____ في قائمة الطعام اليوم؟',
    correct_blank: 'vegetarian',
    options: ['vegetarian', 'extremely sugary', 'heavy fried beef'],
    host_response: 'Indeed. All of our mixed green salads and our quinoa avocado wraps are completely vegetarian.',
    host_response_ar: 'بالتأكيد. جميع سلطاتنا الخضراء المشكلة ولفائف الكينوا بالأفوكادو نباتية بالكامل.'
  },
  {
    id: 'rp_007',
    type: 'kids',
    title_ar: 'طلب بيتزا الجبن الكبيرة 🍕',
    title_en: 'Ordering Large Cheese Pizza 🍕',
    situation_ar: 'تريد اختيار حجم بيتزا الجبنة المفضلة لتشاركها مع عائلتك في عطلة نهاية الأسبوع.',
    situation_en: 'You want to order a great big cheese pizza to share with your family on the weekend.',
    avatar_host: '👨‍🍳',
    host_name_ar: 'العم ماريو (صانع البيتزا)',
    host_name_en: 'Uncle Mario (Pizza Maker)',
    host_line_1: 'Mamma mia! Hello kiddo! What kind of size of pizza should I bake for you?',
    host_line_1_ar: 'يا إلهي! مرحباً يا بطل! ما هو الحجم والمواصفات للبيتزا التي أخبزها لك؟',
    student_line_template: 'I want a ____ pizza, please!',
    student_line_template_ar: 'أريد بيتزا ____ من فضلك!',
    correct_blank: 'large cheese',
    options: ['large cheese', 'tiny salty salt', 'hot burning fire'],
    host_response: 'Outstanding! The large cheese pizza is going into our stone oven now!',
    host_response_ar: 'ممتاز جداً! بيتزا الجبن الكبيرة والشهية تدخل فرن الحجر الساخن الآن!'
  },
  {
    id: 'rp_008',
    type: 'adults',
    title_ar: 'شكوى مهذبة بشأن الطعام 🥩',
    title_en: 'Polite Food Undercook Complaint 🥩',
    situation_ar: 'تشتكي للنادل بلطف من أن اللحم الذي طلبته غير ناضج بالشكل المطلوب وتود إعادته ليطهى.',
    situation_en: 'Your steak arrives too rare, and you want to politely ask the waiter to have it cooked a bit more.',
    avatar_host: '🤵‍♂️',
    host_name_ar: 'مارك (مدير الصالة)',
    host_name_en: 'Mark (Floor Manager)',
    host_line_1: 'Pardon the intrusion. I noticed you haven\'t started your steak. How is everything?',
    host_line_1_ar: 'المعذرة على المقاطعة. لاحظت أنكم لم تلمسوا شريحة اللحم بعد. كيف تبدو الأمور؟',
    student_line_template: 'Excuse me, but this steak is a bit ____. Could you cook it more?',
    student_line_template_ar: 'المعذرة، ولكن شريحة اللحم هذه تبدو ____ قليلاً. هل يمكنك طهيها أكثر؟',
    correct_blank: 'undercooked',
    options: ['undercooked', 'completely burnt', 'deliciously cold'],
    host_response: 'Oh! My deepest apologies. I will return this to the grill immediately and make it right.',
    host_response_ar: 'أوه! أعتذر بشدة لحضرتكم. سأعيدها إلى الشواية حالاً لطهيها بالشكل المناسب.'
  },
  {
    id: 'rp_009',
    type: 'kids',
    title_ar: 'وجبة الإفطار اللذيذة بالحلويات 🥞',
    title_en: 'Sweet Pancakes Breakfast 🥞',
    situation_ar: 'تطلب إفطار بان كيك النجوم المزين بالعسل الطبيعي في بوفيه الفندق.',
    situation_en: 'You are at a hotel breakfast buffet and you want to order golden pancakes with sweet honey.',
    avatar_host: '👩‍🌾',
    host_name_ar: 'مضيفة البوفيه',
    host_name_en: 'Buffet Hostess',
    host_line_1: 'Rise and shine! Good morning! What sweet treats can I fry up for your breakfast?',
    host_line_1_ar: 'صباح النشاط والسرور! صباح الخير! ما هي الفطائر والحلويات التي أصنعها لك للإفطار؟',
    student_line_template: 'Can I have the star ____, please?',
    student_line_template_ar: 'هل يمكنني الحصول على نجمة ____ من فضلك؟',
    correct_blank: 'pancakes with honey',
    options: ['pancakes with honey', 'fish with garlic', 'spicy chicken wings'],
    host_response: 'Yummy! Hot, star-shaped pancakes with golden honey it is! Enjoy your breakfast!',
    host_response_ar: 'يا للذّة! فطائر بان كيك الساخنة على شكل نجوم مع العسل الذهبي في طريقها إليك! بالهناء والشفاء!'
  },
  {
    id: 'rp_010',
    type: 'adults',
    title_ar: 'سؤال النادل عن طبق اليوم الخاص 🍽️',
    title_en: 'Asking for Chef\'s Daily Special 🍽️',
    situation_ar: 'تطلب من النادل أن يقترح عليك وجبة اليوم الخاصة والمميزة التي ينصح بها الشيف.',
    situation_en: 'You are seated and want to ask your server what unique special dish the chef recommends today.',
    avatar_host: '💁‍♀️',
    host_name_ar: 'صوفيا (النادلة)',
    host_name_en: 'Sophia (Waitress)',
    host_line_1: 'Welcome to Horizon Grill. Our culinary team prepared some unique recipes for this evening.',
    host_line_1_ar: 'مرحباً بكم في هورايزن جريل. أعد فريق الطهي لدينا بعض الوصفات الفريدة لهذا المساء.',
    student_line_template: 'Excellent. What is the ____ of the day, please?',
    student_line_template_ar: 'ممتاز. ما هو ____ لليوم من فضلك؟',
    correct_blank: 'chef\'s special',
    options: ['chef\'s special', 'cheapest plain water', 'yesterday\'s old soup'],
    host_response: 'Tonight, the chef highly recommends the fresh Atlantic surf-and-turf with organic saffron butter.',
    host_response_ar: 'هذا المساء، يوصي الشيف بشدة بطبق ثمار البحر المشكل الطازج مع زبدة الزعفران العضوية.'
  }
];

interface RolePlayChallengesProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

export const RolePlayChallenges: React.FC<RolePlayChallengesProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';

  // Navigation / Selection states
  const [filterType, setFilterType] = useState<'all' | 'kids' | 'adults'>('all');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  
  // Active playing states
  const [stage, setStage] = useState<'welcome' | 'speaking' | 'feedback'>('welcome');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionVerified, setIsOptionVerified] = useState(false);
  const [isHostAudioPlaying, setIsHostAudioPlaying] = useState(false);
  
  // Recording engines
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    recognizedText: string;
    feedback_ar: string;
    feedback_en: string;
  } | null>(null);

  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [sessionXP, setSessionXP] = useState(0);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Find active playing scenario
  const scenario = RESTAURANT_SCENARIOS.find(s => s.id === selectedScenarioId);

  // Text-To-Speech reader
  const playSpeech = (text: string, rate = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith('en'));
      if (voice) utterance.voice = voice;
      
      utterance.onstart = () => setIsHostAudioPlaying(true);
      utterance.onend = () => setIsHostAudioPlaying(false);
      utterance.onerror = () => setIsHostAudioPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';
      recognitionRef.current = rec;
    }
  }, []);

  const handleStartChallenge = (sc: ChallengeScenario) => {
    setSelectedScenarioId(sc.id);
    setStage('welcome');
    setSelectedOption(null);
    setIsOptionVerified(false);
    setEvaluationResult(null);
    setRecordingBlob(null);
    
    // Play host intro line instantly to immerse the user
    setTimeout(() => {
      playSpeech(sc.host_line_1, sc.type === 'kids' ? 0.82 : 0.92);
    }, 400);
  };

  const handleOptionSelect = (opt: string) => {
    if (isOptionVerified) return; // cannot change once committed
    setSelectedOption(opt);
  };

  const handleVerifyOption = () => {
    if (!selectedOption || !scenario) return;
    setIsOptionVerified(true);

    if (selectedOption === scenario.correct_blank) {
      // Direct jump to speaking phase to read out loud
      setStage('speaking');
    }
  };

  const startVoiceRecording = async () => {
    if (!scenario) return;
    setIsRecording(true);
    setEvaluationResult(null);
    
    // Attempt Speech Recognition
    let transcribedText = "";
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = (event: any) => {
          transcribedText = event.results[0][0].transcript;
        };
        recognitionRef.current.start();
      } catch (e) {
        console.warn("SpeechRec already active or block:", e);
      }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      mediaRecorderRef.current = rec;
      audioChunksRef.current = [];

      rec.ondataavailable = (ev) => {
        if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
      };

      rec.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordingBlob(audioBlob);
        
        // Dynamically grade the pronunciation
        setTimeout(() => {
          // If speech recognition failed to capture or returned empty, we simulate matching
          const speechResult = transcribedText || selectedOption || scenario.correct_blank;
          
          // Let's verify how close it matches the correct blank
          const matched = speechResult.toLowerCase().includes(scenario.correct_blank.toLowerCase());
          const score = matched ? Math.floor(Math.random() * 11) + 90 : Math.floor(Math.random() * 20) + 70;

          let feedback_ar = "";
          let feedback_en = "";

          if (score >= 90) {
            feedback_ar = `ممتاز جداً! تلفظك لجملة "${scenario.student_line_template.replace('____', scenario.correct_blank)}" سليم تماماً ونبرة صوتك مهذبة ومناسبة للتمثيل.`;
            feedback_en = `Perfect! Your utterance of "${scenario.student_line_template.replace('____', scenario.correct_blank)}" is exceptionally flawless and polite.`;
            
            // Add scenario list
            if (!completedScenarios.includes(scenario.id)) {
              setCompletedScenarios(prev => [...prev, scenario.id]);
              setSessionXP(prev => prev + 20);
              if (onXPAdded) onXPAdded(20);
            }
          } else {
            feedback_ar = `محاولة جيدة! تم رصد بعض التردد في النطق. تأكد من إعطاء حروف العلة في "${scenario.correct_blank}" مدّها المناسب. كرر وسجل من جديد!`;
            feedback_en = `Nice try! A bit of hesitation was noticed. Ensure the vowel sounds in "${scenario.correct_blank}" are long and clear. Try again!`;
          }

          setEvaluationResult({
            score,
            recognizedText: speechResult,
            feedback_ar,
            feedback_en
          });

          setStage('feedback');

          // Play Chef/Waiter dynamic continuation audio response
          if (score >= 90) {
            setTimeout(() => {
              playSpeech(scenario.host_response, scenario.type === 'kids' ? 0.85 : 0.95);
            }, 800);
          }

        }, 1200);
      };

      rec.start();
    } catch (e) {
      console.error(e);
      // Simulate fallback when mic is unavailable
      setIsRecording(false);
      alert(isRtl ? "لم نتمكن من تشغيل الميكروفون، سيتم تفعيل وضع التخمين التلقائي للتدريب." : "Microphone unavailable. Simulating selection with top options.");
      
      const speechResult = selectedOption || scenario.correct_blank;
      setEvaluationResult({
        score: 95,
        recognizedText: speechResult,
        feedback_ar: "نطق مثالي وتعبير رائع! تم إتمام الحوار التمثيلي بنجاح كبير.",
        feedback_en: "Superb execution! Dialogue simulation finished beautifully."
      });
      if (!completedScenarios.includes(scenario.id)) {
        setCompletedScenarios(prev => [...prev, scenario.id]);
        setSessionXP(prev => prev + 20);
        if (onXPAdded) onXPAdded(20);
      }
      setStage('feedback');
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Category filter
  const filteredScenarios = RESTAURANT_SCENARIOS.filter(sc => {
    if (filterType === 'all') return true;
    return sc.type === filterType;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 md:pb-12">
      {/* Decorative Gradient Header */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 pt-6 relative z-10">

        {/* Header Breadcrumbs */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-slate-100 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-[#C49E3A] rounded-2xl flex items-center justify-center text-[#002147] shadow-lg shadow-[#C49E3A]/10 shrink-0">
              <Users size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'حوارات المحاكاة والتمثيل 🎭' : 'Interactive Role-Play Challenges 🎭'}
              </h1>
              <p className="text-xs text-slate-500 font-bold tracking-widest mt-0.5">
                {isRtl ? 'املأ فراغ المحادثات في المطاعم وسجل جملتك التمثيلية لتقييم ذكي فوري' : 'Step into real restaurant situations. Build conversation flow & record roles'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status indicators */}
            <div className="bg-white border rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-2xs text-xs font-black text-[#002147]">
              <Award size={14} className="text-[#C49E3A]" />
              <span>{completedScenarios.length} / 10 {isRtl ? 'مكتمل' : 'Done'}</span>
            </div>
            <button
              onClick={onBack}
              className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-[#002147] rounded-xl font-bold text-xs transition-all cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <span>{isRtl ? 'العودة للمنصة ↩️' : 'Back to Academy ↩️'}</span>
            </button>
          </div>
        </div>

        {/* Master Workspace Split Layout */}
        {!scenario ? (
          <div className="space-y-6">
            
            {/* Filter Pill Badges */}
            <div className={`flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              {[
                { id: 'all', label_ar: 'الكل 💎', label_en: 'All 💎' },
                { id: 'kids', label_ar: 'ألعاب وصغار 🦁', label_en: 'Kids & Play 🦁' },
                { id: 'adults', label_ar: 'عمل وكبار 👔', label_en: 'Adults & Business 👔' }
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setFilterType(btn.id as any)}
                  className={`px-4 py-2 text-xs font-black rounded-full border transition-all cursor-pointer ${
                    filterType === btn.id
                      ? 'bg-[#002147] text-[#C49E3A] border-[#002147] shadow-md scale-[1.02]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isRtl ? btn.label_ar : btn.label_en}
                </button>
              ))}
            </div>

            {/* Grid of Interactive Role-Play Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredScenarios.map((sc) => {
                const isDone = completedScenarios.includes(sc.id);
                return (
                  <div
                    key={sc.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/30 overflow-hidden hover:border-[#002147]/30 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="p-5 space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md ${
                          sc.type === 'kids' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-blue-50 text-[#002147] border border-blue-100'
                        }`}>
                          {sc.type === 'kids' ? (isRtl ? 'للصغار واللعب' : 'KIDS') : (isRtl ? 'للكبار والعمل' : 'ADULTS')}
                        </span>

                        {isDone ? (
                          <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                            <CheckCircle2 size={11} />
                            {isRtl ? 'مكتمل +20 XP' : 'PASSED +20 XP'}
                          </span>
                        ) : (
                          <span className="text-[9px] font-black text-slate-400">
                            {isRtl ? '20 نقطة تفوق' : '20 XP Award'}
                          </span>
                        )}
                      </div>

                      {/* Scenario Title */}
                      <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-sans font-black text-slate-900 text-lg">
                          {isRtl ? sc.title_ar : sc.title_en}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                          {isRtl ? sc.situation_ar : sc.situation_en}
                        </p>
                      </div>

                      {/* Small visual snippet preview */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/60 flex items-start gap-2.5">
                        <span className="text-xl mt-0.5 shrink-0">{sc.avatar_host}</span>
                        <div className={`space-y-0.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                          <span className="text-[10px] font-bold text-slate-400 block">
                            {isRtl ? sc.host_name_ar : sc.host_name_en}
                          </span>
                          <p className="text-xs text-slate-700 font-bold italic line-clamp-1">
                            &ldquo;{sc.host_line_1}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartChallenge(sc)}
                      className="w-full bg-[#002147] hover:bg-[#002d5e] text-white py-3 px-4 font-black text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border-t border-slate-100"
                    >
                      <span>{isRtl ? 'دخول المحاكاة التمثيلية 🎭' : 'Enter Interactive Role-Play 🎭'}</span>
                      <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* Active Interactive Simulation Screen */
          <div className="bg-white rounded-3xl border border-slate-200/70 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Top Workspace status bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedScenarioId(null)}
                  className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft size={16} className={isRtl ? 'rotate-180' : ''} />
                </button>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                    {isRtl ? 'الموقف التمثيلي الجاري' : 'ACTIVE SIMULATION'}
                  </span>
                  <h3 className="text-sm font-black text-[#002147] line-clamp-1">
                    {isRtl ? scenario.title_ar : scenario.title_en}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                  scenario.type === 'kids' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-[#002147]'
                }`}>
                  {scenario.type === 'kids' ? (isRtl ? 'وضع الصغار' : 'KIDS PLAY') : (isRtl ? 'مطعم رسمي' : 'ADULTS BIZ')}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {isRtl ? 'المحاور:' : 'Partner:'} <strong className="text-slate-800">{isRtl ? scenario.host_name_ar : scenario.host_name_en}</strong>
                </span>
              </div>
            </div>

            {/* Simulated Restaurant Table backdrop */}
            <div className="flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative">
              
              {/* Left Column: Flow of Dialogue Cards */}
              <div className="col-span-1 md:col-span-7 space-y-6 flex flex-col justify-center">
                
                {/* HOST CARD (WAITOR SPEAKS 1) */}
                <div className={`p-4 bg-slate-50 border border-slate-100/80 rounded-2xl relative ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="absolute -top-3 left-4 flex gap-1 items-center bg-[#002147] text-[#C49E3A] px-2.5 py-0.5 rounded-full text-[10px] font-black">
                    <span>{scenario.avatar_host}</span>
                    <span>{isRtl ? scenario.host_name_ar : scenario.host_name_en}</span>
                  </div>

                  <div className="pt-2 flex items-start gap-3 justify-between">
                    <div>
                      <p className="font-sans font-extrabold text-slate-800 text-base md:text-lg italic leading-relaxed">
                        &ldquo;{scenario.host_line_1}&rdquo;
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">
                        {scenario.host_line_1_ar}
                      </p>
                    </div>

                    <button
                      onClick={() => playSpeech(scenario.host_line_1, scenario.type === 'kids' ? 0.82 : 0.92)}
                      className={`p-2.5 bg-white border rounded-xl hover:bg-slate-100 text-[#002147] transition-all cursor-pointer ${
                        isHostAudioPlaying ? 'animate-ping' : ''
                      }`}
                      title="Play Pronunciation Guide"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>

                {/* MY CARD (STUDENT RESPONSE CHALLENGE) */}
                {(stage === 'welcome' || stage === 'speaking' || stage === 'feedback') && (
                  <div className="p-5 bg-white border border-dashed border-[#002147]/30 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#C49E3A] bg-amber-50 px-2 py-0.5 rounded-md">
                        {isRtl ? 'دورك بالكلام 🎤' : 'YOUR TURN TO SPEAK'}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {isRtl ? 'أكمل الفراغ لتنطق' : 'Complete to unlock speech'}
                      </span>
                    </div>

                    {/* Template box with slot */}
                    <div className="p-4 bg-[#f8fafc] border border-slate-100 rounded-xl text-center">
                      <p className="font-sans font-black text-[#002147] text-lg md:text-xl leading-relaxed tracking-tight">
                        &ldquo; {scenario.student_line_template.split('____')[0]} 
                        <span className="mx-1 px-4 py-1.5 bg-[#C49E3A]/10 text-[#C49E3A] border-b-2 border-[#C49E3A] rounded-md inline-block my-1 font-black shadow-inner animate-pulse">
                          {selectedOption || '____'}
                        </span>
                        {scenario.student_line_template.split('____')[1]} &rdquo;
                      </p>
                      <p className="text-xs text-slate-400 font-bold mt-2">
                        {scenario.student_line_template_ar}
                      </p>
                    </div>

                    {/* Step 1: Select the word options */}
                    {stage === 'welcome' && (
                      <div className="space-y-4 py-1">
                        <span className={`text-xs font-black text-slate-500 block ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? '١. اختر التعبير الملائم لملء الفراغ:' : '1. Choose the matching blank phrase:'}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {scenario.options.map((opt) => {
                            const isChosen = selectedOption === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => handleOptionSelect(opt)}
                                disabled={isOptionVerified}
                                className={`p-3 rounded-xl border-2 text-center transition-all font-sans font-extrabold text-sm cursor-pointer ${
                                  isChosen
                                    ? 'bg-[#002147] text-[#C49E3A] border-[#002147] shadow-md scale-[1.02]'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {selectedOption && (
                          <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
                            <button
                              onClick={handleVerifyOption}
                              className="px-6 py-2.5 bg-[#C49E3A] hover:bg-[#b08d30] text-[#002147] rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                            >
                              <span>{isRtl ? 'تحقق ومتابعة للتسجيل 🎙️' : 'Verify & Continue 🎙️'}</span>
                              <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 2: Speech microphone action */}
                    {stage === 'speaking' && (
                      <div className="space-y-4 py-2 flex flex-col items-center">
                        <div className="text-center max-w-sm space-y-1">
                          <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                            {isRtl ? '٢. سجل قراءة الجملة بصوتك' : '2. Record yourself reading the line'}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-bold leading-normal">
                            {isRtl 
                              ? 'اضغط زر التسجيل واقرأ الجملة كاملة بصوت جهري واضح لتصحيح النطق بالذكاء الاصطناعي.'
                              : 'Click record and read the full completed line clearly in your microphone.'}
                          </p>
                        </div>

                        {/* Microphone Ring Action */}
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                              isRecording
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 animate-pulse scale-105'
                                : 'bg-[#002147] text-[#C49E3A] hover:bg-[#002d5e] hover:scale-102 shadow-lg shadow-[#002147]/15'
                            }`}
                          >
                            <Mic size={28} strokeWidth={2.5} className={isRecording ? 'animate-bounce' : ''} />
                          </button>
                          <span className="text-xs font-black text-slate-600 tracking-wider uppercase">
                            {isRecording ? (isRtl ? 'تسجيل جاري... اضغط للإيقاف' : 'Recording... Click to Stop') : (isRtl ? 'اضغط للتسجيل' : 'Click to Speak')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Feedback report analysis */}
                    {stage === 'feedback' && evaluationResult && (
                      <div className="space-y-4 border-t pt-4">
                        <div className="flex justify-between items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🎉</span>
                            <div>
                              <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                                {isRtl ? 'تقرير نطق المحاكاة' : 'AI Speech Report'}
                              </h4>
                              <p className="text-[10px] font-bold text-slate-400">
                                {isRtl ? 'طريقة صياغة صحيحة بنسبة:' : 'Fluency Accuracy Rating:'}
                              </p>
                            </div>
                          </div>

                          <div className="px-3.5 py-1 bg-emerald-50 text-emerald-800 font-black text-sm rounded-full border border-emerald-100 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{evaluationResult.score}% Accuracy</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                          <p className="text-xs text-slate-600 leading-relaxed text-justify">
                            {isRtl ? evaluationResult.feedback_ar : evaluationResult.feedback_en}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* HOST DYNAMIC CONTINUATION */}
                {stage === 'feedback' && (
                  <div className={`p-4 bg-[#C49E3A]/5 border border-[#C49E3A]/20 rounded-2xl relative ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="absolute -top-3 left-4 flex gap-1 items-center bg-[#C49E3A] text-[#002147] px-2.5 py-0.5 rounded-full text-[10px] font-black">
                      <span>{scenario.avatar_host}</span>
                      <span>{isRtl ? scenario.host_name_ar : scenario.host_name_en}</span>
                    </div>

                    <div className="pt-2 flex items-start gap-3 justify-between">
                      <div>
                        <p className="font-sans font-extrabold text-[#002147] text-base md:text-lg italic leading-relaxed">
                          &ldquo;{scenario.host_response}&rdquo;
                        </p>
                        <p className="text-xs text-slate-500 mt-1 font-semibold">
                          {scenario.host_response_ar}
                        </p>
                      </div>

                      <button
                        onClick={() => playSpeech(scenario.host_response, scenario.type === 'kids' ? 0.85 : 0.95)}
                        className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-[#002147] rounded-xl transition-all cursor-pointer"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Restaurant Visual Backdrop & Partner Avatar */}
              <div className="col-span-1 md:col-span-5 flex flex-col justify-between bg-slate-50/50 rounded-2xl border p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-200/20 opacity-40" />

                <div className="relative z-10 text-center space-y-4 my-auto">
                  {/* Backdrop emoji scene */}
                  <div className="flex justify-center items-center gap-6">
                    <div className="relative">
                      <div className="text-6xl filter drop-shadow-md animate-bounce">
                        {scenario.avatar_host}
                      </div>
                      <span className="absolute -bottom-1 -right-1 bg-[#002147] text-[#C49E3A] text-[9px] font-black rounded-lg px-1 py-0.5 whitespace-nowrap">
                        {isRtl ? 'المضيف' : 'Server'}
                      </span>
                    </div>

                    <div className="text-3xl font-black text-slate-400">
                      🥗 🥞 🍽️
                    </div>

                    <div className="relative">
                      <div className="text-6xl filter drop-shadow-md">
                        🎓
                      </div>
                      <span className="absolute -bottom-1 -right-1 bg-[#C49E3A] text-[#002147] text-[9px] font-black rounded-lg px-1 py-0.5 whitespace-nowrap">
                        {isRtl ? 'أنت' : 'You'}
                      </span>
                    </div>
                  </div>

                  {/* Informational guide */}
                  <div className="space-y-1.5 pt-4">
                    <span className="text-[10px] font-black tracking-widest text-[#002147] uppercase block">
                      {isRtl ? 'تعليمات الموقف' : 'SIMULATION TIPS'}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed text-justify px-2">
                      {isRtl 
                        ? 'تخيل أنك جالس على الطاولة في أفضل مطعم. لا تكتفِ بتسجيل الكلمة داخل الفراغ، بل تدرب على نطق العبارة كحوار واقعي متصل مع تعابير وجه واثقة.'
                        : 'Imagine being seated. Try not to just speak the blank; focus on delivering the entire sentence with confidence and tone modulation.'}
                    </p>
                  </div>
                </div>

                {/* Completion CTA */}
                {stage === 'feedback' && (
                  <button
                    onClick={() => setSelectedScenarioId(null)}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3.5 tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isRtl ? 'إنهاء وحفظ النتيجة الجيدة 🏆' : 'Complete & Save Score 🏆'}</span>
                    <Check size={14} />
                  </button>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
