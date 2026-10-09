import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Compass, 
  Gamepad2, 
  Trophy, 
  UtensilsCrossed, 
  Rocket, 
  GraduationCap, 
  Search,
  ChevronRight,
  Flame,
  Volume2,
  BookOpen,
  PenTool,
  Award,
  Lightbulb,
  Check,
  RotateCcw,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getScenarioEducationalContent, ScenarioEducationalContent } from '../data/saraScenarioCurriculumData';

export type ScenarioCategory = 'all' | 'gaming' | 'sports' | 'food' | 'adventure' | 'school';

export interface RolePlayScenario {
  id: string;
  badge: string;
  category: 'gaming' | 'sports' | 'food' | 'adventure' | 'school';
  vibeAr: string;
  vibeEn: string;
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
  // ==========================================
  // 🎮 1. ألعاب وتقنية (Gaming & Tech)
  // ==========================================
  {
    id: 'gaming_minecraft',
    badge: '🎮',
    category: 'gaming',
    vibeAr: '🔥 ألعاب وجيمينج',
    vibeEn: 'Co-Op Gaming',
    titleAr: 'مهمة ماينكرافت والديسكورد مع الفريق',
    titleEn: 'Minecraft Co-Op Quest & Discord',
    descAr: 'تحدث مع سارة عبر المايك داخل لعبة ماينكرافت لتبادل الإحداثيات، وبناء القلعة، والتصدي للوحوش.',
    descEn: 'Hop on Discord voice chat with Sara while exploring a Minecraft diamond fortress and defending against Creepers.',
    roleSaraAr: 'زميلة اللعب والدردشة 🎧',
    roleSaraEn: 'Gaming Teammate Sara 🎧',
    roleStudentAr: 'قائد الفريق والمستكشف ⚔️',
    roleStudentEn: 'Team Leader & Explorer ⚔️',
    location: 'Minecraft Realm & Discord Voice Channel',
    missionsAr: [
      'مشاركة إحداثيات كهف الألماس عبر الصوت (Coordinates)',
      'التحذير من الوحوش والدفاع عن بوابة القلعة (Defend Castle)',
      'الاتفاق على صناعة دروع نذرية وبوابة الانتقال (Craft Nether Portal)'
    ],
    missionsEn: [
      'Share coordinates to the secret diamond mine',
      'Call out Creepers and defend the fortress gate',
      'Agree on crafting netherite armor and building the portal'
    ],
    openingLine: "Hey teammate! I'm on Discord voice! I just spawned near the mountain base. What are your coordinates?",
    starterPrompts: [
      "Hey Sara! My coordinates are X: 240, Y: 12, Z: -150. I found diamonds!",
      "Watch out! There is a Creeper sneaking right behind our wooden gate!",
      "Let's combine our iron and obsidian to craft the portal now!"
    ]
  },
  {
    id: 'robotics_stem',
    badge: '🤖',
    category: 'gaming',
    vibeAr: '⚡ ابتكار وبرمجة',
    vibeEn: 'STEM & Robotics',
    titleAr: 'تحدي الروبوتات ومعرض الابتكار المدرسي',
    titleEn: 'School Robotics Arena & Code Jam',
    descAr: 'برمج روبوتك الخاص مع سارة، واشرح عمل الحساسات الصوتية والمحركات قبل بدء جولة الحلبة.',
    descEn: 'Program your battle robot with mentor Sara, calibrate ultrasonic sensors, and test agility before the championship round.',
    roleSaraAr: 'مشرفة نادي الروبوت والذكاء الاصطناعي 🤖',
    roleSaraEn: 'Robotics Club Mentor Sara 🤖',
    roleStudentAr: 'المبرمج والمهندس المبتكر 💻',
    roleStudentEn: 'Lead Bot Coder & Engineer 💻',
    location: 'Middle School STEM Innovation Lab',
    missionsAr: [
      'شرح طريقة عمل حساس تجنب العقبات في الروبوت (Sensors)',
      'اكتشاف وتعديل خطأ برمجي في كود السرعة (Debug Code)',
      'تشغيل الروبوت واختبار المناورة في الحلبة (Arena Test)'
    ],
    missionsEn: [
      'Explain how the ultrasonic obstacle sensor works',
      'Debug the motor speed code loop together',
      'Test-drive the robot in the obstacle arena'
    ],
    openingLine: "Welcome to the robotics arena! Our bot is powered on. Can you explain how you programmed the distance sensor?",
    starterPrompts: [
      "I programmed the ultrasonic sensor to turn left whenever an obstacle is within 20 centimeters.",
      "Wait, let me debug this code loop so the motors accelerate faster.",
      "Look at that smooth turn! Our robot completed the test track in record time!"
    ]
  },
  {
    id: 'vr_mission',
    badge: '🥽',
    category: 'gaming',
    vibeAr: '🚀 واقع افتراضي',
    vibeEn: 'VR & Cyber',
    titleAr: 'صالة الواقع الافتراضي ومهمة الليزر',
    titleEn: 'CyberZone VR & Laser Tag Arena',
    descAr: 'ارتدِ نظارة الواقع الافتراضي مع سارة لاختيار مهمة الفضاء الجماعية وتحطيم الرقم القياسي للصالة.',
    descEn: 'Gear up with a VR headset and laser blasters to complete an interstellar co-op mission and hit the top leaderboard.',
    roleSaraAr: 'مشرفة ألعاب الواقع الافتراضي 🥽',
    roleSaraEn: 'VR Game Master Sara 🥽',
    roleStudentAr: 'اللاعب المغامر المحترف 🕹️',
    roleStudentEn: 'Pro VR Challenger 🕹️',
    location: 'CyberZone VR & Laser Tag Arena',
    missionsAr: [
      'اختيار مهمة الفضاء الجماعية وتثبيت نظارة VR (Select Game)',
      'وضع خطة تكتيكية لهزيمة الزعيم النهائي (Team Strategy)',
      'تسجيل رقم قياسي جديد على لوحة المتصدرين (High Score)'
    ],
    missionsEn: [
      'Select the space laser mission and calibrate your headset',
      'Formulate a team strategy to defeat the final alien boss',
      'Celebrate achieving a record-breaking high score'
    ],
    openingLine: "Ready for the ultimate virtual reality battle? Pick your laser blaster and tell me which mission we should launch!",
    starterPrompts: [
      "Let's choose the Galaxy Defenders co-op mission on hard mode!",
      "Cover the left wing while I blast the boss's power shields!",
      "Yes! We broke the high score record with 15,000 points!"
    ]
  },
  {
    id: 'tech_setup',
    badge: '🎧',
    category: 'gaming',
    vibeAr: '🖥️ سيت أب تقني',
    vibeEn: 'Gaming Gear',
    titleAr: 'متجر عتاد الألعاب وتطوير السيت أب',
    titleEn: 'NextGen Gaming Setup & Tech Store',
    descAr: 'اختر سماعة محيطية مريحة، كيبورد ميكانيكي سريع، واستفسر عن التوافق مع البلايستيشن والكمبيوتر.',
    descEn: 'Upgrade your gaming battlestation: compare spatial audio headsets, mechanical keyboards, and console compatibility.',
    roleSaraAr: 'أخصائية عتاد الألعاب بالمتجر 🎧',
    roleSaraEn: 'Tech & Gaming Specialist Sara 🎧',
    roleStudentAr: 'الجيمر المتسوق 💻',
    roleStudentEn: 'Gamer Upgrading Setup 💻',
    location: 'NextGen Gaming Superstore, London',
    missionsAr: [
      'السؤال عن سماعة ألعاب خفيفة الوزن مع مايك نقي (Headset)',
      'مقارنة الكيبورد الميكانيكي السريع مع الماوس (Mechanical Switches)',
      'معرفة الضمان وطريقة التوصيل بالجهاز (Console Compatibility)'
    ],
    missionsEn: [
      'Ask for a lightweight spatial-audio headset with a crisp mic',
      'Inquire about mechanical switch speeds and RGB lighting',
      'Verify compatibility with PS5 and PC plus warranty coverage'
    ],
    openingLine: "Hey there! Looking to upgrade your gaming setup today? What gear are you shopping for?",
    starterPrompts: [
      "Hi Sara! I need a lightweight noise-canceling headset that works on both PC and PS5.",
      "Which mechanical keyboard switches are better for fast reaction times: red or blue?",
      "Does this gaming mouse come with a 2-year warranty and braided cable?"
    ]
  },

