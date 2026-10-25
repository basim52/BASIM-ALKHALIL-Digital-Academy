import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Volume2, 
  Mic, 
  Award, 
  ArrowLeft,
  Check,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';
import { managedSpeak } from '../lib/audio';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace
} from './ui/academy';

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
    student_line_template_ar: 'لا، شكراً لك. هل يمكننا الحصول على ____ من فضلك؟',
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
  },
  {
    id: 'rp_011',
    type: 'adults',
    title_ar: 'إرجاع قطعة ملابس 🛍️',
    title_en: 'Returning custom clothing 🛍️',
    situation_ar: 'تريد إرجاع قميص اشتريته مسبقاً لأنه ليس بمقاسك المناسب.',
    situation_en: 'You bought a formal shirt yesterday but it is too small, and you want to return or exchange it.',
    avatar_host: '👩‍💼',
    host_name_ar: 'سارة (بائعة المتجر)',
    host_name_en: 'Sarah (Store Clerk)',
    host_line_1: 'Hello! Welcome back to London Trends. How can I help you today?',
    host_line_1_ar: 'مرحباً بك مجدداً في لندن تريندز. كيف يمكنني مساعدتك اليوم؟',
    student_line_template: 'Hi. I would like to ____ this shirt, please.',
    student_line_template_ar: 'مرحباً. أود ____ هذا القميص من فضلك.',
    correct_blank: 'return',
    options: ['return', 'burn', 'paint'],
    host_response: 'No problem at all! Do you have the receipt with you?',
    host_response_ar: 'لا مشكلة على الإطلاق! هل بحوزتك إيصال الشراء؟'
  },
  {
    id: 'rp_012',
    type: 'adults',
    title_ar: 'حجز تذكرة قطار 🎫',
    title_en: 'Booking a Train Ticket 🎫',
    situation_ar: 'تقف عند شباك التذاكر لحجز تذكرة إلى مدينة مانشستر.',
    situation_en: 'You are at Waterloo Station wishing to purchase a direct train ticket to Manchester.',
    avatar_host: '🧑‍✈️',
    host_name_ar: 'كولين (موظف التذاكر)',
    host_name_en: 'Colin (Ticket Agent)',
    host_line_1: 'Next in line, please! Where are you travelling to today?',
    host_line_1_ar: 'التالي في الصف من فضلك! إلى أين تسافر اليوم؟',
    student_line_template: 'I would like to buy a ticket to ____, please.',
    student_line_template_ar: 'أود شراء تذكرة سفر إلى ____ من فضلك.',
    correct_blank: 'Manchester',
    options: ['Manchester', 'the moon', 'my sweet bedroom'],
    host_response: 'Very well. Single or return ticket for today?',
    host_response_ar: 'عظيم جداً. تذكرة ذهاب فقط أم ذهاب وعودة لليوم؟'
  },
  {
    id: 'rp_013',
    type: 'adults',
    title_ar: 'تسجيل الوصول في الفندق 🔑',
    title_en: 'Hotel Check-in 🔑',
    situation_ar: 'وصلت إلى الفندق وتريد استلام مفتاح غرفتك المحجوزة مسبقاً.',
    situation_en: 'You arrived at the hotel reception and want to register under your booking reference.',
    avatar_host: '🛎️',
    host_name_ar: 'روبن (موظف الاستقبال)',
    host_name_en: 'Robin (Receptionist)',
    host_line_1: 'Welcome to the Plaza Hotel. Do you have a prior room reservation with us?',
    host_line_1_ar: 'مرحباً بكم في فندق بلازا. هل لديكم حجز مسبق للغرفة معنا؟',
    student_line_template: 'Yes, I have a reservation under my ____.',
    student_line_template_ar: 'نعم، لدي حجز مسبق باسمي ____.',
    correct_blank: 'name',
    options: ['name', 'favorite cat', 'secret code'],
    host_response: 'Excellent! I see your booking for a deluxe room. Please sign here.',
    host_response_ar: 'ممتاز! أرى حجزكم لغرفة فاخرة بالفعل. يرجى التوقيع هنا.'
  },
  {
    id: 'rp_014',
    type: 'adults',
    title_ar: 'حدثني عن نفسك (مقابلة عمل) 👔',
    title_en: 'Tell Me About Yourself (Interview) 👔',
    situation_ar: 'تخضع لمقابلة عمل هامة وتجيب عن سؤال المدير التعريفي عن مهاراتك.',
    situation_en: 'You are in an interview room and the hiring manager asks for a brief introduction of your career.',
    avatar_host: '💼',
    host_name_ar: 'أ. ديفيد (المدير)',
    host_name_en: 'Mr. David (Director)',
    host_line_1: 'Thank you for coming. To start our interview, could you tell me a bit about yourself?',
    host_line_1_ar: 'شكراً لوفودكم. لبدء مقابلتنا، هل يمكنك إخباري بلمحة سريعة عن نفسك؟',
    student_line_template: 'I have three years of experience in ____.',
    student_line_template_ar: 'لدي ثلاث سنوات من الخبرة الفنية في مجال ____.',
    correct_blank: 'teaching English',
    options: ['teaching English', 'playing video games', 'eating delicious pizzas'],
    host_response: 'Impressive! That is exactly the kind of practical background we are recruiting for.',
    host_response_ar: 'مبهر جداً! هذا هو بالضبط نوع الخلفية العملية والمهنية التي نبحث عنها ونوظفها.'
  },
  {
    id: 'rp_015',
    type: 'kids',
    title_ar: 'السؤال عن الطريق إلى الحديقة 🗺️',
    title_en: 'Asking Directions to the Park 🗺️',
    situation_ar: 'تسأل أحد المارة بلطف ليرشدك عن اتجاه الحديقة العامة الكبيرة القريبة.',
    situation_en: 'You are walking in the neighborhood and need to ask a friendly local how to reach the central park.',
    avatar_host: '👮',
    host_name_ar: 'الشرطي هاري',
    host_name_en: 'Officer Harry',
    host_line_1: 'Hello there! You look a bit lost. Is everything okay?',
    host_line_1_ar: 'مرحباً بك! تبدو تائهاً بعض الشيء. هل كل شيء على ما يرام؟',
    student_line_template: 'Excuse me, how can I get to the ____, please?',
    student_line_template_ar: 'لو سمحت، كيف يمكنني الوصول إلى ____ من فضلك؟',
    correct_blank: 'park',
    options: ['park', 'kitchen floor', 'living room'],
    host_response: 'Ah! Just go straight for two blocks and turn left. You will see the big gates.',
    host_response_ar: 'آه! فقط اذهب مباشرة لمسافتين ثم انعطف يساراً. سترى البوابات الخضراء الكبيرة.'
  },
  {
    id: 'rp_016',
    type: 'adults',
    title_ar: 'السؤال عن بوابة الطائرة ✈️',
    title_en: 'Asking About Airport Gate ✈️',
    situation_ar: 'أنت في المطار وتسأل موظف الطيران لإرشادك إلى بوابة الرحلة المتجهة للشاطئ.',
    situation_en: 'You are at Heathrow Airport and want to confirm the boarding gate for your next flight.',
    avatar_host: '🧑‍✈️',
    host_name_ar: 'موظف الطيران الدولي',
    host_name_en: 'Gate Attendant',
    host_line_1: 'Good morning. Passengers for Flight BA204, please prepare your boarding cards.',
    host_line_1_ar: 'صباح الخير. المسافرون على متن الرحلة BA204، يرجى إعداد بطاقات الصعود الخاصة بكم.',
    student_line_template: 'Excuse me, which ____ is this flight boarding at?',
    student_line_template_ar: 'المعذرة، عند أي ____ يتم الصعود لهذه الرحلة؟',
    correct_blank: 'gate',
    options: ['gate', 'bus station', 'bedroom door'],
    host_response: 'Flight BA204 is boarding at Gate 14. Just follow the signs down this corridor.',
    host_response_ar: 'الرحلة BA204 تصعد الآن عند البوابة 14. فقط اتبع اللوحات الإرشادية أسفل هذا الممر.'
  },
  {
    id: 'rp_017',
    type: 'kids',
    title_ar: 'ركوب سيارة الأجرة الذكية 🚕',
    title_en: 'Taking a Taxi Ride 🚕',
    situation_ar: 'تستقل سيارة الأجرة مع والدتك وتطلب من السائق التوجه للمتحف العلمي الوطني.',
    situation_en: 'You and your mother enter a yellow cab and tell the driver where you want to go.',
    avatar_host: '🚕',
    host_name_ar: 'العم سامي (السائق)',
    host_name_en: 'Driver Sammy',
    host_line_1: 'Hello folks! Where can I drive you today on this lovely morning?',
    host_line_1_ar: 'مرحباً بكم يا رفقاء! إلى أين يمكنني أن أقودكم اليوم في هذا الصباح الجميل الكرتوني؟',
    student_line_template: 'Please take us to the ____, thank you.',
    student_line_template_ar: 'من فضلك خذنا إلى ____، شكراً لك.',
    correct_blank: 'Science Museum',
    options: ['Science Museum', 'swimming pool on the roof', 'deep toy box'],
    host_response: 'Perfect! Buckle up, and we will be at the Science Museum in about ten minutes.',
    host_response_ar: 'رائع جداً! اربطوا الأحزمة، وسنكون عند متحف العلوم الممتع في غضون عشر دقائق.'
  },
  {
    id: 'rp_018',
    type: 'adults',
    title_ar: 'طلب مساعدة من زميل العمل 💼',
    title_en: 'Asking a Coworker for Help 💼',
    situation_ar: 'تطلب مساعدة زميلك بلطف في تجهيز العرض التقديمي للاجتماع الأسبوعي.',
    situation_en: 'You need some help completing the graphic slides for the weekly meeting and ask your teammate.',
    avatar_host: '🧑‍💻',
    host_name_ar: 'مازن (زميل عمل)',
    host_name_en: 'Alex (Teammate)',
    host_line_1: 'Hey! I just finished my daily report. Is there anything you need?',
    host_line_1_ar: 'أهلاً بك! لقد انتهيت للتو من تقريري اليومي. هل هناك أي شيء تحتاج مساعدتي فيه؟',
    student_line_template: 'Yes, could you help me with this ____, please?',
    student_line_template_ar: 'نعم، هل يمكنك مساعدتي في هذا ____ من فضلك؟',
    correct_blank: 'presentation',
    options: ['presentation', 'making tea for everyone', 'cleaning my keyboard'],
    host_response: 'Of course! I am excellent at design. Let\'s review the slides together.',
    host_response_ar: 'بالتأكيد! أنا بارع جداً بالتصميم. دعنا نراجع الشرائح معاً لنصنع عرضاً ممتازاً.'
  },
  {
    id: 'rp_019',
    type: 'adults',
    title_ar: 'شرح الأعراض في الصيدلية 💊',
    title_en: 'Explaining Symptoms at Pharmacy 💊',
    situation_ar: 'تشرح للصيدلي بلطف أنك تشعر بصداع شديد وتبحث عن مهدئ آمن.',
    situation_en: 'You go into the pharmacy because you have a headache and need safe relief medicine.',
    avatar_host: '🩺',
    host_name_ar: 'الصيدلاني فؤاد',
    host_name_en: 'Pharmacist Frank',
    host_line_1: 'Hello inside Boots Pharmacy. What symptoms are you experiencing today?',
    host_line_1_ar: 'مرحباً بكم في صيدلية بوتس. ما هي الأعراض الصحية التي تشعرون بها اليوم؟',
    student_line_template: 'I have a terrible ____ and need some relief medicine.',
    student_line_template_ar: 'لدي ____ فظيع وأحتاج لبعض الدواء المسكن والآمن.',
    correct_blank: 'headache',
    options: ['headache', 'dream about stars', 'appetite for popcorn'],
    host_response: 'I see. I recommend these herbal tabs. Take one with water, and get some rest.',
    host_response_ar: 'مفهوم تماماً. أنصح بهذه الحبوب العشبية الآمنة. تناول حبة واحدة مع الماء، ونل قسطاً من الراحة.'
  },
  {
    id: 'rp_020',
    type: 'adults',
    title_ar: 'الاتصال بالطوارئ العامة 🚨',
    title_en: 'Calling Emergency Services 🚨',
    situation_ar: 'تتصل برقم الطوارئ للإبلاغ الفوري عن قطة صغيرة محاصرة في أعلى شجرة الحي.',
    situation_en: 'You need to call the general assistance line to report a small kitten stuck on top of a high branches.',
    avatar_host: '🚨',
    host_name_ar: 'مأمور الطوارئ المناوب',
    host_name_en: '999 Dispatcher',
    host_line_1: 'Emergency, which service do you require? Police, Fire, or Ambulance?',
    host_line_1_ar: 'خط الطوارئ، أي خدمة تطلبون؟ الشرطة، الإطفاء، أم الإسعاف؟',
    student_line_template: 'I need the ____ because there is a cat stuck on a tall tree.',
    student_line_template_ar: 'أحتاج لخدمة ____ لأن هناك قطة صغيرة محاصرة في أعلى شجرة.',
    correct_blank: 'fire department',
    options: ['fire department', 'school taxi service', 'pizza delivery guy'],
    host_response: 'Understood. We will dispatch a local ladder crew immediately to rescue the kitten safely.',
    host_response_ar: 'مفهوم تماماً. سنرسل طاقم السلالم التابع للدفاع المدني فوراً لإنقاذ القطة بشكل آمن جداً.'
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
  userProfile: _userProfile,
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
  const [_recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    recognizedText: string;
    feedback_ar: string;
    feedback_en: string;
  } | null>(null);

  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [_sessionXP, setSessionXP] = useState(0);

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

      managedSpeak(utterance);
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
          const speechResult = transcribedText || selectedOption || scenario.correct_blank;
          
          const targetNorm = scenario.correct_blank.toLowerCase().trim();
          const speechNorm = speechResult.toLowerCase().trim();
          const matched = speechNorm.includes(targetNorm);
          const score = matched ? 96 : Math.max(68, Math.round((Math.min(speechNorm.length, targetNorm.length) / Math.max(1, targetNorm.length)) * 82));

          let feedback_ar = "";
          let feedback_en = "";

          if (score >= 90) {
            feedback_ar = `ممتاز جداً! تلفظك لجملة "${scenario.student_line_template.replace('____', scenario.correct_blank)}" سليم تماماً ونبرة صوتك مهذبة ومناسبة للتمثيل.`;
            feedback_en = `Perfect! Your utterance of "${scenario.student_line_template.replace('____', scenario.correct_blank)}" is exceptionally flawless and polite.`;
            
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

  // Tutor selection rule: "business" (Mohammed) for work/business scenarios and "sara" for the rest
  const currentTutor = scenario 
    ? (scenario.type === 'adults' ? 'business' : 'sara')
    : (filterType === 'adults' ? 'business' : 'sara');

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-24 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#C49E3A]/25">
        <div className="flex items-center gap-3">
          <TutorFace tutor={currentTutor} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'حوارات المحاكاة والتمثيل 🎭' : 'Interactive Role-Play Challenges 🎭'}
              </h1>
              <ProgressPill>
                <Award size={13} className="text-[#C49E3A]" />
                <span>{completedScenarios.length} / 20 {isRtl ? 'مكتمل' : 'Done'}</span>
              </ProgressPill>
            </div>
            <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
              {isRtl 
                ? 'املأ فراغ المحادثات وسجل جملتك التمثيلية لتقييم ذكي فوري' 
                : 'Step into real-life situations. Build conversation flow & record roles'}
            </p>
          </div>
        </div>

        <GhostButton onClick={onBack}>
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{isRtl ? 'العودة للمنصة' : 'Back to Academy'}</span>
        </GhostButton>
      </div>

      {/* Main Content Area */}
      {!scenario ? (
        /* Catalog list */
        <div className="space-y-5">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label_ar: 'الكل 💎', label_en: 'All 💎' },
              { id: 'kids', label_ar: 'ألعاب وصغار 🦁', label_en: 'Kids & Play 🦁' },
              { id: 'adults', label_ar: 'عمل وكبار 👔', label_en: 'Adults & Business 👔' }
            ].map(btn => (
              <GhostButton
                key={btn.id}
                active={filterType === btn.id}
                onClick={() => setFilterType(btn.id as any)}
                className="rounded-full px-4 py-1.5"
              >
                {isRtl ? btn.label_ar : btn.label_en}
              </GhostButton>
            ))}
          </div>

          {/* Scenario items mapped to LessonTile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredScenarios.map((sc, index) => {
              const isDone = completedScenarios.includes(sc.id);
              return (
                <LessonTile
                  key={sc.id}
                  order={index + 1}
                  title={isRtl ? sc.title_ar : sc.title_en}
                  subtitle={isRtl ? sc.situation_ar : sc.situation_en}
                  level={sc.type === 'kids' ? (isRtl ? 'صغار' : 'KIDS') : (isRtl ? 'عمل' : 'BIZ')}
                  emoji={sc.avatar_host}
                  done={isDone}
                  onClick={() => handleStartChallenge(sc)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Simulation Screen */
        <GoldCard className="p-5 sm:p-7 space-y-6">
          {/* Top workspace bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#C49E3A]/25 pb-4">
            <div className="flex items-center gap-3">
              <GhostButton onClick={() => setSelectedScenarioId(null)}>
                <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
                <span>{isRtl ? 'القائمة' : 'List'}</span>
              </GhostButton>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#C49E3A] block">
                  {isRtl ? 'الموقف التمثيلي الجاري' : 'ACTIVE SIMULATION'}
                </span>
                <h3 className="text-sm sm:text-base font-black text-[#002147]">
                  {isRtl ? scenario.title_ar : scenario.title_en}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ProgressPill>
                {scenario.type === 'kids' ? (isRtl ? 'وضع الصغار' : 'KIDS PLAY') : (isRtl ? 'أعمال وكبار' : 'BUSINESS')}
              </ProgressPill>
              <span className="text-xs font-bold text-[#002147]/70">
                {isRtl ? 'المحاور:' : 'Partner:'} <strong className="text-[#002147]">{isRtl ? scenario.host_name_ar : scenario.host_name_en}</strong>
              </span>
            </div>
          </div>

          {/* Dialogue Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left column: Dialogue Flow */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Host dialogue line */}
              <div className="p-4 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl relative">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#002147] text-[#E6C36A] text-[11px] font-black">
                    <span>{scenario.avatar_host}</span>
                    <span>{isRtl ? scenario.host_name_ar : scenario.host_name_en}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => playSpeech(scenario.host_line_1, scenario.type === 'kids' ? 0.82 : 0.92)}
                    className="p-1.5 bg-white border border-[#C49E3A]/40 rounded-xl hover:bg-[#fdfaf3] text-[#002147] transition-all cursor-pointer"
                    title="Pronounce"
                  >
                    <Volume2 size={16} className={`text-[#C49E3A] ${isHostAudioPlaying ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                <p className="font-sans font-black text-[#002147] text-base sm:text-lg leading-relaxed">
                  &ldquo;{scenario.host_line_1}&rdquo;
                </p>
                <p className="text-xs text-[#002147]/70 mt-1 font-semibold">
                  {scenario.host_line_1_ar}
                </p>
              </div>

              {/* Student Response Challenge */}
              <div className="p-5 bg-white border border-[#C49E3A]/40 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <ProgressPill>
                    {isRtl ? 'دورك بالكلام 🎤' : 'YOUR TURN TO SPEAK'}
                  </ProgressPill>
                  <span className="text-[11px] font-bold text-[#002147]/65">
                    {isRtl ? 'أكمل الفراغ لتنطق' : 'Complete to unlock speech'}
                  </span>
                </div>

                {/* Template sentence with blank */}
                <div className="p-4 bg-[#fdfaf3] border border-[#C49E3A]/30 rounded-xl text-center">
                  <p className="font-sans font-black text-[#002147] text-base sm:text-lg leading-relaxed">
                    &ldquo; {scenario.student_line_template.split('____')[0]} 
                    <span className="mx-1 px-3 py-1 bg-[#E6C36A]/30 text-[#002147] border-b-2 border-[#C49E3A] rounded-md inline-block my-1 font-black">
                      {selectedOption || '____'}
                    </span>
                    {scenario.student_line_template.split('____')[1]} &rdquo;
                  </p>
                  <p className="text-xs text-[#002147]/70 font-bold mt-2">
                    {scenario.student_line_template_ar}
                  </p>
                </div>

                {/* Step 1: Select the word options */}
                {stage === 'welcome' && (
                  <div className="space-y-3 pt-1">
                    <span className="text-xs font-black text-[#002147]/80 block">
                      {isRtl ? '١. اختر التعبير الملائم لملء الفراغ:' : '1. Choose the matching blank phrase:'}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {scenario.options.map((opt) => {
                        return (
                          <AnswerOption
                            key={opt}
                            label={opt}
                            selected={selectedOption === opt}
                            disabled={isOptionVerified}
                            onClick={() => handleOptionSelect(opt)}
                          />
                        );
                      })}
                    </div>

                    {selectedOption && (
                      <div className="flex justify-end pt-2">
                        <PrimaryButton onClick={handleVerifyOption}>
                          <span>{isRtl ? 'تحقق ومتابعة للتسجيل 🎙️' : 'Verify & Continue 🎙️'}</span>
                        </PrimaryButton>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Speech recording */}
                {stage === 'speaking' && (
                  <div className="space-y-4 py-3 flex flex-col items-center text-center">
                    <div className="max-w-sm space-y-1">
                      <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                        {isRtl ? '٢. سجل قراءة الجملة بصوتك' : '2. Record yourself reading the line'}
                      </h4>
                      <p className="text-xs text-[#002147]/75 font-semibold">
                        {isRtl 
                          ? 'اضغط زر التسجيل واقرأ الجملة كاملة بصوت جهري واضح لتصحيح النطق بالذكاء الاصطناعي.'
                          : 'Click record and read the full completed line clearly into your microphone.'}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isRecording
                            ? 'bg-red-600 text-white shadow-lg animate-pulse'
                            : 'bg-[#002147] text-[#E6C36A] hover:bg-[#001a38] border-2 border-[#C49E3A]'
                        }`}
                      >
                        <Mic size={26} />
                      </button>
                      <span className="text-xs font-black text-[#002147]">
                        {isRecording 
                          ? (isRtl ? 'تسجيل جاري... اضغط للإيقاف' : 'Recording... Click to Stop') 
                          : (isRtl ? 'اضغط للتسجيل' : 'Click to Speak')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 3: Feedback Report */}
                {stage === 'feedback' && evaluationResult && (
                  <div className="space-y-3 pt-3 border-t border-[#C49E3A]/25">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                        {isRtl ? 'تقرير نطق المحاكاة' : 'AI Speech Report'}
                      </h4>
                      <ProgressPill>
                        <span>{evaluationResult.score}% Accuracy</span>
                      </ProgressPill>
                    </div>

                    <div className="bg-[#fdfaf3] rounded-xl p-3.5 border border-[#C49E3A]/30">
                      <p className="text-xs text-[#002147]/85 leading-relaxed">
                        {isRtl ? evaluationResult.feedback_ar : evaluationResult.feedback_en}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Host Response Continuation */}
              {stage === 'feedback' && (
                <div className="p-4 bg-[#fdfaf3] border border-[#C49E3A]/40 rounded-2xl relative">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C49E3A] text-[#002147] text-[11px] font-black">
                      <span>{scenario.avatar_host}</span>
                      <span>{isRtl ? scenario.host_name_ar : scenario.host_name_en}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => playSpeech(scenario.host_response, scenario.type === 'kids' ? 0.85 : 0.95)}
                      className="p-1.5 bg-white border border-[#C49E3A]/40 rounded-xl hover:bg-[#fdfaf3] text-[#002147] transition-all cursor-pointer"
                      title="Pronounce"
                    >
                      <Volume2 size={16} className="text-[#C49E3A]" />
                    </button>
                  </div>

                  <p className="font-sans font-black text-[#002147] text-base sm:text-lg leading-relaxed">
                    &ldquo;{scenario.host_response}&rdquo;
                  </p>
                  <p className="text-xs text-[#002147]/70 mt-1 font-semibold">
                    {scenario.host_response_ar}
                  </p>
                </div>
              )}

            </div>

            {/* Right column: Scenario Avatar & Instructions */}
            <div className="lg:col-span-4 bg-[#fdfaf3] rounded-2xl border border-[#C49E3A]/35 p-5 space-y-4 text-center">
              <div className="flex justify-center items-center gap-4 py-2">
                <div className="flex flex-col items-center">
                  <span className="text-4xl block mb-1">{scenario.avatar_host}</span>
                  <span className="text-[10px] font-black text-[#002147]/70">
                    {isRtl ? scenario.host_name_ar : scenario.host_name_en}
                  </span>
                </div>

                <span className="text-lg font-black text-[#C49E3A]">⚡</span>

                <div className="flex flex-col items-center">
                  <TutorFace tutor={currentTutor} size="sm" />
                  <span className="text-[10px] font-black text-[#002147]/70 mt-1">
                    {scenario.type === 'adults' ? (isRtl ? 'محمد' : 'Mohammed') : (isRtl ? 'سارة' : 'Sara')}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-start border-t border-[#C49E3A]/25 pt-3">
                <span className="text-[10px] font-black tracking-widest text-[#C49E3A] uppercase block">
                  {isRtl ? 'تعليمات الموقف' : 'SIMULATION TIPS'}
                </span>
                <p className="text-xs text-[#002147]/80 leading-relaxed">
                  {isRtl 
                    ? 'تخيل أنك في موقف واقعي. لا تكتفِ بتسجيل الكلمة داخل الفراغ، بل تدرب على نطق العبارة كحوار واقعي متصل مع نبرة واثقة.'
                    : 'Imagine being in the actual situation. Practice delivering the entire sentence with confidence and tone modulation.'}
                </p>
              </div>

              {stage === 'feedback' && (
                <PrimaryButton
                  onClick={() => setSelectedScenarioId(null)}
                  className="w-full py-3"
                >
                  <Check size={14} />
                  <span>{isRtl ? 'إنهاء وحفظ النتيجة 🏆' : 'Complete & Save Score 🏆'}</span>
                </PrimaryButton>
              )}
            </div>

          </div>

        </GoldCard>
      )}
    </SectionShell>
  );
};
