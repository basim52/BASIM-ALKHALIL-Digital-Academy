import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Award,
  Play,
  Flame,
  Compass,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface RolePlayScenario {
  id: string;
  badge: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  roleSaraAr: string;
  roleSaraEn: string;
  roleStudentAr: string;
  roleStudentEn: string;
  location: string;
  missionsAr: string[];
  missionsEn: string[];
  openingLine: string;
  starterPrompts: string[];
}

export const ROLE_PLAY_SCENARIOS: RolePlayScenario[] = [
  {
    id: 'airport',
    badge: '✈️',
    titleAr: 'في المطار ومراقبة الجوازات',
    titleEn: 'Airport Passport Control',
    descAr: 'تحدث مع ضابطة الجوازات في مطار هيثرو الدولي لإتمام إجراءات الوصول بسلاسة وثقة.',
    descEn: 'Converse with the passport officer at Heathrow to complete your entry smoothly.',
    roleSaraAr: 'ضابطة الجوازات 👮‍♀️',
    roleSaraEn: 'Passport Officer 👮‍♀️',
    roleStudentAr: 'المسافر 🧳',
    roleStudentEn: 'Traveler 🧳',
    location: 'London Heathrow Terminal 5',
    missionsAr: [
      'إلقاء التحية وإبراز جواز السفر',
      'توضيح سبب الزيارة (سياحة أو دراسة)',
      'تحديد مدة الإقامة المقررة'
    ],
    missionsEn: [
      'Greet and present your passport',
      'Explain your visit purpose (tourism or study)',
      'State how long you will stay'
    ],
    openingLine: "Good morning! Welcome to London Heathrow. May I see your passport and landing card, please?",
    starterPrompts: [
      "Good morning! Here is my passport.",
      "I am visiting London for tourism and English study.",
      "I will be staying here for two weeks."
    ]
  },
  {
    id: 'cafe',
    badge: '☕',
    titleAr: 'في المقهى وطلب الطعام',
    titleEn: 'At the Café & Ordering',
    descAr: 'اطلب مشروبك المفضل ووجبتك الخفيفة بلباقة إنجليزية راقية وادفع الحساب.',
    descEn: 'Order your favorite drink and snack with authentic English etiquette.',
    roleSaraAr: 'مقدمة الطلبات الودودة ☕',
    roleSaraEn: 'Friendly Barista ☕',
    roleStudentAr: 'الزبون 🥐',
    roleStudentEn: 'Customer 🥐',
    location: 'Oxford Street Artisan Café',
    missionsAr: [
      'طلب مشروبك مع تحديد الحجم (Small/Medium/Large)',
      'السؤال عن وجبة خفيفة طازجة (Pastry or Snack)',
      'طلب الحساب والدفع بالبطاقة أو نقداً'
    ],
    missionsEn: [
      'Order a drink specifying size',
      'Ask about a fresh snack or pastry',
      'Ask for the bill and payment method'
    ],
    openingLine: "Hello there! Welcome to Oxford Café. What can I get freshly made for you today?",
    starterPrompts: [
      "Could I please have a medium cappuccino with oat milk?",
      "Do you have fresh croissants or muffins?",
      "How much is that? Can I pay by card?"
    ]
  },
  {
    id: 'school',
    badge: '🏫',
    titleAr: 'أول يوم في المدرسة وتكوين صداقات',
    titleEn: 'First Day at School',
    descAr: 'عرف بنفسك لزميلتك الجديدة في الصف، وتحدث عن هواياتك واسأل عن مرافق المدرسة.',
    descEn: 'Introduce yourself to your new classmate, share your hobbies and locate your classes.',
    roleSaraAr: 'زميلة الصف الودودة 🎒',
    roleSaraEn: 'Helpful Classmate 🎒',
    roleStudentAr: 'طالب جديد 📚',
    roleStudentEn: 'New Student 📚',
    location: 'Basim Alkhalil International Academy',
    missionsAr: [
      'التعريف بنفسك وهوايتك المفضلة',
      'السؤال عن موقع معمل الإنجليزية والمكتبة',
      'اقتراح تناول الغداء أو الجلوس معاً'
    ],
    missionsEn: [
      'Introduce your name and favorite hobby',
      'Ask where the English lab or library is',
      'Suggest having lunch or sitting together'
    ],
    openingLine: "Hi there! I haven't seen you before. Are you the new student joining our English class today?",
    starterPrompts: [
      "Hi! Yes, my name is ... and I love learning languages.",
      "Could you show me where the English lab is located?",
      "Would you like to sit together during the break?"
    ]
  },
  {
    id: 'hotel',
    badge: '🏨',
    titleAr: 'حجز الفندق والاستقبال',
    titleEn: 'Hotel Check-In',
    descAr: 'أكّد حجزك في الفندق، واستفسر عن وجبة الإفطار وكلمة سر الواي فاي واستلم مفتاح غرفتك.',
    descEn: 'Confirm your room reservation, ask about breakfast & WiFi, and get your keycard.',
    roleSaraAr: 'موظفة الاستقبال 🏨',
    roleSaraEn: 'Hotel Receptionist 🏨',
    roleStudentAr: 'النزيل 🗝️',
    roleStudentEn: 'Hotel Guest 🗝️',
    location: 'The Royal Grand Hotel',
    missionsAr: [
      'تأكيد حجز الغرفة بذكر اسمك',
      'السؤال عن موعد الإفطار وكلمة سر الإنترنت',
      'استلام مفتاح الغرفة والسؤال عن المصعد'
    ],
    missionsEn: [
      'Confirm reservation by name',
      'Ask about breakfast time & WiFi password',
      'Collect room keycard and ask for elevator'
    ],
    openingLine: "Good afternoon! Welcome to The Royal Grand Hotel. Are you checking in with us today?",
    starterPrompts: [
      "Good afternoon! Yes, I have a reservation under my name.",
      "What time is breakfast served, and what is the WiFi password?",
      "Thank you! Which floor is my room on and where is the elevator?"
    ]
  },
  {
    id: 'shopping',
    badge: '🛍️',
    titleAr: 'التسوق وشراء الملابس',
    titleEn: 'Shopping & Fashion Store',
    descAr: 'ابحث عن المقاس واللون المناسب، واستفسر عن غرفة القياس والعروض الخاصة.',
    descEn: 'Find your size and color, ask for the fitting room and inquire about sales.',
    roleSaraAr: 'مساعدة المتجر الذكية 👗',
    roleSaraEn: 'Store Assistant 👗',
    roleStudentAr: 'المتسوق 🛍️',
    roleStudentEn: 'Shopper 🛍️',
    location: 'Central London Fashion Store',
    missionsAr: [
      'السؤال عن مقاس ولون محدد للملابس',
      'الاستفسار عن موقع غرفة القياس (Fitting Room)',
      'السؤال عن وجود خصم أو عرض خاص'
    ],
    missionsEn: [
      'Ask for specific size and color',
      'Ask where the fitting room is located',
      'Inquire about discounts or sales'
    ],
    openingLine: "Hello! Welcome to our store. Can I help you find anything special today?",
    starterPrompts: [
      "Hello! Do you have this jacket in medium size and blue color?",
      "Where are the fitting rooms so I can try it on?",
      "Is there any discount or student sale on this item?"
    ]
  },
  {
    id: 'doctor',
    badge: '🩺',
    titleAr: 'عند الطبيب ووصف الأعراض',
    titleEn: 'At the Clinic & Health',
    descAr: 'صف الأعراض التي تشعر بها بدقة للطبيبة، واستفسر عن الجرعة الدوائية والراحة المطلوبة.',
    descEn: 'Describe your symptoms clearly, ask about dosage, medicine, and needed rest.',
    roleSaraAr: 'الطبيبة الاستشارية سارة 👩‍⚕️',
    roleSaraEn: 'Doctor Sara 👩‍⚕️',
    roleStudentAr: 'المريض 🤒',
    roleStudentEn: 'Patient 🤒',
    location: 'Harley Street Medical Center',
    missionsAr: [
      'وصف الأعراض التي تشعر بها (صداع، حرارة، ألم)',
      'تحديد المدة التي تعاني منها من التعب',
      'السؤال عن الدواء وموعد تناوله'
    ],
    missionsEn: [
      'Describe symptoms (headache, fever, pain)',
      'State how long you have been feeling sick',
      'Ask about medicine dosage and timing'
    ],
    openingLine: "Good morning! Come in and have a seat. What seems to be the problem today?",
    starterPrompts: [
      "Good morning doctor. I have had a severe headache and sore throat for two days.",
      "I also feel feverish and dizzy when I stand up.",
      "How many times a day should I take this medication?"
    ]
  },
  {
    id: 'interview',
    badge: '💼',
    titleAr: 'مقابلة عمل رسمية',
    titleEn: 'Professional Job Interview',
    descAr: 'قدّم نبذة عن خبراتك ونقاط قوتك، وأجب عن أسئلة المقابلة بثقة وطلاقة مهنية.',
    descEn: 'Introduce your background, strengths, and answer interview questions with confidence.',
    roleSaraAr: 'مديرة التوظيف والمقابلات 👔',
    roleSaraEn: 'Hiring Manager 👔',
    roleStudentAr: 'المتقدم للوظيفة 🎓',
    roleStudentEn: 'Job Applicant 🎓',
    location: 'Tech Hub Global Headquarters',
    missionsAr: [
      'التعريف بنفسك ومسارك الأكاديمي أو المهني',
      'ذكر نقطتي قوة تميزك في العمل الجماعي',
      'طرح سؤال ذكي حول بيئة العمل وفرص النمو'
    ],
    missionsEn: [
      'Introduce yourself and your career background',
      'Mention two core strengths in teamwork',
      'Ask an insightful question about team growth'
    ],
    openingLine: "Welcome to our office! Thank you for coming today. Could you please start by telling me a little about yourself?",
    starterPrompts: [
      "Thank you for this opportunity. I have a background in technology and communication.",
      "My key strengths are problem solving, adaptability, and collaborating with cross-functional teams.",
      "What are the upcoming priorities and growth opportunities for this department?"
    ]
  },
  {
    id: 'restaurant',
    badge: '🍽️',
    titleAr: 'في المطعم وحجز العشاء',
    titleEn: 'Fine Dining & Restaurant',
    descAr: 'احجز طاولة لشخصين، واطلب أطباقك المفضلة واستفسر عن المكونات والحساب بلباقة.',
    descEn: 'Reserve a table for two, order dishes, ask about dietary ingredients, and settle the bill.',
    roleSaraAr: 'مديرة الصالة والمضيفة 🍷',
    roleSaraEn: 'Restaurant Hostess 🍷',
    roleStudentAr: 'الضيف الكريم 🍽️',
    roleStudentEn: 'Dining Guest 🍽️',
    location: 'The Kensington Garden Bistro',
    missionsAr: [
      'طلب طاولة لشخصين بجانب النافذة',
      'طلب الطبق الرئيسي والسؤال عن المكونات',
      'طلب الفاتورة وتقديم الشكر على الخدمة'
    ],
    missionsEn: [
      'Request a table for two near the window',
      'Order main course and ask about ingredients',
      'Request the check and compliment the meal'
    ],
    openingLine: "Good evening! Welcome to The Kensington Bistro. Do you have a reservation tonight, or would you like a table?",
    starterPrompts: [
      "Good evening! A table for two by the window, please.",
      "Could you recommend a popular specialty? Is this dish gluten-free?",
      "Everything was delicious! Could we have the bill, please?"
    ]
  },
  {
    id: 'directions',
    badge: '🗺️',
    titleAr: 'السؤال عن الاتجاهات والمواصلات',
    titleEn: 'Asking for Directions & Transit',
    descAr: 'اسأل عن الطريق لأقرب محطة قطار أو معلم سياحي وافهم إرشادات المشي والمواصلات.',
    descEn: 'Ask for directions to the nearest tube station or landmark and understand navigation.',
    roleSaraAr: 'المرشدة المحلية في المدينة 🗺️',
    roleSaraEn: 'Friendly Local Guide 🗺️',
    roleStudentAr: 'السائح المستكشف 🚶',
    roleStudentEn: 'Exploring Tourist 🚶',
    location: 'Piccadilly Circus, Central London',
    missionsAr: [
      'الاستفسار عن أقرب محطة مترو أنفاق (Underground)',
      'السؤال عن الوقت المستغرق سيراً على الأقدام',
      'التأكد من المنعطف الصحيح وشكر المرشد'
    ],
    missionsEn: [
      'Ask for nearest underground / tube station',
      'Inquire about walking duration',
      'Confirm the turn direction and say thanks'
    ],
    openingLine: "Excuse me, you look a bit lost! Are you looking for a specific landmark or underground station?",
    starterPrompts: [
      "Excuse me! Could you tell me the way to the nearest Tube station?",
      "Is it within walking distance, or should I take a bus?",
      "So I turn left at the traffic light? Thank you so much for your help!"
    ]
  },
  {
    id: 'tech_support',
    badge: '💻',
    titleAr: 'الدعم الفني وحل المشكلات',
    titleEn: 'Customer & Tech Support',
    descAr: 'تواصل مع الدعم الفني لشرح مشكلة انقطاع الخدمة أو استرجاع كلمة المرور بحرفية.',
    descEn: 'Explain a technical issue, follow troubleshooting steps, and verify resolution.',
    roleSaraAr: 'أخصائية الدعم الفني سارة 🎧',
    roleSaraEn: 'Tech Support Specialist 🎧',
    roleStudentAr: 'العميل 💻',
    roleStudentEn: 'Customer 💻',
    location: 'Global Customer Care Center',
    missionsAr: [
      'شرح المشكلة التقنية بوضوح (رقم الحساب أو الجهاز)',
      'اتباع خطوة التحقق أو إعادة تشغيل الجهاز',
      'تأكيد عودة الخدمة والتعبير عن الرضا'
    ],
    missionsEn: [
      'Clearly explain the issue with your account/device',
      'Follow troubleshooting reset step',
      'Confirm service restoration and thank support'
    ],
    openingLine: "Hello, thank you for contacting Customer Support. My name is Sara. How can I assist you with your service today?",
    starterPrompts: [
      "Hello Sara, I am having trouble connecting to my student account.",
      "I have already tried resetting my password, but I didn't receive the email.",
      "It is working perfectly now! Thank you very much for resolving this so quickly."
    ]
  }
];