  // ==========================================
  // ⚽ 2. رياضة وتحديات (Sports & Action)
  // ==========================================
  {
    id: 'football_academy',
    badge: '⚽',
    category: 'sports',
    vibeAr: '🏆 دوري الأبطال',
    vibeEn: 'Football Trials',
    titleAr: 'اختبارات نادي كرة القدم وسؤال الكابتن',
    titleEn: 'Premier Academy Football Tryouts',
    descAr: 'أظهر مهاراتك للمدربة سارة، وناقش مركزك المفضل ونجمك الكروي المفضل للحصول على قميص الفريق.',
    descEn: 'Impress Coach Sara at academy tryouts: discuss your pitch position, favorite skills, and team tactics.',
    roleSaraAr: 'مدربة الأكاديمية الكروية ⚽',
    roleSaraEn: 'Premier Academy Coach Sara ⚽',
    roleStudentAr: 'النجم الصاعد المهاجم 🏃‍♂️',
    roleStudentEn: 'Rising Star Player 🏃‍♂️',
    location: 'Manchester Premier Youth Football Ground',
    missionsAr: [
      'إخبار المدربة بمركزك المفضل وقدمك القوية (Striker or Winger)',
      'التحدث عن قدوتك الرياضية مثل بيلينغهام أو ميسي (Role Model)',
      'طلب رقم قميصك المفضل وموعد أول مباراة (Jersey Number)'
    ],
    missionsEn: [
      'State your best position (striker/midfielder) and strong foot',
      'Talk about your soccer idol (Bellingham, Messi, or Ronaldo)',
      'Request your preferred jersey number and first match time'
    ],
    openingLine: "Welcome to Premier Academy tryouts! You showed great speed during the sprint drills. What position do you play best?",
    starterPrompts: [
      "Coach Sara, I play as an attacking midfielder and my right foot has a powerful shot.",
      "My soccer idol is Jude Bellingham because he has amazing vision and stamina.",
      "Can I get jersey number 7 for the upcoming tournament match?"
    ]
  },
  {
    id: 'skatepark_action',
    badge: '🛹',
    category: 'sports',
    vibeAr: '⚡ إثارة وتزلج',
    vibeEn: 'Skatepark Fun',
    titleAr: 'حديقة التزلج وحركات السكيت بورد',
    titleEn: 'Skatepark Extreme & Ollie Tricks',
    descAr: 'تحدث مع بطلة التزلج سارة لاختيار خوذة الحماية، وتعلم أسرار القفز بالحركة الاستعراضية Ollie.',
    descEn: 'Hang out at the skatepark with Sara, pick the right safety gear, and master the mechanics of landing an Ollie.',
    roleSaraAr: 'مدربة التزلج المحترفة 🛹',
    roleSaraEn: 'Skatepark Pro Sara 🛹',
    roleStudentAr: 'متزلج السكيت بورد الشجاع 🛹',
    roleStudentEn: 'Skater Boy 🛹',
    location: 'Venice Beach Youth Skatepark & Ramps',
    missionsAr: [
      'التأكد من ارتداء خوذة الأمان وواقي الركبة (Safety Gear)',
      'السؤال عن وضعية القدم للقفز باللوح (Ollie Stance)',
      'تشجيع الأصدقاء والتقاط فيديو الحركة البهلوانية (Record Trick)'
    ],
    missionsEn: [
      'Check that your helmet and knee pads are properly strapped',
      'Ask for tips on foot placement for popping a clean Ollie',
      'Cheer on friends and record a slow-motion video of the trick'
    ],
    openingLine: "Hey skater! Awesome board design! Ready to hit the quarter pipe and practice some new tricks?",
    starterPrompts: [
      "Hey Coach Sara! I have my helmet and knee pads on. How do I balance for an Ollie?",
      "Should I place my back foot on the tail and slide my front foot up?",
      "That jump was massive! Did you see how high the board popped?"
    ]
  },
  {
    id: 'sports_clinic',
    badge: '🩹',
    category: 'sports',
    vibeAr: '🏥 لياقة وعلاج',
    vibeEn: 'Sports Recovery',
    titleAr: 'عيادة الإصابات الرياضية واللياقة البدنية',
    titleEn: 'Junior Sports Clinic & Ankle Recovery',
    descAr: 'اشرح للدكتورة سارة كيف التوت قدمك أثناء شوط المباراة الثاني واعرف متى تعود للملعب بكامل قوتك.',
    descEn: 'Explain twisting your ankle during a soccer sprint, ask about ice treatment and when you can return to the pitch.',
    roleSaraAr: 'طبيبة الإصابات الرياضية سارة 👩‍⚕️',
    roleSaraEn: 'Sports Medicine Doctor Sara 👩‍⚕️',
    roleStudentAr: 'اللاعب الرياضي الشاب 🏃‍♂️',
    roleStudentEn: 'Youth Athlete 🏃‍♂️',
    location: 'Olympic Youth Sports Medicine Center',
    missionsAr: [
      'شرح كيف حدثت الإصابة أثناء الجري في الملعب (Symptom & Action)',
      'السؤال عن كمادات الثلج ومدة الراحة (Ice Pack & Rest)',
      'الاستفسار عن موعد العودة لتمارين الفريق (Return to Match)'
    ],
    missionsEn: [
      'Describe how your ankle twisted while sprinting for the ball',
      'Ask about ice compression therapy and rest days',
      'Find out when you can safely return to team training'
    ],
    openingLine: "Hi there! I hear you had a tough collision during your football match today. How does your ankle feel?",
    starterPrompts: [
      "Hello Doctor Sara. I twisted my ankle while sprinting to shoot the ball in the second half.",
      "It is swollen and stings when I put weight on it. Should I use an ice pack?",
      "Will I be healed and ready to play in the tournament final next weekend?"
    ]
  },

