/** Everyday English — Level 1: 30 real-life scenarios (hand-written). Sara plays the staff/other person (A); the student is B. */
export interface SaraDailyLine { sp: 'A' | 'B'; en: string; ar: string }
export interface SaraDailyLesson { id: string; order: number; levelId: 'a' | 'b' | 'c' | 'd'; titleAr: string; titleEn: string; icon: string; introAr: string; phrases: { en: string; ar: string }[]; dialogue: SaraDailyLine[] }
type R = [string, string, string, string, [string, string][], ['A' | 'B', string, string][]];
const RAW: R[] = [
[
"في المطار: تسجيل الدخول",
"At the Airport: Check-in",
"🛫",
"عند كاونتر الطيران يطلبون جوازك ويسألون عن الشنط. أهم العبارات: I'd like to check in للتسجيل، و window seat أو aisle seat لاختيار المقعد، و boarding pass بطاقة الصعود.",
[
[
"I'd like to check in, please.",
"أبي أسجّل دخول الرحلة لو سمحت."
],
[
"Can I have a window seat?",
"ممكن مقعد جنب الشباك؟"
],
[
"How many bags can I take?",
"كم شنطة أقدر آخذ؟"
],
[
"Here is your boarding pass.",
"تفضل بطاقة الصعود."
]
],
[
[
"A",
"Good morning. Passport, please.",
"صباح الخير. الجواز لو سمحت."
],
[
"B",
"Here you are. I'd like to check in, please.",
"تفضلي. أبي أسجّل دخول الرحلة."
],
[
"A",
"Window or aisle seat?",
"شباك ولا ممر؟"
],
[
"B",
"A window seat, please.",
"شباك لو سمحتي."
]
]
],
[
"في المطار: الجوازات والجمارك",
"Passport Control",
"🛂",
"موظف الجوازات يسأل عن سبب الزيارة ومدتها ومكان السكن. جاوب بجمل قصيرة وواضحة: I'm here on holiday، و for two weeks.",
[
[
"What is the purpose of your visit?",
"وش سبب زيارتك؟"
],
[
"I'm here on holiday.",
"أنا هنا للسياحة."
],
[
"How long are you staying?",
"كم مدة إقامتك؟"
],
[
"I'm staying at a hotel.",
"ساكن في فندق."
]
],
[
[
"A",
"What is the purpose of your visit?",
"وش سبب زيارتك؟"
],
[
"B",
"I'm here on holiday.",
"أنا هنا للسياحة."
],
[
"A",
"How long are you staying?",
"كم بتجلس؟"
],
[
"B",
"For two weeks.",
"أسبوعين."
]
]
],
[
"في الطائرة",
"On the Plane",
"💺",
"المضيفة تعرض الأكل والشرب وتطلب ربط الحزام. تقدر تطلب بأدب: Could I have some water? وتسأل: Can I change seats?",
[
[
"Could I have some water, please?",
"ممكن موية لو سمحتي؟"
],
[
"Chicken or fish?",
"دجاج ولا سمك؟"
],
[
"Please fasten your seatbelt.",
"اربط الحزام لو سمحت."
],
[
"Excuse me, is this seat free?",
"لو سمحت، هذا المقعد فاضي؟"
]
],
[
[
"A",
"Would you like chicken or fish?",
"تبي دجاج ولا سمك؟"
],
[
"B",
"Chicken, please.",
"دجاج لو سمحتي."
],
[
"A",
"Anything to drink?",
"تبي شي تشربه؟"
],
[
"B",
"Could I have some water, please?",
"ممكن موية لو سمحتي؟"
]
]
],
[
"استلام الشنط المفقودة",
"Lost Luggage",
"🧳",
"إذا ضاعت شنطتك روح لمكتب الأمتعة وقل: My bag didn't arrive. بيطلبون رقم الرحلة ووصف الشنطة: لونها وحجمها.",
[
[
"My bag didn't arrive.",
"شنطتي ما وصلت."
],
[
"What does it look like?",
"كيف شكلها؟"
],
[
"It's a big black suitcase.",
"شنطة سفر سوداء كبيرة."
],
[
"Here is my flight number.",
"هذا رقم رحلتي."
]
],
[
[
"A",
"How can I help you?",
"كيف أقدر أساعدك؟"
],
[
"B",
"My bag didn't arrive.",
"شنطتي ما وصلت."
],
[
"A",
"What does it look like?",
"كيف شكلها؟"
],
[
"B",
"It's a big black suitcase.",
"شنطة سفر سوداء كبيرة."
]
]
],
[
"في الفندق: تسجيل الوصول",
"Hotel Check-in",
"🏨",
"في الاستقبال قل: I have a reservation وبعدها اسمك. واسأل عن الفطور والواي فاي: What time is breakfast? و What's the Wi-Fi password?",
[
[
"I have a reservation.",
"عندي حجز."
],
[
"What time is breakfast?",
"متى الفطور؟"
],
[
"What's the Wi-Fi password?",
"وش رمز الواي فاي؟"
],
[
"Here is your room key.",
"تفضل مفتاح غرفتك."
]
],
[
[
"A",
"Good evening. How can I help?",
"مساء الخير. كيف أساعدك؟"
],
[
"B",
"I have a reservation. My name is Ahmed.",
"عندي حجز. اسمي أحمد."
],
[
"A",
"Room 305. Here is your key.",
"غرفة ٣٠٥. تفضل المفتاح."
],
[
"B",
"Thank you. What time is breakfast?",
"شكرًا. متى الفطور؟"
]
]
],
[
"في الفندق: مشكلة في الغرفة",
"Hotel Room Problem",
"🔧",
"إذا فيه مشكلة اتصل بالاستقبال وقل وش الخربان: The air conditioner isn't working. واطلب: Could you send someone? أو Can I change rooms?",
[
[
"The air conditioner isn't working.",
"المكيف خربان."
],
[
"Could you send someone, please?",
"ممكن ترسلون أحد؟"
],
[
"Can I change rooms?",
"أقدر أغيّر الغرفة؟"
],
[
"I need more towels.",
"أحتاج مناشف زيادة."
]
],
[
[
"A",
"Reception, how can I help?",
"الاستقبال، كيف أساعدك؟"
],
[
"B",
"The air conditioner isn't working.",
"المكيف ما يشتغل."
],
[
"A",
"I'm sorry. I'll send someone now.",
"آسفين. بنرسل أحد الحين."
],
[
"B",
"Thank you. I also need more towels.",
"شكرًا. وأحتاج مناشف زيادة بعد."
]
]
],
[
"في المطعم: الطلب",
"Restaurant: Ordering",
"🍽️",
"الجرسون يسأل: Are you ready to order? قل I'd like... بدل I want لأنها ألطف. واسأل: What do you recommend? يعني وش تنصحني؟",
[
[
"A table for two, please.",
"طاولة لشخصين لو سمحت."
],
[
"I'd like the grilled chicken.",
"أبي الدجاج المشوي."
],
[
"What do you recommend?",
"وش تنصحني؟"
],
[
"Can I see the menu?",
"ممكن أشوف المنيو؟"
]
],
[
[
"A",
"Are you ready to order?",
"جاهز تطلب؟"
],
[
"B",
"What do you recommend?",
"وش تنصحني؟"
],
[
"A",
"The grilled fish is very good.",
"السمك المشوي ممتاز."
],
[
"B",
"OK, I'd like the grilled fish, please.",
"طيب، أبي السمك المشوي لو سمحت."
]
]
],
[
"في المطعم: الحساب",
"Restaurant: The Bill",
"🧾",
"في آخر الوجبة قل: Could I have the bill, please? وإذا تبي تدفع بالبطاقة: Can I pay by card? وإذا الحساب غلط: I think there's a mistake.",
[
[
"Could I have the bill, please?",
"ممكن الحساب لو سمحت؟"
],
[
"Can I pay by card?",
"أقدر أدفع بالبطاقة؟"
],
[
"I think there's a mistake.",
"أظن فيه غلط."
],
[
"Keep the change.",
"خلّ الباقي لك."
]
],
[
[
"A",
"Would you like anything else?",
"تبي شي ثاني؟"
],
[
"B",
"No, thanks. Could I have the bill, please?",
"لا شكرًا. ممكن الحساب؟"
],
[
"A",
"Here you are. Cash or card?",
"تفضل. كاش ولا بطاقة؟"
],
[
"B",
"Can I pay by card?",
"أقدر أدفع بالبطاقة؟"
]
]
],
[
"في المقهى",
"At the Café",
"☕",
"في الكوفي تطلب الحجم والنوع: A large latte, please. ويسألونك: For here or to go? يعني هنا ولا سفري.",
[
[
"A large latte, please.",
"لاتيه كبير لو سمحت."
],
[
"For here or to go?",
"هنا ولا سفري؟"
],
[
"To go, please.",
"سفري لو سمحت."
],
[
"No sugar, please.",
"بدون سكر لو سمحت."
]
],
[
[
"A",
"Hi! What can I get you?",
"هلا! وش أجيب لك؟"
],
[
"B",
"A large latte, please. No sugar.",
"لاتيه كبير لو سمحت، بدون سكر."
],
[
"A",
"For here or to go?",
"هنا ولا سفري؟"
],
[
"B",
"To go, please.",
"سفري لو سمحت."
]
]
],
[
"عند الطبيب",
"At the Doctor",
"🩺",
"الطبيب يسأل: What's the problem? وصف الألم: I have a headache أو I have a fever، وقل من متى: since yesterday أو for three days.",
[
[
"I don't feel well.",
"ما أحس إني بخير."
],
[
"I have a fever.",
"عندي حرارة."
],
[
"It started yesterday.",
"بدأ أمس."
],
[
"Do I need medicine?",
"أحتاج دواء؟"
]
],
[
[
"A",
"What seems to be the problem?",
"وش المشكلة؟"
],
[
"B",
"I have a fever and a headache.",
"عندي حرارة وصداع."
],
[
"A",
"How long have you had it?",
"من متى؟"
],
[
"B",
"It started yesterday.",
"بدأ أمس."
]
]
],
[
"في الصيدلية",
"At the Pharmacy",
"💊",
"في الصيدلية اطلب الدواء أو قل الأعراض: Do you have something for a cough? واسأل عن الجرعة: How often should I take it?",
[
[
"Do you have something for a cough?",
"عندكم شي للكحة؟"
],
[
"How often should I take it?",
"كم مرة آخذه؟"
],
[
"Twice a day after meals.",
"مرتين باليوم بعد الأكل."
],
[
"Do I need a prescription?",
"أحتاج وصفة طبية؟"
]
],
[
[
"A",
"Can I help you?",
"أقدر أساعدك؟"
],
[
"B",
"Do you have something for a cough?",
"عندكم شي للكحة؟"
],
[
"A",
"Yes, try this syrup.",
"إيه، جرّب هذا الشراب."
],
[
"B",
"How often should I take it?",
"كم مرة آخذه؟"
]
]
],
[
"في الطوارئ",
"Emergencies",
"🚨",
"في الطوارئ تكلّم بسرعة ووضوح: Help! و Call an ambulance! وقل وين أنت: I'm on King Fahd Road. رقم الطوارئ في السعودية 911.",
[
[
"Help!",
"الحقوا!/ساعدوني!"
],
[
"Call an ambulance!",
"اتصلوا بالإسعاف!"
],
[
"There's been an accident.",
"صار حادث."
],
[
"Is anyone hurt?",
"فيه أحد متأذي؟"
]
],
[
[
"A",
"Emergency. What's happened?",
"الطوارئ. وش صار؟"
],
[
"B",
"There's been an accident.",
"صار حادث."
],
[
"A",
"Is anyone hurt?",
"فيه أحد متأذي؟"
],
[
"B",
"Yes, please send an ambulance.",
"إيه، أرسلوا إسعاف لو سمحتوا."
]
]
],
[
"التسوق: الملابس",
"Shopping for Clothes",
"👕",
"في محل الملابس اسأل عن المقاس: Do you have this in medium? وقبل لا تشتري: Can I try it on? يعني أقدر أقيسه؟",
[
[
"Can I try it on?",
"أقدر أقيسه؟"
],
[
"Do you have this in medium?",
"عندكم منه مقاس وسط؟"
],
[
"Where is the fitting room?",
"وين غرفة القياس؟"
],
[
"It's too small.",
"صغير مرة."
]
],
[
[
"A",
"Can I help you?",
"أساعدك بشي؟"
],
[
"B",
"Do you have this shirt in medium?",
"عندكم هالقميص مقاس وسط؟"
],
[
"A",
"Yes, here you are.",
"إيه، تفضل."
],
[
"B",
"Thanks. Can I try it on?",
"شكرًا. أقدر أقيسه؟"
]
]
],
[
"التسوق: السعر والإرجاع",
"Prices & Returns",
"🏷️",
"اسأل عن السعر: How much is this? وإذا تبي ترجّع شي: I'd like to return this. بيطلبون منك الفاتورة: receipt.",
[
[
"How much is this?",
"بكم هذا؟"
],
[
"Is there a discount?",
"فيه خصم؟"
],
[
"I'd like to return this.",
"أبي أرجّع هذا."
],
[
"Here is my receipt.",
"هذي فاتورتي."
]
],
[
[
"A",
"Hello. How can I help?",
"هلا. كيف أساعدك؟"
],
[
"B",
"I'd like to return this, please.",
"أبي أرجّع هذا لو سمحت."
],
[
"A",
"Do you have the receipt?",
"معك الفاتورة؟"
],
[
"B",
"Yes, here is my receipt.",
"إيه، هذي الفاتورة."
]
]
],
[
"في السوبرماركت",
"At the Supermarket",
"🛒",
"إذا ما لقيت شي اسأل: Where can I find the milk? والموظف يقول: In aisle 5 يعني في الممر الخامس. وعند الكاشير: Do you need a bag?",
[
[
"Where can I find the milk?",
"وين ألقى الحليب؟"
],
[
"It's in aisle five.",
"في الممر الخامس."
],
[
"Do you need a bag?",
"تحتاج كيس؟"
],
[
"That's all, thanks.",
"بس كذا، شكرًا."
]
],
[
[
"A",
"Excuse me, can I help you?",
"لو سمحت، أساعدك؟"
],
[
"B",
"Yes. Where can I find the milk?",
"إيه. وين ألقى الحليب؟"
],
[
"A",
"It's in aisle five.",
"في الممر الخامس."
],
[
"B",
"Thank you very much.",
"شكرًا جزيلًا."
]
]
],
[
"في التاكسي",
"In a Taxi",
"🚕",
"قل وين تبي تروح: To the airport, please. واسأل: How much will it cost? و How long will it take? وإذا تبي تنزل: Please stop here.",
[
[
"To the airport, please.",
"للمطار لو سمحت."
],
[
"How much will it cost?",
"كم بتكلف؟"
],
[
"How long will it take?",
"كم ياخذ وقت؟"
],
[
"Please stop here.",
"وقّف هنا لو سمحت."
]
],
[
[
"A",
"Where to?",
"وين؟"
],
[
"B",
"To the airport, please.",
"للمطار لو سمحت."
],
[
"A",
"OK. It takes about thirty minutes.",
"طيب. ياخذ حوالي نص ساعة."
],
[
"B",
"How much will it cost?",
"كم بتكلف؟"
]
]
],
[
"السؤال عن الطريق",
"Asking for Directions",
"🧭",
"اسأل بأدب: Excuse me, how do I get to the museum? وانتبه للاتجاهات: turn left، go straight، it's on your right.",
[
[
"How do I get to the museum?",
"كيف أوصل للمتحف؟"
],
[
"Go straight and turn left.",
"روح على طول ولف يسار."
],
[
"It's on your right.",
"على يمينك."
],
[
"Is it far from here?",
"بعيد من هنا؟"
]
],
[
[
"A",
"Can I help you?",
"أساعدك؟"
],
[
"B",
"Excuse me, how do I get to the museum?",
"لو سمحت، كيف أوصل للمتحف؟"
],
[
"A",
"Go straight and turn left. It's on your right.",
"روح على طول ولف يسار، بيكون على يمينك."
],
[
"B",
"Is it far from here?",
"بعيد من هنا؟"
]
]
],
[
"في البنك",
"At the Bank",
"🏦",
"في البنك قل وش تبي: I'd like to open an account أو I want to transfer money. بيطلبون هويتك: ID.",
[
[
"I'd like to open an account.",
"أبي أفتح حساب."
],
[
"I want to transfer money.",
"أبي أحوّل فلوس."
],
[
"Can I see your ID?",
"ممكن هويتك؟"
],
[
"My card isn't working.",
"بطاقتي ما تشتغل."
]
],
[
[
"A",
"Good morning. How can I help?",
"صباح الخير. كيف أساعدك؟"
],
[
"B",
"I'd like to open an account.",
"أبي أفتح حساب."
],
[
"A",
"Sure. Can I see your ID?",
"أكيد. ممكن هويتك؟"
],
[
"B",
"Here you are.",
"تفضلي."
]
]
],
[
"في المدرسة: أول يوم",
"First Day at School",
"🏫",
"في أول يوم عرّف بنفسك واسأل: Where is my classroom? وإذا ما فهمت قل للمعلم: Could you repeat that, please?",
[
[
"Where is my classroom?",
"وين فصلي؟"
],
[
"I'm new here.",
"أنا جديد هنا."
],
[
"Could you repeat that, please?",
"ممكن تعيد لو سمحت؟"
],
[
"May I go to the bathroom?",
"ممكن أروح الحمّام؟"
]
],
[
[
"A",
"Hi! Are you new here?",
"هلا! أنت جديد؟"
],
[
"B",
"Yes, I'm new here. Where is my classroom?",
"إيه، أنا جديد. وين فصلي؟"
],
[
"A",
"It's room 12, next to the library.",
"غرفة ١٢، جنب المكتبة."
],
[
"B",
"Thank you!",
"شكرًا!"
]
]
],
[
"مقابلة عمل: التعريف بنفسك",
"Job Interview: About You",
"💼",
"أول سؤال غالبًا: Tell me about yourself. جاوب عن دراستك وخبرتك باختصار: I studied... و I have two years of experience in...",
[
[
"Tell me about yourself.",
"كلمني عن نفسك."
],
[
"I studied computer science.",
"درست علوم حاسب."
],
[
"I have two years of experience.",
"عندي خبرة سنتين."
],
[
"I'm good at working in a team.",
"أنا شاطر في العمل الجماعي."
]
],
[
[
"A",
"Tell me about yourself.",
"كلمني عن نفسك."
],
[
"B",
"I studied computer science, and I have two years of experience.",
"درست علوم حاسب، وعندي خبرة سنتين."
],
[
"A",
"What are your strengths?",
"وش نقاط قوتك؟"
],
[
"B",
"I'm good at working in a team.",
"أنا شاطر في العمل الجماعي."
]
]
],
[
"مقابلة عمل: الأسئلة الأخيرة",
"Job Interview: Final Questions",
"🤝",
"في آخر المقابلة يسألونك: Do you have any questions? اسأل سؤال ذكي: What are the working hours? وودّعهم: Thank you for your time.",
[
[
"Do you have any questions?",
"عندك أسئلة؟"
],
[
"What are the working hours?",
"وش ساعات الدوام؟"
],
[
"When can you start?",
"متى تقدر تبدأ؟"
],
[
"Thank you for your time.",
"شكرًا على وقتك."
]
],
[
[
"A",
"Do you have any questions?",
"عندك أي أسئلة؟"
],
[
"B",
"Yes. What are the working hours?",
"إيه. وش ساعات الدوام؟"
],
[
"A",
"From eight to four. When can you start?",
"من ثمانية لأربعة. متى تقدر تبدأ؟"
],
[
"B",
"Next month. Thank you for your time.",
"الشهر الجاي. شكرًا على وقتك."
]
]
],
[
"مكالمة هاتفية: حجز موعد",
"Phone: Booking an Appointment",
"📞",
"في الجوال عرّف بنفسك: Hello, this is Sara. واطلب: I'd like to book an appointment. وإذا الوقت ما يناسب: Is Tuesday OK?",
[
[
"I'd like to book an appointment.",
"أبي أحجز موعد."
],
[
"Is Tuesday OK?",
"يناسب الثلاثاء؟"
],
[
"What time is good for you?",
"أي وقت يناسبك؟"
],
[
"See you then.",
"نشوفك وقتها."
]
],
[
[
"A",
"Hello, Smile Dental Clinic.",
"ألو، عيادة سمايل للأسنان."
],
[
"B",
"Hello. I'd like to book an appointment.",
"هلا. أبي أحجز موعد."
],
[
"A",
"Is Tuesday at ten OK?",
"يناسبك الثلاثاء الساعة عشر؟"
],
[
"B",
"Yes, that's fine. See you then.",
"إيه، تمام. نشوفكم وقتها."
]
]
],
[
"مكالمة هاتفية: ترك رسالة",
"Phone: Leaving a Message",
"☎️",
"إذا الشخص مو موجود قل: Can I leave a message? وعط اسمك ورقمك: Please ask him to call me back.",
[
[
"Can I speak to Mr. Khalid?",
"أقدر أكلم أستاذ خالد؟"
],
[
"He's not here right now.",
"مو موجود الحين."
],
[
"Can I leave a message?",
"أقدر أترك رسالة؟"
],
[
"Please ask him to call me back.",
"خلّه يتصل فيني لو سمحت."
]
],
[
[
"A",
"Good morning, ABC Company.",
"صباح الخير، شركة ABC."
],
[
"B",
"Can I speak to Mr. Khalid, please?",
"أقدر أكلم أستاذ خالد لو سمحتي؟"
],
[
"A",
"Sorry, he's not here right now.",
"آسفة، مو موجود الحين."
],
[
"B",
"Can I leave a message? Please ask him to call me back.",
"أقدر أترك رسالة؟ خلّيه يتصل فيني."
]
]
],
[
"تأجير سيارة",
"Renting a Car",
"🚗",
"في مكتب التأجير قل: I'd like to rent a car for three days. واسأل: Is insurance included? وبيطلبون رخصة القيادة: driving licence.",
[
[
"I'd like to rent a car.",
"أبي أستأجر سيارة."
],
[
"For three days.",
"لمدة ثلاث أيام."
],
[
"Is insurance included?",
"التأمين داخل؟"
],
[
"Here is my driving licence.",
"هذي رخصة القيادة."
]
],
[
[
"A",
"How can I help you?",
"كيف أساعدك؟"
],
[
"B",
"I'd like to rent a car for three days.",
"أبي أستأجر سيارة ثلاث أيام."
],
[
"A",
"Sure. Can I see your driving licence?",
"أكيد. ممكن رخصة القيادة؟"
],
[
"B",
"Here you are. Is insurance included?",
"تفضلي. التأمين داخل؟"
]
]
],
[
"عند الحلاق",
"At the Barber",
"💈",
"قل للحلاق وش تبي: Just a trim, please يعني تخفيف بس، أو Short on the sides. وإذا تبي تشوف: Can I see it?",
[
[
"Just a trim, please.",
"تخفيف بس لو سمحت."
],
[
"Short on the sides.",
"قصير على الجوانب."
],
[
"Not too short.",
"مو قصير مرة."
],
[
"How much is a haircut?",
"بكم الحلاقة؟"
]
],
[
[
"A",
"What would you like today?",
"وش تبي اليوم؟"
],
[
"B",
"Just a trim, please. Not too short.",
"تخفيف بس لو سمحت، مو قصير مرة."
],
[
"A",
"And the sides?",
"والجوانب؟"
],
[
"B",
"Short on the sides, please.",
"قصير على الجوانب لو سمحت."
]
]
],
[
"في الصالة الرياضية",
"At the Gym",
"🏋️",
"إذا تبي تشترك قل: I'd like to join the gym. واسأل: How much is a monthly membership? و Can someone show me how to use this?",
[
[
"I'd like to join the gym.",
"أبي أشترك في النادي."
],
[
"How much is a monthly membership?",
"بكم الاشتراك الشهري؟"
],
[
"Can you show me how to use this?",
"ممكن توريني كيف أستخدم هذا؟"
],
[
"What time do you close?",
"متى تسكرون؟"
]
],
[
[
"A",
"Hi! Can I help you?",
"هلا! أساعدك؟"
],
[
"B",
"I'd like to join the gym. How much is a monthly membership?",
"أبي أشترك. بكم الشهري؟"
],
[
"A",
"It's two hundred riyals.",
"بمئتين ريال."
],
[
"B",
"OK. What time do you close?",
"طيب. متى تسكرون؟"
]
]
],
[
"دعوة صديق",
"Inviting a Friend",
"🎉",
"للدعوة قل: Would you like to come to dinner on Friday? والرد بالقبول: I'd love to! أو الاعتذار بأدب: Sorry, I can't. I'm busy.",
[
[
"Would you like to come to dinner?",
"تحب تجي تتعشى عندنا؟"
],
[
"I'd love to!",
"يا ليت! بكل سرور."
],
[
"Sorry, I can't. I'm busy.",
"آسف، ما أقدر. مشغول."
],
[
"What time should I come?",
"متى أجي؟"
]
],
[
[
"A",
"Would you like to come to dinner on Friday?",
"تحب تجي تتعشى عندنا الجمعة؟"
],
[
"B",
"I'd love to! What time should I come?",
"بكل سرور! متى أجي؟"
],
[
"A",
"At eight o'clock.",
"الساعة ثمانية."
],
[
"B",
"Great. See you on Friday!",
"ممتاز. نشوفك الجمعة!"
]
]
],
[
"الشكوى بأدب",
"Making a Complaint",
"📢",
"اشتكِ بأدب وبهدوء: Excuse me, there's a problem with my order. واطلب الحل: Could you change it, please? أو I'd like a refund.",
[
[
"There's a problem with my order.",
"فيه مشكلة في طلبي."
],
[
"This isn't what I ordered.",
"هذا مو اللي طلبته."
],
[
"Could you change it, please?",
"ممكن تغيّره لو سمحت؟"
],
[
"I'd like a refund.",
"أبي أسترجع فلوسي."
]
],
[
[
"A",
"Is everything OK?",
"كل شي تمام؟"
],
[
"B",
"Excuse me, this isn't what I ordered.",
"لو سمحت، هذا مو اللي طلبته."
],
[
"A",
"I'm so sorry. What did you order?",
"آسفين مرة. وش طلبت؟"
],
[
"B",
"The chicken burger. Could you change it, please?",
"برجر دجاج. ممكن تغيّره لو سمحت؟"
]
]
],
[
"في محطة البنزين وورشة السيارة",
"At the Garage",
"⛽",
"في الورشة قل وش المشكلة: My car is making a strange noise. واسأل: How long will it take to fix? و How much will it cost?",
[
[
"Fill it up, please.",
"عبّها فل لو سمحت."
],
[
"My car is making a strange noise.",
"سيارتي تطلع صوت غريب."
],
[
"How long will it take to fix?",
"كم ياخذ وقت عشان تتصلح؟"
],
[
"I have a flat tyre.",
"عندي كفر مبنشر."
]
],
[
[
"A",
"What's the problem with your car?",
"وش مشكلة سيارتك؟"
],
[
"B",
"My car is making a strange noise.",
"سيارتي تطلع صوت غريب."
],
[
"A",
"Let me check it.",
"خلني أشيّك عليها."
],
[
"B",
"How long will it take to fix?",
"كم ياخذ وقت عشان تتصلح؟"
]
]
],
[
"استلام طلب توصيل",
"Food Delivery at the Door",
"🛵",
"مندوب التوصيل يتأكد من الاسم والطلب: Order for Ahmed? وإذا ناقص شي قل: Something is missing from my order. وفي الأخير: Thanks, have a good day.",
[
[
"Order for Ahmed?",
"طلب أحمد؟"
],
[
"Yes, that's me.",
"إيه، أنا."
],
[
"Something is missing from my order.",
"فيه شي ناقص من طلبي."
],
[
"Have a good day.",
"يومك سعيد."
]
],
[
[
"A",
"Hi, order for Ahmed?",
"هلا، طلب أحمد؟"
],
[
"B",
"Yes, that's me.",
"إيه، أنا."
],
[
"A",
"Here you are. Enjoy your meal.",
"تفضل. بالعافية."
],
[
"B",
"Thanks, have a good day.",
"شكرًا، يومك سعيد."
]
]
]
];
/** Level 2 (harder, B1): problems, work, formal calls, negotiation and social situations. */
const RAW2: R[] = [
[
"رحلة فاتتك",
"Missed Connection",
"⏱️",
"إذا فاتتك الرحلة الثانية روح لمكتب الطيران وقل: I missed my connecting flight. واسأل عن أقرب رحلة: When is the next available flight? وإذا تأخيرهم السبب اطلب فندق: Will you provide a hotel?",
[
[
"I missed my connecting flight.",
"فاتتني الرحلة الثانية."
],
[
"When is the next available flight?",
"متى أقرب رحلة متاحة؟"
],
[
"Will you provide a hotel?",
"بتوفرون فندق؟"
],
[
"Can I get a meal voucher?",
"أقدر آخذ قسيمة وجبة؟"
]
],
[
[
"A",
"How can I help you?",
"كيف أساعدك؟"
],
[
"B",
"I missed my connecting flight because the first one was late.",
"فاتتني الرحلة الثانية لأن الأولى تأخرت."
],
[
"A",
"The next available flight is tomorrow at 7 a.m.",
"أقرب رحلة بكرة الساعة ٧ الصبح."
],
[
"B",
"In that case, will you provide a hotel?",
"في هالحالة بتوفرون فندق؟"
]
]
],
[
"تغيير الحجز",
"Changing a Booking",
"🔁",
"لتغيير حجز قل: I'd like to change my booking. واسأل عن الرسوم: Is there a fee for changing the date? وإذا تبي تلغي: I'd like to cancel and get a refund.",
[
[
"I'd like to change my booking.",
"أبي أغيّر حجزي."
],
[
"Is there a fee for changing the date?",
"فيه رسوم لتغيير التاريخ؟"
],
[
"Could you move it to Friday?",
"ممكن تنقلونه للجمعة؟"
],
[
"I'd like to cancel and get a refund.",
"أبي ألغي وأسترجع المبلغ."
]
],
[
[
"A",
"Customer service, how can I help?",
"خدمة العملاء، كيف أساعدك؟"
],
[
"B",
"I'd like to change my booking to Friday.",
"أبي أغيّر حجزي ليوم الجمعة."
],
[
"A",
"Sure, but there is a fee of fifty riyals.",
"أكيد، بس فيه رسوم خمسين ريال."
],
[
"B",
"That's fine. Please go ahead.",
"ما فيه مشكلة، كمّل لو سمحت."
]
]
],
[
"الشكوى في الفندق",
"Hotel Complaint",
"😤",
"إذا الخدمة سيئة اشتكِ بأدب وبالتفصيل: I'm afraid the room hasn't been cleaned. واطلب حل واضح: I'd appreciate it if you could... و I'd like to speak to the manager.",
[
[
"I'm afraid the room hasn't been cleaned.",
"للأسف الغرفة ما تنظفت."
],
[
"The noise kept me awake all night.",
"الإزعاج خلاني صاحي طول الليل."
],
[
"I'd like to speak to the manager.",
"أبي أكلم المدير."
],
[
"I'd appreciate a discount.",
"أكون شاكر لو فيه خصم."
]
],
[
[
"A",
"Good morning. Is everything all right?",
"صباح الخير. كل شي تمام؟"
],
[
"B",
"I'm afraid not. The noise kept me awake all night.",
"للأسف لا. الإزعاج خلاني صاحي طول الليل."
],
[
"A",
"I'm very sorry. We can move you to a quieter room.",
"آسفين جدًا. نقدر ننقلك لغرفة أهدأ."
],
[
"B",
"Thank you. I'd also appreciate a discount.",
"شكرًا. وأكون شاكر لو فيه خصم."
]
]
],
[
"حجز مطعم لمناسبة",
"Booking for an Occasion",
"🎂",
"لحجز مناسبة حدد العدد والوقت والطلبات الخاصة: I'd like to book a table for ten on Thursday. و Could you prepare a birthday cake? و Do you have a private room?",
[
[
"I'd like to book a table for ten.",
"أبي أحجز طاولة لعشرة."
],
[
"Do you have a private room?",
"عندكم غرفة خاصة؟"
],
[
"Could you prepare a birthday cake?",
"ممكن تجهزون كيكة عيد ميلاد؟"
],
[
"Some guests are vegetarian.",
"بعض الضيوف نباتيين."
]
],
[
[
"A",
"Al Nakheel Restaurant, good evening.",
"مطعم النخيل، مساء الخير."
],
[
"B",
"I'd like to book a table for ten on Thursday at eight.",
"أبي أحجز طاولة لعشرة يوم الخميس الساعة ثمانية."
],
[
"A",
"Certainly. Is it a special occasion?",
"أكيد. فيه مناسبة خاصة؟"
],
[
"B",
"Yes, it's a birthday. Could you prepare a cake?",
"إيه، عيد ميلاد. ممكن تجهزون كيكة؟"
]
]
],
[
"حساسية الأكل",
"Food Allergies",
"🥜",
"إذا عندك حساسية قلها بوضوح قبل الطلب: I'm allergic to nuts. واسأل: Does this dish contain dairy? و Can you make it without...?",
[
[
"I'm allergic to nuts.",
"عندي حساسية من المكسرات."
],
[
"Does this dish contain dairy?",
"هالطبق فيه ألبان؟"
],
[
"Can you make it without sesame?",
"تقدرون تسوونه بدون سمسم؟"
],
[
"Is it gluten-free?",
"خالي من الجلوتين؟"
]
],
[
[
"A",
"Are you ready to order?",
"جاهز تطلب؟"
],
[
"B",
"Yes, but first, does this dish contain nuts? I'm allergic.",
"إيه، بس أول شي، هالطبق فيه مكسرات؟ عندي حساسية."
],
[
"A",
"It has a little peanut sauce, but we can leave it out.",
"فيه شوي صوص فول سوداني، بس نقدر نشيله."
],
[
"B",
"Great, please make it without the sauce.",
"ممتاز، سوّه بدون الصوص لو سمحت."
]
]
],
[
"عند طبيب الأسنان",
"At the Dentist",
"🦷",
"عند طبيب الأسنان وصف الألم: I have a toothache on the left side. و It hurts when I drink something cold. والطبيب ممكن يقول: You need a filling.",
[
[
"I have a toothache.",
"عندي ألم في ضرسي."
],
[
"It hurts when I drink something cold.",
"يوجعني لما أشرب شي بارد."
],
[
"Do I need a filling?",
"أحتاج حشوة؟"
],
[
"Will it hurt?",
"بيوجع؟"
]
],
[
[
"A",
"What brings you in today?",
"وش جابك اليوم؟"
],
[
"B",
"I have a toothache on the left side.",
"عندي ألم في الجهة اليسار."
],
[
"A",
"Does it hurt when you eat or drink?",
"يوجعك لما تاكل أو تشرب؟"
],
[
"B",
"Yes, especially when I drink something cold.",
"إيه، خصوصًا لما أشرب شي بارد."
]
]
],
[
"في الطوارئ بالمستشفى",
"At the ER",
"🏥",
"في الطوارئ قل المشكلة ومتى بدأت وشدتها: My son fell and hurt his arm. و The pain is getting worse. وإذا عنده أمراض: He has asthma.",
[
[
"My son fell and hurt his arm.",
"ولدي طاح وتعوّرت يده."
],
[
"The pain is getting worse.",
"الألم يزيد."
],
[
"He has asthma.",
"عنده ربو."
],
[
"How long is the wait?",
"كم الانتظار؟"
]
],
[
[
"A",
"What happened?",
"وش صار؟"
],
[
"B",
"My son fell off his bike and hurt his arm.",
"ولدي طاح من الدراجة وتعوّرت يده."
],
[
"A",
"Can he move his fingers?",
"يقدر يحرك أصابعه؟"
],
[
"B",
"A little, but the pain is getting worse.",
"شوي، بس الألم يزيد."
]
]
],
[
"تأمين السيارة والحوادث",
"Car Accident Report",
"🚗",
"بعد حادث بسيط اهدأ واطلب: Let's exchange insurance details. وصف الحادث: The other car hit me from behind. والتطبيق المعتمد في السعودية لتسجيل الحوادث البسيطة هو نجم.",
[
[
"Is anyone hurt?",
"فيه أحد متأذي؟"
],
[
"The other car hit me from behind.",
"السيارة الثانية صدمتني من ورا."
],
[
"Let's exchange insurance details.",
"خلنا نتبادل بيانات التأمين."
],
[
"I'll call the insurance company.",
"بتصل على شركة التأمين."
]
],
[
[
"A",
"Are you OK? Is anyone hurt?",
"أنت بخير؟ فيه أحد متأذي؟"
],
[
"B",
"I'm fine. The other car hit me from behind.",
"أنا بخير. السيارة الثانية صدمتني من ورا."
],
[
"A",
"Did you take photos of the damage?",
"صوّرت الأضرار؟"
],
[
"B",
"Yes. Now let's exchange insurance details.",
"إيه. الحين خلنا نتبادل بيانات التأمين."
]
]
],
[
"فتح حساب وبطاقة",
"Bank: Card Problem",
"💳",
"إذا انسحبت بطاقتك أو صار عليها خصم غريب قل: There's a transaction I don't recognise. واطلب: Please block my card. و I'd like a replacement card.",
[
[
"There's a transaction I don't recognise.",
"فيه عملية ما أعرفها."
],
[
"Please block my card.",
"أوقف بطاقتي لو سمحت."
],
[
"The ATM kept my card.",
"الصراف سحب بطاقتي."
],
[
"I'd like a replacement card.",
"أبي بطاقة بديلة."
]
],
[
[
"A",
"Thank you for calling the bank.",
"شكرًا لاتصالك بالبنك."
],
[
"B",
"There's a transaction on my card that I don't recognise.",
"فيه عملية على بطاقتي ما أعرفها."
],
[
"A",
"I see. Shall I block the card now?",
"فهمت. أوقف البطاقة الحين؟"
],
[
"B",
"Yes, please block it and send me a replacement card.",
"إيه، أوقفها وأرسلوا لي بطاقة بديلة."
]
]
],
[
"استئجار شقة",
"Renting an Apartment",
"🏢",
"لما تشوف شقة اسأل: Are the bills included in the rent? و How much is the deposit? و Is the contract for one year?",
[
[
"Are the bills included in the rent?",
"الفواتير داخلة في الإيجار؟"
],
[
"How much is the deposit?",
"كم التأمين؟"
],
[
"Is the contract for one year?",
"العقد لسنة؟"
],
[
"Can I see the apartment first?",
"أقدر أشوف الشقة أول؟"
]
],
[
[
"A",
"This apartment has two bedrooms and a big kitchen.",
"هالشقة فيها غرفتين نوم ومطبخ كبير."
],
[
"B",
"It's nice. Are the bills included in the rent?",
"حلوة. الفواتير داخلة في الإيجار؟"
],
[
"A",
"Water is included, but electricity isn't.",
"الموية داخلة بس الكهرباء لا."
],
[
"B",
"I see. And how much is the deposit?",
"فهمت. وكم التأمين؟"
]
]
],
[
"مشكلة مع الجيران",
"Talking to a Neighbour",
"🏘️",
"إذا عندك مشكلة مع الجار تكلّم بلطف: Sorry to bother you, but... واقترح حل: Would you mind keeping the noise down after eleven?",
[
[
"Sorry to bother you, but...",
"آسف على الإزعاج، بس..."
],
[
"Would you mind keeping the noise down?",
"عادي توطّون الصوت؟"
],
[
"Your car is blocking my garage.",
"سيارتك سادة الكراج حقي."
],
[
"Thanks for understanding.",
"شكرًا على تفهمك."
]
],
[
[
"A",
"Hi! Can I help you?",
"هلا! أقدر أساعدك؟"
],
[
"B",
"Sorry to bother you, but your car is blocking my garage.",
"آسف على الإزعاج، بس سيارتك سادة الكراج حقي."
],
[
"A",
"Oh, I'm so sorry! I'll move it right away.",
"أوه، آسف مرة! بحركها الحين."
],
[
"B",
"No problem. Thanks for understanding.",
"ما فيه مشكلة. شكرًا على تفهمك."
]
]
],
[
"اجتماع عمل",
"In a Meeting",
"📊",
"في الاجتماع شارك بأدب: I'd like to add something. وإذا ما وافقت: I see your point, but... ولتلخيص: So, to sum up...",
[
[
"I'd like to add something.",
"أبي أضيف شي."
],
[
"I see your point, but...",
"فاهم وجهة نظرك، بس..."
],
[
"Could you clarify that?",
"ممكن توضح هالنقطة؟"
],
[
"So, to sum up...",
"طيب، بالمختصر..."
]
],
[
[
"A",
"I think we should launch the app in June.",
"أظن لازم نطلق التطبيق في يونيو."
],
[
"B",
"I see your point, but we still need more testing.",
"فاهم وجهة نظرك، بس نحتاج اختبار أكثر."
],
[
"A",
"How much more time do you need?",
"كم وقت زيادة تحتاج؟"
],
[
"B",
"About two weeks. So, to sum up, let's aim for July.",
"حوالي أسبوعين. بالمختصر، خلنا نستهدف يوليو."
]
]
],
[
"طلب إجازة من المدير",
"Asking for Leave",
"🏖️",
"اطلب الإجازة بأدب وبسبب واضح: Would it be possible to take next week off? و I've finished my tasks. وقدّم حل: My colleague can cover for me.",
[
[
"Would it be possible to take next week off?",
"ممكن آخذ إجازة الأسبوع الجاي؟"
],
[
"It's for a family wedding.",
"عشان عرس في العائلة."
],
[
"My colleague can cover for me.",
"زميلي يقدر يغطي عني."
],
[
"I'll finish the report before I go.",
"بخلص التقرير قبل لا أطلع."
]
],
[
[
"A",
"You wanted to see me?",
"كنت تبي تشوفني؟"
],
[
"B",
"Yes. Would it be possible to take next week off? It's for a family wedding.",
"إيه. ممكن آخذ إجازة الأسبوع الجاي؟ عشان عرس في العائلة."
],
[
"A",
"What about the monthly report?",
"وش وضع التقرير الشهري؟"
],
[
"B",
"I'll finish it before I go, and my colleague can cover for me.",
"بخلصه قبل لا أطلع، وزميلي يغطي عني."
]
]
],
[
"التفاوض على الراتب",
"Negotiating Salary",
"🤝",
"في التفاوض كن مهذب وواثق: Based on my experience, I was expecting... واسأل عن المزايا: Does the package include housing allowance?",
[
[
"Based on my experience, I was expecting more.",
"بناءً على خبرتي، كنت أتوقع أكثر."
],
[
"Is the salary negotiable?",
"الراتب قابل للتفاوض؟"
],
[
"Does the package include housing allowance?",
"العرض يشمل بدل سكن؟"
],
[
"Could I have some time to think about it?",
"ممكن آخذ وقت أفكر؟"
]
],
[
[
"A",
"We'd like to offer you the job at eight thousand riyals.",
"نبي نعرض عليك الوظيفة بثمانية آلاف ريال."
],
[
"B",
"Thank you. Based on my experience, I was expecting a little more.",
"شكرًا. بناءً على خبرتي كنت أتوقع أكثر شوي."
],
[
"A",
"We could offer housing allowance as well.",
"نقدر نضيف بدل سكن بعد."
],
[
"B",
"That sounds good. Could I have a day to think about it?",
"كويس. ممكن يوم أفكر فيه؟"
]
]
],
[
"العرض التقديمي",
"Giving a Presentation",
"🎤",
"ابدأ العرض بترتيب: Today I'm going to talk about... وانتقل بين الأجزاء: Let's move on to... وفي النهاية: Are there any questions?",
[
[
"Today I'm going to talk about...",
"اليوم بتكلم عن..."
],
[
"Let's move on to the next point.",
"خلنا ننتقل للنقطة الجاية."
],
[
"As you can see on this slide...",
"مثل ما تشوفون في هالشريحة..."
],
[
"Are there any questions?",
"فيه أي أسئلة؟"
]
],
[
[
"A",
"You can start whenever you're ready.",
"تقدر تبدأ متى ما كنت جاهز."
],
[
"B",
"Thank you. Today I'm going to talk about our sales results.",
"شكرًا. اليوم بتكلم عن نتائج مبيعاتنا."
],
[
"A",
"Could you explain this chart?",
"ممكن تشرح هالرسم؟"
],
[
"B",
"Sure. As you can see on this slide, sales went up by ten percent.",
"أكيد. مثل ما تشوفون في الشريحة، المبيعات زادت عشرة بالمية."
]
]
],
[
"خدمة العملاء: الإنترنت",
"Internet Support Call",
"📶",
"لما تتصل بالدعم وصف المشكلة بدقة: My internet keeps disconnecting. وقل وش جربت: I've already restarted the router. واطلب: Can you send a technician?",
[
[
"My internet keeps disconnecting.",
"الإنترنت يفصل كل شوي."
],
[
"I've already restarted the router.",
"سويت إعادة تشغيل للراوتر."
],
[
"Can you send a technician?",
"تقدرون ترسلون فني؟"
],
[
"How long will it take to fix?",
"كم ياخذ وقت عشان ينصلح؟"
]
],
[
[
"A",
"Technical support, how can I help?",
"الدعم الفني، كيف أساعدك؟"
],
[
"B",
"My internet keeps disconnecting every few minutes.",
"الإنترنت يفصل كل كم دقيقة."
],
[
"A",
"Have you tried restarting the router?",
"جربت تعيد تشغيل الراوتر؟"
],
[
"B",
"Yes, I've already restarted it twice. Can you send a technician?",
"إيه، أعدته مرتين. تقدرون ترسلون فني؟"
]
]
],
[
"إرجاع طلب أونلاين",
"Returning an Online Order",
"📦",
"في المحادثة مع المتجر قل: The item arrived damaged. واطلب: I'd like to return it. واسأل: Who pays for the return shipping?",
[
[
"The item arrived damaged.",
"المنتج وصل خربان."
],
[
"I'd like to return it.",
"أبي أرجّعه."
],
[
"Who pays for the return shipping?",
"مين يدفع شحن الإرجاع؟"
],
[
"When will I get my refund?",
"متى يرجع لي المبلغ؟"
]
],
[
[
"A",
"Hello, how can we help with your order?",
"هلا، كيف نساعدك في طلبك؟"
],
[
"B",
"The headphones arrived damaged. I'd like to return them.",
"السماعات وصلت خربانة. أبي أرجّعها."
],
[
"A",
"Sorry about that. We'll send a courier to collect them.",
"نعتذر. بنرسل مندوب ياخذها."
],
[
"B",
"Thank you. When will I get my refund?",
"شكرًا. متى يرجع لي المبلغ؟"
]
]
],
[
"عند الشرطة",
"Reporting a Theft",
"🚔",
"إذا انسرق شي روح لمركز الشرطة وقل: I'd like to report a theft. ووصف: My wallet was stolen at the mall. وبيطلبون: Can you describe it?",
[
[
"I'd like to report a theft.",
"أبي أبلّغ عن سرقة."
],
[
"My wallet was stolen.",
"انسرقت محفظتي."
],
[
"It happened around six o'clock.",
"صار حوالي الساعة ست."
],
[
"Can I get a copy of the report?",
"أقدر آخذ نسخة من البلاغ؟"
]
],
[
[
"A",
"How can I help you?",
"كيف أساعدك؟"
],
[
"B",
"I'd like to report a theft. My wallet was stolen at the mall.",
"أبي أبلّغ عن سرقة. انسرقت محفظتي في المول."
],
[
"A",
"When did it happen?",
"متى صار هذا؟"
],
[
"B",
"It happened around six o'clock this evening.",
"صار حوالي الساعة ست المغرب."
]
]
],
[
"في السفارة: تأشيرة",
"Visa Interview",
"🛂",
"في مقابلة التأشيرة جاوب بثقة وبصدق: I'm going to study at... و I'll return after I graduate. وجهز أوراقك: Here are my bank statements.",
[
[
"I'm going to study engineering.",
"بدرس هندسة."
],
[
"My university has accepted me.",
"جامعتي قبلتني."
],
[
"I'll return after I graduate.",
"برجع بعد ما أتخرج."
],
[
"Here are my bank statements.",
"هذي كشوفات حسابي البنكي."
]
],
[
[
"A",
"Why do you want to visit the United Kingdom?",
"ليش تبي تزور بريطانيا؟"
],
[
"B",
"I'm going to study engineering. The university has accepted me.",
"بدرس هندسة. الجامعة قبلتني."
],
[
"A",
"What will you do after your studies?",
"وش بتسوي بعد دراستك؟"
],
[
"B",
"I'll return to Saudi Arabia and work here.",
"برجع للسعودية وأشتغل هنا."
]
]
],
[
"اجتماع أولياء الأمور",
"Parent-Teacher Meeting",
"👨‍👩‍👦",
"في اجتماع المدرسة اسأل عن مستوى ولدك: How is my son doing in class? واسأل: What can we do at home to help? وشكر المعلم: Thank you for your support.",
[
[
"How is my son doing in class?",
"كيف مستوى ولدي في الفصل؟"
],
[
"What can we do at home to help?",
"وش نقدر نسوي في البيت عشان نساعده؟"
],
[
"Is he getting along with others?",
"متفاهم مع زملائه؟"
],
[
"Thank you for your support.",
"شكرًا على دعمك."
]
],
[
[
"A",
"Thank you for coming. Omar is a hard worker.",
"شكرًا على حضورك. عمر مجتهد."
],
[
"B",
"That's great. How is he doing in math?",
"ممتاز. كيف مستواه في الرياضيات؟"
],
[
"A",
"He finds it a bit difficult.",
"يلقاها صعبة شوي."
],
[
"B",
"What can we do at home to help him?",
"وش نقدر نسوي في البيت عشان نساعده؟"
]
]
],
[
"التطوع",
"Volunteering",
"🙋",
"إذا تبي تتطوع اسأل: I'd like to volunteer. How can I help? وحدد وقتك: I'm available on weekends. واسأل عن الخبرة: Do I need any experience?",
[
[
"I'd like to volunteer.",
"أبي أتطوع."
],
[
"I'm available on weekends.",
"فاضي في نهاية الأسبوع."
],
[
"Do I need any experience?",
"أحتاج خبرة؟"
],
[
"What does the work involve?",
"وش يشمل الشغل؟"
]
],
[
[
"A",
"Welcome to the food bank. How can I help?",
"هلا في بنك الطعام. كيف أساعدك؟"
],
[
"B",
"I'd like to volunteer. I'm available on weekends.",
"أبي أتطوع. فاضي في نهاية الأسبوع."
],
[
"A",
"Great! We need help packing food boxes.",
"ممتاز! نحتاج مساعدة في تعبئة سلال الأكل."
],
[
"B",
"That sounds good. Do I need any experience?",
"حلو. أحتاج خبرة؟"
]
]
],
[
"تهنئة وتعزية",
"Congratulations & Condolences",
"💐",
"للتهنئة: Congratulations on your new job! و I'm so happy for you. وللتعزية بلطف: I'm so sorry for your loss. و If you need anything, I'm here.",
[
[
"Congratulations on your new job!",
"مبروك الوظيفة الجديدة!"
],
[
"I'm so happy for you.",
"فرحان لك مرة."
],
[
"I'm so sorry for your loss.",
"عظم الله أجرك."
],
[
"If you need anything, I'm here.",
"إذا احتجت أي شي أنا موجود."
]
],
[
[
"A",
"I got the job at the hospital!",
"توظفت في المستشفى!"
],
[
"B",
"Congratulations! I'm so happy for you.",
"مبروك! فرحان لك مرة."
],
[
"A",
"Thanks! I start next month.",
"شكرًا! أبدأ الشهر الجاي."
],
[
"B",
"That's wonderful. You really deserve it.",
"رائع. تستاهلها والله."
]
]
],
[
"الاعتذار عن موعد",
"Apologising for Being Late",
"🙇",
"إذا تأخرت اعتذر وبيّن السبب باختصار: I'm really sorry I'm late. The traffic was terrible. وإذا بتلغي: I'm afraid I can't make it today. Can we reschedule?",
[
[
"I'm really sorry I'm late.",
"آسف جدًا على التأخير."
],
[
"The traffic was terrible.",
"الزحمة كانت فظيعة."
],
[
"I'm afraid I can't make it today.",
"للأسف ما أقدر أجي اليوم."
],
[
"Can we reschedule?",
"نقدر نأجل الموعد؟"
]
],
[
[
"A",
"Hello? Are you still coming?",
"ألو؟ للحين جاي؟"
],
[
"B",
"I'm really sorry. I'm afraid I can't make it today.",
"آسف جدًا. للأسف ما أقدر أجي اليوم."
],
[
"A",
"Oh, that's a shame.",
"أوه، خسارة."
],
[
"B",
"Can we reschedule for Sunday?",
"نقدر نأجلها للأحد؟"
]
]
],
[
"الاستفسار في الجامعة",
"At the University Office",
"🎓",
"في مكتب القبول اسأل: I'd like some information about the master's program. و What are the admission requirements? و When is the deadline?",
[
[
"I'd like some information about the master's program.",
"أبي معلومات عن برنامج الماجستير."
],
[
"What are the admission requirements?",
"وش شروط القبول؟"
],
[
"When is the application deadline?",
"متى آخر موعد للتقديم؟"
],
[
"Do I need an IELTS score?",
"أحتاج درجة آيلتس؟"
]
],
[
[
"A",
"Admissions office. How can I help?",
"مكتب القبول. كيف أساعدك؟"
],
[
"B",
"I'd like some information about the master's program in business.",
"أبي معلومات عن ماجستير إدارة الأعمال."
],
[
"A",
"You need a bachelor's degree and an IELTS score of 6.5.",
"تحتاج بكالوريوس وآيلتس ٦٫٥."
],
[
"B",
"I see. When is the application deadline?",
"فهمت. متى آخر موعد للتقديم؟"
]
]
],
[
"شراء جوال",
"Buying a Phone",
"📱",
"في محل الجوالات قارن واسأل: What's the difference between these two models? و Does it come with a warranty? و Can I pay in instalments?",
[
[
"What's the difference between these two models?",
"وش الفرق بين هالموديلين؟"
],
[
"Does it come with a warranty?",
"معه ضمان؟"
],
[
"Can I pay in instalments?",
"أقدر أقسّط؟"
],
[
"How long does the battery last?",
"كم تدوم البطارية؟"
]
],
[
[
"A",
"Are you looking for anything special?",
"تدوّر شي معين؟"
],
[
"B",
"Yes. What's the difference between these two models?",
"إيه. وش الفرق بين هالموديلين؟"
],
[
"A",
"This one has a better camera and a bigger battery.",
"هذا كاميرته أحسن وبطاريته أكبر."
],
[
"B",
"Does it come with a warranty?",
"معه ضمان؟"
]
]
],
[
"الصيانة في البيت",
"Home Repair",
"🔧",
"لما تتصل بالصيانة وصف المشكلة: The kitchen sink is leaking. واسأل: When can you come? و How much will it cost roughly?",
[
[
"The kitchen sink is leaking.",
"مغسلة المطبخ تهرّب."
],
[
"The power went out in one room.",
"الكهرباء طافية في غرفة."
],
[
"When can you come?",
"متى تقدر تجي؟"
],
[
"How much will it cost roughly?",
"كم التكلفة تقريبًا؟"
]
],
[
[
"A",
"Maintenance service, hello.",
"خدمة الصيانة، هلا."
],
[
"B",
"Hello. The kitchen sink is leaking badly.",
"هلا. مغسلة المطبخ تهرّب بقوة."
],
[
"A",
"We can send a plumber this afternoon.",
"نقدر نرسل سبّاك العصر."
],
[
"B",
"Great. How much will it cost roughly?",
"ممتاز. كم التكلفة تقريبًا؟"
]
]
],
[
"الحديث الصغير",
"Small Talk",
"☕",
"الحديث الخفيف يفتح العلاقات: How was your weekend? و Have you been here before? وتجنب الأسئلة الشخصية جدًا مثل الراتب والعمر في أول لقاء.",
[
[
"How was your weekend?",
"كيف كانت إجازتك؟"
],
[
"Have you been here before?",
"جيت هنا قبل؟"
],
[
"What do you do for fun?",
"وش تسوي للمتعة؟"
],
[
"It was nice talking to you.",
"سعدت بالكلام معك."
]
],
[
[
"A",
"Hi! How was your weekend?",
"هلا! كيف كانت إجازة نهاية الأسبوع؟"
],
[
"B",
"It was great, thanks. I went camping with my family.",
"كانت حلوة، شكرًا. رحت كشتة مع العائلة."
],
[
"A",
"That sounds fun! Where did you go?",
"شكلها ممتعة! وين رحتوا؟"
],
[
"B",
"Near Al Ula. You should go sometime!",
"قريب من العلا. لازم تروح مرة!"
]
]
],
[
"الطلب من جار في السفر",
"Asking a Favour",
"🙏",
"لطلب خدمة بلطف: Could you do me a favour? و Would you mind watering my plants while I'm away? واشكر: I really appreciate it.",
[
[
"Could you do me a favour?",
"ممكن تخدمني خدمة؟"
],
[
"Would you mind watering my plants?",
"عادي تسقي نباتاتي؟"
],
[
"I'll be away for a week.",
"بغيب أسبوع."
],
[
"I really appreciate it.",
"أقدّر لك هالشي مرة."
]
],
[
[
"A",
"Hi, what's up?",
"هلا، وش الأخبار؟"
],
[
"B",
"Could you do me a favour? I'll be away for a week.",
"ممكن تخدمني خدمة؟ بغيب أسبوع."
],
[
"A",
"Sure, what do you need?",
"أكيد، وش تحتاج؟"
],
[
"B",
"Would you mind watering my plants? I really appreciate it.",
"عادي تسقي نباتاتي؟ أقدّر لك هالشي."
]
]
],
[
"تقديم شكوى رسمية",
"Formal Complaint by Phone",
"📞",
"في الشكوى الرسمية اذكر رقم الطلب والمشكلة وطلبك: I'm calling to complain about... و My reference number is... و I expect this to be resolved by...",
[
[
"I'm calling to complain about my last bill.",
"أتصل أشتكي من فاتورتي الأخيرة."
],
[
"My reference number is 4521.",
"رقمي المرجعي ٤٥٢١."
],
[
"I was charged twice.",
"انخصم مني مرتين."
],
[
"I expect this to be resolved this week.",
"أتوقع تنحل هالأسبوع."
]
],
[
[
"A",
"How may I help you today?",
"كيف أقدر أساعدك اليوم؟"
],
[
"B",
"I'm calling to complain about my last bill. I was charged twice.",
"أتصل أشتكي من فاتورتي الأخيرة. انخصم مني مرتين."
],
[
"A",
"I'm sorry. Do you have a reference number?",
"نعتذر. عندك رقم مرجعي؟"
],
[
"B",
"Yes, it's 4521. I expect this to be resolved this week.",
"إيه، ٤٥٢١. أتوقع تنحل هالأسبوع."
]
]
],
[
"في الحج والعمرة: مساعدة حاج",
"Helping a Visitor",
"🕋",
"إذا شفت زائر محتار ساعده: Are you lost? Can I help you? ووصّه: The gate is straight ahead. وقل: Stay with your group.",
[
[
"Are you lost? Can I help you?",
"ضايع؟ أقدر أساعدك؟"
],
[
"The gate is straight ahead.",
"البوابة على طول قدامك."
],
[
"Stay with your group.",
"خلك مع مجموعتك."
],
[
"Do you need water?",
"تحتاج موية؟"
]
],
[
[
"A",
"Excuse me, I can't find my group.",
"لو سمحت، ما ألقى مجموعتي."
],
[
"B",
"Don't worry. What's the name of your group?",
"لا تشيل هم. وش اسم مجموعتك؟"
],
[
"A",
"Al Huda group. We meet at gate eighty-five.",
"مجموعة الهدى. نتجمع عند بوابة ٨٥."
],
[
"B",
"Gate eighty-five is straight ahead. I'll walk with you.",
"بوابة ٨٥ على طول قدامك. بمشي معك."
]
]
]
];
export const DAILY_LESSONS: SaraDailyLesson[] = [...RAW, ...RAW2].map(([titleAr, titleEn, icon, introAr, ph, dl], i) => ({
  id: `daily-${'abcd'[Math.floor(i / 30)]}-${String((i % 30) + 1).padStart(2, '0')}`, order: i + 1, levelId: 'abcd'[Math.floor(i / 30)] as 'a' | 'b' | 'c' | 'd', titleAr, titleEn, icon, introAr,
  phrases: ph.map(([en, ar]) => ({ en, ar })), dialogue: dl.map(([sp, en, ar]) => ({ sp, en, ar }))
}));
export const DAILY_TRACK_ID = 'daily';