interface RolePlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartScenario: (scenario: RolePlayScenario) => void;
  isRtl: boolean;
}

export const RolePlayModal: React.FC<RolePlayModalProps> = ({
  isOpen,
  onClose,
  onStartScenario,
  isRtl
}) => {
  const [selectedScenario, setSelectedScenario] = useState<RolePlayScenario>(ROLE_PLAY_SCENARIOS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/40 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden text-white flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B2A47] via-[#002147] to-[#1B2A47] px-4 py-3.5 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
              🎭
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-200">
                {isRtl ? 'سيناريوهات المحاكاة ولعب الأدوار الواقعية 🎭' : 'Real-Life Role-Play Scenarios 🎭'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300">
                {isRtl ? 'ممارسة مواقف حية واقعية مع المعلمة سارة بالصوت والمحادثة' : 'Practice living conversations in authentic settings with Sara'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body: Scenario selector & details */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Horizontal Scenarios Carousel */}
          <div>
            <span className="text-[11px] font-black uppercase text-amber-300/80 block mb-2">
              {isRtl ? 'اختر السيناريو الذي ترغب في محاكاته اليوم:' : 'Select scenario to practice:'}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ROLE_PLAY_SCENARIOS.map(sc => {
                const isSelected = selectedScenario.id === sc.id;
                return (
                  <button
                    key={`sc-btn-${sc.id}`}
                    onClick={() => setSelectedScenario(sc)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-lg scale-102 ring-2 ring-amber-300/40'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 font-bold'
                    }`}
                  >
                    <span className="text-2xl">{sc.badge}</span>
                    <span className="text-[11px] leading-tight line-clamp-1">{isRtl ? sc.titleAr : sc.titleEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Scenario Preview Card */}
          <div className="bg-black/40 border-2 border-amber-400/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-inner">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedScenario.badge}</span>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-amber-300">
                    {isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}
                  </h4>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Compass size={12} className="text-amber-400" />
                    <span>{selectedScenario.location}</span>
                  </span>
                </div>
              </div>

              {/* Roles Chips */}
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 rounded-xl font-bold">
                  {isRtl ? `أنت: ${selectedScenario.roleStudentAr}` : `You: ${selectedScenario.roleStudentEn}`}
                </span>
                <span className="px-2.5 py-1 bg-blue-500/20 text-blue-200 border border-blue-400/40 rounded-xl font-bold">
                  {isRtl ? `سارة: ${selectedScenario.roleSaraAr}` : `Sara: ${selectedScenario.roleSaraEn}`}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {isRtl ? selectedScenario.descAr : selectedScenario.descEn}
            </p>

            {/* Missions / Goals Checklist */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-2">
              <span className="text-[11px] font-black uppercase text-amber-400 block mb-1">
                {isRtl ? '🎯 مهامك المطلوبة لإكمال هذا الموقف:' : '🎯 Your Missions in this Scenario:'}
              </span>
              {(isRtl ? selectedScenario.missionsAr : selectedScenario.missionsEn).map((mission, idx) => (
                <div key={`mission-${idx}`} className="flex items-start gap-2 text-xs text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-bold">{mission}</span>
                </div>
              ))}
            </div>

            {/* Opening Teaser Quote */}
            <div className="bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-400/30 rounded-xl p-3 text-xs">
              <span className="text-[10px] text-amber-400 font-bold block mb-1">
                {isRtl ? 'سارة ستبدأ معك الحوار قائلة:' : 'Sara starts the conversation saying:'}
              </span>
              <p className="font-mono text-amber-200 italic">
                "{selectedScenario.openingLine}"
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950/80 px-4 py-3.5 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            {isRtl ? 'إلغاء' : 'Cancel'}
          </button>

          <button
            onClick={() => {
              onStartScenario(selectedScenario);
              onClose();
            }}
            className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-98 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer border-2 border-white/30"
          >
            <Play size={16} className="text-slate-950 fill-current" />
            <span>{isRtl ? `ابدأ محاكاة [${selectedScenario.titleAr}] الآن 🚀` : `Start Role-Play Now 🚀`}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