  // ==========================================
  // 🍕 3. أصدقاء ومطاعم (Hangouts & Food)
  // ==========================================
  {
    id: 'pizza_arcade',
    badge: '🍕',
    category: 'food',
    vibeAr: '🎉 فلة وألعاب',
    vibeEn: 'Pizza & Games',
    titleAr: 'حفلة البيتزا وصالة ألعاب الأركيد',
    titleEn: 'Mega Slice Pizza & Retro Arcade Zone',
    descAr: 'اطلب بيتزا بيبروني كبيرة مع أطراف الجبن المقرمشة، وبطاطس كيرلي، واستبدل تذاكرك بجوائز الألعاب.',
    descEn: 'Order a loaded stuffed-crust pepperoni pizza with curly fries, and redeem your jackpot arcade tickets for gaming prizes.',
    roleSaraAr: 'مسؤولة مطعم البيتزا والأركيد 🍕',
    roleSaraEn: 'Pizza & Arcade Hostess Sara 🍕',
    roleStudentAr: 'منظم احتفال الأصدقاء 🕹️',
    roleStudentEn: 'Party Organizer & Gamer 🕹️',
    location: 'Mega Slice Pizzeria & Neon Arcade',
    missionsAr: [
      'طلب بيتزا بيبروني كبيرة مع أطراف الجبن المحشوة (Stuffed Crust)',
      'طلب بطاطس مقرمشة ومشروبات مثلجة للأصدقاء (Drinks & Sides)',
      'استبدال 500 تذكرة أركيد بهدية إلكترونية رائعة (Redeem Tickets)'
    ],
    missionsEn: [
      'Order a large pepperoni pizza with extra stuffed cheese crust',
      'Add seasoned curly fries and chilled sodas for your friends',
      'Redeem 500 arcade jackpot tickets for a cool gaming prize'
    ],
    openingLine: "Welcome to Mega Slice! Smells amazing today! What delicious pizza are you ordering for your gaming crew?",
    starterPrompts: [
      "We would like a large pepperoni pizza with extra stuffed cheese crust, please!",
      "Could we also get a basket of curly fries and three cold sodas?",
      "We won 500 tickets on the basketball arcade machine! Where can we trade them for prizes?"
    ]
  },
  {
    id: 'sneaker_vault',
    badge: '👟',
    category: 'food',
    vibeAr: '🔥 ستايل وسنيكرز',
    vibeEn: 'Sneaker Store',
    titleAr: 'متجر السنيكرز وأحذية كرة السلة الحصرية',
    titleEn: 'Urban Kicks & Basketball Sneaker Vault',
    descAr: 'اختر حذاء كرة سلة عصري، جرب مقاس 38 أو 39، واطلب أربطة نيون إضافية مع بخاخ الحماية.',
    descEn: 'Check out high-top basketball sneakers, find your European shoe size, and score custom neon laces.',
    roleSaraAr: 'أخصائية السنيكرز العصرية 👟',
    roleSaraEn: 'Sneaker Vault Specialist Sara 👟',
    roleStudentAr: 'عاشق السنيكرز والستايل 🕶️',
    roleStudentEn: 'Sneakerhead & Trendsetter 🕶️',
    location: 'Urban Kicks Flagship Store, London',
    missionsAr: [
      'السؤال عن توفر أحدث سنيكرز كلاسيكي مقاس 39 (Shoe Size)',
      'تجربة الحذاء والركض الخفيف للتأكد من الراحة (Fit & Comfort)',
      'السؤال عن بخاخ حماية الأحذية وأربطة ملونة (Accessories)'
    ],
    missionsEn: [
      'Ask for the latest retro high-tops in European size 38 or 39',
      'Try them on and check cushioning for running and jumping',
      'Ask about shoe protection spray and extra neon laces'
    ],
    openingLine: "Welcome to Urban Kicks! You're checking out our hottest sneaker release. What size can I grab from the back for you?",
    starterPrompts: [
      "Hello Sara! Do you have these retro high-top sneakers in European size 39?",
      "Let me try them on... they have amazing ankle support and feel super light!",
      "Do these shoes come with an extra pair of neon green laces?"
    ]
  },
  {
    id: 'shake_lounge',
    badge: '🥤',
    category: 'food',
    vibeAr: '🍦 حلويات وميلك شيك',
    vibeEn: 'Shake Lounge',
    titleAr: 'لاونج الميلك شيك والوافل المنعش',
    titleEn: 'Galaxy Shake & Waffle Lounge',
    descAr: 'ابتكر خلطتك المفضلة من ميلك شيك الأوريو، الكراميل المملح، والكريمة المخفوقة مع كوكيز ساخن.',
    descEn: 'Craft your dream Oreo and salted caramel milkshake with whipped cream, sprinkles, and warm choco-chip cookies.',
    roleSaraAr: 'صانعة العصائر والحلويات المبتكرة 🥤',
    roleSaraEn: 'Creative Shake Barista Sara 🥤',
    roleStudentAr: 'الزبون الذواقة 🍪',
    roleStudentEn: 'Milkshake Lover 🍪',
    location: 'Galaxy Shake & Dessert Bar',
    missionsAr: [
      'اختيار نكهة الحليب المخفوق مع البسكويت المفضل (Oreo or Lotus)',
      'طلب إضافات خاصة كالكريمة وصوص الشوكولاتة (Toppings)',
      'طلب كوكيز دافئ ودفع الحساب بلباقة (Warm Cookie & Bill)'
    ],
    missionsEn: [
      'Choose your signature milkshake flavor with crushed cookies',
      'Add extra whipped cream, sprinkles, and chocolate drizzle',
      'Add a warm chocolate-chip cookie and pay politely'
    ],
    openingLine: "Hey there! Ready to cool down with something sweet? What epic milkshake concoction are you dreaming of?",
    starterPrompts: [
      "Could I please get a large Oreo and salted-caramel milkshake?",
      "Can you top it with extra whipped cream and chocolate sprinkles?",
      "I'd also love one warm chocolate-chip cookie. How much is the total?"
    ]
  },

  // ==========================================
  // 🚀 4. فضاء ومغامرات (Sci-Fi & Adventures)
  // ==========================================
  {
    id: 'space_camp',
    badge: '🚀',
    category: 'adventure',
    vibeAr: '🌌 فضاء واستكشاف',
    vibeEn: 'Space Camp',
    titleAr: 'مخيم رواد الفضاء ومهمة المريخ',
    titleEn: 'NASA Space Camp & Mars Rover Mission',
    descAr: 'ارتدِ بدلة رواد الفضاء مع القائدة سارة، وقد محاكي مسبار المريخ لجمع العينات الصخرية واستكشاف الكواكب.',
    descEn: 'Train at NASA Space Camp: inspect astronaut communications, pilot a Mars rover simulator, and collect red planet rock samples.',
    roleSaraAr: 'قائدة الرحلة الفضائية ومسؤولة التحكم 🚀',
    roleSaraEn: 'Flight Commander Sara 🚀',
    roleStudentAr: 'رائد الفضاء الشاب الصاعد 👨‍🚀',
    roleStudentEn: 'Junior Astronaut 👨‍🚀',
    location: 'Kennedy Space Center & Mars Simulation Dome',
    missionsAr: [
      'فحص أنظمة الاتصال والأكسجين ببدلة الفضاء (Comms Check)',
      'قيادة المسبار وتحديد موقع الصخور المعدنية (Mars Rover)',
      'إرسال تقرير الاكتشاف إلى مركز التحكم الأرضي (Mission Report)'
    ],
    missionsEn: [
      'Perform a communications and oxygen level check',
      'Steer the rover simulator across Martian craters to collect rocks',
      'Transmit discovery findings back to mission control'
    ],
    openingLine: "Astronaut, all systems are green on the launchpad! Put on your headset. Are you ready for mission countdown?",
    starterPrompts: [
      "Commander Sara, this is Junior Astronaut! Communications and oxygen systems are reading 100%!",
      "I am navigating the Mars rover across the crater to drill a red mineral sample.",
      "Mission accomplished! The rock samples are secure and we are ready to return to base."
    ]
  },
  {
    id: 'theme_park_roller',
    badge: '🎢',
    category: 'adventure',
    vibeAr: '⚡ مغامرة وملاهي',
    vibeEn: 'Theme Park',
    titleAr: 'مدينة الملاهي وتحدي قطار الموت السريع',
    titleEn: 'Adventure Island Mega Roller Coaster',
    descAr: 'ابحث عن أسرع قطار ملاهي مقلوب في المدينة، اسأل عن بطاقة المسار السريع، واشترِ صورتك التذكارية.',
    descEn: 'Hunt for the 360-loop hypersonic roller coaster, inquire about Fast Pass lanes, and grab your scream photo souvenir.',
    roleSaraAr: 'مرشدة حديقة الألعاب الترفيهية 🎢',
    roleSaraEn: 'Theme Park Guide Sara 🎢',
    roleStudentAr: 'بطل الإثارة والتحدي 🕶️',
    roleStudentEn: 'Thrill Seeker 🕶️',
    location: 'Adventure Island World of Coasters',
    missionsAr: [
      'السؤال عن موقع أسرع قطار بالمدينة والالتفافات (Roller Coaster)',
      'التحقق من اشتراط الطول وبطاقة المسار السريع (Fast Pass)',
      'شراء صورة الهبوط الحماسي من كشك الهدايا (Photo Souvenir)'
    ],
    missionsEn: [
      'Ask for directions to the fastest 360-loop roller coaster',
      'Verify minimum height requirements and fast-pass entry',
      'Buy your on-ride action photo souvenir from the booth'
    ],
    openingLine: "Welcome to Adventure Island! You can hear the screams from the mega coaster! Are you brave enough to ride it?",
    starterPrompts: [
      "Excuse me Sara, which way leads to the giant roller coaster with the double inversion?",
      "Am I tall enough for the supersonic drop? Where can I get a Fast Pass?",
      "That ride was unbelievable! Can I purchase our action photo from the screen?"
    ]
  },
  {
    id: 'summer_camp_scout',
    badge: '🏕️',
    category: 'adventure',
    vibeAr: '🌲 كشافة ومغامرات',
    vibeEn: 'Outdoor Camp',
    titleAr: 'مخيم الغابة ومغامرات الكشافة والتجديف',
    titleEn: 'Pine Mountain Junior Adventure Camp',
    descAr: 'سجل وصولك للمخيم الصيفي، استلم خريطة الغابة ومفتاح الكابينة، وشارك في التجديف بالبحيرة وشواء المارشملو.',
    descEn: 'Check into summer adventure camp: get your cabin key, ask about campfire marshmallow night, and join the lake canoe team.',
    roleSaraAr: 'قائدة المخيم والمغامرات الكشفية 🏕️',
    roleSaraEn: 'Head Scout Leader Sara 🏕️',
    roleStudentAr: 'الكشاف المغامر المستكشف 🎒',
    roleStudentEn: 'Adventurous Camper 🎒',
    location: 'Pine Mountain Forest Adventure Camp',
    missionsAr: [
      'تسجيل الوصول واستلام خريطة المخيم ومفتاح الكابينة (Check-in & Map)',
      'السؤال عن موعد سهرة نار المخيم وشواء المارشملو (Campfire)',
      'الانضمام لفريق التجديف في قوارب الكانو بالبحيرة (Lake Rafting)'
    ],
    missionsEn: [
      'Check in to camp and collect your trail map and cabin key',
      'Ask what time the evening campfire and marshmallow roast begins',
      'Sign up for tomorrow morning’s lake canoe rafting race'
    ],
    openingLine: "Hey camper! Welcome to Pine Mountain! Pack your backpack and take your cabin key. Excited for outdoor adventures?",
    starterPrompts: [
      "Hello Leader Sara! I'm so excited to be here. Which cabin is assigned to my group?",
      "What time does the campfire storytelling and marshmallow roasting start tonight?",
      "Can I sign up for the lake canoeing challenge and zipline tour tomorrow?"
    ]
  },
  {
    id: 'youth_tournament_travel',
    badge: '✈️',
    category: 'adventure',
    vibeAr: '🌍 سفر وبطولات',
    vibeEn: 'Tournament Trip',
    titleAr: 'السفر للمنافسة في بطولة الألعاب العالمية',
    titleEn: 'World Youth Championship Flight & Entry',
    descAr: 'تحدث بثقة مع ضابطة الجوازات في مطار هيثرو ووضح أنك مسافر لتمثيل بلدك في بطولة الألعاب والروبوت الدولية.',
    descEn: 'Converse with the passport officer at Heathrow: present your youth badge, explain your tournament entry, and locate your team gate.',
    roleSaraAr: 'ضابطة الجوازات الترحيبية ✈️',
    roleSaraEn: 'Friendly Airport Officer Sara ✈️',
    roleStudentAr: 'بطل الفريق المسافر للمنافسة 🧳',
    roleStudentEn: 'Youth Championship Competitor 🧳',
    location: 'London Heathrow Airport Gate 4',
    missionsAr: [
      'إلقاء التحية وإبراز جواز السفر وبطاقة الصعود (Passport & Boarding)',
      'توضيح المشاركة في البطولة الدولية للناشئين (Tournament Purpose)',
      'السؤال عن مكان استلام الحقائب الرياضية الكبيرة (Baggage Claim)'
    ],
    missionsEn: [
      'Greet the officer and present your passport and tournament badge',
      'Explain that you are competing in the World Youth Championship',
      'Ask where the sports equipment baggage carousel is located'
    ],
    openingLine: "Good morning! Welcome to London. May I see your passport and landing card, please?",
    starterPrompts: [
      "Good morning Officer Sara! Here is my passport and student visa.",
      "I am traveling with my school team to compete in the World Youth Robotics Championship.",
      "Thank you! Which carousel will receive our team's equipment bags?"
    ]
  },

  // ==========================================
  // 🏫 5. المدرسة والنوادي (School & Clubs)
  // ==========================================
  {
    id: 'school_captain',
    badge: '🏆',
    category: 'school',
    vibeAr: '🌟 قيادة وتميز',
    vibeEn: 'Club Captain',
    titleAr: 'مقابلة قيادة نادي الأنشطة والألعاب بالمدرسة',
    titleEn: 'Middle School Club Captain Interview',
    descAr: 'قدم أفكارك الحماسية لتنظيم بطولات الرياضة والألعاب، واشرح كيف تلهم زملاءك وتكون قائداً متعاوناً.',
    descEn: 'Interview for Grade 7 Club Captain: pitch gaming tournaments, science challenges, and how to build school spirit.',
    roleSaraAr: 'رائدة النشاط الطلابي بالمدرسة 🏆',
    roleSaraEn: 'Student Activities Director Sara 🏆',
    roleStudentAr: 'المرشح القيادي الواعد 🌟',
    roleStudentEn: 'Club Captain Candidate 🌟',
    location: 'Middle School Student Council Chambers',
    missionsAr: [
      'التعريف بنفسك وطاقتك الإيجابية لتطوير النادي (Vision & Energy)',
      'طرح فكرة تنظيم دوري ألعاب وأنشطة مدرسية أسبوعية (Gaming League)',
      'شرح كيف تساعد الطلاب الجدد على الاندماج (Teamwork & Kindness)'
    ],
    missionsEn: [
      'Introduce your leadership vision and enthusiasm for the school',
      'Pitch an idea for a lunchtime gaming and sports league',
      'Explain how you will welcome new students and foster teamwork'
    ],
    openingLine: "Hello and congratulations on running for Club Captain! What exciting ideas do you have for our 7th-grade students this year?",
    starterPrompts: [
      "Hello Miss Sara! As Club Captain, I want to make school exciting and welcoming for every student.",
      "My main proposal is hosting a weekly e-sports and science challenge during Friday lunch breaks.",
      "I will ensure every new classmate has a buddy so no one ever feels left out."
    ]
  },
  {
    id: 'new_classmate_friends',
    badge: '🎒',
    category: 'school',
    vibeAr: '🤝 أصدقاء جدد',
    vibeEn: 'New Friends',
    titleAr: 'اليوم الأول في الصف وتكوين شلة الأصدقاء',
    titleEn: 'First Day in Grade 7 & Making Friends',
    descAr: 'عرف بنفسك لزميلتك سارة في أول يوم بالصف السابع، تحدث عن ألعابك المفضلة، كرة القدم، وتبادلا أرقام اللعب.',
    descEn: 'Introduce yourself on your first day of 7th grade: share your favorite games, favorite soccer club, and invite Sara to hang out at break.',
    roleSaraAr: 'زميلة الصف المحبوبة 🎒',
    roleSaraEn: 'Friendly Classmate Sara 🎒',
    roleStudentAr: 'الطالب الجديد الواثق 📚',
    roleStudentEn: 'Cool New Student 📚',
    location: 'Grade 7 Science & Homeroom Classroom',
    missionsAr: [
      'التعريف باسمك وهواياتك (الألعاب، كرة القدم، البرمجة) (Hobbies)',
      'السؤال عن جدول معمل الحاسب وغرفة الأنشطة (School Map)',
      'تبادل أرقام اللعب والموافقة على الجلوس معاً بالفسحة (Recess Hangout)'
    ],
    missionsEn: [
      'Introduce your name and favorite hobbies (gaming, sports, tech)',
      'Ask where the computer lab and sports field are located',
      'Exchange gamer tags and agree to sit together during recess'
    ],
    openingLine: "Hey there! I noticed your cool backpack! Are you the new student joining our 7th-grade class today?",
    starterPrompts: [
      "Hi Sara! Yes, my name is ... and I love playing football and online games.",
      "Do you know which floor the computer lab and science lab are on?",
      "Would you like to sit together during lunch break and compare game tags?"
    ]
  }
];

interface RolePlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartScenario: (scenario: RolePlayScenario) => void;
  isRtl: boolean;
  initialScenarioId?: string;
  initialTab?: 'lesson' | 'exercises' | 'quiz' | 'simulate';
}

export const RolePlayModal: React.FC<RolePlayModalProps> = ({
  isOpen,
  onClose,
  onStartScenario,
  isRtl,
  initialScenarioId,
  initialTab = 'lesson'
}) => {
  const [activeCategory, setActiveCategory] = useState<ScenarioCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScenario, setSelectedScenario] = useState<RolePlayScenario>(() => {
    if (initialScenarioId) {
      const found = ROLE_PLAY_SCENARIOS.find(s => s.id === initialScenarioId);
      if (found) return found;
    }
    return ROLE_PLAY_SCENARIOS[0];
  });

  const [activeTab, setActiveTab] = useState<'lesson' | 'exercises' | 'quiz' | 'simulate'>(initialTab);

  // Exercise states
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, number>>({});
  const [exerciseChecked, setExerciseChecked] = useState<Record<string, boolean>>({});
  const [exerciseHints, setExerciseHints] = useState<Record<string, boolean>>({});

  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Sync if initialScenarioId changes
  useEffect(() => {
    if (initialScenarioId) {
      const found = ROLE_PLAY_SCENARIOS.find(s => s.id === initialScenarioId);
      if (found) {
        setSelectedScenario(found);
      }
    }
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialScenarioId, initialTab]);

  // Reset exercise/quiz states on scenario change
  useEffect(() => {
    setExerciseAnswers({});
    setExerciseChecked({});
    setExerciseHints({});
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  }, [selectedScenario.id]);

  const eduContent: ScenarioEducationalContent = useMemo(() => {
    return getScenarioEducationalContent(selectedScenario.id);
  }, [selectedScenario.id]);

  const categories = useMemo(() => [
    { id: 'all', labelAr: '🌟 الكل', labelEn: '🌟 All (15+)', icon: Sparkles },
    { id: 'gaming', labelAr: '🎮 ألعاب وتقنية', labelEn: '🎮 Gaming & Tech', icon: Gamepad2 },
    { id: 'sports', labelAr: '⚽ رياضة وتحديات', labelEn: '⚽ Sports & Action', icon: Trophy },
    { id: 'food', labelAr: '🍕 فلة وأصدقاء', labelEn: '🍕 Food & Hangouts', icon: UtensilsCrossed },
    { id: 'adventure', labelAr: '🚀 فضاء ومغامرات', labelEn: '🚀 Sci-Fi & Adventure', icon: Rocket },
    { id: 'school', labelAr: '🏫 المدرسة والنوادي', labelEn: '🏫 School & Leadership', icon: GraduationCap }
  ], []);

  const filteredScenarios = useMemo(() => {
    return ROLE_PLAY_SCENARIOS.filter(sc => {
      const matchesCategory = activeCategory === 'all' || sc.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        sc.titleAr.toLowerCase().includes(query) ||
        sc.titleEn.toLowerCase().includes(query) ||
        sc.descAr.toLowerCase().includes(query) ||
        sc.descEn.toLowerCase().includes(query) ||
        sc.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Audio helper
  const playAudio = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Grade quiz
  const handleGradeQuiz = () => {
    let correct = 0;
    eduContent.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / Math.max(1, eduContent.quiz.length)) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);
  };

  // Completed exercises count
  const completedExercisesCount = useMemo(() => {
    return eduContent.exercises.filter(ex => {
      return exerciseChecked[ex.id] && exerciseAnswers[ex.id] === ex.correctIndex;
    }).length;
  }, [eduContent.exercises, exerciseChecked, exerciseAnswers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/40 rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden text-white flex flex-col max-h-[94vh]"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#002147] via-[#093568] to-[#002147] px-4 sm:px-6 py-3.5 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-400/20 shrink-0 border border-white/40">
              {selectedScenario.badge || '🎮'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isRtl ? 'سيناريوهات سارة التفاعلية (شرح حقيقي + تمارين + اختبارات) 🎮' : "Sara's Scenarios Hub (Lessons, Exercises & Tests) 🎮"}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black border border-amber-400/30">
                  {isRtl ? 'شرح + تطبيق واقعي 🌟' : 'Full Pedagogical Experience 🌟'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-200/80 mt-0.5">
                {isRtl 
                  ? 'تعلم المفردات والقواعد الذهبية، حل التمارين واجتز الاختبار، ثم خض المحاكاة الحية مع سارة بالصوت! 🚀'
                  : 'Master vocabulary and golden grammar, solve exercises, pass the quiz, and jump into live voice role-play with Sara! 🚀'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isRtl ? 'إغلاق' : 'Close'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        <div className="bg-slate-950/90 px-4 sm:px-6 py-2.5 border-b border-slate-800 space-y-2 shrink-0">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={`cat-${cat.id}`}
                  onClick={() => {
                    setActiveCategory(cat.id as ScenarioCategory);
                    const matched = ROLE_PLAY_SCENARIOS.find(s => cat.id === 'all' || s.category === cat.id);
                    if (matched) setSelectedScenario(matched);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20 scale-102'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{isRtl ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'ابحث عن سيناريو (ماينكرافت، كورة، بيتزا، فضاء، روبوت، سنيكرز)...' : 'Search scenario (Minecraft, Football, Pizza, Space, Robotics)...'}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-1.5 ps-9 pe-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all"
            />
          </div>
        </div>

        {/* Content Body: Split layout on large screens */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Column (Scenarios List) */}
          <div className="lg:col-span-4 p-3 overflow-y-auto space-y-1.5 border-b lg:border-b-0 lg:border-e border-slate-800 max-h-[35vh] lg:max-h-none">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-1 mb-1">
              <span>{isRtl ? `السيناريوهات المتاحة (${filteredScenarios.length})` : `Scenarios (${filteredScenarios.length})`}</span>
              <span className="text-amber-400 flex items-center gap-1 text-[10px]">
                <Flame size={12} />
                <span>{isRtl ? 'اختر لدراسة الشرح' : 'Select to study'}</span>
              </span>
            </div>

            {filteredScenarios.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                {isRtl ? 'لا توجد سيناريوهات مطابقة للبحث' : 'No scenarios found'}
              </div>
            ) : (
              filteredScenarios.map((sc) => {
                const isSelected = selectedScenario.id === sc.id;
                return (
                  <button
                    key={`sc-card-${sc.id}`}
                    onClick={() => {
                      setSelectedScenario(sc);
                    }}
                    className={`w-full text-start p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 relative ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400/20 via-slate-800 to-slate-800 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                      isSelected 
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-inner' 
                        : 'bg-slate-900 text-slate-200 border-slate-700'
                    }`}>
                      {sc.badge}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[10px] font-black text-amber-300">
                          {isRtl ? sc.vibeAr : sc.vibeEn}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-white truncate">
                        {isRtl ? sc.titleAr : sc.titleEn}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {isRtl ? sc.descAr : sc.descEn}
                      </p>
                    </div>

                    <ChevronRight size={14} className={`text-slate-500 shrink-0 ${isSelected ? 'text-amber-400 translate-x-0.5' : ''} ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: 4 Educational Tabs Showcase */}
          <div className="lg:col-span-8 flex flex-col min-h-0 bg-slate-900/60">
            {/* Top Scenario Title & 4 Navigation Tabs */}
            <div className="bg-slate-950/70 p-3 sm:px-5 sm:py-3 border-b border-slate-800 shrink-0 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 bg-amber-400 text-slate-950 rounded-xl border border-amber-300 shadow-sm">
                    {selectedScenario.badge}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                      {isRtl ? selectedScenario.vibeAr : selectedScenario.vibeEn} • 12Y
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      {isRtl ? selectedScenario.titleAr : selectedScenario.titleEn}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10">
                  <Compass size={13} className="text-amber-400" />
                  <span>{selectedScenario.location}</span>
                </div>
              </div>

              {/* 4 Interactive Learning Tabs */}
              <div className="grid grid-cols-4 gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('lesson')}
                  className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'lesson'
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-101'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BookOpen size={14} />
                  <span className="truncate">{isRtl ? '1. الشرح والدرس' : '1. Lesson'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
                    activeTab === 'exercises'
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-101'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <PenTool size={14} />
                  <span className="truncate">{isRtl ? '2. التمارين' : '2. Practice'}</span>
                  {completedExercisesCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                      {completedExercisesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
                    activeTab === 'quiz'
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-101'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Award size={14} />
                  <span className="truncate">{isRtl ? '3. الاختبار' : '3. Quiz'}</span>
                  {quizSubmitted && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black">
                      {quizScore}%
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('simulate')}
                  className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'simulate'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-md scale-101'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Play size={14} />
                  <span className="truncate">{isRtl ? '4. المحاكاة' : '4. Role-Play'}</span>
                </button>
              </div>
            </div>

            {/* Tab Body Showcase */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
              {/* ==================================================== */}
              {/* TAB 1: REAL LESSON & PEDAGOGICAL EXPLANATION */}
              {/* ==================================================== */}
              {activeTab === 'lesson' && (
                <div className="space-y-4">
                  {/* Pedagogical Goal Banner */}
                  <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/60 to-blue-950/60 border-2 border-indigo-400/40 rounded-2xl p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-black uppercase">
                      <Sparkles size={14} className="text-amber-400" />
                      <span>{isRtl ? '🎯 الهدف التربوي واللغوي من هذا الموقف:' : '🎯 Educational & Linguistic Goal:'}</span>
                    </div>
                    <p className="text-xs text-indigo-100 font-semibold leading-relaxed">
                      {isRtl ? eduContent.pedagogicalGoalAr : eduContent.pedagogicalGoalEn}
                    </p>
                    <p className="text-[11px] text-slate-300 border-t border-indigo-400/20 pt-1.5 mt-1 leading-normal">
                      {isRtl ? eduContent.conceptAr : eduContent.conceptEn}
                    </p>
                  </div>

                  {/* Core Vocabulary Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                        <span>📚</span>
                        <span>{isRtl ? 'المفردات والتراكيب الأساسية للموقف:' : 'Core Situational Vocabulary:'}</span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {isRtl ? 'اضغط 🔊 للاستماع للنطق الأمريكي' : 'Tap 🔊 for US Pronunciation'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {eduContent.vocabulary.map((vocab, vIdx) => (
                        <div key={`v-${vIdx}`} className="bg-slate-950/70 border border-slate-800 hover:border-amber-400/60 transition-all rounded-2xl p-3 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-amber-300 font-mono">
                                  {vocab.word}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {vocab.ipa}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-white block mt-0.5">
                                {vocab.meaningAr}
                              </span>
                            </div>

                            <button
                              onClick={() => playAudio(vocab.word)}
                              className="p-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-300 transition-all cursor-pointer shrink-0"
                              title={isRtl ? 'استمع للنطق' : 'Listen'}
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>

                          <div className="bg-white/5 p-2 rounded-xl text-[11px] text-slate-300 space-y-0.5 border border-white/5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-amber-200">"{vocab.exampleEn}"</span>
                              <button
                                onClick={() => playAudio(vocab.exampleEn)}
                                className="text-slate-400 hover:text-amber-300 transition-colors p-0.5"
                                title={isRtl ? 'نطق الجملة' : 'Play sentence'}
                              >
                                <Volume2 size={12} />
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-400 block">{vocab.exampleAr}</span>
                          </div>

                          {vocab.tip && (
                            <div className="text-[10px] text-emerald-300 bg-emerald-950/30 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                              💡 {vocab.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Golden Grammar Rule Box */}
                  <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#002147] border-2 border-amber-400/40 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📐</span>
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                          {isRtl ? 'القاعدة والتركيب الذهبي لهذا السيناريو:' : 'Golden Grammar Rule:'}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-white">
                          {isRtl ? eduContent.grammar.titleAr : eduContent.grammar.titleEn}
                        </h4>
                      </div>
                    </div>

                    <div className="bg-black/50 border border-amber-400/30 rounded-xl p-2.5 font-mono text-xs text-amber-300 font-bold text-center">
                      {eduContent.grammar.formula}
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {isRtl ? eduContent.grammar.explanationAr : eduContent.grammar.explanationEn}
                    </p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {isRtl ? 'أمثلة تطبيقية مباشرة:' : 'Direct Examples:'}
                      </span>
                      {eduContent.grammar.examples.map((ex, eIdx) => (
                        <div key={`g-ex-${eIdx}`} className="flex items-center justify-between text-xs text-slate-200 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
                          <span>{ex}</span>
                          <button
                            onClick={() => playAudio(ex.split('(')[0])}
                            className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Model Dialogue Preview */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                      <span>🗣️</span>
                      <span>{isRtl ? 'الحوار النموذجي الواقعي بين سارة والطالب:' : 'Model Conversational Dialogue:'}</span>
                    </div>

                    <div className="space-y-2">
                      {eduContent.modelDialogue.map((line, dIdx) => (
                        <div
                          key={`diag-${dIdx}`}
                          className={`p-2.5 rounded-2xl text-xs space-y-1 ${
                            line.speaker === 'sara'
                              ? 'bg-[#002147]/70 border border-amber-400/30 ms-0 me-6'
                              : 'bg-emerald-950/50 border border-emerald-500/30 ms-6 me-0'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-amber-300">
                              {line.speaker === 'sara' ? (isRtl ? '👩‍🏫 سارة:' : '👩‍🏫 Sara:') : (isRtl ? '👦 أنت (الطالب):' : '👦 You (Student):')}
                            </span>
                            <button
                              onClick={() => playAudio(line.textEn)}
                              className="text-slate-400 hover:text-amber-300 p-0.5"
                            >
                              <Volume2 size={12} />
                            </button>
                          </div>
                          <p className="font-semibold text-white font-mono text-[11px]">{line.textEn}</p>
                          <p className="text-[10px] text-slate-400">{line.textAr}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 2: INTERACTIVE PRACTICE EXERCISES */}
              {/* ==================================================== */}
              {activeTab === 'exercises' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border-2 border-amber-400/50 rounded-2xl p-3 flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                        <PenTool size={15} />
                        <span>{isRtl ? 'تمارين تطبيقية وتحديات تفاعلية ✍️' : 'Interactive Practice Challenges ✍️'}</span>
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {isRtl ? 'أجب على الأسئلة الثلاثة لتثبيت المفردات والقواعد واستعد للمحاكاة!' : 'Answer all 3 exercises to lock in the vocabulary and grammar!'}
                      </p>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-400/40 text-xs font-black text-amber-300 flex items-center gap-1.5">
                      <span>{completedExercisesCount} / {eduContent.exercises.length}</span>
                      <span>{isRtl ? 'مكتمل' : 'Completed'}</span>
                    </div>
                  </div>

                  {/* Exercises List */}
                  <div className="space-y-3.5">
                    {eduContent.exercises.map((ex, exIdx) => {
                      const selectedIdx = exerciseAnswers[ex.id];
                      const isChecked = exerciseChecked[ex.id];
                      const isCorrect = isChecked && selectedIdx === ex.correctIndex;
                      const isWrong = isChecked && selectedIdx !== ex.correctIndex;
                      const showingHint = exerciseHints[ex.id];

                      return (
                        <div
                          key={`ex-${ex.id}`}
                          className={`bg-slate-950/70 border-2 rounded-2xl p-3.5 sm:p-4 space-y-3 transition-all ${
                            isCorrect
                              ? 'border-emerald-500/70 bg-emerald-950/20'
                              : isWrong
                              ? 'border-rose-500/60 bg-rose-950/20'
                              : 'border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                                {exIdx + 1}
                              </span>
                              <h5 className="text-xs sm:text-sm font-black text-white">
                                {isRtl ? ex.titleAr : ex.titleEn}
                              </h5>
                            </div>

                            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[10px] font-bold">
                              {ex.type === 'vocab' ? (isRtl ? 'مفردات' : 'Vocab') : ex.type === 'grammar' ? (isRtl ? 'قواعد' : 'Grammar') : (isRtl ? 'موقف' : 'Situation')}
                            </span>
                          </div>

                          <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-xs sm:text-sm font-bold text-amber-200 font-mono">
                              {ex.promptEn}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {ex.promptAr}
                            </p>
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ex.options.map((opt, optIdx) => {
                              const isThisSelected = selectedIdx === optIdx;
                              let btnClass = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500';

                              if (isChecked) {
                                if (optIdx === ex.correctIndex) {
                                  btnClass = 'bg-emerald-900/60 border-emerald-400 text-emerald-100 font-bold';
                                } else if (isThisSelected) {
                                  btnClass = 'bg-rose-900/60 border-rose-400 text-rose-100';
                                } else {
                                  btnClass = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                                }
                              } else if (isThisSelected) {
                                btnClass = 'bg-amber-400/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50';
                              }

                              return (
                                <button
                                  key={`opt-${optIdx}`}
                                  disabled={isChecked}
                                  onClick={() => {
                                    setExerciseAnswers(prev => ({ ...prev, [ex.id]: optIdx }));
                                  }}
                                  className={`p-2.5 rounded-xl border text-xs text-start transition-all cursor-pointer flex items-center justify-between gap-2 ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isChecked && optIdx === ex.correctIndex && (
                                    <Check size={14} className="text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Action Buttons for this Exercise */}
                          <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                            <div>
                              {ex.hintAr && (
                                <button
                                  onClick={() => setExerciseHints(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                                  className="text-[10px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold cursor-pointer"
                                >
                                  <Lightbulb size={12} />
                                  <span>{showingHint ? (isRtl ? 'إخفاء التلميح' : 'Hide Hint') : (isRtl ? 'تلميح 💡' : 'Need a Hint?')}</span>
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {isChecked ? (
                                <button
                                  onClick={() => {
                                    setExerciseChecked(prev => ({ ...prev, [ex.id]: false }));
                                    setExerciseAnswers(prev => {
                                      const next = { ...prev };
                                      delete next[ex.id];
                                      return next;
                                    });
                                  }}
                                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <RotateCcw size={12} />
                                  <span>{isRtl ? 'إعادة المحاولة' : 'Retry'}</span>
                                </button>
                              ) : (
                                <button
                                  disabled={selectedIdx === undefined}
                                  onClick={() => {
                                    setExerciseChecked(prev => ({ ...prev, [ex.id]: true }));
                                  }}
                                  className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                    selectedIdx !== undefined
                                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                  }`}
                                >
                                  {isRtl ? 'تحقق من الإجابة ✓' : 'Check Answer ✓'}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Hint Message */}
                          {showingHint && ex.hintAr && (
                            <div className="text-[11px] text-amber-200 bg-amber-950/40 border border-amber-400/30 rounded-xl p-2.5">
                              💡 <strong>{isRtl ? 'تلميح:' : 'Hint:'}</strong> {ex.hintAr}
                            </div>
                          )}

                          {/* Feedback Explanation */}
                          {isChecked && (
                            <div className={`p-2.5 rounded-xl text-xs space-y-1 border ${
                              isCorrect
                                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                                : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                            }`}>
                              <div className="flex items-center gap-1.5 font-black">
                                <span>{isCorrect ? '🎉 إجابة صحيحة بامتياز! (+10 XP)' : '❌ إجابة غير دقيقة'}</span>
                              </div>
                              <p className="text-[11px] text-slate-200">
                                {ex.explanationAr}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 3: SCENARIO MASTERY QUIZ */}
              {/* ==================================================== */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  {/* Quiz Banner */}
                  <div className="bg-gradient-to-r from-purple-950/60 via-[#002147] to-purple-950/60 border-2 border-purple-400/40 rounded-2xl p-4 flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                        <Award size={16} />
                        <span>{isRtl ? 'اختبار الإتقان الشامل للسيناريو 🏆' : 'Scenario Mastery Quiz 🏆'}</span>
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {isRtl ? 'اختبر فهمك الشامل للمفردات والقواعد والتفاعل الشفهي في هذا الموقف!' : 'Test your complete grasp of vocabulary, grammar, and oral readiness!'}
                      </p>
                    </div>

                    {quizSubmitted && (
                      <div className={`px-4 py-2 rounded-2xl border-2 text-center ${
                        quizScore >= 75
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-amber-500/20 border-amber-400 text-amber-200'
                      }`}>
                        <span className="text-[10px] block font-bold">{isRtl ? 'النتيجة النهائية' : 'Final Score'}</span>
                        <span className="text-lg font-black">{quizScore}%</span>
                      </div>
                    )}
                  </div>

                  {/* Quiz Questions */}
                  <div className="space-y-3.5">
                    {eduContent.quiz.map((q, qIdx) => {
                      const selectedAns = quizAnswers[q.id];
                      return (
                        <div key={`qz-${q.id}`} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-purple-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {qIdx + 1}
                            </span>
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-white">
                                {q.questionEn}
                              </h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                {q.questionAr}
                              </p>
                            </div>
                          </div>

                          {/* Quiz Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedAns === oIdx;
                              let optClass = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500';

                              if (quizSubmitted) {
                                if (oIdx === q.correctIndex) {
                                  optClass = 'bg-emerald-900/60 border-emerald-400 text-emerald-100 font-bold';
                                } else if (isSelected) {
                                  optClass = 'bg-rose-900/60 border-rose-400 text-rose-100';
                                } else {
                                  optClass = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
                                }
                              } else if (isSelected) {
                                optClass = 'bg-purple-500/20 border-purple-400 text-purple-200 ring-1 ring-purple-400';
                              }

                              return (
                                <button
                                  key={`qo-${oIdx}`}
                                  disabled={quizSubmitted}
                                  onClick={() => {
                                    setQuizAnswers(prev => ({ ...prev, [q.id]: oIdx }));
                                  }}
                                  className={`p-2.5 rounded-xl border text-xs text-start transition-all cursor-pointer flex items-center justify-between gap-2 ${optClass}`}
                                >
                                  <span>{opt}</span>
                                  {quizSubmitted && oIdx === q.correctIndex && (
                                    <Check size={14} className="text-emerald-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Detailed Explanation on Submission */}
                          {quizSubmitted && (
                            <div className="text-[11px] text-slate-300 bg-white/5 border border-white/5 rounded-xl p-2.5 mt-2">
                              💡 <strong>{isRtl ? 'التوضيح الأكاديمي:' : 'Explanation:'}</strong> {q.explanationAr}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Quiz Grading Action */}
                  <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                    {quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                          setQuizScore(0);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        <span>{isRtl ? 'إعادة الاختبار' : 'Retake Quiz'}</span>
                      </button>
                    ) : (
                      <button
                        disabled={Object.keys(quizAnswers).length < eduContent.quiz.length}
                        onClick={handleGradeQuiz}
                        className={`flex-1 py-3 px-6 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-lg ${
                          Object.keys(quizAnswers).length >= eduContent.quiz.length
                            ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 hover:brightness-105'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {isRtl ? 'تصحيح واعتماد نتيجة الاختبار 🎓' : 'Grade & Submit Quiz 🎓'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 4: LIVE SCENARIO ROLE-PLAY SIMULATION */}
              {/* ==================================================== */}
              {activeTab === 'simulate' && (
                <div className="space-y-4">
                  {/* Roles Breakdown Box */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/10 rounded-2xl p-2.5 text-xs">
                    <div className="text-center py-1">
                      <span className="text-slate-400 text-[10px] block font-bold mb-0.5">
                        {isRtl ? '🎮 دورك أنت في الموقف:' : '🎮 Your Role:'}
                      </span>
                      <span className="font-black text-emerald-300">
                        {isRtl ? selectedScenario.roleStudentAr : selectedScenario.roleStudentEn}
                      </span>
                    </div>
                    <div className="text-center py-1 border-s border-white/10">
                      <span className="text-slate-400 text-[10px] block font-bold mb-0.5">
                        {isRtl ? '👩‍🏫 دور المعلمة سارة:' : '👩‍🏫 Sara Role:'}
                      </span>
                      <span className="font-black text-amber-300">
                        {isRtl ? selectedScenario.roleSaraAr : selectedScenario.roleSaraEn}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {isRtl ? selectedScenario.descAr : selectedScenario.descEn}
                  </p>

                  {/* Missions Checklist */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>{isRtl ? '🎯 مهامك الثلاث في المحادثة الحية:' : '🎯 Your 3 Live Conversation Missions:'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">3 / 3</span>
                    </div>

                    <div className="space-y-1.5">
                      {(isRtl ? selectedScenario.missionsAr : selectedScenario.missionsEn).map((mission, idx) => (
                        <div key={`spot-m-${idx}`} className="flex items-start gap-2.5 text-xs text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5">
                          <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="font-bold leading-normal">{mission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sara Opening Voice Preview */}
                  <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/30 rounded-2xl p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-bold">
                        <Volume2 size={13} className="text-amber-400" />
                        <span>{isRtl ? 'سارة ستبدأ معك الحوار قائلة بالإنجليزية:' : 'Sara opens the dialogue in English:'}</span>
                      </div>
                      <button
                        onClick={() => playAudio(selectedScenario.openingLine)}
                        className="px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 text-[10px] font-bold hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Volume2 size={11} />
                        <span>{isRtl ? 'استمع' : 'Listen'}</span>
                      </button>
                    </div>
                    <p className="font-mono text-amber-200 italic font-semibold">
                      "{selectedScenario.openingLine}"
                    </p>
                  </div>

                  {/* Suggested Starter Responses */}
                  {selectedScenario.starterPrompts && selectedScenario.starterPrompts.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-300 font-bold block">
                        {isRtl ? '💡 اقتراحات لجمل يمكنك الرد بها فوراً:' : '💡 Great ways you can reply:'}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {selectedScenario.starterPrompts.map((p, pIdx) => (
                          <div key={`p-ex-${pIdx}`} className="text-[11px] text-slate-300 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700/60 font-medium flex items-center justify-between gap-2">
                            <span>"{p}"</span>
                            <button
                              onClick={() => playAudio(p)}
                              className="text-slate-400 hover:text-amber-300 transition-colors p-0.5"
                            >
                              <Volume2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Floating Step Bar / Next Action */}
            <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
              {activeTab === 'lesson' && (
                <>
                  <button
                    onClick={() => setActiveTab('exercises')}
                    className="py-2.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>{isRtl ? 'الانتقال للتمارين التطبيقية ✍️' : 'Go to Exercises ✍️'}</span>
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </button>

                  <button
                    onClick={() => {
                      onStartScenario(selectedScenario);
                      onClose();
                    }}
                    className="py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Play size={13} />
                    <span>{isRtl ? 'بدء المحاكاة الآن 🚀' : 'Start Simulation'}</span>
                  </button>
                </>
              )}

              {activeTab === 'exercises' && (
                <>
                  <button
                    onClick={() => setActiveTab('lesson')}
                    className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    {isRtl ? '← مراجعة الشرح' : '← Review Lesson'}
                  </button>

                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>{isRtl ? 'الانتقال لاختبار الإتقان 🏆' : 'Take Mastery Quiz 🏆'}</span>
                    <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                </>
              )}

              {activeTab === 'quiz' && (
                <>
                  <button
                    onClick={() => setActiveTab('exercises')}
                    className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    {isRtl ? '← مراجعة التمارين' : '← Back to Exercises'}
                  </button>

                  <button
                    onClick={() => {
                      onStartScenario(selectedScenario);
                      onClose();
                    }}
                    className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-105 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Play size={14} className="fill-current" />
                    <span>{isRtl ? 'انطلق في المحاكاة الحية مع سارة 🚀' : 'Launch Live Simulation with Sara 🚀'}</span>
                  </button>
                </>
              )}

              {activeTab === 'simulate' && (
                <>
                  <button
                    onClick={() => setActiveTab('lesson')}
                    className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    {isRtl ? '📖 عرض الشرح والتمارين' : '📖 View Lesson & Exercises'}
                  </button>

                  <button
                    onClick={() => {
                      onStartScenario(selectedScenario);
                      onClose();
                    }}
                    className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 active:scale-98 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 transition-all cursor-pointer border-2 border-white/40"
                  >
                    <Play size={16} className="text-slate-950 fill-current" />
                    <span>{isRtl ? `انطلق في سيناريو [${selectedScenario.titleAr}] الآن 🚀` : `Launch [${selectedScenario.titleEn}] Now 🚀`}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
